using System.ComponentModel.DataAnnotations;

namespace PetStore.Server.Api.Models
{
    public class Pet
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Name { get; set; }

        public int Age { get; set; }

        public string Description { get; set; }

        public string Url { get; set; }

        [Required]
        public decimal Price { get; set; } // -1 means not for sale, beacause of reasons
    }
}