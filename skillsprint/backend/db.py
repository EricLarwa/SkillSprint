import sqlite3
from models import db

def get_user_connection():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row
    return conn


def get_questionbank_connection():
    conn = sqlite3.connect('questionbank.db')
    conn.row_factory = sqlite3.Row
    return conn

def initialize_user_db():
    conn = get_user_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

    db.create_all()

def initialize_questionbank_db():
    conn = get_questionbank_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            description TEXT
        )
    ''')
    cursor.execute(''' DROP TABLE IF EXISTS questions''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question_text TEXT NOT NULL,
            difficulty_level INTEGER,
            category_id INTEGER,
            FOREIGN KEY (category_id) REFERENCES categories (id)
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS answers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            answer_text TEXT NOT NULL,
            is_correct BOOLEAN NOT NULL,
            explanation TEXT,
            question_id INTEGER,
            FOREIGN KEY (question_id) REFERENCES questions (id)
        )
    ''')
    conn.commit()
    conn.close()
    
    db.create_all()

def initialize_databases():
    initialize_user_db()
    initialize_questionbank_db()