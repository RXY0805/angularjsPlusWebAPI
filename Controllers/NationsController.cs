using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using FIFA14.DAL;
using FIFA14.Models;

namespace FIFA14.Controllers
{
    public class NationsController : ApiController
    {
        private FIFA14Context db = new FIFA14Context();

        // GET: api/Nations
        public IQueryable<Nation> GetNations()
        {
            return db.Nations;
        }

        // GET: api/Nations/5
        [ResponseType(typeof(Nation))]
        public async Task<IHttpActionResult> GetNation(int id)
        {
            Nation nation = await db.Nations.FindAsync(id);
            if (nation == null)
            {
                return NotFound();
            }

            return Ok(nation);
        }

        // PUT: api/Nations/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutNation(int id, Nation nation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nation.NationID)
            {
                return BadRequest();
            }

            Group currentGroup = (nation.GroupID == nation.Group.GroupID) ? nation.Group : db.Groups.Find(nation.GroupID);
            nation.Group = currentGroup;

            db.Entry(nation).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Nations
        [ResponseType(typeof(Nation))]
        public async Task<IHttpActionResult> PostNation(Nation nation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var isExistNation=db.Nations.Where(n => n.Name == nation.Name).FirstOrDefault();

            if (isExistNation == null)
            {
                db.Nations.Add(nation);
                await db.SaveChangesAsync();
            }
            else
            {

            }
            return CreatedAtRoute("DefaultApi", new { id = nation.NationID }, nation);
            
        }

        // DELETE: api/Nations/5
        [ResponseType(typeof(Nation))]
        public async Task<IHttpActionResult> DeleteNation(int id)
        {
            Nation nation = await db.Nations.FindAsync(id);
            if (nation == null)
            {
                return NotFound();
            }

            db.Nations.Remove(nation);
            await db.SaveChangesAsync();

            return Ok(nation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NationExists(int id)
        {
            return db.Nations.Count(e => e.NationID == id) > 0;
        }
    }
}