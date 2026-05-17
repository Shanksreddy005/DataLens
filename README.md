# DataLens 🔍

**DataLens** is an automated Data Quality & Profiling platform designed to streamline the Exploratory Data Analysis (EDA) phase of data engineering and analytics workflows. 

Instead of writing custom Python scripts for every new dataset, DataLens allows you to upload any CSV file and instantly generates a comprehensive Data Quality report, complete with statistical profiling, schema inference, and interactive visualizations.

## 🚀 Features

- **Automated Data Ingestion:** Upload any CSV file directly via the UI.
- **Statistical Profiling:** Automatically calculates distinct values, data types, min/max/mean, and missing data percentages.
- **Data Quality Health Scoring:** Flags columns as Excellent, Good, Fair, or Poor based on data completeness.
- **Interactive Dashboards:** Built with React and Recharts to visualize data distributions and missing values.
- **Premium UI:** Features a modern, glassmorphism-inspired design system.

## 🛠️ Tech Stack

### Frontend (Data Visualization)
- **React (Vite):** Blazing fast frontend framework.
- **Recharts:** Composable charting library for React.
- **Lucide React:** Beautiful, consistent iconography.
- **Vanilla CSS:** Custom design system using CSS variables and modern layout techniques.

### Backend (Data Engineering)
- **FastAPI:** High-performance async Python web framework.
- **Pandas:** The industry standard for robust data manipulation and statistical analysis.
- **Uvicorn:** Lightning-fast ASGI server.

## 💻 Getting Started (Local Development)

To run DataLens locally on your machine, you need to start both the Python backend and the React frontend.

### 1. Start the Backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment, then install the dependencies:
```bash
# For Windows
python -m venv venv
.\venv\Scripts\activate

# Install requirements
pip install fastapi uvicorn pandas python-multipart pydantic
```

Start the API server:
```bash
uvicorn main:app --reload
```
The backend API will run on `http://127.0.0.1:8000`.

### 2. Start the Frontend

Open a **new** terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the Node modules and start the Vite development server:
```bash
npm install
npm run dev
```
The frontend UI will run on `http://localhost:5173`. Open this URL in your browser to interact with DataLens!
