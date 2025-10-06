# Routes

## Basic Setup

### app.module.ts

```ts
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from "./app.component";
import {TasksComponent} from "./components/tasks/tasks.component";
import {AboutComponent} from "./components/about/about.component";

const appRoutes: Routes = [
  {path: "", component: TasksComponent}, // home page
  {path: "about", component: AboutComponent},
];

@NgModule({
  declarations: [AppComponent, TasksComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}), // set enableTracing as true for easy debugging
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### about.component.html

```html
<div>
  <h2>Task Tracker</h2>
  <h4>Version: 1.0.0</h4>
  <!-- don't use href as it would refresh the page -->
  <!-- routerLink="/about" to link to other page routes -->
  <a routerLink="/">Go Back</a>
</div>
```

## Display or Hide component based on route

### header.component.html

```html
<header>
  <h1>{{ title }}</h1>
  <app-button
    *ngIf="hasRoute('/')"
    color="{{ showAddTask ? 'red' : 'green' }}"
    text="{{ showAddTask ? 'Close' : 'Add' }}"
  ></app-button>
</header>
```

### header.component.ts

```ts
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  title: string = "Task Tracker";
  showAddTask: boolean = false;

  // args here are providers
  constructor(private router: Router) {}

  ngOnInit(): void {}

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }
}
```
