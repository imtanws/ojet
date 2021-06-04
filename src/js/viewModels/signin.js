/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

 // signin page viewModel
 // In a real app, replace it with your authentication and logic
'use strict';
define(['ojs/ojcore', 'knockout', 'jquery', 'appController',
        'ojs/ojrouter',
        'ojs/ojknockout',
        'ojs/ojcheckboxset',
        'ojs/ojinputtext',
        'ojs/ojbutton',
        'ojs/ojanimation'], function(oj, ko, $, app) {
  function signinViewModel() {
    var self = this;

    self.handleTransitionCompleted = function(info) {
      var animateOptions = { 'delay': 0, 'duration': '1s', 'timingFunction': 'ease-out' };
      oj.AnimationUtils['fadeIn']($('.demo-signin-bg')[0], animateOptions);
    }

    // Replace with state save logic for rememberUserName
    self.userName = ko.observable('');
    self.userName = 'zcl'
    self.passWord = ko.observable('123');

    // Replace with sign in authentication
    self.signIn = function() {
      window.sessionStorage.setItem("isLogin", true)
      window.sessionStorage.setItem("username", self.userName)
      app.pushClient.registerForNotifications();
      oj.Router.rootInstance.go('homepage');
    };

    self.hangIn = function() {
      window.sessionStorage.setItem("isLogin", false)
      window.sessionStorage.setItem("username", '')
      app.pushClient.registerForNotifications();
      oj.Router.rootInstance.go('homepage')
    }

  }
  return signinViewModel;
});
