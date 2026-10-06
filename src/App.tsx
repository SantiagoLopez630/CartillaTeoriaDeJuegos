import { useMemo, useState } from "react"

type IconName = "book" | "chart" | "code" | "brain" | "question" | "check" | "menu" | "arrow" | "play" | "reset"

const sections = [
  ["portada", "Portada", "01"],
  ["introduccion", "Introducción", "02"],
  ["fundamentos", "Fundamentos teóricos", "03"],
  ["laboratorio", "Laboratorio y gráficas", "04"],
  ["codigo", "Código e IDE", "05"],
  ["preguntas", "Análisis reflexivo", "06"],
  ["conclusiones", "Conclusiones y referencias", "07"],
]

function Icon({ name, size = 20 }: { name: IconName size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5z" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V9" />
        <path d="M10 19V5" />
        <path d="M16 19v-7" />
        <path d="M22 19H2" />
      </>
    ),
    code: (
      <>
        <path d="m8 9-4 3 4 3" />
        <path d="m16 9 4 3-4 3" />
        <path d="m14 5-4 14" />
      </>
    ),
    brain: (
      <>
        <path d="M9.5 4.5A3 3 0 0 0 4 6a3 3 0 0 0 .4 1.5A4 4 0 0 0 5 15a3 3 0 0 0 4.5 3.9V4.5Z" />
        <path d="M14.5 4.5A3 3 0 0 1 20 6a3 3 0 0 1-.4 1.5A4 4 0 0 1 19 15a3 3 0 0 1-4.5 3.9V4.5Z" />
        <path d="M9.5 9H7m7.5 3H18M9.5 15H7" />
      </>
    ),
    question: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.6 2.6 0 1 1 4 2.2c-1 .7-1.5 1.1-1.5 2.3" />
        <path d="M12 17h.01" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    play: <path d="m8 5 11 7-11 7z" />,
    reset: (
      <>
        <path d="M4 12a8 8 0 1 0 2.3-5.7L4 9" />
        <path d="M4 4v5h5" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function SectionTitle({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  )
}

function MetricChart() {
  const pointsA = "35,178 94,170 153,157 212,135 271,101 330,45"
  const pointsB = "35,178 94,174 153,168 212,158 271,143 330,119"
  return (
    <div
      className="chart-wrap"
      aria-label="Gráfica de estados evaluados por profundidad"
    >
      <svg viewBox="0 0 370 220" role="img">
        {[45, 85, 125, 165].map((y) => (
          <line key={y} x1="35" x2="345" y1={y} y2={y} className="gridline" />
        ))}
        <line x1="35" x2="35" y1="25" y2="185" className="axis" />
        <line x1="35" x2="345" y1="185" y2="185" className="axis" />
        <polyline points={pointsA} className="line line-gold" />
        <polyline points={pointsB} className="line line-blue" />
        {[35, 94, 153, 212, 271, 330].map((x, i) => (
          <g key={x}>
            <circle
              cx={x}
              cy={[178, 170, 157, 135, 101, 45][i]}
              r="4"
              className="dot-gold"
            />
            <circle
              cx={x}
              cy={[178, 174, 168, 158, 143, 119][i]}
              r="4"
              className="dot-blue"
            />
            <text x={x} y="204" textAnchor="middle">
              {i + 2}
            </text>
          </g>
        ))}
        <text x="6" y="34">
          100k
        </text>
        <text x="12" y="170">
          0
        </text>
      </svg>
      <div className="legend">
        <span>
          <i className="gold" /> Minimax
        </span>
        <span>
          <i className="blue" /> Alfa-Beta
        </span>
      </div>
    </div>
  )
}

function TimeChart() {
  return (
    <div className="chart-wrap" aria-label="Gráfica de tiempo de ejecución">
      <svg viewBox="0 0 370 220" role="img">
        {[45, 85, 125, 165].map((y) => (
          <line key={y} x1="35" x2="345" y1={y} y2={y} className="gridline" />
        ))}
        <line x1="35" x2="35" y1="25" y2="185" className="axis" />
        <line x1="35" x2="345" y1="185" y2="185" className="axis" />
        <path
          d="M35 178 C90 177 130 173 170 164 S235 129 270 105 S315 65 340 37"
          className="line line-blue"
        />
        <path
          d="M35 177 C105 176 165 170 220 157 S300 137 340 124"
          className="line line-gold"
        />
        {[35, 110, 185, 260, 340].map((x, i) => (
          <text key={x} x={x} y="204" textAnchor="middle">
            {[1, 5, 10, 15, 20][i]}
          </text>
        ))}
        <text x="9" y="34">
          50ms
        </text>
        <text x="12" y="170">
          0
        </text>
      </svg>
      <div className="legend">
        <span>
          <i className="blue" /> Sin poda
        </span>
        <span>
          <i className="gold" /> Alfa-Beta
        </span>
      </div>
    </div>
  )
}

const matchCode = `def mejor_movimiento(palos: int) -> int:
    """Devuelve una jugada óptima: tomar de 1 a 3 palos."""
    # Los múltiplos de 4 son estados perdedores.
    resto = palos % 4
    return resto if resto else 1

def jugar_turno(palos: int, toma: int) -> int:
    if toma not in range(1, 4) or toma > palos:
        raise ValueError("Movimiento no válido")
    return palos - toma

# Estrategia O(1): fuerza al rival a recibir un múltiplo de 4.
palos = 20
while palos:
    toma = mejor_movimiento(palos)
    palos = jugar_turno(palos, toma)`

const ticCode = `def minimax(tablero, profundidad, alfa, beta, maximiza):
    resultado = evaluar(tablero)
    if resultado is not None:
        return resultado

    if maximiza:
        mejor = -float("inf")
        for jugada in disponibles(tablero):
            tablero[jugada] = "O"
            valor = minimax(tablero, profundidad + 1, alfa, beta, False)
            tablero[jugada] = ""
            mejor = max(mejor, valor)
            alfa = max(alfa, valor)
            if beta <= alfa: break  # poda beta
        return mejor - profundidad

    mejor = float("inf")
    for jugada in disponibles(tablero):
        tablero[jugada] = "X"
        valor = minimax(tablero, profundidad + 1, alfa, beta, True)
        tablero[jugada] = ""
        mejor = min(mejor, valor)
        beta = min(beta, valor)
        if beta <= alfa: break      # poda alfa
    return mejor + profundidad`

function CodeBlock({ code }: { code: string }) {
  const highlighted = code.split("\n").map((line, i) => (
    <div className="code-line" key={i}>
      <span className="line-number">{i + 1}</span>
      <code>{line}</code>
    </div>
  ))
  return <div className="code-scroll">{highlighted}</div>
}

function MatchstickGame() {
  const [sticks, setSticks] = useState(20)
  const [message, setMessage] = useState("Tu turno: retira entre 1 y 3 palos.")
  const [over, setOver] = useState(false)
  const take = (amount: number) => {
    if (over || amount > sticks) return
    const afterPlayer = sticks - amount
    if (afterPlayer === 0) {
      setSticks(0)
      setOver(true)
      setMessage("Ganaste. Tomaste el último palo.")
      return
    }
    const aiTake = afterPlayer % 4 || 1
    const next = Math.max(0, afterPlayer - aiTake)
    setSticks(next)
    if (next === 0) {
      setOver(true)
      setMessage(`La IA retiró ${aiTake} y ganó la partida.`)
    } else
      setMessage(`La IA retiró ${aiTake}. Quedan ${next} palos; es tu turno.`)
  }
  const reset = () => {
    setSticks(20)
    setOver(false)
    setMessage("Tu turno: retira entre 1 y 3 palos.")
  }
  return (
    <div className="game-panel">
      <div className="game-top">
        <div>
          <span className="game-label">ESTADO ACTUAL</span>
          <strong>{sticks} palos</strong>
        </div>
        <button className="icon-button" onClick={reset} aria-label="Reiniciar">
          <Icon name="reset" />
        </button>
      </div>
      <div className="sticks" aria-label={`${sticks} palos restantes`}>
        {Array.from({ length: sticks }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
      <p className="status-message">{message}</p>
      <div className="game-actions">
        {[1, 2, 3].map((n) => (
          <button key={n} onClick={() => take(n)} disabled={over || n > sticks}>
            Retirar {n}
          </button>
        ))}
      </div>
    </div>
  )
}

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
function winner(board: string[]) {
  for (const [a, b, c] of wins)
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a]
  return board.every(Boolean) ? "draw" : null
}
function mini(
  board: string[],
  max: boolean,
  alpha: number,
  beta: number,
): number {
  const end = winner(board)
  if (end === "O") return 10
  if (end === "X") return -10
  if (end === "draw") return 0
  if (max) {
    let best = -Infinity
    board.forEach((v, i) => {
      if (!v) {
        board[i] = "O"
        best = Math.max(best, mini(board, false, alpha, beta))
        board[i] = ""
        alpha = Math.max(alpha, best)
      }
    })
    return best
  }
  let best = Infinity
  board.forEach((v, i) => {
    if (!v) {
      board[i] = "X"
      best = Math.min(best, mini(board, true, alpha, beta))
      board[i] = ""
      beta = Math.min(beta, best)
    }
  })
  return best
}
function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(""))
  const result = winner(board)
  const play = (index: number) => {
    if (board[index] || result) return
    const next = [...board]
    next[index] = "X"
    if (!winner(next)) {
      let score = -Infinity,
        move = -1
      next.forEach((v, i) => {
        if (!v) {
          next[i] = "O"
          const s = mini(next, false, -Infinity, Infinity)
          next[i] = ""
          if (s > score) {
            score = s
            move = i
          }
        }
      })
      if (move >= 0) next[move] = "O"
    }
    setBoard(next)
  }
  const reset = () => setBoard(Array(9).fill(""))
  return (
    <div className="game-panel">
      <div className="game-top">
        <div>
          <span className="game-label">TÚ: X · IA: O</span>
          <strong>
            {result
              ? result === "draw"
                ? "Empate estratégico"
                : result === "X"
                  ? "Ganaste"
                  : "Victoria de la IA"
              : "Tu turno"}
          </strong>
        </div>
        <button className="icon-button" onClick={reset} aria-label="Reiniciar">
          <Icon name="reset" />
        </button>
      </div>
      <div className="tic-board">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => play(i)}
            disabled={Boolean(cell) || Boolean(result)}
            className={cell === "O" ? "ai" : ""}
          >
            {cell}
          </button>
        ))}
      </div>
      <p className="status-message">
        El agente explora jugadas posibles y descarta ramas subóptimas.
      </p>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [codeTab, setCodeTab] = useState<"sticks" | "tic">("sticks")
  const [activeQuestion, setActiveQuestion] = useState(0)
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }
  const progress = useMemo(() => "7 módulos · 25 min de lectura", [])

  return (
    <div className="app-shell">
      <header className="mobile-header">
        <div className="brand-mark">
          <Icon name="brain" />
        </div>
        <span>IA · CARTILLA 01</span>
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          <Icon name="menu" />
        </button>
      </header>
      <aside className={menuOpen ? "sidebar open" : "sidebar"}>
        <div className="brand">
          <div className="brand-mark">
            <Icon name="brain" />
          </div>
          <div>
            <strong>LAB. INTELIGENTE</strong>
            <span>Cartilla digital 01</span>
          </div>
        </div>
        <nav>
          <span className="nav-label">CONTENIDO</span>
          {sections.map(([id, label, num]) => (
            <button key={id} onClick={() => scrollTo(id)}>
              <span>{num}</span>
              {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-progress">
          <span>PROGRESO SUGERIDO</span>
          <div>
            <i />
          </div>
          <small>{progress}</small>
        </div>
        <div className="institution">
          <strong>UNIMINUTO</strong>
          <span>Ingeniería de Software</span>
        </div>
      </aside>

      <main>
        <section id="portada" className="hero">
          <div className="hero-grid" />
          <div className="hero-copy">
            <span className="hero-kicker">
              CARTILLA DIGITAL · INTELIGENCIA ARTIFICIAL
            </span>
            <h1>
              Inferencias, Heurísticas y <em>Funciones de Evaluación</em> en
              Teoría de Juegos
            </h1>
            <p>
              Análisis de decisiones e inferencia de patrones en agentes
              inteligentes.
            </p>
            <button
              className="primary-button"
              onClick={() => scrollTo("introduccion")}
            >
              Comenzar lectura <Icon name="arrow" />
            </button>
          </div>
          <div
            className="hero-visual"
            aria-label="Árbol abstracto de decisiones"
          >
            <div className="orbit one" />
            <div className="orbit two" />
            <div className="chess">♞</div>
            {["MAX", "α", "β", "MIN", "∞"].map((x, i) => (
              <span key={x} className={`node n${i + 1}`}>
                {x}
              </span>
            ))}
            <svg viewBox="0 0 480 420">
              <path d="M240 210 110 95M240 210 365 95M240 210 100 325M240 210 378 325M110 95 52 42M110 95 170 38M365 95 430 40M100 325 34 380M378 325 445 380" />
            </svg>
          </div>
          <div className="hero-meta">
            <span>EDICIÓN ACADÉMICA</span>
            <span>2026</span>
          </div>
        </section>

        <section className="institutional">
          <div className="institutional-title">
            <span>UNIMINUTO</span>
            <strong>
              Corporación Universitaria
              <br />
              Minuto de Dios
            </strong>
          </div>
          <div className="data-grid">
            <div>
              <span>ESTUDIANTE</span>
              <strong>Santiago Steven López Sanabria</strong>
            </div>
            <div>
              <span>PROGRAMA</span>
              <strong>Ingeniería de Software</strong>
            </div>
            <div>
              <span>ASIGNATURA</span>
              <strong>Inteligencia Artificial y Sistemas Inteligentes</strong>
            </div>
            <div>
              <span>FECHA DE ENTREGA</span>
              <strong>05 · 10 · 2026</strong>
            </div>
          </div>
        </section>

        <section className="toc">
          <SectionTitle
            eyebrow="MAPA DE LECTURA"
            title="Tabla de contenido"
            intro="Una ruta progresiva desde los fundamentos hasta la experimentación."
          />
          <div className="toc-list">
            {sections.slice(1).map(([id, label, num]) => (
              <button key={id} onClick={() => scrollTo(id)}>
                <span>{num}</span>
                <strong>{label}</strong>
                <Icon name="arrow" />
              </button>
            ))}
          </div>
        </section>

        <section id="introduccion" className="light-section">
          <SectionTitle
            eyebrow="01 · INTRODUCCIÓN"
            title="Pensar antes de mover"
            intro="Una guía para comprender cómo los agentes inteligentes convierten espacios de decisión inmensos en acciones racionales y medibles."
          />
          <div className="intro-grid">
            {[
              [
                "Propósito",
                "Conectar la teoría con la práctica: entender, comparar y experimentar con heurísticas que anticipan el valor de una decisión sin recorrer por completo el espacio de estados.",
                "01",
              ],
              [
                "Público objetivo",
                "Estudiantes de ingeniería, desarrollo de software e IA que ya conocen programación básica y buscan una lectura aplicada de los algoritmos adversariales.",
                "02",
              ],
              [
                "Contenido",
                "Fundamentos, comparativa algorítmica, análisis de complejidad, gráficas de rendimiento, código Python y simuladores interactivos.",
                "03",
              ],
              [
                "Importancia",
                "La toma automatizada exige decidir con tiempo y cómputo limitados. Una buena evaluación transforma incertidumbre en acción estratégica justificable.",
                "04",
              ],
            ].map(([t, d, n]) => (
              <article key={t}>
                <span className="card-number">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </article>
            ))}
          </div>
          <blockquote>
            “Una heurística no promete certeza; ofrece una dirección informada
            cuando calcularlo todo es imposible.”
          </blockquote>
        </section>

        <section id="fundamentos" className="dark-section">
          <SectionTitle
            eyebrow="02 · FUNDAMENTOS TEÓRICOS"
            title="De la intuición a la decisión computable"
            intro="Cuatro lentes complementarios para diseñar agentes que razonan bajo competencia, profundidad e incertidumbre."
          />
          <div className="theory-grid">
            {[
              [
                "Heurísticas y evaluación",
                "Una heurística h(s) estima la calidad futura de un estado s cuando resolverlo de forma exacta es inviable. En problemas NP-Hard reduce búsqueda al priorizar alternativas prometedoras; su utilidad depende de discriminación, bajo costo y consistencia.",
                "h(s) ≈ utilidad futura",
                "brain",
              ],
              [
                "Inferencia de patrones",
                "El agente identifica regularidades en secuencias de jugadas, frecuencia de acciones y respuestas contextuales. Esa evidencia alimenta modelos tácticos —beneficio inmediato— y estratégicos —posición futura y riesgo acumulado—.",
                "P(a | historial, estado)",
                "chart",
              ],
              [
                "Teoría de juegos",
                "En suma cero, la ganancia de un agente equivale a la pérdida del rival. Con información perfecta se observa todo el estado; con información imperfecta se razona sobre creencias, probabilidades y estrategias mixtas.",
                "U₁(s) = −U₂(s)",
                "book",
              ],
              [
                "Selección algorítmica",
                "La elección depende de ramificación, profundidad, aleatoriedad y datos disponibles. No existe un algoritmo universal: el presupuesto computacional y la naturaleza del entorno delimitan la solución.",
                "calidad / costo / tiempo",
                "code",
              ],
            ].map(([t, d, f, ic]) => (
              <article key={t}>
                <div className="theory-icon">
                  <Icon name={ic as IconName} />
                </div>
                <h3>{t}</h3>
                <p>{d}</p>
                <code>{f}</code>
              </article>
            ))}
          </div>
          <div className="comparison">
            <div className="comparison-head">
              <span>ALGORITMO</span>
              <span>IDEAL CUANDO...</span>
              <span>COMPLEJIDAD / RASGO</span>
            </div>
            {[
              [
                "Minimax",
                "Árboles pequeños, deterministas y de información perfecta.",
                "O(bᵐ) · resultado óptimo",
              ],
              [
                "Alfa–Beta",
                "Existe buen ordenamiento de jugadas y se necesita profundidad.",
                "O(bᵐᐟ²) en el mejor caso",
              ],
              [
                "MCTS",
                "El espacio es enorme y una simulación resulta barata.",
                "Anytime · exploración estadística",
              ],
              [
                "RL / Q-Learning",
                "Hay interacción repetida, recompensa y datos de experiencia.",
                "Aprende una política π(a|s)",
              ],
            ].map((r) => (
              <div className="comparison-row" key={r[0]}>
                <strong>{r[0]}</strong>
                <span>{r[1]}</span>
                <code>{r[2]}</code>
              </div>
            ))}
          </div>
        </section>

        <section id="laboratorio" className="light-section">
          <SectionTitle
            eyebrow="03 · LABORATORIO DE RENDIMIENTO"
            title="Medir para decidir"
            intro="Datos ilustrativos del crecimiento del árbol muestran por qué podar no es un detalle: es la diferencia entre responder a tiempo o no responder."
          />
          <div className="charts-grid">
            <article className="chart-card">
              <div className="chart-title">
                <div>
                  <span>GRÁFICA 01</span>
                  <h3>Estados evaluados</h3>
                </div>
                <span className="metric">
                  −91%<small>nodos</small>
                </span>
              </div>
              <MetricChart />
              <p>
                Con factor de ramificación <b>b</b> y profundidad <b>m</b>,
                Minimax inspecciona hasta bᵐ estados. Un ordenamiento favorable
                permite a Alfa–Beta aproximarse a bᵐᐟ²: a profundidad 8, un
                árbol con b=10 pasa conceptualmente de 10⁸ a 10⁴ evaluaciones.
              </p>
            </article>
            <article className="chart-card">
              <div className="chart-title">
                <div>
                  <span>GRÁFICA 02</span>
                  <h3>Tiempo por turno</h3>
                </div>
                <span className="metric">
                  4.7×<small>más rápido</small>
                </span>
              </div>
              <TimeChart />
              <p>
                El tiempo crece con los palos y estados legales restantes. En
                Tres en Raya el máximo es acotado —9! secuencias brutas—, pero
                la poda reduce trabajo redundante. El costo observado también
                incluye generación de movimientos y evaluación terminal.
              </p>
            </article>
          </div>
          <div className="formula-banner">
            <span>COMPLEJIDAD</span>
            <strong>
              O(b<sup>m</sup>)
            </strong>
            <Icon name="arrow" size={26} />
            <strong>
              O(b<sup>m/2</sup>)
            </strong>
            <p>
              La poda no altera la decisión óptima: evita explorar ramas que ya
              no pueden cambiarla.
            </p>
          </div>
        </section>

        <section id="codigo" className="code-section">
          <SectionTitle
            eyebrow="04 · IDE INTERACTIVO"
            title="Del algoritmo al movimiento"
            intro="Lee la implementación y comprueba su estrategia en un entorno seguro. Cambia de experimento sin perder el contexto."
          />
          <div className="ide">
            <div className="ide-toolbar">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <div className="tabs">
                <button
                  className={codeTab === "sticks" ? "active" : ""}
                  onClick={() => setCodeTab("sticks")}
                >
                  matchstick.py
                </button>
                <button
                  className={codeTab === "tic" ? "active" : ""}
                  onClick={() => setCodeTab("tic")}
                >
                  tictactoe.py
                </button>
              </div>
              <span>Python 3.12</span>
            </div>
            <div className="ide-body">
              <div className="editor">
                <div className="file-path">
                  experimentos /{" "}
                  {codeTab === "sticks" ? "matchstick.py" : "tictactoe.py"}
                </div>
                <CodeBlock code={codeTab === "sticks" ? matchCode : ticCode} />
              </div>
              <div className="preview">
                <div className="preview-head">
                  <span>
                    <i /> SIMULACIÓN EN VIVO
                  </span>
                  <button>
                    <Icon name="play" size={15} /> Ejecutado
                  </button>
                </div>
                {codeTab === "sticks" ? <MatchstickGame /> : <TicTacToe />}
              </div>
            </div>
            <div className="ide-footer">
              <span>✓ Sin errores</span>
              <span>UTF-8 · LF · Python</span>
            </div>
          </div>
        </section>

        <section id="preguntas" className="light-section">
          <SectionTitle
            eyebrow="05 · ANÁLISIS REFLEXIVO"
            title="Preguntas que abren el árbol"
            intro="Selecciona una pregunta para explorar una respuesta académica fundamentada."
          />
          <div className="qa-layout">
            <div className="question-list">
              {[
                "¿Cómo se infieren los patrones de comportamiento de un agente de IA?",
                "¿Qué rol cumple la función heurística en esas inferencias?",
                "¿Cómo se infieren decisiones mediante teoría de juegos?",
                "¿Ventajas y límites frente al aprendizaje por refuerzo?",
              ].map((q, i) => (
                <button
                  key={q}
                  className={activeQuestion === i ? "active" : ""}
                  onClick={() => setActiveQuestion(i)}
                >
                  <span>0{i + 1}</span>
                  {q}
                  <Icon name="arrow" />
                </button>
              ))}
            </div>
            <div className="answer-card">
              <span className="answer-label">
                RESPUESTA · 0{activeQuestion + 1}
              </span>
              <Icon name="question" size={34} />
              <h3>
                {
                  [
                    "Observar, modelar y contrastar",
                    "Una estimación que orienta",
                    "Anticipar la respuesta del rival",
                    "Precisión experta vs. adaptación",
                  ][activeQuestion]
                }
              </h3>
              <p>
                {
                  [
                    "Se recopilan trazas de interacción —estados, acciones, tiempos y resultados— y se buscan regularidades mediante estadística, modelos secuenciales o aprendizaje. La inferencia no consiste en «leer» al agente, sino en estimar una política: la probabilidad de que elija una acción dado un estado. El modelo debe validarse con episodios no observados y actualizarse cuando cambia la conducta.",
                    "La heurística convierte atributos relevantes del estado en una estimación de utilidad. Permite clasificar alternativas antes de conocer el desenlace, orientar la expansión del árbol y reconocer configuraciones asociadas con ventaja. También introduce sesgo: si omite una variable decisiva, la inferencia será rápida pero equivocada.",
                    "La teoría de juegos representa jugadores, acciones, información y pagos. Minimax supone un rival racional y elige la acción cuyo peor resultado es el mejor posible. En información imperfecta, la decisión incorpora creencias sobre estados ocultos y estrategias mixtas; inferir significa comparar respuestas probables y sus utilidades esperadas.",
                    "Las heurísticas son rápidas, explicables y aprovechan conocimiento experto sin requerir grandes volúmenes de experiencia. Sin embargo, son frágiles ante escenarios no previstos y requieren diseño manual. El aprendizaje por refuerzo se adapta y descubre políticas complejas, pero demanda datos, cómputo, una recompensa bien formulada y controles frente a comportamientos emergentes.",
                  ][activeQuestion]
                }
              </p>
              <div className="answer-note">
                <Icon name="check" />
                <span>
                  <b>Clave:</b> toda inferencia es una hipótesis que debe
                  contrastarse con evidencia.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="conclusiones" className="conclusion-section">
          <SectionTitle eyebrow="06 · CIERRE" title="Conclusiones" />
          <div className="conclusion-grid">
            <div className="big-conclusion">
              <span className="quote-mark">“</span>
              <p>
                La experiencia confirma que una decisión inteligente no depende
                solo de buscar más, sino de <em>evaluar mejor</em>.
              </p>
            </div>
            <div className="conclusion-points">
              <p>
                En entornos deterministas, Minimax y Alfa–Beta ofrecen garantías
                claras: la poda conserva la optimalidad y amplía el horizonte
                alcanzable.
              </p>
              <p>
                En escenarios estocásticos, una heurística debe incorporar
                probabilidad, incertidumbre y costo del error; allí MCTS y RL
                complementan la búsqueda clásica.
              </p>
              <p>
                La calidad del agente surge del equilibrio entre conocimiento,
                evidencia, capacidad de cómputo y explicabilidad de sus
                decisiones.
              </p>
            </div>
          </div>
          <div className="references">
            <span>REFERENCIAS · APA 7.ª EDICIÓN</span>
            <ol>
              <li>
                Russell, S. J., & Norvig, P. (2021).{" "}
                <i>Artificial intelligence: A modern approach</i> (4th ed.).
                Pearson.
              </li>
              <li>
                Sutton, R. S., & Barto, A. G. (2018).{" "}
                <i>Reinforcement learning: An introduction</i> (2nd ed.). MIT
                Press.
              </li>
              <li>
                Silver, D., et al. (2016). Mastering the game of Go with deep
                neural networks and tree search. <i>Nature, 529</i>, 484–489.
              </li>
              <li>
                Knuth, D. E., & Moore, R. W. (1975). An analysis of alpha-beta
                pruning. <i>Artificial Intelligence, 6</i>(4), 293–326.
              </li>
            </ol>
          </div>
          <footer>
            <div className="brand-mark">
              <Icon name="brain" />
            </div>
            <strong>FIN DE LA CARTILLA</strong>
            <button onClick={() => scrollTo("portada")}>
              Volver al inicio ↑
            </button>
          </footer>
        </section>
      </main>
    </div>
  )
}
