// external
import { Component, ElementRef, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';

// internal
import { MarkdownService } from './ngx-markdown.service';
import template from './ngx-markdown.component.html';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-markdown',
  template
})
export class MarkdownComponent implements OnInit {
  @Input() callback: Function;
  @Input() options: any;
  @ViewChild('content', { read: ElementRef }) content: ElementRef;

  constructor(private markdownService: MarkdownService) { }

  ngOnInit() {
    this.content.nativeElement.innerHTML = this.markdownService.marked(this.content, this.options, this.callback);
  }
}
