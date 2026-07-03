//--Copyright (c) 2026 Robert A. Howell

using Microsoft.Extensions.Options;

namespace RWBDotnetTypeScript.Models
{
    public static class ProjectConfigurationBuilder
    {

        private const string DEBUG = "DEBUG";
        private const string PRODUCTION = "PRODUCTION";

        public static bool IsAzurePlatformEnvironmentVariable()
        {
            return Convert.ToBoolean(Environment.GetEnvironmentVariable("AZURE_OS_LINUX"));
        }

        public static string GetRootLoggingPath()
        {
            bool isAzureLinux = IsAzurePlatformEnvironmentVariable();
            return isAzureLinux == true 
                ? @"/home/site/RWBLog" : @"C:\home\site\RWBLog";
        }

        public static string GetDebugConnectionString(string environment)
        {
            return GetEnvironmentVariables(environment);
        }
        
        public static string GetProductionConnectionString(string environment)
        {
            return GetEnvironmentVariables(environment);
        }

        private static string GetEnvironmentVariables(string environment)
        {
            IConfiguration iConfig;

            switch (environment)
            {
                case DEBUG:
                    iConfig = new ConfigurationBuilder().AddEnvironmentVariables().AddUserSecrets(System.Reflection.Assembly.GetExecutingAssembly()).Build();

                    break;
                case PRODUCTION:
                    iConfig = new ConfigurationBuilder().AddEnvironmentVariables().Build();

                    break;
                default:
                    throw new PlatformNotSupportedException();
            }

            return iConfig.GetConnectionString("AZURE_MYSQL_CONNECTIONSTRING") 
                ?? 
                throw new NullReferenceException("A connection string is null or missing.");
        }
    };
}
