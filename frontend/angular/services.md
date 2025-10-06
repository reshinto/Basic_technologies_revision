# Angular Services

- Angular distinguishes components from services to increase modularity and reusability
- by separating a component's view related functionality from other kinds of processing
  - you can make the component classes lean and efficient
- a component can delegate certain tasks to services
  - example
    - fetching data from the server
    - validating user input
    - logging directly to the console

## Simple service example

### task.service.ts

```ts
import {Injectable} from "@angular/core";
import {Task} from "src/app/Task";
import {TASKS} from "src/app/mock-tasks";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor() {}

  getTasks(): Task[] {
    return TASKS;
  }
}
```

### tasks.component.ts

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
    this.tasks = this.taskService.getTasks();
  }
}
```

## Observable service example

### task.service.ts

```ts
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Task} from "src/app/Task";
import {TASKS} from "src/app/mock-tasks";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor() {}

  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }
}
```

### tasks.component.ts

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
}
```

## Real world service example

### tasks.component.ts

- similar to the Observable service example

### task.service.ts

```ts
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task} from "src/app/Task";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private apiUrl = "http://localhost:5000/tasks";

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, httpOptions);
  }
}
```

### app.module.ts

```ts
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```
