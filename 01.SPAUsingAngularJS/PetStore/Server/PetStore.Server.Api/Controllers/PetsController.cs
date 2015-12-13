namespace PetStore.Server.Api.Controllers
{
    using System.Linq;
    using System.Web.Http;

    using Models;

    [Authorize]
    [RoutePrefix("api/pets")]
    public class PetsController : ApiController
    {
        // TODO: Refactor this stupidity...
        private readonly ApplicationDbContext db;

        public PetsController()
        {
            this.db = new ApplicationDbContext();
        }

        [HttpGet]
        public IHttpActionResult GetAllPets()
        {
            return this.Ok(db.Pets.ToList());
        }

        [HttpPost]
        public IHttpActionResult AddNewPet(Pet pet)
        {
            this.db.Pets.Add(pet);
            this.db.SaveChanges();
            return this.Ok();
        }

        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult GetPetById(int id)
        {
            var pet = this.db.Pets.Find(id);
            if (pet == null)
            {
                return this.BadRequest("A pet with this Id does not exist");
            }

            return this.Ok(pet);
        }
    }
}
