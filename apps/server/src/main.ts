import Logger from './logger';
import App from './framework/App';
import config from './config';

// async function main() {
//   const app = await getApp();
//   const port = process.env.PORT || 3000;

//   const server = app.listen(port, () => {
//     Logger.info('--------------------------------------------------');
//     Logger.info('---------------- PantryLab Server ----------------');
//     Logger.info('--------------------------------------------------');
//     Logger.info(`           Server running on port: ${port}           `);
//     if (environment.mode === 'development') {
//       Logger.info(`Base endpoint of the api is: http://localhost:${port}`);
//     }
//     Logger.info('--------------------------------------------------');
//   });
//   server.on('error', Logger.error);
// }

// main();

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
