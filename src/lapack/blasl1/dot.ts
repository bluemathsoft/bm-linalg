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
  defineEmVariable, defineEmArrayVariable,
  sdot_wrap, ddot_wrap 
} from '../common'

/**
 * @hidden
 */
function dot_internal(vx:TypedArray, vy:TypedArray, ntype:'f32'|'f64')
{
  let n = vx.length;
  let pn = defineEmVariable('i32', n);
  let pincx = defineEmVariable('i32',1);
  let pincy = defineEmVariable('i32',1);

  let [px] = defineEmArrayVariable(ntype,n,vx);
  let [py] = defineEmArrayVariable(ntype,n,vy);

  if(ntype === 'f32') {
    return sdot_wrap(pn, px, pincx, py, pincy);
  } else {
    return ddot_wrap(pn, px, pincx, py, pincy);
  }
}

/**
 * @hidden
 */
export function dot(vx:TypedArray, vy:TypedArray) {
  if(vx.length !== vy.length) {
    throw new Error('Input vectors of different size');
  }
  if(vx instanceof Float64Array || vy instanceof Float64Array) {
    return dot_internal(vx,vy,'f64');
  } else {
    return dot_internal(vx,vy,'f32');
  }
}