import { createTestDb } from "app/helpers/testing"
import { Db, MongoClient } from "mongodb"
import createUser from "../createUser"

describe("createUser", () => {
  let connection: MongoClient = null

  it("should throw an error if name is not provided", async () => {
    // act
    const result = createUser(null)

    // assert
    expect(result).toThrowError("Name is required")
  })

  beforeAll(async () => {
    ;[connection] = await createTestDb()
  })
  afterAll(() => connection.close())
})
