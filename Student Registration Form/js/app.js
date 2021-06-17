function StudentVM() {
    this.firstName = ko.observable().extend({
        required: true,
        minLength: 2,
        maxLength: 30
    }),
        this.lastName = ko.observable().extend({
            required: true,
            minLength: 2,
            maxLength: 30
        }),
        this.selectedDate = ko.observable(),
        this.availableDates = ko.observableArray(
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
        ),
        this.selectedMonth = ko.observable(),
        this.availableMonths = ko.observableArray(
            ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"]
        ),
        this.selectedYear = ko.observable(),
        this.availableYears = ko.observableArray(
            [1900, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005]
        ),
        this.email = ko.observable().extend(
            {
                required: true
            }
        ),
        this.mobile = ko.observable().extend(
            {
                required: true
            }
        ),
        this.checkGender = ko.observable("Male"),
        this.address1 = ko.observable().extend(
            {
                required: true
            }
        ),
        this.address2 = ko.observable().extend(
            {
                required: true
            }
        ),
        this.city = ko.observable().extend(
            {
                required: true
            }
        ),
        this.zipCode = ko.observable().extend(
            {
                required: true
            }
        ),
        this.selectedState = ko.observable(),
        this.availableStates = ko.observableArray(
            ["Maharastra", "Rajasthan", "Uttar Pradesh", "Punjab", "Kerla", "Tamilnadu", "Gujrat"]
        ),
        this.selectedCountry = ko.observable(),
        this.availableCountries = ko.observableArray(
            ["India", "America", "Japan", "Nepal", "Srilanka", "China"]
        ),

        this.singing = ko.observable(true),
        this.dancing = ko.observable(true),
        this.drawing = ko.observable(),
        this.others = ko.observable(),
        this.otherHobby = ko.observable(),

        this.english1 = ko.observable().extend({ required: true, min: 33, max: 100 }),
        this.hindi1 = ko.observable().extend({ required: true, min: 33, max: 100 }),
        this.maths1 = ko.observable().extend({ required: true, min: 33, max: 100 }),
        this.science1 = ko.observable().extend({ required: true, min: 33, max: 100 }),
        this.social1 = ko.observable().extend({ required: true, min: 33, max: 100 }),

        this.english2 = ko.observable().extend({ required: true, min: 33, max: 100 }),
        this.hindi2 = ko.observable().extend({ required: true, min: 33, max: 100 }),
        this.maths2 = ko.observable().extend({ required: true, min: 33, max: 100 }),
        this.science2 = ko.observable().extend({ required: true, min: 33, max: 100 }),
        this.social2 = ko.observable().extend({ required: true, min: 33, max: 100 }),

        this.checkCourse = ko.observable("BSC"),

        this.tnc = ko.observable(false),

        this.dob = ko.computed(function () {
            return (
                this.selectedDate() + "/" + this.selectedMonth() + "/" + this.selectedYear()
            )
        }, this),

        this.address = ko.computed(function () {
            return (
                this.address1() + ", " + this.address2() + ", " + this.city() + ", " + this.selectedState() + " - " + this.zipCode() + ", " + this.selectedCountry()
            )
        }, this),

        this.totalMarks1 = ko.computed(function () {
            avg1 = ((Number(this.hindi1()) + Number(this.english1()) + Number(this.maths1()) + Number(this.science1()) + Number(this.social1())) * 100) / 500
            return avg1 + "%";
        }, this),

        this.totalMarks2 = ko.computed(function () {
            avg2 = ((Number(this.hindi2()) + Number(this.english2()) + Number(this.maths2()) + Number(this.science2()) + Number(this.social2())) * 100) / 500
            return avg2 + "%";
        }, this),

        this.hobbies = ko.observableArray(),
        this.students = ko.observableArray(),
        this.showResult = ko.observable(false);
}

this.saveData = function () {

    var errors = ko.validation.group(this);
    // console.log(" Outside : " + errors().length);

    this.showResult(true);

    if (errors().length > 0) {
        alert("Please fill correct data before preceding !");
        console.log("Inside if cond.");
        errors.showAllMessages(true);
        return false;
    }
    else {
        this.hobbies.removeAll();
        if (this.singing())
            this.hobbies.push("Singing");
        if (this.dancing())
            this.hobbies.push("Dancing");
        if (this.drawing())
            this.hobbies.push("Drawing");
        if (this.otherHobby()) {
            var hobby = this.otherHobby().toString().split(" ");
            this.hobbies.push.apply(this.hobbies, hobby);
        }

        // getting students details in array
        var existingEntries = JSON.parse(localStorage.getItem("students"));
        if (existingEntries == null) {
            existingEntries = [];
        }

        // adding new student in array
        existingEntries.push(this);
        // setting new student in local storage
        localStorage.setItem("students", ko.toJSON(existingEntries));
        alert("Details has been saved!");

        var tempList = JSON.parse(localStorage.getItem("students"));
        if (tempList != null) {
            this.students.removeAll();
            this.students.push.apply(this.students, tempList);
        }
    }
};

this.removeData = function (student) {
    console.log("this.students().length : " + this.students().length);
    console.log("student : " + student);
    this.students.remove(student);
    console.log(this.students().length);
    localStorage.setItem("students", ko.toJSON(this.students));
};

this.editData = function () {

};

// Activates knockout.js
ko.applyBindings(new StudentVM());






        // editBtn.onclick = function () {

        // }

        // deleteBtn.onclick = function () {
        //     localStorage.clear();
        //     table2.innerHTML = `&emsp; <h3> All data deleted from localStorage...</h3>`;
        // }

// }

// var StudentModel = function () {

//     var fName = document.getElementById("FirstName");
//     var lName = document.getElementById("LastName");
//     var date = document.getElementById("Date");
//     var month = document.getElementById("Month");
//     var year = document.getElementById("Year");
//     var email = document.getElementById("Email");
//     var mobile = document.getElementById("Mobile");
//     var gender = document.getElementById("Gender");
//     var addrs = document.getElementById("Address");
//     var city = document.getElementById("City");
//     var zip = document.getElementById("ZipCode");
//     var state = document.getElementById("State");
//     var country = document.getElementById("Country");
//     var course = document.getElementById("Course");
//     var form_data = document.getElementById("save-form");
//     var submitButton = document.getElementById("button1");
//     var keys = document.getElementById("keys");
//     var values = document.getElementById("values");
//     var editBtn = document.getElementById("edit");
//     var deleteBtn = document.getElementById("delete");

//     var keyArray = ["FirstName", "LastName", "Date", "Month", "Year", "Email", "Mobile", "Gender", "Address", "City", "ZipCode", "Country", "Course"];
//     var valArray = [fName, lName, date, month, year, year, mobile, gender, addrs, city, zip, country, course];
//     button1.onclick = function () {

//         for (let i = 0; i < keyArray.length; i++) {
//             let value = valArray[i].value;
//             if (value) {
//                 localStorage.setItem(keyArray[i], value);
//             }
//         }

//         window.alert("Date successfully saved in localStorage...");

//         console.log("Printing it from console ");
//         for (let i = 0; i < localStorage.length; i++) {
//             var key = localStorage.key(i);
//             var value = localStorage.getItem(key);
//             if (key == "http://127.0.0.1:5500/index.html save-form") {
//                 continue;
//             }
//             console.log(key + " : " + value); 
//             keys.innerHTML += `${key} <br/>`;
//             values.innerHTML += `${value} <br/>`;

//         }
//     }

//     editBtn.onclick = function () {

//     }

//     deleteBtn.onclick = function () {
//         localStorage.clear();
//         table2.innerHTML = `&emsp; <h3> All data deleted from localStorage...</h3>`;
//     }
// }

// // Activates knockout.js
// ko.applyBindings(new StudentVM());

// =========================================================================================

// var fName = document.getElementById("FirstName");
// var lName = document.getElementById("LastName");
// var date = document.getElementById("Date");
// var month = document.getElementById("Month");
// var year = document.getElementById("Year");
// var email = document.getElementById("Email");
// var mobile = document.getElementById("Mobile");
// var gender = document.getElementById("Gender");
// var addrs = document.getElementById("Address");
// var city = document.getElementById("City");
// var zip = document.getElementById("ZipCode");
// var state = document.getElementById("State");
// var country = document.getElementById("Country");
// var course = document.getElementById("Course");
// var form_data = document.getElementById("save-form");
// var submitButton = document.getElementById("button1");
// var keys = document.getElementById("keys");
// var values = document.getElementById("values");
// var editBtn = document.getElementById("edit");
// var deleteBtn = document.getElementById("delete");

// var keyArray = ["FirstName", "LastName", "Date", "Month", "Year", "Email", "Mobile", "Gender", "Address", "City", "ZipCode", "Country", "Course"];
// var valArray = [fName, lName, date, month, year, year, mobile, gender, addrs, city, zip, country, course];


// button1.onclick = function () {

//     for (let i = 0; i < keyArray.length; i++) {
//         let value = valArray[i].value;
//         if (value) {
//             localStorage.setItem(keyArray[i], value);
//         }
//     }

//     window.alert("Date successfully saved in localStorage...");

//     console.log("Printing it from console ");
//     for (let i = 0; i < localStorage.length; i++) {
//         var key = localStorage.key(i);
//         var value = localStorage.getItem(key);
//         if (key == "http://127.0.0.1:5500/index.html save-form") {
//             continue;
//         }
//         console.log(key + " : " + value);
//        // lsOutput.innerHTML += `${key}       :      ${value} <br />`;   
//        keys.innerHTML += `${key} <br/>`;
//        values.innerHTML += `${value} <br/>`;

//     }
// }

// editBtn.onclick = function(){

// }

// deleteBtn.onclick = function(){
//     localStorage.clear();
//     table2.innerHTML= `&emsp; <h3> All data deleted from localStorage...</h3>`;
// }


// var formId = "save-form"; // ID of the form
// var url = location.href; //  href for the page
// var formIdentifier = `${url} ${formId}`; // Identifier used to identify the form
// var submitButton = document.querySelector("#button1"); // select submit button
// let form = document.querySelector(`#${formId}`); // select form
// let formElements = form.elements; // get the elements in the form

// /**
//  * This function gets the values in the form
//  * and returns them as an object with the
//  * [formIdentifier] as the object key
//  * @returns {Object}
//  */
// var getFormData = () => {
//     let data = { [formIdentifier]: {} }; // create an empty object with the formIdentifier as the key and an empty object as its value
//     for (var element of formElements) {
//       if (element.name.length > 0) {
//         data[formIdentifier][element.name] = element.value;
//       }
//     }
//     return data;
//   };

//   submitButton.onclick = event => {
//     event.preventDefault();
//     data = getFormData();
//     localStorage.setItem(formIdentifier, JSON.stringify(data[formIdentifier]));
//     var message = "Form data has been saved successfully!";
//     alert(message);

//     for(let i=0; i<localStorage.length; i++) {
//         var key = localStorage.key(i);
//         console.log("localStorage.length "+localStorage.length);
//         console.log(` Keys is : ${key} and value is :${localStorage.getItem(key)}`);
//         console.log(key);
//        // alert(`${key}: ${localStorage.getItem(key)}`);
//         //document.getElementById("table2").innerHTML="<tr><td>"+key+"</td><td>"+localStorage.getItem(key)+"</td></tr>";
//       }
//   };

  // =============================================================================================


/**
 * This function displays a message
 * on the page for 1 second
 */
//   var displayAlert = message => {
//     alertBox.innerText = message; // add the message into the alert box
//     alertBox.style.display = "block"; // make the alert box visible
//     setTimeout(function() {
//       alertBox.style.display = "none"; // hide the alert box after 1 second
//     }, 1000);
//   };
// =============================================================================================

// var usersdata = JSON.parse( localStorage.getItem('key_users' ) );
// function validatelogin()
// {
//     usersdata = JSON.parse( localStorage.getItem('key_users' ) );
//     // var usernameinput   = document.getElementById("username");
//     // var passwordinput   = document.getElementById("password");
//     for(var p in usersdata)
//     {
//     //   console.log(p+':'+userdata[p].username+'|'+userdata[p].email);
//     //   if(usernameinput==userdata[p].username && passwordinput==userdata[p].password)
//     //   {
//     //      alert("Logged in successfully");
//     //   }
//     console.log(p);
//     }
// }
// validatelogin();
