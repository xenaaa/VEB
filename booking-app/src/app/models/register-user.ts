export class RegisterUser {
    constructor(
        public Username?: string,
        public Name?: string, 
        public LastName?: string,
        public Email?: string, 
        public Password?: string, 
        public ConfirmPassword?: string,    
        public Role?: string, 
        public IsBanned?: boolean) {
        
    }
}