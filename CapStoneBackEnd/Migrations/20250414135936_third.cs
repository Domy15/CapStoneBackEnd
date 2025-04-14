using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CapStoneBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class third : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CoverLarge",
                table: "VideoGames",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("0b21dda9-0dbc-45d0-bdac-fbb6ed9d2bdf"),
                column: "CoverLarge",
                value: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/39210/47a2e4f5387b9ac6ef19716df44127fccd746ca2/capsule_616x353.jpg?t=1738089746");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("0c462717-8f0b-4b03-af2b-73af06d1daab"),
                column: "CoverLarge",
                value: "https://cdn-l-thewitcher.cdprojektred.com/meta/TW3NG_thumbnail_en.png");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("1c8fc05d-09e4-4339-8b7a-6f2d072cb646"),
                column: "CoverLarge",
                value: "https://image.api.playstation.com/vulcan/ap/rnd/202009/2502/rB3GRFvdPmaALiGt89ysflQ4.jpg");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("2dbac8da-74ba-40e1-942a-544da7d20ec4"),
                column: "CoverLarge",
                value: "https://www.nerdpool.it/wp-content/uploads/2023/05/Gran-Turismo-7-copertina.jpg");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("312733b8-23e9-4282-a468-fe204f83f10d"),
                column: "CoverLarge",
                value: "https://image.api.playstation.com/vulcan/img/rnd/202111/1200/u36iCgbHmBSZoHOIm3GeKmii.jpg");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("3d85ca22-cf31-4c24-84c2-21cb5f23827f"),
                column: "CoverLarge",
                value: "https://gaming-cdn.com/images/products/2208/orig/overwatch-pc-gioco-battle-net-cover.jpg?v=1668415006");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("3ec73a5c-a14c-4403-a916-ac49c9d1f0e5"),
                column: "CoverLarge",
                value: "https://static1.squarespace.com/static/574bec3527d4bdfe229ea099/574c3700555986b356d3fd56/6098cfd865b40529aad7d5c9/1622119197367/Titolo.jpeg?format=1500w");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("4943a4ab-77dc-4b5b-9e28-8624aedf14de"),
                column: "CoverLarge",
                value: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_Minecraft_image1600w.jpg");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("4b283381-040c-4bc2-a8ba-d68ccdef5ef8"),
                column: "CoverLarge",
                value: "https://cdn1.epicgames.com/400347196e674de89c23cc2a7f2121db/offer/AC%20KINGDOM%20PREORDER_STANDARD%20EDITION_EPIC_Key_Art_Wide_3840x2160-3840x2160-485fe17203671386c71bde8110886c7d.jpg");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("667dc63f-5dcd-47f0-8913-77bfac892b31"),
                column: "CoverLarge",
                value: "https://www.fifaultimateteam.it/wp-content/uploads/2022/07/Kylian_Mbappe_GEN5_KM_CROP_SOCIAL_1920x1080.jpg");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("68998e4c-c5c9-49d6-a88b-387b9d25fb64"),
                column: "CoverLarge",
                value: "https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/0kRqUeSBIbQzz7cen3c989c6.jpg");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("6a4e55e7-1606-461e-b6e7-9e1548c4c304"),
                column: "CoverLarge",
                value: "https://gaming-cdn.com/images/products/5913/616x353/final-fantasy-vii-remake-intergrade-pc-gioco-steam-cover.jpg?v=1736438481");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("74a82095-c501-4c95-a085-c833119924d9"),
                column: "CoverLarge",
                value: "https://store-images.s-microsoft.com/image/apps.58752.13942869738016799.078aba97-2f28-440f-97b6-b852e1af307a.95fdf1a1-efd6-4938-8100-8abae91695d6?q=90&w=480&h=270");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("8f167edf-3776-4382-8303-44f6171daac2"),
                column: "CoverLarge",
                value: "https://gaming-cdn.com/images/products/7930/orig/monster-hunter-wilds-pc-gioco-steam-europe-cover.jpg?v=1741077660");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("b30f1ee8-923a-4137-9219-a5b0e662234c"),
                column: "CoverLarge",
                value: "https://image.api.playstation.com/vulcan/img/rnd/202111/0506/hcFeWRVGHYK72uOw6Mn6f4Ms.jpg");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("c56fcfe3-3983-4156-a1fe-68d042ec528c"),
                column: "CoverLarge",
                value: "https://blz-contentstack-images.akamaized.net/v3/assets/bltc965041283bac56c/blt82bb2ee72a2b0baf/651ee3b3e4a8af6535bd6de3/stepintavernthumbnail.PNG");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("c789e653-bdd3-4dae-bde0-888ba4f25a5a"),
                column: "CoverLarge",
                value: "https://www.lorebloodborne.it/wp-content/uploads/2021/09/Cacciatore-Bloodborne-1024x576.jpg");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("c7e65512-f05f-4f70-83b4-8a15b2db342f"),
                column: "CoverLarge",
                value: "https://image.api.playstation.com/vulcan/ap/rnd/202009/2820/h12URI7MdswtFPFHpkppNh2z.png");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("d181a5e2-96d2-4c79-a1f3-54dcf202f540"),
                column: "CoverLarge",
                value: "https://www.senna.com/wp-content/uploads/2018/07/Forza-Horizon-4_Small-Horizontal-Art-860x484-2.jpg");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("e32a9ac5-ac0a-4a76-92b8-a689c863b679"),
                column: "CoverLarge",
                value: "https://image.api.playstation.com/vulcan/ap/rnd/202503/2819/346190abf755e3883d1353fbc8d8ccb7e1acf076f1138d6b.jpg");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("eb8a08cb-469a-4c21-8bcf-caf12e4f7b05"),
                column: "CoverLarge",
                value: "https://cdn1.epicgames.com/spt-assets/eb15454c010f4a748498cd3a62096a52/marvel-rivals-1ywtf.png");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("efa61b60-449e-47a8-969f-ac2bbeb713ad"),
                column: "CoverLarge",
                value: "https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoverLarge",
                table: "VideoGames");
        }
    }
}
