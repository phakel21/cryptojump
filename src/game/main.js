import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import { MyGame } from './scenes/MyGame';
import { MyGameOver } from './scenes/MyGameOver';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 462,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // No gravity
            debug: false // Set to true to see debug graphics
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver,
        MyGame,
        MyGameOver
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
