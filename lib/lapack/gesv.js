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
var common_1 = require("./common");
function gesv_internal(mA, mB, n, nrhs, numtype) {
    var pn = common_1.defineEmVariable('i32', n);
    var pnrhs = common_1.defineEmVariable('i32', nrhs);
    var pinfo = common_1.defineEmVariable('i32');
    var plda = common_1.defineEmVariable('i32', n);
    var pldb = common_1.defineEmVariable('i32', n);
    var _a = common_1.defineEmArrayVariable(numtype, n * n, mA), pA = _a[0], A = _a[1];
    var _b = common_1.defineEmArrayVariable(numtype, n * nrhs, mB), pB = _b[0], B = _b[1];
    var _c = common_1.defineEmArrayVariable('i32', n), pIPIV = _c[0], IPIV = _c[1];
    if (numtype === 'f32') {
        common_1.sgesv_wrap(pn, pnrhs, pA, plda, pIPIV, pB, pldb, pinfo);
    }
    else {
        common_1.dgesv_wrap(pn, pnrhs, pA, plda, pIPIV, pB, pldb, pinfo);
    }
    mA.set(A);
    mB.set(B);
    return IPIV;
}
/**
 * @hidden
 */
function gesv(mA, mB, n, nrhs) {
    if (mA instanceof Float64Array || mB instanceof Float64Array) {
        return gesv_internal(mA, mB, n, nrhs, 'f64');
    }
    else {
        return gesv_internal(mA, mB, n, nrhs, 'f32');
    }
}
exports.gesv = gesv;
