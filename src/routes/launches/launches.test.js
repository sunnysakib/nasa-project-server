const request =  require('supertest');
const app = require('../../app');

const completeLaunchData = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    target: "kepler-187f",
    launchDate: 'junuary 4, 2015'
}

const comleteDataWithoutDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    target: "kepler-187f",
}

const launchDataWithInvalidDate = {
    mission: 'USS Enterprise',
    rocket: 'NCC 1701-D',
    target: "kepler-187f",
    launchDate: 'jute'
}

describe('Test GET /launches', () => {
    test('It should response with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
        
    })
})


describe('Test POST /launches', () => {
    test('It should response with 201 create', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);

        
        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate)
    
        expect(response.body).toMatchObject(comleteDataWithoutDate)
    })

    test('It should catch missing properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(comleteDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);
        
        expect(response.body).toStrictEqual({
            error: 'Missing required launch data',
        })
    })
    test('It should catch invalid dates', async () => {
        const response = await request(app)
        .post('/launches')
        .send(launchDataWithInvalidDate)
        .expect('Content-Type', /json/)
        .expect(400);
    
    expect(response.body).toStrictEqual({
        error: 'Invalid launch date',
    })
    })
}) 