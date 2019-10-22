export interface Orders {
    orderNumber: number;
    beverageList: [number];
    dishList: [number];
    dishState: [number];
    beverageState: boolean;
    numberPeople: number;
    tableNumber: number;
    date: Date;
    orderStatus: number;
    userNameWaiter: string;

}

export function isOrder(arg: any): arg is Orders {
    return arg;
  }
