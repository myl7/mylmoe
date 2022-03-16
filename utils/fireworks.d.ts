export function tap(): 'touchstart' | 'mousedown'

export function handleResize(elem: HTMLCanvasElement): () => void

export function handleTap(
  filter: (e: MouseEvent | TouchEvent) => boolean,
  elem: HTMLCanvasElement
): (e: MouseEvent | TouchEvent) => void
