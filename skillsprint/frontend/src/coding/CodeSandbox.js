import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import axios from 'axios';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/webpack-resolver';
import './CodeSandbox.css';

const CodeSandbox = () => {
    const [code, setCode] = useState('# Write your Python code here');
    const [output, setOutput] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [testResults, setTestResults] = useState(null);
    const [showSolution, setShowSolution] = useState(false);
    const [difficulty, setDifficulty] = useState(0); 

    useEffect(() => {
        fetchQuestions();
    }, [difficulty]);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const url = `http://localhost:4000/api/questions/Coding${difficulty ? `?difficulty=${difficulty}` : ''}`;
            const response = await axios.get(url);
            setQuestions(response.data);
            
            if (response.data.length > 0) {
                handleSelectQuestion(response.data[0]);
            }
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching questions:', error);
            setLoading(false);
        }
    };

    const handleSelectQuestion = (question) => {
        setCurrentQuestion(question);
        
        const parts = question.question.split("\n\n");
        const initialCodeIndex = parts.findIndex(part => part.startsWith("def "));
        
        if (initialCodeIndex !== -1) {
            setCode(parts.slice(initialCodeIndex).join("\n\n"));
        } else {
            setCode("# Write your solution here");
        }
        
        setOutput('');
        setTestResults(null);
        setShowSolution(false);
    };

    const handleRunCode = async () => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:4000/api/run-code', { code });
            setOutput(response.data.output || response.data.error);
            setLoading(false);
        } catch (error) {
            console.error('Error running code:', error);
            setOutput('Error: Failed to execute code');
            setLoading(false);
        }
    };

    const handleTestCode = async () => {
        if (!currentQuestion) return;
        
        try {
            setLoading(true);
 
            const testCasesAnswer = currentQuestion.answers.find(a => a.explanation === "TEST_CASES");
            if (!testCasesAnswer) {
                setOutput("Error: Test cases not found for this question.");
                setLoading(false);
                return;
            }

            const testCases = JSON.parse(testCasesAnswer.text);
            const cleanedCode = code.split('\n').filter(line => !line.trim().startsWith('print(')).join('\n');
            const results = [];
            let allPassed = true;

            for (const testCase of testCases) {
                 const testCode = `${cleanedCode}\n\n# Test case\nresult = ${getFunctionName(code)}(${JSON.stringify(testCase.input)})\nprint(f"DEBUG INPUT: {${JSON.stringify(testCase.input)}}")\nprint(result)\n`;
                const response = await axios.post('http://localhost:4000/api/run-code', { code: testCode });
                const output = response.data.output || '';

                console.log('raw output: ', output);

                const outputLines = output.trim().split('\n').filter(line => line.trim() !== '');
                const lastLine = outputLines[outputLines.length - 1];
                
                const resultMatch = lastLine
                
                let actualResult = ""

                try {
                    // If it's a number
                    if (!isNaN(resultMatch) && resultMatch !== '') {
                        actualResult = Number(resultMatch);
                    } 
                    // If it's JSON (array or object)
                    else if ((resultMatch.startsWith('[') && resultMatch.endsWith(']')) || 
                            (resultMatch.startsWith('{') && resultMatch.endsWith('}'))) {
                        actualResult = JSON.parse(resultMatch);
                    } 
                    // Otherwise treat as string
                    else {
                        actualResult = resultMatch;
                    }
                } catch (e) {
                    console.error("Error parsing result:", e);
                    actualResult = resultMatch; // Fallback to raw string
                }
                const passed = compareResults(actualResult, testCase.expected);
                
                if (!passed) allPassed = false;
                
                results.push({
                    input: testCase.input,
                    expected: testCase.expected,
                    actual: actualResult,
                    passed
                });
            }
            
            setTestResults({
                allPassed,
                results
            });
            
            setLoading(false);
            
            if (allPassed) {
                console.log('Correct answer!');
                const codingCompleted = JSON.parse(localStorage.getItem('completedCoding') || '[]');
                // Avoid duplicate entries
                if (!codingCompleted.includes(currentQuestion.id)) {
                    codingCompleted.push(currentQuestion.id);
                    localStorage.setItem('completedCoding', JSON.stringify(codingCompleted));
                    }
                console.log('Updated completedCoding:', codingCompleted);
            }
        } catch (error) {
            console.error('Error testing code:', error);
            setOutput('Error: Failed to test code');
            setLoading(false);
        }
    };

    const getFunctionName = (code) => {
        const match = code.match(/def\s+([a-zA-Z0-9_]+)\s*\(/);
        return match ? match[1] : 'function';
    };

    const compareResults = (actual, expected) => {
        if (Array.isArray(expected)) {
            if (!Array.isArray(actual)) return false;
            if (actual.length !== expected.length) return false;
            
            if (expected.every(item => typeof item !== 'object')) {
                return JSON.stringify([...actual].sort()) === JSON.stringify([...expected].sort());
            }
            
            return actual.every((item, i) => compareResults(item, expected[i]));
        } else if (typeof expected === 'object' && expected !== null) {
            if (typeof actual !== 'object' || actual === null) return false;
            
            const expectedKeys = Object.keys(expected).sort();
            const actualKeys = Object.keys(actual).sort();
            
            if (expectedKeys.length !== actualKeys.length) return false;
            if (!expectedKeys.every((key, i) => key === actualKeys[i])) return false;
            
            return expectedKeys.every(key => compareResults(actual[key], expected[key]));
        } else {
            return actual === expected;
        }
    };

    const handleShowSolution = () => {
        if (!currentQuestion) return;
        
        const solutionAnswer = currentQuestion.answers.find(a => a.is_correct);
        if (solutionAnswer) {
            setCode(solutionAnswer.text);
            setShowSolution(true);
        }
    };

    const handleDifficultyChange = (e) => {
        setDifficulty(parseInt(e.target.value) || 0);
    };

    return (
        <div className="coding-sandbox-container">
            <h1 className="pythn-hdr">Python Coding Practice</h1>

            <div className="difficulty-filter">
                <label htmlFor="difficulty">Difficulty Level: </label>
                <select 
                    id="difficulty" 
                    value={difficulty} 
                    onChange={handleDifficultyChange}
                    disabled={loading}
                >
                    <option value="0">All Levels</option>
                    <option value="1">Easy</option>
                    <option value="2">Medium</option>
                    <option value="3">Hard</option>
                </select>
            </div>

            <div className="coding-content">
                <div className="question-panel">
                    <h2>Challenge</h2>
                    {currentQuestion ? (
                        <>
                            <div className="question-selector">
                                <label htmlFor="question">Select Challenge: </label>
                                <select 
                                    id="question" 
                                    onChange={(e) => {
                                        const selectedQuestion = questions.find(q => q.id === parseInt(e.target.value));
                                        if (selectedQuestion) {
                                            handleSelectQuestion(selectedQuestion);
                                        }
                                    }}
                                    value={currentQuestion.id}
                                    disabled={loading}
                                >
                                    {questions.map(question => (
                                        <option key={question.id} value={question.id}>
                                            {question.question.split('\n')[0].substring(0, 60)}...
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="question-description">
                                {currentQuestion.question.split('\n\n')[0].split('\n').map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                                <p className="difficulty">
                                    Difficulty: {currentQuestion.difficulty === 1 ? 'Easy' : 
                                                currentQuestion.difficulty === 2 ? 'Medium' : 'Hard'}
                                </p>
                            </div>
                            
                            {testResults && (
                                <div className={`test-results ${testResults.allPassed ? 'success' : 'failure'}`}>
                                    <h3>{testResults.allPassed ? 'All Tests Passed! 🎉' : 'Some Tests Failed'}</h3>
                                    {testResults.results.map((result, i) => (
                                        <div key={i} className={`test-case ${result.passed ? 'passed' : 'failed'}`}>
                                            <div>Test {i+1}: {result.passed ? '✓' : '✗'}</div>
                                            <div><strong>Input:</strong> {JSON.stringify(result.input)}</div>
                                            <div><strong>Expected:</strong> {JSON.stringify(result.expected)}</div>
                                            {!result.passed && <div><strong>Actual:</strong> {JSON.stringify(result.actual)}</div>}
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            <div className="hint-section">
                                {currentQuestion.answers.some(a => a.is_correct) && (
                                    <button 
                                        onClick={handleShowSolution} 
                                        className="hint-button"
                                        disabled={showSolution}
                                    >
                                        {showSolution ? 'Solution Shown' : 'Show Solution'}
                                    </button>
                                )}
                                
                                {showSolution && currentQuestion.answers.find(a => a.is_correct)?.explanation && (
                                    <div className="explanation">
                                        <h4>Explanation:</h4>
                                        <p>{currentQuestion.answers.find(a => a.is_correct).explanation}</p>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="no-questions">
                            {loading ? 'Loading questions...' : 'No coding challenges available.'}
                        </div>
                    )}
                </div>
                
                <div className="sandbox-panel">
                    <h2 className='code-editr'>Code Editor</h2>
                    <AceEditor
                        mode="python"
                        theme="xcode"
                        onChange={setCode}
                        name="code_editor"
                        editorProps={{ $blockScrolling: true }}
                        width="100%"
                        height="400px"
                        value={code}
                        setOptions={{
                            useWorker: false,
                            fontSize: 14,
                            showPrintMargin: false,
                            highlightActiveLine: true
                        }}
                    />
                    <div className="action-buttons">
                        <button 
                            onClick={handleRunCode}
                            disabled={loading}
                            className="run-button"
                        >
                            {loading ? 'Running...' : 'Run Code'}
                        </button>
                        <button 
                            onClick={handleTestCode}
                            disabled={loading || !currentQuestion}
                            className="test-button"
                        >
                            {loading ? 'Testing...' : 'Test Solution'}
                        </button>
                    </div>
                    
                    <div className="output-panel">
                        <h3>Output:</h3>
                        <pre>{output}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeSandbox;