// Domande aggiornate stile "comportamentale"
const questions = [
    {
        text: "Come ascolti la tua musica preferita?",
        answers: [
            { text: "Vinile o CD, il suono è più caldo.", gen: "genx" },
            { text: "Playlist su Spotify/Apple Music.", gen: "millennial" },
            { text: "Speed-up songs su TikTok.", gen: "genz" },
            { text: "Radio o Hi-Fi in salotto.", gen: "boomer" }
        ]
    },
    {
        text: "Si è rotto il lavandino. Che fai?",
        answers: [
            { text: "Chiamo l'idraulico di fiducia.", gen: "boomer" },
            { text: "Cerco un tutorial su YouTube.", gen: "millennial" },
            { text: "Lo riparo io, ho la cassetta attrezzi.", gen: "genx" },
            { text: "Vado nel panico e chiamo papà.", gen: "genz" }
        ]
    },
    {
        text: "Qual è la tua emoji più usata?",
        answers: [
            { text: "😂 (Quella che ride piangendo)", gen: "millennial" },
            { text: "💀 (Teschio) o 😭 (Pianto)", gen: "genz" },
            { text: "👍 (Pollicione) o un fiore.", gen: "boomer" },
            { text: "😎 (Occhiali da sole) o 😉.", gen: "genx" }
        ]
    },
    {
        text: "Venerdì sera ideale?",
        answers: [
            { text: "Divano, Netflix e pizza delivery.", gen: "millennial" },
            { text: "Cena con amici e vino buono.", gen: "genx" },
            { text: "Festa, club o giro in centro.", gen: "genz" },
            { text: "TV tranquilla e a letto presto.", gen: "boomer" }
        ]
    },
    {
        text: "Come paghi di solito?",
        answers: [
            { text: "Contanti. Sempre meglio averli.", gen: "boomer" },
            { text: "Apple Pay / Google Pay col telefono.", gen: "genz" },
            { text: "Carta o Satispay.", gen: "millennial" },
            { text: "Bancomat o Carta di Credito.", gen: "genx" }
        ]
    },
    {
        text: "Jeans Skinny (stretti). Cosa ne pensi?",
        answers: [
            { text: "Non li tolgo nemmeno se mi pagano.", gen: "millennial" },
            { text: "Cringe. Solo pantaloni larghi.", gen: "genz" },
            { text: "Comodi? No, preferisco il taglio classico.", gen: "boomer" },
            { text: "Li ho messi, ora metto quel che capita.", gen: "genx" }
        ]
    }
];

const resultsData = {
    boomer: {
        title: "Sei un Boomer!",
        desc: "Ami la concretezza. Per te le cose si fanno 'come una volta'. La tecnologia va bene, ma il contatto umano vince sempre."
    },
    genx: {
        title: "Sei Generazione X!",
        desc: "Indipendente, ironico e con ottimi gusti musicali. Sei il ponte perfetto tra il mondo analogico e quello digitale."
    },
    millennial: {
        title: "Sei un Millennial!",
        desc: "Nostalgico degli anni '90, ami viaggiare e le serie TV. Probabilmente hai il telefono sempre in mano e usi ancora 😂."
    },
    genz: {
        title: "Sei Gen Z!",
        desc: "Nativo digitale, veloce e senza filtri. Il tuo humor è strano, vivi di trend e per te le etichette sono roba vecchia."
    }
};

let currentQuestion = 0;
let scores = { boomer: 0, genx: 0, millennial: 0, genz: 0 };

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const qNumber = document.getElementById('q-number');
const progressBar = document.getElementById('progress-bar');

function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];
    questionText.innerText = q.text;
    qNumber.innerText = currentQuestion + 1;
    
    // Aggiorna barra progresso
    const progress = ((currentQuestion) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    answersContainer.innerHTML = '';

    // Mischia risposte
    const shuffledAnswers = q.answers.sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach((ans, index) => {
        const btn = document.createElement('button');
        btn.innerText = ans.text;
        btn.className = `answer-btn w-full opacity-0`;
        // Animazione a cascata
        btn.style.animation = `fadeIn 0.4s ease forwards ${index * 100}ms`;
        btn.onclick = () => selectAnswer(ans.gen);
        answersContainer.appendChild(btn);
    });
}

// Aggiungiamo keyframe per fadeIn via JS se non presente in CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(styleSheet);

function selectAnswer(gen) {
    scores[gen]++;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    document.getElementById('result-title').innerText = resultsData[winner].title;
    document.getElementById('result-desc').innerText = resultsData[winner].desc;

    // Attivazione Grafico Frecce
    // 1. Resetta tutte le frecce
    document.querySelectorAll('.gen-arrow').forEach(el => el.classList.remove('active'));
    
    // 2. Attiva quella giusta
    const activeArrow = document.getElementById(`arrow-${winner}`);
    if(activeArrow) {
        // Timeout piccolo per dare effetto scenico dopo che appare la schermata
        setTimeout(() => {
            activeArrow.classList.add('active');
        }, 300);
    }
}

function restartQuiz() {
    currentQuestion = 0;
    scores = { boomer: 0, genx: 0, millennial: 0, genz: 0 };
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    document.querySelectorAll('.gen-arrow').forEach(el => el.classList.remove('active'));
}