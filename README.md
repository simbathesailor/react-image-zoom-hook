# Image zoom react hook(Work in progress)

![Github Actions Test | simbathesailor/react-image-zoom-hook](https://github.com/simbathesailor/react-image-zoom-hook/workflows/Test/badge.svg)

One Paragraph of project description goes here

### Installing

If using npm, Run

```javascript

npm  install  --save  react-image-zoom-hook

```

If using yarn , Run

```javascript

yarn  add  react-image-zoom-hook

```

## Getting Started

Before we see the usage of this library, lets understand the various values returned by this hook:

Let's see the jsx needed to use this hook.

```jsx

<div  onMouseMove={moveLens}  style={{ ...imgContainerDimesions }}>

<div  ref="{meshRefCallback}"  style={{...lensDimensions }} />

<img

style={{

...imgDimesions

}}

ref={imgRefCallback}

alt="test"

src="{img}"

/>

</div>

<div  style={{ ...previewLensDimensions }}>

<img

ref="{imagePreviewRefCallback}"

alt="test-preview"

src="{previewImg}"

style={{

...previewImgDimensions

}}

/>

</div>
```

```javascript

Following are the segregation of properties based on different element



1. Image Container

moveLens,

imgContainerDimesions,



2. Lens or Mesh

lensDimensions,

meshRefCallback,



3. Image

imgDimesions

imgRefCallback



4. Preview Image

imagePreviewRefCallback

previewImgDimensions



5. Preview Lens

previewLensDimensions



```

Let's see it visually

![Pictorial  representation](images/explanation.png)

Customisation:

1.  It is fully customisable, as implementing component is in consumer's control.

## Default Zoom

```jsx
/**

* Example of default view

*/

function DefaultZoomApp() {
  /**

* Necessary inputs for useImageZoomHook

*/

  /**

* The ratio of lens height and width on main image and the zoom image also

* should remain same for correct working.

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

  const { DefaultView } = useImageZoom({
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
```

## Customised Zoom

```jsx
/**

* Example of customised zooming

*/

function AppWithZoomCustomization() {
  /**

* Necessary inputs for useImageZoomHook

*/

  /**

* The ratio of lens height and width on main image and the zoom image also

* should remain same for correct working.

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

    imgContainerDimesions,

    imgRefCallback,

    meshRefCallback,

    imagePreviewRefCallback
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

  return (
    <div className="container">
      <div
        className="img-main-container"
        onMouseMove={moveLens}
        style={{
          ...imgContainerDimesions
        }}
      >
        <div
          ref={meshRefCallback}
          className="mesh"
          style={{
            ...lensDimensions
          }}
        />

        <img
          style={{
            ...imgDimesions
          }}
          ref={imgRefCallback}
          alt="test"
          src={img}
        />
      </div>

      <div
        className="img-preview-section-container"
        // ref={imagePreviewRefContainer}

        style={{
          ...previewLensDimensions
        }}
      >
        <img
          ref={imagePreviewRefCallback}
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

* Try to use both the types of image zoom

* DefaultZoomApp : where you get the default zoom UI and also customizable

* AppWithZoomCustomization: where user want to take control of different ui elements

*/

ReactDOM.render(<AppWithZoomCustomization />, document.getElementById("root"));
```

```typescript

moveLens: (event: React.MouseEvent<any, MouseEvent>) => void;

imgContainerDimesions: {

height: string;

width: string;

position: "relative";

};

imgDimesions: {

height: string;

width: string;

};

lensDimensions: {

height: string;

width: string;

};

previewLensDimensions: {

height: string;

width: string;

overflow: string;

};

previewImgDimensions: {

height: string;

width: string;

};

DefaultView: JSX.Element;

imgRefCallback: (node: any) => void;

meshRefCallback: (node: any) => void;

imagePreviewRefCallback: (node: any) => void;

```

## Running the tests

```javascript

yarn run test

```

### Break down into end to end tests

Explain what these tests test and why

```

Give  an  example

```

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **simbathesailor** - _Initial work_ - [PurpleBooth](https://github.com/simbathesailor)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

### Links

https://codesandbox.io/s/useimagezoom-ttx47

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

```

```
