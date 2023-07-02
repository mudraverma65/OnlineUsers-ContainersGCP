import requests

register_url = "https://a2-container1-fb74xf24fq-uc.a.run.app"
login_url = "https://a2-container2-fb74xf24fq-uc.a.run.app"
online_url = "https://a2-container3-fb74xf24fq-uc.a.run.app"

# Test case 1: Successful registration
payload = {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "location": "New York"
}
response = requests.post(f"{register_url}/register", json=payload)
print("Test Case 1:")
print("Status Code:", response.status_code)
print("Response:", response.json())
print()

# Test case 2: Registration with missing fields
payload = {
    "name": "Jane Smith",
    "email": "janesmith@example.com"
}
response = requests.post(f"{register_url}/register", json=payload)
print("Test Case 2:")
print("Status Code:", response.status_code)
print("Response Text:", response.text)
print()

# Test case 3: Duplicate email registration
payload = {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "location": "Los Angeles"
}
response = requests.post(f"{register_url}/register", json=payload)
print("Test Case 3:")
print("Status Code:", response.status_code)
print("Response Text:", response.text)
print()

# Test case 4: Successful Login
payload = {
    "email": "johndoe@example.com",
    "password": "password123"
}
response = requests.post(f"{login_url}/login", json=payload)
print("Test Case 4:")
print("Status Code:", response.status_code)
print("Response:", response.json())
print()

# Test case 5: Invalid Email or Password
payload = {
    "email": "johndoe@example.com",
    "password": "wrongpassword"
}
response = requests.post(f"{login_url}/login", json=payload)
print("Test Case 5:")
print("Status Code:", response.status_code)
print("Response:", response.json())
print()

# Test case 6: Successful Logout
payload = {
    "email": "johndoe@example.com"
}
response = requests.post(f"{login_url}/logout", json=payload)
print("Test Case 6:")
print("Status Code:", response.status_code)
print("Response:", response.json())

# Test case 7: Get Online Users
response = requests.get(f"{online_url}/profile")
print("Test Case 7:")
print("Status Code:", response.status_code)
print("Response:", response.json())
print()