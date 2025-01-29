declare module "webgazer" {
    interface GazeData {
      x: number; // 視線のX座標
      y: number; // 視線のY座標
      timestamp: number; // 記録時間（ms）
      confidence?: number; // 視線予測の信頼度（オプション）
    }
  
    type RegressionType = "ridge" | "weightedRidge";
    type TrackerType = "clmtrackr" | "TFFacemesh";
  
    interface WebGazerParams {
      videoPositionX?: number;
      videoPositionY?: number;
    }
  
    interface WebGazer {
      /**
       * 視線予測リスナーを設定
       */
      setGazeListener(callback: (data: GazeData | null, elapsedTime: number) => void): WebGazer;
  
      /**
       * WebGazer の動作開始
       */
      begin(): Promise<WebGazer>;
  
      /**
       * WebGazer の動作を一時停止
       */
      pause(): WebGazer;
  
      /**
       * WebGazer の動作を再開
       */
      resume(): WebGazer;
  
      /**
       * WebGazer を停止（再開不可）
       */
      stop(): WebGazer;
  
      /**
       * WebGazer を完全に終了（カメラを停止）
       */
      end(): WebGazer;
  
      /**
       * 予測ポイントの可視化を設定
       */
      showPredictionPoints(show: boolean): WebGazer;
  
      /**
       * 予測データを取得
       */
      getCurrentPrediction(): Promise<GazeData | null>;
  
      /**
       * WebGazer のパラメータを設定
       */
      params: WebGazerParams;
  
      /**
       * WebGazer の回帰アルゴリズムを設定
       */
      setRegression(regression: RegressionType): WebGazer;
  
      /**
       * WebGazer の回帰アルゴリズムを取得
       */
      getRegression(): Promise<RegressionType>;
  
      /**
       * 使用する顔トラッカーを設定
       */
      setTracker(tracker: TrackerType): WebGazer;
  
      /**
       * 使用する顔トラッカーを取得
       */
      getTracker(): Promise<TrackerType>;
  
      /**
       * カメラ映像の表示を設定
       */
      showVideo(show: boolean): WebGazer;
  
      /**
       * 顔のオーバーレイを表示
       */
      showFaceOverlay(show: boolean): WebGazer;
  
      /**
       * 顔の特徴点を表示
       */
      showPredictionPoint(show: boolean): WebGazer;
  
      /**
       * フェイスフィードバックボックスの表示
       */
      showFaceFeedbackBox(show: boolean): WebGazer;
  
      /**
       * 学習データを保存する設定
       */
      saveData(save: boolean): WebGazer;
    }
  
    const webgazer: WebGazer;
    export default webgazer;
  }
  