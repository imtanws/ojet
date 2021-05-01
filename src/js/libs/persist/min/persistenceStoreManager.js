/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define([],function(){"use strict";var a=function(){Object.defineProperty(this,"_stores",{value:{},writable:!0}),Object.defineProperty(this,"_factories",{value:{},writable:!0}),Object.defineProperty(this,"_DEFAULT_STORE_FACTORY_NAME",{value:"_defaultFactory",writable:!1})};return a.prototype.registerStoreFactory=function(a,b){if(!b)throw TypeError("A valid factory must be provided.");if(!a)throw TypeError("A valid name must be provided.");var c=this._factories[a];if(c&&c!==b)throw TypeError("A factory with the same name has already been registered.");this._factories[a]=b},a.prototype.registerDefaultStoreFactory=function(a){this.registerStoreFactory(this._DEFAULT_STORE_FACTORY_NAME,a)},a.prototype.openStore=function(a,b){var c=this._stores[a],d=b&&b.version||"0";if(c&&c[d])return Promise.resolve(c[d]);var e=this._factories[a];if(e||(e=this._factories[this._DEFAULT_STORE_FACTORY_NAME]),!e)return Promise.reject(new Error("no factory is registered to create the store."));var f=this;return new Promise(function(g,h){e.createPersistenceStore(a,b).then(function(b){c=c||{},c[d]=b,f._stores[a]=c,g(b)},function(a){h(a)})})},a.prototype.hasStore=function(a,b){var c=this._stores[a];return!!c&&(!b||!b.version||!!c[b.version])},a.prototype.deleteStore=function(a,b){var c=this._stores[a];if(c){var d=b&&b.version;if(d){var e=c[d];return e?new Promise(function(a,b){e.delete().then(function(){delete c[d],a(!0)}).catch(function(a){b(a)})}):Promise.resolve(!1)}var f=Object.keys(c).map(function(a){return function(b){return a[b].delete()}}(c),this),g=this;return new Promise(function(b,c){Promise.all(f).then(function(){delete g._stores[a],b(!0)}).catch(function(a){c(a)})})}return Promise.resolve(!1)},new a});
//# sourceMappingURL=persistenceStoreManager.js.map