import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class MyGameOver extends Scene
{
    constructor ()
    {
        super('MyGameOver');
    }

    create ()
    {
        

        const background = this.add.image(0, 0, 'background').setOrigin(0, 0); // Set origin to top-left
        background.setDisplaySize(this.scale.width, this.scale.height); 

        this.add.text(this.scale.width / 2, this.scale.height /2, 'Game Over', {
            fontFamily: 'Courier New', fontSize: 32, color: '#000000',
            // stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        this.add.text(this.scale.width / 2, (this.scale.height /2) + 100, 'Prees space for start', {
            fontFamily: 'Courier New', fontSize: 16, color: '#000000',
            // stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
        this.cursors = this.input.keyboard.createCursorKeys();


        EventBus.emit('current-scene-ready', this);
    }

    update(){
        if (this.cursors.space.isDown) {
            this.scene.start('MyGame'); // Change to the main game scene
        }
    }

    

    // changeScene ()
    // {
    //     this.scene.start('MainMenu');
    // }
}
