using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CapStoneBackEnd.Migrations
{
    /// <inheritdoc />
    public partial class fourth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoGames_Companies_CompanyId",
                table: "VideoGames");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("c7e65512-f05f-4f70-83b4-8a15b2db342f"),
                column: "Title",
                value: "The Elder Scrolls V: Skyrim");

            migrationBuilder.AddForeignKey(
                name: "FK_VideoGames_Companies_CompanyId",
                table: "VideoGames",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoGames_Companies_CompanyId",
                table: "VideoGames");

            migrationBuilder.UpdateData(
                table: "VideoGames",
                keyColumn: "Id",
                keyValue: new Guid("c7e65512-f05f-4f70-83b4-8a15b2db342f"),
                column: "Title",
                value: "The Elder Scolls V: Skyrim");

            migrationBuilder.AddForeignKey(
                name: "FK_VideoGames_Companies_CompanyId",
                table: "VideoGames",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
