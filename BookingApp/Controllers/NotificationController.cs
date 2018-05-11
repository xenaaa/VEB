using BookingApp.Hubs;
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

namespace BookingApp.Controllers
{
  public class NotificationController : ApiController
  {

    /*public static int ClickCount { get; set; }
    // GET: api/WSClick
    public IHttpActionResult Post()
    {
      NotificationHub.Notify(++ClickCount);
      return Ok("Hello");
    }*/

    // GET: api/WSClick
    [Route("Notify/{id}")]

    public IHttpActionResult Post(string id)
    {
      NotificationHub.Notify(id);
      return Ok("Hello");
    }
  }
}
