# Image zoom react hook.

### Default View Example

```javascript
/**

* Example of default view

*/

function DefaultZoomApp() {
  /**

* Necessary inputs for useImageZoomHook

*/

  const meshRef = React.useRef(null);

  const imageContainerRef = React.useRef(null);

  const imgRef = React.useRef(null);

  const imagePreviewRef = React.useRef(null); /**

* The ratio of lens height and width on main image and the zoom image also

* should remain same for correct working.

*/

  const imgHeight = 600;

  const imgWidth = 500;

  const lensHeight = 100;

  const lensWidth = 100;

  const previewLensHeight = 600;

  const img =
    "https://rukminim1.flixcart.com/image/880/1056/jw6pifk0/t-shirt/e/v/z/m-61ywn-lewel-original-imafgxd7dfg7uub2.jpeg?q=50";

  const previewImg =
    "https://rukminim1.flixcart.com/image/880/1056/jw6pifk0/t-shirt/e/v/z/m-61ywn-lewel-original-imafgxd7dfg7uub2.jpeg?q=90";

  const {
    // moveLens,

    // imgDimesions,

    // lensDimensions,

    // previewLensDimensions,

    // previewImgDimensions,

    // imgContainerDimesions,

    DefaultView
  } = useImageZoom({
    meshRef,

    imgRef,

    imagePreviewRef,

    imgHeight,

    imgWidth,

    lensHeight,

    lensWidth,

    previewLensHeight,

    img,

    previewImg
  }); /**

* Two images are involved here, user need to have a actual image and

* one good quality image with higher resolution

*/

  return <div className="container">{DefaultView}</div>;
}
```

### Custom Zoom Example

```javascript
/**
 * Example of customized zooming
 */

function AppWithZoomCustomization() {
  /**
   * Necessary inputs for useImageZoomHook
   */

  const meshRef = React.useRef(null);
  const imageContainerRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const imagePreviewRef = React.useRef(null);
  /**
   * The  ratio of lens height and width on main image and the zoom image also
   * should remain same for correct working.
   */
  const imgHeight = 600;
  const imgWidth = 500;
  const lensHeight = 100;
  const lensWidth = 100;
  const previewLensHeight = 600;
  const img =
    "https://rukminim1.flixcart.com/image/880/1056/jw6pifk0/t-shirt/e/v/z/m-61ywn-lewel-original-imafgxd7dfg7uub2.jpeg?q=50";
  const previewImg =
    "https://rukminim1.flixcart.com/image/880/1056/jw6pifk0/t-shirt/e/v/z/m-61ywn-lewel-original-imafgxd7dfg7uub2.jpeg?q=90";

  const {
    moveLens,
    imgDimesions,
    lensDimensions,
    previewLensDimensions,
    previewImgDimensions,
    imgContainerDimesions
  } = useImageZoom({
    meshRef,
    imgRef,
    imagePreviewRef,
    imgHeight,
    imgWidth,
    lensHeight,
    lensWidth,
    previewLensHeight,
    img,
    previewImg
  });
  /**
   * Two images are involved here, user need to have a actual image and
   * one good quality image with higher resolution
   */

  return (
    <div className="container">
            
      <div
        className="img-main-container"
        onMouseMove={moveLens}
        ref={imageContainerRef}
        style={{
          ...imgContainerDimesions
        }}
      >
                
        <div
          ref={meshRef}
          className="mesh"
          style={{
            ...lensDimensions
          }}
        />
                
        <img
          style={{
            ...imgDimesions
          }}
          ref={imgRef}
          alt="test"
          src={img}
        />
              
      </div>
            
      <div
        className="img-preview-section-container" // ref={imagePreviewRefContainer}
        style={{
          ...previewLensDimensions
        }}
      >
                
        <img
          ref={imagePreviewRef}
          alt="test-preview"
          src={previewImg}
          style={{
            ...previewImgDimensions
          }}
          className="img-preview-section"
        />
              
      </div>
          
    </div>
  );
}

/**
 * Try to use both the types of image zoom
 * DefaultZoomApp : where you get the default zoom UI and also customizable
 * AppWithZoomCustomization: where user want to take control of different ui elements
 */
ReactDOM.render(<AppWithZoomCustomization />, document.getElementById("root"));
```
