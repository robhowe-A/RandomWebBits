//--Copyright (c) 2025-2026 Robert A. Howell

using Microsoft.AspNetCore.Mvc.RazorPages;
using RWBDotnetTypeScript.Models;
using TrafficRecord.Data;

namespace RWBDotnetTypeScript.Pages.Guides
{
    internal sealed class elementinspectModel : PageModel
    {
        private readonly ILogger<elementinspectModel> _logger;
        private readonly Record _record;

        public elementinspectModel(ILogger<elementinspectModel> logger, Record record)
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
