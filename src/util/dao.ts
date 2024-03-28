import mysql from 'mysql'

export default class DAO {
  host?: string
  user?: string
  password?: string
  database?: string
  port?: number

  constructor (
    host: string,
    user: string,
    password: string,
    database: string,
    port: number
  ) {
    this.host = host
    this.user = user
    this.password = password
    this.database = database
    this.port = port
  }

  conectar (): any {
    const connection: any = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: this.port
    })

    return connection
  }
}
