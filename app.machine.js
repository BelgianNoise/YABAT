import { login, logout } from './util/firebase/authentication';
import { loadData } from './util/load-data';
import { AppEvents, LoggedInSuccesfullyEvent } from './app.events';
import { AppWindowStates, AppDataStates, AppStates } from './app.states';
import { assign, log, send } from 'xstate/lib/actions';
import { addData } from './util/add-data';
import { deleteData } from './util/delete-data';
export const appMachine = {
    type: 'parallel',
    id: 'app',
    states: {
        [AppStates.DATA]: {
            initial: AppDataStates.IDLE,
            states: {
                [AppDataStates.IDLE]: {
                    id: AppDataStates.IDLE,
                    on: {
                        [AppEvents.LOGGED_IN_SUCCESFULLY]: AppDataStates.LOADING_DATA,
                        [AppEvents.CLICKED_ADD_ENTRY]: AppDataStates.ADDING_DATA,
                        [AppEvents.CLICKED_DELETE]: AppDataStates.DELETEING_DATA,
                    },
                },
                [AppDataStates.LOADING_DATA]: {
                    id: AppDataStates.LOADING_DATA,
                    invoke: {
                        src: (c, e) => loadData(),
                        onDone: {
                            actions: assign({ data: (c, e) => e.data }),
                            target: AppDataStates.IDLE,
                        },
                        onError: {
                            actions: log((c, e) => console.log('Error Loading Data:', e)),
                            target: AppDataStates.IDLE,
                        },
                    },
                },
                [AppDataStates.ADDING_DATA]: {
                    id: AppDataStates.ADDING_DATA,
                    invoke: {
                        src: (c, e) => addData(c, e),
                        onDone: {
                            actions: assign({ data: (c, e) => [...c.data, e.data] }),
                            target: AppDataStates.IDLE,
                        },
                        onError: {
                            actions: log((c, e) => console.log('Error Adding Data:', e)),
                            target: AppDataStates.IDLE,
                        },
                    },
                },
                [AppDataStates.DELETEING_DATA]: {
                    id: AppDataStates.DELETEING_DATA,
                    invoke: {
                        src: (c, e) => deleteData(c, e),
                        onDone: {
                            actions: assign({ data: (c, ev) => c.data.filter((e) => e.id !== ev.data) }),
                            target: AppDataStates.IDLE,
                        },
                        onError: {
                            actions: log((c, e) => console.log('Error Deleteing Data:', e)),
                            target: AppDataStates.IDLE,
                        },
                    },
                },
            },
        },
        [AppStates.WINDOW]: {
            initial: AppWindowStates.LOGGING_IN,
            on: {
                [AppEvents.CLICKED_LOG_OUT]: `.${AppWindowStates.LOGGING_OUT}`,
                [AppEvents.CLICKED_HOME]: `.${AppWindowStates.VIEWING_HOME_PAGE}`,
                [AppEvents.CLICKED_MONTHLY]: `.${AppWindowStates.VIEWING_MONTHLY_PAGE}`,
            },
            states: {
                [AppWindowStates.LOGGING_IN]: {
                    invoke: {
                        src: (c, e) => login(c, e),
                        onDone: {
                            actions: send(new LoggedInSuccesfullyEvent()),
                            target: AppWindowStates.VIEWING_HOME_PAGE,
                        },
                        onError: {
                            actions: log((c, e) => console.log('Error Logging In:', e)),
                            target: AppWindowStates.VIEWING_LOGIN_PAGE,
                        },
                    },
                },
                [AppWindowStates.VIEWING_LOGIN_PAGE]: {
                    on: {
                        [AppEvents.CLICKED_LOG_IN]: AppWindowStates.LOGGING_IN,
                    },
                },
                [AppWindowStates.VIEWING_HOME_PAGE]: {},
                [AppWindowStates.VIEWING_MONTHLY_PAGE]: {},
                [AppWindowStates.LOGGING_OUT]: {
                    invoke: {
                        src: (c, e) => logout(),
                        onDone: AppWindowStates.VIEWING_LOGIN_PAGE,
                        onError: AppWindowStates.VIEWING_LOGIN_PAGE,
                    },
                },
            },
        },
    },
};
