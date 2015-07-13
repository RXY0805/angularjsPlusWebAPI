using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FIFA14.Models
{
    public class PlayedMatch
    {
        public int PlayedMatchID { get; set; }
        public int MatchID { get; set; }
        public int NationID { get; set; }
        public int Score { get; set; }

        public virtual Match Match { get; set; }
        public virtual Nation Nation { get; set; }

        public PlayedMatch(){}
    }
}