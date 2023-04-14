using JOB_PORTAL_WEBAPP;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace JobPortal.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetJobController : Controller
    {
        IConfiguration configuration;
        List<JobModel> jobs;

        public GetJobController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        public List<JobModel> Get()
        {
            jobs = new List<JobModel>();

            try
            {
                string connectionString = "Data Source=5CG9445SKD;Initial Catalog = JobDB; Encrypt=False; Integrated Security=True";
                SqlConnection conn = new SqlConnection(connectionString);
                conn.Open();
                SqlCommand cmd = conn.CreateCommand();

                //Viewing
                cmd.CommandText = "SELECT * FROM JOB JOIN COMPANY ON  JOB.COMPANYID = COMPANY.COMPANYID;";

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        JobModel obj = new JobModel();

                        obj.JOBID = (int)reader["JOBID"];
                        obj.ROLE = (string)reader["ROLE"];
                        obj.SALARY = Convert.ToInt32(reader["SALARY"]);
                        obj.COMPANYNAME = (string)reader["COMPANYNAME"];
                        obj.LOCATION = (string)reader["LOCATION"];
                        jobs.Add(obj);

                    }
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
           
            return jobs;
        }



    }
}