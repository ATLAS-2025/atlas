# Use the official Python image as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install required packages for PostgreSQL
RUN apt-get update 
RUN apt-get install -y \
    pkg-config \
    libpq-dev \
    gcc &&  apt-get clean
# Copy pyproject.toml and poetry.lock files to the container
COPY pyproject.toml poetry.lock ./

# Install Poetry
RUN pip install poetry==1.7.1

# Install project dependencies
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi --no-root

# Copy the rest of the application code
RUN pip uninstall -y poetry

COPY . .
# # Change working directory to src
# WORKDIR /app
RUN mkdir -p /app/output /app/logs && \
    chmod -R 755 /app/output /app/logs

# Expose the port FastAPI runs on
EXPOSE 8000


# Command to run the application
# CMD ["poetry", "run", "python", "main.py"]
CMD ["uvicorn", "core.server:app", "--host", "0.0.0.0", "--port", "8000"]

