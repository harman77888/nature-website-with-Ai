
/* =====================================================
   NATUREAURA WEBSITE
   JAVASCRIPT
===================================================== */


/* ================= ELEMENTS ================= */

const header = document.getElementById("header");
const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const topBtn = document.getElementById("topBtn");
const toast = document.getElementById("toast");

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".page-section");


/* ================= MOBILE MENU ================= */

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("open");

    if (navbar.classList.contains("open")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }

});


/* Close mobile menu when link clicked */

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");

        menuBtn.textContent = "☰";

    });

});


/* ================= HEADER SCROLL ================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ================= ACTIVE NAVIGATION ================= */

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const id = entry.target.getAttribute("id");

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }

                });

            }

        });

    },

    {
        threshold: 0.35
    }

);

sections.forEach(section => {
    observer.observe(section);
});


/* ================= BACK TO TOP ================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }

});


topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================= GALLERY FILTER ================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        /* Remove active class */

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        /* Get selected filter */

        const filter = button.getAttribute("data-filter");


        galleryItems.forEach(item => {

            const category = item.getAttribute("data-category");

            if (filter === "all" || category === filter) {

                item.classList.remove("hide");

            } else {

                item.classList.add("hide");

            }

        });

    });

});


/* ================= NATURE PROMISE ================= */

const promiseBtn = document.getElementById("promiseBtn");

promiseBtn.addEventListener("click", () => {

    promiseBtn.textContent = "✓ Promise Made";

    promiseBtn.disabled = true;

    showToast(
        "🌿 Thank you! Your promise to protect nature matters."
    );

});


/* ================= TOAST FUNCTION ================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}


/* ================= QUIZ ================= */

const quizQuestions = [

    {
        question: "Which ecosystem covers most of Earth's surface?",

        options: [
            "Deserts",
            "Oceans",
            "Forests",
            "Grasslands"
        ],

        answer: 1
    },

    {
        question: "Which process allows plants to use sunlight to make food?",

        options: [
            "Respiration",
            "Digestion",
            "Photosynthesis",
            "Evaporation"
        ],

        answer: 2
    },

    {
        question: "Which natural resource is essential for all known life?",

        options: [
            "Plastic",
            "Water",
            "Steel",
            "Concrete"
        ],

        answer: 1
    },

    {
        question: "Which animal is commonly known as a pollinator?",

        options: [
            "Bee",
            "Shark",
            "Tiger",
            "Penguin"
        ],

        answer: 0
    },

    {
        question: "Which action can help reduce household waste?",

        options: [
            "Reuse products",
            "Throw everything away",
            "Use more plastic",
            "Waste food"
        ],

        answer: 0
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;


const questionElement = document.getElementById("question");
const questionCounter = document.getElementById("questionCounter");
const quizOptions = document.getElementById("quizOptions");
const quizResult = document.getElementById("quizResult");
const nextQuestionBtn = document.getElementById("nextQuestion");


/* Load question */

function loadQuestion() {

    answered = false;

    const current = quizQuestions[currentQuestion];

    questionElement.textContent = current.question;

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

    quizResult.textContent = "";

    nextQuestionBtn.style.display = "none";

    quizOptions.innerHTML = "";


    current.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "quiz-option";

        button.textContent = option;

        button.addEventListener("click", () => {

            checkAnswer(button, index);

        });

        quizOptions.appendChild(button);

    });

}


/* Check answer */

function checkAnswer(button, selectedIndex) {

    if (answered) return;

    answered = true;

    const current = quizQuestions[currentQuestion];

    const allOptions =
        document.querySelectorAll(".quiz-option");


    allOptions.forEach(option => {

        option.classList.add("disabled");

    });


    if (selectedIndex === current.answer) {

        button.classList.add("correct");

        quizResult.textContent = "✓ Correct! Great job.";

        quizResult.style.color = "#4c9856";

        score++;

    } else {

        button.classList.add("wrong");

        allOptions[current.answer].classList.add("correct");

        quizResult.textContent =
            `✗ Not quite. Correct answer: ${current.options[current.answer]}`;

        quizResult.style.color = "#c26d58";

    }


    nextQuestionBtn.style.display = "inline-flex";

}


/* Next question */

nextQuestionBtn.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {

        loadQuestion();

    } else {

        showQuizResult();

    }

});


/* Final quiz result */

function showQuizResult() {

    questionCounter.textContent = "Quiz Complete 🌿";

    questionElement.textContent =
        `You scored ${score} out of ${quizQuestions.length}!`;

    quizOptions.innerHTML = "";

    quizResult.textContent =
        score >= 4
            ? "🌎 Excellent! You really know your nature."
            : score >= 3
                ? "🌱 Good job! Keep learning about our planet."
                : "🌿 Keep exploring! There is always more to discover.";

    quizResult.style.color = "#4c9856";

    nextQuestionBtn.textContent = "Restart Quiz";

    nextQuestionBtn.style.display = "inline-flex";

    nextQuestionBtn.onclick = restartQuiz;

}


/* Restart quiz */

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    nextQuestionBtn.textContent = "Next Question →";

    nextQuestionBtn.onclick = null;

    nextQuestionBtn.addEventListener("click", () => {

        currentQuestion++;

        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            showQuizResult();
        }

    }, {
        once: true
    });

    loadQuestion();

}


/* Initial quiz */

loadQuestion();


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const formMessage = document.getElementById("formMessage");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* Clear old errors */

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    formMessage.textContent = "";


    let valid = true;


    /* Name */

    if (nameInput.value.trim() === "") {

        nameError.textContent = "Please enter your name.";

        valid = false;

    }


    /* Email */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailInput.value.trim() === "") {

        emailError.textContent = "Please enter your email.";

        valid = false;

    } else if (!emailPattern.test(emailInput.value.trim())) {

        emailError.textContent = "Please enter a valid email.";

        valid = false;

    }


    /* Message */

    if (messageInput.value.trim() === "") {

        messageError.textContent = "Please write a message.";

        valid = false;

    }


    /* Success */

    if (valid) {

        formMessage.textContent =
            "✓ Thank you! Your message has been received.";

        formMessage.style.color = "#4c9856";

        contactForm.reset();

        showToast("🌿 Message sent successfully!");

    }

});


/* ================= CURRENT YEAR ================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* ================= REVEAL ANIMATION ================= */

const revealElements = document.querySelectorAll(
    ".nature-card, .mountain-card, .wildlife-card, .save-item, .fact-card, .climate-card, .change-card, .pollution-grid article"
);


const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.1
    }

);


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(20px)";

    element.style.transition =
        "opacity .6s ease, transform .6s ease";

    revealObserver.observe(element);

});


/* ================= ESCAPE KEY ================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        navbar.classList.remove("open");

        menuBtn.textContent = "☰";

    }

});

