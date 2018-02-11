import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';


const API = 'https://api.github.com/search/repositories';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Injectable()
class IssuesService {
  constructor(private http: HttpClient) {}

  getMetric(term: string) {
    return this.http
      // FIXME align this to the actual request
      .get(API, {params: PARAMS.set('q', term)})
      .map((response: any) => {
        // FIXME align it to the actual response format
        return response.items
          .map(metric => metric.full_name);
      });
  }
}

@Component({
  selector: 'lyli-issues',
  providers: [ IssuesService ],
  template: `
  `,
})
export class IssuesComponent {
  private _repoId: string;

  get repoId() {
    return this._repoId;
  }

  @Input() set getIssues(value: string) {
    this._repoId = value;
    // TODO impl querying issue list
  }

}
