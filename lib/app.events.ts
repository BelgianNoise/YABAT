import { EventObject } from 'xstate';

export enum AppEvents {
  CLICKED_LOG_IN = '[AppEvents: Clicked Log In]',
  LOGGED_IN_SUCCESFULLY = '[AppEvents: Logged In Succesfully]',
  CLICKED_LOG_OUT = '[AppEvents: Clicked Log Out]',
}

export class ClickedLogInEvent implements EventObject {
  public type: AppEvents.CLICKED_LOG_IN = AppEvents.CLICKED_LOG_IN;
  constructor(
    public email: string,
    public password: string,
  ) {}
}

export class ClickedLogOutEvent implements EventObject {
  public type: AppEvents.CLICKED_LOG_OUT = AppEvents.CLICKED_LOG_OUT;
  constructor() {}
}

export class LoggedInSuccesfullyEvent implements EventObject {
  public type: AppEvents.LOGGED_IN_SUCCESFULLY = AppEvents.LOGGED_IN_SUCCESFULLY;
  constructor() {}
}

export type AppEvent =
  | ClickedLogInEvent
  | ClickedLogOutEvent
  | LoggedInSuccesfullyEvent;
