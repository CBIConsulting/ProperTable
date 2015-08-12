'use strict';

var body = document.body;

$(function () {
	ProperTable.Settings.set({
		language: 'en'
	});

	React.render(React.createElement(ProperTable.Table, null), body);
});