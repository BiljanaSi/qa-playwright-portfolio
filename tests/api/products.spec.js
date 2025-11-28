const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://fakestoreapi.com';

// ---------------------------
// Test GET all products
// ---------------------------
test('GET /products should return all products', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/products`);

  // 1. Check status code
  expect(response.status()).toBe(200);

  // 2. Parse JSON response
  const data = await response.json();

  // 3. Basic assertions
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);

  // 4. Check first product has id, title, price
  const first = data[0];
  expect(first).toHaveProperty('id');
  expect(first).toHaveProperty('title');
  expect(first).toHaveProperty('price');
});

// ---------------------------
// Test GET product by ID
// ---------------------------
test('GET /products/:id should return specific product', async ({ request }) => {
  const productId = 1;
  const response = await request.get(`${BASE_URL}/products/${productId}`);

  expect(response.status()).toBe(200);

  const product = await response.json();

  expect(product.id).toBe(productId);
  expect(product).toHaveProperty('title');
  expect(product).toHaveProperty('price');
});
test('GET /carts/:id should return correct cart structure', async ({ request }) => {
  const cartId = 1; 

  const response = await request.get(`https://fakestoreapi.com/carts/${cartId}`);
  expect(response.ok()).toBeTruthy();

  const data = await response.json();

   console.log('Fetched cart:', JSON.stringify(data));

  expect(data.id).toBe(1);
  expect(typeof data.userId).toBe('number');
  
  if (data.products.length > 0) {
    expect(data.products[0]).toHaveProperty('productId');
    expect(data.products[0]).toHaveProperty('quantity');
  }

  console.log("Filtered carts:", data.products);
});
test('should return carts within date range', async ({ request }) => {
  const response = await request.get('https://fakestoreapi.com/carts');
  expect(response.ok()).toBeTruthy();

  const carts = await response.json();

  const from = new Date("2020-03-01");
  const to = new Date("2020-03-05");

  const filtered = carts.filter(c => {
    const d = new Date(c.date);
    return d >= from && d <= to;
  });

  // Assert that filter works
  filtered.forEach(cart => {
    const d = new Date(cart.date);
    expect(d >= from && d <= to).toBe(true);
  });

  console.log("Filtered carts:", filtered.length);
});
