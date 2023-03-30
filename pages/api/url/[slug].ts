// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

// URL shortener with domain myl.moe

import type { NextApiRequest, NextApiResponse } from 'next'
import Redis from 'ioredis'

const KV = newKV()
const KV_PREFIX = 'mylmoe:url:'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query as { slug: string } // Since slug is a path param
  if (!KV) {
    res.status(404).send('Not found')
    return
  }
  const target = await KV.get(KV_PREFIX + slug)
  if (!target) {
    res.status(404).send('Not found')
    return
  }
  res.redirect(308, target)
}

// Required interface for KV to serve in the module
interface KV {
  get(slug: string): Promise<string | null>
}

function newKV(): KV | null {
  if (!process.env.REDIS_URL) {
    return null
  }
  const redis = new Redis(process.env.REDIS_URL)
  return redis
}
