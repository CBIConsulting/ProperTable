import langs from "../i18n/languages";
import _ from "underscore";
import $ from "jquery";
import numeral from "numeral";
import "numeral/languages";

class Settings	{
	constructor() {
		this.settings = {
			language: "en"
		};
		this.messages = {};
		this.numeral = numeral;
		this.setLang(this.settings.language);
	}

	set(settings) {
		let newsettings = $.extend(true, this.settings, settings);

		if (newsettings.lang != this.settings.lang) {
			this.setLang(newsettings.lang);
		}

		this.settings = newsettings;

		return this.settings;
	}

	setLang(lang = "en", msgs = {}) {
		let newmsgs = {};

		if (typeof langs[lang] !== 'undefined') {
			newmsgs = $.extend(true, this.messages, langs[lang]);
		}

		if (!_.isEmpty(msgs)) {
			newmsgs = $.extend(true, newmsgs, msgs);
		}

		this.settings.language = lang;
		try {
			numeral.language(lang);
		} catch (err) {
			console.warn('unable to set numeral language to '+lang);
		}

		this.messages = newmsgs;
	}

	msg(index) {
		return this.messages[index] || index;
	}
}

let instance = new Settings();

export default instance;