import { test, expect } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

test('E2E booking test: POST → GET → PUT → DELETE', async ({ request }) => {

  // -----------------------------
  // 1. Create a new booking (POST)
  // -----------------------------
  const payload = {
    firstname: 'Alice',
    lastname: 'Smith',
    totalprice: 200,
    depositpaid: true,
    bookingdates: { checkin: '2025-12-01', checkout: '2025-12-05' },
    additionalneeds: 'Breakfast'
  };

  const postResponse = await request.post(`${BASE_URL}/booking`, {
    data: payload,
    headers: { 'Content-Type': 'application/json' }
  });

  // Verify the POST request succeeded
  expect(postResponse.ok()).toBeTruthy();

  const postData = await postResponse.json();
  const bookingId = postData.bookingid;
  console.log('Created booking:', JSON.stringify(postData, null, 2));

  // -----------------------------
  // 2. Fetch the created booking (GET)
  // -----------------------------
  const getResponse = await request.get(`${BASE_URL}/booking/${bookingId}`);
  expect(getResponse.ok()).toBeTruthy();

  const getData = await getResponse.json();
  console.log('Fetched booking:', JSON.stringify(getData, null, 2));

  // Validate that GET data matches the POST payload
  expect(getData.firstname).toBe(payload.firstname);
  expect(getData.lastname).toBe(payload.lastname);
  expect(getData.totalprice).toBe(payload.totalprice);
  expect(getData.depositpaid).toBe(payload.depositpaid);
  expect(getData.bookingdates.checkin).toBe(payload.bookingdates.checkin);
  expect(getData.bookingdates.checkout).toBe(payload.bookingdates.checkout);
  expect(getData.additionalneeds).toBe(payload.additionalneeds);

  // -----------------------------
  // 3. Authenticate to get a token (required for PUT/DELETE)
  // -----------------------------
  const authResponse = await request.post(`${BASE_URL}/auth`, {
    data: { username: 'admin', password: 'password123' },
    headers: { 'Content-Type': 'application/json' }
  });

  const authData = await authResponse.json();
  const token = authData.token;
  expect(token).toBeTruthy();

  // -----------------------------
  // 4. Update the booking (PUT)
  // -----------------------------
  const updatedPayload = { ...payload, totalprice: 250, additionalneeds: 'Lunch' };
  const putResponse = await request.put(`${BASE_URL}/booking/${bookingId}`, {
    data: updatedPayload,
    headers: { 
      'Content-Type': 'application/json',
      'Cookie': `token=${token}`
    }
  });

  expect(putResponse.ok()).toBeTruthy();
  const putData = await putResponse.json();

  // Validate that the updated fields are correct
  expect(putData.totalprice).toBe(250);
  expect(putData.additionalneeds).toBe('Lunch');

  // -----------------------------
  // 5. Delete the booking (DELETE)
  // -----------------------------
  const deleteResponse = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
    headers: { 'Cookie': `token=${token}` }
  });

  // Ensure delete was successful
  expect([200, 201, 204]).toContain(deleteResponse.status());
  console.log(`Booking ID ${bookingId} deleted successfully.`);
});
    