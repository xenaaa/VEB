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
  public class CountryController : ApiController
  {
    private BAContext db = new BAContext();

    public CountryController()
    {
    }

    //GET
    [HttpGet]
    [Route("Countries")]
    [EnableQuery]
    public IQueryable<Country> GetCountries()
    {
      return db.Countries;
    }

    //GET
    [HttpGet]
    [Route("Countries/{id}")]
    [ResponseType(typeof(Country))]
    public IHttpActionResult GetCountry(int Id)
    {
      Country country = db.Countries.Find(Id);

      if (country == null)
      {
        return NotFound();
      }
      else
      {
        return Ok(country);
      }
    }


    //PUT
    [Authorize(Roles = "Admin")]
    [HttpPut]
    [Route("Countries/{id}")]
    [ResponseType(typeof(void))]
    public IHttpActionResult PutCountry(int id, Country country)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != country.Id)
      {
        return BadRequest();
      }

      db.Entry(country).State = EntityState.Modified;

      try
      {
        db.SaveChanges();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!CountryExists(id))
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
    [Route("Countries")]
    [ResponseType(typeof(Country))]
    public IHttpActionResult PostCountry(Country country)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      db.Countries.Add(country);
      db.SaveChanges();

      return CreatedAtRoute("DefaultApi", new { controller = "Country", Id = country.Id }, country);
    }


    // DELETE
    [Authorize(Roles = "Admin")]
    [HttpDelete]
    [Route("Countries/{id}")]
    public IHttpActionResult DeleteCountry(int id)
    {
      Country country = db.Countries.Find(id);
      if (country == null)
      {
        return NotFound();
      }

      db.Countries.Remove(country);
      db.SaveChanges();

      return Ok(country);
    }

    protected override void Dispose(bool disposing)
    {
      if (disposing)
      {
        db.Dispose();
      }
      base.Dispose(disposing);
    }

    private bool CountryExists(int id)
    {
      return db.Countries.Count(e => e.Id == id) > 0;
    }
  }
}
