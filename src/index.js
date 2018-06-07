import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


window.addEventListener("offline", (event) => {messageAlert(event)});

window.addEventListener("online", (event) => {messageAlert(event)});

function messageAlert(event) {
    if (event.type === "offline") {
        alert("Your internet connection is broken. If you are still running the application you might get:\n- error messages\n- wrong data\n- unexpected functionality");
    } else if (event.type === "online") {
        alert("Your internet connection is restored");
    }
}

window.onclose = () => {
    window.removeEventListener("offline", messageAlert);
    window.removeEventListener("online", messageAlert);
}

ReactDOM.render( < App / > , document.getElementById('root'));
registerServiceWorker();