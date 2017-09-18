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
var common_1 = require("../common");
/**
 * @hidden
 */
function dot_internal(vx, vy, ntype) {
    var n = vx.length;
    var pn = common_1.defineEmVariable('i32', n);
    var pincx = common_1.defineEmVariable('i32', 1);
    var pincy = common_1.defineEmVariable('i32', 1);
    var px = common_1.defineEmArrayVariable(ntype, n, vx)[0];
    var py = common_1.defineEmArrayVariable(ntype, n, vy)[0];
    if (ntype === 'f32') {
        return common_1.sdot_wrap(pn, px, pincx, py, pincy);
    }
    else {
        return common_1.ddot_wrap(pn, px, pincx, py, pincy);
    }
}
/**
 * @hidden
 */
function dot(vx, vy) {
    if (vx.length !== vy.length) {
        throw new Error('Input vectors of different size');
    }
    if (vx instanceof Float64Array || vy instanceof Float64Array) {
        return dot_internal(vx, vy, 'f64');
    }
    else {
        return dot_internal(vx, vy, 'f32');
    }
}
exports.dot = dot;
