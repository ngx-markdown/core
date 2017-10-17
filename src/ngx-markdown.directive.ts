// external
import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  DoCheck,
  ElementRef,
  Input,
  KeyValueDiffers,
  KeyValueChangeRecord,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

// internal
import { MarkdownHoodClass } from './ngx-markdown.class';
import { MarkdownService } from './ngx-markdown.service';
import { CallbackType } from './ngx-markdown.type';

@Directive({
  selector: '[ngxmarkdown]'
})
export class MarkdownDirective
  extends MarkdownHoodClass
  implements
  AfterViewInit,
  DoCheck,
  OnChanges {

  @Input('ngxmarkdown') public set ngxmarkdown(value: string) {
    this.string = value;
  }
  public get value(): string {
    return this.string;
  }

  public string: string;

  /**
   * Creates an instance of MarkdownDirective.
   * @param {ElementRef} el
   * @param {MarkdownService} markdownService
   * @param {ChangeDetectorRef} changeDetectorRef
   * @param {KeyValueDiffers} keyValueDiffers
   * @memberof MarkdownDirective
   */
  constructor(
    public el: ElementRef,
    public markdownService: MarkdownService,
    public changeDetectorRef: ChangeDetectorRef,
    protected keyValueDiffers: KeyValueDiffers
  ) {
    super(markdownService, changeDetectorRef, keyValueDiffers);
    this.directive = true;
  }

  /**
   * @memberof MarkdownDirective
   */
  ngAfterViewInit() {
    if (!this.string) {
      // Store `ng-content` to work on it later.
      this.storeNgContent();
      // Perform init on stored `ngContent`.
      this.change = true;
    }
  }

  /**
   * @memberof MarkdownDirective
   */
  ngDoCheck(): void {
    let changes = null;
    changes = this.differ.options.diff(this.options);
    if (changes) {
      // Detect changes in `options` property.
      changes.forEachChangedItem((record: KeyValueChangeRecord<string, any>) => {
        if (this.options) {
          this.options[record.key] = record.currentValue;
          this.change = true;
        }
      });
    }
  }

  /**
   * @param {SimpleChanges} changes
   * @memberof MarkdownDirective
   */
  ngOnChanges(changes: SimpleChanges) {
    this.onChanges(['callback', 'ngxmarkdown'], changes);
  }
}
