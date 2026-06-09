# 🌐 Transify — AI Translation Tool 🍦✨

<p align="center">
  <img src="https://cdn.dribbble.com/userupload/12388963/file/original-1d4cbb6d7f5a64d7e6b1a08e7f2b91d5.png" width="700"/>
</p>

---

## 🚀 Project Overview

**Transify** is a modern, AI-powered web-based translation tool built as part of **Code Alpha Task 1**.
It allows users to translate text across **40+ languages** with a smooth, aesthetic, and user-friendly interface.

This project combines **frontend design + serverless backend (Netlify Functions)** to create a complete working application.

---

## ✨ Features

* 🌍 Supports **40+ languages**
* ⚡ Fast and responsive translations
* 🔄 Language swap functionality
* 🔊 Text-to-Speech (listen to translations)
* 📋 One-click copy feature
* 🧠 Auto language detection
* 🎨 Beautiful gelato-themed UI design
* 📱 Fully responsive layout

---

## 🖥️ Project Structure

```
transify/
│
├── index.html                # Main frontend UI
├── netlify/
│   └── functions/
│       └── translate.js      # Serverless backend function
└── README.md
```

---

## ⚙️ How It Works

### 🔹 Frontend (index.html)

* Built using **HTML, CSS, JavaScript**
* Handles:

  * User input
  * Language selection
  * UI interactions
  * API requests to backend

---

### 🔹 Backend (Netlify Function)

File: `netlify/functions/translate.js`

* Receives POST request with:

  * text
  * sourceLang
  * targetLang
* Converts language names → language codes
* Sends request to translation API
* Returns translated text

---

## 🌐 Deployment

This project is deployed using **Netlify**.

### 📌 Steps:

1. Push project to GitHub
2. Connect repo to Netlify
3. Ensure folder structure:

   ```
   netlify/functions/translate.js
   ```
4. Deploy 🚀

---

## 🧠 Technologies Used

* HTML5
* CSS3 (Advanced UI + animations)
* JavaScript (Vanilla)
* Netlify Functions (Serverless backend)

---

## 🎯 Key Functionalities

✔ Input text translation
✔ Language detection
✔ Real-time UI feedback
✔ Copy & clear buttons
✔ Speech synthesis (TTS)
✔ Error handling

---

## ⚠️ Notes

* Requires internet connection
* Translation depends on API response
* Browser must support **SpeechSynthesis API** for TTS

---

## 👩‍💻 Author

**Asiya Maryam** 🍦✨

---

## 💥 Final Thoughts

Transify is not just a translation tool —
it’s a **blend of functionality + aesthetic design + real-world deployment**.

> “Words travel beautifully.” 🌍✨

---
