export type FitMode = 'cover' | 'contain' | 'width' | 'height'

export type Dimensions = { width: number; height: number }

export type Offset = { left: number; top: number }

export type FitOptions = {
  /**
   * Focuspoint of the image in pct
   *
   * @default {x: 0.5, y: 0.5}
   */
  focusPoint?: { x: number; y: number }
  /**
   * Additional offset. Will be added at the very end of the calculation
   *
   * @default {left: 0, top: 0}
   */
  extraOffset?: Offset
  /**
   * Should the dimensions be rounded (Math.ceil)?
   * A lot of times that results in nicer rendering inside the browser
   *
   * @default true
   */
  roundSize?: boolean
  /**
   * Allow the resulting dimensions to be bigger than the childDimensions
   *
   * @default true
   */
  allowUpscaling?: boolean
}

export const fit = (
  mode: FitMode,
  parentDimensions: Dimensions,
  childDimensions: Dimensions,
  options?: FitOptions
): {
  size: Dimensions
  offset: Offset
  scale: number
} => {
  const {
    focusPoint = { x: 0.5, y: 0.5 },
    extraOffset = { left: 0, top: 0 },
    roundSize = true,
    allowUpscaling = true
  } = options || {}
  const childRatio = childDimensions.height / childDimensions.width
  const parentRatio = parentDimensions.height / parentDimensions.width
  const alignByWidth =
    (mode === 'cover' && childRatio > parentRatio) ||
    (mode === 'contain' && childRatio < parentRatio) ||
    mode === 'width'
  let size = alignByWidth
    ? {
        width: parentDimensions.width,
        height: roundSize ? Math.ceil(parentDimensions.width * childRatio) : parentDimensions.width * childRatio
      }
    : {
        width: roundSize ? Math.ceil(parentDimensions.height / childRatio) : parentDimensions.height / childRatio,
        height: parentDimensions.height
      }
  let scale = size.width / childDimensions.width
  if (!allowUpscaling && scale > 1) {
    scale = 1
    size = {
      width: childDimensions.width,
      height: childDimensions.height
    }
  }
  const offset = {
    left: (parentDimensions.width - size.width) * focusPoint.x + extraOffset.left,
    top: (parentDimensions.height - size.height) * focusPoint.y + extraOffset.top
  }
  return {
    size,
    offset,
    scale
  }
}
