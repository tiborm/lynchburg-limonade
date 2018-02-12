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

import { GitResponse } from '../models/git-response';
import { Repo } from '../models/repo';

const RESULT_LIMIT = 14;
const API = 'https://api.github.com/search/repositories';
const params = new HttpParams();

@Injectable()
export class GitRepoService {

  private _lastResponse: GitResponse;

  constructor(private http: HttpClient) {}

  /**
   * Returns with the full object representation of the selected
   * user/repo id pair (aka full_name).
   * This is already queried by the typeahead so lets just use it.
   *
   * @param fullName: string user/repo id pair (aka full_name)
   */
  public getItem(fullName: string): Repo {
    // wish I could be brave enough to use find...
    return <Repo> this._lastResponse.items.filter(repo => repo.full_name === fullName)[0];
  }

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get(API, {params: params.set('q', term)})
      .map((response: GitResponse) => {
        this._lastResponse = response;
        return response.items
          .map((repo: Repo) => repo.full_name)
          .slice(0, RESULT_LIMIT);
      });
  }
}
