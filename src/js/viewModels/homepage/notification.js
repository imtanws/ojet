/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
    @zhangchunlin
*/

// notifications

'use strict';
define(['ojs/ojbutton'], function() {
    function basicHeaderVM(params) {
        var self = this;
        self.msg = params.msg || '';
        self.closeNotice = function() {
            $(".closeNotice").parent().css("display", "none")
        }

    }
  return basicHeaderVM;
});
