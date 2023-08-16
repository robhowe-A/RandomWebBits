//--Copyright (c) 2023 Robert A. Howell
import LinkDetails from "./LinkDetails";

/** 
 * Used for image Attribution
*/
class AttributionLink extends LinkDetails {
    /**Name of the owner */
    public attributedowner: string;
    /**WebBits article data ID */
    public articleid: number;
    public static count: number = 0;

    constructor(
        /**Link title */
        title: string,
        /**Link inner text */
        innerText: string,
        /** link href */
        hReference: string,
        /**Name of the owner */
        attributedowner: string,
        /**WebBits page */
        pageName: string,
        /**WebBits article data ID */
        articleid: number

    ) {
        super(title, innerText, pageName, hReference);
        this.attributedowner = attributedowner;
        this.articleid = articleid;
        AttributionLink.count++;
    }
}

export default AttributionLink;
