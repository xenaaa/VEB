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
  public class RegionController : ApiController
  {
    private BAContext db = new BAContext();

    public RegionController()
    {
    }

    //GET
    [EnableQuery]
    [HttpGet]
    [Route("Regions")]
    public IQueryable<Region> GetRegions()
    {
      return db.Regions;
    }

    //GET
    [HttpGet]
    [Route("Region/{id}")]
    [ResponseType(typeof(Region))]
    public IHttpActionResult GetRegion(int id)
    {
      Region region = db.Regions.Find(id);

      if (region == null)
      {
        return NotFound();
      }

      return Ok(region);
    }

    //GET
    [HttpGet]
    [Route("Regions/{id}")]
    [ResponseType(typeof(Region))]
    public IQueryable<Region> GetRegions(int id)
    {
      IQueryable<Region> regions =  db.Regions.Where(r => r.CountryId == id).AsQueryable();

      return regions;
    }


    // PUT
    [Authorize(Roles = "Admin")]
    [HttpPut]
    [Route("Regions/{id}")]
    [ResponseType(typeof(void))]
    public IHttpActionResult PutRegion(int id, Region region)
    {
      region.Country = db.Countries.Find(region.CountryId);

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != region.Id)
      {
        return BadRequest();
      }

      db.Entry(region).State = EntityState.Modified;

      try
      {
        db.SaveChanges();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!RegionExists(id))
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

    // POST
    [Authorize(Roles = "Admin")]
    [HttpPost]
    [Route("Regions")]
    [ResponseType(typeof(Place))]
    public IHttpActionResult PostRegion(Region region)
    {
      region.Country = db.Countries.Find(region.CountryId);

      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      db.Regions.Add(region);
      db.SaveChanges();

      return CreatedAtRoute("DefaultApi", new { controller = "Region", Id = region.Id }, region);
    }

    // DELETE
    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [Route("Regions/{id}")]
    [ResponseType(typeof(Region))]
    public IHttpActionResult DeleteRegion(int id)
    {
      Region region = db.Regions.Find(id);
      if (region == null)
      {
        return NotFound();
      }

      db.Regions.Remove(region);
      db.SaveChanges();

      return Ok(region);
    }

    protected override void Dispose(bool disposing)
    {
      if (disposing)
      {
        db.Dispose();
      }
      base.Dispose(disposing);
    }


    private bool RegionExists(int id)
    {
      return db.Places.Count(e => e.Id == id) > 0;
    }
  }

}

