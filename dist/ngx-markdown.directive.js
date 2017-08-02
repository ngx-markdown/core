// external
import { Directive, ElementRef, Input } from '@angular/core';
// internal
import { MarkdownService } from './ngx-markdown.service';
var MarkdownDirective = (function () {
    function MarkdownDirective(el, markdownService) {
        this.el = el;
        this.markdownService = markdownService;
    }
    MarkdownDirective.prototype.ngOnInit = function () {
        this.el.nativeElement.innerHTML = this.markdownService.marked(this.el, this.options, this.callback);
    };
    MarkdownDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngx-markdown]',
                },] },
    ];
    /** @nocollapse */
    MarkdownDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: MarkdownService, },
    ]; };
    MarkdownDirective.propDecorators = {
        'options': [{ type: Input },],
        'callback': [{ type: Input },],
    };
    return MarkdownDirective;
}());
export { MarkdownDirective };
//# sourceMappingURL=ngx-markdown.directive.js.map