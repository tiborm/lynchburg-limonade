import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IssuesComponent } from './issues.component';

describe('RepoDetailsComponent', () => {

  let fixture: ComponentFixture<IssuesComponent>;
  let issuesView: any;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        IssuesComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IssuesComponent);
    issuesView = fixture.debugElement.componentInstance;

    httpMock = TestBed.get(HttpTestingController);
  }));

  it('should call issues on git api', async(() => {
    issuesView.repoId = 'angular/angular';
    fixture.detectChanges();

    httpMock.expectOne('https://api.github.com/search/issues?q=repo:angular/angular');
    httpMock.verify();
  }));

  it('should render issues respon', async(() => {
    issuesView.repoId = 'angular/angular';
    fixture.detectChanges();

    const issueRequest = httpMock.expectOne('https://api.github.com/search/issues?q=repo:angular/angular');
    issueRequest.flush({
      total_count: 22082,
      incomplete_results: false,
      items: [
        {
          html_url: 'https://github.com/repos/angular/angular/issues/67546',
          number: 67546,
          title: 'test issue 01',
          user: {
            login: 'test user 01',
          },
          state: 'open',
          comments: 21,
          body: 'test body message 01',
          score: 1.0
        },
        {
          html_url: 'https://github.com/repos/angular/angular/issues/76467',
          number: 76467,
          title: 'test issue 02',
          user: {
            login: 'test user 02',
          },
          state: 'open',
          comments: 21,
          body: 'test body message 02',
          score: 1.0
        },
        {
          html_url: 'https://github.com/repos/angular/angular/issues/34534',
          number: 34534,
          title: 'test issue 03',
          user: {
            login: 'test user 03',
          },
          state: 'open',
          comments: 43,
          body: 'test body message 03',
          score: 1.0
        },
      ]
    });

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ul.list-group').childElementCount).toBe(4);
  }));
});
