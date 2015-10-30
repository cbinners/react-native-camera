var React = require('react-native');
var { requireNativeComponent, PropTypes, NativeModules } = React;

var ReactNativeCameraModule = NativeModules.ReactCameraModule;
var ReactCameraView = requireNativeComponent('ReactCameraView', {
    name: 'ReactCameraView',
    propTypes: {
        placeholderprop: PropTypes.string
    }
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
