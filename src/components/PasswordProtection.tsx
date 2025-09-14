import React, { useState } from 'react';

interface PasswordProtectionProps {
  onBack: () => void;
}

export function PasswordProtection({ onBack }: PasswordProtectionProps) {
  // Password protection state
  const [entered, setEntered] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const correctPassword = "zendegim"; // Change this to your desired password

  if (!entered) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-200 mb-4">Enter Password</h2>
          <input
            type="password"
            className="p-2 rounded bg-gray-700 text-gray-200 mb-2 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (password === correctPassword) {
                  onBack();
                  setEntered(true);
                  setError("");
                } else {
                  setError("Incorrect password");
                }
              }
            }}
            placeholder="Password"
          />
          <button
            className="bg-pink-600 text-white px-4 py-2 rounded font-bold"
            onClick={() => {
              if (password === correctPassword) {
                onBack();
                setEntered(true);
                setError("");
              } else {
                setError("Incorrect password");
              }
            }}
          >
            Submit
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </div>
    );
  }
}