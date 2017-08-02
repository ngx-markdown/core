import { ElementRef, OnInit } from '@angular/core';
import { MarkdownService } from './ngx-markdown.service';
export declare class MarkdownComponent implements OnInit {
    private markdownService;
    callback: Function;
    options: any;
    content: ElementRef;
    constructor(markdownService: MarkdownService);
    ngOnInit(): void;
}
