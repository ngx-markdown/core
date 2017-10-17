/// <reference path="../typings/index.d.ts" />
// external
import { ElementRef, Injectable } from '@angular/core';
import { default as marked } from 'marked';

// internal
import { CallbackType } from './ngx-markdown.type';

/**
 * @export
 * @class MarkedConfigClass
 */
export class MarkedConfigClass {
  public options: marked.MarkedOptions = {
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  };
  public loadingTemplate? = `<div>Loading ...</div>`;
}

/**
 * Service to transform markdown to html.
 * @export
 * @class MarkdownService
 */
@Injectable()
export class MarkdownService {

  /**
   * Creates an instance of MarkdownService.
   * @param {MarkedConfigClass} config
   * @memberof MarkdownService
   */
  constructor(public config: MarkedConfigClass) { }

  /**
   * @param {string} string
   * @param {marked.MarkedOptions} [options]
   * @param {CallbackType} [callback]
   * @returns {Promise<string>}
   * @memberof MarkdownService
   */
  public marked(string: string, options?: marked.MarkedOptions, callback?: CallbackType): Promise<string> {
    return new Promise((resolve, reject) => {
      marked(string, (options) ? options : this.config[0].options, (error: any, result: string) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
        if (callback) {
          callback(error, result);
        }
      });
    });
  }
}
