export interface Tickets {
    total: number;
}

export function isTicket(arg: any): arg is Tickets {
    return arg;
  }
