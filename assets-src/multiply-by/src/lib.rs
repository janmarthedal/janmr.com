pub struct MultiplyBy<I, T> {
    iter: I,
    factor: T,
}

impl<I, T> Iterator for MultiplyBy<I, T>
where
    I: Iterator<Item = T>,
    T: std::ops::Mul<Output = T> + Copy,
{
    type Item = T;
    fn next(&mut self) -> Option<Self::Item> {
        self.iter.next().map(|v| v * self.factor)
    }
}

impl<I, T> MultiplyBy<I, T> {
    pub fn new(iter: I, factor: T) -> Self {
        Self { iter, factor }
    }
}

pub trait MultiplyByIterator<T>: Iterator<Item = T> + Sized {
    fn multiply_by(self, factor: T) -> MultiplyBy<Self, T> {
        MultiplyBy::new(self, factor)
    }
}

impl<T, I: Iterator<Item = T>> MultiplyByIterator<T> for I {}
