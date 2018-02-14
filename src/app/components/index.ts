import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SearchbarComponent } from './searchbar/searchbar.component';
import { RepoDetailsComponent } from './details/details.component';
import { MetricComponent } from './details/metric.component';
import { IssuesComponent } from './issues/issues.component';

export const COMPONENTS = [
  SearchbarComponent,
  RepoDetailsComponent,
  MetricComponent,
  IssuesComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
