import { login, logout } from './util/firebase/authentication';
import { loadData } from './util/load-data';
import { MachineConfig, DoneInvokeEvent } from 'xstate';
import { AppContext } from './app.context';
import { AppEvent, AppEvents, LoggedInSuccesfullyEvent } from './app.events';
import { AppWindowStates, AppDataStates, AppStates, AppStateSchema } from './app.states';
import { assign, log, send } from 'xstate/lib/actions';
import { Entry } from './util/models/entry';

export const appMachine: MachineConfig<AppContext, AppStateSchema, AppEvent> = {
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
          },
        },
        [AppDataStates.LOADING_DATA]: {
          id: AppDataStates.LOADING_DATA,
          invoke: {
            src: (c, e) => loadData(),
            onDone: {
              actions: assign({ data: (c, e: DoneInvokeEvent<Entry[]>) => e.data}),
              target: AppDataStates.IDLE,
            },
            onError: {
              actions: log((c, e) => console.log('Error Loading Data:', e)),
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
        [AppWindowStates.VIEWING_HOME_PAGE]: { },
        [AppWindowStates.VIEWING_MONTHLY_PAGE]: { },
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
