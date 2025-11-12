import React, { useRef, useState, useEffect } from "react";

const AutoCounter = () => {
  const [counter, setCounter] = useState(0);
  const [voice, setVoice] = useState(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const intervalRef = useRef(null);

  // 🎙️ Load voices when available
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const selected =
        voices.find((v) => v.name === "Google UK English Male") ||
        voices.find((v) => v.lang === "en-GB") ||
        voices[0];
      setVoice(selected);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speakNumber = (num) => {
    if (!voiceEnabled || !voice) return;
    const utterance = new SpeechSynthesisUtterance(String(num));
    utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // 🕒 Controls
  const start = () => {
    if (!voiceEnabled) {
      const unlock = new SpeechSynthesisUtterance("Voice enabled");
      window.speechSynthesis.speak(unlock);
      setVoiceEnabled(true);
    }

    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => setCounter((c) => c + 1), 2000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    stop();
    setCounter(0);
  };

  useEffect(() => {
    if (counter > 0) speakNumber(counter);
  }, [counter]);

  // 🧼 Button base styles
  const buttonBase = {
    border: "none",
    borderRadius: "50px",
    padding: "15px 40px",
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.3s",
    flex: "1 1 120px", // allows wrapping nicely
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "20px",
          textShadow: "0 0 20px rgba(0,255,255,0.5)",
        }}
      >
        AI Voice Counter
      </h1>

      <div
        style={{
          fontSize: "6rem",
          fontWeight: 700,
          color: "#00ffff",
          textShadow: "0 0 30px #00ffff",
          marginBottom: "30px",
        }}
      >
        {counter}
      </div>

      {!voiceEnabled && (
        <p
          style={{
            fontSize: "0.9rem",
            opacity: 0.8,
            marginBottom: "20px",
          }}
        >
          🔇 Tap <strong>Start</strong> once to enable voice on iPhone
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <button
          onClick={start}
          style={{
            ...buttonBase,
            background: "linear-gradient(135deg, #00c6ff, #0072ff)",
            boxShadow: "0 0 20px rgba(0,255,255,0.4)",
          }}
        >
          Start
        </button>

        <button
          onClick={stop}
          style={{
            ...buttonBase,
            background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
            boxShadow: "0 0 20px rgba(255,0,0,0.4)",
          }}
        >
          Stop
        </button>

        <button
          onClick={reset}
          style={{
            ...buttonBase,
            background: "linear-gradient(135deg, #11998e, #38ef7d)",
            boxShadow: "0 0 20px rgba(0,255,0,0.4)",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default AutoCounter;
