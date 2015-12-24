/**
 * Zoom-Image
 * by @osternaud_clem
 * inspired by Zoom.js (https://github.com/fat/zoom.js/)
 * V0.0.3 - December 2015
 */

function ZoomImage(imgs) {
  this._imgs = imgs;
  this._activeZoom = null;
  this.init();
}

ZoomImage.prototype.init = function() {
  for (var i = 0; i < this._imgs.length; i++) {
    var img = this._imgs[i];
    zoom = new Zoom(img);
  }
};

function Zoom(img) {
  this._fullHeight = 0;
  this._fullWidth = 0;

  this._overlay = null;
  this._targetImageWrap = null;
  this._isZoom = false;
  this._initialScrollPosition = null;
  this._targetImage = img;
  this._$document = document.documentElement;
  this._$window = window;
  this._$body = document.body;

  this.zoomImage();
};

Zoom.prototype.zoomImage = function() {
  var that = this;
  var img = document.createElement('img');

  img.onload = function() {

    that._fullHeight = img.naturalHeight;
    that._fullWidth = img.naturalWidth;

    that._targetImage.setAttribute('data-action', 'zoom');
    that._targetImage.addEventListener('click', that, false);
    that._$window.addEventListener('scroll', function(e) {
      that._scrollClose();
    }, false);

    that._$document.addEventListener('keyup', function(e) {
      that._keyHandler(e);
    }, false);
  };

  img.src = this._targetImage.src;
};

Zoom.OFFSET = 80;

Zoom.prototype.handleEvent = function(e) {
  if (this._isZoom) {
    this._close();
  } else {
    this._zoomOriginal();
  }
};

Zoom.prototype._zoomOriginal = function() {
  var that = this;
  this._targetImageWrap = document.createElement('div');
  this._targetImageWrap.className = 'zoom-img-wrap';

  this._targetImage.parentNode.insertBefore(this._targetImageWrap, this._targetImage);
  this._targetImageWrap.appendChild(this._targetImage);
  this._isZoom = true;

  this._overlay = document.createElement('div');
  this._overlay.className = 'zoom-overlay';

  document.body.appendChild(this._overlay);

  this._calculateZoom();
  this._triggerAnimation();
};

Zoom.prototype._calculateZoom = function() {
  this._targetImage.offsetWidth;

  var originalFullImageWidth  = this._fullWidth;
  var originalFullImageHeight = this._fullHeight;

  var scrollTop = (window.pageYOffset || this._$document.scrollTop) -
  (this._$document.clientTop || 0);

  var maxScaleFactor = originalFullImageWidth / this._targetImage.width;

  var viewportHeight = (this._$document.clientHeight - Zoom.OFFSET);
  var viewportWidth  = (this._$document.clientWidth - Zoom.OFFSET);

  var imageAspectRatio = originalFullImageWidth / originalFullImageHeight;
  var viewportAspectRatio = viewportWidth / viewportHeight;

  if (originalFullImageWidth < viewportWidth && originalFullImageHeight < viewportHeight) {
    this._imgScaleFactor = maxScaleFactor;
  } else if (imageAspectRatio < viewportAspectRatio) {
    this._imgScaleFactor = (viewportHeight / originalFullImageHeight) * maxScaleFactor;
  } else {
    this._imgScaleFactor = (viewportWidth / originalFullImageWidth) * maxScaleFactor;
  }

};

Zoom.prototype._triggerAnimation = function() {
  this._targetImage.offsetWidth; // repaint before animating

  var imageOffset = {
    top: this._targetImage.y,
    left: this._targetImage.x
  };

  var scrollTop = (window.pageYOffset || this._$document.scrollTop) -
  (this._$document.clientTop || 0);

  var viewportY = scrollTop + (this._$document.clientHeight / 2);
  var viewportX = (this._$document.clientWidth / 2);

  var imageCenterY = imageOffset.top + (this._targetImage.height / 2);
  var imageCenterX = imageOffset.left + (this._targetImage.width / 2);

  this._translateY = viewportY - imageCenterY;
  this._translateX = viewportX - imageCenterX;

  var targetTransform = 'scale(' + this._imgScaleFactor + ')';
  var imageWrapTransform = 'translate(' + this._translateX + 'px, ' + this._translateY + 'px)';

  this._targetImage.style.transform = targetTransform;
  this._targetImage.className = this._targetImage.className + ' zoom-img';

  this._targetImageWrap.style.transform = imageWrapTransform;

  this._$body.className = this._$body.className + ' ' + ('zoom-overlay-open');
};

Zoom.prototype._scrollClose = function() {
  if (this._isZoom) {
    var scrollTop = (window.pageYOffset || this._$document.scrollTop) -
      (this._$document.clientTop || 0);

    if (this._initialScrollPosition === null) {
      this._initialScrollPosition = scrollTop;
    }

    var deltaY = this._initialScrollPosition - scrollTop;

    if (Math.abs(deltaY) >= 40) {
      this._close();
    }
  }
};

Zoom.prototype._keyHandler = function(e) {
  if (e.keyCode == 27) {
    if (this._isZoom) {
      this._close();
    }
  }
}

Zoom.prototype._close = function() {
  var that = this;
  this._targetImageWrap.style.transform = '';
  this._targetImage.style.transform = '';
  this._$body.className = this._$body.className.replace('zoom-overlay-open', '');
  this._isZoom = false;

  setTimeout(function() {
    that._targetImage.className = that._targetImage.className.replace('zoom-img', '');
    that._targetImageWrap.parentNode.replaceChild(that._targetImage, that._targetImageWrap);
    that._overlay.parentNode.removeChild(that._overlay);
    this._initialScrollPosition = null;
  }, 300);
};
