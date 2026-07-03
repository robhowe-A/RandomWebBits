//--Copyright (c) 2026 Robert A. Howell

using Microsoft.AspNetCore.Mvc.RazorPages;
using RWBDotnetTypeScript.Data;
using RWBDotnetTypeScript.Pages;
using System.Net;

namespace RWBDotnetTypeScript.Models
{
    internal static class Security
    {

        public static string GetContextHashedIp(System.Net.IPAddress? ipaddr)
        {
            string ipAddrHsh = string.Empty;

            if (ipaddr is not null)
                ipAddrHsh = new Cryptography.SHA3_256().GetDigest(ipaddr.GetAddressBytes());
            

            return ipAddrHsh;
        }
        public static LogFile.Create SetLogFile()
        {
            string pathRoot = ProjectConfigurationBuilder.GetRootLoggingPath();
            return new LogFile.Create(pathRoot,
                                   $"{pathRoot}//{DateTime.Now.Year}_{DateTime.Now.Month}_{DateTime.Now.Day}-pages.cshtml.log",
                                   true, true);
        }
        public static LogFile.Create SetLogPageContext()
        {
            return Security.SetLogFile();
        }
        public static bool RecordPageContext(PageModel page, HttpContext context, Record _record, string ipAddrHsh)
        {
            return _record.RecordContextIpHash(
                            page.Request.Path.HasValue ? page.Request.Path.Value : page.PageContext.HttpContext.Request.Path.Value
                            ?? context.GetEndpoint()?.DisplayName
                            ?? page.Request.Path.ToString()
                            ?? "missing endpoint", ipAddrHsh, context.Request.Headers["User-Agent"].ToString());

        }
    }
}
