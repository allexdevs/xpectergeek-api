export default class Email {
  id: number
  nome: string
  sobrenome: string
  empresa: string
  mensagem: string
  email: string
  checked: boolean
  created_at: string
  updated_at: string

  constructor (
    id: number,
    nome: string,
    sobrenome: string,
    empresa: string,
    mensagem: string,
    email: string,
    checked: boolean,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id
    this.nome = nome
    this.sobrenome = sobrenome
    this.empresa = empresa
    this.mensagem = mensagem
    this.email = email
    this.checked = checked
    this.created_at = createdAt
    this.updated_at = updatedAt
  }
}
