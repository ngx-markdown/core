import { ElementRef, OnInit } from '@angular/core';
import { MarkdownService } from './ngx-markdown.service';
export declare class MarkdownDirective implements OnInit {
    private el;
    private markdownService;
    options: any;
    callback: Function;
    constructor(el: ElementRef, markdownService: MarkdownService);
    ngOnInit(): void;
}
