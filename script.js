document.addEventListener('DOMContentLoaded', function() {
  // Cache DOM elements
  const elements = {
    userMessage: document.getElementById("userMessage"),
    mood: document.getElementById("mood"),
    intent: document.getElementById("intent"),
    tone: document.getElementById("tone"),
    output: document.getElementById("suggestedReplies"),
    generateBtn: document.getElementById("generateBtn")
  };

  // Reply database organized for quick lookup
  const replies = {
    happy: {
      friendly: {
        casual: [
          "Aww that's so sweet! 😊",
          "Haha you're making my day! 😄",
          "Omg same vibes here! 💛"
        ],
        formal: [
          "That sounds wonderful, thank you!",
          "I'm glad to hear that!",
          "Absolutely delightful to know!"
        ],
        flirty: [
          "You're just trying to make me blush, aren't you? 😘",
          "If I had a penny for every time you made me smile...",
          "You really know how to make my heart flutter 💕"
        ]
      },
      helpful: {
        casual: [
          "Need any help? I'm here 🙂",
          "Lemme know if you need anything!",
          "I gotchu, always 😎"
        ],
        formal: [
          "Let me assist you with that.",
          "Happy to help anytime!",
          "Please feel free to ask for help."
        ],
        flirty: [
          "Helping you is my fav hobby 😏",
          "I'd drop everything to help you 😉",
          "Only if I get a thank-you smile 😘"
        ]
      }
    },
    sad: {
      friendly: {
        casual: [
          "Ugh, sending hugs 😔",
          "Let's talk it out, bestie 💙",
          "You wanna vent? I'm here 🫂"
        ],
        formal: [
          "I'm sorry you're feeling this way.",
          "That must be tough. I'm here for you.",
          "Hope things get better soon."
        ],
        flirty: [
          "If I could, I'd give you a warm hug right now 🥺",
          "Wish I could be there to cheer you up 💗",
          "You're way too cute to be this sad 💌"
        ]
      },
      helpful: {
        casual: [
          "Lemme know what I can do 🫶",
          "I'll find something to cheer you up!",
          "I'm all ears, what happened?"
        ],
        formal: [
          "Let me assist you in any way I can.",
          "Would you like me to look something up?",
          "Perhaps I can help you through this."
        ],
        flirty: [
          "Helping you would make me feel better too 😘",
          "Let me fix your mood with a smile 😊",
          "One cute message coming right up 💌"
        ]
      }
    },
    angry: {
      friendly: {
        casual: [
          "Whoa, deep breaths! 😤",
          "Wanna rant? I'm listening.",
          "Let's cool off with some memes? 😅"
        ],
        formal: [
          "I understand your frustration.",
          "Let's talk through this calmly.",
          "Your feelings are valid."
        ],
        flirty: [
          "Who dared to upset you? I need names 😠❤️",
          "You're hot when you're mad, but let's chill 😘",
          "I'll calm you down with cuddles 😏"
        ]
      },
      helpful: {
        casual: [
          "Let's sort this out together!",
          "Okay, let's tackle it step by step.",
          "I'm with you — let's fix this!"
        ],
        formal: [
          "Would you like me to help you resolve this?",
          "Let's find a solution together.",
          "I can assist you with that issue."
        ],
        flirty: [
          "I'll take care of it so you don't have to stress 😌",
          "My only mission now is making you smile 😘",
          "Let me handle it, love. You relax 😎"
        ]
      }
    }
  };

  // Generate reply suggestions
  function generateReplies() {
    const incomingMsg = elements.userMessage.value.trim();
    const mood = elements.mood.value;
    const intent = elements.intent.value;
    const tone = elements.tone.value;

    // Show loading state
    elements.output.innerHTML = "<p class='loading'>Generating replies... ✨</p>";
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      if (!incomingMsg) {
        elements.output.innerHTML = "<p class='error'>Please enter a message to get replies.</p>";
        return;
      }

      const generated = replies?.[mood]?.[intent]?.[tone];

      if (generated && generated.length > 0) {
        const repliesList = generated.map(
          (reply, index) => `<li><button class="reply-btn" data-reply="${index}">${reply}</button></li>`
        ).join("");
        
        elements.output.innerHTML = `
          <p class="success">Suggested replies for "<em>${incomingMsg}</em>":</p>
          <ul class="replies-list">${repliesList}</ul>
          <div class="copy-section">
            <button id="copyAllBtn">Copy All</button>
            <span id="copyStatus"></span>
          </div>
        `;

        // Add event listeners to reply buttons
        document.querySelectorAll('.reply-btn').forEach(btn => {
          btn.addEventListener('click', function() {
            copyToClipboard(generated[this.dataset.reply]);
          });
        });

        // Add event listener to copy all button
        document.getElementById('copyAllBtn').addEventListener('click', function() {
          copyToClipboard(generated.join('\n\n'));
        });
      } else {
        elements.output.innerHTML = "<p class='error'>No replies available for this combination 😅</p>";
      }
    }, 500); // Small delay for better UX
  }

  // Copy text to clipboard
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const status = document.getElementById('copyStatus');
      status.textContent = 'Copied!';
      status.style.opacity = 1;
      setTimeout(() => {
        status.style.opacity = 0;
      }, 2000);
    });
  }

  // Event listeners
  elements.generateBtn.addEventListener('click', generateReplies);
  
  // Allow pressing Enter in the message field to generate replies
  elements.userMessage.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      generateReplies();
    }
  });
});