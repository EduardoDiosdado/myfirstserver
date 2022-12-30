//Setting vars
const pm = require("./pm.js");
const express = require("express");
const app = express();
const data = new pm.ProductManager("../data/products.json");

//Adding products to data
data.addProducts("Apple", "Red", 5, "test", 10, 35);
data.addProducts("Box", "Brown", 10, "test", 11, 40);
data.addProducts("Pinaple", "Yellow", 7, "test", 12, 22);
data.addProducts("Notebook", "Blue", 15, "test", 16, 75);
data.addProducts("Pencil", "Black", 3, "test", 17, 10);
data.addProducts("Bottle", "Purple", 30, "test", 20, 11);

//Setting server

//endpoints

app.get("/products", (req, res) => {
  const result = data.getProducts;
  const limit = req.query.limit;
  if (limit && !isNaN(Number(limit))) {
    res.send(result.slice(0, limit));
  }
  res.send(result);
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const result = data.getProductById(id)
  res.send(result);
});

// //launch
app.listen(3000);
