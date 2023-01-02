//Set up WebBit class
class WebBit {
    constructor(
        id,
        articleNumber,
        name,
        description,
        dateCreated,
        articleLink,
        cardImage,
        cardImageALT
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