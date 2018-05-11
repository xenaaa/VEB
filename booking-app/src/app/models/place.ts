import {Region} from './region';

export class Place{
    constructor(
        public Id?: number,
        public name?: string,
        public regionId?: number,
        public region?: Region
    ){}
}