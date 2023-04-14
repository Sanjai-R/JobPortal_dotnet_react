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
        SqlConnection conn;

        List<JobModel> jobs;

        public GetJobController(IConfiguration configuration)
        {
            this.configuration = configuration;
            conn = new SqlConnection(configuration.GetConnectionString("dev1"));
        }

        [HttpGet]
        public List<JobModel> Get()
        {
            jobs = new List<JobModel>();

            try
            {
                conn.Open();
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = Queries.GetAllJobs;

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
            finally
            {
                conn.Close();
            }
            return jobs;
        }



    }
}