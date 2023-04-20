using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JOB_PORTAL_WEBAPP;
using JOB_PORTAL_WEBAPP.Models;

namespace JOB_PORTAL_WEBAPP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly JobPortalContext _context;

        public JobController(JobPortalContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetJobs()
            {
            
            var jobs = await _context.Jobs
                .Include(j => j.Company)
                .Include(j => j.Subcategory)
                .ThenInclude(j => j.Category)
                .ToListAsync();
            List<dynamic> jobList = new List<dynamic>();
            foreach (JobModel job in jobs)
                {
                var newJob = new
                    {
                    id = job.JobID,
                    salary = job.Salary,
                    desc = job.Description,
                    type = job.JobType,
                    companyname = job.Company.CompanyName,
                    jobName = job.Subcategory.SubCatName,
                    location = job.Company.CompanyLocation,
                    category = job.Subcategory.Category.CatName,
                    };
                jobList.Add(newJob);
                }

            return Ok(jobList);
            }



        [HttpGet("{id}")]
        public async Task<ActionResult<JobModel>> GetJobModel(int id)
        {
            var job = await _context.Jobs
    .Include(j => j.Company) // Include related entity Company
    .Include(j => j.Subcategory)
    .ThenInclude(j => j.Category)// Include related entity Subcategory
    .SingleOrDefaultAsync(j => j.JobID == id);

            if (job == null)
            {
                return NotFound();
            }

            return job;
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutJobModel(int id, JobModel jobModel)
        {
            if (id != jobModel.JobID)
            {
                return BadRequest();
            }

            _context.Entry(jobModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        [HttpPost]
        public async Task<ActionResult<JobModel>> PostJobModel(JobModel job)
        {
            Console.WriteLine("j------------------------------------------------------------------------------------------------------------------------------------------------------");
            c
            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJobModel", new { id = job.JobID }, job);
            
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobModel(int id)
        {
            
            var jobModel = await _context.Jobs.FindAsync(id);
            if (jobModel == null)
            {
                return NotFound();
            }

            _context.Jobs.Remove(jobModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JobModelExists(int id)
        {
            return _context.Jobs.Any(e => e.JobID == id);
        }
    }
}
