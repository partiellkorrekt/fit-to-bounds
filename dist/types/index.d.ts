export declare type FitMode = 'cover' | 'contain' | 'width' | 'height';
export declare type Dimensions = {
    width: number;
    height: number;
};
export declare type Offset = {
    left: number;
    top: number;
};
export declare type FitOptions = {
    /**
     * Focuspoint of the image in pct
     *
     * @default {x: 0.5, y: 0.5}
     */
    focusPoint?: {
        x: number;
        y: number;
    };
    /**
     * Additional offset. Will be added at the very end of the calculation
     *
     * @default {left: 0, top: 0}
     */
    extraOffset?: Offset;
    /**
     * Should the dimensions be rounded (Math.ceil)?
     * A lot of times that results in nicer rendering inside the browser
     *
     * @default true
     */
    roundSize?: boolean;
    /**
     * Allow the resulting dimensions to be bigger than the childDimensions
     *
     * @default true
     */
    allowUpscaling?: boolean;
};
export declare const fit: (mode: FitMode, parentDimensions: Dimensions, childDimensions: Dimensions, options?: FitOptions | undefined) => {
    size: Dimensions;
    offset: Offset;
    scale: number;
};
