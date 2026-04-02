#!/usr/bin/env python3
"""
Create an SVG plot of March Equinox occurrences by day and hour
"""

import csv
from datetime import datetime
from collections import Counter
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

def parse_timestamp(timestamp_str):
    """Parse ISO 8601 timestamp and return day and hour"""
    dt = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
    return dt.day, dt.hour

def main():
    # Read the CSV file and extract March Equinox column
    march_equinoxes_all = []
    march_equinoxes_2025_2075 = []

    with open('seasons.csv', 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row['March Equinox']:
                march_equinoxes_all.append(row['March Equinox'])
                # Extract year for filtering
                year = int(row['Year'])
                if 2025 <= year <= 2075:
                    march_equinoxes_2025_2075.append(row['March Equinox'])

    # Map each timestamp to (day, hour) for all data
    day_hour_pairs_all = []
    for timestamp in march_equinoxes_all:
        day, hour = parse_timestamp(timestamp)
        day_hour_pairs_all.append((day, hour))

    # Map each timestamp to (day, hour) for 2025-2075 data
    day_hour_pairs_2025_2075 = []
    for timestamp in march_equinoxes_2025_2075:
        day, hour = parse_timestamp(timestamp)
        day_hour_pairs_2025_2075.append((day, hour))

    # Count occurrences for both datasets
    counter_all = Counter(day_hour_pairs_all)
    counter_2025_2075 = Counter(day_hour_pairs_2025_2075)

    # Create all possible (day, hour) combinations in range (Mar 19 14:00 to Mar 21 18:00)
    all_combinations = []
    # Mar 19: hours 14-23
    for hour in range(14, 24):
        all_combinations.append((19, hour))
    # Mar 20: all hours
    for hour in range(24):
        all_combinations.append((20, hour))
    # Mar 21: hours 0-18
    for hour in range(19):
        all_combinations.append((21, hour))

    # Get counts for each combination for both datasets
    counts_all = [counter_all.get(combo, 0) for combo in all_combinations]
    counts_2025_2075 = [counter_2025_2075.get(combo, 0) for combo in all_combinations]

    # Create labels for x-axis
    labels = [f"{day}/{hour:02d}" for day, hour in all_combinations]

    # Create the plot
    fig, ax = plt.subplots(figsize=(16, 6))

    # Create bar chart with all data (1900-2100) in teal
    bars_all = ax.bar(range(len(counts_all)), counts_all, color='#4ECDC4',
                      edgecolor='black', linewidth=0.5, label='1900-2100', alpha=0.7)

    # Overlay with 2025-2075 data in orange
    bars_2025_2075 = ax.bar(range(len(counts_2025_2075)), counts_2025_2075,
                            color='#FF6B6B', edgecolor='black', linewidth=0.5,
                            label='2025-2075', alpha=0.8)

    # Customize the plot
    ax.set_xlabel('March Day / Hour (UTC)', fontsize=12, fontweight='bold')
    ax.set_ylabel('Number of Occurrences', fontsize=12, fontweight='bold')
    ax.set_title('March Equinox Distribution by Day and Hour (1900-2100 with 2025-2075 Overlay)',
                 fontsize=14, fontweight='bold', pad=20)

    # Add legend
    ax.legend(loc='upper right', fontsize=10)

    # Set x-axis ticks - show every 6 hours
    tick_positions = []
    tick_labels = []
    for i, (day, hour) in enumerate(all_combinations):
        if hour % 6 == 0:
            tick_positions.append(i)
            tick_labels.append(f"Mar {day}\n{hour:02d}:00")

    ax.set_xticks(tick_positions)
    ax.set_xticklabels(tick_labels, fontsize=9)

    # Add grid
    ax.grid(axis='y', alpha=0.3, linestyle='--')
    ax.set_axisbelow(True)



    # Add vertical lines to separate days
    day_boundaries = []
    prev_day = None
    for i, (day, hour) in enumerate(all_combinations):
        if prev_day is not None and day != prev_day:
            day_boundaries.append(i - 0.5)
        prev_day = day

    for boundary in day_boundaries:
        ax.axvline(x=boundary, color='black', linestyle='-', linewidth=2, alpha=0.7)

    # Set y-axis to start at 0
    total_all = sum(counts_all)
    total_2025_2075 = sum(counts_2025_2075)
    ax.set_ylim(bottom=0)

    # Tight layout
    plt.tight_layout()

    # Save as SVG
    output_file = 'march_equinox_histogram.svg'
    plt.savefig(output_file, format='svg', dpi=300, bbox_inches='tight')
    print(f"Plot saved as {output_file}")

    # Print summary statistics
    print(f"\nAnalyzed {total_all} March equinox timestamps (1900-2100)")
    print(f"Analyzed {total_2025_2075} March equinox timestamps (2025-2075)")
    days = sorted(set(day for day, hour in day_hour_pairs_all))
    print(f"Date range: Mar {min(days)} to Mar {max(days)}")
    print(f"Max occurrences in any hour (1900-2100): {max(counts_all)}")
    print(f"Max occurrences in any hour (2025-2075): {max(counts_2025_2075)}")

    day_counts_all = Counter(day for day, hour in day_hour_pairs_all)
    day_counts_2025_2075 = Counter(day for day, hour in day_hour_pairs_2025_2075)
    print("\nOccurrences by day (1900-2100):")
    for day in sorted(day_counts_all.keys()):
        print(f"  March {day}: {day_counts_all[day]}")
    print("\nOccurrences by day (2025-2075):")
    for day in sorted(day_counts_2025_2075.keys()):
        print(f"  March {day}: {day_counts_2025_2075[day]}")

if __name__ == '__main__':
    main()
