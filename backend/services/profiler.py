import pandas as pd
import io

def profile_dataset(file_bytes: bytes, filename: str) -> dict:
    try:
        # Load CSV into Pandas
        df = pd.read_csv(io.BytesIO(file_bytes))
        
        # Calculate statistics
        num_rows = len(df)
        num_cols = len(df.columns)
        
        columns_info = []
        for col in df.columns:
            col_type = str(df[col].dtype)
            missing_count = int(df[col].isnull().sum())
            missing_percentage = round((missing_count / num_rows) * 100, 2) if num_rows > 0 else 0
            unique_count = int(df[col].nunique())
            
            col_stats = {
                "name": col,
                "type": col_type,
                "missing": missing_count,
                "missing_percentage": missing_percentage,
                "unique": unique_count
            }
            
            # Numeric specific stats
            if pd.api.types.is_numeric_dtype(df[col]):
                col_stats["min"] = float(df[col].min()) if not pd.isna(df[col].min()) else None
                col_stats["max"] = float(df[col].max()) if not pd.isna(df[col].max()) else None
                col_stats["mean"] = float(df[col].mean()) if not pd.isna(df[col].mean()) else None
                col_stats["median"] = float(df[col].median()) if not pd.isna(df[col].median()) else None
            
            columns_info.append(col_stats)
            
        # Basic correlation matrix for numeric columns
        numeric_df = df.select_dtypes(include='number')
        correlations = []
        if not numeric_df.empty and num_cols > 1:
            corr_matrix = numeric_df.corr().round(2)
            for i in range(len(corr_matrix.columns)):
                for j in range(i+1, len(corr_matrix.columns)):
                    col1 = corr_matrix.columns[i]
                    col2 = corr_matrix.columns[j]
                    val = corr_matrix.iloc[i, j]
                    if not pd.isna(val):
                        correlations.append({"col1": col1, "col2": col2, "value": val})
            
        return {
            "filename": filename,
            "status": "success",
            "summary": {
                "rows": num_rows,
                "columns": num_cols
            },
            "columns": columns_info,
            "correlations": correlations
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
