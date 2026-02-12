interface Translation {
  appTitle: string;
  appSubtitle: string;
  progressText: (answered: number, total: number) => string;
  answerOptions: string[];
  submitButton: (remaining: number) => string;
  viewResultsButton: string;
  resultsTitle: string;
  totalScore: string;
  level: string;
  sectionAnalysis: string;
  points: string;
  footerText: string;
  interpretation: {
    lowStress: {
      level: string;
      description: string;
    };
    moderateStress: {
      level: string;
      description: string;
    };
    highStress: {
      level: string;
      description: string;
    };
    veryHighStress: {
      level: string;
      description: string;
    };
  };
  sectionNames: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
  };
  questions: {
    id: number;
    text: string;
    isReversed: boolean;
    section: number;
  }[];
}

export const translations: { [key: string]: Translation } = {
  id: {
    appTitle: "Work Stress Questionnaire (WSQ)",
    appSubtitle: "Evaluasi tingkat stres kerja Anda",
    progressText: (answered, total) => `${answered} dari ${total} pertanyaan dijawab`,
    answerOptions: ['Sangat Tidak Setuju', 'Tidak Setuju', 'Setuju', 'Sangat Setuju'],
    submitButton: (remaining) => `Jawab ${remaining} pertanyaan lagi`,
    viewResultsButton: "Lihat Hasil",
    resultsTitle: "Hasil Penilaian",
    totalScore: "Skor Total:",
    level: "Level:",
    sectionAnalysis: "Analisis per Bagian",
    points: "poin",
    footerText: "veldyva",
    interpretation: {
      lowStress: {
        level: "Stres Rendah",
        description: "Anda mengalami sedikit atau hampir tidak ada tekanan kerja.",
      },
      moderateStress: {
        level: "Stres Sedang",
        description: "Anda menghadapi beberapa tantangan, tetapi stres masih terkendali.",
      },
      highStress: {
        level: "Stres Tinggi",
        description: "Anda mengalami tingkat stres yang signifikan; evaluasi lingkungan kerja diperlukan. Bicarakan dengan atasan dan atau HR Anda",
      },
      veryHighStress: {
        level: "Stres Sangat Tinggi",
        description: "Stres sangat tinggi dan mungkin berpengaruh negatif pada kesejahteraan fisik maupun mental Anda. Segera cari bantuan atau solusi atau dapat chat dengan Afiya untuk bantuan awal",
      },
    },
    sectionNames: {
      1: "Beban Kerja",
      2: "Hubungan Sosial di Tempat Kerja",
      3: "Struktur dan Peran Pekerjaan",
      4: "Tekanan Waktu",
      5: "Dampak Stres",
      6: "Keseimbangan Kerja dan Kehidupan"
    },
    questions: [
      { id: 1, text: "Saya merasa beban kerja saya terlalu berat.", isReversed: false, section: 1 },
      { id: 2, text: "Saya sering harus menyelesaikan banyak tugas dalam waktu yang singkat.", isReversed: false, section: 1 },
      { id: 3, text: "Saya memiliki waktu yang cukup untuk menyelesaikan pekerjaan saya dengan baik.", isReversed: true, section: 1 },
      { id: 4, text: "Saya memiliki hubungan kerja yang baik dengan rekan kerja saya.", isReversed: true, section: 2 },
      { id: 5, text: "Saya merasa didukung oleh atasan saya dalam menyelesaikan pekerjaan.", isReversed: true, section: 2 },
      { id: 6, text: "Konflik interpersonal sering terjadi di lingkungan kerja saya.", isReversed: false, section: 2 },
      { id: 7, text: "Tugas dan tanggung jawab saya di tempat kerja sudah jelas.", isReversed: true, section: 3 },
      { id: 8, text: "Saya merasa pekerjaan saya sesuai dengan kemampuan saya.", isReversed: true, section: 3 },
      { id: 9, text: "Saya merasa memiliki cukup kendali atas keputusan dalam pekerjaan saya.", isReversed: true, section: 3 },
      { id: 10, text: "Tenggat waktu pekerjaan saya sering terlalu ketat.", isReversed: false, section: 4 },
      { id: 11, text: "Saya sering harus bekerja lembur untuk menyelesaikan pekerjaan.", isReversed: false, section: 4 },
      { id: 12, text: "Saya merasa sulit berkonsentrasi pada pekerjaan saya.", isReversed: false, section: 5 },
      { id: 13, text: "Saya sering merasa lelah secara fisik setelah bekerja.", isReversed: false, section: 5 },
      { id: 14, text: "Saya merasa sulit tidur karena memikirkan pekerjaan.", isReversed: false, section: 5 },
      { id: 15, text: "Saya sering merasa cemas tentang pekerjaan saya.", isReversed: false, section: 6 },
      { id: 16, text: "Saya merasa kehilangan motivasi dalam bekerja.", isReversed: false, section: 6 },
    ],
  },
  en: {
    appTitle: "Work Stress Questionnaire (WSQ)",
    appSubtitle: "Evaluate your work stress level",
    progressText: (answered, total) => `${answered} of ${total} questions answered`,
    answerOptions: ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'],
    submitButton: (remaining) => `Answer ${remaining} more questions`,
    viewResultsButton: "View Results",
    resultsTitle: "Assessment Results",
    totalScore: "Total Score:",
    level: "Level:",
    sectionAnalysis: "Section Analysis",
    points: "points",
    footerText: "veldyva",
    interpretation: {
      lowStress: {
        level: "Low Stress",
        description: "You experience little to no work pressure.",
      },
      moderateStress: {
        level: "Moderate Stress",
        description: "You face some challenges, but stress is still manageable.",
      },
      highStress: {
        level: "High Stress",
        description: "You are experiencing significant stress; a workplace evaluation is needed. Talk to your supervisor and/or HR.",
      },
      veryHighStress: {
        level: "Very High Stress",
        description: "Stress is very high and may negatively affect your physical and mental well-being. Seek immediate help or solutions, or chat with Afiya for initial assistance.",
      },
    },
    sectionNames: {
      1: "Workload",
      2: "Social Relationships at Work",
      3: "Job Structure and Role",
      4: "Time Pressure",
      5: "Impact of Stress",
      6: "Work-Life Balance"
    },
    questions: [
      { id: 1, text: "I feel my workload is too heavy.", isReversed: false, section: 1 },
      { id: 2, text: "I often have to complete many tasks in a short amount of time.", isReversed: false, section: 1 },
      { id: 3, text: "I have enough time to complete my work well.", isReversed: true, section: 1 },
      { id: 4, text: "I have good working relationships with my colleagues.", isReversed: true, section: 2 },
      { id: 5, text: "I feel supported by my supervisor in completing my work.", isReversed: true, section: 2 },
      { id: 6, text: "Interpersonal conflicts often occur in my work environment.", isReversed: false, section: 2 },
      { id: 7, text: "My tasks and responsibilities at work are clear.", isReversed: true, section: 3 },
      { id: 8, text: "I feel my work matches my abilities.", isReversed: true, section: 3 },
      { id: 9, text: "I feel I have enough control over decisions in my work.", isReversed: true, section: 3 },
      { id: 10, text: "My work deadlines are often too tight.", isReversed: false, section: 4 },
      { id: 11, text: "I often have to work overtime to complete my tasks.", isReversed: false, section: 4 },
      { id: 12, text: "I find it difficult to concentrate on my work.", isReversed: false, section: 5 },
      { id: 13, text: "I often feel physically tired after work.", isReversed: false, section: 5 },
      { id: 14, text: "I find it difficult to sleep because I'm thinking about work.", isReversed: false, section: 5 },
      { id: 15, text: "I often feel anxious about my work.", isReversed: false, section: 6 },
      { id: 16, text: "I feel a loss of motivation at work.", isReversed: false, section: 6 },
    ],
  },
};
