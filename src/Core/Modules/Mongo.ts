import mongoose from "mongoose";
import { Logger } from "./Logger";

export class Mongo {
  public Connect(connectionString: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      mongoose.Promise = global.Promise;
      mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
          mongoose.set("useFindAndModify", false);
          mongoose.set("useCreateIndex", true);
          Logger.Info("MongoDB database connected successfully.", "MONGO");
          resolve();
        })
        .catch((error: any) => {
          Logger.Error(error, "MONGO");
          reject();
        });
    })
  }
}
