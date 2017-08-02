/// <reference types="marked" />
import { ElementRef } from '@angular/core';
export declare class MarkdownService {
    callback: Function;
    options: {
        renderer: MarkedRenderer;
        gfm: boolean;
        tables: boolean;
        breaks: boolean;
        pedantic: boolean;
        sanitize: boolean;
        smartLists: boolean;
        smartypants: boolean;
    };
    constructor();
    marked(content: ElementRef, ...args: any[]): string;
}
