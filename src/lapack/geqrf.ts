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
  sgeqrf_wrap, dgeqrf_wrap
} from './common'

/**
 * @hidden 
 */
function geqrf_internal(
  mA:TypedArray, m:number, n:number,
  mTau:TypedArray, numtype:'f32'|'f64')
{
  let fn = numtype === 'f32' ? sgeqrf_wrap : dgeqrf_wrap;

  let lda = Math.max(1,m);

  let pm = defineEmVariable('i32',m);
  let pn = defineEmVariable('i32',n);
  let plda = defineEmVariable('i32',lda);
  let plwork = defineEmVariable('i32',-1);
  let pinfo = defineEmVariable('i32');

  let [pA,A] = defineEmArrayVariable(numtype,m*n,mA);
  let [ptau,tau] = defineEmArrayVariable(numtype,Math.min(m,n));
  let [pwork] = defineEmArrayVariable(numtype,1);

  // work size query
  fn(pm,pn,pA,plda,ptau,pwork,plwork,pinfo);

  let worksize = em.getValue(pwork, numtype==='f32'?'float':'double');
  pwork = defineEmArrayVariable(numtype, worksize)[0];
  em.setValue(plwork,worksize,'i32');

  fn(pm,pn,pA,plda,ptau,pwork,plwork,pinfo);

  let info = em.getValue(pinfo,'i32');
  if(info < 0) {
    throw new Error('Invalid argument ('+(-info)+')');
  }

  mA.set(A);
  mTau.set(tau);
}

/**
 * @hidden 
 */
export function geqrf(
  mA:TypedArray,m:number,n:number,mTau:TypedArray)
{
  if(mA instanceof Float64Array) {
    geqrf_internal(mA, m, n, mTau, 'f64');
  } else {
    geqrf_internal(mA, m, n, mTau, 'f32');
  }
}