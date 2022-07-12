const request = require("supertest")
const app = require("./app")
const db = require("./db")

test("responds to `GET` requests to the `/` route with a JSON object of { 'ping' : 'pong' }", async () => {
  const resp = await request(app).get("/")
  expect(resp.statusCode).toEqual({ ping : "pong" })
})

afterAll(async () => {
  await db.end()
})
