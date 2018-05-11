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
  public class PlaceController : ApiController
  {
    private BAContext db = new BAContext();

    public PlaceController()
    {
    }

    // GET
    [EnableQuery]
    [HttpGet]
    [Route("Places")]
    public IQueryable<Place> GetAppPlaces()
    {
      return db.Places;
    }

    // GET
    [HttpGet]
    [Route("Place/{id}")]
    [ResponseType(typeof(Place))]
    public IHttpActionResult GetPlace(int id)
    {
      Place place = db.Places.Find(id);

      if (place == null)
      {
        return NotFound();
      }

      return Ok(place);
    }

    // GET
    [HttpGet]
    [Route("Places/{id}")]
    [ResponseType(typeof(Place))]
    public IQueryable<Place> GetPlaces(int id)
    {
      IQueryable<Place> places = db.Places.Where(r => r.RegionId == id).AsQueryable();

      return places;
    }

    //PUT
    [Authorize(Roles = "Admin")]
    [HttpPut]
    [Route("Places/{id}")]
    [ResponseType(typeof(void))]
    public IHttpActionResult PutPlaces(int id, Place place)
    {
      place.Region = db.Regions.Find(place.RegionId);

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != place.Id)
      {
        return BadRequest();
      }

      db.Entry(place).State = EntityState.Modified;

      try
      {
        db.SaveChanges();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!PlaceExists(id))
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

    //POST
    [Authorize(Roles = "Admin")]
    [HttpPost]
    [Route("Places")]
    [ResponseType(typeof(Place))]
    public IHttpActionResult PostPlace(Place place)
    {
      place.Region = db.Regions.Find(place.RegionId);

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      db.Places.Add(place);
      db.SaveChanges();

      return CreatedAtRoute("DefaultApi", new { controller = "Place", Id = place.Id }, place);
    }

    // DELETE
    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [Route("Places/{id}")]
    [ResponseType(typeof(Place))]
    public IHttpActionResult DeletePlace(int id)
    {
      Place place = db.Places.Find(id);
      if (place == null)
      {
        return NotFound();
      }

      db.Places.Remove(place);
      db.SaveChanges();

      return Ok(place);
    }

    protected override void Dispose(bool disposing)
    {
      if (disposing)
      {
        db.Dispose();
      }
      base.Dispose(disposing);
    }

    private bool PlaceExists(int id)
    {
      return db.Places.Count(e => e.Id == id) > 0;
    }
  }
}
