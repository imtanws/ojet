'use strict';
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtrain',
'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojdatetimepicker', 'ojs/ojselectcombobox'],function(oj, ko, $){
    function TrainData(params) {
        var self = this;
        self.info = params.info;
    };
    return TrainData
});