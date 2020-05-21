rand('seed', 2);

N = 100;
rx = 2;
ry = 1;

rad = rand(N, 1) * 2 * pi;
a = 1 + 0.2 * randn(N, 1);

x = rx * cos(rad) .* a;
y = ry * sin(rad) .* a;

A = [x .^ 2, y .^ 2];
b = ones(size(A, 1), 1);

c = ols(b, A);

ax = 1 ./ sqrt(c);

cir = linspace(0, 2 * pi);

fig = figure(1);
plot(x, y, 'ob', "markersize", 5, "markerfacecolor", "auto",
  ax(1) * cos(cir), ax(2) * sin(cir), '-r', "linewidth", 3);
xlabel("x_1");
ylabel("x_2");
axis("equal");

# print(fig, "ellipse.svg", "-dsvg");
