const icons = {
    AIRPLANE : {
        index: 0,
        tally: 0,
        marks : 2
    },
    APPLE : {
        index: 1,
        tally: 0,
        marks : 2
    },
    ATOM : {
        index: 2,
        tally: 0,
        marks : 1
    },
    BACKPACK : {
        index: 3,
        tally: 0,
        marks : 2
    },
    BALLOONS : {
        index: 4,
        tally: 0,
        marks : 1
    },
    BIKER : {
        index: 5,
        tally: 0,
        marks : 2
    },
    BUBBLING_FLASK : {
        index: 6,
        tally: 0,
        marks : 1
    },
    BULLSEYE : {
        index: 7,
        tally: 0,
        marks : 2
    },
    GEARHEAD : {
        index: 8,
        tally: 0,
        marks : 2
    },
    PAPER_AIRPLANE : {
        index: 9,
        tally: 0,
        marks : 1
    },
    PAPER_CLIP : {
        index: 10,
        tally: 0,
        marks : 1
    },
    PIANO : {
        index: 11,
        tally: 0,
        marks : 1
    },
    PINE_TREE : {
        index: 12,
        tally: 0,
        marks : 2
    },
    PUZZLE_PIECE : {
        index: 13,
        tally: 0,
        marks : 1
    },
    ROBOT : {
        index: 14,
        tally: 0,
        marks : 2
    },
    SATELLITE : {
        index: 15,
        tally: 0,
        marks : 2
    },
    SATURN : {
        index: 16,
        tally: 0,
        marks : 1
    },
    SPACESHIP : {
        index: 17,
        tally: 0,
        marks : 2
    },
    TELESCOPE : {
        index: 18,
        tally: 0,
        marks : 1
    },
    TEST_TUBES : {
        index: 19,
        tally: 0,
        marks : 1
    },
    AXE : {
        index: 20,
        tally: 0,
        marks : 1
    },
    CAR : {
        index: 21,
        tally: 0,
        marks : 1
    },
    TREE : {
        index: 22,
        tally: 0,
        marks : -1
    }
}

const cards = {
    GREEN : {
        color : 0x70AD47,
        stack : [],
        stackX : 140, 
        stackY : 200,
        sprite : 'green_cards',
        deck : [icons.PAPER_AIRPLANE, icons.ATOM, icons.BUBBLING_FLASK, icons.BALLOONS, icons.SATURN,
                icons.TELESCOPE, icons.PUZZLE_PIECE, icons.PIANO, icons.TEST_TUBES]
    },
    PURPLE : {
        color : 0x7030A0,
        stack : [],
        stackX : 430,
        stackY : 200,
        sprite : 'purple_cards',
        deck : [[icons.GEARHEAD, icons.PIANO], [icons.PAPER_AIRPLANE, icons.SATELLITE], [icons.ROBOT, icons.ATOM],
                [icons.TEST_TUBES, icons.APPLE], [icons.SATURN, icons.BACKPACK], [icons.BIKER, icons.PAPER_CLIP],
                [icons.SPACESHIP, icons.PIANO], [icons.AIRPLANE, icons.SATURN], [icons.TELESCOPE, icons.BULLSEYE],
                [icons.BIKER, icons.BALLOONS], [icons.PINE_TREE, icons.PUZZLE_PIECE], [icons.ROBOT, icons.ATOM],
                [icons.BUBBLING_FLASK, icons.BACKPACK], [icons.PAPER_CLIP, icons.ROBOT], [icons.BULLSEYE, icons.BALLOONS],
                [icons.ATOM, icons.SATELLITE], [icons.PAPER_AIRPLANE, icons.PINE_TREE], [icons.TELESCOPE, icons.SPACESHIP],
                [icons.BULLSEYE, icons.PUZZLE_PIECE], [icons.GEARHEAD, icons.PIANO], [icons.BULLSEYE, icons.TEST_TUBES]]
    },
    ORANGE : {
        color : 0xED7D31,
        stack : [],
        stackX : 720,
        stackY : 200,
        sprite : 'orange_cards',
        deck : [icons.BULLSEYE, icons.AIRPLANE, icons.PINE_TREE, icons.ROBOT, icons.GEARHEAD, icons.APPLE,
                icons.BIKER, icons.BACKPACK, icons.SPACESHIP]
    },
    GOVERNMENT : {
        color : 0x4472C4,
        stack : [],
        stackX : 440,
        stackY : 530,
        sprite : 'government_cards',
        deck : [icons.BALLOONS, icons.SPACESHIP, icons.BALLOONS, icons.BALLOONS, icons.SPACESHIP,
                icons.SPACESHIP, icons.BALLOONS, icons.SPACESHIP]
    },
    AXE : {
        deck : [icons.AXE]
    },
    TREE : {
        deck : [icons.TREE]
    },
    CAR : {
        deck : [icons.CAR]
    }
}

const path = [
    [124,100],
    [268,124, cards.GREEN],
    [400,124, cards.PURPLE],
    [524,124, cards.ORANGE],
    [652,124, cards.PURPLE],
    [784,124, cards.GOVERNMENT],
    [908,124, cards.PURPLE],
    [1036,128, cards.AXE],
    [1140,184, cards.PURPLE],
    [1184,292, cards.GREEN],
    [1152,400, cards.PURPLE],
    [1048,456, cards.ORANGE],
    [920,456, cards.PURPLE],
    [792,460, cards.TREE],
    [660,456, cards.PURPLE],
    [528,456, cards.GOVERNMENT],
    [404,460, cards.PURPLE],
    [272,452, cards.GREEN],
    [168,508, cards.PURPLE],
    [136,616, cards.ORANGE],
    [168,724, cards.PURPLE],
    [264,792, cards.CAR],
    [384,796, cards.PURPLE],
    [520,796, cards.GREEN],
    [652,800, cards.PURPLE],
    [780,796, cards.ORANGE],
    [908,792, cards.PURPLE],
    [1036,792, cards.GOVERNMENT],
    [1160,792, cards.PURPLE],
    [1292,764]
]

const colors = {
    blue : '#4585BF',
    black : '#000000',
    white : '#FFFFFF'
}

export {path, cards, icons, colors}