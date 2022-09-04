import { StateSchema } from 'xstate';
import { AppContext } from './app.context';

export enum AppStates {
  WINDOW = '[AppState: Window]',
  DATA = '[AppState: Data]',
}

export enum AppDataStates {
  LOADING_DATA = '[AppDataState: Loading Data]',
  IDLE = '[AppDataState: Idle]',
}

export enum AppWindowStates {
  VIEWING_LOGIN_PAGE = '[AppWindowState: Viewing Login Page]',
  LOGGING_IN = '[AppWindowState: Logging In]',
  LOGGING_OUT = '[AppWindowState: Logging Out]',
  VIEWING_HOME_PAGE = '[AppWindowState: Viewing Home Page]',
  VIEWING_MONTHLY_PAGE = '[AppWindowState: Viewing Monthly Page]',
}

export interface AppState {
  value: Partial<{ [AppStates.DATA]: any; [AppStates.WINDOW]: any }>;
  context: AppContext;
}

export interface AppStateSchema extends StateSchema<AppContext> {
  states: {
    [AppStates.DATA]: {
      states: {
        [key in AppDataStates]?: StateSchema<AppContext>;
      };
    };
    [AppStates.WINDOW]: {
      states: {
        [key in AppWindowStates]?: StateSchema<AppContext>;
      };
    };
  };
}
