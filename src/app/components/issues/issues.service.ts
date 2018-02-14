import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { of } from 'rxjs/observable/of';

const API = 'https://api.github.com/search/issues';
const params = new HttpParams();

@Injectable()
export class GitIssueService {

  constructor(private http: HttpClient) {}

  getIssues(repoId: string) {
    if (repoId === '') {
      return of([]);
    }

    return this.http
      .get(API, {params: params.set('q', `repo:${repoId}`)});
  }
}
