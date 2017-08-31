// external
import { ElementRef, Injectable } from '@angular/core';
import { default as marked } from 'marked';

/**
 * Service to transform markdown to html
 * @export
 * @class MarkdownService
 */
@Injectable()
export class MarkdownService {
  callback: Function;
  options = {
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  };

  constructor() { }

  public init(content: ElementRef, options: any, callback: marked.MarkedOptions): any {
    return marked.setOptions((options) ? options : this.options)(content.nativeElement.innerHTML, callback);
  }
}
