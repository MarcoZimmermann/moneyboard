describe('UserService Tests', ()=> {
    var userServiceModule;
    var userService;

    beforeAll(() => {
        jest.mock('../constants', () => {
            return {
            entriesDb : 'data/test.entries.db',
            userDb: 'data/test.users.db'
            };
          });

        userServiceModule = require('./userService');
        userService = new userServiceModule();
    });

    it('gets User with correct Name', () => {
        expect.assertions(2);

        return userService.getUserByName('Wesley').then(data=> {
            expect(data).toHaveProperty("name","Wesley");
            expect(data).toHaveProperty("mail","dummyTestMail@mail.de");
        });
    });

    it('sends null for unknown users', () => {
        expect.assertions(1);        

        return userService.getUserByName('sadf').then(data=> {
            expect(data).toBeNull();
        });
    });
   
});