using System.Text;
using CapStoneBackEnd.Data;
using CapStoneBackEnd.Models.Auth;
using CapStoneBackEnd.Services;
using CapStoneBackEnd.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning)
    .MinimumLevel.Override("System", Serilog.Events.LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .WriteTo.Async(a => a.File("Log/log_txt", rollingInterval: RollingInterval.Day))
    .WriteTo.Async(a => a.Console())
    .CreateLogger();
try
{
    Log.Information("Starting application...");

    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

    builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
    {
        options.SignIn.RequireConfirmedAccount = builder.Configuration.GetSection("Identity").GetValue<bool>("SignInRequireConfirmedAccount");
        options.Password.RequiredLength = builder.Configuration.GetSection("Identity").GetValue<int>("RequiredLength");
        options.Password.RequireDigit = builder.Configuration.GetSection("Identity").GetValue<bool>("RequireDigit");
        options.Password.RequireLowercase = builder.Configuration.GetSection("Identity").GetValue<bool>("RequireLowercase");
        options.Password.RequireUppercase = builder.Configuration.GetSection("Identity").GetValue<bool>("RequireUppercase");
        options.Password.RequireNonAlphanumeric = builder.Configuration.GetSection("Identity").GetValue<bool>("RequireNonAlphanumeric");
    })
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();

    builder.Services.Configure<Jwt>(builder.Configuration.GetSection(nameof(Jwt)));

    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration.GetSection(nameof(Jwt)).GetValue<string>("Issuer"),
            ValidAudience = builder.Configuration.GetSection(nameof(Jwt)).GetValue<string>("Audience"),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection(nameof(Jwt)).GetValue<string>("SecurityKey")))
        };
    });

    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "CustomersManager API", Version = "v1" });

        var securityScheme = new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "Bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "Inserisci il token JWT nel formato: Bearer {token}",
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
            }
        };

        c.AddSecurityDefinition("Bearer", securityScheme);
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            { securityScheme, new string[] {} }
        });
    });

    builder.Services.AddScoped<UserManager<ApplicationUser>>();
    builder.Services.AddScoped<SignInManager<ApplicationUser>>();
    builder.Services.AddScoped<RoleManager<ApplicationRole>>();
    builder.Services.AddScoped<GameService>();
    builder.Services.AddScoped<AccountService>();
    builder.Services.AddScoped<CategoryService>();
    builder.Services.AddScoped<CompanyService>();
    builder.Services.AddScoped<WishListService>();
    builder.Services.AddScoped<LibraryService>();
    builder.Services.AddScoped<CartService>();
    builder.Services.AddScoped<CommentService>();
    builder.Services.AddScoped<ImageProxyService>();

    var app = builder.Build();
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(Directory.GetCurrentDirectory(), "assets", "images")),
        RequestPath = "/assets/images"
    });

    app.Use(async (context, next) =>
    {
        if (context.Request.Path.StartsWithSegments("/assets/images"))
        {
            context.Response.OnStarting(() =>
            {
                context.Response.Headers["Access-Control-Allow-Origin"] = "*";
                return Task.CompletedTask;
            });
        }

        await next.Invoke();
    });

    app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
catch (Exception ex)
{
    Log.Error(ex.Message);
}
finally
{
    await Log.CloseAndFlushAsync();
}
