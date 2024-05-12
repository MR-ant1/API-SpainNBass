
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

        const postSecondTopic = new Post()
        postSecondTopic.title = faker.lorem.words()
        postSecondTopic.description = faker.lorem.text()
        postSecondTopic.topic = "RaggaJungle"
        postSecondTopic.picUrl = faker.internet.url();
        postSecondTopic.owner = new User()
        postSecondTopic.owner.id =  faker.number.int({min:1, max:10})

        await postSecondTopic.save()

        const postThirdTopic = new Post()
        postThirdTopic.title = faker.lorem.words()
        postThirdTopic.description = faker.lorem.text()
        postThirdTopic.topic = "Liquid dnb"
        postThirdTopic.picUrl = faker.internet.url();
        postThirdTopic.owner = new User()
        postThirdTopic.owner.id =  faker.number.int({min:1, max:10})

        await postThirdTopic.save()

        const postFourthTopic = new Post()
        postFourthTopic.title = faker.lorem.words()
        postFourthTopic.description = faker.lorem.text()
        postFourthTopic.topic = "Rollers"
        postFourthTopic.picUrl = faker.internet.url();
        postFourthTopic.owner = new User()
        postFourthTopic.owner.id =  faker.number.int({min:1, max:10})

        await postFourthTopic.save()

        const postFifthTopic = new Post()
        postFifthTopic.title = faker.lorem.words()
        postFifthTopic.description = faker.lorem.text()
        postFifthTopic.topic = "Jump Up"
        postFifthTopic.picUrl = faker.internet.url();
        postFifthTopic.owner = new User()
        postFifthTopic.owner.id =  faker.number.int({min:1, max:10})

        await postFifthTopic.save()

        const postSixthTopic = new Post()
        postSixthTopic.title = faker.lorem.words()
        postSixthTopic.description = faker.lorem.text()
        postSixthTopic.topic = "NeuroFunk"
        postSixthTopic.picUrl = faker.internet.url();
        postSixthTopic.owner = new User()
        postSixthTopic.owner.id =  faker.number.int({min:1, max:10})

        await postSixthTopic.save()

        const postSeventhTopic = new Post()
        postSeventhTopic.title = faker.lorem.words()
        postSeventhTopic.description = faker.lorem.text()
        postSeventhTopic.topic = "memes"
        postSeventhTopic.picUrl = faker.internet.url();
        postSeventhTopic.owner = new User()
        postSeventhTopic.owner.id =  faker.number.int({min:1, max:10})

        await postSeventhTopic.save()
            
            const fakePosts = Array.from({ length: 4 }, generateFakePost);
            await Post.save(fakePosts);
    
    } catch (error) {
       console.log(error)
    }
    finally  {await AppDataSource.destroy()}
}
