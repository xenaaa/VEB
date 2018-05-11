export class AuthUser {

    constructor(public role: string, public userId: string,
                public username: string ,
                public token: string) {
        
    }
}