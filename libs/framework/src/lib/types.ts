import { Express } from 'express';

export type Loader = (app: Express) => void | Promise<void>;

export interface AppConfig {
  loaders: Loader[];
}
