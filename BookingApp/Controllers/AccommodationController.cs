using BookingApp.Models;
using BookingApp.Models.Data;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;

namespace BookingApp.Controllers
{


  [RoutePrefix("api")]
  public class AccommodationController : ApiController
  {
    private BAContext db = new BAContext();
    private ApplicationUserManager _userManager;

    public AccommodationController()
    {
    }

    public ApplicationUserManager UserManager
    {
      get
      {
        return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
      }
      private set
      {
        _userManager = value;
      }
    }

    [HttpGet]
    [Route("Accommodations")]
    [EnableQuery]
    public IQueryable<Accommodation> GetAccomodations()
    {
      return db.Accommodations.Include(a => a.Place).Include(a => a.AccommodationType).Include(a => a.Owner);

    }


    [HttpGet]
    [Route("Accommodation/{id}")]
    [ResponseType(typeof(Accommodation))]
    public IQueryable<Accommodation> GetAccommodations(int id)
    {
      IQueryable<Accommodation> accommodations = db.Accommodations.Where(r => r.OwnerId == id).Include(a => a.Place).Include(a => a.AccommodationType).Include(a => a.Owner);

      return accommodations;
    }

    [HttpGet]
    [Route("AccommodationsOwner/{id}")]
    [ResponseType(typeof(Accommodation))]
    public IHttpActionResult GetOwnerId(int Id)
    {
      Accommodation accommodation = db.Accommodations.Find(Id);

      if (accommodation == null)
      {
        return NotFound();
      }
      else
      {
        return Ok(accommodation.OwnerId);
      }
    }

    [HttpGet]
    [Route("Accommodations/{id}")]
    [ResponseType(typeof(Accommodation))]
    public IHttpActionResult GetAccomodationById(int Id)
    {
      Accommodation accommodation = db.Accommodations.Include(i => i.AccommodationType)
              .Include(i => i.Place)
              .Include(i => i.Owner)
              .SingleOrDefault(x => x.Id == Id);

      if (accommodation == null)
      {
        return NotFound();
      }
      else
      {
        return Ok(accommodation);
      }
    }


    //PUT
    [Authorize(Roles = "Manager, Admin")]
    [HttpPut]
    [Route("Accommodations/{id}")]
    [ResponseType(typeof(void))]
    public IHttpActionResult PutAccomodation(int id, Accommodation accommodation)
    {
      Accommodation accc = db.Accommodations.Find(id);
      accommodation.ImageURL = accc.ImageURL;
      accommodation.OwnerId = accc.OwnerId;

      if (!ModelState.IsValid)
      {
        var errors = ModelState.Select(x => x.Value.Errors)
                         .Where(y => y.Count > 0)
                         .ToList();
        return BadRequest(ModelState);
      }

      if (id != accommodation.Id)
      {
        return BadRequest();
      }

      Accommodation acc = db.Accommodations.Find(accommodation.Id);
      //db.Entry(accommodation).State = EntityState.Modified;


      var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
      if (user != null)
      {
        BAContext BAContext = new BAContext();
        var userRole = user.Roles.First().RoleId;
        var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);
        //  bool isManager = role.Name.Equals("Manager");

        bool isManager = UserManager.IsInRole(User.Identity.Name, "Manager");
        bool isAdmin = UserManager.IsInRole(User.Identity.Name, "Admin");

        if ((isManager && accommodation.OwnerId == user.AppUserId) || isAdmin)
        {
          try
          {
            if (isManager)
            {
              acc.Address = accommodation.Address;
              acc.Description = accommodation.Description;
              acc.Name = accommodation.Name;
              db.SaveChanges();

            }
            if (isAdmin)
            {
              acc.Approved = accommodation.Approved;
              db.SaveChanges();

            }

          }
          catch (DbUpdateConcurrencyException)
          {
            if (!AccommodationExists(id))
            {
              return NotFound();
            }
            else
            {
              return StatusCode(HttpStatusCode.ExpectationFailed);
            }
          }
          return StatusCode(HttpStatusCode.NoContent);
        }
      }
      return Unauthorized();
    }

    [Authorize(Roles = "Manager")]
    [HttpPost]
    [Route("Accomodations")]
    [ResponseType(typeof(Accommodation))]
    public IHttpActionResult PostAccomodation()
    {
      Accommodation accommodation = new Accommodation();

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var httpRequest = HttpContext.Current.Request;
      try
      {
        accommodation = JsonConvert.DeserializeObject<Accommodation>(httpRequest.Form[0]);
      }
      catch (JsonSerializationException)
      {
        return BadRequest(ModelState);
      }

      foreach (string file in httpRequest.Files)
      {
        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created);

        var postedFile = httpRequest.Files[file];
        if (postedFile != null && postedFile.ContentLength > 0)
        {
          IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".png" };
          var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
          var extension = ext.ToLower();

          if (!AllowedFileExtensions.Contains(extension))
          {
            return BadRequest();
          }
          else
          {
            var filePath = HttpContext.Current.Server.MapPath("~/Content/" + postedFile.FileName);
            accommodation.ImageURL = "Content/" + postedFile.FileName;
            postedFile.SaveAs(filePath);
          }
        }
      }


      var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
      if (user != null)
      {
        BAContext BAContext = new BAContext();
        var userRole = user.Roles.First().RoleId;
        var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);
        //  bool isManager = role.Name.Equals("Manager");

        bool isManager = UserManager.IsInRole(User.Identity.Name, "Manager");

        if (isManager)
        {

          //  var username = User.Identity.GetUserName();
          //  var user = UserManager.FindByName(username);
          int userId = (int)user.AppUserId;
          accommodation.Place = db.Places.Find(accommodation.PlaceId);
          accommodation.Approved = false;
          accommodation.AverageGrade = 1;
          accommodation.OwnerId = userId;


          db.Accommodations.Add(accommodation);

          try
          {
            db.SaveChanges();
          }
          catch (DbEntityValidationException e)
          {
            return BadRequest(e.Message);
          }
          catch (DbUpdateException e)
          {
            return BadRequest(e.Message);
          }

          return CreatedAtRoute("DefaultApi", new { controller = "Accommodation", id = accommodation.Id }, accommodation);
        }
      }
      return Unauthorized();
    }

    [Authorize(Roles = "Manager")]
    [HttpDelete]
    [Route("Accommodations/{id}")]
    public IHttpActionResult DeleteAccommodation(int id)
    {
      Accommodation accommodation = db.Accommodations.Find(id);
      if (accommodation == null)
      {
        return NotFound();
      }

      db.Accommodations.Remove(accommodation);
      db.SaveChanges();

      return Ok(accommodation);
    }

    protected override void Dispose(bool disposing)
    {
      if (disposing)
      {
        db.Dispose();
      }
      base.Dispose(disposing);
    }

    private bool AccommodationExists(int id)
    {
      return db.Accommodations.Count(e => e.Id == id) > 0;
    }
  }
}
