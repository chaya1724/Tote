using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tore.DBModels;
using Tore.Models;

namespace Tore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecifisController : ControllerBase
    {
        private readonly MyDbContext _context;

        public SpecifisController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Specifis
        [HttpGet]
        [Route("GetSpecific")]
        public async Task<ActionResult<IEnumerable<Specifi>>> GetSpecific()
        {
            return await _context.Specific.ToListAsync();
        }

        // GET: api/Specifis/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Specifi>> GetSpecifi(int id)
        {
            var specifi = await _context.Specific.FindAsync(id);

            if (specifi == null)
            {
                return NotFound();
            }

            return specifi;
        }

        // PUT: api/Specifis/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpecifi(int id, Specifi specifi)
        {
            if (id != specifi.Id)
            {
                return BadRequest();
            }

            _context.Entry(specifi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SpecifiExists(id))
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

        // POST: api/Specifis
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Route("PostSpecifi")]
        public async Task<ActionResult<Specifi>> PostSpecifi([FromBody] Specifi specifi)
        {
            _context.Specific.Add(specifi);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSpecifi", new { id = specifi.Id }, specifi);
        }

        // DELETE: api/Specifis/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Specifi>> DeleteSpecifi(int id)
        {
            var specifi = await _context.Specific.FindAsync(id);
            if (specifi == null)
            {
                return NotFound();
            }

            _context.Specific.Remove(specifi);
            await _context.SaveChangesAsync();

            return specifi;
        }

        private bool SpecifiExists(int id)
        {
            return _context.Specific.Any(e => e.Id == id);
        }
    }
}
