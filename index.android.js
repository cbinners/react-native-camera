var React = require('react-native');
var { requireNativeComponent, PropTypes, NativeModules } = React;

var ReactNativeCameraModule = NativeModules.ReactCameraModule;
var ReactCameraView = requireNativeComponent('ReactCameraView', {
    name: 'ReactCameraView',
    propTypes: {
      scaleX: PropTypes.number,
      scaleY: PropTypes.number,
      aspect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      captureAudio: PropTypes.bool,
      captureMode: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      captureTarget: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      type: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      orientation: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      flashMode: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      torchMode: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    }
  },
  {
    nativeOnly: {scaleX: true,scaleY: true,translateX: true,translateY: true, rotation: true}
  });

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

module.exports = Camera;
