use multiply_by::{MultiplyBy, MultiplyByIterator};

fn main() {
    // let v: Vec<u32> = vec![2, 3, 5, 7, 11];

    for n in MultiplyBy::new(1..5, 5) {
        println!("{}", n);
    }

    for n in (1..5).multiply_by(5) {
        println!("{}", n);
    }
}
