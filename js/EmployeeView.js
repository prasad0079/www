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
        alert("hhooo hooo")
        this.el.on('click', '.add-location-btn', this.addLocation);
        this.el.on('click', '.add-contact-btn', this.addToContacts);
    };

    this.render = function(){
        this.el.html(EmployeeView.template(employee));
        return this;
    };

    this.addLocation = function(event){
        event.preventDefault();
        console.log("Add location");
        navigator.geolocation.getCurrentPosition(
            function (position){
                $('.location', this.el).html(position.coords.latitude + ", " + position.coords.longitude);
            },
            function (){
                alert("Error getting location");
            }
        );
        return false;
    };

    this.onSuccess = function(contact) {
        alert("Save Success");
    };

    this.onError = function(contactError) {
        alert("Error = " + contactError.code);
    };

    this.addToContacts = function(event){
        event.preventDefault();
        if(!navigator.contacts){
            app.showAlert("Contacts API not supported", "Error");
            return;
        }else{
            app.showAlert("Contacts API supported", "Success");
        }
        var contact = navigator.contacts.create();
        contact.name = {givenName:employee.firstName, familyName:employee.lastName};
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
        phoneNumbers[1] = new ContactField('home', employee.cellPhone, true);
        contact.phoneNumbers = phoneNumbers;
        contact.save(this.onSuccess, this.onError);
        return false;
    };

    this.initialize();
}

EmployeeView.template = Handlebars.compile($('#employee-tpl').html());