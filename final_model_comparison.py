import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set style
sns.set(style="whitegrid")

# Data from project evaluations (yield_prediction.ipynb)
models = [
    'Random Forest (Ours)', 
    'KNN', 
    'Bagging Regressor', 
    'Decision Tree', 
    'XGBoost', 
    'Gradient Boosting', 
    'Linear Regression'
]

r2_scores = [
    0.987777, # Best Performance
    0.985437, 
    0.985272, 
    0.979740, 
    0.975929, 
    0.873241, 
    0.755142
]

# Highlight the best model in Green, use Teal/Grey for others
colors = ['#2ecc71'] + ['#4eb3a2' for _ in range(4)] + ['#95a5a6', '#7f8c8d']

plt.figure(figsize=(12, 7))
bars = plt.bar(models, r2_scores, color=colors, width=0.6)

# Add values on top of the bars
for bar in bars:
    yval = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2, yval + 0.01, f"{yval:.4f}", 
             ha='center', va='bottom', fontsize=10, fontweight='bold')

plt.ylim(0, 1.1)
plt.ylabel('R2 Score (Performance)', fontsize=12)
plt.xlabel('Machine Learning Models', fontsize=12)
plt.title('GreenPulse Project: Model Performance Comparison', fontsize=14, fontweight='bold', pad=20)
plt.xticks(rotation=15, ha='right')
plt.grid(axis='y', linestyle='--', alpha=0.7)

# Save in the current directory
output_path = 'final_model_comparison.png'
plt.tight_layout()
plt.savefig(output_path, dpi=300)
print(f"Project report graph saved to: {os.path.abspath(output_path)}")
