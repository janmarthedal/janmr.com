use itertools::Itertools;

// https://doc.rust-lang.org/1.3.0/std/slice/struct.Permutations.html
// https://en.wikipedia.org/wiki/Steinhaus%E2%80%93Johnson%E2%80%93Trotter_algorithm

#[derive(Copy, Clone)]
enum Direction {
    Pos,
    Neg,
}

/// An `Index` and `Direction` together.
#[derive(Copy, Clone)]
struct SizeDirection {
    size: usize,
    dir: Direction,
}

impl Iterator for ElementSwaps {
    type Item = (usize, usize);

    // #[inline]
    fn next(&mut self) -> Option<(usize, usize)> {
        fn new_pos_wrapping(i: usize, s: Direction) -> usize {
            i.wrapping_add(match s {
                Direction::Pos => 1,
                Direction::Neg => !0, /* aka -1 */
            })
        }

        fn new_pos(i: usize, s: Direction) -> usize {
            match s {
                Direction::Pos => i + 1,
                Direction::Neg => i - 1,
            }
        }

        // Find the index of the largest mobile element:
        // The direction should point into the vector, and the
        // swap should be with a smaller `size` element.
        let max = self
            .sdir
            .iter()
            .cloned()
            .enumerate()
            .filter(|&(i, sd)| {
                new_pos_wrapping(i, sd.dir) < self.sdir.len()
                    && self.sdir[new_pos(i, sd.dir)].size < sd.size
            })
            .max_by_key(|&(_, sd)| sd.size);
        match max {
            Some((i, sd)) => {
                let j = new_pos(i, sd.dir);
                self.sdir.swap(i, j);

                // Swap the direction of each larger SizeDirection
                for x in &mut self.sdir {
                    if x.size > sd.size {
                        x.dir = match x.dir {
                            Direction::Pos => Direction::Neg,
                            Direction::Neg => Direction::Pos,
                        };
                    }
                }
                self.swaps_made += 1;
                Some((i, j))
            }
            None => {
                if self.emit_reset {
                    self.emit_reset = false;
                    if self.sdir.len() > 1 {
                        // The last swap
                        self.swaps_made += 1;
                        Some((0, 1))
                    } else {
                        // Vector is of the form [] or [x], and the only permutation is itself
                        self.swaps_made += 1;
                        Some((0, 0))
                    }
                } else {
                    None
                }
            }
        }
    }

    #[inline]
    fn size_hint(&self) -> (usize, Option<usize>) {
        // For a vector of size n, there are exactly n! permutations.
        let n: usize = (2..self.sdir.len() + 1).product();
        (n - self.swaps_made, Some(n - self.swaps_made))
    }
}

/// An iterator that uses `ElementSwaps` to iterate through
/// all possible permutations of a vector.
///
/// The first iteration yields a clone of the vector as it is,
/// then each successive element is the vector with one
/// swap applied.
///
/// Generates even and odd permutations alternately.
pub struct Permutations<T> {
    swaps: ElementSwaps,
    v: Vec<T>,
}

impl<T: Clone> Iterator for Permutations<T> {
    type Item = Vec<T>;

    #[inline]
    fn next(&mut self) -> Option<Vec<T>> {
        match self.swaps.next() {
            None => None,
            Some((0, 0)) => Some(self.v.clone()),
            Some((a, b)) => {
                let elt = self.v.clone();
                self.v.swap(a, b);
                Some(elt)
            }
        }
    }

    #[inline]
    fn size_hint(&self) -> (usize, Option<usize>) {
        self.swaps.size_hint()
    }
}

pub struct ElementSwaps {
    sdir: Vec<SizeDirection>,
    /// If `true`, emit the last swap that returns the sequence to initial
    /// state.
    emit_reset: bool,
    swaps_made: usize,
}

impl ElementSwaps {
    /// Creates an `ElementSwaps` iterator for a sequence of `length` elements.
    pub fn new(length: usize) -> ElementSwaps {
        // Initialize `sdir` with a direction that position should move in
        // (all negative at the beginning) and the `size` of the
        // element (equal to the original index).
        ElementSwaps {
            emit_reset: true,
            sdir: (0..length)
                .map(|i| SizeDirection {
                    size: i,
                    dir: Direction::Neg,
                })
                .collect(),
            swaps_made: 0,
        }
    }
}

pub fn permutations<T>(s: &[T]) -> Permutations<T>
where
    T: Clone,
{
    Permutations {
        swaps: ElementSwaps::new(s.len()),
        v: s.to_vec(),
    }
}

fn main() {
    /*for p in permutations(&[1, 2, 3]) {
        println!("{:?}", p);
    }*/
    for p in (0..4).permutations(4) {
        println!("{:?}", p);
    }
}
