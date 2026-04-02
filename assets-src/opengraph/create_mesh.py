import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from scipy.spatial import Delaunay
from shapely.geometry import Point, Polygon
from shapely.affinity import scale
import matplotlib.patches as mpatches


def create_rounded_rectangle_boundary(width, height, corner_radius, num_points_per_side=50, num_points_per_corner=20):
    """
    Create boundary points for a rounded rectangle.
    
    Parameters:
    - width: width of the rectangle
    - height: height of the rectangle
    - corner_radius: radius of the rounded corners
    - num_points_per_side: number of points along each straight edge
    - num_points_per_corner: number of points along each rounded corner
    
    Returns:
    - numpy array of boundary points
    """
    points = []
    r = corner_radius
    
    # Bottom edge (left to right, excluding corners)
    x_bottom = np.linspace(r, width - r, num_points_per_side)
    for x in x_bottom:
        points.append([x, 0])
    
    # Bottom-right corner
    angles = np.linspace(-np.pi/2, 0, num_points_per_corner)
    for angle in angles:
        x = width - r + r * np.cos(angle)
        y = r + r * np.sin(angle)
        points.append([x, y])
    
    # Right edge (bottom to top, excluding corners)
    y_right = np.linspace(r, height - r, num_points_per_side)
    for y in y_right:
        points.append([width, y])
    
    # Top-right corner
    angles = np.linspace(0, np.pi/2, num_points_per_corner)
    for angle in angles:
        x = width - r + r * np.cos(angle)
        y = height - r + r * np.sin(angle)
        points.append([x, y])
    
    # Top edge (right to left, excluding corners)
    x_top = np.linspace(width - r, r, num_points_per_side)
    for x in x_top:
        points.append([x, height])
    
    # Top-left corner
    angles = np.linspace(np.pi/2, np.pi, num_points_per_corner)
    for angle in angles:
        x = r + r * np.cos(angle)
        y = height - r + r * np.sin(angle)
        points.append([x, y])
    
    # Left edge (top to bottom, excluding corners)
    y_left = np.linspace(height - r, r, num_points_per_side)
    for y in y_left:
        points.append([0, y])
    
    # Bottom-left corner
    angles = np.linspace(np.pi, 3*np.pi/2, num_points_per_corner)
    for angle in angles:
        x = r + r * np.cos(angle)
        y = r + r * np.sin(angle)
        points.append([x, y])
    
    return np.array(points)


def generate_interior_points(width, height, corner_radius, spacing=30, randomness=0.7):
    """
    Generate interior points for triangulation.
    
    Parameters:
    - width: width of the rectangle
    - height: height of the rectangle
    - corner_radius: radius of the rounded corners
    - spacing: approximate spacing between interior points
    - randomness: amount of random jitter (0.0 = regular grid, 1.0 = maximum randomness)
    
    Returns:
    - numpy array of interior points
    """
    # Create a shapely polygon for the rounded rectangle
    # We'll use a simplified approach with a buffer
    rect_polygon = Polygon([
        (corner_radius, 0),
        (width - corner_radius, 0),
        (width, corner_radius),
        (width, height - corner_radius),
        (width - corner_radius, height),
        (corner_radius, height),
        (0, height - corner_radius),
        (0, corner_radius)
    ]).buffer(corner_radius, resolution=16)
    
    interior_points = []
    
    # Generate a grid of points
    x_points = np.arange(spacing/2, width, spacing)
    y_points = np.arange(spacing/2, height, spacing)
    
    for x in x_points:
        for y in y_points:
            # Add random jitter to make triangles irregular
            jitter_x = (np.random.random() - 0.5) * spacing * randomness
            jitter_y = (np.random.random() - 0.5) * spacing * randomness
            
            x_jittered = x + jitter_x
            y_jittered = y + jitter_y
            
            point = Point(x_jittered, y_jittered)
            # Check if point is inside the rounded rectangle
            if rect_polygon.contains(point):
                interior_points.append([x_jittered, y_jittered])
    
    return np.array(interior_points)


def create_mesh_triangulation(width=1200, height=630, corner_radius=10, output_file='mesh_triangulation.png', randomness=0.7):
    """
    Create a 2D mesh triangulation inside a rounded rectangle and save as PNG.
    
    Parameters:
    - width: width of the rectangle (default: 1200)
    - height: height of the rectangle (default: 630)
    - corner_radius: radius of the rounded corners (default: 10)
    - output_file: output PNG file name (default: 'mesh_triangulation.png')
    - randomness: irregularity of triangles, 0.0-1.0 (default: 0.7)
    """
    print(f"Generating mesh for rounded rectangle: {width}x{height}, corner radius: {corner_radius}")
    
    # Create boundary points
    boundary_points = create_rounded_rectangle_boundary(width, height, corner_radius)
    print(f"Generated {len(boundary_points)} boundary points")
    
    # Generate interior points
    interior_points = generate_interior_points(width, height, corner_radius, spacing=40, randomness=randomness)
    print(f"Generated {len(interior_points)} interior points")
    
    # Combine all points
    all_points = np.vstack([boundary_points, interior_points])
    print(f"Total points: {len(all_points)}")
    
    # Perform Delaunay triangulation
    tri = Delaunay(all_points)
    print(f"Generated {len(tri.simplices)} triangles")
    
    # Create the plot
    fig, ax = plt.subplots(1, 1, figsize=(16, 8.4))
    
    # Plot the triangulation
    ax.triplot(all_points[:, 0], all_points[:, 1], tri.simplices, 'b-', linewidth=0.5)
    
    # Plot the points
    ax.plot(all_points[:, 0], all_points[:, 1], 'ro', markersize=2)
    
    # Set equal aspect ratio and limits
    ax.set_aspect('equal')
    ax.set_xlim(-50, width + 50)
    ax.set_ylim(-50, height + 50)
    
    # Add labels and title
    ax.set_xlabel('X', fontsize=12)
    ax.set_ylabel('Y', fontsize=12)
    ax.set_title(f'2D Mesh Triangulation - Rounded Rectangle ({width}x{height}, r={corner_radius})', 
                 fontsize=14, fontweight='bold')
    
    # Add grid
    ax.grid(True, alpha=0.3)
    
    # Save the figure
    plt.tight_layout()
    plt.savefig(output_file, dpi=150, bbox_inches='tight')
    print(f"Mesh saved to {output_file}")
    
    # Also display some statistics
    print(f"\nMesh Statistics:")
    print(f"  Vertices: {len(all_points)}")
    print(f"  Triangles: {len(tri.simplices)}")
    print(f"  Boundary vertices: {len(boundary_points)}")
    print(f"  Interior vertices: {len(interior_points)}")
    
    plt.close()


def main():
    print("Starting 2D Mesh Triangulation")
    print("=" * 50)
    
    # Create mesh with specified dimensions
    create_mesh_triangulation(
        width=1200,
        height=630,
        corner_radius=10,
        output_file='mesh_triangulation.png',
        randomness=0.7  # 0.0 = regular grid, 1.0 = maximum irregularity
    )
    
    print("=" * 50)
    print("Done!")


if __name__ == "__main__":
    main()