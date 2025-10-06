# Lifecycle Hooks

- A component instance has a lifecycle that starts when Angular instantiates the component class and renders the component view along with its child views
- The lifecycle continues with change detection, as Angular checks to see when data-bound properties change, and updates both the view and the component instance as needed
- The lifecycle ends when Angular destroys the component instance and removes its rendered template from the DOM
- Directives have a similar lifecycle, as Angular creates, updates, and destroys instances in the course of execution
- the application can use lifecycle hook methods to tap into key events in the lifecycle of a component or directive to
  - initialize new instances
  - initiate change detection when needed
  - respond to updates during change detection
  - clean up before deletion of instances
- `constructor` is always called first before any lifecycle methods

## ngOnInit

- purpose
  - Initialize the directive or component after Angular first displays the data-bound properties and sets the directive or component's input properties
- timing
  - Called once, after the first `ngOnChanges()`
  - `ngOnInit()` is still called even when `ngOnChanges()` is not
    - which is the case when there are no template-bound inputs
- similar to react's `ComponentDidMount`

### Example

#### Parent

```ts
import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.css"],
})
export class ParentComponent implements OnInit {
  isChild = false;

  constructor() {
    console.log("Parent Constructor is called");
  }

  ngOnInit(): void {
    console.log("Parent OnInit is called");
  }

  toggleChild() {
    this.isChild = !this.isChild;
  }
}
```

```html
<h1>Parent Component</h1>

<button (click)="toggleChild()">Toggle Child</button>
<app-child *ngIf="isChild"></app-child>
```

#### Child

```ts
import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"],
})
export class ChildComponent implements OnInit {
  constructor() {
    console.log("Child Constructor is called");
  }

  ngOnInit(): void {
    console.log("Child OnInit is called");
  }
}
```

```html
<h1>Child Component</h1>
```

## ngOnChanges

- purpose
  - Respond when Angular sets or resets data-bound input properties
  - The method receives a SimpleChanges object of current and previous property
    values
  - note: This happens frequently, so any operation you perform here impacts performance significantly
- timing
  - Called before `ngOnInit()` (if the component has bound inputs) and whenever one or more data-bound input properties change
  - note: If your component has no inputs or you use it without providing any inputs, the framework will not call `ngOnChanges()`
- try to avoid using `ngOnChange` and `ngDoCheck` in the same component as it might cause a memory leak
- similar to react's `onChange` attribute

### Example

- make sure `FormsModules` is imported in `app.module.ts`

```ts
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms"; // add this

import {AppComponent} from "./app.component";
import {ParentComponent} from "./components/parent/parent.component";
import {ChildComponent} from "./components/child/child.component";

@NgModule({
  declarations: [AppComponent, ParentComponent, ChildComponent],
  imports: [BrowserModule, FormsModule], // modify this
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### Parent

```ts
import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.css"],
})
export class ParentComponent implements OnInit {
  channelName = "";

  constructor() {
    console.log("Parent Constructor is called");
  }

  ngOnInit(): void {
    console.log("Parent OnInit is called");
  }
}
```

```html
<h1>Parent Component</h1>

<input type="text" [(ngModel)]="channelName" />
<app-child [channelName]="channelName"></app-child>
```

#### Child

```ts
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"],
})
export class ChildComponent implements OnInit, OnChanges {
  @Input()
  channelName = "";

  constructor() {
    console.log("Child Constructor is called");
  }

  ngOnInit(): void {
    console.log("Child OnInit is called");
  }

  // this is called before ngOnInit
  // this will be called each time there is a change in channelName
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log("Child OnChanges is called");
  }
}
```

```html
<h1>Child Component</h1>
<p>{{ channelName }}</p>
```

## ngDoCheck

- purpose
  - Detect and act upon changes that Angular can't or won't detect on its own
- timing
  - Called immediately after `ngOnChanges()` on every change detection run, and immediately after `ngOnInit()` on the first run
- try to avoid using `ngOnChange` and `ngDoCheck` in the same component as it might cause a memory leak
- similar to react's `ComponentDidUpdate`

### Example

#### Parent

```ts
import {Component, OnInit, DoCheck} from "@angular/core";

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.css"],
})
export class ParentComponent implements OnInit, DoCheck {
  channelName = "";

  constructor() {
    console.log("Parent Constructor is called");
  }

  ngOnInit(): void {
    console.log("Parent OnInit is called");
  }

  // called first before child
  ngDoCheck() {
    console.log("Parent DoCheck is called");
  }
}
```

```html
<h1>Parent Component</h1>

<app-child [channelName]="channelName"></app-child>
```

#### Child

```ts
import {Component, OnInit, Input, DoCheck} from "@angular/core";

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"],
})
export class ChildComponent implements OnInit, DoCheck {
  @Input()
  channelName = "";

  constructor() {
    console.log("Child Constructor is called");
  }

  ngOnInit(): void {
    console.log("Child OnInit is called");
  }

  ngDoCheck(): void {
    console.log("Child DoCheck is called");
  }
}
```

```html
<h1>Child Component</h1>
<p>{{ channelName }}</p>
```

## ngAfterContentInit

- purpose
  - Respond after Angular projects external content into the component's view, or into the view that a directive is in
- timing
  - Called once after the first `ngDoCheck()`
- similar to react's `useLayoutEffect`, but different as it allows control
- not accessible in `ngOnInit`, and initial load for `ngOnChanges` and `ngDoCheck`

### Example

#### Parent

```ts
import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.css"],
})
export class ParentComponent implements OnInit {
  constructor() {
    console.log("Parent Constructor is called");
  }

  ngOnInit(): void {
    console.log("Parent OnInit is called");
  }
}
```

```html
<h1>Parent Component</h1>

<app-child>
  <!-- location where it gets initialized -->
  <h2 #projectedContent>Please subscribe</h2>
</app-child>
```

#### Child

```ts
import {
  Component,
  OnInit,
  AfterContentInit,
  ContentChild,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"],
})
export class ChildComponent implements OnInit, AfterContentInit {
  @ContentChild("projectedContent")
  protectedContent: ElementRef;

  constructor() {
    console.log("Child Constructor is called");
  }

  ngOnInit(): void {
    console.log("Child OnInit is called");
    console.log("OnInit", this.protectedContent); // undefined
  }

  ngAfterContentInit(): void {
    console.log("in after content init");
    console.log("AfterContentInit", this.protectedContent); // can only access this after content has been initialized
  }
}
```

```html
<h1>Child Component</h1>

<!-- required to display projectedContent contents -->
<ng-content></ng-content>

<p>test</p>
```

## ngAfterContentChecked

- purpose
  - Respond after Angular checks the content projected into the directive or component
- timing
  - Called after `ngAfterContentInit()` and every subsequent `ngDoCheck()`

### Example

#### Parent

```ts
import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.css"],
})
export class ParentComponent implements OnInit {
  constructor() {
    console.log("Parent Constructor is called");
  }

  ngOnInit(): void {
    console.log("Parent OnInit is called");
  }
}
```

```html
<h1>Parent Component</h1>

<app-child>
  <h2 #projectedContent>Please subscribe</h2>
</app-child>
```

#### Child

```ts
import {
  Component,
  OnInit,
  AfterContentInit,
  ContentChild,
  ElementRef,
  AfterContentChecked,
} from "@angular/core";

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"],
})
export class ChildComponent
  implements OnInit, AfterContentInit, AfterContentChecked
{
  @ContentChild("projectedContent")
  protectedContent: ElementRef;

  constructor() {
    console.log("Child Constructor is called");
  }

  ngOnInit(): void {
    console.log("Child OnInit is called");
  }

  ngAfterContentInit(): void {
    console.log("in after content init");
  }

  // this runs after ngAfterContentInit has executed and after subsequent ngDoCheck
  ngAfterContentChecked(): void {
    console.log("called after content init");
  }
}
```

```html
<h1>Child Component</h1>

<ng-content></ng-content>

<p>test</p>
```

## ngAfterViewInit

- purpose
  - Respond after Angular initializes the component's views and child views, or the view that contains the directive
- timing
  - Called once after the first `ngAfterContentChecked()`

### Example

#### Parent

```ts
import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.css"],
})
export class ParentComponent implements OnInit {
  constructor() {
    console.log("Parent Constructor is called");
  }

  ngOnInit(): void {
    console.log("Parent OnInit is called");
  }
}
```

```html
<h1>Parent Component</h1>

<app-child>
  <h2 #projectedContent>Please subscribe</h2>
</app-child>
```

#### Child

```ts
import {
  Component,
  OnInit,
  AfterContentInit,
  ContentChild,
  ElementRef,
  AfterContentChecked,
  AfterViewInit,
} from "@angular/core";

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"],
})
export class ChildComponent
  implements OnInit, AfterContentInit, AfterContentChecked, AfterViewInit
{
  @ContentChild("projectedContent")
  protectedContent: ElementRef;

  constructor() {
    console.log("Child Constructor is called");
  }

  ngOnInit(): void {
    console.log("Child OnInit is called");
  }

  ngAfterContentInit(): void {
    console.log("in after content init");
  }

  ngAfterContentChecked(): void {
    console.log("called after content init");
  }

  // this runs after ngAfterContentChecked has executed
  ngAfterViewInit(): void {
    console.log("called after content checked");
  }
}
```

```html
<h1>Child Component</h1>

<ng-content></ng-content>

<p>test</p>
```

## ngAfterViewChecked

- purpose
  - Respond after Angular checks the component's views and child views, or the view that contains the directive
- timing
  - Called after the `ngAfterViewInit()` and every subsequent `ngAfterContentChecked()`

### Example

#### Parent

```ts
import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.css"],
})
export class ParentComponent implements OnInit {
  constructor() {
    console.log("Parent Constructor is called");
  }

  ngOnInit(): void {
    console.log("Parent OnInit is called");
  }
}
```

```html
<h1>Parent Component</h1>

<app-child>
  <h2 #projectedContent>Please subscribe</h2>
</app-child>
```

#### Child

```ts
import {
  Component,
  OnInit,
  AfterContentInit,
  ContentChild,
  ElementRef,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
} from "@angular/core";

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"],
})
export class ChildComponent
  implements
    OnInit,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  @ContentChild("projectedContent")
  protectedContent: ElementRef;

  constructor() {
    console.log("Child Constructor is called");
  }

  ngOnInit(): void {
    console.log("Child OnInit is called");
  }

  ngAfterContentInit(): void {
    console.log("in after content init");
  }

  ngAfterContentChecked(): void {
    console.log("called after content init");
  }

  ngAfterViewInit(): void {
    console.log("called after content checked");
  }

  // this runs after ngAfterViewInit has executed
  ngAfterViewChecked(): void {
    console.log("called after view init");
  }
}
```

```html
<h1>Child Component</h1>

<ng-content></ng-content>

<p>test</p>
```

## ngOnDestroy

- purpose
  - Cleanup just before Angular destroys the directive or component
  - Unsubscribe Observables and detach event handlers to avoid memory leaks
- timing
  - Called immediately before Angular destroys the directive or component
- similar to react's `ComponentWillUnmount`

### Example

#### Parent

```ts
import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-parent",
  templateUrl: "./parent.component.html",
  styleUrls: ["./parent.component.css"],
})
export class ParentComponent implements OnInit {
  isChild = false;

  constructor() {
    console.log("Parent Constructor is called");
  }

  ngOnInit(): void {
    console.log("Parent OnInit is called");
  }

  toggleChild() {
    this.isChild = !this.isChild;
  }
}
```

```html
<h1>Parent Component</h1>

<button (click)="toggleChild()">Toggle Child</button>
<app-child *ngIf="isChild"></app-child>
```

#### Child

```ts
import {Component, OnInit, OnDestroy} from "@angular/core";

@Component({
  selector: "app-child",
  templateUrl: "./child.component.html",
  styleUrls: ["./child.component.css"],
})
export class ChildComponent implements OnInit, OnDestroy {
  counter = 0;
  interval: ReturnType<typeof setInterval>;

  constructor() {
    console.log("Child Constructor is called");
  }

  ngOnInit(): void {
    console.log("Child OnInit is called");

    this.interval = setInterval(() => {
      this.counter += 1;
      console.log(this.counter);
    }, 1000);
  }

  ngOnDestroy(): void {
    console.log("Child OnDestroy is called");
    clearInterval(this.interval);
  }
}
```

```html
<h1>Child Component</h1>
```
