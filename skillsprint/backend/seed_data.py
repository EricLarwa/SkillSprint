from models import db, Category, Question, Answer
from questions.finance import finance_dict
from questions.language import language_dict
from questions.coding import coding_dict

def seed_database():
    
    if not Category.query.filter_by(name='Finance').first():
        finance = Category(name='Finance', description='Questions related to finance, economics, and money management')
        db.session.add(finance)
    
    if not Category.query.filter_by(name='Language').first():
        language = Category(name='Language', description='Questions related to language learning and linguistics')
        db.session.add(language)
    
    if not Category.query.filter_by(name='Coding').first():
        coding = Category(name='Coding', description='Programming challenges to improve your Python coding skills')
        db.session.add(coding)
    
    db.session.commit()
    
    finance_id = Category.query.filter_by(name='Finance').first().id
    language_id = Category.query.filter_by(name='Language').first().id
    coding_id = Category.query.filter_by(name='Coding').first().id

    finance_questions = finance_dict
    language_questions = language_dict
    coding_questions = coding_dict
    
    for q in finance_questions:
        new_question = Question(
            category_id=finance_id,
            question_text=q['question'],
            difficulty_level=q['difficulty']
        )
        db.session.add(new_question)
        db.session.flush()  
        
        for a in q['answers']:
            new_answer = Answer(
                question_id=new_question.id,
                answer_text=a['text'],
                is_correct=a['correct'],
                explanation=a.get('explanation', None)
            )
            db.session.add(new_answer)
    
    for q in language_questions:
        new_question = Question(
            category_id=language_id,
            question_text=q['question'],
            difficulty_level=q['difficulty']
        )
        db.session.add(new_question)
        db.session.flush()
        
        for a in q['answers']:
            new_answer = Answer(
                question_id=new_question.id,
                answer_text=a['text'],
                is_correct=a['correct'],
                explanation=a.get('explanation', None)
            )
            db.session.add(new_answer)
    
    for q in coding_questions:
        full_question = q['question'] + "\n\n" + q['initial_code']
        
        new_question = Question(
            category_id=coding_id,
            question_text=full_question,
            difficulty_level=q['difficulty']
        )
        db.session.add(new_question)
        db.session.flush()
        
        solution_answer = Answer(
            question_id=new_question.id,
            answer_text=q['solution'],
            is_correct=True,
            explanation=q['explanation']
        )
        db.session.add(solution_answer)
        
        import json
        test_cases_answer = Answer(
            question_id=new_question.id,
            answer_text=json.dumps(q['test_cases']),
            is_correct=False,
            explanation="TEST_CASES" 
        )
        db.session.add(test_cases_answer)
    
    db.session.commit()
    print("Database populated successfully!")