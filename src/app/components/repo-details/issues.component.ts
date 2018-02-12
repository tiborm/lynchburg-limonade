/**
 * I used a different MVC approach in this componet.
 * While the different aspects of the code (model, view, ctrl) still separated on the code level
 * I haven't used separate files. However it is a matter of agreement within the team to use one or the other
 * way or mix them when it makes more sense.
 */
import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';

import { GitResponse } from '../../models/git-response';

const API = 'https://api.github.com/search/issues';
const params = new HttpParams();

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

@Injectable()
class GitIssueService {

  constructor(private http: HttpClient) {}

  getIssues(repoId: string) {
    if (repoId === '') {
      return of([]);
    }

    return this.http
      .get(API, {params: params.set('q', `repo:${repoId}`)});
  }
}

@Component({
  selector: 'lyli-issues',
  providers: [ GitIssueService ],
  template: `
    <ul class="list-group">
      <li class="list-group-item list-group-item-info">Open issues
        <span *ngIf="searching" class="text-muted"> - Getting items...</span>
      </li>
      <li *ngFor="let issue of issues" class="list-group-item">
        <h6><a href="{{ issue.html_url }}">{{ issue.title }}</a></h6>
        <small class="text-muted">
          <span class="text-info">#{{ issue.number }}</span>
          reported by {{ issue.user.login }},
          {{ issue.comments }} comments,
          score: {{ issue.score }}
        </small>
      </li>
    </ul>
  `,
  styles: [
    'ul { list-style: none; }',
    'a { color: inherit; }'
  ]
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
