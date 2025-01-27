import React, { useEffect, useState } from "react";
import "../styles/GameSection.scss";
import { ArrowBigDownDashIcon, Camera } from "lucide-react";

const GameSection = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
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
          <Camera size={48} />
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
        </div>
      </section>

      <section className="game-section__section">
        <h2 className="game-section__title">ゲーム</h2>
      </section>
    </div>
  );
};

export default GameSection;
