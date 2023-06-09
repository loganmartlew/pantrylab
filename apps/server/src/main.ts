import Logger from '@pantrylab/logger';
import config from '@pantrylab/config';
import { App } from '@pantrylab/framework';

const app = new App();
app.start(config.port, () => {
  Logger.info('--------------------------------------------------');
  Logger.info('---------------- PantryLab Server ----------------');
  Logger.info('--------------------------------------------------');
  Logger.info(`           Server running on port: ${config.port}           `);
  if (config.isDevelopment) {
    Logger.info(`Base endpoint of the api is: http://localhost:${config.port}`);
  }
  Logger.info('--------------------------------------------------');
});
