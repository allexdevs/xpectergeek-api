import { type Request, type Response } from 'express'
import Email from '../models/Email'
import DAO from '../util/dao'
import { type MysqlError } from 'mysql'
import DbInfo from '../models/DbInfo'

const dbInfo = new DbInfo(
  process.env.DB_HOST ?? '',
  process.env.DB_NAME ?? '',
  process.env.DB_USER ?? '',
  process.env.DB_PASSWORD ?? '',
  process.env.DB_PORT ?? ''
)

const con = new DAO(
  dbInfo.host,
  dbInfo.user,
  dbInfo.password,
  dbInfo.database,
  Number(dbInfo.port)
)

export default class EmailController {
  static async buscarEmails(
    request: Request,
    response: Response
  ): Promise<void> {
    const db = con.conectar()

    await db.query(
      {
        sql: 'SELECT * FROM emails',
        timeout: 5000,
      },
      (err: MysqlError, result: any) => {
        if (err !== null) {
          response.status(500).json({
            status: 500,
            erro: err,
          })
          db.end()
        } else {
          const emails: Email[] = []
          result.map((email: any): any => {
            emails.push(
              new Email(
                email.id,
                email.nome,
                email.sobrenome,
                email.empresa,
                email.mensagem,
                email.email,
                email.checked,
                email.created_at,
                email.updated_at
              )
            )
          })
          response.status(200).json({
            status: 200,
            mensagem: 'Dados retornados com sucesso',
            payload: emails,
          })
          db.end()
        }
      }
    )
  }

  static async adicionarEmail(
    request: Request,
    response: Response
  ): Promise<void> {
    const db = con.conectar()
    const email = new Email(
      0,
      request.body.nome,
      request.body.sobrenome,
      request.body.empresa,
      request.body.mensagem,
      request.body.email,
      request.body.checked,
      request.body.created_at,
      request.body.updated_at
    )

    await db.query(
      {
        sql: 'INSERT INTO emails (nome, sobrenome, empresa, mensagem, email, checked, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)',
        timeout: 5000,
        values: [
          `${email.nome}`,
          `${email.sobrenome}`,
          `${email.empresa}`,
          `${email.mensagem}`,
          `${email.email}`,
          email.checked,
          `${email.created_at}`,
          `${email.updated_at}`,
        ],
      },
      (err: MysqlError, result: any, fields: any) => {
        if (err !== null) {
          response.status(500).json({
            status: 500,
            mensagem:
              'Ocorreu um erro, não foi possível completar a solicitação.',
            erro: err,
            fields,
          })
          db.end()
        } else {
          response.status(201).json({
            status: 201,
            mensagem: 'Email enviado com sucesso',
            payload: {
              nome: email.nome,
              sobrenome: email.sobrenome,
              empresa: email.empresa,
              email: email.email,
              checked: email.checked,
              created_at: email.created_at,
              updated_at: email.updated_at,
            },
            fields: fields,
          })
          db.end()
        }
      }
    )
  }

  static async deletarEmail(
    request: Request,
    response: Response
  ): Promise<void> {
    const db = con.conectar()
    const id = request.params.id

    db.query(
      {
        sql: 'DELETE FROM emails WHERE id = ?',
        timeout: 5000,
        values: [id],
      },
      (err: MysqlError, result: any, fields: any): void => {
        if (err !== null) {
          response.status(500).json({
            status: 500,
            mensagem:
              'Ocorreu um erro, não foi possível completar a solicitação.',
            erro: err,
            fields: fields,
          })
          db.end()
        } else {
          response.status(200).json({
            status: 200,
            mensagem: 'Email excluído com sucesso',
          })
          db.end()
        }
      }
    )
  }

  static async pesquisarEmailPorNome(
    request: Request,
    response: Response
  ): Promise<void> {
    const db = con.conectar()
    const nome = request.params.name

    db.query(
      {
        sql: `SELECT * FROM emails WHERE nome LIKE '%${nome}%'`,
        timeout: 5000,
      },
      (err: MysqlError, result: any): void => {
        if (err !== null) {
          response.status(500).json({
            status: 500,
            mensagem:
              'Ocorreu um erro, não foi possível completar a solicitação.',
            erro: err,
          })
          db.end()
        } else {
          response.status(200).json({
            status: 200,
            mensagem: 'Email(s) encontrado(s) com sucesso',
            payload: result,
          })
          db.end()
        }
      }
    )
  }

  static async atualizarEmail(
    request: Request,
    response: Response
  ): Promise<void> {
    const db = con.conectar()
    const email = new Email(
      Number(request.params.id),
      request.body.nome,
      request.body.sobrenome,
      request.body.empresa,
      request.body.mensagem,
      request.body.email,
      request.body.checked,
      request.body.created_at,
      request.body.updated_at
    )

    db.query(
      {
        sql: `
          UPDATE emails SET
          nome = '${email.nome}', 
          sobrenome = '${email.sobrenome}',
          empresa = '${email.empresa}',
          mensagem = '${email.mensagem}',
          email = '${email.email}',
          checked = ${email.checked},
          created_at = '${email.created_at}',
          updated_at = '${email.updated_at}'
          WHERE id = ${email.id}
        `,
        timeout: 5000,
      },
      (err: MysqlError, result: any): void => {
        if (err !== null) {
          response.status(500).json({
            status: 500,
            mensagem:
              'Ocorreu um erro, não foi possível completar a solicitação.',
            erro: err,
          })
          db.end()
        } else {
          response.status(200).json({
            status: 200,
            mensagem: 'Email atualizado com sucesso',
          })
          db.end()
        }
      }
    )
  }
}
