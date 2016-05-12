'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CSSPropertyOperations = require('react/lib/CSSPropertyOperations');

var _CSSPropertyOperations2 = _interopRequireDefault(_CSSPropertyOperations);

var _shallowCompare = require('react/lib/shallowCompare');

var _shallowCompare2 = _interopRequireDefault(_shallowCompare);

var _tween = require('tween.js');

var _tween2 = _interopRequireDefault(_tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Portal vs 2.1.1 All rights to Vojtech Miksu. This is a copy with a couple of modifications to fill the needs of this project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Portal).call(this));

    _this.state = {
      active: false,
      x: 0,
      y: 0,
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

  _createClass(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.closeOnEsc) {
        document.addEventListener('keydown', this.handleKeydown);
      }

      if (this.props.closeOnOutsideClick) {
        document.addEventListener('mouseup', this.handleOutsideMouseClick);
        document.addEventListener('touchstart', this.handleOutsideMouseClick);
      }

      window.addEventListener('resize', this.handleResize.bind(this));

      if (this.props.isOpened) {
        this.openPortal();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
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
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.closeOnEsc) {
        document.removeEventListener('keydown', this.handleKeydown);
      }

      if (this.props.closeOnOutsideClick) {
        document.removeEventListener('mouseup', this.handleOutsideMouseClick);
        document.removeEventListener('touchstart', this.handleOutsideMouseClick);
      }

      window.removeEventListener('resize', this.handleResize);

      this.closePortal(true);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _shallowCompare2['default'])(this, nextProps, nextState);
    }
  }, {
    key: 'handleResize',
    value: function handleResize(e) {
      // Move portal if rendered
      if (this.node) {
        this.closePortal();
        /**
        let rect = this.state.element.getBoundingClientRect(), top, left, x = this.state.x, y = this.state.y, node = this.node;
        	top = rect.top + 5;
        left = rect.left + 5;
        if (left >= (window.innerWidth - window.innerWidth * 0.15)) left = left - window.innerWidth * 0.15;
        	// Move node to new position with TWEEN animation
        	new TWEEN.Tween({ top: y, left: x, position: 'absolute'})
         .to({ top: top, left: left }, 300)
         .easing(TWEEN.Easing.Cubic.In)
         .onUpdate(function() {
             CSSPropertyOperations.setValueForStyles(node, {'top': this.top, left: this.left});
         })
         .start();
         */
      }
    }
  }, {
    key: 'renderPortal',
    value: function renderPortal(props) {
      var x = arguments.length <= 1 || arguments[1] === undefined ? this.state.x : arguments[1];
      var y = arguments.length <= 2 || arguments[2] === undefined ? this.state.y : arguments[2];

      var style = props.style || {};

      if (!this.node) {
        this.node = document.createElement('div');

        if (props.className) {
          this.node.className = props.className;
        }

        style.position = 'absolute';
        style.top = y + 5;
        style.left = x + 5;

        if (style.left >= window.innerWidth - window.innerWidth * 0.15) style.left = x - window.innerWidth * 0.15;
        _CSSPropertyOperations2['default'].setValueForStyles(this.node, style);

        document.body.appendChild(this.node);
      }

      this.portal = _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, _react2['default'].cloneElement(props.children, { closePortal: this.closePortal }), this.node, this.props.onUpdate);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.openByClickOn) {
        return _react2['default'].cloneElement(this.props.openByClickOn, { onClick: this.handleWrapperClick });
      } else {
        return null;
      }
    }
  }, {
    key: 'handleWrapperClick',
    value: function handleWrapperClick(e) {
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
    }
  }, {
    key: 'openPortal',
    value: function openPortal() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      var x = arguments.length <= 1 || arguments[1] === undefined ? this.state.x : arguments[1];
      var y = arguments.length <= 2 || arguments[2] === undefined ? this.state.y : arguments[2];
      var element = arguments.length <= 3 || arguments[3] === undefined ? this.state.element : arguments[3];

      console.time('open');
      this.setState({ active: true, x: x, y: y, element: element });
      this.renderPortal(props, x, y);

      this.props.onOpen(this.node);
    }
  }, {
    key: 'closePortal',
    value: function closePortal() {
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
    }

    //Function to convert hex format to a rgb color

  }, {
    key: 'rgb2hex',
    value: function rgb2hex(rgb) {
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      return "#" + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
    }
  }, {
    key: 'hex',
    value: function hex(x) {
      var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
      return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }
  }, {
    key: 'handleOutsideMouseClick',
    value: function handleOutsideMouseClick(e) {
      if (!this.state.active) {
        return;
      }

      var root = (0, _reactDom.findDOMNode)(this.portal);
      if (root.contains(e.target) || e.button && e.button !== 0) {
        return;
      }

      e.stopPropagation();
      this.closePortal();
    }
  }, {
    key: 'handleKeydown',
    value: function handleKeydown(e) {
      if (e.keyCode === KEYCODES.ESCAPE && this.state.active) {
        this.closePortal();
      }
    }
  }]);

  return Portal;
}(_react2['default'].Component);

exports['default'] = Portal;

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
  isSortedOrFiltered: _react2['default'].PropTypes.bool
};

Portal.defaultProps = {
  onOpen: function onOpen() {},
  onClose: function onClose() {},
  onUpdate: function onUpdate() {},
  isSortedOrFiltered: false
};
module.exports = exports['default'];