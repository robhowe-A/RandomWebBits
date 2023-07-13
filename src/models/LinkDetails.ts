//--Copyright (c) 2023 Robert A. Howell

/**
 * HTML link element data. Used with anchor tags.
 */
class LinkDetails {
    /**HTML title attribute */
    title: string;
    /**Inner text string*/
    innerText: string;
    /**The page the link is associated to*/
    pageName: string;
    /**HTML href attribute*/
    hReference: string;

    constructor(title: string, innerText: string, pageName: string, hReference: string) {
        this.title = title,
        this.innerText = innerText,
        this.pageName = pageName,
        this.hReference = hReference
    }
}

export default LinkDetails;