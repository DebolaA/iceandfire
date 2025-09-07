import { IceUser } from '../model/user';

export const getAllUsers = async () => {
  return IceUser.findAll();
};

export const getIceUser = async (userId: number) => {
  return IceUser.findOne({
    where: { userId },
  });
};

export const saveIceUser = async (iceUser: IceUser) => {
  return IceUser.create<IceUser>(iceUser);
};

export const updateIceUser = async (userId: number, iceUser: IceUser) => {
  return IceUser.update(iceUser, {
    where: {
      userId,
    },
  });
};

export const deleteIceUser = async (userId: number) => {
  return IceUser.destroy({
    where: {
      userId,
    },
  });
};
