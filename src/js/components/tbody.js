import React from "react/addons";
import _ from "underscore";
import $ from "jquery";
import Settings from "../config/settings";

export default React.createClass({
	mixins: [React.addons.PureRendermixin],

	getDefaultProps() {
		return {
			headerHeight: null,
			fixedHeader: false,
			uniqueId: _.uniqueId('tbody-')
		};
	},

	getInitialState() {
		return {
			maxHeight: null,
			cHeight: null,
			currentFirstElement: 0,
			scrollBound: false
		}
	},

	componentDidMount() {
		this.computeHeights();
		this.bindScroll();
	},

	componentDidUpdate() {
		this.computeHeights();
	},

	bindScroll() {
		if (!this.state.scrollBound) {
			let $this = $(React.findDOMNode(this));

			$this.on('scroll', _.throttle(this.onScroll, 50));
		}
	},

	onScroll(e) {
		let $el = $(e.currentTarget);
		let position = $el.scrollTop();

		this.setElementInPosition(position);
	},

	setElementInPosition(scroll) {
		let mtop = null;

		if (!this.state.cHeight) {
			return;
		}

		if (this.props.fixedHeader && this.props.headerHeight > 0) {
			mtop = this.props.headerHeight - 2;
		}

		let scrollerheight = this.state.maxHeight - mtop - 2;
		let totalHeight = this.state.cHeight * this.props.children.length;
		let itemsPerVp = Math.ceil(scrollerheight / this.state.cHeight);

		let firstElement = Math.floor(scroll / this.state.cHeight) - 1;

		if (!scroll) {
			firstElement = 0;
		}

		this.setState({
			currentFirstElement: firstElement
		});
	},

	computeHeights() {
		if (!this.state.cHeight) {
			let $this = $(React.findDOMNode(this));
			let $row = $this.find('.propertable-row').eq(0);

			if ($row.height() != this.state.cHeight) {
				this.setState({
					maxHeight: $this.parents('.propertable-base').eq(0).height(),
					cHeight: $row.height()
				});
			}
		}
	},

	render() {
		let className = this.props.className;
		let toRender = this.props.children;
		let mtop = null;
		let afterCount = 0;
		let beforeCount = 0;
		let rendered = [];

		if (this.props.fixedHeader && this.props.headerHeight > 0) {
			mtop = this.props.headerHeight - 2;
		}

		let scrollerheight = this.state.maxHeight - mtop - 2;
		let totalHeight = this.state.cHeight * this.props.children.length;
		let itemsPerVp = Math.ceil((scrollerheight / this.state.cHeight) * 1.5);

		console.log(this.state.currentFirstElement);

		if (!this.state.cHeight) {
			rendered = this.props.children[0];
		} else {
			toRender = this.props.children.slice(this.state.currentFirstElement, this.state.currentFirstElement + itemsPerVp);
			afterCount = this.props.children.length - (this.state.currentFirstElement + itemsPerVp);
			beforeCount = this.state.currentFirstElement;

			if (beforeCount) {
				rendered.push(<div key={'before'+this.props.uniqueId} style={{height: this.state.cHeight * beforeCount}} />);
			}

			_.each(toRender, (item) => {
				rendered.push(item);
			});

			if (afterCount) {
				rendered.push(<div key={'after-'+this.props.uniqueId} style={{height: this.state.cHeight * afterCount}} />);
			}
		}

		return <div className="tbody-scroller" style={{
			marginTop: mtop,
			height: scrollerheight
		}}>
			<div className="propertable-container propertable-tbody-container">
				<div className="propertable-tbody" ref="body" >
					{rendered}
				</div>
			</div>
		</div>;
	}
});
