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
  options: marked.MarkedOptions = {
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  };

  constructor() { }

  public init(content: ElementRef, options: marked.MarkedOptions, callback?: any): string {
    return marked.setOptions((options) ? options : this.options)(content.nativeElement.innerHTML, callback);
  }
}
