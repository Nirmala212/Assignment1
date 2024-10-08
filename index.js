const express = require('express');
const app = express();

app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is listening at http://127.0.0.1:${PORT}`);
  console.log(`Endpoints:`);
  console.log(`http://127.0.0.1:${PORT}/products method: GET, POST`);
  console.log(`http://127.0.0.1:${PORT}/products/:id method: DELETE`);
});
let products = [];

//to retrieve all  the products
app.get('/products', (req,res) => {
    console.log('>prouducts GET: received request');
    res.json(products);
    console.log('< products GET: sending response');
});

// POST: Add a new product
app.post('/products', (req, res) => {
    console.log('> products POST: received request');
    const product = req.body;
    if (!product || !product.id || !product.name) {
      console.error('Error: Missing product information');
      return res.status(400).json({ error: 'Product data is incomplete' });
    }
    products.push(product);
    res.status(201).json({ message: 'Product added', product });
    console.log('< products POST: sending response');
  });
  
  // DELETE: Remove a product by ID
app.delete('/products/:id', (req, res) => {
    console.log('> products DELETE: received request');
    const id = parseInt(req.params.id);
    products = products.filter(product => product.id !== id);
    res.json({ message: 'Product deleted' });
    console.log('< products DELETE: sending response');
  });

