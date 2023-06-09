import getApp from '@server/app';
import { environment } from '@server/environments/environment';
import Logger from '@server/logger';
import App from '@server/framework/App';

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

const port = process.env.PORT || 3000;

const app = new App();
app.start(port, () => {
  Logger.info('--------------------------------------------------');
  Logger.info('---------------- PantryLab Server ----------------');
  Logger.info('--------------------------------------------------');
  Logger.info(`           Server running on port: ${port}           `);
  if (environment.mode === 'development') {
    Logger.info(`Base endpoint of the api is: http://localhost:${port}`);
  }
  Logger.info('--------------------------------------------------');
});
