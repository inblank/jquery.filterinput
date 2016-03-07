/*!
 * jQuery Filter Input - filter input in form fields
 * (c) 2016 Pavel Aleksandrov
 * MIT Licensed.
 *
 * https://github.com/inblank/jquery.filterinput
 */
/*global define, exports, module, jQuery, window, document*/
(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
    } else if (typeof exports === "object") {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    "use strict";

    var filter;

    /**
     * Filtering input
     * @returns {$.fn}
     */
    $.fn.filterinput = function () {
        this.each(function (i, el) {
            el = $(el);
            filter = el.data('filterinput');
            if (filter) {
                switch (filter) {
                    case 'alpha':
                        filter = /^[a-za-я]*$/i;
                        break;
                    case 'alphadigit':
                        filter = /^[a-zа-я0-9-\s]*$/i;
                        break;
                    case 'name':
                        filter = /^[a-zа-я-\s]*$/i;
                        break;
                    case 'digit':
                        filter = /^-?\d*((\.|,)\d{0,})?$/;
                        break;
                    case 'integer':
                        filter = /^-?\d*$/;
                        break;
                    case 'email':
                        filter = /^[a-z0-9]([-\w.]+(@([A-z0-9]([-A-z0-9]+(\.([a-z]{1,4})?)?)?)?)?)?$/i;
                        break;
                    default:
                        filter = new RegExp(filter, 'i');
                        console.log(filter);
                        break;
                }
                el.data('filterinput', filter)
            }
        }).on('keydown', function (e) {
                var obj = $(e.target),
                    filter = obj.data('filterinput');
                if (filter) {
                    if (obj.data('fi-repeat')) {
                        return false;
                    }
                    setTimeout(function () {
                        var val = obj.val();
                        if (!filter.test(val)) {
                            obj.data('fi-repeat', true); // flag for block repeat
                            obj.val(val.substr(0, val.length - 1));
                        } else {
                            obj.removeData('fi-repeat');
                        }
                    }, 1);
                }
            }
        ).on('keyup', function (e) {
                $(e.target).removeData('fi-repeat');
            }
        );
        return this;
    };
}));
