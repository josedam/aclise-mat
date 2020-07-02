export class User {
    id: number = 0;
    username: string = '';
    fullName: string = '';
    rol: string = '';
    email: string = '';
    token?: string;
    isAdmin?: boolean = false;
}