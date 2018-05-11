using BookingApp.Models;
using BookingApp.Models.Data;
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
  public class RoomReservationController : ApiController
  {
    private BAContext db = new BAContext();
    private object lockObject = new object();

    [HttpGet]
    [EnableQuery]
    [Route("RoomReservations")]
    public IQueryable<RoomReservation> GetAppRoomReservations()
    {
      return db.RoomReservations;
    }

    [HttpGet]
    [Route("RoomReservation/{id}")]
    [ResponseType(typeof(RoomReservation))]
    public IHttpActionResult GetRoomReservation(int id)
    {
      RoomReservation roomReservation = db.RoomReservations.Find(id);
      if (roomReservation == null)
      {
        return NotFound();
      }

      return Ok(roomReservation);
    }

    [HttpGet]
    [Route("RoomReservations/{id}")]
    [ResponseType(typeof(RoomReservation))]
    public IQueryable<RoomReservation> GetRoomReservations(int id)
    {
      IQueryable<RoomReservation> roomReservations = db.RoomReservations.Where(r => r.AppUserId == id).Include(r => r.Room).Include(r=>r.Room.Accommodation).AsQueryable();

      return roomReservations;
    }

    [Authorize(Roles = "AppUser, Manager")]
    [Authorize]
    [HttpPut]
    [Route("RoomReservations/{id}")]
    [ResponseType(typeof(void))]
    public IHttpActionResult PutRoomReservation(int id, RoomReservation roomReservation)
    {

      if (id != roomReservation.Id)
      {
        return BadRequest();
      }
      roomReservation.TimeStamp = DateTime.Now;
      db.Entry(roomReservation).State = EntityState.Modified;

      try
      {
        db.SaveChanges();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!RoomReservationExists(id))
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

    [Authorize(Roles = "AppUser, Manager")]
    [Authorize]
    [HttpPost]
    [Route("RoomReservations")]
    [ResponseType(typeof(RoomReservation))]
    public IHttpActionResult PostRoomReservation(RoomReservation roomReservation)
    {
      var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
      roomReservation.TimeStamp = DateTime.Now;
      if (user != null)
      {
        BAContext BAContext = new BAContext();
        var userRole = user.Roles.First().RoleId;
        var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);
        bool isUser = role.Name.Equals("AppUser");

        if (isUser)
        {
          lock (lockObject)
          {
         /*   if (!ModelState.IsValid)
            {
              return BadRequest(ModelState);
            }*/

            bool exist = false;
            using (var context = new BAContext())
            {
              var reservations = from b in context.RoomReservations
                                 where (b.RoomId == roomReservation.RoomId)
                                 select b;

              foreach (var item in reservations)
              {
                if (!((roomReservation.StartDate < item.StartDate &&
                    roomReservation.EndDate <= item.StartDate) ||
                   (roomReservation.StartDate >= item.EndDate &&
                    roomReservation.EndDate > item.EndDate)))
                {
                  exist = true;
                  break;
                }
              }

            }

            if (!exist)
            {
              roomReservation.Room = db.Rooms.Find(roomReservation.Id);
              db.RoomReservations.Add(roomReservation);
              db.SaveChanges();

              return CreatedAtRoute("DefaultApi", new { controller = "RoomReservation", id = roomReservation.Id }, roomReservation);
            }
            else
            {
              return BadRequest();
            }
          }

        }
        else
        {
          return Unauthorized();
        }
      }
      else
      {
        return Unauthorized();
      }
    }

    [Authorize(Roles = "AppUser, Manager")]
    [Authorize]
    [HttpDelete]
    [Route("RoomReservations/{id}")]
    [ResponseType(typeof(RoomReservation))]
    public IHttpActionResult DeleteRoomReservation(int id)
    {
      RoomReservation roomReservation = db.RoomReservations.Find(id);
      if (roomReservation == null)
      {
        return NotFound();
      }

      db.RoomReservations.Remove(roomReservation);
      db.SaveChanges();

      return Ok(roomReservation);
    }

    private bool RoomReservationExists(int id)
    {
      return db.RoomReservations.Count(e => e.Id == id) > 0;
    }
  }
}
