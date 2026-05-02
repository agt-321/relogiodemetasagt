const svgNs = "http://www.w3.org/2000/svg";

const themes = {
  otherworld: {
    label: "outro mundo",
    bg: ["#253f55", "#0b0c18", "#020205"],
    rings: ["#07131c", "#16445a", "#2b7a88", "#553a71", "#7a4b85", "#d2a75e", "#1a2536"],
    accent: "#70ead4",
    thread: "#f1cc75",
  },
  rainy: {
    label: "chuva azul",
    bg: ["#172d44", "#07101d", "#020206"],
    rings: ["#081625", "#12304b", "#1c5f78", "#2b4d7c", "#24305c", "#845d6d", "#142436"],
    accent: "#8bdcff",
    thread: "#98ecff",
  },
  supper: {
    label: "jantar quente",
    bg: ["#3a2030", "#13090e", "#030203"],
    rings: ["#25101b", "#4c1e34", "#773b54", "#a16058", "#c7985d", "#513053", "#2a121f"],
    accent: "#f0b76f",
    thread: "#f6d683",
  },
  garden: {
    label: "jardim torto",
    bg: ["#173d3d", "#071318", "#020306"],
    rings: ["#0b1c21", "#173c3f", "#297069", "#60587b", "#7d4f7d", "#c9a763", "#143035"],
    accent: "#76efd0",
    thread: "#d7ef83",
  },
  attic: {
    label: "sótão roxo",
    bg: ["#331a48", "#0e0a18", "#020204"],
    rings: ["#1a1128", "#37204a", "#5c3a72", "#7b4f81", "#24335c", "#b99661", "#20152e"],
    accent: "#e0b5ff",
    thread: "#f3d26f",
  },
  well: {
    label: "poço escuro",
    bg: ["#10283a", "#050a12", "#010204"],
    rings: ["#07111b", "#0f2435", "#1d445f", "#2c6470", "#1f3156", "#523d6a", "#0a1017"],
    accent: "#78dff7",
    thread: "#82ead5",
  },
};

const themeButtons = [
  { theme: "otherworld", x: 640, y: 674, r: 42, metal: "#55616d" },
  { theme: "rainy", x: 690, y: 636, r: 20, metal: "#596e81" },
  { theme: "supper", x: 730, y: 660, r: 20, metal: "#83624e" },
  { theme: "garden", x: 694, y: 712, r: 16, metal: "#426862" },
  { theme: "attic", x: 640, y: 730, r: 24, metal: "#614c70" },
  { theme: "well", x: 724, y: 734, r: 19, metal: "#293645" },
];

const starPositions = [
  [144, 78, 3.1], [250, 96, 2.5], [718, 122, 2.7], [822, 88, 3.2], [866, 214, 2.4],
  [202, 236, 2.3], [690, 284, 2.7], [756, 320, 2.4], [304, 350, 2.1], [626, 364, 2.5],
  [174, 606, 2], [764, 642, 2.1], [148, 754, 2.2], [830, 746, 2.2], [906, 692, 1.8],
  [88, 470, 1.7], [914, 500, 1.9], [454, 112, 1.7], [548, 126, 1.6],
];

const watchSkyDots = [
  [-42, -38, 1.7], [-18, -16, 1.2], [14, -42, 1.4], [38, -6, 1.3], [28, 22, 1.1],
  [-22, 18, 1.3], [50, 28, 1], [-40, 34, 1.1], [6, 44, 1], [-54, 4, 1.1],
];

const BRASILIA_TIME_ZONE = "America/Sao_Paulo";
const GOAL_UTC_OFFSET_HOURS = 3;
const MONTHS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

const BRASILIA_PARTS_FORMATTER = new Intl.DateTimeFormat("en-US-u-nu-latn", {
  timeZone: BRASILIA_TIME_ZONE,
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function getBrasiliaParts(date = new Date()) {
  const mappedParts = {};
  BRASILIA_PARTS_FORMATTER.formatToParts(date).forEach((part) => {
    if (part.type !== "literal") {
      mappedParts[part.type] = part.value;
    }
  });

  return {
    year: Number(mappedParts.year),
    month: Number(mappedParts.month),
    day: Number(mappedParts.day),
    hour: Number(mappedParts.hour),
    minute: Number(mappedParts.minute),
    second: Number(mappedParts.second),
  };
}

function makeBrasiliaDate(year, monthIndex, day, hour, minute = 0, second = 0) {
  return new Date(Date.UTC(year, monthIndex, day, hour + GOAL_UTC_OFFSET_HOURS, minute, second));
}

function formatBrasiliaDate(date) {
  const brt = getBrasiliaParts(date);
  return `${pad(brt.day)} ${MONTHS[brt.month - 1]} ${brt.year} | ${pad(brt.hour)}:${pad(brt.minute)}`;
}

function createGoal(config) {
  const date = makeBrasiliaDate(config.year, config.monthIndex, config.day, config.hour, config.minute ?? 0);

  return {
    id: config.id,
    n: config.n,
    title: config.title,
    sub: config.sub,
    desc: config.desc,
    details: config.details,
    date,
    dateLabel: formatBrasiliaDate(date),
    markerHour: config.markerHour ?? (config.hour % 12 || 12),
    color: config.color,
  };
}

const objectiveItems = [
  createGoal({
    id: "portfolio",
    n: "01/05",
    title: "Portfólio Novo",
    sub: "Design | Apresentação",
    year: 2026,
    monthIndex: 5,
    day: 12,
    hour: 20,
    markerHour: 2,
    color: "#f3c869",
    desc: "Montar uma vitrine bonita, clara e com projetos escolhidos a dedo para mostrar evolução real.",
    details: [["foco", "seleção visual"], ["janela", "últimos ajustes"], ["ritual", "revisar e publicar"]],
  }),
  createGoal({
    id: "lancamento",
    n: "02/05",
    title: "Lançar Projeto",
    sub: "Site | Primeira versão",
    year: 2026,
    monthIndex: 7,
    day: 25,
    hour: 19,
    minute: 30,
    markerHour: 4,
    color: "#6ee8ca",
    desc: "Transformar a ideia em algo público, usável e polido o bastante para receber opinião de verdade.",
    details: [["foco", "primeira entrega"], ["janela", "semana final"], ["ritual", "testar tudo"]],
  }),
  createGoal({
    id: "viagem",
    n: "03/05",
    title: "Viagem de Verão",
    sub: "Descanso | Rota leve",
    year: 2026,
    monthIndex: 11,
    day: 18,
    hour: 9,
    minute: 15,
    markerHour: 6,
    color: "#9cc7ff",
    desc: "Sair um pouco do modo automático, respirar outro lugar e voltar com a cabeça mais limpa.",
    details: [["foco", "roteiro simples"], ["janela", "organizar malas"], ["ritual", "ir sem pressa"]],
  }),
  createGoal({
    id: "curso",
    n: "04/05",
    title: "Curso Novo",
    sub: "Aprendizado | Rotina",
    year: 2027,
    monthIndex: 1,
    day: 2,
    hour: 18,
    markerHour: 8,
    color: "#df8edb",
    desc: "Criar constância: estudar por blocos pequenos, anotar melhor e praticar sem acumular peso.",
    details: [["foco", "consistência"], ["janela", "primeiro mês"], ["ritual", "uma aula por vez"]],
  }),
  createGoal({
    id: "fase",
    n: "05/05",
    title: "Mudança de Fase",
    sub: "Vida | Novo ciclo",
    year: 2027,
    monthIndex: 4,
    day: 1,
    hour: 12,
    markerHour: 10,
    color: "#f48f6a",
    desc: "Fechar pendências, escolher prioridades novas e entrar no próximo ciclo com menos bagunça.",
    details: [["foco", "organização"], ["janela", "últimas semanas"], ["ritual", "cortar excessos"]],
  }),
];

const wallpaperSeeds = [
  [88, 150, 1.1], [122, 326, 0.85], [72, 548, 1], [154, 720, 0.8],
  [868, 150, 1], [922, 326, 0.85], [850, 560, 0.95], [918, 742, 0.78],
  [244, 210, 0.66], [758, 236, 0.7],
];

const sceneShell = document.getElementById("sceneShell");
const portalSvg = document.getElementById("portalSvg");
const dynamicDefs = document.getElementById("dynamicDefs");
const wallpaperMarks = document.getElementById("wallpaperMarks");
const ambientStars = document.getElementById("ambientStars");
const vortexGroup = document.getElementById("vortexGroup");
const threadStitches = document.getElementById("threadStitches");
const watchMotionGroup = document.getElementById("watchMotionGroup");
const watchGroup = document.getElementById("watchGroup");
const watchTicks = document.getElementById("watchTicks");
const watchStars = document.getElementById("watchStars");
const watchNumbers = document.getElementById("watchNumbers");
const clockStars = document.getElementById("clockStars");
const objectiveMarkers = document.getElementById("objectiveMarkers");
const objectivePanel = document.getElementById("objectivePanel");
const objectiveBack = document.getElementById("objectiveBack");
const objectiveNumber = document.getElementById("objectiveNumber");
const objectiveTitle = document.getElementById("objectiveTitle");
const objectiveWhen = document.getElementById("objectiveWhen");
const objectiveStatus = document.getElementById("objectiveStatus");
const objectiveTextA = document.getElementById("objectiveTextA");
const objectiveTextB = document.getElementById("objectiveTextB");
const objectiveDetailA = document.getElementById("objectiveDetailA");
const objectiveDetailB = document.getElementById("objectiveDetailB");
const objectiveDetailC = document.getElementById("objectiveDetailC");
const objectiveDays = document.getElementById("objectiveDays");
const objectiveHours = document.getElementById("objectiveHours");
const objectiveMinutes = document.getElementById("objectiveMinutes");
const objectiveSeconds = document.getElementById("objectiveSeconds");
const buttonsGroup = document.getElementById("buttonsGroup");
const keyGroup = document.getElementById("keyGroup");
const pendulumGroup = document.getElementById("pendulumGroup");
const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");
const watchGlowStopA = document.getElementById("watchGlowStopA");
const watchGlowStopB = document.getElementById("watchGlowStopB");
const bgStopA = document.getElementById("bgStopA");
const bgStopB = document.getElementById("bgStopB");
const bgStopC = document.getElementById("bgStopC");
const liveStatus = document.getElementById("liveStatus");

const state = {
  theme: "otherworld",
  mode: "clock",
  starsOn: true,
  motionLocked: false,
  countdownTarget: Date.now() + 60 * 60 * 1000,
  activeObjectiveId: null,
  pointerX: 0,
  pointerY: 0,
  smoothX: 0,
  smoothY: 0,
};

function createSvg(tag, attrs = {}) {
  const node = document.createElementNS(svgNs, tag);
  Object.entries(attrs).forEach(([key, value]) => {
    node.setAttribute(key, value);
  });
  return node;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((part) => part + part).join("")
    : normalized;

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b].map((part) => clamp(Math.round(part), 0, 255).toString(16).padStart(2, "0")).join("")}`;
}

function mix(colorA, colorB, amount) {
  const a = hexToRgb(colorA);
  const b = hexToRgb(colorB);

  return rgbToHex({
    r: a.r + (b.r - a.r) * amount,
    g: a.g + (b.g - a.g) * amount,
    b: a.b + (b.b - a.b) * amount,
  });
}

function shift(color, amount) {
  return amount >= 0 ? mix(color, "#ffffff", amount) : mix(color, "#000000", Math.abs(amount));
}

function polar(cx, cy, radiusX, radiusY, angle) {
  return [
    cx + Math.cos(angle) * radiusX,
    cy + Math.sin(angle) * radiusY,
  ];
}

function pointsToPath(points) {
  return points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`).join(" ");
}

function buildRibbonPath(cx, cy, outerRadius, innerRadius, phase, warp, oval, twist) {
  const steps = 128;
  const outer = [];
  const inner = [];
  const shiftX = Math.cos(phase + 0.82) * warp * 0.86;
  const shiftY = Math.sin(phase + 0.38) * warp * 0.56;

  for (let step = 0; step <= steps; step += 1) {
    const t = (step / steps) * Math.PI * 2;
    const bandNoise = Math.sin(t * 2.2 + phase) * warp * 0.3;
    const foldNoise = Math.cos(t * 3.6 - phase * 1.25) * warp * 0.18;
    const spiralPull = Math.cos(t - phase * 0.7) * warp * 0.44;
    const edgeLift = Math.sin(t * 4.8 + phase * 0.8) * warp * 0.09;
    const outerR = outerRadius + bandNoise + foldNoise + spiralPull;
    const outerPoint = polar(
      cx + Math.cos(phase) * warp * 0.18,
      cy + Math.sin(phase * 1.1) * warp * 0.14,
      outerR + Math.sin(t * 2.4 + phase) * warp * 0.14,
      (outerR * oval) + edgeLift,
      t + twist
    );

    const innerNoise = Math.sin(t * 2.7 + phase + 0.6) * warp * 0.22;
    const innerFold = Math.cos(t * 4.1 - phase) * warp * 0.16;
    const innerPull = Math.cos(t - phase * 0.82 + 0.75) * warp * 0.36;
    const innerR = innerRadius + innerNoise + innerFold + innerPull;
    const innerPoint = polar(
      cx + shiftX,
      cy + shiftY,
      innerR + Math.sin(t * 2.8 + phase) * warp * 0.12,
      (innerR * (oval - 0.11)) + Math.cos(t * 2.3 - phase) * warp * 0.12,
      t + twist + 0.05
    );

    outer.push(outerPoint);
    inner.push(innerPoint);
  }

  return `${pointsToPath(outer)} ${pointsToPath(inner.reverse())} Z`;
}

function glintPath(x, y, size) {
  const tall = size * 2.2;
  const short = size * 0.52;
  return [
    `M ${x} ${y - tall}`,
    `L ${x + short} ${y - short}`,
    `L ${x + tall} ${y}`,
    `L ${x + short} ${y + short}`,
    `L ${x} ${y + tall}`,
    `L ${x - short} ${y + short}`,
    `L ${x - tall} ${y}`,
    `L ${x - short} ${y - short}`,
    "Z",
  ].join(" ");
}

function buttonPath(cx, cy, r) {
  return `M ${cx - r} ${cy} C ${cx - r} ${cy - r * 0.66} ${cx - r * 0.66} ${cy - r} ${cx} ${cy - r} C ${cx + r * 0.66} ${cy - r} ${cx + r} ${cy - r * 0.66} ${cx + r} ${cy} C ${cx + r} ${cy + r * 0.66} ${cx + r * 0.66} ${cy + r} ${cx} ${cy + r} C ${cx - r * 0.66} ${cy + r} ${cx - r} ${cy + r * 0.66} ${cx - r} ${cy} Z`;
}

function announce(message) {
  liveStatus.textContent = message;
}

function renderWallpaperMarks() {
  wallpaperMarks.replaceChildren();

  wallpaperSeeds.forEach(([x, y, scale], index) => {
    const group = createSvg("g", {
      transform: `translate(${x} ${y}) scale(${scale}) rotate(${index % 2 === 0 ? -8 : 8})`,
      opacity: index > 7 ? "0.22" : "0.34",
    });

    group.appendChild(createSvg("path", {
      d: "M 0 -42 C 28 -18 32 18 0 44 C -32 18 -28 -18 0 -42 Z",
      fill: index % 3 === 0 ? "#b79054" : "#57a8af",
      "fill-opacity": "0.2",
      filter: "url(#paperGrain)",
    }));

    group.appendChild(createSvg("path", {
      d: "M 0 -31 C 13 -12 16 12 0 30 C -16 12 -13 -12 0 -31 Z",
      fill: "#0a0d16",
      "fill-opacity": "0.34",
    }));

    group.appendChild(createSvg("path", {
      d: "M -18 -4 C -8 -12 8 -12 18 -4 M -18 5 C -7 13 7 13 18 5",
      fill: "none",
      stroke: "#e6d49a",
      "stroke-opacity": "0.18",
      "stroke-width": "2",
      "stroke-linecap": "round",
    }));

    wallpaperMarks.appendChild(group);
  });
}

function renderAmbientStars() {
  ambientStars.replaceChildren();

  starPositions.forEach(([x, y, size], index) => {
    const group = createSvg("g", { opacity: index % 3 === 0 ? "0.72" : "0.44" });
    group.appendChild(createSvg("path", {
      d: glintPath(x, y, size),
      fill: index % 4 === 0 ? "#f4d37a" : "#f5f1ff",
      "fill-opacity": index % 3 === 0 ? "0.78" : "0.5",
    }));
    ambientStars.appendChild(group);
  });

  [
    [214, 452, 0.88], [782, 440, 0.76], [700, 186, 0.54], [292, 740, 0.62],
  ].forEach(([x, y, scale], index) => {
    const moth = createSvg("g", {
      transform: `translate(${x} ${y}) scale(${scale}) rotate(${index % 2 ? 18 : -18})`,
      opacity: "0.32",
    });
    moth.appendChild(createSvg("path", { d: "M 0 0 C -28 -26 -46 -9 -28 18 C -18 32 -5 18 0 0 Z", fill: "#f0d17d" }));
    moth.appendChild(createSvg("path", { d: "M 0 0 C 28 -26 46 -9 28 18 C 18 32 5 18 0 0 Z", fill: "#74d0c4" }));
    moth.appendChild(createSvg("path", { d: "M 0 -18 C 5 -6 5 12 0 26 C -5 12 -5 -6 0 -18 Z", fill: "#090b12" }));
    ambientStars.appendChild(moth);
  });
}

function renderWatchSky() {
  watchStars.replaceChildren();
  watchTicks.replaceChildren();
  watchNumbers.replaceChildren();
  clockStars.replaceChildren();

  const glowBlobs = [
    { cx: -26, cy: -18, rx: 20, ry: 16, fill: "#f4d37a", opacity: 0.12 },
    { cx: 24, cy: -30, rx: 18, ry: 15, fill: "#fff2c8", opacity: 0.12 },
    { cx: 10, cy: 16, rx: 24, ry: 18, fill: "#2d7a74", opacity: 0.06 },
  ];

  glowBlobs.forEach((blob) => {
    watchStars.appendChild(createSvg("ellipse", {
      ...blob,
      filter: "url(#softGlow)",
    }));
  });

  watchSkyDots.forEach(([cx, cy, r]) => {
    watchStars.appendChild(createSvg("circle", {
      cx,
      cy,
      r,
      class: "watch-dot",
    }));
  });

  watchStars.appendChild(createSvg("path", {
    d: glintPath(-6, -8, 1.8),
    fill: "#f9ffff",
    "fill-opacity": "0.68",
  }));

  for (let tick = 0; tick < 60; tick += 1) {
    const angle = ((tick / 60) * Math.PI * 2) - (Math.PI / 2);
    const isHour = tick % 5 === 0;
    const inner = isHour ? 66 : 70;
    const outer = isHour ? 73 : 72;
    const [x1, y1] = polar(0, 0, inner, inner, angle);
    const [x2, y2] = polar(0, 0, outer, outer, angle);

    watchTicks.appendChild(createSvg("line", {
      x1: x1.toFixed(2),
      y1: y1.toFixed(2),
      x2: x2.toFixed(2),
      y2: y2.toFixed(2),
      stroke: isHour ? "rgba(5, 5, 5, 0.78)" : "rgba(5, 5, 5, 0.5)",
      "stroke-width": isHour ? "2.2" : "1.2",
      "stroke-linecap": "round",
    }));
  }

  for (let hour = 1; hour <= 12; hour += 1) {
    const angle = ((hour / 12) * Math.PI * 2) - (Math.PI / 2);
    const [x, y] = polar(0, 0, 62, 62, angle);
    watchNumbers.appendChild(createSvg("text", {
      x: x.toFixed(2),
      y: y.toFixed(2),
      class: "watch-numeral",
    }));
    watchNumbers.lastChild.textContent = String(hour);
  }

  [
    [-88, -116, 7], [-50, -138, 4], [52, -132, 7], [94, -92, 5],
    [-126, -20, 5], [122, 20, 5], [-82, 114, 4], [74, 112, 5],
  ].forEach(([x, y, size]) => {
    clockStars.appendChild(createSvg("path", {
      d: glintPath(x, y, size),
      fill: "#f4be55",
      "fill-opacity": "0.9",
    }));
  });
}

function renderObjectiveMarkers() {
  objectiveMarkers.replaceChildren();

  objectiveItems.forEach((item) => {
    const angle = ((item.markerHour / 12) * Math.PI * 2) - (Math.PI / 2);
    const [x, y] = polar(0, 0, 103, 103, angle);
    const marker = createSvg("g", {
      class: "objective-marker",
      tabindex: "0",
      role: "button",
      "data-objective": item.id,
      "aria-label": `${item.title}: toque para ver a contagem`,
      transform: `translate(${x.toFixed(2)} ${y.toFixed(2)})`,
    });

    marker.appendChild(createSvg("circle", {
      class: "objective-marker-glow",
      r: "21",
      fill: item.color,
      filter: "url(#softGlow)",
    }));
    marker.appendChild(createSvg("circle", {
      class: "objective-marker-ring",
      r: "18",
      fill: item.color,
      stroke: "#020305",
      "stroke-opacity": "0.78",
      "stroke-width": "2.2",
    }));
    [[-5, -5], [5, -5], [-5, 5], [5, 5]].forEach(([cx, cy]) => {
      marker.appendChild(createSvg("circle", {
        cx,
        cy,
        r: "3.2",
        fill: "#020305",
        "fill-opacity": "0.88",
      }));
    });
    marker.appendChild(createSvg("circle", {
      class: "focus-ring",
      r: "23",
      fill: "none",
      stroke: "#f8f4d8",
      "stroke-width": "2",
    }));
    marker.appendChild(createSvg("circle", {
      class: "hit-area",
      r: "25",
      fill: "transparent",
    }));

    bindInteractive(marker, () => selectObjective(item.id), { stopPropagation: true });
    objectiveMarkers.appendChild(marker);
  });
}

function renderStitches(theme) {
  threadStitches.replaceChildren();

  for (let index = 0; index < 56; index += 1) {
    const angle = (index / 56) * Math.PI * 2;
    const radiusX = 268 + Math.sin(index * 1.7) * 18;
    const radiusY = 215 + Math.cos(index * 1.2) * 12;
    const [cx, cy] = polar(500, 432, radiusX, radiusY, angle);
    const stitchAngle = angle + Math.PI / 2 + Math.sin(index) * 0.35;
    const len = index % 5 === 0 ? 20 : 13;
    const [x1, y1] = polar(cx, cy, len, len, stitchAngle);
    const [x2, y2] = polar(cx, cy, len, len, stitchAngle + Math.PI);

    threadStitches.appendChild(createSvg("line", {
      x1: x1.toFixed(2),
      y1: y1.toFixed(2),
      x2: x2.toFixed(2),
      y2: y2.toFixed(2),
      stroke: index % 4 === 0 ? theme.thread : "#e7eef0",
      "stroke-opacity": index % 4 === 0 ? "0.32" : "0.18",
      "stroke-width": index % 5 === 0 ? "2.3" : "1.6",
      "stroke-linecap": "round",
    }));
  }

  [
    [315, 760, 92, -12], [684, 760, 92, 12], [500, 226, 110, 0],
  ].forEach(([cx, cy, width, rotate], row) => {
    for (let index = 0; index < 10; index += 1) {
      const x = cx - width / 2 + index * (width / 9);
      threadStitches.appendChild(createSvg("line", {
        x1: x - 5,
        y1: cy - 7,
        x2: x + 5,
        y2: cy + 7,
        stroke: row === 2 ? theme.thread : "#cceff0",
        "stroke-opacity": "0.22",
        "stroke-width": "1.8",
        "stroke-linecap": "round",
        transform: `rotate(${rotate} ${x} ${cy})`,
      }));
    }
  });
}

function renderVortex(theme) {
  dynamicDefs.replaceChildren();
  vortexGroup.replaceChildren();

  const ringCount = 17;
  const centerX = 500;
  const centerY = 410;

  for (let index = 0; index < ringCount; index += 1) {
    const progress = index / (ringCount - 1);
    const outerRadius = 646 - index * 36;
    const bandWidth = 112 - index * 3 + Math.sin(index * 0.9) * 14;
    const innerRadius = outerRadius - bandWidth;
    const phase = 0.55 + index * 0.63;
    const twist = -0.58 + index * 0.09;
    const warp = 62 - index * 2.4;
    const oval = 0.78 + Math.sin(index * 0.51) * 0.12;
    const ribbonPath = buildRibbonPath(centerX, centerY, outerRadius, innerRadius, phase, warp, oval, twist);
    const gradientId = `ringGradient${index}`;
    const base = theme.rings[index % theme.rings.length];
    const second = theme.rings[(index + 1) % theme.rings.length];
    const third = theme.rings[(index + 3) % theme.rings.length];
    const light = shift(base, 0.1);
    const shadow = shift(base, -0.2);

    const gradient = createSvg("linearGradient", {
      id: gradientId,
      gradientUnits: "userSpaceOnUse",
      x1: String(120 + index * 18),
      y1: String(100 + index * 6),
      x2: String(880 - index * 12),
      y2: String(820 - index * 18),
    });

    gradient.appendChild(createSvg("stop", { offset: "0%", "stop-color": shadow }));
    gradient.appendChild(createSvg("stop", { offset: "18%", "stop-color": base }));
    gradient.appendChild(createSvg("stop", { offset: "44%", "stop-color": light }));
    gradient.appendChild(createSvg("stop", { offset: "68%", "stop-color": second }));
    gradient.appendChild(createSvg("stop", { offset: "100%", "stop-color": third }));
    dynamicDefs.appendChild(gradient);

    vortexGroup.appendChild(createSvg("path", {
      d: ribbonPath,
      fill: "#000000",
      opacity: String(0.11 + progress * 0.12),
      transform: `translate(${6 + index * 0.2} ${8 + index * 0.28})`,
    }));

    vortexGroup.appendChild(createSvg("path", {
      d: ribbonPath,
      fill: `url(#${gradientId})`,
      opacity: String(0.97 - progress * 0.035),
      filter: "url(#clothTexture)",
    }));

    vortexGroup.appendChild(createSvg("path", {
      d: ribbonPath,
      fill: "none",
      stroke: shift(light, 0.16),
      "stroke-opacity": String(0.06 - progress * 0.012),
      "stroke-width": String(4.2 - progress * 1.2),
      "stroke-linejoin": "round",
    }));

    vortexGroup.appendChild(createSvg("path", {
      d: ribbonPath,
      fill: "none",
      stroke: "#000000",
      "stroke-opacity": String(0.16 + progress * 0.06),
      "stroke-width": String(11 - progress * 3.4),
      "stroke-linejoin": "round",
    }));
  }

  vortexGroup.appendChild(createSvg("ellipse", {
    cx: String(centerX),
    cy: String(centerY + 12),
    rx: "188",
    ry: "152",
    fill: theme.accent,
    "fill-opacity": "0.036",
    filter: "url(#softGlow)",
  }));
}

function buildButtonGradient(id, metal, active, accent) {
  const gradient = createSvg("radialGradient", {
    id,
    cx: "32%",
    cy: "28%",
    r: "72%",
  });

  gradient.appendChild(createSvg("stop", { offset: "0%", "stop-color": shift(metal, 0.26) }));
  gradient.appendChild(createSvg("stop", { offset: "34%", "stop-color": metal }));
  gradient.appendChild(createSvg("stop", { offset: "100%", "stop-color": active ? shift(metal, -0.18) : shift(metal, -0.38) }));
  dynamicDefs.appendChild(gradient);

  const glowId = `${id}Glow`;
  const glow = createSvg("radialGradient", {
    id: glowId,
    cx: "50%",
    cy: "50%",
    r: "70%",
  });

  glow.appendChild(createSvg("stop", { offset: "0%", "stop-color": accent, "stop-opacity": active ? "0.36" : "0.08" }));
  glow.appendChild(createSvg("stop", { offset: "100%", "stop-color": accent, "stop-opacity": "0" }));
  dynamicDefs.appendChild(glow);

  return { fillId: id, glowId };
}

function renderButtons(themeName) {
  buttonsGroup.replaceChildren();

  themeButtons.forEach((config) => {
    const active = config.theme === themeName;
    const group = createSvg("g", {
      class: `interactive-shape theme-button${active ? " is-active" : ""}`,
      tabindex: "0",
      role: "button",
      "aria-label": `Aplicar tema ${themes[config.theme].label}`,
      "data-theme": config.theme,
      transform: `translate(${config.x} ${config.y})`,
    });
    const ids = buildButtonGradient(`button${config.theme}`, config.metal, active, themes[config.theme].accent);

    group.appendChild(createSvg("ellipse", {
      cx: "4",
      cy: String(config.r * 0.92),
      rx: String(config.r * 0.96),
      ry: String(config.r * 0.34),
      fill: "#000000",
      "fill-opacity": "0.26",
      filter: "url(#deepBlur)",
    }));

    group.appendChild(createSvg("circle", {
      class: "button-glow",
      r: String(config.r + 10),
      fill: `url(#${ids.glowId})`,
      opacity: active ? "0.18" : "0.04",
      filter: "url(#softGlow)",
    }));

    group.appendChild(createSvg("circle", {
      class: "button-core",
      r: String(config.r),
      fill: `url(#${ids.fillId})`,
      stroke: active ? "rgba(244, 216, 126, 0.58)" : "rgba(255, 255, 255, 0.08)",
      "stroke-width": active ? "2.4" : "1.6",
      filter: "url(#paintTexture)",
    }));

    [
      [-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18],
    ].forEach(([x, y]) => {
      group.appendChild(createSvg("circle", {
        cx: String(config.r * x),
        cy: String(config.r * y),
        r: String(config.r * 0.14),
        fill: "#090a10",
      }));
    });

    group.appendChild(createSvg("path", {
      d: `M ${-config.r * 0.34} ${-config.r * 0.34} L ${config.r * 0.34} ${config.r * 0.34} M ${config.r * 0.34} ${-config.r * 0.34} L ${-config.r * 0.34} ${config.r * 0.34}`,
      stroke: "#edf1ec",
      "stroke-opacity": active ? "0.2" : "0.1",
      "stroke-width": String(Math.max(1.2, config.r * 0.05)),
      "stroke-linecap": "round",
    }));

    group.appendChild(createSvg("circle", {
      cx: String(-config.r * 0.24),
      cy: String(-config.r * 0.3),
      r: String(config.r * 0.26),
      fill: "#ffffff",
      "fill-opacity": "0.08",
      filter: "url(#softGlow)",
    }));

    group.appendChild(createSvg("circle", {
      class: "focus-ring",
      r: String(config.r + 11),
      fill: "none",
      stroke: "rgba(215, 241, 255, 0.95)",
      "stroke-width": "3",
    }));
    group.appendChild(createSvg("circle", {
      class: "hit-area",
      r: String(config.r + 14),
      fill: "transparent",
    }));

    buttonsGroup.appendChild(group);
  });

  buttonsGroup.querySelectorAll("[data-theme]").forEach((button) => {
    bindInteractive(button, () => {
      setTheme(button.getAttribute("data-theme"));
    });
  });
}

function updateBackdrop(theme) {
  bgStopA.setAttribute("stop-color", theme.bg[0]);
  bgStopB.setAttribute("stop-color", theme.bg[1]);
  bgStopC.setAttribute("stop-color", theme.bg[2]);
}

function updateWatchGlow(theme) {
  if (state.mode === "clock") {
    watchGlowStopA.setAttribute("stop-color", theme.accent);
    watchGlowStopA.setAttribute("stop-opacity", "0.54");
    watchGlowStopB.setAttribute("stop-color", theme.thread);
    watchGlowStopB.setAttribute("stop-opacity", "0.24");
    return;
  }

  watchGlowStopA.setAttribute("stop-color", "#efc07b");
  watchGlowStopA.setAttribute("stop-opacity", "0.68");
  watchGlowStopB.setAttribute("stop-color", "#c16a53");
  watchGlowStopB.setAttribute("stop-opacity", "0.3");
}

function setTheme(name) {
  const theme = themes[name] || themes.otherworld;
  state.theme = name;
  updateBackdrop(theme);
  renderVortex(theme);
  renderStitches(theme);
  renderButtons(name);
  updateWatchGlow(theme);
  announce(`Tema ${theme.label} ativado`);
}

function pad(value, length = 2) {
  return String(Math.max(0, value)).padStart(length, "0");
}

function resetCountdown() {
  state.countdownTarget = Date.now() + 60 * 60 * 1000;
}

function updateHands(hourDegrees, minuteDegrees, secondDegrees) {
  hourHand.setAttribute("transform", `rotate(${hourDegrees.toFixed(2)})`);
  minuteHand.setAttribute("transform", `rotate(${minuteDegrees.toFixed(2)})`);
  secondHand.setAttribute("transform", `rotate(${secondDegrees.toFixed(2)})`);
}

function formatCountdown(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function plural(value, singular, pluralForm) {
  return `${value} ${value === 1 ? singular : pluralForm}`;
}

function getGoalDistance(targetDate) {
  const difference = targetDate.getTime() - Date.now();
  const absoluteDifference = Math.abs(difference);

  return {
    isFuture: difference >= 0,
    totalMs: absoluteDifference,
    days: Math.floor(absoluteDifference / 864e5),
    hours: Math.floor((absoluteDifference % 864e5) / 36e5),
    minutes: Math.floor((absoluteDifference % 36e5) / 6e4),
    seconds: Math.floor((absoluteDifference % 6e4) / 1e3),
  };
}

function formatVerboseDistance(distance) {
  const totalSeconds = Math.max(0, Math.floor(distance.totalMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts = [
    plural(days, "dia", "dias"),
    plural(hours, "hora", "horas"),
    plural(minutes, "minuto", "minutos"),
    `${seconds}s`,
  ];

  return `${parts.slice(0, -1).join(" ")} e ${parts[parts.length - 1]}`;
}

function splitDescription(text) {
  const limit = 46;

  if (text.length <= limit) {
    return [text, ""];
  }

  const splitAt = text.lastIndexOf(" ", limit);
  return [
    text.slice(0, splitAt > 0 ? splitAt : limit),
    text.slice(splitAt > 0 ? splitAt + 1 : limit),
  ];
}

function getActiveObjective() {
  return objectiveItems.find((item) => item.id === state.activeObjectiveId) || null;
}

function updateObjectivePanel() {
  const item = getActiveObjective();

  if (!item) {
    return;
  }

  const distance = getGoalDistance(item.date);
  const [descA, descB] = splitDescription(item.desc);
  const detailA = item.details[0] || ["", ""];
  const detailB = item.details[1] || ["", ""];
  const detailC = item.details[2] || ["", ""];

  objectiveNumber.textContent = item.n;
  objectiveTitle.textContent = item.title;
  objectiveWhen.textContent = item.dateLabel;
  objectiveStatus.textContent = distance.isFuture ? "tempo restante" : "tempo desde o evento";
  objectiveTextA.textContent = descA;
  objectiveTextB.textContent = descB;
  objectiveDetailA.textContent = detailA[1];
  objectiveDetailB.textContent = detailB[1];
  objectiveDetailC.textContent = detailC[1];
  objectiveDays.textContent = pad(distance.days, 3);
  objectiveHours.textContent = pad(distance.hours);
  objectiveMinutes.textContent = pad(distance.minutes);
  objectiveSeconds.textContent = pad(distance.seconds);
}

function setActiveObjectiveClass() {
  objectiveMarkers.querySelectorAll(".objective-marker").forEach((marker) => {
    marker.classList.toggle("is-active", marker.getAttribute("data-objective") === state.activeObjectiveId);
  });
}

function selectObjective(id) {
  const item = objectiveItems.find((candidate) => candidate.id === id);

  if (!item) {
    return;
  }

  state.activeObjectiveId = id;
  objectivePanel.classList.add("is-visible");
  objectivePanel.setAttribute("aria-hidden", "false");
  objectivePanel.setAttribute("opacity", "1");
  setActiveObjectiveClass();
  updateObjectivePanel();
  const distance = getGoalDistance(item.date);
  const prefix = distance.isFuture ? "Faltam" : "Já se passaram";
  announce(`${item.title}. ${prefix} ${formatVerboseDistance(distance)}. ${item.desc}`);
}

function closeObjectivePanel() {
  state.activeObjectiveId = null;
  objectivePanel.classList.remove("is-visible");
  objectivePanel.setAttribute("aria-hidden", "true");
  objectivePanel.setAttribute("opacity", "0");
  setActiveObjectiveClass();
  announce("Voltou para o relógio");
}

function syncWatch() {
  const now = new Date();
  const timestamp = Date.now();
  updateObjectivePanel();

  if (state.mode === "clock") {
    const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
    const minutes = now.getMinutes() + seconds / 60;
    const hours = (now.getHours() % 12) + minutes / 60;

    updateHands(hours * 30, minutes * 6, seconds * 6);
    watchGroup.setAttribute("aria-label", `Relógio do portal mostrando ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);
    return;
  }

  const remaining = Math.max(0, state.countdownTarget - timestamp);
  const totalSeconds = remaining / 1000;
  const seconds = totalSeconds % 60;
  const minutes = (totalSeconds / 60) % 60;
  const hourProgress = minutes / 60;

  updateHands(hourProgress * 360, minutes * 6, seconds * 6);
  watchGroup.setAttribute("aria-label", `Contagem regressiva do portal: ${formatCountdown(remaining)}`);
}

function toggleMode() {
  state.mode = state.mode === "clock" ? "countdown" : "clock";
  sceneShell.dataset.mode = state.mode;

  if (state.mode === "countdown") {
    resetCountdown();
    announce("Contagem regressiva ativada");
  } else {
    announce("Hora local restaurada");
  }

  updateWatchGlow(themes[state.theme]);
}

function toggleMotion() {
  state.motionLocked = !state.motionLocked;
  sceneShell.dataset.motion = state.motionLocked ? "locked" : "flowing";

  if (state.motionLocked) {
    state.pointerX = 0;
    state.pointerY = 0;
  }

  announce(state.motionLocked ? "Movimento do portal travado" : "Movimento do portal liberado");
}

function toggleStars() {
  state.starsOn = !state.starsOn;
  sceneShell.dataset.stars = state.starsOn ? "on" : "off";
  announce(state.starsOn ? "Brilhos ativados" : "Brilhos ocultos");
}

function bindInteractive(node, handler, options = {}) {
  node.addEventListener("click", (event) => {
    if (options.stopPropagation) {
      event.stopPropagation();
    }

    handler();
  });
  node.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      if (options.stopPropagation) {
        event.stopPropagation();
      }

      event.preventDefault();
      handler();
    }
  });
}

function handlePointerMove(event) {
  if (state.motionLocked) {
    return;
  }

  const bounds = portalSvg.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  state.pointerX = clamp(x, -0.5, 0.5);
  state.pointerY = clamp(y, -0.5, 0.5);
}

function handlePointerLeave() {
  if (!state.motionLocked) {
    state.pointerX = 0;
    state.pointerY = 0;
  }
}

function animateScene(timestamp) {
  syncWatch();

  const motionFactor = state.motionLocked ? 0 : 1;
  state.smoothX += ((state.pointerX * motionFactor) - state.smoothX) * 0.06;
  state.smoothY += ((state.pointerY * motionFactor) - state.smoothY) * 0.06;

  const breathe = state.motionLocked ? 0 : Math.sin(timestamp * 0.00042);
  const pendulum = state.motionLocked ? 0 : Math.sin(timestamp * 0.0024) * 7;
  const driftX = state.smoothX * 34;
  const driftY = state.smoothY * 24;

  vortexGroup.setAttribute(
    "transform",
    `translate(${driftX.toFixed(2)} ${driftY.toFixed(2)}) rotate(${(breathe * 0.9).toFixed(2)} 500 422) scale(${(1 + breathe * 0.006).toFixed(4)})`
  );

  threadStitches.setAttribute(
    "transform",
    `translate(${(driftX * 0.7).toFixed(2)} ${(driftY * 0.62).toFixed(2)}) rotate(${(breathe * -0.7).toFixed(2)} 500 432)`
  );

  watchMotionGroup.setAttribute(
    "transform",
    `translate(${(driftX * 0.24).toFixed(2)} ${(driftY * 0.18).toFixed(2)})`
  );

  pendulumGroup.setAttribute("transform", `rotate(${pendulum.toFixed(2)} 0 100)`);
  ambientStars.setAttribute("transform", `translate(${(driftX * -0.12).toFixed(2)} ${(driftY * -0.08).toFixed(2)})`);
  buttonsGroup.setAttribute("transform", `translate(${(driftX * 0.07).toFixed(2)} ${(driftY * 0.06).toFixed(2)})`);
  requestAnimationFrame(animateScene);
}

renderWallpaperMarks();
renderAmbientStars();
renderWatchSky();
renderObjectiveMarkers();
setTheme(state.theme);
sceneShell.dataset.stars = state.starsOn ? "on" : "off";
sceneShell.dataset.motion = state.motionLocked ? "locked" : "flowing";
sceneShell.dataset.mode = state.mode;

bindInteractive(watchGroup, toggleMode);
bindInteractive(keyGroup, toggleMotion);
bindInteractive(objectiveBack, closeObjectivePanel, { stopPropagation: true });

portalSvg.addEventListener("pointermove", handlePointerMove);
portalSvg.addEventListener("pointerleave", handlePointerLeave);

requestAnimationFrame(animateScene);
