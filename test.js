const request = require('supertest');
const fs = require('fs');
const app = require('./index');

describe('POST /data', () => {
    afterEach(() => {
        fs.writeFileSync('data.txt', ''); // Clear data file after each test
    });

    it('should store data in the file', async () => {
        const data = { data: 'Test Data' };
        const res = await request(app)
            .post('/data')
            .send(data);
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Data written successfully');
    });

    it('should return an error if data is missing', async () => {
        const res = await request(app)
            .post('/data')
            .send({});
        expect(res.statusCode).toEqual(400);
    });
});

describe('GET /data', () => {
    it('should retrieve stored data from the file', async () => {
        fs.writeFileSync('data.txt', 'Test Data\n');
        const res = await request(app)
            .get('/data');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0].text).toEqual('Test Data');
    });
});

describe('DELETE /data/:id', () => {
    beforeEach(() => {
        fs.writeFileSync('data.txt', 'Test Data\n'); // Add initial data
    });

    afterEach(() => {
        fs.writeFileSync('data.txt', ''); // Clear data file after each test
    });

    it('should delete data from the file', async () => {
        const res = await request(app)
            .delete('/data/1');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toMatch(/Data with ID 1 deleted successfully|Data file deleted/);
    });

    it('should return an error if ID is not found', async () => {
        const res = await request(app)
            .delete('/data/2');
        expect(res.statusCode).toEqual(404);
    });

    it('should return an error if ID is invalid', async () => {
        const res = await request(app)
            .delete('/data/invalid');
        expect(res.statusCode).toEqual(400);
    });
});
