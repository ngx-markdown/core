// external
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// internal
import { MarkdownComponent } from './ngx-markdown.component';
import { MarkdownDirective } from './ngx-markdown.directive';
import { MarkdownService } from './ngx-markdown.service';

@NgModule({
  declarations: [
    MarkdownComponent,
    MarkdownDirective
  ],
  imports: [ CommonModule ],
  exports: [
    MarkdownComponent,
    MarkdownDirective
  ]
})
export class MarkdownModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MarkdownModule,
      providers: [
        MarkdownService
      ]
    }
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: MarkdownModule
    }
  }
}
