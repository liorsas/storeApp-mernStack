const mongoose = require("mongoose");
const dbUri =
 
  "mongodb+srv://liorsas:Nati0307@store-app-mern-stack.vv1bu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(process.env.MONGODB_URI || dbUri)
  .then((x) => console.log("succesful connected" + " " + dbUri))
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });
