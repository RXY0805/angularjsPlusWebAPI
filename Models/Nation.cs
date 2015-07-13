using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FIFA14.Models
{
    public class Nation
    {
        public Nation() { }

        public int NationID { get; set; }
        public string Name { get; set; }
        public string FlagUrl { get; set; }
        public int WinCount { get; set; }
        public int DrawCount { get; set; }
        public int LostCount { get; set; }
        public int GoalCount { get; set; }
        public int LostGoalCount { get; set; }
        public int Points { get { return WinCount * 3 + DrawCount * 1; } }
        public int GroupID { get; set; }
        public virtual Group Group { get; set; }
    }
}