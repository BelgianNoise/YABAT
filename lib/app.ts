import { define, hydrate } from './util/components';
import { AppRootComponent } from './app-root.component';
import './index';
import { initializeFirebaseApp } from './util/firebase/firebase-setup';

const app = initializeFirebaseApp();

define('app-root', hydrate(AppRootComponent)());
