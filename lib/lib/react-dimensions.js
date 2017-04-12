'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***
  CUSTOM VERSION from https://github.com/digidem/react-dimensions
  All credits to Gregor MacLennan
***/
var React = require('react');
var onElementResize = require('element-resize-event');

var defaultContainerStyle = {
  width: '100%',
  height: '100%',
  padding: 0,
  border: 0
};

function defaultGetWidth(element) {
  return element.clientWidth;
}

function defaultGetHeight(element) {
  return element.clientHeight;
}

/**
 * Wraps a react component and adds properties `containerHeight` and
 * `containerWidth`. Useful for responsive design. Properties update on
 * window resize. **Note** that the parent element must have either a
 * height or a width, or nothing will be rendered
 *
 * Can be used as a
 * [higher-order component](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/#property-initializers)
 * or as an [ES7 class decorator](https://github.com/wycats/javascript-decorators)
 * (see examples)
 *
 * @param {object} [options]
 * @param {function} [options.getHeight] A function that is passed an element and returns element
 * height, where element is the wrapper div. Defaults to `(element) => element.clientHeight`
 * @param {function} [options.getWidth]  A function that is passed an element and returns element
 * width, where element is the wrapper div. Defaults to `(element) => element.clientWidth`
 * @param {object} [options.containerStyle] A style object for the `<div>` that will wrap your component.
 * The dimensions of this `div` are what are passed as props to your component. The default style is
 * `{ width: '100%', height: '100%', padding: 0, border: 0 }` which will cause the `div` to fill its
 * parent in most cases. If you are using a flexbox layout you will want to change this default style.
 * @param {boolean} [options.elementResize=false] Set true to watch the wrapper `div` for changes in
 * size which are not a result of window resizing - e.g. changes to the flexbox and other layout.
 * @return {function}                   A higher-order component that can be
 * used to enhance a react component `Dimensions()(MyComponent)`
 *
 * @example
 * // ES2015
 * import React from 'react'
 * import Dimensions from 'react-dimensions'
 *
 * class MyComponent extends React.Component {
 *   render() (
 *     <div
 *       containerWidth={this.props.containerWidth}
 *       containerHeight={this.props.containerHeight}
 *     >
 *     </div>
 *   )
 * }
 *
 * export default Dimensions()(MyComponent) // Enhanced component
 *
 * @example
 * // ES5
 * var React = require('react')
 * var Dimensions = require('react-dimensions')
 *
 * var MyComponent = React.createClass({
 *   render: function() {(
 *     <div
 *       containerWidth={this.props.containerWidth}
 *       containerHeight={this.props.containerHeight}
 *     >
 *     </div>
 *   )}
 * }
 *
 * module.exports = Dimensions()(MyComponent) // Enhanced component
 *
 */
module.exports = function Dimensions() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$getHeight = _ref.getHeight,
      getHeight = _ref$getHeight === undefined ? defaultGetHeight : _ref$getHeight,
      _ref$getWidth = _ref.getWidth,
      getWidth = _ref$getWidth === undefined ? defaultGetWidth : _ref$getWidth,
      _ref$containerStyle = _ref.containerStyle,
      containerStyle = _ref$containerStyle === undefined ? defaultContainerStyle : _ref$containerStyle,
      _ref$elementResize = _ref.elementResize,
      elementResize = _ref$elementResize === undefined ? false : _ref$elementResize;

  return function (ComposedComponent) {
    return function (_React$Component) {
      _inherits(DimensionsHOC, _React$Component);

      function DimensionsHOC(props) {
        _classCallCheck(this, DimensionsHOC);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = {};
        return _this;
      }

      DimensionsHOC.prototype.updateDimensions = function updateDimensions() {
        var container = this.refs.container;

        if (container) {
          var containerWidth = getWidth(container);
          var containerHeight = getHeight(container);

          if (containerWidth !== this.state.containerWidth || containerHeight !== this.state.containerHeight) {
            this.setState({ containerWidth: containerWidth, containerHeight: containerHeight });
          }
        }
      };

      DimensionsHOC.prototype.onResize = function onResize() {
        var _this2 = this;

        if (this.rqf) return;
        this.rqf = this.getWindow().requestAnimationFrame(function () {
          _this2.rqf = null;
          _this2.updateDimensions();
        });
      };

      // If the component is mounted in a different window to the javascript
      // context, as with https://github.com/JakeGinnivan/react-popout
      // then the `window` global will be different from the `window` that
      // contains the component.
      // Depends on `defaultView` which is not supported <IE9


      DimensionsHOC.prototype.getWindow = function getWindow() {
        return this.refs.container ? this.refs.container.ownerDocument.defaultView || window : window;
      };

      DimensionsHOC.prototype.componentDidMount = function componentDidMount() {
        if (!this.refs.container) {
          throw new Error('Cannot find container div');
        }
        this.updateDimensions();
        if (elementResize) {
          // Experimental: `element-resize-event` fires when an element resizes.
          // It attaches its own window resize listener and also uses
          // requestAnimationFrame, so we can just call `this.updateDimensions`.
          onElementResize(this.refs.container, this.updateDimensions);
        } else {
          this.getWindow().addEventListener('resize', this.onResize.bind(this), false);
        }
      };

      DimensionsHOC.prototype.componentWillUnmount = function componentWillUnmount() {
        this.getWindow().removeEventListener('resize', this.onResize.bind(this));
      };

      /**
       * Returns the underlying wrapped component instance.
       * Useful if you need to access a method or property of the component
       * passed to react-dimensions.
       *
       * @return {object} The rendered React component
       **/


      DimensionsHOC.prototype.getWrappedInstance = function getWrappedInstance() {
        return this.refs.wrappedInstance;
      };

      DimensionsHOC.prototype.render = function render() {
        return React.createElement(
          'div',
          { style: containerStyle, ref: 'container' },
          (this.state.containerWidth || this.state.containerHeight) && React.createElement(ComposedComponent, _extends({}, this.state, this.props, {
            updateDimensions: this.updateDimensions,
            ref: 'wrappedInstance'
          }))
        );
      };

      return DimensionsHOC;
    }(React.Component);
  };
};