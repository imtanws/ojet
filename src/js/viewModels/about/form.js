'use strict';
define(['ojs/ojcore', 
        'knockout', 
        'jquery',
        'dataService',
        'ojs/ojknockout', 
        'ojs/ojtrain',
        'ojs/ojbutton', 
        'ojs/ojinputtext', 
        'ojs/ojlabel', 
        'ojs/ojdatetimepicker'],
    function(oj, ko, $, data){
    function TrainData(params) {
        var self = this;
        self.timer = {
            timer1: 0,
            timer2: 0,
            timer3: 0,
            timer4: 0
        }

        self.gotoList = function() {
            [idInfo, jobInfo, connectInfo, bankCardInfo].forEach(function(item) {
                for(let key in item) {
                    if (typeof item[key] == 'function') {
                        item[key] = item[key]()
                    }
                }
            })
            var info = {
                idInfo: idInfo,
                jobInfo: jobInfo,
                connectInfo: connectInfo,
                bankCardInfo: bankCardInfo,
                timer: {
                    timer1: self.timer.timer2 - self.timer.timer1,
                    timer2: self.timer.timer3 - self.timer.timer2,
                    timer3: self.timer.timer4 - self.timer.timer3,
                    timer4: Date.now() - self.timer.timer4
                }
            }
            var pass = self.notNull();
            if (!pass) {
                return
            }
            data.sendUserInfo(info).then(function(res) {
                if (res.code !== 1) {
                    alert(res.err)
                    return
                }
                window.sessionStorage.setItem('info', '2')
                params.toggle()
                self.selectedStep2('stp1')
                self.clearInfo()
            })
        }
        self.clearInfo = function(info) {
            [idInfo, jobInfo, connectInfo, bankCardInfo].forEach(function(item) {
                for(let key in item) {
                    if (typeof item[key] == 'function') {
                        item[key] = item[key]('')
                    } else {
                        item[key] = ''
                    }
                }
            })
        }
        self.notNull = function() {
            var pass = false
            switch (self.selectedStep2()) {
                case 'stp1':
                    pass = self.judge(idInfo);
                    break;
                case 'stp2':
                    pass = self.judge(jobInfo);
                    break;
                case 'stp3':
                    pass = self.judge(connectInfo);
                    break;
                case 'stp4':
                    pass = self.judge(bankCardInfo);
                    break; 
            }
            return pass
        }
        self.judge = function(obj) {
            for(var key in obj) {
                if (typeof obj[key] === 'function') {
                    if (obj[key]() === '') {
                        console.log(obj[key]())
                        alert('请再仔细检查下哦', key)
                        return false
                    }
                } else {
                    if (obj[key] === '') {
                        alert('请再仔细检查下哦', key)
                        return false
                    }
                }
            }
            return true
        }
        this.disableControls = ko.observable(false);
        self.selectedStep2 = ko.observable('stp1');
        self.stepArray = ko.observableArray([
            {label:'身份信息', id:'stp1'},
            {label:'职业信息', id:'stp2'},
            {label:'联系信息', id:'stp3'},
            {label:'银行卡', id:'stp4'}]);
        self.nextStep2 = function() {
            var train = document.getElementById("train2");
            var next = train.getNextSelectableStep();
            var pass = self.notNull()
            if (!pass) {
                return
            }
            if(next != null) {
                self.selectedStep2(next);
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
            username: ko.observable(''),
            idcard: ko.observable(''),
            sex: ko.observable(''),
            date: ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(2014, 1, 1))),
            address: ko.observable(''),
            phone: ko.observable(''),
            study: ko.observable(''),
            marry: ko.observable('')
        }
        this.idModule = {
            name: 'about/form/idcard',
            params: {
                info: idInfo,
                timer: self.timer
            }
        }
        var jobInfo = {
            industry: ko.observable(''),
            station: ko.observable(''),
            income: ko.observable(''),
            company: ko.observable(''),
            cphone: ko.observable(''),
            caddress: ko.observable(''),
            ctime: ko.observable('')
        }
        this.jobModule = {
            name: 'about/form/job',
            params: {
                info: jobInfo,
                timer: self.timer
            }
        }
        var connectInfo = {
            lemail: ko.observable(''),
            lindustry: ko.observable(''),
            lstation: ko.observable(''),
            lname: ko.observable(''),
            lphone: ko.observable('')
        }
        this.connectModule = {
            name: 'about/form/connection',
            params: {
                info: connectInfo,
                timer: self.timer
            }
        }
        var bankCardInfo = {
            bankname: ko.observable(''),
            bankid: ko.observable('')
        }
        this.bankCardModule = {
            name: 'about/form/bankCard',
            params: {
                info: bankCardInfo,
                timer: self.timer
            }
        }
    };
    return TrainData
});