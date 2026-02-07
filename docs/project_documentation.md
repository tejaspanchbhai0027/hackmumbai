# RASPP - Real-time Admission Success Prediction Platform

## 🎯 Hackathon Project Overview

**Competition Duration:** 30 hours  
**Development Window:** 10-16 hours  
**Project Type:** MVP (Minimum Viable Product)  
**Focus:** Solving a major real-world problem in educational admissions

---

## 📋 Table of Contents

1. [Problem Statement](#problem-statement)
2. [Solution Overview](#solution-overview)
3. [Core Value Proposition](#core-value-proposition)
4. [Target Audience](#target-audience)
5. [Technology Stack](#technology-stack)
6. [Data & Algorithm](#data--algorithm)
7. [MVP Feature Set](#mvp-feature-set)
8. [System Architecture](#system-architecture)
9. [Development Roadmap](#development-roadmap)
10. [Success Metrics](#success-metrics)
11. [Future Enhancements](#future-enhancements)
12. [Project Structure](#project-structure)
13. [Team Workflow](#team-workflow)

---

## 🎯 Problem Statement

### The Challenge

Every year, millions of students face uncertainty and anxiety during the college admission process. The traditional admission system presents several critical challenges:

**For Students:**
- **Information Asymmetry:** Students lack data-driven insights into their actual chances of admission
- **Application Inefficiency:** Students apply to colleges blindly, wasting time and money on applications with low success probability
- **Emotional Stress:** The uncertainty creates significant mental health pressure during an already stressful period
- **Resource Wastage:** Application fees, transcript costs, and time investment in applications that have minimal chance of success
- **Missed Opportunities:** Students may overlook colleges where they have strong admission chances

**For Institutions:**
- **Yield Rate Challenges:** Difficulty predicting which admitted students will actually enroll
- **Resource Allocation:** Inefficient allocation of admission review resources
- **Diversity Goals:** Challenges in achieving desired diversity metrics in incoming classes

**For Parents & Counselors:**
- **Guidance Limitations:** Lack of data-driven tools to provide accurate admission counseling
- **Financial Planning:** Uncertainty makes financial planning for education difficult

### The Impact

- **$500+ million** spent annually on college application fees in the US alone
- **70%** of students apply to colleges where they have less than 30% chance of admission
- **Average student** applies to 7-10 colleges, often without strategic planning
- **Mental Health Crisis:** 75% of students report high stress during admission season

---

## 💡 Solution Overview

### RASPP: Democratizing Admission Predictions

RASPP is an intelligent, data-driven platform that provides **real-time admission success predictions** using machine learning, specifically Multiple Linear Regression analysis. The platform empowers students to make informed decisions about their college applications.

### How It Works

1. **Data Input:** Students enter their academic profile (GPA, test scores, extracurriculars, demographics)
2. **Intelligent Analysis:** Our Multiple Linear Regression model analyzes the profile against historical admission data
3. **Instant Prediction:** Students receive a probability score (0-100%) for admission success
4. **Actionable Insights:** Platform provides personalized recommendations and gap analysis
5. **Strategic Planning:** Students can compare multiple colleges and optimize their application strategy

### Key Innovation

Unlike traditional college chance calculators that use simple rule-based systems, RASPP employs **machine learning** trained on real admission data (raspp.csv dataset) to provide:
- More accurate predictions
- Identification of success factors
- Personalized improvement recommendations
- Data-backed decision making

---

## 🎁 Core Value Proposition

### For Students

**Primary Benefits:**
1. **Reduce Uncertainty:** Know your real chances before applying
2. **Save Money:** Apply strategically to colleges where you have genuine chances
3. **Save Time:** Focus energy on applications that matter
4. **Reduce Stress:** Make decisions backed by data, not guesswork
5. **Optimize Strategy:** Create a balanced college list (reach, match, safety schools)

**Emotional Value:**
- Peace of mind through data-driven insights
- Confidence in application decisions
- Reduced anxiety about the unknown
- Empowerment through information

**Financial Value:**
- Save $300-500 on unnecessary application fees
- Better ROI on application investments
- Informed financial planning for college

### For Educational Institutions

1. **Better Applicant Pool:** Attract students who are genuinely good fits
2. **Improved Yield Rates:** Students apply when they have realistic chances
3. **Data Insights:** Understand what factors drive successful admissions

### For Parents & Counselors

1. **Evidence-Based Counseling:** Provide students with data-backed guidance
2. **Realistic Expectations:** Help families set appropriate expectations
3. **Strategic Planning:** Create more effective application strategies

---

## 👥 Target Audience

### Primary Users (MVP Focus)

**High School Students (Juniors & Seniors)**
- Age: 16-18 years
- Profile: College-bound students researching admission chances
- Pain Point: Uncertainty about where to apply
- Goal: Maximize admission success while minimizing wasted applications

### Secondary Users (Future Consideration)

1. **School Counselors:** Need tools to guide multiple students efficiently
2. **Parents:** Want to support children with informed decisions
3. **Transfer Students:** Community college students planning university transfers
4. **International Students:** Need additional guidance on US admission landscape

### Market Size

- **US Market:** 3.7 million high school graduates annually
- **Target Segment:** 2+ million college-bound students
- **Early Adopters:** Students from underserved communities lacking counseling resources

---

## 🛠 Technology Stack

### Frontend
- **Framework:** React 18+ with TypeScript
- **Styling:** Tailwind CSS (Centralized configuration)
- **State Management:** React Hooks (useState, useContext)
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **Form Handling:** React Hook Form
- **Data Visualization:** Recharts / Chart.js
- **UI Components:** Headless UI / Radix UI

### Backend
- **Framework:** FastAPI (Python)
- **API Design:** RESTful architecture
- **Validation:** Pydantic models
- **ML Library:** scikit-learn (Multiple Linear Regression)
- **Data Processing:** pandas, numpy
- **Authentication:** JWT tokens (if time permits)
- **CORS:** FastAPI CORS middleware

### Database
- **Primary DB:** MySQL 8.0+
- **ORM:** SQLAlchemy
- **Migrations:** Alembic
- **Connection Pool:** MySQL Connector Python

### Machine Learning
- **Algorithm:** Multiple Linear Regression
- **Training Data:** raspp.csv (available in docs folder)
- **Features:** Academic metrics, demographics, extracurriculars
- **Output:** Probability score (0-100%)
- **Model Persistence:** Pickle/Joblib

### Development Tools
- **Version Control:** Git
- **Package Management:** npm (frontend), pip (backend)
- **Code Quality:** ESLint, Prettier, Black
- **API Testing:** Postman / Thunder Client
- **Development Server:** Vite (frontend), Uvicorn (backend)

### Deployment (If Time Permits)
- **Frontend:** Vercel / Netlify
- **Backend:** Railway / Render
- **Database:** PlanetScale / Railway MySQL

---

## 📊 Data & Algorithm

### Dataset: raspp.csv

**Location:** `/docs/raspp.csv`

**Expected Data Structure:**

The dataset contains historical admission records with the following types of features:

**Academic Features:**
- GPA (Grade Point Average)
- Standardized test scores (SAT/ACT)
- Class rank percentile
- Academic rigor (AP/IB courses taken)
- Subject-specific grades

**Demographic Features:**
- Geographic location
- High school type (public/private)
- First-generation status
- Socioeconomic indicators

**Extracurricular Features:**
- Leadership positions
- Sports participation
- Volunteer hours
- Awards and honors
- Research/internship experience

**Target Variable:**
- Admission Decision (Admitted: 1, Rejected: 0)

### Machine Learning Algorithm: Multiple Linear Regression

**Why Multiple Linear Regression?**

1. **Interpretability:** Easy to understand which factors influence admission
2. **Speed:** Fast training and prediction (crucial for real-time use)
3. **Transparency:** Students can see how each factor contributes
4. **Proven Method:** Widely used in educational research
5. **MVP Friendly:** Simple to implement within time constraints

**Model Workflow:**

```
1. Data Preprocessing
   ↓
2. Feature Selection & Engineering
   ↓
3. Train-Test Split (80-20)
   ↓
4. Model Training (Multiple Linear Regression)
   ↓
5. Model Evaluation (R², RMSE, MAE)
   ↓
6. Model Serialization (Save for production)
   ↓
7. Real-time Prediction API
```

**Prediction Formula:**

```
Admission_Probability = β₀ + β₁(GPA) + β₂(SAT) + β₃(Extracurriculars) + ... + βₙ(Feature_n)
```

**Model Metrics (Target for MVP):**
- **R² Score:** > 0.70 (Acceptable for MVP)
- **Mean Absolute Error:** < 15% (Prediction accuracy)
- **Prediction Range:** 0-100% probability

**Feature Importance:**

The model will identify which features most strongly predict admission success, allowing students to focus improvement efforts strategically.

---

## ⚡ MVP Feature Set

### Priority 1: Core Features (Must-Have - 60% of development time)

**1. Student Profile Input Form**
- Clean, intuitive multi-step form
- Input fields for all relevant features
- Basic validation and error handling
- Progress indicator

**2. Prediction Engine**
- Load pre-trained ML model
- Process student data
- Return probability score (0-100%)
- Display confidence interval

**3. Results Dashboard**
- Clear visualization of admission probability
- Gauge/meter showing success likelihood
- Basic interpretation of results
- Color-coded feedback (High/Medium/Low chance)

**4. Basic Data Visualization**
- Simple chart showing student's position relative to admitted profiles
- Bar chart of feature importance
- Comparison to average admitted student

### Priority 2: Enhanced Features (Should-Have - 30% of development time)

**5. Multiple College Comparison**
- Input data once, check multiple colleges
- Side-by-side comparison view
- Save college list

**6. Improvement Recommendations**
- Identify weak areas in profile
- Suggest specific improvements
- Show impact of improvements on probability

**7. Historical Data Insights**
- Display admission trends
- Show acceptance rate statistics
- Provide context for prediction

### Priority 3: Nice-to-Have (If Time Permits - 10% of development time)

**8. User Authentication**
- Simple signup/login
- Save profile and history
- Track multiple predictions

**9. Export/Share Results**
- Download PDF report
- Share prediction with counselors
- Email results

### Out of Scope for MVP

- Payment/Premium features
- Social features/community
- Detailed college information database
- Essay analysis
- Recommendation letter guidance
- Scholarship predictions
- Mobile app (web-responsive is sufficient)

---

## 🏗 System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                        │
│                   (React + TypeScript + Tailwind)           │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTPS/REST API
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      API GATEWAY LAYER                       │
│                        (FastAPI)                             │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐ │
│  │  Auth Routes   │  │ Prediction API │  │  Data Routes │ │
│  └────────────────┘  └────────────────┘  └──────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼────────┐ ┌──────▼──────┐  ┌────────▼────────┐
│  Business Logic│ │  ML Engine  │  │  Data Layer     │
│  Layer         │ │  (sklearn)  │  │  (SQLAlchemy)   │
│                │ │             │  │                 │
│ - Validation   │ │ - Model     │  │ - ORM Models    │
│ - Processing   │ │   Loading   │  │ - Queries       │
│ - Analytics    │ │ - Prediction│  │ - Transactions  │
└────────────────┘ └─────────────┘  └────────┬────────┘
                                              │
                                    ┌─────────▼─────────┐
                                    │   MySQL Database  │
                                    │                   │
                                    │ - Users           │
                                    │ - Predictions     │
                                    │ - Colleges        │
                                    │ - Historical Data │
                                    └───────────────────┘
```

### Component Breakdown

**Frontend Components:**
- Landing/Home Page
- Student Profile Form (Multi-step)
- Prediction Results Dashboard
- College Comparison View
- Data Visualization Components
- Shared UI Components (Buttons, Inputs, Cards)

**Backend Endpoints:**
- `POST /api/predict` - Get admission prediction
- `GET /api/colleges` - List available colleges
- `POST /api/save-prediction` - Save prediction to database
- `GET /api/history/{user_id}` - Get prediction history
- `GET /api/model-info` - Get model metadata

**Database Tables:**
- `users` - User accounts (if auth implemented)
- `predictions` - Saved prediction records
- `colleges` - College information
- `admission_data` - Historical admission data (from raspp.csv)

---

## 🗺 Development Roadmap

### Phase 1: Foundation (Hours 0-3)

**Setup & Configuration (1 hour)**
- [ ] Initialize Git repository
- [ ] Set up React + TypeScript + Tailwind frontend
- [ ] Set up FastAPI backend structure
- [ ] Configure MySQL database connection
- [ ] Create basic folder structure
- [ ] Install all dependencies

**Data Preparation (1 hour)**
- [ ] Load and analyze raspp.csv
- [ ] Clean and preprocess data
- [ ] Identify features and target variable
- [ ] Create data dictionary documentation
- [ ] Export cleaned data to MySQL

**Model Development (1 hour)**
- [ ] Split data (train/test)
- [ ] Train Multiple Linear Regression model
- [ ] Evaluate model performance
- [ ] Serialize model for production
- [ ] Create model loading utility

### Phase 2: Backend Development (Hours 3-6)

**Database Schema (30 minutes)**
- [ ] Design database schema
- [ ] Create SQLAlchemy models
- [ ] Set up Alembic migrations
- [ ] Populate initial data

**API Development (2 hours)**
- [ ] Create prediction endpoint
- [ ] Implement input validation (Pydantic)
- [ ] Add error handling
- [ ] Test API with sample data
- [ ] Document API with OpenAPI/Swagger

**ML Integration (30 minutes)**
- [ ] Load serialized model
- [ ] Create prediction service
- [ ] Add preprocessing pipeline
- [ ] Return formatted predictions

### Phase 3: Frontend Development (Hours 6-11)

**UI Foundation (1.5 hours)**
- [ ] Set up Tailwind configuration
- [ ] Create design system (colors, typography)
- [ ] Build reusable components
- [ ] Set up routing
- [ ] Create layout structure

**Student Form (2 hours)**
- [ ] Multi-step form component
- [ ] Form validation
- [ ] State management
- [ ] Progress indicator
- [ ] Submit functionality

**Results Dashboard (1.5 hours)**
- [ ] Prediction display component
- [ ] Probability visualization (gauge/meter)
- [ ] Results interpretation
- [ ] Feature importance chart
- [ ] Responsive design

### Phase 4: Integration & Testing (Hours 11-13)

**Integration (1 hour)**
- [ ] Connect frontend to backend API
- [ ] Handle API responses
- [ ] Error handling and user feedback
- [ ] Loading states

**Testing (1 hour)**
- [ ] End-to-end user flow testing
- [ ] Cross-browser testing
- [ ] Mobile responsiveness check
- [ ] Fix critical bugs

### Phase 5: Polish & Documentation (Hours 13-15)

**UI/UX Polish (1 hour)**
- [ ] Improve animations and transitions
- [ ] Enhance visual design
- [ ] Add helpful tooltips
- [ ] Improve error messages

**Documentation (1 hour)**
- [ ] Update README with setup instructions
- [ ] Document API endpoints
- [ ] Create user guide
- [ ] Add code comments
- [ ] Prepare demo script

### Phase 6: Deployment & Presentation (Hours 15-16)

**Deployment (30 minutes)**
- [ ] Deploy backend to cloud platform
- [ ] Deploy frontend to hosting service
- [ ] Configure environment variables
- [ ] Test production deployment

**Presentation Prep (30 minutes)**
- [ ] Create demo video/screenshots
- [ ] Prepare pitch deck
- [ ] Test live demo
- [ ] Prepare Q&A responses

---

## 📈 Success Metrics

### Hackathon Judging Criteria Alignment

**1. Problem Solving (30%)**
- Clear identification of major real-world problem
- Quantified impact (application fees, student stress)
- Evidence of research and understanding

**2. Innovation (25%)**
- Use of machine learning for predictions
- Data-driven approach vs. traditional methods
- Unique value proposition

**3. Implementation (25%)**
- Working MVP within time constraints
- Clean, professional code
- Functional end-to-end system
- Good user experience

**4. Impact Potential (20%)**
- Clear target audience
- Scalability of solution
- Market opportunity
- Social good component

### MVP Success Criteria

**Functional Requirements:**
- [ ] User can input complete student profile
- [ ] System returns admission probability within 2 seconds
- [ ] Prediction accuracy > 70% (based on test set)
- [ ] Responsive design works on desktop and mobile
- [ ] Zero critical bugs during demo

**User Experience Goals:**
- [ ] Form completion time < 3 minutes
- [ ] Results are easy to understand
- [ ] UI is professional and polished
- [ ] Error messages are helpful

**Technical Goals:**
- [ ] API response time < 500ms
- [ ] Model inference time < 100ms
- [ ] Frontend loads in < 2 seconds
- [ ] Clean, documented code

---

## 🚀 Future Enhancements

### Post-Hackathon Roadmap

**Version 1.1 (Next Sprint)**
- User authentication and profiles
- Save multiple predictions
- Email notifications
- PDF report generation
- Extended college database

**Version 1.2 (Month 2)**
- Advanced ML models (Ensemble methods, Neural Networks)
- Personalized improvement plans
- Essay review assistance
- Financial aid predictions
- Scholarship matching

**Version 2.0 (Quarter 2)**
- Mobile app (React Native)
- Counselor dashboard
- School integration
- Analytics and reporting
- Premium features

**Long-term Vision**
- Integration with Common App
- Partnership with schools and colleges
- International expansion
- Career outcome predictions
- Holistic student success platform

---

## 📁 Project Structure

```
raspp/
│
├── frontend/                          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── common/              # Buttons, Inputs, Cards, etc.
│   │   │   ├── forms/               # Student profile form components
│   │   │   ├── dashboard/           # Results dashboard components
│   │   │   └── visualizations/      # Charts and graphs
│   │   ├── pages/                   # Route pages
│   │   │   ├── Home.tsx
│   │   │   ├── Prediction.tsx
│   │   │   ├── Results.tsx
│   │   │   └── Comparison.tsx
│   │   ├── services/                # API service layer
│   │   │   └── api.ts
│   │   ├── types/                   # TypeScript interfaces
│   │   ├── utils/                   # Helper functions
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── context/                 # React Context providers
│   │   ├── assets/                  # Images, icons, etc.
│   │   ├── styles/                  # Global styles
│   │   │   └── tailwind.config.js  # Centralized Tailwind config
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md
│
├── backend/                           # FastAPI backend
│   ├── app/
│   │   ├── main.py                  # FastAPI application entry
│   │   ├── config.py                # Configuration management
│   │   ├── database.py              # Database connection
│   │   ├── models/                  # SQLAlchemy models
│   │   │   ├── user.py
│   │   │   ├── prediction.py
│   │   │   └── college.py
│   │   ├── schemas/                 # Pydantic schemas
│   │   │   ├── student.py
│   │   │   └── prediction.py
│   │   ├── routers/                 # API route handlers
│   │   │   ├── predict.py
│   │   │   ├── colleges.py
│   │   │   └── users.py
│   │   ├── services/                # Business logic
│   │   │   ├── ml_service.py       # ML model loading and prediction
│   │   │   └── data_service.py
│   │   ├── ml/                      # Machine learning components
│   │   │   ├── train_model.py      # Model training script
│   │   │   ├── model.pkl           # Serialized model
│   │   │   └── preprocessor.py     # Data preprocessing
│   │   └── utils/                   # Utility functions
│   ├── alembic/                     # Database migrations
│   ├── tests/                       # Unit and integration tests
│   ├── requirements.txt
│   └── README.md
│
├── docs/                             # Documentation
│   ├── README.md                    # This file - Main project documentation
│   ├── raspp.csv                    # Training dataset (AVAILABLE)
│   ├── API_DOCUMENTATION.md         # API endpoints documentation
│   ├── DATABASE_SCHEMA.md           # Database design
│   ├── DEPLOYMENT.md                # Deployment guide
│   ├── USER_GUIDE.md                # End-user documentation
│   └── DEVELOPMENT.md               # Developer setup guide
│
├── .gitignore
├── README.md                         # Root project overview
└── LICENSE
```

---

## 👥 Team Workflow

### Hackathon Best Practices

**Time Management:**
- **Hours 0-3:** Foundation (everyone together)
- **Hours 3-11:** Parallel development (frontend/backend split)
- **Hours 11-13:** Integration (everyone together)
- **Hours 13-16:** Polish and prep (divided tasks)

**Communication:**
- Quick 15-minute sync every 2 hours
- Use Git branches for features
- Frequent commits and pushes
- Document blockers immediately

**Division of Labor:**

**Developer 1 (Frontend Focus):**
- React components and UI
- Tailwind styling
- State management
- API integration

**Developer 2 (Backend + ML Focus):**
- FastAPI setup
- Database design
- ML model training
- API endpoints

**Shared Responsibilities:**
- Testing and debugging
- Documentation
- Deployment
- Presentation preparation

### Git Workflow

```bash
# Branch naming
feature/student-form
feature/prediction-api
fix/validation-bug

# Commit messages
feat: Add multi-step student profile form
fix: Correct GPA validation logic
docs: Update API documentation
style: Improve dashboard responsive design
```

---

## 🎓 Learning Resources

### Key Documentation Links

**React + TypeScript:**
- React Docs: https://react.dev
- TypeScript Handbook: https://www.typescriptlang.org/docs/

**Tailwind CSS:**
- Tailwind Docs: https://tailwindcss.com/docs

**FastAPI:**
- FastAPI Docs: https://fastapi.tiangolo.com

**Machine Learning:**
- scikit-learn: https://scikit-learn.org/stable/
- Linear Regression: https://scikit-learn.org/stable/modules/linear_model.html

**MySQL + SQLAlchemy:**
- SQLAlchemy Docs: https://docs.sqlalchemy.org

---

## 🏆 Competitive Advantages

### Why RASPP Wins the Hackathon

**1. Real Problem, Real Impact**
- Addresses genuine pain point affecting millions
- Quantifiable benefits (save money, reduce stress)
- Social good component (democratizing access to information)

**2. Technical Excellence**
- Modern, professional tech stack
- Machine learning implementation
- Clean architecture
- Scalable design

**3. Complete Solution**
- End-to-end working system
- Professional UI/UX
- Clear value proposition
- Documented codebase

**4. Market Potential**
- Large addressable market (millions of students)
- Clear monetization paths
- Scalability to other markets (international, graduate admissions)
- Partnership opportunities with schools

**5. Demo-Friendly**
- Immediate visual impact
- Easy to understand
- Fast and responsive
- Compelling narrative

---

## 📝 Final Notes

### Critical Success Factors

1. **Stay Focused on MVP:** Resist feature creep
2. **Test Early and Often:** Don't wait until the end
3. **Prioritize User Experience:** Make it intuitive and beautiful
4. **Document as You Go:** Don't save docs for the end
5. **Practice Your Demo:** Presentation matters as much as code

### Pre-Development Checklist

- [ ] Read this entire README thoroughly
- [ ] Understand the problem and solution
- [ ] Familiarize yourself with raspp.csv data structure
- [ ] Set up development environment
- [ ] Assign roles and responsibilities
- [ ] Create a detailed time-blocked schedule
- [ ] Set up communication channels
- [ ] Prepare development tools (IDE, Postman, Git)

### Emergency Pivots

If running behind schedule, prioritize in this order:
1. Core prediction functionality (must work)
2. Basic input form (can be single-page instead of multi-step)
3. Simple results display (can skip fancy visualizations)
4. Database persistence (can store in-memory for demo)

---

## 🎯 The Vision

**RASPP isn't just a hackathon project—it's the beginning of a platform that could transform how students navigate the college admission process.**

By combining data science, modern web technologies, and a deep understanding of student needs, we're building something that matters. In 10-16 hours, we'll create an MVP that proves the concept. Beyond the hackathon, this could grow into a service that helps millions of students make better, more informed decisions about their educational future.

**Let's build something amazing. Let's build RASPP.**

---

## 📞 Questions or Issues?

During development, document any questions or blockers in:
- `docs/QUESTIONS.md` - Technical questions
- `docs/BLOCKERS.md` - Current blockers and solutions
- `docs/DECISIONS.md` - Key architectural decisions

---

**Version:** 1.0.0  
**Last Updated:** February 7, 2026  
**Status:** Ready for Development  
**Dataset Status:** ✅ raspp.csv available in docs folder  
**Algorithm:** Multiple Linear Regression (scikit-learn)

---

**Good luck, and happy hacking! 🚀**
