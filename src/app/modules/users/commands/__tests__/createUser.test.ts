import { dbConnect, dbDisconnect } from "app/helpers/testing"
import { User } from "app/models/user"
import createUser from "../createUser"

describe("createUser", () => {
  // let connection: MongoClient = null

  it("should throw an error if name is not provided", async () => {
    // assert
    await expect(createUser(null)).rejects.toThrow("Name is required")
  })

  it("should add the new user to the database", async () => {
    // act
    const created = await createUser("JohnDoe")

    // assert
    const fromDb = await User.findById(created.id)
    expect(fromDb.name).toBe("JohnDoe")
  })

  beforeAll(dbConnect)
  afterAll(dbDisconnect)
})
