//--Copyright (c) 2025-2026 Robert A. Howell

using Microsoft.AspNetCore.Hosting.StaticWebAssets;
using Microsoft.AspNetCore.Rewrite;
using RWBDotnetTypeScript.Extensions;
using RWBDotnetTypeScript.Interop;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

// Add server-side blazor
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

StaticWebAssetsLoader.UseStaticWebAssets(
    builder.Environment, builder.Configuration);

// "Allowed hosts" filtering from appsettings
builder.Services.AddHostFiltering(options =>
{
    options.AllowEmptyHosts = false;
    options.IncludeFailureMessage = true;
});

builder.AddCustomW3CLogging();

var app = builder.Build();

app.AddCustomSecurityHeaders();

// Redirect to www.randomwebbits.com
app.UseRewriter(new Microsoft.AspNetCore.Rewrite.RewriteOptions()
    .AddRedirectToWwwPermanent(["randomwebbits.com"]))
    // Handle 400-599 errors to redirect
    .UseStatusCodePagesWithRedirects(@"~/{0}");

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    app.UseHostFiltering();
}
app.AwaitDatabaseContext();

// HTTPS redirect
app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

// Add server-side blazor
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.UseW3CLogging();

app.Run();
