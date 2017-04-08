import Table from "./components/table";
import Portal from "./components/portal";
import formatters from "./formatters/formatters";
import messages from "./lang/messages";
import Dimensions from './lib/react-dimensions';
import {shallowEqualImmutable} from 'react-immutable-render-mixin';

if (process.env.APP_ENV === 'browser') {
	require("../css/style.scss");
}

export default {
	Table: Dimensions()(Table),
	Portal: Portal,
	formatters: formatters,
	lang: messages
};