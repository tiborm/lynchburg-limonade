import { Component, Input } from '@angular/core';

import { GitResponse } from '../../models/git-response';
import { GitIssueService } from './issues.service';

interface GitIssue {
  html_url: string;
  number: number;
  title: string;
  user: any;
  state: string;
  comments: number;
  body: string;
  score: number;
}

@Component({
  selector: 'lyli-issues',
  providers: [ GitIssueService ],
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
})
export class IssuesComponent {
  issues: GitIssue[];
  searching = false;

  private _repoId: string;
  @Input() set repoId(value: string) {
    this._repoId = value;

    this.searching = true;
    this._service.getIssues(value)
      .subscribe((response: GitResponse) => {
        this.issues = response.items;
        this.searching = false;
      });
  }
  get repoId() {
    return this._repoId;
  }

  constructor(private _service: GitIssueService) {}
}
