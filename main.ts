function position (x: number, y: number) {
    if (xPosition - 6 == cubeX && yPosition - 5 == cubeY) {
        led.unplot(xPosition - 5, yPosition - 5)
        xPosition = x
        if (xPosition - 5 == cubeX) {
            cubeX += -1
            radio.sendValue("cubeX", cubeX)
            radio.sendValue("cubeY", cubeY)
        }
        yPosition = y
    } else if (xPosition - 4 == cubeX && yPosition - 5 == cubeY) {
        led.unplot(xPosition - 5, yPosition - 5)
        xPosition = x
        if (xPosition - 5 == cubeX) {
            cubeX += 1
            radio.sendValue("cubeX", cubeX)
            radio.sendValue("cubeY", cubeY)
        }
        yPosition = y
    } else {
        led.unplot(xPosition - 5, yPosition - 5)
        xPosition = x
        yPosition = y
    }
}
function cubeGravityDown (num: number) {
    for (let index = 0; index < num; index++) {
        basic.pause(250)
        led.unplot(cubeX, cubeY)
        cubeY += 1
    }
}
radio.onReceivedValue(function (name, value) {
    if (name == "xPos") {
        position(value, yPosition)
    } else if (name == "yPos") {
        position(xPosition, value)
    } else if (name == "interact" && value == 4) {
        basic.showNumber(3)
        Solved = 1
    } else {
    	
    }
})
function cubeGravityUp (num: number) {
    for (let index = 0; index < num; index++) {
        basic.pause(250)
        led.unplot(cubeX, cubeY)
        cubeY += -1
    }
}
let bro_stop = 0
let compassheading = 0
let otherway = 0
let Solved = 0
let cubeX = 0
let cubeY = 0
let yPosition = 0
let xPosition = 0
radio.setGroup(1)
xPosition = 0
yPosition = 0
let Initialheading = input.compassHeading()
let Conestart = (Initialheading + 135) % 360
let Coneend = (Initialheading + 225) % 360
let Coneend2 = (Coneend + 180) % 360
let Conestart2 = (Conestart + 180) % 360
cubeY = 4
cubeX = 1
radio.sendValue("cubeX", cubeX)
radio.sendValue("cubeY", cubeY)
basic.forever(function () {
    if (cubeX != 4 && cubeY != 0) {
        if (otherway == 0) {
            if (Conestart < Coneend) {
                if (compassheading > Conestart && compassheading < Coneend) {
                    cubeGravityUp(4)
                    otherway = 1
                } else {
                	
                }
            } else {
                if (compassheading > Conestart || compassheading < Coneend) {
                    cubeGravityUp(4)
                    otherway = 1
                } else {
                	
                }
            }
        } else {
            if (Conestart2 < Coneend2) {
                if (compassheading > Conestart2 && compassheading < Coneend2) {
                    cubeGravityDown(4)
                    otherway = 0
                } else {
                	
                }
            } else {
                if (compassheading > Conestart2 || compassheading < Coneend2) {
                    cubeGravityDown(4)
                    otherway = 0
                } else {
                	
                }
            }
        }
    } else {
        if (bro_stop == 0) {
            radio.sendValue("xTarget", 9)
            radio.sendValue("yTarget", 5)
            radio.sendValue("cubeX", -1)
            radio.sendValue("cubeY", -1)
            bro_stop = 1
        }
    }
})
basic.forever(function () {
    if (Solved == 1 && (xPosition < 5 || yPosition < 5)) {
        basic.showNumber(3)
    }
})
basic.forever(function () {
    if (cubeX != 4 && cubeY != 0) {
        led.plot(4, 0)
        basic.pause(700)
        led.unplot(4, 0)
        basic.pause(1400)
        led.plot(4, 0)
    }
})
basic.forever(function () {
    compassheading = input.compassHeading()
})
basic.forever(function () {
    led.plot(xPosition - 5, yPosition - 5)
})
basic.forever(function () {
    led.plot(cubeX, cubeY)
})
basic.forever(function () {
    if (cubeX >= 5) {
        cubeX = 4
    }
    if (cubeY >= 5) {
        cubeY = 4
    }
})
basic.forever(function () {
    if (cubeX <= -1) {
        cubeX = 0
    }
    if (cubeY <= -1) {
        cubeY = 0
    }
})
