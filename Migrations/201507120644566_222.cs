namespace FIFA14.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _222 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Groups",
                c => new
                    {
                        GroupID = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                    })
                .PrimaryKey(t => t.GroupID);
            
            CreateTable(
                "dbo.Nations",
                c => new
                    {
                        NationID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        FlagUrl = c.String(),
                        WinCount = c.Int(nullable: false),
                        DrawCount = c.Int(nullable: false),
                        LostCount = c.Int(nullable: false),
                        GoalCount = c.Int(nullable: false),
                        LostGoalCount = c.Int(nullable: false),
                        GroupID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.NationID)
                .ForeignKey("dbo.Groups", t => t.GroupID, cascadeDelete: true)
                .Index(t => t.GroupID);
            
            CreateTable(
                "dbo.Matches",
                c => new
                    {
                        MatchID = c.Int(nullable: false, identity: true),
                        MatchDate = c.DateTime(nullable: false),
                        MatchStadium = c.String(),
                    })
                .PrimaryKey(t => t.MatchID);
            
            CreateTable(
                "dbo.People",
                c => new
                    {
                        PersonID = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        BirthDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.PersonID);
            
            CreateTable(
                "dbo.PlayedMatches",
                c => new
                    {
                        PlayedMatchID = c.Int(nullable: false, identity: true),
                        MatchID = c.Int(nullable: false),
                        NationID = c.Int(nullable: false),
                        Score = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.PlayedMatchID)
                .ForeignKey("dbo.Matches", t => t.MatchID, cascadeDelete: true)
                .ForeignKey("dbo.Nations", t => t.NationID, cascadeDelete: true)
                .Index(t => t.MatchID)
                .Index(t => t.NationID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PlayedMatches", "NationID", "dbo.Nations");
            DropForeignKey("dbo.PlayedMatches", "MatchID", "dbo.Matches");
            DropForeignKey("dbo.Nations", "GroupID", "dbo.Groups");
            DropIndex("dbo.PlayedMatches", new[] { "NationID" });
            DropIndex("dbo.PlayedMatches", new[] { "MatchID" });
            DropIndex("dbo.Nations", new[] { "GroupID" });
            DropTable("dbo.PlayedMatches");
            DropTable("dbo.People");
            DropTable("dbo.Matches");
            DropTable("dbo.Nations");
            DropTable("dbo.Groups");
        }
    }
}
