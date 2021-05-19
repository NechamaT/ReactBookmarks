using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactBookmarks.Data.Migrations
{
    public partial class nocount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Count",
                table: "Bookmarks");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Bookmarks",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Bookmarks");

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "Bookmarks",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
