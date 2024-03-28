export default class DbInfo {
  host: string
  database: string
  user: string
  password: string
  port: string

  constructor (
    host: string,
    database: string,
    user: string,
    password: string,
    port: string
  ) {
    this.host = host
    this.database = database
    this.user = user
    this.password = password
    this.port = port
  }
}
