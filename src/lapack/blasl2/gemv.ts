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
  sgemv_wrap, dgemv_wrap 
} from '../common'


function gemv_internal(
  alpha:number,
  mA:TypedArray, m:number,n:number,
  vx:TypedArray,
  vy:TypedArray,
  beta:number,
  ntype:'f32'|'f64') : void
{
  if(vx.length !== n) {
    throw new Error('Length of x doesn\'t match num columns of A');
  }
  if(vy.length !== m) {
    throw new Error('Length of y doesn\'t match num rows of A');
  }

  let ptrans = defineEmVariable('i8','N'.charCodeAt(0));
  let pm = defineEmVariable('i32',m);
  let pn = defineEmVariable('i32',n);

  let plda = defineEmVariable('i32',m);
  let pincx = defineEmVariable('i32',1);
  let pincy = defineEmVariable('i32',1);

  let palpha = defineEmVariable(ntype,alpha);
  let pbeta = defineEmVariable(ntype,beta);

  let [pA] = defineEmArrayVariable(ntype, m*n, mA);
  let [px] = defineEmArrayVariable(ntype,n,vx);
  let [py,y] = defineEmArrayVariable(ntype,m,vy);

  if(ntype === 'f32') {
    sgemv_wrap(ptrans, pm, pn, palpha, pA, plda, px,
      pincx, pbeta, py, pincy);
  } else {
    dgemv_wrap(ptrans, pm, pn, palpha, pA, plda, px,
      pincx, pbeta, py, pincy);
  }
  vy.set(y);
}


/**
 * @hidden
 */
export function gemv(
  alpha:number,
  mA:TypedArray, m:number,n:number,
  vx:TypedArray,
  vy:TypedArray,
  beta:number) : void
{
  if(mA instanceof Float64Array ||
    vx instanceof Float64Array || vy instanceof Float64Array)
  {
    gemv_internal(alpha, mA, m, n, vx, vy, beta, 'f64');
  } else {
    gemv_internal(alpha, mA, m, n, vx, vy, beta, 'f32');
  }
}