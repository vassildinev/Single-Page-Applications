[assembly: Microsoft.Owin.OwinStartup(typeof(PetStore.Server.Api.Startup))]
namespace PetStore.Server.Api
{
    using System.Collections.Specialized;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Web.Configuration;
    using System.Web.Cors;
    using System.Web.Http.Cors;

    using Microsoft.Owin.Cors;
    using Owin;

    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            NameValueCollection appSettings = WebConfigurationManager.AppSettings;

            // If CORS settings are present in Web.config
            if (!string.IsNullOrWhiteSpace(appSettings["cors:Origins"]))
            {
                // Load CORS settings from Web.config
                var corsPolicy = new EnableCorsAttribute(
                    appSettings["cors:Origins"],
                    appSettings["cors:Headers"],
                    appSettings["cors:Methods"]);

                // Enable CORS for ASP.NET Identity
                app.UseCors(new CorsOptions
                {
                    PolicyProvider = new CorsPolicyProvider
                    {
                        PolicyResolver = request =>
                            (request.Path.Value == "/token") ?
                            corsPolicy.GetCorsPolicyAsync(null, CancellationToken.None) :
                            Task.FromResult<CorsPolicy>(null)
                    }
                });

                ConfigureAuth(app);
            }
        }
    }
}
