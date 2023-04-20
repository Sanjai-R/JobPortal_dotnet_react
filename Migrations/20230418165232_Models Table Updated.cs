using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JOB_PORTAL_WEBAPP.Migrations
{
    /// <inheritdoc />
    public partial class ModelsTableUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_CompanyModel_CompanyID",
                table: "Jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_SubcategoryModel_SubCatID",
                table: "Jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_SubcategoryModel_CategoryModel_CatID",
                table: "SubcategoryModel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubcategoryModel",
                table: "SubcategoryModel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyModel",
                table: "CompanyModel");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CategoryModel",
                table: "CategoryModel");

            migrationBuilder.RenameTable(
                name: "SubcategoryModel",
                newName: "Subcategories");

            migrationBuilder.RenameTable(
                name: "CompanyModel",
                newName: "Companies");

            migrationBuilder.RenameTable(
                name: "CategoryModel",
                newName: "Categories");

            migrationBuilder.RenameIndex(
                name: "IX_SubcategoryModel_CatID",
                table: "Subcategories",
                newName: "IX_Subcategories_CatID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Subcategories",
                table: "Subcategories",
                column: "SubCatID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Companies",
                table: "Companies",
                column: "CompanyID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "CatID");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Companies_CompanyID",
                table: "Jobs",
                column: "CompanyID",
                principalTable: "Companies",
                principalColumn: "CompanyID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Subcategories_SubCatID",
                table: "Jobs",
                column: "SubCatID",
                principalTable: "Subcategories",
                principalColumn: "SubCatID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategories_Categories_CatID",
                table: "Subcategories",
                column: "CatID",
                principalTable: "Categories",
                principalColumn: "CatID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Companies_CompanyID",
                table: "Jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Subcategories_SubCatID",
                table: "Jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_Subcategories_Categories_CatID",
                table: "Subcategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Subcategories",
                table: "Subcategories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Companies",
                table: "Companies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.RenameTable(
                name: "Subcategories",
                newName: "SubcategoryModel");

            migrationBuilder.RenameTable(
                name: "Companies",
                newName: "CompanyModel");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "CategoryModel");

            migrationBuilder.RenameIndex(
                name: "IX_Subcategories_CatID",
                table: "SubcategoryModel",
                newName: "IX_SubcategoryModel_CatID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubcategoryModel",
                table: "SubcategoryModel",
                column: "SubCatID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyModel",
                table: "CompanyModel",
                column: "CompanyID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CategoryModel",
                table: "CategoryModel",
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

            migrationBuilder.AddForeignKey(
                name: "FK_SubcategoryModel_CategoryModel_CatID",
                table: "SubcategoryModel",
                column: "CatID",
                principalTable: "CategoryModel",
                principalColumn: "CatID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
