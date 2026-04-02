import sys
import math


def compute_parity(n):
    """Compute the parity of a number (count of 1s in binary representation)."""
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count % 2


def generate_path(n):
    """Generate path coordinates based on the parity algorithm."""
    x, y = 0.0, 0.0
    # direction = 30.0  # degrees
    direction = 120.0  # degrees

    lines = []

    # Loop from 0 to 2^n inclusive
    for i in range(2**n + 1):
        parity = compute_parity(i)

        if parity == 0:  # even parity
            # Draw a line 1 unit in current direction
            rad = math.radians(direction)
            new_x = x + math.cos(rad)
            new_y = y + math.sin(rad)
            lines.append((x, y, new_x, new_y))
            x, y = new_x, new_y
        else:  # odd parity
            # Turn 60 degrees counter-clockwise
            direction += 60.0

    return lines


def calculate_bounds(lines):
    """Calculate the bounding box of all lines."""
    if not lines:
        return 0, 0, 0, 0

    min_x = min(min(line[0], line[2]) for line in lines)
    max_x = max(max(line[0], line[2]) for line in lines)
    min_y = min(min(line[1], line[3]) for line in lines)
    max_y = max(max(line[1], line[3]) for line in lines)

    return min_x, min_y, max_x, max_y


def generate_svg(lines, output_file):
    """Generate SVG file with adjusted viewport."""
    if not lines:
        # Empty SVG
        with open(output_file, 'w') as f:
            f.write('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"></svg>\n')
        return

    min_x, min_y, max_x, max_y = calculate_bounds(lines)

    # Add padding
    padding = 10
    width = max_x - min_x + 2 * padding
    height = max_y - min_y + 2 * padding

    # Adjust coordinates to viewport
    viewBox = f"{min_x - padding} {min_y - padding} {width} {height}"

    with open(output_file, 'w') as f:
        f.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewBox}">\n')
        f.write('  <g stroke="black" stroke-width="0.3" stroke-linejoin="round" stroke-linecap="round" fill="none">\n')

        for x1, y1, x2, y2 in lines:
            f.write(f'    <line x1="{x1:.4g}" y1="{y1:.4g}" x2="{x2:.4g}" y2="{y2:.4g}" />\n')

        f.write('  </g>\n')
        f.write('</svg>\n')


def main():
    if len(sys.argv) != 3:
        print("Usage: python main.py <n> <output.svg>")
        sys.exit(1)

    try:
        n = int(sys.argv[1])
        if n < 0:
            print("Error: n must be non-negative")
            sys.exit(1)
    except ValueError:
        print("Error: n must be an integer")
        sys.exit(1)

    output_file = sys.argv[2]

    print(f"Generating path for n={n} (iterating from 0 to {2**n})...")
    lines = generate_path(n)
    print(f"Generated {len(lines)} line segments")

    generate_svg(lines, output_file)
    print(f"SVG written to {output_file}")


if __name__ == "__main__":
    main()
