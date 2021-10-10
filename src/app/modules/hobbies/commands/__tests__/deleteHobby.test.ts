import NotFoundError from "app/errors/NotFoundError"
import { dbConnect, dbDisconnect } from "app/helpers/testing"
import { Hobby } from "app/models/hobby"
import { ObjectId } from "bson"
import deleteHobby from "../deleteHobby"

describe("deleteHobby", () => {
  it("should throw not found error if the hobby doesnt exist", async () => {
    // act
    const result = deleteHobby(new ObjectId())

    // assert
    await expect(result).rejects.toThrow(NotFoundError)
  })

  it("should delete the hobby", async () => {
    // arrange
    const hobby = await Hobby.create({
      name: "Hobby",
      year: 2010,
      passionLevel: 2
    })

    // act
    await deleteHobby(hobby.id)

    // assert
    const existing = await Hobby.findById(hobby.id)
    expect(existing).toBeNull()
  })

  beforeAll(dbConnect)
  afterAll(dbDisconnect)
})
