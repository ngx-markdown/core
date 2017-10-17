// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// internal
import { MarkdownModule } from './../src/ngx-markdown.module';
import { TestComponent } from './test.component';

@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    MarkdownModule.forChild()
  ]
})
export class TestModule { }
