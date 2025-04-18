from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User, Category, Question, Answer, Achievement
from seed_data import seed_database
from db import initialize_databases
import subprocess
import os
from collections import defaultdict
app = Flask(__name__, static_folder='static')

CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_BINDS'] = {'questionbank': 'sqlite:///questionbank.db'}
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_key'

db.init_app(app)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
PORT = 4000 


@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=json.dumps({'email': user.email}))
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Bad email or password"}), 401


@app.route('/api/register', methods=['POST'])
def signup():
    email = request.json.get('email')
    password = request.json.get('password')
    
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201

# API Routes for the Question Bank
@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{'id': c.id, 'name': c.name, 'description': c.description} for c in categories])

@app.route('/api/questions/<category>', methods=['GET'])
def get_category_questions(category):
    limit = request.args.get('limit', 10, type=int)
    difficulty = request.args.get('difficulty', type=int)
    
    query = Question.query.join(Category).filter(Category.name == category)
    
    if difficulty:
        query = query.filter(Question.difficulty_level == difficulty)
    
    questions = query.limit(limit).all()
    
    result = []
    for q in questions:
        question_data = {
            'id': q.id,
            'question': q.question_text,
            'difficulty': q.difficulty_level,
            'answers': []
        }
        
        for a in q.answers:
            question_data['answers'].append({
                'id': a.id,
                'text': a.answer_text,
                'is_correct': a.is_correct,
                'explanation': a.explanation
            })
        
        result.append(question_data)
    
    return jsonify(result)

@app.route('/api/check-answer', methods=['POST'])
def check_answer():
    data = request.json
    question_id = data.get('question_id')
    answer_id = data.get('answer_id')
    
    if not question_id or not answer_id:
        return jsonify({'error': 'Missing question_id or answer_id'}), 400
    
    answer = Answer.query.get(answer_id)
    if not answer or answer.question_id != question_id:
        return jsonify({'error': 'Invalid answer ID'}), 400
    
    correct_answer = Answer.query.filter_by(question_id=question_id, is_correct=True).first()
    
    return jsonify({
        'is_correct': answer.is_correct,
        'explanation': answer.explanation if answer.is_correct else correct_answer.explanation
    })

@app.route('/api/run-code', methods=['POST'])
def run_code():
    data = request.get_json()
    code = data.get('code', '')

    file_name = 'temp_code.py'
    with open(file_name, 'w') as f:
        f.write(code)
    try:
        result = subprocess.run(['python', file_name], capture_output=True, text=True)
        output = result.stdout
        error = result.stderr
        return jsonify({'output': output, 'error': error})
    except Exception as e:
        return jsonify({'output': '','error': str(e)}), 500
    
    finally:
        if os.path.exists(file_name):
            os.remove(file_name)   
            
import json
@app.route('/api/user/achievements', methods=['GET'])
@jwt_required()
def get_user_achievements():
    identity = json.loads(get_jwt_identity())
    email = identity['email']
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    achievements = Achievement.query.filter_by(user_id=user.id).all()

    grouped_achievements = defaultdict(list)
    for a in achievements:
        grouped_achievements[a.category].append({"title": a.title})

    return jsonify(grouped_achievements), 200

@app.route('/api/user/add-achievement', methods=['POST'])
@jwt_required()
def add_achievement():
    identity = json.loads(get_jwt_identity())  # Decode the JWT identity
    email = identity['email']
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.json
    category = data.get('category')
    title = data.get('title')

    if not category or not title:
        return jsonify({"error": "Category and title are required"}), 400

    # Add the achievement to the database
    new_achievement = Achievement(user_id=user.id, category=category, title=title)
    db.session.add(new_achievement)
    db.session.commit()

    return jsonify({"msg": "Achievement added successfully"}), 201
        

if __name__ == '__main__':
   with app.app_context():
        initialize_databases()
        seed_database()
        app.run(port=PORT, debug=True)