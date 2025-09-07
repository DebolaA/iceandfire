import request from 'supertest';
import { app } from '../app';
import { IceUser } from './../model/user';
// import '@types/jest';

import * as iceUserService from '../services/user_service';

jest.mock('../services/user_service');

afterEach(() => {
  jest.clearAllMocks();
});

const dummyIceUserData = [
  {
    userId: 11,
    email: 'user11@character.com',
    secret: 'hell011',
    imageUrl: 'assets/image11.jpg',
  },
  {
    userId: 12,
    email: 'user12@character.com',
    secret: 'hell012',
    imageUrl: 'assets/image12.jpg',
  },
];

describe('GET /api/v1/users endpoint', () => {
  test('status code successfully 200', async () => {
    // Act
    const res = await request(app).get('/api/v1/users');

    // Assert
    expect(res.statusCode).toEqual(200);
  });

  test('users successfully returned as empty array when no data returned from the service', async () => {
    // Arrange
    jest.spyOn(iceUserService, 'getAllUsers').mockResolvedValue([]);
    // Act
    const res = await request(app).get('/api/v1/users');

    // Assert
    expect(res.body).toEqual([]);
    expect(res.body.length).toEqual(0);
  });

  test('users successfully returned as array of users', async () => {
    jest
      .spyOn(iceUserService, 'getAllUsers')
      .mockResolvedValue(dummyIceUserData as IceUser[]);

    // Act
    const res = await request(app).get('/api/v1/users');

    // Assert
    expect(res.body).toEqual(dummyIceUserData);
    expect(res.body.length).toEqual(2);
  });
});

describe('GET /api/v1/users/{userId} endpoint', () => {
  test('status code successfully 200 for a user that is found', async () => {
    // Arrange
    const mockGetUser = jest
      .spyOn(iceUserService, 'getIceUser')
      .mockResolvedValue(dummyIceUserData[1] as IceUser);

    // Act
    const res = await request(app).get('/api/v1/users/11');

    // Assert
    expect(res.statusCode).toEqual(200);
  });

  test('status code successfully 404 for a user that is not found', async () => {
    // Arrange

    jest
      .spyOn(iceUserService, 'getIceUser')
      .mockResolvedValue(undefined as unknown as IceUser);
    // Act
    const res = await request(app).get('/api/v1/Users/77');

    // Assert
    expect(res.statusCode).toEqual(404);
  });

  test('controller successfully returns user object as JSON', async () => {
    // Arrange
    jest
      .spyOn(iceUserService, 'getIceUser')
      .mockResolvedValue(dummyIceUserData[1] as IceUser);

    // Act
    const res = await request(app).get('/api/v1/users/11');

    // Assert
    expect(res.body).toEqual(dummyIceUserData[1]);
  });
});

describe('POST /api/v1/users endpoint', () => {
  test('status code successfully 201 for saving a valid user', async () => {
    // Act
    const res = await request(app).post('/api/v1/users').send({
      userId: 3,
      email: 'user3@character.com',
      imageUrl: 'assets/image.jpg',
    });

    // Assert
    expect(res.statusCode).toEqual(201);
  });

  test('status code 400 when saving ill formatted JSON', async () => {
    jest.spyOn(iceUserService, 'saveIceUser').mockImplementation(() => {
      throw new Error('Error saving user');
    });

    // Act
    const res = await request(app).post('/api/v1/users').send({
      email: 'user3@character.com',
      imageUrl: 'assets/image.jpg',
    }); // No userId

    // Assert
    expect(res.statusCode).toEqual(400);
  });
});

describe('PUT /api/v1/users/{userId} endpoint', () => {
  test('status code successfully 201 for updating using a valid userId', async () => {
    // Act
    const res = await request(app).put('/api/v1/users/1').send({
      userId: 12,
      email: 'user12@character.com',
      secret: 'hell012',
      imageUrl: 'assets/image.12jpg',
    });

    // Assert
    expect(res.statusCode).toEqual(204);
  });

  test('status code 400 when updating using an invalid Id', async () => {
    jest.spyOn(iceUserService, 'updateIceUser').mockImplementation(() => {
      throw new Error('Error updating user');
    });

    // Act
    const res = await request(app).put('/api/v1/users/5').send({
      userId: 3,
      email: 'user3@character.com',
      imageUrl: 'assets/image.jpg',
    });

    // Assert
    expect(res.statusCode).toEqual(400);
  });
});

describe('DELETE /api/v1/users/{userId} endpoint', () => {
  test('status code 204 for a successful delete using a valid userId', async () => {
    // Act
    const res = await request(app).delete('/api/v1/users/1');

    // Assert
    expect(res.statusCode).toEqual(204);
  });

  test('status code 400 when deleting with a non existing userId', async () => {
    jest.spyOn(iceUserService, 'deleteIceUser').mockImplementation(() => {
      throw new Error('Invalid user Id');
    });

    // Act
    const res = await request(app).delete('/api/v1/users/bh');

    // Assert
    expect(res.statusCode).toEqual(400);
  });
});
