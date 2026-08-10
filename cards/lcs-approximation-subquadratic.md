---
id: lcs-approximation-subquadratic
title: "Beat the trivial 1/|alphabet| approximation for LCS in truly subquadratic time — the general-alphabet record is an n^{0.4} factor in linear time"
genre: improve-algorithm
problems: ["Longest Common Subsequence"]
hypotheses: [SETH, OV]
record: "Õ(n^{0.4})-approximation in O(n) time, and Õ(n^{2eps/5})-approximation in O(n^{2-eps}) time (general alphabet); (1/2+delta)-approximation in n^{1+eps} time (binary); (1-eps)-approximation in n^2 / 2^{log^{Omega(1)} n} time"
record_ref: "Bringmann, Cohen-Addad & Das, ACM TALG 2023 (arXiv:2106.08195); He & Li (arXiv:2211.16660); Mao & Rubinstein, STOC 2026 (arXiv:2603.29702)"
hardness: "exact: no O(n^{2-eps}) unless SETH fails, even binary; approximation: a deterministic truly subquadratic (1+eps)-approximation over alphabet size n^{o(1)} would imply E^NP lacks non-uniform linear-size Valiant series-parallel circuits; no hardness known for randomized algorithms"
hardness_ref: "Abboud, Backurs & Vassilevska Williams, FOCS 2015; Bringmann & Künnemann, FOCS 2015; Abboud & Backurs, ITCS 2017 (LIPIcs.ITCS.2017.11)"
status: open
confidence: high
verified: 2026-08-10
tags: [strings, approximation, lcs, fine-grained, seth]
---

## Statement

Approximate the length of the longest common subsequence (LCS) of two
length-n strings in truly subquadratic time O(n^{2-delta}). Over an alphabet
of size q, outputting the most frequent shared symbol's matches gives a
trivial 1/q-approximation in linear time; the open challenge is a constant
factor (or even an n^{o(1)} factor) independent of q, over polynomial-size
alphabets, in O(n^{2-delta}) time. Improving the general time-vs-factor
tradeoff — currently an Õ(n^{2eps/5}) factor at time O(n^{2-eps}) — also
closes this card.

## Current record

Exact LCS is SETH-hard below n^2 even for binary strings (Abboud, Backurs &
Vassilevska Williams; Bringmann & Künnemann, both FOCS 2015). For the
approximate version the map splits by alphabet. Binary (and any constant q):
He and Li (arXiv:2211.16660) beat the trivial 1/2 factor, achieving
(1/2 + delta)-approximation in n^{1+eps} time, with q-ary extensions. General
alphabet: Bringmann, Cohen-Addad, and Das (TALG 2023) hold the record — an
Õ(n^{0.4}) approximation factor in linear time, improving the
Hajiaghayi–Seddighin–Seddighin–Sun line, and more generally factor
Õ(n^{2eps/5}) in time O(n^{2-eps}). At the accuracy extreme, Mao and
Rubinstein (STOC 2026, arXiv:2603.29702) compute a (1-eps)-approximation in
n^2 / 2^{log^{Omega(1)} n} time — beating quadratic by a quasi-polynomial
factor, but still n^{2-o(1)}. On the deterministic side, Boneh, Golan, and
Kraus (arXiv:2507.22486) recently gave the first sublinear-factor
deterministic near-linear algorithm, factor O(n^{3/4} log n). So between
"polynomial factor, near-linear time" and "1-eps, barely subquadratic" lies
an enormous unexplained plateau.

## Why it matters

LCS is the alignment problem underlying diff and computational biology, and
its approximability is the cleanest open case of the fine-grained
hardness-of-approximation program: unlike edit distance, where constant
factors fell to near-linear time by 2020, LCS approximation has resisted every
technique beyond the trivial frequency argument once the alphabet grows. A
constant-factor subquadratic algorithm would show LCS behaves like its
complement; a hardness result for randomized algorithms would be the first of
its kind — and Abboud–Backurs (ITCS 2017) proved that even the deterministic
hardness route forces new circuit lower bounds, so any progress here moves a
second frontier.

## Attack surface

The known subquadratic algorithms all combine (a) the frequency argument,
(b) sampling + triangle-inequality-style transfer through a third string, and
(c) birthday-paradox seed matching; the n^{0.4} exponent is exactly where
these balance, and no one has shown the balance is forced. Concrete bites:
(1) improve n^{0.4} to n^{0.39} in linear time — any exponent drop is a
record; (2) alphabet size q = polylog(n): interpolate He–Li's constant-q
machinery to get a o(q) factor there; (3) the regime LCS = Theta(n/q) where
the trivial bound is weakest; (4) derandomization: close the gap between the
randomized n^{0.4} and deterministic n^{3/4} factors, where Abboud–Backurs
says full success implies circuit lower bounds — so even partial progress is
structurally interesting.
