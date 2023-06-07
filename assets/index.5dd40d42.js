var t=Object.defineProperty,e=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,o=(e,a,r)=>a in e?t(e,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[a]=r,s=(t,s)=>{for(var i in s||(s={}))e.call(s,i)&&o(t,i,s[i]);if(a)for(var i of a(s))r.call(s,i)&&o(t,i,s[i]);return t};import{g as i,s as n,a as l,b as c,c as d,D as p,U as h,d as g,A as v,x as u,E as m,e as y,l as E,f,h as b,q as C,R as I,i as w,u as A,j as x,k as O,C as k,m as N,r as L,n as D,o as S,p as M,t as G,v as T}from"./vendor.b76bae32.js";!function(t=".",e="__import__"){try{self[e]=new Function("u","return import(u)")}catch(a){const r=new URL(t,location),o=t=>{URL.revokeObjectURL(t.src),t.remove()};self[e]=t=>new Promise(((a,s)=>{const i=new URL(t,r);if(self[e].moduleMap[i])return a(self[e].moduleMap[i]);const n=new Blob([`import * as m from '${i}';`,`${e}.moduleMap['${i}']=m;`],{type:"text/javascript"}),l=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(n),onerror(){s(new Error(`Failed to import: ${t}`)),o(l)},onload(){a(self[e].moduleMap[i]),o(l)}});document.head.appendChild(l)})),self[e].moduleMap={}}}("assets/");const _=(t,e)=>{customElements.get(t)||customElements.define(t,e)},$=t=>(...e)=>class extends t{constructor(){super(...e)}};var P,R,V,j,F,H,U,W;(R=P||(P={})).LOGGED_IN_SUCCESFULLY="[AppEvents: Logged In Succesfully]",R.CLICKED_LOG_IN="[AppEvents: Clicked Log In]",R.CLICKED_LOG_OUT="[AppEvents: Clicked Log Out]",R.CLICKED_HOME="[AppEvents: Clicked Home]",R.CLICKED_MONTHLY="[AppEvents: Clicked Monthly]",R.CLICKED_COMPARE="[AppEvents: Clicked Compare]",R.CLICKED_ADD_ENTRY="[AppEvents: Clicked Add Entry]",R.CLICKED_DELETE="[AppEvents: Clicked Delete]";class z{constructor(t,e){this.email=t,this.password=e,this.type=P.CLICKED_LOG_IN}}class B{constructor(){this.type=P.CLICKED_LOG_OUT}}class Y{constructor(){this.type=P.CLICKED_HOME}}class K{constructor(){this.type=P.CLICKED_MONTHLY}}class X{constructor(){this.type=P.CLICKED_COMPARE}}class Z{constructor(t){this.entry=t,this.type=P.CLICKED_ADD_ENTRY}}class J{constructor(t){this.id=t,this.type=P.CLICKED_DELETE}}(j=V||(V={})).WINDOW="[AppState: Window]",j.DATA="[AppState: Data]",(H=F||(F={})).LOADING_DATA="[AppDataState: Loading Data]",H.ADDING_DATA="[AppDataState: Adding Data]",H.DELETEING_DATA="[AppDataState: Deleteing Data]",H.IDLE="[AppDataState: Idle]",(W=U||(U={})).VIEWING_LOGIN_PAGE="[AppWindowState: Viewing Login Page]",W.LOGGING_IN="[AppWindowState: Logging In]",W.LOGGING_OUT="[AppWindowState: Logging Out]",W.VIEWING_HOME_PAGE="[AppWindowState: Viewing Home Page]",W.VIEWING_MONTHLY_PAGE="[AppWindowState: Viewing Monthly Page]",W.VIEWING_COMPARE_PAGE="[AppWindowState: Viewing Compare Page]";const q={type:"parallel",id:"app",states:{[V.DATA]:{initial:F.IDLE,states:{[F.IDLE]:{id:F.IDLE,on:{[P.LOGGED_IN_SUCCESFULLY]:F.LOADING_DATA,[P.CLICKED_ADD_ENTRY]:F.ADDING_DATA,[P.CLICKED_DELETE]:F.DELETEING_DATA}},[F.LOADING_DATA]:{id:F.LOADING_DATA,invoke:{src:(t,e)=>async function(){const t=p(h(),i().currentUser.email),e=await g(t),a=[];return e.forEach((t=>{const e=t.data();a.push({id:t.id,amount:e.amount,year:e.year,month:e.month,description:e.description,categories:e.categories})})),a}(),onDone:{actions:y({data:(t,e)=>e.data}),target:F.IDLE},onError:{actions:E(((t,e)=>console.log("Error Loading Data:",e))),target:F.IDLE}}},[F.ADDING_DATA]:{id:F.ADDING_DATA,invoke:{src:(t,e)=>async function(t,e){if(!(e instanceof Z))throw new Error("");console.log("Saving: ",e.entry);const a=p(h(),i().currentUser.email);delete e.entry.id;const r=await v(a,e.entry);return s(s({},e.entry),{id:r.id})}(0,e),onDone:{actions:y({data:(t,e)=>[...t.data,e.data]}),target:F.IDLE},onError:{actions:E(((t,e)=>console.log("Error Adding Data:",e))),target:F.IDLE}}},[F.DELETEING_DATA]:{id:F.DELETEING_DATA,invoke:{src:(t,e)=>async function(t,e){if(!(e instanceof J))throw new Error("");console.log("Deleteing ID: ",e.id);const a=u(h(),i().currentUser.email,e.id);return await m(a),e.id}(0,e),onDone:{actions:y({data:(t,e)=>t.data.filter((t=>t.id!==e.data))}),target:F.IDLE},onError:{actions:E(((t,e)=>console.log("Error Deleteing Data:",e))),target:F.IDLE}}}}},[V.WINDOW]:{initial:U.LOGGING_IN,on:{[P.CLICKED_LOG_OUT]:`.${U.LOGGING_OUT}`,[P.CLICKED_HOME]:`.${U.VIEWING_HOME_PAGE}`,[P.CLICKED_MONTHLY]:`.${U.VIEWING_MONTHLY_PAGE}`,[P.CLICKED_COMPARE]:`.${U.VIEWING_COMPARE_PAGE}`},states:{[U.LOGGING_IN]:{invoke:{src:(t,e)=>async function(t,e){const a=i();if(await n(a,d),!a.currentUser){if(!(e instanceof z))throw new Error("Must be ClickedLogInEvent (Error can occur on initial load of app)");await l(a,e.email,e.password)}}(0,e),onDone:{actions:f(new class{constructor(){this.type=P.LOGGED_IN_SUCCESFULLY}}),target:U.VIEWING_HOME_PAGE},onError:{actions:E(((t,e)=>console.log("Error Logging In:",e))),target:U.VIEWING_LOGIN_PAGE}}},[U.VIEWING_LOGIN_PAGE]:{on:{[P.CLICKED_LOG_IN]:U.LOGGING_IN}},[U.VIEWING_HOME_PAGE]:{},[U.VIEWING_MONTHLY_PAGE]:{},[U.VIEWING_COMPARE_PAGE]:{},[U.LOGGING_OUT]:{invoke:{src:(t,e)=>async function(){const t=i();await c(t)}(),onDone:U.VIEWING_LOGIN_PAGE,onError:U.VIEWING_LOGIN_PAGE}}}}}};function Q(t,e){null==t||t.addEventListener("keypress",(t=>{"Enter"===t.key&&e()}))}const tt=b`
  body, html {
    width: 100%;
    height: 100%;
    color: var(--colors-white);
  }
  
  * {
    font-family: 'Fira Sans';
  }

  body, html, h1, h2, p, span, div, form {
    padding: 0;
    margin: 0;
  }

  input, textarea, select {
    border: none;
    outline: none;
    padding: var(--gap-small) var(--gap-normal);
    color: var(--colors-white);
    background-color: var(--colors-grey-light);
    border-radius: var(--gap-small);
    resize: none;
    font-size: var(--font-size-medium);
  }

  label {
    font-size: var(--font-size-small);
  }

  button {
    line-height: 2rem;
    font-size: var(--font-size-large);
    padding: var(--gap-tiny) var(--gap-normal);
    cursor: pointer;
    border-radius: var(--gap-small);
    border: 1px solid var(--colors-primary-light);
    display: flex;
    gap: var(--gap-small);
    justify-content: center;
    align-items: center;
  }

  button svg {
    height: 1.5rem;
  }

  button.primary {
    background-color: var(--colors-primary-light);
    color: var(--colors-white);
    fill: var(--colors-white);
  }

  button.secondary {
    background-color: transparent;
    color: var(--colors-primary-light);
    fill: var(--colors-primary-light);
  }

  button.svg-only {
    padding: var(--gap-tiny) var(--gap-small);
  }

  button.primary:hover {
    background-color: var(--colors-primary-dark);
  }

  button.secondary:hover {
    background-color: var(--colors-grey-light);
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  *::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  * {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  .positive { color: var(--colors-primary-light); }
  .negative { color: var(--colors-red-normal); }
  .neutral { color: var(--colors-secondary); }

  .pane {
    background-color: var(--colors-grey-dark);
    border-radius: var(--gap-small);
    padding: var(--gap-normal) var(--gap-large);
  }
`;var et='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n<path d="M20.3287 11.0002V13.0002L7.50042 13.0002L10.7429 16.2428L9.32873 17.657L3.67188 12.0001L9.32873 6.34326L10.7429 7.75747L7.50019 11.0002L20.3287 11.0002Z"/>\n</svg>\n',at='<svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">\n  <path\n    clip-rule="evenodd"\n    d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"\n  />\n</svg>\n',rt='<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">\n  <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"/>\n  <circle cx="16" cy="23.5" r="1.5"/>\n  <path d="M17,8H15.5A4.49,4.49,0,0,0,11,12.5V13h2v-.5A2.5,2.5,0,0,1,15.5,10H17a2.5,2.5,0,0,1,0,5H15v4.5h2V17a4.5,4.5,0,0,0,0-9Z"/>\n</svg>',ot='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.138877272605896 24.26899528503418 99.864013671875 45.71800231933594">\n  <path d="M49.701 40.913a10.246 10.246 0 0 0 1.557-0.573c0.487-0.229 0.895-0.498 1.215-0.809 0.521-0.505 0.609-0.881 0.254-1.126-0.353-0.246-1.159-0.463-2.424-0.652l-3.882 3.685a17.53 17.53 0 0 0 1.587-0.164 13.571 13.571 0 0 0 1.693-0.361zM51.33 34.744l3.326-3.112a10.62 10.62 0 0 0-2.728 0.456 8.08 8.08 0 0 0-1.296 0.513 4.43 4.43 0 0 0-1.027 0.698c-0.451 0.416-0.539 0.73-0.265 0.948 0.281 0.215 0.943 0.382 1.99 0.497z" fill="#1DCA7F" data-fill-palette-color="accent"></path>\n  <path d="M75.028 49.957c0.348 0 0.679-0.138 0.925-0.382l23.665-23.077a1.304 1.304 0 0 0-0.923-2.229h-72.69c-0.315 0-0.619 0.113-0.857 0.32L0.589 47.666a1.305 1.305 0 0 0 0.858 2.291h73.581zM37.502 38.996l5.334-0.042c-0.807 0.717-1.043 1.281-0.714 1.693 0.333 0.415 1.015 0.679 2.053 0.792l4.264-3.989a6.866 6.866 0 0 0-0.415-0.079 12.446 12.446 0 0 0-0.605-0.078c-0.79-0.114-1.547-0.25-2.264-0.408-0.716-0.157-1.276-0.37-1.679-0.642-0.407-0.268-0.591-0.607-0.554-1.016 0.04-0.408 0.403-0.923 1.093-1.543 0.704-0.633 1.565-1.198 2.589-1.696 1.021-0.5 2.109-0.927 3.267-1.283a29.396 29.396 0 0 1 3.591-0.864 33.531 33.531 0 0 1 3.584-0.445l1.565-1.466 2.194-0.087-1.561 1.475c1.043 0.026 1.957 0.115 2.739 0.268 0.786 0.156 1.376 0.387 1.775 0.694 0.403 0.309 0.583 0.705 0.548 1.189-0.035 0.485-0.361 1.066-0.984 1.747l-5.31 0.125c0.517-0.517 0.663-0.948 0.445-1.292-0.221-0.343-0.749-0.502-1.595-0.478l-3.596 3.398c0.26 0.032 0.521 0.064 0.794 0.096 0.272 0.033 0.551 0.073 0.847 0.118 1.581 0.224 2.668 0.521 3.273 0.887 0.604 0.37 0.929 0.762 0.977 1.174 0.049 0.414-0.093 0.83-0.432 1.25-0.342 0.42-0.678 0.793-1.01 1.123-0.295 0.288-0.801 0.653-1.527 1.093-0.719 0.44-1.656 0.871-2.803 1.29-1.15 0.416-2.499 0.786-4.046 1.105-1.551 0.318-3.312 0.505-5.276 0.561l-1.727 1.631-2.263-0.021 1.733-1.622c-2.734-0.116-4.481-0.559-5.24-1.328-0.754-0.761-0.441-1.868 0.936-3.33z" fill="#1DCA7F" data-fill-palette-color="accent"></path>\n  <path d="M76.558 54.748H0.45v5.226h77.191c0.69 0 1.355-0.275 1.846-0.766L100 38.884v-7.58L76.558 54.748z" fill="#1DCA7F" data-fill-palette-color="accent"></path>\n  <path d="M0.45 64.761v5.226h79.804c0.691 0 1.356-0.276 1.846-0.766L100 51.398v-7.467l-20.826 20.83H0.45z" fill="#1DCA7F" data-fill-palette-color="accent">\n  </path>\n</svg>\n',st='<?xml version="1.0"?>\n<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">\n  <g>\n    <path d="M28,17H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z"/>\n    <path d="M16,29a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V28A1,1,0,0,1,16,29Z"/>\n  </g>\n</svg>',it=Object.defineProperty,nt=Object.getOwnPropertyDescriptor,lt=(t,e,a,r)=>{for(var o,s=r>1?void 0:r?nt(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&it(e,a,s),s};class ct extends I{clickedLogin(){const t=this.emailInput.value,e=this.passwordInput.value;t&&e&&(this.passwordInput.value="",this.dispatchEvent(new CustomEvent("clicked-login",{detail:{email:t,password:e}})))}firstUpdated(){Q(this.emailInput,(()=>this.clickedLogin())),Q(this.passwordInput,(()=>this.clickedLogin()))}render(){return w`
      <div class="login-window">
        <div class="logo-title">
          ${A(ot)}
          <h2>YABAT</h2>
        </div>
        <div class="inputs">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="your.name@gmail.com">
          <label for="password">Password</label>
          <input type="password" id="password"> 
        </div>
        <button class="primary" @click="${()=>this.clickedLogin()}">
          Login
        </button>
      </div>
      <div class="background"></div>
    `}static get styles(){return[x(tt),b`
        :host {
          color: var(--colors-white);
          /* Center window */
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          /* fix for background */
          position: relative;
          overflow: hidden;
        }

        .login-window {
          background-color: var(--colors-grey-dark);
          border-radius: var(--gap-small);
          padding: var(--gap-large);
          display: flex;
          flex-direction: column;
          gap: var(--gap-large);
          align-items: center;
          z-index: 2;
        }
        .logo-title {
          display: flex;
          gap: var(--gap-normal);
          justify-content: center;
        }
        .logo-title svg {
          width: 50px;
        }
        .inputs {
          display: flex;
          flex-direction: column;
          gap: var(--gap-small);
          width: 400px;
        }
        .inputs label {
          padding: var(--gap-small) 0 0 var(--gap-small);
        }
        .login-window button {
          width: 50%;
        }

        .background {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 0;
          top: 0;
          left: 0;
          background: 
            /* top, transparent black, faked with gradient */ 
            linear-gradient(
              rgba(0, 0, 0, 0.7), 
              rgba(0, 0, 0, 0.7)
            ),
            url('./login-background.jpg');
          background-size: cover;
          transform: scale(1.1);
          
          /* Add the blur effect */
          filter: blur(8px);
          -webkit-filter: blur(8px);
          -moz-filter: blur(8px);
          -o-filter: blur(8px);
          -ms-filter: blur(8px);
        }
      `]}}lt([C("#email")],ct.prototype,"emailInput",2),lt([C("#password")],ct.prototype,"passwordInput",2);var dt,pt;(pt=dt||(dt={})).JANUARY="January",pt.FEBRUARY="February",pt.MARCH="March",pt.APRIL="April",pt.MAY="May",pt.JUNE="June",pt.JULY="July",pt.AUGUST="August",pt.SEPTEMBER="September",pt.OCTOBER="October",pt.NOVEMBER="November",pt.DECEMBER="December";const ht=["January","February","March","April","May","June","July","August","September","October","November","December"];function gt(t){return t.toString().slice(0,3)}var vt,ut,mt,yt,Et,ft,bt,Ct,It,wt,At,xt,Ot;(ut=vt||(vt={})).INCOME="INCOME",ut.EXPENSE="EXPENSE",ut.SAVINGS="SAVINGS",(mt||(mt={})).INVESTMENT="INVESTMENT",(Et=yt||(yt={})).SALARY="SALARY",Et.SOCIAL_BENEFITS="SOCIAL_BENEFITS",Et.MEAL_VOUCHERS="MEAL_VOUCHERS",Et.REPAYMENT="REPAYMENT",Et.SECOND_HAND_SALE="SECOND_HAND_SALE",(bt=ft||(ft={})).REGULAR_SAVINGS="REGULAR_SAVINGS",bt.PENSION="PERSION",(It=Ct||(Ct={})).RECURRING="RECURRING",It.RENT="RENT",It.MORTGAGE="MORTGAGE",It.LOAN="LOAN",It.INSURANCE="INSURANCE",It.HOUSE_INSURANCE="HOUSE_INSURANCE",It.CAR_INSURANCE="CAR_INSURANCE",It.HEALTH_INSURANCE="HEALTH_INSURANCE",It.LOAN_BALANCE_INSURANCE="LOAN_BALANCE_INSURANCE",It.CREDIT_CARD="CREDIT_CARD",It.UTILITIES="UTILITIES",It.WATER="WATER",It.ELECTRIC="ELECTRIC",It.NATURAL_GAS="NATURAL_GAS",It.GAS="GAS",It.INTERNET="INTERNET",It.PHONE="PHONE",It.SUBSCRIPTION="SUBSCRIPTION",(At=wt||(wt={})).HEALTH="HEALTH",At.HOSPITAL="HOSPITAL",At.MEDICATION="MEDICATION",At.GROCERIES="GROCERIES",At.HOME="HOME",At.TAKE_OUT="TAKE_OUT",At.LEISURE="LEISURE",At.VACATION="VACATION",At.GAMES="GAMES",At.CLOTHES="CLOTHES",At.TRANSPORTATION="TRANSPORTATION",(Ot=xt||(xt={})).GIFT="GIFT",Ot.OTHER="OTHER";const kt=s(s(s(s(s(s(s({},vt),yt),wt),xt),ft),mt),Ct);function Nt(t){return t.split("_").map((t=>`${t.charAt(0)}${t.toLowerCase().slice(1)}`)).join(" ")}function Lt(t,e){return t.categories.includes(e)}function Dt(t,e){return e.every((e=>Lt(t,e)))}function St(t,e){return t.map((t=>e?Dt(t,e)?t.amount:0:t.amount)).reduce(((t,e)=>t+e),0)}function Mt(t){return St(t,[kt.INCOME])}function Gt(t){return St(t,[kt.EXPENSE])}function Tt(t){return St(t,[kt.EXPENSE,kt.INVESTMENT])}function _t(t){return St(t,[kt.SAVINGS])}function $t(t){return`€ ${t.toFixed(2)}`}const Pt={[kt.RENT]:"#0096FF",[kt.MORTGAGE]:"blue",[kt.INSURANCE]:"pink",[kt.UTILITIES]:"yellow",[kt.INTERNET]:"lightblue",[kt.HEALTH]:"red",[kt.HOME]:"pink",[kt.GROCERIES]:"green",[kt.TAKE_OUT]:"orange",[kt.LEISURE]:"lightyellow",[kt.CLOTHES]:"brown",[kt.TRANSPORTATION]:"yellow",[kt.INVESTMENT]:"purple",[kt.SUBSCRIPTION]:"#00AA5F"};function Rt(t){let e={};for(const[a,r]of Object.entries(Pt)){const o=St(t,[kt[a]]);o>0&&(e[a]={amount:o,color:r},t=t.filter((t=>!Lt(t,kt[a]))))}return e=Object.entries(e).sort((([,t],[,e])=>e.amount-t.amount)).reduce(((t,[e,a])=>s(s({},t),{[e]:a})),{}),e[kt.OTHER]={amount:St(t,[kt.EXPENSE]),color:"#444"},e}var Vt=Object.defineProperty,jt=Object.getOwnPropertyDescriptor,Ft=(t,e,a,r)=>{for(var o,s=r>1?void 0:r?jt(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Vt(e,a,s),s};class Ht extends I{render(){return w`
      <div>
        <canvas id="chart"></canvas>
      </div>
    `}updated(){var t;const e={};if(Object.keys(dt).forEach((t=>{const a=this.entries.filter((e=>e.month===t));e[t]=Mt(a)})),!this.chart)return;const a={type:"bar",data:{labels:ht.map((t=>gt(t))),datasets:[{data:Object.values(e),backgroundColor:"#1DCA7F",hoverBackgroundColor:"#FFF",borderColor:"#444",borderWidth:1,barPercentage:1,categoryPercentage:1}]},options:{color:"#FFF",responsive:!0,maintainAspectRatio:!1,layout:{padding:0},plugins:{legend:{display:!1}}}};null==(t=this.chartInstance)||t.destroy(),this.chartInstance=new k(this.chart,a)}static get styles(){return[x(tt),b`
        :host {
          display: flex;
        }
        div {
          flex: 1 1;
        }
        canvas {
          width: 100% !important;
        }
      `]}}Ft([O()],Ht.prototype,"entries",2),Ft([C("#chart")],Ht.prototype,"chart",2);var Ut=Object.defineProperty,Wt=Object.getOwnPropertyDescriptor,zt=(t,e,a,r)=>{for(var o,s=r>1?void 0:r?Wt(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Ut(e,a,s),s};class Bt extends I{render(){return w`
      <div>
        <canvas id="chart"></canvas>
      </div>
    `}updated(){var t;const e={};if(Object.keys(dt).forEach((t=>{const a=this.entries.filter((e=>e.month===t)),r=Tt(a);e[t]={exp:Gt(a)-r,inv:r}})),!this.chart)return;const a={type:"bar",data:{labels:ht.map((t=>gt(t))),datasets:[{data:Object.values(e).map((t=>t.exp)),backgroundColor:"#FF0000",hoverBackgroundColor:"#FFF",borderColor:"#444",borderWidth:1,barPercentage:1,categoryPercentage:1,label:"Expenses",stack:"0"},{data:Object.values(e).map((t=>t.inv)),backgroundColor:"purple",hoverBackgroundColor:"#FFF",borderColor:"#444",borderWidth:1,barPercentage:1,categoryPercentage:1,label:"Investments",stack:"0"}]},options:{color:"#FFF",responsive:!0,maintainAspectRatio:!1,layout:{padding:0},plugins:{legend:{display:!1}}}};null==(t=this.chartInstance)||t.destroy(),this.chartInstance=new k(this.chart,a)}static get styles(){return[x(tt),b`
        :host {
          display: flex;
        }
        div {
          flex: 1 1;
        }
        canvas {
          width: 100% !important;
        }
      `]}}zt([O()],Bt.prototype,"entries",2),zt([C("#chart")],Bt.prototype,"chart",2);var Yt=Object.defineProperty,Kt=Object.getOwnPropertyDescriptor,Xt=(t,e,a,r)=>{for(var o,s=r>1?void 0:r?Kt(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Yt(e,a,s),s};class Zt extends I{render(){return w`
      <div>
        <canvas id="chart"></canvas>
      </div>
    `}updated(){var t;const e={};if(Object.keys(dt).forEach((t=>{const a=this.entries.filter((e=>e.month===t));e[t]=_t(a)})),!this.chart)return;const a={type:"bar",data:{labels:ht.map((t=>gt(t))),datasets:[{data:Object.values(e),backgroundColor:"#6898AE",hoverBackgroundColor:"#FFF",borderColor:"#444",borderWidth:1,barPercentage:1,categoryPercentage:1}]},options:{color:"#FFF",responsive:!0,maintainAspectRatio:!1,layout:{padding:0},plugins:{legend:{display:!1}}}};null==(t=this.chartInstance)||t.destroy(),this.chartInstance=new k(this.chart,a)}static get styles(){return[x(tt),b`
        :host {
          display: flex;
        }
        div {
          flex: 1 1;
        }
        canvas {
          width: 100% !important;
        }
      `]}}Xt([O()],Zt.prototype,"entries",2),Xt([C("#chart")],Zt.prototype,"chart",2);var Jt=Object.defineProperty,qt=Object.getOwnPropertyDescriptor,Qt=(t,e,a,r)=>{for(var o,s=r>1?void 0:r?qt(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Jt(e,a,s),s};class te extends I{render(){return w`
      <div>
        <canvas id="chart"></canvas>
      </div>
    `}updated(){var t;if(!this.chart)return;const e=Rt(this.entries),a=Object.values(e).map((t=>t.amount)).reduce(((t,e)=>t+e),0),r={type:"doughnut",data:{labels:[...Object.entries(e).map((([t,e])=>`${Nt(t)} (${parseFloat((e.amount/a*100).toString()).toFixed(2)} %)`))],datasets:[{data:[...Object.values(e).map((t=>t.amount))],backgroundColor:[...Object.values(e).map((t=>t.color))],borderColor:"#444",borderWidth:1}]},options:{color:"#FFF",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,position:"left",align:"end"}}}};null==(t=this.chartInstance)||t.destroy(),this.chartInstance=new k(this.chart,r)}static get styles(){return[x(tt),b`
        :host {
          display: flex;
        }
        div {
          flex: 1 1;
        }
        canvas {
          width: 100% !important;
        }
      `]}}Qt([O()],te.prototype,"entries",2),Qt([C("#chart")],te.prototype,"chart",2);var ee=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,re=(t,e,a,r)=>{for(var o,s=r>1?void 0:r?ae(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&ee(e,a,s),s};class oe extends I{render(){return w`
      <div>
        <canvas id="chart"></canvas>
      </div>
    `}updated(){var t;const e={};if(Object.keys(dt).forEach((t=>{const a=this.entries.filter((e=>e.month===t));e[t]=Mt(a)-Gt(a)-_t(a)})),!this.chart)return;const a={type:"bar",data:{labels:ht.map((t=>gt(t))),datasets:[{data:Object.values(e),backgroundColor:"#666",hoverBackgroundColor:"#FFF",borderColor:"#444",borderWidth:1,barPercentage:1,categoryPercentage:1}]},options:{color:"#FFF",responsive:!0,maintainAspectRatio:!1,layout:{padding:0},plugins:{legend:{display:!1}}}};null==(t=this.chartInstance)||t.destroy(),this.chartInstance=new k(this.chart,a)}static get styles(){return[x(tt),b`
        :host {
          display: flex;
        }
        div {
          flex: 1 1;
        }
        canvas {
          width: 100% !important;
        }
      `]}}re([O()],oe.prototype,"entries",2),re([C("#chart")],oe.prototype,"chart",2);var se=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,ne=(t,e,a,r)=>{for(var o,s=r>1?void 0:r?ie(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&se(e,a,s),s};class le extends I{constructor(){super(...arguments),this.showMenu=!1}selected(t){this.value.innerText=this.options[t],this.dispatchEvent(new CustomEvent("selected",{detail:t}))}toggleMenu(){this.showMenu=!this.showMenu}firstUpdated(){this.container.addEventListener("click",(()=>{this.toggleMenu()}))}render(){return w`
      <div class="container">
        <div class="value-container">
          <p class="value">
            ${this.options&&Object.keys(this.options).length?this.options[Object.keys(this.options)[0]]:""}
          </p>
          ${A(at)}
        </div>
        ${this.showMenu?w`
          <div class="menu">
            ${Object.entries(this.options).map((([t,e])=>w`
              <p @click="${()=>this.selected(t)}">${e}</p>
            `))}
          </div>
        `:w``}
      </div>
    `}static get styles(){return[x(tt),b`
        .container {
          position: relative;
          color: var(--colors-white);
          background-color: var(--colors-grey-light);
          border-radius: var(--gap-small);
          font-size: var(--font-size-medium);
        }
        .value-container {
          padding: var(--gap-small) var(--gap-normal);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--gap-small);
        }
        .value-container svg {
          height: 20px;
          fill: var(--colors-white);
        }
        .menu {
          max-height: 200px;
          position: absolute;
          top: 0;
          left: -1px;
          z-index: 2;
          background-color: inherit;
          width: 100%;
          border-radius: var(--gap-small);
          overflow: scroll;
          border: 1px solid var(--colors-primary-dark);
        }
        .menu p {
          padding: var(--gap-small) var(--gap-normal);
        }
        .menu p:hover {
          background-color: var(--colors-primary-dark);
        }
      `]}}ne([O()],le.prototype,"options",2),ne([O()],le.prototype,"showMenu",2),ne([C(".container")],le.prototype,"container",2),ne([C(".menu")],le.prototype,"menu",2),ne([C(".value")],le.prototype,"value",2);var ce=Object.defineProperty,de=Object.getOwnPropertyDescriptor,pe=(t,e,a,r)=>{for(var o,s=r>1?void 0:r?de(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&ce(e,a,s),s};class he extends I{constructor(){super(),this.tooltipText=N('Charts on this page are not comparable in terms of scale, to compare charts please look at the Y axis too!<br/><br/>The expenses and savings may not add up to the total income listed on this page, a portion of the income may not be allocated to an expense nor a saving. You can find further details on the "Monthly Overview" page for that month.'),_("income-chart",$(Ht)()),_("expenses-chart",$(Bt)()),_("savings-chart",$(Zt)()),_("distribution-chart",$(te)()),_("netto-chart",$(oe)()),_("custom-select",$(le)())}changeSelectedYear(t){this.yearInput?this.yearInput.selected(t.toString()):setTimeout((()=>this.changeSelectedYear(t)),100)}render(){var t,e;const a=[...new Set([...null==(t=this.entries)?void 0:t.map((t=>t.year)),(new Date).getUTCFullYear()])];this.selectedYear||this.changeSelectedYear(Math.max(...a));const r=null==(e=this.entries)?void 0:e.filter((t=>this.selectedYear===t.year));return w`
      <div class="filter-container">
        <p>Show overview of year:</p>
        <custom-select id="yearSelection"
          @selected="${t=>this.selectedYear=+t.detail}"
          .options="${a.reduce(((t,e)=>s(s({},t),{[e]:e})),{})}"
        >
        </custom-select>
      </div>

      <div class="pane">
        <div class="title">
          <h2>Income</h2>
          <div>
            <h2 class="positive">${$t(Mt(r))}</h2>
            <div class="tooltip-container">
              ${A(rt)}
              <span class="tooltip">${this.tooltipText}</span>
            </div>
          </div>
        </div>
        <income-chart .entries="${r}"></income-chart>
      </div>

      <div class="pane">
        <div class="title">
          <h2>Expenses</h2>
          <div>
            <h2 class="negative">${$t(Gt(r))}</h2>
            <div class="tooltip-container">
              ${A(rt)}
              <span class="tooltip">${this.tooltipText}</span>
            </div>
          </div>
        </div>
        <expenses-chart .entries="${r}"></expenses-chart>
      </div>

      <div class="pane">
        <div class="title">
          <h2>Savings</h2>
          <div>
            <h2 class="neutral">${$t(_t(r))}</h2>
            <div class="tooltip-container">
              ${A(rt)}
              <span class="tooltip">${this.tooltipText}</span>
            </div>
          </div>
        </div>
        <savings-chart .entries="${r}"></savings-chart>
      </div>

      <div class="pane">
        <div class="title">
          <h2>Netto</h2>
          <div>
            <h2>${$t(Mt(r)-Gt(r)-_t(r))}</h2>
            <div class="tooltip-container">
              ${A(rt)}
              <span class="tooltip">${this.tooltipText}</span>
            </div>
          </div>
        </div>
        <netto-chart .entries="${r}"></netto-chart>
      </div>

      <div class="pane distribution">
        <div class="title">
          <h2>Expenses Distribution</h2>
        </div>
        <distribution-chart .entries="${r}"></distribution-chart>
      </div>
    `}static get styles(){return[x(tt),b`
        :host {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: var(--gap-large);
          grid-row-gap: var(--gap-large);
          grid-auto-rows: 1fr;
        }

        .filter-container {
          grid-column: 1 / 3;
          display: flex;
          justify-content: start;
          align-items: center;
          gap: var(--gap-normal);
        }

        .distribution {
          grid-column: 1 / 3;
          max-height: 500px !important;
        }

        @media only screen and (max-width: 1100px) {
          :host {
            grid-template-columns: 1fr;
          }
          .distribution, .filter-container {
            grid-column: 1 / 2;
          }
        }

        .pane {
          display: flex;
          flex-direction: column;
          gap: var(--gap-small);
          max-height: 250px;
        }
        
        .pane > *:last-child {
          flex: 1 1;
          max-height: calc(100% - var(--gap-normal) - var(--gap-small));
        }

        .pane .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pane .title > div {
          display: flex;
          gap: var(--gap-normal);
        }

        .tooltip-container svg {
          fill: var(--colors-grey-lighter);
          width: var(--gap-normal);
        }
        .tooltip-container {
          cursor: help;
          display: flex;
          align-items: center;
          position: relative;
        }
        .tooltip {
          display: none;
          position: absolute;
          top: 0;
          right: 0;
          color: var(--colors-grey-lighter);
          background-color: var(--colors-black);
          border: 1px solid var(--colors-grey-lighter);
          padding: var(--gap-small);
          border-radius: var(--gap-small);
          width: 300px;
          text-align: center;
        }
        .tooltip-container:hover .tooltip {
          display: inline-block;
        }
      `]}}pe([O()],he.prototype,"selectedYear",2),pe([O()],he.prototype,"entries",2),pe([C("#yearSelection")],he.prototype,"yearInput",2);class ge extends I{clickedLogout(){this.dispatchEvent(new CustomEvent("clicked-logout"))}render(){return w`
      <div class="header-section">
          ${A(ot)}
          <span class="title">YABAT</span>
      </div>
      <div class="header-section">
        <div class="user-dropdown">
          ${A('<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n  <path d="M12 14.4C11.0617 14.402 10.1439 14.1254 9.36285 13.6054C8.58183 13.0853 7.97274 12.3451 7.61274 11.4786C7.25274 10.6121 7.15803 9.65817 7.34061 8.73777C7.52318 7.81737 7.97483 6.97186 8.63833 6.30836C9.30183 5.64486 10.1473 5.19321 11.0677 5.01064C11.9881 4.82806 12.942 4.92277 13.8085 5.28277C14.6751 5.64277 15.4153 6.25186 15.9353 7.03288C16.4554 7.8139 16.732 8.7317 16.73 9.67004C16.73 10.9245 16.2317 12.1276 15.3446 13.0147C14.4576 13.9017 13.2545 14.4 12 14.4ZM12 6.40004C11.3588 6.39806 10.7314 6.5864 10.1972 6.94121C9.66311 7.29602 9.24628 7.80134 8.99952 8.3932C8.75275 8.98505 8.68716 9.63682 8.81105 10.266C8.93493 10.8951 9.24272 11.4734 9.69544 11.9275C10.1482 12.3816 10.7255 12.6912 11.3542 12.817C11.983 12.9429 12.635 12.8793 13.2276 12.6344C13.8202 12.3894 14.3268 11.9741 14.6833 11.4411C15.0397 10.9081 15.23 10.2813 15.23 9.64004C15.2221 8.78767 14.8787 7.97275 14.274 7.37189C13.6694 6.77103 12.8524 6.43263 12 6.43004V6.40004Z"/>\n  <path d="M19 19.28C18.832 19.2794 18.6691 19.2217 18.5383 19.1163C18.4074 19.0109 18.3163 18.864 18.28 18.7C17.9815 17.4723 17.2788 16.3807 16.2848 15.6008C15.2909 14.8208 14.0634 14.3979 12.8 14.4H11.2C9.93828 14.4001 8.71317 14.8241 7.72124 15.6039C6.72932 16.3836 6.02807 17.474 5.73 18.7C5.70636 18.7958 5.66408 18.8861 5.60555 18.9656C5.54703 19.0452 5.47341 19.1124 5.38891 19.1635C5.30441 19.2145 5.21068 19.2485 5.11306 19.2633C5.01545 19.2781 4.91587 19.2736 4.82 19.25C4.72414 19.2263 4.63387 19.1841 4.55435 19.1255C4.47482 19.067 4.40761 18.9934 4.35654 18.9089C4.30546 18.8244 4.27154 18.7307 4.25669 18.633C4.24184 18.5354 4.24636 18.4358 4.27 18.34C4.64867 16.7879 5.53761 15.408 6.79426 14.4216C8.0509 13.4351 9.60243 12.8993 11.2 12.9H12.79C14.3898 12.8963 15.9442 13.4322 17.2017 14.4212C18.4592 15.4102 19.3465 16.7944 19.72 18.35C19.7655 18.5435 19.7334 18.7471 19.6306 18.9172C19.5278 19.0873 19.3625 19.2103 19.17 19.26L19 19.28Z"/>\n  <path d="M12 22.31C9.96088 22.31 7.96755 21.7053 6.27208 20.5725C4.57661 19.4396 3.25515 17.8294 2.47481 15.9455C1.69447 14.0616 1.4903 11.9886 1.88811 9.98863C2.28592 7.98868 3.26786 6.15162 4.70974 4.70974C6.15162 3.26786 7.98868 2.28592 9.98863 1.88811C11.9886 1.4903 14.0616 1.69447 15.9455 2.47481C17.8294 3.25515 19.4396 4.57661 20.5725 6.27208C21.7053 7.96755 22.31 9.96088 22.31 12C22.3074 14.7336 21.2203 17.3544 19.2874 19.2874C17.3544 21.2203 14.7336 22.3074 12 22.31ZM12 3.19001C10.2576 3.19001 8.55423 3.7067 7.10543 4.67476C5.65664 5.64282 4.52744 7.01875 3.86063 8.62857C3.19382 10.2384 3.01935 12.0098 3.35929 13.7188C3.69922 15.4277 4.5383 16.9975 5.7704 18.2296C7.0025 19.4617 8.57229 20.3008 10.2813 20.6407C11.9902 20.9807 13.7616 20.8062 15.3714 20.1394C16.9813 19.4726 18.3572 18.3434 19.3253 16.8946C20.2933 15.4458 20.81 13.7425 20.81 12C20.8074 9.66426 19.8783 7.42494 18.2267 5.77332C16.5751 4.1217 14.3358 3.19265 12 3.19001Z"/>\n</svg>\n')}
          <span>
            <span><p>Logged in as: </p><p class="email">${i().currentUser.email}</p></span>
            <button class="secondary" @click="${()=>this.clickedLogout()}">Logout</button>
          </span>
        </div>
      </div>
    `}static get styles(){return[x(tt),b`
        :host {
          background-color: var(--colors-grey-dark);
          padding: var(--gap-small) var(--gap-normal);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: solid 1px var(--colors-primary-light);
        }
        .header-section {
          display: flex;
          gap: var(--gap-normal);
          align-items: center;
        }
        .header-section svg {
          height: 20px;
        }
        .title {
          font-size: var(--font-size-large);
        }
        .user-dropdown {
          position: relative;
          display: flex;
          align-items: center;
        }
        .user-dropdown  svg {
          height: 30px;
          fill: var(--colors-white);
        }
        .user-dropdown > span {
          display: none;
          position: absolute;
          z-index: 1;
          right: 0;
          top: calc(100% - var(--gap-tiny));
          background-color: var(--colors-grey-dark);
          border: solid 1px var(--colors-primary-light);
          border-radius: var(--gap-tiny);
          padding: var(--gap-normal);
          width: auto;
          white-space: nowrap;
          flex-direction: column;
          gap: var(--gap-small);
          align-items: flex-end;
        }
        .user-dropdown > span > span {
          display: flex;
          gap: var(--gap-small);
        }
        .user-dropdown .email {
          color: #AAA;
        }
        .user-dropdown:hover > span {
          display: flex;
        }
      `]}}class ve extends I{render(){return w`
      <div class="moving"></div>
    `}static get styles(){return[x(tt),b`
        :host {
          height: 2px;
          width: 100%;
          background-color: var(--colors-primary-dark);
          overflow-x: hidden;
        }
        .moving {
          width: 100%;
          height: 3px;
          border-bottom-left-radius: 2px;
          border-bottom-right-radius: 2px;
          background-color: var(--colors-primary-light);
          transform-origin: 0% 50%;
          animation: animation 1s linear infinite;
        }

        @keyframes animation {
          0% { transform: translateX(0) scaleX(0); }
          40% { transform: translateX(0) scaleX(0.4); }
          100% { transform: translateX(100%) scaleX(0.5); }
        }
      `]}}var ue=Object.defineProperty,me=Object.getOwnPropertyDescriptor;class ye extends I{clickedHome(){this.dispatchEvent(new CustomEvent("clicked-home"))}clickedMonthly(){this.dispatchEvent(new CustomEvent("clicked-monthly"))}clickedCompare(){this.dispatchEvent(new CustomEvent("clicked-compare"))}render(){const t=this.state.matches({[V.WINDOW]:U.VIEWING_HOME_PAGE}),e=this.state.matches({[V.WINDOW]:U.VIEWING_MONTHLY_PAGE}),a=this.state.matches({[V.WINDOW]:U.VIEWING_COMPARE_PAGE});return w`
      <div
        class="item ${t?"selected":""}"
        @click="${()=>this.clickedHome()}"
      >
        ${A('<?xml version="1.0" encoding="iso-8859-1"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201.865 201.865">\n\t<g>\n\t\t<path d="M200.65,105.892l-21.763-19.709V39.168c0-2.026-1.643-3.665-3.665-3.665h-19.158\n\t\t\tc-0.973,0-1.908,0.383-2.598,1.074c-0.691,0.691-1.077,1.625-1.066,2.602l0.05,23.059l-47.466-42.993\n\t\t\tc-1.389-1.256-3.482-1.267-4.889-0.032L1.247,106.278c-1.263,1.109-1.61,2.924-0.841,4.42c0.759,1.485,2.434,2.28,4.066,1.908\n\t\t\tl21.971-4.96v67.758c-0.021,0.591-0.032,3.647,2.18,5.944c0.981,1.009,2.738,2.222,5.569,2.222c5.282,0,49.027-0.054,49.027-0.054\n\t\t\tc2.029,0,3.661-1.643,3.665-3.665l0.057-40.509c-0.036-0.472,0.05-1.671,0.537-2.205c0.329-0.351,1.034-0.433,1.557-0.433h20.353\n\t\t\tc0.913,0,2.147,0.147,2.781,0.805c0.698,0.716,0.687,1.961,0.676,2.154l-0.093,40.058c0,0.97,0.379,1.904,1.07,2.598\n\t\t\tc0.687,0.687,1.632,1.081,2.598,1.081h48.003c3.264,0,5.268-1.378,6.363-2.527c2.559-2.663,2.473-6.313,2.459-6.564V106.54\n\t\t\tl24.111,5.64c1.643,0.39,3.307-0.39,4.091-1.868C202.225,108.834,201.896,107.019,200.65,105.892z M159.744,42.836h11.817v36.705\n\t\t\tl-11.76-10.651L159.744,42.836z M170.409,98.344c-1.081-0.258-2.24,0-3.11,0.698c-0.873,0.694-1.389,1.754-1.389,2.874v72.486\n\t\t\tc0,0.394-0.143,1.12-0.419,1.403c-0.225,0.222-0.762,0.251-1.07,0.251h-44.328l0.079-36.129c0.032-0.44,0.218-4.366-2.609-7.401\n\t\t\tc-1.356-1.435-3.858-3.153-8.181-3.153H89.029c-3.654,0-5.83,1.557-7.011,2.859c-2.516,2.788-2.473,6.524-2.409,7.573\n\t\t\tl-0.057,36.383c-10.629,0.011-41.017,0.05-45.366,0.05c-0.132,0-0.215-0.007-0.268-0.007c-0.007,0-0.018,0-0.025,0\n\t\t\tc-0.068-0.147-0.118-0.426-0.118-0.676v-72.493c0-1.113-0.515-2.169-1.381-2.867c-0.873-0.694-2.015-0.948-3.096-0.712\n\t\t\tl-12.433,2.806l85.613-75.406l49.986,45.269v0.218h0.236l32.51,29.447L170.409,98.344z"/>\n\t</g>\n</svg>\n')}
        <p>Home</p>
      </div>
      <div
        class="item ${e?"selected":""}"
        @click="${()=>this.clickedMonthly()}"
      >
        ${A('<?xml version="1.0" encoding="iso-8859-1"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 465 465">\n\t<g>\n\t\t<path d="M142.5,35H345v47.5c0,4.143,3.358,7.5,7.5,7.5s7.5-3.357,7.5-7.5V27.51l0-0.01l0-0.01V7.5c0-4.143-3.358-7.5-7.5-7.5\n\t\t\tS345,3.357,345,7.5V20H142.5c-4.142,0-7.5,3.357-7.5,7.5S138.358,35,142.5,35z"/>\n\t\t<path d="M432.5,20h-50c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5,7.5,7.5H425v95H40V35h65v47.5c0,4.143,3.358,7.5,7.5,7.5\n\t\t\ts7.5-3.357,7.5-7.5v-75c0-4.143-3.358-7.5-7.5-7.5S105,3.357,105,7.5V20H32.5c-4.142,0-7.5,3.357-7.5,7.5v370\n\t\t\tc0,4.143,3.358,7.5,7.5,7.5h330c0.251,0,0.501-0.013,0.749-0.038c0.186-0.019,0.368-0.05,0.549-0.082\n\t\t\tc0.059-0.01,0.119-0.015,0.178-0.026c0.214-0.043,0.423-0.099,0.63-0.158c0.026-0.008,0.054-0.013,0.08-0.021\n\t\t\tc0.208-0.063,0.41-0.138,0.609-0.218c0.027-0.011,0.054-0.019,0.081-0.029c0.189-0.079,0.371-0.168,0.552-0.261\n\t\t\tc0.037-0.02,0.076-0.035,0.112-0.055c0.165-0.088,0.323-0.187,0.48-0.287c0.05-0.031,0.102-0.059,0.151-0.092\n\t\t\tc0.146-0.098,0.285-0.205,0.423-0.313c0.055-0.043,0.113-0.081,0.167-0.125c0.169-0.139,0.33-0.287,0.486-0.439\n\t\t\tc0.018-0.019,0.039-0.033,0.057-0.052l70-70c0.015-0.015,0.027-0.031,0.042-0.046c0.157-0.16,0.308-0.324,0.451-0.498\n\t\t\tc0.039-0.047,0.071-0.098,0.109-0.145c0.114-0.146,0.227-0.292,0.33-0.446c0.028-0.041,0.05-0.085,0.077-0.127\n\t\t\tc0.106-0.164,0.209-0.331,0.301-0.504c0.017-0.03,0.029-0.063,0.045-0.094c0.096-0.187,0.188-0.375,0.269-0.569\n\t\t\tc0.009-0.022,0.015-0.045,0.024-0.066c0.082-0.204,0.159-0.411,0.223-0.623c0.008-0.025,0.012-0.052,0.02-0.077\n\t\t\tc0.061-0.208,0.116-0.418,0.159-0.632c0.012-0.061,0.017-0.122,0.028-0.183c0.031-0.181,0.063-0.36,0.081-0.545\n\t\t\tc0.025-0.248,0.038-0.498,0.038-0.749v-300C440,23.357,436.642,20,432.5,20z M40,145h385v175h-62.5c-4.142,0-7.5,3.357-7.5,7.5V390\n\t\t\tH40V145z M414.394,335L370,379.394V335H414.394z"/>\n\t\t<path d="M432.5,450h-400c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5,7.5,7.5h400c4.142,0,7.5-3.357,7.5-7.5S436.642,450,432.5,450z"/>\n\t\t<path d="M432.5,350c-4.142,0-7.5,3.357-7.5,7.5V420H40v-2.5c0-4.143-3.358-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v10\n\t\t\tc0,4.143,3.358,7.5,7.5,7.5h400c4.142,0,7.5-3.357,7.5-7.5v-70C440,353.357,436.642,350,432.5,350z"/>\n\t\t<path d="M288.954,207.071c-2.801-1.16-6.028-0.521-8.173,1.625l-21.4,21.399c-2.929,2.93-2.929,7.678,0,10.607\n\t\t\tc2.929,2.928,7.678,2.928,10.606,0l8.597-8.597V321c0,4.143,3.358,7.5,7.5,7.5s7.5-3.357,7.5-7.5V214\n\t\t\tC293.583,210.967,291.756,208.231,288.954,207.071z"/>\n\t\t<path d="M206.8,206.5c-19.511,0-35.384,15.873-35.384,35.384c0,4.143,3.358,7.5,7.5,7.5s7.5-3.357,7.5-7.5\n\t\t\tc0-11.239,9.144-20.384,20.384-20.384c11.239,0,20.383,9.145,20.383,20.384c0,8.15-4.839,15.502-12.329,18.729\n\t\t\tc-2.751,1.185-4.533,3.893-4.533,6.888s1.782,5.703,4.533,6.888c7.489,3.227,12.329,10.578,12.329,18.729\n\t\t\tc0,11.239-9.144,20.384-20.383,20.384c-11.24,0-20.384-9.145-20.384-20.384c0-4.143-3.358-7.5-7.5-7.5s-7.5,3.357-7.5,7.5\n\t\t\tc0,19.511,15.873,35.384,35.384,35.384c19.51,0,35.383-15.873,35.383-35.384c0-9.866-4.085-19.058-10.966-25.616\n\t\t\tc6.881-6.559,10.966-15.75,10.966-25.616C242.184,222.373,226.311,206.5,206.8,206.5z"/>\n\t</g>\n</svg>\n')}
        <p>Monthly Overview</p>
      </div>
      <div
        class="item ${a?"selected":""}"
        @click="${()=>this.clickedCompare()}"
      >
        ${A('<?xml version="1.0" encoding="iso-8859-1"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 518.462 518.462">\n\t<g>\n\t\t<g>\n\t\t\t<path d="M518.462,22.82H0l193.159,203.495l-0.014,269.327l132.173-68.37l-0.014-200.957L518.462,22.82z M212.837,463.286\n\t\t\t\tl0.014-244.827L45.846,42.512h426.769L305.611,218.459l0.014,196.832L212.837,463.286z"/>\n\t\t</g>\n\t</g>\n</svg>\n')}
        <p>Compare Expenses</p>
      </div>
    `}static get styles(){return[x(tt),b`
        :host {
          background-color: var(--colors-grey-dark);
        }
        .item {
          display: flex;
          gap: var(--gap-small);
          align-items: center;
          padding: calc(var(--gap-tiny) + var(--gap-small)) var(--gap-normal);
          cursor: pointer;
        }
        .item:hover {
          background-color: var(--colors-grey-light);
        }
        .selected, .selected:hover {
          background-color: var(--colors-primary-light);
        }
        svg { 
          height: var(--gap-normal);
          fill: var(--colors-white);
        }
      `]}}((t,e,a,r)=>{for(var o,s=r>1?void 0:r?me(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);r&&s&&ue(e,a,s)})([O()],ye.prototype,"state",2);var Ee=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,be=(t,e,a,r)=>{for(var o,s=r>1?void 0:r?fe(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Ee(e,a,s),s};class Ce extends I{constructor(){super(...arguments),this.showMenu=!1,this.selectedItems=[],this.selectedItemsValue=[]}selected(t,e){this.selectedItems=this.selectedItems.includes(t)?this.selectedItems.filter((e=>e!==t)):[...this.selectedItems,t],this.dispatchEvent(new CustomEvent("selected",{detail:this.selectedItems})),this.selectedItemsValue=this.selectedItems.map((t=>this.options[t]))}toggleMenu(){this.showMenu=!this.showMenu,this.container.style.border=this.showMenu?"1px solid var(--colors-primary-dark)":"none",this.container.style.borderRadius=this.showMenu?"var(--gap-small) var(--gap-small) 0 0":"var(--gap-small)",this.svg.style.transform=this.showMenu?"rotate(180deg)":"none"}reset(){this.selectedItems=[],this.selectedItemsValue=[],this.dispatchEvent(new CustomEvent("selected",{detail:[]}))}firstUpdated(){this.valueContainer.addEventListener("click",(()=>{this.toggleMenu()}))}render(){return w`
      <div class="container">

        <div class="value-container">
          <p>
            ${this.selectedItemsValue.length?this.selectedItemsValue.join(", "):"0 selected ..."}
          </p>
          ${A(at)}
        </div>

        ${this.showMenu?w`
          <div class="menu">
            ${Object.entries(this.options).map((([t,e])=>w`
              <div
                class="menu-item"
                @click="${()=>this.selected(t,e)}"
              >
                ${this.selectedItems.includes(t)?w`${A('<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n    <g stroke="none" stroke-width="1" fill="white" fill-rule="evenodd">\n        <g fill="#1DCA7F" fill-rule="nonzero">\n            <path d="M18,3 C19.6568542,3 21,4.34314575 21,6 L21,18 C21,19.6568542 19.6568542,21 18,21 L6,21 C4.34314575,21 3,19.6568542 3,18 L3,6 C3,4.34314575 4.34314575,3 6,3 L18,3 Z M16.4696699,7.96966991 L10,14.4393398 L7.53033009,11.9696699 C7.23743687,11.6767767 6.76256313,11.6767767 6.46966991,11.9696699 C6.1767767,12.2625631 6.1767767,12.7374369 6.46966991,13.0303301 L9.46966991,16.0303301 C9.76256313,16.3232233 10.2374369,16.3232233 10.5303301,16.0303301 L17.5303301,9.03033009 C17.8232233,8.73743687 17.8232233,8.26256313 17.5303301,7.96966991 C17.2374369,7.6767767 16.7625631,7.6767767 16.4696699,7.96966991 Z"></path>\n        </g>\n    </g>\n</svg>')}`:w`<svg viewBox="0 0 1 1"></svg>`}
                <p>${e}</p>
              </div>
            `))}
          </div>
        `:w``}

      </div>
    `}static get styles(){return[x(tt),b`
        .container {
          position: relative;
          color: var(--colors-white);
          background-color: var(--colors-grey-light);
          border-radius: var(--gap-small);
          font-size: var(--font-size-medium);
        }
        .value-container {
          padding: var(--gap-small) var(--gap-normal);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .value-container svg {
          height: 20px;
          fill: var(--colors-white);
        }
        .menu {
          max-height: 200px;
          overflow: scroll;
          position: absolute;
          top: 100%;
          left: -1px;
          z-index: 2;
          background-color: inherit;
          width: 100%;
          border-radius: 0 0 var(--gap-small) var(--gap-small);
          border: 1px solid var(--colors-primary-dark);
        }
        .menu-item {
          padding: var(--gap-small) var(--gap-normal);
          display: flex;
          gap: var(--gap-normal);
          align-items: center;
          line-height: var(--font-size-medium);
        }
        .menu-item svg {
          height: 20px;
          border-radius: 5px;
          border: 2px solid white;
        }
        .menu-item:hover {
          background-color: var(--colors-grey-lighter);
        }
      `]}}be([O()],Ce.prototype,"options",2),be([O()],Ce.prototype,"showMenu",2),be([O()],Ce.prototype,"selectedItems",2),be([O()],Ce.prototype,"selectedItemsValue",2),be([C(".container")],Ce.prototype,"container",2),be([C(".value-container")],Ce.prototype,"valueContainer",2),be([C(".value-container svg")],Ce.prototype,"svg",2),be([C(".menu")],Ce.prototype,"menu",2);var Ie=Object.defineProperty,we=Object.getOwnPropertyDescriptor,Ae=(t,e,a,r)=>{for(var o,s=r>1?void 0:r?we(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Ie(e,a,s),s};class xe extends I{constructor(){super(),this.mainCatValue=kt.INCOME,this.extraCats=[],_("custom-select",$(le)()),_("custom-select-multiple",$(Ce)())}firstUpdated(){Q(this.amountField,(()=>this.clickedAdd()))}clickedAdd(){var t;const e=Number(this.amountField.value);if(this.mainCatValue&&e){const a={categories:[this.mainCatValue,...this.extraCats],amount:e,description:null==(t=this.descriptionField)?void 0:t.value,year:0,month:dt.JANUARY,id:"filler"};this.dispatchEvent(new CustomEvent("clicked-add",{detail:a})),this.amountField.value="",this.descriptionField.value="",this.resetMultipleSelect()}}clickedMore(){this.dispatchEvent(new CustomEvent("show-recurring"))}changedMainCategory(t){this.mainCatValue=t.detail,this.resetMultipleSelect()}resetMultipleSelect(){var t;null==(t=this.shadowRoot.querySelector("custom-select-multiple"))||t.reset()}render(){return w`
      <div class="title">
        <h2>Add Income/Expense</h2>
        <div class="buttons">
          <button class="primary" @click="${()=>this.clickedAdd()}">
            ${A(st)}
            <p>Add</p>
          </button>
          <button class="secondary rotate" @click="${()=>this.clickedMore()}">
            <p>More</p>
            ${A(et)}
          </button>
        </div>
      </div>

      <div class="inputs">
        <p>Main category:</p>
        <custom-select
          @selected="${t=>this.changedMainCategory(t)}"
          .options="${Object.keys(vt).reduce(((t,e)=>s(s({},t),{[e]:Nt(e)})),{})}"
        >
        </custom-select>
        <p>Extra categories:</p>
        <custom-select-multiple
          @selected="${t=>this.extraCats=t.detail}"
          .options="${Object.keys(this.mainCatValue===kt.SAVINGS?ft:s(s(s({},this.mainCatValue===kt.EXPENSE?s(s({},Ct),wt):yt),xt),mt)).reduce(((t,e)=>s(s({},t),{[e]:Nt(e)})),{})}"
        >
        </custom-select-multiple>
        <p>Amount:</p>
        <input id="amountField">
        <p>Description:</p>
        <textarea id="descriptionField"></textarea>
      </div>
    `}static get styles(){return[x(tt),b`
        :host {
          display: flex;
          flex-direction: column;
          gap: var(--gap-normal);
        }
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .title .buttons {
          display: flex;
          gap: var(--gap-small);
        }
        .inputs {
          display: grid;
          grid-template-columns: 1fr 3fr;
          grid-column-gap: var(--gap-large);
          grid-row-gap: var(--gap-normal);
        }
        .secondary.rotate svg {
          transform: rotate(180deg);
        }
      `]}}Ae([O()],xe.prototype,"mainCatValue",2),Ae([O()],xe.prototype,"extraCats",2),Ae([C("#amountField")],xe.prototype,"amountField",2),Ae([C("#descriptionField")],xe.prototype,"descriptionField",2);var Oe=Object.defineProperty,ke=Object.getOwnPropertyDescriptor;class Ne extends I{clickedDelete(){this.dispatchEvent(new CustomEvent("clicked-delete",{detail:this.entry.id}))}render(){return w`
      <p>${$t(this.entry.amount)}</p>
      <p>${this.entry.categories.filter((t=>![kt.INCOME,kt.EXPENSE,kt.SAVINGS].includes(t))).map((t=>Nt(t))).join(", ")}</p>
      <p>${this.entry.description}</p>
      <p
        class="action-icon"
        @click="${()=>console.log("edit")}"
      >${A('<?xml version="1.0" encoding="utf-8"?>\n\x3c!-- Generator: Adobe Illustrator 19.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --\x3e\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">\n<g>\n\t<path d="M49.7574005,3.641675c-0.2174988-0.1520998-0.4855995-0.2114999-0.7468987-0.1636999\n\t\tc-0.2602997,0.0467-0.4914017,0.1949-0.6424026,0.4122999L25.3518009,36.9533768\n\t\tc-0.0888004,0.1266975-0.1463013,0.2728996-0.1687012,0.4269981l-1.5179996,10.4318008\n\t\tc-0.0545998,0.3733978,0.1072998,0.7467995,0.4173012,0.9622993c0.170599,0.1189003,0.3704987,0.1794014,0.5702991,0.1794014\n\t\tc0.1637993,0,0.3285999-0.0400009,0.4778004-0.1219025l9.2560005-5.0443001\n\t\tc0.1364975-0.0741005,0.2534981-0.1783981,0.341198-0.3061981L57.743,10.4184752\n\t\tc0.3149986-0.4524002,0.2038002-1.0743999-0.2486-1.3893003L49.7574005,3.641675z M33.2243996,42.1477737l-7.2964993,3.9757996\n\t\tl1.1973-8.222599l22.3104-32.0499992l6.0992012,4.2458L33.2243996,42.1477737z"/>\n\t<path d="M56.2173004,23.6249752c-0.551899,0-0.9984016,0.4465008-0.9984016,0.9983997v33.4958\n\t\tc0,2.1419983-1.7421989,3.884201-3.8840981,3.884201H9.1864004c-2.1420002,0-3.8842001-1.7422028-3.8842001-3.884201V15.9707747\n\t\tc0-2.1418991,1.7421999-3.8841991,3.8842001-3.8841991h24.8432999c0.5517998,0,0.9982986-0.4465008,0.9982986-0.9983006\n\t\ts-0.4464989-0.9982996-0.9982986-0.9982996H9.1864004c-3.2427001,0-5.8809004,2.6381998-5.8809004,5.8807993V58.119175\n\t\tc0,3.2425995,2.6382,5.8807983,5.8809004,5.8807983h42.1483994c3.2425995,0,5.8807983-2.6381989,5.8807983-5.8807983v-33.4958\n\t\tC57.2155991,24.071476,56.7691002,23.6249752,56.2173004,23.6249752z"/>\n\t<path d="M60.2495995,5.5067749l-8.0080986-5.3388c-0.4602013-0.306-1.0792999-0.1823-1.3843994,0.277\n\t\tc-0.3062019,0.4591-0.1823006,1.0782,0.2767982,1.3844l8.0082016,5.3386998\n\t\tc0.1706009,0.1131001,0.3625984,0.1676998,0.5527992,0.1676998c0.3226013,0,0.6394997-0.1559997,0.8316002-0.4445996\n\t\tC60.8325996,6.4319749,60.7088013,5.8128753,60.2495995,5.5067749z"/>\n</g>\n</svg>\n')}</p>
      <p
        class="action-icon delete"
        @click="${()=>this.clickedDelete()}"
      >${A('<?xml version="1.0" encoding="iso-8859-1"?>\n\x3c!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --\x3e\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 197.516 197.516">\n<path d="M68.758,170.083V72.649h15v97.434H68.758z M128.758,72.649h-15v97.434h15V72.649z M140.539,0v12.631h34.885v47.746h-10.525\n\tv137.139H32.617V60.377H22.092V12.631h34.883V0H140.539z M149.898,60.377H47.617v122.139h102.281V60.377z M125.539,27.631V15H71.975\n\tv12.631H37.092v17.585h123.332V27.631H125.539z"/>\n</svg>\n')}</p>
    `}static get styles(){return[x(tt),b`
        :host {
          display: flex;
          display: grid;
          grid-template-columns: 1fr 2fr 2fr 35px 35px;
          grid-column-gap: var(--gap-small);
        }
        p {
          background-color: var(--colors-grey-light);
          padding: var(--gap-small) var(--gap-normal);
          border-radius: var(--gap-small);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          cursor: default;
        }
        p svg {
          height: 15px;
          fill: var(--colors-white);
        }
        .action-icon {
          padding: var(--gap-small);
          cursor: pointer;
        }
        .action-icon:hover {
          background-color: var(--colors-grey-lighter);
        }
        .action-icon.delete:hover {
          background-color: var(--colors-red-normal);
        }
      `]}}((t,e,a,r)=>{for(var o,s=r>1?void 0:r?ke(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);r&&s&&Oe(e,a,s)})([O()],Ne.prototype,"entry",2);var Le=Object.defineProperty,De=Object.getOwnPropertyDescriptor;class Se extends I{clickedBack(){this.dispatchEvent(new CustomEvent("go-back"))}clickedAdd(t){this.dispatchEvent(new CustomEvent("clicked-add",{detail:t}))}render(){var t;return w`
      <div class="title">
        <button class="secondary" @click="${()=>this.clickedBack()}">
          ${A(et)}
          <p>Back</p>
        </button>
        <h2>Add Recurring Expenses</h2>
      </div>

      ${(null==(t=this.entries)?void 0:t.length)?w`
        <div class="list">
          ${this.entries.sort(((t,e)=>e.amount-t.amount)).map((t=>w`
            <div class="entry">
              <p>${$t(t.amount)}</p>
              <p>
                ${t.categories.filter((t=>![kt.RECURRING,kt.EXPENSE].includes(t))).map((t=>Nt(t))).join(", ")}
              </p>
              <button class="secondary" @click="${()=>this.clickedAdd(t)}">
                ${A(st)}
              </button>
            </div>
          `))}
        </div>
      `:w`
        <p class="empty-text">
          All recurring payments have been added to this
          month already, you can crete a new one in the "Add Income/Expense"
          form by adding the category "Recurring".
        </p>
      `}
    `}static get styles(){return[x(tt),b`
        :host {
          display: flex;
          flex-direction: column;
          gap: var(--gap-normal);
          max-height: 100%;
        }
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .list {
          overflow: scroll;
          display: flex;
          flex-direction: column;
          gap: var(--gap-small);
        }
        .entry {
          display: grid;
          grid-template-columns: 1fr 3fr 35px;
          grid-column-gap: var(--gap-small);
        }
        .entry p {
          background-color: var(--colors-grey-light);
          padding: var(--gap-small) var(--gap-normal);
          border-radius: var(--gap-small);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          cursor: default;
        }
        .entry > button svg {
          height: 15px;
        }
        .entry > button {
          padding: var(--gap-small);
          cursor: pointer;
        }
        .empty-text {
          color: var(--colors-grey-lighter);
          padding: var(--gap-large) var(--gap-huge);
          text-align: center;
        }
      `]}}((t,e,a,r)=>{for(var o,s=r>1?void 0:r?De(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);r&&s&&Le(e,a,s)})([O()],Se.prototype,"entries",2);var Me=Object.defineProperty,Ge=Object.getOwnPropertyDescriptor,Te=(t,e,a,r)=>{for(var o,s=r>1?void 0:r?Ge(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&Me(e,a,s),s};class _e extends I{constructor(){super(),this.selectedMonth=(new Date).getMonth(),this.selectedYear=(new Date).getFullYear(),this.filtered=[],this.totalIncome=0,this.totalInvestmentIncome=0,this.totalExpenses=0,this.totalInvestmentExpenses=0,this.totalSavings=0,this.totalNetto=0,_("add-entry",$(xe)()),_("single-entry",$(Ne)()),_("recurring-component",$(Se)())}firstUpdated(){var t;null==(t=this.input)||t.addEventListener("change",(t=>{const e=this.input.value.split("-");this.selectedYear=Number(e[0]),this.selectedMonth=Number(e[1])-1}))}updated(){this.handleBarChart(),this.handlePieChart()}handlePieChart(){var t;if(!this.pieChart)return;const e=Rt(this.filtered),a={type:"doughnut",data:{labels:[...Object.keys(e).map((t=>Nt(t)))],datasets:[{data:[...Object.values(e).map((t=>t.amount))],backgroundColor:[...Object.values(e).map((t=>t.color))],borderColor:"#444",borderWidth:1}]},options:{color:"#FFF",responsive:!0,maintainAspectRatio:!1,layout:{},plugins:{legend:{display:!0,position:"left",align:"end"},title:{display:!0,text:"Expenses Distribution",color:"#FFF",font:{size:20},align:"start",padding:0}}}};null==(t=this.pieChartInstance)||t.destroy(),this.pieChartInstance=new k(this.pieChart,a)}handleBarChart(){var t;if(!this.barChart)return;const e={borderColor:"#444",borderWidth:1,barPercentage:.9,categoryPercentage:.9},a={type:"bar",data:{labels:[""],datasets:[s({data:[this.totalIncome-this.totalInvestmentIncome],label:"Income",backgroundColor:"#1DCA7F",hoverBackgroundColor:"#0A0",stack:"0"},e),s({data:[this.totalInvestmentIncome],label:"Income from investments",backgroundColor:"purple",hoverBackgroundColor:"darkpurple",stack:"0"},e),s({data:[this.totalExpenses-this.totalInvestmentExpenses],label:"Expenses",backgroundColor:"#FF0000",hoverBackgroundColor:"#AA0000",stack:"1"},e),s({data:[this.totalSavings],label:"Savings",backgroundColor:"#6898AE",hoverBackgroundColor:"#6898AE",stack:"1"},e),s({data:[this.totalInvestmentExpenses],label:"Investments",backgroundColor:"purple",hoverBackgroundColor:"darkpurple",stack:"1"},e),s({data:[this.totalNetto>0?this.totalNetto:0],label:"Netto",backgroundColor:"#666",hoverBackgroundColor:"#FFF",stack:"1"},e)]},options:{color:"#FFF",responsive:!0,maintainAspectRatio:!1,layout:{padding:0},plugins:{legend:{display:!1}}}};null==(t=this.barChartInstance)||t.destroy(),this.barChartInstance=new k(this.barChart,a)}scrollToAdd(){var t;null==(t=this.addPane)||t.scrollIntoView({block:"center",behavior:"smooth"})}clickedAdd(t){this.dispatchEvent(new CustomEvent("clicked-add",{detail:s(s({},t.detail),{year:this.selectedYear,month:Object.keys(dt)[this.selectedMonth]})}))}clickedDelete(t){this.dispatchEvent(new CustomEvent("clicked-delete",{detail:t.detail}))}showRecurring(){this.addContainer.style.transform="translate(calc(-50% - var(--gap-huge)), 0)"}showAdd(){this.addContainer.style.transform="translate(0, 0)"}render(){const t=`${this.selectedMonth<9?"0":""}${this.selectedMonth+1}`;return this.filtered=this.entries.filter((t=>t.year===this.selectedYear&&t.month===Object.keys(dt)[this.selectedMonth])).sort(((t,e)=>t.categories.toString().localeCompare(e.categories.toString()))),this.totalIncome=Mt(this.filtered),this.totalInvestmentIncome=St(this.filtered,[kt.INCOME,kt.INVESTMENT]),this.totalExpenses=Gt(this.filtered),this.totalInvestmentExpenses=Tt(this.filtered),this.totalSavings=_t(this.filtered),this.totalNetto=function(t){return Mt(t)-Gt(t)-_t(t)}(this.filtered),w`
      <div class="filter-container">
        <div>
          <p>Select month:</p>
          <input type="month" id="dateInput"
            value="${this.selectedYear}-${t}"
          >
        </div>
        <div>
          <button class="secondary" @click="${()=>this.scrollToAdd()}">
            ${A(st)}
            <p>Add Income/Expense</p>
          </button>
        </div>
      </div>

      <div class="pane overview">
        <p>Income</p>
        <p class="positive large">${$t(this.totalIncome)}</p>
        <p>Expenses</p>
        <p class="negative large">${$t(this.totalExpenses)}</p>
        <p>Savings</p>
        <p class="neutral large">${$t(this.totalSavings)}</p>
        <p>Netto</p>
        <p class="large">${$t(this.totalNetto)}</p>
      </div>

      ${this.totalExpenses||this.totalIncome?w`
        <div class="charts">
          ${this.totalIncome||this.totalExpenses?w`
            <div class="pane bar-chart-container">
              <div>
                <canvas id="bar-chart"></canvas>
              </div>
            </div>
          `:w``}
    
          ${this.totalExpenses?w`
            <div class="pane pie-chart-container">
              <div>
                <canvas id="pie-chart"></canvas>
              </div>
            </div>
          `:""}
        </div>
      `:w``}

      <div class="addContainer">
        <div id="addPane" class="pane">
          <add-entry
            @clicked-add="${t=>this.clickedAdd(t)}"
            @show-recurring="${()=>this.showRecurring()}"
          ></add-entry>
        </div>
        <div class="pane">
          <recurring-component
            @go-back="${()=>this.showAdd()}"
            @clicked-add="${t=>this.clickedAdd(t)}"
            .entries="${this.entries.filter((t=>t.categories.includes(kt.RECURRING))).filter(((t,e,a)=>a.filter((e=>Dt(e,t.categories))).every((e=>Date.parse(`1 ${t.month} ${t.year}`)>=Date.parse(`1 ${e.month} ${e.year}`))))).filter((t=>!this.filtered.find((e=>e.categories.every((e=>t.categories.includes(e)))))))}"
          ></recurring-component>
        </div>
      </div>

      <div class="pane">
        <h2>Overview</h2>

        <div class="overview-section income">
          <h3>Income</h3>
          <div class="list">
            ${this.filtered.filter((t=>t.categories.includes(kt.INCOME))).sort(((t,e)=>e.amount-t.amount)).map((t=>w`
              <single-entry
                .entry="${t}"
                @clicked-delete="${t=>this.clickedDelete(t)}"
              ></single-entry>
            `))}
          </div>
        </div>

        <div class="overview-section savings">
          <h3>Savings</h3>
          <div class="list">
            ${this.filtered.filter((t=>t.categories.includes(kt.SAVINGS))).sort(((t,e)=>e.amount-t.amount)).map((t=>w`
              <single-entry
                .entry="${t}"
                @clicked-delete="${t=>this.clickedDelete(t)}"
              ></single-entry>
            `))}
          </div>
        </div>

        <div class="overview-section expenses">
          <h3>Expenses</h3>
          <div class="list">
            ${this.filtered.filter((t=>t.categories.includes(kt.EXPENSE))).map((t=>w`
              <single-entry
                .entry="${t}"
                @clicked-delete="${t=>this.clickedDelete(t)}"
              ></single-entry>
            `))}
          </div>
        </div>

      </div>
    `}static get styles(){return[x(tt),b`
        :host {
          display: flex;
          flex-direction: column;
          gap: var(--gap-large);
        }
        .filter-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--gap-normal);
        }
        .filter-container > div {
          display: flex;
          align-items: center;
          gap: var(--gap-normal);
        }
        .large {
          font-size: var(--gap-large);
          text-overflow: '';
          overflow: hidden;
          white-space: nowrap;
        }
        .pane.overview {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr 2fr;
          grid-row-gap: var(--gap-normal);
          grid-column-gap: var(--gap-normal);
        }
        .pane.overview p {
          line-height: var(--gap-large);
        }
        .charts {
          display: flex;
          gap: var(--gap-large);
          max-width: 100%;
        }
        .pie-chart-container {
          flex: 1 1;
        }
        .bar-chart-container {
          flex: 0 0;
          min-width: 150px !important;
        }
        .bar-chart-container > div {
          height: 100%;
        }
        .overview-section {
          border-left: 2px solid white;
          padding-left: var(--gap-normal);
        }
        .overview-section .list {
          display: flex;
          flex-direction: column;
          gap: var(--gap-small);
        }
        .income {
          border-color: var(--colors-primary-light);
        }
        .savings {
          border-color: var(--colors-secondary);
        }
        .expenses {
          border-color: var(--colors-red-normal);
        }
        .addContainer {
          width: calc(200% + var(--gap-huge) + 2*var(--gap-large)); 
          display: flex;
          gap: calc(var(--gap-huge) + 2*var(--gap-large));
          transition: transform 0.5s ease-in-out;
          max-height: 346px
        }
        .addContainer > div {
          flex: 1 1;
        }
      `]}}Te([C("#dateInput")],_e.prototype,"input",2),Te([C("#addPane")],_e.prototype,"addPane",2),Te([C("#bar-chart")],_e.prototype,"barChart",2),Te([C("#pie-chart")],_e.prototype,"pieChart",2),Te([C(".addContainer")],_e.prototype,"addContainer",2),Te([O()],_e.prototype,"entries",2),Te([O()],_e.prototype,"selectedMonth",2),Te([O()],_e.prototype,"selectedYear",2),Te([O()],_e.prototype,"filtered",2),Te([O()],_e.prototype,"totalIncome",2),Te([O()],_e.prototype,"totalInvestmentIncome",2),Te([O()],_e.prototype,"totalExpenses",2),Te([O()],_e.prototype,"totalInvestmentExpenses",2),Te([O()],_e.prototype,"totalSavings",2),Te([O()],_e.prototype,"totalNetto",2);var $e=Object.defineProperty,Pe=Object.getOwnPropertyDescriptor,Re=(t,e,a,r)=>{for(var o,s=r>1?void 0:r?Pe(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&$e(e,a,s),s};class Ve extends I{render(){return w`
      <div>
        <canvas id="chart"></canvas>
      </div>
    `}updated(){var t;if(!this.chart)return;const e=function(t,e){var a;let r={};for(const o of Object.values(dt)){const s={};for(const r of null!=e?e:[]){const e=St(t.filter((t=>t.month===o.toUpperCase())),[r]);s[r]={amount:e,color:null!=(a=Pt[r])?a:"white"}}r[o]=s,t=t.filter((t=>t.month!==o.toUpperCase()))}return r}(this.entries,this.categories),a={borderColor:"#444",borderWidth:1,barPercentage:.9,categoryPercentage:.9,hoverBackgroundColor:"white"},r={labels:Object.keys(e).map((t=>gt(t))),datasets:[...Object.keys(Object.values(e)[0]).map((t=>s({data:Object.values(e).map((e=>e[t].amount)),label:Nt(t),backgroundColor:Object.values(e)[0][t].color,stack:"0"},a)))]};r.datasets=r.datasets.length?r.datasets:[{}];const o={type:"bar",data:r,options:{color:"#FFF",responsive:!0,maintainAspectRatio:!1,layout:{padding:0},plugins:{legend:{display:!!r.datasets[0].label}}}};null==(t=this.chartInstance)||t.destroy(),this.chartInstance=new k(this.chart,o)}static get styles(){return[x(tt),b`
        :host {
          display: flex;
        }
        div {
          flex: 1 1;
        }
        canvas {
          width: 100% !important;
        }
      `]}}Re([O()],Ve.prototype,"entries",2),Re([O()],Ve.prototype,"categories",2),Re([C("#chart")],Ve.prototype,"chart",2);var je=Object.defineProperty,Fe=Object.getOwnPropertyDescriptor,He=(t,e,a,r)=>{for(var o,s=r>1?void 0:r?Fe(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&je(e,a,s),s};class Ue extends I{constructor(){super(),this.currentYear=(new Date).getUTCFullYear(),_("compare-chart",$(Ve)()),_("custom-select-multiple",$(Ce)())}render(){var t;const e=null==(t=this.entries)?void 0:t.filter((t=>this.currentYear===t.year));return w`
      <div class="pane">
        <h2>Select which categories to compare</h2>
        <custom-select-multiple
          @selected="${t=>this.selectedCategories=t.detail}"
          .options="${Object.keys(s({},Pt)).reduce(((t,e)=>s(s({},t),{[e]:Nt(e)})),{})}"
        >
        </custom-select-multiple>
      </div>

      <div class="pane chart">
        <compare-chart
          .entries="${e}"
          .categories="${this.selectedCategories}"
        ></compare-chart>
      </div>
    `}static get styles(){return[x(tt),b`
        :host {
          max-height: 100%;
          display: flex;
          flex-direction: column;
          gap: var(--gap-large);
          overflow: hidden !important;
        }
        .pane.chart {
          flex: 1 1;
          display: flex;
          max-height: calc(100% - 2*var(--gap-normal) - 3*var(--gap-large) - var(--gap-normal));
        }
        compare-chart {
          flex: 1 1;
        }
        h2 {
          padding-bottom: var(--gap-normal);
        }
      `]}}He([O()],Ue.prototype,"currentYear",2),He([O()],Ue.prototype,"entries",2),He([O()],Ue.prototype,"selectedCategories",2);var We=Object.defineProperty,ze=Object.getOwnPropertyDescriptor,Be=(t,e,a,r)=>{for(var o,s=r>1?void 0:r?ze(e,a):e,i=t.length-1;i>=0;i--)(o=t[i])&&(s=(r?o(e,a,s):o(s))||s);return r&&s&&We(e,a,s),s};class Ye extends I{constructor(){super(),k.register(...L),_("login-page",$(ct)()),_("home-page",$(he)()),_("monthly-page",$(_e)()),_("compare-page",$(Ue)()),_("page-header",$(ge)()),_("loading-bar",$(ve)()),_("sidebar-component",$(ye)()),this.machine=D(q).withContext({data:[]}),this.actor=S(this.machine).onTransition((t=>console.log("STATE: ",t.value))),this.subscribe("state",M(this.actor)),this.subscribe("entries",M(this.actor).pipe(G((t=>t.context.data)))),this.actor.start()}clickedLogin(t){this.actor.send(new z(t.detail.email,t.detail.password))}clickedLogout(){this.actor.send(new B)}clickedHome(){this.actor.send(new Y)}clickedMonthly(){this.actor.send(new K)}clickedCompare(){this.actor.send(new X)}clickedAddEntry(t){this.actor.send(new Z(t.detail))}clickedDelete(t){this.actor.send(new J(t.detail))}render(){var t,e,a,r,o,s,i,n,l;return w`

      ${(null==(t=this.state)?void 0:t.matches({[V.WINDOW]:U.LOGGING_OUT}))||(null==(e=this.state)?void 0:e.matches({[V.WINDOW]:U.LOGGING_IN}))||(null==(a=this.state)?void 0:a.matches({[V.DATA]:F.ADDING_DATA}))||(null==(r=this.state)?void 0:r.matches({[V.DATA]:F.LOADING_DATA}))?w`
      
        <loading-bar></loading-bar>

      `:w``}

      ${(null==(o=this.state)?void 0:o.matches({[V.WINDOW]:U.VIEWING_LOGIN_PAGE}))||(null==(s=this.state)?void 0:s.matches({[V.WINDOW]:U.LOGGING_IN}))?w`

        <login-page
          @clicked-login="${t=>this.clickedLogin(t)}"
        ></login-page>

      `:w`

        <page-header
          @clicked-logout="${()=>this.clickedLogout()}"
        ></page-header>

        <div class="body">
          <sidebar-component
            @clicked-home="${()=>this.clickedHome()}"
            @clicked-monthly="${()=>this.clickedMonthly()}"
            @clicked-compare="${()=>this.clickedCompare()}"
            .state="${this.state}"
          ></sidebar-component>

          ${(null==(i=this.state)?void 0:i.matches({[V.WINDOW]:U.VIEWING_HOME_PAGE}))?w`
            <home-page
              .entries="${this.entries}"
            ></home-page>
          `:w``}

          ${(null==(n=this.state)?void 0:n.matches({[V.WINDOW]:U.VIEWING_MONTHLY_PAGE}))?w`
            <monthly-page
              .entries="${this.entries}"
              @clicked-add="${t=>this.clickedAddEntry(t)}"
              @clicked-delete="${t=>this.clickedDelete(t)}"
            ></monthly-page>
          `:w``}

          ${(null==(l=this.state)?void 0:l.matches({[V.WINDOW]:U.VIEWING_COMPARE_PAGE}))?w`
            <compare-page
              .entries="${this.entries}"
            ></compare-page>
          `:w``}

        </div>

      `}
    `}static get styles(){return[x(tt),b`
        :host {
          height: 100%;
          max-height: 100%;
          width: 100%;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          background-color: var(--colors-black);
          color: var(--colors-white);
        }
        loading-bar {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10;
        }
        page-header {
          flex: 0;
        }
        .body {
          flex: 1 0;
          display: flex;
          height: calc(100% - var(--header-height) - 1px);
        }
        .body > *:last-child  {
          overflow: scroll;
          padding: var(--gap-large);
          background-color: var(--colors-black);
          height: calc(100% - 2 * var(--gap-large));
          max-height: calc(100% - 2 * var(--gap-large));
          width: 100%;
          max-width: 100%;
        }
        sidebar-component {
          min-width: 250px;
          flex: 0 0;
        }
        home-page {
          flex: 1 0;
        }
      `]}}Be([O()],Ye.prototype,"state",2),Be([O()],Ye.prototype,"entries",2),T({apiKey:"AIzaSyAL-nNMVRScFecxz2HymYpxtr_o8mO3KXA",authDomain:"yabat-e3d19.firebaseapp.com",projectId:"yabat-e3d19",storageBucket:"yabat-e3d19.appspot.com",messagingSenderId:"658164896532",appId:"1:658164896532:web:3b4d16d313681ef1032801"}),_("app-root",$(Ye)());
