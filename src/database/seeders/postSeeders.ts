
import {faker} from "@faker-js/faker"
import { AppDataSource } from "../db"
import { Post } from "../../models/Post"
import { User } from "../../models/User"


const generateFakePost =  () =>  {
    const randomPost = new Post();
    randomPost.title = faker.lorem.words();
    randomPost.description = faker.lorem.text()
    randomPost.topic = "Club dnb";
    randomPost.picUrl = faker.internet.url();
    randomPost.owner =  new User();
    randomPost.owner.id = faker.number.int({min:1, max:10})
    
    return randomPost;
}

export const postSeedDataBase = async () => {
    try {
        await AppDataSource.initialize();
            
            const fakePosts = Array.from({ length: 4 }, generateFakePost);
            await Post.save(fakePosts);
    
    } catch (error) {
       console.log(error)
    }
    finally  {await AppDataSource.destroy()}
}
