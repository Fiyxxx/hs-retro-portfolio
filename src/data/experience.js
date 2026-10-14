import { orgs } from "./orgs";

const at = (org) => ({ label: org.name, href: org.href, logos: org.logo ? [org.logo] : [] });

export const current = [
  {
    lead: "software engineer intern",
    ...at(orgs.ecovolt),
    note: "ai agent harness and iot device monitoring for energy tech",
  },
  {
    lead: "co-founder",
    ...at(orgs.assessmate),
    note: "on-prem ai case-notes copilot for early childhood assessors",
  },
];

export const prev = [
  {
    lead: "cybersecurity engineer intern",
    ...at(orgs.csit),
    note: "hardening networks and reversing malware for the government",
  },
  {
    lead: "frontend dev",
    ...at(orgs.nus),
    note: "making nus health & wellbeing webpages better",
  },
  {
    lead: "quant research consultant",
    ...at(orgs.worldquant),
    note: "trading alphas from academic finance papers",
  },
];
