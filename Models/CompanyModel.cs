using System.ComponentModel.DataAnnotations;

namespace JOB_PORTAL_WEBAPP.Models
    {
    public class CompanyModel
        {
        [Key]
        public int CompanyID { get; set; }
        public string CompanyName { get; set; }
        public string CompanyLocation { get; set; }
        }
    }
