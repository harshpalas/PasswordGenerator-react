import React, { useState } from "react";
import "./App.css";

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:',.<>/?";

export default function App() {
  const [length, setLength] = useState(8);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  function generatePassword() {
    let chars = "";
    if (uppercase) chars += UPPERCASE;
    if (lowercase) chars += LOWERCASE;
    if (numbers) chars += NUMBERS;
    if (symbols) chars += SYMBOLS;
    if (!chars) {
      setPassword("Select at least one option!");
      return;
    }
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pass);
    setCopied(false); // reset copy status on new generation
  }

  function copyToClipboard() {
    if (!password || password === "Select at least one option!") return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // hide copied after 2s
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Generate Random Password</h2>
        <label>
          Password length
          <input
            type="number"
            min={4}
            max={64}
            value={length}
            onChange={e => setLength(Number(e.target.value))}
          />
        </label>
        <div className="checkbox-row">
          <label>
            <input
              type="checkbox"
              checked={uppercase}
              onChange={e => setUppercase(e.target.checked)}
            />
            Uppercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={lowercase}
              onChange={e => setLowercase(e.target.checked)}
            />
            Lowercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={numbers}
              onChange={e => setNumbers(e.target.checked)}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              checked={symbols}
              onChange={e => setSymbols(e.target.checked)}
            />
            Symbols
          </label>
        </div>
        <button onClick={generatePassword}>Generate Password</button>

        <div className="output">
          <span>Generated Password:</span>
          <div className="password-row">
            <div className="password">{password}</div>
            {password && password !== "Select at least one option!" && (
              <button className="copy-btn" onClick={copyToClipboard}>
                📋
              </button>
            )}
          </div>
          {copied && <span className="copied-msg">Copied!</span>}
        </div>
      </div>
    </div>
  );
}
