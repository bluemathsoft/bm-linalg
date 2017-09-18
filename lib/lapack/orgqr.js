"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var lapacklite = require("../../ext/lapacklite");
var em = lapacklite.Module;
var common_1 = require("./common");
/**
 * @hidden
 */
function orgqr_internal(mA, m, n, k, mtau, numtype) {
    var fn = numtype === 'f32' ? common_1.sorgqr_wrap : common_1.dorgqr_wrap;
    var lda = Math.max(1, m);
    var pm = common_1.defineEmVariable('i32', m);
    var pn = common_1.defineEmVariable('i32', n);
    var pk = common_1.defineEmVariable('i32', k);
    var plda = common_1.defineEmVariable('i32', lda);
    var plwork = common_1.defineEmVariable('i32', -1);
    var pinfo = common_1.defineEmVariable('i32');
    var _a = common_1.defineEmArrayVariable(numtype, lda * n, mA), pA = _a[0], A = _a[1];
    var ptau = common_1.defineEmArrayVariable(numtype, k, mtau)[0];
    var pwork = common_1.defineEmArrayVariable(numtype, 1)[0];
    // work size query
    fn(pm, pn, pk, pA, plda, ptau, pwork, plwork, pinfo);
    var worksize = em.getValue(pwork, numtype === 'f32' ? 'float' : 'double');
    pwork = common_1.defineEmArrayVariable(numtype, worksize)[0];
    em.setValue(plwork, worksize, 'i32');
    fn(pm, pn, pk, pA, plda, ptau, pwork, plwork, pinfo);
    var info = em.getValue(pinfo, 'i32');
    if (info < 0) {
        throw new Error('Invalid argument (' + (-info) + ')');
    }
    mA.set(A);
}
/**
 * @hidden
 */
function orgqr(mA, m, n, k, mtau) {
    if (mA instanceof Float64Array) {
        orgqr_internal(mA, m, n, k, mtau, 'f64');
    }
    else {
        orgqr_internal(mA, m, n, k, mtau, 'f32');
    }
}
exports.orgqr = orgqr;
