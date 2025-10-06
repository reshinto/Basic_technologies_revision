# Events

## click

### simple example

#### button.component.ts

```ts
import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.css"],
})
export class ButtonComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onClick() {
    console.log("click");
  }
}
```

#### button.component.html

```html
<button class="btn" (click)="onClick()">text</button>
```

### dynamic function example

#### parent

##### header.component.ts

```ts
import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  toggleAddTask() {
    console.log("toggle");
  }
}
```

##### header.component.html

```html
<header>
  <app-button (btnClick)="toggleAddTask()"></app-button>
</header>
```

#### child

##### button.component.ts

```ts
import {Component, OnInit, Output, EventEmitter} from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.css"],
})
export class ButtonComponent implements OnInit {
  @Output() btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.btnClick.emit();
  }
}
```

##### button.component.html

```html
<button class="btn" (click)="onClick()">text</button>
```

## dblclick

### parent

#### tasks.component.html

```html
<app-task-item
  *ngFor="let task of tasks"
  [task]="task"
  (onToggleReminder)="toggleReminder(task)"
>
</app-task-item>
```

#### tasks.component.ts

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

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe(); // this will update the backend server
  }
}
```

### child

#### task-item.component.html

```html
<div class="task" (dblclick)="onToggle(task)">
  <h3>{{ task.text }}</h3>
  <p>{{ task.day }}</p>
</div>
```

#### task-item.component.ts

```ts
import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Task} from "src/app/Task";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.css"],
})
export class TaskItemComponent implements OnInit {
  @Input()
  task!: Task;
  @Output()
  onToggleReminder: EventEmitter<Task> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }
}
```
