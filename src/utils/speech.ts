/**
 * LEXA Legal English Pronunciation & Speech Engine
 * High-quality Web Speech API synthesis for legal terminology.
 */

export type SpeechAccent = 'en-US' | 'en-GB';

interface PronounceOptions {
  accent?: SpeechAccent;
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: unknown) => void;
}

// Active speech state listeners
type SpeechListener = (speakingTerm: string | null) => void;
const listeners = new Set<SpeechListener>();

let currentSpeakingTerm: string | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];
let voicesLoaded = false;

// Initialize voice caching
function initVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  const loadVoices = () => {
    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        cachedVoices = voices;
        voicesLoaded = true;
      }
    } catch {
      // Ignore initial browser permission/environment errors
    }
  };

  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

// Ensure voices initialize
if (typeof window !== 'undefined') {
  initVoices();
}

/**
 * Format term for natural speech synthesis
 * Prevents TTS engine from spelling out all-caps words letter-by-letter (e.g. 'I-N-D-E-M-N-I-T-Y')
 */
export function formatTermForSpeech(rawTerm: string): string {
  if (!rawTerm) return '';
  const trimmed = rawTerm.trim();

  // If the term is ALL CAPS, convert to lowercase / title case for smooth pronunciation
  if (trimmed === trimmed.toUpperCase() && trimmed.length > 1) {
    return trimmed.toLowerCase();
  }
  return trimmed;
}

/**
 * Find the optimal natural English voice for the selected accent
 */
export function findBestVoice(accent: SpeechAccent = 'en-US'): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  if (!voicesLoaded || cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }

  if (cachedVoices.length === 0) {
    return null;
  }

  const targetLang = accent.toLowerCase(); // 'en-us' or 'en-gb'
  const baseLang = 'en';

  // Quality ranking list of known high-fidelity voices
  const highQualityVoiceNames = [
    // Google Chrome voices
    'google us english',
    'google uk english female',
    'google uk english male',
    // Apple / macOS / iOS voices
    'samantha',
    'daniel',
    'serena',
    'karen',
    'moira',
    'victoria',
    'oliver',
    'kate',
    // Microsoft / Windows / Edge voices
    'microsoft aria online (natural)',
    'microsoft jenny online (natural)',
    'microsoft guy online (natural)',
    'microsoft sonia online (natural)',
    'microsoft ryan online (natural)',
    'microsoft david',
    'microsoft zira',
    'microsoft mark',
    'microsoft george'
  ];

  // 1. Check for high-quality named voice matching the requested accent
  for (const name of highQualityVoiceNames) {
    const matched = cachedVoices.find(v => {
      const vName = v.name.toLowerCase();
      const vLang = v.lang.toLowerCase().replace('_', '-');
      return vName.includes(name) && vLang.startsWith(targetLang);
    });
    if (matched) return matched;
  }

  // 2. Check for any voice matching exact accent (e.g., en-US or en-GB)
  const exactAccentVoices = cachedVoices.filter(v => {
    const vLang = v.lang.toLowerCase().replace('_', '-');
    return vLang === targetLang || vLang.startsWith(targetLang);
  });

  if (exactAccentVoices.length > 0) {
    // Prefer non-local service or default if available
    const preferred = exactAccentVoices.find(v => v.default) || exactAccentVoices[0];
    return preferred;
  }

  // 3. Fallback to any English voice
  const anyEnglishVoice = cachedVoices.find(v => {
    const vLang = v.lang.toLowerCase().replace('_', '-');
    return vLang.startsWith(baseLang);
  });

  if (anyEnglishVoice) return anyEnglishVoice;

  // 4. Ultimate fallback to default voice
  return cachedVoices.find(v => v.default) || cachedVoices[0] || null;
}

/**
 * Check if Speech Synthesis is supported in the current environment
 */
export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

/**
 * Speak a Legal English vocabulary term
 */
export function speakLegalTerm(term: string, options: PronounceOptions = {}): boolean {
  if (!isSpeechSynthesisSupported()) {
    options.onError?.('SpeechSynthesis is not supported in this browser.');
    return false;
  }

  const {
    accent = 'en-US',
    rate = 0.9, // Slightly deliberate speed for clear legal articulation
    pitch = 1.0,
    onStart,
    onEnd,
    onError
  } = options;

  try {
    // 1. Cancel any active pronunciation to prevent overlapping audio
    stopSpeech();

    const spokenText = formatTermForSpeech(term);
    if (!spokenText) return false;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = accent;
    utterance.rate = rate;
    utterance.pitch = pitch;

    const selectedVoice = findBestVoice(accent);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      currentSpeakingTerm = term;
      notifyListeners(term);
      onStart?.();
    };

    utterance.onend = () => {
      if (currentSpeakingTerm === term) {
        currentSpeakingTerm = null;
        notifyListeners(null);
      }
      onEnd?.();
    };

    utterance.onerror = (e) => {
      if (currentSpeakingTerm === term) {
        currentSpeakingTerm = null;
        notifyListeners(null);
      }
      onError?.(e);
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    currentSpeakingTerm = null;
    notifyListeners(null);
    onError?.(err);
    return false;
  }
}

/**
 * Stop any currently playing pronunciation
 */
export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore cancellation errors
    }
  }
  if (currentSpeakingTerm !== null) {
    currentSpeakingTerm = null;
    notifyListeners(null);
  }
}

/**
 * Get current speaking term if any
 */
export function getCurrentSpeakingTerm(): string | null {
  return currentSpeakingTerm;
}

/**
 * Subscribe to speech status changes
 */
export function subscribeToSpeech(listener: SpeechListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners(term: string | null) {
  listeners.forEach(fn => {
    try {
      fn(term);
    } catch {
      // Ignore listener error
    }
  });
}
