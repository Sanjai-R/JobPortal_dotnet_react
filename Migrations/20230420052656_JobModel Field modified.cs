using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JOB_PORTAL_WEBAPP.Migrations
{
    /// <inheritdoc />
    public partial class JobModelFieldmodified : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "JobSalary",
                table: "Jobs",
                newName: "Salary");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Salary",
                table: "Jobs",
                newName: "JobSalary");
        }
    }
}
