//--Copyright (c) 2026 Robert A. Howell

using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Net;
using TrafficRecord.Data;

namespace RWBDotnetTypeScript.Models;

internal sealed class PageTrafficLogging
{
    private ILogger<PageModel> _logger;
    private Record _record; 
    private HttpContext _pageContext;
    private IPAddress _ip;
    
    public PageTrafficLogging(PageModel thisPage, ILogger<PageModel> pageLogger, Record pageRecord, HttpContext context)
    {
        // Record IP address in log file format
        _logger = pageLogger;
        _record = pageRecord;
        _pageContext = context;
        
        _ip = _pageContext.Connection.RemoteIpAddress ?? IPAddress.Parse("169.254.0.1");
                
        LogFile.Create logFile;
        string ipAddrHsh;

        if ( _ip.Equals(IPAddress.Parse("169.254.0.1") ))
        {
            _logger.LogError("RemoteIpAddress is null");
        }

        logFile = Security.SetLogPageContext();
        pageLogger.LogInformation($"{thisPage.ToString()} log file created and {(logFile.IsNew ? "is new" : "exists")}.");

        ipAddrHsh = Security.GetContextHashedIp(_ip);
        if (String.IsNullOrWhiteSpace(ipAddrHsh))
        {
            logFile.WriteLog($"WARNING: {thisPage} Missing IP hash {DateTime.Now.ToShortTimeString()} \n");
            pageLogger.LogWarning($"{thisPage}" + "Check the security flow for missing hash values.");
        }
        else
        {
            logFile.WriteLog($"INFO: {thisPage} Created hashed IP address {DateTime.Now.ToShortTimeString()} {ipAddrHsh} \n");
            pageLogger.LogInformation($"{thisPage}" + " page IP context hashed.");
        }

        logFile.Dispose();

        // Record further to database collection
        bool flowControl = Security.RecordPageContext(thisPage, _pageContext, _record, ipAddrHsh);
        if (!flowControl)
        {
            return;
        }
    }
}
