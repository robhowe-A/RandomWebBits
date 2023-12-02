//--Copyright (c) 2023 Robert A. Howell
import { RWBReferenceError } from "../models/RWBErrorBus";

const domainlookup = {
  init: () => {
    // Get the form, assign to a variable
    let formelemclassname = "searchWhoIS";
    let form: HTMLFormElement;
    form = document.getElementById(`${formelemclassname}`) as HTMLFormElement | null;
    if (form == null) {
      new RWBReferenceError("ElementNotFound", `Element not found: '${formelemclassname}':`);
    }
    form.addEventListener("submit", domainlookup.searchWHOIS);
  },
  searchWHOIS: () => {
    let inputelem = document.getElementById("txtSearch") as HTMLInputElement;
    let value = inputelem.value;
    var URL = "https://www.whois.com/whois/" + value;
    window.open(URL, "_blank");
    return false;
  },
};

export default domainlookup;
