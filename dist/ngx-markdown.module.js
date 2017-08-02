// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// internal
import { MarkdownComponent } from './ngx-markdown.component';
import { MarkdownDirective } from './ngx-markdown.directive';
import { MarkdownService } from './ngx-markdown.service';
var MarkdownModule = (function () {
    function MarkdownModule() {
    }
    MarkdownModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        MarkdownComponent,
                        MarkdownDirective
                    ],
                    imports: [CommonModule],
                    exports: [
                        MarkdownComponent,
                        MarkdownDirective,
                    ],
                    providers: [
                        MarkdownService
                    ],
                },] },
    ];
    /** @nocollapse */
    MarkdownModule.ctorParameters = function () { return []; };
    return MarkdownModule;
}());
export { MarkdownModule };
//# sourceMappingURL=ngx-markdown.module.js.map