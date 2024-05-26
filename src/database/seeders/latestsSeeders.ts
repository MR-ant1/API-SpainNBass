
import { faker } from "@faker-js/faker"
import { AppDataSource } from "../db"
import { Latest } from "../../models/Latest"
import { User } from "../../models/User"


const generateFakeLatest = () => {
    const randomLatest = new Latest();
    randomLatest.title = faker.person.lastName();
    randomLatest.description = faker.lorem.text();
    randomLatest.picUrl = faker.internet.url();
    randomLatest.user = new User();
    randomLatest.user.id = faker.number.int({ min: 1, max: 2 })
    return randomLatest;
}

export const latestSeedDataBase = async () => {
    try {
        await AppDataSource.initialize();

        const fakeLatests = Array.from({ length: 12 }, generateFakeLatest);

        await Latest.save(fakeLatests);

    } catch (error) {
        console.log(error)
    }
    finally { await AppDataSource.destroy() }
}
