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
  public class AccommodationTypeController : ApiController
  {
    private BAContext db = new BAContext();

    public AccommodationTypeController()
    {
    }

    //GET
    [HttpGet]
    [Route("AccommodationTypes")]
    [EnableQuery]
    public IQueryable<AccommodationType> GetAccommodationTypes()
    {
      return db.AccommodationTypes;
    }

    //GET
    [HttpGet]
    [Route("AccommodationTypes/{id}")]
    [ResponseType(typeof(Accommodation))]
    public IHttpActionResult GetAccomodationType(int Id)
    {
      AccommodationType accommodationType = db.AccommodationTypes.Find(Id);

      if (accommodationType == null)
      {
        return NotFound();
      }
      else
      {
        return Ok(accommodationType);
      }
    }

    //PUT
    [Authorize(Roles = "Admin")]
    [HttpPut]
    [Route("AccommodationTypes/{id}")]
    [ResponseType(typeof(void))]
    public IHttpActionResult PutAccomodationType(int id, AccommodationType accommodationType)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != accommodationType.Id)
      {
        return BadRequest();
      }

      db.Entry(accommodationType).State = EntityState.Modified;

      try
      {
        db.SaveChanges();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!AccomodationTypeExists(id))
        {
          return NotFound();
        }
        else if (AccommodationTypeNameExists(accommodationType.Name))
        {
          return BadRequest();
        }
        else
        {
          return StatusCode(HttpStatusCode.ExpectationFailed);
        }
      }
      return StatusCode(HttpStatusCode.NoContent);
    }

    //POST

    [Authorize(Roles = "Admin")]
    [HttpPost]
    [Route("AccommodationTypes")]
    [ResponseType(typeof(AccommodationType))]
    public IHttpActionResult PostAccomodationType(AccommodationType accommodationType)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      if (AccommodationTypeNameExists(accommodationType.Name))
      {
        return BadRequest(ModelState);
      }
      db.AccommodationTypes.Add(accommodationType);
      db.SaveChanges();

      return CreatedAtRoute("DefaultApi", new { controller = "AccomodationType", Id = accommodationType.Id }, accommodationType);
    }

    //DELETE

    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [Route("AccommodationTypes/{id}")]
    [ResponseType(typeof(AccommodationType))]
    public IHttpActionResult DeleteAccomodationType(int id)
    {
      AccommodationType accommodationType = db.AccommodationTypes.Find(id);
      if (accommodationType == null)
      {
        return NotFound();
      }

      db.AccommodationTypes.Remove(accommodationType);
      db.SaveChanges();

      return Ok(accommodationType);
    }

    protected override void Dispose(bool disposing)
    {
      if (disposing)
      {
        db.Dispose();
      }
      base.Dispose(disposing);
    }

    private bool AccomodationTypeExists(int id)
    {
      return db.AccommodationTypes.Count(e => e.Id == id) > 0;
    }

    private bool AccommodationTypeNameExists(string name)
    {
      return db.AccommodationTypes.Count(e => e.Name == name) > 0;
    }
  }
}
