import { c } from '@pantrylab/contract';
import { householdsContract } from '@pantrylab/households/interface';
import { invitesContract } from '@pantrylab/invites/interface';
import { itemsContract } from '@pantrylab/items/interface';

export const contract = c.router({
  ['Households']: householdsContract,
  ['Invites']: invitesContract,
  ['Items']: itemsContract,
});
