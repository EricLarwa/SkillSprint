coding_dict = [
    {
        "question": "Create a function called 'sum_numbers' that takes a list of integers as input and returns the sum of all numbers in the list.\n\nExample:\nInput: [1, 2, 3, 4, 5]\nOutput: 15",
        "difficulty": 1,
        "initial_code": "def sum_numbers(numbers):\n    # Your code here\n    pass\n\n# Test your function\nprint(sum_numbers([1, 2, 3, 4, 5]))",
        "test_cases": [
            {"input": [1, 2, 3, 4, 5], "expected": 15},
            {"input": [10, 20, 30], "expected": 60},
            {"input": [-1, 0, 1], "expected": 0}
        ],
        "solution": "def sum_numbers(numbers):\n    return sum(numbers)",
        "explanation": "This problem can be solved using Python's built-in sum() function, which adds all items in an iterable. Alternatively, you could use a loop to add each element to a running total."
    },
    {
        "question": "Write a function called 'is_palindrome' that checks if a given string is a palindrome (reads the same forwards and backwards). Return True if it is, False otherwise. Ignore case and non-alphanumeric characters.\n\nExample:\nInput: 'A man, a plan, a canal: Panama'\nOutput: True",
        "difficulty": 2,
        "initial_code": "def is_palindrome(text):\n    # Your code here\n    pass\n\n# Test your function\nprint(is_palindrome('A man, a plan, a canal: Panama'))",
        "test_cases": [
            {"input": "A man, a plan, a canal: Panama", "expected": True},
            {"input": "race a car", "expected": False},
            {"input": "Was it a car or a cat I saw?", "expected": True}
        ],
        "solution": "def is_palindrome(text):\n    # Remove non-alphanumeric characters and convert to lowercase\n    cleaned = ''.join(c.lower() for c in text if c.isalnum())\n    # Check if the string equals its reverse\n    return cleaned == cleaned[::-1]",
        "explanation": "To check for a palindrome, we first clean the string by removing non-alphanumeric characters and converting to lowercase. Then we compare the cleaned string with its reverse using slice notation [::-1]."
    },
    {
        "question": "Create a function called 'fibonacci' that returns the nth number in the Fibonacci sequence. The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the two preceding ones.\n\nExample:\nInput: 6\nOutput: 8 (The sequence is 0, 1, 1, 2, 3, 5, 8, 13, ...)",
        "difficulty": 2,
        "initial_code": "def fibonacci(n):\n    # Your code here\n    pass\n\n# Test your function\nprint(fibonacci(6))",
        "test_cases": [
            {"input": 0, "expected": 0},
            {"input": 1, "expected": 1},
            {"input": 6, "expected": 8},
            {"input": 10, "expected": 55}
        ],
        "solution": "def fibonacci(n):\n    if n <= 0:\n        return 0\n    elif n == 1:\n        return 1\n    else:\n        a, b = 0, 1\n        for _ in range(2, n + 1):\n            a, b = b, a + b\n        return b",
        "explanation": "This iterative solution keeps track of the two previous Fibonacci numbers and calculates the next one in the sequence until reaching the nth number."
    },
    {
        "question": "Write a function called 'find_duplicates' that takes a list of integers and returns a list of all duplicates in the original list.\n\nExample:\nInput: [1, 2, 3, 2, 4, 3, 5]\nOutput: [2, 3]",
        "difficulty": 2,
        "initial_code": "def find_duplicates(numbers):\n    # Your code here\n    pass\n\n# Test your function\nprint(find_duplicates([1, 2, 3, 2, 4, 3, 5]))",
        "test_cases": [
            {"input": [1, 2, 3, 2, 4, 3, 5], "expected": [2, 3]},
            {"input": [1, 1, 1, 1], "expected": [1]},
            {"input": [1, 2, 3, 4, 5], "expected": []}
        ],
        "solution": "def find_duplicates(numbers):\n    seen = set()\n    duplicates = set()\n    \n    for num in numbers:\n        if num in seen:\n            duplicates.add(num)\n        else:\n            seen.add(num)\n            \n    return list(duplicates)",
        "explanation": "We use two sets: one to keep track of numbers we've seen before, and another to store duplicates. When we encounter a number that's already in the 'seen' set, we add it to the 'duplicates' set."
    },
    {
        "question": "Create a function called 'count_words' that counts the occurrence of each word in a string and returns a dictionary with words as keys and counts as values. Ignore case and punctuation.\n\nExample:\nInput: 'The quick brown fox jumps over the lazy dog.'\nOutput: {'the': 2, 'quick': 1, 'brown': 1, 'fox': 1, 'jumps': 1, 'over': 1, 'lazy': 1, 'dog': 1}",
        "difficulty": 3,
        "initial_code": "def count_words(text):\n    # Your code here\n    pass\n\n# Test your function\nprint(count_words('The quick brown fox jumps over the lazy dog.'))",
        "test_cases": [
            {"input": "The quick brown fox jumps over the lazy dog.", "expected": {'the': 2, 'quick': 1, 'brown': 1, 'fox': 1, 'jumps': 1, 'over': 1, 'lazy': 1, 'dog': 1}},
            {"input": "Hello, hello, HELLO!", "expected": {'hello': 3}},
            {"input": "One fish, two fish, red fish, blue fish.", "expected": {'one': 1, 'fish': 4, 'two': 1, 'red': 1, 'blue': 1}}
        ],
        "solution": "def count_words(text):\n    # Remove punctuation and convert to lowercase\n    for char in '.,!?;:':\n        text = text.replace(char, '')\n    \n    words = text.lower().split()\n    word_count = {}\n    \n    for word in words:\n        if word in word_count:\n            word_count[word] += 1\n        else:\n            word_count[word] = 1\n            \n    return word_count",
        "explanation": "This solution first removes punctuation and converts the text to lowercase. Then it splits the string into words and counts the occurrences of each word using a dictionary."
    }
]