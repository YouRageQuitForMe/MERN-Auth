//  table, price, order
const Table = require("../../models/Table");
const Restaurant = require("../../models/User");

const handleOrder = async (req, res) => {
    const { email, table_number, person_price, nome, antipasti, primi, secondi, contorni, dolci, bevande  } = req.body;

    let restaurantFound = await Restaurant.find({restaurantEmail: email});
    if (restaurantFound) {
        let tableFound = await Table.find({restaurantEmail: email, tableNumber: table_number});
        if (tableFound) { 
            let table = new Table({
                tableNumber: table_number,
            })
        }
    }
}

// tableNumber: {type: Number, required: true},
// tableOrder: Array,
// tableOrderNumber: Number,
// tableAllOrders: Array,
// tableOverallPrice: Number,
// tablePeople: Array

//people: 2
// let arr = [
//     {
//         person_price: 55,
//         order_number: 1,
//         nome: "Aurora",
//         antipasti: ["bruschette", "patatine"],
//         primi: ["pasta e fagioli"],
//         secondi: ["salsiccia", "burgir"],
//         contorni: ["patate", "verza"],
//         dolci: ["cornetto", "nutella"],
//         bevande: ["gassosa", "acqua"]
//     },
//     {
//         person_price: 47.5,
//         order_number: 2,
//         nome: "Giacomo",
//         antipasti: ["panino", "tortino"],
//         primi: ["pasta e patate"],
//         secondi: ["vegburgir"],
//         contorni: ["patatine", "spinaci"],
//         dolci: ["torta"],
//         bevande: ["fanta", "cola"]
//     }
// ]