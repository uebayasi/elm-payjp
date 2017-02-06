/*! pay.js: build 2017-1-26 17:44:0 */
!function (e) {
    function t(i) {
        if (n[i]) return n[i].exports;
        var a = n[i] = {
                exports: {},
                id: i,
                loaded: !1
            };

        return e[i].call(a.exports, a, a.exports, t),
            a.loaded = !0,
            a.exports
    }

    var n = {};

    return t.m = e,
        t.c = n,
        t.p = "",
        t(0)
}([
    function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        var a = n(1), r = i(a);

        window.Payjp = new r["default"]({
            apiURL: "https://api.pay.jp",
            applePayMerchantId: "merchant.jp.pay.production"
        })
    },
    function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n ++) {
                        var i = t[n];

                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }

                return function (t, n, i) {
                    return n && e(t.prototype, n),
                        i && e(t, i),
                        t
                }
            }(), o = n(2), s = i(o), u = n(4), l = i(u), c = n(5), f = i(c), p = {
                apiURL: "https://api.pay.jp",
                applePayMerchantId: "merchant.jp.pay.production"
            }, d = function () {
                function e() {
                    var t = arguments.length <= 0 || void 0 === arguments[0] ? {}
                        : arguments[0];
                    a(this, e),
                        this.transport = new s["default"](t.apiURL || p.apiURL),
                        this.validate = new l["default"],
                        this.applePay = new f["default"](this, t.applePayMerchantId || p.applePayMerchantId),
                        this._publicKey = "",
                        this._lang = "ja"
                }

                return r(e, [
                    {
                        key: "setPublicKey",
                        value: function (e) {
                            this._publicKey = e
                        }
                    },
                    {
                        key: "getPublicKey",
                        value: function () {
                            return this._publicKey
                        }
                    },
                    {
                        key: "setLanguage",
                        value: function (e) {
                            this._lang = e
                        }
                    },
                    {
                        key: "getLanguage",
                        value: function () {
                            return this._lang
                        }
                    },
                    {
                        key: "_hasPublicKey",
                        value: function () {
                            if ("" === this.getPublicKey()) throw new Error("public_key がセットされていません");

                            return !0
                        }
                    },
                    {
                        key: "retrieveAvailability",
                        value: function (e) {
                            return this._hasPublicKey() ? this.transport.callAPI("GET", "accounts/brands", {}, this.getPublicKey(), e) : void 0
                        }
                    },
                    {
                        key: "createToken",
                        value: function (e, t, n) {
                            if ("function" == typeof t && (n = t),
                                    this._hasPublicKey()) {
                                var i = {
                                        card: e
                                    };

                                return this.transport.callAPI("POST", "tokens", i, this.getPublicKey(), n)
                            }
                        }
                    },
                    {
                        key: "getToken",
                        value: function (e, t) {
                            return this._hasPublicKey() ? this.transport.callAPI("GET", "tokens/" + e, {}, this.getPublicKey(), t) : void 0
                        }
                    }
                ]),
                    e
            }();

        t["default"] = d,
            e.exports = t["default"]
    },
    function (e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }

        function a(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n ++) {
                        var i = t[n];

                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }

                return function (t, n, i) {
                    return n && e(t.prototype, n),
                        i && e(t, i),
                        t
                }
            }(), o = n(3), s = i(o), u = new s["default"], l = function () {
                function e(t) {
                    a(this, e),
                        t ? this.apiURL = t : this.apiURL = "https://api.pay.jp",
                        this.iframe = null,
                        this.ok = !1,
                        this.initializedCallback = !1,
                        this.callCount = 0,
                        this.messageQueue = [],
                        this.callbackQueue = {},
                        this.timeoutQueue = {}
                }

                return r(e, [
                    {
                        key: "onMessage",
                        value: function (e) {
                            var t = e.id, n = void 0;

                            n = null === e.response || "" === e.response ? {
                                error: {
                                    description: "token を取得できません"
                                }
                            }
                            : JSON.parse(e.response),
                                this.callbackQueue[t](parseInt(e.status, 10), n),
                                window.clearTimeout(this.timeoutQueue[t]),
                                delete this.callbackQueue[t],
                                delete this.timeoutQueue[t]
                        }
                    },
                    {
                        key: "processMessages",
                        value: function () {
                            var e = this;

                            if (this.iframe) {
                                for (var t = 0; t < this.messageQueue.length; t ++) {
                                    var n = this.messageQueue[t];

                                    this.callbackQueue[n.message.id] = n.callback,
                                        u.postMessage(n.message, this.apiURL, this.iframeSrc, this.iframe),
                                        function (t) {
                                        e.timeoutQueue[t.message.id] = setTimeout(function () {
                                            e.callbackQueue[t.message.id](504, {
                                                error: {
                                                    description: "token を取得できません"
                                                }
                                            }),
                                                delete e.callbackQueue[t.message.id],
                                                delete e.timeoutQueue[t.message.id]
                                        }, 6e3)
                                    }(n)
                                }

                                this.messageQueue = []
                            }
                        }
                    },
                    {
                        key: "initIframe",
                        value: function () {
                            var e = this, t = document.createElement("iframe"), n = "payjpFrame" + (new Date).getTime(), i = this.apiURL + "/v1/js/apitunnel.html", a = i + "#" + encodeURIComponent(window.location.href);

                            t.setAttribute("src", a),
                                t.setAttribute("name", n),
                                t.setAttribute("id", n),
                                t.setAttribute("frameborder", "0"),
                                t.setAttribute("scrolling", "no"),
                                t.setAttribute("allowtransparency", "true"),
                                t.setAttribute("width", 0),
                                t.setAttribute("height", 0),
                                t.setAttribute("style", "position:absolute;top:0;left:0;width:0;height:0");
                            var r = function () {
                                    e.iframe = window.frames[n],
                                        e.processMessages()
                                };

                            t.attachEvent ? t.attachEvent("onload", r) : t.onload = r,
                                document.getElementsByTagName("body")[0].appendChild(t)
                        }
                    },
                    {
                        key: "setupIframe",
                        value: function () {
                            this.initIframe(),
                                this.initializedCallback || (u.receiveMessage(this.onMessage.bind(this), this.apiURL),
                                this.initializedCallback = !0)
                        }
                    },
                    {
                        key: "init",
                        value: function () {
                            this.iframeName && document.getElementById(this.iframeName) || ("undefined" != typeof document && document && document.body ? this.setupIframe() : "undefined" != typeof window && window && !this.ok && (window.attachEvent ? window.attachEvent("onload", this.setupIframe) : window.addEventListener("load", this.setupIframe, !1))),
                                this.ok = !0
                        }
                    },
                    {
                        key: "callAPI",
                        value: function (e, t, n, i, a) {
                            var r = arguments.length <= 5 || void 0 === arguments[5] ? null : arguments[5], o = arguments.length <= 6 || void 0 === arguments[6] ? "/v1/" : arguments[6], s = arguments.length <= 7 || void 0 === arguments[7] ? null : arguments[7];

                            if ("GET" !== e && "POST" !== e && "DELETE" !== e) throw new Error("指定できるHTTPメソッドは GET, POST, DELETEのみです");
                            this.init();
                            var u = (this.callCount ++).toString();

                            this.messageQueue.push({
                                message: {
                                    id: u,
                                    method: e,
                                    url: o + t,
                                    params: n,
                                    key: i,
                                    keyType: r,
                                    locale: s
                                },
                                callback: a
                            }),
                                this.processMessages()
                        }
                    }
                ]),
                    e
            }();

        t["default"] = l,
            e.exports = t["default"]
    },
    function (e, t) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n ++) {
                        var i = t[n];

                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }

                return function (t, n, i) {
                    return n && e(t.prototype, n),
                        i && e(t, i),
                        t
                }
            }(), a = function () {
                function e() {
                    n(this, e)
                }

                return i(e, [
                    {
                        key: "_serialize",
                        value: function (e, t) {
                            var n = [];

                            for (var i in e) if (e.hasOwnProperty(i)) {
                                var a = t ? t + "[" + i + "]" : i, r = e[i];

                                "object" == typeof r ? n.push(this._serialize(r, a)) : n.push(encodeURIComponent(a) + "=" + encodeURIComponent(r))
                            }

                            return n.join("&")
                        }
                    },
                    {
                        key: "_deserialize",
                        value: function (e) {
                            for (var t = {}, n = e.split("&"), i = n.length, a = 0; i > a;) {
                                var r = n[a].split("=");

                                r[0] = decodeURIComponent(r[0]),
                                    r[1] = decodeURIComponent(r[1]);

                                for (var o = r[0], s = [], u = -1; - 1 !== (u = o.indexOf("["));) s.push(o.substr(u, o.indexOf("]") - u + 1)),
                                    o = o.substr(o.indexOf("]") + 1);

                                if (0 === s.length) t[r[0]] = r[1];
                                else {
                                    u = r[0].substr(0, r[0].indexOf("[")),
                                        "undefined" == typeof t[u] && (t[u] = {}),
                                        o = t[u];

                                    for (var l = s.length, c = 0; l - 1 > c;) u = s[c].substr(1, s[c].length - 2),
                                        "undefined" == typeof o[u] && (o[u] = {}),
                                        o = o[u],
                                        ++ c;
                                    s = s[l - 1],
                                        u = s.substr(1, s.length - 2),
                                        o[u] = r[1]
                                }

                                ++ a
                            }

                            return t
                        }
                    },
                    {
                        key: "receiveMessage",
                        value: function (e, t) {
                            var n = this;

                            if ("undefined" != typeof window) if ("undefined" != typeof window.postMessage) {
                                var i = function (i) {
                                        return i.origin.toLowerCase() !== t.toLowerCase() ? !1 : void e(n._deserialize(i.data))
                                    };

                                window.addEventListener ? window.addEventListener("message", i, !1) : window.attachEvent("onmessage", i)
                            } else !function () {
                                var t = window.location.hash;

                                setInterval(function () {
                                    var i = window.location.hash, a = /^#?\d+&/;

                                    i !== t && a.test(i) && (t = i,
                                        window.location.hash = "",
                                        e(n._deserialize(i.replace(a, ""))))
                                }, 100)
                            }()
                        }
                    },
                    {
                        key: "postMessage",
                        value: function (e, t, n, i) {
                            if ("undefined" != typeof window) if (e = this._serialize(e),
                                    "undefined" == typeof window.postMessage) {
                                var a = n + "#" + (+new Date + Math.floor(1e3 * Math.random())) + "&" + e;

                                i.location.href = a
                            } else i.postMessage(e, t)
                        }
                    }
                ]),
                    e
            }();

        t["default"] = a,
            e.exports = t["default"]
    },
    function (e, t) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n ++) {
                        var i = t[n];

                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }

                return function (t, n, i) {
                    return n && e(t.prototype, n),
                        i && e(t, i),
                        t
                }
            }(), a = function () {
                function e() {
                    n(this, e)
                }

                return i(e, [
                    {
                        key: "cardNumber",
                        value: function (e) {
                            if (!e) return !1;
                            var t = (e + "").replace(/\s+|-/g, "");

                            return !!(t.length >= 14 && t.length <= 16 && this.luhnCheck(t))
                        }
                    },
                    {
                        key: "luhnCheck",
                        value: function (e) {
                            for (var t = !0, n = 0, i = (e + "").split("").reverse(), a = 0, r = i.length; r > a; a ++) {
                                var o = i[a];

                                o = parseInt(o, 10),
                                    t = !t,
                                    t && (o *= 2),
                                    o > 9 && (o -= 9),
                                    n += o
                            }

                            return n % 10 === 0
                        }
                    },
                    {
                        key: "expiry",
                        value: function (e, t) {
                            if (!e || !t) return !1;
                            var n = this.trimNumber(e), i = this.trimNumber(t);

                            if (/^\d+$/.test(n) && /^\d+$/.test(i) && parseInt(n, 10) <= 12) {
                                var a = new Date(i, n), r = new Date;

                                if (a.setMonth(a.getMonth() - 1),
                                        a.setMonth(a.getMonth() + 1, 1),
                                        a > r) return !0
                            }

                            return !1
                        }
                    },
                    {
                        key: "cvc",
                        value: function (e) {
                            var t = this.trimNumber(e);

                            return !!(/^\d+$/.test(t) && t.length >= 3 && t.length <= 4)
                        }
                    },
                    {
                        key: "name",
                        value: function (e) {
                            if (!e) return !1;
                            var t = this.trim(e);

                            return t.length > 0
                        }
                    },
                    {
                        key: "trim",
                        value: function (e) {
                            return String(e).replace(/(^\s+)|(\s+$)/g, "")
                        }
                    },
                    {
                        key: "trimNumber",
                        value: function (e) {
                            return (e + "").replace(/^\s+|\s+$/g, "")
                        }
                    },
                    {
                        key: "cardType",
                        value: function (e) {
                            if (!e) return !1;

                            for (var t = {}, n = void 0, i = n = 40; 49 >= n;) t[i] = "Visa",
                                i = ++ n;
                            var a = void 0;

                            for (i = a = 50; 59 >= a;) t[i] = "MasterCard",
                                i = ++ a;

                            return t[34] = t[37] = "American Express",
                                t[60] = t[62] = t[64] = t[65] = "Discover",
                                t[35] = "JCB",
                                t[30] = t[36] = t[38] = t[39] = "Diners Club",
                                t[e.slice(0, 2)] || "Unknown"
                        }
                    }
                ]),
                    e
            }();

        t["default"] = a,
            e.exports = t["default"]
    },
    function (e, t) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n ++) {
                        var i = t[n];

                        i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value" in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                    }
                }

                return function (t, n, i) {
                    return n && e(t.prototype, n),
                        i && e(t, i),
                        t
                }
            }(), a = 2, r = {
                Visa: "visa",
                MasterCard: "masterCard",
                JCB: "jcb",
                "American Express": "amex",
                Discover: null,
                "Diners Club": null
            }, o = function () {
                function e(t, i) {
                    n(this, e),
                        this.payjp = t,
                        this.merchantId = i
                }

                return i(e, [
                    {
                        key: "_isOverHTTPS",
                        value: function () {
                            return "https:" === window.location.protocol
                        }
                    },
                    {
                        key: "_fetchMerchantId",
                        value: function (e) {
                            this.payjp.transport.callAPI("GET", "accounts/apple_pay/partner_internal_merchant_identifier", {}, this.payjp.getPublicKey(), e)
                        }
                    },
                    {
                        key: "checkAvailability",
                        value: function (e) {
                            var t = this;

                            if (null == e) throw new Error("引数にコールバック関数を指定してください");

                            if (!this._isOverHTTPS()) return void e(!1);

                            if ("undefined" == typeof ApplePaySession) return void e(!1);

                            if (!ApplePaySession.canMakePayments()) return void e(!1);
                            var n = function () {
                                    return new Promise(function (e, n) {
                                        t.payjp.retrieveAvailability(function (t, i) {
                                            200 != t ? n(i) : e(i)
                                        })
                                    })
                                }, i = function () {
                                    return new Promise(function (e, n) {
                                        t._fetchMerchantId(function (i, a) {
                                            200 != i && n(a),
                                                "merchant_id" in a && (t.merchantId = a.merchant_id),
                                                e(t.merchantId)
                                        })
                                    }).then(function (e) {
                                        return ApplePaySession.canMakePaymentsWithActiveCard(e)
                                    })
                                };

                            Promise.all([
                                n(),
                                i()
                            ]).then(function (n) {
                                if (t._supportedNetworks = n[0].card_types_supported.map(function (e) {
                                        return r[e]
                                    }).filter(function (e) {
                                        return e
                                    }),
                                        0 == t._supportedNetworks.length) throw new Error("利用可能なカードブランドがありません");
                                e(n[1])
                            })["catch"](function (t) {
                                e(!1)
                            })
                        }
                    },
                    {
                        key: "setDisplayName",
                        value: function (e) {
                            this.displayName = e
                        }
                    },
                    {
                        key: "_startSession",
                        value: function (e, t) {
                            var n = {
                                    domain: window.location.host,
                                    validation_url: e,
                                    display_name: this.displayName || window.location.host
                                };

                            this.payjp.transport.callAPI("POST", "accounts/apple_pay/sessions", n, this.payjp.getPublicKey(), t)
                        }
                    },
                    {
                        key: "buildSession",
                        value: function (e, t, n) {
                            var i = this;

                            if (null == t || null == n) throw new Error("引数にコールバック関数を指定してください");
                            e.merchantCapabilities = [
                                "supports3DS"
                            ],
                                e.supportedNetworks = this._supportedNetworks || [
                                "amex",
                                "discover",
                                "jcb",
                                "masterCard",
                                "visa"
                            ];
                            var r = new ApplePaySession(a, e);

                            return r.onvalidatemerchant = function (e) {
                                i._startSession(e.validationURL, function (e, t) {
                                    return 200 != e ? (r.completeMerchantValidation({}),
                                        void n(t)) : void r.completeMerchantValidation(t)
                                })
                            },
                                r.onpaymentauthorized = function (e) {
                                var a = e.payment;

                                i.payjp.createToken(encodeURI(JSON.stringify(a.token.paymentData)), function (e, i) {
                                    200 == e ? (a.token = i,
                                        t(a)) : (r.completePayment(ApplePaySession.STATUS_FAILURE),
                                        n(i))
                                })
                            },
                                r
                        }
                    }
                ]),
                    e
            }();

        t["default"] = o,
            e.exports = t["default"]
    }
]);
