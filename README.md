# xs
Like `cd` but fuzzy

Exposes 2 things:
* The `xs` command it self
```shell
~/ $ ls 
folder1         folder2           folder3   folder4
thisisafolder   thisisalsoafolder
~/ $ xs 2 foo rty
~/folder2/foobar/qwerty/ $ ls
file1   file2   fil3  folder13
```
* A js module for using xs inside other projects
```js
const xs = require('xs');

const resultObj = xs('2 foo rty'); 
//leving the query string empty will return the current folder
// * means match any ONE folder, ** means match any number of folders

/* 
  resultObj = {
    queryString: '2 foo rty', // The input string
    queryScore: 0.97, // How sure `xs` is that it found the right path 0.00-1.00
    path: '/folder2/foobar/qwerty/', // The actuall path
    files: [ // The files in the folder
      'file1',
      'file2',
      'file3'
    ],
    folders: [ // The folders in the folder
      'folder13'
    ]
  }
*/
```

## Problems & Solutions
`xs` uses fussy search, to calculate the distance between your query and the available folders, in order to figre out what folder you are refering to, this means that even if there isnt a folder called `XXX` it will pick the closest match and open that one.
