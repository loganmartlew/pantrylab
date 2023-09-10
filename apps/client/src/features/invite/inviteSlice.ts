import { StoreCreator } from '../../features/store';
import { Invite } from '../../types';

export interface InviteSlice {
  invites: Invite[];
  setInvites: (invites: Invite[]) => void;
  addInvite: (invite: Invite) => void;
  updateInvite: (invite: Invite) => void;
  deleteInvite: (inviteId: string) => void;
}

export const createInviteSlice: StoreCreator<InviteSlice> = (set, get) => ({
  invites: [],
  setInvites: (invites: Invite[]) => {
    set({ invites });
  },
  addInvite: (invite: Invite) => {
    set((state) => ({
      invites: [...state.invites, invite],
    }));
  },
  updateInvite: (invite: Invite) => {
    set((state) => ({
      invites: state.invites.map((i) => {
        if (i.id === invite.id) {
          return invite;
        }
        return i;
      }),
    }));
  },
  deleteInvite: (inviteId: string) => {
    set((state) => ({
      invites: state.invites.filter((i) => i.id !== inviteId),
    }));
  },
});
