// external
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  DoCheck,
  ElementRef,
  Input,
  KeyValueChangeRecord,
  KeyValueDiffers,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import * as _ from 'lodash-es';

// internal
import { MarkdownHoodClass } from './ngx-markdown.class';
import { MarkdownService } from './ngx-markdown.service';

function instanceOf<T>(object: any): object is T {
  return <T>object !== undefined;
}

/**
 * @export
 * @class MarkdownComponent
 * @extends {MarkdownHoodClass}
 * @implements {AfterViewChecked}
 * @implements {AfterViewInit}
 * @implements {OnChanges}
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'ngx-markdown',
  templateUrl: './ngx-markdown.component.html'
})
export
  class MarkdownComponent
  extends MarkdownHoodClass
  implements
  AfterViewInit,
  DoCheck,
  OnChanges {

  /**
   * Creates an instance of MarkdownComponent.
   * @param {MarkdownService} markdownService
   * @param {ChangeDetectorRef} changeDetectorRef
   * @param {KeyValueDiffers} keyValueDiffers
   * @memberof MarkdownComponent
   */
  constructor(
    public markdownService: MarkdownService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected keyValueDiffers: KeyValueDiffers
  ) {
    super(markdownService, changeDetectorRef, keyValueDiffers);
  }

  /**
   * First init performed on `ng-content` property.
   * @memberof MarkdownComponent
   */
  ngAfterViewInit(): void {
    if (!this.string) {
      // Store `ng-content` to work on it later.
      this.storeNgContent();
      // Perform init on stored `ngContent`.
      this.change = true;
    }
  }

  /**
   * @memberof MarkdownComponent
   */
  ngDoCheck(): void {
    let changes = null;
    changes = this.differ.options.diff(this.options);
    if (changes) {
      // Detect changes in `options` property.
      changes.forEachChangedItem((record: KeyValueChangeRecord<string, any>) => {
        if (this.options) {
          this.options[record.key] = record.currentValue;
          this.stringMarked = undefined;
          this.change = true;
        }
      });
    }
  }

  /**
   * Detect changes on properties `string` and `callback`.
   * @param {SimpleChanges} changes
   * @memberof MarkdownComponent
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges(['callback', 'string'], changes);
  }
}
