namespace PetStore.Server.Api
{
    using System.Collections.Specialized;
    using System.Web.Http;
    using System.Web.Configuration;
    using System.Web.Http.Cors;

    using Microsoft.Owin.Security.OAuth;

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
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

                // Enable CORS for Web API
                config.EnableCors(corsPolicy);
            }

            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
