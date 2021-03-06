/*
 jQWidgets v4.4.0 (2016-Nov)
 Copyright (c) 2011-2016 jQWidgets.
 License: http://jqwidgets.com/license/
 */
var gr = [{
        startValue: 0,
        endValue: 50,
        style: {
            fill: '#25A0DA', stroke: '#35A0DA'
        },
        endWidth: 5,
        startWidth: 1
    }, {
        startValue: 51,
        endValue: 74,
        style: {
            fill: '#FCA76A',
            stroke: '#FCA76A'
        },
        endWidth: 10,
        startWidth: 5
    }, {
        startValue: 75,
        endValue: 100,
        style: {
            fill: '#FC6A6A',
            stroke: '#FC6A6A'
        },
        endWidth: 15,
        startWidth: 10
    }];
var ticks = [{
        interval: 5,
        size: '2%'
    },
    {
        interval: 25,
        size: '9%'
    }];
var lbl = {
    //distance: '50px',
    //position: 'inside',
    interval: 20,
    //offset: [0, -10],
    visible: true,
    formatValue: function (value) {
        return value + '%';
    }
};

var toneDescriptions = {"joy": {"id": "joy", "cat": "emotional"
        , "desc": "Joy or happiness has shades of enjoyment, satisfaction and pleasure. There is a sense of well-being, inner peace, love, safety and contentment.", "low": "Less than 0.5 - less likely to be perceived as joyful.", "high": "More than 0.75 - Highly likely to be perceived as joyful."}, "fear": {"id": "fear", "cat": "emotional", "desc": "A response to impending danger. It is a survival mechanism that is a reaction to some negative stimulus. It may be a mild caution or an extreme phobia.", "low": "Less than 0.5 - less likely to be perceived as scared.", "high": "More than 0.75 - Highly likely to be perceived as scared."}, "sadness": {"id": "sadness", "cat": "emotional", "desc": "Indicates a feeling of loss and disadvantage. When a person can be observed to be quiet, less energetic and withdrawn, it may be inferred that sadness exists.", "low": "Less than 0.5 - less likely to be perceived as sad.", "high": "More than 0.75 - Highly likely to be perceived as sad."}, "disgust": {"id": "disgust", "cat": "emotional", "desc": "An emotional response of revulsion to something considered offensive or unpleasant. It is a sensation that refers to something revolting.", "low": "Less than 0.5 - less likely to be perceived as disgusted.", "high": "More than 0.75 - Highly likely to be perceived as disgusted."}, "anger": {"id": "anger", "cat": "emotional", "desc": "Evoked due to injustice, conflict, humiliation, negligence or betrayal. If anger is active, the individual attacks the target, verbally or physically. If anger is passive, the person silently sulks and feels tension and hostility.", "low": "Less than 0.5 - less likely to be perceived as angry.", "high": "More than 0.75 - Highly likely to be perceived as angry."}, "openness": {"id": "openness", "cat": "social", "desc": "The extent a person is open to experience a variety of activities.", "low": "Less than 0.50 - more likely to be perceived as no-nonsense, straightforward, blunt, or preferring tradition and the obvious over the complex, ambiguous, and subtle.", "high": "More than 0.75 - more likely to be perceived as intellectual, curious, emotionally-aware, imaginative, willing to try new things, appreciating beauty, or open to change."}, "conscientiousness": {"id": "conscientiousness", "cat": "social", "desc": "The tendency to act in an organized or thoughtful way.", "low": "Less than 0.50 - more likely to be perceived as spontaneous, laid-back, reckless, unmethodical, remiss, or disorganized.", "high": "More than 0.75 - more likely to be perceived as disciplined, dutiful, achievement-striving, confident, driven, or organized."}, "extraversion": {"id": "extraversion", "cat": "social", "desc": "The tendency to seek stimulation in the company of others.", "low": "Less than 0.50 - more likely to be perceived as independent, timid, introverted, restrained, boring, or dreary.", "high": "More than 0.75 - more likely to be perceived as engaging, seeking attention, needy, assertive, outgoing, sociable, cheerful, excitement-seeking, or busy."}, "agreeableness": {"id": "agreeableness", "cat": "social", "desc": "The tendency to be compassionate and cooperative towards others.", "low": "Less than 0.50 - more likely to be perceived as selfish, uncaring, uncooperative, self-interested, confrontational, skeptical, or arrogant.", "high": "More than 0.75 - more likely to be perceived as caring, sympathetic, cooperative, compromising, trustworthy, or humble."}, "emotionalrange": {"id": "emotionalrange", "cat": "social", "desc": "The extent a person's emotion is sensitive to the environment.", "low": "Less than 0.50 - more likely to be perceived as calm, bland, content, relaxed, unconcerned, or careful.", "high": "More than 0.75 - more likely to be perceived as concerned, frustrated, angry, passionate, upset, stressed, insecure, or impulsive."}, "analytical": {"id": "analytical", "cat": "language", "desc": "A person's reasoning and analytical attitude about things.", "low": "Less than 0.50 - the text contains little or no evidence of analytical tone.", "high": "More than 0.75 - more likely to be perceived as intellectual, rational, systematic, emotionless, or impersonal."}, "confident": {"id": "confident", "cat": "language", "desc": "A persons degree of certainty.", "low": "Less than 0.50 - the text contains little or no evidence of confidence in tone.", "high": "More than 0.75 - more likely to be perceived as assured, collected, hopeful, or egotistical."}, "tentative": {"id": "tentative", "cat": "language", "desc": "A persons degree of inhibition.", "low": "Less than 0.50 - the text contains little or no evidence of tentativeness in tone."
        , "high": "More than 0.75 - more likely to be perceived as questionable, doubtful, limited, or debatable."}};


var ToneClass = function (toneObj) {
    this.tone = toneObj;
    this.historicalRawAvg = toneObj.historicalRawAvg;
    this.gaugeValue = parseInt(Math.round(this.historicalRawAvg));
    
    this.toneTexts = toneDescriptions[this.tone.shortKey];
    var self = this;
    this.category = function () {
        return self.toneTexts.cat;
    };

    this.scoredText = function () {
        return getToneTexts(self.id, self.historicalRawAvg);
    };



    function getToneTexts(id, score) {
        if (score < 50) {
            return  self.toneTexts.low;
        } else if (score < 75) {
            return "Likely:" + self.toneTexts.high;
        } else {
            return "Very Likely:" + self.toneTexts.high;
        }
    }

};

(function (f) {
    var b = {}, a = b.hasOwnProperty, g = b.toString;
    var e = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
    for (var d = 0; d < e.length; d++) {
        b["[object " + e[d] + "]"] = e[d].toLowerCase()
    }
    var h = function (n) {
        if (n.expando !== undefined) {
            return n
        }
        if (typeof n === "string") {
            var m = n;
            var q;
            if (n.indexOf("<") >= 0) {
                var p = document.createDocumentFragment();
                var j = document.createElement("div");
                p.appendChild(j);
                var l = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
                var o = /<([\w:]+)/;
                n = n.replace(l, "<$1></$2>");
                var r = (o.exec(n) || ["", ""])[1].toLowerCase();
                var k = [0, "", ""];
                depth = k[0];
                j.innerHTML = k[1] + n + k[2];
                while (depth--) {
                    j = j.lastChild
                }
                n = j.childNodes;
                j.parentNode.removeChild(j);
                q = n[0]
            } else {
                q = document.querySelector(m)
            }
            if (q) {
                n = q
            } else {
                throw new Error("Invalid HTML Element Selector");
                return
            }
        }
        if (this.init) {
            this.init(n);
            return this
        } else {
            return new h(n)
        }
    };
    h.isWindow = function (j) {
        return j != null && j == j.window
    };
    h.type = function (j) {
        if (j == null) {
            return j + ""
        }
        return typeof j === "object" || typeof j === "function" ? b[g.call(j)] || "object" : typeof j
    };
    h.isPlainObject = function (m) {
        var k = this;
        var j;
        if (!m || k.type(m) !== "object" || m.nodeType || k.isWindow(m)) {
            return false
        }
        try {
            if (m.constructor && !a.call(m, "constructor") && !a.call(m.constructor.prototype, "isPrototypeOf")) {
                return false
            }
        } catch (l) {
            return false
        }
        for (j in m) {
        }
        return j === undefined || a.call(m, j)
    };
    h.isArray = function (k) {
        if (Array && Array.isArray) {
            return Array.isArray(k)
        }
        var j = Object.prototype.toString.call(k) === "[object Array]";
        return j
    };
    h.extend = function () {
        var o = this;
        var j, q, k, l, t, r, p = arguments[0] || {}, n = 1, m = arguments.length, s = false;
        if (typeof p === "boolean") {
            s = p;
            p = arguments[n] || {};
            n++
        }
        if (typeof p !== "object" && o.type(p) !== "function") {
            p = {}
        }
        if (n === m) {
            p = this;
            n--
        }
        for (; n < m; n++) {
            if ((t = arguments[n]) != null) {
                for (l in t) {
                    j = p[l];
                    k = t[l];
                    if (p === k) {
                        continue
                    }
                    if (s && k && (o.isPlainObject(k) || (q = o.isArray(k)))) {
                        if (q) {
                            q = false;
                            r = j && o.isArray(j) ? j : []
                        } else {
                            r = j && o.isPlainObject(j) ? j : {}
                        }
                        p[l] = o.extend(s, r, k)
                    } else {
                        if (k !== undefined) {
                            p[l] = k
                        }
                    }
                }
            }
        }
        return p
    };
    h.prototype = {constructor: h, init: function (k) {
            this[0] = k;
            this.length = 1;
            this.element = k;
            var j = function () {
                return(((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
            };
            this.uuid = "jqx" + +(new Date().getTime()) + j() + "-" + j();
            h.guid++;
            return this
        }};
    h.extend({that: this, cache: {}, event: {}, expando: "jqx" + (new Date().getTime()), uuid: 0, guid: 0, ischildof: function (j) {
            if (j.contains(element)) {
                return true
            }
            return false
        }, sibling: function (m) {
            var l = this;
            var k = l.element;
            var j = [];
            for (; m; m = m.nextSibling) {
                if (m.nodeType === 1 && m !== k) {
                    j.push(m)
                }
            }
            return j
        }, children: function () {
            var j = this;
            return j.sibling(j.element.firstChild)
        }, makeArray: function (j, l) {
            var n = this;
            var m, k = l || [];
            var o = function (t, r) {
                var p = r.length, s = t.length, q = 0;
                if (typeof p === "number") {
                    for (; q < p; q++) {
                        t[s++] = r[q]
                    }
                } else {
                    while (r[q] !== undefined) {
                        t[s++] = r[q++]
                    }
                }
                t.length = s;
                return t
            };
            if (j != null) {
                m = n.type(j);
                if (j.length == null || m === "string" || m === "function" || m === "regexp" || n.isWindow(j)) {
                    Array.prototype.push.call(k, j)
                } else {
                    o(k, j)
                }
            }
            return k
        }, Event: function (k, q) {
            var t = this;
            var j, m, r, w, o, n, u, s, p, x, v = k.type || k, l = [];
            if (v.indexOf(".") >= 0) {
                l = v.split(".");
                v = l.shift();
                l.sort()
            }
            if (typeof k === "string") {
                k = document.createEvent("Event");
                k.initEvent(v, true, true)
            }
            k.target = q;
            k = c.createEvent(k);
            k.type = v;
            k.isTrigger = true;
            k.namespace = l.join(".");
            k.namespace_re = k.namespace ? new RegExp("(^|\\.)" + l.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            n = v.indexOf(":") < 0 ? "on" + v : "";
            k.result = undefined;
            if (!k.target) {
                k.target = elem
            }
            k.type = v;
            return k
        }, trigger: function (j, l) {
            var k = this;
            c.trigger(j, l, k.element)
        }, addHandler: function (m, j, l) {
            var k = this;
            j.guid = j.guid || (j.guid = h.guid++);
            c.add(k.element, m, j, l)
        }, removeHandler: function (l, j) {
            var k = this;
            c.remove(k.element, l, j)
        }, on: function (l, j, k) {
            if (k && h.isFunction(k)) {
                this.addHandler(l, k, j)
            } else {
                this.addHandler(l, j, k)
            }
        }, off: function (k, j) {
            this.removeHandler(k, j)
        }, isRendered: function () {
            var j = this;
            if (j.element.parentNode == null || (j.element.offsetWidth === 0 || j.element.offsetHeight === 0)) {
                return false
            }
            return true
        }, getSizeFromStyle: function () {
            var l = null;
            var j = null;
            var m = this;
            var k;
            if (m.element.style.width) {
                l = m.element.style.width
            }
            if (m.element.style.height) {
                j = m.element.style.height
            }
            if (f.getComputedStyle) {
                k = getComputedStyle(m.element, null)
            } else {
                k = m.element.currentStyle
            }
            if (k) {
                if (k.width) {
                    l = k.width
                }
                if (k.height) {
                    j = k.height
                }
            }
            if (l === "0px") {
                l = 0
            }
            if (j === "0px") {
                j = 0
            }
            if (l === null) {
                l = 0
            }
            if (j === null) {
                j = 0
            }
            return{width: l, height: j}
        }, sizeStyleChanged: function (l) {
            var k = this;
            var m;
            var j = function (n) {
                var o = m;
                if (n && n[0] && n[0].attributeName === "style" && n[0].type === "attributes") {
                    if (o.element.offsetWidth !== o.offsetWidth || o.element.offsetHeight !== o.offsetHeight) {
                        o.offsetWidth = o.element.offsetWidth;
                        o.offsetHeight = o.element.offsetHeight;
                        if (k.isRendered()) {
                            o.callback()
                        }
                    }
                }
            };
            m = {element: k.element, offsetWidth: k.element.offsetWidth, offsetHeight: k.element.offsetHeight, callback: l};
            if (!k.elementStyleObserver) {
                k.elementStyleObserver = new MutationObserver(j);
                k.elementStyleObserver.observe(k.element, {attributes: true, childList: false, characterData: false})
            }
        }, cleanData: function () {
            var j = this;
            var k = j.element[j.expando];
            if (k !== undefined) {
                delete j.cache[k]
            }
        }, append: function (j) {
            if (j.nodeType === 1 || j.nodeType === 11 || j.nodeType === 3) {
                this.element.appendChild(j)
            }
        }, prepend: function (j) {
            if (j.nodeType === 1 || j.nodeType === 11) {
                this.element.insertBefore(elem, this.element.firstChild)
            }
        }, appendTo: function (j) {
            var k = this.detach();
            $(j).append(k[0])
        }, prependTo: function (j) {
            var k = this.detach();
            $(j).prepend(k[0])
        }, detach: function () {
            var j = this;
            return j.remove(true)
        }, remove: function (n) {
            var l = this;
            if (n !== true) {
                if (l.data()) {
                    var m = l.data().jqxWidget;
                    if (m && m.destroy && !m._destroying) {
                        m._destroying = true;
                        m.destroy();
                        m._destroying = false;
                        return
                    }
                }
                l.cleanData();
                if (l.element.querySelectorAll) {
                    var k = l.element.querySelectorAll("*");
                    if (k) {
                        for (var j = 0; j < k.length; j++) {
                            var p = h(k[j]);
                            var o = p.element[p.expando];
                            if (o !== undefined) {
                                p.remove()
                            }
                        }
                    }
                }
            }
            if (l.elementStyleObserver) {
                l.elementStyleObserver.disconnect();
                l.elementStyleObserver = null
            }
            if (l.element.parentNode) {
                l.element.parentNode.removeChild(l.element)
            }
            return this
        }, sizeChanged: function (l) {
            var k = this;
            var m;
            var j = function (n) {
                var o = m;
                if (o.element.offsetWidth !== o.offsetWidth || o.element.offsetHeight !== o.offsetHeight) {
                    o.offsetWidth = o.element.offsetWidth;
                    o.offsetHeight = o.element.offsetHeight;
                    if (k.isRendered()) {
                        o.callback();
                        k.observer.disconnect();
                        k.elementObserver.disconnect()
                    }
                }
            };
            m = {element: k.element, offsetWidth: k.element.offsetWidth, offsetHeight: k.element.offsetHeight, callback: l};
            if (!k.observer) {
                k.observer = new MutationObserver(j);
                k.observer.observe(document.body, {attributes: true, childList: true, characterData: true});
                k.elementObserver = new MutationObserver(j);
                k.elementObserver.observe(k.element, {attributes: true, childList: true, characterData: true})
            }
        }, data: function (l, k, o) {
            var n = this;
            var m = l;
            if (!l) {
                m = this.element
            }
            if (o === undefined) {
                var p = m[n.expando], j = p && n.cache[p];
                if (k === undefined) {
                    return j
                } else {
                    if (j) {
                        if (k in j) {
                            return j[k]
                        }
                    }
                }
            } else {
                if (k !== undefined) {
                    var p = m[n.expando];
                    if (!p) {
                        m[n.expando] = ++h.guid;
                        p = m[n.expando]
                    }
                    n.cache[p] = n.cache[p] || {};
                    n.cache[p][k] = o;
                    return o
                }
            }
        }, removeData: function (k, n) {
            var m = this;
            var l = k;
            if (!l) {
                l = m.element
            }
            var o = l[m.expando], j = o && m.cache[o];
            if (j) {
                if (n) {
                    $.each(n, function (p, q) {
                        delete j[q]
                    })
                } else {
                    delete m.cache[o].data
                }
            }
        }, trim: function (l) {
            var j = "[\\x20\\t\\r\\n\\f]";
            var k = new RegExp(j + "+", "g");
            rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            return l == null ? "" : (l + "").replace(rtrim, "")
        }, getClass: function () {
            var j = this;
            return j.element.getAttribute("class") || ""
        }, hasClass: function (j) {
            var m = this;
            var l = " " + j + " ";
            var k = /[\t\r\n]/g;
            if (m.element.nodeType === 1 && (" " + m.element.className + " ").replace(k, " ").indexOf(l) >= 0) {
                return true
            }
            return false
        }, addClass: function (t) {
            var r = this;
            var n, m, u, o, s, p, k, q = 0;
            var v = (/\S+/g);
            var l = /[\t\r\n]/g;
            if (typeof t === "string" && t) {
                n = t.match(v) || [];
                var m = r.element;
                o = r.getClass();
                u = m.nodeType === 1 && (" " + o + " ").replace(l, " ");
                if (u) {
                    p = 0;
                    while ((s = n[p++])) {
                        if (u.indexOf(" " + s + " ") < 0) {
                            u += s + " "
                        }
                    }
                    k = r.trim(u);
                    if (o !== k) {
                        m.setAttribute("class", k)
                    }
                }
            }
        }, removeClass: function (t) {
            var r = this;
            var n, m, u, o, s, p, k, q = 0;
            var l = /[\t\r\n]/g;
            var v = (/\S+/g);
            if (0 == arguments.length) {
                return r.element.setAttribute("class", "")
            }
            if (typeof t === "string" && t) {
                n = t.match(v) || [];
                var m = r.element;
                o = r.getClass();
                u = m.nodeType === 1 && (" " + o + " ").replace(l, " ");
                if (u) {
                    p = 0;
                    while ((s = n[p++])) {
                        while (u.indexOf(" " + s + " ") > -1) {
                            u = u.replace(" " + s + " ", " ")
                        }
                    }
                    k = r.trim(u);
                    if (o !== k) {
                        m.setAttribute("class", k)
                    }
                }
            }
        }, html: function (v) {
            var p = this;
            try {
                var z = p.element || {}, y = 0, w = p.element.length;
                if (v === undefined) {
                    return z.nodeType === 1 ? z.innerHTML.replace(rinlinejQuery, "") : undefined
                }
                var n = /<(?:script|style|link)/i, j = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", q = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, m = /<([\w:]+)/, C = /<(?:script|object|embed|option|style)/i, r = new RegExp("<(?:" + j + ")[\\s/>]", "i"), A = /^\s+/, u = {option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""]};
                var t = document.createElement("div"), k = document.createDocumentFragment(), s = document.createElement("input");
                t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
                var B = t.firstChild.nodeType === 3;
                var o = !!t.getElementsByTagName("link").length;
                if (typeof v === "string" && !n.test(v) && (o || !r.test(v)) && (B || !A.test(v)) && !u[(m.exec(v) || ["", ""])[1].toLowerCase()]) {
                    v = v.replace(q, "<$1></$2>");
                    z.innerHTML = v
                } else {
                    p.element.innerHTML = "";
                    p.element.appendChild(v)
                }
            } catch (x) {
            }
        }, isBoolean: function (j) {
            return typeof j === "boolean"
        }, isFunction: function (j) {
            return !!(j && j.constructor && j.call && j.apply)
        }, isObject: function (j) {
            return(j && (typeof j === "object" || that.isFunction(j))) || false
        }, isDate: function (j) {
            return j instanceof Date
        }, isString: function (j) {
            return typeof j === "string"
        }, isNumber: function (j) {
            return typeof j === "number" && isFinite(j)
        }, isNull: function (j) {
            return j === null
        }, isUndefined: function (j) {
            return typeof j === "undefined"
        }, isEmpty: function (j) {
            if (!this.isString(j) && this.isValue(j)) {
                return false
            } else {
                if (!this.isValue(j)) {
                    return true
                }
            }
            j = that.trim(j).replace(/\&nbsp\;/ig, "").replace(/\&#160\;/ig, "");
            return j === ""
        }, text: function () {
            var o = this;
            var n, k = "", l = 0, j = o.element.nodeType;
            var m = o.element;
            if (!j) {
                while ((n = o.element[l++])) {
                    k += getText(n)
                }
            } else {
                if (j === 1 || j === 9 || j === 11) {
                    if (typeof o.element.textContent === "string") {
                        return o.element.textContent
                    } else {
                        for (var m = m.firstChild; m; m = m.nextSibling) {
                            k += getText(m)
                        }
                    }
                } else {
                    if (j === 3 || j === 4) {
                        return o.element.nodeValue
                    }
                }
            }
            return k
        }, val: function (o) {
            var j, k, p, m = that.element;
            var n = /\r/g;
            if (!arguments.length) {
                if (m) {
                    k = m.value;
                    var l = typeof k === "string" ? k.replace(n, "") : k == null ? "" : k;
                    return l
                }
                return
            }
            if (m.nodeType !== 1) {
                return
            }
            if (o === null) {
                o = ""
            }
            if (typeof o === "number") {
                o += ""
            }
            m.value = o
        }, boxModel: function (k, j, p) {
            var n = ["Top", "Right", "Bottom", "Left"];
            var m = this;
            var l = j === (p ? "border" : "content") ? 4 : k === "width" ? 1 : 0, o = 0;
            for (; l < 4; l += 2) {
                if (j === "margin") {
                    o += m.css(j + n[l], true)
                }
                if (p) {
                    if (j === "content") {
                        o -= parseFloat(m.css("padding" + n[l])) || 0
                    }
                    if (j !== "margin") {
                        o -= parseFloat(m.css("border" + n[l] + "Width")) || 0
                    }
                } else {
                    o += parseFloat(m.css("padding" + n[l])) || 0;
                    if (j !== "padding") {
                        o += parseFloat(m.css(this.element, "border" + n[l] + "Width")) || 0
                    }
                }
            }
            return o
        }, width: function (j) {
            var k = this;
            if (k.element != null && k.element == k.element.window) {
                return k.element.document.documentElement.clientWidth
            }
            if (k.element.nodeType === 9) {
                var m = k.element.documentElement;
                return Math.max(k.element.body.scrollWidth, m.scrollWidth, k.element.body.offsetWidth, m.offsetWidth, m.clientWidth)
            }
            var n = this.element.style.boxSizing == "border-box";
            if (j) {
                if (!isNaN(j)) {
                    j = j + "px"
                }
                k.element.style.width = j
            }
            var l = k.element.offsetWidth;
            l += k.boxModel("width", "content" || (n ? "border" : "content"), true);
            return l
        }, innerWidth: function () {
            var l = this;
            var k = parseFloat(l.css("paddingLeft"));
            var n = parseFloat(l.css("paddingRight"));
            var j = parseFloat(l.css("borderLeftWidth"));
            var m = parseFloat(l.css("borderRightWidth"));
            if (isNaN(k)) {
                k = 0
            }
            if (isNaN(n)) {
                n = 0
            }
            if (isNaN(j)) {
                j = 0
            }
            if (isNaN(m)) {
                m = 0
            }
            return l.width() + k + n + j + m
        }, innerHeight: function () {
            var l = this;
            var k = parseFloat(l.css("paddingTop"));
            var n = parseFloat(l.css("paddingBottom"));
            var m = parseFloat(l.css("borderTopWidth"));
            var j = parseFloat(l.css("borderBottomWidth"));
            if (isNaN(k)) {
                k = 0
            }
            if (isNaN(n)) {
                n = 0
            }
            if (isNaN(m)) {
                m = 0
            }
            if (isNaN(j)) {
                j = 0
            }
            return l.height() + k + n + m + j
        }, outerWidth: function () {
            var j = this;
            var l = parseFloat(j.element.style.marginLeft);
            var k = parseFloat(j.element.style.marginRight);
            if (isNaN(l)) {
                l = 0
            }
            if (isNaN(k)) {
                k = 0
            }
            return j.element.offsetWidth + l + k
        }, height: function (j) {
            var k = this;
            if (k.element != null && k.element == k.element.window) {
                return k.element.document.documentElement.clientHeight
            }
            if (k.element.nodeType === 9) {
                var m = k.element.documentElement;
                return Math.max(k.element.body.scrollHeight, m.scrollHeight, k.element.body.offsetHeight, m.offsetHeight, m.clientHeight)
            }
            var n = this.element.style.boxSizing == "border-box";
            if (j) {
                if (!isNaN(j)) {
                    j = j + "px"
                }
                k.element.style.height = j
            }
            var l = k.element.offsetHeight;
            l += k.boxModel("height", "content" || (n ? "border" : "content"), true);
            return l
        }, outerHeight: function () {
            var j = this;
            var k = parseFloat(j.element.style.marginTop);
            var l = parseFloat(j.element.style.marginBottom);
            if (isNaN(k)) {
                k = 0
            }
            if (isNaN(l)) {
                l = 0
            }
            return j.element.offsetHeight + k + l
        }, css: function (k) {
            var l = this;
            var j;
            var o = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;
            var m = new RegExp("^(" + o + ")(?!px)[a-z%]+$", "i");
            var n = /^margin/;
            if (f.getComputedStyle) {
                j = function (w, q) {
                    var p, t, s, v, u = f.getComputedStyle(w, null), r = w.style;
                    if (u) {
                        p = u.getPropertyValue(q) || u[q];
                        if (p === "" && !l.contains(w.ownerDocument, w)) {
                            p = r[q]
                        }
                        if (m.test(p) && n.test(q)) {
                            t = r.width;
                            s = r.minWidth;
                            v = r.maxWidth;
                            r.minWidth = r.maxWidth = r.width = p;
                            p = u.width;
                            r.width = t;
                            r.minWidth = s;
                            r.maxWidth = v
                        }
                    }
                    return p
                }
            } else {
                if (document.documentElement.currentStyle) {
                    j = function (t, r) {
                        var u, p, q = t.currentStyle && t.currentStyle[r], s = t.style;
                        if (q == null && s && s[r]) {
                            q = s[r]
                        }
                        if (m.test(q) && !rposition.test(r)) {
                            u = s.left;
                            p = t.runtimeStyle && t.runtimeStyle.left;
                            if (p) {
                                t.runtimeStyle.left = t.currentStyle.left
                            }
                            s.left = r === "fontSize" ? "1em" : q;
                            q = s.pixelLeft + "px";
                            s.left = u;
                            if (p) {
                                t.runtimeStyle.left = p
                            }
                        }
                        return q === "" ? "auto" : q
                    }
                }
            }
            return j(l.element, k)
        }, offset: function (o) {
            var u = this;
            var A = u.element;
            if (o) {
                var E = u.css("position");
                if (E === "static") {
                    A.style.position = "relative"
                }
                var C = A, D = u.offset(), n = A.style.top, x = A.style.left, p = ((E === "absolute" || E === "fixed") && (n === "auto" || x === "auto")), m = {}, t = {}, l, r;
                if (p) {
                    t = u.position();
                    l = t.top;
                    r = t.left
                } else {
                    l = parseFloat(n) || 0;
                    r = parseFloat(x) || 0
                }
                if (u.isFunction(o)) {
                    o = o.call(A, d, D)
                }
                if (o.top != null) {
                    m.top = (o.top - D.top) + l
                }
                if (o.left != null) {
                    m.left = (o.left - D.left) + r
                }
                C.style.left = m.left + "px";
                C.style.top = m.top + "px";
                return
            }
            var B, q, v = {top: 0, left: 0}, F = A && A.ownerDocument;
            if (!F) {
                return
            }
            B = F.documentElement;
            if (!u.contains(B, A)) {
                return v
            }
            if (typeof A.getBoundingClientRect !== "undefined") {
                v = A.getBoundingClientRect()
            }
            var z = function (G) {
                return G != null && G == G.window
            };
            var s = function (G) {
                return z(G) ? G : G.nodeType === 9 ? G.defaultView || G.parentWindow : false
            };
            q = s(F);
            var y = 0;
            var k = 0;
            var j = navigator.userAgent.toLowerCase();
            var w = j.indexOf("ipad") != -1 || j.indexOf("iphone") != -1;
            if (w) {
                y = 2
            }
            return{top: k + v.top + (q.pageYOffset || B.scrollTop) - (B.clientTop || 0), left: y + v.left + (q.pageXOffset || B.scrollLeft) - (B.clientLeft || 0)}
        }, position: function () {
            var m = this;
            var j = /^(?:body|html)$/i;
            var l = m.element, k = h(function () {
                var n = l.offsetParent || document.body;
                while (n && (!j.test(n.nodeName) && h(n).css("position") === "static")) {
                    n = n.offsetParent
                }
                return n || document.body
            }());
            offset = m.offset(), parentOffset = j.test(k.nodeName) ? {top: 0, left: 0} : k.offset();
            offset.top -= parseFloat(h(l).css("marginTop")) || 0;
            offset.left -= parseFloat(h(l).css("marginLeft")) || 0;
            parentOffset.top += parseFloat(k.css("borderTopWidth")) || 0;
            parentOffset.left += parseFloat(k.css("borderLeftWidth")) || 0;
            return{top: offset.top - parentOffset.top, left: offset.left - parentOffset.left}
        }, contains: function (k, j) {
            var m = k.nodeType === 9 ? k.documentElement : k, l = j && j.parentNode;
            return k === l || !!(l && l.nodeType === 1 && m.contains && m.contains(l))
        }, camelCase: function (k) {
            var l = /-([\da-z])/gi;
            var j = function (m, n) {
                return n.toUpperCase()
            };
            return k.replace(l, j)
        }, attr: function (m, o) {
            var n = this.element;
            var l, j, k = n.nodeType;
            if (k === 3 || k === 8 || k === 2) {
                return undefined
            }
            if (typeof n.getAttribute === "undefined") {
                return undefined
            }
            if (o !== undefined) {
                if (o === null) {
                    removeAttr(n, m);
                    return
                }
                n.setAttribute(m, o + "");
                return o
            } else {
                return n.getAttribute(m)
            }
            return undefined
        }, removeAttr: function (s) {
            var q = this;
            var n = q.element;
            var t = (/\S+/g);
            var j, p, o = 0, m = s && s.match(t);
            if (m && n.nodeType === 1) {
                while ((j = m[o++])) {
                    p = j;
                    if (p == "class") {
                        p = "className"
                    }
                    var r = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped";
                    var l = new RegExp("^(?:" + r + ")$", "i");
                    var k = /^(?:checked|selected)$/i;
                    if (l.test(j)) {
                        if (!k.test(j)) {
                            n[p] = false
                        } else {
                            n[q.camelCase("default-" + j)] = n[p] = false
                        }
                    } else {
                        q.attr(j, "")
                    }
                    n.removeAttribute(j)
                }
            }
        }, showHide: function (q) {
            var n = this;
            var p, l, m, r = undefined, o = 0, k = n.length;
            l = n.element;
            if (!l.style) {
                return
            }
            var j = function (t, s) {
                t = s || t;
                return n.css(t, "display") === "none" || !n.contains(t.ownerDocument, t)
            };
            r = n.data("olddisplay");
            p = l.style.display;
            if (q) {
                if (!r && p === "none") {
                    l.style.display = ""
                }
                if (l.style.display === "" && j(l)) {
                    r = n.data("olddisplay", l.style.display)
                }
            } else {
                m = l.style.display == "none";
                if (p && p !== "none" || !m) {
                    n.data("olddisplay", m ? p : l.style.display)
                }
            }
            if (!q || l.style.display === "none" || l.style.display === "") {
                l.style.display = q ? r || "" : "none"
            }
        }, show: function () {
            var j = this;
            j.showHide(true)
        }, hide: function () {
            var j = this;
            j.showHide(false)
        }, isEmptyObject: function (k) {
            for (var j in k) {
                return false
            }
            return true
        }, toArray: function () {
            return Array.prototype.slice.call(this)
        }, isArraylike: function (m) {
            var l = this;
            var k = m.length, j = l.type(m);
            if (j === "function" || l.isWindow(m)) {
                return false
            }
            if (m.nodeType === 1 && k) {
                return true
            }
            return j === "array" || k === 0 || typeof k === "number" && k > 0 && (k - 1) in m
        }, each: function (p, q, k) {
            var n = this;
            if (this.isFunction(p)) {
                k = q;
                q = p;
                p = this
            }
            var o, l = 0, m = p.length, j = n.isArraylike(p);
            if (k) {
                if (j) {
                    for (; l < m; l++) {
                        o = q.apply(p[l], k);
                        if (o === false) {
                            break
                        }
                    }
                } else {
                    for (l in p) {
                        o = q.apply(p[l], k);
                        if (o === false) {
                            break
                        }
                    }
                }
            } else {
                if (j) {
                    for (; l < m; l++) {
                        o = q.call(p[l], l, p[l]);
                        if (o === false) {
                            break
                        }
                    }
                } else {
                    for (l in p) {
                        o = q.call(p[l], l, p[l]);
                        if (o === false) {
                            break
                        }
                    }
                }
            }
            return p
        }, queue: function (m, j, o) {
            var l = this;
            function k(p, r) {
                var q = r || [];
                if (p != null) {
                    if (l.isArraylike(Object(p))) {
                        (function (w, u) {
                            var s = +u.length, t = 0, v = w.length;
                            while (t < s) {
                                w[v++] = u[t++]
                            }
                            if (s !== s) {
                                while (u[t] !== undefined) {
                                    w[v++] = u[t++]
                                }
                            }
                            w.length = v;
                            return w
                        })(q, typeof p === "string" ? [p] : p)
                    } else {
                        [].push.call(q, p)
                    }
                }
                return q
            }
            if (!m) {
                return
            }
            j = (j || "fx") + "queue";
            var n = l.data(m, j);
            if (!o) {
                return n || []
            }
            if (!n || l.isArray(o)) {
                n = l.data(m, j, k(o))
            } else {
                n.push(o)
            }
            return n
        }, dequeue: function (j, k) {
            var l = this;
            l.each(j.nodeType ? [j] : j, function (n, p) {
                k = k || "fx";
                var m = l.queue(p, k), o = m.shift();
                if (o === "inprogress") {
                    o = m.shift()
                }
                if (o) {
                    if (k === "fx") {
                        m.unshift("inprogress")
                    }
                    o.call(p, function () {
                        l.dequeue(p, k)
                    })
                }
            })
        }, initAnimate: function () {
            var q = this;
            var l = q.element;
            var s = (function () {
                var F = 0;
                return f.requestAnimationFrame || f.webkitRequestAnimationFrame || f.mozRequestAnimationFrame || function (I) {
                    var G = (new Date()).getTime(), H;
                    H = Math.max(0, 16 - (G - F));
                    F = G + H;
                    return setTimeout(function () {
                        I(G + H)
                    }, H)
                }
            })();
            var o = 400, x = "easeInOutSine";
            var E = {State: {isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), isAndroid: /Android/i.test(navigator.userAgent), isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent), isChrome: f.chrome, isFirefox: /Firefox/i.test(navigator.userAgent), prefixElement: document.createElement("div"), prefixMatches: {}, scrollAnchor: null, scrollPropertyLeft: null, scrollPropertyTop: null, isTicking: false, calls: []}, CSS: {}, Utilities: $, Redirects: {}, Easings: {}, Promise: f.Promise, defaults: {queue: "", duration: o, easing: x, begin: undefined, complete: undefined, progress: undefined, display: undefined, visibility: undefined, loop: false, delay: false, mobileHA: true, _cacheValues: true}, init: function (F) {
                    q.data(F, "jqxAnimations", {isAnimating: false, computedStyle: null, tweensContainer: null, rootPropertyValueCache: {}, transformCache: {}})
                }, hook: null, mock: false, version: {major: 1, minor: 2, patch: 2}, debug: false};
            function m(G) {
                var F = q.data(G, "jqxAnimations");
                return F === null ? undefined : F
            }
            function u(F) {
                return function (G) {
                    return Math.round(G * F) * (1 / F)
                }
            }
            function k(K, O, I, N) {
                var ac = 4, J = 0.001, V = 1e-7, X = 10, aa = 11, ab = 1 / (aa - 1), ae = "Float32Array" in f;
                if (arguments.length !== 4) {
                    return false
                }
                for (var W = 0; W < 4; ++W) {
                    if (typeof arguments[W] !== "number" || isNaN(arguments[W]) || !isFinite(arguments[W])) {
                        return false
                    }
                }
                K = Math.min(K, 1);
                I = Math.min(I, 1);
                K = Math.max(K, 0);
                I = Math.max(I, 0);
                var M = ae ? new Float32Array(aa) : new Array(aa);
                function R(af, ag) {
                    return 1 - 3 * ag + 3 * af
                }
                function Q(af, ag) {
                    return 3 * ag - 6 * af
                }
                function P(af) {
                    return 3 * af
                }
                function H(ah, af, ag) {
                    return((R(af, ag) * ah + Q(af, ag)) * ah + P(af)) * ah
                }
                function ad(ah, af, ag) {
                    return 3 * R(af, ag) * ah * ah + 2 * Q(af, ag) * ah + P(af)
                }
                function G(ai, ag) {
                    for (var ah = 0; ah < ac; ++ah) {
                        var aj = ad(ag, K, I);
                        if (aj === 0) {
                            return ag
                        }
                        var af = H(ag, K, I) - ai;
                        ag -= af / aj
                    }
                    return ag
                }
                function U() {
                    for (var af = 0; af < aa; ++af) {
                        M[af] = H(af * ab, K, I)
                    }
                }
                function F(aj, ak, ai) {
                    var af, ah, ag = 0;
                    do {
                        ah = ak + (ai - ak) / 2;
                        af = H(ah, K, I) - aj;
                        if (af > 0) {
                            ai = ah
                        } else {
                            ak = ah
                        }
                    } while (Math.abs(af) > V && ++ag < X);
                    return ah
                }
                function Y(aj) {
                    var ak = 0, ai = 1, af = aa - 1;
                    for (; ai != af && M[ai] <= aj; ++ai) {
                        ak += ab
                    }
                    --ai;
                    var al = (aj - M[ai]) / (M[ai + 1] - M[ai]), ah = ak + al * ab, ag = ad(ah, K, I);
                    if (ag >= J) {
                        return G(aj, ah)
                    } else {
                        if (ag == 0) {
                            return ah
                        } else {
                            return F(aj, ak, ak + ab)
                        }
                    }
                }
                var S = false;
                function L() {
                    S = true;
                    if (K != O || I != N) {
                        U()
                    }
                }
                var Z = function (af) {
                    if (!S) {
                        L()
                    }
                    if (K === O && I === N) {
                        return af
                    }
                    if (af === 0) {
                        return 0
                    }
                    if (af === 1) {
                        return 1
                    }
                    return H(Y(af), O, N)
                };
                Z.getControlPoints = function () {
                    return[{x: K, y: O}, {x: I, y: N}]
                };
                var T = "generateBezier(" + [K, O, I, N] + ")";
                Z.toString = function () {
                    return T
                };
                return Z
            }
            var z = (function () {
                function H(J) {
                    return(-J.tension * J.x) - (J.friction * J.v)
                }
                function F(K, L, J) {
                    var M = {x: K.x + J.dx * L, v: K.v + J.dv * L, tension: K.tension, friction: K.friction};
                    return{dx: M.v, dv: H(M)}
                }
                function I(O, M) {
                    var K = {dx: O.v, dv: H(O)}, J = F(O, M * 0.5, K), Q = F(O, M * 0.5, J), P = F(O, M, Q), N = 1 / 6 * (K.dx + 2 * (J.dx + Q.dx) + P.dx), L = 1 / 6 * (K.dv + 2 * (J.dv + Q.dv) + P.dv);
                    O.x = O.x + N * M;
                    O.v = O.v + L * M;
                    return O
                }
                return function G(Q, K, L) {
                    var T = {x: -1, v: 0, tension: null, friction: null}, S = [0], M = 0, O = 1 / 10000, N = 16 / 1000, P, J, R;
                    Q = parseFloat(Q) || 500;
                    K = parseFloat(K) || 20;
                    L = L || null;
                    T.tension = Q;
                    T.friction = K;
                    P = L !== null;
                    if (P) {
                        M = G(Q, K);
                        J = M / L * N
                    } else {
                        J = N
                    }
                    while (true) {
                        R = I(R || T, J);
                        S.push(1 + R.x);
                        M += 16;
                        if (!(Math.abs(R.x) > O && Math.abs(R.v) > O)) {
                            break
                        }
                    }
                    return !P ? M : function (U) {
                        return S[(U * (S.length - 1)) | 0]
                    }
                }
            }());
            E.Easings = {linear: function (F) {
                    return F
                }, swing: function (F) {
                    return 0.5 - Math.cos(F * Math.PI) / 2
                }, spring: function (F) {
                    return 1 - (Math.cos(F * 4.5 * Math.PI) * Math.exp(-F * 6))
                }};
            q.each([["ease", [0.25, 0.1, 0.25, 1]], ["ease-in", [0.42, 0, 1, 1]], ["ease-out", [0, 0, 0.58, 1]], ["ease-in-out", [0.42, 0, 0.58, 1]], ["easeInSine", [0.47, 0, 0.745, 0.715]], ["easeOutSine", [0.39, 0.575, 0.565, 1]], ["easeInOutSine", [0.445, 0.05, 0.55, 0.95]], ["easeInQuad", [0.55, 0.085, 0.68, 0.53]], ["easeOutQuad", [0.25, 0.46, 0.45, 0.94]], ["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]], ["easeInCubic", [0.55, 0.055, 0.675, 0.19]], ["easeOutCubic", [0.215, 0.61, 0.355, 1]], ["easeInOutCubic", [0.645, 0.045, 0.355, 1]], ["easeInQuart", [0.895, 0.03, 0.685, 0.22]], ["easeOutQuart", [0.165, 0.84, 0.44, 1]], ["easeInOutQuart", [0.77, 0, 0.175, 1]], ["easeInQuint", [0.755, 0.05, 0.855, 0.06]], ["easeOutQuint", [0.23, 1, 0.32, 1]], ["easeInOutQuint", [0.86, 0, 0.07, 1]], ["easeInExpo", [0.95, 0.05, 0.795, 0.035]], ["easeOutExpo", [0.19, 1, 0.22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [0.6, 0.04, 0.98, 0.335]], ["easeOutCirc", [0.075, 0.82, 0.165, 1]], ["easeInOutCirc", [0.785, 0.135, 0.15, 0.86]]], function (F, G) {
                E.Easings[G[0]] = k.apply(null, G[1])
            });
            function w(F, G) {
                var H = F;
                if (t.isString(F)) {
                    if (!E.Easings[F]) {
                        H = false
                    }
                } else {
                    if (t.isArray(F) && F.length === 1) {
                        H = u.apply(null, F)
                    } else {
                        if (t.isArray(F) && F.length === 2) {
                            H = z.apply(null, F.concat([G]))
                        } else {
                            if (t.isArray(F) && F.length === 4) {
                                H = k.apply(null, F)
                            } else {
                                H = false
                            }
                        }
                    }
                }
                if (H === false) {
                    if (E.Easings[E.defaults.easing]) {
                        H = E.defaults.easing
                    } else {
                        H = x
                    }
                }
                return H
            }
            var v = E.CSS = {RegEx: {isHex: /^#([A-f\d]{3}){1,2}$/i, valueUnwrap: /^[A-z]+\((.*)\)$/i, wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/, valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig}, Hooks: {getRoot: function (F) {
                        return F
                    }, cleanRootPropertyValue: function (F, G) {
                        if (v.RegEx.valueUnwrap.test(G)) {
                            G = G.match(v.RegEx.valueUnwrap)[1]
                        }
                        if (v.Values.isCSSNullValue(G)) {
                            G = v.Hooks.templates[F][1]
                        }
                        return G
                    }, extractValue: function (I, H) {
                        var J = v.Hooks.registered[I];
                        if (J) {
                            var G = J[0], F = J[1];
                            H = v.Hooks.cleanRootPropertyValue(G, H);
                            return H.toString().match(v.RegEx.valueSplit)[F]
                        } else {
                            return H
                        }
                    }, injectValue: function (J, M, H) {
                        var L = v.Hooks.registered[J];
                        if (L) {
                            var G = L[0], F = L[1], K, I;
                            H = v.Hooks.cleanRootPropertyValue(G, H);
                            K = H.toString().match(v.RegEx.valueSplit);
                            K[F] = M;
                            I = K.join(" ");
                            return I
                        } else {
                            return H
                        }
                    }}, Normalizations: {registered: {clip: function (I, H, G) {
                            switch (I) {
                                case"name":
                                    return"clip";
                                case"extract":
                                    var F;
                                    if (v.RegEx.wrappedValueAlreadyExtracted.test(G)) {
                                        F = G
                                    } else {
                                        F = G.toString().match(v.RegEx.valueUnwrap);
                                        F = F ? F[1].replace(/,(\s+)?/g, " ") : G
                                    }
                                    return F;
                                case"inject":
                                    return"rect(" + G + ")"
                            }
                        }, blur: function (I, H, G) {
                            switch (I) {
                                case"name":
                                    return E.State.isFirefox ? "filter" : "-webkit-filter";
                                case"extract":
                                    var F = parseFloat(G);
                                    if (!(F || F === 0)) {
                                        var J = G.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                        if (J) {
                                            F = J[1]
                                        } else {
                                            F = 0
                                        }
                                    }
                                    return F;
                                case"inject":
                                    if (!parseFloat(G)) {
                                        return"none"
                                    } else {
                                        return"blur(" + G + ")"
                                    }
                            }
                        }, opacity: function (H, G, F) {
                            switch (H) {
                                case"name":
                                    return"opacity";
                                case"extract":
                                    return F;
                                case"inject":
                                    return F
                            }
                        }}, register: function () {}}, Names: {prefixCheck: function (G) {
                        var J = ["", "Webkit", "Moz", "ms", "O"];
                        for (var F = 0, H = J.length; F < H; F++) {
                            var I;
                            if (F === 0) {
                                I = G
                            } else {
                                I = J[F] + G.replace(/^\w/, function (K) {
                                    return K.toUpperCase()
                                })
                            }
                            if (t.isString(E.State.prefixElement.style[I])) {
                                E.State.prefixMatches[G] = I;
                                return[I, true]
                            }
                        }
                        return[G, false]
                    }}, Values: {isCSSNullValue: function (F) {
                        return(F == 0 || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(F))
                    }, getUnitType: function (F) {
                        if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(F)) {
                            return""
                        } else {
                            return"px"
                        }
                    }, getDisplayType: function (G) {
                        var F = G && G.tagName.toString().toLowerCase();
                        if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(F)) {
                            return"inline"
                        } else {
                            if (/^(li)$/i.test(F)) {
                                return"list-item"
                            } else {
                                if (/^(tr)$/i.test(F)) {
                                    return"table-row"
                                } else {
                                    if (/^(table)$/i.test(F)) {
                                        return"table"
                                    } else {
                                        if (/^(tbody)$/i.test(F)) {
                                            return"table-row-group"
                                        } else {
                                            return"block"
                                        }
                                    }
                                }
                            }
                        }
                    }}, getPropertyValue: function (I, K, H, J) {
                    function G(P, U) {
                        var Q = 0;
                        var T = false;
                        if (/^(width|height)$/.test(U) && v.getPropertyValue(P, "display") === 0) {
                            T = true;
                            v.setPropertyValue(P, "display", v.Values.getDisplayType(P))
                        }
                        function O() {
                            if (T) {
                                v.setPropertyValue(P, "display", "none")
                            }
                        }
                        if (!J) {
                            if (U === "height" && v.getPropertyValue(P, "boxSizing").toString().toLowerCase() !== "border-box") {
                                var N = P.offsetHeight - (parseFloat(v.getPropertyValue(P, "borderTopWidth")) || 0) - (parseFloat(v.getPropertyValue(P, "borderBottomWidth")) || 0) - (parseFloat(v.getPropertyValue(P, "paddingTop")) || 0) - (parseFloat(v.getPropertyValue(P, "paddingBottom")) || 0);
                                O();
                                return N
                            } else {
                                if (U === "width" && v.getPropertyValue(P, "boxSizing").toString().toLowerCase() !== "border-box") {
                                    var V = P.offsetWidth - (parseFloat(v.getPropertyValue(P, "borderLeftWidth")) || 0) - (parseFloat(v.getPropertyValue(P, "borderRightWidth")) || 0) - (parseFloat(v.getPropertyValue(P, "paddingLeft")) || 0) - (parseFloat(v.getPropertyValue(P, "paddingRight")) || 0);
                                    O();
                                    return V
                                }
                            }
                        }
                        var S;
                        if (m(P) === undefined) {
                            S = f.getComputedStyle(P, null)
                        } else {
                            if (!m(P).computedStyle) {
                                S = m(P).computedStyle = f.getComputedStyle(P, null)
                            } else {
                                S = m(P).computedStyle
                            }
                        }
                        Q = S[U];
                        if (Q === "" || Q === null) {
                            Q = P.style[U]
                        }
                        O();
                        if (Q === "auto" && /^(top|right|bottom|left)$/i.test(U)) {
                            var R = G(P, "position");
                            if (R === "fixed" || (R === "absolute" && /top|left/i.test(U))) {
                                Q = $(P).position()[U] + "px"
                            }
                        }
                        return Q
                    }
                    var F;
                    if (v.Normalizations.registered[K]) {
                        var L, M;
                        L = v.Normalizations.registered[K]("name", I);
                        M = G(I, v.Names.prefixCheck(L)[0]);
                        F = v.Normalizations.registered[K]("extract", I, M)
                    }
                    if (!/^[\d-]/.test(F)) {
                        F = G(I, v.Names.prefixCheck(K)[0])
                    }
                    if (v.Values.isCSSNullValue(F)) {
                        F = 0
                    }
                    return F
                }, setPropertyValue: function (I, J, F, H, K) {
                    var G = J;
                    if (v.Normalizations.registered[J]) {
                        F = v.Normalizations.registered[J]("inject", I, F);
                        J = v.Normalizations.registered[J]("name", I)
                    }
                    G = v.Names.prefixCheck(J)[0];
                    I.style[G] = F;
                    return[G, F]
                }};
            v.Normalizations.register();
            E.hook = function (I, G, F) {
                var H = undefined;
                I = p(I);
                q.each(I, function (K, J) {
                    if (m(J) === undefined) {
                        E.init(J)
                    }
                    if (F === undefined) {
                        if (H === undefined) {
                            H = E.CSS.getPropertyValue(J, G)
                        }
                    } else {
                        var L = E.CSS.setPropertyValue(J, G, F);
                        H = L
                    }
                });
                return H
            };
            function p(F) {
                if (t.isWrapped(F)) {
                    F = [].slice.call(F)
                } else {
                    if (t.isNode(F)) {
                        F = [F]
                    }
                }
                return F
            }
            var t = {isString: function (F) {
                    return(typeof F === "string")
                }, isArray: Array.isArray || function (F) {
                    return Object.prototype.toString.call(F) === "[object Array]"
                }, isFunction: function (F) {
                    return Object.prototype.toString.call(F) === "[object Function]"
                }, isNode: function (F) {
                    return F && F.nodeType
                }, isNodeList: function (F) {
                    return typeof F === "object" && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(F)) && F.length !== undefined && (F.length === 0 || (typeof F[0] === "object" && F[0].nodeType > 0))
                }, isWrapped: function (F) {
                    return false
                }, isSVG: function (F) {
                    return f.SVGElement && (F instanceof f.SVGElement)
                }, isEmptyObject: function (G) {
                    for (var F in G) {
                        return false
                    }
                    return true
                }};
            var n = function () {
                function H() {
                    return null
                }
                var M = (arguments[0] && (arguments[0].p || ((q.isPlainObject(arguments[0].properties) && !arguments[0].properties.names) || t.isString(arguments[0].properties)))), P, F, G;
                var N, Q, J;
                P = true;
                G = 1;
                N = M ? (arguments[0].elements || arguments[0].e) : arguments[0];
                N = p(N);
                if (!N) {
                    return
                }
                if (M) {
                    Q = arguments[0].properties || arguments[0].p;
                    J = arguments[0].options || arguments[0].o
                } else {
                    Q = arguments[G];
                    J = arguments[G + 1]
                }
                var Z = N.length, U = 0;
                if (!/^(stop|finish|finishAll)$/i.test(Q) && !q.isPlainObject(J)) {
                    var I = G + 1;
                    J = {};
                    for (var T = I; T < arguments.length; T++) {
                        if (!t.isArray(arguments[T]) && (/^(fast|normal|slow)$/i.test(arguments[T]) || /^\d/.test(arguments[T]))) {
                            J.duration = arguments[T]
                        } else {
                            if (t.isString(arguments[T]) || t.isArray(arguments[T])) {
                                J.easing = arguments[T]
                            } else {
                                if (t.isFunction(arguments[T])) {
                                    J.complete = arguments[T]
                                }
                            }
                        }
                    }
                }
                var S;
                switch (Q) {
                    case"finish":
                    case"finishAll":
                    case"stop":
                        q.each(N, function (ab, aa) {
                            if (m(aa) && m(aa).delayTimer) {
                                clearTimeout(m(aa).delayTimer.setTimeout);
                                if (m(aa).delayTimer.next) {
                                    m(aa).delayTimer.next()
                                }
                                delete m(aa).delayTimer
                            }
                            if (Q === "finishAll" && (J === true || t.isString(J))) {
                                q.each(q.queue(aa, t.isString(J) ? J : ""), function (ac, ad) {
                                    if (t.isFunction(ad)) {
                                        ad()
                                    }
                                });
                                q.queue(aa, t.isString(J) ? J : "", [])
                            }
                        });
                        var K = [];
                        q.each(E.State.calls, function (aa, ab) {
                            if (ab) {
                                q.each(ab[1], function (ac, ad) {
                                    var ae = (J === undefined) ? "" : J;
                                    if (ae !== true && (ab[2].queue !== ae) && !(J === undefined && ab[2].queue === false)) {
                                        return true
                                    }
                                    q.each(N, function (af, ag) {
                                        if (ag === ad) {
                                            if (J === true || t.isString(J)) {
                                                q.each(q.queue(ag, t.isString(J) ? J : ""), function (ah, ai) {
                                                    if (t.isFunction(ai)) {
                                                        ai(null, true)
                                                    }
                                                });
                                                q.queue(ag, t.isString(J) ? J : "", [])
                                            }
                                            if (Q === "stop") {
                                                if (m(ag) && m(ag).tweensContainer && ae !== false) {
                                                    q.each(m(ag).tweensContainer, function (ah, ai) {
                                                        ai.endValue = ai.currentValue
                                                    })
                                                }
                                                K.push(aa)
                                            } else {
                                                if (Q === "finish" || Q === "finishAll") {
                                                    ab[2].duration = 1
                                                }
                                            }
                                        }
                                    })
                                })
                            }
                        });
                        if (Q === "stop") {
                            q.each(K, function (ab, aa) {
                                B(aa, true)
                            })
                        }
                        return H();
                    default:
                        if (q.isPlainObject(Q) && !t.isEmptyObject(Q)) {
                            S = "start"
                        } else {
                            if (t.isString(Q) && E.Redirects[Q]) {
                                var O = q.extend({}, J), L = O.duration, Y = O.delay || 0;
                                if (O.backwards === true) {
                                    N = q.extend(true, [], N).reverse()
                                }
                                q.each(N, function (ab, aa) {
                                    if (parseFloat(O.stagger)) {
                                        O.delay = Y + (parseFloat(O.stagger) * ab)
                                    } else {
                                        if (t.isFunction(O.stagger)) {
                                            O.delay = Y + O.stagger.call(aa, ab, Z)
                                        }
                                    }
                                    if (O.drag) {
                                        O.duration = parseFloat(L) || (/^(callout|transition)/.test(Q) ? 1000 : o);
                                        O.duration = Math.max(O.duration * (O.backwards ? 1 - ab / Z : (ab + 1) / Z), O.duration * 0.75, 200)
                                    }
                                    E.Redirects[Q].call(aa, aa, O || {}, ab, Z, N, promiseData.promise ? promiseData : undefined)
                                });
                                return H()
                            } else {
                                var R = "jqxAnimations: First argument (" + Q + ") was not a property map, a known action, or a registered redirect. Aborting.";
                                console.log(R);
                                return H()
                            }
                        }
                }
                var X = {lastParent: null, lastPosition: null, lastFontSize: null, lastPercentToPxWidth: null, lastPercentToPxHeight: null, lastEmToPx: null, remToPx: null, vwToPx: null, vhToPx: null};
                var W = [];
                function V() {
                    var aa = this, ad = q.extend({}, E.defaults, J), ac = {}, ab;
                    if (m(aa) === undefined) {
                        E.init(aa)
                    }
                    ad.duration = parseFloat(ad.duration) || 1;
                    ad.easing = w(ad.easing, ad.duration);
                    if (ad.begin && !t.isFunction(ad.begin)) {
                        ad.begin = null
                    }
                    if (ad.progress && !t.isFunction(ad.progress)) {
                        ad.progress = null
                    }
                    if (ad.complete && !t.isFunction(ad.complete)) {
                        ad.complete = null
                    }
                    if (ad.display !== undefined && ad.display !== null) {
                        ad.display = ad.display.toString().toLowerCase();
                        if (ad.display === "auto") {
                            ad.display = E.CSS.Values.getDisplayType(aa)
                        }
                    }
                    if (ad.visibility !== undefined && ad.visibility !== null) {
                        ad.visibility = ad.visibility.toString().toLowerCase()
                    }
                    ad.mobileHA = (ad.mobileHA && E.State.isMobile && !E.State.isGingerbread);
                    function ae(ao) {
                        if (ad.begin && U === 0) {
                            try {
                                ad.begin.call(N, N)
                            } catch (aq) {
                                setTimeout(function () {
                                    throw aq
                                }, 1)
                            }
                        }
                        if (S === "start") {
                            var au;
                            if (m(aa).tweensContainer && m(aa).isAnimating === true) {
                                au = m(aa).tweensContainer
                            }
                            function an(ay, ax) {
                                var aw = undefined, aA = undefined, az = undefined;
                                if (t.isArray(ay)) {
                                    aw = ay[0];
                                    if ((!t.isArray(ay[1]) && /^[\d-]/.test(ay[1])) || t.isFunction(ay[1]) || v.RegEx.isHex.test(ay[1])) {
                                        az = ay[1]
                                    } else {
                                        if ((t.isString(ay[1]) && !v.RegEx.isHex.test(ay[1])) || t.isArray(ay[1])) {
                                            aA = ax ? ay[1] : w(ay[1], ad.duration);
                                            if (ay[2] !== undefined) {
                                                az = ay[2]
                                            }
                                        }
                                    }
                                } else {
                                    aw = ay
                                }
                                if (!ax) {
                                    aA = aA || ad.easing
                                }
                                if (t.isFunction(aw)) {
                                    aw = aw.call(aa, U, Z)
                                }
                                if (t.isFunction(az)) {
                                    az = az.call(aa, U, Z)
                                }
                                return[aw || 0, aA, az]
                            }
                            for (var av in Q) {
                                var af = an(Q[av]), at = af[0], ap = af[1], ag = af[2];
                                av = h.camelCase(av);
                                var ak = v.Hooks.getRoot(av), ar = false;
                                if (!m(aa).isSVG && ak !== "tween" && v.Names.prefixCheck(ak)[1] === false && v.Normalizations.registered[ak] === undefined) {
                                    if (E.debug) {
                                        console.log("Skipping [" + ak + "] due to a lack of browser support.")
                                    }
                                    continue
                                }
                                if (((ad.display !== undefined && ad.display !== null && ad.display !== "none") || (ad.visibility !== undefined && ad.visibility !== "hidden")) && /opacity|filter/.test(av) && !ag && at !== 0) {
                                    ag = 0
                                }
                                if (ad._cacheValues && au && au[av]) {
                                    if (ag === undefined) {
                                        ag = au[av].endValue + au[av].unitType
                                    }
                                    ar = m(aa).rootPropertyValueCache[ak]
                                } else {
                                    if (ag === undefined) {
                                        ag = v.getPropertyValue(aa, av)
                                    }
                                }
                                var am, al, aj, ai = false;
                                function ah(ay, ax) {
                                    var aw, az;
                                    az = (ax || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (aA) {
                                        aw = aA;
                                        return""
                                    });
                                    if (!aw) {
                                        aw = v.Values.getUnitType(ay)
                                    }
                                    return[az, aw]
                                }
                                am = ah(av, ag);
                                ag = am[0];
                                aj = am[1];
                                am = ah(av, at);
                                at = am[0].replace(/^([+-\/*])=/, function (ax, aw) {
                                    ai = aw;
                                    return""
                                });
                                al = am[1];
                                ag = parseFloat(ag) || 0;
                                at = parseFloat(at) || 0;
                                if (/[\/*]/.test(ai)) {
                                    al = aj
                                }
                                switch (ai) {
                                    case"+":
                                        at = ag + at;
                                        break;
                                    case"-":
                                        at = ag - at;
                                        break;
                                    case"*":
                                        at = ag * at;
                                        break;
                                    case"/":
                                        at = ag / at;
                                        break
                                }
                                ac[av] = {rootPropertyValue: ar, startValue: ag, currentValue: ag, endValue: at, unitType: al, easing: ap};
                                if (E.debug) {
                                    console.log("tweensContainer (" + av + "): " + JSON.stringify(ac[av]), aa)
                                }
                            }
                            ac.element = aa
                        }
                        if (ac.element) {
                            h(aa).addClass("jqxAnimations-animating");
                            W.push(ac);
                            if (ad.queue === "") {
                                m(aa).tweensContainer = ac;
                                m(aa).opts = ad
                            }
                            m(aa).isAnimating = true;
                            if (U === Z - 1) {
                                E.State.calls.push([W, N, ad, null]);
                                if (E.State.isTicking === false) {
                                    E.State.isTicking = true;
                                    A()
                                }
                            } else {
                                U++
                            }
                        }
                    }
                    q.queue(aa, ad.queue, function (ag, af) {
                        if (af === true) {
                            return true
                        }
                        E.jqxAnimationsQueueEntryFlag = true;
                        ae(ag)
                    });
                    if ((ad.queue === "" || ad.queue === "fx") && q.queue(aa)[0] !== "inprogress") {
                        q.dequeue(aa)
                    }
                }
                q.each(N, function (ab, aa) {
                    if (t.isNode(aa)) {
                        V.call(aa)
                    }
                });
                var O = q.extend({}, E.defaults, J);
                return H()
            };
            E = q.extend(n, E);
            E.animate = n;
            var D = f.requestAnimationFrame || s;
            if (!E.State.isMobile && document.hidden !== undefined) {
                document.addEventListener("visibilitychange", function () {
                    if (document.hidden) {
                        D = function (F) {
                            return setTimeout(function () {
                                F(true)
                            }, 16)
                        };
                        A()
                    } else {
                        D = f.requestAnimationFrame || s
                    }
                })
            }
            function A(G) {
                if (G) {
                    var U = (new Date).getTime();
                    var Z = E.State.calls.length;
                    for (var V = 0; V < Z; V++) {
                        if (!E.State.calls[V]) {
                            continue
                        }
                        var L = E.State.calls[V], Y = L[0], O = L[2], ab = L[3], X = !!ab, H = null;
                        if (!ab) {
                            ab = E.State.calls[V][3] = U - 16
                        }
                        var W = Math.min((U - ab) / O.duration, 1);
                        for (var S = 0, J = Y.length; S < J; S++) {
                            var Q = Y[S], F = Q.element;
                            if (!m(F)) {
                                continue
                            }
                            var P = false;
                            if (O.display !== undefined && O.display !== null && O.display !== "none") {
                                if (O.display === "flex") {
                                    var M = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                    q.each(M, function (ac, ad) {
                                        v.setPropertyValue(F, "display", ad)
                                    })
                                }
                                v.setPropertyValue(F, "display", O.display)
                            }
                            if (O.visibility !== undefined && O.visibility !== "hidden") {
                                v.setPropertyValue(F, "visibility", O.visibility)
                            }
                            for (var K in Q) {
                                if (K !== "element") {
                                    var I = Q[K], N, R = t.isString(I.easing) ? E.Easings[I.easing] : I.easing;
                                    if (W === 1) {
                                        N = I.endValue
                                    } else {
                                        var T = I.endValue - I.startValue;
                                        N = I.startValue + (T * R(W, O, T));
                                        if (!X && (N === I.currentValue)) {
                                            continue
                                        }
                                    }
                                    I.currentValue = N;
                                    if (K === "tween") {
                                        H = N
                                    } else {
                                        var aa = v.setPropertyValue(F, K, I.currentValue + (parseFloat(N) === 0 ? "" : I.unitType), I.rootPropertyValue, I.scrollData)
                                    }
                                }
                            }
                        }
                        if (O.display !== undefined && O.display !== "none") {
                            E.State.calls[V][2].display = false
                        }
                        if (O.visibility !== undefined && O.visibility !== "hidden") {
                            E.State.calls[V][2].visibility = false
                        }
                        if (O.progress) {
                            O.progress.call(L[1], L[1], W, Math.max(0, (ab + O.duration) - U), ab, H)
                        }
                        if (W === 1) {
                            B(V)
                        }
                    }
                }
                if (E.State.isTicking) {
                    D(A)
                }
            }
            function B(N, J) {
                if (!E.State.calls[N]) {
                    return false
                }
                var R = E.State.calls[N][0], F = E.State.calls[N][1], G = E.State.calls[N][2], I = E.State.calls[N][4];
                var O = false;
                for (var M = 0, H = R.length; M < H; M++) {
                    var L = R[M].element;
                    if (!J && !G.loop) {
                        if (G.display === "none") {
                            v.setPropertyValue(L, "display", G.display)
                        }
                        if (G.visibility === "hidden") {
                            v.setPropertyValue(L, "visibility", G.visibility)
                        }
                    }
                    if (G.loop !== true && (q.queue(L)[1] === undefined || !/\.jqxAnimationsQueueEntryFlag/i.test(q.queue(L)[1]))) {
                        if (m(L)) {
                            m(L).isAnimating = false;
                            m(L).rootPropertyValueCache = {};
                            h(L).removeClass("jqxAnimations-animating")
                        }
                    }
                    if (!J && G.complete && (M === H - 1)) {
                        try {
                            G.complete.call(F, F)
                        } catch (P) {
                            setTimeout(function () {
                                throw P
                            }, 1)
                        }
                    }
                    if (I && G.loop !== true) {
                        I(F)
                    }
                    if (G.queue !== false) {
                        q.dequeue(L, G.queue)
                    }
                }
                E.State.calls[N] = false;
                for (var K = 0, Q = E.State.calls.length; K < Q; K++) {
                    if (E.State.calls[K] !== false) {
                        O = true;
                        break
                    }
                }
                if (O === false) {
                    E.State.isTicking = false;
                    delete E.State.calls;
                    E.State.calls = []
                }
            }
            q.animate = function () {
                var F = Array.prototype.slice.call(arguments);
                F.splice(0, 0, q.element);
                return E.apply(q, F)
            };
            for (var y = 0; y < 2; y++) {
                var C = "Down";
                if (y === 1) {
                    C = "Up"
                }
                var r = function (F) {
                    q["slide" + F] = function (P, I, N, G, L) {
                        if (P === "fast") {
                            P = {duration: "200"}
                        }
                        if (P === "slow") {
                            P = {duration: "600"}
                        }
                        var H = q.extend({}, P), O = H.begin, M = H.complete, K = {height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: ""}, J = {};
                        if (H.display === undefined) {
                            H.display = (F === "Down" ? (E.CSS.Values.getDisplayType(l) === "inline" ? "inline-block" : "block") : "none")
                        }
                        H.begin = function () {
                            O && O.call(G, G);
                            for (var R in K) {
                                J[R] = l.style[R];
                                var Q = E.CSS.getPropertyValue(l, R);
                                K[R] = (F === "Down") ? [Q, 0] : [0, Q]
                            }
                            J.overflow = l.style.overflow;
                            l.style.overflow = "hidden"
                        };
                        H.complete = function () {
                            for (var Q in J) {
                                l.style[Q] = J[Q]
                            }
                            M && M.call(G, G);
                            L && L.resolver(G)
                        };
                        E(l, K, H)
                    }
                };
                r(C)
            }
            for (var y = 0; y < 2; y++) {
                var C = "In";
                if (y === 1) {
                    C = "Out"
                }
                var j = function (F) {
                    q["fade" + F] = function (Q, I, N, G, K) {
                        if (Q === "fast") {
                            Q = {duration: "200"}
                        }
                        if (Q === "slow") {
                            Q = {duration: "600"}
                        }
                        var H = q.extend({}, Q), O = H.begin, L = {opacity: ""}, M = {opacity: (F === "In") ? 1 : 0}, J = {}, P = H.complete;
                        if (I !== N - 1) {
                            H.complete = H.begin = null;
                            H.begin = function () {
                                O && O.call(G, G);
                                for (var S in L) {
                                    J[S] = l.style[S];
                                    var R = E.CSS.getPropertyValue(l, S);
                                    L[S] = (F === "In") ? [R, 1] : [0, R]
                                }
                            };
                            H.complete = function () {
                                for (var R in J) {
                                    l.style[R] = J[R]
                                }
                                if (P) {
                                    P.call(G, G)
                                }
                                K && K.resolver(G)
                            }
                        } else {
                            H.complete = function () {
                                if (P) {
                                    P.call(G, G)
                                }
                                K && K.resolver(G)
                            }
                        }
                        if (H.display === undefined) {
                            H.display = (F === "In" ? "auto" : "none")
                        }
                        E(q.element, M, H)
                    }
                };
                j(C)
            }
        }});
    h.fn = h.prototype;
    h.extend(h.fn, h);
    h.prototype.init.prototype = h;
    f.jqxHelper = h;
    var c = {};
    h.extend(c, {createEvent: function (j, l) {
            if (j.originalEvent) {
                return j
            }
            var k = h.extend({}, j);
            k.originalEvent = j;
            if (!k.target) {
                k.target = k.srcElement || document;
                if (l) {
                    k.target = targett
                }
            }
            if (k.target.nodeType === 3) {
                k.target = k.target.parentNode
            }
            k._isPropagationStopped = false;
            k._isDefaultPrevented = false;
            if (k.stopPropagation) {
                k.originalStopPropagation = k.stopPropagation;
                k.stopPropagation = function () {
                    this._isPropagationStopped = true;
                    k.originalEvent.stopPropagation();
                    k.cancelBubble = true
                }
            }
            if (k.preventDefault) {
                k.preventDefault = function () {
                    this._isDefaultPrevented = true;
                    return k.originalEvent.preventDefault()
                }
            }
            k.isDefaultPrevented = function () {
                return k._isDefaultPrevented
            };
            k.isPropagationStopped = function () {
                return k._isPropagationStopped
            };
            k.metaKey = !!k.metaKey;
            return k
        }, add: function (n, r, z, o) {
            var q = h;
            var s, p, A, y, x, v, j, w, k, m, u;
            if (n.nodeType === 3 || n.nodeType === 8 || !r || !z) {
                return
            }
            s = h(n).data(n[0]);
            if (!s) {
                h(n).data(n, "events", {});
                s = h(n).data(n)
            }
            A = s.events;
            if (!A) {
                s.events = A = {}
            }
            p = s.handle;
            if (!p) {
                s.handle = p = function (t) {
                    return c.dispatch.apply(p.elem, new Array(t, q))
                };
                p.elem = n
            }
            var l = /^([^\.]*|)(?:\.(.+)|)$/;
            r = q.trim(r).split(" ");
            for (y = 0; y < r.length; y++) {
                x = l.exec(r[y]) || [];
                v = x[1];
                j = (x[2] || "").split(".").sort();
                w = q.extend({type: v, origType: x[1], data: o, handler: z, guid: z.guid, namespace: j.join(".")}, k);
                m = A[v];
                if (!m) {
                    m = A[v] = [];
                    m.delegateCount = 0;
                    if (n.addEventListener) {
                        n.addEventListener(v, p, false)
                    } else {
                        if (n.attachEvent) {
                            n.attachEvent("on" + v, p)
                        }
                    }
                }
                m.push(w)
            }
            n = null
        }, global: {}, remove: function (C, x, l, A, u) {
            var s = h;
            var y, n, p, D, v, q, z, m, o, w, k;
            var B = s.data(C);
            var r = /^([^\.]*|)(?:\.(.+)|)$/;
            if (!B || !(m = B.events)) {
                return
            }
            x = s.trim(x).split(" ");
            for (y = 0; y < x.length; y++) {
                n = r.exec(x[y]) || [];
                p = D = n[1];
                v = n[2];
                if (!p) {
                    for (p in m) {
                        this.remove(C, p + x[y], l, A, true)
                    }
                    continue
                }
                w = m[p] || [];
                q = w.length;
                v = v ? new RegExp("(^|\\.)" + v.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (z = 0; z < w.length; z++) {
                    k = w[z];
                    if ((D === k.origType) && (!l || l.guid === k.guid) && (!v || v.test(k.namespace))) {
                        w.splice(z--, 1);
                        if (k.selector) {
                            w.delegateCount--
                        }
                    }
                }
                if (w.length === 0 && q !== w.length) {
                    this.removeEvent(C, p, B.handle);
                    delete m[p]
                }
            }
        }, trigger: function (k, r, p, z) {
            var u = h;
            if (p && (p.nodeType === 3 || p.nodeType === 8)) {
                return
            }
            var j, m, s, x, o, n, v, t, q, y, w = k.type || k, l = [];
            if (w.indexOf(".") >= 0) {
                l = w.split(".");
                w = l.shift();
                l.sort()
            }
            if (typeof k === "string") {
                k = document.createEvent("Event");
                k.initEvent(w, true, true)
            }
            k = c.createEvent(k);
            r = r != null ? u.makeArray(r) : [];
            r.unshift(k);
            k.type = w;
            k.isTrigger = true;
            k.namespace = l.join(".");
            k.namespace_re = k.namespace ? new RegExp("(^|\\.)" + l.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            n = w.indexOf(":") < 0 ? "on" + w : "";
            k.result = undefined;
            if (!k.target) {
                k.target = p
            }
            q = [[p, w]];
            if (!z && !u.isWindow(p)) {
                y = w;
                x = p.parentNode;
                for (o = p; x; x = x.parentNode) {
                    q.push([x, y]);
                    o = x
                }
                if (o === (p.ownerDocument || document)) {
                    q.push([o.defaultView || o.parentWindow || f, y])
                }
            }
            for (s = 0; s < q.length && !k.isPropagationStopped(); s++) {
                x = q[s][0];
                k.type = q[s][1];
                t = (u.data(x, "events") || {})[k.type] && u.data(x, "handle");
                if (t) {
                    t.apply(x, r)
                }
                t = n && x[n];
                if (t && jQuery.acceptData(x) && t.apply && t.apply(x, r) === false) {
                    k.preventDefault()
                }
            }
            k.type = w;
            if (!z && !k.isDefaultPrevented()) {
                if (n && p[w] || k.target.offsetWidth !== 0) {
                    o = p[n];
                    if (o) {
                        p[n] = null
                    }
                    if (p[w]) {
                        p[w]()
                    }
                    if (o) {
                        p[n] = o
                    }
                }
            }
            return k.result
        }, dispatch: function (y, k) {
            var r = k;
            var o = this;
            y = c.createEvent(y);
            var A, x, q, B, z, s, n, l, w, C, u = ((r.data(o, "events") || {})[y.type] || []), t = u.delegateCount, p = Array.prototype.slice.call(arguments), v = !y.namespace, m = [];
            m.push({elem: this, matches: u.slice(t)});
            for (A = 0; A < m.length; A++) {
                s = m[A];
                y.currentTarget = s.elem;
                for (x = 0; x < s.matches.length; x++) {
                    l = s.matches[x];
                    if (y.isPropagationStopped()) {
                        continue
                    }
                    if (v || (!y.namespace && !l.namespace) || y.namespace_re && y.namespace_re.test(l.namespace)) {
                        y.data = l.data;
                        y.handleObj = l;
                        B = l.handler.apply(s.elem, p);
                        if (B !== undefined) {
                            y.result = B;
                            if (B === false) {
                                y.preventDefault();
                                y.stopPropagation()
                            }
                        }
                    }
                }
            }
            return y.result
        }, removeEvent: document.removeEventListener ? function (k, j, l) {
            if (k.removeEventListener) {
                k.removeEventListener(j, l, false)
            }
        } : function (l, k, m) {
            var j = "on" + k;
            if (l.detachEvent) {
                if (typeof l[j] === "undefined") {
                    l[j] = null
                }
                l.detachEvent(j, m)
            }
        }});
    (function (o, j) {
        o = o;
        j = j || f;
        var p = [];
        var k = false;
        var n = false;
        function m() {
            if (!k) {
                k = true;
                for (var q = 0; q < p.length; q++) {
                    p[q].fn.call(f, p[q].ctx)
                }
                p = []
            }
        }
        function l() {
            if (document.readyState === "complete") {
                m()
            }
        }
        j[o] = function (r, q) {
            if (k) {
                setTimeout(function () {
                    r(q)
                }, 1);
                return
            } else {
                p.push({fn: r, ctx: q})
            }
            if (document.readyState === "complete") {
                setTimeout(m, 1)
            } else {
                if (!n) {
                    if (document.addEventListener) {
                        document.addEventListener("DOMContentLoaded", m, false);
                        f.addEventListener("load", m, false)
                    } else {
                        document.attachEvent("onreadystatechange", l);
                        f.attachEvent("onload", m)
                    }
                    n = true
                }
            }
        }
    })("initializeWidgets", f);
    h.prototype.ready = f.initializeWidgets;
    if (f.jQuery) {
        return
    }
    if (!f.$) {
        f.$ = f.minQuery = f.jqxHelper
    }
})(window);
var jqxBaseFramework = window.minQuery || window.jQuery;
(function (a) {
    a.jqx = a.jqx || {};
    jqwidgets = {createInstance: function (b, d, f) {
            if (d == "jqxDataAdapter") {
                var e = f[0];
                var c = f[1] || {};
                return new a.jqx.dataAdapter(e, c)
            }
            a(b)[d](f || {});
            return a(b)[d]("getInstance")
        }};
    a.jqx.define = function (b, c, d) {
        b[c] = function () {
            if (this.baseType) {
                this.base = new b[this.baseType]();
                this.base.defineInstance()
            }
            this.defineInstance();
            this.metaInfo()
        };
        b[c].prototype.defineInstance = function () {};
        b[c].prototype.metaInfo = function () {};
        b[c].prototype.base = null;
        b[c].prototype.baseType = undefined;
        if (d && b[d]) {
            b[c].prototype.baseType = d
        }
    };
    a.jqx.invoke = function (e, d) {
        if (d.length == 0) {
            return
        }
        var f = typeof (d) == Array || d.length > 0 ? d[0] : d;
        var c = typeof (d) == Array || d.length > 1 ? Array.prototype.slice.call(d, 1) : a({}).toArray();
        while (e[f] == undefined && e.base != null) {
            if (e[f] != undefined && a.isFunction(e[f])) {
                return e[f].apply(e, c)
            }
            if (typeof f == "string") {
                var b = f.toLowerCase();
                if (e[b] != undefined && a.isFunction(e[b])) {
                    return e[b].apply(e, c)
                }
            }
            e = e.base
        }
        if (e[f] != undefined && a.isFunction(e[f])) {
            return e[f].apply(e, c)
        }
        if (typeof f == "string") {
            var b = f.toLowerCase();
            if (e[b] != undefined && a.isFunction(e[b])) {
                return e[b].apply(e, c)
            }
        }
        return
    };
    a.jqx.hasProperty = function (c, b) {
        if (typeof (b) == "object") {
            for (var e in b) {
                var d = c;
                while (d) {
                    if (d.hasOwnProperty(e)) {
                        return true
                    }
                    if (d.hasOwnProperty(e.toLowerCase())) {
                        return true
                    }
                    d = d.base
                }
                return false
            }
        } else {
            while (c) {
                if (c.hasOwnProperty(b)) {
                    return true
                }
                if (c.hasOwnProperty(b.toLowerCase())) {
                    return true
                }
                c = c.base
            }
        }
        return false
    };
    a.jqx.hasFunction = function (e, d) {
        if (d.length == 0) {
            return false
        }
        if (e == undefined) {
            return false
        }
        var f = typeof (d) == Array || d.length > 0 ? d[0] : d;
        var c = typeof (d) == Array || d.length > 1 ? Array.prototype.slice.call(d, 1) : {};
        while (e[f] == undefined && e.base != null) {
            if (e[f] && a.isFunction(e[f])) {
                return true
            }
            if (typeof f == "string") {
                var b = f.toLowerCase();
                if (e[b] && a.isFunction(e[b])) {
                    return true
                }
            }
            e = e.base
        }
        if (e[f] && a.isFunction(e[f])) {
            return true
        }
        if (typeof f == "string") {
            var b = f.toLowerCase();
            if (e[b] && a.isFunction(e[b])) {
                return true
            }
        }
        return false
    };
    a.jqx.isPropertySetter = function (c, b) {
        if (b.length == 1 && typeof (b[0]) == "object") {
            return true
        }
        if (b.length == 2 && typeof (b[0]) == "string" && !a.jqx.hasFunction(c, b)) {
            return true
        }
        return false
    };
    a.jqx.validatePropertySetter = function (f, d, b) {
        if (!a.jqx.propertySetterValidation) {
            return true
        }
        if (d.length == 1 && typeof (d[0]) == "object") {
            for (var e in d[0]) {
                var g = f;
                while (!g.hasOwnProperty(e) && g.base) {
                    g = g.base
                }
                if (!g || !g.hasOwnProperty(e)) {
                    if (!b) {
                        var c = g.hasOwnProperty(e.toString().toLowerCase());
                        if (!c) {
                            throw"Invalid property: " + e
                        } else {
                            return true
                        }
                    }
                    return false
                }
            }
            return true
        }
        if (d.length != 2) {
            if (!b) {
                throw"Invalid property: " + d.length >= 0 ? d[0] : ""
            }
            return false
        }
        while (!f.hasOwnProperty(d[0]) && f.base) {
            f = f.base
        }
        if (!f || !f.hasOwnProperty(d[0])) {
            if (!b) {
                throw"Invalid property: " + d[0]
            }
            return false
        }
        return true
    };
    if (!Object.keys) {
        Object.keys = (function () {
            var d = Object.prototype.hasOwnProperty, e = !({toString: null}).propertyIsEnumerable("toString"), c = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], b = c.length;
            return function (h) {
                if (typeof h !== "object" && (typeof h !== "function" || h === null)) {
                    throw new TypeError("Object.keys called on non-object")
                }
                var f = [], j, g;
                for (j in h) {
                    if (d.call(h, j)) {
                        f.push(j)
                    }
                }
                if (e) {
                    for (g = 0; g < b; g++) {
                        if (d.call(h, c[g])) {
                            f.push(c[g])
                        }
                    }
                }
                return f
            }
        }())
    }
    a.jqx.set = function (e, h) {
        var c = 0;
        if (h.length == 1 && typeof (h[0]) == "object") {
            if (e.isInitialized && Object.keys && Object.keys(h[0]).length > 1) {
                var f = !e.base ? e.element : e.base.element;
                var b = a.data(f, e.widgetName).initArgs;
                if (b && JSON && JSON.stringify && h[0] && b[0]) {
                    try {
                        if (JSON.stringify(h[0]) == JSON.stringify(b[0])) {
                            var g = true;
                            a.each(h[0], function (l, m) {
                                if (e[l] != m) {
                                    g = false;
                                    return false
                                }
                            });
                            if (g) {
                                return
                            }
                        }
                    } catch (d) {
                    }
                }
                e.batchUpdate = h[0];
                var j = {};
                var k = {};
                a.each(h[0], function (l, m) {
                    var n = e;
                    while (!n.hasOwnProperty(l) && n.base != null) {
                        n = n.base
                    }
                    if (n.hasOwnProperty(l)) {
                        if (e[l] != m) {
                            j[l] = e[l];
                            k[l] = m;
                            c++
                        }
                    } else {
                        if (n.hasOwnProperty(l.toLowerCase())) {
                            if (e[l.toLowerCase()] != m) {
                                j[l.toLowerCase()] = e[l.toLowerCase()];
                                k[l.toLowerCase()] = m;
                                c++
                            }
                        }
                    }
                });
                if (c < 2) {
                    e.batchUpdate = null
                }
            }
            a.each(h[0], function (l, m) {
                var n = e;
                while (!n.hasOwnProperty(l) && n.base != null) {
                    n = n.base
                }
                if (n.hasOwnProperty(l)) {
                    a.jqx.setvalueraiseevent(n, l, m)
                } else {
                    if (n.hasOwnProperty(l.toLowerCase())) {
                        a.jqx.setvalueraiseevent(n, l.toLowerCase(), m)
                    } else {
                        if (a.jqx.propertySetterValidation) {
                            throw"jqxCore: invalid property '" + l + "'"
                        }
                    }
                }
            });
            if (e.batchUpdate != null) {
                e.batchUpdate = null;
                if (e.propertiesChangedHandler && c > 1) {
                    e.propertiesChangedHandler(e, j, k)
                }
            }
        } else {
            if (h.length == 2) {
                while (!e.hasOwnProperty(h[0]) && e.base) {
                    e = e.base
                }
                if (e.hasOwnProperty(h[0])) {
                    a.jqx.setvalueraiseevent(e, h[0], h[1])
                } else {
                    if (e.hasOwnProperty(h[0].toLowerCase())) {
                        a.jqx.setvalueraiseevent(e, h[0].toLowerCase(), h[1])
                    } else {
                        if (a.jqx.propertySetterValidation) {
                            throw"jqxCore: invalid property '" + h[0] + "'"
                        }
                    }
                }
            }
        }
    };
    a.jqx.setvalueraiseevent = function (c, d, e) {
        var b = c[d];
        c[d] = e;
        if (!c.isInitialized) {
            return
        }
        if (c.propertyChangedHandler != undefined) {
            c.propertyChangedHandler(c, d, b, e)
        }
        if (c.propertyChangeMap != undefined && c.propertyChangeMap[d] != undefined) {
            c.propertyChangeMap[d](c, d, b, e)
        }
    };
    a.jqx.get = function (e, d) {
        if (d == undefined || d == null) {
            return undefined
        }
        if (e.propertyMap) {
            var c = e.propertyMap(d);
            if (c != null) {
                return c
            }
        }
        if (e.hasOwnProperty(d)) {
            return e[d]
        }
        if (e.hasOwnProperty(d.toLowerCase())) {
            return e[d.toLowerCase()]
        }
        var b = undefined;
        if (typeof (d) == Array) {
            if (d.length != 1) {
                return undefined
            }
            b = d[0]
        } else {
            if (typeof (d) == "string") {
                b = d
            }
        }
        while (!e.hasOwnProperty(b) && e.base) {
            e = e.base
        }
        if (e) {
            return e[b]
        }
        return undefined
    };
    a.jqx.serialize = function (e) {
        var b = "";
        if (a.isArray(e)) {
            b = "[";
            for (var d = 0; d < e.length; d++) {
                if (d > 0) {
                    b += ", "
                }
                b += a.jqx.serialize(e[d])
            }
            b += "]"
        } else {
            if (typeof (e) == "object") {
                b = "{";
                var c = 0;
                for (var d in e) {
                    if (c++ > 0) {
                        b += ", "
                    }
                    b += d + ": " + a.jqx.serialize(e[d])
                }
                b += "}"
            } else {
                b = e.toString()
            }
        }
        return b
    };
    a.jqx.propertySetterValidation = true;
    a.jqx.jqxWidgetProxy = function (g, c, b) {
        var d = a(c);
        var f = a.data(c, g);
        if (f == undefined) {
            return undefined
        }
        var e = f.instance;
        if (a.jqx.hasFunction(e, b)) {
            return a.jqx.invoke(e, b)
        }
        if (a.jqx.isPropertySetter(e, b)) {
            if (a.jqx.validatePropertySetter(e, b)) {
                a.jqx.set(e, b);
                return undefined
            }
        } else {
            if (typeof (b) == "object" && b.length == 0) {
                return
            } else {
                if (typeof (b) == "object" && b.length == 1 && a.jqx.hasProperty(e, b[0])) {
                    return a.jqx.get(e, b[0])
                } else {
                    if (typeof (b) == "string" && a.jqx.hasProperty(e, b[0])) {
                        return a.jqx.get(e, b)
                    }
                }
            }
        }
        throw"jqxCore: Invalid parameter '" + a.jqx.serialize(b) + "' does not exist.";
        return undefined
    };
    a.jqx.applyWidget = function (c, d, k, l) {
        var g = false;
        try {
            g = window.MSApp != undefined
        } catch (f) {
        }
        var m = a(c);
        if (!l) {
            l = new a.jqx["_" + d]()
        } else {
            l.host = m;
            l.element = c
        }
        if (c.id == "") {
            c.id = a.jqx.utilities.createId()
        }
        var j = {host: m, element: c, instance: l, initArgs: k};
        l.widgetName = d;
        a.data(c, d, j);
        a.data(c, "jqxWidget", j.instance);
        var h = new Array();
        var l = j.instance;
        while (l) {
            l.isInitialized = false;
            h.push(l);
            l = l.base
        }
        h.reverse();
        h[0].theme = a.jqx.theme || "";
        a.jqx.jqxWidgetProxy(d, c, k);
        for (var b in h) {
            l = h[b];
            if (b == 0) {
                l.host = m;
                l.element = c;
                l.WinJS = g
            }
            if (l != undefined) {
                if (l.definedInstance) {
                    l.definedInstance()
                }
                if (l.createInstance != null) {
                    if (g) {
                        MSApp.execUnsafeLocalFunction(function () {
                            l.createInstance(k)
                        })
                    } else {
                        l.createInstance(k)
                    }
                }
            }
        }
        for (var b in h) {
            if (h[b] != undefined) {
                h[b].isInitialized = true
            }
        }
        if (g) {
            MSApp.execUnsafeLocalFunction(function () {
                j.instance.refresh(true)
            })
        } else {
            j.instance.refresh(true)
        }
    };
    a.jqx.jqxWidget = function (b, c, f) {
        var j = false;
        try {
            jqxArgs = Array.prototype.slice.call(f, 0)
        } catch (h) {
            jqxArgs = ""
        }
        try {
            j = window.MSApp != undefined
        } catch (h) {
        }
        var g = b;
        var l = "";
        if (c) {
            l = "_" + c
        }
        a.jqx.define(a.jqx, "_" + g, l);
        var k = new Array();
        if (!window[g]) {
            var d = function (m) {
                if (m == null) {
                    return""
                }
                var e = a.type(m);
                switch (e) {
                    case"string":
                    case"number":
                    case"date":
                    case"boolean":
                    case"bool":
                        if (m === null) {
                            return""
                        }
                        return m.toString()
                }
                var n = "";
                a.each(m, function (p, q) {
                    var s = q;
                    if (p > 0) {
                        n += ", "
                    }
                    n += "[";
                    var o = 0;
                    if (a.type(s) == "object") {
                        for (var r in s) {
                            if (o > 0) {
                                n += ", "
                            }
                            n += "{" + r + ":" + s[r] + "}";
                            o++
                        }
                    } else {
                        if (o > 0) {
                            n += ", "
                        }
                        n += "{" + p + ":" + s + "}";
                        o++
                    }
                    n += "]"
                });
                return n
            };
            jqwidgets[g] = window[g] = function (e, r) {
                var m = [];
                if (!r) {
                    r = {}
                }
                m.push(r);
                var n = e;
                if (a.type(n) === "object" && e[0]) {
                    n = e[0].id;
                    if (n === "") {
                        n = e[0].id = a.jqx.utilities.createId()
                    }
                } else {
                    if (a.type(e) === "object" && e && e.nodeName) {
                        n = e.id;
                        if (n === "") {
                            n = e.id = a.jqx.utilities.createId()
                        }
                    }
                }
                if (window.jqxWidgets && window.jqxWidgets[n]) {
                    if (r) {
                        a.each(window.jqxWidgets[n], function (s) {
                            var t = a(this.element).data();
                            if (t && t.jqxWidget) {
                                a(this.element)[g](r)
                            }
                        })
                    }
                    if (window.jqxWidgets[n].length == 1) {
                        var p = a(window.jqxWidgets[n][0].widgetInstance.element).data();
                        if (p && p.jqxWidget) {
                            return window.jqxWidgets[n][0]
                        }
                    }
                    var p = a(window.jqxWidgets[n][0].widgetInstance.element).data();
                    if (p && p.jqxWidget) {
                        return window.jqxWidgets[n]
                    }
                }
                var o = a(e);
                if (o.length === 0) {
                    o = a("<div></div>");
                    if (g === "jqxInput" || g === "jqxPasswordInput" || g === "jqxMaskedInput") {
                        o = a("<input/>")
                    }
                    if (g === "jqxTextArea") {
                        o = a("<textarea></textarea>")
                    }
                    if (g === "jqxButton" || g === "jqxRepeatButton" || g === "jqxToggleButton") {
                        o = a("<button/>")
                    }
                    if (g === "jqxSplitter") {
                        o = a("<div><div>Panel 1</div><div>Panel 2</div></div>")
                    }
                    if (g === "jqxTabs") {
                        o = a("<div><ul><li>Tab 1</li><li>Tab 2</li></ul><div>Content 1</div><div>Content 2</div></div>")
                    }
                    if (g === "jqxRibbon") {
                        o = a("<div><ul><li>Tab 1</li><li>Tab 2</li></ul><div><div>Content 1</div><div>Content 2</div></div></div>")
                    }
                    if (g === "jqxDocking") {
                        o = a("<div><div><div><div>Title 1</div><div>Content 1</div></div></div></div>")
                    }
                    if (g === "jqxWindow") {
                        o = a("<div><div>Title 1</div><div>Content 1</div></div>")
                    }
                }
                var q = [];
                a.each(o, function (v) {
                    var x = o[v];
                    a.jqx.applyWidget(x, g, m, undefined);
                    if (!k[g]) {
                        var t = a.data(x, "jqxWidget");
                        var w = a.jqx["_" + g].prototype.defineInstance();
                        var u = {};
                        if (a.jqx["_" + g].prototype.metaInfo) {
                            u = a.jqx["_" + g].prototype.metaInfo()
                        }
                        if (g == "jqxDockingLayout") {
                            w = a.extend(w, a.jqx._jqxLayout.prototype.defineInstance())
                        }
                        if (g == "jqxToggleButton" || g == "jqxRepeatButton") {
                            w = a.extend(w, a.jqx._jqxButton.prototype.defineInstance())
                        }
                        if (g == "jqxTreeGrid") {
                            w = a.extend(w, a.jqx._jqxDataTable.prototype.defineInstance())
                        }
                        var s = function (z) {
                            var y = a.data(z, "jqxWidget");
                            this.widgetInstance = y;
                            var A = a.extend(this, y);
                            A.on = function (C, D) {
                                A.addHandler(A.host, C, D)
                            };
                            A.off = function (C) {
                                A.removeHandler(A.host, C)
                            };
                            for (var B in y) {
                                if (a.type(y[B]) == "function") {
                                    A[B] = a.proxy(y[B], y)
                                }
                            }
                            return A
                        };
                        k[g] = s;
                        a.each(w, function (z, y) {
                            Object.defineProperty(s.prototype, z, {get: function () {
                                    if (this.widgetInstance) {
                                        return this.widgetInstance[z]
                                    }
                                    return y
                                }, set: function (G) {
                                    if (this.widgetInstance && this.widgetInstance[z] != G) {
                                        var E = this.widgetInstance[z];
                                        var D = G;
                                        var C = a.type(E);
                                        var A = a.type(D);
                                        var F = false;
                                        if (C != A || z === "source") {
                                            F = true
                                        }
                                        if (F || (d(E) != d(D))) {
                                            var B = {};
                                            B[z] = G;
                                            this.widgetInstance.host[g](B);
                                            this.widgetInstance[z] = G;
                                            if (this.widgetInstance.propertyUpdated) {
                                                this.widgetInstance.propertyUpdated(z, E, G)
                                            }
                                        }
                                    }
                                }})
                        })
                    }
                    var t = new k[g](x);
                    q.push(t);
                    if (!window.jqxWidgets) {
                        window.jqxWidgets = new Array()
                    }
                    if (!window.jqxWidgets[n]) {
                        window.jqxWidgets[n] = new Array()
                    }
                    window.jqxWidgets[n].push(t)
                });
                if (q.length === 1) {
                    return q[0]
                }
                return q
            }
        }
        a.fn[g] = function () {
            var e = Array.prototype.slice.call(arguments, 0);
            if (e.length == 0 || (e.length == 1 && typeof (e[0]) == "object")) {
                if (this.length == 0) {
                    if (this.selector) {
                        throw new Error("Invalid Selector - " + this.selector + "! Please, check whether the used ID or CSS Class name is correct.")
                    } else {
                        throw new Error("Invalid Selector! Please, check whether the used ID or CSS Class name is correct.")
                    }
                }
                return this.each(function () {
                    var p = a(this);
                    var o = this;
                    var q = a.data(o, g);
                    if (q == null) {
                        a.jqx.applyWidget(o, g, e, undefined)
                    } else {
                        a.jqx.jqxWidgetProxy(g, this, e)
                    }
                })
            } else {
                if (this.length == 0) {
                    if (this.selector) {
                        throw new Error("Invalid Selector - " + this.selector + "! Please, check whether the used ID or CSS Class name is correct.")
                    } else {
                        throw new Error("Invalid Selector! Please, check whether the used ID or CSS Class name is correct.")
                    }
                }
                var n = null;
                var m = 0;
                this.each(function () {
                    var o = a.jqx.jqxWidgetProxy(g, this, e);
                    if (m == 0) {
                        n = o;
                        m++
                    } else {
                        if (m == 1) {
                            var p = [];
                            p.push(n);
                            n = p
                        }
                        n.push(o)
                    }
                })
            }
            return n
        };
        try {
            a.extend(a.jqx["_" + g].prototype, Array.prototype.slice.call(f, 0)[0])
        } catch (h) {
        }
        a.extend(a.jqx["_" + g].prototype, {toThemeProperty: function (e, m) {
                return a.jqx.toThemeProperty(this, e, m)
            }});
        a.jqx["_" + g].prototype.refresh = function () {
            if (this.base) {
                this.base.refresh(true)
            }
        };
        a.jqx["_" + g].prototype.createInstance = function () {};
        a.jqx["_" + g].prototype.addEventHandler = function (m, e) {
            this.host.bind(m, e)
        };
        a.jqx["_" + g].prototype.removeEventHandler = function (m, e) {
            this.host.unbind(m)
        };
        a.jqx["_" + g].prototype.applyTo = function (n, m) {
            if (!(m instanceof Array)) {
                var e = [];
                e.push(m);
                m = e
            }
            a.jqx.applyWidget(n, g, m, this)
        };
        a.jqx["_" + g].prototype.getInstance = function () {
            return this
        };
        a.jqx["_" + g].prototype.propertyChangeMap = {};
        a.jqx["_" + g].prototype.addHandler = function (o, e, m, n) {
            a.jqx.addHandler(a(o), e, m, n)
        };
        a.jqx["_" + g].prototype.removeHandler = function (n, e, m) {
            a.jqx.removeHandler(a(n), e, m)
        };
        a.jqx["_" + g].prototype.setOptions = function () {
            if (!this.host || !this.host.length || this.host.length != 1) {
                return
            }
            return a.jqx.jqxWidgetProxy(g, this.host[0], arguments)
        }
    };
    a.jqx.toThemeProperty = function (c, d, h) {
        if (c.theme == "") {
            return d
        }
        var g = d.split(" ");
        var b = "";
        for (var f = 0; f < g.length; f++) {
            if (f > 0) {
                b += " "
            }
            var e = g[f];
            if (h != null && h) {
                b += e + "-" + c.theme
            } else {
                b += e + " " + e + "-" + c.theme
            }
        }
        return b
    };
    a.jqx.addHandler = function (g, h, e, f) {
        var c = h.split(" ");
        for (var b = 0; b < c.length; b++) {
            var d = c[b];
            if (window.addEventListener) {
                switch (d) {
                    case"mousewheel":
                        if (a.jqx.browser.mozilla) {
                            g[0].addEventListener("DOMMouseScroll", e, false)
                        } else {
                            g[0].addEventListener("mousewheel", e, false)
                        }
                        continue;
                    case"mousemove":
                        if (!f) {
                            g[0].addEventListener("mousemove", e, false);
                            continue
                        }
                        break
                }
            }
            if (f == undefined || f == null) {
                if (g.on) {
                    g.on(d, e)
                } else {
                    g.bind(d, e)
                }
            } else {
                if (g.on) {
                    g.on(d, f, e)
                } else {
                    g.bind(d, f, e)
                }
            }
        }
    };
    a.jqx.removeHandler = function (f, g, e) {
        if (!g) {
            if (f.off) {
                f.off()
            } else {
                f.unbind()
            }
            return
        }
        var c = g.split(" ");
        for (var b = 0; b < c.length; b++) {
            var d = c[b];
            if (window.removeEventListener) {
                switch (d) {
                    case"mousewheel":
                        if (a.jqx.browser.mozilla) {
                            f[0].removeEventListener("DOMMouseScroll", e, false)
                        } else {
                            f[0].removeEventListener("mousewheel", e, false)
                        }
                        continue;
                    case"mousemove":
                        if (e) {
                            f[0].removeEventListener("mousemove", e, false);
                            continue
                        }
                        break
                }
            }
            if (d == undefined) {
                if (f.off) {
                    f.off()
                } else {
                    f.unbind()
                }
                continue
            }
            if (e == undefined) {
                if (f.off) {
                    f.off(d)
                } else {
                    f.unbind(d)
                }
            } else {
                if (f.off) {
                    f.off(d, e)
                } else {
                    f.unbind(d, e)
                }
            }
        }
    };
    a.jqx.theme = a.jqx.theme || "";
    a.jqx.scrollAnimation = a.jqx.scrollAnimation || false;
    a.jqx.resizeDelay = a.jqx.resizeDelay || 10;
    a.jqx.ready = function () {
        a(window).trigger("jqxReady")
    };
    a.jqx.init = function () {
        a.each(arguments[0], function (b, c) {
            if (b == "theme") {
                a.jqx.theme = c
            }
            if (b == "scrollBarSize") {
                a.jqx.utilities.scrollBarSize = c
            }
            if (b == "touchScrollBarSize") {
                a.jqx.utilities.touchScrollBarSize = c
            }
            if (b == "scrollBarButtonsVisibility") {
                a.jqx.utilities.scrollBarButtonsVisibility = c
            }
        })
    };
    a.jqx.utilities = a.jqx.utilities || {};
    a.extend(a.jqx.utilities, {scrollBarSize: 15, touchScrollBarSize: 0, scrollBarButtonsVisibility: "visible", createId: function () {
            var b = function () {
                return(((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
            };
            return"jqxWidget" + b() + b()
        }, setTheme: function (f, g, e) {
            if (typeof e === "undefined") {
                return
            }
            if (!e[0].className.split) {
                return
            }
            var h = e[0].className.split(" "), b = [], j = [], d = e.children();
            for (var c = 0; c < h.length; c += 1) {
                if (h[c].indexOf(f) >= 0) {
                    if (f.length > 0) {
                        b.push(h[c]);
                        j.push(h[c].replace(f, g))
                    } else {
                        j.push(h[c].replace("-" + g, "") + "-" + g)
                    }
                }
            }
            this._removeOldClasses(b, e);
            this._addNewClasses(j, e);
            for (var c = 0; c < d.length; c += 1) {
                this.setTheme(f, g, a(d[c]))
            }
        }, _removeOldClasses: function (d, c) {
            for (var b = 0; b < d.length; b += 1) {
                c.removeClass(d[b])
            }
        }, _addNewClasses: function (d, c) {
            for (var b = 0; b < d.length; b += 1) {
                c.addClass(d[b])
            }
        }, getOffset: function (b) {
            var d = a.jqx.mobile.getLeftPos(b[0]);
            var c = a.jqx.mobile.getTopPos(b[0]);
            return{top: c, left: d}
        }, resize: function (g, s, p, o) {
            if (o === undefined) {
                o = true
            }
            var l = -1;
            var k = this;
            var d = function (u) {
                if (!k.hiddenWidgets) {
                    return -1
                }
                var v = -1;
                for (var t = 0; t < k.hiddenWidgets.length; t++) {
                    if (u.id) {
                        if (k.hiddenWidgets[t].id == u.id) {
                            v = t;
                            break
                        }
                    } else {
                        if (k.hiddenWidgets[t].id == u[0].id) {
                            v = t;
                            break
                        }
                    }
                }
                return v
            };
            if (this.resizeHandlers) {
                for (var h = 0; h < this.resizeHandlers.length; h++) {
                    if (g.id) {
                        if (this.resizeHandlers[h].id == g.id) {
                            l = h;
                            break
                        }
                    } else {
                        if (this.resizeHandlers[h].id == g[0].id) {
                            l = h;
                            break
                        }
                    }
                }
                if (p === true) {
                    if (l != -1) {
                        this.resizeHandlers.splice(l, 1)
                    }
                    if (this.resizeHandlers.length == 0) {
                        var n = a(window);
                        if (n.off) {
                            n.off("resize.jqx");
                            n.off("orientationchange.jqx");
                            n.off("orientationchanged.jqx")
                        } else {
                            n.unbind("resize.jqx");
                            n.unbind("orientationchange.jqx");
                            n.unbind("orientationchanged.jqx")
                        }
                        this.resizeHandlers = null
                    }
                    var b = d(g);
                    if (b != -1 && this.hiddenWidgets) {
                        this.hiddenWidgets.splice(b, 1)
                    }
                    return
                }
            } else {
                if (p === true) {
                    var b = d(g);
                    if (b != -1 && this.hiddenWidgets) {
                        this.hiddenWidgets.splice(b, 1)
                    }
                    return
                }
            }
            var k = this;
            var m = function (v, E) {
                if (!k.resizeHandlers) {
                    return
                }
                var F = function (J) {
                    var I = -1;
                    var K = J.parentNode;
                    while (K) {
                        I++;
                        K = K.parentNode
                    }
                    return I
                };
                var u = function (L, J) {
                    if (!L.widget || !J.widget) {
                        return 0
                    }
                    var K = F(L.widget[0]);
                    var I = F(J.widget[0]);
                    try {
                        if (K < I) {
                            return -1
                        }
                        if (K > I) {
                            return 1
                        }
                    } catch (M) {
                        var N = M
                    }
                    return 0
                };
                var w = function (J) {
                    if (k.hiddenWidgets.length > 0) {
                        k.hiddenWidgets.sort(u);
                        var I = function () {
                            var L = false;
                            var N = new Array();
                            for (var M = 0; M < k.hiddenWidgets.length; M++) {
                                var K = k.hiddenWidgets[M];
                                if (a.jqx.isHidden(K.widget)) {
                                    L = true;
                                    N.push(K)
                                } else {
                                    if (K.callback) {
                                        K.callback(E)
                                    }
                                }
                            }
                            k.hiddenWidgets = N;
                            if (!L) {
                                clearInterval(k.__resizeInterval)
                            }
                        };
                        if (J == false) {
                            I();
                            if (k.__resizeInterval) {
                                clearInterval(k.__resizeInterval)
                            }
                            return
                        }
                        if (k.__resizeInterval) {
                            clearInterval(k.__resizeInterval)
                        }
                        k.__resizeInterval = setInterval(function () {
                            I()
                        }, 100)
                    }
                };
                if (k.hiddenWidgets && k.hiddenWidgets.length > 0) {
                    w(false)
                }
                k.hiddenWidgets = new Array();
                k.resizeHandlers.sort(u);
                for (var B = 0; B < k.resizeHandlers.length; B++) {
                    var H = k.resizeHandlers[B];
                    var D = H.widget;
                    var A = H.data;
                    if (!A) {
                        continue
                    }
                    if (!A.jqxWidget) {
                        continue
                    }
                    var t = A.jqxWidget.width;
                    var G = A.jqxWidget.height;
                    if (A.jqxWidget.base) {
                        if (t == undefined) {
                            t = A.jqxWidget.base.width
                        }
                        if (G == undefined) {
                            G = A.jqxWidget.base.height
                        }
                    }
                    if (t === undefined && G === undefined) {
                        t = A.jqxWidget.element.style.width;
                        G = A.jqxWidget.element.style.height
                    }
                    var C = false;
                    if (t != null && t.toString().indexOf("%") != -1) {
                        C = true
                    }
                    if (G != null && G.toString().indexOf("%") != -1) {
                        C = true
                    }
                    if (a.jqx.isHidden(D)) {
                        if (d(D) === -1) {
                            if (C || v === true) {
                                if (H.data.nestedWidget !== true) {
                                    k.hiddenWidgets.push(H)
                                }
                            }
                        }
                    } else {
                        if (v === undefined || v !== true) {
                            if (C) {
                                H.callback(E);
                                if (k.watchedElementData) {
                                    for (var y = 0; y < k.watchedElementData.length; y++) {
                                        if (k.watchedElementData[y].element == A.jqxWidget.element) {
                                            k.watchedElementData[y].offsetWidth = A.jqxWidget.element.offsetWidth;
                                            k.watchedElementData[y].offsetHeight = A.jqxWidget.element.offsetHeight;
                                            break
                                        }
                                    }
                                }
                                if (k.hiddenWidgets.indexOf(H) >= 0) {
                                    k.hiddenWidgets.splice(k.hiddenWidgets.indexOf(H), 1)
                                }
                            }
                            if (A.jqxWidget.element) {
                                var x = A.jqxWidget.element.className;
                                if (x.indexOf("dropdownlist") >= 0 || x.indexOf("datetimeinput") >= 0 || x.indexOf("combobox") >= 0 || x.indexOf("menu") >= 0) {
                                    if (A.jqxWidget.isOpened) {
                                        var z = A.jqxWidget.isOpened();
                                        if (z) {
                                            if (E && E == "resize" && a.jqx.mobile.isTouchDevice()) {
                                                continue
                                            }
                                            A.jqxWidget.close()
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                w()
            };
            if (!this.resizeHandlers) {
                this.resizeHandlers = new Array();
                var n = a(window);
                if (n.on) {
                    this._resizeTimer = null;
                    this._initResize = null;
                    n.on("resize.jqx", function (t) {
                        if (k._resizeTimer != undefined) {
                            clearTimeout(k._resizeTimer)
                        }
                        if (!k._initResize) {
                            k._initResize = true;
                            m(null, "resize")
                        } else {
                            k._resizeTimer = setTimeout(function () {
                                m(null, "resize")
                            }, a.jqx.resizeDelay)
                        }
                    });
                    n.on("orientationchange.jqx", function (t) {
                        m(null, "orientationchange")
                    });
                    n.on("orientationchanged.jqx", function (t) {
                        m(null, "orientationchange")
                    })
                } else {
                    n.bind("resize.jqx", function (t) {
                        m(null, "orientationchange")
                    });
                    n.bind("orientationchange.jqx", function (t) {
                        m(null, "orientationchange")
                    });
                    n.bind("orientationchanged.jqx", function (t) {
                        m(null, "orientationchange")
                    })
                }
            }
            var e = g.data();
            if (o) {
                if (l === -1) {
                    this.resizeHandlers.push({id: g[0].id, widget: g, callback: s, data: e})
                }
            }
            try {
                var c = e.jqxWidget.width;
                var r = e.jqxWidget.height;
                if (e.jqxWidget.base) {
                    if (c == undefined) {
                        c = e.jqxWidget.base.width
                    }
                    if (r == undefined) {
                        r = e.jqxWidget.base.height
                    }
                }
                if (c === undefined && r === undefined) {
                    c = e.jqxWidget.element.style.width;
                    r = e.jqxWidget.element.style.height
                }
                var j = false;
                if (c != null && c.toString().indexOf("%") != -1) {
                    j = true
                }
                if (r != null && r.toString().indexOf("%") != -1) {
                    j = true
                }
                if (j) {
                    if (!this.watchedElementData) {
                        this.watchedElementData = []
                    }
                    var k = this;
                    var f = function (t) {
                        if (k.watchedElementData.forEach) {
                            k.watchedElementData.forEach(function (u) {
                                if (u.element.offsetWidth !== u.offsetWidth || u.element.offsetHeight !== u.offsetHeight) {
                                    u.offsetWidth = u.element.offsetWidth;
                                    u.offsetHeight = u.element.offsetHeight;
                                    if (u.timer) {
                                        clearTimeout(u.timer)
                                    }
                                    u.timer = setTimeout(function () {
                                        if (!a.jqx.isHidden(a(u.element))) {
                                            u.callback()
                                        } else {
                                            u.timer = setInterval(function () {
                                                if (!a.jqx.isHidden(a(u.element))) {
                                                    clearInterval(u.timer);
                                                    u.callback()
                                                }
                                            }, 100)
                                        }
                                    })
                                }
                            })
                        }
                    };
                    k.watchedElementData.push({element: g[0], offsetWidth: g[0].offsetWidth, offsetHeight: g[0].offsetHeight, callback: s});
                    if (!k.observer) {
                        k.observer = new MutationObserver(f);
                        k.observer.observe(document.body, {attributes: true, childList: true, characterData: true})
                    }
                }
            } catch (q) {
            }
            if (a.jqx.isHidden(g) && o === true) {
                m(true)
            }
            a.jqx.resize = function () {
                m(null, "resize")
            }
        }, parseJSON: function (d) {
            if (!d || typeof d !== "string") {
                return null
            }
            var b = /^[\],:{}\s]*$/, f = /(?:^|:|,)(?:\s*\[)+/g, c = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, e = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g;
            d = a.trim(d);
            if (window.JSON && window.JSON.parse) {
                return window.JSON.parse(d)
            }
            if (b.test(d.replace(c, "@").replace(e, "]").replace(f, ""))) {
                return(new Function("return " + d))()
            }
            throw new Error("Invalid JSON: " + d)
        }, html: function (c, d) {
            if (!a(c).on) {
                return a(c).html(d)
            }
            try {
                return a.access(c, function (s) {
                    var f = c[0] || {}, m = 0, j = c.length;
                    if (s === undefined) {
                        return f.nodeType === 1 ? f.innerHTML.replace(rinlinejQuery, "") : undefined
                    }
                    var r = /<(?:script|style|link)/i, n = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", h = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, p = /<([\w:]+)/, g = /<(?:script|object|embed|option|style)/i, k = new RegExp("<(?:" + n + ")[\\s/>]", "i"), q = /^\s+/, t = {option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""]};
                    if (typeof s === "string" && !r.test(s) && (a.support.htmlSerialize || !k.test(s)) && (a.support.leadingWhitespace || !q.test(s)) && !t[(p.exec(s) || ["", ""])[1].toLowerCase()]) {
                        s = s.replace(h, "<$1></$2>");
                        try {
                            for (; m < j; m++) {
                                f = this[m] || {};
                                if (f.nodeType === 1) {
                                    a.cleanData(f.getElementsByTagName("*"));
                                    f.innerHTML = s
                                }
                            }
                            f = 0
                        } catch (o) {
                        }
                    }
                    if (f) {
                        c.empty().append(s)
                    }
                }, null, d, arguments.length)
            } catch (b) {
                return a(c).html(d)
            }
        }, hasTransform: function (d) {
            var c = "";
            c = d.css("transform");
            if (c == "" || c == "none") {
                c = d.parents().css("transform");
                if (c == "" || c == "none") {
                    var b = a.jqx.utilities.getBrowser();
                    if (b.browser == "msie") {
                        c = d.css("-ms-transform");
                        if (c == "" || c == "none") {
                            c = d.parents().css("-ms-transform")
                        }
                    } else {
                        if (b.browser == "chrome") {
                            c = d.css("-webkit-transform");
                            if (c == "" || c == "none") {
                                c = d.parents().css("-webkit-transform")
                            }
                        } else {
                            if (b.browser == "opera") {
                                c = d.css("-o-transform");
                                if (c == "" || c == "none") {
                                    c = d.parents().css("-o-transform")
                                }
                            } else {
                                if (b.browser == "mozilla") {
                                    c = d.css("-moz-transform");
                                    if (c == "" || c == "none") {
                                        c = d.parents().css("-moz-transform")
                                    }
                                }
                            }
                        }
                    }
                } else {
                    return c != "" && c != "none"
                }
            }
            if (c == "" || c == "none") {
                c = a(document.body).css("transform")
            }
            return c != "" && c != "none" && c != null
        }, getBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = /(chrome)[ \/]([\w.]+)/.exec(c) || /(webkit)[ \/]([\w.]+)/.exec(c) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(c) || /(msie) ([\w.]+)/.exec(c) || c.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(c) || [];
            var d = {browser: b[1] || "", version: b[2] || "0"};
            if (c.indexOf("rv:11.0") >= 0 && c.indexOf(".net4.0c") >= 0) {
                d.browser = "msie";
                d.version = "11";
                b[1] = "msie"
            }
            if (c.indexOf("edge") >= 0) {
                d.browser = "msie";
                d.version = "12";
                b[1] = "msie"
            }
            d[b[1]] = b[1];
            return d
        }});
    a.jqx.browser = a.jqx.utilities.getBrowser();
    a.jqx.isHidden = function (c) {
        if (!c || !c[0]) {
            return false
        }
        var b = c[0].offsetWidth, d = c[0].offsetHeight;
        if (b === 0 || d === 0) {
            return true
        } else {
            return false
        }
    };
    a.jqx.ariaEnabled = true;
    a.jqx.aria = function (c, e, d) {
        if (!a.jqx.ariaEnabled) {
            return
        }
        if (e == undefined) {
            a.each(c.aria, function (g, h) {
                var k = !c.base ? c.host.attr(g) : c.base.host.attr(g);
                if (k != undefined && !a.isFunction(k)) {
                    var j = k;
                    switch (h.type) {
                        case"number":
                            j = new Number(k);
                            if (isNaN(j)) {
                                j = k
                            }
                            break;
                        case"boolean":
                            j = k == "true" ? true : false;
                            break;
                        case"date":
                            j = new Date(k);
                            if (j == "Invalid Date" || isNaN(j)) {
                                j = k
                            }
                            break
                    }
                    c[h.name] = j
                } else {
                    var k = c[h.name];
                    if (a.isFunction(k)) {
                        k = c[h.name]()
                    }
                    if (k == undefined) {
                        k = ""
                    }
                    try {
                        !c.base ? c.host.attr(g, k.toString()) : c.base.host.attr(g, k.toString())
                    } catch (f) {
                    }
                }
            })
        } else {
            try {
                if (c.host) {
                    if (!c.base) {
                        if (c.host) {
                            if (c.element.setAttribute) {
                                c.element.setAttribute(e, d.toString())
                            } else {
                                c.host.attr(e, d.toString())
                            }
                        } else {
                            c.attr(e, d.toString())
                        }
                    } else {
                        if (c.base.host) {
                            c.base.host.attr(e, d.toString())
                        } else {
                            c.attr(e, d.toString())
                        }
                    }
                } else {
                    if (c.setAttribute) {
                        c.setAttribute(e, d.toString())
                    }
                }
            } catch (b) {
            }
        }
    };
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (c) {
            var b = this.length;
            var d = Number(arguments[1]) || 0;
            d = (d < 0) ? Math.ceil(d) : Math.floor(d);
            if (d < 0) {
                d += b
            }
            for (; d < b; d++) {
                if (d in this && this[d] === c) {
                    return d
                }
            }
            return -1
        }
    }
    a.jqx.mobile = a.jqx.mobile || {};
    a.jqx.position = function (b) {
        var e = parseInt(b.pageX);
        var d = parseInt(b.pageY);
        if (a.jqx.mobile.isTouchDevice()) {
            var c = a.jqx.mobile.getTouches(b);
            var f = c[0];
            e = parseInt(f.pageX);
            d = parseInt(f.pageY)
        }
        return{left: e, top: d}
    };
    a.extend(a.jqx.mobile, {_touchListener: function (h, f) {
            var b = function (j, l) {
                var k = document.createEvent("MouseEvents");
                k.initMouseEvent(j, l.bubbles, l.cancelable, l.view, l.detail, l.screenX, l.screenY, l.clientX, l.clientY, l.ctrlKey, l.altKey, l.shiftKey, l.metaKey, l.button, l.relatedTarget);
                k._pageX = l.pageX;
                k._pageY = l.pageY;
                return k
            };
            var g = {mousedown: "touchstart", mouseup: "touchend", mousemove: "touchmove"};
            var d = b(g[h.type], h);
            h.target.dispatchEvent(d);
            var c = h.target["on" + g[h.type]];
            if (typeof c === "function") {
                c(h)
            }
        }, setMobileSimulator: function (c, e) {
            if (this.isTouchDevice()) {
                return
            }
            this.simulatetouches = true;
            if (e == false) {
                this.simulatetouches = false
            }
            var d = {mousedown: "touchstart", mouseup: "touchend", mousemove: "touchmove"};
            var b = this;
            if (window.addEventListener) {
                var f = function () {
                    for (var g in d) {
                        if (c.addEventListener) {
                            c.removeEventListener(g, b._touchListener);
                            c.addEventListener(g, b._touchListener, false)
                        }
                    }
                };
                if (a.jqx.browser.msie) {
                    f()
                } else {
                    f()
                }
            }
        }, isTouchDevice: function () {
            if (this.touchDevice != undefined) {
                return this.touchDevice
            }
            var c = "Browser CodeName: " + navigator.appCodeName + "";
            c += "Browser Name: " + navigator.appName + "";
            c += "Browser Version: " + navigator.appVersion + "";
            c += "Platform: " + navigator.platform + "";
            c += "User-agent header: " + navigator.userAgent + "";
            if (c.indexOf("Android") != -1) {
                return true
            }
            if (c.indexOf("IEMobile") != -1) {
                return true
            }
            if (c.indexOf("Windows Phone") != -1) {
                return true
            }
            if (c.indexOf("WPDesktop") != -1) {
                return true
            }
            if (c.indexOf("ZuneWP7") != -1) {
                return true
            }
            if (c.indexOf("BlackBerry") != -1 && c.indexOf("Mobile Safari") != -1) {
                return true
            }
            if (c.indexOf("ipod") != -1) {
                return true
            }
            if (c.indexOf("nokia") != -1 || c.indexOf("Nokia") != -1) {
                return true
            }
            if (c.indexOf("Chrome/17") != -1) {
                return false
            }
            if (c.indexOf("CrOS") != -1) {
                return false
            }
            if (c.indexOf("Opera") != -1 && c.indexOf("Mobi") == -1 && c.indexOf("Mini") == -1 && c.indexOf("Platform: Win") != -1) {
                return false
            }
            if (c.indexOf("Opera") != -1 && c.indexOf("Mobi") != -1 && c.indexOf("Opera Mobi") != -1) {
                return true
            }
            var d = {ios: "i(?:Pad|Phone|Pod)(?:.*)CPU(?: iPhone)? OS ", android: "(Android |HTC_|Silk/)", blackberry: "BlackBerry(?:.*)Version/", rimTablet: "RIM Tablet OS ", webos: "(?:webOS|hpwOS)/", bada: "Bada/"};
            try {
                if (this.touchDevice != undefined) {
                    return this.touchDevice
                }
                this.touchDevice = false;
                for (i in d) {
                    if (d.hasOwnProperty(i)) {
                        prefix = d[i];
                        match = c.match(new RegExp("(?:" + prefix + ")([^\\s;]+)"));
                        if (match) {
                            if (i.toString() == "blackberry") {
                                this.touchDevice = false;
                                return false
                            }
                            this.touchDevice = true;
                            return true
                        }
                    }
                }
                var f = navigator.userAgent;
                if (navigator.platform.toLowerCase().indexOf("win") != -1) {
                    if (f.indexOf("Windows Phone") >= 0 || f.indexOf("WPDesktop") >= 0 || f.indexOf("IEMobile") >= 0 || f.indexOf("ZuneWP7") >= 0) {
                        this.touchDevice = true;
                        return true
                    } else {
                        if (f.indexOf("Touch") >= 0) {
                            var b = ("MSPointerDown" in window) || ("pointerdown" in window);
                            if (b) {
                                this.touchDevice = true;
                                return true
                            }
                            if (f.indexOf("ARM") >= 0) {
                                this.touchDevice = true;
                                return true
                            }
                            this.touchDevice = false;
                            return false
                        }
                    }
                }
                if (navigator.platform.toLowerCase().indexOf("win") != -1) {
                    this.touchDevice = false;
                    return false
                }
                if (("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch) {
                    this.touchDevice = true
                }
                return this.touchDevice
            } catch (g) {
                this.touchDevice = false;
                return false
            }
        }, getLeftPos: function (b) {
            var c = b.offsetLeft;
            while ((b = b.offsetParent) != null) {
                if (b.tagName != "HTML") {
                    c += b.offsetLeft;
                    if (document.all) {
                        c += b.clientLeft
                    }
                }
            }
            return c
        }, getTopPos: function (c) {
            var e = c.offsetTop;
            var b = a(c).coord();
            while ((c = c.offsetParent) != null) {
                if (c.tagName != "HTML") {
                    e += (c.offsetTop - c.scrollTop);
                    if (document.all) {
                        e += c.clientTop
                    }
                }
            }
            var d = navigator.userAgent.toLowerCase();
            var f = (d.indexOf("windows phone") != -1 || d.indexOf("WPDesktop") != -1 || d.indexOf("ZuneWP7") != -1 || d.indexOf("msie 9") != -1 || d.indexOf("msie 11") != -1 || d.indexOf("msie 10") != -1) && d.indexOf("touch") != -1;
            if (f) {
                return b.top
            }
            if (this.isSafariMobileBrowser()) {
                if (this.isSafari4MobileBrowser() && this.isIPadSafariMobileBrowser()) {
                    return e
                }
                if (d.indexOf("version/7") != -1) {
                    return b.top
                }
                if (d.indexOf("version/6") != -1 || d.indexOf("version/5") != -1) {
                    e = e + a(window).scrollTop()
                }
                if (/(Android.*Chrome\/[.0-9]* (!?Mobile))/.exec(navigator.userAgent)) {
                    return e + a(window).scrollTop()
                }
                if (/(Android.*Chrome\/[.0-9]* Mobile)/.exec(navigator.userAgent)) {
                    return e + a(window).scrollTop()
                }
                return b.top
            }
            return e
        }, isChromeMobileBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("android") != -1;
            return b
        }, isOperaMiniMobileBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("opera mini") != -1 || c.indexOf("opera mobi") != -1;
            return b
        }, isOperaMiniBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("opera mini") != -1;
            return b
        }, isNewSafariMobileBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("ipad") != -1 || c.indexOf("iphone") != -1 || c.indexOf("ipod") != -1;
            b = b && (c.indexOf("version/5") != -1);
            return b
        }, isSafari4MobileBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("ipad") != -1 || c.indexOf("iphone") != -1 || c.indexOf("ipod") != -1;
            b = b && (c.indexOf("version/4") != -1);
            return b
        }, isWindowsPhone: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = (c.indexOf("windows phone") != -1 || c.indexOf("WPDesktop") != -1 || c.indexOf("ZuneWP7") != -1 || c.indexOf("msie 9") != -1 || c.indexOf("msie 11") != -1 || c.indexOf("msie 10") != -1 && c.indexOf("touch") != -1);
            return b
        }, isSafariMobileBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            if (/(Android.*Chrome\/[.0-9]* (!?Mobile))/.exec(navigator.userAgent)) {
                return true
            }
            if (/(Android.*Chrome\/[.0-9]* Mobile)/.exec(navigator.userAgent)) {
                return true
            }
            var b = c.indexOf("ipad") != -1 || c.indexOf("iphone") != -1 || c.indexOf("ipod") != -1 || c.indexOf("mobile safari") != -1;
            return b
        }, isIPadSafariMobileBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("ipad") != -1;
            return b
        }, isMobileBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("ipad") != -1 || c.indexOf("iphone") != -1 || c.indexOf("android") != -1;
            return b
        }, getTouches: function (b) {
            if (b.originalEvent) {
                if (b.originalEvent.touches && b.originalEvent.touches.length) {
                    return b.originalEvent.touches
                } else {
                    if (b.originalEvent.changedTouches && b.originalEvent.changedTouches.length) {
                        return b.originalEvent.changedTouches
                    }
                }
            }
            if (!b.touches) {
                b.touches = new Array();
                b.touches[0] = b.originalEvent != undefined ? b.originalEvent : b;
                if (b.originalEvent != undefined && b.pageX) {
                    b.touches[0] = b
                }
                if (b.type == "mousemove") {
                    b.touches[0] = b
                }
            }
            return b.touches
        }, getTouchEventName: function (b) {
            if (this.isWindowsPhone()) {
                var c = navigator.userAgent.toLowerCase();
                if (c.indexOf("windows phone 7") != -1) {
                    if (b.toLowerCase().indexOf("start") != -1) {
                        return"MSPointerDown"
                    }
                    if (b.toLowerCase().indexOf("move") != -1) {
                        return"MSPointerMove"
                    }
                    if (b.toLowerCase().indexOf("end") != -1) {
                        return"MSPointerUp"
                    }
                }
                if (b.toLowerCase().indexOf("start") != -1) {
                    return"pointerdown"
                }
                if (b.toLowerCase().indexOf("move") != -1) {
                    return"pointermove"
                }
                if (b.toLowerCase().indexOf("end") != -1) {
                    return"pointerup"
                }
            } else {
                return b
            }
        }, dispatchMouseEvent: function (b, f, d) {
            if (this.simulatetouches) {
                return
            }
            var c = document.createEvent("MouseEvent");
            c.initMouseEvent(b, true, true, f.view, 1, f.screenX, f.screenY, f.clientX, f.clientY, false, false, false, false, 0, null);
            if (d != null) {
                d.dispatchEvent(c)
            }
        }, getRootNode: function (b) {
            while (b.nodeType !== 1) {
                b = b.parentNode
            }
            return b
        }, setTouchScroll: function (b, c) {
            if (!this.enableScrolling) {
                this.enableScrolling = []
            }
            this.enableScrolling[c] = b
        }, touchScroll: function (A, L, V, G, w, m) {
            if (A == null) {
                return
            }
            var F = this;
            var e = 0;
            var q = 0;
            var f = 0;
            var g = 0;
            var s = 0;
            var h = 0;
            if (!this.scrolling) {
                this.scrolling = []
            }
            this.scrolling[G] = false;
            var j = false;
            var o = a(A);
            var P = ["select", "input", "textarea"];
            var T = 0;
            var I = 0;
            if (!this.enableScrolling) {
                this.enableScrolling = []
            }
            this.enableScrolling[G] = true;
            var G = G;
            var t = this.getTouchEventName("touchstart") + ".touchScroll";
            var C = this.getTouchEventName("touchend") + ".touchScroll";
            var X = this.getTouchEventName("touchmove") + ".touchScroll";
            var k, S, y, U, ad, O, W, c, E, Z, ab, d, v, u, Q, b, D, ac, n;
            O = L;
            ad = 0;
            W = 0;
            xoffset = 0;
            initialOffset = 0;
            initialXOffset = 0;
            U = w.jqxScrollBar("max");
            n = 325;
            function z(ag) {
                if (ag.targetTouches && (ag.targetTouches.length >= 1)) {
                    return ag.targetTouches[0].clientY
                } else {
                    if (ag.originalEvent && ag.originalEvent.clientY !== undefined) {
                        return ag.originalEvent.clientY
                    } else {
                        var af = F.getTouches(ag);
                        return af[0].clientY
                    }
                }
                return ag.clientY
            }
            function aa(ag) {
                if (ag.targetTouches && (ag.targetTouches.length >= 1)) {
                    return ag.targetTouches[0].clientX
                } else {
                    if (ag.originalEvent && ag.originalEvent.clientX !== undefined) {
                        return ag.originalEvent.clientX
                    } else {
                        var af = F.getTouches(ag);
                        return af[0].clientX
                    }
                }
                return ag.clientX
            }
            var H = function () {
                var ah, af, ai, ag;
                ah = Date.now();
                af = ah - v;
                v = ah;
                ai = W - d;
                xdelta = xoffset - xframe;
                d = W;
                xframe = xoffset;
                E = true;
                ag = 1000 * ai / (1 + af);
                xv = 1000 * xdelta / (1 + af);
                ab = 0.8 * ag + 0.2 * ab;
                xjqxAnimations = 0.8 * xv + 0.2 * xjqxAnimations
            };
            var B = false;
            var T = function (ag) {
                if (!F.enableScrolling[G]) {
                    return true
                }
                if (a.inArray(ag.target.tagName.toLowerCase(), P) !== -1) {
                    return
                }
                W = m.jqxScrollBar("value");
                xoffset = w.jqxScrollBar("value");
                var ah = F.getTouches(ag);
                var ai = ah[0];
                if (ah.length == 1) {
                    F.dispatchMouseEvent("mousedown", ai, F.getRootNode(ai.target))
                }
                U = w.jqxScrollBar("max");
                O = m.jqxScrollBar("max");
                function af(aj) {
                    B = false;
                    E = true;
                    c = z(aj);
                    ac = aa(aj);
                    ab = Q = xjqxAnimations = 0;
                    d = W;
                    xframe = xoffset;
                    v = Date.now();
                    clearInterval(u);
                    u = setInterval(H, 100);
                    initialOffset = W;
                    initialXOffset = xoffset;
                    if (W > 0 && W < O && m[0].style.visibility != "hidden") {
                    }
                }
                af(ag);
                j = false;
                q = ai.pageY;
                s = ai.pageX;
                if (F.simulatetouches) {
                    if (ai._pageY != undefined) {
                        q = ai._pageY;
                        s = ai._pageX
                    }
                }
                F.scrolling[G] = true;
                e = 0;
                g = 0;
                return true
            };
            if (o.on) {
                o.on(t, T)
            } else {
                o.bind(t, T)
            }
            var Y = function (ag, af) {
                W = (ag > O) ? O : (ag < ad) ? ad : ag;
                V(null, ag, 0, 0, af);
                return(ag > O) ? "max" : (ag < ad) ? "min" : "value"
            };
            var l = function (ag, af) {
                xoffset = (ag > U) ? U : (ag < ad) ? ad : ag;
                V(ag, null, 0, 0, af);
                return(ag > U) ? "max" : (ag < ad) ? "min" : "value"
            };
            function R() {
                var af, ag;
                if (Q) {
                    af = Date.now() - v;
                    ag = -Q * Math.exp(-af / n);
                    if (ag > 0.5 || ag < -0.5) {
                        Y(b + ag, event);
                        requestAnimationFrame(R)
                    } else {
                        Y(b);
                        m.fadeOut("fast")
                    }
                }
            }
            function M() {
                var af, ag;
                if (Q) {
                    af = Date.now() - v;
                    ag = -Q * Math.exp(-af / n);
                    if (ag > 0.5 || ag < -0.5) {
                        l(D + ag);
                        requestAnimationFrame(M)
                    } else {
                        l(D);
                        w.fadeOut("fast")
                    }
                }
            }
            var x = function (af) {
                if (!F.enableScrolling[G]) {
                    return true
                }
                if (!F.scrolling[G]) {
                    return true
                }
                if (B) {
                    af.preventDefault();
                    af.stopPropagation()
                }
                var ak = F.getTouches(af);
                if (ak.length > 1) {
                    return true
                }
                var ag = ak[0].pageY;
                var ai = ak[0].pageX;
                if (F.simulatetouches) {
                    if (ak[0]._pageY != undefined) {
                        ag = ak[0]._pageY;
                        ai = ak[0]._pageX
                    }
                }
                var am = ag - q;
                var an = ai - s;
                I = ag;
                touchHorizontalEnd = ai;
                f = am - e;
                h = an - g;
                j = true;
                e = am;
                g = an;
                var ah = w != null ? w[0].style.visibility != "hidden" : true;
                var al = m != null ? m[0].style.visibility != "hidden" : true;
                function aj(aq) {
                    var at, ar, ap;
                    if (E) {
                        at = z(aq);
                        ap = aa(aq);
                        ar = c - at;
                        xdelta = ac - ap;
                        var ao = "value";
                        if (ar > 2 || ar < -2) {
                            c = at;
                            ao = Y(W + ar, aq);
                            H();
                            if (ao == "min" && initialOffset === 0) {
                                return true
                            }
                            if (ao == "max" && initialOffset === O) {
                                return true
                            }
                            if (!al) {
                                return true
                            }
                            aq.preventDefault();
                            aq.stopPropagation();
                            B = true;
                            return false
                        } else {
                            if (xdelta > 2 || xdelta < -2) {
                                ac = ap;
                                ao = l(xoffset + xdelta, aq);
                                H();
                                if (ao == "min" && initialXOffset === 0) {
                                    return true
                                }
                                if (ao == "max" && initialXOffset === U) {
                                    return true
                                }
                                if (!ah) {
                                    return true
                                }
                                B = true;
                                aq.preventDefault();
                                aq.stopPropagation();
                                return false
                            }
                        }
                        aq.preventDefault()
                    }
                }
                if (ah || al) {
                    if ((ah) || (al)) {
                        aj(af)
                    }
                }
            };
            if (o.on) {
                o.on(X, x)
            } else {
                o.bind(X, x)
            }
            var r = function (ag) {
                if (!F.enableScrolling[G]) {
                    return true
                }
                var ah = F.getTouches(ag)[0];
                if (!F.scrolling[G]) {
                    return true
                }
                E = false;
                clearInterval(u);
                if (ab > 10 || ab < -10) {
                    Q = 0.8 * ab;
                    b = Math.round(W + Q);
                    v = Date.now();
                    requestAnimationFrame(R);
                    m.fadeIn(100)
                } else {
                    if (xjqxAnimations > 10 || xjqxAnimations < -10) {
                        Q = 0.8 * xjqxAnimations;
                        D = Math.round(xoffset + Q);
                        v = Date.now();
                        requestAnimationFrame(M);
                        w.fadeIn(100)
                    } else {
                        w.fadeOut(100);
                        m.fadeOut(100)
                    }
                }
                F.scrolling[G] = false;
                if (j) {
                    F.dispatchMouseEvent("mouseup", ah, ag.target)
                } else {
                    var ah = F.getTouches(ag)[0], af = F.getRootNode(ah.target);
                    F.dispatchMouseEvent("mouseup", ah, af);
                    F.dispatchMouseEvent("click", ah, af);
                    return true
                }
            };
            if (this.simulatetouches) {
                var p = a(window).on != undefined || a(window).bind;
                var N = function (af) {
                    try {
                        r(af)
                    } catch (ag) {
                    }
                    F.scrolling[G] = false
                };
                a(window).on != undefined ? a(document).on("mouseup.touchScroll", N) : a(document).bind("mouseup.touchScroll", N);
                if (window.frameElement) {
                    if (window.top != null) {
                        var K = function (af) {
                            try {
                                r(af)
                            } catch (ag) {
                            }
                            F.scrolling[G] = false
                        };
                        if (window.top.document) {
                            a(window.top.document).on ? a(window.top.document).on("mouseup", K) : a(window.top.document).bind("mouseup", K)
                        }
                    }
                }
                var ae = a(document).on != undefined || a(document).bind;
                var J = function (af) {
                    if (!F.scrolling[G]) {
                        return true
                    }
                    F.scrolling[G] = false;
                    var ah = F.getTouches(af)[0], ag = F.getRootNode(ah.target);
                    F.dispatchMouseEvent("mouseup", ah, ag);
                    F.dispatchMouseEvent("click", ah, ag)
                };
                a(document).on != undefined ? a(document).on("touchend", J) : a(document).bind("touchend", J)
            }
            if (o.on) {
                o.on("dragstart", function (af) {
                    af.preventDefault()
                });
                o.on("selectstart", function (af) {
                    af.preventDefault()
                })
            }
            o.on ? o.on(C + " touchcancel.touchScroll", r) : o.bind(C + " touchcancel.touchScroll", r)
        }});
    a.jqx.cookie = a.jqx.cookie || {};
    a.extend(a.jqx.cookie, {cookie: function (e, f, c) {
            if (arguments.length > 1 && String(f) !== "[object Object]") {
                c = a.extend({}, c);
                if (f === null || f === undefined) {
                    c.expires = -1
                }
                if (typeof c.expires === "number") {
                    var h = c.expires, d = c.expires = new Date();
                    d.setDate(d.getDate() + h)
                }
                f = String(f);
                return(document.cookie = [encodeURIComponent(e), "=", c.raw ? f : encodeURIComponent(f), c.expires ? "; expires=" + c.expires.toUTCString() : "", c.path ? "; path=" + c.path : "", c.domain ? "; domain=" + c.domain : "", c.secure ? "; secure" : ""].join(""))
            }
            c = f || {};
            var b, g = c.raw ? function (j) {
                return j
            } : decodeURIComponent;
            return(b = new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)").exec(document.cookie)) ? g(b[1]) : null
        }});
    a.jqx.string = a.jqx.string || {};
    a.extend(a.jqx.string, {replace: function (f, d, e) {
            if (d === e) {
                return this
            }
            var b = f;
            var c = b.indexOf(d);
            while (c != -1) {
                b = b.replace(d, e);
                c = b.indexOf(d)
            }
            return b
        }, contains: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            return b.indexOf(c) != -1
        }, containsIgnoreCase: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            return b.toString().toUpperCase().indexOf(c.toString().toUpperCase()) != -1
        }, equals: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            b = this.normalize(b);
            if (c.length == b.length) {
                return b.slice(0, c.length) == c
            }
            return false
        }, equalsIgnoreCase: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            b = this.normalize(b);
            if (c.length == b.length) {
                return b.toUpperCase().slice(0, c.length) == c.toUpperCase()
            }
            return false
        }, startsWith: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            return b.slice(0, c.length) == c
        }, startsWithIgnoreCase: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            return b.toUpperCase().slice(0, c.length) == c.toUpperCase()
        }, normalize: function (b) {
            if (b.charCodeAt(b.length - 1) == 65279) {
                b = b.substring(0, b.length - 1)
            }
            return b
        }, endsWith: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            b = this.normalize(b);
            return b.slice(-c.length) == c
        }, endsWithIgnoreCase: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            b = this.normalize(b);
            return b.toUpperCase().slice(-c.length) == c.toUpperCase()
        }});
    a.extend(a.easing, {easeOutBack: function (f, g, e, k, j, h) {
            if (h == undefined) {
                h = 1.70158
            }
            return k * ((g = g / j - 1) * g * ((h + 1) * g + h) + 1) + e
        }, easeInQuad: function (f, g, e, j, h) {
            return j * (g /= h) * g + e
        }, easeInOutCirc: function (f, g, e, j, h) {
            if ((g /= h / 2) < 1) {
                return -j / 2 * (Math.sqrt(1 - g * g) - 1) + e
            }
            return j / 2 * (Math.sqrt(1 - (g -= 2) * g) + 1) + e
        }, easeInOutSine: function (f, g, e, j, h) {
            return -j / 2 * (Math.cos(Math.PI * g / h) - 1) + e
        }, easeInCubic: function (f, g, e, j, h) {
            return j * (g /= h) * g * g + e
        }, easeOutCubic: function (f, g, e, j, h) {
            return j * ((g = g / h - 1) * g * g + 1) + e
        }, easeInOutCubic: function (f, g, e, j, h) {
            if ((g /= h / 2) < 1) {
                return j / 2 * g * g * g + e
            }
            return j / 2 * ((g -= 2) * g * g + 2) + e
        }, easeInSine: function (f, g, e, j, h) {
            return -j * Math.cos(g / h * (Math.PI / 2)) + j + e
        }, easeOutSine: function (f, g, e, j, h) {
            return j * Math.sin(g / h * (Math.PI / 2)) + e
        }, easeInOutSine: function (f, g, e, j, h) {
            return -j / 2 * (Math.cos(Math.PI * g / h) - 1) + e
        }})
})(jqxBaseFramework);
(function (b) {
    if (b.event && b.event.special) {
        b.extend(b.event.special, {close: {noBubble: true}, open: {noBubble: true}, cellclick: {noBubble: true}, rowclick: {noBubble: true}, tabclick: {noBubble: true}, selected: {noBubble: true}, expanded: {noBubble: true}, collapsed: {noBubble: true}, valuechanged: {noBubble: true}, expandedItem: {noBubble: true}, collapsedItem: {noBubble: true}, expandingItem: {noBubble: true}, collapsingItem: {noBubble: true}})
    }
    if (b.fn.extend) {
        b.fn.extend({ischildof: function (g) {
                if (!b(this).parents) {
                    var c = g.element.contains(this.element);
                    return c
                }
                var e = b(this).parents().get();
                for (var d = 0; d < e.length; d++) {
                    if (typeof g != "string") {
                        var f = e[d];
                        if (g !== undefined) {
                            if (f == g[0]) {
                                return true
                            }
                        }
                    } else {
                        if (g !== undefined) {
                            if (b(e[d]).is(g)) {
                                return true
                            }
                        }
                    }
                }
                return false
            }})
    }
    b.fn.jqxProxy = function () {
        var e = b(this).data().jqxWidget;
        var c = Array.prototype.slice.call(arguments, 0);
        var d = e.element;
        if (!d) {
            d = e.base.element
        }
        return b.jqx.jqxWidgetProxy(e.widgetName, d, c)
    };
    var a = this.originalVal = b.fn.val;
    b.fn.val = function (d) {
        if (typeof d == "undefined") {
            if (b(this).hasClass("jqx-widget")) {
                var c = b(this).data().jqxWidget;
                if (c && c.val) {
                    return c.val()
                }
            }
            if (this[0] && this[0].tagName.toLowerCase().indexOf("angular") >= 0) {
                var c = b(this).find(".jqx-widget").data().jqxWidget;
                if (c && c.val) {
                    return c.val()
                }
            }
            return a.call(this)
        } else {
            if (b(this).hasClass("jqx-widget")) {
                var c = b(this).data().jqxWidget;
                if (c && c.val) {
                    if (arguments.length != 2) {
                        return c.val(d)
                    } else {
                        return c.val(d, arguments[1])
                    }
                }
            }
            if (this[0] && this[0].tagName.toLowerCase().indexOf("angular") >= 0) {
                var c = b(this).find(".jqx-widget").data().jqxWidget;
                if (c && c.val) {
                    if (arguments.length != 2) {
                        return c.val(d)
                    } else {
                        return c.val(d, arguments[1])
                    }
                }
            }
            return a.call(this, d)
        }
    };
    if (b.fn.modal && b.fn.modal.Constructor) {
        b.fn.modal.Constructor.prototype.enforceFocus = function () {
            b(document).off("focusin.bs.modal").on("focusin.bs.modal", b.proxy(function (c) {
                if (this.$element[0] !== c.target && !this.$element.has(c.target).length) {
                    if (b(c.target).parents().hasClass("jqx-popup")) {
                        return true
                    }
                    this.$element.trigger("focus")
                }
            }, this))
        }
    }
    b.fn.coord = function (o) {
        var e, k, j = {top: 0, left: 0}, f = this[0], m = f && f.ownerDocument;
        if (!m) {
            return
        }
        e = m.documentElement;
        if (!b.contains(e, f)) {
            return j
        }
        if (typeof f.getBoundingClientRect !== undefined) {
            j = f.getBoundingClientRect()
        }
        var d = function (p) {
            return b.isWindow(p) ? p : p.nodeType === 9 ? p.defaultView || p.parentWindow : false
        };
        k = d(m);
        var h = 0;
        var c = 0;
        var g = navigator.userAgent.toLowerCase();
        var n = g.indexOf("ipad") != -1 || g.indexOf("iphone") != -1;
        if (n) {
            h = 2
        }
        if (true == o) {
            if (document.body.style.position != "static" && document.body.style.position != "") {
                var l = b(document.body).coord();
                h = -l.left;
                c = -l.top
            }
        }
        return{top: c + j.top + (k.pageYOffset || e.scrollTop) - (e.clientTop || 0), left: h + j.left + (k.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)}
    }
})(jqxBaseFramework);
(function (a) {
    a.jqx.jqxWidget("jqxDraw", "", {});
    a.extend(a.jqx._jqxDraw.prototype, {defineInstance: function () {
            var d = {renderEngine: ""};
            a.extend(true, this, d);
            var e = ["clear", "on", "off", "removeElement", "attr", "getAttr", "line", "circle", "rect", "path", "pieslice", "text", "measureText"];
            for (var c in e) {
                this._addFn(a.jqx._jqxDraw.prototype, e[c])
            }
        }, _addFn: function (d, c) {
            if (d[c]) {
                return
            }
            d[c] = function () {
                return this.renderer[c].apply(this.renderer, arguments)
            }
        }, createInstance: function (c) {}, _initRenderer: function (c) {
            return a.jqx.createRenderer(this, c)
        }, _internalRefresh: function () {
            var c = this;
            if (a.jqx.isHidden(c.host)) {
                return
            }
            if (!c.renderer) {
                c.host.empty();
                c._initRenderer(c.host)
            }
            var e = c.renderer;
            if (!e) {
                return
            }
            var d = e.getRect();
            c._render({x: 1, y: 1, width: d.width, height: d.height});
            if (e instanceof a.jqx.HTML5Renderer) {
                e.refresh()
            }
        }, _saveAsImage: function (e, f, c, d) {
            return a.jqx._widgetToImage(this, e, f, c, d)
        }, _render: function (d) {
            var c = this;
            var e = c.renderer;
            c._plotRect = d
        }, refresh: function () {
            this._internalRefresh()
        }, getSize: function () {
            var c = this._plotRect;
            return{width: c.width, height: c.height}
        }, saveAsPNG: function (e, c, d) {
            return this._saveAsImage("png", e, c, d)
        }, saveAsJPEG: function (e, c, d) {
            return this._saveAsImage("jpeg", e, c, d)
        }})
})(jqxBaseFramework);
(function (a) {
    a.jqx.toGreyScale = function (c) {
        if (c.indexOf("#") == -1) {
            return c
        }
        var d = a.jqx.cssToRgb(c);
        d[0] = d[1] = d[2] = Math.round(0.3 * d[0] + 0.59 * d[1] + 0.11 * d[2]);
        var e = a.jqx.rgbToHex(d[0], d[1], d[2]);
        return"#" + e[0] + e[1] + e[2]
    }, a.jqx.adjustColor = function (f, e) {
        if (typeof (f) != "string") {
            return"#000000"
        }
        if (f.indexOf("#") == -1) {
            return f
        }
        var h = a.jqx.cssToRgb(f);
        var d = a.jqx.rgbToHsl(h);
        d[2] = Math.min(1, d[2] * e);
        d[1] = Math.min(1, d[1] * e * 1.1);
        h = a.jqx.hslToRgb(d);
        var f = "#";
        for (var j = 0; j < 3; j++) {
            var k = Math.round(h[j]);
            k = a.jqx.decToHex(k);
            if (k.toString().length == 1) {
                f += "0"
            }
            f += k
        }
        return f.toUpperCase()
    };
    a.jqx.decToHex = function (c) {
        return c.toString(16)
    };
    a.jqx.hexToDec = function (c) {
        return parseInt(c, 16)
    };
    a.jqx.rgbToHex = function (e, d, c) {
        return[a.jqx.decToHex(e), a.jqx.decToHex(d), a.jqx.decToHex(c)]
    };
    a.jqx.hexToRgb = function (d, f, c) {
        return[a.jqx.hexToDec(d), a.jqx.hexToDec(f), a.jqx.hexToDec(c)]
    };
    a.jqx.cssToRgb = function (c) {
        if (c.indexOf("rgb") <= -1) {
            return a.jqx.hexToRgb(c.substring(1, 3), c.substring(3, 5), c.substring(5, 7))
        }
        return c.substring(4, c.length - 1).split(",")
    };
    a.jqx.hslToRgb = function (d) {
        var f = parseFloat(d[0]);
        var e = parseFloat(d[1]);
        var c = parseFloat(d[2]);
        if (e == 0) {
            r = g = b = c
        } else {
            var i = c < 0.5 ? c * (1 + e) : c + e - c * e;
            var j = 2 * c - i;
            r = a.jqx.hueToRgb(j, i, f + 1 / 3);
            g = a.jqx.hueToRgb(j, i, f);
            b = a.jqx.hueToRgb(j, i, f - 1 / 3)
        }
        return[r * 255, g * 255, b * 255]
    };
    a.jqx.hueToRgb = function (e, d, c) {
        if (c < 0) {
            c += 1
        }
        if (c > 1) {
            c -= 1
        }
        if (c < 1 / 6) {
            return e + (d - e) * 6 * c
        } else {
            if (c < 1 / 2) {
                return d
            } else {
                if (c < 2 / 3) {
                    return e + (d - e) * (2 / 3 - c) * 6
                }
            }
        }
        return e
    };
    a.jqx.rgbToHsl = function (j) {
        var c = parseFloat(j[0]) / 255;
        var i = parseFloat(j[1]) / 255;
        var k = parseFloat(j[2]) / 255;
        var m = Math.max(c, i, k), e = Math.min(c, i, k);
        var f, o, d = (m + e) / 2;
        if (m == e) {
            f = o = 0
        } else {
            var n = m - e;
            o = d > 0.5 ? n / (2 - m - e) : n / (m + e);
            switch (m) {
                case c:
                    f = (i - k) / n + (i < k ? 6 : 0);
                    break;
                case i:
                    f = (k - c) / n + 2;
                    break;
                case k:
                    f = (c - i) / n + 4;
                    break
            }
            f /= 6
        }
        return[f, o, d]
    };
    a.jqx.swap = function (c, e) {
        var d = c;
        c = e;
        e = d
    };
    a.jqx.getNum = function (c) {
        if (!a.isArray(c)) {
            if (isNaN(c)) {
                return 0
            }
        } else {
            for (var d = 0; d < c.length; d++) {
                if (!isNaN(c[d])) {
                    return c[d]
                }
            }
        }
        return 0
    };
    a.jqx._ptdist = function (d, f, c, e) {
        return Math.sqrt((c - d) * (c - d) + (e - f) * (e - f))
    };
    a.jqx._ptrnd = function (d) {
        if (!document.createElementNS) {
            if (Math.round(d) == d) {
                return d
            }
            return a.jqx._rnd(d, 1, false, true)
        }
        var c = a.jqx._rnd(d, 0.5, false, true);
        if (Math.abs(c - Math.round(c)) != 0.5) {
            return c > d ? c - 0.5 : c + 0.5
        }
        return c
    };
    a.jqx._ptRotate = function (e, k, d, j, h) {
        var c = Math.sqrt(Math.pow(Math.abs(e - d), 2) + Math.pow(Math.abs(k - j), 2));
        var f = Math.asin((e - d) / c);
        var i = f + h;
        e = d + Math.cos(i) * c;
        k = j + Math.sin(i) * c;
        return{x: e, y: k}
    };
    a.jqx._rup = function (d) {
        var c = Math.round(d);
        if (d > c) {
            c++
        }
        return c
    };
    a.jqx.log = function (d, c) {
        return Math.log(d) / (c ? Math.log(c) : 1)
    };
    a.jqx._mod = function (d, c) {
        var e = Math.abs(d > c ? c : d);
        var f = 1;
        if (e != 0) {
            while (e * f < 100) {
                f *= 10
            }
        }
        d = d * f;
        c = c * f;
        return(d % c) / f
    };
    a.jqx._rnd = function (e, h, f, d) {
        if (isNaN(e)) {
            return e
        }
        if (undefined === d) {
            d = true
        }
        var c = e - ((d == true) ? e % h : a.jqx._mod(e, h));
        if (e == c) {
            return c
        }
        if (f) {
            if (e > c) {
                c += h
            }
        } else {
            if (c > e) {
                c -= h
            }
        }
        return(h == 1) ? Math.round(c) : c
    };
    a.jqx.commonRenderer = {pieSlicePath: function (m, l, j, u, D, E, e) {
            if (!u) {
                u = 1
            }
            var o = Math.abs(D - E);
            var s = o > 180 ? 1 : 0;
            if (o >= 360) {
                E = D + 359.99
            }
            var t = D * Math.PI * 2 / 360;
            var k = E * Math.PI * 2 / 360;
            var B = m, A = m, h = l, f = l;
            var p = !isNaN(j) && j > 0;
            if (p) {
                e = 0
            }
            if (e + j > 0) {
                if (e > 0) {
                    var n = o / 2 + D;
                    var C = n * Math.PI * 2 / 360;
                    m += e * Math.cos(C);
                    l -= e * Math.sin(C)
                }
                if (p) {
                    var z = j;
                    B = m + z * Math.cos(t);
                    h = l - z * Math.sin(t);
                    A = m + z * Math.cos(k);
                    f = l - z * Math.sin(k)
                }
            }
            var w = m + u * Math.cos(t);
            var v = m + u * Math.cos(k);
            var d = l - u * Math.sin(t);
            var c = l - u * Math.sin(k);
            var q = "";
            var i = (Math.abs(Math.abs(E - D) - 360) > 0.02);
            if (p) {
                q = "M " + A + "," + f;
                q += " a" + j + "," + j;
                q += " 0 " + s + ",1 " + (B - A) + "," + (h - f);
                if (i) {
                    q += " L" + w + "," + d
                } else {
                    q += " M" + w + "," + d
                }
                q += " a" + u + "," + u;
                q += " 0 " + s + ",0 " + (v - w) + "," + (c - d);
                if (i) {
                    q += " Z"
                }
            } else {
                q = "M " + v + "," + c;
                q += " a" + u + "," + u;
                q += " 0 " + s + ",1 " + (w - v) + "," + (d - c);
                if (i) {
                    q += " L" + m + "," + l;
                    q += " Z"
                }
            }
            return q
        }, measureText: function (q, h, i, p, n) {
            var f = n._getTextParts(q, h, i);
            var k = f.width;
            var c = f.height;
            if (false == p) {
                c /= 0.6
            }
            var d = {};
            if (isNaN(h)) {
                h = 0
            }
            if (h == 0) {
                d = {width: a.jqx._rup(k), height: a.jqx._rup(c)}
            } else {
                var m = h * Math.PI * 2 / 360;
                var e = Math.abs(Math.sin(m));
                var l = Math.abs(Math.cos(m));
                var j = Math.abs(k * e + c * l);
                var o = Math.abs(k * l + c * e);
                d = {width: a.jqx._rup(o), height: a.jqx._rup(j)}
            }
            if (p) {
                d.textPartsInfo = f
            }
            return d
        }, alignTextInRect: function (t, p, c, u, o, q, k, s, f, e) {
            var m = f * Math.PI * 2 / 360;
            var d = Math.sin(m);
            var l = Math.cos(m);
            var n = o * d;
            var j = o * l;
            if (k == "center" || k == "" || k == "undefined") {
                t = t + c / 2
            } else {
                if (k == "right") {
                    t = t + c
                }
            }
            if (s == "center" || s == "middle" || s == "" || s == "undefined") {
                p = p + u / 2
            } else {
                if (s == "bottom") {
                    p += u - q / 2
                } else {
                    if (s == "top") {
                        p += q / 2
                    }
                }
            }
            e = e || "";
            var h = "middle";
            if (e.indexOf("top") != -1) {
                h = "top"
            } else {
                if (e.indexOf("bottom") != -1) {
                    h = "bottom"
                }
            }
            var i = "center";
            if (e.indexOf("left") != -1) {
                i = "left"
            } else {
                if (e.indexOf("right") != -1) {
                    i = "right"
                }
            }
            if (i == "center") {
                t -= j / 2;
                p -= n / 2
            } else {
                if (i == "right") {
                    t -= j;
                    p -= n
                }
            }
            if (h == "top") {
                t -= q * d;
                p += q * l
            } else {
                if (h == "middle") {
                    t -= q * d / 2;
                    p += q * l / 2
                }
            }
            t = a.jqx._rup(t);
            p = a.jqx._rup(p);
            return{x: t, y: p}
        }};
    a.jqx.svgRenderer = function () {};
    a.jqx.svgRenderer.prototype = {_svgns: "http://www.w3.org/2000/svg", init: function (h) {
            var f = "<table class=tblChart cellspacing='0' cellpadding='0' border='0' align='left' valign='top'><tr><td colspan=2 class=tdTop></td></tr><tr><td class=tdLeft></td><td><div class='chartContainer' style='position:relative' onselectstart='return false;'></div></td></tr></table>";
            h.append(f);
            this.host = h;
            var c = h.find(".chartContainer");
            c[0].style.width = h.width() + "px";
            c[0].style.height = h.height() + "px";
            var j;
            try {
                var d = document.createElementNS(this._svgns, "svg");
                d.setAttribute("id", "svgChart");
                d.setAttribute("version", "1.1");
                d.setAttribute("width", "100%");
                d.setAttribute("height", "100%");
                d.setAttribute("overflow", "hidden");
                c[0].appendChild(d);
                this.canvas = d
            } catch (i) {
                return false
            }
            this._id = new Date().getTime();
            this.clear();
            this._layout();
            this._runLayoutFix();
            return true
        }, getType: function () {
            return"SVG"
        }, refresh: function () {}, _runLayoutFix: function () {
            var c = this;
            this._fixLayout()
        }, _fixLayout: function () {
            var h = this.canvas.getBoundingClientRect();
            var e = (parseFloat(h.left) == parseInt(h.left));
            var c = (parseFloat(h.top) == parseInt(h.top));
            if (a.jqx.browser.msie) {
                var e = true, c = true;
                var f = this.host;
                var d = 0, i = 0;
                while (f && f.position && f[0].parentNode) {
                    var j = f.position();
                    d += parseFloat(j.left) - parseInt(j.left);
                    i += parseFloat(j.top) - parseInt(j.top);
                    f = f.parent()
                }
                e = parseFloat(d) == parseInt(d);
                c = parseFloat(i) == parseInt(i)
            }
            if (!e) {
                this.host.find(".tdLeft")[0].style.width = "0.5px"
            }
            if (!c) {
                this.host.find(".tdTop")[0].style.height = "0.5px"
            }
        }, _layout: function () {
            var c = this.host.find(".chartContainer");
            this._width = Math.max(a.jqx._rup(this.host.width()) - 1, 0);
            this._height = Math.max(a.jqx._rup(this.host.height()) - 1, 0);
            c[0].style.width = this._width;
            c[0].style.height = this._height;
            this._fixLayout()
        }, getRect: function () {
            return{x: 0, y: 0, width: this._width, height: this._height}
        }, getContainer: function () {
            var c = this.host.find(".chartContainer");
            return c
        }, clear: function () {
            while (this.canvas.childElementCount > 0) {
                this.removeElement(this.canvas.firstElementChild)
            }
            this._defaultParent = undefined;
            this._defs = document.createElementNS(this._svgns, "defs");
            this._gradients = {};
            this.canvas.appendChild(this._defs)
        }, removeElement: function (e) {
            if (undefined == e) {
                return
            }
            this.removeHandler(e);
            try {
                while (e.firstChild) {
                    this.removeElement(e.firstChild)
                }
                if (e.parentNode) {
                    e.parentNode.removeChild(e)
                } else {
                    this.canvas.removeChild(e)
                }
            } catch (d) {
                var c = d
            }
        }, _openGroups: [], beginGroup: function () {
            var c = this._activeParent();
            var d = document.createElementNS(this._svgns, "g");
            c.appendChild(d);
            this._openGroups.push(d);
            return d
        }, endGroup: function () {
            if (this._openGroups.length == 0) {
                return
            }
            this._openGroups.pop()
        }, _activeParent: function () {
            return this._openGroups.length == 0 ? this.canvas : this._openGroups[this._openGroups.length - 1]
        }, createClipRect: function (e) {
            var f = document.createElementNS(this._svgns, "clipPath");
            var d = document.createElementNS(this._svgns, "rect");
            this.attr(d, {x: e.x, y: e.y, width: e.width, height: e.height, fill: "none"});
            this._clipId = this._clipId || 0;
            f.id = "cl" + this._id + "_" + (++this._clipId).toString();
            f.appendChild(d);
            this._defs.appendChild(f);
            return f
        }, getWindowHref: function () {
            var d = a.jqx.browser;
            if (d && d.browser == "msie" && d.version < 10) {
                return""
            }
            var c = window.location.href;
            if (!c) {
                return c
            }
            c = c.replace(/([\('\)])/g, "\\$1");
            c = c.replace(/#.*$/, "");
            return c
        }, setClip: function (e, d) {
            var c = "url(" + this.getWindowHref() + "#" + d.id + ")";
            return this.attr(e, {"clip-path": c})
        }, _clipId: 0, addHandler: function (c, e, d) {
            if (a(c).on) {
                a(c).on(e, d)
            } else {
                a(c).bind(e, d)
            }
        }, removeHandler: function (c, e, d) {
            if (a(c).off) {
                a(c).off(e, d)
            } else {
                a(c).unbind(e, d)
            }
        }, on: function (c, e, d) {
            this.addHandler(c, e, d)
        }, off: function (c, e, d) {
            this.removeHandler(c, e, d)
        }, shape: function (c, f) {
            var d = document.createElementNS(this._svgns, c);
            if (!d) {
                return undefined
            }
            for (var e in f) {
                d.setAttribute(e, f[e])
            }
            this._activeParent().appendChild(d);
            return d
        }, _getTextParts: function (t, j, k) {
            var h = {width: 0, height: 0, parts: []};
            if (undefined === t) {
                return h
            }
            var o = 0.6;
            var u = t.toString().split("<br>");
            var q = this._activeParent();
            var m = document.createElementNS(this._svgns, "text");
            this.attr(m, k);
            for (var l = 0; l < u.length; l++) {
                var d = u[l];
                var f = m.ownerDocument.createTextNode(d);
                m.appendChild(f);
                q.appendChild(m);
                var s;
                try {
                    s = m.getBBox()
                } catch (p) {
                }
                var n = a.jqx._rup(s.width);
                var c = a.jqx._rup(s.height * o);
                m.removeChild(f);
                h.width = Math.max(h.width, n);
                h.height += c + (l > 0 ? 4 : 0);
                h.parts.push({width: n, height: c, text: d})
            }
            q.removeChild(m);
            return h
        }, _measureText: function (f, e, d, c) {
            return a.jqx.commonRenderer.measureText(f, e, d, c, this)
        }, measureText: function (e, d, c) {
            return this._measureText(e, d, c, false)
        }, text: function (z, t, s, E, C, K, M, L, v, m, d) {
            var B = this._measureText(z, K, M, true);
            var l = B.textPartsInfo;
            var j = l.parts;
            var D;
            if (!v) {
                v = "center"
            }
            if (!m) {
                m = "center"
            }
            if (j.length > 1 || L) {
                D = this.beginGroup()
            }
            if (L) {
                var k = this.createClipRect({x: a.jqx._rup(t) - 1, y: a.jqx._rup(s) - 1, width: a.jqx._rup(E) + 2, height: a.jqx._rup(C) + 2});
                this.setClip(D, k)
            }
            var q = this._activeParent();
            var O = 0, n = 0;
            var c = 0.6;
            O = l.width;
            n = l.height;
            if (isNaN(E) || E <= 0) {
                E = O
            }
            if (isNaN(C) || C <= 0) {
                C = n
            }
            var u = E || 0;
            var J = C || 0;
            if (!K || K == 0) {
                s += n;
                if (m == "center" || m == "middle") {
                    s += (J - n) / 2
                } else {
                    if (m == "bottom") {
                        s += J - n
                    }
                }
                if (!E) {
                    E = O
                }
                if (!C) {
                    C = n
                }
                var q = this._activeParent();
                var p = 0;
                for (var I = j.length - 1; I >= 0; I--) {
                    var A = document.createElementNS(this._svgns, "text");
                    this.attr(A, M);
                    this.attr(A, {cursor: "default"});
                    var H = A.ownerDocument.createTextNode(j[I].text);
                    A.appendChild(H);
                    var P = t;
                    var o = j[I].width;
                    var f = j[I].height;
                    if (v == "center") {
                        P += (u - o) / 2
                    } else {
                        if (v == "right") {
                            P += (u - o)
                        }
                    }
                    this.attr(A, {x: a.jqx._rup(P), y: a.jqx._rup(s + p), width: a.jqx._rup(o), height: a.jqx._rup(f)});
                    q.appendChild(A);
                    p -= j[I].height + 4
                }
                if (D) {
                    this.endGroup();
                    return D
                }
                return A
            }
            var F = a.jqx.commonRenderer.alignTextInRect(t, s, E, C, O, n, v, m, K, d);
            t = F.x;
            s = F.y;
            var G = this.shape("g", {transform: "translate(" + t + "," + s + ")"});
            var e = this.shape("g", {transform: "rotate(" + K + ")"});
            G.appendChild(e);
            var p = 0;
            for (var I = j.length - 1; I >= 0; I--) {
                var N = document.createElementNS(this._svgns, "text");
                this.attr(N, M);
                this.attr(N, {cursor: "default"});
                var H = N.ownerDocument.createTextNode(j[I].text);
                N.appendChild(H);
                var P = 0;
                var o = j[I].width;
                var f = j[I].height;
                if (v == "center") {
                    P += (l.width - o) / 2
                } else {
                    if (v == "right") {
                        P += (l.width - o)
                    }
                }
                this.attr(N, {x: a.jqx._rup(P), y: a.jqx._rup(p), width: a.jqx._rup(o), height: a.jqx._rup(f)});
                e.appendChild(N);
                p -= f + 4
            }
            q.appendChild(G);
            if (D) {
                this.endGroup()
            }
            return G
        }, line: function (e, h, d, f, i) {
            var c = this.shape("line", {x1: e, y1: h, x2: d, y2: f});
            this.attr(c, i);
            return c
        }, path: function (d, e) {
            var c = this.shape("path");
            c.setAttribute("d", d);
            if (e) {
                this.attr(c, e)
            }
            return c
        }, rect: function (c, j, d, f, i) {
            c = a.jqx._ptrnd(c);
            j = a.jqx._ptrnd(j);
            d = Math.max(1, a.jqx._rnd(d, 1, false));
            f = Math.max(1, a.jqx._rnd(f, 1, false));
            var e = this.shape("rect", {x: c, y: j, width: d, height: f});
            if (i) {
                this.attr(e, i)
            }
            return e
        }, circle: function (c, h, e, f) {
            var d = this.shape("circle", {cx: c, cy: h, r: e});
            if (f) {
                this.attr(d, f)
            }
            return d
        }, pieSlicePath: function (d, j, i, f, h, e, c) {
            return a.jqx.commonRenderer.pieSlicePath(d, j, i, f, h, e, c)
        }, pieslice: function (l, j, i, e, h, c, k, d) {
            var f = this.pieSlicePath(l, j, i, e, h, c, k);
            var m = this.shape("path");
            m.setAttribute("d", f);
            if (d) {
                this.attr(m, d)
            }
            return m
        }, attr: function (c, e) {
            if (!c || !e) {
                return
            }
            for (var d in e) {
                if (d == "textContent") {
                    c.textContent = e[d]
                } else {
                    c.setAttribute(d, e[d])
                }
            }
        }, removeAttr: function (c, e) {
            if (!c || !e) {
                return
            }
            for (var d in e) {
                if (d == "textContent") {
                    c.textContent = ""
                } else {
                    c.removeAttribute(e[d])
                }
            }
        }, getAttr: function (d, c) {
            return d.getAttribute(c)
        }, _gradients: {}, _toLinearGradient: function (f, k, l) {
            var d = "grd" + this._id + f.replace("#", "") + (k ? "v" : "h");
            var c = "url(" + this.getWindowHref() + "#" + d + ")";
            if (this._gradients[c]) {
                return c
            }
            var e = document.createElementNS(this._svgns, "linearGradient");
            this.attr(e, {x1: "0%", y1: "0%", x2: k ? "0%" : "100%", y2: k ? "100%" : "0%", id: d});
            for (var h = 0; h < l.length; h++) {
                var j = l[h];
                var n = document.createElementNS(this._svgns, "stop");
                var m = "stop-color:" + a.jqx.adjustColor(f, j[1]);
                this.attr(n, {offset: j[0] + "%", style: m});
                e.appendChild(n)
            }
            this._defs.appendChild(e);
            this._gradients[c] = true;
            return c
        }, _toRadialGradient: function (f, l, k) {
            var d = "grd" + this._id + f.replace("#", "") + "r" + (k != undefined ? k.key : "");
            var c = "url(" + this.getWindowHref() + "#" + d + ")";
            if (this._gradients[c]) {
                return c
            }
            var e = document.createElementNS(this._svgns, "radialGradient");
            if (k == undefined) {
                this.attr(e, {cx: "50%", cy: "50%", r: "100%", fx: "50%", fy: "50%", id: d})
            } else {
                this.attr(e, {cx: k.x, cy: k.y, r: k.outerRadius, id: d, gradientUnits: "userSpaceOnUse"})
            }
            for (var h = 0; h < l.length; h++) {
                var j = l[h];
                var n = document.createElementNS(this._svgns, "stop");
                var m = "stop-color:" + a.jqx.adjustColor(f, j[1]);
                this.attr(n, {offset: j[0] + "%", style: m});
                e.appendChild(n)
            }
            this._defs.appendChild(e);
            this._gradients[c] = true;
            return c
        }};
    a.jqx.vmlRenderer = function () {};
    a.jqx.vmlRenderer.prototype = {init: function (j) {
            var h = "<div class='chartContainer' style=\"position:relative;overflow:hidden;\"><div>";
            j.append(h);
            this.host = j;
            var c = j.find(".chartContainer");
            c[0].style.width = j.width() + "px";
            c[0].style.height = j.height() + "px";
            var f = true;
            try {
                for (var d = 0; d < document.namespaces.length; d++) {
                    if (document.namespaces[d].name == "v" && document.namespaces[d].urn == "urn:schemas-microsoft-com:vml") {
                        f = false;
                        break
                    }
                }
            } catch (k) {
                return false
            }
            if (a.jqx.browser.msie && parseInt(a.jqx.browser.version) < 9 && (document.childNodes && document.childNodes.length > 0 && document.childNodes[0].data && document.childNodes[0].data.indexOf("DOCTYPE") != -1)) {
                if (f) {
                    document.namespaces.add("v", "urn:schemas-microsoft-com:vml")
                }
                this._ie8mode = true
            } else {
                if (f) {
                    document.namespaces.add("v", "urn:schemas-microsoft-com:vml");
                    document.createStyleSheet().cssText = "v\\:* { behavior: url(#default#VML); display: inline-block; }"
                }
            }
            this.canvas = c[0];
            this._width = Math.max(a.jqx._rup(c.width()), 0);
            this._height = Math.max(a.jqx._rup(c.height()), 0);
            c[0].style.width = this._width + 2;
            c[0].style.height = this._height + 2;
            this._id = new Date().getTime();
            this.clear();
            return true
        }, getType: function () {
            return"VML"
        }, refresh: function () {}, getRect: function () {
            return{x: 0, y: 0, width: this._width, height: this._height}
        }, getContainer: function () {
            var c = this.host.find(".chartContainer");
            return c
        }, clear: function () {
            while (this.canvas.childElementCount > 0) {
                this.removeHandler(this.canvas.firstElementChild);
                this.canvas.removeChild(this.canvas.firstElementChild)
            }
            this._gradients = {};
            this._defaultParent = undefined
        }, removeElement: function (c) {
            if (c != null) {
                this.removeHandler(c);
                c.parentNode.removeChild(c)
            }
        }, _openGroups: [], beginGroup: function () {
            var c = this._activeParent();
            var d = document.createElement("v:group");
            d.style.position = "absolute";
            d.coordorigin = "0,0";
            d.coordsize = this._width + "," + this._height;
            d.style.left = 0;
            d.style.top = 0;
            d.style.width = this._width;
            d.style.height = this._height;
            c.appendChild(d);
            this._openGroups.push(d);
            return d
        }, endGroup: function () {
            if (this._openGroups.length == 0) {
                return
            }
            this._openGroups.pop()
        }, _activeParent: function () {
            return this._openGroups.length == 0 ? this.canvas : this._openGroups[this._openGroups.length - 1]
        }, createClipRect: function (c) {
            var d = document.createElement("div");
            d.style.height = (c.height + 1) + "px";
            d.style.width = (c.width + 1) + "px";
            d.style.position = "absolute";
            d.style.left = c.x + "px";
            d.style.top = c.y + "px";
            d.style.overflow = "hidden";
            this._clipId = this._clipId || 0;
            d.id = "cl" + this._id + "_" + (++this._clipId).toString();
            this._activeParent().appendChild(d);
            return d
        }, setClip: function (d, c) {}, _clipId: 0, addHandler: function (c, e, d) {
            if (a(c).on) {
                a(c).on(e, d)
            } else {
                a(c).bind(e, d)
            }
        }, removeHandler: function (c, e, d) {
            if (a(c).off) {
                a(c).off(e, d)
            } else {
                a(c).unbind(e, d)
            }
        }, on: function (c, e, d) {
            this.addHandler(c, e, d)
        }, off: function (c, e, d) {
            this.removeHandler(c, e, d)
        }, _getTextParts: function (q, h, j) {
            var f = {width: 0, height: 0, parts: []};
            var o = 0.6;
            var s = q.toString().split("<br>");
            var p = this._activeParent();
            var l = document.createElement("v:textbox");
            this.attr(l, j);
            p.appendChild(l);
            for (var k = 0; k < s.length; k++) {
                var d = s[k];
                var e = document.createElement("span");
                e.appendChild(document.createTextNode(d));
                l.appendChild(e);
                if (j && j["class"]) {
                    e.className = j["class"]
                }
                var n = a(l);
                var m = a.jqx._rup(n.width());
                var c = a.jqx._rup(n.height() * o);
                if (c == 0 && a.jqx.browser.msie && parseInt(a.jqx.browser.version) < 9) {
                    var t = n.css("font-size");
                    if (t) {
                        c = parseInt(t);
                        if (isNaN(c)) {
                            c = 0
                        }
                    }
                }
                l.removeChild(e);
                f.width = Math.max(f.width, m);
                f.height += c + (k > 0 ? 2 : 0);
                f.parts.push({width: m, height: c, text: d})
            }
            p.removeChild(l);
            return f
        }, _measureText: function (f, e, d, c) {
            if (Math.abs(e) > 45) {
                e = 90
            } else {
                e = 0
            }
            return a.jqx.commonRenderer.measureText(f, e, d, c, this)
        }, measureText: function (e, d, c) {
            return this._measureText(e, d, c, false)
        }, text: function (u, p, o, D, z, J, L, K, t, k) {
            var E;
            if (L && L.stroke) {
                E = L.stroke
            }
            if (E == undefined) {
                E = "black"
            }
            var v = this._measureText(u, J, L, true);
            var f = v.textPartsInfo;
            var c = f.parts;
            var M = v.width;
            var l = v.height;
            if (isNaN(D) || D == 0) {
                D = M
            }
            if (isNaN(z) || z == 0) {
                z = l
            }
            var B;
            if (!t) {
                t = "center"
            }
            if (!k) {
                k = "center"
            }
            if (c.length > 0 || K) {
                B = this.beginGroup()
            }
            if (K) {
                var d = this.createClipRect({x: a.jqx._rup(p), y: a.jqx._rup(o), width: a.jqx._rup(D), height: a.jqx._rup(z)});
                this.setClip(B, d)
            }
            var n = this._activeParent();
            var s = D || 0;
            var I = z || 0;
            if (Math.abs(J) > 45) {
                J = 90
            } else {
                J = 0
            }
            var A = 0, H = 0;
            if (t == "center") {
                A += (s - M) / 2
            } else {
                if (t == "right") {
                    A += (s - M)
                }
            }
            if (k == "center") {
                H = (I - l) / 2
            } else {
                if (k == "bottom") {
                    H = I - l
                }
            }
            if (J == 0) {
                o += l + H;
                p += A
            } else {
                p += M + A;
                o += H
            }
            var m = 0, N = 0;
            var e;
            for (var G = c.length - 1; G >= 0; G--) {
                var C = c[G];
                var q = (M - C.width) / 2;
                if (J == 0 && t == "left") {
                    q = 0
                } else {
                    if (J == 0 && t == "right") {
                        q = M - C.width
                    } else {
                        if (J == 90) {
                            q = (l - C.width) / 2
                        }
                    }
                }
                var j = m - C.height;
                H = J == 90 ? q : j;
                A = J == 90 ? j : q;
                e = document.createElement("v:textbox");
                e.style.position = "absolute";
                e.style.left = a.jqx._rup(p + A);
                e.style.top = a.jqx._rup(o + H);
                e.style.width = a.jqx._rup(C.width);
                e.style.height = a.jqx._rup(C.height);
                if (J == 90) {
                    e.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";
                    e.style.height = a.jqx._rup(C.height) + 5
                }
                var F = document.createElement("span");
                F.appendChild(document.createTextNode(C.text));
                if (L && L["class"]) {
                    F.className = L["class"]
                }
                e.appendChild(F);
                n.appendChild(e);
                m -= C.height + (G > 0 ? 2 : 0)
            }
            if (B) {
                this.endGroup();
                return n
            }
            return e
        }, shape: function (c, f) {
            var d = document.createElement(this._createElementMarkup(c));
            if (!d) {
                return undefined
            }
            for (var e in f) {
                d.setAttribute(e, f[e])
            }
            this._activeParent().appendChild(d);
            return d
        }, line: function (f, i, e, h, j) {
            var c = "M " + f + "," + i + " L " + e + "," + h + " X E";
            var d = this.path(c);
            this.attr(d, j);
            return d
        }, _createElementMarkup: function (c) {
            var d = "<v:" + c + ' style=""></v:' + c + ">";
            if (this._ie8mode) {
                d = d.replace('style=""', 'style="behavior: url(#default#VML);"')
            }
            return d
        }, path: function (d, e) {
            var c = document.createElement(this._createElementMarkup("shape"));
            c.style.position = "absolute";
            c.coordsize = this._width + " " + this._height;
            c.coordorigin = "0 0";
            c.style.width = parseInt(this._width);
            c.style.height = parseInt(this._height);
            c.style.left = 0 + "px";
            c.style.top = 0 + "px";
            c.setAttribute("path", d);
            this._activeParent().appendChild(c);
            if (e) {
                this.attr(c, e)
            }
            return c
        }, rect: function (c, j, d, e, i) {
            c = a.jqx._ptrnd(c);
            j = a.jqx._ptrnd(j);
            d = a.jqx._rup(d);
            e = a.jqx._rup(e);
            var f = this.shape("rect", i);
            f.style.position = "absolute";
            f.style.left = c;
            f.style.top = j;
            f.style.width = d;
            f.style.height = e;
            f.strokeweight = 0;
            if (i) {
                this.attr(f, i)
            }
            return f
        }, circle: function (c, h, e, f) {
            var d = this.shape("oval");
            c = a.jqx._ptrnd(c - e);
            h = a.jqx._ptrnd(h - e);
            e = a.jqx._rup(e);
            d.style.position = "absolute";
            d.style.left = c;
            d.style.top = h;
            d.style.width = e * 2;
            d.style.height = e * 2;
            if (f) {
                this.attr(d, f)
            }
            return d
        }, updateCircle: function (e, c, f, d) {
            if (c == undefined) {
                c = parseFloat(e.style.left) + parseFloat(e.style.width) / 2
            }
            if (f == undefined) {
                f = parseFloat(e.style.top) + parseFloat(e.style.height) / 2
            }
            if (d == undefined) {
                d = parseFloat(e.width) / 2
            }
            c = a.jqx._ptrnd(c - d);
            f = a.jqx._ptrnd(f - d);
            d = a.jqx._rup(d);
            e.style.left = c;
            e.style.top = f;
            e.style.width = d * 2;
            e.style.height = d * 2
        }, pieSlicePath: function (m, l, j, u, E, F, e) {
            if (!u) {
                u = 1
            }
            var o = Math.abs(E - F);
            var s = o > 180 ? 1 : 0;
            if (o > 360) {
                E = 0;
                F = 360
            }
            var t = E * Math.PI * 2 / 360;
            var k = F * Math.PI * 2 / 360;
            var B = m, A = m, h = l, f = l;
            var p = !isNaN(j) && j > 0;
            if (p) {
                e = 0
            }
            if (e > 0) {
                var n = o / 2 + E;
                var D = n * Math.PI * 2 / 360;
                m += e * Math.cos(D);
                l -= e * Math.sin(D)
            }
            if (p) {
                var z = j;
                B = a.jqx._ptrnd(m + z * Math.cos(t));
                h = a.jqx._ptrnd(l - z * Math.sin(t));
                A = a.jqx._ptrnd(m + z * Math.cos(k));
                f = a.jqx._ptrnd(l - z * Math.sin(k))
            }
            var w = a.jqx._ptrnd(m + u * Math.cos(t));
            var v = a.jqx._ptrnd(m + u * Math.cos(k));
            var d = a.jqx._ptrnd(l - u * Math.sin(t));
            var c = a.jqx._ptrnd(l - u * Math.sin(k));
            u = a.jqx._ptrnd(u);
            j = a.jqx._ptrnd(j);
            m = a.jqx._ptrnd(m);
            l = a.jqx._ptrnd(l);
            var i = Math.round(E * 65535);
            var C = Math.round((F - E) * 65536);
            if (j < 0) {
                j = 1
            }
            var q = "";
            if (p) {
                q = "M" + B + " " + h;
                q += " AE " + m + " " + l + " " + j + " " + j + " " + i + " " + C;
                q += " L " + v + " " + c;
                i = Math.round((E - F) * 65535);
                C = Math.round(F * 65536);
                q += " AE " + m + " " + l + " " + u + " " + u + " " + C + " " + i;
                q += " L " + B + " " + h
            } else {
                q = "M" + m + " " + l;
                q += " AE " + m + " " + l + " " + u + " " + u + " " + i + " " + C
            }
            q += " X E";
            return q
        }, pieslice: function (m, k, j, f, i, c, l, e) {
            var h = this.pieSlicePath(m, k, j, f, i, c, l);
            var d = this.path(h, e);
            if (e) {
                this.attr(d, e)
            }
            return d
        }, _keymap: [{svg: "fill", vml: "fillcolor"}, {svg: "stroke", vml: "strokecolor"}, {svg: "stroke-width", vml: "strokeweight"}, {svg: "stroke-dasharray", vml: "dashstyle"}, {svg: "fill-opacity", vml: "fillopacity"}, {svg: "stroke-opacity", vml: "strokeopacity"}, {svg: "opacity", vml: "opacity"}, {svg: "cx", vml: "style.left"}, {svg: "cy", vml: "style.top"}, {svg: "height", vml: "style.height"}, {svg: "width", vml: "style.width"}, {svg: "x", vml: "style.left"}, {svg: "y", vml: "style.top"}, {svg: "d", vml: "v"}, {svg: "display", vml: "style.display"}], _translateParam: function (c) {
            for (var d in this._keymap) {
                if (this._keymap[d].svg == c) {
                    return this._keymap[d].vml
                }
            }
            return c
        }, attr: function (d, f) {
            if (!d || !f) {
                return
            }
            for (var e in f) {
                var c = this._translateParam(e);
                if (undefined == f[e]) {
                    continue
                }
                if (c == "fillcolor" && f[e].indexOf("grd") != -1) {
                    d.type = f[e]
                } else {
                    if (c == "fillcolor" && f[e] == "transparent") {
                        d.style.filter = "alpha(opacity=0)";
                        d["-ms-filter"] = "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"
                    } else {
                        if (c == "opacity" || c == "fillopacity") {
                            if (d.fill) {
                                d.fill.opacity = f[e]
                            }
                        } else {
                            if (c == "textContent") {
                                d.children[0].innerText = f[e]
                            } else {
                                if (c == "dashstyle") {
                                    d.dashstyle = f[e].replace(",", " ")
                                } else {
                                    if (c.indexOf("style.") == -1) {
                                        d[c] = f[e]
                                    } else {
                                        d.style[c.replace("style.", "")] = f[e]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }, removeAttr: function (c, e) {
            if (!c || !e) {
                return
            }
            for (var d in e) {
                c.removeAttribute(e[d])
            }
        }, getAttr: function (e, d) {
            var c = this._translateParam(d);
            if (c == "opacity" || c == "fillopacity") {
                if (e.fill) {
                    return e.fill.opacity
                } else {
                    return 1
                }
            }
            if (c.indexOf("style.") == -1) {
                return e[c]
            }
            return e.style[c.replace("style.", "")]
        }, _gradients: {}, _toRadialGradient: function (c, e, d) {
            return c
        }, _toLinearGradient: function (j, m, n) {
            if (this._ie8mode) {
                return j
            }
            var e = "grd" + j.replace("#", "") + (m ? "v" : "h");
            var f = "#" + e + "";
            if (this._gradients[f]) {
                return f
            }
            var h = document.createElement(this._createElementMarkup("fill"));
            h.type = "gradient";
            h.method = "linear";
            h.angle = m ? 0 : 90;
            var d = "";
            for (var k = 0; k < n.length; k++) {
                var l = n[k];
                if (l > 0) {
                    d += ", "
                }
                d += l[0] + "% " + a.jqx.adjustColor(j, l[1])
            }
            h.colors = d;
            var c = document.createElement(this._createElementMarkup("shapetype"));
            c.appendChild(h);
            c.id = e;
            this.canvas.appendChild(c);
            return f
        }};
    a.jqx.HTML5Renderer = function () {};
    a.jqx.ptrnd = function (d) {
        if (Math.abs(Math.round(d) - d) == 0.5) {
            return d
        }
        var c = Math.round(d);
        if (c < d) {
            c = c - 1
        }
        return c + 0.5
    };
    a.jqx.HTML5Renderer.prototype = {init: function (c) {
            try {
                this.host = c;
                this.host.append("<div class='chartContainer' style='position:relative' onselectstart='return false;'><canvas id='__jqxCanvasWrap' style='width:100%; height: 100%;'/></div>");
                this.canvas = c.find("#__jqxCanvasWrap");
                this.canvas[0].width = c.width();
                this.canvas[0].height = c.height();
                this.ctx = this.canvas[0].getContext("2d");
                this._elements = {};
                this._maxId = 0;
                this._gradientId = 0;
                this._gradients = {};
                this._currentPoint = {x: 0, y: 0};
                this._lastCmd = "";
                this._pos = 0
            } catch (d) {
                return false
            }
            return true
        }, getType: function () {
            return"HTML5"
        }, getContainer: function () {
            var c = this.host.find(".chartContainer");
            return c
        }, getRect: function () {
            return{x: 0, y: 0, width: this.canvas[0].width - 1, height: this.canvas[0].height - 1}
        }, beginGroup: function () {}, endGroup: function () {}, setClip: function () {}, createClipRect: function (c) {}, addHandler: function (c, e, d) {}, removeHandler: function (c, e, d) {}, on: function (c, e, d) {
            this.addHandler(c, e, d)
        }, off: function (c, e, d) {
            this.removeHandler(c, e, d)
        }, clear: function () {
            this._elements = {};
            this._maxId = 0;
            this._renderers._gradients = {};
            this._gradientId = 0
        }, removeElement: function (c) {
            if (undefined == c) {
                return
            }
            if (this._elements[c.id]) {
                delete this._elements[c.id]
            }
        }, shape: function (c, f) {
            var d = {type: c, id: this._maxId++};
            for (var e in f) {
                d[e] = f[e]
            }
            this._elements[d.id] = d;
            return d
        }, attr: function (c, e) {
            for (var d in e) {
                c[d] = e[d]
            }
        }, removeAttr: function (c, e) {
            for (var d in e) {
                delete c[e[d]]
            }
        }, rect: function (c, j, d, f, i) {
            if (isNaN(c)) {
                throw'Invalid value for "x"'
            }
            if (isNaN(j)) {
                throw'Invalid value for "y"'
            }
            if (isNaN(d)) {
                throw'Invalid value for "width"'
            }
            if (isNaN(f)) {
                throw'Invalid value for "height"'
            }
            var e = this.shape("rect", {x: c, y: j, width: d, height: f});
            if (i) {
                this.attr(e, i)
            }
            return e
        }, path: function (c, e) {
            var d = this.shape("path", e);
            this.attr(d, {d: c});
            return d
        }, line: function (d, f, c, e, h) {
            return this.path("M " + d + "," + f + " L " + c + "," + e, h)
        }, circle: function (c, h, e, f) {
            var d = this.shape("circle", {x: c, y: h, r: e});
            if (f) {
                this.attr(d, f)
            }
            return d
        }, pieSlicePath: function (d, j, i, f, h, e, c) {
            return a.jqx.commonRenderer.pieSlicePath(d, j, i, f, h, e, c)
        }, pieslice: function (l, j, i, f, h, c, k, d) {
            var e = this.path(this.pieSlicePath(l, j, i, f, h, c, k), d);
            this.attr(e, {x: l, y: j, innerRadius: i, outerRadius: f, angleFrom: h, angleTo: c});
            return e
        }, _getCSSStyle: function (d) {
            var k = document.styleSheets;
            try {
                for (var f = 0; f < k.length; f++) {
                    for (var c = 0; k[f].cssRules && c < k[f].cssRules.length; c++) {
                        if (k[f].cssRules[c].selectorText.indexOf(d) != -1) {
                            return k[f].cssRules[c].style
                        }
                    }
                }
            } catch (h) {
            }
            return{}
        }, _getTextParts: function (s, h, j) {
            var n = "Arial";
            var t = "10pt";
            var o = "";
            if (j && j["class"]) {
                var c = this._getCSSStyle(j["class"]);
                if (c.fontSize) {
                    t = c.fontSize
                }
                if (c.fontFamily) {
                    n = c.fontFamily
                }
                if (c.fontWeight) {
                    o = c.fontWeight
                }
            }
            this.ctx.font = o + " " + t + " " + n;
            var f = {width: 0, height: 0, parts: []};
            var m = 0.6;
            var q = s.toString().split("<br>");
            for (var k = 0; k < q.length; k++) {
                var e = q[k];
                var l = this.ctx.measureText(e).width;
                var p = document.createElement("span.jqxchart");
                p.font = this.ctx.font;
                p.textContent = e;
                document.body.appendChild(p);
                var d = p.offsetHeight * m;
                document.body.removeChild(p);
                f.width = Math.max(f.width, a.jqx._rup(l));
                f.height += d + (k > 0 ? 4 : 0);
                f.parts.push({width: l, height: d, text: e})
            }
            return f
        }, _measureText: function (f, e, d, c) {
            return a.jqx.commonRenderer.measureText(f, e, d, c, this)
        }, measureText: function (e, d, c) {
            return this._measureText(e, d, c, false)
        }, text: function (o, n, l, d, p, h, i, e, j, m, f) {
            var q = this.shape("text", {text: o, x: n, y: l, width: d, height: p, angle: h, clip: e, halign: j, valign: m, rotateAround: f});
            if (i) {
                this.attr(q, i)
            }
            q.fontFamily = "Arial";
            q.fontSize = "10pt";
            q.fontWeight = "";
            q.color = "#000000";
            if (i && i["class"]) {
                var c = this._getCSSStyle(i["class"]);
                q.fontFamily = c.fontFamily || q.fontFamily;
                q.fontSize = c.fontSize || q.fontSize;
                q.fontWeight = c.fontWeight || q.fontWeight;
                q.color = c.color || q.color
            }
            var k = this._measureText(o, 0, i, true);
            this.attr(q, {textPartsInfo: k.textPartsInfo, textWidth: k.width, textHeight: k.height});
            if (d <= 0 || isNaN(d)) {
                this.attr(q, {width: k.width})
            }
            if (p <= 0 || isNaN(p)) {
                this.attr(q, {height: k.height})
            }
            return q
        }, _toLinearGradient: function (d, j, h) {
            if (this._renderers._gradients[d]) {
                return d
            }
            var c = [];
            for (var f = 0; f < h.length; f++) {
                c.push({percent: h[f][0] / 100, color: a.jqx.adjustColor(d, h[f][1])})
            }
            var e = "gr" + this._gradientId++;
            this.createGradient(e, j ? "vertical" : "horizontal", c);
            return e
        }, _toRadialGradient: function (d, h) {
            if (this._renderers._gradients[d]) {
                return d
            }
            var c = [];
            for (var f = 0; f < h.length; f++) {
                c.push({percent: h[f][0] / 100, color: a.jqx.adjustColor(d, h[f][1])})
            }
            var e = "gr" + this._gradientId++;
            this.createGradient(e, "radial", c);
            return e
        }, createGradient: function (e, d, c) {
            this._renderers.createGradient(this, e, d, c)
        }, _renderers: {createGradient: function (f, e, d, c) {
                f._gradients[e] = {orientation: d, colorStops: c}
            }, setStroke: function (d, e) {
                var c = d.ctx;
                c.strokeStyle = e.stroke || "transparent";
                c.lineWidth = e["stroke-width"] || 1;
                if (e["fill-opacity"] != undefined) {
                    c.globalAlpha = e["fill-opacity"]
                } else {
                    if (e.opacity != undefined) {
                        c.globalAlpha = e.opacity
                    } else {
                        c.globalAlpha = 1
                    }
                }
                if (c.setLineDash) {
                    if (e["stroke-dasharray"]) {
                        c.setLineDash(e["stroke-dasharray"].split(","))
                    } else {
                        c.setLineDash([])
                    }
                }
            }, setFillStyle: function (d, h) {
                var p = d.ctx;
                p.fillStyle = "transparent";
                if (h["fill-opacity"] != undefined) {
                    p.globalAlpha = h["fill-opacity"]
                } else {
                    if (h.opacity != undefined) {
                        p.globalAlpha = h.opacity
                    } else {
                        p.globalAlpha = 1
                    }
                }
                if (h.fill && h.fill.indexOf("#") == -1 && d._gradients[h.fill]) {
                    var n = d._gradients[h.fill].orientation != "horizontal";
                    var k = d._gradients[h.fill].orientation == "radial";
                    var e = a.jqx.ptrnd(h.x);
                    var o = a.jqx.ptrnd(h.y);
                    var c = a.jqx.ptrnd(h.x + (n ? 0 : h.width));
                    var l = a.jqx.ptrnd(h.y + (n ? h.height : 0));
                    var m;
                    if ((h.type == "circle" || h.type == "path" || h.type == "rect") && k) {
                        x = a.jqx.ptrnd(h.x);
                        y = a.jqx.ptrnd(h.y);
                        r1 = h.innerRadius || 0;
                        r2 = h.outerRadius || h.r || 0;
                        if (h.type == "rect") {
                            x += h.width / 2;
                            y += h.height / 2
                        }
                        m = p.createRadialGradient(x, y, r1, x, y, r2)
                    }
                    if (!k) {
                        if (isNaN(e) || isNaN(c) || isNaN(o) || isNaN(l)) {
                            e = 0;
                            o = 0;
                            c = n ? 0 : p.canvas.width;
                            l = n ? p.canvas.height : 0
                        }
                        m = p.createLinearGradient(e, o, c, l)
                    }
                    var f = d._gradients[h.fill].colorStops;
                    for (var j = 0; j < f.length; j++) {
                        m.addColorStop(f[j].percent, f[j].color)
                    }
                    p.fillStyle = m
                } else {
                    if (h.fill) {
                        p.fillStyle = h.fill
                    }
                }
            }, rect: function (c, d) {
                if (d.width == 0 || d.height == 0) {
                    return
                }
                c.fillRect(a.jqx.ptrnd(d.x), a.jqx.ptrnd(d.y), d.width, d.height);
                c.strokeRect(a.jqx.ptrnd(d.x), a.jqx.ptrnd(d.y), d.width, d.height)
            }, circle: function (c, d) {
                if (d.r == 0) {
                    return
                }
                c.beginPath();
                c.arc(a.jqx.ptrnd(d.x), a.jqx.ptrnd(d.y), d.r, 0, Math.PI * 2, false);
                c.closePath();
                c.fill();
                c.stroke()
            }, _parsePoint: function (d) {
                var c = this._parseNumber(d);
                var e = this._parseNumber(d);
                return({x: c, y: e})
            }, _parseNumber: function (e) {
                var f = false;
                for (var c = this._pos; c < e.length; c++) {
                    if ((e[c] >= "0" && e[c] <= "9") || e[c] == "." || e[c] == "e" || (e[c] == "-" && !f) || (e[c] == "-" && c >= 1 && e[c - 1] == "e")) {
                        f = true;
                        continue
                    }
                    if (!f && (e[c] == " " || e[c] == ",")) {
                        this._pos++;
                        continue
                    }
                    break
                }
                var d = parseFloat(e.substring(this._pos, c));
                if (isNaN(d)) {
                    return undefined
                }
                this._pos = c;
                return d
            }, _cmds: "mlcazq", _isRelativeCmd: function (c) {
                return a.jqx.string.contains(this._cmds, c)
            }, _parseCmd: function (c) {
                for (var d = this._pos; d < c.length; d++) {
                    if (a.jqx.string.containsIgnoreCase(this._cmds, c[d])) {
                        this._pos = d + 1;
                        this._lastCmd = c[d];
                        return this._lastCmd
                    }
                    if (c[d] == " ") {
                        this._pos++;
                        continue
                    }
                    if (c[d] >= "0" && c[d] <= "9") {
                        this._pos = d;
                        if (this._lastCmd == "") {
                            break
                        } else {
                            return this._lastCmd
                        }
                    }
                }
                return undefined
            }, _toAbsolutePoint: function (c) {
                return{x: this._currentPoint.x + c.x, y: this._currentPoint.y + c.y}
            }, path: function (E, N) {
                var B = N.d;
                this._pos = 0;
                this._lastCmd = "";
                var n = undefined;
                this._currentPoint = {x: 0, y: 0};
                E.beginPath();
                var I = 0;
                while (this._pos < B.length) {
                    var H = this._parseCmd(B);
                    if (H == undefined) {
                        break
                    }
                    if (H == "M" || H == "m") {
                        var F = this._parsePoint(B);
                        if (F == undefined) {
                            break
                        }
                        E.moveTo(F.x, F.y);
                        this._currentPoint = F;
                        if (n == undefined) {
                            n = F
                        }
                        continue
                    }
                    if (H == "L" || H == "l") {
                        var F = this._parsePoint(B);
                        if (F == undefined) {
                            break
                        }
                        E.lineTo(F.x, F.y);
                        this._currentPoint = F;
                        continue
                    }
                    if (H == "A" || H == "a") {
                        var j = this._parseNumber(B);
                        var h = this._parseNumber(B);
                        var L = this._parseNumber(B) * (Math.PI / 180);
                        var P = this._parseNumber(B);
                        var f = this._parseNumber(B);
                        var q = this._parsePoint(B);
                        if (this._isRelativeCmd(H)) {
                            q = this._toAbsolutePoint(q)
                        }
                        if (j == 0 || h == 0) {
                            continue
                        }
                        var k = this._currentPoint;
                        var K = {x: Math.cos(L) * (k.x - q.x) / 2 + Math.sin(L) * (k.y - q.y) / 2, y: -Math.sin(L) * (k.x - q.x) / 2 + Math.cos(L) * (k.y - q.y) / 2};
                        var l = Math.pow(K.x, 2) / Math.pow(j, 2) + Math.pow(K.y, 2) / Math.pow(h, 2);
                        if (l > 1) {
                            j *= Math.sqrt(l);
                            h *= Math.sqrt(l)
                        }
                        var t = (P == f ? -1 : 1) * Math.sqrt(((Math.pow(j, 2) * Math.pow(h, 2)) - (Math.pow(j, 2) * Math.pow(K.y, 2)) - (Math.pow(h, 2) * Math.pow(K.x, 2))) / (Math.pow(j, 2) * Math.pow(K.y, 2) + Math.pow(h, 2) * Math.pow(K.x, 2)));
                        if (isNaN(t)) {
                            t = 0
                        }
                        var J = {x: t * j * K.y / h, y: t * -h * K.x / j};
                        var D = {x: (k.x + q.x) / 2 + Math.cos(L) * J.x - Math.sin(L) * J.y, y: (k.y + q.y) / 2 + Math.sin(L) * J.x + Math.cos(L) * J.y};
                        var C = function (i) {
                            return Math.sqrt(Math.pow(i[0], 2) + Math.pow(i[1], 2))
                        };
                        var z = function (m, i) {
                            return(m[0] * i[0] + m[1] * i[1]) / (C(m) * C(i))
                        };
                        var O = function (m, i) {
                            return(m[0] * i[1] < m[1] * i[0] ? -1 : 1) * Math.acos(z(m, i))
                        };
                        var G = O([1, 0], [(K.x - J.x) / j, (K.y - J.y) / h]);
                        var p = [(K.x - J.x) / j, (K.y - J.y) / h];
                        var o = [(-K.x - J.x) / j, (-K.y - J.y) / h];
                        var M = O(p, o);
                        if (z(p, o) <= -1) {
                            M = Math.PI
                        }
                        if (z(p, o) >= 1) {
                            M = 0
                        }
                        if (f == 0 && M > 0) {
                            M = M - 2 * Math.PI
                        }
                        if (f == 1 && M < 0) {
                            M = M + 2 * Math.PI
                        }
                        var z = (j > h) ? j : h;
                        var A = (j > h) ? 1 : j / h;
                        var w = (j > h) ? h / j : 1;
                        E.translate(D.x, D.y);
                        E.rotate(L);
                        E.scale(A, w);
                        E.arc(0, 0, z, G, G + M, 1 - f);
                        E.scale(1 / A, 1 / w);
                        E.rotate(-L);
                        E.translate(-D.x, -D.y);
                        continue
                    }
                    if ((H == "Z" || H == "z") && n != undefined) {
                        E.lineTo(n.x, n.y);
                        this._currentPoint = n;
                        continue
                    }
                    if (H == "C" || H == "c") {
                        var e = this._parsePoint(B);
                        var d = this._parsePoint(B);
                        var c = this._parsePoint(B);
                        E.bezierCurveTo(e.x, e.y, d.x, d.y, c.x, c.y);
                        this._currentPoint = c;
                        continue
                    }
                    if (H == "Q" || H == "q") {
                        var e = this._parsePoint(B);
                        var d = this._parsePoint(B);
                        E.quadraticCurveTo(e.x, e.y, d.x, d.y);
                        this._currentPoint = d;
                        continue
                    }
                }
                E.fill();
                E.stroke();
                E.closePath()
            }, text: function (A, G) {
                var p = a.jqx.ptrnd(G.x);
                var o = a.jqx.ptrnd(G.y);
                var v = a.jqx.ptrnd(G.width);
                var t = a.jqx.ptrnd(G.height);
                var s = G.halign;
                var k = G.valign;
                var D = G.angle;
                var c = G.rotateAround;
                var f = G.textPartsInfo;
                var e = f.parts;
                var E = G.clip;
                if (E == undefined) {
                    E = true
                }
                A.save();
                if (!s) {
                    s = "center"
                }
                if (!k) {
                    k = "center"
                }
                if (E) {
                    A.rect(p, o, v, t);
                    A.clip()
                }
                var H = G.textWidth;
                var l = G.textHeight;
                var q = v || 0;
                var C = t || 0;
                A.fillStyle = G.color;
                A.font = G.fontWeight + " " + G.fontSize + " " + G.fontFamily;
                if (!D || D == 0) {
                    o += l;
                    if (k == "center" || k == "middle") {
                        o += (C - l) / 2
                    } else {
                        if (k == "bottom") {
                            o += C - l
                        }
                    }
                    if (!v) {
                        v = H
                    }
                    if (!t) {
                        t = l
                    }
                    var n = 0;
                    for (var B = e.length - 1; B >= 0; B--) {
                        var u = e[B];
                        var I = p;
                        var m = e[B].width;
                        var d = e[B].height;
                        if (s == "center") {
                            I += (q - m) / 2
                        } else {
                            if (s == "right") {
                                I += (q - m)
                            }
                        }
                        A.fillText(u.text, I, o + n);
                        n -= u.height + (B > 0 ? 4 : 0)
                    }
                    A.restore();
                    return
                }
                var z = a.jqx.commonRenderer.alignTextInRect(p, o, v, t, H, l, s, k, D, c);
                p = z.x;
                o = z.y;
                var j = D * Math.PI * 2 / 360;
                A.translate(p, o);
                A.rotate(j);
                var n = 0;
                var F = f.width;
                for (var B = e.length - 1; B >= 0; B--) {
                    var I = 0;
                    if (s == "center") {
                        I += (F - e[B].width) / 2
                    } else {
                        if (s == "right") {
                            I += (F - e[B].width)
                        }
                    }
                    A.fillText(e[B].text, I, n);
                    n -= e[B].height + 4
                }
                A.restore()
            }}, refresh: function () {
            this.ctx.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);
            for (var c in this._elements) {
                var d = this._elements[c];
                this._renderers.setFillStyle(this, d);
                this._renderers.setStroke(this, d);
                this._renderers[this._elements[c].type](this.ctx, d)
            }
        }};
    a.jqx.createRenderer = function (c, e) {
        var d = c;
        var f = d.renderer = null;
        if (document.createElementNS && (d.renderEngine != "HTML5" && d.renderEngine != "VML")) {
            f = new a.jqx.svgRenderer();
            if (!f.init(e)) {
                if (d.renderEngine == "SVG") {
                    throw"Your browser does not support SVG"
                }
                return null
            }
        }
        if (f == null && d.renderEngine != "HTML5") {
            f = new a.jqx.vmlRenderer();
            if (!f.init(e)) {
                if (d.renderEngine == "VML") {
                    throw"Your browser does not support VML"
                }
                return null
            }
            d._isVML = true
        }
        if (f == null && (d.renderEngine == "HTML5" || d.renderEngine == undefined)) {
            f = new a.jqx.HTML5Renderer();
            if (!f.init(e)) {
                throw"Your browser does not support HTML5 Canvas"
            }
        }
        d.renderer = f;
        return f
    }, a.jqx._widgetToImage = function (q, k, f, o, i, h) {
        var m = q;
        if (!m) {
            return false
        }
        if (f == undefined || f == "") {
            f = "image." + k
        }
        var n = m.renderEngine;
        var d = m.enableAnimations;
        m.enableAnimations = false;
        m.renderEngine = "HTML5";
        if (m.renderEngine != n) {
            try {
                m.refresh()
            } catch (j) {
                m.renderEngine = n;
                m.refresh();
                m.enableAnimations = d;
                return false
            }
        }
        var c = m.renderer.getContainer().find("canvas")[0];
        var l = true;
        if (a.isFunction(h)) {
            l = h(q, c)
        }
        var p = true;
        if (l) {
            p = a.jqx.exportImage(c, k, f, o, i)
        }
        if (m.renderEngine != n) {
            m.renderEngine = n;
            m.refresh();
            m.enableAnimations = d
        }
        return p
    };
    a.jqx.getByPriority = function (c) {
        var e = undefined;
        for (var d = 0; d < c.length && e == undefined; d++) {
            if (e == undefined && c[d] != undefined) {
                e = c[d]
            }
        }
        return e
    };
    a.jqx.exportImage = function (f, o, h, s, k) {
        if (!f) {
            return false
        }
        var m = o.toLowerCase() === "pdf";
        if (m) {
            o = "jpeg"
        }
        if (h == undefined || h == "") {
            h = "image." + o
        }
        if (s == undefined || s == "") {
            throw"Please specifiy export server"
        }
        var u = true;
        try {
            if (f) {
                var i = f.toDataURL("image/" + o);
                if (m) {
                    if (!a.jqx.pdfExport) {
                        a.jqx.pdfExport = {orientation: "portrait", paperSize: "a4"}
                    }
                    var j = 595;
                    switch (a.jqx.pdfExport.paperSize) {
                        case"legal":
                            var j = 612;
                            if (a.jqx.pdfExport.orientation !== "portrait") {
                                j = 1008
                            }
                            break;
                        case"letter":
                            var j = 612;
                            if (a.jqx.pdfExport.orientation !== "portrait") {
                                j = 792
                            }
                            break;
                        case"a3":
                            var j = 841;
                            if (a.jqx.pdfExport.orientation !== "portrait") {
                                j = 1190
                            }
                            break;
                        case"a4":
                            var j = 595;
                            if (a.jqx.pdfExport.orientation !== "portrait") {
                                j = 842
                            }
                            break;
                        case"a5":
                            var j = 420;
                            if (a.jqx.pdfExport.orientation !== "portrait") {
                                j = 595
                            }
                            break
                    }
                    var l = a(f).width();
                    var p = l * 72 / 96;
                    if (p >= j - 20) {
                        p = j - 20
                    }
                    var q = new pdfDataExport(a.jqx.pdfExport.orientation, "pt", a.jqx.pdfExport.paperSize);
                    q.addImage(i, "JPEG", 10, 10, p, 0);
                    q.save(h);
                    return
                }
                i = i.replace("data:image/" + o + ";base64,", "");
                if (k) {
                    a.ajax({dataType: "string", url: s, type: "POST", data: {content: i, fname: h}, async: false, success: function (v, e, w) {
                            u = true
                        }, error: function (v, e, w) {
                            u = false
                        }})
                } else {
                    var d = document.createElement("form");
                    d.method = "POST";
                    d.action = s;
                    d.style.display = "none";
                    document.body.appendChild(d);
                    var t = document.createElement("input");
                    t.name = "fname";
                    t.value = h;
                    t.style.display = "none";
                    var c = document.createElement("input");
                    c.name = "content";
                    c.value = i;
                    c.style.display = "none";
                    d.appendChild(t);
                    d.appendChild(c);
                    d.submit();
                    document.body.removeChild(d);
                    u = true
                }
            }
        } catch (n) {
            u = false
        }
        return u
    }
})(jqxBaseFramework);
(function (a) {
    jqxPlot = function () {};
    jqxPlot.prototype = {get: function (e, c, d) {
            return d !== undefined ? e[c][d] : e[c]
        }, min: function (h, e) {
            var d = NaN;
            for (var c = 0; c < h.length; c++) {
                var f = this.get(h, c, e);
                if (isNaN(d) || f < d) {
                    d = f
                }
            }
            return d
        }, max: function (h, e) {
            var c = NaN;
            for (var d = 0; d < h.length; d++) {
                var f = this.get(h, d, e);
                if (isNaN(c) || f > c) {
                    c = f
                }
            }
            return c
        }, sum: function (h, d) {
            var e = 0;
            for (var c = 0; c < h.length; c++) {
                var f = this.get(h, c, d);
                if (!isNaN(f)) {
                    e += f
                }
            }
            return e
        }, count: function (h, d) {
            var e = 0;
            for (var c = 0; c < h.length; c++) {
                var f = this.get(h, c, d);
                if (!isNaN(f)) {
                    e++
                }
            }
            return e
        }, avg: function (d, c) {
            return this.sum(d, c) / Math.max(1, count(d, c))
        }, filter: function (f, e) {
            if (!e) {
                return f
            }
            var c = [];
            for (var d = 0; d < f.length; d++) {
                if (e(f[d])) {
                    c.push(f[d])
                }
            }
            return c
        }, scale: function (e, k, l, i) {
            if (isNaN(e)) {
                return NaN
            }
            if (e < Math.min(k.min, k.max) || e > Math.max(k.min, k.max)) {
                if (!i || i.ignore_range !== true) {
                    return NaN
                }
            }
            var p = NaN;
            var n = 1;
            if (k.type === undefined || k.type != "logarithmic") {
                var m = Math.abs(k.max - k.min);
                if (!m) {
                    m = 1
                }
                n = Math.abs(e - Math.min(k.min, k.max)) / m
            } else {
                if (k.type === "logarithmic") {
                    var f = k.base;
                    if (isNaN(f)) {
                        f = 10
                    }
                    var j = Math.min(k.min, k.max);
                    if (j <= 0) {
                        j = 1
                    }
                    var o = Math.max(k.min, k.max);
                    if (o <= 0) {
                        o = 1
                    }
                    var h = a.jqx.log(o, f);
                    o = Math.pow(f, h);
                    var d = a.jqx.log(j, f);
                    j = Math.pow(f, d);
                    var c = a.jqx.log(e, f);
                    n = Math.abs(c - d) / (h - d)
                }
            }
            if (l.type === "logarithmic") {
                var f = l.base;
                if (isNaN(f)) {
                    f = 10
                }
                var h = a.jqx.log(l.max, f);
                var d = a.jqx.log(l.min, f);
                if (l.flip) {
                    n = 1 - n
                }
                var c = Math.min(d, h) + n * Math.abs(h - d);
                p = Math.pow(f, c)
            } else {
                p = Math.min(l.min, l.max) + n * Math.abs(l.max - l.min);
                if (l.flip) {
                    p = Math.max(l.min, l.max) - p + l.min
                }
            }
            return p
        }, axis: function (q, s, m) {
            if (m <= 1) {
                return[s, q]
            }
            var h = q;
            var k = s;
            if (isNaN(m) || m < 2) {
                m = 2
            }
            var c = 0;
            while (Math.round(q) != q && Math.round(s) != s && c < 10) {
                q *= 10;
                s *= 10;
                c++
            }
            var n = (s - q) / m;
            while (c < 10 && Math.round(n) != n) {
                q *= 10;
                s *= 10;
                n *= 10;
                c++
            }
            var w = [1, 2, 5];
            var j = 0;
            var t = 0;
            while (true) {
                var o = t % w.length;
                var f = Math.floor(t / w.length);
                var p = Math.pow(10, f) * w[o];
                o = (t + 1) % w.length;
                f = Math.floor((t + 1) / w.length);
                var l = Math.pow(10, f) * w[o];
                if (n >= p && n < l) {
                    break
                }
                t++
            }
            var e = l;
            var u = [];
            var v = a.jqx._rnd(q, e, false);
            var d = c <= 0 ? 1 : Math.pow(10, c);
            while (v < s + e) {
                u.push(v / d);
                v += e
            }
            return u
        }}
})(jqxBaseFramework);

(function (d) {
    var b = {defineInstance: function () {
            var e = {width: 350, height: 350, radius: "50%", endAngle: 270, startAngle: 30, int64: false, editableLabels: false, value: 0, min: 0, max: 220, disabled: false, ticksDistance: "20%", colorScheme: "scheme01", animationDuration: 400, showRanges: true, easing: "easeOutCubic", labels: null, pointer: null, cap: null, caption: null, border: null, ticksMinor: null, ticksMajor: null, tickMode: "default", niceInterval: false, style: null, ranges: [], _radius: 100, _border: null, _radiusDifference: 2, _pointer: null, _labels: [], _cap: null, _ticks: [], _ranges: [], _gauge: null, _caption: null, _animationTimeout: 10, renderer: null, _animations: [], aria: {"aria-valuenow": {name: "value", type: "number"}, "aria-valuemin": {name: "min", type: "number"}, "aria-valuemax": {name: "max", type: "number"}, "aria-disabled": {name: "disabled", type: "boolean"}}};
            d.extend(true, this, e);
            return e
        }, createInstance: function (f) {
            var e = this;
            e.that = this;
            d.jqx.aria(e);
            e._radius = e.radius;
            e.endAngle = e.endAngle * Math.PI / 180 + Math.PI / 2;
            e.startAngle = e.startAngle * Math.PI / 180 + Math.PI / 2;
            if (e.int64 === "s") {
                if (!d.jqx.longInt) {
                    throw new Error("jqxGauge: Missing reference to jqxmath.js")
                }
                d.jqx.longInt(e);
                e._value64 = new d.jqx.math().fromString(e.value.toString(), 10);
                e._min64 = new d.jqx.math().fromString(e.min.toString(), 10);
                e._max64 = new d.jqx.math().fromString(e.max.toString(), 10)
            } else {
                if (e.int64 === "u") {
                    try {
                        BigNumber
                    } catch (g) {
                        throw new Error("jqxGauge: Missing reference to jqxmath.js")
                    }
                    e._value64 = new BigNumber(e.value);
                    e._min64 = new BigNumber(e.min);
                    e._max64 = new BigNumber(e.max)
                } else {
                    e.value = new Number(e.value)
                }
            }
            e._refresh();
            e.renderer.getContainer().css("overflow", "hidden");
            if (e.int64 !== false) {
                e.setValue(e._value64, 0)
            } else {
                e.setValue(e.value, 0)
            }
            d.jqx.utilities.resize(e.host, function () {
                e._refresh(true)
            });
            e.host.addClass(e.toThemeProperty("jqx-widget"))
        }, _validateEasing: function () {
            return !!d.easing[this.easing]
        }, _validateProperties: function () {
            if (this.startAngle === this.endAngle) {
                throw new Error("The end angle can not be equal to the start angle!")
            }
            if (!this._validateEasing()) {
                this.easing = "linear"
            }
            this.ticksDistance = this._validatePercentage(this.ticksDistance, "20%");
            this.border = this._borderConstructor(this.border, this);
            this.style = this.style || {fill: "#ffffff", stroke: "#E0E0E0"};
            this.ticksMinor = new this._tickConstructor(this.ticksMinor, this);
            this.ticksMajor = new this._tickConstructor(this.ticksMajor, this);
            this.cap = new this._capConstructor(this.cap, this);
            this.pointer = new this._pointerConstructor(this.pointer, this);
            this.labels = new this._labelsConstructor(this.labels, this);
            this.caption = new this._captionConstructor(this.caption, this);
            for (var e = 0; e < this.ranges.length; e += 1) {
                this.ranges[e] = new this._rangeConstructor(this.ranges[e], this)
            }
        }, _hostInit: function (f) {
            var e = this._getScale(this.width, "width", this.host.parent()), l = this._getScale(this.height, "height", this.host.parent()), g = this._outerBorderOffset(), m = this.host, i;
            m.width(e);
            m.height(l);
            this.radius = i = 0;
            var k = (this._getScale(this._radius, "width", this.host) || e / 2) - g;
            var j = (this._getScale(this._radius, "height", this.host) || l / 2) - g;
            this.radius = i = Math.min(k, j);
            this._originalRadius = parseInt(this.radius, 10) - this._radiusDifference;
            this._innerRadius = this._originalRadius;
            if (this.border) {
                this._innerRadius -= this._getSize(this.border.size)
            }
            if (!f) {
                m[0].innerHTML = "<div />"
            }
            this._gaugeParent = m.children();
            this._gaugeParent.width(e);
            this._gaugeParent.height(l);
            if (!f) {
                this.renderer.init(this._gaugeParent)
            } else {
                var h = this.renderer.getContainer();
                h[0].style.width = e + "px";
                h[0].style.height = l + "px"
            }
        }, _initRenderer: function (e) {
            if (!d.jqx.createRenderer) {
                throw"Please include a reference to jqxdraw.js"
            }
            return d.jqx.createRenderer(this, e)
        }, _refresh: function (f) {
            var e = this;
            if (f) {
                e._ticksIterator = 0;
                e._labelsIterator = 0;
                if (e._ranges) {
                    d(e._ranges).remove()
                }
                if (e._pointer) {
                    d(e._pointer).remove()
                }
                e._pointer = null;
                e._ranges = [];
                if (e.niceInterval) {
                    if (e._labels) {
                        d(e._labels).remove()
                    }
                    e._labels = [];
                    if (e._ticks) {
                        d(e._ticks).remove();
                        e._ticks = []
                    }
                }
                e._hostInit(f);
                e._render(f);
                return
            }
            if (!e.renderer) {
                e._isVML = false;
                e.host.empty();
                e._initRenderer(e.host)
            }
            var g = e.renderer;
            if (!g) {
                return
            }
            if (e._ranges) {
                d(e._ranges).remove()
            }
            if (e._pointer) {
                d(e._pointer).remove()
            }
            if (e._labels) {
                d(e._labels).remove()
            }
            if (e._cap) {
                d(e._cap).remove()
            }
            if (e._ticks) {
                d(e._ticks).remove()
            }
            if (e._border) {
                d(e._border).remove()
            }
            if (e._caption) {
                d(e._caption).remove()
            }
            e._caption = null;
            e._labels = [];
            e._cap = null;
            e._ticks = [];
            e._ranges = [];
            e._border = null;
            e._pointer = null;
            e._validateProperties();
            e._removeElements();
            e._hostInit();
            e._render();
            e.setValue(this.value, 0);
            e._editableLabels()
        }, val: function (e) {
            if (arguments.length == 0 || typeof (e) == "object") {
                return this.value
            }
            this.setValue(e, 0)
        }, refresh: function (e) {
            if (e === true) {
                return
            }
            this._refresh.apply(this, Array.prototype.slice(arguments))
        }, _outerBorderOffset: function () {
            var e = parseInt(this.border.style["stroke-width"], 10) || 1;
            return e / 2
        }, _removeCollection: function (f) {
            for (var e = 0; e < f.length; e += 1) {
                d(f[e]).remove()
            }
            f = []
        }, _render: function (e) {
            this._addBorder(e);
            this._addGauge(e);
            this._addRanges(e);
            if (!this.niceInterval) {
                this._addTicks(e);
                this._addLabels(e)
            } else {
                this._addTicks()
            }
            this._styleLabels();
            this._addCaption(e);
            this._addPointer(e);
            this._addCap(e)
        }, _addBorder: function (g) {
            if (!this.border.visible) {
                return
            }
            if (g) {
                var f = this._outerBorderOffset();
                this._border.setAttribute("cx", this._originalRadius + f);
                this._border.setAttribute("cy", this._originalRadius + f);
                this._border.setAttribute("r", this._originalRadius);
                return
            }
            var e = this.border.style.fill, f = this._outerBorderOffset();
            if (!e) {
                e = "#BABABA"
            }
            if (this.border.showGradient) {
                if (e.indexOf("url") < 0 && e.indexOf("#grd") < 0) {
                    this._originalColor = e
                } else {
                    e = this._originalColor
                }
                e = this.renderer._toLinearGradient(e, true, [[0, 1], [25, 1.1], [50, 1.5], [100, 1]])
            }
            this._border = this.renderer.circle(this._originalRadius + f, this._originalRadius + f, this._originalRadius);
            this.border.style.fill = e;
            this.renderer.attr(this._border, this.border.style)
        }, _addGauge: function (g) {
            var h = this._originalRadius, e = this.renderer._toLinearGradient("#ffffff", [[3, 2], [100, 1]], true), f = this._outerBorderOffset();
            if (g) {
                this._gauge.setAttribute("cx", h + f);
                this._gauge.setAttribute("cy", h + f);
                this._gauge.setAttribute("r", this._innerRadius)
            } else {
                this._gauge = this.renderer.circle(h + f, h + f, this._innerRadius);
                this.renderer.attr(this._gauge, this.style)
            }
        }, _addCap: function (h) {
            var e = "visible", g = this._outerBorderOffset();
            if (!this.cap.visible) {
                e = "hidden"
            }
            var i = this._originalRadius, f = this._getSize(this.cap.size), j;
            if (h) {
                this._cap.setAttribute("cx", i + g);
                this._cap.setAttribute("cy", i + g);
                this._cap.setAttribute("r", f);
                this._capCenter = [i, i]
            } else {
                j = this.renderer.circle(i + g, i + g, f);
                this._capCenter = [i, i];
                this.renderer.attr(j, this.cap.style);
                d(j).css("visibility", e);
                this._cap = j
            }
        }, _addTicks: function (k) {
            var t = this;
            var v = this.ticksMinor, g = this.ticksMajor, p, u, r = {};
            if (g.visible === false && v.visible === false && this.labels.visible === false) {
                return
            }
            function o(i) {
                if (g.visible) {
                    t._drawTick({angle: t._getAngleByValue(i), distance: t._getDistance(t.ticksDistance), style: g.style, size: t._getSize(g.size), type: "major"}, k)
                }
            }
            function h(j) {
                if (v.visible) {
                    t._drawTick({angle: t._getAngleByValue(j), distance: t._getDistance(t.ticksDistance), style: v.style, size: t._getSize(v.size), type: "minor"}, k)
                }
            }
            function e(i) {
                if (t.labels.visible) {
                    t._addLabel({angle: t._getAngleByValue(i), value: u >= 1 ? i : new Number(i).toFixed(2), distance: t._getDistance(t._getLabelsDistance()), style: t.labels.className}, k)
                }
            }
            var n = 0;
            if (t.int64 === "s") {
                if (this.tickMode === "default") {
                    if (this.niceInterval) {
                        u = this._getNiceInterval("radial");
                        p = this._getNiceInterval("radial", true)
                    } else {
                        u = new d.jqx.math().fromString((g.interval).toString(), 10);
                        p = new d.jqx.math().fromString((v.interval).toString(), 10)
                    }
                } else {
                    startToEnd = this._max64.subtract(this._min64);
                    p = startToEnd.div(new d.jqx.math().fromString((v.number).toString(), 10));
                    u = startToEnd.div(new d.jqx.math().fromString((g.number).toString(), 10))
                }
                if (this.niceInterval) {
                    o(this._min64);
                    e(this._min64);
                    var f = this._min64.subtract(this._min64.modulo(u)).add(u), s;
                    for (var q = f; q.greaterThanOrEqual(this._min64); q = q.subtract(p)) {
                        s = q
                    }
                    for (var m = s, l = f; m.lessThan(this._max64) || l.lessThan(this._max64); m = m.add(p), l = l.add(u)) {
                        n += 1;
                        if (n > 250) {
                            break
                        }
                        if (l.lessThanOrEqual(this._max64)) {
                            o(l);
                            r[l.toString()] = true;
                            if (m.equals(f)) {
                                if (Math.abs(this._getAngleByValue(l) - this._getAngleByValue(this.min)) * this._innerRadius > this._getMaxLabelSize()["height"]) {
                                    e(l)
                                }
                            } else {
                                if ((l.add(u)).lessThan(this._max64)) {
                                    e(l)
                                } else {
                                    if (Math.abs(this._getAngleByValue(l) - this._getAngleByValue(this.max)) * this._innerRadius > this._getMaxLabelSize()["height"]) {
                                        e(l)
                                    }
                                }
                            }
                        }
                        if (!r[m.toString()] && m.lessThanOrEqual(t._max64)) {
                            h(m)
                        }
                        if (t._checkForOverflow(m, p) || t._checkForOverflow(l, u)) {
                            break
                        }
                    }
                    o(this._max64);
                    e(this._max64)
                } else {
                    for (var m = new d.jqx.math().fromString((t.min).toString(), 10), l = new d.jqx.math().fromString((t.min).toString(), 10); m.lessThanOrEqual(t._max64) || l.lessThanOrEqual(t._max64); m = m.add(p), l = l.add(u)) {
                        n += 1;
                        if (n > 250) {
                            break
                        }
                        if (l.lessThanOrEqual(t._max64) && g.visible) {
                            o(l);
                            r[l.toString()] = true
                        }
                        if (!r[m.toString()] && v.visible && m.lessThanOrEqual(t._max64)) {
                            h(m)
                        }
                    }
                }
            } else {
                if (t.int64 === "u") {
                    if (this.tickMode === "default") {
                        if (this.niceInterval) {
                            u = this._getNiceInterval("radial");
                            p = this._getNiceInterval("radial", true)
                        } else {
                            u = new BigNumber(g.interval);
                            p = new BigNumber(v.interval)
                        }
                    } else {
                        startToEnd = this._max64.subtract(this._min64);
                        p = startToEnd.divide(new BigNumber(v.number));
                        u = startToEnd.divide(new BigNumber(g.number))
                    }
                    if (this.niceInterval) {
                        o(this._min64);
                        e(this._min64);
                        var f = this._min64.subtract(this._min64.mod(u)).add(u), s;
                        for (var q = f; q.compare(this._min64) !== -1; q = q.subtract(p)) {
                            s = q
                        }
                        for (var m = s, l = f; m.compare(this._max64) === -1 || l.compare(this._max64) === -1; m = m.add(p), l = l.add(u)) {
                            n += 1;
                            if (n > 250) {
                                break
                            }
                            if (l.compare(this._max64) !== 1) {
                                o(l);
                                r[l.toString()] = true;
                                if (m.compare(f) === 0) {
                                    if (Math.abs(this._getAngleByValue(l) - this._getAngleByValue(this.min)) * this._innerRadius > this._getMaxLabelSize()["height"]) {
                                        e(l)
                                    }
                                } else {
                                    if ((l.add(u)).compare(this._max64) === -1) {
                                        e(l)
                                    } else {
                                        if (Math.abs(this._getAngleByValue(l) - this._getAngleByValue(this.max)) * this._innerRadius > this._getMaxLabelSize()["height"]) {
                                            e(l)
                                        }
                                    }
                                }
                            }
                            if (!r[m.toString()] && (m.compare(t._max64) !== 1)) {
                                h(m)
                            }
                        }
                        o(this._max64);
                        e(this._max64)
                    } else {
                        for (var m = new BigNumber(t.min), l = new BigNumber(t.min); (m.compare(t._max64) !== 1) || (l.compare(t._max64) !== 1); m = m.add(p), l = l.add(u)) {
                            n += 1;
                            if (n > 250) {
                                break
                            }
                            if ((l.compare(t._max64) !== 1) && g.visible) {
                                o(l);
                                r[l.toString()] = true
                            }
                            if (!r[m.toString()] && v.visible && (m.compare(t._max64) !== 1)) {
                                h(m)
                            }
                        }
                    }
                } else {
                    if (this.tickMode === "default") {
                        if (this.niceInterval) {
                            u = this._getNiceInterval("radial");
                            p = this._getNiceInterval("radial", true)
                        } else {
                            u = g.interval;
                            p = v.interval
                        }
                    } else {
                        startToEnd = this.max - this.min;
                        p = startToEnd / v.number;
                        u = startToEnd / g.number
                    }
                    if (this.niceInterval) {
                        o(this.min);
                        e(this.min);
                        var f = this.min - (this.min % u) + u, s;
                        for (var q = f; q >= this.min; q = q - p) {
                            s = q
                        }
                        for (var m = s, l = f; m < this.max || l < this.max; m += p, l += u) {
                            n += 1;
                            if (n > 250) {
                                break
                            }
                            if (l <= this.max) {
                                o(l);
                                r[l.toFixed(5)] = true;
                                if (m === f) {
                                    if (Math.abs(this._getAngleByValue(l) - this._getAngleByValue(this.min)) * this._innerRadius > this._getMaxLabelSize()["height"]) {
                                        e(l)
                                    }
                                } else {
                                    if (l + u < this.max) {
                                        e(l)
                                    } else {
                                        if (Math.abs(this._getAngleByValue(l) - this._getAngleByValue(this.max)) * this._innerRadius > this._getMaxLabelSize()["height"]) {
                                            e(l)
                                        }
                                    }
                                }
                            }
                            if (!r[m.toFixed(5)] && m <= this.max) {
                                h(m)
                            }
                        }
                        o(this.max);
                        e(this.max)
                    } else {
                        for (var m = this.min, l = this.min; m <= this.max || l <= this.max; m += p, l += u) {
                            n += 1;
                            if (n > 250) {
                                break
                            }
                            if (l <= this.max && g.visible) {
                                o(l);
                                r[l.toFixed(5)] = true
                            }
                            if (!r[m.toFixed(5)] && v.visible && m <= this.max) {
                                h(m)
                            }
                        }
                    }
                }
            }
            this._handleTicksVisibility()
        }, _handleTicksVisibility: function () {
            if (!this.ticksMinor.visible) {
                this.host.children(".jqx-gauge-tick-minor").css("visibility", "hidden")
            } else {
                this.host.children(".jqx-gauge-tick-minor").css("visibility", "visible")
            }
            if (!this.ticksMajor.visible) {
                this.host.children(".jqx-gauge-tick-major").css("visibility", "hidden")
            } else {
                this.host.children(".jqx-gauge-tick-major").css("visibility", "visible")
            }
        }, _getSize: function (e) {
            if (e.toString().indexOf("%") >= 0) {
                e = (parseInt(e, 10) / 100) * this._innerRadius
            }
            e = parseInt(e, 10);
            return e
        }, _getDistance: function (e) {
            return this._getSize(e) + (this._originalRadius - this._innerRadius)
        }, _drawTick: function (t, k) {
            var m = this.that;
            var j = t.angle, g = t.distance, s = t.size, l = m._outerBorderOffset(), e = m._originalRadius, i = e - g, n = i - s, h = e + l + i * Math.sin(j), p = e + l + i * Math.cos(j), f = e + l + n * Math.sin(j), o = e + l + n * Math.cos(j), q;
            t.style["class"] = m.toThemeProperty("jqx-gauge-tick-" + t.type);
            if (m._isVML) {
                h = Math.round(h);
                f = Math.round(f);
                p = Math.round(p);
                o = Math.round(o)
            }
            if (k && !m.niceInterval) {
                var q = m._ticks[m._ticksIterator];
                q.setAttribute("x1", h);
                q.setAttribute("x2", f);
                q.setAttribute("y1", p);
                q.setAttribute("y2", o);
                m._ticksIterator++
            } else {
                q = m.renderer.line(h, p, f, o, t.style);
                m._ticks.push(q)
            }
        }, _addRanges: function (h) {
            var f = "visible";
            if (!this.showRanges) {
                f = "hidden"
            } else {
                var e = this.ranges;
                for (var g = 0; g < e.length; g += 1) {
                    this._addRange(e[g], f, h)
                }
            }
        }, _getMaxRangeSize: function () {
            var f, h = -1, j, e;
            for (var g = 0; g < this.ranges.length; g += 1) {
                j = this.ranges[g].startWidth;
                e = this.ranges[g].endWidth;
                if (j > h) {
                    h = j
                }
                if (e > h) {
                    h = e
                }
            }
            return h
        }, _getRangeDistance: function (i, e) {
            var h = this._getLabelsDistance(), f = this._getDistance(i), g = this._getMaxRangeSize();
            if (this.labels.position === "outside") {
                if (h < f + this._getMaxTickSize()) {
                    return this._getDistance(this.ticksDistance) + g / 2 + this._getSize(this.ticksMajor.size)
                }
            } else {
                if (this.labels.position === "inside") {
                    if (h + this._getMaxTickSize() < f) {
                        return this._getSize(this.border.size) + this._originalRadius / 20
                    }
                }
            }
            return f
        }, _addRange: function (m, u, i) {
            var h = this.that;
            if ((h.int64 === "s" && (m._startValue64.lessThan(h._min64) || m._endValue64.greaterThan(h._max64))) || (h.int64 === "u" && ((m._startValue64.compare(h._min64) === -1) || (m._endValue64.compare(h._max64) === 1))) || (h.int64 === false && (m.startValue < h.min || m.endValue > h.max))) {
                return
            }
            var s = h.int64 ? h._getAngleByValue(m._startValue64) : h._getAngleByValue(m.startValue), q = h.int64 ? h._getAngleByValue(m._endValue64) : h._getAngleByValue(m.endValue);
            var f = h._originalRadius, r = f - h._getRangeDistance(m.startDistance, m.startWidth), t = f - h._getRangeDistance(m.endDistance, m.endWidth), n = m.startWidth, k = m.endWidth, j = h._outerBorderOffset(), p = {x: f + j + r * Math.sin(s), y: f + j + r * Math.cos(s)}, l = {x: f + j + t * Math.sin(q), y: f + j + t * Math.cos(q)}, v = h._getProjectionPoint(s, f + j, r, n), g = h._getProjectionPoint(q, f + j, t, k), e = "default", o, m;
            if (Math.abs(q - s) > Math.PI) {
                e = "opposite"
            }
            if (h._isVML) {
                o = h._rangeVMLRender(p, l, f, v, g, k, n, r, t, e)
            } else {
                o = h._rangeSVGRender(p, l, f, v, g, k, n, r, t, e)
            }
            m.style.visibility = u;
            m.style["class"] = h.toThemeProperty("jqx-gauge-range");
            m = h.renderer.path(o, m.style);
            h._ranges.push(m)
        }, _rangeSVGRender: function (i, m, k, o, l, e, j, f, n, h) {
            var p = "", f = k - f, n = k - n, g = ["0,1", "0,0"];
            if (h === "opposite") {
                g = ["1,1", "1,0"]
            }
            p = "M" + i.x + "," + i.y + " ";
            p += "A" + (k - f) + "," + (k - f) + " 100 " + g[0] + " " + m.x + "," + m.y + " ";
            p += "L " + (l.x) + "," + (l.y) + " ";
            p += "A" + (k - e - f) + "," + (k - e - f) + " 100 " + g[1] + " " + (o.x) + "," + (o.y) + " ";
            p += "L " + (i.x) + "," + (i.y) + " ";
            p += "z";
            return p
        }, _rangeVMLRender: function (p, m, h, w, i, l, n, q, s, f) {
            h -= h - q + 10;
            var o = "", r = Math.floor(h + (n + l) / 2), q = Math.floor(h - q), s = Math.floor(s), t = {x: (w.x + i.x) / 2, y: (w.y + i.y) / 2}, e = Math.sqrt((i.x - w.x) * (i.x - w.x) + (i.y - w.y) * (i.y - w.y)), v = Math.floor(t.x + Math.sqrt(h * h - (e / 2) * (e / 2)) * (w.y - i.y) / e), u = Math.floor(t.y + Math.sqrt(h * h - (e / 2) * (e / 2)) * (i.x - w.x) / e), x = {x: (p.x + m.x) / 2, y: (p.y + m.y) / 2}, g = Math.sqrt((m.x - p.x) * (m.x - p.x) + (m.y - p.y) * (m.y - p.y)), k = Math.floor(x.x + Math.sqrt(Math.abs(r * r - (g / 2) * (g / 2))) * (p.y - m.y) / g), j = Math.floor(x.y + Math.sqrt(Math.abs(r * r - (g / 2) * (g / 2))) * (m.x - p.x) / g);
            if (f === "opposite") {
                v = Math.floor(t.x - Math.sqrt(h * h - (e / 2) * (e / 2)) * (w.y - i.y) / e);
                u = Math.floor(t.y - Math.sqrt(h * h - (e / 2) * (e / 2)) * (i.x - w.x) / e);
                k = Math.floor(x.x - Math.sqrt(Math.abs(r * r - (g / 2) * (g / 2))) * (p.y - m.y) / g);
                j = Math.floor(x.y - Math.sqrt(Math.abs(r * r - (g / 2) * (g / 2))) * (m.x - p.x) / g)
            }
            h = Math.floor(h);
            m = {x: Math.floor(m.x), y: Math.floor(m.y)};
            p = {x: Math.floor(p.x), y: Math.floor(p.y)};
            w = {x: Math.floor(w.x), y: Math.floor(w.y)};
            i = {x: Math.floor(i.x), y: Math.floor(i.y)};
            o = "m " + m.x + "," + m.y;
            o += "at " + (k - r) + " " + (j - r) + " " + (r + k) + " " + (r + j) + " " + m.x + "," + m.y + " " + p.x + "," + p.y;
            o += "l " + w.x + "," + w.y;
            o += "m " + m.x + "," + m.y;
            o += "l " + i.x + "," + i.y;
            o += "at " + (v - h) + " " + (u - h) + " " + (h + v) + " " + (h + u) + " " + i.x + "," + i.y + " " + w.x + "," + w.y;
            o += "qx " + w.x + " " + w.y;
            return o
        }, _getProjectionPoint: function (i, f, h, g) {
            var e = {x: f + (h - g) * Math.sin(i), y: f + (h - g) * Math.cos(i)};
            return e
        }, _addLabels: function (i) {
            var g = this, f = g._getLabelInterval();
            if (g.labels.visible && g.labels.interval.toString() !== "0") {
                var k = this._getDistance(this._getLabelsDistance()), j;
                var h = 0;
                if (g.int64 === "s") {
                    for (var e = new d.jqx.math().fromNumber(g.min.toString(), 10); e.lessThanOrEqual(g._max64); e = e.add(f)) {
                        h += 1;
                        if (h > 250) {
                            break
                        }
                        if (e.lessThan(g._min64) || e.greaterThan(g._max64)) {
                            break
                        }
                        this._addLabel({angle: this._getAngleByValue(e), value: e.toString(), distance: k, style: this.labels.className})
                    }
                } else {
                    if (g.int64 === "u") {
                        for (var e = new BigNumber(g.min); e.compare(g._max64) !== 1; e = e.add(f)) {
                            h += 1;
                            if (h > 250) {
                                break
                            }
                            if ((e.compare(g._min64) === -1) || (e.compare(g._max64) === 1)) {
                                break
                            }
                            this._addLabel({angle: this._getAngleByValue(e), value: e.toString(), distance: k, style: this.labels.className})
                        }
                    } else {
                        for (var e = this.min; e <= this.max; e += f) {
                            h += 1;
                            if (h > 250) {
                                break
                            }
                            this._addLabel({angle: this._getAngleByValue(e), value: f >= 1 ? e : new Number(e).toFixed(2), distance: k, style: this.labels.className}, i)
                        }
                    }
                }
            }
        }, _getLabelsDistance: function () {
            var g = this._getMaxLabelSize(), f = this._getDistance(this.labels.distance), e = this._getDistance(this.ticksDistance);
            g = g.width;
            if (this.labels.position === "inside") {
                return e + g - 5
            } else {
                if (this.labels.position === "outside") {
                    if (f < (e - g * 1.5)) {
                        return f
                    }
                    return Math.max(e - g * 1.5, 0.6 * g)
                }
            }
            return this.labels.distance
        }, _addLabel: function (k, p) {
            var n = this.that;
            var C = k.angle, z = n._originalRadius, t = z - k.distance, m = n.labels.offset, u = n._outerBorderOffset(), s = z + u + t * Math.sin(C) + m[0], q = z + u + t * Math.cos(C) + m[1], B = k.value, f = k.style || "", A, o, h = n.labels.fontSize;
            B = n._formatLabel(B.toString());
            var i = {"class": f};
            if (h) {
                i["font-size"] = h
            }
            if (n.labels.fontFamily) {
                i["font-family"] = n.labels.fontFamily
            }
            if (n.labels.fontWeight) {
                i["font-weight"] = n.labels.fontWeight
            }
            if (n.labels.fontStyle) {
                i["font-style"] = n.labels.fontStyle
            }
            if (p && !n.niceInterval) {
                var o = n._labels[n._labelsIterator];
                var v = n.renderer._measureText(B, 0, i, true);
                var j = v.textPartsInfo;
                var g = j.parts;
                var D = j.width;
                var l = j.height;
                o.setAttribute("x", Math.round(s) - v.width / 2 + (v.width - j.width) / 2);
                o.setAttribute("y", Math.round(q) + l + (v.height - l) / 2);
                n._labelsIterator++
            } else {
                var A = n.renderer.measureText(B, 0, i);
                var e = 0;
                if (h !== undefined && Math.PI > C) {
                    e = (-A.width / 2) * (parseInt(h) / 25);
                    if (parseInt(h) <= 10) {
                        e *= -1
                    }
                }
                o = n.renderer.text(B, Math.round(s) - A.width / 2 + e, Math.round(q), A.width, A.height, 0, i);
                n._labels.push(o)
            }
        }, _addCaption: function (g) {
            if (this.caption.visible !== false) {
                var j = this.that;
                var l = j.caption.value, k = j.toThemeProperty("jqx-gauge-caption"), h = j.caption.offset, n = j.renderer.measureText(l, 0, {"class": k}), i = j._getPosition(this.caption.position, n, h), e = j.caption.style, f = j._outerBorderOffset();
                if (!g) {
                    var m = j.renderer.text(l, i.left + f, i.top + f, n.width, n.height, 0, {"class": k});
                    this._caption = m
                } else {
                    this._caption.setAttribute("x", i.left + f);
                    this._caption.setAttribute("y", i.top + f)
                }
            }
        }, _getPosition: function (e, f, j) {
            var i = 0, h = 0, g = this._originalRadius;
            switch (e) {
                case"left":
                    i = (g - f.width) / 2;
                    h = g - f.height / 2;
                    break;
                case"right":
                    i = g + (g - f.width) / 2;
                    h = g - f.height / 2;
                    break;
                case"bottom":
                    i = (2 * g - f.width) / 2;
                    h = (g + 2 * g - f.height) / 2;
                    break;
                default:
                    i = (2 * g - f.width) / 2;
                    h = (g + f.height) / 2;
                    break
            }
            return{left: i + j[0], top: h + j[1]}
        }, _addPointer: function (i) {
            var g = "visible";
            if (!this.pointer.visible) {
                g = "hidden"
            }
            var f = this._originalRadius, j = this._getSize(this.pointer.length), k = j * 0.9, l = this._getAngleByValue(this.value), e = this.pointer.pointerType, h;
            h = this._computePointerPoints(this._getSize(this.pointer.width), l, j, e !== "default");
            this._pointer = this.renderer.path(h, this.pointer.style);
            d(this._pointer).css("visibility", g)
        }, _computePointerPoints: function (e, g, h, f) {
            if (!f) {
                return this._computeArrowPoints(e, g, h)
            } else {
                return this._computeRectPoints(e, g, h)
            }
        }, _computeArrowPoints: function (n, g, k) {
            var f = this._originalRadius - 0.5, l = Math.sin(g), q = Math.cos(g), j = this._outerBorderOffset(), o = f + j + k * l, m = f + j + k * q, i = f + j + n * q, e = f + j - n * l, h = f + j - n * q, s = f + j + n * l, p;
            if (this._isVML) {
                i = Math.round(i);
                h = Math.round(h);
                e = Math.round(e);
                s = Math.round(s);
                o = Math.round(o);
                m = Math.round(m)
            }
            p = "M " + i + "," + e + " L " + h + "," + s + " L " + o + "," + m + "";
            return p
        }, _computeRectPoints: function (q, i, o) {
            var f = this._originalRadius, p = Math.sin(i), t = Math.cos(i), u = o, l = this._outerBorderOffset(), n = f + l - q * t + o * p, h = f + l + q * p + o * t, m = f + l + q * t + o * p, g = f + l - q * p + o * t, k = f + l + q * t, e = f + l - q * p, j = f + l - q * t, v = f + l + q * p, s;
            if (this._isVML) {
                k = Math.round(k);
                j = Math.round(j);
                e = Math.round(e);
                v = Math.round(v);
                n = Math.round(n);
                h = Math.round(h);
                m = Math.round(m);
                g = Math.round(g)
            }
            s = "M " + k + "," + e + " L " + j + "," + v + " L " + n + "," + h + " " + m + "," + g;
            return s
        }, _getAngleByValue: function (s) {
            var v = this, p = v.startAngle, t = p - v.endAngle, e, k, o, n, h;
            if (v.int64 !== false) {
                if (v.int64 === "s") {
                    s = new d.jqx.math().fromString(s.toString(), 10)
                } else {
                    s = new BigNumber(s)
                }
                e = v._min64;
                k = v._max64;
                o = k.subtract(e);
                n = s.subtract(e);
                if (v.int64 === "u") {
                    n = n.intPart()
                }
                var f = o.toString(), j, r = n.toString(), g;
                if (f.length > 15) {
                    var u = f.length - 15;
                    f = f.slice(0, 15) + "." + f.slice(15);
                    j = parseFloat(f);
                    if (r.length > u) {
                        var q = r.length - u;
                        r = r.slice(0, q) + "." + r.slice(q)
                    } else {
                        if (r.length === u) {
                            r = "0." + r
                        } else {
                            var m = "0.";
                            for (var l = 0; l < u - r.length; l++) {
                                m += "0"
                            }
                            r = m + "" + r
                        }
                    }
                    g = parseFloat(r)
                } else {
                    j = parseFloat(o.toString());
                    g = parseFloat(n.toString())
                }
                h = t * g / j + p + Math.PI
            } else {
                e = v.min;
                k = v.max;
                o = k - e;
                n = s - e;
                h = t * n / o + p + Math.PI
            }
            return h
        }, _setValue: function (h) {
            var f = this;
            if ((f.int64 === "s" && h.lessThanOrEqual(f._max64) && h.greaterThanOrEqual(f._min64)) || (f.int64 === "u" && h.compare(f._max64) !== 1 && h.compare(f._min64) !== -1) || (f.int64 === false && h <= f.max && h >= f.min)) {
                var i = f._getAngleByValue(h), e = f.pointer.pointerType, g = f._computePointerPoints(f._getSize(f.pointer.width), i, f._getSize(f.pointer.length), e !== "default");
                if (f._isVML) {
                    if (f._pointer) {
                        d(f._pointer).remove()
                    }
                    f._pointer = f.renderer.path(g, f.pointer.style)
                } else {
                    f.renderer.attr(f._pointer, {d: g})
                }
                if (f.int64 !== false) {
                    f.value = h.toString();
                    if (f.int64 === "s") {
                        f._value64 = new d.jqx.math().fromString(f.value, 10)
                    } else {
                        f._value64 = new BigNumber(f.value)
                    }
                } else {
                    f.value = h
                }
                d.jqx.aria(f, "aria-valuenow", h.toString())
            }
        }, resize: function (f, e) {
            this.width = f;
            this.height = e;
            this.refresh()
        }, propertiesChangedHandler: function (e, f, g) {
            if (g.width && g.height && Object.keys(g).length == 2) {
                e._refresh(true)
            }
        }, propertyChangedHandler: function (e, f, h, g) {
            if (g == h) {
                return
            }
            if (e.batchUpdate && e.batchUpdate.width && e.batchUpdate.height && Object.keys(e.batchUpdate).length == 2) {
                return
            }
            if (f == "min") {
                if (e.int64 === true) {
                    e._min64 = new d.jqx.math().fromString(g.toString(), 10)
                } else {
                    this.min = parseInt(g)
                }
                d.jqx.aria(e, "aria-valuemin", g)
            }
            if (f == "max") {
                if (e.int64 === true) {
                    e._max64 = new d.jqx.math().fromString(g.toString(), 10)
                } else {
                    this.max = parseInt(g)
                }
                d.jqx.aria(e, "aria-valuemax", g)
            }
            if (f === "disabled") {
                if (g) {
                    this.disable()
                } else {
                    this.enable()
                }
                d.jqx.aria(this, "aria-disabled", g)
            } else {
                if (f === "value") {
                    this.value = h;
                    this.setValue(g)
                } else {
                    if (f === "startAngle") {
                        this.startAngle = this.startAngle * Math.PI / 180 + Math.PI / 2
                    } else {
                        if (f === "endAngle") {
                            this.endAngle = this.endAngle * Math.PI / 180 + Math.PI / 2
                        } else {
                            if (f === "colorScheme") {
                                this.pointer.style = null;
                                this.cap.style = null
                            } else {
                                if (f === "radius") {
                                    this._radius = g
                                }
                            }
                        }
                    }
                    if (f !== "animationDuration" && f !== "easing") {
                        this._refresh()
                    }
                }
            }
            if (this.renderer instanceof d.jqx.HTML5Renderer) {
                this.renderer.refresh()
            }
        }, _tickConstructor: function (g, e) {
            if (this.host) {
                return new this._tickConstructor(g, e)
            }
            g = g || {};
            this.size = e._validatePercentage(g.size, "10%");
            function f(h, i) {
                if (e.int64 === false) {
                    h[i] = parseFloat(g[i])
                } else {
                    h[i] = g[i]
                }
                if (!h[i]) {
                    h[i] = 5
                }
            }
            f(this, "interval");
            f(this, "number");
            this.style = g.style || {stroke: "#898989", "stroke-width": 1};
            if (typeof g.visible === "undefined") {
                this.visible = true
            } else {
                this.visible = g.visible
            }
        }, _capConstructor: function (g, e) {
            var f = e._getColorScheme(e.colorScheme)[0];
            if (this.host) {
                return new this._capConstructor(g, e)
            }
            g = g || {};
            if (typeof g.visible === "undefined") {
                this.visible = true
            } else {
                this.visible = g.visible
            }
            this.size = e._validatePercentage(g.size, "4%");
            this.style = g.style || {fill: f, "stroke-width": "1px", stroke: f, "z-index": 30}
        }, _pointerConstructor: function (g, e) {
            var f = e._getColorScheme(e.colorScheme)[0];
            if (this.host) {
                return new this._pointerConstructor(g, e)
            }
            g = g || {};
            if (typeof g.visible === "undefined") {
                this.visible = true
            } else {
                this.visible = g.visible
            }
            this.pointerType = g.pointerType;
            if (this.pointerType !== "default" && this.pointerType !== "rectangle") {
                this.pointerType = "default"
            }
            this.style = g.style || {"z-index": 0, stroke: f, fill: f, "stroke-width": 1};
            this.length = e._validatePercentage(g.length, "70%");
            this.width = e._validatePercentage(g.width, "2%")
        }, _labelsConstructor: function (f, e) {
            if (this.host) {
                return new this._labelsConstructor(f, e)
            }
            f = f || {};
            if (typeof f.visible === "undefined") {
                this.visible = true
            } else {
                this.visible = f.visible
            }
            this.offset = f.offset;
            if (!(this.offset instanceof Array)) {
                this.offset = [0, -10]
            }
            if (!f.interval) {
                f.interval = 20
            }
            if (e.int64 !== false) {
                this.interval = f.interval;
                if (e.int64 === "s") {
                    this._interval64 = new d.jqx.math().fromString(f.interval.toString(), 10)
                } else {
                    this._interval64 = new BigNumber(f.interval)
                }
            } else {
                this.interval = parseFloat(f.interval)
            }
            if (!f.number) {
                f.number = 5
            }
            this.number = f.number;
            this.distance = e._validatePercentage(f.distance, "38%");
            this.position = f.position;
            if (this.position !== "inside" && this.position !== "outside") {
                this.position = "none"
            }
            this.formatValue = f.formatValue;
            this.formatSettings = f.formatSettings;
            this.fontSize = f.fontSize;
            this.fontFamily = f.fontFamily;
            this.fontWeight = f.fontWeight;
            this.fontStyle = f.fontStyle
        }, _captionConstructor: function (f, e) {
            if (this.host) {
                return new this._captionConstructor(f, e)
            }
            f = f || {};
            if (typeof f.visible === "undefined") {
                this.visible = true
            } else {
                this.visible = f.visible
            }
            this.value = f.value || "";
            this.position = f.position;
            if (this.position !== "bottom" && this.position !== "top" && this.position !== "left" && this.position !== "right") {
                this.position = "bottom"
            }
            this.offset = f.offset;
            if (!(this.offset instanceof Array)) {
                this.offset = [0, 0]
            }
        }, _rangeConstructor: function (f, e) {
            if (this.host) {
                return new this._rangeConstructor(f, e)
            }
            f = f || {};
            this.startDistance = e._validatePercentage(f.startDistance, "5%");
            this.endDistance = e._validatePercentage(f.endDistance, "5%");
            this.style = f.style || {fill: "#000000", stroke: "#111111"};
            this.startWidth = parseFloat(f.startWidth, 10);
            if (!this.startWidth) {
                this.startWidth = 10
            }
            this.startWidth = Math.max(this.startWidth, 2);
            this.endWidth = parseFloat(f.endWidth, 10);
            if (!this.endWidth) {
                this.endWidth = 10
            }
            this.endWidth = Math.max(this.endWidth, 2);
            if (f.startValue === undefined) {
                f.startValue = 0
            }
            if (f.endValue === undefined) {
                f.endValue = 100
            }
            if (e.int64 !== false) {
                this.startValue = f.startValue;
                this.endValue = f.endValue;
                if (e.int64 === "s") {
                    this._startValue64 = new d.jqx.math().fromString(f.startValue.toString(), 10);
                    this._endValue64 = new d.jqx.math().fromString(f.endValue.toString(), 10)
                } else {
                    this._startValue64 = new BigNumber(f.startValue);
                    this._endValue64 = new BigNumber(f.endValue)
                }
            } else {
                this.startValue = parseFloat(f.startValue, 10);
                this.endValue = parseFloat(f.endValue, 10)
            }
        }, _borderConstructor: function (f, e) {
            if (this.host) {
                return new this._borderConstructor(f, e)
            }
            f = f || {};
            this.size = e._validatePercentage(f.size, "10%");
            this.style = f.style || {stroke: "#cccccc"};
            if (typeof f.showGradient === "undefined") {
                this.showGradient = true
            } else {
                this.showGradient = f.showGradient
            }
            if (typeof f.visible === "undefined") {
                this.visible = true
            } else {
                this.visible = f.visible
            }
        }};
    var c = {_events: ["valueChanging", "valueChanged"], _animationTimeout: 10, _schemes: [{name: "scheme01", colors: ["#307DD7", "#AA4643", "#89A54E", "#71588F", "#4198AF"]}, {name: "scheme02", colors: ["#7FD13B", "#EA157A", "#FEB80A", "#00ADDC", "#738AC8"]}, {name: "scheme03", colors: ["#E8601A", "#FF9639", "#F5BD6A", "#599994", "#115D6E"]}, {name: "scheme04", colors: ["#D02841", "#FF7C41", "#FFC051", "#5B5F4D", "#364651"]}, {name: "scheme05", colors: ["#25A0DA", "#309B46", "#8EBC00", "#FF7515", "#FFAE00"]}, {name: "scheme06", colors: ["#0A3A4A", "#196674", "#33A6B2", "#9AC836", "#D0E64B"]}, {name: "scheme07", colors: ["#CC6B32", "#FFAB48", "#FFE7AD", "#A7C9AE", "#888A63"]}, {name: "scheme08", colors: ["#3F3943", "#01A2A6", "#29D9C2", "#BDF271", "#FFFFA6"]}, {name: "scheme09", colors: ["#1B2B32", "#37646F", "#A3ABAF", "#E1E7E8", "#B22E2F"]}, {name: "scheme10", colors: ["#5A4B53", "#9C3C58", "#DE2B5B", "#D86A41", "#D2A825"]}, {name: "scheme11", colors: ["#993144", "#FFA257", "#CCA56A", "#ADA072", "#949681"]}, {name: "scheme12", colors: ["#105B63", "#EEEAC5", "#FFD34E", "#DB9E36", "#BD4932"]}, {name: "scheme13", colors: ["#BBEBBC", "#F0EE94", "#F5C465", "#FA7642", "#FF1E54"]}, {name: "scheme14", colors: ["#60573E", "#F2EEAC", "#BFA575", "#A63841", "#BFB8A3"]}, {name: "scheme15", colors: ["#444546", "#FFBB6E", "#F28D00", "#D94F00", "#7F203B"]}, {name: "scheme16", colors: ["#583C39", "#674E49", "#948658", "#F0E99A", "#564E49"]}, {name: "scheme17", colors: ["#142D58", "#447F6E", "#E1B65B", "#C8782A", "#9E3E17"]}, {name: "scheme18", colors: ["#4D2B1F", "#635D61", "#7992A2", "#97BFD5", "#BFDCF5"]}, {name: "scheme19", colors: ["#844341", "#D5CC92", "#BBA146", "#897B26", "#55591C"]}, {name: "scheme20", colors: ["#56626B", "#6C9380", "#C0CA55", "#F07C6C", "#AD5472"]}, {name: "scheme21", colors: ["#96003A", "#FF7347", "#FFBC7B", "#FF4154", "#642223"]}, {name: "scheme22", colors: ["#5D7359", "#E0D697", "#D6AA5C", "#8C5430", "#661C0E"]}, {name: "scheme23", colors: ["#16193B", "#35478C", "#4E7AC7", "#7FB2F0", "#ADD5F7"]}, {name: "scheme24", colors: ["#7B1A25", "#BF5322", "#9DA860", "#CEA457", "#B67818"]}, {name: "scheme25", colors: ["#0081DA", "#3AAFFF", "#99C900", "#FFEB3D", "#309B46"]}, {name: "scheme26", colors: ["#0069A5", "#0098EE", "#7BD2F6", "#FFB800", "#FF6800"]}, {name: "scheme27", colors: ["#FF6800", "#A0A700", "#FF8D00", "#678900", "#0069A5"]}], _getScale: function (e, g, f) {
            if (e && e.toString().indexOf("%") >= 0) {
                e = parseInt(e, 10) / 100;
                return f[g]() * e
            }
            return parseInt(e, 10)
        }, _removeElements: function () {
            this.host.children(".chartContainer").remove();
            this.host.children("#tblChart").remove()
        }, _getLabelInterval: function () {
            var g = this, h = g.labels, e;
            if (g.tickMode === "default") {
                if (g.niceInterval) {
                    e = g._getNiceInterval(g.widgetName === "jqxGauge" ? "radial" : "linear")
                } else {
                    if (g.int64 === false) {
                        e = h.interval
                    } else {
                        if (!h._interval64) {
                            h._interval64 = g.int64 === "s" ? new d.jqx.math().fromNumber(h.interval) : new BigNumber(h.interval)
                        }
                        e = h._interval64
                    }
                }
            } else {
                if (g.int64 === false) {
                    var f = g.max - g.min;
                    e = f / h.number
                } else {
                    var f = g._max64.subtract(g._min64);
                    if (g.int64 === "s") {
                        e = f.div(new d.jqx.math().fromNumber(h.number))
                    } else {
                        e = f.divide(new BigNumber(h.number))
                    }
                }
            }
            return e
        }, _getMaxLabelSize: function () {
            var f = this, j = this.max, e = this.min;
            e = f._formatLabel(e);
            j = f._formatLabel(j);
            var h = d('<div style="position: absolute; visibility: hidden;" class="' + f.toThemeProperty("jqx-gauge-label") + '"></div>');
            h.css({"font-size": f.labels.fontSize, "font-family": f.labels.fontFamily, "font-weight": f.labels.fontWeight, "font-style": f.labels.fontStyle});
            d("body").append(h);
            h.html(e);
            var g = {width: h.width(), height: h.height()};
            h.html(j);
            var i = {width: h.width(), height: h.height()};
            h.remove();
            if (g.width > i.width) {
                return g
            }
            return i
        }, disable: function () {
            this.disabled = true;
            this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"))
        }, enable: function () {
            this.disabled = false;
            this.host.removeClass(this.toThemeProperty("jqx-fill-state-disabled"))
        }, destroy: function () {
            var e = this;
            if (e._timeout) {
                clearTimeout(this._timeout)
            }
            e._timeout = null;
            d.jqx.utilities.resize(e.host, null, true);
            e._removeElements();
            e.renderer.clear();
            e.renderer = null;
            var f = d.data(e.element, "jqxGauge");
            if (f) {
                delete f.instance
            }
            e.host.children().remove();
            e._caption = null;
            e._caption = null;
            e._pointer = null;
            e._labels = [];
            e._cap = null;
            e._ticks = [];
            e._ranges = [];
            e._border = null;
            e._gauge = null;
            e._caption = null;
            e.renderer = null;
            e._animations = [];
            e.host.removeData();
            e.host.removeClass();
            e.host.remove();
            e.that = null;
            e.element = null;
            e._gaugeParent = null;
            delete e._gaugeParent;
            delete e.element;
            delete e.host
        }, _validatePercentage: function (f, e) {
            if (parseFloat(f) !== 0 && (!f || !parseInt(f, 10))) {
                f = e
            }
            return f
        }, _getColorScheme: function (f) {
            var e;
            for (var g = 0; g < this._schemes.length; g += 1) {
                e = this._schemes[g];
                if (e.name === f) {
                    return e.colors
                }
            }
            return null
        }, setValue: function (f, g) {
            var e = this;
            if (!e.disabled) {
                g = g || e.animationDuration || 0;
                if (e.int64 === "s") {
                    if (typeof f === "number") {
                        f = new d.jqx.math().fromNumber(f, 10)
                    } else {
                        if (typeof f === "string") {
                            f = new d.jqx.math().fromString(f, 10)
                        }
                    }
                    if (f.greaterThan(e._max64)) {
                        f = new d.jqx.math().fromString(e._max64.toString(), 10)
                    }
                    if (f.lessThan(e._min64)) {
                        f = new d.jqx.math().fromString(e._min64.toString(), 10)
                    }
                    e._animate(e._value64, f, g)
                } else {
                    if (e.int64 === "u") {
                        f = new BigNumber(f);
                        if (f.compare(e._max64) === 1) {
                            f = new BigNumber(e._max64)
                        }
                        if (f.compare(e._min64) === -1) {
                            f = new BigNumber(e._min64)
                        }
                        e._animate(e._value64, f, g)
                    } else {
                        if (f > e.max) {
                            f = e.max
                        }
                        if (f < e.min) {
                            f = e.min
                        }
                        e._animate(e.value, f, g)
                    }
                }
                d.jqx.aria(e, "aria-valuenow", f.toString())
            }
        }, _animate: function (h, e, g) {
            var f = this;
            if (f._timeout) {
                f._endAnimation(f.int64 ? f._value64 : f.value, false)
            }
            if (!g) {
                f._endAnimation(e, true);
                return
            }
            f._animateHandler(h, e, 0, g)
        }, _animateHandler: function (i, e, h, g) {
            var f = this;
            if (h <= g) {
                this._timeout = setTimeout(function () {
                    if (f.int64 !== false) {
                        var k = e.subtract(i);
                        if (f.int64 === "s") {
                            var j = new d.jqx.math().fromNumber((d.easing[f.easing](h / g, h, 0, 1, g)) * 100, 10);
                            f._value64 = i.add(k.multiply(j).div(new d.jqx.math().fromNumber(100, 10)))
                        } else {
                            var j = new BigNumber((d.easing[f.easing](h / g, h, 0, 1, g)) * 100);
                            f._value64 = i.add(k.multiply(j).divide(100))
                        }
                        f.value = f._value64.toString();
                        f._setValue(f._value64)
                    } else {
                        f.value = i + (e - i) * d.easing[f.easing](h / g, h, 0, 1, g);
                        f._setValue(f.value)
                    }
                    f._raiseEvent(0, {value: f.value.toString()});
                    f._animateHandler(i, e, h + f._animationTimeout, g)
                }, this._animationTimeout)
            } else {
                this._endAnimation(e, true)
            }
        }, _endAnimation: function (e, f) {
            clearTimeout(this._timeout);
            this._timeout = null;
            this._setValue(e);
            if (f) {
                this._raiseEvent(1, {value: e.toString()})
            }
        }, _getMaxTickSize: function () {
            return Math.max(this._getSize(this.ticksMajor.size), this._getSize(this.ticksMinor.size))
        }, _raiseEvent: function (g, f) {
            var h = d.Event(this._events[g]), e;
            h.args = f || {};
            e = this.host.trigger(h);
            return e
        }, _getNiceInterval: function (k, h) {
            function A(C) {
                return Math.log(parseFloat(C)) / Math.LN10
            }
            function v() {
                var C = Math.abs(n.startAngle - n.endAngle) * n._innerRadius;
                return Math.round(C)
            }
            var n = this, B = "width";
            if (k === "linear" && n.orientation === "vertical") {
                B = "height"
            }
            var g = d.jqx.browser.msie ? 0 : 1;
            var f;
            var j = d('<span class="' + n.toThemeProperty("jqx-gauge-label") + '" style="position: absolute; visibility: hidden;"></span>'), y = n._formatLabel(n.min), z = n._formatLabel(n.max);
            j.css({"font-size": n.labels.fontSize, "font-family": n.labels.fontFamily, "font-weight": n.labels.fontWeight, "font-style": n.labels.fontStyle});
            d("body").append(j);
            j.text(y);
            var x = j[B]() + g;
            j.text(z);
            var l = j[B]() + g;
            j.remove();
            var f = Math.max(l, x);
            var o = 1;
            if (k === "radial") {
                var r;
                if (n._innerRadius < 50) {
                    r = 0.3
                } else {
                    if (n._innerRadius < 150) {
                        r = 0.6
                    } else {
                        if (n._innerRadius < 250) {
                            r = 0.7
                        } else {
                            r = 1
                        }
                    }
                }
                o = 8 / Math.max(1, A(n._innerRadius)) * r
            } else {
                var m = 0;
                if (f > 105) {
                    m = (f - 105) / 100
                }
                o = 1.5 + m
            }
            f *= o;
            var e;
            if (k === "radial") {
                e = v()
            } else {
                e = n._getScaleLength()
            }
            var i = Math.ceil(e / f), t, w, p, u, q, s;
            if (h === true) {
                if (k === "radial") {
                    i *= 4
                } else {
                    i *= 3
                }
            }
            if (n.int64 === false) {
                t = n.max - n.min;
                w = Math.floor(A(t) - A(i));
                p = Math.pow(10, w);
                u = i * p;
                q;
                if (t < 2 * u) {
                    q = 1
                } else {
                    if (t < 3 * u) {
                        q = 2
                    } else {
                        if (t < 7 * u) {
                            q = 5
                        } else {
                            q = 10
                        }
                    }
                }
                s = q * p
            } else {
                t = new BigNumber(n.max).subtract(new BigNumber(n.min));
                w = Math.floor(A(t.toString()) - A(i));
                p = new BigNumber(10).pow(new BigNumber(w));
                u = new BigNumber(i).multiply(p);
                q;
                if (t.compare(new BigNumber(2 * u)) === -1) {
                    q = 1
                } else {
                    if (t.compare(new BigNumber(3 * u)) === -1) {
                        q = 2
                    } else {
                        if (t.compare(new BigNumber(7 * u)) === -1) {
                            q = 5
                        } else {
                            q = 10
                        }
                    }
                }
                s = new BigNumber(q).multiply(p);
                if (s.compare(1) === -1) {
                    s = new BigNumber(1)
                }
                if (n.int64 === "s") {
                    s = new d.jqx.math().fromString(s.toString())
                }
            }
            return s
        }, _styleLabels: function () {
            return;
            var f = this, e = f.labels, g = f.host.find(".jqx-gauge-label");
            g.css({"font-size": e.fontSize, "font-family": e.fontFamily, "font-weight": e.fontWeight, "font-style": e.fontStyle})
        }, _checkForOverflow: function (h, f) {
            var e = new BigNumber("9223372036854775807"), g = new BigNumber(h.toString()), i = new BigNumber(f.toString());
            if (g.add(i).compare(e) === 1) {
                return true
            } else {
                return false
            }
        }, _formatLabel: function (i, e) {
            var h = this, f = h.labels.formatValue, j = h.labels.formatSettings, g;
            if (f) {
                g = f(i, e)
            } else {
                if (j) {
                    if (j.radix !== undefined) {
                        g = new d.jqx.math().getRadixValue(i, h.int64, j.radix)
                    } else {
                        if (j.outputNotation !== undefined && j.outputNotation !== "default" && j.outputNotation !== "decimal") {
                            g = new d.jqx.math().getDecimalNotation(i, j.outputNotation, j.decimalDigits, j.digits)
                        } else {
                            if (j.decimalDigits !== undefined) {
                                g = Number(i).toFixed(j.decimalDigits)
                            } else {
                                if (j.digits !== undefined) {
                                    g = Number(i).toPrecision(j.digits)
                                }
                            }
                        }
                    }
                } else {
                    g = i
                }
            }
            return g
        }, _editableLabels: function (j) {
            var k = this;
            function f(p, q) {
                var o = k.renderer.measureText(k._formatLabel(q), 0, {"class": k.toThemeProperty("jqx-gauge-label")});
                i.offset(d(p).offset());
                n.style.width = (o.width + 10) + "px";
                n.style.height = o.height + "px";
                n.style.visibility = "visible";
                n.value = q;
                i.select()
            }
            if (k.editableLabels) {
                var h = k._labels;
                if (h.length === 0) {
                    return
                }
                var g = h[0], m = h[h.length - 1], n, i;
                if (j !== true) {
                    n = document.createElement("input");
                    i = d(n);
                    n.className = "jqx-gauge-label-input";
                    k.element.appendChild(n)
                } else {
                    i = k.host.children("input");
                    n = i[0]
                }
                g.style.cursor = "text";
                m.style.cursor = "text";
                k.addHandler(d(g), "dblclick.jqxGauge" + k.element.id, function (o) {
                    f(this, k.min);
                    k._editedProperty = "min"
                });
                k.addHandler(d(m), "dblclick.jqxGauge" + k.element.id, function (o) {
                    f(this, k.max);
                    k._editedProperty = "max"
                });
                var e = /^-?\d+\.?\d*$/;
                function l(t, r, s, p) {
                    if (t === k[r].toString()) {
                        return false
                    }
                    if (k.int64 === "s") {
                        var q = new d.jqx.math().fromString(t, 10);
                        if ((r === "min" && q.compare(k["_" + p + "64"]) !== -1) || (r === "max" && q.compare(k["_" + p + "64"]) !== 1)) {
                            return false
                        }
                        k[s] = q;
                        k[r] = t
                    } else {
                        if (k.int64 === "u") {
                            var o = new BigNumber(t);
                            if (o.compare(0) === -1 || (r === "min" && o.compare(k["_" + p + "64"]) !== -1) || (r === "max" && o.compare(k["_" + p + "64"]) !== 1)) {
                                return false
                            }
                            k[s] = o;
                            k[r] = t
                        } else {
                            if ((r === "min" && t >= k[p]) || (r === "max" && t <= k[p])) {
                                return false
                            }
                            k[r] = parseFloat(t)
                        }
                    }
                }
                if (j !== true) {
                    k.addHandler(i, "blur.jqxGauge" + k.element.id, function (p) {
                        var q = this.value, o;
                        n.style.visibility = "hidden";
                        if (!e.test(q)) {
                            return
                        }
                        if (k._editedProperty === "min") {
                            o = l(q, "min", "_min64", "max");
                            if (o === false) {
                                return
                            }
                            d.jqx.aria(k, "aria-valuemin", q)
                        } else {
                            o = l(q, "max", "_max64", "min");
                            if (o === false) {
                                return
                            }
                            d.jqx.aria(k, "aria-valuemax", q)
                        }
                        k.refresh();
                        if (k.renderer instanceof d.jqx.HTML5Renderer) {
                            k.renderer.refresh()
                        }
                    })
                }
            }
        }}, a = {defineInstance: function () {
            var e = {int64: false, editableLabels: false, value: -50, max: 40, min: -60, width: 100, height: 300, pointer: {}, labels: {}, animationDuration: 1000, showRanges: {}, ticksMajor: {size: "15%", interval: 5}, ticksMinor: {size: "10%", interval: 2.5}, tickMode: "default", niceInterval: false, ranges: [], easing: "easeOutCubic", colorScheme: "scheme01", disabled: false, rangesOffset: 0, background: {}, ticksPosition: "both", rangeSize: "5%", scaleStyle: null, ticksOffset: null, scaleLength: "90%", orientation: "vertical", aria: {"aria-valuenow": {name: "value", type: "number"}, "aria-valuemin": {name: "min", type: "number"}, "aria-valuemax": {name: "max", type: "number"}, "aria-disabled": {name: "disabled", type: "boolean"}}, displayTank: false, tankStyle: null, _originalColor: "", _width: null, _height: null, renderer: null};
            d.extend(true, this, e);
            return e
        }, createInstance: function () {
            d.jqx.aria(this);
            this.host.css("overflow", "hidden");
            this.host.addClass(this.toThemeProperty("jqx-widget"));
            this.host.append('<input class="jqx-gauge-label-input"/>');
            var e = this;
            if (e.int64 === "s") {
                if (!d.jqx.longInt) {
                    throw new Error("jqxLinearGauge: Missing reference to jqxmath.js")
                }
                d.jqx.longInt(e);
                e._value64 = new d.jqx.math().fromString(e.value.toString(), 10);
                e._min64 = new d.jqx.math().fromString(e.min.toString(), 10);
                e._max64 = new d.jqx.math().fromString(e.max.toString(), 10)
            } else {
                if (e.int64 === "u") {
                    try {
                        BigNumber
                    } catch (f) {
                        throw new Error("jqxLinearGauge: Missing reference to jqxmath.js")
                    }
                    e._value64 = new BigNumber(e.value);
                    e._min64 = new BigNumber(e.min);
                    e._max64 = new BigNumber(e.max)
                }
            }
            d.jqx.utilities.resize(this.host, function () {
                e.refresh(false, false)
            })
        }, val: function (e) {
            if (arguments.length == 0 || typeof (e) == "object") {
                return this.value
            }
            this.setValue(e, 0)
        }, _initRenderer: function (e) {
            if (!d.jqx.createRenderer) {
                throw"Please include a reference to jqxdraw.js"
            }
            return d.jqx.createRenderer(this, e)
        }, refresh: function (i, h) {
            var f = this;
            f._nearLabels = [];
            f._farLabels = [];
            if (!f.renderer) {
                f._isVML = false;
                f.host.empty();
                f._initRenderer(f.host)
            }
            var g = f.renderer;
            if (!g) {
                return
            }
            f._validateProperties();
            f._reset();
            f._init();
            f._performLayout();
            f._render();
            if (h !== false) {
                f.setValue(f.value, 1)
            }
            if (!i) {
                var e = f.labels.position;
                if (e === "both" || e === "near") {
                    f._labels = f._nearLabels;
                    f._editableLabels()
                }
                if (e === "both" || e === "far") {
                    f._labels = f._farLabels;
                    f._editableLabels(e === "both" ? true : undefined)
                }
            }
        }, _getBorderSize: function () {
            var f = 1, e;
            if (this._isVML) {
                f = 0
            }
            if (this.background) {
                e = (parseInt(this.background.style["stroke-width"], 10) || f) / 2;
                if (this._isVML) {
                    return Math.round(e)
                }
                return e
            }
            return f
        }, _validateProperties: function () {
            this.background = this._backgroundConstructor(this.background, this);
            this.ticksOffset = this.ticksOffset || this._getDefaultTicksOffset();
            this.rangesOffset = this.rangesOffset || 0;
            this.rangeSize = this._validatePercentage(this.rangeSize, 5);
            this.ticksOffset[0] = this._validatePercentage(this.ticksOffset[0], "5%");
            this.ticksOffset[1] = this._validatePercentage(this.ticksOffset[1], "5%");
            this.ticksMinor = this._tickConstructor(this.ticksMinor, this);
            this.ticksMajor = this._tickConstructor(this.ticksMajor, this);
            this.scaleStyle = this.scaleStyle || this.ticksMajor.style;
            this.labels = this._labelsConstructor(this.labels, this);
            this.pointer = this._pointerConstructor(this.pointer, this);
            for (var e = 0; e < this.ranges.length; e += 1) {
                this.ranges[e] = this._rangeConstructor(this.ranges[e], this)
            }
        }, _getDefaultTicksOffset: function () {
            if (this.orientation === "horizontal") {
                return["5%", "36%"]
            }
            return["36%", "5%"]
        }, _handleOrientation: function () {
            if (this.orientation === "vertical") {
                d.extend(this, linearVerticalGauge)
            } else {
                d.extend(this, linearHorizontalGauge)
            }
        }, _reset: function () {
            this.host.empty()
        }, _performLayout: function () {
            var e = parseInt(this.background.style["stroke-width"], 10) || 1;
            this._width -= e;
            this._height -= e;
            this.host.css("padding", e / 2)
        }, _init: function () {
            var f = this._getBorderSize(), e;
            this._width = this._getScale(this.width, "width", this.host.parent()) - 3;
            this._height = this._getScale(this.height, "height", this.host.parent()) - 3;
            this.element.innerHTML = "<div/>";
            this.host.width(this._width);
            this.host.height(this._height);
            this.host.children().width(this._width);
            this.host.children().height(this._height);
            this.renderer.init(this.host.children());
            e = this.renderer.getContainer();
            e.width(this._width);
            e.height(this._height)
        }, _render: function () {
            this._renderBackground();
            this._renderTicks();
            if (!this.niceInterval) {
                this._renderLabels()
            }
            this._styleLabels();
            this._renderRanges();
            this._renderPointer()
        }, _renderBackground: function () {
            if (!this.background.visible) {
                return
            }
            var g = this.background.style, f = d.jqx._rup(this._getBorderSize()), e = "rect", h;
            g = this._handleShapeOptions(g);
            if (this.background.backgroundType === "roundedRectangle" && this._isVML) {
                e = "roundrect"
            }
            if (!this._Vml) {
                g.x = f;
                g.y = f
            }
            h = this.renderer.shape(e, g);
            if (this._isVML) {
                this._fixVmlRoundrect(h, g)
            }
        }, _handleShapeOptions: function (g) {
            var e = this.background.style.fill, f = this._getBorderSize();
            if (!e) {
                e = "#cccccc"
            }
            if (this.background.showGradient) {
                if (e.indexOf("url") < 0 && e.indexOf("#grd") < 0) {
                    this._originalColor = e
                } else {
                    e = this._originalColor
                }
                e = this.renderer._toLinearGradient(e, this.orientation === "horizontal", [[1, 1.1], [90, 1.5]])
            }
            this.background.style.fill = e;
            if (this.background.backgroundType === "roundedRectangle") {
                if (this._isVML) {
                    g.arcsize = this.background.borderRadius + "%"
                } else {
                    g.rx = this.background.borderRadius;
                    g.ry = this.background.borderRadius
                }
            }
            g.width = this._width - 1;
            g.height = this._height - 1;
            return g
        }, _fixVmlRoundrect: function (g, f) {
            var e = this._getBorderSize();
            g.style.position = "absolute";
            g.style.left = e;
            g.style.top = e;
            g.style.width = this._width - 1;
            g.style.height = this._height - 1;
            g.strokeweight = 0;
            delete f.width;
            delete f.height;
            delete f.arcsize;
            this.renderer.attr(g, f)
        }, _renderTicks: function () {
            var k = this.ticksMinor, l = this.ticksMajor, f, i, h, g, e, m, j;
            if (this.int64 === "s") {
                f = this._max64.subtract(this._min64);
                if (f.isNegative()) {
                    f = f.negate()
                }
                if (this.tickMode === "default") {
                    if (this.niceInterval) {
                        i = this._getNiceInterval("linear");
                        h = this._getNiceInterval("linear", true)
                    } else {
                        i = l._interval64;
                        h = k._interval64
                    }
                } else {
                    i = f.div(new d.jqx.math().fromNumber(l.number));
                    h = f.div(new d.jqx.math().fromNumber(k.number))
                }
            } else {
                if (this.int64 === "u") {
                    f = this._max64.subtract(this._min64).abs();
                    if (this.tickMode === "default") {
                        if (this.niceInterval) {
                            i = this._getNiceInterval("linear");
                            h = this._getNiceInterval("linear", true)
                        } else {
                            i = l._interval64;
                            h = k._interval64
                        }
                    } else {
                        i = f.divide(new BigNumber(l.number));
                        h = f.divide(new BigNumber(k.number))
                    }
                } else {
                    f = Math.abs(this.max - this.min);
                    if (this.tickMode === "default") {
                        if (this.niceInterval) {
                            i = this._getNiceInterval("linear");
                            h = this._getNiceInterval("linear", true)
                        } else {
                            i = l.interval;
                            h = k.interval
                        }
                    } else {
                        i = f / l.number;
                        h = f / k.number
                    }
                }
            }
            m = {size: this._getSize(l.size), style: l.style, visible: l.visible, interval: i, type: "major"};
            j = {size: this._getSize(k.size), style: k.style, visible: k.visible, interval: h, checkOverlap: true, type: "minor"};
            if (this.ticksPosition === "near" || this.ticksPosition === "both") {
                this._ticksRenderHandler(m);
                this._ticksRenderHandler(j)
            }
            if (this.ticksPosition === "far" || this.ticksPosition === "both") {
                m.isFar = true;
                j.isFar = true;
                this._ticksRenderHandler(m);
                this._ticksRenderHandler(j)
            }
            this._renderConnectionLine()
        }, _ticksRenderHandler: function (f) {
            if (!f.visible && f.type === "minor") {
                return
            }
            var i = this._getSize(this.ticksOffset[0], "width"), g = this._getSize(this.ticksOffset[1], "height"), e = this._getBorderSize(), h = this._calculateTickOffset() + this._getMaxTickSize();
            if (f.isFar) {
                h += f.size
            }
            this._drawTicks(f, e, h + e)
        }, _drawTicks: function (u, l, r) {
            var t = this, k = u.interval, p, m = t.orientation === "vertical" ? "width" : "height", j = t.orientation === "vertical" ? "height" : "width", e = t._getMaxLabelSize()[m], q = t._getMaxLabelSize()[j], h = t._getInterval("ticksMajor"), g = t._getInterval("ticksMinor");
            function o(w) {
                p = t._valueToCoordinates(w);
                if (!u.checkOverlap || !t._overlapTick(w, h, g)) {
                    if (u.visible) {
                        t._renderTick(u.size, p, u.style, r)
                    }
                    if (t.niceInterval && t.labels.visible) {
                        var x, B, A;
                        if (t.orientation === "vertical") {
                            A = t._getSize(t.ticksOffset[1], "height")
                        } else {
                            A = t._getSize(t.ticksOffset[0], "width")
                        }
                        A += l;
                        var v = u.isFar ? "far" : "near", y;
                        if (v === "near") {
                            y = t._calculateTickOffset() - e + l + t._getSize(t.labels.offset)
                        } else {
                            y = t._calculateTickOffset() + 2 * t._getMaxTickSize() + e + l + t._getSize(t.labels.offset)
                        }
                        if (t.int64 === false) {
                            if (w !== t.min && Math.abs(t._valueToCoordinates(t.min) - p) < q) {
                                return
                            }
                            if (w !== t.max && Math.abs(t._valueToCoordinates(t.max) - p) < q) {
                                return
                            }
                        } else {
                            if (t.int64 === "s") {
                                if (w.equals(t._min64) === false && Math.abs(t._valueToCoordinates(t._min64) - p) < q) {
                                    return false
                                }
                                if (w.equals(t._max64) === false && Math.abs(t._valueToCoordinates(t._max64) - p) < q) {
                                    return
                                }
                            } else {
                                if (t.int64 === "u") {
                                    if (w.compare(t._min64) !== 0 && Math.abs(t._valueToCoordinates(t._min64) - p) < q) {
                                        return false
                                    }
                                    if (w.compare(t._max64) !== 0 && Math.abs(t._valueToCoordinates(t._max64) - p) < q) {
                                        return
                                    }
                                }
                            }
                        }
                        var z = t.labels.position;
                        if (u.type === "major" && (z === "both" || z === "near" && u.isFar !== true || z === "far" && u.isFar)) {
                            t._renderLabel(p, v, y, e, w)
                        }
                    }
                }
            }
            if (t.niceInterval) {
                var f;
                if (t.int64 === "s") {
                    o(t._min64);
                    f = t._min64.subtract(t._min64.modulo(k)).add(k);
                    if (u.type === "minor") {
                        for (var s = f; s.greaterThanOrEqual(t._min64); s = s.subtract(k)) {
                            f = s
                        }
                    }
                    for (var n = f; n.lessThan(t._max64); n = n.add(k)) {
                        if (t._checkForOverflow(n, k)) {
                            break
                        }
                        o(n)
                    }
                    o(t._max64)
                } else {
                    if (t.int64 === "u") {
                        o(t._min64);
                        f = t._min64.subtract(t._min64.mod(k)).add(k);
                        if (u.type === "minor") {
                            for (var s = f; s.compare(t._min64) !== -1; s = s.subtract(k)) {
                                f = s
                            }
                        }
                        for (var n = f; n.compare(t._max64) === -1; n = n.add(k)) {
                            o(n)
                        }
                        o(t._max64)
                    } else {
                        o(t.min);
                        f = t.min - (t.min % k) + k;
                        if (u.type === "minor") {
                            for (var s = f; s >= t.min; s = s - k) {
                                f = s
                            }
                        }
                        for (var n = f; n <= t.max; n += k) {
                            o(n)
                        }
                        o(t.max)
                    }
                }
            } else {
                if (t.int64 === "s") {
                    for (var n = new d.jqx.math().fromString(t._min64.toString(), 10); n.lessThanOrEqual(t._max64); n = n.add(k)) {
                        o(n)
                    }
                } else {
                    if (t.int64 === "u") {
                        for (var n = new BigNumber(t._min64); n.compare(t._max64) !== 1; n = n.add(k)) {
                            o(n)
                        }
                    } else {
                        for (var n = t.min; n <= t.max; n += k) {
                            o(n)
                        }
                    }
                }
            }
        }, _calculateTickOffset: function () {
            var f = this._getSize(this.ticksOffset[0], "width"), e = this._getSize(this.ticksOffset[1], "height"), g = e;
            if (this.orientation === "vertical") {
                g = f
            }
            return g
        }, _getInterval: function (g) {
            var i = this, f;
            if (i.tickMode === "default") {
                if (i.niceInterval === true) {
                    f = i._getNiceInterval("linear", g === "ticksMinor")
                } else {
                    if (i.int64 !== false) {
                        f = i[g]._interval64
                    } else {
                        f = i[g].interval
                    }
                }
            } else {
                var h = i[g].number, e;
                if (i.int64 !== false) {
                    e = i._max64.subtract(i._min64);
                    if (i.int64 === "s") {
                        f = e.div(new d.jqx.math().fromNumber(h))
                    } else {
                        f = e.divide(new BigNumber(h))
                    }
                } else {
                    e = i.max - i.min;
                    f = e / i[g].number
                }
            }
            return f
        }, _overlapTick: function (g, e, f) {
            if (this.int64 === "s") {
                g = g.add(this._min64);
                if ((g.modulo(f)).equals(g.modulo(e))) {
                    return true
                } else {
                    return false
                }
            } else {
                if (this.int64 === "u") {
                    g = g.add(this._min64);
                    if ((g.mod(f)).compare(g.mod(e)) === 0) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    g += this.min;
                    if (g % f === g % e) {
                        return true
                    }
                    return false
                }
            }
        }, _renderConnectionLine: function () {
            if (!this.ticksMajor.visible && !this.ticksMinor.visible) {
                return
            }
            var g = this._getScaleLength(), f = this._getBorderSize(), i, k, j = this._getMaxTickSize(), h = j + f;
            if (this.int64 !== false) {
                i = this._valueToCoordinates(this._max64);
                k = this._valueToCoordinates(this._min64)
            } else {
                i = this._valueToCoordinates(this.max);
                k = this._valueToCoordinates(this.min)
            }
            if (this.orientation === "vertical") {
                h += this._getSize(this.ticksOffset[0], "width");
                this.renderer.line(h, i, h, k, this.scaleStyle)
            } else {
                h += this._getSize(this.ticksOffset[1], "height");
                var e = this._getSize(this.ticksOffset[0], "width");
                this.renderer.line(e + i - k, h, e, h, this.scaleStyle)
            }
        }, _getScaleLength: function () {
            return this._getSize(this.scaleLength, (this.orientation === "vertical" ? "height" : "width"))
        }, _renderTick: function (e, i, f, h) {
            var g = this._handleTickCoordinates(e, i, h);
            this.renderer.line(Math.round(g.x1), Math.round(g.y1), Math.round(g.x2), Math.round(g.y2), f)
        }, _handleTickCoordinates: function (e, g, f) {
            if (this.orientation === "vertical") {
                return{x1: f - e, x2: f, y1: g, y2: g}
            }
            return{x1: g, x2: g, y1: f - e, y2: f}
        }, _getTickCoordinates: function (f, g) {
            var e = this._handleTickCoordinates(f, 0, this._calculateTickOffset());
            if (this.orientation === "vertical") {
                e = e.x1
            } else {
                e = e.y1
            }
            e += f;
            return e
        }, _renderLabels: function () {
            if (!this.labels.visible) {
                return
            }
            var g = this._getSize(this.ticksOffset[0], "width"), i = this._getMaxTickSize(), k = this.labels.position, j = "height", f = this._getBorderSize(), h = this._calculateTickOffset() + i, e;
            if (this.orientation === "vertical") {
                g = this._getSize(this.ticksOffset[1], "height");
                j = "width"
            }
            e = this._getMaxLabelSize()[j];
            if (k === "near" || k === "both") {
                this._labelListRender(h - i - e + f, g + f, e, "near")
            }
            if (k === "far" || k === "both") {
                this._labelListRender(h + i + e + f, g + f, e, "far")
            }
        }, _labelListRender: function (l, e, f, o) {
            var h, p, j, q, n, k, g = this._getScaleLength();
            l += this._getSize(this.labels.offset);
            if (this.int64 !== false) {
                n = this._max64.subtract(this._min64);
                if (this.tickMode === "default") {
                    h = this.labels._interval64;
                    if (this.int64 === "s") {
                        p = n.div(h).toNumber()
                    } else {
                        p = parseFloat((n).divide(h).toString())
                    }
                } else {
                    p = this.labels.number;
                    if (this.int64 === "s") {
                        h = n.div(new d.jqx.math().fromNumber(p))
                    } else {
                        h = n.divide(p)
                    }
                }
                q = (this.orientation === "vertical") ? this._max64 : this._min64
            } else {
                n = Math.abs(this.max - this.min);
                if (this.tickMode === "default") {
                    h = this.labels.interval;
                    p = n / h
                } else {
                    p = this.labels.number;
                    h = n / p
                }
                q = (this.orientation === "vertical") ? this.max : this.min
            }
            j = g / p;
            for (var m = 0; m <= p; m += 1) {
                this._renderLabel(e, o, l, f, q);
                if (this.int64 !== false) {
                    q = (this.orientation === "vertical") ? q.subtract(h) : q.add(h)
                } else {
                    q += (this.orientation === "vertical") ? -h : h
                }
                e += j
            }
        }, _renderLabel: function (g, o, l, h, r) {
            var p = this, k = p.labels, j = {"class": this.toThemeProperty("jqx-gauge-label")}, i = this.labels.interval, n, e, m, q;
            var f = "";
            if (k.fontSize) {
                f += "font-size: " + k.fontSize + ";"
            }
            if (k.fontFamily) {
                f += "font-family: " + k.fontFamily
            }
            if (k.fontWeight) {
                f += "font-weight: " + k.fontWeight
            }
            if (k.fontStyle) {
                f += "font-style: " + k.fontStyle
            }
            if (f !== "") {
                j.style = f
            }
            m = this._formatLabel(r.toString(), o);
            e = this.renderer.measureText(m, 0, j);
            if (this.orientation === "vertical") {
                n = (o === "near") ? h - e.width : 0;
                q = this.renderer.text(m, Math.round(l) + n - h / 2, Math.round(g - e.height / 2), e.width, e.height, 0, j)
            } else {
                n = (o === "near") ? h - e.height : 0;
                q = this.renderer.text(m, Math.round(g - e.width / 2), Math.round(l) + n - h / 2, e.width, e.height, 0, j)
            }
            if (o === "near") {
                if (this.niceInterval || this.orientation === "horizontal") {
                    this._nearLabels.push(q)
                } else {
                    this._nearLabels.unshift(q)
                }
            } else {
                if (this.niceInterval || this.orientation === "horizontal") {
                    this._farLabels.push(q)
                } else {
                    this._farLabels.unshift(q)
                }
            }
        }, _renderRanges: function () {
            if (!this.showRanges) {
                return
            }
            var h = (this.orientation === "vertical") ? "width" : "height", j = this._getSize(this.rangesOffset, h), g = this._getSize(this.rangeSize, h), e;
            for (var f = 0; f < this.ranges.length; f += 1) {
                e = this.ranges[f];
                e.size = g;
                this._renderRange(e, j)
            }
        }, _renderRange: function (q, k) {
            var h = this._getScaleLength(), j = this._getBorderSize(), i = this._getSize(this.ticksOffset[0], "width"), g = this._getSize(this.ticksOffset[1], "height"), n = this._getMaxTickSize(), p = this._getSize(q.size), m, f;
            if (this.int64 !== false) {
                m = this._valueToCoordinates(q._endValue64);
                f = q._startValue64;
                if (this.int64 === "s" && f.lessThan(this._min64)) {
                    f = new d.jqx.math().fromString(this._min64.toString(), 10)
                } else {
                    if (this.int64 === "u" && f.compare(this._min64) === -1) {
                        f = new BigNumber(this._min64)
                    }
                }
            } else {
                m = this._valueToCoordinates(q.endValue);
                f = q.startValue;
                if (f < this.min) {
                    f = this.min
                }
            }
            var o = Math.abs(this._valueToCoordinates(f) - m), l, e;
            if (this.orientation === "vertical") {
                l = this.renderer.rect(i + n + k - p + j, m, q.size, o, q.style)
            } else {
                e = o;
                l = this.renderer.rect(this._valueToCoordinates(f), g + n + j, e, q.size, q.style)
            }
            this.renderer.attr(l, q.style)
        }, _renderPointer: function () {
            if (!this.pointer.visible) {
                return
            }
            if (this.pointer.pointerType === "default") {
                this._renderColumnPointer()
            } else {
                this._renderArrowPointer()
            }
        }, _renderColumnPointer: function () {
            if (this.displayTank) {
                var e = {fill: "#FFFFFF"};
                e["fill-opacity"] = 0;
                if (this.tankStyle) {
                    e.stroke = this.tankStyle.stroke;
                    e["stroke-width"] = this.tankStyle.strokeWidth
                } else {
                    e.stroke = "#A1A1A1";
                    e["stroke-width"] = "1px"
                }
                this._tank = this.renderer.rect(0, 0, 0, 0, e);
                this._performTankLayout()
            }
            this._pointer = this.renderer.rect(0, 0, 0, 0, this.pointer.style);
            this.renderer.attr(this._pointer, this.pointer.style);
            if (this.int64 !== false) {
                this._setValue(this._value64)
            } else {
                this._setValue(this.value)
            }
        }, _performTankLayout: function () {
            var e, h, o, l = this._valueToCoordinates(), j = this._getBorderSize(), i = this._getSize(this.ticksOffset[0], "width"), g = this._getSize(this.ticksOffset[1], "height"), m = this._getMaxTickSize(), f = this._getSize(this.pointer.size), k = this._getSize(this.pointer.offset), n = {};
            if (this.int64 !== false) {
                l = this._valueToCoordinates(this._max64);
                e = this._valueToCoordinates(this._min64)
            } else {
                l = this._valueToCoordinates(this.max);
                e = this._valueToCoordinates(this.min)
            }
            o = Math.abs(e - l);
            if (this.orientation === "vertical") {
                h = i + m;
                n = {left: h + k + 1 + j, top: l, height: o, width: f}
            } else {
                h = g + m;
                n = {left: e, top: h + k - f - 1 + j, height: f, width: o}
            }
            if (!this._isVML) {
                this.renderer.attr(this._tank, {x: n.left});
                this.renderer.attr(this._tank, {y: n.top});
                this.renderer.attr(this._tank, {width: n.width});
                this.renderer.attr(this._tank, {height: n.height})
            } else {
                this._tank.style.top = n.top;
                this._tank.style.left = n.left;
                this._tank.style.width = n.width;
                this._tank.style.height = n.height
            }
        }, _renderArrowPointer: function () {
            var e = this._getArrowPathByValue(0);
            this._pointer = this.renderer.path(e, this.pointer.style)
        }, _renderArrowPointerByValue: function (e) {
            var f = this._getArrowPathByValue(e);
            this._pointer = this.renderer.path(f, this.pointer.style)
        }, _getArrowPathByValue: function (o) {
            var i = this._getBorderSize(), m = Math.ceil(this._valueToCoordinates(o)) + i, g = i, h = Math.ceil(this._getSize(this.ticksOffset[0], "width")), f = Math.ceil(this._getSize(this.ticksOffset[1], "height")), j = Math.ceil(this._getSize(this.pointer.offset)), n = Math.ceil(this._getMaxTickSize()), r = Math.ceil(this._getSize(this.pointer.size)), k = Math.ceil(Math.sqrt((r * r) / 3)), q, l, p;
            if (this.orientation === "vertical") {
                g += h + n + j;
                l = (j >= 0) ? g + r : g - r;
                q = "M " + g + " " + m + " L " + l + " " + (m - k) + " L " + l + " " + (m + k)
            } else {
                var e = this._getMaxLabelSize()["height"];
                g += h + n + j + e;
                if (this._isVML) {
                    g -= 2
                }
                p = m;
                m = g;
                g = p;
                l = m - r;
                q = "M " + g + " " + m + " L " + (g - k) + " " + l + " L " + (g + k) + " " + l
            }
            return q
        }, _setValue: function (e) {
            if (this.pointer.pointerType === "default") {
                this._performColumnPointerLayout(e)
            } else {
                this._performArrowPointerLayout(e)
            }
            this.value = e
        }, _performColumnPointerLayout: function (h) {
            var e, i, p, m = this._valueToCoordinates(h), k = this._getBorderSize(), j = this._getSize(this.ticksOffset[0], "width"), g = this._getSize(this.ticksOffset[1], "height"), n = this._getMaxTickSize(), f = this._getSize(this.pointer.size), l = this._getSize(this.pointer.offset), o = {};
            if (this.int64 !== false) {
                e = this._valueToCoordinates(this._min64)
            } else {
                e = this._valueToCoordinates(this.min)
            }
            p = Math.abs(e - m);
            if (this.orientation === "vertical") {
                i = j + n;
                o = {left: i + l + 1 + k, top: m, height: p, width: f}
            } else {
                i = g + n;
                o = {left: e, top: i + l - f - 1 + k, height: f, width: p}
            }
            this._setRectAttrs(o)
        }, _performArrowPointerLayout: function (f) {
            var e = this._getArrowPathByValue(f);
            if (this._isVML) {
                if (this._pointer) {
                    d(this._pointer).remove()
                }
                this._renderArrowPointerByValue(f)
            } else {
                this.renderer.attr(this._pointer, {d: e})
            }
        }, _setRectAttrs: function (e) {
            if (!this._isVML) {
                this.renderer.attr(this._pointer, {x: e.left});
                this.renderer.attr(this._pointer, {y: e.top});
                this.renderer.attr(this._pointer, {width: e.width});
                this.renderer.attr(this._pointer, {height: e.height})
            } else {
                this._pointer.style.top = e.top;
                this._pointer.style.left = e.left;
                this._pointer.style.width = e.width;
                this._pointer.style.height = e.height
            }
        }, _valueToCoordinates: function (t) {
            var n = this._getBorderSize(), k = this._getScaleLength(), l = this._getSize(this.ticksOffset[0], "width"), j = this._getSize(this.ticksOffset[1], "height"), q, f, h;
            if (this.int64 !== false) {
                q = t.subtract(this._min64);
                f = this._max64.subtract(this._min64);
                if (this.int64 === "s") {
                    if (q.isNegative()) {
                        q.negate()
                    }
                    if (f.isNegative()) {
                        f.negate()
                    }
                } else {
                    q = q.intPart().abs();
                    f = f.abs()
                }
                var e = q.toString(), g = f.toString(), m, s;
                if (g.length > 15) {
                    var u = g.length - 15;
                    g = g.slice(0, 15) + "." + g.slice(15);
                    s = parseFloat(g);
                    if (e.length > u) {
                        var r = e.length - u;
                        e = e.slice(0, r) + "." + e.slice(r)
                    } else {
                        if (e.length === u) {
                            e = "0." + e
                        } else {
                            var p = "0.";
                            for (var o = 0; o < u - e.length; o++) {
                                p += "0"
                            }
                            e = p + "" + e
                        }
                    }
                    m = parseFloat(e)
                } else {
                    if (this.int64 === "s") {
                        m = q.toNumber();
                        s = f.toNumber()
                    } else {
                        m = parseFloat(q.toString());
                        s = parseFloat(f.toString())
                    }
                }
                h = (m / s) * k
            } else {
                q = Math.abs(this.min - t);
                f = Math.abs(this.max - this.min);
                h = (q / f) * k
            }
            if (this.orientation === "vertical") {
                return this._height - h - (this._height - j - k) + n
            }
            return h + l
        }, _getSize: function (e, f) {
            f = f || (this.orientation === "vertical" ? "width" : "height");
            if (e.toString().indexOf("%") >= 0) {
                e = (parseInt(e, 10) / 100) * this["_" + f]
            }
            e = parseInt(e, 10);
            return e
        }, propertiesChangedHandler: function (e, f, g) {
            if (g.width && g.height && Object.keys(g).length == 2) {
                e.refresh()
            }
        }, propertyChangedHandler: function (f, g, i, h) {
            if (h == i) {
                return
            }
            if (f.batchUpdate && f.batchUpdate.width && f.batchUpdate.height && Object.keys(f.batchUpdate).length == 2) {
                return
            }
            if (g === "tankStyle" && f.pointer.pointerType === "arrow") {
                return
            }
            if (g == "min") {
                if (f.int64 === "s") {
                    f._min64 = new d.jqx.math().fromString(h.toString(), 10)
                } else {
                    if (f.int64 === "u") {
                        f._min64 = new BigNumber(h)
                    } else {
                        this.min = parseFloat(h)
                    }
                }
                d.jqx.aria(this, "aria-valuemin", h)
            }
            if (g == "max") {
                if (f.int64 === "s") {
                    f._max64 = new d.jqx.math().fromString(h.toString(), 10)
                } else {
                    if (f.int64 === "u") {
                        f._max64 = new BigNumber(h)
                    } else {
                        this.max = parseFloat(h)
                    }
                }
                d.jqx.aria(this, "aria-valuemax", h)
            }
            if (g === "disabled") {
                if (h) {
                    this.disable()
                } else {
                    this.enable()
                }
                d.jqx.aria(this, "aria-disabled", h)
            } else {
                if (g === "value") {
                    if (this._timeout != undefined) {
                        clearTimeout(this._timeout);
                        this._timeout = null
                    }
                    this.value = i;
                    this.setValue(h)
                } else {
                    if (g === "colorScheme") {
                        this.pointer.style = null
                    } else {
                        if (g === "orientation" && i !== h) {
                            var e = this.ticksOffset[0];
                            this.ticksOffset[0] = this.ticksOffset[1];
                            this.ticksOffset[1] = e
                        }
                    }
                    if (g !== "animationDuration" && g !== "easing") {
                        this.refresh()
                    }
                }
            }
            if (this.renderer instanceof d.jqx.HTML5Renderer) {
                this.renderer.refresh()
            }
        }, _backgroundConstructor: function (g, e) {
            if (this.host) {
                return new this._backgroundConstructor(g, e)
            }
            var f = {rectangle: true, roundedRectangle: true};
            g = g || {};
            this.style = g.style || {stroke: "#cccccc", fill: null};
            if (g.visible || typeof g.visible === "undefined") {
                this.visible = true
            } else {
                this.visible = false
            }
            if (f[g.backgroundType]) {
                this.backgroundType = g.backgroundType
            } else {
                this.backgroundType = "roundedRectangle"
            }
            if (this.backgroundType === "roundedRectangle") {
                if (typeof g.borderRadius === "number") {
                    this.borderRadius = g.borderRadius
                } else {
                    this.borderRadius = 15
                }
            }
            if (typeof g.showGradient === "undefined") {
                this.showGradient = true
            } else {
                this.showGradient = g.showGradient
            }
        }, resize: function (f, e) {
            this.width = f;
            this.height = e;
            this.refresh()
        }, _tickConstructor: function (f, e) {
            if (this.host) {
                return new this._tickConstructor(f, e)
            }
            this.size = e._validatePercentage(f.size, "10%");
            if (f.interval) {
                this.interval = f.interval
            } else {
                this.interval = 5
            }
            if (e.int64 === "s") {
                this._interval64 = new d.jqx.math().fromString(this.interval.toString(), 10)
            } else {
                if (e.int64 === "u") {
                    this._interval64 = new BigNumber(this.interval)
                } else {
                    this.interval = parseFloat(this.interval)
                }
            }
            if (f.number) {
                this.number = f.number
            } else {
                this.number = 5
            }
            this.style = f.style || {stroke: "#A1A1A1", "stroke-width": "1px"};
            if (typeof f.visible === "undefined") {
                this.visible = true
            } else {
                this.visible = f.visible
            }
        }, _labelsConstructor: function (f, e) {
            if (this.host) {
                return new this._labelsConstructor(f, e)
            }
            this.position = f.position;
            if (this.position !== "far" && this.position !== "near" && this.position !== "both") {
                this.position = "both"
            }
            this.formatValue = f.formatValue;
            this.formatSettings = f.formatSettings;
            this.visible = f.visible;
            if (this.visible !== false && this.visible !== true) {
                this.visible = true
            }
            if (f.interval) {
                this.interval = f.interval
            } else {
                this.interval = 10
            }
            if (e.int64 === "s") {
                this._interval64 = new d.jqx.math().fromString(this.interval.toString(), 10)
            } else {
                if (e.int64 === "u") {
                    this._interval64 = new BigNumber(this.interval)
                } else {
                    this.interval = parseFloat(this.interval)
                }
            }
            if (f.number) {
                this.number = f.number
            } else {
                this.number = 10
            }
            this.fontSize = f.fontSize;
            this.fontFamily = f.fontFamily;
            this.fontWeight = f.fontWeight;
            this.fontStyle = f.fontStyle;
            this.offset = e._validatePercentage(f.offset, 0)
        }, _rangeConstructor: function (f, e) {
            if (this.host) {
                return new this._rangeConstructor(f, e)
            }
            if (f.startValue) {
                this.startValue = f.startValue
            } else {
                this.startValue = e.min
            }
            if (f.endValue) {
                this.endValue = f.endValue
            } else {
                this.endValue = e.max
            }
            if (e.int64 === "s") {
                this._startValue64 = new d.jqx.math().fromString(this.startValue.toString(), 10);
                this._endValue64 = new d.jqx.math().fromString(this.endValue.toString(), 10);
                if (this._endValue64.lessThanOrEqual(this._startValue64)) {
                    this._endValue64 = this._startValue64.add(new d.jqx.math().fromNumber(1, 10));
                    this.endValue = this._endValue64.toString()
                }
            } else {
                if (e.int64 === "u") {
                    this._startValue64 = new BigNumber(this.startValue);
                    this._endValue64 = new BigNumber(this.endValue);
                    if (this._endValue64.compare(this._startValue64) !== 1) {
                        this._endValue64 = this._startValue64.add(1);
                        this.endValue = this._endValue64.toString()
                    }
                } else {
                    this.startValue = parseFloat(this.startValue);
                    this.endValue = parseFloat(this.endValue);
                    if (this.endValue <= this.startValue) {
                        this.endValue = this.startValue + 1
                    }
                }
            }
            this.style = f.style || {fill: "#dddddd", stroke: "#dddddd"}
        }, _pointerConstructor: function (g, e) {
            if (this.host) {
                return new this._pointerConstructor(g, e)
            }
            var f = e._getColorScheme(e.colorScheme)[0];
            this.pointerType = g.pointerType;
            if (this.pointerType !== "default" && this.pointerType !== "arrow") {
                this.pointerType = "default"
            }
            this.style = g.style || {fill: f, stroke: f, "stroke-width": 1};
            this.size = e._validatePercentage(g.size, "7%");
            this.visible = g.visible;
            if (this.visible !== true && this.visible !== false) {
                this.visible = true
            }
            this.offset = e._validatePercentage(g.offset, 0)
        }};
    d.extend(b, c);
    d.extend(a, c);
    d.jqx.jqxWidget("jqxLinearGauge", "", {});
    d.jqx.jqxWidget("jqxGauge", "", {});
    d.extend(d.jqx._jqxGauge.prototype, b);
    d.extend(d.jqx._jqxLinearGauge.prototype, a)
})(jqxBaseFramework);


//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function () {
    function n(n) {
        function t(t, r, e, u, i, o) {
            for (; i >= 0 && o > i; i += n) {
                var a = u ? u[i] : i;
                e = r(e, t[a], a, t)
            }
            return e
        }
        return function (r, e, u, i) {
            e = b(e, i, 4);
            var o = !k(r) && m.keys(r), a = (o || r).length, c = n > 0 ? 0 : a - 1;
            return arguments.length < 3 && (u = r[o ? o[c] : c], c += n), t(r, e, u, o, c, a)
        }
    }
    function t(n) {
        return function (t, r, e) {
            r = x(r, e);
            for (var u = O(t), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n)
                if (r(t[i], i, t))
                    return i;
            return-1
        }
    }
    function r(n, t, r) {
        return function (e, u, i) {
            var o = 0, a = O(e);
            if ("number" == typeof i)
                n > 0 ? o = i >= 0 ? i : Math.max(i + a, o) : a = i >= 0 ? Math.min(i + 1, a) : i + a + 1;
            else if (r && i && a)
                return i = r(e, u), e[i] === u ? i : -1;
            if (u !== u)
                return i = t(l.call(e, o, a), m.isNaN), i >= 0 ? i + o : -1;
            for (i = n > 0?o:a - 1; i >= 0 && a > i; i += n)
                if (e[i] === u)
                    return i;
            return-1
        }
    }
    function e(n, t) {
        var r = I.length, e = n.constructor, u = m.isFunction(e) && e.prototype || a, i = "constructor";
        for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--; )
            i = I[r], i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i)
    }
    var u = this, i = u._, o = Array.prototype, a = Object.prototype, c = Function.prototype, f = o.push, l = o.slice, s = a.toString, p = a.hasOwnProperty, h = Array.isArray, v = Object.keys, g = c.bind, y = Object.create, d = function () {}, m = function (n) {
        return n instanceof m ? n : this instanceof m ? void(this._wrapped = n) : new m(n)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m), exports._ = m) : u._ = m, m.VERSION = "1.8.3";
    var b = function (n, t, r) {
        if (t === void 0)
            return n;
        switch (null == r ? 3 : r) {
            case 1:
                return function (r) {
                    return n.call(t, r)
                };
            case 2:
                return function (r, e) {
                    return n.call(t, r, e)
                };
            case 3:
                return function (r, e, u) {
                    return n.call(t, r, e, u)
                };
            case 4:
                return function (r, e, u, i) {
                    return n.call(t, r, e, u, i)
                }
        }
        return function () {
            return n.apply(t, arguments)
        }
    }, x = function (n, t, r) {
        return null == n ? m.identity : m.isFunction(n) ? b(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n)
    };
    m.iteratee = function (n, t) {
        return x(n, t, 1 / 0)
    };
    var _ = function (n, t) {
        return function (r) {
            var e = arguments.length;
            if (2 > e || null == r)
                return r;
            for (var u = 1; e > u; u++)
                for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
                    var f = o[c];
                    t && r[f] !== void 0 || (r[f] = i[f])
                }
            return r
        }
    }, j = function (n) {
        if (!m.isObject(n))
            return{};
        if (y)
            return y(n);
        d.prototype = n;
        var t = new d;
        return d.prototype = null, t
    }, w = function (n) {
        return function (t) {
            return null == t ? void 0 : t[n]
        }
    }, A = Math.pow(2, 53) - 1, O = w("length"), k = function (n) {
        var t = O(n);
        return"number" == typeof t && t >= 0 && A >= t
    };
    m.each = m.forEach = function (n, t, r) {
        t = b(t, r);
        var e, u;
        if (k(n))
            for (e = 0, u = n.length; u > e; e++)
                t(n[e], e, n);
        else {
            var i = m.keys(n);
            for (e = 0, u = i.length; u > e; e++)
                t(n[i[e]], i[e], n)
        }
        return n
    }, m.map = m.collect = function (n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) {
            var a = e ? e[o] : o;
            i[o] = t(n[a], a, n)
        }
        return i
    }, m.reduce = m.foldl = m.inject = n(1), m.reduceRight = m.foldr = n(-1), m.find = m.detect = function (n, t, r) {
        var e;
        return e = k(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r), e !== void 0 && e !== -1 ? n[e] : void 0
    }, m.filter = m.select = function (n, t, r) {
        var e = [];
        return t = x(t, r), m.each(n, function (n, r, u) {
            t(n, r, u) && e.push(n)
        }), e
    }, m.reject = function (n, t, r) {
        return m.filter(n, m.negate(x(t)), r)
    }, m.every = m.all = function (n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (!t(n[o], o, n))
                return!1
        }
        return!0
    }, m.some = m.any = function (n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (t(n[o], o, n))
                return!0
        }
        return!1
    }, m.contains = m.includes = m.include = function (n, t, r, e) {
        return k(n) || (n = m.values(n)), ("number" != typeof r || e) && (r = 0), m.indexOf(n, t, r) >= 0
    }, m.invoke = function (n, t) {
        var r = l.call(arguments, 2), e = m.isFunction(t);
        return m.map(n, function (n) {
            var u = e ? t : n[t];
            return null == u ? u : u.apply(n, r)
        })
    }, m.pluck = function (n, t) {
        return m.map(n, m.property(t))
    }, m.where = function (n, t) {
        return m.filter(n, m.matcher(t))
    }, m.findWhere = function (n, t) {
        return m.find(n, m.matcher(t))
    }, m.max = function (n, t, r) {
        var e, u, i = -1 / 0, o = -1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++)
                e = n[a], e > i && (i = e)
        } else
            t = x(t, r), m.each(n, function (n, r, e) {
                u = t(n, r, e), (u > o || u === -1 / 0 && i === -1 / 0) && (i = n, o = u)
            });
        return i
    }, m.min = function (n, t, r) {
        var e, u, i = 1 / 0, o = 1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++)
                e = n[a], i > e && (i = e)
        } else
            t = x(t, r), m.each(n, function (n, r, e) {
                u = t(n, r, e), (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n, o = u)
            });
        return i
    }, m.shuffle = function (n) {
        for (var t, r = k(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0; e > i; i++)
            t = m.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i];
        return u
    }, m.sample = function (n, t, r) {
        return null == t || r ? (k(n) || (n = m.values(n)), n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t))
    }, m.sortBy = function (n, t, r) {
        return t = x(t, r), m.pluck(m.map(n, function (n, r, e) {
            return{value: n, index: r, criteria: t(n, r, e)}
        }).sort(function (n, t) {
            var r = n.criteria, e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0)
                    return 1;
                if (e > r || e === void 0)
                    return-1
            }
            return n.index - t.index
        }), "value")
    };
    var F = function (n) {
        return function (t, r, e) {
            var u = {};
            return r = x(r, e), m.each(t, function (e, i) {
                var o = r(e, i, t);
                n(u, e, o)
            }), u
        }
    };
    m.groupBy = F(function (n, t, r) {
        m.has(n, r) ? n[r].push(t) : n[r] = [t]
    }), m.indexBy = F(function (n, t, r) {
        n[r] = t
    }), m.countBy = F(function (n, t, r) {
        m.has(n, r) ? n[r]++ : n[r] = 1
    }), m.toArray = function (n) {
        return n ? m.isArray(n) ? l.call(n) : k(n) ? m.map(n, m.identity) : m.values(n) : []
    }, m.size = function (n) {
        return null == n ? 0 : k(n) ? n.length : m.keys(n).length
    }, m.partition = function (n, t, r) {
        t = x(t, r);
        var e = [], u = [];
        return m.each(n, function (n, r, i) {
            (t(n, r, i) ? e : u).push(n)
        }), [e, u]
    }, m.first = m.head = m.take = function (n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t)
    }, m.initial = function (n, t, r) {
        return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
    }, m.last = function (n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t))
    }, m.rest = m.tail = m.drop = function (n, t, r) {
        return l.call(n, null == t || r ? 1 : t)
    }, m.compact = function (n) {
        return m.filter(n, m.identity)
    };
    var S = function (n, t, r, e) {
        for (var u = [], i = 0, o = e || 0, a = O(n); a > o; o++) {
            var c = n[o];
            if (k(c) && (m.isArray(c) || m.isArguments(c))) {
                t || (c = S(c, t, r));
                var f = 0, l = c.length;
                for (u.length += l; l > f; )
                    u[i++] = c[f++]
            } else
                r || (u[i++] = c)
        }
        return u
    };
    m.flatten = function (n, t) {
        return S(n, t, !1)
    }, m.without = function (n) {
        return m.difference(n, l.call(arguments, 1))
    }, m.uniq = m.unique = function (n, t, r, e) {
        m.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = x(r, e));
        for (var u = [], i = [], o = 0, a = O(n); a > o; o++) {
            var c = n[o], f = r ? r(c, o, n) : c;
            t ? (o && i === f || u.push(c), i = f) : r ? m.contains(i, f) || (i.push(f), u.push(c)) : m.contains(u, c) || u.push(c)
        }
        return u
    }, m.union = function () {
        return m.uniq(S(arguments, !0, !0))
    }, m.intersection = function (n) {
        for (var t = [], r = arguments.length, e = 0, u = O(n); u > e; e++) {
            var i = n[e];
            if (!m.contains(t, i)) {
                for (var o = 1; r > o && m.contains(arguments[o], i); o++)
                    ;
                o === r && t.push(i)
            }
        }
        return t
    }, m.difference = function (n) {
        var t = S(arguments, !0, !0, 1);
        return m.filter(n, function (n) {
            return!m.contains(t, n)
        })
    }, m.zip = function () {
        return m.unzip(arguments)
    }, m.unzip = function (n) {
        for (var t = n && m.max(n, O).length || 0, r = Array(t), e = 0; t > e; e++)
            r[e] = m.pluck(n, e);
        return r
    }, m.object = function (n, t) {
        for (var r = {}, e = 0, u = O(n); u > e; e++)
            t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, m.findIndex = t(1), m.findLastIndex = t(-1), m.sortedIndex = function (n, t, r, e) {
        r = x(r, e, 1);
        for (var u = r(t), i = 0, o = O(n); o > i; ) {
            var a = Math.floor((i + o) / 2);
            r(n[a]) < u ? i = a + 1 : o = a
        }
        return i
    }, m.indexOf = r(1, m.findIndex, m.sortedIndex), m.lastIndexOf = r(-1, m.findLastIndex), m.range = function (n, t, r) {
        null == t && (t = n || 0, n = 0), r = r || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r)
            u[i] = n;
        return u
    };
    var E = function (n, t, r, e, u) {
        if (!(e instanceof t))
            return n.apply(r, u);
        var i = j(n.prototype), o = n.apply(i, u);
        return m.isObject(o) ? o : i
    };
    m.bind = function (n, t) {
        if (g && n.bind === g)
            return g.apply(n, l.call(arguments, 1));
        if (!m.isFunction(n))
            throw new TypeError("Bind must be called on a function");
        var r = l.call(arguments, 2), e = function () {
            return E(n, e, t, this, r.concat(l.call(arguments)))
        };
        return e
    }, m.partial = function (n) {
        var t = l.call(arguments, 1), r = function () {
            for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++)
                i[o] = t[o] === m ? arguments[e++] : t[o];
            for (; e < arguments.length; )
                i.push(arguments[e++]);
            return E(n, r, this, this, i)
        };
        return r
    }, m.bindAll = function (n) {
        var t, r, e = arguments.length;
        if (1 >= e)
            throw new Error("bindAll must be passed function names");
        for (t = 1; e > t; t++)
            r = arguments[t], n[r] = m.bind(n[r], n);
        return n
    }, m.memoize = function (n, t) {
        var r = function (e) {
            var u = r.cache, i = "" + (t ? t.apply(this, arguments) : e);
            return m.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
        };
        return r.cache = {}, r
    }, m.delay = function (n, t) {
        var r = l.call(arguments, 2);
        return setTimeout(function () {
            return n.apply(null, r)
        }, t)
    }, m.defer = m.partial(m.delay, m, 1), m.throttle = function (n, t, r) {
        var e, u, i, o = null, a = 0;
        r || (r = {});
        var c = function () {
            a = r.leading === !1 ? 0 : m.now(), o = null, i = n.apply(e, u), o || (e = u = null)
        };
        return function () {
            var f = m.now();
            a || r.leading !== !1 || (a = f);
            var l = t - (f - a);
            return e = this, u = arguments, 0 >= l || l > t ? (o && (clearTimeout(o), o = null), a = f, i = n.apply(e, u), o || (e = u = null)) : o || r.trailing === !1 || (o = setTimeout(c, l)), i
        }
    }, m.debounce = function (n, t, r) {
        var e, u, i, o, a, c = function () {
            var f = m.now() - o;
            t > f && f >= 0 ? e = setTimeout(c, t - f) : (e = null, r || (a = n.apply(i, u), e || (i = u = null)))
        };
        return function () {
            i = this, u = arguments, o = m.now();
            var f = r && !e;
            return e || (e = setTimeout(c, t)), f && (a = n.apply(i, u), i = u = null), a
        }
    }, m.wrap = function (n, t) {
        return m.partial(t, n)
    }, m.negate = function (n) {
        return function () {
            return!n.apply(this, arguments)
        }
    }, m.compose = function () {
        var n = arguments, t = n.length - 1;
        return function () {
            for (var r = t, e = n[t].apply(this, arguments); r--; )
                e = n[r].call(this, e);
            return e
        }
    }, m.after = function (n, t) {
        return function () {
            return--n < 1 ? t.apply(this, arguments) : void 0
        }
    }, m.before = function (n, t) {
        var r;
        return function () {
            return--n > 0 && (r = t.apply(this, arguments)), 1 >= n && (t = null), r
        }
    }, m.once = m.partial(m.before, 2);
    var M = !{toString: null}.propertyIsEnumerable("toString"), I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    m.keys = function (n) {
        if (!m.isObject(n))
            return[];
        if (v)
            return v(n);
        var t = [];
        for (var r in n)
            m.has(n, r) && t.push(r);
        return M && e(n, t), t
    }, m.allKeys = function (n) {
        if (!m.isObject(n))
            return[];
        var t = [];
        for (var r in n)
            t.push(r);
        return M && e(n, t), t
    }, m.values = function (n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++)
            e[u] = n[t[u]];
        return e
    }, m.mapObject = function (n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++)
            e = u[a], o[e] = t(n[e], e, n);
        return o
    }, m.pairs = function (n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++)
            e[u] = [t[u], n[t[u]]];
        return e
    }, m.invert = function (n) {
        for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++)
            t[n[r[e]]] = r[e];
        return t
    }, m.functions = m.methods = function (n) {
        var t = [];
        for (var r in n)
            m.isFunction(n[r]) && t.push(r);
        return t.sort()
    }, m.extend = _(m.allKeys), m.extendOwn = m.assign = _(m.keys), m.findKey = function (n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++)
            if (e = u[i], t(n[e], e, n))
                return e
    }, m.pick = function (n, t, r) {
        var e, u, i = {}, o = n;
        if (null == o)
            return i;
        m.isFunction(t) ? (u = m.allKeys(o), e = b(t, r)) : (u = S(arguments, !1, !1, 1), e = function (n, t, r) {
            return t in r
        }, o = Object(o));
        for (var a = 0, c = u.length; c > a; a++) {
            var f = u[a], l = o[f];
            e(l, f, o) && (i[f] = l)
        }
        return i
    }, m.omit = function (n, t, r) {
        if (m.isFunction(t))
            t = m.negate(t);
        else {
            var e = m.map(S(arguments, !1, !1, 1), String);
            t = function (n, t) {
                return!m.contains(e, t)
            }
        }
        return m.pick(n, t, r)
    }, m.defaults = _(m.allKeys, !0), m.create = function (n, t) {
        var r = j(n);
        return t && m.extendOwn(r, t), r
    }, m.clone = function (n) {
        return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n
    }, m.tap = function (n, t) {
        return t(n), n
    }, m.isMatch = function (n, t) {
        var r = m.keys(t), e = r.length;
        if (null == n)
            return!e;
        for (var u = Object(n), i = 0; e > i; i++) {
            var o = r[i];
            if (t[o] !== u[o] || !(o in u))
                return!1
        }
        return!0
    };
    var N = function (n, t, r, e) {
        if (n === t)
            return 0 !== n || 1 / n === 1 / t;
        if (null == n || null == t)
            return n === t;
        n instanceof m && (n = n._wrapped), t instanceof m && (t = t._wrapped);
        var u = s.call(n);
        if (u !== s.call(t))
            return!1;
        switch (u) {
            case"[object RegExp]":
            case"[object String]":
                return"" + n == "" + t;
            case"[object Number]":
                return+n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
            case"[object Date]":
            case"[object Boolean]":
                return+n === +t
        }
        var i = "[object Array]" === u;
        if (!i) {
            if ("object" != typeof n || "object" != typeof t)
                return!1;
            var o = n.constructor, a = t.constructor;
            if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor"in n && "constructor"in t)
                return!1
        }
        r = r || [], e = e || [];
        for (var c = r.length; c--; )
            if (r[c] === n)
                return e[c] === t;
        if (r.push(n), e.push(t), i) {
            if (c = n.length, c !== t.length)
                return!1;
            for (; c--; )
                if (!N(n[c], t[c], r, e))
                    return!1
        } else {
            var f, l = m.keys(n);
            if (c = l.length, m.keys(t).length !== c)
                return!1;
            for (; c--; )
                if (f = l[c], !m.has(t, f) || !N(n[f], t[f], r, e))
                    return!1
        }
        return r.pop(), e.pop(), !0
    };
    m.isEqual = function (n, t) {
        return N(n, t)
    }, m.isEmpty = function (n) {
        return null == n ? !0 : k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length
    }, m.isElement = function (n) {
        return!(!n || 1 !== n.nodeType)
    }, m.isArray = h || function (n) {
        return"[object Array]" === s.call(n)
    }, m.isObject = function (n) {
        var t = typeof n;
        return"function" === t || "object" === t && !!n
    }, m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function (n) {
        m["is" + n] = function (t) {
            return s.call(t) === "[object " + n + "]"
        }
    }), m.isArguments(arguments) || (m.isArguments = function (n) {
        return m.has(n, "callee")
    }), "function" != typeof /./ && "object" != typeof Int8Array && (m.isFunction = function (n) {
        return"function" == typeof n || !1
    }), m.isFinite = function (n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }, m.isNaN = function (n) {
        return m.isNumber(n) && n !== +n
    }, m.isBoolean = function (n) {
        return n === !0 || n === !1 || "[object Boolean]" === s.call(n)
    }, m.isNull = function (n) {
        return null === n
    }, m.isUndefined = function (n) {
        return n === void 0
    }, m.has = function (n, t) {
        return null != n && p.call(n, t)
    }, m.noConflict = function () {
        return u._ = i, this
    }, m.identity = function (n) {
        return n
    }, m.constant = function (n) {
        return function () {
            return n
        }
    }, m.noop = function () {}, m.property = w, m.propertyOf = function (n) {
        return null == n ? function () {} : function (t) {
            return n[t]
        }
    }, m.matcher = m.matches = function (n) {
        return n = m.extendOwn({}, n), function (t) {
            return m.isMatch(t, n)
        }
    }, m.times = function (n, t, r) {
        var e = Array(Math.max(0, n));
        t = b(t, r, 1);
        for (var u = 0; n > u; u++)
            e[u] = t(u);
        return e
    }, m.random = function (n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
    }, m.now = Date.now || function () {
        return(new Date).getTime()
    };
    var B = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"}, T = m.invert(B), R = function (n) {
        var t = function (t) {
            return n[t]
        }, r = "(?:" + m.keys(n).join("|") + ")", e = RegExp(r), u = RegExp(r, "g");
        return function (n) {
            return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n
        }
    };
    m.escape = R(B), m.unescape = R(T), m.result = function (n, t, r) {
        var e = null == n ? void 0 : n[t];
        return e === void 0 && (e = r), m.isFunction(e) ? e.call(n) : e
    };
    var q = 0;
    m.uniqueId = function (n) {
        var t = ++q + "";
        return n ? n + t : t
    }, m.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var K = /(.)^/, z = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029"}, D = /\\|'|\r|\n|\u2028|\u2029/g, L = function (n) {
        return"\\" + z[n]
    };
    m.template = function (n, t, r) {
        !t && r && (t = r), t = m.defaults({}, t, m.templateSettings);
        var e = RegExp([(t.escape || K).source, (t.interpolate || K).source, (t.evaluate || K).source].join("|") + "|$", "g"), u = 0, i = "__p+='";
        n.replace(e, function (t, r, e, o, a) {
            return i += n.slice(u, a).replace(D, L), u = a + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"), t
        }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {
            var o = new Function(t.variable || "obj", "_", i)
        } catch (a) {
            throw a.source = i, a
        }
        var c = function (n) {
            return o.call(this, n, m)
        }, f = t.variable || "obj";
        return c.source = "function(" + f + "){\n" + i + "}", c
    }, m.chain = function (n) {
        var t = m(n);
        return t._chain = !0, t
    };
    var P = function (n, t) {
        return n._chain ? m(t).chain() : t
    };
    m.mixin = function (n) {
        m.each(m.functions(n), function (t) {
            var r = m[t] = n[t];
            m.prototype[t] = function () {
                var n = [this._wrapped];
                return f.apply(n, arguments), P(this, r.apply(m, n))
            }
        })
    }, m.mixin(m), m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (n) {
        var t = o[n];
        m.prototype[n] = function () {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], P(this, r)
        }
    }), m.each(["concat", "join", "slice"], function (n) {
        var t = o[n];
        m.prototype[n] = function () {
            return P(this, t.apply(this._wrapped, arguments))
        }
    }), m.prototype.value = function () {
        return this._wrapped
    }, m.prototype.valueOf = m.prototype.toJSON = m.prototype.value, m.prototype.toString = function () {
        return"" + this._wrapped
    }, "function" == typeof define && define.amd && define("underscore", [], function () {
        return m
    })
}).call(this);
//# sourceMappingURL=underscore-min.map