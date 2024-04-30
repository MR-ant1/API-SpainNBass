
import bcrypt from "bcrypt"
import {faker} from "@faker-js/faker"
import { AppDataSource } from "../db"
import { User } from "../../models/User";


const generateFakeUser = () => {
    const userFaker = new User();
    userFaker.nickname = faker.person.lastName();
    userFaker.favSubgenre = "Club";
    userFaker.preference = "dnbLover";
    userFaker.turntable = faker.lorem.words();
    userFaker.email = faker.internet.email();
    userFaker.password = bcrypt.hashSync("aA123456", 5);
    return userFaker;
}

export const userSeedDataBase = async () => {
    try {
        await AppDataSource.initialize();
             
            const userAdmin = new User()
            userAdmin.nickname = "admin"
            userAdmin.favSubgenre = "RaggaJungle"
            userAdmin.preference = "DJ"
            userAdmin.turntable = "pioneer xdj rx"
            userAdmin.email = "admin@admin.com"
            userAdmin.password = bcrypt.hashSync("aA123456", 5)
            userAdmin.role = "admin"

            await userAdmin.save()
            
            const userSuperAdmin = new User()
            userSuperAdmin.nickname = "super_admin"
            userSuperAdmin.favSubgenre = "RaggaJungle"
            userSuperAdmin.preference = "DJ"
            userSuperAdmin.turntable = "pioneer xdj rx2"
            userSuperAdmin.email = "superadmin@superadmin.com"
            userSuperAdmin.password = bcrypt.hashSync("aA123456", 5)
            userSuperAdmin.role = "super_admin"

            await userSuperAdmin.save()

            
            const fakeUsers = Array.from({ length: 8 }, generateFakeUser);
            await User.save(fakeUsers);
    
    } catch (error) {
       console.log(error)
    }
    finally  {await AppDataSource.destroy()}
}
