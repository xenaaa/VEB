using BookingApp.Models.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookingApp.Models.Data

{
    public class AppUser
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        [Required]
        [MaxLength(20)]
        public string LastName { get; set; }

        public bool IsBanned { get; set; }
        public List<Comment> Comments { get; set; }
        public List<RoomReservation> RoomReservations { get; set; }
        public List<Accommodation> Accommodations { get; set; }
    }
}