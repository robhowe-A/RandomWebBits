//--Copyright (c) 2023 Robert A. Howell

class LinkDetails {
    title: string;
    innerText: string;
    pageName: string;
    hReference: string;

    constructor(title: string, innerText: string, pageName: string, hReference: string) {
        this.title = title,
        this.innerText = innerText,
        this.pageName = pageName,
        this.hReference = hReference
    }
}

export default LinkDetails;