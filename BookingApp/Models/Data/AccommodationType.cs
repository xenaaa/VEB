using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models.Data
{
    public class AccommodationType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        [Index(IsUnique = true)]
        public string Name { get; set; }

        public List<Accommodation> Accomodations { get; set; }
    }
}