"""
Implementação didática de Heap Binário (Min-Heap e Max-Heap).

O contador `operacoes` contabiliza comparações entre chaves e movimentações
de elementos realizadas para restaurar a propriedade do heap.
"""

from __future__ import annotations
from typing import Optional


class BinaryHeap:
    """Heap binário implementado sobre uma lista Python."""

    def __init__(self, mode: str = "min") -> None:
        if mode not in ("min", "max"):
            raise ValueError("mode deve ser 'min' ou 'max'")
        self.mode: str = mode
        self.data: list[int] = []
        self.operacoes: int = 0

    def _has_priority(self, a: int, b: int) -> bool:
        """Retorna True se a deve ficar acima de b."""
        self.operacoes += 1
        return a < b if self.mode == "min" else a > b

    def _swap(self, i: int, j: int) -> None:
        """Troca dois elementos e registra a movimentação."""
        self.data[i], self.data[j] = self.data[j], self.data[i]
        self.operacoes += 1

    def peek(self) -> Optional[int]:
        """Consulta a raiz sem removê-la; retorna None se estiver vazio."""
        return self.data[0] if self.data else None

    def insert(self, value: int) -> None:
        """Insere um valor e aplica sift-up para restaurar a propriedade."""
        self.data.append(value)
        self.operacoes += 1
        child = len(self.data) - 1

        while child > 0:
            parent = (child - 1) // 2
            if self._has_priority(self.data[child], self.data[parent]):
                self._swap(child, parent)
                child = parent
            else:
                break

    def extract(self) -> Optional[int]:
        """Remove e devolve a raiz; retorna None se o heap estiver vazio."""
        if not self.data:
            return None

        if len(self.data) == 1:
            self.operacoes += 1
            return self.data.pop()

        root = self.data[0]
        self.data[0] = self.data.pop()
        self.operacoes += 1
        self._sift_down(0)
        return root

    def _sift_down(self, parent: int) -> None:
        """Desce o elemento enquanto algum filho tiver maior prioridade."""
        size = len(self.data)
        while True:
            best = parent
            left = 2 * parent + 1
            right = 2 * parent + 2

            if left < size and self._has_priority(self.data[left], self.data[best]):
                best = left
            if right < size and self._has_priority(self.data[right], self.data[best]):
                best = right

            if best == parent:
                break

            self._swap(parent, best)
            parent = best

    def __len__(self) -> int:
        return len(self.data)


def run_tests() -> None:
    """Executa três cenários: comum, borda e sequência decrescente."""
    print("=== TESTE 1: caso comum (Min-Heap) ===")
    heap = BinaryHeap("min")
    for value in [20, 8, 15, 3, 10]:
        heap.insert(value)
    print("Array:", heap.data)
    print("Raiz (peek):", heap.peek())
    print("Removido (extract):", heap.extract())
    print("Array após remoção:", heap.data)
    print("Operações:", heap.operacoes)

    print("\n=== TESTE 2: caso de borda (heap vazio e um elemento) ===")
    empty = BinaryHeap("max")
    print("Remover vazio:", empty.extract())
    empty.insert(42)
    print("Raiz:", empty.peek())
    print("Remover único:", empty.extract())
    print("Operações:", empty.operacoes)

    print("\n=== TESTE 3: Max-Heap com valores em ordem crescente ===")
    max_heap = BinaryHeap("max")
    for value in [1, 2, 3, 4, 5, 6]:
        max_heap.insert(value)
    print("Array:", max_heap.data)
    print("Raiz (maior prioridade):", max_heap.peek())
    print("Operações:", max_heap.operacoes)


if __name__ == "__main__":
    run_tests()
