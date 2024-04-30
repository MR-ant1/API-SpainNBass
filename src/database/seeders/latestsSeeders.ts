

import bcrypt from "bcrypt"
import {faker} from "@faker-js/faker"
import { AppDataSource } from "../db"
import { Latest } from "../../models/Latest"


const generateFakeUser = () => {
    const userFaker = new Latest();
    userFaker.title = faker.person.lastName();
    userFaker.description = "Club";
    userFaker.picUrl = faker.internet.url();
    userFaker.user.id = faker.number.int({min:1, max:10})
    return userFaker;
}

export const latestSeedDataBase = async () => {
    try {
        await AppDataSource.initialize();
            
            const fakeUsers = Array.from({ length: 5 }, generateFakeUser);
            await Latest.save(fakeUsers);
    
    } catch (error) {
       console.log(error)
    }
    finally  {await AppDataSource.destroy()}
}
