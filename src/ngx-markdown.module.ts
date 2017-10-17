// external
import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

// internal
import { MarkdownComponent } from './ngx-markdown.component';
import { MarkdownDirective } from './ngx-markdown.directive';
import { MarkedConfigClass, MarkdownService } from './ngx-markdown.service';

const NGXMARKDOWN_DECLARATIONS_EXPORTS = [ MarkdownComponent, MarkdownDirective ];

/**
 * @export
 * @class MarkdownModule
 */
@NgModule({
  declarations: NGXMARKDOWN_DECLARATIONS_EXPORTS,
  exports: NGXMARKDOWN_DECLARATIONS_EXPORTS,
  imports: [ CommonModule ]
})
export class MarkdownModule {
  /**
   * @static
   * @param {MarkedConfigClass} [config]
   * @returns {ModuleWithProviders}
   * @memberof MarkdownModule
   */
  static forRoot(@Optional() @Inject(MarkedConfigClass) config?: MarkedConfigClass ): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
      providers: [
        MarkdownService,
        { provide: MarkedConfigClass, useValue: config, multi: true }
      ]
    }
  }
  /**
   * @static
   * @returns {ModuleWithProviders}
   * @memberof MarkdownModule
   */
  static forChild(): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
      providers: [
        MarkdownService,
        { provide: MarkedConfigClass, useClass: MarkedConfigClass, multi: true }
      ]
    }
  }
}
