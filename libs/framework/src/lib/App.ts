import express, { Express } from 'express';
import { AppConfig, Loader } from './types';

export default class App {
  private app: Express;

  private loaders: Loader[] = [];

  constructor(config?: AppConfig) {
    this.app = express();
    this.loaders = config?.loaders || [];
  }

  public async start(port: string | number, callback: () => void) {
    await this.initLoaders();

    this.app.listen(port, callback);
  }

  public async initLoaders() {
    for (const loader of this.loaders) {
      await loader(this.app);
    }
  }

  public setOnError(onError: () => void) {
    this.app.on('error', onError);
  }
}
