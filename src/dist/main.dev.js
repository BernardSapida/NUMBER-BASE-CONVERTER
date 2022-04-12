"use strict";

var _vue = require("vue");

var _vueFontawesome = require("@fortawesome/vue-fontawesome");

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _App = _interopRequireDefault(require("./App.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.fas);

(0, _vue.createApp)(_App["default"]).component('fa', _vueFontawesome.FontAwesomeIcon).mount('#app');