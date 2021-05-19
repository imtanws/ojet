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
        'promise',
        'ojs/ojlistview', 
        'ojs/ojarraydataprovider', 
        'ojs/ojbutton',
        'ojs/ojinputtext',
        'ojs/ojlabel',
        'ojs/ojpopup'],
    function(oj, ko, $, app) {
    function aboutViewModel() {
        var self = this;
        var data = [{id: 0, name: '个人信息', date: '', content: 'Mew, Furball, Puss'},
                {id: 1, name: '优惠券', date: '', content: 'Add one more'},
                {id: 2, name: '银行卡', date: '', content: 'Fried, Shake & Bake, Sautee'},
                {id: 3, name: '预约', date: '', content: 'Bedroom to kitchen and back'},
                {id: 4, name: '收藏', date: '', content: 'Milk, bread, meat, veggie, can, etc.'},
                {id: 5, name: '帮助中心', date: '', content: ''},
                {id: 6, name: '设置', date: '', content: 'TBD'}
        ];
        this.dataProvider = new oj.ArrayDataProvider(data, {
            keys:data.map(function(value) {
                return value.id;
            })
        });
        this.content = ko.observable("");
        this.gotoList = function(event, ui) {
            document.getElementById("listview").currentItem = null;
            self.slide();
        };

        this.gotoContent = function(event) {
            // debugger
            if (event.detail.value != null){   
                var row = data[event.detail.value];
                self.content(row.content);                    
                self.slide(true);
            }
        };

        this.slide = function(val) {
            // $("#ppp").toggleClass("demo-page1-hide");
            // $("#pppp").toggleClass("demo-page2-hide");
            if (val) {
                $("#page1").hide()
                $("#page2").show()
            } else {
                $("#page2").hide()
                $("#page1").show()
            }
        }




        var aboutContent = [{id: 'aboutDemo', title: '', label: 'About Demo' },
                          {id: 'privacyPolicy', title: 'Oracle Privacy Policy', label: 'Oracle Privacy Policy' }];

        self.handleActivated = function(params) {

        var parentRouter = params.valueAccessor().params['ojRouter']['parentRouter'];

        // add aboutList as default state on child router
        var routerConfigOptions = {
          'aboutList': { label: 'About', isDefault: true },
        };

        // add each about list item to the router
        aboutContent.forEach(function(item) {
          var id = item.id.toString();
          routerConfigOptions[id] = { label: item.title };
        });

        self.router = parentRouter.createChildRouter('about').configure(routerConfigOptions);

        var switcherCallback = function(context) {
          return app.pendingAnimationType;
        };

        // switch module based on router state
        self.moduleConfig = ko.pureComputed(function () {
          var moduleConfig;

          // pass the list content to the list view
          if(self.router.stateId() === 'aboutList') {
            moduleConfig = $.extend(true, {}, self.router.moduleConfig, {
              'params': { 'list': aboutContent },
              'animation': oj.ModuleAnimations.switcher(switcherCallback)
            });
          } else {
            // pass the list item content to the content view
            moduleConfig = $.extend(true, {}, self.router.moduleConfig, {
              'name': 'aboutContent',
              'params': { 'contentID': self.router.stateId() },
              'animation': oj.ModuleAnimations.switcher(switcherCallback)
            });
          }

          return moduleConfig;
        });

        return oj.Router.sync();
        };

        // dispose about page child router
        self.dispose = function(info) {
            self.router.dispose();
        };

        // handle go back
        self.goBack = function() {
        app.pendingAnimationType = 'navParent';
        window.history.back();
        };

        // navigate to about content
        self.optionChange = function(event) {
        var value = event.detail.value;
        if(value && value[0] !== null) {
          app.pendingAnimationType = 'navChild';
          self.router.go(value[0]);
        }
        };

        // open social links popup
        self.openPopup = function() {
        var popup = document.getElementById('aboutPopup');
        popup.position = {
          "my": {
            "horizontal": "center",
            "vertical": "top"
          },
          "at": {
            "horizontal": "center",
            "vertical": "top + 50"
          },
          "of": ".oj-hybrid-applayout-content",
          "offset": {
            "x": 0,
            "y": 10
          }
        };
        
        // place initial focus on the popup instead of the first focusable element
        popup.initialFocus = 'popup';
        
        return popup.open('#profile-action-btn');
        };


    }
    return aboutViewModel;

    });
