import Phaser from '../lib/phaser.js'
import {cards, icons, colors, frame} from '../lib/consts.js'
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
        let { width, height } = this.sys.game.canvas
        height -= frame.bottom_offset

        const scale = 0.95
        let scoreCard = this.add.image(width/2, height/2, 'score_card').setScale(scale)

        let border = this.add.rectangle(width/2, height/2, scoreCard.displayWidth, scoreCard.displayHeight)
        border.setStrokeStyle(1, Phaser.Display.Color.ValueToColor(colors.black).color)

        const xLeft = 225 // Center of the leftmost column of the Left 3 columns
        const xRight = 680 // Center of the leftmost column of the Right 3 columns
        const xStep = 90 // Gap between column centers
        const yTop = 75 // Center of the topmost row
        const yStep = 60 // Gap between row centers
        const yExtra = 695 // Center of the first row in the bottom (extra) group 

        const textSettings = { fontFamily: 'Helvetica Neue', fontSize: 30, color: colors.black, align: 'center' };

        const originX = width/2 - scoreCard.displayWidth/2
        const originY = height/2 - scoreCard.displayHeight/2

        let total = 0
        for (const key in icons) {
            let icon = icons[key]

            let x = (icon.index < 10) ? xLeft : xRight
            let y = yTop + yStep * (icon.index % 10)

            // Extra hardcoded logic for Axe, Car and Tree icons
            if (icon.index >= 20) {
                x = (icon.index < 22) ? xLeft : xRight
                y = yExtra + yStep * (icon.index % 2)
            }

            const tallyStr = icon.tally.toString()
            this.add.text(originX + x * scale, originY + y * scale, tallyStr, textSettings).setOrigin(0.5, 0.4);
            const pointsStr = icon.marks.toString()
            this.add.text(originX + (x + xStep) * scale, originY + y * scale, pointsStr, textSettings).setOrigin(0.5, 0.4);
            const totalStr = (icon.tally * icon.marks).toString()
            this.add.text(originX + (x + xStep * 2) * scale, originY + y * scale, totalStr, textSettings).setOrigin(0.5, 0.4);
            total += icon.tally * icon.marks
        }

        const xTotal = 570
        const yTotal = 815
        const fullTotalStr = total.toString()
        this.add.text(originX + xTotal * scale, originY + yTotal * scale, fullTotalStr, textSettings).setOrigin(0.5, 0.4);

        this.restartButton = new Bubble(this, width - 210, 50, 'Restart Game').setCallback(() => {
            this.scene.start('game')
        })
    }
}
