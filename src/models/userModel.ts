export type UserModelType = {
    name:string;
    email: string;
    role: UserRole;
    password: string;
}

export type UserRole ={
    role: 'ADMIN' | 'REGULAR_USER'
}
