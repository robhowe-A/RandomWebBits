//--Copyright (c) 2025-2026 Robert A. Howell

using Microsoft.AspNetCore.Mvc.RazorPages;
using RWBDotnetTypeScript.Models;
using TrafficRecord.Data;

namespace RWBDotnetTypeScript.Pages.Guides.Devtools
{
    internal sealed class lighthousetabModel : PageModel
    {
        private readonly ILogger<lighthousetabModel> _logger;
        private readonly Record _record;

        public lighthousetabModel(ILogger<lighthousetabModel> logger, Record record)
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
