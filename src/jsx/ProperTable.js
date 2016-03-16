import Table from "./components/table";
import formatters from "./formatters/formatters";
import messages from "./lang/messages";

require("../css/style.scss");

"use strict";

export default {
	Table: Table,
	formatters: formatters,
	lang: messages
};
