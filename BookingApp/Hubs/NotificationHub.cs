using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;
using System.Web;
using BookingApp.Models;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace BookingApp.Hubs
{
  [HubName("notifications")]
  public class NotificationHub : Hub
  {
    private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
    private static Timer t = new Timer();
    private BAContext db = new BAContext();

    public void Hello()
    {
      Clients.All.hello("Hello from server");
    }
   

    public static void Notify(string role)
    {
      if (role == "Admin")
      {
        hubContext.Clients.Group("Admins").accommodationNotification("Accommodation Request");
      }
      if (role == "Manager")
      {
        hubContext.Clients.Group("Managers").accommodationNotification("Accommodation Approved");
      }
    }

    public void GetTime()
    {
      Clients.All.setRealTime(DateTime.Now.ToString("h:mm:ss tt"));
    }

    public void TimeServerUpdates()
    {
      t.Interval = 1000;
      t.Start();
      t.Elapsed += OnTimedEvent;
    }

    private void OnTimedEvent(object source, ElapsedEventArgs e)
    {
      GetTime();
    }

    public void StopTimeServerUpdates()
    {
      t.Stop();
    }

    public override Task OnConnected()
    {
      //Ako vam treba pojedinacni User
      //var identityName = Context.User.Identity.Name;

      Groups.Add(Context.ConnectionId, "Admins");
      Groups.Add(Context.ConnectionId, "Managers");

      //if (Context.User.IsInRole("Admin"))
      //{
      //    Groups.Add(Context.ConnectionId, "Admins");
      //}

      return base.OnConnected();
    }

    public override Task OnDisconnected(bool stopCalled)
    {
      Groups.Remove(Context.ConnectionId, "Admins");

      //if (Context.User.IsInRole("Admin"))
      //{
      //    Groups.Remove(Context.ConnectionId, "Admins");
      //}

      return base.OnDisconnected(stopCalled);
    }
  }
}
