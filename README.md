# YABAT - Yet Another Budgeting App/Tool [yabat.be](https://yabat.be)

YABAT is a web app that makes it easy to keep track of your income and expenses. This app allows you to easily add your different incomes and expenses and will give you an overview of how much money you spend and on what, this is done by various calculated numbers and charts.

The app does not allow you to register ?yet?. If you are interested in testing the app please contact me so I can create an account for you.

YABAT is build using Typescript, lit, vite, chart.js and xstate. For authentication and storage, Firebase Authentication and Firebase Firestore are used respectively.

NOTE:
- YABAT does not ask you to link a bank account or make connections with any financial institutions.
- All data is stored in a Firebase Firestore instance and is in theory accessable by me. Firestore Security Rules are in place to prevent users from reading or editiing each others data.
