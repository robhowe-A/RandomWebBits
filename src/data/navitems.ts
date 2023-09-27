"strict mode";
//--Copyright (c) 2023 Robert A. Howell
import RWBLink from "../models/RWBLink";

/**
 * Header navigation link data
 */
const homeNavLink = new RWBLink("Index", "Home", "Home", "index.html");

const pagesNavLink = new RWBLink("Pages", "Pages", "Pages", "pages.html");

const gameNavLink = new RWBLink(
  "Game",
  "FlashCards",
  "Game",
  "flashcards.html"
);

/** Navigation links */
const NAVITEMS = [homeNavLink, pagesNavLink, gameNavLink];
export default NAVITEMS;
