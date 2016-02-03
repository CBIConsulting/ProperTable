import React from "react/addons";
import _ from "underscore";
import $ from "jquery";

export default React.createClass({
	mixins: [React.addons.PureRendermixin],

	getDefaultProps() {
		return {
			headerHeight: null,
			fixedHeader: false,
			uniqueId: _.uniqueId('tbody-'),
			onScroll: null,
			totalItems: null,
			onWidth: null,
			parentWidth: null,
			scrollPadding: null
		};
	},

	getInitialState() {
		return {
			maxHeight: null,
			cHeight: null,
			currentFirstElement: 0,
			scrollBound: false,
			mtop: null,
			scrollerheight: null,
			totalHeight: null,
			itemsPerVp: null
		}
	},

	componentDidMount() {
		this.computeHeights();
		this.bindScroll();
	},

	componentDidUpdate() {
		let mtop = 0;

		if (this.props.fixedHeader && this.props.headerHeight > 0) {
			mtop = this.props.headerHeight - 2;
		}

		if (mtop != this.state.mtop) {
			this.setState({
				mtop: mtop,
				cHeight: null
			});
		} else {
			this.computeHeights();
		}
	},

	bindScroll() {
		if (!this.state.scrollBound) {
			let $this = $(React.findDOMNode(this));

			$this.on('scroll', _.throttle(this.onScroll, 55));
			$(window).on('resize', _.throttle(() => {
				this.setState({
					maxHeight: null,
					cHeight: null,
					mtop: null,
					scrollerheight: null,
					totalHeight: null,
					itemsPerVp: null
				});
			}, 50));
		}
	},

	onScroll(e) {
		let $el = $(e.currentTarget);
		let position = $el.scrollTop();

		this.setElementInPosition(position);
	},

	setElementInPosition(scroll) {
		let itemsPerVp = this.state.itemsPerVp;

		let firstElement = Math.floor(scroll / this.state.cHeight) - 1;

		if (!scroll) {
			firstElement = 0;
		}

		if ((firstElement + itemsPerVp) >= this.props.totalItems) {
			firstElement = this.props.totalItems - itemsPerVp;
		}

		if (firstElement < 0) {
			firstElement = 0;
		}

		this.setState({
			currentFirstElement: firstElement
		}, () => {
			if (typeof this.props.onScroll == 'function') {
				this.props.onScroll(firstElement, itemsPerVp);
			}
		});
	},

	computeHeights() {
		if (!this.state.cHeight) {
			let $this = $(React.findDOMNode(this));
			let $row = $this.find('.propertable-row').eq(0);
			let $cells = $row.children()
			let widths = [];
			let sbound = this.state.scrollBound;

			if ($row.height() != this.state.cHeight) {
				let mtop = this.state.mtop;
				let maxHeight = $this.parents('.propertable-base').eq(0).height();
				let cHeight = $row.height();
				let scrollerheight = maxHeight;
				let totalHeight = cHeight * this.props.totalItems;
				let itemsPerVp = Math.ceil((scrollerheight / cHeight) * 1);

				$cells.each(function() {
					let $cell = $(this);
					widths.push($cell.width());
				});

				this.setState({
					mtop: mtop,
					maxHeight: maxHeight,
					cHeight: cHeight,
					scrollerheight: scrollerheight,
					totalHeight: totalHeight,
					itemsPerVp: itemsPerVp
				}, () => {
					if (!sbound) {
						this.setElementInPosition(0);
					}
				});

				if (typeof this.props.onWidth === 'function') {
					this.props.onWidth(widths);
				}
			}
		}
	},

	render() {
		let toRender = this.props.children;
		let afterCount = 0;
		let beforeCount = 0;
		let rendered = [];
		let mtop = this.state.mtop;
		let scrollerheight = this.state.scrollerheight;
		let itemsPerVp = this.state.itemsPerVp;

		if (!this.state.cHeight) {
			rendered = _.first(this.props.children);
		} else {
			toRender = this.props.children;
			afterCount = this.props.totalItems - (this.state.currentFirstElement + itemsPerVp);
			beforeCount = this.state.currentFirstElement;

			if (afterCount < 0) {
				afterCount = 0;
			}

			if (beforeCount < 0) {
				beforeCount = 0;
			}

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
			paddingTop: mtop,
			height: scrollerheight,
			width: this.props.parentWidth
		}}>
			<div className="propertable-container propertable-tbody-container" style={{
				width: this.props.parentWidth - this.props.scrollPadding
			}}>
				<div className="propertable-tbody" ref="body" >
					{rendered}
				</div>
			</div>
		</div>;
	}
});
