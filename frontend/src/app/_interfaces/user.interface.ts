export interface User{
        id: string;
        email:string;
        password:string;
        password_confirmation?:string;
        username:string;
        firstName: string;    
        lastName: string;    
        phone: number;
        token?:string;
        admin?:boolean;
        uuid?:string;
}