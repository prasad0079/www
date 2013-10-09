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
        this.el.on('click', '.change-pic-btn', this.changePicture);
    };

    this.render = function(){
        this.el.html(EmployeeView.template(employee));
        return this;
    };

    this.changePicture = function(event){
        event.preventDefault();
        if(!navigator.camera){
            app.showAlert("Camera Not supported", "Error");
            return;
        }

        var options = {     quality:50,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                            encodingType: 0     // 0=JPG 1=PNG
                      };

        navigator.camera.getPicture(
            function(imageData){
                $('.employee-image',this.el).attr('src', "data:image/jpeg;base64,"+imageData);
            },
            function(){
                app.showAlert("Error taking picture", "Error");
            },
            options);

        return false;
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