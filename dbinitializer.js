const mongoose = require('mongoose');
const Inventory = require('./inventoryModel');
const inventoryData = require('./inventory.json');

mongoose.connect(`mongodb://localhost:27017/inventoryDB`, {useNewUrlParser: true});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	db.dropDatabase(err => {
		if(err) return console.log("Error dropping database:", err);
		console.log("Dropped inventory tracking system database successfully. Starting re-creation.");

        Inventory.init(err => {
            if(err) return console.log("Error initialize inventory model:", err);
            Inventory.insertMany(inventoryData, (err, result) => {
                if(err) return console.log("Error insert inventory data:", err);
                console.log(`${result.length} inventory data added.`);
                db.close;
                process.exit(0);
            });
        });
	});
});
