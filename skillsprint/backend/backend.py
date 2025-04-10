from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)
# Use Flask-CORS properly
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_key'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
PORT = 4000  # Keep using port 4000 since we know 5000 is occupied


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)


@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity={'email': user.email})
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


@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"msg": "CORS test successful"}), 200


if __name__ == '__main__':
   with app.app_context():
        db.create_all()
        app.run(port=PORT, debug=True)