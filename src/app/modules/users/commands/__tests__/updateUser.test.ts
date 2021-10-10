import { updateUser } from "../.."
import mongoose from "mongoose"
import NotFoundError from "app/errors/NotFoundError"
import { User } from "app/models/user"
import { dbConnect, dbDisconnect } from "app/helpers/testing"

describe("updateUser", () => {
  it("should throw NotFound error if the user is not found", async () => {
    // act
    const id = new mongoose.mongo.ObjectId()
    const result = updateUser(id, { id: id, name: "Name" })

    // assert
    await expect(result).rejects.toThrow(NotFoundError)
  })

  it("should update the name of the existing user", async () => {
    // arrange
    const created = await User.create({
      name: "JohnDoe"
    })

    // act
    const result = await updateUser(created.id, { id: created.id, name: "NewName" })

    // assert
    expect(result.id === created.id)
    const updated = await User.findById(created.id)
    expect(updated.name).toBe("NewName")
  })

  beforeAll(dbConnect)
  afterAll(dbDisconnect)
})
