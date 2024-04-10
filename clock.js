class Clock extends Domel {
  T
  stepperSeconds
  stepperMinutes
  stepperHours

  constructor(canvasSel, T=-1) {
    super(canvasSel)
    this.T = T

    const ff = 1.0
    this.stepperHours = new Stepper(ff/3600)
    this.stepperMinutes = new Stepper(ff/60)
    this.stepperSeconds = new Stepper(ff)
  }

  draw(ms) {
    const canvas = this.el
    const {width: W, height: H} = canvas
    const ctx = canvas.getContext('2d')

    ctx.reset()

    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, W/2, H/2);
    // w=[a c]      b=[e] 
      // [b d]        [f]
    ctx.transform(2.000000, 0.000000, 0.000000, 2.000000, 0, 0);
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -128, -128);

    this.drawDial(ms)
    this.drawHands(ms)

    ctx.restore();
  }

  steppersStartMaybe(ms) {

    if (this.T<0) {
      this.T = new Date()
	- new Date(new Date().toISOString().split('T').shift()).getTime()
	- new Date().getTimezoneOffset() * 60000
    }

    let T = this.T
    // console.log({T})

    if (!this.stepperHours.isActive) {
      this.stepperHours.start()
      this.stepperHours.rotr.phase = ((T/3600000)%12)/12
    }

    T %= 3600000
    if (!this.stepperMinutes.isActive) {
      this.stepperMinutes.start()
      this.stepperMinutes.rotr.phase = ((T/60000)%60)/60
    }

    T %= 60000
    if (!this.stepperSeconds.isActive) {
      this.stepperSeconds.start()
      this.stepperSeconds.rotr.phase = ((T/1000)%60)/60

      console.log({
	rotrs: {
	  hours: this.stepperHours.rotr,
	  minutes: this.stepperMinutes.rotr,
	  seconds: this.stepperSeconds.rotr,
	}
      })
    }

  }

  drawHands(ms) {
    let cost, sint

    this.steppersStartMaybe(ms)

    const {radians: secondsRadians}
	  = this.stepperSeconds.step(ms)
    const {radians: minutesRadians}
	  = this.stepperMinutes.step(ms)
    const {radians: hoursRadians}
	  = this.stepperHours.step(ms)

    const canvas = this.el
    const ctx = canvas.getContext('2d')
    const {width: W, height: H} = canvas

    // #layer2

    
    // #hour-hand
    cost = Math.cos(hoursRadians)
    sint = Math.sin(hoursRadians)

    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 128, 128);
    ctx.transform(cost, sint, -sint, cost, 0, 0);
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -128, -128);

    ctx.beginPath();
    ctx.fillStyle = 'rgb(128, 0, 0)';
    ctx.lineWidth = 0.279296;
    ctx.moveTo(129.412990, 60.188843);
    ctx.lineTo(134.027040, 66.472660);
    ctx.lineTo(138.141510, 127.383510);
    ctx.bezierCurveTo(138.520540, 132.994810, 133.613790, 137.535320, 127.989720, 137.535320);
    ctx.bezierCurveTo(122.365610, 137.535320, 117.837900, 133.007610, 117.837900, 127.383510);
    ctx.lineTo(122.190920, 66.472660);
    ctx.lineTo(126.666670, 60.195839);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
    
    // #minute-hand
    cost = Math.cos(minutesRadians)
    sint = Math.sin(minutesRadians)
    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 128, 128);
    ctx.transform(cost, sint, -sint, cost, 0, 0);
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -128, -128);

    ctx.beginPath();
    ctx.fillStyle = 'rgb(0, 128, 0)';
    ctx.lineWidth = 0.282287;
    ctx.moveTo(129.862710, 40.032634);
    ctx.lineTo(132.868020, 45.782080);
    ctx.lineTo(136.191290, 124.695940);
    ctx.bezierCurveTo(136.490170, 131.793090, 132.534250, 135.128950, 127.991690, 135.128950);
    ctx.bezierCurveTo(123.449110, 135.128950, 119.792080, 131.808950, 119.792080, 124.695940);
    ctx.lineTo(123.308010, 45.782080);
    ctx.lineTo(126.125010, 40.035298);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
    
    // #seconds-hand
    cost = Math.cos(secondsRadians)
    sint = Math.sin(secondsRadians)
    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 128, 128);
    ctx.transform(cost, sint, -sint, cost, 0, 0);
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -128, -128);

    ctx.beginPath();
    ctx.strokeStyle = 'rgb(255, 204, 0)';
    ctx.lineWidth = 4.189440;
    ctx.moveTo(128.000000, 138.535900);
    ctx.lineTo(128.000000, 31.926484);
    ctx.stroke();
    
    // #seconds-pivot
    ctx.beginPath();
    ctx.fillStyle = 'rgb(255, 204, 0)';
    ctx.lineWidth = 2.140090;
    ctx.arc(128.000000, 128.000020, 5.571456, 0.000000, 6.28318531, 1);
    ctx.fill();

  }

  drawDial(ms) {
    const canvas = this.el
    const ctx = canvas.getContext('2d')

    // #layer1
    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -46.183300, -39.385200);
    
    // #path1
    ctx.beginPath();
    ctx.fillStyle = 'rgb(128, 128, 0)';
    ctx.lineWidth = 0.279296;
    ctx.arc(174.183350, 167.385210, 122.394130, 0.000000, 6.28318531, 1);
    ctx.fill();
    
    // #path9
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(221, 255, 85)';
    ctx.lineWidth = 5.585920;
    ctx.moveTo(280.421620, 167.385190);
    ctx.lineTo(294.284510, 167.385190);
    ctx.stroke();
    
    // #path10
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(221, 255, 85)';
    ctx.lineWidth = 5.585920;
    ctx.moveTo(67.945071, 167.385190);
    ctx.lineTo(54.082183, 167.385190);
    ctx.stroke();
    
    // #path12
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(221, 255, 85)';
    ctx.lineWidth = 5.586370;
    ctx.moveTo(174.183350, 61.146928);
    ctx.lineTo(174.183350, 47.284039);
    ctx.stroke();
    
    // #path13
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(221, 255, 85)';
    ctx.lineWidth = 5.585920;
    ctx.moveTo(174.183350, 273.623470);
    ctx.lineTo(174.183350, 287.486360);
    ctx.stroke();
    
    // #path14
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(221, 255, 85)';
    ctx.lineWidth = 2.792960;
    ctx.moveTo(227.302480, 75.380160);
    ctx.lineTo(234.233920, 63.374546);
    ctx.stroke();
    
    // #path15
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(221, 255, 85)';
    ctx.lineWidth = 2.792960;
    ctx.moveTo(121.064200, 259.390250);
    ctx.lineTo(114.132760, 271.395860);
    ctx.stroke();
    
    // #path16
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(221, 255, 85)';
    ctx.lineWidth = 2.792960;
    ctx.moveTo(266.188380, 114.266060);
    ctx.lineTo(278.194000, 107.334610);
    ctx.stroke();
    
    // #path17
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(221, 255, 85)';
    ctx.lineWidth = 2.792960;
    ctx.moveTo(82.178301, 220.504330);
    ctx.lineTo(70.172686, 227.435780);
    ctx.stroke();
    
    // #path18
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(221, 255, 85)';
    ctx.lineWidth = 2.792960;
    ctx.moveTo(121.064200, 75.380160);
    ctx.lineTo(114.132760, 63.374546);
    ctx.stroke();
    
    // #path19
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(221, 255, 85)';
    ctx.lineWidth = 2.792960;
    ctx.moveTo(227.302480, 259.390250);
    ctx.lineTo(234.233920, 271.395860);
    ctx.stroke();
    
    // #path20
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(221, 255, 85)';
    ctx.lineWidth = 2.792960;
    ctx.moveTo(82.178314, 114.266060);
    ctx.lineTo(70.172701, 107.334610);
    ctx.stroke();
    
    // #path21
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(221, 255, 85)';
    ctx.lineWidth = 2.792960;
    ctx.moveTo(266.188390, 220.504330);
    ctx.lineTo(278.194010, 227.435780);
    ctx.stroke();
    ctx.restore();
    
  }
}
