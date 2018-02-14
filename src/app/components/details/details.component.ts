import { Component, Input } from '@angular/core';

import { Repo } from '../../models/repo';

@Component({
  selector: 'lyli-repo-details',
  templateUrl: './details.component.html',
})
export class RepoDetailsComponent {
  @Input() model: Repo;
}
