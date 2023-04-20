export default interface IUsuario {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  cpf?: string;
  cnpj?: string;
  foto: string;
  biografia: string;
}
