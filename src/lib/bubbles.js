function drawBubble(parent, x, y, width, height, color) {
    var bubble = parent.add.graphics({ x: x, y: y })

    //  Bubble color
    bubble.fillStyle(0xffffff, 1)

    //  Bubble outline line style
    bubble.lineStyle(6, Phaser.Display.Color.ValueToColor(color).color, 1)

    //  Bubble shape and outline
    bubble.strokeRoundedRect(0, 0, width, height, 16)
    bubble.fillRoundedRect(0, 0, width, height, 16)

    return bubble
}
            
function drawTextBubble(parent, x, y, text, fontSize, color, pad, callback) {
    const textSettings = { fontFamily: 'Helvetica Neue', fontSize: fontSize, color: color, align: 'center' }

    let dummyContent = parent.add.text(0, 0, text, textSettings)
    let bounds = dummyContent.getBounds()
    dummyContent.destroy()

    let bubble = drawBubble(parent, 0, 0, bounds.width + pad * 2, bounds.height + pad * 2, color)
    let content = parent.add.text(pad, pad, text, textSettings)

    let shape = parent.add.rectangle(0, 0, bounds.width + pad * 2, bounds.height + pad * 2).setOrigin(0,0)
    shape.setInteractive({ useHandCursor: true })
    shape.on('pointerdown', callback)

    let container = parent.add.container(x, y)
    container.add(bubble)
    container.add(content)
    container.add(shape)
    return container
}

export {drawBubble, drawTextBubble}