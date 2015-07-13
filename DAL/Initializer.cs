using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Diagnostics;
using FIFA14.Models;

namespace FIFA14.DAL
{
    public class Initializer : DropCreateDatabaseIfModelChanges<FIFA14Context>
    {
        protected override void Seed(FIFA14Context context)
        {
            try
            {
                GetGroups().ForEach(g => context.Groups.Add(g));
            }
            catch(Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
        }
        private static List<Group> GetGroups()
        {
            return new List<Group>
            {
                new Group
                {
                    Title="A"
                },
                new Group
                {
                    Title="B"
                },
                new Group
                {
                    Title="C"
                },
                 new Group
                {
                    Title="D"
                }
            };
        }
    }
}