"""
Convert seasons.csv to an HTML table with time elements.
"""

import csv
from pathlib import Path


def parse_datetime(dt_string):
    """
    Parse a datetime string and extract components.
    
    Args:
        dt_string: String in format 'YYYY-MM-DDTHH:MM:SSZ'
    
    Returns:
        Tuple of (full_datetime, display_text) where:
        - full_datetime is the original string
        - display_text is 'MM-DD HH:MM:SS' format
    """
    # Remove 'T' and 'Z' and split into date and time
    dt_string = dt_string.replace('T', ' ').replace('Z', '')
    date_part, time_part = dt_string.split(' ')
    year, month, day = date_part.split('-')
    
    # Format for display (without year and month)
    # Day part with class, time part with class
    display_text = f'<span class="day">{day}</span> <span class="time">{time_part}</span>'
    
    # Full datetime for attribute (ISO 8601 format)
    full_datetime = f"{date_part}T{time_part}Z"
    
    return full_datetime, display_text


def csv_to_html(csv_file):
    """
    Read CSV file and generate HTML table.
    
    Args:
        csv_file: Path to the CSV file
    
    Returns:
        String containing the HTML table
    """
    html_parts = []
    html_parts.append('<!DOCTYPE html>')
    html_parts.append('<html lang="en">')
    html_parts.append('<head>')
    html_parts.append('  <meta charset="UTF-8">')
    html_parts.append('  <meta name="viewport" content="width=device-width, initial-scale=1.0">')
    html_parts.append('  <title>Equinoxes and Solstices</title>')
    html_parts.append('  <style>')
    html_parts.append('    table { border-collapse: collapse; margin: 20px; }')
    html_parts.append('    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }')
    html_parts.append('    th { background-color: #f2f2f2; }')
    html_parts.append('    tr:hover { background-color: #f5f5f5; }')
    html_parts.append('    .day { font-weight: bold; }')
    html_parts.append('    .time { font-family: monospace; }')
    html_parts.append('  </style>')
    html_parts.append('</head>')
    html_parts.append('<body>')
    html_parts.append('  <table>')
    
    with open(csv_file, 'r') as f:
        reader = csv.reader(f)
        
        # Process header row
        header = next(reader)
        html_parts.append('    <thead>')
        html_parts.append('      <tr>')
        for col in header:
            html_parts.append(f'        <th>{col}</th>')
        html_parts.append('      </tr>')
        html_parts.append('    </thead>')
        
        # Process data rows
        html_parts.append('    <tbody>')
        for row in reader:
            if not row or not row[0].strip():  # Skip empty rows
                continue
            
            year = row[0]
            html_parts.append(f'      <tr id="{year}">')
            
            # Year column (first column)
            html_parts.append(f'        <td>{year}</td>')
            
            # Season columns (columns 2-5)
            for i in range(1, 5):
                if i < len(row):
                    datetime_attr, display_text = parse_datetime(row[i])
                    html_parts.append(f'        <td><time datetime="{datetime_attr}">{display_text}</time></td>')
                else:
                    html_parts.append('        <td></td>')
            
            html_parts.append('      </tr>')
        
        html_parts.append('    </tbody>')
    
    html_parts.append('  </table>')
    html_parts.append('</body>')
    html_parts.append('</html>')
    
    return '\n'.join(html_parts)


def main():
    """
    Main function to convert seasons.csv to HTML.
    """
    csv_file = Path(__file__).parent / 'seasons.csv'
    
    if not csv_file.exists():
        print(f"Error: {csv_file} not found")
        return
    
    html_output = csv_to_html(csv_file)
    print(html_output)


if __name__ == "__main__":
    main()