import State from 'state';

export const updateModal = data => {
  const change = 'MODAL';
  const container = 'modal';

  const { name, close } = data;
  const active = (close) ? undefined : name;

  State.set({ change, active, container });
};
