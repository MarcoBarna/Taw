export interface Tables {
    tableNumber: number;
    seats: number;
    occupied: boolean;
}

export function isTable(arg: any): arg is Tables {
    return arg;
  }