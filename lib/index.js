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
var ops_1 = require("./ops");
exports.matmul = ops_1.matmul;
exports.norm = ops_1.norm;
exports.solve = ops_1.solve;
exports.cholesky = ops_1.cholesky;
exports.inner = ops_1.inner;
exports.outer = ops_1.outer;
exports.svd = ops_1.svd;
exports.rank = ops_1.rank;
exports.lstsq = ops_1.lstsq;
exports.lu_custom = ops_1.lu_custom;
exports.slogdet = ops_1.slogdet;
exports.det = ops_1.det;
exports.inv = ops_1.inv;
exports.qr = ops_1.qr;
exports.triu = ops_1.triu;
exports.tril = ops_1.tril;
exports.eig = ops_1.eig;
var lapack = require("./lapack");
exports.lapack = lapack;
