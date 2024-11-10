const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample data with diseases, symptoms, and preventions
const diseasesData = [
  {
    "disease": "Migraine",
    "symptoms": ["headache", "nausea", "sensitivity to light", "sensitivity to sound"],
    "prevention": "Avoid triggers like stress, certain foods, and bright lights. Stay hydrated and maintain a regular sleep schedule."
  },
  {
    "disease": "Flu",
    "symptoms": ["fever", "chills", "headache", "cough", "body ache", "fatigue"],
    "prevention": "Get vaccinated annually, wash hands regularly, avoid close contact with sick individuals."
  },
  {
    "disease": "Common Cold",
    "symptoms": ["runny nose", "sore throat", "cough", "sneezing", "headache"],
    "prevention": "Wash hands frequently, avoid touching your face, and stay warm."
  },
  {
    "disease": "Allergic Rhinitis",
    "symptoms": ["sneezing", "runny nose", "itchy eyes", "nasal congestion"],
    "prevention": "Avoid allergens, keep windows closed during pollen season, and use air purifiers if needed."
  },
  {
    "disease": "Strep Throat",
    "symptoms": ["sore throat", "fever", "pain when swallowing", "swollen lymph nodes"],
    "prevention": "Avoid close contact with infected people, wash hands frequently, and avoid sharing utensils."
  },
  {
    "disease": "Food Poisoning",
    "symptoms": ["nausea", "vomiting", "diarrhea", "stomach cramps", "fever"],
    "prevention": "Cook food thoroughly, avoid cross-contamination, and practice proper food storage."
  },
  {
    "disease": "Gastroenteritis",
    "symptoms": ["nausea", "vomiting", "diarrhea", "stomach pain", "fever"],
    "prevention": "Maintain good hygiene, avoid contaminated food or water, and wash hands frequently."
  },
  {
    "disease": "Asthma",
    "symptoms": ["shortness of breath", "wheezing", "chest tightness", "coughing"],
    "prevention": "Avoid allergens and pollutants, use prescribed inhalers, and practice breathing exercises."
  },
  {
    "disease": "Chickenpox",
    "symptoms": ["fever", "itchy rash", "blisters", "fatigue"],
    "prevention": "Get vaccinated, avoid contact with infected individuals, and maintain good hygiene."
  },
  {
    "disease": "Malaria",
    "symptoms": ["fever", "chills", "headache", "sweating", "muscle pain"],
    "prevention": "Use mosquito nets, apply insect repellent, and take antimalarial medications if in high-risk areas."
  },
  {
    "disease": "Dengue Fever",
    "symptoms": ["fever", "headache", "joint pain", "rash", "muscle pain"],
    "prevention": "Avoid mosquito bites by using repellent, wear protective clothing, and eliminate stagnant water."
  },
  {
    "disease": "Diabetes",
    "symptoms": ["increased thirst", "frequent urination", "fatigue", "blurred vision", "slow-healing wounds"],
    "prevention": "Maintain a balanced diet, exercise regularly, avoid excessive sugar intake, and monitor blood glucose levels."
  },
  {
    "disease": "Hypertension",
    "symptoms": ["headache", "dizziness", "blurred vision", "shortness of breath", "fatigue"],
    "prevention": "Eat a low-sodium diet, exercise regularly, reduce stress, and avoid smoking and excessive alcohol."
  },
  {
    "disease": "Anemia",
    "symptoms": ["fatigue", "weakness", "pale skin", "shortness of breath", "dizziness"],
    "prevention": "Eat iron-rich foods, maintain a balanced diet, and get regular check-ups if at risk."
  },
  {
    "disease": "Tuberculosis",
    "symptoms": ["persistent cough", "fever", "night sweats", "weight loss", "fatigue"],
    "prevention": "Avoid close contact with infected individuals, ensure good ventilation, and get vaccinated (BCG vaccine)."
  },
  {
    "disease": "COVID-19",
    "symptoms": ["fever", "cough", "shortness of breath", "loss of taste", "loss of smell"],
    "prevention": "Wear masks, practice social distancing, wash hands frequently, and get vaccinated."
  },
  {
    "disease": "Pneumonia",
    "symptoms": ["fever", "chest pain", "cough", "shortness of breath", "fatigue"],
    "prevention": "Get vaccinated, avoid smoking, practice good hygiene, and seek early treatment if symptoms appear."
  }
]

// Endpoint to check for diseases based on symptoms
app.post('/api/check-disease', (req, res) => {
  const { symptoms } = req.body;

  // Normalize the input symptoms to lowercase for case-insensitive matching
  const normalizedSymptoms = symptoms.map(symptom => symptom.toLowerCase().trim());

  // Find diseases that match any of the input symptoms
  const matchingDiseases = diseasesData.filter(disease =>
    disease.symptoms.some(diseaseSymptom => normalizedSymptoms.includes(diseaseSymptom.toLowerCase()))
  );

  // Return matching diseases or an empty array if no matches found
  res.json(matchingDiseases);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
