import numpy as np
import matplotlib.pyplot as plt
from scipy.spatial import Delaunay
from shapely.geometry import Point, Polygon
import matplotlib.patches as mpatches
from matplotlib.colors import LinearSegmentedColormap


def create_boundary_points(width, height, num_points_per_side=40):
    """Create boundary points for a rectangle."""
    points = []
    
    # Bottom edge
    x_bottom = np.linspace(0, width, num_points_per_side)
    for x in x_bottom[:-1]:
        points.append([x, 0])
    
    # Right edge
    y_right = np.linspace(0, height, num_points_per_side)
    for y in y_right[:-1]:
        points.append([width, y])
    
    # Top edge
    x_top = np.linspace(width, 0, num_points_per_side)
    for x in x_top[:-1]:
        points.append([x, height])
    
    # Left edge
    y_left = np.linspace(height, 0, num_points_per_side)
    for y in y_left[:-1]:
        points.append([0, y])
    
    return np.array(points)


def generate_interior_points(width, height, spacing=60, randomness=0.5):
    """Generate interior points for triangulation with jitter."""
    interior_points = []
    
    x_points = np.arange(spacing, width, spacing)
    y_points = np.arange(spacing, height, spacing)
    
    for x in x_points:
        for y in y_points:
            jitter_x = (np.random.random() - 0.5) * spacing * randomness
            jitter_y = (np.random.random() - 0.5) * spacing * randomness
            
            x_jittered = max(1, min(width - 1, x + jitter_x))
            y_jittered = max(1, min(height - 1, y + jitter_y))
            
            interior_points.append([x_jittered, y_jittered])
    
    return np.array(interior_points)


def wave_solution(x, y, width, height, t=0):
    """
    Simulate a PDE solution - combination of wave-like functions.
    This creates a mathematical field over the mesh.
    """
    # Normalize coordinates to [0, 1]
    x_norm = x / width
    y_norm = y / height
    
    # Combine multiple wave patterns
    value = (
        0.3 * np.sin(3 * np.pi * x_norm + t) * np.cos(2 * np.pi * y_norm) +
        0.3 * np.cos(2 * np.pi * x_norm) * np.sin(3 * np.pi * y_norm + t) +
        0.2 * np.sin(4 * np.pi * (x_norm + y_norm)) +
        0.2 * np.cos(2 * np.pi * np.sqrt(x_norm**2 + y_norm**2))
    )
    
    return value


def create_bright_mesh_image(width=1200, height=630, output_file='bright_mesh.png'):
    """
    Create a very bright image with finite element mesh inspired by PDEs.
    Perfect as a base for text overlay.
    """
    print(f"Generating bright mesh image: {width}x{height}")
    
    # Set random seed for reproducibility
    np.random.seed(42)
    
    # Create boundary and interior points
    boundary_points = create_boundary_points(width, height, num_points_per_side=50)
    interior_points = generate_interior_points(width, height, spacing=50, randomness=0.4)
    
    # Combine all points
    all_points = np.vstack([boundary_points, interior_points])
    print(f"Total points: {len(all_points)}")
    
    # Perform Delaunay triangulation
    tri = Delaunay(all_points)
    print(f"Generated {len(tri.simplices)} triangles")
    
    # Calculate PDE solution values at each point
    pde_values = wave_solution(all_points[:, 0], all_points[:, 1], width, height, t=1.5)
    
    # Normalize values to [0, 1] for color mapping
    pde_values_norm = (pde_values - pde_values.min()) / (pde_values.max() - pde_values.min())
    
    # Create the plot with white background
    fig = plt.figure(figsize=(width/100, height/100), dpi=100, facecolor='white')
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_facecolor('white')
    
    # Create a very light, bright colormap (pale blues and whites)
    colors = ['#FFFFFF', '#F0F8FF', '#E6F3FF', '#D4EBFF', '#C8E4FF']
    n_bins = 100
    cmap = LinearSegmentedColormap.from_list('bright_blue', colors, N=n_bins)
    
    # Plot filled triangles with very light colors based on PDE solution
    for simplex in tri.simplices:
        triangle_points = all_points[simplex]
        # Average value for this triangle
        avg_value = np.mean(pde_values_norm[simplex])
        color = cmap(avg_value)
        
        triangle = mpatches.Polygon(triangle_points, 
                                    facecolor=color, 
                                    edgecolor='none',
                                    alpha=0.8)
        ax.add_patch(triangle)
    
    # Plot mesh edges with very light blue lines
    ax.triplot(all_points[:, 0], all_points[:, 1], tri.simplices, 
              color='#B8D4E8', linewidth=0.4, alpha=0.6)
    
    # Add subtle node points
    ax.plot(all_points[:, 0], all_points[:, 1], 'o', 
           color='#A0C8E0', markersize=1.2, alpha=0.5)
    
    # Add some accent nodes at specific locations for visual interest
    # Highlight some nodes based on PDE value
    threshold_high = np.percentile(pde_values_norm, 90)
    threshold_low = np.percentile(pde_values_norm, 10)
    
    high_value_points = all_points[pde_values_norm > threshold_high]
    low_value_points = all_points[pde_values_norm < threshold_low]
    
    ax.plot(high_value_points[:, 0], high_value_points[:, 1], 'o', 
           color='#7AB8E8', markersize=2, alpha=0.7)
    ax.plot(low_value_points[:, 0], low_value_points[:, 1], 'o', 
           color='#A8D0F0', markersize=2, alpha=0.5)
    
    # Set limits and aspect
    ax.set_xlim(0, width)
    ax.set_ylim(0, height)
    ax.set_aspect('equal')
    
    # Remove axes
    ax.axis('off')
    
    # Save the figure with high quality
    plt.savefig(output_file, dpi=100, bbox_inches='tight', 
               pad_inches=0, facecolor='white', edgecolor='none')
    print(f"Bright mesh image saved to {output_file}")
    
    print(f"\nImage Statistics:")
    print(f"  Dimensions: {width}x{height}")
    print(f"  Vertices: {len(all_points)}")
    print(f"  Triangles: {len(tri.simplices)}")
    print(f"  Background: Bright white")
    print(f"  Style: PDE/FEM inspired with soft blue tones")
    
    plt.close()


def main():
    print("Creating Bright Mesh Base Image")
    print("=" * 60)
    print("This image is designed as a bright base for text overlay,")
    print("inspired by partial differential equations and finite elements.")
    print("=" * 60)
    
    create_bright_mesh_image(
        width=1200,
        height=630,
        output_file='bright_mesh_1200x630.png'
    )
    
    print("=" * 60)
    print("Done! The image is ready for text overlay.")


if __name__ == "__main__":
    main()