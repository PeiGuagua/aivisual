import { Visualization } from "@/types";

export const visualizations: Visualization[] = [
  {
    slug: "perceptron",
    title: "Perceptron",
    description:
      "The building block of neural networks. See how inputs, weights, and activation functions work together.",
    category: "basics",
    difficulty: "beginner",
    isPremium: false,
  },
  {
    slug: "gradient-descent",
    title: "Gradient Descent",
    description:
      "Watch how optimization algorithms find the minimum of a loss function step by step.",
    category: "basics",
    difficulty: "beginner",
    isPremium: false,
  },
  {
    slug: "activation-functions",
    title: "Activation Functions",
    description:
      "Compare ReLU, Sigmoid, Tanh and see how they transform signals in a neural network.",
    category: "basics",
    difficulty: "beginner",
    isPremium: false,
  },
  {
    slug: "backpropagation",
    title: "Backpropagation",
    description:
      "Trace how gradients flow backwards through a network to update weights.",
    category: "basics",
    difficulty: "intermediate",
    isPremium: false,
  },
  {
    slug: "cnn",
    title: "Convolutional Neural Network",
    description:
      "See convolution filters slide across images and extract features layer by layer.",
    category: "cnn",
    difficulty: "intermediate",
    isPremium: false,
  },
  {
    slug: "rnn",
    title: "Recurrent Neural Network",
    description:
      "Understand how RNNs process sequences by maintaining hidden state across time steps.",
    category: "rnn",
    difficulty: "intermediate",
    isPremium: true,
  },
  {
    slug: "lstm",
    title: "LSTM",
    description:
      "Explore the gates inside an LSTM cell — forget, input, and output — and how they control memory.",
    category: "rnn",
    difficulty: "advanced",
    isPremium: true,
  },
  {
    slug: "attention-mechanism",
    title: "Attention Mechanism",
    description:
      "Visualize Query, Key, Value matrices and see how attention weights are computed.",
    category: "attention",
    difficulty: "intermediate",
    isPremium: true,
  },
  {
    slug: "transformer",
    title: "Transformer",
    description:
      "The full Transformer architecture — from embeddings through multi-head attention to output.",
    category: "attention",
    difficulty: "advanced",
    isPremium: true,
  },
  {
    slug: "bert",
    title: "BERT",
    description:
      "See how bidirectional encoding and masked language modeling work in BERT.",
    category: "attention",
    difficulty: "advanced",
    isPremium: true,
  },
];
