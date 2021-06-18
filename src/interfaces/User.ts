interface User {
  id: number;
  public : boolean,
  firstname: string;
  lastname: string;
  image: string  | undefined;
  createdAt: string;
  updatedAt: string;
  interests : Array<string>;
}

export default User;
