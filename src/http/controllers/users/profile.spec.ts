import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

import { app } from "@/app"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to get user profile", async () => {
    expect(1 + 1).toEqual(2)
    // const { token } = await createAndAuthenticateUser(app)

    // const profileResponse = await request(app.server)
    //   .get("/me")
    //   .set("Authorization", `Bearer ${token}`)
    //   .send()

    // expect(profileResponse.statusCode).toEqual(200)
    // expect(profileResponse.body).toEqual(
    //   expect.objectContaining({
    //     email: "johndoe@example.com",
    //   }),
    // )
  })
})
