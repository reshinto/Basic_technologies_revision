# Angular

[Documentation](https://angular.io/docs)

- an application design framework and development platform for creating efficient and sophisticated Single Page Apps
- it generally runs on the client, but can be used to create full stack apps by making HTTP requests to a backend server
- it can also be run on the server side with `Angular Universal`
- `Angular 1` / `Angular JS` and `Angular 2` is completely different and is a separate framework
  - `Angular 2` is a newly rewritten framework

## Why use Angular

- create dynamic frontend apps & UIs
- full featured framework
  - eg.: router, http, etc.
- integrated TypeScript (optional)
- RxJS
  - uses `Observables`
    - it allows us to write efficient asynchronous programming
- test friendly
  - easy to write unit tests and end-to-end tests
- popular in enterprise business

## Angular Components

- Angular is component driven
- components are pieces of the UI including the template (html), logic and styling
- components are reusable and can be embedded into the template as an XML-like tag
- component design is similar to `React` where a page is broken down to multiple smaller reusable components

### app.component.ts

```ts
import {Component} from "@angular/core";

@Component({
  selector: "app-root", // html tag name of the component to be embedded into the root html
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title: string = "angular-crash"; // add properties, custom methods, lifecycle methods, etc.
}
```

### app.component.css

```css
/* empty */
```

### app.component.html

#### retrieve variables or methods from component

```html
<h1>{{ title }}</h1>
```

### app.module.ts

- this same file will be updated when a new component is generated
  - similarly, it also has to be updated during any manual deletion of a component

```ts
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Root HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>AngularCrash</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```
