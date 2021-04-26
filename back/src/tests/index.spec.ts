import {expect} from "chai";
import 'jasmine';
import { sum } from '../../src/index'

describe('first init', () =>{
    it('sum test', () => {
        expect(sum(1,1)).to.equal(2);
        expect(sum(1,1)).to.not.equal(2);
    } )
});