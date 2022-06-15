# Web
- 3 types
  1. Client Side Rendering (CSR)
  2. Server Side Rendering (SSR)
  3. Pre-rendering / Static Site Generation (SSG)
## Rendering
|Order|Client Side Rendering|Server Side Rendering|Pre-rendering / Static Site Generation|
|-|-|-|-|
|1|User requests a website|User requests a website|User requests a website|
|2|Server sends HTML file with JavaScript links|Server creates ready HTML files|Server sends static HTML file with JavaScript resources|
|3|Browser downloads HTML|Browser renders HTML, but it's not interactive|Browser renders HTML and downloads JavaScript|
|4|Browser downloads CSS and JavaScript|Browser downloads JavaScript|User see the static page, not interactive|
|5|Browser executes framework or library|Browser executes JavaScript|User is redirected to right file|
|6|Browser loads the website|Website is fully interactive|Website is fully interactive|

## Pros
|Client Side Rendering|Server Side Rendering|Pre-rendering / Static Site Generation|
|-|-|-|
|fast rendering after initial loading|Search engines bots can crawl for a better SEO|better user experience for the first loading|
|good for web apps with lots of logic, and needs authorization|Initial loading is faster|better SEO|
|a lot of JavaScript frameworks and libraries supporting it||less requests than with SSR|

## Cons
|Client Side Rendering|Server Side Rendering|Pre-rendering / Static Site Generation|
|-|-|-|
|low Search Engine Optimization (SEO)|lots of server requests|need to wait for interactivity until JavaScript is loaded|
|initial loading may take some time|full page reloads|need to provide user-friendly design for the first loading if data is required|
||slow rendering when app has a lot of interactivity||

## Usage
|Client Side Rendering|Server Side Rendering|Pre-rendering / Static Site Generation|
|-|-|-|
|if app has a lot of dynamic data|if app UI is complex but with a small amount of interactivity|if app has a UI with contents used for SEO|
|if app has very complex UI|if app is a more static page|if part of app is available for users without authentication|
|if app is focused on a bigger number of users|if the amount of users is not large|if don't want to use SSR, but need to improve loading time and SEO|
|if app needs authorization to be accessed||if app has more static content on the first page|
|if app doesn't have a lot of content used for SEO|||

## Frameworks
- React can be used for all 3 types

|Client Side Rendering|Server Side Rendering|Pre-rendering / Static Site Generation|
|-|-|-|
|React|Jinja2 on Django|NextJS (React)|
|Angular|Jinja2 on Flask|Gatsby|
|Vue|Embedded JavaScript templates on ExpressJS|Hugo|
|jQuery|React on ExpressJS||
||Ruby on Rails||
||ASP.NET CORE||
