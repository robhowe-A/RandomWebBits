//--Copyright (c) Robert A. Howell
import FlashcardCardElems from '../models/FlashcardCardElems'

const flashcardgameWidget = {
    init: () => {
        // Establish which port numbers to test and the definition
        const portdefinitions = new Map<number, string>([
            [22, "Secure SSH  /TCP"],
            [23, "Telnet (unsecure)"],
            [25, "SMTP - 465 for encrypted."],
            [49, "TACACS+"],
            [53, "DNS  /UDP/TCP"],
            [67, "DHCP"],
            [68, "DHCP"],
            [80, "HTTP  /TCP"],
            [88, "Kerberos-sec  /TCP/UDP"],
            [110, "POP - 995 for encrypted."],
            [135, "RPC"],
            [137, "NETBIOS"],
            [138, "NETBIOS"],
            [139, "NETBIOS"],
            [143, "IMAP - 993 for encrypted"],
            [161, "SNMP  Manager"],
            [162, "SNMP  Agent"],
            [389, "LDAP - 636 for secure"],
            [443, "HTTPS  /TCP"],
            [445, "SMB  /TCP"],
            [465, "SMTP by TLS"],
            [514, "SYSLOG  /UDP"],
            [587, "SMTPS for MSA"],
            [636, "LDAP SSL"],
            [990, "FTPS"],
            [1812, "RADIUS  /TCP/UDP"],
            [1813, "RADIUS  /TCP/UDP"],
            [3269, "Microsoft Global Catalog"],
            [3389, "RDP"],
        ]);

        // Create flashcard elements
        let mainFlashCardDivs = new FlashcardCardElems(portdefinitions);
        
        // Add the game's title element
        let mainFlashCardPageDiv = document.getElementById("mainFlashCards");
        const gametitleElem = mainFlashCardPageDiv.appendChild(document.createElement("h2"));
        gametitleElem.innerText = "Computing Port Numbers"

        // Add the flashcards to page
        for (let elem of mainFlashCardDivs.m_flashcardsArr){
            mainFlashCardPageDiv.appendChild(elem);
        }

    }
};

export default flashcardgameWidget;