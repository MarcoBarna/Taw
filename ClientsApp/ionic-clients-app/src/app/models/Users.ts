// *  cashier = 1, waiter = 2, cook = 3, bartender = 4, 5 = Client
export interface Users {
    username: string;
    role: number;
}

export function isUser(arg: any): arg is Users {
    return arg;
  }