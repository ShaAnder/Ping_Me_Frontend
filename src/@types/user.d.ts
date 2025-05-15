export interface UserInterface {
  id: number;
  username: string;
  email: string;
  avatar: string;
  location: string;
  description: string;
  servers: ServerInterface[];
}
