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
/**
 * @hidden
 */
exports.SIZE_CHAR = 1;
/**
 * @hidden
 */
exports.SIZE_INT = 4;
/**
 * @hidden
 */
exports.SIZE_DOUBLE = 8;
/**
 * @hidden
 */
exports.SIZE_SINGLE = 4;
/**
 * @hidden
 */
exports.spotrf_wrap = em.cwrap('spotrf_', null, ['number', 'number', 'number', 'number', 'number']);
/**
 * @hidden
 */
exports.dpotrf_wrap = em.cwrap('dpotrf_', null, ['number', 'number', 'number', 'number', 'number']);
/**
 * @hidden
 */
exports.sgesv_wrap = em.cwrap('sgesv_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.dgesv_wrap = em.cwrap('dgesv_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.sgemm_wrap = em.cwrap('sgemm_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.dgemm_wrap = em.cwrap('dgemm_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.dgemv_wrap = em.cwrap('dgemv_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.sgemv_wrap = em.cwrap('sgemv_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.sdot_wrap = em.cwrap('sdot_', null, ['number', 'number', 'number', 'number', 'number']);
/**
 * @hidden
 */
exports.ddot_wrap = em.cwrap('ddot_', null, ['number', 'number', 'number', 'number', 'number']);
/**
 * @hidden
 */
exports.dgesdd_wrap = em.cwrap('dgesdd_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.sgesdd_wrap = em.cwrap('sgesdd_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.sgeqrf_wrap = em.cwrap('sgeqrf_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.dgeqrf_wrap = em.cwrap('dgeqrf_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.sorgqr_wrap = em.cwrap('sorgqr_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.dorgqr_wrap = em.cwrap('dorgqr_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.dgelsd_wrap = em.cwrap('dgelsd_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.sgetrf_wrap = em.cwrap('sgetrf_', null, [
    'number', 'number', 'number', 'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.dgetrf_wrap = em.cwrap('dgetrf_', null, [
    'number', 'number', 'number', 'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.sgeev_wrap = em.cwrap('sgeev_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number'
]);
/**
 * @hidden
 */
exports.dgeev_wrap = em.cwrap('dgeev_', null, [
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number'
]);
/**
 * @hidden
 */
function defineEmVariable(type, init) {
    var p;
    switch (type) {
        case 'i32':
            p = em._malloc(exports.SIZE_INT);
            if (init) {
                em.setValue(p, init, type);
            }
            break;
        case 'i8':
            p = em._malloc(exports.SIZE_CHAR);
            if (init) {
                em.setValue(p, init, type);
            }
            break;
        case 'f32':
            p = em._malloc(exports.SIZE_SINGLE);
            if (init) {
                em.setValue(p, init, 'float');
            }
            break;
        case 'f64':
            p = em._malloc(exports.SIZE_DOUBLE);
            if (init) {
                em.setValue(p, init, 'double');
            }
            break;
        default:
            throw new Error('Unhandled variable type');
    }
    return p;
}
exports.defineEmVariable = defineEmVariable;
/**
 * @hidden
 */
function defineEmArrayVariable(type, len, init) {
    var p, arr;
    switch (type) {
        case 'i8':
            p = em._malloc(len * exports.SIZE_CHAR);
            arr = new Int8Array(em.HEAP8.buffer, p, len);
            if (init) {
                arr.set(init);
            }
            return [p, arr];
        case 'i32':
            p = em._malloc(len * exports.SIZE_INT);
            arr = new Int32Array(em.HEAP32.buffer, p, len);
            if (init) {
                arr.set(init);
            }
            return [p, arr];
        case 'f32':
            p = em._malloc(len * exports.SIZE_SINGLE);
            arr = new Float32Array(em.HEAPF32.buffer, p, len);
            if (init) {
                arr.set(init);
            }
            return [p, arr];
        case 'f64':
            p = em._malloc(len * exports.SIZE_DOUBLE);
            arr = new Float64Array(em.HEAPF64.buffer, p, len);
            if (init) {
                arr.set(init);
            }
            return [p, arr];
        default:
            throw new Error('Unhandled type');
    }
}
exports.defineEmArrayVariable = defineEmArrayVariable;
