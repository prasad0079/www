/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.bodyInit();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //this.homeTpl = Handlebars.compile($("#home-tpl").html());
        //this.employeeLiTpl = Handlebars.compile($("employee-li-tpl").html());
        this.bodyInit();
    },

    route: function() {
        var hash = window.location.hash;
        if (!hash) {
            $('body').html(new HomeView(this.store).render().el);
            return;
        }
        var match = hash.match(app.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function(employee) {
                $('body').html(new EmployeeView(employee).render().el);
            });
        }
    },

    registerEvents: function(){
        var self = this;
        if(document.documentElement.hasOwnProperty('ontouchstart')){
            $('body').on('touchstart', 'a', function(event){
              $(event.target).addClass('tappable-active');
            });

            $('body').on('touchend', 'a', function(event){
                $(event.target).removeClass('tappable-active');
            });

        }else{
            $('body').on('mousedown', 'a', function(event){
                $(event.target).addClass('tappable-active');
            });

            $('body').on('mouseup','a',function(event){
                $(event.target).removeClass('tappable-active');
            });
        }
        $('window').on('hashchange', $.proxy(this.route, this));
    },

    /*findByName: function() {
        var self = this;
        this.store.findByName($('.search-key').val(), function(employees){
            $('.employee-list').html(self.employeeLiTpl(employees));
        })
    },*/
    alertCallBack: function(){
        //console.log("alert call back function called")
    },

    showAlert: function(msg, title){
        if(navigator.notification){
            navigator.notification.alert(message, this.alertCallBack, title, 'OK');
        }else{
            alert(title ? (title + ": " + msg) : msg);
        }
    },

    /*renderHomeView: function(){
        $('body').html(this.homeTpl);
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },*/

    bodyInit:function(){
        //Start of the custom code execution
        /*this.homeTpl = Handlebars.compile($("#home-tpl").html());
        this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        */

        var self = this;
        this.detailsURL = /^#employees\/(\d{1,})/;
        self.registerEvents();
        this.store = new MemoryStore(function(){
            //self.showAlert('Store initialized', 'info');
            //self.renderHomeView();

            //$('body').html(new HomeView(self.store).render().el);
            self.route();
        });

         /*this.store = new LocalStorageStore(function(){
            //self.showAlert('Store initialized', 'info');
             self.renderHomeView();
         });*/

         /*this.store = new WebSqlStore(function(){
         self.showAlert('Store initialized', 'info');
         }); */
    }
};
