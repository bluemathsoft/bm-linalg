/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import {TypedArray} from '@bluemath/common'

/**
 * @hidden
 */
export function asum(X:TypedArray) : number {
  let r = 0.0;
  for(let i=0; i<X.length; i++) {
    r += Math.abs(X[i]);
  }
  return r;
}

/**
 * @hidden
 */
export function axpy(X:TypedArray, a:number, Y:TypedArray) : void {
  for(let i=0; i<X.length; i++) {
    Y[i] = a * X[i];
  }
}
