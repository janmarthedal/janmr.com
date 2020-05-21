load poly.mat

x = M(:, 1);
y = M(:, 2);

A = [-x .* (x <= 0), (x - 2) .* (x >= 2), ones(size(x))];

c = ols(y, A);

xp = linspace(-2, 4, 100)';
Ap = [-xp .* (xp <= 0), (xp - 2) .* (xp >= 2), ones(size(xp))];
yp = Ap * c;

figure(1);
plot(x, y, 'ob', "markersize", 5, "markerfacecolor", "auto",
  xp, yp, '-r', "linewidth", 3);
xlabel("x");
ylabel("y");

rx = linspace(-2, 4);

figure(2);
subplot(1, 3, 1);
plot(rx, -rx .* (rx <= 0), '-r', "linewidth", 3);
axis([-2, 4, -5, 5])
grid on
xlabel("x")
ylabel("y")

subplot(1, 3, 2);
plot(rx, (rx - 2) .* (rx >= 2), '-r', "linewidth", 3);
axis([-2, 4, -5, 5])
grid on
xlabel("x")
ylabel("y")

subplot(1, 3, 3);
plot(rx, ones(size(rx)), '-r', "linewidth", 3);
axis([-2, 4, -5, 5])
grid on
xlabel("x")
ylabel("y=1")
