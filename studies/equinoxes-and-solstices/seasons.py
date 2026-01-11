"""
Compute equinoxes and solstices for a given year using skyfield.
"""

from skyfield import api, almanac
from skyfield.timelib import Time
from typing import Dict


def load_ephemeris():
    """
    Load the ephemeris data required for astronomical calculations.

    Returns:
        Tuple of (Timescale, Ephemeris) for calculating planetary positions.
    """
    ts = api.load.timescale()
    eph = api.load('de430_1850-2150.bsp')  # JPL ephemeris data
    return ts, eph


def get_seasons(year: int) -> Dict[str, Time]:
    """
    Compute all four equinoxes and solstices for a given year (Northern Hemisphere).

    Season codes from skyfield:
    - 0 = March Equinox (Vernal/Spring Equinox)
    - 1 = June Solstice (Summer Solstice)
    - 2 = September Equinox (Autumnal/Fall Equinox)
    - 3 = December Solstice (Winter Solstice)

    Args:
        year: The year for which to compute the seasonal events.

    Returns:
        Dictionary mapping season names to skyfield Time objects.
    """
    ts, eph = load_ephemeris()

    # Define the time range for the search (entire year)
    t0 = ts.utc(year, 1, 1)
    t1 = ts.utc(year + 1, 1, 1)

    # Find all season starts in the year
    times, seasons = almanac.find_discrete(t0, t1, almanac.seasons(eph))

    # Map season codes to names
    season_names = {
        0: 'March Equinox',
        1: 'June Solstice',
        2: 'September Equinox',
        3: 'December Solstice'
    }

    # Build result dictionary
    result = {}
    for time, season_code in zip(times, seasons):
        season_name = season_names[season_code]
        result[season_name] = time

    return result


def winter_solstice(year: int) -> Time:
    """
    Compute the time of the winter solstice (Northern Hemisphere) for a given year.

    The winter solstice occurs when the Sun reaches its southernmost point,
    corresponding to an ecliptic longitude of 270 degrees.

    Args:
        year: The year for which to compute the winter solstice.

    Returns:
        A skyfield Time object representing the moment of winter solstice.
    """
    seasons = get_seasons(year)
    return seasons['December Solstice']


def spring_equinox(year: int) -> Time:
    """
    Compute the time of the spring equinox (Northern Hemisphere) for a given year.

    Args:
        year: The year for which to compute the spring equinox.

    Returns:
        A skyfield Time object representing the moment of spring equinox.
    """
    seasons = get_seasons(year)
    return seasons['March Equinox']


def summer_solstice(year: int) -> Time:
    """
    Compute the time of the summer solstice (Northern Hemisphere) for a given year.

    Args:
        year: The year for which to compute the summer solstice.

    Returns:
        A skyfield Time object representing the moment of summer solstice.
    """
    seasons = get_seasons(year)
    return seasons['June Solstice']


def autumn_equinox(year: int) -> Time:
    """
    Compute the time of the autumn equinox (Northern Hemisphere) for a given year.

    Args:
        year: The year for which to compute the autumn equinox.

    Returns:
        A skyfield Time object representing the moment of autumn equinox.
    """
    seasons = get_seasons(year)
    return seasons['September Equinox']


def format_time(time: Time) -> str:
    """
    Format a skyfield Time object as an ISO 8601 string (without timezone suffix).

    Args:
        time: Skyfield Time object to format.

    Returns:
        String in format 'YYYY-MM-DD HH:MM:SS'.
    """
    utc = time.utc_datetime()
    return utc.isoformat()[:19] + 'Z'


def main():
    """
    Example usage: compute all equinoxes and solstices for several years.
    Output in CSV format.
    """
    # Print CSV header
    print("Year,March Equinox,June Solstice,September Equinox,December Solstice")

    # Print data rows
    for year in range(1900, 2101):
        seasons = get_seasons(year)

        # Get times in chronological order
        march_eq = format_time(seasons['March Equinox'])
        june_sol = format_time(seasons['June Solstice'])
        sept_eq = format_time(seasons['September Equinox'])
        dec_sol = format_time(seasons['December Solstice'])

        print(f"{year},{march_eq},{june_sol},{sept_eq},{dec_sol}")


if __name__ == "__main__":
    main()
