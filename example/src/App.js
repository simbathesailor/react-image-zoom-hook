import * as React from "react";

import useImageZoom from "react-image-zoom-hook";

/**
 * Example of default view
 */
function DefaultZoomApp() {
  /**
   * Necessary inputs for useImageZoomHook
   */
  /**
   * The  ratio of lens height and width on main image and the zoom image also
   * should remain same for correct working.
   */
  const imgHeight = 300;
  const imgWidth = 300;
  const lensHeight = 50;
  const lensWidth = 50;
  const previewLensHeight = 500;

  const img =
    "https://rukminim1.flixcart.com/image/880/1056/jw6pifk0/t-shirt/e/v/z/m-61ywn-lewel-original-imafgxd7dfg7uub2.jpeg?q=50";
  const previewImg =
    "https://rukminim1.flixcart.com/image/880/1056/jw6pifk0/t-shirt/e/v/z/m-61ywn-lewel-original-imafgxd7dfg7uub2.jpeg?q=90";

  const {
    // moveLens,
    // imgDimesions,
    // lensDimensions,
    // previewLensDimensions,
    // previewImgDimensions,
    // imgContainerDimesions,
    DefaultView
  } = useImageZoom({
    imgHeight,
    imgWidth,
    lensHeight,
    lensWidth,
    previewLensHeight,
    img,
    previewImg
  });
  /**
   * Two images are involved here, user need to have a actual image and
   * one good quality image with higher resolution
   */
  return <div className="container">{DefaultView}</div>;
}

export default class App extends Component {
  render() {
    return (
      <div>
        <DefaultZoomApp />
      </div>
    );
  }
}
