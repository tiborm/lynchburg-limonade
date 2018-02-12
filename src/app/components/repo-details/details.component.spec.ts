import { TestBed, async } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { RepoDetailsComponent } from './details.component';
import { MetricComponent } from './metric.component';
import { IssuesComponent } from './issues.component';

import { Repo } from '../../models/repo';

// STUBS AND MOCKS -----------------------------
@Component({
  selector: 'lyli-issues',
  template: ''
})
class IssuesStubComponent {
  @Input() repoId = 'default';
}

const MOCK_RESPONSE: Repo = {
  id: 24195339,
  name: 'angular',
  full_name: 'angular/angular',
  owner: {
    avatar_url: ''
  },
  description: 'One framework. Mobile & desktop.',
  stargazers_count: 32996,
  watchers_count: 32996,
  language: 'TypeScript',
  forks_count: 8164,
  open_issues_count: 2149,
  score: 138.48235
};
// ---------------------------------------------

describe('RepoDetailsComponent', () => {

  let fixture;
  let detailsView;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RepoDetailsComponent,
        MetricComponent,
        IssuesStubComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepoDetailsComponent);
    detailsView = fixture.debugElement.componentInstance;
  }));

  it('should have a show function', async(() => {
    expect(typeof detailsView.show).toBe('function');
  }));

  it('should visualize full_name of the given repository', async(() => {
    detailsView.show(MOCK_RESPONSE);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span.h4.text-info').textContent).toContain('angular/angular');
  }));
});
