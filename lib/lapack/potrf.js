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
function potrf_internal(mA, n, numtype) {
    var puplo = common_1.defineEmVariable('i8', 'L'.charCodeAt(0));
    var pn = common_1.defineEmVariable('i32', n);
    var plda = common_1.defineEmVariable('i32', n);
    var pinfo = common_1.defineEmVariable('i32');
    var _a = common_1.defineEmArrayVariable(numtype, n * n, mA), pA = _a[0], A = _a[1];
    var fn = numtype === 'f32' ? common_1.spotrf_wrap : common_1.dpotrf_wrap;
    fn(puplo, pn, pA, plda, pinfo);
    var info = em.getValue(pinfo, 'i32');
    if (info < 0) {
        // Fortran has 1-based indexing
        throw new Error('Invalid argument (' + (-info) + ')');
    }
    if (info > 0) {
        throw new Error('Matrix is not positive definite');
    }
    mA.set(A);
}
/**
 * @hidden
 */
function potrf(mA, n) {
    if (mA instanceof Float64Array) {
        return potrf_internal(mA, n, 'f64');
    }
    else {
        return potrf_internal(mA, n, 'f32');
    }
}
exports.potrf = potrf;
