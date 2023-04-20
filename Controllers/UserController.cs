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
    public class UserController : ControllerBase
    {
        private readonly JobPortalContext _context;

        public UserController(JobPortalContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUserModel(int id)
        {
            var userModel = await _context.Users.FindAsync(id);

            if (userModel == null)
            {
                return NotFound();
            }

            return userModel;
        }




        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserModel(int id, UserModel userModel)
        {
            if (id != userModel.UserID)
            {
                return BadRequest();
            }

            _context.Entry(userModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserModelExists(id))
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

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserModel>> PostUserModel(UserModel userModel)
        {
            var temp = _context.Users
                          .Where(x => x.Username == userModel.Username
                          && x.Email == userModel.Email)
                          .FirstOrDefault();

            if (temp == null)
                {
                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userModel.Password);
                userModel.Password = hashedPassword;
                _context.Users.Add(userModel);
                await _context.SaveChangesAsync();

                }
            else
                userModel = temp;
            return CreatedAtAction("GetUserModel", new { id = userModel.UserID }, userModel);
           
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserModel>> LoginUser(UserModel data)
            {
            // Find user by email
            var userModel = await _context.Users.FirstOrDefaultAsync(u => u.Email == data.Email);

            Console.WriteLine(userModel.Password);
            if (userModel == null)
                {
                return NotFound();
                }

            // Validate password
            if (!BCrypt.Net.BCrypt.Verify(data.Password, userModel.Password))
                {
                return StatusCode(401, "Invalid password");
                }

            // Return user model
            return userModel;
            }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserModel(int id)
        {
            var userModel = await _context.Users.FindAsync(id);
            if (userModel == null)
            {
                return NotFound();
            }

            _context.Users.Remove(userModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserModelExists(int id)
        {
            return _context.Users.Any(e => e.UserID == id);
        }
    }
}
