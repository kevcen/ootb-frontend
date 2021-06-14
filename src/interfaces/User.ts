import Product from "./Product";

interface User{
    firstname : string;
    lastname : string;
    avatar : ImageData;
    email : string;
    password: string;
    age : number;
    wishlist : Product[];
    interests : string[]; 
}

export default User;