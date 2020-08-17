# user_registration

#Prerequisite
1. npm installed on your machine
2. xampp installed on your machine

#steps to follow
1. clone this project on your local machine
2. Open application using visualstudio IDE and run the server by running cmd ===> "npm start"

#Notes for application

1. implemented different validity check for Registration form check like

    a. FirstName and LastName should contain only Alphabet
    b. Username can contain Alphanumeric but all small charaters, capital characters NOT allowed
    c. Username cannot be DUPLICATE, unique only.
    d. password should be minimum 8 characters long
    e. file upload is Mandatory

2. Login page
    a. Both field is required
    b. check for correct combination of username and password from DB

3. Logout will logout and redirect to registration page