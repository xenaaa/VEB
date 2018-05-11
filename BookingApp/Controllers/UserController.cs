using BookingApp.Models;
using BookingApp.Models.Data;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;

namespace BookingApp.Controllers
{
  [RoutePrefix("api")]
  public class UserController : ApiController
  {

    private BAContext db = new BAContext();

    public UserController()
    {
    }
   

    [HttpGet]
    [Route("Users")]
    [EnableQuery]
    public IQueryable<BAIdentityUser> getUsers()
    {
      return db.Users.Include(u => u.AppUser);
    }

    [HttpGet]
    [Route("Users/{id}")]
    [ResponseType(typeof(AppUser))]
    public IHttpActionResult GetUser(int id)
    {
      AppUser appUser = db.AppUsers.Find(id);
      if (appUser == null)
      {
        return NotFound();
      }

      return Ok(appUser);
    }


    //PUT
    [Authorize(Roles = "Admin")]
    [HttpPut]
    [Route("Users/{id}")]
    [ResponseType(typeof(void))]
    public IHttpActionResult PutUser(int id, AppUser user)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != user.Id)
      {
        return BadRequest();
      }

      db.Entry(user).State = EntityState.Modified;

      try
      {
        db.SaveChanges();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!UserExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return StatusCode(HttpStatusCode.NoContent);
    }

    protected override void Dispose(bool disposing)
    {
      if (disposing)
      {
        db.Dispose();
      }
      base.Dispose(disposing);
    }

    private bool UserExists(int id)
    {
      return db.AppUsers.Count(e => e.Id == id) > 0;
    }
  }
}

