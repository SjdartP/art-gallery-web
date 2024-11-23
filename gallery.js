! function(P, t, D) {
    "use strict";

    function L(n, i) {
        var a = null;
        return function() {
            var t = this,
                e = arguments;
            null === a && (a = setTimeout(function() { n.apply(t, e), a = null }, i))
        }
    }
    var r, e = (r = {}, function(t) {
            if (r[t] !== D) return r[t];
            var e = document.createElement("div").style,
                n = t.charAt(0).toUpperCase() + t.slice(1),
                i = (t + " " + ["webkit", "moz", "ms", "o"].join(n + " ") + n).split(" ");
            for (var a in i)
                if (i[a] in e) return r[t] = i[a];
            return r[t] = !1
        }),
        a = "http://www.w3.org/2000/svg",
        E = P(t),
        M = e("transform"),
        i = { itemContainer: "ul", itemSelector: "li", start: "center", fadeIn: 400, loop: !1, autoplay: !1, pauseOnHover: !0, style: "coverflow", spacing: -.6, click: !0, keyboard: !0, scrollwheel: !0, touch: !0, nav: !1, buttons: !1, buttonPrev: "Previous", buttonNext: "Next", onItemSwitch: !1 },
        T = { main: "flipster", active: "flipster--active", container: "flipster__container", nav: "flipster__nav", navChild: "flipster__nav__child", navItem: "flipster__nav__item", navLink: "flipster__nav__link", navCurrent: "flipster__nav__item--current", navCategory: "flipster__nav__item--category", navCategoryLink: "flipster__nav__link--category", button: "flipster__button", buttonPrev: "flipster__button--prev", buttonNext: "flipster__button--next", item: "flipster__item", itemCurrent: "flipster__item--current", itemPast: "flipster__item--past", itemFuture: "flipster__item--future", itemContent: "flipster__item__content" },
        X = new RegExp("\\b(" + T.itemCurrent + "|" + T.itemPast + "|" + T.itemFuture + ")(.*?)(\\s|$)", "g"),
        j = new RegExp("\\s\\s+", "g");
    P.fn.flipster = function(e) {
        if ("string" == typeof e) { var n = Array.prototype.slice.call(arguments, 1); return this.each(function() { var t = P(this).data("methods"); return t[e] ? t[e].apply(this, n) : this }) }
        var I = P.extend({}, i, e);
        return this.each(function() {
            var t, f, r, n, p, s, l, c, u, v = P(this),
                o = [],
                h = 0,
                d = !1,
                e = !1;

            function i(e) { return e = e || "next", P('<button class="' + T.button + " " + ("next" === e ? T.buttonNext : T.buttonPrev) + '" role="button" />').html((n = "next" === (t = e) ? I.buttonNext : I.buttonPrev, "custom" === I.buttons ? n : '<svg viewBox="0 0 13 20" xmlns="' + a + '" aria-labelledby="title"><title>' + n + '</title><polyline points="10,3 3,10 10,17"' + ("next" === t ? ' transform="rotate(180 6.5,10)"' : "") + "/></svg>")).on("click", function(t) { y(e), t.preventDefault() }); var t, n }

            function m() { v.css("transition", ""), f.css("transition", ""), p.css("transition", "") }

            function g(a) {
                var t, e;
                a && (v.css("transition", "none"), f.css("transition", "none"), p.css("transition", "none")), r = f.width(), f.height((e = 0, p.each(function() { t = P(this).height(), e < t && (e = t) }), e)), r ? (n && (clearInterval(n), n = !1), p.each(function(t) {
                    var e, n, i = P(this);
                    i.attr("class", function(t, e) { return e && e.replace(X, "").replace(j, " ") }), e = i.outerWidth(), 0 !== I.spacing && i.css("margin-right", e * I.spacing + "px"), n = i.position().left, o[t] = -1 * (n + e / 2 - r / 2), t === p.length - 1 && (_(), a && setTimeout(m, 1))
                })) : n = n || setInterval(function() { g(a) }, 500)
            }

            function _() {
                var e, n, i, a = p.length;
                p.each(function(t) { e = P(this), n = " ", i = t === h ? (n += T.itemCurrent, a + 1) : t < h ? (n += T.itemPast + " " + T.itemPast + "-" + (h - t), a - (h - t)) : (n += T.itemFuture + " " + T.itemFuture + "-" + (t - h), a - (t - h)), e.css("z-index", i).attr("class", function(t, e) { return e && e.replace(X, "").replace(j, " ") + n }) }), 0 <= h && (r && o[h] !== D || g(!0), M ? f.css("transform", "translateX(" + o[h] + "px)") : f.css({ left: o[h] + "px" })),
                    function() {
                        if (I.nav) {
                            var t = s.data("flip-category");
                            c.removeClass(T.navCurrent), u.filter(function() { return P(this).data("index") === h || t && P(this).data("category") === t }).parent().addClass(T.navCurrent)
                        }
                    }()
            }

            function y(t) { var e = h; if (!(p.length <= 1)) return "prev" === t ? 0 < h ? h-- : I.loop && (h = p.length - 1) : "next" === t ? h < p.length - 1 ? h++ : I.loop && (h = 0) : "number" == typeof t ? h = t : t !== D && (h = p.index(t), I.loop && e != h && (e == p.length - 1 && h != p.length - 2 && (h = 0), 0 == e && 1 != h && (h = p.length - 1))), s = p.eq(h), h !== e && I.onItemSwitch && I.onItemSwitch.call(v, p[h], p[e]), _(), v }

            function b(t) {
                return I.autoplay = t || I.autoplay, clearInterval(d), d = setInterval(function() {
                    var t = h;
                    y("next"), t !== h || I.loop || clearInterval(d)
                }, I.autoplay), v
            }

            function x() { return clearInterval(d), d = 0, v }

            function w(t) { return x(), I.autoplay && t && (d = -1), v }

            function C() { g(!0), v.hide().css("visibility", "").addClass(T.active).fadeIn(I.fadeIn) }

            function k() {
                var o;
                if (f = v.find(I.itemContainer).addClass(T.container), !((p = f.find(I.itemSelector)).length <= 1)) return p.addClass(T.item).each(function() {
                    var t = P(this);
                    t.children("." + T.itemContent).length || t.wrapInner('<div class="' + T.itemContent + '" />')
                }), I.click && p.on("click.flipster touchend.flipster", function(t) { e || (P(this).hasClass(T.itemCurrent) || t.preventDefault(), y(this)) }), I.buttons && 1 < p.length && (v.find("." + T.button).remove(), v.append(i("prev"), i("next"))), o = {}, !I.nav || p.length <= 1 || (l && l.remove(), l = P('<ul class="' + T.nav + '" role="navigation" />'), u = P(""), p.each(function(t) {
                    var e = P(this),
                        n = e.data("flip-category"),
                        i = e.data("flip-title") || e.attr("title") || t,
                        a = P('<a href="#" class="' + T.navLink + '">' + i + "</a>").data("index", t);
                    if (u = u.add(a), n) {
                        if (!o[n]) {
                            var r = P('<li class="' + T.navItem + " " + T.navCategory + '">'),
                                s = P('<a href="#" class="' + T.navLink + " " + T.navCategoryLink + '" data-flip-category="' + n + '">' + n + "</a>").data("category", n).data("index", t);
                            o[n] = P('<ul class="' + T.navChild + '" />'), u = u.add(s), r.append(s, o[n]).appendTo(l)
                        }
                        o[n].append(a)
                    } else l.append(a);
                    a.wrap('<li class="' + T.navItem + '">')
                }), l.on("click", "a", function(t) {
                    var e = P(this).data("index");
                    0 <= e && (y(e), t.preventDefault())
                }), "after" === I.nav ? v.append(l) : v.prepend(l), c = l.find("." + T.navItem)), 0 <= h && y(h), v
            }
            t = { jump: y, next: function() { return y("next") }, prev: function() { return y("prev") }, play: b, stop: x, pause: w, index: k }, v.data("methods", t), v.hasClass(T.active) || function() {
                var t;
                if (v.css("visibility", "hidden"), k(), p.length <= 1) v.css("visibility", "");
                else {
                    t = !!I.style && "flipster--" + I.style.split(" ").join(" flipster--"), v.addClass([T.main, M ? "flipster--transform" : " flipster--no-transform", t, I.click ? "flipster--click" : ""].join(" ")), I.start && (h = "center" === I.start ? Math.floor(p.length / 2) : I.start), y(h);
                    var e, n, i, a, r, s, o, l, c = v.find("img");
                    if (c.length) {
                        var u = 0;
                        c.on("load", function() {++u >= c.length && C() }), setTimeout(C, 750)
                    } else C();
                    E.on("resize.flipster", L(g, 400)), I.autoplay && b(), I.pauseOnHover && f.on("mouseenter.flipster", function() { d ? w(!0) : x() }).on("mouseleave.flipster", function() {-1 === d && b() }), e = v, I.keyboard && (e[0].tabIndex = 0, e.on("keydown.flipster", L(function(t) {
                            var e = t.which;
                            37 !== e && 39 !== e || (y(37 === e ? "prev" : "next"), t.preventDefault())
                        }, 250))),
                        function(t) {
                            if (I.scrollwheel) {
                                var e, n, i = !1,
                                    a = 0,
                                    r = 0,
                                    s = 0,
                                    o = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
                                t.on("mousewheel.flipster wheel.flipster", function() { i = !0 }).on("mousewheel.flipster wheel.flipster", L(function(t) { clearTimeout(r), r = setTimeout(function() { s = a = 0 }, 300), t = t.originalEvent, s += t.wheelDelta || -1 * (t.deltaY + t.deltaX), Math.abs(s) < 25 && !o || (a++, n !== (e = 0 < s ? "prev" : "next") && (a = 0), n = e, (a < 6 || a % 3 == 0) && y(e), s = 0) }, 50)), t.on("mousewheel.flipster wheel.flipster", function(t) { i && (t.preventDefault(), i = !1) })
                            }
                        }(f), n = f, I.touch && n.on({ "touchstart.flipster": function(t) { t = t.originalEvent, i = t.touches ? t.touches[0].clientX : t.clientX, a = t.touches ? t.touches[0].clientY : t.clientY }, "touchmove.flipster": function(t) { t = t.originalEvent, r = t.touches ? t.touches[0].clientX : t.clientX, s = t.touches ? t.touches[0].clientY : t.clientY, l = r - i, o = s - a, 30 < Math.abs(l) && Math.abs(o) < 100 && t.preventDefault() }, "touchend.flipster touchcancel.flipster ": function() { l = r - i, o = s - a, 30 < Math.abs(l) && Math.abs(o) < 100 && y(0 < l ? "prev" : "next") } })
                }
            }()
        })
    }
}(jQuery, window);