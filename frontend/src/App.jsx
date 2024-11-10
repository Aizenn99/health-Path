import React, { useState } from 'react';

function App() {
  const [symptomInput, setSymptomInput] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [results, setResults] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addOrEditSymptom = () => {
    const trimmedInput = symptomInput.trim().toLowerCase();
    if (!trimmedInput) return;

    if (editingIndex !== null) {
      const updatedSymptoms = [...symptoms];
      updatedSymptoms[editingIndex] = trimmedInput;
      setSymptoms(updatedSymptoms);
      setEditingIndex(null);
    } else if (!symptoms.includes(trimmedInput)) {
      setSymptoms([...symptoms, trimmedInput]);
    }
    setSymptomInput('');
  };

  const editSymptom = (index) => {
    setSymptomInput(symptoms[index]);
    setEditingIndex(index);
  };

  const removeSymptom = (index) => {
    setSymptoms(symptoms.filter((_, i) => i !== index));
    if (index === editingIndex) {
      setSymptomInput('');
      setEditingIndex(null);
    }
  };

  const checkDiseases = async () => {
    if (symptoms.length === 0) {
      alert("Please add at least one symptom.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/check-disease', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {/* First Viewport - Welcome Section */}
      <section className="h-screen bg-gradient-to-r from-green-300 to-blue-400 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Health Path Finder</h1>
        <p className="text-lg text-white mb-6">Identify symptoms and get insights on possible conditions.</p>
        <div className="flex gap-4">
          <a href="#form-section" className="text-white text-lg bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200">
            Get Started
          </a>
          <a href="#team-section" className="text-white text-lg px-4 py-2 border border-white rounded-full hover:bg-white hover:text-blue-600 transition duration-200 flex items-center gap-2">
            <span>Our Team</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* Second Viewport - Symptom Checker Form */}
      <section id="form-section" className="min-h-screen bg-gradient-to-r from-green-300 to-blue-400 flex items-center justify-center p-6">
        <div className="p-8 max-w-lg bg-white bg-opacity-90 rounded-lg shadow-lg w-full">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">🩺 Start Checking Symptoms</h2>
          
          <div className="flex mb-4">
            <input
              type="text"
              value={symptomInput}
              onChange={(e) => setSymptomInput(e.target.value)}
              placeholder="Enter a symptom"
              className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              onClick={addOrEditSymptom}
              className="px-4 py-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-200"
            >
              {editingIndex !== null ? 'Edit Symptom' : 'Add Symptom'}
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-600">Selected Symptoms:</h3>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              {symptoms.map((symptom, index) => (
                <li key={index} className="flex items-center justify-between text-gray-700 bg-gray-100 px-3 py-2 rounded-md shadow-sm">
                  <span>{symptom}</span>
                  <div>
                    <button
                      onClick={() => editSymptom(index)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeSymptom(index)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={checkDiseases}
              className="mt-6 w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
            >
              Check Diseases
            </button>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-blue-600">Results:</h3>
            {results.length > 0 ? (
              results.map((result, index) => (
                <div key={index} className="mt-4 p-4 bg-white border border-gray-200 rounded-md shadow-md">
                  <h4 className="text-xl font-bold text-green-700">{result.disease}</h4>
                  <p className="text-gray-600"><strong>Prevention:</strong> {result.prevention}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-2 mb-6 ">No matching diseases found.</p>
            )}
          </div>
        </div>
      </section>

      {/* Third Viewport - Team Members Section */}
      <section id="team-section" className="min-h-screen bg-gradient-to-r from-green-300 to-blue-400 flex flex-col items-center justify-center p-6">
        <h2 className="text-4xl font-bold text-white mb-8">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {['Gayatri Sawant', 'Vaishnavi Chavan', 'Tanaya '].map((name, index) => (
            <div
              key={index}
              className="w-64 p-6 bg-white bg-opacity-90 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={`https://via.placeholder.com/150?text=${name.split(" ")[0]}`}
                alt={name}
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-center text-blue-700">{name}</h3>
              <p className="text-center text-gray-700">Specialist in Healthcare Technology</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
