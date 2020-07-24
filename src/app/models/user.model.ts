export class User {
    id: number = 0;
    username: string = '';
    fullName: string = '';
    rol: string = '';
    email: string = '';
    avatar: string = '';
    datecreate: Date;
    dateupdate: Date;
    datedelete: Date;
    token?: string;
    isAdmin?: boolean = false;
}