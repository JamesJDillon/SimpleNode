// Type that gets attached to the request when the user has authenticated.
interface RequestUser {
  id: number;
  email: string;
  role: string;
}

export default RequestUser;