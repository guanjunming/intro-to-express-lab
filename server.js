const express = require("express");

const app = express();

// 1. Be Polite, Greet the User
app.get("/greetings/:name", (req, res) => {
  res.send(`Hello there, ${req.params.name}!`);
});

// 2. Rolling the Dice
app.get("/roll/:num", (req, res) => {
  const num = parseInt(req.params.num, 10);

  if (isNaN(num)) {
    return res.send("You must specify a number.");
  }

  const randNum = Math.floor(Math.random() * (num + 1));
  res.send(`You rolled a ${randNum}.`);
});

// 3. I Want THAT One!
app.get("/collectibles/:index", (req, res) => {
  const collectibles = [
    { name: "shiny ball", price: 5.95 },
    { name: "autographed picture of a dog", price: 10 },
    { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
  ];

  const index = parseInt(req.params.index, 10);

  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    return res.send("This item is not yet in stock. Check back soon!");
  }

  const item = collectibles[index];
  res.send(
    `So, you want the ${item.name}? For ${item.price}, it can be yours!`
  );
});

// 4. Filter Shoes by Query Parameters
app.get("/shoes", (req, res) => {
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" },
  ];

  const minPrice = parseFloat(req.query["min-price"]);
  const maxPrice = parseFloat(req.query["max-price"]);
  const type = req.query.type ? req.query.type.toLowerCase() : null;

  const filteredShoes = shoes.filter((shoe) => {
    const minPriceOk = isNaN(minPrice) || shoe.price >= minPrice;
    const maxPriceOk = isNaN(maxPrice) || shoe.price <= maxPrice;
    const typeOk = !type || shoe.type === type;
    return minPriceOk && maxPriceOk && typeOk;
  });

  res.json(filteredShoes);
});

app.listen(5001);
