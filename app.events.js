export var AppEvents;
(function (AppEvents) {
    AppEvents["LOGGED_IN_SUCCESFULLY"] = "[AppEvents: Logged In Succesfully]";
    AppEvents["CLICKED_LOG_IN"] = "[AppEvents: Clicked Log In]";
    AppEvents["CLICKED_LOG_OUT"] = "[AppEvents: Clicked Log Out]";
    AppEvents["CLICKED_HOME"] = "[AppEvents: Clicked Home]";
    AppEvents["CLICKED_MONTHLY"] = "[AppEvents: Clicked Monthly]";
    AppEvents["CLICKED_ADD_ENTRY"] = "[AppEvents: Clicked Add Entry]";
    AppEvents["CLICKED_DELETE"] = "[AppEvents: Clicked Delete]";
})(AppEvents || (AppEvents = {}));
export class ClickedLogInEvent {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.type = AppEvents.CLICKED_LOG_IN;
    }
}
export class ClickedLogOutEvent {
    constructor() {
        this.type = AppEvents.CLICKED_LOG_OUT;
    }
}
export class ClickedHomeEvent {
    constructor() {
        this.type = AppEvents.CLICKED_HOME;
    }
}
export class ClickedMonthlyEvent {
    constructor() {
        this.type = AppEvents.CLICKED_MONTHLY;
    }
}
export class LoggedInSuccesfullyEvent {
    constructor() {
        this.type = AppEvents.LOGGED_IN_SUCCESFULLY;
    }
}
export class ClickedAddEntryEvent {
    constructor(entry) {
        this.entry = entry;
        this.type = AppEvents.CLICKED_ADD_ENTRY;
    }
}
export class ClickedDeleteEntryEvent {
    constructor(id) {
        this.id = id;
        this.type = AppEvents.CLICKED_DELETE;
    }
}
