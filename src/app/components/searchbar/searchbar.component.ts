import { Component, Output, Injectable, Input, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { GitRepoService } from '../../services/git-repos';
import { Repo } from '../../models/repo';

@Component({
  selector: 'lyli-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
  providers: [ GitRepoService ],
})
export class SearchbarComponent {
  model: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchComplete = false;

  @Output() result = new EventEmitter<Repo>();

  constructor(private _service: GitRepoService) {}

  onItemSelected(event: NgbTypeaheadSelectItemEvent) {
    this.searchComplete = true;
    this.result.emit(this._service.getSelectedItem(event.item));
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this._service.search(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed)
}
