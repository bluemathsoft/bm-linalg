
## @bluemath/linalg

Linear Algebra submodule of BlueMath library

[![NPM package](https://img.shields.io/npm/v/@bluemath/linalg.svg)](https://www.npmjs.com/package/@bluemath/linalg)
&#8226;
[Docs](http://www.bluemathsoftware.com/bm/linalg/docs/index.html)
&#8226;
[Tests](http://www.bluemathsoftware.com/bm/linalg/test/index.html)
&#8226;
[Interactive Shell](http://www.bluemathsoftware.com/shell/index.html)

* Implemented on top of LAPACK library, compiled to Javascript using Emscripten.
* Solving of linear equation systems (LU decomposition, Least Square)
* Matrix decomposition operations (SVD, Cholesky, QR)
* Standard matrix properties (Rank, Determinant, Inverse)

Usage
===

    npm install @bluemath/linalg
    
```typescript
import {det} from '@bluemath/linalg'
import {arr} from '@bluemath/common'

let A = arr([
    [3,4,5],
    [0,3,4],
    [1,3,5]
]);
console.log('Determinant',det(A));
```

Alternatively,

    npm install bluemath
    
```typescript
import {arr,linalg} from 'bluemath'

let A = arr([
    [3,4,5],
    [0,3,4],
    [1,3,5]
]);
console.log('Determinant',linalg.det(A));
```
