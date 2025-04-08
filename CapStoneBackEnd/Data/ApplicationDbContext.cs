using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using CapStoneBackEnd.Models.Auth;
using CapStoneBackEnd.Models.VideoGames;

namespace CapStoneBackEnd.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string, IdentityUserClaim<string>, ApplicationUserRole, IdentityUserLogin<string>, IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ApplicationRole> ApplicationRoles { get; set; }
        public DbSet<ApplicationUserRole> ApplicationUserRoles { get; set; }
        public DbSet<VideoGame> VideoGames { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Library> Libraries { get; set; }
        public DbSet<WishList> WishLists { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<GameCategory> GameCategories { get; set; }
        public DbSet<ExtraImage> ExtraImages { get; set; }
        public DbSet<Cart> Carts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<ApplicationUserRole>().HasOne(ur => ur.User).WithMany(u => u.ApplicationUserRole).HasForeignKey(ur => ur.UserId);
            modelBuilder.Entity<ApplicationUserRole>().HasOne(ur => ur.Role).WithMany(u => u.ApplicationUserRole).HasForeignKey(ur => ur.RoleId);
            modelBuilder.Entity<ApplicationUser>().HasIndex(u => u.UserName).IsUnique();

            modelBuilder.Entity<Library>().HasOne(l => l.VideoGame).WithMany(v => v.Library).HasForeignKey(l => l.IdGame);
            modelBuilder.Entity<Library>().HasOne(l => l.ApplicationUser).WithMany(u => u.Library).HasForeignKey(l => l.IdUser);

            modelBuilder.Entity<WishList>().HasOne(w => w.VideoGame).WithMany(v => v.WishList).HasForeignKey(w => w.IdGame);
            modelBuilder.Entity<WishList>().HasOne(w => w.ApplicationUser).WithMany(u => u.WishList).HasForeignKey(w => w.IdUser);

            modelBuilder.Entity<Comment>().HasOne(c => c.VideoGame).WithMany(v => v.Comments).HasForeignKey(c => c.IdGame);
            modelBuilder.Entity<Comment>().HasOne(c => c.ApplicationUser).WithMany(u => u.Comments).HasForeignKey(c => c.IdUser);

            modelBuilder.Entity<VideoGame>().HasOne(v => v.Company).WithMany(c => c.VideoGames).HasForeignKey(v => v.CompanyId);

            modelBuilder.Entity<GameCategory>().HasOne(g => g.Category).WithMany(c => c.GameCategories).HasForeignKey(g => g.CategoryId);
            modelBuilder.Entity<GameCategory>().HasOne(g => g.VideoGame).WithMany(v => v.GameCategories).HasForeignKey(g => g.GameId);

            modelBuilder.Entity<Cart>().HasOne(c => c.VideoGame).WithMany(v => v.Carts).HasForeignKey(c => c.GameId);
            modelBuilder.Entity<Cart>().HasOne(c => c.ApplicationUser).WithMany(u => u.Carts).HasForeignKey(c => c.UserId);

            modelBuilder.Entity<Library>().HasKey(c => new { c.IdGame, c.IdUser });
            modelBuilder.Entity<WishList>().HasKey(c => new { c.IdGame, c.IdUser });
            modelBuilder.Entity<GameCategory>().HasKey(c => new { c.CategoryId, c.GameId });
            modelBuilder.Entity<Cart>().HasKey(c => new { c.UserId, c.GameId });

            modelBuilder.Entity<ExtraImage>().HasOne(i => i.VideoGame).WithMany(c => c.ExtraImages).HasForeignKey(i => i.GameId);

            modelBuilder.Entity<ApplicationRole>().HasData(
                new ApplicationRole() { Id = "66D7DB2A-56A6-4E65-90A2-26A33701C613", Name = "Admin", NormalizedName = "ADMIN", ConcurrencyStamp = "66D7DB2A-56A6-4E65-90A2-26A33701C613" },
                new ApplicationRole() { Id = "6DD52BC5-AC79-4A54-B6CD-302475F6E068", Name = "User", NormalizedName = "USER", ConcurrencyStamp = "6DD52BC5-AC79-4A54-B6CD-302475F6E068" }
                );

            modelBuilder.Entity<Category>().HasData(
                 new Category { Id = 1, Name = "Action" },
                 new Category { Id = 2, Name = "Adventure" },
                 new Category { Id = 3, Name = "RPG" },
                 new Category { Id = 4, Name = "Strategy" },
                 new Category { Id = 5, Name = "Simulation" },
                 new Category { Id = 6, Name = "Sports" },
                 new Category { Id = 7, Name = "Racing" },
                 new Category { Id = 8, Name = "SoulsLike" },
                 new Category { Id = 9, Name = "Horror" },
                 new Category { Id = 10, Name = "Puzzle" },
                 new Category { Id = 11, Name = "Fighting" },
                 new Category { Id = 12, Name = "Shooter" },
                 new Category { Id = 13, Name = "Platformer" },
                 new Category { Id = 14, Name = "Multiplayer" },
                 new Category { Id = 15, Name = "Survival" },
                 new Category { Id = 16, Name = "MMO" },
                 new Category { Id = 17, Name = "Sandbox" },
                 new Category { Id = 18, Name = "Open World" }
                 );

            modelBuilder.Entity<Company>().HasData(
                new Company { Id = Guid.Parse("F48F2269-1189-4169-9BDA-43740AC61D54"), Name = "CD Projekt Red" },
                new Company { Id = Guid.Parse("EDD26752-909E-49F2-825B-474B9634CA08"), Name = "Rockstar Games" },
                new Company { Id = Guid.Parse("DECC0ABF-32AC-4DAB-BFE8-912F7476AED2"), Name = "FromSoftware" },
                new Company { Id = Guid.Parse("806EDB38-E6A2-44D7-9BA2-66C5524985D4"), Name = "Mojang" },
                new Company { Id = Guid.Parse("4BEE146C-B7E7-450C-80F1-BD25F0489AF7"), Name = "Naughty Dog" },
                new Company { Id = Guid.Parse("94814951-9711-4038-8A62-B7A08796CE97"), Name = "Bethesda" },
                new Company { Id = Guid.Parse("54E0A08E-B04C-42D0-9581-9492B2339C7E"), Name = "Ubisoft" },
                new Company { Id = Guid.Parse("4415DB24-C5B4-464A-AB3F-4A0844174DBC"), Name = "Activision Blizzard" },
                new Company { Id = Guid.Parse("3BFFCF4B-1E3A-400D-989D-6A6207701937"), Name = "NetEase Games" },
                new Company { Id = Guid.Parse("68D14478-608C-48E7-BE0D-5AD1ED21F520"), Name = "Electronic Arts" },
                new Company { Id = Guid.Parse("14CFC957-2ED2-4A7C-89ED-E132FEE0FC1F"), Name = "Capcom" },
                new Company { Id = Guid.Parse("3ED716BE-3C54-44CF-B2FA-757301EDFDF4"), Name = "Square Enix" },
                new Company { Id = Guid.Parse("3E7A5105-E3C8-4179-A72B-6C16C9F46A44"), Name = "Bandai Namco" }
                );

            modelBuilder.Entity<VideoGame>().HasData(
                new VideoGame { Id = Guid.Parse("0C462717-8F0B-4B03-AF2B-73AF06D1DAAB"), Title = "The Witcher 3: Wild Hunt", Description = "Un RPG open-world ambientato in un ricco mondo fantasy pieno di mostri, magia e intrighi politici.", Price = 59.99m, ReleaseDate = new DateOnly(2015, 5, 19), Cover = "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/qezXTVn1ExqBjVjR5Ipm97IK.png", CompanyId = Guid.Parse("F48F2269-1189-4169-9BDA-43740AC61D54") },
                new VideoGame { Id = Guid.Parse("74A82095-C501-4C95-A085-C833119924D9"), Title = "Red Dead Redemption 2", Description = "Un gioco action-adventure a tema western con una storia ricca e un mondo aperto immersivo.", Price = 59.99m, ReleaseDate = new DateOnly(2018, 10, 26), Cover = "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png", CompanyId = Guid.Parse("EDD26752-909E-49F2-825B-474B9634CA08") },
                new VideoGame { Id = Guid.Parse("B30F1EE8-923A-4137-9219-A5B0E662234C"), Title = "Elden Ring", Description = "Un acclamato RPG open-world ambientato in un mondo dark fantasy creato da George R.R. Martin e Hidetaka Miyazaki.", Price = 69.99m, ReleaseDate = new DateOnly(2022, 2, 25), Cover = "https://storage.googleapis.com/pod_public/1300/216712.jpg", CompanyId = Guid.Parse("DECC0ABF-32AC-4DAB-BFE8-912F7476AED2") },
                new VideoGame { Id = Guid.Parse("4943A4AB-77DC-4B5B-9E28-8624AEDF14DE"), Title = "Minecraft", Description = "Un gioco sandbox che permette ai giocatori di costruire ed esplorare mondi generati proceduralmente.", Price = 26.95m, ReleaseDate = new DateOnly(2011, 11, 18), Cover = "https://upload.wikimedia.org/wikinews/en/7/7a/Minecraft_game_cover.jpeg", CompanyId = Guid.Parse("806EDB38-E6A2-44D7-9BA2-66C5524985D4") },
                new VideoGame { Id = Guid.Parse("68998E4C-C5C9-49D6-A88B-387B9D25FB64"), Title = "The Last of Us", Description = "Un gioco action-adventure post-apocalittico che segue Joel ed Ellie in un mondo devastato da un'infezione mortale causata da un fungo.", Price = 39.99m, ReleaseDate = new DateOnly(2013, 6, 14), Cover = "https://upload.wikimedia.org/wikipedia/en/4/46/Video_Game_Cover_-_The_Last_of_Us.jpg", CompanyId = Guid.Parse("4BEE146C-B7E7-450C-80F1-BD25F0489AF7") },
                new VideoGame { Id = Guid.Parse("C7E65512-F05F-4F70-83B4-8A15B2DB342F"), Title = "The Elder Scolls V: Skyrim", Description = "Un acclamato RPG open-world ambientato nel mondo fantasy di Tamriel, quinto capitolo della saga The Elder Scrolls.", Price = 49.99m, ReleaseDate = new DateOnly(2011, 11, 11), Cover = "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1tnw.jpg", CompanyId = Guid.Parse("94814951-9711-4038-8A62-B7A08796CE97") },
                new VideoGame { Id = Guid.Parse("4B283381-040C-4BC2-A8BA-D68CCDEF5EF8"), Title = "Assassin's Creed Valhalla", Description = "Un RPG action ambientato nell'Inghilterra dell'epoca vichinga, dove i giocatori controllano Eivor nel tentativo di stabilire una nuova casa per il proprio clan.", Price = 59.99m, ReleaseDate = new DateOnly(2020, 11, 10), Cover = "https://static.posters.cz/image/1300/poster/assassin-s-creed-valhalla-standard-edition-i97796.jpg", CompanyId = Guid.Parse("54E0A08E-B04C-42D0-9581-9492B2339C7E") },
                new VideoGame { Id = Guid.Parse("E32A9AC5-AC0A-4A76-92B8-A689C863B679"), Title = "Call of Duty: Warzone", Description = "Una modalità battle royale gratuita del franchise Call of Duty.", Price = 0.00m, ReleaseDate = new DateOnly(2020, 3, 10), Cover = "https://cdn.mobygames.com/covers/3227605-call-of-duty-warzone-xbox-one-front-cover.jpg", CompanyId = Guid.Parse("4415DB24-C5B4-464A-AB3F-4A0844174DBC") },
                new VideoGame { Id = Guid.Parse("C56FCFE3-3983-4156-A1FE-68D042EC528C"), Title = "Hearthstone", Description = "Un gioco di carte digitale ambientato nell'universo di Warcraft, che presenta battaglie strategiche con le carte.", Price = 0.00m, ReleaseDate = new DateOnly(2014, 3, 11), Cover = "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1sh2.jpg", CompanyId = Guid.Parse("3BFFCF4B-1E3A-400D-989D-6A6207701937") },
                new VideoGame { Id = Guid.Parse("667DC63F-5DCD-47F0-8913-77BFAC892B31"), Title = "FIFA 23", Description = "L'ultima edizione della serie FIFA, con gameplay calcistico realistico e una vasta scelta di squadre e leghe.", Price = 59.99m, ReleaseDate = new DateOnly(2022, 9, 30), Cover = "https://fifauteam.com/images/covers/fifa23/standard-cg.webp", CompanyId = Guid.Parse("68D14478-608C-48E7-BE0D-5AD1ED21F520") },
                new VideoGame { Id = Guid.Parse("3EC73A5C-A14C-4403-A916-AC49C9D1F0E5"), Title = "Street Fighter V", Description = "Un gioco di combattimento 2D classico con un ampio roster di personaggi e modalità competitive.", Price = 29.99m, ReleaseDate = new DateOnly(2016, 2, 16), Cover = "https://upload.wikimedia.org/wikipedia/en/8/80/Street_Fighter_V_box_artwork.png", CompanyId = Guid.Parse("14CFC957-2ED2-4A7C-89ED-E132FEE0FC1F") },
                new VideoGame { Id = Guid.Parse("6A4E55E7-1606-461E-B6E7-9E1548C4C304"), Title = "Final Fantasy VII Remake", Description = "Un remake completo del classico Final Fantasy VII, reinventato con grafica moderna e nuove meccaniche di gioco.", Price = 59.99m, ReleaseDate = new DateOnly(2020, 4, 10), Cover = "https://i.etsystatic.com/37268737/r/il/0a8bc9/4261084803/il_570xN.4261084803_jndz.jpg", CompanyId = Guid.Parse("3ED716BE-3C54-44CF-B2FA-757301EDFDF4") },
                new VideoGame { Id = Guid.Parse("312733B8-23E9-4282-A468-FE204F83F10D"), Title = "Tekken 7", Description = "L'ultimo capitolo della serie Tekken, con una varietà di personaggi e un sistema di combattimento profondo e competitivo.", Price = 49.99m, ReleaseDate = new DateOnly(2017, 6, 2), Cover = "https://cdn.mobygames.com/covers/2007175-tekken-7-playstation-4-front-cover.jpg", CompanyId = Guid.Parse("3E7A5105-E3C8-4179-A72B-6C16C9F46A44") },
                new VideoGame { Id = Guid.Parse("3D85CA22-CF31-4C24-84C2-21CB5F23827F"), Title = "Overwatch", Description = "Uno sparatutto multiplayer basato su squadre con una varietà di eroi unici e un gameplay frenetico.", Price = 39.99m, ReleaseDate = new DateOnly(2016, 5, 24), Cover = "https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg", CompanyId = Guid.Parse("4415DB24-C5B4-464A-AB3F-4A0844174DBC") },
                new VideoGame { Id = Guid.Parse("2DBAC8DA-74BA-40E1-942A-544DA7D20EC4"), Title = "Gran Turismo 7", Description = "L'ultimo capitolo della serie di simulazione di corse realistica con una vasta scelta di auto e circuiti.", Price = 69.99m, ReleaseDate = new DateOnly(2022, 3, 4), Cover = "https://image.api.playstation.com/vulcan/ap/rnd/202202/2806/QDzid2jNv4e44kgumGXDCscF.png", CompanyId = Guid.Parse("94814951-9711-4038-8A62-B7A08796CE97") },
                new VideoGame { Id = Guid.Parse("EFA61B60-449E-47A8-969F-AC2BBEB713AD"), Title = "Cyberpunk 2077", Description = "Un RPG open-world ambientato in un futuro distopico, con azione ad alta tecnologia e gameplay incentrato sulla narrativa.", Price = 59.99m, ReleaseDate = new DateOnly(2020, 12, 10), Cover = "https://e.snmc.io/lk/p/x/787467ae05c57a6598ea00cb7ab0095d/9917184", CompanyId = Guid.Parse("F48F2269-1189-4169-9BDA-43740AC61D54") },
                new VideoGame { Id = Guid.Parse("C789E653-BDD3-4DAE-BDE0-888BA4F25A5A"), Title = "Bloodborne", Description = "Un gioco action RPG che mescola combattimenti veloci e esplorazione di un mondo oscuro e gotico, pieno di mostri e segreti.", Price = 49.99m, ReleaseDate = new DateOnly(2015, 3, 24), Cover = "https://image.api.playstation.com/vulcan/img/rnd/202010/2614/Sy5e8DmeKIJVjlAGraPAJYkT.png", CompanyId = Guid.Parse("DECC0ABF-32AC-4DAB-BFE8-912F7476AED2") },
                new VideoGame { Id = Guid.Parse("8F167EDF-3776-4382-8303-44F6171DAAC2"), Title = "Monster Hunter Wilds", Description = "Un RPG action dove i giocatori cacciano creature gigantesche in un bellissimo mondo aperto.", Price = 59.99m, ReleaseDate = new DateOnly(2018, 1, 26), Cover = "https://i.redd.it/9p64xvod5uqd1.png", CompanyId = Guid.Parse("14CFC957-2ED2-4A7C-89ED-E132FEE0FC1F") },
                new VideoGame { Id = Guid.Parse("1C8FC05D-09E4-4339-8B7A-6F2D072CB646"), Title = "Fallout 4", Description = "Un gioco RPG open-world ambientato in un mondo post-apocalittico dove i giocatori esplorano il deserto nucleare e affrontano bande di nemici.", Price = 39.99m, ReleaseDate = new DateOnly(2015, 11, 10), Cover = "https://upload.wikimedia.org/wikipedia/en/7/70/Fallout_4_cover_art.jpg", CompanyId = Guid.Parse("94814951-9711-4038-8A62-B7A08796CE97") },
                new VideoGame { Id = Guid.Parse("D181A5E2-96D2-4C79-A1F3-54DCF202F540"), Title = "Forza Horizon 4", Description = "Un gioco di corse open-world con un'enorme varietà di veicoli e circuiti, ambientato nel Regno Unito in una simulazione di guida altamente realistica.", Price = 59.99m, ReleaseDate = new DateOnly(2021, 3, 9), Cover = "https://upload.wikimedia.org/wikipedia/en/8/87/Forza_Horizon_4_cover.jpg", CompanyId = Guid.Parse("806EDB38-E6A2-44D7-9BA2-66C5524985D4") },
                new VideoGame { Id = Guid.Parse("EB8A08CB-469A-4C21-8BCF-CAF12E4F7B05"), Title = "Marvel Rivals", Description = "Un gioco sparatutto PVP a squadre di Super Eroi! Crea una squadra di fuoriclasse Marvel con abilità di squadra uniche in arene distruttibili e in continuo cambiamento nell'universo Marvel", Price = 00.00m, ReleaseDate = new DateOnly(2024, 12, 6), Cover = "https://cdn.mobygames.com/covers/19465997-marvel-rivals-xbox-series-front-cover.jpg", CompanyId = Guid.Parse("3BFFCF4B-1E3A-400D-989D-6A6207701937") },
                new VideoGame { Id = Guid.Parse("0B21DDA9-0DBC-45D0-BDAC-FBB6ED9D2BDF"), Title = "Final Fantasy XIV", Description = "Un gioco mmo con una storia indimenticabile, battaglie esaltanti e tantissimi affascinanti scenari da esplorare.", Price = 9.99m, ReleaseDate = new DateOnly(2014, 2, 18), Cover = "https://m.media-amazon.com/images/I/81a2m0s2P2L._AC_UF1000,1000_QL80_.jpg", CompanyId = Guid.Parse("3ED716BE-3C54-44CF-B2FA-757301EDFDF4") }
                );

            modelBuilder.Entity<GameCategory>().HasData(
                new GameCategory { GameId = Guid.Parse("0C462717-8F0B-4B03-AF2B-73AF06D1DAAB"), CategoryId = 1 },
                new GameCategory { GameId = Guid.Parse("0C462717-8F0B-4B03-AF2B-73AF06D1DAAB"), CategoryId = 3 },
                new GameCategory { GameId = Guid.Parse("0C462717-8F0B-4B03-AF2B-73AF06D1DAAB"), CategoryId = 18 },
                new GameCategory { GameId = Guid.Parse("74A82095-C501-4C95-A085-C833119924D9"), CategoryId = 2 },
                new GameCategory { GameId = Guid.Parse("74A82095-C501-4C95-A085-C833119924D9"), CategoryId = 18 },
                new GameCategory { GameId = Guid.Parse("74A82095-C501-4C95-A085-C833119924D9"), CategoryId = 14 },
                new GameCategory { GameId = Guid.Parse("74A82095-C501-4C95-A085-C833119924D9"), CategoryId = 15 },
                new GameCategory { GameId = Guid.Parse("B30F1EE8-923A-4137-9219-A5B0E662234C"), CategoryId = 1 },
                new GameCategory { GameId = Guid.Parse("B30F1EE8-923A-4137-9219-A5B0E662234C"), CategoryId = 3 },
                new GameCategory { GameId = Guid.Parse("B30F1EE8-923A-4137-9219-A5B0E662234C"), CategoryId = 8 },
                new GameCategory { GameId = Guid.Parse("B30F1EE8-923A-4137-9219-A5B0E662234C"), CategoryId = 18 },
                new GameCategory { GameId = Guid.Parse("4943A4AB-77DC-4B5B-9E28-8624AEDF14DE"), CategoryId = 17 },
                new GameCategory { GameId = Guid.Parse("4943A4AB-77DC-4B5B-9E28-8624AEDF14DE"), CategoryId = 18 },
                new GameCategory { GameId = Guid.Parse("4943A4AB-77DC-4B5B-9E28-8624AEDF14DE"), CategoryId = 15 },
                new GameCategory { GameId = Guid.Parse("68998E4C-C5C9-49D6-A88B-387B9D25FB64"), CategoryId = 15 },
                new GameCategory { GameId = Guid.Parse("68998E4C-C5C9-49D6-A88B-387B9D25FB64"), CategoryId = 9 },
                new GameCategory { GameId = Guid.Parse("68998E4C-C5C9-49D6-A88B-387B9D25FB64"), CategoryId = 1 },
                new GameCategory { GameId = Guid.Parse("C7E65512-F05F-4F70-83B4-8A15B2DB342F"), CategoryId = 1 },
                new GameCategory { GameId = Guid.Parse("C7E65512-F05F-4F70-83B4-8A15B2DB342F"), CategoryId = 3 },
                new GameCategory { GameId = Guid.Parse("C7E65512-F05F-4F70-83B4-8A15B2DB342F"), CategoryId = 8 },
                new GameCategory { GameId = Guid.Parse("4B283381-040C-4BC2-A8BA-D68CCDEF5EF8"), CategoryId = 1 },
                new GameCategory { GameId = Guid.Parse("4B283381-040C-4BC2-A8BA-D68CCDEF5EF8"), CategoryId = 3 },
                new GameCategory { GameId = Guid.Parse("4B283381-040C-4BC2-A8BA-D68CCDEF5EF8"), CategoryId = 18 },
                new GameCategory { GameId = Guid.Parse("E32A9AC5-AC0A-4A76-92B8-A689C863B679"), CategoryId = 1 },
                new GameCategory { GameId = Guid.Parse("E32A9AC5-AC0A-4A76-92B8-A689C863B679"), CategoryId = 12 },
                new GameCategory { GameId = Guid.Parse("E32A9AC5-AC0A-4A76-92B8-A689C863B679"), CategoryId = 14 },
                new GameCategory { GameId = Guid.Parse("C56FCFE3-3983-4156-A1FE-68D042EC528C"), CategoryId = 4 },
                new GameCategory { GameId = Guid.Parse("C56FCFE3-3983-4156-A1FE-68D042EC528C"), CategoryId = 14 },
                new GameCategory { GameId = Guid.Parse("667DC63F-5DCD-47F0-8913-77BFAC892B31"), CategoryId = 5 },
                new GameCategory { GameId = Guid.Parse("667DC63F-5DCD-47F0-8913-77BFAC892B31"), CategoryId = 6 },
                new GameCategory { GameId = Guid.Parse("667DC63F-5DCD-47F0-8913-77BFAC892B31"), CategoryId = 14 },
                new GameCategory { GameId = Guid.Parse("3EC73A5C-A14C-4403-A916-AC49C9D1F0E5"), CategoryId = 11 },
                new GameCategory { GameId = Guid.Parse("3EC73A5C-A14C-4403-A916-AC49C9D1F0E5"), CategoryId = 14 },
                new GameCategory { GameId = Guid.Parse("6A4E55E7-1606-461E-B6E7-9E1548C4C304"), CategoryId = 1 },
                new GameCategory { GameId = Guid.Parse("6A4E55E7-1606-461E-B6E7-9E1548C4C304"), CategoryId = 2 },
                new GameCategory { GameId = Guid.Parse("6A4E55E7-1606-461E-B6E7-9E1548C4C304"), CategoryId = 3 },
                new GameCategory { GameId = Guid.Parse("312733B8-23E9-4282-A468-FE204F83F10D"), CategoryId = 11 },
                new GameCategory { GameId = Guid.Parse("312733B8-23E9-4282-A468-FE204F83F10D"), CategoryId = 14 },
                new GameCategory { GameId = Guid.Parse("3D85CA22-CF31-4C24-84C2-21CB5F23827F"), CategoryId = 4 },
                new GameCategory { GameId = Guid.Parse("3D85CA22-CF31-4C24-84C2-21CB5F23827F"), CategoryId = 12 },
                new GameCategory { GameId = Guid.Parse("3D85CA22-CF31-4C24-84C2-21CB5F23827F"), CategoryId = 14 },
                new GameCategory { GameId = Guid.Parse("2DBAC8DA-74BA-40E1-942A-544DA7D20EC4"), CategoryId = 6 },
                new GameCategory { GameId = Guid.Parse("2DBAC8DA-74BA-40E1-942A-544DA7D20EC4"), CategoryId = 7 },
                new GameCategory { GameId = Guid.Parse("2DBAC8DA-74BA-40E1-942A-544DA7D20EC4"), CategoryId = 5 },
                new GameCategory { GameId = Guid.Parse("EFA61B60-449E-47A8-969F-AC2BBEB713AD"), CategoryId = 1 },
                new GameCategory { GameId = Guid.Parse("EFA61B60-449E-47A8-969F-AC2BBEB713AD"), CategoryId = 3 },
                new GameCategory { GameId = Guid.Parse("EFA61B60-449E-47A8-969F-AC2BBEB713AD"), CategoryId = 18 },
                new GameCategory { GameId = Guid.Parse("C789E653-BDD3-4DAE-BDE0-888BA4F25A5A"), CategoryId = 1 },
                new GameCategory { GameId = Guid.Parse("C789E653-BDD3-4DAE-BDE0-888BA4F25A5A"), CategoryId = 3 },
                new GameCategory { GameId = Guid.Parse("C789E653-BDD3-4DAE-BDE0-888BA4F25A5A"), CategoryId = 8 },
                new GameCategory { GameId = Guid.Parse("C789E653-BDD3-4DAE-BDE0-888BA4F25A5A"), CategoryId = 9 },
                new GameCategory { GameId = Guid.Parse("8F167EDF-3776-4382-8303-44F6171DAAC2"), CategoryId = 1 },
                new GameCategory { GameId = Guid.Parse("8F167EDF-3776-4382-8303-44F6171DAAC2"), CategoryId = 3 },
                new GameCategory { GameId = Guid.Parse("8F167EDF-3776-4382-8303-44F6171DAAC2"), CategoryId = 14 },
                new GameCategory { GameId = Guid.Parse("1C8FC05D-09E4-4339-8B7A-6F2D072CB646"), CategoryId = 3 },
                new GameCategory { GameId = Guid.Parse("1C8FC05D-09E4-4339-8B7A-6F2D072CB646"), CategoryId = 12 },
                new GameCategory { GameId = Guid.Parse("1C8FC05D-09E4-4339-8B7A-6F2D072CB646"), CategoryId = 18 },
                new GameCategory { GameId = Guid.Parse("D181A5E2-96D2-4C79-A1F3-54DCF202F540"), CategoryId = 6 },
                new GameCategory { GameId = Guid.Parse("D181A5E2-96D2-4C79-A1F3-54DCF202F540"), CategoryId = 7 },
                new GameCategory { GameId = Guid.Parse("D181A5E2-96D2-4C79-A1F3-54DCF202F540"), CategoryId = 14 },
                new GameCategory { GameId = Guid.Parse("EB8A08CB-469A-4C21-8BCF-CAF12E4F7B05"), CategoryId = 4 },
                new GameCategory { GameId = Guid.Parse("EB8A08CB-469A-4C21-8BCF-CAF12E4F7B05"), CategoryId = 12 },
                new GameCategory { GameId = Guid.Parse("EB8A08CB-469A-4C21-8BCF-CAF12E4F7B05"), CategoryId = 14 },
                new GameCategory { GameId = Guid.Parse("0B21DDA9-0DBC-45D0-BDAC-FBB6ED9D2BDF"), CategoryId = 3 },
                new GameCategory { GameId = Guid.Parse("0B21DDA9-0DBC-45D0-BDAC-FBB6ED9D2BDF"), CategoryId = 14 },
                new GameCategory { GameId = Guid.Parse("0B21DDA9-0DBC-45D0-BDAC-FBB6ED9D2BDF"), CategoryId = 16 }
                );
        }
    }
}
