import React, { useRef, useState, useEffect } from "react";

const AutoCounter = () => {
  const [counter, setCounter] = useState(0);
  const [voice, setVoice] = useState(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const intervalRef = useRef(null);

  // 🎙️ Load voices
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

  const buttonBase = {
    border: "none",
    borderRadius: "50px",
    padding: "14px 35px",
    color: "#fff",
    fontSize: "clamp(1rem, 3vw, 1.2rem)",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.3s",
    width: "100%",
    maxWidth: "250px",
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
        padding: "30px 20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
          marginBottom: "20px",
          textShadow: "0 0 20px rgba(0,255,255,0.5)",
        }}
      >
        AI Voice Counter
      </h1>

      <div
        style={{
          fontSize: "clamp(4rem, 20vw, 7rem)",
          fontWeight: 700,
          color: "#00ffff",
          textShadow: "0 0 30px #00ffff",
          marginBottom: "25px",
          lineHeight: 1.2,
        }}
      >
        {counter}
      </div>

      {!voiceEnabled && (
        <p
          style={{
            fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
            opacity: 0.8,
            marginBottom: "25px",
          }}
        >
          🔇 Tap <strong>Start</strong> once to enable voice on iPhone
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          width: "100%",
          maxWidth: "300px",
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
