export interface Tickets {
    total: number;
    arrayList: [number];
    result: [number];
}

export function isTicket(arg: any): arg is Tickets {
    return arg;
  }
