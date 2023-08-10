"strict mode"
//--Copyright (c) 2023 Robert A. Howell
import LinkDetails from '../models/LinkDetails';

/**
 * Header navigation link data
 */
const homeNavLink = new LinkDetails(
    "Index",
    "Home",
    "Home",
    "index.html"
);

const pagesNavLink = new LinkDetails(
    "Pages",
    "Pages",
    "Pages",
    "pages.html"
);

const gameNavLink = new LinkDetails(
    "Game",
    "FlashCards",
    "Game",
    "flashcards.html"
);

/** Navigation links */
const NAVITEMS = [homeNavLink, pagesNavLink, gameNavLink];
export default NAVITEMS;
