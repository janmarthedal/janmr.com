import matplotlib.pyplot as plt
import numpy as np


def is_prime(n):
    """Check if a number is prime."""
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(np.sqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True


def sieve_of_eratosthenes(limit):
    """Generate primes up to limit using Sieve of Eratosthenes."""
    is_prime = [True] * (limit + 1)
    is_prime[0] = is_prime[1] = False

    for i in range(2, int(np.sqrt(limit)) + 1):
        if is_prime[i]:
            for j in range(i * i, limit + 1, i):
                is_prime[j] = False

    return [i for i in range(2, limit + 1) if is_prime[i]]


def compute_prime_gaps(num_gaps):
    """Compute the first num_gaps prime gaps."""
    # Estimate how many primes we need
    # Using prime number theorem: nth prime ≈ n * ln(n)
    # For 100,000 gaps, we need 100,001 primes
    # The 100,001st prime is approximately 1,299,709
    estimated_limit = int((num_gaps + 1) * (np.log(num_gaps + 1) + np.log(np.log(num_gaps + 1)) + 2))

    print(f"Generating primes up to approximately {estimated_limit:,}...")
    primes = sieve_of_eratosthenes(estimated_limit)

    # If we don't have enough primes, increase the limit
    while len(primes) < num_gaps + 1:
        estimated_limit = int(estimated_limit * 1.5)
        print(f"Need more primes, increasing limit to {estimated_limit:,}...")
        primes = sieve_of_eratosthenes(estimated_limit)

    print(f"Found {len(primes):,} primes")

    # Compute gaps
    gaps = [primes[i + 1] - primes[i] for i in range(num_gaps)]

    return gaps, primes[:num_gaps + 1]


def plot_prime_gaps(gaps):
    """Plot the prime gaps."""
    fig, axes = plt.subplots(2, 1, figsize=(12, 10))

    # Plot 1: Prime gaps over index
    axes[0].scatter(range(len(gaps)), gaps, s=1, alpha=0.5)
    axes[0].set_xlabel('Index')
    axes[0].set_ylabel('Gap Size')
    axes[0].set_title('Prime Gaps')
    axes[0].grid(True, alpha=0.3)

    # Plot 2: Histogram of gap sizes
    unique_gaps, counts = np.unique(gaps, return_counts=True)
    axes[1].bar(unique_gaps, counts, width=0.8, alpha=0.7)
    axes[1].set_xlabel('Gap Size')
    axes[1].set_ylabel('Frequency')
    axes[1].set_title('Distribution of Prime Gap Sizes')
    axes[1].grid(True, alpha=0.3, axis='y')

    plt.tight_layout()
    plt.savefig('prime_gaps.png', dpi=150)
    print("Plot saved as 'prime_gaps.png'")
    plt.show()


def print_statistics(gaps):
    """Print statistics about the prime gaps."""
    print("\n" + "=" * 50)
    print("PRIME GAP STATISTICS")
    print("=" * 50)
    print(f"Total gaps computed: {len(gaps):,}")
    print(f"Minimum gap: {min(gaps)}")
    print(f"Maximum gap: {max(gaps)}")
    print(f"Mean gap: {np.mean(gaps):.2f}")
    print(f"Median gap: {np.median(gaps):.1f}")
    print(f"Standard deviation: {np.std(gaps):.2f}")

    # Count twin primes (gap = 2)
    twin_prime_count = sum(1 for g in gaps if g == 2)
    print(f"\nTwin prime gaps (gap = 2): {twin_prime_count:,} ({twin_prime_count/len(gaps)*100:.2f}%)")

    # Show most common gaps
    unique_gaps, counts = np.unique(gaps, return_counts=True)
    sorted_indices = np.argsort(counts)[::-1]
    print("\nMost common gap sizes:")
    for i in range(min(10, len(unique_gaps))):
        idx = sorted_indices[i]
        gap_size = unique_gaps[idx]
        count = counts[idx]
        print(f"  Gap {gap_size}: {count:,} times ({count/len(gaps)*100:.2f}%)")


def main():
    num_gaps = 100000

    print(f"Computing the first {num_gaps:,} prime gaps...\n")

    gaps, primes = compute_prime_gaps(num_gaps)

    print(f"\nFirst 10 primes: {primes[:10]}")
    print(f"First 10 gaps: {gaps[:10]}")
    print(f"Last 10 gaps: {gaps[-10:]}")

    print_statistics(gaps)

    print("\nGenerating plots...")
    plot_prime_gaps(gaps)

    print("\nDone!")


if __name__ == "__main__":
    main()
