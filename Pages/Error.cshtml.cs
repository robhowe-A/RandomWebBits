//--Copyright (c) 2025-2026 Robert A. Howell

using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RWBDotnetTypeScript.Pages
{
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    [IgnoreAntiforgeryToken]
    public class ErrorModel : PageModel
    {
        public string? RequestId { get; set; }
        public ActivityStatusCode? ActivityStatusCode { get; set; } = System.Diagnostics.ActivityStatusCode.Unset;

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);

        private readonly ILogger<ErrorModel> _logger;

        public ErrorModel(ILogger<ErrorModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            ActivityStatusCode = Activity.Current?.Status ?? System.Diagnostics.ActivityStatusCode.Unset;
        }
    };
}
