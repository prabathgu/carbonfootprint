import Phaser from '../lib/phaser.js'
import {path, cards, icons, colors, frame} from '../lib/consts.js'
import Bubble from '../lib/Bubble.js'
import eventCenter from '../lib/EventCenter.js'

const TRAVEL_STEPS = 50
const TRAVEL_DELAY = 10

export default class Game extends Phaser.Scene {

    position // Keep track of the current board square index
    oldPosition // Previous position
    player // Player sprite
    card // Current card
    dice // The die

    cardContainer // Container for all card related display objects
    tallyContainer // Container for all Tally card related display objects

    rollButton // Die roll button
    showCardButton // Button to show tally or score cards
    closeButton // Close tally card

    constructor() {
        super('game')
    }

    init() {
        this.position = 0
        this.travelling = false
        this.cardContainer = null

        // initialize icon tallies
        for (const key in icons) {
            icons[key].tally = 0
            icons[key].text = null
        }

        // initialize the card stacks
        let stacks = [cards.GREEN, cards.PURPLE, cards.ORANGE, cards.GOVERNMENT]
        
        stacks.forEach(card => {
            card.stack = []
            for (let i = 0; i < card.deck.length; i++) {
                card.stack.push(i)
            }
            this.shuffleArray(card.stack)
        })
    }

    preload() {
        this.load.image('board', 'assets/board.png')
        this.load.image('player', 'assets/player.png')
        this.load.image('tally_card', 'assets/tally_card.png')

        this.load.spritesheet('green_cards', 'assets/green_cards.png', {frameWidth: 320, frameHeight: 240})
        this.load.spritesheet('purple_cards', 'assets/purple_cards.png', {frameWidth: 320, frameHeight: 240})
        this.load.spritesheet('orange_cards', 'assets/orange_cards.png', {frameWidth: 320, frameHeight: 240})
        this.load.spritesheet('government_cards', 'assets/government_cards.png', {frameWidth: 320, frameHeight: 240})

        this.load.spritesheet('dice', 'assets/dice.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        this.add.image(0, 0, 'board').setOrigin(0, 0)
        this.player = this.add.sprite(path[this.position][0], path[this.position][1],'player')

        let { width, height } = this.sys.game.canvas
        height -= frame.bottom_offset

        // draw the die and the label
        const labelX = width - 300
        const labelY = height - 200
        
        this.rollButton = new Bubble(this, labelX, labelY, 'Roll Die').setCallback(() => {
                                        this.rollDice()
                                    })
        
        this.dice = this.add.sprite(labelX + 60, labelY - 75, 'dice', 4).setScale(1.5)

        // Show tally card or score card button
        this.showCardButton = new Bubble(this, labelX - 325, labelY, 'Show Tally Card').setCallback(() => {
                                        if (this.position == path.length - 1) {
                                            this.scene.start('score_card')
                                        } else {
                                            this.tallyContainer.x = 411
                                            this.rollButton.disable()
                                            this.showTallyCard()
                                        }
                                    })

        
        // setup die animation
        var animConfig = {
            key: 'diceAnimation',
            frames: this.anims.generateFrameNumbers('dice', { start: 0, end: 5, first: 0 }),
            frameRate: 10,
            duration: 7000
        }
        this.anims.create(animConfig)

        //  Event handler for when the animation updates on our sprite
        this.dice.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, sprite, frameKey) {
            this.dice.angle = this.dice.angle + 50
        }, this)
        this.dice.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function (anim, frame, sprite, frameKey) {
            const roll = Phaser.Math.Between(1, 6)
            this.dice.setFrame(roll-1)
            this.dice.angle = 0
            this.moveSteps(roll)
        }, this)

        // draw the tally card and hide it
        let scale = 1.5
        let tallyCard = this.add.image(0, 0, 'tally_card').setOrigin(0,0).setScale(scale)

        const tallyCardX = width / 2 - tallyCard.displayWidth / 2
        const tallyCardY = height / 2 - tallyCard.displayHeight / 2
        this.tallyContainer = this.add.container(tallyCardX, tallyCardY)
        this.tallyContainer.add(tallyCard)

        this.border = this.add.rectangle(0, 0, tallyCard.displayWidth, tallyCard.displayHeight).setOrigin(0, 0)
        this.border.setStrokeStyle(2, Phaser.Display.Color.ValueToColor(colors.black).color)
        this.tallyContainer.add(this.border)

        this.closeButton = new Bubble(this, tallyCard.displayWidth - 170, tallyCard.displayHeight - 55, 'Close').setCallback(() => {
                                        this.tallyContainer.setVisible(false)
                                        this.rollButton.enable()
                                        this.showCardButton.enable()
                                        if (this.cardContainer) {
                                            this.cardContainer.destroy()
                                        }
                                    })                            
        this.tallyContainer.add(this.closeButton)
        this.tallyContainer.setVisible(false)

        this.scene.launch('card_history')
    }

    moveSteps(steps) {
        this.oldPosition = this.position
        this.position += steps
        if (this.position >= path.length - 1) {
            this.position = path.length - 1
            this.showCardButton.setText('Show Score Card')
            this.showCardButton.enable()
        }

        this.travelSteps = 0
        this.time.addEvent({ delay: TRAVEL_DELAY, callback: this.onTravelStep, callbackScope: this, repeat: TRAVEL_STEPS });
    }

    onTravelStep() {
        const fromX = path[this.oldPosition][0]
        const fromY = path[this.oldPosition][1]
        const toX = path[this.position][0]
        const toY = path[this.position][1]

        this.travelSteps += 1
        if (this.travelSteps <= TRAVEL_STEPS) {
            this.player.x = fromX + (toX - fromX) * (this.travelSteps/TRAVEL_STEPS)
            this.player.y = fromY + (toY - fromY) * (this.travelSteps/TRAVEL_STEPS)
        } else {
            //this.travelSteps = 0
            this.landedSquare()
        }
    }

    landedSquare() {
        this.card = path[this.position][2]
        if (!this.card) {
            console.log('We are at the end')
        } else if (this.card == cards.AXE || this.card == cards.TREE || this.card == cards.CAR) {
            this.addTally(this.card.deck[0])
        } else {
            let deckIndex = this.card.stack.pop()
            if (this.cardContainer) {
                this.cardContainer.destroy()
            }
            
            this.cardContainer = this.add.container(this.card.stackX - 37, this.card.stackY - 30)
            let displayCard = this.add.sprite(0, 0, this.card.sprite, deckIndex).setOrigin(0, 0).setScale(1)
            this.cardContainer.add(displayCard)

            // Adjust the tally card position so that the card is visible
            if (this.card == cards.ORANGE) {
                this.tallyContainer.x = 100
            } else if (this.card == cards.GREEN) {
                this.tallyContainer.x = 415
            } else {
                this.tallyContainer.x = 715
            }

            if (this.card == cards.PURPLE) {
                // Draw two boxes for purple cards
                let topBorder = this.add.rectangle(0, 0, displayCard.width, displayCard.height / 2).setOrigin(0, 0)
                topBorder.setStrokeStyle(4, this.card.color)
                this.cardContainer.add(topBorder)
                let bottomBorder = this.add.rectangle(0, displayCard.height / 2, displayCard.width, displayCard.height / 2).setOrigin(0, 0)
                bottomBorder.setStrokeStyle(4, this.card.color)
                this.cardContainer.add(bottomBorder)

                // Handle the two choices for purple cards
                topBorder.setInteractive({ useHandCursor: true })
                bottomBorder.setInteractive({ useHandCursor: true })
                let addTallyBindTop = this.addTally.bind(this, this.card.deck[deckIndex][0], deckIndex, 'top')
                let addTallyBindBottom = this.addTally.bind(this, this.card.deck[deckIndex][1], deckIndex, 'bottom')
                topBorder.on('pointerdown', addTallyBindTop)
                bottomBorder.on('pointerdown', addTallyBindBottom)
            } else {
                let border = this.add.rectangle(0, 0, displayCard.width, displayCard.height).setOrigin(0, 0)
                border.setStrokeStyle(4, this.card.color)
                this.cardContainer.add(border)
                border.setInteractive({ useHandCursor: true })
                let addTallyBind = this.addTally.bind(this, this.card.deck[deckIndex], deckIndex, 'normal')
                border.on('pointerdown', addTallyBind)
            }
        }
    }

    addTally(currentIcon, deckIndex, choice) {
        if (this.tallyContainer.visible) {
            // Tally Container is visible, tally already counted. Skip.
            return
        }
        currentIcon.tally += 1
        if (choice == 'top' || choice == 'bottom') {
            eventCenter.emit('add-card', deckIndex, choice)
        }
        this.showTallyCard(currentIcon)
    }

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1))
            var temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }

    showTallyCard(currentIcon) {
        const scale = 1.5
        const xLeft = 150, xRight = 345
        const yTop = 55
        const yStep = 39
        const yExtra = 460
        const textSettings = { fontFamily: 'Helvetica Neue', fontSize: 30, color: colors.black, align: 'center' };

        if (this.tallyContainer) {
            this.tallyContainer.setVisible(true)
        }

        for (const key in icons) {
            let icon = icons[key]
            if (icon.text) {
                let str = (icon.tally > 0) ? icon.tally.toString() : ''
                icon.text.setText(str)
            } else {
                let x = (icon.index < 10) ? xLeft : xRight
                let y = yTop + yStep * (icon.index % 10)

                // Extra hardcoded logic for Axe, Car and Tree icons
                if (icon.index >= 20) {
                    x = (icon.index < 22) ? xLeft : xRight
                    y = yExtra + yStep * (icon.index % 2)
                }

                let str = (icon.tally > 0) ? icon.tally.toString() : ''
                icon.text = this.add.text(x * scale, y * scale, str, textSettings).setOrigin(0.5, 0.3);
                this.tallyContainer.add(icon.text)
            }
            if (icon.text) {
                if (currentIcon && currentIcon.index == icon.index) {
                    icon.text.setColor(colors.blue)
                } else {
                    icon.text.setColor(colors.black)
                }
            }
        }
    }

    rollDice() {
        this.rollButton.disable()
        this.showCardButton.disable()
        this.dice.play('diceAnimation')
    }
}