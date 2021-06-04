'use strict';
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojtrain',
'ojs/ojbutton', 'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojdatetimepicker'],function(oj, ko, $){
    function TrainData(params) {
        var self = this;


        self.gotoList = params.toggle
        this.disableControls = ko.observable(false);
        self.selectedStep2 = ko.observable('stp1');
        self.selectedLabel2 = ko.observable('Step One');
        self.stepArray = ko.observableArray([
            {label:'身份信息', id:'stp1'},
            {label:'职业信息', id:'stp2'},
            {label:'联系信息', id:'stp3'},
            {label:'银行卡', id:'stp4'}]);
        self.nextStep2 = function() {
            var train = document.getElementById("train2");
            var next = train.getNextSelectableStep();
            if(next != null) {
                self.selectedStep2(next);
                self.selectedLabel2(train.getStep(next).label);
            }
        }
        self.previousStep2 = function() {
            var train = document.getElementById("train2");
            var prev = train.getPreviousSelectableStep();
            if(prev != null) {
                self.selectedStep2(prev);
                self.selectedLabel2(train.getStep(prev).label);
            }
        }
        var idInfo = {
            name: ko.observable(''),
            credit: ko.observable(''),
            sex: ko.observable(''),
            date: ko.observable(''),
            address: ko.observable(''),
            phone: ko.observable(''),
            graduate: ko.observable(''),
            marry: ko.observable('')
        }
        this.idModule = {
            name: 'about/form/idcard',
            params: {
                info: idInfo
            }
        }
        var jobInfo = {
            industry: ko.observable(''),
            station: ko.observable(''),
            income: ko.observable(''),
            company: ko.observable(''),
            tel: ko.observable(''),
            address: ko.observable(''),
            time: ko.observable('')
        }
        this.jobModule = {
            name: 'about/form/job',
            params: {
                info: jobInfo
            }
        }
        var connectInfo = {
            email: ko.observable(''),
            connection: ko.observable(''),
            type: ko.observable(''),
            name: ko.observable(''),
            tel: ko.observable('')
        }
        this.connectModule = {
            name: 'about/form/connection',
            params: {
                info: connectInfo
            }
        }
        var bankCardInfo = {
            card: ko.observable(''),
            cardNumber: ko.observable('')
        }
        this.bankCardModule = {
            name: 'about/form/bankCard',
            params: {
                info: bankCardInfo
            }
        }
    };
    return TrainData
});