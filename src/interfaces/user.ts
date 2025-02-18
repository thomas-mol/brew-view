interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[];
  profile_picture?: string;
}

export default User;
