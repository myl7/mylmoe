import { cache } from 'react'

import { feed } from './rss'

export const config = { runtime: 'edge' }

const atom = cache(async () => (await feed()).atom1())

export default async function handler() {
  return new Response(await atom(), { status: 200 })
}
