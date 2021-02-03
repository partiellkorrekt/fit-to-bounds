export const fit = (mode, parentDimensions, childDimensions, options) => {
    const { focusPoint = { x: 0.5, y: 0.5 }, extraOffset = { left: 0, top: 0 }, roundSize = true, allowUpscaling = true } = options || {};
    const childRatio = childDimensions.height / childDimensions.width;
    const parentRatio = parentDimensions.height / parentDimensions.width;
    const alignByWidth = (mode === 'cover' && childRatio > parentRatio) ||
        (mode === 'contain' && childRatio < parentRatio) ||
        mode === 'width';
    let size = alignByWidth
        ? {
            width: parentDimensions.width,
            height: roundSize ? Math.ceil(parentDimensions.width * childRatio) : parentDimensions.width * childRatio
        }
        : {
            width: roundSize ? Math.ceil(parentDimensions.height / childRatio) : parentDimensions.height / childRatio,
            height: parentDimensions.height
        };
    const scale = size.width / childDimensions.width;
    if (!allowUpscaling && scale > 1) {
        size = {
            width: childDimensions.width,
            height: childDimensions.height
        };
    }
    const offset = {
        left: (parentDimensions.width - size.width) * focusPoint.x + extraOffset.left,
        top: (parentDimensions.height - size.height) * focusPoint.y + extraOffset.top
    };
    return {
        size,
        offset,
        scale
    };
};
//# sourceMappingURL=index.js.map