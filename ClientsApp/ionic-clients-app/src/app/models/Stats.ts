export interface Stats {
    username: string;
    numberOfClients: number;
    numberOfPlates: number;
    priceOfPlates: number;
    numberOfOrders: number;
}

export function isStat(arg: any): arg is Stats {
    return arg;
  }