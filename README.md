# Zoom-Image
**Zoom-Image** is a Javascript plugin to add a Medium zoom like on your images.
You can see a demo at this [page](https://osternaudclem.github.io/zoom-image)

## Download it
You have different way to get the library.

### With Bower

```shell
$ bower install --save zoom-image
```

You have two files to import into your html:

```html
<link rel="stylesheet" href="bower_components/zoom-image/zoom-image.css">
```

```html
<script type="text/javascript" href="bower_components/zoom-image/zoom-image.js"></script>
```

### With NPM

```shell
$ npm install --save zoom-image
```

You have two files to import into your html:

```html
<link rel="stylesheet" href="node_modules/zoom-image/dist/zoom-image.css">
```

```html
<script type="text/javascript" href="node_modules/zoom-image/dist/zoom-image.js"></script>
```

### Manually
You can download this repo and add manually the files into your library folder.

## Use it
Now, in your script file:

```javascript
var imgs = document.getElementsByTagName('img');

var zoom = new ZoomImage(imgs);
```

## TO-DO
* Close by clicking on overlay
* Close by ESC key √
* Remove console log √
* Add minify version √
