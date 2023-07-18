import { UserEntity } from '../../users/entities/user.entity';

export interface Policy {
  checkConditions(user: UserEntity): Promise<boolean>;
}
