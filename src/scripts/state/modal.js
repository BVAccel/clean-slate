import State from 'state';

export const updateModal = (data) => {
  const { name: id } = data;
  const change = 'MODAL';
  const container = 'modal';

  const { name, close } = data;
  const active = close ? undefined : name;

  State.set({ id, change, active, container });
};
