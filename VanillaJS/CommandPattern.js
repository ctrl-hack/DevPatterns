class Command {
    constructor(execute){
        this.execute = execute;
    }
}

class CommandOrderManager {
    constructor() {
        this.orders = [];
    }
    execute(command, ...args) {
        return command.execute(this.orders, ...args);
    }
}

function PlaceOrderCommand(order, id){
    return new Command((orders) => {
        orders.push(id);
        return `You have successfully ordered ${order} (${id})`;
    })
}
function TrackOrderCommand(id){
    return new Command(() => {
        return `Your order ${id} will arrive in 20 minutes.`;
    })
}

function CancelOrderCommand(id){
    return new Command((orders) => {
        orders.splice(orders.indexOf(id), 1);
        return `You have successfully cancelled your order ${id}`;
    })
}
const manager = new CommandOrderManager();
console.log(manager.execute(new PlaceOrderCommand("chicken", "#65")));
console.log(manager.execute(new PlaceOrderCommand("beef", "#66")));
console.log(manager.execute(new TrackOrderCommand( "#66")));
console.log(manager.execute(new CancelOrderCommand( "#65")));