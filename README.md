# [XS](https://www.npmjs.com/package/@olian04/xs) _(read like "excess")_
Query directories using a set of partial paths and their levenshtein distances to acutal directories

## Install: 
`npm i @olian04/xs`

## Use:
```js
const xs = require('xs');

const res = xs('2 foo rty'); 
console.log(res);
/*
{
  query: the query string passed to xs,
  distance: the distance between your query and the resulting path, smaller is better and 0 is best,
  path: absolute path,
  folders: array of all folder names at the path,
  files: array of all filenames at the path
}
*/
```

## Note
Since `xs` queries the file tree using levenshtein distances for comparisons, this means that even if there isn't a folder called `XXX` it will pick the closest match and return that one. This is true in all cases but one, if there is no folder at the desired query depth it will return undefined.
