Main branch hosted on Netlify at [https://randomwebbits.com/](https://randomwebbits.com/)

# Random Web Bits

**What is it?** A fun project to host short articles about the web and web development.  
**What does it do?** A website in development hosted on Netlify showcases modern web development techniques of HTML, CSS, and JS. This type of website is static, whereby all the code running the site is run in the browser.

- Developers:
  > Create a [codespace](https://docs.github.com/en/codespaces/developing-in-codespaces/creating-a-codespace-for-a-repository) (from the green dropdown) to utilize GitHub's container-enabled development platform. Be sure to increase the CPU specs for faster load-times.
- &lt;RandomWebBits&gt;
  > The website's code is in full in this repository.

---

## Features

### Responsive web design

- Developed for use on mobile/tablet/desktop devices
- Web Bits are made mobile first and grow to fit desktop viewports

### JavaScript components

- A newer web development practice: JavaScript modules represent header, footer, and 'web bits' structures.
- The "home" and "pages" article cards are initialized as a "WebBits" component. They're rendered to the page using vanilla javascript, added directly to the DOM as whole fragments.
- PhotoSwipe library used in showcasing images in multiple locations
- Lit-Html library is utilized to create framework components, like those found in react and angular. Referring 'acronyms-element.js', HTML pages containing "acronyms-list" elements render the data imports.

```HTML
...
<script type="module" src="../js/components/acronyms-element.js"></script>
</head>
<body>
    <main>
    ...
    <acronyms-list></acronyms-list>
    </main>
<body>
</html>
```

### Articles

- Fun bits of knowledge you may/may not know or have seen before.

---

#### Release Updates

1.0.0: Added Favicon to all pages. Edited Header/footer sections  
1.0.4:  
&nbsp;&nbsp;- Image optimizations and attributions.  
&nbsp;&nbsp;- Added footer UL of the requested attributions from FLATICON  
&nbsp;&nbsp;- New WebBits page: chatGPT  
1.0.6: Script.js changes  
&nbsp;&nbsp;- Added navigation link objects  
&nbsp;&nbsp;- GitHub Desktop - Squash commit history  
1.0.7: New WebBits page: paint3D  
1.0.8: Added dictionary page  
1.0.11:  
&nbsp;&nbsp;- Conformed dictionary.js to module, set to defer on load  
&nbsp;&nbsp;- Added dictionary.js to index.html  
&nbsp;&nbsp;- Changed index page WebBits to show 3 random articles  
1.0.12: New WebBits page: boinc  
1.0.15:  
&nbsp;&nbsp;- New WebBits page: ipaddress  
&nbsp;&nbsp;- Minor code fixes  
&nbsp;&nbsp;- Web Bits grammer fixes, edits, and corrections  
1.0.16: Minor code fixes  
1.0.19:  
&nbsp;&nbsp;- Dictionary search input validation  
&nbsp;&nbsp;- Added ToDo List page  
&nbsp;&nbsp;- Added ToDo List component on index  
1.0.20:: Refactor code: WebBits.js, script.js  
1.0.22:  
&nbsp;&nbsp;- New WebBits page: markup  
&nbsp;&nbsp;- New WebBits page: searchverticals  
1.0.23: New WebBits page: networkspeed  
1.0.24: Refactor To-Dos List  
1.0.25: New WebBits page: How E-mail Works  
1.1.26: Added guides card section  
1.1.28:  
&nbsp;&nbsp;- Lit component: Acronyms List  
&nbsp;&nbsp;- Components update, multiple pages  
1.1.29: New WebBits page: drives  
1.2.31:  
&nbsp;&nbsp;- Module design implementation  
&nbsp;&nbsp;- Component functionality updates  
1.2.32: New WebBits page: virtualtour  
1.2.33: New WebBits guide: applicationtab  
1.2.34: Added PhotoSwipe component to guide: applicationtab  
1.2.35: CSS color revision - dark mode/light mode  
1.2.36: PS updates networkspeed page  
1.2.37: Ammend widgets for Firefox functionality  
1.2.38: New WebBits page: dns  
1.2.39: New WebBits page: inspectpages  
1.2.40: Abbr additions, CSS adjustments, and general updates  
1.2.41: New WebBits page: google #1 website
