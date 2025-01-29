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
  const [gazePoint, setGazePoint] = useState<GazePoint | null>(null);
  const [cameraReady, setCameraReady] = useState(false);

  // カメラとトラッキングをコントロール
  useEffect(() => {
    if (currentSection === 1) {
      const initializeWebGazer = async () => {
        try {
          // WebGazerの初期化
          // APIドキュメント(https://github.com/brownhci/WebGazer/wiki/Top-Level-API)
          await webgazer
            //どのモデルを使うべきか
            .setRegression("weightedRidge")
            //どのfacial recognition libraryをつかうか
            .setTracker("TFFacemesh")
            .begin()
          
            // webGazerが生成するidを取得
            const videoContainer = document.getElementById('webgazerVideoContainer');
            // 移したい位置を設定
            const targetContainer = document.querySelector('.game-section__camera-feed');
            
            if (videoContainer && targetContainer) {
              // コンテナの移動
              targetContainer.appendChild(videoContainer);
              
              // スタイルの設定
              Object.assign(videoContainer.style, {
                position: 'relative',
                top: 'auto',
                left: 'auto',
                width: '100%',
                height: '100%'
              });
  
              // ビデオフィードの設定
              const videoFeed = document.getElementById('webgazerVideoFeed');
              if (videoFeed) {
                Object.assign(videoFeed.style, {
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px'
                });
              }
  
              // フェイスオーバーレイの設定
              const faceOverlay = document.getElementById('webgazerFaceOverlay');
              if (faceOverlay) {
                Object.assign(faceOverlay.style, {
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px'
                });
              }
  
              // カメラ準備完了を示すフラグを設定
              setCameraReady(true);
            }

          // デバッグ設定: 顔の特徴点を設定
          webgazer.showVideo(true);
          webgazer.showFaceOverlay(true);
          // webgazer.showPredictionPoint(true);
          webgazer.showFaceFeedbackBox(true);

          // 視線データを取得
          webgazer.setGazeListener((data: {x: number; y:number} | null) =>{
            if (data == null) return;
            
            // 初回のデータを取れるまで非表示
            if(videoContainer && videoContainer.style.display === "none"){
              videoContainer.style.display = "block";
              setCameraReady(true);
            }

            setGazePoint(data)
          })


        } catch (err) {
          console.error("初期化に失敗しました", err);
        }
      };

      initializeWebGazer();

      // クリーンアップ関数(コンポーネントが消えるときに実行)
      return () => {
        // webgazer データの収集と予測を停止し、webgazer オブジェクトが保持している全てのメモリを解放する
        webgazer.end();
        setCameraReady(false)
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
          {!cameraReady && <Camera size={48} />}
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
