#!/usr/bin/env python3

from pathlib import Path

VOCAB_SIZE = 7593
SPECIAL_TOKENS = {
    0: "[PAD]",
    100: "[UNK]",
    101: "[CLS]",
    102: "[SEP]",
    103: "[MASK]",
    1746: "中",
    1861: "文",
    1996: "the",
    2075: "##ing",
    2088: "world",
    2829: "brown",
    3085: "##able",
    4248: "quick",
    4273: "##aff",
    4419: "fox",
    4895: "un",
    7592: "hello",
}


def build_vocab() -> list[str]:
    vocab = [f"[unused_{index}]" for index in range(VOCAB_SIZE)]
    for index, token in SPECIAL_TOKENS.items():
        vocab[index] = token
    return vocab


def write_vocab(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(build_vocab()) + "\n", encoding="utf-8")


def main() -> None:
    repo_root = Path(__file__).resolve().parent.parent
    targets = [
        repo_root / "dust-embeddings-swift/Tests/DustEmbeddingsTests/Fixtures/bert-vocab-mini.txt",
        repo_root / "dust-embeddings-kotlin/src/test/resources/bert-vocab-mini.txt",
    ]
    for target in targets:
        write_vocab(target)


if __name__ == "__main__":
    main()
