import React, { useEffect, useState } from "react";
import "../styles/GameSection.scss";
import { ArrowBigDownDashIcon, Camera } from "lucide-react";
import webgazer from "webgazer";

interface GazePoint {
  x: number;
  y: number;
}

const GameSection = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [gazePoint, setGazePoint] = useState<GazePoint | null>(null);

  // カメラとトラッキングをコントロール
  useEffect(() => {
    if (currentSection === 1) {
      const startTracking = async () => {
        try {
          // 1 カメラの設定
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          setStream(mediaStream);

          // 2 WebGazerの初期化
          // APIドキュメント(https://github.com/brownhci/WebGazer/wiki/Top-Level-API)
          await webgazer
            //どのモデルを使うべきか
            .setRegression("weightedRidge")
            //どのfacial recognition libraryをつかうか
            .setTracker("TFFacemesh")
            .begin()
          
            // デバッグ設定: 顔の特徴点を設定
            webgazer.params.videoPositionX = window.innerWidth -320;
            webgazer.params.videoPositionY = 0
            webgazer.showVideo(true);
            webgazer.showFaceOverlay(true);
            webgazer.showPredictionPoint(true);
            webgazer.showFaceFeedbackBox(true);

            // 視線データを取得
            webgazer.setGazeListener((data: {x: number; y:number} | null) =>{
              if (data == null) return;
              setGazePoint(data)
            })


        } catch (err) {
          console.error("初期化に失敗しました", err);
        }
      };

      startTracking();

      // クリーンアップ関数(コンポーネントが消えるときに実行)
      return () => {
        // streamに入っている各トラックを停止させる
        stream?.getTracks().forEach((track) => track.stop());
        // streamの状態をクリア
        setStream(null);
        // webgazer データの収集と予測を停止し、webgazer オブジェクトが保持している全てのメモリを解放する
        webgazer.end();
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
  useEffect(()=>{

  })

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
        {gazePoint && (
         <div 
           className="gaze-point"
           style={{
             position: 'fixed',
             left: gazePoint.x,
             top: gazePoint.y,
             width: '10px',
             height: '10px',
             backgroundColor: 'red',
             borderRadius: '50%',
             transform: 'translate(-50%, -50%)',
             pointerEvents: 'none'
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
