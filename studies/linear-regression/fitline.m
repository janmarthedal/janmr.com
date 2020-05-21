load poly.mat

x = M(:, 1);
y = M(:, 2);

A = [x, ones(size(x))];

c = ols(y, A)

yp = A * c;

figure(1);
plot(x, y, 'ob', "markersize", 5, "markerfacecolor", "auto",
  x, yp, '-r', "linewidth", 3);
xlabel("x");
ylabel("y");
axis("equal");

figure(2);
subplot(1, 2, 1);
plot(x, A(:, 1), '-r', "linewidth", 3);
xlabel("x");
ylabel("y");
axis("equal");
subplot(1, 2, 2);
plot(x, A(:, 2), '-r', "linewidth", 3);
xlabel("x");
ylabel("y");
axis("equal");
