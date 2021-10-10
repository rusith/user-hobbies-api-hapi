import { dbConnect, dbDisconnect } from "app/helpers/testing"
import { User } from "app/models/user"
import { getAllUsers } from "../.."
import createUser from "../../commands/createUser"

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

  it("Should be ordered by name", async () => {
    // arrange
    const rr = await User.create({
      name: "RichardRow"
    })
    const jd = await User.create({
      name: "JohnDoe"
    })

    // act
    const allUsers = await getAllUsers()

    // assert
    expect(allUsers[0].name).toEqual(jd.name)
    expect(allUsers[1].name).toEqual(rr.name)
  })

  beforeEach(async () => dbConnect())
  afterEach(async () => dbDisconnect())
})
