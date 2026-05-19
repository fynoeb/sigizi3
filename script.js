/* =========================================
   INPUT DATA BALITA — script.js
   ========================================= */

let currentStep = 1;
let selectedGender = 'Perempuan';

// ── GENDER SELECTION ──────────────────────
function selectGender(gender) {
  selectedGender = gender;
  document.getElementById('btn-perempuan').classList.toggle('selected', gender === 'Perempuan');
  document.getElementById('btn-laki').classList.toggle('selected', gender === 'Laki-laki');
}

// ── DATE FORMAT (DD/MM/YYYY) ──────────────
function formatDate(input) {
  let v = input.value.replace(/\D/g, '');
  if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
  if (v.length > 5) v = v.slice(0, 5) + '/' + v.slice(5);
  input.value = v.slice(0, 10);
}

// ── VALIDATION ────────────────────────────
function validateStep(step) {
  if (step === 1) {
    const nama = document.getElementById('nama-balita').value.trim();
    const nik  = document.getElementById('nik-balita').value.trim();
    const ortu = document.getElementById('nama-ortu').value.trim();
    const tgl  = document.getElementById('tgl-lahir').value.trim();

    if (!nama) { alert('Nama lengkap balita wajib diisi.'); return false; }
    if (nik.length !== 16 || isNaN(nik)) { alert('NIK harus 16 digit angka.'); return false; }
    if (!ortu) { alert('Nama ibu / orang tua / wali wajib diisi.'); return false; }
    if (tgl.length !== 10) { alert('Tanggal lahir harus lengkap (DD/MM/YYYY).'); return false; }
    return true;
  }

  if (step === 2) {
    const bb  = document.getElementById('berat').value.trim();
    const tb  = document.getElementById('tinggi').value.trim();
    const lk  = document.getElementById('lingkar-kepala').value.trim();
    const tgl = document.getElementById('tgl-ukur').value.trim();

    if (!bb || isNaN(bb)) { alert('Berat badan wajib diisi.'); return false; }
    if (!tb || isNaN(tb)) { alert('Tinggi / panjang badan wajib diisi.'); return false; }
    if (!lk || isNaN(lk)) { alert('Lingkar kepala wajib diisi.'); return false; }
    if (tgl.length !== 10) { alert('Tanggal pengukuran harus lengkap (DD/MM/YYYY).'); return false; }
    return true;
  }

  return true;
}

// ── STEPPER UPDATE ────────────────────────
function updateStepper(step) {
  for (let i = 1; i <= 3; i++) {
    const circle = document.getElementById(`circle-${i}`);
    const label  = document.getElementById(`label-${i}`);

    if (i < step) {
      circle.className = 'step-circle done';
      label.className  = 'step-label done';
    } else if (i === step) {
      circle.className = 'step-circle active';
      label.className  = 'step-label active';
    } else {
      circle.className = 'step-circle';
      label.className  = 'step-label';
    }
  }

  // step-1 circle has no id (it's static); handle it separately
  const circle1 = document.querySelector('#step-1 .step-circle');
  const label1  = document.querySelector('#step-1 .step-label');
  if (step > 1) {
    circle1.className = 'step-circle done';
    label1.className  = 'step-label done';
  } else {
    circle1.className = 'step-circle active';
    label1.className  = 'step-label active';
  }

  // lines
  document.getElementById('line-1').classList.toggle('done', step > 1);
  document.getElementById('line-2').classList.toggle('done', step > 2);
}

// ── SHOW FORM PANEL ───────────────────────
function showPanel(step) {
  document.getElementById('form-identitas').classList.toggle('hidden',  step !== 1);
  document.getElementById('form-pengukuran').classList.toggle('hidden', step !== 2);
  document.getElementById('form-konfirmasi').classList.toggle('hidden', step !== 3);

  const btn = document.getElementById('btn-next');
  if (step === 3) {
    btn.textContent = 'Simpan Data';
  } else {
    btn.textContent = 'Selanjutnya';
  }
}

// ── POPULATE CONFIRMATION ─────────────────
function populateConfirm() {
  document.getElementById('conf-nama').textContent  = document.getElementById('nama-balita').value || '-';
  document.getElementById('conf-nik').textContent   = document.getElementById('nik-balita').value  || '-';
  document.getElementById('conf-ortu').textContent  = document.getElementById('nama-ortu').value   || '-';
  document.getElementById('conf-jk').textContent    = selectedGender;
  document.getElementById('conf-tgl').textContent   = document.getElementById('tgl-lahir').value   || '-';
  document.getElementById('conf-bb').textContent    = document.getElementById('berat').value
    ? document.getElementById('berat').value + ' kg' : '-';
  document.getElementById('conf-tb').textContent    = document.getElementById('tinggi').value
    ? document.getElementById('tinggi').value + ' cm' : '-';
  document.getElementById('conf-lk').textContent    = document.getElementById('lingkar-kepala').value
    ? document.getElementById('lingkar-kepala').value + ' cm' : '-';
  document.getElementById('conf-tgl-ukur').textContent = document.getElementById('tgl-ukur').value || '-';
}

// ── NEXT / SUBMIT ─────────────────────────
function nextStep() {
  if (currentStep === 3) {
    // Submit / save
    const msg = document.getElementById('success-msg');
    msg.classList.remove('hidden');
    document.getElementById('btn-next').textContent = 'Data Tersimpan ✓';
    document.getElementById('btn-next').disabled = true;
    document.getElementById('btn-next').style.background = 'linear-gradient(90deg, #34a85a, #2d9e5a)';
    return;
  }

  if (!validateStep(currentStep)) return;

  currentStep++;
  if (currentStep === 3) populateConfirm();

  updateStepper(currentStep);
  showPanel(currentStep);

  // scroll to top of form area
  document.querySelector('.form-scroll').scrollTop = 0;
}

// ── BACK BUTTON ───────────────────────────
function goBack() {
  if (currentStep > 1) {
    currentStep--;
    updateStepper(currentStep);
    showPanel(currentStep);
    document.querySelector('.form-scroll').scrollTop = 0;
  } else {
    // Pada step 1 — bisa diarahkan ke halaman sebelumnya
    alert('Kembali ke halaman sebelumnya.');
  }
}

// ── INIT ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateStepper(1);
  showPanel(1);
});
