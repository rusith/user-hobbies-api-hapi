import { dbConnect, dbDisconnect } from "app/helpers/testing"
import { Hobby } from "app/models/hobby"
import { User } from "app/models/user"
import getHobbiesForUser from "../getHobbiesForUser"

describe("getHobbiesForUser", () => {
  it("should return the hobbies for a user", async () => {
    // arrange
    const user = await User.create({
      name: "Test"
    })

    const hobbyOne = await Hobby.create({
      name: "Collecting Stamps",
      passionLevel: 10,
      user: { _id: user.id },
      year: 2019
    })

    const hobbyTwo = await Hobby.create({
      name: "Reading",
      passionLevel: 10,
      user: { _id: user.id },
      year: 2020
    })

    // act
    const hobbies = await getHobbiesForUser(user.id)

    expect(hobbies.find((h) => h.id === hobbyOne.id).name).toEqual(hobbyOne.name)
    expect(hobbies.find((h) => h.id === hobbyTwo.id).name).toEqual(hobbyTwo.name)
  })

  beforeAll(dbConnect)
  afterAll(dbDisconnect)
})
