// external
import {
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  KeyValueDiffers,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as _ from 'lodash-es';

// internal
import { CallbackType } from './ngx-markdown.type';
import { MarkdownService } from './ngx-markdown.service';

/**
 * @export
 * @abstract
 * @class MarkdownHoodClass
 */
@Injectable()
export abstract class MarkdownHoodClass {
  protected directive = false;
  protected ngContent: string;
  /**
   * if `ngOnChanges` method will find specific changes then property `change` will be set to true.
   * if change is set to true, then method `markdownService.marked` must pe performed.
   * @protected
   * @memberof MarkdownHoodClass
   */
  protected _change = false;
  set change(value: boolean) {
    this.changeDetectorRef.markForCheck();
    this._change = value;
    this.markdownToHtml();
  }
  get change(): boolean {
    return this._change;
  }

  /**
   * @protected
   * @memberof MarkdownHoodClass
   */
  protected templateOptions = { interpolate: /{{([\s\S]+?)}}/g };

  /**
   * Marked property `string`.
   * @type {string}
   * @memberof MarkdownHoodClass
   */
  public stringMarked?: string;

  @Input('callback') public callback: CallbackType | undefined;
  @Input('interpolation') public interpolation: Object | undefined;
  @Input('options') public options: marked.MarkedOptions | undefined;
  @Input('string') public string: string;

  @Output('result') public result: EventEmitter<string> = new EventEmitter();

  @ViewChild('el', { read: ElementRef }) el: ElementRef;

  protected differ: { options?: any } = {};

  /**
   * Creates an instance of MarkdownHoodClass.
   * @param {MarkdownService} markdownService
   * @param {ChangeDetectorRef} changeDetectorRef
   * @param {KeyValueDiffers} keyValueDiffers
   * @memberof MarkdownHoodClass
   */
  constructor(
    public markdownService: MarkdownService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected keyValueDiffers: KeyValueDiffers
  ) {
    // KeyValueDiffers
    this.differ = { options: this.keyValueDiffers.find(this.markdownService.config[0].options).create() };
  }

  /**
   * @protected
   * @param {*} error
   * @memberof MarkdownHoodClass
   */
  protected errorHandler(error: any): void {
    throw new Error(error);
  };

  /**
   * @param {string} string
   * @param {boolean} [change=true]
   * @param {*} resolved
   * @param {*} [error]
   * @memberof MarkdownHoodClass
   */
  public init(string: string, change = true, resolved: any, error?: any): void {
    // Parameter `change` must fulfills the specific boolean condition.
    if (typeof(change) === 'boolean' && typeof(this.change) === 'boolean' && this.change === change) {
      // {arameter `string` must exist.
      if (typeof (string) === 'string' && string) {
        // Interpolate string.
        string = this.interpolate(string);
        // Transform markdown to html property `string` with `promiseHandler()` and `markdownService.marked()` method.
        this.promiseHandler<string>(this.markdownService.marked(string, this.options, this.callback), resolved, error);
      }
    }
  }

  /**
   * Observe changes with specific `prop` parameter. If found, set `this` property `change` to `true`
   * and set also `stringMarked` as undefined to make loading template visible.
   * @protected
   * @param {(string | string[])} prop
   * @param {SimpleChanges} changes
   * @memberof MarkdownHoodClass
   */
  protected onChanges(prop: string | string[], changes: SimpleChanges): void {
    if (changes) {
      _.each(changes, (value: any, key: string) => {
        if (prop instanceof Array) {
          _.each(prop, (propName) => {
            if (key === propName) {
              if (changes[key].currentValue !== changes[key].previousValue) {
                this.stringMarked = undefined;
                this.change = true; // changes have been found, set property `change` to `true`.
              }
            }
          });
        } else {
          switch (key) {
            case prop:
              if (changes[key].currentValue !== changes[key].previousValue) {
                this.stringMarked = undefined;
                this.change = true; // changes have been found, set property `change` to `true`.
              }
            break;
          }
        }
      });
    }
  }

  /**
   * @protected
   * @template T
   * @param {(Promise<T> | undefined)} promise
   * @param {*} resolved
   * @param {*} [error]
   * @memberof MarkdownHoodClass
   */
  protected promiseHandler<T>(promise: Promise<T> | undefined, resolved: any, error?: any): void {
    if (promise instanceof Promise) {
      promise
        .catch(error ? error : this.errorHandler)
        .then(resolved);
    }
  }

  /**
   * @protected
   * @memberof MarkdownHoodClass
   */
  protected storeNgContent(): void {
    if (!this.ngContent) {
      this.ngContent = this.el.nativeElement.innerHTML;
    }
  }

  /**
   * Interpolate property `string` if `interpolation` property object is defined.
   * @private
   * @param {string} string
   * @returns {string}
   * @memberof MarkdownHoodClass
   */
  private interpolate(string: string): string {
    if (this.interpolation && typeof this.interpolation === 'object') {
      string = _.template(string, this.templateOptions)(this.interpolation);
    }
    return string;
  }

  /**
   * @private
   * @memberof MarkdownHoodClass
   */
  private markdownToHtml(): void {
    // Transform `string` property and result assign to `stringMarked` property.
    if (this.string) {
      this.init(this.string, true, (result: string) => {
        if (result) {
          this.result.emit(result);
          if (this.directive === false) {
            this.stringMarked = result;
            this._change = false;
            this.changeDetectorRef.markForCheck();
          } else {
            if (this.el) {
              this.el.nativeElement.innerHTML = result;
            }
          }
        }
      })
    } else {
      // Transform `ngContent` property and result assign to `el` nativeElement.
      if (this.el) {
        this.init(this.ngContent, true, (result: string) => {
          if (result) {
            this.result.emit(result);
            if (this.directive === false) {
              this.el.nativeElement.innerHTML = result;
              this._change = false;
              this.changeDetectorRef.markForCheck();
            } else {
              this.el.nativeElement.innerHTML = result;
              this._change = false;
            }
          }
        })
      }
    }
  }
}
