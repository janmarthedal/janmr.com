use multiply_by::MultiplyByIterator;

fn main() {
    for v in (1..5).multiply_by(5) {
        println!("{}", v);
    }
}
