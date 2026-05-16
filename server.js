const http = require('http');
const fs = require('fs');
const path = require('path');

// Import ESLint properly
let ESLint;
try {
    ESLint = require('eslint').ESLint;
} catch (e) {
    console.error('ESLint not found. Please run: npm install');
    process.exit(1);
}

// Initialize ESLint
const eslintInstance = new ESLint();

const server = http.createServer(async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Serve index.html
    if (req.url === '/' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading page');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
        return;
    }

    // Handle code analysis
    if (req.url === '/analyze' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const { code } = JSON.parse(body);

                if (!code || code.trim() === '') {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'No code provided' }));
                    return;
                }

                // Create a temporary file to analyze
                const tempDir = path.join(__dirname, '.eslint-temp');
                if (!fs.existsSync(tempDir)) {
                    fs.mkdirSync(tempDir);
                }
                
                const tempFile = path.join(tempDir, `temp-${Date.now()}.js`);
                fs.writeFileSync(tempFile, code);

                try {
                    // Run ESLint
                    const results = await eslintInstance.lintFiles(tempFile);

                    // Process results
                    const errors = [];
                    const warnings = [];

                    if (results && results.length > 0 && results[0].messages) {
                        results[0].messages.forEach(message => {
                            const issue = {
                                line: message.line,
                                column: message.column,
                                message: message.message,
                                ruleId: message.ruleId,
                                suggestion: message.fix ? message.fix.text : null
                            };

                            if (message.severity === 2) {
                                errors.push(issue);
                            } else if (message.severity === 1) {
                                warnings.push(issue);
                            }
                        });
                    }

                    const response = {
                        errors,
                        warnings,
                        passed: errors.length === 0,
                        fileName: tempFile,
                        lintCount: results[0].ruleCount
                    };

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(response));

                } finally {
                    // Clean up temp file
                    if (fs.existsSync(tempFile)) {
                        fs.unlinkSync(tempFile);
                    }
                }

            } catch (err) {
                console.error('ESLint Analysis Error:', err);
                
                // Generate helpful error message based on error type
                let errorMessage = 'Unable to analyze code';
                let suggestions = [];

                if (err.message.includes('Unexpected token')) {
                    errorMessage = 'Syntax Error: Invalid JavaScript syntax detected';
                    suggestions = ['Check for missing semicolons or brackets', 'Verify string quotes are properly closed'];
                } else if (err.message.includes('SyntaxError')) {
                    errorMessage = 'Syntax Error: ' + err.message;
                    suggestions = ['Review your code syntax carefully', 'Check for common JavaScript mistakes'];
                } else if (err.code === 'ENOENT') {
                    errorMessage = 'File system error: Unable to access temporary files';
                } else if (err.message.includes('EACCES')) {
                    errorMessage = 'Permission error: Unable to write temporary analysis files';
                } else {
                    errorMessage = 'Analysis Error: ' + (err.message || 'Unknown error occurred');
                }

                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    error: errorMessage,
                    passed: false,
                    errors: [],
                    warnings: [],
                    details: process.env.NODE_ENV === 'development' ? err.message : undefined
                }));
            }
        });
        return;
    }

    // 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🚀 Code Quality Analysis Tool is running!`);
    console.log(`${'='.repeat(60)}`);
    console.log(`📍 Open your browser and go to: http://localhost:${PORT}`);
    console.log(`\n✨ Features:`);
    console.log(`   ✓ Paste JavaScript code for instant analysis`);
    console.log(`   ✓ Upload .js files to analyze`);
    console.log(`   ✓ Export results as JSON/CSV`);
    console.log(`   ✓ Dark mode support`);
    console.log(`   ✓ Analysis history tracking`);
    console.log(`   ✓ Real-time error & warning detection`);
    console.log(`   ✓ GitHub Actions CI/CD ready`);
    console.log(`${'='.repeat(60)}\n`);
});
