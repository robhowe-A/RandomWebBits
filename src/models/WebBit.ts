//--Copyright (c) Robert A. Howell

class WebBit {
    id: string;
    articleNumber: number;
    name: string;
    description: string;
    dateCreated: Date;
    articleLink: string;
    cardImage: string;
    cardImageALT: string;

    constructor(
        id: string,
        articleNumber: number,
        name: string,
        description: string,
        dateCreated: Date,
        articleLink: string,
        cardImage: string,
        cardImageALT: string
    ) {
        this.id = id;
        this.name = name;
        this.articleNumber = articleNumber;
        this.description = description;
        this.dateCreated = dateCreated;
        this.articleLink = articleLink;
        this.cardImage = cardImage;
        this.cardImageALT = cardImageALT
    }
}

export default WebBit;