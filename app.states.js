export var AppStates;
(function (AppStates) {
    AppStates["WINDOW"] = "[AppState: Window]";
    AppStates["DATA"] = "[AppState: Data]";
})(AppStates || (AppStates = {}));
export var AppDataStates;
(function (AppDataStates) {
    AppDataStates["LOADING_DATA"] = "[AppDataState: Loading Data]";
    AppDataStates["ADDING_DATA"] = "[AppDataState: Adding Data]";
    AppDataStates["DELETEING_DATA"] = "[AppDataState: Deleteing Data]";
    AppDataStates["IDLE"] = "[AppDataState: Idle]";
})(AppDataStates || (AppDataStates = {}));
export var AppWindowStates;
(function (AppWindowStates) {
    AppWindowStates["VIEWING_LOGIN_PAGE"] = "[AppWindowState: Viewing Login Page]";
    AppWindowStates["LOGGING_IN"] = "[AppWindowState: Logging In]";
    AppWindowStates["LOGGING_OUT"] = "[AppWindowState: Logging Out]";
    AppWindowStates["VIEWING_HOME_PAGE"] = "[AppWindowState: Viewing Home Page]";
    AppWindowStates["VIEWING_MONTHLY_PAGE"] = "[AppWindowState: Viewing Monthly Page]";
})(AppWindowStates || (AppWindowStates = {}));
