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
  dgetrf_wrap, sgetrf_wrap
} from './common'

/**
 * @hidden
 */
function getrf_internal(
  mA:TypedArray,m:number,n:number,mipiv:TypedArray,
  numtype:'f32'|'f64')
{
  let fn = numtype === 'f32' ? sgetrf_wrap : dgetrf_wrap;

  let pm = defineEmVariable('i32',m);
  let pn = defineEmVariable('i32',n);
  let plda = defineEmVariable('i32',Math.max(1,m));

  console.assert(mipiv.length === Math.min(m,n));

  let [pA,A] = defineEmArrayVariable(numtype, m*n, mA);
  let [pipiv,ipiv] = defineEmArrayVariable('i32',Math.min(m,n),mipiv);
  let pinfo = defineEmVariable('i32');

  fn(pm,pn,pA,plda,pipiv,pinfo);

  let info = em.getValue(pinfo,'i32');
  if(info < 0) {
    throw new Error('Invalid argument ('+(-info)+')');
  }
  if(info > 0) {
    // Fortran has 1-based indexing
    console.error(`U(${info-1},${info-1}) is zero`);
  }

  mA.set(A);
  mipiv.set(ipiv);
}

/**
 * @hidden
 */
export function getrf(mA:TypedArray,m:number,n:number,mipiv:TypedArray)
{
  if(mA instanceof Float64Array) {
    getrf_internal(mA,m,n,mipiv,'f64');
  } else {
    getrf_internal(mA,m,n,mipiv,'f32');
  }
}