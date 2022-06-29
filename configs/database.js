const mongoose = require("mongoose");
const dbUri =
<<<<<<< HEAD
  //process.env.DEV_MODE === "true" ?
  // "mongodb://localhost:27017/storeDB"
  // "mongodb+srv://liorsas:Nati0307&@cluster0.80kdp.mongodb.net/usersDB?authSource=admin&replicaSet=atlas-mncsto-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
  "mongodb+srv://liorsas:Nati0307@store-app-clus.3gprwlk.mongodb.net/?retryWrites=true&w=majority";
=======
 
  "mongodb+srv://liorsas:Nati0307@store-app-clus.3gprwlk.mongodb.net/?retryWrites=true&w=majority"
>>>>>>> 8c724cea9a43ca8c2f99b80debad9626499fbbbb

mongoose
  .connect(process.env.MONGODB_URI || dbUri)
  .then((x) => console.log("succesful connected" + " " + dbUri))
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });
