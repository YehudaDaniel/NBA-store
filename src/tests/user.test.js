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

        console.log(response.body);
        // Assert the body contains the expected properties
        expect(response.body).toMatchObject({
            user: {
                _id: user.id,
                name: 'Test',
                email: 'test@test.com',
                address: 'Test Address',
                isAdmin: false,
            },
            token: user.tokens[0].token
        })

        //Assert the password is encrypted
        expect(user.password).not.toBe('test1234');
});


//Sending a test request to /user/register with an existing username expecting it to fail
test('Should not sign up a new user with an existing username', async () => {
    await request(app)
        .post('/user/register')
        .send({
            username:"Test",
            email: 'test@test.com',
            address: 'Test Address',
            password:'test1234',
            isAdmin: false
        })
        .expect(400);
});

//Sending a test request to /user/register to make sure user with invalid data isnt being signed up
test('Should not sign up a new user with invalid data', async () => {
    await request(app)
        .post('/user/register')
        .send({
            username: '%&*$',
            email: "bla@blala.com",
            password: '13%$'
        })
        .expect(400);
});

//Sending a test request to /user/login which logs in a registered user
test('Should login a registered user', async () => {
    const response = await request(app)
        .post('/user/login')
        .send({
            email: 'test@test.com',
            password: 'test1234'
        })
        .expect(200);
});

test('Should not login a registered user', async () => {
    await request(app)
        .post('/user/login')
        .send({
            email: 'DoesntExist@atall.com',
            password: 'irrelevant'
        })
        .expect(404)
});

test('Should get profile of user', async () => {
    const user = await User.findOne({ email: 'test@test.com' })
    expect(user).not.toBeNull()

    const response = await request(app)
        .get('/user/me')
        .set('Authorization', `Bearer ${user.tokens[0].token}`)
        .send()
        .expect(200)


        //Assert the right user was fetched from the database
    expect(response.body.user._id).toBe(user.id)
});



//TODO: should not get profile for unauthenticated user