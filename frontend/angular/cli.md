# Angular CLI

- a standard tooling for Angular development
- a command line interface for creating Angular apps
- Dev server and easy production build
- Commands to generate components, services, etc

## Installation

```
npm install -g @angular/cli
```

```
yarn global add @angular/cli
```

### Install external libraries

- if `ng-add` is supported in current angular version

  - benefits of using this is it helps to auto setup the basic import configs required in `app.module.ts`

  ```
  ng add @fortawesome/angular-fontawesome
  ```

  - specifying a version

    ```
    ng add @fortawesome/angular-fontawesome@<version>
    ```

- else use usual `npm` or `yarn`

  ```
  yarn add @fortawesome/fontawesome-svg-core
  yarn add @fortawesome/free-solid-svg-icons
  yarn add @fortawesome/angular-fontawesome@<version>
  ```

  ```
  npm install @fortawesome/fontawesome-svg-core
  npm install @fortawesome/free-solid-svg-icons
  npm install @fortawesome/angular-fontawesome@<version>
  ```

  - you would need to manually add it into the `app.module.ts`

    ```ts
    import {AppComponent} from "./app.component";
    import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

    @NgModule({
      declarations: [AppComponent],
      imports: [BrowserModule, FontAwesomeModule],
      providers: [],
      bootstrap: [AppComponent],
    })
    export class AppModule {}
    ```

### Using external library

- task-item.component.ts

  ```ts
  import {Component, OnInit} from "@angular/core";
  import {faTimes} from "@fortawesome/free-solid-svg-icons";

  @Component({
    selector: "app-task-item",
    templateUrl: "./task-item.component.html",
    styleUrls: ["./task-item.component.css"],
  })
  export class TaskItemComponent implements OnInit {
    faTimes = faTimes;

    constructor() {}

    ngOnInit(): void {}
  }
  ```

- task-item.component.html

  ```html
  <div class="task">
    <h3>task text <fa-icon [icon]="faTimes"></fa-icon></h3>
    <p>task day</p>
  </div>
  ```

## New Project creation

```
ng new my-app
```

## Run Project

```
ng serve --open
```

## Generate new Component

- this will auto generate and create 4 files in the component folder
- it is able to create a component in nested folders
  - `folderName` is not required if generating component in `app` folder

```
ng generate component folderName/componentName
```

- example
  ```
  ng generate component components/header
  ```

### Auto generated files

#### components/header.component.css

```css
/* empty */
```

#### components/header.component.html

```html
<p>componentName works!</p>
```

#### components/header.component.ts

```ts
import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-header", // this will be the html tag name of the component
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  // similar to React ComponentDidMount lifecycle method
  ngOnInit(): void {}
}
```

#### components/header.component.spec.ts

```ts
import {ComponentFixture, TestBed} from "@angular/core/testing";

import {HeaderComponent} from "./header.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
```

### Auto modified files and might need manual modifications

#### app.module.ts

```ts
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {HeaderComponent} from "./components/header/header.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Files to be manually modified

#### app.component.html

- newly generated components have to be added here manually

```html
<h1>{{ title }}</h1>
<app-header></app-header>
```

## Generate new Service

- this will auto generate and create 2 files in the services folder
- it is able to create a service in nested folders
  - `folderName` is not required if generating service in `app` folder

```
ng generate service folderName/serviceName
```

- example
  ```
  ng generate service services/task
  ```

### Auto generated files

#### services/task.service.ts

```ts
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor() {}
}
```

#### services/task.service.spec.ts

```ts
import {TestBed} from "@angular/core/testing";

import {TaskService} from "./task.service";

describe("TaskService", () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
```
