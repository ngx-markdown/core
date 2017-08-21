// external
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

import { MarkdownComponent } from './ngx-markdown.component';
import { MarkdownService } from './ngx-markdown.service';

beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});

describe('MarkdownComponent', () => {

  let comp: MarkdownComponent;
  let debugElement: any;
  let fixture: ComponentFixture<MarkdownComponent>;
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MarkdownComponent
      ],
      imports: [
        CommonModule
      ],
      providers: [
        MarkdownService
      ]
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownComponent);

    // get from fixture
    comp = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    debugElement = fixture.debugElement;
  });

  it('should be defined', async(() => {
    expect(fixture).toBeDefined();
    expect(comp).toBeTruthy();
  }));

  it('should be transformed to html', async(() => {
    comp.content.nativeElement.innerHTML = `**my bold markdown**`;
    expect(comp.content.nativeElement.innerHTML).toContain('**my bold markdown**');
    fixture.detectChanges();
    expect(comp.content.nativeElement.innerHTML).toContain('<p><strong>my bold markdown</strong>');
  }));
});
