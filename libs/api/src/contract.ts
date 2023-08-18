import { c } from '@pantrylab/contract';
import { householdsContract } from '@pantrylab/households/interface';

export const contract = c.router({
  ['Households']: householdsContract,
});
