import { dbConnect, dbDisconnect } from "app/helpers/testing"
import { User } from "app/models/user"
import { getAllUsers } from "../.."

describe("getAllUsers", () => {
  it("Should return all users from the databse", async () => {
    // arrange
    const jd = await User.create({
      name: "JohnDoe"
    })

    const rr = await User.create({
      name: "RichardRow"
    })

    // act
    const allUsers = await getAllUsers()

    // assert
    expect(allUsers.find((a) => a.id === jd.id).name).toEqual(jd.name)
    expect(allUsers.find((a) => a.id === rr.id).name).toEqual(rr.name)
  })

  beforeAll(dbConnect)
  afterAll(dbDisconnect)
})
