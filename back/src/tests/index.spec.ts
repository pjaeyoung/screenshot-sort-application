import { expect } from 'chai';
import { Request, response, Response } from 'express';
import jasmine from 'jasmine';
import { Done } from 'mocha';

const request = require('supertest');


const index = require('../index');
const testImg = '/Users/jean/JEAN/JeansProject/SCCAP/back/src/testimg/bunny.jpeg'


    describe('POST /getIdx/labellist', ()=>{
        it('/', async ()=>{
            const res = await request(index).post('/getIdx/labellist').send({filename : testImg})
        console.log(res.body)
        expect(res.body).to.equal('')
        });
});
