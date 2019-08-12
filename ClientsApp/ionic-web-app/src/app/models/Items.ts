export interface Items {
    code: number;
    name: string;
    requiredTime: number;
    price: number;
}

export function isItem(arg: any): arg is Items {
    return arg;
  }