from fractions import Fraction


def to_continued_fraction(f: Fraction) -> list[int]:
    num, den = f.numerator, f.denominator
    cf = []
    while den > 0:
        cf.append(num // den)
        num, den = den, num % den
    return cf


def from_continued_fraction(cf: list[int]) -> Fraction:
    assert cf, "Continued fraction cannot be empty"
    if len(cf) == 1:
        return Fraction(cf[0])
    return Fraction(cf[0]) + Fraction(1) / from_continued_fraction(cf[1:])


def bounds(f: Fraction):
    cf = to_continued_fraction(f)
    print(cf)
    for n in range(len(cf)):
        print(f"{n}: {from_continued_fraction(cf[: n + 1])}")


if __name__ == "__main__":
    bounds(Fraction(301029, 1000000))
    bounds(Fraction(301030, 1000000))
