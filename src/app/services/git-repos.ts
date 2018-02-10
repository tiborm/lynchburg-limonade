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

import { Repo } from '../models/repo';

interface GitResponse {
  items: Array<any>;
}

const RESULT_LIMIT = 14;
const API = 'https://api.github.com/search/repositories';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Injectable()
export class GitRepoService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get(API, {params: PARAMS.set('q', term)})
      .map((response: GitResponse) => {
        return response.items
          .map((repo: Repo) => repo.full_name)
          .slice(0, RESULT_LIMIT);
      });
  }
}
