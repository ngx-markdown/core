import { AfterContentInit, Component, OnInit } from '@angular/core';
import { MarkdownComponent } from './../src/ngx-markdown.component';

@Component({
  selector: 'test-component',
  templateUrl: `./test.component.html`
})
export class TestComponent implements AfterContentInit, OnInit {

  description = '**bold** **{{language}}**';
  language = `interpolated`;
  result: Promise<string>;

  /**
   * Creates an instance of TestComponent.
   * @memberof TestComponent
   */
  constructor() { }

  ngOnInit() { }
  ngAfterContentInit() { }
  getResult($event): any { }
}
