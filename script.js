// Application State Architecture Object
const appState = {
    identitas: {
        namaBalita: '',
        nik: '',
        namaOrtu: '',
        gender: 'Perempuan',
        tanggalLahir: ''
    },
    pengukuran: {
        beratBadan: '',
        tinggiBadan: '',
        bbLahir: '',
        tbLahir: '',
        metode: 'Berdiri'
    }
};

// DOM Element Registry Lifecycle
document.addEventListener("DOMContentLoaded", () => {
    initToggleButtons();
    initNavigationTriggers();
});

// Single Page Application (SPA) Screen Router Engine
function goToScreen(screenNumber) {
    // Hide all screens safely
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Make target screen display dynamic and trigger animation transition hook
    const targetScreen = document.getElementById(`screen-${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Custom Radio Pill Toggles Strategy Core Architecture
function initToggleButtons() {
    // Gender Selector Mechanism
    const genderButtons = document.querySelectorAll('#gender-toggle .toggle-btn');
    genderButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            genderButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            appState.identitas.gender = btn.getAttribute('data-value');
        });
    });

    // Measurement Method Selection Grid
    const metodeButtons = document.querySelectorAll('#metode-toggle .toggle-btn');
    metodeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            metodeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            appState.pengukuran.metode = btn.getAttribute('data-value');
        });
    });
}

// Client Side Form Validation & Dynamic State Capture Engine
function initNavigationTriggers() {
    
    // Route from Screen 1 to Screen 2 Pipeline
    document.getElementById('btn-to-screen2').addEventListener('click', () => {
        const namaInput = document.getElementById('nama-balita');
        const nikInput = document.getElementById('nik-balita');
        const ortuInput = document.getElementById('nama-ortu');
        const tglInput = document.getElementById('tgl-lahir');
        
        let isValid = true;

        // Perform strict text input sanitation
        if (!namaInput.value.trim()) { isValid = false; markInvalid(namaInput); } else { markValid(namaInput); }
        if (!ortuInput.value.trim()) { isValid = false; markInvalid(ortuInput); } else { markValid(ortuInput); }
        if (!tglInput.value) { isValid = false; markInvalid(tglInput); } else { markValid(tglInput); }

        // Strict Checksum Length Constraint Validation logic
        if (nikInput.value.trim().length !== 16 || isNaN(nikInput.value.trim())) {
            isValid = false;
            document.getElementById('nik-error').parentNode.classList.add('invalid');
        } else {
            document.getElementById('nik-error').parentNode.classList.remove('invalid');
        }

        if (isValid) {
            // Persist valid inputs seamlessly into localized application context state cache layer
            appState.identitas.namaBalita = namaInput.value.trim();
            appState.identitas.nik = nikInput.value.trim();
            appState.identitas.namaOrtu = ortuInput.value.trim();
            appState.identitas.tanggalLahir = formatDateString(tglInput.value);

            goToScreen(2);
        }
    });

    // Route from Screen 2 to Screen 3 (Confirmation Dashboard Summary Page Generator Engine)
    document.getElementById('btn-to-screen3').addEventListener('click', () => {
        const bbInput = document.getElementById('berat-badan');
        const tbInput = document.getElementById('tinggi-badan');
        const bbLahirInput = document.getElementById('bb-lahir');
        const tbLahirInput = document.getElementById('tb-lahir');

        let isValid = true;

        if (!bbInput.value) { isValid = false; markInvalid(bbInput); } else { markValid(bbInput); }
        if (!tbInput.value) { isValid = false; markInvalid(tbInput); } else { markValid(tbInput); }
        if (!bbLahirInput.value) { isValid = false; markInvalid(bbLahirInput); } else { markValid(bbLahirInput); }
        if (!tbLahirInput.value) { isValid = false; markInvalid(tbLahirInput); } else { markValid(tbLahirInput); }

        if (isValid) {
            appState.pengukuran.beratBadan = parseFloat(bbInput.value).toFixed(1);
            appState.pengukuran.tinggiBadan = parseFloat(tbInput.value).toFixed(1);
            appState.pengukuran.bbLahir = parseFloat(bbLahirInput.value).toFixed(1);
            appState.pengukuran.tbLahir = parseFloat(tbLahirInput.value).toFixed(1);

            // Dynamically synchronize collected cache data arrays directly inside UI Summary Screen Elements nodes
            document.getElementById('review-nama').innerText = appState.identitas.namaBalita;
            document.getElementById('review-nik').innerText = appState.identitas.nik;
            document.getElementById('review-ortu').innerText = appState.identitas.namaOrtu;
            document.getElementById('review-tgl').innerText = appState.identitas.tanggalLahir;
            document.getElementById('review-gender').innerText = appState.identitas.gender;

            document.getElementById('review-bb').innerText = `${appState.pengukuran.beratBadan} kg`;
            document.getElementById('review-tb').innerText = `${appState.pengukuran.tinggiBadan} cm`;
            document.getElementById('review-bb-lahir').innerText = `${appState.pengukuran.bbLahir} kg`;
            document.getElementById('review-tb-lahir').innerText = `${appState.pengukuran.tbLahir} cm`;
            document.getElementById('review-metode').innerText = appState.pengukuran.metode;

            goToScreen(3);
        }
    });

    // Multi-Step Automation Pipeline: Calculation Process Flow Simulation Routine 
    document.getElementById('btn-calculate').addEventListener('click', () => {
        // Step 1: Trigger Micro-interactive loading spinner process animation view
        goToScreen(4);

        // Step 2: Timeout macro task chain sequence routing to verification checkpoint node
        setTimeout(() => {
            goToScreen(5);

            // Step 3: Fast layout push pipeline down to data dashboard results template render context
            setTimeout(() => {
                // Populate collected dynamic value points metrics metrics maps properties safely 
                document.getElementById('result-bb').innerText = `${appState.pengukuran.beratBadan} kg`;
                document.getElementById('result-tb').innerText = `${appState.pengukuran.tinggiBadan} cm`;
                goToScreen(6);
            }, 1200);

        }, 2200);
    });

    // Placeholder actions interface triggers
    document.getElementById('btn-save-pdf').addEventListener('click', () => {
        window.print();
    });
}

// Local Helper Form Sanitation Style Utilities System Components
function markInvalid(element) {
    element.parentNode.classList.add('invalid');
}

function markValid(element) {
    element.parentNode.classList.remove('invalid');
}

function formatDateString(dateVal) {
    if (!dateVal) return '';
    const parts = dateVal.split('-');
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateVal;
}
