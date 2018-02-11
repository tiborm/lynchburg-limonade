import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'lyli-repo-details',
  templateUrl: './details.component.html',
})
export class RepoDetailsComponent {

  @Input() repoId: string;

}
