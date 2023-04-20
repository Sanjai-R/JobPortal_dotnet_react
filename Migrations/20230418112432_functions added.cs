using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JOB_PORTAL_WEBAPP.Migrations
{
    /// <inheritdoc />
    public partial class functionsadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CategoryModel",
                columns: table => new
                {
                    CatID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CatName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryModel", x => x.CatID);
                });

            migrationBuilder.CreateTable(
                name: "CompanyModel",
                columns: table => new
                {
                    CompanyID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompanyLocation = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyModel", x => x.CompanyID);
                });

            migrationBuilder.CreateTable(
                name: "SubcategoryModel",
                columns: table => new
                {
                    SubCatID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SubCatName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CatID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubcategoryModel", x => x.SubCatID);
                    table.ForeignKey(
                        name: "FK_SubcategoryModel_CategoryModel_CatID",
                        column: x => x.CatID,
                        principalTable: "CategoryModel",
                        principalColumn: "CatID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_CompanyID",
                table: "Jobs",
                column: "CompanyID");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_SubCatID",
                table: "Jobs",
                column: "SubCatID");

            migrationBuilder.CreateIndex(
                name: "IX_SubcategoryModel_CatID",
                table: "SubcategoryModel",
                column: "CatID");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_CompanyModel_CompanyID",
                table: "Jobs",
                column: "CompanyID",
                principalTable: "CompanyModel",
                principalColumn: "CompanyID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_SubcategoryModel_SubCatID",
                table: "Jobs",
                column: "SubCatID",
                principalTable: "SubcategoryModel",
                principalColumn: "SubCatID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_CompanyModel_CompanyID",
                table: "Jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_SubcategoryModel_SubCatID",
                table: "Jobs");

            migrationBuilder.DropTable(
                name: "CompanyModel");

            migrationBuilder.DropTable(
                name: "SubcategoryModel");

            migrationBuilder.DropTable(
                name: "CategoryModel");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_CompanyID",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_SubCatID",
                table: "Jobs");
        }
    }
}
