// external
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

import { MarkdownComponent } from './ngx-markdown.component';
import { MarkdownService } from './ngx-markdown.service';
import { MarkdownModule } from './ngx-markdown.module';

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
      ],
      imports: [
        CommonModule,
        MarkdownModule.forChild()
      ],
      providers: [ ]
    }).compileComponents();
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownComponent);

    // get from fixture
    comp = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    debugElement = fixture.debugElement;

    comp.string = `{{table}}    
**my bold** [link](http://example.com) title: {{title}}`;
  });

  it('should be defined.', async(() => {
    expect(fixture).toBeDefined();
    expect(comp).toBeTruthy();
  }));

  /*
    Property `string`.
  */
  it('should have `loading` template.', async(() => {
    fixture.detectChanges();
    expect(nativeElement.innerHTML).toContain('<div>Loading ...</div>');
  }));
  it('should have transformed markdown to html.', async(() => {
    comp.init(comp.string, comp.change, (resolved, error) => {
      expect(resolved).toContain(`<strong>my bold</strong>`);
    });
  }));
  it('should have `callback` working.', async(() => {
    comp.callback = (error: any, result: string) => {
      expect(error).toBeNull();
      expect(result).toBeDefined();
    }
    comp.init(comp.string, comp.change, (resolved, error) => null);
  }));
  it('should have `interpolation` with `tables` working.', async(() => {
    comp.interpolation = {
      title: `This is interpolation title`,
      table: `| Name | Job | Description |
      |------|------|-------------|
      | Adrian |  Director    | He is the most powerful person.  |
      | Adrian |  Director    | He is the most powerful person.  |`
    }
    comp.options = {
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: true,
      sanitize: false,
      smartLists: true,
      smartypants: false
    };
    comp.init(comp.string, comp.change, (resolved: string, error: any) => {
      expect(resolved).toContain('<th>Name</th>');
      expect(resolved).toContain('<td>Adrian</td>');
    });
  }));
  it('should have been changed by changing `string`.', async(() => {
    comp.init(comp.string, comp.change, (resolved: string, error: any) => {
      expect(resolved).toContain('{{table}}');
    });
    comp.string = `**bold** *italic*`;
    comp.init(comp.string, comp.change, (resolved: string, error: any) => {
      expect(resolved).not.toContain('{{table}}');
    });
  }));
});
