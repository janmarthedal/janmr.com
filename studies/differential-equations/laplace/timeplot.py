import matplotlib.pyplot as plt

if True:
    values_dense = [
        [5, 9.383569160709157e-09],
        [10, 1.4055143750738352e-08],
        [15, 2.1442662499612197e-08],
        [20, 2.912154589430429e-08],
        [30, 5.3363749990239746e-08],
        [40, 8.45999665907584e-08],
        [60, 3.531114169745706e-07],
        [80, 3.3368079195497556e-07],
        [100, 4.878085000673309e-07],
        [120, 5.386006679618731e-07],
        [140, 1.04187937482493e-06],
    ]

    values_dia = [
        [5, 4.95630249963142e-07],
        [10, 5.027597500011325e-07],
        [15, 5.062900820048526e-07],
        [20, 5.094051678897813e-07],
        [30, 5.209907499374822e-07],
        [40, 5.290489180479199e-07],
        [60, 5.457374159013853e-07],
        [80, 5.57473583961837e-07],
        [100, 5.852125840028748e-07],
        [120, 5.991714160190896e-07],
        [140, 6.140244179405272e-07],
    ]

    # Compressed Sparse Row
    values_csr = [
        [5, 2.2927458398044113e-08],
        [10, 2.562908330000937e-08],
        [15, 2.856298750266433e-08],
        [20, 3.1470433401409535e-08],
        [30, 3.636534169781953e-08],
        [40, 4.256539160851389e-08],
        [60, 5.8889675000682476e-08],
        [80, 7.153218339662999e-08],
        [100, 8.545045839855447e-08],
        [120, 9.525324180722237e-08],
        [140, 1.0834966649417766e-07],
    ]
else:
    values_dense = [
        [10, 1.4088349998928605e-08],
        [20, 2.9043058399111035e-08],
        [50, 1.2962160402094015e-07],
        [100, 5.629862500354648e-07],
        [500, 7.544136680662633e-06],
        [1000, 2.617681249976158e-05],
        [2000, 0.00010090487499837764],
        [5000, 0.0006201033319812268],
    ]

    values_dia = [
        [10, 5.045036659575999e-07],
        [20, 5.144859160063789e-07],
        [50, 5.37880418007262e-07],
        [100, 5.748463319614529e-07],
        [500, 8.809123319806532e-07],
        [1000, 1.2431849999120458e-06],
        [2000, 2.5437954202061517e-06],
        [5000, 6.091694160131738e-06],
        [10000, 1.1723539599915968e-05],
        [20000, 1.7963795800460503e-05],
        [50000, 6.0145083197858184e-05],
        [100000, 0.00014666602050419897],
        [200000, 0.00030651779199251906],
    ]

    # Compressed Sparse Row
    values_csr = [
        [10, 2.610848330077715e-08],
        [20, 3.0967829102883115e-08],
        [50, 5.2570558199658986e-08],
        [100, 8.560219999635592e-08],
        [500, 3.0900516698602584e-07],
        [1000, 5.855754159856588e-07],
        [2000, 1.6287172949523666e-06],
        [5000, 5.170761680928991e-06],
        [10000, 1.0028499179752542e-05],
        [20000, 1.214179164962843e-05],
        [50000, 4.729053319897503e-05],
        [100000, 0.00012007212502066979],
        [200000, 0.00023276770795928315],
    ]

# Creating the plot with a normal scale for the Y axis
plt.figure(figsize=(10, 5))
plt.plot(list(map(lambda v: v[0], values_dense)), list(
    map(lambda v: v[1], values_dense)), label='Dense', color='blue')
plt.plot(list(map(lambda v: v[0], values_dia)), list(
    map(lambda v: v[1], values_dia)), label='Sparse DIA', color='red')
plt.plot(list(map(lambda v: v[0], values_csr)), list(
    map(lambda v: v[1], values_csr)), label='Sparse CSR', color='green')
# plt.title("Comparative Plot of Two Sets of Y values against X values (Normal Scale)")
plt.xlabel("n")
plt.ylabel("Time (s)")
plt.legend()
plt.grid(True)
plt.show()
