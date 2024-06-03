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
      case "Count Characters":
        convertedText = text.length.toString();
        break;
      case "Count Words":
        convertedText = text
          .split(/\s+/)
          .filter((word) => word !== "")
          .length.toString();
        break;
      case "Find and Replace":
        // Implement find and replace functionality
        // You can prompt the user for the string to find and the replacement string
        break;
      case "Sort Text":
        convertedText = text.split("").sort().join("");
        break;
      case "Remove Whitespace":
        convertedText = text.replace(/\s+/g, "");
        break;
      case "Reverse Text":
        convertedText = text.split("").reverse().join("");
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
      <div className="form-group mt-3">
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
          <option value="Count Characters">Count Characters</option>
          <option value="Count Words">Count Words</option>
          <option value="Find and Replace">Find and Replace</option>
          <option value="Sort Text">Sort Text</option>
          <option value="Remove Whitespace">Remove Whitespace</option>
          <option value="Reverse Text">Reverse Text</option>
        </select>
      </div>
      <div className="d-flex">
        <button className="btn btn-primary mt-3" onClick={handleConvert}>
          Convert
        </button>
        <button
          className="btn btn-secondary mt-3 ms-3"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle Dark Mode
        </button>
      </div>
      {output && (
        <div className="mt-4">
          <h2>Output:</h2>
          <div
            className="output-box alert alert-secondary d-flex align-items-center justify-content-end"
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
