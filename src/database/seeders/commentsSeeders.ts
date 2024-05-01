
import {faker} from "@faker-js/faker"
import { AppDataSource } from "../db"
import { Comment } from "../../models/Comment" 
import { User } from "../../models/User";
import { Post } from "../../models/Post";


const generateFakeComment = () => {
    const randomComment = new Comment();
    randomComment.comment = faker.lorem.words();
    randomComment.url = faker.internet.url();
    randomComment.user = new User();
    randomComment.user.id = faker.number.int({min:1, max: 10});
    randomComment.post = new Post();
    randomComment.post.id = faker.number.int({min:1, max: 4});
    return randomComment;
}

export const commentSeedDataBase = async () => {
    try {
        await AppDataSource.initialize();
            
            const fakeComments = Array.from({ length: 4 }, generateFakeComment);
            await Comment.save(fakeComments);
            
          
    
    } catch (error) {
       console.log(error)
    }
    finally  {await AppDataSource.destroy()}
}
