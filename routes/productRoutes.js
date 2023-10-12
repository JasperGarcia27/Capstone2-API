// [SECTION] Dependecies and Modules
const express = require("express");
const productController = require("../controllers/productController")
const auth = require("../auth")
const {verify, verifyAdmin} = auth;

const router = express.Router();




router.post("/", verify, verifyAdmin, productController.addProduct)

router.get("/allProducts", productController.getAllProducts)

router.get("/allActiveProducts", productController.getAllActive)

router.get("/:productId", productController.getProduct)

router.put("/:productId", verify, verifyAdmin, productController.updateProduct)

router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct)

router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct)

router.post('/searchByName', productController.searchProductsByName);	





module.exports = router









