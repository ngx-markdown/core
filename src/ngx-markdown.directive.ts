// external
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

// internal
import { MarkdownService } from './ngx-markdown.service';

@Directive({
  selector: '[ngx-markdown]',
})
export class MarkdownDirective implements OnInit {
  @Input() options: any;
  @Input() callback: Function;

  constructor(
    public el: ElementRef,
    public markdownService: MarkdownService
  ) { }

  ngOnInit() {
    this.el.nativeElement.innerHTML = this.markdownService.marked(this.el, this.options, this.callback);
  }
}
