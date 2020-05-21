load poly.mat

x = M(:, 1);
y = M(:, 2);

A = [x .^ 3, x .^ 2, x, ones(size(x))];

c = ols(y, A);

yp = A * c;

figure(1);
plot(x, y, 'ob', "markersize", 5, "markerfacecolor", "auto",
  x, yp, '-r', "linewidth", 3);
xlabel("x");
ylabel("y");

rx = linspace(-2, 4);

figure(2);
subplot(1, 4, 1);
plot(rx, rx .^ 3, '-r', "linewidth", 3);
axis([-2, 4, -5, 5])
grid on
xlabel("x")
ylabel("y=x^3")

subplot(1, 4, 2);
plot(rx, rx .^ 2, '-r', "linewidth", 3);
axis([-2, 4, -5, 5])
grid on
xlabel("x")
ylabel("y=x^2")

subplot(1, 4, 3);
plot(rx, rx, '-r', "linewidth", 3);
axis([-2, 4, -5, 5])
grid on
xlabel("x")
ylabel("y=x")

subplot(1, 4, 4);
plot(rx, ones(size(rx)), '-r', "linewidth", 3);
axis([-2, 4, -5, 5])
grid on
xlabel("x")
ylabel("y=1")
