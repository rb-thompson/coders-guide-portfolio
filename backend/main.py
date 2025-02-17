from fastapi import FastAPI
from faker import Faker
import pandas as pd
import numpy as np

app = FastAPI()
fake = Faker()

@app.get("/")
async def root():
    return {"message": "Welcome to the API testing! Visit /api/ping or /api/synthetic-data to explore."}

@app.get("/api/ping")
async def ping():
    return {"message": "Hello from the Data Galaxy!"}

@app.get("/api/synthetic-data")
async def get_synthetic_data():
    # Generate synthetic data for a cosmic theme
    data = {
        "planet": [fake.word().capitalize() + " Prime" for _ in range(10)],
        "temperature": np.random.uniform(100, 1000, 10).tolist(),
        "gravity": np.random.uniform(0.5, 2.0, 10).tolist(),
        "oxygen_level": np.random.uniform(0, 100, 10).tolist(),
    }
    return data