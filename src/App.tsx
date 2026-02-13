import React, { useState } from 'react';
import { Brain, Coffee, BrainCircuit, Globe } from 'lucide-react';
import { translations } from './translations';


function App() {
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const t = translations[language]; // 't' for current translations

  const questions = t.questions;
  const sectionNames = t.sectionNames;

  const handleExportPdf = () => {
    const element = document.getElementById('wsq-results');
    if (element) {
      const opt = {
        margin: 1,
        filename: 'WSQ_Results.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, // Increase scale for better resolution
          logging: true, // Enable logging for debugging
          useCORS: true, // Try using CORS
          allowTaint: true, // Allow tainting for cross-origin images (if any)
          scrollY: -window.scrollY, // Capture full scrollable content
          scrollX: -window.scrollX,
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      window.html2pdf().set(opt).from(element).save();
    }
  };
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateScore = () => {
    let total = 0;
    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        total += question.isReversed ? (5 - answer) : answer;
      }
    });
    return total;
  };

  const calculateSectionScores = () => {
    const sectionScores: { [key: number]: { score: number; maxPossible: number } } = {};
    
    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const score = question.isReversed ? (5 - answer) : answer;
        if (!sectionScores[question.section]) {
          sectionScores[question.section] = { score: 0, maxPossible: 0 };
        }
        sectionScores[question.section].score += score;
        sectionScores[question.section].maxPossible += 4; // Max possible score per question
      }
    });

    return Object.entries(sectionScores)
      .map(([section, { score, maxPossible }]) => ({
        section: parseInt(section),
        name: sectionNames[section as keyof typeof sectionNames],
        score,
        percentage: (score / maxPossible) * 100
      }))
      .sort((a, b) => b.percentage - a.percentage);
  };

  const getInterpretation = (score: number) => {
    if (score <= 28) return {
      level: "Stres Rendah",
      description: "Anda mengalami sedikit atau hampir tidak ada tekanan kerja.",
      color: "text-emerald-400",
      bgColor: "bg-emerald-900/20",
      borderColor: "border-emerald-400/50",
      icon: <Coffee className="w-6 h-6" />
    };
    if (score <= 40) return {
      level: "Stres Sedang",
      description: "Anda menghadapi beberapa tantangan, tetapi stres masih terkendali.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/20",
      borderColor: "border-yellow-400/50",
      icon: <Brain className="w-6 h-6" />
    };
    if (score <= 52) return {
      level: "Stres Tinggi",
      description: "Anda mengalami tingkat stres yang signifikan; evaluasi lingkungan kerja diperlukan. Bicarakan dengan atasan dan atau HR Anda",
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
      borderColor: "border-orange-400/50",
      icon: <BrainCircuit className="w-6 h-6" />
    };
    return {
      level: t.interpretation.veryHighStress.level,
      description: t.interpretation.veryHighStress.description,
      color: "text-red-400",
      bgColor: "bg-red-900/20",
      borderColor: "border-red-400/50",
      icon: <BrainCircuit className="w-6 h-6" />
    };
  };

  const score = calculateScore();
  const interpretation = getInterpretation(score);
  const progress = (Object.keys(answers).length / questions.length) * 100;
  const sectionScores = calculateSectionScores();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-slate-900 py-8 px-4 text-white/90">
      <div className="max-w-4xl mx-auto">
        <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 pointer-events-none" />
          
          <div className="relative flex items-center justify-between gap-6 mb-12 bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-6">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-4 rounded-2xl shadow-lg">
                <BrainCircuit className="w-10 h-10 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {t.appTitle}
                </h1>
                <p className="text-white/60 mt-2 text-lg">{t.appSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setLanguage('id')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                           ${language === 'id' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
              >
                ID
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                           ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
              >
                EN
              </button>
            </div>
          </div>
          
          <div className="mb-12 relative">
            <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-white/60 mt-3 text-center">
              {t.progressText(Object.keys(answers).length, questions.length)}
            </p>
          </div>

          <div className="space-y-8">
            {questions.map((question) => (
              <div key={question.id} 
                className="p-6 backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 shadow-lg 
                          hover:bg-white/10 transition-all duration-300 group">
                <p className="mb-6 font-medium text-lg flex items-start gap-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 
                                 text-white rounded-lg text-sm font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {question.id}
                  </span>
                  {question.text}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {t.answerOptions.map((option, index) => (
                    <label key={index} 
                      className={`relative flex items-center justify-center p-4 rounded-xl cursor-pointer
                                border border-white/10 bg-white/5
                                transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg
                                active:translate-y-0.5 active:shadow-inner active:bg-white/20
                                ${answers[question.id] === index + 1 ? 'bg-white/20 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : ''}
                                group/option`}>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={index + 1}
                        checked={answers[question.id] === index + 1}
                        onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
                        className="absolute opacity-0"
                      />
                      <div className="relative flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200
                                      ${answers[question.id] === index + 1 
                                        ? 'border-cyan-400 bg-cyan-400' 
                                        : 'border-white/30 group-hover/option:border-white/50'}`}>
                          {answers[question.id] === index + 1 && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <span className={`text-sm transition-all duration-200
                                       ${answers[question.id] === index + 1 
                                         ? 'text-white font-medium' 
                                         : 'text-white/70 group-hover/option:text-white'}`}>
                          {option}
                        </span>
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 to-blue-400/0 opacity-0 
                                    group-hover/option:opacity-10 transition-opacity duration-300" />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <button
              onClick={() => setShowResult(true)}
              disabled={Object.keys(answers).length < questions.length}
              className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl 
                         font-medium hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-600 
                         disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 
                         hover:-translate-y-1 active:translate-y-0.5
                         hover:shadow-lg disabled:shadow-none disabled:opacity-50 relative group">
              <span className="relative z-10">
                {Object.keys(answers).length < questions.length 
                  ? t.submitButton(questions.length - Object.keys(answers).length)
                  : t.viewResultsButton}
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 
                            group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </div>

          {showResult && (
            <div id="wsq-results" className="mt-12 p-8 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/20 
                          shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-xl ${interpretation.bgColor} ${interpretation.borderColor} 
                               border shadow-lg`}>
                  <div className={`${interpretation.color}`}>
                    {interpretation.icon}
                  </div>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 
                             bg-clip-text text-transparent">
                  {t.resultsTitle}
                </h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <p className="text-lg">{t.totalScore}</p>
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 
                                 bg-clip-text text-transparent">
                    {score}
                  </span>
                </div>
                <p className={`text-xl font-bold ${interpretation.color}`}>
                  {t.level} {interpretation.level}
                </p>
                <p className="text-white/80 leading-relaxed text-lg">
                  {interpretation.description}
                </p>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 
                                bg-clip-text text-transparent">
                    {t.sectionAnalysis}
                  </h3>
                  <div className="space-y-4">
                    {sectionScores.map((section, index) => (
                      <div key={section.section} className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium">
                            {section.name}
                          </p>
                          <span className="text-sm text-white/60">
                            {section.score} {t.points}
                          </span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{ width: `${section.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleExportPdf}
                  className="mt-8 w-full py-3 px-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl 
                             font-medium hover:from-green-400 hover:to-teal-400 transition-all duration-300 
                             hover:-translate-y-1 active:translate-y-0.5 hover:shadow-lg relative group"
                >
                  <span className="relative z-10">Export to PDF</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-teal-400 opacity-0 
                                group-hover:opacity-20 transition-opacity duration-300" />
                </button>
              </div>
            </div>
          )}
        </div>

        <footer className="text-center text-white/60 py-4">
          <p>{t.footerText}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;