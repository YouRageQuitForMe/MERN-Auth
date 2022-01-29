const Restaurant = require("../models/User");

exports.handleInformations = async (req, res) => {

    const { newRestaurantName, restaurantOwner, restaurantMenu, restaurantNumber, restaurantAddress, restaurantDescription  } = req.body; 
    const restaurantName = req.params.id;

    let restaurantFound = await Restaurant.findOne({ restaurantName: restaurantName });

    if (restaurantFound) {
        try {
        await restaurantFound.updateOne({restaurantName: restaurantName}, {
            restaurantName: newRestaurantName,
            restaurantOwner: restaurantOwner,
            restaurantMenu: restaurantMenu,
            restaurantNumber: restaurantNumber,
            restaurantAddress: restaurantAddress,
            restaurantDescription: restaurantDescription
        });
        await restaurantFound.save();
        res.send("Informations updated")
    } catch (err) {
        res.send("Error when trying to update your informations!");
    }
    } else {
        res.send("This restaurant either doesn\'t exist or it\'s reset token has expires!");
    }
}