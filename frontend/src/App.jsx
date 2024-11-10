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
      // Editing an existing symptom
      const updatedSymptoms = [...symptoms];
      updatedSymptoms[editingIndex] = trimmedInput;
      setSymptoms(updatedSymptoms);
      setEditingIndex(null);
    } else if (!symptoms.includes(trimmedInput)) {
      // Adding a new symptom
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
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Symptom Checker</h2>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={symptomInput}
          onChange={(e) => setSymptomInput(e.target.value)}
          placeholder="Enter a symptom"
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          onClick={addOrEditSymptom}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          {editingIndex !== null ? 'Edit Symptom' : 'Add Symptom'}
        </button>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Selected Symptoms:</h3>
        <ul className="list-disc pl-5 mt-2">
          {symptoms.map((symptom, index) => (
            <li key={index} className="flex items-center justify-between text-gray-700 mb-2">
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
          className="mt-4 w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Check Diseases
        </button>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold">Results:</h3>
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="mt-4 p-4 border rounded-md shadow-sm">
              <h4 className="text-xl font-bold">{result.disease}</h4>
              <p className="text-gray-600"><strong>Prevention:</strong> {result.prevention}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No matching diseases found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
