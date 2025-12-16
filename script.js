// 配置
let focusDuration = 25 * 60; // 默认25分钟
let timeLeft = focusDuration;
let timerInterval = null;
let isRunning = false;

// 音频上下文 (用于生成声音)
let audioCtx = null;

// DOM 元素
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const statusText = document.getElementById('status-text');
const resultModal = document.getElementById('result-modal');
const settingsModal = document.getElementById('settings-modal');
const customInput = document.getElementById('custom-minutes');
const titleTag = document.querySelector('title');

// 初始化显示
updateDisplay();

// -------------------------
// 核心计时器逻辑
// -------------------------

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    const timeString = formatTime(timeLeft);
    timerDisplay.textContent = timeString;
    
    if (isRunning) {
        titleTag.textContent = `(${timeString}) 专注中`;
    } else {
        titleTag.textContent = '极简番茄钟';
    }
}

function toggleButtons(running) {
    if (running) {
        startBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
        statusText.style.opacity = '1';
        statusText.textContent = "保持专注...";
        timerDisplay.classList.remove('cursor-pointer'); // 运行时不可点击修改
        timerDisplay.onclick = null;
    } else {
        startBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
        statusText.style.opacity = '0';
        timerDisplay.classList.add('cursor-pointer');
        timerDisplay.onclick = openSettings;
    }
}

function startTimer() {
    if (isRunning) return;
    
    // 初始化音频上下文 (浏览器要求必须在用户交互后初始化)
    initAudio();

    isRunning = true;
    toggleButtons(true);

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            finishTimer();
        }
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    clearInterval(timerInterval);
    isRunning = false;
    toggleButtons(false);
    statusText.textContent = "已暂停";
    statusText.style.opacity = '1';
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = focusDuration;
    updateDisplay();
    toggleButtons(false);
    statusText.style.opacity = '0';
    
    // 移除可能的特效
    document.body.classList.remove('relax-mode');
}

function finishTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timeLeft = focusDuration;
    updateDisplay();
    toggleButtons(false);
    
    // 1. 播放声音
    playSoothingSound();
    
    // 2. 触发视觉特效
    document.body.classList.add('relax-mode');
    
    // 3. 显示弹窗
    resultModal.classList.add('active');
}

// -------------------------
// 自定义设置逻辑
// -------------------------

function openSettings() {
    if (isRunning) return; // 运行时不能修改
    
    // 将当前设定的分钟数填入输入框
    customInput.value = Math.floor(focusDuration / 60);
    settingsModal.classList.add('active');
}

function closeSettings() {
    settingsModal.classList.remove('active');
}

function adjustTime(delta) {
    let currentVal = parseInt(customInput.value) || 25;
    let newVal = currentVal + delta;
    if (newVal < 1) newVal = 1;
    if (newVal > 120) newVal = 120;
    customInput.value = newVal;
}

function saveSettings() {
    const minutes = parseInt(customInput.value);
    if (minutes > 0) {
        focusDuration = minutes * 60;
        timeLeft = focusDuration;
        updateDisplay();
        closeSettings();
    }
}

function closeResultModal() {
    resultModal.classList.remove('active');
    document.body.classList.remove('relax-mode');
}

// -------------------------
// 音效逻辑 (Web Audio API)
// -------------------------

function initAudio() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playSoothingSound() {
    if (!audioCtx) initAudio();

    // 创建一个柔和的和弦 (C大调: C5, E5, G5)
    const notes = [523.25, 659.25, 783.99]; 
    const now = audioCtx.currentTime;

    notes.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine'; // 正弦波最柔和
        osc.frequency.setValueAtTime(freq, now);
        
        // 音量包络：快速淡入，极慢淡出（延长至7秒）
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.1 + (index * 0.05)); 
        
        // 延长声音衰减时间：从4秒增加到7秒
        gain.gain.exponentialRampToValueAtTime(0.001, now + 7); 

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        // 停止时间也相应延后
        osc.stop(now + 7.5);
    });
}