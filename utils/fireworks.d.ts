import React from 'react'

export function tap(): keyof DocumentEventMap

export function handleResize(elem: HTMLCanvasElement): () => void

export function handleTap(
  filter: (e: React.MouseEvent) => boolean,
  elem: HTMLCanvasElement
): (e: React.MouseEvent) => void
