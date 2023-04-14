namespace JOB_PORTAL_WEBAPP
{
    public class Queries
    {
        public static string GetAllJobs = "SELECT * FROM JOB JOIN COMPANY ON  JOB.COMPANYID = COMPANY.COMPANYID;";
    }
}