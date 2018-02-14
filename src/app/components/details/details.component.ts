import { Component } from '@angular/core';

import { Repo } from '../../models/repo';

@Component({
  selector: 'lyli-repo-details',
  templateUrl: './details.component.html',
})
export class RepoDetailsComponent {

  model: Repo;

  show(repo: Repo ) {
    this.model = repo;
  }
}
