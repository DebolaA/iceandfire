import { IceUser } from '../model/user';

export const getAllUsers = async () => {
  return IceUser.findAll();
};

export const getIceUser = async (id: number) => {
  return IceUser.findOne({
    where: { id },
  });
};

export const saveIceUser = async (iceUser: IceUser) => {
  return IceUser.create<IceUser>(iceUser);
};

export const updateIceUser = async (id: number, iceUser: IceUser) => {
  return IceUser.update(iceUser, {
    where: {
      id,
    },
  });
};

export const deleteIceUser = async (id: number) => {
  return IceUser.destroy({
    where: {
      id,
    },
  });
};
