// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import getFeed from '../../utils/feed'

let ATOM = ''

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler() {
  if (ATOM == '') {
    ATOM = (await getFeed()).atom1()
  }
  return new Response(ATOM, { status: 200 })
}
