//--Copyright (c) 2025-2026 Robert A. Howell

using Microsoft.AspNetCore.Mvc.RazorPages;
using RWBDotnetTypeScript.Models;
using TrafficRecord.Data;

namespace RWBDotnetTypeScript.Pages.Guides.Devtools
{
    internal sealed class securitytabModel : PageModel
    {
        private readonly ILogger<securitytabModel> _logger;
        private readonly Record _record;

        public securitytabModel(ILogger<securitytabModel> logger, Record record)
        {
            _logger = logger;
            _record = record;
        }

        public void OnGet()
        {
            _ = new PageTrafficLogging(this, _logger, _record, HttpContext);
        }
    };
}
