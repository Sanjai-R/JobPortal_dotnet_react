using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JOB_PORTAL_WEBAPP.Models
    {
    public class CategoryModel
        {
        [Key]
        public int CatID { get; set; }
        public string CatName { get; set; }
        }
    public class SubcategoryModel
        {
        [Key]
        public int SubCatID { get; set; }
        public string SubCatName { get; set; }
        [ForeignKey("Category")]
        public int CatID { get; set; }
        public CategoryModel Category { get; set; }
        }
    }
