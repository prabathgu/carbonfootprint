import Phaser from '../lib/phaser.js'
import {cards, icons, colors, frame} from '../lib/consts.js'
import eventCenter from '../lib/EventCenter.js'

export default class CardHistory extends Phaser.Scene {
    stack // the stack of history cards
    count // count of cards

    constructor() {
        super("card_history")
    }

    create() {
        let { width, height } = this.sys.game.canvas
        height -= frame.bottom_offset

        var border = this.add.graphics({ x: 2, y: height })

        //  Bubble color
        border.fillStyle(0xffffff, 1)
    
        //  Bubble outline line style
        border.lineStyle(6, Phaser.Display.Color.ValueToColor(colors.gray).color, 1)
    
        //  Bubble shape and outline
        border.strokeRoundedRect(0, 0, width-4, frame.bottom_offset-4, 16)
        border.fillRoundedRect(0, 0, width-4, frame.bottom_offset-4, 16)

        // listen to 'update-count' event and call `updateCount()`
        // when it fires
        eventCenter.on('add-card', this.addCard, this)

        // clean up when Scene is shutdown
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            eventCenter.off('add-card', this.addCard, this)
	    })

        this.count = 0
        this.stack = []
    }

    addCard(index, choice) {
        let { width, height } = this.sys.game.canvas
        height -= frame.bottom_offset

        let card = cards.PURPLE
        let topBorderThickness = (choice == 'top') ? 4 : 1
        let bottomBorderThickness = (choice == 'bottom') ? 4 : 1

        let cardContainer = this.add.container(40 + this.count * 320, height + 10)
        let displayCard = this.add.sprite(0, 0, card.sprite, index).setOrigin(0, 0).setScale(0.9)
        cardContainer.add(displayCard)
        let topBorder = this.add.rectangle(0, 0, displayCard.displayWidth, displayCard.displayHeight / 2).setOrigin(0, 0)
        topBorder.setStrokeStyle(topBorderThickness, card.color)
        cardContainer.add(topBorder)
        let bottomBorder = this.add.rectangle(0, displayCard.displayHeight / 2, displayCard.displayWidth, displayCard.displayHeight / 2).setOrigin(0, 0)
        bottomBorder.setStrokeStyle(bottomBorderThickness, card.color)
        cardContainer.add(bottomBorder)

        this.stack.push(cardContainer)
        this.count += 1

        if (this.count >= 5) {
            // Have to resize and fit into the bottom area
            let fitToWidth = (width - 40)/this.count
            let scale = fitToWidth/(displayCard.width + 20)
            let i = 0
            this.stack.forEach(container => {
                container.setScale(scale)
                container.x = 40 + i * fitToWidth
                i += 1
            })
        }
    }
}