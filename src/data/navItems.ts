"strict mode";
//--Copyright (c) 2023 Robert A. Howell
import RwbLink from "../models/rwbLink";

/**
 * Header navigation link data
 */
const homeNavLink = new RwbLink("Index", "Home", "Home", "index.html");

const pagesNavLink = new RwbLink("Pages", "Pages", "Pages", "pages.html");

const gameNavLink = new RwbLink(
  "Game",
  "FlashCards",
  "Game",
  "flashcards.html"
);

/** Navigation links */
const NAVITEMS = [homeNavLink, pagesNavLink, gameNavLink];
export default NAVITEMS;
