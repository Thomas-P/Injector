# Injector

## Introduction

Injector is a quite simple module, that allowes you to inject predefinied values into a function.

### Current State

Today, the injectors function names should be fixed. They will only change in major releases. 

## Getting started


### Installation

Clone the module from git by:
    
    git clone https://github.com/Thomas-P/Injector.git

Add the injector.js to your HTML page
```html
 <script src="injector.js" type="text/javascript"></script>
```

or to your nodejs project
   
```javascript    
var Injector = require('Injector');
```

### Usage

Using Injector is quite simple. Create an object from Injector, add or set the dependencies and inject them into a function

#### Example

```javascript
var injector = new Injector();

// add dependencies by set them
injector.set({
    d1: 1,
    d2: 2,
});

// or add them

injector.add('d3', 3);

// or add them as an object

injector.addAll({
    d4: 4,
    d5: 5,
});


// call the injecton

injector.inject(function(d1, d2, d3, d4, d5){
    console.log(arguments); // prints: [1, 2, 3, 4, 5]
    return 20;
});    // returns 20

// if you want to minimize your code, use this

injector.inject(['d1','d2','d3','d4','d5'], function(d1, d2, d3, d4, d5){
    console.log(arguments); // prints: [1, 2, 3, 4, 5]
    return 'test';
});    // returns 'test'
```

## License (MIT License)
Copyright (c) 2014 Thomas-P

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.