import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, JsonPipe],
  template: `
  <h1>Star Wars API with <code>httpResource()</code></h1>
  ID: <input type="number" [(ngModel)]="id" /><br>
  <pre>{{resource.value() | json}}</pre>
  `,
})
export class AppComponent {
  id = signal(1);
  resource = httpResource(() => `https://swapi.dev/api/people/${this.id()}/`);
}
