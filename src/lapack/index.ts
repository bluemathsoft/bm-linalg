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
import {dot} from './blasl1/dot'
import {gemv} from './blasl2/gemv'
import {gemm} from './blasl3/gemm'
import {gesv} from './gesv'
import {gesdd} from './gesdd'
import {gelsd} from './gelsd'
import {getrf} from './getrf'
import {geev} from './geev'
import {geqrf} from './geqrf'
import {orgqr} from './orgqr'
import {potrf} from './potrf'

export {
  // BLAS level 1
  dot,

  // BLAS level 2
  gemv,

  // BLAS level 3
  gemm,

  // LAPACK
  gesv,
  geev,
  gesdd,
  gelsd,
  getrf,
  geqrf,
  orgqr,
  potrf
}