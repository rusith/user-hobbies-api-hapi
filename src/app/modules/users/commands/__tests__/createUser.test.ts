import { dbConnect, dbDisconnect } from "app/helpers/testing"
import createUser from "../createUser"

describe("createUser", () => {
  // let connection: MongoClient = null

  it("should throw an error if name is not provided", async () => {
    // act

    // assert
    expect(createUser(null)).rejects.toThrow("Name is required")
  })

  beforeAll(async () => dbConnect())
  afterAll(async () => dbDisconnect())
})
