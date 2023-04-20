using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JOB_PORTAL_WEBAPP.Models;

namespace JOB_PORTAL_WEBAPP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubcategoryController : ControllerBase
    {
        private readonly JobPortalContext _context;

        public SubcategoryController(JobPortalContext context)
        {
            _context = context;
        }

        // GET: api/Subcategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubcategoryModel>>> GetSubcategories()
        {
            var subcategories =  await _context.Subcategories.Include(j => j.Category).ToListAsync();
            List<dynamic> res =new List<dynamic>();
            foreach(SubcategoryModel sub in subcategories)
                {
                var temp = new
                    {
                    subCategory = sub.SubCatName,
                    subCatId = sub.SubCatID,
                    category = sub.Category.CatName,
                    catId = sub.Category.CatID,
                    };
                res.Add(temp);
                }
            return Ok(new {status= true,data= res});

        }

        // GET: api/Subcategory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubcategoryModel>> GetSubcategoryModel(int id)
        {
            var subcategoryModel = await _context.Subcategories.FindAsync(id);

            if (subcategoryModel == null)
            {
                return NotFound();
            }

            return subcategoryModel;
        }

        // PUT: api/Subcategory/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubcategoryModel(int id, SubcategoryModel subcategoryModel)
        {
            if (id != subcategoryModel.SubCatID)
            {
                return BadRequest();
            }

            _context.Entry(subcategoryModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubcategoryModelExists(id))
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

        // POST: api/Subcategory
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SubcategoryModel>> PostSubcategoryModel(SubcategoryModel subcategoryModel)
        {
            _context.Subcategories.Add(subcategoryModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubcategoryModel", new { id = subcategoryModel.SubCatID }, subcategoryModel);
        }

        // DELETE: api/Subcategory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubcategoryModel(int id)
        {
            var subcategoryModel = await _context.Subcategories.FindAsync(id);
            if (subcategoryModel == null)
            {
                return NotFound();
            }

            _context.Subcategories.Remove(subcategoryModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubcategoryModelExists(int id)
        {
            return _context.Subcategories.Any(e => e.SubCatID == id);
        }
    }
}
