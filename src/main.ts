import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { PermissionsComponent } from './ejemplo/permissions.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PermissionsComponent],
  template: `
   <app-permissions></app-permissions>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
