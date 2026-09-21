"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { journal, regions, type Encounter } from "@/lib/game-data";

type Screen = "menu" | "game" | "journal" | "arrest" | "complete";
type SaveData = { region: number; solved: number[]; pages: number; x: number; y: number; arrested: boolean };
const defaultSave: SaveData = { region: 0, solved: [], pages: 0, x: 50, y: 77, arrested: false };
const SAVE_KEY = "bien-nien-su-binh-minh-v2";

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function stableShuffle<T>(items: T[], seedText: string) {
  let seed = 2166136261;
  for (let i = 0; i < seedText.length; i++) {
    seed ^= seedText.charCodeAt(i);
    seed = Math.imul(seed, 16777619);
  }
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    seed = Math.imul(seed ^ (seed >>> 15), 2246822519);
    const j = (seed >>> 0) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function npcKind(name: string, role: string) {
  const text = `${name} ${role}`.toLowerCase();
  if (/thủ thư|giáo sư|giảng viên|nhà nghiên cứu/.test(text)) return "scholar";
  if (/đưa thư|bưu tá|giao thư/.test(text)) return "courier";
  if (/ông trùm|màn sương/.test(text)) return "boss";
  if (/thợ in/.test(text)) return "printer";
  if (/công nhân|thợ cả|cơ khí|kỹ sư/.test(text)) return "worker";
  if (/nông dân|nông nghiệp/.test(text)) return "farmer";
  if (/sinh viên|học sinh|thanh niên/.test(text)) return "student";
  if (/luật|đại biểu|cán bộ|chủ tịch/.test(text)) return "official";
  if (/nghệ nhân|dân tộc|làng|trưởng bản/.test(text)) return "artisan";
  if (/tôn giáo|chức sắc|sư|linh mục/.test(text)) return "religious";
  if (/mẹ|cha|bà|ông|gia đình|phụ nữ/.test(text)) return "family";
  return "citizen";
}

function VoxelAvatar({ badge, variant, large = false, name = "", role = "" }: { badge: string; variant: number; large?: boolean; name?: string; role?: string }) {
  const kind = npcKind(name, role);
  return <span className={`voxel-avatar voxel-${variant % 5} npc-${kind} ${large ? "large" : ""}`}>
    <i className="voxel-hat"/><i className="voxel-head"/><i className="voxel-hair"/><i className="voxel-shirt"/><i className="voxel-legs"/><i className="voxel-tool"/>{kind === "boss" && <em className="boss-mustache"/>}<b>{badge}</b>
  </span>;
}

function objectKind(name: string) {
  const text = name.toLowerCase();
  if (text.includes("kho thóc")) return "granary";
  if (text.includes("xưởng máy")) return "workshop";
  if (text.includes("hòm thư")) return "mailbox";
  if (text.includes("trạm tin")) return "radio";
  if (text.includes("cột mốc")) return "milestone";
  if (text.includes("bản đồ")) return "map";
  if (text.includes("bia ")) return "tablet";
  if (text.includes("bếp")) return "kitchen";
  if (text.includes("góc học")) return "study";
  return null;
}

function EncounterAvatar({ encounter, variant, large = false }: { encounter: Encounter; variant: number; large?: boolean }) {
  const kind = objectKind(encounter.name);
  if (!kind) return <VoxelAvatar badge={encounter.icon} variant={variant} name={encounter.name} role={encounter.role} large={large}/>;
  return <span className={`world-object object-${kind} ${large ? "large" : ""}`}><i/><b>{encounter.icon}</b></span>;
}

function RegionScenery({ id }: { id: string }) {
  const sites: Record<string, { label: string; type: string }[]> = {
    library: [{ label: "ĐẠI THƯ VIỆN", type: "archive" }, { label: "NHÀ IN", type: "printshop" }, { label: "VƯỜN ĐỌC", type: "reading" }],
    workers: [{ label: "NHÀ MÁY", type: "factory" }, { label: "THÁP NƯỚC", type: "watertower" }, { label: "KHO VẬT TƯ", type: "warehouse" }, { label: "TRẠM ĐIỆN", type: "power" }],
    transition: [{ label: "XÓM BỜ CŨ", type: "oldtown" }, { label: "CẦU QUÁ ĐỘ", type: "bridge" }, { label: "KHU BỜ MỚI", type: "newtown" }],
    democracy: [{ label: "HỘI TRƯỜNG", type: "assembly" }, { label: "TÒA PHÁP LUẬT", type: "court" }, { label: "ĐIỂM TIẾP DÂN", type: "citizen" }],
    alliance: [{ label: "HỢP TÁC XÃ", type: "cooperative" }, { label: "TRẠM KỸ THUẬT", type: "agritech" }, { label: "KÊNH THỦY LỢI", type: "canal" }],
    unity: [{ label: "NHÀ VĂN HÓA", type: "culture" }, { label: "BẾN THUYỀN", type: "harbor" }, { label: "CHỢ ĐOÀN KẾT", type: "market" }, { label: "HẢI ĐĂNG", type: "lighthouse" }],
    family: [{ label: "NHÀ BA GIAN", type: "home" }, { label: "BẾP VÀ SÂN", type: "courtyard" }, { label: "VƯỜN BÌNH MINH", type: "garden" }]
  };
  return <div className={`scene scene-${id}`} aria-hidden="true">
    <div className="scene-land land-a"/><div className="scene-land land-b"/>
    <div className="site-layer">{(sites[id] ?? []).map((site, index) => <div key={site.type} className={`landmark landmark-${String.fromCharCode(97 + index)} site-${site.type}`}><i/><b>{site.label}</b></div>)}</div>
    <div className="scene-detail detail-a"/><div className="scene-detail detail-b"/><div className="scene-detail detail-c"/>
    <div className="scene-props">{Array.from({ length: 10 }, (_, i) => <i key={i} className={`prop p${i + 1}`}/>)}</div>
  </div>;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [save, setSave] = useState<SaveData>(defaultSave);
  const [hasSave, setHasSave] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [line, setLine] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [toast, setToast] = useState("");
  const [muted, setMuted] = useState(false);
  const keys = useRef<Set<string>>(new Set());
  const saveRef = useRef(save);
  const playerRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<{ context: AudioContext; timer: number } | null>(null);
  const positionRef = useRef({ x: defaultSave.x, y: defaultSave.y });
  const region = regions[save.region];
  const solvedSet = useMemo(() => new Set(save.solved), [save.solved]);
  const nearby = useMemo(() => region?.encounters.findIndex((e) => distance(e.position, save) < 10) ?? -1, [region, save]);

  useEffect(() => {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<SaveData>;
        const restored = { ...defaultSave, ...parsed, region: Math.min(Number(parsed.region ?? 0), regions.length - 1), pages: Number(parsed.pages ?? 0) };
        positionRef.current = { x: restored.x, y: restored.y };
        setSave(restored);
        setHasSave(true);
      } catch { localStorage.removeItem(SAVE_KEY); }
    }
  }, []);

  useEffect(() => { saveRef.current = save; }, [save]);
  useEffect(() => {
    if (muted || screen === "menu") {
      if (musicRef.current) { window.clearInterval(musicRef.current.timer); void musicRef.current.context.close(); musicRef.current = null; }
      return;
    }
    const context = new AudioContext();
    const notes = [220, 261.63, 293.66, 329.63, 293.66, 261.63, 196, 220];
    let step = 0;
    const play = () => {
      if (context.state === "suspended") void context.resume();
      const oscillator = context.createOscillator(); const gain = context.createGain();
      oscillator.type = "square"; oscillator.frequency.value = notes[step++ % notes.length];
      gain.gain.setValueAtTime(.0001, context.currentTime); gain.gain.exponentialRampToValueAtTime(.035, context.currentTime + .02); gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + .3);
      oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + .32);
    };
    play(); const timer = window.setInterval(play, 420); musicRef.current = { context, timer };
    return () => { window.clearInterval(timer); void context.close(); musicRef.current = null; };
  }, [muted, screen]);
  useEffect(() => {
    positionRef.current = { x: save.x, y: save.y };
  }, [save.region]);
  useEffect(() => {
    if (!hasSave && screen === "menu") return;
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  }, [save, hasSave, screen]);

  const interact = useCallback(() => {
    if (active !== null || screen !== "game") return;
    const current = saveRef.current;
    const i = regions[current.region].encounters.findIndex((e) => distance(e.position, current) < 10);
    if (i >= 0) { setActive(i); setLine(0); setFeedback(""); }
  }, [active, screen]);

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", "e", " "].includes(key)) event.preventDefault();
      keys.current.add(key);
      if ((key === "e" || key === " ") && !event.repeat) interact();
      if (key === "j") setScreen((s) => s === "journal" ? "game" : "journal");
      if (key === "escape") { setActive(null); setScreen("menu"); }
    };
    const up = (event: KeyboardEvent) => keys.current.delete(event.key.toLowerCase());
    window.addEventListener("keydown", down); window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [interact]);

  useEffect(() => {
    if (screen !== "game" || active !== null) return;
    let frame = 0; let last = performance.now(); let lastCommit = last;
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.034); last = now;
      const k = keys.current; let dx = 0; let dy = 0;
      if (k.has("a") || k.has("arrowleft")) dx--;
      if (k.has("d") || k.has("arrowright")) dx++;
      if (k.has("w") || k.has("arrowup")) dy--;
      if (k.has("s") || k.has("arrowdown")) dy++;
      if (dx || dy) {
        const length = Math.hypot(dx, dy) || 1;
        const pos = positionRef.current;
        pos.x = Math.max(5, Math.min(95, pos.x + (dx / length) * 27 * dt));
        pos.y = Math.max(12, Math.min(88, pos.y + (dy / length) * 27 * dt));
        if (playerRef.current) {
          playerRef.current.style.left = `${pos.x}%`;
          playerRef.current.style.top = `${pos.y}%`;
          playerRef.current.classList.add("walking");
          playerRef.current.dataset.facing = dx < 0 ? "left" : dx > 0 ? "right" : "front";
        }
        if (now - lastCommit > 110) {
          lastCommit = now;
          setSave((s) => ({ ...s, x: pos.x, y: pos.y }));
        }
      } else if (playerRef.current) playerRef.current.classList.remove("walking");
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick); return () => {
      cancelAnimationFrame(frame);
      const pos = positionRef.current;
      setSave((s) => ({ ...s, x: pos.x, y: pos.y }));
    };
  }, [screen, active]);

  const newGame = () => { setSave(defaultSave); setHasSave(true); setScreen("game"); };
  const choose = (correct: boolean, text: string) => {
    setFeedback(text);
    if (!correct || active === null) return;
    const key = save.region * 10 + active;
    const isBoss = encounter?.name === "Ông Trùm Màn Sương";
    setSave((s) => ({ ...s, arrested: s.arrested || isBoss, solved: s.solved.includes(key) ? s.solved : [...s.solved, key] }));
    if (isBoss) window.setTimeout(() => { setActive(null); setScreen("arrest"); }, 900);
  };
  const closeEncounter = () => { setActive(null); setLine(0); setFeedback(""); };
  const regionComplete = region && region.encounters.every((_, i) => solvedSet.has(save.region * 10 + i));
  const claimCrystal = () => {
    if (!regionComplete) return;
    if (save.region === regions.length - 1) {
      setSave((s) => ({ ...s, pages: 7 })); setScreen("complete"); return;
    }
    setToast(`Khôi phục “${region.pageName}” · Đã mở ${regions[save.region + 1].title}`);
    setTimeout(() => setToast(""), 3200);
    setSave((s) => ({ ...s, region: s.region + 1, pages: Math.max(s.pages, s.region + 1), x: 50, y: 78 }));
  };

  const encounter: Encounter | null = active === null ? null : region.encounters[active];
  const displayAnswers = useMemo(() => {
    if (!encounter) return [];
    return stableShuffle(encounter.answers, `${region.id}:${encounter.name}:${encounter.question}`);
  }, [encounter, region.id]);

  if (screen === "menu") return <main className="menu-shell">
    <div className="stars" />
    <section className="menu-copy">
      <div className="eyebrow">Một hành trình tư tưởng · Bảy trang lịch sử</div>
      <h1>BIÊN NIÊN<br/><span>SỬ BÌNH MINH</span></h1>
      <p className="menu-lead">Bước vào Cộng hòa Bình Minh, khôi phục bảy trang ký ức và biến tri thức về chủ nghĩa xã hội khoa học thành hành động.</p>
      <div className="menu-actions">
        <button className="primary" onClick={newGame}><span>✦</span> Bắt đầu hành trình</button>
        {hasSave && <button className="secondary" onClick={() => setScreen("game")}>Tiếp tục</button>}
      </div>
      <div className="feature-row"><span>⌨ WASD để di chuyển</span><span>▤ 7 chương</span><span>▣ Lưu tự động</span></div>
    </section>
    <section className="world-preview" aria-label="Bản đồ Econia">
      <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
      <img src="/assets/chronicle-map.svg" alt="Bản đồ Cộng hòa Bình Minh" className="hero-art"/>
      {[0,1,2,3,4,5,6].map((i) => <div key={i} className={`crystal c${i + 1}`}>{regions[i].glyph}</div>)}
      <div className="preview-card"><small>TRANG ĐẦU TIÊN</small><strong>Thư Viện Những Lối Rẽ</strong><span>Nơi khát vọng phải vượt qua thử thách của khoa học</span></div>
    </section>
    <footer className="menu-footer">Chủ nghĩa xã hội khoa học <span>•</span> Interactive Edition</footer>
  </main>;

  if (screen === "journal") return <main className="journal-screen">
    <header><button className="back" onClick={() => setScreen("game")}>← Trở lại hành trình</button><div><span>BIÊN NIÊN SỬ TƯƠNG LAI</span><h2>Bảy trang ký ức</h2></div><div className="crystal-count">▤ {save.pages}/7</div></header>
    <div className="journal-grid">{journal.map((entry, i) => {
      const unlocked = i <= save.region;
      return <article className={unlocked ? "journal-card unlocked" : "journal-card"} key={entry.id}>
        <div className="journal-number">0{entry.number}</div><span className="journal-icon">{unlocked ? "✦" : "🔒"}</span>
        <small>{unlocked ? `${regions[i].chapter} · ${entry.subtitle}` : "Chưa khám phá"}</small><h3>{unlocked ? entry.title : "???"}</h3>
        <p>{unlocked ? entry.body : "Tiếp tục hành trình để mở khóa tri thức vùng đất này."}</p>
      </article>;
    })}</div>
  </main>;

  if (screen === "complete") return <main className="ending-screen"><div className="ending-content"><div className="ending-crystal">▤</div><span>BIÊN NIÊN SỬ ĐÃ ĐƯỢC KHÔI PHỤC</span><h2>Bình minh bắt đầu từ nhận thức</h2><p>Bạn đã nối lại bảy vấn đề của xã hội và chứng minh rằng lý luận chỉ thực sự sống khi được đặt trong lịch sử, kiểm nghiệm bằng thực tiễn và biến thành hành động có trách nhiệm.</p><div className="all-crystals">⌘ ⚙ ⌁ ◈ ◎ ✺ ⌂</div><button className="primary" onClick={() => setScreen("journal")}>Mở Biên Niên Sử</button><button className="text-button" onClick={() => setScreen("menu")}>Về màn hình chính</button></div></main>;

  if (screen === "arrest") return <main className="arrest-screen">
    <div className="arrest-lights"/><div className="arrest-scene">
      <div className="arrest-title"><small>TRẬN CHIẾN CUỐI CÙNG ĐÃ KẾT THÚC</small><h2>Màn Sương đã bị phá tan</h2><p>Bằng chứng đã được khôi phục. Ông Trùm không còn có thể gieo chia rẽ và xuyên tạc tri thức.</p></div>
      <div className="arrest-characters"><div className="police-hero"><span className="police-cap"/><span className="police-head"/><span className="police-body"><b>CA</b></span><i/><em/></div><span className="handcuffs">⛓</span><div className="boss-captured"><EncounterAvatar encounter={encounter ?? regions[6].encounters[2]} variant={9} large/><span className="cuff-line"/></div></div>
      <div className="arrest-card"><span>✓ ĐÃ BẮT GIỮ</span><strong>Ông Trùm Màn Sương</strong><button className="primary" onClick={() => setScreen("game")}>Trở lại và hoàn tất chương</button></div>
    </div>
  </main>;

  return <main className="game-shell" style={{ "--accent": region.accent } as React.CSSProperties}>
    <header className="game-header">
      <div className="brand-mark">BNS</div><div className="region-label"><small>{region.chapter} / VII</small><strong>{region.title}</strong></div>
      <div className="header-actions"><button onClick={() => setScreen("journal")}>▤ <span>Biên niên sử</span></button><div className="crystal-progress">{regions.map((r, i) => <span key={r.id} className={i < save.pages ? "owned" : ""}>{r.glyph}</span>)}</div><button aria-label="Âm thanh" onClick={() => setMuted(!muted)}>{muted ? "🔇" : "🔊"}</button><button onClick={() => setScreen("menu")}>☰</button></div>
    </header>
    <section className="objective-panel"><small>NHIỆM VỤ HIỆN TẠI</small><p>{regionComplete ? "Tới trang Biên Niên Sử để mở chương tiếp theo" : region.objective}</p><div className="objective-progress"><span style={{ width: `${region.encounters.filter((_, i) => solvedSet.has(save.region * 10 + i)).length / region.encounters.length * 100}%` }}/></div></section>
    <section className={`world theme-${region.id}`} style={{ backgroundColor: region.accent }}>
      <RegionScenery id={region.id}/>
      <div className="world-vignette"/>
      {region.encounters.map((npc, i) => <button key={npc.name} className={`npc ${npcKind(npc.name, npc.role) === "boss" ? "boss-encounter" : ""} ${solvedSet.has(save.region * 10 + i) ? "solved" : ""}`} style={{ left: `${npc.position.x}%`, top: `${npc.position.y}%` }} onClick={() => { positionRef.current = { x: npc.position.x, y: npc.position.y + 7 }; setSave(s => ({...s, x: npc.position.x, y: npc.position.y + 7})); setActive(i); setLine(0); setFeedback(""); }}>
        <span className="npc-marker">{solvedSet.has(save.region * 10 + i) ? "✓" : "!"}</span><span className="npc-avatar"><EncounterAvatar encounter={npc} variant={save.region + i}/></span><span className="npc-name">{npc.name}</span>
      </button>)}
      {regionComplete && <button className="portal" style={{ left: "88%", top: "49%" }} onClick={claimCrystal}><span>{region.glyph}</span><b>Trang {region.pageName}</b></button>}
      <div ref={playerRef} className={`player ${save.arrested ? "player-police" : ""}`} style={{ left: `${save.x}%`, top: `${save.y}%` }} aria-label="Nhân vật">
        <span className="player-shadow"/><span className="player-hat"/><span className="player-head"><i/></span><span className="player-body"><em>★</em><i/><b/></span>
      </div>
      {nearby >= 0 && active === null && <button className="interact-hint" onClick={interact}><kbd>E</kbd> Tương tác với {region.encounters[nearby].name}</button>}
      <div className="mobile-pad"><button onPointerDown={() => keys.current.add("w")} onPointerUp={() => keys.current.delete("w")}>▲</button><button onPointerDown={() => keys.current.add("a")} onPointerUp={() => keys.current.delete("a")}>◀</button><button onPointerDown={() => keys.current.add("s")} onPointerUp={() => keys.current.delete("s")}>▼</button><button onPointerDown={() => keys.current.add("d")} onPointerUp={() => keys.current.delete("d")}>▶</button></div>
    </section>
    <aside className="region-info"><span>{region.glyph}</span><div><small>LUẬN ĐIỂM TRỌNG TÂM</small><p>{region.lesson}</p><div className="chapter-index">{regions.map((r, i) => <i key={r.id} className={i === save.region ? "active" : i < save.region ? "done" : ""}>{i + 1}</i>)}</div></div></aside>
    {encounter && <div className="dialogue-layer" onClick={(e) => e.target === e.currentTarget && closeEncounter()}>
      <section className="dialogue-box">
        <div className={`portrait ${encounter.name === "Ông Trùm Màn Sương" ? "boss-photo-portrait" : ""}`}>{encounter.name === "Ông Trùm Màn Sương" ? <img src="/assets/boss-portrait.png" alt="Chân dung Ông Trùm Màn Sương"/> : <EncounterAvatar encounter={encounter} variant={save.region + (active ?? 0)} large/>}<i/></div>
        <div className="dialogue-content"><div className="speaker"><strong>{encounter.name}</strong><small>{encounter.role}</small></div>
          {line < encounter.lines.length ? <><p className="dialogue-text">{encounter.lines[line]}</p><button className="continue" onClick={() => setLine(line + 1)}>Tiếp tục <kbd>↵</kbd></button></> : encounter.question && !solvedSet.has(save.region * 10 + (active ?? 0)) ? <div className="question"><p>{encounter.question}</p><div className="answers">{displayAnswers.map((answer, i) => <button key={answer.text} onClick={() => choose(answer.correct, answer.feedback)}><span>{String.fromCharCode(65 + i)}</span>{answer.text}</button>)}</div>{feedback && <div className={`feedback ${encounter.answers.find(answer => answer.feedback === feedback)?.correct ? "correct" : "wrong"}`}>{feedback}</div>}</div> : <div className="resolved"><span>✦</span><h3>Tri thức đã được ghi nhận</h3><p>{encounter.question ? "Bạn đã hoàn thành thử thách của nhân vật này." : "Cuộc trò chuyện đã mở ra một manh mối mới."}</p><button className="primary small" onClick={closeEncounter}>Tiếp tục khám phá</button></div>}
        </div><button className="dialogue-close" onClick={closeEncounter}>×</button>
      </section>
    </div>}
    {toast && <div className="toast">✦ {toast}</div>}
  </main>;
}
