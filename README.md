<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/branding/dust_white.png">
    <source media="(prefers-color-scheme: light)" srcset="./assets/branding/dust_black.png">
    <img alt="dust" src="./assets/branding/dust_black.png" width="280">
  </picture>
</p>

<h1 align="center">dust</h1>

<p align="center">
  <strong>Device Unified Serving Toolkit</strong><br>
  Multi-platform on-device ML inference framework
</p>

<p align="center">
  <a href="https://github.com/rogelioRuiz/dust/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/License-Apache_2.0-blue.svg"></a>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-informational">
  <img alt="Platforms" src="https://img.shields.io/badge/platforms-Capacitor%20%7C%20Android%20%7C%20iOS%20%2F%20macOS-lightgrey">
  <img alt="Packages" src="https://img.shields.io/badge/packages-15-success">
</p>

<p align="center">
  <a href="https://github.com/rogelioRuiz/dust/actions/workflows/ci-kotlin.yml">
    <img alt="CI Kotlin" src="https://github.com/rogelioRuiz/dust/actions/workflows/ci-kotlin.yml/badge.svg?branch=main">
  </a>
  <a href="https://github.com/rogelioRuiz/dust/actions/workflows/ci-swift.yml">
    <img alt="CI Swift" src="https://github.com/rogelioRuiz/dust/actions/workflows/ci-swift.yml/badge.svg?branch=main">
  </a>
  <a href="https://github.com/rogelioRuiz/dust/actions/workflows/ci-capacitor.yml">
    <img alt="CI Capacitor" src="https://github.com/rogelioRuiz/dust/actions/workflows/ci-capacitor.yml/badge.svg?branch=main">
  </a>
</p>

---

dust is a modular framework for building on-device ML applications around reusable native runtimes and thin integration layers. This repository brings together shared contracts, model lifecycle tooling, ONNX inference, embeddings, and LLM runtimes across Kotlin and Swift, with a first bridge layer for JavaScript-based apps. Those bridge packages currently target Capacitor, but the same native services can be thin-wrapped for React Native, Flutter, or other host technologies.

## Ecosystem

The framework ships as 15 packages across three tiers. Each package lives in its own repository; this root repo is the central index, cross-reference hub, and documentation site.

### Bridge Packages — Capacitor / JavaScript

| Package | npm | Purpose |
| --- | --- | --- |
| [capacitor-core](./capacitor-core/README.md) | `@dust/capacitor-core` | Shared bridge-facing ML contracts, interfaces, and value types. |
| [capacitor-llm](./capacitor-llm/README.md) | `@dust/capacitor-llm` | JavaScript bridge for on-device GGUF/llama.cpp inference. |
| [capacitor-onnx](./capacitor-onnx/README.md) | `@dust/capacitor-onnx` | JavaScript bridge for ONNX Runtime loading, preprocessing, and inference. |
| [capacitor-serve](./capacitor-serve/README.md) | `@dust/capacitor-serve` | JavaScript bridge for downloads, registry, sessions, and model lifecycle. |
| [capacitor-embeddings](./capacitor-embeddings/README.md) | `@dust/capacitor-embeddings` | JavaScript bridge for tokenization and embedding inference. |

### Kotlin Libraries — Android / JVM

| Package | Maven | Purpose |
| --- | --- | --- |
| [dust-core-kotlin](./dust-core-kotlin/README.md) | `io.t6x.dust:dust-core` | Core contracts and service abstractions — pure JVM, no Android dependency. |
| [dust-llm-kotlin](./dust-llm-kotlin/README.md) | `io.t6x.dust:dust-llm` | GGUF/llama.cpp inference and chat runtime with JNI bindings. |
| [dust-onnx-kotlin](./dust-onnx-kotlin/README.md) | `io.t6x.dust:dust-onnx` | ONNX Runtime session management and tensor preprocessing for Android. |
| [dust-embeddings-kotlin](./dust-embeddings-kotlin/README.md) | `io.t6x.dust:dust-embeddings` | Tokenizers and embedding runtime primitives for Android. |
| [dust-serve-kotlin](./dust-serve-kotlin/README.md) | `io.t6x.dust:dust-serve` | Model registry, downloads, and session lifecycle services for Android. |

### Swift Libraries — iOS / macOS

| Package | SPM / CocoaPods | Purpose |
| --- | --- | --- |
| [dust-core-swift](./dust-core-swift/README.md) | `DustCore` | Core protocol and contract types — pure Swift, no external dependencies. |
| [dust-llm-swift](./dust-llm-swift/README.md) | `DustLlm` | GGUF/llama.cpp inference and chat runtime with Metal acceleration. |
| [dust-onnx-swift](./dust-onnx-swift/README.md) | `DustOnnx` | ONNX Runtime session management and preprocessing for Apple platforms. |
| [dust-embeddings-swift](./dust-embeddings-swift/README.md) | `DustEmbeddings` | Tokenizers and embedding runtime primitives for iOS/macOS. |
| [dust-serve-swift](./dust-serve-swift/README.md) | `DustServe` | Model registry, downloads, and serving lifecycle services for Swift apps. |

## Architecture

The three tiers compose vertically: bridge packages expose app-facing APIs, native runtimes own actual inference and downloads, and core contracts define the shared interfaces that bind everything together.

```
┌───────────────────────────────────── Bridge Layer (Capacitor) ─────────────────────────────────────┐
│  capacitor-core   capacitor-llm   capacitor-onnx   capacitor-serve   capacitor-embeddings          │
└─────────────────────────────────────────┬──────────────────────────────────────────────────────────┘
                                          │ thin wrappers over
        ┌─────────────────────────────────┴────────────────────────────────────┐
        │                    Native Runtimes                                   │
        │  ┌─────────────────────────────────┐  ┌────────────────────────────┐│
        │  │  Kotlin / Android               │  │  Swift / Apple             ││
        │  │  dust-llm-kotlin                │  │  dust-llm-swift            ││
        │  │  dust-onnx-kotlin               │  │  dust-onnx-swift           ││
        │  │  dust-embeddings-kotlin         │  │  dust-embeddings-swift     ││
        │  │  dust-serve-kotlin              │  │  dust-serve-swift          ││
        │  └────────────────┬────────────────┘  └──────────────┬─────────────┘│
        └───────────────────┼─────────────────────────────────┼───────────────┘
                            │ implement                        │ implement
        ┌───────────────────┴─────────────────────────────────┴───────────────┐
        │                    Core Contracts                                   │
        │         dust-core-kotlin          dust-core-swift                   │
        │    ModelServer · ModelSession · VectorStore · EmbeddingService      │
        └─────────────────────────────────────────────────────────────────────┘
```

## Quick Start

### Capacitor / npm

```bash
npm install @dust/capacitor-core @dust/capacitor-llm @dust/capacitor-serve
npx cap sync
```

### Android / Gradle

```groovy
// settings.gradle — local workspace
include ':dust-core-kotlin', ':dust-llm-kotlin'
project(':dust-core-kotlin').projectDir = new File('../dust-core-kotlin')
project(':dust-llm-kotlin').projectDir   = new File('../dust-llm-kotlin')

// app/build.gradle
dependencies {
    implementation project(':dust-llm-kotlin')  // transitively includes dust-core-kotlin
}
```

### iOS / Swift Package Manager

```swift
// Package.swift
.package(name: "dust-core-swift", path: "../dust-core-swift"),
.package(name: "dust-llm-swift",  path: "../dust-llm-swift"),
```

### iOS / CocoaPods

```ruby
pod 'DustCore', :path => '../dust-core-swift'
pod 'DustLlm',  :path => '../dust-llm-swift'
```

## Repository Layout

```
dust/                          ← this repo (central index + docs)
├── assets/branding/           ← dust_black.png · dust_white.png
├── docs/                      ← GitHub Pages site (deployed via .github/workflows/pages.yml)
├── scripts/                   ← shared tooling
├── capacitor-core/            ← Capacitor bridge package (own git repo)
├── capacitor-llm/
├── capacitor-onnx/
├── capacitor-serve/
├── capacitor-embeddings/
├── dust-core-kotlin/          ← Kotlin library (own git repo)
├── dust-llm-kotlin/
├── dust-onnx-kotlin/
├── dust-embeddings-kotlin/
├── dust-serve-kotlin/
├── dust-core-swift/           ← Swift library (own git repo)
├── dust-llm-swift/
├── dust-onnx-swift/
├── dust-embeddings-swift/
└── dust-serve-swift/
```

Each package directory is an independent git repository listed in `.gitignore`. This root repo is the umbrella that holds cross-package documentation, branding assets, and the GitHub Pages site.

## License

Copyright 2026 Rogelio Ruiz Perez. Licensed under the [Apache License 2.0](LICENSE).
