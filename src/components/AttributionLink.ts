//--Copyright (c) Robert A. Howell
import LinkDetails from "./LinkDetails";

//Icon links used for image Attribution
class AttributionLink extends LinkDetails {
    attributeowner: string;
    articleid: number;
    
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