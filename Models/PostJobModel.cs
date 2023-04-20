using System.ComponentModel.DataAnnotations.Schema;

namespace JOB_PORTAL_WEBAPP.Models
    {
    public class PostJobModel
        {
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
        public int id { get; set; }
        public decimal salary { get; set; }
        public string desc { get; set; }
        public string type { get; set; }
        public string companyname { get; set; }
        public string jobName { get; set; }
        public string location { get; set; }
        public string category { get; set; }

        }
    }
