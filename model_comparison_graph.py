import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set style
sns.set(style="whitegrid")

# Data
models = ['Random Forest (Reference)', 'Random Forest (Ours)']
r2_scores = [0.986, 0.987777]
colors = ['#95a5a6', '#2ecc71'] # Grey for reference, Green for ours

plt.figure(figsize=(8, 6))
bars = plt.bar(models, r2_scores, color=colors, width=0.5)

# Add values on top
for bar in bars:
    yval = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2, yval + 0.001, f"{yval:.6f}", ha='center', va='bottom', fontsize=12, fontweight='bold')

plt.ylim(0.98, 0.99) # Zoom in to show the difference
plt.ylabel('R2 Score', fontsize=12)
plt.title('Random Forest Model Comparison', fontsize=14, fontweight='bold')
plt.grid(axis='y', linestyle='--', alpha=0.7)

# Save in the current directory (project root)
output_path = 'model_comparison.png'
plt.tight_layout()
plt.savefig(output_path, dpi=300)
print(f"Graph saved to {os.path.abspath(output_path)}")
