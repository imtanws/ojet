'use strict';
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojfilepicker', 'ojs/ojbutton'],function(oj, ko, $){
    function TrainData(params) {
        var self = this;
        self.gotoList = params.toggle
        self.fileNames = ko.observableArray([]);
        this.disableControls = ko.observable(false);
        self.selectListener = function(event) {
            var files = event.detail.files;
            for (var i = 0; i < files.length; i++) {
            self.fileNames.push(files[i].name);
            }
        }
    };
    return TrainData
});