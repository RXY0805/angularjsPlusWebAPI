using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using FIFA14.Models;


namespace FIFA14.DAL
{
    public class FIFA14Context:DbContext
    {
        public FIFA14Context() : base("FIFA14Context")
        {

        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Nation> Nations { get; set; }
        public DbSet<PlayedMatch> PlayedMatches { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<Person> People { get; set; }
    }
}