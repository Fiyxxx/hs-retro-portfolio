import { orgs } from "./orgs";

export const achievements = [
  {
    lead: "1st place",
    label: "replit hackathon",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7456726410288881664/",
    logos: [orgs.replit.logo],
  },
  {
    lead: "2nd place",
    label: "cactus × deepmind hackathon",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7433763987210784768/",
    logos: [orgs.cactus.logo, orgs.deepmind.logo],
  },
  {
    lead: "2nd place",
    label: "nus student life hackathon",
    logos: [orgs.nus.logo],
  },
  {
    lead: "fellow",
    label: "ccsgp public service fellowship",
    href: "https://www.ccsgp.comp.nus.edu.sg/fellowship-programme",
    logos: [orgs.nus.logo],
  },
  {
    lead: "student scholar",
    label: "ai engineer singapore",
    href: orgs.aie.href,
    logos: [orgs.aie.logo],
  },
];
