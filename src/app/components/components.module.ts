import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SearchbarComponent } from './searchbar/searchbar.component';
import { RepoDetailsComponent } from './repo-details/details.component';

export const COMPONENTS = [
  SearchbarComponent,
  RepoDetailsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CompsModule { }
