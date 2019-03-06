/* Plugin: Underscore JS */

(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,v=e.reduce,h=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,j=i.bind,w=function(n){return n instanceof w?n:this instanceof w?(this._wrapped=n,void 0):new w(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=w),exports._=w):n._=w,w.VERSION="1.4.3";var A=w.each=w.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(w.has(n,a)&&t.call(e,n[a],a,n)===r)return};w.map=w.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e[e.length]=t.call(r,n,u,i)}),e)};var O="Reduce of empty array with no initial value";w.reduce=w.foldl=w.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduce===v)return e&&(t=w.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},w.reduceRight=w.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduceRight===h)return e&&(t=w.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=w.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},w.find=w.detect=function(n,t,r){var e;return E(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},w.filter=w.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&(e[e.length]=n)}),e)},w.reject=function(n,t,r){return w.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},w.every=w.all=function(n,t,e){t||(t=w.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var E=w.some=w.any=function(n,t,e){t||(t=w.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};w.contains=w.include=function(n,t){return null==n?!1:y&&n.indexOf===y?-1!=n.indexOf(t):E(n,function(n){return n===t})},w.invoke=function(n,t){var r=o.call(arguments,2);return w.map(n,function(n){return(w.isFunction(t)?t:n[t]).apply(n,r)})},w.pluck=function(n,t){return w.map(n,function(n){return n[t]})},w.where=function(n,t){return w.isEmpty(t)?[]:w.filter(n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},w.max=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.max.apply(Math,n);if(!t&&w.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>=e.computed&&(e={value:n,computed:a})}),e.value},w.min=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.min.apply(Math,n);if(!t&&w.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;e.computed>a&&(e={value:n,computed:a})}),e.value},w.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=w.random(r++),e[r-1]=e[t],e[t]=n}),e};var F=function(n){return w.isFunction(n)?n:function(t){return t[n]}};w.sortBy=function(n,t,r){var e=F(t);return w.pluck(w.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||void 0===r)return 1;if(e>r||void 0===e)return-1}return n.index<t.index?-1:1}),"value")};var k=function(n,t,r,e){var u={},i=F(t||w.identity);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};w.groupBy=function(n,t,r){return k(n,t,r,function(n,t,r){(w.has(n,t)?n[t]:n[t]=[]).push(r)})},w.countBy=function(n,t,r){return k(n,t,r,function(n,t){w.has(n,t)||(n[t]=0),n[t]++})},w.sortedIndex=function(n,t,r,e){r=null==r?w.identity:F(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;u>r.call(e,n[o])?i=o+1:a=o}return i},w.toArray=function(n){return n?w.isArray(n)?o.call(n):n.length===+n.length?w.map(n,w.identity):w.values(n):[]},w.size=function(n){return null==n?0:n.length===+n.length?n.length:w.keys(n).length},w.first=w.head=w.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},w.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},w.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},w.rest=w.tail=w.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},w.compact=function(n){return w.filter(n,w.identity)};var R=function(n,t,r){return A(n,function(n){w.isArray(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r};w.flatten=function(n,t){return R(n,t,[])},w.without=function(n){return w.difference(n,o.call(arguments,1))},w.uniq=w.unique=function(n,t,r,e){w.isFunction(t)&&(e=r,r=t,t=!1);var u=r?w.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:w.contains(a,r))||(a.push(r),i.push(n[e]))}),i},w.union=function(){return w.uniq(c.apply(e,arguments))},w.intersection=function(n){var t=o.call(arguments,1);return w.filter(w.uniq(n),function(n){return w.every(t,function(t){return w.indexOf(t,n)>=0})})},w.difference=function(n){var t=c.apply(e,o.call(arguments,1));return w.filter(n,function(n){return!w.contains(t,n)})},w.zip=function(){for(var n=o.call(arguments),t=w.max(w.pluck(n,"length")),r=Array(t),e=0;t>e;e++)r[e]=w.pluck(n,""+e);return r},w.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},w.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=w.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},w.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},w.range=function(n,t,r){1>=arguments.length&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=Array(e);e>u;)i[u++]=n,n+=r;return i};var I=function(){};w.bind=function(n,t){var r,e;if(n.bind===j&&j)return j.apply(n,o.call(arguments,1));if(!w.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));I.prototype=n.prototype;var u=new I;I.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},w.bindAll=function(n){var t=o.call(arguments,1);return 0==t.length&&(t=w.functions(n)),A(t,function(t){n[t]=w.bind(n[t],n)}),n},w.memoize=function(n,t){var r={};return t||(t=w.identity),function(){var e=t.apply(this,arguments);return w.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},w.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},w.defer=function(n){return w.delay.apply(w,[n,1].concat(o.call(arguments,1)))},w.throttle=function(n,t){var r,e,u,i,a=0,o=function(){a=new Date,u=null,i=n.apply(r,e)};return function(){var c=new Date,l=t-(c-a);return r=this,e=arguments,0>=l?(clearTimeout(u),u=null,a=c,i=n.apply(r,e)):u||(u=setTimeout(o,l)),i}},w.debounce=function(n,t,r){var e,u;return function(){var i=this,a=arguments,o=function(){e=null,r||(u=n.apply(i,a))},c=r&&!e;return clearTimeout(e),e=setTimeout(o,t),c&&(u=n.apply(i,a)),u}},w.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},w.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},w.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},w.after=function(n,t){return 0>=n?t():function(){return 1>--n?t.apply(this,arguments):void 0}},w.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)w.has(n,r)&&(t[t.length]=r);return t},w.values=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push(n[r]);return t},w.pairs=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push([r,n[r]]);return t},w.invert=function(n){var t={};for(var r in n)w.has(n,r)&&(t[n[r]]=r);return t},w.functions=w.methods=function(n){var t=[];for(var r in n)w.isFunction(n[r])&&t.push(r);return t.sort()},w.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},w.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},w.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)w.contains(r,u)||(t[u]=n[u]);return t},w.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)null==n[r]&&(n[r]=t[r])}),n},w.clone=function(n){return w.isObject(n)?w.isArray(n)?n.slice():w.extend({},n):n},w.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof w&&(n=n._wrapped),t instanceof w&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==t+"";case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;r.push(n),e.push(t);var a=0,o=!0;if("[object Array]"==u){if(a=n.length,o=a==t.length)for(;a--&&(o=S(n[a],t[a],r,e)););}else{var c=n.constructor,f=t.constructor;if(c!==f&&!(w.isFunction(c)&&c instanceof c&&w.isFunction(f)&&f instanceof f))return!1;for(var s in n)if(w.has(n,s)&&(a++,!(o=w.has(t,s)&&S(n[s],t[s],r,e))))break;if(o){for(s in t)if(w.has(t,s)&&!a--)break;o=!a}}return r.pop(),e.pop(),o};w.isEqual=function(n,t){return S(n,t,[],[])},w.isEmpty=function(n){if(null==n)return!0;if(w.isArray(n)||w.isString(n))return 0===n.length;for(var t in n)if(w.has(n,t))return!1;return!0},w.isElement=function(n){return!(!n||1!==n.nodeType)},w.isArray=x||function(n){return"[object Array]"==l.call(n)},w.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){w["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),w.isArguments(arguments)||(w.isArguments=function(n){return!(!n||!w.has(n,"callee"))}),w.isFunction=function(n){return"function"==typeof n},w.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},w.isNaN=function(n){return w.isNumber(n)&&n!=+n},w.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},w.isNull=function(n){return null===n},w.isUndefined=function(n){return void 0===n},w.has=function(n,t){return f.call(n,t)},w.noConflict=function(){return n._=t,this},w.identity=function(n){return n},w.times=function(n,t,r){for(var e=Array(n),u=0;n>u;u++)e[u]=t.call(r,u);return e},w.random=function(n,t){return null==t&&(t=n,n=0),n+(0|Math.random()*(t-n+1))};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};T.unescape=w.invert(T.escape);var M={escape:RegExp("["+w.keys(T.escape).join("")+"]","g"),unescape:RegExp("("+w.keys(T.unescape).join("|")+")","g")};w.each(["escape","unescape"],function(n){w[n]=function(t){return null==t?"":(""+t).replace(M[n],function(t){return T[n][t]})}}),w.result=function(n,t){if(null==n)return null;var r=n[t];return w.isFunction(r)?r.call(n):r},w.mixin=function(n){A(w.functions(n),function(t){var r=w[t]=n[t];w.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(w,n))}})};var N=0;w.uniqueId=function(n){var t=""+ ++N;return n?n+t:t},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n"," ":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;w.template=function(n,t,r){r=w.defaults({},r,w.templateSettings);var e=RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(D,function(n){return"\\"+B[n]}),r&&(i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(i+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),a&&(i+="';\n"+a+"\n__p+='"),u=o+t.length,t}),i+="';\n",r.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=Function(r.variable||"obj","_",i)}catch(o){throw o.source=i,o}if(t)return a(t,w);var c=function(n){return a.call(this,n,w)};return c.source="function("+(r.variable||"obj")+"){\n"+i+"}",c},w.chain=function(n){return w(n).chain()};var z=function(n){return this._chain?w(n).chain():n};w.mixin(w),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];w.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];w.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),w.extend(w.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);

/* Plugin: Backbone JS */

// Backbone.js 0.9.10

// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
(function(){var n=this,B=n.Backbone,h=[],C=h.push,u=h.slice,D=h.splice,g;g="undefined"!==typeof exports?exports:n.Backbone={};g.VERSION="0.9.10";var f=n._;!f&&"undefined"!==typeof require&&(f=require("underscore"));g.$=n.jQuery||n.Zepto||n.ender;g.noConflict=function(){n.Backbone=B;return this};g.emulateHTTP=!1;g.emulateJSON=!1;var v=/\s+/,q=function(a,b,c,d){if(!c)return!0;if("object"===typeof c)for(var e in c)a[b].apply(a,[e,c[e]].concat(d));else if(v.test(c)){c=c.split(v);e=0;for(var f=c.length;e<
f;e++)a[b].apply(a,[c[e]].concat(d))}else return!0},w=function(a,b){var c,d=-1,e=a.length;switch(b.length){case 0:for(;++d<e;)(c=a[d]).callback.call(c.ctx);break;case 1:for(;++d<e;)(c=a[d]).callback.call(c.ctx,b[0]);break;case 2:for(;++d<e;)(c=a[d]).callback.call(c.ctx,b[0],b[1]);break;case 3:for(;++d<e;)(c=a[d]).callback.call(c.ctx,b[0],b[1],b[2]);break;default:for(;++d<e;)(c=a[d]).callback.apply(c.ctx,b)}},h=g.Events={on:function(a,b,c){if(!q(this,"on",a,[b,c])||!b)return this;this._events||(this._events=
{});(this._events[a]||(this._events[a]=[])).push({callback:b,context:c,ctx:c||this});return this},once:function(a,b,c){if(!q(this,"once",a,[b,c])||!b)return this;var d=this,e=f.once(function(){d.off(a,e);b.apply(this,arguments)});e._callback=b;this.on(a,e,c);return this},off:function(a,b,c){var d,e,t,g,j,l,k,h;if(!this._events||!q(this,"off",a,[b,c]))return this;if(!a&&!b&&!c)return this._events={},this;g=a?[a]:f.keys(this._events);j=0;for(l=g.length;j<l;j++)if(a=g[j],d=this._events[a]){t=[];if(b||
c){k=0;for(h=d.length;k<h;k++)e=d[k],(b&&b!==e.callback&&b!==e.callback._callback||c&&c!==e.context)&&t.push(e)}this._events[a]=t}return this},trigger:function(a){if(!this._events)return this;var b=u.call(arguments,1);if(!q(this,"trigger",a,b))return this;var c=this._events[a],d=this._events.all;c&&w(c,b);d&&w(d,arguments);return this},listenTo:function(a,b,c){var d=this._listeners||(this._listeners={}),e=a._listenerId||(a._listenerId=f.uniqueId("l"));d[e]=a;a.on(b,"object"===typeof b?this:c,this);
return this},stopListening:function(a,b,c){var d=this._listeners;if(d){if(a)a.off(b,"object"===typeof b?this:c,this),!b&&!c&&delete d[a._listenerId];else{"object"===typeof b&&(c=this);for(var e in d)d[e].off(b,c,this);this._listeners={}}return this}}};h.bind=h.on;h.unbind=h.off;f.extend(g,h);var r=g.Model=function(a,b){var c,d=a||{};this.cid=f.uniqueId("c");this.attributes={};b&&b.collection&&(this.collection=b.collection);b&&b.parse&&(d=this.parse(d,b)||{});if(c=f.result(this,"defaults"))d=f.defaults({},
d,c);this.set(d,b);this.changed={};this.initialize.apply(this,arguments)};f.extend(r.prototype,h,{changed:null,idAttribute:"id",initialize:function(){},toJSON:function(){return f.clone(this.attributes)},sync:function(){return g.sync.apply(this,arguments)},get:function(a){return this.attributes[a]},escape:function(a){return f.escape(this.get(a))},has:function(a){return null!=this.get(a)},set:function(a,b,c){var d,e,g,p,j,l,k;if(null==a)return this;"object"===typeof a?(e=a,c=b):(e={})[a]=b;c||(c={});
if(!this._validate(e,c))return!1;g=c.unset;p=c.silent;a=[];j=this._changing;this._changing=!0;j||(this._previousAttributes=f.clone(this.attributes),this.changed={});k=this.attributes;l=this._previousAttributes;this.idAttribute in e&&(this.id=e[this.idAttribute]);for(d in e)b=e[d],f.isEqual(k[d],b)||a.push(d),f.isEqual(l[d],b)?delete this.changed[d]:this.changed[d]=b,g?delete k[d]:k[d]=b;if(!p){a.length&&(this._pending=!0);b=0;for(d=a.length;b<d;b++)this.trigger("change:"+a[b],this,k[a[b]],c)}if(j)return this;
if(!p)for(;this._pending;)this._pending=!1,this.trigger("change",this,c);this._changing=this._pending=!1;return this},unset:function(a,b){return this.set(a,void 0,f.extend({},b,{unset:!0}))},clear:function(a){var b={},c;for(c in this.attributes)b[c]=void 0;return this.set(b,f.extend({},a,{unset:!0}))},hasChanged:function(a){return null==a?!f.isEmpty(this.changed):f.has(this.changed,a)},changedAttributes:function(a){if(!a)return this.hasChanged()?f.clone(this.changed):!1;var b,c=!1,d=this._changing?
this._previousAttributes:this.attributes,e;for(e in a)if(!f.isEqual(d[e],b=a[e]))(c||(c={}))[e]=b;return c},previous:function(a){return null==a||!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return f.clone(this._previousAttributes)},fetch:function(a){a=a?f.clone(a):{};void 0===a.parse&&(a.parse=!0);var b=a.success;a.success=function(a,d,e){if(!a.set(a.parse(d,e),e))return!1;b&&b(a,d,e)};return this.sync("read",this,a)},save:function(a,b,c){var d,e,g=this.attributes;
null==a||"object"===typeof a?(d=a,c=b):(d={})[a]=b;if(d&&(!c||!c.wait)&&!this.set(d,c))return!1;c=f.extend({validate:!0},c);if(!this._validate(d,c))return!1;d&&c.wait&&(this.attributes=f.extend({},g,d));void 0===c.parse&&(c.parse=!0);e=c.success;c.success=function(a,b,c){a.attributes=g;var k=a.parse(b,c);c.wait&&(k=f.extend(d||{},k));if(f.isObject(k)&&!a.set(k,c))return!1;e&&e(a,b,c)};a=this.isNew()?"create":c.patch?"patch":"update";"patch"===a&&(c.attrs=d);a=this.sync(a,this,c);d&&c.wait&&(this.attributes=
g);return a},destroy:function(a){a=a?f.clone(a):{};var b=this,c=a.success,d=function(){b.trigger("destroy",b,b.collection,a)};a.success=function(a,b,e){(e.wait||a.isNew())&&d();c&&c(a,b,e)};if(this.isNew())return a.success(this,null,a),!1;var e=this.sync("delete",this,a);a.wait||d();return e},url:function(){var a=f.result(this,"urlRoot")||f.result(this.collection,"url")||x();return this.isNew()?a:a+("/"===a.charAt(a.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},
isNew:function(){return null==this.id},isValid:function(a){return!this.validate||!this.validate(this.attributes,a)},_validate:function(a,b){if(!b.validate||!this.validate)return!0;a=f.extend({},this.attributes,a);var c=this.validationError=this.validate(a,b)||null;if(!c)return!0;this.trigger("invalid",this,c,b||{});return!1}});var s=g.Collection=function(a,b){b||(b={});b.model&&(this.model=b.model);void 0!==b.comparator&&(this.comparator=b.comparator);this.models=[];this._reset();this.initialize.apply(this,
arguments);a&&this.reset(a,f.extend({silent:!0},b))};f.extend(s.prototype,h,{model:r,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},sync:function(){return g.sync.apply(this,arguments)},add:function(a,b){a=f.isArray(a)?a.slice():[a];b||(b={});var c,d,e,g,p,j,l,k,h,m;l=[];k=b.at;h=this.comparator&&null==k&&!1!=b.sort;m=f.isString(this.comparator)?this.comparator:null;c=0;for(d=a.length;c<d;c++)(e=this._prepareModel(g=a[c],b))?(p=this.get(e))?b.merge&&(p.set(g===
e?e.attributes:g,b),h&&(!j&&p.hasChanged(m))&&(j=!0)):(l.push(e),e.on("all",this._onModelEvent,this),this._byId[e.cid]=e,null!=e.id&&(this._byId[e.id]=e)):this.trigger("invalid",this,g,b);l.length&&(h&&(j=!0),this.length+=l.length,null!=k?D.apply(this.models,[k,0].concat(l)):C.apply(this.models,l));j&&this.sort({silent:!0});if(b.silent)return this;c=0;for(d=l.length;c<d;c++)(e=l[c]).trigger("add",e,this,b);j&&this.trigger("sort",this,b);return this},remove:function(a,b){a=f.isArray(a)?a.slice():[a];
b||(b={});var c,d,e,g;c=0;for(d=a.length;c<d;c++)if(g=this.get(a[c]))delete this._byId[g.id],delete this._byId[g.cid],e=this.indexOf(g),this.models.splice(e,1),this.length--,b.silent||(b.index=e,g.trigger("remove",g,this,b)),this._removeReference(g);return this},push:function(a,b){a=this._prepareModel(a,b);this.add(a,f.extend({at:this.length},b));return a},pop:function(a){var b=this.at(this.length-1);this.remove(b,a);return b},unshift:function(a,b){a=this._prepareModel(a,b);this.add(a,f.extend({at:0},
b));return a},shift:function(a){var b=this.at(0);this.remove(b,a);return b},slice:function(a,b){return this.models.slice(a,b)},get:function(a){if(null!=a)return this._idAttr||(this._idAttr=this.model.prototype.idAttribute),this._byId[a.id||a.cid||a[this._idAttr]||a]},at:function(a){return this.models[a]},where:function(a){return f.isEmpty(a)?[]:this.filter(function(b){for(var c in a)if(a[c]!==b.get(c))return!1;return!0})},sort:function(a){if(!this.comparator)throw Error("Cannot sort a set without a comparator");
a||(a={});f.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(f.bind(this.comparator,this));a.silent||this.trigger("sort",this,a);return this},pluck:function(a){return f.invoke(this.models,"get",a)},update:function(a,b){b=f.extend({add:!0,merge:!0,remove:!0},b);b.parse&&(a=this.parse(a,b));var c,d,e,g,h=[],j=[],l={};f.isArray(a)||(a=a?[a]:[]);if(b.add&&!b.remove)return this.add(a,b);d=0;for(e=a.length;d<e;d++)c=a[d],g=this.get(c),
b.remove&&g&&(l[g.cid]=!0),(b.add&&!g||b.merge&&g)&&h.push(c);if(b.remove){d=0;for(e=this.models.length;d<e;d++)c=this.models[d],l[c.cid]||j.push(c)}j.length&&this.remove(j,b);h.length&&this.add(h,b);return this},reset:function(a,b){b||(b={});b.parse&&(a=this.parse(a,b));for(var c=0,d=this.models.length;c<d;c++)this._removeReference(this.models[c]);b.previousModels=this.models.slice();this._reset();a&&this.add(a,f.extend({silent:!0},b));b.silent||this.trigger("reset",this,b);return this},fetch:function(a){a=
a?f.clone(a):{};void 0===a.parse&&(a.parse=!0);var b=a.success;a.success=function(a,d,e){a[e.update?"update":"reset"](d,e);b&&b(a,d,e)};return this.sync("read",this,a)},create:function(a,b){b=b?f.clone(b):{};if(!(a=this._prepareModel(a,b)))return!1;b.wait||this.add(a,b);var c=this,d=b.success;b.success=function(a,b,f){f.wait&&c.add(a,f);d&&d(a,b,f)};a.save(null,b);return a},parse:function(a){return a},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models.length=
0;this._byId={}},_prepareModel:function(a,b){if(a instanceof r)return a.collection||(a.collection=this),a;b||(b={});b.collection=this;var c=new this.model(a,b);return!c._validate(a,b)?!1:c},_removeReference:function(a){this===a.collection&&delete a.collection;a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"===a||"remove"===a)&&c!==this||("destroy"===a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],null!=b.id&&(this._byId[b.id]=
b)),this.trigger.apply(this,arguments))},sortedIndex:function(a,b,c){b||(b=this.comparator);var d=f.isFunction(b)?b:function(a){return a.get(b)};return f.sortedIndex(this.models,a,d,c)}});f.each("forEach each map collect reduce foldl inject reduceRight foldr find detect filter select reject every all some any include contains invoke max min toArray size first head take initial rest tail drop last without indexOf shuffle lastIndexOf isEmpty chain".split(" "),function(a){s.prototype[a]=function(){var b=
u.call(arguments);b.unshift(this.models);return f[a].apply(f,b)}});f.each(["groupBy","countBy","sortBy"],function(a){s.prototype[a]=function(b,c){var d=f.isFunction(b)?b:function(a){return a.get(b)};return f[a](this.models,d,c)}});var y=g.Router=function(a){a||(a={});a.routes&&(this.routes=a.routes);this._bindRoutes();this.initialize.apply(this,arguments)},E=/\((.*?)\)/g,F=/(\(\?)?:\w+/g,G=/\*\w+/g,H=/[\-{}\[\]+?.,\\\^$|#\s]/g;f.extend(y.prototype,h,{initialize:function(){},route:function(a,b,c){f.isRegExp(a)||
(a=this._routeToRegExp(a));c||(c=this[b]);g.history.route(a,f.bind(function(d){d=this._extractParameters(a,d);c&&c.apply(this,d);this.trigger.apply(this,["route:"+b].concat(d));this.trigger("route",b,d);g.history.trigger("route",this,b,d)},this));return this},navigate:function(a,b){g.history.navigate(a,b);return this},_bindRoutes:function(){if(this.routes)for(var a,b=f.keys(this.routes);null!=(a=b.pop());)this.route(a,this.routes[a])},_routeToRegExp:function(a){a=a.replace(H,"\\$&").replace(E,"(?:$1)?").replace(F,
function(a,c){return c?a:"([^/]+)"}).replace(G,"(.*?)");return RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});var m=g.History=function(){this.handlers=[];f.bindAll(this,"checkUrl");"undefined"!==typeof window&&(this.location=window.location,this.history=window.history)},z=/^[#\/]|\s+$/g,I=/^\/+|\/+$/g,J=/msie [\w.]+/,K=/\/$/;m.started=!1;f.extend(m.prototype,h,{interval:50,getHash:function(a){return(a=(a||this).location.href.match(/#(.*)$/))?a[1]:""},getFragment:function(a,
b){if(null==a)if(this._hasPushState||!this._wantsHashChange||b){a=this.location.pathname;var c=this.root.replace(K,"");a.indexOf(c)||(a=a.substr(c.length))}else a=this.getHash();return a.replace(z,"")},start:function(a){if(m.started)throw Error("Backbone.history has already been started");m.started=!0;this.options=f.extend({},{root:"/"},this.options,a);this.root=this.options.root;this._wantsHashChange=!1!==this.options.hashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=!(!this.options.pushState||
!this.history||!this.history.pushState);a=this.getFragment();var b=document.documentMode,b=J.exec(navigator.userAgent.toLowerCase())&&(!b||7>=b);this.root=("/"+this.root+"/").replace(I,"/");b&&this._wantsHashChange&&(this.iframe=g.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a));if(this._hasPushState)g.$(window).on("popstate",this.checkUrl);else if(this._wantsHashChange&&"onhashchange"in window&&!b)g.$(window).on("hashchange",this.checkUrl);
else this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval));this.fragment=a;a=this.location;b=a.pathname.replace(/[^\/]$/,"$&/")===this.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!b)return this.fragment=this.getFragment(null,!0),this.location.replace(this.root+this.location.search+"#"+this.fragment),!0;this._wantsPushState&&(this._hasPushState&&b&&a.hash)&&(this.fragment=this.getHash().replace(z,""),this.history.replaceState({},document.title,
this.root+this.fragment+a.search));if(!this.options.silent)return this.loadUrl()},stop:function(){g.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);m.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a===this.fragment&&this.iframe&&(a=this.getFragment(this.getHash(this.iframe)));if(a===this.fragment)return!1;this.iframe&&this.navigate(a);this.loadUrl()||this.loadUrl(this.getHash())},
loadUrl:function(a){var b=this.fragment=this.getFragment(a);return f.any(this.handlers,function(a){if(a.route.test(b))return a.callback(b),!0})},navigate:function(a,b){if(!m.started)return!1;if(!b||!0===b)b={trigger:b};a=this.getFragment(a||"");if(this.fragment!==a){this.fragment=a;var c=this.root+a;if(this._hasPushState)this.history[b.replace?"replaceState":"pushState"]({},document.title,c);else if(this._wantsHashChange)this._updateHash(this.location,a,b.replace),this.iframe&&a!==this.getFragment(this.getHash(this.iframe))&&
(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,a,b.replace));else return this.location.assign(c);b.trigger&&this.loadUrl(a)}},_updateHash:function(a,b,c){c?(c=a.href.replace(/(javascript:|#).*$/,""),a.replace(c+"#"+b)):a.hash="#"+b}});g.history=new m;var A=g.View=function(a){this.cid=f.uniqueId("view");this._configure(a||{});this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()},L=/^(\S+)\s*(.*)$/,M="model collection el id attributes className tagName events".split(" ");
f.extend(A.prototype,h,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},setElement:function(a,b){this.$el&&this.undelegateEvents();this.$el=a instanceof g.$?a:g.$(a);this.el=this.$el[0];!1!==b&&this.delegateEvents();return this},delegateEvents:function(a){if(a||(a=f.result(this,"events"))){this.undelegateEvents();for(var b in a){var c=a[b];f.isFunction(c)||(c=this[a[b]]);
if(!c)throw Error('Method "'+a[b]+'" does not exist');var d=b.match(L),e=d[1],d=d[2],c=f.bind(c,this),e=e+(".delegateEvents"+this.cid);if(""===d)this.$el.on(e,c);else this.$el.on(e,d,c)}}},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=f.extend({},f.result(this,"options"),a));f.extend(this,f.pick(a,M));this.options=a},_ensureElement:function(){if(this.el)this.setElement(f.result(this,"el"),!1);else{var a=f.extend({},f.result(this,"attributes"));
this.id&&(a.id=f.result(this,"id"));this.className&&(a["class"]=f.result(this,"className"));a=g.$("<"+f.result(this,"tagName")+">").attr(a);this.setElement(a,!1)}}});var N={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};g.sync=function(a,b,c){var d=N[a];f.defaults(c||(c={}),{emulateHTTP:g.emulateHTTP,emulateJSON:g.emulateJSON});var e={type:d,dataType:"json"};c.url||(e.url=f.result(b,"url")||x());if(null==c.data&&b&&("create"===a||"update"===a||"patch"===a))e.contentType="application/json",
e.data=JSON.stringify(c.attrs||b.toJSON(c));c.emulateJSON&&(e.contentType="application/x-www-form-urlencoded",e.data=e.data?{model:e.data}:{});if(c.emulateHTTP&&("PUT"===d||"DELETE"===d||"PATCH"===d)){e.type="POST";c.emulateJSON&&(e.data._method=d);var h=c.beforeSend;c.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",d);if(h)return h.apply(this,arguments)}}"GET"!==e.type&&!c.emulateJSON&&(e.processData=!1);var m=c.success;c.success=function(a){m&&m(b,a,c);b.trigger("sync",b,a,c)};
var j=c.error;c.error=function(a){j&&j(b,a,c);b.trigger("error",b,a,c)};a=c.xhr=g.ajax(f.extend(e,c));b.trigger("request",b,a,c);return a};g.ajax=function(){return g.$.ajax.apply(g.$,arguments)};r.extend=s.extend=y.extend=A.extend=m.extend=function(a,b){var c=this,d;d=a&&f.has(a,"constructor")?a.constructor:function(){return c.apply(this,arguments)};f.extend(d,c,b);var e=function(){this.constructor=d};e.prototype=c.prototype;d.prototype=new e;a&&f.extend(d.prototype,a);d.__super__=c.prototype;return d};
var x=function(){throw Error('A "url" property or function must be specified');}}).call(this);


/*
    json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html
*/

var JSON;if(!JSON){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());

/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0.3
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe:not([src*='soundcloud.com'])",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        if (!$this.hasClass('highlight') && !$(document.body).hasClass('template-index')) {
          $this
            .parent('.fluid-width-video-wrapper')
            .wrap('<div class="max-width-video-wrapper"></div>')
            .parent('.max-width-video-wrapper').css({
                'maxWidth'   : 640,
                'marginLeft' : 'auto',
                'marginRight' : 'auto'
            });
        }

        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

/*!
 * imagesLoaded PACKAGED v3.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("eventEmitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(this,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function c(e){this.img=e}function f(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++){var s=i[r];this.addImage(s)}}},s.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),c.prototype=new t,c.prototype.check=function(){var e=v[this.img.src]||new f(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},c.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return f.prototype=new t,f.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},f.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},f.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},f.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},f.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},f.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});

/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 1.2.3
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    $.fn.overlaps = function(selector) {
        return this.pushStack(filterOverlaps(this, selector && $(selector)));
    };

    function filterOverlaps(collection1, collection2) {
        var dims1  = getDims(collection1),
            dims2  = !collection2 ? dims1 : getDims(collection2),
            stack  = [],
            index1 = 0,
            index2 = 0,
            length1 = dims1.length,
            length2 = !collection2 ? dims1.length : dims2.length;

        if (!collection2) { collection2 = collection1; }

        for (; index1 < length1; index1++) {
            for (index2 = 0; index2 < length2; index2++) {
                if (collection1[index1] === collection2[index2]) {
                    continue;
                } else if (checkOverlap(dims1[index1], dims2[index2])) {
                    stack.push( (length1 > length2) ?
                        collection1[index1] :
                        collection2[index2]);
                }
            }
        }

        return $.unique(stack);
    }

    function getDims(elems) {
        var dims = [], i = 0, offset, elem;

        while ((elem = elems[i++])) {
            offset = $(elem).offset();
            dims.push([
                offset.top,
                offset.left,
                elem.offsetWidth,
                elem.offsetHeight
            ]);
        }

        return dims;
    }

    function checkOverlap(dims1, dims2) {
        var x1 = dims1[1], y1 = dims1[0],
            w1 = dims1[2], h1 = dims1[3],
            x2 = dims2[1], y2 = dims2[0],
            w2 = dims2[2], h2 = dims2[3];
        return !(y2 + h2 <= y1 || y1 + h1 <= y2 || x2 + w2 <= x1 || x1 + w1 <= x2);
    }

}));

/*!
* Mobile Table
*
* Copyright 2013, Gray Gilmore - http://blog.graygilmore.com
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){

    $.fn.mobileTable = function( options ) {

        var settings = {
            breakpoint: 720
        };

        if ( options ) {
          $.extend( settings, options );
        }

        return this.each( function () {

            var table = $(this);

            if ( window.innerWidth < settings.breakpoint ) {

                if( table.hasClass('titles-ready') ) {
                    table.addClass('mobile-layout');
                    return
                }

                table.addClass('mobile-layout titles-ready');

                table.find('thead th').each( function (i) {
                    var columnTitle = $(this).text();
                    table.find('tr td:nth-child('+(i+1)+')').prepend('<span class="column-title">'+columnTitle+'</span>');
                });

            } else {

                table.removeClass('mobile-layout');

            }
        });
    };

})( jQuery );

/*********************************************************************
*  #### Twitter Post Fetcher v15.0.1 ####
*  Coded by Jason Mayes 2015. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/
(function(C,p){"function"===typeof define&&define.amd?define([],p):"object"===typeof exports?module.exports=p():p()})(this,function(){function C(a){if(null===r){for(var g=a.length,c=0,k=document.getElementById(D),f="<ul>";c<g;)f+="<li>"+a[c]+"</li>",c++;k.innerHTML=f+"</ul>"}else r(a)}function p(a){return a.replace(/<b[^>]*>(.*?)<\/b>/gi,function(a,c){return c}).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,"")}function E(a){a=a.getElementsByTagName("a");
for(var g=a.length-1;0<=g;g--)a[g].setAttribute("target","_blank")}function l(a,g){for(var c=[],k=new RegExp("(^| )"+g+"( |$)"),f=a.getElementsByTagName("*"),h=0,b=f.length;h<b;h++)k.test(f[h].className)&&c.push(f[h]);return c}function F(a){if(void 0!==a&&0<=a.innerHTML.indexOf("data-srcset"))return a=a.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0],decodeURIComponent(a).split('"')[1]}var D="",g=20,G=!0,v=[],x=!1,y=!0,w=!0,z=null,A=!0,B=!0,r=null,H=!0,I=!1,t=!0,J=!0,K=!1,m=null,L={fetch:function(a){void 0===
a.maxTweets&&(a.maxTweets=20);void 0===a.enableLinks&&(a.enableLinks=!0);void 0===a.showUser&&(a.showUser=!0);void 0===a.showTime&&(a.showTime=!0);void 0===a.dateFunction&&(a.dateFunction="default");void 0===a.showRetweet&&(a.showRetweet=!0);void 0===a.customCallback&&(a.customCallback=null);void 0===a.showInteraction&&(a.showInteraction=!0);void 0===a.showImages&&(a.showImages=!1);void 0===a.linksInNewWindow&&(a.linksInNewWindow=!0);void 0===a.showPermalinks&&(a.showPermalinks=!0);void 0===a.dataOnly&&
(a.dataOnly=!1);if(x)v.push(a);else{x=!0;D=a.domId;g=a.maxTweets;G=a.enableLinks;w=a.showUser;y=a.showTime;B=a.showRetweet;z=a.dateFunction;r=a.customCallback;H=a.showInteraction;I=a.showImages;t=a.linksInNewWindow;J=a.showPermalinks;K=a.dataOnly;var l=document.getElementsByTagName("head")[0];null!==m&&l.removeChild(m);m=document.createElement("script");m.type="text/javascript";m.src="https://cdn.syndication.twimg.com/widgets/timelines/"+a.id+"?&lang="+(a.lang||"en")+"&callback=twitterFetcher.callback&suppress_response_codes=true&rnd="+
Math.random();l.appendChild(m)}},callback:function(a){function m(a){var b=a.getElementsByTagName("img")[0];b.src=b.getAttribute("data-src-2x");return a}var c=document.createElement("div");c.innerHTML=a.body;"undefined"===typeof c.getElementsByClassName&&(A=!1);a=[];var k=[],f=[],h=[],b=[],q=[],n=[],e=0;if(A)for(c=c.getElementsByClassName("timeline-Tweet");e<c.length;){0<c[e].getElementsByClassName("timeline-Tweet-retweetCredit").length?b.push(!0):b.push(!1);if(!b[e]||b[e]&&B)a.push(c[e].getElementsByClassName("timeline-Tweet-text")[0]),
q.push(c[e].getAttribute("data-tweet-id")),k.push(m(c[e].getElementsByClassName("timeline-Tweet-author")[0])),f.push(c[e].getElementsByClassName("dt-updated")[0]),n.push(c[e].getElementsByClassName("timeline-Tweet-timestamp")[0]),void 0!==c[e].getElementsByClassName("timeline-Tweet-media")[0]?h.push(c[e].getElementsByClassName("timeline-Tweet-media")[0]):h.push(void 0);e++}else for(c=l(c,"timeline-Tweet");e<c.length;){0<l(c[e],"timeline-Tweet-retweetCredit").length?b.push(!0):b.push(!1);if(!b[e]||
b[e]&&B)a.push(l(c[e],"timeline-Tweet-text")[0]),q.push(c[e].getAttribute("data-tweet-id")),k.push(m(l(c[e],"timeline-Tweet-author")[0])),f.push(l(c[e],"dt-updated")[0]),n.push(l(c[e],"timeline-Tweet-timestamp")[0]),void 0!==l(c[e],"timeline-Tweet-media")[0]?h.push(l(c[e],"timeline-Tweet-media")[0]):h.push(void 0);e++}a.length>g&&(a.splice(g,a.length-g),k.splice(g,k.length-g),f.splice(g,f.length-g),b.splice(g,b.length-g),h.splice(g,h.length-g),n.splice(g,n.length-g));var c=[],e=a.length,d=0;if(K)for(;d<
e;)c.push({tweet:a[d].innerHTML,author:k[d].innerHTML,time:f[d].textContent,image:F(h[d]),rt:b[d],tid:q[d],permalinkURL:void 0===n[d]?"":n[d].href}),d++;else for(;d<e;){if("string"!==typeof z){var b=f[d].getAttribute("datetime"),u=new Date(f[d].getAttribute("datetime").replace(/-/g,"/").replace("T"," ").split("+")[0]),b=z(u,b);f[d].setAttribute("aria-label",b);if(a[d].textContent)if(A)f[d].textContent=b;else{var u=document.createElement("p"),r=document.createTextNode(b);u.appendChild(r);u.setAttribute("aria-label",
b);f[d]=u}else f[d].textContent=b}b="";G?(t&&(E(a[d]),w&&E(k[d])),w&&(b+='<div class="user">'+p(k[d].innerHTML)+"</div>"),b+='<p class="tweet">'+p(a[d].innerHTML)+"</p>",y&&(b=J?b+('<p class="timePosted"><a href="'+n[d]+'">'+f[d].getAttribute("aria-label")+"</a></p>"):b+('<p class="timePosted">'+f[d].getAttribute("aria-label")+"</p>"))):(w&&(b+='<p class="user">'+k[d].textContent+"</p>"),b+='<p class="tweet">'+a[d].textContent+"</p>",y&&(b+='<p class="timePosted">'+f[d].textContent+"</p>"));H&&(b+=
'<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to='+q[d]+'" class="twitter_reply_icon"'+(t?' target="_blank">':">")+'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id='+q[d]+'" class="twitter_retweet_icon"'+(t?' target="_blank">':">")+'Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id='+q[d]+'" class="twitter_fav_icon"'+(t?' target="_blank">':">")+"Favorite</a></p>");I&&void 0!==h[d]&&(b+='<div class="media"><img src="'+F(h[d])+'" alt="Image from tweet" /></div>');
c.push(b);d++}C(c);x=!1;0<v.length&&(L.fetch(v[0]),v.splice(0,1))}};return window.twitterFetcher=L});