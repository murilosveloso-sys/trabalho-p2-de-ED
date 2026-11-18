# Trabalho P2 — Heap Binário (Min-Heap e Max-Heap)

> **Vídeo explicativo:** [INSIRA AQUI O LINK PÚBLICO OU NÃO LISTADO]

## Identificação
- **Nome completo:** [PREENCHA SEU NOME]
- **RA:** [PREENCHA SEU RA]
- **Tema:** C — Heaps e Filas de Prioridade (Min-Heap / Max-Heap)
- **Disciplina:** Estrutura de Dados — ADS / Fatec Ribeirão Preto
- **Semestre:** 2026.2

## 1. Resumo teórico

Um **Heap Binário** é uma árvore binária completa armazenada em um array. Em uma árvore completa, os níveis são preenchidos da esquerda para a direita. No **Min-Heap**, cada pai é menor ou igual aos seus filhos, então o menor elemento fica na raiz. No **Max-Heap**, cada pai é maior ou igual aos filhos, deixando o maior elemento na raiz.

O array permite encontrar os parentes por índices, sem precisar criar nós ligados:
- Pai: `(i - 1) // 2`
- Filho esquerdo: `2 * i + 1`
- Filho direito: `2 * i + 2`

### Operações principais
- **insert:** adiciona o novo valor no fim do array e usa *sift-up* (ou *subida*) para trocar com o pai enquanto tiver maior prioridade.
- **peek:** consulta a raiz sem removê-la.
- **extract:** remove a raiz, coloca o último elemento em seu lugar e usa *sift-down* (ou *descida*) para restaurar a propriedade.

Uma fila de prioridade pode usar heap para atender primeiro o elemento de maior prioridade. Exemplos incluem escalonamento de tarefas, sistemas de atendimento, simulações e algoritmos de grafos.

## 2. Complexidade assintótica

Considere `n` como a quantidade de elementos no heap. A altura de uma árvore binária completa é proporcional a `log n`.

| Operação | Melhor caso | Caso médio | Pior caso | Espaço auxiliar |
|---|---:|---:|---:|---:|
| `peek` | O(1) | O(1) | O(1) | O(1) |
| `insert` | O(1) | O(log n) | O(log n) | O(1) |
| `extract` | O(1) | O(log n) | O(log n) | O(1) |

**Justificativa:** `peek` apenas lê a raiz. Na inserção, o elemento pode ficar na posição final (melhor caso) ou subir até a raiz, percorrendo no máximo a altura da árvore. Na extração, o último elemento pode já estar correto na raiz (melhor caso) ou descer vários níveis. Como a altura é `O(log n)`, inserção e extração têm pior caso `O(log n)`. O espaço auxiliar por operação é `O(1)`; o array que armazena os `n` elementos ocupa `O(n)` no total.

## 3. Como executar

### Código Python
Na raiz do projeto, execute:

```bash
python src/algoritmo.py
```

O programa executa três cenários: Min-Heap comum, heap vazio/um elemento e Max-Heap com inserções em ordem crescente.

### Simulador visual
Abra `src/demo/index.html` diretamente no navegador. Não precisa instalar servidor.

1. Escolha Min-Heap ou Max-Heap.
2. Digite um inteiro e clique em **Inserir** ou clique em **Remover raiz**.
3. Use **Próximo passo**, **Executar (Play)** e **Pausar** para acompanhar a animação.
4. Compare a árvore com o array e observe o contador de operações.
5. Use os cenários pré-configurados para testar sequências.

## 4. Diário de Engenharia com IA

**Ferramenta utilizada:** ChatGPT (GPT-6), como apoio para estudar o heap, estruturar a implementação e criar o simulador. O código deve ser executado e conferido pelo estudante antes da entrega.

### Três prompts principais utilizados
1. “Explique Min-Heap e Max-Heap como se eu fosse iniciante, mostrando a relação entre árvore binária completa e array.”
2. “Crie uma implementação de Heap Binário em Python puro com `insert`, `extract`, `peek`, `sift-up`, `sift-down`, type hints, docstrings e contador de operações.”
3. “Crie um simulador HTML, CSS e JavaScript autocontido para Min-Heap e Max-Heap, mostrando simultaneamente árvore e array e permitindo acompanhar as operações passo a passo.”

### Ajuste e validação manual
A contagem de operações é uma métrica didática definida no projeto: contabiliza comparações entre chaves e movimentações/trocas. Ela não representa tempo de execução em segundos. É importante executar os testes, conferir a raiz e observar se a propriedade do heap é mantida após cada operação. O estudante deve personalizar os dados de identificação e validar o projeto no próprio computador.

## 5. Roteiro sugerido para o vídeo (3 a 7 minutos)

**Parte 1 — Conceito (aprox. 1 minuto)**
“Olá, meu nome é [nome] e vou apresentar o Tema C, Heap Binário. Um heap é uma árvore binária completa armazenada em um array. No Min-Heap, o menor valor fica na raiz; no Max-Heap, fica o maior. A inserção e a remoção da raiz custam `O(log n)` no pior caso, enquanto consultar a raiz custa `O(1)`.”

**Parte 2 — Simulador (aprox. 2 minutos)**
Abra `index.html`. Carregue um cenário e mostre que a árvore e o array representam os mesmos dados. Insira um valor que precise subir e narre o *sift-up*. Depois remova a raiz e mostre o último elemento ocupando seu lugar e descendo com *sift-down*. Alterne entre Min-Heap e Max-Heap e explique a diferença de prioridade.

**Parte 3 — Código Python (aprox. 1 a 2 minutos)**
Abra `src/algoritmo.py`. Mostre `insert`, o cálculo do pai, `_sift_down` e `extract`. Execute `python src/algoritmo.py` no terminal e comente os três testes e o contador de operações.

**Antes de entregar:** substitua nome, RA e link do vídeo; grave sua própria explicação com o simulador e o terminal visíveis; teste o link em uma janela anônima; confira as regras de envio definidas pelo professor.
