import React, { useEffect, useState } from "react";
import "../styles/GameSection.scss";
import { ArrowBigDownDashIcon, Camera } from "lucide-react";
import webgazer from "webgazer";

const GameSection = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // カメラの画像をコントロール
  useEffect(() => {
    if (currentSection === 1) {
      const startCamera = async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          setStream(mediaStream);
        } catch (err) {
          console.error("カメラの起動に失敗しました");
        }
      };

      startCamera();

      // クリーンアップ関数(コンポーネントが消えるときに実行)
      return () => {
        // streamに入っている各トラックを停止させる
        stream?.getTracks().forEach((track) => track.stop());
        // streamの状態をクリア
        setStream(null);
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
        <div className="game-section__camera-feed">
          {!stream ? (
            <Camera size={48} />
          ) : (
            <div>
              <video
                autoPlay
                ref={(videoRef) => {
                  if (videoRef && stream) {
                    videoRef.srcObject = stream;
                  }
                }}
              />
            </div>
          )}
        </div>
      </section>

      <section className="game-section__section">
        <h2 className="game-section__title">ゲーム</h2>
      </section>
    </div>
  );
};

export default GameSection;
