"""Plot the three approximate examples reported in the 80,000 Hours guide."""

from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt

OUTPUT = Path(__file__).parent
INCOME = [40_000, 80_000, 160_000]
SATISFACTION = [6.5, 7.0, 7.5]

plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 13})
fig, ax = plt.subplots(figsize=(8, 6), layout="constrained")
fig.set_facecolor("#fafaf7")
ax.set_facecolor("#fafaf7")
fig.suptitle("More income, smaller gains", fontsize=22, fontweight="bold")
ax.set_title("Three approximate examples from 80,000 Hours", fontsize=12, pad=18)
ax.plot(INCOME, SATISFACTION, color="#426655", linestyle=":", linewidth=2)
ax.scatter(INCOME, SATISFACTION, color="#176848", s=80, zorder=3)
for income, score in zip(INCOME, SATISFACTION, strict=True):
    ax.annotate(
        f"{score:g}",
        (income, score),
        xytext=(0, 13),
        textcoords="offset points",
        ha="center",
        fontsize=16,
        fontweight="bold",
        color="#174b36",
    )
ax.set_xlim(20_000, 180_000)
ax.set_ylim(1, 10)
ax.set_xticks(INCOME, ["$40,000", "$80,000", "$160,000"])
ax.set_yticks([1, 3, 5, 7, 9, 10])
ax.set_xlabel("Annual pre-tax household income\nUS dollars, 2009", labelpad=14)
ax.set_ylabel("Life satisfaction, 1–10", labelpad=12)
ax.grid(axis="y", color="#deded7", linewidth=0.8)
ax.spines[["top", "right"]].set_visible(False)
ax.spines[["left", "bottom"]].set_color("#a7ada5")
ax.tick_params(length=0, pad=8)
fig.supxlabel(
    "Source: 80000hours.org/career-guide/dream-job/\n"
    "Illustrative connections between examples; not a fitted curve or raw survey data.",
    fontsize=10,
    color="#465147",
)
fig.savefig(OUTPUT / "income-life-satisfaction.png", dpi=180)
fig.savefig(OUTPUT / "income-life-satisfaction.svg")
plt.close(fig)
