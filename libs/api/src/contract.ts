import { c } from '@pantrylab/contract';
import { householdsContract } from '@pantrylab/households/interface';
import { invitesContract } from '@pantrylab/invites/interface';
import { itemsContract } from '@pantrylab/items/interface';
import { listItemsContract } from '@pantrylab/listItems/interface';
import { mealsContract } from '@pantrylab/meals/interface';
import { plannedMealsContract } from '@pantrylab/plannedMeals/interface';
import { usersContract } from '@pantrylab/users/interface';

export const contract = c.router({
  ['Households']: householdsContract,
  ['Invites']: invitesContract,
  ['Items']: itemsContract,
  ['ListItems']: listItemsContract,
  ['Meals']: mealsContract,
  ['PlannedMeals']: plannedMealsContract,
  ['Users']: usersContract,
});
