import { Application } from './src/Application';
import { Mongo } from './src/Core/Modules/Mongo';
import { MONGODB_CONNECTION_STRING } from './src/Config/Secure';
import { PORT } from './src/Config/Settings';

const application = new Application();
      application.Listen(PORT);
const mongodb = new Mongo();
      mongodb.Connect(MONGODB_CONNECTION_STRING);
