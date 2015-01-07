app.factory('cameraFactory', ['$cordovaCamera', function ($cordovaCamera) {
  // see also
  // https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md
  if (!window.Camera) {
    window.Camera = {
      DestinationType: {
        DATA_URL : 0,
        FILE_URI : 1,
        NATIVE_URI : 2
      },
      EncodingType: {
        JPEG : 0,
        PNG : 1
      },
      PictureSourceType: {
        PHOTOLIBRARY : 0,
        CAMERA : 1,
        SAVEDPHOTOALBUM : 2
      },
      PopoverArrowDirection : {
        ARROW_UP : 1,
        ARROW_DOWN : 2,
        ARROW_LEFT : 4,
        ARROW_RIGHT : 8,
        ARROW_ANY : 15
      }
    };
    // ipad only
    if (!window.CameraPopoverOptions) {
      window.CameraPopoverOptions = {
        x : 0,
        y :  32,
        width : 320,
        height : 480,
        arrowDir : Camera.PopoverArrowDirection.ARROW_ANY
      };
    }
  }

  var options = {
    quality: 75,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,
    allowEdit: true,
    encodingType: Camera.EncodingType.PNG,
    targetWidth: 600,
    targetHeight: 600,
    popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: false
  };

  function getOptions () {
    return angular.extend({}, options);
  }

  function take (callback, newOptions) {
    var option = angular.extend({}, newOptions || options);
    option.sourceType = Camera.PictureSourceType.CAMERA;
    callCordovaCamera(callback, option);
  }

  function pick (callback, newOptions) {
    var option = angular.extend({}, newOptions || options);
    option.sourceType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    callCordovaCamera(callback, option);
  }

  function callCordovaCamera (callback, option) {
    $cordovaCamera.getPicture(option)
    .then(function(imageData) {
      callback(imageData);
    }, function(err) {
      callback(null, err);
    });
  }

  return {
    getOptions : getOptions,
    take: take,
    pick: pick
  };
}]);