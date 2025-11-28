const { test, expect } = require('@playwright/test');

test('GET /booking/:id should return valid booking', async ({ request }) => {
  const bookingId = 1; // koristimo poznat ID iz demo API-ja


  const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);


  expect(response.status()).toBe(200);

 
  const data = await response.json();

 
  console.log("Booking response:", JSON.stringify(data));

  
  expect(data).toHaveProperty('firstname');
  expect(data).toHaveProperty('lastname');
  expect(data).toHaveProperty('totalprice');
  expect(data).toHaveProperty('bookingdates');

  
  expect(typeof data.firstname).toBe('string');
  expect(typeof data.lastname).toBe('string');
});
