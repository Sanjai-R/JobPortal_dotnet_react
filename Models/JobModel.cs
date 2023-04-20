using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using JOB_PORTAL_WEBAPP.Models;

namespace JOB_PORTAL_WEBAPP
{
    public class JobModel
        {
        [Key]
        public int JobID { get; set; }
        public decimal Salary { get; set; }

        [ForeignKey("Company")]
        public int CompanyID { get; set; }
        public string Description { get; set; }
        [ForeignKey("Subcategory")]
        public int SubCatID { get; set; }
        public string JobType { get; set; }
        public CompanyModel Company { get; set; }
        public SubcategoryModel Subcategory { get; set; }
        }
    }
