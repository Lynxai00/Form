//NIF validation
function validateNIF(dni) {
    var number
    var letr
    var letter
    var regex

    regex = /^\d{8}[a-zA-Z]$/;

    if (regex.test(dni) == true) {
        number = dni.substr(0, dni.length - 1);
        letr = dni.substr(dni.length - 1, 1);
        number = number % 23;
        letter = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letter = letter.substring(number, number + 1);
        if (letter != letr.toUpperCase()) {
            alert('Dni erroneo, la letra del NIF no se corresponde');
            return false;
        } else {
            alert('Dni correcto');
            return true;
        }
    } else {
        alert('Dni erroneo, formato no válido');
        return false;
    }
}

//IBAN validation
function validateIBAN(IBAN) {

    //Make it uppercase and get rid of spaces
    IBAN = IBAN.toUpperCase();
    IBAN = IBAN.trim();
    IBAN = IBAN.replace(/\s/g, "");

    var letter1,letter2,num1,num2;
    var isbanaux;

    //Max length is 24 characters
    if (IBAN.length != 24) {
        return false;
    }

    //Turn the letters into numbers
    letter1 = IBAN.substring(0, 1);
    letter2 = IBAN.substring(1, 2);
    num1 = getnumIBAN(letter1);
    num2 = getnumIBAN(letter2);
    //Substitute the letters for the numbers
    isbanaux = String(num1) + String(num2) + IBAN.substring(2);
    //Move the first 6 characters to the end of the string
    isbanaux = isbanaux.substring(6) + isbanaux.substring(0,6);

    //Calculate the rest by calling module97 function
    var rest = module97(isbanaux);
    if (rest == 1){
        return true;
    }
    return false;
}

function module97(iban) {
    var parts = Math.ceil(iban.length/7);
    var remainer = "";

    for (var i = 1; i <= parts; i++) {
        remainer = String(parseFloat(remainer+iban.substr((i-1)*7, 7))%97);
    }

    return remainer;
}

function getnumIBAN(letter) {
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters.search(letter) + 10;
}

//Swift validation

//Phone number validation
function validatePhoneNumber(number){
    number = number.trim();
    if(number.length == 9){
        return true;
    }
    return false;
}