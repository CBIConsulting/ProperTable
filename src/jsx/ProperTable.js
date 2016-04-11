import Table from "./components/table";
import formatters from "./formatters/formatters";
import messages from "./lang/messages";
import Dimensions from 'react-dimensions';

if (process.env.APP_ENV === 'browser') {
	require("../css/style.scss");
}

export default {
	Table: Dimensions()(Table),
	formatters: formatters,
	lang: messages
};