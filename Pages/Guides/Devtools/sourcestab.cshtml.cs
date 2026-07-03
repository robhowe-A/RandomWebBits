//--Copyright (c) 2025-2026 Robert A. Howell

using Microsoft.AspNetCore.Mvc.RazorPages;
using RWBDotnetTypeScript.Data;
using RWBDotnetTypeScript.Models;

namespace RWBDotnetTypeScript.Pages.Guides.Devtools
{
    internal sealed class sourcestabModel : PageModel
    {
        private readonly ILogger<sourcestabModel> _logger;
        private readonly Record _record;

        public sourcestabModel(ILogger<sourcestabModel> logger, Record record)
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
