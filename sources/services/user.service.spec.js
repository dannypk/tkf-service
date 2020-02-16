const userService = require('./user.service');

describe('UserService Spec', () => {
  const dummyName = 'daniel';
  const dummyEmail = 'daniel@tkf.com';
  const dummyPassword = '1234';

  describe('when registering new user', () => {
    describe('and the user doesnt exist', () => {
      beforeEach(() => {
        userService.findUserByEmail = jest.fn(() => null);
        userService.createUser = jest.fn(() => ({ email: dummyEmail }));
      });

      it('should create new user and add it to the user list', async () => {
        const user = await userService.registerUser(dummyName, dummyEmail, dummyPassword);
        expect(user).not.toBeNull();
      });
    });

    describe('and the user exists', () => {
      beforeEach(() => {
        userService.findUserByEmail = jest.fn(() => Promise.resolve({ name: dummyEmail }));
      });

      it('should create new user and add it to the user list', async () => {
        await expect(userService.registerUser(dummyName, dummyEmail, dummyPassword)).rejects.toThrow();
      });
    });
  });

});