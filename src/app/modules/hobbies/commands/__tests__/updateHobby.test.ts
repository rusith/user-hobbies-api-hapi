import NotFoundError from "app/errors/NotFoundError"
import { dbConnect, dbDisconnect } from "app/helpers/testing"
import { Hobby, IHobby } from "app/models/hobby"
import { ObjectId } from "bson"
import updateHobby from "../updateHobby"

describe("updateHobby", () => {
  it("should throw not found error if hobby not found", async () => {
    // act
    const result = updateHobby(new ObjectId(), {} as IHobby)

    // assert
    await expect(result).rejects.toThrow(NotFoundError)
  })

  it("should update hobby in the database", async () => {
    const hobby = await Hobby.create({
      name: "Hobby",
      passionLevel: 1,
      year: 2019
    })

    // act
    const result = await updateHobby(hobby.id, { name: "NewName", year: 2021, passionLevel: 4 } as IHobby)

    // assert
    const existing = await Hobby.findById(hobby.id)

    expect(result.name).toBe(existing.name)
    expect(result.year).toBe(existing.year)
    expect(result.passionLevel).toBe(existing.passionLevel)
  })

  beforeAll(dbConnect)
  afterAll(dbDisconnect)
})
