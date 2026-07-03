//--Copyright (c) 2025-2026 Robert A. Howell

using Microsoft.AspNetCore.Mvc.RazorPages;
using RWBDotnetTypeScript.Data;
using RWBDotnetTypeScript.Models;

namespace RWBDotnetTypeScript.Pages.Pages
{
    internal sealed class todosModel : PageModel
    {
        private readonly ILogger<todosModel> _logger;
        private readonly Record _record;

        public todosModel(ILogger<todosModel> logger, Record record)
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
