using Microsoft.EntityFrameworkCore;

namespace JOB_PORTAL_WEBAPP.Models
    {
    public class JobPortalContext: DbContext
        {
        public JobPortalContext(DbContextOptions<JobPortalContext> options) : base(options) { }
        public DbSet<JobModel> Jobs { get; set; }
        public DbSet<UserModel> Users { get; set; }

        public DbSet<CompanyModel> Companies { get; set; }
        public DbSet<SubcategoryModel> Subcategories { get; set; }

        public DbSet<CategoryModel> Categories { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
            modelBuilder.Entity<JobModel>()
                .Property(j => j.Salary)
                .HasColumnType("decimal(18, 2)"); // Specify the appropriate SQL Server column type and precision/scale
            }

        }
    }
