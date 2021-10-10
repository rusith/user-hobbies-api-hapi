import mongoose from "mongoose"
import NotFoundError from "app/errors/NotFoundError"
import { dbConnect, dbDisconnect } from "app/helpers/testing"
import deleteUser from "../deleteUser"
import { User } from "app/models/user"

describe("deleteUser", () => {
  it("should throw NotFound error if the user is not found", async () => {
    // act
    const id = new mongoose.mongo.ObjectId()
    const result = deleteUser(id)

    // assert
    await expect(result).rejects.toThrow(NotFoundError)
  })

  it("should remove the user from the database", async () => {
    // arrange
    const created = await User.create({
      name: "NewUser"
    })

    // act
    await deleteUser(created.id)

    // assert
    const existing = await User.findById(created.id)
    expect(existing).toBeNull()
  })

  beforeAll(dbConnect)
  afterAll(dbDisconnect)
})
