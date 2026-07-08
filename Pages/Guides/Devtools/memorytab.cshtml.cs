//--Copyright (c) 2025-2026 Robert A. Howell

using Microsoft.AspNetCore.Mvc.RazorPages;
using RWBDotnetTypeScript.Models;
using TrafficRecord.Data;

namespace RWBDotnetTypeScript.Pages.Guides.Devtools
{
    internal sealed class memorytabModel : PageModel
    {
        private readonly ILogger<memorytabModel> _logger;
        private readonly Record _record;

        public memorytabModel(ILogger<memorytabModel> logger, Record record)
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
