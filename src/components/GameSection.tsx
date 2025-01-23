import React from 'react';
import '../styles/GameSection.scss';

const GameSection = () => {
  return (
    <div className="game-section__container">
      <section className="game-section__section">
        <h2>イントロ</h2>
      </section>
      
      <section className="game-section__section">
        <h2>キャリブレーション</h2>
      </section>
      
      <section className="game-section__section">
        <h2>ゲーム</h2>
      </section>
    </div>
  );
};

export default GameSection;