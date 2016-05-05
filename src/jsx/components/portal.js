/**
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

import React from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations';
import shallowCompare from 'react/lib/shallowCompare';
import TWEEN from 'tween.js';

const KEYCODES = {
  ESCAPE: 27
};

export default class Portal extends React.Component {

  constructor() {
    super();
    this.state = {
    	active: false,
    	x: 0,
    	y: 0,
    	element: null  // element clicked to open the portal
    };
    this.handleWrapperClick = this.handleWrapperClick.bind(this);
    this.closePortal = this.closePortal.bind(this);
    this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.portal = null;
    this.node = null;
  }

  componentDidMount() {
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

  componentWillReceiveProps(newProps) {
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

  componentWillUnmount() {
    if (this.props.closeOnEsc) {
      document.removeEventListener('keydown', this.handleKeydown);
    }

    if (this.props.closeOnOutsideClick) {
      document.removeEventListener('mouseup', this.handleOutsideMouseClick);
      document.removeEventListener('touchstart', this.handleOutsideMouseClick);
    }

    window.removeEventListener('resize', this.handleResize)

    this.closePortal(true);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleResize(e) {
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

  renderPortal(props, x = this.state.x, y = this.state.y) {
  	let style = props.style || {};

    if (!this.node) {
      	this.node = document.createElement('div');

      	if (props.className) {
        	this.node.className = props.className;
      	}

	  	style.position = 'absolute';
	  	style.top = y + 5;
	  	style.left = x + 5;

	  	if (style.left >= (window.innerWidth - window.innerWidth * 0.15)) style.left = x - window.innerWidth * 0.15;
    	CSSPropertyOperations.setValueForStyles(this.node, style);

      	document.body.appendChild(this.node);
    }

    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(this, React.cloneElement(props.children, {closePortal: this.closePortal}), this.node, this.props.onUpdate);
  }

  render() {
    if (this.props.openByClickOn) {
      return React.cloneElement(this.props.openByClickOn, {onClick: this.handleWrapperClick});
    } else {
      return null;
    }
  }

  handleWrapperClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.active) { return; }

    let element = this.state.element;

    // element which call
    if (!element) {
    	element = ReactDOM.findDOMNode(e.target);
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

  openPortal(props = this.props, x = this.state.x, y = this.state.y, element = this.state.element) {
    console.time('open')
    this.setState({active: true, x: x, y: y, element: element});
    this.renderPortal(props, x, y);

    this.props.onOpen(this.node);
  }

  closePortal(isUnmounted = false) {
    const resetPortalState = () => {
      if (this.node) {
        ReactDOM.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
      }
      this.portal = null;
      this.node = null;
      if (!isUnmounted) {
        this.setState({active: false});
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
  rgb2hex(rgb) {
 	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 	return "#" + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
  }

  hex(x) {
  	let hexDigits = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
   	return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
  }

  handleOutsideMouseClick(e) {
    if (!this.state.active) { return; }

    const root = findDOMNode(this.portal);
    if (root.contains(e.target) || (e.button && e.button !== 0)) { return; }

    e.stopPropagation();
    this.closePortal();
  }

  handleKeydown(e) {
    if (e.keyCode === KEYCODES.ESCAPE && this.state.active) {
      this.closePortal();
    }
  }

}

Portal.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.element.isRequired,
  openByClickOn: React.PropTypes.element,
  closeOnEsc: React.PropTypes.bool,
  closeOnOutsideClick: React.PropTypes.bool,
  isOpened: React.PropTypes.bool,
  onOpen: React.PropTypes.func,
  onClose: React.PropTypes.func,
  beforeClose: React.PropTypes.func,
  onUpdate: React.PropTypes.func,
  isSortedOrFiltered: React.PropTypes.bool
};

Portal.defaultProps = {
  onOpen: () => {},
  onClose: () => {},
  onUpdate: () => {},
  isSortedOrFiltered: false
};