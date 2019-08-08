export interface Tables {
    tablenumber: number;
    seats: number;
}

export function isTable(arg: any): arg is Tables {
    return arg;
  }