// external
import { ElementRef, Injectable } from '@angular/core';
import 'marked';

@Injectable()
export class MarkdownService {
  callback: Function;
  options = {
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  };

  constructor() { }

  public init(content: ElementRef, options: any, callback: Function): any {
    return marked.setOptions((options) ? options : this.options)(content.nativeElement.innerHTML, callback);
  }
}
