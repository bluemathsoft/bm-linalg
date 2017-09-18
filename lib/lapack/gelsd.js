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
function gelsd_internal(mA, m, n, nrhs, rcond, mB, mS) {
    var fn = common_1.dgelsd_wrap;
    var lda = Math.max(1, m);
    var ldb = Math.max(1, m, n);
    var nlvl = Math.max(0, Math.round(Math.log(Math.min(m, n) / 2.)) + 1);
    var iworksize = 3 * Math.min(m, n) * nlvl + 11 * Math.min(m, n);
    var pm = common_1.defineEmVariable('i32', m);
    var pn = common_1.defineEmVariable('i32', n);
    var pnrhs = common_1.defineEmVariable('i32', nrhs);
    var plda = common_1.defineEmVariable('i32', lda);
    var pldb = common_1.defineEmVariable('i32', ldb);
    var prank = common_1.defineEmVariable('i32');
    var plwork = common_1.defineEmVariable('i32', -1);
    var prcond = common_1.defineEmVariable('f64', rcond);
    console.assert(mB.length === ldb * nrhs);
    var _a = common_1.defineEmArrayVariable('f64', m * n, mA), pA = _a[0], A = _a[1];
    var _b = common_1.defineEmArrayVariable('f64', ldb * nrhs, mB), pB = _b[0], B = _b[1];
    var _c = common_1.defineEmArrayVariable('f64', Math.min(m, n)), pS = _c[0], S = _c[1];
    var piwork = common_1.defineEmArrayVariable('i32', iworksize)[0];
    var pwork = common_1.defineEmArrayVariable('f64', 1)[0];
    var pinfo = common_1.defineEmVariable('i32');
    // work size query
    fn(pm, pn, pnrhs, pA, plda, pB, pldb, pS, prcond, prank, pwork, plwork, piwork, pinfo);
    var worksize = em.getValue(pwork, 'double');
    pwork = common_1.defineEmArrayVariable('f64', worksize)[0];
    em.setValue(plwork, worksize, 'i32');
    fn(pm, pn, pnrhs, pA, plda, pB, pldb, pS, prcond, prank, pwork, plwork, piwork, pinfo);
    var info = em.getValue(pinfo, 'i32');
    if (info < 0) {
        throw new Error('Invalid argument (' + (-info) + ')');
    }
    if (info > 0) {
        throw new Error('SVD algorithm failed to converge (' + info + ')');
    }
    var rank = em.getValue(prank, 'i32');
    mA.set(A);
    mB.set(B);
    mS.set(S);
    return rank;
}
/**
 * @hidden
 */
function gelsd(mA, m, n, nrhs, rcond, mB, mS) {
    return gelsd_internal(mA, m, n, nrhs, rcond, mB, mS);
}
exports.gelsd = gelsd;
