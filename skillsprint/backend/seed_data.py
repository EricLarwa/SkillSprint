from models import db, Category, Question, Answer
from questions.finance import finance_dict
from questions.language import language_dict

def seed_database():
    
    if not Category.query.filter_by(name='Finance').first():
        finance = Category(name='Finance', description='Questions related to finance, economics, and money management')
        db.session.add(finance)
    
    if not Category.query.filter_by(name='Language').first():
        language = Category(name='Language', description='Questions related to language learning and linguistics')
        db.session.add(language)
    
        db.session.commit()
    
    finance_id = Category.query.filter_by(name='Finance').first().id
    language_id = Category.query.filter_by(name='Language').first().id

    finance_questions = finance_dict
    language_questions = language_dict
    
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
    
    db.session.commit()
    print("Database populated successfully!")