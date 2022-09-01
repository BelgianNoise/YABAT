import { define, hydrate } from './util/components';
import { AppRootComponent } from './app-root.component';
import './index';

define('app-root', hydrate(AppRootComponent)());
