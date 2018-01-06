describe('UserService Tests', ()=> {
    var userServiceModule;
    var userService;

    const testUserPw = "dummyPassWord";

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

        return userService.getUser('Wesley', testUserPw).then(data=> {
            expect(data).toHaveProperty("name","Wesley");
            expect(data).toHaveProperty("mail","dummyTestMail@mail.de");           
        });
    });

    it('rejects User with correct Name but wrong password', () => {
        expect.assertions(1);

        return expect(userService.getUser('Wesley','sdfg')).rejects.toBeUndefined();    
    });

    it('rejects for unknown users', () => {
        expect.assertions(1);        
        return expect(userService.getUser('sadf','sdfg')).rejects.toBeUndefined();    
    });
   
});