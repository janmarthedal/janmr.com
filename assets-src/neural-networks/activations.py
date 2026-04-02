import numpy as np
import matplotlib.pyplot as plt

# Compute error/loss function
def compute_error(A, Y):
    m = Y.shape[1]   # number of training examples
    return 0.5 * np.linalg.norm(A - Y, 'fro') ** 2 / m

def sigmoid(x):
    return 1.0 / (1.0 + np.exp(-x))

def sigmoid_prime(x):
    t = sigmoid(x)
    return t * (1 - t)

# Activation functions and their derivatives
SIGMOID_ACTIVATION = (sigmoid, sigmoid_prime)
IDENTITY_ACTIVATION = (lambda x: x, lambda x: np.ones(x.shape))
RELU_ACTIVATION = (lambda x: (x >= 0) * x, lambda x: x >= 0)

def show(activation, aspect, filename=None):
    xs1 = np.linspace(-5, -1e-10, 50)
    xs2 = np.linspace(0, 5, 50)
    xs = np.linspace(-5, 5, 100)
    # plt.gca().set_aspect(aspect)
    plt.figure(figsize=(12, 12 * aspect))
    plt.plot(xs1, activation[1](xs1), 'r', label='derivative')
    plt.plot(xs2, activation[1](xs2), 'r')
    plt.plot(xs, activation[0](xs), 'b', label='activation function')
    plt.legend(loc='upper left')
    if filename is not None:
        plt.savefig(filename, bbox_inches='tight')
    else:
        plt.show()

show(SIGMOID_ACTIVATION, 0.3, 'sigmoid.svg')
# show(RELU_ACTIVATION, 0.3, 'relu.svg')
