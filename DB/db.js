const mongoose = require("mongoose");

module.exports = async () => {
const connectionParams = {
 useNewUrlParser:true,
 useUnifiedTopology:true
}

try {
await mongoose.connect(process.env.MONGO_URL,connectionParams)
console.log("mongo db connection")
	
} catch (error) {
	console.log(error)
}
	
}