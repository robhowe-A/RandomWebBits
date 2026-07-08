//--Copyright (c) 2026 Robert A. Howell

namespace RWBDotnetTypeScript.Models
{
    public static class ProjectConfigurationBuilder
    {
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
    };
}
