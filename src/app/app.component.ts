import { Component } from '@angular/core';

import { Repo } from './models/repo';

@Component({
  selector: 'lyli-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lynchburg Limonade';
  subTitle = 'Search for any git repo like Vue, Angular whatever...';

  model: Repo;
}
