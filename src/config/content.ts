/**
 * =========================================================================
 * "A Little More Us" - Content & Personalization Configuration
 * =========================================================================
 * 
 * Edit this file to easily customize all names, messages, chapters, 
 * and love letter contents without touching any component code!
 */

export interface AppContent {
  metadata: {
    title: string;
    description: string;
    author: string;
  };
  opening: {
    greeting: string;
    headline: string;
    subheadline: string;
    buttonText: string;
  };
  envelope: {
    waxSealLabel: string;
    envelopeHint: string;
    envelopeOpenedHint: string;
    salutation: string;
    letterBody: string[];
    closingQuestion: string;
    buttonText: string;
  };
  story: {
    sectionBadge: string;
    chapters: {
      id: number;
      chapterNumber: string;
      title: string;
      subtitle: string;
      text: string;
      highlightWord?: string;
      iconName?: string;
    }[];
    backButtonText: string;
    nextButtonText: string;
    finishButtonText: string;
  };
  loveLetter: {
    badge: string;
    salutation: string;
    paragraphs: string[];
    signOff: string;
    signature: string;
    buttonText: string;
  };
  anticipation: {
    teaserTitle: string;
    teaserSubtitle: string;
    buttonText: string;
  };
  scratchCards: {
    title: string;
    card1: {
      image: string;
      caption: string;
    };
    card2: {
      image: string;
      caption: string;
    };
  };
  holdInteraction: {
    promptAbove: string;
    promptBelow: string;
    holdingText: string;
    holdSuccessText: string;
    hintText: string;
    holdDurationMs: number; // e.g. 2800ms
  };
  finalPayoff: {
    headline: string;
    subheadline: string;
    paragraphs: string[];
    closingTagline: string[];
    signature: string;
    choicePrompt: string;
    choiceTalk: {
      buttonText: string;
      responseTitle: string;
      responseMessage: string;
    };
    choiceTime: {
      buttonText: string;
      responseTitle: string;
      responseMessage: string;
    };
    replayButtonText: string;
  };
  ambientAudio: {
    enabledByDefault: boolean;
    title: string;
    subtitle: string;
  };
}

export const content: AppContent = {
  metadata: {
    title: "A Little More Us ♡",
    description: "A sincere interactive digital love letter and romantic apology.",
    author: "Your Person",
  },

  // Screen 1: The Opening
  opening: {
    greeting: "Hey, you… ♡",
    headline: "I made something\njust for you.",
    subheadline: "Because some feelings deserve more than a simple message.",
    buttonText: "Open my heart ♡",
  },

  // Screen 2: The Interactive Envelope
  envelope: {
    waxSealLabel: "Touch to unseal",
    envelopeHint: "Tap the wax seal to open this letter",
    envelopeOpenedHint: "A letter just for you",
    salutation: "Hey, my love…",
    letterBody: [
      "I know things haven't felt right between us, and I've been thinking about it.",
      "I don't want to pretend that a simple sorry can fix everything. I just want you to know that your feelings matter to me.",
      "I care about you, and I'm genuinely sorry for my part in what hurt you.",
    ],
    closingQuestion: "Will you let me share a few more words with you?",
    buttonText: "Read a little more ♡",
  },

  // Screen 3: The Emotional Journey Chapters
  story: {
    sectionBadge: "A gentle reflection",
    chapters: [
      {
        id: 1,
        chapterNumber: "01",
        title: "Some moments stay with us.",
        subtitle: "Remembering our foundation",
        text: "I keep thinking about the little things that make us, us. The conversations, the laughs, and the moments that mean more than they seem.",
        highlightWord: "moments",
      },
      {
        id: 2,
        chapterNumber: "02",
        title: "You deserve to be heard.",
        subtitle: "Honoring how you feel",
        text: "I'm sorry for the way I made you feel. I don't want to dismiss your feelings or rush you into being okay. I want to listen and understand.",
        highlightWord: "listen",
      },
      {
        id: 3,
        chapterNumber: "03",
        title: "Love means showing up.",
        subtitle: "Commitment through every storm",
        text: "I know love isn't just about saying beautiful things. It's about patience, honesty, understanding, and the effort we make even after difficult moments.",
        highlightWord: "effort",
      },
    ],
    backButtonText: "Back",
    nextButtonText: "Next chapter",
    finishButtonText: "Read my letter ♡",
  },

  // Screen 4: The Personal Love Letter
  loveLetter: {
    badge: "Written from the heart",
    salutation: "My favourite person,",
    paragraphs: [
      "I'm sorry for my part in what happened between us.",
      "You mean so much to me, and I never want my words or actions to make you feel like your feelings don't matter.",
      "I can't change the moments that hurt you, but I can take responsibility for my actions and try to do better.",
      "I miss the warmth between us. I miss being able to talk openly and feel close to you.",
      "I'm not asking you to forget anything or pretend everything is okay.",
      "I just hope we can take things one step at a time, whenever you're ready.",
      "You are important to me. Always.",
    ],
    signOff: "With love,",
    signature: "Your person ♡",
    buttonText: "One last thing… ♡",
  },

  // Screen 5: Anticipation for the Final Surprise
  anticipation: {
    teaserTitle: "One last little thing…",
    teaserSubtitle: "It's something I want to ask you, from my heart.",
    buttonText: "I'm ready ♡",
  },

  // Screen: Scratch to Reveal Interactive Cards
  scratchCards: {
    title: "Scratch to reveal ✨",
    card1: {
      image: "/images/scratch-bite.jpg",
      caption: "I will bite here if you not accept my sorry",
    },
    card2: {
      image: "/images/scratch-chocopie.jpg",
      caption: "if you forgive me and accept my sorry I will buy a lotte choco pie for you",
    },
  },

  // Screen 6: "Hold to Forgive Me" Interaction
  holdInteraction: {
    promptAbove: "There's one little thing I'd love to ask…",
    promptBelow: "Hold to forgive me ♡",
    holdingText: "Holding onto us…",
    holdSuccessText: "Thank you for opening your heart ♡",
    hintText: "Press and hold the heart gently with your thumb or mouse",
    holdDurationMs: 4000, // 4 seconds
  },

  // Screen 7: Final Surprise Screen (Emotional Payoff)
  finalPayoff: {
    headline: "No matter what,\nyou'll always matter to me. ♡",
    subheadline: "A promise for today, tomorrow, and whenever you're ready.",
    paragraphs: [
      "Thank you for taking a little moment to read this.",
      "I can't ask you to feel a certain way, and I won't rush your heart.",
      "I just wanted you to know that I care, that I'm sorry, and that I'm willing to listen.",
      "Whenever you're ready, I'd love to talk.",
    ],
    closingTagline: [
      "One step at a time.",
      "One day at a time.",
      "A little more us.",
    ],
    signature: "With all my heart ♡",
    choicePrompt: "How are you feeling right now? (There is zero pressure)",
    choiceTalk: {
      buttonText: "Let's talk ♡",
      responseTitle: "Thank you, my love.",
      responseMessage: "Thank you. I'd love to listen whenever you're ready. ♡",
    },
    choiceTime: {
      buttonText: "I need a little time",
      responseTitle: "Take your time.",
      responseMessage: "Of course. Take all the time you need. I'm not going to rush you. ♡",
    },
    replayButtonText: "Read from the beginning ♡",
  },

  // Ambient Audio Configuration
  ambientAudio: {
    enabledByDefault: false,
    title: "Gentle Romantic Piano Chords",
    subtitle: "Calm, ambient acoustic harmony",
  },
};
