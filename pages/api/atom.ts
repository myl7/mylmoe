// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import { feed } from './rss'

export const config = { runtime: 'edge' }

let atomStore: string
const atom = async () => {
  if (atomStore) return atomStore
  atomStore = (await feed()).atom1()
  return atomStore
}

export default async function handler() {
  return new Response(await atom(), { status: 200 })
}
