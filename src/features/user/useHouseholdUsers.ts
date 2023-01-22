import { useState, useEffect, useCallback } from 'react';
import { supabase } from '~/lib/supabaseClient';
import { Invite, User } from '~/types';
import { useAuth } from '~/features/auth/useAuth';
import {
  deletePendingUserFromHousehold,
  deleteUserFromHousehold,
  getPendingUsers,
  getUser,
  inviteUsersToHousehold,
  openHouseholdUserInvitesChannel,
  openHouseholdUsersChannel,
} from './userApi';
import { useHousehold } from '~/features/household/useHousehold';

type HouseholdUsersPayload =
  | {
      eventType: 'INSERT';
      new: { user_id: string };
    }
  | {
      eventType: 'UPDATE';
      new: { user_id: string };
    }
  | {
      eventType: 'DELETE';
      old: { user_id: string };
    };

type HouseholdUserInvitesPayload =
  | {
      eventType: 'INSERT';
      new: Invite;
    }
  | {
      eventType: 'UPDATE';
      new: Invite;
    }
  | {
      eventType: 'DELETE';
      old: Invite;
    };

const sortUsers = (
  users: User[],
  pendingUsers: User[],
  ownerId: string = ''
): { user: User; pending: boolean }[] => {
  const owner = users.find(user => user.id === ownerId);
  const ownerWithStatus = owner && { user: owner, pending: false };

  const filteredUsers = users.filter(user => user.id !== ownerId);
  const usersWithStatus = filteredUsers.map(user => ({ user, pending: false }));
  const pendingUsersWithStatus = pendingUsers.map(user => ({
    user,
    pending: true,
  }));

  const sortedUsers = [...usersWithStatus, ...pendingUsersWithStatus].sort(
    (a, b) => {
      const aName = `${a.user.first_name} ${a.user.last_name}`;
      const bName = `${b.user.first_name} ${b.user.last_name}`;

      if (aName.toLowerCase() < bName.toLowerCase()) {
        return -1;
      }
      if (aName.toLowerCase() > bName.toLowerCase()) {
        return 1;
      }
      return 0;
    }
  );

  if (!owner) return sortedUsers;
  if (!ownerWithStatus) return sortedUsers;

  return [ownerWithStatus, ...sortedUsers];
};

export const useHouseholdUsers = (householdId: string) => {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);

  const { user } = useAuth();
  const { currentHousehold } = useHousehold();

  const [existingUsers, setExistingUsers] = useState<User[]>(
    currentHousehold?.users || []
  );

  const sortedUsers = sortUsers(
    existingUsers,
    pendingUsers,
    currentHousehold?.owner_id
  );
  const isHouseholdOwner = currentHousehold?.owner_id === user?.id;

  useEffect(() => {
    if (!currentHousehold) return;

    getPendingUsers(currentHousehold.id).then(pendingUsers => {
      setPendingUsers(pendingUsers);
    });

    const householdUsersChannel = openHouseholdUsersChannel(
      currentHousehold.id,
      pl => {
        const payload = pl as HouseholdUsersPayload;

        if (payload.eventType === 'DELETE') {
          const deletedUserId = (payload.old as { user_id: string }).user_id;
          setExistingUsers(users =>
            users.filter(user => user.id !== deletedUserId)
          );
          return;
        }

        getUser(payload.new.user_id).then(user => {
          if (!user) return;

          if (payload.eventType === 'INSERT') {
            setExistingUsers(users => [...users, user]);
          }

          if (payload.eventType === 'UPDATE') {
            setExistingUsers(users =>
              users.map(u => (u.id === user.id ? user : u))
            );
          }
        });
      }
    );

    const householdUserInvitesChannel = openHouseholdUserInvitesChannel(
      currentHousehold.id,
      pl => {
        const payload = pl as HouseholdUserInvitesPayload;

        if (payload.eventType === 'DELETE') {
          const deletedUserId = (payload.old as { user_id: string }).user_id;
          setPendingUsers(users => users.filter(u => u.id !== deletedUserId));
          return;
        }

        if (payload.new.status !== 'pending') {
          return;
        }

        getUser(payload.new.user_id).then(user => {
          if (!user) return;

          if (payload.eventType === 'INSERT') {
            setPendingUsers(users => [
              ...users.filter(u => u.id !== user.id),
              user,
            ]);
          }

          if (payload.eventType === 'UPDATE') {
            setPendingUsers(users =>
              users.map(u => (u.id === user.id ? user : u))
            );
          }
        });
      }
    );

    return () => {
      supabase.removeChannel(householdUsersChannel);
      supabase.removeChannel(householdUserInvitesChannel);
    };
  }, [currentHousehold]);

  const removeUser = useCallback(
    async (userId: string) => {
      const oldUsers = [...existingUsers];
      setExistingUsers(users => users.filter(user => user.id !== userId));

      const error = await deleteUserFromHousehold(userId, householdId);

      if (error) {
        setExistingUsers(oldUsers);
      }
    },
    [existingUsers, householdId]
  );

  const removePendingUser = useCallback(
    async (userId: string) => {
      const oldPendingUsers = [...pendingUsers];
      setPendingUsers(users => users.filter(user => user.id !== userId));

      const error = await deletePendingUserFromHousehold(userId, householdId);

      if (error) {
        setPendingUsers(oldPendingUsers);
      }
    },
    [pendingUsers, householdId]
  );

  const inviteUsers = useCallback(
    async (newUsers: User[]) => {
      const oldPendingUsers = [...pendingUsers];
      setPendingUsers(users => [...users, ...newUsers]);

      const error = await inviteUsersToHousehold(newUsers, householdId);

      if (error) {
        setPendingUsers(oldPendingUsers);
      }
    },
    [pendingUsers, householdId]
  );

  const searchUsersToInvite = async (searchTerm: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .neq('id', user?.id)
      .like('email', `%${searchTerm}%`);

    if (error) {
      console.error(error);
      return [];
    }

    if (!data) return [];

    const users = data as User[];

    const filteredUsers = users.filter(
      user =>
        !existingUsers.find(u => u.id === user.id) &&
        !pendingUsers.find(u => u.id === user.id)
    );

    return filteredUsers;
  };

  return {
    users: sortedUsers,
    existingUsers,
    pendingUsers,
    isHouseholdOwner,
    removeUser,
    removePendingUser,
    inviteUsers,
    searchUsersToInvite,
  };
};
