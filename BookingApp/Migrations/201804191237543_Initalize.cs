namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initalize : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Accommodations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50),
                        Description = c.String(maxLength: 500),
                        Address = c.String(maxLength: 50),
                        AverageGrade = c.Double(nullable: false),
                        Latitude = c.Double(nullable: false),
                        Longitude = c.Double(nullable: false),
                        ImageURL = c.String(),
                        Approved = c.Boolean(nullable: false),
                        AccommodationTypeId = c.Int(nullable: false),
                        PlaceId = c.Int(nullable: false),
                        OwnerId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AccommodationTypes", t => t.AccommodationTypeId, cascadeDelete: true)
                .ForeignKey("dbo.AppUsers", t => t.OwnerId, cascadeDelete: true)
                .ForeignKey("dbo.Places", t => t.PlaceId, cascadeDelete: true)
                .Index(t => t.AccommodationTypeId)
                .Index(t => t.PlaceId)
                .Index(t => t.OwnerId);
            
            CreateTable(
                "dbo.AccommodationTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true);
            
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        AppUserId = c.Int(nullable: false),
                        AccommodationId = c.Int(nullable: false),
                        Id = c.Int(nullable: false),
                        Text = c.String(),
                        Grade = c.Double(nullable: false),
                    })
                .PrimaryKey(t => new { t.AppUserId, t.AccommodationId })
                .ForeignKey("dbo.Accommodations", t => t.AccommodationId)
                .ForeignKey("dbo.AppUsers", t => t.AppUserId, cascadeDelete: true)
                .Index(t => t.AppUserId)
                .Index(t => t.AccommodationId);
            
            CreateTable(
                "dbo.RoomReservations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        TimeStamp = c.DateTime(nullable: false),
                        RoomId = c.Int(nullable: false),
                        AppUserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AppUsers", t => t.AppUserId, cascadeDelete: true)
                .ForeignKey("dbo.Rooms", t => t.RoomId, cascadeDelete: true)
                .Index(t => t.RoomId)
                .Index(t => t.AppUserId);
            
            CreateTable(
                "dbo.Rooms",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RoomNumber = c.Int(nullable: false),
                        BedCount = c.Int(nullable: false),
                        Description = c.String(maxLength: 500),
                        PricePerNight = c.Double(nullable: false),
                        AccomodationId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Accommodations", t => t.AccomodationId)
                .Index(t => t.AccomodationId);
            
            CreateTable(
                "dbo.Places",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50),
                        RegionId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Regions", t => t.RegionId, cascadeDelete: true)
                .Index(t => t.RegionId);
            
            CreateTable(
                "dbo.Regions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50),
                        CountryId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Countries", t => t.CountryId, cascadeDelete: true)
                .Index(t => t.CountryId);
            
            CreateTable(
                "dbo.Countries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50),
                        Code = c.String(nullable: false, maxLength: 10),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.AppUsers", "Name", c => c.String(nullable: false, maxLength: 20));
            AddColumn("dbo.AppUsers", "LastName", c => c.String(nullable: false, maxLength: 20));
            AddColumn("dbo.AppUsers", "IsBanned", c => c.Boolean(nullable: false));
            AddColumn("dbo.AspNetUsers", "AppUserId", c => c.Int());
            CreateIndex("dbo.AspNetUsers", "AppUserId");
            AddForeignKey("dbo.AspNetUsers", "AppUserId", "dbo.AppUsers", "Id");
            DropColumn("dbo.AppUsers", "FullName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AppUsers", "FullName", c => c.Int(nullable: false));
            DropForeignKey("dbo.AspNetUsers", "AppUserId", "dbo.AppUsers");
            DropForeignKey("dbo.Accommodations", "PlaceId", "dbo.Places");
            DropForeignKey("dbo.Places", "RegionId", "dbo.Regions");
            DropForeignKey("dbo.Regions", "CountryId", "dbo.Countries");
            DropForeignKey("dbo.Accommodations", "OwnerId", "dbo.AppUsers");
            DropForeignKey("dbo.Comments", "AppUserId", "dbo.AppUsers");
            DropForeignKey("dbo.RoomReservations", "RoomId", "dbo.Rooms");
            DropForeignKey("dbo.Rooms", "AccomodationId", "dbo.Accommodations");
            DropForeignKey("dbo.RoomReservations", "AppUserId", "dbo.AppUsers");
            DropForeignKey("dbo.Comments", "AccommodationId", "dbo.Accommodations");
            DropForeignKey("dbo.Accommodations", "AccommodationTypeId", "dbo.AccommodationTypes");
            DropIndex("dbo.AspNetUsers", new[] { "AppUserId" });
            DropIndex("dbo.Regions", new[] { "CountryId" });
            DropIndex("dbo.Places", new[] { "RegionId" });
            DropIndex("dbo.Rooms", new[] { "AccomodationId" });
            DropIndex("dbo.RoomReservations", new[] { "AppUserId" });
            DropIndex("dbo.RoomReservations", new[] { "RoomId" });
            DropIndex("dbo.Comments", new[] { "AccommodationId" });
            DropIndex("dbo.Comments", new[] { "AppUserId" });
            DropIndex("dbo.AccommodationTypes", new[] { "Name" });
            DropIndex("dbo.Accommodations", new[] { "OwnerId" });
            DropIndex("dbo.Accommodations", new[] { "PlaceId" });
            DropIndex("dbo.Accommodations", new[] { "AccommodationTypeId" });
            DropColumn("dbo.AspNetUsers", "AppUserId");
            DropColumn("dbo.AppUsers", "IsBanned");
            DropColumn("dbo.AppUsers", "LastName");
            DropColumn("dbo.AppUsers", "Name");
            DropTable("dbo.Countries");
            DropTable("dbo.Regions");
            DropTable("dbo.Places");
            DropTable("dbo.Rooms");
            DropTable("dbo.RoomReservations");
            DropTable("dbo.Comments");
            DropTable("dbo.AccommodationTypes");
            DropTable("dbo.Accommodations");
        }
    }
}
