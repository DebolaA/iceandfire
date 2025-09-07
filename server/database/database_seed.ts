import { IceUser } from '../model/user';

export const populateDummyData = async () => {
  // Populate environment with some dummy data in dev
  console.log('🍼 Populating database with dummy data');
  await IceUser.sync({ force: true });
  await IceUser.create({
    userId: 11,
    email: 'user11@character.com',
    secret: 'hell011',
    imageUrl: 'assets/image11.jpg',
  });
  await IceUser.create({
    userId: 12,
    email: 'user12@character.com',
    secret: 'hell012',
    imageUrl: 'assets/image12.jpg',
  });
  await IceUser.create({
    userId: 13,
    email: 'user1@character.com',
    secret: 'hell013',
    imageUrl: 'assets/image13.jpg',
  });
  const userCount = (await IceUser.findAll()).length;
  console.log(
    `📚 ${userCount} user${userCount !== 1 ? 's' : ''} added to table`
  );
};
