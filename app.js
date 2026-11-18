const $ = (id) => document.getElementById(id);
let heap = [];
let mode = "min";
let operations = 0;
let steps = [];
let stepIndex = 0;
let timer = null;
let highlighted = [];

function priority(a, b) { operations++; return mode === "min" ? a < b : a > b; }
function swap(i, j) { [heap[i], heap[j]] = [heap[j], heap[i]]; operations++; }
function addStep(message, active = []) {
  steps.push({ heap: [...heap], operations, message, active: [...active] });
}
function makeInsert(value) {
  steps = []; stepIndex = 0; highlighted = [];
  heap.push(value); operations++; addStep(`Inseriu ${value} na última posição.`, [heap.length - 1]);
  let child = heap.length - 1;
  while (child > 0) {
    const parent = Math.floor((child - 1) / 2);
    if (priority(heap[child], heap[parent])) {
      addStep(`Comparou filho ${heap[child]} com pai ${heap[parent]}. O filho tem prioridade; será promovido.`, [child, parent]);
      swap(child, parent); addStep(`Trocou as posições ${child} e ${parent} (sift-up).`, [child, parent]);
      child = parent;
    } else {
      addStep(`Comparou filho ${heap[child]} com pai ${heap[parent]}. A propriedade do heap está preservada.`, [child, parent]);
      break;
    }
  }
  if (steps.length === 1) addStep("O elemento já está na raiz; nenhuma troca foi necessária.", [0]);
  showStep(0);
}
function makeExtract() {
  if (!heap.length) { setStatus("Heap vazio: não há raiz para remover."); return; }
  steps = []; stepIndex = 0;
  const removed = heap[0];
  if (heap.length === 1) {
    heap.pop(); operations++; addStep(`Removeu o único elemento ${removed}.`);
  } else {
    heap[0] = heap.pop(); operations++; addStep(`Removeu a raiz ${removed} e colocou o último elemento na raiz.`, [0]);
    let parent = 0;
    while (true) {
      let best = parent, left = 2 * parent + 1, right = 2 * parent + 2;
      if (left < heap.length && priority(heap[left], heap[best])) best = left;
      if (right < heap.length && priority(heap[right], heap[best])) best = right;
      if (best === parent) { addStep("Nenhum filho tem prioridade sobre o pai. O sift-down terminou.", [parent]); break; }
      addStep(`O filho ${heap[best]} tem prioridade sobre ${heap[parent]}; será promovido.`, [parent, best]);
      swap(parent, best); addStep(`Trocou as posições ${parent} e ${best} (sift-down).`, [parent, best]);
      parent = best;
    }
  }
  addStep(`Extração concluída. Valor removido: ${removed}.`);
  showStep(0);
}
function setStatus(message) { $("status").textContent = message; }
function render() {
  $("ops").textContent = operations;
  $("count").textContent = heap.length;
  $("root").textContent = heap.length ? heap[0] : "—";
  $("height").textContent = heap.length ? Math.floor(Math.log2(heap.length)) + 1 : 0;
  $("array").innerHTML = heap.map((v,i) => `<div class="cell ${highlighted.includes(i) ? "active" : ""}"><small>índice ${i}</small><strong>${v}</strong></div>`).join("") || '<span class="muted">Array vazio</span>';
  renderTree();
}
function renderTree() {
  const tree = $("tree"); tree.innerHTML = "";
  if (!heap.length) { tree.textContent = "Insira valores para construir a árvore."; return; }
  const levels = Math.floor(Math.log2(heap.length)) + 1;
  for (let level=0; level<levels; level++) {
    const row = document.createElement("div"); row.className = "tree-level";
    const start = 2 ** level - 1, end = Math.min(2 ** (level + 1) - 1, heap.length);
    for (let i=start; i<end; i++) {
      const node = document.createElement("div");
      node.className = `node ${i===0 ? "root" : ""} ${highlighted.includes(i) ? "active" : ""}`;
      node.textContent = heap[i]; node.title = `Índice ${i}`;
      row.appendChild(node);
    }
    tree.appendChild(row);
  }
}
function showStep(index) {
  if (!steps.length) return;
  stepIndex = Math.max(0, Math.min(index, steps.length - 1));
  const s = steps[stepIndex]; heap = [...s.heap]; operations = s.operations; highlighted = s.active;
  setStatus(s.message); $("progress").textContent = `Passo ${stepIndex+1} de ${steps.length}`;
  $("log").innerHTML = steps.slice(0, stepIndex+1).map(x => `<li>${x.message}</li>`).join("");
  render();
}
function pause() { if (timer) clearInterval(timer); timer = null; }
function play() { pause(); timer = setInterval(() => { if (stepIndex >= steps.length-1) { pause(); return; } showStep(stepIndex+1); }, 850); }
function loadScenario(name) {
  pause(); mode = name === "worst" ? "min" : name === "custom" ? "max" : "min";
  $("mode").value = mode; heap = []; operations = 0; steps = [];
  const values = name === "medium" ? [20, 8, 15, 3, 10, 12] : name === "worst" ? [1,2,3,4,5,6,7] : [18, 7, 25, 3, 11, 20, 30];
  values.forEach(v => { heap.push(v); operations++; let c=heap.length-1; while(c>0) { let p=Math.floor((c-1)/2); if(priority(heap[c],heap[p])) { swap(c,p); c=p; } else break; } });
  highlighted = []; setStatus(`Cenário carregado: ${name === "worst" ? "sequência crescente" : name === "custom" ? "exemplo customizado (Max-Heap)" : "caso médio"}.`);
  $("progress").textContent = "Cenário pronto"; $("log").innerHTML = `<li>Valores inseridos: ${values.join(", ")}.</li><li>O heap foi reorganizado após cada inserção.</li>`;
  render();
}
$("insertBtn").addEventListener("click", () => { pause(); const v = Number($("value").value); if (!Number.isInteger(v)) return setStatus("Digite um número inteiro."); makeInsert(v); });
$("extractBtn").addEventListener("click", () => { pause(); makeExtract(); });
$("peekBtn").addEventListener("click", () => setStatus(heap.length ? `A raiz é ${heap[0]}, o elemento de maior prioridade.` : "Heap vazio."));
$("mode").addEventListener("change", e => { mode=e.target.value; heap=[]; operations=0; steps=[]; highlighted=[]; setStatus("Tipo alterado. Carregue um cenário ou insira novos valores."); render(); });
$("stepBtn").addEventListener("click", () => { pause(); if (steps.length) showStep(stepIndex+1); else setStatus("Primeiro realize uma inserção ou remoção."); });
$("playBtn").addEventListener("click", play); $("pauseBtn").addEventListener("click", pause);
$("resetBtn").addEventListener("click", () => { pause(); heap=[]; operations=0; steps=[]; highlighted=[]; $("log").innerHTML="<li>Simulação reiniciada.</li>"; $("progress").textContent="Reiniciado"; setStatus("Heap vazio. Escolha uma operação."); render(); });
document.querySelectorAll("[data-scenario]").forEach(b => b.addEventListener("click", () => loadScenario(b.dataset.scenario)));
render();
