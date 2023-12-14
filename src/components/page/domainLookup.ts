//--Copyright (c) 2023 Robert A. Howell
import { RwbReferenceError } from "../../models/rwbErrorBus";

const domainLookup = {
  init: () => {
    // Get the form, assign to a variable
    let formElemClassName = "searchWhoIS";
    let form: HTMLFormElement;
    form = document.getElementById(`${formElemClassName}`) as HTMLFormElement | null;
    if (form == null) {
      new RwbReferenceError("ElementNotFound", `Element not found: '${formElemClassName}':`);
    }
    form.addEventListener("submit", domainLookup.searchWHOIS);
  },
  searchWHOIS: () => {
    let inputElem = document.getElementById("txtSearch") as HTMLInputElement;
    let value = inputElem.value;
    var URL = "https://www.whois.com/whois/" + value;
    window.open(URL, "_blank");
    return false;
  },
};

export default domainLookup;
