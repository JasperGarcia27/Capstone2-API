// [SECTION] Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")

const port = 4010;


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors())


app.use("/b10/users", userRoutes)
app.use("/b10/products", productRoutes)



mongoose.connect("mongodb+srv://jaspergarcia200127:admin123@course-booking.kxhpoat.mongodb.net/E-commerceAPI?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


mongoose.connection.once("open", () => console.log("Now conneceted to MongoDB Atlas"));
















if(require.main === module) {
	app.listen(process.env.PORT || port, () => {
		console.log(`API is now online on port ${process.env.PORT || port}`);
	})
}

module.exports = {app, mongoose};