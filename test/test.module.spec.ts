// external
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

// internal
import { TestModule } from './test.module';
import { TestComponent } from './test.component';

beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});

describe('TestComponent', () => {

  let comp: TestComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<TestComponent>;
  let nativeElement: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ]
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);

    // get from fixture
    comp = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    debugElement = fixture.debugElement;
  });
  it('should be defined.', async(() => {
    expect(fixture).toBeDefined();
    expect(comp).toBeTruthy();
  }));
  /*
  // ng-content
  it('should have marked by using `ng-content` in ngx-markdown[id="ng-content"].', async(() => {
    fixture.detectChanges();
    expect(nativeElement.querySelector('ngx-markdown[id="ng-content"]').innerHTML).toContain('<strong>bold</strong>');
  }));
  it('should have marked and changed by using `ng-content` in ngx-markdown[id="ng-content"].', async(() => {
    comp.description = '[link](http://github.com)';
    fixture.detectChanges();
    expect(nativeElement.querySelector('ngx-markdown[id="ng-content"]').innerHTML).toContain('<a href="http://github.com">');
  }));
  it('should have properly interpolated property `language` by using ng-content in ngx-markdown[id="ng-content"].', async(() => {
    fixture.detectChanges();
    expect(nativeElement.querySelector('ngx-markdown[id="ng-content"]').innerHTML).toContain('<strong>interpolated</strong>');
  }));

  /*
  // `string` property
  it('should have marked by using property `string` in ngx-markdown[id="string"].', async(() => {
    fixture.detectChanges();
    expect(nativeElement.querySelector('ngx-markdown[id="string"]').innerHTML).toContain('<strong>bold</strong>');
  }));
  it('should have marked changed by using property `string` in ngx-markdown[id="string"].', async(() => {
    comp.description = '[link](http://github.com)';
    fixture.detectChanges();
    expect(nativeElement.querySelector('ngx-markdown[id="string"]').innerHTML).toContain('a href="http://github.com"');
  }));
  it('should have properly interpolated property `language` by using property `string` in ngx-markdown[id="string"].', async(() => {
    fixture.detectChanges();
    expect(nativeElement.querySelector('ngx-markdown[id="string"]').innerHTML).toContain('<strong>interpolated</strong>');
  }));
  */
});
