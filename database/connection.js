const mongoose = require("mongoose");

function connectionDB() {
  if (mongoose.connections[0].readyState) {
    console.log("Already Connected to DB");
    return;
  }
  mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("Connected with DB");
  });
  mongoose.connection.on("error", (err) => {
    console.log("Error While Connecting", err);
  });
}

export default connectionDB;
