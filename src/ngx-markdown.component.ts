// external
import { Component, ElementRef, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';

// internal
import { MarkdownService } from './ngx-markdown.service';

/**
 * @export
 * @class MarkdownComponent
 * @implements {OnInit}
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-markdown',
  templateUrl: './ngx-markdown.component.html'
})
export class MarkdownComponent implements OnInit {
  @Input() callback: any;
  @Input() options: marked.MarkedOptions;
  @ViewChild('content', { read: ElementRef }) content: ElementRef;

  constructor(private markdownService: MarkdownService) { }

  ngOnInit() {
    this.content.nativeElement.innerHTML = this.markdownService.init(this.content, this.options, this.callback);
  }
}
