import React from "react";

/**
 *
 * Work in progress
 */
/**
// Part of code taken from w3 schools for lens movement
Need to maintain the ratio between lens and main image

Need to maintain the ratio between preview container div and image used for preview

Need to have imagePreview width and height with the same aspect ratio
as the original image

Need to translate in horizontal by the ratio of imagePreview width / img width 
Same translate in vertical by the ration of imagePreview height / img height
**/

interface IOptions {
  meshRef: React.MutableRefObject<null | HTMLElement>;
  imgRef: React.MutableRefObject<null | HTMLCanvasElement>;
  imagePreviewRef: React.MutableRefObject<null | HTMLElement>;
  imgHeight: number;
  imgWidth: number;
  lensHeight: number;
  lensWidth: number;
  previewLensHeight: number;
  img?: string;
  previewImg?: string;
}

interface IStyles {
  [key: string]: string;
}
interface IDefaultImgPreview {
  moveLens: any;
  imgContainerDimesions?: IStyles;
  lensDimensions?: IStyles;
  imgDimesions?: IStyles;
  previewLensDimensions?: IStyles;
  previewImgDimensions?: IStyles;
  img?: string;
  previewImg?: string;
}
const DefaultImgPreview = ({
  moveLens,
  imgContainerDimesions,
  lensDimensions,
  imgDimesions,
  previewLensDimensions,
  previewImgDimensions,
  img,
  previewImg
}: IDefaultImgPreview) => {
  const meshRef = React.useRef(null);
  const imageContainerRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const imagePreviewRef = React.useRef(null);
  return (
    <>
            
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
            
      <div // className="img-preview-section-container" // ref={imagePreviewRefContainer}
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
          
    </>
  );
};
interface IOptions {
  meshRef: React.MutableRefObject<null | HTMLElement>;
  imgRef: React.MutableRefObject<null | HTMLCanvasElement>;
  imagePreviewRef: React.MutableRefObject<null | HTMLElement>;
  imgHeight: number;
  imgWidth: number;
  lensHeight: number;
  lensWidth: number;
  previewLensHeight: number;
  img?: string;
  previewImg?: string;
}

/**
 * useImageZoom hook for zoom of images
 */

function useImageZoom({
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
}: IOptions) {
  const calculateDimensions = React.useCallback(() => {
    const imgToLensRatioHeight = imgHeight / lensHeight;
    const imgToLensRatioWidth = imgWidth / lensWidth;
    const lensDimensionRatio = lensWidth / lensHeight;
    const previewLensWidth = lensDimensionRatio * previewLensHeight;
    const imgPreviewHeight = imgToLensRatioHeight * previewLensHeight;
    const imgPreviewWidth = imgToLensRatioWidth * previewLensWidth;

    return {
      imgHeight,
      imgWidth,
      lensHeight,
      lensWidth,
      previewLensHeight,
      imgPreviewHeight,
      imgPreviewWidth,
      previewLensWidth
    };
  }, [imgHeight, imgWidth, lensHeight, lensWidth, previewLensHeight]);

  const [zoomDimensions, setZoomDimensions] = React.useState(() => {
    return calculateDimensions();
  });
  React.useEffect(() => {
    const newZoomDimensions = calculateDimensions();
    setZoomDimensions(newZoomDimensions);
  }, [
    imgHeight,
    lensHeight,
    imgWidth,
    lensWidth,
    previewLensHeight,
    calculateDimensions
  ]);
  const getCursorPos = React.useCallback(
    e => {
      let a;
      let x = 0;
      let y = 0;
      const img = imgRef.current;
      e = e || window.event; /* Get the x and y positions of the image: */
      if (img) {
        a = img.getBoundingClientRect(); /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top; /* Consider any page scrolling: */
      }

      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    },
    [imgRef]
  );
  const moveLens = React.useCallback(
    e => {
      let pos,
        x,
        y; /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault(); /* Get the cursor's x and y positions: */
      const lens = meshRef.current;
      const img = imgRef.current;
      const imgPreview = imagePreviewRef.current;
      if (imgPreview && img && lens) {
        const cx = imgPreview.offsetWidth / img.offsetWidth;
        const cy = imgPreview.offsetHeight / img.offsetHeight;
        pos = getCursorPos(e); /* Calculate the position of the lens: */
        x = pos.x - lens.offsetWidth / 2;
        y =
          pos.y -
          lens.offsetHeight /
            2; /* Prevent the lens from being positioned outside the image: */
        if (x > img.width - lens.offsetWidth) {
          x = img.width - lens.offsetWidth;
        }
        if (x < 0) {
          x = 0;
        }
        if (y > img.height - lens.offsetHeight) {
          y = img.height - lens.offsetHeight;
        }
        if (y < 0) {
          y = 0;
        } /* Set the position of the lens: */
        lens.style.left = x + "px";
        lens.style.top = y + "px"; /* Display what the lens "sees": */
        let finaltranslateX = x * cx;
        let finaltranslateY = y * cy;

        imgPreview.style.transform = `translate3d(${-finaltranslateX}px, ${-finaltranslateY}px, 0px)`;
      }
    },
    [imgRef, imagePreviewRef, getCursorPos, meshRef]
  );
  /**
   * Need to segregate the state value for better usage of this library
   * imgDimesion
   * lensDimension,
   * previewLensDimension
   * previewImgDimension
   */
  const {
    imgHeight: imgHeightInState,
    imgWidth: imgWidthInState,
    lensHeight: lensHeightInState,
    lensWidth: lensWidthInState,
    previewLensHeight: previewLensHeightInState,
    previewLensWidth: previewLensWidthInState,
    imgPreviewHeight: imgPreviewHeightInState,
    imgPreviewWidth: imgPreviewWidthInState
  } = zoomDimensions;
  /**
   * Segregating the style props for various zoom Ui elements
   */

  const imgContainerDimesions = {
    height: `${imgHeightInState}px`,
    width: `${imgWidthInState}px`,
    position: `relative` as "relative"
  };
  const imgDimesions = {
    height: "100%",
    width: "100%"
  };
  const lensDimensions = {
    height: `${lensHeightInState}px`,
    width: `${lensWidthInState}px`
  };

  const previewLensDimensions = {
    height: `${previewLensHeightInState}px`,
    width: `${previewLensWidthInState}px`,
    overflow: "hidden"
  };
  const previewImgDimensions = {
    height: `${imgPreviewHeightInState}px`,
    width: `${imgPreviewWidthInState}px`
  };

  const DefaultView = DefaultImgPreview({
    moveLens,
    imgContainerDimesions,
    lensDimensions,
    imgDimesions,
    previewLensDimensions,
    previewImgDimensions,
    img,
    previewImg
  });

  return {
    moveLens,
    imgContainerDimesions,
    imgDimesions,
    lensDimensions,
    previewLensDimensions,
    previewImgDimensions,
    DefaultView
  };
}

export { useImageZoom };
