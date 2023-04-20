using System.ComponentModel.DataAnnotations;

namespace JOB_PORTAL_WEBAPP.Models
    {
    public class UserModel
        {
        [Key]
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        }
    }
