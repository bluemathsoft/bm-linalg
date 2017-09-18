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

import {
  defineEmArrayVariable, defineEmVariable,
  sgesv_wrap, dgesv_wrap 
} from './common'

function gesv_internal(
  mA:TypedArray,
  mB:TypedArray,
  n:number,
  nrhs:number,
  numtype:'f32'|'f64'
)
{
  let pn = defineEmVariable('i32',n);
  let pnrhs = defineEmVariable('i32', nrhs);
  let pinfo = defineEmVariable('i32');
  let plda = defineEmVariable('i32',n);
  let pldb = defineEmVariable('i32',n);

  let [pA,A] = defineEmArrayVariable(numtype, n*n, mA);
  let [pB,B] = defineEmArrayVariable(numtype, n*nrhs, mB);
  let [pIPIV,IPIV] = defineEmArrayVariable('i32', n);

  if(numtype === 'f32') {
    sgesv_wrap(pn, pnrhs, pA, plda, pIPIV, pB, pldb, pinfo);
  } else {
    dgesv_wrap(pn, pnrhs, pA, plda, pIPIV, pB, pldb, pinfo);
  }
  mA.set(A);
  mB.set(B);
  return IPIV;
}

/**
 * @hidden
 */
export function gesv(
  mA:TypedArray,
  mB:TypedArray,
  n:number,
  nrhs:number)
{
  if(mA instanceof Float64Array || mB instanceof Float64Array) {
    return gesv_internal(mA,mB,n,nrhs,'f64');
  } else {
    return gesv_internal(mA,mB,n,nrhs,'f32');
  }
}