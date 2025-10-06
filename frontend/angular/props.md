# Props

## Parent html

```html
<header>
  <app-button color="green" text="Add"></app-button>
</header>
```

## Child

### button.component.ts

```ts
import {Component, OnInit, Input} from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.css"],
})
export class ButtonComponent implements OnInit {
  @Input() text: string | undefined;
  @Input() colorName: string | undefined;

  constructor() {}

  ngOnInit(): void {}
}
```

### button.component.html

```html
<button [ngStyle]="{ 'background-color': colorName }" class="btn">
  {{ text }}
</button>
```
