"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var DefaultImgPreview = function (_a) {
    var moveLens = _a.moveLens, imgContainerDimesions = _a.imgContainerDimesions, lensDimensions = _a.lensDimensions, imgDimesions = _a.imgDimesions, previewLensDimensions = _a.previewLensDimensions, previewImgDimensions = _a.previewImgDimensions, img = _a.img, previewImg = _a.previewImg;
    var meshRef = react_1["default"].useRef(null);
    var imageContainerRef = react_1["default"].useRef(null);
    var imgRef = react_1["default"].useRef(null);
    var imagePreviewRef = react_1["default"].useRef(null);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "img-main-container", onMouseMove: moveLens, ref: imageContainerRef, style: __assign({}, imgContainerDimesions) },
            react_1["default"].createElement("div", { ref: meshRef, className: "mesh", style: __assign({}, lensDimensions) }),
            react_1["default"].createElement("img", { style: __assign({}, imgDimesions), ref: imgRef, alt: "test", src: img })),
        react_1["default"].createElement("div", { style: __assign({}, previewLensDimensions) },
            react_1["default"].createElement("img", { ref: imagePreviewRef, alt: "test-preview", src: previewImg, style: __assign({}, previewImgDimensions), className: "img-preview-section" }))));
};
/**
 * useImageZoom hook for zoom of images
 */
function useImageZoom(_a) {
    var meshRef = _a.meshRef, imgRef = _a.imgRef, imagePreviewRef = _a.imagePreviewRef, imgHeight = _a.imgHeight, imgWidth = _a.imgWidth, lensHeight = _a.lensHeight, lensWidth = _a.lensWidth, previewLensHeight = _a.previewLensHeight, img = _a.img, previewImg = _a.previewImg;
    var calculateDimensions = react_1["default"].useCallback(function () {
        var imgToLensRatioHeight = imgHeight / lensHeight;
        var imgToLensRatioWidth = imgWidth / lensWidth;
        var lensDimensionRatio = lensWidth / lensHeight;
        var previewLensWidth = lensDimensionRatio * previewLensHeight;
        var imgPreviewHeight = imgToLensRatioHeight * previewLensHeight;
        var imgPreviewWidth = imgToLensRatioWidth * previewLensWidth;
        return {
            imgHeight: imgHeight,
            imgWidth: imgWidth,
            lensHeight: lensHeight,
            lensWidth: lensWidth,
            previewLensHeight: previewLensHeight,
            imgPreviewHeight: imgPreviewHeight,
            imgPreviewWidth: imgPreviewWidth,
            previewLensWidth: previewLensWidth
        };
    }, [imgHeight, imgWidth, lensHeight, lensWidth, previewLensHeight]);
    var _b = react_1["default"].useState(function () {
        return calculateDimensions();
    }), zoomDimensions = _b[0], setZoomDimensions = _b[1];
    react_1["default"].useEffect(function () {
        var newZoomDimensions = calculateDimensions();
        setZoomDimensions(newZoomDimensions);
    }, [
        imgHeight,
        lensHeight,
        imgWidth,
        lensWidth,
        previewLensHeight,
        calculateDimensions
    ]);
    var getCursorPos = react_1["default"].useCallback(function (e) {
        var a;
        var x = 0;
        var y = 0;
        var img = imgRef.current;
        e = e || window.event; /* Get the x and y positions of the image: */
        if (img) {
            a = img.getBoundingClientRect(); /* Calculate the cursor's x and y coordinates, relative to the image: */
            x = e.pageX - a.left;
            y = e.pageY - a.top; /* Consider any page scrolling: */
        }
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }, [imgRef]);
    var moveLens = react_1["default"].useCallback(function (e) {
        var pos, x, y; /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault(); /* Get the cursor's x and y positions: */
        var lens = meshRef.current;
        var img = imgRef.current;
        var imgPreview = imagePreviewRef.current;
        if (imgPreview && img && lens) {
            var cx = imgPreview.offsetWidth / img.offsetWidth;
            var cy = imgPreview.offsetHeight / img.offsetHeight;
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
            var finaltranslateX = x * cx;
            var finaltranslateY = y * cy;
            imgPreview.style.transform = "translate3d(" + -finaltranslateX + "px,\u00A0" + -finaltranslateY + "px,\u00A00px)";
        }
    }, [imgRef, imagePreviewRef, getCursorPos, meshRef]);
    /**
     * Need to segregate the state value for better usage of this library
     * imgDimesion
     * lensDimension,
     * previewLensDimension
     * previewImgDimension
     */
    var imgHeightInState = zoomDimensions.imgHeight, imgWidthInState = zoomDimensions.imgWidth, lensHeightInState = zoomDimensions.lensHeight, lensWidthInState = zoomDimensions.lensWidth, previewLensHeightInState = zoomDimensions.previewLensHeight, previewLensWidthInState = zoomDimensions.previewLensWidth, imgPreviewHeightInState = zoomDimensions.imgPreviewHeight, imgPreviewWidthInState = zoomDimensions.imgPreviewWidth;
    /**
     * Segregating the style props for various zoom Ui elements
     */
    var imgContainerDimesions = {
        height: imgHeightInState + "px",
        width: imgWidthInState + "px",
        position: "relative"
    };
    var imgDimesions = {
        height: "100%",
        width: "100%"
    };
    var lensDimensions = {
        height: lensHeightInState + "px",
        width: lensWidthInState + "px"
    };
    var previewLensDimensions = {
        height: previewLensHeightInState + "px",
        width: previewLensWidthInState + "px",
        overflow: "hidden"
    };
    var previewImgDimensions = {
        height: imgPreviewHeightInState + "px",
        width: imgPreviewWidthInState + "px"
    };
    var DefaultView = DefaultImgPreview({
        moveLens: moveLens,
        imgContainerDimesions: imgContainerDimesions,
        lensDimensions: lensDimensions,
        imgDimesions: imgDimesions,
        previewLensDimensions: previewLensDimensions,
        previewImgDimensions: previewImgDimensions,
        img: img,
        previewImg: previewImg
    });
    return {
        moveLens: moveLens,
        imgContainerDimesions: imgContainerDimesions,
        imgDimesions: imgDimesions,
        lensDimensions: lensDimensions,
        previewLensDimensions: previewLensDimensions,
        previewImgDimensions: previewImgDimensions,
        DefaultView: DefaultView
    };
}
exports.useImageZoom = useImageZoom;
