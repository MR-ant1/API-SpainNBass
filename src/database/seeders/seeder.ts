
import { userSeedDataBase } from "./usersSeeders";
import { latestSeedDataBase } from "./latestsSeeders";
import { postSeedDataBase } from "./postSeeders";
import { commentSeedDataBase } from "./commentsSeeders";



const launchSeeder = async () => {
    await userSeedDataBase();
    console.log("user seed done")
    await latestSeedDataBase();
    console.log("latest seed done")
    await postSeedDataBase();
    console.log("post seed done")
    await commentSeedDataBase();
    console.log("comments seed done")
    }
  launchSeeder();