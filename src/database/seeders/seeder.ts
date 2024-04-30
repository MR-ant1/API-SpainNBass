
import { userSeedDataBase } from "./usersSeeders";
import { latestSeedDataBase } from "./latestsSeeders";
import { postSeedDataBase } from "./postSeeders";
import { commentSeedDataBase } from "./commentsSeeders";



const launchSeeder = async () => {
    await userSeedDataBase();
    await latestSeedDataBase();
    await postSeedDataBase();
    await commentSeedDataBase();
    }
  launchSeeder();