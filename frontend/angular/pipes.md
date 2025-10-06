# Pipes

## Custom Pipes

- cli
  > ng generate pipe pipes/somename

### generated and modified code

- src/app/pipes/somename.pipe.ts

  ```ts
  import {Pipe, PipeTransform} from "@angular/core";

  @Pipe({
    name: "somename",
  })
  export class SomenamePipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
      return null;
    }
  }
  ```

- src/app/pipes/somename.pipe.spec.ts

  ```ts
  import {SomenamePipe} from "./somename.pipe";

  describe("SomenamePipe", () => {
    it("create an instance", () => {
      const pipe = new SomenamePipe();
      expect(pipe).toBeTruthy();
    });
  });
  ```

- src/app/app.module.ts

  ```ts
  import {NgModule} from "@angular/core";
  import {BrowserModule} from "@angular/platform-browser";

  import {AppComponent} from "./app.component";
  import {SomenamePipe} from "./pipes/somename.pipe";

  @NgModule({
    declarations: [AppComponent, SomenamePipe],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent],
  })
  export class AppModule {}
  ```

### sample usage code
