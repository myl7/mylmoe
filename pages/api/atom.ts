// Copyright (C) 2022 myl7
// SPDX-License-Identifier: Apache-2.0

import type { NextApiRequest, NextApiResponse } from 'next'
import getFeed from '../../utils/feed'

let ATOM = ''

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  if (ATOM == '') {
    ATOM = (await getFeed()).atom1()
  }
  res.status(200).send(ATOM)
}
