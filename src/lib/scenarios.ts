import { Scenario } from "./types";

export const scenarios: Scenario[] = [
  {
    id: "queue-railway",
    title: "Queue at Railway Counter",
    description:
      "You are at a busy railway station. The ticket counter has a long queue. Someone near the front offers to let you cut in because you seem to be in a hurry.",
    choices: [
      {
        id: "queue-accept",
        text: "Accept the offer and skip ahead",
        impact: {
          personalConvenience: 10,
          socialTrust: -5,
          civicAwareness: -5,
          publicPatience: -5,
        },
      },
      {
        id: "queue-decline",
        text: "Decline and wait your turn",
        impact: {
          civicAwareness: 10,
          socialTrust: 5,
          empathy: 5,
          publicPatience: 5,
          personalConvenience: -5,
        },
      },
      {
        id: "queue-suggest",
        text: "Suggest the station install a digital queue system",
        impact: {
          civicAwareness: 10,
          cooperationLevel: 5,
          socialTrust: 5,
        },
      },
    ],
  },
  {
    id: "loud-phone",
    title: "Loud Phone Call in Public Transport",
    description:
      "You are on a crowded bus. The person next to you is having a very loud phone conversation. Other passengers look visibly annoyed.",
    choices: [
      {
        id: "phone-ignore",
        text: "Put on headphones and ignore it",
        impact: {
          personalConvenience: 5,
          empathy: -5,
          cooperationLevel: -5,
        },
      },
      {
        id: "phone-polite",
        text: "Politely ask them to lower their voice",
        impact: {
          civicAwareness: 10,
          empathy: 5,
          socialTrust: 5,
          cooperationLevel: 5,
          publicPatience: 5,
        },
      },
      {
        id: "phone-confront",
        text: "Loudly tell them to stop talking",
        impact: {
          socialTrust: -10,
          empathy: -5,
          publicPatience: -10,
          cooperationLevel: -5,
        },
      },
    ],
  },
  {
    id: "litter-park",
    title: "Litter in Public Park",
    description:
      "You are walking through a public park and notice someone leaving trash on a bench as they get up to leave.",
    choices: [
      {
        id: "litter-pickup",
        text: "Pick up the trash yourself and dispose of it",
        impact: {
          empathy: 10,
          civicAwareness: 5,
          cleanlinessLevel: 10,
          cooperationLevel: 5,
        },
      },
      {
        id: "litter-confront",
        text: "Point out the trash to the person who left it",
        impact: {
          civicAwareness: 10,
          socialTrust: -5,
          cleanlinessLevel: 5,
          publicPatience: -5,
        },
      },
      {
        id: "litter-ignore",
        text: "Walk past without doing anything",
        impact: {
          personalConvenience: 5,
          civicAwareness: -10,
          cleanlinessLevel: -10,
          empathy: -5,
        },
      },
    ],
  },
];
