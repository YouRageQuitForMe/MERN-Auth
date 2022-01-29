const schedule = require("node-schedule");
const Restaurant = require("../models/User"); 

async function job() {
    const time_interval = 59;
    schedule.scheduleJob(`*/${time_interval} * * * *`, () => {
        console.log("DELETING");
        if (Restaurant.find({restaurantConfirmed: false})) {
            Restaurant.collection.deleteMany({restaurantConfirmed: false})
            console.log("DELETED")
        }
    })
}

module.exports = job;