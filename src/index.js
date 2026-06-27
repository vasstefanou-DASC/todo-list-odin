import "./styles.css"
import domCreation from "./dom.js";

console.log("Hello");
console.log(new Date(Date.now()).toDateString());

domCreation.createDialogs();
domCreation.createHeader();
domCreation.createAside();
domCreation.testing();
domCreation.footer();