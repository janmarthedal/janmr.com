---
title: Leap Year Rules
date: '2020-04-15'
layout: layouts/post.njk
tags:
  - datetime
categories:
  - programming
excerpt: >-
  According to the The Astronomical Almanac, a tropical year comprises a
  complete cycle of seasons and is approximately 365 days, 5 hours, 48 minutes,
  45 seconds, or 365.242188 days.

  Such a complete cycle of seasons could be measured as one solstice or equinox
  to the next corresponding solstice or equinox. The length of a tropical year,
  however, is not constant. For instance, the length of tropical years as
  measured from one March equinox to the next can vary up to 30 minutes.
---
According to the [The Astronomical Almanac](https://web.archive.org/web/20191003172307/http://asa.usno.navy.mil/SecM/Glossary.html), a *tropical year* comprises a complete cycle of seasons and is approximately 365 days, 5 hours, 48 minutes, 45 seconds, or 365.242188 days.

Such a complete cycle of seasons could be measured as one [solstice](https://en.wikipedia.org/wiki/Solstice) or [equinox](https://en.wikipedia.org/wiki/Equinox) to the next corresponding solstice or equinox. The length of a tropical year, however, [is not constant](http://www.astropixels.com/ephemeris/soleq2001.html). For instance, the length of tropical years as measured from one [March equinox](https://www.timeanddate.com/calendar/march-equinox.html) to the next can [vary up to 30 minutes](https://www.timeanddate.com/astronomy/tropicalyearlength.html).

The [Gregorian calendar](https://en.wikipedia.org/wiki/Gregorian_calendar) handles the fact that a tropical year is not a whole number by introducing the concept of *leap years*: Every year is 365 days except for leap years which are 366 days. The rule for determining leap years according to [The Astronomical Almanac](https://web.archive.org/web/20191003172307/http://asa.usno.navy.mil/SecM/Glossary.html#calendar-gregorian) is:

> In the Gregorian calendar, every year that is exactly divisible by four is a leap year, except for
> centurial years, which must be exactly divisible by 400 to be leap years.

How well does this approximate the "ideal" 365.242188 days? Let us approach this by refining the approximating step by step.

If we only had a leap year for years divisible by 4, the average year length would be

$$
\frac{4 \cdot 365 + 1}{4} = 365.25.
$$

If we now made years divisible by 100 into common years, the average year length would be

$$
\frac{100 \cdot 365 + 25 - 1}{100} = 365.24.
$$

Finally, if we turned the years divisible by 400 into leap years, we would get

$$
\frac{400 \cdot 365 + 100 - 4 + 1}{400} = 365.2425
$$

which is the approximation the rules for the Gregorian calendar gives us. The difference from the tropical year length is thus about 27 seconds per year.

Let us briefly consider turning these leap year rules into code. There are numerous ways of doing it, but one short and efficient way of doing it is (here using [Rust](https://www.rust-lang.org/))

``` rust
pub fn is_leap_year(year: u64) -> bool {
    year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
}
```

By first checking for the divisibily by 4 means that, on average, 75% of the tested years will resolve to `false` without having to check for divisibily by 100 or 400 (assuming [short-circuit evaluation](https://en.wikipedia.org/wiki/Short-circuit_evaluation)).
