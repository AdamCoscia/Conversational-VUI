!(function (t) {
  "use strict";
  function e(t, e) {
    var i;
    for (i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
  }
  function i(t) {
    return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }
  var n = {},
    s = {},
    r = {},
    a = {},
    o = {},
    J = {},
    l = {},
    d = {},
    N = {},
    u = Array.isArray,
    c = {
      profile: {
        negative_threshold: -0.3,
        positive_threshold: 0.3,
        amplitude_threshold: 0.3,
        polite_threshold: 0.2,
        dirty_threshold: 0.3,
      },
      parser: ["v1", "v2"],
    },
    p = "foreign",
    B = "interrogative",
    g = "exclamatory",
    V = "headline",
    h = "imperative",
    f = "approval",
    m = "refusal";
  (t.detect = o),
    (t.dependencies = J),
    (t.inflector = d),
    (t.compendium = n),
    (t.lexer = s),
    (t.parser = l),
    (t.factory = r),
    (t.pos = N),
    (t.config = c),
    !(function () {
      var i = [
          "tuna",
          "trout",
          "spacecraft",
          "salmon",
          "halibut",
          "aircraft",
          "equipment",
          "information",
          "rice",
          "money",
          "species",
          "series",
          "fish",
          "sheep",
          "moose",
          "deer",
          "news",
          "asbestos",
        ],
        n = [
          [/^index$/gi, "indices"],
          [/^criterion$/gi, "criteria"],
          [/dix$/gi, "dices"],
          [/(a|o)ch$/gi, "$1chs"],
          [/(m)an$/gi, "$1en"],
          [/(pe)rson$/gi, "$1ople"],
          [/(child)$/gi, "$1ren"],
          [/^(ox)$/gi, "$1en"],
          [/(ax|test)is$/gi, "$1es"],
          [/(octop|vir)us$/gi, "$1i"],
          [/(alias|status)$/gi, "$1es"],
          [/(bu)s$/gi, "$1ses"],
          [/(buffal|tomat|potat|her)o$/gi, "$1oes"],
          [/([ti])um$/gi, "$1a"],
          [/sis$/gi, "ses"],
          [/(?:([^f])fe|([lr])f)$/gi, "$1$2ves"],
          [/(hive)$/gi, "$1s"],
          [/([^aeiouy]|qu)y$/gi, "$1ies"],
          [/(x|ch|ss|sh)$/gi, "$1es"],
          [/(matr|vert|ind)ix|ex$/gi, "$1ices"],
          [/([m|l])ouse$/gi, "$1ice"],
          [/(quiz)$/gi, "$1zes"],
          [/^gas$/gi, "gases"],
          [/s$/gi, "s"],
          [/$/gi, "s"],
        ],
        s = [
          [/(m)en$/gi, "$1an"],
          [/(pe)ople$/gi, "$1rson"],
          [/(child)ren$/gi, "$1"],
          [/([ti])a$/gi, "$1um"],
          [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses/gi, "$1$2sis"],
          [/(hive)s$/gi, "$1"],
          [/(tive)s$/gi, "$1"],
          [/(curve)s$/gi, "$1"],
          [/([lr])ves$/gi, "$1f"],
          [/([^fo])ves$/gi, "$1fe"],
          [/([^aeiouy]|qu)ies$/gi, "$1y"],
          [/(s)eries$/gi, "$1eries"],
          [/(m)ovies$/gi, "$1ovie"],
          [/(x|ch|ss|sh)es$/gi, "$1"],
          [/([m|l])ice$/gi, "$1ouse"],
          [/(bus)es$/gi, "$1"],
          [/(o)es$/gi, "$1"],
          [/(shoe)s$/gi, "$1"],
          [/(cris|ax|test)es$/gi, "$1is"],
          [/(octop|vir)i$/gi, "$1us"],
          [/(alias|status)es$/gi, "$1"],
          [/^(ox)en/gi, "$1"],
          [/(vert|ind)ices$/gi, "$1ex"],
          [/(matr)ices$/gi, "$1ix"],
          [/(quiz)zes$/gi, "$1"],
          [/s$/gi, ""],
        ],
        r = function (t, e, n) {
          var s, r;
          if (i.indexOf(t.toLowerCase()) > -1) return t;
          for (s = 0, r = e.length; s < r; s++)
            if (t.match(e[s][0])) {
              t = t.replace(e[s][0], e[s][1]);
              break;
            }
          return t;
        },
        a = function (t, e) {
          var n, s;
          if (i.indexOf(t.toLowerCase()) > -1) return !1;
          for (n = 0, s = e.length; n < s; n++) if (t.match(e[n][0])) return !0;
          return !1;
        },
        o = "VBZ",
        J = "VBG",
        l = "VBN",
        N = function (t, e) {
          return e === o ? t + "s" : e === J ? t + "ing" : e === l ? t + "ed" : t;
        },
        u = function (t, e) {
          return e === o ? t + "s" : e === J ? t + t[t.length - 1] + "ing" : e === l ? t + t[t.length - 1] + "ed" : t;
        },
        c = function (t, e) {
          var i = t.slice(0, t.length - 1);
          return e === o ? t + "s" : e === J ? i + "ing" : e === l ? i + "ed" : t;
        },
        p = function (t, e) {
          var i = t.slice(0, t.length - 1);
          return e === o ? i + "ies" : e === J ? t + "ing" : e === l ? i + "ied" : t;
        },
        B = function (t, e) {
          return e === o ? t + "s" : e === J ? t + "ing" : e === l ? t + "d" : t;
        },
        g = function (t, e) {
          return e === o ? t + "s" : e === J ? t.slice(0, t.length - 1) + "ing" : e === l ? t + "d" : t;
        },
        V = function (t, e) {
          return e === o ? t + "s" : e === J ? t.slice(0, t.length - 2) + "ying" : e === l ? t + "d" : t;
        },
        h = function (t, e) {
          return e === o ? t + "es" : e === J ? t + "ing" : e === l ? t + "ed" : t;
        };
      e(d, {
        isSingular: function (t) {
          return d.isUncountable(t) || a(t, n);
        },
        isPlural: function (t) {
          return !t.match(/([saui]s|[^i]a)$/gi) && a(t, s);
        },
        isUncountable: function (t) {
          return i.indexOf(t) > -1;
        },
        singularize: function (t) {
          return d.isPlural(t) ? r(t, s) : t;
        },
        pluralize: function (t) {
          return d.isSingular(t) ? r(t, n) : t;
        },
        conjugate: function (t, e) {
          t[t.length - 1];
          return t.match(/[^aeiou]y$/gi)
            ? p(t, e)
            : t.match(/[^aeiouy]e$/gi)
            ? c(t, e)
            : t.match(/([aeiuo][ptlgnm]|ir|cur|[^aeiuo][oua][db])$/gi)
            ? u(t, e)
            : t.match(/([ieao]ss|[aeiouy]zz|[aeiouy]ch|nch|rch|[aeiouy]sh|[iae]tch|ax)$/gi)
            ? h(t, e)
            : t.match(/(ee)$/gi)
            ? B(t, e)
            : t.match(/(ie)$/gi)
            ? V(t, e)
            : t.match(/(ue)$/gi)
            ? g(t, e)
            : t.match(
                /([uao]m[pb]|[oa]wn|ey|elp|[ei]gn|ilm|o[uo]r|[oa]ugh|igh|ki|ff|oubt|ount|awl|o[alo]d|[iu]rl|upt|[oa]y|ight|oid|empt|act|aud|e[ea]d|ound|[aeiou][srcln]t|ept|dd|[eia]n[dk]|[ioa][xk]|[oa]rm|[ue]rn|[ao]ng|uin|eam|ai[mr]|[oea]w|[eaoui][rscl]k|[oa]r[nd]|ear|er|it|ll)$/gi
              )
            ? N(t, e)
            : null;
        },
        toPast: function (t) {
          return d.conjugate(t, l);
        },
        toGerund: function (t) {
          return d.conjugate(t, J);
        },
        toPresents: function (t) {
          return d.conjugate(t, o);
        },
        infinitive: function (e) {
          var i = t.lexicon[e];
          return i && i.hasOwnProperty("infinitive")
            ? i.infinitive
            : "are" === e || "am" === e || "'s" === e
            ? "be"
            : null;
        },
      }),
        (t.inflector = d);
    })(),
    !(function () {
      function e(t) {
        throw new RangeError(P[t]);
      }
      function i(t, e) {
        for (var i = t.length, n = []; i--; ) n[i] = e(t[i]);
        return n;
      }
      function n(t, e) {
        var n = t.split("@"),
          s = "";
        n.length > 1 && ((s = n[0] + "@"), (t = n[1])), (t = t.replace(k, "."));
        var r = t.split("."),
          a = i(r, e).join(".");
        return s + a;
      }
      function s(t) {
        for (var e, i, n = [], s = 0, r = t.length; s < r; )
          (e = t.charCodeAt(s++)),
            e >= 55296 && e <= 56319 && s < r
              ? ((i = t.charCodeAt(s++)),
                56320 == (64512 & i) ? n.push(((1023 & e) << 10) + (1023 & i) + 65536) : (n.push(e), s--))
              : n.push(e);
        return n;
      }
      function r(t) {
        return i(t, function (t) {
          var e = "";
          return (
            t > 65535 && ((t -= 65536), (e += E(((t >>> 10) & 1023) | 55296)), (t = 56320 | (1023 & t))), (e += E(t))
          );
        }).join("");
      }
      function a(t) {
        return t - 48 < 10 ? t - 22 : t - 65 < 26 ? t - 65 : t - 97 < 26 ? t - 97 : B;
      }
      function o(t, e) {
        return t + 22 + 75 * (t < 26) - ((0 != e) << 5);
      }
      function J(t, e, i) {
        var n = 0;
        for (t = i ? M(t / f) : t >> 1, t += M(t / e); t > (R * V) >> 1; n += B) t = M(t / R);
        return M(n + ((R + 1) * t) / (t + h));
      }
      function l(t) {
        var i,
          n,
          s,
          o,
          l,
          d,
          N,
          u,
          c,
          h,
          f = [],
          y = t.length,
          w = 0,
          k = b,
          P = m;
        for (n = t.lastIndexOf(v), n < 0 && (n = 0), s = 0; s < n; ++s)
          t.charCodeAt(s) >= 128 && e("not-basic"), f.push(t.charCodeAt(s));
        for (o = n > 0 ? n + 1 : 0; o < y; ) {
          for (
            l = w, d = 1, N = B;
            o >= y && e("invalid-input"),
              (u = a(t.charCodeAt(o++))),
              (u >= B || u > M((p - w) / d)) && e("overflow"),
              (w += u * d),
              (c = N <= P ? g : N >= P + V ? V : N - P),
              !(u < c);
            N += B
          )
            (h = B - c), d > M(p / h) && e("overflow"), (d *= h);
          (i = f.length + 1),
            (P = J(w - l, i, 0 == l)),
            M(w / i) > p - k && e("overflow"),
            (k += M(w / i)),
            (w %= i),
            f.splice(w++, 0, k);
        }
        return r(f);
      }
      function d(t) {
        var i,
          n,
          r,
          a,
          l,
          d,
          N,
          u,
          c,
          h,
          f,
          y,
          w,
          k,
          P,
          R = [];
        for (t = s(t), y = t.length, i = b, n = 0, l = m, d = 0; d < y; ++d) (f = t[d]), f < 128 && R.push(E(f));
        for (r = a = R.length, a && R.push(v); r < y; ) {
          for (N = p, d = 0; d < y; ++d) (f = t[d]), f >= i && f < N && (N = f);
          for (w = r + 1, N - i > M((p - n) / w) && e("overflow"), n += (N - i) * w, i = N, d = 0; d < y; ++d)
            if (((f = t[d]), f < i && ++n > p && e("overflow"), f == i)) {
              for (u = n, c = B; (h = c <= l ? g : c >= l + V ? V : c - l), !(u < h); c += B)
                (P = u - h), (k = B - h), R.push(E(o(h + (P % k), 0))), (u = M(P / k));
              R.push(E(o(u, 0))), (l = J(n, w, r == a)), (n = 0), ++r;
            }
          ++n, ++i;
        }
        return R.join("");
      }
      function N(t) {
        return n(t, function (t) {
          return y.test(t) ? l(t.slice(4).toLowerCase()) : t;
        });
      }
      function u(t) {
        return n(t, function (t) {
          return w.test(t) ? "xn--" + d(t) : t;
        });
      }
      var c,
        p = 2147483647,
        B = 36,
        g = 1,
        V = 26,
        h = 38,
        f = 700,
        m = 72,
        b = 128,
        v = "-",
        y = /^xn--/,
        w = /[^\x20-\x7E]/,
        k = /[\x2E\u3002\uFF0E\uFF61]/g,
        P = {
          overflow: "Overflow: input needs wider integers to process",
          "not-basic": "Illegal input >= 0x80 (not a basic code point)",
          "invalid-input": "Invalid input",
        },
        R = B - g,
        M = Math.floor,
        E = String.fromCharCode;
      (c = { version: "1.3.2", ucs2: { decode: s, encode: r }, decode: l, encode: d, toASCII: u, toUnicode: N }),
        (t.punycode = c);
    })(),
    !(function () {
      var e = {
          ational: "ate",
          tional: "tion",
          enci: "ence",
          anci: "ance",
          izer: "ize",
          bli: "ble",
          alli: "al",
          entli: "ent",
          eli: "e",
          ousli: "ous",
          ization: "ize",
          ation: "ate",
          ator: "ate",
          alism: "al",
          iveness: "ive",
          fulness: "ful",
          ousness: "ous",
          aliti: "al",
          iviti: "ive",
          biliti: "ble",
          logi: "log",
        },
        i = { icate: "ic", ative: "", alize: "al", iciti: "ic", ical: "ic", ful: "", ness: "" },
        n = "[^aeiou]",
        s = "[aeiouy]",
        r = n + "[^aeiouy]*",
        a = s + "[aeiou]*",
        o = "^(" + r + ")?" + a + r,
        J = "^(" + r + ")?" + a + r + "(" + a + ")?$",
        l = "^(" + r + ")?" + a + r + a + r,
        d = "^(" + r + ")?" + s,
        N = function (t) {
          var n, a, N, u, c, p, B, g;
          return t.length < 3
            ? t
            : ((N = t.substr(0, 1)),
              "y" == N && (t = N.toUpperCase() + t.substr(1)),
              (c = /^(.+?)(ss|i)es$/),
              (p = /^(.+?)([^s])s$/),
              c.test(t) ? (t = t.replace(c, "$1$2")) : p.test(t) && (t = t.replace(p, "$1$2")),
              (c = /^(.+?)eed$/),
              (p = /^(.+?)(ed|ing)$/),
              c.test(t)
                ? ((u = c.exec(t)), (c = new RegExp(o)), c.test(u[1]) && ((c = /.$/), (t = t.replace(c, ""))))
                : p.test(t) &&
                  ((u = p.exec(t)),
                  (n = u[1]),
                  (p = new RegExp(d)),
                  p.test(n) &&
                    ((t = n),
                    (p = /(at|bl|iz)$/),
                    (B = new RegExp("([^aeiouylsz])\\1$")),
                    (g = new RegExp("^" + r + s + "[^aeiouwxy]$")),
                    p.test(t)
                      ? (t += "e")
                      : B.test(t)
                      ? ((c = /.$/), (t = t.replace(c, "")))
                      : g.test(t) && (t += "e"))),
              (c = /^(.+?)y$/),
              c.test(t) && ((u = c.exec(t)), (n = u[1]), (c = new RegExp(d)), c.test(n) && (t = n + "i")),
              (c =
                /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/),
              c.test(t) && ((u = c.exec(t)), (n = u[1]), (a = u[2]), (c = new RegExp(o)), c.test(n) && (t = n + e[a])),
              (c = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/),
              c.test(t) && ((u = c.exec(t)), (n = u[1]), (a = u[2]), (c = new RegExp(o)), c.test(n) && (t = n + i[a])),
              (c = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/),
              (p = /^(.+?)(s|t)(ion)$/),
              c.test(t)
                ? ((u = c.exec(t)), (n = u[1]), (c = new RegExp(l)), c.test(n) && (t = n))
                : p.test(t) && ((u = p.exec(t)), (n = u[1] + u[2]), (p = new RegExp(l)), p.test(n) && (t = n)),
              (c = /^(.+?)e$/),
              c.test(t) &&
                ((u = c.exec(t)),
                (n = u[1]),
                (c = new RegExp(l)),
                (p = new RegExp(J)),
                (B = new RegExp("^" + r + s + "[^aeiouwxy]$")),
                (c.test(n) || (p.test(n) && !B.test(n))) && (t = n)),
              (c = /ll$/),
              (p = new RegExp(l)),
              c.test(t) && p.test(t) && ((c = /.$/), (t = t.replace(c, ""))),
              "y" == N && (t = N.toLowerCase() + t.substr(1)),
              t);
        };
      t.stemmer = N;
    })(),
    !(function () {
      var t = function () {
        this.t_ = {};
      };
      (t.prototype.add = function (t, e) {
        throw new Error("Not implmented");
      }),
        (t.prototype.isset = function (t) {
          return null !== this.get(t);
        }),
        (t.prototype.get = function (t) {
          throw new Error("Not implmented");
        });
    })(),
    !(function () {
      var e = ["en", "fr"];
      (a.toObject = function (t, e) {}),
        (a.applyPOS = function (e, i, n) {
          var s, a, o;
          for (o = t.tag(i, n), e.tags = o.tags, e.stats.confidence = o.confidence, s = 0, a = i.length; s < a; s++)
            e.tokens.push(r.token(i[s], o.norms[s], o.tags[s]));
          return (e.length = a), e;
        }),
        (a.analyse = function (e, i, n) {
          var d,
            N,
            u,
            p,
            B,
            g,
            V,
            h,
            f,
            m = [];
          for (N = s.advanced(t.decode(e), i), u = N.sentences, d = 0, p = u.length; d < p; d++) {
            for (
              B = Date.now(),
                g = r.sentence(N.raws[d], i),
                a.applyPOS(g, u[d], i),
                t.stat(g),
                h = o.context(),
                V = 0,
                f = g.tokens.length;
              V < f;
              V++
            )
              o.apply("t", !0, n, g.tokens[V], V, g, h);
            for (
              o.apply("s", !0, n, g, d, m, h),
                c.parser.indexOf("v1") > -1 && J.parse(g),
                c.parser.indexOf("v1") > -1 && l.parse(g),
                V = 0,
                f = g.tokens.length;
              V < f;
              V++
            )
              o.apply("t", !1, n, g.tokens[V], V, g, h);
            m.push(g), o.apply("s", !1, n, g, d, m, h), (g.time = Date.now() - B);
          }
          return m;
        }),
        (t.analyse = function (t, i, n) {
          var s = null;
          if (((i = i || "en"), e.indexOf(i) === -1))
            throw new Error("Compendium supports only the following languages: " + e.join(", "));
          return (s = a.analyse(t, i, n)), o.apply("p", !1, n, s), s;
        });
    })(),
    !(function () {
      e(n, {
        verbs:
          "accept add admire admit advise afford agree alert allow amuse analyse analyze announce annoy answer apologise appear applaud appreciate approve argue arrange arrest arrive ask attach attack attempt attend attract avoid back bake balance ban bang bare bat bathe battle beam beg behave belong bleach bless blind blink blot blush boast boil bolt bomb book bore borrow bounce bow box brake branch breathe bruise brush bubble bump burn bury buzz calculate call camp care carry carve cause challenge change charge chase cheat check cheer chew choke chop claim clap clean clear clip close coach coil collect colour comb command communicate compare compete complain complete concentrate concern confess confuse connect consider consist contain continue copy correct cough count cover crack crash crawl cross crush cry cure curl curve cycle dam damage dance dare decay deceive decide decorate delay delight deliver depend describe desert deserve destroy detect develop disagree disappear disapprove disarm discover dislike divide double doubt drag drain dream dress drip drop drown drum dry dust earn educate embarrass employ empty encourage end enjoy enter entertain escape examine excite excuse exercise exist expand expect explain explode extend face fade fail fancy fasten fax fear fence fetch file fill film fire fit fix flap flash float flood flow flower fold follow fool force form found frame frighten fry gather gaze glow glue grab grate grease greet grin grip groan guarantee guard guess guide hammer hand handle hang happen harass harm hate haunt head heal heap heat help hook hop hope hover hug hum hunt hurry identify ignore imagine impress improve include increase influence inform inject injure instruct intend interest interfere interrupt introduce invent invite irritate itch jail jam jog join joke judge juggle jump kick kill kiss kneel knit knock knot label land last laugh launch learn level license lick lie lighten like list listen live load lock long look love man manage mark marry match mate matter measure meddle melt memorise mend mess up milk mine miss mix moan moor mourn move muddle mug multiply murder nail name need nest nod note notice number obey object observe obtain occur offend offer open order overflow owe own pack paddle paint park part pass paste pat pause peck pedal peel peep perform permit phone pick pinch pine place plan plant play please plug point poke polish pop possess post pour practise practice pray preach precede prefer prepare present preserve press pretend prevent prick print produce program promise protect provide pull pump punch puncture punish push question queue race radiate rain raise reach realise receive recognise record reduce reflect refuse regret reign reject rejoice relax release rely remain remember remind remove repair repeat replace reply report reproduce request rescue retire return rhyme rinse risk rob rock roll rot rub ruin rule rush sack sail satisfy save scare scatter scold scorch scrape scratch scream screw scribble scrub seal search separate serve settle shade share shave shelter shiver shock shop shrug sigh sign signal sin sip ski skip slap slip slow smash smell smile smoke snatch sneeze sniff snore snow soak soothe sound spare spark sparkle spell spill spoil spot spray sprout squash squeak squeal squeeze stain stamp stare start stay steer step stir stitch stop store strap strengthen stretch strip stroke stuff subtract succeed suck suffer suggest suit supply support suppose surprise surround suspect suspend switch talk tame tap taste tease telephone tempt terrify test thank thaw tick tickle tie time tip tire touch tour tow trace trade train transport trap travel treat tremble trick trip trot trouble trust try tug tumble turn twist type undress unemploy unfasten unite unlock unpack untidy use vanish visit wail wait walk wander want warm warn wash waste watch water wave weigh welcome whine whip whirl whisper whistle wink wipe wish wobble wonder work worry wrap wreck wrestle wriggle yawn yell zip zoom".split(
            " "
          ),
        irregular:
          "abide abode/abided abode/abided/abidden abides abiding\talight alit/alighted alit/alighted alights alighting\tarise arose arisen arises arising\tawake awoke awoken awakes awaking\tbe was/were been is being\tbear bore born/borne bears bearing\tbeat beat beaten beats beating\tbecome became become becomes becoming\tbegin began begun begins beginning\tbehold beheld beheld beholds beholding\tbend bent bent bends bending\tbet bet bet bets betting\tbid bade bidden bids bidding\tbid bid bid bids bidding\tbind bound bound binds binding\tbite bit bitten bites biting\tbleed bled bled bleeds bleeding\tblow blew blown blows blowing\tbreak broke broken breaks breaking\tbreed bred bred breeds breeding\tbring brought brought brings bringing\tbroadcast broadcast/broadcasted broadcast/broadcasted broadcasts broadcasting\tbuild built built builds building\tburn burnt/burned burnt/burned burns burning\tburst burst burst bursts bursting\tbust bust bust busts busting\tbuy bought bought buys buying\tcast cast cast casts casting\tcatch caught caught catches catching\tchoose chose chosen chooses choosing\tclap clapped/clapt clapped/clapt claps clapping\tcling clung clung clings clinging\tclothe clad/clothed clad/clothed clothes clothing\tcome came come comes coming\tcost cost cost costs costing\tcreep crept crept creeps creeping\tcut cut cut cuts cutting\tdare dared/durst dared dares daring\tdeal dealt dealt deals dealing\tdig dug dug digs digging\tdive dived/dove dived dives diving\tdo did done does doing\tdraw drew drawn draws drawing\tdream dreamt/dreamed dreamt/dreamed dreams dreaming\tdrink drank drunk drinks drinking\tdrive drove driven drives driving\tdwell dwelt dwelt dwells dwelling\teat ate eaten eats eating\tfall fell fallen falls falling\tfeed fed fed feeds feeding\tfeel felt felt feels feeling\tfight fought fought fights fighting\tfind found found finds finding\tfit fit/fitted fit/fitted fits fitting\tflee fled fled flees fleeing\tfling flung flung flings flinging\tfly flew flown flies flying\tforbid forbade/forbad forbidden forbids forbidding\tforecast forecast/forecasted forecast/forecasted forecasts forecasting\tforesee foresaw foreseen foresees foreseeing\tforetell foretold foretold foretells foretelling\tforget forgot forgotten forgets foregetting\tforgive forgave forgiven forgives forgiving\tforsake forsook forsaken forsakes forsaking\tfreeze froze frozen freezes freezing\tfrostbite frostbit frostbitten frostbites frostbiting\tget got got/gotten gets getting\tgive gave given gives giving\tgo went gone/been goes going\tgrind ground ground grinds grinding\tgrow grew grown grows growing\thandwrite handwrote handwritten handwrites handwriting\thang hung/hanged hung/hanged hangs hanging\thave had had has having\thear heard heard hears hearing\thide hid hidden hides hiding\thit hit hit hits hitting\thold held held holds holding\thurt hurt hurt hurts hurting\tinlay inlaid inlaid inlays inlaying\tinput input/inputted input/inputted inputs inputting\tinterlay interlaid interlaid interlays interlaying\tkeep kept kept keeps keeping\tkneel knelt/kneeled knelt/kneeled kneels kneeling\tknit knit/knitted knit/knitted knits knitting\tknow knew known knows knowing\tlay laid laid lays laying\tlead led led leads leading\tlean leant/leaned leant/leaned leans leaning\tleap leapt/leaped leapt/leaped leaps leaping\tlearn learnt/learned learnt/learned learns learning\tleave left left leaves leaving\tlend lent lent lends lending\tlet let let lets letting\tlie lay lain lies lying\tlight lit lit lights lighting\tlose lost lost loses losing\tmake made made makes making\tmean meant meant means meaning\tmeet met met meets meeting\tmelt melted molten/melted melts melting\tmislead misled misled misleads misleading\tmistake mistook mistaken mistakes mistaking\tmisunderstand misunderstood misunderstood misunderstands misunderstanding\tmiswed miswed/miswedded miswed/miswedded misweds miswedding\tmow mowed mown mows mowing\toverdraw overdrew overdrawn overdraws overdrawing\toverhear overheard overheard overhears overhearing\tovertake overtook overtaken overtakes overtaking\tpay paid paid pays paying\tpreset preset preset presets presetting\tprove proved proven/proved proves proving\tput put put puts putting\tquit quit quit quits quitting\tre-prove re-proved re-proven/re-proved re-proves re-proving\tread read read reads reading\trid rid/ridded rid/ridded rids ridding\tride rode ridden rides riding\tring rang rung rings ringing\trise rose risen rises rising\trive rived riven/rived rives riving\trun ran run runs running\tsay said said says saying\tsee saw seen sees seeing\tseek sought sought seeks seeking\tsell sold sold sells selling\tsend sent sent sends sending\tset set set sets setting\tsew sewed sewn/sewed sews sewing\tshake shook shaken shakes shaking\tshave shaved shaven/shaved shaves shaving\tshear shore/sheared shorn/sheared shears shearing\tshed shed shed sheds shedding\tshine shone shone shines shining\tshoe shod shod shoes shoeing\tshoot shot shot shoots shooting\tshow showed shown shows showing\tshrink shrank shrunk shrinks shrinking\tshut shut shut shuts shutting\tsing sang sung sings singing\tsink sank sunk sinks sinking\tsit sat sat sits sitting\tslay slew slain slays slaying\tsleep slept slept sleeps sleeping\tslide slid slid/slidden slides sliding\tsling slung slung slings slinging\tslink slunk slunk slinks slinking\tslit slit slit slits slitting\tsmell smelt/smelled smelt/smelled smells smelling\tsneak sneaked/snuck sneaked/snuck sneaks sneaking\tsoothsay soothsaid soothsaid soothsays soothsaying\tsow sowed sown sows sowing\tspeak spoke spoken speaks speaking\tspeed sped/speeded sped/speeded speeds speeding\tspell spelt/spelled spelt/spelled spells spelling\tspend spent spent spends spending\tspill spilt/spilled spilt/spilled spills spilling\tspin span/spun spun spins spinning\tspit spat/spit spat/spit spits spitting\tsplit split split splits splitting\tspoil spoilt/spoiled spoilt/spoiled spoils spoiling\tspread spread spread spreads spreading\tspring sprang sprung springs springing\tstand stood stood stands standing\tsteal stole stolen steals stealing\tstick stuck stuck sticks sticking\tsting stung stung stings stinging\tstink stank stunk stinks stinking\tstride strode/strided stridden strides striding\tstrike struck struck/stricken strikes striking\tstring strung strung strings stringing\tstrip stript/stripped stript/stripped strips stripping\tstrive strove striven strives striving\tsublet sublet sublet sublets subletting\tsunburn sunburned/sunburnt sunburned/sunburnt sunburns sunburning\tswear swore sworn swears swearing\tsweat sweat/sweated sweat/sweated sweats sweating\tsweep swept/sweeped swept/sweeped sweeps sweeping\tswell swelled swollen swells swelling\tswim swam swum swims swimming\tswing swung swung swings swinging\ttake took taken takes taking\tteach taught taught teaches teaching\ttear tore torn tears tearing\ttell told told tells telling\tthink thought thought thinks thinking\tthrive throve/thrived thriven/thrived thrives thriving\tthrow threw thrown throws throwing\tthrust thrust thrust thrusts thrusting\ttread trod trodden treads treading\tundergo underwent undergone undergoes undergoing\tunderstand understood understood understands understanding\tundertake undertook undertaken undertakes undertaking\tupsell upsold upsold upsells upselling\tupset upset upset upsets upsetting\tvex vext/vexed vext/vexed vexes vexing\twake woke woken wakes waking\twear wore worn wears wearing\tweave wove woven weaves weaving\twed wed/wedded wed/wedded weds wedding\tweep wept wept weeps weeping\twend wended/went wended/went wends wending\twet wet/wetted wet/wetted wets wetting\twin won won wins winning\twind wound wound winds winding\twithdraw withdrew withdrawn withdraws withdrawing\twithhold withheld withheld withholds withholding\twithstand withstood withstood withstands withstanding\twring wrung wrung wrings wringing\twrite wrote written writes writing\tzinc zinced/zincked zinced/zincked zincs/zincks zincking"
            .split("\t")
            .map(function (t) {
              return t.split(" ");
            }),
        infinitives: [],
        ing_excpt: ["anything", "spring", "something", "thing", "king", "nothing"],
        ing_test: [],
        emphasis: [
          "totally",
          "fully",
          "really",
          "surprisingly",
          "absolutely",
          "actively",
          "clearly",
          "crazily",
          "greatly",
          "happily",
          "notably",
          "severly",
          "particularly",
          "highly",
          "quite",
          "pretty",
          "seriously",
          "very",
          "horribly",
          "even",
          "overly",
          "extremely",
        ],
        abbrs: [
          "jr",
          "junior",
          "mr",
          "mister",
          "mrs",
          "missus",
          "ms",
          "miss",
          "dr",
          "doctor",
          "prof",
          "professor",
          "pr",
          "professor",
          "sr",
          "senior",
          "sen",
          "senator",
          "sens",
          "senators",
          "corp",
          "corporation",
          "rep",
          "",
          "gov",
          "governor",
          "atty",
          "attorney",
          "supt",
          "superintendent",
          "det",
          "detective",
          "rev",
          "",
          "col",
          "colonel",
          "gen",
          "general",
          "lt",
          "lieutenant",
          "cmdr",
          "commander",
          "adm",
          "administrative",
          "capt",
          "captain",
          "sgt",
          "sergent",
          "cpl",
          "caporal",
          "maj",
          "",
          "esq",
          "esquire",
          "phd",
          "",
          "adj",
          "adjective",
          "adv",
          "adverb",
          "asst",
          "assistant",
          "bldg",
          "building",
          "brig",
          "brigade",
          "hon",
          "",
          "messrs",
          "messeurs",
          "mlle",
          "mademoiselle",
          "mme",
          "madame",
          "ord",
          "order",
          "pvt",
          "private",
          "reps",
          "",
          "res",
          "",
          "sfc",
          "",
          "surg",
          "surgeon",
          "ph",
          "",
          "ds",
          "",
          "ave",
          "avenue",
          "blvd",
          "boulevard",
          "cl",
          "",
          "ct",
          "",
          "cres",
          "",
          "exp",
          "",
          "rd",
          "road",
          "st",
          "street",
          "mt",
          "mount",
          "ft",
          "",
          "fy",
          "",
          "hwy",
          "highway",
          "la",
          "",
          "pd",
          "",
          "pl",
          "",
          "plz",
          "",
          "tce",
          "",
          "vs",
          "",
          "etc",
          "",
          "esp",
          "",
          "llb",
          "",
          "md",
          "",
          "bl",
          "",
          "ma",
          "",
          "ba",
          "",
          "lit",
          "",
          "fl",
          "",
          "ex",
          "example",
          "eg",
          "",
          "ala",
          "alabama",
          "al",
          "alabama",
          "ariz",
          "arizona",
          "ark",
          "arkansas",
          "cal",
          "california",
          "calif",
          "california",
          "col",
          "coloradoa",
          "colo",
          "colorado",
          "conn",
          "connecticut",
          "del",
          "delaware",
          "fed",
          "federal",
          "fla",
          "florida",
          "ga",
          "georgia",
          "ida",
          "idaho",
          "id",
          "idaho",
          "ill",
          "illinois",
          "ind",
          "indiana",
          "ia",
          "iowa",
          "kan",
          "kansas",
          "kans",
          "kansas",
          "ken",
          "kentuky",
          "ky",
          "kentuky",
          "la",
          "",
          "md",
          "",
          "mass",
          "massachussets",
          "mich",
          "michigan",
          "minn",
          "minnesota",
          "miss",
          "mississippi",
          "mo",
          "missouri",
          "mont",
          "montana",
          "neb",
          "nebraska",
          "nebr",
          "nebraska",
          "nev",
          "nevada",
          "mex",
          "mexico",
          "okla",
          "oklahoma",
          "ok",
          "oklahoma",
          "ore",
          "oregon",
          "penna",
          "pennsylvania",
          "penn",
          "pennsylvania",
          "pa",
          "pennsylvania",
          "dak",
          "dakota",
          "tenn",
          "tennessee",
          "tex",
          "texas",
          "ut",
          "utah",
          "vt",
          "vermont",
          "va",
          "virginia",
          "wash",
          "washington",
          "wis",
          "wisconsin",
          "wisc",
          "wisconsin",
          "wy",
          "wyoming",
          "wyo",
          "wyoming",
          "alta",
          "alberta",
          "ont",
          "ontario",
          "que",
          "quebec",
          "sask",
          "saskatchewan",
          "yuk",
          "yukon",
          "jan",
          "january",
          "feb",
          "february",
          "mar",
          "march",
          "apr",
          "april",
          "jun",
          "june",
          "jul",
          "july",
          "aug",
          "august",
          "sep",
          "september",
          "oct",
          "october",
          "nov",
          "november",
          "dec",
          "december",
          "sept",
          "september",
          "dept",
          "department",
          "univ",
          "university",
          "assn",
          "association",
          "bros",
          "brothers",
          "inc",
          "incorported",
          "ltd",
          "limited",
          "co",
          "",
        ],
        synonyms:
          "no nah nope n\tyes yeah yep yup y yah aye yea\tseriously srlsy\tok k okay o.k. oki okey-dokey okey-doke\tthem 'em\tyou ya ye\tyour yo\tbecause cuz\tplease plz\tthis dis\ttomorrow 2moro\ttonight 2nite\ttoday 2day\tgreat gr8\tlater l8r\tthanks thx thks tx\tare 're\tam 'm\thello hi\tlove <3\t",
        abbrs_rplt: [],
        exclamations: ["yahoo", "joomla", "jeopardy"],
        rules:
          "VBP VB 13 MD\tVBZ POS 8 NN 's\tVBZ POS 8 NNS 's\tVBZ POS 8 NNP 's\tVBZ POS 8 NNPS 's\tVBZ POS 8 VB 's\tNNS POS 8 VB 's\tNNS POS 8 NN '\tNNS POS 8 NNS '\tNNS POS 8 NNP '\tNNS POS 8 NNPS '\tNNS POS 8 NN 's\tNNS POS 8 NNS 's\tNNS POS 8 NNP 's\tNNS POS 8 NNPS 's\tRB DT 8 VBN no\tRB DT 8 VBG no\tRB DT 8 VBD no\tRB DT 8 VBP no\tRB DT 8 VB no\tRB DT 8 RB no\tIN RP 8 VB out\tIN RP 8 VBZ out\tIN RP 8 VBG out\tIN RP 8 VBN out\tIN RP 8 VBP out\tIN RP 8 VB off\tIN RP 8 VBZ off\tIN RP 8 VBG off\tIN RP 8 VBN off\tIN RP 8 VBP off\tRB DT 8 VBD no\tRB DT 8 IN no\tVBZ NNS 2 PRP$\tVBZ NNS 2 WP$\tVBZ NNS 2 VBZ\tVBZ NNS 2 VBP\tVBZ NNS 2 JJ\tVBZ NNS 2 JJS\tVBZ NNS 2 JJR\tVBZ NNS 2 POS\tVBZ NNS 2 CD\tVBZ NNS 51 the DT\tVBZ NNS 15 is\tVBZ NNS 15 are\tVBZ NNS 5 the\tVBZ NNS 5 those\tVBZ NNS 5 these\tVB VBP 8 NNP have\tVB VBP 8 EX have\tVB VBP 8 RB have\tVB VBP 8 RBR have\tIN WDT 8 NNS that\tVBP IN 8 JJR like\tVBP IN 8 RBR like\tVBP IN 8 VBD like\tVBP IN 8 VBN like\tVBP IN 8 RB like\tVBP IN 8 VBZ like\tJJ JJS 8 DT latest\tPRP$ PRP 8 VBD her\tJJ NN 8 CD fine\tJJ RB 8 IN much\tNNP MD 8 PRP may\tNNP MD 8 NNP may\tNNP MD 8 NN may\tNNP MD 8 NNS may\tNNP MD 8 CC may\tJJ NN 8 CC chief\tJJ VB 8 TO slow\tJJ VB 8 MD slow\tVB NN 2 DT\tVB NN 2 JJR\tVB NN 2 JJ\tVB NN 2 NN\tVB NN 2 IN\tVB NN 2 SYM\tVB NN 2 VBD\tVB NN 2 VBN\tVB NN 172 MD VB NN\tVB NN 172 MD VB IN\tNN VB 1 MD\tNN VB 172 VBN TO $\tNN VB 172 NNS TO JJ\tNN VBG 2 PRP\tNNP MD 12 may VB\tVBD VBN 21 be\tJJR RBR 3 JJ\tJJS RBS 12 most JJ\tNN RB 121 kind of\tJJ IN 8 NNP in\tRB DT 8 VBZ no\tJJ IN 8 NN in\tJJ IN 8 JJ in\tJJ IN 8 RB in\tJJ IN 8 VB in\tJJ IN 8 NNS in\tJJ IN 8 VBN in\tJJ IN 8 CD in\tIN RB 12 as RB\tWRB RB 12 when PRP\tWRB RB 8 IN how\tJJ RB 8 RB much\tJJR RBR 12 more JJ\tIN RP 8 VBD up\tIN RB 8 CD up\tIN RB 8 NN up\tRP RB 8 VBD up\tIN RP 8 VB up\tRB RP 8 VB back\tRB RP 8 VBD back\tRB RP 8 VBG back\tRB IN 81 years ago\tRB IN 81 year ago\tIN WDT 8 NN that\tRB WRB 12 when PRP\tIN DT 12 that NN\tWDT IN 12 that NN\tWDT IN 12 that DT\tWDT IN 12 that PRP\tWRB RB 12 when DT\tVB NN 3 VBZ +\tVBG MD 6 'll\tVBG MD 6 wo\tVBD VBN 13 VBZ\tVBN VBD 3 .\tVBN VBD 3 DT\tVBG VBP 2 PRP\tVBN VBD 2 PRP\tVBN VBD 2 NNP\tVBN VBD 2 NN\tVBN VBD 2 NNS\tVBN VBD 2 WP\tVBN VBD 14 NN RB\tVBN VBD 14 PRP DT\tVBD VBN 2 VBD\tVBD VBN 2 VB\tVBD VBN 2 VBG\tVBD VBN 2 VBZ\tVBD VBN 2 VBZ\tVBD VBN 2 VBP\tVBD VBN 14 RB TO\tVBD VBN 14 VBZ JJ\tVBD VBN 14 VBP JJ\tVBD VBN 171 TO PRP\tVBD VBN 15 by\tVBN VBD 15 that\tVBN VBD 5 which\tVBD VBN 5 has\tVBD VBN 13 VBD\tVB VBN 5 has\tVBD VBN 17 MD\tVBG NN 2 DT\tVBG NN 2 JJ\tVBG NN 2 PRP$\tRBS JJS 2 IN\tNN VB 14 TO DT\tNN VB 14 TO IN\tVB VBP 14 PRP DT\tVB VBP 14 PRP IN\tVBP VB 14 MD VBN\tMD VBG 14 VBZ TO\tMD VBG 14 VBP TO\tVBP VB 14 MD TO\tVBP VB 14 TO DT\tVBN VBD 14 PRP PRP\tVB VBD 14 PRP TO\tVBN VBD 14 NNP DT\tVB VBP 14 PRP PRP\tVB VBP 2 NNS\tVBP VB 51 to TO\tNNS NN 51 a DT\tWRB RB 51 and CC\tVBP VB 81 may have\tVBP MD 6 gon\tVBP VB 8 MD have\tNNS VBZ 8 PRP plans\tNNS VBZ 8 NN plans\tNNS VBZ 8 NNP plans\tNNS VBZ 8 NNPS plans\tRB NNP 12 south NNP\tRB NNP 12 east NNP\tRB NNP 12 west NNP\tRB NNP 12 north NNP\tFW NNP 12 la NNP\tJJ NNP 12 american NNP\tVBN NNP 12 united NNP\tWRB RB 12 when NN\tWRB RB 12 when NNS\tWRB RB 12 when NNP\tWRB RB 12 when NNPS\tWRB RB 12 where NN\tWRB RB 12 where NNS\tWRB RB 12 where NNP\tWRB RB 12 where NNPS\tWRB RB 12 when PRP\tRBR JJR 81 year earlier\tRBR JJR 81 years earlier\tNN VB 14 TO VBZ\tVBG NN 2 JJR\tCD NN 8 DT one\tCD PRP 12 one VBZ\tNNS VBZ 2 PRP\tVB VBP 2 WDT\tVB VBP 2 WP\tVB VBP 2 PRP\tVBZ NNS 2 VBG\tVBZ NNS 2 VBN\tVBZ NNS 2 VBD\tNNS VBZ 2 WDT\tNNS VBZ 2 WP\tVBZ NNS 2 IN\tWDT IN 12 that DT\tIN WDT 12 that VBP\tNN UH 12 hell UH\tNN UH 12 hell RB\tVB NN 8 PRP$ bid\tVBN JJ 51 is VBZ\tVBN JJ 51 are VBP\tVBN JJ 14 NN JJ\tVBN JJ 14 RB NN\tNN VB 5 will\tJJ VB 5 will\tNN NNP 5 mr.\tNNS VBZ 6 has\tVB NN 5 the\tVBD VBN 15 with\tVBN VBD 6 was\tNNS VBZ 6 is\tNN VBP 6 have\tVBD VBP 6 have\tVBN VBD 6 were\tCD NN 81 no one\tVBG JJ 14 , JJ\tVBG JJ 14 DT JJ\tVBG JJ 14 , NN\tVBG JJ 14 DT NN\tNNS VBZ 8 WDT 's\tNNS VBZ 8 DT 's\tNNS VBZ 8 IN 's\tNNP UH 0 RT\tNNP UH 0 MT\tJJ VBN 14 VBZ IN\tJJ NN 14 DT IN\tJJ VBN 14 VBP IN\tNN JJ 6 first\tNN JJ 6 last\tNN JJ 6 high\tNN JJ 6 low\tNN JJ 6 middle\t",
        suffixes:
          "rate VB\trates VBZ\tlate VB\tlates VBZ\tnate VB\tnates VBZ\tizes VBZ\tize VB\tify VB\tifies VBZ\tising VBG\tism NN\table JJ\tible JJ\tical JJ\tesque JJ\tous JJ \tetic JJ\tatic JJ\tegic JJ\tophic JJ\tish JJ\tive JJ\tgic JJ\ttic JJ\tmic JJ\tphile JJ\tless JJ\tful JJ\tedelic JJ\tadelic JJ\taholic JJ\toholic JJ\tilar JJ\tular JJ\tly RB\tlike JJ\twise RB\tise VB\tsome JJ\tescent JJ\tchy JJ\tthy JJ\tshy JJ\tsty JJ\ttty JJ\tbby JJ\tssy JJ\tzzy JJ\tmmy JJ\tppy JJ\ttary JJ\tnary JJ\tial JJ\talous JJ\tally RB\tvid JJ\trid JJ\twards RB\tiest JJS\tdest JJS\trth JJ",
        emots: [],
        floatChar: ".",
        thousandChar: ",",
        multipliers: ["hundred", "thousand", "million", "billion", "trillion"],
        numbers: {
          zero: 0,
          one: 1,
          two: 2,
          three: 3,
          four: 4,
          five: 5,
          six: 6,
          seven: 7,
          eight: 8,
          nine: 9,
          ten: 10,
          eleven: 11,
          twelve: 12,
          thirteen: 13,
          fourteen: 14,
          fifteen: 15,
          sixteen: 16,
          seventeen: 17,
          eighteen: 18,
          nineteen: 19,
          ninteen: 19,
          twenty: 20,
          thirty: 30,
          forty: 40,
          fourty: 40,
          fifty: 50,
          sixty: 60,
          seventy: 70,
          eighty: 80,
          ninety: 90,
          hundred: 100,
          thousand: 1e3,
          million: 1e6,
          billion: 1e9,
          trillion: 1e12,
        },
        nationalities:
          "afghan albanian algerian argentine armenian australian aussie austrian bangladeshi belgian bolivian bosnian brazilian bulgarian cambodian canadian chilean chinese colombian croat cuban czech dominican egyptian british estonian ethiopian finnish french gambian georgian german greek haitian hungarian indian indonesian iranian iraqi irish israeli italian jamaican japanese jordanian kenyan korean kuwaiti latvian lebanese liberian libyan lithuanian macedonian malaysian mexican mongolian moroccan dutch nicaraguan nigerian norwegian omani pakistani palestinian filipino polish portuguese qatari romanian russian rwandan samoan saudi scottish senegalese serbian singaporean slovak somali sudanese swedish swiss syrian taiwanese thai tunisian ugandan ukrainian american hindi spanish venezuelan vietnamese welsh african european asian californian",
        neg: {
          zero: "CD",
          without: "IN",
          except: "IN",
          absent: "JJ",
          unlike: "IN",
          unable: "JJ",
          unremarkable: "JJ",
          unlikely: "JJ",
          negative: "JJ",
          hardly: "RB",
          deny: "VB",
          fail: "VB",
          exclude: "VB",
          lack: "NN",
          absence: "NN",
          none: "NN",
          nothing: "NN",
        },
        neg_neg: { only: "RB", just: "RB", solely: "RB", uniquely: "RB", exclusively: "RB" },
        refusal: { not: "RB", "n't": "RB", "'t": "RB", no: "RB", neither: "DT", nor: "DT", never: "RB" },
        approval: {
          yes: "UH",
          ok: "NN",
          agreed: "VBN",
          agree: "VBP",
          affirmative: "JJ",
          approved: "VBN",
          sure: "JJ",
          roger: "NN",
          indeed: "RB",
          right: "NN",
          alright: "JJ",
        },
        approval_verbs: ["go", "do"],
        breakpoints: {},
        citations: { '"': '"', "'": '"', "`": '"' },
        p: { i: "PRP", you: "PRP" },
        months: {
          january: "NNP",
          february: "NNP",
          march: "NNP",
          april: "NNP",
          may: "NNP",
          june: "NNP",
          july: "NNP",
          august: "NNP",
          september: "NNP",
          october: "NNP",
          november: "NNP",
          december: "NNP",
        },
        days: {
          monday: "NNP",
          tuesday: "NNP",
          wednesday: "NNP",
          thursday: "NNP",
          friday: "NNP",
          saturday: "NNP",
          sunday: "NNP",
        },
        indicators: {
          first: "JJ",
          both: "DT",
          second: "JJ",
          third: "JJ",
          last: "JJ",
          previous: "JJ",
          next: "JJ",
          latest: "JJ",
          earliest: "JJ",
        },
        dirty:
          "anal anus arse ass asshole ballsack bastard bitch biatch bloody blowjob bollock bollok boner boob bugger bum butt buttplug clitoris cock coon crap cunt damn dick dildo dyke fag feck fellate fellatio felching fuck fucking fudgepacker fudgepacker flange homo jerk jizz knobend knobend labia lmfao muff nigger nigga penis piss poop prick pube pussy queer scrotum sex shit sh1t slut smegma spunk tit tosser turd twat vagina wank whore crappy".split(
            " "
          ),
        polite: "thanks thank please excuse pardon welcome sorry might ought".split(" "),
      });
    })(),
    !(function () {
      var e = t.inflector,
        i = function (i) {
          var s,
            r,
            a,
            o,
            J,
            l,
            d,
            N,
            c,
            p,
            B,
            g = (Date.now(), i.split("\t")),
            V = {},
            h = [];
          for (s = 0, a = g.length; s < a; s++)
            (B = g[s].split(" ")),
              (J = !1),
              (p = B.length - 1),
              (d = p > 0 ? B[1].trim() : ""),
              (o = d.length - 1),
              o > 0 && "-" === d[o] && ((J = !0), (d = d.slice(0, o))),
              (N = 0),
              (c = null),
              B[p].match(/^[A-Z]{2,}\/[0-9\-]+$/g)
                ? ((c = B[p].split("/")[0]), (N = B[p].split("/")[1]))
                : (B[p].match(/^[0-9\-]+$/g) || B[p].match(/^\-{0,1}[0-4]\.[0-9]$/g)) &&
                  (N = B[p].indexOf(".") > 0 ? parseFloat(B[p]) : parseInt(B[p], 10)),
              "EM" === d && t.punycode.ucs2.decode(B[0]).length > 1 && h.push(B[0]),
              (V[B[0]] = { pos: "-" === d ? "NN" : d, sentiment: N, condition: c, blocked: J });
          for (s in n)
            if (n.hasOwnProperty(s) && "object" == typeof n[s] && !u(n[s])) {
              B = n[s];
              for (a in B)
                B.hasOwnProperty(a) &&
                  ((N = 0),
                  "string" == typeof B[a]
                    ? (V.hasOwnProperty(a) && (N = V[a].sentiment),
                      (V[a] = { pos: B[a], sentiment: N, condition: null }))
                    : "number" == typeof B[a] && (V[a] = { pos: "CD", sentiment: N, value: B[a], condition: null }));
            }
          for (s = 0, a = n.verbs.length; s < a; s++, N = 0)
            (B = n.verbs[s]),
              n.infinitives.push(B),
              (l = e.conjugate(B, "VBZ")),
              l &&
                (V.hasOwnProperty(B) &&
                  ("NN" === V[B].pos && (V[B].pos = "VB"), (J = V[B].blocked), (N = V[B].sentiment)),
                (V[l] = { pos: "VBZ", sentiment: N, condition: null, infinitive: B, blocked: J }),
                (l = e.conjugate(B, "VBN")),
                V.hasOwnProperty(l)
                  ? (V[l].infinitive = B)
                  : (V[l] = { pos: "VBN", sentiment: N, condition: null, infinitive: B }),
                (l = e.conjugate(B, "VBG")),
                V.hasOwnProperty(l)
                  ? (V[l].infinitive = B)
                  : (V[l] = { pos: "VBG", sentiment: N, condition: null, infinitive: B }));
          for (s = 0, a = n.irregular.length; s < a; s++, N = 0)
            for (
              B = n.irregular[s],
                p = B[0],
                V.hasOwnProperty(p) && ((N = V[p].sentiment), "VB" !== V[p].pos && (V[p].pos = "VB")),
                n.infinitives.push(p),
                r = 0;
              r < 5;
              r++
            )
              B[r].split("/").map(function (t) {
                V.hasOwnProperty(t)
                  ? V[t].infinitive || ((V[t].infinitive = p), (V[t].sentiment = N))
                  : (V[t] = {
                      pos: 0 === r ? "VB" : 1 === r ? "VBD" : 2 === r ? "VBN" : 3 === r ? "VBZ" : "VBG",
                      sentiment: N,
                      condition: null,
                      infinitive: p,
                    });
              });
          return (n.emots = h), V;
        },
        s = function (t) {
          t = t.split("\t");
          var e,
            i,
            s,
            r = [],
            a = t.length;
          for (s = 0; s < a; s++)
            (e = t[s].split(" ")),
              "+" === e[e.length - 1] ? (e.splice(e.length - 1, 1), (i = !0)) : (i = !1),
              r.push({ from: e[0], to: e[1], type: parseInt(e[2], 10), c1: e[3], c2: e[4], c3: e[5], secondRun: i });
          n.rules = r;
        },
        r = function (t) {
          t = t.split("\t");
          var e,
            i,
            s = t.length,
            r = [];
          for (e = 0; e < s; e++)
            (i = t[e].split(" ")), r.push({ regexp: new RegExp("^.{1,}" + i[0].trim() + "$", "gi"), pos: i[1] });
          n.suffixes = r;
        },
        a = function (t) {
          var i,
            n = t.length;
          for (i = 0; i < n; i++) t.push(e.pluralize(t[i]));
        },
        o = function (t) {
          var e,
            i = t.length,
            s = [],
            r = [];
          for (e = 0; e < i; e++) e % 2 === 0 ? s.push(t[e]) : r.push(t[e]);
          (n.abbrs = s), (n.abbrs_rplt = r);
        },
        J = function (t) {
          var e,
            i,
            s = {};
          for (t = t.split(" "), e = 0, i = t.length; e < i; e++) s[t[e]] = "JJ";
          n.nationalities = s;
        },
        l = function (t) {
          t = t.split("\t");
          var e,
            i = t.length,
            s = [];
          for (e = 0; e < i; e++) s.push(t[e].split(" "));
          n.synonyms = s;
        };
      s(n.rules),
        r(n.suffixes),
        o(n.abbrs),
        a(n.dirty),
        l(n.synonyms),
        J(n.nationalities),
        (t.lexicon = i(
          "! !\t# #\t... ...\t$ $\t€ $\t£ $\t¥ $\t%... :\t& CC\t( (\t) )\t* SYM\t+ SYM\t, ,\t. .\t: :\t; ;\t< SYM\t= SYM\t> SYM\t? .\t@ IN\ta DT\tabandon VB -2\tabandoned VBN -2\tabandons VBZ -2\tabducted VBN -2\tabduction NN -2\tabhor VB -3\tabhorred VBD -3\tabhorrent JJ -3\tability NN 2\table JJ\taboard IN 1\taboriginal JJ\tabout IN\tabove IN\tabroad RB\tabsentee JJ -1\tabsolute JJ\tabsolve VBP 2\tabsolved VBD 2\tabsolving VBG 2\tabsorbed VBN 1\tabstract JJ\tabuse NN -3\tabused VBN -3\tabusive JJ -3\taccept VB 1\taccepted VBN 1\taccepting VBG 1\taccepts VBZ 1\taccident NN -2\taccidental JJ -2\taccidentally RB -2\taccommodate VB\taccomplish VB 2\taccomplished VBN 2\taccomplishes VBZ 2\taccurate JJ 1\taccusation NN -2\taccuse VB -2\taccused VBN -2\taccuses VBZ -2\taccusing VBG -2\tache NN -2\tachievable JJ 1\tachieve VB\taching VBG -2\tacknowledge VBP\tacquire VB\tacquit VB 2\tacquitted VBN 2\tacrimonious JJ -3\tacross IN\tactive JJ 1\tactual JJ\tacute JJ\tadditional JJ\tadequate JJ 1\tadjacent JJ\tadjust VB\tadmire VB 3\tadmired VBD 3\tadmires VBZ 3\tadmiring VBG 3\tadmit VB -1\tadmits VBZ -1\tadmitted VBD -1\tadmonished VBD -2\tadopt VB 1\tadopts VBZ 1\tadorable JJ 3\tadore VBP 3\tadored VBD 3\tadores VBZ 3\tadvanced VBD 1\tadvantage NN 2\tadventure NN 2\tadventurous JJ 2\tadverse JJ\tadvisory JJ\taffect VB\taffected VBN -1\taffection NN 3\taffectionate JJ 3\tafflicted VBN -1\taffronted VBN -1\tafraid JJ -2\tafter IN\tagain RB\tagainst IN\taggravate VBP -2\taggravated VBN -2\taggravates VBZ -2\taggravating VBG -2\taggregate JJ\taggression NN -2\taggressive JJ -2\taghast JJ -2\tago RB\tagonize VB -3\tagonized VBD -3\tagonizes VBZ -3\tagonizing JJ -3\tagree VB 1\tagreeable JJ 2\tagreed VBD 1\tagreement NN 1\tagrees VBZ 1\tagricultural JJ\tah UH\tahead RB\tai VBP\talarm NN -2\talarmed VBN -2\talarmist JJ -2\talas UH -1\talert JJ -1\talien JJ\talienation NN -2\talign VB\talike RB\talive JJ 1\tall DT\tallergic JJ -2\tallow VB 1\talmost RB\talone RB -2\talong IN\talpha JJ\talready RB\talso RB\talter VB\talternate JJ\talthough IN\talways RB\tam VBP\tamaze VB 2\tamazed VBN 2\tamazing JJ 4\tamber JJ\tambitious JJ 2\tambivalent JJ -1\tamend VB\tamino JJ\tamong IN\tamongst IN\tamuse VB 3\tamused VBN 3\tamusement NN 3\tan DT\tancient JJ\tand CC\tanger NN -3\tangers VBZ -3\tangry JJ -3\tanguish NN -3\tanguished JJ -3\tanimated JJ\tanimosity NN -2\tannoy VB -2\tannoyance NN -2\tannoyed VBN -2\tannoying JJ -2\tannoys VBZ -2\tannual JJ\tanother DT\tantagonistic JJ -2\tanti IN -1\tanticipation NN 1\tantique JJ\tanxiety NN -2\tanxious JJ -2\tany DT\tanymore RB\tanytime RB\tanyway RB\tanywhere RB\tapart RB\tapathetic JJ -3\tapathy NN -3\tapocalyptic JJ -2\tapologize VB -1\tapologized VBD -1\tapologizes VBZ -1\tapologizing VBG -1\tapology NN -1\tappalled VBN -2\tappalling JJ -2\tapparent JJ\tappease VB 2\tappeased VBN 2\tappeasing NN 2\tapplaud VBP 2\tapplauded VBD 2\tapplauding VBG 2\tapplauds VBZ 2\tapplause NN 2\tapply VB\tappreciate VB 2\tappreciated VBN 2\tappreciates VBZ 2\tappreciating VBG 2\tappreciation NN 2\tapprehensive JJ -2\tappropriate JJ\tapproval NN 2\tapproved VBD 2\tapproves VBZ 2\tapproximate JJ\tapt JJ\tarabic JJ\tarbitrary JJ\tarchitectural JJ\tardent JJ 1\tare VBP\targue VBP\taround IN\tarrest NN -2\tarrested VBN -3\tarrogant JJ -2\tas IN\tashamed JJ -2\taside RB\tass NN -4\tassassination NN -3\tassess VB\tasset NN 2\tassign VB\tassist VB\tassociate JJ\tassume VB\tassure VB\tastonished VBN 2\tastound VB 3\tastounded VBN 3\tastounding JJ 3\tastoundingly RB 3\tastounds VBZ 3\tat IN\tatmospheric JJ\tattack NN -1\tattacked VBN -1\tattacking VBG -1\tattract VB 1\tattracted VBN 1\tattracting VBG 2\tattraction NN 2\tattracts VBZ 1\tattribute VBP\tau FW\tauburn JJ\taudacious JJ 3\taudio JJ\tauthority NN 1\taverage JJ\tavert VB -1\taverted VBN -1\taverts VBZ -1\tavid JJ 2\tavoid VB -1\tavoided VBN -1\tavoids VBZ -1\taw UH\taww UH 1\tawait VB -1\tawaited VBD -1\tawaits VBZ -1\taward NN 3\tawarded VBN 3\taware JJ\taway RB\tawesome JJ 4\tawful JJ -3\tawkward JJ -2\taxe NN -1\taye RB\tback RB\tbacked VBN 1\tbacking VBG 2\tbad JJ -3\tbadly RB -3\tbailout NN -2\tbalanced JJ\tbald JJ\tbamboozled VBN -2\tban NN -2\tbanish VB -1\tbankrupt JJ -3\tbanned VBN -2\tbare JJ\tbargain NN 2\tbarrier NN -2\tbasic JJ\tbastard NN -5\tbattle NN -1\tbeaten VBN -2\tbeatific JJ 3\tbeating VBG -1\tbeautiful JJ 3\tbeautifully RB 3\tbeautify VBP 3\tbecause IN\tbefore IN\tbehavioral JJ\tbehind IN\tbelieve VBP\tbelittle VBP -2\tbelittled JJ -2\tbelle FW\tbeloved JJ 3\tbelow IN\tbeneath IN\tbenefit NN 2\tbeside IN\tbesides IN\tbest JJS 3\tbetray VB -3\tbetrayal NN -3\tbetrayed VBN -3\tbetraying VBG -3\tbetrays VBZ -3\tbetter JJR 2\tbetween IN\tbeyond IN\tbi IN\tbias NN -1\tbiased VBN -2\tbig JJ 1\tbigger JJR\tbiggest JJS\tbitch NN -5\tbitter JJ -2\tbitterly RB -2\tbizarre JJ -2\tblack JJ\tblame VB -2\tblamed VBD -2\tblames VBZ -2\tblaming VBG -2\tblank JJ\tbless VB 2\tblessing NN 3\tblind JJ -1\tbliss NN 3\tblissful JJ 3\tblithe JJ 2\tblock NN -1\tblockbuster NN 3\tblocked VBN -1\tblocking VBG -1\tblond JJ\tblonde JJ\tbloody JJ -3\tblue JJ\tblurry JJ -2\tblush NN 3\tboastful JJ -2\tbold JJ 2\tboldly RB 2\tbomb NN -1\tbon FW\tboost VB 1\tboosted VBD 1\tboosting VBG 1\tbore VBD -2\tbored VBN -2\tboring JJ -3\tborn VBN\tbother VB -2\tbothered VBN -2\tbothers VBZ -2\tbothersome JJ -2\tboycott NN -2\tboycotted VBN -2\tboycotting VBG -2\tbrainwashing NN -3\tbrave JJ 2\tbreakthrough NN 3\tbreathtaking JJ 5\tbribe NN -3\tbridal JJ\tbrief JJ\tbright JJ 1\tbrightest JJS 2\tbrightness NN 1\tbrilliant JJ 4\tbrisk JJ 2\tbroad JJ\tbroader JJR\tbroke VBD -1\tbroken VBN -1\tbrooding VBG -2\tbrown JJ\tbrowse VB\tbrunette JJ\tbrutal JJ\tbullied VBD -2\tbullshit NN -4\tbully NN -2\tbullying VBG -2\tbuoyant JJ 2\tburden NN -2\tburdened VBN -2\tburdening VBG -2\tburn VB -1\tbusy JJ\tbut CC\tby IN\tbye VB\tca MD\tcalm JJ 2\tcalmed VBD 2\tcalming VBG 2\tcan MD\tcancel VB -1\tcancelled VBN -1\tcancelling VBG -1\tcancels VBZ -1\tcancer NN -1\tcapable JJ 1\tcaptivated VBN 3\tcapture VB\tcardiac JJ\tcare NN 2\tcarefree JJ 1\tcareful JJ 2\tcarefully RB 2\tcareless JJ -2\tcares VBZ 2\tcasual JJ\tcasualty NN -2\tcatastrophe NN -3\tcatastrophic JJ -4\tcautious JJ -1\tcelebrate VB 3\tcelebrated VBD 3\tcelebrates VBZ 3\tcelebrating VBG 3\tcensor VBP -2\tcensored VBN -2\tcentral JJ\tcertain JJ 1\tchagrin NN -2\tchallenge NN -1\tchance NN 2\tchaos NN -2\tchaotic JJ -2\tchar VB\tcharged VBN -3\tcharm NN 3\tcharming JJ 3\tchastised VBD -3\tchastises VBZ -3\tcheap JJ\tcheaper JJR\tcheapest JJS\tcheat VB -3\tcheated VBN -3\tcheater NN -3\tcheats VBZ -3\tcheer NN 2\tcheered VBD 2\tcheerful JJ 2\tcheering VBG 2\tcheery JJ 3\tcherish VB 2\tcherished VBN 2\tcherishes VBZ 2\tcherishing VBG 2\tcherry JJ\tchic JJ 2\tchief JJ\tchildish JJ -2\tchilling VBG -1\tchoke VB -2\tchoked VBD -2\tchoking VBG -2\tchronic JJ\tcite VBP\tcivic JJ\tcivil JJ\tcivilian JJ\tclarifies VBZ 2\tclarity NN 2\tclash NN -2\tclassic JJ\tclassy JJ 3\tclean JJ 2\tcleaner JJR 2\tclear JJ 1\tcleared VBN 1\tclearly RB 1\tclears VBZ 1\tclever JJ 2\tclimb VB\tcloser JJR\tclosest JJS\tclouded VBN -1\tcloudy JJ\tcoastal JJ\tcock NN -5\tcocky JJ -2\tcoerced VBN -2\tcold JJ\tcollapse NN -2\tcollapsed VBD -2\tcollapses VBZ -2\tcollapsing VBG -2\tcollision NN -2\tcolored JJ\tcombat NN -1\tcombine VB\tcomedy NN 1\tcomfort NN 2\tcomfortable JJ 2\tcomforting VBG 2\tcommend VB 2\tcommended VBN 2\tcomment VB\tcommit VB 1\tcommitment NN 2\tcommits VBZ 1\tcommitted VBN 1\tcommitting VBG 1\tcommon JJ\tcommunist JJ\tcompact JJ\tcompassionate JJ 2\tcompelled VBN 1\tcompetent JJ 2\tcompetitive JJ 2\tcompile VB\tcomplacent JJ -2\tcomplain VBP -2\tcomplained VBD -2\tcomplains VBZ -2\tcomplete JJ\tcomplex JJ\tcompliant JJ\tcomply VB\tcomposite JJ\tcomprehensive JJ 2\tcomputational JJ\tcompute VB\tcon JJ\tconceptual JJ\tconciliate VB 2\tconclude VB\tconcrete JJ\tcondemn VB -2\tcondemnation NN -2\tcondemned VBN -2\tcondemns VBZ -2\tconditional JJ\tconfidence NN 2\tconfident JJ 2\tconfirm VB\tconflict NN -2\tconflicting VBG -2\tconfounded VBD -2\tconfuse VB -2\tconfused VBN -2\tconfusing JJ -2\tcongratulate VBP 2\tcongratulation NN 2\tcongressional JJ\tconsent NN 2\tconsistent JJ\tconsole VB\tconsolidated JJ\tconspiracy NN -3\tconstant JJ\tconstitute VBP\tconstitutional JJ\tconstrained VBN -2\tconstruct VB\tconsult VB\tcontagion NN -2\tcontagious JJ -1\tcontemporary JJ\tcontempt NN -2\tcontemptuous JJ -2\tcontemptuously RB -2\tcontend VBP -1\tcontender NN -1\tcontending VBG -1\tcontentious JJ -2\tcontinental JJ\tcontrary JJ\tcontribute VB\tcontroversial JJ -2\tconvenient JJ\tconventional JJ\tconvert VB\tconvince VB 1\tconvinced VBN 1\tconvinces VBZ 1\tconvivial JJ 2\tcool JJ 1\tcooler JJR\tcope VB\tcoral JJ\tcornered VBN -2\tcorporate JJ\tcorpse NN -1\tcorrect JJ\tcorresponding JJ\tcostly JJ -2\tcould MD\tcourage NN 2\tcourageous JJ 2\tcourteous JJ 2\tcourtesy NN 2\tcoward NN -2\tcowardly JJ -2\tcoziness NN 2\tcramp NN -1\tcrap NN -3\tcrash NN -2\tcrazy JJ -2\tcreate VB\tcreative JJ 2\tcrestfallen JJ -2\tcried VBD -2\tcrime NN -3\tcriminal JJ -3\tcrisis NN -3\tcritic NN -2\tcriticism NN -2\tcriticize VB -2\tcriticized VBN -2\tcriticizes VBZ -2\tcriticizing VBG -2\tcruel JJ -3\tcruelty NN -3\tcrush NN -1\tcrushed VBN -2\tcrushes VBZ -1\tcrushing VBG -1\tcry NN -1\tcrying VBG -2\tcubic JJ\tcultural JJ\tcurious JJ 1\tcurrent JJ\tcurse NN -1\tcut VB -1\tcute JJ 2\tcutting VBG -1\tcynic NN -2\tcynical JJ -2\tcynicism NN -2\td FW\tdaily JJ\tdamage NN -3\tdamn JJ -4\tdamned JJ -4\tdamnit UH -4\tdanger NN -2\tdans FW\tdaring JJ 2\tdark JJ\tdarkest JJS -2\tdarkness NN -1\tdauntless JJ 2\tde FW\tdead JJ -3\tdeadlock NN -2\tdeadly JJ\tdeaf JJ\tdeafening VBG -1\tdear JJ 2\tdearly RB 3\tdeath NN -2\tdebonair JJ 2\tdebt NN -2\tdeceit NN -3\tdeceitful JJ -3\tdeceive VB -3\tdeceived VBN -3\tdeceives VBZ -3\tdeceiving VBG -3\tdecent JJ\tdeception NN -3\tdecisive JJ 1\tdeclare VB\tdedicated VBN 2\tdeep JJ\tdeeper JJR\tdef JJ\tdefeated VBN -2\tdefect NN -3\tdefend VB\tdefender NN 2\tdefenseless JJ -2\tdefer VB -1\tdeferring VBG -1\tdefiant JJ -1\tdeficit NN -2\tdefine VB\tdegrade VB -2\tdegraded JJ -2\tdehumanize VB -2\tdehumanized VBN -2\tdelay NN -1\tdelayed VBN -1\tdelete VB\tdelight NN 3\tdelighted VBN 3\tdelighting VBG 3\tdelights VBZ 3\tdeluxe JJ\tdemand NN -1\tdemanded VBD -1\tdemanding VBG -1\tdemographic JJ\tdemonstration NN -1\tdemoralized VBN -2\tdenied VBN -2\tdenies VBZ -2\tdenounce VBP -2\tdenounces VBZ -2\tdense JJ\tdental JJ\tdeny VB -2\tdenying VBG -2\tdepartmental JJ\tdependent JJ\tdepressed JJ -2\tdepressing JJ -2\tderail VB -2\tderailed VBD -2\tderide VBP -2\tderided VBD -2\tderision NN -2\tdeserve VBP\tdesirable JJ 2\tdesire NN 1\tdesired VBN 2\tdesirous JJ 2\tdespair NN -3\tdespairing JJ -3\tdespairs VBZ -3\tdesperate JJ -3\tdesperately RB -3\tdespite IN\tdespondent JJ -3\tdestroy VB -3\tdestroyed VBN -3\tdestroying VBG -3\tdestroys VBZ -3\tdestruction NN -3\tdestructive JJ -3\tdetached VBN -1\tdetain VB -2\tdetained VBN -2\tdetention NN -2\tdetermine VB\tdetermined VBN 2\tdevastate VB -2\tdevastated VBN -2\tdevastating JJ -2\tdevelopmental JJ\tdeviant JJ\tdevoted VBN 3\tdiamond NN 1\tdie VB -3\tdied VBD -3\tdiffer VBP\tdifferent JJ\tdifficult JJ -1\tdigest VB\tdigital JJ\tdilemma NN -1\tdim JJ\tdimensional JJ\tdire JJ -3\tdirect JJ\tdirt NN -2\tdirtier JJR -2\tdirtiest JJS -2\tdirty JJ -2\tdisable VB\tdisabled JJ\tdisabling VBG -1\tdisadvantage NN -2\tdisadvantaged JJ -2\tdisagree VBP\tdisappear VB -1\tdisappeared VBD -1\tdisappears VBZ -1\tdisappoint VB -2\tdisappointed VBN -2\tdisappointing JJ -2\tdisappointment NN -2\tdisappoints VBZ -2\tdisaster NN -2\tdisastrous JJ -3\tdisbelieve VB -2\tdiscard VB -1\tdiscarded VBN -1\tdisclose VB\tdiscontented JJ -2\tdiscord NN -2\tdiscounted VBN -1\tdiscouraged VBN -2\tdiscredited VBN -2\tdiscrete JJ\tdiscuss VB\tdisdain NN -2\tdisgrace NN -2\tdisgraced VBN -2\tdisguise VB -1\tdisguised VBN -1\tdisguises VBZ -1\tdisgust NN -3\tdisgusted VBN -3\tdisgusting JJ -3\tdisheartened VBN -2\tdishonest JJ -2\tdisillusioned VBN -2\tdisinclined VBN -2\tdisjointed VBN -2\tdislike NN -2\tdismal JJ -2\tdismayed VBN -2\tdisorder NN -2\tdisorganized JJ -2\tdisoriented VBN -2\tdisparage VB -2\tdisparaged VBD -2\tdisparaging VBG -2\tdispleased VBN -2\tdispute NN -2\tdisputed VBN -2\tdisqualified VBN -2\tdisquiet NN -2\tdisregard NN -2\tdisregarded VBD -2\tdisregarding VBG -2\tdisrespect NN -2\tdisruption NN -2\tdisruptive JJ -2\tdissatisfied JJ -2\tdistant JJ\tdistinct JJ\tdistort VB -2\tdistorted VBN -2\tdistorting VBG -2\tdistorts VBZ -2\tdistract VB -2\tdistracted VBN -2\tdistraction NN -2\tdistress NN -2\tdistressed JJ -2\tdistressing JJ -2\tdistribute VB\tdistrust NN -3\tdisturb VB -2\tdisturbed VBN -2\tdisturbing JJ -2\tdisturbs VBZ -2\tdithering VBG -2\tdiverse JJ\tdivine JJ\tdizzy JJ -1\tdodge VBP\tdodging VBG -2\tdominant JJ\tdon VB\tdoom NN -2\tdoomed VBN -2\tdouble JJ\tdoubt NN -1\tdoubted VBD -1\tdoubtful JJ -1\tdoubting VBG -1\tdown RB\tdowncast JJ -2\tdownside NN -2\tdrag NN -1\tdragged VBN -1\tdrags VBZ -1\tdrained VBN -2\tdread NN -2\tdreaded VBN -2\tdreadful JJ -3\tdreading VBG -2\tdream NN 1\tdreary JJ -2\tdrop NN -1\tdrown VB -2\tdrowned VBN -2\tdrowns VBZ -2\tdrunk JJ -2\tdry JJ\tdual JJ\tdubious JJ -2\tdud NN -2\tdue JJ\tdull JJ -2\tdumb JJ -3\tdump VB -1\tdumped VBD -2\tdumps VBZ -1\tduped VBN -2\tduplicate VB\tduring IN\tdysfunction NN -2\teach DT\teager JJ 2\tearlier RBR\tearly JJ\tearn VB 1\tearnest NN 2\tease VB 2\teasier JJR\teasily RB 1\teast JJ\teastern JJ\teasy JJ 1\teclipse VB\tecstatic JJ 4\tedit VB\teducational JJ\teerie JJ -2\teffective JJ 2\teffectively RB 2\tefficient JJ\teh UH\teither DT\telated JJ 3\telation NN 3\telder JJR\telderly JJ\telect VB\telectoral JJ\telectric JJ\telectronic JJ\telegant JJ 2\telegantly RB 2\telse RB\telsewhere RB\tem PRP\tembarrass VB -2\tembarrassed VBN -2\tembarrassing JJ -2\tembarrassment NN -2\tembittered VBN -2\tembrace VB 1\temerald JJ\temergency NN -2\temotional JJ\tempathetic JJ 2\temptiness NN -1\tempty JJ -1\ten IN\tenable VB\tenchanted VBN 2\tencourage VB 2\tencouraged VBN 2\tencouragement NN 2\tencourages VBZ 2\tendorse VB 2\tendorsed VBN 2\tendorsement NN 2\tendorses VBZ 2\tenemy NN -2\tenergetic JJ 2\tengage VB 1\tengrossed JJ 1\tenhance VB\tenjoy VB 2\tenjoying VBG 2\tenjoys VBZ 2\tenlarge VB\tenlighten VB 2\tenlightened JJ 2\tenlightening VBG 2\tennui NN -2\tenough RB\tenrage NN -2\tenraged JJ -2\tenslave VBP -2\tenslaved VBN -2\tensure VB 1\tensuring VBG 1\tenterprising JJ 1\tentertaining VBG 2\tenthusiastic JJ 3\tentire JJ\tentitled VBN 1\tentrusted VBN 2\tenvious JJ -2\tenvironmental JJ\tenvy NN -1\tequal JJ\ter UH\terroneous JJ -2\terror NN -2\tescape VB -1\tescaping VBG -1\test FW\testablish VB\testeemed VBD 2\tet FW\tetc FW\teternal JJ\tethical JJ 2\tethnic JJ\teuphoria NN 3\teuphoric JJ 4\tevaluate VB\teven RB\tever RB\tevery DT\teveryday JJ\teverywhere RB\tevident JJ\tevil JJ -3\tex FW\texact JJ\texaggerate VB -2\texaggerated VBN -2\texaggerating VBG -2\texasperated JJ 2\texceed VB\texcel VBP\texcellence NN 3\texcellent JJ 3\texceptional JJ\texcess JJ\texcite VB 3\texcited VBN 3\texcitement NN 3\texciting JJ 3\texclude VB -1\texcluded VBN -2\texclusion NN -1\texclusive JJ 2\texcuse NN -1\texecute VB\texempt JJ -1\texhausted VBN -2\texhilarated VBN 3\texhilarating JJ 3\texonerate VB 2\texonerated VBN 2\texonerating VBG 2\texpand VB 1\texpands VBZ 1\texpect VBP\texpel VB -2\texpelled VBN -2\texpelling VBG -2\texperimental JJ\texplicit JJ\texploit VB -2\texploited VBN -2\texploiting VBG -2\texploration NN 1\texplore VB\texpose VB -1\texposed VBN -1\texposes VBZ -1\texposing VBG -1\texpress VB\texpressionless JJ 0\textend VB 1\textends VBZ 1\texterior JJ\texternal JJ\textra JJ\textract VB\textreme JJ\texuberant JJ 4\texultantly RB 3\tfabulous JJ 4\tfacilitate VB\tfad NN -2\tfail VB -2\tfailed VBD -2\tfailing VBG -2\tfails VBZ -2\tfailure NN -2\tfair JJ 2\tfairy JJ\tfaith NN 1\tfaithful JJ 3\tfake JJ -3\tfaking VBG -3\tfallen VBN -2\tfalling VBG -1\tfalse JJ\tfalsified VBN -3\tfalsify VB -3\tfame NN 1\tfamiliar JJ\tfan NN 3\tfancy JJ\tfantastic JJ 4\tfar RB\tfarce NN -1\tfascinate VB 3\tfascinated VBN 3\tfascinates VBZ 3\tfascinating JJ 3\tfascist JJ -2\tfast RB\tfaster RBR\tfastest JJS\tfat JJ\tfatal JJ\tfatality NN -3\tfatigue NN -2\tfatigued VBN -2\tfavor NN 2\tfavored VBN 2\tfavorite JJ 2\tfavors VBZ 2\tfear NN -2\tfearful JJ -2\tfearing VBG -2\tfearless JJ 2\tfearsome JJ -2\tfederal JJ\tfeeble JJ -2\tfelony NN -3\tfemale JJ\tfervent JJ 2\tfervid NN 2\tfestive JJ 2\tfew JJ\tfewer JJR\tfiasco NN -3\tfifth JJ\tfight NN -1\tfinal JJ\tfine JJ 2\tfinest JJS\tfinish VB\tfinite JJ\tfire NN -2\tfired VBN -2\tfiring VBG -2\tfiscal JJ\tfit VB 1\tfitness NN 1\tfitting JJ\tflagship NN 2\tflat JJ\tflees VBZ -1\tflip JJ\tflop NN -2\tflops VBZ -2\tfloral JJ\tflu NN -2\tflush JJ\tflushed VBN -2\tflustered VBN -2\tfocal JJ\tfocused VBN 2\tfond JJ 2\tfondness NN 2\tfool NN -2\tfoolish JJ -2\tfor IN\tforced VBN -1\tforeclosure NN -2\tforeign JJ\tforever RB\tforge VB\tforget VB -1\tforgetful JJ -2\tforgive VB 1\tforgiving VBG 1\tforgotten VBN -1\tformal JJ\tformer JJ\tforth RB\tfortunate JJ 2\tforward RB\tfossil JJ\tfoster VB\tfoul JJ\tfrank JJ\tfrantic JJ -1\tfraud NN -4\tfraudulent JJ -4\tfree JJ 1\tfreedom NN 2\tfreelance JJ\tfrenzy NN -3\tfrequent JJ\tfresh JJ 1\tfriendly JJ 2\tfright NN -2\tfrightened VBN -2\tfrightening JJ -3\tfrisky JJ 2\tfrom IN\tfrowning VBG -1\tfrustrate VB -2\tfrustrated VBN -2\tfrustrates VBZ -2\tfrustrating JJ -2\tfrustration NN -2\tfuck VB -2\tfulfill VB 2\tfulfilled VBN 2\tfulfills VBZ 2\tfull JJ\tfuming VBG -2\tfun NN 4\tfunctional JJ\tfundamental JJ\tfuneral NN -1\tfunky JJ 2\tfunnier JJR 4\tfunny JJ 4\tfurious JJ -3\tfurther JJ\tfurthermore RB\tfutile JJ 2\tfy VBP\tgag NN -2\tgagged VBN -2\tgain NN 2\tgained VBD 2\tgaining VBG 2\tgallant JJ 3\tgallantry NN 3\tgay JJ\tgeneral JJ\tgeneric JJ\tgenerous JJ 2\tgenial JJ 3\tgentle JJ\tgenuine JJ\tgeographic JJ\tghost NN -1\tgiddy JJ -2\tgift NN 2\tglad JJ 3\tglamorous JJ 3\tglee NN 3\tgleeful JJ 3\tglobal JJ\tgloom NN -1\tgloomy JJ -2\tglorious JJ 2\tglory NN 2\tglum JJ -2\tgod NN 1\tgoddamn UH -3\tgodsend NN 4\tgolden JJ\tgone VBN\tgood JJ 3\tgoodness NN 3\tgore VB\tgothic JJ\tgotta VB\tgotten VBN\tgovernmental JJ\tgrace NN 1\tgracious JJ 3\tgrand JJ 3\tgrant NN 1\tgranted VBN 1\tgranting VBG 1\tgraphic JJ\tgrateful JJ 3\tgratification NN 2\tgratis JJ\tgrave JJ -2\tgray JJ -1\tgreat JJ 3\tgreater JJR 3\tgreatest JJS 3\tgreed NN -3\tgreedy JJ -2\tgreen JJ\tgreet VB 1\tgreeted VBD 1\tgreeting NN 1\tgreets VBZ 1\tgrey JJ -1\tgrief NN -2\tgrieved VBN -2\tgrin NN -1\tgrinning VBG 3\tgross JJ -2\tgrowing VBG 1\tgrowth NN 2\tguarantee NN 1\tguess VBP\tguilt NN -3\tguilty JJ -3\tgullibility NN -2\tgullible JJ -2\tgun NN -1\tha UH 2\thacked VBD -1\thail NN 2\thailed VBD 2\thairy JJ\thandheld JJ\thandmade JJ\thandy JJ\thapless JJ -2\thappiness NN 3\thappy JJ 3\thard JJ -1\thardcore JJ\tharder JJR\thardier JJR 2\thardship NN -2\thardy JJ 2\tharm NN -2\tharmed VBN -2\tharmful JJ -2\tharming VBG -2\tharms VBZ -2\tharried VBN -2\tharry VB\tharsh JJ -2\tharsher JJR -2\tharshest JJS -2\thate VBP -3\thated VBD -3\thates VBZ -3\thating VBG -3\thaunt VB -1\thaunted VBN -2\thaunting JJ 1\thavoc NN -2\the PRP\thealthy JJ 2\theartbreaking JJ -3\theartfelt JJ 3\theaven NN 2\theavenly JJ 4\theavy JJ\thell NN -4\thello UH\thelp VB 0\thelpful JJ 2\thelping VBG 2\thelpless JJ -2\thelps VBZ 2\thence RB\ther PRP$\therald VB\therbal JJ\there RB\thereby RB\therein RB\thero NN 2\theroic JJ 3\therself PRP\thesitant JJ -2\thesitate VB -2\they UH\thid VBD -1\thide VB -1\thiding VBG -1\thigh JJ\thigher JJR\thighest JJS\thighlight VB 2\thilarious JJ 2\thim PRP\thimself PRP\thindrance NN -2\thire VB\this PRP$\thistoric JJ\tho UH\thollow JJ\tholy JJ\thomesick JJ -2\thonest JJ 2\thonor NN 2\thonored VBN 2\thonoring VBG 2\thonour NN 2\thonoured VBN 2\thooliganism NN -2\thope NN 2\thopeful JJ 2\thopefully RB 2\thopeless JJ -2\thopelessness NN -2\thopes VBZ 2\thoping VBG 2\thorizontal JJ\thorrendous JJ -3\thorrible JJ -3\thorrific JJ -3\thorrified VBN -3\thostile JJ -2\thot JJ\thottest JJS\thourly JJ\thow WRB\thowever RB\thuckster NN -2\thug NN 2\thuge JJ 1\thugh JJ\thuman JJ\thumanitarian JJ\thumiliated VBN -3\thumiliation NN -3\thumor NN 2\thumorous JJ 2\thumour NN 2\thunger NN -2\thungry JJ\thurrah NN 5\thurt VBN -2\thurting VBG -2\thurts VBZ -2\thushed JJ -1\thydraulic JJ\thypocritical JJ -2\thysteria NN -3\thysterical JJ -3\tideal JJ\tidiot JJ -3\tidiotic JJ -3\tidle JJ\tif IN\tignorance NN -2\tignorant JJ -2\tignore VB -1\tignored VBN -2\tignores VBZ -1\till JJ -2\tillegal JJ -3\tilliteracy NN -2\tillness NN -2\timbecile NN -3\timmediate JJ\timmobilized VBN -1\timmortal JJ 2\timmune JJ 1\timpatient JJ -2\timperfect JJ -2\timplement VB\timportance NN 2\timportant JJ 2\timpose VB -1\timposed VBN -1\timposes VBZ -1\timposing VBG -1\timpotent JJ -2\timpress VB 3\timpressed VBN 3\timpresses VBZ 3\timpressive JJ 3\timprisoned VBN -2\timprove VB 2\timproved VBN 2\timprovement NN 2\timproves VBZ 2\timproving VBG 2\tin IN\tinability NN -2\tinaction NN -2\tinadequate JJ -2\tinappropriate JJ\tincapable JJ -2\tincapacitated VBN -2\tincensed VBN -2\tinclude VBP\tincoming JJ\tincompetence NN -2\tincompetent JJ -2\tincomplete JJ\tinconvenience NN -2\tinconvenient JJ -2\tincorrect JJ\tincrease NN 1\tincreased VBN 1\tindecisive JJ -2\tindependent JJ\tindestructible JJ 2\tindicate VB\tindifference NN -2\tindifferent JJ -2\tindignant JJ -2\tindignation NN -2\tindirect JJ\tindividual JJ\tindoctrinated VBN -2\tindoctrinating NN -2\tindoor JJ\tineffective JJ -2\tineffectively RB -2\tinfatuation NN 2\tinfected VBN -2\tinferior JJ -2\tinfinite JJ\tinflamed JJ -2\tinfluential JJ 2\tinformal JJ\tinformational JJ\tinfrared JJ\tinfringement NN -2\tinfuriate VB -2\tinfuriated VBD -2\tinfuriating JJ -2\tinhibit VB -1\tinjured VBN -2\tinjury NN -2\tinjustice NN -2\tinner JJ\tinnocent JJ 4\tinnovate VB 1\tinnovation NN 1\tinnovative JJ 2\tinquire VB\tinquisitive JJ 2\tinsane JJ -2\tinsanity NN -2\tinsecure JJ -2\tinsensitive JJ -2\tinsensitivity NN -2\tinsert VB\tinside IN\tinsignificant JJ -2\tinsipid JJ -2\tinspiration NN 2\tinspirational JJ 2\tinspire VB 2\tinspired VBN 2\tinspires VBZ 2\tinspiring JJ 3\tinstall VB\tinstead RB\tinstitutional JJ\tinstructional JJ\tinstrumental JJ\tinsult NN -2\tinsulted VBN -2\tinsulting JJ -2\tintact JJ 2\tintegrity NN 2\tintellectual JJ\tintelligent JJ 2\tintend VBP\tintense JJ 1\tinter FW\tinteract VBP\tinterest NN 1\tinterested JJ 2\tinteresting JJ 2\tinterim JJ\tinterior JJ\tintermediate JJ\tinternal JJ\tinternational JJ\tinterrogated VBN -2\tinterrupt VB -2\tinterrupted VBN -2\tinterrupting VBG -2\tinterruption NN -2\tinterrupts VBZ -2\tinterstate JJ\tintimate JJ\tintimidate VB -2\tintimidated VBN -2\tintimidates VBZ -2\tintimidating VBG -2\tintimidation NN -2\tinto IN\tintricate JJ 2\tintroductory JJ\tinvalid JJ\tinvest VB\tinvestigate VB\tinvincible JJ 2\tinvite VB 1\tinviting VBG 1\tinvolve VB\tinvulnerable JJ 2\tirate JJ -3\tironic JJ -1\tirony NN -1\tirrational JJ -1\tirresistible JJ 2\tirresolute JJ -2\tirresponsible JJ 2\tirreversible JJ -1\tirritate VB -3\tirritated VBN -3\tirritating JJ -3\tisolated VBN -1\tist FW\tit PRP\titchy JJ -2\tits PRP$\titself PRP\tjack VB\tjackass NN -4\tjailed VBN -2\tjaunty JJ 2\tje FW\tjealous JJ -2\tjeopardy NN -2\tjerk NN -3\tjewel NN 1\tjocular JJ 2\tjoin VB 1\tjoint JJ\tjoke NN 2\tjolly JJ 2\tjovial JJ 2\tjoy NN 3\tjoyful JJ 3\tjoyfully RB 3\tjoyless JJ -2\tjoyous JJ 3\tjubilant JJ 3\tjumpy JJ -1\tjunior JJ\tjustice NN 2\tjustifiably RB 2\tjustified VBN 2\tjuvenile JJ\tkaraoke FW\tkeen JJ 1\tkeno JJ\tkey JJ\tkill VB -3\tkilled VBN -3\tkilling VBG -3\tkills VBZ -3\tkind NN JJ/2\tkinda RB\tkinder JJR 2\tkiss NN 2\tkissing VBG 3\tla FW\tlack NN -2\tlackadaisical JJ -2\tladen JJ\tlag VB -1\tlagged VBN -2\tlagging VBG -2\tlags VBZ -2\tlame JJ -2\tlandmark NN 2\tlarge JJ\tlarger JJR\tlargest JJS\tlate JJ\tlater RB\tlaugh NN 1\tlaughed VBD 1\tlaughing VBG 1\tlaughs VBZ 1\tlaunched VBN 1\tlawsuit NN -2\tlazy JJ -1\tle FW\tleak NN -1\tleaked VBN -1\tlean JJ\tleast JJS\tleave VB -1\tlegal JJ 1\tlegally RB 1\tlegendary JJ\tlegitimate JJ\tlenient JJ 1\tles FW\tless JJR\tlesser JJR\tlethargic JJ -2\tlethargy NN -2\tliar NN -3\tlibelous JJ -2\tliberal JJ\tlied VBD -2\tlift VB\tlighter JJR\tlighthearted JJ 1\tlightweight JJ\tlike VBP 2\tliked VBD 2\tlikely JJ\tlikes VBZ 2\tlimitation NN -1\tlimited JJ -1\tlinear JJ\tliquid JJ\tliterary JJ\tlitigation NN -1\tlitigious JJ -2\tlittle JJ\tlively JJ 2\tlivid JJ -2\tlo UH\tloathed VBD -3\tloathes VBZ -3\tloathing NN -3\tlobbying VBG -2\tlocal JJ\tlocate VB\tlocking JJ\tlone JJ\tlonely JJ -2\tlonesome JJ -2\tlong JJ\tlonger RB\tlongest JJS\tlonging NN -1\tloom VBP -1\tloomed VBD -1\tlooming VBG -1\tlooms VBZ -1\tloose JJ -3\tloser NN -3\tlosing VBG -3\tloss NN -3\tlost VBD -3\tloud JJ\tlovable JJ 3\tlove NN 3\tloved VBD 3\tlovely JJ 3\tloving JJ 2\tlow JJ -1\tlower JJR\tlowest JJS -1\tloyal JJ 3\tloyalty NN 3\tluck NN 3\tluckily RB 3\tlucky JJ 3\tlunatic JJ -3\tlurk VB -1\tlurking VBG -1\tlurks VBZ -1\tlyric JJ\tma FW\tmad JJ -3\tmaddening JJ -3\tmadly RB -3\tmadness NN -3\tmagnificent JJ\tmai MD\tmain JJ\tmaintain VB\tmajor JJ\tmale JJ\tmandatory JJ -1\tmanipulated VBN -1\tmanipulating VBG -1\tmanipulation NN -1\tmanual JJ\tmanufacture VB\tmany JJ\tmar VB\tmaritime JJ\tmarvel VB 3\tmarvelous JJ 3\tmask NN -1\tmasterpiece NN 4\tmatter NN 1\tmature JJ 2\tmaximum JJ\tmaybe RB\tme PRP\tmeaningful JJ 2\tmeaningless JJ -2\tmeanwhile RB\tmedal NN 3\tmedian JJ\tmedieval JJ\tmediocrity NN -3\tmeditative JJ 1\tmega JJ\tmelancholy NN -2\tmem FW\tmenace NN -2\tmenaced VBN -2\tmental JJ\tmention VB\tmercy NN 2\tmere JJ\tmerge VB\tmerry JJ 3\tmess NN -2\tmessed VBD -2\tmessing VBG -2\tmetallic JJ\tmethodical JJ 2\tmetric JJ\tmetropolitan JJ\tmh UH\tmicro JJ\tmid JJ\tmidwest JJS\tmight MD\tmighty JJ\tmild JJ\tmindless JJ -2\tminiature JJ\tminimal JJ\tminimum JJ\tminor JJ\tminus CC\tmiracle NN 4\tmirth NN 3\tmisbehaving VBG -2\tmischief NN -1\tmiserable JJ -3\tmisery NN -2\tmisinformation NN -2\tmisinformed VBN -2\tmisinterpreted VBN -2\tmisleading JJ -3\tmisread VBD -1\tmisrepresentation NN -2\tmiss VB -2\tmissed VBD -2\tmissing VBG -2\tmistake NN -2\tmistaken VBN -2\tmistaking VBG -2\tmisunderstand VB -2\tmisunderstanding NN -2\tmisunderstands VBZ -2\tmisunderstood VBN -2\tmoan VB -2\tmoaned VBD -2\tmoaning VBG -2\tmoans VBZ -2\tmobile JJ\tmock JJ -2\tmocked VBN -2\tmocking VBG -2\tmoderate JJ\tmodern JJ\tmon FW\tmonitor VB\tmono JJ\tmonopolize VB -2\tmonopolized VBD -2\tmonopolizing VBG -2\tmonthly JJ\tmoody JJ -1\tmoral JJ\tmore JJR\tmoreover RB\tmost RBS\tmotivate VB 1\tmotivated VBN 2\tmotivating VBG 2\tmotivation NN 1\tmount VB\tmourn VB -2\tmourned VBD -2\tmournful JJ -2\tmourning VBG -2\tmourns VBZ -2\tmuch JJ\tmultiple JJ\tmunicipal JJ\tmurder NN -2\tmurderer NN -2\tmurdering VBG -3\tmurderous JJ -3\tmust MD\tmutual JJ\tmy PRP$\tmyself PRP\tmyth NN -1\tna TO\tnaive JJ -2\tnaked JJ\tnarrow JJ\tnasty JJ -3\tnational JJ\tnationwide JJ\tnatural JJ 1\tnaughty JJ\tnaval JJ\tnavigate VB\tnd CC\tne FW\tnear IN\tnearby JJ\tnearest JJS\tnecessary JJ\tneedy JJ -2\tnegative JJ -2\tneglect NN -2\tneglected VBN -2\tneglecting VBG -2\tneglects VBZ -2\tneo JJ\tnervous JJ -2\tnervously RB -2\tnet JJ\tneural JJ\tneutral JJ\tnevertheless RB\tnew JJ\tnewer JJR\tnewest JJS\tnice JJ 3\tnifty JJ 2\tnigger NN -5\tnil JJ\tnoble JJ 2\tnoisy JJ -1\tnon FW\tnonprofit JJ\tnonsense NN -2\tnormal JJ\tnorth RB\tnorthern JJ\tnorthwest RB\tnotorious JJ -2\tnovel NN 2\tnow RB\tnowhere RB\tnuclear JJ\tnude JJ\tnudist JJ\tnull JJ\tnumb JJ -1\tnutritional JJ\to IN\tobliterate VB -2\tobliterated VBN -2\tobnoxious JJ -3\tobscene JJ -2\tobsessed VBN 2\tobsolete JJ -2\tobstacle NN -2\tobstinate JJ -2\toccasional JJ\toccupational JJ\todd JJ -2\tof IN\toff IN\toffend VB -2\toffended VBN -2\toffender NN -2\toffending VBG -2\toffends VBZ -2\toffset VB\toffshore JJ\toften RB\toh UH\tohhdee UH 1\toks VBZ 2\tol JJ\told JJ\tolder JJR\tominous JJ 3\ton IN\tonce RB\tongoing JJ\tonline JJ\tonto IN\toops UH\topen JJ\toperational JJ\topportunity NN 2\topposite JJ\toppressed JJ -2\toppressive JJ -2\topt VB\toptimal JJ\toptimism NN 2\toptimistic JJ 2\toptimum JJ\toptional JJ\tor CC\toral JJ\torange JJ\torganic JJ\torganizational JJ\toriental JJ\toriginal JJ\tother JJ\tought MD\tour PRP$\tours PRP\tourselves PRP\tout IN\toutcry NN -2\toutdoor JJ\toutdoors RB\touter JJ\toutmaneuvered VBN -2\toutrage NN -3\toutraged VBN -3\toutreach NN 2\toutside IN\toutstanding JJ 5\toval JJ\tover IN\toverall JJ\tovercome VB\toverhead JJ\toverjoyed JJ 4\toverload NN -1\toverlooked VBN -1\tovernight JJ\toverreact VB -2\toverreacted VBN -2\toverreaction NN -2\toverseas JJ\toversimplification NN -2\toversimplified VBN -2\toverstatement NN -2\toverweight JJ -1\town JJ\tpacific JJ\tpain NN -2\tpained JJ -2\tpale JJ\tpanic NN -3\tpanicked VBD -3\tparadise NN 3\tparadox NN -1\tparallel JJ\tpardon VB 2\tpardoned VBN 2\tparental JJ\tparley NN -1\tparticipate VB\tpas FW\tpassionate JJ 2\tpassive JJ -1\tpassively RB -1\tpast JJ\tpat JJ\tpathetic JJ -2\tpay VB -1\tpeace NN 2\tpeaceful JJ 2\tpeacefully RB 2\tpediatric JJ\tpenalty NN -2\tper IN\tperfect JJ 3\tperfected VBN 2\tperfectly RB 3\tperhaps RB\tperil NN -2\tperiodic JJ\tperipheral JJ\tperjury NN -3\tpermanent JJ\tperpetrator NN -2\tperplexed JJ -2\tpersecute VBP -2\tpersecuted VBN -2\tpersecuting VBG -2\tpersevere VB -2\tpersistent JJ\tpersonal JJ\tperturbed JJ -2\tpessimism NN -2\tpessimistic JJ -2\tpeter VB\tpetite JJ\tpetrified JJ -2\tphantom JJ\tphotographic JJ\tpicturesque JJ 2\tpierce VB\tpileup NN -1\tpink JJ\tpique JJ -2\tpiqued VBN -2\tpiss VB -4\tpiteous JJ -2\tpitied VBD -1\tpity NN -2\tplain JJ\tplayful JJ 2\tpleasant JJ 3\tplease VB 1\tpleased VBN 3\tpleasure NN 3\tplus CC\tpoised VBN -2\tpoison NN -2\tpoisoned VBN -2\tpolar JJ\tpollute VB -2\tpolluted JJ -2\tpolluter NN -2\tpoor JJ -2\tpoorer JJR -2\tpoorest JJS -2\tpopular JJ 3\tpose VB\tpositive JJ 2\tpositively RB 2\tpossess VBP\tpossessive JJ -2\tpostal JJ\tpostpone VB -1\tpostponed VBN -1\tpostponing VBG -1\tpoverty NN -1\tpowerful JJ 2\tpowerless JJ -2\tpraise NN 3\tpraised VBD 3\tpraises VBZ 3\tpraising VBG 3\tpray VB 1\tpraying VBG 1\tprays VBZ 1\tprecise JJ\tpredict VBP\tprefer VBP\tpreferred JJ\tpregnant JJ\tprep JJ\tprepaid JJ\tprepared VBN 1\tpresent JJ\tpressure NN -1\tpressured VBN -2\tpretend VB -1\tpretending VBG -1\tpretends VBZ -1\tpretty RB 1\tprevent VB -1\tprevented VBN -1\tpreventing VBG -1\tprevents VBZ -1\tprick NN -5\tprimary JJ\tprime JJ\tprincipal JJ\tprior RB\tprison NN -2\tprisoner NN -2\tprivate JJ\tprivileged JJ 2\tpro FW\tproblem NN -2\tproceed VB\tprofessional JJ\tprogress NN 2\tprominent JJ 2\tpromise NN 1\tpromised VBD 1\tpromises VBZ 1\tpromising JJ\tpromote VB 1\tpromoted VBN 1\tpromotes VBZ 1\tpromoting VBG 1\tpromotional JJ\tprompt VB\tpropaganda NN -2\tproper JJ\tpropose VB\tprosecute VB -1\tprosecuted VBN -2\tprosecution NN -1\tprospect NN 1\tprosperous JJ 3\tprotect VB 1\tprotected VBN 1\tprotects VBZ 1\tprotest NN -2\tprotesting VBG -2\tproud JJ 2\tproudly RB 2\tproven VBN\tprovoke VB -1\tprovoked VBD -1\tprovokes VBZ -1\tprovoking VBG -1\tpublic JJ\tpublish VB\tpunish VB -2\tpunished VBN -2\tpunishes VBZ -2\tpunitive JJ -2\tpure JJ\tpurple JJ\tpursuant JJ\tpursue VB\tpushy JJ -1\tpuzzled VBN -2\tquaking VBG -2\tquarterly JJ\tque FW\tquestionable JJ -2\tquestioned VBD -1\tquestioning VBG -1\tqui FW\tquick JJ\tquiet JJ\tquite RB\tquote VB\tracism NN -3\tracist JJ -3\trage NN -2\trainy JJ -1\tram VB\trandom JJ\tranking JJ\trant VBP -3\trape NN -4\trapid JJ\trapist NN -4\trapture NN 2\trare JJ\trash NN -2\trather RB\tratified VBD 2\trational JJ\traw JJ\treach VB 1\treached VBN 1\treaches VBZ 1\treaching VBG 1\tready JJ\treal JJ\trear JJ\treassure VB 1\treassured VBN 1\treassuring VBG 2\trebellion NN -2\trecall VB\trecent JJ\trecession NN -2\trecipient JJ\treckless JJ -2\trecommend VB 2\trecommended VBD 2\trecommends VBZ 2\trecover VB\trecreational JJ\tred JJ\tredeem VB\tredeemed VBN 2\trefer VB\trefinance VB\trefine VB\trefined JJ\trefresh VBP\trefuse VB -2\trefused VBD -2\trefusing VBG -2\tregardless RB\tregional JJ\tregister VB\tregret VBP -2\tregrets VBZ -2\tregretted VBD -2\tregulatory JJ\treject VB -1\trejected VBD -1\trejecting VBG -1\trejects VBZ -1\trejoice VBP 4\trejoiced VBD 4\trejoices VBZ 4\trejoicing VBG 4\trelate VBP\trelaxed VBN 2\trelay VB\trelentless JJ -1\trelevant JJ\treliant JJ 2\trelieve VB 1\trelieved VBN 2\trelieves VBZ 1\trelieving VBG 2\trelishing VBG 2\tremarkable JJ 2\tremorse NN -2\tremote JJ\trender VB\trenew VB\trental JJ\trepresent VB\treprint VB\trepublican JJ\trepulsed VBN -2\trequire VB\trescue NN 2\trescued VBN 2\treseller JJR\tresentful JJ -2\tresign VB -1\tresigned VBD -1\tresigning VBG -1\tresigns VBZ -1\tresist VB\tresistant JJ\tresolute JJ 2\tresolve VB 2\tresolved VBN 2\tresolves VBZ 2\tresolving VBG 2\trespected VBN 2\trespiratory JJ\trespond VB\tresponsible JJ 2\tresponsive JJ 2\trestful JJ 2\trestless JJ -2\trestore VB 1\trestored VBN 1\trestores VBZ 1\trestoring VBG 1\trestrict VB -2\trestricted VBN -2\trestricting VBG -2\trestriction NN -2\trestricts VBZ -2\tresume VB\tretail JJ\tretain VB\tretained VBN -1\tretard VB -2\tretarded JJ -2\tretreat NN -1\tretrieve VB\tretro JJ\treveal VB\trevenge NN -2\trevered VBN 2\treverse VB\trevive VB 2\trevives VBZ 2\treward NN 2\trewarded VBN 2\trewarding JJ 2\trich JJ 2\trid JJ\tridiculous JJ -3\trig NN -1\trigged VBN -1\trigorous JJ 3\trigorously RB 3\triot NN -2\trip VB\tripe JJ\trisk NN -2\trob VB -2\trobber NN -2\trobed VBN -2\trobing NN -2\trobs VBZ -2\trobust JJ 2\trocky JJ\tromance NN 2\trouge FW\trough JJ\troutine JJ\troyal JJ\truin NN -2\truined VBN -2\truining VBG -2\trural JJ\tsabotage NN -2\tsacred JJ\tsad JJ -2\tsaddened JJ -2\tsadly RB -2\tsafe JJ 1\tsafely RB 1\tsafer JJR\tsafety NN 1\tsalient JJ 1\tsally VB\tsame JJ\tsandy JJ\tsap VB\tsappy JJ -1\tsarcastic JJ -2\tsatisfactory JJ\tsatisfied VBN 2\tsavage JJ\tsave VB 2\tsaved VBN 2\tscam NN -2\tscandal NN -3\tscandalous JJ -3\tscapegoat NN -2\tscare VB -2\tscared VBN -2\tscary JJ -2\tscenic JJ\tsceptical JJ -2\tscientific JJ\tscold VB -2\tscoop NN 3\tscorn NN -2\tscornful JJ -2\tscream VB -2\tscreamed VBD -2\tscreaming VBG -2\tscrew NN -2\tscrewed VBN -2\tse FW\tseasonal JJ\tsecondary JJ\tsecret JJ\tsecretary NN-\tsecure VB 2\tsecured VBN 2\tsedition NN -2\tseditious JJ -2\tseduced VBN -1\tseem VB\tselect VB\tselfish JJ -3\tselfishness NN -3\tsenior JJ\tsentence NN -2\tsentenced VBN -2\tsentencing NN -2\tseparate JJ\tserene JJ 2\tseventh JJ\tseveral JJ\tsevere JJ -2\tsexual JJ\tsexy JJ 3\tshaky JJ -2\tshall MD\tshame NN -2\tshamed VBN -2\tshameful JJ -2\tshare NN 1\tshared VBN 1\tsharp JJ\tshattered VBN -2\tshe PRP\tsheer JJ\tshit NN -4\tshock NN -2\tshocked VBN -2\tshocking JJ -2\tshoot VB -1\tshort JJ\tshortage NN -2\tshorter JJR\tshould MD\tshy JJ -1\tsic RB\tsick JJ -2\tsigh NN -2\tsignificance NN 1\tsignificant JJ 1\tsilencing VBG -1\tsilent JJ\tsilly JJ -1\tsimple JJ\tsimplified JJ\tsince IN\tsincere JJ 2\tsincerely RB 2\tsincerest JJS 2\tsincerity NN 2\tsinful JJ -3\tsingle JJ\tsixth JJ\tskeptic NN -2\tskeptical JJ -2\tskepticism NN -2\tskilled JJ\tsl UH\tslam NN -2\tslash VB -2\tslashed VBD -2\tslashing VBG -2\tslavery NN -3\tsleeping VBG 0\tsleeplessness NN -2\tsleepy JJ 0\tslick JJ 2\tslicker NN 2\tslight JJ\tslim JJ\tslow JJ\tsluggish JJ -2\tsmall JJ\tsmaller JJR\tsmallest JJS\tsmart JJ 1\tsmarter RBR 2\tsmartest JJS 2\tsmear NN -2\tsmile NN 2\tsmiled VBD 2\tsmiling VBG 2\tsmirk NN 3\tsmog NN -2\tsmooth JJ\tsnap VB\tsneaky JJ -1\tsnub VB -2\tso RB\tsob VB -4\tsobering VBG 1\tsoft JJ\tsolar JJ\tsole JJ\tsolemn JJ -1\tsolid JJ 2\tsolidarity NN 2\tsolution NN 1\tsolve VB 1\tsolved VBN 1\tsolves VBZ 1\tsolving VBG 1\tsomber JJ -2\tsome DT\tsomehow RB\tsomething NN-\tsometimes RB\tsomewhat RB\tsomewhere RB\tsonic JJ\tsoon RB\tsoonest JJS\tsoothe VB 3\tsoothed VBD 3\tsoothing VBG 3\tsophisticated JJ 2\tsore JJ -1\tsorrow NN -2\tsorrowful JJ -2\tsorry JJ- -1\tsouth RB\tsoutheast RB\tsouthern JJ\tsouthwest RB\tsoviet JJ\tspanking JJ\tspare JJ\tspark VB 1\tsparkle NN 3\tsparkles VBZ 3\tsparkling JJ 3\tspecialized JJ\tspecific JJ\tspeculative JJ -2\tspirit NN 1\tspirited JJ 2\tspiritless JJ -2\tspiritual JJ\tsplendid JJ 3\tsprightly JJ 2\tsq JJ\tsquelched VBN -1\tstab NN -2\tstabbed VBD -2\tstable JJ 2\tstall NN -2\tstalled VBN -2\tstalling VBG -2\tstamina NN 2\tstampede NN -2\tstandard JJ\tstartled VBN -2\tstarve VB -2\tstarved VBN -2\tstarving VBG -2\tstatewide JJ\tstatutory JJ\tsteadfast JJ 2\tsteady JJ\tsteal VB -2\tsteals VBZ -2\tsteep JJ -2\tstem VB\tstereotype NN -2\tstereotyped JJ -2\tsticky JJ\tstifled VBD -1\tstill RB\tstimulate VB 1\tstimulated VBN 1\tstimulates VBZ 1\tstimulating VBG 2\tstingy JJ -2\tstolen VBN -2\tstop VB -1\tstopped VBD -1\tstopping VBG -1\tstops VBZ -1\tstout JJ 2\tstraight JJ 1\tstrange JJ -1\tstrangely RB -1\tstrangled VBN -2\tstrength NN 2\tstrengthen VB 2\tstrengthened VBN 2\tstrengthening VBG 2\tstrengthens VBZ 2\tstressed VBD -2\tstricken VBN -2\tstrict JJ\tstrike NN -1\tstriking JJ\tstrong JJ 2\tstronger JJR 2\tstrongest JJS 2\tstruck VBD -1\tstructural JJ\tstruggle NN -2\tstruggled VBD -2\tstruggling VBG -2\tstubborn JJ -2\tstuck VBN -2\tstunned VBD -2\tstunning JJ 4\tstupid JJ -2\tstupidly RB -2\tsuave JJ 2\tsublime JJ\tsubmit VB\tsubscribe VB\tsubsequent JJ\tsubstantial JJ 1\tsubstantially RB 1\tsubtle JJ\tsuburban JJ\tsubversive JJ -2\tsuccess NN 2\tsuccessful JJ 3\tsuch JJ\tsuck VB -3\tsucks VBZ -3\tsudden JJ\tsue VB\tsuffer VB -2\tsuffering VBG -2\tsuffers VBZ -2\tsufficient JJ\tsuggest VBP\tsuicidal JJ -2\tsuicide NN -2\tsuing VBG -2\tsulking VBG -2\tsulky JJ -2\tsullen JJ -2\tsunglasses NN 1\tsunny JJ\tsunshine NN 2\tsuper JJ 3\tsuperb JJ 5\tsuperior JJ 2\tsupplemental JJ\tsupport NN 2\tsupported VBN 2\tsupporter NN 1\tsupporting VBG 1\tsupportive JJ 2\tsupports VBZ 2\tsuppose VBP\tsur FW\tsurprising JJ\tsurround VBP\tsurvive VB\tsurvived VBD 2\tsurviving VBG 2\tsurvivor NN 2\tsuspect VBP -1\tsuspected VBN -1\tsuspecting VBG -1\tsuspects VBZ -1\tsuspend VB -1\tsuspended VBN -1\tsuspicious JJ -2\tswear VB -2\tswearing NN -2\tswears VBZ -2\tsweat NN -1\tsweet JJ 2\tswift JJ 2\tswiftly RB 2\tswindling VBG -3\tsympathetic JJ 2\tsympathy NN 2\ttackle VB\ttalented JJ\ttall JJ\ttan JJ\tteen JJ\tteenage JJ\ttemporal JJ\ttemporary JJ\ttend VBP\ttender NN 2\ttense JJ -2\ttension NN -1\tterrible JJ -3\tterribly RB -3\tterrific JJ 4\tterrified VBN -3\tterror NN -3\tterrorist JJ\tterrorize VB -3\tterrorized VBN -3\tth DT\tthan IN\tthank VB 2\tthankful JJ 2\tthat IN\tthe DT\tthee PRP\ttheir PRP$\tthem PRP\tthemselves PRP\tthen RB\tthere EX\tthereafter RB\tthereby RB\ttherefore RB\tthereof RB\tthermal JJ\tthese DT\tthey PRP\tthick JJ\tthin JJ\tthis DT\tthorny JJ -2\tthorough JJ\tthose DT\tthou PRP\tthough IN\tthoughtful JJ 2\tthoughtless JJ -2\tthreat NN -2\tthreaten VB -2\tthreatened VBN -2\tthreatening VBG -2\tthreatens VBZ -2\tthrilled VBN 5\tthrough IN\tthroughout IN\tthus RB\tthwart VB -2\tthwarted VBN -2\tthwarting VBG -2\tthy JJ\ttight JJ\ttill IN\ttimely JJ\ttimid JJ -2\ttimorous JJ -2\ttiny JJ\ttired VBN -2\tto TO\ttogether RB\ttoken JJ\ttolerant JJ 2\ttonight RB\ttony JJ\ttoo RB\ttoothless JJ -2\ttop JJ 2\ttorn VBN -2\ttorture NN -4\ttortured VBN -4\ttotal JJ\ttotalitarian JJ -2\ttotalitarianism NN -2\ttough JJ\ttout VB -2\ttouted VBN -2\ttouting VBG -2\ttouts VBZ -2\ttoward IN\ttowards IN\ttoxic JJ\ttraditional JJ\ttragedy NN -2\ttragic JJ -2\ttranquil JJ 2\ttransform VB\ttransmit VB\ttransparent JJ\ttrap NN -1\ttrapped VBN -2\ttrauma NN -3\ttraumatic JJ -3\ttravesty NN -2\ttreason NN -3\ttreasonous JJ -3\ttreasure NN 2\ttrembling VBG -2\ttremulous JJ -2\ttribal JJ\ttricked VBN -2\ttrickery NN -2\ttrigger VB\ttrim VB\ttriple JJ\ttriumph NN 4\ttriumphant JJ 4\ttrouble NN -2\ttroubled JJ -2\ttrue JJ 2\ttrust NN 1\ttrusted VBN 2\ttumor NN -2\ttwice RB\ttwin JJ\tu PRP\tugh UH -1\tugly JJ -3\tuh UH\tultimate JJ\tultra JJ\tum FW\tun FW\tunacceptable JJ -2\tunamused VBN -2\tunappreciated JJ -2\tunapproved JJ -2\tunauthorized JJ\tunaware JJ -2\tunbelievable JJ -1\tunbelieving JJ -1\tunbiased JJ 2\tuncertain JJ -1\tunclear JJ -1\tuncomfortable JJ -2\tunconcerned JJ -2\tunconfirmed JJ -1\tunconvinced JJ -1\tund FW\tundecided JJ -1\tundefined JJ\tunder IN\tunderestimate VB -1\tunderestimated VBN -1\tunderestimates VBZ -1\tundergraduate JJ\tunderground JJ\tundermine VB -2\tundermined VBN -2\tundermines VBZ -2\tundermining VBG -2\tundesirable JJ -2\tundo VB\tune FW\tuneasy JJ -2\tunemployment NN -2\tunequal JJ -1\tunequaled JJ 2\tunethical JJ -2\tunexpected JJ\tunfair JJ -2\tunfocused JJ -2\tunfulfilled JJ -2\tunhappy JJ -2\tunhealthy JJ -2\tunified JJ 1\tunimpressed JJ -2\tunique JJ\tunited VBN 1\tuniversal JJ\tunjust JJ -2\tunknown JJ\tunless IN\tunlimited JJ\tunlovable JJ -2\tunmatched JJ 1\tunmotivated JJ -2\tunnecessary JJ\tunprofessional JJ -2\tunsatisfied JJ -2\tunsecured JJ -2\tunsettled JJ -1\tunsigned JJ\tunsophisticated JJ -2\tunstable JJ -2\tunstoppable JJ 2\tunsupported JJ -2\tunsure JJ -1\tuntarnished JJ 2\tuntil IN\tunto IN\tunusual JJ\tunwanted JJ -2\tunworthy JJ -2\tup IN\tupcoming JJ\tupdate VB\tupgrade VB\tupon IN\tupper JJ\tupset VBN -2\tupsetting VBG -2\tuptight JJ -2\turban JJ\turge VB\turgent JJ -1\tus PRP\tuseful JJ 2\tusefulness NN 2\tuseless JJ -2\tuselessness NN -2\tusual JJ\tvague JJ -2\tvalid JJ\tvalidate VB 1\tvalidated VBN 1\tvalidating VBG 1\tvary VBP\tvast JJ\tvegetarian JJ\tverbal JJ\tverdict NN -1\tversus IN\tvery RB\tvested VBN 1\tvexing JJ -2\tvia IN\tvibrant JJ 3\tvicious JJ -2\tvictim NN -3\tvictimize VBP -3\tvictimized VBN -3\tvictimizes VBZ -3\tvigilant JJ 3\tvile JJ -3\tvindicate VB 2\tvindicated VBN 2\tvintage JJ\tviolate VB -2\tviolated VBD -2\tviolates VBZ -2\tviolating VBG -2\tviolence NN -3\tviolent JJ -3\tviral JJ\tvirgin JJ\tvirtual JJ\tvirtuous JJ 2\tvirulent JJ -2\tvision NN 1\tvisionary JJ 3\tvisual JJ\tvital JJ\tvitality NN 3\tvitamin NN 1\tvitriolic JJ -3\tvivacious JJ 3\tvocal JJ\tvocational JJ\tvociferous JJ -1\tvulnerability NN -2\tvulnerable JJ -2\tw IN\twalkout NN -2\twan JJ\twanna VB\twant VBP 1\twar NN -2\twarfare NN -2\twarm JJ 1\twarmth NN 2\twarn VB -2\twarned VBD -2\twarning NN -3\twarns VBZ -2\twaste NN -1\twasted VBN -2\twasting VBG -2\twavering VBG -1\twe PRP\tweak JJ -2\tweakness NN -2\twealth NN 3\twealthy JJ 2\tweary JJ -2\tweekly JJ\tweep VB -2\tweeping VBG -2\tweighted JJ\tweird JJ -2\twelcome JJ 2\twelcomed VBD 2\twelcomes VBZ 2\twell RB\twestern JJ\twet JJ\twhat WP\twhatever WDT\twhen WRB\twhenever WRB\twhere WRB\twhereas IN\twherever WRB\twhether IN\twhich WDT\twhile IN\twhimsical JJ 1\twhite JJ\twhitewash NN -3\twho WP\twhole JJ\twholesale JJ\twhom WP\twhore NN -4\twhose WP$\twhy WRB\twicked JJ -2\twide JJ\twider JJR\twidespread JJ\twidowed VBN -1\twild JJ\twill MD\twilling JJ\twillingness NN 2\twin VB 4\twink NN 4\twinner NN 4\twinning VBG 4\twins VBZ 4\twise JJ\twish VBP 1\twishes VBZ 1\twishing VBG 1\twith IN\twithdrawal NN -3\twithin IN\twoebegone JJ -2\twoeful JJ -3\twon VBD 3\twonderful JJ 4\twoo VB 3\twooden JJ\tworldwide JJ\tworn VBN -1\tworried VBN -3\tworry VB -3\tworrying VBG -3\tworse JJR -3\tworsen VB -3\tworsened VBD -3\tworsening VBG -3\tworsens VBZ -3\tworshiped VBN 3\tworst JJS -3\tworth JJ 2\tworthless JJ -2\tworthy JJ 2\twould MD\twrathful JJ -3\twreck NN -2\twrong JJ -2\twronged VBN -2\tye PRP\tyeah UH 1\tyearly JJ\tyearning NN 1\tyellow JJ\tyet RB\tyield VB\tyo UH\tyoung JJ\tyounger JJR\tyour PRP$\tyours PRP\tyourself PRP\tyouthful JJ 2\tyummy JJ 3\tzealot NN -2\tzealous JJ 2\tzu FW\t{ (\t} )\t😠 EM -4\t😧 EM -4\t😲 EM 3\t😊 EM 3\t😰 EM -2\t😖 EM -2\t😕 EM -2\t😢 EM -2\t😿 EM -2\t😞 EM -2\t😥 EM -1\t😵 EM -1\t😑 EM 0\t😨 EM -2\t😳 EM -2\t😦 EM -1\t😬 EM -2\t😁 EM -1\t😀 EM 3\t😍 EM 4\t😻 EM 4\t😯 EM -1\t👿 EM -5\t😇 EM 4\t😂 EM 4\t😹 EM 4\t😗 EM 3\t😽 EM 3\t😚 EM 3\t😘 EM 4\t😙 EM 3\t😆 EM 1\t😷 EM -1\t😐 EM 0\t😶 EM 0\t😮 EM -2\t😔 EM -1\t😣 EM -2\t😾 EM -5\t😡 EM -5\t😌 EM 3\t😱 EM -4\t🙀 EM -4\t😴 EM 0\t😪 EM 0\t😄 EM 3\t😸 EM 3\t😃 EM 3\t😺 EM 3\t😈 EM -4\t😏 EM 3\t😼 EM 3\t😭 EM -4\t😛 EM 1\t😝 EM 0\t😜 EM -1\t😎 EM 1\t😓 EM -1\t😅 EM 3\t😫 EM -2\t😤 EM 5\t😒 EM -2\t😩 EM -2\t😉 EM 4\t😟 EM -4\t😋 EM 4\t>( EM -4\t>[ EM -4\t>-( EM -4\t>-[ EM -4\t>=( EM -4\t>=[ EM -4\t>=-( EM -4\t>=-[ EM -4\t\\) EM 3\t\\] EM 3\t-\\) EM 3\t-\\] EM 3\t=\\) EM 3\t=\\] EM 3\t=-\\) EM 3\t=-\\] EM 3\t\\\\ EM -2\t-/ EM -2\t-\\\\ EM -2\t=/ EM -2\t=\\\\ EM -2\t=-/ EM -2\t=-\\\\ EM -2\t-( EM -2\t-[ EM -2\t-| EM -2\t'( EM -2\t'[ EM -2\t'| EM -2\t'-( EM -2\t'-[ EM -2\t'-| EM -2\t=( EM -2\t=[ EM -2\t=| EM -2\t=-( EM -2\t=-[ EM -2\t=-| EM -2\t='( EM -2\t='[ EM -2\t='| EM -2\t='-( EM -2\t='-[ EM -2\t='-| EM -2\t-( EM\t-[ EM\t=( EM\t=[ EM\t=-( EM\t=-[ EM\t]( EM -5\t][ EM -5\t]-( EM -5\t]-[ EM -5\t]=( EM -5\t]=[ EM -5\t]=-( EM -5\t]=-[ EM -5\to) EM 4\to] EM 4\to-) EM 4\to-] EM 4\to=) EM 4\to=] EM 4\to=-) EM 4\to=-] EM 4\t0) EM 4\t0] EM 4\t0-) EM 4\t0-] EM 4\t0=) EM 4\t0=] EM 4\t0=-) EM 4\t0=-] EM 4\t-) EM 4\t-] EM 4\t') EM 4\t'] EM 4\t'-) EM 4\t'-] EM 4\t=) EM 4\t=] EM 4\t=-) EM 4\t=-] EM 4\t=') EM 4\t='] EM 4\t='-) EM 4\t='-] EM 4\t-* EM 3\t=* EM 3\t=-* EM 3\tx) EM 1\tx] EM 1\tx-) EM 1\tx-] EM 1\t-| EM\t=| EM\t=-| EM\t-o EM -2\t-0 EM -2\t=o EM -2\t=0 EM -2\t=-o EM -2\t=-0 EM -2\t-@ EM -5\t=@ EM -5\t=-@ EM -5\t-) EM\t-] EM\t=) EM\t=] EM\t=-) EM\t=-] EM\t]) EM -4\t]] EM -4\t]-) EM -4\t]-] EM -4\t]=) EM -4\t]=] EM -4\t]=-) EM -4\t]=-] EM -4\t'( EM\t'[ EM\t'-( EM\t'-[ EM\t'( EM\t'[ EM\t'-( EM\t'-[ EM\t='( EM\t='[ EM\t='-( EM\t='-[ EM\t='( EM\t='[ EM\t='-( EM\t='-[ EM\t-p EM 1\t-d EM 1\t=p EM 1\t=d EM 1\t=-p EM 1\t=-d EM 1\tx-p EM 0\tx-d EM 0\t;p EM -1\t;d EM -1\t;-p EM -1\t;-d EM -1\t8) EM 1\t8] EM 1\t8-) EM 1\t8-] EM 1\t-( EM\t-[ EM\t=( EM\t=[ EM\t=-( EM\t=-[ EM\t'( EM\t'[ EM\t'-( EM\t'-[ EM\t'=( EM -1\t'=[ EM -1\t'=-( EM -1\t'=-[ EM -1\t-) EM\t-] EM\t=) EM\t=] EM\t=-) EM\t=-] EM\t') EM\t'] EM\t'-) EM\t'-] EM\t'=) EM 3\t'=] EM 3\t'=-) EM 3\t'=-] EM 3\t-$ EM -2\t-s EM -2\t-z EM -2\t=$ EM -2\t=s EM -2\t=z EM -2\t=-$ EM -2\t=-s EM -2\t=-z EM -2\t:) EM 3\t:] EM 3\t:[ EM -3\t:( EM -3\t:| EM -1\t:/ EM -1\t:d EM 4\t:s EM 0\t:o EM -1\t:-) EM 3\t:-( EM -3\t:-| EM -1\t:-/ EM -1\t:-d EM 3\t:-p EM 3\t^^ EM 2\t;) EM 4\t;] EM 4\t;-) EM 4\t;-] EM 4\t<3 EM 3\twtf UH -4\tbrb UH 0\tbtw UH 0\tb4n UH 0\tbcnu UH 0\tbff UH 0\tcya UH 0\tdbeyr UH -1\tily UH 2\tlmao UH 2\tlol UH 3\tnp UH 0\toic UH 0\tomg UH 0\trotflmao UH 4\tstby UH -2\tswak UH 2\ttfh UH -2\trtm UH -1\trtfm UH -2\tttyl UH 0\ttyvm UH 2\twywh UH 2\txoxo UH 2\tgah UH -1\tyuck UH -2\tew UH -1\teww UH -2\tabductions - -2\tabhors - -3\tabsolves - 2\tacquits - 2\tacquitting - 2\tadmonish - -2\tagog - 2\tagonise - -3\tagonised - -3\tagonises - -3\tagonising - -3\talarmists - -2\tamazes - 2\tapeshit - -3\tapologise - -1\tapologised - -1\tapologises - -1\tapologising - -1\tappeases - 2\tashame - -2\tassfucking - -4\tasshole - -4\taxed - -1\tbadass - -3\tbamboozle - -2\tbamboozles - -2\tbankster - -3\tbenefitted - 2\tbenefitting - 2\tbereave - -2\tbereaved - -2\tbereaves - -2\tbereaving - -2\tblah - -2\tblesses - 2\tbummer - -2\tcalms - 2\tchagrined - -2\tcharmless - -3\tchastise - -3\tchastising - -3\tcheerless - -2\tchokes - -2\tclueless - -2\tcocksucker - -5\tcocksuckers - -5\tcollide - -1\tcollides - -1\tcolliding - -1\tcolluding - -3\tcombats - -1\tconciliated - 2\tconciliates - 2\tconciliating - 2\tconflictive - -2\tcongrats - 2\tconsolable - 2\tcontagions - -2\tcontestable - -2\tcontroversially - -2\tcrazier - -2\tcraziest - -2\tcunt - -5\tdaredevil - 2\tdegrades - -2\tdehumanizes - -2\tdehumanizing - -2\tdeject - -2\tdejected - -2\tdejecting - -2\tdejects - -2\tdenier - -2\tdeniers - -2\tderails - -2\tderides - -2\tderiding - -2\tdick - -4\tdickhead - -4\tdiffident - -2\tdipshit - -3\tdireful - -3\tdiscarding - -1\tdiscards - -1\tdisconsolate - -2\tdisconsolation - -2\tdisguising - -1\tdisparages - -2\tdisputing - -2\tdisregards - -2\tdisrespected - -2\tdistracts - -2\tdistrustful - -3\tdodgy - -2\tdolorous - -2\tdouche - -3\tdouchebag - -3\tdouchebaggery - -3\tdownhearted - -2\tdroopy - -2\tdumbass - -3\tdupe - -2\teery - -2\tembarrasses - -2\tenlightens - 2\tenrages - -2\tenraging - -2\tenrapture - 3\tenslaves - -2\tenthral - 3\tenvies - -1\tenvying - -1\teviction - -1\texaggerates - -2\texhilarates - 3\texonerates - 2\texpels - -2\texultant - 3\tfag - -3\tfaggot - -3\tfaggots - -3\tfainthearted - -2\tfatiguing - -2\tfavorited - 2\tfidgety - -2\tfraudster - -4\tfraudsters - -4\tfraudulence - -4\tfrikin - -2\tftw - 3\tfucked - -4\tfucker - -4\tfuckers - -4\tfuckface - -4\tfuckhead - -4\tfucking - -2\tfucktard - -4\tfud - -3\tfuked - -4\tfuking - -4\tgallantly - 3\tglamourous - 3\tgreenwash - -3\tgreenwasher - -3\tgreenwashers - -3\tgreenwashing - -3\thaha - 3\thahaha - 3\thahahah - 3\thaplessness - -2\theartbroken - -3\theavyhearted - -2\thoax - -2\thonouring - 2\thooligan - -2\thooligans - -2\thumerous - 3\thumourous - 2\thysterics - -3\tinconsiderate - -2\tindoctrinate - -2\tindoctrinates - -2\tinfatuated - 2\tinfuriates - -2\tinnovates - 1\tinquisition - -2\tjackasses - -4\tjesus - 1\tlaughting - 1\tlawl - 3\tlifesaver - 4\tlmfao - 4\tloathe - -3\tlooses - -3\tlugubrious - -2\tmirthful - 3\tmirthfully - 3\tmisbehave - -2\tmisbehaved - -2\tmisbehaves - -2\tmischiefs - -1\tmisgiving - -2\tmisreporting - -2\tmocks - -2\tmongering - -2\tmonopolizes - -2\tmope - -1\tmoping - -1\tmoron - -3\tmotherfucker - -5\tmotherfucking - -5\tmumpish - -2\tn00b - -2\tnaïve - -2\tnegativity - -2\tniggas - -5\tnoob - -2\tnosey - -2\toffline - -1\toptionless - -2\toverreacts - -2\toversell - -2\toverselling - -2\toversells - -2\toversimplifies - -2\toversimplify - -2\toverstatements - -2\toxymoron - -1\tpardoning - 2\tpensive - -1\tperfects - 2\tpersecutes - -2\tpesky - -2\tphobic - -2\tpissed - -4\tpissing - -3\tpollutes - -2\tpostpones - -1\tprblm - -2\tprblms - -2\tproactive - 2\tprofiteer - -2\tprosecutes - -1\tpseudoscience - -3\trageful - -2\tranter - -3\tranters - -3\trants - -3\traptured - 2\trapturous - 4\treassures - 1\tregretful - -2\tregretting - -2\trepulse - -1\trevengeful - -2\trofl - 4\troflcopter - 4\trotfl - 4\trotflmfao - 4\trotflol - 4\tsadden - -2\tscumbag - -4\tsecures - 2\tshithead - -4\tshitty - -3\tshort-sighted - -2\tshort-sightedness - -2\tshrew - -4\tsingleminded - -2\tslickest - 2\tslut - -5\tspam - -2\tspammer - -3\tspammers - -3\tspamming - -2\tspiteful - -2\tstarves - -2\tstressor - -2\tswindle - -3\tswindles - -3\ttard - -2\tterrorizes - -3\tthwarts - -2\ttorturing - -4\ttwat - -5\tuncredited - -1\tunderestimating - -1\tundeserving - -2\tunemploy - -2\tunintelligent - -2\tunloved - -2\tunresearched - -2\tvalidates - 1\tvexation - -2\tvictimizing - -3\tvindicates - 2\tvindicating - 2\tvisioning - 1\twanker - -3\twinwin - 3\twoohoo - 3\twooo - 4\twoow - 4\twow - 4\twowow - 4\twowww - 4\tyeees - 2\tyucky - -2\tzealots - -2\t☺️ - 3\tcold_sweat - -2\tcrying_cat_face - -2\tdisappointed_relieved - -1\tdizzy_face - -1\tgrimacing - -2\theart_eyes - 4\theart_eyes_cat - 4\timp - -5\tjoy_cat - 4\tkissing_cat - 3\tkissing_closed_eyes - 3\tkissing_heart - 4\tkissing_smiling_eyes - 3\tneutral_face - 0\tno_mouth - 0\topen_mouth - -2\tpouting_cat - -5\tscream_cat - -4\tsmile_cat - 3\tsmiley - 3\tsmiley_cat - 3\tsmiling_imp - -4\tsmirk_cat - 3\tstuck_out_tongue - 1\tstuck_out_tongue_closed_eyes - 0\tstuck_out_tongue_winking_eye - -1\tsweat_smile - 3\ttired_face - -2\tyum - 4\t - undefined"
        ));
    })(),
    !(function () {
      var e = {
        '"': /(&quot;|\u201C|\u201D)/gi,
        "&": /&amp;/gi,
        "'": /(&#x27;|\u2018|\u2019)/gi,
        "<": /&lt;/gi,
        ">": /&gt;/gi,
        "`": /&#x60/gi,
        shit: /(s\&\^t|sh\*t)/gi,
        fuck: /(f\*ck)/gi,
        "just kidding": "j/k",
        without: /w\/[to]/g,
        with: "w/",
        " out of ": /\soutta\s/gi,
      };
      t.decode = function (t) {
        var i;
        for (i in e) e.hasOwnProperty(i) && (t = t.replace(e[i], i));
        return t;
      };
    })(),
    (function () {
      function t(t, e, i) {
        var n,
          s,
          r,
          a,
          o = "string" == typeof e,
          J = i.length - (o ? 1 : 2);
        for (J; J >= 0; J -= 1)
          (r = i[J]),
            o
              ? e === r.type && (r.type = t)
              : ((a = i[J + 1]),
                (n = e.indexOf(r.type)),
                (s = e.indexOf(a.tags[0])),
                n > -1 &&
                  s > -1 &&
                  n <= s &&
                  ((r.type = t), (r.to = a.to), (r.tags = r.tags.concat(a.tags)), i.splice(J + 1, 1)));
      }
      function i(e) {
        var i,
          n = d.length;
        for (i = 0; i < n; i += 1) t(d[i][0], d[i][1], e);
      }
      function n(t, e, i) {
        var n,
          s,
          r,
          a = N.length;
        for (n = 0; n < a; n += 1)
          if (((s = N[n][0]), (r = N[n][1]), !(N[n].length > 4 && i < N[n][4]) && s === t && r === e))
            return [N[n][2], N[n][3]];
        return -1;
      }
      function s(t, e) {
        var i, s, r, a;
        for (i = t.length - 2; i >= 0; i -= 1)
          if (((r = t[i]), (a = t[i + 1]), (s = n(r.type, a.type, e)), 0 === s[0]))
            r.right.push(a), t.splice(i + 1, 1), (a.label = s[1]);
          else if (1 === s[0]) {
            if ("NSUBJ" === s[1] && o("NSUBJ", a.left)) continue;
            a.left.push(r), t.splice(i, 1), (r.label = s[1]);
          }
      }
      function r(t, e, i) {
        var n = t[0],
          s = t.length;
        if ("VP" === n.type && !o("NSUBJ", n.left) && !o("NSUBJ", n.right)) {
          var r = o("DOBJ", t[0].right);
          r && (r.label = "NSUBJ");
        }
        2 === s && "PUNCT" === t[1].type && (n.right.push(t[1]), (t[1].label = "PUNCT"), t.splice(1, 1)), a(t, e, i);
      }
      function a(t, e, i) {
        var n,
          s,
          r,
          o,
          J = 0,
          l = t.length;
        for (J; J < l; J += 1) {
          for (n = t[J], r = "", o = "", s = n.from; s <= n.to; s += 1)
            (r += " " + i.tokens[s].raw), (o += " " + i.tokens[s].norm);
          (n.raw = r.slice(1)),
            (n.norm = o.slice(1)),
            a(n.left, e, i),
            a(n.right, e, i),
            n.left.sort(function (t, e) {
              return t.from - e.from;
            }),
            n.right.sort(function (t, e) {
              return t.from - e.from;
            });
        }
      }
      function o(t, e) {
        for (var i = 0, n = e.length; i < n; i += 1) if (e[i].label === t) return e[i];
        return null;
      }
      function J(t, e, i, n) {
        return {
          meta: {},
          left: [],
          right: [],
          tags: n || [t],
          from: e,
          to: i,
          raw: null,
          norm: null,
          type: t,
          is: null,
        };
      }
      e(l, {
        parse: function (t) {
          var e,
            n = t.tags,
            a = (J("ROOT"), t.length),
            o = 0,
            l = [];
          for (e = 0; e < a; e += 1) l[e] = J(n[e], e, e);
          for (i(l); o < 10 && l.length > 1; ) s(l, o), (o += 1);
          r(l, n, t), (t.root = l[0]), (t.root.label = "ROOT"), l.length > 1;
        },
        connect: function (t) {},
      });
      var d = [
          ["NP", ["NNP", "CD", "NNS"]],
          ["NP", ["DT", "PRP$", "JJ", "JJS", "$", "CD", "$", "NN", "NNS"]],
          ["NP", ["DT", "PRP$", "JJ", "JJS", "$", "CD", "$", "NNP", "NNPS"]],
          ["VP", ["MD", "VBP", "VB"]],
          ["VP", ["MD", "VBD"]],
          ["VP", ["VBZ", "VBG"]],
          ["NP", ["NNP", "NNPS"]],
          ["ADV", ["RB", "RB"]],
          ["ADJP", ["RB", "JJ"]],
          ["PP", "IN"],
          ["PRT", "RP"],
          ["NP", "PRP"],
          ["NP", "NNP"],
          ["NP", "NNPS"],
          ["NP", "NN"],
          ["NP", "DT"],
          ["ADJ", "JJ"],
          ["NP", "NNS"],
          ["VAUX", ["VB", "RB"]],
          ["VAUX", ["VBP", "RB"]],
          ["VP", "VBZ"],
          ["VP", "VBP"],
          ["VP", "VBD"],
          ["ADV", "WRB"],
          ["ADV", "RB"],
          ["PUNCT", "."],
          ["PUNCT", ","],
          ["SP", ["PP", "NP"]],
        ],
        N = [
          ["NP", "VP", 1, "NSUBJ"],
          ["VP", "NP", 0, "DOBJ"],
          ["VB", "NP", 0, "DOBJ"],
          ["PP", "NP", 0, "POBJ"],
          ["NP", "PP", 0, "PREP"],
          ["VP", "PP", 0, "PREP"],
          ["VB", "PP", 0, "PREP"],
          ["VP", "VP", 0, "CCOMP"],
          ["VP", "ADV", 0, "ADVMOD"],
          ["VB", "ADV", 0, "ADVMOD"],
          ["ADV", "PP", 0, "PREP"],
          ["PP", "VP", 1, "PREP"],
          ["VP", "ADJ", 0, "ACOMP"],
          ["VB", "ADJ", 0, "ACOMP"],
          ["VB", "VP", 1, "AUX"],
          ["VAUX", "VP", 1, "AUX"],
          ["VAUX", "VB", 1, "AUX"],
          ["VP", "PUNCT", 0, "PUNCT", 1],
          ["VB", "PUNCT", 0, "PUNCT", 1],
          ["PUNCT", "VP", 1, "PUNCT", 1],
          ["PUNCT", "VB", 1, "PUNCT", 1],
          ["ADV", "VP", 1, "ADVMOD", 2],
          ["ADV", "VB", 1, "ADVMOD", 2],
          ["ADV", "ADV", 1, "ADVMOD", 2],
        ];
    })(),
    !(function () {
      var t = [["VBZ", "VBP", "VBD", "VBG"], ["MD", "VB"], ["NNP", "NNPS", "NN", "NNS"], ["WP", "WRB"], ["UH"]],
        i = "unknown",
        n = [
          ["NNP", "NNP", "compound"],
          ["PRP", "VBZ", "subj"],
          ["PRP", "VBP", "subj"],
          ["PRP", "VBD", "subj"],
          ["DT", "VBZ", "subj"],
          ["DT", "VBP", "subj"],
          ["DT", "VBD", "subj"],
          ["WRB", "VBP", "attr"],
          ["WRB", "VBZ", "attr"],
          ["WRB", "VBD", "attr"],
          ["VBG", "VBP"],
          ["TO", "VB"],
          ["TO", "NN"],
          ["TO", "NNS"],
          ["DT", "NN", "det"],
          ["DT", "NNP", "det"],
          ["PRP$", "NN", "poss"],
          ["RB", "JJ", "advmod"],
          ["JJ", "NN", "amod"],
          ["JJ", "NNS", "amod"],
          ["JJ", "NNP", "amod"],
          ["VBG", "JJ"],
          ["NN", "VBZ", "subj"],
          ["NN", "VBP", "subj"],
          ["NN", "VBD", "subj"],
          ["NN", "VB", "subj"],
          ["NNP", "VBZ", "subj"],
          ["NNP", "VBP", "subj"],
          ["NNP", "VBD", "subj"],
          ["NNP", "VB", "subj"],
        ],
        s = [
          ["PRP", "VBZ", "obj"],
          ["PRP", "VBP", "obj"],
          ["PRP", "VBD", "obj"],
          ["NN", "IN", "obj"],
          ["IN", "VBZ"],
          ["IN", "VBP"],
          ["IN", "VBD"],
          ["IN", "VBG"],
          ["JJ", "VBD", "acomp"],
          ["JJ", "VBP", "acomp"],
          ["JJ", "VBZ", "acomp"],
          ["IN", "VB"],
          ["CC", "JJ"],
          ["NNP", "VB", "obj"],
          ["NN", "VB", "obj"],
          ["VB", "VB", "xcomp"],
        ],
        r = 20;
      e(J, {
        expand: function (t, e) {
          var a,
            o,
            J,
            l,
            d,
            N,
            u = t.length,
            c = n.length,
            p = 0,
            B = !1;
          for (a = 0; a < u - e; a++, p = 0)
            if (
              ((N = t.tokens[a]),
              "number" != typeof N.deps.master &&
                ((l = t.tokens[a + e]), N.deps.master !== l.deps.master && "number" == typeof l.deps.master))
            )
              for (
                ;
                (d = t.tokens[l.deps.master]) &&
                l !== d &&
                l.deps.master &&
                N.deps.master !== l.deps.master &&
                (p++, !(p > r));

              ) {
                for (J = N.pos, o = 0; o < c; o++)
                  if (J === n[o][0] && d.pos === n[o][1]) {
                    (N.deps.master = l.deps.master), (N.deps.type = n[o][2] || i), (B = !0);
                    break;
                  }
                if (B) break;
                l = d;
              }
          for (a = u - 1, c = s.length; a > e; a--)
            if (
              ((N = t.tokens[a]),
              "number" != typeof N.deps.master &&
                ((l = t.tokens[a - e]), "number" == typeof l.deps.master && N.deps.master !== l.deps.master))
            )
              for (d = t.tokens[l.deps.master], J = N.pos, o = 0; o < c; o++)
                if (J === s[o][0] && d.pos === s[o][1]) {
                  (N.deps.master = l.deps.master), (N.deps.type = s[o][2] || i), (B = !0);
                  break;
                }
          return B;
        },
        parse: function (e) {
          var a,
            o,
            J,
            l,
            d,
            N = e.length,
            u = n.length,
            c = 0,
            p = !0,
            B = null,
            g = null,
            V = 0,
            h = 0;
          if (1 === N) return (d = e.tokens[0]), (d.deps.governor = !0), void (e.governor = 0);
          for (a = 0; a < N - 1; a++)
            if (((d = e.tokens[a]), (l = e.tags[a + 1]), (J = d.pos), t[V].indexOf(J) > -1))
              null === B ? ((B = a), (g = a)) : (d.deps.master = B);
            else
              for (o = 0; o < u; o++)
                if (J === n[o][0] && l === n[o][1]) {
                  (d.deps.master = a + 1), (d.deps.type = n[o][2] || i);
                  break;
                }
          for (a = N - 1; a >= 0; a--)
            (d = e.tokens[a]),
              (l = e.tokens[a + 1]),
              a !== B &&
                ("compound" === d.deps.type || "det" === d.deps.type
                  ? (null !== B &&
                      B < a &&
                      "number" != typeof l.deps.master &&
                      ((l.deps.master = B), (l.deps.type = "obj")),
                    (h += 1),
                    h > 1 && (d.deps.master = l.deps.master))
                  : (h = 0));
          for (a = N - 1, u = s.length; a > 0; a--)
            if (((d = e.tokens[a]), "number" != typeof d.deps.master))
              for (l = e.tags[a - 1], J = d.pos, o = 0; o < u; o++)
                if (J === s[o][0] && l === s[o][1]) {
                  (d.deps.master = a - 1), (d.deps.type = s[o][2] || i);
                  break;
                }
          for (; p && c < r; ) {
            for (p = !1, a = 1; a < 5; a += 1) p = this.expand(e, a) || p;
            c += 1;
          }
          for (u = t.length - 1; null === B && V < u; )
            for (V++, a = 0; a < N; a++)
              if (t[V].indexOf(e.tags[a]) > -1) {
                B = a;
                break;
              }
          for (null !== B && ((e.governor = B), (e.tokens[B].deps.governor = !0)), this.reconnect(e), a = 0; a < N; a++)
            (d = e.tokens[a]),
              a !== B &&
                ((null !== d.deps.master && d.deps.master !== a) || (d.deps.master = B),
                null !== d.deps.master && e.tokens[d.deps.master].deps.dependencies.push(a),
                "subj" === d.deps.type ? e.deps.subjects.push(a) : "obj" === d.deps.type && e.deps.objects.push(a));
        },
        reconnect: function (t) {
          var e,
            n,
            r,
            a,
            o,
            J,
            l,
            d = t.length,
            N = s.length;
          for (e = d - 1; e >= 0; e--)
            if (((l = t.tokens[e]), l.deps.governor !== !0 && "number" != typeof l.deps.master)) {
              for (r = e, J = e; J === e && (r--, r !== -1); ) J = t.tokens[r].deps.master;
              if (r !== -1)
                for (o = t.tags[r], a = l.pos, n = 0; n < N; n++)
                  if (a === s[n][0] && o === s[n][1]) {
                    (l.deps.master = r), (l.deps.type = s[n][2] || i);
                    break;
                  }
            }
        },
      });
    })(),
    !(function () {
      var t = { t: [], s: [] },
        e = { t: [], s: [], p: [] },
        i = [];
      (o.init = function (t) {
        i.push(t);
      }),
        (o.context = function () {
          var t,
            e = {},
            n = i.length;
          for (t = 0; t < n; t += 1) i[t](e);
          return e;
        }),
        (o.before = function (e, i, n) {
          "function" == typeof i && ((n = i), (i = null)),
            t.hasOwnProperty(e) ? t[e].push({ id: i, cb: n }) : console.warn("No detector with type " + e);
        }),
        (o.add = function (t, e, i) {
          return (
            "function" == typeof e && ((i = e), (e = null)),
            console.warn("compendium.detectors.add is a deprecated function - please use compendium.detectors.after"),
            o.after(t, i)
          );
        }),
        (o.after = function (t, i, n) {
          "function" == typeof i && ((n = i), (i = null)),
            e.hasOwnProperty(t) ? e[t].push({ id: i, cb: n }) : console.warn("No detector with type " + t);
        }),
        (o.apply = function (i, n, s) {
          var r,
            a,
            o,
            J = Array.prototype.slice.call(arguments).slice(3),
            l = n ? t : e;
          if (((s = s || []), l.hasOwnProperty(i)))
            for (r = 0, a = l[i].length; r < a; r++) (o = l[i][r]), s.indexOf(o.id) === -1 && o.cb.apply(null, J);
        });
    })(),
    !(function () {
      var t = function (t, e) {
          if (e >= t.length) return !1;
          var i = t.tags[e + 1];
          return "NNP" === i || "NNPS" == i;
        },
        e = function (t, e) {
          return "&" === t || "TO" === t || ("CC" === t && "or" !== e);
        };
      o.before("s", "entities", function (i, n, s) {
        var a,
          o,
          J,
          l,
          d,
          N,
          u = i.length,
          c = i.stats;
        if (!(c.p_upper > 75 || c.p_cap > 85))
          for (a = 0; a < u; a++)
            (o = i.tags[a]),
              (J = i.tokens[a]),
              (l = J.norm),
              J.attr.entity > -1
                ? (N = null)
                : "NN" === o
                ? (N = null)
                : "NNP" === o || "NNPS" === o || (N && e(o, l) && t(i, a))
                ? N
                  ? ((N.raw += " " + J.raw), (N.norm += " " + J.norm), (N.toIndex = a), (J.attr.entity = d))
                  : ((N = r.entity(J, a)), (d = J.attr.entity = i.entities.push(N) - 1))
                : (N = null);
      });
    })(),
    !(function () {
      var t = Object.keys(n.neg).concat(Object.keys(n.refusal)),
        e = Object.keys(n.neg_neg),
        i = [["but", "to"]];
      o.after("s", "negation", function (n, s, r) {
        var a,
          o,
          J,
          l,
          d,
          N = n.length,
          u = i.length,
          c = !1,
          p = 0,
          B = 0;
        for (a = 0; a < N; a++) {
          if (((d = n.tokens[a]), (l = n.tokens[a + 1]), d.profile.breakpoint || d.attr.is_punc)) (p = 0), (c = !1);
          else if (t.indexOf(d.norm) > -1)
            c
              ? (c = !1)
              : ((J = n.tokens[a - 1]),
                "RB" === d.pos && J && (J.attr.is_verb || "MD" === J.pos) && (J.profile.negated = !0),
                B++,
                (c = !0));
          else if (c && e.indexOf(d.norm) > -1 && 0 === p) (n.tokens[a - 1].profile.negated = !1), B--, (c = !1);
          else if (c) {
            for (o = 0; o < u && a < N - 1; o += 1)
              if (d.norm === i[o][0] && l.norm === i[o][1]) {
                c = !1;
                break;
              }
            c && (B++, p++);
          }
          d.profile.negated = c;
        }
        n.profile.negated = B > 0;
      });
    })(),
    !(function () {
      var t = ["WP", "WP$", "WRB"];
      o.after("s", "type", function (e, i) {
        var n,
          s,
          r,
          a,
          o = e.length,
          J = e.stats,
          l = e.governor,
          d = e.profile.types,
          N = e.tokens[0],
          u = e.tokens[o - 1];
        if (
          (o > 2 && ((J.p_foreign >= 10 && J.confidence < 0.5) || J.confidence <= 0.35) && d.push(p),
          J.p_cap > 75 && J.p_upper < 50 && o > 10 && d.push(V),
          "!" === u.norm)
        )
          d.push(g);
        else if ("?" === u.norm || (t.indexOf(N.pos) > -1 && 0 === J.breakpoints)) d.push(B);
        else if (l > -1)
          if (((n = e.tags[l]), t.indexOf(n) > -1)) d.push(B);
          else if ("." !== u.pos && 0 === n.indexOf("VB"))
            if (
              ("PRP" === e.tags[l + 1] && 0 === (e.tags[l + 2] || "").indexOf("VB") && d.push(B),
              l > 1 && "PRP" === e.tags[l - 1] && 0 === e.tags[l - 2].indexOf("VB"))
            )
              d.push(B);
            else if ("PRP" === e.tags[l - 1] && "MD" === e.tags[l - 2]) d.push(B);
            else
              for (s = e.tokens[l].deps.dependencies, r = 0, a = s.length; r < a; r++)
                t.indexOf(e.tags[s[r]]) > -1 && (e.tags[s[r] - 1] || "").indexOf("VB") < 0 && d.push(B);
        l > -1 && d.indexOf(B) === -1 && "VB" === e.tags[l] && d.push(h);
      });
    })(),
    !(function () {
      var t = n.dirty,
        e = n.polite,
        i = n.emphasis,
        s = ["wo", "'ll", "will"],
        r = function (t, e) {
          var i,
            n,
            s = e.deps.dependencies,
            a = s.length,
            o = 0;
          if (0 !== a) {
            for (i = 0; i < a; i += 1) (n = t.tokens[s[i]]), r(t, n), (o += n.profile.sentiment);
            e.profile.sentiment += parseInt((o / a) * 100) / 100;
          }
        };
      o.after("s", "sentiment", function (n, a, o) {
        var J,
          l,
          d,
          N,
          u,
          p,
          g,
          V = n.length,
          h = 0,
          f = 1,
          m = 0,
          b = 0,
          v = 0,
          y = 0,
          w = 0,
          k = 0,
          P = 0,
          R = n.governor,
          M = n.profile;
        for (J = 0; J < V; J++)
          (l = n.tokens[J].profile),
            (N = n.tokens[J].pos),
            (u = n.tokens[J].norm),
            (g = t.indexOf(u) > -1),
            (p = e.indexOf(u) > -1),
            g ? w++ : p && y++,
            l.negated &&
              "." !== N &&
              "EM" !== N &&
              (g ? (l.sentiment = l.sentiment / 2) : (l.sentiment = -l.sentiment / 2));
        for (
          R > -1 &&
            ((d = n.tokens[R]),
            r(n, d),
            (N = d.pos),
            d.attr.is_verb
              ? (M.main_tense = "VBD" === N ? "past" : "present")
              : "MD" === N && s.indexOf(d.norm) > -1 && (M.main_tense = "future")),
            n.stats.p_upper > 70 && (f = 1.2),
            J = 0;
          J < V;
          J++
        )
          (l = n.tokens[J].profile),
            (N = n.tokens[J].pos),
            (u = n.tokens[J].norm),
            (f *= l.emphasis),
            ("JJS" === N || ("RB" === N && i.indexOf(u) > -1)) && (v += l.negated ? 2 : 5),
            (m = l.sentiment * (1 + v / 10)),
            (h += m),
            m > P ? (P = m) : m < k && (k = m),
            (l.emphasis *= 1 + v / 10),
            v > 0 && ["DT", "POS", "IN"].indexOf(N) === -1 && v--;
        V < 5 ? (V *= 2) : V > 10 && (V /= 2),
          (b = (P + -k) / V),
          (h *= f),
          (h /= V),
          M.types.indexOf(B) > -1 && (h /= 2),
          (M.sentiment = h),
          (M.emphasis = f),
          (M.amplitude = b),
          (M.dirtiness = w / V),
          (M.politeness = y / V),
          Math.abs(b) > 0.5 && Math.abs(h) < 0.5 && Math.abs(b) > Math.abs(h)
            ? (M.label = "mixed")
            : h <= c.profile.negative_threshold
            ? (M.label = "negative")
            : h >= c.profile.positive_threshold
            ? (M.label = "positive")
            : b >= c.profile.amplitude_threshold && (M.label = "mixed");
      });
    })(),
    !(function () {
      var t = Object.keys(n.approval),
        e = Object.keys(n.refusal);
      o.after("s", "type", function (i, s) {
        var r,
          a,
          o,
          J = i.tokens[0],
          l = i.profile,
          d = i.governor > -1 ? i.tokens[i.governor] : null,
          N = d ? d.deps.dependencies : null,
          u = i.stats.words,
          c = l.types;
        if (!(c.indexOf(B) > -1)) {
          if (e.indexOf(J.norm) > -1) c.push(m);
          else if (1 === u && "JJ" === J.pos && l.sentiment < 0) c.push(m);
          else if (d)
            if (e.indexOf(d.norm) > -1) c.push(m);
            else if (c.indexOf(h) > -1 && n.approval_verbs.indexOf(d.norm) > -1 && d.profile.negated) c.push(m);
            else if ("UH" === d.pos)
              for (a = 0, o = N.length; a < o; a += 1)
                (r = i.tokens[N[a]]), ("UH" === r.pos || "RB" === r.pos) && e.indexOf(r.norm) > -1 && c.push(m);
          if (!(c.indexOf(m) > -1))
            if (t.indexOf(J.norm) > -1) c.push(f);
            else if (1 === u && "JJ" === J.pos && l.sentiment > 0) c.push(f);
            else if (d && u <= 3)
              if (t.indexOf(d.norm) > -1) c.push(f);
              else if (c.indexOf(h) > -1 && n.approval_verbs.indexOf(d.norm) > -1) c.push(f);
              else if ("UH" === d.pos)
                for (a = 0; a < o; a += 1) (r = i.tokens[N[a]]), "UH" === r.pos && t.indexOf(r.norm) > -1 && c.push(f);
        }
      });
    })(),
    !(function () {
      var t = n.floatChar,
        e = n.thousandChar,
        i = /[0-9]/,
        s = /^-?[0-9]+$/,
        r = new RegExp("^-?[0-9]*\\" + t + "[0-9]+$"),
        a = new RegExp("^-?[0-9]+([\\" + e + "][0-9]+){1,}$"),
        J = new RegExp("^-?[0-9]+([\\" + e + "][0-9]+){1,}(\\" + t + "[0-9]+)$"),
        l = new RegExp("\\" + e, "g"),
        d = n.numbers,
        N = n.multipliers,
        u = function (t) {
          var e = t.norm;
          if (e.match(i)) {
            if (e.match(s)) return parseInt(e, 10);
            if (e.match(r)) return parseFloat(e);
            if (e.match(J)) return parseFloat(e.replace(l, ""));
            if (e.match(a)) return parseInt(e.replace(l, ""), 10);
          }
          return (e = t.attr.singular), d.hasOwnProperty(e) ? d[e] : null;
        },
        c = function (t, e) {
          var i,
            n,
            s,
            r = e[2],
            a = e[1],
            o = 0;
          if (1 === e[1]) return (i = r[0]), u(i);
          for (n = 0; n < a; n += 1) {
            if (((i = r[n]), (s = u(i)), null === s)) return null;
            N.indexOf(i.attr.singular) > -1 ? (o *= s) : (o += s);
          }
          return o;
        },
        p = function (t, e) {
          var i,
            n = t[2],
            s = n.length;
          for (i = 0; i < s; i += 1) n[i].attr.value = e;
        };
      o.before("s", "numeric", function (t, e, i, n) {
        for (var s, r, a = n.numericSections, o = a.length, s = 0; s < o; s += 1)
          (r = c(t, a[s])), null !== r && p(a[s], r);
      });
    })(),
    !(function () {
      var e = t.lexicon;
      o.before("t", "basics", function (i, s, r) {
        var a,
          o,
          J,
          l,
          N = i.raw,
          u = i.norm,
          c = i.stem,
          p = i.pos,
          B = 0,
          g = 1;
        (o = N.toLowerCase()),
          (J = o.length),
          J > 1 && N.indexOf(".") === J - 1 && (l = n.abbrs.indexOf(o.slice(0, J - 1))) > -1
            ? ((i.attr.abbr = !0), (u = n.abbrs_rplt[l]))
            : N.match(/^([a-z]{1}\.)+/gi)
            ? (i.attr.acronym = !0)
            : (u = t.synonym(u)),
          "." === p
            ? ((l = N[0]),
              "!" === l || "?" === l
                ? ((g = N.length > 1 ? 2 : "?" === l ? 1 : 1.5), N.length > 1 && (u = N[0]))
                : "." === l && "." === N[1] && ((g = 1.2), (u = "...")))
            : "EM" === p
            ? (g = 1.2)
            : "UH" === p
            ? (g = 1.1)
            : 0 === p.indexOf("VB")
            ? (i.attr.infinitive = d.infinitive(u))
            : "NNS" === p || "CD" === p
            ? ((a = d.singularize(u)), (i.attr.singular = a))
            : "NN" === p && (i.attr.singular = u),
          "NNP" !== p &&
            "NNPS" !== p &&
            "IN" !== p &&
            (e.hasOwnProperty(u)
              ? ((l = e[u]), (l.condition && i.pos !== l.condition) || (B = l.sentiment))
              : "NNS" === p && e.hasOwnProperty(a)
              ? ((l = e[a]), (l.condition && p !== l.condition) || (B = l.sentiment / 2))
              : e.hasOwnProperty(c)
              ? ((l = e[c]), (l.condition && p !== l.condition) || (B = l.sentiment / 2))
              : n.dirty.indexOf(u) > -1
              ? (B = -2)
              : n.polite.indexOf(u) > -1 && (B = 1)),
          (i.profile.sentiment = B),
          (i.profile.emphasis = g),
          (i.norm = u);
      });
    })(),
    !(function () {
      var t = [",", ":", ";", "("],
        e = ["-", "—", "/"];
      o.before("t", "breakpoint", function (i, n, s) {
        var r = i.raw,
          a = i.pos;
        (t.indexOf(a) > -1 || e.indexOf(r) > -1) && ((i.profile.breakpoint = !0), s.stats.breakpoints++);
      });
    })(),
    !(function () {
      o.before("t", "entities", function (e, i, s) {
        var a,
          o,
          J,
          l,
          d,
          N = t.lexer.regexps,
          u = " " + e.norm + " ";
        for (a in N)
          N.hasOwnProperty(a) &&
            u.match(N[a]) &&
            ((o = r.entity(e, i, a)),
            (e.attr.entity = s.entities.push(o) - 1),
            ("username" !== o.type && "composite" !== a) || ((e.pos = "NNP"), (s.tags[i] = "NNP")),
            (s.stats.confidence += 1 / s.length),
            "pl" === a &&
              ((o.type = "political_affiliation"),
              (J = e.norm.split("-")),
              (d = J[1].length),
              "d" === J[0] ? (o.meta.party = "democrat") : (o.meta.party = "republican"),
              (l = "." === J[1][d - 1] ? n.abbrs.indexOf(J[1].slice(0, d - 1)) : n.abbrs.indexOf(J[1])),
              l > -1 && (J[1] = n.abbrs_rplt[l]),
              (e.norm = o.meta.party + ", " + J[1])));
      });
    })(),
    !(function () {
      var t = n.numbers;
      o.init(function (t) {
        (t.numericSections = []), (t.inNumericSection = !1);
      }),
        o.before("t", "numeric", function (e, i, n, s) {
          var r = e.pos,
            a = s.numericSections;
          "CD" === r || ("NNS" === r && t.hasOwnProperty(e.attr.singular))
            ? s.inNumericSection
              ? ((a[a.length - 1][1] += 1), a[a.length - 1][2].push(e))
              : (s.numericSections.push([i, 1, [e]]), (s.inNumericSection = !0))
            : s.inNumericSection && (s.inNumericSection = !1);
        });
    })(),
    !(function () {
      var i = [",", ".", ":", '"', "(", ")"];
      e(r, {
        entity: function (t, e, i) {
          return { raw: t.raw, norm: t.norm, fromIndex: e, toIndex: e, type: i || null, meta: {} };
        },
        sentence: function (t, e) {
          return {
            language: e,
            time: 0,
            length: 0,
            governor: -1,
            raw: t,
            stats: { words: 0, confidence: 0, p_foreign: 0, p_upper: 0, p_cap: 0, avg_length: 0, breakpoints: 0 },
            profile: {
              label: "neutral",
              sentiment: 0,
              emphasis: 1,
              amplitude: 0,
              politeness: 0,
              dirtiness: 0,
              types: [],
              main_tense: "present",
            },
            has_negation: !1,
            entities: [],
            deps: { subjects: [], objects: [] },
            root: null,
            tokens: [],
            tags: [],
          };
        },
        token: function (e, n, s) {
          var r = null,
            a = 0 === s.indexOf("VB");
          return (
            (n = n.toLowerCase()),
            (r = "VBD" === s || "VBN" === s ? "past" : "VBG" === s ? "gerund" : "present"),
            {
              raw: e,
              norm: n,
              stem: t.stemmer(n),
              pos: s || "",
              profile: { sentiment: 0, emphasis: 1, negated: !1, breakpoint: !1 },
              attr: {
                value: null,
                acronym: !1,
                abbr: !1,
                is_verb: a,
                tense: r,
                infinitive: null,
                is_noun: 0 === s.indexOf("NN"),
                plural: null,
                singular: null,
                entity: -1,
                is_punc: i.indexOf(s) > -1,
              },
              deps: { master: null, governor: !1, type: "unknown", dependencies: [] },
            }
          );
        },
        tag: function (t, e, i) {
          return { tag: t || "NN", norm: i, confidence: e || 0, blocked: !1 };
        },
      });
    })(),
    !(function () {
      var r,
        a,
        o = n.abbrs,
        J = /(\S.+?[….\?!\n])(?=\s+|$|")/g,
        l = new RegExp("(^| |\\(|\\[|{)(" + o.join("|") + ")[.!?] ?$", "i"),
        d = " !?()[]{}\"'`%•.…:;,$€£¥\\/+=*_–",
        N = t.punycode.ucs2,
        u = n.floatChar,
        c = n.thousandChar,
        p = /^-?[0-9]+$/,
        B = /^[0-9]+$/,
        g = new RegExp("^-?[0-9]+[.,]$"),
        V = { complexFloat: "\\s(-?[0-9]+([\\" + c + "][0-9]+){1,}(\\" + u + "[0-9]+))" },
        h = {},
        f = n.emots.length,
        m = function (t) {
          var e = 0,
            i = t.length;
          for (e = 0; e < i; e += 1) if (null === t[e] || "emoticon" !== t[e].group) return !1;
          return !0;
        },
        b = function (t, e, i, n) {
          var s, r, a, o;
          for (s in i)
            if (i.hasOwnProperty(s))
              for (a = new RegExp(i[s], "g"); null !== (o = a.exec(t)); )
                (r = o[0].length), (e[o.index] = { content: o[1], type: s, group: n, length: r - (r - o[1].length) });
        };
      for (r = 0; r < 2 * f; r += 2)
        (a = n.emots[r / 2]),
          (h["em_" + r] = "\\s(" + i(a) + "+)[^a-z]"),
          a.match(/^[a-zA-Z]/) || (h["em_" + (r + 1)] = "[a-zA-Z](" + i(a) + "+)[^a-z]");
      e(t.lexer, {
        regexps: {
          email: "\\s([^\\s]+@[^\\s]+(\\.[^\\s\\)\\]]+){1,})",
          composite: "\\s([a-zA-Z]&[a-zA-Z])",
          username: "\\s(@[a-zA-Z0-9_]+)",
          html_char: "\\s(&[a-zA-Z0-9]{2,4};)",
          hashtag: "\\s(#[a-zA-Z0-9_]+)",
          url: "\\s((https?|ftp):\\/\\/[\\-a-z0-9+&@#\\/%\\?=~_|!:,\\.;]*[\\-a-z0-9+&@#\\/%=~_|])",
          ip: "\\s(([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5]))\\s",
          pl: "\\s([rd]-([a-z]+\\.{0,1})+)",
        },
        consolidate: function (t, e, i) {
          for (var n = 1, s = t.length; n < s; n += 1)
            m(e[n]) &&
              ((t[n - 1] = t[n - 1].concat(t[n])),
              (i[n - 1] += " " + i[n]),
              t.splice(n, 1),
              e.splice(n, 1),
              i.splice(n, 1),
              (n -= 1),
              (s -= 1));
          return t;
        },
        sentences: function (t) {
          var e,
            i,
            n = t.split(J),
            s = n.length,
            r = [];
          for (e = 0; e < s; e++)
            (i = n[e].trim()),
              i.match(l) || i.match(/[ |\.][A-Za-z]\.?$/)
                ? e < s - 1 && !n[e + 1].match(/^[A-Za-z]\s/)
                  ? (console.log(i, n[e + 1]), (n[e + 1] = i + " " + n[e + 1].trim()))
                  : r.push(i)
                : i && r.push(i);
          return r;
        },
        splitTokens: function (t) {
          var e,
            i,
            n,
            r = t.length,
            a = [],
            o = [],
            J = null,
            l = " " + t + " ",
            u = {},
            c = function (t) {
              if (t) {
                "object" == typeof t && ((J = t), (t = t.content)), (n = N.decode(t));
                var e,
                  i = n.length,
                  s = "";
                for (e = 0; e < i; e++)
                  n[e] >= 128511
                    ? (s && (o.push(J), a.push(s)), o.push({ group: "emoticon" }), a.push(N.encode([n[e]])), (s = ""))
                    : (s += N.encode([n[e]]));
                s && (o.push(J), a.push(s));
              }
            },
            p = function (t, e) {
              c(t), c(e), (i = "");
            };
          for (b(l, u, s.regexps, "entity"), b(l, u, h, "emoticon"), b(l, u, V, "number"), i = "", e = 0; e < r; e++)
            u.hasOwnProperty(e)
              ? (p(i, u[e]), (e += u[e].length - 1))
              : d.indexOf(t[e]) > -1
              ? p(i, t[e])
              : (i += t[e]);
          return p(i), { tokens: a, meta: o };
        },
        tokens: function (t, e) {
          var i,
            n,
            r = s.splitTokens(t),
            a = r.tokens,
            J = r.meta,
            l = a.length,
            d = !1,
            N = [],
            u = [],
            c = "",
            V = "",
            h = 0;
          for (i = 0; i < l; i++)
            if ((n = a[i].trim()))
              if (
                ((c = h > 0 ? N[h - 1] : ""),
                (V = i < l - 1 ? a[i + 1] : ""),
                (("." === n || "," === n) && c.match(p) && V.match(B)) || (n.match(p) && c.match(g)))
              )
                (d = !1), (N[h - 1] += n);
              else if ("." === n && i < l - 1 && h > 0 && o.indexOf(c.toLowerCase()) > -1) (d = !1), (N[h - 1] += n);
              else if (d && i < l - 1 && 1 === n.length) N[h - 1] += n;
              else {
                if (n.match(/^\W+$/gi)) {
                  if (((d = !1), n === c[c.length - 1])) {
                    N[h - 1] += n;
                    continue;
                  }
                } else n.match(/^[A-Za-z]{1}$/g) && i < l - 1 && "." === V && (d = !0);
                n && (N.push(n), u.push(J[i]), h++);
              }
            else d = !1;
          return { result: s.postprocess(N, u), meta: u };
        },
        advanced: function (t, e, i) {
          var n,
            r,
            a = s.sentences(t),
            o = a.length,
            J = [],
            l = [];
          if (i) return { sentences: a, raws: null, meta: null };
          for (n = 0; n < o; n++) l.push(a[n]), (r = s.tokens(a[n], e)), (J[n] = r.meta), (a[n] = r.result);
          return s.consolidate(a, J, l), { raws: l, sentences: a, meta: J };
        },
        lex: function (t, e, i) {
          return s.advanced(t, e, i).sentences;
        },
      }),
        (t.lex = s.lex);
    })(),
    !(function () {
      var i = ["s", "m", "t", "ll", "ve", "d", "em", "re"];
      e(t.lexer, {
        postprocess: function (t, e) {
          var n,
            s,
            r,
            a,
            o = t.length,
            J = [];
          for (n = 0; n < o; n += 1)
            (s = t[n]),
              (r = t[n - 1] || ""),
              (a = t[n + 1] || ""),
              "'" === s && i.indexOf(a) > -1
                ? "t" === a && r.lastIndexOf("n") === r.length - 1
                  ? ((J[n - 1] = r.slice(0, -1)), J.push("n" + s + a), (n += 1))
                  : (J.push(s + a), (n += 1))
                : "cant" !== s
                ? "cannot" !== s
                  ? "gonna" !== s
                    ? J.push(s)
                    : J.push("gon", "na")
                  : J.push("can", "not")
                : J.push("can", "n't");
          return J;
        },
      });
    })(),
    !(function () {
      var i = t.inflector.isPlural,
        s = 0,
        a = 1,
        o = 2,
        J = 3,
        l = 4,
        d = 41,
        u = 5,
        c = 51,
        p = 6,
        B = 8,
        g = 81,
        V = 9,
        h = 11,
        f = 12,
        m = 121,
        b = 13,
        v = 14,
        y = 141,
        w = 15,
        k = 16,
        P = 17,
        R = 171,
        M = 172,
        E = 18,
        D = 19,
        x = 21,
        Z = t.lexicon,
        G = n.emots,
        $ = n.rules,
        S = $.length,
        O = n.suffixes,
        I = O.length,
        z = new RegExp("^-?[0-9]+([\\" + n.thousandChar + "][0-9]+){1,}(\\" + n.floatChar + "[0-9]+)$"),
        j = ["constructor"],
        T = function (e) {
          var i,
            n = e.replace(/(.)\1{2,}/g, "$1$1");
          return t.lexicon.hasOwnProperty(n)
            ? n
            : ((i = t.synonym(n)),
              i !== n
                ? i
                : ((n = e.replace(/(.)\1{1,}/g, "$1")),
                  t.lexicon.hasOwnProperty(n) ? n : ((i = t.synonym(n)), i !== n ? i : null)));
        },
        C = function (t) {
          return t.match(/^[A-Z][a-z\.]+$/g) || t.match(/^[A-Z]+[0-9]+$/g) || t.match(/^[A-Z][a-z]+[A-Z][a-z]+$/g);
        };
      e(N, {
        applyRule: function (t, e, i, n, r, N, Z) {
          if (!(t.from !== i || (t.secondRun && 0 === Z))) {
            var G,
              $,
              S = t.type;
            if (S !== s) {
              if (((e = e.toLowerCase()), S === o)) {
                if (n > 0 && N[n - 1] === t.c1) return void (N[n] = t.to);
              } else if (S === c) {
                if (((G = r[n - 1] || ""), N[n - 1] === t.c2 && G.toLowerCase() === t.c1)) return void (N[n] = t.to);
              } else if (S === J) {
                if (N[n + 1] === t.c1) return void (N[n] = t.to);
              } else if (S === l) {
                if (N[n + 2] === t.c1) return void (N[n] = t.to);
              } else if (S === d) {
                if (N[n - 2] === t.c1) return void (N[n] = t.to);
              } else if (S === a) {
                if (N[n - 1] === t.c1 || N[n - 2] === t.c1) return void (N[n] = t.to);
              } else if (S === u) {
                if (((G = r[n - 1] || ""), G.toLowerCase() === t.c1)) return void (N[n] = t.to);
              } else if (S === p) {
                if (e === t.c1) return void (N[n] = t.to);
              } else if (S === B) {
                if (e === t.c2 && N[n - 1] === t.c1) return void (N[n] = t.to);
              } else if (S === g) {
                if (((G = r[n - 1] || ""), e === t.c2 && G.toLowerCase() === t.c1)) return void (N[n] = t.to);
              } else if (S === V) {
                if (N[n + 1] === t.c1 || N[n + 2] === t.c1 || N[n + 3] === t.c1) return void (N[n] = t.to);
              } else if (S === h) {
                if (((G = r[n + 2] || ""), G.toLowerCase() === t.c1)) return void (N[n] = t.to);
              } else if (S === m) {
                if (((G = r[n + 1] || ""), e === t.c1 && G.toLowerCase() === t.c2)) return void (N[n] = t.to);
              } else if (S === f) {
                if (e === t.c1 && N[n + 1] === t.c2) return void (N[n] = t.to);
              } else if (S === b) {
                if (N[n - 1] === t.c1 || N[n - 2] === t.c1 || N[n - 3] === t.c1) return void (N[n] = t.to);
              } else if (S === v) {
                if (N[n - 1] === t.c1 && N[n + 1] === t.c2) return void (N[n] = t.to);
              } else if (S === y) {
                if (e === t.c1 && N[n - 1] === t.c2 && N[n + 1] === t.c3) return void (N[n] = t.to);
              } else if (S === w) {
                if (((G = r[n + 1] || ""), G.toLowerCase() === t.c1)) return void (N[n] = t.to);
              } else if (S === k) {
                if (N[n + 1] === t.c1 || N[n + 2] === t.c1) return void (N[n] = t.to);
              } else if (S === P) {
                if (N[n - 2] === t.c1 && N[n - 1] === t.c2) return void (N[n] = t.to);
              } else if (S === M) {
                if (N[n - 2] === t.c1 && N[n - 1] === t.c2 && N[n + 1] === t.c3) return void (N[n] = t.to);
              } else if (S === R) {
                if (N[n + 1] === t.c1 && N[n + 2] === t.c2) return void (N[n] = t.to);
              } else if (S === E) {
                if (((G = r[n + 1] || ""), ($ = r[n + 2] || ""), G.toLowerCase() === t.c1 || $.toLowerCase() === t.c1))
                  return void (N[n] = t.to);
              } else if (S === D) {
                if ((($ = r[n - 2] || ""), $.toLowerCase() === t.c1)) return void (N[n] = t.to);
              } else if (S === x) {
                if (((G = r[n - 1] || ""), ($ = r[n - 2] || ""), G.toLowerCase() === t.c1 || $.toLowerCase() === t.c1))
                  return void (N[n] = t.to);
              } else if (S === a && ((G = N[n - 1] || ""), ($ = N[n - 2] || ""), G === t.c1 || $ === t.c1))
                return void (N[n] = t.to);
            } else if (0 === n && e === t.c1) return void (N[n] = t.to);
          }
        },
        applyRules: function (t, e, i, n, s) {
          var r;
          for (r = 0; r < S; r++) N.applyRule($[r], t, n[e], e, i, n, s);
        },
        apply: function (t, e, i) {
          for (var n, s = t.length, r = 0; r < 2; ) {
            for (n = 0; n < s; n++) i[n] !== !0 && this.applyRules(t[n], n, t, e, r);
            r++;
          }
          return e;
        },
        testSuffixes: function (t) {
          var e;
          for (e = 0; e < I; e++) if (t.match(O[e].regexp)) return O[e].pos;
          return null;
        },
        getTag: function (e) {
          var i,
            n,
            s,
            a,
            o,
            J = r.tag();
          if (((J.norm = e), e.length > 1))
            for (i = null, n = 0, s = G.length; n < s; n++)
              if (0 === e.indexOf(G[n])) return (J.tag = "EM"), (J.blocked = !0), (J.confidence = 1), J;
          return (
            (i = t.lexicon[j.indexOf(e) > -1 ? "_" + e : e]),
            i && "-" !== i
              ? ((J.tag = i), (J.blocked = i.blocked), (J.confidence = 1), J)
              : ((a = e.toLowerCase()),
                (o = t.synonym(a)),
                o !== a && (i = t.lexicon[o])
                  ? ((J.tag = i), (J.confidence = 1), J)
                  : a.match(/(\w)\1+/g) && (o = T(a))
                  ? ((J.norm = o), (i = t.lexicon[o]), (J.tag = i), (J.confidence = 0.8), J)
                  : "string" == typeof e && e.match(/[A-Z]/g) && ((i = t.lexicon[a]), i && "-" !== i)
                  ? ((J.tag = i), (J.confidence = 0.75), J)
                  : ((i = N.testSuffixes(e)),
                    i
                      ? ((J.tag = i), (J.confidence = 0.25), J)
                      : e.indexOf("-") > -1
                      ? (e.match(/^[A-Z]/g) ? (J.tag = "NNP") : (J.tag = "JJ"), (J.confidence /= 2), J)
                      : J))
          );
        },
        tag: function (t) {
          var e,
            s,
            r,
            a,
            o,
            J,
            l,
            d = [],
            u = [],
            c = [],
            p = t.length,
            B = !1,
            g = 0,
            V = function (t, e, i) {
              (t = "object" == typeof t ? t.pos : t),
                d.push("-" === t ? "NN" : t),
                u.push("boolean" == typeof i && i),
                (g += e);
            };
          for (r = 0; r < p; r++)
            (e = t[r]),
              (c[r] = e),
              e.match(/^[%\+\-\/@]$/g)
                ? V("SYM", 1, !0)
                : e.match(/^(\?|\!|\.){1,}$/g)
                ? V(".", 1, !0)
                : e.match(/^-?[0-9]+([\.,][0-9]+)?$/g) ||
                  e.match(z) ||
                  e.match(/^([0-9]{2}|[0-9]{4})s$/g) ||
                  e.match(/^[0-9]{2,4}-[0-9]{2,4}$/g)
                ? V("CD", 1, !0)
                : ((J = N.getTag(t[r])), V(J.tag, J.confidence, J.blocked), (c[r] = J.norm));
          for (r = 0; r < p; r++)
            if (((s = d[r]), "SYM" !== s && "." !== s)) {
              if (((e = t[r]), (o = e.toLowerCase()), (a = e.length), (l = 0 === r ? "" : d[r - 1]), 0 === r)) {
                if ("that" === o) {
                  (d[r] = "DT"), g++;
                  continue;
                }
                if (("NN" === s || "VB" === s) && n.infinitives.indexOf(o) > -1) {
                  (d[r] = "VB"), g++;
                  continue;
                }
              }
              !(a > 3 && e.match(/[^e]ed$/gi) && 0 === s.indexOf("N")) || (0 !== r && e.match(/^[A-Z][a-z]+/g))
                ? !(a > 4 && e.lastIndexOf("ing") === a - 3 && n.ing_excpt.indexOf(o) === -1) ||
                  (0 !== s.indexOf("N") && "MD" !== s) ||
                  (0 !== r && e.match(/^[A-Z][a-z]+/g)) ||
                  "NN" === l ||
                  "JJ" === l ||
                  "DT" === l ||
                  "VBG" === l
                  ? a > 4 &&
                    o.lastIndexOf("in") === a - 2 &&
                    "NN" === s &&
                    (0 === r || !e.match(/^[A-Z][a-z]+/g)) &&
                    "NN" !== l &&
                    "JJ" !== l &&
                    "DT" !== l &&
                    "VBG" !== l &&
                    ((J = Z[o + "g"]), J && "VBG" === J.pos)
                    ? (d[r] = "VBG")
                    : ("TO" === l && n.infinitives.indexOf(o) > -1 && (s = "VB"),
                      "DT" !== l && e.match(/^[IVXLCDM]+$/g) && "I" !== e && (s = "CD"),
                      "NN" === s || "VB" === s || ("JJ" === s && n.nationalities.hasOwnProperty(o) === !1)
                        ? e.match(/^[A-Z]+$/g) || e.match(/^([a-z]{1}\.)+/gi)
                          ? ((s = "NNP"), (B = !0))
                          : r > 0 && C(e)
                          ? ((s = "NNP"),
                            (B = !0),
                            (J = t[r - 1]),
                            1 !== r ||
                              ("NN" !== l && "NNS" !== l && "JJ" !== l && "VB" !== l) ||
                              !C(J) ||
                              (d[r - 1] = "NNP"))
                          : (B = !1)
                        : B && (("CD" === s && e.match(/^[IVXLCDM]+$/g)) || "I" === e)
                        ? (s = "NNP")
                        : (B = "NNP" === s || "NNPS" === s),
                      "NN" === s && i(e) && (s = "NNS"),
                      (d[r] = s))
                  : (d[r] = "VBG")
                : (d[r] = "VBN");
            }
          for (N.apply(t, d, u), r = 0; r < p; r++)
            (e = t[r]),
              (s = d[r]),
              (l = d[r - 1] || ""),
              e.match(/ed$/g) && ("JJ" !== s || ("VBZ" !== l && "VBP" !== l) || "TO" !== d[r + 1] || (s = "VBN")),
              (d[r] = s);
          return { tags: d, norms: c, confidence: g / p };
        },
      }),
        (t.tag = N.tag);
    })(),
    !(function () {
      var e = ["#", "SYM", "CR", "EM"];
      t.stat = function (t) {
        var i,
          n,
          s,
          r,
          a = t.length,
          o = a,
          J = t.stats,
          l = 0,
          d = 0,
          N = 0,
          u = 0,
          c = 0;
        for (i = 0; i < a; i++)
          (n = t.tokens[i]),
            (s = n.raw),
            (l += s.length),
            (r = t.tags[i]),
            n.attr.is_punc || e.indexOf(r) > -1
              ? o--
              : ((u += 1),
                s.match(/^[A-Z][a-zA-Z]+$/g) && c++,
                s.match(/[A-Z]+/) && !s.match(/[a-z]/) && N++,
                "FW" === r && d++);
        0 === o && (o = 1),
          (J.words = u),
          (J.p_foreign = (100 * d) / o),
          (J.p_upper = (100 * N) / o),
          (J.p_cap = (100 * c) / o),
          (J.avg_length = l / o);
      };
    })(),
    !(function () {
      var e = n.synonyms,
        i = e.length;
      t.synonym = function (t) {
        var n;
        for (n = 0; n < i; n++) if (e[n].indexOf(t) > 0) return e[n][0];
        return t;
      };
    })();
})("undefined" == typeof exports ? (this.compendium = {}) : exports);
