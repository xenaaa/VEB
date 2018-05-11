import {Appuser} from './appuser';

export class User {
    constructor(
      public id?: string,
      public password?: string,
      public UserName?: string,
      public AppUser?: Appuser,
      public AppUserId?: number
      ){}
  }