using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FIFA14.Models
{
    public class Match
    {
        public Match() { }

        public int MatchID { get; set; }
        public DateTime MatchDate { get; set; }
        public string MatchStadium { get; set; }
    }
}