import "./styles.css"
import domCreation from "./dom.js";

console.log("Hello");
console.log(new Date(Date.now()).toDateString());

domCreation.createHeader();
domCreation.createAside();
domCreation.testing();
domCreation.footer();