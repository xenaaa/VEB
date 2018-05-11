using BookingApp.Models;

namespace BookingApp.Migrations
{
  using BookingApp.Models.Data;
  using Microsoft.AspNet.Identity;
  using Microsoft.AspNet.Identity.EntityFramework;
  using System;
  using System.Collections.Generic;
  using System.Data.Entity;
  using System.Data.Entity.Migrations;
  using System.Linq;

  internal sealed class Configuration : DbMigrationsConfiguration<BookingApp.Models.BAContext>
  {
    public Configuration()
    {
      AutomaticMigrationsEnabled = false;
    }

    protected override void Seed(BookingApp.Models.BAContext context)
    {
      //  This method will be called after migrating to the latest version.

      //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
      //  to avoid creating duplicate seed data. E.g.
      //
      //    context.People.AddOrUpdate(
      //      p => p.FullName,
      //      new Person { FullName = "Andrew Peters" },
      //      new Person { FullName = "Brice Lambson" },
      //      new Person { FullName = "Rowan Miller" }
      //    );
      //

      if (!context.Roles.Any(r => r.Name == "Admin"))
      {
        var store = new RoleStore<IdentityRole>(context);
        var manager = new RoleManager<IdentityRole>(store);
        var role = new IdentityRole { Name = "Admin" };

        manager.Create(role);
      }

      if (!context.Roles.Any(r => r.Name == "Manager"))
      {
        var store = new RoleStore<IdentityRole>(context);
        var manager = new RoleManager<IdentityRole>(store);
        var role = new IdentityRole { Name = "Manager" };

        manager.Create(role);
      }

      if (!context.Roles.Any(r => r.Name == "AppUser"))
      {
        var store = new RoleStore<IdentityRole>(context);
        var manager = new RoleManager<IdentityRole>(store);
        var role = new IdentityRole { Name = "AppUser" };

        manager.Create(role);
      }

      var userStore = new UserStore<BAIdentityUser>(context);
      var userManager = new UserManager<BAIdentityUser>(userStore);


      AppUser appUser = new AppUser();
      appUser.LastName = "admin";
      appUser.Name = "admin";
      appUser.RoomReservations = new List<RoomReservation>();
      appUser.Comments = new List<Comment>();
      appUser.Accommodations = new List<Accommodation>();
      appUser.IsBanned = false;

      context.AppUsers.Add(appUser);
      context.SaveChanges();

      if (!context.Users.Any(u => u.UserName == "admin"))
      {
        var userr = context.AppUsers.Where(u => u.Name == "admin" && u.LastName == "admin").FirstOrDefault();
        var user = new BAIdentityUser() { Id = "admin", UserName = "admin", Email = "admin@yahoo.com", AppUserId = userr.Id, PasswordHash = BAIdentityUser.HashPassword("admin") };
        userManager.Create(user);
        userManager.AddToRole(user.Id, "Admin");
      }


      Country country = new Country();
      country.Id = 1;
      country.Name = "Serbia";
      country.Code = "RS";
      country.Regions = new List<Region>();

      Country country2 = new Country();
      country2.Id = 2;
      country2.Name = "France";
      country2.Code = "FR";
      country2.Regions = new List<Region>();

      Region region = new Region();
      region.Country = country;
      region.Id = 1;
      region.Name = "Vojvodina";
      region.Places = new List<Place>();
      country.Regions.Add(region);

      Place place = new Place();
      place.Id = 1;
      place.Name = "Novi Sad";
      place.Region = region;
      place.Accommodations = new List<Accommodation>();
      region.Places.Add(place);

      AccommodationType accType = new AccommodationType();
      accType.Name = "Hostel";

      AccommodationType accType2 = new AccommodationType();
      accType2.Name = "Motel";

      AppUser apu = new AppUser();
      apu.Name = "Marina";
      apu.LastName = "Bobar";
      

     Accommodation acc = new Accommodation();
      acc.AccommodationType = accType;
      acc.Name = "Laguna";
      acc.Place = place;
      acc.Rooms = new List<Room>();
      acc.Address = "Kisacka 5";
      acc.Approved = false;
      acc.AverageGrade = 0;
      acc.Comments = new List<Comment>();
      acc.Description = "blabla";
      acc.Latitude = 0;
      acc.Longitude = 0;
      acc.Owner = apu;

      try
      {
        context.Countries.Add(country);
        context.Countries.Add(country2);
        context.Places.Add(place);
        context.Regions.Add(region);
      //  context.AccommodationTypes.Add(accType);
      //  context.AccommodationTypes.Add(accType2);
        context.Accommodations.Add(acc);
        context.SaveChanges();
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
      }
    }
  }
}
