const User = require('../models/User.model');
const request = require('supertest');
const { app, server } = require('../app');


//Sending a test request to /user/register which signs up a new user and returns its data with a token
test('Should sign up a new user', async () => {
    //Firstly deleting all users from the collection in the db to avoid conflicts
    await User.deleteMany();

    //This response will contain the user's data and the token
    const response = await request(app)
        .post('/user/register')
        .send({
            name: 'Test',
            email: 'test@test.com',
            address: 'Test Address',
            isAdmin: false,
            password: 'test1234'
        })
        .expect(201); //expecting a 201 status code - created user

        //Assert that the db was changed correctly
        const user = await User.findById(response.body.user._id);
        expect(user).not.toBeNull();

        //Assert the body contains the expected properties
        // expect(response.body).toMatchObject({
        //     user: {
        //         _id: user._id,
        //         name: 'Test',
        //         email: 'test@test.com',
        //         address: 'Test Address',
        //         isAdmin: false,
        //         token: user.tokens[0].token
        //     }
        // })

        //Assert the password is encrypted
        expect(user.password).not.toBe('test1234');
});