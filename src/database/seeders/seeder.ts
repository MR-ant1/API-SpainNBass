

import { latestSeedDataBase } from "./latestsSeeders";
import { userSeedDataBase } from "./usersSeeders";


const launchSeeder = async () => {
    await userSeedDataBase();
    await latestSeedDataBase();
}
  launchSeeder();