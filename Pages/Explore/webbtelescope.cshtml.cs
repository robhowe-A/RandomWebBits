//--Copyright (c) 2025-2026 Robert A. Howell

using Microsoft.AspNetCore.Mvc.RazorPages;
using RWBDotnetTypeScript.Models;
using TrafficRecord.Data;

namespace RWBDotnetTypeScript.Pages.Explore
{
    internal sealed class webbtelescopeModel : PageModel
    {
        private readonly ILogger<webbtelescopeModel> _logger;
        private readonly Record _record;

        public webbtelescopeModel(ILogger<webbtelescopeModel> logger, Record record)
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
