import React, { useEffect, useState } from "react";
import "../styles/GameSection.scss";
import { ArrowBigDownDashIcon, Camera } from "lucide-react";
// import webgazer from "webgazer";

declare global {
  interface Window {
    webgazer: any;
  }
}

interface GazePoint {
  x: number;
  y: number;
}

const GameSection = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [gazePoint, setGazePoint] = useState<GazePoint | null>(null);

  // WebGazer初期化
  useEffect(() => {
    if (currentSection === 1) {
      const initializeWebGazer = async () => {
        try {
          if (!window.webgazer) {
            console.error("WebGazer is not loaded.");
            return;
          }
          // APIドキュメント(https://github.com/brownhci/WebGazer/wiki/Top-Level-API)
          await window.webgazer
            .setTracker("clmtrackr")
            .setGazeListener((data: any) => {
              if (data == null) return;
              console.log(data);
              setGazePoint({ x: data.x, y: data.y });
            })
            .saveDataAcrossSessions(true);

          await window.webgazer.begin();
        } catch (err) {
          console.error("WebGazer initialization failed:", err);
        }
      };

      initializeWebGazer();

      return () => {
        console.log("webgazer.isReady()", window.webgazer.isReady());
        if (window.webgazer.isReady()) {
          window.webgazer.end();
        }
      };
    }
  }, [currentSection]);

  // スクロールをコントロール
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollHeight = window.innerHeight;
      const section = Math.floor(scrollPosition / scrollHeight);
      setCurrentSection(section);
    };

    window.addEventListener("scroll", handleScroll);

    // クリーンアップ関数(コンポーネントが消えるときに実行)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // カメラとトラッキングの初期化
  useEffect(() => {});

  return (
    <div className="game-section__container">
      <section className="game-section__section">
        <h2 className="game-section__title">広告イライラゲーム</h2>
        <p className="game-section_description">
          このゲームはカメラを使用します。準備ができたら下にスクロールしてください
        </p>
        <ArrowBigDownDashIcon
          className="game-section_scroll-indicator"
          size={60}
          strokeWidth={2}
        ></ArrowBigDownDashIcon>
      </section>

      <section className="game-section__section">
        <h2 className="game-section__title">キャリブレーション</h2>
        {gazePoint && (
          <div
            className="gaze-point"
            style={{
              position: "fixed",
              left: gazePoint.x,
              top: gazePoint.y,
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        )}
      </section>

      <section className="game-section__section">
        <h2 className="game-section__title">ゲーム</h2>
      </section>
    </div>
  );
};

export default GameSection;
