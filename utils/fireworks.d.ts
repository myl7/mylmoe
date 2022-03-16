// Copyright (c) 2020-2022 myl7
// SPDX-License-Identifier: Apache-2.0

export function tap(): 'touchstart' | 'mousedown'

export function handleResize(elem: HTMLCanvasElement): () => void

export function handleTap(
  filter: (e: MouseEvent | TouchEvent) => boolean,
  elem: HTMLCanvasElement
): (e: MouseEvent | TouchEvent) => void
