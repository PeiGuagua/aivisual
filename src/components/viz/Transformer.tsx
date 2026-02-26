"use client";

import { useState, useMemo } from "react";

// ============================================================
// Step 1: Architecture Overview
// ============================================================
function ArchitectureOverview() {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

  const blocks = [
    {
      id: "input-embed",
      label: "Input\nEmbedding",
      x: 60,
      y: 520,
      w: 120,
      h: 50,
      color: "#3b82f6",
      desc: "Convert each token (word) into a 512-dimensional vector. Like giving each word a unique coordinate in high-dimensional space.",
    },
    {
      id: "pos-enc",
      label: "Positional\nEncoding",
      x: 60,
      y: 450,
      w: 120,
      h: 50,
      color: "#6366f1",
      desc: "Add position information to each embedding. Since Transformer has no recurrence, it needs to know word order through these sinusoidal signals.",
    },
    {
      id: "enc-attn",
      label: "Multi-Head\nSelf-Attention",
      x: 60,
      y: 340,
      w: 120,
      h: 50,
      color: "#a78bfa",
      desc: "Each word looks at ALL other words to understand context. 'Bank' attends to 'river' vs 'money' to determine its meaning. This is the core innovation.",
    },
    {
      id: "enc-addnorm1",
      label: "Add & Norm",
      x: 60,
      y: 280,
      w: 120,
      h: 35,
      color: "#64748b",
      desc: "Residual connection (add input back) + Layer Normalization. Helps gradients flow and stabilizes training.",
    },
    {
      id: "enc-ffn",
      label: "Feed\nForward",
      x: 60,
      y: 220,
      w: 120,
      h: 50,
      color: "#f59e0b",
      desc: "Two linear layers with ReLU: FFN(x) = max(0, xW₁+b₁)W₂+b₂. Expands to 2048 dims then back to 512. This is where the model 'thinks'.",
    },
    {
      id: "enc-addnorm2",
      label: "Add & Norm",
      x: 60,
      y: 160,
      w: 120,
      h: 35,
      color: "#64748b",
      desc: "Another residual connection + normalization after the feed-forward layer.",
    },
    {
      id: "enc-nx",
      label: "× 6",
      x: 20,
      y: 155,
      w: 30,
      h: 25,
      color: "#ef4444",
      desc: "The encoder has 6 identical layers stacked. Each layer refines the representation further.",
    },
    // Decoder side
    {
      id: "output-embed",
      label: "Output\nEmbedding",
      x: 320,
      y: 520,
      w: 120,
      h: 50,
      color: "#3b82f6",
      desc: "Same as input embedding but for the target sequence (shifted right). During translation, these are the words generated so far.",
    },
    {
      id: "dec-pos-enc",
      label: "Positional\nEncoding",
      x: 320,
      y: 450,
      w: 120,
      h: 50,
      color: "#6366f1",
      desc: "Same positional encoding added to decoder embeddings.",
    },
    {
      id: "dec-masked-attn",
      label: "Masked\nSelf-Attention",
      x: 320,
      y: 360,
      w: 120,
      h: 50,
      color: "#ec4899",
      desc: "Like encoder self-attention, but MASKED: each position can only attend to earlier positions. Prevents the decoder from 'cheating' by looking at future words.",
    },
    {
      id: "dec-cross-attn",
      label: "Cross\nAttention",
      x: 320,
      y: 270,
      w: 120,
      h: 50,
      color: "#a78bfa",
      desc: "Decoder attends to encoder output. Q comes from decoder, K and V come from encoder. This is how the decoder 'reads' the input sentence.",
    },
    {
      id: "dec-ffn",
      label: "Feed\nForward",
      x: 320,
      y: 180,
      w: 120,
      h: 50,
      color: "#f59e0b",
      desc: "Same feed-forward network as encoder.",
    },
    {
      id: "dec-nx",
      label: "× 6",
      x: 280,
      y: 175,
      w: 30,
      h: 25,
      color: "#ef4444",
      desc: "Decoder also has 6 identical layers.",
    },
    {
      id: "linear",
      label: "Linear",
      x: 320,
      y: 100,
      w: 120,
      h: 40,
      color: "#10b981",
      desc: "Project decoder output to vocabulary size (e.g., 30,000 words). Each dimension is a score for one word.",
    },
    {
      id: "softmax",
      label: "Softmax",
      x: 320,
      y: 40,
      w: 120,
      h: 40,
      color: "#10b981",
      desc: "Convert scores to probabilities. The highest probability word is the prediction. P(word) = e^score / Σe^scores",
    },
  ];

  const hovered = blocks.find((b) => b.id === hoveredBlock);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0d0d0d] p-4 lg:w-1/2">
        <svg viewBox="0 0 500 600" className="mx-auto h-auto w-full">
          {/* Encoder box */}
          <rect x="15" y="140" width="195" height="445" rx="12" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <text x="112" y="595" fill="#3b82f6" fontSize="12" textAnchor="middle" opacity="0.5">ENCODER</text>

          {/* Decoder box */}
          <rect x="275" y="30" width="195" height="555" rx="12" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <text x="372" y="595" fill="#a78bfa" fontSize="12" textAnchor="middle" opacity="0.5">DECODER</text>

          {/* Arrow from encoder to decoder cross-attention */}
          <path d="M 180 195 C 250 195, 250 295, 320 295" fill="none" stroke="#a78bfa" strokeWidth="2" opacity="0.5" markerEnd="url(#arrowhead)" />

          {/* Blocks */}
          {blocks.map((b) => {
            const isHovered = hoveredBlock === b.id;
            const lines = b.label.split("\n");
            return (
              <g
                key={b.id}
                onMouseEnter={() => setHoveredBlock(b.id)}
                onMouseLeave={() => setHoveredBlock(null)}
                className="cursor-pointer"
              >
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx="8"
                  fill={isHovered ? b.color : `${b.color}33`}
                  stroke={b.color}
                  strokeWidth={isHovered ? 2 : 1}
                  opacity={isHovered ? 1 : 0.8}
                />
                {lines.map((line, li) => (
                  <text
                    key={li}
                    x={b.x + b.w / 2}
                    y={b.y + b.h / 2 + (li - (lines.length - 1) / 2) * 14}
                    fill="white"
                    fontSize="11"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* Vertical flow arrows - encoder */}
          {[
            [120, 515, 120, 505],
            [120, 445, 120, 400],
            [120, 335, 120, 320],
            [120, 275, 120, 275],
            [120, 215, 120, 200],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={`ea-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#555" strokeWidth="1" markerEnd="url(#arrowhead)" />
          ))}

          {/* Vertical flow arrows - decoder */}
          {[
            [380, 515, 380, 505],
            [380, 445, 380, 415],
            [380, 355, 380, 325],
            [380, 265, 380, 235],
            [380, 175, 380, 145],
            [380, 95, 380, 85],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={`da-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#555" strokeWidth="1" markerEnd="url(#arrowhead)" />
          ))}

          {/* Input / Output labels */}
          <text x="120" y="585" fill="#9ca3af" fontSize="11" textAnchor="middle">inputs: &quot;I love AI&quot;</text>
          <text x="380" y="585" fill="#9ca3af" fontSize="11" textAnchor="middle">outputs (shifted right)</text>
          <text x="380" y="25" fill="#10b981" fontSize="11" textAnchor="middle">output probabilities</text>

          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#555" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Info panel */}
      <div className="flex flex-col justify-center lg:w-1/2">
        {hovered ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-1 text-lg font-bold text-white">{hovered.label.replace("\n", " ")}</h3>
            <p className="text-sm leading-relaxed text-gray-400">{hovered.desc}</p>
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-2 text-lg font-bold text-white">Transformer Architecture</h3>
            <p className="mb-4 text-sm text-gray-400">
              From the paper &quot;Attention Is All You Need&quot; (Vaswani et al., 2017).
            </p>
            <p className="text-sm text-gray-500">
              Hover over any block to see a detailed explanation.
            </p>
            <div className="mt-4 space-y-2 text-xs text-gray-500">
              <p>Key insight: Replace all recurrence (RNN) with attention. This allows parallel processing and better long-range dependencies.</p>
              <p>The encoder reads the entire input at once. The decoder generates output one token at a time, attending to the encoder&apos;s representation.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Step 2: Embedding + Positional Encoding
// ============================================================
function EmbeddingViz() {
  const tokens = ["I", "love", "AI"];
  const embDim = 8; // simplified

  // Fake embeddings for visualization
  const embeddings = [
    [0.2, -0.5, 0.8, 0.1, -0.3, 0.6, -0.1, 0.4],
    [0.7, 0.3, -0.2, 0.5, 0.1, -0.4, 0.8, -0.6],
    [-0.1, 0.6, 0.3, -0.7, 0.4, 0.2, -0.5, 0.9],
  ];

  // Positional encodings (simplified sinusoidal)
  const posEnc = tokens.map((_, pos) =>
    Array.from({ length: embDim }, (_, i) =>
      i % 2 === 0
        ? Math.sin(pos / Math.pow(10000, i / embDim))
        : Math.cos(pos / Math.pow(10000, (i - 1) / embDim))
    )
  );

  const final = embeddings.map((emb, t) =>
    emb.map((v, i) => v + posEnc[t][i])
  );

  const colorScale = (v: number) => {
    const norm = (v + 1) / 2; // -1~1 → 0~1
    const r = Math.round(59 + norm * (167 - 59));
    const g = Math.round(130 + norm * (139 - 130));
    const b = Math.round(246 + norm * (250 - 246));
    return `rgb(${r},${g},${b})`;
  };

  const MatrixRow = ({ label, values }: { label: string; values: number[] }) => (
    <div className="flex items-center gap-2">
      <span className="w-12 text-right text-xs text-gray-400">{label}</span>
      <div className="flex gap-1">
        {values.map((v, i) => (
          <div
            key={i}
            className="flex h-8 w-8 items-center justify-center rounded text-[10px] font-mono text-white sm:h-10 sm:w-10"
            style={{ backgroundColor: colorScale(v), opacity: 0.8 }}
            title={v.toFixed(3)}
          >
            {v.toFixed(1)}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <p className="mb-4 text-sm text-gray-400">
          <strong className="text-white">Problem:</strong> Transformer sees all tokens at once (no sequential processing).
          So how does it know that &quot;I&quot; comes before &quot;love&quot;?
        </p>
        <p className="text-sm text-gray-400">
          <strong className="text-white">Solution:</strong> Add positional information directly into the embeddings
          using sine and cosine functions at different frequencies.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Token Embeddings */}
        <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4">
          <h4 className="mb-3 text-sm font-semibold text-blue-400">Token Embedding</h4>
          <div className="space-y-2">
            {tokens.map((t, i) => (
              <MatrixRow key={t} label={`"${t}"`} values={embeddings[i]} />
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">Each word → d_model (512) dim vector. Simplified to 8 dims here.</p>
        </div>

        {/* Positional Encoding */}
        <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4">
          <h4 className="mb-3 text-sm font-semibold text-purple-400">+ Positional Encoding</h4>
          <div className="space-y-2">
            {tokens.map((t, i) => (
              <MatrixRow key={t} label={`pos ${i}`} values={posEnc[i]} />
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">PE(pos,2i) = sin(pos/10000^(2i/d))<br />PE(pos,2i+1) = cos(pos/10000^(2i/d))</p>
        </div>

        {/* Final */}
        <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4">
          <h4 className="mb-3 text-sm font-semibold text-green-400">= Final Input</h4>
          <div className="space-y-2">
            {tokens.map((t, i) => (
              <MatrixRow key={t} label={`"${t}"`} values={final[i]} />
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">Now each vector knows both meaning AND position.</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Step 3: Self-Attention (Core)
// ============================================================
function SelfAttentionViz() {
  const tokens = ["I", "love", "AI"];
  const [selectedToken, setSelectedToken] = useState(0);

  // Simplified Q, K, V matrices (3 tokens × 4 dims)
  const Q = [
    [1.2, 0.3, -0.5, 0.8],
    [0.4, 1.1, 0.2, -0.3],
    [-0.2, 0.7, 1.0, 0.5],
  ];
  const K = [
    [0.8, -0.2, 0.6, 0.1],
    [0.3, 0.9, -0.4, 0.7],
    [0.5, 0.4, 0.8, -0.6],
  ];
  const V = [
    [0.1, 0.9, -0.3, 0.5],
    [0.6, -0.2, 0.7, 0.3],
    [-0.4, 0.5, 0.1, 0.8],
  ];

  // Compute attention scores: Q × K^T / sqrt(d_k)
  const dk = 4;
  const scores = Q.map((q) =>
    K.map((k) =>
      q.reduce((sum, qi, i) => sum + qi * k[i], 0) / Math.sqrt(dk)
    )
  );

  // Softmax per row
  const softmax = (arr: number[]) => {
    const max = Math.max(...arr);
    const exps = arr.map((v) => Math.exp(v - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map((e) => e / sum);
  };

  const attentionWeights = scores.map(softmax);

  // Output: attention weights × V
  const output = attentionWeights.map((weights) =>
    Array.from({ length: dk }, (_, j) =>
      weights.reduce((sum, w, i) => sum + w * V[i][j], 0)
    )
  );

  const heatColor = (v: number, max: number) => {
    const norm = v / (max || 1);
    return `rgba(167, 139, 250, ${norm * 0.8 + 0.1})`;
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-gray-400">
          <strong className="text-white">Self-Attention</strong> is the core of Transformer.
          For each word, it asks: <em className="text-purple-300">&quot;Which other words should I pay attention to?&quot;</em>
        </p>
        <p className="mt-2 text-sm text-gray-400">
          It computes three vectors for each token: <strong className="text-blue-400">Query</strong> (what am I looking for?),
          <strong className="text-green-400"> Key</strong> (what do I contain?),
          <strong className="text-yellow-400"> Value</strong> (what information do I carry?).
        </p>
      </div>

      {/* Token selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-400">Viewing attention for:</span>
        {tokens.map((t, i) => (
          <button
            key={t}
            onClick={() => setSelectedToken(i)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              selectedToken === i
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            &quot;{t}&quot;
          </button>
        ))}
      </div>

      {/* Formula */}
      <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4">
        <p className="font-mono text-sm text-gray-300">
          Attention(Q, K, V) = softmax(Q × K<sup>T</sup> / √d<sub>k</sub>) × V
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Attention scores matrix */}
        <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4">
          <h4 className="mb-3 text-sm font-semibold text-white">
            Attention Weights (after softmax)
          </h4>
          <p className="mb-3 text-xs text-gray-500">
            Row = Query token, Column = Key token. Higher = more attention.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 text-xs text-gray-500" />
                  {tokens.map((t) => (
                    <th key={t} className="p-2 text-center text-xs text-gray-400">
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tokens.map((t, i) => (
                  <tr key={t}>
                    <td className="p-2 text-xs font-medium text-gray-400">{t}</td>
                    {attentionWeights[i].map((w, j) => (
                      <td
                        key={j}
                        className={`p-2 text-center font-mono text-xs text-white ${
                          i === selectedToken ? "font-bold" : ""
                        }`}
                        style={{
                          backgroundColor:
                            i === selectedToken
                              ? heatColor(w, Math.max(...attentionWeights[i]))
                              : "transparent",
                          borderRadius: "4px",
                        }}
                      >
                        {w.toFixed(3)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual attention */}
        <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4">
          <h4 className="mb-3 text-sm font-semibold text-white">
            &quot;{tokens[selectedToken]}&quot; attends to:
          </h4>
          <div className="space-y-3">
            {tokens.map((t, i) => {
              const w = attentionWeights[selectedToken][i];
              const maxW = Math.max(...attentionWeights[selectedToken]);
              return (
                <div key={t} className="flex items-center gap-3">
                  <span className="w-12 text-sm text-gray-400">&quot;{t}&quot;</span>
                  <div className="h-8 flex-1 overflow-hidden rounded-lg bg-white/5">
                    <div
                      className="flex h-full items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 transition-all duration-500"
                      style={{ width: `${(w / maxW) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-white">
                        {(w * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-gray-500">
            The output for &quot;{tokens[selectedToken]}&quot; is a weighted combination of all Value vectors,
            using these attention weights.
          </p>
        </div>
      </div>

      {/* Q K V matrices */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { name: "Query (Q)", data: Q, color: "text-blue-400" },
          { name: "Key (K)", data: K, color: "text-green-400" },
          { name: "Value (V)", data: V, color: "text-yellow-400" },
        ].map(({ name, data, color }) => (
          <div key={name} className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4">
            <h4 className={`mb-2 text-sm font-semibold ${color}`}>{name}</h4>
            <div className="space-y-1">
              {data.map((row, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="w-8 text-[10px] text-gray-500">{tokens[i]}</span>
                  <div className="flex gap-1">
                    {row.map((v, j) => (
                      <span key={j} className="inline-block w-10 rounded bg-white/5 py-0.5 text-center font-mono text-[10px] text-gray-300">
                        {v.toFixed(1)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h4 className="mb-2 text-sm font-semibold text-white">Output for &quot;{tokens[selectedToken]}&quot;</h4>
        <div className="flex gap-2">
          {output[selectedToken].map((v, i) => (
            <span key={i} className="rounded bg-purple-500/20 px-3 py-1 font-mono text-sm text-purple-300">
              {v.toFixed(3)}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          = {tokens.map((t, i) => `${attentionWeights[selectedToken][i].toFixed(3)} × V("${t}")`).join(" + ")}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// Step 4: Multi-Head Attention
// ============================================================
function MultiHeadViz() {
  const [activeHead, setActiveHead] = useState(0);
  const heads = [
    { name: "Head 1", focus: "Syntactic (语法)", example: "Subject ↔ Verb", weights: [0.1, 0.7, 0.2] },
    { name: "Head 2", focus: "Semantic (语义)", example: "Adjective → Noun", weights: [0.3, 0.2, 0.5] },
    { name: "Head 3", focus: "Positional (位置)", example: "Nearby words", weights: [0.5, 0.3, 0.2] },
    { name: "Head 4", focus: "Long-range (长距离)", example: "Coreference", weights: [0.4, 0.1, 0.5] },
  ];
  const tokens = ["I", "love", "AI"];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-gray-400">
          <strong className="text-white">Why multiple heads?</strong> One attention head can only focus on one type of relationship.
          The paper uses <strong className="text-purple-300">8 heads</strong>, each learning different patterns:
          one might track grammar, another tracks meaning, another tracks position.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Each head operates on a smaller dimension (d_model/h = 512/8 = 64), so total compute is similar to single full-dimension attention.
        </p>
      </div>

      {/* Head selector */}
      <div className="flex flex-wrap gap-2">
        {heads.map((h, i) => (
          <button
            key={h.name}
            onClick={() => setActiveHead(i)}
            className={`rounded-lg px-4 py-2 text-sm transition ${
              activeHead === i
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            {h.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active head detail */}
        <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-6">
          <h4 className="text-lg font-bold text-white">{heads[activeHead].name}</h4>
          <p className="mt-1 text-sm text-purple-400">{heads[activeHead].focus}</p>
          <p className="mt-1 text-xs text-gray-500">Pattern: {heads[activeHead].example}</p>

          <div className="mt-6 space-y-3">
            {tokens.map((t, i) => (
              <div key={t} className="flex items-center gap-3">
                <span className="w-12 text-sm text-gray-400">&quot;{t}&quot;</span>
                <div className="h-6 flex-1 overflow-hidden rounded bg-white/5">
                  <div
                    className="h-full rounded bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                    style={{ width: `${heads[activeHead].weights[i] * 100}%` }}
                  />
                </div>
                <span className="w-12 text-right font-mono text-xs text-gray-400">
                  {(heads[activeHead].weights[i] * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Concat + Linear */}
        <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-6">
          <h4 className="mb-4 text-sm font-semibold text-white">How Multi-Head Works</h4>
          <div className="space-y-4 text-sm text-gray-400">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-blue-400">1.</span>
              <p>Split d_model into h heads: 512 → 8 × 64</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-blue-400">2.</span>
              <p>Each head computes attention independently (in parallel)</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-blue-400">3.</span>
              <p>Concatenate all head outputs: 8 × 64 → 512</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-blue-400">4.</span>
              <p>Linear projection: W_O × Concat → final output (512)</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-white/5 p-4 font-mono text-xs text-gray-300">
            MultiHead(Q,K,V) = Concat(head₁,...,head₈) × W_O<br />
            where head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Step 5: Feed-Forward + Residual + LayerNorm
// ============================================================
function FFNResidualViz() {
  const [inputVal, setInputVal] = useState(0.5);

  // Simulate FFN
  const w1Out = Math.max(0, inputVal * 1.5 - 0.3); // ReLU
  const w2Out = w1Out * 0.8 + 0.1;
  const residual = w2Out + inputVal;

  // Simple layer norm simulation
  const mean = residual;
  const normed = (residual - mean * 0.9) / 0.3 + 0.1;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-gray-400">
          After attention, each position passes through a <strong className="text-yellow-400">Feed-Forward Network</strong> (independently).
          Both sublayers use <strong className="text-blue-400">Residual Connections</strong> and <strong className="text-green-400">Layer Normalization</strong>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* FFN */}
        <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-6">
          <h4 className="mb-4 text-sm font-semibold text-yellow-400">Feed-Forward Network</h4>

          <div className="mb-4">
            <div className="mb-1 flex justify-between text-xs text-gray-400">
              <span>Input value</span>
              <span>{inputVal.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={-1}
              max={1}
              step={0.01}
              value={inputVal}
              onChange={(e) => setInputVal(parseFloat(e.target.value))}
              className="w-full accent-yellow-500"
            />
          </div>

          <div className="space-y-3 font-mono text-sm">
            <div className="flex items-center justify-between rounded bg-white/5 px-3 py-2">
              <span className="text-gray-400">Linear₁ (512→2048)</span>
              <span className="text-gray-300">{(inputVal * 1.5 - 0.3).toFixed(3)}</span>
            </div>
            <div className="flex items-center justify-between rounded bg-white/5 px-3 py-2">
              <span className="text-yellow-400">ReLU</span>
              <span className="text-yellow-300">{w1Out.toFixed(3)}</span>
            </div>
            <div className="flex items-center justify-between rounded bg-white/5 px-3 py-2">
              <span className="text-gray-400">Linear₂ (2048→512)</span>
              <span className="text-gray-300">{w2Out.toFixed(3)}</span>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-white/5 p-3 text-xs text-gray-400">
            FFN(x) = max(0, xW₁ + b₁)W₂ + b₂<br />
            The inner layer is 4× larger (2048 vs 512), giving the model more capacity to process information.
          </div>
        </div>

        {/* Residual + LayerNorm */}
        <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-6">
          <h4 className="mb-4 text-sm font-semibold text-blue-400">Residual + Layer Norm</h4>

          <div className="space-y-3 font-mono text-sm">
            <div className="flex items-center justify-between rounded bg-white/5 px-3 py-2">
              <span className="text-gray-400">Sublayer input (x)</span>
              <span className="text-gray-300">{inputVal.toFixed(3)}</span>
            </div>
            <div className="flex items-center justify-between rounded bg-white/5 px-3 py-2">
              <span className="text-gray-400">Sublayer output</span>
              <span className="text-gray-300">{w2Out.toFixed(3)}</span>
            </div>
            <div className="flex items-center justify-between rounded bg-blue-500/10 px-3 py-2">
              <span className="text-blue-400">+ Residual (x + output)</span>
              <span className="text-blue-300">{residual.toFixed(3)}</span>
            </div>
            <div className="flex items-center justify-between rounded bg-green-500/10 px-3 py-2">
              <span className="text-green-400">LayerNorm</span>
              <span className="text-green-300">{normed.toFixed(3)}</span>
            </div>
          </div>

          <div className="mt-4 space-y-3 text-xs text-gray-400">
            <div className="rounded-lg bg-white/5 p-3">
              <strong className="text-blue-400">Residual Connection:</strong> output = x + Sublayer(x)<br />
              Allows gradients to flow directly through the network. Without this, deep networks are very hard to train.
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <strong className="text-green-400">Layer Normalization:</strong> normalize across features<br />
              Stabilizes training by keeping values in a reasonable range.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Step 6: Full Forward Pass
// ============================================================
function FullForwardPass() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Input Tokens",
      desc: "The sentence \"I love AI\" is split into tokens.",
      visual: "[ I ] [ love ] [ AI ]",
      color: "text-gray-300",
    },
    {
      title: "Token Embedding",
      desc: "Each token is mapped to a 512-dimensional vector via a learned lookup table.",
      visual: "[ 0.2, -0.5, 0.8, ... ] × 3 tokens",
      color: "text-blue-400",
    },
    {
      title: "+ Positional Encoding",
      desc: "Sinusoidal position signals are added so the model knows word order.",
      visual: "embed + PE → [ 0.7, -0.1, 1.2, ... ] × 3",
      color: "text-purple-400",
    },
    {
      title: "Encoder Self-Attention (×6 layers)",
      desc: "Each token attends to all tokens. Q×K^T/√d → softmax → ×V. Each word now 'understands' context.",
      visual: "\"AI\" now contains info from \"I\" and \"love\"",
      color: "text-purple-400",
    },
    {
      title: "Encoder FFN (×6 layers)",
      desc: "Each position passes through FFN independently. Add & Norm after each sublayer.",
      visual: "FFN(x) = ReLU(xW₁+b₁)W₂+b₂",
      color: "text-yellow-400",
    },
    {
      title: "Encoder Output",
      desc: "After 6 layers, we have a rich contextual representation of the input. This is sent to the decoder.",
      visual: "encoder_output: [3 × 512] matrix",
      color: "text-green-400",
    },
    {
      title: "Decoder Masked Self-Attention",
      desc: "Decoder processes output tokens, but each can only attend to previous tokens (no future peeking).",
      visual: "token₂ sees [token₁, token₂] only",
      color: "text-pink-400",
    },
    {
      title: "Decoder Cross-Attention",
      desc: "Q from decoder, K+V from encoder. This is how the decoder 'reads' the source sentence.",
      visual: "decoder asks → encoder answers",
      color: "text-purple-400",
    },
    {
      title: "Linear + Softmax → Output",
      desc: "Project to vocabulary size, apply softmax. The highest probability word is the next prediction.",
      visual: "P('love')=0.02 P('AI')=0.95 P('is')=0.01...",
      color: "text-green-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-gray-400">
          Walk through the complete forward pass of a Transformer, step by step.
          This is what happens when the model processes a sentence.
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`h-2 flex-1 rounded-full transition ${
              i <= step
                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                : "bg-white/10"
            }`}
          />
        ))}
      </div>

      {/* Current step */}
      <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-8">
        <div className="mb-2 text-xs text-gray-500">
          Step {step + 1} of {steps.length}
        </div>
        <h3 className={`mb-3 text-xl font-bold ${steps[step].color}`}>
          {steps[step].title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-gray-400">
          {steps[step].desc}
        </p>
        <div className="rounded-lg bg-white/5 p-4 font-mono text-sm text-gray-300">
          {steps[step].visual}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="rounded-lg border border-white/10 px-6 py-2 text-sm text-white transition hover:bg-white/5 disabled:opacity-30"
        >
          Previous
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-30"
        >
          Next
        </button>
      </div>

      {/* All steps overview */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h4 className="mb-4 text-sm font-semibold text-white">All Steps</h4>
        <div className="space-y-2">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                i === step
                  ? "bg-white/10 text-white"
                  : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
              }`}
            >
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                i < step
                  ? "bg-green-500/20 text-green-400"
                  : i === step
                  ? "bg-purple-500/20 text-purple-400"
                  : "bg-white/5 text-gray-600"
              }`}>
                {i < step ? "✓" : i + 1}
              </span>
              {s.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Main Transformer Component
// ============================================================
const tabs = [
  { id: "overview", label: "1. Architecture", component: ArchitectureOverview },
  { id: "embedding", label: "2. Embedding", component: EmbeddingViz },
  { id: "attention", label: "3. Self-Attention", component: SelfAttentionViz },
  { id: "multihead", label: "4. Multi-Head", component: MultiHeadViz },
  { id: "ffn", label: "5. FFN + Residual", component: FFNResidualViz },
  { id: "forward", label: "6. Full Pass", component: FullForwardPass },
];

export default function Transformer() {
  const [activeTab, setActiveTab] = useState("overview");

  const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component ?? ArchitectureOverview;

  return (
    <div className="space-y-6">
      {/* Tab navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <ActiveComponent />
    </div>
  );
}
