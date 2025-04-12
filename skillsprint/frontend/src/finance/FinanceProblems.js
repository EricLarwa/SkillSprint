import React, { useState, useEffect} from 'react'
import './FinanceProblems.css';

const FinanceProblems = () => {
    const [questions, setQuestions] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [answerSubmitted, setAnswerSubmitted] = useState(false)
    const [isCorrect, setIsCorrect] = useState(null)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/questions/Finance')
                const data = await response.json()
                console.log('Full log data:', data)
                if (data.length > 0) {
                    setQuestions(data) // Store the entire array of questions
                }
            } catch (error) {
                console.error('Error fetching questions:', error)
            }
        }
        fetchQuestions()
    }, [])

    const currentQuestion = questions[currentQuestionIndex]
    // Get answers for the current question
    const currentAnswers = currentQuestion?.answers || []

    const handleAnswerChange = (event) => {
        setSelectedAnswer(Number(event.target.value))
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!currentQuestion) return
        
        try {
            const response = await fetch('http://localhost:4000/api/check-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question_id: currentQuestion.id,
                    answer_id: selectedAnswer
                })
            })
            const data = await response.json()
            console.log('Response:', data)

            setAnswerSubmitted(true)
            setIsCorrect(data.is_correct)
            if (!data.is_correct) {
                console.log('Correct answer!')
            } else {
                console.log('Incorrect answer.')
            }
        } catch (error) {
            console.error('Error submitting answer:', error)
        }
    }

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setSelectedAnswer(null)
            setAnswerSubmitted(false)
            setIsCorrect(null)
        } else {
            console.log('No more questions available.')
        }
    }

    return (
        <div className="finance-container">
            <h1>Finance</h1>
            <div className="finance-boxes">
                <div className="financebox-one">
                    <h2>Question:</h2>
                    {currentQuestion ? <p>{currentQuestion.question}</p> : <p>Loading...</p>}
                </div>
                <div className="financebox-two">
                    <h2>Answer Choices</h2>
                    {currentAnswers.length > 0 ? (
                        <div className="answer-choices">
                            {currentAnswers.map((answer) => (
                                <div key={answer.id} className="answer-choice">
                                    <input
                                        type='radio'
                                        id={`answer-${answer.id}`}
                                        value={answer.id}
                                        checked={selectedAnswer === answer.id}
                                        onChange={handleAnswerChange}
                                    />
                                    <label htmlFor={`answer-${answer.id}`} className="answer-label">
                                        {answer.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading answers...</p>
                    )}
                    
                    {/* Feedback message */}
                    {answerSubmitted && (
                        <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
                            {isCorrect ? 'Correct!' : 'Incorrect. Try again!'}
                        </div>
                    )}
                    
                    <div className="btn-group">
                        <button 
                            className="submit-problem" 
                            onClick={handleSubmit}
                            disabled={answerSubmitted || selectedAnswer === null}
                        >
                            Submit Answer
                        </button>

                        {questions.length > 1 && currentQuestionIndex < questions.length - 1 && (
                            <button className="next-question" onClick={handleNextQuestion}>
                                Next Question
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinanceProblems;