const screens = {
    intro: document.getElementById('intro'),
    register: document.getElementById('register'),
    test: document.getElementById('test'),
    result: document.getElementById('result')
};

const startBtn = document.getElementById('start-btn');
const testBtn = document.getElementById('test-btn');
const nextBtn = document.getElementById('next-btn');
const previousBtn = document.getElementById('previous-btn');
const restartBtn = document.getElementById('restart-btn');
const questionTitle = document.getElementById('question-title');
const bodyType = document.getElementById('body-type');
const questionSubtitle = document.getElementById('question-subtitle');
const optionsDiv = document.getElementById('options');
const resultContent = document.getElementById('result-content');
const clickSound = document.getElementById('click-sound');
const pointsLeft = document.getElementById('points-left');

let currentStep = 0;
let currentPointsLeft = 10;
let userChoices = {
    'user': { 'name': '', 'age': '', 'email': '', 'phone': '', 'gender': '', 'profession': '', 'country': '', 'state': '' },
    'body': null,
    'head': { 'esquizoide': 0, 'oral': 0, 'psicopata': 0, 'masoquista': 0, 'rigido': 0 },
    'eyes': { 'esquizoide': 0, 'oral': 0, 'psicopata': 0, 'masoquista': 0, 'rigido': 0 },
    'mouth': { 'esquizoide': 0, 'oral': 0, 'psicopata': 0, 'masoquista': 0, 'rigido': 0 },
    'torso': { 'esquizoide': 0, 'oral': 0, 'psicopata': 0, 'masoquista': 0, 'rigido': 0 },
    'hips': { 'esquizoide': 0, 'oral': 0, 'psicopata': 0, 'masoquista': 0, 'rigido': 0 },
    'legs': { 'esquizoide': 0, 'oral': 0, 'psicopata': 0, 'masoquista': 0, 'rigido': 0 }
};

const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const genderInput = document.getElementById('gender');
const professionInput = document.getElementById('profession');
const countryInput = document.getElementById('country');
const stateInput = document.getElementById('state');

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

const esquizoideBocaImg = new Image();
esquizoideBocaImg.src = 'assets/images/esquizoide-boca.png';
const oralBocaImg = new Image();
oralBocaImg.src = 'assets/images/oral-boca.png';
const psicopataBocaImg = new Image();
psicopataBocaImg.src = 'assets/images/psicopata-boca.png';
const masoquistaBocaImg = new Image();
masoquistaBocaImg.src = 'assets/images/masoquista-boca.png';
const rigidoBocaImg = new Image();
rigidoBocaImg.src = 'assets/images/rigido-boca.png';

const esquizoideTorsoImg = new Image();
esquizoideTorsoImg.src = 'assets/images/esquizoide-tronco.png';
const oralTorsoImg = new Image();
oralTorsoImg.src = 'assets/images/oral-tronco.png';
const psicopataTorsoImg = new Image();
psicopataTorsoImg.src = 'assets/images/psicopata-tronco.png';
const masoquistaTorsoImg = new Image();
masoquistaTorsoImg.src = 'assets/images/masoquista-tronco.png';
const rigidoTorsoImg = new Image();
rigidoTorsoImg.src = 'assets/images/rigido-tronco.png';

const esquizoideQuadrilImg = new Image();
esquizoideQuadrilImg.src = 'assets/images/esquizoide-quadril.png';
const oralQuadrilImg = new Image();
oralQuadrilImg.src = 'assets/images/oral-quadril.png';
const psicopataQuadrilImg = new Image();
psicopataQuadrilImg.src = 'assets/images/psicopata-quadril.png';
const masoquistaQuadrilImg = new Image();
masoquistaQuadrilImg.src = 'assets/images/masoquista-quadril.png';
const rigidoQuadrilImg = new Image();
rigidoQuadrilImg.src = 'assets/images/rigido-quadril.png';

const esquizoidePernasImg = new Image();
esquizoidePernasImg.src = 'assets/images/esquizoide-pernas.png';
const oralPernasImg = new Image();
oralPernasImg.src = 'assets/images/oral-pernas.png';
const psicopataPernasImg = new Image();
psicopataPernasImg.src = 'assets/images/psicopata-pernas.png';
const masoquistaPernasImg = new Image();
masoquistaPernasImg.src = 'assets/images/masoquista-pernas.png';
const rigidoPernasImg = new Image();
rigidoPernasImg.src = 'assets/images/rigido-pernas.png';

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
            ["esquizoide", esquizoideCabecaImg],
            ["oral", oralCabecaImg],
            ["psicopata", psicopataCabecaImg],
            ["masoquista", masoquistaCabecaImg],
            ["rigido", rigidoCabecaImg]
        ] },
    { title: "Formato dos olhos", subtitle: "Distribua os pontos", type: "score", key: "eyes",
        options: [
            ["esquizoide", esquizoideOlhosImg],
            ["oral", oralOlhosImg],
            ["psicopata", psicopataOlhosImg],
            ["masoquista", masoquistaOlhosImg],
            ["rigido", rigidoOlhosImg]
        ] },
    { title: "Formato da boca", subtitle: "Distribua os pontos", type: "score", key: "mouth",
        options: [
            ["esquizoide", esquizoideBocaImg],
            ["oral", oralBocaImg],
            ["psicopata", psicopataBocaImg],
            ["masoquista", masoquistaBocaImg],
            ["rigido", rigidoBocaImg]
        ] },
    { title: "Formato do tronco", subtitle: "Distribua os pontos", type: "score", key: "torso",
        options: [
            ["esquizoide", esquizoideTorsoImg],
            ["oral", oralTorsoImg],
            ["psicopata", psicopataTorsoImg],
            ["masoquista", masoquistaTorsoImg],
            ["rigido", rigidoTorsoImg]
        ] },
    { title: "Formato do quadril", subtitle: "Distribua os pontos", type: "score", key: "hips",
        options: [
            ["esquizoide", esquizoideQuadrilImg],
            ["oral", oralQuadrilImg],
            ["psicopata", psicopataQuadrilImg],
            ["masoquista", masoquistaQuadrilImg],
            ["rigido", rigidoQuadrilImg],
        ] },
    { title: "Formato das pernas", subtitle: "Distribua os pontos", type: "score", key: "legs",
        options: [
            ["esquizoide", esquizoidePernasImg],
            ["oral", oralPernasImg],
            ["psicopata", psicopataPernasImg],
            ["masoquista", masoquistaPernasImg],
            ["rigido", rigidoPernasImg],
        ] },
];

/*
  $('#start').onclick = () => {
    const n=$('#name').value.trim(), a=$('#age').value.trim(), e=$('#email').value.trim();
    if(!n||!a||!e) return alert('Preencha todos os campos');
    state.user={name:n,age:a,email:e}; state.answers=[]; state.idx=0; question();
  };
*/
function showScreen(screenId) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenId].classList.add('active');
}

function handleOptionClick(option, step) {
    userChoices[step.key] = option[0];

    console.log("Body type is " + step.key + " = " + option[0]);
    nextStep();
}

function updatePointsCount() {
    playDefaultSound();
    total = Array.from(optionsDiv.querySelectorAll('input')).reduce((sum, inp) => sum + Number(inp.value), 0);
    nextBtn.disabled = total !== 10;
    currentPointsLeft = 10 - total;
    pointsLeft.innerText = currentPointsLeft;
}

function loadSteps() {
    const step = steps[currentStep];
    questionTitle.textContent = step.title;
    questionSubtitle.textContent = step.subtitle;
    pointsLeft.innerText = "";
    optionsDiv.innerHTML = '';

    if (step.type === "single") {
        step.options.forEach(opt => {
            bodyType.innerText = '';
            const btn = document.createElement('button');
            btn.classList.add('option');
            btn.textContent = opt[0];
            btn.onclick = () => handleOptionClick(opt, step);

            opt[1].classList.add('characterImg');
            opt[1].onclick = () => handleOptionClick(opt, step);

            const div = document.createElement('div');
            div.appendChild(opt[1]);
            div.appendChild(btn);

            optionsDiv.appendChild(div);
        });
        previousBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
    } else if (step.type === "score") {
        bodyType.innerText = userChoices['body'];
        currentPointsLeft = 10;
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
            input.value = userChoices[step.key][opt[0]];
            input.id = opt[0];
            input.onchange = () => updatePointsCount();
            const image = opt[1];
            image.classList.add('piecesImg');
            image.onclick = () => {
                if (currentPointsLeft > 0) {
                    input.value = Number(input.value) + 1;
                    updatePointsCount();
                }
            };
            div.appendChild(image);
            div.appendChild(input);
            optionsDiv.appendChild(div);
        });
        updatePointsCount();
    }
}

function sumTotalUserChoices(character) {
    let total = 0;
    total += userChoices['head'][character];
    total += userChoices['eyes'][character];
    total += userChoices['mouth'][character];
    total += userChoices['torso'][character];
    total += userChoices['hips'][character];
    total += userChoices['legs'][character];
    return total;
}

function calculateResult() {
    let esquizoide = sumTotalUserChoices('esquizoide');
    let oral = sumTotalUserChoices('oral');
    let psicopata = sumTotalUserChoices('psicopata');
    let masoquista = sumTotalUserChoices('masoquista');
    let rigido = sumTotalUserChoices('rigido');

    switch (userChoices['body']) {
        case 'Esquizóide':
            esquizoide += 40;
            break;
        case 'Oral':
            oral += 40;
            break;
        case 'Psicopata':
            psicopata += 40;
            break;
        case 'Masoquista':
            masoquista += 40;
            break;
        case 'Rígido':
            rigido += 40;
            break;
    }

    return `
        <p>Esquizóide: ${esquizoide}% (Criatividade)</p>
        <p>Oral: ${oral}% (Comunicação)</p>
        <p>Psicopata: ${psicopata}% (Liderança)</p>
        <p>Masoquista: ${masoquista}% (Perfeccionismo)</p>
        <p>Rígido: ${rigido}% (Execução)</p>
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
        const esquizoide = Array.from(inputs).find(el => el.id === 'esquizoide');
        const oral = Array.from(inputs).find(el => el.id === 'oral');
        const psicopata = Array.from(inputs).find(el => el.id === 'psicopata');
        const masoquista = Array.from(inputs).find(el => el.id === 'masoquista');
        const rigido = Array.from(inputs).find(el => el.id === 'rigido');

        userChoices[step.key]['esquizoide'] = Number(esquizoide.value);
        userChoices[step.key]['oral'] = Number(oral.value);
        userChoices[step.key]['psicopata'] = Number(psicopata.value);
        userChoices[step.key]['masoquista'] = Number(masoquista.value);
        userChoices[step.key]['rigido'] = Number(rigido.value);

        console.log(">> esquizoide: " + Number(esquizoide.value));
        console.log(">> oral: " + Number(oral.value));
        console.log(">> psicopata: " + Number(psicopata.value));
        console.log(">> masoquista: " + Number(masoquista.value));
        console.log(">> rigido: " + Number(rigido.value));
    }
    currentStep++;
    if (currentStep < steps.length) {
        loadSteps();
        nextBtn.disabled = true;
    } else {
        saveResults();
        showScreen('result');
        resultContent.innerHTML = calculateResult();
    }

    playDefaultSound();
}

function saveUserData() {
    userChoices['user']['name'] = nameInput.value;
    userChoices['user']['age'] = ageInput.value;
    userChoices['user']['email'] = emailInput.value;
    userChoices['user']['phone'] = phoneInput.value;
    userChoices['user']['gender'] = genderInput.value;
    userChoices['user']['profession'] = professionInput.value;
    userChoices['user']['country'] = countryInput.value;
    userChoices['user']['state'] = stateInput.value;
}

async function saveResults() {
    console.log("Sending data to server...");
    console.log(JSON.stringify(userChoices));
    try {
        await fetch("https://script.google.com/macros/s/AKfycbzR9KhbByY4sCHvlC_FEUxA8oBaxNsy4Wz4AkUYxH5_CdNFDgIaH0SQHrDQ8wBwSWC8aw/exec", {
            method:"POST",
            body: JSON.stringify(userChoices)
        });
    } catch (err) {
        console.error("Failed to send data: " + err);
    }
}

startBtn.onclick = () => {
    showScreen('register');
    playDefaultSound();
};

testBtn.onclick = () => {
    saveUserData();
    showScreen('test');
    loadSteps();
    playDefaultSound();
}

previousBtn.onclick = previousStep;
nextBtn.onclick = nextStep;

restartBtn.onclick = () => {
    currentStep = 0;
    userChoices = {
        'user': { 'name': '', 'age': 0, 'email': '', 'phone': '', 'gender': '', 'profession': '', 'country': '', 'state': '' },
        'body': null,
        'head': { 'esquizoide': 0, 'oral': 0, 'psicopata': 0, 'masoquista': 0, 'rigido': 0 },
        'eyes': { 'esquizoide': 0, 'oral': 0, 'psicopata': 0, 'masoquista': 0, 'rigido': 0 },
        'mouth': { 'esquizoide': 0, 'oral': 0, 'psicopata': 0, 'masoquista': 0, 'rigido': 0 },
        'torso': { 'esquizoide': 0, 'oral': 0, 'psicopata': 0, 'masoquista': 0, 'rigido': 0 },
        'hips': { 'esquizoide': 0, 'oral': 0, 'psicopata': 0, 'masoquista': 0, 'rigido': 0 },
        'legs': { 'esquizoide': 0, 'oral': 0, 'psicopata': 0, 'masoquista': 0, 'rigido': 0 }
    };
    showScreen('intro');
    playDefaultSound();
};
