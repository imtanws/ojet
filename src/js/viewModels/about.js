/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';
define(['ojs/ojcore', 'knockout', 'jquery',
        'appController',
        'ojs/ojknockout',
        'ojs/ojrouter', 'ojs/ojmodule', 'ojs/ojmoduleanimations',
        'promise',
        'ojs/ojlistview', 
        'ojs/ojarraydataprovider', 
        'ojs/ojrouter',
        'ojs/ojbutton',
        'ojs/ojdialog',
        'ojs/ojinputtext',
        'ojs/ojlabel',
        'ojs/ojpopup'],
    function(oj, ko, $, app) {
    function aboutViewModel(moduleParams) {
        var self = this;

        self.scrollElem = document.body;
        var slogin = window.sessionStorage.getItem("isLogin")
        self.islogin = ko.observable('')
        self.islogin = slogin == 'true' ? 1 : 2
        self.username = ko.observable('')
        self.username = window.sessionStorage.getItem('username')
        var data = [{id: 1, name: '个人信息', pageId: '#page1', content: 'Mew, Furball, Puss', desc: '1'},
                {id: 2, name: '身份认证', pageId: '#page2', content: 'Add one more', desc: '1'},
                {id: 3, name: '还款计划', pageId: '#page3', content: 'Fried, Shake & Bake, Sautee', desc: '1'},
                {id: 4, name: '预约', pageId: '#page4', content: 'Bedroom to kitchen and back', desc: '1'},
                {id: 5, name: '收藏', pageId: '#page5', content: 'Milk, bread, meat, veggie, can, etc.', desc: '1'},
                {id: 6, name: '帮助中心', pageId: '#page6', content: '', desc: '1'},
                {id: 7, name: '设置', pageId: '#page7', content: 'TBD', desc: '1'}
        ];
        
        this.dataProvider = new oj.ArrayDataProvider(data, {
            keys:data.map(function(value) {
                return value.id;
            })
        });
        this.content = ko.observable("");
        this.gotoList = function(event, ui) {
            console.log(event.detail.value)
            document.getElementById("listview").currentItem = null;
            self.slide();
        };
        self.headerText = ko.observable('')
        self.listId = ko.observable('#page1')

        self.handleActivated = function(params) {
            var parentRouter = params.valueAccessor().params['ojRouter']['parentRouter'];

            this.gotoContent = function(event) {
                if (!window.sessionStorage.getItem('isLogin')) {
                    parentRouter.go('signin')
                    return;
                }
                if (event.detail.value != null){   
                    var row = data[event.detail.value-1];
                    self.content(row.content);
                    self.headerText(row.name)
                    self.listId(row.pageId)       
                    self.slide(true, row.pageId);
                }
            };
        }

        this.slide = function(val, id) {
            if (val) {
                $("#page0").hide()
                $(id).show()
                $("#header").hide()
            } else {
                $("#page0").show()
                $(self.listId()).hide()
                $("#header").show()
            }
        }

        this.formModule = {
            name: 'about/form',
            params: {
                toggle: self.gotoList
            }
        }

        this.uploadModule = {
            name: 'about/upload',
            params: {
                toggle: self.gotoList
            }
        }

        this.repaymentModule = {
            name: 'about/repayment',
            params: {
                toggle: self.gotoList
            }
        }

        self.info = {
            name: ko.observable(''),
            pwd: ko.observable('')
        }
        self.submit = function() {
            document.querySelector('#modalDialog1').close();
            window.sessionStorage.setItem("isLogin", true)
            window.sessionStorage.setItem("username", self.info.name())
            setTimeout(function() {
                app.pushClient.registerForNotifications();
                oj.Router.rootInstance.go('homepage');
            }, 1000)
        }

        // open social links popup
        self.openPopup = function() {
            var popup = document.getElementById('aboutPopup');
            popup.position = {
                "my": {
                    "horizontal": "center",
                    "vertical": "bottom"
                },
                "at": {
                    "horizontal": "center",
                    "vertical": "bottom"
                },
                "of": "window",
                "offset": {
                    "x": 0,
                    "y": -200
                }
            };
        
            // place initial focus on the popup instead of the first focusable element
            popup.initialFocus = 'popup';
        
            return popup.open('#profile-action-btn');
        };


    }
    return aboutViewModel;

    });
