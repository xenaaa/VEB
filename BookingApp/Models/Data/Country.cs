using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookingApp.Models.Data
{
    public class Country
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(10)]   
        public string Code { get; set; }

        public List<Region> Regions { get; set; }
    }
}