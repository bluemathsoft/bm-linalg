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
import * as lapacklite from '../../ext/lapacklite'
let em = lapacklite.Module;

import {
  defineEmVariable, defineEmArrayVariable,
  spotrf_wrap, dpotrf_wrap
} from './common'

/**
 * @hidden
 */
function potrf_internal(
  mA:TypedArray, n:number, numtype:'f32'|'f64')
{
  let puplo = defineEmVariable('i8', 'L'.charCodeAt(0));
  let pn = defineEmVariable('i32', n);
  let plda = defineEmVariable('i32',n);
  let pinfo = defineEmVariable('i32');
  let [pA,A] = defineEmArrayVariable(numtype, n*n, mA);

  let fn = numtype === 'f32' ? spotrf_wrap : dpotrf_wrap;
  fn(puplo, pn, pA, plda, pinfo);

  let info = em.getValue(pinfo,'i32');
  if(info < 0) {
    // Fortran has 1-based indexing
    throw new Error('Invalid argument ('+(-info)+')');
  }
  if(info > 0) {
    throw new Error('Matrix is not positive definite');
  }
  mA.set(A);
}

/**
 * @hidden
 */
export function potrf(mA:TypedArray, n:number) {
  if(mA instanceof Float64Array) {
    return potrf_internal(mA,n,'f64');
  } else {
    return potrf_internal(mA,n,'f32');
  }
}