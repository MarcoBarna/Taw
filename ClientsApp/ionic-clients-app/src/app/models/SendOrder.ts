export interface SendOrder {
    orderNumber: number;
    beverageList: [number];
    dishList: [number];
    numberPeople: number;
    tableNumber: number;
    userNameWaiter: string;
}

export function isSendOrder(arg: any): arg is SendOrder {
    return arg;
  }
