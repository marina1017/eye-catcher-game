import React from 'react';
import '../styles/GameSection.scss';
import { ArrowBigDownDashIcon } from 'lucide-react';

const GameSection = () => {
  return (
    <div className="game-section__container">
      <section className="game-section__section">
        <h2 className='game-section__title'>広告イライラゲーム</h2>
        <p className='game-section_description'>
          このゲームはカメラを使用します。準備ができたら下にスクロールしてください
        </p>
        <ArrowBigDownDashIcon className='game-section_scroll-indicator' size={60} strokeWidth={2}></ArrowBigDownDashIcon>
      </section>
      
      <section className="game-section__section">
        <h2 className='game-section__title'>キャリブレーション</h2>
      </section>
      
      <section className="game-section__section">
        <h2 className='game-section__title'>ゲーム</h2>
      </section>
    </div>
  );
};

export default GameSection;