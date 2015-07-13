using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FIFA14.Models
{
    public class Group
    {
        public int GroupID { get; set; }
        public string Title { get; set; }
        public virtual ICollection<Nation> NationsInGroup { get; set; }
    }
}