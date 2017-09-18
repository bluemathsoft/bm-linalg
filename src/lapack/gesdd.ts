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
  sgesdd_wrap, dgesdd_wrap 
} from './common'

/**
 * @hidden
 */
function gesdd_internal(
  mA:TypedArray, m:number, n:number,
  mU:TypedArray, mS:TypedArray, mVT:TypedArray,
  job:'A'|'N'|'S', numtype:'f32'|'f64')
{
  let fn = (numtype === 'f32') ? sgesdd_wrap : dgesdd_wrap;

  let pjobz = defineEmVariable('i8', job.charCodeAt(0));
  let pm = defineEmVariable('i32',m);
  let pn = defineEmVariable('i32',n);
  let plda = defineEmVariable('i32',Math.max(m,1));
  let pldu = defineEmVariable('i32',Math.max(m,1));
  let pldvt = defineEmVariable('i32',n);
  let plwork = defineEmVariable('i32',-1);

  let [pA,A] = defineEmArrayVariable(numtype, m*n, mA);
  let [pS,S] = defineEmArrayVariable(numtype, Math.min(m,n)); 
  let [pU,U] = defineEmArrayVariable(numtype, m*n);
  let [pVT,VT] = defineEmArrayVariable(numtype, n*n);
  let [piwork] = defineEmArrayVariable('i32', 8*Math.min(m,n));
  let [pwork] = defineEmArrayVariable(numtype,1);
  let pinfo = defineEmVariable('i32');

  // work size query
  fn(pjobz, pm, pn, pA, plda, pS, pU, pldu, pVT, pldvt,
    pwork, plwork, piwork, pinfo);

  let worksize = em.getValue(pwork, numtype==='f32'?'float':'double');
  pwork = defineEmArrayVariable(numtype, worksize)[0];
  em.setValue(plwork,worksize,'i32');

  fn(pjobz, pm, pn, pA, plda, pS, pU, pldu, pVT, pldvt,
    pwork, plwork, piwork, pinfo);

  let info = em.getValue(pinfo,'i32');
  if(info < 0) {
    throw new Error('Invalid argument ('+(-info)+')');
  }
  if(info > 0) {
    throw new Error('DBDSDC did not converge ('+info+')');
  }

  mA.set(A);
  mS.set(S);
  if(job !== 'N') {
    mU.set(U);
    mVT.set(VT);
  }
}

/**
 * @hidden
 */
export function gesdd(
  mA:TypedArray, m:number, n:number,
  mU:TypedArray, mS:TypedArray, mVT:TypedArray,
  job:'A'|'N'|'S'
)
{
  if(mA instanceof Float64Array ||
    mU instanceof Float64Array ||
    mVT instanceof Float64Array)
  {
    return gesdd_internal(mA,m,n,mU,mS,mVT,job,'f64');
  } else {
    return gesdd_internal(mA,m,n,mU,mS,mVT,job,'f32');
  }
}