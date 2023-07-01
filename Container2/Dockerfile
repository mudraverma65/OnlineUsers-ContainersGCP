# Use the official Python image as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file to the working directory
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire app directory to the working directory
COPY . .

# Set the environment variable for the service account key file
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/serviceAccountKey.json

# Set the environment variables
ENV PORT 5000

# Expose the port that the application will listen on
EXPOSE 5000

# Start the Flask application
CMD ["python", "login.py"]