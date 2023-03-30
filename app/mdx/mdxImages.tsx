'use client'

// Copyright (C) myl7
// SPDX-License-Identifier: Apache-2.0

import React from 'react'

import type { StaticImageData } from 'next/image'

export const MDXImagesCtx = React.createContext<{ [path: string]: StaticImageData }>({})

export default function MDXImages({
  images,
  children,
}: {
  images: { [path: string]: StaticImageData }
  children: React.ReactNode
}) {
  return <MDXImagesCtx.Provider value={images}>{children}</MDXImagesCtx.Provider>
}
