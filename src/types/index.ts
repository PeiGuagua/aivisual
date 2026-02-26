export interface Visualization {
  slug: string;
  title: string;
  description: string;
  category: "basics" | "cnn" | "rnn" | "attention" | "generative";
  difficulty: "beginner" | "intermediate" | "advanced";
  isPremium: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: "free" | "pro" | "team";
  aiGenerationsUsed: number;
  aiGenerationsLimit: number;
}

export interface PricingPlan {
  name: string;
  price: number;
  period: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}
