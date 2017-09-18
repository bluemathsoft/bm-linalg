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
/**
 * @hidden
 */
function asum(X) {
    var r = 0.0;
    for (var i = 0; i < X.length; i++) {
        r += Math.abs(X[i]);
    }
    return r;
}
exports.asum = asum;
/**
 * @hidden
 */
function axpy(X, a, Y) {
    for (var i = 0; i < X.length; i++) {
        Y[i] = a * X[i];
    }
}
exports.axpy = axpy;
