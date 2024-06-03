import React, { useState, useEffect } from "react";
import "./TextConverter.css";

const TextConverter = () => {
  const [text, setText] = useState("");
  const [option, setOption] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const handleConvert = () => {
    if (!text) {
      alert("Please write something first.");
      return;
    }
    if (!option) {
      alert("Please choose an option first.");
      return;
    }

    let convertedText = text;
    switch (option) {
      case "Upper Case":
        convertedText = text.toUpperCase();
        break;
      case "All lower":
        convertedText = text.toLowerCase();
        break;
      case "Capitalize":
        convertedText = text.replace(/\b\w/g, (char) => char.toUpperCase());
        break;
      case "Up and Down":
        convertedText = text
          .split("")
          .map((char, index) =>
            index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
          )
          .join("");
        break;
      default:
        convertedText = text;
        break;
    }
    setOutput(convertedText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      alert("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="container mt-4">
      <h1>Text Converter</h1>
      <div className="form-group">
        <label htmlFor="inputText">Enter text:</label>
        <textarea
          id="inputText"
          className="form-control"
          rows="5"
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="convertOption">Choose conversion:</label>
        <select
          id="convertOption"
          className="form-control"
          value={option}
          onChange={handleOptionChange}
        >
          <option value="">Default or select</option>
          <option value="Upper Case">Upper Case</option>
          <option value="All lower">All lower</option>
          <option value="Capitalize">Capitalize every word first letter</option>
          <option value="Up and Down">Up and Down text</option>
        </select>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleConvert}>
        Convert
      </button>
      <button
        className="btn btn-secondary mt-3 ms-3"
        onClick={() => setDarkMode(!darkMode)}
      >
        Toggle Dark Mode
      </button>
      {output && (
        <div className="mt-4">
          <h2>Output:</h2>
          <div
            className="output-box alert alert-secondary d-flex align-items-center justify-content-between"
            role="alert"
          >
            <span className="output-text">{output}</span>
            <i
              className={`fas fa-copy copy-icon ${copied ? "copied" : ""}`}
              onClick={handleCopy}
              title="Copy to clipboard"
            ></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextConverter;
