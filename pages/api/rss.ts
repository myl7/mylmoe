// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next'
import getFeed from '../../utils/feed'

let RSS = ''

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (RSS == '') {
    RSS = (await getFeed()).rss2()
  }
  res.status(200).send(RSS)
}
