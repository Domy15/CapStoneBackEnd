using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CapStoneBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageProfile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BirthDate = table.Column<DateOnly>(type: "date", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VideoGames",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ReleaseDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Cover = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoGames", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VideoGames_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    GameId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => new { x.UserId, x.GameId });
                    table.ForeignKey(
                        name: "FK_Carts_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Carts_VideoGames_GameId",
                        column: x => x.GameId,
                        principalTable: "VideoGames",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdUser = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdGame = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_AspNetUsers_IdUser",
                        column: x => x.IdUser,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_VideoGames_IdGame",
                        column: x => x.IdGame,
                        principalTable: "VideoGames",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExtraImages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GameId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExtraImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExtraImages_VideoGames_GameId",
                        column: x => x.GameId,
                        principalTable: "VideoGames",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GameCategories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    GameId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameCategories", x => new { x.CategoryId, x.GameId });
                    table.ForeignKey(
                        name: "FK_GameCategories_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GameCategories_VideoGames_GameId",
                        column: x => x.GameId,
                        principalTable: "VideoGames",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Libraries",
                columns: table => new
                {
                    IdGame = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdUser = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Libraries", x => new { x.IdGame, x.IdUser });
                    table.ForeignKey(
                        name: "FK_Libraries_AspNetUsers_IdUser",
                        column: x => x.IdUser,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Libraries_VideoGames_IdGame",
                        column: x => x.IdGame,
                        principalTable: "VideoGames",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WishLists",
                columns: table => new
                {
                    IdGame = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdUser = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WishLists", x => new { x.IdGame, x.IdUser });
                    table.ForeignKey(
                        name: "FK_WishLists_AspNetUsers_IdUser",
                        column: x => x.IdUser,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WishLists_VideoGames_IdGame",
                        column: x => x.IdGame,
                        principalTable: "VideoGames",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "66D7DB2A-56A6-4E65-90A2-26A33701C613", "66D7DB2A-56A6-4E65-90A2-26A33701C613", "Admin", "ADMIN" },
                    { "6DD52BC5-AC79-4A54-B6CD-302475F6E068", "6DD52BC5-AC79-4A54-B6CD-302475F6E068", "User", "USER" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Action" },
                    { 2, "Adventure" },
                    { 3, "RPG" },
                    { 4, "Strategy" },
                    { 5, "Simulation" },
                    { 6, "Sports" },
                    { 7, "Racing" },
                    { 8, "SoulsLike" },
                    { 9, "Horror" },
                    { 10, "Puzzle" },
                    { 11, "Fighting" },
                    { 12, "Shooter" },
                    { 13, "Platformer" },
                    { 14, "Multiplayer" },
                    { 15, "Survival" },
                    { 16, "MMO" },
                    { 17, "Sandbox" },
                    { 18, "Open World" }
                });

            migrationBuilder.InsertData(
                table: "Companies",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("14cfc957-2ed2-4a7c-89ed-e132fee0fc1f"), "Capcom" },
                    { new Guid("3bffcf4b-1e3a-400d-989d-6a6207701937"), "NetEase Games" },
                    { new Guid("3e7a5105-e3c8-4179-a72b-6c16c9f46a44"), "Bandai Namco" },
                    { new Guid("3ed716be-3c54-44cf-b2fa-757301edfdf4"), "Square Enix" },
                    { new Guid("4415db24-c5b4-464a-ab3f-4a0844174dbc"), "Activision Blizzard" },
                    { new Guid("4bee146c-b7e7-450c-80f1-bd25f0489af7"), "Naughty Dog" },
                    { new Guid("54e0a08e-b04c-42d0-9581-9492b2339c7e"), "Ubisoft" },
                    { new Guid("68d14478-608c-48e7-be0d-5ad1ed21f520"), "Electronic Arts" },
                    { new Guid("806edb38-e6a2-44d7-9ba2-66c5524985d4"), "Mojang" },
                    { new Guid("94814951-9711-4038-8a62-b7a08796ce97"), "Bethesda" },
                    { new Guid("decc0abf-32ac-4dab-bfe8-912f7476aed2"), "FromSoftware" },
                    { new Guid("edd26752-909e-49f2-825b-474b9634ca08"), "Rockstar Games" },
                    { new Guid("f48f2269-1189-4169-9bda-43740ac61d54"), "CD Projekt Red" }
                });

            migrationBuilder.InsertData(
                table: "VideoGames",
                columns: new[] { "Id", "CompanyId", "Cover", "Description", "Price", "ReleaseDate", "Title" },
                values: new object[,]
                {
                    { new Guid("0b21dda9-0dbc-45d0-bdac-fbb6ed9d2bdf"), new Guid("3ed716be-3c54-44cf-b2fa-757301edfdf4"), "https://m.media-amazon.com/images/I/81a2m0s2P2L._AC_UF1000,1000_QL80_.jpg", "Un gioco mmo con una storia indimenticabile, battaglie esaltanti e tantissimi affascinanti scenari da esplorare.", 9.99m, new DateOnly(2014, 2, 18), "Final Fantasy XIV" },
                    { new Guid("0c462717-8f0b-4b03-af2b-73af06d1daab"), new Guid("f48f2269-1189-4169-9bda-43740ac61d54"), "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/qezXTVn1ExqBjVjR5Ipm97IK.png", "Un RPG open-world ambientato in un ricco mondo fantasy pieno di mostri, magia e intrighi politici.", 59.99m, new DateOnly(2015, 5, 19), "The Witcher 3: Wild Hunt" },
                    { new Guid("1c8fc05d-09e4-4339-8b7a-6f2d072cb646"), new Guid("94814951-9711-4038-8a62-b7a08796ce97"), "https://upload.wikimedia.org/wikipedia/en/7/70/Fallout_4_cover_art.jpg", "Un gioco RPG open-world ambientato in un mondo post-apocalittico dove i giocatori esplorano il deserto nucleare e affrontano bande di nemici.", 39.99m, new DateOnly(2015, 11, 10), "Fallout 4" },
                    { new Guid("2dbac8da-74ba-40e1-942a-544da7d20ec4"), new Guid("94814951-9711-4038-8a62-b7a08796ce97"), "https://image.api.playstation.com/vulcan/ap/rnd/202202/2806/QDzid2jNv4e44kgumGXDCscF.png", "L'ultimo capitolo della serie di simulazione di corse realistica con una vasta scelta di auto e circuiti.", 69.99m, new DateOnly(2022, 3, 4), "Gran Turismo 7" },
                    { new Guid("312733b8-23e9-4282-a468-fe204f83f10d"), new Guid("3e7a5105-e3c8-4179-a72b-6c16c9f46a44"), "https://cdn.mobygames.com/covers/2007175-tekken-7-playstation-4-front-cover.jpg", "L'ultimo capitolo della serie Tekken, con una varietà di personaggi e un sistema di combattimento profondo e competitivo.", 49.99m, new DateOnly(2017, 6, 2), "Tekken 7" },
                    { new Guid("3d85ca22-cf31-4c24-84c2-21cb5f23827f"), new Guid("4415db24-c5b4-464a-ab3f-4a0844174dbc"), "https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg", "Uno sparatutto multiplayer basato su squadre con una varietà di eroi unici e un gameplay frenetico.", 39.99m, new DateOnly(2016, 5, 24), "Overwatch" },
                    { new Guid("3ec73a5c-a14c-4403-a916-ac49c9d1f0e5"), new Guid("14cfc957-2ed2-4a7c-89ed-e132fee0fc1f"), "https://upload.wikimedia.org/wikipedia/en/8/80/Street_Fighter_V_box_artwork.png", "Un gioco di combattimento 2D classico con un ampio roster di personaggi e modalità competitive.", 29.99m, new DateOnly(2016, 2, 16), "Street Fighter V" },
                    { new Guid("4943a4ab-77dc-4b5b-9e28-8624aedf14de"), new Guid("806edb38-e6a2-44d7-9ba2-66c5524985d4"), "https://upload.wikimedia.org/wikinews/en/7/7a/Minecraft_game_cover.jpeg", "Un gioco sandbox che permette ai giocatori di costruire ed esplorare mondi generati proceduralmente.", 26.95m, new DateOnly(2011, 11, 18), "Minecraft" },
                    { new Guid("4b283381-040c-4bc2-a8ba-d68ccdef5ef8"), new Guid("54e0a08e-b04c-42d0-9581-9492b2339c7e"), "https://static.posters.cz/image/1300/poster/assassin-s-creed-valhalla-standard-edition-i97796.jpg", "Un RPG action ambientato nell'Inghilterra dell'epoca vichinga, dove i giocatori controllano Eivor nel tentativo di stabilire una nuova casa per il proprio clan.", 59.99m, new DateOnly(2020, 11, 10), "Assassin's Creed Valhalla" },
                    { new Guid("667dc63f-5dcd-47f0-8913-77bfac892b31"), new Guid("68d14478-608c-48e7-be0d-5ad1ed21f520"), "https://fifauteam.com/images/covers/fifa23/standard-cg.webp", "L'ultima edizione della serie FIFA, con gameplay calcistico realistico e una vasta scelta di squadre e leghe.", 59.99m, new DateOnly(2022, 9, 30), "FIFA 23" },
                    { new Guid("68998e4c-c5c9-49d6-a88b-387b9d25fb64"), new Guid("4bee146c-b7e7-450c-80f1-bd25f0489af7"), "https://upload.wikimedia.org/wikipedia/en/4/46/Video_Game_Cover_-_The_Last_of_Us.jpg", "Un gioco action-adventure post-apocalittico che segue Joel ed Ellie in un mondo devastato da un'infezione mortale causata da un fungo.", 39.99m, new DateOnly(2013, 6, 14), "The Last of Us" },
                    { new Guid("6a4e55e7-1606-461e-b6e7-9e1548c4c304"), new Guid("3ed716be-3c54-44cf-b2fa-757301edfdf4"), "https://i.etsystatic.com/37268737/r/il/0a8bc9/4261084803/il_570xN.4261084803_jndz.jpg", "Un remake completo del classico Final Fantasy VII, reinventato con grafica moderna e nuove meccaniche di gioco.", 59.99m, new DateOnly(2020, 4, 10), "Final Fantasy VII Remake" },
                    { new Guid("74a82095-c501-4c95-a085-c833119924d9"), new Guid("edd26752-909e-49f2-825b-474b9634ca08"), "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png", "Un gioco action-adventure a tema western con una storia ricca e un mondo aperto immersivo.", 59.99m, new DateOnly(2018, 10, 26), "Red Dead Redemption 2" },
                    { new Guid("8f167edf-3776-4382-8303-44f6171daac2"), new Guid("14cfc957-2ed2-4a7c-89ed-e132fee0fc1f"), "https://i.redd.it/9p64xvod5uqd1.png", "Un RPG action dove i giocatori cacciano creature gigantesche in un bellissimo mondo aperto.", 59.99m, new DateOnly(2018, 1, 26), "Monster Hunter Wilds" },
                    { new Guid("b30f1ee8-923a-4137-9219-a5b0e662234c"), new Guid("decc0abf-32ac-4dab-bfe8-912f7476aed2"), "https://storage.googleapis.com/pod_public/1300/216712.jpg", "Un acclamato RPG open-world ambientato in un mondo dark fantasy creato da George R.R. Martin e Hidetaka Miyazaki.", 69.99m, new DateOnly(2022, 2, 25), "Elden Ring" },
                    { new Guid("c56fcfe3-3983-4156-a1fe-68d042ec528c"), new Guid("3bffcf4b-1e3a-400d-989d-6a6207701937"), "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1sh2.jpg", "Un gioco di carte digitale ambientato nell'universo di Warcraft, che presenta battaglie strategiche con le carte.", 0.00m, new DateOnly(2014, 3, 11), "Hearthstone" },
                    { new Guid("c789e653-bdd3-4dae-bde0-888ba4f25a5a"), new Guid("decc0abf-32ac-4dab-bfe8-912f7476aed2"), "https://image.api.playstation.com/vulcan/img/rnd/202010/2614/Sy5e8DmeKIJVjlAGraPAJYkT.png", "Un gioco action RPG che mescola combattimenti veloci e esplorazione di un mondo oscuro e gotico, pieno di mostri e segreti.", 49.99m, new DateOnly(2015, 3, 24), "Bloodborne" },
                    { new Guid("c7e65512-f05f-4f70-83b4-8a15b2db342f"), new Guid("94814951-9711-4038-8a62-b7a08796ce97"), "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1tnw.jpg", "Un acclamato RPG open-world ambientato nel mondo fantasy di Tamriel, quinto capitolo della saga The Elder Scrolls.", 49.99m, new DateOnly(2011, 11, 11), "The Elder Scolls V: Skyrim" },
                    { new Guid("d181a5e2-96d2-4c79-a1f3-54dcf202f540"), new Guid("806edb38-e6a2-44d7-9ba2-66c5524985d4"), "https://upload.wikimedia.org/wikipedia/en/8/87/Forza_Horizon_4_cover.jpg", "Un gioco di corse open-world con un'enorme varietà di veicoli e circuiti, ambientato nel Regno Unito in una simulazione di guida altamente realistica.", 59.99m, new DateOnly(2021, 3, 9), "Forza Horizon 4" },
                    { new Guid("e32a9ac5-ac0a-4a76-92b8-a689c863b679"), new Guid("4415db24-c5b4-464a-ab3f-4a0844174dbc"), "https://cdn.mobygames.com/covers/3227605-call-of-duty-warzone-xbox-one-front-cover.jpg", "Una modalità battle royale gratuita del franchise Call of Duty.", 0.00m, new DateOnly(2020, 3, 10), "Call of Duty: Warzone" },
                    { new Guid("eb8a08cb-469a-4c21-8bcf-caf12e4f7b05"), new Guid("3bffcf4b-1e3a-400d-989d-6a6207701937"), "https://cdn.mobygames.com/covers/19465997-marvel-rivals-xbox-series-front-cover.jpg", "Un gioco sparatutto PVP a squadre di Super Eroi! Crea una squadra di fuoriclasse Marvel con abilità di squadra uniche in arene distruttibili e in continuo cambiamento nell'universo Marvel", 0.00m, new DateOnly(2024, 12, 6), "Marvel Rivals" },
                    { new Guid("efa61b60-449e-47a8-969f-ac2bbeb713ad"), new Guid("f48f2269-1189-4169-9bda-43740ac61d54"), "https://e.snmc.io/lk/p/x/787467ae05c57a6598ea00cb7ab0095d/9917184", "Un RPG open-world ambientato in un futuro distopico, con azione ad alta tecnologia e gameplay incentrato sulla narrativa.", 59.99m, new DateOnly(2020, 12, 10), "Cyberpunk 2077" }
                });

            migrationBuilder.InsertData(
                table: "GameCategories",
                columns: new[] { "CategoryId", "GameId" },
                values: new object[,]
                {
                    { 1, new Guid("0c462717-8f0b-4b03-af2b-73af06d1daab") },
                    { 1, new Guid("4b283381-040c-4bc2-a8ba-d68ccdef5ef8") },
                    { 1, new Guid("68998e4c-c5c9-49d6-a88b-387b9d25fb64") },
                    { 1, new Guid("6a4e55e7-1606-461e-b6e7-9e1548c4c304") },
                    { 1, new Guid("8f167edf-3776-4382-8303-44f6171daac2") },
                    { 1, new Guid("b30f1ee8-923a-4137-9219-a5b0e662234c") },
                    { 1, new Guid("c789e653-bdd3-4dae-bde0-888ba4f25a5a") },
                    { 1, new Guid("c7e65512-f05f-4f70-83b4-8a15b2db342f") },
                    { 1, new Guid("e32a9ac5-ac0a-4a76-92b8-a689c863b679") },
                    { 1, new Guid("efa61b60-449e-47a8-969f-ac2bbeb713ad") },
                    { 2, new Guid("6a4e55e7-1606-461e-b6e7-9e1548c4c304") },
                    { 2, new Guid("74a82095-c501-4c95-a085-c833119924d9") },
                    { 3, new Guid("0b21dda9-0dbc-45d0-bdac-fbb6ed9d2bdf") },
                    { 3, new Guid("0c462717-8f0b-4b03-af2b-73af06d1daab") },
                    { 3, new Guid("1c8fc05d-09e4-4339-8b7a-6f2d072cb646") },
                    { 3, new Guid("4b283381-040c-4bc2-a8ba-d68ccdef5ef8") },
                    { 3, new Guid("6a4e55e7-1606-461e-b6e7-9e1548c4c304") },
                    { 3, new Guid("8f167edf-3776-4382-8303-44f6171daac2") },
                    { 3, new Guid("b30f1ee8-923a-4137-9219-a5b0e662234c") },
                    { 3, new Guid("c789e653-bdd3-4dae-bde0-888ba4f25a5a") },
                    { 3, new Guid("c7e65512-f05f-4f70-83b4-8a15b2db342f") },
                    { 3, new Guid("efa61b60-449e-47a8-969f-ac2bbeb713ad") },
                    { 4, new Guid("3d85ca22-cf31-4c24-84c2-21cb5f23827f") },
                    { 4, new Guid("c56fcfe3-3983-4156-a1fe-68d042ec528c") },
                    { 4, new Guid("eb8a08cb-469a-4c21-8bcf-caf12e4f7b05") },
                    { 5, new Guid("2dbac8da-74ba-40e1-942a-544da7d20ec4") },
                    { 5, new Guid("667dc63f-5dcd-47f0-8913-77bfac892b31") },
                    { 6, new Guid("2dbac8da-74ba-40e1-942a-544da7d20ec4") },
                    { 6, new Guid("667dc63f-5dcd-47f0-8913-77bfac892b31") },
                    { 6, new Guid("d181a5e2-96d2-4c79-a1f3-54dcf202f540") },
                    { 7, new Guid("2dbac8da-74ba-40e1-942a-544da7d20ec4") },
                    { 7, new Guid("d181a5e2-96d2-4c79-a1f3-54dcf202f540") },
                    { 8, new Guid("b30f1ee8-923a-4137-9219-a5b0e662234c") },
                    { 8, new Guid("c789e653-bdd3-4dae-bde0-888ba4f25a5a") },
                    { 8, new Guid("c7e65512-f05f-4f70-83b4-8a15b2db342f") },
                    { 9, new Guid("68998e4c-c5c9-49d6-a88b-387b9d25fb64") },
                    { 9, new Guid("c789e653-bdd3-4dae-bde0-888ba4f25a5a") },
                    { 11, new Guid("312733b8-23e9-4282-a468-fe204f83f10d") },
                    { 11, new Guid("3ec73a5c-a14c-4403-a916-ac49c9d1f0e5") },
                    { 12, new Guid("1c8fc05d-09e4-4339-8b7a-6f2d072cb646") },
                    { 12, new Guid("3d85ca22-cf31-4c24-84c2-21cb5f23827f") },
                    { 12, new Guid("e32a9ac5-ac0a-4a76-92b8-a689c863b679") },
                    { 12, new Guid("eb8a08cb-469a-4c21-8bcf-caf12e4f7b05") },
                    { 14, new Guid("0b21dda9-0dbc-45d0-bdac-fbb6ed9d2bdf") },
                    { 14, new Guid("312733b8-23e9-4282-a468-fe204f83f10d") },
                    { 14, new Guid("3d85ca22-cf31-4c24-84c2-21cb5f23827f") },
                    { 14, new Guid("3ec73a5c-a14c-4403-a916-ac49c9d1f0e5") },
                    { 14, new Guid("667dc63f-5dcd-47f0-8913-77bfac892b31") },
                    { 14, new Guid("74a82095-c501-4c95-a085-c833119924d9") },
                    { 14, new Guid("8f167edf-3776-4382-8303-44f6171daac2") },
                    { 14, new Guid("c56fcfe3-3983-4156-a1fe-68d042ec528c") },
                    { 14, new Guid("d181a5e2-96d2-4c79-a1f3-54dcf202f540") },
                    { 14, new Guid("e32a9ac5-ac0a-4a76-92b8-a689c863b679") },
                    { 14, new Guid("eb8a08cb-469a-4c21-8bcf-caf12e4f7b05") },
                    { 15, new Guid("4943a4ab-77dc-4b5b-9e28-8624aedf14de") },
                    { 15, new Guid("68998e4c-c5c9-49d6-a88b-387b9d25fb64") },
                    { 15, new Guid("74a82095-c501-4c95-a085-c833119924d9") },
                    { 16, new Guid("0b21dda9-0dbc-45d0-bdac-fbb6ed9d2bdf") },
                    { 17, new Guid("4943a4ab-77dc-4b5b-9e28-8624aedf14de") },
                    { 18, new Guid("0c462717-8f0b-4b03-af2b-73af06d1daab") },
                    { 18, new Guid("1c8fc05d-09e4-4339-8b7a-6f2d072cb646") },
                    { 18, new Guid("4943a4ab-77dc-4b5b-9e28-8624aedf14de") },
                    { 18, new Guid("4b283381-040c-4bc2-a8ba-d68ccdef5ef8") },
                    { 18, new Guid("74a82095-c501-4c95-a085-c833119924d9") },
                    { 18, new Guid("b30f1ee8-923a-4137-9219-a5b0e662234c") },
                    { 18, new Guid("efa61b60-449e-47a8-969f-ac2bbeb713ad") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UserName",
                table: "AspNetUsers",
                column: "UserName",
                unique: true,
                filter: "[UserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_GameId",
                table: "Carts",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_IdGame",
                table: "Comments",
                column: "IdGame");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_IdUser",
                table: "Comments",
                column: "IdUser");

            migrationBuilder.CreateIndex(
                name: "IX_ExtraImages_GameId",
                table: "ExtraImages",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_GameCategories_GameId",
                table: "GameCategories",
                column: "GameId");

            migrationBuilder.CreateIndex(
                name: "IX_Libraries_IdUser",
                table: "Libraries",
                column: "IdUser");

            migrationBuilder.CreateIndex(
                name: "IX_VideoGames_CompanyId",
                table: "VideoGames",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_WishLists_IdUser",
                table: "WishLists",
                column: "IdUser");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "ExtraImages");

            migrationBuilder.DropTable(
                name: "GameCategories");

            migrationBuilder.DropTable(
                name: "Libraries");

            migrationBuilder.DropTable(
                name: "WishLists");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "VideoGames");

            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}
