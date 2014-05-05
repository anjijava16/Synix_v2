/*
 Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
 Available via Academic Free License >= 2.1 OR the modified BSD license.
 see: http://dojotoolkit.org/license for details
 */

/*
 This is an optimized version of Dojo, built for deployment and not for
 development. To get sources and documentation, please visit:
 
 http://dojotoolkit.org
 */

//>>built
require({cache: {"dijit/registry": function() {
define(["dojo/_base/array", "dojo/_base/window", "./main"], function(_1, _2, _3) {
var _4 = {}, _5 = {};
        var _6 = {length: 0, add: function(_7) {
        if (_5[_7.id]) {
        throw new Error("Tried to register widget with id==" + _7.id + " but that id is already registered");
        }
        _5[_7.id] = _7;
                this.length++;
        }, remove: function(id) {
        if (_5[id]) {
        delete _5[id];
                this.length--;
        }
        }, byId: function(id) {
        return typeof id == "string" ? _5[id] : id;
        }, byNode: function(_8) {
        return _5[_8.getAttribute("widgetId")];
        }, toArray: function() {
        var ar = [];
                for (var id in _5) {
        ar.push(_5[id]);
        }
        return ar;
        }, getUniqueId: function(_9) {
        var id;
                do {
                id = _9 + "_" + (_9 in _4 ? ++_4[_9] : _4[_9] = 0);
                } while (_5[id]);
                return _3._scopeName == "dijit" ? id : _3._scopeName + "_" + id;
        }, findWidgets: function(_a, _b) {
        var _c = [];
                function _d(_e) {
                for (var _f = _e.firstChild; _f; _f = _f.nextSibling) {
                if (_f.nodeType == 1) {
                var _10 = _f.getAttribute("widgetId");
                        if (_10) {
                var _11 = _5[_10];
                        if (_11) {
                _c.push(_11);
                }
                } else {
                if (_f !== _b) {
                _d(_f);
                }
                }
                }
                }
                }
        ;
                _d(_a);
                return _c;
        }, _destroyAll: function() {
        _3._curFocus = null;
                _3._prevFocus = null;
                _3._activeStack = [];
                _1.forEach(_6.findWidgets(_2.body()), function(_12) {
                if (!_12._destroyed) {
                if (_12.destroyRecursive) {
                _12.destroyRecursive();
                } else {
                if (_12.destroy) {
                _12.destroy();
                }
                }
                }
                });
        }, getEnclosingWidget: function(_13) {
        while (_13) {
        var id = _13.nodeType == 1 && _13.getAttribute("widgetId");
                if (id) {
        return _5[id];
        }
        _13 = _13.parentNode;
        }
        return null;
        }, _hash: _5};
        _3.registry = _6;
        return _6;
});
}, "dijit/main": function() {
define(["dojo/_base/kernel"], function(_14) {
return _14.dijit;
});
}, "dijit/MenuItem": function() {
define(["dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/_base/kernel", "dojo/sniff", "dojo/_base/lang", "./_Widget", "./_TemplatedMixin", "./_Contained", "./_CssStateMixin", "dojo/text!./templates/MenuItem.html"], function(_15, dom, _16, _17, _18, has, _19, _1a, _1b, _1c, _1d, _1e) {
var _1f = _15("dijit.MenuItem" + (has("dojo-bidi") ? "_NoBidi" : ""), [_1a, _1b, _1c, _1d], {templateString: _1e, baseClass: "dijitMenuItem", label: "", _setLabelAttr: function(val) {
this._set("label", val);
        var _20 = "";
        var _21;
        var ndx = val.search(/{\S}/);
        if (ndx >= 0) {
_20 = val.charAt(ndx + 1);
        var _22 = val.substr(0, ndx);
        var _23 = val.substr(ndx + 3);
        _21 = _22 + _20 + _23;
        val = _22 + "<span class=\"dijitMenuItemShortcutKey\">" + _20 + "</span>" + _23;
} else {
_21 = val;
}
this.domNode.setAttribute("aria-label", _21 + " " + this.accelKey);
        this.containerNode.innerHTML = val;
        this._set("shortcutKey", _20);
}, iconClass: "dijitNoIcon", _setIconClassAttr: {node: "iconNode", type: "class"}, accelKey: "", disabled: false, _fillContent: function(_24) {
if (_24 && !("label" in this.params)) {
this._set("label", _24.innerHTML);
}
}, buildRendering: function() {
this.inherited(arguments);
        var _25 = this.id + "_text";
        _16.set(this.containerNode, "id", _25);
        if (this.accelKeyNode) {
_16.set(this.accelKeyNode, "id", this.id + "_accel");
}
dom.setSelectable(this.domNode, false);
}, onClick: function() {
}, focus: function() {
try {
if (has("ie") == 8) {
this.containerNode.focus();
}
this.focusNode.focus();
} catch (e) {
}
}, _setSelected: function(_26) {
_17.toggle(this.domNode, "dijitMenuItemSelected", _26);
}, setLabel: function(_27) {
_18.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.", "", "2.0");
        this.set("label", _27);
}, setDisabled: function(_28) {
_18.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.", "", "2.0");
        this.set("disabled", _28);
}, _setDisabledAttr: function(_29) {
this.focusNode.setAttribute("aria-disabled", _29 ? "true" : "false");
        this._set("disabled", _29);
}, _setAccelKeyAttr: function(_2a) {
if (this.accelKeyNode) {
this.accelKeyNode.style.display = _2a ? "" : "none";
        this.accelKeyNode.innerHTML = _2a;
        _16.set(this.containerNode, "colSpan", _2a ? "1" : "2");
}
this._set("accelKey", _2a);
}});
        if (has("dojo-bidi")) {
_1f = _15("dijit.MenuItem", _1f, {_setLabelAttr: function(val) {
this.inherited(arguments);
        if (this.textDir === "auto") {
this.applyTextDir(this.textDirNode);
}
}});
}
return _1f;
});
}, "dijit/_Widget": function() {
define(["dojo/aspect", "dojo/_base/config", "dojo/_base/connect", "dojo/_base/declare", "dojo/has", "dojo/_base/kernel", "dojo/_base/lang", "dojo/query", "dojo/ready", "./registry", "./_WidgetBase", "./_OnDijitClickMixin", "./_FocusMixin", "dojo/uacss", "./hccss"], function(_2b, _2c, _2d, _2e, has, _2f, _30, _31, _32, _33, _34, _35, _36) {
function _37() {
}
;
        function _38(_39) {
        return function(obj, _3a, _3b, _3c) {
        if (obj && typeof _3a == "string" && obj[_3a] == _37) {
        return obj.on(_3a.substring(2).toLowerCase(), _30.hitch(_3b, _3c));
        }
        return _39.apply(_2d, arguments);
        };
        }
;
        _2b.around(_2d, "connect", _38);
        if (_2f.connect) {
_2b.around(_2f, "connect", _38);
}
var _3d = _2e("dijit._Widget", [_34, _35, _36], {onClick: _37, onDblClick: _37, onKeyDown: _37, onKeyPress: _37, onKeyUp: _37, onMouseDown: _37, onMouseMove: _37, onMouseOut: _37, onMouseOver: _37, onMouseLeave: _37, onMouseEnter: _37, onMouseUp: _37, constructor: function(_3e) {
this._toConnect = {};
        for (var _3f in _3e) {
if (this[_3f] === _37) {
this._toConnect[_3f.replace(/^on/, "").toLowerCase()] = _3e[_3f];
        delete _3e[_3f];
}
}
}, postCreate: function() {
this.inherited(arguments);
        for (var _40 in this._toConnect) {
this.on(_40, this._toConnect[_40]);
}
delete this._toConnect;
}, on: function(_41, _42) {
if (this[this._onMap(_41)] === _37) {
return _2d.connect(this.domNode, _41.toLowerCase(), this, _42);
}
return this.inherited(arguments);
}, _setFocusedAttr: function(val) {
this._focused = val;
        this._set("focused", val);
}, setAttribute: function(_43, _44) {
_2f.deprecated(this.declaredClass + "::setAttribute(attr, value) is deprecated. Use set() instead.", "", "2.0");
        this.set(_43, _44);
}, attr: function(_45, _46) {
if (_2c.isDebug) {
var _47 = arguments.callee._ach || (arguments.callee._ach = {}), _48 = (arguments.callee.caller || "unknown caller").toString();
        if (!_47[_48]) {
_2f.deprecated(this.declaredClass + "::attr() is deprecated. Use get() or set() instead, called from " + _48, "", "2.0");
        _47[_48] = true;
}
}
var _49 = arguments.length;
        if (_49 >= 2 || typeof _45 === "object") {
return this.set.apply(this, arguments);
} else {
return this.get(_45);
}
}, getDescendants: function() {
_2f.deprecated(this.declaredClass + "::getDescendants() is deprecated. Use getChildren() instead.", "", "2.0");
        return this.containerNode ? _31("[widgetId]", this.containerNode).map(_33.byNode) : [];
}, _onShow: function() {
this.onShow();
}, onShow: function() {
}, onHide: function() {
}, onClose: function() {
return true;
}});
        if (has("dijit-legacy-requires")) {
_32(0, function() {
var _4a = ["dijit/_base"];
        require(_4a);
});
}
return _3d;
});
}, "dijit/_WidgetBase": function() {
define(["require", "dojo/_base/array", "dojo/aspect", "dojo/_base/config", "dojo/_base/connect", "dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/dom-style", "dojo/has", "dojo/_base/kernel", "dojo/_base/lang", "dojo/on", "dojo/ready", "dojo/Stateful", "dojo/topic", "dojo/_base/window", "./Destroyable", "dojo/has!dojo-bidi?./_BidiMixin", "./registry"], function(_4b, _4c, _4d, _4e, _4f, _50, dom, _51, _52, _53, _54, _55, has, _56, _57, on, _58, _59, _5a, win, _5b, _5c, _5d) {
has.add("dijit-legacy-requires", !_56.isAsync);
        has.add("dojo-bidi", false);
        if (has("dijit-legacy-requires")) {
_58(0, function() {
var _5e = ["dijit/_base/manager"];
        _4b(_5e);
});
}
var _5f = {};
        function _60(obj) {
        var ret = {};
                for (var _61 in obj) {
        ret[_61.toLowerCase()] = true;
        }
        return ret;
        }
;
        function _62(_63) {
        return function(val) {
        _51[val ? "set" : "remove"](this.domNode, _63, val);
                this._set(_63, val);
        };
        }
;
        var _64 = _50("dijit._WidgetBase", [_59, _5b], {id: "", _setIdAttr: "domNode", lang: "", _setLangAttr: _62("lang"), dir: "", _setDirAttr: _62("dir"), "class": "", _setClassAttr: {node: "domNode", type: "class"}, style: "", title: "", tooltip: "", baseClass: "", srcNodeRef: null, domNode: null, containerNode: null, ownerDocument: null, _setOwnerDocumentAttr: function(val) {
        this._set("ownerDocument", val);
        }, attributeMap: {}, _blankGif: _4e.blankGif || _4b.toUrl("dojo/resources/blank.gif"), _introspect: function() {
        var _65 = this.constructor;
                if (!_65._setterAttrs) {
        var _66 = _65.prototype, _67 = _65._setterAttrs = [], _68 = (_65._onMap = {});
                for (var _69 in _66.attributeMap) {
        _67.push(_69);
        }
        for (_69 in _66) {
        if (/^on/.test(_69)) {
        _68[_69.substring(2).toLowerCase()] = _69;
        }
        if (/^_set[A-Z](.*)Attr$/.test(_69)) {
        _69 = _69.charAt(4).toLowerCase() + _69.substr(5, _69.length - 9);
                if (!_66.attributeMap || !(_69 in _66.attributeMap)) {
        _67.push(_69);
        }
        }
        }
        }
        }, postscript: function(_6a, _6b) {
        this.create(_6a, _6b);
        }, create: function(_6c, _6d) {
        this._introspect();
                this.srcNodeRef = dom.byId(_6d);
                this._connects = [];
                this._supportingWidgets = [];
                if (this.srcNodeRef && (typeof this.srcNodeRef.id == "string")) {
        this.id = this.srcNodeRef.id;
        }
        if (_6c) {
        this.params = _6c;
                _57.mixin(this, _6c);
        }
        this.postMixInProperties();
                if (!this.id) {
        this.id = _5d.getUniqueId(this.declaredClass.replace(/\./g, "_"));
                if (this.params) {
        delete this.params.id;
        }
        }
        this.ownerDocument = this.ownerDocument || (this.srcNodeRef ? this.srcNodeRef.ownerDocument : document);
                this.ownerDocumentBody = win.body(this.ownerDocument);
                _5d.add(this);
                this.buildRendering();
                var _6e;
                if (this.domNode) {
        this._applyAttributes();
                var _6f = this.srcNodeRef;
                if (_6f && _6f.parentNode && this.domNode !== _6f) {
        _6f.parentNode.replaceChild(this.domNode, _6f);
                _6e = true;
        }
        this.domNode.setAttribute("widgetId", this.id);
        }
        this.postCreate();
                if (_6e) {
        delete this.srcNodeRef;
        }
        this._created = true;
        }, _applyAttributes: function() {
        var _70 = {};
                for (var key in this.params || {}) {
        _70[key] = this._get(key);
        }
        _4c.forEach(this.constructor._setterAttrs, function(key) {
        if (!(key in _70)) {
        var val = this._get(key);
                if (val) {
        this.set(key, val);
        }
        }
        }, this);
                for (key in _70) {
        this.set(key, _70[key]);
        }
        }, postMixInProperties: function() {
        }, buildRendering: function() {
        if (!this.domNode) {
        this.domNode = this.srcNodeRef || this.ownerDocument.createElement("div");
        }
        if (this.baseClass) {
        var _71 = this.baseClass.split(" ");
                if (!this.isLeftToRight()) {
        _71 = _71.concat(_4c.map(_71, function(_72) {
        return _72 + "Rtl";
        }));
        }
        _52.add(this.domNode, _71);
        }
        }, postCreate: function() {
        }, startup: function() {
        if (this._started) {
        return;
        }
        this._started = true;
                _4c.forEach(this.getChildren(), function(obj) {
                if (!obj._started && !obj._destroyed && _57.isFunction(obj.startup)) {
                obj.startup();
                        obj._started = true;
                }
                });
        }, destroyRecursive: function(_73) {
        this._beingDestroyed = true;
                this.destroyDescendants(_73);
                this.destroy(_73);
        }, destroy: function(_74) {
        this._beingDestroyed = true;
                this.uninitialize();
                function _75(w) {
                if (w.destroyRecursive) {
                w.destroyRecursive(_74);
                } else {
                if (w.destroy) {
                w.destroy(_74);
                }
                }
                }
        ;
                _4c.forEach(this._connects, _57.hitch(this, "disconnect"));
                _4c.forEach(this._supportingWidgets, _75);
                if (this.domNode) {
        _4c.forEach(_5d.findWidgets(this.domNode, this.containerNode), _75);
        }
        this.destroyRendering(_74);
                _5d.remove(this.id);
                this._destroyed = true;
        }, destroyRendering: function(_76) {
        if (this.bgIframe) {
        this.bgIframe.destroy(_76);
                delete this.bgIframe;
        }
        if (this.domNode) {
        if (_76) {
        _51.remove(this.domNode, "widgetId");
        } else {
        _53.destroy(this.domNode);
        }
        delete this.domNode;
        }
        if (this.srcNodeRef) {
        if (!_76) {
        _53.destroy(this.srcNodeRef);
        }
        delete this.srcNodeRef;
        }
        }, destroyDescendants: function(_77) {
        _4c.forEach(this.getChildren(), function(_78) {
        if (_78.destroyRecursive) {
        _78.destroyRecursive(_77);
        }
        });
        }, uninitialize: function() {
        return false;
        }, _setStyleAttr: function(_79) {
        var _7a = this.domNode;
                if (_57.isObject(_79)) {
        _55.set(_7a, _79);
        } else {
        if (_7a.style.cssText) {
        _7a.style.cssText += "; " + _79;
        } else {
        _7a.style.cssText = _79;
        }
        }
        this._set("style", _79);
        }, _attrToDom: function(_7b, _7c, _7d) {
        _7d = arguments.length >= 3 ? _7d : this.attributeMap[_7b];
                _4c.forEach(_57.isArray(_7d) ? _7d : [_7d], function(_7e) {
                var _7f = this[_7e.node || _7e || "domNode"];
                        var _80 = _7e.type || "attribute";
                        switch (_80) {
                case "attribute":
                        if (_57.isFunction(_7c)) {
                _7c = _57.hitch(this, _7c);
                }
                var _81 = _7e.attribute ? _7e.attribute : (/^on[A-Z][a-zA-Z]*$/.test(_7b) ? _7b.toLowerCase() : _7b);
                        if (_7f.tagName) {
                _51.set(_7f, _81, _7c);
                } else {
                _7f.set(_81, _7c);
                }
                break;
                        case "innerText":
                        _7f.innerHTML = "";
                        _7f.appendChild(this.ownerDocument.createTextNode(_7c));
                        break;
                        case "innerHTML":
                        _7f.innerHTML = _7c;
                        break;
                        case "class":
                        _52.replace(_7f, _7c, this[_7b]);
                        break;
                }
                }, this);
        }, get: function(_82) {
        var _83 = this._getAttrNames(_82);
                return this[_83.g] ? this[_83.g]() : this._get(_82);
        }, set: function(_84, _85) {
        if (typeof _84 === "object") {
        for (var x in _84) {
        this.set(x, _84[x]);
        }
        return this;
        }
        var _86 = this._getAttrNames(_84), _87 = this[_86.s];
                if (_57.isFunction(_87)) {
        var _88 = _87.apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
        var _89 = this.focusNode && !_57.isFunction(this.focusNode) ? "focusNode" : "domNode", tag = this[_89] && this[_89].tagName, _8a = tag && (_5f[tag] || (_5f[tag] = _60(this[_89]))), map = _84 in this.attributeMap ? this.attributeMap[_84] : _86.s in this ? this[_86.s] : ((_8a && _86.l in _8a && typeof _85 != "function") || /^aria-|^data-|^role$/.test(_84)) ? _89 : null;
                if (map != null) {
        this._attrToDom(_84, _85, map);
        }
        this._set(_84, _85);
        }
        return _88 || this;
        }, _attrPairNames: {}, _getAttrNames: function(_8b) {
        var apn = this._attrPairNames;
                if (apn[_8b]) {
        return apn[_8b];
        }
        var uc = _8b.replace(/^[a-z]|-[a-zA-Z]/g, function(c) {
        return c.charAt(c.length - 1).toUpperCase();
        });
                return (apn[_8b] = {n: _8b + "Node", s: "_set" + uc + "Attr", g: "_get" + uc + "Attr", l: uc.toLowerCase()});
        }, _set: function(_8c, _8d) {
        var _8e = this[_8c];
                this[_8c] = _8d;
                if (this._created && _8d !== _8e) {
        if (this._watchCallbacks) {
        this._watchCallbacks(_8c, _8e, _8d);
        }
        this.emit("attrmodified-" + _8c, {detail: {prevValue: _8e, newValue: _8d}});
        }
        }, _get: function(_8f) {
        return this[_8f];
        }, emit: function(_90, _91, _92) {
        _91 = _91 || {};
                if (_91.bubbles === undefined) {
        _91.bubbles = true;
        }
        if (_91.cancelable === undefined) {
        _91.cancelable = true;
        }
        if (!_91.detail) {
        _91.detail = {};
        }
        _91.detail.widget = this;
                var ret, _93 = this["on" + _90];
                if (_93) {
        ret = _93.apply(this, _92 ? _92 : [_91]);
        }
        if (this._started && !this._beingDestroyed) {
        on.emit(this.domNode, _90.toLowerCase(), _91);
        }
        return ret;
        }, on: function(_94, _95) {
        var _96 = this._onMap(_94);
                if (_96) {
        return _4d.after(this, _96, _95, true);
        }
        return this.own(on(this.domNode, _94, _95))[0];
        }, _onMap: function(_97) {
        var _98 = this.constructor, map = _98._onMap;
                if (!map) {
        map = (_98._onMap = {});
                for (var _99 in _98.prototype) {
        if (/^on/.test(_99)) {
        map[_99.replace(/^on/, "").toLowerCase()] = _99;
        }
        }
        }
        return map[typeof _97 == "string" && _97.toLowerCase()];
        }, toString: function() {
        return "[Widget " + this.declaredClass + ", " + (this.id || "NO ID") + "]";
        }, getChildren: function() {
        return this.containerNode ? _5d.findWidgets(this.containerNode) : [];
        }, getParent: function() {
        return _5d.getEnclosingWidget(this.domNode.parentNode);
        }, connect: function(obj, _9a, _9b) {
        return this.own(_4f.connect(obj, _9a, this, _9b))[0];
        }, disconnect: function(_9c) {
        _9c.remove();
        }, subscribe: function(t, _9d) {
        return this.own(_5a.subscribe(t, _57.hitch(this, _9d)))[0];
        }, unsubscribe: function(_9e) {
        _9e.remove();
        }, isLeftToRight: function() {
        return this.dir ? (this.dir == "ltr") : _54.isBodyLtr(this.ownerDocument);
        }, isFocusable: function() {
        return this.focus && (_55.get(this.domNode, "display") != "none");
        }, placeAt: function(_9f, _a0) {
        var _a1 = !_9f.tagName && _5d.byId(_9f);
                if (_a1 && _a1.addChild && (!_a0 || typeof _a0 === "number")) {
        _a1.addChild(this, _a0);
        } else {
        var ref = _a1 ? (_a1.containerNode && !/after|before|replace/.test(_a0 || "") ? _a1.containerNode : _a1.domNode) : dom.byId(_9f, this.ownerDocument);
                _53.place(this.domNode, ref, _a0);
                if (!this._started && (this.getParent() || {})._started) {
        this.startup();
        }
        }
        return this;
        }, defer: function(fcn, _a2) {
        var _a3 = setTimeout(_57.hitch(this, function() {
        if (!_a3) {
        return;
        }
        _a3 = null;
                if (!this._destroyed) {
        _57.hitch(this, fcn)();
        }
        }), _a2 || 0);
                return {remove: function() {
                if (_a3) {
                clearTimeout(_a3);
                        _a3 = null;
                }
                return null;
                }};
        }});
        if (has("dojo-bidi")) {
_64.extend(_5c);
}
return _64;
});
}, "dojo/Stateful": function() {
define(["./_base/declare", "./_base/lang", "./_base/array", "./when"], function(_a4, _a5, _a6, _a7) {
return _a4("dojo.Stateful", null, {_attrPairNames: {}, _getAttrNames: function(_a8) {
var apn = this._attrPairNames;
        if (apn[_a8]) {
return apn[_a8];
}
return (apn[_a8] = {s: "_" + _a8 + "Setter", g: "_" + _a8 + "Getter"});
}, postscript: function(_a9) {
if (_a9) {
this.set(_a9);
}
}, _get: function(_aa, _ab) {
return typeof this[_ab.g] === "function" ? this[_ab.g]() : this[_aa];
}, get: function(_ac) {
return this._get(_ac, this._getAttrNames(_ac));
}, set: function(_ad, _ae) {
if (typeof _ad === "object") {
for (var x in _ad) {
if (_ad.hasOwnProperty(x) && x != "_watchCallbacks") {
this.set(x, _ad[x]);
}
}
return this;
}
var _af = this._getAttrNames(_ad), _b0 = this._get(_ad, _af), _b1 = this[_af.s], _b2;
        if (typeof _b1 === "function") {
_b2 = _b1.apply(this, Array.prototype.slice.call(arguments, 1));
} else {
this[_ad] = _ae;
}
if (this._watchCallbacks) {
var _b3 = this;
        _a7(_b2, function() {
        _b3._watchCallbacks(_ad, _b0, _ae);
        });
}
return this;
}, _changeAttrValue: function(_b4, _b5) {
var _b6 = this.get(_b4);
        this[_b4] = _b5;
        if (this._watchCallbacks) {
this._watchCallbacks(_b4, _b6, _b5);
}
return this;
}, watch: function(_b7, _b8) {
var _b9 = this._watchCallbacks;
        if (!_b9) {
var _ba = this;
        _b9 = this._watchCallbacks = function(_bb, _bc, _bd, _be) {
        var _bf = function(_c0) {
        if (_c0) {
        _c0 = _c0.slice();
                for (var i = 0, l = _c0.length; i < l; i++) {
        _c0[i].call(_ba, _bb, _bc, _bd);
        }
        }
        };
                _bf(_b9["_" + _bb]);
                if (!_be) {
        _bf(_b9["*"]);
        }
        };
}
if (!_b8 && typeof _b7 === "function") {
_b8 = _b7;
        _b7 = "*";
} else {
_b7 = "_" + _b7;
}
var _c1 = _b9[_b7];
        if (typeof _c1 !== "object") {
_c1 = _b9[_b7] = [];
}
_c1.push(_b8);
        var _c2 = {};
        _c2.unwatch = _c2.remove = function() {
        var _c3 = _a6.indexOf(_c1, _b8);
                if (_c3 > - 1) {
        _c1.splice(_c3, 1);
        }
        };
        return _c2;
}});
});
}, "dijit/Destroyable": function() {
define(["dojo/_base/array", "dojo/aspect", "dojo/_base/declare"], function(_c4, _c5, _c6) {
return _c6("dijit.Destroyable", null, {destroy: function(_c7) {
this._destroyed = true;
}, own: function() {
_c4.forEach(arguments, function(_c8) {
var _c9 = "destroyRecursive" in _c8 ? "destroyRecursive" : "destroy" in _c8 ? "destroy" : "remove";
        var odh = _c5.before(this, "destroy", function(_ca) {
        _c8[_c9](_ca);
        });
        var hdh = _c5.after(_c8, _c9, function() {
        odh.remove();
                hdh.remove();
        }, true);
}, this);
        return arguments;
}});
});
}, "dijit/_OnDijitClickMixin": function() {
define(["dojo/on", "dojo/_base/array", "dojo/keys", "dojo/_base/declare", "dojo/has", "./a11yclick"], function(on, _cb, _cc, _cd, has, _ce) {
var ret = _cd("dijit._OnDijitClickMixin", null, {connect: function(obj, _cf, _d0) {
return this.inherited(arguments, [obj, _cf == "ondijitclick" ? _ce : _cf, _d0]);
}});
        ret.a11yclick = _ce;
        return ret;
});
}, "dijit/a11yclick": function() {
define(["dojo/keys", "dojo/mouse", "dojo/on", "dojo/touch"], function(_d1, _d2, on, _d3) {
function _d4(e) {
if ((e.keyCode === _d1.ENTER || e.keyCode === _d1.SPACE) && !/input|button|textarea/i.test(e.target.nodeName)) {
for (var _d5 = e.target; _d5; _d5 = _d5.parentNode) {
if (_d5.dojoClick) {
return true;
}
}
}
}
;
        var _d6;
        on(document, "keydown", function(e) {
        if (_d4(e)) {
        _d6 = e.target;
                e.preventDefault();
        } else {
        _d6 = null;
        }
        });
        on(document, "keyup", function(e) {
        if (_d4(e) && e.target == _d6) {
        _d6 = null;
                on.emit(e.target, "click", {cancelable: true, bubbles: true, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, metaKey: e.metaKey, altKey: e.altKey, _origType: e.type});
        }
        });
        var _d7 = function(_d8, _d9) {
        _d8.dojoClick = true;
                return on(_d8, "click", _d9);
        };
        _d7.click = _d7;
        _d7.press = function(_da, _db) {
        var _dc = on(_da, _d3.press, function(evt) {
        if (evt.type == "mousedown" && !_d2.isLeft(evt)) {
        return;
        }
        _db(evt);
        }), _dd = on(_da, "keydown", function(evt) {
        if (evt.keyCode === _d1.ENTER || evt.keyCode === _d1.SPACE) {
        _db(evt);
        }
        });
                return {remove: function() {
                _dc.remove();
                        _dd.remove();
                }};
        };
        _d7.release = function(_de, _df) {
        var _e0 = on(_de, _d3.release, function(evt) {
        if (evt.type == "mouseup" && !_d2.isLeft(evt)) {
        return;
        }
        _df(evt);
        }), _e1 = on(_de, "keyup", function(evt) {
        if (evt.keyCode === _d1.ENTER || evt.keyCode === _d1.SPACE) {
        _df(evt);
        }
        });
                return {remove: function() {
                _e0.remove();
                        _e1.remove();
                }};
        };
        _d7.move = _d3.move;
        return _d7;
});
}, "dojo/touch": function() {
define(["./_base/kernel", "./aspect", "./dom", "./dom-class", "./_base/lang", "./on", "./has", "./mouse", "./domReady", "./_base/window"], function(_e2, _e3, dom, _e4, _e5, on, has, _e6, _e7, win) {
var _e8 = has("touch");
        var _e9 = has("ios") < 5;
        var _ea = navigator.msPointerEnabled;
        var _eb, _ec, _ed, _ee, _ef, _f0, _f1, _f2;
        var _f3;
        function _f4(_f5, _f6, _f7) {
        if (_ea && _f7) {
        return function(_f8, _f9) {
        return on(_f8, _f7, _f9);
        };
        } else {
        if (_e8) {
        return function(_fa, _fb) {
        var _fc = on(_fa, _f6, _fb), _fd = on(_fa, _f5, function(evt) {
        if (!_f3 || (new Date()).getTime() > _f3 + 1000) {
        _fb.call(this, evt);
        }
        });
                return {remove: function() {
                _fc.remove();
                        _fd.remove();
                }};
        };
        } else {
        return function(_fe, _ff) {
        return on(_fe, _f5, _ff);
        };
        }
        }
        }
;
        function _100(node) {
        do {
        if (node.dojoClick) {
        return node.dojoClick;
        }
        } while (node = node.parentNode);
        }
;
        function _101(e, _102, _103) {
        _ec = !e.target.disabled && _100(e.target);
                if (_ec) {
        _ed = e.target;
                _ee = e.touches ? e.touches[0].pageX : e.clientX;
                _ef = e.touches ? e.touches[0].pageY : e.clientY;
                _f0 = (typeof _ec == "object" ? _ec.x : (typeof _ec == "number" ? _ec : 0)) || 4;
                _f1 = (typeof _ec == "object" ? _ec.y : (typeof _ec == "number" ? _ec : 0)) || 4;
                if (!_eb) {
        _eb = true;
                win.doc.addEventListener(_102, function(e) {
                _ec = _ec && e.target == _ed && Math.abs((e.touches ? e.touches[0].pageX : e.clientX) - _ee) <= _f0 && Math.abs((e.touches ? e.touches[0].pageY : e.clientY) - _ef) <= _f1;
                }, true);
                win.doc.addEventListener(_103, function(e) {
                if (_ec) {
                _f2 = (new Date()).getTime();
                        var _104 = e.target;
                        if (_104.tagName === "LABEL") {
                _104 = dom.byId(_104.getAttribute("for")) || _104;
                }
                setTimeout(function() {
                on.emit(_104, "click", {bubbles: true, cancelable: true, _dojo_click: true});
                });
                }
                }, true);
                function _105(type) {
                win.doc.addEventListener(type, function(e) {
                if (!e._dojo_click && (new Date()).getTime() <= _f2 + 1000 && !(e.target.tagName == "INPUT" && _e4.contains(e.target, "dijitOffScreen"))) {
                e.stopPropagation();
                        e.stopImmediatePropagation && e.stopImmediatePropagation();
                        if (type == "click" && (e.target.tagName != "INPUT" || e.target.type == "radio" || e.target.type == "checkbox") && e.target.tagName != "TEXTAREA" && e.target.tagName != "AUDIO" && e.target.tagName != "VIDEO") {
                e.preventDefault();
                }
                }
                }, true);
                }
        ;
                _105("click");
                _105("mousedown");
                _105("mouseup");
        }
        }
        }
;
        var _106;
        if (_e8) {
if (_ea) {
_e7(function() {
win.doc.addEventListener("MSPointerDown", function(evt) {
_101(evt, "MSPointerMove", "MSPointerUp");
}, true);
});
} else {
_e7(function() {
_106 = win.body();
        win.doc.addEventListener("touchstart", function(evt) {
        _f3 = (new Date()).getTime();
                var _107 = _106;
                _106 = evt.target;
                on.emit(_107, "dojotouchout", {relatedTarget: _106, bubbles: true});
                on.emit(_106, "dojotouchover", {relatedTarget: _107, bubbles: true});
                _101(evt, "touchmove", "touchend");
        }, true);
        function _108(evt) {
        var _109 = _e5.delegate(evt, {bubbles: true});
                if (has("ios") >= 6) {
        _109.touches = evt.touches;
                _109.altKey = evt.altKey;
                _109.changedTouches = evt.changedTouches;
                _109.ctrlKey = evt.ctrlKey;
                _109.metaKey = evt.metaKey;
                _109.shiftKey = evt.shiftKey;
                _109.targetTouches = evt.targetTouches;
        }
        return _109;
        }
;
        on(win.doc, "touchmove", function(evt) {
        _f3 = (new Date()).getTime();
                var _10a = win.doc.elementFromPoint(evt.pageX - (_e9 ? 0 : win.global.pageXOffset), evt.pageY - (_e9 ? 0 : win.global.pageYOffset));
                if (_10a) {
        if (_106 !== _10a) {
        on.emit(_106, "dojotouchout", {relatedTarget: _10a, bubbles: true});
                on.emit(_10a, "dojotouchover", {relatedTarget: _106, bubbles: true});
                _106 = _10a;
        }
        on.emit(_10a, "dojotouchmove", _108(evt));
        }
        });
        on(win.doc, "touchend", function(evt) {
        _f3 = (new Date()).getTime();
                var node = win.doc.elementFromPoint(evt.pageX - (_e9 ? 0 : win.global.pageXOffset), evt.pageY - (_e9 ? 0 : win.global.pageYOffset)) || win.body();
                on.emit(node, "dojotouchend", _108(evt));
        });
});
}
}
var _10b = {press: _f4("mousedown", "touchstart", "MSPointerDown"), move: _f4("mousemove", "dojotouchmove", "MSPointerMove"), release: _f4("mouseup", "dojotouchend", "MSPointerUp"), cancel: _f4(_e6.leave, "touchcancel", _e8 ? "MSPointerCancel" : null), over: _f4("mouseover", "dojotouchover", "MSPointerOver"), out: _f4("mouseout", "dojotouchout", "MSPointerOut"), enter: _e6._eventHandler(_f4("mouseover", "dojotouchover", "MSPointerOver")), leave: _e6._eventHandler(_f4("mouseout", "dojotouchout", "MSPointerOut"))};
        1 && (_e2.touch = _10b);
        return _10b;
});
}, "dijit/_FocusMixin": function() {
define(["./focus", "./_WidgetBase", "dojo/_base/declare", "dojo/_base/lang"], function(_10c, _10d, _10e, lang) {
lang.extend(_10d, {focused: false, onFocus: function() {
}, onBlur: function() {
}, _onFocus: function() {
this.onFocus();
}, _onBlur: function() {
this.onBlur();
}});
        return _10e("dijit._FocusMixin", null, {_focusManager: _10c});
});
}, "dijit/focus": function() {
define(["dojo/aspect", "dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-construct", "dojo/Evented", "dojo/_base/lang", "dojo/on", "dojo/domReady", "dojo/sniff", "dojo/Stateful", "dojo/_base/window", "dojo/window", "./a11y", "./registry", "./main"], function(_10f, _110, dom, _111, _112, _113, lang, on, _114, has, _115, win, _116, a11y, _117, _118) {
var _119;
        var _11a = _110([_115, _113], {curNode: null, activeStack: [], constructor: function() {
        var _11b = lang.hitch(this, function(node) {
        if (dom.isDescendant(this.curNode, node)) {
        this.set("curNode", null);
        }
        if (dom.isDescendant(this.prevNode, node)) {
        this.set("prevNode", null);
        }
        });
                _10f.before(_112, "empty", _11b);
                _10f.before(_112, "destroy", _11b);
        }, registerIframe: function(_11c) {
        return this.registerWin(_11c.contentWindow, _11c);
        }, registerWin: function(_11d, _11e) {
        var _11f = this, body = _11d.document && _11d.document.body;
                if (body) {
        var mdh = on(_11d.document, "mousedown, touchstart", function(evt) {
        _11f._justMouseDowned = true;
                setTimeout(function() {
                _11f._justMouseDowned = false;
                }, 0);
                if (evt && evt.target && evt.target.parentNode == null) {
        return;
        }
        _11f._onTouchNode(_11e || evt.target, "mouse");
        });
                var fih = on(body, "focusin", function(evt) {
                _119 = (new Date()).getTime();
                        if (!evt.target.tagName) {
                return;
                }
                var tag = evt.target.tagName.toLowerCase();
                        if (tag == "#document" || tag == "body") {
                return;
                }
                if (a11y.isFocusable(evt.target)) {
                _11f._onFocusNode(_11e || evt.target);
                } else {
                _11f._onTouchNode(_11e || evt.target);
                }
                });
                var foh = on(body, "focusout", function(evt) {
                if ((new Date()).getTime() < _119 + 100) {
                return;
                }
                _11f._onBlurNode(_11e || evt.target);
                });
                return {remove: function() {
                mdh.remove();
                        fih.remove();
                        foh.remove();
                        mdh = fih = foh = null;
                        body = null;
                }};
        }
        }, _onBlurNode: function(node) {
        if (this._clearFocusTimer) {
        clearTimeout(this._clearFocusTimer);
        }
        this._clearFocusTimer = setTimeout(lang.hitch(this, function() {
        this.set("prevNode", this.curNode);
                this.set("curNode", null);
        }), 0);
                if (this._justMouseDowned) {
        return;
        }
        if (this._clearActiveWidgetsTimer) {
        clearTimeout(this._clearActiveWidgetsTimer);
        }
        this._clearActiveWidgetsTimer = setTimeout(lang.hitch(this, function() {
        delete this._clearActiveWidgetsTimer;
                this._setStack([]);
        }), 0);
        }, _onTouchNode: function(node, by) {
        if (this._clearActiveWidgetsTimer) {
        clearTimeout(this._clearActiveWidgetsTimer);
                delete this._clearActiveWidgetsTimer;
        }
        var _120 = [];
                try {
                while (node) {
                var _121 = _111.get(node, "dijitPopupParent");
                        if (_121) {
                node = _117.byId(_121).domNode;
                } else {
                if (node.tagName && node.tagName.toLowerCase() == "body") {
                if (node === win.body()) {
                break;
                }
                node = _116.get(node.ownerDocument).frameElement;
                } else {
                var id = node.getAttribute && node.getAttribute("widgetId"), _122 = id && _117.byId(id);
                        if (_122 && !(by == "mouse" && _122.get("disabled"))) {
                _120.unshift(id);
                }
                node = node.parentNode;
                }
                }
                }
                } catch (e) {
        }
        this._setStack(_120, by);
        }, _onFocusNode: function(node) {
        if (!node) {
        return;
        }
        if (node.nodeType == 9) {
        return;
        }
        if (this._clearFocusTimer) {
        clearTimeout(this._clearFocusTimer);
                delete this._clearFocusTimer;
        }
        this._onTouchNode(node);
                if (node == this.curNode) {
        return;
        }
        this.set("prevNode", this.curNode);
                this.set("curNode", node);
        }, _setStack: function(_123, by) {
        var _124 = this.activeStack, _125 = _124.length - 1, _126 = _123.length - 1;
                if (_123[_126] == _124[_125]) {
        return;
        }
        this.set("activeStack", _123);
                var _127, i;
                for (i = _125; i >= 0 && _124[i] != _123[i]; i--) {
        _127 = _117.byId(_124[i]);
                if (_127) {
        _127._hasBeenBlurred = true;
                _127.set("focused", false);
                if (_127._focusManager == this) {
        _127._onBlur(by);
        }
        this.emit("widget-blur", _127, by);
        }
        }
        for (i++; i <= _126; i++) {
        _127 = _117.byId(_123[i]);
                if (_127) {
        _127.set("focused", true);
                if (_127._focusManager == this) {
        _127._onFocus(by);
        }
        this.emit("widget-focus", _127, by);
        }
        }
        }, focus: function(node) {
        if (node) {
        try {
        node.focus();
        } catch (e) {
        }
        }
        }});
        var _128 = new _11a();
        _114(function() {
        var _129 = _128.registerWin(_116.get(document));
                if (has("ie")) {
        on(window, "unload", function() {
        if (_129) {
        _129.remove();
                _129 = null;
        }
        });
        }
        });
        _118.focus = function(node) {
        _128.focus(node);
        };
        for (var attr in _128) {
if (!/^_/.test(attr)) {
_118.focus[attr] = typeof _128[attr] == "function" ? lang.hitch(_128, attr) : _128[attr];
}
}
_128.watch(function(attr, _12a, _12b) {
_118.focus[attr] = _12b;
});
        return _128;
});
}, "dojo/window": function() {
define(["./_base/lang", "./sniff", "./_base/window", "./dom", "./dom-geometry", "./dom-style", "./dom-construct"], function(lang, has, _12c, dom, geom, _12d, _12e) {
has.add("rtl-adjust-position-for-verticalScrollBar", function(win, doc) {
var body = _12c.body(doc), _12f = _12e.create("div", {style: {overflow: "scroll", overflowX: "visible", direction: "rtl", visibility: "hidden", position: "absolute", left: "0", top: "0", width: "64px", height: "64px"}}, body, "last"), div = _12e.create("div", {style: {overflow: "hidden", direction: "ltr"}}, _12f, "last"), ret = geom.position(div).x != 0;
        _12f.removeChild(div);
        body.removeChild(_12f);
        return ret;
});
        has.add("position-fixed-support", function(win, doc) {
        var body = _12c.body(doc), _130 = _12e.create("span", {style: {visibility: "hidden", position: "fixed", left: "1px", top: "1px"}}, body, "last"), _131 = _12e.create("span", {style: {position: "fixed", left: "0", top: "0"}}, _130, "last"), ret = geom.position(_131).x != geom.position(_130).x;
                _130.removeChild(_131);
                body.removeChild(_130);
                return ret;
        });
        var _132 = {getBox: function(doc) {
        doc = doc || _12c.doc;
                var _133 = (doc.compatMode == "BackCompat") ? _12c.body(doc) : doc.documentElement, _134 = geom.docScroll(doc), w, h;
                if (has("touch")) {
        var _135 = _132.get(doc);
                w = _135.innerWidth || _133.clientWidth;
                h = _135.innerHeight || _133.clientHeight;
        } else {
        w = _133.clientWidth;
                h = _133.clientHeight;
        }
        return {l: _134.x, t: _134.y, w: w, h: h};
        }, get: function(doc) {
        if (has("ie") && _132 !== document.parentWindow) {
        doc.parentWindow.execScript("document._parentWindow = window;", "Javascript");
                var win = doc._parentWindow;
                doc._parentWindow = null;
                return win;
        }
        return doc.parentWindow || doc.defaultView;
        }, scrollIntoView: function(node, pos) {
        try {
        node = dom.byId(node);
                var doc = node.ownerDocument || _12c.doc, body = _12c.body(doc), html = doc.documentElement || body.parentNode, isIE = has("ie"), isWK = has("webkit");
                if (node == body || node == html) {
        return;
        }
        if (!(has("mozilla") || isIE || isWK || has("opera")) && ("scrollIntoView" in node)) {
        node.scrollIntoView(false);
                return;
        }
        var _136 = doc.compatMode == "BackCompat", _137 = Math.min(body.clientWidth || html.clientWidth, html.clientWidth || body.clientWidth), _138 = Math.min(body.clientHeight || html.clientHeight, html.clientHeight || body.clientHeight), _139 = (isWK || _136) ? body : html, _13a = pos || geom.position(node), el = node.parentNode, _13b = function(el) {
        return (isIE <= 6 || (isIE == 7 && _136)) ? false : (has("position-fixed-support") && (_12d.get(el, "position").toLowerCase() == "fixed"));
        };
                if (_13b(node)) {
        return;
        }
        while (el) {
        if (el == body) {
        el = _139;
        }
        var _13c = geom.position(el), _13d = _13b(el), rtl = _12d.getComputedStyle(el).direction.toLowerCase() == "rtl";
                if (el == _139) {
        _13c.w = _137;
                _13c.h = _138;
                if (_139 == html && isIE && rtl) {
        _13c.x += _139.offsetWidth - _13c.w;
        }
        if (_13c.x < 0 || !isIE || isIE >= 9) {
        _13c.x = 0;
        }
        if (_13c.y < 0 || !isIE || isIE >= 9) {
        _13c.y = 0;
        }
        } else {
        var pb = geom.getPadBorderExtents(el);
                _13c.w -= pb.w;
                _13c.h -= pb.h;
                _13c.x += pb.l;
                _13c.y += pb.t;
                var _13e = el.clientWidth, _13f = _13c.w - _13e;
                if (_13e > 0 && _13f > 0) {
        if (rtl && has("rtl-adjust-position-for-verticalScrollBar")) {
        _13c.x += _13f;
        }
        _13c.w = _13e;
        }
        _13e = el.clientHeight;
                _13f = _13c.h - _13e;
                if (_13e > 0 && _13f > 0) {
        _13c.h = _13e;
        }
        }
        if (_13d) {
        if (_13c.y < 0) {
        _13c.h += _13c.y;
                _13c.y = 0;
        }
        if (_13c.x < 0) {
        _13c.w += _13c.x;
                _13c.x = 0;
        }
        if (_13c.y + _13c.h > _138) {
        _13c.h = _138 - _13c.y;
        }
        if (_13c.x + _13c.w > _137) {
        _13c.w = _137 - _13c.x;
        }
        }
        var l = _13a.x - _13c.x, t = _13a.y - _13c.y, r = l + _13a.w - _13c.w, bot = t + _13a.h - _13c.h;
                var s, old;
                if (r * l > 0 && (!!el.scrollLeft || el == _139 || el.scrollWidth > el.offsetHeight)) {
        s = Math[l < 0 ? "max" : "min"](l, r);
                if (rtl && ((isIE == 8 && !_136) || isIE >= 9)) {
        s = - s;
        }
        old = el.scrollLeft;
                el.scrollLeft += s;
                s = el.scrollLeft - old;
                _13a.x -= s;
        }
        if (bot * t > 0 && (!!el.scrollTop || el == _139 || el.scrollHeight > el.offsetHeight)) {
        s = Math.ceil(Math[t < 0 ? "max" : "min"](t, bot));
                old = el.scrollTop;
                el.scrollTop += s;
                s = el.scrollTop - old;
                _13a.y -= s;
        }
        el = (el != _139) && !_13d && el.parentNode;
        }
        } catch (error) {
        console.error("scrollIntoView: " + error);
                node.scrollIntoView(false);
        }
        }};
        1 && lang.setObject("dojo.window", _132);
        return _132;
});
}, "dijit/a11y": function() {
define(["dojo/_base/array", "dojo/dom", "dojo/dom-attr", "dojo/dom-style", "dojo/_base/lang", "dojo/sniff", "./main"], function(_140, dom, _141, _142, lang, has, _143) {
var _144;
        var a11y = {_isElementShown: function(elem) {
        var s = _142.get(elem);
                return (s.visibility != "hidden") && (s.visibility != "collapsed") && (s.display != "none") && (_141.get(elem, "type") != "hidden");
        }, hasDefaultTabStop: function(elem) {
        switch (elem.nodeName.toLowerCase()) {
        case "a":
                return _141.has(elem, "href");
                case "area":
                case "button":
                case "input":
                case "object":
                case "select":
                case "textarea":
                return true;
                case "iframe":
                var body;
                try {
                var _145 = elem.contentDocument;
                        if ("designMode" in _145 && _145.designMode == "on") {
                return true;
                }
                body = _145.body;
                } catch (e1) {
        try {
        body = elem.contentWindow.document.body;
        } catch (e2) {
        return false;
        }
        }
        return body && (body.contentEditable == "true" || (body.firstChild && body.firstChild.contentEditable == "true"));
                default:
                return elem.contentEditable == "true";
        }
        }, effectiveTabIndex: function(elem) {
        if (_141.get(elem, "disabled")) {
        return _144;
        } else {
        if (_141.has(elem, "tabIndex")) {
        return + _141.get(elem, "tabIndex");
        } else {
        return a11y.hasDefaultTabStop(elem) ? 0 : _144;
        }
        }
        }, isTabNavigable: function(elem) {
        return a11y.effectiveTabIndex(elem) >= 0;
        }, isFocusable: function(elem) {
        return a11y.effectiveTabIndex(elem) >= - 1;
        }, _getTabNavigable: function(root) {
        var _146, last, _147, _148, _149, _14a, _14b = {};
                function _14c(node) {
                return node && node.tagName.toLowerCase() == "input" && node.type && node.type.toLowerCase() == "radio" && node.name && node.name.toLowerCase();
                }
        ;
                var _14d = a11y._isElementShown, _14e = a11y.effectiveTabIndex;
                var _14f = function(_150) {
                for (var _151 = _150.firstChild; _151; _151 = _151.nextSibling) {
                if (_151.nodeType != 1 || (has("ie") <= 9 && _151.scopeName !== "HTML") || !_14d(_151)) {
                continue;
                }
                var _152 = _14e(_151);
                        if (_152 >= 0) {
                if (_152 == 0) {
                if (!_146) {
                _146 = _151;
                }
                last = _151;
                } else {
                if (_152 > 0) {
                if (!_147 || _152 < _148) {
                _148 = _152;
                        _147 = _151;
                }
                if (!_149 || _152 >= _14a) {
                _14a = _152;
                        _149 = _151;
                }
                }
                }
                var rn = _14c(_151);
                        if (_141.get(_151, "checked") && rn) {
                _14b[rn] = _151;
                }
                }
                if (_151.nodeName.toUpperCase() != "SELECT") {
                _14f(_151);
                }
                }
                };
                if (_14d(root)) {
        _14f(root);
        }
        function rs(node) {
        return _14b[_14c(node)] || node;
        }
        ;
                return {first: rs(_146), last: rs(last), lowest: rs(_147), highest: rs(_149)};
        }, getFirstInTabbingOrder: function(root, doc) {
        var _153 = a11y._getTabNavigable(dom.byId(root, doc));
                return _153.lowest ? _153.lowest : _153.first;
        }, getLastInTabbingOrder: function(root, doc) {
        var _154 = a11y._getTabNavigable(dom.byId(root, doc));
                return _154.last ? _154.last : _154.highest;
        }};
        1 && lang.mixin(_143, a11y);
        return a11y;
});
}, "dojo/uacss": function() {
define(["./dom-geometry", "./_base/lang", "./domReady", "./sniff", "./_base/window"], function(_155, lang, _156, has, _157) {
var html = _157.doc.documentElement, ie = has("ie"), _158 = has("opera"), maj = Math.floor, ff = has("ff"), _159 = _155.boxModel.replace(/-/, ""), _15a = {"dj_quirks": has("quirks"), "dj_opera": _158, "dj_khtml": has("khtml"), "dj_webkit": has("webkit"), "dj_safari": has("safari"), "dj_chrome": has("chrome"), "dj_gecko": has("mozilla"), "dj_ios": has("ios"), "dj_android": has("android")};
        if (ie) {
_15a["dj_ie"] = true;
        _15a["dj_ie" + maj(ie)] = true;
        _15a["dj_iequirks"] = has("quirks");
}
if (ff) {
_15a["dj_ff" + maj(ff)] = true;
}
_15a["dj_" + _159] = true;
        var _15b = "";
        for (var clz in _15a) {
if (_15a[clz]) {
_15b += clz + " ";
}
}
html.className = lang.trim(html.className + " " + _15b);
        _156(function() {
        if (!_155.isBodyLtr()) {
        var _15c = "dj_rtl dijitRtl " + _15b.replace(/ /g, "-rtl ");
                html.className = lang.trim(html.className + " " + _15c + "dj_rtl dijitRtl " + _15b.replace(/ /g, "-rtl "));
        }
        });
        return has;
});
}, "dijit/hccss": function() {
define(["dojo/dom-class", "dojo/hccss", "dojo/domReady", "dojo/_base/window"], function(_15d, has, _15e, win) {
_15e(function() {
if (has("highcontrast")) {
_15d.add(win.body(), "dijit_a11y");
}
});
        return has;
});
}, "dojo/hccss": function() {
define(["require", "./_base/config", "./dom-class", "./dom-style", "./has", "./domReady", "./_base/window"], function(_15f, _160, _161, _162, has, _163, win) {
has.add("highcontrast", function() {
var div = win.doc.createElement("div");
        div.style.cssText = "border: 1px solid; border-color:red green; position: absolute; height: 5px; top: -999px;" + "background-image: url(\"" + (_160.blankGif || _15f.toUrl("./resources/blank.gif")) + "\");";
        win.body().appendChild(div);
        var cs = _162.getComputedStyle(div), _164 = cs.backgroundImage, hc = (cs.borderTopColor == cs.borderRightColor) || (_164 && (_164 == "none" || _164 == "url(invalid-url:)"));
        if (has("ie") <= 8) {
div.outerHTML = "";
} else {
win.body().removeChild(div);
}
return hc;
});
        _163(function() {
        if (has("highcontrast")) {
        _161.add(win.body(), "dj_a11y");
        }
        });
        return has;
});
}, "dijit/_TemplatedMixin": function() {
define(["dojo/cache", "dojo/_base/declare", "dojo/dom-construct", "dojo/_base/lang", "dojo/on", "dojo/sniff", "dojo/string", "./_AttachMixin"], function(_165, _166, _167, lang, on, has, _168, _169) {
var _16a = _166("dijit._TemplatedMixin", _169, {templateString: null, templatePath: null, _skipNodeCache: false, searchContainerNode: true, _stringRepl: function(tmpl) {
var _16b = this.declaredClass, _16c = this;
        return _168.substitute(tmpl, this, function(_16d, key) {
        if (key.charAt(0) == "!") {
        _16d = lang.getObject(key.substr(1), false, _16c);
        }
        if (typeof _16d == "undefined") {
        throw new Error(_16b + " template:" + key);
        }
        if (_16d == null) {
        return "";
        }
        return key.charAt(0) == "!" ? _16d : this._escapeValue("" + _16d);
        }, this);
}, _escapeValue: function(val) {
return val.replace(/["'<>&]/g, function(val) {
return {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#x27;"}[val];
});
}, buildRendering: function() {
if (!this._rendered) {
if (!this.templateString) {
this.templateString = _165(this.templatePath, {sanitize: true});
}
var _16e = _16a.getCachedTemplate(this.templateString, this._skipNodeCache, this.ownerDocument);
        var node;
        if (lang.isString(_16e)) {
node = _167.toDom(this._stringRepl(_16e), this.ownerDocument);
        if (node.nodeType != 1) {
throw new Error("Invalid template: " + _16e);
}
} else {
node = _16e.cloneNode(true);
}
this.domNode = node;
}
this.inherited(arguments);
        if (!this._rendered) {
this._fillContent(this.srcNodeRef);
}
this._rendered = true;
}, _fillContent: function(_16f) {
var dest = this.containerNode;
        if (_16f && dest) {
while (_16f.hasChildNodes()) {
dest.appendChild(_16f.firstChild);
}
}
}});
        _16a._templateCache = {};
        _16a.getCachedTemplate = function(_170, _171, doc) {
        var _172 = _16a._templateCache;
                var key = _170;
                var _173 = _172[key];
                if (_173) {
        try {
        if (!_173.ownerDocument || _173.ownerDocument == (doc || document)) {
        return _173;
        }
        } catch (e) {
        }
        _167.destroy(_173);
        }
        _170 = _168.trim(_170);
                if (_171 || _170.match(/\$\{([^\}]+)\}/g)) {
        return (_172[key] = _170);
        } else {
        var node = _167.toDom(_170, doc);
                if (node.nodeType != 1) {
        throw new Error("Invalid template: " + _170);
        }
        return (_172[key] = node);
        }
        };
        if (has("ie")) {
on(window, "unload", function() {
var _174 = _16a._templateCache;
        for (var key in _174) {
var _175 = _174[key];
        if (typeof _175 == "object") {
_167.destroy(_175);
}
delete _174[key];
}
});
}
return _16a;
});
}, "dojo/cache": function() {
define(["./_base/kernel", "./text"], function(dojo) {
return dojo.cache;
});
}, "dojo/text": function() {
define(["./_base/kernel", "require", "./has", "./request"], function(dojo, _176, has, _177) {
var _178;
        if (1) {
_178 = function(url, sync, load) {
_177(url, {sync: !!sync}).then(load);
};
} else {
if (_176.getText) {
_178 = _176.getText;
} else {
console.error("dojo/text plugin failed to load because loader does not support getText");
}
}
var _179 = {}, _17a = function(text) {
if (text) {
text = text.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, "");
        var _17b = text.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
        if (_17b) {
text = _17b[1];
}
} else {
text = "";
}
return text;
}, _17c = {}, _17d = {};
        dojo.cache = function(_17e, url, _17f) {
        var key;
                if (typeof _17e == "string") {
        if (/\//.test(_17e)) {
        key = _17e;
                _17f = url;
        } else {
        key = _176.toUrl(_17e.replace(/\./g, "/") + (url ? ("/" + url) : ""));
        }
        } else {
        key = _17e + "";
                _17f = url;
        }
        var val = (_17f != undefined && typeof _17f != "string") ? _17f.value : _17f, _180 = _17f && _17f.sanitize;
                if (typeof val == "string") {
        _179[key] = val;
                return _180 ? _17a(val) : val;
        } else {
        if (val === null) {
        delete _179[key];
                return null;
        } else {
        if (!(key in _179)) {
        _178(key, true, function(text) {
        _179[key] = text;
        });
        }
        return _180 ? _17a(_179[key]) : _179[key];
        }
        }
        };
        return {dynamic: true, normalize: function(id, _181) {
        var _182 = id.split("!"), url = _182[0];
                return (/^\./.test(url) ? _181(url) : url) + (_182[1] ? "!" + _182[1] : "");
        }, load: function(id, _183, load) {
        var _184 = id.split("!"), _185 = _184.length > 1, _186 = _184[0], url = _183.toUrl(_184[0]), _187 = "url:" + url, text = _17c, _188 = function(text) {
        load(_185 ? _17a(text) : text);
        };
                if (_186 in _179) {
        text = _179[_186];
        } else {
        if (_183.cache && _187 in _183.cache) {
        text = _183.cache[_187];
        } else {
        if (url in _179) {
        text = _179[url];
        }
        }
        }
        if (text === _17c) {
        if (_17d[url]) {
        _17d[url].push(_188);
        } else {
        var _189 = _17d[url] = [_188];
                _178(url, !_183.async, function(text) {
                _179[_186] = _179[url] = text;
                        for (var i = 0; i < _189.length; ) {
                _189[i++](text);
                }
                delete _17d[url];
                });
        }
        } else {
        _188(text);
        }
        }};
});
}, "dojo/request": function() {
define(["./request/default!"], function(_18a) {
return _18a;
});
}, "dojo/request/default": function() {
define(["exports", "require", "../has"], function(_18b, _18c, has) {
var _18d = has("config-requestProvider"), _18e;
        if (1) {
_18e = "./xhr";
} else {
if (0) {
_18e = "./node";
}
}
if (!_18d) {
_18d = _18e;
}
_18b.getPlatformDefaultId = function() {
return _18e;
};
        _18b.load = function(id, _18f, _190, _191) {
        _18c([id == "platform" ? _18e : _18d], function(_192) {
        _190(_192);
        });
        };
});
}, "dojo/string": function() {
define(["./_base/kernel", "./_base/lang"], function(_193, lang) {
var _194 = {};
        lang.setObject("dojo.string", _194);
        _194.rep = function(str, num) {
        if (num <= 0 || !str) {
        return "";
        }
        var buf = [];
                for (; ; ) {
        if (num & 1) {
        buf.push(str);
        }
        if (!(num >>= 1)) {
        break;
        }
        str += str;
        }
        return buf.join("");
        };
        _194.pad = function(text, size, ch, end) {
        if (!ch) {
        ch = "0";
        }
        var out = String(text), pad = _194.rep(ch, Math.ceil((size - out.length) / ch.length));
                return end ? out + pad : pad + out;
        };
        _194.substitute = function(_195, map, _196, _197) {
        _197 = _197 || _193.global;
                _196 = _196 ? lang.hitch(_197, _196) : function(v) {
        return v;
        };
                return _195.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g, function(_198, key, _199) {
                var _19a = lang.getObject(key, false, map);
                        if (_199) {
                _19a = lang.getObject(_199, false, _197).call(_197, _19a, key);
                }
                return _196(_19a, key).toString();
                });
        };
        _194.trim = String.prototype.trim ? lang.trim : function(str) {
        str = str.replace(/^\s+/, "");
                for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
        str = str.substring(0, i + 1);
                break;
        }
        }
        return str;
        };
        return _194;
});
}, "dijit/_AttachMixin": function() {
define(["require", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/declare", "dojo/_base/lang", "dojo/mouse", "dojo/on", "dojo/touch", "./_WidgetBase"], function(_19b, _19c, _19d, _19e, lang, _19f, on, _1a0, _1a1) {
var _1a2 = lang.delegate(_1a0, {"mouseenter": _19f.enter, "mouseleave": _19f.leave, "keypress": _19d._keypress});
        var _1a3;
        var _1a4 = _19e("dijit._AttachMixin", null, {constructor: function() {
        this._attachPoints = [];
                this._attachEvents = [];
        }, buildRendering: function() {
        this.inherited(arguments);
                this._attachTemplateNodes(this.domNode);
                this._beforeFillContent();
        }, _beforeFillContent: function() {
        }, _attachTemplateNodes: function(_1a5) {
        var node = _1a5;
                while (true) {
        if (node.nodeType == 1 && (this._processTemplateNode(node, function(n, p) {
        return n.getAttribute(p);
        }, this._attach) || this.searchContainerNode) && node.firstChild) {
        node = node.firstChild;
        } else {
        if (node == _1a5) {
        return;
        }
        while (!node.nextSibling) {
        node = node.parentNode;
                if (node == _1a5) {
        return;
        }
        }
        node = node.nextSibling;
        }
        }
        }, _processTemplateNode: function(_1a6, _1a7, _1a8) {
        var ret = true;
                var _1a9 = this.attachScope || this, _1aa = _1a7(_1a6, "dojoAttachPoint") || _1a7(_1a6, "data-dojo-attach-point");
                if (_1aa) {
        var _1ab, _1ac = _1aa.split(/\s*,\s*/);
                while ((_1ab = _1ac.shift())) {
        if (lang.isArray(_1a9[_1ab])) {
        _1a9[_1ab].push(_1a6);
        } else {
        _1a9[_1ab] = _1a6;
        }
        ret = (_1ab != "containerNode");
                this._attachPoints.push(_1ab);
        }
        }
        var _1ad = _1a7(_1a6, "dojoAttachEvent") || _1a7(_1a6, "data-dojo-attach-event");
                if (_1ad) {
        var _1ae, _1af = _1ad.split(/\s*,\s*/);
                var trim = lang.trim;
                while ((_1ae = _1af.shift())) {
        if (_1ae) {
        var _1b0 = null;
                if (_1ae.indexOf(":") != - 1) {
        var _1b1 = _1ae.split(":");
                _1ae = trim(_1b1[0]);
                _1b0 = trim(_1b1[1]);
        } else {
        _1ae = trim(_1ae);
        }
        if (!_1b0) {
        _1b0 = _1ae;
        }
        this._attachEvents.push(_1a8(_1a6, _1ae, lang.hitch(_1a9, _1b0)));
        }
        }
        }
        return ret;
        }, _attach: function(node, type, func) {
        type = type.replace(/^on/, "").toLowerCase();
                if (type == "dijitclick") {
        type = _1a3 || (_1a3 = _19b("./a11yclick"));
        } else {
        type = _1a2[type] || type;
        }
        return on(node, type, func);
        }, _detachTemplateNodes: function() {
        var _1b2 = this.attachScope || this;
                _19c.forEach(this._attachPoints, function(_1b3) {
                delete _1b2[_1b3];
                });
                this._attachPoints = [];
                _19c.forEach(this._attachEvents, function(_1b4) {
                _1b4.remove();
                });
                this._attachEvents = [];
        }, destroyRendering: function() {
        this._detachTemplateNodes();
                this.inherited(arguments);
        }});
        lang.extend(_1a1, {dojoAttachEvent: "", dojoAttachPoint: ""});
        return _1a4;
});
}, "dijit/_Contained": function() {
define(["dojo/_base/declare", "./registry"], function(_1b5, _1b6) {
return _1b5("dijit._Contained", null, {_getSibling: function(_1b7) {
var node = this.domNode;
        do {
        node = node[_1b7 + "Sibling"];
        } while (node && node.nodeType != 1);
        return node && _1b6.byNode(node);
}, getPreviousSibling: function() {
return this._getSibling("previous");
}, getNextSibling: function() {
return this._getSibling("next");
}, getIndexInParent: function() {
var p = this.getParent();
        if (!p || !p.getIndexOfChild) {
return - 1;
}
return p.getIndexOfChild(this);
}});
});
}, "dijit/_CssStateMixin": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom", "dojo/dom-class", "dojo/has", "dojo/_base/lang", "dojo/on", "dojo/domReady", "dojo/touch", "dojo/_base/window", "./a11yclick", "./registry"], function(_1b8, _1b9, dom, _1ba, has, lang, on, _1bb, _1bc, win, _1bd, _1be) {
var _1bf = _1b9("dijit._CssStateMixin", [], {hovering: false, active: false, _applyAttributes: function() {
this.inherited(arguments);
        _1b8.forEach(["disabled", "readOnly", "checked", "selected", "focused", "state", "hovering", "active", "_opened"], function(attr) {
        this.watch(attr, lang.hitch(this, "_setStateClass"));
        }, this);
        for (var ap in this.cssStateNodes || {}) {
this._trackMouseState(this[ap], this.cssStateNodes[ap]);
}
this._trackMouseState(this.domNode, this.baseClass);
        this._setStateClass();
}, _cssMouseEvent: function(_1c0) {
if (!this.disabled) {
switch (_1c0.type) {
case "mouseover":
        case "MSPointerOver":
        this._set("hovering", true);
        this._set("active", this._mouseDown);
        break;
        case "mouseout":
        case "MSPointerOut":
        this._set("hovering", false);
        this._set("active", false);
        break;
        case "mousedown":
        case "touchstart":
        case "MSPointerDown":
        case "keydown":
        this._set("active", true);
        break;
        case "mouseup":
        case "dojotouchend":
        case "keyup":
        this._set("active", false);
        break;
}
}
}, _setStateClass: function() {
var _1c1 = this.baseClass.split(" ");
        function _1c2(_1c3) {
        _1c1 = _1c1.concat(_1b8.map(_1c1, function(c) {
        return c + _1c3;
        }), "dijit" + _1c3);
        }
;
        if (!this.isLeftToRight()) {
_1c2("Rtl");
}
var _1c4 = this.checked == "mixed" ? "Mixed" : (this.checked ? "Checked" : "");
        if (this.checked) {
_1c2(_1c4);
}
if (this.state) {
_1c2(this.state);
}
if (this.selected) {
_1c2("Selected");
}
if (this._opened) {
_1c2("Opened");
}
if (this.disabled) {
_1c2("Disabled");
} else {
if (this.readOnly) {
_1c2("ReadOnly");
} else {
if (this.active) {
_1c2("Active");
} else {
if (this.hovering) {
_1c2("Hover");
}
}
}
}
if (this.focused) {
_1c2("Focused");
}
var tn = this.stateNode || this.domNode, _1c5 = {};
        _1b8.forEach(tn.className.split(" "), function(c) {
        _1c5[c] = true;
        });
        if ("_stateClasses" in this) {
_1b8.forEach(this._stateClasses, function(c) {
delete _1c5[c];
});
}
_1b8.forEach(_1c1, function(c) {
_1c5[c] = true;
});
        var _1c6 = [];
        for (var c in _1c5) {
_1c6.push(c);
}
tn.className = _1c6.join(" ");
        this._stateClasses = _1c1;
}, _subnodeCssMouseEvent: function(node, _1c7, evt) {
if (this.disabled || this.readOnly) {
return;
}
function _1c8(_1c9) {
_1ba.toggle(node, _1c7 + "Hover", _1c9);
}
;
        function _1ca(_1cb) {
        _1ba.toggle(node, _1c7 + "Active", _1cb);
        }
;
        function _1cc(_1cd) {
        _1ba.toggle(node, _1c7 + "Focused", _1cd);
        }
;
        switch (evt.type) {
case "mouseover":
        case "MSPointerOver":
        _1c8(true);
        break;
        case "mouseout":
        case "MSPointerOut":
        _1c8(false);
        _1ca(false);
        break;
        case "mousedown":
        case "touchstart":
        case "MSPointerDown":
        case "keydown":
        _1ca(true);
        break;
        case "mouseup":
        case "MSPointerUp":
        case "dojotouchend":
        case "keyup":
        _1ca(false);
        break;
        case "focus":
        case "focusin":
        _1cc(true);
        break;
        case "blur":
        case "focusout":
        _1cc(false);
        break;
}
}, _trackMouseState: function(node, _1ce) {
node._cssState = _1ce;
}});
        _1bb(function() {
        function _1cf(evt, _1d0, _1d1) {
        if (_1d1 && dom.isDescendant(_1d1, _1d0)) {
        return;
        }
        for (var node = _1d0; node && node != _1d1; node = node.parentNode) {
        if (node._cssState) {
        var _1d2 = _1be.getEnclosingWidget(node);
                if (_1d2) {
        if (node == _1d2.domNode) {
        _1d2._cssMouseEvent(evt);
        } else {
        _1d2._subnodeCssMouseEvent(node, node._cssState, evt);
        }
        }
        }
        }
        }
        ;
                var body = win.body(), _1d3;
                on(body, _1bc.over, function(evt) {
                _1cf(evt, evt.target, evt.relatedTarget);
                });
                on(body, _1bc.out, function(evt) {
                _1cf(evt, evt.target, evt.relatedTarget);
                });
                on(body, _1bd.press, function(evt) {
                _1d3 = evt.target;
                        _1cf(evt, _1d3);
                });
                on(body, _1bd.release, function(evt) {
                _1cf(evt, _1d3);
                        _1d3 = null;
                });
                on(body, "focusin, focusout", function(evt) {
                var node = evt.target;
                        if (node._cssState && !node.getAttribute("widgetId")) {
                var _1d4 = _1be.getEnclosingWidget(node);
                        if (_1d4) {
                _1d4._subnodeCssMouseEvent(node, node._cssState, evt);
                }
                }
                });
        });
        return _1bf;
});
}, "dojo/date/locale": function() {
define(["../_base/lang", "../_base/array", "../date", "../cldr/supplemental", "../i18n", "../regexp", "../string", "../i18n!../cldr/nls/gregorian", "module"], function(lang, _1d5, date, _1d6, i18n, _1d7, _1d8, _1d9, _1da) {
var _1db = {};
        lang.setObject(_1da.id.replace(/\//g, "."), _1db);
        function _1dc(_1dd, _1de, _1df, _1e0) {
        return _1e0.replace(/([a-z])\1*/ig, function(_1e1) {
        var s, pad, c = _1e1.charAt(0), l = _1e1.length, _1e2 = ["abbr", "wide", "narrow"];
                switch (c) {
        case "G":
                s = _1de[(l < 4) ? "eraAbbr" : "eraNames"][_1dd.getFullYear() < 0 ? 0 : 1];
                break;
                case "y":
                s = _1dd.getFullYear();
                switch (l) {
        case 1:
                break;
                case 2:
                if (!_1df.fullYear) {
        s = String(s);
                s = s.substr(s.length - 2);
                break;
        }
        default:
                pad = true;
        }
        break;
                case "Q":
                case "q":
                s = Math.ceil((_1dd.getMonth() + 1) / 3);
                pad = true;
                break;
                case "M":
                case "L":
                var m = _1dd.getMonth();
                if (l < 3) {
        s = m + 1;
                pad = true;
        } else {
        var _1e3 = ["months", c == "L" ? "standAlone" : "format", _1e2[l - 3]].join("-");
                s = _1de[_1e3][m];
        }
        break;
                case "w":
                var _1e4 = 0;
                s = _1db._getWeekOfYear(_1dd, _1e4);
                pad = true;
                break;
                case "d":
                s = _1dd.getDate();
                pad = true;
                break;
                case "D":
                s = _1db._getDayOfYear(_1dd);
                pad = true;
                break;
                case "e":
                case "c":
                var d = _1dd.getDay();
                if (l < 2) {
        s = (d - _1d6.getFirstDayOfWeek(_1df.locale) + 8) % 7;
                break;
        }
        case "E":
                d = _1dd.getDay();
                if (l < 3) {
        s = d + 1;
                pad = true;
        } else {
        var _1e5 = ["days", c == "c" ? "standAlone" : "format", _1e2[l - 3]].join("-");
                s = _1de[_1e5][d];
        }
        break;
                case "a":
                var _1e6 = _1dd.getHours() < 12 ? "am" : "pm";
                s = _1df[_1e6] || _1de["dayPeriods-format-wide-" + _1e6];
                break;
                case "h":
                case "H":
                case "K":
                case "k":
                var h = _1dd.getHours();
                switch (c) {
        case "h":
                s = (h % 12) || 12;
                break;
                case "H":
                s = h;
                break;
                case "K":
                s = (h % 12);
                break;
                case "k":
                s = h || 24;
                break;
        }
        pad = true;
                break;
                case "m":
                s = _1dd.getMinutes();
                pad = true;
                break;
                case "s":
                s = _1dd.getSeconds();
                pad = true;
                break;
                case "S":
                s = Math.round(_1dd.getMilliseconds() * Math.pow(10, l - 3));
                pad = true;
                break;
                case "v":
                case "z":
                s = _1db._getZone(_1dd, true, _1df);
                if (s) {
        break;
        }
        l = 4;
                case "Z":
                var _1e7 = _1db._getZone(_1dd, false, _1df);
                var tz = [(_1e7 <= 0 ? "+" : "-"), _1d8.pad(Math.floor(Math.abs(_1e7) / 60), 2), _1d8.pad(Math.abs(_1e7) % 60, 2)];
                if (l == 4) {
        tz.splice(0, 0, "GMT");
                tz.splice(3, 0, ":");
        }
        s = tz.join("");
                break;
                default:
                throw new Error("dojo.date.locale.format: invalid pattern char: " + _1e0);
        }
        if (pad) {
        s = _1d8.pad(s, l);
        }
        return s;
        });
        }
;
        _1db._getZone = function(_1e8, _1e9, _1ea) {
        if (_1e9) {
        return date.getTimezoneName(_1e8);
        } else {
        return _1e8.getTimezoneOffset();
        }
        };
        _1db.format = function(_1eb, _1ec) {
        _1ec = _1ec || {};
                var _1ed = i18n.normalizeLocale(_1ec.locale), _1ee = _1ec.formatLength || "short", _1ef = _1db._getGregorianBundle(_1ed), str = [], _1f0 = lang.hitch(this, _1dc, _1eb, _1ef, _1ec);
                if (_1ec.selector == "year") {
        return _1f1(_1ef["dateFormatItem-yyyy"] || "yyyy", _1f0);
        }
        var _1f2;
                if (_1ec.selector != "date") {
        _1f2 = _1ec.timePattern || _1ef["timeFormat-" + _1ee];
                if (_1f2) {
        str.push(_1f1(_1f2, _1f0));
        }
        }
        if (_1ec.selector != "time") {
        _1f2 = _1ec.datePattern || _1ef["dateFormat-" + _1ee];
                if (_1f2) {
        str.push(_1f1(_1f2, _1f0));
        }
        }
        return str.length == 1 ? str[0] : _1ef["dateTimeFormat-" + _1ee].replace(/\'/g, "").replace(/\{(\d+)\}/g, function(_1f3, key) {
        return str[key];
        });
        };
        _1db.regexp = function(_1f4) {
        return _1db._parseInfo(_1f4).regexp;
        };
        _1db._parseInfo = function(_1f5) {
        _1f5 = _1f5 || {};
                var _1f6 = i18n.normalizeLocale(_1f5.locale), _1f7 = _1db._getGregorianBundle(_1f6), _1f8 = _1f5.formatLength || "short", _1f9 = _1f5.datePattern || _1f7["dateFormat-" + _1f8], _1fa = _1f5.timePattern || _1f7["timeFormat-" + _1f8], _1fb;
                if (_1f5.selector == "date") {
        _1fb = _1f9;
        } else {
        if (_1f5.selector == "time") {
        _1fb = _1fa;
        } else {
        _1fb = _1f7["dateTimeFormat-" + _1f8].replace(/\{(\d+)\}/g, function(_1fc, key) {
        return [_1fa, _1f9][key];
        });
        }
        }
        var _1fd = [], re = _1f1(_1fb, lang.hitch(this, _1fe, _1fd, _1f7, _1f5));
                return {regexp: re, tokens: _1fd, bundle: _1f7};
        };
        _1db.parse = function(_1ff, _200) {
        var _201 = /[\u200E\u200F\u202A\u202E]/g, info = _1db._parseInfo(_200), _202 = info.tokens, _203 = info.bundle, re = new RegExp("^" + info.regexp.replace(_201, "") + "$", info.strict ? "" : "i"), _204 = re.exec(_1ff && _1ff.replace(_201, ""));
                if (!_204) {
        return null;
        }
        var _205 = ["abbr", "wide", "narrow"], _206 = [1970, 0, 1, 0, 0, 0, 0], amPm = "", _207 = _1d5.every(_204, function(v, i) {
        if (!i) {
        return true;
        }
        var _208 = _202[i - 1], l = _208.length, c = _208.charAt(0);
                switch (c) {
        case "y":
                if (l != 2 && _200.strict) {
        _206[0] = v;
        } else {
        if (v < 100) {
        v = Number(v);
                var year = "" + new Date().getFullYear(), _209 = year.substring(0, 2) * 100, _20a = Math.min(Number(year.substring(2, 4)) + 20, 99);
                _206[0] = (v < _20a) ? _209 + v : _209 - 100 + v;
        } else {
        if (_200.strict) {
        return false;
        }
        _206[0] = v;
        }
        }
        break;
                case "M":
                case "L":
                if (l > 2) {
        var _20b = _203["months-" + (c == "L" ? "standAlone" : "format") + "-" + _205[l - 3]].concat();
                if (!_200.strict) {
        v = v.replace(".", "").toLowerCase();
                _20b = _1d5.map(_20b, function(s) {
                return s.replace(".", "").toLowerCase();
                });
        }
        v = _1d5.indexOf(_20b, v);
                if (v == - 1) {
        return false;
        }
        } else {
        v--;
        }
        _206[1] = v;
                break;
                case "E":
                case "e":
                case "c":
                var days = _203["days-" + (c == "c" ? "standAlone" : "format") + "-" + _205[l - 3]].concat();
                if (!_200.strict) {
        v = v.toLowerCase();
                days = _1d5.map(days, function(d) {
                return d.toLowerCase();
                });
        }
        v = _1d5.indexOf(days, v);
                if (v == - 1) {
        return false;
        }
        break;
                case "D":
                _206[1] = 0;
                case "d":
                _206[2] = v;
                break;
                case "a":
                var am = _200.am || _203["dayPeriods-format-wide-am"], pm = _200.pm || _203["dayPeriods-format-wide-pm"];
                if (!_200.strict) {
        var _20c = /\./g;
                v = v.replace(_20c, "").toLowerCase();
                am = am.replace(_20c, "").toLowerCase();
                pm = pm.replace(_20c, "").toLowerCase();
        }
        if (_200.strict && v != am && v != pm) {
        return false;
        }
        amPm = (v == pm) ? "p" : (v == am) ? "a" : "";
                break;
                case "K":
                if (v == 24) {
        v = 0;
        }
        case "h":
                case "H":
                case "k":
                if (v > 23) {
        return false;
        }
        _206[3] = v;
                break;
                case "m":
                _206[4] = v;
                break;
                case "s":
                _206[5] = v;
                break;
                case "S":
                _206[6] = v;
        }
        return true;
        });
                var _20d = + _206[3];
                if (amPm === "p" && _20d < 12) {
        _206[3] = _20d + 12;
        } else {
        if (amPm === "a" && _20d == 12) {
        _206[3] = 0;
        }
        }
        var _20e = new Date(_206[0], _206[1], _206[2], _206[3], _206[4], _206[5], _206[6]);
                if (_200.strict) {
        _20e.setFullYear(_206[0]);
        }
        var _20f = _202.join(""), _210 = _20f.indexOf("d") != - 1, _211 = _20f.indexOf("M") != - 1;
                if (!_207 || (_211 && _20e.getMonth() > _206[1]) || (_210 && _20e.getDate() > _206[2])) {
        return null;
        }
        if ((_211 && _20e.getMonth() < _206[1]) || (_210 && _20e.getDate() < _206[2])) {
        _20e = date.add(_20e, "hour", 1);
        }
        return _20e;
        };
        function _1f1(_212, _213, _214, _215) {
        var _216 = function(x) {
        return x;
        };
                _213 = _213 || _216;
                _214 = _214 || _216;
                _215 = _215 || _216;
                var _217 = _212.match(/(''|[^'])+/g), _218 = _212.charAt(0) == "'";
                _1d5.forEach(_217, function(_219, i) {
                if (!_219) {
                _217[i] = "";
                } else {
                _217[i] = (_218 ? _214 : _213)(_219.replace(/''/g, "'"));
                        _218 = !_218;
                }
                });
                return _215(_217.join(""));
        }
;
        function _1fe(_21a, _21b, _21c, _21d) {
        _21d = _1d7.escapeString(_21d);
                if (!_21c.strict) {
        _21d = _21d.replace(" a", " ?a");
        }
        return _21d.replace(/([a-z])\1*/ig, function(_21e) {
        var s, c = _21e.charAt(0), l = _21e.length, p2 = "", p3 = "";
                if (_21c.strict) {
        if (l > 1) {
        p2 = "0" + "{" + (l - 1) + "}";
        }
        if (l > 2) {
        p3 = "0" + "{" + (l - 2) + "}";
        }
        } else {
        p2 = "0?";
                p3 = "0{0,2}";
        }
        switch (c) {
        case "y":
                s = "\\d{2,4}";
                break;
                case "M":
                case "L":
                s = (l > 2) ? "\\S+?" : "1[0-2]|" + p2 + "[1-9]";
                break;
                case "D":
                s = "[12][0-9][0-9]|3[0-5][0-9]|36[0-6]|" + p2 + "[1-9][0-9]|" + p3 + "[1-9]";
                break;
                case "d":
                s = "3[01]|[12]\\d|" + p2 + "[1-9]";
                break;
                case "w":
                s = "[1-4][0-9]|5[0-3]|" + p2 + "[1-9]";
                break;
                case "E":
                case "e":
                case "c":
                s = ".+?";
                break;
                case "h":
                s = "1[0-2]|" + p2 + "[1-9]";
                break;
                case "k":
                s = "1[01]|" + p2 + "\\d";
                break;
                case "H":
                s = "1\\d|2[0-3]|" + p2 + "\\d";
                break;
                case "K":
                s = "1\\d|2[0-4]|" + p2 + "[1-9]";
                break;
                case "m":
                case "s":
                s = "[0-5]\\d";
                break;
                case "S":
                s = "\\d{" + l + "}";
                break;
                case "a":
                var am = _21c.am || _21b["dayPeriods-format-wide-am"], pm = _21c.pm || _21b["dayPeriods-format-wide-pm"];
                s = am + "|" + pm;
                if (!_21c.strict) {
        if (am != am.toLowerCase()) {
        s += "|" + am.toLowerCase();
        }
        if (pm != pm.toLowerCase()) {
        s += "|" + pm.toLowerCase();
        }
        if (s.indexOf(".") != - 1) {
        s += "|" + s.replace(/\./g, "");
        }
        }
        s = s.replace(/\./g, "\\.");
                break;
                default:
                s = ".*";
        }
        if (_21a) {
        _21a.push(_21e);
        }
        return "(" + s + ")";
        }).replace(/[\xa0 ]/g, "[\\s\\xa0]");
        }
;
        var _21f = [];
        _1db.addCustomFormats = function(_220, _221) {
        _21f.push({pkg: _220, name: _221});
        };
        _1db._getGregorianBundle = function(_222) {
        var _223 = {};
                _1d5.forEach(_21f, function(desc) {
                var _224 = i18n.getLocalization(desc.pkg, desc.name, _222);
                        _223 = lang.mixin(_223, _224);
                }, this);
                return _223;
        };
        _1db.addCustomFormats(_1da.id.replace(/\/date\/locale$/, ".cldr"), "gregorian");
        _1db.getNames = function(item, type, _225, _226) {
        var _227, _228 = _1db._getGregorianBundle(_226), _229 = [item, _225, type];
                if (_225 == "standAlone") {
        var key = _229.join("-");
                _227 = _228[key];
                if (_227[0] == 1) {
        _227 = undefined;
        }
        }
        _229[1] = "format";
                return (_227 || _228[_229.join("-")]).concat();
        };
        _1db.isWeekend = function(_22a, _22b) {
        var _22c = _1d6.getWeekend(_22b), day = (_22a || new Date()).getDay();
                if (_22c.end < _22c.start) {
        _22c.end += 7;
                if (day < _22c.start) {
        day += 7;
        }
        }
        return day >= _22c.start && day <= _22c.end;
        };
        _1db._getDayOfYear = function(_22d) {
        return date.difference(new Date(_22d.getFullYear(), 0, 1, _22d.getHours()), _22d) + 1;
        };
        _1db._getWeekOfYear = function(_22e, _22f) {
        if (arguments.length == 1) {
        _22f = 0;
        }
        var _230 = new Date(_22e.getFullYear(), 0, 1).getDay(), adj = (_230 - _22f + 7) % 7, week = Math.floor((_1db._getDayOfYear(_22e) + adj - 1) / 7);
                if (_230 == _22f) {
        week++;
        }
        return week;
        };
        return _1db;
});
}, "dojo/date": function() {
define(["./has", "./_base/lang"], function(has, lang) {
var date = {};
        date.getDaysInMonth = function(_231) {
        var _232 = _231.getMonth();
                var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if (_232 == 1 && date.isLeapYear(_231)) {
        return 29;
        }
        return days[_232];
        };
        date.isLeapYear = function(_233) {
        var year = _233.getFullYear();
                return !(year % 400) || (!(year % 4) && !!(year % 100));
        };
        date.getTimezoneName = function(_234) {
        var str = _234.toString();
                var tz = "";
                var _235;
                var pos = str.indexOf("(");
                if (pos > - 1) {
        tz = str.substring(++pos, str.indexOf(")"));
        } else {
        var pat = /([A-Z\/]+) \d{4}$/;
                if ((_235 = str.match(pat))) {
        tz = _235[1];
        } else {
        str = _234.toLocaleString();
                pat = / ([A-Z\/]+)$/;
                if ((_235 = str.match(pat))) {
        tz = _235[1];
        }
        }
        }
        return (tz == "AM" || tz == "PM") ? "" : tz;
        };
        date.compare = function(_236, _237, _238) {
        _236 = new Date( + _236);
                _237 = new Date( + (_237 || new Date()));
                if (_238 == "date") {
        _236.setHours(0, 0, 0, 0);
                _237.setHours(0, 0, 0, 0);
        } else {
        if (_238 == "time") {
        _236.setFullYear(0, 0, 0);
                _237.setFullYear(0, 0, 0);
        }
        }
        if (_236 > _237) {
        return 1;
        }
        if (_236 < _237) {
        return - 1;
        }
        return 0;
        };
        date.add = function(date, _239, _23a) {
        var sum = new Date( + date);
                var _23b = false;
                var _23c = "Date";
                switch (_239) {
        case "day":
                break;
                case "weekday":
                var days, _23d;
                var mod = _23a % 5;
                if (!mod) {
        days = (_23a > 0) ? 5 : - 5;
                _23d = (_23a > 0) ? ((_23a - 5) / 5) : ((_23a + 5) / 5);
        } else {
        days = mod;
                _23d = parseInt(_23a / 5);
        }
        var strt = date.getDay();
                var adj = 0;
                if (strt == 6 && _23a > 0) {
        adj = 1;
        } else {
        if (strt == 0 && _23a < 0) {
        adj = - 1;
        }
        }
        var trgt = strt + days;
                if (trgt == 0 || trgt == 6) {
        adj = (_23a > 0) ? 2 : - 2;
        }
        _23a = (7 * _23d) + days + adj;
                break;
                case "year":
                _23c = "FullYear";
                _23b = true;
                break;
                case "week":
                _23a *= 7;
                break;
                case "quarter":
                _23a *= 3;
                case "month":
                _23b = true;
                _23c = "Month";
                break;
                default:
                _23c = "UTC" + _239.charAt(0).toUpperCase() + _239.substring(1) + "s";
        }
        if (_23c) {
        sum["set" + _23c](sum["get" + _23c]() + _23a);
        }
        if (_23b && (sum.getDate() < date.getDate())) {
        sum.setDate(0);
        }
        return sum;
        };
        date.difference = function(_23e, _23f, _240) {
        _23f = _23f || new Date();
                _240 = _240 || "day";
                var _241 = _23f.getFullYear() - _23e.getFullYear();
                var _242 = 1;
                switch (_240) {
        case "quarter":
                var m1 = _23e.getMonth();
                var m2 = _23f.getMonth();
                var q1 = Math.floor(m1 / 3) + 1;
                var q2 = Math.floor(m2 / 3) + 1;
                q2 += (_241 * 4);
                _242 = q2 - q1;
                break;
                case "weekday":
                var days = Math.round(date.difference(_23e, _23f, "day"));
                var _243 = parseInt(date.difference(_23e, _23f, "week"));
                var mod = days % 7;
                if (mod == 0) {
        days = _243 * 5;
        } else {
        var adj = 0;
                var aDay = _23e.getDay();
                var bDay = _23f.getDay();
                _243 = parseInt(days / 7);
                mod = days % 7;
                var _244 = new Date(_23e);
                _244.setDate(_244.getDate() + (_243 * 7));
                var _245 = _244.getDay();
                if (days > 0) {
        switch (true) {
        case aDay == 6:
                adj = - 1;
                break;
                case aDay == 0:
                adj = 0;
                break;
                case bDay == 6:
                adj = - 1;
                break;
                case bDay == 0:
                adj = - 2;
                break;
                case (_245 + mod) > 5:
                adj = - 2;
        }
        } else {
        if (days < 0) {
        switch (true) {
        case aDay == 6:
                adj = 0;
                break;
                case aDay == 0:
                adj = 1;
                break;
                case bDay == 6:
                adj = 2;
                break;
                case bDay == 0:
                adj = 1;
                break;
                case (_245 + mod) < 0:
                adj = 2;
        }
        }
        }
        days += adj;
                days -= (_243 * 2);
        }
        _242 = days;
                break;
                case "year":
                _242 = _241;
                break;
                case "month":
                _242 = (_23f.getMonth() - _23e.getMonth()) + (_241 * 12);
                break;
                case "week":
                _242 = parseInt(date.difference(_23e, _23f, "day") / 7);
                break;
                case "day":
                _242 /= 24;
                case "hour":
                _242 /= 60;
                case "minute":
                _242 /= 60;
                case "second":
                _242 /= 1000;
                case "millisecond":
                _242 *= _23f.getTime() - _23e.getTime();
        }
        return Math.round(_242);
        };
        1 && lang.mixin(lang.getObject("dojo.date", true), date);
        return date;
});
}, "dojo/cldr/supplemental": function() {
define(["../_base/lang", "../i18n"], function(lang, i18n) {
var _246 = {};
        lang.setObject("dojo.cldr.supplemental", _246);
        _246.getFirstDayOfWeek = function(_247) {
        var _248 = {bd: 5, mv: 5, ae: 6, af: 6, bh: 6, dj: 6, dz: 6, eg: 6, iq: 6, ir: 6, jo: 6, kw: 6, ly: 6, ma: 6, om: 6, qa: 6, sa: 6, sd: 6, sy: 6, ye: 6, ag: 0, ar: 0, as: 0, au: 0, br: 0, bs: 0, bt: 0, bw: 0, by: 0, bz: 0, ca: 0, cn: 0, co: 0, dm: 0, "do": 0, et: 0, gt: 0, gu: 0, hk: 0, hn: 0, id: 0, ie: 0, il: 0, "in": 0, jm: 0, jp: 0, ke: 0, kh: 0, kr: 0, la: 0, mh: 0, mm: 0, mo: 0, mt: 0, mx: 0, mz: 0, ni: 0, np: 0, nz: 0, pa: 0, pe: 0, ph: 0, pk: 0, pr: 0, py: 0, sg: 0, sv: 0, th: 0, tn: 0, tt: 0, tw: 0, um: 0, us: 0, ve: 0, vi: 0, ws: 0, za: 0, zw: 0};
                var _249 = _246._region(_247);
                var dow = _248[_249];
                return (dow === undefined) ? 1 : dow;
        };
        _246._region = function(_24a) {
        _24a = i18n.normalizeLocale(_24a);
                var tags = _24a.split("-");
                var _24b = tags[1];
                if (!_24b) {
        _24b = {aa: "et", ab: "ge", af: "za", ak: "gh", am: "et", ar: "eg", as: "in", av: "ru", ay: "bo", az: "az", ba: "ru", be: "by", bg: "bg", bi: "vu", bm: "ml", bn: "bd", bo: "cn", br: "fr", bs: "ba", ca: "es", ce: "ru", ch: "gu", co: "fr", cr: "ca", cs: "cz", cv: "ru", cy: "gb", da: "dk", de: "de", dv: "mv", dz: "bt", ee: "gh", el: "gr", en: "us", es: "es", et: "ee", eu: "es", fa: "ir", ff: "sn", fi: "fi", fj: "fj", fo: "fo", fr: "fr", fy: "nl", ga: "ie", gd: "gb", gl: "es", gn: "py", gu: "in", gv: "gb", ha: "ng", he: "il", hi: "in", ho: "pg", hr: "hr", ht: "ht", hu: "hu", hy: "am", ia: "fr", id: "id", ig: "ng", ii: "cn", ik: "us", "in": "id", is: "is", it: "it", iu: "ca", iw: "il", ja: "jp", ji: "ua", jv: "id", jw: "id", ka: "ge", kg: "cd", ki: "ke", kj: "na", kk: "kz", kl: "gl", km: "kh", kn: "in", ko: "kr", ks: "in", ku: "tr", kv: "ru", kw: "gb", ky: "kg", la: "va", lb: "lu", lg: "ug", li: "nl", ln: "cd", lo: "la", lt: "lt", lu: "cd", lv: "lv", mg: "mg", mh: "mh", mi: "nz", mk: "mk", ml: "in", mn: "mn", mo: "ro", mr: "in", ms: "my", mt: "mt", my: "mm", na: "nr", nb: "no", nd: "zw", ne: "np", ng: "na", nl: "nl", nn: "no", no: "no", nr: "za", nv: "us", ny: "mw", oc: "fr", om: "et", or: "in", os: "ge", pa: "in", pl: "pl", ps: "af", pt: "br", qu: "pe", rm: "ch", rn: "bi", ro: "ro", ru: "ru", rw: "rw", sa: "in", sd: "in", se: "no", sg: "cf", si: "lk", sk: "sk", sl: "si", sm: "ws", sn: "zw", so: "so", sq: "al", sr: "rs", ss: "za", st: "za", su: "id", sv: "se", sw: "tz", ta: "in", te: "in", tg: "tj", th: "th", ti: "et", tk: "tm", tl: "ph", tn: "za", to: "to", tr: "tr", ts: "za", tt: "ru", ty: "pf", ug: "cn", uk: "ua", ur: "pk", uz: "uz", ve: "za", vi: "vn", wa: "be", wo: "sn", xh: "za", yi: "il", yo: "ng", za: "cn", zh: "cn", zu: "za", ace: "id", ady: "ru", agq: "cm", alt: "ru", amo: "ng", asa: "tz", ast: "es", awa: "in", bal: "pk", ban: "id", bas: "cm", bax: "cm", bbc: "id", bem: "zm", bez: "tz", bfq: "in", bft: "pk", bfy: "in", bhb: "in", bho: "in", bik: "ph", bin: "ng", bjj: "in", bku: "ph", bqv: "ci", bra: "in", brx: "in", bss: "cm", btv: "pk", bua: "ru", buc: "yt", bug: "id", bya: "id", byn: "er", cch: "ng", ccp: "in", ceb: "ph", cgg: "ug", chk: "fm", chm: "ru", chp: "ca", chr: "us", cja: "kh", cjm: "vn", ckb: "iq", crk: "ca", csb: "pl", dar: "ru", dav: "ke", den: "ca", dgr: "ca", dje: "ne", doi: "in", dsb: "de", dua: "cm", dyo: "sn", dyu: "bf", ebu: "ke", efi: "ng", ewo: "cm", fan: "gq", fil: "ph", fon: "bj", fur: "it", gaa: "gh", gag: "md", gbm: "in", gcr: "gf", gez: "et", gil: "ki", gon: "in", gor: "id", grt: "in", gsw: "ch", guz: "ke", gwi: "ca", haw: "us", hil: "ph", hne: "in", hnn: "ph", hoc: "in", hoj: "in", ibb: "ng", ilo: "ph", inh: "ru", jgo: "cm", jmc: "tz", kaa: "uz", kab: "dz", kaj: "ng", kam: "ke", kbd: "ru", kcg: "ng", kde: "tz", kdt: "th", kea: "cv", ken: "cm", kfo: "ci", kfr: "in", kha: "in", khb: "cn", khq: "ml", kht: "in", kkj: "cm", kln: "ke", kmb: "ao", koi: "ru", kok: "in", kos: "fm", kpe: "lr", krc: "ru", kri: "sl", krl: "ru", kru: "in", ksb: "tz", ksf: "cm", ksh: "de", kum: "ru", lag: "tz", lah: "pk", lbe: "ru", lcp: "cn", lep: "in", lez: "ru", lif: "np", lis: "cn", lki: "ir", lmn: "in", lol: "cd", lua: "cd", luo: "ke", luy: "ke", lwl: "th", mad: "id", mag: "in", mai: "in", mak: "id", man: "gn", mas: "ke", mdf: "ru", mdh: "ph", mdr: "id", men: "sl", mer: "ke", mfe: "mu", mgh: "mz", mgo: "cm", min: "id", mni: "in", mnk: "gm", mnw: "mm", mos: "bf", mua: "cm", mwr: "in", myv: "ru", nap: "it", naq: "na", nds: "de", "new": "np", niu: "nu", nmg: "cm", nnh: "cm", nod: "th", nso: "za", nus: "sd", nym: "tz", nyn: "ug", pag: "ph", pam: "ph", pap: "bq", pau: "pw", pon: "fm", prd: "ir", raj: "in", rcf: "re", rej: "id", rjs: "np", rkt: "in", rof: "tz", rwk: "tz", saf: "gh", sah: "ru", saq: "ke", sas: "id", sat: "in", saz: "in", sbp: "tz", scn: "it", sco: "gb", sdh: "ir", seh: "mz", ses: "ml", shi: "ma", shn: "mm", sid: "et", sma: "se", smj: "se", smn: "fi", sms: "fi", snk: "ml", srn: "sr", srr: "sn", ssy: "er", suk: "tz", sus: "gn", swb: "yt", swc: "cd", syl: "bd", syr: "sy", tbw: "ph", tcy: "in", tdd: "cn", tem: "sl", teo: "ug", tet: "tl", tig: "er", tiv: "ng", tkl: "tk", tmh: "ne", tpi: "pg", trv: "tw", tsg: "ph", tts: "th", tum: "mw", tvl: "tv", twq: "ne", tyv: "ru", tzm: "ma", udm: "ru", uli: "fm", umb: "ao", unr: "in", unx: "in", vai: "lr", vun: "tz", wae: "ch", wal: "et", war: "ph", xog: "ug", xsr: "np", yao: "mz", yap: "fm", yav: "cm", zza: "tr"}[tags[0]];
        } else {
        if (_24b.length == 4) {
        _24b = tags[2];
        }
        }
        return _24b;
        };
        _246.getWeekend = function(_24c) {
        var _24d = {"in": 0, af: 4, dz: 4, ir: 4, om: 4, sa: 4, ye: 4, ae: 5, bh: 5, eg: 5, il: 5, iq: 5, jo: 5, kw: 5, ly: 5, ma: 5, qa: 5, sd: 5, sy: 5, tn: 5}, _24e = {af: 5, dz: 5, ir: 5, om: 5, sa: 5, ye: 5, ae: 6, bh: 5, eg: 6, il: 6, iq: 6, jo: 6, kw: 6, ly: 6, ma: 6, qa: 6, sd: 6, sy: 6, tn: 6}, _24f = _246._region(_24c), _250 = _24d[_24f], end = _24e[_24f];
                if (_250 === undefined) {
        _250 = 6;
        }
        if (end === undefined) {
        end = 0;
        }
        return {start: _250, end: end};
        };
        return _246;
});
}, "dojo/i18n": function() {
define(["./_base/kernel", "require", "./has", "./_base/array", "./_base/config", "./_base/lang", "./_base/xhr", "./json", "module"], function(dojo, _251, has, _252, _253, lang, xhr, json, _254) {
has.add("dojo-preload-i18n-Api", 1);
        1 || has.add("dojo-v1x-i18n-Api", 1);
        var _255 = dojo.i18n = {}, _256 = /(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/, _257 = function(root, _258, _259, _25a) {
for (var _25b = [_259 + _25a], _25c = _258.split("-"), _25d = "", i = 0; i < _25c.length; i++) {
_25d += (_25d ? "-" : "") + _25c[i];
        if (!root || root[_25d]) {
_25b.push(_259 + _25d + "/" + _25a);
        _25b.specificity = _25d;
}
}
return _25b;
}, _25e = {}, _25f = function(_260, _261, _262) {
_262 = _262 ? _262.toLowerCase() : dojo.locale;
        _260 = _260.replace(/\./g, "/");
        _261 = _261.replace(/\./g, "/");
        return (/root/i.test(_262)) ? (_260 + "/nls/" + _261) : (_260 + "/nls/" + _262 + "/" + _261);
}, _263 = dojo.getL10nName = function(_264, _265, _266) {
return _264 = _254.id + "!" + _25f(_264, _265, _266);
}, _267 = function(_268, _269, _26a, _26b, _26c, load) {
_268([_269], function(root) {
var _26d = lang.clone(root.root), _26e = _257(!root._v1x && root, _26c, _26a, _26b);
        _268(_26e, function() {
        for (var i = 1; i < _26e.length; i++) {
        _26d = lang.mixin(lang.clone(_26d), arguments[i]);
        }
        var _26f = _269 + "/" + _26c;
                _25e[_26f] = _26d;
                _26d.$locale = _26e.specificity;
                load();
        });
});
}, _270 = function(id, _271) {
return /^\./.test(id) ? _271(id) : id;
}, _272 = function(_273) {
var list = _253.extraLocale || [];
        list = lang.isArray(list) ? list : [list];
        list.push(_273);
        return list;
}, load = function(id, _274, load) {
if (has("dojo-preload-i18n-Api")) {
var _275 = id.split("*"), _276 = _275[1] == "preload";
        if (_276) {
if (!_25e[id]) {
_25e[id] = 1;
        _277(_275[2], json.parse(_275[3]), 1, _274);
}
load(1);
}
if (_276 || _278(id, _274, load)) {
return;
}
}
var _279 = _256.exec(id), _27a = _279[1] + "/", _27b = _279[5] || _279[4], _27c = _27a + _27b, _27d = (_279[5] && _279[4]), _27e = _27d || dojo.locale || "", _27f = _27c + "/" + _27e, _280 = _27d ? [_27e] : _272(_27e), _281 = _280.length, _282 = function() {
if (!--_281) {
load(lang.delegate(_25e[_27f]));
}
};
        _252.forEach(_280, function(_283) {
        var _284 = _27c + "/" + _283;
                if (has("dojo-preload-i18n-Api")) {
        _285(_284);
        }
        if (!_25e[_284]) {
        _267(_274, _27c, _27a, _27b, _283, _282);
        } else {
        _282();
        }
        });
};
        if (has("dojo-unit-tests")) {
var _286 = _255.unitTests = [];
}
if (has("dojo-preload-i18n-Api") || 1) {
var _287 = _255.normalizeLocale = function(_288) {
var _289 = _288 ? _288.toLowerCase() : dojo.locale;
        return _289 == "root" ? "ROOT" : _289;
}, isXd = function(mid, _28a) {
return (1 && 1) ? _28a.isXdUrl(_251.toUrl(mid + ".js")) : true;
}, _28b = 0, _28c = [], _277 = _255._preloadLocalizations = function(_28d, _28e, _28f, _290) {
_290 = _290 || _251;
        function _291(mid, _292) {
        if (isXd(mid, _290) || _28f) {
        _290([mid], _292);
        } else {
        _29c([mid], _292, _290);
        }
        }
;
        function _293(_294, func) {
        var _295 = _294.split("-");
                while (_295.length) {
        if (func(_295.join("-"))) {
        return;
        }
        _295.pop();
        }
        func("ROOT");
        }
;
        function _296(_297) {
        _297 = _287(_297);
                _293(_297, function(loc) {
                if (_252.indexOf(_28e, loc) >= 0) {
                var mid = _28d.replace(/\./g, "/") + "_" + loc;
                        _28b++;
                        _291(mid, function(_298) {
                        for (var p in _298) {
                        _25e[_251.toAbsMid(p) + "/" + loc] = _298[p];
                        }
                        --_28b;
                                while (!_28b && _28c.length) {
                        load.apply(null, _28c.shift());
                        }
                        });
                        return true;
                }
                return false;
                });
        }
;
        _296();
        _252.forEach(dojo.config.extraLocale, _296);
}, _278 = function(id, _299, load) {
if (_28b) {
_28c.push([id, _299, load]);
}
return _28b;
}, _285 = function() {
};
}
if (1) {
var _29a = {}, _29b = new Function("__bundle", "__checkForLegacyModules", "__mid", "__amdValue", "var define = function(mid, factory){define.called = 1; __amdValue.result = factory || mid;}," + "\t   require = function(){define.called = 1;};" + "try{" + "define.called = 0;" + "eval(__bundle);" + "if(define.called==1)" + "return __amdValue;" + "if((__checkForLegacyModules = __checkForLegacyModules(__mid)))" + "return __checkForLegacyModules;" + "}catch(e){}" + "try{" + "return eval('('+__bundle+')');" + "}catch(e){" + "return e;" + "}"), _29c = function(deps, _29d, _29e) {
var _29f = [];
        _252.forEach(deps, function(mid) {
        var url = _29e.toUrl(mid + ".js");
                function load(text) {
                var _2a0 = _29b(text, _285, mid, _29a);
                        if (_2a0 === _29a) {
                _29f.push(_25e[url] = _29a.result);
                } else {
                if (_2a0 instanceof Error) {
                console.error("failed to evaluate i18n bundle; url=" + url, _2a0);
                        _2a0 = {};
                }
                _29f.push(_25e[url] = (/nls\/[^\/]+\/[^\/]+$/.test(url) ? _2a0 : {root: _2a0, _v1x: 1}));
                }
                }
        ;
                if (_25e[url]) {
        _29f.push(_25e[url]);
        } else {
        var _2a1 = _29e.syncLoadNls(mid);
                if (_2a1) {
        _29f.push(_2a1);
        } else {
        if (!xhr) {
        try {
        _29e.getText(url, true, load);
        } catch (e) {
        _29f.push(_25e[url] = {});
        }
        } else {
        xhr.get({url: url, sync: true, load: load, error: function() {
        _29f.push(_25e[url] = {});
        }});
        }
        }
        }
        });
        _29d && _29d.apply(null, _29f);
};
        _285 = function(_2a2) {
        for (var _2a3, _2a4 = _2a2.split("/"), _2a5 = dojo.global[_2a4[0]], i = 1; _2a5 && i < _2a4.length - 1; _2a5 = _2a5[_2a4[i++]]) {
        }
        if (_2a5) {
        _2a3 = _2a5[_2a4[i]];
                if (!_2a3) {
        _2a3 = _2a5[_2a4[i].replace(/-/g, "_")];
        }
        if (_2a3) {
        _25e[_2a2] = _2a3;
        }
        }
        return _2a3;
        };
        _255.getLocalization = function(_2a6, _2a7, _2a8) {
        var _2a9, _2aa = _25f(_2a6, _2a7, _2a8);
                load(_2aa, (!isXd(_2aa, _251) ? function(deps, _2ab) {
                _29c(deps, _2ab, _251);
                } : _251), function(_2ac) {
                _2a9 = _2ac;
                });
                return _2a9;
        };
        if (has("dojo-unit-tests")) {
_286.push(function(doh) {
doh.register("tests.i18n.unit", function(t) {
var _2ad;
        _2ad = _29b("{prop:1}", _285, "nonsense", _29a);
        t.is({prop: 1}, _2ad);
        t.is(undefined, _2ad[1]);
        _2ad = _29b("({prop:1})", _285, "nonsense", _29a);
        t.is({prop: 1}, _2ad);
        t.is(undefined, _2ad[1]);
        _2ad = _29b("{'prop-x':1}", _285, "nonsense", _29a);
        t.is({"prop-x": 1}, _2ad);
        t.is(undefined, _2ad[1]);
        _2ad = _29b("({'prop-x':1})", _285, "nonsense", _29a);
        t.is({"prop-x": 1}, _2ad);
        t.is(undefined, _2ad[1]);
        _2ad = _29b("define({'prop-x':1})", _285, "nonsense", _29a);
        t.is(_29a, _2ad);
        t.is({"prop-x": 1}, _29a.result);
        _2ad = _29b("define('some/module', {'prop-x':1})", _285, "nonsense", _29a);
        t.is(_29a, _2ad);
        t.is({"prop-x": 1}, _29a.result);
        _2ad = _29b("this is total nonsense and should throw an error", _285, "nonsense", _29a);
        t.is(_2ad instanceof Error, true);
});
});
}
}
return lang.mixin(_255, {dynamic: true, normalize: _270, load: load, cache: _25e, getL10nName: _263});
});
}, "dojo/regexp": function() {
define(["./_base/kernel", "./_base/lang"], function(dojo, lang) {
var _2ae = {};
        lang.setObject("dojo.regexp", _2ae);
        _2ae.escapeString = function(str, _2af) {
        return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function(ch) {
        if (_2af && _2af.indexOf(ch) != - 1) {
        return ch;
        }
        return "\\" + ch;
        });
        };
        _2ae.buildGroupRE = function(arr, re, _2b0) {
        if (!(arr instanceof Array)) {
        return re(arr);
        }
        var b = [];
                for (var i = 0; i < arr.length; i++) {
        b.push(re(arr[i]));
        }
        return _2ae.group(b.join("|"), _2b0);
        };
        _2ae.group = function(_2b1, _2b2) {
        return "(" + (_2b2 ? "?:" : "") + _2b1 + ")";
        };
        return _2ae;
});
}, "dojo/parser": function() {
define(["require", "./_base/kernel", "./_base/lang", "./_base/array", "./_base/config", "./dom", "./_base/window", "./_base/url", "./aspect", "./promise/all", "./date/stamp", "./Deferred", "./has", "./query", "./on", "./ready"], function(_2b3, dojo, _2b4, _2b5, _2b6, dom, _2b7, _2b8, _2b9, all, _2ba, _2bb, has, _2bc, don, _2bd) {
new Date("X");
        function _2be(text) {
        return eval("(" + text + ")");
        }
;
        var _2bf = 0;
        _2b9.after(_2b4, "extend", function() {
        _2bf++;
        }, true);
        function _2c0(ctor) {
        var map = ctor._nameCaseMap, _2c1 = ctor.prototype;
                if (!map || map._extendCnt < _2bf) {
        map = ctor._nameCaseMap = {};
                for (var name in _2c1) {
        if (name.charAt(0) === "_") {
        continue;
        }
        map[name.toLowerCase()] = name;
        }
        map._extendCnt = _2bf;
        }
        return map;
        }
;
        var _2c2 = {};
        function _2c3(_2c4, _2c5) {
        var ts = _2c4.join();
                if (!_2c2[ts]) {
        var _2c6 = [];
                for (var i = 0, l = _2c4.length; i < l; i++) {
        var t = _2c4[i];
                _2c6[_2c6.length] = (_2c2[t] = _2c2[t] || (_2b4.getObject(t) || (~t.indexOf("/") && (_2c5 ? _2c5(t) : _2b3(t)))));
        }
        var ctor = _2c6.shift();
                _2c2[ts] = _2c6.length ? (ctor.createSubclass ? ctor.createSubclass(_2c6) : ctor.extend.apply(ctor, _2c6)) : ctor;
        }
        return _2c2[ts];
        }
;
        var _2c7 = {_clearCache: function() {
        _2bf++;
                _2c2 = {};
        }, _functionFromScript: function(_2c8, _2c9) {
        var _2ca = "", _2cb = "", _2cc = (_2c8.getAttribute(_2c9 + "args") || _2c8.getAttribute("args")), _2cd = _2c8.getAttribute("with");
                var _2ce = (_2cc || "").split(/\s*,\s*/);
                if (_2cd && _2cd.length) {
        _2b5.forEach(_2cd.split(/\s*,\s*/), function(part) {
        _2ca += "with(" + part + "){";
                _2cb += "}";
        });
        }
        return new Function(_2ce, _2ca + _2c8.innerHTML + _2cb);
        }, instantiate: function(_2cf, _2d0, _2d1) {
        _2d0 = _2d0 || {};
                _2d1 = _2d1 || {};
                var _2d2 = (_2d1.scope || dojo._scopeName) + "Type", _2d3 = "data-" + (_2d1.scope || dojo._scopeName) + "-", _2d4 = _2d3 + "type", _2d5 = _2d3 + "mixins";
                var list = [];
                _2b5.forEach(_2cf, function(node) {
                var type = _2d2 in _2d0 ? _2d0[_2d2] : node.getAttribute(_2d4) || node.getAttribute(_2d2);
                        if (type) {
                var _2d6 = node.getAttribute(_2d5), _2d7 = _2d6 ? [type].concat(_2d6.split(/\s*,\s*/)) : [type];
                        list.push({node: node, types: _2d7});
                }
                });
                return this._instantiate(list, _2d0, _2d1);
        }, _instantiate: function(_2d8, _2d9, _2da, _2db) {
        var _2dc = _2b5.map(_2d8, function(obj) {
        var ctor = obj.ctor || _2c3(obj.types, _2da.contextRequire);
                if (!ctor) {
        throw new Error("Unable to resolve constructor for: '" + obj.types.join() + "'");
        }
        return this.construct(ctor, obj.node, _2d9, _2da, obj.scripts, obj.inherited);
        }, this);
                function _2dd(_2de) {
                if (!_2d9._started && !_2da.noStart) {
                _2b5.forEach(_2de, function(_2df) {
                if (typeof _2df.startup === "function" && !_2df._started) {
                _2df.startup();
                }
                });
                }
                return _2de;
                }
        ;
                if (_2db) {
        return all(_2dc).then(_2dd);
        } else {
        return _2dd(_2dc);
        }
        }, construct: function(ctor, node, _2e0, _2e1, _2e2, _2e3) {
        var _2e4 = ctor && ctor.prototype;
                _2e1 = _2e1 || {};
                var _2e5 = {};
                if (_2e1.defaults) {
        _2b4.mixin(_2e5, _2e1.defaults);
        }
        if (_2e3) {
        _2b4.mixin(_2e5, _2e3);
        }
        var _2e6;
                if (has("dom-attributes-explicit")) {
        _2e6 = node.attributes;
        } else {
        if (has("dom-attributes-specified-flag")) {
        _2e6 = _2b5.filter(node.attributes, function(a) {
        return a.specified;
        });
        } else {
        var _2e7 = /^input$|^img$/i.test(node.nodeName) ? node : node.cloneNode(false), _2e8 = _2e7.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g, "").replace(/^\s*<[a-zA-Z0-9]*\s*/, "").replace(/\s*>.*$/, "");
                _2e6 = _2b5.map(_2e8.split(/\s+/), function(name) {
                var _2e9 = name.toLowerCase();
                        return {name: name, value: (node.nodeName == "LI" && name == "value") || _2e9 == "enctype" ? node.getAttribute(_2e9) : node.getAttributeNode(_2e9).value};
                });
        }
        }
        var _2ea = _2e1.scope || dojo._scopeName, _2eb = "data-" + _2ea + "-", hash = {};
                if (_2ea !== "dojo") {
        hash[_2eb + "props"] = "data-dojo-props";
                hash[_2eb + "type"] = "data-dojo-type";
                hash[_2eb + "mixins"] = "data-dojo-mixins";
                hash[_2ea + "type"] = "dojoType";
                hash[_2eb + "id"] = "data-dojo-id";
        }
        var i = 0, item, _2ec = [], _2ed, _2ee;
                while (item = _2e6[i++]) {
        var name = item.name, _2ef = name.toLowerCase(), _2f0 = item.value;
                switch (hash[_2ef] || _2ef) {
        case "data-dojo-type":
                case "dojotype":
                case "data-dojo-mixins":
                break;
                case "data-dojo-props":
                _2ee = _2f0;
                break;
                case "data-dojo-id":
                case "jsid":
                _2ed = _2f0;
                break;
                case "data-dojo-attach-point":
                case "dojoattachpoint":
                _2e5.dojoAttachPoint = _2f0;
                break;
                case "data-dojo-attach-event":
                case "dojoattachevent":
                _2e5.dojoAttachEvent = _2f0;
                break;
                case "class":
                _2e5["class"] = node.className;
                break;
                case "style":
                _2e5["style"] = node.style && node.style.cssText;
                break;
                default:
                if (!(name in _2e4)) {
        var map = _2c0(ctor);
                name = map[_2ef] || name;
        }
        if (name in _2e4) {
        switch (typeof _2e4[name]) {
        case "string":
                _2e5[name] = _2f0;
                break;
                case "number":
                _2e5[name] = _2f0.length ? Number(_2f0) : NaN;
                break;
                case "boolean":
                _2e5[name] = _2f0.toLowerCase() != "false";
                break;
                case "function":
                if (_2f0 === "" || _2f0.search(/[^\w\.]+/i) != - 1) {
        _2e5[name] = new Function(_2f0);
        } else {
        _2e5[name] = _2b4.getObject(_2f0, false) || new Function(_2f0);
        }
        _2ec.push(name);
                break;
                default:
                var pVal = _2e4[name];
                _2e5[name] = (pVal && "length" in pVal) ? (_2f0 ? _2f0.split(/\s*,\s*/) : []) : (pVal instanceof Date) ? (_2f0 == "" ? new Date("") : _2f0 == "now" ? new Date() : _2ba.fromISOString(_2f0)) : (pVal instanceof _2b8) ? (dojo.baseUrl + _2f0) : _2be(_2f0);
        }
        } else {
        _2e5[name] = _2f0;
        }
        }
        }
        for (var j = 0; j < _2ec.length; j++) {
        var _2f1 = _2ec[j].toLowerCase();
                node.removeAttribute(_2f1);
                node[_2f1] = null;
        }
        if (_2ee) {
        try {
        _2ee = _2be.call(_2e1.propsThis, "{" + _2ee + "}");
                _2b4.mixin(_2e5, _2ee);
        } catch (e) {
        throw new Error(e.toString() + " in data-dojo-props='" + _2ee + "'");
        }
        }
        _2b4.mixin(_2e5, _2e0);
                if (!_2e2) {
        _2e2 = (ctor && (ctor._noScript || _2e4._noScript) ? [] : _2bc("> script[type^='dojo/']", node));
        }
        var _2f2 = [], _2f3 = [], _2f4 = [], ons = [];
                if (_2e2) {
        for (i = 0; i < _2e2.length; i++) {
        var _2f5 = _2e2[i];
                node.removeChild(_2f5);
                var _2f6 = (_2f5.getAttribute(_2eb + "event") || _2f5.getAttribute("event")), prop = _2f5.getAttribute(_2eb + "prop"), _2f7 = _2f5.getAttribute(_2eb + "method"), _2f8 = _2f5.getAttribute(_2eb + "advice"), _2f9 = _2f5.getAttribute("type"), nf = this._functionFromScript(_2f5, _2eb);
                if (_2f6) {
        if (_2f9 == "dojo/connect") {
        _2f2.push({method: _2f6, func: nf});
        } else {
        if (_2f9 == "dojo/on") {
        ons.push({event: _2f6, func: nf});
        } else {
        _2e5[_2f6] = nf;
        }
        }
        } else {
        if (_2f9 == "dojo/aspect") {
        _2f2.push({method: _2f7, advice: _2f8, func: nf});
        } else {
        if (_2f9 == "dojo/watch") {
        _2f4.push({prop: prop, func: nf});
        } else {
        _2f3.push(nf);
        }
        }
        }
        }
        }
        var _2fa = ctor.markupFactory || _2e4.markupFactory;
                var _2fb = _2fa ? _2fa(_2e5, node, ctor) : new ctor(_2e5, node);
                function _2fc(_2fd) {
                if (_2ed) {
                _2b4.setObject(_2ed, _2fd);
                }
                for (i = 0; i < _2f2.length; i++) {
                _2b9[_2f2[i].advice || "after"](_2fd, _2f2[i].method, _2b4.hitch(_2fd, _2f2[i].func), true);
                }
                for (i = 0; i < _2f3.length; i++) {
                _2f3[i].call(_2fd);
                }
                for (i = 0; i < _2f4.length; i++) {
                _2fd.watch(_2f4[i].prop, _2f4[i].func);
                }
                for (i = 0; i < ons.length; i++) {
                don(_2fd, ons[i].event, ons[i].func);
                }
                return _2fd;
                }
        ;
                if (_2fb.then) {
        return _2fb.then(_2fc);
        } else {
        return _2fc(_2fb);
        }
        }, scan: function(root, _2fe) {
        var list = [], mids = [], _2ff = {};
                var _300 = (_2fe.scope || dojo._scopeName) + "Type", _301 = "data-" + (_2fe.scope || dojo._scopeName) + "-", _302 = _301 + "type", _303 = _301 + "textdir", _304 = _301 + "mixins";
                var node = root.firstChild;
                var _305 = _2fe.inherited;
                if (!_305) {
        function _306(node, attr) {
        return (node.getAttribute && node.getAttribute(attr)) || (node.parentNode && _306(node.parentNode, attr));
        }
        ;
                _305 = {dir: _306(root, "dir"), lang: _306(root, "lang"), textDir: _306(root, _303)};
                for (var key in _305) {
        if (!_305[key]) {
        delete _305[key];
        }
        }
        }
        var _307 = {inherited: _305};
                var _308;
                var _309;
                function _30a(_30b) {
                if (!_30b.inherited) {
                _30b.inherited = {};
                        var node = _30b.node, _30c = _30a(_30b.parent);
                        var _30d = {dir: node.getAttribute("dir") || _30c.dir, lang: node.getAttribute("lang") || _30c.lang, textDir: node.getAttribute(_303) || _30c.textDir};
                        for (var key in _30d) {
                if (_30d[key]) {
                _30b.inherited[key] = _30d[key];
                }
                }
                }
                return _30b.inherited;
                }
        ;
                while (true) {
        if (!node) {
        if (!_307 || !_307.node) {
        break;
        }
        node = _307.node.nextSibling;
                _309 = false;
                _307 = _307.parent;
                _308 = _307.scripts;
                continue;
        }
        if (node.nodeType != 1) {
        node = node.nextSibling;
                continue;
        }
        if (_308 && node.nodeName.toLowerCase() == "script") {
        type = node.getAttribute("type");
                if (type && /^dojo\/\w/i.test(type)) {
        _308.push(node);
        }
        node = node.nextSibling;
                continue;
        }
        if (_309) {
        node = node.nextSibling;
                continue;
        }
        var type = node.getAttribute(_302) || node.getAttribute(_300);
                var _30e = node.firstChild;
                if (!type && (!_30e || (_30e.nodeType == 3 && !_30e.nextSibling))) {
        node = node.nextSibling;
                continue;
        }
        var _30f;
                var ctor = null;
                if (type) {
        var _310 = node.getAttribute(_304), _311 = _310 ? [type].concat(_310.split(/\s*,\s*/)) : [type];
                try {
                ctor = _2c3(_311, _2fe.contextRequire);
                } catch (e) {
        }
        if (!ctor) {
        _2b5.forEach(_311, function(t) {
        if (~t.indexOf("/") && !_2ff[t]) {
        _2ff[t] = true;
                mids[mids.length] = t;
        }
        });
        }
        var _312 = ctor && !ctor.prototype._noScript ? [] : null;
                _30f = {types: _311, ctor: ctor, parent: _307, node: node, scripts: _312};
                _30f.inherited = _30a(_30f);
                list.push(_30f);
        } else {
        _30f = {node: node, scripts: _308, parent: _307};
        }
        _308 = _312;
                _309 = node.stopParser || (ctor && ctor.prototype.stopParser && !(_2fe.template));
                _307 = _30f;
                node = _30e;
        }
        var d = new _2bb();
                if (mids.length) {
        if (has("dojo-debug-messages")) {
        console.warn("WARNING: Modules being Auto-Required: " + mids.join(", "));
        }
        var r = _2fe.contextRequire || _2b3;
                r(mids, function() {
                d.resolve(_2b5.filter(list, function(_313) {
                if (!_313.ctor) {
                try {
                _313.ctor = _2c3(_313.types, _2fe.contextRequire);
                } catch (e) {
                }
                }
                var _314 = _313.parent;
                        while (_314 && !_314.types) {
                _314 = _314.parent;
                }
                var _315 = _313.ctor && _313.ctor.prototype;
                        _313.instantiateChildren = !(_315 && _315.stopParser && !(_2fe.template));
                        _313.instantiate = !_314 || (_314.instantiate && _314.instantiateChildren);
                        return _313.instantiate;
                }));
                });
        } else {
        d.resolve(list);
        }
        return d.promise;
        }, _require: function(_316, _317) {
        var hash = _2be("{" + _316.innerHTML + "}"), vars = [], mids = [], d = new _2bb();
                var _318 = (_317 && _317.contextRequire) || _2b3;
                for (var name in hash) {
        vars.push(name);
                mids.push(hash[name]);
        }
        _318(mids, function() {
        for (var i = 0; i < vars.length; i++) {
        _2b4.setObject(vars[i], arguments[i]);
        }
        d.resolve(arguments);
        });
                return d.promise;
        }, _scanAmd: function(root, _319) {
        var _31a = new _2bb(), _31b = _31a.promise;
                _31a.resolve(true);
                var self = this;
                _2bc("script[type='dojo/require']", root).forEach(function(node) {
        _31b = _31b.then(function() {
        return self._require(node, _319);
        });
                node.parentNode.removeChild(node);
        });
                return _31b;
        }, parse: function(_31c, _31d) {
        var root;
                if (!_31d && _31c && _31c.rootNode) {
        _31d = _31c;
                root = _31d.rootNode;
        } else {
        if (_31c && _2b4.isObject(_31c) && !("nodeType" in _31c)) {
        _31d = _31c;
        } else {
        root = _31c;
        }
        }
        root = root ? dom.byId(root) : _2b7.body();
                _31d = _31d || {};
                var _31e = _31d.template ? {template: true} : {}, _31f = [], self = this;
                var p = this._scanAmd(root, _31d).then(function() {
        return self.scan(root, _31d);
        }).then(function(_320) {
        return self._instantiate(_320, _31e, _31d, true);
        }).then(function(_321) {
        return _31f = _31f.concat(_321);
        }).otherwise(function(e) {
        console.error("dojo/parser::parse() error", e);
                throw e;
        });
                _2b4.mixin(_31f, p);
                return _31f;
        }};
        if (1) {
dojo.parser = _2c7;
}
if (_2b6.parseOnLoad) {
_2bd(100, _2c7, "parse");
}
return _2c7;
});
}, "dojo/_base/url": function() {
define(["./kernel"], function(dojo) {
var ore = new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"), ire = new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"), _322 = function() {
var n = null, _323 = arguments, uri = [_323[0]];
        for (var i = 1; i < _323.length; i++) {
if (!_323[i]) {
continue;
}
var _324 = new _322(_323[i] + ""), _325 = new _322(uri[0] + "");
        if (_324.path == "" && !_324.scheme && !_324.authority && !_324.query) {
if (_324.fragment != n) {
_325.fragment = _324.fragment;
}
_324 = _325;
} else {
if (!_324.scheme) {
_324.scheme = _325.scheme;
        if (!_324.authority) {
_324.authority = _325.authority;
        if (_324.path.charAt(0) != "/") {
var path = _325.path.substring(0, _325.path.lastIndexOf("/") + 1) + _324.path;
        var segs = path.split("/");
        for (var j = 0; j < segs.length; j++) {
if (segs[j] == ".") {
if (j == segs.length - 1) {
segs[j] = "";
} else {
segs.splice(j, 1);
        j--;
}
} else {
if (j > 0 && !(j == 1 && segs[0] == "") && segs[j] == ".." && segs[j - 1] != "..") {
if (j == (segs.length - 1)) {
segs.splice(j, 1);
        segs[j - 1] = "";
} else {
segs.splice(j - 1, 2);
        j -= 2;
}
}
}
}
_324.path = segs.join("/");
}
}
}
}
uri = [];
        if (_324.scheme) {
uri.push(_324.scheme, ":");
}
if (_324.authority) {
uri.push("//", _324.authority);
}
uri.push(_324.path);
        if (_324.query) {
uri.push("?", _324.query);
}
if (_324.fragment) {
uri.push("#", _324.fragment);
}
}
this.uri = uri.join("");
        var r = this.uri.match(ore);
        this.scheme = r[2] || (r[1] ? "" : n);
        this.authority = r[4] || (r[3] ? "" : n);
        this.path = r[5];
        this.query = r[7] || (r[6] ? "" : n);
        this.fragment = r[9] || (r[8] ? "" : n);
        if (this.authority != n) {
r = this.authority.match(ire);
        this.user = r[3] || n;
        this.password = r[4] || n;
        this.host = r[6] || r[7];
        this.port = r[9] || n;
}
};
        _322.prototype.toString = function() {
        return this.uri;
        };
        return dojo._Url = _322;
});
}, "dojo/promise/all": function() {
define(["../_base/array", "../Deferred", "../when"], function(_326, _327, when) {
"use strict";
        var some = _326.some;
        return function all(_328) {
        var _329, _326;
                if (_328 instanceof Array) {
        _326 = _328;
        } else {
        if (_328 && typeof _328 === "object") {
        _329 = _328;
        }
        }
        var _32a;
                var _32b = [];
                if (_329) {
        _326 = [];
                for (var key in _329) {
        if (Object.hasOwnProperty.call(_329, key)) {
        _32b.push(key);
                _326.push(_329[key]);
        }
        }
        _32a = {};
        } else {
        if (_326) {
        _32a = [];
        }
        }
        if (!_326 || !_326.length) {
        return new _327().resolve(_32a);
        }
        var _32c = new _327();
                _32c.promise.always(function() {
                _32a = _32b = null;
                });
                var _32d = _326.length;
                some(_326, function(_32e, _32f) {
                if (!_329) {
                _32b.push(_32f);
                }
                when(_32e, function(_330) {
                if (!_32c.isFulfilled()) {
                _32a[_32b[_32f]] = _330;
                        if (--_32d === 0) {
                _32c.resolve(_32a);
                }
                }
                }, _32c.reject);
                        return _32c.isFulfilled();
                });
                return _32c.promise;
        };
});
}, "dojo/date/stamp": function() {
define(["../_base/lang", "../_base/array"], function(lang, _331) {
var _332 = {};
        lang.setObject("dojo.date.stamp", _332);
        _332.fromISOString = function(_333, _334) {
        if (!_332._isoRegExp) {
        _332._isoRegExp = /^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
        }
        var _335 = _332._isoRegExp.exec(_333), _336 = null;
                if (_335) {
        _335.shift();
                if (_335[1]) {
        _335[1]--;
        }
        if (_335[6]) {
        _335[6] *= 1000;
        }
        if (_334) {
        _334 = new Date(_334);
                _331.forEach(_331.map(["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds", "Milliseconds"], function(prop) {
                return _334["get" + prop]();
                }), function(_337, _338) {
                _335[_338] = _335[_338] || _337;
                });
        }
        _336 = new Date(_335[0] || 1970, _335[1] || 0, _335[2] || 1, _335[3] || 0, _335[4] || 0, _335[5] || 0, _335[6] || 0);
                if (_335[0] < 100) {
        _336.setFullYear(_335[0] || 1970);
        }
        var _339 = 0, _33a = _335[7] && _335[7].charAt(0);
                if (_33a != "Z") {
        _339 = ((_335[8] || 0) * 60) + (Number(_335[9]) || 0);
                if (_33a != "-") {
        _339 *= - 1;
        }
        }
        if (_33a) {
        _339 -= _336.getTimezoneOffset();
        }
        if (_339) {
        _336.setTime(_336.getTime() + _339 * 60000);
        }
        }
        return _336;
        };
        _332.toISOString = function(_33b, _33c) {
        var _33d = function(n) {
        return (n < 10) ? "0" + n : n;
        };
                _33c = _33c || {};
                var _33e = [], _33f = _33c.zulu ? "getUTC" : "get", date = "";
                if (_33c.selector != "time") {
        var year = _33b[_33f + "FullYear"]();
                date = ["0000".substr((year + "").length) + year, _33d(_33b[_33f + "Month"]() + 1), _33d(_33b[_33f + "Date"]())].join("-");
        }
        _33e.push(date);
                if (_33c.selector != "date") {
        var time = [_33d(_33b[_33f + "Hours"]()), _33d(_33b[_33f + "Minutes"]()), _33d(_33b[_33f + "Seconds"]())].join(":");
                var _340 = _33b[_33f + "Milliseconds"]();
                if (_33c.milliseconds) {
        time += "." + (_340 < 100 ? "0" : "") + _33d(_340);
        }
        if (_33c.zulu) {
        time += "Z";
        } else {
        if (_33c.selector != "time") {
        var _341 = _33b.getTimezoneOffset();
                var _342 = Math.abs(_341);
                time += (_341 > 0 ? "-" : "+") + _33d(Math.floor(_342 / 60)) + ":" + _33d(_342 % 60);
        }
        }
        _33e.push(time);
        }
        return _33e.join("T");
        };
        return _332;
});
}, "dojo/data/ItemFileReadStore": function() {
define(["../_base/kernel", "../_base/lang", "../_base/declare", "../_base/array", "../_base/xhr", "../Evented", "./util/filter", "./util/simpleFetch", "../date/stamp"], function(_343, lang, _344, _345, xhr, _346, _347, _348, _349) {
var _34a = _344("dojo.data.ItemFileReadStore", [_346], {constructor: function(_34b) {
this._arrayOfAllItems = [];
        this._arrayOfTopLevelItems = [];
        this._loadFinished = false;
        this._jsonFileUrl = _34b.url;
        this._ccUrl = _34b.url;
        this.url = _34b.url;
        this._jsonData = _34b.data;
        this.data = null;
        this._datatypeMap = _34b.typeMap || {};
        if (!this._datatypeMap["Date"]) {
this._datatypeMap["Date"] = {type: Date, deserialize: function(_34c) {
return _349.fromISOString(_34c);
}};
}
this._features = {"dojo.data.api.Read": true, "dojo.data.api.Identity": true};
        this._itemsByIdentity = null;
        this._storeRefPropName = "_S";
        this._itemNumPropName = "_0";
        this._rootItemPropName = "_RI";
        this._reverseRefMap = "_RRM";
        this._loadInProgress = false;
        this._queuedFetches = [];
        if (_34b.urlPreventCache !== undefined) {
this.urlPreventCache = _34b.urlPreventCache ? true : false;
}
if (_34b.hierarchical !== undefined) {
this.hierarchical = _34b.hierarchical ? true : false;
}
if (_34b.clearOnClose) {
this.clearOnClose = true;
}
if ("failOk" in _34b) {
this.failOk = _34b.failOk ? true : false;
}
}, url: "", _ccUrl: "", data: null, typeMap: null, clearOnClose: false, urlPreventCache: false, failOk: false, hierarchical: true, _assertIsItem: function(item) {
if (!this.isItem(item)) {
throw new Error(this.declaredClass + ": Invalid item argument.");
}
}, _assertIsAttribute: function(_34d) {
if (typeof _34d !== "string") {
throw new Error(this.declaredClass + ": Invalid attribute argument.");
}
}, getValue: function(item, _34e, _34f) {
var _350 = this.getValues(item, _34e);
        return (_350.length > 0) ? _350[0] : _34f;
}, getValues: function(item, _351) {
this._assertIsItem(item);
        this._assertIsAttribute(_351);
        return (item[_351] || []).slice(0);
}, getAttributes: function(item) {
this._assertIsItem(item);
        var _352 = [];
        for (var key in item) {
if ((key !== this._storeRefPropName) && (key !== this._itemNumPropName) && (key !== this._rootItemPropName) && (key !== this._reverseRefMap)) {
_352.push(key);
}
}
return _352;
}, hasAttribute: function(item, _353) {
this._assertIsItem(item);
        this._assertIsAttribute(_353);
        return (_353 in item);
}, containsValue: function(item, _354, _355) {
var _356 = undefined;
        if (typeof _355 === "string") {
_356 = _347.patternToRegExp(_355, false);
}
return this._containsValue(item, _354, _355, _356);
}, _containsValue: function(item, _357, _358, _359) {
return _345.some(this.getValues(item, _357), function(_35a) {
if (_35a !== null && !lang.isObject(_35a) && _359) {
if (_35a.toString().match(_359)) {
return true;
}
} else {
if (_358 === _35a) {
return true;
}
}
});
}, isItem: function(_35b) {
if (_35b && _35b[this._storeRefPropName] === this) {
if (this._arrayOfAllItems[_35b[this._itemNumPropName]] === _35b) {
return true;
}
}
return false;
}, isItemLoaded: function(_35c) {
return this.isItem(_35c);
}, loadItem: function(_35d) {
this._assertIsItem(_35d.item);
}, getFeatures: function() {
return this._features;
}, getLabel: function(item) {
if (this._labelAttr && this.isItem(item)) {
return this.getValue(item, this._labelAttr);
}
return undefined;
}, getLabelAttributes: function(item) {
if (this._labelAttr) {
return [this._labelAttr];
}
return null;
}, filter: function(_35e, _35f, _360) {
var _361 = [], i, key;
        if (_35e.query) {
var _362, _363 = _35e.queryOptions ? _35e.queryOptions.ignoreCase : false;
        var _364 = {};
        for (key in _35e.query) {
_362 = _35e.query[key];
        if (typeof _362 === "string") {
_364[key] = _347.patternToRegExp(_362, _363);
} else {
if (_362 instanceof RegExp) {
_364[key] = _362;
}
}
}
for (i = 0; i < _35f.length; ++i) {
var _365 = true;
        var _366 = _35f[i];
        if (_366 === null) {
_365 = false;
} else {
for (key in _35e.query) {
_362 = _35e.query[key];
        if (!this._containsValue(_366, key, _362, _364[key])) {
_365 = false;
}
}
}
if (_365) {
_361.push(_366);
}
}
_360(_361, _35e);
} else {
for (i = 0; i < _35f.length; ++i) {
var item = _35f[i];
        if (item !== null) {
_361.push(item);
}
}
_360(_361, _35e);
}
}, _fetchItems: function(_367, _368, _369) {
var self = this;
        if (this._loadFinished) {
this.filter(_367, this._getItemsArray(_367.queryOptions), _368);
} else {
if (this._jsonFileUrl !== this._ccUrl) {
_343.deprecated(this.declaredClass + ": ", "To change the url, set the url property of the store," + " not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
        this._ccUrl = this._jsonFileUrl;
        this.url = this._jsonFileUrl;
} else {
if (this.url !== this._ccUrl) {
this._jsonFileUrl = this.url;
        this._ccUrl = this.url;
}
}
if (this.data != null) {
this._jsonData = this.data;
        this.data = null;
}
if (this._jsonFileUrl) {
if (this._loadInProgress) {
this._queuedFetches.push({args: _367, filter: lang.hitch(self, "filter"), findCallback: lang.hitch(self, _368)});
} else {
this._loadInProgress = true;
        var _36a = {url: self._jsonFileUrl, handleAs: "json-comment-optional", preventCache: this.urlPreventCache, failOk: this.failOk};
        var _36b = xhr.get(_36a);
        _36b.addCallback(function(data) {
        try {
        self._getItemsFromLoadedData(data);
                self._loadFinished = true;
                self._loadInProgress = false;
                self.filter(_367, self._getItemsArray(_367.queryOptions), _368);
                self._handleQueuedFetches();
        } catch (e) {
        self._loadFinished = true;
                self._loadInProgress = false;
                _369(e, _367);
        }
        });
        _36b.addErrback(function(_36c) {
        self._loadInProgress = false;
                _369(_36c, _367);
        });
        var _36d = null;
        if (_367.abort) {
_36d = _367.abort;
}
_367.abort = function() {
var df = _36b;
        if (df && df.fired === - 1) {
df.cancel();
        df = null;
}
if (_36d) {
_36d.call(_367);
}
};
}
} else {
if (this._jsonData) {
try {
this._loadFinished = true;
        this._getItemsFromLoadedData(this._jsonData);
        this._jsonData = null;
        self.filter(_367, this._getItemsArray(_367.queryOptions), _368);
} catch (e) {
_369(e, _367);
}
} else {
_369(new Error(this.declaredClass + ": No JSON source data was provided as either URL or a nested Javascript object."), _367);
}
}
}
}, _handleQueuedFetches: function() {
if (this._queuedFetches.length > 0) {
for (var i = 0; i < this._queuedFetches.length; i++) {
var _36e = this._queuedFetches[i], _36f = _36e.args, _370 = _36e.filter, _371 = _36e.findCallback;
        if (_370) {
_370(_36f, this._getItemsArray(_36f.queryOptions), _371);
} else {
this.fetchItemByIdentity(_36f);
}
}
this._queuedFetches = [];
}
}, _getItemsArray: function(_372) {
if (_372 && _372.deep) {
return this._arrayOfAllItems;
}
return this._arrayOfTopLevelItems;
}, close: function(_373) {
if (this.clearOnClose && this._loadFinished && !this._loadInProgress) {
if (((this._jsonFileUrl == "" || this._jsonFileUrl == null) && (this.url == "" || this.url == null)) && this.data == null) {
}
this._arrayOfAllItems = [];
        this._arrayOfTopLevelItems = [];
        this._loadFinished = false;
        this._itemsByIdentity = null;
        this._loadInProgress = false;
        this._queuedFetches = [];
}
}, _getItemsFromLoadedData: function(_374) {
var _375 = false, self = this;
        function _376(_377) {
        return (_377 !== null) && (typeof _377 === "object") && (!lang.isArray(_377) || _375) && (!lang.isFunction(_377)) && (_377.constructor == Object || lang.isArray(_377)) && (typeof _377._reference === "undefined") && (typeof _377._type === "undefined") && (typeof _377._value === "undefined") && self.hierarchical;
        }
;
        function _378(_379) {
        self._arrayOfAllItems.push(_379);
                for (var _37a in _379) {
        var _37b = _379[_37a];
                if (_37b) {
        if (lang.isArray(_37b)) {
        var _37c = _37b;
                for (var k = 0; k < _37c.length; ++k) {
        var _37d = _37c[k];
                if (_376(_37d)) {
        _378(_37d);
        }
        }
        } else {
        if (_376(_37b)) {
        _378(_37b);
        }
        }
        }
        }
        }
;
        this._labelAttr = _374.label;
        var i, item;
        this._arrayOfAllItems = [];
        this._arrayOfTopLevelItems = _374.items;
        for (i = 0; i < this._arrayOfTopLevelItems.length; ++i) {
item = this._arrayOfTopLevelItems[i];
        if (lang.isArray(item)) {
_375 = true;
}
_378(item);
        item[this._rootItemPropName] = true;
}
var _37e = {}, key;
        for (i = 0; i < this._arrayOfAllItems.length; ++i) {
item = this._arrayOfAllItems[i];
        for (key in item) {
if (key !== this._rootItemPropName) {
var _37f = item[key];
        if (_37f !== null) {
if (!lang.isArray(_37f)) {
item[key] = [_37f];
}
} else {
item[key] = [null];
}
}
_37e[key] = key;
}
}
while (_37e[this._storeRefPropName]) {
this._storeRefPropName += "_";
}
while (_37e[this._itemNumPropName]) {
this._itemNumPropName += "_";
}
while (_37e[this._reverseRefMap]) {
this._reverseRefMap += "_";
}
var _380;
        var _381 = _374.identifier;
        if (_381) {
this._itemsByIdentity = {};
        this._features["dojo.data.api.Identity"] = _381;
        for (i = 0; i < this._arrayOfAllItems.length; ++i) {
item = this._arrayOfAllItems[i];
        _380 = item[_381];
        var _382 = _380[0];
        if (!Object.hasOwnProperty.call(this._itemsByIdentity, _382)) {
this._itemsByIdentity[_382] = item;
} else {
if (this._jsonFileUrl) {
throw new Error(this.declaredClass + ":  The json data as specified by: [" + this._jsonFileUrl + "] is malformed.  Items within the list have identifier: [" + _381 + "].  Value collided: [" + _382 + "]");
} else {
if (this._jsonData) {
throw new Error(this.declaredClass + ":  The json data provided by the creation arguments is malformed.  Items within the list have identifier: [" + _381 + "].  Value collided: [" + _382 + "]");
}
}
}
}
} else {
this._features["dojo.data.api.Identity"] = Number;
}
for (i = 0; i < this._arrayOfAllItems.length; ++i) {
item = this._arrayOfAllItems[i];
        item[this._storeRefPropName] = this;
        item[this._itemNumPropName] = i;
}
for (i = 0; i < this._arrayOfAllItems.length; ++i) {
item = this._arrayOfAllItems[i];
        for (key in item) {
_380 = item[key];
        for (var j = 0; j < _380.length; ++j) {
_37f = _380[j];
        if (_37f !== null && typeof _37f == "object") {
if (("_type" in _37f) && ("_value" in _37f)) {
var type = _37f._type;
        var _383 = this._datatypeMap[type];
        if (!_383) {
throw new Error("dojo.data.ItemFileReadStore: in the typeMap constructor arg, no object class was specified for the datatype '" + type + "'");
} else {
if (lang.isFunction(_383)) {
_380[j] = new _383(_37f._value);
} else {
if (lang.isFunction(_383.deserialize)) {
_380[j] = _383.deserialize(_37f._value);
} else {
throw new Error("dojo.data.ItemFileReadStore: Value provided in typeMap was neither a constructor, nor a an object with a deserialize function");
}
}
}
}
if (_37f._reference) {
var _384 = _37f._reference;
        if (!lang.isObject(_384)) {
_380[j] = this._getItemByIdentity(_384);
} else {
for (var k = 0; k < this._arrayOfAllItems.length; ++k) {
var _385 = this._arrayOfAllItems[k], _386 = true;
        for (var _387 in _384) {
if (_385[_387] != _384[_387]) {
_386 = false;
}
}
if (_386) {
_380[j] = _385;
}
}
}
if (this.referenceIntegrity) {
var _388 = _380[j];
        if (this.isItem(_388)) {
this._addReferenceToMap(_388, item, key);
}
}
} else {
if (this.isItem(_37f)) {
if (this.referenceIntegrity) {
this._addReferenceToMap(_37f, item, key);
}
}
}
}
}
}
}
}, _addReferenceToMap: function(_389, _38a, _38b) {
}, getIdentity: function(item) {
var _38c = this._features["dojo.data.api.Identity"];
        if (_38c === Number) {
return item[this._itemNumPropName];
} else {
var _38d = item[_38c];
        if (_38d) {
return _38d[0];
}
}
return null;
}, fetchItemByIdentity: function(_38e) {
var item, _38f;
        if (!this._loadFinished) {
var self = this;
        if (this._jsonFileUrl !== this._ccUrl) {
_343.deprecated(this.declaredClass + ": ", "To change the url, set the url property of the store," + " not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
        this._ccUrl = this._jsonFileUrl;
        this.url = this._jsonFileUrl;
} else {
if (this.url !== this._ccUrl) {
this._jsonFileUrl = this.url;
        this._ccUrl = this.url;
}
}
if (this.data != null && this._jsonData == null) {
this._jsonData = this.data;
        this.data = null;
}
if (this._jsonFileUrl) {
if (this._loadInProgress) {
this._queuedFetches.push({args: _38e});
} else {
this._loadInProgress = true;
        var _390 = {url: self._jsonFileUrl, handleAs: "json-comment-optional", preventCache: this.urlPreventCache, failOk: this.failOk};
        var _391 = xhr.get(_390);
        _391.addCallback(function(data) {
        var _392 = _38e.scope ? _38e.scope : _343.global;
                try {
                self._getItemsFromLoadedData(data);
                        self._loadFinished = true;
                        self._loadInProgress = false;
                        item = self._getItemByIdentity(_38e.identity);
                        if (_38e.onItem) {
                _38e.onItem.call(_392, item);
                }
                self._handleQueuedFetches();
                } catch (error) {
        self._loadInProgress = false;
                if (_38e.onError) {
        _38e.onError.call(_392, error);
        }
        }
        });
        _391.addErrback(function(_393) {
        self._loadInProgress = false;
                if (_38e.onError) {
        var _394 = _38e.scope ? _38e.scope : _343.global;
                _38e.onError.call(_394, _393);
        }
        });
}
} else {
if (this._jsonData) {
self._getItemsFromLoadedData(self._jsonData);
        self._jsonData = null;
        self._loadFinished = true;
        item = self._getItemByIdentity(_38e.identity);
        if (_38e.onItem) {
_38f = _38e.scope ? _38e.scope : _343.global;
        _38e.onItem.call(_38f, item);
}
}
}
} else {
item = this._getItemByIdentity(_38e.identity);
        if (_38e.onItem) {
_38f = _38e.scope ? _38e.scope : _343.global;
        _38e.onItem.call(_38f, item);
}
}
}, _getItemByIdentity: function(_395) {
var item = null;
        if (this._itemsByIdentity) {
if (Object.hasOwnProperty.call(this._itemsByIdentity, _395)) {
item = this._itemsByIdentity[_395];
}
} else {
if (Object.hasOwnProperty.call(this._arrayOfAllItems, _395)) {
item = this._arrayOfAllItems[_395];
}
}
if (item === undefined) {
item = null;
}
return item;
}, getIdentityAttributes: function(item) {
var _396 = this._features["dojo.data.api.Identity"];
        if (_396 === Number) {
return null;
} else {
return [_396];
}
}, _forceLoad: function() {
var self = this;
        if (this._jsonFileUrl !== this._ccUrl) {
_343.deprecated(this.declaredClass + ": ", "To change the url, set the url property of the store," + " not _jsonFileUrl.  _jsonFileUrl support will be removed in 2.0");
        this._ccUrl = this._jsonFileUrl;
        this.url = this._jsonFileUrl;
} else {
if (this.url !== this._ccUrl) {
this._jsonFileUrl = this.url;
        this._ccUrl = this.url;
}
}
if (this.data != null) {
this._jsonData = this.data;
        this.data = null;
}
if (this._jsonFileUrl) {
var _397 = {url: this._jsonFileUrl, handleAs: "json-comment-optional", preventCache: this.urlPreventCache, failOk: this.failOk, sync: true};
        var _398 = xhr.get(_397);
        _398.addCallback(function(data) {
        try {
        if (self._loadInProgress !== true && !self._loadFinished) {
        self._getItemsFromLoadedData(data);
                self._loadFinished = true;
        } else {
        if (self._loadInProgress) {
        throw new Error(this.declaredClass + ":  Unable to perform a synchronous load, an async load is in progress.");
        }
        }
        } catch (e) {
        throw e;
        }
        });
        _398.addErrback(function(_399) {
        throw _399;
        });
} else {
if (this._jsonData) {
self._getItemsFromLoadedData(self._jsonData);
        self._jsonData = null;
        self._loadFinished = true;
}
}
}});
        lang.extend(_34a, _348);
        return _34a;
});
}, "dojo/data/util/filter": function() {
define(["../../_base/lang"], function(lang) {
var _39a = {};
        lang.setObject("dojo.data.util.filter", _39a);
        _39a.patternToRegExp = function(_39b, _39c) {
        var rxp = "^";
                var c = null;
                for (var i = 0; i < _39b.length; i++) {
        c = _39b.charAt(i);
                switch (c) {
        case "\\":
                rxp += c;
                i++;
                rxp += _39b.charAt(i);
                break;
                case "*":
                rxp += ".*";
                break;
                case "?":
                rxp += ".";
                break;
                case "$":
                case "^":
                case "/":
                case "+":
                case ".":
                case "|":
                case "(":
                case ")":
                case "{":
                case "}":
                case "[":
                case "]":
                rxp += "\\";
                default:
                rxp += c;
        }
        }
        rxp += "$";
                if (_39c) {
        return new RegExp(rxp, "mi");
        } else {
        return new RegExp(rxp, "m");
        }
        };
        return _39a;
});
}, "dojo/data/util/simpleFetch": function() {
define(["../../_base/lang", "../../_base/kernel", "./sorter"], function(lang, _39d, _39e) {
var _39f = {};
        lang.setObject("dojo.data.util.simpleFetch", _39f);
        _39f.errorHandler = function(_3a0, _3a1) {
        if (_3a1.onError) {
        var _3a2 = _3a1.scope || _39d.global;
                _3a1.onError.call(_3a2, _3a0, _3a1);
        }
        };
        _39f.fetchHandler = function(_3a3, _3a4) {
        var _3a5 = _3a4.abort || null, _3a6 = false, _3a7 = _3a4.start ? _3a4.start : 0, _3a8 = (_3a4.count && (_3a4.count !== Infinity)) ? (_3a7 + _3a4.count) : _3a3.length;
                _3a4.abort = function() {
                _3a6 = true;
                        if (_3a5) {
                _3a5.call(_3a4);
                }
                };
                var _3a9 = _3a4.scope || _39d.global;
                if (!_3a4.store) {
        _3a4.store = this;
        }
        if (_3a4.onBegin) {
        _3a4.onBegin.call(_3a9, _3a3.length, _3a4);
        }
        if (_3a4.sort) {
        _3a3.sort(_39e.createSortFunction(_3a4.sort, this));
        }
        if (_3a4.onItem) {
        for (var i = _3a7; (i < _3a3.length) && (i < _3a8); ++i) {
        var item = _3a3[i];
                if (!_3a6) {
        _3a4.onItem.call(_3a9, item, _3a4);
        }
        }
        }
        if (_3a4.onComplete && !_3a6) {
        var _3aa = null;
                if (!_3a4.onItem) {
        _3aa = _3a3.slice(_3a7, _3a8);
        }
        _3a4.onComplete.call(_3a9, _3aa, _3a4);
        }
        };
        _39f.fetch = function(_3ab) {
        _3ab = _3ab || {};
                if (!_3ab.store) {
        _3ab.store = this;
        }
        this._fetchItems(_3ab, lang.hitch(this, "fetchHandler"), lang.hitch(this, "errorHandler"));
                return _3ab;
        };
        return _39f;
});
}, "dojo/data/util/sorter": function() {
define(["../../_base/lang"], function(lang) {
var _3ac = {};
        lang.setObject("dojo.data.util.sorter", _3ac);
        _3ac.basicComparator = function(a, b) {
        var r = - 1;
                if (a === null) {
        a = undefined;
        }
        if (b === null) {
        b = undefined;
        }
        if (a == b) {
        r = 0;
        } else {
        if (a > b || a == null) {
        r = 1;
        }
        }
        return r;
        };
        _3ac.createSortFunction = function(_3ad, _3ae) {
        var _3af = [];
                function _3b0(attr, dir, comp, s) {
                return function(_3b1, _3b2) {
                var a = s.getValue(_3b1, attr);
                        var b = s.getValue(_3b2, attr);
                        return dir * comp(a, b);
                };
                }
        ;
                var _3b3;
                var map = _3ae.comparatorMap;
                var bc = _3ac.basicComparator;
                for (var i = 0; i < _3ad.length; i++) {
        _3b3 = _3ad[i];
                var attr = _3b3.attribute;
                if (attr) {
        var dir = (_3b3.descending) ? - 1 : 1;
                var comp = bc;
                if (map) {
        if (typeof attr !== "string" && ("toString" in attr)) {
        attr = attr.toString();
        }
        comp = map[attr] || bc;
        }
        _3af.push(_3b0(attr, dir, comp, _3ae));
        }
        }
        return function(rowA, rowB) {
        var i = 0;
                while (i < _3af.length) {
        var ret = _3af[i++](rowA, rowB);
                if (ret !== 0) {
        return ret;
        }
        }
        return 0;
        };
        };
        return _3ac;
});
}, "dijit/tree/ForestStoreModel": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/_base/kernel", "dojo/_base/lang", "./TreeStoreModel"], function(_3b4, _3b5, _3b6, lang, _3b7) {
return _3b5("dijit.tree.ForestStoreModel", _3b7, {rootId: "$root$", rootLabel: "ROOT", query: null, constructor: function(_3b8) {
this.root = {store: this, root: true, id: _3b8.rootId, label: _3b8.rootLabel, children: _3b8.rootChildren};
}, mayHaveChildren: function(item) {
return item === this.root || this.inherited(arguments);
}, getChildren: function(_3b9, _3ba, _3bb) {
if (_3b9 === this.root) {
if (this.root.children) {
_3ba(this.root.children);
} else {
this.store.fetch({query: this.query, onComplete: lang.hitch(this, function(_3bc) {
this.root.children = _3bc;
        _3ba(_3bc);
}), onError: _3bb});
}
} else {
this.inherited(arguments);
}
}, isItem: function(_3bd) {
return (_3bd === this.root) ? true : this.inherited(arguments);
}, fetchItemByIdentity: function(_3be) {
if (_3be.identity == this.root.id) {
var _3bf = _3be.scope || _3b6.global;
        if (_3be.onItem) {
_3be.onItem.call(_3bf, this.root);
}
} else {
this.inherited(arguments);
}
}, getIdentity: function(item) {
return (item === this.root) ? this.root.id : this.inherited(arguments);
}, getLabel: function(item) {
return (item === this.root) ? this.root.label : this.inherited(arguments);
}, newItem: function(args, _3c0, _3c1) {
if (_3c0 === this.root) {
this.onNewRootItem(args);
        return this.store.newItem(args);
} else {
return this.inherited(arguments);
}
}, onNewRootItem: function() {
}, pasteItem: function(_3c2, _3c3, _3c4, _3c5, _3c6) {
if (_3c3 === this.root) {
if (!_3c5) {
this.onLeaveRoot(_3c2);
}
}
this.inherited(arguments, [_3c2, _3c3 === this.root ? null : _3c3, _3c4 === this.root ? null : _3c4, _3c5, _3c6]);
        if (_3c4 === this.root) {
this.onAddToRoot(_3c2);
}
}, onAddToRoot: function(item) {
}, onLeaveRoot: function(item) {
}, _requeryTop: function() {
var _3c7 = this.root.children || [];
        this.store.fetch({query: this.query, onComplete: lang.hitch(this, function(_3c8) {
        this.root.children = _3c8;
                if (_3c7.length != _3c8.length || _3b4.some(_3c7, function(item, idx) {
                return _3c8[idx] != item;
                })) {
        this.onChildrenChange(this.root, _3c8);
        }
        })});
}, onNewItem: function(item, _3c9) {
this._requeryTop();
        this.inherited(arguments);
}, onDeleteItem: function(item) {
if (_3b4.indexOf(this.root.children, item) != - 1) {
this._requeryTop();
}
this.inherited(arguments);
}, onSetItem: function(item, _3ca, _3cb, _3cc) {
this._requeryTop();
        this.inherited(arguments);
}});
});
}, "dijit/tree/TreeStoreModel": function() {
define(["dojo/_base/array", "dojo/aspect", "dojo/_base/declare", "dojo/_base/lang"], function(_3cd, _3ce, _3cf, lang) {
return _3cf("dijit.tree.TreeStoreModel", null, {store: null, childrenAttrs: ["children"], newItemIdAttr: "id", labelAttr: "", root: null, query: null, deferItemLoadingUntilExpand: false, constructor: function(args) {
lang.mixin(this, args);
        this.connects = [];
        var _3d0 = this.store;
        if (!_3d0.getFeatures()["dojo.data.api.Identity"]) {
throw new Error("dijit.tree.TreeStoreModel: store must support dojo.data.Identity");
}
if (_3d0.getFeatures()["dojo.data.api.Notification"]) {
this.connects = this.connects.concat([_3ce.after(_3d0, "onNew", lang.hitch(this, "onNewItem"), true), _3ce.after(_3d0, "onDelete", lang.hitch(this, "onDeleteItem"), true), _3ce.after(_3d0, "onSet", lang.hitch(this, "onSetItem"), true)]);
}
}, destroy: function() {
var h;
        while (h = this.connects.pop()) {
h.remove();
}
}, getRoot: function(_3d1, _3d2) {
if (this.root) {
_3d1(this.root);
} else {
this.store.fetch({query: this.query, onComplete: lang.hitch(this, function(_3d3) {
if (_3d3.length != 1) {
throw new Error("dijit.tree.TreeStoreModel: root query returned " + _3d3.length + " items, but must return exactly one");
}
this.root = _3d3[0];
        _3d1(this.root);
}), onError: _3d2});
}
}, mayHaveChildren: function(item) {
return _3cd.some(this.childrenAttrs, function(attr) {
return this.store.hasAttribute(item, attr);
}, this);
}, getChildren: function(_3d4, _3d5, _3d6) {
var _3d7 = this.store;
        if (!_3d7.isItemLoaded(_3d4)) {
var _3d8 = lang.hitch(this, arguments.callee);
        _3d7.loadItem({item: _3d4, onItem: function(_3d9) {
        _3d8(_3d9, _3d5, _3d6);
        }, onError: _3d6});
        return;
}
var _3da = [];
        for (var i = 0; i < this.childrenAttrs.length; i++) {
var vals = _3d7.getValues(_3d4, this.childrenAttrs[i]);
        _3da = _3da.concat(vals);
}
var _3db = 0;
        if (!this.deferItemLoadingUntilExpand) {
_3cd.forEach(_3da, function(item) {
if (!_3d7.isItemLoaded(item)) {
_3db++;
}
});
}
if (_3db == 0) {
_3d5(_3da);
} else {
_3cd.forEach(_3da, function(item, idx) {
if (!_3d7.isItemLoaded(item)) {
_3d7.loadItem({item: item, onItem: function(item) {
_3da[idx] = item;
        if (--_3db == 0) {
_3d5(_3da);
}
}, onError: _3d6});
}
});
}
}, isItem: function(_3dc) {
return this.store.isItem(_3dc);
}, fetchItemByIdentity: function(_3dd) {
this.store.fetchItemByIdentity(_3dd);
}, getIdentity: function(item) {
return this.store.getIdentity(item);
}, getLabel: function(item) {
if (this.labelAttr) {
return this.store.getValue(item, this.labelAttr);
} else {
return this.store.getLabel(item);
}
}, newItem: function(args, _3de, _3df) {
var _3e0 = {parent: _3de, attribute: this.childrenAttrs[0]}, _3e1;
        if (this.newItemIdAttr && args[this.newItemIdAttr]) {
this.fetchItemByIdentity({identity: args[this.newItemIdAttr], scope: this, onItem: function(item) {
if (item) {
this.pasteItem(item, null, _3de, true, _3df);
} else {
_3e1 = this.store.newItem(args, _3e0);
        if (_3e1 && (_3df != undefined)) {
this.pasteItem(_3e1, _3de, _3de, false, _3df);
}
}
}});
} else {
_3e1 = this.store.newItem(args, _3e0);
        if (_3e1 && (_3df != undefined)) {
this.pasteItem(_3e1, _3de, _3de, false, _3df);
}
}
}, pasteItem: function(_3e2, _3e3, _3e4, _3e5, _3e6) {
var _3e7 = this.store, _3e8 = this.childrenAttrs[0];
        if (_3e3) {
_3cd.forEach(this.childrenAttrs, function(attr) {
if (_3e7.containsValue(_3e3, attr, _3e2)) {
if (!_3e5) {
var _3e9 = _3cd.filter(_3e7.getValues(_3e3, attr), function(x) {
return x != _3e2;
});
        _3e7.setValues(_3e3, attr, _3e9);
}
_3e8 = attr;
}
});
}
if (_3e4) {
if (typeof _3e6 == "number") {
var _3ea = _3e7.getValues(_3e4, _3e8).slice();
        _3ea.splice(_3e6, 0, _3e2);
        _3e7.setValues(_3e4, _3e8, _3ea);
} else {
_3e7.setValues(_3e4, _3e8, _3e7.getValues(_3e4, _3e8).concat(_3e2));
}
}
}, onChange: function() {
}, onChildrenChange: function() {
}, onDelete: function() {
}, onNewItem: function(item, _3eb) {
if (!_3eb) {
return;
}
this.getChildren(_3eb.item, lang.hitch(this, function(_3ec) {
this.onChildrenChange(_3eb.item, _3ec);
}));
}, onDeleteItem: function(item) {
this.onDelete(item);
}, onSetItem: function(item, _3ed) {
if (_3cd.indexOf(this.childrenAttrs, _3ed) != - 1) {
this.getChildren(item, lang.hitch(this, function(_3ee) {
this.onChildrenChange(item, _3ee);
}));
} else {
this.onChange(item);
}
}});
});
}, "dojo/number": function() {
define(["./_base/lang", "./i18n", "./i18n!./cldr/nls/number", "./string", "./regexp"], function(lang, i18n, _3ef, _3f0, _3f1) {
var _3f2 = {};
        lang.setObject("dojo.number", _3f2);
        _3f2.format = function(_3f3, _3f4) {
        _3f4 = lang.mixin({}, _3f4 || {});
                var _3f5 = i18n.normalizeLocale(_3f4.locale), _3f6 = i18n.getLocalization("dojo.cldr", "number", _3f5);
                _3f4.customs = _3f6;
                var _3f7 = _3f4.pattern || _3f6[(_3f4.type || "decimal") + "Format"];
                if (isNaN(_3f3) || Math.abs(_3f3) == Infinity) {
        return null;
        }
        return _3f2._applyPattern(_3f3, _3f7, _3f4);
        };
        _3f2._numberPatternRE = /[#0,]*[#0](?:\.0*#*)?/;
        _3f2._applyPattern = function(_3f8, _3f9, _3fa) {
        _3fa = _3fa || {};
                var _3fb = _3fa.customs.group, _3fc = _3fa.customs.decimal, _3fd = _3f9.split(";"), _3fe = _3fd[0];
                _3f9 = _3fd[(_3f8 < 0) ? 1 : 0] || ("-" + _3fe);
                if (_3f9.indexOf("%") != - 1) {
        _3f8 *= 100;
        } else {
        if (_3f9.indexOf("‰") != - 1) {
        _3f8 *= 1000;
        } else {
        if (_3f9.indexOf("¤") != - 1) {
        _3fb = _3fa.customs.currencyGroup || _3fb;
                _3fc = _3fa.customs.currencyDecimal || _3fc;
                _3f9 = _3f9.replace(/\u00a4{1,3}/, function(_3ff) {
                var prop = ["symbol", "currency", "displayName"][_3ff.length - 1];
                        return _3fa[prop] || _3fa.currency || "";
                });
        } else {
        if (_3f9.indexOf("E") != - 1) {
        throw new Error("exponential notation not supported");
        }
        }
        }
        }
        var _400 = _3f2._numberPatternRE;
                var _401 = _3fe.match(_400);
                if (!_401) {
        throw new Error("unable to find a number expression in pattern: " + _3f9);
        }
        if (_3fa.fractional === false) {
        _3fa.places = 0;
        }
        return _3f9.replace(_400, _3f2._formatAbsolute(_3f8, _401[0], {decimal: _3fc, group: _3fb, places: _3fa.places, round: _3fa.round}));
        };
        _3f2.round = function(_402, _403, _404) {
        var _405 = 10 / (_404 || 10);
                return (_405 * + _402).toFixed(_403) / _405;
        };
        if ((0.9).toFixed() == 0) {
var _406 = _3f2.round;
        _3f2.round = function(v, p, m) {
        var d = Math.pow(10, - p || 0), a = Math.abs(v);
                if (!v || a >= d) {
        d = 0;
        } else {
        a /= d;
                if (a < 0.5 || a >= 0.95) {
        d = 0;
        }
        }
        return _406(v, p, m) + (v > 0 ? d : - d);
        };
}
_3f2._formatAbsolute = function(_407, _408, _409) {
_409 = _409 || {};
        if (_409.places === true) {
_409.places = 0;
}
if (_409.places === Infinity) {
_409.places = 6;
}
var _40a = _408.split("."), _40b = typeof _409.places == "string" && _409.places.indexOf(","), _40c = _409.places;
        if (_40b) {
_40c = _409.places.substring(_40b + 1);
} else {
if (!(_40c >= 0)) {
_40c = (_40a[1] || []).length;
}
}
if (!(_409.round < 0)) {
_407 = _3f2.round(_407, _40c, _409.round);
}
var _40d = String(Math.abs(_407)).split("."), _40e = _40d[1] || "";
        if (_40a[1] || _409.places) {
if (_40b) {
_409.places = _409.places.substring(0, _40b);
}
var pad = _409.places !== undefined ? _409.places : (_40a[1] && _40a[1].lastIndexOf("0") + 1);
        if (pad > _40e.length) {
_40d[1] = _3f0.pad(_40e, pad, "0", true);
}
if (_40c < _40e.length) {
_40d[1] = _40e.substr(0, _40c);
}
} else {
if (_40d[1]) {
_40d.pop();
}
}
var _40f = _40a[0].replace(",", "");
        pad = _40f.indexOf("0");
        if (pad != - 1) {
pad = _40f.length - pad;
        if (pad > _40d[0].length) {
_40d[0] = _3f0.pad(_40d[0], pad);
}
if (_40f.indexOf("#") == - 1) {
_40d[0] = _40d[0].substr(_40d[0].length - pad);
}
}
var _410 = _40a[0].lastIndexOf(","), _411, _412;
        if (_410 != - 1) {
_411 = _40a[0].length - _410 - 1;
        var _413 = _40a[0].substr(0, _410);
        _410 = _413.lastIndexOf(",");
        if (_410 != - 1) {
_412 = _413.length - _410 - 1;
}
}
var _414 = [];
        for (var _415 = _40d[0]; _415; ) {
var off = _415.length - _411;
        _414.push((off > 0) ? _415.substr(off) : _415);
        _415 = (off > 0) ? _415.slice(0, off) : "";
        if (_412) {
_411 = _412;
        delete _412;
}
}
_40d[0] = _414.reverse().join(_409.group || ",");
        return _40d.join(_409.decimal || ".");
};
        _3f2.regexp = function(_416) {
        return _3f2._parseInfo(_416).regexp;
        };
        _3f2._parseInfo = function(_417) {
        _417 = _417 || {};
                var _418 = i18n.normalizeLocale(_417.locale), _419 = i18n.getLocalization("dojo.cldr", "number", _418), _41a = _417.pattern || _419[(_417.type || "decimal") + "Format"], _41b = _419.group, _41c = _419.decimal, _41d = 1;
                if (_41a.indexOf("%") != - 1) {
        _41d /= 100;
        } else {
        if (_41a.indexOf("‰") != - 1) {
        _41d /= 1000;
        } else {
        var _41e = _41a.indexOf("¤") != - 1;
                if (_41e) {
        _41b = _419.currencyGroup || _41b;
                _41c = _419.currencyDecimal || _41c;
        }
        }
        }
        var _41f = _41a.split(";");
                if (_41f.length == 1) {
        _41f.push("-" + _41f[0]);
        }
        var re = _3f1.buildGroupRE(_41f, function(_420) {
        _420 = "(?:" + _3f1.escapeString(_420, ".") + ")";
                return _420.replace(_3f2._numberPatternRE, function(_421) {
                var _422 = {signed: false, separator: _417.strict ? _41b : [_41b, ""], fractional: _417.fractional, decimal: _41c, exponent: false}, _423 = _421.split("."), _424 = _417.places;
                        if (_423.length == 1 && _41d != 1) {
                _423[1] = "###";
                }
                if (_423.length == 1 || _424 === 0) {
                _422.fractional = false;
                } else {
                if (_424 === undefined) {
                _424 = _417.pattern ? _423[1].lastIndexOf("0") + 1 : Infinity;
                }
                if (_424 && _417.fractional == undefined) {
                _422.fractional = true;
                }
                if (!_417.places && (_424 < _423[1].length)) {
                _424 += "," + _423[1].length;
                }
                _422.places = _424;
                }
                var _425 = _423[0].split(",");
                        if (_425.length > 1) {
                _422.groupSize = _425.pop().length;
                        if (_425.length > 1) {
                _422.groupSize2 = _425.pop().length;
                }
                }
                return "(" + _3f2._realNumberRegexp(_422) + ")";
                });
        }, true);
                if (_41e) {
        re = re.replace(/([\s\xa0]*)(\u00a4{1,3})([\s\xa0]*)/g, function(_426, _427, _428, _429) {
        var prop = ["symbol", "currency", "displayName"][_428.length - 1], _42a = _3f1.escapeString(_417[prop] || _417.currency || "");
                _427 = _427 ? "[\\s\\xa0]" : "";
                _429 = _429 ? "[\\s\\xa0]" : "";
                if (!_417.strict) {
        if (_427) {
        _427 += "*";
        }
        if (_429) {
        _429 += "*";
        }
        return "(?:" + _427 + _42a + _429 + ")?";
        }
        return _427 + _42a + _429;
        });
        }
        return {regexp: re.replace(/[\xa0 ]/g, "[\\s\\xa0]"), group: _41b, decimal: _41c, factor: _41d};
        };
        _3f2.parse = function(_42b, _42c) {
        var info = _3f2._parseInfo(_42c), _42d = (new RegExp("^" + info.regexp + "$")).exec(_42b);
                if (!_42d) {
        return NaN;
        }
        var _42e = _42d[1];
                if (!_42d[1]) {
        if (!_42d[2]) {
        return NaN;
        }
        _42e = _42d[2];
                info.factor *= - 1;
        }
        _42e = _42e.replace(new RegExp("[" + info.group + "\\s\\xa0" + "]", "g"), "").replace(info.decimal, ".");
                return _42e * info.factor;
        };
        _3f2._realNumberRegexp = function(_42f) {
        _42f = _42f || {};
                if (!("places" in _42f)) {
        _42f.places = Infinity;
        }
        if (typeof _42f.decimal != "string") {
        _42f.decimal = ".";
        }
        if (!("fractional" in _42f) || /^0/.test(_42f.places)) {
        _42f.fractional = [true, false];
        }
        if (!("exponent" in _42f)) {
        _42f.exponent = [true, false];
        }
        if (!("eSigned" in _42f)) {
        _42f.eSigned = [true, false];
        }
        var _430 = _3f2._integerRegexp(_42f), _431 = _3f1.buildGroupRE(_42f.fractional, function(q) {
        var re = "";
                if (q && (_42f.places !== 0)) {
        re = "\\" + _42f.decimal;
                if (_42f.places == Infinity) {
        re = "(?:" + re + "\\d+)?";
        } else {
        re += "\\d{" + _42f.places + "}";
        }
        }
        return re;
        }, true);
                var _432 = _3f1.buildGroupRE(_42f.exponent, function(q) {
                if (q) {
                return "([eE]" + _3f2._integerRegexp({signed: _42f.eSigned}) + ")";
                }
                return "";
                });
                var _433 = _430 + _431;
                if (_431) {
        _433 = "(?:(?:" + _433 + ")|(?:" + _431 + "))";
        }
        return _433 + _432;
        };
        _3f2._integerRegexp = function(_434) {
        _434 = _434 || {};
                if (!("signed" in _434)) {
        _434.signed = [true, false];
        }
        if (!("separator" in _434)) {
        _434.separator = "";
        } else {
        if (!("groupSize" in _434)) {
        _434.groupSize = 3;
        }
        }
        var _435 = _3f1.buildGroupRE(_434.signed, function(q) {
        return q ? "[-+]" : "";
        }, true);
                var _436 = _3f1.buildGroupRE(_434.separator, function(sep) {
                if (!sep) {
                return "(?:\\d+)";
                }
                sep = _3f1.escapeString(sep);
                        if (sep == " ") {
                sep = "\\s";
                } else {
                if (sep == " ") {
                sep = "\\s\\xa0";
                }
                }
                var grp = _434.groupSize, grp2 = _434.groupSize2;
                        if (grp2) {
                var _437 = "(?:0|[1-9]\\d{0," + (grp2 - 1) + "}(?:[" + sep + "]\\d{" + grp2 + "})*[" + sep + "]\\d{" + grp + "})";
                        return ((grp - grp2) > 0) ? "(?:" + _437 + "|(?:0|[1-9]\\d{0," + (grp - 1) + "}))" : _437;
                }
                return "(?:0|[1-9]\\d{0," + (grp - 1) + "}(?:[" + sep + "]\\d{" + grp + "})*)";
                }, true);
                return _435 + _436;
        };
        return _3f2;
});
}, "dojo/dnd/Source": function() {
define(["../_base/array", "../_base/declare", "../_base/kernel", "../_base/lang", "../dom-class", "../dom-geometry", "../mouse", "../ready", "../topic", "./common", "./Selector", "./Manager"], function(_438, _439, _43a, lang, _43b, _43c, _43d, _43e, _43f, dnd, _440, _441) {
if (!_43a.isAsync) {
_43e(0, function() {
var _442 = ["dojo/dnd/AutoSource", "dojo/dnd/Target"];
        require(_442);
});
}
var _443 = _439("dojo.dnd.Source", _440, {isSource: true, horizontal: false, copyOnly: false, selfCopy: false, selfAccept: true, skipForm: false, withHandles: false, autoSync: false, delay: 0, accept: ["text"], generateText: true, constructor: function(node, _444) {
lang.mixin(this, lang.mixin({}, _444));
        var type = this.accept;
        if (type.length) {
this.accept = {};
        for (var i = 0; i < type.length; ++i) {
this.accept[type[i]] = 1;
}
}
this.isDragging = false;
        this.mouseDown = false;
        this.targetAnchor = null;
        this.targetBox = null;
        this.before = true;
        this._lastX = 0;
        this._lastY = 0;
        this.sourceState = "";
        if (this.isSource) {
_43b.add(this.node, "dojoDndSource");
}
this.targetState = "";
        if (this.accept) {
_43b.add(this.node, "dojoDndTarget");
}
if (this.horizontal) {
_43b.add(this.node, "dojoDndHorizontal");
}
this.topics = [_43f.subscribe("/dnd/source/over", lang.hitch(this, "onDndSourceOver")), _43f.subscribe("/dnd/start", lang.hitch(this, "onDndStart")), _43f.subscribe("/dnd/drop", lang.hitch(this, "onDndDrop")), _43f.subscribe("/dnd/cancel", lang.hitch(this, "onDndCancel"))];
}, checkAcceptance: function(_445, _446) {
if (this == _445) {
return !this.copyOnly || this.selfAccept;
}
for (var i = 0; i < _446.length; ++i) {
var type = _445.getItem(_446[i].id).type;
        var flag = false;
        for (var j = 0; j < type.length; ++j) {
if (type[j] in this.accept) {
flag = true;
        break;
}
}
if (!flag) {
return false;
}
}
return true;
}, copyState: function(_447, self) {
if (_447) {
return true;
}
if (arguments.length < 2) {
self = this == _441.manager().target;
}
if (self) {
if (this.copyOnly) {
return this.selfCopy;
}
} else {
return this.copyOnly;
}
return false;
}, destroy: function() {
_443.superclass.destroy.call(this);
        _438.forEach(this.topics, function(t) {
        t.remove();
        });
        this.targetAnchor = null;
}, onMouseMove: function(e) {
if (this.isDragging && this.targetState == "Disabled") {
return;
}
_443.superclass.onMouseMove.call(this, e);
        var m = _441.manager();
        if (!this.isDragging) {
if (this.mouseDown && this.isSource && (Math.abs(e.pageX - this._lastX) > this.delay || Math.abs(e.pageY - this._lastY) > this.delay)) {
var _448 = this.getSelectedNodes();
        if (_448.length) {
m.startDrag(this, _448, this.copyState(dnd.getCopyKeyState(e), true));
}
}
}
if (this.isDragging) {
var _449 = false;
        if (this.current) {
if (!this.targetBox || this.targetAnchor != this.current) {
this.targetBox = _43c.position(this.current, true);
}
if (this.horizontal) {
_449 = (e.pageX - this.targetBox.x < this.targetBox.w / 2) == _43c.isBodyLtr(this.current.ownerDocument);
} else {
_449 = (e.pageY - this.targetBox.y) < (this.targetBox.h / 2);
}
}
if (this.current != this.targetAnchor || _449 != this.before) {
this._markTargetAnchor(_449);
        m.canDrop(!this.current || m.source != this || !(this.current.id in this.selection));
}
}
}, onMouseDown: function(e) {
if (!this.mouseDown && this._legalMouseDown(e) && (!this.skipForm || !dnd.isFormElement(e))) {
this.mouseDown = true;
        this._lastX = e.pageX;
        this._lastY = e.pageY;
        _443.superclass.onMouseDown.call(this, e);
}
}, onMouseUp: function(e) {
if (this.mouseDown) {
this.mouseDown = false;
        _443.superclass.onMouseUp.call(this, e);
}
}, onDndSourceOver: function(_44a) {
if (this !== _44a) {
this.mouseDown = false;
        if (this.targetAnchor) {
this._unmarkTargetAnchor();
}
} else {
if (this.isDragging) {
var m = _441.manager();
        m.canDrop(this.targetState != "Disabled" && (!this.current || m.source != this || !(this.current.id in this.selection)));
}
}
}, onDndStart: function(_44b, _44c, copy) {
if (this.autoSync) {
this.sync();
}
if (this.isSource) {
this._changeState("Source", this == _44b ? (copy ? "Copied" : "Moved") : "");
}
var _44d = this.accept && this.checkAcceptance(_44b, _44c);
        this._changeState("Target", _44d ? "" : "Disabled");
        if (this == _44b) {
_441.manager().overSource(this);
}
this.isDragging = true;
}, onDndDrop: function(_44e, _44f, copy, _450) {
if (this == _450) {
this.onDrop(_44e, _44f, copy);
}
this.onDndCancel();
}, onDndCancel: function() {
if (this.targetAnchor) {
this._unmarkTargetAnchor();
        this.targetAnchor = null;
}
this.before = true;
        this.isDragging = false;
        this.mouseDown = false;
        this._changeState("Source", "");
        this._changeState("Target", "");
}, onDrop: function(_451, _452, copy) {
if (this != _451) {
this.onDropExternal(_451, _452, copy);
} else {
this.onDropInternal(_452, copy);
}
}, onDropExternal: function(_453, _454, copy) {
var _455 = this._normalizedCreator;
        if (this.creator) {
this._normalizedCreator = function(node, hint) {
return _455.call(this, _453.getItem(node.id).data, hint);
};
} else {
if (copy) {
this._normalizedCreator = function(node) {
var t = _453.getItem(node.id);
        var n = node.cloneNode(true);
        n.id = dnd.getUniqueId();
        return {node: n, data: t.data, type: t.type};
};
} else {
this._normalizedCreator = function(node) {
var t = _453.getItem(node.id);
        _453.delItem(node.id);
        return {node: node, data: t.data, type: t.type};
};
}
}
this.selectNone();
        if (!copy && !this.creator) {
_453.selectNone();
}
this.insertNodes(true, _454, this.before, this.current);
        if (!copy && this.creator) {
_453.deleteSelectedNodes();
}
this._normalizedCreator = _455;
}, onDropInternal: function(_456, copy) {
var _457 = this._normalizedCreator;
        if (this.current && this.current.id in this.selection) {
return;
}
if (copy) {
if (this.creator) {
this._normalizedCreator = function(node, hint) {
return _457.call(this, this.getItem(node.id).data, hint);
};
} else {
this._normalizedCreator = function(node) {
var t = this.getItem(node.id);
        var n = node.cloneNode(true);
        n.id = dnd.getUniqueId();
        return {node: n, data: t.data, type: t.type};
};
}
} else {
if (!this.current) {
return;
}
this._normalizedCreator = function(node) {
var t = this.getItem(node.id);
        return {node: node, data: t.data, type: t.type};
};
}
this._removeSelection();
        this.insertNodes(true, _456, this.before, this.current);
        this._normalizedCreator = _457;
}, onDraggingOver: function() {
}, onDraggingOut: function() {
}, onOverEvent: function() {
_443.superclass.onOverEvent.call(this);
        _441.manager().overSource(this);
        if (this.isDragging && this.targetState != "Disabled") {
this.onDraggingOver();
}
}, onOutEvent: function() {
_443.superclass.onOutEvent.call(this);
        _441.manager().outSource(this);
        if (this.isDragging && this.targetState != "Disabled") {
this.onDraggingOut();
}
}, _markTargetAnchor: function(_458) {
if (this.current == this.targetAnchor && this.before == _458) {
return;
}
if (this.targetAnchor) {
this._removeItemClass(this.targetAnchor, this.before ? "Before" : "After");
}
this.targetAnchor = this.current;
        this.targetBox = null;
        this.before = _458;
        if (this.targetAnchor) {
this._addItemClass(this.targetAnchor, this.before ? "Before" : "After");
}
}, _unmarkTargetAnchor: function() {
if (!this.targetAnchor) {
return;
}
this._removeItemClass(this.targetAnchor, this.before ? "Before" : "After");
        this.targetAnchor = null;
        this.targetBox = null;
        this.before = true;
}, _markDndStatus: function(copy) {
this._changeState("Source", copy ? "Copied" : "Moved");
}, _legalMouseDown: function(e) {
if (e.type != "touchstart" && !_43d.isLeft(e)) {
return false;
}
if (!this.withHandles) {
return true;
}
for (var node = e.target; node && node !== this.node; node = node.parentNode) {
if (_43b.contains(node, "dojoDndHandle")) {
return true;
}
if (_43b.contains(node, "dojoDndItem") || _43b.contains(node, "dojoDndIgnore")) {
break;
}
}
return false;
}});
        return _443;
});
}, "dojo/dnd/common": function() {
define(["../sniff", "../_base/kernel", "../_base/lang", "../dom"], function(has, _459, lang, dom) {
var _45a = lang.getObject("dojo.dnd", true);
        _45a.getCopyKeyState = function(evt) {
        return evt[has("mac") ? "metaKey" : "ctrlKey"];
        };
        _45a._uniqueId = 0;
        _45a.getUniqueId = function() {
        var id;
                do {
                id = _459._scopeName + "Unique" + (++_45a._uniqueId);
                } while (dom.byId(id));
                return id;
        };
        _45a._empty = {};
        _45a.isFormElement = function(e) {
        var t = e.target;
                if (t.nodeType == 3) {
        t = t.parentNode;
        }
        return " button textarea input select option ".indexOf(" " + t.tagName.toLowerCase() + " ") >= 0;
        };
        return _45a;
});
}, "dojo/dnd/Selector": function() {
define(["../_base/array", "../_base/declare", "../_base/kernel", "../_base/lang", "../dom", "../dom-construct", "../mouse", "../_base/NodeList", "../on", "../touch", "./common", "./Container"], function(_45b, _45c, _45d, lang, dom, _45e, _45f, _460, on, _461, dnd, _462) {
var _463 = _45c("dojo.dnd.Selector", _462, {constructor: function(node, _464) {
if (!_464) {
_464 = {};
}
this.singular = _464.singular;
        this.autoSync = _464.autoSync;
        this.selection = {};
        this.anchor = null;
        this.simpleSelection = false;
        this.events.push(on(this.node, _461.press, lang.hitch(this, "onMouseDown")), on(this.node, _461.release, lang.hitch(this, "onMouseUp")));
}, singular: false, getSelectedNodes: function() {
var t = new _460();
        var e = dnd._empty;
        for (var i in this.selection) {
if (i in e) {
continue;
}
t.push(dom.byId(i));
}
return t;
}, selectNone: function() {
return this._removeSelection()._removeAnchor();
}, selectAll: function() {
this.forInItems(function(data, id) {
this._addItemClass(dom.byId(id), "Selected");
        this.selection[id] = 1;
}, this);
        return this._removeAnchor();
}, deleteSelectedNodes: function() {
var e = dnd._empty;
        for (var i in this.selection) {
if (i in e) {
continue;
}
var n = dom.byId(i);
        this.delItem(i);
        _45e.destroy(n);
}
this.anchor = null;
        this.selection = {};
        return this;
}, forInSelectedItems: function(f, o) {
o = o || _45d.global;
        var s = this.selection, e = dnd._empty;
        for (var i in s) {
if (i in e) {
continue;
}
f.call(o, this.getItem(i), i, this);
}
}, sync: function() {
_463.superclass.sync.call(this);
        if (this.anchor) {
if (!this.getItem(this.anchor.id)) {
this.anchor = null;
}
}
var t = [], e = dnd._empty;
        for (var i in this.selection) {
if (i in e) {
continue;
}
if (!this.getItem(i)) {
t.push(i);
}
}
_45b.forEach(t, function(i) {
delete this.selection[i];
}, this);
        return this;
}, insertNodes: function(_465, data, _466, _467) {
var _468 = this._normalizedCreator;
        this._normalizedCreator = function(item, hint) {
        var t = _468.call(this, item, hint);
                if (_465) {
        if (!this.anchor) {
        this.anchor = t.node;
                this._removeItemClass(t.node, "Selected");
                this._addItemClass(this.anchor, "Anchor");
        } else {
        if (this.anchor != t.node) {
        this._removeItemClass(t.node, "Anchor");
                this._addItemClass(t.node, "Selected");
        }
        }
        this.selection[t.node.id] = 1;
        } else {
        this._removeItemClass(t.node, "Selected");
                this._removeItemClass(t.node, "Anchor");
        }
        return t;
        };
        _463.superclass.insertNodes.call(this, data, _466, _467);
        this._normalizedCreator = _468;
        return this;
}, destroy: function() {
_463.superclass.destroy.call(this);
        this.selection = this.anchor = null;
}, onMouseDown: function(e) {
if (this.autoSync) {
this.sync();
}
if (!this.current) {
return;
}
if (!this.singular && !dnd.getCopyKeyState(e) && !e.shiftKey && (this.current.id in this.selection)) {
this.simpleSelection = true;
        if (_45f.isLeft(e)) {
e.stopPropagation();
        e.preventDefault();
}
return;
}
if (!this.singular && e.shiftKey) {
if (!dnd.getCopyKeyState(e)) {
this._removeSelection();
}
var c = this.getAllNodes();
        if (c.length) {
if (!this.anchor) {
this.anchor = c[0];
        this._addItemClass(this.anchor, "Anchor");
}
this.selection[this.anchor.id] = 1;
        if (this.anchor != this.current) {
var i = 0, node;
        for (; i < c.length; ++i) {
node = c[i];
        if (node == this.anchor || node == this.current) {
break;
}
}
for (++i; i < c.length; ++i) {
node = c[i];
        if (node == this.anchor || node == this.current) {
break;
}
this._addItemClass(node, "Selected");
        this.selection[node.id] = 1;
}
this._addItemClass(this.current, "Selected");
        this.selection[this.current.id] = 1;
}
}
} else {
if (this.singular) {
if (this.anchor == this.current) {
if (dnd.getCopyKeyState(e)) {
this.selectNone();
}
} else {
this.selectNone();
        this.anchor = this.current;
        this._addItemClass(this.anchor, "Anchor");
        this.selection[this.current.id] = 1;
}
} else {
if (dnd.getCopyKeyState(e)) {
if (this.anchor == this.current) {
delete this.selection[this.anchor.id];
        this._removeAnchor();
} else {
if (this.current.id in this.selection) {
this._removeItemClass(this.current, "Selected");
        delete this.selection[this.current.id];
} else {
if (this.anchor) {
this._removeItemClass(this.anchor, "Anchor");
        this._addItemClass(this.anchor, "Selected");
}
this.anchor = this.current;
        this._addItemClass(this.current, "Anchor");
        this.selection[this.current.id] = 1;
}
}
} else {
if (!(this.current.id in this.selection)) {
this.selectNone();
        this.anchor = this.current;
        this._addItemClass(this.current, "Anchor");
        this.selection[this.current.id] = 1;
}
}
}
}
e.stopPropagation();
        e.preventDefault();
}, onMouseUp: function() {
if (!this.simpleSelection) {
return;
}
this.simpleSelection = false;
        this.selectNone();
        if (this.current) {
this.anchor = this.current;
        this._addItemClass(this.anchor, "Anchor");
        this.selection[this.current.id] = 1;
}
}, onMouseMove: function() {
this.simpleSelection = false;
}, onOverEvent: function() {
this.onmousemoveEvent = on(this.node, _461.move, lang.hitch(this, "onMouseMove"));
}, onOutEvent: function() {
if (this.onmousemoveEvent) {
this.onmousemoveEvent.remove();
        delete this.onmousemoveEvent;
}
}, _removeSelection: function() {
var e = dnd._empty;
        for (var i in this.selection) {
if (i in e) {
continue;
}
var node = dom.byId(i);
        if (node) {
this._removeItemClass(node, "Selected");
}
}
this.selection = {};
        return this;
}, _removeAnchor: function() {
if (this.anchor) {
this._removeItemClass(this.anchor, "Anchor");
        this.anchor = null;
}
return this;
}});
        return _463;
});
}, "dojo/dnd/Container": function() {
define(["../_base/array", "../_base/declare", "../_base/kernel", "../_base/lang", "../_base/window", "../dom", "../dom-class", "../dom-construct", "../Evented", "../has", "../on", "../query", "../touch", "./common"], function(_469, _46a, _46b, lang, win, dom, _46c, _46d, _46e, has, on, _46f, _470, dnd) {
var _471 = _46a("dojo.dnd.Container", _46e, {skipForm: false, allowNested: false, constructor: function(node, _472) {
this.node = dom.byId(node);
        if (!_472) {
_472 = {};
}
this.creator = _472.creator || null;
        this.skipForm = _472.skipForm;
        this.parent = _472.dropParent && dom.byId(_472.dropParent);
        this.map = {};
        this.current = null;
        this.containerState = "";
        _46c.add(this.node, "dojoDndContainer");
        if (!(_472 && _472._skipStartup)) {
this.startup();
}
this.events = [on(this.node, _470.over, lang.hitch(this, "onMouseOver")), on(this.node, _470.out, lang.hitch(this, "onMouseOut")), on(this.node, "dragstart", lang.hitch(this, "onSelectStart")), on(this.node, "selectstart", lang.hitch(this, "onSelectStart"))];
}, creator: function() {
}, getItem: function(key) {
return this.map[key];
}, setItem: function(key, data) {
this.map[key] = data;
}, delItem: function(key) {
delete this.map[key];
}, forInItems: function(f, o) {
o = o || _46b.global;
        var m = this.map, e = dnd._empty;
        for (var i in m) {
if (i in e) {
continue;
}
f.call(o, m[i], i, this);
}
return o;
}, clearItems: function() {
this.map = {};
}, getAllNodes: function() {
return _46f((this.allowNested ? "" : "> ") + ".dojoDndItem", this.parent);
}, sync: function() {
var map = {};
        this.getAllNodes().forEach(function(node) {
if (node.id) {
var item = this.getItem(node.id);
        if (item) {
map[node.id] = item;
        return;
}
} else {
node.id = dnd.getUniqueId();
}
var type = node.getAttribute("dndType"), data = node.getAttribute("dndData");
        map[node.id] = {data: data || node.innerHTML, type: type ? type.split(/\s*,\s*/) : ["text"]};
}, this);
        this.map = map;
        return this;
}, insertNodes: function(data, _473, _474) {
if (!this.parent.firstChild) {
_474 = null;
} else {
if (_473) {
if (!_474) {
_474 = this.parent.firstChild;
}
} else {
if (_474) {
_474 = _474.nextSibling;
}
}
}
var i, t;
        if (_474) {
for (i = 0; i < data.length; ++i) {
t = this._normalizedCreator(data[i]);
        this.setItem(t.node.id, {data: t.data, type: t.type});
        _474.parentNode.insertBefore(t.node, _474);
}
} else {
for (i = 0; i < data.length; ++i) {
t = this._normalizedCreator(data[i]);
        this.setItem(t.node.id, {data: t.data, type: t.type});
        this.parent.appendChild(t.node);
}
}
return this;
}, destroy: function() {
_469.forEach(this.events, function(_475) {
_475.remove();
});
        this.clearItems();
        this.node = this.parent = this.current = null;
}, markupFactory: function(_476, node, Ctor) {
_476._skipStartup = true;
        return new Ctor(node, _476);
}, startup: function() {
if (!this.parent) {
this.parent = this.node;
        if (this.parent.tagName.toLowerCase() == "table") {
var c = this.parent.getElementsByTagName("tbody");
        if (c && c.length) {
this.parent = c[0];
}
}
}
this.defaultCreator = dnd._defaultCreator(this.parent);
        this.sync();
}, onMouseOver: function(e) {
var n = e.relatedTarget;
        while (n) {
if (n == this.node) {
break;
}
try {
n = n.parentNode;
} catch (x) {
n = null;
}
}
if (!n) {
this._changeState("Container", "Over");
        this.onOverEvent();
}
n = this._getChildByEvent(e);
        if (this.current == n) {
return;
}
if (this.current) {
this._removeItemClass(this.current, "Over");
}
if (n) {
this._addItemClass(n, "Over");
}
this.current = n;
}, onMouseOut: function(e) {
for (var n = e.relatedTarget; n; ) {
if (n == this.node) {
return;
}
try {
n = n.parentNode;
} catch (x) {
n = null;
}
}
if (this.current) {
this._removeItemClass(this.current, "Over");
        this.current = null;
}
this._changeState("Container", "");
        this.onOutEvent();
}, onSelectStart: function(e) {
if (!this.skipForm || !dnd.isFormElement(e)) {
e.stopPropagation();
        e.preventDefault();
}
}, onOverEvent: function() {
}, onOutEvent: function() {
}, _changeState: function(type, _477) {
var _478 = "dojoDnd" + type;
        var _479 = type.toLowerCase() + "State";
        _46c.replace(this.node, _478 + _477, _478 + this[_479]);
        this[_479] = _477;
}, _addItemClass: function(node, type) {
_46c.add(node, "dojoDndItem" + type);
}, _removeItemClass: function(node, type) {
_46c.remove(node, "dojoDndItem" + type);
}, _getChildByEvent: function(e) {
var node = e.target;
        if (node) {
for (var _47a = node.parentNode; _47a; node = _47a, _47a = node.parentNode) {
if ((_47a == this.parent || this.allowNested) && _46c.contains(node, "dojoDndItem")) {
return node;
}
}
}
return null;
}, _normalizedCreator: function(item, hint) {
var t = (this.creator || this.defaultCreator).call(this, item, hint);
        if (!lang.isArray(t.type)) {
t.type = ["text"];
}
if (!t.node.id) {
t.node.id = dnd.getUniqueId();
}
_46c.add(t.node, "dojoDndItem");
        return t;
}});
        dnd._createNode = function(tag) {
        if (!tag) {
        return dnd._createSpan;
        }
        return function(text) {
        return _46d.create(tag, {innerHTML: text});
        };
        };
        dnd._createTrTd = function(text) {
        var tr = _46d.create("tr");
                _46d.create("td", {innerHTML: text}, tr);
                return tr;
        };
        dnd._createSpan = function(text) {
        return _46d.create("span", {innerHTML: text});
        };
        dnd._defaultCreatorNodes = {ul: "li", ol: "li", div: "div", p: "div"};
        dnd._defaultCreator = function(node) {
        var tag = node.tagName.toLowerCase();
                var c = tag == "tbody" || tag == "thead" ? dnd._createTrTd : dnd._createNode(dnd._defaultCreatorNodes[tag]);
                return function(item, hint) {
                var _47b = item && lang.isObject(item), data, type, n;
                        if (_47b && item.tagName && item.nodeType && item.getAttribute) {
                data = item.getAttribute("dndData") || item.innerHTML;
                        type = item.getAttribute("dndType");
                        type = type ? type.split(/\s*,\s*/) : ["text"];
                        n = item;
                } else {
                data = (_47b && item.data) ? item.data : item;
                        type = (_47b && item.type) ? item.type : ["text"];
                        n = (hint == "avatar" ? dnd._createSpan : c)(String(data));
                }
                if (!n.id) {
                n.id = dnd.getUniqueId();
                }
                return {node: n, data: data, type: type};
                };
        };
        return _471;
});
}, "dojo/dnd/Manager": function() {
define(["../_base/array", "../_base/declare", "../_base/lang", "../_base/window", "../dom-class", "../Evented", "../has", "../keys", "../on", "../topic", "../touch", "./common", "./autoscroll", "./Avatar"], function(_47c, _47d, lang, win, _47e, _47f, has, keys, on, _480, _481, dnd, _482, _483) {
var _484 = _47d("dojo.dnd.Manager", [_47f], {constructor: function() {
this.avatar = null;
        this.source = null;
        this.nodes = [];
        this.copy = true;
        this.target = null;
        this.canDropFlag = false;
        this.events = [];
}, OFFSET_X: has("touch") ? 0 : 16, OFFSET_Y: has("touch") ? - 64 : 16, overSource: function(_485) {
if (this.avatar) {
this.target = (_485 && _485.targetState != "Disabled") ? _485 : null;
        this.canDropFlag = Boolean(this.target);
        this.avatar.update();
}
_480.publish("/dnd/source/over", _485);
}, outSource: function(_486) {
if (this.avatar) {
if (this.target == _486) {
this.target = null;
        this.canDropFlag = false;
        this.avatar.update();
        _480.publish("/dnd/source/over", null);
}
} else {
_480.publish("/dnd/source/over", null);
}
}, startDrag: function(_487, _488, copy) {
_482.autoScrollStart(win.doc);
        this.source = _487;
        this.nodes = _488;
        this.copy = Boolean(copy);
        this.avatar = this.makeAvatar();
        win.body().appendChild(this.avatar.node);
        _480.publish("/dnd/start", _487, _488, this.copy);
        function _489(e) {
        e.preventDefault();
                e.stopPropagation();
        }
;
        this.events = [on(win.doc, _481.move, lang.hitch(this, "onMouseMove")), on(win.doc, _481.release, lang.hitch(this, "onMouseUp")), on(win.doc, "keydown", lang.hitch(this, "onKeyDown")), on(win.doc, "keyup", lang.hitch(this, "onKeyUp")), on(win.doc, "dragstart", _489), on(win.body(), "selectstart", _489)];
        var c = "dojoDnd" + (copy ? "Copy" : "Move");
        _47e.add(win.body(), c);
}, canDrop: function(flag) {
var _48a = Boolean(this.target && flag);
        if (this.canDropFlag != _48a) {
this.canDropFlag = _48a;
        this.avatar.update();
}
}, stopDrag: function() {
_47e.remove(win.body(), ["dojoDndCopy", "dojoDndMove"]);
        _47c.forEach(this.events, function(_48b) {
        _48b.remove();
        });
        this.events = [];
        this.avatar.destroy();
        this.avatar = null;
        this.source = this.target = null;
        this.nodes = [];
}, makeAvatar: function() {
return new _483(this);
}, updateAvatar: function() {
this.avatar.update();
}, onMouseMove: function(e) {
var a = this.avatar;
        if (a) {
_482.autoScrollNodes(e);
        var s = a.node.style;
        s.left = (e.pageX + this.OFFSET_X) + "px";
        s.top = (e.pageY + this.OFFSET_Y) + "px";
        var copy = Boolean(this.source.copyState(dnd.getCopyKeyState(e)));
        if (this.copy != copy) {
this._setCopyStatus(copy);
}
}
if (has("touch")) {
e.preventDefault();
}
}, onMouseUp: function(e) {
if (this.avatar) {
if (this.target && this.canDropFlag) {
var copy = Boolean(this.source.copyState(dnd.getCopyKeyState(e)));
        _480.publish("/dnd/drop/before", this.source, this.nodes, copy, this.target, e);
        _480.publish("/dnd/drop", this.source, this.nodes, copy, this.target, e);
} else {
_480.publish("/dnd/cancel");
}
this.stopDrag();
}
}, onKeyDown: function(e) {
if (this.avatar) {
switch (e.keyCode) {
case keys.CTRL:
        var copy = Boolean(this.source.copyState(true));
        if (this.copy != copy) {
this._setCopyStatus(copy);
}
break;
        case keys.ESCAPE:
        _480.publish("/dnd/cancel");
        this.stopDrag();
        break;
}
}
}, onKeyUp: function(e) {
if (this.avatar && e.keyCode == keys.CTRL) {
var copy = Boolean(this.source.copyState(false));
        if (this.copy != copy) {
this._setCopyStatus(copy);
}
}
}, _setCopyStatus: function(copy) {
this.copy = copy;
        this.source._markDndStatus(this.copy);
        this.updateAvatar();
        _47e.replace(win.body(), "dojoDnd" + (this.copy ? "Copy" : "Move"), "dojoDnd" + (this.copy ? "Move" : "Copy"));
}});
        dnd._manager = null;
        _484.manager = dnd.manager = function() {
        if (!dnd._manager) {
        dnd._manager = new _484();
        }
        return dnd._manager;
        };
        return _484;
});
}, "dojo/dnd/autoscroll": function() {
define(["../_base/lang", "../sniff", "../_base/window", "../dom-geometry", "../dom-style", "../window"], function(lang, has, win, _48c, _48d, _48e) {
var _48f = {};
        lang.setObject("dojo.dnd.autoscroll", _48f);
        _48f.getViewport = _48e.getBox;
        _48f.V_TRIGGER_AUTOSCROLL = 32;
        _48f.H_TRIGGER_AUTOSCROLL = 32;
        _48f.V_AUTOSCROLL_VALUE = 16;
        _48f.H_AUTOSCROLL_VALUE = 16;
        var _490, doc = win.doc, _491 = Infinity, _492 = Infinity;
        _48f.autoScrollStart = function(d) {
        doc = d;
                _490 = _48e.getBox(doc);
                var html = win.body(doc).parentNode;
                _491 = Math.max(html.scrollHeight - _490.h, 0);
                _492 = Math.max(html.scrollWidth - _490.w, 0);
        };
        _48f.autoScroll = function(e) {
        var v = _490 || _48e.getBox(doc), html = win.body(doc).parentNode, dx = 0, dy = 0;
                if (e.clientX < _48f.H_TRIGGER_AUTOSCROLL) {
        dx = - _48f.H_AUTOSCROLL_VALUE;
        } else {
        if (e.clientX > v.w - _48f.H_TRIGGER_AUTOSCROLL) {
        dx = Math.min(_48f.H_AUTOSCROLL_VALUE, _492 - html.scrollLeft);
        }
        }
        if (e.clientY < _48f.V_TRIGGER_AUTOSCROLL) {
        dy = - _48f.V_AUTOSCROLL_VALUE;
        } else {
        if (e.clientY > v.h - _48f.V_TRIGGER_AUTOSCROLL) {
        dy = Math.min(_48f.V_AUTOSCROLL_VALUE, _491 - html.scrollTop);
        }
        }
        window.scrollBy(dx, dy);
        };
        _48f._validNodes = {"div": 1, "p": 1, "td": 1};
        _48f._validOverflow = {"auto": 1, "scroll": 1};
        _48f.autoScrollNodes = function(e) {
        var b, t, w, h, rx, ry, dx = 0, dy = 0, _493, _494;
                for (var n = e.target; n; ) {
        if (n.nodeType == 1 && (n.tagName.toLowerCase() in _48f._validNodes)) {
        var s = _48d.getComputedStyle(n), _495 = (s.overflow.toLowerCase() in _48f._validOverflow), _496 = (s.overflowX.toLowerCase() in _48f._validOverflow), _497 = (s.overflowY.toLowerCase() in _48f._validOverflow);
                if (_495 || _496 || _497) {
        b = _48c.getContentBox(n, s);
                t = _48c.position(n, true);
        }
        if (_495 || _496) {
        w = Math.min(_48f.H_TRIGGER_AUTOSCROLL, b.w / 2);
                rx = e.pageX - t.x;
                if (has("webkit") || has("opera")) {
        rx += win.body().scrollLeft;
        }
        dx = 0;
                if (rx > 0 && rx < b.w) {
        if (rx < w) {
        dx = - w;
        } else {
        if (rx > b.w - w) {
        dx = w;
        }
        }
        _493 = n.scrollLeft;
                n.scrollLeft = n.scrollLeft + dx;
        }
        }
        if (_495 || _497) {
        h = Math.min(_48f.V_TRIGGER_AUTOSCROLL, b.h / 2);
                ry = e.pageY - t.y;
                if (has("webkit") || has("opera")) {
        ry += win.body().scrollTop;
        }
        dy = 0;
                if (ry > 0 && ry < b.h) {
        if (ry < h) {
        dy = - h;
        } else {
        if (ry > b.h - h) {
        dy = h;
        }
        }
        _494 = n.scrollTop;
                n.scrollTop = n.scrollTop + dy;
        }
        }
        if (dx || dy) {
        return;
        }
        }
        try {
        n = n.parentNode;
        } catch (x) {
        n = null;
        }
        }
        _48f.autoScroll(e);
        };
        return _48f;
});
}, "dojo/dnd/Avatar": function() {
define(["../_base/declare", "../_base/window", "../dom", "../dom-attr", "../dom-class", "../dom-construct", "../hccss", "../query"], function(_498, win, dom, _499, _49a, _49b, has, _49c) {
return _498("dojo.dnd.Avatar", null, {constructor: function(_49d) {
this.manager = _49d;
        this.construct();
}, construct: function() {
var a = _49b.create("table", {"class": "dojoDndAvatar", style: {position: "absolute", zIndex: "1999", margin: "0px"}}), _49e = this.manager.source, node, b = _49b.create("tbody", null, a), tr = _49b.create("tr", null, b), td = _49b.create("td", null, tr), k = Math.min(5, this.manager.nodes.length), i = 0;
        if (has("highcontrast")) {
_49b.create("span", {id: "a11yIcon", innerHTML: this.manager.copy ? "+" : "<"}, td);
}
_49b.create("span", {innerHTML: _49e.generateText ? this._generateText() : ""}, td);
        _499.set(tr, {"class": "dojoDndAvatarHeader", style: {opacity: 0.9}});
        for (; i < k; ++i) {
if (_49e.creator) {
node = _49e._normalizedCreator(_49e.getItem(this.manager.nodes[i].id).data, "avatar").node;
} else {
node = this.manager.nodes[i].cloneNode(true);
        if (node.tagName.toLowerCase() == "tr") {
var _49f = _49b.create("table"), _4a0 = _49b.create("tbody", null, _49f);
        _4a0.appendChild(node);
        node = _49f;
}
}
node.id = "";
        tr = _49b.create("tr", null, b);
        td = _49b.create("td", null, tr);
        td.appendChild(node);
        _499.set(tr, {"class": "dojoDndAvatarItem", style: {opacity: (9 - i) / 10}});
}
this.node = a;
}, destroy: function() {
_49b.destroy(this.node);
        this.node = false;
}, update: function() {
_49a.toggle(this.node, "dojoDndAvatarCanDrop", this.manager.canDropFlag);
        if (has("highcontrast")) {
var icon = dom.byId("a11yIcon");
        var text = "+";
        if (this.manager.canDropFlag && !this.manager.copy) {
text = "< ";
} else {
if (!this.manager.canDropFlag && !this.manager.copy) {
text = "o";
} else {
if (!this.manager.canDropFlag) {
text = "x";
}
}
}
icon.innerHTML = text;
}
_49c(("tr.dojoDndAvatarHeader td span" + (has("highcontrast") ? " span" : "")), this.node).forEach(function(node) {
node.innerHTML = this.manager.source.generateText ? this._generateText() : "";
}, this);
}, _generateText: function() {
return this.manager.nodes.length.toString();
}});
});
}, "dijit/dijit-all": function() {
define(["./main", "./dijit", "./ColorPalette", "./Declaration", "./Dialog", "./DialogUnderlay", "./TooltipDialog", "./Editor", "./_editor/plugins/FontChoice", "./_editor/plugins/LinkDialog", "./Menu", "./MenuItem", "./PopupMenuItem", "./CheckedMenuItem", "./MenuBar", "./MenuBarItem", "./PopupMenuBarItem", "./MenuSeparator", "./ProgressBar", "./TitlePane", "./Toolbar", "./Tooltip", "./Tree", "./InlineEditBox", "./form/Form", "./form/Button", "./form/DropDownButton", "./form/ComboButton", "./form/ToggleButton", "./form/CheckBox", "./form/RadioButton", "./form/TextBox", "./form/ValidationTextBox", "./form/CurrencyTextBox", "./form/DateTextBox", "./form/TimeTextBox", "./form/NumberSpinner", "./form/NumberTextBox", "./form/ComboBox", "./form/FilteringSelect", "./form/MultiSelect", "./form/Select", "./form/HorizontalSlider", "./form/VerticalSlider", "./form/HorizontalRule", "./form/VerticalRule", "./form/HorizontalRuleLabels", "./form/VerticalRuleLabels", "./form/SimpleTextarea", "./form/Textarea", "./layout/AccordionContainer", "./layout/ContentPane", "./layout/BorderContainer", "./layout/LayoutContainer", "./layout/LinkPane", "./layout/SplitContainer", "./layout/StackContainer", "./layout/TabContainer"], function(_4a1) {
console.warn("dijit-all may include much more code than your application actually requires. We strongly recommend that you investigate a custom build or the web build tool");
        return _4a1;
});
}, "dijit/ColorPalette": function() {
define(["require", "dojo/text!./templates/ColorPalette.html", "./_Widget", "./_TemplatedMixin", "./_PaletteMixin", "./hccss", "dojo/i18n", "dojo/_base/Color", "dojo/_base/declare", "dojo/dom-construct", "dojo/string", "dojo/i18n!dojo/nls/colors", "dojo/colors"], function(_4a2, _4a3, _4a4, _4a5, _4a6, has, i18n, _4a7, _4a8, _4a9, _4aa) {
var _4ab = _4a8("dijit.ColorPalette", [_4a4, _4a5, _4a6], {palette: "7x10", _palettes: {"7x10": [["white", "seashell", "cornsilk", "lemonchiffon", "lightyellow", "palegreen", "paleturquoise", "lightcyan", "lavender", "plum"], ["lightgray", "pink", "bisque", "moccasin", "khaki", "lightgreen", "lightseagreen", "lightskyblue", "cornflowerblue", "violet"], ["silver", "lightcoral", "sandybrown", "orange", "palegoldenrod", "chartreuse", "mediumturquoise", "skyblue", "mediumslateblue", "orchid"], ["gray", "red", "orangered", "darkorange", "yellow", "limegreen", "darkseagreen", "royalblue", "slateblue", "mediumorchid"], ["dimgray", "crimson", "chocolate", "coral", "gold", "forestgreen", "seagreen", "blue", "blueviolet", "darkorchid"], ["darkslategray", "firebrick", "saddlebrown", "sienna", "olive", "green", "darkcyan", "mediumblue", "darkslateblue", "darkmagenta"], ["black", "darkred", "maroon", "brown", "darkolivegreen", "darkgreen", "midnightblue", "navy", "indigo", "purple"]], "3x4": [["white", "lime", "green", "blue"], ["silver", "yellow", "fuchsia", "navy"], ["gray", "red", "purple", "black"]]}, templateString: _4a3, baseClass: "dijitColorPalette", _dyeFactory: function(_4ac, row, col, _4ad) {
return new this._dyeClass(_4ac, row, col, _4ad);
}, buildRendering: function() {
this.inherited(arguments);
        this._dyeClass = _4a8(_4ab._Color, {palette: this.palette});
        this._preparePalette(this._palettes[this.palette], i18n.getLocalization("dojo", "colors", this.lang));
}});
        _4ab._Color = _4a8("dijit._Color", _4a7, {template: "<span class='dijitInline dijitPaletteImg'>" + "<img src='${blankGif}' alt='${alt}' title='${title}' class='dijitColorPaletteSwatch' style='background-color: ${color}'/>" + "</span>", hcTemplate: "<span class='dijitInline dijitPaletteImg' style='position: relative; overflow: hidden; height: 12px; width: 14px;'>" + "<img src='${image}' alt='${alt}' title='${title}' style='position: absolute; left: ${left}px; top: ${top}px; ${size}'/>" + "</span>", _imagePaths: {"7x10": _4a2.toUrl("./themes/a11y/colors7x10.png"), "3x4": _4a2.toUrl("./themes/a11y/colors3x4.png")}, constructor: function(_4ae, row, col, _4af) {
        this._title = _4af;
                this._row = row;
                this._col = col;
                this.setColor(_4a7.named[_4ae]);
        }, getValue: function() {
        return this.toHex();
        }, fillCell: function(cell, _4b0) {
        var html = _4aa.substitute(has("highcontrast") ? this.hcTemplate : this.template, {color: this.toHex(), blankGif: _4b0, alt: this._title, title: this._title, image: this._imagePaths[this.palette].toString(), left: this._col * - 20 - 5, top: this._row * - 20 - 5, size: this.palette == "7x10" ? "height: 145px; width: 206px" : "height: 64px; width: 86px"});
                _4a9.place(html, cell);
        }});
        return _4ab;
});
}, "dijit/_PaletteMixin": function() {
define(["dojo/_base/declare", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/keys", "dojo/_base/lang", "dojo/on", "./_CssStateMixin", "./a11yclick", "./focus", "./typematic"], function(_4b1, _4b2, _4b3, _4b4, keys, lang, on, _4b5, _4b6, _4b7, _4b8) {
var _4b9 = _4b1("dijit._PaletteMixin", _4b5, {defaultTimeout: 500, timeoutChangeRate: 0.9, value: "", _selectedCell: - 1, tabIndex: "0", cellClass: "dijitPaletteCell", dyeClass: null, _dyeFactory: function(_4ba) {
var _4bb = typeof this.dyeClass == "string" ? lang.getObject(this.dyeClass) : this.dyeClass;
        return new _4bb(_4ba);
}, _preparePalette: function(_4bc, _4bd) {
this._cells = [];
        var url = this._blankGif;
        this.own(on(this.gridNode, _4b6, lang.hitch(this, "_onCellClick")));
        for (var row = 0; row < _4bc.length; row++) {
var _4be = _4b4.create("tr", {tabIndex: "-1", role: "row"}, this.gridNode);
        for (var col = 0; col < _4bc[row].length; col++) {
var _4bf = _4bc[row][col];
        if (_4bf) {
var _4c0 = this._dyeFactory(_4bf, row, col, _4bd[_4bf]);
        var _4c1 = _4b4.create("td", {"class": this.cellClass, tabIndex: "-1", title: _4bd[_4bf], role: "gridcell"}, _4be);
        _4c0.fillCell(_4c1, url);
        _4c1.idx = this._cells.length;
        this._cells.push({node: _4c1, dye: _4c0});
}
}
}
this._xDim = _4bc[0].length;
        this._yDim = _4bc.length;
        var _4c2 = {UP_ARROW: - this._xDim, DOWN_ARROW: this._xDim, RIGHT_ARROW: this.isLeftToRight() ? 1 : - 1, LEFT_ARROW: this.isLeftToRight() ? - 1 : 1};
        for (var key in _4c2) {
this.own(_4b8.addKeyListener(this.domNode, {keyCode: keys[key], ctrlKey: false, altKey: false, shiftKey: false}, this, function() {
var _4c3 = _4c2[key];
        return function(_4c4) {
        this._navigateByKey(_4c3, _4c4);
        };
}(), this.timeoutChangeRate, this.defaultTimeout));
}
}, postCreate: function() {
this.inherited(arguments);
        this._setCurrent(this._cells[0].node);
}, focus: function() {
_4b7.focus(this._currentFocus);
}, _onCellClick: function(evt) {
var _4c5 = evt.target;
        while (_4c5.tagName != "TD") {
if (!_4c5.parentNode || _4c5 == this.gridNode) {
return;
}
_4c5 = _4c5.parentNode;
}
var _4c6 = this._getDye(_4c5).getValue();
        this._setCurrent(_4c5);
        _4b7.focus(_4c5);
        this._setValueAttr(_4c6, true);
        evt.stopPropagation();
        evt.preventDefault();
}, _setCurrent: function(node) {
if ("_currentFocus" in this) {
_4b2.set(this._currentFocus, "tabIndex", "-1");
}
this._currentFocus = node;
        if (node) {
_4b2.set(node, "tabIndex", this.tabIndex);
}
}, _setValueAttr: function(_4c7, _4c8) {
if (this._selectedCell >= 0) {
_4b3.remove(this._cells[this._selectedCell].node, this.cellClass + "Selected");
}
this._selectedCell = - 1;
        if (_4c7) {
for (var i = 0; i < this._cells.length; i++) {
if (_4c7 == this._cells[i].dye.getValue()) {
this._selectedCell = i;
        _4b3.add(this._cells[i].node, this.cellClass + "Selected");
        break;
}
}
}
this._set("value", this._selectedCell >= 0 ? _4c7 : null);
        if (_4c8 || _4c8 === undefined) {
this.onChange(_4c7);
}
}, onChange: function() {
}, _navigateByKey: function(_4c9, _4ca) {
if (_4ca == - 1) {
return;
}
var _4cb = this._currentFocus.idx + _4c9;
        if (_4cb < this._cells.length && _4cb > - 1) {
var _4cc = this._cells[_4cb].node;
        this._setCurrent(_4cc);
        this.defer(lang.hitch(_4b7, "focus", _4cc));
}
}, _getDye: function(cell) {
return this._cells[cell.idx].dye;
}});
        return _4b9;
});
}, "dojo/colors": function() {
define(["./_base/kernel", "./_base/lang", "./_base/Color", "./_base/array"], function(dojo, lang, _4cd, _4ce) {
var _4cf = {};
        lang.setObject("dojo.colors", _4cf);
        var _4d0 = function(m1, m2, h) {
        if (h < 0) {
        ++h;
        }
        if (h > 1) {
        --h;
        }
        var h6 = 6 * h;
                if (h6 < 1) {
        return m1 + (m2 - m1) * h6;
        }
        if (2 * h < 1) {
        return m2;
        }
        if (3 * h < 2) {
        return m1 + (m2 - m1) * (2 / 3 - h) * 6;
        }
        return m1;
        };
        dojo.colorFromRgb = _4cd.fromRgb = function(_4d1, obj) {
        var m = _4d1.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);
                if (m) {
        var c = m[2].split(/\s*,\s*/), l = c.length, t = m[1], a;
                if ((t == "rgb" && l == 3) || (t == "rgba" && l == 4)) {
        var r = c[0];
                if (r.charAt(r.length - 1) == "%") {
        a = _4ce.map(c, function(x) {
        return parseFloat(x) * 2.56;
        });
                if (l == 4) {
        a[3] = c[3];
        }
        return _4cd.fromArray(a, obj);
        }
        return _4cd.fromArray(c, obj);
        }
        if ((t == "hsl" && l == 3) || (t == "hsla" && l == 4)) {
        var H = ((parseFloat(c[0]) % 360) + 360) % 360 / 360, S = parseFloat(c[1]) / 100, L = parseFloat(c[2]) / 100, m2 = L <= 0.5 ? L * (S + 1) : L + S - L * S, m1 = 2 * L - m2;
                a = [_4d0(m1, m2, H + 1 / 3) * 256, _4d0(m1, m2, H) * 256, _4d0(m1, m2, H - 1 / 3) * 256, 1];
                if (l == 4) {
        a[3] = c[3];
        }
        return _4cd.fromArray(a, obj);
        }
        }
        return null;
        };
        var _4d2 = function(c, low, high) {
        c = Number(c);
                return isNaN(c) ? high : c < low ? low : c > high ? high : c;
        };
        _4cd.prototype.sanitize = function() {
        var t = this;
                t.r = Math.round(_4d2(t.r, 0, 255));
                t.g = Math.round(_4d2(t.g, 0, 255));
                t.b = Math.round(_4d2(t.b, 0, 255));
                t.a = _4d2(t.a, 0, 1);
                return this;
        };
        _4cf.makeGrey = _4cd.makeGrey = function(g, a) {
        return _4cd.fromArray([g, g, g, a]);
        };
        lang.mixin(_4cd.named, {"aliceblue": [240, 248, 255], "antiquewhite": [250, 235, 215], "aquamarine": [127, 255, 212], "azure": [240, 255, 255], "beige": [245, 245, 220], "bisque": [255, 228, 196], "blanchedalmond": [255, 235, 205], "blueviolet": [138, 43, 226], "brown": [165, 42, 42], "burlywood": [222, 184, 135], "cadetblue": [95, 158, 160], "chartreuse": [127, 255, 0], "chocolate": [210, 105, 30], "coral": [255, 127, 80], "cornflowerblue": [100, 149, 237], "cornsilk": [255, 248, 220], "crimson": [220, 20, 60], "cyan": [0, 255, 255], "darkblue": [0, 0, 139], "darkcyan": [0, 139, 139], "darkgoldenrod": [184, 134, 11], "darkgray": [169, 169, 169], "darkgreen": [0, 100, 0], "darkgrey": [169, 169, 169], "darkkhaki": [189, 183, 107], "darkmagenta": [139, 0, 139], "darkolivegreen": [85, 107, 47], "darkorange": [255, 140, 0], "darkorchid": [153, 50, 204], "darkred": [139, 0, 0], "darksalmon": [233, 150, 122], "darkseagreen": [143, 188, 143], "darkslateblue": [72, 61, 139], "darkslategray": [47, 79, 79], "darkslategrey": [47, 79, 79], "darkturquoise": [0, 206, 209], "darkviolet": [148, 0, 211], "deeppink": [255, 20, 147], "deepskyblue": [0, 191, 255], "dimgray": [105, 105, 105], "dimgrey": [105, 105, 105], "dodgerblue": [30, 144, 255], "firebrick": [178, 34, 34], "floralwhite": [255, 250, 240], "forestgreen": [34, 139, 34], "gainsboro": [220, 220, 220], "ghostwhite": [248, 248, 255], "gold": [255, 215, 0], "goldenrod": [218, 165, 32], "greenyellow": [173, 255, 47], "grey": [128, 128, 128], "honeydew": [240, 255, 240], "hotpink": [255, 105, 180], "indianred": [205, 92, 92], "indigo": [75, 0, 130], "ivory": [255, 255, 240], "khaki": [240, 230, 140], "lavender": [230, 230, 250], "lavenderblush": [255, 240, 245], "lawngreen": [124, 252, 0], "lemonchiffon": [255, 250, 205], "lightblue": [173, 216, 230], "lightcoral": [240, 128, 128], "lightcyan": [224, 255, 255], "lightgoldenrodyellow": [250, 250, 210], "lightgray": [211, 211, 211], "lightgreen": [144, 238, 144], "lightgrey": [211, 211, 211], "lightpink": [255, 182, 193], "lightsalmon": [255, 160, 122], "lightseagreen": [32, 178, 170], "lightskyblue": [135, 206, 250], "lightslategray": [119, 136, 153], "lightslategrey": [119, 136, 153], "lightsteelblue": [176, 196, 222], "lightyellow": [255, 255, 224], "limegreen": [50, 205, 50], "linen": [250, 240, 230], "magenta": [255, 0, 255], "mediumaquamarine": [102, 205, 170], "mediumblue": [0, 0, 205], "mediumorchid": [186, 85, 211], "mediumpurple": [147, 112, 219], "mediumseagreen": [60, 179, 113], "mediumslateblue": [123, 104, 238], "mediumspringgreen": [0, 250, 154], "mediumturquoise": [72, 209, 204], "mediumvioletred": [199, 21, 133], "midnightblue": [25, 25, 112], "mintcream": [245, 255, 250], "mistyrose": [255, 228, 225], "moccasin": [255, 228, 181], "navajowhite": [255, 222, 173], "oldlace": [253, 245, 230], "olivedrab": [107, 142, 35], "orange": [255, 165, 0], "orangered": [255, 69, 0], "orchid": [218, 112, 214], "palegoldenrod": [238, 232, 170], "palegreen": [152, 251, 152], "paleturquoise": [175, 238, 238], "palevioletred": [219, 112, 147], "papayawhip": [255, 239, 213], "peachpuff": [255, 218, 185], "peru": [205, 133, 63], "pink": [255, 192, 203], "plum": [221, 160, 221], "powderblue": [176, 224, 230], "rosybrown": [188, 143, 143], "royalblue": [65, 105, 225], "saddlebrown": [139, 69, 19], "salmon": [250, 128, 114], "sandybrown": [244, 164, 96], "seagreen": [46, 139, 87], "seashell": [255, 245, 238], "sienna": [160, 82, 45], "skyblue": [135, 206, 235], "slateblue": [106, 90, 205], "slategray": [112, 128, 144], "slategrey": [112, 128, 144], "snow": [255, 250, 250], "springgreen": [0, 255, 127], "steelblue": [70, 130, 180], "tan": [210, 180, 140], "thistle": [216, 191, 216], "tomato": [255, 99, 71], "turquoise": [64, 224, 208], "violet": [238, 130, 238], "wheat": [245, 222, 179], "whitesmoke": [245, 245, 245], "yellowgreen": [154, 205, 50]});
        return _4cd;
});
}, "dijit/Declaration": function() {
define(["dojo/_base/array", "dojo/aspect", "dojo/_base/declare", "dojo/_base/lang", "dojo/parser", "dojo/query", "./_Widget", "./_TemplatedMixin", "./_WidgetsInTemplateMixin", "dojo/NodeList-dom"], function(_4d3, _4d4, _4d5, lang, _4d6, _4d7, _4d8, _4d9, _4da) {
return _4d5("dijit.Declaration", _4d8, {_noScript: true, stopParser: true, widgetClass: "", defaults: null, mixins: [], buildRendering: function() {
var src = this.srcNodeRef.parentNode.removeChild(this.srcNodeRef), _4db = _4d7("> script[type='dojo/method']", src).orphan(), _4dc = _4d7("> script[type='dojo/connect']", src).orphan(), _4dd = _4d7("> script[type='dojo/aspect']", src).orphan(), _4de = src.nodeName;
        var _4df = this.defaults || {};
        _4d3.forEach(_4db, function(s) {
        var evt = s.getAttribute("event") || s.getAttribute("data-dojo-event"), func = _4d6._functionFromScript(s, "data-dojo-");
                if (evt) {
        _4df[evt] = func;
        } else {
        _4dd.push(s);
        }
        });
        if (this.mixins.length) {
this.mixins = _4d3.map(this.mixins, function(name) {
return lang.getObject(name);
});
} else {
this.mixins = [_4d8, _4d9, _4da];
}
_4df._skipNodeCache = true;
        _4df.templateString = "<" + _4de + " class='" + src.className + "'" + " data-dojo-attach-point='" + (src.getAttribute("data-dojo-attach-point") || src.getAttribute("dojoAttachPoint") || "") + "' data-dojo-attach-event='" + (src.getAttribute("data-dojo-attach-event") || src.getAttribute("dojoAttachEvent") || "") + "' >" + src.innerHTML.replace(/\%7B/g, "{").replace(/\%7D/g, "}") + "</" + _4de + ">";
        var wc = _4d5(this.widgetClass, this.mixins, _4df);
        _4d3.forEach(_4dd, function(s) {
        var _4e0 = s.getAttribute("data-dojo-advice") || "after", _4e1 = s.getAttribute("data-dojo-method") || "postscript", func = _4d6._functionFromScript(s);
                _4d4.after(wc.prototype, _4e1, func, true);
        });
        _4d3.forEach(_4dc, function(s) {
        var evt = s.getAttribute("event") || s.getAttribute("data-dojo-event"), func = _4d6._functionFromScript(s);
                _4d4.after(wc.prototype, evt, func, true);
        });
}});
});
}, "dijit/_WidgetsInTemplateMixin": function() {
define(["dojo/_base/array", "dojo/aspect", "dojo/_base/declare", "dojo/_base/lang", "dojo/parser"], function(_4e2, _4e3, _4e4, lang, _4e5) {
return _4e4("dijit._WidgetsInTemplateMixin", null, {_earlyTemplatedStartup: false, widgetsInTemplate: true, contextRequire: null, _beforeFillContent: function() {
if (this.widgetsInTemplate) {
var node = this.domNode;
        if (this.containerNode && !this.searchContainerNode) {
this.containerNode.stopParser = true;
}
_4e5.parse(node, {noStart: !this._earlyTemplatedStartup, template: true, inherited: {dir: this.dir, lang: this.lang, textDir: this.textDir}, propsThis: this, contextRequire: this.contextRequire, scope: "dojo"}).then(lang.hitch(this, function(_4e6) {
this._startupWidgets = _4e6;
        for (var i = 0; i < _4e6.length; i++) {
this._processTemplateNode(_4e6[i], function(n, p) {
return n[p];
}, function(_4e7, type, _4e8) {
if (type in _4e7) {
return _4e7.connect(_4e7, type, _4e8);
} else {
return _4e7.on(type, _4e8, true);
}
});
}
if (this.containerNode && this.containerNode.stopParser) {
delete this.containerNode.stopParser;
}
}));
        if (!this._startupWidgets) {
throw new Error(this.declaredClass + ": parser returned unfilled promise (probably waiting for module auto-load), " + "unsupported by _WidgetsInTemplateMixin.   Must pre-load all supporting widgets before instantiation.");
}
}
}, _processTemplateNode: function(_4e9, _4ea, _4eb) {
if (_4ea(_4e9, "dojoType") || _4ea(_4e9, "data-dojo-type")) {
return true;
}
return this.inherited(arguments);
}, startup: function() {
_4e2.forEach(this._startupWidgets, function(w) {
if (w && !w._started && w.startup) {
w.startup();
}
});
        this._startupWidgets = null;
        this.inherited(arguments);
}});
});
}, "dijit/Dialog": function() {
define(["require", "dojo/_base/array", "dojo/aspect", "dojo/_base/declare", "dojo/Deferred", "dojo/dom", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/fx", "dojo/i18n", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/ready", "dojo/sniff", "dojo/window", "dojo/dnd/Moveable", "dojo/dnd/TimedMoveable", "./focus", "./_base/manager", "./_Widget", "./_TemplatedMixin", "./_CssStateMixin", "./form/_FormMixin", "./_DialogMixin", "./DialogUnderlay", "./layout/ContentPane", "dojo/text!./templates/Dialog.html", "dojo/i18n!./nls/common"], function(_4ec, _4ed, _4ee, _4ef, _4f0, dom, _4f1, _4f2, _4f3, fx, i18n, keys, lang, on, _4f4, has, _4f5, _4f6, _4f7, _4f8, _4f9, _4fa, _4fb, _4fc, _4fd, _4fe, _4ff, _500, _501) {
var _502 = new _4f0();
        _502.resolve(true);
        var _503 = _4ef("dijit._DialogBase" + (has("dojo-bidi") ? "_NoBidi" : ""), [_4fb, _4fd, _4fe, _4fc], {templateString: _501, baseClass: "dijitDialog", cssStateNodes: {closeButtonNode: "dijitDialogCloseIcon"}, _setTitleAttr: {node: "titleNode", type: "innerHTML"}, open: false, duration: _4f9.defaultDuration, refocus: true, autofocus: true, _firstFocusItem: null, _lastFocusItem: null, doLayout: false, draggable: true, _setDraggableAttr: function(val) {
        this._set("draggable", val);
        }, maxRatio: 0.9, closable: true, _setClosableAttr: function(val) {
        this.closeButtonNode.style.display = val ? "" : "none";
                this._set("closable", val);
        }, postMixInProperties: function() {
        var _504 = i18n.getLocalization("dijit", "common");
                lang.mixin(this, _504);
                this.inherited(arguments);
        }, postCreate: function() {
        _4f3.set(this.domNode, {display: "none", position: "absolute"});
                this.ownerDocumentBody.appendChild(this.domNode);
                this.inherited(arguments);
                _4ee.after(this, "onExecute", lang.hitch(this, "hide"), true);
                _4ee.after(this, "onCancel", lang.hitch(this, "hide"), true);
                this._modalconnects = [];
        }, onLoad: function() {
        this._size();
                this._position();
                if (this.autofocus && _505.isTop(this)) {
        this._getFocusItems(this.domNode);
                _4f8.focus(this._firstFocusItem);
        }
        this.inherited(arguments);
        }, focus: function() {
        this._getFocusItems(this.domNode);
                _4f8.focus(this._firstFocusItem);
        }, _endDrag: function() {
        var _506 = _4f2.position(this.domNode), _507 = _4f5.getBox(this.ownerDocument);
                _506.y = Math.min(Math.max(_506.y, 0), (_507.h - _506.h));
                _506.x = Math.min(Math.max(_506.x, 0), (_507.w - _506.w));
                this._relativePosition = _506;
                this._position();
        }, _setup: function() {
        var node = this.domNode;
                if (this.titleBar && this.draggable) {
        this._moveable = new ((has("ie") == 6) ? _4f7 : _4f6)(node, {handle: this.titleBar});
                _4ee.after(this._moveable, "onMoveStop", lang.hitch(this, "_endDrag"), true);
        } else {
        _4f1.add(node, "dijitDialogFixed");
        }
        this.underlayAttrs = {dialogId: this.id, "class": _4ed.map(this["class"].split(/\s/), function(s) {
        return s + "_underlay";
        }).join(" "), _onKeyDown: lang.hitch(this, "_onKey"), ownerDocument: this.ownerDocument};
        }, _size: function() {
        this._checkIfSingleChild();
                if (this._singleChild) {
        if (typeof this._singleChildOriginalStyle != "undefined") {
        this._singleChild.domNode.style.cssText = this._singleChildOriginalStyle;
                delete this._singleChildOriginalStyle;
        }
        } else {
        _4f3.set(this.containerNode, {width: "auto", height: "auto"});
        }
        var bb = _4f2.position(this.domNode);
                var _508 = _4f5.getBox(this.ownerDocument);
                _508.w *= this.maxRatio;
                _508.h *= this.maxRatio;
                if (bb.w >= _508.w || bb.h >= _508.h) {
        var _509 = _4f2.position(this.containerNode), w = Math.min(bb.w, _508.w) - (bb.w - _509.w), h = Math.min(bb.h, _508.h) - (bb.h - _509.h);
                if (this._singleChild && this._singleChild.resize) {
        if (typeof this._singleChildOriginalStyle == "undefined") {
        this._singleChildOriginalStyle = this._singleChild.domNode.style.cssText;
        }
        this._singleChild.resize({w: w, h: h});
        } else {
        _4f3.set(this.containerNode, {width: w + "px", height: h + "px", overflow: "auto", position: "relative"});
        }
        } else {
        if (this._singleChild && this._singleChild.resize) {
        this._singleChild.resize();
        }
        }
        }, _position: function() {
        if (!_4f1.contains(this.ownerDocumentBody, "dojoMove")) {
        var node = this.domNode, _50a = _4f5.getBox(this.ownerDocument), p = this._relativePosition, bb = p ? null : _4f2.position(node), l = Math.floor(_50a.l + (p ? p.x : (_50a.w - bb.w) / 2)), t = Math.floor(_50a.t + (p ? p.y : (_50a.h - bb.h) / 2));
                _4f3.set(node, {left: l + "px", top: t + "px"});
        }
        }, _onKey: function(evt) {
        if (evt.keyCode == keys.TAB) {
        this._getFocusItems(this.domNode);
                var node = evt.target;
                if (this._firstFocusItem == this._lastFocusItem) {
        evt.stopPropagation();
                evt.preventDefault();
        } else {
        if (node == this._firstFocusItem && evt.shiftKey) {
        _4f8.focus(this._lastFocusItem);
                evt.stopPropagation();
                evt.preventDefault();
        } else {
        if (node == this._lastFocusItem && !evt.shiftKey) {
        _4f8.focus(this._firstFocusItem);
                evt.stopPropagation();
                evt.preventDefault();
        }
        }
        }
        } else {
        if (this.closable && evt.keyCode == keys.ESCAPE) {
        this.onCancel();
                evt.stopPropagation();
                evt.preventDefault();
        }
        }
        }, show: function() {
        if (this.open) {
        return _502.promise;
        }
        if (!this._started) {
        this.startup();
        }
        if (!this._alreadyInitialized) {
        this._setup();
                this._alreadyInitialized = true;
        }
        if (this._fadeOutDeferred) {
        this._fadeOutDeferred.cancel();
                _505.hide(this);
        }
        var win = _4f5.get(this.ownerDocument);
                this._modalconnects.push(on(win, "scroll", lang.hitch(this, "resize")));
                this._modalconnects.push(on(this.domNode, "keydown", lang.hitch(this, "_onKey")));
                _4f3.set(this.domNode, {opacity: 0, display: ""});
                this._set("open", true);
                this._onShow();
                this._size();
                this._position();
                var _50b;
                this._fadeInDeferred = new _4f0(lang.hitch(this, function() {
                _50b.stop();
                        delete this._fadeInDeferred;
                }));
                var _50c = this._fadeInDeferred.promise;
                _50b = fx.fadeIn({node: this.domNode, duration: this.duration, beforeBegin: lang.hitch(this, function() {
                _505.show(this, this.underlayAttrs);
                }), onEnd: lang.hitch(this, function() {
                if (this.autofocus && _505.isTop(this)) {
                this._getFocusItems(this.domNode);
                        _4f8.focus(this._firstFocusItem);
                }
                this._fadeInDeferred.resolve(true);
                        delete this._fadeInDeferred;
                })}).play();
                return _50c;
        }, hide: function() {
        if (!this._alreadyInitialized || !this.open) {
        return _502.promise;
        }
        if (this._fadeInDeferred) {
        this._fadeInDeferred.cancel();
        }
        var _50d;
                this._fadeOutDeferred = new _4f0(lang.hitch(this, function() {
                _50d.stop();
                        delete this._fadeOutDeferred;
                }));
                this._fadeOutDeferred.then(lang.hitch(this, "onHide"));
                var _50e = this._fadeOutDeferred.promise;
                _50d = fx.fadeOut({node: this.domNode, duration: this.duration, onEnd: lang.hitch(this, function() {
                this.domNode.style.display = "none";
                        _505.hide(this);
                        this._fadeOutDeferred.resolve(true);
                        delete this._fadeOutDeferred;
                })}).play();
                if (this._scrollConnected) {
        this._scrollConnected = false;
        }
        var h;
                while (h = this._modalconnects.pop()) {
        h.remove();
        }
        if (this._relativePosition) {
        delete this._relativePosition;
        }
        this._set("open", false);
                return _50e;
        }, resize: function() {
        if (this.domNode.style.display != "none") {
        this._size();
                if (!has("touch")) {
        this._position();
        }
        }
        }, destroy: function() {
        if (this._fadeInDeferred) {
        this._fadeInDeferred.cancel();
        }
        if (this._fadeOutDeferred) {
        this._fadeOutDeferred.cancel();
        }
        if (this._moveable) {
        this._moveable.destroy();
        }
        var h;
                while (h = this._modalconnects.pop()) {
        h.remove();
        }
        _505.hide(this);
                this.inherited(arguments);
        }});
        if (has("dojo-bidi")) {
_503 = _4ef("dijit._DialogBase", _503, {_setTitleAttr: function(_50f) {
this._set("title", _50f);
        this.titleNode.innerHTML = _50f;
        this.applyTextDir(this.titleNode);
}, _setTextDirAttr: function(_510) {
if (this._created && this.textDir != _510) {
this._set("textDir", _510);
        this.set("title", this.title);
}
}});
}
var _511 = _4ef("dijit.Dialog", [_500, _503], {});
        _511._DialogBase = _503;
        var _505 = _511._DialogLevelManager = {_beginZIndex: 950, show: function(_512, _513) {
        ds[ds.length - 1].focus = _4f8.curNode;
                var _514 = ds[ds.length - 1].dialog ? ds[ds.length - 1].zIndex + 2 : _511._DialogLevelManager._beginZIndex;
                _4f3.set(_512.domNode, "zIndex", _514);
                _4ff.show(_513, _514 - 1);
                ds.push({dialog: _512, underlayAttrs: _513, zIndex: _514});
        }, hide: function(_515) {
        if (ds[ds.length - 1].dialog == _515) {
        ds.pop();
                var pd = ds[ds.length - 1];
                if (ds.length == 1) {
        _4ff.hide();
        } else {
        _4ff.show(pd.underlayAttrs, pd.zIndex - 1);
        }
        if (_515.refocus) {
        var _516 = pd.focus;
                if (pd.dialog && (!_516 || !dom.isDescendant(_516, pd.dialog.domNode))) {
        pd.dialog._getFocusItems(pd.dialog.domNode);
                _516 = pd.dialog._firstFocusItem;
        }
        if (_516) {
        try {
        _516.focus();
        } catch (e) {
        }
        }
        }
        } else {
        var idx = _4ed.indexOf(_4ed.map(ds, function(elem) {
        return elem.dialog;
        }), _515);
                if (idx != - 1) {
        ds.splice(idx, 1);
        }
        }
        }, isTop: function(_517) {
        return ds[ds.length - 1].dialog == _517;
        }};
        var ds = _511._dialogStack = [{dialog: null, focus: null, underlayAttrs: null}];
        _4f8.watch("curNode", function(attr, _518, node) {
        var _519 = ds[ds.length - 1].dialog;
                if (node && _519 && !_519._fadeOutDeferred && node.ownerDocument == _519.ownerDocument) {
        do {
        if (node == _519.domNode || _4f1.contains(node, "dijitPopup")) {
        return;
        }
        } while (node = node.parentNode);
                _519.focus();
        }
        });
        if (has("dijit-legacy-requires")) {
_4f4(0, function() {
var _51a = ["dijit/TooltipDialog"];
        _4ec(_51a);
});
}
return _511;
});
}, "dojo/dnd/Moveable": function() {
define(["../_base/array", "../_base/declare", "../_base/lang", "../dom", "../dom-class", "../Evented", "../on", "../topic", "../touch", "./common", "./Mover", "../_base/window"], function(_51b, _51c, lang, dom, _51d, _51e, on, _51f, _520, dnd, _521, win) {
var _522 = _51c("dojo.dnd.Moveable", [_51e], {handle: "", delay: 0, skip: false, constructor: function(node, _523) {
this.node = dom.byId(node);
        if (!_523) {
_523 = {};
}
this.handle = _523.handle ? dom.byId(_523.handle) : null;
        if (!this.handle) {
this.handle = this.node;
}
this.delay = _523.delay > 0 ? _523.delay : 0;
        this.skip = _523.skip;
        this.mover = _523.mover ? _523.mover : _521;
        this.events = [on(this.handle, _520.press, lang.hitch(this, "onMouseDown")), on(this.handle, "dragstart", lang.hitch(this, "onSelectStart")), on(this.handle, "selectstart", lang.hitch(this, "onSelectStart"))];
}, markupFactory: function(_524, node, Ctor) {
return new Ctor(node, _524);
}, destroy: function() {
_51b.forEach(this.events, function(_525) {
_525.remove();
});
        this.events = this.node = this.handle = null;
}, onMouseDown: function(e) {
if (this.skip && dnd.isFormElement(e)) {
return;
}
if (this.delay) {
this.events.push(on(this.handle, _520.move, lang.hitch(this, "onMouseMove")), on(this.handle, _520.release, lang.hitch(this, "onMouseUp")));
        this._lastX = e.pageX;
        this._lastY = e.pageY;
} else {
this.onDragDetected(e);
}
e.stopPropagation();
        e.preventDefault();
}, onMouseMove: function(e) {
if (Math.abs(e.pageX - this._lastX) > this.delay || Math.abs(e.pageY - this._lastY) > this.delay) {
this.onMouseUp(e);
        this.onDragDetected(e);
}
e.stopPropagation();
        e.preventDefault();
}, onMouseUp: function(e) {
for (var i = 0; i < 2; ++i) {
this.events.pop().remove();
}
e.stopPropagation();
        e.preventDefault();
}, onSelectStart: function(e) {
if (!this.skip || !dnd.isFormElement(e)) {
e.stopPropagation();
        e.preventDefault();
}
}, onDragDetected: function(e) {
new this.mover(this.node, e, this);
}, onMoveStart: function(_526) {
_51f.publish("/dnd/move/start", _526);
        _51d.add(win.body(), "dojoMove");
        _51d.add(this.node, "dojoMoveItem");
}, onMoveStop: function(_527) {
_51f.publish("/dnd/move/stop", _527);
        _51d.remove(win.body(), "dojoMove");
        _51d.remove(this.node, "dojoMoveItem");
}, onFirstMove: function() {
}, onMove: function(_528, _529) {
this.onMoving(_528, _529);
        var s = _528.node.style;
        s.left = _529.l + "px";
        s.top = _529.t + "px";
        this.onMoved(_528, _529);
}, onMoving: function() {
}, onMoved: function() {
}});
        return _522;
});
}, "dojo/dnd/Mover": function() {
define(["../_base/array", "../_base/declare", "../_base/lang", "../sniff", "../_base/window", "../dom", "../dom-geometry", "../dom-style", "../Evented", "../on", "../touch", "./common", "./autoscroll"], function(_52a, _52b, lang, has, win, dom, _52c, _52d, _52e, on, _52f, dnd, _530) {
return _52b("dojo.dnd.Mover", [_52e], {constructor: function(node, e, host) {
this.node = dom.byId(node);
        this.marginBox = {l: e.pageX, t: e.pageY};
        this.mouseButton = e.button;
        var h = (this.host = host), d = node.ownerDocument;
        function _531(e) {
        e.preventDefault();
                e.stopPropagation();
        }
;
        this.events = [on(d, _52f.move, lang.hitch(this, "onFirstMove")), on(d, _52f.move, lang.hitch(this, "onMouseMove")), on(d, _52f.release, lang.hitch(this, "onMouseUp")), on(d, "dragstart", _531), on(d.body, "selectstart", _531)];
        _530.autoScrollStart(d);
        if (h && h.onMoveStart) {
h.onMoveStart(this);
}
}, onMouseMove: function(e) {
_530.autoScroll(e);
        var m = this.marginBox;
        this.host.onMove(this, {l: m.l + e.pageX, t: m.t + e.pageY}, e);
        e.preventDefault();
        e.stopPropagation();
}, onMouseUp: function(e) {
if (has("webkit") && has("mac") && this.mouseButton == 2 ? e.button == 0 : this.mouseButton == e.button) {
this.destroy();
}
e.preventDefault();
        e.stopPropagation();
}, onFirstMove: function(e) {
var s = this.node.style, l, t, h = this.host;
        switch (s.position) {
case "relative":
        case "absolute":
        l = Math.round(parseFloat(s.left)) || 0;
        t = Math.round(parseFloat(s.top)) || 0;
        break;
        default:
        s.position = "absolute";
        var m = _52c.getMarginBox(this.node);
        var b = win.doc.body;
        var bs = _52d.getComputedStyle(b);
        var bm = _52c.getMarginBox(b, bs);
        var bc = _52c.getContentBox(b, bs);
        l = m.l - (bc.l - bm.l);
        t = m.t - (bc.t - bm.t);
        break;
}
this.marginBox.l = l - this.marginBox.l;
        this.marginBox.t = t - this.marginBox.t;
        if (h && h.onFirstMove) {
h.onFirstMove(this, e);
}
this.events.shift().remove();
}, destroy: function() {
_52a.forEach(this.events, function(_532) {
_532.remove();
});
        var h = this.host;
        if (h && h.onMoveStop) {
h.onMoveStop(this);
}
this.events = this.node = this.host = null;
}});
});
}, "dojo/dnd/TimedMoveable": function() {
define(["../_base/declare", "./Moveable"], function(_533, _534) {
var _535 = _534.prototype.onMove;
        return _533("dojo.dnd.TimedMoveable", _534, {timeout: 40, constructor: function(node, _536) {
        if (!_536) {
        _536 = {};
        }
        if (_536.timeout && typeof _536.timeout == "number" && _536.timeout >= 0) {
        this.timeout = _536.timeout;
        }
        }, onMoveStop: function(_537) {
        if (_537._timer) {
        clearTimeout(_537._timer);
                _535.call(this, _537, _537._leftTop);
        }
        _534.prototype.onMoveStop.apply(this, arguments);
        }, onMove: function(_538, _539) {
        _538._leftTop = _539;
                if (!_538._timer) {
        var _53a = this;
                _538._timer = setTimeout(function() {
                _538._timer = null;
                        _535.call(_53a, _538, _538._leftTop);
                }, this.timeout);
        }
        }});
});
}, "dijit/form/_FormMixin": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/_base/kernel", "dojo/_base/lang", "dojo/on", "dojo/window"], function(_53b, _53c, _53d, lang, on, _53e) {
return _53c("dijit.form._FormMixin", null, {state: "", _getDescendantFormWidgets: function(_53f) {
var res = [];
        _53b.forEach(_53f || this.getChildren(), function(_540) {
        if ("value" in _540) {
        res.push(_540);
        } else {
        res = res.concat(this._getDescendantFormWidgets(_540.getChildren()));
        }
        }, this);
        return res;
}, reset: function() {
_53b.forEach(this._getDescendantFormWidgets(), function(_541) {
if (_541.reset) {
_541.reset();
}
});
}, validate: function() {
var _542 = false;
        return _53b.every(_53b.map(this._getDescendantFormWidgets(), function(_543) {
        _543._hasBeenBlurred = true;
                var _544 = _543.disabled || !_543.validate || _543.validate();
                if (!_544 && !_542) {
        _53e.scrollIntoView(_543.containerNode || _543.domNode);
                _543.focus();
                _542 = true;
        }
        return _544;
        }), function(item) {
        return item;
        });
}, setValues: function(val) {
_53d.deprecated(this.declaredClass + "::setValues() is deprecated. Use set('value', val) instead.", "", "2.0");
        return this.set("value", val);
}, _setValueAttr: function(obj) {
var map = {};
        _53b.forEach(this._getDescendantFormWidgets(), function(_545) {
        if (!_545.name) {
        return;
        }
        var _546 = map[_545.name] || (map[_545.name] = []);
                _546.push(_545);
        });
        for (var name in map) {
if (!map.hasOwnProperty(name)) {
continue;
}
var _547 = map[name], _548 = lang.getObject(name, false, obj);
        if (_548 === undefined) {
continue;
}
_548 = [].concat(_548);
        if (typeof _547[0].checked == "boolean") {
_53b.forEach(_547, function(w) {
w.set("value", _53b.indexOf(_548, w._get("value")) != - 1);
});
} else {
if (_547[0].multiple) {
_547[0].set("value", _548);
} else {
_53b.forEach(_547, function(w, i) {
w.set("value", _548[i]);
});
}
}
}
}, getValues: function() {
_53d.deprecated(this.declaredClass + "::getValues() is deprecated. Use get('value') instead.", "", "2.0");
        return this.get("value");
}, _getValueAttr: function() {
var obj = {};
        _53b.forEach(this._getDescendantFormWidgets(), function(_549) {
        var name = _549.name;
                if (!name || _549.disabled) {
        return;
        }
        var _54a = _549.get("value");
                if (typeof _549.checked == "boolean") {
        if (/Radio/.test(_549.declaredClass)) {
        if (_54a !== false) {
        lang.setObject(name, _54a, obj);
        } else {
        _54a = lang.getObject(name, false, obj);
                if (_54a === undefined) {
        lang.setObject(name, null, obj);
        }
        }
        } else {
        var ary = lang.getObject(name, false, obj);
                if (!ary) {
        ary = [];
                lang.setObject(name, ary, obj);
        }
        if (_54a !== false) {
        ary.push(_54a);
        }
        }
        } else {
        var prev = lang.getObject(name, false, obj);
                if (typeof prev != "undefined") {
        if (lang.isArray(prev)) {
        prev.push(_54a);
        } else {
        lang.setObject(name, [prev, _54a], obj);
        }
        } else {
        lang.setObject(name, _54a, obj);
        }
        }
        });
        return obj;
}, isValid: function() {
return this.state == "";
}, onValidStateChange: function() {
}, _getState: function() {
var _54b = _53b.map(this._descendants, function(w) {
return w.get("state") || "";
});
        return _53b.indexOf(_54b, "Error") >= 0 ? "Error" : _53b.indexOf(_54b, "Incomplete") >= 0 ? "Incomplete" : "";
}, disconnectChildren: function() {
}, connectChildren: function(_54c) {
this._descendants = this._getDescendantFormWidgets();
        _53b.forEach(this._descendants, function(_54d) {
        if (!_54d._started) {
        _54d.startup();
        }
        });
        if (!_54c) {
this._onChildChange();
}
}, _onChildChange: function(attr) {
if (!attr || attr == "state" || attr == "disabled") {
this._set("state", this._getState());
}
if (!attr || attr == "value" || attr == "disabled" || attr == "checked") {
if (this._onChangeDelayTimer) {
this._onChangeDelayTimer.remove();
}
this._onChangeDelayTimer = this.defer(function() {
delete this._onChangeDelayTimer;
        this._set("value", this.get("value"));
}, 10);
}
}, startup: function() {
this.inherited(arguments);
        this._descendants = this._getDescendantFormWidgets();
        this.value = this.get("value");
        this.state = this._getState();
        var self = this;
        this.own(on(this.containerNode, "attrmodified-state, attrmodified-disabled, attrmodified-value, attrmodified-checked", function(evt) {
        if (evt.target == self.domNode) {
        return;
        }
        self._onChildChange(evt.type.replace("attrmodified-", ""));
        }));
        this.watch("state", function(attr, _54e, _54f) {
        this.onValidStateChange(_54f == "");
        });
}, destroy: function() {
this.inherited(arguments);
}});
});
}, "dijit/_DialogMixin": function() {
define(["dojo/_base/declare", "./a11y"], function(_550, a11y) {
return _550("dijit._DialogMixin", null, {execute: function() {
}, onCancel: function() {
}, onExecute: function() {
}, _onSubmit: function() {
this.onExecute();
        this.execute(this.get("value"));
}, _getFocusItems: function() {
var _551 = a11y._getTabNavigable(this.containerNode);
        this._firstFocusItem = _551.lowest || _551.first || this.closeButtonNode || this.domNode;
        this._lastFocusItem = _551.last || _551.highest || this._firstFocusItem;
}});
});
}, "dijit/DialogUnderlay": function() {
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/aspect", "dojo/dom-attr", "dojo/dom-style", "dojo/on", "dojo/window", "./_Widget", "./_TemplatedMixin", "./BackgroundIframe", "./Viewport", "./main"], function(_552, lang, _553, _554, _555, on, _556, _557, _558, _559, _55a, _55b) {
var _55c = _552("dijit.DialogUnderlay", [_557, _558], {templateString: "<div class='dijitDialogUnderlayWrapper'><div class='dijitDialogUnderlay' tabIndex='-1' data-dojo-attach-point='node'></div></div>", dialogId: "", "class": "", _modalConnects: [], _setDialogIdAttr: function(id) {
_554.set(this.node, "id", id + "_underlay");
        this._set("dialogId", id);
}, _setClassAttr: function(_55d) {
this.node.className = "dijitDialogUnderlay " + _55d;
        this._set("class", _55d);
}, postCreate: function() {
this.ownerDocumentBody.appendChild(this.domNode);
        this.own(on(this.domNode, "keydown", lang.hitch(this, "_onKeyDown")));
        this.inherited(arguments);
}, layout: function() {
var is = this.node.style, os = this.domNode.style;
        os.display = "none";
        var _55e = _556.getBox(this.ownerDocument);
        os.top = _55e.t + "px";
        os.left = _55e.l + "px";
        is.width = _55e.w + "px";
        is.height = _55e.h + "px";
        os.display = "block";
}, show: function() {
this.domNode.style.display = "block";
        this.open = true;
        this.layout();
        this.bgIframe = new _559(this.domNode);
        var win = _556.get(this.ownerDocument);
        this._modalConnects = [_55a.on("resize", lang.hitch(this, "layout")), on(win, "scroll", lang.hitch(this, "layout"))];
}, hide: function() {
this.bgIframe.destroy();
        delete this.bgIframe;
        this.domNode.style.display = "none";
        while (this._modalConnects.length) {
(this._modalConnects.pop()).remove();
}
this.open = false;
}, destroy: function() {
while (this._modalConnects.length) {
(this._modalConnects.pop()).remove();
}
this.inherited(arguments);
}, _onKeyDown: function() {
}});
        _55c.show = function(_55f, _560) {
        var _561 = _55c._singleton;
                if (!_561 || _561._destroyed) {
        _561 = _55b._underlay = _55c._singleton = new _55c(_55f);
        } else {
        if (_55f) {
        _561.set(_55f);
        }
        }
        _555.set(_561.domNode, "zIndex", _560);
                if (!_561.open) {
        _561.show();
        }
        };
        _55c.hide = function() {
        var _562 = _55c._singleton;
                if (_562 && !_562._destroyed) {
        _562.hide();
        }
        };
        return _55c;
});
}, "dijit/layout/ContentPane": function() {
define(["dojo/_base/kernel", "dojo/_base/lang", "../_Widget", "../_Container", "./_ContentPaneResizeMixin", "dojo/string", "dojo/html", "dojo/i18n!../nls/loading", "dojo/_base/array", "dojo/_base/declare", "dojo/_base/Deferred", "dojo/dom", "dojo/dom-attr", "dojo/dom-construct", "dojo/_base/xhr", "dojo/i18n", "dojo/when"], function(_563, lang, _564, _565, _566, _567, html, _568, _569, _56a, _56b, dom, _56c, _56d, xhr, i18n, when) {
return _56a("dijit.layout.ContentPane", [_564, _565, _566], {href: "", content: "", extractContent: false, parseOnLoad: true, parserScope: _563._scopeName, preventCache: false, preload: false, refreshOnShow: false, loadingMessage: "<span class='dijitContentPaneLoading'><span class='dijitInline dijitIconLoading'></span>${loadingState}</span>", errorMessage: "<span class='dijitContentPaneError'><span class='dijitInline dijitIconError'></span>${errorState}</span>", isLoaded: false, baseClass: "dijitContentPane", ioArgs: {}, onLoadDeferred: null, _setTitleAttr: null, stopParser: true, template: false, markupFactory: function(_56e, node, ctor) {
var self = new ctor(_56e, node);
        return !self.href && self._contentSetter && self._contentSetter.parseDeferred && !self._contentSetter.parseDeferred.isFulfilled() ? self._contentSetter.parseDeferred.then(function() {
return self;
}) : self;
}, create: function(_56f, _570) {
if ((!_56f || !_56f.template) && _570 && !("href" in _56f) && !("content" in _56f)) {
_570 = dom.byId(_570);
        var df = _570.ownerDocument.createDocumentFragment();
        while (_570.firstChild) {
df.appendChild(_570.firstChild);
}
_56f = lang.delegate(_56f, {content: df});
}
this.inherited(arguments, [_56f, _570]);
}, postMixInProperties: function() {
this.inherited(arguments);
        var _571 = i18n.getLocalization("dijit", "loading", this.lang);
        this.loadingMessage = _567.substitute(this.loadingMessage, _571);
        this.errorMessage = _567.substitute(this.errorMessage, _571);
}, buildRendering: function() {
this.inherited(arguments);
        if (!this.containerNode) {
this.containerNode = this.domNode;
}
this.domNode.removeAttribute("title");
}, startup: function() {
this.inherited(arguments);
        if (this._contentSetter) {
_569.forEach(this._contentSetter.parseResults, function(obj) {
if (!obj._started && !obj._destroyed && lang.isFunction(obj.startup)) {
obj.startup();
        obj._started = true;
}
}, this);
}
}, _startChildren: function() {
_569.forEach(this.getChildren(), function(obj) {
if (!obj._started && !obj._destroyed && lang.isFunction(obj.startup)) {
obj.startup();
        obj._started = true;
}
});
        if (this._contentSetter) {
_569.forEach(this._contentSetter.parseResults, function(obj) {
if (!obj._started && !obj._destroyed && lang.isFunction(obj.startup)) {
obj.startup();
        obj._started = true;
}
}, this);
}
}, setHref: function(href) {
_563.deprecated("dijit.layout.ContentPane.setHref() is deprecated. Use set('href', ...) instead.", "", "2.0");
        return this.set("href", href);
}, _setHrefAttr: function(href) {
this.cancel();
        this.onLoadDeferred = new _56b(lang.hitch(this, "cancel"));
        this.onLoadDeferred.then(lang.hitch(this, "onLoad"));
        this._set("href", href);
        if (this.preload || (this._created && this._isShown())) {
this._load();
} else {
this._hrefChanged = true;
}
return this.onLoadDeferred;
}, setContent: function(data) {
_563.deprecated("dijit.layout.ContentPane.setContent() is deprecated.  Use set('content', ...) instead.", "", "2.0");
        this.set("content", data);
}, _setContentAttr: function(data) {
this._set("href", "");
        this.cancel();
        this.onLoadDeferred = new _56b(lang.hitch(this, "cancel"));
        if (this._created) {
this.onLoadDeferred.then(lang.hitch(this, "onLoad"));
}
this._setContent(data || "");
        this._isDownloaded = false;
        return this.onLoadDeferred;
}, _getContentAttr: function() {
return this.containerNode.innerHTML;
}, cancel: function() {
if (this._xhrDfd && (this._xhrDfd.fired == - 1)) {
this._xhrDfd.cancel();
}
delete this._xhrDfd;
        this.onLoadDeferred = null;
}, destroy: function() {
this.cancel();
        this.inherited(arguments);
}, destroyRecursive: function(_572) {
if (this._beingDestroyed) {
return;
}
this.inherited(arguments);
}, _onShow: function() {
this.inherited(arguments);
        if (this.href) {
if (!this._xhrDfd && (!this.isLoaded || this._hrefChanged || this.refreshOnShow)) {
return this.refresh();
}
}
}, refresh: function() {
this.cancel();
        this.onLoadDeferred = new _56b(lang.hitch(this, "cancel"));
        this.onLoadDeferred.then(lang.hitch(this, "onLoad"));
        this._load();
        return this.onLoadDeferred;
}, _load: function() {
this._setContent(this.onDownloadStart(), true);
        var self = this;
        var _573 = {preventCache: (this.preventCache || this.refreshOnShow), url: this.href, handleAs: "text"};
        if (lang.isObject(this.ioArgs)) {
lang.mixin(_573, this.ioArgs);
}
var hand = (this._xhrDfd = (this.ioMethod || xhr.get)(_573)), _574;
        hand.then(function(html) {
        _574 = html;
                try {
                self._isDownloaded = true;
                        return self._setContent(html, false);
                } catch (err) {
        self._onError("Content", err);
        }
        }, function(err) {
        if (!hand.canceled) {
        self._onError("Download", err);
        }
        delete self._xhrDfd;
                return err;
        }).then(function() {
self.onDownloadEnd();
        delete self._xhrDfd;
        return _574;
});
        delete this._hrefChanged;
}, _onLoadHandler: function(data) {
this._set("isLoaded", true);
        try {
        this.onLoadDeferred.resolve(data);
        } catch (e) {
console.error("Error " + this.widgetId + " running custom onLoad code: " + e.message);
}
}, _onUnloadHandler: function() {
this._set("isLoaded", false);
        try {
        this.onUnload();
        } catch (e) {
console.error("Error " + this.widgetId + " running custom onUnload code: " + e.message);
}
}, destroyDescendants: function(_575) {
if (this.isLoaded) {
this._onUnloadHandler();
}
var _576 = this._contentSetter;
        _569.forEach(this.getChildren(), function(_577) {
        if (_577.destroyRecursive) {
        _577.destroyRecursive(_575);
        } else {
        if (_577.destroy) {
        _577.destroy(_575);
        }
        }
        _577._destroyed = true;
        });
        if (_576) {
_569.forEach(_576.parseResults, function(_578) {
if (!_578._destroyed) {
if (_578.destroyRecursive) {
_578.destroyRecursive(_575);
} else {
if (_578.destroy) {
_578.destroy(_575);
}
}
_578._destroyed = true;
}
});
        delete _576.parseResults;
}
if (!_575) {
_56d.empty(this.containerNode);
}
delete this._singleChild;
}, _setContent: function(cont, _579) {
this.destroyDescendants();
        var _57a = this._contentSetter;
        if (!(_57a && _57a instanceof html._ContentSetter)) {
_57a = this._contentSetter = new html._ContentSetter({node: this.containerNode, _onError: lang.hitch(this, this._onError), onContentError: lang.hitch(this, function(e) {
var _57b = this.onContentError(e);
        try {
        this.containerNode.innerHTML = _57b;
        } catch (e) {
console.error("Fatal " + this.id + " could not change content due to " + e.message, e);
}
})});
}
var _57c = lang.mixin({cleanContent: this.cleanContent, extractContent: this.extractContent, parseContent: !cont.domNode && this.parseOnLoad, parserScope: this.parserScope, startup: false, dir: this.dir, lang: this.lang, textDir: this.textDir}, this._contentSetterParams || {});
        var p = _57a.set((lang.isObject(cont) && cont.domNode) ? cont.domNode : cont, _57c);
        var self = this;
        return when(p && p.then ? p : _57a.parseDeferred, function() {
        delete self._contentSetterParams;
                if (!_579) {
        if (self._started) {
        self._startChildren();
                self._scheduleLayout();
        }
        self._onLoadHandler(cont);
        }
        });
}, _onError: function(type, err, _57d) {
this.onLoadDeferred.reject(err);
        var _57e = this["on" + type + "Error"].call(this, err);
        if (_57d) {
console.error(_57d, err);
} else {
if (_57e) {
this._setContent(_57e, true);
}
}
}, onLoad: function() {
}, onUnload: function() {
}, onDownloadStart: function() {
return this.loadingMessage;
}, onContentError: function() {
}, onDownloadError: function() {
return this.errorMessage;
}, onDownloadEnd: function() {
}});
});
}, "dijit/layout/_ContentPaneResizeMixin": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/lang", "dojo/query", "../registry", "../Viewport", "./utils"], function(_57f, _580, _581, _582, _583, lang, _584, _585, _586, _587) {
return _580("dijit.layout._ContentPaneResizeMixin", null, {doLayout: true, isLayoutContainer: true, startup: function() {
if (this._started) {
return;
}
var _588 = this.getParent();
        this._childOfLayoutWidget = _588 && _588.isLayoutContainer;
        this._needLayout = !this._childOfLayoutWidget;
        this.inherited(arguments);
        if (this._isShown()) {
this._onShow();
}
if (!this._childOfLayoutWidget) {
this.own(_586.on("resize", lang.hitch(this, "resize")));
}
}, _checkIfSingleChild: function() {
var _589 = [], _58a = false;
        _584("> *", this.containerNode).some(function(node) {
var _58b = _585.byNode(node);
        if (_58b && _58b.resize) {
_589.push(_58b);
} else {
if (!/script|link|style/i.test(node.nodeName) && node.offsetHeight) {
_58a = true;
}
}
});
        this._singleChild = _589.length == 1 && !_58a ? _589[0] : null;
        _581.toggle(this.containerNode, this.baseClass + "SingleChild", !!this._singleChild);
}, resize: function(_58c, _58d) {
this._resizeCalled = true;
        this._scheduleLayout(_58c, _58d);
}, _scheduleLayout: function(_58e, _58f) {
if (this._isShown()) {
this._layout(_58e, _58f);
} else {
this._needLayout = true;
        this._changeSize = _58e;
        this._resultSize = _58f;
}
}, _layout: function(_590, _591) {
delete this._needLayout;
        if (!this._wasShown && this.open !== false) {
this._onShow();
}
if (_590) {
_582.setMarginBox(this.domNode, _590);
}
var cn = this.containerNode;
        if (cn === this.domNode) {
var mb = _591 || {};
        lang.mixin(mb, _590 || {});
        if (!("h" in mb) || !("w" in mb)) {
mb = lang.mixin(_582.getMarginBox(cn), mb);
}
this._contentBox = _587.marginBox2contentBox(cn, mb);
} else {
this._contentBox = _582.getContentBox(cn);
}
this._layoutChildren();
}, _layoutChildren: function() {
if (this.doLayout) {
this._checkIfSingleChild();
}
if (this._singleChild && this._singleChild.resize) {
var cb = this._contentBox || _582.getContentBox(this.containerNode);
        this._singleChild.resize({w: cb.w, h: cb.h});
} else {
var _592 = this.getChildren(), _593, i = 0;
        while (_593 = _592[i++]) {
if (_593.resize) {
_593.resize();
}
}
}
}, _isShown: function() {
if (this._childOfLayoutWidget) {
if (this._resizeCalled && "open" in this) {
return this.open;
}
return this._resizeCalled;
} else {
if ("open" in this) {
return this.open;
} else {
var node = this.domNode, _594 = this.domNode.parentNode;
        return (node.style.display != "none") && (node.style.visibility != "hidden") && !_581.contains(node, "dijitHidden") && _594 && _594.style && (_594.style.display != "none");
}
}
}, _onShow: function() {
this._wasShown = true;
        if (this._needLayout) {
this._layout(this._changeSize, this._resultSize);
}
this.inherited(arguments);
}});
});
}, "dijit/layout/utils": function() {
define(["dojo/_base/array", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/lang"], function(_595, _596, _597, _598, lang) {
function _599(word) {
return word.substring(0, 1).toUpperCase() + word.substring(1);
}
;
        function size(_59a, dim) {
        var _59b = _59a.resize ? _59a.resize(dim) : _597.setMarginBox(_59a.domNode, dim);
                if (_59b) {
        lang.mixin(_59a, _59b);
        } else {
        lang.mixin(_59a, _597.getMarginBox(_59a.domNode));
                lang.mixin(_59a, dim);
        }
        }
;
        var _59c = {marginBox2contentBox: function(node, mb) {
        var cs = _598.getComputedStyle(node);
                var me = _597.getMarginExtents(node, cs);
                var pb = _597.getPadBorderExtents(node, cs);
                return {l: _598.toPixelValue(node, cs.paddingLeft), t: _598.toPixelValue(node, cs.paddingTop), w: mb.w - (me.w + pb.w), h: mb.h - (me.h + pb.h)};
        }, layoutChildren: function(_59d, dim, _59e, _59f, _5a0) {
        dim = lang.mixin({}, dim);
                _596.add(_59d, "dijitLayoutContainer");
                _59e = _595.filter(_59e, function(item) {
                return item.region != "center" && item.layoutAlign != "client";
                }).concat(_595.filter(_59e, function(item) {
        return item.region == "center" || item.layoutAlign == "client";
        }));
                _595.forEach(_59e, function(_5a1) {
                var elm = _5a1.domNode, pos = (_5a1.region || _5a1.layoutAlign);
                        if (!pos) {
                throw new Error("No region setting for " + _5a1.id);
                }
                var _5a2 = elm.style;
                        _5a2.left = dim.l + "px";
                        _5a2.top = dim.t + "px";
                        _5a2.position = "absolute";
                        _596.add(elm, "dijitAlign" + _599(pos));
                        var _5a3 = {};
                        if (_59f && _59f == _5a1.id) {
                _5a3[_5a1.region == "top" || _5a1.region == "bottom" ? "h" : "w"] = _5a0;
                }
                if (pos == "leading") {
                pos = _5a1.isLeftToRight() ? "left" : "right";
                }
                if (pos == "trailing") {
                pos = _5a1.isLeftToRight() ? "right" : "left";
                }
                if (pos == "top" || pos == "bottom") {
                _5a3.w = dim.w;
                        size(_5a1, _5a3);
                        dim.h -= _5a1.h;
                        if (pos == "top") {
                dim.t += _5a1.h;
                } else {
                _5a2.top = dim.t + dim.h + "px";
                }
                } else {
                if (pos == "left" || pos == "right") {
                _5a3.h = dim.h;
                        size(_5a1, _5a3);
                        dim.w -= _5a1.w;
                        if (pos == "left") {
                dim.l += _5a1.w;
                } else {
                _5a2.left = dim.l + dim.w + "px";
                }
                } else {
                if (pos == "client" || pos == "center") {
                size(_5a1, dim);
                }
                }
                }
                });
        }};
        lang.setObject("dijit.layout.utils", _59c);
        return _59c;
});
}, "dojo/html": function() {
define(["./_base/kernel", "./_base/lang", "./_base/array", "./_base/declare", "./dom", "./dom-construct", "./parser"], function(_5a4, lang, _5a5, _5a6, dom, _5a7, _5a8) {
var html = {};
        lang.setObject("dojo.html", html);
        var _5a9 = 0;
        html._secureForInnerHtml = function(cont) {
        return cont.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig, "");
        };
        html._emptyNode = _5a7.empty;
        html._setNodeContent = function(node, cont) {
        _5a7.empty(node);
                if (cont) {
        if (typeof cont == "string") {
        cont = _5a7.toDom(cont, node.ownerDocument);
        }
        if (!cont.nodeType && lang.isArrayLike(cont)) {
        for (var _5aa = cont.length, i = 0; i < cont.length; i = _5aa == cont.length ? i + 1 : 0) {
        _5a7.place(cont[i], node, "last");
        }
        } else {
        _5a7.place(cont, node, "last");
        }
        }
        return node;
        };
        html._ContentSetter = _5a6("dojo.html._ContentSetter", null, {node: "", content: "", id: "", cleanContent: false, extractContent: false, parseContent: false, parserScope: _5a4._scopeName, startup: true, constructor: function(_5ab, node) {
        lang.mixin(this, _5ab || {});
                node = this.node = dom.byId(this.node || node);
                if (!this.id) {
        this.id = ["Setter", (node) ? node.id || node.tagName : "", _5a9++].join("_");
        }
        }, set: function(cont, _5ac) {
        if (undefined !== cont) {
        this.content = cont;
        }
        if (_5ac) {
        this._mixin(_5ac);
        }
        this.onBegin();
                this.setContent();
                var ret = this.onEnd();
                if (ret && ret.then) {
        return ret;
        } else {
        return this.node;
        }
        }, setContent: function() {
        var node = this.node;
                if (!node) {
        throw new Error(this.declaredClass + ": setContent given no node");
        }
        try {
        node = html._setNodeContent(node, this.content);
        } catch (e) {
        var _5ad = this.onContentError(e);
                try {
                node.innerHTML = _5ad;
                } catch (e) {
        console.error("Fatal " + this.declaredClass + ".setContent could not change content due to " + e.message, e);
        }
        }
        this.node = node;
        }, empty: function() {
        if (this.parseDeferred) {
        if (!this.parseDeferred.isResolved()) {
        this.parseDeferred.cancel();
        }
        delete this.parseDeferred;
        }
        if (this.parseResults && this.parseResults.length) {
        _5a5.forEach(this.parseResults, function(w) {
        if (w.destroy) {
        w.destroy();
        }
        });
                delete this.parseResults;
        }
        _5a7.empty(this.node);
        }, onBegin: function() {
        var cont = this.content;
                if (lang.isString(cont)) {
        if (this.cleanContent) {
        cont = html._secureForInnerHtml(cont);
        }
        if (this.extractContent) {
        var _5ae = cont.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
                if (_5ae) {
        cont = _5ae[1];
        }
        }
        }
        this.empty();
                this.content = cont;
                return this.node;
        }, onEnd: function() {
        if (this.parseContent) {
        this._parse();
        }
        return this.node;
        }, tearDown: function() {
        delete this.parseResults;
                delete this.parseDeferred;
                delete this.node;
                delete this.content;
        }, onContentError: function(err) {
        return "Error occurred setting content: " + err;
        }, onExecError: function(err) {
        return "Error occurred executing scripts: " + err;
        }, _mixin: function(_5af) {
        var _5b0 = {}, key;
                for (key in _5af) {
        if (key in _5b0) {
        continue;
        }
        this[key] = _5af[key];
        }
        }, _parse: function() {
        var _5b1 = this.node;
                try {
                var _5b2 = {};
                        _5a5.forEach(["dir", "lang", "textDir"], function(name) {
                        if (this[name]) {
                        _5b2[name] = this[name];
                        }
                        }, this);
                        var self = this;
                        this.parseDeferred = _5a8.parse({rootNode: _5b1, noStart: !this.startup, inherited: _5b2, scope: this.parserScope}).then(function(_5b3) {
                return self.parseResults = _5b3;
                }, function(e) {
                self._onError("Content", e, "Error parsing in _ContentSetter#" + this.id);
                });
                } catch (e) {
        this._onError("Content", e, "Error parsing in _ContentSetter#" + this.id);
        }
        }, _onError: function(type, err, _5b4) {
        var _5b5 = this["on" + type + "Error"].call(this, err);
                if (_5b4) {
        console.error(_5b4, err);
        } else {
        if (_5b5) {
        html._setNodeContent(this.node, _5b5, true);
        }
        }
        }});
        html.set = function(node, cont, _5b6) {
        if (undefined == cont) {
        console.warn("dojo.html.set: no cont argument provided, using empty string");
                cont = "";
        }
        if (!_5b6) {
        return html._setNodeContent(node, cont, true);
        } else {
        var op = new html._ContentSetter(lang.mixin(_5b6, {content: cont, node: node}));
                return op.set();
        }
        };
        return html;
});
}, "dijit/TooltipDialog": function() {
define(["dojo/_base/declare", "dojo/dom-class", "dojo/has", "dojo/keys", "dojo/_base/lang", "dojo/on", "./focus", "./layout/ContentPane", "./_DialogMixin", "./form/_FormMixin", "./_TemplatedMixin", "dojo/text!./templates/TooltipDialog.html", "./main"], function(_5b7, _5b8, has, keys, lang, on, _5b9, _5ba, _5bb, _5bc, _5bd, _5be, _5bf) {
var _5c0 = _5b7("dijit.TooltipDialog", [_5ba, _5bd, _5bc, _5bb], {title: "", doLayout: false, autofocus: true, baseClass: "dijitTooltipDialog", _firstFocusItem: null, _lastFocusItem: null, templateString: _5be, _setTitleAttr: "containerNode", postCreate: function() {
this.inherited(arguments);
        this.own(on(this.containerNode, "keydown", lang.hitch(this, "_onKey")));
}, orient: function(node, _5c1, _5c2) {
var newC = {"MR-ML": "dijitTooltipRight", "ML-MR": "dijitTooltipLeft", "TM-BM": "dijitTooltipAbove", "BM-TM": "dijitTooltipBelow", "BL-TL": "dijitTooltipBelow dijitTooltipABLeft", "TL-BL": "dijitTooltipAbove dijitTooltipABLeft", "BR-TR": "dijitTooltipBelow dijitTooltipABRight", "TR-BR": "dijitTooltipAbove dijitTooltipABRight", "BR-BL": "dijitTooltipRight", "BL-BR": "dijitTooltipLeft", "BR-TL": "dijitTooltipBelow dijitTooltipABLeft", "BL-TR": "dijitTooltipBelow dijitTooltipABRight", "TL-BR": "dijitTooltipAbove dijitTooltipABRight", "TR-BL": "dijitTooltipAbove dijitTooltipABLeft"}[_5c1 + "-" + _5c2];
        _5b8.replace(this.domNode, newC, this._currentOrientClass || "");
        this._currentOrientClass = newC;
}, focus: function() {
this._getFocusItems(this.containerNode);
        _5b9.focus(this._firstFocusItem);
}, onOpen: function(pos) {
this.orient(this.domNode, pos.aroundCorner, pos.corner);
        var _5c3 = pos.aroundNodePos;
        if (pos.corner.charAt(0) == "M" && pos.aroundCorner.charAt(0) == "M") {
this.connectorNode.style.top = _5c3.y + ((_5c3.h - this.connectorNode.offsetHeight) >> 1) - pos.y + "px";
        this.connectorNode.style.left = "";
} else {
if (pos.corner.charAt(1) == "M" && pos.aroundCorner.charAt(1) == "M") {
this.connectorNode.style.left = _5c3.x + ((_5c3.w - this.connectorNode.offsetWidth) >> 1) - pos.x + "px";
}
}
this._onShow();
}, onClose: function() {
this.onHide();
}, _onKey: function(evt) {
if (evt.keyCode == keys.ESCAPE) {
this.defer("onCancel");
        evt.stopPropagation();
        evt.preventDefault();
} else {
if (evt.keyCode == keys.TAB) {
var node = evt.target;
        this._getFocusItems(this.containerNode);
        if (this._firstFocusItem == this._lastFocusItem) {
evt.stopPropagation();
        evt.preventDefault();
} else {
if (node == this._firstFocusItem && evt.shiftKey) {
_5b9.focus(this._lastFocusItem);
        evt.stopPropagation();
        evt.preventDefault();
} else {
if (node == this._lastFocusItem && !evt.shiftKey) {
_5b9.focus(this._firstFocusItem);
        evt.stopPropagation();
        evt.preventDefault();
} else {
evt.stopPropagation();
}
}
}
}
}
}});
        if (has("dojo-bidi")) {
_5c0.extend({_setTitleAttr: function(_5c4) {
this.containerNode.title = (this.textDir && this.enforceTextDirWithUcc) ? this.enforceTextDirWithUcc(null, _5c4) : _5c4;
        this._set("title", _5c4);
}, _setTextDirAttr: function(_5c5) {
if (!this._created || this.textDir != _5c5) {
this._set("textDir", _5c5);
        if (this.textDir && this.title) {
this.containerNode.title = this.enforceTextDirWithUcc(null, this.title);
}
}
}});
}
return _5c0;
});
}, "dijit/Editor": function() {
define(["require", "dojo/_base/array", "dojo/_base/declare", "dojo/Deferred", "dojo/i18n", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/keys", "dojo/_base/lang", "dojo/sniff", "dojo/string", "dojo/topic", "./_Container", "./Toolbar", "./ToolbarSeparator", "./layout/_LayoutWidget", "./form/ToggleButton", "./_editor/_Plugin", "./_editor/plugins/EnterKeyHandling", "./_editor/html", "./_editor/range", "./_editor/RichText", "./main", "dojo/i18n!./_editor/nls/commands"], function(_5c6, _5c7, _5c8, _5c9, i18n, _5ca, _5cb, _5cc, _5cd, keys, lang, has, _5ce, _5cf, _5d0, _5d1, _5d2, _5d3, _5d4, _5d5, _5d6, html, _5d7, _5d8, _5d9) {
var _5da = _5c8("dijit.Editor", _5d8, {plugins: null, extraPlugins: null, constructor: function() {
if (!lang.isArray(this.plugins)) {
this.plugins = ["undo", "redo", "|", "cut", "copy", "paste", "|", "bold", "italic", "underline", "strikethrough", "|", "insertOrderedList", "insertUnorderedList", "indent", "outdent", "|", "justifyLeft", "justifyRight", "justifyCenter", "justifyFull", _5d6];
}
this._plugins = [];
        this._editInterval = this.editActionInterval * 1000;
        if (has("ie")) {
this.events.push("onBeforeDeactivate");
        this.events.push("onBeforeActivate");
}
}, postMixInProperties: function() {
this.setValueDeferred = new _5c9();
        this.inherited(arguments);
}, postCreate: function() {
this.inherited(arguments);
        this._steps = this._steps.slice(0);
        this._undoedSteps = this._undoedSteps.slice(0);
        if (lang.isArray(this.extraPlugins)) {
this.plugins = this.plugins.concat(this.extraPlugins);
}
this.commands = i18n.getLocalization("dijit._editor", "commands", this.lang);
        if (has("webkit")) {
_5cd.set(this.domNode, "KhtmlUserSelect", "none");
}
}, startup: function() {
this.inherited(arguments);
        if (!this.toolbar) {
this.toolbar = new _5d1({ownerDocument: this.ownerDocument, dir: this.dir, lang: this.lang, "aria-label": this.id});
        this.header.appendChild(this.toolbar.domNode);
}
_5c7.forEach(this.plugins, this.addPlugin, this);
        this.setValueDeferred.resolve(true);
        _5cb.add(this.iframe.parentNode, "dijitEditorIFrameContainer");
        _5cb.add(this.iframe, "dijitEditorIFrame");
        _5ca.set(this.iframe, "allowTransparency", true);
        this.toolbar.startup();
        this.onNormalizedDisplayChanged();
}, destroy: function() {
_5c7.forEach(this._plugins, function(p) {
if (p && p.destroy) {
p.destroy();
}
});
        this._plugins = [];
        this.toolbar.destroyRecursive();
        delete this.toolbar;
        this.inherited(arguments);
}, addPlugin: function(_5db, _5dc) {
var args = lang.isString(_5db) ? {name: _5db} : lang.isFunction(_5db) ? {ctor: _5db} : _5db;
        if (!args.setEditor) {
var o = {"args": args, "plugin": null, "editor": this};
        if (args.name) {
if (_5d5.registry[args.name]) {
o.plugin = _5d5.registry[args.name](args);
} else {
_5cf.publish(_5d9._scopeName + ".Editor.getPlugin", o);
}
}
if (!o.plugin) {
try {
var pc = args.ctor || lang.getObject(args.name) || _5c6(args.name);
        if (pc) {
o.plugin = new pc(args);
}
} catch (e) {
throw new Error(this.id + ": cannot find plugin [" + args.name + "]");
}
}
if (!o.plugin) {
throw new Error(this.id + ": cannot find plugin [" + args.name + "]");
}
_5db = o.plugin;
}
if (arguments.length > 1) {
this._plugins[_5dc] = _5db;
} else {
this._plugins.push(_5db);
}
_5db.setEditor(this);
        if (lang.isFunction(_5db.setToolbar)) {
_5db.setToolbar(this.toolbar);
}
}, resize: function(size) {
if (size) {
_5d3.prototype.resize.apply(this, arguments);
}
}, layout: function() {
var _5dd = (this._contentBox.h - (this.getHeaderHeight() + this.getFooterHeight() + _5cc.getPadBorderExtents(this.iframe.parentNode).h + _5cc.getMarginExtents(this.iframe.parentNode).h));
        this.editingArea.style.height = _5dd + "px";
        if (this.iframe) {
this.iframe.style.height = "100%";
}
this._layoutMode = true;
}, _onIEMouseDown: function(e) {
var _5de;
        var b = this.document.body;
        var _5df = b.clientWidth;
        var _5e0 = b.clientHeight;
        var _5e1 = b.clientLeft;
        var _5e2 = b.offsetWidth;
        var _5e3 = b.offsetHeight;
        var _5e4 = b.offsetLeft;
        if (/^rtl$/i.test(b.dir || "")) {
if (_5df < _5e2 && e.x > _5df && e.x < _5e2) {
_5de = true;
}
} else {
if (e.x < _5e1 && e.x > _5e4) {
_5de = true;
}
}
if (!_5de) {
if (_5e0 < _5e3 && e.y > _5e0 && e.y < _5e3) {
_5de = true;
}
}
if (!_5de) {
delete this._cursorToStart;
        delete this._savedSelection;
        if (e.target.tagName == "BODY") {
this.defer("placeCursorAtEnd");
}
this.inherited(arguments);
}
}, onBeforeActivate: function() {
this._restoreSelection();
}, onBeforeDeactivate: function(e) {
if (this.customUndo) {
this.endEditing(true);
}
if (e.target.tagName != "BODY") {
this._saveSelection();
}
}, customUndo: true, editActionInterval: 3, beginEditing: function(cmd) {
if (!this._inEditing) {
this._inEditing = true;
        this._beginEditing(cmd);
}
if (this.editActionInterval > 0) {
if (this._editTimer) {
this._editTimer.remove();
}
this._editTimer = this.defer("endEditing", this._editInterval);
}
}, _steps: [], _undoedSteps: [], execCommand: function(cmd) {
if (this.customUndo && (cmd == "undo" || cmd == "redo")) {
return this[cmd]();
} else {
if (this.customUndo) {
this.endEditing();
        this._beginEditing();
}
var r = this.inherited(arguments);
        if (this.customUndo) {
this._endEditing();
}
return r;
}
}, _pasteImpl: function() {
return this._clipboardCommand("paste");
}, _cutImpl: function() {
return this._clipboardCommand("cut");
}, _copyImpl: function() {
return this._clipboardCommand("copy");
}, _clipboardCommand: function(cmd) {
var r;
        try {
        r = this.document.execCommand(cmd, false, null);
                if (has("webkit") && !r) {
        throw {code: 1011};
        }
        } catch (e) {
if (e.code == 1011 || (e.code == 9 && has("opera"))) {
var sub = _5ce.substitute, _5e5 = {cut: "X", copy: "C", paste: "V"};
        alert(sub(this.commands.systemShortcut, [this.commands[cmd], sub(this.commands[has("mac") ? "appleKey" : "ctrlKey"], [_5e5[cmd]])]));
}
r = false;
}
return r;
}, queryCommandEnabled: function(cmd) {
if (this.customUndo && (cmd == "undo" || cmd == "redo")) {
return cmd == "undo" ? (this._steps.length > 1) : (this._undoedSteps.length > 0);
} else {
return this.inherited(arguments);
}
}, _moveToBookmark: function(b) {
var _5e6 = b.mark;
        var mark = b.mark;
        var col = b.isCollapsed;
        var r, _5e7, _5e8, sel;
        if (mark) {
if (has("ie") < 9 || (has("ie") === 9 && has("quirks"))) {
if (lang.isArray(mark)) {
_5e6 = [];
        _5c7.forEach(mark, function(n) {
        _5e6.push(_5d7.getNode(n, this.editNode));
        }, this);
        this.selection.moveToBookmark({mark: _5e6, isCollapsed: col});
} else {
if (mark.startContainer && mark.endContainer) {
sel = _5d7.getSelection(this.window);
        if (sel && sel.removeAllRanges) {
sel.removeAllRanges();
        r = _5d7.create(this.window);
        _5e7 = _5d7.getNode(mark.startContainer, this.editNode);
        _5e8 = _5d7.getNode(mark.endContainer, this.editNode);
        if (_5e7 && _5e8) {
r.setStart(_5e7, mark.startOffset);
        r.setEnd(_5e8, mark.endOffset);
        sel.addRange(r);
}
}
}
}
} else {
sel = _5d7.getSelection(this.window);
        if (sel && sel.removeAllRanges) {
sel.removeAllRanges();
        r = _5d7.create(this.window);
        _5e7 = _5d7.getNode(mark.startContainer, this.editNode);
        _5e8 = _5d7.getNode(mark.endContainer, this.editNode);
        if (_5e7 && _5e8) {
r.setStart(_5e7, mark.startOffset);
        r.setEnd(_5e8, mark.endOffset);
        sel.addRange(r);
}
}
}
}
}, _changeToStep: function(from, to) {
this.setValue(to.text);
        var b = to.bookmark;
        if (!b) {
return;
}
this._moveToBookmark(b);
}, undo: function() {
var ret = false;
        if (!this._undoRedoActive) {
this._undoRedoActive = true;
        this.endEditing(true);
        var s = this._steps.pop();
        if (s && this._steps.length > 0) {
this.focus();
        this._changeToStep(s, this._steps[this._steps.length - 1]);
        this._undoedSteps.push(s);
        this.onDisplayChanged();
        delete this._undoRedoActive;
        ret = true;
}
delete this._undoRedoActive;
}
return ret;
}, redo: function() {
var ret = false;
        if (!this._undoRedoActive) {
this._undoRedoActive = true;
        this.endEditing(true);
        var s = this._undoedSteps.pop();
        if (s && this._steps.length > 0) {
this.focus();
        this._changeToStep(this._steps[this._steps.length - 1], s);
        this._steps.push(s);
        this.onDisplayChanged();
        ret = true;
}
delete this._undoRedoActive;
}
return ret;
}, endEditing: function(_5e9) {
if (this._editTimer) {
this._editTimer = this._editTimer.remove();
}
if (this._inEditing) {
this._endEditing(_5e9);
        this._inEditing = false;
}
}, _getBookmark: function() {
var b = this.selection.getBookmark();
        var tmp = [];
        if (b && b.mark) {
var mark = b.mark;
        if (has("ie") < 9 || (has("ie") === 9 && has("quirks"))) {
var sel = _5d7.getSelection(this.window);
        if (!lang.isArray(mark)) {
if (sel) {
var _5ea;
        if (sel.rangeCount) {
_5ea = sel.getRangeAt(0);
}
if (_5ea) {
b.mark = _5ea.cloneRange();
} else {
b.mark = this.selection.getBookmark();
}
}
} else {
_5c7.forEach(b.mark, function(n) {
tmp.push(_5d7.getIndex(n, this.editNode).o);
}, this);
        b.mark = tmp;
}
}
try {
if (b.mark && b.mark.startContainer) {
tmp = _5d7.getIndex(b.mark.startContainer, this.editNode).o;
        b.mark = {startContainer: tmp, startOffset: b.mark.startOffset, endContainer: b.mark.endContainer === b.mark.startContainer ? tmp : _5d7.getIndex(b.mark.endContainer, this.editNode).o, endOffset: b.mark.endOffset};
}
} catch (e) {
b.mark = null;
}
}
return b;
}, _beginEditing: function() {
if (this._steps.length === 0) {
this._steps.push({"text": html.getChildrenHtml(this.editNode), "bookmark": this._getBookmark()});
}
}, _endEditing: function() {
var v = html.getChildrenHtml(this.editNode);
        this._undoedSteps = [];
        this._steps.push({text: v, bookmark: this._getBookmark()});
}, onKeyDown: function(e) {
if (!has("ie") && !this.iframe && e.keyCode == keys.TAB && !this.tabIndent) {
this._saveSelection();
}
if (!this.customUndo) {
this.inherited(arguments);
        return;
}
var k = e.keyCode;
        if (e.ctrlKey && !e.shiftKey && !e.altKey) {
if (k == 90 || k == 122) {
e.stopPropagation();
        e.preventDefault();
        this.undo();
        return;
} else {
if (k == 89 || k == 121) {
e.stopPropagation();
        e.preventDefault();
        this.redo();
        return;
}
}
}
this.inherited(arguments);
        switch (k) {
case keys.ENTER:
        case keys.BACKSPACE:
        case keys.DELETE:
        this.beginEditing();
        break;
        case 88:
        case 86:
        if (e.ctrlKey && !e.altKey && !e.metaKey) {
this.endEditing();
        if (e.keyCode == 88) {
this.beginEditing("cut");
} else {
this.beginEditing("paste");
}
this.defer("endEditing", 1);
        break;
}
default:
        if (!e.ctrlKey && !e.altKey && !e.metaKey && (e.keyCode < keys.F1 || e.keyCode > keys.F15)) {
this.beginEditing();
        break;
}
case keys.ALT:
        this.endEditing();
        break;
        case keys.UP_ARROW:
        case keys.DOWN_ARROW:
        case keys.LEFT_ARROW:
        case keys.RIGHT_ARROW:
        case keys.HOME:
        case keys.END:
        case keys.PAGE_UP:
        case keys.PAGE_DOWN:
        this.endEditing(true);
        break;
        case keys.CTRL:
        case keys.SHIFT:
        case keys.TAB:
        break;
}
}, _onBlur: function() {
this.inherited(arguments);
        this.endEditing(true);
}, _saveSelection: function() {
try {
this._savedSelection = this._getBookmark();
} catch (e) {
}
}, _restoreSelection: function() {
if (this._savedSelection) {
delete this._cursorToStart;
        if (this.selection.isCollapsed()) {
this._moveToBookmark(this._savedSelection);
}
delete this._savedSelection;
}
}, onClick: function() {
this.endEditing(true);
        this.inherited(arguments);
}, replaceValue: function(html) {
if (!this.customUndo) {
this.inherited(arguments);
} else {
if (this.isClosed) {
this.setValue(html);
} else {
this.beginEditing();
        if (!html) {
html = "&#160;";
}
this.setValue(html);
        this.endEditing();
}
}
}, _setDisabledAttr: function(_5eb) {
this.setValueDeferred.then(lang.hitch(this, function() {
if ((!this.disabled && _5eb) || (!this._buttonEnabledPlugins && _5eb)) {
_5c7.forEach(this._plugins, function(p) {
p.set("disabled", true);
});
} else {
if (this.disabled && !_5eb) {
_5c7.forEach(this._plugins, function(p) {
p.set("disabled", false);
});
}
}
}));
        this.inherited(arguments);
}, _setStateClass: function() {
try {
this.inherited(arguments);
        if (this.document && this.document.body) {
_5cd.set(this.document.body, "color", _5cd.get(this.iframe, "color"));
}
} catch (e) {
}
}});
        function _5ec(args) {
        return new _5d5({command: args.name});
        }
;
        function _5ed(args) {
        return new _5d5({buttonClass: _5d4, command: args.name});
        }
;
        lang.mixin(_5d5.registry, {"undo": _5ec, "redo": _5ec, "cut": _5ec, "copy": _5ec, "paste": _5ec, "insertOrderedList": _5ec, "insertUnorderedList": _5ec, "indent": _5ec, "outdent": _5ec, "justifyCenter": _5ec, "justifyFull": _5ec, "justifyLeft": _5ec, "justifyRight": _5ec, "delete": _5ec, "selectAll": _5ec, "removeFormat": _5ec, "unlink": _5ec, "insertHorizontalRule": _5ec, "bold": _5ed, "italic": _5ed, "underline": _5ed, "strikethrough": _5ed, "subscript": _5ed, "superscript": _5ed, "|": function() {
        return new _5d5({setEditor: function(_5ee) {
        this.editor = _5ee;
                this.button = new _5d2({ownerDocument: _5ee.ownerDocument});
        }});
        }});
        return _5da;
});
}, "dijit/Toolbar": function() {
define(["require", "dojo/_base/declare", "dojo/has", "dojo/keys", "dojo/ready", "./_Widget", "./_KeyNavContainer", "./_TemplatedMixin"], function(_5ef, _5f0, has, keys, _5f1, _5f2, _5f3, _5f4) {
if (has("dijit-legacy-requires")) {
_5f1(0, function() {
var _5f5 = ["dijit/ToolbarSeparator"];
        _5ef(_5f5);
});
}
return _5f0("dijit.Toolbar", [_5f2, _5f4, _5f3], {templateString: "<div class=\"dijit\" role=\"toolbar\" tabIndex=\"${tabIndex}\" data-dojo-attach-point=\"containerNode\">" + "</div>", baseClass: "dijitToolbar", _onLeftArrow: function() {
this.focusPrev();
}, _onRightArrow: function() {
this.focusNext();
}});
});
}, "dijit/_KeyNavContainer": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-attr", "dojo/_base/kernel", "dojo/keys", "dojo/_base/lang", "./registry", "./_Container", "./_FocusMixin", "./_KeyNavMixin"], function(_5f6, _5f7, _5f8, _5f9, keys, lang, _5fa, _5fb, _5fc, _5fd) {
return _5f7("dijit._KeyNavContainer", [_5fc, _5fd, _5fb], {connectKeyNavHandlers: function(_5fe, _5ff) {
var _600 = (this._keyNavCodes = {});
        var prev = lang.hitch(this, "focusPrev");
        var next = lang.hitch(this, "focusNext");
        _5f6.forEach(_5fe, function(code) {
        _600[code] = prev;
        });
        _5f6.forEach(_5ff, function(code) {
        _600[code] = next;
        });
        _600[keys.HOME] = lang.hitch(this, "focusFirstChild");
        _600[keys.END] = lang.hitch(this, "focusLastChild");
}, startupKeyNavChildren: function() {
_5f9.deprecated("startupKeyNavChildren() call no longer needed", "", "2.0");
}, startup: function() {
this.inherited(arguments);
        _5f6.forEach(this.getChildren(), lang.hitch(this, "_startupChild"));
}, addChild: function(_601, _602) {
this.inherited(arguments);
        this._startupChild(_601);
}, _startupChild: function(_603) {
_603.set("tabIndex", "-1");
}, _getFirst: function() {
var _604 = this.getChildren();
        return _604.length ? _604[0] : null;
}, _getLast: function() {
var _605 = this.getChildren();
        return _605.length ? _605[_605.length - 1] : null;
}, focusNext: function() {
this.focusChild(this._getNextFocusableChild(this.focusedChild, 1));
}, focusPrev: function() {
this.focusChild(this._getNextFocusableChild(this.focusedChild, - 1), true);
}, childSelector: function(node) {
var node = _5fa.byNode(node);
        return node && node.getParent() == this;
}});
});
}, "dijit/_KeyNavMixin": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-attr", "dojo/keys", "dojo/_base/lang", "dojo/on", "dijit/registry", "dijit/_FocusMixin"], function(_606, _607, _608, keys, lang, on, _609, _60a) {
return _607("dijit._KeyNavMixin", _60a, {tabIndex: "0", childSelector: null, postCreate: function() {
this.inherited(arguments);
        _608.set(this.domNode, "tabIndex", this.tabIndex);
        if (!this._keyNavCodes) {
var _60b = this._keyNavCodes = {};
        _60b[keys.HOME] = lang.hitch(this, "focusFirstChild");
        _60b[keys.END] = lang.hitch(this, "focusLastChild");
        _60b[this.isLeftToRight() ? keys.LEFT_ARROW : keys.RIGHT_ARROW] = lang.hitch(this, "_onLeftArrow");
        _60b[this.isLeftToRight() ? keys.RIGHT_ARROW : keys.LEFT_ARROW] = lang.hitch(this, "_onRightArrow");
        _60b[keys.UP_ARROW] = lang.hitch(this, "_onUpArrow");
        _60b[keys.DOWN_ARROW] = lang.hitch(this, "_onDownArrow");
}
var self = this, _60c = typeof this.childSelector == "string" ? this.childSelector : lang.hitch(this, "childSelector");
        this.own(on(this.domNode, "keypress", lang.hitch(this, "_onContainerKeypress")), on(this.domNode, "keydown", lang.hitch(this, "_onContainerKeydown")), on(this.domNode, "focus", lang.hitch(this, "_onContainerFocus")), on(this.containerNode, on.selector(_60c, "focusin"), function(evt) {
        self._onChildFocus(_609.getEnclosingWidget(this), evt);
        }));
}, _onLeftArrow: function() {
}, _onRightArrow: function() {
}, _onUpArrow: function() {
}, _onDownArrow: function() {
}, focus: function() {
this.focusFirstChild();
}, _getFirstFocusableChild: function() {
return this._getNextFocusableChild(null, 1);
}, _getLastFocusableChild: function() {
return this._getNextFocusableChild(null, - 1);
}, focusFirstChild: function() {
this.focusChild(this._getFirstFocusableChild());
}, focusLastChild: function() {
this.focusChild(this._getLastFocusableChild());
}, focusChild: function(_60d, last) {
if (!_60d) {
return;
}
if (this.focusedChild && _60d !== this.focusedChild) {
this._onChildBlur(this.focusedChild);
}
_60d.set("tabIndex", this.tabIndex);
        _60d.focus(last ? "end" : "start");
}, _onContainerFocus: function(evt) {
if (evt.target !== this.domNode || this.focusedChild) {
return;
}
this.focus();
}, _onFocus: function() {
_608.set(this.domNode, "tabIndex", "-1");
        this.inherited(arguments);
}, _onBlur: function(evt) {
_608.set(this.domNode, "tabIndex", this.tabIndex);
        if (this.focusedChild) {
this.focusedChild.set("tabIndex", "-1");
        this.lastFocusedChild = this.focusedChild;
        this._set("focusedChild", null);
}
this.inherited(arguments);
}, _onChildFocus: function(_60e) {
if (_60e && _60e != this.focusedChild) {
if (this.focusedChild && !this.focusedChild._destroyed) {
this.focusedChild.set("tabIndex", "-1");
}
_60e.set("tabIndex", this.tabIndex);
        this.lastFocused = _60e;
        this._set("focusedChild", _60e);
}
}, _searchString: "", multiCharSearchDuration: 1000, onKeyboardSearch: function(item, evt, _60f, _610) {
if (item) {
this.focusChild(item);
}
}, _keyboardSearchCompare: function(item, _611) {
var _612 = item.domNode, text = item.label || (_612.focusNode ? _612.focusNode.label : "") || _612.innerText || _612.textContent || "", _613 = text.replace(/^\s+/, "").substr(0, _611.length).toLowerCase();
        return (!!_611.length && _613 == _611) ? - 1 : 0;
}, _onContainerKeydown: function(evt) {
var func = this._keyNavCodes[evt.keyCode];
        if (func) {
func(evt, this.focusedChild);
        evt.stopPropagation();
        evt.preventDefault();
        this._searchString = "";
} else {
if (evt.keyCode == keys.SPACE && this._searchTimer && !(evt.ctrlKey || evt.altKey || evt.metaKey)) {
evt.stopImmediatePropagation();
        evt.preventDefault();
        this._keyboardSearch(evt, " ");
}
}
}, _onContainerKeypress: function(evt) {
if (evt.charCode < keys.SPACE || evt.ctrlKey || evt.altKey || evt.metaKey || (evt.charCode == keys.SPACE && this._searchTimer)) {
return;
}
evt.preventDefault();
        evt.stopPropagation();
        this._keyboardSearch(evt, String.fromCharCode(evt.charCode).toLowerCase());
}, _keyboardSearch: function(evt, _614) {
var _615 = null, _616, _617 = 0, _618 = lang.hitch(this, function() {
if (this._searchTimer) {
this._searchTimer.remove();
}
this._searchString += _614;
        var _619 = /^(.)\1*$/.test(this._searchString);
        var _61a = _619 ? 1 : this._searchString.length;
        _616 = this._searchString.substr(0, _61a);
        this._searchTimer = this.defer(function() {
        this._searchTimer = null;
                this._searchString = "";
        }, this.multiCharSearchDuration);
        var _61b = this.focusedChild || null;
        if (_61a == 1 || !_61b) {
_61b = this._getNextFocusableChild(_61b, 1);
        if (!_61b) {
return;
}
}
var stop = _61b;
        do {
        var rc = this._keyboardSearchCompare(_61b, _616);
                if (!!rc && _617++ == 0) {
        _615 = _61b;
        }
        if (rc == - 1) {
        _617 = - 1;
                break;
        }
        _61b = this._getNextFocusableChild(_61b, 1);
        } while (_61b != stop);
});
        _618();
        this.onKeyboardSearch(_615, evt, _616, _617);
}, _onChildBlur: function() {
}, _getNextFocusableChild: function(_61c, dir) {
var _61d = _61c;
        do {
        if (!_61c) {
        _61c = this[dir > 0 ? "_getFirst" : "_getLast"]();
                if (!_61c) {
        break;
        }
        } else {
        _61c = this._getNext(_61c, dir);
        }
        if (_61c != null && _61c != _61d && _61c.isFocusable()) {
        return _61c;
        }
        } while (_61c != _61d);
        return null;
}, _getFirst: function() {
return null;
}, _getLast: function() {
return null;
}, _getNext: function(_61e, dir) {
if (_61e) {
_61e = _61e.domNode;
        while (_61e) {
_61e = _61e[dir < 0 ? "previousSibling" : "nextSibling"];
        if (_61e && "getAttribute" in _61e) {
var w = _609.byNode(_61e);
        if (w) {
return w;
}
}
}
}
return null;
}});
});
}, "dijit/ToolbarSeparator": function() {
define(["dojo/_base/declare", "dojo/dom", "./_Widget", "./_TemplatedMixin"], function(_61f, dom, _620, _621) {
return _61f("dijit.ToolbarSeparator", [_620, _621], {templateString: "<div class=\"dijitToolbarSeparator dijitInline\" role=\"presentation\"></div>", buildRendering: function() {
this.inherited(arguments);
        dom.setSelectable(this.domNode, false);
}, isFocusable: function() {
return false;
}});
});
}, "dijit/form/ToggleButton": function() {
define(["dojo/_base/declare", "dojo/_base/kernel", "./Button", "./_ToggleButtonMixin"], function(_622, _623, _624, _625) {
return _622("dijit.form.ToggleButton", [_624, _625], {baseClass: "dijitToggleButton", setChecked: function(_626) {
_623.deprecated("setChecked(" + _626 + ") is deprecated. Use set('checked'," + _626 + ") instead.", "", "2.0");
        this.set("checked", _626);
}});
});
}, "dijit/form/Button": function() {
define(["require", "dojo/_base/declare", "dojo/dom-class", "dojo/has", "dojo/_base/kernel", "dojo/_base/lang", "dojo/ready", "./_FormWidget", "./_ButtonMixin", "dojo/text!./templates/Button.html"], function(_627, _628, _629, has, _62a, lang, _62b, _62c, _62d, _62e) {
if (has("dijit-legacy-requires")) {
_62b(0, function() {
var _62f = ["dijit/form/DropDownButton", "dijit/form/ComboButton", "dijit/form/ToggleButton"];
        _627(_62f);
});
}
var _630 = _628("dijit.form.Button" + (has("dojo-bidi") ? "_NoBidi" : ""), [_62c, _62d], {showLabel: true, iconClass: "dijitNoIcon", _setIconClassAttr: {node: "iconNode", type: "class"}, baseClass: "dijitButton", templateString: _62e, _setValueAttr: "valueNode", _setNameAttr: function(name) {
if (this.valueNode) {
this.valueNode.setAttribute("name", name);
}
}, _fillContent: function(_631) {
if (_631 && (!this.params || !("label" in this.params))) {
var _632 = lang.trim(_631.innerHTML);
        if (_632) {
this.label = _632;
}
}
}, _setShowLabelAttr: function(val) {
if (this.containerNode) {
_629.toggle(this.containerNode, "dijitDisplayNone", !val);
}
this._set("showLabel", val);
}, setLabel: function(_633) {
_62a.deprecated("dijit.form.Button.setLabel() is deprecated.  Use set('label', ...) instead.", "", "2.0");
        this.set("label", _633);
}, _setLabelAttr: function(_634) {
this.inherited(arguments);
        if (!this.showLabel && !("title" in this.params)) {
this.titleNode.title = lang.trim(this.containerNode.innerText || this.containerNode.textContent || "");
}
}});
        if (has("dojo-bidi")) {
_630 = _628("dijit.form.Button", _630, {_setLabelAttr: function(_635) {
this.inherited(arguments);
        if (this.titleNode.title) {
this.applyTextDir(this.titleNode, this.titleNode.title);
}
}, _setTextDirAttr: function(_636) {
if (this._created && this.textDir != _636) {
this._set("textDir", _636);
        this._setLabelAttr(this.label);
}
}});
}
return _630;
});
}, "dijit/form/_ButtonMixin": function() {
define(["dojo/_base/declare", "dojo/dom", "dojo/has", "../registry"], function(_637, dom, has, _638) {
var _639 = _637("dijit.form._ButtonMixin" + (has("dojo-bidi") ? "_NoBidi" : ""), null, {label: "", type: "button", __onClick: function(e) {
e.stopPropagation();
        e.preventDefault();
        if (!this.disabled) {
this.valueNode.click(e);
}
return false;
}, _onClick: function(e) {
if (this.disabled) {
e.stopPropagation();
        e.preventDefault();
        return false;
}
if (this.onClick(e) === false) {
e.preventDefault();
}
cancelled = e.defaultPrevented;
        if (!cancelled && this.type == "submit" && !(this.valueNode || this.focusNode).form) {
for (var node = this.domNode; node.parentNode; node = node.parentNode) {
var _63a = _638.byNode(node);
        if (_63a && typeof _63a._onSubmit == "function") {
_63a._onSubmit(e);
        e.preventDefault();
        cancelled = true;
        break;
}
}
}
return !cancelled;
}, postCreate: function() {
this.inherited(arguments);
        dom.setSelectable(this.focusNode, false);
}, onClick: function() {
return true;
}, _setLabelAttr: function(_63b) {
this._set("label", _63b);
        var _63c = this.containerNode || this.focusNode;
        _63c.innerHTML = _63b;
}});
        if (has("dojo-bidi")) {
_639 = _637("dijit.form._ButtonMixin", _639, {_setLabelAttr: function() {
this.inherited(arguments);
        var _63d = this.containerNode || this.focusNode;
        this.applyTextDir(_63d);
}});
}
return _639;
});
}, "dijit/form/_ToggleButtonMixin": function() {
define(["dojo/_base/declare", "dojo/dom-attr"], function(_63e, _63f) {
return _63e("dijit.form._ToggleButtonMixin", null, {checked: false, _aria_attr: "aria-pressed", _onClick: function(evt) {
var _640 = this.checked;
        this._set("checked", !_640);
        var ret = this.inherited(arguments);
        this.set("checked", ret ? this.checked : _640);
        return ret;
}, _setCheckedAttr: function(_641, _642) {
this._set("checked", _641);
        var node = this.focusNode || this.domNode;
        if (this._created) {
if (_63f.get(node, "checked") != !!_641) {
_63f.set(node, "checked", !!_641);
}
}
node.setAttribute(this._aria_attr, String(_641));
        this._handleOnChange(_641, _642);
}, postCreate: function() {
this.inherited(arguments);
        var node = this.focusNode || this.domNode;
        if (this.checked) {
node.setAttribute("checked", "checked");
}
}, reset: function() {
this._hasBeenBlurred = false;
        this.set("checked", this.params.checked || false);
}});
});
}, "dijit/_editor/_Plugin": function() {
define(["dojo/_base/connect", "dojo/_base/declare", "dojo/_base/lang", "../Destroyable", "../form/Button"], function(_643, _644, lang, _645, _646) {
var _647 = _644("dijit._editor._Plugin", _645, {constructor: function(args) {
this.params = args || {};
        lang.mixin(this, this.params);
        this._attrPairNames = {};
}, editor: null, iconClassPrefix: "dijitEditorIcon", button: null, command: "", useDefaultCommand: true, buttonClass: _646, disabled: false, getLabel: function(key) {
return this.editor.commands[key];
}, _initButton: function() {
if (this.command.length) {
var _648 = this.getLabel(this.command), _649 = this.editor, _64a = this.iconClassPrefix + " " + this.iconClassPrefix + this.command.charAt(0).toUpperCase() + this.command.substr(1);
        if (!this.button) {
var _64b = lang.mixin({label: _648, ownerDocument: _649.ownerDocument, dir: _649.dir, lang: _649.lang, showLabel: false, iconClass: _64a, dropDown: this.dropDown, tabIndex: "-1"}, this.params || {});
        this.button = new this.buttonClass(_64b);
}
}
if (this.get("disabled") && this.button) {
this.button.set("disabled", this.get("disabled"));
}
}, destroy: function() {
if (this.dropDown) {
this.dropDown.destroyRecursive();
}
this.inherited(arguments);
}, connect: function(o, f, tf) {
this.own(_643.connect(o, f, this, tf));
}, updateState: function() {
var e = this.editor, c = this.command, _64c, _64d;
        if (!e || !e.isLoaded || !c.length) {
return;
}
var _64e = this.get("disabled");
        if (this.button) {
try {
_64d = !_64e && e.queryCommandEnabled(c);
        if (this.enabled !== _64d) {
this.enabled = _64d;
        this.button.set("disabled", !_64d);
}
if (_64d) {
if (typeof this.button.checked == "boolean") {
_64c = e.queryCommandState(c);
        if (this.checked !== _64c) {
this.checked = _64c;
        this.button.set("checked", e.queryCommandState(c));
}
}
}
} catch (e) {
}
}
}, setEditor: function(_64f) {
this.editor = _64f;
        this._initButton();
        if (this.button && this.useDefaultCommand) {
if (this.editor.queryCommandAvailable(this.command)) {
this.own(this.button.on("click", lang.hitch(this.editor, "execCommand", this.command, this.commandArg)));
} else {
this.button.domNode.style.display = "none";
}
}
this.own(this.editor.on("NormalizedDisplayChanged", lang.hitch(this, "updateState")));
}, setToolbar: function(_650) {
if (this.button) {
_650.addChild(this.button);
}
}, set: function(name, _651) {
if (typeof name === "object") {
for (var x in name) {
this.set(x, name[x]);
}
return this;
}
var _652 = this._getAttrNames(name);
        if (this[_652.s]) {
var _653 = this[_652.s].apply(this, Array.prototype.slice.call(arguments, 1));
} else {
this._set(name, _651);
}
return _653 || this;
}, get: function(name) {
var _654 = this._getAttrNames(name);
        return this[_654.g] ? this[_654.g]() : this[name];
}, _setDisabledAttr: function(_655) {
this._set("disabled", _655);
        this.updateState();
}, _getAttrNames: function(name) {
var apn = this._attrPairNames;
        if (apn[name]) {
return apn[name];
}
var uc = name.charAt(0).toUpperCase() + name.substr(1);
        return (apn[name] = {s: "_set" + uc + "Attr", g: "_get" + uc + "Attr"});
}, _set: function(name, _656) {
this[name] = _656;
}});
        _647.registry = {};
        return _647;
});
}, "dijit/_editor/plugins/EnterKeyHandling": function() {
define(["dojo/_base/declare", "dojo/dom-construct", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/sniff", "dojo/_base/window", "dojo/window", "../_Plugin", "../RichText", "../range"], function(_657, _658, keys, lang, on, has, win, _659, _65a, _65b, _65c) {
return _657("dijit._editor.plugins.EnterKeyHandling", _65a, {blockNodeForEnter: "BR", constructor: function(args) {
if (args) {
if ("blockNodeForEnter" in args) {
args.blockNodeForEnter = args.blockNodeForEnter.toUpperCase();
}
lang.mixin(this, args);
}
}, setEditor: function(_65d) {
if (this.editor === _65d) {
return;
}
this.editor = _65d;
        if (this.blockNodeForEnter == "BR") {
this.editor.customUndo = true;
        _65d.onLoadDeferred.then(lang.hitch(this, function(d) {
        this.own(on(_65d.document, "keydown", lang.hitch(this, function(e) {
        if (e.keyCode == keys.ENTER) {
        var ne = lang.mixin({}, e);
                ne.shiftKey = true;
                if (!this.handleEnterKey(ne)) {
        e.stopPropagation();
                e.preventDefault();
        }
        }
        })));
                if (has("ie") >= 9) {
        this.own(on(_65d.document, "paste", lang.hitch(this, function(e) {
        setTimeout(lang.hitch(this, function() {
        var r = this.editor.document.selection.createRange();
                r.move("character", - 1);
                r.select();
                r.move("character", 1);
                r.select();
        }), 0);
        })));
        }
        return d;
        }));
} else {
if (this.blockNodeForEnter) {
var h = lang.hitch(this, "handleEnterKey");
        _65d.addKeyHandler(13, 0, 0, h);
        _65d.addKeyHandler(13, 0, 1, h);
        this.own(this.editor.on("KeyPressed", lang.hitch(this, "onKeyPressed")));
}
}
}, onKeyPressed: function() {
if (this._checkListLater) {
if (this.editor.selection.isCollapsed()) {
var _65e = this.editor.selection.getAncestorElement("LI");
        if (!_65e) {
_65b.prototype.execCommand.call(this.editor, "formatblock", this.blockNodeForEnter);
        var _65f = this.editor.selection.getAncestorElement(this.blockNodeForEnter);
        if (_65f) {
_65f.innerHTML = this.bogusHtmlContent;
        if (has("ie") <= 9) {
var r = this.editor.document.selection.createRange();
        r.move("character", - 1);
        r.select();
}
} else {
console.error("onKeyPressed: Cannot find the new block node");
}
} else {
if (has("mozilla")) {
if (_65e.parentNode.parentNode.nodeName == "LI") {
_65e = _65e.parentNode.parentNode;
}
}
var fc = _65e.firstChild;
        if (fc && fc.nodeType == 1 && (fc.nodeName == "UL" || fc.nodeName == "OL")) {
_65e.insertBefore(fc.ownerDocument.createTextNode(" "), fc);
        var _660 = _65c.create(this.editor.window);
        _660.setStart(_65e.firstChild, 0);
        var _661 = _65c.getSelection(this.editor.window, true);
        _661.removeAllRanges();
        _661.addRange(_660);
}
}
}
this._checkListLater = false;
}
if (this._pressedEnterInBlock) {
if (this._pressedEnterInBlock.previousSibling) {
this.removeTrailingBr(this._pressedEnterInBlock.previousSibling);
}
delete this._pressedEnterInBlock;
}
}, bogusHtmlContent: "&#160;", blockNodes: /^(?:P|H1|H2|H3|H4|H5|H6|LI)$/, handleEnterKey: function(e) {
var _662, _663, _664, _665, _666, _667, doc = this.editor.document, br, rs, txt;
        if (e.shiftKey) {
var _668 = this.editor.selection.getParentElement();
        var _669 = _65c.getAncestor(_668, this.blockNodes);
        if (_669) {
if (_669.tagName == "LI") {
return true;
}
_662 = _65c.getSelection(this.editor.window);
        _663 = _662.getRangeAt(0);
        if (!_663.collapsed) {
_663.deleteContents();
        _662 = _65c.getSelection(this.editor.window);
        _663 = _662.getRangeAt(0);
}
if (_65c.atBeginningOfContainer(_669, _663.startContainer, _663.startOffset)) {
br = doc.createElement("br");
        _664 = _65c.create(this.editor.window);
        _669.insertBefore(br, _669.firstChild);
        _664.setStartAfter(br);
        _662.removeAllRanges();
        _662.addRange(_664);
} else {
if (_65c.atEndOfContainer(_669, _663.startContainer, _663.startOffset)) {
_664 = _65c.create(this.editor.window);
        br = doc.createElement("br");
        _669.appendChild(br);
        _669.appendChild(doc.createTextNode(" "));
        _664.setStart(_669.lastChild, 0);
        _662.removeAllRanges();
        _662.addRange(_664);
} else {
rs = _663.startContainer;
        if (rs && rs.nodeType == 3) {
txt = rs.nodeValue;
        _665 = doc.createTextNode(txt.substring(0, _663.startOffset));
        _666 = doc.createTextNode(txt.substring(_663.startOffset));
        _667 = doc.createElement("br");
        if (_666.nodeValue == "" && has("webkit")) {
_666 = doc.createTextNode(" ");
}
_658.place(_665, rs, "after");
        _658.place(_667, _665, "after");
        _658.place(_666, _667, "after");
        _658.destroy(rs);
        _664 = _65c.create(this.editor.window);
        _664.setStart(_666, 0);
        _662.removeAllRanges();
        _662.addRange(_664);
        return false;
}
return true;
}
}
} else {
_662 = _65c.getSelection(this.editor.window);
        if (_662.rangeCount) {
_663 = _662.getRangeAt(0);
        if (_663 && _663.startContainer) {
if (!_663.collapsed) {
_663.deleteContents();
        _662 = _65c.getSelection(this.editor.window);
        _663 = _662.getRangeAt(0);
}
rs = _663.startContainer;
        if (rs && rs.nodeType == 3) {
var _66a = false;
        var _66b = _663.startOffset;
        if (rs.length < _66b) {
ret = this._adjustNodeAndOffset(rs, _66b);
        rs = ret.node;
        _66b = ret.offset;
}
txt = rs.nodeValue;
        _665 = doc.createTextNode(txt.substring(0, _66b));
        _666 = doc.createTextNode(txt.substring(_66b));
        _667 = doc.createElement("br");
        if (!_666.length) {
_666 = doc.createTextNode(" ");
        _66a = true;
}
if (_665.length) {
_658.place(_665, rs, "after");
} else {
_665 = rs;
}
_658.place(_667, _665, "after");
        _658.place(_666, _667, "after");
        _658.destroy(rs);
        _664 = _65c.create(this.editor.window);
        _664.setStart(_666, 0);
        _664.setEnd(_666, _666.length);
        _662.removeAllRanges();
        _662.addRange(_664);
        if (_66a && !has("webkit")) {
this.editor.selection.remove();
} else {
this.editor.selection.collapse(true);
}
} else {
var _66c;
        if (_663.startOffset >= 0) {
_66c = rs.childNodes[_663.startOffset];
}
var _667 = doc.createElement("br");
        var _666 = doc.createTextNode(" ");
        if (!_66c) {
rs.appendChild(_667);
        rs.appendChild(_666);
} else {
_658.place(_667, _66c, "before");
        _658.place(_666, _667, "after");
}
_664 = _65c.create(this.editor.window);
        _664.setStart(_666, 0);
        _664.setEnd(_666, _666.length);
        _662.removeAllRanges();
        _662.addRange(_664);
        this.editor.selection.collapse(true);
}
}
} else {
_65b.prototype.execCommand.call(this.editor, "inserthtml", "<br>");
}
}
return false;
}
var _66d = true;
        _662 = _65c.getSelection(this.editor.window);
        _663 = _662.getRangeAt(0);
        if (!_663.collapsed) {
_663.deleteContents();
        _662 = _65c.getSelection(this.editor.window);
        _663 = _662.getRangeAt(0);
}
var _66e = _65c.getBlockAncestor(_663.endContainer, null, this.editor.editNode);
        var _66f = _66e.blockNode;
        if ((this._checkListLater = (_66f && (_66f.nodeName == "LI" || _66f.parentNode.nodeName == "LI")))) {
if (has("mozilla")) {
this._pressedEnterInBlock = _66f;
}
if (/^(\s|&nbsp;|&#160;|\xA0|<span\b[^>]*\bclass=['"]Apple-style-span['"][^>]*>(\s|&nbsp;|&#160;|\xA0)<\/span>)?(<br>)?$/.test(_66f.innerHTML)) {
_66f.innerHTML = "";
        if (has("webkit")) {
_664 = _65c.create(this.editor.window);
        _664.setStart(_66f, 0);
        _662.removeAllRanges();
        _662.addRange(_664);
}
this._checkListLater = false;
}
return true;
}
if (!_66e.blockNode || _66e.blockNode === this.editor.editNode) {
try {
_65b.prototype.execCommand.call(this.editor, "formatblock", this.blockNodeForEnter);
} catch (e2) {
}
_66e = {blockNode: this.editor.selection.getAncestorElement(this.blockNodeForEnter), blockContainer: this.editor.editNode};
        if (_66e.blockNode) {
if (_66e.blockNode != this.editor.editNode && (!(_66e.blockNode.textContent || _66e.blockNode.innerHTML).replace(/^\s+|\s+$/g, "").length)) {
this.removeTrailingBr(_66e.blockNode);
        return false;
}
} else {
_66e.blockNode = this.editor.editNode;
}
_662 = _65c.getSelection(this.editor.window);
        _663 = _662.getRangeAt(0);
}
var _670 = doc.createElement(this.blockNodeForEnter);
        _670.innerHTML = this.bogusHtmlContent;
        this.removeTrailingBr(_66e.blockNode);
        var _671 = _663.endOffset;
        var node = _663.endContainer;
        if (node.length < _671) {
var ret = this._adjustNodeAndOffset(node, _671);
        node = ret.node;
        _671 = ret.offset;
}
if (_65c.atEndOfContainer(_66e.blockNode, node, _671)) {
if (_66e.blockNode === _66e.blockContainer) {
_66e.blockNode.appendChild(_670);
} else {
_658.place(_670, _66e.blockNode, "after");
}
_66d = false;
        _664 = _65c.create(this.editor.window);
        _664.setStart(_670, 0);
        _662.removeAllRanges();
        _662.addRange(_664);
        if (this.editor.height) {
_659.scrollIntoView(_670);
}
} else {
if (_65c.atBeginningOfContainer(_66e.blockNode, _663.startContainer, _663.startOffset)) {
_658.place(_670, _66e.blockNode, _66e.blockNode === _66e.blockContainer ? "first" : "before");
        if (_670.nextSibling && this.editor.height) {
_664 = _65c.create(this.editor.window);
        _664.setStart(_670.nextSibling, 0);
        _662.removeAllRanges();
        _662.addRange(_664);
        _659.scrollIntoView(_670.nextSibling);
}
_66d = false;
} else {
if (_66e.blockNode === _66e.blockContainer) {
_66e.blockNode.appendChild(_670);
} else {
_658.place(_670, _66e.blockNode, "after");
}
_66d = false;
        if (_66e.blockNode.style) {
if (_670.style) {
if (_66e.blockNode.style.cssText) {
_670.style.cssText = _66e.blockNode.style.cssText;
}
}
}
rs = _663.startContainer;
        var _672;
        if (rs && rs.nodeType == 3) {
var _673, _674;
        _671 = _663.endOffset;
        if (rs.length < _671) {
ret = this._adjustNodeAndOffset(rs, _671);
        rs = ret.node;
        _671 = ret.offset;
}
txt = rs.nodeValue;
        _665 = doc.createTextNode(txt.substring(0, _671));
        _666 = doc.createTextNode(txt.substring(_671, txt.length));
        _658.place(_665, rs, "before");
        _658.place(_666, rs, "after");
        _658.destroy(rs);
        var _675 = _665.parentNode;
        while (_675 !== _66e.blockNode) {
var tg = _675.tagName;
        var _676 = doc.createElement(tg);
        if (_675.style) {
if (_676.style) {
if (_675.style.cssText) {
_676.style.cssText = _675.style.cssText;
}
}
}
if (_675.tagName === "FONT") {
if (_675.color) {
_676.color = _675.color;
}
if (_675.face) {
_676.face = _675.face;
}
if (_675.size) {
_676.size = _675.size;
}
}
_673 = _666;
        while (_673) {
_674 = _673.nextSibling;
        _676.appendChild(_673);
        _673 = _674;
}
_658.place(_676, _675, "after");
        _665 = _675;
        _666 = _676;
        _675 = _675.parentNode;
}
_673 = _666;
        if (_673.nodeType == 1 || (_673.nodeType == 3 && _673.nodeValue)) {
_670.innerHTML = "";
}
_672 = _673;
        while (_673) {
_674 = _673.nextSibling;
        _670.appendChild(_673);
        _673 = _674;
}
}
_664 = _65c.create(this.editor.window);
        var _677;
        var _678 = _672;
        if (this.blockNodeForEnter !== "BR") {
while (_678) {
_677 = _678;
        _674 = _678.firstChild;
        _678 = _674;
}
if (_677 && _677.parentNode) {
_670 = _677.parentNode;
        _664.setStart(_670, 0);
        _662.removeAllRanges();
        _662.addRange(_664);
        if (this.editor.height) {
_659.scrollIntoView(_670);
}
if (has("mozilla")) {
this._pressedEnterInBlock = _66e.blockNode;
}
} else {
_66d = true;
}
} else {
_664.setStart(_670, 0);
        _662.removeAllRanges();
        _662.addRange(_664);
        if (this.editor.height) {
_659.scrollIntoView(_670);
}
if (has("mozilla")) {
this._pressedEnterInBlock = _66e.blockNode;
}
}
}
}
return _66d;
}, _adjustNodeAndOffset: function(node, _679) {
while (node.length < _679 && node.nextSibling && node.nextSibling.nodeType == 3) {
_679 = _679 - node.length;
        node = node.nextSibling;
}
return {"node": node, "offset": _679};
}, removeTrailingBr: function(_67a) {
var para = /P|DIV|LI/i.test(_67a.tagName) ? _67a : this.editor.selection.getParentOfType(_67a, ["P", "DIV", "LI"]);
        if (!para) {
return;
}
if (para.lastChild) {
if ((para.childNodes.length > 1 && para.lastChild.nodeType == 3 && /^[\s\xAD]*$/.test(para.lastChild.nodeValue)) || para.lastChild.tagName == "BR") {
_658.destroy(para.lastChild);
}
}
if (!para.childNodes.length) {
para.innerHTML = this.bogusHtmlContent;
}
}});
});
}, "dijit/_editor/RichText": function() {
define(["dojo/_base/array", "dojo/_base/config", "dojo/_base/declare", "dojo/_base/Deferred", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/kernel", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/query", "dojo/domReady", "dojo/sniff", "dojo/topic", "dojo/_base/unload", "dojo/_base/url", "dojo/window", "../_Widget", "../_CssStateMixin", "../selection", "./range", "./html", "../focus", "../main"], function(_67b, _67c, _67d, _67e, dom, _67f, _680, _681, _682, _683, _684, keys, lang, on, _685, _686, has, _687, _688, _689, _68a, _68b, _68c, _68d, _68e, _68f, _690, _691) {
var _692 = _67d("dijit._editor.RichText", [_68b, _68c], {constructor: function(_693) {
this.contentPreFilters = [];
        this.contentPostFilters = [];
        this.contentDomPreFilters = [];
        this.contentDomPostFilters = [];
        this.editingAreaStyleSheets = [];
        this.events = [].concat(this.events);
        this._keyHandlers = {};
        if (_693 && lang.isString(_693.value)) {
this.value = _693.value;
}
this.onLoadDeferred = new _67e();
}, baseClass: "dijitEditor", inheritWidth: false, focusOnLoad: false, name: "", styleSheets: "", height: "300px", minHeight: "1em", isClosed: true, isLoaded: false, _SEPARATOR: "@@**%%__RICHTEXTBOUNDRY__%%**@@", _NAME_CONTENT_SEP: "@@**%%:%%**@@", onLoadDeferred: null, isTabIndent: false, disableSpellCheck: false, postCreate: function() {
if ("textarea" === this.domNode.tagName.toLowerCase()) {
console.warn("RichText should not be used with the TEXTAREA tag.  See dijit._editor.RichText docs.");
}
this.contentPreFilters = [lang.hitch(this, "_preFixUrlAttributes")].concat(this.contentPreFilters);
        if (has("mozilla")) {
this.contentPreFilters = [this._normalizeFontStyle].concat(this.contentPreFilters);
        this.contentPostFilters = [this._removeMozBogus].concat(this.contentPostFilters);
}
if (has("webkit")) {
this.contentPreFilters = [this._removeWebkitBogus].concat(this.contentPreFilters);
        this.contentPostFilters = [this._removeWebkitBogus].concat(this.contentPostFilters);
}
if (has("ie")) {
this.contentPostFilters = [this._normalizeFontStyle].concat(this.contentPostFilters);
        this.contentDomPostFilters = [lang.hitch(this, this._stripBreakerNodes)].concat(this.contentDomPostFilters);
}
this.inherited(arguments);
        _687.publish(_691._scopeName + "._editor.RichText::init", this);
}, startup: function() {
this.inherited(arguments);
        this.open();
        this.setupDefaultShortcuts();
}, setupDefaultShortcuts: function() {
var exec = lang.hitch(this, function(cmd, arg) {
return function() {
return !this.execCommand(cmd, arg);
};
});
        var _694 = {b: exec("bold"), i: exec("italic"), u: exec("underline"), a: exec("selectall"), s: function() {
        this.save(true);
        }, m: function() {
        this.isTabIndent = !this.isTabIndent;
        }, "1": exec("formatblock", "h1"), "2": exec("formatblock", "h2"), "3": exec("formatblock", "h3"), "4": exec("formatblock", "h4"), "\\": exec("insertunorderedlist")};
        if (!has("ie")) {
_694.Z = exec("redo");
}
var key;
        for (key in _694) {
this.addKeyHandler(key, true, false, _694[key]);
}
}, events: ["onKeyDown", "onKeyUp"], captureEvents: [], _editorCommandsLocalized: false, _localizeEditorCommands: function() {
if (_692._editorCommandsLocalized) {
this._local2NativeFormatNames = _692._local2NativeFormatNames;
        this._native2LocalFormatNames = _692._native2LocalFormatNames;
        return;
}
_692._editorCommandsLocalized = true;
        _692._local2NativeFormatNames = {};
        _692._native2LocalFormatNames = {};
        this._local2NativeFormatNames = _692._local2NativeFormatNames;
        this._native2LocalFormatNames = _692._native2LocalFormatNames;
        var _695 = ["div", "p", "pre", "h1", "h2", "h3", "h4", "h5", "h6", "ol", "ul", "address"];
        var _696 = "", _697, i = 0;
        while ((_697 = _695[i++])) {
if (_697.charAt(1) !== "l") {
_696 += "<" + _697 + "><span>content</span></" + _697 + "><br/>";
} else {
_696 += "<" + _697 + "><li>content</li></" + _697 + "><br/>";
}
}
var _698 = {position: "absolute", top: "0px", zIndex: 10, opacity: 0.01};
        var div = _681.create("div", {style: _698, innerHTML: _696});
        this.ownerDocumentBody.appendChild(div);
        var _699 = lang.hitch(this, function() {
        var node = div.firstChild;
                while (node) {
        try {
        this.selection.selectElement(node.firstChild);
                var _69a = node.tagName.toLowerCase();
                this._local2NativeFormatNames[_69a] = document.queryCommandValue("formatblock");
                this._native2LocalFormatNames[this._local2NativeFormatNames[_69a]] = _69a;
                node = node.nextSibling.nextSibling;
        } catch (e) {
        }
        }
        _681.destroy(div);
        });
        this.defer(_699);
}, open: function(_69b) {
if (!this.onLoadDeferred || this.onLoadDeferred.fired >= 0) {
this.onLoadDeferred = new _67e();
}
if (!this.isClosed) {
this.close();
}
_687.publish(_691._scopeName + "._editor.RichText::open", this);
        if (arguments.length === 1 && _69b.nodeName) {
this.domNode = _69b;
}
var dn = this.domNode;
        var html;
        if (lang.isString(this.value)) {
html = this.value;
        delete this.value;
        dn.innerHTML = "";
} else {
if (dn.nodeName && dn.nodeName.toLowerCase() == "textarea") {
var ta = (this.textarea = dn);
        this.name = ta.name;
        html = ta.value;
        dn = this.domNode = this.ownerDocument.createElement("div");
        dn.setAttribute("widgetId", this.id);
        ta.removeAttribute("widgetId");
        dn.cssText = ta.cssText;
        dn.className += " " + ta.className;
        _681.place(dn, ta, "before");
        var _69c = lang.hitch(this, function() {
        _683.set(ta, {display: "block", position: "absolute", top: "-1000px"});
                if (has("ie")) {
        var s = ta.style;
                this.__overflow = s.overflow;
                s.overflow = "hidden";
        }
        });
        if (has("ie")) {
this.defer(_69c, 10);
} else {
_69c();
}
if (ta.form) {
var _69d = ta.value;
        this.reset = function() {
        var _69e = this.getValue();
                if (_69e !== _69d) {
        this.replaceValue(_69d);
        }
        };
        on(ta.form, "submit", lang.hitch(this, function() {
        _67f.set(ta, "disabled", this.disabled);
                ta.value = this.getValue();
        }));
}
} else {
html = _68f.getChildrenHtml(dn);
        dn.innerHTML = "";
}
}
this.value = html;
        if (dn.nodeName && dn.nodeName === "LI") {
dn.innerHTML = " <br>";
}
this.header = dn.ownerDocument.createElement("div");
        dn.appendChild(this.header);
        this.editingArea = dn.ownerDocument.createElement("div");
        dn.appendChild(this.editingArea);
        this.footer = dn.ownerDocument.createElement("div");
        dn.appendChild(this.footer);
        if (!this.name) {
this.name = this.id + "_AUTOGEN";
}
if (this.name !== "" && (!_67c["useXDomain"] || _67c["allowXdRichTextSave"])) {
var _69f = dom.byId(_691._scopeName + "._editor.RichText.value");
        if (_69f && _69f.value !== "") {
var _6a0 = _69f.value.split(this._SEPARATOR), i = 0, dat;
        while ((dat = _6a0[i++])) {
var data = dat.split(this._NAME_CONTENT_SEP);
        if (data[0] === this.name) {
html = data[1];
        _6a0 = _6a0.splice(i, 1);
        _69f.value = _6a0.join(this._SEPARATOR);
        break;
}
}
}
if (!_692._globalSaveHandler) {
_692._globalSaveHandler = {};
        _688.addOnUnload(function() {
        var id;
                for (id in _692._globalSaveHandler) {
        var f = _692._globalSaveHandler[id];
                if (lang.isFunction(f)) {
        f();
        }
        }
        });
}
_692._globalSaveHandler[this.id] = lang.hitch(this, "_saveContent");
}
this.isClosed = false;
        var ifr = (this.editorObject = this.iframe = this.ownerDocument.createElement("iframe"));
        ifr.id = this.id + "_iframe";
        ifr.style.border = "none";
        ifr.style.width = "100%";
        if (this._layoutMode) {
ifr.style.height = "100%";
} else {
if (has("ie") >= 7) {
if (this.height) {
ifr.style.height = this.height;
}
if (this.minHeight) {
ifr.style.minHeight = this.minHeight;
}
} else {
ifr.style.height = this.height ? this.height : this.minHeight;
}
}
ifr.frameBorder = 0;
        ifr._loadFunc = lang.hitch(this, function(w) {
        this.window = w;
                this.document = this.window.document;
                this.selection = new _68d.SelectionManager(w);
                if (has("ie")) {
        this._localizeEditorCommands();
        }
        this.onLoad(html);
        });
        var src = this._getIframeDocTxt(), s = "javascript: '" + src.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
        if (has("ie") >= 9) {
this.editingArea.appendChild(ifr);
        ifr.src = s;
} else {
ifr.setAttribute("src", s);
        this.editingArea.appendChild(ifr);
}
if (dn.nodeName === "LI") {
dn.lastChild.style.marginTop = "-1.2em";
}
_680.add(this.domNode, this.baseClass);
}, _local2NativeFormatNames: {}, _native2LocalFormatNames: {}, _getIframeDocTxt: function() {
var _6a1 = _683.getComputedStyle(this.domNode);
        var html = "";
        var _6a2 = true;
        if (has("ie") || has("webkit") || (!this.height && !has("mozilla"))) {
html = "<div id='dijitEditorBody'></div>";
        _6a2 = false;
} else {
if (has("mozilla")) {
this._cursorToStart = true;
        html = "&#160;";
}
}
var font = [_6a1.fontWeight, _6a1.fontSize, _6a1.fontFamily].join(" ");
        var _6a3 = _6a1.lineHeight;
        if (_6a3.indexOf("px") >= 0) {
_6a3 = parseFloat(_6a3) / parseFloat(_6a1.fontSize);
} else {
if (_6a3.indexOf("em") >= 0) {
_6a3 = parseFloat(_6a3);
} else {
_6a3 = "normal";
}
}
var _6a4 = "";
        var self = this;
        this.style.replace(/(^|;)\s*(line-|font-?)[^;]+/ig, function(_6a5) {
        _6a5 = _6a5.replace(/^;/ig, "") + ";";
                var s = _6a5.split(":")[0];
                if (s) {
        s = lang.trim(s);
                s = s.toLowerCase();
                var i;
                var sC = "";
                for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
                switch (c) {
        case "-":
                i++;
                c = s.charAt(i).toUpperCase();
                default:
                sC += c;
        }
        }
        _683.set(self.domNode, sC, "");
        }
        _6a4 += _6a5 + ";";
        });
        var _6a6 = _685("label[for=\"" + this.id + "\"]");
        var _6a7 = "";
        if (_6a6.length) {
_6a7 = _6a6[0].innerHTML;
} else {
if (this["aria-label"]) {
_6a7 = this["aria-label"];
} else {
if (this["aria-labelledby"]) {
_6a7 = dom.byId(this["aria-labelledby"]).innerHTML;
}
}
}
this.iframe.setAttribute("title", _6a7);
        return ["<!DOCTYPE html>", this.isLeftToRight() ? "<html lang='" + this.lang + "'>\n<head>\n" : "<html dir='rtl' lang='" + this.lang + "'>\n<head>\n", _6a7 ? "<title>" + _6a7 + "</title>" : "", "<meta http-equiv='Content-Type' content='text/html'>\n", "<style>\n", "\tbody,html {\n", "\t\tbackground:transparent;\n", "\t\tpadding: 1px 0 0 0;\n", "\t\tmargin: -1px 0 0 0;\n", "\t}\n", "\tbody,html, #dijitEditorBody{ outline: none; }", "html { height: 100%; width: 100%; overflow: hidden; }\n", this.height ? "\tbody { height: 100%; width: 100%; overflow: auto; }\n" : "\tbody { min-height: " + this.minHeight + "; width: 100%; overflow-x: auto; overflow-y: hidden; }\n", "\tbody{\n", "\t\ttop:0px;\n", "\t\tleft:0px;\n", "\t\tright:0px;\n", "\t\tfont:", font, ";\n", ((this.height || has("opera")) ? "" : "\t\tposition: fixed;\n"), "\t\tline-height:", _6a3, ";\n", "\t}\n", "\tp{ margin: 1em 0; }\n", "\tli > ul:-moz-first-node, li > ol:-moz-first-node{ padding-top: 1.2em; }\n", (!has("ie") ? "\tli{ min-height:1.2em; }\n" : ""), "</style>\n", this._applyEditingAreaStyleSheets(), "\n", "</head>\n<body role='main' ", (_6a2 ? "id='dijitEditorBody' " : ""), "onload='frameElement && frameElement._loadFunc(window,document)' ", "style='" + _6a4 + "'>", html, "</body>\n</html>"].join("");
}, _applyEditingAreaStyleSheets: function() {
var _6a8 = [];
        if (this.styleSheets) {
_6a8 = this.styleSheets.split(";");
        this.styleSheets = "";
}
_6a8 = _6a8.concat(this.editingAreaStyleSheets);
        this.editingAreaStyleSheets = [];
        var text = "", i = 0, url, _6a9 = _68a.get(this.ownerDocument);
        while ((url = _6a8[i++])) {
var _6aa = (new _689(_6a9.location, url)).toString();
        this.editingAreaStyleSheets.push(_6aa);
        text += "<link rel=\"stylesheet\" type=\"text/css\" href=\"" + _6aa + "\"/>";
}
return text;
}, addStyleSheet: function(uri) {
var url = uri.toString(), _6ab = _68a.get(this.ownerDocument);
        if (url.charAt(0) === "." || (url.charAt(0) !== "/" && !uri.host)) {
url = (new _689(_6ab.location, url)).toString();
}
if (_67b.indexOf(this.editingAreaStyleSheets, url) > - 1) {
return;
}
this.editingAreaStyleSheets.push(url);
        this.onLoadDeferred.then(lang.hitch(this, function() {
        if (this.document.createStyleSheet) {
        this.document.createStyleSheet(url);
        } else {
        var head = this.document.getElementsByTagName("head")[0];
                var _6ac = this.document.createElement("link");
                _6ac.rel = "stylesheet";
                _6ac.type = "text/css";
                _6ac.href = url;
                head.appendChild(_6ac);
        }
        }));
}, removeStyleSheet: function(uri) {
var url = uri.toString(), _6ad = _68a.get(this.ownerDocument);
        if (url.charAt(0) === "." || (url.charAt(0) !== "/" && !uri.host)) {
url = (new _689(_6ad.location, url)).toString();
}
var _6ae = _67b.indexOf(this.editingAreaStyleSheets, url);
        if (_6ae === - 1) {
return;
}
delete this.editingAreaStyleSheets[_6ae];
        _685("link[href=\"" + url + "\"]", this.window.document).orphan();
}, disabled: false, _mozSettingProps: {"styleWithCSS": false}, _setDisabledAttr: function(_6af) {
_6af = !!_6af;
        this._set("disabled", _6af);
        if (!this.isLoaded) {
return;
}
if (has("ie") || has("webkit") || has("opera")) {
var _6b0 = has("ie") && (this.isLoaded || !this.focusOnLoad);
        if (_6b0) {
this.editNode.unselectable = "on";
}
this.editNode.contentEditable = !_6af;
        if (_6b0) {
this.defer(function() {
if (this.editNode) {
this.editNode.unselectable = "off";
}
});
}
} else {
try {
this.document.designMode = (_6af ? "off" : "on");
} catch (e) {
return;
}
if (!_6af && this._mozSettingProps) {
var ps = this._mozSettingProps;
        var n;
        for (n in ps) {
if (ps.hasOwnProperty(n)) {
try {
this.document.execCommand(n, false, ps[n]);
} catch (e2) {
}
}
}
}
}
this._disabledOK = true;
}, onLoad: function(html) {
if (!this.window.__registeredWindow) {
this.window.__registeredWindow = true;
        this._iframeRegHandle = _690.registerIframe(this.iframe);
}
if (!has("ie") && !has("webkit") && (this.height || has("mozilla"))) {
this.editNode = this.document.body;
} else {
this.editNode = this.document.body.firstChild;
        var _6b1 = this;
        if (has("ie")) {
this.tabStop = _681.create("div", {tabIndex: - 1}, this.editingArea);
        this.iframe.onfocus = function() {
        _6b1.editNode.setActive();
        };
}
}
this.focusNode = this.editNode;
        var _6b2 = this.events.concat(this.captureEvents);
        var ap = this.iframe ? this.document : this.editNode;
        this.own(_67b.map(_6b2, function(item) {
        var type = item.toLowerCase().replace(/^on/, "");
                on(ap, type, lang.hitch(this, item));
        }, this));
        this.own(on(ap, "mouseup", lang.hitch(this, "onClick")));
        if (has("ie")) {
this.own(on(this.document, "mousedown", lang.hitch(this, "_onIEMouseDown")));
        this.editNode.style.zoom = 1;
} else {
this.own(on(this.document, "mousedown", lang.hitch(this, function() {
delete this._cursorToStart;
})));
}
if (has("webkit")) {
this._webkitListener = this.own(on(this.document, "mouseup", lang.hitch(this, "onDisplayChanged")))[0];
        this.own(on(this.document, "mousedown", lang.hitch(this, function(e) {
        var t = e.target;
                if (t && (t === this.document.body || t === this.document)) {
        this.defer("placeCursorAtEnd");
        }
        })));
}
if (has("ie")) {
try {
this.document.execCommand("RespectVisibilityInDesign", true, null);
} catch (e) {
}
}
this.isLoaded = true;
        this.set("disabled", this.disabled);
        var _6b3 = lang.hitch(this, function() {
        this.setValue(html);
                if (this.onLoadDeferred) {
        this.onLoadDeferred.resolve(true);
        }
        this.onDisplayChanged();
                if (this.focusOnLoad) {
        _686(lang.hitch(this, "defer", "focus", this.updateInterval));
        }
        this.value = this.getValue(true);
        });
        if (this.setValueDeferred) {
this.setValueDeferred.then(_6b3);
} else {
_6b3();
}
}, onKeyDown: function(e) {
if (e.keyCode === keys.TAB && this.isTabIndent) {
e.stopPropagation();
        e.preventDefault();
        if (this.queryCommandEnabled((e.shiftKey ? "outdent" : "indent"))) {
this.execCommand((e.shiftKey ? "outdent" : "indent"));
}
}
if (has("ie")) {
if (e.keyCode == keys.TAB && !this.isTabIndent) {
if (e.shiftKey && !e.ctrlKey && !e.altKey) {
this.iframe.focus();
} else {
if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
this.tabStop.focus();
}
}
} else {
if (e.keyCode === keys.BACKSPACE && this.document.selection.type === "Control") {
e.stopPropagation();
        e.preventDefault();
        this.execCommand("delete");
}
}
}
if (has("ff")) {
if (e.keyCode === keys.PAGE_UP || e.keyCode === keys.PAGE_DOWN) {
if (this.editNode.clientHeight >= this.editNode.scrollHeight) {
e.preventDefault();
}
}
}
var _6b4 = this._keyHandlers[e.keyCode], args = arguments;
        if (_6b4 && !e.altKey) {
_67b.some(_6b4, function(h) {
if (!(h.shift ^ e.shiftKey) && !(h.ctrl ^ (e.ctrlKey || e.metaKey))) {
if (!h.handler.apply(this, args)) {
e.preventDefault();
}
return true;
}
}, this);
}
this.defer("onKeyPressed", 1);
        return true;
}, onKeyUp: function() {
}, setDisabled: function(_6b5) {
_684.deprecated("dijit.Editor::setDisabled is deprecated", "use dijit.Editor::attr(\"disabled\",boolean) instead", 2);
        this.set("disabled", _6b5);
}, _setValueAttr: function(_6b6) {
this.setValue(_6b6);
}, _setDisableSpellCheckAttr: function(_6b7) {
if (this.document) {
_67f.set(this.document.body, "spellcheck", !_6b7);
} else {
this.onLoadDeferred.then(lang.hitch(this, function() {
_67f.set(this.document.body, "spellcheck", !_6b7);
}));
}
this._set("disableSpellCheck", _6b7);
}, addKeyHandler: function(key, ctrl, _6b8, _6b9) {
if (typeof key == "string") {
key = key.toUpperCase().charCodeAt(0);
}
if (!lang.isArray(this._keyHandlers[key])) {
this._keyHandlers[key] = [];
}
this._keyHandlers[key].push({shift: _6b8 || false, ctrl: ctrl || false, handler: _6b9});
}, onKeyPressed: function() {
this.onDisplayChanged();
}, onClick: function(e) {
this.onDisplayChanged(e);
}, _onIEMouseDown: function() {
if (!this.focused && !this.disabled) {
this.focus();
}
}, _onBlur: function(e) {
if (has("ie") >= 9) {
this.defer(function() {
if (!_690.curNode) {
this.ownerDocumentBody.focus();
}
});
}
this.inherited(arguments);
        var _6ba = this.getValue(true);
        if (_6ba !== this.value) {
this.onChange(_6ba);
}
this._set("value", _6ba);
}, _onFocus: function(e) {
if (!this.disabled) {
if (!this._disabledOK) {
this.set("disabled", false);
}
this.inherited(arguments);
}
}, blur: function() {
if (!has("ie") && this.window.document.documentElement && this.window.document.documentElement.focus) {
this.window.document.documentElement.focus();
} else {
if (this.ownerDocumentBody.focus) {
this.ownerDocumentBody.focus();
}
}
}, focus: function() {
if (!this.isLoaded) {
this.focusOnLoad = true;
        return;
}
if (this._cursorToStart) {
delete this._cursorToStart;
        if (this.editNode.childNodes) {
this.placeCursorAtStart();
        return;
}
}
if (!has("ie")) {
_690.focus(this.iframe);
} else {
if (this.editNode && this.editNode.focus) {
this.iframe.fireEvent("onfocus", document.createEventObject());
}
}
}, updateInterval: 200, _updateTimer: null, onDisplayChanged: function() {
if (this._updateTimer) {
this._updateTimer.remove();
}
this._updateTimer = this.defer("onNormalizedDisplayChanged", this.updateInterval);
}, onNormalizedDisplayChanged: function() {
delete this._updateTimer;
}, onChange: function() {
}, _normalizeCommand: function(cmd, _6bb) {
var _6bc = cmd.toLowerCase();
        if (_6bc === "formatblock") {
if (has("safari") && _6bb === undefined) {
_6bc = "heading";
}
} else {
if (_6bc === "hilitecolor" && !has("mozilla")) {
_6bc = "backcolor";
}
}
return _6bc;
}, _qcaCache: {}, queryCommandAvailable: function(_6bd) {
var ca = this._qcaCache[_6bd];
        if (ca !== undefined) {
return ca;
}
return (this._qcaCache[_6bd] = this._queryCommandAvailable(_6bd));
}, _queryCommandAvailable: function(_6be) {
var ie = 1;
        var _6bf = 1 << 1;
        var _6c0 = 1 << 2;
        var _6c1 = 1 << 3;
        function _6c2(_6c3) {
        return {ie: Boolean(_6c3 & ie), mozilla: Boolean(_6c3 & _6bf), webkit: Boolean(_6c3 & _6c0), opera: Boolean(_6c3 & _6c1)};
        }
;
        var _6c4 = null;
        switch (_6be.toLowerCase()) {
case "bold":
        case "italic":
        case "underline":
        case "subscript":
        case "superscript":
        case "fontname":
        case "fontsize":
        case "forecolor":
        case "hilitecolor":
        case "justifycenter":
        case "justifyfull":
        case "justifyleft":
        case "justifyright":
        case "delete":
        case "selectall":
        case "toggledir":
        _6c4 = _6c2(_6bf | ie | _6c0 | _6c1);
        break;
        case "createlink":
        case "unlink":
        case "removeformat":
        case "inserthorizontalrule":
        case "insertimage":
        case "insertorderedlist":
        case "insertunorderedlist":
        case "indent":
        case "outdent":
        case "formatblock":
        case "inserthtml":
        case "undo":
        case "redo":
        case "strikethrough":
        case "tabindent":
        _6c4 = _6c2(_6bf | ie | _6c1 | _6c0);
        break;
        case "blockdirltr":
        case "blockdirrtl":
        case "dirltr":
        case "dirrtl":
        case "inlinedirltr":
        case "inlinedirrtl":
        _6c4 = _6c2(ie);
        break;
        case "cut":
        case "copy":
        case "paste":
        _6c4 = _6c2(ie | _6bf | _6c0 | _6c1);
        break;
        case "inserttable":
        _6c4 = _6c2(_6bf | ie);
        break;
        case "insertcell":
        case "insertcol":
        case "insertrow":
        case "deletecells":
        case "deletecols":
        case "deleterows":
        case "mergecells":
        case "splitcell":
        _6c4 = _6c2(ie | _6bf);
        break;
        default:
        return false;
}
return (has("ie") && _6c4.ie) || (has("mozilla") && _6c4.mozilla) || (has("webkit") && _6c4.webkit) || (has("opera") && _6c4.opera);
}, execCommand: function(_6c5, _6c6) {
var _6c7;
        if (this.focused) {
this.focus();
}
_6c5 = this._normalizeCommand(_6c5, _6c6);
        if (_6c6 !== undefined) {
if (_6c5 === "heading") {
throw new Error("unimplemented");
} else {
if ((_6c5 === "formatblock") && has("ie")) {
_6c6 = "<" + _6c6 + ">";
}
}
}
var _6c8 = "_" + _6c5 + "Impl";
        if (this[_6c8]) {
_6c7 = this[_6c8](_6c6);
} else {
_6c6 = arguments.length > 1 ? _6c6 : null;
        if (_6c6 || _6c5 !== "createlink") {
_6c7 = this.document.execCommand(_6c5, false, _6c6);
}
}
this.onDisplayChanged();
        return _6c7;
}, queryCommandEnabled: function(_6c9) {
if (this.disabled || !this._disabledOK) {
return false;
}
_6c9 = this._normalizeCommand(_6c9);
        var _6ca = "_" + _6c9 + "EnabledImpl";
        if (this[_6ca]) {
return this[_6ca](_6c9);
} else {
return this._browserQueryCommandEnabled(_6c9);
}
}, queryCommandState: function(_6cb) {
if (this.disabled || !this._disabledOK) {
return false;
}
_6cb = this._normalizeCommand(_6cb);
        try {
        return this.document.queryCommandState(_6cb);
        } catch (e) {
return false;
}
}, queryCommandValue: function(_6cc) {
if (this.disabled || !this._disabledOK) {
return false;
}
var r;
        _6cc = this._normalizeCommand(_6cc);
        if (has("ie") && _6cc === "formatblock") {
r = this._native2LocalFormatNames[this.document.queryCommandValue(_6cc)];
} else {
if (has("mozilla") && _6cc === "hilitecolor") {
var _6cd;
        try {
        _6cd = this.document.queryCommandValue("styleWithCSS");
        } catch (e) {
_6cd = false;
}
this.document.execCommand("styleWithCSS", false, true);
        r = this.document.queryCommandValue(_6cc);
        this.document.execCommand("styleWithCSS", false, _6cd);
} else {
r = this.document.queryCommandValue(_6cc);
}
}
return r;
}, _sCall: function(name, args) {
return this.selection[name].apply(this.selection, args);
}, placeCursorAtStart: function() {
this.focus();
        var _6ce = false;
        if (has("mozilla")) {
var _6cf = this.editNode.firstChild;
        while (_6cf) {
if (_6cf.nodeType === 3) {
if (_6cf.nodeValue.replace(/^\s+|\s+$/g, "").length > 0) {
_6ce = true;
        this.selection.selectElement(_6cf);
        break;
}
} else {
if (_6cf.nodeType === 1) {
_6ce = true;
        var tg = _6cf.tagName ? _6cf.tagName.toLowerCase() : "";
        if (/br|input|img|base|meta|area|basefont|hr|link/.test(tg)) {
this.selection.selectElement(_6cf);
} else {
this.selection.selectElementChildren(_6cf);
}
break;
}
}
_6cf = _6cf.nextSibling;
}
} else {
_6ce = true;
        this.selection.selectElementChildren(this.editNode);
}
if (_6ce) {
this.selection.collapse(true);
}
}, placeCursorAtEnd: function() {
this.focus();
        var _6d0 = false;
        if (has("mozilla")) {
var last = this.editNode.lastChild;
        while (last) {
if (last.nodeType === 3) {
if (last.nodeValue.replace(/^\s+|\s+$/g, "").length > 0) {
_6d0 = true;
        this.selection.selectElement(last);
        break;
}
} else {
if (last.nodeType === 1) {
_6d0 = true;
        this.selection.selectElement(last.lastChild || last);
        break;
}
}
last = last.previousSibling;
}
} else {
_6d0 = true;
        this.selection.selectElementChildren(this.editNode);
}
if (_6d0) {
this.selection.collapse(false);
}
}, getValue: function(_6d1) {
if (this.textarea) {
if (this.isClosed || !this.isLoaded) {
return this.textarea.value;
}
}
return this._postFilterContent(null, _6d1);
}, _getValueAttr: function() {
return this.getValue(true);
}, setValue: function(html) {
if (!this.isLoaded) {
this.onLoadDeferred.then(lang.hitch(this, function() {
this.setValue(html);
}));
        return;
}
this._cursorToStart = true;
        if (this.textarea && (this.isClosed || !this.isLoaded)) {
this.textarea.value = html;
} else {
html = this._preFilterContent(html);
        var node = this.isClosed ? this.domNode : this.editNode;
        if (html && has("mozilla") && html.toLowerCase() === "<p></p>") {
html = "<p>&#160;</p>";
}
if (!html && has("webkit")) {
html = "&#160;";
}
node.innerHTML = html;
        this._preDomFilterContent(node);
}
this.onDisplayChanged();
        this._set("value", this.getValue(true));
}, replaceValue: function(html) {
if (this.isClosed) {
this.setValue(html);
} else {
if (this.window && this.window.getSelection && !has("mozilla")) {
this.setValue(html);
} else {
if (this.window && this.window.getSelection) {
html = this._preFilterContent(html);
        this.execCommand("selectall");
        if (!html) {
this._cursorToStart = true;
        html = "&#160;";
}
this.execCommand("inserthtml", html);
        this._preDomFilterContent(this.editNode);
} else {
if (this.document && this.document.selection) {
this.setValue(html);
}
}
}
}
this._set("value", this.getValue(true));
}, _preFilterContent: function(html) {
var ec = html;
        _67b.forEach(this.contentPreFilters, function(ef) {
        if (ef) {
        ec = ef(ec);
        }
        });
        return ec;
}, _preDomFilterContent: function(dom) {
dom = dom || this.editNode;
        _67b.forEach(this.contentDomPreFilters, function(ef) {
        if (ef && lang.isFunction(ef)) {
        ef(dom);
        }
        }, this);
}, _postFilterContent: function(dom, _6d2) {
var ec;
        if (!lang.isString(dom)) {
dom = dom || this.editNode;
        if (this.contentDomPostFilters.length) {
if (_6d2) {
dom = lang.clone(dom);
}
_67b.forEach(this.contentDomPostFilters, function(ef) {
dom = ef(dom);
});
}
ec = _68f.getChildrenHtml(dom);
} else {
ec = dom;
}
if (!lang.trim(ec.replace(/^\xA0\xA0*/, "").replace(/\xA0\xA0*$/, "")).length) {
ec = "";
}
_67b.forEach(this.contentPostFilters, function(ef) {
ec = ef(ec);
});
        return ec;
}, _saveContent: function() {
var _6d3 = dom.byId(_691._scopeName + "._editor.RichText.value");
        if (_6d3) {
if (_6d3.value) {
_6d3.value += this._SEPARATOR;
}
_6d3.value += this.name + this._NAME_CONTENT_SEP + this.getValue(true);
}
}, escapeXml: function(str, _6d4) {
str = str.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;");
        if (!_6d4) {
str = str.replace(/'/gm, "&#39;");
}
return str;
}, getNodeHtml: function(node) {
_684.deprecated("dijit.Editor::getNodeHtml is deprecated", "use dijit/_editor/html::getNodeHtml instead", 2);
        return _68f.getNodeHtml(node);
}, getNodeChildrenHtml: function(dom) {
_684.deprecated("dijit.Editor::getNodeChildrenHtml is deprecated", "use dijit/_editor/html::getChildrenHtml instead", 2);
        return _68f.getChildrenHtml(dom);
}, close: function(save) {
if (this.isClosed) {
return;
}
if (!arguments.length) {
save = true;
}
if (save) {
this._set("value", this.getValue(true));
}
if (this.interval) {
clearInterval(this.interval);
}
if (this._webkitListener) {
this._webkitListener.remove();
        delete this._webkitListener;
}
if (has("ie")) {
this.iframe.onfocus = null;
}
this.iframe._loadFunc = null;
        if (this._iframeRegHandle) {
this._iframeRegHandle.remove();
        delete this._iframeRegHandle;
}
if (this.textarea) {
var s = this.textarea.style;
        s.position = "";
        s.left = s.top = "";
        if (has("ie")) {
s.overflow = this.__overflow;
        this.__overflow = null;
}
this.textarea.value = this.value;
        _681.destroy(this.domNode);
        this.domNode = this.textarea;
} else {
this.domNode.innerHTML = this.value;
}
delete this.iframe;
        _680.remove(this.domNode, this.baseClass);
        this.isClosed = true;
        this.isLoaded = false;
        delete this.editNode;
        delete this.focusNode;
        if (this.window && this.window._frameElement) {
this.window._frameElement = null;
}
this.window = null;
        this.document = null;
        this.editingArea = null;
        this.editorObject = null;
}, destroy: function() {
if (!this.isClosed) {
this.close(false);
}
if (this._updateTimer) {
this._updateTimer.remove();
}
this.inherited(arguments);
        if (_692._globalSaveHandler) {
delete _692._globalSaveHandler[this.id];
}
}, _removeMozBogus: function(html) {
return html.replace(/\stype="_moz"/gi, "").replace(/\s_moz_dirty=""/gi, "").replace(/_moz_resizing="(true|false)"/gi, "");
}, _removeWebkitBogus: function(html) {
html = html.replace(/\sclass="webkit-block-placeholder"/gi, "");
        html = html.replace(/\sclass="apple-style-span"/gi, "");
        html = html.replace(/<meta charset=\"utf-8\" \/>/gi, "");
        return html;
}, _normalizeFontStyle: function(html) {
return html.replace(/<(\/)?strong([ \>])/gi, "<$1b$2").replace(/<(\/)?em([ \>])/gi, "<$1i$2");
}, _preFixUrlAttributes: function(html) {
return html.replace(/(?:(<a(?=\s).*?\shref=)("|')(.*?)\2)|(?:(<a\s.*?href=)([^"'][^ >]+))/gi, "$1$4$2$3$5$2 _djrealurl=$2$3$5$2").replace(/(?:(<img(?=\s).*?\ssrc=)("|')(.*?)\2)|(?:(<img\s.*?src=)([^"'][^ >]+))/gi, "$1$4$2$3$5$2 _djrealurl=$2$3$5$2");
}, _browserQueryCommandEnabled: function(_6d5) {
if (!_6d5) {
return false;
}
var elem = has("ie") ? this.document.selection.createRange() : this.document;
        try {
        return elem.queryCommandEnabled(_6d5);
        } catch (e) {
return false;
}
}, _createlinkEnabledImpl: function() {
var _6d6 = true;
        if (has("opera")) {
var sel = this.window.getSelection();
        if (sel.isCollapsed) {
_6d6 = true;
} else {
_6d6 = this.document.queryCommandEnabled("createlink");
}
} else {
_6d6 = this._browserQueryCommandEnabled("createlink");
}
return _6d6;
}, _unlinkEnabledImpl: function() {
var _6d7 = true;
        if (has("mozilla") || has("webkit")) {
_6d7 = this.selection.hasAncestorElement("a");
} else {
_6d7 = this._browserQueryCommandEnabled("unlink");
}
return _6d7;
}, _inserttableEnabledImpl: function() {
var _6d8 = true;
        if (has("mozilla") || has("webkit")) {
_6d8 = true;
} else {
_6d8 = this._browserQueryCommandEnabled("inserttable");
}
return _6d8;
}, _cutEnabledImpl: function() {
var _6d9 = true;
        if (has("webkit")) {
var sel = this.window.getSelection();
        if (sel) {
sel = sel.toString();
}
_6d9 = !!sel;
} else {
_6d9 = this._browserQueryCommandEnabled("cut");
}
return _6d9;
}, _copyEnabledImpl: function() {
var _6da = true;
        if (has("webkit")) {
var sel = this.window.getSelection();
        if (sel) {
sel = sel.toString();
}
_6da = !!sel;
} else {
_6da = this._browserQueryCommandEnabled("copy");
}
return _6da;
}, _pasteEnabledImpl: function() {
var _6db = true;
        if (has("webkit")) {
return true;
} else {
_6db = this._browserQueryCommandEnabled("paste");
}
return _6db;
}, _inserthorizontalruleImpl: function(_6dc) {
if (has("ie")) {
return this._inserthtmlImpl("<hr>");
}
return this.document.execCommand("inserthorizontalrule", false, _6dc);
}, _unlinkImpl: function(_6dd) {
if ((this.queryCommandEnabled("unlink")) && (has("mozilla") || has("webkit"))) {
var a = this.selection.getAncestorElement("a");
        this.selection.selectElement(a);
        return this.document.execCommand("unlink", false, null);
}
return this.document.execCommand("unlink", false, _6dd);
}, _hilitecolorImpl: function(_6de) {
var _6df;
        var _6e0 = this._handleTextColorOrProperties("hilitecolor", _6de);
        if (!_6e0) {
if (has("mozilla")) {
this.document.execCommand("styleWithCSS", false, true);
        _6df = this.document.execCommand("hilitecolor", false, _6de);
        this.document.execCommand("styleWithCSS", false, false);
} else {
_6df = this.document.execCommand("hilitecolor", false, _6de);
}
}
return _6df;
}, _backcolorImpl: function(_6e1) {
if (has("ie")) {
_6e1 = _6e1 ? _6e1 : null;
}
var _6e2 = this._handleTextColorOrProperties("backcolor", _6e1);
        if (!_6e2) {
_6e2 = this.document.execCommand("backcolor", false, _6e1);
}
return _6e2;
}, _forecolorImpl: function(_6e3) {
if (has("ie")) {
_6e3 = _6e3 ? _6e3 : null;
}
var _6e4 = false;
        _6e4 = this._handleTextColorOrProperties("forecolor", _6e3);
        if (!_6e4) {
_6e4 = this.document.execCommand("forecolor", false, _6e3);
}
return _6e4;
}, _inserthtmlImpl: function(_6e5) {
_6e5 = this._preFilterContent(_6e5);
        var rv = true;
        if (has("ie")) {
var _6e6 = this.document.selection.createRange();
        if (this.document.selection.type.toUpperCase() === "CONTROL") {
var n = _6e6.item(0);
        while (_6e6.length) {
_6e6.remove(_6e6.item(0));
}
n.outerHTML = _6e5;
} else {
_6e6.pasteHTML(_6e5);
}
_6e6.select();
} else {
if (has("mozilla") && !_6e5.length) {
this.selection.remove();
} else {
rv = this.document.execCommand("inserthtml", false, _6e5);
}
}
return rv;
}, _boldImpl: function(_6e7) {
var _6e8 = false;
        if (has("ie")) {
this._adaptIESelection();
        _6e8 = this._adaptIEFormatAreaAndExec("bold");
}
if (!_6e8) {
_6e8 = this.document.execCommand("bold", false, _6e7);
}
return _6e8;
}, _italicImpl: function(_6e9) {
var _6ea = false;
        if (has("ie")) {
this._adaptIESelection();
        _6ea = this._adaptIEFormatAreaAndExec("italic");
}
if (!_6ea) {
_6ea = this.document.execCommand("italic", false, _6e9);
}
return _6ea;
}, _underlineImpl: function(_6eb) {
var _6ec = false;
        if (has("ie")) {
this._adaptIESelection();
        _6ec = this._adaptIEFormatAreaAndExec("underline");
}
if (!_6ec) {
_6ec = this.document.execCommand("underline", false, _6eb);
}
return _6ec;
}, _strikethroughImpl: function(_6ed) {
var _6ee = false;
        if (has("ie")) {
this._adaptIESelection();
        _6ee = this._adaptIEFormatAreaAndExec("strikethrough");
}
if (!_6ee) {
_6ee = this.document.execCommand("strikethrough", false, _6ed);
}
return _6ee;
}, _superscriptImpl: function(_6ef) {
var _6f0 = false;
        if (has("ie")) {
this._adaptIESelection();
        _6f0 = this._adaptIEFormatAreaAndExec("superscript");
}
if (!_6f0) {
_6f0 = this.document.execCommand("superscript", false, _6ef);
}
return _6f0;
}, _subscriptImpl: function(_6f1) {
var _6f2 = false;
        if (has("ie")) {
this._adaptIESelection();
        _6f2 = this._adaptIEFormatAreaAndExec("subscript");
}
if (!_6f2) {
_6f2 = this.document.execCommand("subscript", false, _6f1);
}
return _6f2;
}, _fontnameImpl: function(_6f3) {
var _6f4;
        if (has("ie")) {
_6f4 = this._handleTextColorOrProperties("fontname", _6f3);
}
if (!_6f4) {
_6f4 = this.document.execCommand("fontname", false, _6f3);
}
return _6f4;
}, _fontsizeImpl: function(_6f5) {
var _6f6;
        if (has("ie")) {
_6f6 = this._handleTextColorOrProperties("fontsize", _6f5);
}
if (!_6f6) {
_6f6 = this.document.execCommand("fontsize", false, _6f5);
}
return _6f6;
}, _insertorderedlistImpl: function(_6f7) {
var _6f8 = false;
        if (has("ie")) {
_6f8 = this._adaptIEList("insertorderedlist", _6f7);
}
if (!_6f8) {
_6f8 = this.document.execCommand("insertorderedlist", false, _6f7);
}
return _6f8;
}, _insertunorderedlistImpl: function(_6f9) {
var _6fa = false;
        if (has("ie")) {
_6fa = this._adaptIEList("insertunorderedlist", _6f9);
}
if (!_6fa) {
_6fa = this.document.execCommand("insertunorderedlist", false, _6f9);
}
return _6fa;
}, getHeaderHeight: function() {
return this._getNodeChildrenHeight(this.header);
}, getFooterHeight: function() {
return this._getNodeChildrenHeight(this.footer);
}, _getNodeChildrenHeight: function(node) {
var h = 0;
        if (node && node.childNodes) {
var i;
        for (i = 0; i < node.childNodes.length; i++) {
var size = _682.position(node.childNodes[i]);
        h += size.h;
}
}
return h;
}, _isNodeEmpty: function(node, _6fb) {
if (node.nodeType === 1) {
if (node.childNodes.length > 0) {
return this._isNodeEmpty(node.childNodes[0], _6fb);
}
return true;
} else {
if (node.nodeType === 3) {
return (node.nodeValue.substring(_6fb) === "");
}
}
return false;
}, _removeStartingRangeFromRange: function(node, _6fc) {
if (node.nextSibling) {
_6fc.setStart(node.nextSibling, 0);
} else {
var _6fd = node.parentNode;
        while (_6fd && _6fd.nextSibling == null) {
_6fd = _6fd.parentNode;
}
if (_6fd) {
_6fc.setStart(_6fd.nextSibling, 0);
}
}
return _6fc;
}, _adaptIESelection: function() {
var _6fe = _68e.getSelection(this.window);
        if (_6fe && _6fe.rangeCount && !_6fe.isCollapsed) {
var _6ff = _6fe.getRangeAt(0);
        var _700 = _6ff.startContainer;
        var _701 = _6ff.startOffset;
        while (_700.nodeType === 3 && _701 >= _700.length && _700.nextSibling) {
_701 = _701 - _700.length;
        _700 = _700.nextSibling;
}
var _702 = null;
        while (this._isNodeEmpty(_700, _701) && _700 !== _702) {
_702 = _700;
        _6ff = this._removeStartingRangeFromRange(_700, _6ff);
        _700 = _6ff.startContainer;
        _701 = 0;
}
_6fe.removeAllRanges();
        _6fe.addRange(_6ff);
}
}, _adaptIEFormatAreaAndExec: function(_703) {
var _704 = _68e.getSelection(this.window);
        var doc = this.document;
        var rs, ret, _705, txt, _706, _707, _708, _709;
        if (_703 && _704 && _704.isCollapsed) {
var _70a = this.queryCommandValue(_703);
        if (_70a) {
var _70b = this._tagNamesForCommand(_703);
        _705 = _704.getRangeAt(0);
        var fs = _705.startContainer;
        if (fs.nodeType === 3) {
var _70c = _705.endOffset;
        if (fs.length < _70c) {
ret = this._adjustNodeAndOffset(rs, _70c);
        fs = ret.node;
        _70c = ret.offset;
}
}
var _70d;
        while (fs && fs !== this.editNode) {
var _70e = fs.tagName ? fs.tagName.toLowerCase() : "";
        if (_67b.indexOf(_70b, _70e) > - 1) {
_70d = fs;
        break;
}
fs = fs.parentNode;
}
if (_70d) {
rs = _705.startContainer;
        var _70f = doc.createElement(_70d.tagName);
        _681.place(_70f, _70d, "after");
        if (rs && rs.nodeType === 3) {
var _710, _711;
        var _712 = _705.endOffset;
        if (rs.length < _712) {
ret = this._adjustNodeAndOffset(rs, _712);
        rs = ret.node;
        _712 = ret.offset;
}
txt = rs.nodeValue;
        _706 = doc.createTextNode(txt.substring(0, _712));
        var _713 = txt.substring(_712, txt.length);
        if (_713) {
_707 = doc.createTextNode(_713);
}
_681.place(_706, rs, "before");
        if (_707) {
_708 = doc.createElement("span");
        _708.className = "ieFormatBreakerSpan";
        _681.place(_708, rs, "after");
        _681.place(_707, _708, "after");
        _707 = _708;
}
_681.destroy(rs);
        var _714 = _706.parentNode;
        var _715 = [];
        var _716;
        while (_714 !== _70d) {
var tg = _714.tagName;
        _716 = {tagName: tg};
        _715.push(_716);
        var _717 = doc.createElement(tg);
        if (_714.style) {
if (_717.style) {
if (_714.style.cssText) {
_717.style.cssText = _714.style.cssText;
        _716.cssText = _714.style.cssText;
}
}
}
if (_714.tagName === "FONT") {
if (_714.color) {
_717.color = _714.color;
        _716.color = _714.color;
}
if (_714.face) {
_717.face = _714.face;
        _716.face = _714.face;
}
if (_714.size) {
_717.size = _714.size;
        _716.size = _714.size;
}
}
if (_714.className) {
_717.className = _714.className;
        _716.className = _714.className;
}
if (_707) {
_710 = _707;
        while (_710) {
_711 = _710.nextSibling;
        _717.appendChild(_710);
        _710 = _711;
}
}
if (_717.tagName == _714.tagName) {
_708 = doc.createElement("span");
        _708.className = "ieFormatBreakerSpan";
        _681.place(_708, _714, "after");
        _681.place(_717, _708, "after");
} else {
_681.place(_717, _714, "after");
}
_706 = _714;
        _707 = _717;
        _714 = _714.parentNode;
}
if (_707) {
_710 = _707;
        if (_710.nodeType === 1 || (_710.nodeType === 3 && _710.nodeValue)) {
_70f.innerHTML = "";
}
while (_710) {
_711 = _710.nextSibling;
        _70f.appendChild(_710);
        _710 = _711;
}
}
var _718;
        if (_715.length) {
_716 = _715.pop();
        var _719 = doc.createElement(_716.tagName);
        if (_716.cssText && _719.style) {
_719.style.cssText = _716.cssText;
}
if (_716.className) {
_719.className = _716.className;
}
if (_716.tagName === "FONT") {
if (_716.color) {
_719.color = _716.color;
}
if (_716.face) {
_719.face = _716.face;
}
if (_716.size) {
_719.size = _716.size;
}
}
_681.place(_719, _70f, "before");
        while (_715.length) {
_716 = _715.pop();
        var _71a = doc.createElement(_716.tagName);
        if (_716.cssText && _71a.style) {
_71a.style.cssText = _716.cssText;
}
if (_716.className) {
_71a.className = _716.className;
}
if (_716.tagName === "FONT") {
if (_716.color) {
_71a.color = _716.color;
}
if (_716.face) {
_71a.face = _716.face;
}
if (_716.size) {
_71a.size = _716.size;
}
}
_719.appendChild(_71a);
        _719 = _71a;
}
_709 = doc.createTextNode(".");
        _708.appendChild(_709);
        _719.appendChild(_709);
        _718 = _68e.create(this.window);
        _718.setStart(_709, 0);
        _718.setEnd(_709, _709.length);
        _704.removeAllRanges();
        _704.addRange(_718);
        this.selection.collapse(false);
        _709.parentNode.innerHTML = "";
} else {
_708 = doc.createElement("span");
        _708.className = "ieFormatBreakerSpan";
        _709 = doc.createTextNode(".");
        _708.appendChild(_709);
        _681.place(_708, _70f, "before");
        _718 = _68e.create(this.window);
        _718.setStart(_709, 0);
        _718.setEnd(_709, _709.length);
        _704.removeAllRanges();
        _704.addRange(_718);
        this.selection.collapse(false);
        _709.parentNode.innerHTML = "";
}
if (!_70f.firstChild) {
_681.destroy(_70f);
}
return true;
}
}
return false;
} else {
_705 = _704.getRangeAt(0);
        rs = _705.startContainer;
        if (rs && rs.nodeType === 3) {
var _70c = _705.startOffset;
        if (rs.length < _70c) {
ret = this._adjustNodeAndOffset(rs, _70c);
        rs = ret.node;
        _70c = ret.offset;
}
txt = rs.nodeValue;
        _706 = doc.createTextNode(txt.substring(0, _70c));
        var _713 = txt.substring(_70c);
        if (_713 !== "") {
_707 = doc.createTextNode(txt.substring(_70c));
}
_708 = doc.createElement("span");
        _709 = doc.createTextNode(".");
        _708.appendChild(_709);
        if (_706.length) {
_681.place(_706, rs, "after");
} else {
_706 = rs;
}
_681.place(_708, _706, "after");
        if (_707) {
_681.place(_707, _708, "after");
}
_681.destroy(rs);
        var _718 = _68e.create(this.window);
        _718.setStart(_709, 0);
        _718.setEnd(_709, _709.length);
        _704.removeAllRanges();
        _704.addRange(_718);
        doc.execCommand(_703);
        _681.place(_708.firstChild, _708, "before");
        _681.destroy(_708);
        _718.setStart(_709, 0);
        _718.setEnd(_709, _709.length);
        _704.removeAllRanges();
        _704.addRange(_718);
        this.selection.collapse(false);
        _709.parentNode.innerHTML = "";
        return true;
}
}
} else {
return false;
}
}, _adaptIEList: function(_71b) {
var _71c = _68e.getSelection(this.window);
        if (_71c.isCollapsed) {
if (_71c.rangeCount && !this.queryCommandValue(_71b)) {
var _71d = _71c.getRangeAt(0);
        var sc = _71d.startContainer;
        if (sc && sc.nodeType == 3) {
if (!_71d.startOffset) {
var _71e = "ul";
        if (_71b === "insertorderedlist") {
_71e = "ol";
}
var list = this.document.createElement(_71e);
        var li = _681.create("li", null, list);
        _681.place(list, sc, "before");
        li.appendChild(sc);
        _681.create("br", null, list, "after");
        var _71f = _68e.create(this.window);
        _71f.setStart(sc, 0);
        _71f.setEnd(sc, sc.length);
        _71c.removeAllRanges();
        _71c.addRange(_71f);
        this.selection.collapse(true);
        return true;
}
}
}
}
return false;
}, _handleTextColorOrProperties: function(_720, _721) {
var _722 = _68e.getSelection(this.window);
        var doc = this.document;
        var rs, ret, _723, txt, _724, _725, _726, _727;
        _721 = _721 || null;
        if (_720 && _722 && _722.isCollapsed) {
if (_722.rangeCount) {
_723 = _722.getRangeAt(0);
        rs = _723.startContainer;
        if (rs && rs.nodeType === 3) {
var _728 = _723.startOffset;
        if (rs.length < _728) {
ret = this._adjustNodeAndOffset(rs, _728);
        rs = ret.node;
        _728 = ret.offset;
}
txt = rs.nodeValue;
        _724 = doc.createTextNode(txt.substring(0, _728));
        var _729 = txt.substring(_728);
        if (_729 !== "") {
_725 = doc.createTextNode(txt.substring(_728));
}
_726 = doc.createElement("span");
        _727 = doc.createTextNode(".");
        _726.appendChild(_727);
        var _72a = doc.createElement("span");
        _726.appendChild(_72a);
        if (_724.length) {
_681.place(_724, rs, "after");
} else {
_724 = rs;
}
_681.place(_726, _724, "after");
        if (_725) {
_681.place(_725, _726, "after");
}
_681.destroy(rs);
        var _72b = _68e.create(this.window);
        _72b.setStart(_727, 0);
        _72b.setEnd(_727, _727.length);
        _722.removeAllRanges();
        _722.addRange(_72b);
        if (has("webkit")) {
var _72c = "color";
        if (_720 === "hilitecolor" || _720 === "backcolor") {
_72c = "backgroundColor";
}
_683.set(_726, _72c, _721);
        this.selection.remove();
        _681.destroy(_72a);
        _726.innerHTML = "&#160;";
        this.selection.selectElement(_726);
        this.focus();
} else {
this.execCommand(_720, _721);
        _681.place(_726.firstChild, _726, "before");
        _681.destroy(_726);
        _72b.setStart(_727, 0);
        _72b.setEnd(_727, _727.length);
        _722.removeAllRanges();
        _722.addRange(_72b);
        this.selection.collapse(false);
        _727.parentNode.removeChild(_727);
}
return true;
}
}
}
return false;
}, _adjustNodeAndOffset: function(node, _72d) {
while (node.length < _72d && node.nextSibling && node.nextSibling.nodeType === 3) {
_72d = _72d - node.length;
        node = node.nextSibling;
}
return {"node": node, "offset": _72d};
}, _tagNamesForCommand: function(_72e) {
if (_72e === "bold") {
return ["b", "strong"];
} else {
if (_72e === "italic") {
return ["i", "em"];
} else {
if (_72e === "strikethrough") {
return ["s", "strike"];
} else {
if (_72e === "superscript") {
return ["sup"];
} else {
if (_72e === "subscript") {
return ["sub"];
} else {
if (_72e === "underline") {
return ["u"];
}
}
}
}
}
}
return [];
}, _stripBreakerNodes: function(node) {
if (!this.isLoaded) {
return;
}
_685(".ieFormatBreakerSpan", node).forEach(function(b) {
while (b.firstChild) {
_681.place(b.firstChild, b, "before");
}
_681.destroy(b);
});
        return node;
}});
        return _692;
});
}, "dijit/_editor/range": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/_base/lang"], function(_72f, _730, lang) {
var _731 = {getIndex: function(node, _732) {
var ret = [], retR = [];
        var _733 = node;
        var _734, n;
        while (node != _732) {
var i = 0;
        _734 = node.parentNode;
        while ((n = _734.childNodes[i++])) {
if (n === node) {
--i;
        break;
}
}
ret.unshift(i);
        retR.unshift(i - _734.childNodes.length);
        node = _734;
}
if (ret.length > 0 && _733.nodeType == 3) {
n = _733.previousSibling;
        while (n && n.nodeType == 3) {
ret[ret.length - 1]--;
        n = n.previousSibling;
}
n = _733.nextSibling;
        while (n && n.nodeType == 3) {
retR[retR.length - 1]++;
        n = n.nextSibling;
}
}
return {o: ret, r: retR};
}, getNode: function(_735, _736) {
if (!lang.isArray(_735) || _735.length == 0) {
return _736;
}
var node = _736;
        _72f.every(_735, function(i) {
        if (i >= 0 && i < node.childNodes.length) {
        node = node.childNodes[i];
        } else {
        node = null;
                return false;
        }
        return true;
        });
        return node;
}, getCommonAncestor: function(n1, n2, root) {
root = root || n1.ownerDocument.body;
        var _737 = function(n) {
        var as = [];
                while (n) {
        as.unshift(n);
                if (n !== root) {
        n = n.parentNode;
        } else {
        break;
        }
        }
        return as;
        };
        var n1as = _737(n1);
        var n2as = _737(n2);
        var m = Math.min(n1as.length, n2as.length);
        var com = n1as[0];
        for (var i = 1; i < m; i++) {
if (n1as[i] === n2as[i]) {
com = n1as[i];
} else {
break;
}
}
return com;
}, getAncestor: function(node, _738, root) {
root = root || node.ownerDocument.body;
        while (node && node !== root) {
var name = node.nodeName.toUpperCase();
        if (_738.test(name)) {
return node;
}
node = node.parentNode;
}
return null;
}, BlockTagNames: /^(?:P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|OL|UL|LI|DT|DE)$/, getBlockAncestor: function(node, _739, root) {
root = root || node.ownerDocument.body;
        _739 = _739 || _731.BlockTagNames;
        var _73a = null, _73b;
        while (node && node !== root) {
var name = node.nodeName.toUpperCase();
        if (!_73a && _739.test(name)) {
_73a = node;
}
if (!_73b && (/^(?:BODY|TD|TH|CAPTION)$/).test(name)) {
_73b = node;
}
node = node.parentNode;
}
return {blockNode: _73a, blockContainer: _73b || node.ownerDocument.body};
}, atBeginningOfContainer: function(_73c, node, _73d) {
var _73e = false;
        var _73f = (_73d == 0);
        if (!_73f && node.nodeType == 3) {
if (/^[\s\xA0]+$/.test(node.nodeValue.substr(0, _73d))) {
_73f = true;
}
}
if (_73f) {
var _740 = node;
        _73e = true;
        while (_740 && _740 !== _73c) {
if (_740.previousSibling) {
_73e = false;
        break;
}
_740 = _740.parentNode;
}
}
return _73e;
}, atEndOfContainer: function(_741, node, _742) {
var _743 = false;
        var _744 = (_742 == (node.length || node.childNodes.length));
        if (!_744 && node.nodeType == 3) {
if (/^[\s\xA0]+$/.test(node.nodeValue.substr(_742))) {
_744 = true;
}
}
if (_744) {
var _745 = node;
        _743 = true;
        while (_745 && _745 !== _741) {
if (_745.nextSibling) {
_743 = false;
        break;
}
_745 = _745.parentNode;
}
}
return _743;
}, adjacentNoneTextNode: function(_746, next) {
var node = _746;
        var len = (0 - _746.length) || 0;
        var prop = next ? "nextSibling" : "previousSibling";
        while (node) {
if (node.nodeType != 3) {
break;
}
len += node.length;
        node = node[prop];
}
return [node, len];
}, create: function(win) {
win = win || window;
        if (win.getSelection) {
return win.document.createRange();
} else {
return new _747();
}
}, getSelection: function(_748, _749) {
if (_748.getSelection) {
return _748.getSelection();
} else {
var s = new ie.selection(_748);
        if (!_749) {
s._getCurrentSelection();
}
return s;
}
}};
        if (!window.getSelection) {
var ie = _731.ie = {cachedSelection: {}, selection: function(_74a) {
this._ranges = [];
        this.addRange = function(r, _74b) {
        this._ranges.push(r);
                if (!_74b) {
        r._select();
        }
        this.rangeCount = this._ranges.length;
        };
        this.removeAllRanges = function() {
        this._ranges = [];
                this.rangeCount = 0;
        };
        var _74c = function() {
        var r = _74a.document.selection.createRange();
                var type = _74a.document.selection.type.toUpperCase();
                if (type == "CONTROL") {
        return new _747(ie.decomposeControlRange(r));
        } else {
        return new _747(ie.decomposeTextRange(r));
        }
        };
        this.getRangeAt = function(i) {
        return this._ranges[i];
        };
        this._getCurrentSelection = function() {
        this.removeAllRanges();
                var r = _74c();
                if (r) {
        this.addRange(r, true);
                this.isCollapsed = r.collapsed;
        } else {
        this.isCollapsed = true;
        }
        };
}, decomposeControlRange: function(_74d) {
var _74e = _74d.item(0), _74f = _74d.item(_74d.length - 1);
        var _750 = _74e.parentNode, _751 = _74f.parentNode;
        var _752 = _731.getIndex(_74e, _750).o[0];
        var _753 = _731.getIndex(_74f, _751).o[0] + 1;
        return [_750, _752, _751, _753];
}, getEndPoint: function(_754, end) {
var _755 = _754.duplicate();
        _755.collapse(!end);
        var _756 = "EndTo" + (end ? "End" : "Start");
        var _757 = _755.parentElement();
        var _758, _759, _75a;
        if (_757.childNodes.length > 0) {
_72f.every(_757.childNodes, function(node, i) {
var _75b;
        if (node.nodeType != 3) {
_755.moveToElementText(node);
        if (_755.compareEndPoints(_756, _754) > 0) {
if (_75a && _75a.nodeType == 3) {
_758 = _75a;
        _75b = true;
} else {
_758 = _757;
        _759 = i;
        return false;
}
} else {
if (i == _757.childNodes.length - 1) {
_758 = _757;
        _759 = _757.childNodes.length;
        return false;
}
}
} else {
if (i == _757.childNodes.length - 1) {
_758 = node;
        _75b = true;
}
}
if (_75b && _758) {
var _75c = _731.adjacentNoneTextNode(_758)[0];
        if (_75c) {
_758 = _75c.nextSibling;
} else {
_758 = _757.firstChild;
}
var _75d = _731.adjacentNoneTextNode(_758);
        _75c = _75d[0];
        var _75e = _75d[1];
        if (_75c) {
_755.moveToElementText(_75c);
        _755.collapse(false);
} else {
_755.moveToElementText(_757);
}
_755.setEndPoint(_756, _754);
        _759 = _755.text.length - _75e;
        return false;
}
_75a = node;
        return true;
});
} else {
_758 = _757;
        _759 = 0;
}
if (!end && _758.nodeType == 1 && _759 == _758.childNodes.length) {
var _75f = _758.nextSibling;
        if (_75f && _75f.nodeType == 3) {
_758 = _75f;
        _759 = 0;
}
}
return [_758, _759];
}, setEndPoint: function(_760, _761, _762) {
var _763 = _760.duplicate(), node, len;
        if (_761.nodeType != 3) {
if (_762 > 0) {
node = _761.childNodes[_762 - 1];
        if (node) {
if (node.nodeType == 3) {
_761 = node;
        _762 = node.length;
} else {
if (node.nextSibling && node.nextSibling.nodeType == 3) {
_761 = node.nextSibling;
        _762 = 0;
} else {
_763.moveToElementText(node.nextSibling ? node : _761);
        var _764 = node.parentNode;
        var _765 = _764.insertBefore(node.ownerDocument.createTextNode(" "), node.nextSibling);
        _763.collapse(false);
        _764.removeChild(_765);
}
}
}
} else {
_763.moveToElementText(_761);
        _763.collapse(true);
}
}
if (_761.nodeType == 3) {
var _766 = _731.adjacentNoneTextNode(_761);
        var _767 = _766[0];
        len = _766[1];
        if (_767) {
_763.moveToElementText(_767);
        _763.collapse(false);
        if (_767.contentEditable != "inherit") {
len++;
}
} else {
_763.moveToElementText(_761.parentNode);
        _763.collapse(true);
        _763.move("character", 1);
        _763.move("character", - 1);
}
_762 += len;
        if (_762 > 0) {
if (_763.move("character", _762) != _762) {
console.error("Error when moving!");
}
}
}
return _763;
}, decomposeTextRange: function(_768) {
var _769 = ie.getEndPoint(_768);
        var _76a = _769[0], _76b = _769[1];
        var _76c = _769[0], _76d = _769[1];
        if (_768.htmlText.length) {
if (_768.htmlText == _768.text) {
_76d = _76b + _768.text.length;
} else {
_769 = ie.getEndPoint(_768, true);
        _76c = _769[0], _76d = _769[1];
}
}
return [_76a, _76b, _76c, _76d];
}, setRange: function(_76e, _76f, _770, _771, _772, _773) {
var _774 = ie.setEndPoint(_76e, _76f, _770);
        _76e.setEndPoint("StartToStart", _774);
        if (!_773) {
var end = ie.setEndPoint(_76e, _771, _772);
}
_76e.setEndPoint("EndToEnd", end || _774);
        return _76e;
}};
        var _747 = _731.W3CRange = _730(null, {constructor: function() {
        if (arguments.length > 0) {
        this.setStart(arguments[0][0], arguments[0][1]);
                this.setEnd(arguments[0][2], arguments[0][3]);
        } else {
        this.commonAncestorContainer = null;
                this.startContainer = null;
                this.startOffset = 0;
                this.endContainer = null;
                this.endOffset = 0;
                this.collapsed = true;
        }
        }, _updateInternal: function() {
        if (this.startContainer !== this.endContainer) {
        this.commonAncestorContainer = _731.getCommonAncestor(this.startContainer, this.endContainer);
        } else {
        this.commonAncestorContainer = this.startContainer;
        }
        this.collapsed = (this.startContainer === this.endContainer) && (this.startOffset == this.endOffset);
        }, setStart: function(node, _775) {
        _775 = parseInt(_775);
                if (this.startContainer === node && this.startOffset == _775) {
        return;
        }
        delete this._cachedBookmark;
                this.startContainer = node;
                this.startOffset = _775;
                if (!this.endContainer) {
        this.setEnd(node, _775);
        } else {
        this._updateInternal();
        }
        }, setEnd: function(node, _776) {
        _776 = parseInt(_776);
                if (this.endContainer === node && this.endOffset == _776) {
        return;
        }
        delete this._cachedBookmark;
                this.endContainer = node;
                this.endOffset = _776;
                if (!this.startContainer) {
        this.setStart(node, _776);
        } else {
        this._updateInternal();
        }
        }, setStartAfter: function(node, _777) {
        this._setPoint("setStart", node, _777, 1);
        }, setStartBefore: function(node, _778) {
        this._setPoint("setStart", node, _778, 0);
        }, setEndAfter: function(node, _779) {
        this._setPoint("setEnd", node, _779, 1);
        }, setEndBefore: function(node, _77a) {
        this._setPoint("setEnd", node, _77a, 0);
        }, _setPoint: function(what, node, _77b, ext) {
        var _77c = _731.getIndex(node, node.parentNode).o;
                this[what](node.parentNode, _77c.pop() + ext);
        }, _getIERange: function() {
        var r = (this._body || this.endContainer.ownerDocument.body).createTextRange();
                ie.setRange(r, this.startContainer, this.startOffset, this.endContainer, this.endOffset, this.collapsed);
                return r;
        }, getBookmark: function() {
        this._getIERange();
                return this._cachedBookmark;
        }, _select: function() {
        var r = this._getIERange();
                r.select();
        }, deleteContents: function() {
        var s = this.startContainer, r = this._getIERange();
                if (s.nodeType === 3 && !this.startOffset) {
        this.setStartBefore(s);
        }
        r.pasteHTML("");
                this.endContainer = this.startContainer;
                this.endOffset = this.startOffset;
                this.collapsed = true;
        }, cloneRange: function() {
        var r = new _747([this.startContainer, this.startOffset, this.endContainer, this.endOffset]);
                r._body = this._body;
                return r;
        }, detach: function() {
        this._body = null;
                this.commonAncestorContainer = null;
                this.startContainer = null;
                this.startOffset = 0;
                this.endContainer = null;
                this.endOffset = 0;
                this.collapsed = true;
        }});
}
lang.setObject("dijit.range", _731);
        return _731;
});
}, "dijit/_editor/html": function() {
define(["dojo/_base/array", "dojo/_base/lang", "dojo/sniff"], function(_77d, lang, has) {
var _77e = {};
        lang.setObject("dijit._editor.html", _77e);
        var _77f = _77e.escapeXml = function(str, _780) {
        str = str.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;");
                if (!_780) {
        str = str.replace(/'/gm, "&#39;");
        }
        return str;
        };
        _77e.getNodeHtml = function(node) {
        var _781 = [];
                _77e.getNodeHtmlHelper(node, _781);
                return _781.join("");
        };
        _77e.getNodeHtmlHelper = function(node, _782) {
        switch (node.nodeType) {
        case 1:
                var _783 = node.nodeName.toLowerCase();
                if (!_783 || _783.charAt(0) == "/") {
        return "";
        }
        _782.push("<", _783);
                var _784 = [], _785 = {};
                var attr;
                if (has("dom-attributes-explicit") || has("dom-attributes-specified-flag")) {
        var i = 0;
                while ((attr = node.attributes[i++])) {
        var n = attr.name;
                if (n.substr(0, 3) !== "_dj" && (!has("dom-attributes-specified-flag") || attr.specified) && !(n in _785)) {
        var v = attr.value;
                if (n == "src" || n == "href") {
        if (node.getAttribute("_djrealurl")) {
        v = node.getAttribute("_djrealurl");
        }
        }
        if (has("ie") === 8 && n === "style") {
        v = v.replace("HEIGHT:", "height:").replace("WIDTH:", "width:");
        }
        _784.push([n, v]);
                _785[n] = v;
        }
        }
        } else {
        var _786 = /^input$|^img$/i.test(node.nodeName) ? node : node.cloneNode(false);
                var s = _786.outerHTML;
                var _787 = /[\w-]+=("[^"]*"|'[^']*'|\S*)/gi;
                var _788 = s.match(_787);
                s = s.substr(0, s.indexOf(">"));
                _77d.forEach(_788, function(attr) {
                if (attr) {
                var idx = attr.indexOf("=");
                        if (idx > 0) {
                var key = attr.substring(0, idx);
                        if (key.substr(0, 3) != "_dj") {
                if (key == "src" || key == "href") {
                if (node.getAttribute("_djrealurl")) {
                _784.push([key, node.getAttribute("_djrealurl")]);
                        return;
                }
                }
                var val, _789;
                        switch (key) {
                case "style":
                        val = node.style.cssText.toLowerCase();
                        break;
                        case "class":
                        val = node.className;
                        break;
                        case "width":
                        if (_783 === "img") {
                _789 = /width=(\S+)/i.exec(s);
                        if (_789) {
                val = _789[1];
                }
                break;
                }
                case "height":
                        if (_783 === "img") {
                _789 = /height=(\S+)/i.exec(s);
                        if (_789) {
                val = _789[1];
                }
                break;
                }
                default:
                        val = node.getAttribute(key);
                }
                if (val != null) {
                _784.push([key, val.toString()]);
                }
                }
                }
                }
                }, this);
        }
        _784.sort(function(a, b) {
        return a[0] < b[0] ? - 1 : (a[0] == b[0] ? 0 : 1);
        });
                var j = 0;
                while ((attr = _784[j++])) {
        _782.push(" ", attr[0], "=\"", (typeof attr[1] === "string" ? _77f(attr[1], true) : attr[1]), "\"");
        }
        switch (_783) {
        case "br":
                case "hr":
                case "img":
                case "input":
                case "base":
                case "meta":
                case "area":
                case "basefont":
                _782.push(" />");
                break;
                case "script":
                _782.push(">", node.innerHTML, "</", _783, ">");
                break;
                default:
                _782.push(">");
                if (node.hasChildNodes()) {
        _77e.getChildrenHtmlHelper(node, _782);
        }
        _782.push("</", _783, ">");
        }
        break;
                case 4:
                case 3:
                _782.push(_77f(node.nodeValue, true));
                break;
                case 8:
                _782.push("<!--", _77f(node.nodeValue, true), "-->");
                break;
                default:
                _782.push("<!-- Element not recognized - Type: ", node.nodeType, " Name: ", node.nodeName, "-->");
        }
        };
        _77e.getChildrenHtml = function(node) {
        var _78a = [];
                _77e.getChildrenHtmlHelper(node, _78a);
                return _78a.join("");
        };
        _77e.getChildrenHtmlHelper = function(dom, _78b) {
        if (!dom) {
        return;
        }
        var _78c = dom["childNodes"] || dom;
                var _78d = !has("ie") || _78c !== dom;
                var node, i = 0;
                while ((node = _78c[i++])) {
        if (!_78d || node.parentNode == dom) {
        _77e.getNodeHtmlHelper(node, _78b);
        }
        }
        };
        return _77e;
});
}, "dijit/_editor/plugins/FontChoice": function() {
define(["require", "dojo/_base/array", "dojo/_base/declare", "dojo/dom-construct", "dojo/i18n", "dojo/_base/lang", "dojo/store/Memory", "../../registry", "../../_Widget", "../../_TemplatedMixin", "../../_WidgetsInTemplateMixin", "../../form/FilteringSelect", "../_Plugin", "../range", "dojo/i18n!../nls/FontChoice"], function(_78e, _78f, _790, _791, i18n, lang, _792, _793, _794, _795, _796, _797, _798, _799) {
var _79a = _790("dijit._editor.plugins._FontDropDown", [_794, _795, _796], {label: "", plainText: false, templateString: "<span style='white-space: nowrap' class='dijit dijitReset dijitInline'>" + "<label class='dijitLeft dijitInline' for='${selectId}'>${label}</label>" + "<input data-dojo-type='../../form/FilteringSelect' required='false' " + "data-dojo-props='labelType:\"html\", labelAttr:\"label\", searchAttr:\"name\"' " + "class='${comboClass}' " + "tabIndex='-1' id='${selectId}' data-dojo-attach-point='select' value=''/>" + "</span>", contextRequire: _78e, postMixInProperties: function() {
this.inherited(arguments);
        this.strings = i18n.getLocalization("dijit._editor", "FontChoice");
        this.label = this.strings[this.command];
        this.id = _793.getUniqueId(this.declaredClass.replace(/\./g, "_"));
        this.selectId = this.id + "_select";
        this.inherited(arguments);
}, postCreate: function() {
this.select.set("store", new _792({idProperty: "value", data: _78f.map(this.values, function(_79b) {
var name = this.strings[_79b] || _79b;
        return {label: this.getLabel(_79b, name), name: name, value: _79b};
}, this)}));
        this.select.set("value", "", false);
        this.disabled = this.select.get("disabled");
}, _setValueAttr: function(_79c, _79d) {
_79d = _79d !== false;
        this.select.set("value", _78f.indexOf(this.values, _79c) < 0 ? "" : _79c, _79d);
        if (!_79d) {
this.select._lastValueReported = null;
}
}, _getValueAttr: function() {
return this.select.get("value");
}, focus: function() {
this.select.focus();
}, _setDisabledAttr: function(_79e) {
this._set("disabled", _79e);
        this.select.set("disabled", _79e);
}});
        var _79f = _790("dijit._editor.plugins._FontNameDropDown", _79a, {generic: false, command: "fontName", comboClass: "dijitFontNameCombo", postMixInProperties: function() {
        if (!this.values) {
        this.values = this.generic ? ["serif", "sans-serif", "monospace", "cursive", "fantasy"] : ["Arial", "Times New Roman", "Comic Sans MS", "Courier New"];
        }
        this.inherited(arguments);
        }, getLabel: function(_7a0, name) {
        if (this.plainText) {
        return name;
        } else {
        return "<div style='font-family: " + _7a0 + "'>" + name + "</div>";
        }
        }, _setValueAttr: function(_7a1, _7a2) {
        _7a2 = _7a2 !== false;
                if (this.generic) {
        var map = {"Arial": "sans-serif", "Helvetica": "sans-serif", "Myriad": "sans-serif", "Times": "serif", "Times New Roman": "serif", "Comic Sans MS": "cursive", "Apple Chancery": "cursive", "Courier": "monospace", "Courier New": "monospace", "Papyrus": "fantasy", "Estrangelo Edessa": "cursive", "Gabriola": "fantasy"};
                _7a1 = map[_7a1] || _7a1;
        }
        this.inherited(arguments, [_7a1, _7a2]);
        }});
        var _7a3 = _790("dijit._editor.plugins._FontSizeDropDown", _79a, {command: "fontSize", comboClass: "dijitFontSizeCombo", values: [1, 2, 3, 4, 5, 6, 7], getLabel: function(_7a4, name) {
        if (this.plainText) {
        return name;
        } else {
        return "<font size=" + _7a4 + "'>" + name + "</font>";
        }
        }, _setValueAttr: function(_7a5, _7a6) {
        _7a6 = _7a6 !== false;
                if (_7a5.indexOf && _7a5.indexOf("px") != - 1) {
        var _7a7 = parseInt(_7a5, 10);
                _7a5 = {10: 1, 13: 2, 16: 3, 18: 4, 24: 5, 32: 6, 48: 7}[_7a7] || _7a5;
        }
        this.inherited(arguments, [_7a5, _7a6]);
        }});
        var _7a8 = _790("dijit._editor.plugins._FormatBlockDropDown", _79a, {command: "formatBlock", comboClass: "dijitFormatBlockCombo", values: ["noFormat", "p", "h1", "h2", "h3", "pre"], postCreate: function() {
        this.inherited(arguments);
                this.set("value", "noFormat", false);
        }, getLabel: function(_7a9, name) {
        if (this.plainText || _7a9 == "noFormat") {
        return name;
        } else {
        return "<" + _7a9 + ">" + name + "</" + _7a9 + ">";
        }
        }, _execCommand: function(_7aa, _7ab, _7ac) {
        if (_7ac === "noFormat") {
        var _7ad;
                var end;
                var sel = _799.getSelection(_7aa.window);
                if (sel && sel.rangeCount > 0) {
        var _7ae = sel.getRangeAt(0);
                var node, tag;
                if (_7ae) {
        _7ad = _7ae.startContainer;
                end = _7ae.endContainer;
                while (_7ad && _7ad !== _7aa.editNode && _7ad !== _7aa.document.body && _7ad.nodeType !== 1) {
        _7ad = _7ad.parentNode;
        }
        while (end && end !== _7aa.editNode && end !== _7aa.document.body && end.nodeType !== 1) {
        end = end.parentNode;
        }
        var _7af = lang.hitch(this, function(node, ary) {
        if (node.childNodes && node.childNodes.length) {
        var i;
                for (i = 0; i < node.childNodes.length; i++) {
        var c = node.childNodes[i];
                if (c.nodeType == 1) {
        if (_7aa.selection.inSelection(c)) {
        var tag = c.tagName ? c.tagName.toLowerCase() : "";
                if (_78f.indexOf(this.values, tag) !== - 1) {
        ary.push(c);
        }
        _7af(c, ary);
        }
        }
        }
        }
        });
                var _7b0 = lang.hitch(this, function(_7b1) {
                if (_7b1 && _7b1.length) {
                _7aa.beginEditing();
                        while (_7b1.length) {
                this._removeFormat(_7aa, _7b1.pop());
                }
                _7aa.endEditing();
                }
                });
                var _7b2 = [];
                if (_7ad == end) {
        var _7b3;
                node = _7ad;
                while (node && node !== _7aa.editNode && node !== _7aa.document.body) {
        if (node.nodeType == 1) {
        tag = node.tagName ? node.tagName.toLowerCase() : "";
                if (_78f.indexOf(this.values, tag) !== - 1) {
        _7b3 = node;
                break;
        }
        }
        node = node.parentNode;
        }
        _7af(_7ad, _7b2);
                if (_7b3) {
        _7b2 = [_7b3].concat(_7b2);
        }
        _7b0(_7b2);
        } else {
        node = _7ad;
                while (_7aa.selection.inSelection(node)) {
        if (node.nodeType == 1) {
        tag = node.tagName ? node.tagName.toLowerCase() : "";
                if (_78f.indexOf(this.values, tag) !== - 1) {
        _7b2.push(node);
        }
        _7af(node, _7b2);
        }
        node = node.nextSibling;
        }
        _7b0(_7b2);
        }
        _7aa.onDisplayChanged();
        }
        }
        } else {
        _7aa.execCommand(_7ab, _7ac);
        }
        }, _removeFormat: function(_7b4, node) {
        if (_7b4.customUndo) {
        while (node.firstChild) {
        _791.place(node.firstChild, node, "before");
        }
        node.parentNode.removeChild(node);
        } else {
        _7b4.selection.selectElementChildren(node);
                var html = _7b4.selection.getSelectedHtml();
                _7b4.selection.selectElement(node);
                _7b4.execCommand("inserthtml", html || "");
        }
        }});
        var _7b5 = _790("dijit._editor.plugins.FontChoice", _798, {useDefaultCommand: false, _initButton: function() {
        var _7b6 = {fontName: _79f, fontSize: _7a3, formatBlock: _7a8}[this.command], _7b7 = this.params;
                if (this.params.custom) {
        _7b7.values = this.params.custom;
        }
        var _7b8 = this.editor;
                this.button = new _7b6(lang.delegate({dir: _7b8.dir, lang: _7b8.lang}, _7b7));
                this.own(this.button.select.on("change", lang.hitch(this, function(_7b9) {
                if (this.editor.focused) {
                this.editor.focus();
                }
                if (this.command == "fontName" && _7b9.indexOf(" ") != - 1) {
                _7b9 = "'" + _7b9 + "'";
                }
                if (this.button._execCommand) {
                this.button._execCommand(this.editor, this.command, _7b9);
                } else {
                this.editor.execCommand(this.command, _7b9);
                }
                })));
        }, updateState: function() {
        var _7ba = this.editor;
                var _7bb = this.command;
                if (!_7ba || !_7ba.isLoaded || !_7bb.length) {
        return;
        }
        if (this.button) {
        var _7bc = this.get("disabled");
                this.button.set("disabled", _7bc);
                if (_7bc) {
        return;
        }
        var _7bd;
                try {
                _7bd = _7ba.queryCommandValue(_7bb) || "";
                } catch (e) {
        _7bd = "";
        }
        var _7be = lang.isString(_7bd) && _7bd.match(/'([^']*)'/);
                if (_7be) {
        _7bd = _7be[1];
        }
        if (_7bb === "formatBlock") {
        if (!_7bd || _7bd == "p") {
        _7bd = null;
                var elem;
                var sel = _799.getSelection(this.editor.window);
                if (sel && sel.rangeCount > 0) {
        var _7bf = sel.getRangeAt(0);
                if (_7bf) {
        elem = _7bf.endContainer;
        }
        }
        while (elem && elem !== _7ba.editNode && elem !== _7ba.document) {
        var tg = elem.tagName ? elem.tagName.toLowerCase() : "";
                if (tg && _78f.indexOf(this.button.values, tg) > - 1) {
        _7bd = tg;
                break;
        }
        elem = elem.parentNode;
        }
        if (!_7bd) {
        _7bd = "noFormat";
        }
        } else {
        if (_78f.indexOf(this.button.values, _7bd) < 0) {
        _7bd = "noFormat";
        }
        }
        }
        if (_7bd !== this.button.get("value")) {
        this.button.set("value", _7bd, false);
        }
        }
        }});
        _78f.forEach(["fontName", "fontSize", "formatBlock"], function(name) {
        _798.registry[name] = function(args) {
        return new _7b5({command: name, plainText: args.plainText});
        };
        });
        _7b5._FontDropDown = _79a;
        _7b5._FontNameDropDown = _79f;
        _7b5._FontSizeDropDown = _7a3;
        _7b5._FormatBlockDropDown = _7a8;
        return _7b5;
});
}, "dojo/store/Memory": function() {
define(["../_base/declare", "./util/QueryResults", "./util/SimpleQueryEngine"], function(_7c0, _7c1, _7c2) {
var base = null;
        return _7c0("dojo.store.Memory", base, {constructor: function(_7c3) {
        for (var i in _7c3) {
        this[i] = _7c3[i];
        }
        this.setData(this.data || []);
        }, data: null, idProperty: "id", index: null, queryEngine: _7c2, get: function(id) {
        return this.data[this.index[id]];
        }, getIdentity: function(_7c4) {
        return _7c4[this.idProperty];
        }, put: function(_7c5, _7c6) {
        var data = this.data, _7c7 = this.index, _7c8 = this.idProperty;
                var id = _7c5[_7c8] = (_7c6 && "id" in _7c6) ? _7c6.id : _7c8 in _7c5 ? _7c5[_7c8] : Math.random();
                if (id in _7c7) {
        if (_7c6 && _7c6.overwrite === false) {
        throw new Error("Object already exists");
        }
        data[_7c7[id]] = _7c5;
        } else {
        _7c7[id] = data.push(_7c5) - 1;
        }
        return id;
        }, add: function(_7c9, _7ca) {
        (_7ca = _7ca || {}).overwrite = false;
                return this.put(_7c9, _7ca);
        }, remove: function(id) {
        var _7cb = this.index;
                var data = this.data;
                if (id in _7cb) {
        data.splice(_7cb[id], 1);
                this.setData(data);
                return true;
        }
        }, query: function(_7cc, _7cd) {
        return _7c1(this.queryEngine(_7cc, _7cd)(this.data));
        }, setData: function(data) {
        if (data.items) {
        this.idProperty = data.identifier;
                data = this.data = data.items;
        } else {
        this.data = data;
        }
        this.index = {};
                for (var i = 0, l = data.length; i < l; i++) {
        this.index[data[i][this.idProperty]] = i;
        }
        }});
});
}, "dojo/store/util/QueryResults": function() {
define(["../../_base/array", "../../_base/lang", "../../when"], function(_7ce, lang, when) {
var _7cf = function(_7d0) {
if (!_7d0) {
return _7d0;
}
if (_7d0.then) {
_7d0 = lang.delegate(_7d0);
}
function _7d1(_7d2) {
if (!_7d0[_7d2]) {
_7d0[_7d2] = function() {
var args = arguments;
        return when(_7d0, function(_7d3) {
        Array.prototype.unshift.call(args, _7d3);
                return _7cf(_7ce[_7d2].apply(_7ce, args));
        });
};
}
}
;
        _7d1("forEach");
        _7d1("filter");
        _7d1("map");
        if (!_7d0.total) {
_7d0.total = when(_7d0, function(_7d4) {
return _7d4.length;
});
}
return _7d0;
};
        lang.setObject("dojo.store.util.QueryResults", _7cf);
        return _7cf;
});
}, "dojo/store/util/SimpleQueryEngine": function() {
define(["../../_base/array"], function(_7d5) {
return function(_7d6, _7d7) {
switch (typeof _7d6) {
default:
        throw new Error("Can not query with a " + typeof _7d6);
        case "object":
        case "undefined":
        var _7d8 = _7d6;
        _7d6 = function(_7d9) {
        for (var key in _7d8) {
        var _7da = _7d8[key];
                if (_7da && _7da.test) {
        if (!_7da.test(_7d9[key], _7d9)) {
        return false;
        }
        } else {
        if (_7da != _7d9[key]) {
        return false;
        }
        }
        }
        return true;
        };
        break;
        case "string":
        if (!this[_7d6]) {
throw new Error("No filter function " + _7d6 + " was found in store");
}
_7d6 = this[_7d6];
        case "function":
}
function _7db(_7dc) {
var _7dd = _7d5.filter(_7dc, _7d6);
        var _7de = _7d7 && _7d7.sort;
        if (_7de) {
_7dd.sort(typeof _7de == "function" ? _7de : function(a, b) {
for (var sort, i = 0; sort = _7de[i]; i++) {
var _7df = a[sort.attribute];
        var _7e0 = b[sort.attribute];
        if (_7df != _7e0) {
return !!sort.descending == (_7df == null || _7df > _7e0) ? - 1 : 1;
}
}
return 0;
});
}
if (_7d7 && (_7d7.start || _7d7.count)) {
var _7e1 = _7dd.length;
        _7dd = _7dd.slice(_7d7.start || 0, (_7d7.start || 0) + (_7d7.count || Infinity));
        _7dd.total = _7e1;
}
return _7dd;
}
;
        _7db.matches = _7d6;
        return _7db;
};
});
}, "dijit/form/FilteringSelect": function() {
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/when", "./MappedTextBox", "./ComboBoxMixin"], function(_7e2, lang, when, _7e3, _7e4) {
return _7e2("dijit.form.FilteringSelect", [_7e3, _7e4], {required: true, _lastDisplayedValue: "", _isValidSubset: function() {
return this._opened;
}, isValid: function() {
return !!this.item || (!this.required && this.get("displayedValue") == "");
}, _refreshState: function() {
if (!this.searchTimer) {
this.inherited(arguments);
}
}, _callbackSetLabel: function(_7e5, _7e6, _7e7, _7e8) {
if ((_7e6 && _7e6[this.searchAttr] !== this._lastQuery) || (!_7e6 && _7e5.length && this.store.getIdentity(_7e5[0]) != this._lastQuery)) {
return;
}
if (!_7e5.length) {
this.set("value", "", _7e8 || (_7e8 === undefined && !this.focused), this.textbox.value, null);
} else {
this.set("item", _7e5[0], _7e8);
}
}, _openResultList: function(_7e9, _7ea, _7eb) {
if (_7ea[this.searchAttr] !== this._lastQuery) {
return;
}
this.inherited(arguments);
        if (this.item === undefined) {
this.validate(true);
}
}, _getValueAttr: function() {
return this.valueNode.value;
}, _getValueField: function() {
return "value";
}, _setValueAttr: function(_7ec, _7ed, _7ee, item) {
if (!this._onChangeActive) {
_7ed = null;
}
if (item === undefined) {
if (_7ec === null || _7ec === "") {
_7ec = "";
        if (!lang.isString(_7ee)) {
this._setDisplayedValueAttr(_7ee || "", _7ed);
        return;
}
}
var self = this;
        this._lastQuery = _7ec;
        when(this.store.get(_7ec), function(item) {
        self._callbackSetLabel(item ? [item] : [], undefined, undefined, _7ed);
        });
} else {
this.valueNode.value = _7ec;
        this.inherited(arguments);
}
}, _setItemAttr: function(item, _7ef, _7f0) {
this.inherited(arguments);
        this._lastDisplayedValue = this.textbox.value;
}, _getDisplayQueryString: function(text) {
return text.replace(/([\\\*\?])/g, "\\$1");
}, _setDisplayedValueAttr: function(_7f1, _7f2) {
if (_7f1 == null) {
_7f1 = "";
}
if (!this._created) {
if (!("displayedValue" in this.params)) {
return;
}
_7f2 = false;
}
if (this.store) {
this.closeDropDown();
        var _7f3 = lang.clone(this.query);
        var qs = this._getDisplayQueryString(_7f1), q;
        if (this.store._oldAPI) {
q = qs;
} else {
q = this._patternToRegExp(qs);
        q.toString = function() {
        return qs;
        };
}
this._lastQuery = _7f3[this.searchAttr] = q;
        this.textbox.value = _7f1;
        this._lastDisplayedValue = _7f1;
        this._set("displayedValue", _7f1);
        var _7f4 = this;
        var _7f5 = {ignoreCase: this.ignoreCase, deep: true};
        lang.mixin(_7f5, this.fetchProperties);
        this._fetchHandle = this.store.query(_7f3, _7f5);
        when(this._fetchHandle, function(_7f6) {
        _7f4._fetchHandle = null;
                _7f4._callbackSetLabel(_7f6 || [], _7f3, _7f5, _7f2);
        }, function(err) {
        _7f4._fetchHandle = null;
                if (!_7f4._cancelingQuery) {
        console.error("dijit.form.FilteringSelect: " + err.toString());
        }
        });
}
}, undo: function() {
this.set("displayedValue", this._lastDisplayedValue);
}});
});
}, "dijit/form/MappedTextBox": function() {
define(["dojo/_base/declare", "dojo/sniff", "dojo/dom-construct", "./ValidationTextBox"], function(_7f7, has, _7f8, _7f9) {
return _7f7("dijit.form.MappedTextBox", _7f9, {postMixInProperties: function() {
this.inherited(arguments);
        this.nameAttrSetting = "";
}, _setNameAttr: "valueNode", serialize: function(val) {
return val.toString ? val.toString() : "";
}, toString: function() {
var val = this.filter(this.get("value"));
        return val != null ? (typeof val == "string" ? val : this.serialize(val, this.constraints)) : "";
}, validate: function() {
this.valueNode.value = this.toString();
        return this.inherited(arguments);
}, buildRendering: function() {
this.inherited(arguments);
        this.valueNode = _7f8.place("<input type='hidden'" + ((this.name && !has("msapp")) ? " name=\"" + this.name.replace(/"/g, "&quot;") + "\"" : "") + "/>", this.textbox, "after");
}, reset: function() {
this.valueNode.value = "";
        this.inherited(arguments);
}});
});
}, "dijit/form/ValidationTextBox": function() {
define(["dojo/_base/declare", "dojo/_base/kernel", "dojo/i18n", "./TextBox", "../Tooltip", "dojo/text!./templates/ValidationTextBox.html", "dojo/i18n!./nls/validate"], function(_7fa, _7fb, i18n, _7fc, _7fd, _7fe) {
var _7ff;
        return _7ff = _7fa("dijit.form.ValidationTextBox", _7fc, {templateString: _7fe, required: false, promptMessage: "", invalidMessage: "$_unset_$", missingMessage: "$_unset_$", message: "", constraints: {}, pattern: ".*", regExp: "", regExpGen: function() {
        }, state: "", tooltipPosition: [], _deprecateRegExp: function(attr, _800) {
        if (_800 != _7ff.prototype[attr]) {
        _7fb.deprecated("ValidationTextBox id=" + this.id + ", set('" + attr + "', ...) is deprecated.  Use set('pattern', ...) instead.", "", "2.0");
                this.set("pattern", _800);
        }
        }, _setRegExpGenAttr: function(_801) {
        this._deprecateRegExp("regExpGen", _801);
                this._set("regExpGen", this._computeRegexp);
        }, _setRegExpAttr: function(_802) {
        this._deprecateRegExp("regExp", _802);
        }, _setValueAttr: function() {
        this.inherited(arguments);
                this._refreshState();
        }, validator: function(_803, _804) {
        return (new RegExp("^(?:" + this._computeRegexp(_804) + ")" + (this.required ? "" : "?") + "$")).test(_803) && (!this.required || !this._isEmpty(_803)) && (this._isEmpty(_803) || this.parse(_803, _804) !== undefined);
        }, _isValidSubset: function() {
        return this.textbox.value.search(this._partialre) == 0;
        }, isValid: function() {
        return this.validator(this.textbox.value, this.get("constraints"));
        }, _isEmpty: function(_805) {
        return (this.trim ? /^\s*$/ : /^$/).test(_805);
        }, getErrorMessage: function() {
        var _806 = this.invalidMessage == "$_unset_$" ? this.messages.invalidMessage : !this.invalidMessage ? this.promptMessage : this.invalidMessage;
                var _807 = this.missingMessage == "$_unset_$" ? this.messages.missingMessage : !this.missingMessage ? _806 : this.missingMessage;
                return (this.required && this._isEmpty(this.textbox.value)) ? _807 : _806;
        }, getPromptMessage: function() {
        return this.promptMessage;
        }, _maskValidSubsetError: true, validate: function(_808) {
        var _809 = "";
                var _80a = this.disabled || this.isValid(_808);
                if (_80a) {
        this._maskValidSubsetError = true;
        }
        var _80b = this._isEmpty(this.textbox.value);
                var _80c = !_80a && _808 && this._isValidSubset();
                this._set("state", _80a ? "" : (((((!this._hasBeenBlurred || _808) && _80b) || _80c) && (this._maskValidSubsetError || (_80c && !this._hasBeenBlurred && _808))) ? "Incomplete" : "Error"));
                this.focusNode.setAttribute("aria-invalid", _80a ? "false" : "true");
                if (this.state == "Error") {
        this._maskValidSubsetError = _808 && _80c;
                _809 = this.getErrorMessage(_808);
        } else {
        if (this.state == "Incomplete") {
        _809 = this.getPromptMessage(_808);
                this._maskValidSubsetError = !this._hasBeenBlurred || _808;
        } else {
        if (_80b) {
        _809 = this.getPromptMessage(_808);
        }
        }
        }
        this.set("message", _809);
                return _80a;
        }, displayMessage: function(_80d) {
        if (_80d && this.focused) {
        _7fd.show(_80d, this.domNode, this.tooltipPosition, !this.isLeftToRight());
        } else {
        _7fd.hide(this.domNode);
        }
        }, _refreshState: function() {
        if (this._created) {
        this.validate(this.focused);
        }
        this.inherited(arguments);
        }, constructor: function(_80e) {
        this.constraints = {};
                this.baseClass += " dijitValidationTextBox";
        }, startup: function() {
        this.inherited(arguments);
                this._refreshState();
        }, _setConstraintsAttr: function(_80f) {
        if (!_80f.locale && this.lang) {
        _80f.locale = this.lang;
        }
        this._set("constraints", _80f);
                this._refreshState();
        }, _setPatternAttr: function(_810) {
        this._set("pattern", _810);
        }, _computeRegexp: function(_811) {
        var p = this.pattern;
                if (typeof p == "function") {
        p = p.call(this, _811);
        }
        if (p != this._lastRegExp) {
        var _812 = "";
                this._lastRegExp = p;
                if (p != ".*") {
        p.replace(/\\.|\[\]|\[.*?[^\\]{1}\]|\{.*?\}|\(\?[=:!]|./g, function(re) {
        switch (re.charAt(0)) {
        case "{":
                case "+":
                case "?":
                case "*":
                case "^":
                case "$":
                case "|":
                case "(":
                _812 += re;
                break;
                case ")":
                _812 += "|$)";
                break;
                default:
                _812 += "(?:" + re + "|$)";
                break;
        }
        });
        }
        try {
        "".search(_812);
        } catch (e) {
        _812 = this.pattern;
                console.warn("RegExp error in " + this.declaredClass + ": " + this.pattern);
        }
        this._partialre = "^(?:" + _812 + ")$";
        }
        return p;
        }, postMixInProperties: function() {
        this.inherited(arguments);
                this.messages = i18n.getLocalization("dijit.form", "validate", this.lang);
                this._setConstraintsAttr(this.constraints);
        }, _setDisabledAttr: function(_813) {
        this.inherited(arguments);
                this._refreshState();
        }, _setRequiredAttr: function(_814) {
        this._set("required", _814);
                this.focusNode.setAttribute("aria-required", _814);
                this._refreshState();
        }, _setMessageAttr: function(_815) {
        this._set("message", _815);
                this.displayMessage(_815);
        }, reset: function() {
        this._maskValidSubsetError = true;
                this.inherited(arguments);
        }, _onBlur: function() {
        this.displayMessage("");
                this.inherited(arguments);
        }});
});
}, "dijit/form/TextBox": function() {
define(["dojo/_base/declare", "dojo/dom-construct", "dojo/dom-style", "dojo/_base/kernel", "dojo/_base/lang", "dojo/on", "dojo/sniff", "./_FormValueWidget", "./_TextBoxMixin", "dojo/text!./templates/TextBox.html", "../main"], function(_816, _817, _818, _819, lang, on, has, _81a, _81b, _81c, _81d) {
var _81e = _816("dijit.form.TextBox" + (has("dojo-bidi") ? "_NoBidi" : ""), [_81a, _81b], {templateString: _81c, _singleNodeTemplate: "<input class=\"dijit dijitReset dijitLeft dijitInputField\" data-dojo-attach-point=\"textbox,focusNode\" autocomplete=\"off\" type=\"${type}\" ${!nameAttrSetting} />", _buttonInputDisabled: has("ie") ? "disabled" : "", baseClass: "dijitTextBox", postMixInProperties: function() {
var type = this.type.toLowerCase();
        if (this.templateString && this.templateString.toLowerCase() == "input" || ((type == "hidden" || type == "file") && this.templateString == this.constructor.prototype.templateString)) {
this.templateString = this._singleNodeTemplate;
}
this.inherited(arguments);
}, postCreate: function() {
this.inherited(arguments);
        if (has("ie") < 9) {
this.defer(function() {
try {
var s = _818.getComputedStyle(this.domNode);
        if (s) {
var ff = s.fontFamily;
        if (ff) {
var _81f = this.domNode.getElementsByTagName("INPUT");
        if (_81f) {
for (var i = 0; i < _81f.length; i++) {
_81f[i].style.fontFamily = ff;
}
}
}
}
} catch (e) {
}
});
}
}, _setPlaceHolderAttr: function(v) {
this._set("placeHolder", v);
        if (!this._phspan) {
this._attachPoints.push("_phspan");
        this._phspan = _817.create("span", {className: "dijitPlaceHolder dijitInputField"}, this.textbox, "after");
        this.own(on(this._phspan, "mousedown", function(evt) {
        evt.preventDefault();
        }), on(this._phspan, "touchend, MSPointerUp", lang.hitch(this, function() {
        this.focus();
        })));
}
this._phspan.innerHTML = "";
        this._phspan.appendChild(this._phspan.ownerDocument.createTextNode(v));
        this._updatePlaceHolder();
}, _onInput: function(evt) {
this.inherited(arguments);
        this._updatePlaceHolder();
}, _updatePlaceHolder: function() {
if (this._phspan) {
this._phspan.style.display = (this.placeHolder && !this.textbox.value) ? "" : "none";
}
}, _setValueAttr: function(_820, _821, _822) {
this.inherited(arguments);
        this._updatePlaceHolder();
}, getDisplayedValue: function() {
_819.deprecated(this.declaredClass + "::getDisplayedValue() is deprecated. Use get('displayedValue') instead.", "", "2.0");
        return this.get("displayedValue");
}, setDisplayedValue: function(_823) {
_819.deprecated(this.declaredClass + "::setDisplayedValue() is deprecated. Use set('displayedValue', ...) instead.", "", "2.0");
        this.set("displayedValue", _823);
}, _onBlur: function(e) {
if (this.disabled) {
return;
}
this.inherited(arguments);
        this._updatePlaceHolder();
        if (has("mozilla")) {
if (this.selectOnClick) {
this.textbox.selectionStart = this.textbox.selectionEnd = undefined;
}
}
}, _onFocus: function(by) {
if (this.disabled || this.readOnly) {
return;
}
this.inherited(arguments);
        this._updatePlaceHolder();
}});
        if (has("ie")) {
_81e.prototype._isTextSelected = function() {
var _824 = this.ownerDocument.selection.createRange();
        var _825 = _824.parentElement();
        return _825 == this.textbox && _824.text.length > 0;
};
        _81d._setSelectionRange = _81b._setSelectionRange = function(_826, _827, stop) {
        if (_826.createTextRange) {
        var r = _826.createTextRange();
                r.collapse(true);
                r.moveStart("character", - 99999);
                r.moveStart("character", _827);
                r.moveEnd("character", stop - _827);
                r.select();
        }
        };
}
if (has("dojo-bidi")) {
_81e = _816("dijit.form.TextBox", _81e, {_setPlaceHolderAttr: function(v) {
this.inherited(arguments);
        this.applyTextDir(this._phspan);
}});
}
return _81e;
});
}, "dijit/form/_TextBoxMixin": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom", "dojo/has", "dojo/keys", "dojo/_base/lang", "dojo/on", "../main"], function(_828, _829, dom, has, keys, lang, on, _82a) {
var _82b = _829("dijit.form._TextBoxMixin" + (has("dojo-bidi") ? "_NoBidi" : ""), null, {trim: false, uppercase: false, lowercase: false, propercase: false, maxLength: "", selectOnClick: false, placeHolder: "", _getValueAttr: function() {
return this.parse(this.get("displayedValue"), this.constraints);
}, _setValueAttr: function(_82c, _82d, _82e) {
var _82f;
        if (_82c !== undefined) {
_82f = this.filter(_82c);
        if (typeof _82e != "string") {
if (_82f !== null && ((typeof _82f != "number") || !isNaN(_82f))) {
_82e = this.filter(this.format(_82f, this.constraints));
} else {
_82e = "";
}
}
}
if (_82e != null && ((typeof _82e) != "number" || !isNaN(_82e)) && this.textbox.value != _82e) {
this.textbox.value = _82e;
        this._set("displayedValue", this.get("displayedValue"));
}
this.inherited(arguments, [_82f, _82d]);
}, displayedValue: "", _getDisplayedValueAttr: function() {
return this.filter(this.textbox.value);
}, _setDisplayedValueAttr: function(_830) {
if (_830 == null) {
_830 = "";
} else {
if (typeof _830 != "string") {
_830 = String(_830);
}
}
this.textbox.value = _830;
        this._setValueAttr(this.get("value"), undefined);
        this._set("displayedValue", this.get("displayedValue"));
}, format: function(_831) {
return _831 == null ? "" : (_831.toString ? _831.toString() : _831);
}, parse: function(_832) {
return _832;
}, _refreshState: function() {
}, onInput: function() {
}, __skipInputEvent: false, _onInput: function(evt) {
this._processInput(evt);
        if (this.intermediateChanges) {
this.defer(function() {
this._handleOnChange(this.get("value"), false);
});
}
}, _processInput: function(evt) {
this._refreshState();
        this._set("displayedValue", this.get("displayedValue"));
}, postCreate: function() {
this.textbox.setAttribute("value", this.textbox.value);
        this.inherited(arguments);
        var _833 = function(e) {
        var _834;
                if (e.type == "keydown") {
        _834 = e.keyCode;
                switch (_834) {
        case keys.SHIFT:
                case keys.ALT:
                case keys.CTRL:
                case keys.META:
                case keys.CAPS_LOCK:
                case keys.NUM_LOCK:
                case keys.SCROLL_LOCK:
                return;
        }
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        switch (_834) {
        case keys.NUMPAD_0:
                case keys.NUMPAD_1:
                case keys.NUMPAD_2:
                case keys.NUMPAD_3:
                case keys.NUMPAD_4:
                case keys.NUMPAD_5:
                case keys.NUMPAD_6:
                case keys.NUMPAD_7:
                case keys.NUMPAD_8:
                case keys.NUMPAD_9:
                case keys.NUMPAD_MULTIPLY:
                case keys.NUMPAD_PLUS:
                case keys.NUMPAD_ENTER:
                case keys.NUMPAD_MINUS:
                case keys.NUMPAD_PERIOD:
                case keys.NUMPAD_DIVIDE:
                return;
        }
        if ((_834 >= 65 && _834 <= 90) || (_834 >= 48 && _834 <= 57) || _834 == keys.SPACE) {
        return;
        }
        var _835 = false;
                for (var i in keys) {
        if (keys[i] === e.keyCode) {
        _835 = true;
                break;
        }
        }
        if (!_835) {
        return;
        }
        }
        }
        _834 = e.charCode >= 32 ? String.fromCharCode(e.charCode) : e.charCode;
                if (!_834) {
        _834 = (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == keys.SPACE ? String.fromCharCode(e.keyCode) : e.keyCode;
        }
        if (!_834) {
        _834 = 229;
        }
        if (e.type == "keypress") {
        if (typeof _834 != "string") {
        return;
        }
        if ((_834 >= "a" && _834 <= "z") || (_834 >= "A" && _834 <= "Z") || (_834 >= "0" && _834 <= "9") || (_834 === " ")) {
        if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
        }
        }
        }
        if (e.type == "input") {
        if (this.__skipInputEvent) {
        this.__skipInputEvent = false;
                return;
        }
        } else {
        this.__skipInputEvent = true;
        }
        var faux = {faux: true}, attr;
                for (attr in e) {
        if (attr != "layerX" && attr != "layerY") {
        var v = e[attr];
                if (typeof v != "function" && typeof v != "undefined") {
        faux[attr] = v;
        }
        }
        }
        lang.mixin(faux, {charOrCode: _834, _wasConsumed: false, preventDefault: function() {
        faux._wasConsumed = true;
                e.preventDefault();
        }, stopPropagation: function() {
        e.stopPropagation();
        }});
                if (this.onInput(faux) === false) {
        faux.preventDefault();
                faux.stopPropagation();
        }
        if (faux._wasConsumed) {
        return;
        }
        this.defer(function() {
        this._onInput(faux);
        });
                if (e.type == "keypress") {
        e.stopPropagation();
        }
        };
        this.own(on(this.textbox, "keydown, keypress, paste, cut, input, compositionend", lang.hitch(this, _833)));
}, _blankValue: "", filter: function(val) {
if (val === null) {
return this._blankValue;
}
if (typeof val != "string") {
return val;
}
if (this.trim) {
val = lang.trim(val);
}
if (this.uppercase) {
val = val.toUpperCase();
}
if (this.lowercase) {
val = val.toLowerCase();
}
if (this.propercase) {
val = val.replace(/[^\s]+/g, function(word) {
return word.substring(0, 1).toUpperCase() + word.substring(1);
});
}
return val;
}, _setBlurValue: function() {
this._setValueAttr(this.get("value"), true);
}, _onBlur: function(e) {
if (this.disabled) {
return;
}
this._setBlurValue();
        this.inherited(arguments);
}, _isTextSelected: function() {
return this.textbox.selectionStart != this.textbox.selectionEnd;
}, _onFocus: function(by) {
if (this.disabled || this.readOnly) {
return;
}
if (this.selectOnClick && by == "mouse") {
this._selectOnClickHandle = on.once(this.domNode, "mouseup, touchend", lang.hitch(this, function(evt) {
if (!this._isTextSelected()) {
_82b.selectInputText(this.textbox);
}
}));
        this.own(this._selectOnClickHandle);
        this.defer(function() {
        if (this._selectOnClickHandle) {
        this._selectOnClickHandle.remove();
                this._selectOnClickHandle = null;
        }
        }, 500);
}
this.inherited(arguments);
        this._refreshState();
}, reset: function() {
this.textbox.value = "";
        this.inherited(arguments);
}});
        if (has("dojo-bidi")) {
_82b = _829("dijit.form._TextBoxMixin", _82b, {_setValueAttr: function() {
this.inherited(arguments);
        this.applyTextDir(this.focusNode);
}, _setDisplayedValueAttr: function() {
this.inherited(arguments);
        this.applyTextDir(this.focusNode);
}, _onInput: function() {
this.applyTextDir(this.focusNode);
        this.inherited(arguments);
}});
}
_82b._setSelectionRange = _82a._setSelectionRange = function(_836, _837, stop) {
if (_836.setSelectionRange) {
_836.setSelectionRange(_837, stop);
}
};
        _82b.selectInputText = _82a.selectInputText = function(_838, _839, stop) {
        _838 = dom.byId(_838);
                if (isNaN(_839)) {
        _839 = 0;
        }
        if (isNaN(stop)) {
        stop = _838.value ? _838.value.length : 0;
        }
        try {
        _838.focus();
                _82b._setSelectionRange(_838, _839, stop);
        } catch (e) {
        }
        };
        return _82b;
});
}, "dijit/Tooltip": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/_base/fx", "dojo/dom", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/lang", "dojo/mouse", "dojo/on", "dojo/sniff", "./_base/manager", "./place", "./_Widget", "./_TemplatedMixin", "./BackgroundIframe", "dojo/text!./templates/Tooltip.html", "./main"], function(_83a, _83b, fx, dom, _83c, _83d, _83e, lang, _83f, on, has, _840, _841, _842, _843, _844, _845, _846) {
var _847 = _83b("dijit._MasterTooltip", [_842, _843], {duration: _840.defaultDuration, templateString: _845, postCreate: function() {
this.ownerDocumentBody.appendChild(this.domNode);
        this.bgIframe = new _844(this.domNode);
        this.fadeIn = fx.fadeIn({node: this.domNode, duration: this.duration, onEnd: lang.hitch(this, "_onShow")});
        this.fadeOut = fx.fadeOut({node: this.domNode, duration: this.duration, onEnd: lang.hitch(this, "_onHide")});
}, show: function(_848, _849, _84a, rtl, _84b) {
if (this.aroundNode && this.aroundNode === _849 && this.containerNode.innerHTML == _848) {
return;
}
if (this.fadeOut.status() == "playing") {
this._onDeck = arguments;
        return;
}
this.containerNode.innerHTML = _848;
        if (_84b) {
this.set("textDir", _84b);
}
this.containerNode.align = rtl ? "right" : "left";
        var pos = _841.around(this.domNode, _849, _84a && _84a.length ? _84a : _84c.defaultPosition, !rtl, lang.hitch(this, "orient"));
        var _84d = pos.aroundNodePos;
        if (pos.corner.charAt(0) == "M" && pos.aroundCorner.charAt(0) == "M") {
this.connectorNode.style.top = _84d.y + ((_84d.h - this.connectorNode.offsetHeight) >> 1) - pos.y + "px";
        this.connectorNode.style.left = "";
} else {
if (pos.corner.charAt(1) == "M" && pos.aroundCorner.charAt(1) == "M") {
this.connectorNode.style.left = _84d.x + ((_84d.w - this.connectorNode.offsetWidth) >> 1) - pos.x + "px";
} else {
this.connectorNode.style.left = "";
        this.connectorNode.style.top = "";
}
}
_83e.set(this.domNode, "opacity", 0);
        this.fadeIn.play();
        this.isShowingNow = true;
        this.aroundNode = _849;
}, orient: function(node, _84e, _84f, _850, _851) {
this.connectorNode.style.top = "";
        var _852 = _850.h, _853 = _850.w;
        node.className = "dijitTooltip " + {"MR-ML": "dijitTooltipRight", "ML-MR": "dijitTooltipLeft", "TM-BM": "dijitTooltipAbove", "BM-TM": "dijitTooltipBelow", "BL-TL": "dijitTooltipBelow dijitTooltipABLeft", "TL-BL": "dijitTooltipAbove dijitTooltipABLeft", "BR-TR": "dijitTooltipBelow dijitTooltipABRight", "TR-BR": "dijitTooltipAbove dijitTooltipABRight", "BR-BL": "dijitTooltipRight", "BL-BR": "dijitTooltipLeft"}[_84e + "-" + _84f];
        this.domNode.style.width = "auto";
        var size = _83d.position(this.domNode);
        if (has("ie") == 9) {
size.w += 2;
}
var _854 = Math.min((Math.max(_853, 1)), size.w);
        _83d.setMarginBox(this.domNode, {w: _854});
        if (_84f.charAt(0) == "B" && _84e.charAt(0) == "B") {
var bb = _83d.position(node);
        var _855 = this.connectorNode.offsetHeight;
        if (bb.h > _852) {
var _856 = _852 - ((_851.h + _855) >> 1);
        this.connectorNode.style.top = _856 + "px";
        this.connectorNode.style.bottom = "";
} else {
this.connectorNode.style.bottom = Math.min(Math.max(_851.h / 2 - _855 / 2, 0), bb.h - _855) + "px";
        this.connectorNode.style.top = "";
}
} else {
this.connectorNode.style.top = "";
        this.connectorNode.style.bottom = "";
}
return Math.max(0, size.w - _853);
}, _onShow: function() {
if (has("ie")) {
this.domNode.style.filter = "";
}
}, hide: function(_857) {
if (this._onDeck && this._onDeck[1] == _857) {
this._onDeck = null;
} else {
if (this.aroundNode === _857) {
this.fadeIn.stop();
        this.isShowingNow = false;
        this.aroundNode = null;
        this.fadeOut.play();
} else {
}
}
}, _onHide: function() {
this.domNode.style.cssText = "";
        this.containerNode.innerHTML = "";
        if (this._onDeck) {
this.show.apply(this, this._onDeck);
        this._onDeck = null;
}
}});
        if (has("dojo-bidi")) {
_847.extend({_setAutoTextDir: function(node) {
this.applyTextDir(node);
        _83a.forEach(node.children, function(_858) {
        this._setAutoTextDir(_858);
        }, this);
}, _setTextDirAttr: function(_859) {
this._set("textDir", _859);
        if (_859 == "auto") {
this._setAutoTextDir(this.containerNode);
} else {
this.containerNode.dir = this.textDir;
}
}});
}
_846.showTooltip = function(_85a, _85b, _85c, rtl, _85d) {
if (_85c) {
_85c = _83a.map(_85c, function(val) {
return {after: "after-centered", before: "before-centered"}[val] || val;
});
}
if (!_84c._masterTT) {
_846._masterTT = _84c._masterTT = new _847();
}
return _84c._masterTT.show(_85a, _85b, _85c, rtl, _85d);
};
        _846.hideTooltip = function(_85e) {
        return _84c._masterTT && _84c._masterTT.hide(_85e);
        };
        var _84c = _83b("dijit.Tooltip", _842, {label: "", showDelay: 400, connectId: [], position: [], selector: "", _setConnectIdAttr: function(_85f) {
        _83a.forEach(this._connections || [], function(_860) {
        _83a.forEach(_860, function(_861) {
        _861.remove();
        });
        }, this);
                this._connectIds = _83a.filter(lang.isArrayLike(_85f) ? _85f : (_85f ? [_85f] : []), function(id) {
                return dom.byId(id, this.ownerDocument);
                }, this);
                this._connections = _83a.map(this._connectIds, function(id) {
                var node = dom.byId(id, this.ownerDocument), _862 = this.selector, _863 = _862 ? function(_864) {
                return on.selector(_862, _864);
                } : function(_865) {
                return _865;
                }, self = this;
                        return [on(node, _863(_83f.enter), function() {
                        self._onHover(this);
                        }), on(node, _863("focusin"), function() {
                        self._onHover(this);
                        }), on(node, _863(_83f.leave), lang.hitch(self, "_onUnHover")), on(node, _863("focusout"), lang.hitch(self, "_onUnHover"))];
                }, this);
                this._set("connectId", _85f);
        }, addTarget: function(node) {
        var id = node.id || node;
                if (_83a.indexOf(this._connectIds, id) == - 1) {
        this.set("connectId", this._connectIds.concat(id));
        }
        }, removeTarget: function(node) {
        var id = node.id || node, idx = _83a.indexOf(this._connectIds, id);
                if (idx >= 0) {
        this._connectIds.splice(idx, 1);
                this.set("connectId", this._connectIds);
        }
        }, buildRendering: function() {
        this.inherited(arguments);
                _83c.add(this.domNode, "dijitTooltipData");
        }, startup: function() {
        this.inherited(arguments);
                var ids = this.connectId;
                _83a.forEach(lang.isArrayLike(ids) ? ids : [ids], this.addTarget, this);
        }, getContent: function(node) {
        return this.label || this.domNode.innerHTML;
        }, _onHover: function(_866) {
        if (!this._showTimer) {
        this._showTimer = this.defer(function() {
        this.open(_866);
        }, this.showDelay);
        }
        }, _onUnHover: function() {
        if (this._showTimer) {
        this._showTimer.remove();
                delete this._showTimer;
        }
        this.close();
        }, open: function(_867) {
        if (this._showTimer) {
        this._showTimer.remove();
                delete this._showTimer;
        }
        var _868 = this.getContent(_867);
                if (!_868) {
        return;
        }
        _84c.show(_868, _867, this.position, !this.isLeftToRight(), this.textDir);
                this._connectNode = _867;
                this.onShow(_867, this.position);
        }, close: function() {
        if (this._connectNode) {
        _84c.hide(this._connectNode);
                delete this._connectNode;
                this.onHide();
        }
        if (this._showTimer) {
        this._showTimer.remove();
                delete this._showTimer;
        }
        }, onShow: function() {
        }, onHide: function() {
        }, destroy: function() {
        this.close();
                _83a.forEach(this._connections || [], function(_869) {
                _83a.forEach(_869, function(_86a) {
                _86a.remove();
                });
                }, this);
                this.inherited(arguments);
        }});
        _84c._MasterTooltip = _847;
        _84c.show = _846.showTooltip;
        _84c.hide = _846.hideTooltip;
        _84c.defaultPosition = ["after-centered", "before-centered"];
        return _84c;
});
}, "dijit/form/ComboBoxMixin": function() {
define(["dojo/_base/declare", "dojo/Deferred", "dojo/_base/kernel", "dojo/_base/lang", "dojo/store/util/QueryResults", "./_AutoCompleterMixin", "./_ComboBoxMenu", "../_HasDropDown", "dojo/text!./templates/DropDownBox.html"], function(_86b, _86c, _86d, lang, _86e, _86f, _870, _871, _872) {
return _86b("dijit.form.ComboBoxMixin", [_871, _86f], {dropDownClass: _870, hasDownArrow: true, templateString: _872, baseClass: "dijitTextBox dijitComboBox", cssStateNodes: {"_buttonNode": "dijitDownArrowButton"}, _setHasDownArrowAttr: function(val) {
this._set("hasDownArrow", val);
        this._buttonNode.style.display = val ? "" : "none";
}, _showResultList: function() {
this.displayMessage("");
        this.inherited(arguments);
}, _setStoreAttr: function(_873) {
if (!_873.get) {
lang.mixin(_873, {_oldAPI: true, get: function(id) {
var _874 = new _86c();
        this.fetchItemByIdentity({identity: id, onItem: function(_875) {
        _874.resolve(_875);
        }, onError: function(_876) {
        _874.reject(_876);
        }});
        return _874.promise;
}, query: function(_877, _878) {
var _879 = new _86c(function() {
_87a.abort && _87a.abort();
});
        _879.total = new _86c();
        var _87a = this.fetch(lang.mixin({query: _877, onBegin: function(_87b) {
        _879.total.resolve(_87b);
        }, onComplete: function(_87c) {
        _879.resolve(_87c);
        }, onError: function(_87d) {
        _879.reject(_87d);
        }}, _878));
        return _86e(_879);
}});
}
this._set("store", _873);
}, postMixInProperties: function() {
var _87e = this.params.store || this.store;
        if (_87e) {
this._setStoreAttr(_87e);
}
this.inherited(arguments);
        if (!this.params.store && !this.store._oldAPI) {
var _87f = this.declaredClass;
        lang.mixin(this.store, {getValue: function(item, attr) {
        _86d.deprecated(_87f + ".store.getValue(item, attr) is deprecated for builtin store.  Use item.attr directly", "", "2.0");
                return item[attr];
        }, getLabel: function(item) {
        _86d.deprecated(_87f + ".store.getLabel(item) is deprecated for builtin store.  Use item.label directly", "", "2.0");
                return item.name;
        }, fetch: function(args) {
        _86d.deprecated(_87f + ".store.fetch() is deprecated for builtin store.", "Use store.query()", "2.0");
                var shim = ["dojo/data/ObjectStore"];
                require(shim, lang.hitch(this, function(_880) {
                new _880({objectStore: this}).fetch(args);
                }));
        }});
}
}});
});
}, "dijit/form/_AutoCompleterMixin": function() {
define(["dojo/aspect", "dojo/_base/declare", "dojo/dom-attr", "dojo/keys", "dojo/_base/lang", "dojo/query", "dojo/regexp", "dojo/sniff", "./DataList", "./_TextBoxMixin", "./_SearchMixin"], function(_881, _882, _883, keys, lang, _884, _885, has, _886, _887, _888) {
var _889 = _882("dijit.form._AutoCompleterMixin", _888, {item: null, autoComplete: true, highlightMatch: "first", labelAttr: "", labelType: "text", maxHeight: - 1, _stopClickEvents: false, _getCaretPos: function(_88a) {
var pos = 0;
        if (typeof (_88a.selectionStart) == "number") {
pos = _88a.selectionStart;
} else {
if (has("ie")) {
var tr = _88a.ownerDocument.selection.createRange().duplicate();
        var ntr = _88a.createTextRange();
        tr.move("character", 0);
        ntr.move("character", 0);
        try {
        ntr.setEndPoint("EndToEnd", tr);
                pos = String(ntr.text).replace(/\r/g, "").length;
        } catch (e) {
}
}
}
return pos;
}, _setCaretPos: function(_88b, _88c) {
_88c = parseInt(_88c);
        _887.selectInputText(_88b, _88c, _88c);
}, _setDisabledAttr: function(_88d) {
this.inherited(arguments);
        this.domNode.setAttribute("aria-disabled", _88d ? "true" : "false");
}, _onKey: function(evt) {
if (evt.charCode >= 32) {
return;
}
var key = evt.charCode || evt.keyCode;
        if (key == keys.ALT || key == keys.CTRL || key == keys.META || key == keys.SHIFT) {
return;
}
var pw = this.dropDown;
        var _88e = null;
        this._abortQuery();
        this.inherited(arguments);
        if (evt.altKey || evt.ctrlKey || evt.metaKey) {
return;
}
if (this._opened) {
_88e = pw.getHighlightedOption();
}
switch (key) {
case keys.PAGE_DOWN:
        case keys.DOWN_ARROW:
        case keys.PAGE_UP:
        case keys.UP_ARROW:
        if (this._opened) {
this._announceOption(_88e);
}
evt.stopPropagation();
        evt.preventDefault();
        break;
        case keys.ENTER:
        if (_88e) {
if (_88e == pw.nextButton) {
this._nextSearch(1);
        evt.stopPropagation();
        evt.preventDefault();
        break;
} else {
if (_88e == pw.previousButton) {
this._nextSearch( - 1);
        evt.stopPropagation();
        evt.preventDefault();
        break;
}
}
evt.stopPropagation();
        evt.preventDefault();
} else {
this._setBlurValue();
        this._setCaretPos(this.focusNode, this.focusNode.value.length);
}
case keys.TAB:
        var _88f = this.get("displayedValue");
        if (pw && (_88f == pw._messages["previousMessage"] || _88f == pw._messages["nextMessage"])) {
break;
}
if (_88e) {
this._selectOption(_88e);
}
case keys.ESCAPE:
        if (this._opened) {
this._lastQuery = null;
        this.closeDropDown();
}
break;
}
}, _autoCompleteText: function(text) {
var fn = this.focusNode;
        _887.selectInputText(fn, fn.value.length);
        var _890 = this.ignoreCase ? "toLowerCase" : "substr";
        if (text[_890](0).indexOf(this.focusNode.value[_890](0)) == 0) {
var cpos = this.autoComplete ? this._getCaretPos(fn) : fn.value.length;
        if ((cpos + 1) > fn.value.length) {
fn.value = text;
        _887.selectInputText(fn, cpos);
}
} else {
fn.value = text;
        _887.selectInputText(fn);
}
}, _openResultList: function(_891, _892, _893) {
var _894 = this.dropDown.getHighlightedOption();
        this.dropDown.clearResultList();
        if (!_891.length && _893.start == 0) {
this.closeDropDown();
        return;
}
this._nextSearch = this.dropDown.onPage = lang.hitch(this, function(_895) {
_891.nextPage(_895 !== - 1);
        this.focus();
});
        this.dropDown.createOptions(_891, _893, lang.hitch(this, "_getMenuLabelFromItem"));
        this._showResultList();
        if ("direction" in _893) {
if (_893.direction) {
this.dropDown.highlightFirstOption();
} else {
if (!_893.direction) {
this.dropDown.highlightLastOption();
}
}
if (_894) {
this._announceOption(this.dropDown.getHighlightedOption());
}
} else {
if (this.autoComplete && !this._prev_key_backspace && !/^[*]+$/.test(_892[this.searchAttr].toString())) {
this._announceOption(this.dropDown.containerNode.firstChild.nextSibling);
}
}
}, _showResultList: function() {
this.closeDropDown(true);
        this.openDropDown();
        this.domNode.setAttribute("aria-expanded", "true");
}, loadDropDown: function() {
this._startSearchAll();
}, isLoaded: function() {
return false;
}, closeDropDown: function() {
this._abortQuery();
        if (this._opened) {
this.inherited(arguments);
        this.domNode.setAttribute("aria-expanded", "false");
}
}, _setBlurValue: function() {
var _896 = this.get("displayedValue");
        var pw = this.dropDown;
        if (pw && (_896 == pw._messages["previousMessage"] || _896 == pw._messages["nextMessage"])) {
this._setValueAttr(this._lastValueReported, true);
} else {
if (typeof this.item == "undefined") {
this.item = null;
        this.set("displayedValue", _896);
} else {
if (this.value != this._lastValueReported) {
this._handleOnChange(this.value, true);
}
this._refreshState();
}
}
this.focusNode.removeAttribute("aria-activedescendant");
}, _setItemAttr: function(item, _897, _898) {
var _899 = "";
        if (item) {
if (!_898) {
_898 = this.store._oldAPI ? this.store.getValue(item, this.searchAttr) : item[this.searchAttr];
}
_899 = this._getValueField() != this.searchAttr ? this.store.getIdentity(item) : _898;
}
this.set("value", _899, _897, _898, item);
}, _announceOption: function(node) {
if (!node) {
return;
}
var _89a;
        if (node == this.dropDown.nextButton || node == this.dropDown.previousButton) {
_89a = node.innerHTML;
        this.item = undefined;
        this.value = "";
} else {
var item = this.dropDown.items[node.getAttribute("item")];
        _89a = (this.store._oldAPI ? this.store.getValue(item, this.searchAttr) : item[this.searchAttr]).toString();
        this.set("item", item, false, _89a);
}
this.focusNode.value = this.focusNode.value.substring(0, this._lastInput.length);
        this.focusNode.setAttribute("aria-activedescendant", _883.get(node, "id"));
        this._autoCompleteText(_89a);
}, _selectOption: function(_89b) {
this.closeDropDown();
        if (_89b) {
this._announceOption(_89b);
}
this._setCaretPos(this.focusNode, this.focusNode.value.length);
        this._handleOnChange(this.value, true);
        this.focusNode.removeAttribute("aria-activedescendant");
}, _startSearchAll: function() {
this._startSearch("");
}, _startSearchFromInput: function() {
this.item = undefined;
        this.inherited(arguments);
}, _startSearch: function(key) {
if (!this.dropDown) {
var _89c = this.id + "_popup", _89d = lang.isString(this.dropDownClass) ? lang.getObject(this.dropDownClass, false) : this.dropDownClass;
        this.dropDown = new _89d({onChange: lang.hitch(this, this._selectOption), id: _89c, dir: this.dir, textDir: this.textDir});
}
this._lastInput = key;
        this.inherited(arguments);
}, _getValueField: function() {
return this.searchAttr;
}, postMixInProperties: function() {
this.inherited(arguments);
        if (!this.store) {
var _89e = this.srcNodeRef;
        this.store = new _886({}, _89e);
        if (!("value" in this.params)) {
var item = (this.item = this.store.fetchSelectedItem());
        if (item) {
var _89f = this._getValueField();
        this.value = this.store._oldAPI ? this.store.getValue(item, _89f) : item[_89f];
}
}
}
}, postCreate: function() {
var _8a0 = _884("label[for=\"" + this.id + "\"]");
        if (_8a0.length) {
if (!_8a0[0].id) {
_8a0[0].id = this.id + "_label";
}
this.domNode.setAttribute("aria-labelledby", _8a0[0].id);
}
this.inherited(arguments);
        _881.after(this, "onSearch", lang.hitch(this, "_openResultList"), true);
}, _getMenuLabelFromItem: function(item) {
var _8a1 = this.labelFunc(item, this.store), _8a2 = this.labelType;
        if (this.highlightMatch != "none" && this.labelType == "text" && this._lastInput) {
_8a1 = this.doHighlight(_8a1, this._lastInput);
        _8a2 = "html";
}
return {html: _8a2 == "html", label: _8a1};
}, doHighlight: function(_8a3, find) {
var _8a4 = (this.ignoreCase ? "i" : "") + (this.highlightMatch == "all" ? "g" : ""), i = this.queryExpr.indexOf("${0}");
        find = _885.escapeString(find);
        return this._escapeHtml(_8a3.replace(new RegExp((i == 0 ? "^" : "") + "(" + find + ")" + (i == (this.queryExpr.length - 4) ? "$" : ""), _8a4), "\uffff$1\uffff")).replace(/\uFFFF([^\uFFFF]+)\uFFFF/g, "<span class=\"dijitComboBoxHighlightMatch\">$1</span>");
}, _escapeHtml: function(str) {
str = String(str).replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;");
        return str;
}, reset: function() {
this.item = null;
        this.inherited(arguments);
}, labelFunc: function(item, _8a5) {
return (_8a5._oldAPI ? _8a5.getValue(item, this.labelAttr || this.searchAttr) : item[this.labelAttr || this.searchAttr]).toString();
}, _setValueAttr: function(_8a6, _8a7, _8a8, item) {
this._set("item", item || null);
        if (_8a6 == null) {
_8a6 = "";
}
this.inherited(arguments);
}});
        if (has("dojo-bidi")) {
_889.extend({_setTextDirAttr: function(_8a9) {
this.inherited(arguments);
        if (this.dropDown) {
this.dropDown._set("textDir", _8a9);
}
}});
}
return _889;
});
}, "dijit/form/DataList": function() {
define(["dojo/_base/declare", "dojo/dom", "dojo/_base/lang", "dojo/query", "dojo/store/Memory", "../registry"], function(_8aa, dom, lang, _8ab, _8ac, _8ad) {
function _8ae(_8af) {
return {id: _8af.value, value: _8af.value, name: lang.trim(_8af.innerText || _8af.textContent || "")};
}
;
        return _8aa("dijit.form.DataList", _8ac, {constructor: function(_8b0, _8b1) {
        this.domNode = dom.byId(_8b1);
                lang.mixin(this, _8b0);
                if (this.id) {
        _8ad.add(this);
        }
        this.domNode.style.display = "none";
                this.inherited(arguments, [{data: _8ab("option", this.domNode).map(_8ae)}]);
        }, destroy: function() {
        _8ad.remove(this.id);
        }, fetchSelectedItem: function() {
        var _8b2 = _8ab("> option[selected]", this.domNode)[0] || _8ab("> option", this.domNode)[0];
                return _8b2 && _8ae(_8b2);
        }});
});
}, "dijit/form/_SearchMixin": function() {
define(["dojo/_base/declare", "dojo/keys", "dojo/_base/lang", "dojo/query", "dojo/string", "dojo/when", "../registry"], function(_8b3, keys, lang, _8b4, _8b5, when, _8b6) {
return _8b3("dijit.form._SearchMixin", null, {pageSize: Infinity, store: null, fetchProperties: {}, query: {}, searchDelay: 200, searchAttr: "name", queryExpr: "${0}*", ignoreCase: true, _patternToRegExp: function(_8b7) {
return new RegExp("^" + _8b7.replace(/(\\.)|(\*)|(\?)|\W/g, function(str, _8b8, star, _8b9) {
return star ? ".*" : _8b9 ? "." : _8b8 ? _8b8 : "\\" + str;
}) + "$", this.ignoreCase ? "mi" : "m");
}, _abortQuery: function() {
if (this.searchTimer) {
this.searchTimer = this.searchTimer.remove();
}
if (this._queryDeferHandle) {
this._queryDeferHandle = this._queryDeferHandle.remove();
}
if (this._fetchHandle) {
if (this._fetchHandle.abort) {
this._cancelingQuery = true;
        this._fetchHandle.abort();
        this._cancelingQuery = false;
}
if (this._fetchHandle.cancel) {
this._cancelingQuery = true;
        this._fetchHandle.cancel();
        this._cancelingQuery = false;
}
this._fetchHandle = null;
}
}, _processInput: function(evt) {
if (this.disabled || this.readOnly) {
return;
}
var key = evt.charOrCode;
        if ("type" in evt && evt.type.substring(0, 3) == "key" && (evt.altKey || ((evt.ctrlKey || evt.metaKey) && (key != "x" && key != "v")) || key == keys.SHIFT)) {
return;
}
var _8ba = false;
        this._prev_key_backspace = false;
        switch (key) {
case keys.DELETE:
        case keys.BACKSPACE:
        this._prev_key_backspace = true;
        this._maskValidSubsetError = true;
        _8ba = true;
        break;
        default:
        _8ba = typeof key == "string" || key == 229;
}
if (_8ba) {
if (!this.store) {
this.onSearch();
} else {
this.searchTimer = this.defer("_startSearchFromInput", 1);
}
}
}, onSearch: function() {
}, _startSearchFromInput: function() {
this._startSearch(this.focusNode.value);
}, _startSearch: function(text) {
this._abortQuery();
        var _8bb = this, _8b4 = lang.clone(this.query), _8bc = {start: 0, count: this.pageSize, queryOptions: {ignoreCase: this.ignoreCase, deep: true}}, qs = _8b5.substitute(this.queryExpr, [text.replace(/([\\\*\?])/g, "\\$1")]), q, _8bd = function() {
var _8be = _8bb._fetchHandle = _8bb.store.query(_8b4, _8bc);
        if (_8bb.disabled || _8bb.readOnly || (q !== _8bb._lastQuery)) {
return;
}
when(_8be, function(res) {
_8bb._fetchHandle = null;
        if (!_8bb.disabled && !_8bb.readOnly && (q === _8bb._lastQuery)) {
when(_8be.total, function(_8bf) {
res.total = _8bf;
        var _8c0 = _8bb.pageSize;
        if (isNaN(_8c0) || _8c0 > res.total) {
_8c0 = res.total;
}
res.nextPage = function(_8c1) {
_8bc.direction = _8c1 = _8c1 !== false;
        _8bc.count = _8c0;
        if (_8c1) {
_8bc.start += res.length;
        if (_8bc.start >= res.total) {
_8bc.count = 0;
}
} else {
_8bc.start -= _8c0;
        if (_8bc.start < 0) {
_8bc.count = Math.max(_8c0 + _8bc.start, 0);
        _8bc.start = 0;
}
}
if (_8bc.count <= 0) {
res.length = 0;
        _8bb.onSearch(res, _8b4, _8bc);
} else {
_8bd();
}
};
        _8bb.onSearch(res, _8b4, _8bc);
});
}
}, function(err) {
_8bb._fetchHandle = null;
        if (!_8bb._cancelingQuery) {
console.error(_8bb.declaredClass + " " + err.toString());
}
});
};
        lang.mixin(_8bc, this.fetchProperties);
        if (this.store._oldAPI) {
q = qs;
} else {
q = this._patternToRegExp(qs);
        q.toString = function() {
        return qs;
        };
}
this._lastQuery = _8b4[this.searchAttr] = q;
        this._queryDeferHandle = this.defer(_8bd, this.searchDelay);
}, constructor: function() {
this.query = {};
        this.fetchProperties = {};
}, postMixInProperties: function() {
if (!this.store) {
var list = this.list;
        if (list) {
this.store = _8b6.byId(list);
}
}
this.inherited(arguments);
}});
});
}, "dijit/form/_ComboBoxMenu": function() {
define(["dojo/_base/declare", "dojo/dom-class", "dojo/dom-style", "dojo/keys", "../_WidgetBase", "../_TemplatedMixin", "./_ComboBoxMenuMixin", "./_ListMouseMixin"], function(_8c2, _8c3, _8c4, keys, _8c5, _8c6, _8c7, _8c8) {
return _8c2("dijit.form._ComboBoxMenu", [_8c5, _8c6, _8c8, _8c7], {templateString: "<div class='dijitReset dijitMenu' data-dojo-attach-point='containerNode' style='overflow: auto; overflow-x: hidden;' role='listbox'>" + "<div class='dijitMenuItem dijitMenuPreviousButton' data-dojo-attach-point='previousButton' role='option'></div>" + "<div class='dijitMenuItem dijitMenuNextButton' data-dojo-attach-point='nextButton' role='option'></div>" + "</div>", baseClass: "dijitComboBoxMenu", postCreate: function() {
this.inherited(arguments);
        if (!this.isLeftToRight()) {
_8c3.add(this.previousButton, "dijitMenuItemRtl");
        _8c3.add(this.nextButton, "dijitMenuItemRtl");
}
this.containerNode.setAttribute("role", "listbox");
}, _createMenuItem: function() {
var item = this.ownerDocument.createElement("div");
        item.className = "dijitReset dijitMenuItem" + (this.isLeftToRight() ? "" : " dijitMenuItemRtl");
        item.setAttribute("role", "option");
        return item;
}, onHover: function(node) {
_8c3.add(node, "dijitMenuItemHover");
}, onUnhover: function(node) {
_8c3.remove(node, "dijitMenuItemHover");
}, onSelect: function(node) {
_8c3.add(node, "dijitMenuItemSelected");
}, onDeselect: function(node) {
_8c3.remove(node, "dijitMenuItemSelected");
}, _page: function(up) {
var _8c9 = 0;
        var _8ca = this.domNode.scrollTop;
        var _8cb = _8c4.get(this.domNode, "height");
        if (!this.getHighlightedOption()) {
this.selectNextNode();
}
while (_8c9 < _8cb) {
var _8cc = this.getHighlightedOption();
        if (up) {
if (!_8cc.previousSibling || _8cc.previousSibling.style.display == "none") {
break;
}
this.selectPreviousNode();
} else {
if (!_8cc.nextSibling || _8cc.nextSibling.style.display == "none") {
break;
}
this.selectNextNode();
}
var _8cd = this.domNode.scrollTop;
        _8c9 += (_8cd - _8ca) * (up ? - 1 : 1);
        _8ca = _8cd;
}
}, handleKey: function(evt) {
switch (evt.keyCode) {
case keys.DOWN_ARROW:
        this.selectNextNode();
        return false;
        case keys.PAGE_DOWN:
        this._page(false);
        return false;
        case keys.UP_ARROW:
        this.selectPreviousNode();
        return false;
        case keys.PAGE_UP:
        this._page(true);
        return false;
        default:
        return true;
}
}});
});
}, "dijit/form/_ComboBoxMenuMixin": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-attr", "dojo/has", "dojo/i18n", "dojo/i18n!./nls/ComboBox"], function(_8ce, _8cf, _8d0, has, i18n) {
var _8d1 = _8cf("dijit.form._ComboBoxMenuMixin" + (has("dojo-bidi") ? "_NoBidi" : ""), null, {_messages: null, postMixInProperties: function() {
this.inherited(arguments);
        this._messages = i18n.getLocalization("dijit.form", "ComboBox", this.lang);
}, buildRendering: function() {
this.inherited(arguments);
        this.previousButton.innerHTML = this._messages["previousMessage"];
        this.nextButton.innerHTML = this._messages["nextMessage"];
}, _setValueAttr: function(_8d2) {
this._set("value", _8d2);
        this.onChange(_8d2);
}, onClick: function(node) {
if (node == this.previousButton) {
this._setSelectedAttr(null);
        this.onPage( - 1);
} else {
if (node == this.nextButton) {
this._setSelectedAttr(null);
        this.onPage(1);
} else {
this.onChange(node);
}
}
}, onChange: function() {
}, onPage: function() {
}, onClose: function() {
this._setSelectedAttr(null);
}, _createOption: function(item, _8d3) {
var _8d4 = this._createMenuItem();
        var _8d5 = _8d3(item);
        if (_8d5.html) {
_8d4.innerHTML = _8d5.label;
} else {
_8d4.appendChild(_8d4.ownerDocument.createTextNode(_8d5.label));
}
if (_8d4.innerHTML == "") {
_8d4.innerHTML = "&#160;";
}
return _8d4;
}, createOptions: function(_8d6, _8d7, _8d8) {
this.items = _8d6;
        this.previousButton.style.display = (_8d7.start == 0) ? "none" : "";
        _8d0.set(this.previousButton, "id", this.id + "_prev");
        _8ce.forEach(_8d6, function(item, i) {
        var _8d9 = this._createOption(item, _8d8);
                _8d9.setAttribute("item", i);
                _8d0.set(_8d9, "id", this.id + i);
                this.nextButton.parentNode.insertBefore(_8d9, this.nextButton);
        }, this);
        var _8da = false;
        if (_8d6.total && !_8d6.total.then && _8d6.total != - 1) {
if ((_8d7.start + _8d7.count) < _8d6.total) {
_8da = true;
} else {
if ((_8d7.start + _8d7.count) > _8d6.total && _8d7.count == _8d6.length) {
_8da = true;
}
}
} else {
if (_8d7.count == _8d6.length) {
_8da = true;
}
}
this.nextButton.style.display = _8da ? "" : "none";
        _8d0.set(this.nextButton, "id", this.id + "_next");
}, clearResultList: function() {
var _8db = this.containerNode;
        while (_8db.childNodes.length > 2) {
_8db.removeChild(_8db.childNodes[_8db.childNodes.length - 2]);
}
this._setSelectedAttr(null);
}, highlightFirstOption: function() {
this.selectFirstNode();
}, highlightLastOption: function() {
this.selectLastNode();
}, selectFirstNode: function() {
this.inherited(arguments);
        if (this.getHighlightedOption() == this.previousButton) {
this.selectNextNode();
}
}, selectLastNode: function() {
this.inherited(arguments);
        if (this.getHighlightedOption() == this.nextButton) {
this.selectPreviousNode();
}
}, getHighlightedOption: function() {
return this.selected;
}});
        if (has("dojo-bidi")) {
_8d1 = _8cf("dijit.form._ComboBoxMenuMixin", _8d1, {_createOption: function() {
var _8dc = this.inherited(arguments);
        this.applyTextDir(_8dc);
        return _8dc;
}});
}
return _8d1;
});
}, "dijit/form/_ListMouseMixin": function() {
define(["dojo/_base/declare", "dojo/on", "dojo/touch", "./_ListBase"], function(_8dd, on, _8de, _8df) {
return _8dd("dijit.form._ListMouseMixin", _8df, {postCreate: function() {
this.inherited(arguments);
        this.domNode.dojoClick = true;
        this.own(on(this.domNode, "mousedown", function(evt) {
        evt.preventDefault();
        }));
        this._listConnect("click", "_onClick");
        this._listConnect(_8de.press, "_onMouseDown");
        this._listConnect(_8de.release, "_onMouseUp");
        this._listConnect(_8de.over, "_onMouseOver");
        this._listConnect(_8de.out, "_onMouseOut");
}, _onClick: function(evt, _8e0) {
this._setSelectedAttr(_8e0);
        if (this._deferredClick) {
this._deferredClick.remove();
}
this._deferredClick = this.defer(function() {
this._deferredClick = null;
        this.onClick(_8e0);
});
}, _onMouseDown: function(evt, _8e1) {
if (this._hoveredNode) {
this.onUnhover(this._hoveredNode);
        this._hoveredNode = null;
}
this._isDragging = true;
        this._setSelectedAttr(_8e1);
}, _onMouseUp: function(evt, _8e2) {
this._isDragging = false;
        var _8e3 = this.selected;
        var _8e4 = this._hoveredNode;
        if (_8e3 && _8e2 == _8e3) {
this.defer(function() {
this._onClick(evt, _8e3);
});
} else {
if (_8e4) {
this.defer(function() {
this._onClick(evt, _8e4);
});
}
}
}, _onMouseOut: function(evt, _8e5) {
if (this._hoveredNode) {
this.onUnhover(this._hoveredNode);
        this._hoveredNode = null;
}
if (this._isDragging) {
this._cancelDrag = (new Date()).getTime() + 1000;
}
}, _onMouseOver: function(evt, _8e6) {
if (this._cancelDrag) {
var time = (new Date()).getTime();
        if (time > this._cancelDrag) {
this._isDragging = false;
}
this._cancelDrag = null;
}
this._hoveredNode = _8e6;
        this.onHover(_8e6);
        if (this._isDragging) {
this._setSelectedAttr(_8e6);
}
}});
});
}, "dijit/form/_ListBase": function() {
define(["dojo/_base/declare", "dojo/on", "dojo/window"], function(_8e7, on, _8e8) {
return _8e7("dijit.form._ListBase", null, {selected: null, _listConnect: function(_8e9, _8ea) {
var self = this;
        return self.own(on(self.containerNode, on.selector(function(_8eb, _8ec, _8ed) {
        return _8eb.parentNode == _8ed;
        }, _8e9), function(evt) {
        evt.preventDefault();
                self[_8ea](evt, this);
        }));
}, selectFirstNode: function() {
var _8ee = this.containerNode.firstChild;
        while (_8ee && _8ee.style.display == "none") {
_8ee = _8ee.nextSibling;
}
this._setSelectedAttr(_8ee);
}, selectLastNode: function() {
var last = this.containerNode.lastChild;
        while (last && last.style.display == "none") {
last = last.previousSibling;
}
this._setSelectedAttr(last);
}, selectNextNode: function() {
var _8ef = this.selected;
        if (!_8ef) {
this.selectFirstNode();
} else {
var next = _8ef.nextSibling;
        while (next && next.style.display == "none") {
next = next.nextSibling;
}
if (!next) {
this.selectFirstNode();
} else {
this._setSelectedAttr(next);
}
}
}, selectPreviousNode: function() {
var _8f0 = this.selected;
        if (!_8f0) {
this.selectLastNode();
} else {
var prev = _8f0.previousSibling;
        while (prev && prev.style.display == "none") {
prev = prev.previousSibling;
}
if (!prev) {
this.selectLastNode();
} else {
this._setSelectedAttr(prev);
}
}
}, _setSelectedAttr: function(node) {
if (this.selected != node) {
var _8f1 = this.selected;
        if (_8f1) {
this.onDeselect(_8f1);
}
if (node) {
_8e8.scrollIntoView(node);
        this.onSelect(node);
}
this._set("selected", node);
} else {
if (node) {
this.onSelect(node);
}
}
}});
});
}, "dijit/_HasDropDown": function() {
define(["dojo/_base/declare", "dojo/_base/Deferred", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/has", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/touch", "./registry", "./focus", "./popup", "./_FocusMixin"], function(_8f2, _8f3, dom, _8f4, _8f5, _8f6, _8f7, has, keys, lang, on, _8f8, _8f9, _8fa, _8fb, _8fc) {
return _8f2("dijit._HasDropDown", _8fc, {_buttonNode: null, _arrowWrapperNode: null, _popupStateNode: null, _aroundNode: null, dropDown: null, autoWidth: true, forceWidth: false, maxHeight: - 1, dropDownPosition: ["below", "above"], _stopClickEvents: true, _onDropDownMouseDown: function(e) {
if (this.disabled || this.readOnly) {
return;
}
if (e.type != "MSPointerDown") {
e.preventDefault();
}
this._docHandler = this.own(on(this.ownerDocument, _8f8.release, lang.hitch(this, "_onDropDownMouseUp")))[0];
        this.toggleDropDown();
}, _onDropDownMouseUp: function(e) {
if (e && this._docHandler) {
this._docHandler.remove();
        this._docHandler = null;
}
var _8fd = this.dropDown, _8fe = false;
        if (e && this._opened) {
var c = _8f6.position(this._buttonNode, true);
        if (!(e.pageX >= c.x && e.pageX <= c.x + c.w) || !(e.pageY >= c.y && e.pageY <= c.y + c.h)) {
var t = e.target;
        while (t && !_8fe) {
if (_8f5.contains(t, "dijitPopup")) {
_8fe = true;
} else {
t = t.parentNode;
}
}
if (_8fe) {
t = e.target;
        if (_8fd.onItemClick) {
var _8ff;
        while (t && !(_8ff = _8f9.byNode(t))) {
t = t.parentNode;
}
if (_8ff && _8ff.onClick && _8ff.getParent) {
_8ff.getParent().onItemClick(_8ff, e);
}
}
return;
}
}
}
if (this._opened) {
if (_8fd.focus && _8fd.autoFocus !== false) {
this._focusDropDownTimer = this.defer(function() {
_8fd.focus();
        delete this._focusDropDownTimer;
});
}
} else {
if (this.focus) {
this.defer("focus");
}
}
}, _onDropDownClick: function(e) {
if (this._stopClickEvents) {
e.stopPropagation();
        e.preventDefault();
}
}, buildRendering: function() {
this.inherited(arguments);
        this._buttonNode = this._buttonNode || this.focusNode || this.domNode;
        this._popupStateNode = this._popupStateNode || this.focusNode || this._buttonNode;
        var _900 = {"after": this.isLeftToRight() ? "Right" : "Left", "before": this.isLeftToRight() ? "Left" : "Right", "above": "Up", "below": "Down", "left": "Left", "right": "Right"}[this.dropDownPosition[0]] || this.dropDownPosition[0] || "Down";
        _8f5.add(this._arrowWrapperNode || this._buttonNode, "dijit" + _900 + "ArrowButton");
}, postCreate: function() {
this.inherited(arguments);
        var _901 = this.focusNode || this.domNode;
        this.own(on(this._buttonNode, _8f8.press, lang.hitch(this, "_onDropDownMouseDown")), on(this._buttonNode, "click", lang.hitch(this, "_onDropDownClick")), on(_901, "keydown", lang.hitch(this, "_onKey")), on(_901, "keyup", lang.hitch(this, "_onKeyUp")));
}, destroy: function() {
if (this._opened) {
this.closeDropDown(true);
}
if (this.dropDown) {
if (!this.dropDown._destroyed) {
this.dropDown.destroyRecursive();
}
delete this.dropDown;
}
this.inherited(arguments);
}, _onKey: function(e) {
if (this.disabled || this.readOnly) {
return;
}
var d = this.dropDown, _902 = e.target;
        if (d && this._opened && d.handleKey) {
if (d.handleKey(e) === false) {
e.stopPropagation();
        e.preventDefault();
        return;
}
}
if (d && this._opened && e.keyCode == keys.ESCAPE) {
this.closeDropDown();
        e.stopPropagation();
        e.preventDefault();
} else {
if (!this._opened && (e.keyCode == keys.DOWN_ARROW || ((e.keyCode == keys.ENTER || (e.keyCode == keys.SPACE && (!this._searchTimer || (e.ctrlKey || e.altKey || e.metaKey)))) && ((_902.tagName || "").toLowerCase() !== "input" || (_902.type && _902.type.toLowerCase() !== "text"))))) {
this._toggleOnKeyUp = true;
        e.stopPropagation();
        e.preventDefault();
}
}
}, _onKeyUp: function() {
if (this._toggleOnKeyUp) {
delete this._toggleOnKeyUp;
        this.toggleDropDown();
        var d = this.dropDown;
        if (d && d.focus) {
this.defer(lang.hitch(d, "focus"), 1);
}
}
}, _onBlur: function() {
this.closeDropDown(false);
        this.inherited(arguments);
}, isLoaded: function() {
return true;
}, loadDropDown: function(_903) {
_903();
}, loadAndOpenDropDown: function() {
var d = new _8f3(), _904 = lang.hitch(this, function() {
this.openDropDown();
        d.resolve(this.dropDown);
});
        if (!this.isLoaded()) {
this.loadDropDown(_904);
} else {
_904();
}
return d;
}, toggleDropDown: function() {
if (this.disabled || this.readOnly) {
return;
}
if (!this._opened) {
this.loadAndOpenDropDown();
} else {
this.closeDropDown(true);
}
}, openDropDown: function() {
var _905 = this.dropDown, _906 = _905.domNode, _907 = this._aroundNode || this.domNode, self = this;
        var _908 = _8fb.open({parent: this, popup: _905, around: _907, orient: this.dropDownPosition, maxHeight: this.maxHeight, onExecute: function() {
        self.closeDropDown(true);
        }, onCancel: function() {
        self.closeDropDown(true);
        }, onClose: function() {
        _8f4.set(self._popupStateNode, "popupActive", false);
                _8f5.remove(self._popupStateNode, "dijitHasDropDownOpen");
                self._set("_opened", false);
        }});
        if (this.forceWidth || (this.autoWidth && _907.offsetWidth > _905._popupWrapper.offsetWidth)) {
var _909 = {w: _907.offsetWidth - (_905._popupWrapper.offsetWidth - _905.domNode.offsetWidth)};
        if (lang.isFunction(_905.resize)) {
_905.resize(_909);
} else {
_8f6.setMarginBox(_906, _909);
}
}
_8f4.set(this._popupStateNode, "popupActive", "true");
        _8f5.add(this._popupStateNode, "dijitHasDropDownOpen");
        this._set("_opened", true);
        this._popupStateNode.setAttribute("aria-expanded", "true");
        this._popupStateNode.setAttribute("aria-owns", _905.id);
        if (_906.getAttribute("role") !== "presentation" && !_906.getAttribute("aria-labelledby")) {
_906.setAttribute("aria-labelledby", this.id);
}
return _908;
}, closeDropDown: function(_90a) {
if (this._focusDropDownTimer) {
this._focusDropDownTimer.remove();
        delete this._focusDropDownTimer;
}
if (this._opened) {
this._popupStateNode.setAttribute("aria-expanded", "false");
        if (_90a && this.focus) {
this.focus();
}
_8fb.close(this.dropDown);
        this._opened = false;
}
}});
});
}, "dijit/_editor/plugins/LinkDialog": function() {
define(["require", "dojo/_base/declare", "dojo/dom-attr", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/sniff", "dojo/query", "dojo/string", "../_Plugin", "../../form/DropDownButton", "../range"], function(_90b, _90c, _90d, keys, lang, on, has, _90e, _90f, _910, _911, _912) {
var _913 = _90c("dijit._editor.plugins.LinkDialog", _910, {buttonClass: _911, useDefaultCommand: false, urlRegExp: "((https?|ftps?|file)\\://|./|../|/|)(/[a-zA-Z]{1,1}:/|)(((?:(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)\\.)*(?:[a-zA-Z](?:[-\\da-zA-Z]{0,80}[\\da-zA-Z])?)\\.?)|(((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])|(0[xX]0*[\\da-fA-F]?[\\da-fA-F]\\.){3}0[xX]0*[\\da-fA-F]?[\\da-fA-F]|(0+[0-3][0-7][0-7]\\.){3}0+[0-3][0-7][0-7]|(0|[1-9]\\d{0,8}|[1-3]\\d{9}|4[01]\\d{8}|42[0-8]\\d{7}|429[0-3]\\d{6}|4294[0-8]\\d{5}|42949[0-5]\\d{4}|429496[0-6]\\d{3}|4294967[01]\\d{2}|42949672[0-8]\\d|429496729[0-5])|0[xX]0*[\\da-fA-F]{1,8}|([\\da-fA-F]{1,4}\\:){7}[\\da-fA-F]{1,4}|([\\da-fA-F]{1,4}\\:){6}((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])))(\\:\\d+)?(/(?:[^?#\\s/]+/)*(?:[^?#\\s/]{0,}(?:\\?[^?#\\s/]*)?(?:#.*)?)?)?", emailRegExp: "<?(mailto\\:)([!#-'*+\\-\\/-9=?A-Z^-~]+[.])*[!#-'*+\\-\\/-9=?A-Z^-~]+" + "@" + "((?:(?:[\\da-zA-Z](?:[-\\da-zA-Z]{0,61}[\\da-zA-Z])?)\\.)+(?:[a-zA-Z](?:[-\\da-zA-Z]{0,6}[\\da-zA-Z])?)\\.?)|localhost|^[^-][a-zA-Z0-9_-]*>?", htmlTemplate: "<a href=\"${urlInput}\" _djrealurl=\"${urlInput}\"" + " target=\"${targetSelect}\"" + ">${textInput}</a>", tag: "a", _hostRxp: /^((([^\[:]+):)?([^@]+)@)?(\[([^\]]+)\]|([^\[:]*))(:([0-9]+))?$/, _userAtRxp: /^([!#-'*+\-\/-9=?A-Z^-~]+[.])*[!#-'*+\-\/-9=?A-Z^-~]+@/i, linkDialogTemplate: ["<table role='presentation'><tr><td>", "<label for='${id}_urlInput'>${url}</label>", "</td><td>", "<input data-dojo-type='dijit.form.ValidationTextBox' required='true' " + "id='${id}_urlInput' name='urlInput' data-dojo-props='intermediateChanges:true'/>", "</td></tr><tr><td>", "<label for='${id}_textInput'>${text}</label>", "</td><td>", "<input data-dojo-type='dijit.form.ValidationTextBox' required='true' id='${id}_textInput' " + "name='textInput' data-dojo-props='intermediateChanges:true'/>", "</td></tr><tr><td>", "<label for='${id}_targetSelect'>${target}</label>", "</td><td>", "<select id='${id}_targetSelect' name='targetSelect' data-dojo-type='dijit.form.Select'>", "<option selected='selected' value='_self'>${currentWindow}</option>", "<option value='_blank'>${newWindow}</option>", "<option value='_top'>${topWindow}</option>", "<option value='_parent'>${parentWindow}</option>", "</select>", "</td></tr><tr><td colspan='2'>", "<button data-dojo-type='dijit.form.Button' type='submit' id='${id}_setButton'>${set}</button>", "<button data-dojo-type='dijit.form.Button' type='button' id='${id}_cancelButton'>${buttonCancel}</button>", "</td></tr></table>"].join(""), _initButton: function() {
this.inherited(arguments);
        this.button.loadDropDown = lang.hitch(this, "_loadDropDown");
        this._connectTagEvents();
}, _loadDropDown: function(_914) {
_90b(["dojo/i18n", "../../TooltipDialog", "../../registry", "../../form/Button", "../../form/Select", "../../form/ValidationTextBox", "dojo/i18n!../../nls/common", "dojo/i18n!../nls/LinkDialog"], lang.hitch(this, function(i18n, _915, _916) {
var _917 = this;
        this.tag = this.command == "insertImage" ? "img" : "a";
        var _918 = lang.delegate(i18n.getLocalization("dijit", "common", this.lang), i18n.getLocalization("dijit._editor", "LinkDialog", this.lang));
        var _919 = (this.dropDown = this.button.dropDown = new _915({title: _918[this.command + "Title"], ownerDocument: this.editor.ownerDocument, dir: this.editor.dir, execute: lang.hitch(this, "setValue"), onOpen: function() {
        _917._onOpenDialog();
                _915.prototype.onOpen.apply(this, arguments);
        }, onCancel: function() {
        setTimeout(lang.hitch(_917, "_onCloseDialog"), 0);
        }}));
        _918.urlRegExp = this.urlRegExp;
        _918.id = _916.getUniqueId(this.editor.id);
        this._uniqueId = _918.id;
        this._setContent(_919.title + "<div style='border-bottom: 1px black solid;padding-bottom:2pt;margin-bottom:4pt'></div>" + _90f.substitute(this.linkDialogTemplate, _918));
        _919.startup();
        this._urlInput = _916.byId(this._uniqueId + "_urlInput");
        this._textInput = _916.byId(this._uniqueId + "_textInput");
        this._setButton = _916.byId(this._uniqueId + "_setButton");
        this.own(_916.byId(this._uniqueId + "_cancelButton").on("click", lang.hitch(this.dropDown, "onCancel")));
        if (this._urlInput) {
this.own(this._urlInput.on("change", lang.hitch(this, "_checkAndFixInput")));
}
if (this._textInput) {
this.own(this._textInput.on("change", lang.hitch(this, "_checkAndFixInput")));
}
this._urlRegExp = new RegExp("^" + this.urlRegExp + "$", "i");
        this._emailRegExp = new RegExp("^" + this.emailRegExp + "$", "i");
        this._urlInput.isValid = lang.hitch(this, function() {
        var _91a = this._urlInput.get("value");
                return this._urlRegExp.test(_91a) || this._emailRegExp.test(_91a);
        });
        this.own(on(_919.domNode, "keydown", lang.hitch(this, lang.hitch(this, function(e) {
        if (e && e.keyCode == keys.ENTER && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (!this._setButton.get("disabled")) {
        _919.onExecute();
                _919.execute(_919.get("value"));
        }
        }
        }))));
        _914();
}));
}, _checkAndFixInput: function() {
var self = this;
        var url = this._urlInput.get("value");
        var _91b = function(url) {
        var _91c = false;
                var _91d = false;
                if (url && url.length > 1) {
        url = lang.trim(url);
                if (url.indexOf("mailto:") !== 0) {
        if (url.indexOf("/") > 0) {
        if (url.indexOf("://") === - 1) {
        if (url.charAt(0) !== "/" && url.indexOf("./") && url.indexOf("../") !== 0) {
        if (self._hostRxp.test(url)) {
        _91c = true;
        }
        }
        }
        } else {
        if (self._userAtRxp.test(url)) {
        _91d = true;
        }
        }
        }
        }
        if (_91c) {
        self._urlInput.set("value", "http://" + url);
        }
        if (_91d) {
        self._urlInput.set("value", "mailto:" + url);
        }
        self._setButton.set("disabled", !self._isValid());
        };
        if (this._delayedCheck) {
clearTimeout(this._delayedCheck);
        this._delayedCheck = null;
}
this._delayedCheck = setTimeout(function() {
_91b(url);
}, 250);
}, _connectTagEvents: function() {
this.editor.onLoadDeferred.then(lang.hitch(this, function() {
this.own(on(this.editor.editNode, "dblclick", lang.hitch(this, "_onDblClick")));
}));
}, _isValid: function() {
return this._urlInput.isValid() && this._textInput.isValid();
}, _setContent: function(_91e) {
this.dropDown.set({parserScope: "dojo", content: _91e});
}, _checkValues: function(args) {
if (args && args.urlInput) {
args.urlInput = args.urlInput.replace(/"/g, "&quot;");
}
return args;
}, setValue: function(args) {
this._onCloseDialog();
        if (has("ie") < 9) {
var sel = _912.getSelection(this.editor.window);
        var _91f = sel.getRangeAt(0);
        var a = _91f.endContainer;
        if (a.nodeType === 3) {
a = a.parentNode;
}
if (a && (a.nodeName && a.nodeName.toLowerCase() !== this.tag)) {
a = this.editor.selection.getSelectedElement(this.tag);
}
if (a && (a.nodeName && a.nodeName.toLowerCase() === this.tag)) {
if (this.editor.queryCommandEnabled("unlink")) {
this.editor.selection.selectElementChildren(a);
        this.editor.execCommand("unlink");
}
}
}
args = this._checkValues(args);
        this.editor.execCommand("inserthtml", _90f.substitute(this.htmlTemplate, args));
        _90e("a", this.editor.document).forEach(function(a) {
if (!a.innerHTML && !_90d.has(a, "name")) {
a.parentNode.removeChild(a);
}
}, this);
}, _onCloseDialog: function() {
if (this.editor.focused) {
this.editor.focus();
}
}, _getCurrentValues: function(a) {
var url, text, _920;
        if (a && a.tagName.toLowerCase() === this.tag) {
url = a.getAttribute("_djrealurl") || a.getAttribute("href");
        _920 = a.getAttribute("target") || "_self";
        text = a.textContent || a.innerText;
        this.editor.selection.selectElement(a, true);
} else {
text = this.editor.selection.getSelectedText();
}
return {urlInput: url || "", textInput: text || "", targetSelect: _920 || ""};
}, _onOpenDialog: function() {
var a, b, fc;
        if (has("ie")) {
var sel = _912.getSelection(this.editor.window);
        if (sel.rangeCount) {
var _921 = sel.getRangeAt(0);
        a = _921.endContainer;
        if (a.nodeType === 3) {
a = a.parentNode;
}
if (a && (a.nodeName && a.nodeName.toLowerCase() !== this.tag)) {
a = this.editor.selection.getSelectedElement(this.tag);
}
if (!a || (a.nodeName && a.nodeName.toLowerCase() !== this.tag)) {
b = this.editor.selection.getAncestorElement(this.tag);
        if (b && (b.nodeName && b.nodeName.toLowerCase() == this.tag)) {
a = b;
        this.editor.selection.selectElement(a);
} else {
if (_921.startContainer === _921.endContainer) {
fc = _921.startContainer.firstChild;
        if (fc && (fc.nodeName && fc.nodeName.toLowerCase() == this.tag)) {
a = fc;
        this.editor.selection.selectElement(a);
}
}
}
}
}
} else {
a = this.editor.selection.getAncestorElement(this.tag);
}
this.dropDown.reset();
        this._setButton.set("disabled", true);
        this.dropDown.set("value", this._getCurrentValues(a));
}, _onDblClick: function(e) {
if (e && e.target) {
var t = e.target;
        var tg = t.tagName ? t.tagName.toLowerCase() : "";
        if (tg === this.tag && _90d.get(t, "href")) {
var _922 = this.editor;
        this.editor.selection.selectElement(t);
        _922.onDisplayChanged();
        if (_922._updateTimer) {
_922._updateTimer.remove();
        delete _922._updateTimer;
}
_922.onNormalizedDisplayChanged();
        var _923 = this.button;
        setTimeout(function() {
        _923.set("disabled", false);
                _923.loadAndOpenDropDown().then(function() {
        if (_923.dropDown.focus) {
        _923.dropDown.focus();
        }
        });
        }, 10);
}
}
}});
        var _924 = _90c("dijit._editor.plugins.ImgLinkDialog", [_913], {linkDialogTemplate: ["<table role='presentation'><tr><td>", "<label for='${id}_urlInput'>${url}</label>", "</td><td>", "<input dojoType='dijit.form.ValidationTextBox' regExp='${urlRegExp}' " + "required='true' id='${id}_urlInput' name='urlInput' data-dojo-props='intermediateChanges:true'/>", "</td></tr><tr><td>", "<label for='${id}_textInput'>${text}</label>", "</td><td>", "<input data-dojo-type='dijit.form.ValidationTextBox' required='false' id='${id}_textInput' " + "name='textInput' data-dojo-props='intermediateChanges:true'/>", "</td></tr><tr><td>", "</td><td>", "</td></tr><tr><td colspan='2'>", "<button data-dojo-type='dijit.form.Button' type='submit' id='${id}_setButton'>${set}</button>", "<button data-dojo-type='dijit.form.Button' type='button' id='${id}_cancelButton'>${buttonCancel}</button>", "</td></tr></table>"].join(""), htmlTemplate: "<img src=\"${urlInput}\" _djrealurl=\"${urlInput}\" alt=\"${textInput}\" />", tag: "img", _getCurrentValues: function(img) {
        var url, text;
                if (img && img.tagName.toLowerCase() === this.tag) {
        url = img.getAttribute("_djrealurl") || img.getAttribute("src");
                text = img.getAttribute("alt");
                this.editor.selection.selectElement(img, true);
        } else {
        text = this.editor.selection.getSelectedText();
        }
        return {urlInput: url || "", textInput: text || ""};
        }, _isValid: function() {
        return this._urlInput.isValid();
        }, _connectTagEvents: function() {
        this.inherited(arguments);
                this.editor.onLoadDeferred.then(lang.hitch(this, function() {
                this.own(on(this.editor.editNode, "mousedown", lang.hitch(this, "_selectTag")));
                }));
        }, _selectTag: function(e) {
        if (e && e.target) {
        var t = e.target;
                var tg = t.tagName ? t.tagName.toLowerCase() : "";
                if (tg === this.tag) {
        this.editor.selection.selectElement(t);
        }
        }
        }, _checkValues: function(args) {
        if (args && args.urlInput) {
        args.urlInput = args.urlInput.replace(/"/g, "&quot;");
        }
        if (args && args.textInput) {
        args.textInput = args.textInput.replace(/"/g, "&quot;");
        }
        return args;
        }, _onDblClick: function(e) {
        if (e && e.target) {
        var t = e.target;
                var tg = t.tagName ? t.tagName.toLowerCase() : "";
                if (tg === this.tag && _90d.get(t, "src")) {
        var _925 = this.editor;
                this.editor.selection.selectElement(t);
                _925.onDisplayChanged();
                if (_925._updateTimer) {
        _925._updateTimer.remove();
                delete _925._updateTimer;
        }
        _925.onNormalizedDisplayChanged();
                var _926 = this.button;
                setTimeout(function() {
                _926.set("disabled", false);
                        _926.loadAndOpenDropDown().then(function() {
                if (_926.dropDown.focus) {
                _926.dropDown.focus();
                }
                });
                }, 10);
        }
        }
        }});
        _910.registry["createLink"] = function() {
return new _913({command: "createLink"});
};
        _910.registry["insertImage"] = function() {
return new _924({command: "insertImage"});
};
        _913.ImgLinkDialog = _924;
        return _913;
});
}, "dijit/form/DropDownButton": function() {
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/query", "../registry", "../popup", "./Button", "../_Container", "../_HasDropDown", "dojo/text!./templates/DropDownButton.html"], function(_927, lang, _928, _929, _92a, _92b, _92c, _92d, _92e) {
return _927("dijit.form.DropDownButton", [_92b, _92c, _92d], {baseClass: "dijitDropDownButton", templateString: _92e, _fillContent: function() {
if (this.srcNodeRef) {
var _92f = _928("*", this.srcNodeRef);
        this.inherited(arguments, [_92f[0]]);
        this.dropDownContainer = this.srcNodeRef;
}
}, startup: function() {
if (this._started) {
return;
}
if (!this.dropDown && this.dropDownContainer) {
var _930 = _928("[widgetId]", this.dropDownContainer)[0];
        if (_930) {
this.dropDown = _929.byNode(_930);
}
delete this.dropDownContainer;
}
if (this.dropDown) {
_92a.hide(this.dropDown);
}
this.inherited(arguments);
}, isLoaded: function() {
var _931 = this.dropDown;
        return (!!_931 && (!_931.href || _931.isLoaded));
}, loadDropDown: function(_932) {
var _933 = this.dropDown;
        var _934 = _933.on("load", lang.hitch(this, function() {
        _934.remove();
                _932();
        }));
        _933.refresh();
}, isFocusable: function() {
return this.inherited(arguments) && !this._mouseDown;
}});
});
}, "dijit/Menu": function() {
define(["require", "dojo/_base/array", "dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-geometry", "dojo/dom-style", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/sniff", "dojo/_base/window", "dojo/window", "./popup", "./DropDownMenu", "dojo/ready"], function(_935, _936, _937, dom, _938, _939, _93a, keys, lang, on, has, win, _93b, pm, _93c, _93d) {
if (has("dijit-legacy-requires")) {
_93d(0, function() {
var _93e = ["dijit/MenuItem", "dijit/PopupMenuItem", "dijit/CheckedMenuItem", "dijit/MenuSeparator"];
        _935(_93e);
});
}
return _937("dijit.Menu", _93c, {constructor: function() {
this._bindings = [];
}, targetNodeIds: [], selector: "", contextMenuForWindow: false, leftClickToOpen: false, refocus: true, postCreate: function() {
if (this.contextMenuForWindow) {
this.bindDomNode(this.ownerDocumentBody);
} else {
_936.forEach(this.targetNodeIds, this.bindDomNode, this);
}
this.inherited(arguments);
}, _iframeContentWindow: function(_93f) {
return _93b.get(this._iframeContentDocument(_93f)) || this._iframeContentDocument(_93f)["__parent__"] || (_93f.name && document.frames[_93f.name]) || null;
}, _iframeContentDocument: function(_940) {
return _940.contentDocument || (_940.contentWindow && _940.contentWindow.document) || (_940.name && document.frames[_940.name] && document.frames[_940.name].document) || null;
}, bindDomNode: function(node) {
node = dom.byId(node, this.ownerDocument);
        var cn;
        if (node.tagName.toLowerCase() == "iframe") {
var _941 = node, _942 = this._iframeContentWindow(_941);
        cn = win.body(_942.document);
} else {
cn = (node == win.body(this.ownerDocument) ? this.ownerDocument.documentElement : node);
}
var _943 = {node: node, iframe: _941};
        _938.set(node, "_dijitMenu" + this.id, this._bindings.push(_943));
        var _944 = lang.hitch(this, function(cn) {
        var _945 = this.selector, _946 = _945 ? function(_947) {
        return on.selector(_945, _947);
        } : function(_948) {
        return _948;
        }, self = this;
                return [on(cn, _946(this.leftClickToOpen ? "click" : "contextmenu"), function(evt) {
                evt.stopPropagation();
                        evt.preventDefault();
                        self._scheduleOpen(this, _941, {x: evt.pageX, y: evt.pageY});
                }), on(cn, _946("keydown"), function(evt) {
                if (evt.shiftKey && evt.keyCode == keys.F10) {
                evt.stopPropagation();
                        evt.preventDefault();
                        self._scheduleOpen(this, _941);
                }
                })];
        });
        _943.connects = cn ? _944(cn) : [];
        if (_941) {
_943.onloadHandler = lang.hitch(this, function() {
var _949 = this._iframeContentWindow(_941), cn = win.body(_949.document);
        _943.connects = _944(cn);
});
        if (_941.addEventListener) {
_941.addEventListener("load", _943.onloadHandler, false);
} else {
_941.attachEvent("onload", _943.onloadHandler);
}
}
}, unBindDomNode: function(_94a) {
var node;
        try {
        node = dom.byId(_94a, this.ownerDocument);
        } catch (e) {
return;
}
var _94b = "_dijitMenu" + this.id;
        if (node && _938.has(node, _94b)) {
var bid = _938.get(node, _94b) - 1, b = this._bindings[bid], h;
        while ((h = b.connects.pop())) {
h.remove();
}
var _94c = b.iframe;
        if (_94c) {
if (_94c.removeEventListener) {
_94c.removeEventListener("load", b.onloadHandler, false);
} else {
_94c.detachEvent("onload", b.onloadHandler);
}
}
_938.remove(node, _94b);
        delete this._bindings[bid];
}
}, _scheduleOpen: function(_94d, _94e, _94f) {
if (!this._openTimer) {
this._openTimer = this.defer(function() {
delete this._openTimer;
        this._openMyself({target: _94d, iframe: _94e, coords: _94f});
}, 1);
}
}, _openMyself: function(args) {
var _950 = args.target, _951 = args.iframe, _952 = args.coords, _953 = !_952;
        this.currentTarget = _950;
        if (_952) {
if (_951) {
var ifc = _939.position(_951, true), _954 = this._iframeContentWindow(_951), _955 = _939.docScroll(_954.document);
        var cs = _93a.getComputedStyle(_951), tp = _93a.toPixelValue, left = (has("ie") && has("quirks") ? 0 : tp(_951, cs.paddingLeft)) + (has("ie") && has("quirks") ? tp(_951, cs.borderLeftWidth) : 0), top = (has("ie") && has("quirks") ? 0 : tp(_951, cs.paddingTop)) + (has("ie") && has("quirks") ? tp(_951, cs.borderTopWidth) : 0);
        _952.x += ifc.x + left - _955.x;
        _952.y += ifc.y + top - _955.y;
}
} else {
_952 = _939.position(_950, true);
        _952.x += 10;
        _952.y += 10;
}
var self = this;
        var _956 = this._focusManager.get("prevNode");
        var _957 = this._focusManager.get("curNode");
        var _958 = !_957 || (dom.isDescendant(_957, this.domNode)) ? _956 : _957;
        function _959() {
        if (self.refocus && _958) {
        _958.focus();
        }
        pm.close(self);
        }
;
        pm.open({popup: this, x: _952.x, y: _952.y, onExecute: _959, onCancel: _959, orient: this.isLeftToRight() ? "L" : "R"});
        this.focus();
        if (!_953) {
this.defer(function() {
this._cleanUp(true);
});
}
this._onBlur = function() {
this.inherited("_onBlur", arguments);
        pm.close(this);
};
}, destroy: function() {
_936.forEach(this._bindings, function(b) {
if (b) {
this.unBindDomNode(b.node);
}
}, this);
        this.inherited(arguments);
}});
});
}, "dijit/DropDownMenu": function() {
define(["dojo/_base/declare", "dojo/keys", "dojo/text!./templates/Menu.html", "./_MenuBase"], function(_95a, keys, _95b, _95c) {
return _95a("dijit.DropDownMenu", _95c, {templateString: _95b, baseClass: "dijitMenu", _onUpArrow: function() {
this.focusPrev();
}, _onDownArrow: function() {
this.focusNext();
}, _onRightArrow: function(evt) {
this._moveToPopup(evt);
        evt.stopPropagation();
        evt.preventDefault();
}, _onLeftArrow: function() {
if (this.parentMenu) {
if (this.parentMenu._isMenuBar) {
this.parentMenu.focusPrev();
} else {
this.onCancel(false);
}
} else {
evt.stopPropagation();
        evt.preventDefault();
}
}});
});
}, "dijit/_MenuBase": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/_base/lang", "dojo/mouse", "dojo/on", "dojo/window", "./a11yclick", "./registry", "./_Widget", "./_CssStateMixin", "./_KeyNavContainer", "./_TemplatedMixin"], function(_95d, _95e, dom, _95f, _960, lang, _961, on, _962, _963, _964, _965, _966, _967, _968) {
return _95e("dijit._MenuBase", [_965, _968, _967, _966], {selected: null, _setSelectedAttr: function(item) {
if (this.selected != item) {
if (this.selected) {
this.selected._setSelected(false);
        this._onChildDeselect(this.selected);
}
if (item) {
item._setSelected(true);
}
this._set("selected", item);
}
}, activated: false, _setActivatedAttr: function(val) {
_960.toggle(this.domNode, "dijitMenuActive", val);
        _960.toggle(this.domNode, "dijitMenuPassive", !val);
        this._set("activated", val);
}, parentMenu: null, popupDelay: 500, passivePopupDelay: Infinity, autoFocus: false, childSelector: function(node) {
var _969 = _964.byNode(node);
        return node.parentNode == this.containerNode && _969 && _969.focus;
}, postCreate: function() {
var self = this, _96a = typeof this.childSelector == "string" ? this.childSelector : lang.hitch(this, "childSelector");
        this.own(on(this.containerNode, on.selector(_96a, _961.enter), function() {
        self.onItemHover(_964.byNode(this));
        }), on(this.containerNode, on.selector(_96a, _961.leave), function() {
        self.onItemUnhover(_964.byNode(this));
        }), on(this.containerNode, on.selector(_96a, _963), function(evt) {
        self.onItemClick(_964.byNode(this), evt);
                evt.stopPropagation();
                evt.preventDefault();
        }), on(this.containerNode, on.selector(_96a, "focusin"), function() {
        self._onItemFocus(_964.byNode(this));
        }));
        this.inherited(arguments);
}, onKeyboardSearch: function(item, evt, _96b, _96c) {
this.inherited(arguments);
        if (!!item && (_96c == - 1 || (!!item.popup && _96c == 1))) {
this.onItemClick(item, evt);
}
}, _keyboardSearchCompare: function(item, _96d) {
if (!!item.shortcutKey) {
return _96d == item.shortcutKey.toLowerCase() ? - 1 : 0;
}
return this.inherited(arguments) ? 1 : 0;
}, onExecute: function() {
}, onCancel: function() {
}, _moveToPopup: function(evt) {
if (this.focusedChild && this.focusedChild.popup && !this.focusedChild.disabled) {
this.onItemClick(this.focusedChild, evt);
} else {
var _96e = this._getTopMenu();
        if (_96e && _96e._isMenuBar) {
_96e.focusNext();
}
}
}, _onPopupHover: function() {
this.set("selected", this.currentPopupItem);
        this._stopPendingCloseTimer();
}, onItemHover: function(item) {
if (this.activated) {
this.set("selected", item);
        if (item.popup && !item.disabled && !this.hover_timer) {
this.hover_timer = this.defer(function() {
this._openItemPopup(item);
}, this.popupDelay);
}
} else {
if (this.passivePopupDelay < Infinity) {
if (this.passive_hover_timer) {
this.passive_hover_timer.remove();
}
this.passive_hover_timer = this.defer(function() {
this.onItemClick(item, {type: "click"});
}, this.passivePopupDelay);
}
}
this._hoveredChild = item;
        item._set("hovering", true);
}, _onChildDeselect: function(item) {
this._stopPopupTimer();
        if (this.currentPopupItem == item) {
this._stopPendingCloseTimer();
        this._pendingClose_timer = this.defer(function() {
        this._pendingClose_timer = null;
                this.currentPopupItem = null;
                item._closePopup();
        }, this.popupDelay);
}
}, onItemUnhover: function(item) {
if (this._hoveredChild == item) {
this._hoveredChild = null;
}
if (this.passive_hover_timer) {
this.passive_hover_timer.remove();
        this.passive_hover_timer = null;
}
item._set("hovering", false);
}, _stopPopupTimer: function() {
if (this.hover_timer) {
this.hover_timer = this.hover_timer.remove();
}
}, _stopPendingCloseTimer: function() {
if (this._pendingClose_timer) {
this._pendingClose_timer = this._pendingClose_timer.remove();
}
}, _getTopMenu: function() {
for (var top = this; top.parentMenu; top = top.parentMenu) {
}
return top;
}, onItemClick: function(item, evt) {
if (this.passive_hover_timer) {
this.passive_hover_timer.remove();
}
this.focusChild(item);
        if (item.disabled) {
return false;
}
if (item.popup) {
this.set("selected", item);
        this.set("activated", true);
        var _96f = /^key/.test(evt._origType || evt.type) || (evt.clientX == 0 && evt.clientY == 0);
        this._openItemPopup(item, _96f);
} else {
this.onExecute();
        item._onClick ? item._onClick(evt) : item.onClick(evt);
}
}, _openItemPopup: function(_970, _971) {
if (_970 == this.currentPopupItem) {
return;
}
if (this.currentPopupItem) {
this._stopPendingCloseTimer();
        this.currentPopupItem._closePopup();
}
this._stopPopupTimer();
        var _972 = _970.popup;
        _972.parentMenu = this;
        this.own(this._mouseoverHandle = on.once(_972.domNode, "mouseover", lang.hitch(this, "_onPopupHover")));
        var self = this;
        _970._openPopup({parent: this, orient: this._orient || ["after", "before"], onCancel: function() {
        if (_971) {
        self.focusChild(_970);
        }
        self._cleanUp();
        }, onExecute: lang.hitch(this, "_cleanUp", true), onClose: function() {
        if (self._mouseoverHandle) {
        self._mouseoverHandle.remove();
                delete self._mouseoverHandle;
        }
        }}, _971);
        this.currentPopupItem = _970;
}, onOpen: function() {
this.isShowingNow = true;
        this.set("activated", true);
}, onClose: function() {
this.set("activated", false);
        this.set("selected", null);
        this.isShowingNow = false;
        this.parentMenu = null;
}, _closeChild: function() {
this._stopPopupTimer();
        if (this.currentPopupItem) {
if (this.focused) {
_95f.set(this.selected.focusNode, "tabIndex", this.tabIndex);
        this.selected.focusNode.focus();
}
this.currentPopupItem._closePopup();
        this.currentPopupItem = null;
}
}, _onItemFocus: function(item) {
if (this._hoveredChild && this._hoveredChild != item) {
this.onItemUnhover(this._hoveredChild);
}
this.set("selected", item);
}, _onBlur: function() {
this._cleanUp(true);
        this.inherited(arguments);
}, _cleanUp: function(_973) {
this._closeChild();
        if (typeof this.isShowingNow == "undefined") {
this.set("activated", false);
}
if (_973) {
this.set("selected", null);
}
}});
});
}, "dijit/PopupMenuItem": function() {
define(["dojo/_base/declare", "dojo/dom-style", "dojo/_base/lang", "dojo/query", "./popup", "./registry", "./MenuItem", "./hccss"], function(_974, _975, lang, _976, pm, _977, _978) {
return _974("dijit.PopupMenuItem", _978, {baseClass: "dijitMenuItem dijitPopupMenuItem", _fillContent: function() {
if (this.srcNodeRef) {
var _979 = _976("*", this.srcNodeRef);
        this.inherited(arguments, [_979[0]]);
        this.dropDownContainer = this.srcNodeRef;
}
}, _openPopup: function(_97a, _97b) {
var _97c = this.popup;
        pm.open(lang.delegate(_97a, {popup: this.popup, around: this.domNode}));
        if (_97b && _97c.focus) {
_97c.focus();
}
}, _closePopup: function() {
pm.close(this.popup);
        this.popup.parentMenu = null;
}, startup: function() {
if (this._started) {
return;
}
this.inherited(arguments);
        if (!this.popup) {
var node = _976("[widgetId]", this.dropDownContainer)[0];
        this.popup = _977.byNode(node);
}
this.ownerDocumentBody.appendChild(this.popup.domNode);
        this.popup.domNode.setAttribute("aria-labelledby", this.containerNode.id);
        this.popup.startup();
        this.popup.domNode.style.display = "none";
        if (this.arrowWrapper) {
_975.set(this.arrowWrapper, "visibility", "");
}
this.focusNode.setAttribute("aria-haspopup", "true");
}, destroyDescendants: function(_97d) {
if (this.popup) {
if (!this.popup._destroyed) {
this.popup.destroyRecursive(_97d);
}
delete this.popup;
}
this.inherited(arguments);
}});
});
}, "dijit/CheckedMenuItem": function() {
define(["dojo/_base/declare", "dojo/dom-class", "./MenuItem", "dojo/text!./templates/CheckedMenuItem.html", "./hccss"], function(_97e, _97f, _980, _981) {
return _97e("dijit.CheckedMenuItem", _980, {baseClass: "dijitMenuItem dijitCheckedMenuItem", templateString: _981, checked: false, _setCheckedAttr: function(_982) {
_97f.toggle(this.domNode, this.baseClass + "Checked", _982);
        this.domNode.setAttribute("aria-checked", _982 ? "true" : "false");
        this._set("checked", _982);
}, iconClass: "", role: "menuitemcheckbox", checkedChar: "&#10003;", onChange: function() {
}, _onClick: function(evt) {
if (!this.disabled) {
this.set("checked", !this.checked);
        this.onChange(this.checked);
}
this.onClick(evt);
}});
});
}, "dijit/MenuBar": function() {
define(["dojo/_base/declare", "dojo/keys", "./_MenuBase", "dojo/text!./templates/MenuBar.html"], function(_983, keys, _984, _985) {
return _983("dijit.MenuBar", _984, {templateString: _985, baseClass: "dijitMenuBar", popupDelay: 0, _isMenuBar: true, _orient: ["below"], _moveToPopup: function(evt) {
if (this.focusedChild && this.focusedChild.popup && !this.focusedChild.disabled) {
this.onItemClick(this.focusedChild, evt);
}
}, focusChild: function(item) {
this.inherited(arguments);
        if (this.activated && item.popup && !item.disabled) {
this._openItemPopup(item, true);
}
}, _onChildDeselect: function(item) {
if (this.currentPopupItem == item) {
this.currentPopupItem = null;
        item._closePopup();
}
this.inherited(arguments);
}, _onLeftArrow: function() {
this.focusPrev();
}, _onRightArrow: function() {
this.focusNext();
}, _onDownArrow: function(evt) {
this._moveToPopup(evt);
}, _onUpArrow: function() {
}, onItemClick: function(item, evt) {
if (item.popup && item.popup.isShowingNow && (!/^key/.test(evt.type) || evt.keyCode !== keys.DOWN_ARROW)) {
item.focusNode.focus();
        this._cleanUp(true);
} else {
this.inherited(arguments);
}
}});
});
}, "dijit/MenuBarItem": function() {
define(["dojo/_base/declare", "./MenuItem", "dojo/text!./templates/MenuBarItem.html"], function(_986, _987, _988) {
var _989 = _986("dijit._MenuBarItemMixin", null, {templateString: _988, _setIconClassAttr: null});
        var _98a = _986("dijit.MenuBarItem", [_987, _989], {});
        _98a._MenuBarItemMixin = _989;
        return _98a;
});
}, "dijit/PopupMenuBarItem": function() {
define(["dojo/_base/declare", "./PopupMenuItem", "./MenuBarItem"], function(_98b, _98c, _98d) {
var _98e = _98d._MenuBarItemMixin;
        return _98b("dijit.PopupMenuBarItem", [_98c, _98e], {});
});
}, "dijit/MenuSeparator": function() {
define(["dojo/_base/declare", "dojo/dom", "./_WidgetBase", "./_TemplatedMixin", "./_Contained", "dojo/text!./templates/MenuSeparator.html"], function(_98f, dom, _990, _991, _992, _993) {
return _98f("dijit.MenuSeparator", [_990, _991, _992], {templateString: _993, buildRendering: function() {
this.inherited(arguments);
        dom.setSelectable(this.domNode, false);
}, isFocusable: function() {
return false;
}});
});
}, "dijit/ProgressBar": function() {
define(["require", "dojo/_base/declare", "dojo/dom-class", "dojo/_base/lang", "dojo/number", "./_Widget", "./_TemplatedMixin", "dojo/text!./templates/ProgressBar.html"], function(_994, _995, _996, lang, _997, _998, _999, _99a) {
return _995("dijit.ProgressBar", [_998, _999], {progress: "0", value: "", maximum: 100, places: 0, indeterminate: false, label: "", name: "", templateString: _99a, _indeterminateHighContrastImagePath: _994.toUrl("./themes/a11y/indeterminate_progress.gif"), postMixInProperties: function() {
this.inherited(arguments);
        if (!(this.params && "value" in this.params)) {
this.value = this.indeterminate ? Infinity : this.progress;
}
}, buildRendering: function() {
this.inherited(arguments);
        this.indeterminateHighContrastImage.setAttribute("src", this._indeterminateHighContrastImagePath.toString());
        this.update();
}, _setDirAttr: function(val) {
_996.toggle(this.domNode, "dijitProgressBarRtl", val == "rtl");
        this.inherited(arguments);
}, update: function(_99b) {
lang.mixin(this, _99b || {});
        var tip = this.internalProgress, ap = this.domNode;
        var _99c = 1;
        if (this.indeterminate) {
ap.removeAttribute("aria-valuenow");
} else {
if (String(this.progress).indexOf("%") != - 1) {
_99c = Math.min(parseFloat(this.progress) / 100, 1);
        this.progress = _99c * this.maximum;
} else {
this.progress = Math.min(this.progress, this.maximum);
        _99c = this.maximum ? this.progress / this.maximum : 0;
}
ap.setAttribute("aria-valuenow", this.progress);
}
ap.setAttribute("aria-labelledby", this.labelNode.id);
        ap.setAttribute("aria-valuemin", 0);
        ap.setAttribute("aria-valuemax", this.maximum);
        this.labelNode.innerHTML = this.report(_99c);
        _996.toggle(this.domNode, "dijitProgressBarIndeterminate", this.indeterminate);
        tip.style.width = (_99c * 100) + "%";
        this.onChange();
}, _setValueAttr: function(v) {
this._set("value", v);
        if (v == Infinity) {
this.update({indeterminate: true});
} else {
this.update({indeterminate: false, progress: v});
}
}, _setLabelAttr: function(_99d) {
this._set("label", _99d);
        this.update();
}, _setIndeterminateAttr: function(_99e) {
this._set("indeterminate", _99e);
        this.update();
}, report: function(_99f) {
return this.label ? this.label : (this.indeterminate ? "&#160;" : _997.format(_99f, {type: "percent", places: this.places, locale: this.lang}));
}, onChange: function() {
}});
});
}, "dijit/TitlePane": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-geometry", "dojo/fx", "dojo/has", "dojo/_base/kernel", "dojo/keys", "./_CssStateMixin", "./_TemplatedMixin", "./layout/ContentPane", "dojo/text!./templates/TitlePane.html", "./_base/manager", "./a11yclick"], function(_9a0, _9a1, dom, _9a2, _9a3, _9a4, _9a5, has, _9a6, keys, _9a7, _9a8, _9a9, _9aa, _9ab) {
var _9ac = _9a1("dijit.TitlePane", [_9a9, _9a8, _9a7], {title: "", _setTitleAttr: {node: "titleNode", type: "innerHTML"}, open: true, toggleable: true, tabIndex: "0", duration: _9ab.defaultDuration, baseClass: "dijitTitlePane", templateString: _9aa, doLayout: false, _setTooltipAttr: {node: "focusNode", type: "attribute", attribute: "title"}, buildRendering: function() {
this.inherited(arguments);
        dom.setSelectable(this.titleNode, false);
}, postCreate: function() {
this.inherited(arguments);
        if (this.toggleable) {
this._trackMouseState(this.titleBarNode, this.baseClass + "Title");
}
var _9ad = this.hideNode, _9ae = this.wipeNode;
        this._wipeIn = _9a5.wipeIn({node: _9ae, duration: this.duration, beforeBegin: function() {
        _9ad.style.display = "";
        }});
        this._wipeOut = _9a5.wipeOut({node: _9ae, duration: this.duration, onEnd: function() {
        _9ad.style.display = "none";
        }});
}, _setOpenAttr: function(open, _9af) {
_9a0.forEach([this._wipeIn, this._wipeOut], function(_9b0) {
if (_9b0 && _9b0.status() == "playing") {
_9b0.stop();
}
});
        if (_9af) {
var anim = this[open ? "_wipeIn" : "_wipeOut"];
        anim.play();
} else {
this.hideNode.style.display = this.wipeNode.style.display = open ? "" : "none";
}
if (this._started) {
if (open) {
this._onShow();
} else {
this.onHide();
}
}
this.containerNode.setAttribute("aria-hidden", open ? "false" : "true");
        this.focusNode.setAttribute("aria-pressed", open ? "true" : "false");
        this._set("open", open);
        this._setCss();
}, _setToggleableAttr: function(_9b1) {
this.focusNode.setAttribute("role", _9b1 ? "button" : "heading");
        if (_9b1) {
this.focusNode.setAttribute("aria-controls", this.id + "_pane");
        this.focusNode.setAttribute("tabIndex", this.tabIndex);
        this.focusNode.setAttribute("aria-pressed", this.open);
} else {
_9a2.remove(this.focusNode, "aria-controls");
        _9a2.remove(this.focusNode, "tabIndex");
        _9a2.remove(this.focusNode, "aria-pressed");
}
this._set("toggleable", _9b1);
        this._setCss();
}, _setContentAttr: function(_9b2) {
if (!this.open || !this._wipeOut || this._wipeOut.status() == "playing") {
this.inherited(arguments);
} else {
if (this._wipeIn && this._wipeIn.status() == "playing") {
this._wipeIn.stop();
}
_9a4.setMarginBox(this.wipeNode, {h: _9a4.getMarginBox(this.wipeNode).h});
        this.inherited(arguments);
        if (this._wipeIn) {
this._wipeIn.play();
} else {
this.hideNode.style.display = "";
}
}
}, toggle: function() {
this._setOpenAttr(!this.open, true);
}, _setCss: function() {
var node = this.titleBarNode || this.focusNode;
        var _9b3 = this._titleBarClass;
        this._titleBarClass = this.baseClass + "Title" + (this.toggleable ? "" : "Fixed") + (this.open ? "Open" : "Closed");
        _9a3.replace(node, this._titleBarClass, _9b3 || "");
        _9a3.replace(node, this._titleBarClass.replace("TitlePaneTitle", ""), (_9b3 || "").replace("TitlePaneTitle", ""));
        this.arrowNodeInner.innerHTML = this.open ? "-" : "+";
}, _onTitleKey: function(e) {
if (e.keyCode == keys.DOWN_ARROW && this.open) {
this.containerNode.focus();
        e.preventDefault();
}
}, _onTitleClick: function() {
if (this.toggleable) {
this.toggle();
}
}, setTitle: function(_9b4) {
_9a6.deprecated("dijit.TitlePane.setTitle() is deprecated.  Use set('title', ...) instead.", "", "2.0");
        this.set("title", _9b4);
}});
        if (has("dojo-bidi")) {
_9ac.extend({_setTitleAttr: function(_9b5) {
this._set("title", _9b5);
        this.titleNode.innerHTML = _9b5;
        this.applyTextDir(this.titleNode);
}, _setTooltipAttr: function(_9b6) {
this._set("tooltip", _9b6);
        if (this.textDir) {
_9b6 = this.enforceTextDirWithUcc(null, _9b6);
}
_9a2.set(this.focusNode, "title", _9b6);
}, _setTextDirAttr: function(_9b7) {
if (this._created && this.textDir != _9b7) {
this._set("textDir", _9b7);
        this.set("title", this.title);
        this.set("tooltip", this.tooltip);
}
}});
}
return _9ac;
});
}, "dojo/fx": function() {
define(["./_base/lang", "./Evented", "./_base/kernel", "./_base/array", "./aspect", "./_base/fx", "./dom", "./dom-style", "./dom-geometry", "./ready", "require"], function(lang, _9b8, dojo, _9b9, _9ba, _9bb, dom, _9bc, geom, _9bd, _9be) {
if (!dojo.isAsync) {
_9bd(0, function() {
var _9bf = ["./fx/Toggler"];
        _9be(_9bf);
});
}
var _9c0 = dojo.fx = {};
        var _9c1 = {_fire: function(evt, args) {
        if (this[evt]) {
        this[evt].apply(this, args || []);
        }
        return this;
        }};
        var _9c2 = function(_9c3) {
        this._index = - 1;
                this._animations = _9c3 || [];
                this._current = this._onAnimateCtx = this._onEndCtx = null;
                this.duration = 0;
                _9b9.forEach(this._animations, function(a) {
                this.duration += a.duration;
                        if (a.delay) {
                this.duration += a.delay;
                }
                }, this);
        };
        _9c2.prototype = new _9b8();
        lang.extend(_9c2, {_onAnimate: function() {
        this._fire("onAnimate", arguments);
        }, _onEnd: function() {
        this._onAnimateCtx.remove();
                this._onEndCtx.remove();
                this._onAnimateCtx = this._onEndCtx = null;
                if (this._index + 1 == this._animations.length) {
        this._fire("onEnd");
        } else {
        this._current = this._animations[++this._index];
                this._onAnimateCtx = _9ba.after(this._current, "onAnimate", lang.hitch(this, "_onAnimate"), true);
                this._onEndCtx = _9ba.after(this._current, "onEnd", lang.hitch(this, "_onEnd"), true);
                this._current.play(0, true);
        }
        }, play: function(_9c4, _9c5) {
        if (!this._current) {
        this._current = this._animations[this._index = 0];
        }
        if (!_9c5 && this._current.status() == "playing") {
        return this;
        }
        var _9c6 = _9ba.after(this._current, "beforeBegin", lang.hitch(this, function() {
        this._fire("beforeBegin");
        }), true), _9c7 = _9ba.after(this._current, "onBegin", lang.hitch(this, function(arg) {
        this._fire("onBegin", arguments);
        }), true), _9c8 = _9ba.after(this._current, "onPlay", lang.hitch(this, function(arg) {
        this._fire("onPlay", arguments);
                _9c6.remove();
                _9c7.remove();
                _9c8.remove();
        }));
                if (this._onAnimateCtx) {
        this._onAnimateCtx.remove();
        }
        this._onAnimateCtx = _9ba.after(this._current, "onAnimate", lang.hitch(this, "_onAnimate"), true);
                if (this._onEndCtx) {
        this._onEndCtx.remove();
        }
        this._onEndCtx = _9ba.after(this._current, "onEnd", lang.hitch(this, "_onEnd"), true);
                this._current.play.apply(this._current, arguments);
                return this;
        }, pause: function() {
        if (this._current) {
        var e = _9ba.after(this._current, "onPause", lang.hitch(this, function(arg) {
        this._fire("onPause", arguments);
                e.remove();
        }), true);
                this._current.pause();
        }
        return this;
        }, gotoPercent: function(_9c9, _9ca) {
        this.pause();
                var _9cb = this.duration * _9c9;
                this._current = null;
                _9b9.some(this._animations, function(a) {
                if (a.duration <= _9cb) {
                this._current = a;
                        return true;
                }
                _9cb -= a.duration;
                        return false;
                });
                if (this._current) {
        this._current.gotoPercent(_9cb / this._current.duration, _9ca);
        }
        return this;
        }, stop: function(_9cc) {
        if (this._current) {
        if (_9cc) {
        for (; this._index + 1 < this._animations.length; ++this._index) {
        this._animations[this._index].stop(true);
        }
        this._current = this._animations[this._index];
        }
        var e = _9ba.after(this._current, "onStop", lang.hitch(this, function(arg) {
        this._fire("onStop", arguments);
                e.remove();
        }), true);
                this._current.stop();
        }
        return this;
        }, status: function() {
        return this._current ? this._current.status() : "stopped";
        }, destroy: function() {
        if (this._onAnimateCtx) {
        this._onAnimateCtx.remove();
        }
        if (this._onEndCtx) {
        this._onEndCtx.remove();
        }
        }});
        lang.extend(_9c2, _9c1);
        _9c0.chain = function(_9cd) {
        return new _9c2(_9cd);
        };
        var _9ce = function(_9cf) {
        this._animations = _9cf || [];
                this._connects = [];
                this._finished = 0;
                this.duration = 0;
                _9b9.forEach(_9cf, function(a) {
                var _9d0 = a.duration;
                        if (a.delay) {
                _9d0 += a.delay;
                }
                if (this.duration < _9d0) {
                this.duration = _9d0;
                }
                this._connects.push(_9ba.after(a, "onEnd", lang.hitch(this, "_onEnd"), true));
                }, this);
                this._pseudoAnimation = new _9bb.Animation({curve: [0, 1], duration: this.duration});
                var self = this;
                _9b9.forEach(["beforeBegin", "onBegin", "onPlay", "onAnimate", "onPause", "onStop", "onEnd"], function(evt) {
                self._connects.push(_9ba.after(self._pseudoAnimation, evt, function() {
                self._fire(evt, arguments);
                }, true));
                });
        };
        lang.extend(_9ce, {_doAction: function(_9d1, args) {
        _9b9.forEach(this._animations, function(a) {
        a[_9d1].apply(a, args);
        });
                return this;
        }, _onEnd: function() {
        if (++this._finished > this._animations.length) {
        this._fire("onEnd");
        }
        }, _call: function(_9d2, args) {
        var t = this._pseudoAnimation;
                t[_9d2].apply(t, args);
        }, play: function(_9d3, _9d4) {
        this._finished = 0;
                this._doAction("play", arguments);
                this._call("play", arguments);
                return this;
        }, pause: function() {
        this._doAction("pause", arguments);
                this._call("pause", arguments);
                return this;
        }, gotoPercent: function(_9d5, _9d6) {
        var ms = this.duration * _9d5;
                _9b9.forEach(this._animations, function(a) {
                a.gotoPercent(a.duration < ms ? 1 : (ms / a.duration), _9d6);
                });
                this._call("gotoPercent", arguments);
                return this;
        }, stop: function(_9d7) {
        this._doAction("stop", arguments);
                this._call("stop", arguments);
                return this;
        }, status: function() {
        return this._pseudoAnimation.status();
        }, destroy: function() {
        _9b9.forEach(this._connects, function(_9d8) {
        _9d8.remove();
        });
        }});
        lang.extend(_9ce, _9c1);
        _9c0.combine = function(_9d9) {
        return new _9ce(_9d9);
        };
        _9c0.wipeIn = function(args) {
        var node = args.node = dom.byId(args.node), s = node.style, o;
                var anim = _9bb.animateProperty(lang.mixin({properties: {height: {start: function() {
                o = s.overflow;
                        s.overflow = "hidden";
                        if (s.visibility == "hidden" || s.display == "none") {
                s.height = "1px";
                        s.display = "";
                        s.visibility = "";
                        return 1;
                } else {
                var _9da = _9bc.get(node, "height");
                        return Math.max(_9da, 1);
                }
                }, end: function() {
                return node.scrollHeight;
                }}}}, args));
                var fini = function() {
                s.height = "auto";
                        s.overflow = o;
                };
                _9ba.after(anim, "onStop", fini, true);
                _9ba.after(anim, "onEnd", fini, true);
                return anim;
        };
        _9c0.wipeOut = function(args) {
        var node = args.node = dom.byId(args.node), s = node.style, o;
                var anim = _9bb.animateProperty(lang.mixin({properties: {height: {end: 1}}}, args));
                _9ba.after(anim, "beforeBegin", function() {
                o = s.overflow;
                        s.overflow = "hidden";
                        s.display = "";
                }, true);
                var fini = function() {
                s.overflow = o;
                        s.height = "auto";
                        s.display = "none";
                };
                _9ba.after(anim, "onStop", fini, true);
                _9ba.after(anim, "onEnd", fini, true);
                return anim;
        };
        _9c0.slideTo = function(args) {
        var node = args.node = dom.byId(args.node), top = null, left = null;
                var init = (function(n) {
                return function() {
                var cs = _9bc.getComputedStyle(n);
                        var pos = cs.position;
                        top = (pos == "absolute" ? n.offsetTop : parseInt(cs.top) || 0);
                        left = (pos == "absolute" ? n.offsetLeft : parseInt(cs.left) || 0);
                        if (pos != "absolute" && pos != "relative") {
                var ret = geom.position(n, true);
                        top = ret.y;
                        left = ret.x;
                        n.style.position = "absolute";
                        n.style.top = top + "px";
                        n.style.left = left + "px";
                }
                };
                })(node);
                init();
                var anim = _9bb.animateProperty(lang.mixin({properties: {top: args.top || 0, left: args.left || 0}}, args));
                _9ba.after(anim, "beforeBegin", init, true);
                return anim;
        };
        return _9c0;
});
}, "dijit/Tree": function() {
define(["dojo/_base/array", "dojo/aspect", "dojo/cookie", "dojo/_base/declare", "dojo/Deferred", "dojo/promise/all", "dojo/dom", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/errors/create", "dojo/fx", "dojo/has", "dojo/_base/kernel", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/topic", "dojo/touch", "dojo/when", "./a11yclick", "./focus", "./registry", "./_base/manager", "./_Widget", "./_TemplatedMixin", "./_Container", "./_Contained", "./_CssStateMixin", "./_KeyNavMixin", "dojo/text!./templates/TreeNode.html", "dojo/text!./templates/Tree.html", "./tree/TreeStoreModel", "./tree/ForestStoreModel", "./tree/_dndSelector", "dojo/query!css2"], function(_9db, _9dc, _9dd, _9de, _9df, all, dom, _9e0, _9e1, _9e2, _9e3, _9e4, has, _9e5, keys, lang, on, _9e6, _9e7, when, _9e8, _9e9, _9ea, _9eb, _9ec, _9ed, _9ee, _9ef, _9f0, _9f1, _9f2, _9f3, _9f4, _9f5, _9f6) {
function _9f7(d) {
return lang.delegate(d.promise || d, {addCallback: function(_9f8) {
this.then(_9f8);
}, addErrback: function(_9f9) {
this.otherwise(_9f9);
}});
}
;
        var _9fa = _9de("dijit._TreeNode", [_9ec, _9ed, _9ee, _9ef, _9f0], {item: null, isTreeNode: true, label: "", _setLabelAttr: function(val) {
        this.labelNode[this.labelType == "html" ? "innerHTML" : "innerText" in this.labelNode ? "innerText" : "textContent"] = val;
                this._set("label", val);
        }, labelType: "text", isExpandable: null, isExpanded: false, state: "NotLoaded", templateString: _9f2, baseClass: "dijitTreeNode", cssStateNodes: {rowNode: "dijitTreeRow"}, _setTooltipAttr: {node: "rowNode", type: "attribute", attribute: "title"}, buildRendering: function() {
        this.inherited(arguments);
                this._setExpando();
                this._updateItemClasses(this.item);
                if (this.isExpandable) {
        this.labelNode.setAttribute("aria-expanded", this.isExpanded);
        }
        this.setSelected(false);
        }, _setIndentAttr: function(_9fb) {
        var _9fc = (Math.max(_9fb, 0) * this.tree._nodePixelIndent) + "px";
                _9e2.set(this.domNode, "backgroundPosition", _9fc + " 0px");
                _9e2.set(this.rowNode, this.isLeftToRight() ? "paddingLeft" : "paddingRight", _9fc);
                _9db.forEach(this.getChildren(), function(_9fd) {
                _9fd.set("indent", _9fb + 1);
                });
                this._set("indent", _9fb);
        }, markProcessing: function() {
        this.state = "Loading";
                this._setExpando(true);
        }, unmarkProcessing: function() {
        this._setExpando(false);
        }, _updateItemClasses: function(item) {
        var tree = this.tree, _9fe = tree.model;
                if (tree._v10Compat && item === _9fe.root) {
        item = null;
        }
        this._applyClassAndStyle(item, "icon", "Icon");
                this._applyClassAndStyle(item, "label", "Label");
                this._applyClassAndStyle(item, "row", "Row");
                this.tree._startPaint(true);
        }, _applyClassAndStyle: function(item, _9ff, _a00) {
        var _a01 = "_" + _9ff + "Class";
                var _a02 = _9ff + "Node";
                var _a03 = this[_a01];
                this[_a01] = this.tree["get" + _a00 + "Class"](item, this.isExpanded);
                _9e0.replace(this[_a02], this[_a01] || "", _a03 || "");
                _9e2.set(this[_a02], this.tree["get" + _a00 + "Style"](item, this.isExpanded) || {});
        }, _updateLayout: function() {
        var _a04 = this.getParent();
                if (!_a04 || !_a04.rowNode || _a04.rowNode.style.display == "none") {
        _9e0.add(this.domNode, "dijitTreeIsRoot");
        } else {
        _9e0.toggle(this.domNode, "dijitTreeIsLast", !this.getNextSibling());
        }
        }, _setExpando: function(_a05) {
        var _a06 = ["dijitTreeExpandoLoading", "dijitTreeExpandoOpened", "dijitTreeExpandoClosed", "dijitTreeExpandoLeaf"], _a07 = ["*", "-", "+", "*"], idx = _a05 ? 0 : (this.isExpandable ? (this.isExpanded ? 1 : 2) : 3);
                _9e0.replace(this.expandoNode, _a06[idx], _a06);
                this.expandoNodeText.innerHTML = _a07[idx];
        }, expand: function() {
        if (this._expandDeferred) {
        return _9f7(this._expandDeferred);
        }
        if (this._collapseDeferred) {
        this._collapseDeferred.cancel();
                delete this._collapseDeferred;
        }
        this.isExpanded = true;
                this.labelNode.setAttribute("aria-expanded", "true");
                if (this.tree.showRoot || this !== this.tree.rootNode) {
        this.containerNode.setAttribute("role", "group");
        }
        _9e0.add(this.contentNode, "dijitTreeContentExpanded");
                this._setExpando();
                this._updateItemClasses(this.item);
                if (this == this.tree.rootNode && this.tree.showRoot) {
        this.tree.domNode.setAttribute("aria-expanded", "true");
        }
        var _a08 = _9e4.wipeIn({node: this.containerNode, duration: _9eb.defaultDuration});
                var def = (this._expandDeferred = new _9df(function() {
                _a08.stop();
                }));
                _9dc.after(_a08, "onEnd", function() {
                def.resolve(true);
                }, true);
                _a08.play();
                return _9f7(def);
        }, collapse: function() {
        if (this._collapseDeferred) {
        return _9f7(this._collapseDeferred);
        }
        if (this._expandDeferred) {
        this._expandDeferred.cancel();
                delete this._expandDeferred;
        }
        this.isExpanded = false;
                this.labelNode.setAttribute("aria-expanded", "false");
                if (this == this.tree.rootNode && this.tree.showRoot) {
        this.tree.domNode.setAttribute("aria-expanded", "false");
        }
        _9e0.remove(this.contentNode, "dijitTreeContentExpanded");
                this._setExpando();
                this._updateItemClasses(this.item);
                var _a09 = _9e4.wipeOut({node: this.containerNode, duration: _9eb.defaultDuration});
                var def = (this._collapseDeferred = new _9df(function() {
                _a09.stop();
                }));
                _9dc.after(_a09, "onEnd", function() {
                def.resolve(true);
                }, true);
                _a09.play();
                return _9f7(def);
        }, indent: 0, setChildItems: function(_a0a) {
        var tree = this.tree, _a0b = tree.model, defs = [];
                var _a0c = this.getChildren();
                _9db.forEach(_a0c, function(_a0d) {
                _9ee.prototype.removeChild.call(this, _a0d);
                }, this);
                this.defer(function() {
                _9db.forEach(_a0c, function(node) {
                if (!node._destroyed && !node.getParent()) {
                tree.dndController.removeTreeNode(node);
                        function _a0e(node) {
                        var id = _a0b.getIdentity(node.item), ary = tree._itemNodesMap[id];
                                if (ary.length == 1) {
                        delete tree._itemNodesMap[id];
                        } else {
                        var _a0f = _9db.indexOf(ary, node);
                                if (_a0f != - 1) {
                        ary.splice(_a0f, 1);
                        }
                        }
                        _9db.forEach(node.getChildren(), _a0e);
                        }
                ;
                        _a0e(node);
                        if (tree.persist) {
                var _a10 = _9db.map(node.getTreePath(), function(item) {
                return tree.model.getIdentity(item);
                }).join("/");
                        for (var path in tree._openedNodes) {
                if (path.substr(0, _a10.length) == _a10) {
                delete tree._openedNodes[path];
                }
                }
                tree._saveExpandedNodes();
                }
                node.destroyRecursive();
                }
                });
                });
                this.state = "Loaded";
                if (_a0a && _a0a.length > 0) {
        this.isExpandable = true;
                _9db.forEach(_a0a, function(item) {
                var id = _a0b.getIdentity(item), _a11 = tree._itemNodesMap[id], node;
                        if (_a11) {
                for (var i = 0; i < _a11.length; i++) {
                if (_a11[i] && !_a11[i].getParent()) {
                node = _a11[i];
                        node.set("indent", this.indent + 1);
                        break;
                }
                }
                }
                if (!node) {
                node = this.tree._createTreeNode({item: item, tree: tree, isExpandable: _a0b.mayHaveChildren(item), label: tree.getLabel(item), labelType: (tree.model && tree.model.labelType) || "text", tooltip: tree.getTooltip(item), ownerDocument: tree.ownerDocument, dir: tree.dir, lang: tree.lang, textDir: tree.textDir, indent: this.indent + 1});
                        if (_a11) {
                _a11.push(node);
                } else {
                tree._itemNodesMap[id] = [node];
                }
                }
                this.addChild(node);
                        if (this.tree.autoExpand || this.tree._state(node)) {
                defs.push(tree._expandNode(node));
                }
                }, this);
                _9db.forEach(this.getChildren(), function(_a12) {
                _a12._updateLayout();
                });
        } else {
        this.isExpandable = false;
        }
        if (this._setExpando) {
        this._setExpando(false);
        }
        this._updateItemClasses(this.item);
                var def = all(defs);
                this.tree._startPaint(def);
                return _9f7(def);
        }, getTreePath: function() {
        var node = this;
                var path = [];
                while (node && node !== this.tree.rootNode) {
        path.unshift(node.item);
                node = node.getParent();
        }
        path.unshift(this.tree.rootNode.item);
                return path;
        }, getIdentity: function() {
        return this.tree.model.getIdentity(this.item);
        }, removeChild: function(node) {
        this.inherited(arguments);
                var _a13 = this.getChildren();
                if (_a13.length == 0) {
        this.isExpandable = false;
                this.collapse();
        }
        _9db.forEach(_a13, function(_a14) {
        _a14._updateLayout();
        });
        }, makeExpandable: function() {
        this.isExpandable = true;
                this._setExpando(false);
        }, setSelected: function(_a15) {
        this.labelNode.setAttribute("aria-selected", _a15 ? "true" : "false");
                _9e0.toggle(this.rowNode, "dijitTreeRowSelected", _a15);
        }, focus: function() {
        _9e9.focus(this.focusNode);
        }});
        if (has("dojo-bidi")) {
_9fa.extend({_setTextDirAttr: function(_a16) {
if (_a16 && ((this.textDir != _a16) || !this._created)) {
this._set("textDir", _a16);
        this.applyTextDir(this.labelNode);
        _9db.forEach(this.getChildren(), function(_a17) {
        _a17.set("textDir", _a16);
        }, this);
}
}});
}
var Tree = _9de("dijit.Tree", [_9ec, _9f1, _9ed, _9f0], {baseClass: "dijitTree", store: null, model: null, query: null, label: "", showRoot: true, childrenAttr: ["children"], paths: [], path: [], selectedItems: null, selectedItem: null, openOnClick: false, openOnDblClick: false, templateString: _9f3, persist: false, autoExpand: false, dndController: _9f6, dndParams: ["onDndDrop", "itemCreator", "onDndCancel", "checkAcceptance", "checkItemAcceptance", "dragThreshold", "betweenThreshold"], onDndDrop: null, itemCreator: null, onDndCancel: null, checkAcceptance: null, checkItemAcceptance: null, dragThreshold: 5, betweenThreshold: 0, _nodePixelIndent: 19, _publish: function(_a18, _a19) {
_9e6.publish(this.id, lang.mixin({tree: this, event: _a18}, _a19 || {}));
}, postMixInProperties: function() {
this.tree = this;
        if (this.autoExpand) {
this.persist = false;
}
this._itemNodesMap = {};
        if (!this.cookieName && this.id) {
this.cookieName = this.id + "SaveStateCookie";
}
this.expandChildrenDeferred = new _9df();
        this.pendingCommandsPromise = this.expandChildrenDeferred.promise;
        this.inherited(arguments);
}, postCreate: function() {
this._initState();
        var self = this;
        this.own(on(this.containerNode, on.selector(".dijitTreeNode", _9e7.enter), function(evt) {
        self._onNodeMouseEnter(_9ea.byNode(this), evt);
        }), on(this.containerNode, on.selector(".dijitTreeNode", _9e7.leave), function(evt) {
        self._onNodeMouseLeave(_9ea.byNode(this), evt);
        }), on(this.containerNode, _9e8, function(evt) {
        var node = _9ea.getEnclosingWidget(evt.target);
                if (node.isInstanceOf(_9fa)) {
        self._onClick(node, evt);
        }
        }), on(this.containerNode, on.selector(".dijitTreeNode", "dblclick"), function(evt) {
        self._onDblClick(_9ea.byNode(this), evt);
        }));
        if (!this.model) {
this._store2model();
}
this.own(_9dc.after(this.model, "onChange", lang.hitch(this, "_onItemChange"), true), _9dc.after(this.model, "onChildrenChange", lang.hitch(this, "_onItemChildrenChange"), true), _9dc.after(this.model, "onDelete", lang.hitch(this, "_onItemDelete"), true));
        this.inherited(arguments);
        if (this.dndController) {
if (lang.isString(this.dndController)) {
this.dndController = lang.getObject(this.dndController);
}
var _a1a = {};
        for (var i = 0; i < this.dndParams.length; i++) {
if (this[this.dndParams[i]]) {
_a1a[this.dndParams[i]] = this[this.dndParams[i]];
}
}
this.dndController = new this.dndController(this, _a1a);
}
this._load();
        this.onLoadDeferred = _9f7(this.pendingCommandsPromise);
        this.onLoadDeferred.then(lang.hitch(this, "onLoad"));
}, _store2model: function() {
this._v10Compat = true;
        _9e5.deprecated("Tree: from version 2.0, should specify a model object rather than a store/query");
        var _a1b = {id: this.id + "_ForestStoreModel", store: this.store, query: this.query, childrenAttrs: this.childrenAttr};
        if (this.params.mayHaveChildren) {
_a1b.mayHaveChildren = lang.hitch(this, "mayHaveChildren");
}
if (this.params.getItemChildren) {
_a1b.getChildren = lang.hitch(this, function(item, _a1c, _a1d) {
this.getItemChildren((this._v10Compat && item === this.model.root) ? null : item, _a1c, _a1d);
});
}
this.model = new _9f5(_a1b);
        this.showRoot = Boolean(this.label);
}, onLoad: function() {
}, _load: function() {
this.model.getRoot(lang.hitch(this, function(item) {
var rn = (this.rootNode = this.tree._createTreeNode({item: item, tree: this, isExpandable: true, label: this.label || this.getLabel(item), labelType: this.model.labelType || "text", textDir: this.textDir, indent: this.showRoot ? 0 : - 1}));
        if (!this.showRoot) {
rn.rowNode.style.display = "none";
        this.domNode.setAttribute("role", "presentation");
        this.domNode.removeAttribute("aria-expanded");
        this.domNode.removeAttribute("aria-multiselectable");
        if (this["aria-label"]) {
rn.containerNode.setAttribute("aria-label", this["aria-label"]);
        this.domNode.removeAttribute("aria-label");
} else {
if (this["aria-labelledby"]) {
rn.containerNode.setAttribute("aria-labelledby", this["aria-labelledby"]);
        this.domNode.removeAttribute("aria-labelledby");
}
}
rn.labelNode.setAttribute("role", "presentation");
        rn.containerNode.setAttribute("role", "tree");
        rn.containerNode.setAttribute("aria-expanded", "true");
        rn.containerNode.setAttribute("aria-multiselectable", !this.dndController.singular);
} else {
this.domNode.setAttribute("aria-multiselectable", !this.dndController.singular);
        this.rootLoadingIndicator.style.display = "none";
}
this.containerNode.appendChild(rn.domNode);
        var _a1e = this.model.getIdentity(item);
        if (this._itemNodesMap[_a1e]) {
this._itemNodesMap[_a1e].push(rn);
} else {
this._itemNodesMap[_a1e] = [rn];
}
rn._updateLayout();
        this._expandNode(rn).then(lang.hitch(this, function() {
this.rootLoadingIndicator.style.display = "none";
        this.expandChildrenDeferred.resolve(true);
}));
}), lang.hitch(this, function(err) {
console.error(this, ": error loading root: ", err);
}));
}, getNodesByItem: function(item) {
if (!item) {
return [];
}
var _a1f = lang.isString(item) ? item : this.model.getIdentity(item);
        return [].concat(this._itemNodesMap[_a1f]);
}, _setSelectedItemAttr: function(item) {
this.set("selectedItems", [item]);
}, _setSelectedItemsAttr: function(_a20) {
var tree = this;
        return this.pendingCommandsPromise = this.pendingCommandsPromise.always(lang.hitch(this, function() {
        var _a21 = _9db.map(_a20, function(item) {
        return (!item || lang.isString(item)) ? item : tree.model.getIdentity(item);
        });
                var _a22 = [];
                _9db.forEach(_a21, function(id) {
                _a22 = _a22.concat(tree._itemNodesMap[id] || []);
                });
                this.set("selectedNodes", _a22);
        }));
}, _setPathAttr: function(path) {
if (path.length) {
return _9f7(this.set("paths", [path]).then(function(_a23) {
return _a23[0];
}));
} else {
return _9f7(this.set("paths", []).then(function(_a24) {
return _a24[0];
}));
}
}, _setPathsAttr: function(_a25) {
var tree = this;
        function _a26(path, _a27) {
        var _a28 = path.shift();
                var _a29 = _9db.filter(_a27, function(node) {
                return node.getIdentity() == _a28;
                })[0];
                if (!!_a29) {
        if (path.length) {
        return tree._expandNode(_a29).then(function() {
        return _a26(path, _a29.getChildren());
        });
        } else {
        return _a29;
        }
        } else {
        throw new Tree.PathError("Could not expand path at " + _a28);
        }
        }
;
        return _9f7(this.pendingCommandsPromise = this.pendingCommandsPromise.always(function() {
        return all(_9db.map(_a25, function(path) {
        path = _9db.map(path, function(item) {
        return lang.isString(item) ? item : tree.model.getIdentity(item);
        });
                if (path.length) {
        return _a26(path, [tree.rootNode]);
        } else {
        throw new Tree.PathError("Empty path");
        }
        }));
        }).then(function setNodes(_a2a) {
        tree.set("selectedNodes", _a2a);
                return tree.paths;
        }));
}, _setSelectedNodeAttr: function(node) {
this.set("selectedNodes", [node]);
}, _setSelectedNodesAttr: function(_a2b) {
this.dndController.setSelection(_a2b);
}, expandAll: function() {
var _a2c = this;
        function _a2d(node) {
        return _a2c._expandNode(node).then(function() {
        var _a2e = _9db.filter(node.getChildren() || [], function(node) {
        return node.isExpandable;
        });
                return all(_9db.map(_a2e, _a2d));
        });
        }
;
        return _9f7(_a2d(this.rootNode));
}, collapseAll: function() {
var _a2f = this;
        function _a30(node) {
        var _a31 = _9db.filter(node.getChildren() || [], function(node) {
        return node.isExpandable;
        }), defs = all(_9db.map(_a31, _a30));
                if (!node.isExpanded || (node == _a2f.rootNode && !_a2f.showRoot)) {
        return defs;
        } else {
        return defs.then(function() {
        return _a2f._collapseNode(node);
        });
        }
        }
;
        return _9f7(_a30(this.rootNode));
}, mayHaveChildren: function() {
}, getItemChildren: function() {
}, getLabel: function(item) {
return this.model.getLabel(item);
}, getIconClass: function(item, _a32) {
return (!item || this.model.mayHaveChildren(item)) ? (_a32 ? "dijitFolderOpened" : "dijitFolderClosed") : "dijitLeaf";
}, getLabelClass: function() {
}, getRowClass: function() {
}, getIconStyle: function() {
}, getLabelStyle: function() {
}, getRowStyle: function() {
}, getTooltip: function() {
return "";
}, _onDownArrow: function(evt, node) {
var _a33 = this._getNext(node);
        if (_a33 && _a33.isTreeNode) {
this.focusNode(_a33);
}
}, _onUpArrow: function(evt, node) {
var _a34 = node.getPreviousSibling();
        if (_a34) {
node = _a34;
        while (node.isExpandable && node.isExpanded && node.hasChildren()) {
var _a35 = node.getChildren();
        node = _a35[_a35.length - 1];
}
} else {
var _a36 = node.getParent();
        if (!(!this.showRoot && _a36 === this.rootNode)) {
node = _a36;
}
}
if (node && node.isTreeNode) {
this.focusNode(node);
}
}, _onRightArrow: function(evt, node) {
if (node.isExpandable && !node.isExpanded) {
this._expandNode(node);
} else {
if (node.hasChildren()) {
node = node.getChildren()[0];
        if (node && node.isTreeNode) {
this.focusNode(node);
}
}
}
}, _onLeftArrow: function(evt, node) {
if (node.isExpandable && node.isExpanded) {
this._collapseNode(node);
} else {
var _a37 = node.getParent();
        if (_a37 && _a37.isTreeNode && !(!this.showRoot && _a37 === this.rootNode)) {
this.focusNode(_a37);
}
}
}, focusLastChild: function() {
var node = this._getLast();
        if (node && node.isTreeNode) {
this.focusNode(node);
}
}, _getFirst: function() {
return this.showRoot ? this.rootNode : this.rootNode.getChildren()[0];
}, _getLast: function() {
var node = this.rootNode;
        while (node.isExpanded) {
var c = node.getChildren();
        if (!c.length) {
break;
}
node = c[c.length - 1];
}
return node;
}, _getNext: function(node) {
if (node.isExpandable && node.isExpanded && node.hasChildren()) {
return node.getChildren()[0];
} else {
while (node && node.isTreeNode) {
var _a38 = node.getNextSibling();
        if (_a38) {
return _a38;
}
node = node.getParent();
}
return null;
}
}, childSelector: ".dijitTreeRow", isExpandoNode: function(node, _a39) {
return dom.isDescendant(node, _a39.expandoNode) || dom.isDescendant(node, _a39.expandoNodeText);
}, __click: function(_a3a, e, _a3b, func) {
var _a3c = e.target, _a3d = this.isExpandoNode(_a3c, _a3a);
        if (_a3a.isExpandable && (_a3b || _a3d)) {
this._onExpandoClick({node: _a3a});
} else {
this._publish("execute", {item: _a3a.item, node: _a3a, evt: e});
        this[func](_a3a.item, _a3a, e);
        this.focusNode(_a3a);
}
e.stopPropagation();
        e.preventDefault();
}, _onClick: function(_a3e, e) {
this.__click(_a3e, e, this.openOnClick, "onClick");
}, _onDblClick: function(_a3f, e) {
this.__click(_a3f, e, this.openOnDblClick, "onDblClick");
}, _onExpandoClick: function(_a40) {
var node = _a40.node;
        this.focusNode(node);
        if (node.isExpanded) {
this._collapseNode(node);
} else {
this._expandNode(node);
}
}, onClick: function() {
}, onDblClick: function() {
}, onOpen: function() {
}, onClose: function() {
}, _getNextNode: function(node) {
_9e5.deprecated(this.declaredClass + "::_getNextNode(node) is deprecated. Use _getNext(node) instead.", "", "2.0");
        return this._getNext(node);
}, _getRootOrFirstNode: function() {
_9e5.deprecated(this.declaredClass + "::_getRootOrFirstNode() is deprecated. Use _getFirst() instead.", "", "2.0");
        return this._getFirst();
}, _collapseNode: function(node) {
if (node._expandNodeDeferred) {
delete node._expandNodeDeferred;
}
if (node.state == "Loading") {
return;
}
if (node.isExpanded) {
var ret = node.collapse();
        this.onClose(node.item, node);
        this._state(node, false);
        this._startPaint(ret);
        return ret;
}
}, _expandNode: function(node) {
if (node._expandNodeDeferred) {
return node._expandNodeDeferred;
}
var _a41 = this.model, item = node.item, _a42 = this;
        if (!node._loadDeferred) {
node.markProcessing();
        node._loadDeferred = new _9df();
        _a41.getChildren(item, function(_a43) {
        node.unmarkProcessing();
                node.setChildItems(_a43).then(function() {
        node._loadDeferred.resolve(_a43);
        });
        }, function(err) {
        console.error(_a42, ": error loading " + node.label + " children: ", err);
                node._loadDeferred.reject(err);
        });
}
var def = node._loadDeferred.then(lang.hitch(this, function() {
var def2 = node.expand();
        this.onOpen(node.item, node);
        this._state(node, true);
        return def2;
}));
        this._startPaint(def);
        return def;
}, focusNode: function(node) {
this.focusChild(node);
}, _onNodeMouseEnter: function() {
}, _onNodeMouseLeave: function() {
}, _onItemChange: function(item) {
var _a44 = this.model, _a45 = _a44.getIdentity(item), _a46 = this._itemNodesMap[_a45];
        if (_a46) {
var _a47 = this.getLabel(item), _a48 = this.getTooltip(item);
        _9db.forEach(_a46, function(node) {
        node.set({item: item, label: _a47, tooltip: _a48});
                node._updateItemClasses(item);
        });
}
}, _onItemChildrenChange: function(_a49, _a4a) {
var _a4b = this.model, _a4c = _a4b.getIdentity(_a49), _a4d = this._itemNodesMap[_a4c];
        if (_a4d) {
_9db.forEach(_a4d, function(_a4e) {
_a4e.setChildItems(_a4a);
});
}
}, _onItemDelete: function(item) {
var _a4f = this.model, _a50 = _a4f.getIdentity(item), _a51 = this._itemNodesMap[_a50];
        if (_a51) {
_9db.forEach(_a51, function(node) {
this.dndController.removeTreeNode(node);
        var _a52 = node.getParent();
        if (_a52) {
_a52.removeChild(node);
}
node.destroyRecursive();
}, this);
        delete this._itemNodesMap[_a50];
}
}, _initState: function() {
this._openedNodes = {};
        if (this.persist && this.cookieName) {
var oreo = _9dd(this.cookieName);
        if (oreo) {
_9db.forEach(oreo.split(","), function(item) {
this._openedNodes[item] = true;
}, this);
}
}
}, _state: function(node, _a53) {
if (!this.persist) {
return false;
}
var path = _9db.map(node.getTreePath(), function(item) {
return this.model.getIdentity(item);
}, this).join("/");
        if (arguments.length === 1) {
return this._openedNodes[path];
} else {
if (_a53) {
this._openedNodes[path] = true;
} else {
delete this._openedNodes[path];
}
this._saveExpandedNodes();
}
}, _saveExpandedNodes: function() {
if (this.persist && this.cookieName) {
var ary = [];
        for (var id in this._openedNodes) {
ary.push(id);
}
_9dd(this.cookieName, ary.join(","), {expires: 365});
}
}, destroy: function() {
if (this._curSearch) {
this._curSearch.timer.remove();
        delete this._curSearch;
}
if (this.rootNode) {
this.rootNode.destroyRecursive();
}
if (this.dndController && !lang.isString(this.dndController)) {
this.dndController.destroy();
}
this.rootNode = null;
        this.inherited(arguments);
}, destroyRecursive: function() {
this.destroy();
}, resize: function(_a54) {
if (_a54) {
_9e1.setMarginBox(this.domNode, _a54);
}
this._nodePixelIndent = _9e1.position(this.tree.indentDetector).w || this._nodePixelIndent;
        this.expandChildrenDeferred.then(lang.hitch(this, function() {
        this.rootNode.set("indent", this.showRoot ? 0 : - 1);
                this._adjustWidths();
        }));
}, _outstandingPaintOperations: 0, _startPaint: function(p) {
this._outstandingPaintOperations++;
        if (this._adjustWidthsTimer) {
this._adjustWidthsTimer.remove();
        delete this._adjustWidthsTimer;
}
var oc = lang.hitch(this, function() {
this._outstandingPaintOperations--;
        if (this._outstandingPaintOperations <= 0 && !this._adjustWidthsTimer && this._started) {
this._adjustWidthsTimer = this.defer("_adjustWidths");
}
});
        when(p, oc, oc);
}, _adjustWidths: function() {
if (this._adjustWidthsTimer) {
this._adjustWidthsTimer.remove();
        delete this._adjustWidthsTimer;
}
this.containerNode.style.width = "auto";
        this.containerNode.style.width = this.domNode.scrollWidth > this.domNode.offsetWidth ? "auto" : "100%";
}, _createTreeNode: function(args) {
return new _9fa(args);
}, focus: function() {
if (this.lastFocusedChild) {
this.focusNode(this.lastFocusedChild);
} else {
this.focusFirstChild();
}
}});
        if (has("dojo-bidi")) {
Tree.extend({_setTextDirAttr: function(_a55) {
if (_a55 && this.textDir != _a55) {
this._set("textDir", _a55);
        this.rootNode.set("textDir", _a55);
}
}});
}
Tree.PathError = _9e3("TreePathError");
        Tree._TreeNode = _9fa;
        return Tree;
});
}, "dojo/cookie": function() {
define(["./_base/kernel", "./regexp"], function(dojo, _a56) {
dojo.cookie = function(name, _a57, _a58) {
var c = document.cookie, ret;
        if (arguments.length == 1) {
var _a59 = c.match(new RegExp("(?:^|; )" + _a56.escapeString(name) + "=([^;]*)"));
        ret = _a59 ? decodeURIComponent(_a59[1]) : undefined;
} else {
_a58 = _a58 || {};
        var exp = _a58.expires;
        if (typeof exp == "number") {
var d = new Date();
        d.setTime(d.getTime() + exp * 24 * 60 * 60 * 1000);
        exp = _a58.expires = d;
}
if (exp && exp.toUTCString) {
_a58.expires = exp.toUTCString();
}
_a57 = encodeURIComponent(_a57);
        var _a5a = name + "=" + _a57, _a5b;
        for (_a5b in _a58) {
_a5a += "; " + _a5b;
        var _a5c = _a58[_a5b];
        if (_a5c !== true) {
_a5a += "=" + _a5c;
}
}
document.cookie = _a5a;
}
return ret;
};
        dojo.cookie.isSupported = function() {
        if (!("cookieEnabled" in navigator)) {
        this("__djCookieTest__", "CookiesAllowed");
                navigator.cookieEnabled = this("__djCookieTest__") == "CookiesAllowed";
                if (navigator.cookieEnabled) {
        this("__djCookieTest__", "", {expires: - 1});
        }
        }
        return navigator.cookieEnabled;
        };
        return dojo.cookie;
});
}, "dijit/tree/_dndSelector": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/_base/kernel", "dojo/_base/lang", "dojo/dnd/common", "dojo/dom", "dojo/mouse", "dojo/on", "dojo/touch", "../a11yclick", "./_dndContainer"], function(_a5d, _a5e, _a5f, lang, _a60, dom, _a61, on, _a62, _a63, _a64) {
return _a5e("dijit.tree._dndSelector", _a64, {constructor: function() {
this.selection = {};
        this.anchor = null;
        this.events.push(on(this.tree.domNode, _a62.press, lang.hitch(this, "onMouseDown")), on(this.tree.domNode, _a62.release, lang.hitch(this, "onMouseUp")), on(this.tree.domNode, _a62.move, lang.hitch(this, "onMouseMove")), on(this.tree.domNode, _a63.press, lang.hitch(this, "onClickPress")), on(this.tree.domNode, _a63.release, lang.hitch(this, "onClickRelease")));
}, singular: false, getSelectedTreeNodes: function() {
var _a65 = [], sel = this.selection;
        for (var i in sel) {
_a65.push(sel[i]);
}
return _a65;
}, selectNone: function() {
this.setSelection([]);
        return this;
}, destroy: function() {
this.inherited(arguments);
        this.selection = this.anchor = null;
}, addTreeNode: function(node, _a66) {
this.setSelection(this.getSelectedTreeNodes().concat([node]));
        if (_a66) {
this.anchor = node;
}
return node;
}, removeTreeNode: function(node) {
var _a67 = _a5d.filter(this.getSelectedTreeNodes(), function(_a68) {
return !dom.isDescendant(_a68.domNode, node.domNode);
});
        this.setSelection(_a67);
        return node;
}, isTreeNodeSelected: function(node) {
return node.id && !!this.selection[node.id];
}, setSelection: function(_a69) {
var _a6a = this.getSelectedTreeNodes();
        _a5d.forEach(this._setDifference(_a6a, _a69), lang.hitch(this, function(node) {
        node.setSelected(false);
                if (this.anchor == node) {
        delete this.anchor;
        }
        delete this.selection[node.id];
        }));
        _a5d.forEach(this._setDifference(_a69, _a6a), lang.hitch(this, function(node) {
        node.setSelected(true);
                this.selection[node.id] = node;
        }));
        this._updateSelectionProperties();
}, _setDifference: function(xs, ys) {
_a5d.forEach(ys, function(y) {
y.__exclude__ = true;
});
        var ret = _a5d.filter(xs, function(x) {
        return !x.__exclude__;
        });
        _a5d.forEach(ys, function(y) {
        delete y["__exclude__"];
        });
        return ret;
}, _updateSelectionProperties: function() {
var _a6b = this.getSelectedTreeNodes();
        var _a6c = [], _a6d = [], _a6e = [];
        _a5d.forEach(_a6b, function(node) {
        var ary = node.getTreePath(), _a6f = this.tree.model;
                _a6d.push(node);
                _a6c.push(ary);
                ary = _a5d.map(ary, function(item) {
                return _a6f.getIdentity(item);
                }, this);
                _a6e.push(ary.join("/"));
        }, this);
        var _a70 = _a5d.map(_a6d, function(node) {
        return node.item;
        });
        this.tree._set("paths", _a6c);
        this.tree._set("path", _a6c[0] || []);
        this.tree._set("selectedNodes", _a6d);
        this.tree._set("selectedNode", _a6d[0] || null);
        this.tree._set("selectedItems", _a70);
        this.tree._set("selectedItem", _a70[0] || null);
}, onClickPress: function(e) {
if (this.current && this.current.isExpandable && this.tree.isExpandoNode(e.target, this.current)) {
return;
}
if (_a61.isLeft(e)) {
e.preventDefault();
}
var _a71 = e.type == "keydown" ? this.tree.focusedChild : this.current;
        if (!_a71) {
return;
}
var copy = _a60.getCopyKeyState(e), id = _a71.id;
        if (!this.singular && !e.shiftKey && this.selection[id]) {
this._doDeselect = true;
        return;
} else {
this._doDeselect = false;
}
this.userSelect(_a71, copy, e.shiftKey);
}, onClickRelease: function(e) {
if (!this._doDeselect) {
return;
}
this._doDeselect = false;
        this.userSelect(e.type == "keyup" ? this.tree.focusedChild : this.current, _a60.getCopyKeyState(e), e.shiftKey);
}, onMouseMove: function() {
this._doDeselect = false;
}, onMouseDown: function() {
}, onMouseUp: function() {
}, _compareNodes: function(n1, n2) {
if (n1 === n2) {
return 0;
}
if ("sourceIndex" in document.documentElement) {
return n1.sourceIndex - n2.sourceIndex;
} else {
if ("compareDocumentPosition" in document.documentElement) {
return n1.compareDocumentPosition(n2) & 2 ? 1 : - 1;
} else {
if (document.createRange) {
var r1 = doc.createRange();
        r1.setStartBefore(n1);
        var r2 = doc.createRange();
        r2.setStartBefore(n2);
        return r1.compareBoundaryPoints(r1.END_TO_END, r2);
} else {
throw Error("dijit.tree._compareNodes don't know how to compare two different nodes in this browser");
}
}
}
}, userSelect: function(node, _a72, _a73) {
if (this.singular) {
if (this.anchor == node && _a72) {
this.selectNone();
} else {
this.setSelection([node]);
        this.anchor = node;
}
} else {
if (_a73 && this.anchor) {
var cr = this._compareNodes(this.anchor.rowNode, node.rowNode), _a74, end, _a75 = this.anchor;
        if (cr < 0) {
_a74 = _a75;
        end = node;
} else {
_a74 = node;
        end = _a75;
}
var _a76 = [];
        while (_a74 != end) {
_a76.push(_a74);
        _a74 = this.tree._getNext(_a74);
}
_a76.push(end);
        this.setSelection(_a76);
} else {
if (this.selection[node.id] && _a72) {
this.removeTreeNode(node);
} else {
if (_a72) {
this.addTreeNode(node, true);
} else {
this.setSelection([node]);
        this.anchor = node;
}
}
}
}
}, getItem: function(key) {
var _a77 = this.selection[key];
        return {data: _a77, type: ["treeNode"]};
}, forInSelectedItems: function(f, o) {
o = o || _a5f.global;
        for (var id in this.selection) {
f.call(o, this.getItem(id), id, this);
}
}});
});
}, "dijit/tree/_dndContainer": function() {
define(["dojo/aspect", "dojo/_base/declare", "dojo/dom-class", "dojo/_base/lang", "dojo/on", "dojo/touch"], function(_a78, _a79, _a7a, lang, on, _a7b) {
return _a79("dijit.tree._dndContainer", null, {constructor: function(tree, _a7c) {
this.tree = tree;
        this.node = tree.domNode;
        lang.mixin(this, _a7c);
        this.containerState = "";
        _a7a.add(this.node, "dojoDndContainer");
        this.events = [on(this.node, _a7b.enter, lang.hitch(this, "onOverEvent")), on(this.node, _a7b.leave, lang.hitch(this, "onOutEvent")), _a78.after(this.tree, "_onNodeMouseEnter", lang.hitch(this, "onMouseOver"), true), _a78.after(this.tree, "_onNodeMouseLeave", lang.hitch(this, "onMouseOut"), true), on(this.node, "dragstart, selectstart", function(evt) {
        evt.preventDefault();
        })];
}, destroy: function() {
var h;
        while (h = this.events.pop()) {
h.remove();
}
this.node = this.parent = null;
}, onMouseOver: function(_a7d) {
this.current = _a7d;
}, onMouseOut: function() {
this.current = null;
}, _changeState: function(type, _a7e) {
var _a7f = "dojoDnd" + type;
        var _a80 = type.toLowerCase() + "State";
        _a7a.replace(this.node, _a7f + _a7e, _a7f + this[_a80]);
        this[_a80] = _a7e;
}, _addItemClass: function(node, type) {
_a7a.add(node, "dojoDndItem" + type);
}, _removeItemClass: function(node, type) {
_a7a.remove(node, "dojoDndItem" + type);
}, onOverEvent: function() {
this._changeState("Container", "Over");
}, onOutEvent: function() {
this._changeState("Container", "");
}});
});
}, "dijit/InlineEditBox": function() {
define(["require", "dojo/_base/array", "dojo/aspect", "dojo/_base/declare", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-style", "dojo/i18n", "dojo/_base/kernel", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/sniff", "dojo/when", "./a11yclick", "./focus", "./_Widget", "./_TemplatedMixin", "./_WidgetsInTemplateMixin", "./_Container", "./form/Button", "./form/_TextBoxMixin", "./form/TextBox", "dojo/text!./templates/InlineEditBox.html", "dojo/i18n!./nls/common"], function(_a81, _a82, _a83, _a84, _a85, _a86, _a87, _a88, i18n, _a89, keys, lang, on, has, when, _a8a, fm, _a8b, _a8c, _a8d, _a8e, _a8f, _a90, _a91, _a92) {
var _a93 = _a84("dijit._InlineEditor", [_a8b, _a8c, _a8d], {templateString: _a92, contextRequire: _a81, postMixInProperties: function() {
this.inherited(arguments);
        this.messages = i18n.getLocalization("dijit", "common", this.lang);
        _a82.forEach(["buttonSave", "buttonCancel"], function(prop) {
        if (!this[prop]) {
        this[prop] = this.messages[prop];
        }
        }, this);
}, buildRendering: function() {
this.inherited(arguments);
        var Cls = typeof this.editor == "string" ? (lang.getObject(this.editor) || _a81(this.editor)) : this.editor;
        var _a94 = this.sourceStyle, _a95 = "line-height:" + _a94.lineHeight + ";", _a96 = _a88.getComputedStyle(this.domNode);
        _a82.forEach(["Weight", "Family", "Size", "Style"], function(prop) {
        var _a97 = _a94["font" + prop], _a98 = _a96["font" + prop];
                if (_a98 != _a97) {
        _a95 += "font-" + prop + ":" + _a94["font" + prop] + ";";
        }
        }, this);
        _a82.forEach(["marginTop", "marginBottom", "marginLeft", "marginRight", "position", "left", "top", "right", "bottom", "float", "clear", "display"], function(prop) {
        this.domNode.style[prop] = _a94[prop];
        }, this);
        var _a99 = this.inlineEditBox.width;
        if (_a99 == "100%") {
_a95 += "width:100%;";
        this.domNode.style.display = "block";
} else {
_a95 += "width:" + (_a99 + (Number(_a99) == _a99 ? "px" : "")) + ";";
}
var _a9a = lang.delegate(this.inlineEditBox.editorParams, {style: _a95, dir: this.dir, lang: this.lang, textDir: this.textDir});
        this.editWidget = new Cls(_a9a, this.editorPlaceholder);
        if (this.inlineEditBox.autoSave) {
_a87.destroy(this.buttonContainer);
}
}, postCreate: function() {
this.inherited(arguments);
        var ew = this.editWidget;
        if (this.inlineEditBox.autoSave) {
this.own(_a83.after(ew, "onChange", lang.hitch(this, "_onChange"), true), on(ew, "keydown", lang.hitch(this, "_onKeyDown")));
} else {
if ("intermediateChanges" in ew) {
ew.set("intermediateChanges", true);
        this.own(_a83.after(ew, "onChange", lang.hitch(this, "_onIntermediateChange"), true));
        this.saveButton.set("disabled", true);
}
}
}, startup: function() {
this.editWidget.startup();
        this.inherited(arguments);
}, _onIntermediateChange: function() {
this.saveButton.set("disabled", (this.getValue() == this._resetValue) || !this.enableSave());
}, destroy: function() {
this.editWidget.destroy(true);
        this.inherited(arguments);
}, getValue: function() {
var ew = this.editWidget;
        return String(ew.get(("displayedValue" in ew || "_getDisplayedValueAttr" in ew) ? "displayedValue" : "value"));
}, _onKeyDown: function(e) {
if (this.inlineEditBox.autoSave && this.inlineEditBox.editing) {
if (e.altKey || e.ctrlKey) {
return;
}
if (e.keyCode == keys.ESCAPE) {
e.stopPropagation();
        e.preventDefault();
        this.cancel(true);
} else {
if (e.keyCode == keys.ENTER && e.target.tagName == "INPUT") {
e.stopPropagation();
        e.preventDefault();
        this._onChange();
}
}
}
}, _onBlur: function() {
this.inherited(arguments);
        if (this.inlineEditBox.autoSave && this.inlineEditBox.editing) {
if (this.getValue() == this._resetValue) {
this.cancel(false);
} else {
if (this.enableSave()) {
this.save(false);
}
}
}
}, _onChange: function() {
if (this.inlineEditBox.autoSave && this.inlineEditBox.editing && this.enableSave()) {
fm.focus(this.inlineEditBox.displayNode);
}
}, enableSave: function() {
return this.editWidget.isValid ? this.editWidget.isValid() : true;
}, focus: function() {
this.editWidget.focus();
        if (this.editWidget.focusNode) {
fm._onFocusNode(this.editWidget.focusNode);
        if (this.editWidget.focusNode.tagName == "INPUT") {
this.defer(function() {
_a90.selectInputText(this.editWidget.focusNode);
});
}
}
}});
        var _a9b = _a84("dijit.InlineEditBox" + (has("dojo-bidi") ? "_NoBidi" : ""), _a8b, {editing: false, autoSave: true, buttonSave: "", buttonCancel: "", renderAsHtml: false, editor: _a91, editorWrapper: _a93, editorParams: {}, disabled: false, onChange: function() {
        }, onCancel: function() {
        }, width: "100%", value: "", noValueIndicator: has("ie") <= 6 ? "<span style='font-family: wingdings; text-decoration: underline;'>&#160;&#160;&#160;&#160;&#x270d;&#160;&#160;&#160;&#160;</span>" : "<span style='text-decoration: underline;'>&#160;&#160;&#160;&#160;&#x270d;&#160;&#160;&#160;&#160;</span>", constructor: function() {
        this.editorParams = {};
        }, postMixInProperties: function() {
        this.inherited(arguments);
                this.displayNode = this.srcNodeRef;
                this.own(on(this.displayNode, _a8a, lang.hitch(this, "_onClick")), on(this.displayNode, "mouseover, focus", lang.hitch(this, "_onMouseOver")), on(this.displayNode, "mouseout, blur", lang.hitch(this, "_onMouseOut")));
                this.displayNode.setAttribute("role", "button");
                if (!this.displayNode.getAttribute("tabIndex")) {
        this.displayNode.setAttribute("tabIndex", 0);
        }
        if (!this.value && !("value" in this.params)) {
        this.value = lang.trim(this.renderAsHtml ? this.displayNode.innerHTML : (this.displayNode.innerText || this.displayNode.textContent || ""));
        }
        if (!this.value) {
        this.displayNode.innerHTML = this.noValueIndicator;
        }
        _a86.add(this.displayNode, "dijitInlineEditBoxDisplayMode");
        }, setDisabled: function(_a9c) {
        _a89.deprecated("dijit.InlineEditBox.setDisabled() is deprecated.  Use set('disabled', bool) instead.", "", "2.0");
                this.set("disabled", _a9c);
        }, _setDisabledAttr: function(_a9d) {
        this.domNode.setAttribute("aria-disabled", _a9d ? "true" : "false");
                if (_a9d) {
        this.displayNode.removeAttribute("tabIndex");
        } else {
        this.displayNode.setAttribute("tabIndex", 0);
        }
        _a86.toggle(this.displayNode, "dijitInlineEditBoxDisplayModeDisabled", _a9d);
                this._set("disabled", _a9d);
        }, _onMouseOver: function() {
        if (!this.disabled) {
        _a86.add(this.displayNode, "dijitInlineEditBoxDisplayModeHover");
        }
        }, _onMouseOut: function() {
        _a86.remove(this.displayNode, "dijitInlineEditBoxDisplayModeHover");
        }, _onClick: function(e) {
        if (this.disabled) {
        return;
        }
        if (e) {
        e.stopPropagation();
                e.preventDefault();
        }
        this._onMouseOut();
                this.defer("edit");
        }, edit: function() {
        if (this.disabled || this.editing) {
        return;
        }
        this._set("editing", true);
                this._savedTabIndex = _a85.get(this.displayNode, "tabIndex") || "0";
                if (!this.wrapperWidget) {
        var _a9e = _a87.create("span", null, this.domNode, "before");
                var Ewc = typeof this.editorWrapper == "string" ? lang.getObject(this.editorWrapper) : this.editorWrapper;
                this.wrapperWidget = new Ewc({value: this.value, buttonSave: this.buttonSave, buttonCancel: this.buttonCancel, dir: this.dir, lang: this.lang, tabIndex: this._savedTabIndex, editor: this.editor, inlineEditBox: this, sourceStyle: _a88.getComputedStyle(this.displayNode), save: lang.hitch(this, "save"), cancel: lang.hitch(this, "cancel"), textDir: this.textDir}, _a9e);
                if (!this.wrapperWidget._started) {
        this.wrapperWidget.startup();
        }
        if (!this._started) {
        this.startup();
        }
        }
        var ww = this.wrapperWidget;
                _a86.add(this.displayNode, "dijitOffScreen");
                _a86.remove(ww.domNode, "dijitOffScreen");
                _a88.set(ww.domNode, {visibility: "visible"});
                _a85.set(this.displayNode, "tabIndex", "-1");
                var ew = ww.editWidget;
                var self = this;
                when(ew.onLoadDeferred, lang.hitch(ww, function() {
                ew.set(("displayedValue" in ew || "_setDisplayedValueAttr" in ew) ? "displayedValue" : "value", self.value);
                        this.defer(function() {
                        ww.saveButton.set("disabled", "intermediateChanges" in ew);
                                this.focus();
                                this._resetValue = this.getValue();
                        });
                }));
        }, _onBlur: function() {
        this.inherited(arguments);
                if (!this.editing) {
        }
        }, destroy: function() {
        if (this.wrapperWidget && !this.wrapperWidget._destroyed) {
        this.wrapperWidget.destroy();
                delete this.wrapperWidget;
        }
        this.inherited(arguments);
        }, _showText: function(_a9f) {
        var ww = this.wrapperWidget;
                _a88.set(ww.domNode, {visibility: "hidden"});
                _a86.add(ww.domNode, "dijitOffScreen");
                _a86.remove(this.displayNode, "dijitOffScreen");
                _a85.set(this.displayNode, "tabIndex", this._savedTabIndex);
                if (_a9f) {
        fm.focus(this.displayNode);
        }
        }, save: function(_aa0) {
        if (this.disabled || !this.editing) {
        return;
        }
        this._set("editing", false);
                var ww = this.wrapperWidget;
                var _aa1 = ww.getValue();
                this.set("value", _aa1);
                this._showText(_aa0);
        }, setValue: function(val) {
        _a89.deprecated("dijit.InlineEditBox.setValue() is deprecated.  Use set('value', ...) instead.", "", "2.0");
                return this.set("value", val);
        }, _setValueAttr: function(val) {
        val = lang.trim(val);
                var _aa2 = this.renderAsHtml ? val : val.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;").replace(/\n/g, "<br>");
                this.displayNode.innerHTML = _aa2 || this.noValueIndicator;
                this._set("value", val);
                if (this._started) {
        this.defer(function() {
        this.onChange(val);
        });
        }
        }, getValue: function() {
        _a89.deprecated("dijit.InlineEditBox.getValue() is deprecated.  Use get('value') instead.", "", "2.0");
                return this.get("value");
        }, cancel: function(_aa3) {
        if (this.disabled || !this.editing) {
        return;
        }
        this._set("editing", false);
                this.defer("onCancel");
                this._showText(_aa3);
        }});
        if (has("dojo-bidi")) {
_a9b = _a84("dijit.InlineEditBox", _a9b, {_setValueAttr: function() {
this.inherited(arguments);
        this.applyTextDir(this.displayNode);
}});
}
_a9b._InlineEditor = _a93;
        return _a9b;
});
}, "dijit/form/Form": function() {
define(["dojo/_base/declare", "dojo/dom-attr", "dojo/_base/kernel", "dojo/sniff", "../_Widget", "../_TemplatedMixin", "./_FormMixin", "../layout/_ContentPaneResizeMixin"], function(_aa4, _aa5, _aa6, has, _aa7, _aa8, _aa9, _aaa) {
return _aa4("dijit.form.Form", [_aa7, _aa8, _aa9, _aaa], {name: "", action: "", method: "", encType: "", "accept-charset": "", accept: "", target: "", templateString: "<form data-dojo-attach-point='containerNode' data-dojo-attach-event='onreset:_onReset,onsubmit:_onSubmit' ${!nameAttrSetting}></form>", postMixInProperties: function() {
this.nameAttrSetting = this.name ? ("name='" + this.name + "'") : "";
        this.inherited(arguments);
}, execute: function() {
}, onExecute: function() {
}, _setEncTypeAttr: function(_aab) {
_aa5.set(this.domNode, "encType", _aab);
        if (has("ie")) {
this.domNode.encoding = _aab;
}
this._set("encType", _aab);
}, reset: function(e) {
var faux = {returnValue: true, preventDefault: function() {
this.returnValue = false;
}, stopPropagation: function() {
}, currentTarget: e ? e.target : this.domNode, target: e ? e.target : this.domNode};
        if (!(this.onReset(faux) === false) && faux.returnValue) {
this.inherited(arguments, []);
}
}, onReset: function() {
return true;
}, _onReset: function(e) {
this.reset(e);
        e.stopPropagation();
        e.preventDefault();
        return false;
}, _onSubmit: function(e) {
var fp = this.constructor.prototype;
        if (this.execute != fp.execute || this.onExecute != fp.onExecute) {
_aa6.deprecated("dijit.form.Form:execute()/onExecute() are deprecated. Use onSubmit() instead.", "", "2.0");
        this.onExecute();
        this.execute(this.getValues());
}
if (this.onSubmit(e) === false) {
e.stopPropagation();
        e.preventDefault();
}
}, onSubmit: function() {
return this.isValid();
}, submit: function() {
if (!(this.onSubmit() === false)) {
this.containerNode.submit();
}
}});
});
}, "dijit/form/ComboButton": function() {
define(["dojo/_base/declare", "dojo/keys", "../focus", "./DropDownButton", "dojo/text!./templates/ComboButton.html"], function(_aac, keys, _aad, _aae, _aaf) {
return _aac("dijit.form.ComboButton", _aae, {templateString: _aaf, _setIdAttr: "", _setTabIndexAttr: ["focusNode", "titleNode"], _setTitleAttr: "titleNode", optionsTitle: "", baseClass: "dijitComboButton", cssStateNodes: {"buttonNode": "dijitButtonNode", "titleNode": "dijitButtonContents", "_popupStateNode": "dijitDownArrowButton"}, _focusedNode: null, _onButtonKeyDown: function(evt) {
if (evt.keyCode == keys[this.isLeftToRight() ? "RIGHT_ARROW" : "LEFT_ARROW"]) {
_aad.focus(this._popupStateNode);
        evt.stopPropagation();
        evt.preventDefault();
}
}, _onArrowKeyDown: function(evt) {
if (evt.keyCode == keys[this.isLeftToRight() ? "LEFT_ARROW" : "RIGHT_ARROW"]) {
_aad.focus(this.titleNode);
        evt.stopPropagation();
        evt.preventDefault();
}
}, focus: function(_ab0) {
if (!this.disabled) {
_aad.focus(_ab0 == "start" ? this.titleNode : this._popupStateNode);
}
}});
});
}, "dijit/form/CheckBox": function() {
define(["require", "dojo/_base/declare", "dojo/dom-attr", "dojo/has", "dojo/query", "dojo/ready", "./ToggleButton", "./_CheckBoxMixin", "dojo/text!./templates/CheckBox.html", "dojo/NodeList-dom", "../a11yclick"], function(_ab1, _ab2, _ab3, has, _ab4, _ab5, _ab6, _ab7, _ab8) {
if (has("dijit-legacy-requires")) {
_ab5(0, function() {
var _ab9 = ["dijit/form/RadioButton"];
        _ab1(_ab9);
});
}
return _ab2("dijit.form.CheckBox", [_ab6, _ab7], {templateString: _ab8, baseClass: "dijitCheckBox", _setValueAttr: function(_aba, _abb) {
if (typeof _aba == "string") {
this.inherited(arguments);
        _aba = true;
}
if (this._created) {
this.set("checked", _aba, _abb);
}
}, _getValueAttr: function() {
return this.checked && this._get("value");
}, _setIconClassAttr: null, _setNameAttr: "focusNode", postMixInProperties: function() {
this.inherited(arguments);
        this.checkedAttrSetting = "";
}, _fillContent: function() {
}, _onFocus: function() {
if (this.id) {
_ab4("label[for='" + this.id + "']").addClass("dijitFocusedLabel");
}
this.inherited(arguments);
}, _onBlur: function() {
if (this.id) {
_ab4("label[for='" + this.id + "']").removeClass("dijitFocusedLabel");
}
this.inherited(arguments);
}});
});
}, "dijit/form/_CheckBoxMixin": function() {
define(["dojo/_base/declare", "dojo/dom-attr"], function(_abc, _abd) {
return _abc("dijit.form._CheckBoxMixin", null, {type: "checkbox", value: "on", readOnly: false, _aria_attr: "aria-checked", _setReadOnlyAttr: function(_abe) {
this._set("readOnly", _abe);
        _abd.set(this.focusNode, "readOnly", _abe);
}, _setLabelAttr: undefined, _getSubmitValue: function(_abf) {
return (_abf == null || _abf === "") ? "on" : _abf;
}, _setValueAttr: function(_ac0) {
_ac0 = this._getSubmitValue(_ac0);
        this._set("value", _ac0);
        _abd.set(this.focusNode, "value", _ac0);
}, reset: function() {
this.inherited(arguments);
        this._set("value", this._getSubmitValue(this.params.value));
        _abd.set(this.focusNode, "value", this.value);
}, _onClick: function(e) {
if (this.readOnly) {
e.stopPropagation();
        e.preventDefault();
        return false;
}
return this.inherited(arguments);
}});
});
}, "dijit/form/RadioButton": function() {
define(["dojo/_base/declare", "./CheckBox", "./_RadioButtonMixin"], function(_ac1, _ac2, _ac3) {
return _ac1("dijit.form.RadioButton", [_ac2, _ac3], {baseClass: "dijitRadio"});
});
}, "dijit/form/_RadioButtonMixin": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-attr", "dojo/_base/lang", "dojo/query", "../registry"], function(_ac4, _ac5, _ac6, lang, _ac7, _ac8) {
return _ac5("dijit.form._RadioButtonMixin", null, {type: "radio", _getRelatedWidgets: function() {
var ary = [];
        _ac7("input[type=radio]", this.focusNode.form || this.ownerDocument).forEach(lang.hitch(this, function(_ac9) {
if (_ac9.name == this.name && _ac9.form == this.focusNode.form) {
var _aca = _ac8.getEnclosingWidget(_ac9);
        if (_aca) {
ary.push(_aca);
}
}
}));
        return ary;
}, _setCheckedAttr: function(_acb) {
this.inherited(arguments);
        if (!this._created) {
return;
}
if (_acb) {
_ac4.forEach(this._getRelatedWidgets(), lang.hitch(this, function(_acc) {
if (_acc != this && _acc.checked) {
_acc.set("checked", false);
}
}));
}
}, _getSubmitValue: function(_acd) {
return _acd == null ? "on" : _acd;
}, _onClick: function(e) {
if (this.checked || this.disabled) {
e.stopPropagation();
        e.preventDefault();
        return false;
}
if (this.readOnly) {
e.stopPropagation();
        e.preventDefault();
        _ac4.forEach(this._getRelatedWidgets(), lang.hitch(this, function(_ace) {
        _ac6.set(this.focusNode || this.domNode, "checked", _ace.checked);
        }));
        return false;
}
return this.inherited(arguments);
}});
});
}, "dijit/form/CurrencyTextBox": function() {
define(["dojo/currency", "dojo/_base/declare", "dojo/_base/lang", "./NumberTextBox"], function(_acf, _ad0, lang, _ad1) {
return _ad0("dijit.form.CurrencyTextBox", _ad1, {currency: "", baseClass: "dijitTextBox dijitCurrencyTextBox", _formatter: _acf.format, _parser: _acf.parse, _regExpGenerator: _acf.regexp, parse: function(_ad2, _ad3) {
var v = this.inherited(arguments);
        if (isNaN(v) && /\d+/.test(_ad2)) {
v = lang.hitch(lang.delegate(this, {_parser: _ad1.prototype._parser}), "inherited")(arguments);
}
return v;
}, _setConstraintsAttr: function(_ad4) {
if (!_ad4.currency && this.currency) {
_ad4.currency = this.currency;
}
this.inherited(arguments, [_acf._mixInDefaults(lang.mixin(_ad4, {exponent: false}))]);
}});
});
}, "dojo/currency": function() {
define(["./_base/array", "./_base/lang", "./number", "./i18n", "./i18n!./cldr/nls/currency", "./cldr/monetary"], function(_ad5, lang, _ad6, i18n, _ad7, _ad8) {
var _ad9 = {};
        lang.setObject("dojo.currency", _ad9);
        _ad9._mixInDefaults = function(_ada) {
        _ada = _ada || {};
                _ada.type = "currency";
                var _adb = i18n.getLocalization("dojo.cldr", "currency", _ada.locale) || {};
                var iso = _ada.currency;
                var data = _ad8.getData(iso);
                _ad5.forEach(["displayName", "symbol", "group", "decimal"], function(prop) {
                data[prop] = _adb[iso + "_" + prop];
                });
                data.fractional = [true, false];
                return lang.mixin(data, _ada);
        };
        _ad9.format = function(_adc, _add) {
        return _ad6.format(_adc, _ad9._mixInDefaults(_add));
        };
        _ad9.regexp = function(_ade) {
        return _ad6.regexp(_ad9._mixInDefaults(_ade));
        };
        _ad9.parse = function(_adf, _ae0) {
        return _ad6.parse(_adf, _ad9._mixInDefaults(_ae0));
        };
        return _ad9;
});
}, "dojo/cldr/monetary": function() {
define(["../_base/kernel", "../_base/lang"], function(dojo, lang) {
var _ae1 = {};
        lang.setObject("dojo.cldr.monetary", _ae1);
        _ae1.getData = function(code) {
        var _ae2 = {ADP: 0, AFN: 0, ALL: 0, AMD: 0, BHD: 3, BIF: 0, BYR: 0, CLF: 0, CLP: 0, COP: 0, CRC: 0, DJF: 0, ESP: 0, GNF: 0, GYD: 0, HUF: 0, IDR: 0, IQD: 0, IRR: 3, ISK: 0, ITL: 0, JOD: 3, JPY: 0, KMF: 0, KPW: 0, KRW: 0, KWD: 3, LAK: 0, LBP: 0, LUF: 0, LYD: 3, MGA: 0, MGF: 0, MMK: 0, MNT: 0, MRO: 0, MUR: 0, OMR: 3, PKR: 0, PYG: 0, RSD: 0, RWF: 0, SLL: 0, SOS: 0, STD: 0, SYP: 0, TMM: 0, TND: 3, TRL: 0, TZS: 0, UGX: 0, UZS: 0, VND: 0, VUV: 0, XAF: 0, XOF: 0, XPF: 0, YER: 0, ZMK: 0, ZWD: 0};
                var _ae3 = {};
                var _ae4 = _ae2[code], _ae5 = _ae3[code];
                if (typeof _ae4 == "undefined") {
        _ae4 = 2;
        }
        if (typeof _ae5 == "undefined") {
        _ae5 = 0;
        }
        return {places: _ae4, round: _ae5};
        };
        return _ae1;
});
}, "dijit/form/NumberTextBox": function() {
define(["dojo/_base/declare", "dojo/_base/lang", "dojo/number", "./RangeBoundTextBox"], function(_ae6, lang, _ae7, _ae8) {
var _ae9 = _ae6("dijit.form.NumberTextBoxMixin", null, {pattern: function(_aea) {
return "(" + (this.focused && this.editOptions ? this._regExpGenerator(lang.delegate(_aea, this.editOptions)) + "|" : "") + this._regExpGenerator(_aea) + ")";
}, value: NaN, editOptions: {pattern: "#.######"}, _formatter: _ae7.format, _regExpGenerator: _ae7.regexp, postMixInProperties: function() {
this.inherited(arguments);
        this._set("type", "text");
}, _setConstraintsAttr: function(_aeb) {
var _aec = typeof _aeb.places == "number" ? _aeb.places : 0;
        if (_aec) {
_aec++;
}
if (typeof _aeb.max != "number") {
_aeb.max = 9 * Math.pow(10, 15 - _aec);
}
if (typeof _aeb.min != "number") {
_aeb.min = - 9 * Math.pow(10, 15 - _aec);
}
this.inherited(arguments, [_aeb]);
        if (this.focusNode && this.focusNode.value && !isNaN(this.value)) {
this.set("value", this.value);
}
}, _onFocus: function() {
if (this.disabled) {
return;
}
var val = this.get("value");
        if (typeof val == "number" && !isNaN(val)) {
var _aed = this.format(val, this.constraints);
        if (_aed !== undefined) {
this.textbox.value = _aed;
}
}
this.inherited(arguments);
}, format: function(_aee, _aef) {
var _af0 = String(_aee);
        if (typeof _aee != "number") {
return _af0;
}
if (isNaN(_aee)) {
return "";
}
if (!("rangeCheck" in this && this.rangeCheck(_aee, _aef)) && _aef.exponent !== false && /\de[-+]?\d/i.test(_af0)) {
return _af0;
}
if (this.editOptions && this.focused) {
_aef = lang.mixin({}, _aef, this.editOptions);
}
return this._formatter(_aee, _aef);
}, _parser: _ae7.parse, parse: function(_af1, _af2) {
var v = this._parser(_af1, lang.mixin({}, _af2, (this.editOptions && this.focused) ? this.editOptions : {}));
        if (this.editOptions && this.focused && isNaN(v)) {
v = this._parser(_af1, _af2);
}
return v;
}, _getDisplayedValueAttr: function() {
var v = this.inherited(arguments);
        return isNaN(v) ? this.textbox.value : v;
}, filter: function(_af3) {
return (_af3 == null || _af3 === "") ? NaN : this.inherited(arguments);
}, serialize: function(_af4, _af5) {
return (typeof _af4 != "number" || isNaN(_af4)) ? "" : this.inherited(arguments);
}, _setBlurValue: function() {
var val = lang.hitch(lang.delegate(this, {focused: true}), "get")("value");
        this._setValueAttr(val, true);
}, _setValueAttr: function(_af6, _af7, _af8) {
if (_af6 !== undefined && _af8 === undefined) {
_af8 = String(_af6);
        if (typeof _af6 == "number") {
if (isNaN(_af6)) {
_af8 = "";
} else {
if (("rangeCheck" in this && this.rangeCheck(_af6, this.constraints)) || this.constraints.exponent === false || !/\de[-+]?\d/i.test(_af8)) {
_af8 = undefined;
}
}
} else {
if (!_af6) {
_af8 = "";
        _af6 = NaN;
} else {
_af6 = undefined;
}
}
}
this.inherited(arguments, [_af6, _af7, _af8]);
}, _getValueAttr: function() {
var v = this.inherited(arguments);
        if (isNaN(v) && this.textbox.value !== "") {
if (this.constraints.exponent !== false && /\de[-+]?\d/i.test(this.textbox.value) && (new RegExp("^" + _ae7._realNumberRegexp(lang.delegate(this.constraints)) + "$").test(this.textbox.value))) {
var n = Number(this.textbox.value);
        return isNaN(n) ? undefined : n;
} else {
return undefined;
}
} else {
return v;
}
}, isValid: function(_af9) {
if (!this.focused || this._isEmpty(this.textbox.value)) {
return this.inherited(arguments);
} else {
var v = this.get("value");
        if (!isNaN(v) && this.rangeCheck(v, this.constraints)) {
if (this.constraints.exponent !== false && /\de[-+]?\d/i.test(this.textbox.value)) {
return true;
} else {
return this.inherited(arguments);
}
} else {
return false;
}
}
}});
        var _afa = _ae6("dijit.form.NumberTextBox", [_ae8, _ae9], {baseClass: "dijitTextBox dijitNumberTextBox"});
        _afa.Mixin = _ae9;
        return _afa;
});
}, "dijit/form/RangeBoundTextBox": function() {
define(["dojo/_base/declare", "dojo/i18n", "./MappedTextBox", "dojo/i18n!./nls/validate"], function(_afb, i18n, _afc) {
var _afd = _afb("dijit.form.RangeBoundTextBox", _afc, {rangeMessage: "", rangeCheck: function(_afe, _aff) {
return ("min" in _aff ? (this.compare(_afe, _aff.min) >= 0) : true) && ("max" in _aff ? (this.compare(_afe, _aff.max) <= 0) : true);
}, isInRange: function() {
return this.rangeCheck(this.get("value"), this.constraints);
}, _isDefinitelyOutOfRange: function() {
var val = this.get("value");
        if (val == null) {
return false;
}
var _b00 = false;
        if ("min" in this.constraints) {
var min = this.constraints.min;
        _b00 = this.compare(val, ((typeof min == "number") && min >= 0 && val != 0) ? 0 : min) < 0;
}
if (!_b00 && ("max" in this.constraints)) {
var max = this.constraints.max;
        _b00 = this.compare(val, ((typeof max != "number") || max > 0) ? max : 0) > 0;
}
return _b00;
}, _isValidSubset: function() {
return this.inherited(arguments) && !this._isDefinitelyOutOfRange();
}, isValid: function(_b01) {
return this.inherited(arguments) && ((this._isEmpty(this.textbox.value) && !this.required) || this.isInRange(_b01));
}, getErrorMessage: function(_b02) {
var v = this.get("value");
        if (v != null && v !== "" && (typeof v != "number" || !isNaN(v)) && !this.isInRange(_b02)) {
return this.rangeMessage;
}
return this.inherited(arguments);
}, postMixInProperties: function() {
this.inherited(arguments);
        if (!this.rangeMessage) {
this.messages = i18n.getLocalization("dijit.form", "validate", this.lang);
        this.rangeMessage = this.messages.rangeMessage;
}
}});
        return _afd;
});
}, "dijit/form/DateTextBox": function() {
define(["dojo/_base/declare", "../Calendar", "./_DateTimeTextBox"], function(_b03, _b04, _b05) {
return _b03("dijit.form.DateTextBox", _b05, {baseClass: "dijitTextBox dijitComboBox dijitDateTextBox", popupClass: _b04, _selector: "date", maxHeight: Infinity, value: new Date("")});
});
}, "dijit/Calendar": function() {
define(["dojo/_base/array", "dojo/date", "dojo/date/locale", "dojo/_base/declare", "dojo/dom-attr", "dojo/dom-class", "dojo/_base/kernel", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/sniff", "./CalendarLite", "./_Widget", "./_CssStateMixin", "./_TemplatedMixin", "./form/DropDownButton"], function(_b06, date, _b07, _b08, _b09, _b0a, _b0b, keys, lang, on, has, _b0c, _b0d, _b0e, _b0f, _b10) {
var _b11 = _b08("dijit.Calendar", [_b0c, _b0d, _b0e], {cssStateNodes: {"decrementMonth": "dijitCalendarArrow", "incrementMonth": "dijitCalendarArrow", "previousYearLabelNode": "dijitCalendarPreviousYear", "nextYearLabelNode": "dijitCalendarNextYear"}, setValue: function(_b12) {
_b0b.deprecated("dijit.Calendar:setValue() is deprecated.  Use set('value', ...) instead.", "", "2.0");
        this.set("value", _b12);
}, _createMonthWidget: function() {
return new _b11._MonthDropDownButton({id: this.id + "_mddb", tabIndex: - 1, onMonthSelect: lang.hitch(this, "_onMonthSelect"), lang: this.lang, dateLocaleModule: this.dateLocaleModule}, this.monthNode);
}, postCreate: function() {
this.inherited(arguments);
        this.own(on(this.domNode, "keydown", lang.hitch(this, "_onKeyDown")), on(this.dateRowsNode, "mouseover", lang.hitch(this, "_onDayMouseOver")), on(this.dateRowsNode, "mouseout", lang.hitch(this, "_onDayMouseOut")), on(this.dateRowsNode, "mousedown", lang.hitch(this, "_onDayMouseDown")), on(this.dateRowsNode, "mouseup", lang.hitch(this, "_onDayMouseUp")));
}, _onMonthSelect: function(_b13) {
var date = new this.dateClassObj(this.currentFocus);
        date.setDate(1);
        date.setMonth(_b13);
        var _b14 = this.dateModule.getDaysInMonth(date);
        var _b15 = this.currentFocus.getDate();
        date.setDate(Math.min(_b15, _b14));
        this._setCurrentFocusAttr(date);
}, _onDayMouseOver: function(evt) {
var node = _b0a.contains(evt.target, "dijitCalendarDateLabel") ? evt.target.parentNode : evt.target;
        if (node && ((node.dijitDateValue && !_b0a.contains(node, "dijitCalendarDisabledDate")) || node == this.previousYearLabelNode || node == this.nextYearLabelNode)) {
_b0a.add(node, "dijitCalendarHoveredDate");
        this._currentNode = node;
}
}, _onDayMouseOut: function(evt) {
if (!this._currentNode) {
return;
}
if (evt.relatedTarget && evt.relatedTarget.parentNode == this._currentNode) {
return;
}
var cls = "dijitCalendarHoveredDate";
        if (_b0a.contains(this._currentNode, "dijitCalendarActiveDate")) {
cls += " dijitCalendarActiveDate";
}
_b0a.remove(this._currentNode, cls);
        this._currentNode = null;
}, _onDayMouseDown: function(evt) {
var node = evt.target.parentNode;
        if (node && node.dijitDateValue && !_b0a.contains(node, "dijitCalendarDisabledDate")) {
_b0a.add(node, "dijitCalendarActiveDate");
        this._currentNode = node;
}
}, _onDayMouseUp: function(evt) {
var node = evt.target.parentNode;
        if (node && node.dijitDateValue) {
_b0a.remove(node, "dijitCalendarActiveDate");
}
}, handleKey: function(evt) {
var _b16 = - 1, _b17, _b18 = this.currentFocus;
        switch (evt.keyCode) {
case keys.RIGHT_ARROW:
        _b16 = 1;
        case keys.LEFT_ARROW:
        _b17 = "day";
        if (!this.isLeftToRight()) {
_b16 *= - 1;
}
break;
        case keys.DOWN_ARROW:
        _b16 = 1;
        case keys.UP_ARROW:
        _b17 = "week";
        break;
        case keys.PAGE_DOWN:
        _b16 = 1;
        case keys.PAGE_UP:
        _b17 = evt.ctrlKey || evt.altKey ? "year" : "month";
        break;
        case keys.END:
        _b18 = this.dateModule.add(_b18, "month", 1);
        _b17 = "day";
        case keys.HOME:
        _b18 = new this.dateClassObj(_b18);
        _b18.setDate(1);
        break;
        default:
        return true;
}
if (_b17) {
_b18 = this.dateModule.add(_b18, _b17, _b16);
}
this._setCurrentFocusAttr(_b18);
        return false;
}, _onKeyDown: function(evt) {
if (!this.handleKey(evt)) {
evt.stopPropagation();
        evt.preventDefault();
}
}, onValueSelected: function() {
}, onChange: function(_b19) {
this.onValueSelected(_b19);
}, getClassForDate: function() {
}});
        _b11._MonthDropDownButton = _b08("dijit.Calendar._MonthDropDownButton", _b10, {onMonthSelect: function() {
        }, postCreate: function() {
        this.inherited(arguments);
                this.dropDown = new _b11._MonthDropDown({id: this.id + "_mdd", onChange: this.onMonthSelect});
        }, _setMonthAttr: function(_b1a) {
        var _b1b = this.dateLocaleModule.getNames("months", "wide", "standAlone", this.lang, _b1a);
                this.dropDown.set("months", _b1b);
                this.containerNode.innerHTML = (has("ie") == 6 ? "" : "<div class='dijitSpacer'>" + this.dropDown.domNode.innerHTML + "</div>") + "<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>" + _b1b[_b1a.getMonth()] + "</div>";
        }});
        _b11._MonthDropDown = _b08("dijit.Calendar._MonthDropDown", [_b0d, _b0f], {months: [], templateString: "<div class='dijitCalendarMonthMenu dijitMenu' " + "data-dojo-attach-event='onclick:_onClick,onmouseover:_onMenuHover,onmouseout:_onMenuHover'></div>", _setMonthsAttr: function(_b1c) {
        this.domNode.innerHTML = _b06.map(_b1c, function(_b1d, idx) {
        return _b1d ? "<div class='dijitCalendarMonthLabel' month='" + idx + "'>" + _b1d + "</div>" : "";
        }).join("");
        }, _onClick: function(evt) {
        this.onChange(_b09.get(evt.target, "month"));
        }, onChange: function() {
        }, _onMenuHover: function(evt) {
        _b0a.toggle(evt.target, "dijitCalendarMonthLabelHover", evt.type == "mouseover");
        }});
        return _b11;
});
}, "dijit/CalendarLite": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/cldr/supplemental", "dojo/date", "dojo/date/locale", "dojo/date/stamp", "dojo/dom", "dojo/dom-class", "dojo/_base/lang", "dojo/on", "dojo/sniff", "dojo/string", "./_WidgetBase", "./_TemplatedMixin", "dojo/text!./templates/Calendar.html", "./a11yclick", "./hccss"], function(_b1e, _b1f, _b20, date, _b21, _b22, dom, _b23, lang, on, has, _b24, _b25, _b26, _b27) {
var _b28 = _b1f("dijit.CalendarLite", [_b25, _b26], {templateString: _b27, dowTemplateString: "<th class=\"dijitReset dijitCalendarDayLabelTemplate\" role=\"columnheader\" scope=\"col\"><span class=\"dijitCalendarDayLabel\">${d}</span></th>", dateTemplateString: "<td class=\"dijitReset\" role=\"gridcell\" data-dojo-attach-point=\"dateCells\"><span class=\"dijitCalendarDateLabel\" data-dojo-attach-point=\"dateLabels\"></span></td>", weekTemplateString: "<tr class=\"dijitReset dijitCalendarWeekTemplate\" role=\"row\">${d}${d}${d}${d}${d}${d}${d}</tr>", value: new Date(""), datePackage: "", dayWidth: "narrow", tabIndex: "0", currentFocus: new Date(), _setSummaryAttr: "gridNode", baseClass: "dijitCalendar", _isValidDate: function(_b29) {
return _b29 && !isNaN(_b29) && typeof _b29 == "object" && _b29.toString() != this.constructor.prototype.value.toString();
}, _getValueAttr: function() {
var _b2a = this._get("value");
        if (_b2a && !isNaN(_b2a)) {
var _b2b = new this.dateClassObj(_b2a);
        _b2b.setHours(0, 0, 0, 0);
        if (_b2b.getDate() < _b2a.getDate()) {
_b2b = this.dateModule.add(_b2b, "hour", 1);
}
return _b2b;
} else {
return null;
}
}, _setValueAttr: function(_b2c, _b2d) {
if (typeof _b2c == "string") {
_b2c = _b22.fromISOString(_b2c);
}
_b2c = this._patchDate(_b2c);
        if (this._isValidDate(_b2c) && !this.isDisabledDate(_b2c, this.lang)) {
this._set("value", _b2c);
        this.set("currentFocus", _b2c);
        this._markSelectedDates([_b2c]);
        if (this._created && (_b2d || typeof _b2d == "undefined")) {
this.onChange(this.get("value"));
}
} else {
this._set("value", null);
        this._markSelectedDates([]);
}
}, _patchDate: function(_b2e) {
if (_b2e) {
_b2e = new this.dateClassObj(_b2e);
        _b2e.setHours(1, 0, 0, 0);
}
return _b2e;
}, _setText: function(node, text) {
while (node.firstChild) {
node.removeChild(node.firstChild);
}
node.appendChild(node.ownerDocument.createTextNode(text));
}, _populateGrid: function() {
var _b2f = new this.dateClassObj(this.currentFocus);
        _b2f.setDate(1);
        _b2f = this._patchDate(_b2f);
        var _b30 = _b2f.getDay(), _b31 = this.dateModule.getDaysInMonth(_b2f), _b32 = this.dateModule.getDaysInMonth(this.dateModule.add(_b2f, "month", - 1)), _b33 = new this.dateClassObj(), _b34 = _b20.getFirstDayOfWeek(this.lang);
        if (_b34 > _b30) {
_b34 -= 7;
}
if (!this.summary) {
var _b35 = this.dateLocaleModule.getNames("months", "wide", "standAlone", this.lang, _b2f);
        this.gridNode.setAttribute("summary", _b35[_b2f.getMonth()]);
}
this._date2cell = {};
        _b1e.forEach(this.dateCells, function(_b36, idx) {
        var i = idx + _b34;
                var date = new this.dateClassObj(_b2f), _b37, _b38 = "dijitCalendar", adj = 0;
                if (i < _b30) {
        _b37 = _b32 - _b30 + i + 1;
                adj = - 1;
                _b38 += "Previous";
        } else {
        if (i >= (_b30 + _b31)) {
        _b37 = i - _b30 - _b31 + 1;
                adj = 1;
                _b38 += "Next";
        } else {
        _b37 = i - _b30 + 1;
                _b38 += "Current";
        }
        }
        if (adj) {
        date = this.dateModule.add(date, "month", adj);
        }
        date.setDate(_b37);
                if (!this.dateModule.compare(date, _b33, "date")) {
        _b38 = "dijitCalendarCurrentDate " + _b38;
        }
        if (this.isDisabledDate(date, this.lang)) {
        _b38 = "dijitCalendarDisabledDate " + _b38;
                _b36.setAttribute("aria-disabled", "true");
        } else {
        _b38 = "dijitCalendarEnabledDate " + _b38;
                _b36.removeAttribute("aria-disabled");
                _b36.setAttribute("aria-selected", "false");
        }
        var _b39 = this.getClassForDate(date, this.lang);
                if (_b39) {
        _b38 = _b39 + " " + _b38;
        }
        _b36.className = _b38 + "Month dijitCalendarDateTemplate";
                var _b3a = date.valueOf();
                if (idx == 0) {
        }
        this._date2cell[_b3a] = _b36;
                _b36.dijitDateValue = _b3a;
                this._setText(this.dateLabels[idx], date.getDateLocalized ? date.getDateLocalized(this.lang) : date.getDate());
        }, this);
}, _populateControls: function() {
var _b3b = new this.dateClassObj(this.currentFocus);
        _b3b.setDate(1);
        this.monthWidget.set("month", _b3b);
        var y = _b3b.getFullYear() - 1;
        var d = new this.dateClassObj();
        _b1e.forEach(["previous", "current", "next"], function(name) {
        d.setFullYear(y++);
                this._setText(this[name + "YearLabelNode"], this.dateLocaleModule.format(d, {selector: "year", locale: this.lang}));
        }, this);
}, goToToday: function() {
this.set("value", new this.dateClassObj());
}, constructor: function(_b3c) {
this.dateModule = _b3c.datePackage ? lang.getObject(_b3c.datePackage, false) : date;
        this.dateClassObj = this.dateModule.Date || Date;
        this.dateLocaleModule = _b3c.datePackage ? lang.getObject(_b3c.datePackage + ".locale", false) : _b21;
}, _createMonthWidget: function() {
return _b28._MonthWidget({id: this.id + "_mddb", lang: this.lang, dateLocaleModule: this.dateLocaleModule}, this.monthNode);
}, buildRendering: function() {
var d = this.dowTemplateString, _b3d = this.dateLocaleModule.getNames("days", this.dayWidth, "standAlone", this.lang), _b3e = _b20.getFirstDayOfWeek(this.lang);
        this.dayCellsHtml = _b24.substitute([d, d, d, d, d, d, d].join(""), {d: ""}, function() {
        return _b3d[_b3e++ % 7];
        });
        var r = _b24.substitute(this.weekTemplateString, {d: this.dateTemplateString});
        this.dateRowsHtml = [r, r, r, r, r, r].join("");
        this.dateCells = [];
        this.dateLabels = [];
        this.inherited(arguments);
        dom.setSelectable(this.domNode, false);
        var _b3f = new this.dateClassObj(this.currentFocus);
        this.monthWidget = this._createMonthWidget();
        this.set("currentFocus", _b3f, false);
}, postCreate: function() {
this.inherited(arguments);
        this._connectControls();
}, _connectControls: function() {
var _b40 = lang.hitch(this, function(_b41, part, _b42) {
return on(this[_b41], "click", lang.hitch(this, function() {
this._setCurrentFocusAttr(this.dateModule.add(this.currentFocus, part, _b42));
}));
});
        this.own(_b40("incrementMonth", "month", 1), _b40("decrementMonth", "month", - 1), _b40("nextYearLabelNode", "year", 1), _b40("previousYearLabelNode", "year", - 1));
}, _setCurrentFocusAttr: function(date, _b43) {
var _b44 = this.currentFocus, _b45 = this._getNodeByDate(_b44);
        date = this._patchDate(date);
        this._set("currentFocus", date);
        if (!this._date2cell || this.dateModule.difference(_b44, date, "month") != 0) {
this._populateGrid();
        this._populateControls();
        this._markSelectedDates([this.value]);
}
var _b46 = this._getNodeByDate(date);
        _b46.setAttribute("tabIndex", this.tabIndex);
        if (this.focused || _b43) {
_b46.focus();
}
if (_b45 && _b45 != _b46) {
if (has("webkit")) {
_b45.setAttribute("tabIndex", "-1");
} else {
_b45.removeAttribute("tabIndex");
}
}
}, focus: function() {
this._setCurrentFocusAttr(this.currentFocus, true);
}, _onDayClick: function(evt) {
evt.stopPropagation();
        evt.preventDefault();
        for (var node = evt.target; node && !node.dijitDateValue; node = node.parentNode) {
}
if (node && !_b23.contains(node, "dijitCalendarDisabledDate")) {
this.set("value", node.dijitDateValue);
}
}, _getNodeByDate: function(_b47) {
_b47 = this._patchDate(_b47);
        return _b47 && this._date2cell ? this._date2cell[_b47.valueOf()] : null;
}, _markSelectedDates: function(_b48) {
function mark(_b49, cell) {
_b23.toggle(cell, "dijitCalendarSelectedDate", _b49);
        cell.setAttribute("aria-selected", _b49 ? "true" : "false");
}
;
        _b1e.forEach(this._selectedCells || [], lang.partial(mark, false));
        this._selectedCells = _b1e.filter(_b1e.map(_b48, this._getNodeByDate, this), function(n) {
        return n;
        });
        _b1e.forEach(this._selectedCells, lang.partial(mark, true));
}, onChange: function() {
}, isDisabledDate: function() {
}, getClassForDate: function() {
}});
        _b28._MonthWidget = _b1f("dijit.CalendarLite._MonthWidget", _b25, {_setMonthAttr: function(_b4a) {
        var _b4b = this.dateLocaleModule.getNames("months", "wide", "standAlone", this.lang, _b4a), _b4c = (has("ie") == 6 ? "" : "<div class='dijitSpacer'>" + _b1e.map(_b4b, function(s) {
        return "<div>" + s + "</div>";
        }).join("") + "</div>");
                this.domNode.innerHTML = _b4c + "<div class='dijitCalendarMonthLabel dijitCalendarCurrentMonthLabel'>" + _b4b[_b4a.getMonth()] + "</div>";
        }});
        return _b28;
});
}, "dijit/form/_DateTimeTextBox": function() {
define(["dojo/date", "dojo/date/locale", "dojo/date/stamp", "dojo/_base/declare", "dojo/_base/lang", "./RangeBoundTextBox", "../_HasDropDown", "dojo/text!./templates/DropDownBox.html"], function(date, _b4d, _b4e, _b4f, lang, _b50, _b51, _b52) {
new Date("X");
        var _b53 = _b4f("dijit.form._DateTimeTextBox", [_b50, _b51], {templateString: _b52, hasDownArrow: true, cssStateNodes: {"_buttonNode": "dijitDownArrowButton"}, pattern: _b4d.regexp, datePackage: "", postMixInProperties: function() {
        this.inherited(arguments);
                this._set("type", "text");
        }, compare: function(val1, val2) {
        var _b54 = this._isInvalidDate(val1);
                var _b55 = this._isInvalidDate(val2);
                return _b54 ? (_b55 ? 0 : - 1) : (_b55 ? 1 : date.compare(val1, val2, this._selector));
        }, autoWidth: true, format: function(_b56, _b57) {
        if (!_b56) {
        return "";
        }
        return this.dateLocaleModule.format(_b56, _b57);
        }, "parse": function(_b58, _b59) {
        return this.dateLocaleModule.parse(_b58, _b59) || (this._isEmpty(_b58) ? null : undefined);
        }, serialize: function(val, _b5a) {
        if (val.toGregorian) {
        val = val.toGregorian();
        }
        return _b4e.toISOString(val, _b5a);
        }, dropDownDefaultValue: new Date(), value: new Date(""), _blankValue: null, popupClass: "", _selector: "", constructor: function(_b5b) {
        this.dateModule = _b5b.datePackage ? lang.getObject(_b5b.datePackage, false) : date;
                this.dateClassObj = this.dateModule.Date || Date;
                this.dateLocaleModule = _b5b.datePackage ? lang.getObject(_b5b.datePackage + ".locale", false) : _b4d;
                this._set("pattern", this.dateLocaleModule.regexp);
                this._invalidDate = this.constructor.prototype.value.toString();
        }, buildRendering: function() {
        this.inherited(arguments);
                if (!this.hasDownArrow) {
        this._buttonNode.style.display = "none";
        }
        if (!this.hasDownArrow) {
        this._buttonNode = this.domNode;
                this.baseClass += " dijitComboBoxOpenOnClick";
        }
        }, _setConstraintsAttr: function(_b5c) {
        _b5c.selector = this._selector;
                _b5c.fullYear = true;
                var _b5d = _b4e.fromISOString;
                if (typeof _b5c.min == "string") {
        _b5c.min = _b5d(_b5c.min);
        }
        if (typeof _b5c.max == "string") {
        _b5c.max = _b5d(_b5c.max);
        }
        this.inherited(arguments);
        }, _isInvalidDate: function(_b5e) {
        return !_b5e || isNaN(_b5e) || typeof _b5e != "object" || _b5e.toString() == this._invalidDate;
        }, _setValueAttr: function(_b5f, _b60, _b61) {
        if (_b5f !== undefined) {
        if (typeof _b5f == "string") {
        _b5f = _b4e.fromISOString(_b5f);
        }
        if (this._isInvalidDate(_b5f)) {
        _b5f = null;
        }
        if (_b5f instanceof Date && !(this.dateClassObj instanceof Date)) {
        _b5f = new this.dateClassObj(_b5f);
        }
        }
        this.inherited(arguments);
                if (this.value instanceof Date) {
        this.filterString = "";
        }
        if (this.dropDown) {
        this.dropDown.set("value", _b5f, false);
        }
        }, _set: function(attr, _b62) {
        var _b63 = this._get("value");
                if (attr == "value" && _b63 instanceof Date && this.compare(_b62, _b63) == 0) {
        return;
        }
        this.inherited(arguments);
        }, _setDropDownDefaultValueAttr: function(val) {
        if (this._isInvalidDate(val)) {
        val = new this.dateClassObj();
        }
        this._set("dropDownDefaultValue", val);
        }, openDropDown: function(_b64) {
        if (this.dropDown) {
        this.dropDown.destroy();
        }
        var _b65 = lang.isString(this.popupClass) ? lang.getObject(this.popupClass, false) : this.popupClass, _b66 = this, _b67 = this.get("value");
                this.dropDown = new _b65({onChange: function(_b68) {
                _b66.set("value", _b68, true);
                }, id: this.id + "_popup", dir: _b66.dir, lang: _b66.lang, value: _b67, textDir: _b66.textDir, currentFocus: !this._isInvalidDate(_b67) ? _b67 : this.dropDownDefaultValue, constraints: _b66.constraints, filterString: _b66.filterString, datePackage: _b66.params.datePackage, isDisabledDate: function(date) {
                return !_b66.rangeCheck(date, _b66.constraints);
                }});
                this.inherited(arguments);
        }, _getDisplayedValueAttr: function() {
        return this.textbox.value;
        }, _setDisplayedValueAttr: function(_b69, _b6a) {
        this._setValueAttr(this.parse(_b69, this.constraints), _b6a, _b69);
        }});
        return _b53;
});
}, "dijit/form/TimeTextBox": function() {
define(["dojo/_base/declare", "dojo/keys", "dojo/_base/lang", "../_TimePicker", "./_DateTimeTextBox"], function(_b6b, keys, lang, _b6c, _b6d) {
return _b6b("dijit.form.TimeTextBox", _b6d, {baseClass: "dijitTextBox dijitComboBox dijitTimeTextBox", popupClass: _b6c, _selector: "time", value: new Date(""), maxHeight: - 1, _onKey: function(evt) {
if (this.disabled || this.readOnly) {
return;
}
this.inherited(arguments);
        switch (evt.keyCode) {
case keys.ENTER:
        case keys.TAB:
        case keys.ESCAPE:
        case keys.DOWN_ARROW:
        case keys.UP_ARROW:
        break;
        default:
        this.defer(function() {
        var val = this.get("displayedValue");
                this.filterString = (val && !this.parse(val, this.constraints)) ? val.toLowerCase() : "";
                if (this._opened) {
        this.closeDropDown();
        }
        this.openDropDown();
        });
}
}});
});
}, "dijit/_TimePicker": function() {
define(["dojo/_base/array", "dojo/date", "dojo/date/locale", "dojo/date/stamp", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-construct", "dojo/_base/kernel", "dojo/keys", "dojo/_base/lang", "dojo/sniff", "dojo/query", "dojo/mouse", "dojo/on", "./_WidgetBase", "./form/_ListMouseMixin"], function(_b6e, _b6f, _b70, _b71, _b72, _b73, _b74, _b75, keys, lang, has, _b76, _b77, on, _b78, _b79) {
var _b7a = _b72("dijit._TimePicker", [_b78, _b79], {baseClass: "dijitTimePicker", clickableIncrement: "T00:15:00", visibleIncrement: "T01:00:00", value: new Date(), _visibleIncrement: 2, _clickableIncrement: 1, _totalIncrements: 10, constraints: {}, serialize: _b71.toISOString, buildRendering: function() {
this.inherited(arguments);
        this.containerNode = this.domNode;
        this.timeMenu = this.domNode;
}, setValue: function(_b7b) {
_b75.deprecated("dijit._TimePicker:setValue() is deprecated.  Use set('value', ...) instead.", "", "2.0");
        this.set("value", _b7b);
}, _setValueAttr: function(date) {
this._set("value", date);
        this._showText();
}, _setFilterStringAttr: function(val) {
this._set("filterString", val);
        this._showText();
}, isDisabledDate: function() {
return false;
}, _getFilteredNodes: function(_b7c, _b7d, _b7e, _b7f) {
var _b80 = [];
        for (var i = 0; i < this._maxIncrement; i++) {
var n = this._createOption(i);
        if (n) {
_b80.push(n);
}
}
return _b80;
}, _showText: function() {
var _b81 = _b71.fromISOString;
        this.domNode.innerHTML = "";
        this._clickableIncrementDate = _b81(this.clickableIncrement);
        this._visibleIncrementDate = _b81(this.visibleIncrement);
        var _b82 = function(date) {
        return date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
        }, _b83 = _b82(this._clickableIncrementDate), _b84 = _b82(this._visibleIncrementDate), time = (this.value || this.currentFocus).getTime();
        this._refDate = _b81("T00:00:00");
        this._refDate.setFullYear(1970, 0, 1);
        this._clickableIncrement = 1;
        this._visibleIncrement = _b84 / _b83;
        this._maxIncrement = (60 * 60 * 24) / _b83;
        var _b85 = this._getFilteredNodes();
        _b6e.forEach(_b85, function(n) {
        this.domNode.appendChild(n);
        }, this);
        if (!_b85.length && this.filterString) {
this.filterString = "";
        this._showText();
}
}, constructor: function() {
this.constraints = {};
}, postMixInProperties: function() {
this.inherited(arguments);
        this._setConstraintsAttr(this.constraints);
}, _setConstraintsAttr: function(_b86) {
for (var key in _b86) {
this._set(key, _b86[key]);
}
if (!_b86.locale) {
_b86.locale = this.lang;
}
}, _createOption: function(_b87) {
var date = new Date(this._refDate);
        var _b88 = this._clickableIncrementDate;
        date.setTime(date.getTime() + _b88.getHours() * _b87 * 3600000 + _b88.getMinutes() * _b87 * 60000 + _b88.getSeconds() * _b87 * 1000);
        if (this.constraints.selector == "time") {
date.setFullYear(1970, 0, 1);
}
var _b89 = _b70.format(date, this.constraints);
        if (this.filterString && _b89.toLowerCase().indexOf(this.filterString) !== 0) {
return null;
}
var div = this.ownerDocument.createElement("div");
        div.className = this.baseClass + "Item";
        div.date = date;
        div.idx = _b87;
        _b74.create("div", {"class": this.baseClass + "ItemInner", innerHTML: _b89}, div);
        if (_b87 % this._visibleIncrement < 1 && _b87 % this._visibleIncrement > - 1) {
_b73.add(div, this.baseClass + "Marker");
} else {
if (!(_b87 % this._clickableIncrement)) {
_b73.add(div, this.baseClass + "Tick");
}
}
if (this.isDisabledDate(date)) {
_b73.add(div, this.baseClass + "ItemDisabled");
}
if (this.value && !_b6f.compare(this.value, date, this.constraints.selector)) {
div.selected = true;
        _b73.add(div, this.baseClass + "ItemSelected");
        this._selectedDiv = div;
        if (_b73.contains(div, this.baseClass + "Marker")) {
_b73.add(div, this.baseClass + "MarkerSelected");
} else {
_b73.add(div, this.baseClass + "TickSelected");
}
this._highlightOption(div, true);
}
return div;
}, onOpen: function() {
this.inherited(arguments);
        this.set("selected", this._selectedDiv);
}, _onOptionSelected: function(tgt) {
var _b8a = tgt.target.date || tgt.target.parentNode.date;
        if (!_b8a || this.isDisabledDate(_b8a)) {
return;
}
this._highlighted_option = null;
        this.set("value", _b8a);
        this.onChange(_b8a);
}, onChange: function() {
}, _highlightOption: function(node, _b8b) {
if (!node) {
return;
}
if (_b8b) {
if (this._highlighted_option) {
this._highlightOption(this._highlighted_option, false);
}
this._highlighted_option = node;
} else {
if (this._highlighted_option !== node) {
return;
} else {
this._highlighted_option = null;
}
}
_b73.toggle(node, this.baseClass + "ItemHover", _b8b);
        if (_b73.contains(node, this.baseClass + "Marker")) {
_b73.toggle(node, this.baseClass + "MarkerHover", _b8b);
} else {
_b73.toggle(node, this.baseClass + "TickHover", _b8b);
}
}, handleKey: function(e) {
if (e.keyCode == keys.DOWN_ARROW) {
this.selectNextNode();
        e.stopPropagation();
        e.preventDefault();
        return false;
} else {
if (e.keyCode == keys.UP_ARROW) {
this.selectPreviousNode();
        e.stopPropagation();
        e.preventDefault();
        return false;
} else {
if (e.keyCode == keys.ENTER || e.keyCode === keys.TAB) {
if (!this._keyboardSelected && e.keyCode === keys.TAB) {
return true;
}
if (this._highlighted_option) {
this._onOptionSelected({target: this._highlighted_option});
}
return e.keyCode === keys.TAB;
}
}
}
return undefined;
}, onHover: function(node) {
this._highlightOption(node, true);
}, onUnhover: function(node) {
this._highlightOption(node, false);
}, onSelect: function(node) {
this._highlightOption(node, true);
}, onDeselect: function(node) {
this._highlightOption(node, false);
}, onClick: function(node) {
this._onOptionSelected({target: node});
}});
        return _b7a;
});
}, "dijit/form/NumberSpinner": function() {
define(["dojo/_base/declare", "dojo/keys", "./_Spinner", "./NumberTextBox"], function(_b8c, keys, _b8d, _b8e) {
return _b8c("dijit.form.NumberSpinner", [_b8d, _b8e.Mixin], {baseClass: "dijitTextBox dijitSpinner dijitNumberTextBox", adjust: function(val, _b8f) {
var tc = this.constraints, v = isNaN(val), _b90 = !isNaN(tc.max), _b91 = !isNaN(tc.min);
        if (v && _b8f != 0) {
val = (_b8f > 0) ? _b91 ? tc.min : _b90 ? tc.max : 0 : _b90 ? this.constraints.max : _b91 ? tc.min : 0;
}
var _b92 = val + _b8f;
        if (v || isNaN(_b92)) {
return val;
}
if (_b90 && (_b92 > tc.max)) {
_b92 = tc.max;
}
if (_b91 && (_b92 < tc.min)) {
_b92 = tc.min;
}
return _b92;
}, _onKeyDown: function(e) {
if (this.disabled || this.readOnly) {
return;
}
if ((e.keyCode == keys.HOME || e.keyCode == keys.END) && !(e.ctrlKey || e.altKey || e.metaKey) && typeof this.get("value") != "undefined") {
var _b93 = this.constraints[(e.keyCode == keys.HOME ? "min" : "max")];
        if (typeof _b93 == "number") {
this._setValueAttr(_b93, false);
}
e.stopPropagation();
        e.preventDefault();
}
}});
});
}, "dijit/form/_Spinner": function() {
define(["dojo/_base/declare", "dojo/keys", "dojo/_base/lang", "dojo/sniff", "dojo/mouse", "dojo/on", "../typematic", "./RangeBoundTextBox", "dojo/text!./templates/Spinner.html", "./_TextBoxMixin"], function(_b94, keys, lang, has, _b95, on, _b96, _b97, _b98, _b99) {
return _b94("dijit.form._Spinner", _b97, {defaultTimeout: 500, minimumTimeout: 10, timeoutChangeRate: 0.9, smallDelta: 1, largeDelta: 10, templateString: _b98, baseClass: "dijitTextBox dijitSpinner", cssStateNodes: {"upArrowNode": "dijitUpArrowButton", "downArrowNode": "dijitDownArrowButton"}, adjust: function(val) {
return val;
}, _arrowPressed: function(_b9a, _b9b, _b9c) {
if (this.disabled || this.readOnly) {
return;
}
this._setValueAttr(this.adjust(this.get("value"), _b9b * _b9c), false);
        _b99.selectInputText(this.textbox, this.textbox.value.length);
}, _arrowReleased: function() {
this._wheelTimer = null;
}, _typematicCallback: function(_b9d, node, evt) {
var inc = this.smallDelta;
        if (node == this.textbox) {
var key = evt.keyCode;
        inc = (key == keys.PAGE_UP || key == keys.PAGE_DOWN) ? this.largeDelta : this.smallDelta;
        node = (key == keys.UP_ARROW || key == keys.PAGE_UP) ? this.upArrowNode : this.downArrowNode;
}
if (_b9d == - 1) {
this._arrowReleased(node);
} else {
this._arrowPressed(node, (node == this.upArrowNode) ? 1 : - 1, inc);
}
}, _wheelTimer: null, _mouseWheeled: function(evt) {
evt.stopPropagation();
        evt.preventDefault();
        var _b9e = evt.wheelDelta / 120;
        if (Math.floor(_b9e) != _b9e) {
_b9e = evt.wheelDelta > 0 ? 1 : - 1;
}
var _b9f = evt.detail ? (evt.detail * - 1) : _b9e;
        if (_b9f !== 0) {
var node = this[(_b9f > 0 ? "upArrowNode" : "downArrowNode")];
        this._arrowPressed(node, _b9f, this.smallDelta);
        if (this._wheelTimer) {
this._wheelTimer.remove();
}
this._wheelTimer = this.defer(function() {
this._arrowReleased(node);
}, 50);
}
}, _setConstraintsAttr: function(_ba0) {
this.inherited(arguments);
        if (this.focusNode) {
if (this.constraints.min !== undefined) {
this.focusNode.setAttribute("aria-valuemin", this.constraints.min);
} else {
this.focusNode.removeAttribute("aria-valuemin");
}
if (this.constraints.max !== undefined) {
this.focusNode.setAttribute("aria-valuemax", this.constraints.max);
} else {
this.focusNode.removeAttribute("aria-valuemax");
}
}
}, _setValueAttr: function(_ba1, _ba2) {
this.focusNode.setAttribute("aria-valuenow", _ba1);
        this.inherited(arguments);
}, postCreate: function() {
this.inherited(arguments);
        this.own(on(this.domNode, _b95.wheel, lang.hitch(this, "_mouseWheeled")), _b96.addListener(this.upArrowNode, this.textbox, {keyCode: keys.UP_ARROW, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false}, this, "_typematicCallback", this.timeoutChangeRate, this.defaultTimeout, this.minimumTimeout), _b96.addListener(this.downArrowNode, this.textbox, {keyCode: keys.DOWN_ARROW, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false}, this, "_typematicCallback", this.timeoutChangeRate, this.defaultTimeout, this.minimumTimeout), _b96.addListener(this.upArrowNode, this.textbox, {keyCode: keys.PAGE_UP, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false}, this, "_typematicCallback", this.timeoutChangeRate, this.defaultTimeout, this.minimumTimeout), _b96.addListener(this.downArrowNode, this.textbox, {keyCode: keys.PAGE_DOWN, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false}, this, "_typematicCallback", this.timeoutChangeRate, this.defaultTimeout, this.minimumTimeout));
}});
});
}, "dijit/form/ComboBox": function() {
define(["dojo/_base/declare", "./ValidationTextBox", "./ComboBoxMixin"], function(_ba3, _ba4, _ba5) {
return _ba3("dijit.form.ComboBox", [_ba4, _ba5], {});
});
}, "dijit/form/MultiSelect": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-geometry", "dojo/has", "dojo/query", "./_FormValueWidget"], function(_ba6, _ba7, _ba8, has, _ba9, _baa) {
var _bab = _ba7("dijit.form.MultiSelect" + (has("dojo-bidi") ? "_NoBidi" : ""), _baa, {size: 7, baseClass: "dijitMultiSelect", templateString: "<select multiple='true' ${!nameAttrSetting} data-dojo-attach-point='containerNode,focusNode' data-dojo-attach-event='onchange: _onChange'></select>", addSelected: function(_bac) {
_bac.getSelected().forEach(function(n) {
this.containerNode.appendChild(n);
        this.domNode.scrollTop = this.domNode.offsetHeight;
        var _bad = _bac.domNode.scrollTop;
        _bac.domNode.scrollTop = 0;
        _bac.domNode.scrollTop = _bad;
}, this);
        this._set("value", this.get("value"));
}, getSelected: function() {
return _ba9("option", this.containerNode).filter(function(n) {
return n.selected;
});
}, _getValueAttr: function() {
return _ba6.map(this.getSelected(), function(n) {
return n.value;
});
}, multiple: true, _setValueAttr: function(_bae, _baf) {
_ba9("option", this.containerNode).forEach(function(n) {
n.selected = (_ba6.indexOf(_bae, n.value) != - 1);
});
        this.inherited(arguments);
}, invertSelection: function(_bb0) {
var val = [];
        _ba9("option", this.containerNode).forEach(function(n) {
if (!n.selected) {
val.push(n.value);
}
});
        this._setValueAttr(val, !(_bb0 === false || _bb0 == null));
}, _onChange: function() {
this._handleOnChange(this.get("value"), true);
}, resize: function(size) {
if (size) {
_ba8.setMarginBox(this.domNode, size);
}
}, postCreate: function() {
this._set("value", this.get("value"));
        this.inherited(arguments);
}});
        if (has("dojo-bidi")) {
_bab = _ba7("dijit.form.MultiSelect", _bab, {addSelected: function(_bb1) {
_bb1.getSelected().forEach(function(n) {
n.text = this.enforceTextDirWithUcc(this.restoreOriginalText(n), n.text);
}, this);
        this.inherited(arguments);
}, _setTextDirAttr: function(_bb2) {
if ((this.textDir != _bb2 || !this._created) && this.enforceTextDirWithUcc) {
this._set("textDir", _bb2);
        _ba9("option", this.containerNode).forEach(function(_bb3) {
if (!this._created && _bb3.value === _bb3.text) {
_bb3.value = _bb3.text;
}
_bb3.text = this.enforceTextDirWithUcc(_bb3, _bb3.originalText || _bb3.text);
}, this);
}
}});
}
return _bab;
});
}, "dijit/form/Select": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-geometry", "dojo/i18n", "dojo/_base/lang", "dojo/on", "dojo/sniff", "./_FormSelectWidget", "../_HasDropDown", "../DropDownMenu", "../MenuItem", "../MenuSeparator", "../Tooltip", "../_KeyNavMixin", "../registry", "dojo/text!./templates/Select.html", "dojo/i18n!./nls/validate"], function(_bb4, _bb5, _bb6, _bb7, _bb8, i18n, lang, on, has, _bb9, _bba, _bbb, _bbc, _bbd, _bbe, _bbf, _bc0, _bc1) {
var _bc2 = _bb5("dijit.form._SelectMenu", _bbb, {autoFocus: true, buildRendering: function() {
this.inherited(arguments);
        this.domNode.setAttribute("role", "listbox");
}, postCreate: function() {
this.inherited(arguments);
        this.own(on(this.domNode, "selectstart", function(evt) {
        evt.preventDefault();
                evt.stopPropagation();
        }));
}, focus: function() {
var _bc3 = false, val = this.parentWidget.value;
        if (lang.isArray(val)) {
val = val[val.length - 1];
}
if (val) {
_bb4.forEach(this.parentWidget._getChildren(), function(_bc4) {
if (_bc4.option && (val === _bc4.option.value)) {
_bc3 = true;
        this.focusChild(_bc4, false);
}
}, this);
}
if (!_bc3) {
this.inherited(arguments);
}
}});
        var _bc5 = _bb5("dijit.form.Select" + (has("dojo-bidi") ? "_NoBidi" : ""), [_bb9, _bba, _bbf], {baseClass: "dijitSelect dijitValidationTextBox", templateString: _bc1, _buttonInputDisabled: has("ie") ? "disabled" : "", required: false, state: "", message: "", tooltipPosition: [], emptyLabel: "&#160;", _isLoaded: false, _childrenLoaded: false, _fillContent: function() {
        this.inherited(arguments);
                if (this.options.length && !this.value && this.srcNodeRef) {
        var si = this.srcNodeRef.selectedIndex || 0;
                this._set("value", this.options[si >= 0 ? si : 0].value);
        }
        this.dropDown = new _bc2({id: this.id + "_menu", parentWidget: this});
                _bb7.add(this.dropDown.domNode, this.baseClass.replace(/\s+|$/g, "Menu "));
        }, _getMenuItemForOption: function(_bc6) {
        if (!_bc6.value && !_bc6.label) {
        return new _bbd({ownerDocument: this.ownerDocument});
        } else {
        var _bc7 = lang.hitch(this, "_setValueAttr", _bc6);
                var item = new _bbc({option: _bc6, label: _bc6.label || this.emptyLabel, onClick: _bc7, ownerDocument: this.ownerDocument, dir: this.dir, textDir: this.textDir, disabled: _bc6.disabled || false});
                item.focusNode.setAttribute("role", "option");
                return item;
        }
        }, _addOptionItem: function(_bc8) {
        if (this.dropDown) {
        this.dropDown.addChild(this._getMenuItemForOption(_bc8));
        }
        }, _getChildren: function() {
        if (!this.dropDown) {
        return [];
        }
        return this.dropDown.getChildren();
        }, focus: function() {
        if (!this.disabled && this.focusNode.focus) {
        try {
        this.focusNode.focus();
        } catch (e) {
        }
        }
        }, focusChild: function(_bc9) {
        if (_bc9) {
        this.set("value", _bc9.option);
        }
        }, _getFirst: function() {
        var _bca = this._getChildren();
                return _bca.length ? _bca[0] : null;
        }, _getLast: function() {
        var _bcb = this._getChildren();
                return _bcb.length ? _bcb[_bcb.length - 1] : null;
        }, childSelector: function(node) {
        var node = _bc0.byNode(node);
                return node && node.getParent() == this.dropDown;
        }, onKeyboardSearch: function(item, evt, _bcc, _bcd) {
        if (item) {
        this.focusChild(item);
        }
        }, _loadChildren: function(_bce) {
        if (_bce === true) {
        if (this.dropDown) {
        delete this.dropDown.focusedChild;
                this.focusedChild = null;
        }
        if (this.options.length) {
        this.inherited(arguments);
        } else {
        _bb4.forEach(this._getChildren(), function(_bcf) {
        _bcf.destroyRecursive();
        });
                var item = new _bbc({ownerDocument: this.ownerDocument, label: this.emptyLabel});
                this.dropDown.addChild(item);
        }
        } else {
        this._updateSelection();
        }
        this._isLoaded = false;
                this._childrenLoaded = true;
                if (!this._loadingStore) {
        this._setValueAttr(this.value, false);
        }
        }, _refreshState: function() {
        if (this._started) {
        this.validate(this.focused);
        }
        }, startup: function() {
        this.inherited(arguments);
                this._refreshState();
        }, _setValueAttr: function(_bd0) {
        this.inherited(arguments);
                _bb6.set(this.valueNode, "value", this.get("value"));
                this._refreshState();
        }, _setNameAttr: "valueNode", _setDisabledAttr: function(_bd1) {
        this.inherited(arguments);
                this._refreshState();
        }, _setRequiredAttr: function(_bd2) {
        this._set("required", _bd2);
                this.focusNode.setAttribute("aria-required", _bd2);
                this._refreshState();
        }, _setOptionsAttr: function(_bd3) {
        this._isLoaded = false;
                this._set("options", _bd3);
        }, _setDisplay: function(_bd4) {
        var lbl = _bd4 || this.emptyLabel;
                this.containerNode.innerHTML = "<span role=\"option\" class=\"dijitReset dijitInline " + this.baseClass.replace(/\s+|$/g, "Label ") + "\">" + lbl + "</span>";
        }, validate: function(_bd5) {
        var _bd6 = this.disabled || this.isValid(_bd5);
                this._set("state", _bd6 ? "" : (this._hasBeenBlurred ? "Error" : "Incomplete"));
                this.focusNode.setAttribute("aria-invalid", _bd6 ? "false" : "true");
                var _bd7 = _bd6 ? "" : this._missingMsg;
                if (_bd7 && this.focused && this._hasBeenBlurred) {
        _bbe.show(_bd7, this.domNode, this.tooltipPosition, !this.isLeftToRight());
        } else {
        _bbe.hide(this.domNode);
        }
        this._set("message", _bd7);
                return _bd6;
        }, isValid: function() {
        return (!this.required || this.value === 0 || !(/^\s*$/.test(this.value || "")));
        }, reset: function() {
        this.inherited(arguments);
                _bbe.hide(this.domNode);
                this._refreshState();
        }, postMixInProperties: function() {
        this.inherited(arguments);
                this._missingMsg = i18n.getLocalization("dijit.form", "validate", this.lang).missingMessage;
        }, postCreate: function() {
        this.inherited(arguments);
                this.own(on(this.domNode, "selectstart", function(evt) {
                evt.preventDefault();
                        evt.stopPropagation();
                }));
                this.domNode.setAttribute("aria-expanded", "false");
                if (has("ie") < 9) {
        this.defer(function() {
        try {
        var s = domStyle.getComputedStyle(this.domNode);
                if (s) {
        var ff = s.fontFamily;
                if (ff) {
        var _bd8 = this.domNode.getElementsByTagName("INPUT");
                if (_bd8) {
        for (var i = 0; i < _bd8.length; i++) {
        _bd8[i].style.fontFamily = ff;
        }
        }
        }
        }
        } catch (e) {
        }
        });
        }
        }, _setStyleAttr: function(_bd9) {
        this.inherited(arguments);
                _bb7.toggle(this.domNode, this.baseClass.replace(/\s+|$/g, "FixedWidth "), !!this.domNode.style.width);
        }, isLoaded: function() {
        return this._isLoaded;
        }, loadDropDown: function(_bda) {
        this._loadChildren(true);
                this._isLoaded = true;
                _bda();
        }, destroy: function(_bdb) {
        if (this.dropDown && !this.dropDown._destroyed) {
        this.dropDown.destroyRecursive(_bdb);
                delete this.dropDown;
        }
        this.inherited(arguments);
        }, _onFocus: function() {
        this.validate(true);
                this.inherited(arguments);
        }, _onBlur: function() {
        _bbe.hide(this.domNode);
                this.inherited(arguments);
                this.validate(false);
        }});
        if (has("dojo-bidi")) {
_bc5 = _bb5("dijit.form.Select", _bc5, {_setDisplay: function(_bdc) {
this.inherited(arguments);
        this.applyTextDir(this.containerNode);
}});
}
_bc5._Menu = _bc2;
        function _bdd(_bde) {
        return function(evt) {
        if (!this._isLoaded) {
        this.loadDropDown(lang.hitch(this, _bde, evt));
        } else {
        this.inherited(_bde, arguments);
        }
        };
        }
;
        _bc5.prototype._onContainerKeydown = _bdd("_onContainerKeydown");
        _bc5.prototype._onContainerKeypress = _bdd("_onContainerKeypress");
        return _bc5;
});
}, "dijit/form/_FormSelectWidget": function() {
define(["dojo/_base/array", "dojo/_base/Deferred", "dojo/aspect", "dojo/data/util/sorter", "dojo/_base/declare", "dojo/dom", "dojo/dom-class", "dojo/_base/kernel", "dojo/_base/lang", "dojo/query", "dojo/when", "dojo/store/util/QueryResults", "./_FormValueWidget"], function(_bdf, _be0, _be1, _be2, _be3, dom, _be4, _be5, lang, _be6, when, _be7, _be8) {
var _be9 = _be3("dijit.form._FormSelectWidget", _be8, {multiple: false, options: null, store: null, query: null, queryOptions: null, labelAttr: "", onFetch: null, sortByLabel: true, loadChildrenOnOpen: false, onLoadDeferred: null, getOptions: function(_bea) {
var opts = this.options || [];
        if (_bea == null) {
return opts;
}
if (lang.isArray(_bea)) {
return _bdf.map(_bea, "return this.getOptions(item);", this);
}
if (lang.isString(_bea)) {
_bea = {value: _bea};
}
if (lang.isObject(_bea)) {
if (!_bdf.some(opts, function(_beb, idx) {
for (var a in _bea) {
if (!(a in _beb) || _beb[a] != _bea[a]) {
return false;
}
}
_bea = idx;
        return true;
})) {
_bea = - 1;
}
}
if (_bea >= 0 && _bea < opts.length) {
return opts[_bea];
}
return null;
}, addOption: function(_bec) {
_bdf.forEach(lang.isArray(_bec) ? _bec : [_bec], function(i) {
if (i && lang.isObject(i)) {
this.options.push(i);
}
}, this);
        this._loadChildren();
}, removeOption: function(_bed) {
var _bee = this.getOptions(lang.isArray(_bed) ? _bed : [_bed]);
        _bdf.forEach(_bee, function(_bef) {
        if (_bef) {
        this.options = _bdf.filter(this.options, function(node) {
        return (node.value !== _bef.value || node.label !== _bef.label);
        });
                this._removeOptionItem(_bef);
        }
        }, this);
        this._loadChildren();
}, updateOption: function(_bf0) {
_bdf.forEach(lang.isArray(_bf0) ? _bf0 : [_bf0], function(i) {
var _bf1 = this.getOptions({value: i.value}), k;
        if (_bf1) {
for (k in i) {
_bf1[k] = i[k];
}
}
}, this);
        this._loadChildren();
}, setStore: function(_bf2, _bf3, _bf4) {
var _bf5 = this.store;
        _bf4 = _bf4 || {};
        if (_bf5 !== _bf2) {
var h;
        while ((h = this._notifyConnections.pop())) {
h.remove();
}
if (!_bf2.get) {
lang.mixin(_bf2, {_oldAPI: true, get: function(id) {
var _bf6 = new _be0();
        this.fetchItemByIdentity({identity: id, onItem: function(_bf7) {
        _bf6.resolve(_bf7);
        }, onError: function(_bf8) {
        _bf6.reject(_bf8);
        }});
        return _bf6.promise;
}, query: function(_bf9, _bfa) {
var _bfb = new _be0(function() {
if (_bfc.abort) {
_bfc.abort();
}
});
        _bfb.total = new _be0();
        var _bfc = this.fetch(lang.mixin({query: _bf9, onBegin: function(_bfd) {
        _bfb.total.resolve(_bfd);
        }, onComplete: function(_bfe) {
        _bfb.resolve(_bfe);
        }, onError: function(_bff) {
        _bfb.reject(_bff);
        }}, _bfa));
        return new _be7(_bfb);
}});
        if (_bf2.getFeatures()["dojo.data.api.Notification"]) {
this._notifyConnections = [_be1.after(_bf2, "onNew", lang.hitch(this, "_onNewItem"), true), _be1.after(_bf2, "onDelete", lang.hitch(this, "_onDeleteItem"), true), _be1.after(_bf2, "onSet", lang.hitch(this, "_onSetItem"), true)];
}
}
this._set("store", _bf2);
}
if (this.options && this.options.length) {
this.removeOption(this.options);
}
if (this._queryRes && this._queryRes.close) {
this._queryRes.close();
}
if (_bf4.query) {
this._set("query", _bf4.query);
        this._set("queryOptions", _bf4.queryOptions);
}
if (_bf2) {
this._loadingStore = true;
        this.onLoadDeferred = new _be0();
        this._queryRes = _bf2.query(this.query, this.queryOptions);
        when(this._queryRes, lang.hitch(this, function(_c00) {
        if (this.sortByLabel && !_bf4.sort && _c00.length) {
        if (_bf2.getValue) {
        _c00.sort(_be2.createSortFunction([{attribute: _bf2.getLabelAttributes(_c00[0])[0]}], _bf2));
        } else {
        var _c01 = this.labelAttr;
                _c00.sort(function(a, b) {
                return a[_c01] > b[_c01] ? 1 : b[_c01] > a[_c01] ? - 1 : 0;
                });
        }
        }
        if (_bf4.onFetch) {
        _c00 = _bf4.onFetch.call(this, _c00, _bf4);
        }
        _bdf.forEach(_c00, function(i) {
        this._addOptionForItem(i);
        }, this);
                if (this._queryRes.observe) {
        this._queryRes.observe(lang.hitch(this, function(_c02, _c03, _c04) {
        if (_c03 == _c04) {
        this._onSetItem(_c02);
        } else {
        if (_c03 != - 1) {
        this._onDeleteItem(_c02);
        }
        if (_c04 != - 1) {
        this._onNewItem(_c02);
        }
        }
        }), true);
        }
        this._loadingStore = false;
                this.set("value", "_pendingValue" in this ? this._pendingValue : _bf3);
                delete this._pendingValue;
                if (!this.loadChildrenOnOpen) {
        this._loadChildren();
        } else {
        this._pseudoLoadChildren(_c00);
        }
        this.onLoadDeferred.resolve(true);
                this.onSetStore();
        }), function(err) {
        console.error("dijit.form.Select: " + err.toString());
                this.onLoadDeferred.reject(err);
        });
}
return _bf5;
}, _setValueAttr: function(_c05, _c06) {
if (!this._onChangeActive) {
_c06 = null;
}
if (this._loadingStore) {
this._pendingValue = _c05;
        return;
}
if (_c05 == null) {
return;
}
if (lang.isArray(_c05)) {
_c05 = _bdf.map(_c05, function(_c07) {
return lang.isObject(_c07) ? _c07 : {value: _c07};
});
} else {
if (lang.isObject(_c05)) {
_c05 = [_c05];
} else {
_c05 = [{value: _c05}];
}
}
_c05 = _bdf.filter(this.getOptions(_c05), function(i) {
return i && i.value;
});
        var opts = this.getOptions() || [];
        if (!this.multiple && (!_c05[0] || !_c05[0].value) && !!opts.length) {
_c05[0] = opts[0];
}
_bdf.forEach(opts, function(opt) {
opt.selected = _bdf.some(_c05, function(v) {
return v.value === opt.value;
});
});
        var val = _bdf.map(_c05, function(opt) {
        return opt.value;
        });
        if (typeof val == "undefined" || typeof val[0] == "undefined") {
return;
}
var disp = _bdf.map(_c05, function(opt) {
return opt.label;
});
        this._setDisplay(this.multiple ? disp : disp[0]);
        this.inherited(arguments, [this.multiple ? val : val[0], _c06]);
        this._updateSelection();
}, _getDisplayedValueAttr: function() {
var ret = _bdf.map([].concat(this.get("selectedOptions")), function(v) {
if (v && "label" in v) {
return v.label;
} else {
if (v) {
return v.value;
}
}
return null;
}, this);
        return this.multiple ? ret : ret[0];
}, _setDisplayedValueAttr: function(_c08) {
this.set("value", this.getOptions(typeof _c08 == "string" ? {label: _c08} : _c08));
}, _loadChildren: function() {
if (this._loadingStore) {
return;
}
_bdf.forEach(this._getChildren(), function(_c09) {
_c09.destroyRecursive();
});
        _bdf.forEach(this.options, this._addOptionItem, this);
        this._updateSelection();
}, _updateSelection: function() {
this.focusedChild = null;
        this._set("value", this._getValueFromOpts());
        var val = [].concat(this.value);
        if (val && val[0]) {
var self = this;
        _bdf.forEach(this._getChildren(), function(_c0a) {
        var _c0b = _bdf.some(val, function(v) {
        return _c0a.option && (v === _c0a.option.value);
        });
                if (_c0b && !self.multiple) {
        self.focusedChild = _c0a;
        }
        _be4.toggle(_c0a.domNode, this.baseClass.replace(/\s+|$/g, "SelectedOption "), _c0b);
                _c0a.domNode.setAttribute("aria-selected", _c0b ? "true" : "false");
        }, this);
}
}, _getValueFromOpts: function() {
var opts = this.getOptions() || [];
        if (!this.multiple && opts.length) {
var opt = _bdf.filter(opts, function(i) {
return i.selected;
})[0];
        if (opt && opt.value) {
return opt.value;
} else {
opts[0].selected = true;
        return opts[0].value;
}
} else {
if (this.multiple) {
return _bdf.map(_bdf.filter(opts, function(i) {
return i.selected;
}), function(i) {
return i.value;
}) || [];
}
}
return "";
}, _onNewItem: function(item, _c0c) {
if (!_c0c || !_c0c.parent) {
this._addOptionForItem(item);
}
}, _onDeleteItem: function(item) {
var _c0d = this.store;
        this.removeOption({value: _c0d.getIdentity(item)});
}, _onSetItem: function(item) {
this.updateOption(this._getOptionObjForItem(item));
}, _getOptionObjForItem: function(item) {
var _c0e = this.store, _c0f = (this.labelAttr && this.labelAttr in item) ? item[this.labelAttr] : _c0e.getLabel(item), _c10 = (_c0f ? _c0e.getIdentity(item) : null);
        return {value: _c10, label: _c0f, item: item};
}, _addOptionForItem: function(item) {
var _c11 = this.store;
        if (_c11.isItemLoaded && !_c11.isItemLoaded(item)) {
_c11.loadItem({item: item, onItem: function(i) {
this._addOptionForItem(i);
}, scope: this});
        return;
}
var _c12 = this._getOptionObjForItem(item);
        this.addOption(_c12);
}, constructor: function(_c13) {
this._oValue = (_c13 || {}).value || null;
        this._notifyConnections = [];
}, buildRendering: function() {
this.inherited(arguments);
        dom.setSelectable(this.focusNode, false);
}, _fillContent: function() {
if (!this.options) {
this.options = this.srcNodeRef ? _be6("> *", this.srcNodeRef).map(function(node) {
if (node.getAttribute("type") === "separator") {
return {value: "", label: "", selected: false, disabled: false};
}
return {value: (node.getAttribute("data-" + _be5._scopeName + "-value") || node.getAttribute("value")), label: String(node.innerHTML), selected: node.getAttribute("selected") || false, disabled: node.getAttribute("disabled") || false};
}, this) : [];
}
if (!this.value) {
this._set("value", this._getValueFromOpts());
} else {
if (this.multiple && typeof this.value == "string") {
this._set("value", this.value.split(","));
}
}
}, postCreate: function() {
this.inherited(arguments);
        _be1.after(this, "onChange", lang.hitch(this, "_updateSelection"));
        var _c14 = this.store;
        if (_c14 && (_c14.getIdentity || _c14.getFeatures()["dojo.data.api.Identity"])) {
this.store = null;
        this.setStore(_c14, this._oValue);
}
}, startup: function() {
this._loadChildren();
        this.inherited(arguments);
}, destroy: function() {
var h;
        while ((h = this._notifyConnections.pop())) {
h.remove();
}
if (this._queryRes && this._queryRes.close) {
this._queryRes.close();
}
this.inherited(arguments);
}, _addOptionItem: function() {
}, _removeOptionItem: function() {
}, _setDisplay: function() {
}, _getChildren: function() {
return [];
}, _getSelectedOptionsAttr: function() {
return this.getOptions({selected: true});
}, _pseudoLoadChildren: function() {
}, onSetStore: function() {
}});
        return _be9;
});
}, "dijit/form/HorizontalSlider": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dnd/move", "dojo/_base/fx", "dojo/dom-geometry", "dojo/dom-style", "dojo/keys", "dojo/_base/lang", "dojo/sniff", "dojo/dnd/Moveable", "dojo/dnd/Mover", "dojo/query", "dojo/mouse", "dojo/on", "../_base/manager", "../focus", "../typematic", "./Button", "./_FormValueWidget", "../_Container", "dojo/text!./templates/HorizontalSlider.html"], function(_c15, _c16, move, fx, _c17, _c18, keys, lang, has, _c19, _c1a, _c1b, _c1c, on, _c1d, _c1e, _c1f, _c20, _c21, _c22, _c23) {
var _c24 = _c16("dijit.form._SliderMover", _c1a, {onMouseMove: function(e) {
var _c25 = this.widget;
        var _c26 = _c25._abspos;
        if (!_c26) {
_c26 = _c25._abspos = _c17.position(_c25.sliderBarContainer, true);
        _c25._setPixelValue_ = lang.hitch(_c25, "_setPixelValue");
        _c25._isReversed_ = _c25._isReversed();
}
var _c27 = e[_c25._mousePixelCoord] - _c26[_c25._startingPixelCoord];
        _c25._setPixelValue_(_c25._isReversed_ ? (_c26[_c25._pixelCount] - _c27) : _c27, _c26[_c25._pixelCount], false);
}, destroy: function(e) {
_c1a.prototype.destroy.apply(this, arguments);
        var _c28 = this.widget;
        _c28._abspos = null;
        _c28._setValueAttr(_c28.value, true);
}});
        var _c29 = _c16("dijit.form.HorizontalSlider", [_c21, _c22], {templateString: _c23, value: 0, showButtons: true, minimum: 0, maximum: 100, discreteValues: Infinity, pageIncrement: 2, clickSelect: true, slideDuration: _c1d.defaultDuration, _setIdAttr: "", _setNameAttr: "valueNode", baseClass: "dijitSlider", cssStateNodes: {incrementButton: "dijitSliderIncrementButton", decrementButton: "dijitSliderDecrementButton", focusNode: "dijitSliderThumb"}, _mousePixelCoord: "pageX", _pixelCount: "w", _startingPixelCoord: "x", _handleOffsetCoord: "left", _progressPixelSize: "width", _onKeyUp: function(e) {
        if (this.disabled || this.readOnly || e.altKey || e.ctrlKey || e.metaKey) {
        return;
        }
        this._setValueAttr(this.value, true);
        }, _onKeyDown: function(e) {
        if (this.disabled || this.readOnly || e.altKey || e.ctrlKey || e.metaKey) {
        return;
        }
        switch (e.keyCode) {
        case keys.HOME:
                this._setValueAttr(this.minimum, false);
                break;
                case keys.END:
                this._setValueAttr(this.maximum, false);
                break;
                case ((this._descending || this.isLeftToRight()) ? keys.RIGHT_ARROW : keys.LEFT_ARROW):
                case (this._descending === false ? keys.DOWN_ARROW : keys.UP_ARROW):
                case (this._descending === false ? keys.PAGE_DOWN : keys.PAGE_UP):
                this.increment(e);
                break;
                case ((this._descending || this.isLeftToRight()) ? keys.LEFT_ARROW : keys.RIGHT_ARROW):
                case (this._descending === false ? keys.UP_ARROW : keys.DOWN_ARROW):
                case (this._descending === false ? keys.PAGE_UP : keys.PAGE_DOWN):
                this.decrement(e);
                break;
                default:
                return;
        }
        e.stopPropagation();
                e.preventDefault();
        }, _onHandleClick: function(e) {
        if (this.disabled || this.readOnly) {
        return;
        }
        if (!has("ie")) {
        _c1e.focus(this.sliderHandle);
        }
        e.stopPropagation();
                e.preventDefault();
        }, _isReversed: function() {
        return !this.isLeftToRight();
        }, _onBarClick: function(e) {
        if (this.disabled || this.readOnly || !this.clickSelect) {
        return;
        }
        _c1e.focus(this.sliderHandle);
                e.stopPropagation();
                e.preventDefault();
                var _c2a = _c17.position(this.sliderBarContainer, true);
                var _c2b = e[this._mousePixelCoord] - _c2a[this._startingPixelCoord];
                this._setPixelValue(this._isReversed() ? (_c2a[this._pixelCount] - _c2b) : _c2b, _c2a[this._pixelCount], true);
                this._movable.onMouseDown(e);
        }, _setPixelValue: function(_c2c, _c2d, _c2e) {
        if (this.disabled || this.readOnly) {
        return;
        }
        var _c2f = this.discreteValues;
                if (_c2f <= 1 || _c2f == Infinity) {
        _c2f = _c2d;
        }
        _c2f--;
                var _c30 = _c2d / _c2f;
                var _c31 = Math.round(_c2c / _c30);
                this._setValueAttr(Math.max(Math.min((this.maximum - this.minimum) * _c31 / _c2f + this.minimum, this.maximum), this.minimum), _c2e);
        }, _setValueAttr: function(_c32, _c33) {
        this._set("value", _c32);
                this.valueNode.value = _c32;
                this.focusNode.setAttribute("aria-valuenow", _c32);
                this.inherited(arguments);
                var _c34 = this.maximum > this.minimum ? ((_c32 - this.minimum) / (this.maximum - this.minimum)) : 0;
                var _c35 = (this._descending === false) ? this.remainingBar : this.progressBar;
                var _c36 = (this._descending === false) ? this.progressBar : this.remainingBar;
                if (this._inProgressAnim && this._inProgressAnim.status != "stopped") {
        this._inProgressAnim.stop(true);
        }
        if (_c33 && this.slideDuration > 0 && _c35.style[this._progressPixelSize]) {
        var _c37 = this;
                var _c38 = {};
                var _c39 = parseFloat(_c35.style[this._progressPixelSize]);
                var _c3a = this.slideDuration * (_c34 - _c39 / 100);
                if (_c3a == 0) {
        return;
        }
        if (_c3a < 0) {
        _c3a = 0 - _c3a;
        }
        _c38[this._progressPixelSize] = {start: _c39, end: _c34 * 100, units: "%"};
                this._inProgressAnim = fx.animateProperty({node: _c35, duration: _c3a, onAnimate: function(v) {
                _c36.style[_c37._progressPixelSize] = (100 - parseFloat(v[_c37._progressPixelSize])) + "%";
                }, onEnd: function() {
                delete _c37._inProgressAnim;
                }, properties: _c38});
                this._inProgressAnim.play();
        } else {
        _c35.style[this._progressPixelSize] = (_c34 * 100) + "%";
                _c36.style[this._progressPixelSize] = ((1 - _c34) * 100) + "%";
        }
        }, _bumpValue: function(_c3b, _c3c) {
        if (this.disabled || this.readOnly || (this.maximum <= this.minimum)) {
        return;
        }
        var s = _c18.getComputedStyle(this.sliderBarContainer);
                var c = _c17.getContentBox(this.sliderBarContainer, s);
                var _c3d = this.discreteValues;
                if (_c3d <= 1 || _c3d == Infinity) {
        _c3d = c[this._pixelCount];
        }
        _c3d--;
                var _c3e = (this.value - this.minimum) * _c3d / (this.maximum - this.minimum) + _c3b;
                if (_c3e < 0) {
        _c3e = 0;
        }
        if (_c3e > _c3d) {
        _c3e = _c3d;
        }
        _c3e = _c3e * (this.maximum - this.minimum) / _c3d + this.minimum;
                this._setValueAttr(_c3e, _c3c);
        }, _onClkBumper: function(val) {
        if (this.disabled || this.readOnly || !this.clickSelect) {
        return;
        }
        this._setValueAttr(val, true);
        }, _onClkIncBumper: function() {
        this._onClkBumper(this._descending === false ? this.minimum : this.maximum);
        }, _onClkDecBumper: function() {
        this._onClkBumper(this._descending === false ? this.maximum : this.minimum);
        }, decrement: function(e) {
        this._bumpValue(e.keyCode == keys.PAGE_DOWN ? - this.pageIncrement : - 1);
        }, increment: function(e) {
        this._bumpValue(e.keyCode == keys.PAGE_UP ? this.pageIncrement : 1);
        }, _mouseWheeled: function(evt) {
        evt.stopPropagation();
                evt.preventDefault();
                this._bumpValue(evt.wheelDelta < 0 ? - 1 : 1, true);
        }, startup: function() {
        if (this._started) {
        return;
        }
        _c15.forEach(this.getChildren(), function(_c3f) {
        if (this[_c3f.container] != this.containerNode) {
        this[_c3f.container].appendChild(_c3f.domNode);
        }
        }, this);
                this.inherited(arguments);
        }, _typematicCallback: function(_c40, _c41, e) {
        if (_c40 == - 1) {
        this._setValueAttr(this.value, true);
        } else {
        this[(_c41 == (this._descending ? this.incrementButton : this.decrementButton)) ? "decrement" : "increment"](e);
        }
        }, buildRendering: function() {
        this.inherited(arguments);
                if (this.showButtons) {
        this.incrementButton.style.display = "";
                this.decrementButton.style.display = "";
        }
        var _c42 = _c1b("label[for=\"" + this.id + "\"]");
                if (_c42.length) {
        if (!_c42[0].id) {
        _c42[0].id = this.id + "_label";
        }
        this.focusNode.setAttribute("aria-labelledby", _c42[0].id);
        }
        this.focusNode.setAttribute("aria-valuemin", this.minimum);
                this.focusNode.setAttribute("aria-valuemax", this.maximum);
        }, postCreate: function() {
        this.inherited(arguments);
                if (this.showButtons) {
        this.own(_c1f.addMouseListener(this.decrementButton, this, "_typematicCallback", 25, 500), _c1f.addMouseListener(this.incrementButton, this, "_typematicCallback", 25, 500));
        }
        this.own(on(this.domNode, _c1c.wheel, lang.hitch(this, "_mouseWheeled")));
                var _c43 = _c16(_c24, {widget: this});
                this._movable = new _c19(this.sliderHandle, {mover: _c43});
                this._layoutHackIE7();
        }, destroy: function() {
        this._movable.destroy();
                if (this._inProgressAnim && this._inProgressAnim.status != "stopped") {
        this._inProgressAnim.stop(true);
        }
        this.inherited(arguments);
        }});
        _c29._Mover = _c24;
        return _c29;
});
}, "dojo/dnd/move": function() {
define(["../_base/declare", "../dom-geometry", "../dom-style", "./common", "./Mover", "./Moveable"], function(_c44, _c45, _c46, dnd, _c47, _c48) {
var _c49 = _c44("dojo.dnd.move.constrainedMoveable", _c48, {constraints: function() {
}, within: false, constructor: function(node, _c4a) {
if (!_c4a) {
_c4a = {};
}
this.constraints = _c4a.constraints;
        this.within = _c4a.within;
}, onFirstMove: function(_c4b) {
var c = this.constraintBox = this.constraints.call(this, _c4b);
        c.r = c.l + c.w;
        c.b = c.t + c.h;
        if (this.within) {
var mb = _c45.getMarginSize(_c4b.node);
        c.r -= mb.w;
        c.b -= mb.h;
}
}, onMove: function(_c4c, _c4d) {
var c = this.constraintBox, s = _c4c.node.style;
        this.onMoving(_c4c, _c4d);
        _c4d.l = _c4d.l < c.l ? c.l : c.r < _c4d.l ? c.r : _c4d.l;
        _c4d.t = _c4d.t < c.t ? c.t : c.b < _c4d.t ? c.b : _c4d.t;
        s.left = _c4d.l + "px";
        s.top = _c4d.t + "px";
        this.onMoved(_c4c, _c4d);
}});
        var _c4e = _c44("dojo.dnd.move.boxConstrainedMoveable", _c49, {box: {}, constructor: function(node, _c4f) {
        var box = _c4f && _c4f.box;
                this.constraints = function() {
                return box;
                };
        }});
        var _c50 = _c44("dojo.dnd.move.parentConstrainedMoveable", _c49, {area: "content", constructor: function(node, _c51) {
        var area = _c51 && _c51.area;
                this.constraints = function() {
                var n = this.node.parentNode, s = _c46.getComputedStyle(n), mb = _c45.getMarginBox(n, s);
                        if (area == "margin") {
                return mb;
                }
                var t = _c45.getMarginExtents(n, s);
                        mb.l += t.l, mb.t += t.t, mb.w -= t.w, mb.h -= t.h;
                        if (area == "border") {
                return mb;
                }
                t = _c45.getBorderExtents(n, s);
                        mb.l += t.l, mb.t += t.t, mb.w -= t.w, mb.h -= t.h;
                        if (area == "padding") {
                return mb;
                }
                t = _c45.getPadExtents(n, s);
                        mb.l += t.l, mb.t += t.t, mb.w -= t.w, mb.h -= t.h;
                        return mb;
                };
        }});
        return {constrainedMoveable: _c49, boxConstrainedMoveable: _c4e, parentConstrainedMoveable: _c50};
});
}, "dijit/form/VerticalSlider": function() {
define(["dojo/_base/declare", "./HorizontalSlider", "dojo/text!./templates/VerticalSlider.html"], function(_c52, _c53, _c54) {
return _c52("dijit.form.VerticalSlider", _c53, {templateString: _c54, _mousePixelCoord: "pageY", _pixelCount: "h", _startingPixelCoord: "y", _handleOffsetCoord: "top", _progressPixelSize: "height", _descending: true, _isReversed: function() {
return this._descending;
}});
});
}, "dijit/form/HorizontalRule": function() {
define(["dojo/_base/declare", "../_Widget", "../_TemplatedMixin"], function(_c55, _c56, _c57) {
return _c55("dijit.form.HorizontalRule", [_c56, _c57], {templateString: "<div class=\"dijitRuleContainer dijitRuleContainerH\"></div>", count: 3, container: "containerNode", ruleStyle: "", _positionPrefix: "<div class=\"dijitRuleMark dijitRuleMarkH\" style=\"left:", _positionSuffix: "%;", _suffix: "\"></div>", _genHTML: function(pos) {
return this._positionPrefix + pos + this._positionSuffix + this.ruleStyle + this._suffix;
}, _isHorizontal: true, buildRendering: function() {
this.inherited(arguments);
        var _c58;
        if (this.count == 1) {
_c58 = this._genHTML(50, 0);
} else {
var i;
        var _c59 = 100 / (this.count - 1);
        if (!this._isHorizontal || this.isLeftToRight()) {
_c58 = this._genHTML(0, 0);
        for (i = 1; i < this.count - 1; i++) {
_c58 += this._genHTML(_c59 * i, i);
}
_c58 += this._genHTML(100, this.count - 1);
} else {
_c58 = this._genHTML(100, 0);
        for (i = 1; i < this.count - 1; i++) {
_c58 += this._genHTML(100 - _c59 * i, i);
}
_c58 += this._genHTML(0, this.count - 1);
}
}
this.domNode.innerHTML = _c58;
}});
});
}, "dijit/form/VerticalRule": function() {
define(["dojo/_base/declare", "./HorizontalRule"], function(_c5a, _c5b) {
return _c5a("dijit.form.VerticalRule", _c5b, {templateString: "<div class=\"dijitRuleContainer dijitRuleContainerV\"></div>", _positionPrefix: "<div class=\"dijitRuleMark dijitRuleMarkV\" style=\"top:", _isHorizontal: false});
});
}, "dijit/form/HorizontalRuleLabels": function() {
define(["dojo/_base/declare", "dojo/has", "dojo/number", "dojo/query", "dojo/_base/lang", "./HorizontalRule"], function(_c5c, has, _c5d, _c5e, lang, _c5f) {
var _c60 = _c5c("dijit.form.HorizontalRuleLabels", _c5f, {templateString: "<div class=\"dijitRuleContainer dijitRuleContainerH dijitRuleLabelsContainer dijitRuleLabelsContainerH\"></div>", labelStyle: "", labels: [], numericMargin: 0, minimum: 0, maximum: 1, constraints: {pattern: "#%"}, _positionPrefix: "<div class=\"dijitRuleLabelContainer dijitRuleLabelContainerH\" style=\"left:", _labelPrefix: "\"><div class=\"dijitRuleLabel dijitRuleLabelH\">", _suffix: "</div></div>", _calcPosition: function(pos) {
return pos;
}, _genHTML: function(pos, ndx) {
var _c61 = this.labels[ndx];
        return this._positionPrefix + this._calcPosition(pos) + this._positionSuffix + this.labelStyle + this._genDirectionHTML(_c61) + this._labelPrefix + _c61 + this._suffix;
}, _genDirectionHTML: function(_c62) {
return "";
}, getLabels: function() {
var _c63 = this.labels;
        if (!_c63.length && this.srcNodeRef) {
_c63 = _c5e("> li", this.srcNodeRef).map(function(node) {
return String(node.innerHTML);
});
}
if (!_c63.length && this.count > 1) {
var _c64 = this.minimum;
        var inc = (this.maximum - _c64) / (this.count - 1);
        for (var i = 0; i < this.count; i++) {
_c63.push((i < this.numericMargin || i >= (this.count - this.numericMargin)) ? "" : _c5d.format(_c64, this.constraints));
        _c64 += inc;
}
}
return _c63;
}, postMixInProperties: function() {
this.inherited(arguments);
        this.labels = this.getLabels();
        this.count = this.labels.length;
}});
        if (has("dojo-bidi")) {
_c60.extend({_setTextDirAttr: function(_c65) {
if (this.textDir != _c65) {
this._set("textDir", _c65);
        _c5e(".dijitRuleLabelContainer", this.domNode).forEach(lang.hitch(this, function(_c66) {
_c66.style.direction = this.getTextDir(_c66.innerText || _c66.textContent || "");
}));
}
}, _genDirectionHTML: function(_c67) {
return (this.textDir ? ("direction:" + this.getTextDir(_c67) + ";") : "");
}});
}
return _c60;
});
}, "dijit/form/VerticalRuleLabels": function() {
define(["dojo/_base/declare", "./HorizontalRuleLabels"], function(_c68, _c69) {
return _c68("dijit.form.VerticalRuleLabels", _c69, {templateString: "<div class=\"dijitRuleContainer dijitRuleContainerV dijitRuleLabelsContainer dijitRuleLabelsContainerV\"></div>", _positionPrefix: "<div class=\"dijitRuleLabelContainer dijitRuleLabelContainerV\" style=\"top:", _labelPrefix: "\"><span class=\"dijitRuleLabel dijitRuleLabelV\">", _calcPosition: function(pos) {
return 100 - pos;
}, _isHorizontal: false});
});
}, "dijit/form/SimpleTextarea": function() {
define(["dojo/_base/declare", "dojo/dom-class", "dojo/sniff", "./TextBox"], function(_c6a, _c6b, has, _c6c) {
return _c6a("dijit.form.SimpleTextarea", _c6c, {baseClass: "dijitTextBox dijitTextArea", rows: "3", cols: "20", templateString: "<textarea ${!nameAttrSetting} data-dojo-attach-point='focusNode,containerNode,textbox' autocomplete='off'></textarea>", postMixInProperties: function() {
if (!this.value && this.srcNodeRef) {
this.value = this.srcNodeRef.value;
}
this.inherited(arguments);
}, buildRendering: function() {
this.inherited(arguments);
        if (has("ie") && this.cols) {
_c6b.add(this.textbox, "dijitTextAreaCols");
}
}, filter: function(_c6d) {
if (_c6d) {
_c6d = _c6d.replace(/\r/g, "");
}
return this.inherited(arguments);
}, _onInput: function(e) {
if (this.maxLength) {
var _c6e = parseInt(this.maxLength);
        var _c6f = this.textbox.value.replace(/\r/g, "");
        var _c70 = _c6f.length - _c6e;
        if (_c70 > 0) {
var _c71 = this.textbox;
        if (_c71.selectionStart) {
var pos = _c71.selectionStart;
        var cr = 0;
        if (has("opera")) {
cr = (this.textbox.value.substring(0, pos).match(/\r/g) || []).length;
}
this.textbox.value = _c6f.substring(0, pos - _c70 - cr) + _c6f.substring(pos - cr);
        _c71.setSelectionRange(pos - _c70, pos - _c70);
} else {
if (this.ownerDocument.selection) {
_c71.focus();
        var _c72 = this.ownerDocument.selection.createRange();
        _c72.moveStart("character", - _c70);
        _c72.text = "";
        _c72.select();
}
}
}
}
this.inherited(arguments);
}});
});
}, "dijit/form/Textarea": function() {
define(["dojo/_base/declare", "dojo/dom-style", "./_ExpandingTextAreaMixin", "./SimpleTextarea"], function(_c73, _c74, _c75, _c76) {
return _c73("dijit.form.Textarea", [_c76, _c75], {baseClass: "dijitTextBox dijitTextArea dijitExpandingTextArea", cols: "", buildRendering: function() {
this.inherited(arguments);
        _c74.set(this.textbox, {overflowY: "hidden", overflowX: "auto", boxSizing: "border-box", MsBoxSizing: "border-box", WebkitBoxSizing: "border-box", MozBoxSizing: "border-box"});
}});
});
}, "dijit/form/_ExpandingTextAreaMixin": function() {
define(["dojo/_base/declare", "dojo/dom-construct", "dojo/has", "dojo/_base/lang", "dojo/on", "dojo/_base/window", "../Viewport"], function(_c77, _c78, has, lang, on, win, _c79) {
has.add("textarea-needs-help-shrinking", function() {
var body = win.body(), te = _c78.create("textarea", {rows: "5", cols: "20", value: " ", style: {zoom: 1, fontSize: "12px", height: "96px", overflow: "hidden", visibility: "hidden", position: "absolute", border: "5px solid white", margin: "0", padding: "0", boxSizing: "border-box", MsBoxSizing: "border-box", WebkitBoxSizing: "border-box", MozBoxSizing: "border-box"}}, body, "last");
        var _c7a = te.scrollHeight >= te.clientHeight;
        body.removeChild(te);
        return _c7a;
});
        return _c77("dijit.form._ExpandingTextAreaMixin", null, {_setValueAttr: function() {
        this.inherited(arguments);
                this.resize();
        }, postCreate: function() {
        this.inherited(arguments);
                var _c7b = this.textbox;
                _c7b.style.overflowY = "hidden";
                this.own(on(_c7b, "focus, resize", lang.hitch(this, "_resizeLater")));
        }, startup: function() {
        this.inherited(arguments);
                this.own(_c79.on("resize", lang.hitch(this, "_resizeLater")));
                this._resizeLater();
        }, _onInput: function(e) {
        this.inherited(arguments);
                this.resize();
        }, _estimateHeight: function() {
        var _c7c = this.textbox;
                _c7c.rows = (_c7c.value.match(/\n/g) || []).length + 1;
        }, _resizeLater: function() {
        this.defer("resize");
        }, resize: function() {
        var _c7d = this.textbox;
                function _c7e() {
                var _c7f = false;
                        if (_c7d.value === "") {
                _c7d.value = " ";
                        _c7f = true;
                }
                var sh = _c7d.scrollHeight;
                        if (_c7f) {
                _c7d.value = "";
                }
                return sh;
                }
        ;
                if (_c7d.style.overflowY == "hidden") {
        _c7d.scrollTop = 0;
        }
        if (this.busyResizing) {
        return;
        }
        this.busyResizing = true;
                if (_c7e() || _c7d.offsetHeight) {
        var newH = _c7e() + Math.max(_c7d.offsetHeight - _c7d.clientHeight, 0);
                var _c80 = newH + "px";
                if (_c80 != _c7d.style.height) {
        _c7d.style.height = _c80;
                _c7d.rows = 1;
        }
        if (has("textarea-needs-help-shrinking")) {
        var _c81 = _c7e(), _c82 = _c81, _c83 = _c7d.style.minHeight, _c84 = 4, _c85, _c86 = _c7d.scrollTop;
                _c7d.style.minHeight = _c80;
                _c7d.style.height = "auto";
                while (newH > 0) {
        _c7d.style.minHeight = Math.max(newH - _c84, 4) + "px";
                _c85 = _c7e();
                var _c87 = _c82 - _c85;
                newH -= _c87;
                if (_c87 < _c84) {
        break;
        }
        _c82 = _c85;
                _c84 <<= 1;
        }
        _c7d.style.height = newH + "px";
                _c7d.style.minHeight = _c83;
                _c7d.scrollTop = _c86;
        }
        _c7d.style.overflowY = _c7e() > _c7d.clientHeight ? "auto" : "hidden";
                if (_c7d.style.overflowY == "hidden") {
        _c7d.scrollTop = 0;
        }
        } else {
        this._estimateHeight();
        }
        this.busyResizing = false;
        }});
});
}, "dijit/layout/AccordionContainer": function() {
define(["require", "dojo/_base/array", "dojo/_base/declare", "dojo/_base/fx", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/keys", "dojo/_base/lang", "dojo/sniff", "dojo/topic", "../focus", "../_base/manager", "dojo/ready", "../_Widget", "../_Container", "../_TemplatedMixin", "../_CssStateMixin", "./StackContainer", "./ContentPane", "dojo/text!./templates/AccordionButton.html", "../a11yclick"], function(_c88, _c89, _c8a, fx, dom, _c8b, _c8c, _c8d, _c8e, keys, lang, has, _c8f, _c90, _c91, _c92, _c93, _c94, _c95, _c96, _c97, _c98, _c99) {
var _c9a = _c8a("dijit.layout._AccordionButton", [_c93, _c95, _c96], {templateString: _c99, label: "", _setLabelAttr: {node: "titleTextNode", type: "innerHTML"}, title: "", _setTitleAttr: {node: "titleTextNode", type: "attribute", attribute: "title"}, iconClassAttr: "", _setIconClassAttr: {node: "iconNode", type: "class"}, baseClass: "dijitAccordionTitle", getParent: function() {
return this.parent;
}, buildRendering: function() {
this.inherited(arguments);
        var _c9b = this.id.replace(" ", "_");
        _c8b.set(this.titleTextNode, "id", _c9b + "_title");
        this.focusNode.setAttribute("aria-labelledby", _c8b.get(this.titleTextNode, "id"));
        dom.setSelectable(this.domNode, false);
}, getTitleHeight: function() {
return _c8e.getMarginSize(this.domNode).h;
}, _onTitleClick: function() {
var _c9c = this.getParent();
        _c9c.selectChild(this.contentWidget, true);
        _c90.focus(this.focusNode);
}, _onTitleKeyDown: function(evt) {
return this.getParent()._onKeyDown(evt, this.contentWidget);
}, _setSelectedAttr: function(_c9d) {
this._set("selected", _c9d);
        this.focusNode.setAttribute("aria-expanded", _c9d ? "true" : "false");
        this.focusNode.setAttribute("aria-selected", _c9d ? "true" : "false");
        this.focusNode.setAttribute("tabIndex", _c9d ? "0" : "-1");
}});
        if (has("dojo-bidi")) {
_c9a.extend({_setLabelAttr: function(_c9e) {
this._set("label", _c9e);
        _c8b.set(this.titleTextNode, "innerHTML", _c9e);
        this.applyTextDir(this.titleTextNode);
}, _setTitleAttr: function(_c9f) {
this._set("title", _c9f);
        _c8b.set(this.titleTextNode, "title", _c9f);
        this.applyTextDir(this.titleTextNode);
}});
}
var _ca0 = _c8a("dijit.layout._AccordionInnerContainer" + (has("dojo-bidi") ? "_NoBidi" : ""), [_c93, _c96], {baseClass: "dijitAccordionInnerContainer", isLayoutContainer: true, buildRendering: function() {
this.domNode = _c8d.place("<div class='" + this.baseClass + "' role='presentation'>", this.contentWidget.domNode, "after");
        var _ca1 = this.contentWidget, cls = lang.isString(this.buttonWidget) ? lang.getObject(this.buttonWidget) : this.buttonWidget;
        this.button = _ca1._buttonWidget = (new cls({contentWidget: _ca1, label: _ca1.title, title: _ca1.tooltip, dir: _ca1.dir, lang: _ca1.lang, textDir: _ca1.textDir || this.textDir, iconClass: _ca1.iconClass, id: _ca1.id + "_button", parent: this.parent})).placeAt(this.domNode);
        this.containerNode = _c8d.place("<div class='dijitAccordionChildWrapper' role='tabpanel' style='display:none'>", this.domNode);
        this.containerNode.setAttribute("aria-labelledby", this.button.id);
        _c8d.place(this.contentWidget.domNode, this.containerNode);
}, postCreate: function() {
this.inherited(arguments);
        var _ca2 = this.button, cw = this.contentWidget;
        this._contentWidgetWatches = [cw.watch("title", lang.hitch(this, function(name, _ca3, _ca4) {
        _ca2.set("label", _ca4);
        })), cw.watch("tooltip", lang.hitch(this, function(name, _ca5, _ca6) {
        _ca2.set("title", _ca6);
        })), cw.watch("iconClass", lang.hitch(this, function(name, _ca7, _ca8) {
        _ca2.set("iconClass", _ca8);
        }))];
}, _setSelectedAttr: function(_ca9) {
this._set("selected", _ca9);
        this.button.set("selected", _ca9);
        if (_ca9) {
var cw = this.contentWidget;
        if (cw.onSelected) {
cw.onSelected();
}
}
}, startup: function() {
this.contentWidget.startup();
}, destroy: function() {
this.button.destroyRecursive();
        _c89.forEach(this._contentWidgetWatches || [], function(w) {
        w.unwatch();
        });
        delete this.contentWidget._buttonWidget;
        delete this.contentWidget._wrapperWidget;
        this.inherited(arguments);
}, destroyDescendants: function(_caa) {
this.contentWidget.destroyRecursive(_caa);
}});
        if (has("dojo-bidi")) {
_ca0 = _c8a("dijit.layout._AccordionInnerContainer", _ca0, {postCreate: function() {
this.inherited(arguments);
        var _cab = this.button;
        this._contentWidgetWatches.push(this.contentWidget.watch("textDir", function(name, _cac, _cad) {
        _cab.set("textDir", _cad);
        }));
}});
}
var _cae = _c8a("dijit.layout.AccordionContainer", _c97, {duration: _c91.defaultDuration, buttonWidget: _c9a, baseClass: "dijitAccordionContainer", buildRendering: function() {
this.inherited(arguments);
        this.domNode.style.overflow = "hidden";
        this.domNode.setAttribute("role", "tablist");
}, startup: function() {
if (this._started) {
return;
}
this.inherited(arguments);
        if (this.selectedChildWidget) {
this.selectedChildWidget._wrapperWidget.set("selected", true);
}
}, layout: function() {
var _caf = this.selectedChildWidget;
        if (!_caf) {
return;
}
var _cb0 = _caf._wrapperWidget.domNode, _cb1 = _c8e.getMarginExtents(_cb0), _cb2 = _c8e.getPadBorderExtents(_cb0), _cb3 = _caf._wrapperWidget.containerNode, _cb4 = _c8e.getMarginExtents(_cb3), _cb5 = _c8e.getPadBorderExtents(_cb3), _cb6 = this._contentBox;
        var _cb7 = 0;
        _c89.forEach(this.getChildren(), function(_cb8) {
        if (_cb8 != _caf) {
        _cb7 += _c8e.getMarginSize(_cb8._wrapperWidget.domNode).h;
        }
        });
        this._verticalSpace = _cb6.h - _cb7 - _cb1.h - _cb2.h - _cb4.h - _cb5.h - _caf._buttonWidget.getTitleHeight();
        this._containerContentBox = {h: this._verticalSpace, w: this._contentBox.w - _cb1.w - _cb2.w - _cb4.w - _cb5.w};
        if (_caf) {
_caf.resize(this._containerContentBox);
}
}, _setupChild: function(_cb9) {
_cb9._wrapperWidget = _ca0({contentWidget: _cb9, buttonWidget: this.buttonWidget, id: _cb9.id + "_wrapper", dir: _cb9.dir, lang: _cb9.lang, textDir: _cb9.textDir || this.textDir, parent: this});
        this.inherited(arguments);
        _c8d.place(_cb9.domNode, _cb9._wrapper, "replace");
}, removeChild: function(_cba) {
if (_cba._wrapperWidget) {
_c8d.place(_cba.domNode, _cba._wrapperWidget.domNode, "after");
        _cba._wrapperWidget.destroy();
        delete _cba._wrapperWidget;
}
_c8c.remove(_cba.domNode, "dijitHidden");
        this.inherited(arguments);
}, getChildren: function() {
return _c89.map(this.inherited(arguments), function(_cbb) {
return _cbb.declaredClass == "dijit.layout._AccordionInnerContainer" ? _cbb.contentWidget : _cbb;
}, this);
}, destroy: function() {
if (this._animation) {
this._animation.stop();
}
_c89.forEach(this.getChildren(), function(_cbc) {
if (_cbc._wrapperWidget) {
_cbc._wrapperWidget.destroy();
} else {
_cbc.destroyRecursive();
}
});
        this.inherited(arguments);
}, _showChild: function(_cbd) {
_cbd._wrapperWidget.containerNode.style.display = "block";
        return this.inherited(arguments);
}, _hideChild: function(_cbe) {
_cbe._wrapperWidget.containerNode.style.display = "none";
        this.inherited(arguments);
}, _transition: function(_cbf, _cc0, _cc1) {
if (has("ie") < 8) {
_cc1 = false;
}
if (this._animation) {
this._animation.stop(true);
        delete this._animation;
}
var self = this;
        if (_cbf) {
_cbf._wrapperWidget.set("selected", true);
        var d = this._showChild(_cbf);
        if (this.doLayout && _cbf.resize) {
_cbf.resize(this._containerContentBox);
}
}
if (_cc0) {
_cc0._wrapperWidget.set("selected", false);
        if (!_cc1) {
this._hideChild(_cc0);
}
}
if (_cc1) {
var _cc2 = _cbf._wrapperWidget.containerNode, _cc3 = _cc0._wrapperWidget.containerNode;
        var _cc4 = _cbf._wrapperWidget.containerNode, _cc5 = _c8e.getMarginExtents(_cc4), _cc6 = _c8e.getPadBorderExtents(_cc4), _cc7 = _cc5.h + _cc6.h;
        _cc3.style.height = (self._verticalSpace - _cc7) + "px";
        this._animation = new fx.Animation({node: _cc2, duration: this.duration, curve: [1, this._verticalSpace - _cc7 - 1], onAnimate: function(_cc8) {
        _cc8 = Math.floor(_cc8);
                _cc2.style.height = _cc8 + "px";
                _cc3.style.height = (self._verticalSpace - _cc7 - _cc8) + "px";
        }, onEnd: function() {
        delete self._animation;
                _cc2.style.height = "auto";
                _cc0._wrapperWidget.containerNode.style.display = "none";
                _cc3.style.height = "auto";
                self._hideChild(_cc0);
        }});
        this._animation.onStop = this._animation.onEnd;
        this._animation.play();
}
return d;
}, _onKeyDown: function(e, _cc9) {
if (this.disabled || e.altKey || !(_cc9 || e.ctrlKey)) {
return;
}
var c = e.keyCode;
        if ((_cc9 && (c == keys.LEFT_ARROW || c == keys.UP_ARROW)) || (e.ctrlKey && c == keys.PAGE_UP)) {
this._adjacent(false)._buttonWidget._onTitleClick();
        e.stopPropagation();
        e.preventDefault();
} else {
if ((_cc9 && (c == keys.RIGHT_ARROW || c == keys.DOWN_ARROW)) || (e.ctrlKey && (c == keys.PAGE_DOWN || c == keys.TAB))) {
this._adjacent(true)._buttonWidget._onTitleClick();
        e.stopPropagation();
        e.preventDefault();
}
}
}});
        if (has("dijit-legacy-requires")) {
_c92(0, function() {
var _cca = ["dijit/layout/AccordionPane"];
        _c88(_cca);
});
}
_cae._InnerContainer = _ca0;
        _cae._Button = _c9a;
        return _cae;
});
}, "dijit/layout/StackContainer": function() {
define(["dojo/_base/array", "dojo/cookie", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-construct", "dojo/has", "dojo/_base/lang", "dojo/on", "dojo/ready", "dojo/topic", "dojo/when", "../registry", "../_WidgetBase", "./_LayoutWidget"], function(_ccb, _ccc, _ccd, _cce, _ccf, has, lang, on, _cd0, _cd1, when, _cd2, _cd3, _cd4) {
if (has("dijit-legacy-requires")) {
_cd0(0, function() {
var _cd5 = ["dijit/layout/StackController"];
        require(_cd5);
});
}
var _cd6 = _ccd("dijit.layout.StackContainer", _cd4, {doLayout: true, persist: false, baseClass: "dijitStackContainer", buildRendering: function() {
this.inherited(arguments);
        _cce.add(this.domNode, "dijitLayoutContainer");
}, postCreate: function() {
this.inherited(arguments);
        this.own(on(this.domNode, "keydown", lang.hitch(this, "_onKeyDown")));
}, startup: function() {
if (this._started) {
return;
}
var _cd7 = this.getChildren();
        _ccb.forEach(_cd7, this._setupChild, this);
        if (this.persist) {
this.selectedChildWidget = _cd2.byId(_ccc(this.id + "_selectedChild"));
} else {
_ccb.some(_cd7, function(_cd8) {
if (_cd8.selected) {
this.selectedChildWidget = _cd8;
}
return _cd8.selected;
}, this);
}
var _cd9 = this.selectedChildWidget;
        if (!_cd9 && _cd7[0]) {
_cd9 = this.selectedChildWidget = _cd7[0];
        _cd9.selected = true;
}
_cd1.publish(this.id + "-startup", {children: _cd7, selected: _cd9, textDir: this.textDir});
        this.inherited(arguments);
}, resize: function() {
if (!this._hasBeenShown) {
this._hasBeenShown = true;
        var _cda = this.selectedChildWidget;
        if (_cda) {
this._showChild(_cda);
}
}
this.inherited(arguments);
}, _setupChild: function(_cdb) {
var _cdc = _cdb.domNode, _cdd = _ccf.place("<div role='tabpanel' class='" + this.baseClass + "ChildWrapper dijitHidden'>", _cdb.domNode, "replace"), _cde = _cdb["aria-label"] || _cdb.title || _cdb.label;
        if (_cde) {
_cdd.setAttribute("aria-label", _cde);
}
_ccf.place(_cdc, _cdd);
        _cdb._wrapper = _cdd;
        this.inherited(arguments);
        if (_cdc.style.display == "none") {
_cdc.style.display = "block";
}
_cdb.domNode.title = "";
}, addChild: function(_cdf, _ce0) {
this.inherited(arguments);
        if (this._started) {
_cd1.publish(this.id + "-addChild", _cdf, _ce0);
        this.layout();
        if (!this.selectedChildWidget) {
this.selectChild(_cdf);
}
}
}, removeChild: function(page) {
var idx = _ccb.indexOf(this.getChildren(), page);
        this.inherited(arguments);
        _ccf.destroy(page._wrapper);
        delete page._wrapper;
        if (this._started) {
_cd1.publish(this.id + "-removeChild", page);
}
if (this._descendantsBeingDestroyed) {
return;
}
if (this.selectedChildWidget === page) {
this.selectedChildWidget = undefined;
        if (this._started) {
var _ce1 = this.getChildren();
        if (_ce1.length) {
this.selectChild(_ce1[Math.max(idx - 1, 0)]);
}
}
}
if (this._started) {
this.layout();
}
}, selectChild: function(page, _ce2) {
var d;
        page = _cd2.byId(page);
        if (this.selectedChildWidget != page) {
d = this._transition(page, this.selectedChildWidget, _ce2);
        this._set("selectedChildWidget", page);
        _cd1.publish(this.id + "-selectChild", page);
        if (this.persist) {
_ccc(this.id + "_selectedChild", this.selectedChildWidget.id);
}
}
return when(d || true);
}, _transition: function(_ce3, _ce4) {
if (_ce4) {
this._hideChild(_ce4);
}
var d = this._showChild(_ce3);
        if (_ce3.resize) {
if (this.doLayout) {
_ce3.resize(this._containerContentBox || this._contentBox);
} else {
_ce3.resize();
}
}
return d;
}, _adjacent: function(_ce5) {
var _ce6 = this.getChildren();
        var _ce7 = _ccb.indexOf(_ce6, this.selectedChildWidget);
        _ce7 += _ce5 ? 1 : _ce6.length - 1;
        return _ce6[_ce7 % _ce6.length];
}, forward: function() {
return this.selectChild(this._adjacent(true), true);
}, back: function() {
return this.selectChild(this._adjacent(false), true);
}, _onKeyDown: function(e) {
_cd1.publish(this.id + "-containerKeyDown", {e: e, page: this});
}, layout: function() {
var _ce8 = this.selectedChildWidget;
        if (_ce8 && _ce8.resize) {
if (this.doLayout) {
_ce8.resize(this._containerContentBox || this._contentBox);
} else {
_ce8.resize();
}
}
}, _showChild: function(page) {
var _ce9 = this.getChildren();
        page.isFirstChild = (page == _ce9[0]);
        page.isLastChild = (page == _ce9[_ce9.length - 1]);
        page._set("selected", true);
        if (page._wrapper) {
_cce.replace(page._wrapper, "dijitVisible", "dijitHidden");
}
return (page._onShow && page._onShow()) || true;
}, _hideChild: function(page) {
page._set("selected", false);
        if (page._wrapper) {
_cce.replace(page._wrapper, "dijitHidden", "dijitVisible");
}
page.onHide && page.onHide();
}, closeChild: function(page) {
var _cea = page.onClose && page.onClose(this, page);
        if (_cea) {
this.removeChild(page);
        page.destroyRecursive();
}
}, destroyDescendants: function(_ceb) {
this._descendantsBeingDestroyed = true;
        this.selectedChildWidget = undefined;
        _ccb.forEach(this.getChildren(), function(_cec) {
        if (!_ceb) {
        this.removeChild(_cec);
        }
        _cec.destroyRecursive(_ceb);
        }, this);
        this._descendantsBeingDestroyed = false;
}});
        _cd6.ChildWidgetProperties = {selected: false, disabled: false, closable: false, iconClass: "dijitNoIcon", showTitle: true};
        lang.extend(_cd3, _cd6.ChildWidgetProperties);
        return _cd6;
});
}, "dijit/layout/BorderContainer": function() {
define(["dojo/_base/array", "dojo/cookie", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/dom-style", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/touch", "../_WidgetBase", "../_Widget", "../_TemplatedMixin", "./LayoutContainer", "./utils"], function(_ced, _cee, _cef, _cf0, _cf1, _cf2, _cf3, keys, lang, on, _cf4, _cf5, _cf6, _cf7, _cf8, _cf9) {
var _cfa = _cef("dijit.layout._Splitter", [_cf6, _cf7], {live: true, templateString: "<div class=\"dijitSplitter\" data-dojo-attach-event=\"onkeydown:_onKeyDown,press:_startDrag,onmouseenter:_onMouse,onmouseleave:_onMouse\" tabIndex=\"0\" role=\"separator\"><div class=\"dijitSplitterThumb\"></div></div>", constructor: function() {
this._handlers = [];
}, postMixInProperties: function() {
this.inherited(arguments);
        this.horizontal = /top|bottom/.test(this.region);
        this._factor = /top|left/.test(this.region) ? 1 : - 1;
        this._cookieName = this.container.id + "_" + this.region;
}, buildRendering: function() {
this.inherited(arguments);
        _cf0.add(this.domNode, "dijitSplitter" + (this.horizontal ? "H" : "V"));
        if (this.container.persist) {
var _cfb = _cee(this._cookieName);
        if (_cfb) {
this.child.domNode.style[this.horizontal ? "height" : "width"] = _cfb;
}
}
}, _computeMaxSize: function() {
var dim = this.horizontal ? "h" : "w", _cfc = _cf2.getMarginBox(this.child.domNode)[dim], _cfd = _ced.filter(this.container.getChildren(), function(_cfe) {
return _cfe.region == "center";
})[0];
        var _cff = _cf2.getContentBox(_cfd.domNode)[dim] - 10;
        return Math.min(this.child.maxSize, _cfc + _cff);
}, _startDrag: function(e) {
if (!this.cover) {
this.cover = _cf1.place("<div class=dijitSplitterCover></div>", this.child.domNode, "after");
}
_cf0.add(this.cover, "dijitSplitterCoverActive");
        if (this.fake) {
_cf1.destroy(this.fake);
}
if (!(this._resize = this.live)) {
(this.fake = this.domNode.cloneNode(true)).removeAttribute("id");
        _cf0.add(this.domNode, "dijitSplitterShadow");
        _cf1.place(this.fake, this.domNode, "after");
}
_cf0.add(this.domNode, "dijitSplitterActive dijitSplitter" + (this.horizontal ? "H" : "V") + "Active");
        if (this.fake) {
_cf0.remove(this.fake, "dijitSplitterHover dijitSplitter" + (this.horizontal ? "H" : "V") + "Hover");
}
var _d00 = this._factor, _d01 = this.horizontal, axis = _d01 ? "pageY" : "pageX", _d02 = e[axis], _d03 = this.domNode.style, dim = _d01 ? "h" : "w", _d04 = _cf3.getComputedStyle(this.child.domNode), _d05 = _cf2.getMarginBox(this.child.domNode, _d04)[dim], max = this._computeMaxSize(), min = Math.max(this.child.minSize, _cf2.getPadBorderExtents(this.child.domNode, _d04)[dim] + 10), _d06 = this.region, _d07 = _d06 == "top" || _d06 == "bottom" ? "top" : "left", _d08 = parseInt(_d03[_d07], 10), _d09 = this._resize, _d0a = lang.hitch(this.container, "_layoutChildren", this.child.id), de = this.ownerDocument;
        this._handlers = this._handlers.concat([on(de, _cf4.move, this._drag = function(e, _d0b) {
        var _d0c = e[axis] - _d02, _d0d = _d00 * _d0c + _d05, _d0e = Math.max(Math.min(_d0d, max), min);
                if (_d09 || _d0b) {
        _d0a(_d0e);
        }
        _d03[_d07] = _d0c + _d08 + _d00 * (_d0e - _d0d) + "px";
        }), on(de, "dragstart", function(e) {
        e.stopPropagation();
                e.preventDefault();
        }), on(this.ownerDocumentBody, "selectstart", function(e) {
        e.stopPropagation();
                e.preventDefault();
        }), on(de, _cf4.release, lang.hitch(this, "_stopDrag"))]);
        e.stopPropagation();
        e.preventDefault();
}, _onMouse: function(e) {
var o = (e.type == "mouseover" || e.type == "mouseenter");
        _cf0.toggle(this.domNode, "dijitSplitterHover", o);
        _cf0.toggle(this.domNode, "dijitSplitter" + (this.horizontal ? "H" : "V") + "Hover", o);
}, _stopDrag: function(e) {
try {
if (this.cover) {
_cf0.remove(this.cover, "dijitSplitterCoverActive");
}
if (this.fake) {
_cf1.destroy(this.fake);
}
_cf0.remove(this.domNode, "dijitSplitterActive dijitSplitter" + (this.horizontal ? "H" : "V") + "Active dijitSplitterShadow");
        this._drag(e);
        this._drag(e, true);
} finally {
this._cleanupHandlers();
        delete this._drag;
}
if (this.container.persist) {
_cee(this._cookieName, this.child.domNode.style[this.horizontal ? "height" : "width"], {expires: 365});
}
}, _cleanupHandlers: function() {
var h;
        while (h = this._handlers.pop()) {
h.remove();
}
}, _onKeyDown: function(e) {
this._resize = true;
        var _d0f = this.horizontal;
        var tick = 1;
        switch (e.keyCode) {
case _d0f ? keys.UP_ARROW : keys.LEFT_ARROW:
        tick *= - 1;
        case _d0f ? keys.DOWN_ARROW : keys.RIGHT_ARROW:
        break;
        default:
        return;
}
var _d10 = _cf2.getMarginSize(this.child.domNode)[_d0f ? "h" : "w"] + this._factor * tick;
        this.container._layoutChildren(this.child.id, Math.max(Math.min(_d10, this._computeMaxSize()), this.child.minSize));
        e.stopPropagation();
        e.preventDefault();
}, destroy: function() {
this._cleanupHandlers();
        delete this.child;
        delete this.container;
        delete this.cover;
        delete this.fake;
        this.inherited(arguments);
}});
        var _d11 = _cef("dijit.layout._Gutter", [_cf6, _cf7], {templateString: "<div class=\"dijitGutter\" role=\"presentation\"></div>", postMixInProperties: function() {
        this.inherited(arguments);
                this.horizontal = /top|bottom/.test(this.region);
        }, buildRendering: function() {
        this.inherited(arguments);
                _cf0.add(this.domNode, "dijitGutter" + (this.horizontal ? "H" : "V"));
        }});
        var _d12 = _cef("dijit.layout.BorderContainer", _cf8, {gutters: true, liveSplitters: true, persist: false, baseClass: "dijitBorderContainer", _splitterClass: _cfa, postMixInProperties: function() {
        if (!this.gutters) {
        this.baseClass += "NoGutter";
        }
        this.inherited(arguments);
        }, _setupChild: function(_d13) {
        this.inherited(arguments);
                var _d14 = _d13.region, ltr = _d13.isLeftToRight();
                if (_d14 == "leading") {
        _d14 = ltr ? "left" : "right";
        }
        if (_d14 == "trailing") {
        _d14 = ltr ? "right" : "left";
        }
        if (_d14) {
        if (_d14 != "center" && (_d13.splitter || this.gutters) && !_d13._splitterWidget) {
        var _d15 = _d13.splitter ? this._splitterClass : _d11;
                if (lang.isString(_d15)) {
        _d15 = lang.getObject(_d15);
        }
        var _d16 = new _d15({id: _d13.id + "_splitter", container: this, child: _d13, region: _d14, live: this.liveSplitters});
                _d16.isSplitter = true;
                _d13._splitterWidget = _d16;
                var _d17 = _d14 == "bottom" || _d14 == (this.isLeftToRight() ? "right" : "left");
                _cf1.place(_d16.domNode, _d13.domNode, _d17 ? "before" : "after");
                _d16.startup();
        }
        }
        }, layout: function() {
        this._layoutChildren();
        }, removeChild: function(_d18) {
        var _d19 = _d18._splitterWidget;
                if (_d19) {
        _d19.destroy();
                delete _d18._splitterWidget;
        }
        this.inherited(arguments);
        }, getChildren: function() {
        return _ced.filter(this.inherited(arguments), function(_d1a) {
        return !_d1a.isSplitter;
        });
        }, getSplitter: function(_d1b) {
        return _ced.filter(this.getChildren(), function(_d1c) {
        return _d1c.region == _d1b;
        })[0]._splitterWidget;
        }, resize: function(_d1d, _d1e) {
        if (!this.cs || !this.pe) {
        var node = this.domNode;
                this.cs = _cf3.getComputedStyle(node);
                this.pe = _cf2.getPadExtents(node, this.cs);
                this.pe.r = _cf3.toPixelValue(node, this.cs.paddingRight);
                this.pe.b = _cf3.toPixelValue(node, this.cs.paddingBottom);
                _cf3.set(node, "padding", "0px");
        }
        this.inherited(arguments);
        }, _layoutChildren: function(_d1f, _d20) {
        if (!this._borderBox || !this._borderBox.h) {
        return;
        }
        var _d21 = [];
                _ced.forEach(this._getOrderedChildren(), function(pane) {
                _d21.push(pane);
                        if (pane._splitterWidget) {
                _d21.push(pane._splitterWidget);
                }
                });
                var dim = {l: this.pe.l, t: this.pe.t, w: this._borderBox.w - this.pe.w, h: this._borderBox.h - this.pe.h};
                _cf9.layoutChildren(this.domNode, dim, _d21, _d1f, _d20);
        }, destroyRecursive: function() {
        _ced.forEach(this.getChildren(), function(_d22) {
        var _d23 = _d22._splitterWidget;
                if (_d23) {
        _d23.destroy();
        }
        delete _d22._splitterWidget;
        });
                this.inherited(arguments);
        }});
        _d12.ChildWidgetProperties = {splitter: false, minSize: 0, maxSize: Infinity};
        lang.mixin(_d12.ChildWidgetProperties, _cf8.ChildWidgetProperties);
        lang.extend(_cf5, _d12.ChildWidgetProperties);
        _d12._Splitter = _cfa;
        _d12._Gutter = _d11;
        return _d12;
});
}, "dijit/layout/LayoutContainer": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-style", "dojo/_base/lang", "../_WidgetBase", "./_LayoutWidget", "./utils"], function(_d24, _d25, _d26, _d27, lang, _d28, _d29, _d2a) {
var _d2b = _d25("dijit.layout.LayoutContainer", _d29, {design: "headline", baseClass: "dijitLayoutContainer", startup: function() {
if (this._started) {
return;
}
_d24.forEach(this.getChildren(), this._setupChild, this);
        this.inherited(arguments);
}, _setupChild: function(_d2c) {
this.inherited(arguments);
        var _d2d = _d2c.region;
        if (_d2d) {
_d26.add(_d2c.domNode, this.baseClass + "Pane");
}
}, _getOrderedChildren: function() {
var _d2e = _d24.map(this.getChildren(), function(_d2f, idx) {
return {pane: _d2f, weight: [_d2f.region == "center" ? Infinity : 0, _d2f.layoutPriority, (this.design == "sidebar" ? 1 : - 1) * (/top|bottom/.test(_d2f.region) ? 1 : - 1), idx]};
}, this);
        _d2e.sort(function(a, b) {
        var aw = a.weight, bw = b.weight;
                for (var i = 0; i < aw.length; i++) {
        if (aw[i] != bw[i]) {
        return aw[i] - bw[i];
        }
        }
        return 0;
        });
        return _d24.map(_d2e, function(w) {
        return w.pane;
        });
}, layout: function() {
_d2a.layoutChildren(this.domNode, this._contentBox, this._getOrderedChildren());
}, addChild: function(_d30, _d31) {
this.inherited(arguments);
        if (this._started) {
this.layout();
}
}, removeChild: function(_d32) {
this.inherited(arguments);
        if (this._started) {
this.layout();
}
_d26.remove(_d32.domNode, this.baseClass + "Pane");
        _d27.set(_d32.domNode, {top: "auto", bottom: "auto", left: "auto", right: "auto", position: "static"});
        _d27.set(_d32.domNode, /top|bottom/.test(_d32.region) ? "width" : "height", "auto");
}});
        _d2b.ChildWidgetProperties = {region: "", layoutAlign: "", layoutPriority: 0};
        lang.extend(_d28, _d2b.ChildWidgetProperties);
        return _d2b;
});
}, "dijit/layout/LinkPane": function() {
define(["./ContentPane", "../_TemplatedMixin", "dojo/_base/declare"], function(_d33, _d34, _d35) {
return _d35("dijit.layout.LinkPane", [_d33, _d34], {templateString: "<div class=\"dijitLinkPane\" data-dojo-attach-point=\"containerNode\"></div>", postMixInProperties: function() {
if (this.srcNodeRef) {
this.title += this.srcNodeRef.innerHTML;
}
this.inherited(arguments);
}, _fillContent: function() {
}});
});
}, "dijit/layout/SplitContainer": function() {
define(["dojo/_base/array", "dojo/cookie", "dojo/_base/declare", "dojo/dom", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/event", "dojo/_base/kernel", "dojo/_base/lang", "dojo/on", "dojo/sniff", "../registry", "../_WidgetBase", "./_LayoutWidget"], function(_d36, _d37, _d38, dom, _d39, _d3a, _d3b, _d3c, _d3d, _d3e, lang, on, has, _d3f, _d40, _d41) {
var _d42 = _d38("dijit.layout.SplitContainer", _d41, {constructor: function() {
_d3e.deprecated("dijit.layout.SplitContainer is deprecated", "use BorderContainer with splitter instead", 2);
}, activeSizing: false, sizerWidth: 7, orientation: "horizontal", persist: true, baseClass: "dijitSplitContainer", postMixInProperties: function() {
this.inherited("postMixInProperties", arguments);
        this.isHorizontal = (this.orientation == "horizontal");
}, postCreate: function() {
this.inherited(arguments);
        this.sizers = [];
        if (has("mozilla")) {
this.domNode.style.overflow = "-moz-scrollbars-none";
}
if (typeof this.sizerWidth == "object") {
try {
this.sizerWidth = parseInt(this.sizerWidth.toString());
} catch (e) {
this.sizerWidth = 7;
}
}
var _d43 = this.ownerDocument.createElement("div");
        this.virtualSizer = _d43;
        _d43.style.position = "relative";
        _d43.style.zIndex = 10;
        _d43.className = this.isHorizontal ? "dijitSplitContainerVirtualSizerH" : "dijitSplitContainerVirtualSizerV";
        this.domNode.appendChild(_d43);
        dom.setSelectable(_d43, false);
}, destroy: function() {
delete this.virtualSizer;
        if (this._ownconnects) {
var h;
        while (h = this._ownconnects.pop()) {
h.remove();
}
}
this.inherited(arguments);
}, startup: function() {
if (this._started) {
return;
}
_d36.forEach(this.getChildren(), function(_d44, i, _d45) {
this._setupChild(_d44);
        if (i < _d45.length - 1) {
this._addSizer();
}
}, this);
        if (this.persist) {
this._restoreState();
}
this.inherited(arguments);
}, _setupChild: function(_d46) {
this.inherited(arguments);
        _d46.domNode.style.position = "absolute";
        _d39.add(_d46.domNode, "dijitSplitPane");
}, _onSizerMouseDown: function(e) {
if (e.target.id) {
for (var i = 0; i < this.sizers.length; i++) {
if (this.sizers[i].id == e.target.id) {
break;
}
}
if (i < this.sizers.length) {
this.beginSizing(e, i);
}
}
}, _addSizer: function(_d47) {
_d47 = _d47 === undefined ? this.sizers.length : _d47;
        var _d48 = this.ownerDocument.createElement("div");
        _d48.id = _d3f.getUniqueId("dijit_layout_SplitterContainer_Splitter");
        this.sizers.splice(_d47, 0, _d48);
        this.domNode.appendChild(_d48);
        _d48.className = this.isHorizontal ? "dijitSplitContainerSizerH" : "dijitSplitContainerSizerV";
        var _d49 = this.ownerDocument.createElement("div");
        _d49.className = "thumb";
        _d48.appendChild(_d49);
        this.connect(_d48, "onmousedown", "_onSizerMouseDown");
        dom.setSelectable(_d48, false);
}, removeChild: function(_d4a) {
if (this.sizers.length) {
var i = _d36.indexOf(this.getChildren(), _d4a);
        if (i != - 1) {
if (i == this.sizers.length) {
i--;
}
_d3a.destroy(this.sizers[i]);
        this.sizers.splice(i, 1);
}
}
this.inherited(arguments);
        if (this._started) {
this.layout();
}
}, addChild: function(_d4b, _d4c) {
if (typeof _d4c == "undefined" || _d4c == "last") {
_d4c = this.getChildren().length;
}
this.inherited(arguments, [_d4b, _d4c]);
        if (this._started) {
var _d4d = this.getChildren();
        if (_d4d.length > 1) {
this._addSizer(_d4c);
}
this.layout();
}
}, layout: function() {
this.paneWidth = this._contentBox.w;
        this.paneHeight = this._contentBox.h;
        var _d4e = this.getChildren();
        if (!_d4e.length) {
return;
}
var _d4f = this.isHorizontal ? this.paneWidth : this.paneHeight;
        if (_d4e.length > 1) {
_d4f -= this.sizerWidth * (_d4e.length - 1);
}
var _d50 = 0;
        _d36.forEach(_d4e, function(_d51) {
        _d50 += _d51.sizeShare;
        });
        var _d52 = _d4f / _d50;
        var _d53 = 0;
        _d36.forEach(_d4e.slice(0, _d4e.length - 1), function(_d54) {
        var size = Math.round(_d52 * _d54.sizeShare);
                _d54.sizeActual = size;
                _d53 += size;
        });
        _d4e[_d4e.length - 1].sizeActual = _d4f - _d53;
        this._checkSizes();
        var pos = 0;
        var size = _d4e[0].sizeActual;
        this._movePanel(_d4e[0], pos, size);
        _d4e[0].position = pos;
        pos += size;
        if (!this.sizers) {
return;
}
_d36.some(_d4e.slice(1), function(_d55, i) {
if (!this.sizers[i]) {
return true;
}
this._moveSlider(this.sizers[i], pos, this.sizerWidth);
        this.sizers[i].position = pos;
        pos += this.sizerWidth;
        size = _d55.sizeActual;
        this._movePanel(_d55, pos, size);
        _d55.position = pos;
        pos += size;
}, this);
}, _movePanel: function(_d56, pos, size) {
var box;
        if (this.isHorizontal) {
_d56.domNode.style.left = pos + "px";
        _d56.domNode.style.top = 0;
        box = {w: size, h: this.paneHeight};
        if (_d56.resize) {
_d56.resize(box);
} else {
_d3b.setMarginBox(_d56.domNode, box);
}
} else {
_d56.domNode.style.left = 0;
        _d56.domNode.style.top = pos + "px";
        box = {w: this.paneWidth, h: size};
        if (_d56.resize) {
_d56.resize(box);
} else {
_d3b.setMarginBox(_d56.domNode, box);
}
}
}, _moveSlider: function(_d57, pos, size) {
if (this.isHorizontal) {
_d57.style.left = pos + "px";
        _d57.style.top = 0;
        _d3b.setMarginBox(_d57, {w: size, h: this.paneHeight});
} else {
_d57.style.left = 0;
        _d57.style.top = pos + "px";
        _d3b.setMarginBox(_d57, {w: this.paneWidth, h: size});
}
}, _growPane: function(_d58, pane) {
if (_d58 > 0) {
if (pane.sizeActual > pane.sizeMin) {
if ((pane.sizeActual - pane.sizeMin) > _d58) {
pane.sizeActual = pane.sizeActual - _d58;
        _d58 = 0;
} else {
_d58 -= pane.sizeActual - pane.sizeMin;
        pane.sizeActual = pane.sizeMin;
}
}
}
return _d58;
}, _checkSizes: function() {
var _d59 = 0;
        var _d5a = 0;
        var _d5b = this.getChildren();
        _d36.forEach(_d5b, function(_d5c) {
        _d5a += _d5c.sizeActual;
                _d59 += _d5c.sizeMin;
        });
        if (_d59 <= _d5a) {
var _d5d = 0;
        _d36.forEach(_d5b, function(_d5e) {
        if (_d5e.sizeActual < _d5e.sizeMin) {
        _d5d += _d5e.sizeMin - _d5e.sizeActual;
                _d5e.sizeActual = _d5e.sizeMin;
        }
        });
        if (_d5d > 0) {
var list = this.isDraggingLeft ? _d5b.reverse() : _d5b;
        _d36.forEach(list, function(_d5f) {
        _d5d = this._growPane(_d5d, _d5f);
        }, this);
}
} else {
_d36.forEach(_d5b, function(_d60) {
_d60.sizeActual = Math.round(_d5a * (_d60.sizeMin / _d59));
});
}
}, beginSizing: function(e, i) {
var _d61 = this.getChildren();
        this.paneBefore = _d61[i];
        this.paneAfter = _d61[i + 1];
        this.paneBefore.sizeBeforeDrag = this.paneBefore.sizeActual;
        this.paneAfter.sizeBeforeDrag = this.paneAfter.sizeActual;
        this.paneAfter.positionBeforeDrag = this.paneAfter.position;
        this.isSizing = true;
        this.sizingSplitter = this.sizers[i];
        this.sizingSplitter.positionBeforeDrag = _d3c.get(this.sizingSplitter, (this.isHorizontal ? "left" : "top"));
        if (!this.cover) {
this.cover = _d3a.create("div", {style: {position: "absolute", zIndex: 5, top: 0, left: 0, width: "100%", height: "100%"}}, this.domNode);
} else {
this.cover.style.zIndex = 5;
}
this.sizingSplitter.style.zIndex = 6;
        this.startPoint = this.lastPoint = (this.isHorizontal ? e.pageX : e.pageY);
        this.maxDelta = this.paneAfter.sizeActual - this.paneAfter.sizeMin;
        this.minDelta = - 1 * (this.paneBefore.sizeActual - this.paneBefore.sizeMin);
        if (!this.activeSizing) {
this._showSizingLine();
}
this._ownconnects = [on(this.ownerDocument.documentElement, "mousemove", lang.hitch(this, "changeSizing")), on(this.ownerDocument.documentElement, "mouseup", lang.hitch(this, "endSizing"))];
        _d3d.stop(e);
}, changeSizing: function(e) {
if (!this.isSizing) {
return;
}
this.lastPoint = this.isHorizontal ? e.pageX : e.pageY;
        var _d62 = Math.max(Math.min(this.lastPoint - this.startPoint, this.maxDelta), this.minDelta);
        if (this.activeSizing) {
this._updateSize(_d62);
} else {
this._moveSizingLine(_d62);
}
_d3d.stop(e);
}, endSizing: function() {
if (!this.isSizing) {
return;
}
if (this.cover) {
this.cover.style.zIndex = - 1;
}
if (!this.activeSizing) {
this._hideSizingLine();
}
var _d63 = Math.max(Math.min(this.lastPoint - this.startPoint, this.maxDelta), this.minDelta);
        this._updateSize(_d63);
        this.isSizing = false;
        if (this.persist) {
this._saveState(this);
}
var h;
        while (h = this._ownconnects.pop()) {
h.remove();
}
}, _updateSize: function(_d64) {
this.paneBefore.sizeActual = this.paneBefore.sizeBeforeDrag + _d64;
        this.paneAfter.position = this.paneAfter.positionBeforeDrag + _d64;
        this.paneAfter.sizeActual = this.paneAfter.sizeBeforeDrag - _d64;
        _d36.forEach(this.getChildren(), function(_d65) {
        _d65.sizeShare = _d65.sizeActual;
        });
        if (this._started) {
this.layout();
}
}, _showSizingLine: function() {
this._moveSizingLine(0);
        _d3b.setMarginBox(this.virtualSizer, this.isHorizontal ? {w: this.sizerWidth, h: this.paneHeight} : {w: this.paneWidth, h: this.sizerWidth});
        this.virtualSizer.style.display = "block";
}, _hideSizingLine: function() {
this.virtualSizer.style.display = "none";
}, _moveSizingLine: function(_d66) {
var pos = _d66 + this.sizingSplitter.positionBeforeDrag;
        _d3c.set(this.virtualSizer, (this.isHorizontal ? "left" : "top"), pos + "px");
}, _getCookieName: function(i) {
return this.id + "_" + i;
}, _restoreState: function() {
_d36.forEach(this.getChildren(), function(_d67, i) {
var _d68 = this._getCookieName(i);
        var _d69 = _d37(_d68);
        if (_d69) {
var pos = parseInt(_d69);
        if (typeof pos == "number") {
_d67.sizeShare = pos;
}
}
}, this);
}, _saveState: function() {
if (!this.persist) {
return;
}
_d36.forEach(this.getChildren(), function(_d6a, i) {
_d37(this._getCookieName(i), _d6a.sizeShare, {expires: 365});
}, this);
}});
        _d42.ChildWidgetProperties = {sizeMin: 10, sizeShare: 10};
        lang.extend(_d40, _d42.ChildWidgetProperties);
        return _d42;
});
}, "dijit/layout/TabContainer": function() {
define(["dojo/_base/lang", "dojo/_base/declare", "./_TabContainerBase", "./TabController", "./ScrollingTabController"], function(lang, _d6b, _d6c, _d6d, _d6e) {
return _d6b("dijit.layout.TabContainer", _d6c, {useMenu: true, useSlider: true, controllerWidget: "", _makeController: function(_d6f) {
var cls = this.baseClass + "-tabs" + (this.doLayout ? "" : " dijitTabNoLayout"), _d6d = typeof this.controllerWidget == "string" ? lang.getObject(this.controllerWidget) : this.controllerWidget;
        return new _d6d({id: this.id + "_tablist", ownerDocument: this.ownerDocument, dir: this.dir, lang: this.lang, textDir: this.textDir, tabPosition: this.tabPosition, doLayout: this.doLayout, containerId: this.id, "class": cls, nested: this.nested, useMenu: this.useMenu, useSlider: this.useSlider, tabStripClass: this.tabStrip ? this.baseClass + (this.tabStrip ? "" : "No") + "Strip" : null}, _d6f);
}, postMixInProperties: function() {
this.inherited(arguments);
        if (!this.controllerWidget) {
this.controllerWidget = (this.tabPosition == "top" || this.tabPosition == "bottom") && !this.nested ? _d6e : _d6d;
}
}});
});
}, "dijit/layout/_TabContainerBase": function() {
define(["dojo/text!./templates/TabContainer.html", "./StackContainer", "./utils", "../_TemplatedMixin", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style"], function(_d70, _d71, _d72, _d73, _d74, _d75, _d76, _d77) {
return _d74("dijit.layout._TabContainerBase", [_d71, _d73], {tabPosition: "top", baseClass: "dijitTabContainer", tabStrip: false, nested: false, templateString: _d70, postMixInProperties: function() {
this.baseClass += this.tabPosition.charAt(0).toUpperCase() + this.tabPosition.substr(1).replace(/-.*/, "");
        this.srcNodeRef && _d77.set(this.srcNodeRef, "visibility", "hidden");
        this.inherited(arguments);
}, buildRendering: function() {
this.inherited(arguments);
        this.tablist = this._makeController(this.tablistNode);
        if (!this.doLayout) {
_d75.add(this.domNode, "dijitTabContainerNoLayout");
}
if (this.nested) {
_d75.add(this.domNode, "dijitTabContainerNested");
        _d75.add(this.tablist.containerNode, "dijitTabContainerTabListNested");
        _d75.add(this.tablistSpacer, "dijitTabContainerSpacerNested");
        _d75.add(this.containerNode, "dijitTabPaneWrapperNested");
} else {
_d75.add(this.domNode, "tabStrip-" + (this.tabStrip ? "enabled" : "disabled"));
}
}, _setupChild: function(tab) {
_d75.add(tab.domNode, "dijitTabPane");
        this.inherited(arguments);
}, startup: function() {
if (this._started) {
return;
}
this.tablist.startup();
        this.inherited(arguments);
}, layout: function() {
if (!this._contentBox || typeof (this._contentBox.l) == "undefined") {
return;
}
var sc = this.selectedChildWidget;
        if (this.doLayout) {
var _d78 = this.tabPosition.replace(/-h/, "");
        this.tablist.region = _d78;
        var _d79 = [this.tablist, {domNode: this.tablistSpacer, region: _d78}, {domNode: this.containerNode, region: "center"}];
        _d72.layoutChildren(this.domNode, this._contentBox, _d79);
        this._containerContentBox = _d72.marginBox2contentBox(this.containerNode, _d79[2]);
        if (sc && sc.resize) {
sc.resize(this._containerContentBox);
}
} else {
if (this.tablist.resize) {
var s = this.tablist.domNode.style;
        s.width = "0";
        var _d7a = _d76.getContentBox(this.domNode).w;
        s.width = "";
        this.tablist.resize({w: _d7a});
}
if (sc && sc.resize) {
sc.resize();
}
}
}, destroy: function(_d7b) {
if (this.tablist) {
this.tablist.destroy(_d7b);
}
this.inherited(arguments);
}});
});
}, "dijit/layout/TabController": function() {
define(["dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/has", "dojo/i18n", "dojo/_base/lang", "./StackController", "../registry", "../Menu", "../MenuItem", "dojo/text!./templates/_TabButton.html", "dojo/i18n!../nls/common"], function(_d7c, dom, _d7d, _d7e, has, i18n, lang, _d7f, _d80, Menu, _d81, _d82) {
var _d83 = _d7c("dijit.layout._TabButton" + (has("dojo-bidi") ? "_NoBidi" : ""), _d7f.StackButton, {baseClass: "dijitTab", cssStateNodes: {closeNode: "dijitTabCloseButton"}, templateString: _d82, _setNameAttr: "focusNode", scrollOnFocus: false, buildRendering: function() {
this.inherited(arguments);
        dom.setSelectable(this.containerNode, false);
}, startup: function() {
this.inherited(arguments);
        var n = this.domNode;
        this.defer(function() {
        n.className = n.className;
        }, 1);
}, _setCloseButtonAttr: function(disp) {
this._set("closeButton", disp);
        _d7e.toggle(this.domNode, "dijitClosable", disp);
        this.closeNode.style.display = disp ? "" : "none";
        if (disp) {
var _d84 = i18n.getLocalization("dijit", "common");
        if (this.closeNode) {
_d7d.set(this.closeNode, "title", _d84.itemClose);
}
}
}, _setDisabledAttr: function(_d85) {
this.inherited(arguments);
        if (this.closeNode) {
if (_d85) {
_d7d.remove(this.closeNode, "title");
} else {
var _d86 = i18n.getLocalization("dijit", "common");
        _d7d.set(this.closeNode, "title", _d86.itemClose);
}
}
}, _setLabelAttr: function(_d87) {
this.inherited(arguments);
        if (!this.showLabel && !this.params.title) {
this.iconNode.alt = lang.trim(this.containerNode.innerText || this.containerNode.textContent || "");
}
}});
        if (has("dojo-bidi")) {
_d83 = _d7c("dijit.layout._TabButton", _d83, {_setLabelAttr: function(_d88) {
this.inherited(arguments);
        this.applyTextDir(this.iconNode, this.iconNode.alt);
}});
}
var _d89 = _d7c("dijit.layout.TabController", _d7f, {baseClass: "dijitTabController", templateString: "<div role='tablist' data-dojo-attach-event='onkeydown:onkeydown'></div>", tabPosition: "top", buttonWidget: _d83, buttonWidgetCloseClass: "dijitTabCloseButton", postCreate: function() {
this.inherited(arguments);
        var _d8a = new Menu({id: this.id + "_Menu", ownerDocument: this.ownerDocument, dir: this.dir, lang: this.lang, textDir: this.textDir, targetNodeIds: [this.domNode], selector: function(node) {
        return _d7e.contains(node, "dijitClosable") && !_d7e.contains(node, "dijitTabDisabled");
        }});
        this.own(_d8a);
        var _d8b = i18n.getLocalization("dijit", "common"), _d8c = this;
        _d8a.addChild(new _d81({label: _d8b.itemClose, ownerDocument: this.ownerDocument, dir: this.dir, lang: this.lang, textDir: this.textDir, onClick: function(evt) {
        var _d8d = _d80.byNode(this.getParent().currentTarget);
                _d8c.onCloseButtonClick(_d8d.page);
        }}));
}});
        _d89.TabButton = _d83;
        return _d89;
});
}, "dijit/layout/StackController": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-construct", "dojo/keys", "dojo/_base/lang", "dojo/on", "dojo/topic", "../focus", "../registry", "../_Widget", "../_TemplatedMixin", "../_Container", "../form/ToggleButton", "dojo/touch"], function(_d8e, _d8f, _d90, _d91, keys, lang, on, _d92, _d93, _d94, _d95, _d96, _d97, _d98) {
var _d99 = _d8f("dijit.layout._StackButton", _d98, {tabIndex: "-1", closeButton: false, _aria_attr: "aria-selected", buildRendering: function(evt) {
this.inherited(arguments);
        (this.focusNode || this.domNode).setAttribute("role", "tab");
}});
        var _d9a = _d8f("dijit.layout.StackController", [_d95, _d96, _d97], {baseClass: "dijitStackController", templateString: "<span role='tablist' data-dojo-attach-event='onkeydown'></span>", containerId: "", buttonWidget: _d99, buttonWidgetCloseClass: "dijitStackCloseButton", pane2button: function(id) {
        return _d94.byId(this.id + "_" + id);
        }, postCreate: function() {
        this.inherited(arguments);
                this.own(_d92.subscribe(this.containerId + "-startup", lang.hitch(this, "onStartup")), _d92.subscribe(this.containerId + "-addChild", lang.hitch(this, "onAddChild")), _d92.subscribe(this.containerId + "-removeChild", lang.hitch(this, "onRemoveChild")), _d92.subscribe(this.containerId + "-selectChild", lang.hitch(this, "onSelectChild")), _d92.subscribe(this.containerId + "-containerKeyDown", lang.hitch(this, "onContainerKeyDown")));
                this.containerNode.dojoClick = true;
                this.own(on(this.containerNode, "click", lang.hitch(this, function(evt) {
                var _d9b = _d94.getEnclosingWidget(evt.target);
                        if (_d9b != this.containerNode && !_d9b.disabled && _d9b.page) {
                for (var _d9c = evt.target; _d9c !== this.containerNode; _d9c = _d9c.parentNode) {
                if (_d90.contains(_d9c, this.buttonWidgetCloseClass)) {
                this.onCloseButtonClick(_d9b.page);
                        break;
                } else {
                if (_d9c == _d9b.domNode) {
                this.onButtonClick(_d9b.page);
                        break;
                }
                }
                }
                }
                })));
        }, onStartup: function(info) {
        this.textDir = info.textDir;
                _d8e.forEach(info.children, this.onAddChild, this);
                if (info.selected) {
        this.onSelectChild(info.selected);
        }
        var _d9d = _d94.byId(this.containerId).containerNode, _d9e = lang.hitch(this, "pane2button"), _d9f = {"title": "label", "showtitle": "showLabel", "iconclass": "iconClass", "closable": "closeButton", "tooltip": "title", "disabled": "disabled", "textdir": "textdir"}, _da0 = function(attr, _da1) {
        return on(_d9d, "attrmodified-" + attr, function(evt) {
        var _da2 = _d9e(evt.detail && evt.detail.widget && evt.detail.widget.id);
                if (_da2) {
        _da2.set(_da1, evt.detail.newValue);
        }
        });
        };
                for (var attr in _d9f) {
        this.own(_da0(attr, _d9f[attr]));
        }
        }, destroy: function(_da3) {
        this.destroyDescendants(_da3);
                this.inherited(arguments);
        }, onAddChild: function(page, _da4) {
        var Cls = lang.isString(this.buttonWidget) ? lang.getObject(this.buttonWidget) : this.buttonWidget;
                var _da5 = new Cls({id: this.id + "_" + page.id, name: this.id + "_" + page.id, label: page.title, disabled: page.disabled, ownerDocument: this.ownerDocument, dir: page.dir, lang: page.lang, textDir: page.textDir || this.textDir, showLabel: page.showTitle, iconClass: page.iconClass, closeButton: page.closable, title: page.tooltip, page: page});
                this.addChild(_da5, _da4);
                page.controlButton = _da5;
                if (!this._currentChild) {
        this.onSelectChild(page);
        }
        var _da6 = page._wrapper.getAttribute("aria-labelledby") ? page._wrapper.getAttribute("aria-labelledby") + " " + _da5.id : _da5.id;
                page._wrapper.removeAttribute("aria-label");
                page._wrapper.setAttribute("aria-labelledby", _da6);
        }, onRemoveChild: function(page) {
        if (this._currentChild === page) {
        this._currentChild = null;
        }
        var _da7 = this.pane2button(page.id);
                if (_da7) {
        this.removeChild(_da7);
                _da7.destroy();
        }
        delete page.controlButton;
        }, onSelectChild: function(page) {
        if (!page) {
        return;
        }
        if (this._currentChild) {
        var _da8 = this.pane2button(this._currentChild.id);
                _da8.set("checked", false);
                _da8.focusNode.setAttribute("tabIndex", "-1");
        }
        var _da9 = this.pane2button(page.id);
                _da9.set("checked", true);
                this._currentChild = page;
                _da9.focusNode.setAttribute("tabIndex", "0");
                var _daa = _d94.byId(this.containerId);
        }, onButtonClick: function(page) {
        var _dab = this.pane2button(page.id);
                _d93.focus(_dab.focusNode);
                if (this._currentChild && this._currentChild.id === page.id) {
        _dab.set("checked", true);
        }
        var _dac = _d94.byId(this.containerId);
                _dac.selectChild(page);
        }, onCloseButtonClick: function(page) {
        var _dad = _d94.byId(this.containerId);
                _dad.closeChild(page);
                if (this._currentChild) {
        var b = this.pane2button(this._currentChild.id);
                if (b) {
        _d93.focus(b.focusNode || b.domNode);
        }
        }
        }, adjacent: function(_dae) {
        if (!this.isLeftToRight() && (!this.tabPosition || /top|bottom/.test(this.tabPosition))) {
        _dae = !_dae;
        }
        var _daf = this.getChildren();
                var idx = _d8e.indexOf(_daf, this.pane2button(this._currentChild.id)), _db0 = _daf[idx];
                var _db1;
                do {
                idx = (idx + (_dae ? 1 : _daf.length - 1)) % _daf.length;
                        _db1 = _daf[idx];
                } while (_db1.disabled && _db1 != _db0);
                return _db1;
        }, onkeydown: function(e, _db2) {
        if (this.disabled || e.altKey) {
        return;
        }
        var _db3 = null;
                if (e.ctrlKey || !e._djpage) {
        switch (e.keyCode) {
        case keys.LEFT_ARROW:
                case keys.UP_ARROW:
                if (!e._djpage) {
        _db3 = false;
        }
        break;
                case keys.PAGE_UP:
                if (e.ctrlKey) {
        _db3 = false;
        }
        break;
                case keys.RIGHT_ARROW:
                case keys.DOWN_ARROW:
                if (!e._djpage) {
        _db3 = true;
        }
        break;
                case keys.PAGE_DOWN:
                if (e.ctrlKey) {
        _db3 = true;
        }
        break;
                case keys.HOME:
                var _db4 = this.getChildren();
                for (var idx = 0; idx < _db4.length; idx++) {
        var _db5 = _db4[idx];
                if (!_db5.disabled) {
        this.onButtonClick(_db5.page);
                break;
        }
        }
        e.stopPropagation();
                e.preventDefault();
                break;
                case keys.END:
                var _db4 = this.getChildren();
                for (var idx = _db4.length - 1; idx >= 0; idx--) {
        var _db5 = _db4[idx];
                if (!_db5.disabled) {
        this.onButtonClick(_db5.page);
                break;
        }
        }
        e.stopPropagation();
                e.preventDefault();
                break;
                case keys.DELETE:
                case "W".charCodeAt(0):
                if (this._currentChild.closable && (e.keyCode == keys.DELETE || e.ctrlKey)) {
        this.onCloseButtonClick(this._currentChild);
        }
        e.stopPropagation();
                e.preventDefault();
                break;
                case keys.TAB:
                if (e.ctrlKey) {
        this.onButtonClick(this.adjacent(!e.shiftKey).page);
                e.stopPropagation();
                e.preventDefault();
        }
        break;
        }
        if (_db3 !== null) {
        this.onButtonClick(this.adjacent(_db3).page);
                e.stopPropagation();
                e.preventDefault();
        }
        }
        }, onContainerKeyDown: function(info) {
        info.e._djpage = info.page;
                this.onkeydown(info.e);
        }});
        _d9a.StackButton = _d99;
        return _d9a;
});
}, "dijit/layout/ScrollingTabController": function() {
define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/fx", "dojo/_base/lang", "dojo/on", "dojo/query", "dojo/sniff", "../registry", "dojo/text!./templates/ScrollingTabController.html", "dojo/text!./templates/_ScrollingTabControllerButton.html", "./TabController", "./utils", "../_WidgetsInTemplateMixin", "../Menu", "../MenuItem", "../form/Button", "../_HasDropDown", "dojo/NodeList-dom", "../a11yclick"], function(_db6, _db7, _db8, _db9, _dba, fx, lang, on, _dbb, has, _dbc, _dbd, _dbe, _dbf, _dc0, _dc1, Menu, _dc2, _dc3, _dc4) {
var _dc5 = _db7("dijit.layout.ScrollingTabController", [_dbf, _dc1], {baseClass: "dijitTabController dijitScrollingTabController", templateString: _dbd, useMenu: true, useSlider: true, tabStripClass: "", _minScroll: 5, _setClassAttr: {node: "containerNode", type: "class"}, buildRendering: function() {
this.inherited(arguments);
        var n = this.domNode;
        this.scrollNode = this.tablistWrapper;
        this._initButtons();
        if (!this.tabStripClass) {
this.tabStripClass = "dijitTabContainer" + this.tabPosition.charAt(0).toUpperCase() + this.tabPosition.substr(1).replace(/-.*/, "") + "None";
        _db8.add(n, "tabStrip-disabled");
}
_db8.add(this.tablistWrapper, this.tabStripClass);
}, onStartup: function() {
this.inherited(arguments);
        _dba.set(this.domNode, "visibility", "");
        this._postStartup = true;
        this.own(on(this.containerNode, "attrmodified-label, attrmodified-iconclass", lang.hitch(this, function(evt) {
        if (this._dim) {
        this.resize(this._dim);
        }
        })));
}, onAddChild: function(page, _dc6) {
this.inherited(arguments);
        _dba.set(this.containerNode, "width", (_dba.get(this.containerNode, "width") + 200) + "px");
}, onRemoveChild: function(page, _dc7) {
var _dc8 = this.pane2button(page.id);
        if (this._selectedTab === _dc8.domNode) {
this._selectedTab = null;
}
this.inherited(arguments);
}, _initButtons: function() {
this._btnWidth = 0;
        this._buttons = _dbb("> .tabStripButton", this.domNode).filter(function(btn) {
if ((this.useMenu && btn == this._menuBtn.domNode) || (this.useSlider && (btn == this._rightBtn.domNode || btn == this._leftBtn.domNode))) {
this._btnWidth += _db9.getMarginSize(btn).w;
        return true;
} else {
_dba.set(btn, "display", "none");
        return false;
}
}, this);
}, _getTabsWidth: function() {
var _dc9 = this.getChildren();
        if (_dc9.length) {
var _dca = _dc9[this.isLeftToRight() ? 0 : _dc9.length - 1].domNode, _dcb = _dc9[this.isLeftToRight() ? _dc9.length - 1 : 0].domNode;
        return _dcb.offsetLeft + _dcb.offsetWidth - _dca.offsetLeft;
} else {
return 0;
}
}, _enableBtn: function(_dcc) {
var _dcd = this._getTabsWidth();
        _dcc = _dcc || _dba.get(this.scrollNode, "width");
        return _dcd > 0 && _dcc < _dcd;
}, resize: function(dim) {
this._dim = dim;
        this.scrollNode.style.height = "auto";
        var cb = this._contentBox = _dc0.marginBox2contentBox(this.domNode, {h: 0, w: dim.w});
        cb.h = this.scrollNode.offsetHeight;
        _db9.setContentSize(this.domNode, cb);
        var _dce = this._enableBtn(this._contentBox.w);
        this._buttons.style("display", _dce ? "" : "none");
        this._leftBtn.region = "left";
        this._rightBtn.region = "right";
        this._menuBtn.region = this.isLeftToRight() ? "right" : "left";
        _dc0.layoutChildren(this.domNode, this._contentBox, [this._menuBtn, this._leftBtn, this._rightBtn, {domNode: this.scrollNode, region: "center"}]);
        if (this._selectedTab) {
if (this._anim && this._anim.status() == "playing") {
this._anim.stop();
}
this.scrollNode.scrollLeft = this._convertToScrollLeft(this._getScrollForSelectedTab());
}
this._setButtonClass(this._getScroll());
        this._postResize = true;
        return {h: this._contentBox.h, w: dim.w};
}, _getScroll: function() {
return (this.isLeftToRight() || has("ie") < 8 || (has("ie") && has("quirks")) || has("webkit")) ? this.scrollNode.scrollLeft : _dba.get(this.containerNode, "width") - _dba.get(this.scrollNode, "width") + (has("ie") >= 8 ? - 1 : 1) * this.scrollNode.scrollLeft;
}, _convertToScrollLeft: function(val) {
if (this.isLeftToRight() || has("ie") < 8 || (has("ie") && has("quirks")) || has("webkit")) {
return val;
} else {
var _dcf = _dba.get(this.containerNode, "width") - _dba.get(this.scrollNode, "width");
        return (has("ie") >= 8 ? - 1 : 1) * (val - _dcf);
}
}, onSelectChild: function(page) {
var tab = this.pane2button(page.id);
        if (!tab) {
return;
}
var node = tab.domNode;
        if (node != this._selectedTab) {
this._selectedTab = node;
        if (this._postResize) {
var sl = this._getScroll();
        if (sl > node.offsetLeft || sl + _dba.get(this.scrollNode, "width") < node.offsetLeft + _dba.get(node, "width")) {
this.createSmoothScroll().play();
}
}
}
this.inherited(arguments);
}, _getScrollBounds: function() {
var _dd0 = this.getChildren(), _dd1 = _dba.get(this.scrollNode, "width"), _dd2 = _dba.get(this.containerNode, "width"), _dd3 = _dd2 - _dd1, _dd4 = this._getTabsWidth();
        if (_dd0.length && _dd4 > _dd1) {
return {min: this.isLeftToRight() ? 0 : _dd0[_dd0.length - 1].domNode.offsetLeft, max: this.isLeftToRight() ? (_dd0[_dd0.length - 1].domNode.offsetLeft + _dd0[_dd0.length - 1].domNode.offsetWidth) - _dd1 : _dd3};
} else {
var _dd5 = this.isLeftToRight() ? 0 : _dd3;
        return {min: _dd5, max: _dd5};
}
}, _getScrollForSelectedTab: function() {
var w = this.scrollNode, n = this._selectedTab, _dd6 = _dba.get(this.scrollNode, "width"), _dd7 = this._getScrollBounds();
        var pos = (n.offsetLeft + _dba.get(n, "width") / 2) - _dd6 / 2;
        pos = Math.min(Math.max(pos, _dd7.min), _dd7.max);
        return pos;
}, createSmoothScroll: function(x) {
if (arguments.length > 0) {
var _dd8 = this._getScrollBounds();
        x = Math.min(Math.max(x, _dd8.min), _dd8.max);
} else {
x = this._getScrollForSelectedTab();
}
if (this._anim && this._anim.status() == "playing") {
this._anim.stop();
}
var self = this, w = this.scrollNode, anim = new fx.Animation({beforeBegin: function() {
if (this.curve) {
delete this.curve;
}
var oldS = w.scrollLeft, newS = self._convertToScrollLeft(x);
        anim.curve = new fx._Line(oldS, newS);
}, onAnimate: function(val) {
w.scrollLeft = val;
}});
        this._anim = anim;
        this._setButtonClass(x);
        return anim;
}, _getBtnNode: function(e) {
var n = e.target;
        while (n && !_db8.contains(n, "tabStripButton")) {
n = n.parentNode;
}
return n;
}, doSlideRight: function(e) {
this.doSlide(1, this._getBtnNode(e));
}, doSlideLeft: function(e) {
this.doSlide( - 1, this._getBtnNode(e));
}, doSlide: function(_dd9, node) {
if (node && _db8.contains(node, "dijitTabDisabled")) {
return;
}
var _dda = _dba.get(this.scrollNode, "width");
        var d = (_dda * 0.75) * _dd9;
        var to = this._getScroll() + d;
        this._setButtonClass(to);
        this.createSmoothScroll(to).play();
}, _setButtonClass: function(_ddb) {
var _ddc = this._getScrollBounds();
        this._leftBtn.set("disabled", _ddb <= _ddc.min);
        this._rightBtn.set("disabled", _ddb >= _ddc.max);
}});
        var _ddd = _db7("dijit.layout._ScrollingTabControllerButtonMixin", null, {baseClass: "dijitTab tabStripButton", templateString: _dbe, tabIndex: "", isFocusable: function() {
        return false;
        }});
        _db7("dijit.layout._ScrollingTabControllerButton", [_dc3, _ddd]);
        _db7("dijit.layout._ScrollingTabControllerMenuButton", [_dc3, _dc4, _ddd], {containerId: "", tabIndex: "-1", isLoaded: function() {
        return false;
        }, loadDropDown: function(_dde) {
        this.dropDown = new Menu({id: this.containerId + "_menu", ownerDocument: this.ownerDocument, dir: this.dir, lang: this.lang, textDir: this.textDir});
                var _ddf = _dbc.byId(this.containerId);
                _db6.forEach(_ddf.getChildren(), function(page) {
                var _de0 = new _dc2({id: page.id + "_stcMi", label: page.title, iconClass: page.iconClass, disabled: page.disabled, ownerDocument: this.ownerDocument, dir: page.dir, lang: page.lang, textDir: page.textDir || _ddf.textDir, onClick: function() {
                _ddf.selectChild(page);
                }});
                        this.dropDown.addChild(_de0);
                }, this);
                _dde();
        }, closeDropDown: function(_de1) {
        this.inherited(arguments);
                if (this.dropDown) {
        this._popupStateNode.removeAttribute("aria-owns");
                this.dropDown.destroyRecursive();
                delete this.dropDown;
        }
        }});
        return _dc5;
});
}, "url:dijit/templates/MenuItem.html": "<tr class=\"dijitReset\" data-dojo-attach-point=\"focusNode\" role=\"menuitem\" tabIndex=\"-1\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitMenuItemIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,textDirNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">\n\t\t<span data-dojo-attach-point=\"arrowWrapper\" style=\"visibility: hidden\">\n\t\t\t<span class=\"dijitInline dijitIcon dijitMenuExpand\"></span>\n\t\t\t<span class=\"dijitMenuExpandA11y\">+</span>\n\t\t</span>\n\t</td>\n</tr>\n", "url:dijit/templates/ColorPalette.html": "<div class=\"dijitInline dijitColorPalette\" role=\"grid\">\n\t<table data-dojo-attach-point=\"paletteTableNode\" class=\"dijitPaletteTable\" cellSpacing=\"0\" cellPadding=\"0\" role=\"presentation\">\n\t\t<tbody data-dojo-attach-point=\"gridNode\"></tbody>\n\t</table>\n</div>\n", "url:dijit/templates/Dialog.html": "<div class=\"dijitDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\">\n\t<div data-dojo-attach-point=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t\t<span data-dojo-attach-point=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"\n\t\t\t\trole=\"heading\" level=\"1\"></span>\n\t\t<span data-dojo-attach-point=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" data-dojo-attach-event=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabindex=\"0\">\n\t\t\t<span data-dojo-attach-point=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t\t</span>\n\t</div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitDialogPaneContent\"></div>\n</div>\n", "url:dijit/templates/TooltipDialog.html": "<div role=\"alertdialog\" tabIndex=\"-1\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class=\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector\" role=\"presentation\" data-dojo-attach-point=\"connectorNode\"></div>\n</div>\n", "url:dijit/form/templates/Button.html": "<span class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><span class=\"dijitReset dijitInline dijitButtonNode\"\n\t\tdata-dojo-attach-event=\"ondijitclick:__onClick\" role=\"presentation\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode,focusNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span class=\"dijitReset dijitToggleButtonIconChar\">&#x25CF;</span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t></span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\"\n\t\tdata-dojo-attach-event=\"onclick:_onClick\"\n\t\ttabIndex=\"-1\" role=\"presentation\" data-dojo-attach-point=\"valueNode\"\n/></span>\n", "url:dijit/form/templates/TextBox.html": "<div class=\"dijit dijitReset dijitInline dijitLeft\" id=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n", "url:dijit/templates/Tooltip.html": "<div class=\"dijitTooltip dijitTooltipLeft\" id=\"dojoTooltip\"\n\t><div class=\"dijitTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n\t><div class=\"dijitTooltipContainer dijitTooltipContents\" data-dojo-attach-point=\"containerNode\" role='alert'></div\n></div>\n", "url:dijit/form/templates/ValidationTextBox.html": "<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class=\"dijitReset dijitInputInner\" data-dojo-attach-point='textbox,focusNode' autocomplete=\"off\"\n\t\t\t${!nameAttrSetting} type='${type}'\n\t/></div\n></div>\n", "url:dijit/form/templates/DropDownBox.html": "<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\"\n\trole=\"combobox\"\n\taria-haspopup=\"true\"\n\tdata-dojo-attach-point=\"_popupStateNode\"\n\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer'\n\t\tdata-dojo-attach-point=\"_buttonNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"button presentation\" aria-hidden=\"true\"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\"\n\t\t\tdata-dojo-attach-point=\"textbox,focusNode\" role=\"textbox\"\n\t/></div\n></div>\n", "url:dijit/form/templates/DropDownButton.html": "<span class=\"dijit dijitReset dijitInline\"\n\t><span class='dijitReset dijitInline dijitButtonNode'\n\t\tdata-dojo-attach-event=\"ondijitclick:__onClick\" data-dojo-attach-point=\"_buttonNode\"\n\t\t><span class=\"dijitReset dijitStretch dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"focusNode,titleNode,_arrowWrapperNode,_popupStateNode\"\n\t\t\trole=\"button\" aria-haspopup=\"true\" aria-labelledby=\"${id}_label\"\n\t\t\t><span class=\"dijitReset dijitInline dijitIcon\"\n\t\t\t\tdata-dojo-attach-point=\"iconNode\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\"\n\t\t\t\tdata-dojo-attach-point=\"containerNode\"\n\t\t\t\tid=\"${id}_label\"\n\t\t\t></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonInner\"></span\n\t\t\t><span class=\"dijitReset dijitInline dijitArrowButtonChar\">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" class=\"dijitOffScreen\" tabIndex=\"-1\"\n\t\tdata-dojo-attach-event=\"onclick:_onClick\"\n\t\tdata-dojo-attach-point=\"valueNode\" role=\"presentation\"\n/></span>\n", "url:dijit/templates/Menu.html": "<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\"\n\t   cellspacing=\"0\">\n\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"containerNode\"></tbody>\n</table>\n", "url:dijit/templates/CheckedMenuItem.html": "<tr class=\"dijitReset\" data-dojo-attach-point=\"focusNode\" role=\"${role}\" tabIndex=\"-1\" aria-checked=\"${checked}\">\n\t<td class=\"dijitReset dijitMenuItemIconCell\" role=\"presentation\">\n\t\t<span class=\"dijitInline dijitIcon dijitMenuItemIcon dijitCheckedMenuItemIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t\t<span class=\"dijitMenuItemIconChar dijitCheckedMenuItemIconChar\">${checkedChar}</span>\n\t</td>\n\t<td class=\"dijitReset dijitMenuItemLabel\" colspan=\"2\" data-dojo-attach-point=\"containerNode,labelNode,textDirNode\"></td>\n\t<td class=\"dijitReset dijitMenuItemAccelKey\" style=\"display: none\" data-dojo-attach-point=\"accelKeyNode\"></td>\n\t<td class=\"dijitReset dijitMenuArrowCell\" role=\"presentation\">&#160;</td>\n</tr>\n", "url:dijit/templates/MenuBar.html": "<div class=\"dijitMenuBar dijitMenuPassive\" data-dojo-attach-point=\"containerNode\" role=\"menubar\" tabIndex=\"${tabIndex}\"\n\t ></div>\n", "url:dijit/templates/MenuBarItem.html": "<div class=\"dijitReset dijitInline dijitMenuItem dijitMenuItemLabel\" data-dojo-attach-point=\"focusNode\"\n\t \trole=\"menuitem\" tabIndex=\"-1\">\n\t<span data-dojo-attach-point=\"containerNode,textDirNode\"></span>\n</div>\n", "url:dijit/templates/MenuSeparator.html": "<tr class=\"dijitMenuSeparator\" role=\"separator\">\n\t<td class=\"dijitMenuSeparatorIconCell\">\n\t\t<div class=\"dijitMenuSeparatorTop\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n\t<td colspan=\"3\" class=\"dijitMenuSeparatorLabelCell\">\n\t\t<div class=\"dijitMenuSeparatorTop dijitMenuSeparatorLabel\"></div>\n\t\t<div class=\"dijitMenuSeparatorBottom\"></div>\n\t</td>\n</tr>\n", "url:dijit/templates/ProgressBar.html": "<div class=\"dijitProgressBar dijitProgressBarEmpty\" role=\"progressbar\"\n\t><div  data-dojo-attach-point=\"internalProgress\" class=\"dijitProgressBarFull\"\n\t\t><div class=\"dijitProgressBarTile\" role=\"presentation\"></div\n\t\t><span style=\"visibility:hidden\">&#160;</span\n\t></div\n\t><div data-dojo-attach-point=\"labelNode\" class=\"dijitProgressBarLabel\" id=\"${id}_label\"></div\n\t><span data-dojo-attach-point=\"indeterminateHighContrastImage\"\n\t\t   class=\"dijitInline dijitProgressBarIndeterminateHighContrastImage\"></span\n></div>\n", "url:dijit/templates/TitlePane.html": "<div>\n\t<div data-dojo-attach-event=\"ondijitclick:_onTitleClick, onkeydown:_onTitleKey\"\n\t\t\tclass=\"dijitTitlePaneTitle\" data-dojo-attach-point=\"titleBarNode\" id=\"${id}_titleBarNode\">\n\t\t<div class=\"dijitTitlePaneTitleFocus\" data-dojo-attach-point=\"focusNode\">\n\t\t\t<span data-dojo-attach-point=\"arrowNode\" class=\"dijitInline dijitArrowNode\" role=\"presentation\"></span\n\t\t\t><span data-dojo-attach-point=\"arrowNodeInner\" class=\"dijitArrowNodeInner\"></span\n\t\t\t><span data-dojo-attach-point=\"titleNode\" class=\"dijitTitlePaneTextNode\"></span>\n\t\t</div>\n\t</div>\n\t<div class=\"dijitTitlePaneContentOuter\" data-dojo-attach-point=\"hideNode\" role=\"presentation\">\n\t\t<div class=\"dijitReset\" data-dojo-attach-point=\"wipeNode\" role=\"presentation\">\n\t\t\t<div class=\"dijitTitlePaneContentInner\" data-dojo-attach-point=\"containerNode\" role=\"region\" id=\"${id}_pane\" aria-labelledby=\"${id}_titleBarNode\">\n\t\t\t\t<!-- nested divs because wipeIn()/wipeOut() doesn't work right on node w/padding etc.  Put padding on inner div. -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n", "url:dijit/templates/TreeNode.html": "<div class=\"dijitTreeNode\" role=\"presentation\"\n\t><div data-dojo-attach-point=\"rowNode\" class=\"dijitTreeRow\" role=\"presentation\"\n\t\t><span data-dojo-attach-point=\"expandoNode\" class=\"dijitInline dijitTreeExpando\" role=\"presentation\"></span\n\t\t><span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" role=\"presentation\"></span\n\t\t><span data-dojo-attach-point=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\">\n\t\t\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitTreeIcon\" data-dojo-attach-point=\"iconNode\"></span\n\t\t\t><span data-dojo-attach-point=\"labelNode,focusNode\" class=\"dijitTreeLabel\" role=\"treeitem\" tabindex=\"-1\" aria-selected=\"false\"></span>\n\t\t</span\n\t></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeNodeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>\n", "url:dijit/templates/Tree.html": "<div role=\"tree\">\n\t<div class=\"dijitInline dijitTreeIndent\" style=\"position: absolute; top: -9999px\" data-dojo-attach-point=\"indentDetector\"></div>\n\t<div class=\"dijitTreeExpando dijitTreeExpandoLoading\" data-dojo-attach-point=\"rootLoadingIndicator\"></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeContainer\" role=\"presentation\">\n\t</div>\n</div>\n", "url:dijit/templates/InlineEditBox.html": "<span data-dojo-attach-point=\"editNode\" role=\"presentation\" class=\"dijitReset dijitInline dijitOffScreen\"\n\t><span data-dojo-attach-point=\"editorPlaceholder\"></span\n\t><span data-dojo-attach-point=\"buttonContainer\"\n\t\t><button data-dojo-type=\"./form/Button\" data-dojo-props=\"label: '${buttonSave}', 'class': 'saveButton'\"\n\t\t\tdata-dojo-attach-point=\"saveButton\" data-dojo-attach-event=\"onClick:save\"></button\n\t\t><button data-dojo-type=\"./form/Button\"  data-dojo-props=\"label: '${buttonCancel}', 'class': 'cancelButton'\"\n\t\t\tdata-dojo-attach-point=\"cancelButton\" data-dojo-attach-event=\"onClick:cancel\"></button\n\t></span\n></span>\n", "url:dijit/form/templates/ComboButton.html": "<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tcellspacing='0' cellpadding='0' role=\"presentation\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonNode\" data-dojo-attach-point=\"buttonNode\" data-dojo-attach-event=\"ondijitclick:__onClick,onkeydown:_onButtonKeyDown\"\n\t\t><div id=\"${id}_button\" class=\"dijitReset dijitButtonContents\"\n\t\t\tdata-dojo-attach-point=\"titleNode\"\n\t\t\trole=\"button\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class=\"dijitReset dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitInline dijitButtonText\" id=\"${id}_label\" data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t></div\n\t\t></td\n\t\t><td id=\"${id}_arrow\" class='dijitReset dijitRight dijitButtonNode dijitArrowButton'\n\t\t\tdata-dojo-attach-point=\"_popupStateNode,focusNode,_buttonNode\"\n\t\t\tdata-dojo-attach-event=\"onkeydown:_onArrowKeyDown\"\n\t\t\ttitle=\"${optionsTitle}\"\n\t\t\trole=\"button\" aria-haspopup=\"true\"\n\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t></td\n\t\t><td style=\"display:none !important;\"\n\t\t\t><input ${!nameAttrSetting} type=\"${type}\" value=\"${value}\" data-dojo-attach-point=\"valueNode\" role=\"presentation\"\n\t\t\t\tdata-dojo-attach-event=\"onclick:_onClick\"\n\t\t/></td></tr></tbody\n></table>\n", "url:dijit/form/templates/CheckBox.html": "<div class=\"dijit dijitReset dijitInline\" role=\"presentation\"\n\t><input\n\t \t${!nameAttrSetting} type=\"${type}\" role=\"${type}\" aria-checked=\"false\" ${checkedAttrSetting}\n\t\tclass=\"dijitReset dijitCheckBoxInput\"\n\t\tdata-dojo-attach-point=\"focusNode\"\n\t \tdata-dojo-attach-event=\"ondijitclick:_onClick\"\n/></div>\n", "url:dijit/templates/Calendar.html": "<table cellspacing=\"0\" cellpadding=\"0\" class=\"dijitCalendarContainer\" role=\"grid\" aria-labelledby=\"${id}_mddb ${id}_year\" data-dojo-attach-point=\"gridNode\">\n\t<thead>\n\t\t<tr class=\"dijitReset dijitCalendarMonthContainer\" valign=\"top\">\n\t\t\t<th class='dijitReset dijitCalendarArrow' data-dojo-attach-point=\"decrementMonth\" scope=\"col\">\n\t\t\t\t<span class=\"dijitInline dijitCalendarIncrementControl dijitCalendarDecrease\" role=\"presentation\"></span>\n\t\t\t\t<span data-dojo-attach-point=\"decreaseArrowNode\" class=\"dijitA11ySideArrow\">-</span>\n\t\t\t</th>\n\t\t\t<th class='dijitReset' colspan=\"5\" scope=\"col\">\n\t\t\t\t<div data-dojo-attach-point=\"monthNode\">\n\t\t\t\t</div>\n\t\t\t</th>\n\t\t\t<th class='dijitReset dijitCalendarArrow' scope=\"col\" data-dojo-attach-point=\"incrementMonth\">\n\t\t\t\t<span class=\"dijitInline dijitCalendarIncrementControl dijitCalendarIncrease\" role=\"presentation\"></span>\n\t\t\t\t<span data-dojo-attach-point=\"increaseArrowNode\" class=\"dijitA11ySideArrow\">+</span>\n\t\t\t</th>\n\t\t</tr>\n\t\t<tr role=\"row\">\n\t\t\t${!dayCellsHtml}\n\t\t</tr>\n\t</thead>\n\t<tbody data-dojo-attach-point=\"dateRowsNode\" data-dojo-attach-event=\"ondijitclick: _onDayClick\" class=\"dijitReset dijitCalendarBodyContainer\">\n\t\t\t${!dateRowsHtml}\n\t</tbody>\n\t<tfoot class=\"dijitReset dijitCalendarYearContainer\">\n\t\t<tr>\n\t\t\t<td class='dijitReset' valign=\"top\" colspan=\"7\" role=\"presentation\">\n\t\t\t\t<div class=\"dijitCalendarYearLabel\">\n\t\t\t\t\t<span data-dojo-attach-point=\"previousYearLabelNode\" class=\"dijitInline dijitCalendarPreviousYear\" role=\"button\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"currentYearLabelNode\" class=\"dijitInline dijitCalendarSelectedYear\" role=\"button\" id=\"${id}_year\"></span>\n\t\t\t\t\t<span data-dojo-attach-point=\"nextYearLabelNode\" class=\"dijitInline dijitCalendarNextYear\" role=\"button\"></span>\n\t\t\t\t</div>\n\t\t\t</td>\n\t\t</tr>\n\t</tfoot>\n</table>\n", "url:dijit/form/templates/Spinner.html": "<div class=\"dijit dijitReset dijitInline dijitLeft\"\n\tid=\"widget_${id}\" role=\"presentation\"\n\t><div class=\"dijitReset dijitButtonNode dijitSpinnerButtonContainer\"\n\t\t><input class=\"dijitReset dijitInputField dijitSpinnerButtonInner\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t/><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitUpArrowButton\"\n\t\t\tdata-dojo-attach-point=\"upArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9650; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitDownArrowButton\"\n\t\t\tdata-dojo-attach-point=\"downArrowNode\"\n\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t></div\n\t></div\n\t><div class='dijitReset dijitValidationContainer'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t/></div\n\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' data-dojo-attach-point=\"textbox,focusNode\" type=\"${type}\" data-dojo-attach-event=\"onkeydown:_onKeyDown\"\n\t\t\trole=\"spinbutton\" autocomplete=\"off\" ${!nameAttrSetting}\n\t/></div\n></div>\n", "url:dijit/form/templates/Select.html": "<table class=\"dijit dijitReset dijitInline dijitLeft\"\n\tdata-dojo-attach-point=\"_buttonNode,tableNode,focusNode,_popupStateNode\" cellspacing='0' cellpadding='0'\n\trole=\"listbox\" aria-haspopup=\"true\"\n\t><tbody role=\"presentation\"><tr role=\"presentation\"\n\t\t><td class=\"dijitReset dijitStretch dijitButtonContents\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitInputField dijitButtonText\"  data-dojo-attach-point=\"containerNode,textDirNode\" role=\"presentation\"></div\n\t\t\t><div class=\"dijitReset dijitValidationContainer\"\n\t\t\t\t><input class=\"dijitReset dijitInputField dijitValidationIcon dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t/></div\n\t\t\t><input type=\"hidden\" ${!nameAttrSetting} data-dojo-attach-point=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"\n\t\t/></td\n\t\t><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer\"\n\t\t\tdata-dojo-attach-point=\"titleNode\" role=\"presentation\"\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t\t${_buttonInputDisabled}\n\t\t/></td\n\t></tr></tbody\n></table>\n", "url:dijit/form/templates/HorizontalSlider.html": "<table class=\"dijit dijitReset dijitSlider dijitSliderH\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" data-dojo-attach-event=\"onkeydown:_onKeyDown, onkeyup:_onKeyUp\"\n\trole=\"presentation\"\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td data-dojo-attach-point=\"topDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationT dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderDecrementIconH\" style=\"display:none\" data-dojo-attach-point=\"decrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderLeftBumper\" data-dojo-attach-event=\"press:_onClkDecBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><input data-dojo-attach-point=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\n\t\t\t/><div class=\"dijitReset dijitSliderBarContainerH\" role=\"presentation\" data-dojo-attach-point=\"sliderBarContainer\"\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"progressBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderProgressBar dijitSliderProgressBarH\" data-dojo-attach-event=\"press:_onBarClick\"\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableH\"\n\t\t\t\t\t\t><div data-dojo-attach-point=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleH\" data-dojo-attach-event=\"press:_onHandleClick\" role=\"slider\"></div\n\t\t\t\t\t></div\n\t\t\t\t></div\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarH dijitSliderRemainingBar dijitSliderRemainingBarH\" data-dojo-attach-event=\"press:_onBarClick\"></div\n\t\t\t></div\n\t\t></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperH dijitSliderRightBumper\" data-dojo-attach-event=\"press:_onClkIncBumper\"></div\n\t\t></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerH\"\n\t\t\t><div class=\"dijitSliderIncrementIconH\" style=\"display:none\" data-dojo-attach-point=\"incrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\n\t\t></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t\t><td data-dojo-attach-point=\"containerNode,bottomDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationB dijitSliderDecorationH\"></td\n\t\t><td class=\"dijitReset\" colspan=\"2\"></td\n\t></tr\n></table>\n", "url:dijit/form/templates/VerticalSlider.html": "<table class=\"dijit dijitReset dijitSlider dijitSliderV\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" rules=\"none\" data-dojo-attach-event=\"onkeydown:_onKeyDown,onkeyup:_onKeyUp\"\n\trole=\"presentation\"\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\n\t\t\t><div class=\"dijitSliderIncrementIconV\" style=\"display:none\" data-dojo-attach-point=\"decrementButton\"><span class=\"dijitSliderButtonInner\">+</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderTopBumper\" data-dojo-attach-event=\"press:_onClkIncBumper\"></div></center\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td data-dojo-attach-point=\"leftDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationL dijitSliderDecorationV\"></td\n\t\t><td class=\"dijitReset dijitSliderDecorationC\" style=\"height:100%;\"\n\t\t\t><input data-dojo-attach-point=\"valueNode\" type=\"hidden\" ${!nameAttrSetting}\n\t\t\t/><center class=\"dijitReset dijitSliderBarContainerV\" role=\"presentation\" data-dojo-attach-point=\"sliderBarContainer\"\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"remainingBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderRemainingBar dijitSliderRemainingBarV\" data-dojo-attach-event=\"press:_onBarClick\"><!--#5629--></div\n\t\t\t\t><div role=\"presentation\" data-dojo-attach-point=\"progressBar\" class=\"dijitSliderBar dijitSliderBarV dijitSliderProgressBar dijitSliderProgressBarV\" data-dojo-attach-event=\"press:_onBarClick\"\n\t\t\t\t\t><div class=\"dijitSliderMoveable dijitSliderMoveableV\" style=\"vertical-align:top;\"\n\t\t\t\t\t\t><div data-dojo-attach-point=\"sliderHandle,focusNode\" class=\"dijitSliderImageHandle dijitSliderImageHandleV\" data-dojo-attach-event=\"press:_onHandleClick\" role=\"slider\"></div\n\t\t\t\t\t></div\n\t\t\t\t></div\n\t\t\t></center\n\t\t></td\n\t\t><td data-dojo-attach-point=\"containerNode,rightDecoration\" class=\"dijitReset dijitSliderDecoration dijitSliderDecorationR dijitSliderDecorationV\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset\"\n\t\t\t><center><div class=\"dijitSliderBar dijitSliderBumper dijitSliderBumperV dijitSliderBottomBumper\" data-dojo-attach-event=\"press:_onClkDecBumper\"></div></center\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n\t><tr class=\"dijitReset\"\n\t\t><td class=\"dijitReset\"></td\n\t\t><td class=\"dijitReset dijitSliderButtonContainer dijitSliderButtonContainerV\"\n\t\t\t><div class=\"dijitSliderDecrementIconV\" style=\"display:none\" data-dojo-attach-point=\"incrementButton\"><span class=\"dijitSliderButtonInner\">-</span></div\n\t\t></td\n\t\t><td class=\"dijitReset\"></td\n\t></tr\n></table>\n", "url:dijit/layout/templates/AccordionButton.html": "<div data-dojo-attach-event='ondijitclick:_onTitleClick' class='dijitAccordionTitle' role=\"presentation\">\n\t<div data-dojo-attach-point='titleNode,focusNode' data-dojo-attach-event='onkeydown:_onTitleKeyDown'\n\t\t\tclass='dijitAccordionTitleFocus' role=\"tab\" aria-expanded=\"false\"\n\t\t><span class='dijitInline dijitAccordionArrow' role=\"presentation\"></span\n\t\t><span class='arrowTextUp' role=\"presentation\">+</span\n\t\t><span class='arrowTextDown' role=\"presentation\">-</span\n\t\t><span role=\"presentation\" class=\"dijitInline dijitIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t\t<span role=\"presentation\" data-dojo-attach-point='titleTextNode, textDirNode' class='dijitAccordionText'></span>\n\t</div>\n</div>\n", "url:dijit/layout/templates/TabContainer.html": "<div class=\"dijitTabContainer\">\n\t<div class=\"dijitTabListWrapper\" data-dojo-attach-point=\"tablistNode\"></div>\n\t<div data-dojo-attach-point=\"tablistSpacer\" class=\"dijitTabSpacer ${baseClass}-spacer\"></div>\n\t<div class=\"dijitTabPaneWrapper ${baseClass}-container\" data-dojo-attach-point=\"containerNode\"></div>\n</div>\n", "url:dijit/layout/templates/_TabButton.html": "<div role=\"presentation\" data-dojo-attach-point=\"titleNode,innerDiv,tabContent\" class=\"dijitTabInner dijitTabContent\">\n\t<span role=\"presentation\" class=\"dijitInline dijitIcon dijitTabButtonIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t<span data-dojo-attach-point='containerNode,focusNode' class='tabLabel'></span>\n\t<span class=\"dijitInline dijitTabCloseButton dijitTabCloseIcon\" data-dojo-attach-point='closeNode'\n\t\t  role=\"presentation\">\n\t\t<span data-dojo-attach-point='closeText' class='dijitTabCloseText'>[x]</span\n\t\t\t\t></span>\n</div>\n", "url:dijit/layout/templates/ScrollingTabController.html": "<div class=\"dijitTabListContainer-${tabPosition}\" style=\"visibility:hidden\">\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerMenuButton\"\n\t\t class=\"tabStripButton-${tabPosition}\"\n\t\t id=\"${id}_menuBtn\"\n\t\t data-dojo-props=\"containerId: '${containerId}', iconClass: 'dijitTabStripMenuIcon',\n\t\t\t\t\tdropDownPosition: ['below-alt', 'above-alt']\"\n\t\t data-dojo-attach-point=\"_menuBtn\" showLabel=\"false\" title=\"\">&#9660;</div>\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t class=\"tabStripButton-${tabPosition}\"\n\t\t id=\"${id}_leftBtn\"\n\t\t data-dojo-props=\"iconClass:'dijitTabStripSlideLeftIcon', showLabel:false, title:''\"\n\t\t data-dojo-attach-point=\"_leftBtn\" data-dojo-attach-event=\"onClick: doSlideLeft\">&#9664;</div>\n\t<div data-dojo-type=\"dijit.layout._ScrollingTabControllerButton\"\n\t\t class=\"tabStripButton-${tabPosition}\"\n\t\t id=\"${id}_rightBtn\"\n\t\t data-dojo-props=\"iconClass:'dijitTabStripSlideRightIcon', showLabel:false, title:''\"\n\t\t data-dojo-attach-point=\"_rightBtn\" data-dojo-attach-event=\"onClick: doSlideRight\">&#9654;</div>\n\t<div class='dijitTabListWrapper' data-dojo-attach-point='tablistWrapper'>\n\t\t<div role='tablist' data-dojo-attach-event='onkeydown:onkeydown'\n\t\t\t data-dojo-attach-point='containerNode' class='nowrapTabStrip'></div>\n\t</div>\n</div>", "url:dijit/layout/templates/_ScrollingTabControllerButton.html": "<div data-dojo-attach-event=\"ondijitclick:_onClick\" class=\"dijitTabInnerDiv dijitTabContent dijitButtonContents\"  data-dojo-attach-point=\"focusNode\" role=\"button\">\n\t<span role=\"presentation\" class=\"dijitInline dijitTabStripIcon\" data-dojo-attach-point=\"iconNode\"></span>\n\t<span data-dojo-attach-point=\"containerNode,titleNode\" class=\"dijitButtonText\"></span>\n</div>", "*now": function(r) {
r(["dojo/i18n!*preload*demos/themePreviewer/nls/src*[\"ar\",\"ca\",\"cs\",\"da\",\"de\",\"el\",\"en-gb\",\"en-us\",\"es-es\",\"fi-fi\",\"fr-fr\",\"he-il\",\"hu\",\"it-it\",\"ja-jp\",\"ko-kr\",\"nl-nl\",\"nb\",\"pl\",\"pt-br\",\"pt-pt\",\"ru\",\"sk\",\"sl\",\"sv\",\"th\",\"tr\",\"zh-tw\",\"zh-cn\",\"ROOT\"]"]);
}}});
        require(["require", "dojo/_base/array", "dojo/_base/config", "dojo/dom", "dojo/dom-class", "dojo/dom-construct", "dojo/_base/kernel", "dojo/query", "dojo/ready", "dojo/_base/window", "dojo/_base/fx", "dijit/registry", "dijit/MenuItem", "dojo/date/locale", "dojo/parser", "dojo/data/ItemFileReadStore", "dijit/tree/ForestStoreModel", "dojo/number", "dojo/dnd/Source", "dojo/_base/json", "dijit/dijit-all"], function(_de2, _de3, _de4, dom, _de5, _de6, _de7, _de8, _de9, win, fx, _dea, _deb, _dec, _ded, _dee, _def) {
        continentStore = new _dee({data: {identifier: "id", label: "name", items: [{id: "AF", name: "Africa", type: "continent", population: "900 million", area: "30,221,532 sq km", timezone: "-1 UTC to +4 UTC", children: [{_reference: "EG"}, {_reference: "KE"}, {_reference: "SD"}]}, {id: "EG", name: "Egypt", type: "country"}, {id: "KE", name: "Kenya", type: "country", children: [{_reference: "Nairobi"}, {_reference: "Mombasa"}]}, {id: "Nairobi", name: "Nairobi", type: "city"}, {id: "Mombasa", name: "Mombasa", type: "city"}, {id: "SD", name: "Sudan", type: "country", children: {_reference: "Khartoum"}}, {id: "Khartoum", name: "Khartoum", type: "city"}, {id: "AS", name: "Asia", type: "continent", children: [{_reference: "CN"}, {_reference: "IN"}, {_reference: "RU"}, {_reference: "MN"}]}, {id: "CN", name: "China", type: "country"}, {id: "IN", name: "India", type: "country"}, {id: "RU", name: "Russia", type: "country"}, {id: "MN", name: "Mongolia", type: "country"}, {id: "OC", name: "Oceania", type: "continent", population: "21 million", children: {_reference: "AU"}}, {id: "AU", name: "Australia", type: "country", population: "21 million"}, {id: "EU", name: "Europe", type: "continent", children: [{_reference: "DE"}, {_reference: "FR"}, {_reference: "ES"}, {_reference: "IT"}]}, {id: "DE", name: "Germany", type: "country"}, {id: "FR", name: "France", type: "country"}, {id: "ES", name: "Spain", type: "country"}, {id: "IT", name: "Italy", type: "country"}, {id: "NA", name: "North America", type: "continent", children: [{_reference: "MX"}, {_reference: "CA"}, {_reference: "US"}]}, {id: "MX", name: "Mexico", type: "country", population: "108 million", area: "1,972,550 sq km", children: [{_reference: "Mexico City"}, {_reference: "Guadalajara"}]}, {id: "Mexico City", name: "Mexico City", type: "city", population: "19 million", timezone: "-6 UTC"}, {id: "Guadalajara", name: "Guadalajara", type: "city", population: "4 million", timezone: "-6 UTC"}, {id: "CA", name: "Canada", type: "country", population: "33 million", area: "9,984,670 sq km", children: [{_reference: "Ottawa"}, {_reference: "Toronto"}]}, {id: "Ottawa", name: "Ottawa", type: "city", population: "0.9 million", timezone: "-5 UTC"}, {id: "Toronto", name: "Toronto", type: "city", population: "2.5 million", timezone: "-5 UTC"}, {id: "US", name: "United States of America", type: "country"}, {id: "SA", name: "South America", type: "continent", children: [{_reference: "BR"}, {_reference: "AR"}]}, {id: "BR", name: "Brazil", type: "country", population: "186 million"}, {id: "AR", name: "Argentina", type: "country", population: "40 million"}]}});
                stateStore = new _dee({data: {identifier: "abbreviation", label: "name", items: [{name: "Alabama", label: "<img width='97px' height='127px' src='images/Alabama.jpg'/>Alabama", abbreviation: "AL"}, {name: "Alaska", label: "Alaska", abbreviation: "AK"}, {name: "American Samoa", label: "American Samoa", abbreviation: "AS"}, {name: "Arizona", label: "Arizona", abbreviation: "AZ"}, {name: "Arkansas", label: "Arkansas", abbreviation: "AR"}, {name: "Armed Forces Europe", label: "Armed Forces Europe", abbreviation: "AE"}, {name: "Armed Forces Pacific", label: "Armed Forces Pacific", abbreviation: "AP"}, {name: "Armed Forces the Americas", label: "Armed Forces the Americas", abbreviation: "AA"}, {name: "California", label: "California", abbreviation: "CA"}, {name: "Colorado", label: "Colorado", abbreviation: "CO"}, {name: "Connecticut", label: "Connecticut", abbreviation: "CT"}, {name: "Delaware", label: "Delaware", abbreviation: "DE"}, {name: "District of Columbia", label: "District of Columbia", abbreviation: "DC"}, {name: "Federated States of Micronesia", label: "Federated States of Micronesia", abbreviation: "FM"}, {name: "Florida", label: "Florida", abbreviation: "FL"}, {name: "Georgia", label: "Georgia", abbreviation: "GA"}, {name: "Guam", label: "Guam", abbreviation: "GU"}, {name: "Hawaii", label: "Hawaii", abbreviation: "HI"}, {name: "Idaho", label: "Idaho", abbreviation: "ID"}, {name: "Illinois", label: "Illinois", abbreviation: "IL"}, {name: "Indiana", label: "Indiana", abbreviation: "IN"}, {name: "Iowa", label: "Iowa", abbreviation: "IA"}, {name: "Kansas", label: "Kansas", abbreviation: "KS"}, {name: "Kentucky", label: "Kentucky", abbreviation: "KY"}, {name: "Louisiana", label: "Louisiana", abbreviation: "LA"}, {name: "Maine", label: "Maine", abbreviation: "ME"}, {name: "Marshall Islands", label: "Marshall Islands", abbreviation: "MH"}, {name: "Maryland", label: "Maryland", abbreviation: "MD"}, {name: "Massachusetts", label: "Massachusetts", abbreviation: "MA"}, {name: "Michigan", label: "Michigan", abbreviation: "MI"}, {name: "Minnesota", label: "Minnesota", abbreviation: "MN"}, {name: "Mississippi", label: "Mississippi", abbreviation: "MS"}, {name: "Missouri", label: "Missouri", abbreviation: "MO"}, {name: "Montana", label: "Montana", abbreviation: "MT"}, {name: "Nebraska", label: "Nebraska", abbreviation: "NE"}, {name: "Nevada", label: "Nevada", abbreviation: "NV"}, {name: "New Hampshire", label: "New Hampshire", abbreviation: "NH"}, {name: "New Jersey", label: "New Jersey", abbreviation: "NJ"}, {name: "New Mexico", label: "New Mexico", abbreviation: "NM"}, {name: "New York", label: "New York", abbreviation: "NY"}, {name: "North Carolina", label: "North Carolina", abbreviation: "NC"}, {name: "North Dakota", label: "North Dakota", abbreviation: "ND"}, {name: "Northern Mariana Islands", label: "Northern Mariana Islands", abbreviation: "MP"}, {name: "Ohio", label: "Ohio", abbreviation: "OH"}, {name: "Oklahoma", label: "Oklahoma", abbreviation: "OK"}, {name: "Oregon", label: "Oregon", abbreviation: "OR"}, {name: "Pennsylvania", label: "Pennsylvania", abbreviation: "PA"}, {name: "Puerto Rico", label: "Puerto Rico", abbreviation: "PR"}, {name: "Rhode Island", label: "Rhode Island", abbreviation: "RI"}, {name: "South Carolina", label: "South Carolina", abbreviation: "SC"}, {name: "South Dakota", label: "South Dakota", abbreviation: "SD"}, {name: "Tennessee", label: "Tennessee", abbreviation: "TN"}, {name: "Texas", label: "Texas", abbreviation: "TX"}, {name: "Utah", label: "Utah", abbreviation: "UT"}, {name: "Vermont", label: "Vermont", abbreviation: "VT"}, {name: "Virgin Islands, U.S.", label: "Virgin Islands, U.S.", abbreviation: "VI"}, {name: "Virginia", label: "Virginia", abbreviation: "VA"}, {name: "Washington", label: "Washington", abbreviation: "WA"}, {name: "West Virginia", label: "West Virginia", abbreviation: "WV"}, {name: "Wisconsin", label: "Wisconsin", abbreviation: "WI"}, {name: "Wyoming", label: "Wyoming", abbreviation: "WY"}]}});
                continentModel = new _def({store: continentStore, query: {type: "continent"}, rootId: "continentRoot", rootLabel: "Continents", childrenAttrs: ["children"]});
                showDialog = function() {
                var dlg = _dea.byId("dialog1");
                        dlg.show();
                        dlg._savedFocus = dom.byId("header");
                };
                showDialogAb = function() {
                var dlg = _dea.byId("dialogAB");
                        dlg.show();
                        dlg._savedFocus = dom.byId("header");
                };
                var _df0 = "";
                setTextBoxPadding = function() {
                if (!this.get("checked")) {
                this.set("checked", true);
                }
                var val = this.get("label");
                        if (_df0) {
                _de5.remove(win.body(), _df0);
                        _df0 = "";
                }
                if (val != "theme default") {
                _df0 = "inputPadding" + val.replace("px", "");
                        _de5.add(win.body(), _df0);
                }
                _de3.forEach(this.getParent().getChildren(), function(mi) {
                if (mi != this) {
                mi.set("checked", false);
                }
                }, this);
                };
                _de9(function() {
                setTimeout(function() {
                _ded.parse(dom.byId("container"));
                        dom.byId("loaderInner").innerHTML += " done.";
                        setTimeout(function hideLoader() {
                        fx.fadeOut({node: "loader", duration: 500, onEnd: function(n) {
                        n.style.display = "none";
                        }}).play();
                        }, 250);
                        var _df1 = [{theme: "claro", author: "Dojo", baseUri: "../../dijit/themes/"}, {theme: "tundra", author: "Dojo", baseUri: "../../dijit/themes/"}, {theme: "soria", author: "nikolai", baseUri: "../../dijit/themes/"}, {theme: "nihilo", author: "nikolai", baseUri: "../../dijit/themes/"}];
                        var _df2 = "";
                        _de3.forEach(_df1, function(_df3) {
                        _df2 += "<a href=\"?theme=" + _df3.theme + "\">" + _df3.theme + "</" + "a> (" + "<a href=\"?theme=" + _df3.theme + "&dir=rtl\">RTL</" + "a> " + "<a href=\"?theme=" + _df3.theme + "&a11y=true\">high-contrast</" + "a> " + "<a href=\"?theme=" + _df3.theme + "&dir=rtl&a11y=true\">RTL+high-contrast</" + "a> )" + " - by: " + _df3.author + " <br>";
                                _dea.byId("themeMenu").addChild(new _deb({label: _df3.theme, onClick: function() {
                        location.search = "?theme=" + _df3.theme;
                        }}));
                        });
                        dom.byId("themeData").innerHTML = _df2;
                        _dea.byId("backgroundArea").set("value", _dec.format(new Date(2005, 11, 30), {selector: "date"}));
                        var _df4 = new Date(0);
                        _df4.setHours(9);
                        _dea.byId("timePicker").set("value", _dec.format(_df4, {selector: "time"}));
                }, 320);
                });
                var dir = "", _df5 = false, _df6 = "dijit", _df7 = null, _df8 = "claro", vars = {};
                if (window.location.href.indexOf("?") > - 1) {
        var str = window.location.href.substr(window.location.href.indexOf("?") + 1).split(/#/);
                var ary = str[0].split(/&/);
                for (var i = 0; i < ary.length; i++) {
        var _df9 = ary[i].split("="), key = _df9[0], _dfa = (_df9[1] || "").replace(/[^\w]/g, "");
                switch (key) {
        case "locale":
                _de7.locale = _de4.locale = _dec = _dfa;
                break;
                case "dir":
                document.getElementsByTagName("html")[0].dir = _dfa;
                dir = _dfa;
                break;
                case "theme":
                _df5 = _dfa;
                break;
                case "a11y":
                if (_dfa) {
        _df7 = "dijit_a11y";
        }
        break;
                case "themeModule":
                if (_dfa) {
        _df6 = _dfa;
        }
        }
        vars[key] = _dfa;
        }
        }
        _de7._getVar = function(k, def) {
        return vars[k] || def;
        };
                if (dir == "rtl") {
        _de9(0, function() {
        _de8("label").attr("dir", "rtl");
        });
        }
        if (_df7) {
        _de9(0, function() {
        var b = win.body();
                if (_df7) {
        _de5.add(b, _df7);
        }
        });
        }
        if (_df5) {
        _de9(1, function() {
        var b = win.body();
                _de5.replace(b, _df5, _df8);
                _de8("link[href$=\"claro.css\"]").orphan();
                _de8("link[href$=\"claro/document.css\"]").orphan();
                var _dfb = [_de2.toUrl(_df6 + "/themes/" + _df5 + "/" + _df5 + ".css"), _de2.toUrl(_df6 + "/themes/" + _df5 + "/" + _df5 + "_rtl.css"), _de2.toUrl("dojo/resources/dojo.css")];
                var head = _de8("head")[0];
                _de3.forEach(_dfb, function(css) {
                if (document.createStyleSheet) {
                document.createStyleSheet(css);
                } else {
                _de6.place("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + css + "\"/>", head);
                }
                });
        });
        }
        });