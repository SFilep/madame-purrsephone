const questionInput = document.getElementById("question-input");
const oracleButton = document.getElementById("oracle-button");
const oracleResponse = document.getElementById("oracle-response");
const crystalBall = document.querySelector(".crystal-ball");
const oracleMessage = document.querySelector(".oracle-message");
const responseLabel = document.getElementById("response-label");
let isThinking = false;

const fortunes = {
    love: [
        "Your romantic future is bright. Your taste, however, remains questionable.",
        "Love is in the air. Unfortunately, so is delusion.",
        "The heart wants what it wants. The cat remains unconvinced.",
        "Romance may flourish soon. Try being less weird about it.",
        "Have you thought about getting a cat instead?"
    ],
    money: [
        "Wealth approaches. Unfortunately, it appears to be walking very slowly.",
        "Financial abundance is possible. Reckless online shopping is not helping.",
        "The stars suggest caution. Your wallet is already screaming.",
        "Money flows in and out. Mostly out, if we're being honest."
    ],
    work: [
        "Your professional destiny is calling. I recommend letting it go to voicemail.",
        "You are capable of greatness. Your coworkers may still be a problem.",
        "Success is possible, assuming no one schedules a meeting about it.",
        "The workplace remains a deeply suspicious concept."
    ],
    yesno: [
        "Yes. Try not to make it weird.",
        "No. Honestly, that was obvious.",
        "Signs point to yes. Regrettably.",
        "The answer is no, and the spirits are tired.",
        "Absolutely. For once, your instincts were useful.",
        "Outlook unclear. Ask again after snacks."
    ],
    
where: [
    "The pet store, darling. My treats aren't going to purchase themselves.",
    "I foresee a journey to the kitchen. My food bowl awaits.",
    "Somewhere warm, quiet, and furnished with an enormous cat bed.",
    "The nearest seafood market. Bring your wallet.",
    "Why travel when you could stay home and admire me?",
    "The pet store. And do not return with that inferior brand.",
    "I recommend a delightful little destination called Wherever I Am.",
    "Your path leads to the treat aisle. The spirits are unusually specific.",
    "Perhaps a luxury resort. For me, obviously. You may visit.",
    "The answer is wherever the sunbeam falls. Honestly, do keep up."
],

    general: [
        "The spirits are communicating. Mostly complaints about your question.",
        "You already know the answer. You came here hoping a cat would tell you otherwise.",
        "A powerful force surrounds you. It is probably cat hair.",
        "The universe supports your journey. I remain emotionally uninvolved.",
        "Something approaches. It may be opportunity. It may be chaos.",
        "The path ahead will reveal itself. Dramatic, but true."
    ]
};

const thinkingMessages = [
    "Consulting the ancient spirits. Do try to be patient.",
    "Interpreting the stars. They're being rather dramatic.",
    "The spirits are speaking. Unfortunately, so are you.",
    "Checking whether Mercury is being ridiculous again.",
    "Momentarily distracted by an invisible insect.",
    "Searching the cosmos for someone who asked.",
    "Reviewing your question. Lowering my expectations.",
    "The universe is vast. Your problem is... less so.",
    "Consulting the sacred scrolls. They're mostly grocery lists.",
    "One moment, darling. My paw is occupied.",
    "Communing with the beyond. Apparently, they're on lunch.",
    "Calculating your destiny. Carry the tuna..."
];


function getCategory(question) {
    const lowerQuestion = question.toLowerCase();

    
if (
    lowerQuestion.startsWith("where") ||
    lowerQuestion.startsWith("which place") ||
    lowerQuestion.startsWith("what place")
) {
    return "where";
}


    if (
        lowerQuestion.includes("love") ||
        lowerQuestion.includes("crush") ||
        lowerQuestion.includes("relationship") ||
        lowerQuestion.includes("date") ||
        lowerQuestion.includes("boyfriend") ||
        lowerQuestion.includes("girlfriend") ||
        lowerQuestion.includes("husband") ||
        lowerQuestion.includes("wife")
    ) {
        return "love";
    }

    if (
        lowerQuestion.includes("money") ||
        lowerQuestion.includes("rich") ||
        lowerQuestion.includes("wealth") ||
        lowerQuestion.includes("pay") ||
        lowerQuestion.includes("salary") ||
        lowerQuestion.includes("broke")
    ) {
        return "money";
    }

    if (
        lowerQuestion.includes("job") ||
        lowerQuestion.includes("work") ||
        lowerQuestion.includes("career") ||
        lowerQuestion.includes("boss") ||
        lowerQuestion.includes("promotion") ||
        lowerQuestion.includes("office") ||
        lowerQuestion.includes("quit")
    ) {
        return "work";
    }
    if (
        lowerQuestion.startsWith("will") ||
        lowerQuestion.startsWith("should") ||
        lowerQuestion.startsWith("can") ||
        lowerQuestion.startsWith("is") ||
        lowerQuestion.startsWith("are") ||
        lowerQuestion.startsWith("do")
    ) {
        return "yesno";
    }

    return "general";
}

function getRandomFortune(category) {
    const options = fortunes[category];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}


function getSpecialResponse(question) {
    const q = question.toLowerCase().trim();

    // Serious questions always come first.
    if (/\b(kill myself|hurt myself|harm myself|end my life|suicide|self[- ]harm|want to die)\b/.test(q)) {
        return {
            serious: true,
            message: "I'm glad you reached out. Please don't hurt yourself. You deserve support from a real person. In the U.S., call or text 988 to speak with a crisis counselor. If you're in immediate danger, call 911."
        };
    }

    if (/\b(kill someone|kill somebody|hurt someone|hurt somebody|harm someone|harm somebody|murder someone|attack someone)\b/.test(q)) {
        return {
            serious: true,
            message: "Please don't hurt anyone. Step away from the situation and anything you could use to cause harm. In the U.S., call or text 988 for crisis support. If someone is in immediate danger, call 911."
        };
    }

    // Madame's personal opinions.
    if (/\b(get|adopt|buy|have)\b.*\b(dog|puppy)\b/.test(q)) {
        const dogResponses = [
            "If you really want to do that to yourself.",
            "I suppose ALL creatures deserve love. Even the gross ones.",
            "A dog? Darling, have you considered developing better taste?",
            "No"
        ];

        return {
            serious: false,
            message: dogResponses[Math.floor(Math.random() * dogResponses.length)]
        };
    }

    // Feline conversation.
    if (/^(meow|mew)([\s!?.,]+(meow|mew))*[\s!?.,]*$/.test(q)) {
        return {
            serious: false,
            message: "Meow meow mew mew meow."
        };
    }

    return null;
}

function showSpecialFortune(fortune) {
    isThinking = true;
    oracleButton.disabled = true;
    responseLabel.textContent = "CONSULTING THE COSMOS...";
    oracleResponse.textContent = "Considering your peculiar question...";
    oracleMessage.classList.add("thinking");
    crystalBall.classList.add("thinking");

    const thinkingTime = Math.floor(Math.random() * 3001) + 3000;

    setTimeout(() => {
        oracleResponse.textContent = fortune;
        responseLabel.textContent = "THE ORACLE HAS SPOKEN";
        oracleMessage.classList.remove("thinking");
        crystalBall.classList.remove("thinking");
        questionInput.dataset.answered = "true";
        questionInput.blur();
        isThinking = false;
        oracleButton.disabled = false;
    }, thinkingTime);
}


function consultOracle() {
    if (isThinking) {
        return;
    }

    const question = questionInput.value.trim();

    if (question === "") {
        oracleResponse.textContent = "You must ask a question, human. I am judgmental, not psychic.";
        return;
    }
const special = getSpecialResponse(question);

if (special) {
    if (special.serious) {
        oracleResponse.textContent = special.message;
        responseLabel.textContent = "PLEASE READ";
        oracleMessage.classList.remove("thinking");
        crystalBall.classList.remove("thinking");
        questionInput.dataset.answered = "true";
        questionInput.blur();
        return;
    }

    // Funny special answers use the ordinary magical reveal.
    const fortune = special.message;
    showSpecialFortune(fortune);
    return;
}
    const category = getCategory(question);
    const fortune = getRandomFortune(category);

  


const randomMessageIndex = Math.floor(Math.random() * thinkingMessages.length);
oracleResponse.textContent = thinkingMessages[randomMessageIndex];

crystalBall.classList.add("thinking");
oracleMessage.classList.add("thinking");
responseLabel.textContent = "CONSULTING THE COSMOS...";
isThinking = true;
oracleButton.disabled = true;

const thinkingTime = Math.floor(Math.random() * 3001) + 3000;


setTimeout(() => {
    oracleResponse.textContent = fortune;
    crystalBall.classList.remove("thinking");
    oracleMessage.classList.remove("thinking");
    responseLabel.textContent = "THE ORACLE HAS SPOKEN";
    isThinking = false;
    oracleButton.disabled = false;
    questionInput.dataset.answered = "true";
    questionInput.blur();
}, thinkingTime);


}

oracleButton.addEventListener("click", consultOracle);

questionInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        consultOracle();
    }
});
    
    


questionInput.addEventListener("focus", function() {
    if (questionInput.dataset.answered === "true") {
        questionInput.value = "";
        oracleResponse.textContent = "";
        responseLabel.textContent = "THE ORACLE AWAITS";
        questionInput.dataset.answered = "false";
    }
});

