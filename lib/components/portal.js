'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CSSPropertyOperations = require('react/lib/CSSPropertyOperations');

var _CSSPropertyOperations2 = _interopRequireDefault(_CSSPropertyOperations);

var _reactImmutableRenderMixin = require('react-immutable-render-mixin');

var _tween = require('tween.js');

var _tween2 = _interopRequireDefault(_tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Portal vs 2.1.1 All rights to Vojtech Miksu. This is a copy with some modifications to fill the needs of this project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               https://github.com/tajo/react-portal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               The MIT License (MIT)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Copyright (c) 2016 Vojtech Miksu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Permission is hereby granted, free of charge, to any person obtaining a copy
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               of this software and associated documentation files (the "Software"), to deal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               in the Software without restriction, including without limitation the rights
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               copies of the Software, and to permit persons to whom the Software is
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               furnished to do so, subject to the following conditions:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               The above copyright notice and this permission notice shall be included in all
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               SOFTWARE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

var KEYCODES = {
  ESCAPE: 27
};

var Portal = function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal() {
    _classCallCheck(this, Portal);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      active: false,
      x: 0,
      y: 0,
      width: null,
      height: null,
      element: null // element clicked to open the portal
    };
    _this.handleWrapperClick = _this.handleWrapperClick.bind(_this);
    _this.closePortal = _this.closePortal.bind(_this);
    _this.handleOutsideMouseClick = _this.handleOutsideMouseClick.bind(_this);
    _this.handleKeydown = _this.handleKeydown.bind(_this);
    _this.portal = null;
    _this.node = null;
    return _this;
  }

  Portal.prototype.componentDidMount = function componentDidMount() {
    if (this.props.closeOnEsc) {
      document.addEventListener('keydown', this.handleKeydown);
    }

    if (this.props.closeOnOutsideClick) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick);
      document.addEventListener('touchstart', this.handleOutsideMouseClick);
      window.addEventListener('resize', this.handleResize.bind(this));
      window.addEventListener("scroll", this.handleScroll.bind(this));
    }

    if (this.props.isOpened) {
      this.openPortal();
    }
  };

  Portal.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
    // portal's 'is open' state is handled through the prop isOpened
    if (typeof newProps.isOpened !== 'undefined') {
      if (newProps.isOpened) {
        if (this.state.active) {
          this.renderPortal(newProps);
        } else {
          this.openPortal(newProps);
        }
      }
      if (!newProps.isOpened && this.state.active) {
        this.closePortal();
      }
    }

    // portal handles its own 'is open' state
    if (typeof newProps.isOpened === 'undefined' && this.state.active) {
      this.renderPortal(newProps);
    }
  };

  Portal.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.props.closeOnEsc) {
      document.removeEventListener('keydown', this.handleKeydown);
    }

    if (this.props.closeOnOutsideClick) {
      document.removeEventListener('mouseup', this.handleOutsideMouseClick);
      document.removeEventListener('touchstart', this.handleOutsideMouseClick);
      window.removeEventListener('resize', this.handleResize.bind(this));
      window.removeEventListener("scroll", this.handleScroll.bind(this));
    }

    this.closePortal(true);
  };

  Portal.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    var propschanged = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(this.props, nextProps);
    var statechanged = !(0, _reactImmutableRenderMixin.shallowEqualImmutable)(this.state, nextState);
    var somethingchanged = propschanged || statechanged;
    var mustUpdate = nextState.element && this.props.isSortedOrFiltered !== nextProps.isSortedOrFiltered;

    if (propschanged) {
      if (mustUpdate && !nextProps.isSortedOrFiltered) {
        nextState.element.style.color = this.props.iconDefColor; // back to default color
      } else if (mustUpdate && nextProps.isSortedOrFiltered) {
        nextState.element.style.color = this.props.iconColor;
      }
    }
    return somethingchanged;
  };

  Portal.prototype.handleResize = function handleResize(e) {
    // Close portal if rendered
    if (this.node) {
      this.closePortal();
    }
  };

  Portal.prototype.handleScroll = function handleScroll(e) {
    // Move portal if rendered
    if (this.node) {
      var rect = this.state.element.getBoundingClientRect(),
          top = void 0,
          y = this.state.y,
          node = this.node;

      top = rect.top + 5;

      // Move node to new position
      _CSSPropertyOperations2['default'].setValueForStyles(node, { top: top });
      this.setState({ y: top });
    }
  };

  Portal.prototype.renderPortal = function renderPortal(props) {
    var x = arguments.length <= 1 || arguments[1] === undefined ? this.state.x : arguments[1];
    var y = arguments.length <= 2 || arguments[2] === undefined ? this.state.y : arguments[2];

    var style = props.style || {},
        width = this.props.width || 280;

    if (!this.node) {
      this.node = document.createElement('div');

      if (props.className) {
        this.node.className = props.className;
      }

      if (this.props.repositioning) {
        style.position = 'fixed';
        style.top = y + 5;
        style.left = x + 5;
        if (this.props.width) style.width = this.props.width;
        if (this.props.height) style.height = this.props.height;
        if (style.left >= window.innerWidth - width) style.left = x - width;
      }

      _CSSPropertyOperations2['default'].setValueForStyles(this.node, style);

      document.body.appendChild(this.node);
    }

    this.portal = _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, _react2['default'].cloneElement(props.children, { closePortal: this.closePortal }), this.node, this.props.onUpdate);
  };

  Portal.prototype.render = function render() {
    if (this.props.openByClickOn) {
      return _react2['default'].cloneElement(this.props.openByClickOn, { onClick: this.handleWrapperClick });
    } else {
      return null;
    }
  };

  Portal.prototype.handleWrapperClick = function handleWrapperClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.active) {
      return;
    }

    var element = this.state.element;

    // element which call
    if (!element) {
      element = _reactDom2['default'].findDOMNode(e.target);
      element.style.color = this.props.iconColor;
    } else {
      if (this.rgb2hex(element.style.color) == this.props.iconColor && !this.props.isSortedOrFiltered) {
        element.style.color = this.props.iconDefColor;
      } else {
        element.style.color = this.props.iconColor;
      }
    }

    this.openPortal(this.props, e.clientX, e.clientY, element);
  };

  Portal.prototype.openPortal = function openPortal() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
    var x = arguments.length <= 1 || arguments[1] === undefined ? this.state.x : arguments[1];
    var y = arguments.length <= 2 || arguments[2] === undefined ? this.state.y : arguments[2];
    var element = arguments.length <= 3 || arguments[3] === undefined ? this.state.element : arguments[3];

    this.setState({ active: true, x: x, y: y, element: element });
    this.renderPortal(props, x, y);

    this.props.onOpen(this.node);
  };

  Portal.prototype.closePortal = function closePortal() {
    var _this2 = this;

    var isUnmounted = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    var resetPortalState = function resetPortalState() {
      if (_this2.node) {
        _reactDom2['default'].unmountComponentAtNode(_this2.node);
        document.body.removeChild(_this2.node);
      }
      _this2.portal = null;
      _this2.node = null;
      if (!isUnmounted) {
        _this2.setState({ active: false });
      }
    };

    if (this.state.element && !this.props.isSortedOrFiltered) {
      this.state.element.style.color = this.props.iconDefColor; // back to default color
    }

    if (this.state.active) {
      if (this.props.beforeClose) {
        this.props.beforeClose(this.node, resetPortalState);
      } else {
        resetPortalState();
      }

      this.props.onClose();
    }
  };

  //Function to convert hex format to a rgb color


  Portal.prototype.rgb2hex = function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
  };

  Portal.prototype.hex = function hex(x) {
    var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
  };

  Portal.prototype.handleOutsideMouseClick = function handleOutsideMouseClick(e) {
    if (!this.state.active) {
      return;
    }

    var root = (0, _reactDom.findDOMNode)(this.portal);
    if (root.contains(e.target) || e.button && e.button !== 0) {
      return;
    }

    e.stopPropagation();
    this.closePortal();
  };

  Portal.prototype.handleKeydown = function handleKeydown(e) {
    if (e.keyCode === KEYCODES.ESCAPE && this.state.active) {
      this.closePortal();
    }
  };

  return Portal;
}(_react2['default'].Component);

Portal.propTypes = {
  className: _react2['default'].PropTypes.string,
  style: _react2['default'].PropTypes.object,
  children: _react2['default'].PropTypes.element.isRequired,
  openByClickOn: _react2['default'].PropTypes.element,
  closeOnEsc: _react2['default'].PropTypes.bool,
  closeOnOutsideClick: _react2['default'].PropTypes.bool,
  isOpened: _react2['default'].PropTypes.bool,
  onOpen: _react2['default'].PropTypes.func,
  onClose: _react2['default'].PropTypes.func,
  beforeClose: _react2['default'].PropTypes.func,
  onUpdate: _react2['default'].PropTypes.func,
  isSortedOrFiltered: _react2['default'].PropTypes.bool,
  repositioning: _react2['default'].PropTypes.bool
};

Portal.defaultProps = {
  onOpen: function onOpen() {},
  onClose: function onClose() {},
  onUpdate: function onUpdate() {},
  isSortedOrFiltered: false,
  repositioning: true
};

exports['default'] = Portal;
module.exports = exports['default'];