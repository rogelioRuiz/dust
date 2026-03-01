#!/usr/bin/env python3

from __future__ import annotations

import json
from pathlib import Path

VOCAB = {
    "!": 0,
    "o": 1,
    "p": 2,
    "h": 3,
    "t": 4,
    "c": 5,
    "a": 6,
    "f</w>": 7,
    "o</w>": 8,
    "ph": 9,
    "pho": 10,
    "phot": 11,
    "ca": 12,
    "a</w>": 320,
    "of</w>": 539,
    "photo</w>": 1125,
    "cat</w>": 2368,
    "<|startoftext|>": 49406,
    "<|endoftext|>": 49407,
}

MERGES = [
    "#version: 0.2 - Mini CLIP merges",
    "o f</w>",
    "p h",
    "ph o",
    "pho t",
    "phot o</w>",
    "c a",
    "ca t</w>",
]


def write_vocab(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(VOCAB, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def write_merges(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(MERGES) + "\n", encoding="utf-8")


def main() -> None:
    repo_root = Path(__file__).resolve().parent.parent
    vocab_targets = [
        repo_root / "dust-embeddings-swift/Tests/DustEmbeddingsTests/Fixtures/clip-vocab-mini.json",
        repo_root / "dust-embeddings-kotlin/src/test/resources/clip-vocab-mini.json",
    ]
    merges_targets = [
        repo_root / "dust-embeddings-swift/Tests/DustEmbeddingsTests/Fixtures/clip-merges-mini.txt",
        repo_root / "dust-embeddings-kotlin/src/test/resources/clip-merges-mini.txt",
    ]
    for target in vocab_targets:
        write_vocab(target)
    for target in merges_targets:
        write_merges(target)


if __name__ == "__main__":
    main()
