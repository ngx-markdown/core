// external
import { Injectable } from '@angular/core';
import * as marked from 'marked';
var MarkdownService = (function () {
    function MarkdownService() {
        this.options = {
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        };
    }
    MarkdownService.prototype.marked = function (content) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return marked.setOptions((args[0]) ? args[0] : this.options)(content.nativeElement.innerHTML, args[1]);
    };
    MarkdownService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MarkdownService.ctorParameters = function () { return []; };
    return MarkdownService;
}());
export { MarkdownService };
//# sourceMappingURL=ngx-markdown.service.js.map