export interface Ilogin{
    email : string,
    password : string

}
export interface ISignIn{
    email : string,
    password : string,
    userRole : 'admin' | 'buyer' |'superAdmin'

}