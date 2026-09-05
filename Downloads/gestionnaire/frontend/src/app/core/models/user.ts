export interface User {
  id: number;
  nom: string;
  role: 'ADMIN' | 'DIRECTEUR' | 'SECRETAIRE' | 'ENSEIGNANT';
}

export interface LoginResponse {
  token: string;
  user: User;
}
