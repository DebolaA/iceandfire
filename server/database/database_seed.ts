import { IceUser } from '../model/user';

export const populateDummyData = async () => {
  // Populate environment with some dummy data in dev
  console.log('🍼 Populating database with dummy data');
  await IceUser.sync({ force: true });
  await IceUser.create({
    id: 11,
    email: 'user11@character.com',
    password: 'hell011',
    imageUrl: 'assets/image11.jpg',
    username: 'User11',
  });
  await IceUser.create({
    id: 12,
    email: 'user12@character.com',
    password: 'hell012',
    imageUrl: 'assets/image12.jpg',
    username: 'User12',
  });
  await IceUser.create({
    id: 13,
    email: 'user13@character.com',
    password: 'hell013',
    imageUrl: 'assets/image13.jpg',
    username: 'User13',
  });
  const userCount = (await IceUser.findAll()).length;
  console.log(
    `📚 ${userCount} user${userCount !== 1 ? 's' : ''} added to table`
  );
};
