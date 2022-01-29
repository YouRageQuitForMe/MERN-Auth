exports.checkNameValidity = (name, res) => {
    var nameRegExp = /[A-z]{2,25}/;
    if (!nameRegExp.test(name)) {
        res.send("Use a valid name for your restaurant!")
        return false;
    }
    return true;
}


exports.checkEmailValidity = async (email, res, restaurant) => {
    var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegExp.test(email)) {
        res.send("Use a valid email!")
        return false;
    }
    
    let response = await restaurant.findOne({restaurantEmail: email})
    console.log(response)
    if (response) {
        res.send("This email is already in use");
        return false;
    }

    return true;
}

exports.checkPasswordValidity = (password, res) => {
    var pswRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!pswRegExp.test(password)) {
        res.send("Password doesn\'t match the requirements (At least one uppercase letter, a number and symbol")
        return false;
    }
    return true;
}

