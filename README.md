# Code Quality Analysis Tool

A **professional JavaScript code quality analysis platform** with web interface, ESLint integration, and GitHub Actions CI/CD support.

## 🌟 Features

### Core Features
- ✅ **Web Interface** - Paste or upload JavaScript code for instant analysis
- ✅ **ESLint Integration** - Industry-standard code quality checks
- ✅ **Real-time Analysis** - Instant error and warning detection
- ✅ **Dark Mode** - Eye-friendly interface option
- ✅ **Export Results** - Save analysis as JSON or CSV
- ✅ **File Upload** - Analyze JavaScript files directly
- ✅ **Analysis History** - Track previous analyses with localStorage
- ✅ **Analytics Dashboard** - View metrics and statistics
- ✅ **Mobile Responsive** - Works on desktop and mobile devices

### Development Features
- ✅ **GitHub Actions Ready** - CI/CD pipeline support
- ✅ **Automated Linting** - Runs on push and pull requests
- ✅ **Command Line Tools** - ESLint CLI integration
- ✅ **Professional Build** - Production-ready setup

## 📦 Installation

### 1. Prerequisites
- **Node.js** 14+ installed
- **npm** or **yarn** package manager

### 2. Install Dependencies
```bash
npm install
```

This installs:
- `eslint` - JavaScript linter
- `@eslint/js` - ESLint configuration
- `globals` - Global variables support

## 🚀 Quick Start

### Start the Web Server
```bash
npm start
```

The server will start on `http://localhost:3000`

### Open in Browser
Navigate to `http://localhost:3000` and you'll see:
- **📝 Code Input Area** - "Copy or Paste Your Code Here for Analysis"
- **📊 Results Panel** - Real-time analysis results
- **📈 Dashboard** - Analytics and metrics
- **📜 History** - Previous analyses

## 🎯 How to Use

### 1. Paste Code
```javascript
// Example problematic code
var x = 5
console.log(x)
```

### 2. Click "Analyze Code" Button
The system will:
- Run ESLint on your code
- Detect errors and warnings
- Display results with line numbers
- Suggest fixes

### 3. View Results
See:
- ✅ **Errors** (severity 2) - Must fix
- ⚠️ **Warnings** (severity 1) - Consider fixing
- 🎯 **Pass/Fail Status**

### 4. Export Results
Click:
- **📥 Export JSON** - Machine-readable format
- **📋 Export CSV** - Spreadsheet format

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start web server on port 3000 |
| `npm run lint` | Run ESLint on all files |
| `npm run lint:fix` | Automatically fix ESLint issues |
| `npm test` | Run tests |

## 📋 API Endpoint

### POST /analyze
Analyzes JavaScript code via HTTP request.

**Request:**
```json
{
  "code": "console.log('hello')"
}
```

**Response:**
```json
{
  "errors": [],
  "warnings": [{
    "line": 1,
    "column": 1,
    "message": "Unexpected console statement",
    "ruleId": "no-console"
  }],
  "passed": false
}
```

## 🔐 GitHub Actions CI/CD

The project includes automated quality checks in `.github/workflows/pipeline.yml`:

```yaml
- Runs on: Push to main/develop, Pull Requests
- Executes: npm run lint
- Reports: ESLint violations
```

✅ **Web interface does NOT interfere with GitHub Actions**
✅ **CLI linting works independently**

## 📊 Analysis Dashboard

View comprehensive analytics:
- **Total Analyses** - Number of code analyses performed
- **Total Errors** - Cumulative error count
- **Total Warnings** - Cumulative warning count
- **Pass Rate** - Percentage of analyses with no errors

## 💾 Data Storage

- **Analysis History** - Stored in browser localStorage
- **Limit** - Last 20 analyses retained
- **Persistence** - Survives page refresh
- **Privacy** - All data stays local in your browser

## 🎨 UI Features

### Tabs
1. **📝 Code Analyzer** - Main analysis interface
2. **📊 Dashboard** - Statistics and metrics
3. **📜 History** - Previous analyses

### Theme Toggle
- **Light Mode** - Default professional theme
- **Dark Mode** - Eye-friendly night theme
- **Preference** - Saved in localStorage

## 📸 Screenshots & Reports

To include in your report:
1. Run `npm start`
2. Open `http://localhost:3000`
3. Paste problematic code (see example below)
4. Take screenshots using:
   - Windows: **Win + Shift + S**
   - Mac: **Cmd + Shift + 4**
   - Browser: **Right-click → Take Screenshot**

### Example Code for Testing
```javascript
// Problematic code example
var x = 5
console.log(x)

function test(){
return 5;}
```

## 🛠️ Project Structure

```
CODE QUALITY1/
├── index.html          # Web interface
├── server.js           # Node.js server
├── package.json        # Dependencies
├── eslint.config.mjs   # ESLint configuration
├── test.js            # Sample test file
├── .github/
│   └── workflows/
│       └── pipeline.yml # GitHub Actions workflow
└── README.md          # This file
```

## 🔧 ESLint Configuration

Default rules are in `eslint.config.mjs`. Customize by:

1. Edit `eslint.config.mjs`
2. Adjust rules as needed
3. Run `npm run lint` to test changes

## 📝 Notes

- ✅ **ESLint only reports real problems** - Clean code produces no warnings
- ✅ **GitHub Actions integration** - Automated quality checks on every push
- ✅ **Professional-grade tool** - Suitable for production use
- ✅ **No external API required** - Runs entirely locally
- ✅ **Offline capable** - Works without internet (after first load)

## 🤝 Support

For issues or questions:
1. Check that all dependencies are installed: `npm install`
2. Ensure Node.js 14+ is installed: `node --version`
3. Verify ESLint is working: `npm run lint`

## 📄 License

ISC License

---

**Ready to analyze your code!** 🚀

Start with: `npm install && npm start`
