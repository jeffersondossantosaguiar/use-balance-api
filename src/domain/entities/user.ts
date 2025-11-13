export class User {
  public readonly id?: string
  public name: string
  public email: string
  public balance: number

  constructor({
    id,
    name,
    email,
    balance = 0
  }: {
    id?: string
    name: string
    email: string
    balance?: number
  }) {
    if (id) this.id = id
    this.name = name
    this.email = email
    this.balance = balance
  }

  deposit(amount: number) {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive")
    }
    this.balance += amount
  }
}
