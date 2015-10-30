var React = require('react-native');
var { requireNativeComponent, PropTypes, NativeModules } = React;

var ReactNativeCameraModule = NativeModules.ReactCameraModule;
var ReactCameraView = requireNativeComponent('ReactCameraView', {
    name: 'ReactCameraView',
    propTypes: {
        placeholderprop: PropTypes.string
    }
});

var constants = {
  Aspect: NativeModules.CameraManager.Aspect,
  BarCodeType: NativeModules.CameraManager.BarCodeType,
  Type: NativeModules.CameraManager.Type,
  CaptureMode: NativeModules.CameraManager.CaptureMode,
  CaptureTarget: NativeModules.CameraManager.CaptureTarget,
  Orientation: NativeModules.CameraManager.Orientation,
  FlashMode: NativeModules.CameraManager.FlashMode,
  TorchMode: NativeModules.CameraManager.TorchMode,
};

var Camera = React.createClass({

    render () {
        return (
            <ReactCameraView {...this.props}></ReactCameraView>
        );
    },

    capture (options, callback) {
        return new Promise(function(resolve, reject) {
            if (!callback && typeof options === 'function') callback = options;
            ReactNativeCameraModule.capture(function(encoded) {
                if (typeof callback === 'function') callback(encoded);
                resolve(encoded);
            });
        });
    }
});

Camera.constants = constants;
module.exports = Camera;
