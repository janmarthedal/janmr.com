x = sort(rand(100, 1)) * 6 - 2;
y = 0.1 * (x .^ 3 - 3 * x .^ 2 - 9 * x) + 0.8 * x + 0.4;
yr = y + 0.4 * randn(size(y));
M = [x, yr];
save poly.mat M
plot(x, yr, "*");
axis("equal")
