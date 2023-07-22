import { DbClientExceptionFilter } from './db-client-exception.filter';

describe('PrismaClientExceptionFilter', () => {
  it('should be defined', () => {
    expect(new DbClientExceptionFilter()).toBeDefined();
  });
});
