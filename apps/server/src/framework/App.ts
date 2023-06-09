import express, { Express } from 'express';
import { Loader } from './types';

export default class App {
  private app: Express;

  private loaders: Loader[] = [];

  constructor() {
    this.app = express();
  }

  public async start(port: string | number, callback: () => void) {
    await this.initLoaders();

    this.app.listen(port, callback);
  }

  public registerLoader(loader: Loader) {
    this.loaders.push(loader);
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
