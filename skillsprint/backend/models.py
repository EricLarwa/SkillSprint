from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy() 

class User(db.Model):
    __tablename__ = 'users'  
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

    def __repr__(self):
        return f"<User  {self.email}>"

class Category(db.Model):
    __bind_key__ = 'questionbank'
    __tablename__ = 'categories'  
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    
    questions = db.relationship('Question', backref='category', lazy=True)

    def __repr__(self):
        return f"<Category {self.name}>"

class Question(db.Model):
    __bind_key__ = 'questionbank'
    __tablename__ = 'questions'  
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.String(500), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    difficulty_level = db.Column(db.Integer, nullable=False)

    answers = db.relationship('Answer', backref='question', lazy=True)

    def __repr__(self):
        return f"<Question {self.question_text}>"
    
class Answer(db.Model):
    __bind_key__ = 'questionbank'
    __tablename__ = 'answers'  
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    answer_text = db.Column(db.Text, nullable=False)
    is_correct = db.Column(db.Boolean, default=False)
    explanation = db.Column(db.Text)  
    
    def __repr__(self):
        return f"<Answer {self.id} for Q{self.question_id}: {self.answer_text[:20]}...>"

class Achievement(db.Model):
    __tablename__ = 'achievements'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=True)
    category = db.Column(db.String(50), nullable=False)  # Add a category field

    user = db.relationship('User', backref='achievements', lazy=True)
    question = db.relationship('Question', backref='achievements', lazy = True)