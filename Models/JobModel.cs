using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace JOB_PORTAL_WEBAPP
{
    public class JobModel

    {
        public int JOBID { get; set; }

        public string ROLE { get; set; }

        public decimal SALARY { get; set; }

        public int COMPANYID { get; set; }

        public string COMPANYNAME { get; set; }

        public string LOCATION { get; set; }
        public bool isInserted { get; set; }
        public bool isFetched { get; set; }
        public bool isUpdated { get; set; }
        public bool isDeleted { get; set; }

    }
}
