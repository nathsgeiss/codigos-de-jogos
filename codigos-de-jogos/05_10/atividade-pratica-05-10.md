# Clique no alvo — melhorando o jogo

Vamos transformar o Clique no alvo num jogo de verdade. No fim da aula, cada um
joga o jogo de um colega, e os recordes vão para o quadro.

Antes de cada parte, resolva no caderno:

- o que o jogo precisa **lembrar** para isso funcionar?
- em qual função do código isso entra?

Toda função nova é testada no console antes de ser usada no jogo, e todo nome
de função começa com um verbo que diz o que ela faz.

---

## Parte 1 — o alvo dourado

De vez em quando, o alvo aparece **dourado**, e acertar ele vale **3 pontos**
em vez de 1.

A chance de um alvo ser dourado é de 1 em 5. Cada vez que o alvo se move, o
jogo sorteia se o próximo vai ser dourado.

Para conferir: jogue uma partida e veja se os pontos sobem de 3 quando você
acerta um dourado, e de 1 nos outros.

---

## Parte 2 — os últimos segundos

Quando faltarem 5 segundos ou menos, o tempo do placar fica vermelho.

Crie uma função que responde se o tempo está acabando:

| no console | deve devolver |
|---|---|
| `estaAcabando(10)` | `false` |
| `estaAcabando(5)` | `true` |
| `estaAcabando(1)` | `true` |

Para conferir: jogue duas partidas seguidas. No começo da segunda, o tempo
voltou à cor normal?

---

## Parte 3 — níveis

O jogo ganha três níveis, escolhidos num campo antes de começar:

| nível | duração | o alvo foge depois de | tamanho do alvo |
|---|---|---|---|
| Fácil | 30 s | 1500 ms | 72 px |
| Médio | 30 s | 1200 ms | 56 px |
| Difícil | 20 s | 900 ms | 40 px |

Os níveis ficam numa lista de objetos, e o campo de escolha é montado pelo
JavaScript a partir da lista, como os filmes da Bilheteria.

Pense: durante a partida, dá para trocar de nível? Deveria dar?

---

## Parte 4 — cada vez mais rápido

A cada 10 pontos, o alvo foge 150 ms mais rápido, mas nunca em menos de
500 ms.

Crie uma função que calcula em quanto tempo o alvo foge, a partir do nível e
dos pontos:

| no console | deve devolver |
|---|---|
| `calcularTempoDoAlvo(NIVEIS[1], 0)` | `1200` |
| `calcularTempoDoAlvo(NIVEIS[1], 9)` | `1200` |
| `calcularTempoDoAlvo(NIVEIS[1], 10)` | `1050` |
| `calcularTempoDoAlvo(NIVEIS[1], 23)` | `900` |
| `calcularTempoDoAlvo(NIVEIS[1], 90)` | `500` |

Atenção ao alvo dourado: com ele, os pontos podem pular de 9 para 12. A sua
conta continua funcionando nesse caso?

---

## Se sobrar tempo

- **A bomba.** De vez em quando, aparece um alvo preto que **tira** 5 pontos.
  Os pontos nunca podem ficar negativos.
- **Errou, perdeu.** Clicar na arena fora do alvo tira 1 ponto. Teste bem:
  acertar o alvo ainda dá ponto? Se não der, pesquise sobre
  `stopPropagation`.
- **Recorde por nível.** Cada nível guarda o próprio recorde, como cada filme
  guardava as próprias vendas. O placar mostra o recorde do nível escolhido.

---

## Para entregar

Faça o commit, envie para o GitHub e publique no GitHub Pages: o campeonato
vai usar o seu link.
