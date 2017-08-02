// external
import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
// internal
import { MarkdownService } from './ngx-markdown.service';
import template from './ngx-markdown.component.html';
var MarkdownComponent = (function () {
    function MarkdownComponent(markdownService) {
        this.markdownService = markdownService;
    }
    MarkdownComponent.prototype.ngOnInit = function () {
        this.content.nativeElement.innerHTML = this.markdownService.marked(this.content, this.options, this.callback);
    };
    MarkdownComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'ngx-markdown',
                    template: template
                },] },
    ];
    /** @nocollapse */
    MarkdownComponent.ctorParameters = function () { return [
        { type: MarkdownService, },
    ]; };
    MarkdownComponent.propDecorators = {
        'callback': [{ type: Input },],
        'options': [{ type: Input },],
        'content': [{ type: ViewChild, args: ['content', { read: ElementRef },] },],
    };
    return MarkdownComponent;
}());
export { MarkdownComponent };
//# sourceMappingURL=ngx-markdown.component.js.map