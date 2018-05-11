using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models.Data
{
    public class Room
    {
        public int Id { get; set; }

        [Required]
        [Range(1, 100)]
        public int RoomNumber { get; set; }

        [Required]
        [Range(1, 10)]
        public int BedCount { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        public double PricePerNight { get; set; }

        [Required]
        [ForeignKey("Accommodation")]
        public int AccomodationId { get; set; }

        public Accommodation Accommodation { get; set; }

        public List<RoomReservation> RoomReservations { get; set; }
    }
}