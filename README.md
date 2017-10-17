
# @ngx-markdown/core

Angular 2+ markdown to html module using [marked](https://github.com/chjj/marked) a markdown parser and compiler.

----

* [Demonstration](#demonstration)
* [Installation](#installation)
* [Usage](#usage)
* [Style guide](#style-guide)
* Git
  * [Commit](#commit)
  * [Versioning](#versioning)
* [License](#license)
* [Donate](#donate)

----

## Demonstration

Get simple example demonstration usage from github [repository](https://github.com/ngx-markdown/demo) by opening your command line and do the following:

```bash
git clone https://github.com/ngx-markdown/demo.git
npm install && npm start
```

Open http://localhost:4200/ in your browser.



## Installation

To install, run:

```bash
npm install --save @ngx-markdown/core
```

## Usage

1. In file `./example.module.ts`
```typescript
// external
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// @ngx
import { MarkdownModule } from '@ngx-markdown/core';

// internal 
import { ExampleComponent } from './example.component';

@NgModule({
  imports: [
    // external
    CommonModule,

    // internal
    MarkdownModule.forRoot({
      // this options are defaults when use forChild().
      options: {
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      },
      // template while loading
      loadingTemplate: `<div> Loading ... </div>`
    })    
  ],
  declarations: [ ]
})
export class ExampleModule { }
```

2. In file `./example.component.ts`

```typescript
// external
import { Component, OnInit } from '@angular/core';

// internal

@Component({
  selector: 'example-component',
  templateUrl: './example.component.html'
})
export class ExampleComponent implements OnInit {
  options = {};
  callback = () => { };
  constructor() { }

  ngOnInit() { }
}

```

3. In file `./example.component.html`
```html
<div ngx-markdown [options]="options" [callback]="callback">
  **my bold**
</div>

<ngx-markdown [options]="options" [callback]="callback">
  **my bold**
  [link](http://example.com)
</ngx-markdown>

```

## Style guide

[Angular style guide](https://angular.io/docs/ts/latest/guide/style-guide.html)   

## GIT

### Commit
- [AngularJS Git Commit Message Conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)
- [Karma git commit](http://karma-runner.github.io/0.10/dev/git-commit-msg.html)

### Versioning
Semantic Versioning 2.0.0 http://semver.org/

**Given a version number MAJOR.MINOR.PATCH, increment the:**   
MAJOR version when you make incompatible API changes,  
MINOR version when you add functionality in a backwards-compatible manner, and  
PATCH version when you make backwards-compatible bug fixes.  
Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**   
How should I deal with revisions in the 0.y.z initial development phase?  
>The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

>If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © ngx-markdown

## Donate
[Click to donate](https://donorbox.org/help-creating-open-source-software)
