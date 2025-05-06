import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  userId: number; 
  email: string;
  name: string;
  address: string;
  phone: string
}
