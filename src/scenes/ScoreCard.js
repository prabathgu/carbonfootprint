import Phaser from '../lib/phaser.js'
import {cards, icons, colors} from '../lib/consts.js'
import {drawTextBubble} from '../lib/bubbles.js'
import Bubble from '../lib/Bubble.js'

export default class ScoreCard extends Phaser.Scene {

    restartButton // Button to restart the game

    constructor() {
        super("score_card")
    }

    preload() {
        this.load.image('score_card', 'assets/score_card.png')
    }

    create() {
        const { width, height } = this.sys.game.canvas
        //let scoreCard = this.add.image(width/2, height/2, 'score_card')

        //let border = this.add.rectangle(width/2, height/2, scoreCard.displayWidth, scoreCard.displayHeight)
        //border.setStrokeStyle(1, '#4585BF')

        this.restartButton = new Bubble(this, width/2, height/2, 'Restart').setCallback(() => {
            this.restartButton.disable()
            this.testButton.enable()
            console.log('Restart button')
        })
        
        this.testButton = new Bubble(this, 100, height/2, 'Test').setCallback(() => {
            this.restartButton.enable()
            this.testButton.disable()
            console.log('Test button')
        })

        this.testButton.disable()
    }

}
