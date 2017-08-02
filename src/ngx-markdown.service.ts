// external
import { ElementRef, Injectable } from '@angular/core';
import * as marked from 'marked';

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

  public marked(content: ElementRef, ...args: any[]) {
    return marked.setOptions((args[0]) ? args[0] : this.options)(content.nativeElement.innerHTML, args[1]);
  }
}
