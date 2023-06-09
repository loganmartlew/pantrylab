import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { Loader } from '../types';

const ExpressLoader: Loader = async (app) => {
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
};

export default ExpressLoader;
