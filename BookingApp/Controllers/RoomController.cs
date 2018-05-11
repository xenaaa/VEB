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
  public class RoomController : ApiController
  {
    private BAContext db = new BAContext();

    [HttpGet]
    [Route("Rooms")]
    [EnableQuery]
    public IQueryable<Room> GetAppRoom()
    {
      return db.Rooms.Include(r => r.Accommodation);
    }

    [HttpGet]
    [EnableQuery]
    [Route("Room/{id}")]
    [ResponseType(typeof(Room))]
    public IHttpActionResult GetRoom(int id)
    {
      Room room = db.Rooms.Find(id);
      if (room == null)
      {
        return NotFound();
      }

      return Ok(room);
    }


    [HttpGet]
    [Route("Rooms/{id}")]
    [ResponseType(typeof(Room))]
    public IQueryable<Room> GetRooms(int id)
    {
      IQueryable<Room> rooms = db.Rooms.Where(r => r.AccomodationId == id).Include(r => r.Accommodation).AsQueryable();

      return rooms;
    }

    [Authorize(Roles = "Manager")]
    [HttpPut]
    [Route("Rooms/{id}")]
    [ResponseType(typeof(void))]
    public IHttpActionResult PutRoom(int id, Room room)
    {
      var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
      room.Accommodation = db.Accommodations.Find(room.AccomodationId);
      if (user != null)
      {
        BAContext BAContext = new BAContext();
        var userRole = user.Roles.First().RoleId;
        var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);
        bool isManager = role.Name.Equals("Manager");

        if (isManager && (user != null && room.Accommodation != null && room.Accommodation.OwnerId == user.AppUserId))
        {
          if (!ModelState.IsValid)
          {
            return BadRequest(ModelState);
          }

          if (id != room.Id)
          {
            return BadRequest();
          }

          db.Entry(room).State = EntityState.Modified;

          try
          {
            db.SaveChanges();
          }
          catch (DbUpdateConcurrencyException)
          {
            if (!RoomExists(id))
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

    [Authorize(Roles = "Manager")]
    [HttpPost]
    [Route("Rooms")]
    [ResponseType(typeof(Room))]
    public IHttpActionResult PostRoom(Room room)
    {
      var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
      if (user != null)
      {
        BAContext BAContext = new BAContext();
        var userRole = user.Roles.First().RoleId;
        var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);
        bool isManager = role.Name.Equals("Manager");
        Accommodation accommodation = db.Accommodations.FirstOrDefault(x => x.Id == room.AccomodationId);

        if (isManager && (user != null && accommodation != null && accommodation.OwnerId == user.AppUserId))
        {
          if (!ModelState.IsValid)
          {
            return BadRequest(ModelState);
          }

          room.Accommodation = db.Accommodations.Find(room.AccomodationId);

          db.Rooms.Add(room);
          db.SaveChanges();

          return CreatedAtRoute("DefaultApi", new { controller = "Room", id = room.Id }, room);
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

    [Authorize(Roles = "Manager")]
    [HttpDelete]
    [Route("Rooms/{id}")]
    [ResponseType(typeof(Room))]
    public IHttpActionResult DeleteRoom(int id)
    {

      var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
      Room room = db.Rooms.Find(id);
      if (room == null)
      {
        return NotFound();
      }

      if (user != null)
      {
        BAContext BAContext = new BAContext();
        var userRole = user.Roles.First().RoleId;
        var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);
        bool isManager = role.Name.Equals("Manager");

        Accommodation accommodation = db.Accommodations.FirstOrDefault(x => x.Id == room.AccomodationId);

        if (isManager && (user != null && accommodation != null && accommodation.OwnerId == user.AppUserId))
        {
          IQueryable<RoomReservation> roomReservations = db.RoomReservations.Where(rr => rr.RoomId == room.Id);

          foreach (RoomReservation roomReservation in roomReservations)
          {
            db.RoomReservations.Remove(roomReservation);
          }

          db.Rooms.Remove(room);
          db.SaveChanges();

          return Ok(room);
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


    protected override void Dispose(bool disposing)
    {
      if (disposing)
      {
        db.Dispose();
      }
      base.Dispose(disposing);
    }

    private bool RoomExists(int id)
    {
      return db.Rooms.Count(e => e.Id == id) > 0;
    }

  }
}
