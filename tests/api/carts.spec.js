const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://fakestoreapi.com';

// ---------------------------
// Test POST /carts
// ---------------------------

test('GET /carts/:id should return an existing cart', async ({ request }) => {
  const existingId = 1; // FakeStoreAPI always has cart with id = 1

  const response = await request.get(`https://fakestoreapi.com/carts/${existingId}`);
  expect(response.ok()).toBeTruthy();

  const data = await response.json();
  expect(data.id).toBe(existingId);
  expect(data.userId).toBeGreaterThan(0);
  expect(data.products.length).toBeGreaterThan(0);
});


// ---------------------------
// Test GET /carts/:id
// ---------------------------
test('GET /carts/:id should return a cart', async ({ request }) => {
  const cartId = 1; // Known existing ID in FakeStoreAPI

  const getResponse = await request.get(`https://fakestoreapi.com/carts/${cartId}`);

  
  expect(getResponse.ok()).toBeTruthy();

  expect(getResponse.status()).toBe(200);

  const cartData = await getResponse.json();
  expect(cartData.id).toBe(cartId);
  expect(cartData.userId).toBeGreaterThan(0);
  expect(cartData.products.length).toBeGreaterThan(0);
});

// ---------------------------
// Test DELETE /carts/:id
// ---------------------------
test('DELETE /carts/:id should delete the cart', async ({ request }) => {
  const createResponse = await request.post(`${BASE_URL}/carts`, {
    data: { userId: 1, date: '2025-11-27', products: [{ productId: 1, quantity: 1 }] }
  });
  const createdCart = await createResponse.json();

  const deleteResponse = await request.delete(`${BASE_URL}/carts/${createdCart.id}`);
  expect([200, 204]).toContain(deleteResponse.status());
});

// ---------------------------
// Test PUT /carts/:id
// ---------------------------
test('PUT /carts/:id should update the cart', async ({ request }) => {
  const createResponse = await request.post(`${BASE_URL}/carts`, {
    data: { userId: 1, date: '2025-11-27', products: [{ productId: 1, quantity: 1 }] }
  });
  const createdCart = await createResponse.json();

  const updatedPayload = {
    userId: 1,
    date: '2025-11-28',
    products: [{ productId: 1, quantity: 3 }]
  };

  const putResponse = await request.put(`${BASE_URL}/carts/${createdCart.id}`, {
    data: updatedPayload
  });
  expect(putResponse.status()).toBe(200);

  const updatedCart = await putResponse.json();
  expect(updatedCart.products[0].quantity).toBe(3);
});
