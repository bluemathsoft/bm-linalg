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

import {
  matmul, norm, solve, cholesky, inner, outer, svd, rank, lstsq, lu_custom,
  slogdet, det, inv, qr, triu, tril, eig
} from './ops'
import * as lapack from './lapack'

export {
  inner,
  outer,
  matmul,
  triu,
  tril,

  cholesky,

  svd,
  norm,
  solve,
  rank,
  lstsq,
  lu_custom,
  slogdet,
  det,
  inv,
  qr,
  eig,

  lapack
}
