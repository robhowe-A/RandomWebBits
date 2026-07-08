//--Copyright (c) 2025-2026 Robert A. Howell

using Microsoft.AspNetCore.Mvc.RazorPages;
using RWBDotnetTypeScript.Models;
using TrafficRecord.Data;

namespace RWBDotnetTypeScript.Pages.Pages
{
    internal sealed class networkspeedModel : PageModel
    {
        private readonly ILogger<networkspeedModel> _logger;
        private readonly Record _record;

        public networkspeedModel(ILogger<networkspeedModel> logger, Record record)
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
