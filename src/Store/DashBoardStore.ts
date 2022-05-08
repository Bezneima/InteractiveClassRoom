import {action, makeAutoObservable} from "mobx";

class DashBoardStore {
    constructor() {
        makeAutoObservable(this);
    }

    @action.bound
    action() {
        console.log('Мой экшен');
    }
}

export default new DashBoardStore();