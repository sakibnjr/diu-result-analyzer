# DIU Result Analyzer - Free CGPA Calculator for Daffodil International University

🎓 **Free online CGPA and SGPA calculator for DIU students** with academic performance analysis and transcript generation.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://diu-result-analyzer.vercel.app)
[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black)](https://nextjs.org/)
[![Bug Fixed](https://img.shields.io/badge/Bug%20Fixed-Retake%20Handling-success)](https://github.com/sakibnjr/diu-result-analyzer)

## 🔥 Features

### 📊 **CGPA & SGPA Calculation**

- ✅ **Automatic DIU CGPA calculation** with enhanced retaken course handling
- ✅ **Semester-wise SGPA calculation** for each term
- ✅ **Real-time grade analysis** with visual charts
- ✅ **Accurate GPA computation** following DIU standards
- 🆕 **Fixed retaken course filtering** - only shows improved grades in search results

### 📈 **Academic Performance Tracking**

- 📊 **Interactive performance charts** showing semester trends
- 📋 **Detailed course breakdown** with grades and credits
- 🎯 **Academic summary dashboard** with key metrics
- 📱 **Mobile-responsive design** for all devices
- 🔍 **Smart course filtering** that properly handles retaken courses

### 📄 **Transcript Generation**

- 🖨️ **Professional PDF transcripts** ready for printing
- 📝 **Complete academic records** with all semesters
- 🔒 **Secure data handling** - no server storage
- ⚡ **Instant download** capability

### 🆕 **Recent Improvements**

- 🐛 **Fixed retaken course bug** - Search and filter results now correctly show only the highest grade for retaken courses
- ⚡ **Improved filtering accuracy** - Duplicate course removal happens before filtering for more reliable results
- 🎯 **Enhanced academic integrity** - Filter results now reflect true academic standing

## 🚀 Quick Start

### For DIU Students:

1. **Visit**: [diu-result-analyzer.vercel.app](https://diu-result-analyzer.vercel.app)
2. **Login**: Use your DIU student portal credentials
3. **View**: Your calculated CGPA, SGPA, and academic performance
4. **Filter**: Search courses with confidence - retaken courses show only improved grades
5. **Download**: Professional transcript in PDF format

### For Developers:

```bash
# Clone the repository
git clone https://github.com/sakibnjr/diu-result-analyzer.git

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📱 Screenshots

| Feature              | Preview                              |
| -------------------- | ------------------------------------ |
| **CGPA Dashboard**   | Modern academic performance overview |
| **Semester Results** | Detailed course-wise breakdown       |
| **Course Filtering** | Smart search with retake handling    |
| **PDF Transcript**   | Professional downloadable format     |

## 🎯 Keywords & Search Terms

**Primary Keywords:**

- DIU CGPA calculator
- DIU SGPA calculator
- Daffodil International University result
- DIU grade calculator
- DIU result analyzer

**Secondary Keywords:**

- Bangladesh university CGPA calculator
- DIU student portal alternative
- DIU academic dashboard
- Daffodil University result checker
- DIU result viewer
- DIU retake course calculator

## 🔧 Technical Features

### **Frontend**

- ⚡ **Next.js 15.3.3** with App Router
- 🎨 **Tailwind CSS** for responsive design
- 📊 **Recharts** for data visualization
- 📱 **Mobile-first** responsive design
- 🔍 **Advanced filtering system** with retake handling

### **Backend**

- 🔐 **Secure authentication** with DIU portal
- 📊 **Real-time data fetching** from DIU APIs
- 🔒 **No data storage** - privacy focused
- ⚡ **Fast performance** with optimized queries
- 🐛 **Bug-free retake handling** in filter operations

### **SEO Optimized**

- 🔍 **Comprehensive meta tags** for search engines
- 📋 **Structured data markup** (JSON-LD)
- 🗺️ **XML sitemap** for better indexing
- 🤖 **Robots.txt** optimization

## 📊 DIU CGPA Calculation Method

Our calculator follows the **official DIU grading system**:

### Grade Points Scale:

- **A+**: 4.00 points
- **A**: 3.75 points
- **A-**: 3.50 points
- **B+**: 3.25 points
- **B**: 3.00 points
- **B-**: 2.75 points
- **C+**: 2.50 points
- **C**: 2.25 points
- **D**: 2.00 points
- **F**: 0.00 points

### **Enhanced Retaken Course Handling:**

- ✅ **Automatically detects duplicate courses** across all semesters
- ✅ **Uses highest grade for CGPA calculation** and filtering
- ✅ **Counts each unique course only once** in calculations
- ✅ **Accurate credit hour calculation** without duplicates
- 🆕 **Fixed filter bug** - Search results now properly exclude lower grades from retaken courses
- 🆕 **Improved data integrity** - Filter operations maintain academic accuracy

### **How Retake Handling Works:**

1. **Course Detection**: System identifies courses with same title across semesters
2. **Grade Comparison**: Automatically compares point equivalents for duplicate courses
3. **Best Grade Selection**: Keeps only the highest grade achievement
4. **Filter Application**: All search and filter operations work on deduplicated data
5. **Result Display**: Students see only their best performance for each course

## 🎓 For DIU Students

### **Why Use DIU Result Analyzer?**

1. **🔐 Secure & Private**: No data stored on our servers
2. **⚡ Fast & Accurate**: Instant CGPA calculation with official DIU standards
3. **📱 Always Accessible**: Works on any device, anywhere
4. **🆓 Completely Free**: No hidden charges or subscriptions
5. **📊 Visual Analytics**: Better understand your academic progress
6. **🎯 Reliable Filtering**: Accurate course search with proper retake handling

### **Compatible with:**

- All DIU undergraduate programs
- All semester results from DIU student portal
- Both old and new DIU grading systems
- Retaken courses and improvement exams
- Complex academic scenarios with multiple course attempts

## 🏗️ Project Structure

```
diu-result-analyzer/
├── app/
│   ├── components/         # React components
│   │   ├── filters/       # Advanced filtering system
│   │   └── ResultFilter.js # Main filter component
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   │   └── helpers.js     # Retake handling logic
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── public/                # Static assets
└── README.md             # Project documentation
```

## 🐛 Recent Bug Fixes

### **Retaken Course Filter Bug (Fixed)**

**Issue**: When students retook courses and improved their grades, the filter system was showing both the old (lower) and new (higher) grade results.

**Solution**:

- Restructured filter logic to remove duplicate courses **before** applying filters
- Ensured `getUniqueCoursesWithHighestGrades()` runs first in the filter pipeline
- Now filter results only show the best grade for each course

**Impact**:

- More accurate search results
- Better academic integrity in displayed data
- Improved user experience for students with retaken courses

## 🤝 Contributing

We welcome contributions from the DIU community!

### **Ways to Contribute:**

- 🐛 Report bugs or issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit code improvements
- 🧪 Help test retake handling scenarios

### **Development Setup:**

```bash
# Fork the repository
# Clone your fork
git clone https://github.com/sakibnjr/diu-result-analyzer.git

# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git commit -m "Add your feature"

# Push and create pull request
git push origin feature/your-feature-name
```

## 📞 Support & Contact

- 🌐 **Website**: [diu-result-analyzer.vercel.app](https://diu-result-analyzer.vercel.app)
- 💻 **GitHub**: [github.com/sakibnjr/diu-result-analyzer](https://github.com/sakibnjr/diu-result-analyzer)
- 📧 **Developer**: SakibNjr
- 🐛 **Issues**: [GitHub Issues](https://github.com/sakibnjr/diu-result-analyzer/issues)

## 🙏 Acknowledgments

- **Daffodil International University** for providing the academic data APIs
- **DIU Students** for feedback and feature suggestions that led to bug fixes
- **Open Source Community** for the amazing tools and libraries

---

**Made with ❤️ for DIU students by [SakibNjr](https://github.com/sakibnjr)**

### 🔍 **Search Tags:**

`diu cgpa calculator` `diu sgpa calculator` `daffodil international university` `diu result analyzer` `bangladesh university cgpa` `diu grade calculator` `diu student portal` `academic performance tracker` `diu result checker` `cgpa calculator bangladesh` `diu retake course` `diu improved grade calculator`
