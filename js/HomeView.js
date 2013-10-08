/**
 * Created with JetBrains WebStorm.
 * User: psango
 * Date: 10/8/13
 * Time: 12:33 AM
 * To change this template use File | Settings | File Templates.
 */
var HomeView = function(store){
    this.initialize = function(){
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByName);
    };

    this.render = function(){
        this.el.html(HomeView.template());
        return this;
    };

    /*this.findByName = function() {
        var self = this;
        store.findByName($('.search-key').val(), function(employees){
            $('.employee-list').html(HomeView.liTemplate(employees));
        });
    };*/

    this.findByName = function() {
        store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(HomeView.liTemplate(employees));
            if (self.iscroll) {
                console.log('Refresh iScroll');
                self.iscroll.refresh();
            } else {
                console.log('New iScroll');
                self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
            }
        });
    };

    this.initialize();
}

HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#employee-li-tpl").html());


