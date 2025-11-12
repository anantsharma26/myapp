import React, { useRef, useState, useEffect } from "react";

const AutoCounter = () => {
  const [counter, setCounter] = useState(0);
  const [voice, setVoice] = useState(null);
  const intervalRef = useRef(null);

  // 🎙️ Load voices before starting
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const ukMale =
        voices.find((v) => v.name === "Google UK English Male") ||
        voices.find((v) => v.name.includes("UK English")) ||
        voices.find((v) => v.lang === "en-GB") ||
        voices[0];
      setVoice(ukMale);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speakNumber = (num) => {
    if (!voice) return; // Wait until voice loads
    const utterance = new SpeechSynthesisUtterance(String(num));
    utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // 🕒 Controls
  const start = () => {
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

  // 🔁 Speak whenever counter changes
  useEffect(() => {
    if (counter > 0 && voice) speakNumber(counter);
  }, [counter, voice]);

  // 🧼 Button styles
  const buttonStyle = {
    border: "none",
    borderRadius: "50px",
    padding: "15px 40px",
    color: "#fff",
    fontSize: "1.2rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        gap: "2rem",
      }}
    >
      <h1 style={{ textShadow: "0 0 20px rgba(0,255,255,0.5)" }}>
        AI Voice Counter
      </h1>

      <div
        style={{
          fontSize: "7rem",
          fontWeight: 700,
          color: "#00ffff",
          textShadow: "0 0 30px #00ffff",
        }}
      >
        {counter}
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <button
          onClick={start}
          style={{
            ...buttonStyle,
            background: "linear-gradient(135deg, #00c6ff, #0072ff)",
            boxShadow: "0 0 20px rgba(0,255,255,0.4)",
          }}
        >
          Start
        </button>

        <button
          onClick={stop}
          style={{
            ...buttonStyle,
            background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
            boxShadow: "0 0 20px rgba(255,0,0,0.4)",
          }}
        >
          Stop
        </button>

        <button
          onClick={reset}
          style={{
            ...buttonStyle,
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
