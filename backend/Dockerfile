FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . /usr/src/app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt
# Make port 80 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV NAME python-backend

# Run app.py when the container launches
CMD ["env/scripts/activate", "uvicorn","main:app"]