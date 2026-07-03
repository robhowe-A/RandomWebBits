//--Copyright (c) 2025-2026 Robert A. Howell

using Microsoft.AspNetCore.Mvc.RazorPages;
using RWBDotnetTypeScript.Data;
using RWBDotnetTypeScript.Models;

namespace RWBDotnetTypeScript.Pages.Guides.Devtools
{
    internal sealed class elementstabModel : PageModel
    {
        private readonly ILogger<elementstabModel> _logger;
        private readonly Record _record;

        public elementstabModel(ILogger<elementstabModel> logger, Record record)
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
