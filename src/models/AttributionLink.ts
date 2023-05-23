//--Copyright (c) 2023 Robert A. Howell
import LinkDetails from "./LinkDetails";

//Icon links used for image Attribution
class AttributionLink extends LinkDetails {
    attributeowner: string;
    articleid: number;

    constructor(
        title: string,
        innerText: string,
        hReference: string,
        attributeowner: string,
        pageName: string,
        articleid: number

    ) {
        super(title, innerText, pageName, hReference);
        this.attributeowner = attributeowner;
        this.articleid = articleid;
    }
}

export default AttributionLink;