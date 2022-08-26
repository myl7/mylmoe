// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import getFeed from '../../utils/feed'

let RSS = ''

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler() {
  if (RSS == '') {
    RSS = (await getFeed()).rss2()
  }
  return new Response(RSS, { status: 200 })
}
