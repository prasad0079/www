/**
 * Created with JetBrains WebStorm.
 * User: psango
 * Date: 10/8/13
 * Time: 10:28 PM
 * To change this template use File | Settings | File Templates.
 */

var EmployeeView = function(employee){
    this.initialize = function(){
        this.el = $('<div/>');
    };

    this.render = function(){
        this.el.html(EmployeeView.template(employee));
        return this;
    };

    this.initialize();
}

EmployeeView.template = Handlebars.compile($('#employee-tpl').html());