import { EventObject } from 'xstate';

export enum AppEvents {
  LOGGED_IN_SUCCESFULLY = '[AppEvents: Logged In Succesfully]',
  CLICKED_LOG_IN = '[AppEvents: Clicked Log In]',
  CLICKED_LOG_OUT = '[AppEvents: Clicked Log Out]',
  CLICKED_HOME = '[AppEvents: Clicked Home]',
  CLICKED_MONTHLY = '[AppEvents: Clicked Monthly]',
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
}

export class ClickedHomeEvent implements EventObject {
  public type: AppEvents.CLICKED_HOME = AppEvents.CLICKED_HOME;
}

export class ClickedMonthlyEvent implements EventObject {
  public type: AppEvents.CLICKED_MONTHLY = AppEvents.CLICKED_MONTHLY;
}

export class LoggedInSuccesfullyEvent implements EventObject {
  public type: AppEvents.LOGGED_IN_SUCCESFULLY = AppEvents.LOGGED_IN_SUCCESFULLY;
}

export type AppEvent =
  | ClickedLogInEvent
  | ClickedLogOutEvent
  | LoggedInSuccesfullyEvent
  | ClickedHomeEvent
  | ClickedMonthlyEvent;
