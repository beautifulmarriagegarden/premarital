import React, { useState } from "react";
import "./App.css";
// import getFeedback from "./feedback.js";

// Replace with your Apps Script Web App URL
const LEAD_ENDPOINT = "https://script.google.com/macros/s/AKfycbxQCYgKrkmzOI_oSKIkQa7esAcIaESx9e943AvR2Fthj61FtakwQL7KBcXyHxE1UEW79g/exec";
//mm
async function saveLead(name, email, answers,results) {
  // Send URL-encoded form data (simple request → no preflight)
  // Build a payload (URL-encoded to avoid preflight)
  const payload = new URLSearchParams({
    name,
    email,
    source: "Relationship Reflection Quiz",
    userAgent: navigator.userAgent,
    // ip: include if you fetch one client-side
    
    // Store answers as JSON string (easy to parse in Apps Script)
    answers: JSON.stringify(answers),
    // Optional: store computed results too
    tags: JSON.stringify(results?.tags || []),
    chapters: JSON.stringify(results?.chapters || []),
    messages: JSON.stringify(results?.messages || [])
  });

  const res = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    body: payload // IMPORTANT: no headers; let the browser set Content-Type
  });

  // Optional: read JSON response from Apps Script
  let json = {};
  try { json = await res.json(); } catch (_) {}
  if (!res.ok || json.ok === false) {
    throw new Error(json.error || `Lead save failed (status ${res.status})`);
  }
}

const questions = [
  
  // SECTION 2: RELATIONSHIP OVERVIEW
  {
  section: {
    title: "SECTION 2: RELATIONSHIP OVERVIEW",
    description: "These questions help us understand why you are seeking counselling and what you hope to gain."
  },
  question: "How long have you been in this relationship?",
  type: "text"
},
  { question: " How long have you been in this relationship?", type: "text" },
  { question: " How did you meet?", type: "text" },
  {
    question: " Are you currently:",
    type: "single",
    options: ["Dating", "Engaged", "Courting", "Long-distance relationship"],
  },
  {
    question: " Have you set a tentative wedding timeline?",
    type: "single",
    options: ["Yes (please specify below)", "No"],
  },
  {
    question: " If yes, please specify the tentative wedding timeline:",
    type: "text",
  },
  {
    question: " Have either of you been previously married?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    question: " Do you currently live together?",
    type: "single",
    options: ["Yes", "No"],
  },


// SECTION 3: FAITH & SPIRITUAL LIFE
 {
  section: {
    title: "SECTION 3: FAITH & SPIRITUAL LIFE",
    description: "These questions help us understand why you are seeking counselling and what you hope to gain."
  },
  question: " Do you identify as a Christian?",
    type: "single",
    options: ["Yes", "No", "Exploring faith"],
  },
  { question: " What Christian tradition or denomination do you belong to (if any)?", type: "text" },
  {
    question: " How important is faith in your relationship?",
    type: "single",
    options: ["Very important", "Somewhat important", "Not very important"],
  },
  {
    question: " Do you pray together as a couple?",
    type: "single",
    options: ["Regularly", "Occasionally", "Rarely", "Never"],
  },
  {
    question: " How would you describe your personal relationship with God at this stage of your life?",
    type: "text",
  },

  // SECTION 4: MOTIVATION FOR COUNSELLING
  {
  section: {
    title: "SECTION 3: FAITH & SPIRITUAL LIFE",
    description: "These questions help us understand why you are seeking counselling and what you hope to gain."
  },
   question: " What motivated you to seek pre-marital counselling at this time?", type: "text"
  },
  { question: " What are your top three expectations from pre-marital counselling?", type: "text" },
  { question: " Are there any specific concerns or issues you would like us to focus on?", type: "text" },


// SECTION 5: COMMUNICATION & CONFLICT
 {
  section: {
    title: "SECTION 5: COMMUNICATION & CONFLICT",
    description: "These questions help us understand why you are seeking counselling and what you hope to gain."
  },
 question: " How would you describe communication in your relationship?",
    type: "single",
    options: ["Very healthy", "Mostly healthy", "Sometimes difficult", "Often challenging"],
  },
  { question: " When conflicts arise, how do you usually resolve them?", type: "text" },
  { question: " What are the most common sources of disagreement between you?", type: "text" },
  {
    question: " Do unresolved conflicts tend to linger?",
    type: "single",
    options: ["Yes", "No"],
  },

   // SECTION 6: EMOTIONAL & PERSONAL BACKGROUND

  {
  section: {
    title: "SECTION 5: COMMUNICATION & CONFLICT",
    description: "These questions help us understand why you are seeking counselling and what you hope to gain."
  },
    question: "How comfortable are you with expressing your emotions?",
    type: "single",
    options: ["Very comfortable", "Somewhat comfortable", "Not comfortable"],
  },
  {
    question:
      "Have you experienced any of the following that may impact your relationship? (Select all that apply)",
    type: "multiple",
    options: [
      "Past relationship trauma",
      "Family conflict or broken home",
      "Abuse (emotional, physical, or sexual)",
      "Significant loss or grief",
      "None of the above",
      "Other",
    ],
  },
  {
    question: "If you selected “Other”, please specify:",
    type: "text",
  },
  {
    question: "Are you currently receiving therapy or counselling elsewhere?",
    type: "single",
    options: ["Yes", "No"],
  },

    // SECTION 7: FAMILY & BACKGROUND
  { question: " How would you describe your relationship with your family of origin?", type: "text" },
  { question: " Are there cultural or family expectations that may affect your marriage?", type: "text" },
  { question: " How involved do you expect extended family to be after marriage?", type: "text" },

  // SECTION 8: VALUES, ROLES & EXPECTATIONS
  { question: " What does marriage mean to you personally?", type: "text" },
  { question: " What do you believe are the roles of a husband and a wife in marriage?", type: "text" },
  {
    question: " Have you discussed expectations around finances?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    question: " Have you discussed expectations around children?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    question: " Have you discussed expectations around career goals?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    question: " Have you discussed expectations around household responsibilities?",
    type: "single",
    options: ["Yes", "No"],
  },

  // SECTION 9: FINANCES & PRACTICAL LIFE
  {
    question: " How do you currently manage finances?",
    type: "single",
    options: ["Individually", "Jointly", "Not discussed yet"],
  },
  { question: " Do either of you have significant financial obligations (debts, dependents)?", type: "text" },
  { question: " How comfortable are you discussing money matters?", type: "text" },

  // SECTION 10: INTIMACY & BOUNDARIES
  {
    question: " Have you discussed physical boundaries in your relationship?",
    type: "single",
    options: ["Yes", "No"],
  },
  { question: " Are there areas related to intimacy you would like guidance on?", type: "text" },

  // SECTION 11: READINESS FOR MARRIAGE
  { question: " On a scale of 1–10, how ready do you feel for marriage?", type: "text" },
  { question: " What excites you most about marriage?", type: "text" },
  { question: " What concerns or fears do you have about marriage?", type: "text" },

  // SECTION 12: ADDITIONAL INFORMATION
  { question: " Is there anything else you believe would be important for us to know before your counselling sessions?", type: "text" },

  // CONSENT
  {
    question: "I understand that pre-marital counselling is a guided process aimed at growth, clarity, and preparation for marriage.",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    question: "I agree to participate honestly and respectfully in the counselling process.",
    type: "single",
    options: ["Yes", "No"],
  },
  ];

  // For each question index, map option text -> tag
const TAGS_BY_QUESTION = {
  0: { // Q1
    "Fear of making the wrong choice": "Emotional Healing & Fear",
    "Anxiety about whether it will ever happen": "Loneliness & Emotional Strain",
    "Hope mixed with peace": "Healthy Alignment",
    "Pressure to “figure it out quickly": "Pressure from Others"
  },
  1: { // Q2
    "I’m still affected by past heartbreak": "Emotional Healing",
    "I’ve healed, but I’m cautious": "Partial Healing",
    "I’ve fully healed and feel emotionally free": "Healthy Readiness",
    "I try not to think about the past at all": "Avoidance / Unresolved Hurt"
  },
  2: { // Q3
    "My emotions and chemistry": "Emotion-led",
    "Advice from others": "External Voices",
    "Prayer and inner peace": "Discerning God’s Will",
    "Timing and pressure": "Pressure-driven"
  },
  3: { // Q4
    "I pray occasionally": "Inconsistent Prayer",
    "I pray only when I feel worried": "Reactive Prayer",
    "I intentionally pray and seek God’s guidance": "Strong Spiritual Foundation",
    "I struggle to know how to pray about it": "Need for Guidance"
  },
  4: { // Q5
    "I prefer to leave it entirely to God": "Passive Waiting",
    "I’m open but unsure where to start": "Unclear Process",
    "I actively engage in healthy opportunities": "Healthy Engagement",
    "I avoid connections due to fear or disappointment": "Fear-based Withdrawal"
  },
  5: { // Q6
    "I prefer to decide alone": "Isolation",
    "I listen but rarely act on advice": "Selective Listening",
    "I value wise counsel": "Wise Engagement",
    "I feel uncomfortable with recommendations": "Emotional Guarding"
  },
  6: { // Q7
    "Finding the right man": "External Focus",
    "Healing and personal growth": "Emotional Readiness",
    "Building my purpose and identity": "Strong Preparation",
    "Waiting and trusting God": "Passive Trust"
  },
  7: { // Q8
    "Marriage will complete me": "Unrealistic Expectations",
    "Marriage is a partnership, not a solution": "Healthy Mindset",
    "I fear marriage may limit me": "Fear-based Thinking",
    "I haven’t thought deeply about it": "Undefined Beliefs"
  },
  8: { // Q9
    "I dress to attract attention": "Attention-Driven",
    "I dress modestly but without confidence": "Low Confidence",
    "I present myself with dignity and confidence": "Healthy Self-Worth",
    "I struggle to find balance": "Need for Guidance"
  },
  9: { // Q10
    "Wait and hope he proposes": "Passive Waiting",
    "Confront him immediately": "Reactive",
    "Set boundaries and seek clarity": "Healthy Boundaries",
    "Feel confused and emotionally drained": "Emotional Confusion"
  }
};

// If they choose     "Pressure to “figure it out quickly": "Pressure from Others"
// for question 1 then I should point them up to chapter 4 as well
// 
// "I pray occasionally",
 //       "I pray only when I feel worried",
 //       "I struggle to know how to pray about it"
// Personalized rules that trigger messages + chapter recommendations
const RULES = [
  {
    id: "q1_fear_anxiety",
    when: (answers) => answers[0] === "Fear of making the wrong choice" ||
                      answers[0] === "Anxiety about whether it will ever happen",
    message:
      "Fear and anxiety may be shaping your expectations. God desires to lead you from peace, not pressure or fear.",
    chapters: ["Chapter 1 (Fear)", "Chapter 2 (Loneliness)"]
  },
  {
    id: "q2_unhealed",
    when: (answers) => answers[1] === "I’m still affected by past heartbreak" ||
                      answers[1] === "I try not to think about the past at all",
    message:
      "Unhealed wounds can quietly shape who we attract and how we respond to love.",
    chapters: ["Chapter 3 (Hurt from Past Love Relationships)"]
  },
  {
    id: "q3_emotion_pressure",
    when: (answers) => answers[2] === "My emotions and chemistry" ||
                      answers[2] === "Timing and pressure",
    message:
      "God’s will is often confirmed through peace, not urgency or emotional highs.",
    chapters: ["Chapter 6 (Identifying God’s Will)"]
  },
  {
    id: "q4_prayer",
    when: (answers) => answers[3] === "I pray only when I feel worried" ||
                      answers[3] === "I struggle to know how to pray about it" ||
                      answers[3] ===  "I pray occasionally",
    message:
      "Prayer is not a last resort; it’s the foundation of clarity and peace.",
    chapters: ["Chapter 7 (The Role of Prayer)", "Chapter 8 (Real-Life Stories)"]
  },
  {
    id: "q5_connections",
    when: (answers) => answers[4] === "I prefer to leave it entirely to God" ||
                      answers[4] === "I avoid connections due to fear or disappointment",
    message:
      "Faith includes action. God often works through connections and community.",
    chapters: ["Chapter 9 (Circles of Connection)"]
  },
  {
    id: "q6_wise_voices",
    when: (answers) => answers[5] === "I prefer to decide alone" ||
                      answers[5] === "I feel uncomfortable with recommendations",
    message:
      "God often uses trusted voices to protect and guide us.",
    chapters: ["Chapter 10 (Opening Up & Wise Voices)"]
  },
  {
    id: "q7_external_focus",
    when: (answers) => answers[6] === "Finding the right man",
    message:
      "Preparation attracts healthy love more than pursuit ever could.",
    chapters: ["Chapter 13 (Becoming the Woman He Wants to Marry)"]
  },
  {
    id: "q8_mindset",
    when: (answers) => answers[7] === "Marriage will complete me" ||
                      answers[7] === "I fear marriage may limit me",
    message:
      "A healthy mindset creates a healthy marriage foundation.",
    chapters: ["Chapter 14 (Right Mindset About Marriage)"]
  },
  {
    id: "q9_presentation",
    when: (answers) => answers[8] === "I dress to attract attention" ||
                      answers[8] === "I struggle to find balance",
    message:
      "How you present yourself communicates your values before words do.",
    chapters: ["Chapter 15 (Look Presentable, Not Seductive)"]
  },
  {
    id: "q10_commitment",
    when: (answers) => answers[9] === "Wait and hope he proposes" ||
                      answers[9] === "Feel confused and emotionally drained",
    message:
      "Clarity protects your heart and time.",
    chapters: ["Chapter 16 (Responding to Proposals)", "Chapter 17 (Interest Without Commitment)"]
  }
];

 function App() {
    // NEW: gate the intro screen
  const [showIntro, setShowIntro] = useState(true);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(questions.map(q => q.type === "multiple" ? [] : ""));
  const [otherAnswers, setOtherAnswers] = useState(questions.map(() => ""));
  const [submitted, setSubmitted] = useState(false);
  
// Allow option for text
const handleTextAnswer = (text) => {
  const newAnswers = [...answers];
  newAnswers[current] = text;
  setAnswers(newAnswers);
};

  // New: track quiz start and user info
  const [quizStarted, setQuizStarted] = useState(false);
  //const [name, setName] = useState("");
  //const [email, setEmail] = useState("");
  //const [formError, setFormError] = useState("");

  // Lead capture (now happens at the end)
  const [showLeadForm, setShowLeadForm] = useState(false);
  //const [leadSaved, setLeadSaved] = useState(false);
  const [savingLead, setSavingLead] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");

  const currentQuestion = questions[current];
  const getCurrentSection = (idx) => {
  for (let i = idx; i >= 0; i--) {
    if (questions[i].section) return questions[i].section;
  }
  return null;
};

const currentSection = getCurrentSection(current);

  const isLast = current === questions.length - 1;
  const isFirst = current === 0;

  const handleAnswer = (value, isCheckbox = false) => {
    const newAnswers = [...answers];
    if (isCheckbox) {
      const currentValues = newAnswers[current] || [];
      if (currentValues.includes(value)) {
        newAnswers[current] = currentValues.filter(v => v !== value);
      } else {
        newAnswers[current] = [...currentValues, value];
      }
    } else {
      newAnswers[current] = value;
    }
    setAnswers(newAnswers);

    if (currentQuestion.type === "single" && value !== "Other") {
      setTimeout(() => {
        if (!isLast) {
          setCurrent(prev => prev + 1);
        } else {
          //setSubmitted(true);
          setShowLeadForm(true);
        }
      }, 300);
    }
  };

  const handleOtherChange = (text) => {
    const updated = [...otherAnswers];
    updated[current] = text;
    const updatedAnswers = [...answers];
    if (currentQuestion.type === "multiple") {
      if (!updatedAnswers[current].includes("Other")) {
        updatedAnswers[current] = [...updatedAnswers[current], "Other"];
      }
    } else {
      updatedAnswers[current] = "Other";
    }
    setOtherAnswers(updated);
    setAnswers(updatedAnswers);
  };

  const validateAndNext = () => {

  if (currentQuestion.type === "text") {
    if (!String(answers[current] || "").trim()) {
    alert("Please enter your answer.");
    return;
  }
}
    if (currentQuestion.type === "multiple") {
      if (answers[current].length === 0) {
        alert("Please select at least one option.");
        return;
      }
      if (answers[current].includes("Other") && !otherAnswers[current].trim()) {
        alert("Please specify your 'Other' answer.");
        return;
      }
    }
    if (!isLast) {
      setCurrent(current + 1);
    } else {
      //setSubmitted(true);
      setShowLeadForm(true);
    }
  };

  const displayAnswer = (qIndex) => {
    const ans = answers[qIndex];
    const other = otherAnswers[qIndex];
    if (Array.isArray(ans)) {
      return ans.map(a => a === "Other" ? `Other: ${other}` : a).join(", ");
    } else {
      return ans === "Other" ? `Other: ${other}` : ans;
    }
  };


const startQuiz = () => {
  setQuizStarted(true);
};

// ADD IT RIGHT HERE
const submitLeadAndShowResults = async () => {
  if (!name.trim() || !email.trim()) {
    setFormError("Please enter both name and email to see your results.");
    return;
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    setFormError("Please enter a valid email address.");
    return;
  }

  setFormError("");
  setSavingLead(true);

  try {
    const computed = buildResults(answers); // compute once
    await saveLead(name.trim(), email.trim(), answers, computed);
    setShowLeadForm(false);
    setSubmitted(true);
  } catch (err) {
    console.warn("Lead save failed:", err);
    setFormError("We couldn’t save your details. Please try again.");
  } finally {
    setSavingLead(false);
  }
};

 // const startQuiz = async () => {
 // if (!name.trim() || !email.trim()) {
  //  setFormError("Please enter both name and email to begin.");
  //  return;
 // }

//  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//  if (!emailOk) {
//    setFormError("Please enter a valid email address.");
//    return;
//  }
//  setFormError("");
  
//  setQuizStarted(true);

// saveLead(name.trim(), email.trim()).catch((err) => {
 //   console.warn("Lead save failed:", err);
    // optional: set a non-blocking message somewhere
    // setFormError("We couldn't save your details, but you can continue.");
//  });
//};

const buildResults = (answers) => {
  // Collect tags (unique)
  const tags = [];
  for (let i = 0; i < answers.length; i++) {
    const tag = TAGS_BY_QUESTION[i]?.[answers[i]];
    if (tag) tags.push(tag);
  }
  const uniqueTags = Array.from(new Set(tags));

  // Trigger messages + chapters
  const triggered = RULES.filter(r => r.when(answers));
  const messages = triggered.map(r => r.message);
  const chapters = Array.from(new Set(triggered.flatMap(r => r.chapters)));

  return { tags: uniqueTags, messages, chapters };
};

const results = submitted ? buildResults(answers) : null;

const BrandHeader = () => (
  <div className="brand-header">
    <img
      src={`${import.meta.env.BASE_URL}images/logo.png`}
      alt="Beautiful Marriage Garden"
      className="brand-logo"
    />
    <span className="brand-name">Beautiful Marriage Garden</span>
  </div>
);

const showBrandHeader =
  (showIntro && !quizStarted && !submitted) ||
  (showLeadForm && !submitted) ||
  (submitted && results);

  return (
  
    <div className="App">  
       <BrandHeader />

     {/* INTRO SCREEN — high-conversion version */}
{showIntro && !quizStarted && !submitted && (
  <section className="intro">

    <h1 className="intro-title">Single and Searching?</h1>
    <h1 className="intro-title">You’re not behind.</h1>
    <h2 className="intro-subtitle">
      Discover what may be holding you back — and what God is preparing you for next.
    </h2>
 <button
      className="primary-btn"
      onClick={() => {
        setShowIntro(false);
        setQuizStarted(true);
      }}
    >
      Take the Quiz
    </button>
    <p className="intro-description">
      Answer 10 quick questions to receive a personalized reflection
      based on where you are emotionally, spiritually, and relationally.
    </p>

    {/* Hero image */}
    <img
      src={`${import.meta.env.BASE_URL}images/cover_page.png`}
      alt="Single and Searching Audiobook"
      className="intro-hero-image"
      loading="eager"
    />

    <p className="intro-meta">
      ⏱ Takes less than 3 minutes • 🙏 Faith-centered • 💛 Private
    </p>
  </section>
)}
          {/* Option B: local/video file (uncomment and remove the iframe if you prefer)
          <video className="video-file" controls playsInline preload="metadata">
            <source src="/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <button className="primary-btn" onClick={() => setShowIntro(false)}>
            Take the Quiz
          </button> 
            <button className="primary-btn"
            onClick={() => {
              setShowIntro(false);
              setQuizStarted(true);
              }} >
                Take the Quiz
                </button>
        </section>
      )}*/}
      
      

      {/* Start Screen */}
        {/* {!showIntro && !quizStarted && !submitted && !showLeadForm && (
        <div className="start-screen">
          <h1><em>Single and Searching?</em></h1>
          <h2><em>The Ladies Guide To Find A Godly Husband</em></h2>
          <h4>Answer These 10 Questions to Discover What You Need to Work on to Find a Godly Husband.</h4>
          <h4>Get a personalized result based on where you are right now</h4>
           <p>Click below to begin.</p>
             <button onClick={startQuiz}>Start Quiz</button>
        </div>)}

   
       {!showIntro && !quizStarted && !submitted && (
        <div className="start-screen">
          <h2>Welcome to the Relationship Reflection Quiz</h2>
          <p>Please enter your details to begin.</p>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />     
          {formError && <p style={{ color: "red" }}>{formError}</p>}
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      )} */}


      {/* Quiz Questions */}
      {quizStarted && !submitted && !showLeadForm && (
        <div className="question-container">
          {!isFirst && (
            <button className="back-btn" onClick={() => setCurrent(current - 1)}>
              ← Back
            </button>
          )}

{/* SECTION HEADER (shows on every question in the section) */}
    {currentSection && (
      <div className="section-header">
        <h3 className="section-title">{currentSection.title}</h3>
        {currentSection.description && (
          <p className="section-description">
            {currentSection.description}
          </p>
        )}
      </div>
    )}

          <h2 className="question-text">{currentQuestion.question}</h2>
          {currentQuestion.image && (
            <img
            src={`${import.meta.env.BASE_URL}${currentQuestion.image.replace(/^\//, "")}`}
            alt={currentQuestion.alt || `Question ${current + 1} illustration`}
            className="question-image"
            loading="lazy"
             />
          )}

        <div className="options">

  {/* TEXT QUESTIONS */}
  {currentQuestion.type === "text" && (
    <>
      <textarea
        className="lead-input"
        placeholder="Type your answer here..."
        value={answers[current] || ""}
        onChange={(e) => handleTextAnswer(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />
      <button className="next-btn" onClick={validateAndNext}>
        {isLast ? "Submit" : "Next"}
      </button>
    </>
  )}

  {/* SINGLE / MULTIPLE QUESTIONS */}
  {(currentQuestion.type === "single" || currentQuestion.type === "multiple") &&
    (currentQuestion.options || []).map((opt, i) => {
      const isOther = opt === "Other";
      const isChecked =
        currentQuestion.type === "multiple"
          ? answers[current].includes(opt)
          : answers[current] === opt;

      return (
        <div key={i}>
          <label>
            <input
              type={currentQuestion.type === "multiple" ? "checkbox" : "radio"}
              name={`q${current}`}
              value={opt}
              checked={isChecked}
              onChange={() => handleAnswer(opt, currentQuestion.type === "multiple")}
            />
            {isOther ? "Other:" : opt}
          </label>

          {isOther && isChecked && (
            <input
              type="text"
              value={otherAnswers[current]}
              onChange={(e) => handleOtherChange(e.target.value)}
              placeholder="Please specify"
            />
          )}
        </div>
      );
    })}

  {/* Next button for MULTIPLE */}
  {currentQuestion.type === "multiple" && (
    <button className="next-btn" onClick={validateAndNext}>
      {isLast ? "Submit" : "Next"}
    </button>
  )}

  {/* Next button for SINGLE (because you auto-advance on click already) */}
</div>

          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            ></div>
            <p className="progress-label">
              {Math.round(((current + 1) / questions.length) * 100)}% Complete
            </p>
          </div>
        </div>
      )}

{/* Lead Capture (after questions, before results) */}
{showLeadForm && !submitted && (
  <div className="start-screen">
    <h2 className="lead-title">Your Results Are Ready 🎉</h2>
    <p className="lead-subtitle">
      Enter your details to receive your personalized reflection.
    </p>

  <input
  className="lead-input"
  type="text"
  placeholder="Your first name"
  value={name}
  onChange={e => setName(e.target.value)}
/>

<input
  className="lead-input"
  type="email"
  placeholder="Your email address"
  value={email}
  onChange={e => setEmail(e.target.value)}
/>

  {/*  <input
      type="text"
      placeholder="Your Name"
      value={name}
      onChange={e => setName(e.target.value)}
    />
    <input
      type="email"
      placeholder="Your Email"
      value={email}
      onChange={e => setEmail(e.target.value)}
    /> */}

    {formError && <p style={{ color: "red" }}>{formError}</p>}

    <button
  className="lead-btn"
  onClick={submitLeadAndShowResults}
  disabled={savingLead}
>
  {savingLead ? "Preparing your results..." : "View My Results"}
</button>

<p className="lead-privacy">
  🔒 Your information is private and will never be shared.
</p>

  {/* <button onClick={submitLeadAndShowResults} disabled={savingLead}>
      {savingLead ? "Saving..." : "Show My Results"}
    </button> */}
  </div>
)}


{/* Results */}
{submitted && results && (
  <div className="results">
    <div className="report-card">
      <div className="report-header">
        <div>
          <p className="report-label">Beautiful Marriage Garden • Quiz Report</p>
          <h2 className="report-title">Your Personalized Results</h2>
          <p className="report-subtitle">A snapshot of where you are right now — and what to focus on next.</p>
        </div>

        {/* Optional badge (you can change the label) */}
        <div className="report-badge">
          <div className="badge-top">Status</div>
          <div className="badge-main">In Progress</div>
          <div className="badge-bottom">Growth Season</div>
        </div>
      </div>

      <div className="report-grid">
        <section className="report-section">
          <h3 className="section-title">Tags (Your Current Season)</h3>
          <div className="pill-wrap">
            {results.tags.map((t, i) => (
              <span className="pill" key={i}>{t}</span>
            ))}
          </div>
        </section>

        <section className="report-section">
          <h3 className="section-title">Insight</h3>
          <ul className="bullets">
            {results.messages.length > 0 ? (
              results.messages.map((m, i) => <li key={i}>{m}</li>)
            ) : (
              <li>Thank you for completing the quiz. Keep seeking God’s peace and wisdom in your journey.</li>
            )}
          </ul>
        </section>
        
      <section className="report-section">
  <h3 className="section-title">Recommended Chapters</h3>
   <p className="section-subtitle">
    Based on your responses, the following chapters from the book: <em>"Single and Searching? The Lady’s Guide to Find and Attract the Right Husband"</em> 
    are a helpful place to begin your personal reflection and growth.
  </p>

  <ol className="chapters">
    {results.chapters.map((c, i) => (
      <li key={i} className="chapter-item">{c}</li>
    ))}
  </ol>

  {/* Audiobook preview */}
  <div className="audiobook-preview">
    <img
      src={`${import.meta.env.BASE_URL}images/phone_book.png`}
      alt="Single and Searching Audiobook"
      className="audiobook-image"
      loading="lazy"
    />

    <p className="audiobook-caption">
      🎧 Prefer to listen? Here’s a short audio introduction to help you reflect on your results.
    </p>

    <audio
      controls
      preload="none"
      className="audiobook-audio"
      src={`${import.meta.env.BASE_URL}audio/intro.mp3`}
    >
      Your browser does not support the audio element.
    </audio>

    <p className="audiobook-link-text">
      Want to go deeper?
    </p>

    <a
      href="https://payhip.com/b/bO6Gw"
      target="_blank"
      rel="noreferrer"
      className="audiobook-link"
    >
      🎧 Listen to the full audiobook
    </a>
  </div>
</section>

        {/* Optional call-to-action area */}
        <section className="report-section report-cta">
          <h3 className="section-title">Next Step</h3>
          <p className="cta-text">
            Want a clear plan? Start with the chapters above and take notes on what stands out.
          </p>

          {/* Replace with your real link later */}
          <a className="cta-btn" href="https://payhip.com/b/bO6Gw" target="_blank" rel="noreferrer">
            Begin Your Next Step with this Guide
          </a>
        </section>
      </div>

      <div className="report-footer">
        <span>Powered by Beautiful Marriage Garden</span>
      </div>
    </div>
  </div> 
)}
{/*  {!showIntro && (
  <footer className="app-footer">
    <img
      src={`${import.meta.env.BASE_URL}images/logo.png`}
      alt="Beautiful Marriage Garden"
      className="footer-logo"
    />
  </footer>
)} */}
</div>
  );}

export default App;