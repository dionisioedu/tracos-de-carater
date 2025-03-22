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
const optionsDiv = document.getElementById('options');
const resultContent = document.getElementById('result-content');
const clickSound = document.getElementById('click-sound');

let currentStep = 0;
let userChoices = { body: null, head: 0, eyes: 0, mouth: 0, torso: 0, hips: 0, legs: 0 };

const esquizoideImg = new Image();
esquizoideImg.src = 'assets/images/ESQUIZOIDE.svg';

const oralImg = new Image();
oralImg.src = 'assets/images/ORAL.svg';

const psicopataImg = new Image();
psicopataImg.src = 'assets/images/PSICOPATA.svg';

const masoquistaImg = new Image();
masoquistaImg.src = 'assets/images/MASOQUISTA.svg';

const rigidoImg = new Image();
rigidoImg.src = 'assets/images/RIGIDO.svg';

const steps = [
    { title: "Qual forma geral do corpo mais se parece com o seu?", type: "single", key: "body",
        options: [
            ["Esquizóide", esquizoideImg],
            ["Oral", oralImg],
            ["Psicopata", psicopataImg],
            ["Masoquista", masoquistaImg],
            ["Rígido", rigidoImg]] },
    { title: "Formato da cabeça (distribua 10 pontos)", type: "score", key: "head", options: ["A", "B", "C", "D", "E"] },
    { title: "Formato dos olhos (distribua 10 pontos)", type: "score", key: "eyes", options: ["A", "B", "C", "D", "E"] },
    { title: "Formato da boca (distribua 10 pontos)", type: "score", key: "mouth", options: ["A", "B", "C", "D", "E"] },
    { title: "Formato do tronco (distribua 10 pontos)", type: "score", key: "torso", options: ["A", "B", "C", "D", "E"] },
    { title: "Formato do quadril (distribua 10 pontos)", type: "score", key: "hips", options: ["A", "B", "C", "D", "E"] },
    { title: "Formato das pernas (distribua 10 pontos)", type: "score", key: "legs", options: ["A", "B", "C", "D", "E"] }
];

function showScreen(screenId) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenId].classList.add('active');
}

function loadSteps() {
    const step = steps[currentStep];
    questionTitle.textContent = step.title;
    optionsDiv.innerHTML = '';

    if (step.type === "single") {
        step.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.classList.add('option');
            btn.textContent = opt[0];
            btn.onclick = () => {
                document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
                btn.classList.add('selected');
                userChoices[step.key] = opt[0];

                nextStep();
            };

            const div = document.createElement('div');
            opt[1].classList.add('characterImg');
            div.appendChild(opt[1]);

            div.appendChild(btn);

            optionsDiv.appendChild(div);
        });
        previousBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
    } else if (step.type === "score") {
        let total = 0;
        previousBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
        step.options.forEach(opt => {
            const div = document.createElement('div');
            div.classList.add('option');
            const label = document.createElement('span');
            label.textContent = opt;
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 0;
            input.max = 10;
            input.value = 0;
            input.onchange = () => {
                total = Array.from(optionsDiv.querySelectorAll('input')).reduce((sum, inp) => sum + Number(inp.value), 0);
                nextBtn.disabled = total !== 10;
            };
            div.appendChild(label);
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

function previousStep() {
    currentStep--;
    loadSteps();
    clickSound.play();
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

    clickSound.play();
}

startBtn.onclick = () => {
    showScreen('test');
    loadSteps();
    clickSound.play();
};

previousBtn.onclick = previousStep;
nextBtn.onclick = nextStep;

restartBtn.onclick = () => {
    currentStep = 0;
    userChoices = { body: null, head: 0, eyes: 0, mouth: 0, torso: 0, hips: 0, legs: 0 };
    showScreen('intro');
    clickSound.play();
};
