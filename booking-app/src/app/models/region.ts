import {Country} from './country';

export class Region{
    constructor(
        public Id?: number,
        public name?: string,
		public countryId?: number,
        public country?: Country
    ){}
}