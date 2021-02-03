# fit-to-bounds

Fit given child proportions inside parent proportions simular to css background-size.

# Installation

```
npm i -S fit-to-bounds
```

or

```
yarn add fit-to-bounds
```

# Usage

```js
import { fit } from 'fit-to-bounds'

// Allowed values: cover, contain, width, height
const fitmode = 'cover'

// Get these dimensions from the DOM, an API or whatever
const parentDimensions = { width: 1024, height: 768 }
const childDimensions = { width: 1920, height: 1080 }

// All options are optional. These are the default values:
const options = {
  focusPoint: { x: 0.5, y: 0.5 },
  extraOffset: { left: 0, top: 0 },
  roundSize: true,
  allowUpscaling: true
}

const { size, offset, scale } = fit(fitmode, parentDimensions, childDimensions, options)
```

# Example

The following example would fit a Full-HD movie inside the screen of an older projector

```js
import { fit } from 'fit-to-bounds'

const screenDimensions = { width: 1024, height: 768 }
const movieDimensions = { width: 1920, height: 1080 }

const {
  size, // { width: 1024, height: 576}
  offset, // { left: 0, top: 96 }
  scale // 0.533...
} = fit('contain', screenDimensions, movieDimensions)
```

# Supported fit modes

- **cover:** Behaves like `background-size: cover`. Child is guaranteed to fill the whole container.
- **contain:** Behaves like `background-size: contain`. Child is guaranteed to be fully visible inside the container.
- **width:** Width will always be 100%. Height and offset are set accordingly
- **height:** Height will always be 100%. Width and offset are set accordingly

# Options

- **focusPoint:** Defined in %. The offset will be set in a way that the focusPoint is as close to the center as possible. This will not break any fitMode.
- **extraOffset:** Offset that will be added to the resulting offset. _This might break the guarantees of fitMode_
- **roundSize:** Sizes will be rounded using `Math.ceil` when true. This usually results in nicer rendering in the browser context.
- **allowUpscaling:** If false the maximum scale is 1. So that images will not be scaled above their natural dimensions.
