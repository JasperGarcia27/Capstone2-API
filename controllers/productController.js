const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");


// http://localhost:4000/products/
// - Create Product(Admin Only)
 module.exports.addProduct = (req, res) => {

    let newProduct = new Product({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price
    });

    if (req.body.price <= 0) {
    	return res.send({"message":"The price should not to be a zero or less than"});
    }
    else {
        return newProduct.save().then((product, error) => {
	    	if (error) {
	    		return res.send({"message":"Error Created"});
	        }
	        else {
	            return res.send({"message":"Product Successfully Created"});
	        }
	    })
	    .catch(err => res.send(err))
    }
    
};

// http://localhost:4000/products/allProducts
// - Retrieve All Products
module.exports.getAllProducts = (req, res) => {
	return Product.find({}).then(result => {
		return res.send(result);
	})
	.catch(err => res.send(err))
};

// http://localhost:4000/products/allActiveProducts
// - Retrieve All Active Products
module.exports.getAllActive = (req, res) => {
	return Product.find({isActive: true}).then(result => {
		return res.send(result);
	})

}

// http://localhost:4000/products/productId
// - Retrieve Single Product
module.exports.getProduct = (req, res) => {
	return Product.findById(req.params.productId).then(result => {
		return res.send(result);
	})

}

// http://localhost:4000/products/:productId
// - Update Product Information(Admin Only)
module.exports.updateProduct = (req, res) => {
	let updatedProduct = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	};

	return Product.findByIdAndUpdate(req.params.productId, updatedProduct).then((product, error) => {
		if (error) {
			return res.send(false)
		}
		else {
			return res.send({"message":"Product Updated"})
		}
	})

}

// http://localhost:4000/products/:productId/archive
// - Archive Product(Admin Only)
module.exports.archiveProduct = (req, res) => {
	let arcivedProduct = {isActive: false};
	return Product.findByIdAndUpdate(req.params.productId, arcivedProduct).then((product, error) => {
		if (error) {
			return res.send(false)
		}
		else {
			return res.send({"message":"Product Archive Successfully"})
		}
	})

}

// http://localhost:4000/products/:productId/activate
// - Activate Product(Admin Only)
module.exports.activateProduct = (req, res) => {
    let updateActiveField = {isActive: true}
    return Product.findByIdAndUpdate(req.params.productId, updateActiveField)
    .then((product, error) => {
    	if(error){
            return res.send(false)

        } else {
        	return res.send({"message":"Product's Activated"})
        }
    })
    .catch(err => res.send(err))
};

//[SECTION] Retrieve all courses
module.exports.getAllItem = (req, res) => {
	return Product.find({}).then(result => {
		return res.send(result);
	})
	.catch(err => res.send(err))
};

module.exports.searchProductsByName = async (req, res) => {
	try {
	  const { productName } = req.body;

	  // Use a regular expression to perform a case-insensitive search
	  const products = await Product.find({
		name: { $regex: productName, $options: 'i' }
	  });

	  res.json(products);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
};