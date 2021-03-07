import Phaser from './lib/phaser.js'

import Game from './scenes/Game.js'
import ScoreCard from './scenes/ScoreCard.js'

export default new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1400,
        height: 906
    },
    backgroundColor: '#ffffff',
    scene: [Game]
})
