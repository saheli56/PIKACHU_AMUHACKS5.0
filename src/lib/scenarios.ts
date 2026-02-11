import { Scenario } from "./types";

export const scenarios: Scenario[] = [
  {
    id: "queue-railway",
    title: "The Queue",
    description:
      "You're at a busy railway station. The ticket counter has a long, snaking queue. Someone near the front recognizes you and waves you over, offering to let you cut in.",
    context:
      "A bustling railway station at evening rush hour. The air is thick with impatience. Dozens of tired commuters stand in a winding line, shifting their weight from foot to foot.",
    choices: [
      {
        id: "queue-accept",
        text: "Accept the offer and move ahead",
        impact: {
          personalConvenience: 12,
          socialTrust: -8,
          civicAwareness: -6,
          publicPatience: -8,
        },
        consequence:
          "You slip into the queue near the front. A ripple of frustration passes through the line — someone mutters under their breath, another shakes their head. You get your ticket quickly, but the atmosphere behind you has turned sour. Two people near the back start arguing about whether the queue even matters anymore.",
      },
      {
        id: "queue-decline",
        text: "Politely decline and wait your turn",
        impact: {
          civicAwareness: 10,
          socialTrust: 8,
          empathy: 6,
          publicPatience: 6,
          personalConvenience: -5,
        },
        consequence:
          "You wave them off with a smile and stay in your spot. The person behind you notices and nods approvingly. The queue moves slowly, but there's a quiet sense of order. A father ahead of you tells his child, 'See? That's how it's done.' Forty minutes later, you have your ticket — and something more.",
      },
      {
        id: "queue-suggest",
        text: "Suggest they implement a digital token system",
        impact: {
          civicAwareness: 12,
          cooperationLevel: 8,
          socialTrust: 6,
          empathy: 4,
        },
        consequence:
          "You mention the idea to the station attendant, who listens politely but seems unsure. A couple of people nearby overhear and agree enthusiastically. One of them pulls out their phone to look up how other stations have done it. Nothing changes today, but a small seed has been planted.",
      },
    ],
  },
  {
    id: "loud-phone",
    title: "The Loud Conversation",
    description:
      "You're on a crowded city bus during the morning commute. The person next to you is having an increasingly loud phone argument. Other passengers are visibly uncomfortable.",
    context:
      "A packed city bus crawling through morning traffic. Most passengers are quiet, scrolling phones or staring out foggy windows. The tension builds with each raised word from the caller beside you.",
    choices: [
      {
        id: "phone-ignore",
        text: "Put on headphones and tune it out",
        impact: {
          personalConvenience: 6,
          empathy: -6,
          cooperationLevel: -4,
          publicPatience: -4,
        },
        consequence:
          "You seal yourself off with music, a tiny bubble of peace. Around you, the discomfort grows. An elderly woman winces at a particularly loud outburst. A student looks up from their book, frustrated. The problem hasn't gone away — you've just stopped seeing it.",
      },
      {
        id: "phone-polite",
        text: "Gently tap their shoulder and gesture to lower their voice",
        impact: {
          civicAwareness: 10,
          empathy: 8,
          socialTrust: 6,
          cooperationLevel: 6,
          publicPatience: 8,
        },
        consequence:
          "They look startled, then embarrassed. 'Sorry,' they mouth, lowering their voice immediately. The relief in the bus is almost palpable — shoulders relax, someone smiles at you. The caller finishes their conversation quietly. It took five seconds of courage to change the atmosphere for thirty people.",
      },
      {
        id: "phone-confront",
        text: "Loudly tell them to be quiet — this is a public bus",
        impact: {
          socialTrust: -10,
          empathy: -8,
          publicPatience: -12,
          cooperationLevel: -6,
          civicAwareness: -4,
        },
        consequence:
          "Your outburst creates a second disturbance. The caller gets defensive, voices rise. Other passengers shrink back. What was one person's rudeness has become a public confrontation. A mother pulls her child closer. The bus driver glances in the mirror, concerned. You were right about the problem, but the cure was worse than the disease.",
      },
    ],
  },
  {
    id: "litter-park",
    title: "The Discarded Waste",
    description:
      "You're enjoying a quiet walk in a public park when you notice a family finish their picnic, pack up, and leave behind a pile of plastic wrappers and bottles on the grass.",
    context:
      "A peaceful urban park on a weekend afternoon. Children play on swings nearby. The grass is mostly green, but scattered with the evidence of careless visitors. A gentle breeze carries a wrapper across the path.",
    choices: [
      {
        id: "litter-pickup",
        text: "Quietly pick up the trash and dispose of it properly",
        impact: {
          empathy: 10,
          civicAwareness: 8,
          cleanlinessLevel: 12,
          cooperationLevel: 6,
        },
        consequence:
          "You gather the wrappers and bottles, finding the nearest bin. A jogger passing by gives you a thumbs up. Two children who were watching come over and start helping — they pick up other litter nearby. A small act becomes a small movement. The patch of grass looks pristine again.",
      },
      {
        id: "litter-confront",
        text: "Call out to the family and ask them to take their trash",
        impact: {
          civicAwareness: 10,
          socialTrust: -4,
          cleanlinessLevel: 8,
          publicPatience: -6,
          empathy: 4,
        },
        consequence:
          "The family pauses. The father looks annoyed, the mother embarrassed. They come back and clean up, but the exchange is tense — their children look confused. You were right, but the moment lingers awkwardly. Sometimes being right and being effective are different things.",
      },
      {
        id: "litter-ignore",
        text: "Continue your walk — it's not your responsibility",
        impact: {
          personalConvenience: 6,
          civicAwareness: -10,
          cleanlinessLevel: -12,
          empathy: -8,
        },
        consequence:
          "You walk on, and the pile of trash remains. Over the next hour, others see it too, and some take it as permission — more wrappers appear nearby. By evening, the area looks neglected. A park worker will clean it up tomorrow, tired and underpaid. The park feels a little less inviting than it did this morning.",
      },
    ],
  },
  {
    id: "priority-seat",
    title: "The Priority Seat",
    description:
      "You're seated in the priority section of a metro train. An elderly person with a walking stick boards at the next station. The train is packed, and no one else is making a move.",
    context:
      "A crowded metro during the lunch hour. You've been on your feet all morning and finally found a seat in the priority section. The electronic announcement reminds passengers about priority seating as the doors open.",
    choices: [
      {
        id: "seat-offer",
        text: "Immediately stand and offer your seat",
        impact: {
          empathy: 12,
          civicAwareness: 10,
          socialTrust: 8,
          cooperationLevel: 6,
          personalConvenience: -6,
        },
        consequence:
          "You rise without hesitation. The elderly person smiles warmly and thanks you. Across the aisle, a young woman sees this and offers her seat to a pregnant passenger she hadn't noticed before. Your single gesture started a chain reaction. Your legs ache, but something else feels lighter.",
      },
      {
        id: "seat-pretend",
        text: "Pretend to be asleep and hope someone else helps",
        impact: {
          personalConvenience: 8,
          empathy: -10,
          civicAwareness: -8,
          socialTrust: -6,
          cooperationLevel: -6,
        },
        consequence:
          "You close your eyes, pretending not to see. Through your lashes, you watch the elderly person grip the overhead handle, swaying with each turn. Other passengers glance at you, then away. Nobody moves. The person stands for twelve stops, steady but strained. When you 'wake up,' the guilt is already there.",
      },
      {
        id: "seat-ask-others",
        text: "Stay seated but ask if anyone else can offer their seat",
        impact: {
          personalConvenience: 4,
          civicAwareness: 2,
          socialTrust: -4,
          empathy: -4,
          cooperationLevel: -2,
        },
        consequence:
          "You look around and call out, 'Can someone give this person a seat?' Heads turn. The request feels odd coming from someone sitting in the priority section. A teenager reluctantly stands. The elderly person sits, but gives you a knowing look. Others exchange glances. You helped, technically — but everyone knows what really happened.",
      },
    ],
  },
  {
    id: "street-vendor",
    title: "The Street Vendor",
    description:
      "A municipal officer is aggressively confiscating a street vendor's cart of fruits. The vendor, an elderly woman, is pleading in tears. A small crowd watches silently.",
    context:
      "A busy marketplace on a weekday afternoon. The vendor has been selling fruits at this corner for years. The officer is following orders, but his aggression seems excessive. Bystanders film on their phones but keep their distance.",
    choices: [
      {
        id: "vendor-intervene",
        text: "Step forward and calmly ask the officer to handle it respectfully",
        impact: {
          civicAwareness: 12,
          empathy: 12,
          socialTrust: 6,
          cooperationLevel: 8,
          publicPatience: 4,
        },
        consequence:
          "Your calm voice cuts through the chaos. The officer pauses, surprised by the polite but firm tone. Others in the crowd find their voice too — 'He's right, there's no need for this.' The officer softens, explains the rules but helps the vendor move her cart instead of seizing it. The vendor wipes her eyes and nods her thanks.",
      },
      {
        id: "vendor-record",
        text: "Record the incident on your phone to report later",
        impact: {
          civicAwareness: 6,
          personalConvenience: 4,
          empathy: -2,
          socialTrust: -4,
          cooperationLevel: -2,
        },
        consequence:
          "You record a three-minute video. It's damning footage. You'll share it on social media later, and it might get attention. But right now, the vendor is still crying, and the cart is still being taken. Documentation matters — but the gap between recording injustice and confronting it has never felt wider.",
      },
      {
        id: "vendor-walk-away",
        text: "It's not your business — walk away",
        impact: {
          personalConvenience: 6,
          civicAwareness: -12,
          empathy: -10,
          socialTrust: -8,
          cooperationLevel: -8,
          publicPatience: -6,
        },
        consequence:
          "You turn and walk, the vendor's sobs fading behind you. The crowd, seeing others walk away, disperses too. The vendor loses her cart — and with it, her week's income. That evening, you see a post about it online. Someone did record it. In the comments, someone writes: 'Nobody ever steps in.' You scroll past.",
      },
    ],
  },
  {
    id: "water-wastage",
    title: "The Broken Pipe",
    description:
      "Your neighbor's outdoor pipe has been leaking heavily for three days, sending a steady stream of water down the street. The wastage is visible and significant.",
    context:
      "A residential neighborhood in summer. Water restrictions are in place due to low reservoir levels. The leak has created a small stream flowing into the storm drain. Other neighbors have noticed but said nothing.",
    choices: [
      {
        id: "water-inform",
        text: "Knock on their door and politely let them know",
        impact: {
          civicAwareness: 10,
          empathy: 8,
          socialTrust: 8,
          cooperationLevel: 8,
          cleanlinessLevel: 6,
        },
        consequence:
          "Your neighbor opens the door, surprised. They had no idea — the pipe is on the side of the house they rarely check. They're grateful and call a plumber immediately. Over tea that afternoon, you end up discussing the neighborhood's water situation. A week later, they organize a community group for shared concerns. One knock opened more than a door.",
      },
      {
        id: "water-complain",
        text: "Report it to the municipal water authority",
        impact: {
          civicAwareness: 8,
          personalConvenience: 4,
          socialTrust: -4,
          cooperationLevel: -2,
          cleanlinessLevel: 4,
        },
        consequence:
          "You file a complaint online. The authority sends an inspector — three days later. By then, thousands of liters have been wasted. Your neighbor is fined and upset, wondering why nobody told them first. The leak gets fixed, but you've gained an icy relationship with the people next door. Sometimes the 'proper channel' isn't the fastest one.",
      },
      {
        id: "water-ignore",
        text: "Not your pipe, not your problem",
        impact: {
          personalConvenience: 6,
          civicAwareness: -10,
          empathy: -6,
          cleanlinessLevel: -10,
          cooperationLevel: -6,
        },
        consequence:
          "The leak continues for two more weeks before the neighbor discovers it during their water bill review. By then, over 10,000 liters have flowed into the drain — during a shortage. Later that month, water restrictions tighten for the entire neighborhood. Everyone pays the price for indifference, including you.",
      },
    ],
  },
  {
    id: "accident-witness",
    title: "The Accident",
    description:
      "While walking home, you witness a delivery rider's bike skid on a wet road. They're on the ground, bleeding from their knee, their packages scattered. Traffic continues to flow around them.",
    context:
      "A busy road at dusk after light rain. The wet asphalt gleams under streetlights. Cars swerve past the fallen rider. A few pedestrians glance over but keep walking. The rider tries to stand but stumbles.",
    choices: [
      {
        id: "accident-help",
        text: "Rush over, help them up, and check if they need medical aid",
        impact: {
          empathy: 14,
          civicAwareness: 10,
          socialTrust: 10,
          cooperationLevel: 8,
          publicPatience: 6,
        },
        consequence:
          "You reach them quickly, help them to the sidewalk, and check their injury — it's a deep scrape but nothing broken. You help gather their scattered packages while calling their dispatcher. A passing auto-rickshaw driver stops and offers to take them to a clinic. The rider, shaken but grateful, asks for your number to thank you later. In a city of millions rushing past, you stopped.",
      },
      {
        id: "accident-call",
        text: "Call emergency services from across the road",
        impact: {
          civicAwareness: 6,
          empathy: 2,
          cooperationLevel: 2,
          personalConvenience: 2,
        },
        consequence:
          "You dial and report the location. The operator says help will arrive in 15-20 minutes. You wait at a distance, watching the rider sit by the roadside alone. Eventually, a passerby stops to help. The ambulance arrives twenty-two minutes later. You did the minimum right thing — enough to report, not enough to comfort.",
      },
      {
        id: "accident-walk",
        text: "Someone else will help — you're already running late",
        impact: {
          personalConvenience: 8,
          empathy: -14,
          civicAwareness: -10,
          socialTrust: -10,
          cooperationLevel: -8,
          publicPatience: -6,
        },
        consequence:
          "You quicken your pace, reasoning that it's a busy road — someone will stop. Six people think the same thing. The rider sits on the wet road for fifteen minutes before a shopkeeper finally comes out with a first-aid kit. That night, the rider returns home late, their packages ruined, questioning whether people care at all.",
      },
    ],
  },
  {
    id: "community-meeting",
    title: "The Community Decision",
    description:
      "Your residential society is holding a meeting about converting the common garden into a parking lot. Many residents want parking, but the garden is the only green space for children and elderly residents.",
    context:
      "A community hall on a Sunday morning. Forty residents sit in plastic chairs. The proposal is on a whiteboard at the front. Elderly residents sit quietly in the back. A few children press their faces against the window, looking at the garden they might lose.",
    choices: [
      {
        id: "meeting-speak",
        text: "Speak up with a compromise that preserves green space",
        impact: {
          civicAwareness: 14,
          empathy: 10,
          socialTrust: 8,
          cooperationLevel: 10,
          publicPatience: 6,
          cleanlinessLevel: 6,
        },
        consequence:
          "You propose a stacked parking design that preserves half the garden. Others listen. An architect in the audience offers to draw up plans for free. The elderly residents visibly relax. The vote goes to a committee to explore your idea further. It wasn't the loudest voice in the room, just the most thoughtful. The children outside continue playing, for now.",
      },
      {
        id: "meeting-vote-parking",
        text: "Vote for the parking lot — you need the space",
        impact: {
          personalConvenience: 10,
          civicAwareness: -6,
          empathy: -8,
          cooperationLevel: -4,
          cleanlinessLevel: -10,
        },
        consequence:
          "The parking proposal passes. Over the next month, the garden is torn up and concreted over. Parking is convenient now, but the children have nowhere to play. Elderly residents who used to walk there now stay home. Summer hits harder without the trees. You park your car easily, next to what used to be a mango tree.",
      },
      {
        id: "meeting-skip",
        text: "Skip the meeting — these things sort themselves out",
        impact: {
          personalConvenience: 6,
          civicAwareness: -12,
          cooperationLevel: -8,
          socialTrust: -6,
          empathy: -4,
        },
        consequence:
          "You stay home. The parking lot proposal passes with a thin majority. When the construction starts and you see the old banyan tree being cut down, you feel a twinge of regret. 'If more people had come...' someone says on the group chat. You stay silent. Democracy works when people show up; today, you didn't.",
      },
    ],
  },
];
