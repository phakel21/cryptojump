import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class MyGame extends Scene {
    constructor() {
        super('MyGame');
    }

    preload() {
        this.load.image('doodle-right', 'assets/doodler-right.png');
        this.load.image('doodle-left', 'assets/doodler-left.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('background', 'assets/background.png');
    }

    create() {
        const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        background.setDisplaySize(this.scale.width, this.scale.height);

        this.player = this.physics.add.sprite(this.scale.width / 2, this.scale.height / 2, 'doodle-right');
        this.player.setScale(0.4);
        this.player.setVelocityY(-400);
        this.player.setDepth(1);
        this.physics.world.gravity.y = 700;

        this.platforms = this.physics.add.staticGroup();
        this.createInitialPlatforms(5);

        this.physics.add.collider(this.player, this.platforms, this.checkBounce, this.checkCollision, this);
        this.cursors = this.input.keyboard.createCursorKeys();

        EventBus.emit('current-scene-ready', this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-140);
            this.player.setTexture('doodle-left');
        } else if (this.cursors.right.isDown) {
            this.player.setTexture('doodle-right');
            this.player.setVelocityX(140);
        
        } 
        // else {
        //     this.player.setVelocityX(0);
        // }

        // Wrap player around the screen horizontally
        if (this.player.x < 0) {
            this.player.x = this.scale.width;
        } else if (this.player.x > this.scale.width) {
            this.player.x = 0;
        }

        // Check for game over
        if (this.player.y > this.scale.height) {
            this.scene.start("MyGameOver");
        }

        // Handle platform movement
        this.handlePlatforms();
    }

    createInitialPlatforms(count) {
        for (let i = 0; i < count; i++) {
            const randomX = Phaser.Math.Between(60, this.scale.width - 60);
            const randomY = Phaser.Math.Between(0, this.scale.height - 100); // Avoid platforms being too low

            const platform = this.platforms.create(randomX, randomY, 'platform');
            platform.setScale(0.4);
            platform.setDepth(0);
            platform.refreshBody();
        }
    }

    handlePlatforms() {
        // Update platform positions and handle out-of-bounds platforms
        this.platforms.children.iterate((platform) => {
            if (this.player.body.velocity.y < 0 && this.player.y < this.scale.height * 3 / 4) {
                platform.y += 2; // Регулюйте швидкість за потреби
                platform.refreshBody();            
            }

            if (platform.y > this.scale.height) {
                platform.destroy(); // Remove the platform
                this.createNewPlatform(); // Add a new platform
            }
        });
    }

    createNewPlatform() {
        const randomX = Phaser.Math.Between(0, this.scale.width);
        const platform = this.platforms.create(randomX, 0 , 'platform'); // Create new platform above the screen
        platform.setScale(0.4);
        platform.refreshBody();
    }

    checkCollision(player, platform) {
        // Return false to continue collision check only if player is falling
        return player.body.velocity.y >= 0;
    }

    checkBounce(player, platform) {
        // Check if player is touching the platform from above
        if (player.body.touching.down) {
            player.setVelocityY(-400); // Adjust bounce strength as needed
        }
    }
}
