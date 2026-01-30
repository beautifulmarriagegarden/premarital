import React, { useState } from "react";
import "./App.css";
// import getFeedback from "./feedback.js";

// Replace with your Apps Script Web App URL
const LEAD_ENDPOINT = "https://script.google.com/macros/s/AKfycbxVZzmwdqt0JLPOiVt7hLo6G3Y6gJUILmpkblrCokkvC7hspvTOLwBWqj7oz8z4ovr_Ag/exec";
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
  
  // SECTION 1: RELATIONSHIP OVERVIEW
  {
  section: {
    title: "SECTION 1: RELATIONSHIP OVERVIEW",
    description: "These questions give us a general understanding of your relationship history, current stage, and practical context as you prepare for marriage."
  },
  question: "How long have you been in this relationship?",
  type: "text"
},
  { question: " How did you meet?", type: "text" },
  {
    question: " Are you currently:",
    type: "single",
    options: ["Dating", "Engaged", "Courting", "Long-distance relationship"],
  },
  {
    question: " Have you set a tentative wedding timeline?",
    type: "single",
    options: ["Yes", "No"],
  },
  {
    question: " If yes, please specify the tentative wedding timeline (indicate NA otherwise)",
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


// SECTION 2: FAITH & SPIRITUAL LIFE
 {
  section: {
    title: "SECTION 2: FAITH & SPIRITUAL LIFE",
    description: "These questions help us understand your faith background, spiritual practices, and how faith influences your relationship and decision-making."
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

  // SECTION 3: MOTIVATION FOR COUNSELLING
  {
  section: {
    title: "SECTION 3: MOTIVATION FOR COUNSELLING",
    description: "These questions explore your reasons for seeking premarital counselling, your expectations, and the areas where you are hoping for guidance and growth."
  },
   question: " What motivated you to seek pre-marital counselling at this time?", type: "text"
  },
  { question: " What are your top three expectations from pre-marital counselling?", type: "text" },
  { question: " Are there any specific concerns or issues you would like us to focus on?", type: "text" },


// SECTION 4: COMMUNICATION & CONFLICT
 {
  section: {
    title: "SECTION 4: COMMUNICATION & CONFLICT",
    description: "These questions help us understand how you communicate, handle disagreements, and navigate conflict within your relationship."
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

   // SECTION 5: EMOTIONAL & PERSONAL BACKGROUND

  {
  section: {
    title: "SECTION 5: EMOTIONAL & PERSONAL BACKGROUND",
     description: "These questions explore emotional awareness, past experiences, and personal factors that may influence your relationship and emotional responses."
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

    // SECTION 6: FAMILY & BACKGROUND
{
  section: {
    title: "SECTION 6: FAMILY & BACKGROUND",
   description: "These questions help us understand your family background, cultural influences, and the role extended family may play in your marriage."
  },
 question: "How would you describe your relationship with your family of origin?", 
 type: "text" ,
 },
  { question: " Are there cultural or family expectations that may affect your marriage?", type: "text" },
  { question: " How involved do you expect extended family to be after marriage?", type: "text" },

  // SECTION 7: VALUES, ROLES & EXPECTATIONS
  {
  section: {
    title: "SECTION 7: VALUES, ROLES & EXPECTATIONS",
     description: "These questions explore your values, beliefs about marriage, and expectations regarding roles, responsibilities, and life priorities."
  },
question: " What does marriage mean to you personally?", 
type: "text",
 },
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

  // SECTION 8: FINANCES & PRACTICAL LIFE
  {
  section: {
    title: "SECTION 8: FINANCES & PRACTICAL LIFE",
    description: "These questions focus on financial habits, practical planning, and how you approach money and shared responsibilities as a couple."
  },
question: " How do you currently manage finances?",
    type: "single",
    options: ["Individually", "Jointly", "Not discussed yet"],
 },
  { question: " Do either of you have significant financial obligations (debts, dependents)?", type: "text" },
  { question: " How comfortable are you discussing money matters?", type: "text" },

  // SECTION 9: INTIMACY & BOUNDARIES
  {
  section: {
    title: "SECTION 9: INTIMACY & BOUNDARIES",
    description: "These questions address intimacy, boundaries, and areas where you may desire clarity, alignment, or guidance before marriage."
  },
 question: " Have you discussed physical boundaries in your relationship?",
    type: "single",
    options: ["Yes", "No"],
 },
  { question: " Are there areas related to intimacy you would like guidance on?", type: "text" },

  // SECTION 10: READINESS FOR MARRIAGE
  {
  section: {
    title: "SECTION 10: READINESS FOR MARRIAGE",
    description: "These questions invite you to reflect on your readiness for marriage, including your hopes, concerns, and level of preparedness."
  },
  question: " On a scale of 1–10, how ready do you feel for marriage?", type: "text",
 },
  { question: " What excites you most about marriage?", type: "text" },
  { question: " What concerns or fears do you have about marriage?", type: "text" },
{question: "Certain genotype combinations may affect the health of future children. This section is for counseling and guidance purposes only. Do you know your genotype?",
  type: "single",
  options: ["Yes", "No"],
},

  // SECTION 11: ADDITIONAL INFORMATION
{
  section: {
    title: "SECTION 11: ADDITIONAL INFORMATION",
    description: "This section provides space for you to share any additional information you believe would be important for us to know before your counselling sessions."
},
 question: " Is there anything else you believe would be important for us to know before your counselling sessions?", 
  type: "text",
},

  // CONSENT
{
  section: {
    title: "CONSENT",
    description: "Please review the statements below and indicate your agreement before submitting your premarital counselling intake form."
},
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
const submitIntakeForm = async () => {
  if (!name.trim() || !email.trim()) {
    setFormError("Please enter both name and email to submit the form.");
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
    await saveLead(name.trim(), email.trim(), answers);
    setShowLeadForm(false);
    setSubmitted(true);
  } catch (err) {
    console.warn("Form save failed:", err);
    setFormError("We couldn’t submit your form. Please try again.");
  } finally {
    setSavingLead(false);
  }
};

 


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
  submitted;


  return (
  
    <div className="App">  
       <BrandHeader />

     {/* INTRO SCREEN — high-conversion version */}
{showIntro && !quizStarted && !submitted && (
  <section className="intro">

    <h1 className="intro-title">Premarital Counselling</h1>
    {/* <h2 className="intro-subtitle">Prepare for a Strong, Healthy, and God-Honouring Marriage</h2> */}
    <h2 className="intro-subtitle">
      Gain insights into your relationship, learn key skills, and align your expectations before you enter marriage.
    </h2>
 <button
      className="primary-btn"
      onClick={() => {
        setShowIntro(false);
        setQuizStarted(true);
      }}
    >
      Begin Assessment
    </button>
    <p className="intro-description">
      Answer 44 questions to help you build a fulfilling, God-centered marriage.
    </p>

    {/* Hero image */}
    <img
      src={`${import.meta.env.BASE_URL}images/cover_page.png`}
      alt="Single and Searching Audiobook"
      className="intro-hero-image"
      loading="eager"
    />

    <p className="intro-meta">
      ⏱ About 10-12 minutes • 🙏 Faith-based and confidential • 💛 Guided by caring counsellors
    </p>
  </section>
)}
      
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
    <h2 className="lead-title">Premarital Counselling Intake 🎉</h2>
    <p className="lead-subtitle">
      Please enter your details to submit your intake form to Beautiful Marriage Garden.
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
  onClick={submitIntakeForm}
  disabled={savingLead}
>
  {savingLead ? "Submitting..." : "Submit Intake Form"}
</button>

<p className="lead-privacy">
  🔒 Your information is private and will never be shared.
</p>
  </div>
)}


{submitted && (
  <div className="results">
    <div className="report-card">
      <div className="report-header">
        <div>
          <p className="report-label">Beautiful Marriage Garden • Premarital Counselling</p>
          <h2 className="report-title">Thank you for completing the intake form.</h2>
          <p className="report-subtitle">
            A counsellor will get in touch with you via the email you provided (<strong>{email}</strong>) within 24–48 hours.
          </p>
        </div>
      </div>

      <div className="report-footer">
        <span>Powered by Beautiful Marriage Garden</span>
      </div>
    </div>
  </div>
)}
</div>
  );}

export default App;