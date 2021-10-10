import NotFoundError from "app/errors/NotFoundError"
import { dbConnect, dbDisconnect } from "app/helpers/testing"
import { Hobby, IHobby } from "app/models/hobby"
import { User } from "app/models/user"
import { ObjectId } from "bson"
import createHobby from "../createHobby"

describe("createHobby", () => {
  it("should throw not found error if the hobby doesnt exist", async () => {
    // act
    const result = createHobby(new ObjectId(), new Hobby())

    // assert
    await expect(result).rejects.toThrow(NotFoundError)
  })

  it("should create a new hobby for the given user", async () => {
    // arrange
    const user = await User.create({ name: "NewUser" })

    // act
    const result = await createHobby(user.id, { name: "Collecting Stamps", passionLevel: 10, year: 2010 } as IHobby)

    // assert
    const created = await Hobby.findById(result.id)

    expect(created.name).toBe("Collecting Stamps")
    expect(created.year).toBe(2010)
    expect(created.passionLevel).toBe(10)
  })

  beforeAll(dbConnect)
  afterAll(dbDisconnect)
})
