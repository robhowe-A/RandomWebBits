//--Copyright (c) Robert A. Howell

class LinkDetails {
    title: string;
    innerText: string;
    pageName: string;
    hReference: string;

    constructor(title, innerText, pageName, hReference) {
        this.title = title,
        this.innerText = innerText,
        this.pageName = pageName,
        this.hReference = hReference
    }
}

export default LinkDetails;