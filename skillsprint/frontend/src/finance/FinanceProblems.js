import React, { useState, useEffect} from 'react'
import './FinanceProblems.css';

const FinanceProblems = () => {

    const [question, setQuestion] = useState(false)
    const [answers, setAnswers] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/questions/Finance')
                const data = await response.json()
                console.log('Full log data:', data[0])
                if (data.length > 0) {
                    setQuestion(data[0])
                    setAnswers(data[0].answers)
                }
            } catch (error) {
                console.error('Error fetching question:', error)
            }
        }
        fetchQuestion()
    }, [])

    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/api/check-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question_id: question.id,
                    answer_id: selectedAnswer
                })
            })
            const data = await response.json()
            console.log('Response:', data)
        } catch (error) {
            console.error('Error submitting answer:', error)
        }
    }

    return (
        <div className="finance-container">
            <h1>Finance</h1>
            <div className="finance-boxes">
                <div className="financebox-one">
                    <h2>Question:</h2>
                    {question ? <p>{question.question}</p> : <p>Loading...</p>}
                </div>
                <div className="financebox-two">
                    <h2>Answer Choices</h2>
                    {answers.length > 0 ? (
                        answers.map((answer) => (
                            <div key={answer.id}>
                                <input
                                    type='radio'
                                    value={answer.id}
                                    checked={selectedAnswer === answer.id}
                                    onChange={handleAnswerChange}
                                />
                                <label>{answer.text}</label><br />
                            </div>
                        ))
                    ) : (
                        <p>Loading answers...</p>
                    )}
                </div>
                <button onClick={handleSubmit}>Submit Answer</button>
            </div>
        </div>
    );
};

export default FinanceProblems;