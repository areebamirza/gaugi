import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Heart,
  Lock,
  MapPin,
  Music2,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import "./styles.css";

const memories = [
  {
    date: "DAY 01",
    title: "Shuru karte hain…",
    text: " 😭",
    img: "/memories/memory-1.jpeg",
    secret: "",
  },
  {
    date: "THE USUAL CHAOS",
    title: "",
    text: " 😂",
    img: "/memories/memory-2.jpeg",
    secret: ". Tum neech ho.",
  },
  {
    date: "THAT PHASE",
    title: "Uno partner",
    text: "Lmabna paragraph likhna mere bass ki baat nahi hai🥴",
    img: "/memories/memory-3.jpeg",
    secret:
      "Official verdict: dono galat. Case closed. Ab koi appeal nahi.",
  },
  {
    date: "BEFORE HOSTEL",
    title: "Tata",
    text: " 🥹",
    img: "/memories/memory-4.jpeg",
    secret: "itne creative nahi hain hum",
  },
  {
    date: "TOP SECRET",
    title: "ja apne hostel",
    text:
      "abki baar tum bhot tinki ho aur baat baat pe humse amma ki trh baat ki ho ye tinikna Purva ko ab ja ke dikhana. 😒❤️",
    img: "/memories/memory-5.jpeg",
    secret: "Chal nikal ab",
  },
];

function MemoryImage({ src, idx }) {
  const [broken, setBroken] = useState(false);

  return (
    <div className="memoryPhoto">
      {!broken && (
        <img
          src={src}
          alt={"Memory " + (idx + 1)}
          onError={() => setBroken(true)}
        />
      )}

      {broken && (
        <div className="emptyPhoto">
          <Camera size={26} />
          <b>Yahan hamari photo aayegi 📸</b>
          <span>public/memories/memory-{idx + 1}.jpg</span>
        </div>
      )}

      <div className="photoLabel">
        <Camera size={13} /> MEMORY {idx + 1}
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState(-1);
  const [secret, setSecret] = useState(false);
  const [jump, setJump] = useState(false);
  const [music, setMusic] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const [sorryClicked, setSorryClicked] = useState(false);
  const [sorryJump, setSorryJump] = useState(false);

  const [nextPosition, setNextPosition] = useState({
    x: 0,
    y: 0,
  });

  const top = useRef(null);

  useEffect(() => {
    if (page >= 0) {
      top.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [page]);

  const open = () => {
    setPage(0);
    setConfetti(true);

    setTimeout(() => {
      setConfetti(false);
    }, 1600);
  };

  const next = () => {
    if (!sorryClicked) {
      const buttonWidth = 180;
      const buttonHeight = 55;
      const padding = 25;

      const maxX = Math.max(
        window.innerWidth - buttonWidth - padding * 2,
        0
      );

      const maxY = Math.max(
        window.innerHeight - buttonHeight - padding * 2,
        0
      );

      const randomX =
        Math.random() * maxX + padding;

      const randomY =
        Math.random() * maxY + padding;

      setNextPosition({
        x:
          randomX -
          window.innerWidth / 2 +
          buttonWidth / 2,
        y:
          randomY -
          window.innerHeight / 2 +
          buttonHeight / 2,
      });

      return;
    }

    setSecret(false);
    setJump(false);
    setSorryClicked(false);

    setNextPosition({
      x: 0,
      y: 0,
    });

    if (page < memories.length - 1) {
      setPage(page + 1);
    } else {
      setShowLetter(true);
    }
  };

  const prev = () => {
    setSecret(false);
    setJump(false);
    setSorryClicked(false);

    setNextPosition({
      x: 0,
      y: 0,
    });

    if (page > 0) {
      setPage(page - 1);
    }
  };

  const jumpBtn = () => {
    setJump(true);

    setTimeout(() => {
      setJump(false);
    }, 900);
  };

  const handleSorry = () => {
    setSorryClicked(true);
    setSorryJump(false);

    setNextPosition({
      x: 0,
      y: 0,
    });

    setJump(true);

    setTimeout(() => {
      setJump(false);
    }, 700);
  };

  if (page === -1) {
    return (
      <div className="site">
        <div className="grain" />

        <div className="landing">
          <div className="topSecret">
            <Lock size={13} /> THIS IS NOT A NORMAL WEBSITE
          </div>

          <div className="bigHeart">❤️</div>

          <p className="eyebrow">FOR MY gaugi</p>

          <h1>
            Gaugi,
            <br />
            <i>ye tumhare liye hai.</i>
          </h1>

          <p className="intro"> 😭</p>

          <button className="start" onClick={open}>
            Open <ArrowRight size={18} />
          </button>
        </div>

        <footer>
          made by your slightly less irritating sister ♡
        </footer>
      </div>
    );
  }

  const m = memories[page];

  return (
    <div className="site" ref={top}>
      <div className="grain" />

      {confetti && (
        <div className="confetti">
          💗 ✨ 💕 🥹 ❤️ ✨ 💗
        </div>
      )}

      <header>
        <button className="logo" onClick={() => setPage(-1)}>
          <Heart size={16} fill="currentColor" /> GAUGI ARCHIVES
        </button>

        <span>
          {String(page + 1).padStart(2, "0")} /{" "}
          {String(memories.length).padStart(2, "0")}
        </span>
      </header>

      <main>
        <div className="memoryHead">
          <button
            className="back"
            onClick={prev}
            disabled={page === 0}
          >
            <ArrowLeft size={15} /> back
          </button>

          <div className="date">{m.date}</div>

          <div className="location">
            <MapPin size={13} /> somewhere between our nonsense
          </div>
        </div>

        <section className="memoryCard">
          <div className="textPart">
            <div className="mini">
              MEMORY {page + 1} <span>•</span> CONFIDENTIAL
            </div>

            <h2>{m.title}</h2>

            <p>{m.text}</p>

            <button
              className={"secretBtn " + (jump ? "jumping" : "")}
              onClick={() => {
                setSecret(!secret);
                jumpBtn();
              }}
            >
              <Sparkles size={16} />

              {secret
                ? "OHHH DEKH LIYA? 😭"
                : "SECRET BUTTON"}
            </button>

            {secret && (
              <div className="secretBox">
                <span>i love iyoo gaugi💩</span>
                {m.secret}
              </div>
            )}

            <button
              className={
                "sorryBtn " +
                (sorryJump ? "sorryJumping" : "")
              }
              onClick={handleSorry}
            >
              🥺 Sorry Appi
            </button>

            <div className="navButtons">
              <button
                className="next runawayNext"
                onClick={next}
                style={{
                  transform: `translate(
                    calc(-50% + ${nextPosition.x}px),
                    calc(-50% + ${nextPosition.y}px)
                  )`,
                }}
              >
                <span>
                  {page === memories.length - 1
                    ? "Aage kuch aur hai…"
                    : "Next memory"}
                </span>

                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          <MemoryImage src={m.img} idx={page} />
        </section>

        <div className="bottomRow">
          <button onClick={() => setMusic(!music)}>
            <Music2 size={14} />

            {music
              ? "Song on karne ka button nahi hai 😭"
              : "Is waqt ek gaana suit karta… 🎶"}
          </button>

          <button onClick={() => setShowLetter(true)}>
            <Lock size={14} /> last page?
          </button>
        </div>

        <div className="dots">
          {memories.map((_, i) => (
            <button
              key={i}
              className={i === page ? "on" : ""}
              onClick={() => {
                setPage(i);
                setSorryClicked(false);
                setSecret(false);
                setNextPosition({
                  x: 0,
                  y: 0,
                });
              }}
              aria-label={"Memory " + (i + 1)}
            />
          ))}
        </div>
      </main>

      <footer>
        Gaugi, hostel ja rahi hai. Website banane wali abhi bhi
        emotional hai. ♡
      </footer>

      {showLetter && (
        <div className="modal">
          <div className="letter">

            <button
              className="close"
              onClick={() => setShowLetter(false)}
            >
              <X />
            </button>

            {/* DUDU BUBU ANIMATION */}
            <div className="duduBubu">

              <div className="bear bearLeft">
                🐱
              </div>

              <div className="bear bearRight">
                🐱
              </div>

              <div className="kissHeart">
                💕
              </div>

              <div className="floatingHearts">
                💗
              </div>

              <div className="tinyHearts">
                ✨ 💕 ✨
              </div>

            </div>

            <div className="mini">
              FINAL MESSAGE — DON'T SHOW ANYONE
            </div>

            <h3>Gaugiya</h3>

            <p>
              kuchu puchu tum kaha ho ...mere pyare kuchu
              puchuu 💩
            </p>

            <div className="love">
              Neech GAUGI. ❤️
            </div>

            <button
              className="replay"
              onClick={() => {
                setShowLetter(false);
                setPage(-1);
                setSorryClicked(false);
                setNextPosition({
                  x: 0,
                  y: 0,
                });
              }}
            >
              <RotateCcw size={15} /> ek baar phir se dekh leti hoon
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);