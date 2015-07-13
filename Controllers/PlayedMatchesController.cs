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
    public class PlayedMatchesController : ApiController
    {
        private FIFA14Context db = new FIFA14Context();

        // GET: api/PlayedMatches
        public IQueryable<PlayedMatch> GetPlayedMatches()
        {
            return db.PlayedMatches;
        }

        // GET: api/PlayedMatches/5
        [ResponseType(typeof(PlayedMatch))]
        public async Task<IHttpActionResult> GetPlayedMatch(int id)
        {
            PlayedMatch playedMatch = await db.PlayedMatches.FindAsync(id);
            if (playedMatch == null)
            {
                return NotFound();
            }

            return Ok(playedMatch);
        }

        // PUT: api/PlayedMatches/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPlayedMatch(int id, PlayedMatch playedMatch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != playedMatch.PlayedMatchID)
            {
                return BadRequest();
            }

            db.Entry(playedMatch).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayedMatchExists(id))
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

        // POST: api/PlayedMatches
        [ResponseType(typeof(PlayedMatch))]
        public async Task<IHttpActionResult> PostPlayedMatch(PlayedMatch playedMatch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            //playedMatch.Nation=db.Nations.fi
            //var nation = await db.Nations.SingleOrDefaultAsync(n => n.NationID == playedMatch.NationID);
            //playedMatch.Nation = nation;
            //var match = await db.Matches.SingleOrDefaultAsync(m => m.MatchID == playedMatch.MatchID);
            //playedMatch.Match = match;
            db.PlayedMatches.Add(playedMatch);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = playedMatch.PlayedMatchID }, playedMatch);
        }

        // DELETE: api/PlayedMatches/5
        [ResponseType(typeof(PlayedMatch))]
        public async Task<IHttpActionResult> DeletePlayedMatch(int id)
        {
            PlayedMatch playedMatch = await db.PlayedMatches.FindAsync(id);
            if (playedMatch == null)
            {
                return NotFound();
            }

            db.PlayedMatches.Remove(playedMatch);
            await db.SaveChangesAsync();

            return Ok(playedMatch);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PlayedMatchExists(int id)
        {
            return db.PlayedMatches.Count(e => e.PlayedMatchID == id) > 0;
        }
    }
}