"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io"); // Socket.io websocket library
class Socket {
  constructor(server) {
    this.ios = io(server);
  }
  emitEvent(eventType, data) {
    socketEvents[eventType].destRole.forEach((r) => {
      this.ios.emit(r,data);
    });
  }
}
exports.Socket = Socket;
var role = ["Cashier", "Waiter", "Cook", "Bartender","Dishes Ready","Beverages Ready", "Order Added"];
var socketEvents = {
  "send order": {
    destRole: [role[0], role[1], role[6]]
  },
  "dishes ready": {
    destRole: [role[0], role[4], role[2]]
  },
  "beverages ready": {
    destRole: [role[0], role[5], role[3]]
  },
  "dish in preparation": {
    destRole: [role[0], role[2]]
  },
  "order prepared": {
    destRole: [role[0], role[1], role[2], role[3]]
  },
  "dish complete": {
    destRole: [role[0], role[2]]
  },
  "table status modified": {
    destRole: [role[0], role[1]]
  },
  "modified user": {
    destRole: [role[0]]
  },
  "modified table": {
    destRole: [role[0]]
  }
};
