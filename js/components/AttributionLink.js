//--Copyright (c) Robert A. Howell
import LinkDetails from "./LinkDetails.js";

//Icon links used for image Attribution
class AttributionLink extends LinkDetails {
    constructor(
        title,
        innerText,
        hReference,
        attributeowner,
        pageName,
        articleid
        ) {
        super(title, innerText, pageName, hReference);
        this.attributeowner = attributeowner;
        this.articleid = articleid;
    }
}

export default AttributionLink;