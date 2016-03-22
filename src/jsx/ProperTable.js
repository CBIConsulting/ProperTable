import Table from "./components/table";
import formatters from "./formatters/formatters";
import messages from "./lang/messages";
import Dimensions from 'react-dimensions';

require("../css/style.scss");

"use strict";

export default {
	Table: Dimensions()(Table),
	formatters: formatters,
	lang: messages
};
