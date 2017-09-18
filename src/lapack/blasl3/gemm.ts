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
  sgemm_wrap, dgemm_wrap 
} from '../common'

function gemm_internal(
  mA:TypedArray, mB:TypedArray, mC:TypedArray,
  m:number, n:number, k:number,
  alpha:number, beta:number, numtype:'f32'|'f64')
{
  let ptransa = defineEmVariable('i8', 'N'.charCodeAt(0));
  let ptransb = defineEmVariable('i8', 'N'.charCodeAt(0));

  let pm = defineEmVariable('i32',m);
  let pn = defineEmVariable('i32',n);
  let pk = defineEmVariable('i32',k);

  let palpha = defineEmVariable(numtype, alpha);
  let pbeta = defineEmVariable(numtype, beta);

  let [pA] = defineEmArrayVariable(numtype, m*k, mA);
  let [pB] = defineEmArrayVariable(numtype, k*n, mB);
  let [pC,C] = defineEmArrayVariable(numtype, m*n, mC);

  let plda = defineEmVariable('i32', m);
  let pldb = defineEmVariable('i32', k);
  let pldc = defineEmVariable('i32', m);

  if(numtype === 'f32') {
    sgemm_wrap(ptransa, ptransb, pm, pn, pk,
      palpha, pA, plda, pB, pldb, pbeta, pC, pldc);
  } else {
    dgemm_wrap(ptransa, ptransb, pm, pn, pk,
      palpha, pA, plda, pB, pldb, pbeta, pC, pldc);
  }
  mC.set(C);
}

/**
 * @hidden
 */
export function gemm(
  mA:TypedArray, mB:TypedArray, mC:TypedArray,
  m:number, n:number, k:number,
  alpha:number, beta:number)
{
  if(mA instanceof Float64Array ||
    mB instanceof Float64Array ||
    mC instanceof Float64Array)
  {
    gemm_internal(mA,mB,mC,m,n,k,alpha,beta,'f64');
  } else {
    gemm_internal(mA,mB,mC,m,n,k,alpha,beta,'f32');
  }
}