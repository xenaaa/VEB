using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BookingApp.Models.Data
{
    public class Place
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [ForeignKey("Region")]
        public int RegionId { get; set; }
        public Region Region { get; set; }

        public List<Accommodation> Accommodations { get; set; }
    }
}