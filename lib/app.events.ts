import { Entry } from './util/models/entry';
import { EventObject } from 'xstate';

export enum AppEvents {
  LOGGED_IN_SUCCESFULLY = '[AppEvents: Logged In Succesfully]',
  CLICKED_LOG_IN = '[AppEvents: Clicked Log In]',
  CLICKED_LOG_OUT = '[AppEvents: Clicked Log Out]',
  CLICKED_HOME = '[AppEvents: Clicked Home]',
  CLICKED_MONTHLY = '[AppEvents: Clicked Monthly]',
  CLICKED_ADD_ENTRY = '[AppEvents: Clicked Add Entry]',
  CLICKED_DELETE = '[AppEvents: Clicked Delete]',
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

export class ClickedAddEntryEvent implements EventObject {
  public type: AppEvents.CLICKED_ADD_ENTRY = AppEvents.CLICKED_ADD_ENTRY;
  constructor(
    public entry: Entry,
  ) {}
}

export class ClickedDeleteEntryEvent implements EventObject {
  public type: AppEvents.CLICKED_DELETE = AppEvents.CLICKED_DELETE;
  constructor(
    public id: string,
  ) {}
}

export type AppEvent =
  | ClickedLogInEvent
  | ClickedLogOutEvent
  | LoggedInSuccesfullyEvent
  | ClickedHomeEvent
  | ClickedMonthlyEvent
  | ClickedAddEntryEvent
  | ClickedDeleteEntryEvent;
