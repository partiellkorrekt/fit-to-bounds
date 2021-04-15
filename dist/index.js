export var fit = function (mode, parentDimensions, childDimensions, options) {
    var _a = options || {}, _b = _a.focusPoint, focusPoint = _b === void 0 ? { x: 0.5, y: 0.5 } : _b, _c = _a.extraOffset, extraOffset = _c === void 0 ? { left: 0, top: 0 } : _c, _d = _a.roundSize, roundSize = _d === void 0 ? true : _d, _e = _a.allowUpscaling, allowUpscaling = _e === void 0 ? true : _e;
    var childRatio = childDimensions.height / childDimensions.width;
    var parentRatio = parentDimensions.height / parentDimensions.width;
    var alignByWidth = (mode === 'cover' && childRatio > parentRatio) ||
        (mode === 'contain' && childRatio < parentRatio) ||
        mode === 'width';
    var size = alignByWidth
        ? {
            width: parentDimensions.width,
            height: roundSize ? Math.ceil(parentDimensions.width * childRatio) : parentDimensions.width * childRatio
        }
        : {
            width: roundSize ? Math.ceil(parentDimensions.height / childRatio) : parentDimensions.height / childRatio,
            height: parentDimensions.height
        };
    var scale = size.width / childDimensions.width;
    if (!allowUpscaling && scale > 1) {
        size = {
            width: childDimensions.width,
            height: childDimensions.height
        };
    }
    var offset = {
        left: (parentDimensions.width - size.width) * focusPoint.x + extraOffset.left,
        top: (parentDimensions.height - size.height) * focusPoint.y + extraOffset.top
    };
    return {
        size: size,
        offset: offset,
        scale: scale
    };
};
//# sourceMappingURL=index.js.map