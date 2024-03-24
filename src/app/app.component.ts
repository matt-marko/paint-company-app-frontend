import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'A Paint Company Stock';

  router: Router = inject(Router);

  ngOnInit() {
    this.router.navigate(['']);
  }
}
