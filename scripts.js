const screens = {
    intro: document.getElementById('intro'),
    test: document.getElementById('test'),
    result: document.getElementById('result')
};
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const previousBtn = document.getElementById('previous-btn');
const restartBtn = document.getElementById('restart-btn');
const questionTitle = document.getElementById('question-title');
const questionSubtitle = document.getElementById('question-subtitle');
const optionsDiv = document.getElementById('options');
const resultContent = document.getElementById('result-content');
const clickSound = document.getElementById('click-sound');
const pointsLeft = document.getElementById('points-left');

let currentStep = 0;
let currentPointsLeft = 10;
let userChoices = { body: null, head: 0, eyes: 0, mouth: 0, torso: 0, hips: 0, legs: 0 };

const esquizoideImg = new Image();
esquizoideImg.src = 'assets/images/esquizoide.svg';
const oralImg = new Image();
oralImg.src = 'assets/images/oral.svg';
const psicopataImg = new Image();
psicopataImg.src = 'assets/images/psicopata.svg';
const masoquistaImg = new Image();
masoquistaImg.src = 'assets/images/masoquista.svg';
const rigidoImg = new Image();
rigidoImg.src = 'assets/images/rigido.svg';

const esquizoideCabecaImg = new Image();
esquizoideCabecaImg.src = 'assets/images/esquizoide-cabeca.png';
const oralCabecaImg = new Image();
oralCabecaImg.src = 'assets/images/oral-cabeca.png';
const psicopataCabecaImg = new Image();
psicopataCabecaImg.src = 'assets/images/psicopata-cabeca.png';
const masoquistaCabecaImg = new Image();
masoquistaCabecaImg.src = 'assets/images/masoquista-cabeca.png';
const rigidoCabecaImg = new Image();
rigidoCabecaImg.src = 'assets/images/rigido-cabeca.png';

const esquizoideOlhosImg = new Image();
esquizoideOlhosImg.src = 'assets/images/esquizoide-olhos.png';
const oralOlhosImg = new Image();
oralOlhosImg.src = 'assets/images/oral-olhos.png';
const psicopataOlhosImg = new Image();
psicopataOlhosImg.src = 'assets/images/psicopata-olhos.png';
const masoquistaOlhosImg = new Image();
masoquistaOlhosImg.src = 'assets/images/masoquista-olhos.png';
const rigidoOlhosImg = new Image();
rigidoOlhosImg.src = 'assets/images/rigido-olhos.png';

const steps = [
    { title: "Qual forma geral do corpo mais se parece com o seu?", subtitle: "", type: "single", key: "body",
        options: [
            ["Esquizóide", esquizoideImg],
            ["Oral", oralImg],
            ["Psicopata", psicopataImg],
            ["Masoquista", masoquistaImg],
            ["Rígido", rigidoImg]] },
    { title: "Formato da cabeça", subtitle: "Distribua os pontos", type: "score", key: "head",
        options: [
            ["A", esquizoideCabecaImg],
            ["B", oralCabecaImg],
            ["C", psicopataCabecaImg],
            ["D", masoquistaCabecaImg],
            ["E", rigidoCabecaImg]
        ] },
    { title: "Formato dos olhos", subtitle: "(distribua 10 pontos)", type: "score", key: "eyes",
        options: [
            ["A", esquizoideOlhosImg],
            ["B", oralOlhosImg],
            ["C", psicopataOlhosImg],
            ["D", masoquistaOlhosImg],
            ["E", rigidoOlhosImg]
        ] },
    { title: "Formato da boca", subtitle: "(distribua 10 pontos)", type: "score", key: "mouth", options: ["A", "B", "C", "D", "E"] },
    { title: "Formato do tronco", subtitle: "(distribua 10 pontos)", type: "score", key: "torso", options: ["A", "B", "C", "D", "E"] },
    { title: "Formato do quadril", subtitle: "(distribua 10 pontos)", type: "score", key: "hips", options: ["A", "B", "C", "D", "E"] },
    { title: "Formato das pernas", subtitle: "(distribua 10 pontos)", type: "score", key: "legs", options: ["A", "B", "C", "D", "E"] }
];

function showScreen(screenId) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenId].classList.add('active');
}

function handleOptionClick(element, option, step) {
    userChoices[step.key] = option[0];
    nextStep();
}

function loadSteps() {
    const step = steps[currentStep];
    questionTitle.textContent = step.title;
    questionSubtitle.textContent = step.subtitle;
    pointsLeft.innerText = "";
    optionsDiv.innerHTML = '';

    if (step.type === "single") {
        step.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.classList.add('option');
            btn.textContent = opt[0];
            btn.onclick = () => handleOptionClick(btn, opt, step);

            opt[1].classList.add('characterImg');
            opt[1].onclick = () => handleOptionClick(opt[1], opt, step);

            const div = document.createElement('div');
            div.appendChild(opt[1]);
            div.appendChild(btn);

            optionsDiv.appendChild(div);
        });
        previousBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
    } else if (step.type === "score") {
        let total = 0;
        pointsLeft.innerText = currentPointsLeft;
        previousBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
        step.options.forEach(opt => {
            const div = document.createElement('div');
            div.classList.add('option');
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 0;
            input.max = 10;
            input.value = 0;
            input.onchange = () => {
                total = Array.from(optionsDiv.querySelectorAll('input')).reduce((sum, inp) => sum + Number(inp.value), 0);
                nextBtn.disabled = total !== 10;
            };
            const image = opt[1];
            image.classList.add('piecesImg');
            image.onclick = () => {
                input.value += 1;
            };
            div.appendChild(image);
            div.appendChild(input);
            optionsDiv.appendChild(div);
        });
    }
}

function calculateResult() {
    const traits = {
        pensar: (userChoices.head + userChoices.eyes) / 20 * 0.6,
        sentir: (userChoices.mouth + userChoices.torso) / 20 * 0.4,
        agir: (userChoices.hips + userChoices.legs) / 20 * 0.4,
        controle: 0.4,
        perfeicao: 0.4
    };
    return `
        <p>Pensar: ${Math.round(traits.pensar * 100)}% (Necessidade de estar com pessoas)</p>
        <p>Sentir: ${Math.round(traits.sentir * 100)}% (Emocional vs. Racional)</p>
        <p>Agir: ${Math.round(traits.agir * 100)}% (Executar vs. Delegar)</p>
        <p>Necessidade de Controle: ${Math.round(traits.controle * 100)}%</p>
        <p>Necessidade de Perfeição: ${Math.round(traits.perfeicao * 100)}%</p>
    `;
}

function playDefaultSound() {
    clickSound.pause();
    clickSound.currentTime = 0;
    clickSound.play();
}

function previousStep() {
    currentStep--;
    loadSteps();
    playDefaultSound();
}

function nextStep() {
    const step = steps[currentStep];
    if (step.type === "score") {
        const inputs = optionsDiv.querySelectorAll('input');
        userChoices[step.key] = Array.from(inputs).reduce((sum, inp) => sum + Number(inp.value), 0);
    }
    currentStep++;
    if (currentStep < steps.length) {
        loadSteps();
        nextBtn.disabled = true;
    } else {
        showScreen('result');
        resultContent.innerHTML = calculateResult();
    }

    playDefaultSound();
}

startBtn.onclick = () => {
    showScreen('test');
    loadSteps();
    playDefaultSound();
};

previousBtn.onclick = previousStep;
nextBtn.onclick = nextStep;

restartBtn.onclick = () => {
    currentStep = 0;
    userChoices = { body: null, head: 0, eyes: 0, mouth: 0, torso: 0, hips: 0, legs: 0 };
    showScreen('intro');
    playDefaultSound();
};
