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

dust is a modular framework for building on-device ML applications around reusable native runtimes and thin integration layers. This repository brings together shared contracts, model lifecycle tooling, ONNX inference, embeddings, and LLM runtimes across Kotlin and Swift, with a first bridge layer for JavaScript-based apps. Those bridge packages currently target Capacitor, but the same native services can be thin-wrapped for React Native, Flutter, or other host technologies.

## Module Index

### Bridge Packages

| Module | Purpose |
| --- | --- |
| [capacitor-core](./capacitor-core/README.md) | Shared bridge-facing ML contracts, interfaces, and value types. |
| [capacitor-llm](./capacitor-llm/README.md) | Current JavaScript bridge for on-device GGUF/llama.cpp inference. |
| [capacitor-onnx](./capacitor-onnx/README.md) | Current JavaScript bridge for ONNX Runtime loading, preprocessing, and inference. |
| [capacitor-serve](./capacitor-serve/README.md) | Current JavaScript bridge for downloads, registry, sessions, and model lifecycle management. |

### Kotlin Libraries

| Module | Purpose |
| --- | --- |
| [dust-core-kotlin](./dust-core-kotlin/README.md) | Core contracts and service abstractions for Android/JVM consumers. |
| [dust-embeddings-kotlin](./dust-embeddings-kotlin/README.md) | Embedding and tokenizer runtime primitives for Android. |
| [dust-llm-kotlin](./dust-llm-kotlin/README.md) | Kotlin-native LLM runtime and GGUF session integrations. |
| [dust-onnx-kotlin](./dust-onnx-kotlin/README.md) | ONNX Runtime session management and tensor preprocessing for Android. |
| [dust-serve-kotlin](./dust-serve-kotlin/README.md) | Model registry, downloads, and session lifecycle services for Android. |

### Swift Libraries

| Module | Purpose |
| --- | --- |
| [dust-core-swift](./dust-core-swift/README.md) | Core protocol and contract types for Swift consumers. |
| [dust-embeddings-swift](./dust-embeddings-swift/README.md) | Tokenizers and embedding runtime primitives for iOS/macOS. |
| [dust-llm-swift](./dust-llm-swift/README.md) | GGUF/llama.cpp inference and chat runtime for iOS/macOS. |
| [dust-onnx-swift](./dust-onnx-swift/README.md) | ONNX Runtime session management and preprocessing for iOS/macOS. |
| [dust-serve-swift](./dust-serve-swift/README.md) | Model registry, downloads, and serving lifecycle services for Swift apps. |

## License

Licensing is defined per module. Refer to each package's `README.md` and local `LICENSE` file where provided. The standalone Dust Kotlin and Swift libraries in this repository ship Apache 2.0 license files; some bridge packages document MIT in their module READMEs.
