# Directives

- it is used to change the behavior and appearance of DOM element
- it can implement all lifecycle hooks
- it cannot have template

## Structural Directives

### `*ngFor`

- allows looping of array

#### parent

- tasks.component.ts

```ts
import {Component, OnInit} from "@angular/core";
import {Task} from "src/app/Task";
import {TASKS} from "src/app/mock-tasks";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = TASKS;

  constructor() {}

  ngOnInit(): void {}
}
```

- tasks.component.html

```html
<app-task-item *ngFor="let task of tasks" [task]="task"> </app-task-item>
```

#### child

- task-item.component.ts

```ts
import {Component, OnInit, Input} from "@angular/core";
import {Task} from "src/app/Task";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.css"],
})
export class TaskItemComponent implements OnInit {
  @Input()
  task!: Task;

  constructor() {}

  ngOnInit(): void {}
}
```

- task-item.component.html

```html
<div class="task">
  <h3>{{ task.text }}</h3>
  <p>{{ task.day }}</p>
</div>
```

### `*ngIf`

- A structural directive that conditionally includes a template based on the value of an expression coerced to Boolean
  - When the expression evaluates to true, Angular renders the template provided in a then clause, and when false or null, Angular renders the template provided in an optional else clause
  - The default template for the else clause is blank

#### add-task.component.html

- do not show form when `showAddTask` is false

```html
<form *ngIf="showAddTask" class="add-form">
  <div class="form-control">
    <label for="text">Task</label>
    <input
      type="text"
      name="text"
      [(ngModel)]="text"
      id="text"
      placeholder="Add Task"
    />
  </div>
</form>
```

#### add-task.component.ts

```ts
import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {Subscription} from "rxjs";
import {UiService} from "src/app/services/ui.service";
import {Task} from "src/app/Task";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.css"],
})
export class AddTaskComponent implements OnInit {
  @Output()
  onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  showAddTask: boolean = false;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value: boolean) => (this.showAddTask = value));
  }

  ngOnInit(): void {}
}
```

### `*ngSwitch`

- app.component.html

  ```html
  <input type="text" [(ngModel)]="num" />
  <div [ngSwitch]="num">
    <div *ngSwitchCase="'1'">One</div>
    <div *ngSwitchCase="'2'">Two</div>
    <div *ngSwitchCase="'3'">Three</div>
    <div *ngSwitchCase="'4'">Four</div>
    <div *ngSwitchCase="'5'">Five</div>
    <div *ngSwitchDefault>This is Default</div>
  </div>
  ```

- app.component.ts

  ```ts
  import {Component} from "@angular/core";

  @Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
  })
  export class AppComponent {
    num: number = 0;
  }
  ```

- app.module.ts

  ```ts
  import {NgModule} from "@angular/core";
  import {BrowserModule} from "@angular/platform-browser";
  import {FormsModule} from "@angular/forms";

  import {AppComponent} from "./app.component";

  @NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
  })
  export class AppModule {}
  ```

## Attribute Directives

### `ngStyle`

- allow inline styling

```html
<button [ngStyle]="{ 'background-color': 'white' }" class="btn">text</button>
```

### `ngClass`

- Adds and removes CSS classes on an HTML element

#### task-item.component.html

```html
<!-- when task.reminder is true, reminder-class css class style will be activated-->
<div [ngClass]="{ reminder-class: task.reminder }" class="task">
  <h3>{{ task.text }}</h3>
  <p>{{ task.day }}</p>
</div>
```

#### task-item.component.ts

```ts
import {Component, OnInit, Input} from "@angular/core";
import {Task} from "src/app/Task";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.css"],
})
export class TaskItemComponent implements OnInit {
  @Input()
  task!: Task;

  constructor() {}

  ngOnInit(): void {}
}
```

#### task-item.component.css

```css
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.task.reminder-class {
  border-left: 5px solid green;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### `ngModel`

- Creates a FormControl instance from a domain model and binds it to a form control element

#### app.module.ts

```ts
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

import {AppComponent} from "./app.component";
import {AddTaskComponent} from "./components/add-task/add-task.component";

@NgModule({
  declarations: [AppComponent, AddTaskComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### add-task.component.ts

```ts
import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.css"],
})
export class AddTaskComponent implements OnInit {
  text!: string;
  day!: string;
  reminder: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
```

#### add-task.component.html

```html
<form class="add-form">
  <div class="form-control">
    <label for="text">Task</label>
    <input
      type="text"
      name="text"
      [(ngModel)]="text"
      id="text"
      placeholder="Add Task"
    />
  </div>
  <div class="form-control">
    <label for="day">Day & Time</label>
    <input
      type="text"
      name="day"
      [(ngModel)]="day"
      id="day"
      placeholder="Add Day & Time"
    />
  </div>
  <div class="form-control form-control-check">
    <label for="reminder">Set Reminder</label>
    <input
      type="checkbox"
      name="reminder"
      [(ngModel)]="reminder"
      id="reminder"
    />
  </div>
  <input type="submit" value="Save Task" class="btn btn-block" />
</form>
```

### `ngSubmit`

#### parent

- tasks.component.html

```html
<app-add-task (onAddTask)="addTask($event)"></app-add-task>
```

- tasks.component.ts

```ts
import {Component, OnInit} from "@angular/core";
import {TaskService} from "src/app/services/task.service";
import {Task} from "src/app/Task";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  addTask(task: Task) {
    // adds task to backend server
    this.taskService
      .addTask(task)
      .subscribe((task: Task) => this.tasks.push(task));
  }
}
```

#### child

- add-task.component.html

```html
<form class="add-form" (ngSubmit)="onSubmit()">
  <div class="form-control">
    <label for="text">Task</label>
    <input
      type="text"
      name="text"
      [(ngModel)]="text"
      id="text"
      placeholder="Add Task"
    />
  </div>
  <input type="submit" value="Save Task" class="btn btn-block" />
</form>
```

- add-task.component.ts

```ts
import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {Task} from "src/app/Task";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.css"],
})
export class AddTaskComponent implements OnInit {
  @Output()
  onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) {
      alert("Please add a task!");
      return;
    }

    const newTask = {
      text: this.text,
    };

    this.onAddTask.emit(newTask);

    // reset input value
    this.text = "";
  }
}
```

## Custom Directives

- cli
  > ng generate directive directives/somename

### generated and modified code

- src/app/directives/somename.directive.ts

```ts
import {Directive} from "@angular/core";

@Directive({
  selector: "[appSomename]",
})
export class SomenameDirective {
  constructor() {}
}
```

- src/app/directives/somename.directive.spec.ts

```ts
import {SomenameDirective} from "./somename.directive";

describe("SomenameDirective", () => {
  it("should create an instance", () => {
    const directive = new SomenameDirective();
    expect(directive).toBeTruthy();
  });
});
```

- src/app/app.module.ts

```ts
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {SomenameDirective} from "./directives/somename.directive";

@NgModule({
  declarations: [AppComponent, SomenameDirective],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### sample usage code

- lifecycle hooks works as well
- src/app/directives/somename.directive.ts

  - method 1: ElementRef

    ```ts
    import {Directive, ElementRef} from "@angular/core";

    @Directive({
      selector: "[appSomename]",
    })
    export class SomenameDirective {
      constructor(el: ElementRef) {
        const element = el.nativeElement;
        element.style.color = "red";
      }
    }
    ```

  - method 2: Document

    ```ts
    import {DOCUMENT} from "@angular/common";
    import {Directive, Inject} from "@angular/core";

    @Directive({
      selector: "[appSomename]",
    })
    export class SomenameDirective {
      constructor(@Inject(DOCUMENT) private document: Document) {
        const element = this.document.querySelector("p") as HTMLElement;
        element.style.color = "red";
      }
    }
    ```

  - method 3: ElementRef & Renderer2

    ```ts
    import {
      Directive,
      ElementRef,
      HostListener, // used for event listeners
      Renderer2,
    } from "@angular/core";

    @Directive({
      selector: "[appSomename]",
    })
    export class SomenameDirective {
      constructor(el: ElementRef, private renderer: Renderer2) {
        this.renderer.setStyle(this.el.nativeElement, "color", "red");
      }

      // used for event listener
      // method name can be anything
      @HostListener("mouseenter") onMouseEnter() {
        this.renderer.setStyle(
          this.el.nativeElement,
          "backgroundColor",
          "Black"
        );
      }
    }
    ```

- app.component.html

  ```html
  <p appSomename>custom directive</p>
  ```

### sample usage code 2, lifecycle method required if using input

- src/app/directives/somename.directive.ts

  ```ts
  import {Directive, OnInit, Input, ElementRef} from "@angular/core";

  @Directive({
    selector: "[appSomename]",
  })
  export class SomenameDirective implements OnInit {
    @Input()
    appSomename: string = "black";

    constructor(el: ElementRef) {
      // this will not work, only hard coding will work
      const element = el.nativeElement;
      element.style.color = this.appSomename;
    }

    ngOnInit(): void {
      const element = el.nativeElement;
      element.style.color = this.appSomename;
    }
  }
  ```

- app.component.html

  ```html
  <p appTesting="red">custom directive</p>
  ```
