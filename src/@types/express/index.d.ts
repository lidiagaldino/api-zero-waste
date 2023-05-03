declare namespace Express {
  export interface Request {
    id_usuario: string;
    user: {
      id_modo: number;
      user_type: string;
      id_usuario: number;
    };
  }
}
