import Table from "./components/table";
import Portal from "./components/portal";
import formatters from "./formatters/formatters";
import messages from "./lang/messages";

if (process.env.APP_ENV === 'browser') {
	// require("../css/style.scss");
}

export default {
	Table: Table,
	Portal: Portal,
	formatters: formatters,
	lang: messages
};