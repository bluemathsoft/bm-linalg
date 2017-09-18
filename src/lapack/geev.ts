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
  sgeev_wrap, dgeev_wrap 
} from './common'

/**
 * @hidden
 */
function geev_internal(mA:TypedArray,n:number,
  compleft:boolean,compright:boolean,numtype:'f32'|'f64')
{
  let fn = numtype === 'f32' ? sgeev_wrap : dgeev_wrap;

  let lda = Math.max(1,n);
  let ldvl = compleft ? n : 1;
  let ldvr = compright ? n : 1;

  let jobvl = compleft ? 'V' : 'N';
  let jobvr = compright ? 'V' : 'N';

  let pjobvl = defineEmVariable('i8', jobvl.charCodeAt(0));
  let pjobvr = defineEmVariable('i8', jobvr.charCodeAt(0));

  let pn = defineEmVariable('i32',n);
  let plda = defineEmVariable('i32',lda);
  let pldvl = defineEmVariable('i32',ldvl);
  let pldvr = defineEmVariable('i32',ldvr);
  let plwork = defineEmVariable('i32',-1);
  let pinfo = defineEmVariable('i32');

  let [pA] = defineEmArrayVariable(numtype, n*n, mA);
  let [pVL,VL] = defineEmArrayVariable(numtype, compleft ? ldvl*n:1);
  let [pVR,VR] = defineEmArrayVariable(numtype, compright ? ldvr*n:1);
  let [pwr,WR] = defineEmArrayVariable(numtype, n);
  let [pwi,WI] = defineEmArrayVariable(numtype, n);
  let [pwork] = defineEmArrayVariable(numtype,1);

  // work size query
  fn(pjobvl,pjobvr,pn,pA,plda,pwr,pwi,
    pVL,pldvl,pVR,pldvr,pwork,plwork,pinfo);

  let worksize = em.getValue(pwork, numtype==='f32'?'float':'double');
  pwork = defineEmArrayVariable(numtype, worksize)[0];
  em.setValue(plwork,worksize,'i32');

  fn(pjobvl,pjobvr,pn,pA,plda,pwr,pwi,
    pVL,pldvl,pVR,pldvr,pwork,plwork,pinfo);

  let info = em.getValue(pinfo,'i32');
  if(info < 0) {
    throw new Error('Invalid argument ('+(-info)+')');
  }
  if(info > 0) {
    throw new Error('Failed to compute all eigen values ('+info+')');
  }

  return [WR,WI,VL,VR];
}

/**
 * @hidden
 */
export function geev(A:TypedArray, n:number,
  compleft:boolean, compright:boolean)
{
  if(A instanceof Float64Array) {
    return geev_internal(A,n,compleft,compright,'f64');
  } else {
    return geev_internal(A,n,compleft,compright,'f32');
  }
}