(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.cat1 = function() {
	this.initialize(img.cat1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1813,1169);


(lib.speaking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EgeWAr/QpEkklsp1QlSpGhCrEQhJsKFYsKQFKrrJuoiQJ9ouL1i1QMyjDMKEqQGRCbFJEyQE1EfDgGRQDWF+B1HBQBxG2AJHBQAEDCgFGJQAHFWBBDrQA/DgCLC2QCUDAC/BXQA3AZgCA9QgCA8g4AWQzhHw0gFRQsWDLokAVQhHAChEAAQqSAAnsj3g");
	this.shape.setTransform(151.1876,118.8461,0.4578,0.3882);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("EgeWAr/QpEkklsp1QlSpGhCrEQhJsKFYsKQFKrrJuoiQJ9ouL1i1QMyjDMKEqQGRCbFJEyQE1EfDgGRQDWF+B1HBQBxG2AJHBQAEDCgFGJQAHFWBBDrQA/DgCLC2QCUDAC/BXQA3AZgCA9QgCA8g4AWQzhHw0gFRQsWDLokAVQhHAChEAAQqSAAnsj3g");
	this.shape_1.setTransform(1206.8466,119.2364,0.4579,0.3883,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.1,0,1358.3,238.2);


(lib.setting = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F0B556").s().p("AhMBtQgSgJgPgdQgbgzgRgrQgHgXAAgPIAAgEQABgUAPgOQAOgMAVgEIAWgEQAqgEAyAFQAZADBQAQQARADAIADQANAFAHAKQAIAMgCATQgDAYgMAYQgJASgRAaIgWAfQgNARgNAJQgVAPghADIgSACIgLAAQgpAAgYgNg");
	this.shape.setTransform(-3.5855,-96.117,0.3212,0.3212);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AjwCUQh+gPhbgsQgWgLgLgMQgKgMAAgMQgBgXAfgZQBHg5BkgmQBbgjBjgNQCogYDEA7QCPArBHBHQASARAJAXQAKAbgKAUQgLAZgnAJIhAAIQjHAbjFABIgiAAQhzAAhNgJg");
	this.shape_1.setTransform(-3.5181,-90.2032,0.3212,0.3212);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AB3FNIgohGIlVqLICogVIFlFkQhNHIAEAHQgagHgthGg");
	this.shape_2.setTransform(-36.1132,-72.0548,0.3212,0.3212);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AloJ7QhogRhfgYIhfgXQg3gPgkgTQgxgYglgqQglgqgUg0QgQgpABguQABgQAJhHQAuluAYiZQAOhVAOgvQAUhCAigjQAdgcBEgdQBZgkA3gMQAmgIAjAAIDhgCQBVgBBrACQCmADCNAIQArADBaAEQBPAEA1AMQB0AaBHBYQAjAsAMAnIBsLoQgDBHglA7QgkA8g+AjQg6AfhZAXQgiAIh4AXQjPAojVADIgeAAQi7AAi8geg");
	this.shape_3.setTransform(-3.5448,-66.6096,0.3212,0.3212);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F0B556").s().p("Ao7HeIgCgHQgNgmgPgzQgqiSgOiIQgekZBni6QAwhVBJgkQAogTA2gGQAdgDA/AAIJrADQA4AAAkAJQA1AOAoAlQBWBRAiCuQAaCCgMCmQgNC2g6DSIhBgSQA5jSAMioQALibgYh8QgeiZhGhBQgbgZgjgKQgdgIgwAAIprgDQg3AAgZACQguAFgfAPQg1AagmBDQhdCnAcEEQAOCEAoCLQARA5AKAcIAHAXIgyAtQgLgLgIgcg");
	this.shape_4.setTransform(-3.7008,-99.1645,0.321,0.321);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282E46").s().p("ArbJoQAMgSV+zmIAtAyQ1nTTgbAcg");
	this.shape_5.setTransform(208.9365,-5.5954,0.3212,0.3212);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282E46").s().p("AmApJQhzjQAIgTIAXgUIAIAgIAggGQAOAoFAIrQEHHKFEIoIg6AiQp4w3i7lTg");
	this.shape_6.setTransform(220.0587,-2.07,0.3212,0.3212);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#282E46").s().p("ApwnzIAsgzQSrQTAKARIgcASIgZAXQgigjyKv3g");
	this.shape_7.setTransform(254.2939,-9.0245,0.3212,0.3212);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#282E46").s().p("AmkKfQEOnJDhmFQENnRANgnIAcAJIAEgBIAIgiIAXAUQAIAUhgCwQifEfoWOLg");
	this.shape_8.setTransform(248.9152,-6.1656,0.3212,0.3212);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#9F9EA3").s().p("AmGMbQhpgHhOgLQhigPhRgYQhhgdgxggQhVg5AohHQANgXAagRQAVgOAfgMQAtgSA9gLQAfgGBPgLQBGgJAngJQA7gMAtgVQBYgoBLhKQBLhLAmhXIEYqBQAehDATghQAfg2AkghQAkggAygVQAtgSA2gIQBGgKBYADQBDACBbAKQBLAJANADQAvAMAbAfQAWAaAJAoQAHAggBAtQgBAdgFAxQgFA0gBASQgICvAECrQACB1AHB8QADApAKBVQAGBKgRAyQgUA5gnA0QglAwgzAoQg2ArhJAhQg9AchPAZQjQBAj4ASQhdAHhnAAQh/AAiNgLg");
	this.shape_9.setTransform(218.2621,-100.2338,0.7336,0.7336);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#282E46").s().p("EANwAlAQgwgUgUgwMgdLhHmIDqhgMAdLBHmQAUAwgUAxQgVAwgwAUQgYAKgYAAQgYAAgZgLg");
	this.shape_10.setTransform(262.657,-23.8758,0.3213,0.3213);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#282E46").s().p("EgDWAnmQg0gEgigoQgigpAEg0MAGZhNDID8AVMgGZBNDQgEA0goAiQgjAfgtAAIgMgBg");
	this.shape_11.setTransform(227.5865,-45.4259,0.3213,0.3213);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#282E46").s().p("EgPQAlBQgxgUgTgwQgVgxAUgwMAdLhHmIDqBgMgdLBHmQgUAwgwAUQgZALgYAAQgYAAgYgKg");
	this.shape_12.setTransform(200.9092,-23.8758,0.3213,0.3213);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#282E46").s().p("EgBZAnFQglgmAAg0MAAAhNUID8AAMAAABNUQABA0gmAmQglAlg0AAQgzAAgmglg");
	this.shape_13.setTransform(234.2623,-10.2338,0.3213,0.3213);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#282E46").s().p("ArbpeIAtgyQV+TmAMASIgcATIgZAWQgZgZ1pzWg");
	this.shape_14.setTransform(-209.9288,-5.5954,0.3212,0.3212);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#282E46").s().p("AnsMfQFEooEHnKQFAorAOgoIAcAJIAEgCIAIghIAXAUQAIAThyDQQi8FTp4Q3g");
	this.shape_15.setTransform(-221.0509,-2.07,0.3212,0.3212);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#282E46").s().p("ApwH+QAOgVSnwPIAsAzQyKP3giAjg");
	this.shape_16.setTransform(-255.2862,-9.0245,0.3212,0.3212);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#282E46").s().p("AlLnpQhgiwAIgUIAXgUIAIAhIAggHQANAnEOHRQDgGFEOHJIg6AiQoXuLifkfg");
	this.shape_17.setTransform(-249.9074,-6.1656,0.3212,0.3212);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#9F9EA3").s().p("AiocfQo1gonbiTQi1g4iLhAQilhNh+hhQh0hahUhvQhZh2gtiDQgnhyANipQAYjBAGheQAQkIAGkeQAHmIgRmPQgCgogMh4QgLhwgChBQgChnAQhKQAVhaAxg7QA9hJBsgaQAegHCrgUQDPgYCagEQDIgHCgAXQB6ASBnAqQByAvBTBKQBTBLBHB7QArBLBDCaQGqPQDXHmQBYDICrCrQCqCqDIBaQBnAvCIAdQBZAUCgAVQC0AZBGANQCLAaBoAoQBGAbAvAgQA7AoAeA0QBcCjjDCBQhvBJjdBCQi5A4jgAhQixAajwARQlAAXkhAAQjtAAjXgQg");
	this.shape_18.setTransform(-218.6544,-100.6069,0.3213,0.3213);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#282E46").s().p("EgPQAlBQgwgUgUgwQgVgxATgwMAdMhHmIDqBgMgdLBHmQgUAwgwAUQgZALgYAAQgYAAgYgKg");
	this.shape_19.setTransform(-263.4136,-23.8758,0.3213,0.3213);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#282E46").s().p("AA2RJQgSgPgBgWMgCzghxIBugJMACzAhwQACAXgPASQgPARgXACIgFABQgTAAgQgOg");
	this.shape_20.setTransform(-228.1435,-45.0273,0.7336,0.7336);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#282E46").s().p("EANwAlAQgwgUgUgwMgdLhHmIDqhgMAdLBHmQAUAwgUAxQgVAwgwAUQgYAKgYAAQgYAAgZgLg");
	this.shape_21.setTransform(-201.6659,-23.8758,0.3213,0.3213);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#282E46").s().p("EgBZAnFQgkgmgBg0MAAAhNUID8AAMAAABNUQAAA0glAmQglAlg0AAQgzAAgmglg");
	this.shape_22.setTransform(-235.0249,-10.2338,0.3213,0.3213);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#282E46").s().p("AgOb2QgYAAgQgOQgTgQAAgbIAE6zQAAimAJkIIAOm2QAOoPgplUQgDgbARgPQAPgOAYAAQAWAAATAOQAUAQADAaQApFUgOIPIgOG2QgJEIAACmIgEazQAAAbgSAQQgQAOgWAAIgCAAg");
	this.shape_23.setTransform(93.0441,12.2812,0.3212,0.3212);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#282E46").s().p("Ag2RzQgSgQAAgbQABjVAJlNIAOomQAOqVgmmzQgCgbARgQQAPgOAYAAQAXAAASAOQAUAQACAbQAmGzgOKVIgOImQgJFNgBDVQAAAbgSAQQgRAOgXABQgYgBgRgOg");
	this.shape_24.setTransform(49.2983,-7.9324,0.3212,0.3212);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#282E46").s().p("AgOb2QgYAAgQgOQgTgQAAgbIAE6zQAAimAJkIIAOm2QAOoPgplUQgDgbARgPQAPgOAYAAQAXAAASAOQAUAQADAaQApFUgOIPIgOG2QgJEIAACmIgEazQAAAbgSAQQgQAOgWAAIgCAAg");
	this.shape_25.setTransform(19.1617,12.2812,0.3212,0.3212);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#282E46").s().p("AgOb2QgYAAgRgOQgSgQAAgbIAD6zQABimAJkIIAOm2QAOoPgplUQgDgbARgPQAPgOAXAAQAXAAATAOQAUAQADAaQApFUgOIPIgPG2QgJEIAACmIgDazQAAAbgTAQQgQAOgWAAIgBAAg");
	this.shape_26.setTransform(-54.7052,12.2812,0.3212,0.3212);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#282E46").s().p("AoaUEQsNhhrokuQjnhdiMhgQi9iBhWimQh9j2BTkxQBMkZDPjPQBmhlCRhWQBxhDClhHQFWiSEUhHQHch6IygWQE7gME3AgQLTBMKjEaQFRCME1C6QCvBpBXBbQB+CEANCeQALCHhAChQhdDui+DLQiwC+jvCJQjYB8kMBUQjnBJkdAvQmsBGm4AAQlbAAlkgsg");
	this.shape_27.setTransform(17.2166,-57.0285,0.3212,0.3212);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AilBgIESgIIgSjoIA2gFIAVEhIlJAKg");
	this.shape_28.setTransform(-197.3827,36.4887,0.3203,0.3203);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAGBLQgaAAgCgZIgHhjQgCgaAaAAQAaAAACAaIAIBjQABAagZAAIgBgBg");
	this.shape_29.setTransform(-193.6133,33.0134,0.3201,0.3201);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AhOACQAAgZAagBIBpgDQAagBgBAbQAAAagZAAIhpADIgBAAQgZAAAAgag");
	this.shape_30.setTransform(-201.119,40.0315,0.3201,0.3201);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AilBgIESgIIgSjpIA2gDIAVEgIlKAJg");
	this.shape_31.setTransform(-188.4869,43.7511,0.3203,0.3203);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAFBLQgZAAgCgZIgIhjQgCgaAbAAQAaAAACAaIAHBjQACAagZAAIgCgBg");
	this.shape_32.setTransform(-184.7309,40.2633,0.3201,0.3201);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AhOACQAAgZAagBIBpgDQAagBAAAbQAAAagaAAIhpADIgCAAQgYAAAAgag");
	this.shape_33.setTransform(-192.2289,47.2814,0.3201,0.3201);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("ADSA4QiDhzihhoQj7ihkWhkIATgyQEeBnD8CjQCnBqCEB3QDcDCCSDsIgtAcQiPjmjVi9g");
	this.shape_34.setTransform(-191.1431,46.8041,0.3206,0.3206);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#F6D6C9").s().p("AhxIKIAwiLQAuiKgFAAQgFABhhBkIhgBkQg1gVhKg7QiUh1hti6ICZiIIjMAjQgIgSgLggQgWhAgOhDICpi0QBRhXA4hAQAMgMAOgQQCGgZBQAUIgRCYIBTiSQABgCANACIAQADQAyAHAcAGQCAAYBmAoQBvArBAAzQAlAeAnAvIBBBWQAlAyAVAiIASAeQAKASADAPIhUAuIB3AoIAJAhQAKAsAGA1QAUCpgWC7QgSAOglASQh6A9ibAQQgvAFgxAAQi6AAjIhHg");
	this.shape_35.setTransform(-193.0025,45.2065,0.3206,0.3206);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AjOgEIAYgwID1B7IBfjWIAxAWIh1EIg");
	this.shape_36.setTransform(-77.5092,9.8973,0.3203,0.3203);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgeBFQgXgNALgXIAohbQAKgXAXANQAXANgKAYIgpBaQgGAPgMAAQgGAAgJgFg");
	this.shape_37.setTransform(-72.5138,6.7813,0.3201,0.3201);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAiAvIhegvQgXgLAOgXQANgXAXALIBeAvQAXALgOAXQgJAPgNAAQgHAAgHgDg");
	this.shape_38.setTransform(-82.4402,9.4035,0.3201,0.3201);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AjOgEIAYgwID1B7IBgjVIAwAVIh2EJg");
	this.shape_39.setTransform(-73.1213,20.4986,0.3203,0.3203);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgeBFQgXgNALgYIAohaQAKgYAXAOQAXANgKAYIgpBaQgGAPgMAAQgGAAgJgFg");
	this.shape_40.setTransform(-68.1286,17.3852,0.3201,0.3201);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAiAvIhegvQgXgLAOgXQANgXAXALIBeAvQAXALgOAXQgJAPgNAAQgHAAgHgDg");
	this.shape_41.setTransform(-78.055,19.9983,0.3201,0.3201);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgjkkQhvikiDiRQhDhKg1gwIAkgoQAzAuBIBPQCGCUBwCpQFkIRAiIoIg1AEQghoblboFg");
	this.shape_42.setTransform(-78.4593,17.5209,0.3206,0.3206);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#F6D6C9").s().p("ACFLcQkVhLjjj6IBrhkQBqhkgFgCQgEgCiFArIiEAqQgkgrgmhXQhLitgIjXIDIgwIjEhCQAEg6AUhRQAoijBOhwQACgDBBAJQBNAJBOASQDrA0BbBSIhXB9ICOhZQACgBALAJIAMAJQAiAZAdAYQBkBQBIBWQBOBbAgBLQATArAMA9IAQBpQAJBDACAiQACAaAAAJQAAAUgFAPIhfABIBWBcIgJAiQgMAsgUAxQg+CehsCbQgYADgbAAQhOAAhngbg");
	this.shape_43.setTransform(-76.2212,17.6587,0.3206,0.3206);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AimB2IEOgwIg0jkIA0gLIBAEaIlFA6g");
	this.shape_44.setTransform(119.5603,7.5272,0.3203,0.3203);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgOA4IgWhhQgFgZAZgHQAZgHAGAZIAWBhQAFAZgZAHIgLACQgPAAgFgUg");
	this.shape_45.setTransform(122.0933,3.4859,0.3201,0.3201);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AhNAOQgGgZAZgFIBngSQAZgEAIAaQAGAYgZAFIhnASIgGABQgUAAgHgWg");
	this.shape_46.setTransform(115.6836,11.5177,0.3201,0.3201);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AinB2IEOgwIgzjjIA0gNIBAEbIlGA5g");
	this.shape_47.setTransform(129.409,13.4204,0.3203,0.3203);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgOA4IgWhhQgFgZAZgHQAZgHAGAZIAWBhQAFAYgZAIIgLACQgPAAgFgUg");
	this.shape_48.setTransform(131.9198,9.3911,0.3201,0.3201);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AhMAOQgHgZAZgFIBngSQAZgFAHAaQAHAZgZAEIhnATIgHABQgTAAgGgWg");
	this.shape_49.setTransform(125.5185,17.4094,0.3201,0.3201);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AjVjaQi7hCjAgmQhlgUhEgGIAFg1QBEAGBpAVQDEAmDABEQJYDWFlGmIgpAiQlcmbpKjRg");
	this.shape_50.setTransform(123.9659,16.3505,0.3206,0.3206);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#F6D6C9").s().p("AgXIVIAaiQQAZiPgFABQgEABhRBxIhQBxQg3gNhSgvQilhfiGioICEidIjEBAQgggygghMQhBiagEiJQAAgDA5ggQBDgmBKghQDchiB6ALIAFCYIA9icQAAgBAOAAIAQAAQAoAAAoABQCBAGBrAZQB1AbBGApQAoAXAuAqIBNBMQAvAwAWAaIAWAbQAMAQAFAPIhMA5IB8AXIANAhQAQArAOAyQAtCkAFC8QhDBCiGA1QikBBi+AAQh2AAh+gZg");
	this.shape_51.setTransform(124.4629,15.4541,0.3206,0.3206);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AidgiIAwgXIAlBMIDNhvIAZAwIj+CIg");
	this.shape_52.setTransform(-77.309,-120.3134,0.3203,0.3203);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AhCAkQgNgXAWgMIBYgvQAWgMAOAXQANAXgWAMIhYAvQgIAEgGAAQgNAAgJgPg");
	this.shape_53.setTransform(-74.262,-122.0102,0.3201,0.3201);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AjHiJIAxgXIB3D3IDNhuIAaAuIj/CKg");
	this.shape_54.setTransform(-81.6408,-111.4336,0.3203,0.3203);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AhCAkQgNgXAWgMIBYgvQAWgMAOAXQANAXgXAMIhXAvQgHAEgHAAQgNAAgJgPg");
	this.shape_55.setTransform(-77.2719,-110.9443,0.3201,0.3201);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAAA9IgtheQgLgXAXgOQAXgNAKAXIAuBeQALAXgXAOQgIAFgHAAQgMAAgHgPg");
	this.shape_56.setTransform(-86.7284,-114.9384,0.3201,0.3201);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AjCHfQCWjcBWkSQA3irAci8QALhEAGhDIA1AFQgFA+gMBMQgdDBg4CtQhaEbiZDjg");
	this.shape_57.setTransform(-84.8082,-106.7704,0.3206,0.3206);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#F6D6C9").s().p("AjpJ9QhShDhDhjQhgiQgsi4IEjjgQCwiIBphdQAmgjATgSQA9g4A1g5QArgvB7iXQAnBHAKA1IiRAuICmARQADAAAGAcQAHAXAOA3QAdB7AGBxQAEB5gTBNQgMAtgcA3Ig0BfQgeA1gXAhQgZAogUAOIhLg5IALB9IgcAVQglAbgtAbQiRBYi0A4QgUgMgfgag");
	this.shape_58.setTransform(-82.8547,-111.3556,0.3206,0.3206);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AhYgLICpgdIAJAzIipAeg");
	this.shape_59.setTransform(50.6517,-132.6683,0.3203,0.3203);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AhMAOQgIgZAagFIBngSQAZgEAIAaQAGAYgZAFIhnASIgHAAQgTAAgGgVg");
	this.shape_60.setTransform(49.3142,-132.7338,0.3201,0.3201);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("Aimh1IAhgqQCnCACFCcIgpAjQh+iWimh/g");
	this.shape_61.setTransform(66.7141,-126.2818,0.3206,0.3206);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#F6D6C9").s().p("AgqFNIAbiQQAYiQgEABQgEAChRBxIhRBwQg3gNhSgvQilhfiGinICEieIjEBBQgOgWgTgmQgmhNgYhOQFGBQJQCTID4A+IFQBTQAJBPACBPQgQAQgiAXQhwBOiWAmQh1AeiAAAQh1AAh9gZg");
	this.shape_62.setTransform(48.7178,-128.5236,0.3206,0.3206);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AhYC3ICXjlIjIh4IAbgtID4CUIi1ETg");
	this.shape_63.setTransform(66.8259,152.9672,0.3203,0.3203);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AAeAxIhWgzQgWgNAOgXQANgXAWANIBWAyQAWAOgOAXQgIAOgMAAQgHAAgIgEg");
	this.shape_64.setTransform(63.9181,147.3071,0.3201,0.3201);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgqBCQgXgOAOgVIA5hYQAOgVAXANQAXAOgOAVIg5BYQgJANgMAAQgHAAgJgFg");
	this.shape_65.setTransform(65.3504,157.4698,0.3201,0.3201);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AhYC3ICXjlIjIh4IAbguID5CVIi2ETg");
	this.shape_66.setTransform(77.8756,149.8605,0.3203,0.3203);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AAdAxIhVgyQgWgOAOgXQANgXAWANIBVAzQAWANgNAXQgIAOgNAAQgGAAgJgEg");
	this.shape_67.setTransform(74.9561,144.2023,0.3201,0.3201);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgqBCQgXgOAOgVIA5hXQAOgWAXAOQAXANgOAWIg5BXQgJANgMAAQgHAAgJgFg");
	this.shape_68.setTransform(76.3933,154.3692,0.3201,0.3201);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("ArcDWQEBi2Egh2QC4hKCugpQEghEESAQIgDA1QkLgQkYBDQitApiwBIQkZByj+C0g");
	this.shape_69.setTransform(75.9167,154.493,0.3206,0.3206);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#F6D6C9").s().p("AELF5QhWh0gFAAQgDAIAqDUQhwgPiLgYIiPgZQjjgkkHg0Ih0gYQAkh6AshhQA7iBA/g3IBzBkIhIiXQAAgCAJgJIAKgLIA4g6QBchZBdg+QBmhDBMgWQAtgOA9gEIBsgEQBEgBAhACQAyACATAJIgKBfIBmhLIAgANQArARAuAaQCWBQCNB+IgBAQQgBAWgEAZQgUCGhNCHQhxDLjaCbIhVh0g");
	this.shape_70.setTransform(74.3776,151.5224,0.3206,0.3206);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("Aj3iKIAqggIDJEIIDai1IAiAqIkFDYg");
	this.shape_71.setTransform(-103.396,88.2142,0.3203,0.3203);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AhBA2QgTgSAUgRIBbhLQAUgQATASQATATgUARIhbBLQgJAIgJAAQgLAAgKgLg");
	this.shape_72.setTransform(-97.6602,86.9154,0.3201,0.3201);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AAPA/IhLhjQgQgUAYgOQAXgNAPAUIBLBkQAQAUgYAOQgJAFgIAAQgMAAgJgNg");
	this.shape_73.setTransform(-109.6341,84.4667,0.3201,0.3201);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("Aj3iKIAqggIDJEJIDai1IAiApIkFDYg");
	this.shape_74.setTransform(-104.3088,101.8422,0.3203,0.3203);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AhBA3QgTgTAUgRIBbhLQAUgQATASQATATgUARIhbBLQgJAIgJAAQgLAAgKgKg");
	this.shape_75.setTransform(-98.5724,100.5407,0.3201,0.3201);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AAPA/IhLhjQgQgUAYgOQAXgNAPAUIBLBjQAPAVgXANQgJAGgIAAQgMAAgJgNg");
	this.shape_76.setTransform(-110.5502,98.1023,0.3201,0.3201);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgQNZQAuisAUi7QAYjSgMjkQgPlBhRk/QgahmgfhbQgQgygLgbIAxgUQANAgAPAvQAfBcAaBoQBUFGAQFGQALDqgYDVQgUC+gwCxg");
	this.shape_77.setTransform(-106.6567,90.6928,0.3206,0.3206);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#F6D6C9").s().p("AAGNAQiyglkqg5Qhiigg3jEQFJhgAAgJQgGgHlGguQgPhCAFhxQAMjgBpjqIDvA2IivisQAjg7A+hKQB8iUCKhPIAMgIQAHAABAArQBMA0BKA7QDeCzA1CHIieBYIDHgVQACAAAHAPIAIARIAqBVQBACOAgB9QAjCMgGBfQgCA4gUBHQgHAcggBfQgUA/gVAzIgQAmQgLAVgNANIhmgxIArCPIgbAhQgkAogvAqQiegjiighg");
	this.shape_78.setTransform(-106.5671,91.7108,0.3206,0.3206);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("Ah5DUIC+kQIjViJIAdgtIEECnIjeE+g");
	this.shape_79.setTransform(-151.0059,-32.404,0.3203,0.3203);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AAYAvIhKgvQgWgOAOgXQANgXAWAOIBKAvQAWAOgOAXQgIAPgMAAQgHAAgIgGg");
	this.shape_80.setTransform(-154.1389,-38.9827,0.3201,0.3201);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgyBJQgXgOAPgVIBHhmQAPgVAXAOQAXANgPAVIhHBmQgJANgMAAQgIAAgJgFg");
	this.shape_81.setTransform(-153.2107,-27.0862,0.3201,0.3201);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AhtDcIC/kQIjviYIAdgtIEeC2IjfE9g");
	this.shape_82.setTransform(-138.1385,-35.9511,0.3203,0.3203);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAlA3Ihkg/QgWgOAOgXQANgXAWAOIBkA/QAWAOgOAXQgJAOgLAAQgHAAgIgFg");
	this.shape_83.setTransform(-141.2875,-42.5345,0.3201,0.3201);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgyBIQgXgNAPgVIBHhmQAPgVAXANQAXAOgPAVIhHBmQgJANgMAAQgIAAgJgGg");
	this.shape_84.setTransform(-139.9542,-30.3793,0.3201,0.3201);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("As+DKQEOimElhtIAFgCQDRhODWgsQFYhGFGAcIgFA1Qk9gclSBFQjRArjSBPIgFACQkbBpkKCkg");
	this.shape_85.setTransform(-139.3985,-31.8629,0.3206,0.3206);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#F6D6C9").s().p("AmbKSIgWj1IhvDcQgxgLhIgbQiPg2huhNINJxiQAsgHA5gBIBoAAQBFAAAzAFIAqAEQAYAEAQAIIgQBwIB8hVIAmAQQAyAXA3AfQCvBlCjCbIgJBMQgSBfgrBiQiIE5lQDgIhiiQQhjiPgDAFQgDAFAaClIAbCjQg6AjhtAdQiQAmihAAQhRAAhVgJg");
	this.shape_86.setTransform(-141.9958,-31.6919,0.3206,0.3206);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AhtDcIC/kPIjviZIAdgtIEeC2IjfE9g");
	this.shape_87.setTransform(76.7867,-57.1378,0.3203,0.3203);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAlA3Ihkg/QgVgOANgXQAOgXAVAOIBkA/QAWAOgOAXQgIAOgMAAQgHAAgIgFg");
	this.shape_88.setTransform(73.5114,-63.692,0.3201,0.3201);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgyBJQgXgOAPgVIBHhmQAPgVAXAOQAXANgPAVIhHBmQgJANgMAAQgIAAgJgFg");
	this.shape_89.setTransform(74.8439,-51.5406,0.3201,0.3201);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AhtDcIC/kQIjviYIAdguIEeC4IjfE9g");
	this.shape_90.setTransform(90.0464,-60.4367,0.3203,0.3203);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AAlA3Ihkg/QgVgOANgXQAOgXAVAOIBkA/QAWAOgOAXQgIAOgMAAQgHAAgIgFg");
	this.shape_91.setTransform(86.7629,-66.9888,0.3201,0.3201);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgyBIQgXgNAPgVIBHhmQAPgVAXANQAXAOgPAVIhHBmQgJANgMAAQgIAAgJgGg");
	this.shape_92.setTransform(88.0953,-54.8337,0.3201,0.3201);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AvCEoQBDg2BmhEQDGiEDahmQKtlFKPA4IgFA1QqCg3qfE+QjWBljBCBQhoBFg+A0g");
	this.shape_93.setTransform(84.8227,-53.4765,0.3206,0.3206);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#F6D6C9").s().p("AlvKRIgVj0IhwDcQhEgQhcgmQi4hLh2hwQgEgDAWhLQAZhYAihaQBnkLBxhdICEB8IhQi3QgBgBAMgMIANgMQAgggAlgjQByhoBwhFQB5hLBegZQA2gOBIgDQAWgBBrAAQBFAAAzAEQA7AFAXALIgQBxIB8hVIAmAQQAyAWA3AgQCvBlCjCbIgJBMQgSBfgqBiQiJE5lPDgIhjiQQhjiPgDAFQgDAFAbCkIAaCjQg5AjhtAdQiQAniiAAQhRAAhVgKg");
	this.shape_94.setTransform(85.0313,-56.1855,0.3206,0.3206);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AhsDcIC+kQIjviYIAdgtIEeC3IjfE8g");
	this.shape_95.setTransform(216.0853,-11.6257,0.3203,0.3203);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AAlA3Ihkg/QgWgOAOgXQANgXAWAOIBkA/QAWAOgOAXQgIAOgMAAQgHAAgIgFg");
	this.shape_96.setTransform(212.7238,-18.2081,0.3201,0.3201);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgyBJQgXgOAPgVIBHhmQAPgVAXAOQAXANgPAVIhHBmQgJANgMAAQgIAAgJgFg");
	this.shape_97.setTransform(214.0583,-6.0529,0.3201,0.3201);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AhAgIIAdgtIBkA/IgdAtg");
	this.shape_98.setTransform(226.3664,-21.1861,0.3203,0.3203);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAlA3Ihkg/QgWgOAOgXQANgXAWAOIBkA/QAVAOgNAXQgIAPgMAAQgHAAgIgGg");
	this.shape_99.setTransform(225.9696,-21.5038,0.3201,0.3201);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AnYDkQAVgSAtghQBPg6Bag5QEbizE0hzQA4gVAugPIARAzQgnAMg9AXQkvBxkWCvQhZA5hMA4QglAbgcAXg");
	this.shape_100.setTransform(208.5609,-5.6941,0.3206,0.3206);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#F6D6C9").s().p("AmrI9QiFhAhchUIgKgJQgEgDAWhLQAYhYAjhaQBmkLBxhdICEB8IhPi4QAAgCALgLIANgMQAcgcApgnQBwhmBwhHQB7hLBcgZQA2gOBKgDQASgBBvAAQBCAAA2AEIAkAEQAVADAOAGQheCKidDdIiQDJIkBFiQioDphZB7QhdgchYgrg");
	this.shape_101.setTransform(214.8778,-11.3695,0.3206,0.3206);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("Aj3iKIAqggIDJEIIDai0IAiApIkFDYg");
	this.shape_102.setTransform(6.9092,-4.1711,0.3203,0.3203);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AhBA3QgTgTAUgRIBbhLQAUgRATATQATATgUARIhbBLQgJAIgJAAQgLAAgKgKg");
	this.shape_103.setTransform(12.5766,-5.411,0.3201,0.3201);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AAPBAIhLhkQgQgUAYgOQAXgNAPAUIBLBkQAPAUgXAOQgJAFgIAAQgMAAgJgMg");
	this.shape_104.setTransform(0.5988,-7.8534,0.3201,0.3201);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("Aj3iKIAqggIDKEIIDZi1IAiApIkEDZg");
	this.shape_105.setTransform(5.9883,9.4729,0.3203,0.3203);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AhBA3QgTgTAUgRIBbhLQAUgQATATQATASgUARIhbBLQgJAIgJAAQgLAAgKgKg");
	this.shape_106.setTransform(11.6644,8.2188,0.3201,0.3201);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AAPA/IhLhjQgQgUAYgNQAXgOAPAUIBLBjQAPAVgXANQgJAGgIAAQgMAAgJgNg");
	this.shape_107.setTransform(-0.3134,5.7742,0.3201,0.3201);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AhvPgQD4pThirgQgfjqg/jgQghh0gfhPIAygUQAeBNAjB6QBADkAgDvQBkLvj+Jfg");
	this.shape_108.setTransform(3.7903,2.763,0.3206,0.3206);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#F6D6C9").s().p("AkANqQkBjihvmEQFQhigGgHQgHgHlFgvQgPhBAFhwQALjhBqjqIDvA2IivitQAkg8BAhMQCAiYCOhPQAEgCBBAsQBMAyBKA8QDgC0A2CIIieBYIDGgUQACgBAHAPIAIARQAVAnAVAvQBACKAhCBQAiCKgFBhQgDA4gTBGQgIAcgfBfQgUA+gVAzIgRAnQgLAVgMANIhngxIArCQIgbAgQgkAogvAqQiWCIjEBsQhqgjiBhxg");
	this.shape_109.setTransform(3.8782,3.1464,0.3206,0.3206);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AihBXIDGlNIAuAbIiqEdID6CGIgaAwg");
	this.shape_110.setTransform(-9.0169,-83.7852,0.3203,0.3203);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AAnAzIhog3QgXgMAOgXQANgXAXAMIBoA3QAXANgOAXQgIAPgNAAQgHAAgIgFg");
	this.shape_111.setTransform(-6.1402,-77.7871,0.3201,0.3201);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgsBMQgXgNANgXIA/hqQANgWAYANQAXAOgOAWIg/BqQgIAOgNAAQgHAAgIgFg");
	this.shape_112.setTransform(-8.368,-89.8077,0.3201,0.3201);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AiiBWIDHlMIAuAbIiqEdID6CHIgaAvg");
	this.shape_113.setTransform(-21.9963,-79.5095,0.3203,0.3203);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AAnAzIhog3QgXgNAOgXQANgXAXANIBoA3QAXAMgOAXQgJAQgMAAQgHAAgIgFg");
	this.shape_114.setTransform(-19.1127,-73.5231,0.3201,0.3201);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgtBMQgXgNAOgWIA/hrQANgXAXAOQAXANgNAXIg/BrQgIANgMAAQgIAAgJgFg");
	this.shape_115.setTransform(-21.341,-85.5457,0.3201,0.3201);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AuoGSIABg1QKDAGKGltQFHi6DbjOIAlAnQjbDPlJC7QqJF0qJAAg");
	this.shape_116.setTransform(-16.5341,-85.6958,0.3206,0.3206);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#F6D6C9").s().p("AjuKrIgqgBQgYgCgQgGIAHhyIh1BeQg5gQhbgsQi2hYiuiOQgHhwA4ihQBxlCE+j4QDZESAEgIQAEgJhOk/QAOgJAbgPQA2gdBCgXQDUhKEAAKIAoDyIBfjjIAuAJQA6ANA8ATQC9A/B+BmQADADgPBMQgTBagbBbQhTEShqBlIiNhxIBdCwQABADgXAZQghAmgfAhQhqBwhqBNQg4ApgrAZQg4Agg0ASQg1AShJAJIh/AKQg/AEgwAAIgKAAg");
	this.shape_117.setTransform(-16.7125,-82.9227,0.3206,0.3206);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("Aj3iKIAqggIDJEIIDai0IAiApIkFDYg");
	this.shape_118.setTransform(184.5696,-87.1081,0.3203,0.3203);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AhBA3QgTgUAUgQIBbhLQAUgRATAUQATASgUARIhbBLQgJAIgJAAQgLAAgKgKg");
	this.shape_119.setTransform(190.143,-88.2984,0.3201,0.3201);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AAPBAIhLhkQgPgUAXgOQAXgNAPAUIBLBkQAPAUgXAOQgJAFgIAAQgMAAgJgMg");
	this.shape_120.setTransform(178.1559,-90.7391,0.3201,0.3201);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("Aj3iKIAqggIDJEJIDai1IAiApIkFDYg");
	this.shape_121.setTransform(183.6568,-73.4801,0.3203,0.3203);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AhAA3QgTgTATgRIBbhLQAUgQATASQATATgUARIhbBLQgJAIgJAAQgLAAgJgKg");
	this.shape_122.setTransform(189.2209,-74.6731,0.3201,0.3201);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AAPA/IhLhjQgPgUAXgOQAXgNAPAUIBLBjQAPAVgXAOQgJAFgIAAQgMAAgJgNg");
	this.shape_123.setTransform(177.2437,-77.1115,0.3201,0.3201);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AhyMXQB6kkAmlXQAXjUgKjhQgMj/g4kIIAzgLQA7EOALECQALDjgXDaQgoFeh9Esg");
	this.shape_124.setTransform(181.7672,-73.8478,0.3206,0.3206);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#F6D6C9").s().p("AkAKyQkBjihvmEQFKhfAAgJQgGgHlGgvQgPhBAFhwQALjiBqjqIDvA3IiIiGQAFgEAEgGQBIAUCPgQQCOgPBDASQDUA5CDAlIhqA6IDGgUQADAAAOAfQAWAoAVAuQBACLAgCAQAjCKgGBiQgDA3gTBGQgIAdgfBfQgXBGgSAqQgUA1gUAVIhmgyIArCPQgkAvhLBFQiWCIjEBsQhqgkiBhxgAm8smIgLgfIAnAnQgGAFgGAAQgIAAgIgNgAmgseg");
	this.shape_125.setTransform(181.7436,-74.0001,0.3206,0.3206);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("Aj3iKIAqggIDJEIIDai0IAiApIkFDYg");
	this.shape_126.setTransform(140.6429,84.3068,0.3203,0.3203);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AhBA3QgTgUAUgQIBbhLQAUgRATATQATATgUAQIhbBMQgJAIgJAAQgLAAgKgKg");
	this.shape_127.setTransform(146.2276,83.0103,0.3201,0.3201);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AAPBAIhLhkQgQgUAYgNQAXgOAPAUIBLBkQAQAVgYAMQgJAGgIAAQgMAAgJgMg");
	this.shape_128.setTransform(134.2536,80.5617,0.3201,0.3201);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("Aj3iKIAqggIDJEJIDai1IAiApIkFDYg");
	this.shape_129.setTransform(139.7301,97.9348,0.3203,0.3203);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AhBA3QgTgTAUgRIBbhLQAUgQATASQATATgUARIhbBLQgJAIgJAAQgLAAgKgKg");
	this.shape_130.setTransform(145.3153,96.6356,0.3201,0.3201);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AAPBAIhLhjQgQgVAYgNQAXgOAPAVIBLBjQAPAUgXAOQgJAFgIAAQgMAAgJgMg");
	this.shape_131.setTransform(133.3375,94.1973,0.3201,0.3201);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AAMMcQAZh1ANh1QAXjcgLjaQgPlChRk/QgahngfhZQgRgygLgbIAygUQALAcARAzQAfBcAaBnQBUFGAQFHQALDggYDfQgMBzgaB8g");
	this.shape_132.setTransform(137.6657,84.7448,0.3206,0.3206);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#F6D6C9").s().p("AmMLgQiCi3hFjyQFJhhAAgIQgGgHlFgvQgQhCAGhvQALjhBpjqIDvA2IivitQAjg6A+hKQB8iUCKhQIAMgHQAHAABAArQBMAzBKA8QDeCzA1CHIieBYIDHgUQADAAAOAfQAWAqAUAsQArBdAbBVQhSB7iMDKQg/BbhiCGIijDgQh+Cwg8BaIgxBGQh/hghiiLg");
	this.shape_133.setTransform(136.8569,90.0836,0.3206,0.3206);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("Ah/DbIDMkFIjmilIAfgsIEUDGIjvExg");
	this.shape_134.setTransform(-2.0908,87.9099,0.3203,0.3203);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AAjA6IhghFQgVgOANgYQAOgXAVAPIBgBFQAVAOgOAYQgIANgLAAQgHAAgIgFg");
	this.shape_135.setTransform(-5.228,81.2819,0.3201,0.3201);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("Ag1BGQgUgTAQgUIBNhiQAQgUATASQATATgQAUIhNBiQgIALgJAAQgIAAgJgJg");
	this.shape_136.setTransform(-4.5142,93.4851,0.3201,0.3201);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("Ah+DbIDMkFIjnilIAfgsIEUDFIjuEyg");
	this.shape_137.setTransform(11.313,85.2996,0.3203,0.3203);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AAjA6IhghEQgVgPANgXQAOgYAVAPIBgBFQAVAOgNAYQgIAOgLAAQgHAAgJgGg");
	this.shape_138.setTransform(8.1755,78.6664,0.3201,0.3201);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("Ag2BGQgSgTAPgVIBNhiQAPgUATATQATATgQAUIhMBiQgIALgJAAQgIAAgKgJg");
	this.shape_139.setTransform(8.8917,90.8745,0.3201,0.3201);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AvQD9QBCgyBshAQDMh6DghbQK8khKLBaIgHA1Qp+hZqvEcQjaBajIB3QhpA+hDAyg");
	this.shape_140.setTransform(5.4783,92.0901,0.3206,0.3206);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#F6D6C9").s().p("AmNKBIgJj1Ih6DVQhEgThagqQi0hVhwh1QgDgEAZhKQAdhWAnhYQB1kGB1hWIB+CCIhHi7QAAgCAMgLIAOgLQAlgiAjgdQB3hiBzhAQB7hEBhgVQA1gLBKABQAYAABpAFQBQAFAoAGIApAGQAYAFAQAJIgWBwICAhPIAmASQAwAZA1AjQCqBtCbCjIgNBLQgXBfgvBfQiYEylbDOIhbiUQhciUgDAFQgDAFASClIASCkQg7AghuAYQh0AYh9AAQhxAAh3gTg");
	this.shape_141.setTransform(5.7137,89.4942,0.3206,0.3206);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#E8929A").s().p("AgSDuQgdgNgLgrQgUhPALh6QATiJAFhBQACgWAXAAQAWAAgCAWIgJBiQgIA/gCAiQgGBiADAyIABAeQACAXAGAGQALAMALgKQARgPAGgBQgVADAAgXQAAgXAVgCIAEgBQAKAAAJAMQAVAegKAfQgIAcgbAOQgOAIgPAAQgLAAgLgGg");
	this.shape_142.setTransform(-48.1264,-164.4366,0.3202,0.3202);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#E8929A").s().p("AgnDeQgihgAXiCQAShqAyhyQAJgUAUALQATAMgJAUQgvBpgQBhQgUB6AeBXQAHAVgUAGIgJABQgPAAgGgQg");
	this.shape_143.setTransform(-46.5047,-164.6852,0.3202,0.3202);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#E8929A").s().p("AhIDmQgQgRAOgQQAfgjAThPQAShZAHgjQAXhpANhKQAEgVAWAGQAWAGgEAVQgTBngaBvIgbB1QgTBGggAkQgHAJgIAAQgHAAgIgIg");
	this.shape_144.setTransform(-45.1944,-164.2704,0.3202,0.3202);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#F6D6C9").s().p("AhMDmQgkgHgHglQgFgcALgmQAXhNA/hhQAig4BIhsQALgTAUALQATAMgLATQgRAbglA4QgkA3gRAdQgzBWgUAzIgLAZQgGARABAJQAEATATgHQANgGADgLQgEgIADgKQAGgWAVAHIADABQAOAGABAQQAEAggbAeQgXAYgaAAIgLgBg");
	this.shape_145.setTransform(69.9958,-134.6633,0.3202,0.3202);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#F6D6C9").s().p("AiRCzQAMhlBOhqQBAhZBghNQARgOAQAQQAQAQgRAOQhaBIg8BQQhLBigLBbQgDAWgXAAQgWAAACgWg");
	this.shape_146.setTransform(72.3737,-133.9989,0.3202,0.3202);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#F6D6C9").s().p("AiqCrQgGgWAUgIQATgHAYgXIAkgnQAngqAxg7QA8hIA5hLQANgRAUALQATAMgNARQg7BPhKBXQgxBAgeAhQg0A5gvASQgFACgEAAQgNAAgEgQg");
	this.shape_147.setTransform(73.1207,-133.2023,0.3202,0.3202);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#E8929A").s().p("AgNDTQgTgMANgRQAVgegKhAQgThHgFgZQgIglAEg3QAFhFgBgYQgCgVAXAAQAWAAABAVQACAXgGAzQgGAvAEAcQADAVAKAmQAJApADATQAIAtAAAWQgBAmgTAZQgIAKgKAAQgGAAgIgEg");
	this.shape_148.setTransform(-22.3047,-158.5068,0.3202,0.3202);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#E8929A").s().p("AgwDdQgUgMAOgRQAXgfAMg/IANhlQALg6AFgmQALhEgIgUQgDgEgCgGQgGgWAWgEIABAAQASgEAHAOQARAegKBFQgEAmgNA+IgPB2QgNBJgbAmQgIAKgKAAQgHAAgIgEg");
	this.shape_149.setTransform(-20.679,-158.8222,0.3202,0.3202);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#E8929A").s().p("AhdDCQgMgUATgLQAlgXAchGIAjhuIAXhJQAMgrAFggQAEgWAVAGQAWAGgDAWQgGArgRA3QgKAigWA8QgbBNgMAaQgcA8gnAXQgHAEgGAAQgKAAgHgMg");
	this.shape_150.setTransform(-19.4622,-157.6359,0.3202,0.3202);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#E8929A").s().p("AhEDHQgLgUASgNQAbgUAHhBIAEhhQADgmAUg0QAXhAAGgXQAFgWAWAHQAWAGgGAVQgFAWgWA2QgTAugEAfQgCARgCAlQgCAkgCATQgGAvgIAWQgLAkgcATQgHAGgGAAQgJAAgHgMg");
	this.shape_151.setTransform(96.1385,-127.9331,0.3202,0.3202);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#E8929A").s().p("AhsDFQgLgUASgNQAfgXAdg8IApheQAbg6AVg2IAUg1IgBgHQAAgXAVABIABAAQAIAAAGAFQAGAEACAIQAEAMgHAWIgMAgQgVA3gdBBIgyBvQgjBEgnAdQgHAEgGAAQgKAAgHgLg");
	this.shape_152.setTransform(97.8893,-127.73,0.3202,0.3202);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#E8929A").s().p("AiSCgQgGgWAWgGQApgKAvg6QAGgHA6hWIAthCQAZgmAOgeQAJgUATALQAUAMgJAUQgSAmgfAvIg5BQQgxBFgSAUQguAzgsALIgIABQgPAAgFgRg");
	this.shape_153.setTransform(98.783,-126.2886,0.3202,0.3202);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#E8929A").s().p("AhUDMQgagrAThGQAKgjAjhJQAdg/ASgjQAeg3AfgkQAOgRAQAQQAQAQgOARQgSAVgYAsIgnBIQgqBSgJAYQgdBLAWAlQALATgTAMQgIAEgGAAQgKAAgHgMg");
	this.shape_154.setTransform(243.8665,-87.9271,0.3202,0.3202);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#E8929A").s().p("Ah7DBQgWgGAEgVQAMgzAmg9QASgbA3hHIA5hNQAlguAggWQATgMALAUQALATgSANQgZARghApIgyBEQg1BDgSAaQgmA7gLAwQgEARgOAAIgIgBg");
	this.shape_155.setTransform(246.0806,-87.5902,0.3202,0.3202);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#E8929A").s().p("AioCmQgGgWAUgIQArgRAzg4QAcgfAvg9QBNhdAigwQANgSATAMQAUALgNASQgrA+hUBiQhBBPgPAPQg0A2gwASQgFADgFAAQgMAAgEgQg");
	this.shape_156.setTransform(247.3938,-86.9948,0.3202,0.3202);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#E8929A").s().p("Ah3CoQgEgtAhg8QAMgXAxhGQA1hQA6hGQAOgRAQAQQAQAQgOARQgyA8gvBFIg7BXQgjA7AEApQACAWgXAAQgXAAgCgWg");
	this.shape_157.setTransform(147.3353,-114.6117,0.3202,0.3202);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#E8929A").s().p("AiTC3QgQgQAOgRIEMlLQANgRAQAQQAQAQgOARIkLFLQgHAJgIAAQgHAAgIgIg");
	this.shape_158.setTransform(148.7506,-114.3594,0.3202,0.3202);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#E8929A").s().p("AjCC1QgGgVAVgEQA0gJA/hBIBahrQBFhTA5hQQAMgSAUALQAUAMgNARQhBBchOBcQhQBfgOANQhABAg4AKIgGAAQgRAAgFgTg");
	this.shape_159.setTransform(150.2286,-114.4635,0.3202,0.3202);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#E8929A").s().p("AhDDCQgPgrAPhCQAGgaAbhQQAdhYAmhXQAJgUAUAMQATALgJAUQgfBHgbBOQgfBbgCALQgSBCAOAmQAIAUgWAGIgJACQgPAAgGgQg");
	this.shape_160.setTransform(7.4653,-150.5321,0.3202,0.3202);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#E8929A").s().p("AhcDYQgUgMAJgUIComHQAJgUATAMQAUALgIAUIipGIQgGAMgKAAQgFAAgHgEg");
	this.shape_161.setTransform(8.9968,-150.6707,0.3202,0.3202);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#E8929A").s().p("AiJDjQgMgUAUgJQAwgYArhPQAEgIA2h4QAphZAkhlQAHgUAWAGQAWAGgHAUQgoBvgyBqQgyBrgLAWQgtBNgzAZQgHADgFAAQgMAAgHgNg");
	this.shape_162.setTransform(10.3531,-151.1514,0.3202,0.3202);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#E8929A").s().p("Ah3CoQgEgsAhg9QALgVAxhIQAzhMA9hKQAOgRAQAQQAQAQgOARQgxA7gwBGIg7BYQgjA7AEAoQABAWgWAAQgXAAgCgWg");
	this.shape_163.setTransform(220.5183,-95.4213,0.3202,0.3202);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#E8929A").s().p("AiTC3QgQgQANgRIEMlLQAOgRAQAQQAQAQgNARIkMFLQgHAJgIAAQgHAAgIgIg");
	this.shape_164.setTransform(221.9336,-95.1631,0.3202,0.3202);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#E8929A").s().p("AjCC2QgGgWAVgEQA0gJA/hBIBahrQBHhVA3hOQANgSATALQAUAMgNASQhCBdhNBaQhNBcgRARQhAA/g5AKIgGAAQgQAAgFgSg");
	this.shape_165.setTransform(223.4078,-95.2772,0.3202,0.3202);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#E8929A").s().p("Ah+DNQgDgKAKgVIAQgdIBEiDQAUgkAkhNQAihFAdgpQANgSATAMQAUALgNASQgYAjgdA6QggBBgQAeIhGCIQgPAggJAPQgFAIgCAJIgDgIQAHAUgWAGIgJABQgPAAgFgQg");
	this.shape_166.setTransform(127.0083,-120.7495,0.3202,0.3202);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#E8929A").s().p("AhwDxQgHhwA/iQQAnhaBXiRQAMgTATAMQAUALgMATQhXCOgiBSQg9CKAGBqQACAWgXAAQgXAAgBgWg");
	this.shape_167.setTransform(126.3213,-122.2788,0.3202,0.3202);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#E8929A").s().p("AinDaQgMgTAUgKQAWgKAZgfQANgRAXghQAdgoA9hdIA6hgQAjg6AbghQAOgRAQAQQAQAQgOARQgeAlgqBHQg4BcgNAUQgqBIgbAmQgwBFgsAUQgGADgGAAQgMAAgHgOg");
	this.shape_168.setTransform(129.1674,-120.9703,0.3202,0.3202);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#F6D6C9").s().p("AidC6QgEgMANgTQAHgLAOgQIBeh8QAYgfAwhGQAtg9AjgjQAQgQAQAQQAQAQgQAQQgfAggoA2QgsA+gWAcIhaB4IgMATQgIALgGAGQgHAHgCAFIgCgIQAGAUgVAFIgJACQgPAAgFgQg");
	this.shape_169.setTransform(194.4154,-103.4367,0.3202,0.3202);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#F6D6C9").s().p("AiWDfQALhxBWiFQA1hTBwiCQAPgQAQAQQAQAQgPAQQhrB8gwBLQhUB9gKBnQgCAWgXAAQgWAAACgWg");
	this.shape_170.setTransform(193.9994,-105.0635,0.3202,0.3202);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#F6D6C9").s().p("AjLC6QgGgWAVgGQAWgFAagYQAPgNAZgbQAxgwA/hEIBKhXQAtg1AigdQAQgOAQAQQAQAQgQAOQgmAggzA9IhUBhQg4BCgiAjQg9A+gwANIgIACQgPAAgFgSg");
	this.shape_171.setTransform(196.6461,-103.2312,0.3202,0.3202);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#F6D6C9").s().p("AAHDFQgphJgLhyQgIhLAGh5QABgWAXAAQAWAAgBAWQgFB1AGBEQAIBrAnBEQALATgTALQgIAFgGAAQgKAAgHgMg");
	this.shape_172.setTransform(38.2204,-142.1319,0.3202,0.3202);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#F6D6C9").s().p("AghDDQgTgMANgRQAWgeAGhAIAFhjIAChLQACguACgdQACgVAXAAQAXAAgDAVQgEAigBA4IgEBZIgHBhQgIA8gVAeQgIAKgKAAQgHAAgIgEg");
	this.shape_173.setTransform(40.1296,-142.6726,0.3202,0.3202);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#F6D6C9").s().p("Ag5DRQgUgLANgSQAyhAAYhxQAYhqgLhYQgDgVAWAAQAXAAADAVQAEAhgFAwIgMBRQgLBJgPAwQgUBDghAsQgIAKgLAAQgHAAgHgEg");
	this.shape_174.setTransform(41.5029,-142.4763,0.3202,0.3202);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#F6D6C9").s().p("Ag7C+QgOhVAdhuQAThKAvhyQAJgUATALQAUALgIAVQgrBjgTBFQgcBqANBKQAEAWgWAGIgJABQgOAAgDgRg");
	this.shape_175.setTransform(171.1362,-108.2017,0.3202,0.3202);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#F6D6C9").s().p("AhjCrQgMgUATgMQAdgTAcg7IAmhbQAHgPAWg3QARgsANgaQAKgTAUALQATAMgKATQgPAdgVA1QgYA8gKAVIgnBZQgdA1ggAVQgHAEgGAAQgKAAgHgMg");
	this.shape_176.setTransform(173.174,-108.0113,0.3202,0.3202);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#F6D6C9").s().p("Ah+CvQgMgUATgLQAtgcAog3QAbglAjhAIAig/QATgmAGgdQAEgVAWAGQAWAGgFAVQgHAjgXAtQgHAOgiA8QgkBAgeAnQgqA2gvAeQgHAFgGAAQgKAAgHgNg");
	this.shape_177.setTransform(174.3673,-107.3396,0.3202,0.3202);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#E8929A").s().p("AijCAQgUgLAMgTQAshHBgg+QA/gqBtgzQAUgKALAUQAMATgUAKQhrAyg5AkQhbA6gpBCQgHAMgKAAQgHAAgHgFg");
	this.shape_178.setTransform(265.0402,-78.8198,0.3202,0.3202);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#E8929A").s().p("AisBWQgVgEAGgWQAGgVAVADQAkAGBAgcQAjgPA5gdIBAgfQAogTAZgKQAVgIAGAWQAGAWgVAIQgbAKg4AcQg+AdgZAKIhUAkQgoAOgfAAQgKAAgKgBg");
	this.shape_179.setTransform(266.379,-77.4023,0.3202,0.3202);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#E8929A").s().p("AjDBGQgWgDAGgWQAGgWAWAEQBOANBtgfQBpgcBGgyQASgMAMATQALAUgSANQgcATgwASIhRAdQhEAXgyAJQgkAGggAAQgdAAgZgFg");
	this.shape_180.setTransform(266.8373,-76.0705,0.3202,0.3202);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#F6D6C9").s().p("AgBDeIAJhiQAIg+ACgkQAGhagDg5IgBgfQgCgWgGgHQgMgLgKAKQgQAOgHABQAVgCAAAXQAAAXgVACIgEAAQgLACgIgNQgVgfAJgfQAJgbAagOQAbgOAZAMQAcANALAqQAVBQgMB5QgHBFgRCGQgBAWgXAAQgWAAACgWg");
	this.shape_181.setTransform(69.0862,170.2524,0.3202,0.3202);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#F6D6C9").s().p("AguDqQgUgMAJgTQAwhpAQhiQAUh5gehYQgIgVAVgGQAWgGAIAVQAiBggXCCQgSBqgyByQgGANgKAAQgFAAgIgEg");
	this.shape_182.setTransform(67.4691,170.485,0.3202,0.3202);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#F6D6C9").s().p("Ag+DsQgVgGADgVQAVh1AYhgQAPhNAMgoQAThHAggkQAOgQAQAQQAQAQgOAQQgfAjgUBQQgKAsgOBPQgWBngOBMQgDAQgOAAIgJgBg");
	this.shape_183.setTransform(66.168,170.0782,0.3202,0.3202);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#E8929A").s().p("AhtDjQgTgMALgTQAQgaAmg5QAkg2ARgeQAzhWAUgzIALgZQAGgRgBgJQgEgUgTAIQgNAGgDAMQAEAHgDAKQgGAWgVgHIgDgCQgNgFgCgRQgEgfAbgeQAdgeAfAHQAkAHAHAlQAFAcgLAlQgXBOg/BhQgiA4hIBsQgHAMgKAAQgGAAgIgEg");
	this.shape_184.setTransform(-54.2878,136.6847,0.3202,0.3202);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#E8929A").s().p("AiJDBQgQgQARgOQBahJA8hPQBLhiALhcQADgVAXAAQAWAAgCAVQgMBmhOBqQg/BZhhBNQgIAGgHAAQgJAAgJgIg");
	this.shape_185.setTransform(-56.6695,136.0203,0.3202,0.3202);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#E8929A").s().p("AigC3QgTgMANgRQBHheA9hIQAyhBAeggQA0g6AugRQAVgIAGAWQAGAWgVAIQgTAHgXAXIgkAnQgmAogyA9Qg8BIg5BLQgIAKgKAAQgHAAgIgEg");
	this.shape_186.setTransform(-57.4113,135.2194,0.3202,0.3202);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#E8929A").s().p("AgLDCQgBgWAGg0QAFgvgEgcQgDgWgJglIgNg8QgIgvABgUQAAgmATgZQANgRATALQAUAMgOARQgVAeAKBAQAHAjASA9QAHAlgEA3QgFBFACAYQABAWgXAAQgVAAgCgWg");
	this.shape_187.setTransform(46.0104,165.3713,0.3202,0.3202);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#E8929A").s().p("AgxDWQgQgeAJhFQAOhMADgZQAIhMAHgpQAOhJAbgmQANgRATALQAUAMgNARQgYAfgLA/QgHAkgHBBIgQBgQgKBFAIAUIAEAJQAGAWgVAEIgCAAIgHABQgNAAgFgLg");
	this.shape_188.setTransform(44.3789,165.6814,0.3202,0.3202);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#E8929A").s().p("AhPDNQgWgGAEgWQAGgrARg3IAghfQAchOALgYQAcg8AngXQATgMALAUQAMATgTAMQgmAXgcBGQgEALgeBjQghBngIAtQgCARgOAAIgJgBg");
	this.shape_189.setTransform(43.1685,164.4924,0.3202,0.3202);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#E8929A").s().p("Ag3DRQgVgGAFgVQAFgWAWg2QATguAEgfIAEg2IAFg3QAGgwAGgVQAMgkAcgTQARgNAMATQALAUgRANQgcAUgHBBQgDAkgBA8QgDAngUA0QgXBAgGAXQgEARgOAAIgJgCg");
	this.shape_190.setTransform(-80.4267,129.9513,0.3202,0.3202);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#E8929A").s().p("AhXDQIgBAAQgRAAgFgQQgEgNAHgVIAMghQAUg0AehDIAyhwQAjhDAngdQASgNAMATQALAUgSANQgfAXgdA8QgRAhgZA+QgaA4gVA4IgTAzIABAIQAAAWgVAAIgBAAg");
	this.shape_191.setTransform(-82.1851,129.7389,0.3202,0.3202);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#E8929A").s().p("AiFCtQgUgMAJgUQASgmAfgvIA5hQQAyhGARgTQAugyAsgMQAWgFAGAWQAGAWgWAFQgpAKgvA6IhABdIgtBCQgZAmgOAeQgGANgKAAQgFAAgHgEg");
	this.shape_192.setTransform(-83.0788,128.3046,0.3202,0.3202);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#E8929A").s().p("AgVDUQgNgtgFhAQgEgmgBhHQgChPAGgmQAMhFAogeQASgMAMATQALAUgSANQgiAYgCBTQgBAXAFBgIAFBOQAEAuAJAgQAGAVgVAGIgIABQgPAAgEgQg");
	this.shape_193.setTransform(18.362,159.1115,0.3202,0.3202);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#E8929A").s().p("AAXDYQgVgigOg5IgWhfQgUhSgFglQgLhFAKg0QAEgVAWAGQAWAGgEAVQgJAxAMBGQAFAcAVBXIATBQQANAxARAcQALATgTALQgIAFgGAAQgKAAgHgMg");
	this.shape_194.setTransform(20.6666,159.6651,0.3202,0.3202);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#E8929A").s().p("AAyDTQgOhCgehnQgThPgOgqQgYhJgjgjQgPgQARgQQAPgQAQAQQAiAjAYBDQAHATAdBeQAiBzASBYQAEAVgWAGIgIACQgOAAgDgRg");
	this.shape_195.setTransform(22.0773,159.6595,0.3202,0.3202);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#E8929A").s().p("AhbDQQgQgQAOgRQASgVAYgrIAnhJQAqhRAJgZQAdhLgWglQgLgTATgLQAUgMALATQAaArgTBGQgKAkgjBIQgdA/gSAjQgeA3gfAkQgHAJgHAAQgIAAgIgIg");
	this.shape_196.setTransform(-235.523,97.3081,0.3202,0.3202);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#E8929A").s().p("AiJC2QgLgTASgNQAZgQAhgqIAyhDQA2hFARgaQAmg6ALgxQAFgVAWAGQAWAGgFAWQgMAzgmA8QgTAdg2BEIg5BOQglAuggAWQgIAEgGAAQgJAAgHgMg");
	this.shape_197.setTransform(-237.7386,96.9731,0.3202,0.3202);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#E8929A").s().p("AieCxQgTgLAMgSQAxhFBOhbQBEhRANgNQA0g2AwgTQAUgIAGAWQAGAWgUAIQgsARgyA4QgdAfgvA9QhLBZgjA0QgIALgKAAQgHAAgIgFg");
	this.shape_198.setTransform(-239.0429,96.3698,0.3202,0.3202);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#E8929A").s().p("AhvC2QgQgQAOgRQAtg2A0hLIA7hYQAjg7gDgoQgCgWAXAAQAWAAACAWQAEAtghA8QgKATgyBKQg0BOg8BIQgHAJgHAAQgIAAgIgIg");
	this.shape_199.setTransform(-134.1606,117.8958,0.3202,0.3202);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#E8929A").s().p("AiTC3QgQgQANgRIEMlLQAOgRAQAQQAQAQgOARIkLFLQgHAJgIAAQgHAAgIgIg");
	this.shape_200.setTransform(-135.5703,117.6376,0.3202,0.3202);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#E8929A").s().p("Ai3DEQgUgMANgSQBChdBNhaQBMhbASgSQBBg/A4gKQAVgDAGAWQAGAWgVADQg0AJg/BBIhaBrQhCBPg8BUQgIALgKAAQgHAAgHgEg");
	this.shape_201.setTransform(-137.0501,117.7459,0.3202,0.3202);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#E8929A").s().p("Ag9DOQgTgMAJgUQAhhLAZhKQAdhVAEgQQAShCgOgnQgIgUAWgGQAWgGAHAUQAQArgPBDQgGAagbBPQgcBVgnBaQgGANgKAAQgGAAgHgEg");
	this.shape_202.setTransform(-2.49,152.1292,0.3202,0.3202);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#E8929A").s().p("AhdDYQgTgLAJgVICpmHQAIgUAUAMQATALgJAUIipGHQgFANgKAAQgFAAgIgEg");
	this.shape_203.setTransform(-4.0195,152.2668,0.3202,0.3202);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#E8929A").s().p("Ah9DuQgWgGAIgUQAmhpAzhwQAxhqAMgXQAthNAzgZQAUgJALATQAMAUgUAKQgwAXgrBQIg5B/QgoBXgmBnQgFAQgOAAIgKgCg");
	this.shape_204.setTransform(-5.3826,152.7474,0.3202,0.3202);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#E8929A").s().p("AhvC2QgQgQAOgRQAyg8AvhFQA2hOAFgKQAjg7gEgoQgCgWAXAAQAXAAACAWQAEAtghA9QgMAWgxBGQg1BQg6BGQgHAJgIAAQgHAAgIgIg");
	this.shape_205.setTransform(-211.1222,103.1204,0.3202,0.3202);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#E8929A").s().p("AiTC3QgQgQANgRIEMlLQAOgRAQAQQAQAQgNARIkMFLQgHAJgIAAQgHAAgIgIg");
	this.shape_206.setTransform(-212.5375,102.8622,0.3202,0.3202);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#E8929A").s().p("Ai3DEQgUgMANgSQBFhhBKhWQBNhcARgRQBAg/A4gKQAWgDAGAWQAGAWgVADQg0AJg/BBIhaBrQhHBVg3BOQgIALgKAAQgHAAgHgEg");
	this.shape_207.setTransform(-214.0116,102.9722,0.3202,0.3202);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#F6D6C9").s().p("AhzDZQgUgMANgSQAYgjAeg6IAvhfIBHiIIAXguQAFgIACgJIADAHQgGgUAVgGQAWgFAHAUQAEALgLAUIgQAdIhECDIg4BxQgiBFgdApQgIALgKAAQgHAAgHgEg");
	this.shape_208.setTransform(-111.3009,122.7622,0.3202,0.3202);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#F6D6C9").s().p("AhkECQgUgMAMgSQBWiOAkhSQA9iKgHhqQgCgWAXAAQAXAAABAWQAHBvg/CRQgnBahXCRQgIAMgKAAQgGAAgHgFg");
	this.shape_209.setTransform(-110.617,124.3113,0.3202,0.3202);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#F6D6C9").s().p("AijDgQgQgQAOgRQAeglAqhHQA4hdANgUQAqhHAbgmQAwhFAsgUQAUgJALAUQAMATgUAJQgWAKgZAfQgNASgXAhQgoA3gyBOIg6BfQgjA6gbAiQgHAJgIAAQgHAAgIgIg");
	this.shape_210.setTransform(-113.4632,122.9882,0.3202,0.3202);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#E8929A").s().p("AiWDBQgQgQAQgPQAfggAog3QAsg+AWgcIBah4QAQgZAKgKQAJgKAAgGIABADQABgMAPgFQAWgGAHAVQAEAMgNATQgHAKgOAQIheB9QgYAfgwBFQgtA+gjAjQgIAIgIAAQgIAAgIgJg");
	this.shape_211.setTransform(-185.6512,109.0324,0.3202,0.3202);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#E8929A").s().p("AiODtQgQgQAOgQQBsh8AwhLQBUh9AKhnQACgWAXAAQAXAAgDAWQgLBxhWCFQg2BThwCCQgHAIgIAAQgHAAgIgIg");
	this.shape_212.setTransform(-185.2285,110.6632,0.3202,0.3202);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#E8929A").s().p("AjEDDQgRgQARgOQAmghAzg9IBUhhQA4hCAigiQA9g/AwgNQAWgFAGAWQAGAWgWAFQgVAGgaAYQgPANgaAbQgsArhDBJIhKBXQguA1ghAdQgHAHgIAAQgJAAgIgJg");
	this.shape_213.setTransform(-187.8787,108.8312,0.3202,0.3202);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#E8929A").s().p("AACC7QAGh2gGhDQgJhrgnhEQgLgTAUgLQAUgMALATQApBJALByQAIBMgGB4QgBAWgXAAQgXAAABgWg");
	this.shape_214.setTransform(-26.4002,144.6816,0.3202,0.3202);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#E8929A").s().p("AgsCyQADghACg5QAChCACgXQADg/AEgiQAIg8AVgeQANgRAUALQATAMgNARQgWAegGBAQgDAjgCBAQgBATgBA4QgCAvgDAcQgBAVgXAAQgXAAADgVg");
	this.shape_215.setTransform(-28.2999,145.2224,0.3202,0.3202);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#E8929A").s().p("AhDDAQgFghAGgwIAMhRQALhJAPgwQAVhCAhgtQANgRATALQAUAMgOARQgxBBgYBwQgYBrALBXQAEAVgXAAQgXAAgDgVg");
	this.shape_216.setTransform(-29.684,145.0142,0.3202,0.3202);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#E8929A").s().p("AAVC3QgFhzgNhEQgShqguhAQgMgSATgMQAUgLAMASQAwBEAVBxQAOBJAGB6QABAWgXAAQgXAAgBgWg");
	this.shape_217.setTransform(96.0073,171.4282,0.3202,0.3202);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#E8929A").s().p("AgXCzQABghgEg5IgEhZQgDg+ABgiQADg8AUghQAKgSAUALQATAMgLASQgTAfAABBQAAAkAFA/IAEBLQADAvAAAcQgBAWgVAAQgXAAAAgWg");
	this.shape_218.setTransform(94.0512,172.1221,0.3202,0.3202);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#E8929A").s().p("AgrDJQgVhcAPh0QAPh7AuhLQAMgTAUAMQATALgLATQgrBDgNByQgOBsASBSQAEAVgVAHIgIABQgOAAgEgRg");
	this.shape_219.setTransform(92.6508,172.063,0.3202,0.3202);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#E8929A").s().p("AgyDLQgTgMAIgUQArhlAShDQAchqgMhKQgEgWAWgGQAWgGAEAWQAOBVgdBuQgTBMgwBwQgFANgKAAQgGAAgHgEg");
	this.shape_220.setTransform(-159.0991,114.0976,0.3202,0.3202);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#E8929A").s().p("AhaCzQgUgMAKgUQAPgcAVg1QAYg9AKgVIAohYQAcg0AggWQATgLALATQAMAUgTAMQgdASgcA8QgQAhgWA6IgcBGQgSAtgNAZQgGAMgKAAQgGAAgHgEg");
	this.shape_221.setTransform(-161.1477,113.8992,0.3202,0.3202);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#E8929A").s().p("AhwC6QgWgGAEgWQAHgiAXgtIAphLQAkg/AegoQAqg2AwgdQATgMALAUQAMATgTAMQgtAcgoA3QgcAlgiBAIgiA/QgTAmgGAcQgEARgOAAIgIgBg");
	this.shape_222.setTransform(-162.3361,113.2275,0.3202,0.3202);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#E8929A").s().p("AhtCxQgQgQAPgQQBMhXAlg6QA8haALhNQAEgWAVAGQAWAGgDAWQgMBTg/BfQgpA+hQBcQgIAIgHAAQgIAAgIgIg");
	this.shape_223.setTransform(-254.3088,89.6387,0.3202,0.3202);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#E8929A").s().p("AiOCMQgQgQAQgPQAYgXAjgqQAsgzAOgPQApgwAZgYQAsgrAlgJQAWgFAGAWQAGAWgWAFQgQAEgTAQIgdAcQgiAfgsAxIgyA6QgfAlgVAUQgHAHgIAAQgIAAgJgIg");
	this.shape_224.setTransform(-256.1426,88.8404,0.3202,0.3202);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#E8929A").s().p("AikCMQgUgLALgTQASgeAkgkIA+g5QA3gyAogcQA5gnA2gNQAWgFAGAWQAGAWgVAFQg0ANg4AmQglAbg1AxIg1AxQgeAfgPAZQgHAMgKAAQgGAAgHgFg");
	this.shape_225.setTransform(-257.0642,87.841,0.3202,0.3202);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#E1A290").s().p("EAlgBOzQiRgUi0ggIgBAAIg+gLIgBAAIgGgBIgEgBIgBAAIgFgBQjagikGg1IjNgrIAAAAIgNgDIAAAAIgSgEQlmhOmchxIgBAAIgqgMIAAAAQkvhSkyheIg7gTQllhtmUiDInviiQihgzhcgcQgVgIghgIIgOgEQgDgCgGgBIAAAAQmFh1mnhmQj4g9kbg+QiegiiigiIhWgRImHhNIkog4IgggGIr5iNQnHhUkyg8IgfgGQmmhUlqhRIg0gMIgBAAIi6grQl5hai/g1QhzgghsghQhogahDgWQh+gogvgtQgQgQgHgRIggAAQA3jPDBj0QBBhRBth5QCOieAbggQB5iMCfisQBShaDLjYICpi0QBRhXA5hAQAMgMANgQQC5jODbkbQBPhnEvmUMAZygieQBZh3CDikIDhkXQCSi2ELjVIEjjhQCwiJBqhdQAmgiATgTQA9g4A0g5QAsgvB6iXQD1ksBxh+QDbjzCAhHIABAAQAUgLAOgFIAFABIAAAAIAGABIABAAQOBDYLsC3IArALIIGB+QFGBQJRCTID5A+ID+A/IARAFIBAAQILXC3IApAKQHNB0F6BhIAXAGIKSCqIAoALIKgCxIA4APIBEATIAAAAQDOA2BaAZIEHBIIAsAMIABAAIAjAKQGZBwFyBqIARAFIAcAJQGSB0EvBiIAfALIAAAAIAhAKQHCCXBKBDQAIAIAEAHQAKAUhABvIhNCBQkGHpmPJJQheCLidDcIiQDKIkBFjQiqDnhYB7Qi2D9iNDQQjpFUmMJqQm1Kqi8EYQhSB7iLDKQhABchhCGIijDfQh/Cwg9BaIgwBGQitD7iVC8Qi1Dki1CyQjRDOgsA1QiECcgmCWQgEAKgGAFQgOANgjAHIAAAAQglAHg7AAQhvAAi9gZg");
	this.shape_226.setTransform(4.5372,5.7035,0.321,0.321);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-297.3,-172.3,593.9000000000001,351.3);


(lib.salad = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5D999D").s().p("AnDD5QiWhGhXh/QhoibAAjmQABAyA8AuQA9AuBuAkQBtAkCPATQCTAUChAAQCiAACTgUQCOgTBugkQBugkA8guQA9guACgyQgBDmhpCbQhWB/iWBGQi2BVkOAAQkOAAi1hVg");
	this.shape.setTransform(-1.6,25.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3B7F75").s().p("Egg2ASIQq+lImPpQQnorSgDwxQAJDrEZDXQEZDWH/CmQH/ClKYBbQKuBeLvAAQLwAAKuheQKYhbH/ilQH/imEZjWQEZjXAJjrQgDQxnoLSQmPJQq9FIQtOGMzqAAQzpAAtNmMg");
	this.shape_1.setTransform(-1.6098,25.4739,0.2148,0.2148);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#BC433E").s().p("Ag0CDQg6gYgag3Qgag2AWg1QAWg2A5gXQA5gVA5AYQA7AXAZA3QAaA2gWA2QgWA2g4AWQgcAKgbAAQgdAAgfgMg");
	this.shape_2.setTransform(33.4573,11.9102,0.2148,0.2148);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#BC433E").s().p("Ag0CDQg6gYgag3Qgag2AWg2QAWg2A5gVQA5gWA5AYQA6AXAaA3QAaA2gWA2QgWA2g5AVQgbALgcAAQgdAAgegMg");
	this.shape_3.setTransform(33.904,6.3574,0.2148,0.2148);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#BC433E").s().p("Ag0CDQg6gYgag3Qgag1AWg3QAWg2A5gVQA4gWA6AYQA6AYAaA2QAaA2gWA2QgWA2g5AVQgbALgcAAQgdAAgegMg");
	this.shape_4.setTransform(30.9834,1.8813,0.2148,0.2148);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BC433E").s().p("Ag0CCQg6gXgag3Qgag1AWg2QAWg2A5gXQA4gVA6AXQA6AZAaA2QAaA2gWA2QgWA2g5AWQgbAKgbAAQgdAAgfgNg");
	this.shape_5.setTransform(26.2481,-0.7924,0.2148,0.2148);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#BC433E").s().p("Ag0CCQg6gXgag3Qgag1AWg2QAWg2A5gXQA4gVA6AXQA6AZAaA2QAaA2gWA2QgWA2g5AWQgbAKgcAAQgdAAgegNg");
	this.shape_6.setTransform(21.3947,1.0437,0.2148,0.2148);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#BC433E").s().p("Ag0CCQg6gXgag3Qgag2AWg2QAWg2A5gVQA5gWA5AYQA7AXAZA3QAaA2gWA2QgWA2g4AVQgcALgbAAQgdAAgfgNg");
	this.shape_7.setTransform(19.0904,5.2717,0.2148,0.2148);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#BC433E").s().p("Ag0CDQg7gYgZg3Qgag2AWg2QAWg2A4gVQA5gWA6AYQA6AXAaA3QAaA2gWA2QgWA2g5AVQgbALgcAAQgdAAgegMg");
	this.shape_8.setTransform(20.4348,10.1478,0.2148,0.2148);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#BC433E").s().p("Ag0CDQg7gZgZg2Qgag2AWg1QAWg2A4gXQA5gVA6AYQA6AXAaA3QAaA2gWA2QgWA2g5AWQgbAKgbAAQgeAAgegMg");
	this.shape_9.setTransform(24.3004,14.5946,0.2148,0.2148);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#BC433E").s().p("Ag0CDQg7gYgZg3Qgag1AWg2QAWg3A4gVQA5gWA6AYQA6AYAaA2QAaA2gWA2QgWA2g5AWQgbAKgbAAQgeAAgegMg");
	this.shape_10.setTransform(29.4544,15.9905,0.2148,0.2148);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#861F31").s().p("AheEqQh+g9g9iCQg+iBAoh8QAnh7B1gsQB1gsB9A8QB/A9A9CCQA9CBgnB8QgoB7h1AsQgxATgzAAQhFAAhJgjg");
	this.shape_11.setTransform(27.4428,7.8192,0.2148,0.2148);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#BC433E").s().p("Ag0CDQg6gYgag3Qgag2AWg2QAWg2A5gVQA5gWA5AYQA7AXAZA3QAaA2gWA2QgWA2g4AVQgcALgcAAQgdAAgegMg");
	this.shape_12.setTransform(30.687,13.4093,0.2148,0.2148);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#BC433E").s().p("Ag0CDQg6gZgag2Qgag2AWg1QAWg2A5gXQA5gVA5AYQA6AXAaA3QAaA2gWA2QgWA2g5AWQgbAKgbAAQgdAAgfgMg");
	this.shape_13.setTransform(31.1337,7.8514,0.2148,0.2148);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#BC433E").s().p("Ag0CCQg6gXgag3Qgag2AWg2QAWg2A5gVQA4gWA6AYQA6AXAaA3QAaA2gWA2QgWA2g5AVQgbALgcAAQgdAAgegNg");
	this.shape_14.setTransform(28.2131,3.3792,0.2148,0.2148);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#BC433E").s().p("Ag0CCQg6gXgag3Qgag2AWg2QAWg2A5gVQA4gWA6AYQA6AXAaA3QAaA2gWA2QgWA2g5AVQgbALgbAAQgdAAgfgNg");
	this.shape_15.setTransform(23.4778,0.7055,0.2148,0.2148);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#BC433E").s().p("Ag0CDQg6gYgag3Qgag2AWg2QAWg2A5gVQA4gWA6AYQA6AXAaA3QAaA2gWA2QgWA2g5AVQgbALgcAAQgdAAgegMg");
	this.shape_16.setTransform(18.6244,2.5429,0.2148,0.2148);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#BC433E").s().p("Ag0CDQg6gYgag3Qgag2AWg1QAWg2A5gXQA5gVA5AYQA7AXAZA3QAaA2gWA2QgWA2g4AWQgcAKgbAAQgdAAgfgMg");
	this.shape_17.setTransform(16.3201,6.7669,0.2148,0.2148);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#BC433E").s().p("Ag0CDQg7gYgZg3Qgag1AWg2QAWg3A4gVQA5gWA6AYQA6AYAaA2QAaA2gWA2QgWA2g5AWQgbAKgbAAQgeAAgegMg");
	this.shape_18.setTransform(17.6645,11.6418,0.2148,0.2148);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#BC433E").s().p("Ag0CDQg7gYgZg3Qgag1AWg3QAWg2A4gVQA5gWA6AYQA6AYAaA2QAaA2gWA2QgWA2g5AVQgbALgbAAQgeAAgegMg");
	this.shape_19.setTransform(21.5301,16.0871,0.2148,0.2148);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#BC433E").s().p("Ag0CCQg7gXgZg3Qgag2AWg2QAWg2A4gVQA5gWA6AYQA6AXAaA3QAaA2gWA2QgWA2g5AVQgbALgbAAQgeAAgegNg");
	this.shape_20.setTransform(26.6841,17.4911,0.2148,0.2148);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#BC433E").s().p("AgwB3Qg1gVgXgyQgYgxAUgyQAUgxA0gUQA0gUA0AWQA2AVAYAzQAXAxgUAxQgUAxg0AUQgZAJgZAAQgaAAgdgLg");
	this.shape_21.setTransform(27.6923,15.1705,0.2148,0.2148);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#BC433E").s().p("AgwB3Qg1gVgXgyQgYgxAUgyQAUgxA0gUQA0gUA0AWQA2AVAYAzQAXAxgUAxQgUAxg0AUQgYAJgaAAQgaAAgdgLg");
	this.shape_22.setTransform(28.1004,10.0916,0.2148,0.2148);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#BC433E").s().p("AgwB3Qg1gVgXgyQgYgxAUgyQAUgxA0gUQA0gUA1AWQA1AVAXAzQAYAxgUAxQgUAxg0AUQgYAJgaAAQgaAAgdgLg");
	this.shape_23.setTransform(25.4267,6.0006,0.2148,0.2148);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#BC433E").s().p("AgwB3Qg1gVgXgzQgYgxAUgxQAUgxA0gUQA0gUA0AWQA2AVAYAyQAXAygUAxQgUAxg0AUQgZAJgZAAQgbAAgcgLg");
	this.shape_24.setTransform(21.0994,3.5602,0.2148,0.2148);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#BC433E").s().p("AgvB3Qg2gVgYgyQgXgyAUgxQAUgxA0gUQA0gUA1AWQA1AVAXAzQAYAxgUAxQgUAxg0AUQgZAJgZAAQgaAAgcgLg");
	this.shape_25.setTransform(16.6648,5.2382,0.2148,0.2148);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#BC433E").s().p("AgvB3Qg2gVgYgzQgXgxAUgxQAUgxA0gUQA0gUA1AWQA1AVAXAyQAYAygUAxQgUAxg0AUQgZAJgZAAQgbAAgbgLg");
	this.shape_26.setTransform(14.5602,9.1009,0.2148,0.2148);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#BC433E").s().p("AgvB3Qg2gWgXgyQgYgxAUgxQAUgxA0gUQA0gUA0AWQA2AVAXAyQAYAygUAxQgUAxg0AUQgZAJgaAAQgaAAgbgLg");
	this.shape_27.setTransform(15.7897,13.557,0.2148,0.2148);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#BC433E").s().p("AgvB3Qg2gVgXgzQgYgxAUgxQAUgxA0gUQA0gUA0AWQA2AVAXAyQAYAygUAxQgUAxg0AUQgZAJgZAAQgbAAgbgLg");
	this.shape_28.setTransform(19.3224,17.6265,0.2148,0.2148);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#BC433E").s().p("AgvB3Qg2gVgYgzQgXgxAUgxQAUgxA0gUQA0gUA1AWQA1AVAXAzQAYAxgUAxQgUAxg0AUQgZAKgZAAQgbAAgbgMg");
	this.shape_29.setTransform(24.0308,18.9004,0.2148,0.2148);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#BC433E").s().p("AgFCYQg6gDgoguQgnguACg+QADg/AqgrQArgqA6ACQA6ACAnAuQAoAugCA+QgDA/grArQgoApg2AAIgGAAg");
	this.shape_30.setTransform(-27.3224,-4.9688,0.2148,0.2148);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#BC433E").s().p("AgFCYQg6gDgoguQgnguACg+QADg/AqgrQArgqA6ACQA6ACAnAuQAoAugCA+QgDA/grArQgoApg2AAIgGAAg");
	this.shape_31.setTransform(-32.7019,-3.5085,0.2148,0.2148);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#BC433E").s().p("AgFCYQg6gCgnguQgogvACg+QADg+ArgrQArgrA5ACQA6ACAnAvQAoAugCA+QgDA/grArQgoAog2AAIgGAAg");
	this.shape_32.setTransform(-35.9221,0.7597,0.2148,0.2148);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#BC433E").s().p("AgFCYQg6gCgnguQgogvACg+QADg+ArgrQArgrA5ACQA6ACAnAvQAoAugCA+QgDA/grArQgoAog2AAIgGAAg");
	this.shape_33.setTransform(-36.8348,6.1178,0.2148,0.2148);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#BC433E").s().p("AgFCYQg6gDgoguQgnguACg+QACg/ArgrQArgqA5ACQA7ACAnAuQAoAugDA+QgCBAgrAqQgoApg3AAIgFAAg");
	this.shape_34.setTransform(-33.4584,10.0638,0.2148,0.2148);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#BC433E").s().p("AgFCYQg6gCgngvQgoguACg+QADg/ArgrQArgqA5ACQA6ACAnAuQAoAvgCA+QgDA/grArQgoAog2AAIgGAAg");
	this.shape_35.setTransform(-28.707,10.7994,0.2148,0.2148);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#BC433E").s().p("AgFCYQg6gDgnguQgoguACg+QADg/ArgrQArgqA5ACQA6ACAnAuQAoAugCA+QgDA/grArQgoApg2AAIgGAAg");
	this.shape_36.setTransform(-24.573,7.8841,0.2148,0.2148);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#BC433E").s().p("AgECYQg7gDgnguQgoguADg+QACg/ArgrQArgqA5ACQA6ACAoAuQAnAugCA+QgDBAgqAqQgpApg2AAIgFAAg");
	this.shape_37.setTransform(-21.7007,2.7408,0.2148,0.2148);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#BC433E").s().p("AgFCYQg6gDgoguQgnguACg+QADg/AqgrQAsgqA5ACQA6ACAnAuQAoAugCA+QgDBAgqAqQgpApg2AAIgGAAg");
	this.shape_38.setTransform(-22.1302,-2.5851,0.2148,0.2148);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#861F31").s().p("Aj0D1QhShfAPiLQAOiKBlhmQBmhlCAgFQCCgFBRBfQBSBfgPCMQgOCKhmBlQhlBmiBAFIgMAAQh5AAhNhbg");
	this.shape_39.setTransform(-29.1365,2.075,0.2148,0.2148);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#BC433E").s().p("AgFCYQg6gCgoguQgngvACg+QADg+AqgrQArgrA5ACQA7ACAnAvQAoAugDA+QgBA/gsArQgoAog3AAIgFAAg");
	this.shape_40.setTransform(-24.9756,-2.8696,0.2148,0.2148);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#BC433E").s().p("AgFCYQg6gCgnguQgogvADg+QACg+ArgrQArgrA4ACQA7ACAoAvQAnAugDA+QgCA/grArQgoAog3AAIgFAAg");
	this.shape_41.setTransform(-30.3552,-1.4093,0.2148,0.2148);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#BC433E").s().p("AgFCYQg6gDgoguQgnguACg+QADg/AqgrQArgqA5ACQA7ACAnAuQAoAugDA+QgCBAgrAqQgoApg2AAIgGAAg");
	this.shape_42.setTransform(-33.5765,2.8589,0.2148,0.2148);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#BC433E").s().p("AgECYQg7gDgnguQgoguADg+QACg/ArgrQArgqA4ACQA7ACAoAuQAnAugDA+QgCBAgrAqQgoApg2AAIgFAAg");
	this.shape_43.setTransform(-34.4892,8.217,0.2148,0.2148);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#BC433E").s().p("AgFCYQg6gCgogvQgnguACg+QADg/AqgrQArgqA6ACQA6ACAnAuQAoAvgCA+QgDA/grArQgoAog2AAIgGAAg");
	this.shape_44.setTransform(-31.1128,12.163,0.2148,0.2148);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#BC433E").s().p("AgFCYQg6gDgnguQgoguACg+QADg/AqgrQAsgqA5ACQA6ACAoAuQAnAugCA+QgDBAgqAqQgpApg3AAIgFAAg");
	this.shape_45.setTransform(-26.3608,12.8986,0.2148,0.2148);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#BC433E").s().p("AgFCYQg6gCgogvQgnguACg+QADg/AqgrQAsgqA5ACQA6ACAnAuQAoAvgCA+QgDA/gqAqQgqApg2AAIgFAAg");
	this.shape_46.setTransform(-22.2268,9.9828,0.2148,0.2148);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#BC433E").s().p("AgFCYQg6gCgogvQgnguACg+QACg/ArgrQArgqA5ACQA7ACAnAuQAoAvgDA+QgBA/gsAqQgpApg2AAIgFAAg");
	this.shape_47.setTransform(-19.3491,4.8395,0.2148,0.2148);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#BC433E").s().p("AgFCYQg6gDgngtQgogvACg+QADg/ArgqQAqgsA6ADQA6ACAnAvQAoAtgCA/QgDA+grArQgoApg2AAIgGAAg");
	this.shape_48.setTransform(-19.7835,-0.481,0.2148,0.2148);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#BC433E").s().p("AgECLQg1gCgkgqQglgrADg4QACg6AngnQAngnA0ACQA2ACAkAqQAkArgCA4QgCA6goAnQglAlgxAAIgFAAg");
	this.shape_49.setTransform(-22.3026,-0.6523,0.2148,0.2148);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#BC433E").s().p("AgECLQg1gCgkgqQglgrADg4QACg6AngnQAngnA0ACQA2ACAkAqQAkArgCA4QgCA6goAnQglAlgyAAIgEAAg");
	this.shape_50.setTransform(-27.2204,0.6888,0.2148,0.2148);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#BC433E").s().p("AgECLQg1gCgkgqQglgrADg4QACg6AngnQAngnA0ACQA1ACAlArQAkAqgCA4QgCA6goAnQglAlgyAAIgEAAg");
	this.shape_51.setTransform(-30.1625,4.5871,0.2148,0.2148);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#BC433E").s().p("AgECLQg2gCgjgrQgkgqACg4QABg6AognQAngnA1ACQA1ACAkAqQAjArgCA4QgCA6gnAnQglAlgxAAIgFAAg");
	this.shape_52.setTransform(-30.9994,9.484,0.2148,0.2148);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#BC433E").s().p("AgECLQg1gCglgqQgkgrACg4QACg6AognQAngnA0ACQA1ACAkArQAlAqgDA4QgCA6gnAnQglAlgyAAIgEAAg");
	this.shape_53.setTransform(-27.9172,13.0913,0.2148,0.2148);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#BC433E").s().p("AgECLQg2gCgkgqQgkgrACg4QACg6AognQAngnA0ACQA1ACAkAqQAlArgCA4QgCA6goAnQglAlgxAAIgFAAg");
	this.shape_54.setTransform(-23.569,13.7624,0.2148,0.2148);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#BC433E").s().p("AgECLQg1gCgkgqQglgrADg4QACg6AngnQAngnA0ACQA2ACAkAqQAkArgCA4QgCA6goAnQglAlgxAAIgFAAg");
	this.shape_55.setTransform(-19.79,11.0995,0.2148,0.2148);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#BC433E").s().p("AgECLQg1gCgkgqQglgrADg4QACg6AngnQAngnA0ACQA1ACAlAqQAkArgCA4QgCA6goAnQglAlgxAAIgFAAg");
	this.shape_56.setTransform(-17.1593,6.3964,0.2148,0.2148);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#BC433E").s().p("AgECLQg1gCglgqQgkgrACg4QACg6AognQAngnA0ACQA1ACAkAqQAlArgCA4QgCA6goAnQglAlgxAAIgFAAg");
	this.shape_57.setTransform(-17.556,1.5323,0.2148,0.2148);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#E4BA41").s().p("AgKAjQhggyAQgqQAIgXAkAEQAhAEAkAYQAoAaASAfQAVAlgPAgQgzgSgugZg");
	this.shape_58.setTransform(41.99,0.7092,0.2147,0.2147);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#E4BA41").s().p("AgZAvQgngQgXgYQgZgZAIgWQAOgnBjAwQAzAZAvAfQgRAdgoAEIgOABQgdAAgggMg");
	this.shape_59.setTransform(40.6065,3.7962,0.2147,0.2147);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#E4BA41").s().p("AgXBYQgSgcgEgtQgEgtAOgjQAQgnAhgIIAbBoQATBqgqANIgJACQgSAAgOgZg");
	this.shape_60.setTransform(45.8163,11.7044,0.2147,0.2147);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#E4BA41").s().p("AglAHIgQhuQAigFAbAdQAZAZAMAqQANAngFAhQgFAkgXAHIgIACQghAAgVhig");
	this.shape_61.setTransform(49.4039,11.0686,0.2147,0.2147);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#E4BA41").s().p("AgzA5QgqgFgQggIBdg0QBhgtAYAlQAOAVgZAZQgXAYgqAPQghANgfAAIgQgBg");
	this.shape_62.setTransform(53.3805,2.8241,0.2147,0.2147);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#E4BA41").s().p("AhSAHQASgdAmgXQAigWAhgEQAkgFANAUQAXAjhjAyIhnAsQgNgfAUgjg");
	this.shape_63.setTransform(51.9622,-0.2437,0.2147,0.2147);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FCEEC1").s().p("AjSKHQkMhXiAj7QiAj8BYkLQBXkMD7iAQD7iAEMBXQEMBXCAD8QCAD7hYELQhXEMj7CBQiVBMicAAQhpAAhtgkg");
	this.shape_64.setTransform(48.1099,5.6107,0.2148,0.2148);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#F7D88B").s().p("AjoLNQiMguhxhfQh0hhhGiJQhFiJgLiXQgKiSAtiMQAuiNBfhwQBih0CIhGQEWiNEoBgQCNAuBwBfQB0BhBGCJQBFCJALCXQAKCSgtCMQguCMhfBxQhiB0iIBGQimBUisAAQh0AAh4gng");
	this.shape_65.setTransform(48.1099,5.6072,0.2148,0.2148);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#E4BA41").s().p("AjfLSQiQg3h1hlQh3hphGiJQhGiIgKiYQgLiSAuiMQAuiMBehxQBih0CJhFQEWiOEoBhQCMAtBwBfQB1BiBFCIQBGCJAOCfQAOCZgpCUQgqCXhaB2QhgB8iHBFQiIBFicAEIgVAAQiJAAiIgzg");
	this.shape_66.setTransform(48.8333,7.2946,0.2148,0.2148);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#E4BA41").s().p("AhgA5QgRgTAUgeQASgaAngXQAogXAlgCQArgCAVAcIhTBDQg6ApghAAQgRAAgKgLg");
	this.shape_67.setTransform(-67.539,7.8099,0.2147,0.2147);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#E4BA41").s().p("AhOBKQgdgeBZhCIBeg+QATAdgPAlQgMAgghAeQgfAcgfAJQgNAEgLAAQgRAAgKgLg");
	this.shape_68.setTransform(-65.6196,10.4853,0.2147,0.2147);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#E4BA41").s().p("AgMAxQgrgSgZgcQgcgfAJgiIBoAXQBoAggHAqQgEAZgkADIgKAAQgeAAgigOg");
	this.shape_69.setTransform(-55.9694,9.3902,0.2147,0.2147);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#E4BA41").s().p("AgDAlIhrgkQAMgfAmgMQAhgLArAIQApAHAcATQAdAUgEAYQgDAYgnAAQgbAAgsgMg");
	this.shape_70.setTransform(-55.1789,5.9234,0.2147,0.2147);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#E4BA41").s().p("AgtADQAEhrArgFQAZgCAMAhQALAggGAsQgFAugVAfQgXAjgjAAQgHg1ACg2g");
	this.shape_71.setTransform(-60.3757,-1.4124,0.2147,0.2147);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#E4BA41").s().p("AgTBKQgTgegEgsQgDgpALgfQANgiAWgDQAqgEAABvQAAA3gIA5QgigDgUghg");
	this.shape_72.setTransform(-64.1892,-1.4124,0.2147,0.2147);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FCEEC1").s().p("AngHhQjIjHAAkaQAAkZDIjHQDHjIEZAAQEaAADHDIQDIDHAAEZQAAEajIDHQjHDIkaAAQkZAAjHjIg");
	this.shape_73.setTransform(-60.4903,4.614,0.2148,0.2148);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#F7D88B").s().p("AkkK3QiIg6hohoQhohog6iIQg7iMAAiZQAAiYA7iMQA6iIBohoQBohoCIg6QCMg7CYAAQCZAACMA7QCIA6BoBoQBoBoA6CIQA7CMAACYQAACZg7CMQg6CIhoBoQhoBoiIA6QiMA7iZAAQiYAAiMg7g");
	this.shape_74.setTransform(-60.4903,4.614,0.2148,0.2148);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#E4BA41").s().p("Ak+K3QiHg6hohoQhphog5iIQg7iMAAiZQAAiYA7iMQA5iIBphoQBohoCHg6QCMg7CZAAQCZAACUA7QCPA6ByBoQBzBpBACHQBDCNAACXQAACYhDCNQhACHhzBpQhyBoiPA6QiUA7iZAAQiZAAiMg7g");
	this.shape_75.setTransform(-58.4716,4.614,0.2148,0.2148);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#20466F").s().p("Ai5B8Qg3gxAthVQBZCEB1hFQBHgpCHioQgECIhTBVQhHBJhjAQQgYADgUAAQg/AAgmghg");
	this.shape_76.setTransform(-5.7795,9.4573,0.2148,0.2148);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#19375A").s().p("Ai7FiQiThOgxifQgwieBOiSQBOiTCfgwQCdgxCTBOQCTBOAwCfQAxCehOCSQhOCTifAwQg9ATg7AAQheAAhagwg");
	this.shape_77.setTransform(-4.3916,12.2063,0.2148,0.2148);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#20466F").s().p("AgQCcQhigcg8hRQg6hMAQhBQARhHBhgBQhMCNB0BHQBHAsDTAmQhPAnhMAAQgpAAgogLg");
	this.shape_78.setTransform(66.3285,-4.4555,0.2148,0.2148);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#19375A").s().p("AkaEbQh2h1AAimQAAilB2h1QB1h2ClAAQCmAAB2B2QB1B1AAClQAACmh1B1Qh2B2imAAQilAAh1h2g");
	this.shape_79.setTransform(64.1143,-1.6997,0.2148,0.2148);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#50531B").s().p("ABGBBQgYgBgogSQhsgvAWguQAUgqBGA/QAjAfAfAoQATAUgXAAIgCAAg");
	this.shape_80.setTransform(-69.8046,-13.7017,0.2148,0.2148);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#50531B").s().p("AgIAbIhDhHQgTgVAZABQAYABAoASQBsAvgWAuQgIARgQAAQgYAAgpgmg");
	this.shape_81.setTransform(-57.3931,-3.6244,0.2148,0.2148);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#50531B").s().p("AgxAlQgjgKgCgcQgDg1BRAUQAoAJAqAVQAXAIgTAOQgTANgmAHQgTADgQAAQgTAAgQgEg");
	this.shape_82.setTransform(-70.4473,-9.9431,0.2148,0.2148);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#50531B").s().p("AAJAkIhSgfQgXgIATgOQATgNAmgHQApgHAdAIQAjAKACAcQADAngsAAQgPAAgWgFg");
	this.shape_83.setTransform(-56.7499,-7.3802,0.2148,0.2148);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#50531B").s().p("Ag/AoQgagxBGgdQAigOApgFQAWgFgJAaQgIAXgaAcQgcAggZAJQgJADgIAAQgSAAgKgTg");
	this.shape_84.setTransform(-69.302,-5.5936,0.2148,0.2148);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#50531B").s().p("AhEAlQAIgXAagcQAcggAZgJQAfgLAOAbQAbAxhHAdQgVAJgdAGIgZAEIgGABQgOAAAHgWg");
	this.shape_85.setTransform(-57.8932,-11.7326,0.2148,0.2148);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#50531B").s().p("AgXBTQgqghAphFIAwg/QAOgSAFAeQAEAcgGArQgIAvgPAYQgLASgNAAQgIAAgJgHg");
	this.shape_86.setTransform(-66.7327,-2.38,0.2148,0.2148);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#50531B").s().p("AgqBHQgEgcAHgrQAHgvAPgYQASgdAXASQAqAhgpBFQgUAjgcAcQgFAHgFAAQgGAAgDgTg");
	this.shape_87.setTransform(-60.4642,-14.9461,0.2148,0.2148);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#50531B").s().p("AAKBmQgtgIgBhcIAJhaQADgaARAbQAPAZAOAuQAPAygBAhQAAAjgWAAIgEAAg");
	this.shape_88.setTransform(-63.0935,-0.8354,0.2148,0.2148);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#50531B").s().p("AAIBYQgPgZgOguQgPgyABggQABgnAZAEQAtAHABBcQAAAtgJAtQgCANgFAAQgFAAgIgOg");
	this.shape_89.setTransform(-64.1041,-16.4854,0.2148,0.2148);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#50531B").s().p("AgbATIgihdQgJgbAYAQQAXAPAfAlQBUBjgpAWQgHAEgHAAQgfAAghhJg");
	this.shape_90.setTransform(-59.6717,-1.3271,0.2148,0.2148);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#50531B").s().p("AAvBWQgXgPgfglQhUhjApgWQAmgVApBaQAUAsANAxQAGARgIAAQgEAAgJgGg");
	this.shape_91.setTransform(-67.5315,-15.9906,0.2148,0.2148);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FBFF89").s().p("Ag0E4Qh3g3hFiBQhEiBAWiBQAWiABjg2QBkg1B2A3QB3A2BFCBQBFCBgWCBQgWCBhkA1QgyAag2AAQg3AAg7gbg");
	this.shape_92.setTransform(-63.4488,-8.0229,0.2148,0.2148);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#B6CA42").s().p("AhvKPQj7hyiRkRQiRkQAvkQQAWiABAhjQBDhmBng2QBog3B5ACQB2ABB2A2QD7ByCRERQCREQgvEQQguEQjSBwQhoA3hyAAQh1AAh+g6g");
	this.shape_93.setTransform(-63.4539,-7.9967,0.2148,0.2148);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#A5B63C").s().p("ACTNNQiLgBiMhAQiNhBh4hzQh9h5hUifQhVifgeiqQgcilAaiYQAaiZBMh1QBQh5B6hBQB7hACRABQCLACCMBBQCNA/B4B1QB9B4BUCfQCsFDg3FDQgZCYhNB2QhQB5h6BAQh3BAiMAAIgJgBg");
	this.shape_94.setTransform(-64.5499,-6.9128,0.2148,0.2148);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#50531B").s().p("ABGBBQgYgBgogSQgrgTgZgYQgdgbALgXQATgqBGA/QAkAfAfAoQASAUgWAAIgCAAg");
	this.shape_95.setTransform(48.4978,-10.969,0.2148,0.2148);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#50531B").s().p("AgIAbIhDhHQgTgVAZABQAYABAoASQBsAvgWAuQgIARgQAAQgYAAgpgmg");
	this.shape_96.setTransform(60.8924,-0.897,0.2148,0.2148);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#50531B").s().p("AgxAkQgigJgCgdQgEg1BSAUQAnAKAqAVQAXAIgTAOQgTANgmAHQgTADgPAAQgUAAgQgFg");
	this.shape_97.setTransform(47.8436,-7.2115,0.2148,0.2148);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#50531B").s().p("AAJAkIhSgfQgXgIATgOQATgNAmgHQAogHAdAIQAjAKACAcQADAngrAAQgPAAgWgFg");
	this.shape_98.setTransform(61.541,-4.6528,0.2148,0.2148);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#50531B").s().p("Ag/AnQgagwBGgdQAigPApgEQAWgFgJAZQgIAYgaAcQgcAfgZAKQgJADgIAAQgSAAgKgUg");
	this.shape_99.setTransform(48.9943,-2.8613,0.2148,0.2148);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#50531B").s().p("AhEAlQAIgXAagcQAcggAZgJQAfgLAOAbQAbAxhHAdQgVAJgdAGIgZAEIgGABQgOAAAHgWg");
	this.shape_100.setTransform(60.3923,-9.0052,0.2148,0.2148);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#50531B").s().p("AgXBTQgpghAohFQAVgjAbgcQAPgSAEAeQAFAcgHArQgIAvgPAYQgMASgMAAQgIAAgJgHg");
	this.shape_101.setTransform(51.5594,0.3527,0.2148,0.2148);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#50531B").s().p("AgqBHQgFgcAHgrQAIguAPgZQARgdAXASQAqAhgoBFQgNAWgSAXIgRASQgGAHgEAAQgGAAgDgTg");
	this.shape_102.setTransform(57.8234,-12.2188,0.2148,0.2148);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#50531B").s().p("AAKBlQgtgHgBhcIAJhaQADgaARAbQAPAZAOAuQAPAygBAgQAAAkgVAAIgFgBg");
	this.shape_103.setTransform(55.2023,1.8973,0.2148,0.2148);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#50531B").s().p("AAIBYQgPgZgOguQgPgyABggQABgnAZAEQAuAHAABcQAAAtgJAtQgCANgFAAQgFAAgIgOg");
	this.shape_104.setTransform(54.1818,-13.758,0.2148,0.2148);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#50531B").s().p("AgbATIgihdQgJgbAYAQQAXAPAfAlQBUBjgpAWQgHAEgIAAQgfAAgghJg");
	this.shape_105.setTransform(58.6243,1.4051,0.2148,0.2148);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#50531B").s().p("AAvBWQgXgPgfglQhUhjApgWQAmgVAoBaQAVAsANAxQAGARgIAAQgEAAgJgGg");
	this.shape_106.setTransform(50.7619,-13.2633,0.2148,0.2148);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FBFF89").s().p("Ag0E4Qh3g3hFiBQhEiBAViAQAXiCBjg1QBkg0B2A2QB3A2BFCBQBECBgWCBQgVCAhkA2QgxAag2AAQg4AAg7gbg");
	this.shape_107.setTransform(54.837,-5.2915,0.2148,0.2148);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#B6CA42").s().p("AB9LIQh2gBh2g3Qj7hxiRkSQiRkPAvkQQAWiBBAhiQBDhmBng3QBng3B6ACQB2ACB1A1QD8BzCQEQQCREQguERQguEPjSBwQhkA1h1AAIgIAAg");
	this.shape_108.setTransform(54.8401,-5.2915,0.2148,0.2148);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#A5B63C").s().p("ACUNNQiMgBiMhBQiNg/h4h1Qh9h4hUifQislEA3lCQAaiZBMh1QBQh5B6hBQB7hACRABQCLADCMBAQCNBAB5B0QB8B4BVCfQCsFDg3FEQgaCYhNB1QhPB5h7BAQh2BAiMAAIgJgBg");
	this.shape_109.setTransform(53.733,-4.1855,0.2148,0.2148);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#E9CAB7").s().p("AkLC4QgWggA/hNQBAhLBvhMQBuhLBeggQBegfAVAfQAWAgg/BMQhABLhvBMQhuBNheAfQguAPgdAAQgdAAgLgPg");
	this.shape_110.setTransform(45.3921,-17.4737,0.2148,0.2148);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#F8E7DC").s().p("Aj5C9QglgMgDgbQgEgbAdghIGhkdQBNALAkAoQAiAngNA1QgOA1g8AzQhCA3hpAmQhnAlhOALQgeADgXAAQgiAAgXgHg");
	this.shape_111.setTransform(48.321,-15.0116);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#B2312C").s().p("ArwG4QjCgeiRhRQiGhLhMhsQDhCyGPAJQHQAKJSjjQEYhrDwiWQDhiOCwitQiRDrj3C+QkKDMlbB7QnDChlwAAQh4AAhugRg");
	this.shape_112.setTransform(49.3277,1.6738,0.2148,0.2148);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#BC433E").s().p("AppQxQlVgKjciPQjHiBgoi/Qgmi9CGiaIea0yQG6AlDTD5QDCDmg7FPQg8FOkkEtQk8FGnrCvQnCCgl0AAIgxgBg");
	this.shape_113.setTransform(50.2495,-11.5867,0.2148,0.2148);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#F3AF5B").s().p("AguAIQAFi5AigMQAggNAPClQAHBRABBVIhcA+QgEhaAChdg");
	this.shape_114.setTransform(31.059,-7.3303,0.2148,0.2148);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#F3AF5B").s().p("AikB5QgWgRCmhzQBRg5BYg2IASBTQhKAuhOAsQiBBIgmAAQgIAAgEgCg");
	this.shape_115.setTransform(15.8843,17.289,0.2148,0.2148);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#F3AF5B").s().p("AmyJvQgcgSDvh1QB3g6B8g3QiIgciHglQkOhJAJgpQADgLEFATQCDAKCBAMQhqh0hmh5QjNj2AXgkQAXgkDwCuQB3BWBzBdQgqh6gmh+QhLj8AUgRQATgRCMC3QBGBbBCBfQAJh1AOh3QAejvAhgKQAhgLA8DNQAfBmAYBoQiKBOiBCDQj/EFAxENQhrAjhxAfQivAxg5AAQgQAAgGgFg");
	this.shape_116.setTransform(18.2666,1.8921,0.2148,0.2148);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#E97933").s().p("AoYK7QlUkfAJlfQAHkvEBkYQDtkDFJh2QFRh6DrBqQEoCFAhCLQAcBxiVCAQhXBLjqCIQjYB+g1A4QhABBACD+QAABGAFCUQADCCgIBNQgVDYh3AOIgSABQiZAAk8kLg");
	this.shape_117.setTransform(19.0334,5.1454,0.2148,0.2148);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#BC433E").s().p("AgHDIQhMgCg1g+Qg0g8AEhTQADhTA4g4QA5g5BMAEQBMACA0A+QA0A8gCBTQgDBTg5A4Qg2A2hIAAIgHgBg");
	this.shape_118.setTransform(35.7992,-36.1621,0.2148,0.2148);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#BC433E").s().p("AgHDJQhNgDgzg9Qg0g9AChSQAEhUA4g4QA5g5BMADQBMADA0A9QA1A9gDBTQgDBTg5A4Qg2A2hIAAIgHAAg");
	this.shape_119.setTransform(28.7017,-34.2347,0.2148,0.2148);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#BC433E").s().p("AgGDIQhNgCg0g+Qg1g8ADhTQAEhTA4g4QA5g4BLADQBNACA1A+QA0A8gDBTQgEBTg4A4Qg2A2hIAAIgGgBg");
	this.shape_120.setTransform(24.455,-28.6028,0.2148,0.2148);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#BC433E").s().p("AgGDJQhOgDgzg9Qg0g9AChSQAEhUA5g4QA3g5BNADQBMADA1A9QA0A9gEBTQgDBTg4A4Qg2A2hIAAIgGAAg");
	this.shape_121.setTransform(23.247,-21.5321,0.2148,0.2148);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#BC433E").s().p("AgHDJQhMgEg1g9Qg0g8AEhTQADhTA4g4QA4g5BMADQBOADAzA9QA0A9gCBTQgDBTg5A4Qg2A2hIAAIgHAAg");
	this.shape_122.setTransform(27.7031,-16.3244,0.2148,0.2148);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#BC433E").s().p("AgGDJQhOgDgzg9Qg0g9AChSQADhUA5g4QA4g5BNAEQBMADA1A9QA0A9gEBSQgDBTg4A4Qg2A2hIAAIgGAAg");
	this.shape_123.setTransform(33.9738,-15.3532,0.2148,0.2148);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#BC433E").s().p("AgHDJQhNgEgzg9Qg1g8ADhTQAEhTA4g4QA5g5BMADQBMADA0A9QA1A9gDBTQgDBTg5A4Qg2A2hIAAIgHAAg");
	this.shape_124.setTransform(39.4285,-19.202,0.2148,0.2148);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#BC433E").s().p("AgGDIQhOgDg0g9Qgzg9ADhSQAChTA5g4QA5g5BLADQBNADA1A9QAzA9gDBTQgDBTg4A4Qg1A2hIAAIgHgBg");
	this.shape_125.setTransform(43.2297,-25.993,0.2148,0.2148);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#BC433E").s().p("AgHDJQhMgEg1g8Qg0g+AEhRQAChTA5g5QA4g4BMACQBNAEA0A9QA0A8gCBTQgDBSg5A5Qg2A2hIAAIgHAAg");
	this.shape_126.setTransform(42.6606,-33.016,0.2148,0.2148);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#861F31").s().p("AlDFEQhrh+ATi3QASi2CHiHQCGiGCqgGQCrgHBrB+QBrB9gTC4QgTC3iGCGQiGCHiqAFIgPABQigAAhnh4g");
	this.shape_127.setTransform(33.4101,-26.8633,0.2148,0.2148);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#BC433E").s().p("AgGDJQhOgEgzg9Qg0g8AChTQADhSA5g5QA4g4BNACQBMAEA1A8QA0A9gEBSQgDBTg4A5Qg2A2hIAAIgGAAg");
	this.shape_128.setTransform(38.9024,-33.3918,0.2148,0.2148);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#BC433E").s().p("AgGDJQhOgDg0g9Qg0g9AEhSQAChUA5g4QA5g5BLADQBOADA0A9QA0A9gEBTQgDBTg5A4Qg1A2hIAAIgGAAg");
	this.shape_129.setTransform(31.8048,-31.4644,0.2148,0.2148);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#BC433E").s().p("AgGDJQhOgEg0g8Qg0g+AEhRQADhUA4g4QA5g5BLADQBOAEA0A8QA0A9gEBSQgDBTg4A5Qg2A2hIAAIgGAAg");
	this.shape_130.setTransform(27.5527,-25.8325,0.2148,0.2148);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#BC433E").s().p("AgHDJQhMgDg1g9Qg0g9AEhSQADhUA4g4QA4g5BMADQBOADAzA9QA0A9gCBTQgDBTg5A4Qg2A2hIAAIgHAAg");
	this.shape_131.setTransform(26.3501,-18.7618,0.2148,0.2148);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#BC433E").s().p("AgGDJQhNgDg0g9Qg1g9ADhSQAEhUA4g4QA4g5BMADQBNADA1A9QA0A9gDBTQgEBTg4A4Qg1A2hJAAIgGAAg");
	this.shape_132.setTransform(30.8009,-13.554,0.2148,0.2148);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#BC433E").s().p("AgHDJQhMgDg1g9Qg0g9AEhSQADhUA4g4QA4g5BMAEQBOADAzA9QA0A9gCBSQgEBTg5A4Qg1A2hIAAIgHAAg");
	this.shape_133.setTransform(37.077,-12.5829,0.2148,0.2148);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#BC433E").s().p("AgGDJQhOgDg0g9Qg0g9AEhSQADhUA4g4QA5g5BLADQBOADA0A9QA0A9gEBTQgDBTg4A4Qg2A2hIAAIgGAAg");
	this.shape_134.setTransform(42.5317,-16.4317,0.2148,0.2148);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#BC433E").s().p("AgGDIQhOgDg0g9Qgzg9AChSQADhTA5g4QA5g5BLADQBNADA1A9QAzA9gDBTQgDBTg4A4Qg1A2hIAAIgHgBg");
	this.shape_135.setTransform(46.3221,-23.2227,0.2148,0.2148);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#BC433E").s().p("AgHDIQhMgCg1g+Qg0g8AEhTQAChTA5g4QA4g4BMADQBNACA0A+QA0A8gCBTQgEBTg4A4Qg2A2hIAAIgHgBg");
	this.shape_136.setTransform(45.753,-30.2457,0.2148,0.2148);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#BC433E").s().p("AgGC3QhGgDgwg3Qgvg4AChLQADhMA0gzQA0g1BFAEQBGACAwA4QAvA4gCBLQgDBMg0A0QgwAxhCAAIgHgBg");
	this.shape_137.setTransform(42.4297,-30.4604,0.2148,0.2148);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#BC433E").s().p("AgGC3QhGgCgwg4Qgwg4AEhLQAChMA0g0QAzgzBGADQBGADAvA3QAxA4gEBLQgCBMg0A0QgxAxhCAAIgGgBg");
	this.shape_138.setTransform(35.9388,-28.6994,0.2148,0.2148);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#BC433E").s().p("AgGC3QhGgCgwg4Qgvg4AChLQADhMA0g0QA0gzBFACQBGADAwA4QAvA4gDBLQgCBMg0AzQgxAyhBAAIgHgBg");
	this.shape_139.setTransform(32.0524,-23.5556,0.2148,0.2148);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#BC433E").s().p("AgGC3QhGgCgwg4Qgvg4ADhLQAChMA0g0QA0gzBFACQBGADAwA4QAvA4gCBLQgDBMg0AzQgxAyhBAAIgHgBg");
	this.shape_140.setTransform(30.956,-17.0916,0.2148,0.2148);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#BC433E").s().p("AgGC3QhHgCgvg4Qgwg4ADhLQAEhMAzg0QA0gzBFADQBGACAwA4QAwA4gDBLQgDBMg0A0QgxAwhBAAIgHAAg");
	this.shape_141.setTransform(35.0261,-12.33,0.2148,0.2148);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#BC433E").s().p("AgGC3QhHgDgvg3Qgvg4ADhLQADhLAzg0QAzg0BGACQBGAEAwA3QAvA4gCBLQgDBMg0A0QgxAxhCAAIgGgBg");
	this.shape_142.setTransform(40.76,-11.4441,0.2148,0.2148);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#BC433E").s().p("AgGC3QhGgCgwg4Qgvg4AChLQADhMA0g0QA0gzBFADQBGACAwA4QAvA4gDBLQgCBMg0A0QgxAwhBAAIgHAAg");
	this.shape_143.setTransform(45.7428,-14.9607,0.2148,0.2148);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#BC433E").s().p("AgGC3QhGgDgwg3Qgvg4AChLQADhMA0g0QA0g0BFAEQBGACAwA4QAvA4gDBLQgCBMg0AzQgxAyhBAAIgHgBg");
	this.shape_144.setTransform(49.2111,-21.1616,0.2148,0.2148);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#BC433E").s().p("AgGC3QhGgCgwg4Qgwg4AEhLQAChLA0g0QA0g1BEADQBHADAvA4QAxA4gEBLQgCBMg0A0QgxAxhBAAIgHgBg");
	this.shape_145.setTransform(48.6951,-27.5827,0.2148,0.2148);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#E4BA41").s().p("AgKAjQhfgyAPgqQAIgXAkAEQAhAEAlAZQAnAZASAfQAWAlgQAgQgygSgvgZg");
	this.shape_146.setTransform(5.7912,-19.5045,0.2147,0.2147);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#E4BA41").s().p("AgZAtQgngPgXgYQgZgZAIgXQAOgnBjAxQAzAYAvAfQgVAlgtAAQgdAAglgPg");
	this.shape_147.setTransform(4.4019,-16.3979,0.2147,0.2147);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#E4BA41").s().p("AgXBYQgSgcgEgtQgEgtAOgjQAQgnAhgIIAbBoQATBqgqANQgFACgFAAQgRAAgOgZg");
	this.shape_148.setTransform(9.6117,-8.5114,0.2147,0.2147);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#E4BA41").s().p("AglAIIgQhvQAigFAbAdQAZAZAMAqQANAngFAhQgFAkgXAIIgIABQghAAgVhhg");
	this.shape_149.setTransform(13.1993,-9.1435,0.2147,0.2147);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#E4BA41").s().p("AgzA5QgqgFgQggIBdgzQBhguAYAlQAOAVgZAZQgXAYgqAPQghANgeAAIgRgBg");
	this.shape_150.setTransform(17.1759,-17.3897,0.2147,0.2147);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#E4BA41").s().p("AhSAHQASgdAmgXQAigXAhgEQAkgEANAUQAXAihjAzIhnAsQgNgfAUgjg");
	this.shape_151.setTransform(15.7575,-20.4558,0.2147,0.2147);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FCEEC1").s().p("AjSKHQkMhXiAj7QiAj7BYkMQBXkMD7iAQD8iAELBYQEMBXCAD7QCAD8hYELQhXEMj7CAQiVBMicAAQhpAAhtgkg");
	this.shape_152.setTransform(11.9027,-14.6063,0.2148,0.2148);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#F7D88B").s().p("AjoLOQiMguhxhfQh0hihGiIQhFiJgLiYQgKiRAtiMQAuiNBfhwQBih0CIhGQEXiNEnBgQCNAuBwBfQB0BiBGCIQBFCJALCYQAKCRgtCMQguCNhfBwQhiB0iIBGQiJBFiYALQgbACgaAAQh2AAhyglg");
	this.shape_153.setTransform(11.9027,-14.6295,0.2148,0.2148);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#E4BA41").s().p("AjfLSQiRg2h0hmQh4hphGiJQhFiIgLiYQgKiRAtiNQAuiMBfhwQBih1CIhFQEXiOEnBhQCNAuBwBeQB0BiBGCJQBGCJAOCeQAOCZgpCVQgqCWhbB2QhfB8iIBFQiHBFidAEIgUAAQiJAAiIgzg");
	this.shape_154.setTransform(12.6285,-12.9243,0.2148,0.2148);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#50531B").s().p("AhLAtIBDhHQBGg/ATAqQAWAuhsAvQgoASgYABIgCAAQgXAAATgUg");
	this.shape_155.setTransform(1.1269,-22.9253,0.2148,0.2148);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#50531B").s().p("AhQAwQgLgXAdgbQAZgXArgUQAogRAYgCQAZgBgTAVQgfAogkAfQgpAmgYAAQgRAAgHgRg");
	this.shape_156.setTransform(-11.2677,-12.8534,0.2148,0.2148);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#50531B").s().p("AgUAmQgmgHgTgNQgTgOAXgIIBSgfQBRgTgEA1QgCAcgiAKQgQAEgTAAQgPAAgUgDg");
	this.shape_157.setTransform(1.7754,-19.1696,0.2148,0.2148);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#50531B").s().p("AhVADQACgdAjgJQAdgJAoAHQAmAHATANQAUAOgYAIQgqAVgnAKQgXAFgQAAQgqAAADgmg");
	this.shape_158.setTransform(-11.9193,-16.6108,0.2148,0.2148);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#50531B").s().p("AATA4QgZgJgcggQgagcgIgXQgJgaAWAFIAZAEQAdAGAVAJQBHAdgbAxQgKATgSAAQgIAAgJgDg");
	this.shape_159.setTransform(0.6268,-14.8172,0.2148,0.2148);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#50531B").s().p("AA4A6QgpgFgigOQhGgdAagxQAOgbAfALQAZAJAcAgQAaAcAIAXQAHAWgOAAIgGgBg");
	this.shape_160.setTransform(-10.7713,-20.9562,0.2148,0.2148);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#50531B").s().p("AgRBIQgPgZgIgvQgHgqAFgcQAEgeAPASIAwA/QAoBFgpAhQgJAHgIAAQgMAAgMgSg");
	this.shape_161.setTransform(-1.9409,-11.6036,0.2148,0.2148);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#50531B").s().p("AAYBTQgbgcgVgjQgohFAqghQAWgSASAdQAPAYAIAvQAHArgFAcQgDATgGAAQgEAAgGgHg");
	this.shape_162.setTransform(-8.2048,-24.1697,0.2148,0.2148);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#50531B").s().p("AgjBCQgBggAPgyQAOguAPgZQARgbADAaIAJBaQAABcguAHIgFABQgVAAAAgkg");
	this.shape_163.setTransform(-5.5837,-10.0644,0.2148,0.2148);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#50531B").s().p("AgbBZQgJgtAAgtQABhcAtgHQAZgEABAnQABAhgPAxQgOAvgPAYQgIAOgFAAQgFAAgCgNg");
	this.shape_164.setTransform(-4.5633,-25.7197,0.2148,0.2148);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#50531B").s().p("AgyBYQgpgVBUhkQAfglAXgPQAYgQgJAbIgiBdQggBJggAAQgHAAgHgEg");
	this.shape_165.setTransform(-9.0036,-10.5566,0.2148,0.2148);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#50531B").s().p("Ag9BLQANgxAVgsQAohaAmAVQApAWhUBjQgfAlgXAPQgJAGgEAAQgIAAAGgRg");
	this.shape_166.setTransform(-1.1412,-25.2249,0.2148,0.2148);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FBFF89").s().p("AilE5Qhjg1gXiBQgWiBBFiBQBFiBB3g3QB2g2BkA1QBkA1AWCBQAVCBhECBQhFCBh3A2Qg8Acg3AAQg2AAgxgag");
	this.shape_167.setTransform(-5.2184,-17.2491,0.2148,0.2148);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#B6CA42").s().p("AldKSQhng3hDhmQhBhigViBQgvkQCSkQQCQkRD8hyQB1g2B2gBQB5gCBoA3QBnA3BDBmQBABiAWCAQAvEQiSEQQiQERj8ByQh9A6h1AAQhyAAhog3g");
	this.shape_168.setTransform(-5.2184,-17.2307,0.2148,0.2148);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#A5B63C").s().p("AmfMOQh6hAhPh5QhNh1gaiYQg3lECslDQBVifB8h4QB5h1CMg/QCNhBCLgBQCRgDB6BCQB7BABQB5QBMB1AaCZQA3FDisFDQhVCfh8B4Qh4B1iNBAQiMBAiMABIgJABQiMAAh3hAg");
	this.shape_169.setTransform(-4.1125,-16.1472,0.2148,0.2148);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#E4BA41").s().p("AgKAjQhggyAPgqQAJgXAkAEQAhAEAkAYQAoAaASAfQAVAlgPAgQgzgSgugZg");
	this.shape_170.setTransform(44.7454,-37.0738,0.2147,0.2147);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#E4BA41").s().p("AgZAvQgngQgYgYQgYgZAIgWQAOgnBjAwQAyAZAwAfQgSAdgnAEIgPABQgcAAgggMg");
	this.shape_171.setTransform(43.3602,-33.9868,0.2147,0.2147);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#E4BA41").s().p("AgXBYQgSgcgEgtQgEgtAOgjQAQgnAhgIIAbBoQATBqgqANIgJACQgSAAgOgZg");
	this.shape_172.setTransform(48.5757,-26.0786,0.2147,0.2147);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#E4BA41").s().p("AglAHIgQhuQAigFAbAdQAYAZANAqQAMAngEAhQgFAkgXAHIgIACQghAAgVhig");
	this.shape_173.setTransform(52.1558,-26.7143,0.2147,0.2147);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#E4BA41").s().p("AgzA5QgqgFgQggIBdg0QBhgtAYAlQAOAVgZAZQgXAYgqAPQghANgeAAIgRgBg");
	this.shape_174.setTransform(56.137,-34.9589,0.2147,0.2147);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#E4BA41").s().p("AhRAHQASgdAlgXQAigWAigEQAjgFAOAUQAXAjhkAyIhnAsQgNgfAVgjg");
	this.shape_175.setTransform(54.717,-38.0266,0.2147,0.2147);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FCEEC1").s().p("AjSKHQkMhWiAj8QiAj7BYkLQBXkMD7iBQD8iAELBXQEMBYCAD7QCAD8hYEKQhXEMj7CBQiVBMicAAQhpAAhtgkg");
	this.shape_176.setTransform(50.8695,-32.1784,0.2148,0.2148);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#F7D88B").s().p("AjoLNQiNgthwhfQh0hihGiIQhFiJgLiYQgKiRAtiMQAuiNBfhwQBih0CIhGQEWiNEoBgQCNAuBwBeQB0BiBGCJQBFCIALCYQAKCSgtCMQguCMhfBxQhiB0iIBFQiJBGiYALQgaACgaAAQh2AAhzgmg");
	this.shape_177.setTransform(50.8659,-32.198,0.2148,0.2148);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#E4BA41").s().p("AjfLSQiQg3h1hlQh3hphGiJQhGiIgKiYQgLiSAuiMQAuiMBehxQBih0CJhFQEWiOEoBhQCMAtBwBfQB1BiBFCIQBGCJAOCfQAOCZgpCUQgqCXhbB2QhfB8iIBFQiHBFicAEIgUAAQiKAAiIgzg");
	this.shape_178.setTransform(51.5899,-30.4911,0.2148,0.2148);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#E9CAB7").s().p("ACKBoQhHgHhagjQhbgig5gqQg5grAKgaQAKgaBHAHQBHAGBaAiQBbAkA5ApQA5ArgKAaQgIAVgvAAIgagBg");
	this.shape_179.setTransform(-3.1407,16.5918,0.2148,0.2148);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#EFF5EF").s().p("A45h4QDlo4FBjlQETjEFCA+QEPA1EDDeQDiDCB+DqQCLEAEICmQBbA6CHBBIDTBmQBvA4A/A1QBOBBAjBQQBQC3h/FLg");
	this.shape_180.setTransform(-4.1213,10.5668,0.2148,0.2148);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#A0C456").s().p("A5MAuQEkrbFjk9QEvkPFIAvQETApD3D9QDYDcBtEYQB3EyECC4QBZA/CGBFIDRBqQBtA9A8A7QBLBKAdBhQBBDdijGqg");
	this.shape_181.setTransform(-3.7069,6.9807,0.2148,0.2148);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#20466F").s().p("Ai5B8Qg3gxAthVQBYCEB2hFQBIgqCGioQgECIhTBWQhGBJhkAQQgXAEgVAAQg/AAgmgig");
	this.shape_182.setTransform(8.5149,-34.744,0.2148,0.2148);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#19375A").s().p("Ai7FiQiThOgwifQgxieBOiSQBOiTCfgwQCegxCSBOQCTBOAwCfQAxCehOCSQhOCTifAwQg9ATg6AAQhfAAhagwg");
	this.shape_183.setTransform(9.9055,-31.9905,0.2148,0.2148);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#E9CAB7").s().p("AiTC2QgVgRAchCQAchBA9hLQA8hMA7gpQA6goAWARQAVARgcBCQgcBBg9BLQg8BLg7AqQgoAcgXAAQgKAAgHgFg");
	this.shape_184.setTransform(33.9373,-26.3725,0.2148,0.2148);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#EFF5EF").s().p("A0oJzQhllBCfkfQCHjwEjizQD+ibEGgwQEeg0DwjIQBThEBohsICiiqQBYhXBFgsQBWg3BYgIQDGgTEUDfMggsAodQnVmKh3l5g");
	this.shape_185.setTransform(30.5596,-25.5755,0.2148,0.2148);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#A0C456").s().p("A15H2Qikl1CTknQB8j6E9idQEUiJEsgRQFJgTD+i8QBYhBBqhqICnilQBbhWBLgnQBdgwBlADQDnAGFiEfMggsAodQpdn4jAm0g");
	this.shape_186.setTransform(27.8053,-26.5216,0.2148,0.2148);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#E9CAB7").s().p("ABlCLQhCgbhLg8QhMg7gqg6Qgqg5ARgWQARgWBCAbQBCAbBLA8QBNA7AqA6QAqA6gSAWQgHAKgSAAQgVAAglgQg");
	this.shape_187.setTransform(-48.2038,-18.2367,0.2148,0.2148);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#EFF5EF").s().p("AAnToQjyiDi2khQifj7g0kFQg5kejLjtQhGhRhuhnQh3hsg0gzQhZhXgthFQg4hVgJhXQgWjGDakXMAo8AgFQmDHbl3B8QiCArh8AAQi3AAishcg");
	this.shape_188.setTransform(-47.3852,-14.7463,0.2148,0.2148);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#A0C456").s().p("AiPWGQj7h4iik7QiOkSgVksQgXlIjAj8QhChWhshpQh1hvgzg1QhXhagohLQgxhdABhlQADjmEZlnMAo8AgGQnvJlmxDGQjJBci0AAQiWAAiJhBg");
	this.shape_189.setTransform(-48.3087,-11.9425,0.2148,0.2148);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#20466F").s().p("AgQCcQhigcg8hRQg6hMAQhCQARhHBhgBQhMCNB0BHQBGAsDUAnQhPAohMAAQgpAAgogMg");
	this.shape_190.setTransform(-27.2498,-15.338,0.2148,0.2148);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#19375A").s().p("AkbEbQh1h1AAimQAAilB1h2QB2h1ClAAQCmAAB1B1QB2B2AAClQAACmh2B1Qh1B2imAAQilAAh2h2g");
	this.shape_191.setTransform(-29.464,-12.5823,0.2148,0.2148);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#F3AF5B").s().p("AgVA4Ig7icIBGhXIA4CtQA1CygcAWQgEACgEAAQgcAAg4iEg");
	this.shape_192.setTransform(-39.093,-13.9591,0.2148,0.2148);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#F3AF5B").s().p("AiHBbQA4hEA9hAQB6iEAbAKQAbAJh7CgQg8BQhDBPg");
	this.shape_193.setTransform(-32.3698,-41.9243,0.2148,0.2148);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#F3AF5B").s().p("Ak+IxIh0i0QBsh0BSikQCjlIiCjwIC+iDQDDiAAgAIQAgAJi/C4QhfBdhmBaIEWgWQEYgNADAqQABALj+A+Ij+A8IEPCiQEPCqgLApQgLApkZhbIkWhkICXDVQCWDZgOAWQgNAWi9iDIi7iHIAyDoQAuDsgcAUQgDACgEAAQgiAAhsieg");
	this.shape_194.setTransform(-29.3144,-26.6903,0.2148,0.2148);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#E97933").s().p("AlBPgQlDgjhLh6Qg9hjBmioQA9hjC0jJQCni6AihGQAohRhQjxIhIjOQgrh7gQhLQgvjVBugyQCLg/GVCmQGcCpBkFQQBXEkifFYQiSFAkUDVQj8DDjlAAQgeAAgcgDg");
	this.shape_195.setTransform(-29.3382,-28.4114,0.2148,0.2148);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#E4BA41").s().p("AhgA4QgRgSAUgeQASgbAngWQAogYAlgBQArgDAVAdQgnAlgsAeQg6AoghAAQgRAAgKgLg");
	this.shape_196.setTransform(-13.6937,-21.9044,0.2147,0.2147);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#E4BA41").s().p("AhOBKQgdgeBZhCQAsgiAygcQATAdgPAlQgMAgghAeQgfAcgfAJQgNAEgLAAQgRAAgKgLg");
	this.shape_197.setTransform(-11.7743,-19.2343,0.2147,0.2147);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#E4BA41").s().p("AgMAwQgrgRgZgcQgcgfAJgiIBoAXQBoAggHAqQgEAZgkADIgJAAQgeAAgjgPg");
	this.shape_198.setTransform(-2.1241,-20.3254,0.2147,0.2147);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#E4BA41").s().p("AgDAlIhrgkQAMgfAmgMQAhgLArAIQApAHAcATQAdAUgEAYQgDAYgnAAQgbAAgsgMg");
	this.shape_199.setTransform(-1.3336,-23.7961,0.2147,0.2147);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#E4BA41").s().p("AgtADQAEhrArgFQAZgCAMAhQALAggGAsQgFAugVAfQgXAjgjAAQgHg1ACg2g");
	this.shape_200.setTransform(-6.5304,-31.1319,0.2147,0.2147);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#E4BA41").s().p("AgTBJQgTgdgEgsQgDgpALgfQANgiAWgDQAqgFAABwQAAA3gIA5QgigDgUgig");
	this.shape_201.setTransform(-10.3439,-31.127,0.2147,0.2147);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FCEEC1").s().p("AngHiQjIjIAAkaQAAkZDIjHQDHjIEZAAQEaAADHDIQDIDHAAEZQAAEajIDIQjHDHkaAAQkZAAjHjHg");
	this.shape_202.setTransform(-6.6412,-25.1077,0.2148,0.2148);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#F7D88B").s().p("AkkK3QiIg6hohoQhohog6iIQg7iMAAiZQAAiYA7iMQA6iIBohoQBohoCIg6QCMg7CYAAQCZAACMA7QCIA6BoBoQBoBoA6CIQA7CMAACYQAACag7CLQg6CIhoBoQhoBoiIA6QiMA7iZAAQiYAAiMg7g");
	this.shape_203.setTransform(-6.6412,-25.1077,0.2148,0.2148);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#E4BA41").s().p("Ak+K3QiHg6hohoQhphog5iIQg7iMAAiZQAAiYA7iMQA5iIBphoQBohoCHg6QCMg7CZAAQCZAACUA7QCPA6ByBoQBzBpBACHQBDCNAACXQAACYhDCNQhACHhzBpQhyBoiPA6QiUA7iZAAQiZAAiMg7g");
	this.shape_204.setTransform(-4.6225,-25.1077,0.2148,0.2148);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#E9CAB7").s().p("AArC8Qg3g5g1hfQg0hegShOQgShOAbgPQAbgPA4A5QA4A4A0BgQA1BfASBNQASBOgbAPQgGADgHAAQgaAAgtgtg");
	this.shape_205.setTransform(-32.6075,-35.3192,0.2148,0.2148);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#F8E7DC").s().p("ABcRRQjGhHipjzQi4kKhnmYQhlmVgMkoQgKkJA/iQQA5iGBpgDQBmgDByB4IOZaGQhHEcikB4QhhBGhwAAQhEAAhJgag");
	this.shape_206.setTransform(-34.7241,-33.3837,0.2148,0.2148);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#B2312C").s().p("AgLLTQiQjmhJkhQh9nyBblmQBOkxDIhzQigCogmFCQgsF0CJHvQBADqBnDNQBhDBB+CcQiyiIiGjWg");
	this.shape_207.setTransform(-49.0476,-33.3703,0.2148,0.2148);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#BC433E").s().p("ABMSIQkJhKjbkCQjvkYhmmZQhlmQAok6QAikSCFimQB3iWCdgRQCbgRByB4IOYaGQhAFijZCWQiDBaieAAQhUAAhcgZg");
	this.shape_208.setTransform(-37.8462,-31.9667,0.2148,0.2148);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#E9CAB7").s().p("Ah7DoQgbgPARhOQAQhOA0hgQAzhgA3g5QA3g5AcAOQAbAPgRBOQgRBOgzBfQg0Bhg2A5QgtAugaAAQgGAAgGgDg");
	this.shape_209.setTransform(18.8714,-32.6187,0.2148,0.2148);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#F8E7DC").s().p("Ao4PiQi1hGgvjHQgwjOBvkSQB6kqEfk1QEckyDxirQDYiZCcgbQCPgYA8BVQA7BUgnCiIuCaSQidA3iBAAQhiAAhSgfg");
	this.shape_210.setTransform(14.3892,-34.3019,0.2148,0.2148);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#B2312C").s().p("Aq6EXQByj2DLjaQFfl5Fch3QEqhmDNBrQjkgrkhCQQlQCmlWGBQigC0h0DGQhtC7g9C+QARjfBpjlg");
	this.shape_211.setTransform(10.1256,-43.0762,0.2148,0.2148);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#BC433E").s().p("Ao4QdQjihchSkGQhTkHBhlFQBolgEfk0QEZkvEdiKQD4h5DTAUQC/ASBkB7QBiB4gmChIuDaTQjABRijAAQh1AAhmgqg");
	this.shape_212.setTransform(12.0562,-35.2387,0.2148,0.2148);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#499D6B").s().p("A2jPMQp6hZntigQnYiYkGi/QkGi+AAi+QAAi8EGi/QEGi+HYiZQHtigJ6hZQKshgL3AAQL4AAKsBgQJ6BZHuCgQHXCZEGC+QEGC/AAC8QAAC+kGC+QkGC/nXCYQnuCgp6BZQqsBgr4AAQr3AAqshgg");
	this.shape_213.setTransform(-1.4913,-8.2541,0.2148,0.2148);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#4DA69B").s().p("A2dROQqYhbn/ilQn/imkZjWQkijeAAj0QAAjyEijfQEZjWH/imQIAilKXhbQKuheLvAAQLwAAKuBeQKYBbH/ClQH/CmEZDWQEiDfAADyQAAD0kiDeQkZDWn/CmQn/ClqYBbQquBerwAAQrvAAquheg");
	this.shape_214.setTransform(-1.6971,-8.2192,0.2147,0.2147);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#61AC82").s().p("Egg2ASIQq+lImPpQQnorSgDwxQAJDrEZDXQEZDWH/CmQH/ClKYBbQKuBeLvAAQLwAAKuheQKYhbH/ilQH/imEZjWQEZjXAJjrQgDQxnoLSQmPJQq9FIQtOGMzqAAQzpAAtNmMg");
	this.shape_215.setTransform(-1.4913,25.5047,0.2148,0.2148);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-81,-58.8,161.9,117.8);


(lib.shirt1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AiqD5IgogQQivg7gji1QgLg5AEg+IAHgzIAlgnQAlgmA0gHQA0gHAsAbQgjATgpAZIgBABQgpCWBaBeQBZBeCigTQCOgSCQhvQA2A6BAAuQkJCjjVADIgFAAQhAAAg0gPg");
	this.shape.setTransform(70.426,11.5392,0.4383,0.4383);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5D999D").s().p("AhiENQiHhzghhcQgCgEAjg8QAmhCAuhFQCDjFBCgeIDbCLIjtJOQg8gnhEg5g");
	this.shape_1.setTransform(26.7219,49.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#5D999D").s().p("AmlJ+Qg9gYg8geIgwgZQgYjjgUjvQgoneAUhBIALgjIAEgLQAfg0ArgnQAggdAlgXQBIgqBcgRQAXgEAYgDQgBAKACAMQACAIAEAHQgBAJAAAKQACAbAQAUIABABQABANAGALQAQAaAeADIAPACQAFACAEAEQAkAZAggJQAQgEAMgMQAJgKAEgLQARgBALgDQAQgFARgNQALgJARgRIAQgRQALAMATAJQAPAHAYAIIgBAZQgBAqAHAVQAFARAOASQAHAKATAVQAcAfASAPQAcAYAbAKQAiANA8gBQAUAAAPgCIAOAKQAnAZAwADQAeABAUgJIANAYQAzBeAmBpQATA1AJAhIkeCSQgYBag3CHQgzB6gPAsQgKAJgGAEQgJAGgVAIQgJAFgMAJQgsAOgVATQgHAHgLANIgCABIguAbIgcANQgQAHgKAGQgQAJgLALQgZAEgaADIgeABQh3AAishEg");
	this.shape_2.setTransform(85.3055,73.645);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,151.5,144.2);


(lib.rightHand1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ak6CsQgDgoAqAAQAqAAADAoQAIBoCUhSQBrg8A/hBQAXgZAhgxQAng9AUgxQA2iMiLAhQgnAJgLgoQgMgpAogJQBOgTA2AVQBCAXALBKQAUCDiaCvQgnAthJA1QhUA9hLAdQg8AXgsAAQhrAAgLiNg");
	this.shape.setTransform(57.9511,40.7511,0.438,0.438);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ag5DmQhFgbgrhAQgrg+AAhKQAAhwBchIQBUhDBxAAIAABjQhLAAg3ApQg8AsAABDQgBArAbAmQAaAmApAQQBHAdCGgpIAcBeQhbAdhJAAQg5AAgxgTg");
	this.shape_1.setTransform(11.2882,22.4006,0.4376,0.4376);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#351D41").s().p("AjVAqQgegHgPgGQgZgJgOgPQgSgRAUgQQANgLAZgHQArgMA4gGQAmgDBAgCIBNgBQCmABBfA8QAYAPAAAPQAAAOgLAIIgJAFQgHADgOACIgRACQg9AJgyAEIhCADIgYAAQiBAAiDgdg");
	this.shape_2.setTransform(35.9533,6.7428,0.4379,0.4379);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AjCHbQg2gGgegVQghgXgRgxQgXhCgahgIgpilQgchqgOhCQgThhgEhQQgDgxAUgcQANgTAcgOIAygTQA9gXBDgNQB6gYCMAFQCNAGCaAjIBBAPQAlAKAZAOQAjAUAKAgQAGAWgHAoQgdC1gSBZQgdCUghB1QgbBdgMAbQgfBJgsAYQgmAUhEAEIhuAAIgaAAQhpAAhpgLg");
	this.shape_3.setTransform(35.2474,20.9317,0.4379,0.4379);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#ED8B6D").s().p("AgiSIQi5iNivjHQjikAjClMQhMiEh0iOInlpdQg+gvg+g1Qh9hrgCgkQgBgNg4gUQg7gUgKgFQhCgfgfgqQgOgTgDgRQgFghAXgwQAVgrAcgZQAqglBAgGQBLgHBVAbQBcAfBRBGQAkAfAbAkQANARAQAYIALAaQAIARAGAFIC3CMQDiCvDUCsQKmIlEjFBIK0u7IFHlPILeE3QusTqnrHOQh6BzinAKIgdABQiVAAh4hcg");
	this.shape_4.setTransform(106.2133,63.0126,0.4383,0.4383);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#ED8B6D").s().p("AA2DZQhGgBhBggQhCgggsg3QgTgXgGgVQgHgYALgpQAThIAmgmQAfgfBDgcQBTgjBFgBQAmAAAMAWQAIAOACAtQACAfAOAnQAJAXATArQAkBXgZA2QgSAngvAVQgnARgvAAIgFgBg");
	this.shape_5.setTransform(9.6187,21.5389,0.4383,0.4383);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.3,193.2,118.2);


(lib.leg11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4CEC9").s().p("AvRquId+AAQBfH9iYFHQh7EHkTCHQjEBhj9AYQhOAHhLgBIg7gCIsiAOg");
	this.shape.setTransform(270.1168,30.107,0.4382,0.4382);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4CEC9").s().p("A2MQiIHC4yQA9ioCzgpQA4gNA9ABQAeAAAUAEIEfAAIADgDQBAg8BZgwQBJgoBigmICyhAQBqgmBEggQAegPAPgFQAZgIAVACQAMABAJAFQAKgMANgEQARgGAYAGIArAMQAcAHAmgDQAQgBAzgHQCXgWCSADQArABAVgCIAqgHQAYgCARAHQAPAHALAPQAGAIAEAKIAJAIQAOAOAAAWIACACQAYAXASAkQAKAUATAzQAGAQAFAIIARAWQAOATAVAuQASAlAFAWQAEAUgBAdQgBAagGAOQgIAUgVALQgVALgWgEQgWgEgQgRQgRgQgEgWQgBgZgCgMQgBgIgEgKIgGABQgMADgrABQgmAAhMAEIgwAEIgnAFQgLAAgKgBQgOAHgUgCQAbC/g8CAQg2Bzh4A7QhWArhvAKQgjADggAAItNAOQh9AGhIBQQgXAZgPAbInpRhg");
	this.shape_1.setTransform(170.9091,75.6421);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("Ao/gYQAAgkAtg+IAtg3QBmhICwgPQBZgHBEAIIABgDIJwCvIhlFng");
	this.shape_2.setTransform(24.8077,211.9333,0.4379,0.4379);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#ED8B6D").s().p("AtPUVMAKWgqjIQJAkMgTOAr6g");
	this.shape_3.setTransform(63.1659,152.5383,0.4381,0.4381);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.4,-36.8,313.4,260.5);


(lib.leftHand1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ED8B6D").s().p("AhDCVQgUgDgSgPQgbgWgHglQgGgfAJgkQARhCAugpQAzguBJgBQAegBAUAJQAfAOAIAiQAIAhgUAYQgKAMgZAQQgaAQgKAKQgNANgMAaQgMAdgHAOQgNAXgTAOQgTANgUAAIgJgBg");
	this.shape.setTransform(9.566,149.1517);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED8B6D").s().p("ApiLDQgOgCgRgRQgPgPgGgPQgKgWAHgcQAHggAXgfQAZgiApgYQASgLATgGQALgEAKgCIAMgCQAJgBACgCIBUg4QBohGBlg/QFCjOCuhMIksmkIhei3IBIhSIAIgBIAWgFQAOgDAKAAQARAAAYAKQAPAHAJAHIALAKQAHAHAFADQAMAHASgCIAfgFQAagEAWABIAZABQAPgBALgDIBFBrQDhFbBPCrQAfBCgTBHQgTBGg9AqQhUA5hrAtQiKA6ilAjQhBANhLAcIk/B2QgcATgfASQg+AlgPgEQgFgBgRAUIgTAZQgXAYgVAHQgHACgGAAIgFAAg");
	this.shape_1.setTransform(66.879,87.7475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.6,17.1,138.4,147.1);


(lib.face1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ED8B6D").s().p("AhIPqIATpFQhCAHgSAFQgDABhJgBQhEgBhIgdQhAgbg+guQi6iKgPkSQgMjOBTkJQAahOAihWQAqhoBOhMQBShPBngfQD1hKDcDNQBuBmA9B2Qg+E8CqEoQBVCTBhBUIgyC/IAUCzIgbAkQg0AVg2A2QhAA9gwBZQgXAvgFAeIgBAEQgeAvAMA4IAFARIguAJg");
	this.shape.setTransform(29.8859,45.0431,0.4383,0.4383);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED8B6D").s().p("AgwCBQgXgHgMgVQgHgNgCgSQgBgPADgPQABgJAGgRQAMggAHgMIAUgcIATggQALgTALgJQAMgKASgCQASgCAPAIQAPAIAJAPQAKAQgBARQgBASgQAbQgNAYgNASIgRAeIgFAWIgFAVQgJAXgTAJQgNAHgOAAQgIAAgIgCg");
	this.shape_1.setTransform(44.3048,77.813);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,59.8,90.9);


(lib.shirt2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F7D07F").s().p("Ag7E0Qkoh+ACgHQAZhlDZkGQBEhTBNhXIBChIID+DDIh1KbQiUg+iUg+g");
	this.shape.setTransform(35.4246,52.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F7D07F").s().p("Ajyj/IDthqQA9AoBlDWQAjBKAcBHQAaBAgDAEQgtBXiXBdQhKAvhDAdg");
	this.shape_1.setTransform(122.8862,48.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F7D07F").s().p("AAZK9QgygJgxgUQh/gzgXhMQgLgjg8iRQg4iGgYhbIkeiRQAJgiATg1QAnhpAyhdQCiksDhhJQB0glBfAJIAXgEQAdgGAhgDQBmgJBcARQBcARBHAqQAlAVAhAeQAqAnAfA0IAFAMIALAiQAUBBgoHeQgUDwgYDiQhoAihxAjQjiBHgvAGIgTACQgXAAgigHg");
	this.shape_2.setTransform(66.1695,70.7527);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1,1,1).p("AhjgxIDHACIAABhIjHgBg");
	this.shape_3.setTransform(59.5,44.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#351D41").s().p("AhkAxIABhiIDIABIgBBig");
	this.shape_4.setTransform(59.5,44.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,147.2,141.5);


(lib.rightHand2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F2A79F").s().p("ACSDmIhkgpQg7gYgsgCQgegBhHANQhCAMgjgEQhHgIgnhEQgohFAehHQAUgvAxgsQB+hyCcgEQCMgDCGBUQBGAtAnA+QAuBHgKBOQgGA2geAkQgkAtg+AKQgRADgSAAQglAAgngNg");
	this.shape.setTransform(109.772,122.6279,0.4383,0.4383);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F2A79F").s().p("AiGKhQhwgWhig1QhEgkgqhWQgnhSAChTQAKnXC3k3QA6hhBEhGQAVgVAUgRIAPgMICiCCIgpGdIiWHjQgFAOAHANQAHANAOAEQBfAbENAeQCHAQB0AKIgCCZQhhAViNAWQh6AUgrAEQgkAEgjAAQhLAAhMgQg");
	this.shape_1.setTransform(49.2452,68.867);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,127,137.8);


(lib.right_leg2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AAJE7QjugokfggIjvgXIWlsuIBCSlQgfierMh6g");
	this.shape.setTransform(154.2028,298.0248,0.4383,0.4383);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AmDMvIEJ5fIEYgfIArADQAyAGAnAXQB+BIgkDNImqVqg");
	this.shape_1.setTransform(196.6012,353.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F8EEE4").s().p("AiOBzQgTgBAXg1QAPgiAQgbQAxhQA+gaQArgRAfAHQAlAJACAsQACAQgKAqQgHAeALAdQAOAiAZAfg");
	this.shape_2.setTransform(178.9453,454.1609,0.4379,0.4379);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F8EEE4").s().p("Ag+AmIAFhUQAzAKAnAqQATAVAKATg");
	this.shape_3.setTransform(160.1417,456.0382,0.4379,0.4379);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F8EEE4").s().p("AohC1IADl2IKJAHIAAAEIAsAKQA3ANAzAUQCmA/BOBhIAbBCQAaBIgLAig");
	this.shape_4.setTransform(180.959,465.4826,0.4376,0.4376);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F2A79F").s().p("AqWWpMAGrgvdIOCH/MgNhApqg");
	this.shape_5.setTransform(187.2463,396.1441,0.4382,0.4382);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(121.1,268.6,114.30000000000001,205.39999999999998);


(lib.lips1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgdA+QgtgKgjgkQgjgjgJguIEzAsIgRAVQgiAmgpAQQgcAMgeAAQgPAAgSgEg");
	this.shape.setTransform(6.2407,4.2233,0.2854,0.6818);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAFAeQgIAAgDgEQgBgDAAgFIAAgHIgGgEQAAADgBADIgBABIAAABQAAAEgFADQgEACgFgCIgFgFQgDgEgDgFQgCgEAAgFQgBgDAAgHQAAgEABgDQACgEAGgCIAFAAQAEgDAGgBQAVgEAWAJQAHADAEAFIABACQAFACABAFQACAEABAFQAAAJgCACQgBAFgFADIgHABIgJAFQgFACgGAAIgFAAg");
	this.shape_1.setTransform(6.85,1.4902);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgKAfQgSgGgOgRQgOgRgDgXIB3AVIgHALQgNASgQAJQgLAGgLAAQgGAAgGgCg");
	this.shape_2.setTransform(6.8,4.5008);
	this.shape_2._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2}]},3).to({state:[{t:this.shape_2}]},3).to({state:[{t:this.shape_2}]},3).to({state:[{t:this.shape_2}]},3).wait(3));
	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(3).to({_off:false},0).wait(3).to({scaleX:1.0912,scaleY:0.4694,x:6.8203,y:4.4626},0).wait(3).to({scaleX:0.4414,x:6.8013},0).wait(3).to({scaleX:0.9579,scaleY:1.3332,x:5.7637,y:5.6005},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-1.5,13.4,11.5);


(lib.leftLeg2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#585B8B").s().p("AF8nuInxEQQiEBJiRAjQiSAkiVgDQlNgIiuhpQg2ghgggnQgKgMgGgMIgFgIIVKpAQD1hdC9AuQA9AQArAbQAPAJAIAJQAIAHgDACQDdB0D/MfQBQD6BKEgQAlCRAUBeIkqBgg");
	this.shape.setTransform(137.375,128.3528);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#585B8B").s().p("AzGLIQgVgfgag8Qg1h6geiVQhfndCtpFMAjagBqIGKGiI8gS7g");
	this.shape_1.setTransform(60.7351,67.6482,0.4383,0.4383);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F8EEE4").s().p("AiSBaQAFgnAIgdQAahcA0gpQAkgdAfgBQAlgCAPApQAGAQADAqQACAhASAXQAWAcAiAYIkcBOIgDAAQgPAAAHg0g");
	this.shape_2.setTransform(267.0963,232.1221,0.4378,0.4378);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F8EEE4").s().p("AhGgoQA0gFAxAeQAZAPAPAOIh5Abg");
	this.shape_3.setTransform(248.3277,239.3785,0.4378,0.4378);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F8EEE4").s().p("Ao+hbIJwivIABADIAtgDQA4gCA4AEQCwAOBmBIIAtA4QAtA+gBAkIwYEkg");
	this.shape_4.setTransform(270.8862,244.4823,0.4375,0.4375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F2A79F").s().p("AtP1qIQJglMAKWAqkInSB7g");
	this.shape_5.setTransform(233.4705,185.7939,0.4381,0.4381);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#585B8B").s().p("Ax2GrII2tzITRAPIHmMaMgjjABog");
	this.shape_6.setTransform(56.4219,20.0184,0.4383,0.4383);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,296.1,256.2);


(lib.leftHand2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F2A79F").s().p("AguDqQhBgGg3ggQg+glghg/QgVgrAAgoQAAgvAiggQAdgcAsgIQAbgFA3gDQAwgFAdgRQASgLAlgmQAjgjAYgLQAwgWA5AlQA6AlAQBCQALArgJA2QgWCHhfBBQhHAwhhAAQgUAAgUgCg");
	this.shape.setTransform(153.2952,115.8202,0.4383,0.4383);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AjUDcIAdheQCEAoBIgcQAogQAbgmQAagmAAgqQABhEg9gsQg2gphMAAIAAhjQByAABUBDQBbBIAABwQAABJgrA/QgrBAhGAbQguATg7AAQhIAAhcgdg");
	this.shape_1.setTransform(158.7619,112.3889,0.4372,0.4372);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#351D41").s().p("AhGBHQghAAghgDQgxgDg+gJIgRgDQgPgCgGgCIgJgFQgLgJAAgOQAAgOAZgQQBdg7CngCQAmAAAoABQBCACAjAEQA4AFArAMQAZAIANALQAUAQgSAQQgOAPgYAKQgRAGgdAGQiEAdh9AAIgbAAg");
	this.shape_2.setTransform(135.0847,97.0224,0.4377,0.4377);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AiXHlQhEgDgmgVQgsgYgfhIQgLgcgbhdQgih0gdiVQgShZgdi1IgEgfQgBgRAEgNQAJggAkgUQAYgOAmgLIBCgPQCegjCIgFQCPgFB3AXQBGAPA7AVQApAQAIAEQAcANANATQAUAdgCAwQgFBRgTBgQgOBFgcBoIgpCkQgZBhgYBCQgRAwghAXQgeAWg2AFQh7ANhxgCIg/ABIgvgBg");
	this.shape_3.setTransform(135.8026,111.2433,0.4377,0.4377);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F2A79F").s().p("AoCEIQAkj2BhlWIN6EwIAGACIhpFXg");
	this.shape_4.setTransform(111.8131,107.9488,0.4382,0.4382);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F2A79F").s().p("AFtJSQg/AAhKgJQiVgUh0gzQi0hPhMiPIi1rEIEEi1QAlAWAgAeIgCADQABAEAcAfQAiAqAdA4QBcC1AhEsQAMAwARAsQATAsANAOIFYB1QgqCWgQBtg");
	this.shape_5.setTransform(47.525,59.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,168.1,132.5);


(lib.head2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AmPFbIAaqEIJ1gyICQG4IiWApIhtjSIACB3QAEB6AIAJQiFBYjbA0QhKAShDAKQgpAGgOAAIgGgBg");
	this.shape.setTransform(21.5946,90.1948,0.4383,0.4383);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F8EEE4").s().p("AgFBOQgGAAgEgFQgFgEgCgGQgFgNADgUQAFgaAMgdIALgbQAHgQAHgJQAEALACARIACAdQACAggEAaQgEAUgIAKQgHAKgIAAIgCAAg");
	this.shape_1.setTransform(39.9983,63.9792);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("ABmJ9QAxgpAmgmQBZhXAyhcQAshRgBhQQAAgqgRgoQgOgigcgnQg/hShbhMQgcgZgigZQhphRiDhEQhyg8iBgzIjJlTQAiAFAjAMIABABIBfAkQEABmDTB/QExC1CVDHQA6BOASBdQARBggcBbQgqCFhSBjQhuCCitA8QhbAhhwANQBFgrBMhBg");
	this.shape_2.setTransform(83.5158,34.9867,0.4383,0.4383);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F2A79F").s().p("AAOBTQhlgghig5IhJgvQA9gUAvgIQA7gLAwAFIAWgDQAcgEAggCQBlgHBcARIAEAGQAlA2gWAyQgXAyhDASQgZAHgcAAQgsAAgygQg");
	this.shape_3.setTransform(47.7754,100.2673);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#BC827C").s().p("AhBg9QALACBeAQIAaBqg");
	this.shape_4.setTransform(51.775,79.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F2A79F").s().p("AAXBmQgVgFgQgSQgOgPgJgWQgLgbgCgrQgBgZADgNQAEgQAMgJQAMgKARgCQASgDAUASQAQAPAAAHQAAAHgMgBQgLgBAAAHIAOCLIABAGIAAAGQgBAGgGABIgCAAIgLgCg");
	this.shape_5.setTransform(42.0275,49.808);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#1F1426").s().p("Ah5jAQAUh8AphzIAnheIAHAPIAAABIABAGQAHAqANA0IAcBdIAoB4QAZBKANAwQAhBvgKB7QgEAhgKAtIgTBOQgQBMguBNQgNAWgYAdIgBAAIgPAGQirlIA+mGg");
	this.shape_6.setTransform(38.3604,65.7203,0.4382,0.4382);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#282E46").s().p("AAPARQgNgEgFAAIgQABIgPABQgUAAAEgLQACgIANgIQARgJAVACQAZADAPALQAHAEABAGQACAHgHAFQgEADgJAAQgGAAgMgDg");
	this.shape_7.setTransform(76.8624,35.974);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#282E46").s().p("Ai5GqIgXguQgjhEgUgEQhAgJgvhFQAWhAgEhFQgCgvAKhMQANhVAEgoQAVgXAQgfQAfgOARgLQAagPAUgSQA3gyAVhHIAQgPIATgLQAOgIALgFQArgSA2gEQAugCAoALQAjAJAuAYQA3AdAuAzQAwA0ASA4QAPAvgMBWQgEAfgGATQgGASgCgKQgLg5gYgyIgbgwQgWgngggjIgdgfQgUgSAAAJIgFBBQgHA5gVAmQhBBzi9hAQgPgFAEAiQADASAHAXIAMAnIARA1IARA1QAPAzgFA1QgCAOgEAUIgIAiQgIAhgTAiQgNAVgaAVQgXAUgZAMIgBAAQgCAAgJgUg");
	this.shape_8.setTransform(48.9495,49.0525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#151035").s().p("AhjBAQgHgTAPggQASgmAtgYQAzgcAqABQASAAALALQAMALgFARQgFANgPALQgNAJgbAIQgcAJgMAIQgKAGgRAQQgTAQgJAGQgSAMgLAAQgMAAgEgNg");
	this.shape_9.setTransform(57.7207,38.9342,0.4382,0.4382);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#BC827C").s().p("AhCBvQgGggAegDQAmgDAIgNQAKgNgQgeIhBhtQgQgaAdgPQAcgOAQAaIAmBAQAYAmAMAaQAXA2geAmQgcAig6AGIgFAAQgaAAgGgcg");
	this.shape_10.setTransform(72.6753,49.9445,0.4381,0.4381);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F2A79F").s().p("Aj3CXIgWhLQAmgjAgg7QBBh3gch9QAXgwAqgqQBVhUBiAbQAqALAhAfQAgAdASApQAPAjAKAeQAkBogCBSQgDBthJA5QgpAhhAAFQglADgNAAIg5gDIA6DqIibgXIiaAwg");
	this.shape_11.setTransform(57.5831,59.6966);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#282E46").s().p("AvDTNQgXgggag7QhAiTgOi5QgLiUAVjDQAznVC4owQA6iyA2hkQBqjHDShiQC7hYD0ABQAiAAAvAIQA9AIA0ASQBAASBHAjQDbBrCnCxQBWBcA+BlQCaDxArEoQAVCQAABeQABBSgMBQQgLBNgcBFQh6E5mUDEQiNBEi3A7Qh4AmjXA6Qg+AQgzhgQgfg6gyilQg0ingfg+Qg0hqhAADQgcABg/BxQgkBBhYC0QhWCwgnBEQg+BugcAAIAAAAg");
	this.shape_12.setTransform(47.9365,53.737,0.4381,0.4381);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#ED8B6D").s().p("AhXB4IAEh4QADh3gBgBIB+AsIAqCbIg2Aqg");
	this.shape_13.setTransform(29.9329,90.155,0.4383,0.4383);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.1,109.2,110.3);


(lib.firstRule = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AgeAzQgOgIgKgQIgEgOQgCgHAAgHQAAgOAHgLQAHgMANgKQAHgFAJgDQAIgCAJgBQASAAAOAJQAOAJAJARQADAGABAGQACAGgBAGQAAAUgLAPQgMAOgXAJIgKABIgEABQgQAAgOgJgAgegeQgFAFgEAKIgBAGIAAAEIAAACQAAAUAMAKIACggIAEgJIAIgPIAAgDIgHgCQgFAAgEAEg");
	this.shape.setTransform(1720.1063,116.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AgGF4QgjgBgjgUQgRgNgLgMQgLgMgGgLQgNgQgJgbQgJgbgGglIgBgJIgCgMQAAgHAJgOQAGgFAFgCQAFgDAGABIADAAQAKAAAIAFQAIAIAEANQAGAfAGAWQAGAWAHALQALATAMAJQAMAJANAAQALgGAIgLQAIgMAGgRIACgMIACgTQAAgmgRgwQgSgvgkg6IguhUQgTgigIgUQgNgegHgaQgGgaAAgXIAAgBQAAgPAEgSQAEgTAHgVQALgYARgSQARgSAYgOQAPgGAPgEQAOgEAOAAIADAAQASABAVAHQAUAJAWAQQASASALAOQALAOADAJQAJAVAFAXQAFAYAAAaIAAACQAAAagGAPQgGAPgNAFIgIACQgKAAgHgHQgHgGgEgMIAAgBIAAgTIAAgKQAAgRgFgTQgEgUgKgWQgCgFgGgHIgOgPIgBgBQgLAGgFAPQgFAQAAAYQAAAQAIAXQAJAWATAeQgBABALARIAgA0QANAWAKAVQAKAUAHARQAlBjAABEIAAAFQAAAkgLAiQgMAhgXAcQgaAggPAFQgUALgSAGQgSAFgRABgAhbk+QgKAKgNAVQgKAQgEANQgFAMAAALIAAABIgBADQAAAOAEALQADAMAHAIIABAAIABAAQAAgZAGgZQAFgYAMgaIANgSIAPgUIAAAAQAAgCgFgBQgIAAgLAJg");
	this.shape_1.setTransform(1690.225,84.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("Ag3F7QggAAgXgXQgXgVgRgsQgFgMgFgjQgEgjgEg7QgBgYgBglIgBhZIABhBIAAgrIgBg1IAAggIAAhAQAAgoALgbQAKgaAUgNQAEgFAIgDIAQgEIAKgCIALgBQASAAAQALQAQALANAWIADAJIAEANIAAAAQANgTARgOQARgOAVgIIAOgCIAOgCQAUAAARAKQAQAKAMAUQAHAKAFARIAIAoIABAMIAAAIQABANgHAKQgFAJgNAFIgEABIgDAAIgEAAQgKAAgIgHQgGgGgFgNQgDgjgGgSQgEgSgJAAQgTAAgWAcQgHAJgDAMQgFAMgCAOQgHARgEAkQgHAlgEA5IgDAYIAAAYIAEDRIACCOQgBAUgEANQgEANgKAGQgFAFgLACQgKACgQAAgAiAlJQgHAMgHAaQgGAVgCAPQgCAQAAAKQAAAJACAJIAGATIABABQAFgKADgLQADgLgBgKIAGgnIAFgdIAHgYIAEgMIAAgCIgBgBIgDgBQgGAAgHAMg");
	this.shape_2.setTransform(1648.85,85.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282E46").s().p("AgXFjQgYgLgZgZIgRgUQgPgUgMgXQgMgXgJgYQgHgQgFgTQgGgUgFgYQgRheAAhJQgBhKAOg8QAPg9AdguQAng6A5gWQAMgEAMgCIAVgCIADAAQAjAAAeATQAdASAZAkQAFAIAEAMQAEALAEARQAGAWACARQACARAAALQADAjABAgIABA+IAAALQAAAQgFALQgGAKgLADQgGADgNABIghABIhJACIgjABQAAAUAEAjIAMBVQAFAdAHAVQAFAUAHAPIANAYQAIANAKAMIACABIABACIABAAQALgJAJgUQAJgVAHgfIAKgoIAHgUQAGgGAGgDQAHgEAHAAQALAAAIAHQAIAGAEAMIAAAEIAAAEIAAACQAAAHgGAaIgSBDQgFAOgIANQgHAOgIANQgTAXgZALQgZALgfAAQgZAAgYgMgABZg6IAVABIAAgKQAAgygCgmQgDgmgFgbQgEgQgHgMQgGgMgIgJIgVgQQgHgGgCAAQgSAXgLAbQgLAagFAeQgEAdgDAfQgDAgAAAhIAAADIAtgBIAcgBIAaABgAhHkoQgOANgQAWQgKAQgFANQgEANAAAJIAAACIABAJQAAABAAABQABAAAAABQABAAAAAAQABAAAAAAQAFgCAFgGQAEgHAEgLQAAgDAGgLIASggIANgSIAUgYIgCgCIgDAAQgMADgNANg");
	this.shape_3.setTransform(1605.3241,85.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282E46").s().p("ABMHrQgjAAgegOQgdgOgageQgTgZgMgVQgNgWgGgUQgFgIgEgUQgGgTgFggQgDgIgBgtQgCgsAAhOIAAiOIAAgxIABhbIgfgBIgagBQgKAAgHgGQgHgGgDgMIAAgHQAAgJAFgGQAFgHAJgEQAGgDARgCIAugDIADgZIADgvQAIgnAJgdQAIgcAIgUQAKgWAMgMQALgKANgBIADAAQAQABASAHQAUAHAWAPQAJAHAHAZQAHAZAEAtIACAfIABApIAAALIgBAQIATAAQAdAAAQACQAQABAEADQAIAGAEAHQAEAHAAAHIAAAEQAAALgHAHQgGAIgMAFIg1AAIgYAAIgDA3IgBBYIAAA9IACCAQgDBFAAAbIAAAvQAAAzAFAhQAEAfAKANQADAFADACQAEADAEAAQALAAAGgKQAHgKADgVQACgFACgRIAEgqQAAgRAFgLQAFgLALgEIAFgBIAEgBIAHAAQAJAAAGAGQAHAGAFAMIABAFIAAAGQAAAigFAgQgFAfgJAeQgNAegaAOQgYAOglAAgAg2mjQgGAOgEAOQgFAOgDAPIgDAaIgBAOIAAABIACAUQABALADAKIACACQAGgJAMhSQAGgaACgSIAFgaIAAgCIAAgCIgDgBQgFAAgJAZg");
	this.shape_4.setTransform(1561.975,74);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282E46").s().p("AAUFwQgUAAgVgIQgVgIgXgQIgagaIgPgSQgOgVgLgbQgLgcgJgfQgOg2gHg2QgHg1AAgzIAAgOQAAgsAHgsQAHgrAOgqQAHgVAJgTQAKgSAMgSQASgWAPgNQAPgNAMgGQAWgLAUgGQATgGATAAQAfAAAaAQQAZAQATAgQAKAXAFAUQAFAVAAASIAAAIQAAAOgFAJQgGAJgKAFIgGABIgEABQgKAAgGgGQgHgGgFgMQAAgTgEgRQgDgSgJgOIgJgFIgEgCIgCAAQgEAFgGAKIgNAaQgJAUgGAaQgGAcgEAkIgDAgIgBAlQAABLAKBFQAKBEAUA8QAJAWAJAMQAJALAKAFQAEgHAFgNQAFgMAFgUIAIglQAEgVADgcQADgHAEgFQADgGAGgDIAGgCIAFgBQANgBAIAGQAJAGAEAKIABAHIABAFQAAATgGAeQgGAdgLApQgIAcgPAVQgPAVgVAOQgEADgJAFIgXAKQgKAEgJABQgKACgHAAgAhAkuQgOAMgSAZQgKASgFAPQgFAPAAANIAAADIADAGQADgCADgEQAEgEACgIQADgKAGgMQAEgMAIgNIAPgWQAJgOAQgQIgCgCIgCAAQgIAAgMAMg");
	this.shape_5.setTransform(1523.875,86.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282E46").s().p("ABrF9QgRAAgOgFQgQgFgNgLIgfAEIgXABQgZAAgYgGQgXgIgVgOQgugdgTg5IgGgdQgDgOAAgNIAAgRQAAhUA4hBQAUgTARgLQASgMAOgFQAIgDALgCIAYgFQACgQAAgYIAAg3IAAguQAAgtgCgbQgBgagEgIQgGgWgLAAQgFAAgHAIQgHAIgLAOQgIAMgFAUQgEAUAAAaQAAATgCAKQgBALgDACQgGAIgFADQgGAEgFAAIgFAAQgLAAgIgGQgIgGgDgNIgBgLIAAgJIAAggQAAgdAJgbQAKgcAUgbQAOgRANgLQAOgLALgGQAUgHAUgEQAUgEAWAAIAFAAQAeAAAZANQAaAMAVAZQARAXAIAlQAJAlAAA0IgEDeIgCByIACBhIAAA1IAAAZQAAAOgEAKQgFAKgJAEQgJAHgJADQgKADgMAAgAhABGQgXAVgLAdQgLAcAAAjIAAAHQAAAmAQAaQARAZAgANIASAEIARABIANAAIADgBQgHgZgEgcQgEgbAAgeIAAhAIAAg5QABgVABgIQgTABgnAhgABhk9IAAABQAAADACAFQADAGAFAHQAGALAEANIAGAcIAFAjQABALABAAIADAAQAFgCACgGQACgFAAgKIAAgCQAAgYgHgVQgHgVgOgSQgKgLgFgBIgCABg");
	this.shape_6.setTransform(1481.375,84.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#282E46").s().p("Ag4F7QgeAAgYgXQgXgVgRgsQgFgMgFgjQgEgjgEg7QgCgYABglIgBhZIAAhBIABgrIgBg1IAAggIAAhAQgBgoALgbQAKgaAUgNQAFgFAGgDIAQgEIALgCIALgBQASAAAPALQARALAMAWIAEAJIADANIABAAQANgTARgOQASgOAUgIIAOgCIAOgCQAVAAAQAKQAQAKAMAUQAGAKAGARIAHAoIACAMIABAIQgBANgGAKQgFAJgNAFIgDABIgEAAIgEAAQgKAAgHgHQgIgGgEgNQgDgjgFgSQgGgSgIAAQgTAAgWAcQgGAJgFAMQgEAMgCAOQgHARgFAkQgGAlgEA5IgCAYIgBAYIADDRIADCOQAAAUgFANQgEANgKAGQgGAFgKACQgLACgOAAgAiAlJQgHAMgHAaQgFAVgDAPQgCAQAAAKQAAAJACAJIAFATIACABQAFgKADgLQACgLABgKIAFgnIAFgdIAIgYIADgMIAAgCIgBgBIgDgBQgGAAgHAMg");
	this.shape_7.setTransform(1445.15,85.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#282E46").s().p("ABrF9QgRAAgOgFQgQgFgNgLIgfAEIgXABQgZAAgYgGQgXgIgVgOQgugdgTg5IgGgdQgDgOAAgNIAAgRQAAhUA4hBQAUgTARgLQASgMAOgFQAIgDALgCIAYgFQACgQAAgYIAAg3IAAguQAAgtgCgbQgBgagEgIQgGgWgLAAQgFAAgHAIQgHAIgLAOQgIAMgFAUQgEAUAAAaQAAATgCAKQgBALgDACQgGAIgFADQgGAEgFAAIgFAAQgLAAgIgGQgIgGgDgNIgBgLIAAgJIAAggQAAgdAJgbQAKgcAUgbQAOgRANgLQAOgLALgGQAUgHAUgEQAUgEAWAAIAFAAQAeAAAZANQAaAMAVAZQARAXAIAlQAJAlAAA0IgEDeIgCByIACBhIAAA1IAAAZQAAAOgEAKQgFAKgJAEQgJAHgJADQgKADgMAAgAhABGQgXAVgLAdQgLAcAAAjIAAAHQAAAmAQAaQARAZAgANIASAEIARABIANAAIADgBQgHgZgEgcQgEgbAAgeIAAhAIAAg5QABgVABgIQgTABgnAhgABhk9IAAABQAAADACAFQADAGAFAHQAGALAEANIAGAcIAFAjQABALABAAIADAAQAFgCACgGQACgFAAgKIAAgCQAAgYgHgVQgHgVgOgSQgKgLgFgBIgCABg");
	this.shape_8.setTransform(1402.275,84.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#282E46").s().p("AiTHTQgYgTgPgnQgCgFgDgPIgEguQgDgJgBhPIgBjkIgBgYIAAg8QAAg7AChCQADhCAGhKQAFgaAFgXQAGgXAHgTQAHgWAHgPQAHgPAIgHQAHgGAIgEQAHgDAJAAQAPAAASAHQASAHAYAOQAHAFAGARQAIASADAeIAFAuIABAsIAAACIAAAyIgDBEIATgeQAXgbAXgPQAZgOAYAAIAGAAQASAAAOAJQAOAIAMARQAOAUAIA4QAHA4AABcIgCCLIgHDjIABBTQAAAKgEAHQgGAIgJAFIgFACIgDABIgLAAQgMAAgMgSQgDgFgBgYIgBhBIAJkRIABgdIAAhHQAAiOgSgqIgCgCIgFgBQgSAAgTAUQgSATgTAnQgLAYgKAjQgKAjgKArIgDATIgCAJIAABtIgCBbIgCCHQAAALgDAOQgDANgGAQQgKAZgQAMQgRAMgVAAQgiAAgZgTgAiFmcIgJAQQgLAZgGAbQgFAbgBAeQABAGABAEQACADACACQAGgDAEgGQACgGAAgJIAIg+QAFgZAEgPIAJgWIgCgCIgDAAQgEADgDAHg");
	this.shape_9.setTransform(1357.2,73.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#282E46").s().p("AAUFwQgUAAgVgIQgVgIgXgQIgagaIgPgSQgOgVgLgbQgLgcgJgfQgOg2gHg2QgHg1AAgzIAAgOQAAgsAHgsQAHgrAOgqQAHgVAJgTQAKgSAMgSQASgWAPgNQAPgNAMgGQAWgLAUgGQATgGATAAQAfAAAaAQQAZAQATAgQAKAXAFAUQAFAVAAASIAAAIQAAAOgFAJQgGAJgKAFIgGABIgEABQgKAAgGgGQgHgGgFgMQAAgTgEgRQgDgSgJgOIgJgFIgEgCIgCAAQgEAFgGAKIgNAaQgJAUgGAaQgGAcgEAkIgDAgIgBAlQAABLAKBFQAKBEAUA8QAJAWAJAMQAJALAKAFQAEgHAFgNQAFgMAFgUIAIglQAEgVADgcQADgHAEgFQADgGAGgDIAGgCIAFgBQANgBAIAGQAJAGAEAKIABAHIABAFQAAATgGAeQgGAdgLApQgIAcgPAVQgPAVgVAOQgEADgJAFIgXAKQgKAEgJABQgKACgHAAgAhAkuQgOAMgSAZQgKASgFAPQgFAPAAANIAAADIADAGQADgCADgEQAEgEACgIQADgKAGgMQAEgMAIgNIAPgWQAJgOAQgQIgCgCIgCAAQgIAAgMAMg");
	this.shape_10.setTransform(1310.925,86.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#282E46").s().p("AgXFjQgYgLgZgZIgRgUQgPgUgMgXQgMgXgJgYQgHgQgFgTQgGgUgFgYQgRheAAhJQgBhKAOg8QAPg9AdguQAng6A5gWQAMgEAMgCIAVgCIADAAQAjAAAeATQAdASAZAkQAFAIAEAMQAEALAEARQAGAWACARQACARAAALQADAjABAgIABA+IAAALQAAAQgFALQgGAKgLADQgGADgNABIghABIhJACIgjABQAAAUAEAjIAMBVQAFAdAHAVQAFAUAHAPIANAYQAIANAKAMIACABIABACIABAAQALgJAJgUQAJgVAHgfIAKgoIAHgUQAGgGAGgDQAHgEAHAAQALAAAIAHQAIAGAEAMIAAAEIAAAEIAAACQAAAHgGAaIgSBDQgFAOgIANQgHAOgIANQgTAXgZALQgZALgfAAQgZAAgYgMgABZg6IAVABIAAgKQAAgygCgmQgDgmgFgbQgEgQgHgMQgGgMgIgJIgVgQQgHgGgCAAQgSAXgLAbQgLAagFAeQgEAdgDAfQgDAgAAAhIAAADIAtgBIAcgBIAaABgAhHkoQgOANgQAWQgKAQgFANQgEANAAAJIAAACIABAJQAAABAAABQABAAAAABQABAAAAAAQABAAAAAAQAFgCAFgGQAEgHAEgLQAAgDAGgLIASggIANgSIAUgYIgCgCIgDAAQgMADgNANg");
	this.shape_11.setTransform(1242.4241,85.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#282E46").s().p("AgRHhQgQgFgNgKQgTgVgJgQQgKgQgBgMQgHgQgDhNQgDhNAAiJIgBhPIAAg6IAAgHIgBgFQAAg9ADhDQADhDAGhIQAFglAPgxQAJgaAJgRQAIgRAIgIQAHgFAHgCQAHgDAIAAQAQAAATAHQATAHAWAQQAHAGADAIQAEAIACAIQAOBJAAA0IAAAFIgCAvIgFB1IgBAtIAAAbIAABAIACCUIgEBjIgCCNQAAAZgVAnQgLAPgNAIQgOAIgRAAQgPAAgPgGgAgsmZQgHAQgFAYQgGAWgCASQgCASAAAPIABAMQAAAEADACQAFAAADgJQAEgKACgSIADgVIAHgkIAFgbIAHgaIAAgDIgBgBIgCgBQgIAGgHAPg");
	this.shape_12.setTransform(1206.5,73.325);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#282E46").s().p("ABrF9QgRAAgOgFQgQgFgNgLIgfAEIgXABQgZAAgYgGQgXgIgVgOQgugdgTg5IgGgdQgDgOAAgNIAAgRQAAhUA4hBQAUgTARgLQASgMAOgFQAIgDALgCIAYgFQACgQAAgYIAAg3IAAguQAAgtgCgbQgBgagEgIQgGgWgLAAQgFAAgHAIQgHAIgLAOQgIAMgFAUQgEAUAAAaQAAATgCAKQgBALgDACQgGAIgFADQgGAEgFAAIgFAAQgLAAgIgGQgIgGgDgNIgBgLIAAgJIAAggQAAgdAJgbQAKgcAUgbQAOgRANgLQAOgLALgGQAUgHAUgEQAUgEAWAAIAFAAQAeAAAZANQAaAMAVAZQARAXAIAlQAJAlAAA0IgEDeIgCByIACBhIAAA1IAAAZQAAAOgEAKQgFAKgJAEQgJAHgJADQgKADgMAAgAhABGQgXAVgLAdQgLAcAAAjIAAAHQAAAmAQAaQARAZAgANIASAEIARABIANAAIADgBQgHgZgEgcQgEgbAAgeIAAhAIAAg5QABgVABgIQgTABgnAhgABhk9IAAABQAAADACAFQADAGAFAHQAGALAEANIAGAcIAFAjQABALABAAIADAAQAFgCACgGQACgFAAgKIAAgCQAAgYgHgVQgHgVgOgSQgKgLgFgBIgCABg");
	this.shape_13.setTransform(1170.625,84.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#282E46").s().p("ADnF7QgMAAgIgHQgHgHgFgOIgBgKIAAgMIAAgyIADiJIABg+IABhUIABiHQAAg6gCgiQgBgigEgLQgDgNgDgGQgDgHgDAAIgBgBIgFgBQgLAAgLAIQgLAHgLAPQgGAKgGAMQgGANgFAQQgEANgEASQgFASgDAYQgEATgCAVQgBAVAAAYIABEkIAABzQAAAMgGAIQgGAIgMAEIgEABIgFAAQgKAAgIgFQgHgGgFgMIgCgjIABhSIgDkWIgBijQgDgcgDgTQgDgTgEgJQgDgJgDgEQgDgFgCAAQgHABgHAFQgHAEgHAIQgOAPgKAXQgKAXgHAfQgIA1gEBGQgFBFAABXIACBRIAFB/IAAALQAAATgGANQgFAOgLAIQgKAGgLADQgKACgKAAIgEAAQgVAAgTgPQgSgRgQghQgNgdgIgoQgJgogGgyQgFg9gDguQgCgtAAghQAAhiAFhCQAFhCAJgiQADgPAEgLQAEgMAGgHQAZgiAnAAIADAAQAPAAALAEQALAEAHAIQALAKAIAMQAHAMADANIAAACIABABQAYgdALgHQAhgTAWAAQAPAAAOAIQAOAJANAPQAHAJAKAbIABAAQAEgIAIgKQAGgJAKgKQAUgSATgJQATgJASAAQAeAAAVARQAUARAJAhQAGASADAlQADAkAAA3QAADigGDRIAABCQAAAPgGAIQgHAKgNAEIgGAAgAjSk3QgGAMgHAWIgEAWQgDANgBAQIACATQACAGADAAQAGgDADgHQADgGAAgJIAHg7IAFgiIAAgBIAAgBIgBgBQgEAAgFALg");
	this.shape_14.setTransform(1117.825,84.4972);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#282E46").s().p("AgXFjQgYgLgZgZIgRgUQgPgUgMgXQgMgXgJgYQgHgQgFgTQgGgUgFgYQgRheAAhJQgBhKAOg8QAPg9AdguQAng6A5gWQAMgEAMgCIAVgCIADAAQAjAAAeATQAdASAZAkQAFAIAEAMQAEALAEARQAGAWACARQACARAAALQADAjABAgIABA+IAAALQAAAQgFALQgGAKgLADQgGADgNABIghABIhJACIgjABQAAAUAEAjIAMBVQAFAdAHAVQAFAUAHAPIANAYQAIANAKAMIACABIABACIABAAQALgJAJgUQAJgVAHgfIAKgoIAHgUQAGgGAGgDQAHgEAHAAQALAAAIAHQAIAGAEAMIAAAEIAAAEIAAACQAAAHgGAaIgSBDQgFAOgIANQgHAOgIANQgTAXgZALQgZALgfAAQgZAAgYgMgABZg6IAVABIAAgKQAAgygCgmQgDgmgFgbQgEgQgHgMQgGgMgIgJIgVgQQgHgGgCAAQgSAXgLAbQgLAagFAeQgEAdgDAfQgDAgAAAhIAAADIAtgBIAcgBIAaABgAhHkoQgOANgQAWQgKAQgFANQgEANAAAJIAAACIABAJQAAABAAABQABAAAAABQABAAAAAAQABAAAAAAQAFgCAFgGQAEgHAEgLQAAgDAGgLIASggIANgSIAUgYIgCgCIgDAAQgMADgNANg");
	this.shape_15.setTransform(1065.6741,85.725);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#282E46").s().p("AgwHiQgPgGgOgLQgOgQgKgOQgJgNgCgLQgIgSgEhJQgEhKAAiBIgfAAQgGgBgGgDQgHgEgFgHIgEgHIgBgFIAAgFQAAgNAIgHQAIgHAOgCIASgDIAMgDIAAggIAAgpIAAgkQADjPAEAAQABghADgUQADgTADgHQAGgaALgXQAMgXAPgUIAXgVQAJgIAFgBQARgKAQgFQAQgEARAAIAPAAQAiAAAeAPQAdAPAYAgQAGAJAEALQAGAMACAOIACALIABAJIAAAMQAAAegIAPQgHAPgQAAIgDAAQgJAAgGgGQgGgFgEgNIgBgEIABgRIAAgKQAAgKgFgLQgEgMgIgOIgQgPQgGgFgDAAQgVAAgFCDIgBANIgBAaIAAApIABA/IgBBdIAABQIABAAIAmAAIAkgCQANAAAJADQAJADADAFQAEAEACAGQACAGAAAHQAAANgGAIQgGAIgOAEIhFADIgYABIAAAWIABA2IACB1QAABhgGATQgHAXgJAQQgKAPgMAIIgPAGQgHACgKAAQgSAAgPgFgAgpmlQgKAMgLAWQgJAWgEATQgFAUAAARIAAAPQAAAEADACQADAAADgDQADgEADgHQADgUAFgSIAHgiQAGgPAIgPQAIgOAMgNIABgEIgCgBIgCAAQgLADgLAMg");
	this.shape_16.setTransform(1022.375,73.075);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#282E46").s().p("ABaHYIgOgPIgSgYIgOAQIgKAMQgPAMgPAGQgOAGgSAAQgRAAgSgHQgTgHgVgNQgfgagTgaQgTgbgPgpQgQgogKg3QgIgmgEglQgDgmAAgjIAAgJIAAgGIAAgGIAAgHQAAh8AuhqQAGgNAIgOIAUgdQAcgdAQgIQAQgJANgFQANgFAMAAIAGAAQAUABAUAKQATAKATAUIAFhOQAEgeADgIQAFgZAGgVIAMgkQALgbAMgNQANgOAPAAIAEAAQAPAAATAHQASAIAXAPQAGAFADAIQAFAIACAKQAHAiAEAhQADAhAAAhIgHEAIAABBIACB9QgDAjgBA6IgDCOQAAAMgFAQQgEAPgJATQgGAMgJAIQgJAIgMAEIgJACIgLACQgaAAgbgPgAhKjEQgOAKgRATQgJAPgJARQgJASgHAXQgMApgGAoQgGAnAAAmIAAANQAAAzAFAtQAFAsAJAnQAFAVAGAUQAHAUAJAUQAFAKAIAMIATAYQALANAJAGQAJAHAFABIAOAFIAKACQANAAANgPQALgPAMgeIAEgHIAIgUQgDghgBg7IgBiTIAAhNIgBhMQgBgZgCAAIgLgoQgGgRgGgNQgKgZgMgMQgNgLgOAAQgNAAgOAJgACmmsIgBABIAAAIQAMAoAAAjQACAeACAPQADAQADAAQAGgDADgGQACgGAAgKIAAgfQAAgXgFgVQgFgWgKgSQgGgGgDAAIgDABg");
	this.shape_17.setTransform(947.425,73.825);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#282E46").s().p("AgXFjQgYgLgZgZIgRgUQgPgUgMgXQgMgXgJgYQgHgQgFgTQgGgUgFgYQgRheAAhJQgBhKAOg8QAPg9AdguQAng6A5gWQAMgEAMgCIAVgCIADAAQAjAAAeATQAdASAZAkQAFAIAEAMQAEALAEARQAGAWACARQACARAAALQADAjABAgIABA+IAAALQAAAQgFALQgGAKgLADQgGADgNABIghABIhJACIgjABQAAAUAEAjIAMBVQAFAdAHAVQAFAUAHAPIANAYQAIANAKAMIACABIABACIABAAQALgJAJgUQAJgVAHgfIAKgoIAHgUQAGgGAGgDQAHgEAHAAQALAAAIAHQAIAGAEAMIAAAEIAAAEIAAACQAAAHgGAaIgSBDQgFAOgIANQgHAOgIANQgTAXgZALQgZALgfAAQgZAAgYgMgABZg6IAVABIAAgKQAAgygCgmQgDgmgFgbQgEgQgHgMQgGgMgIgJIgVgQQgHgGgCAAQgSAXgLAbQgLAagFAeQgEAdgDAfQgDAgAAAhIAAADIAtgBIAcgBIAaABgAhHkoQgOANgQAWQgKAQgFANQgEANAAAJIAAACIABAJQAAABAAABQABAAAAABQABAAAAAAQABAAAAAAQAFgCAFgGQAEgHAEgLQAAgDAGgLIASggIANgSIAUgYIgCgCIgDAAQgMADgNANg");
	this.shape_18.setTransform(898.8241,85.725);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#282E46").s().p("ADnF7QgMAAgIgHQgHgHgFgOIgBgKIAAgMIAAgyIADiJIABg+IABhUIABiHQAAg6gCgiQgBgigEgLQgDgNgDgGQgDgHgDAAIgBgBIgFgBQgLAAgLAIQgLAHgLAPQgGAKgGAMQgGANgFAQQgEANgEASQgFASgDAYQgEATgCAVQgBAVAAAYIABEkIAABzQAAAMgGAIQgGAIgMAEIgEABIgFAAQgKAAgIgFQgHgGgFgMIgCgjIABhSIgDkWIgBijQgDgcgDgTQgDgTgEgJQgDgJgDgEQgDgFgCAAQgHABgHAFQgHAEgHAIQgOAPgKAXQgKAXgHAfQgIA1gEBGQgFBFAABXIACBRIAFB/IAAALQAAATgGANQgFAOgLAIQgKAGgLADQgKACgKAAIgEAAQgVAAgTgPQgSgRgQghQgNgdgIgoQgJgogGgyQgFg9gDguQgCgtAAghQAAhiAFhCQAFhCAJgiQADgPAEgLQAEgMAGgHQAZgiAnAAIADAAQAPAAALAEQALAEAHAIQALAKAIAMQAHAMADANIAAACIABABQAYgdALgHQAhgTAWAAQAPAAAOAIQAOAJANAPQAHAJAKAbIABAAQAEgIAIgKQAGgJAKgKQAUgSATgJQATgJASAAQAeAAAVARQAUARAJAhQAGASADAlQADAkAAA3QAADigGDRIAABCQAAAPgGAIQgHAKgNAEIgGAAgAjSk3QgGAMgHAWIgEAWQgDANgBAQIACATQACAGADAAQAGgDADgHQADgGAAgJIAHg7IAFgiIAAgBIAAgBIgBgBQgEAAgFALg");
	this.shape_19.setTransform(847.825,84.4972);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#282E46").s().p("ABrF9QgRAAgOgFQgQgFgNgLIgfAEIgXABQgZAAgYgGQgXgIgVgOQgugdgTg5IgGgdQgDgOAAgNIAAgRQAAhUA4hBQAUgTARgLQASgMAOgFQAIgDALgCIAYgFQACgQAAgYIAAg3IAAguQAAgtgCgbQgBgagEgIQgGgWgLAAQgFAAgHAIQgHAIgLAOQgIAMgFAUQgEAUAAAaQAAATgCAKQgBALgDACQgGAIgFADQgGAEgFAAIgFAAQgLAAgIgGQgIgGgDgNIgBgLIAAgJIAAggQAAgdAJgbQAKgcAUgbQAOgRANgLQAOgLALgGQAUgHAUgEQAUgEAWAAIAFAAQAeAAAZANQAaAMAVAZQARAXAIAlQAJAlAAA0IgEDeIgCByIACBhIAAA1IAAAZQAAAOgEAKQgFAKgJAEQgJAHgJADQgKADgMAAgAhABGQgXAVgLAdQgLAcAAAjIAAAHQAAAmAQAaQARAZAgANIASAEIARABIANAAIADgBQgHgZgEgcQgEgbAAgeIAAhAIAAg5QABgVABgIQgTABgnAhgABhk9IAAABQAAADACAFQADAGAFAHQAGALAEANIAGAcIAFAjQABALABAAIADAAQAFgCACgGQACgFAAgKIAAgCQAAgYgHgVQgHgVgOgSQgKgLgFgBIgCABg");
	this.shape_20.setTransform(796.175,84.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#282E46").s().p("ACWF7QgGAAgHgFQgGgGgGgKQgCgDgBgLIgBgeQgCgagBhQQgBhRgBiEIADifQAAg4gGghQgGgigNgLIgGgBQgPAAgNAKQgNALgKAUQgOAagJApQgKApgFA4QgEAhgBAxIgCB0IACBOIAFCCIAAAEIABACQgGATgHANQgHAMgKAGIgSAHQgJADgIAAQgfAAgngzQgNgZgQhDQgIgsgEgqQgEgqgBgpIgDhEIgBhEIABhPQABgqAEgvQAFgfAFgYQAFgXAGgNQANgYASgNQAUgMAaAAQATAAAQAMQARALANAYIAGAUIAIgHIASgUQAQgPASgHQASgHATAAIACAAQAdAAATASQAUARAMAjQAIAUADAgQAEAhAAAtIAAAIIgBBmIgBAoIAAAuIABCcQAABMADBIIAAAUQgFAMgGAHQgIAHgJAAgAiHk0QgFAOgHAcIgEAVQgCAMAAAMIADAVQACAHADAAIAAAAQAHgDADgIQADgIAAgOQABgaACgTQACgRABgHIADgJIACgPIgCgBIgDgBQgEAAgFANg");
	this.shape_21.setTransform(752.3,84.7);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#282E46").s().p("AgaFtQgRgGgRgNQgQgRgJgLQgJgMgDgGQgLgSgLgXQgKgWgKgaQgKgcgHgcQgIgdgFgeIgIg4IgDgpIABgDIAAgEQAAgsAGgxQAHgxAOg1QAIgaAMgaQANgbAQgaQAMgSARgNQARgNAXgHQAggMAWAAQASACASAIQATAIATANIAYAbQAJALACAHQAaAuANBQQANBRAAByQAAAqgFArQgFArgLAtQgJAegJAWQgJAWgJAQQgbApgcAVQgdAVggAAQgRAAgRgHgAAtkKQgHAPgMAeQgPAwgIAxQgHAxAAAwIAAAVQAABGAMBGQAMBHAaBGIACACQAVgVAJgWQAHgOAEgPQAGgPADgPQAJgmAEgjQAEgkAAghIAAguQAAgZgCgjQgDgigFgtQgEgbgGgWQgFgWgGgRQgEgKgGgKIgPgUIgCgBIgBAAQgDgBgIAQgAhHkvQgNAMgSAYIgQAdQgFAMgCAIIAAAEIAAAFIABAHQABADADACQAEAAAGgLQAHgMAJgVQAJgZAjgqQABAAAAAAQAAAAABgBQAAAAABgBQAAAAAAgBIAAgCIgBgBIgBgCIgBAAQgIABgNAMg");
	this.shape_22.setTransform(682.825,84.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#282E46").s().p("ABkFxQgRgIgOgQQgJgKgHgMQgGgMgEgNIgIgZIgIghIgBAAQgFAWgGARQgGARgGAMQgQAfgXAPQgXAPgdAAQgUAAgSgHQgTgIgSgPQgNgOgIgOQgKgNgFgOQgJgXgJggQgKgfgJgoQgJgqgLhEQgLhDgNhgIgLhpQgDgsAAgcIAAgNQAAgQACgLQADgLAGgGQAGgNAQgHQAQgHAZAAQAeAAAUASQAVARALAiQAGARAEASIAHAlIAKBVIAQCVQAKBXALA7QAMA7ALAfIAFAMIACAEIABAAQAGgSAEgUQAEgVAEgZQALhZAGg9QAFg7AAggQABgUADgVQAEgWAIgYQADgJAGgHQAHgIAJgEIAKgEIAIAAIAFAAQAOgBAMAKQAMAJAIAUQAGANADAdQADAeAAAuQAHBaAGBAQAGBAAGAnIAGAiQACAOADAIIABACIABAEQADgEAEgNQAFgMAFgVIAOhIQAFgaAAgIQAFgfAEgxQAEgwAEhEIAKieQAGhEAGgwQAJgZAUAAIADAAQAJAAAHAGQAIAFAFALIABAGIABAHQgGBBgHBbIgODQIgJBcQgEAogGAfQgJAtgKAhQgJAhgJATQgJATgLAMQgLAMgNAEQgPAHgRAAQgTAAgRgIgAkGlJIgCAFQgEAGgBAJQgCAKAAAMIAAAEQAAAdAGAYQAFAZALAUIADACQABAAABgFIABgQIAAgDIgBgdIgHgtIgBgwIgCgBIgCgBIgCAAQgBAAAAAAQgBABAAAAQgBAAAAAAQAAABgBAAg");
	this.shape_23.setTransform(629.625,85.275);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#282E46").s().p("ABMHrQgjAAgegOQgdgOgageQgTgZgMgVQgNgWgGgUQgFgIgEgUQgGgTgFggQgDgIgBgtQgCgsAAhOIAAiOIAAgxIABhbIgfgBIgagBQgKAAgHgGQgHgGgDgMIAAgHQAAgJAFgGQAFgHAJgEQAGgDARgCIAugDIADgZIADgvQAIgnAJgdQAIgcAIgUQAKgWAMgMQALgKANgBIADAAQAQABASAHQAUAHAWAPQAJAHAHAZQAHAZAEAtIACAfIABApIAAALIgBAQIATAAQAdAAAQACQAQABAEADQAIAGAEAHQAEAHAAAHIAAAEQAAALgHAHQgGAIgMAFIg1AAIgYAAIgDA3IgBBYIAAA9IACCAQgDBFAAAbIAAAvQAAAzAFAhQAEAfAKANQADAFADACQAEADAEAAQALAAAGgKQAHgKADgVQACgFACgRIAEgqQAAgRAFgLQAFgLALgEIAFgBIAEgBIAHAAQAJAAAGAGQAHAGAFAMIABAFIAAAGQAAAigFAgQgFAfgJAeQgNAegaAOQgYAOglAAgAg2mjQgGAOgEAOQgFAOgDAPIgDAaIgBAOIAAABIACAUQABALADAKIACACQAGgJAMhSQAGgaACgSIAFgaIAAgCIAAgCIgDgBQgFAAgJAZg");
	this.shape_24.setTransform(573.175,74);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#282E46").s().p("ABMHrQgjAAgegOQgdgOgageQgTgZgMgVQgNgWgGgUQgFgIgEgUQgGgTgFggQgDgIgBgtQgCgsAAhOIAAiOIAAgxIABhbIgfgBIgagBQgKAAgHgGQgHgGgDgMIAAgHQAAgJAFgGQAFgHAJgEQAGgDARgCIAugDIADgZIADgvQAIgnAJgdQAIgcAIgUQAKgWAMgMQALgKANgBIADAAQAQABASAHQAUAHAWAPQAJAHAHAZQAHAZAEAtIACAfIABApIAAALIgBAQIATAAQAdAAAQACQAQABAEADQAIAGAEAHQAEAHAAAHIAAAEQAAALgHAHQgGAIgMAFIg1AAIgYAAIgDA3IgBBYIAAA9IACCAQgDBFAAAbIAAAvQAAAzAFAhQAEAfAKANQADAFADACQAEADAEAAQALAAAGgKQAHgKADgVQACgFACgRIAEgqQAAgRAFgLQAFgLALgEIAFgBIAEgBIAHAAQAJAAAGAGQAHAGAFAMIABAFIAAAGQAAAigFAgQgFAfgJAeQgNAegaAOQgYAOglAAgAg2mjQgGAOgEAOQgFAOgDAPIgDAaIgBAOIAAABIACAUQABALADAKIACACQAGgJAMhSQAGgaACgSIAFgaIAAgCIAAgCIgDgBQgFAAgJAZg");
	this.shape_25.setTransform(498.575,74);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#282E46").s().p("AgGF4QgjgBgjgUQgRgNgLgMQgLgMgGgLQgNgQgJgbQgJgbgGglIgBgJIgCgMQAAgHAJgOIALgHQAFgDAGABIADAAQAKAAAIAFQAIAIAEANQAGAfAGAWQAGAWAHALQALATAMAJQAMAJANAAQALgGAIgLQAIgMAGgRIACgMIACgTQAAgmgRgwQgSgvgkg6IguhUQgTgigIgUQgNgegHgaQgGgaAAgXIAAgBQAAgPAEgSQAEgTAHgVQALgYARgSQARgSAYgOQAPgGAPgEQAOgEAOAAIADAAQASABAVAHQAUAJAWAQQASASALAOQALAOADAJQAJAVAFAXQAFAYAAAaIAAACQAAAagGAPQgGAPgNAFIgIACQgKAAgHgHQgHgGgEgMIAAgBIAAgTIAAgKQAAgRgFgTQgEgUgKgWQgCgFgGgHIgOgPIgBgBQgLAGgFAPQgFAQAAAYQAAAQAIAXQAJAWATAeQgBABALARIAgA0QANAWAKAVQAKAUAHARQAlBjAABEIAAAFQAAAkgLAiQgMAhgXAcQgaAggPAFQgUALgSAGQgSAFgRABgAhbk+QgKAKgNAVQgKAQgEANQgFAMAAALIAAABIgBADQAAAOAEALQADAMAHAIIABAAIABAAQAAgZAGgZQAFgYAMgaIANgSIAPgUIAAAAQAAgCgFgBQgIAAgLAJg");
	this.shape_26.setTransform(460.475,84.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#282E46").s().p("ABrF9QgRAAgOgFQgQgFgNgLIgfAEIgXABQgZAAgYgGQgXgIgVgOQgugdgTg5IgGgdQgDgOAAgNIAAgRQAAhUA4hBQAUgTARgLQASgMAOgFQAIgDALgCIAYgFQACgQAAgYIAAg3IAAguQAAgtgCgbQgBgagEgIQgGgWgLAAQgFAAgHAIQgHAIgLAOQgIAMgFAUQgEAUAAAaQAAATgCAKQgBALgDACQgGAIgFADQgGAEgFAAIgFAAQgLAAgIgGQgIgGgDgNIgBgLIAAgJIAAggQAAgdAJgbQAKgcAUgbQAOgRANgLQAOgLALgGQAUgHAUgEQAUgEAWAAIAFAAQAeAAAZANQAaAMAVAZQARAXAIAlQAJAlAAA0IgEDeIgCByIACBhIAAA1IAAAZQAAAOgEAKQgFAKgJAEQgJAHgJADQgKADgMAAgAhABGQgXAVgLAdQgLAcAAAjIAAAHQAAAmAQAaQARAZAgANIASAEIARABIANAAIADgBQgHgZgEgcQgEgbAAgeIAAhAIAAg5QABgVABgIQgTABgnAhgABhk9IAAABQAAADACAFQADAGAFAHQAGALAEANIAGAcIAFAjQABALABAAIADAAQAFgCACgGQACgFAAgKIAAgCQAAgYgHgVQgHgVgOgSQgKgLgFgBIgCABg");
	this.shape_27.setTransform(419.125,84.475);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#282E46").s().p("AgXFjQgYgLgZgZIgRgUQgPgUgMgXQgMgXgJgYQgHgQgFgTQgGgUgFgYQgRheAAhJQgBhKAOg8QAPg9AdguQAng6A5gWQAMgEAMgCIAVgCIADAAQAjAAAeATQAdASAZAkQAFAIAEAMQAEALAEARQAGAWACARQACARAAALQADAjABAgIABA+IAAALQAAAQgFALQgGAKgLADQgGADgNABIghABIhJACIgjABQAAAUAEAjIAMBVQAFAdAHAVQAFAUAHAPIANAYQAIANAKAMIACABIABACIABAAQALgJAJgUQAJgVAHgfIAKgoIAHgUQAGgGAGgDQAHgEAHAAQALAAAIAHQAIAGAEAMIAAAEIAAAEIAAACQAAAHgGAaIgSBDQgFAOgIANQgHAOgIANQgTAXgZALQgZALgfAAQgZAAgYgMgABZg6IAVABIAAgKQAAgygCgmQgDgmgFgbQgEgQgHgMQgGgMgIgJIgVgQQgHgGgCAAQgSAXgLAbQgLAagFAeQgEAdgDAfQgDAgAAAhIAAADIAtgBIAcgBIAaABgAhHkoQgOANgQAWQgKAQgFANQgEANAAAJIAAACIABAJQAAABAAABQABAAAAABQABAAAAAAQABAAAAAAQAFgCAFgGQAEgHAEgLQAAgDAGgLIASggIANgSIAUgYIgCgCIgDAAQgMADgNANg");
	this.shape_28.setTransform(377.0241,85.725);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#282E46").s().p("AgSHhQgPgFgNgKQgTgVgKgQQgJgQgBgMQgHgQgDhNQgDhNABiJIgChPIAAg6IgBgHIAAgFQAAg9AEhDQAChDAGhIQAGglAPgxQAIgaAJgRQAIgRAJgIQAGgFAHgCQAHgDAJAAQAPAAATAHQATAHAWAQQAGAGAFAIQADAIABAIQAPBJAAA0IAAAFIgBAvIgGB1IgBAtIAAAbIABBAIABCUIgDBjIgECNQAAAZgUAnQgLAPgOAIQgNAIgRAAQgPAAgQgGgAgsmZQgHAQgGAYQgFAWgDASQgCASABAPIAAAMQABAEADACQAFAAADgJQADgKADgSIADgVIAGgkIAHgbIAHgaIAAgDIgCgBIgDgBQgGAGgIAPg");
	this.shape_29.setTransform(341.1,73.325);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#282E46").s().p("ABMHrQgjAAgegOQgdgOgageQgTgZgMgVQgNgWgGgUQgFgIgEgUQgGgTgFggQgDgIgBgtQgCgsAAhOIAAiOIAAgxIABhbIgfgBIgagBQgKAAgHgGQgHgGgDgMIAAgHQAAgJAFgGQAFgHAJgEQAGgDARgCIAugDIADgZIADgvQAIgnAJgdQAIgcAIgUQAKgWAMgMQALgKANgBIADAAQAQABASAHQAUAHAWAPQAJAHAHAZQAHAZAEAtIACAfIABApIAAALIgBAQIATAAQAdAAAQACQAQABAEADQAIAGAEAHQAEAHAAAHIAAAEQAAALgHAHQgGAIgMAFIg1AAIgYAAIgDA3IgBBYIAAA9IACCAQgDBFAAAbIAAAvQAAAzAFAhQAEAfAKANQADAFADACQAEADAEAAQALAAAGgKQAHgKADgVQACgFACgRIAEgqQAAgRAFgLQAFgLALgEIAFgBIAEgBIAHAAQAJAAAGAGQAHAGAFAMIABAFIAAAGQAAAigFAgQgFAfgJAeQgNAegaAOQgYAOglAAgAg2mjQgGAOgEAOQgFAOgDAPIgDAaIgBAOIAAABIACAUQABALADAKIACACQAGgJAMhSQAGgaACgSIAFgaIAAgCIAAgCIgDgBQgFAAgJAZg");
	this.shape_30.setTransform(274.075,74);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#282E46").s().p("AivHnQgKAAgIgHQgHgHgFgNIAAgEIAAgEIAAgTQAAhSAIhiQAIhiAPhyIAOhhQgHgEgDgHQgEgFAAgGIAAgDQABgKAFgHQAGgIALgFIAViDQAIgwAJgmQAIgkAJgZQAFgNAHgNQAGgMAJgLQASgYAVgMQAWgMAXAAIAKAAQAjAAAjAYQATARAMARQANASAEATQAGAUAFAXIAJAxQAEAkAHBWQAFBVAHCHQALCCAFBXQAEBXAAArQAAAZgGAUQgGATgNAOQgHAEgJADQgKACgKABQgkAAgYgSQgZgTgNgjQgEgJgDgTQgEgTgBgfQgDgjgDhfIgGj5Ih1AAIgDAPIgGArQgTB+gIBgQgJBfAABCQgBApgBAUQgCAUgDAAQgFAIgHAEQgGAEgIAAgAAUh3QAAgigEg2QgDg2gIhKQgFgggFgRQgFgRgFAAIgBAAQgCABgDAEQgDAFgEAKQgIASgGAVQgHAUgFAWIgPBWIgOBfIAGAAIBhAAIAAAAgABUmhIALAaQAHATAGAYQAGAaAGAfIABAEIABABQAEAAACgEQACgDAAgHIAAgGQAAgUgHgZQgIgYgNgbQgIgOgGgFQgGgHgDAAIAFALg");
	this.shape_31.setTransform(230.95,74.45);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#282E46").s().p("AgeAzQgOgIgKgQIgEgOQgCgHAAgHQAAgOAHgLQAHgMANgKQAHgFAJgDQAIgCAJgBQASAAAOAJQAOAJAJARQADAGABAGQACAGgBAGQAAAUgLAPQgMAOgXAJIgKABIgEABQgQAAgOgJgAgegeQgFAFgEAKIgBAGIAAAEIAAACQAAAUAMAKIACggIAEgJIAIgPIAAgDIgHgCQgFAAgEAEg");
	this.shape_32.setTransform(170.8063,116.525);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#282E46").s().p("AAhHfQgIgEgFgHQgNgMgHgLQgFgLgDgJQgGgXgDgPQgDgRAAgJQgEgLgBg3QgCg3AAhjIAAguIACiiIAEkPIAAgBIABgEIgBgBIAAgCIgBAAQgQAbgNAYQgMAXgHAWQgJAVgUAAQgJAAgGgGQgHgGgEgLIgBgFIAAgEQALhEA4hOQATgbAYgSQAXgSAcgIIAKgDIAIAAIAGAAQAVAAAQAPQARAQAMAfIACAeIABAgIAAARIgCClIgDE3IAAAtIAABiIADB0IAAADQAAASgFAPQgGAPgMALQgKANgOAGQgNAGgPAAQgKAAgIgDgABSmbIAEA1IACA+IADALQAAABAAAAQABABAAAAQAAABABAAQAAAAAAAAIABAAQAGgDACgGQACgFAAgKIAAgDQAAgggEgaQgEgagJgVIgFAAg");
	this.shape_33.setTransform(140.4375,74.075);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#282E46").s().p("AglAzQgQgIgMgQQgDgGgCgIQgCgHAAgHQAAgOAIgLQAIgMAQgKQAIgFALgDQAKgCAKgBQAWAAASAJQAQAJAMARQADAGABAGQACAGAAAGQAAAUgOAPQgOAOgcAJIgMABIgFABQgUAAgRgJgAglgeQgFAFgFAKIgBAGIgBAEIAAACQAAAUAPAKIADggIAFgJIAJgPIAAgDIgIgCQgGAAgGAEg");
	this.shape_34.setTransform(1692.455,116.525);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#282E46").s().p("AhDF7QglAAgcgXQgdgVgTgsQgHgMgGgjQgFgjgEg7QgCgYgBglIgBhZIABhBIAAgrIgBg1IAAggIAAhAQAAgoANgbQALgaAagNQAEgFAJgDIATgEIANgCIAOgBQAVAAASALQATALARAWIAEAJIAEANIABAAQAPgTAVgOQAVgOAZgIIARgCIARgCQAYAAAVAKQATAKAPAUQAHAKAGARQAFARAFAXIABAMIABAIQAAANgHAKQgHAJgPAFIgFABIgEAAIgEAAQgNAAgJgHQgIgGgFgNQgEgjgHgSQgGgSgKAAQgYAAgaAcQgIAJgFAMQgEAMgEAOQgHARgGAkQgHAlgGA5IgDAYIAAAYIADDRIADCOQAAAUgFANQgFANgMAGQgHAFgMACQgNACgTAAgAiblJQgHAMgKAaQgGAVgDAPQgCAQgBAKQAAAJACAJIAHATIABABQAIgKADgLQADgLAAgKIAHgnIAGgdIAIgYIAEgMIAAgCIgBgBIgDgBQgHAAgJAMg");
	this.shape_35.setTransform(1654.65,85.275);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#282E46").s().p("AgbFjQgegLgegZIgUgUQgSgUgPgXQgOgXgMgYQgHgQgHgTQgHgUgGgYQgVheAAhJQgBhKASg8QARg9AjguQAvg6BFgWQAPgEAOgCQAMgCAOAAIAEAAQAqAAAjATQAkASAeAkQAFAIAGAMQAFALAFARQAGAWADARQADARAAALQADAjACAgIABA+IAAALQAAAQgHALQgGAKgOADQgHADgQABIgoABIhYACIgqABQAAAUAFAjQAEAjAKAyQAHAdAHAVQAHAUAIAPIAPAYIAWAZIADABIABACIABAAQAOgJAKgUQALgVAJgfIAMgoIAIgUQAHgGAIgDQAIgEAJAAQANAAAJAHQAKAGAFAMIAAAEIAAAEIAAACQAAAHgHAaIgWBDQgGAOgJANQgJAOgKANQgXAXgeALQgeALglAAQgfAAgcgMgABrg6IAaABIAAgKQAAgygDgmQgDgmgGgbQgFgQgIgMQgIgMgJgJIgZgQQgJgGgDAAQgVAXgOAbQgNAagGAeQgFAdgDAfQgEAgAAAhIAAADIA3gBIAhgBIAfABgAhWkoQgRANgTAWQgMAQgFANQgGANAAAJIAAACIABAJQABADADAAQAGgCAFgGQAGgHAFgLQAAgDAHgLIAWggIAQgSIAXgYIgCgCIgEAAQgOADgQANg");
	this.shape_36.setTransform(1602.0743,85.725);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#282E46").s().p("AixHTQgdgTgTgnIgFgUQgDgRgDgdQgDgJgChPIgBjkQgBgDAAgVIAAg8QAAg7ADhCQAEhCAHhKQAFgaAHgXQAHgXAIgTQAJgWAJgPQAJgPAIgHQAIgGAKgEQAJgDALAAQASAAAWAHQAWAHAcAOQAJAFAIARQAIASAFAeQAEAYABAWQACAXAAAVIAAACIAAAyIgFBEIAYgeQAbgbAdgPQAdgOAeAAIAIAAQAUAAASAJQAQAIAPARQASAUAIA4QAJA4AABcQAAAvgDBcIgJDjIACBTQAAAKgFAHQgGAIgMAFIgFACIgEABIgPAAQgNAAgOgSQgEgFgBgYQgBgYgBgpIALkRIAAgdIABhHQAAiOgVgqIgDgCIgFgBQgXAAgXAUQgVATgXAnQgNAYgMAjQgMAjgMArIgFATIgBAJIAABtIgDBbIgDCHQAAALgDAOQgEANgHAQQgMAZgUAMQgTAMgbAAQgpAAgdgTgAihmcQgFAGgGAKQgNAZgGAbQgIAbABAeQAAAGABAEIAFAFQAHgDAEgGQAEgGgBgJQAGgkAEgaQAGgZAFgPIAMgWIgEgCIgDAAQgEADgFAHg");
	this.shape_37.setTransform(1547.7,73.375);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#282E46").s().p("ABdHrQgrAAglgOQgjgOgfgeQgYgZgOgVQgPgWgIgUQgFgIgGgUQgGgTgHggQgDgIgCgtQgCgsAAhOIAAiOIAAgxIAChbIgmgBIgggBQgMAAgIgGQgIgGgFgMIAAgHQAAgJAHgGQAFgHAMgEQAHgDAVgCIA3gDIADgZIAFgvQAJgnAKgdQAKgcAKgUQAMgWAOgMQAOgKAQgBIAEAAQATABAWAHQAYAHAaAPQALAHAIAZQAJAZAEAtQACANABASQACATAAAWIAAALIgCAQIAXAAQAjAAAUACQATABAFADQAJAGAFAHQAFAHgBAHIAAAEQAAALgHAHQgIAIgPAFIhAAAIgdAAIgDA3IgCBYIABA9IACCAQgDBFgBAbIAAAvQABAzAFAhQAGAfAMANQADAFAFACQAEADAEAAQANAAAJgKQAHgKAEgVQACgFADgRIAEgqQABgRAGgLQAHgLAMgEIAHgBIAEgBIAIAAQALAAAIAGQAIAGAGAMIACAFIAAAGQAAAigHAgQgFAfgMAeQgPAegfAOQgeAOgsAAgAhCmjIgMAcIgJAdIgEAaIgBAOIAAABIACAUQACALAEAKIACACQAHgJAPhSQAGgaAEgSIAFgaIAAgCIAAgCIgDgBQgHAAgLAZg");
	this.shape_38.setTransform(1488.25,74);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#282E46").s().p("AggFtQgUgGgUgNQgUgRgKgLQgLgMgEgGQgOgSgMgXQgNgWgLgaQgMgcgJgcQgKgdgGgeQgGgfgDgZIgFgpIACgDIAAgEQgBgsAJgxQAHgxASg1QAJgaAPgaQAPgbATgaQAOgSAVgNQAVgNAbgHQAngMAcAAQAVACAWAIQAXAIAXANIAdAbQAKALADAHQAfAuARBQQAPBRAAByQAAAqgGArQgHArgNAtQgKAegLAWQgLAWgLAQQggApgjAVQgiAVgnAAQgUAAgWgHgAA2kKIgWAtQgTAwgKAxQgHAxgBAwIAAAVQAABGAOBGQAQBHAeBGIADACQAZgVAMgWQAHgOAGgPQAGgPAFgPQAKgmAFgjQAFgkAAghIAAguQAAgZgDgjQgDgigGgtQgFgbgHgWQgHgWgHgRQgFgKgHgKQgIgJgJgLIgDgBIgCAAQgDgBgKAQgAhWkvQgPAMgXAYQgLAQgHANQgHAMgCAIIAAAEIAAAFIABAHQABADAEACQAFAAAIgLQAHgMAMgVQALgZAqgqQABAAAAAAQAAAAABgBQAAAAABgBQAAAAABgBIAAgCIgBgBIgCgCIgBAAQgJABgRAMg");
	this.shape_39.setTransform(1439.6,84.4);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#282E46").s().p("AixHTQgdgTgSgnIgGgUQgDgRgDgdQgDgJgChPIAAjkQgBgDAAgVIgBg8QAAg7ADhCQAEhCAHhKQAFgaAHgXQAHgXAIgTQAJgWAJgPQAJgPAIgHQAJgGAJgEQAJgDALAAQASAAAWAHQAWAHAbAOQAKAFAIARQAIASAFAeQADAYACAWQACAXAAAVIAAACIgBAyIgEBEIAYgeQAbgbAdgPQAdgOAdAAIAIAAQAVAAASAJQAQAIAPARQARAUAJA4QAJA4AABcQAAAvgCBcIgJDjIACBTQgBAKgFAHQgHAIgLAFIgFACIgEABIgOAAQgOAAgPgSQgDgFgBgYQgCgYABgpIAKkRIAAgdIABhHQAAiOgVgqIgDgCIgFgBQgXAAgWAUQgWATgWAnQgOAYgMAjQgNAjgMArIgDATIgCAJIAABtIgDBbIgDCHQAAALgDAOQgDANgIAQQgMAZgUAMQgTAMgaAAQgpAAgegTgAihmcQgFAGgFAKQgOAZgHAbQgGAbAAAeQAAAGABAEIAEAFQAIgDAEgGQADgGABgJQAEgkAFgaQAFgZAGgPIALgWIgDgCIgCAAQgGADgEAHg");
	this.shape_40.setTransform(1353,73.375);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#282E46").s().p("AAYFwQgYAAgagIQgagIgbgQIgfgaIgSgSQgRgVgNgbQgOgcgLgfQgRg2gIg2QgIg1AAgzIAAgOQAAgsAIgsQAIgrARgqQAIgVAMgTQALgSAPgSQAWgWASgNQASgNAPgGQAagLAZgGQAXgGAWAAQAmAAAfAQQAfAQAXAgQALAXAGAUQAGAVAAASIAAAIQAAAOgGAJQgGAJgMAFIgIABIgEABQgMAAgJgGQgIgGgFgMQAAgTgFgRQgEgSgLgOIgLgFIgEgCIgDAAQgFAFgHAKIgQAaQgKAUgIAaQgHAcgFAkIgDAgIgBAlQAABLALBFQAMBEAYA8QALAWALAMQALALAMAFQAFgHAGgNQAGgMAGgUQAFgPAFgWQAFgVAEgcQACgHAFgFQAFgGAHgDIAGgCIAHgBQAPgBALAGQAJAGAGAKIABAHIABAFQAAATgHAeQgHAdgNApQgKAcgSAVQgSAVgaAOIgPAIIgcAKQgNAEgLABQgLACgJAAgAhOkuQgQAMgWAZQgNASgFAPQgHAPAAANIAAADQAAACAEAEQAEgCAEgEQAEgEADgIQAEgKAGgMQAGgMAJgNQAGgJAMgNQALgOATgQQAAgBAAAAQgBAAAAgBQAAAAgBAAQAAAAAAAAIgDAAQgIAAgQAMg");
	this.shape_41.setTransform(1297.125,86.15);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#282E46").s().p("ACBF9QgUAAgSgFQgSgFgRgLIglAEIgbABQgfAAgcgGQgdgIgZgOQg3gdgXg5QgFgQgDgNQgDgOAAgNIAAgRQAAhUBDhBQAYgTAVgLQAVgMASgFQAJgDANgCIAegFQACgQAAgYIAAg3IAAguQAAgtgCgbQgCgagEgIQgHgWgOAAQgGAAgIAIQgJAIgNAOQgKAMgGAUQgFAUAAAaQAAATgCAKQgBALgEACQgHAIgHADQgHAEgGAAIgGAAQgNAAgKgGQgJgGgEgNIgBgLIAAgJIAAggQAAgdALgbQAMgcAYgbQARgRAQgLQAQgLAOgGQAYgHAZgEQAYgEAaAAIAGAAQAkAAAfANQAfAMAaAZQAUAXAJAlQALAlAAA0IgFDeIgBByIABBhIABA1IAAAZQAAAOgFAKQgGAKgLAEQgLAHgLADQgMADgOAAgAhOBGQgbAVgOAdQgNAcAAAjIAAAHQAAAmAUAaQAUAZAnANIAVAEIAVABIAQAAIADgBQgJgZgEgcQgFgbABgeIAAhAIAAg5QAAgVACgIQgXABgwAhgAB1k9IAAABQAAADADAFQADAGAGAHQAHALAFANQAEANADAPIAGAjQACALABAAIADAAQAGgCADgGQADgFAAgKIAAgCQAAgYgJgVQgIgVgRgSQgNgLgFgBIgDABg");
	this.shape_42.setTransform(1245.825,84.475);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#282E46").s().p("AgbFjQgegLgegZIgUgUQgSgUgPgXQgOgXgMgYQgHgQgHgTQgHgUgGgYQgVheAAhJQgBhKASg8QARg9AjguQAvg6BFgWQAPgEAOgCQAMgCAOAAIAEAAQAqAAAjATQAkASAeAkQAFAIAGAMQAFALAFARQAGAWADARQADARAAALQADAjACAgIABA+IAAALQAAAQgHALQgGAKgOADQgHADgQABIgoABIhYACIgqABQAAAUAFAjQAEAjAKAyQAHAdAHAVQAHAUAIAPIAPAYIAWAZIADABIABACIABAAQAOgJAKgUQALgVAJgfIAMgoIAIgUQAHgGAIgDQAIgEAJAAQANAAAJAHQAKAGAFAMIAAAEIAAAEIAAACQAAAHgHAaIgWBDQgGAOgJANQgJAOgKANQgXAXgeALQgeALglAAQgfAAgcgMgABrg6IAaABIAAgKQAAgygDgmQgDgmgGgbQgFgQgIgMQgIgMgJgJIgZgQQgJgGgDAAQgVAXgOAbQgNAagGAeQgFAdgDAfQgEAgAAAhIAAADIA3gBIAhgBIAfABgAhWkoQgRANgTAWQgMAQgFANQgGANAAAJIAAACIABAJQAAABABABQAAAAABABQAAAAABAAQAAAAABAAQAGgCAFgGQAGgHAFgLQAAgDAHgLIAWggIAQgSIAXgYIgCgCIgEAAQgOADgQANg");
	this.shape_43.setTransform(1195.0243,85.725);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#282E46").s().p("AixHTQgdgTgSgnIgGgUQgDgRgDgdQgDgJgBhPIgBjkQgBgDAAgVIgBg8QAAg7ADhCQAEhCAHhKQAFgaAHgXQAHgXAIgTQAJgWAJgPQAIgPAJgHQAJgGAJgEQAJgDALAAQASAAAWAHQAWAHAbAOQAKAFAIARQAIASAFAeQADAYACAWQACAXAAAVIAAACIgBAyIgDBEIAXgeQAcgbAdgPQAcgOAdAAIAIAAQAVAAARAJQASAIAOARQASAUAJA4QAIA4AABcQAAAvgCBcIgJDjIACBTQAAAKgGAHQgGAIgMAFIgFACIgEABIgOAAQgOAAgPgSQgDgFgBgYQgCgYABgpIAKkRIAAgdIABhHQAAiOgVgqIgDgCIgFgBQgXAAgWAUQgWATgWAnQgOAYgMAjQgMAjgNArIgDATIgCAJIAABtIgDBbIgDCHQAAALgDAOQgEANgHAQQgMAZgTAMQgUAMgaAAQgpAAgegTgAihmcQgFAGgFAKQgOAZgHAbQgHAbAAAeQAAAGACAEIAEAFQAIgDAEgGQADgGABgJQAEgkAFgaQAFgZAGgPIALgWIgDgCIgCAAQgFADgFAHg");
	this.shape_44.setTransform(1107.65,73.375);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#282E46").s().p("ABcHrQgqAAgkgOQgkgOgggeQgXgZgOgVQgPgWgIgUQgFgIgGgUQgHgTgFggQgEgIgCgtQgCgsABhOIAAiOIAAgxIAAhbIglgBIgggBQgMAAgIgGQgIgGgEgMIAAgHQAAgJAFgGQAHgHALgEQAHgDAUgCIA5gDIACgZIAEgvQAKgnALgdQAJgcALgUQALgWAOgMQAOgKAQgBIADAAQAUABAWAHQAXAHAbAPQALAHAJAZQAHAZAFAtQADANABASQABATAAAWIAAALIgBAQIAWAAQAjAAATACQAUABAFADQAKAGAEAHQAEAHABAHIAAAEQAAALgJAHQgHAIgOAFIhAAAIgeAAIgDA3IgBBYIAAA9IACCAQgDBFAAAbIAAAvQgBAzAGAhQAGAfAMANQAEAFADACQAEADAFAAQANAAAIgKQAIgKAFgVQACgFACgRIAFgqQgBgRAHgLQAGgLAOgEIAGgBIAEgBIAJAAQAKAAAIAGQAIAGAGAMIABAFIAAAGQAAAigFAgQgHAfgLAeQgPAegfAOQgeAOgtAAgAhCmjIgMAcIgJAdIgEAaIAAAOIAAABIABAUQACALAEAKIACACQAHgJAOhSQAIgaACgSIAGgaIAAgCIAAgCIgDgBQgHAAgLAZg");
	this.shape_45.setTransform(1048.2,74);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#282E46").s().p("AgVGsQgNgFgNgLQgMgJgIgSQgJgSgHgbQgKgygFhdQgFhfAAiJQAAhKAEgoQAFgoAJgGQALgPAQgHQAQgIAXABIATAAQAiAAAXAMQAXANALAZQAHALAEAgQACAgAAA1IgBBcIgFC4QAAA5gDAlQgDAlgHAQQgDALgGAJQgGAKgIAIQgGAFgKAFQgJAEgOADIgGABIgKABQgOAAgOgGgAgxi7IgHAKQgKAVgFAQQgFARAAALIAAAeQAEAJADADQAEAEAEABIACgCIACgCIAIhJIADgOIAHgiIgBgCIgCgBIgBAAQgDACgDAEgAgEkdQgTAAgRgIQgSgJgPgRQgHgKgDgLQgDgKAAgJQAAgSAJgQQAKgPAVgNQALgGALgDQALgDAKAAIAFAAQAXAAATAKQATALAOATIAHASIABARQAAATgJAPQgKAPgTANQgMAGgMADQgMADgLgBgAgomRQgGAGgHAIIgFALIgBAJIAAARQABAFACAEQADAEAEAAQABAAACgHQADgHAEgPQAAgCAFgJIAQgaIAAgBQgEgDgDAAQgIACgHAEg");
	this.shape_46.setTransform(1007.975,78.7);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#282E46").s().p("AB5FxQgVgIgRgQQgLgKgHgMQgJgMgEgNQgGgLgEgOIgJghIgBAAQgHAWgGARQgIARgHAMQgUAfgbAPQgdAPgjAAQgYAAgWgHQgWgIgVgPQgRgOgKgOQgLgNgGgOQgMgXgLggQgLgfgLgoQgLgqgNhEQgOhDgPhgQgIg8gFgtQgEgsAAgcIAAgNQAAgQADgLQAEgLAFgGQAJgNASgHQAUgHAeAAQAkAAAZASQAYARAOAiQAIARAEASQAFASAEATIALBVIAUCVQANBXANA7QAOA7ANAfIAGAMIADAEIACAAIALgmIAJguQAOhZAGg9QAIg7gBggQABgUAFgVQAEgWAJgYQAEgJAIgHQAIgIALgEIAMgEIAKAAIAFAAQASgBANAKQAPAJALAUQAHANADAdQAEAeAAAuQAIBaAHBAQAIBAAHAnQADAUAEAOQADAOADAIIABACIACAEQADgEAGgNIALghQAMgtAFgbQAHgagBgIQAFgfAGgxQAFgwAEhEIAMieQAHhEAJgwQAKgZAZAAIADAAQALAAAIAGQAJAFAHALIABAGQABADAAAEQgIBBgHBbIgSDQQgEAzgHApQgEAogIAfQgLAtgMAhQgLAhgKATQgLATgOAMQgNAMgPAEQgSAHgVAAQgXAAgUgIgAk8lJIgDAFQgEAGgCAJQgCAKAAAMIAAAEQAAAdAHAYQAGAZANAUIADACQACAAACgFIABgQIAAgDQAAgKgCgTQgDgTgFgaIgBgwIgDgBIgCgBIgDAAQgBAAAAAAQgBABAAAAQAAAAgBAAQAAABgBAAg");
	this.shape_47.setTransform(954,85.275);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#282E46").s().p("AgbFjQgegLgegZIgUgUQgSgUgPgXQgOgXgMgYQgHgQgHgTQgHgUgGgYQgVheAAhJQgBhKASg8QARg9AjguQAvg6BFgWQAPgEAOgCQAMgCAOAAIAEAAQAqAAAjATQAkASAeAkQAFAIAGAMQAFALAFARQAGAWADARQADARAAALQADAjACAgIABA+IAAALQAAAQgHALQgGAKgOADQgHADgQABIgoABIhYACIgqABQAAAUAFAjQAEAjAKAyQAHAdAHAVQAHAUAIAPIAPAYQAKANAMAMIADABIABACIABAAQAOgJAKgUQALgVAJgfIAMgoIAIgUQAHgGAIgDQAIgEAJAAQANAAAJAHQAKAGAFAMIAAAEIAAAEIAAACQAAAHgHAaIgWBDQgGAOgJANQgJAOgKANQgXAXgeALQgeALglAAQgfAAgcgMgABrg6IAaABIAAgKQAAgygDgmQgDgmgGgbQgFgQgIgMQgIgMgJgJIgZgQQgJgGgDAAQgVAXgOAbQgNAagGAeQgFAdgDAfQgEAgAAAhIAAADIA3gBIAhgBIAfABgAhWkoQgRANgTAWQgMAQgFANQgGANAAAJIAAACIABAJQAAABABABQAAAAABABQAAAAABAAQAAAAABAAQAGgCAFgGQAGgHAFgLQAAgDAHgLIAWggIAQgSIAXgYIgCgCIgEAAQgOADgQANg");
	this.shape_48.setTransform(855.3743,85.725);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#282E46").s().p("AgHF4QgrgBgqgUQgVgNgNgMQgNgMgIgLQgPgQgKgbQgMgbgGglQgCgDgBgGIgCgMQAAgHALgOQAHgFAHgCQAGgDAHABIAEAAQAMAAAJAFQAJAIAHANQAGAfAHAWQAHAWAIALQAOATAPAJQAPAJAQAAQAMgGAKgLQAJgMAIgRIADgMIACgTQAAgmgVgwQgVgvgsg6Ig4hUQgWgigKgUQgQgegIgaQgIgaABgXIAAgBQgBgPAFgSQAEgTAKgVQANgYAUgSQAWgSAcgOQASgGASgEQARgEARAAIADAAQAXABAYAHQAZAJAaAQQAXASANAOQANAOADAJQALAVAHAXQAFAYAAAaIAAACQABAagIAPQgHAPgQAFIgJACQgMAAgJgHQgJgGgFgMIAAgBIAAgTIAAgKQABgRgGgTQgFgUgMgWQgDgFgHgHQgHgIgKgHIgBgBQgNAGgHAPQgGAQAAAYQAAAQALAXQAKAWAXAeQAAABAMARIAmA0QAQAWAMAVQANAUAIARQAtBjAABEIAAAFQAAAkgOAiQgOAhgcAcQggAggRAFQgYALgWAGQgWAFgVABgAhtk+QgNAKgQAVQgMAQgFANQgFAMAAALIAAABIgBADQAAAOADALQAFAMAIAIIACAAIABAAQgBgZAIgZQAGgYAOgaIAQgSQAIgKALgKIAAAAQgBgCgHgBQgJAAgMAJg");
	this.shape_49.setTransform(804.9,84.75);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#282E46").s().p("AhDF7QgmAAgcgXQgbgVgUgsQgHgMgGgjQgFgjgFg7QgCgYAAglIgBhZIABhBIAAgrIgBg1IAAggIAAhAQAAgoAMgbQAMgaAZgNQAGgFAIgDIATgEIAMgCIAPgBQAUAAATALQAUALAPAWIAFAJIAEANIABAAQAQgTAUgOQAVgOAZgIIARgCIAQgCQAaAAATAKQAUAKAOAUQAJAKAFARQAFARAFAXIACAMIAAAIQAAANgIAKQgGAJgPAFIgFABIgEAAIgFAAQgMAAgIgHQgJgGgGgNQgDgjgHgSQgGgSgLAAQgWAAgbAcQgHAJgGAMQgFAMgDAOQgHARgGAkQgHAlgGA5IgDAYIgBAYIAFDRIADCOQAAAUgHANQgEANgMAGQgHAFgNACQgMACgSAAgAialJQgJAMgIAaQgHAVgDAPQgDAQAAAKQAAAJADAJIAGATIABABQAIgKADgLQADgLAAgKIAHgnIAGgdIAIgYIAFgMIAAgCIgBgBIgEgBQgHAAgIAMg");
	this.shape_50.setTransform(754.95,85.275);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#282E46").s().p("AgbFjQgegLgegZIgUgUQgSgUgPgXQgOgXgMgYQgHgQgHgTQgHgUgGgYQgVheAAhJQgBhKASg8QARg9AjguQAvg6BFgWQAPgEAOgCQAMgCAOAAIAEAAQAqAAAjATQAkASAeAkQAFAIAGAMQAFALAFARQAGAWADARQADARAAALQADAjACAgIABA+IAAALQAAAQgHALQgGAKgOADQgHADgQABIgoABIhYACIgqABQAAAUAFAjQAEAjAKAyQAHAdAHAVQAHAUAIAPIAPAYIAWAZIADABIABACIABAAQAOgJAKgUQALgVAJgfIAMgoIAIgUQAHgGAIgDQAIgEAJAAQANAAAJAHQAKAGAFAMIAAAEIAAAEIAAACQAAAHgHAaIgWBDQgGAOgJANQgJAOgKANQgXAXgeALQgeALglAAQgfAAgcgMgABrg6IAaABIAAgKQAAgygDgmQgDgmgGgbQgFgQgIgMQgIgMgJgJIgZgQQgJgGgDAAQgVAXgOAbQgNAagGAeQgFAdgDAfQgEAgAAAhIAAADIA3gBIAhgBIAfABgAhWkoQgRANgTAWQgMAQgFANQgGANAAAJIAAACIABAJQABADADAAQAGgCAFgGQAGgHAFgLQAAgDAHgLIAWggIAQgSIAXgYIgCgCIgEAAQgOADgQANg");
	this.shape_51.setTransform(702.4243,85.725);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#282E46").s().p("AATFyQgMAAgQgFQgRgFgWgKQgagOgXgdQgYgcgUgtQgNghgLguQgMgtgLg6QgRhlgIhHQgIhGAAgjQAAgtAZg1QAVgjAcgIIANgCIANgBIAMAAQAZAAATAOQAUAOAMAcQAGASAFAVQAGAXAEAaIANBhIAXC0QAQBmAbBXQAAAAgBAAQAAABAAAAQAAABABABQAAABAAAAIAEALIAFgLIALggQAIgUAGgiQAGgiAGgvQAJhDAFhFQAGhGAChJIAIhtQACgjABgBQAHgKAJgGQAIgFALAAQAPAAAKAHQAKAHAEANIACALIgLC8QgFBPgEA0QgHBPgJA3QgIA3gIAdQgKAhgKAbQgKAZgLASQgSAegZAPQgZAOggAAgAimk+QgHALgIAVQgDAMgBAMIgBAZQAAAXAEAOQAEAPAJAFIABAAIACgFIAEgMIAAgFIgDgbIgBgVQAAgVAEgTQAFgSAIgNIABgDIAAgCIgCgCIgEAAQgFAAgHAKg");
	this.shape_52.setTransform(650.325,84.8);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#282E46").s().p("AC2F7QgJAAgHgFQgIgGgGgKQgDgDgBgLQgCgMAAgSQgCgagChQIgCjVIADifQAAg4gHghQgHgigPgLIgHgBQgTAAgPAKQgQALgMAUQgQAagMApQgMApgGA4QgEAhgDAxQgCAxAABDIACBOIAHCCIAAAEIABACQgHATgJANQgIAMgNAGIgVAHQgLADgJAAQgmAAgugzQgRgZgThDQgKgsgFgqQgFgqAAgpIgFhEIgBhEIAChPQACgqAEgvQAFgfAHgYQAGgXAHgNQAPgYAXgNQAXgMAgAAQAXAAAVAMQATALAQAYIAHAUIAJgHIAXgUQATgPAWgHQAWgHAXAAIACAAQAiAAAYASQAXARAQAjQAJAUAEAgQAEAhABAtIAAAIIgCBmIgBAoIAAAuIABCcQABBMACBIIAAAUQgEAMgJAHQgJAHgLAAgAiik0QgHAOgJAcQgDALgBAKQgCAMAAAMQABAPACAGQACAHAEAAIABAAQAHgDAEgIQAEgIAAgOQABgaACgTQACgRACgHQACgEABgFIADgPIgCgBIgEgBQgFAAgFANg");
	this.shape_53.setTransform(597.3,84.7);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#282E46").s().p("AggFtQgUgGgUgNQgTgRgMgLQgKgMgDgGQgPgSgMgXQgNgWgLgaQgMgcgJgcQgJgdgHgeQgGgfgDgZIgFgpIACgDIAAgEQgBgsAJgxQAHgxARg1QAKgaAPgaQAOgbAUgaQAOgSAWgNQAUgNAbgHQAngMAcAAQAVACAWAIQAXAIAXANIAdAbQAKALADAHQAfAuARBQQAPBRAAByQAAAqgGArQgHArgNAtQgKAegLAWQgLAWgLAQQggApgjAVQgiAVgnAAQgVAAgVgHgAA2kKIgXAtQgRAwgLAxQgHAxgBAwIAAAVQAABGAOBGQAQBHAeBGIADACQAagVAKgWQAJgOAFgPQAGgPAFgPQAKgmAGgjQAEgkAAghIAAguQAAgZgDgjQgDgigGgtQgFgbgHgWQgHgWgHgRQgFgKgHgKQgHgJgKgLIgDgBIgCAAQgDgBgKAQgAhWkvQgPAMgXAYQgLAQgHANQgHAMgCAIIAAAEIAAAFIABAHQABADAEACQAFAAAIgLQAHgMAMgVQALgZAqgqQABAAAAAAQAAAAABgBQAAAAABgBQAAAAABgBIAAgCIgCgBIgBgCIgBAAQgKABgQAMg");
	this.shape_54.setTransform(542.65,84.4);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#282E46").s().p("AAYFwQgYAAgagIQgagIgbgQIgfgaIgSgSQgRgVgNgbQgOgcgLgfQgRg2gIg2QgIg1AAgzIAAgOQAAgsAIgsQAIgrARgqQAIgVAMgTQALgSAPgSQAWgWASgNQASgNAPgGQAagLAZgGQAXgGAWAAQAmAAAfAQQAfAQAXAgQALAXAGAUQAGAVAAASIAAAIQAAAOgGAJQgGAJgMAFIgIABIgEABQgMAAgJgGQgIgGgFgMQAAgTgFgRQgEgSgLgOIgLgFIgEgCIgDAAQgFAFgHAKIgQAaQgKAUgIAaQgHAcgFAkIgDAgIgBAlQAABLALBFQAMBEAYA8QALAWALAMQALALAMAFQAFgHAGgNQAGgMAGgUQAFgPAFgWQAFgVAEgcQACgHAFgFQAFgGAHgDIAGgCIAHgBQAPgBALAGQAJAGAGAKIABAHIABAFQAAATgHAeQgHAdgNApQgKAcgSAVQgSAVgaAOIgPAIIgcAKQgNAEgLABQgLACgJAAgAhOkuQgQAMgWAZQgNASgFAPQgHAPAAANIAAADQAAACAEAEQAEgCAEgEQAEgEADgIQAEgKAGgMQAGgMAJgNQAGgJAMgNQALgOATgQQAAgBAAAAQgBAAAAgBQAAAAgBAAQAAAAAAAAIgDAAQgIAAgQAMg");
	this.shape_55.setTransform(491.375,86.15);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#282E46").s().p("AAEHuQgdAAgbgJQgcgJgagUQgVgTgLgaQgLgaAAgfIAAgLQAAgPAGgKQAFgJAMgFIAHgBIAIgBIABAAQAOAAAJAHQAKAGAFANQAAAjAGAVQAGAUAOAGQAFAGAIACQAIAEAKACQAIAAAHgGQAHgEAJgMQAFgFADgVQADgUAAgiIAAgJIABgIIgCg5IAAgeIAAgHQgdAXgaALQgZALgWAAIgEAAQgbAAgbgOQgbgNgbgcQgQgPgKgVQgLgVgGgcQgLg4gFg1QgGgzAAg0IAAhFQAAh/AGhJQAFhIALgTQAHgIAIgFQAIgDAIgBQAMABAIAGQAKAHAFANIAAAGQgCAAgDBHIgFDVIAAAcQABBPAGA+QAHA/AMAwQAEAKAGAIIAKAPQAQAQAMAIQAMAHAHAAIACAAQAMAAANgHQANgHAPgOQALgLAIgRQAIgQAFgXQAHgbACgZQADgZAAgUIAAg8QAAhNADhIQAEhKAHhHQAHgpAHgZQAHgYAGgHQAMgOAOgKQAPgIARgFIAIgBIAFAAIAKAAQBEAAAYA3QAMASAFAiQAGAhAAAxIgCBNIgECBIgBAhIAAAqIAAAqIACBoIAAAGQgCBGgDArQgDArgEARQAAAKgDASQgEARgIAZQgHAOgLAOQgJAPgNAPQgOANgOAKQgNAJgMAGQgeAMgdAIQgdAGgbAAgAC0m+IgCACQAGANAFAOIAHAhQADAaADAOQADAOACAAIABAEIAEAGIABAAQALgIAAgTIAAgDQAAgKgBgJQgCgKgEgJQAAgFgFgMQgEgMgLgTIgJgIIgFgCIgDAAg");
	this.shape_56.setTransform(403.525,96.4);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#282E46").s().p("AgbFjQgegLgegZIgUgUQgSgUgPgXQgOgXgMgYQgHgQgHgTQgHgUgGgYQgVheAAhJQgBhKASg8QARg9AjguQAvg6BFgWQAPgEAOgCQAMgCAOAAIAEAAQAqAAAjATQAkASAeAkQAFAIAGAMQAFALAFARQAGAWADARQADARAAALQADAjACAgIABA+IAAALQAAAQgHALQgGAKgOADQgHADgQABIgoABIhYACIgqABQAAAUAFAjQAEAjAKAyQAHAdAHAVQAHAUAIAPIAPAYIAWAZIADABIABACIABAAQAOgJAKgUQALgVAJgfIAMgoIAIgUQAHgGAIgDQAIgEAJAAQANAAAJAHQAKAGAFAMIAAAEIAAAEIAAACQAAAHgHAaIgWBDQgGAOgJANQgJAOgKANQgXAXgeALQgeALglAAQgfAAgcgMgABrg6IAaABIAAgKQAAgygDgmQgDgmgGgbQgFgQgIgMQgIgMgJgJIgZgQQgJgGgDAAQgVAXgOAbQgNAagGAeQgFAdgDAfQgEAgAAAhIAAADIA3gBIAhgBIAfABgAhWkoQgRANgTAWQgMAQgFANQgGANAAAJIAAACIABAJQAAABABABQAAAAABABQAAAAABAAQAAAAABAAQAGgCAFgGQAGgHAFgLQAAgDAHgLIAWggIAQgSIAXgYIgCgCIgEAAQgOADgQANg");
	this.shape_57.setTransform(347.6743,85.725);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#282E46").s().p("AixHTQgdgTgTgnIgFgUQgDgRgDgdQgDgJgBhPIgCjkQgBgDAAgVIAAg8QAAg7AEhCQADhCAHhKQAFgaAHgXQAHgXAIgTQAJgWAJgPQAIgPAKgHQAHgGAKgEQAKgDAKAAQASAAAWAHQAWAHAcAOQAKAFAHARQAIASAFAeQADAYACAWQACAXAAAVIAAACIgBAyIgDBEIAXgeQAbgbAegPQAcgOAdAAIAJAAQAUAAARAJQARAIAPARQARAUAKA4QAIA4AABcQAAAvgDBcIgJDjIACBTQABAKgGAHQgGAIgMAFIgFACIgEABIgPAAQgNAAgPgSQgDgFgBgYQgCgYAAgpIALkRIABgdIAAhHQAAiOgVgqIgDgCIgFgBQgXAAgXAUQgVATgWAnQgOAYgMAjQgNAjgLArIgFATIgBAJIAABtIgDBbIgDCHQAAALgDAOQgEANgHAQQgMAZgTAMQgUAMgbAAQgpAAgdgTgAihmcQgFAGgGAKQgNAZgHAbQgHAbAAAeQABAGABAEIAFAFQAHgDAEgGQAEgGAAgJQAEgkAGgaQAFgZAFgPIALgWIgDgCIgDAAQgFADgEAHg");
	this.shape_58.setTransform(293.3,73.375);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#282E46").s().p("AACHdQgLgCgNgGQgNgIgJgIQgIgJgHgKQgLgNgNgjQgMgkgPg5QgIgmgEghQgEggAAgaIgHhnQgCgxAAgpQAAheADhLQAEhKAIg2IANgrQAFgVAIgTIg6ABIhPAEIgDAAQgIAAgHgFQgHgEgHgKIgBgFIAAgDIAAgCQAAgKAHgIQAGgHANgEQAfgHAvgEQAvgEBAAAIALAAIAQgBQAAABA9ABIC9ADQANAAAIAHQAKAGAFAOIAAAIQAAALgHAIQgIAIgPAFIiIAAIgEAAIgBABIAJBDQAEAeAAAVIAAADIgHCRIgDBdQABAlACA7IAGCOQAAA8ACAuQACAtAFAeIACAQIABAOIAAAJQAAAOgLAPQgKAOgVANQgJAGgNACQgNADgSAAQgJAAgLgCgAg5mSQgHAMgHAWQgHAMgDAPQgEAPAAARIAAAFQAAAJACAGQADAFADACQADAAADgGQADgGACgLQAAgOAGgZQAFgZAMgkIAAgBIACgEIgBgCIgBgBIgBAAQgHAAgGALg");
	this.shape_59.setTransform(244.1,74.575);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#282E46").s().p("AglAzQgQgIgMgQQgDgGgCgIQgCgHAAgHQAAgOAIgLQAIgMAQgKQAIgFALgDQAKgCAKgBQAWAAASAJQAQAJAMARQADAGABAGQACAGAAAGQAAAUgOAPQgOAOgcAJIgMABIgFABQgUAAgRgJgAglgeQgFAFgFAKIgBAGIgBAEIAAACQAAAUAPAKIADggIAFgJIAJgPIAAgDIgIgCQgGAAgGAEg");
	this.shape_60.setTransform(168.205,116.525);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#282E46").s().p("ABeHZQgagCgVAAIgGAAQgjAAgeACQggABgcAEIgDAAQgFAAgHgDQgHgCgIgEQgNgEgJgGQgJgHgHgKQgFgJgDgJQgDgIAAgJQAAgNAMggQANggAagzQAVgzAPgqQAQgrAKghQAMgqALgwQALgxALg5QAEgcABgYIACgqQAAhBgHgvQgIgwgPgcQgGgHgGgDQgGgDgGgBQgWAAgSAXQgTAWgRAtIgCAMIgCAXQAAADgFAFQgEAFgKAFIgFABIgIACQgNAAgJgGQgJgHgFgNIgCgIIgBgIQAAgWAJgaQAIgZAQgeQATgdAfgUQAfgXAsgOQARgFARgDQAOgCAOgBQA0ABAnAeQAoAeAbA8QAGAMAFASQAGAUAFAaQADAMACAOQACAOAAATIAAAQQAABDgRBMQgPBMgfBTQgZBLgbA7QgbA6gcArIgvBJIABAAIAYgBIAXAAQA/ACAhADQAhACAEAFQAGgBAGAFQAFAFAGAJIADAGIAAAGQAAALgHAIQgGAIgNAFIgGABIgIABQghgFgbgBgABXmZIgBADIAFALIAQAYQAFAJAHARIAOApQACAKADAFQADAFADAAQAHgEADgGQAEgHAAgIQAAgLgIgSQgHgQgPgZQgMgPgJgHQgJgIgEAAIgGAAIgBAAg");
	this.shape_61.setTransform(126.975,73.45);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#282E46").s().p("AghAzQgOgIgLgQQgDgGgCgIQgCgHAAgHQAAgOAIgLQAHgMAOgKQAIgFAJgDQAKgCAJgBQATAAAQAJQAPAJAKARQADAGABAGQACAGgBAGQAAAUgMAPQgMAOgZAJIgLABIgFABQgSAAgPgJgAghgeQgEAFgFAKIgBAGIgBAEIAAACQAAAUANAKIADggIAFgJIAIgPIAAgDIgHgCQgGAAgFAEg");
	this.shape_62.setTransform(1690.8063,116.525);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#282E46").s().p("ACjF7QgHAAgIgFQgGgGgGgKQgDgDAAgLQgCgMAAgSQgBgagChQQgChRAAiEIADifQAAg4gGghQgHgigOgLIgGgBQgRAAgOAKQgOALgKAUQgPAagKApQgLApgGA4QgEAhgCAxIgBB0IABBOIAGCCIAAAEIABACQgFATgJANQgHAMgMAGIgUAHQgJADgIAAQgiAAgpgzQgPgZgRhDQgJgsgEgqQgFgqAAgpIgEhEIgBhEQAAgmACgpQABgqAEgvQAEgfAGgYQAGgXAGgNQAOgYAUgNQAVgMAcAAQAVAAASAMQARALAPAYIAHAUIAIgHIAUgUQASgPATgHQATgHAVAAIACAAQAfAAAUASQAWARANAjQAJAUAEAgQADAhAAAtIAAAIIgBBmIgBAoIAAAuIABCcQABBMACBIIAAAUQgEAMgIAHQgHAHgLAAgAiRk0QgHAOgHAcIgEAVQgBAMAAAMIACAVQACAHADAAIABAAQAGgDAEgIQADgIAAgOQABgaACgTQACgRACgHIACgJIADgPIgCgBIgDgBQgEAAgFANg");
	this.shape_63.setTransform(1648.85,84.7);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#282E46").s().p("AB0F9QgSAAgQgFQgRgFgPgLIghAEIgYABQgcAAgZgGQgZgIgYgOQgwgdgWg5IgGgdQgDgOAAgNIAAgRQAAhUA8hBQAWgTATgLQASgMAQgFQAIgDAMgCIAbgFQABgQABgYIAAg3IAAguQAAgtgCgbQgCgagEgIQgGgWgMAAQgFAAgJAIIgTAWQgIAMgGAUQgFAUAAAaQAAATgBAKQgBALgDACQgHAIgGADQgGAEgGAAIgFAAQgMAAgJgGQgIgGgEgNIgBgLIAAgJIAAggQAAgdALgbQAKgcAVgbQAQgRAOgLQAOgLAOgGQAUgHAWgEQAWgEAYAAIAFAAQAgAAAcANQAcAMAXAZQASAXAJAlQAJAlAAA0IgEDeIgBByIABBhIAAA1IAAAZQAAAOgEAKQgFAKgKAEQgKAHgKADQgLADgNAAgAhFBGQgZAVgMAdQgNAcABAjIAAAHQAAAmARAaQATAZAiANIATAEIATABIAOAAIADgBQgIgZgDgcQgFgbAAgeIAAhAIAAg5QABgVACgIQgVABgqAhgABpk9IgBABQAAADADAFIAJANQAGALAEANQAFANACAPIAFAjQABALACAAIADAAQAFgCACgGQADgFAAgKIAAgCQAAgYgHgVQgJgVgPgSQgLgLgFgBIgCABg");
	this.shape_64.setTransform(1599.3,84.475);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#282E46").s().p("AD6F7QgNAAgIgHQgJgHgFgOIAAgKIgBgMIAAgyIAEiJIAAg+IAChUIABiHQAAg6gCgiQgCgigEgLQgDgNgDgGQgDgHgDAAIgCgBIgFgBQgMAAgMAIQgLAHgMAPQgIAKgGAMIgMAdQgEANgFASIgJAqQgDATgCAVQgCAVAAAYIABEkIAABzQAAAMgGAIQgHAIgNAEIgEABIgFAAQgLAAgIgFQgJgGgEgMQgCgFgBgeIABhSIgDkWIgBijIgGgvQgEgTgEgJQgDgJgEgEQgDgFgCAAQgHABgIAFQgIAEgIAIQgPAPgLAXQgLAXgHAfQgJA1gEBGQgFBFAABXIACBRIAFB/IAAALQAAATgGANQgGAOgMAIQgLAGgLADQgLACgLAAIgEAAQgXAAgUgPQgUgRgRghQgOgdgJgoQgKgogGgyQgGg9gDguQgCgtAAghQAAhiAFhCQAGhCAKgiQACgPAFgLQAFgMAGgHQAbgiAqAAIAEAAQAQAAALAEQAMAEAIAIQAMAKAIAMQAIAMADANIAAACIABABQAbgdALgHQAkgTAYAAQAQAAAQAIQAPAJANAPQAIAJALAbIABAAQAFgIAIgKQAHgJALgKQAVgSAVgJQAUgJAUAAQAhAAAWARQAVARALAhQAGASADAlQADAkAAA3QAADigGDRIAABCQAAAPgHAIQgHAKgPAEIgGAAgAjkk3QgGAMgIAWIgEAWQgDANgBAQIACATQACAGADAAQAHgDADgHQADgGAAgJIAIg7IAGgiIAAgBIgBgBIgBgBQgEAAgGALg");
	this.shape_65.setTransform(1538.575,84.4972);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#282E46").s().p("AB0F9QgSAAgQgFQgRgFgPgLIghAEIgYABQgcAAgZgGQgagIgXgOQgxgdgUg5IgHgdQgDgOAAgNIAAgRQAAhUA8hBQAWgTATgLQASgMARgFQAHgDAMgCIAbgFQABgQAAgYIABg3IAAguQAAgtgCgbQgCgagEgIQgGgWgNAAQgFAAgHAIIgUAWQgIAMgGAUQgFAUAAAaQAAATgBAKQgBALgDACQgHAIgGADQgGAEgGAAIgFAAQgMAAgJgGQgIgGgEgNIgBgLIAAgJIAAggQAAgdALgbQAKgcAVgbQAQgRAOgLQAOgLAOgGQAUgHAWgEQAWgEAYAAIAFAAQAgAAAcANQAcAMAXAZQASAXAJAlQAJAlAAA0IgEDeIgBByIABBhIAAA1IAAAZQAAAOgEAKQgGAKgJAEQgKAHgKADQgLADgNAAgAhFBGQgaAVgLAdQgNAcABAjIAAAHQAAAmARAaQATAZAiANIATAEIATABIAOAAIADgBQgIgZgEgcQgEgbAAgeIAAhAIAAg5QABgVACgIQgVABgqAhgABpk9IgBABQAAADAEAFIAIANQAGALAEANQAEANADAPIAFAjQABALACAAIADAAQAFgCACgGQADgFAAgKIAAgCQAAgYgHgVQgJgVgPgSQgLgLgEgBIgDABg");
	this.shape_66.setTransform(1447.3,84.475);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#282E46").s().p("ABTHrQgmAAghgOQgfgOgdgeQgVgZgMgVQgOgWgHgUQgFgIgFgUQgGgTgFggQgDgIgCgtQgCgsAAhOIAAiOIAAgxIABhbIghgBIgdgBQgLAAgHgGQgHgGgEgMIAAgHQAAgJAGgGQAEgHALgEQAGgDASgCIAzgDIACgZIAFgvQAIgnAJgdQAJgcAJgUQAKgWANgMQAMgKAPgBIADAAQASABATAHQAVAHAYAPQAKAHAHAZQAIAZAEAtIADAfIABApIAAALIgBAQIAUAAQAfAAASACQASABADADQAJAGAFAHQADAHAAAHIAAAEQABALgIAHQgGAIgOAFIg5AAIgaAAQgCATgBAkIgCBYIABA9IABCAQgDBFAAAbIAAAvQABAzAFAhQAFAfALANQADAFADACQAEADAEAAQAMAAAHgKQAIgKADgVQACgFACgRIAEgqQAAgRAGgLQAFgLAMgEIAGgBIAEgBIAIAAQAJAAAHAGQAHAGAGAMIABAFIAAAGQAAAigFAgQgGAfgKAeQgOAegcAOQgaAOgoAAgAg7mjIgKAcQgFAOgEAPIgDAaIgBAOIAAABIACAUQABALADAKIACACQAHgJAMhSQAHgaADgSIAFgaIAAgCIgBgCIgCgBQgGAAgKAZg");
	this.shape_67.setTransform(1364.15,74);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#282E46").s().p("AhHF4QghAAgbgUQgbgWgXgpQgGgNgGgUQgHgTgGgZQgNg/gGhMQgHhMAAhaIAAghQAAhQAGg4QAGg5ANgjQAFgHAHgEQAHgEAJAAIABAAQAJAAAHAEQAGAGAFAJIABAEIABAIQgMCGAABiQAABgAGBOQAGBOAOA9QANAxARAYQARAYAUAAIADAAQATAAAOgdQANgdAJg7QADgSAEggIAFhMQAJizAGhbQAHhbADAAQAEgWAIgQQAHgQAKgKQAIgIAOgEQAOgDAUAAIAPAAQAgAAAVAMQAWAMALAYQAIAPAIAlIADAVIABAQIgDBKIgJC7IgBCPIgCBbQAAAjgEAZQgDAXgJANQgWAVgZAAIgHAAQglAAgZgaQgZgcgPg2QgHAYgHAQQgIARgHAKQgRAWgUAKQgVALgZAAgACilGIgCACQAHARACAMQADAMAAAFIAGA4IADAdIACADIACABQAMgPAAgcQAAgVgFgVQgGgWgKgVIgGgHQgBAAAAgBQgBAAgBAAQAAgBAAAAQgBAAAAAAIgDAAg");
	this.shape_68.setTransform(1310.325,84.5);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#282E46").s().p("AgcFtQgTgGgRgNQgSgRgKgLQgKgMgDgGQgMgSgLgXQgMgWgKgaQgLgcgIgcQgIgdgFgeQgGgfgDgZIgEgpIABgDIAAgEQAAgsAHgxQAHgxAQg1QAIgaANgaQAOgbARgaQANgSATgNQATgNAYgHQAjgMAYAAQATACAUAIQAUAIAUANIAbAbQAJALADAHQAcAuAOBQQAOBRAAByQAAAqgFArQgGArgMAtQgJAegKAWQgKAWgKAQQgcApgfAVQggAVgiAAQgSAAgTgHgAAxkKIgVAtQgQAwgJAxQgHAxAAAwIAAAVQAABGAMBGQAOBHAbBGIAEACQAWgVAJgWQAIgOAFgPIAKgeQAJgmAFgjQAEgkAAghIAAguQAAgZgDgjQgDgigFgtQgFgbgGgWQgGgWgGgRQgEgKgHgKQgHgJgJgLIgDgBIgBAAQgDgBgIAQgAhNkvQgOAMgUAYQgKAQgGANQgHAMgBAIIAAAEIAAAFIABAHQABADADACQAEAAAHgLQAHgMAKgVQAKgZAmgqQABAAAAAAQAAAAABgBQAAAAAAgBQABAAAAgBIAAgCIgBgBIgBgCIgBAAQgIABgPAMg");
	this.shape_69.setTransform(1254.775,84.4);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#282E46").s().p("AAKHhIgggGIgCAAIgPAAIgMAAIgEABQgfAAgVgLQgVgKgKgUQgGgJgGgMQgGgMgFgQIgShAQgHgdgEgaQgFgUgCgcIgFhAIgGhyIgBheQAAiHAMiEQAIgnAIgdQAJgdAJgSQAKgYAOgMQAOgMATABQATADAQAEQAQAGAMAHQAYAJAFAQIAIAWQADANACAQQADAdACAWQACAXAAARIAAALIAAAVIgBAaQARgOAOgJQANgHAJgDIAQgCIALgBQAaAAAWANQAWAOARAcQAGAJAGANQAFAOAEATQAJAdAEA1QAEA2AABLIAAAMQAABMgHBFQgHBFgOA9QgLAmgSAbQgRAcgXASQgXATgWAJQgWAJgWAAIgOgCgABHjJQgIAEgIAJQgOARgKAWQgLAWgHAdIgJAtIgGApIAIDTQAAA5ABAjQABAjADAQIAEAjIACAkIAAABIAGAAIAAABQAPAAASgNQASgMAVgZIALgaQAGgNAEgOQAMg9AGg6QAGg7AAg4IAAgaQAAhYgGg5QgFg4gMgZQgIgPgHgJQgIgHgIAAQgHAAgIAEgAiUmMQgGAOgGATQgFARgCAPQgCAQAAAPIAAALIADAIQAEgBAFgKQAEgMADgXQAGggAGgWQAFgWAGgMIAAgBQAAgBAAAAQAAgBgBAAQAAAAAAAAQAAgBgBAAIgEAAQgHAJgIAOg");
	this.shape_70.setTransform(1202.275,74.5);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#282E46").s().p("AB0F9QgSAAgQgFQgQgFgPgLIgiAEIgYABQgcAAgagGQgZgIgXgOQgxgdgVg5IgHgdQgCgOAAgNIAAgRQAAhUA8hBQAWgTASgLQAUgMAPgFQAJgDALgCIAbgFQACgQAAgYIAAg3IAAguQAAgtgCgbQgCgagEgIQgGgWgMAAQgGAAgIAIIgTAWQgJAMgFAUQgEAUgBAaQAAATgBAKQgBALgEACQgGAIgGADQgGAEgGAAIgFAAQgNAAgHgGQgJgGgEgNIgBgLIAAgJIAAggQAAgdAKgbQALgcAVgbQAQgRAOgLQAOgLANgGQAVgHAWgEQAWgEAYAAIAGAAQAfAAAcANQAcAMAXAZQASAXAJAlQAJAlAAA0IgEDeIgBByIABBhIABA1IAAAZQgBAOgEAKQgGAKgJAEQgKAHgKADQgLADgMAAgAhGBGQgZAVgLAdQgNAcABAjIAAAHQAAAmASAaQARAZAkANIATAEIASABIAOAAIADgBQgHgZgEgcQgFgbAAgeIAAhAIAAg5QABgVACgIQgVABgrAhgABpk9IAAABQAAADACAFIAJANQAGALAEANQAEANADAPIAFAjQABALACAAIADAAQAFgCACgGQADgFAAgKIAAgCQAAgYgIgVQgHgVgPgSQgMgLgFgBIgCABg");
	this.shape_71.setTransform(1150.8,84.475);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#282E46").s().p("Ag0HmQgbgMgXgaQgPgTgGgWQgGgXAAgZIAAgHQAAgQAEgJQADgKAIgEQAHgGAMAAQANAAAJAHQAIAGAEANIACArQAFAPAEAKQAFAKAGAFIATAKQAJADAEAAQAHAAAIgHQAGgHAIgOQAEgIACgYQABgXAAgoIgBgpIAAglIAAgRQgQANgTAHQgSAHgXAAIgFAAQgOAAgRgFQgQgFgSgIQgOgLgLgMQgLgLgIgNQgIgMgIgRQgJgRgJgVQgmhvABhsIAAgUQgBg4AJg0QAHg0AQgyQALgZANgWQALgXAPgTQAQgXAWgPQAWgPAagIIAPgDIALgBIACAAIACAAIABgBQATAAARAHQASAIASAOIAMAMIAMANIABAAQAKgaAOgNQAOgNASAAIADAAQAOAAAVAHQAUAHAZAOQAIAHAEAJQAEAIACAJQAIAhAEAiQADAiABAjQgKC0ABA6IABBhIAABJIAAAeIgCBiQgCAlgDALQgEAlgFAZQgEAZgGALQgKAVgMARQgMAQgNAMQgdAZgkANQgkAMgrAAQghAAgdgNgAhOmbQgVATgUAlQgWArgLA7QgLA8AABLIAAAFQAAA7ALA3QALA3AXA2QAEAKAIALQAIAMAKANQAJAGAKAEQAJAEAJAAQAbAAAMgSQAIgKAHgMQAHgLAFgMIAIgPIADgHIAAhTIgEhqIAAhPIAAgZIAAgeIADgmIgEhBQgCgYgDgGQgDgQgGgLQgGgLgGgGQgHgHgIgDQgIgEgHAAQgWAAgVASgACkmxIAHAiIABAOIAIBJIACACIACABQAEAAADgEQADgEADgIIAAgeQAAgLgEgRQgEgQgJgVIgHgKIgGgGQAAAAgBAAQAAAAAAABQgBAAAAAAQgBABAAABg");
	this.shape_72.setTransform(1067.7,97.625);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#282E46").s().p("ACkF7QgIAAgIgFQgGgGgGgKQgDgDgBgLQgBgMAAgSQgCgagBhQQgChRAAiEIADifQAAg4gHghQgGgigOgLIgGgBQgQAAgOAKQgPALgLAUQgOAagLApQgKApgGA4QgDAhgCAxIgCB0IACBOIAFCCIAAAEIABACQgFATgIANQgJAMgLAGIgTAHQgKADgHAAQgkAAgpgzQgOgZgRhDQgJgsgFgqQgEgqAAgpIgEhEIgChEQAAgmACgpQACgqAEgvQAEgfAGgYQAGgXAGgNQANgYAVgNQAVgMAdAAQAUAAASAMQARALAPAYIAGAUIAIgHIAVgUQASgPATgHQAUgHAUAAIACAAQAfAAAUASQAWARAOAjQAIAUADAgQAFAhAAAtIAAAIIgCBmIAAAoIAAAuIABCcQAABMACBIIAAAUQgEAMgHAHQgJAHgJAAgAiSk0QgFAOgIAcIgEAVQgBAMgBAMIADAVQACAHADAAIABAAQAGgDAEgIQAEgIAAgOQABgaABgTQACgRACgHIADgJIADgPIgDgBIgDgBQgEAAgGANg");
	this.shape_73.setTransform(1012.15,84.7);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#282E46").s().p("AgTGsQgMgFgLgLQgLgJgHgSQgIgSgHgbQgIgygEhdQgGhfAAiJQABhKAEgoQAEgoAIgGQAKgPAPgHQAOgIAUABIARAAQAeAAAVAMQAUANALAZQAGALADAgQACAgABA1IgCBcIgFC4QABA5gDAlQgDAlgFAQQgDALgGAJQgFAKgHAIQgGAFgJAFQgIAEgMADIgGABIgJABQgMAAgNgGgAgsi7IgGAKQgJAVgFAQQgEARAAALIAAAeQADAJAEADQADAEAEABIACgCIABgCIAIhJIACgOIAGgiIgBgCIgBgBIgBAAQgEACgCAEgAgEkdQgQAAgQgIQgPgJgPgRQgFgKgEgLQgCgKAAgJQgBgSAKgQQAIgPATgNQAKgGAJgDQAKgDAJAAIAFAAQAVAAAQAKQARALANATIAGASIACARQgBATgIAPQgJAPgRANQgKAGgLADQgLADgKgBgAgkmRQgGAGgFAIIgEALIgCAJIAAARQABAFACAEQACAEAFAAIACgHQADgHADgPIAEgLQAFgKAKgQIAAgBQgDgDgDAAQgHACgHAEg");
	this.shape_74.setTransform(969.3,78.7);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#282E46").s().p("AhZHmQgjAAgagTQgbgTgQgnQgCgHgDgOIgGglQgCgcgCg+QgBg9AAhfIAAjWQADhbACg4QAEg3AEgTQAfibAzAAIAFAAQARgBAUAIQAUAHAYAOQAGADAEAIQAFAIAEAMQADAKAEAWIAHA3IACAsQgJCgAAB4IABASQAAAHABACQATgOAQgOQAOgPALgPQAVgYAYg9QAZhHAAgRQAFgZAIgJQALgJAKAAQALAAAHAFQAIAFAFAKIAAAEIABAEIAAADQgBANgCAVQgCAVgGAcQgJAcgLAaQgLAagLAWQgIAPgMASQgNAQgTAVIgcAZQgPANgRANQATAMAPAMQAWASAOARQAPAPAJAPQAPAVAMAbQANAbAMAgQAKAgAIArQAIAqAGA0IAAACIABAFIgBAEQgDAKgHAGQgHAFgLABIgLAAQgFgBgFgDQgGgCgEgJQgFgJgCgPQgLhCgMgvQgNgvgNgbQgOgagMgTQgNgSgMgMQgJgJgLgKQgMgJgMgJIgGD6QAAAUgGATQgIAUgPAUQgKALgNAGQgMAFgPAAIgDAAgAiMmWQgEAGgHANQgKAYgFAYQgGAYAAAYIAAAKIAAAKQABABAAABQAAAAABABQAAAAABAAQAAAAAAAAIADAAQAEgCADgIQAEgIAEgPIAShQIAGgcIgCgCIgDgBIgBAAQgDAAgEAGg");
	this.shape_75.setTransform(928.5,71.9505);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#282E46").s().p("AgTHhQgQgFgPgKQgTgVgLgQQgLgQgBgMQgHgQgDhNQgEhNABiJIgBhPIgBg6IgBgHIAAgFQAAg9AEhDQADhDAGhIQAGglAQgxQAJgaAKgRQAJgRAJgIQAHgFAIgCQAHgDAKAAQAQAAAVAHQAUAHAYAQQAHAGAEAIQAEAIACAIQAPBJAAA0IAAAFIgBAvIgGB1IgBAtIAAAbIABBAIABCUIgEBjIgDCNQAAAZgWAnQgLAPgPAIQgPAIgSAAQgRAAgRgGgAgvmZQgHAQgHAYQgGAWgCASQgDASAAAPIABAMQABAEADACQAFAAAEgJQAEgKACgSIAEgVIAGgkIAHgbIAHgaIAAgDIgBgBIgDgBQgIAGgHAPg");
	this.shape_76.setTransform(883.025,73.325);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#282E46").s().p("AB0F9QgSAAgQgFQgRgFgPgLIghAEIgYABQgcAAgZgGQgagIgXgOQgxgdgUg5IgHgdQgDgOAAgNIAAgRQAAhUA8hBQAWgTATgLQASgMARgFQAHgDAMgCIAbgFQABgQAAgYIABg3IAAguQAAgtgCgbQgCgagEgIQgGgWgNAAQgFAAgHAIIgTAWQgJAMgGAUQgFAUAAAaQAAATgBAKQgBALgDACQgHAIgGADQgGAEgGAAIgFAAQgMAAgJgGQgIgGgEgNIgBgLIAAgJIAAggQAAgdALgbQAKgcAVgbQAQgRAOgLQAOgLAOgGQAUgHAXgEQAVgEAYAAIAFAAQAgAAAcANQAcAMAXAZQASAXAJAlQAJAlAAA0IgEDeIgCByIACBhIAAA1IAAAZQABAOgFAKQgGAKgJAEQgKAHgKADQgLADgNAAgAhFBGQgaAVgLAdQgNAcABAjIAAAHQAAAmARAaQATAZAiANIATAEIATABIAOAAIADgBQgIgZgEgcQgEgbABgeIAAhAIAAg5QAAgVACgIQgVABgqAhgABpk9IgBABQAAADAEAFIAIANQAGALAEANQAEANADAPIAFAjQACALABAAIADAAQAFgCACgGQADgFAAgKIAAgCQAAgYgHgVQgJgVgPgSQgLgLgEgBIgDABg");
	this.shape_77.setTransform(840.7,84.475);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#282E46").s().p("ABTHrQgnAAgggOQgggOgcgeQgUgZgNgVQgOgWgHgUQgFgIgFgUQgFgTgHggQgDgIgBgtQgBgsAAhOIAAiOIAAgxIABhbIgigBIgdgBQgLAAgHgGQgHgGgEgMIAAgHQAAgJAFgGQAGgHAKgEQAGgDATgCIAxgDIADgZIAFgvQAIgnAJgdQAJgcAJgUQAKgWANgMQANgKAOgBIADAAQASABATAHQAVAHAYAPQAKAHAIAZQAGAZAFAtIADAfIABApIAAALIgBAQIAUAAQAgAAARACQARABAFADQAIAGAEAHQAEAHAAAHIAAAEQAAALgGAHQgIAIgNAFIg5AAIgaAAQgCATgBAkIgBBYIAAA9IACCAQgDBFAAAbIAAAvQgBAzAGAhQAFAfALANQADAFAEACQADADAEAAQAMAAAIgKQAGgKAEgVQACgFACgRIAFgqQgBgRAGgLQAFgLAMgEIAGgBIAEgBIAHAAQAKAAAHAGQAHAGAGAMIABAFIAAAGQAAAigFAgQgGAfgKAeQgOAegbAOQgbAOgoAAgAg7mjIgLAcQgEAOgEAPIgDAaIgBAOIAAABIABAUQACALAEAKIACACQAGgJANhSQAGgaADgSIAFgaIAAgCIgBgCIgCgBQgGAAgKAZg");
	this.shape_78.setTransform(790.25,74);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#282E46").s().p("ABTHrQgnAAgggOQgggOgcgeQgUgZgNgVQgOgWgHgUQgFgIgFgUQgFgTgHggQgDgIgBgtQgBgsAAhOIAAiOIAAgxIABhbIgigBIgdgBQgLAAgHgGQgHgGgEgMIAAgHQAAgJAFgGQAGgHAKgEQAGgDATgCIAxgDIADgZIAFgvQAIgnAJgdQAJgcAJgUQAKgWANgMQANgKAOgBIADAAQASABATAHQAVAHAYAPQAKAHAIAZQAGAZAFAtIADAfIABApIAAALIgBAQIAUAAQAgAAARACQARABAFADQAIAGAEAHQAEAHAAAHIAAAEQAAALgGAHQgIAIgNAFIg5AAIgaAAQgCATgBAkIgBBYIAAA9IACCAQgDBFAAAbIAAAvQgBAzAGAhQAFAfALANQADAFAEACQADADAEAAQAMAAAIgKQAGgKAEgVQACgFACgRIAFgqQgBgRAGgLQAFgLAMgEIAGgBIAEgBIAHAAQAKAAAHAGQAHAGAGAMIABAFIAAAGQAAAigFAgQgGAfgKAeQgOAegbAOQgbAOgoAAgAg7mjIgLAcQgEAOgEAPIgDAaIgBAOIAAABIABAUQACALAEAKIACACQAGgJANhSQAGgaADgSIAFgaIAAgCIgBgCIgCgBQgGAAgKAZg");
	this.shape_79.setTransform(702.5,74);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#282E46").s().p("AAEBIIgEAAQgMAAgHgFQgIgGgDgKQgDgLgBgRIgBgnQAAgXAGgNQAFgOALgDQASgFAMAHQALAGADARIAEA7IABAXQgBANgHAJQgHAIgOAEIgDAAg");
	this.shape_80.setTransform(663.175,30.3413);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#282E46").s().p("ACjF7QgHAAgHgFQgHgGgGgKQgCgDgCgLQgBgMAAgSQgCgagBhQQgBhRgBiEIADifQAAg4gGghQgHgigOgLIgGgBQgQAAgOAKQgPALgKAUQgPAagLApQgKApgGA4QgDAhgDAxIgCB0IACBOIAGCCIAAAEIABACQgGATgHANQgJAMgLAGIgUAHQgIADgJAAQgiAAgpgzQgPgZgRhDQgJgsgEgqQgFgqAAgpIgEhEIgBhEQAAgmABgpQACgqAEgvQAFgfAFgYQAGgXAGgNQAOgYAUgNQAVgMAcAAQAVAAASAMQARALAPAYIAHAUIAIgHIAUgUQASgPATgHQATgHAVAAIACAAQAeAAAWASQAVARAOAjQAIAUADAgQAEAhAAAtIAAAIIgBBmIgBAoIAAAuIABCcQABBMADBIIAAAUQgFAMgIAHQgHAHgLAAgAiRk0QgGAOgIAcIgEAVQgCAMABAMIACAVQACAHADAAIABAAQAGgDAEgIQAEgIgBgOQACgaACgTQABgRACgHIACgJIAEgPIgDgBIgDgBQgEAAgFANg");
	this.shape_81.setTransform(624.85,84.7);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#282E46").s().p("AgYFjQgbgLgbgZIgSgUQgQgUgNgXQgNgXgKgYQgHgQgGgTIgMgsQgTheAAhJQAAhKAPg8QAQg9AfguQArg6A+gWQANgEAMgCQALgCAMAAIAEAAQAmAAAfATQAgASAbAkQAFAIAFAMQAFALAEARIAJAnQACARAAALQADAjABAgIABA+IAAALQAAAQgFALQgHAKgMADQgGADgPABIgjABIhPACIgmABQAAAUAFAjQADAjAJAyQAGAdAHAVQAGAUAHAPQAGALAIANQAJANALAMIACABIABACIABAAQAMgJAJgUQAKgVAIgfIALgoQAFgPACgFQAHgGAGgDQAIgEAIAAQAMAAAIAHQAJAGAEAMIAAAEIAAAEIAAACQAAAHgGAaIgUBDQgGAOgHANIgRAbQgVAXgbALQgbALghAAQgbAAgagMgABgg6IAYABIAAgKQAAgygDgmQgCgmgGgbQgFgQgHgMQgHgMgIgJIgXgQQgIgGgCAAQgTAXgMAbQgMAagGAeQgEAdgDAfQgDAgAAAhIAAADIAxgBIAegBIAbABgAhNkoQgPANgRAWQgKAQgGANQgFANAAAJIAAACIABAJQAAABABABQAAAAAAABQABAAAAAAQABAAABAAQAFgCAFgGQAFgHAEgLQAAgDAHgLIATggIAPgSIAVgYIgCgCIgDAAQgNADgPANg");
	this.shape_82.setTransform(573.8492,85.725);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#282E46").s().p("Ag8F7QgiAAgZgXQgZgVgSgsQgGgMgFgjQgFgjgEg7IgCg9IgBhZIABhBIAAgrIgBg1IAAggIAAhAQAAgoAMgbQAKgaAXgNQAEgFAIgDIARgEIALgCIANgBQATAAARALQARALAOAWIAEAJIADANIABAAQAOgTATgOQASgOAXgIIAPgCIAPgCQAWAAASAKQASAKANAUQAHAKAFARQAFARAEAXIABAMIABAIQAAANgHAKQgGAJgNAFIgFABIgDAAIgEAAQgLAAgIgHQgIgGgFgNQgDgjgGgSQgGgSgJAAQgVAAgXAcQgHAJgFAMQgEAMgDAOQgHARgFAkQgGAlgGA5IgCAYIgBAYIAEDRIADCOQAAAUgGANQgEANgLAGQgGAFgLACQgLACgRAAgAiKlJQgIAMgIAaIgIAkQgDAQAAAKQAAAJACAJIAHATIABABQAGgKADgLQADgLAAgKIAGgnIAFgdIAIgYIAEgMIAAgCIgBgBIgDgBQgHAAgHAMg");
	this.shape_83.setTransform(528.625,85.275);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#282E46").s().p("AB0F9QgSAAgQgFQgRgFgOgLIgiAEIgYABQgcAAgagGQgZgIgWgOQgxgdgWg5IgHgdQgCgOAAgNIAAgRQAAhUA8hBQAWgTASgLQATgMAQgFQAJgDALgCIAbgFQABgQAAgYIABg3IAAguQAAgtgCgbQgCgagEgIQgGgWgNAAQgEAAgJAIIgSAWQgKAMgFAUQgFAUABAaQgBATgBAKQgCALgDACQgGAIgGADQgGAEgGAAIgFAAQgNAAgHgGQgJgGgEgNIgBgLIAAgJIAAggQAAgdAKgbQALgcAWgbQAPgRAOgLQAPgLAMgGQAWgHAWgEQAWgEAXAAIAGAAQAfAAAcANQAcAMAXAZQASAXAJAlQAJAlAAA0IgEDeIgCByIACBhIABA1IAAAZQAAAOgFAKQgFAKgKAEQgKAHgKADQgLADgMAAgAhGBGQgZAVgLAdQgMAcAAAjIAAAHQAAAmASAaQARAZAkANIATAEIATABIANAAIADgBQgHgZgFgcQgEgbABgeIAAhAIAAg5QAAgVACgIQgVABgrAhgABpk9IAAABQAAADADAFIAIANQAGALAEANQAFANACAPIAFAjQACALABAAIADAAQAFgCADgGQACgFAAgKIAAgCQAAgYgIgVQgHgVgPgSQgMgLgEgBIgDABg");
	this.shape_84.setTransform(478.75,84.475);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#282E46").s().p("AAEHuQgaAAgZgJQgZgJgXgUQgTgTgKgaQgKgaAAgfIAAgLQAAgPAFgKQAGgJAKgFIAHgBIAGgBIACAAQAMAAAJAHQAHAGAFANQAAAjAGAVQAGAUAMAGQAEAGAIACQAHAEAJACQAHAAAGgGQAGgEAIgMQAFgFACgVQADgUAAgiIAAgJIABgIIgCg5IAAgeIAAgHQgaAXgWALQgXALgUAAIgDAAQgYAAgagOQgXgNgYgcQgPgPgJgVQgKgVgGgcQgIg4gGg1QgFgzAAg0IAAhFQAAh/AFhJQAGhIAIgTQAHgIAHgFQAHgDAIgBQAKABAIAGQAIAHAFANIAAAGQgCAAgCBHIgFDVIAAAcQABBPAFA+QAHA/AKAwIAJASQAEAJAGAGQAOAQAKAIQAMAHAFAAIADAAQAKAAALgHQAMgHAOgOQAKgLAHgRQAHgQAFgXQAFgbACgZQADgZAAgUIAAg8QAAhNAEhIQADhKAGhHQAGgpAGgZQAHgYAFgHQAKgOAOgKQAMgIAQgFIAHgBIAEAAIAKAAQA8AAAXA3QAJASAFAiQAGAhAAAxIgCBNIgECBIAAAhIgBAqIABAqIABBoIAAAGQgBBGgDArQgDArgEARQAAAKgCASQgEARgHAZQgGAOgKAOQgIAPgMAPQgNANgMAKQgMAJgLAGQgaAMgaAIQgaAGgZAAgACim+IgCACQAFANAEAOIAHAhQACAaADAOQADAOABAAIABAEIAFAGIABAAQAJgIAAgTIAAgDQAAgKgBgJQgCgKgEgJQABgFgEgMIgOgfIgJgIIgEgCIgCAAg");
	this.shape_85.setTransform(396.55,96.4);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#282E46").s().p("AgYFjQgbgLgbgZIgSgUQgQgUgNgXQgNgXgKgYQgHgQgGgTIgMgsQgTheAAhJQAAhKAPg8QAQg9AfguQArg6A+gWQANgEAMgCQALgCAMAAIAEAAQAmAAAfATQAgASAbAkQAFAIAFAMQAFALAEARIAJAnQACARAAALQADAjABAgIABA+IAAALQAAAQgFALQgHAKgMADQgGADgPABIgjABIhPACIgmABQAAAUAFAjQADAjAJAyQAGAdAHAVQAGAUAHAPQAGALAIANQAJANALAMIACABIABACIABAAQAMgJAJgUQAKgVAIgfIALgoQAFgPACgFQAHgGAGgDQAIgEAIAAQAMAAAIAHQAJAGAEAMIAAAEIAAAEIAAACQAAAHgGAaIgUBDQgGAOgHANIgRAbQgVAXgbALQgbALghAAQgbAAgagMgABgg6IAYABIAAgKQAAgygDgmQgCgmgGgbQgFgQgHgMQgHgMgIgJIgXgQQgIgGgCAAQgTAXgMAbQgMAagGAeQgEAdgDAfQgDAgAAAhIAAADIAxgBIAegBIAbABgAhNkoQgPANgRAWQgKAQgGANQgFANAAAJIAAACIABAJQAAABABABQAAAAAAABQABAAAAAAQABAAABAAQAFgCAFgGQAFgHAEgLQAAgDAHgLIATggIAPgSIAVgYIgCgCIgDAAQgNADgPANg");
	this.shape_86.setTransform(342.8992,85.725);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#282E46").s().p("AifHTQgagTgQgnQgDgFgDgPIgFguQgCgJgChPIgBjkIAAgYIgBg8QAAg7ADhCQADhCAGhKQAFgaAGgXQAGgXAIgTQAIgWAIgPQAHgPAJgHQAHgGAIgEQAJgDAJAAQAQAAAUAHQAUAHAYAOQAJAFAHARQAHASAFAeIAEAuIACAsIAAACIgBAyIgDBEIAVgeQAZgbAZgPQAagOAbAAIAHAAQASAAAQAJQAPAIANARQAQAUAIA4QAIA4AABcQAAAvgDBcIgIDjIACBTQAAAKgFAHQgGAIgKAFIgEACIgEABIgNAAQgMAAgNgSQgDgFgBgYIgBhBIAJkRIAAgdIABhHQAAiOgTgqIgDgCIgEgBQgVAAgUAUQgUATgUAnQgMAYgKAjQgMAjgKArIgEATIgBAJIAABtIgDBbIgCCHQAAALgDAOQgEANgGAQQgLAZgSAMQgRAMgYAAQgkAAgbgTgAiRmcIgJAQQgMAZgGAbQgGAbAAAeQAAAGABAEQACADACACQAHgDAEgGQADgGAAgJQAEgkAFgaQAEgZAFgPIAKgWIgDgCIgCAAQgFADgEAHg");
	this.shape_87.setTransform(290.675,73.375);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#282E46").s().p("AABHdQgJgCgMgGQgLgIgJgIQgHgJgGgKQgKgNgLgjQgMgkgMg5QgIgmgDghQgEggAAgaIgHhnQgCgxAAgpQAAheAEhLQAEhKAGg2QAFgXAGgUQAGgVAHgTIg1ABIhGAEIgDAAQgHAAgHgFQgGgEgFgKIgBgFIAAgDIAAgCQAAgKAFgIQAGgHAMgEQAbgHAqgEQArgEA5AAIAKAAIAOgBQAAABA3ABICpADQALAAAJAHQAIAGAFAOIAAAIQAAALgHAIQgHAIgNAFIh7AAIgDAAIgBABIAJBDQADAeAAAVIAAADIgHCRIgCBdQAAAlACA7QACA8AEBSQAAA8ABAuQACAtAFAeIACAQIAAAOIAAAJQAAAOgJAPQgJAOgSANQgJAGgMACQgMADgPAAQgJAAgKgCgAg0mSQgGAMgGAWQgGAMgDAPQgDAPAAARIAAAFQAAAJACAGQACAFADACQADAAACgGIAFgRQAAgOAEgZQAGgZAKgkIAAgBIACgEIgBgCIgBgBIgBAAQgFAAgHALg");
	this.shape_88.setTransform(243.025,74.575);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#282E46").s().p("AghAzQgOgIgLgQQgDgGgCgIQgCgHAAgHQAAgOAIgLQAHgMAOgKQAIgFAJgDQAKgCAJgBQATAAAQAJQAPAJAKARQADAGABAGQACAGgBAGQAAAUgMAPQgMAOgZAJIgLABIgFABQgSAAgPgJgAghgeQgEAFgFAKIgBAGIgBAEIAAACQAAAUANAKIADggIAFgJIAIgPIAAgDIgHgCQgGAAgFAEg");
	this.shape_89.setTransform(167.8563,116.525);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#282E46").s().p("AgvHmQgRgEgTgJQgKgDgOgJQgNgJgQgPQgqgrgJgSQgIgNgIgRQgHgPgFgUQgHgYgDgTQgCgTAAgPIAAgJQAAgUADgVQAEgVAHgWQAHgJAHgEQAGgEAIAAIACAAQAVAAAHAVIACADIAAAFIAAABQgDANgBAPIgBAeQAAA4AQAqQAQAqAiAdQALAHALADQALAEANAAQANAAAQgPQAQgPASgeQAKgVAHgaQAHgZAFgeIACgoQACgSABgNIAAgMQAAhWgNg/QgLg+gXgmQgCgFgIgKQgHgJgOgNQgGgEgJgCIgTgHIgKgCIgOgHQgIgHgDgKQgEgKABgNIAAgFQAAgIAHgeIAXhQIAbhgIhIAGIgnAEQgLAAgIgEQgJgFgEgJIgCgFIAAgDIAAgHQABgJAGgHQAHgIANgEQA5gLAygFQAxgFApAAIAMAAQAaAAASAIQASAHAKAQQAGAHADAKQADALABANQgBAdgRAwQgRAwgiBEIAAABIAAABQARAFARAJQAQAKAQAOQARASAOAUQAMATAJAVQAXA0ALA3QALA4AAA8IAAAMQAAB3gcBJQgHAXgSAcQgRAcgdAhQgeAbgYAJQgUALgUAFQgVAFgTAAIgMAAIgDAAQgMAAgPgEgAA3lRQgFAKgDAIQgDAJABAIQAAAFABADQACACAEABQAIgHAFgIQAHgIACgJQADgGAFgOIAIglIACgSIABgQQAAgEgBgCQgCgCgDAAIgDAAQgJAjgUAyg");
	this.shape_90.setTransform(124.6,73.5775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34}]},1).to({state:[{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-940.6,0,3686.6,182.3);


(lib.eyes = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AgZAwQgNgTAEgcQAEgaAPgTQAKgNAMgBQATgBAGAWQAGARgEATQgGAigRASQgJAIgHAAIgCAAQgLAAgHgLg");
	this.shape.setTransform(17.9041,3.8216,0.4382,0.4382);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AgZAwQgNgTAEgcQAEgaAPgTQAJgNAOgBQASgBAGAWQAGARgEATQgGAigRASQgJAIgHAAIgCAAQgLAAgHgLg");
	this.shape_1.setTransform(1.3856,2.487,0.4382,0.4382);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#351D41").s().p("AgZAwQgNgTAEgcQAEgaAPgTQAKgNAMgBQATgBAGAWQAGARgEATQgGAigRASQgJAIgHAAIgCAAQgLAAgHgLg");
	this.shape_2.setTransform(16.2525,5.4348,0.5944,0.0874);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#351D41").s().p("AgZAwQgNgTAEgcQAEgaAPgTQAJgNAOgBQASgBAGAWQAGARgEATQgGAigRASQgJAIgHAAIgCAAQgLAAgHgLg");
	this.shape_3.setTransform(0.2934,5.0187,0.5944,0.0874);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},70).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.8,-0.1,21.3,6.5);


(lib.cat1_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.cat1();
	this.instance.setTransform(-93,-60,0.1026,0.1026);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-93,-60,186,119.9);


(lib.women_moving = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EkflA71MAAAh3qMI/KAAAMAAAB3qg");
	mask.setTransform(1840.55,382.95);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#54211F").s().p("AgHA7QgSgMgfgYIAagPQATgLAUgdIAigxQACAlgMAhQgIASgMAPIAYAXQAiAjgXABQgagEgdgSg");
	this.shape.setTransform(3140.639,223.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#54211F").s().p("AAAAvQgogEgjgbQgfgYgUgmQBPA3AwAFQA8AGBCg9QgNAogjAZQghAXgkAAIgKAAg");
	this.shape_1.setTransform(3142.75,246.0262);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("AAAArQgNgBgJgMQgJgNAAgRQAAgSAKgMQAKgMAMAAQANAAAJANQAJANAAARQgBARgJANQgKAMgMAAIAAAAg");
	this.shape_2.setTransform(3122.0001,216.901);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282E46").s().p("AAAArQgNAAgJgNQgJgNAAgRQABgRAJgNQAKgMAMAAQANAAAJANQAJANAAARQgBARgJANQgJAMgNAAIAAAAg");
	this.shape_3.setTransform(3167.7751,217.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#7E2D20").s().p("AhJA7QgigSgDgeQgDgdAfgZQAegYAtgFQAugEAiASQAjASADAeQADAdgfAZQgeAYguAFIgSABQgiAAgcgPg");
	this.shape_4.setTransform(3174.1,234.5832);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#7E2D20").s().p("AgFBJQgugDgfgYQgegYACgdQACgfAigSQAigUAtAEQAuADAfAYQAgAYgDAdQgCAegiAUQgdAQgmAAIgNgBg");
	this.shape_5.setTransform(3116.278,233.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFFFFF").ss(3.6).p("ACQAAQAAA7gqArQgqAqg8AAQg7AAgqgqQgqgrAAg7QAAg7AqgqQAqgqA7AAQA8AAAqAqQAqAqAAA7g");
	this.shape_6.setTransform(3083.825,243.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFFFFF").ss(3.6).p("ACQAAQAAA7gqArQgqAqg8AAQg7AAgqgqQgqgrAAg7QAAg7AqgqQAqgqA7AAQA8AAAqAqQAqAqAAA7g");
	this.shape_7.setTransform(3202.775,243.375);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#A5432D").s().p("AhWCQQgjhAAAhbQAAhYBAg6QA7g1A8AOQAsALAMA9QALA2gQBKQgQBJgiA3QgjA7gmAIIgKABQgkAAgeg4g");
	this.shape_8.setTransform(3205.345,210.3346);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A5432D").s().p("AATDHQglgIgng7Qglg3gUhJQgWhKAIg2QAJg9AsgLQA9gOBFA1QBMA7AABXQAABbgjBAQgeA4gkAAIgLgBg");
	this.shape_9.setTransform(3082.103,210.3263);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CCCCCC").s().p("AC7AgQhngMhTgDQhGgEhzAAIhfACQg5ACgngBQBSgnBogTQBcgRBmAFQBlAEBcAcQBmAcBMAyQh/gRg+gHg");
	this.shape_10.setTransform(3153.725,91.1279);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CCCCCC").s().p("AjTgaQBUg3BjgTQBigTBiASQBoATBLA2QhqgQhPgBQhdgBhTARQhVAQhVAkQhEAeheA6QAxhRBWg4g");
	this.shape_11.setTransform(3128.7,144.8872);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("ApsODQgngBgJglIAAgCQgiiKgPhqQhDm/CZjzQALgQgDgUIgEgXQgZibAIh0QALiYBEhnQBiiVDDg4QCagsDSAPQC6ANCDBHQCeBWAvCfQAfBoABB3QABBmgWB6QgDATALASQAsBEAZBYQAwCvgPDUQgLCcgzDmQgJAmgnABQgoABgKgnQg7jYiFhtQiPh3jtAAQjWAAiWB6QiTB3g/DZQgKAkglAAIgCAAg");
	this.shape_12.setTransform(3143.2859,108.7466);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2E120C").s().p("ApEDvQAZh8AzhsQCelOFJgXQDmgQDUE9QBMBwA0B8QAuBugEAlQjIhDiBhdQh8hbh8ijQiECiiRBsQioB8imAmQgHgPAUhig");
	this.shape_13.setTransform(3141.7061,157.2866);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#A5432D").s().p("An4HTQhrkcAAnFQAAlJCRiKQCMiFFGAAQFGAACMCFQCSCKAAFJQAAHWhhELQiSGUlxAAQlgAAiYmUg");
	this.shape_14.setTransform(3143.3,198.525);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F6CF7F").s().p("A6LH6QgFggAEgvQATjTARh+QAZi4AoiTQAzjDBYhrQEnBiFXA1QFiA2F4AAQGGAAFtg6QFig4EthqQCWCMBMDjQAnB3AYCcQAKBHAVDSIALBSQAGAogBATQtHA1tIAAQtEAAtGg1g");
	this.shape_15.setTransform(3148.2059,408.4188);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#F6CF7F").s().p("AiLA0Qhczziwn0IJBkKQB1KPBGUIQBBSagRMJQguACi6AeQi6AfguACQgTxCg9tIg");
	this.shape_16.setTransform(3290.9273,595.35);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#F6CF7F").s().p("AiretQi6gegvgBQgRsMBBypQBH0YB0qNIJCEIQiwH0hdUFQg9NQgTRJQgtgCi6gfg");
	this.shape_17.setTransform(3014.1394,595.55);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F6CF7F").s().p("EgPoAg+QgLv9g0xBQhI3ehzpFQTiiTTjCTQhzJFhIXeQg0Q+gLQAQn1Awn0AAQn0AAn0gwg");
	this.shape_18.setTransform(3148.225,590.1125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#6F2D1E").s().p("Ak1EEQAjhKAejAIAXi2IADgCQBpgyCagYID/gDIAAB+QACBkANBTQiNB+iEA1QhyAvh+AAQg1AAg2gIg");
	this.shape_19.setTransform(3142.05,275.4398);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#A5432D").s().p("A6LQCQgFghAEguQATjTARh+QAZi5AoiTQAehyAnhOQAxhjBHg+QB6huDrgkQBAgJCDgSQBxgRBOgdQEHhhBJlhQAXhuACh7IgEhlQC3ADBOABQBaAACqgDIABCaQAEB9AVBiQA+EoDRBPQBnAmBBATQBaAZBRAHQEFAXCzCUQCtCOBUD6QAnB3AYCdQAKBHAVDTIALBSQAGAogBATQtGA0tHAAQtFAAtHg0g");
	this.shape_20.setTransform(3148.2059,356.45);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CCCCCC").s().p("AkfBjQAnhdAbh+QBuBNCGAaQCHAZCCgfQh8BgiYAhQhFAPhEAAQhSAAhQgWg");
	this.shape_21.setTransform(3418.875,296.9957);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#CCCCCC").s().p("ADTEhQgMgQgTgfQgWgngbg8IgshjQgag6gTgmQg0hrg9g/QhGhIhugeQA3gIA6AQQA5AQAvAkQAnAdAqA2QAdAmAfA7QAoBRAlB+IAdBpQATBEAUAgQgVgOgUgZg");
	this.shape_22.setTransform(3456.475,184.0388);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#CCCCCC").s().p("AmDCWQjbgLi7g0QDhAMC1gFQDbgIC1gdQC8gbDPg3QCygwDQhOQilBrjMBIQi6BDjXAhQikAYiaAAQgvAAgugCg");
	this.shape_23.setTransform(3403.875,365.0864);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#7E322F").s().p("AgIA7QgRgLgggZIAagPQATgLAUgdIAigxQACAmgMAfQgIAUgNAQQBEA3gfADQgbgFgdgSg");
	this.shape_24.setTransform(3429.7093,236.525);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#7E322F").s().p("AAAAvQgogFgjgbQgfgXgVgmQBQA3AwAFQA9AGBCg9QgOAogjAZQghAXglAAIgJAAg");
	this.shape_25.setTransform(3431.775,259.3204);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#282E46").s().p("AgWAeQgJgNAAgRQABgRAJgNQAKgMAMAAQANABAJAMQAJANAAARQgBASgJAMQgKAMgMAAQgNAAgJgNg");
	this.shape_26.setTransform(3411.0251,230.199);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#282E46").s().p("AAAArQgNAAgJgNQgJgNAAgRQABgSAJgMQAKgMAMAAQANABAJAMQAJANAAARQgBARgJANQgJAMgNAAIAAAAg");
	this.shape_27.setTransform(3456.825,231.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#AB5B58").s().p("AhJA7QgigSgDgeQgDgeAegYQAfgZAugEQAsgFAjATQAjASADAeQADAdgeAZQgfAYguAFIgRABQgjAAgcgPg");
	this.shape_28.setTransform(3463.1,247.851);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#AB5B58").s().p("AgEBJQgugEgfgXQgfgYACgeQACgeAigSQAigUAtAEQAuAEAfAXQAgAXgDAeQgCAfgiASQgdARglAAIgNgBg");
	this.shape_29.setTransform(3405.2781,246.65);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AqWEyQgMjLAajGQAUiZArhWQAwhfBphQQBhhKB/gaQBygYCCAQQAxAFBYADQBNACAlAGQByATBVBtQBhB8AuCqQAqCcgECzQgDBkgQCFQgWDBggAHQhgAWhWhzQg2hJhTi+QhZjKgrg/QhOh1hSASQjNAsi0FoQg4BwgvCDQgXBCgMArQhpgYgRkng");
	this.shape_30.setTransform(3433.0431,175.992);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#DA6449").s().p("AnsHXQh3ksAAm0QAAlICRiKQCMiFFGAAQFGAACNCFQCRCKAAFIQAAG/hrEYQiYGLleAIIgLAAQlGAAiemKg");
	this.shape_31.setTransform(3432.675,202.4069);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("A0HU+QAdhiAmhHQAuhWBAg5QBMhEBygmQBTgcCDgSIDQgcQB5gZBDg6QAygrAohFQBKh9AljAQjEishUl3Qg3j2AAkgQAAlPDVi1QC6ieEmgGQEwgHC6ClQDLC1AAFVQAAFXhAEAQhUFMi6CZQgIAHAhBkQARA4AZA1QAzBwBCBEQBABCBkAgQBLAYB0ALQBIAGBFARQmqEPnjCIQmVBxmpALIhWABQl9AAlxhTg");
	this.shape_32.setTransform(3407.775,250.2393);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#99C4C4").s().p("AhXA1QiIy5i4oMIJBkJQB1KPBGT6QBBSOgRMJQguABiGAJQiGAHguACQgPtSh1wTg");
	this.shape_33.setTransform(3578.0773,596.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#99C4C4").s().p("Ajmd6QiAAAgugCQgRsDBBx8QBGzhB1qRIJBEJQi6IRiMSUQh7QKgPM7QgtgCiBACg");
	this.shape_34.setTransform(3292.6727,593.05);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#99C4C4").s().p("EgPoAgKQgLvpg0whQhI2nhzpHQTiiUTjCUQhzJHhIWnQg0QhgLPpQn1Avn0AAQn0AAn0gvg");
	this.shape_35.setTransform(3435.375,589.2375);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#99C4C4").s().p("A6LQCQgFghAEguQATjTARh+QAZi5AoiUQAehxAnhOQAxhjBHg+QB6htDrgkQBBgKCCgRQBxgSBOgdQEHhhBJlhQAXhuACh7IgEhkQCvACBWAAQBUABCwgDIABCaQAEB9AVBiQA+EoDSBPQBoAnBAASQBZAZBRAHQEFAXCzCUQCtCPBUD6QAnB2AYCeQAKBHAVDSQADAZAIA5QAGAoAAATQtIA0tIAAQtEAAtGg0g");
	this.shape_36.setTransform(3435.3757,360.8938);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#DE9398").s().p("AEAHIQh7gviJg6IhxgxIAUBzQAWB8ANAvQh5gvhuh+QhThhhbihIipDSQhbBygEgTQhCkuBzklQB3kzD3hsQDthnFjChQErCHB3HjQAkCVAQCqQAIBVACA3QgMACgPAAQh6AAlfiFg");
	this.shape_37.setTransform(2867.6083,149.7068);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#F79794").s().p("AgHA6QgSgKgfgaIAagOQASgMAUgcIAjgwQACAlgMAfQgIATgNAPIAZAYQAiAhgXADQgagFgdgTg");
	this.shape_38.setTransform(2856.827,225.75);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#F79794").s().p("AAAAvQgpgEgigbQgggYgUgmQBQA3AwAFQA8AGBDg9QgNAoglAZQggAXgkAAIgKAAg");
	this.shape_39.setTransform(2858.95,248.5262);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#282E46").s().p("AAAArQgNgBgJgMQgJgNAAgRQABgSAJgMQAKgMAMAAQANAAAJANQAJANAAARQgBARgJANQgJAMgNAAIAAAAg");
	this.shape_40.setTransform(2838.1751,219.401);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#282E46").s().p("AAAArQgNAAgJgNQgJgNAAgRQABgRAJgNQAKgMAMAAQANAAAJANQAJANAAARQgBARgJANQgJAMgNAAIAAAAg");
	this.shape_41.setTransform(2883.9751,220.375);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FDCEB0").s().p("AhJA7QgigSgDgeQgDgdAegZQAfgYAugFQAtgEAjASQAiASADAeQADAdgeAZQgfAYguAFIgSABQgiAAgcgPg");
	this.shape_42.setTransform(2890.25,237.0832);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FDCEB0").s().p("AgEBJQgugEgfgXQgfgYACgdQACgfAigSQAjgUAtAEQAuAEAfAYQAfAXgDAdQgCAegiATQgdARglAAIgNgBg");
	this.shape_43.setTransform(2832.4283,235.85);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFC4B6").s().p("AhrCfQgjg7AAhVQAAhRBbhPQBWhLA7ANQAsAKAEBAQAEA5gcBPQgaBOgpA6QgsA/glAHIgKABQglAAgegzg");
	this.shape_44.setTransform(2921.5698,206.2461);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFC4B6").s().p("AAfDRQglgHgsg/Qgpg6gahOQgchPAEg5QAEhAAsgKQA7gNBWBLQBbBPAABRQAABVgjA7QgfAzgkAAIgKgBg");
	this.shape_45.setTransform(2795.1302,206.2461);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFC4B6").s().p("AAAN6QlWgCicmKQhxkdAAmxQAAlMCRikQCXipE7AAQE8AACXCpQCRCkAAFMQAAG8hqEVQiYGJlfAAIgDAAg");
	this.shape_46.setTransform(2858.325,196.6503);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#EA8D77").s().p("Ak2ECQBXizACj4QABgLgBgKIADgBQBpgzCSgQQBIgHC/gDIAAB/QACBmANBTQh6CKiWA1QhhAih0AAQhBAAhHgLg");
	this.shape_47.setTransform(2854.925,275.5639);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#5C5D7B").s().p("A6LKOQgFghAEguQATjVARh9QAZi5AoiSQAehyAnhOQAxhjBGg/QB7htDrgkQBAgKCDgRQBxgSBOgcQAXgJAhgRQBfB2CNBDQCSBFClAAQCpAACVhJQCQhHBeh7IAQAHQBnAnBBATQBaAZBRAGQEFAXCzCUQCtCPBUD7QAnB2AXCdQALBKAVDQIALBRQAGAogBAUQtGA0tHAAQtFAAtHg0g");
	this.shape_48.setTransform(2861.0559,393.7);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#5C5D7B").s().p("AiLA1Qhdzsiwn0IJCkKQB1KQBGT/QBBSTgRMJQguABi7AfQi5AeguACQgTxBg9tAg");
	this.shape_49.setTransform(3003.7523,594.575);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#5C5D7B").s().p("AisdpQi6gegugCQgRsBBAxuQBGzQB2qSIJBEJQiwH2hcS+Qg+MrgTQpQgtgBi6gfg");
	this.shape_50.setTransform(2718.3633,590.125);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#5C5D7B").s().p("Av4fbQgLwegsu9QhA18hzpDQTiiTTjCTQh0JNhPVyQg8RAgLObQn0Avn0AAQn0AAn1gvg");
	this.shape_51.setTransform(2861.05,580.1375);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#5C5D7B").s().p("A6LQCQgFghAEguQATjVARh8QAZi5AoiTQAehyAnhOQAxhjBGg+QB7huDrgkQBAgJCDgSQBxgRBOgdQEHhhBJlhQAXhuACh7IgEhlQC3ADBOABQBaAACqgDIABCaQAEB9AVBiQA+EoDRBPQBnAmBBATQBaAZBRAHQEFAXCzCUQCtCOBUD6QAnB3AXCdQALBLAVDPIALBSQAGAogBATQtGA0tHAAQtFAAtHg0g");
	this.shape_52.setTransform(2861.0559,356.45);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#DE9398").s().p("AlgOFQijh8hqihIgqEBQgdhMgyidQgxiegdhMQgsAlhMBhIhDBZQgOjjADhOQAHikAgigQAvjqBZjGQBkjhCRieQB8iGC3hIQCvhFDIAAQHngCEFIMQBcC5AzDkQAnCqAFB/QAHDIhFDOQhFDOiACkQACg2AAhmQAAhnABg1ImsFlIjoifQgpA7gZBQQgYBHgIBNQjDhDiih7g");
	this.shape_53.setTransform(2855.631,191.1998);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#7E322F").s().p("AgHA6QgSgKgggZIAbgPQASgLAUgdIAjgxQABAlgMAgQgIAUgNAQQBEA3gfADQgbgGgcgSg");
	this.shape_54.setTransform(2565.1843,214.575);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#7E322F").s().p("AAAAvQgogFgjgbQgfgXgVgmQBQA3AwAFQA9AGBCg9QgOAogjAZQghAXglAAIgJAAg");
	this.shape_55.setTransform(2567.275,237.3704);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#282E46").s().p("AAAArQgNAAgJgNQgJgNAAgRQABgRAJgNQAKgMAMAAQANABAJAMQAJANAAARQgBARgJANQgJAMgNAAIAAAAg");
	this.shape_56.setTransform(2546.525,208.225);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#282E46").s().p("AgWAeQgJgNAAgRQABgRAJgNQAKgMAMAAQANABAJAMQAJANAAARQgBASgJAMQgKAMgMAAQgNAAgJgNg");
	this.shape_57.setTransform(2592.325,209.199);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FF9A43").s().p("AI6IUQgdg4gOhVQl9BKkbh5Qjlhihli3QgBABg5D+Qg4D4gMgIQgTgMghhFQgihHgdhbQhLjrAch/QA2jyDLiLQC2h7D/gPQDygPDTBYQDdBbBaCkQBnC+hIEqQgrCvhJCFQgGALgIAAQgPAAgTglg");
	this.shape_58.setTransform(2571.1377,146.2158);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFAD98").s().p("AhrCfQgjg7AAhVQAAhRBbhPQBWhLA7ANQAsAKAEBAQAEA5gcBPQgbBOgoA6QgsA/gmAHIgKABQgkAAgegzg");
	this.shape_59.setTransform(2634.4004,206.2461);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFAD98").s().p("AAfDRQglgHgsg/Qgpg6gahOQgchPAEg5QAEhAAsgKQA7gNBWBLQBaBPAABRQAABVgjA7QgdAzgkAAIgLgBg");
	this.shape_60.setTransform(2507.9552,206.2461);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFAD98").s().p("AnmHTQh9ksAAmnQAAlICRiKQCNiFFFAAQFGAACNCFQCRCKAAFIQAAGqh6EpQigGFlHAAQlGAAijmFg");
	this.shape_61.setTransform(2571.175,197.075);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#E4765C").s().p("Ak2ECQBWixADj6IAAgVIADgBQBqgzCSgQQBHgHC/gDIAAB/QACBmANBTQh6CKiWA1QhhAih0AAQhBAAhHgLg");
	this.shape_62.setTransform(2567.75,275.5639);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#DE9398").s().p("A6LKOQgFggAEgvQATjYARh6QAZi5AoiSQAehxAnhPQAxhjBGg/QB7htDrgkQBAgKCDgRQBxgSBOgcQAVgIAjgSQBNBhD7DmQB+BzBuBgIDfjXQDvjrBNhlIAQAHQBnAnBBATQBaAZBRAGQEFAXCzCUQCtCPBUD7QAnB2AXCdQALBKAVDQIALBRQAGAogBAUQtGA0tHAAQtFAAtHg0g");
	this.shape_63.setTransform(2573.9101,393.7);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#DE9398").s().p("AiLA1Qhd0NiwnzIJCkKQB0KOBHUhQBBSvgRMNQguABi7AfQi5AeguACQgUxSg8tPg");
	this.shape_64.setTransform(2716.6106,597.775);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#DE9398").s().p("AisefQi6gfgugBQgRsKBAybQBH0JB1qPIJBEKQiwH0hcT1Qg9NEgURGQgtgCi6geg");
	this.shape_65.setTransform(2431.2133,595.475);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#DE9398").s().p("AvDfHQgJtThJx0QhX1gh2pNQTiiRTjCRQhyI1g3V4QgfMigNSlQn1Avn0AAQnzAAn1gvg");
	this.shape_66.setTransform(2573.9,582.0625);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFAD98").s().p("A6LQCQgFggAEgvQATjYARh5QAZi5AoiTQAehyAnhOQAxhjBGg+QB7huDrgkQBAgJCDgSQBxgRBOgdQEHhhBJlhQAXhuACh7IgEhlQC3ADBOABQBaAACqgDIABCaQAEB9AVBiQA+EoDRBPQBnAmBBATQBaAZBRAHQEFAXCzCUQCtCOBUD6QAnB3AXCdQALBLAVDPIALBSQAGAogBATQtGA0tHAAQtFAAtHg0g");
	this.shape_67.setTransform(2573.9101,356.45);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FF9A43").s().p("AtWVRQgsoWAHpHQAOyNECjwQBlheC/g2QC2gzDNAAQDSgBCiA1QCwA6BFBrQC9EjAYRvQAMI4gaH+g");
	this.shape_68.setTransform(2570.4919,233.0748);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#F6CF7F").s().p("ArMHRIALhdQgNjzCNjZQCNjbDphiQDlhgECA4QD7A2C2CwQjsFImGC5QlhCpl4AAQgnAAgngCg");
	this.shape_69.setTransform(831.875,137.1101);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#E4765C").s().p("AAAA6QgSgKgegTIASgNQATgPATgdIAggyQABAkgNAfQgLAXgRAQQAgAbARAYQgXgHgagOg");
	this.shape_70.setTransform(839,202.925);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#E4765C").s().p("AAAAuQgngEgkgbQgfgXgUgmQAzAjAMAHQBfA3BghbQgOAogkAYQggAXgkAAIgKgBg");
	this.shape_71.setTransform(840.8,225.9262);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#282E46").s().p("AAAAgQgRgBgNgJQgMgKAAgMQABgNAMgJQANgJARAAQASABAMAJQAMAKAAAMQAAANgNAJQgMAJgRAAIgBAAg");
	this.shape_72.setTransform(820.049,190.875);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#282E46").s().p("AAAAgQgRgBgNgJQgMgKAAgMQABgNAMgJQANgJARAAQARABANAJQAMAKAAAMQAAANgNAJQgMAJgRAAIgBAAg");
	this.shape_73.setTransform(865.849,191.8251);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFAD98").s().p("AhrCfQgjg7AAhVQAAhRBbhPQBWhLA7ANQAsAKAEBAQAEA5gcBPQgaBOgpA6QgsA/glAHIgKABQglAAgegzg");
	this.shape_74.setTransform(909.0698,195.6275);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFAD98").s().p("AAfDRQglgHgsg/Qgpg6gahOQgchPAEg5QAEhAAsgKQA7gNBWBLQBbBPAABRQAABVgjA7QgfAzgkAAIgKgBg");
	this.shape_75.setTransform(782.6302,195.6275);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFAD98").s().p("AnmHTQh9kgAAmgQAAlJCRiKQCNiFFFAAQFHAACMCFQCRCKAAFJQAAGjh6EdQieFzlIAAQlIAAiilzg");
	this.shape_76.setTransform(845.825,184.65);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#E4765C").s().p("Ak2ECQBXizACj4IAAgVIADgBQBpgzCSgQQBIgHC/gDIAAB/QACBmANBTQh6CKiWA1QhhAih0AAQhBAAhHgLg");
	this.shape_77.setTransform(842.425,264.9524);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#DE9398").s().p("A6LKHQgFghAEguQATjVARh8QAZi6AoiSQAehyAnhNQAxhkBHg/QBmhbClglQBfB0DZBHQDfBJERAAQFUAAD5htQD3hsAZieQBeAjBBASQBVAXBNAHQEFAWCzCUQCtCQBUD6QAnB2AXCdQALBKAVDQIALBRQAGAogBATQtHA1tIAAQtEAAtGg0g");
	this.shape_78.setTransform(848.5559,383.7688);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#DE9398").s().p("AodCrQjDw2jQpRIZzn1QB0KPBHT6QBASQgRMHQgtACpNBAQpLBAgvACQgMrGjKxig");
	this.shape_79.setTransform(937.6023,586.85);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#DE9398").s().p("AiseRQi7gfgtgBQgRsJBByOQBGz7B1qPIJBEJQiwH1hcTnQg9NBgTQ7QgvgBi5gfg");
	this.shape_80.setTransform(705.8727,583.5);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#DE9398").s().p("EgPoAicQgJxNg2xPQhF2Ih2rxQTii7TjC7Qh2LxhFWIQg2RMgJRQQn1A8n0AAQnzAAn1g8g");
	this.shape_81.setTransform(848.575,635.425);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFAD98").s().p("A6LQCQgFghAEguQATjVARh8QAZi5AoiUQAehxAnhOQAxhiBHg/QB6htDrgkQBAgKCDgRQBxgSBOgdQEHhhBJlhQAXhuACh7IgEhkQC3ADBOAAQBaAACqgDIABCaQAEB9AVBjQA+EnDRBPQBmAmBCATQBaAZBRAHQEFAXCzCUQCtCPBUD6QAnB3AXCdQALBKAVDPIALBSQAGAogBATQtHA0tIAAQtEAAtGg0g");
	this.shape_82.setTransform(848.5559,345.8438);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#F6CF7F").s().p("AssK3QgJhYgOipQgak1AFibQAIkPBPizQBijdDIhxQCuhiDugKQDGgJCRAeQDDApB0BxQDODIArG5QAPCcgCDeQgCB8gGDjQgCCmgFBjI5VAdQgLAAgWjig");
	this.shape_83.setTransform(832.9014,168.9712);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#FFFFFF").ss(2.3).p("AhBAJQAegOAjgBQAjgBAfAM");
	this.shape_84.setTransform(268.7,194.5375);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#FFFFFF").ss(2.3).p("AEhgjQAAB+hVBaQhUBZh4AAQh2AAhVhZQhUhaAAh+QAAh4BUg9QBLg2CAAAQCBAABLA2QBVA9AAB4g");
	this.shape_85.setTransform(304.15,198.8);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f().s("#FFFFFF").ss(2.3).p("AEggjQAAB+hUBaQhVBah3AAQh3AAhUhaQhUhaAAh+QAAh4BUg9QBLg2CAAAQCBAABLA2QBUA9AAB4g");
	this.shape_86.setTransform(233.875,197);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2E120C").s().p("ArDH7QhXglAEj5QADjdA7iqQAsh+AqhEQA+hjBXgiQAygTBMAEQArADBXALQJCAsDrFdQBLBtA6CvIAqCAQAWBDATAlQg2A7hPAZQhQAZhNgTQhOgThBg9QhBg/gUhMQgcAegpANQgqANgogKQgqgKglgeQgngggKgmQhDAihNgaQhLgagnhCQhUCTiIB7Qh5BthIAAQgRAAgOgGg");
	this.shape_87.setTransform(281.4912,142.8644);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#7E322F").s().p("AgHA7QgSgLgggZIAagPQATgLAUgcIAigyQACAmgMAfQgIAUgNAQQBEA3gfADQgbgFgcgSg");
	this.shape_88.setTransform(266.8593,203.325);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#7E322F").s().p("AAAAvQgpgEgigbQgfgYgUgmQBPA3AwAFQA8AGBCg9QgNAogjAZQghAXgkAAIgKAAg");
	this.shape_89.setTransform(268.95,226.1262);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#282E46").s().p("AgWAeQgJgNAAgRQABgRAJgNQAKgMAMAAQANABAJAMQAJANAAARQgBASgJAMQgKAMgMAAQgNAAgJgNg");
	this.shape_90.setTransform(248.1751,196.999);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#282E46").s().p("AAAArQgNgBgJgMQgJgNAAgRQABgSAJgMQAKgMAMAAQANAAAJANQAJANAAARQgBARgJANQgJAMgNAAIAAAAg");
	this.shape_91.setTransform(293.9751,197.951);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#AB5B58").s().p("AhJA7QgigSgDgeQgDgdAegZQAfgZAugEQAtgFAjATQAiASADAeQADAdgeAZQgeAYgvAFIgQABQgjAAgdgPg");
	this.shape_92.setTransform(300.25,214.651);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#AB5B58").s().p("AgEBJQgugDgfgYQgfgYACgdQACgeAigTQAigUAtAEQAuAEAfAXQAgAYgDAdQgCAegiAUQgdAQglAAIgNgBg");
	this.shape_93.setTransform(242.4281,213.45);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#7E322F").s().p("AgHA6QgSgKgggaIAbgOQASgMAUgcIAjgwQABAlgMAfQgHATgMAPIAYAYQAiAhgXADQgbgFgcgTg");
	this.shape_94.setTransform(1724.302,211.8);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#7E322F").s().p("AAAAvQgogEgjgbQgfgYgVgmQBQA3AwAFQA9AGBCg9QgOAogjAZQghAXgkAAIgKAAg");
	this.shape_95.setTransform(1726.425,234.5762);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#282E46").s().p("AAAArQgNgBgJgMQgJgNAAgRQABgRAJgNQAKgMAMAAQANAAAJANQAJANAAARQgBARgJANQgJAMgNAAIAAAAg");
	this.shape_96.setTransform(1705.675,205.451);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#282E46").s().p("AAAArQgNAAgJgNQgJgNAAgRQABgRAJgNQAKgMAMAAQANAAAJANQAJANAAARQgBARgJANQgKAMgMAAIAAAAg");
	this.shape_97.setTransform(1751.475,206.425);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#AB5B58").s().p("AhIA7QgjgSgDgeQgDgdAfgZQAegYAtgFQAugEAiASQAjASADAeQADAdgfAZQgeAYguAFIgRABQgjAAgbgPg");
	this.shape_98.setTransform(1757.75,223.149);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#AB5B58").s().p("AgEBJQgugEgfgXQgfgYACgdQACgfAigTQAigTAtAEQAuADAfAYQAgAYgDAdQgCAegiATQgdARgkAAIgOgBg");
	this.shape_99.setTransform(1699.9281,221.9068);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#A5432D").s().p("AhrCfQgjg8AAhVQABhRBahOQBWhLA7ANQAsAKAEBAQAEA5gcBPQgbBOgoA6QgsA/gmAHIgKABQgkAAgegzg");
	this.shape_100.setTransform(334.8004,200.0775);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#A5432D").s().p("AAfDRQglgHgsg/Qgpg6gahOQgchPAEg5QAEhAAsgKQA7gNBWBLQBaBOAABRQAABVgjA8QgdAzgkAAIgLgBg");
	this.shape_101.setTransform(208.3552,200.0775);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#A5432D").s().p("ApjkPQAAlICRiKQCNiFFFAAQFGAACNCFQCRCKAAFIQAADvgJB4QgQDVgyCTQiEGHmVAfQgWABgWAAQo3AAAAx2g");
	this.shape_102.setTransform(271.575,192.4394);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#E3CDC8").s().p("EgPsApNQgLwkgWueQgl4kgzmSQgDAAAgiFQAsi6AciOQBloPgykpQCCgRAjgGQBdgQBEgZIAIgEQEPFOFIgCQFIgBEplSQBQAcA7AQQBLATBEAGQAtAEAnAHQg+BxBQHbQA8FjBhFbQguF/gqYyQggShgJMcQn0Avn0AAQn0AAn1gvg");
	this.shape_103.setTransform(274.6578,588.1375);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#6F2D1E").s().p("Ak2ECQBWiwADj7IAAgUIADgCQBqgzCSgPQBIgIC/gDIAAB/QABBmANBTQh6CLiWA0QhhAih0AAQhBAAhHgLg");
	this.shape_104.setTransform(268.15,269.3889);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#A5432D").s().p("AhXA1QiIy5i5oNIJCkJQB1KQBGT6QBBSQgRMHQguACiGAIQiGAIguACQgPtRh1wVg");
	this.shape_105.setTransform(417.0023,585.725);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#A5432D").s().p("AjmeRQiAABgugCQgRsIBByPQBGz6B1qQIJCEJQi6IQiNStQh7QcgPNBQgtgCiBABg");
	this.shape_106.setTransform(131.5977,584.825);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#A5432D").s().p("AvocyQgKuPg1ujQhGzIh1pOQTiiUTjCUQh1JOhGTIQg1OjgKOPQn0Avn1AAQnzAAn1gvg");
	this.shape_107.setTransform(274.3,557.1);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#A5432D").s().p("A6LQCQgFggAEgvQATjXARh6QAZi6AoiTQAehwAnhPQAxhiBGg/QB7huDrgkQBAgKCDgQQBxgSBOgdQEHhhBJlhQAXhuABh7IgDhkQCuACBXAAQBTABCxgDIABCaQAEB8AVBjQA+EoDRBPQBoAmBAATQBaAZBRAHQEEAXCzCUQCuCOBUD7QAnB2AXCeQALBJAVDQIALBSQAGAogBATQtHA0tIAAQtEAAtGg0g");
	this.shape_108.setTransform(274.3101,350.2938);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2E120C").s().p("AmTQEQhJgcgmhDQgphIAShZQhRAMhOggQhPgggxg/Qgwg9gEhzQgDhsAihNQhPgHhCg0QhCg0gWhLQgXhNAahdQAchhA+gtQhJgtgghWQgfhVAahRQAahSBTg8QBVg9BVAFQABhaA6hLQA6hLBXgZQBYgYB8AsQB+AsAyBKQAehoBjg/QBig/BuAQQBxAQBYBUQBcBZABBpQBrhBCGAPQCHAPBcBWQBaBVAUCcQAUCag9BtQBdA0AsBpQAtBngdBlQgfBrhKBFQhSBKhlgFQBDBEgIBpQgIBohNA5QhPA5hxgPQh0gPguhSQAQA8gdA7QgcA8g6AYQg5AYhAgUQhAgUgig0QADAigTAdQgSAdghAOQggAOgwgKQgwgJgYgaQg7BchVAeQgmAOglAAQgmAAgmgOg");
	this.shape_109.setTransform(276.1343,158.4033);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#C96562").s().p("AgHA6QgSgKgfgZIAagPQASgMAUgcIAjgwQABAkgMAhQgHASgNAPIAZAXQAiAjgXACQgbgFgcgTg");
	this.shape_110.setTransform(1130.277,218.65);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#C96562").s().p("AAAAvQgogEgjgbQgfgYgVgmQBQA3AwAFQA9AGBCg9QgOAogjAZQghAXgkAAIgKAAg");
	this.shape_111.setTransform(1132.375,241.4262);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#282E46").s().p("AAAArQgNgBgJgMQgJgNAAgRQABgRAJgNQAKgMAMAAQANAAAJANQAJANAAARQgBARgJANQgJAMgNAAIAAAAg");
	this.shape_112.setTransform(1111.625,212.301);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#282E46").s().p("AAAArQgNAAgJgNQgJgNAAgRQABgRAJgNQAKgMAMAAQANAAAJANQAJANAAARQgBARgJANQgJAMgNAAIAAAAg");
	this.shape_113.setTransform(1157.425,213.275);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#8A4E53").s().p("AsiIcQg3jtAijUQAijTB2iYQB6idDChDQDQhIELApQB2ATBoAtQBsAuBQBHQDOCzBHFFQAkCkgIB+QlnBMk+i1QkGiWiwkaQg9CvgWA4QgzCCg0BRQh5C+ivAAQgUAAgUgDg");
	this.shape_114.setTransform(1136.1623,150.3706);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#E58C73").s().p("AhrCfQgjg8AAhVQAAhRBbhOQBWhLA7ANQAsAKAEBAQAEA5gcBPQgaBOgpA6QgsA/glAHIgKABQgkAAgfgzg");
	this.shape_115.setTransform(1196.2198,200.0775);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#E58C73").s().p("AAfDRQglgHgsg/Qgpg6gahOQgchPAEg5QAEhAAsgKQA7gNBWBLQBbBOAABRQAABVgjA8QgfAzgkAAIgKgBg");
	this.shape_116.setTransform(1069.7802,200.0775);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#E58C73").s().p("AntHXQh2kvAAm2QAAlJCRiKQCNiFFFAAQFHAACLCFQCSCKAAFJQAAHAhtEcQiZGRleAHIgLABQlFAAidmQg");
	this.shape_117.setTransform(1133,192.3568);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#F6CF7F").s().p("EgPsAtnQgHu2gavVQgiz5g2p/QgDAAAfjRQAsknAbjdQBjs5gxnCQBRAACHgaQBtgWAMgGQAMGYCxEbQBUCGBrBKQBvBMB5AAQB5AABwhNQBrhLBViIQCxkeAJmcQBsAfCIAZICFAXQg/CuBMLkQA9JMBbHzQgxJsgoUFQgjRpgFMaQn1BHnzAAQn0AAn1hHg");
	this.shape_118.setTransform(1136.1075,618.7375);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#E4765C").s().p("Ak2ECQBWixADj6IAAgUIADgCQBpgzCSgPQBIgIC/gDIAAB/QACBmANBTQh6CLiWA0QhhAih0AAQhBAAhHgLg");
	this.shape_119.setTransform(1129.6,269.3889);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#E58C73").s().p("AhXA1QiIy5i4oNIJBkJQB1KPBGT7QBBSPgRMIQguACiGAIQiGAIguACQgPtSh1wUg");
	this.shape_120.setTransform(1278.4273,585.725);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#E58C73").s().p("AvocyQgKuPg1ujQhGzIh1pOQTiiUTjCUQh1JOhGTIQg1OjgKOPQn1Avn0AAQn0AAn0gvg");
	this.shape_121.setTransform(1135.725,557.0875);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#E58C73").s().p("A6LQCQgFghAEguQATjTARh+QAZi5AoiUQAehxAnhOQAxhjBHg+QB6huDrgkQBBgKCCgQQBxgSBOgdQEHhhBJlhQAXhuACh7IgEhkQCvACBWAAQBUABCwgDIABCaQAEB8AVBjQA+EoDRBPQBpAnA/ASQBaAZBRAHQEFAXCzCUQCtCPBUD6QAnB2AYCeQAKBGAVDTIALBSQAGAoAAATQtIA0tIAAQtEAAtGg0g");
	this.shape_122.setTransform(1135.7257,350.2938);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#8A4E53").s().p("AHDUgQiTgDjGg+QjfhNhwghQh+gljOgaQkWgkg7gKQiDgYhJgrQhvhBgNh4QgMhpBFiSQBYifAghIQBAiLAjhpQAuiHAPh7QAplGAgiFQA9kCB9iiQBThsBbg1QBZgzB0gJQESgWD+CHQD6CGCmD8QCIDQBoFKQAlB4BNCoICAEZQAtBqAHBdQALCEgwCJQgsCAhVBqQh3CVikBTQicBQigAAIgLAAg");
	this.shape_123.setTransform(1136.8145,212.4261);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#7E322F").s().p("AgIA7QgRgMgggYIAagPQATgLAUgcIAigyQACAmgMAgQgIATgNAQQBEA3gfACQgbgFgdgRg");
	this.shape_124.setTransform(554.3093,202.3);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#7E322F").s().p("AAAAvQgogFgjgbQgfgXgVgmQBQA3AwAFQA9AGBCg9QgOAogjAZQghAXglAAIgJAAg");
	this.shape_125.setTransform(556.375,225.1204);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#282E46").s().p("AAAArQgNAAgJgNQgJgNAAgRQABgRAJgNQAKgMAMAAQANAAAJANQAJANAAARQgBARgJANQgJAMgNAAIAAAAg");
	this.shape_126.setTransform(535.625,195.975);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#282E46").s().p("AgWAeQgJgNAAgRQABgRAJgNQAKgMAMAAQANABAJAMQAJANAAARQgBASgJAMQgKAMgMAAQgNAAgJgNg");
	this.shape_127.setTransform(581.425,196.949);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgmAmQgQgQAAgWQAAgWAQgPQAQgQAWAAQAXAAAQAQQAQAPAAAWQAAAWgQAQQgQARgXgBQgWABgQgRg");
	this.shape_128.setTransform(499.5,219.2);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AglAnQgQgRgBgWQABgWAQgQQAPgQAWAAQAXAAAPAQQAQAQAAAWQABAWgRARQgQAPgWAAQgWAAgPgPg");
	this.shape_129.setTransform(616.65,219.05);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#66281C").s().p("ApRIlQg3hlg0iVQhSjqAbh4QA1jyDLiLQC1h8EAgQQDxgODUBXQDdBaBaClQBoC+hIEpQgrCzhJCBQgSAigYgGQgXgFgEglIgnmWIi+ADQh2AChFAAQAqA8BTB6QjEgDi7hEQi7hDibh6QgFAFgVC0QgSCcgNCLQgDAogYAEIgFABQgVAAgQgeg");
	this.shape_130.setTransform(557.9476,136.3731);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#F0A69E").s().p("AhqCfQgjg8AAhVQgBhQBbhPQBWhMA7ANQAsAKAEBAQAEA5gbBQQgbBOgpA6QgrA/gmAHIgKABQgkAAgegzg");
	this.shape_131.setTransform(621.245,195.353);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#F0A69E").s().p("AAfDRQglgHgsg/Qgpg6gahNQgchQAEg5QAEhAAsgKQA7gNBVBLQBbBOAABRQABBVgjA8QgeAzgkAAIgLgBg");
	this.shape_132.setTransform(494.8056,195.5455);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#F0A69E").s().p("An3HTQhskbAAnFQgBlJCSiKQCMiFFGgBQFFAACNCFQCSCJAAFJQABHWhgELQiSGUlxABIgBAAQlfAAiZmUg");
	this.shape_133.setTransform(557.975,187.7249);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#C27C77").s().p("Ak2EDQBWixADj7IAAgUIACgCQBqgzCSgQQBJgIC+gCIAAB/QACBmANBTQh6CKiWA1QhhAih1AAQhBAAhGgKg");
	this.shape_134.setTransform(554.725,264.7743);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#5C5D7B").s().p("A6KKQQgFggADgvQATjVARh8QAZi5AniTQAehxAnhOQAxhkBGg/QB7htDrgkQBAgKCCgSQBxgRBOgdQAdgLAbgPQBfB2CNBDQCSBEClAAQCpAACVhJQCQhHBeh7IAQAHQBoAmBAASQBaAaBRAHQEFAWCzCUQCuCPBUD6QAnB2AYCdQAKBGAWDTIALBSQAGAogBATQtcA3taAAQsyAAswgyg");
	this.shape_135.setTransform(561.1351,382.8765);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#5C5D7B").s().p("AmRenQi7gegugBQgSsGBAyRQBFz7B0qQIQSgsQhlEiiHIFQiLIQh7JAQkrV0gLKiQgugCi6geg");
	this.shape_136.setTransform(427.4426,589.95);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#5C5D7B").s().p("EACBAmTQrVgRo6g0QgPyVgzzFQhM8Ch1o+QT7iVT3CSQg9EtAjK2QAaIHBZNsQAyHpBhOSQBHLVgCEjQlKAfnyAAQjaAAj7gGg");
	this.shape_137.setTransform(578.5292,609.1903);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#F0A69E").s().p("AlNKiQjGhDigiWQiciThXjDQBPgKAygKQBHgPA4gVQEHhgBJlhQAXhvABh6IgDhlIEEADQBcAACogDIABCaQAFB8AVBjQA/EoDRBNQBnAnBBASQBaAZBRAHQAyAEAwAKQgQAWg5BVQguBDgeAnQjBD0k8BeQiZAtiUAAQidAAiYgzg");
	this.shape_138.setTransform(564.375,310.3398);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FF9A43").s().p("AtXIGQgrg1gIhpQgfmVDWkAQDbkEGIAAQFWAAFKDOQCLBWBbBjQBaBiAPBOQAKA0AEA5QAJBvggBRQgmBghZAtQg+AghKgCQhLgCg6gkQgzghgohFQgQgcgrhiQgRglgUgPQgngcguAbIhIA5QhDA2hMgGQhCgFgugtQglglgdhGQgchCgXgbQglgrg3AEQghADgeAWQgbAVgUAhQgoBDgkCDQgjB8gdA2QgzBchXAeQggAKgcAAQg2AAgjgsg");
	this.shape_139.setTransform(2013.7875,143.3472);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#DC827C").s().p("AgHA6QgSgLgfgZIAagOQASgLAUgcIAigwQACAkgMAgQgIASgMAPIAYAWQAiAigXACQgagFgcgRg");
	this.shape_140.setTransform(2004.752,215.425);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#DC827C").s().p("AAAAuQgogEghgbQgggXgTgmQAuAgARAIQAyAcAwgLQArgKAugpQgOAngjAYQggAYgjAAIgKgBg");
	this.shape_141.setTransform(2006.85,237.8012);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#282E46").s().p("AAAAqQgNAAgJgNQgJgMABgRQAAgRAKgMQAJgMAMAAQANAAAJANQAJAMgBARQAAARgKANQgIALgNAAIAAAAg");
	this.shape_142.setTransform(1986.425,209.176);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#282E46").s().p("AAAAqQgNAAgJgNQgJgMABgRQAAgRAKgMQAJgMAMAAQANAAAJANQAJAMgBARQAAARgJANQgJALgNAAIAAAAg");
	this.shape_143.setTransform(2031.425,210.126);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("#282E46").ss(2).p("AA5AHQgLgHgUgCQgpgHgwAN");
	this.shape_144.setTransform(2009.3818,196.9165);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f().s("#282E46").ss(2).p("Ai4gDQgCBMA1A3QA1A4BNABQBMACA4g1QA3g1AChNQABhMg1g3Qg1g4hNgCQhMgBg3A1Qg4A1gBBNg");
	this.shape_145.setTransform(1986.4984,206.9016);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().s("#282E46").ss(2).p("Ai4gDQgCBMA1A3QA2A4BMABQBMACA3g1QA3g1ADhNQABhMg1g3Qg2g4hMgCQhMgBg3A1Qg4A1gBBNg");
	this.shape_146.setTransform(2031.5,207.8516);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#EF9792").s().p("AhHA6QgigSgDgdQgDgdAegYQAegZAtgEQAsgEAiASQAiARADAeQADAdgeAYQgeAYgtAEIgRABQgiAAgbgOg");
	this.shape_147.setTransform(2037.6211,226.551);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#EF9792").s().p("AgEBIQgugDgegYQgegYACgcQACgdAhgUQAigSAsADQAuADAeAYQAfAYgDAcQgCAeghATQgdAQgkAAIgNgBg");
	this.shape_148.setTransform(1980.7782,225.35);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#F0A69E").s().p("AhrCfQgjg8AAhVQAAhRBbhOQBWhLA7ANQAsAKAEBAQAEA5gcBPQgbBOgoA6QgsA/gmAHIgKABQgkAAgegzg");
	this.shape_149.setTransform(2069.8004,198.2275);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#F0A69E").s().p("AAfDRQglgHgsg/Qgpg6gahOQgchPAEg5QAEhAAsgKQA7gNBVBLQBbBOAABRQAABVgjA8QgdAzgkAAIgLgBg");
	this.shape_150.setTransform(1943.3552,198.2275);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#F0A69E").s().p("An4HTQhrkcAAnFQAAlJCRiKQCNiFFFAAQFGAACNCFQCRCKAAFJQAAHWhgELQiTGUlxAAQlgAAiYmUg");
	this.shape_151.setTransform(2005.475,190.525);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#E3CDC8").s().p("A6LJlQgFghAEguQATjTARh+QAZi5AoiTQAehxAnhPQAxhjBHg/QBohdCngkQBigWDKgYQCaCdDKBXQDRBZDlAAQDkAADRhZQDJhXCbidQA3ALAsAEQEFAWCzCUQCtCQBUD6QAnB2AYCdQAKBHAVDTQADAYAIA5QAGAoAAATQtIA1tIAAQtEAAtGg0g");
	this.shape_152.setTransform(2010.4757,389.7688);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#E3CDC8").s().p("AiLA1Qhczniwn1IJBkJQB1KPBGT7QBBSOgRMJQguABi6AfQi6AfguABQgTw7g9tBg");
	this.shape_153.setTransform(2153.1773,586.1);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#E3CDC8").s().p("AACeRQpVhFgugBQgRsIBByPQBGz7B1qQIJBEKQhbECA3IAQAoFyCMKNIB1IdQBGE+AnDPQBuI/gGE7QgtgCpWhFg");
	this.shape_154.setTransform(1891.4858,589.95);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#E3CDC8").s().p("EgRKAm9QgNzEgowLQg/53hxo9QEJgfGAhsQDgg/HGiNQGWh4ERguQFsg+EeAhQhrIYAseqQAHE/AiSDQAXMQgCEJQn1AvrJAAQrIAAn0gvg");
	this.shape_155.setTransform(2002.75,626.5624);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#E3CDC8").s().p("Ak7ECQA0hqAWiLQAPhhAAhpIADgCQBogzCagYQBDABC9gDQABA7AFBQQAHBvAMBUQiEB5iRAwQhnAih1AAQhBAAhFgLg");
	this.shape_156.setTransform(2004.875,267.5274);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#E3CDC8").s().p("A6LQCQgFghAEguQATjTARh+QAZi5AoiUQAehxAnhOQAxhjBHg+QB7huDrgkQBAgKCCgQQBxgSBOgdQEHhhBJlhQAXhuACh7IgEhkQCvACBWAAQBUABCwgDIABCaQAEB9AVBiQA/EoDRBPQBnAmBBATQBZAZBRAHQEFAXCzCUQCtCPBUD6QAnB2AYCeQAKBHAVDSQADAZAIA5QAGAoAAATQtIA0tIAAQtEAAtGg0g");
	this.shape_157.setTransform(2010.4757,348.4438);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FF9A43").s().p("AOaRxImmgGQhvgBg5gGQhcgJhGgaQg7gVhQgxQhXg5gugaQh2hEiHglQiFgkiKgBQgjAAhmAEQhWAEg0gDQijgLhahSQhBg8gEhNQgDg2AhhYQAuh+AFgUQAWhUgYhAQgLgfgcgmIgwhAQg5hNALg7QAMg6BOgwQAWgNAugaQApgXAXgUQA3gwAdhdQAJgcAdiNQAUhhAphBQAzhRBMgQQAqgJA2ALQAbAGBGAXQB8AqA/gaQArgSAlgxQASgWArhIQAlg8AagaQAngnAvgEQAtgDAsAdQAmAZAfArIA1BSQAfAxAbAbQBoBjDggNICvgNQBlgDBHAUQBZAaA5BHQA9BLgRBSQgKAsg1BMQg2BLgJAtQgQBLA1BSQAnA9BRBDQBaBJAmAvQA9BMAABMQAABJhJBrQgxBHgIAOQgeAxgLApQgEARgBAPQgFAvASA/QAKAlAZBIQATA+gBAzQgDA/giAnQghAmg+ANQgmAIg/AAIgOAAg");
	this.shape_158.setTransform(2008.8535,152.1862);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#E9736D").s().p("AGSAnQiRhJkBAAQkAAAiQBJQiXBMg8CsQAFk5CSiEQCNiAE/AAQFAAACNCAQCSCEAFE5Qg7isiXhMg");
	this.shape_159.setTransform(2292.45,146.075);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#561913").s().p("ArMGRQhAgegrg9Qgqg8gGhGQgHhNAghWQAdhOA2hBQBfhzCdhMQC4hbDSgOQDRgNDCBCQC5A/ChCiQCSCSBfDEQgbBJg+A1Qg/A0hNANQhNAOhMgcQhNgbgzg8Qg/hJAdg7Qg7BNhbAqQhcArhggEQhigEhWgwQhYgxg1hRQAHBHgfBDQgfBDg6AoQg6AphKAGIgaABQg7AAg0gYg");
	this.shape_160.setTransform(2288.9694,160.394);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#7E322F").s().p("AgHA7QgRgLghgZIAagPQATgLAUgcIAjgyQABAmgMAfQgIAUgNAQQBEA3gfADQgbgFgcgSg");
	this.shape_161.setTransform(2287.6091,224.475);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#7E322F").s().p("AAAAvQgogEgjgbQgggYgUgmQBQA3AwAFQA8AGBDg9QgNAoglAZQggAXgkAAIgKAAg");
	this.shape_162.setTransform(2289.7,247.2762);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#282E46").s().p("AAABDQgNAAgIgUQgJgUABgbQABgbAJgTQAJgUAMAAQAMABAJATQAIAUgBAbQAAAbgJAUQgKATgLAAIAAAAg");
	this.shape_163.setTransform(2270.5289,206.7756);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#282E46").s().p("AgVAvQgJgUABgbQABgcAJgTQAJgTAMAAQAMAAAJAUQAIAUgBAaQAAAcgJATQgKAUgLAAQgNgBgIgTg");
	this.shape_164.setTransform(2314.0789,207.7244);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#A5432D").s().p("AhrCfQgjg7AAhVQAAhRBbhPQBWhLA7ANQAsAKAEBAQAEA5gcBPQgaBOgpA6QgsA/glAHIgKABQgkAAgfgzg");
	this.shape_165.setTransform(2355.6698,212.1275);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#A5432D").s().p("AAfDRQglgHgsg/Qgpg6gahOQgchPAEg5QAEhAAsgKQA7gNBVBLQBcBPAABRQAABVgjA7QgeAzglAAIgKgBg");
	this.shape_166.setTransform(2229.2496,212.1275);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#A5432D").s().p("ApjkPQAAlJCRiKQCMiFFGAAQFGAACNCFQCRCKAAFJQAADvgJB3QgQDVgyCUQiEGHmVAfQgXACgWAAQo2AAAAx3g");
	this.shape_167.setTransform(2292.475,204.5144);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#567A71").s().p("A6LLvQgFghAEguQATjTARh+QAZi5AoiUQAehwAnhOQAxhjBHg/QB7htDrgkQBAgKCCgRQBxgSBOgdQCog+BcisQCiA+C9AAQC9AACig+QBKCWCMA1QBlAmBDATQBZAZBRAHQEFAXCzCUQCtCQBUD5QAoB3AXCdQALBOAUDLQADAZAIA5QAGAoAAATQtIA1tIAAQtEAAtGg1g");
	this.shape_168.setTransform(2295.1757,389.8188);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#6F2D1E").s().p("Ak2ECQBXixACj6IAAgVIADgBQBpgzCSgQQBIgHC/gDIAAB/QACBmANBTQh6CKiXA1QhgAih1AAQhAAAhHgLg");
	this.shape_169.setTransform(2289.05,281.4524);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#567A71").s().p("ADCdQQimhsiojyQlEnPjgrlQjfrlANo0QAHknBPi2QBVjFCigxITKjzQB1KPBGT7QBBSOgRMJIi0AKQiGAIguACQgwAOgxAAQh2AAh/hSg");
	this.shape_170.setTransform(2388.7639,598.5232);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#567A71").s().p("AjmeRQiAABgugCQgRsHBByQQBGz7B1qPIJCEKQi6IPiNStQh7QcgPNBQgtgCiBABg");
	this.shape_171.setTransform(2152.4977,596.9);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#567A71").s().p("EgPoAnRQgJz0g2zdQhE4sh3t9QTijcTjDcQh2N+hFYrQg2ThgJTwQn1BHn0AAQn0AAn0hHg");
	this.shape_172.setTransform(2295.175,638.6);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#A5432D").s().p("A6LQCQgFghAEguQATjTARh+QAZi5AoiUQAehxAnhOQAxhiBHg/QB7htDrgkQBAgKCCgRQBxgSBOgdQEHhhBJlhQAXhuACh7IgEhkQC3ADBOAAQBbAACpgDIABCaQAEB9AVBjQA/EnDRBPQBlAmBDATQBZAZBRAHQEFAXCzCUQCtCPBUD6QAoB3AXCdQALBOAUDLQADAZAIA5QAGAoAAATQtIA0tIAAQtEAAtGg0g");
	this.shape_173.setTransform(2295.1757,362.3438);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#561913").s().p("AgnTQQmRgmj8hfQmbibhik3QgZhPAkhPQAmhSBNgLQhJgIg6gzQg6gygShHQgThGAahIQAZhIA7grQg4glgFhOQgFhLArg7QAlgzBDgnQAxgbBRgdQgmhDgFheQgGhtAyg+QBQhlCbgRQBNgJA9ALQAFgRANgcQAag2ApgwQCDibDngiQBygRB0AxQBwAvBPBdQGXiBCXDvQAwBLAQBmQAIAzgBAlIBbAKQBrATBJArQDpCIi7FFIAEADQAoAiAOA2QANAygMA2QgNA2giAoQgkArgyAMQBYAOAkBiQAkBfgpBWQgjBLhSA8Qg+AthlAqQAvgBAcAwQAcAugNAwQgLArgkAoQgbAegwAhQjPCQkFA+QiwAqi2AAQhNAAhNgIg");
	this.shape_174.setTransform(2289.8941,172.2781);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#7E322F").s().p("AgHA6QgSgKgggaIAbgOQASgMAUgcIAjgwQABAlgMAfQgHATgMAPIAYAYQAiAhgXADQgbgFgcgTg");
	this.shape_175.setTransform(1724.302,211.8);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#7E322F").s().p("AAAAvQgogEgjgbQgfgYgVgmQBQA3AwAFQA9AGBCg9QgOAogjAZQghAXgkAAIgKAAg");
	this.shape_176.setTransform(1726.425,234.5762);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#282E46").s().p("AAAArQgNgBgJgMQgJgNAAgRQABgRAJgNQAKgMAMAAQANAAAJANQAJANAAARQgBARgJANQgJAMgNAAIAAAAg");
	this.shape_177.setTransform(1705.675,205.451);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#282E46").s().p("AAAArQgNAAgJgNQgJgNAAgRQABgRAJgNQAKgMAMAAQANAAAJANQAJANAAARQgBARgJANQgKAMgMAAIAAAAg");
	this.shape_178.setTransform(1751.475,206.425);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#AB5B58").s().p("AhIA7QgjgSgDgeQgDgdAfgZQAegYAtgFQAugEAiASQAjASADAeQADAdgfAZQgeAYguAFIgRABQgjAAgbgPg");
	this.shape_179.setTransform(1757.75,223.149);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#AB5B58").s().p("AgEBJQgugEgfgXQgfgYACgdQACgfAigTQAigTAtAEQAuADAfAYQAgAYgDAdQgCAegiATQgdARgkAAIgOgBg");
	this.shape_180.setTransform(1699.9281,221.9068);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#2E120C").s().p("AIlJzQAgjZiMjOQiGjHjNhAQjehFiyCMQjOCkhSGfQgGAhghjSQgfjMgCgzQgLmqDAjMQDIjVFBAjQB5ANB2AuQBjAmA7AtQBpBQAwBfQArBXAUCYQAMBdhEGAQgYCEgTBZQgLAygBAAQgBAAAEgcg");
	this.shape_181.setTransform(1729.2096,158.6076);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#E58C73").s().p("AnrHXQh4ksAAm0QAAlICRiKQCNiFFFAAQFHAACMCFQCRCKAAFIQAAHAhrEYQiXGLleAHIgLAAQlHAAidmKg");
	this.shape_182.setTransform(1729.525,185.331);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#5C5D7B").s().p("EgaLA9DUgACgAQgABgh+UAAAgh8AACgAYQANilAIhZQAOidAUhvQA6k3CRihQBvh7C5goQA7gNBsgMQB7gOAzgJQAjgGAggJQCYgtAwh9QArhxgvidIhgk3Qg6jBgeiNQhUmKBOkKQBGjuDIiNQDJiPEDAIQCiAECEBFQCKBIBUCEQC3EegsH+QgKBzgqCXQgoCMgyB1QhOCygLAtQgdB2AsB2QA/CoDfA0QAtAKCUAWQB4ASA/AWQEyBrCFGeQAmB5AaCYQAUByAQCiUAAFAAqAAGAiRUAAHAh/gACAAmQtGA0tHAAQtFAAtHg0g");
	this.shape_183.setTransform(1732.2599,486.5063);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#7E322F").s().p("AgHA6QgSgLgggZIAagOQATgLAUgdIAigwQACAkgMAgQgIAUgNAPQBEA4gfADQgbgFgcgTg");
	this.shape_184.setTransform(1414.2088,220.7);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#7E322F").s().p("AAAAvQgogEgjgbQgggYgUgmQBQA3AvAFQA9AGBCg9QgNApgjAYQghAXgkAAIgKAAg");
	this.shape_185.setTransform(1416.3,243.4762);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#AB5B58").s().p("AhIA7QgjgSgDgeQgDgdAfgZQAegYAugFQAtgFAiATQAjASADAeQADAdgfAZQgeAYgtAFIgRABQgjAAgcgPg");
	this.shape_186.setTransform(1447.6,232.0168);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#AB5B58").s().p("AgEBJQgugEgfgXQgfgXACgeQACgfAigSQAigUAtAEQAuAEAfAYQAgAXgDAeQgCAegiASQgdARglAAIgNgBg");
	this.shape_187.setTransform(1389.7781,230.8);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AgBASQgggDgeALIgRgvQAngPAqADQArADAlAUIgYAtQgbgPgfgCg");
	this.shape_188.setTransform(1418.475,204.7993);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AjFCfQhdgbgEhIQgDguA6gzQA4gyBaglQBegmBigHQBtgIBXAjQhpEBipAoQhDARg5AAQgzAAgrgNgAgIhdQjKAfgTB3QgIAyBWASQBRARBGgXQBjgjA3hfQAcgwAHgqQghgCghAAQhBAAhCAKg");
	this.shape_189.setTransform(1451.8198,204.8095);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("AgTCbQhsgahhiHQghgvgWguQgUgpAGgCQBXgjBtAIQBhAHBfAmQBaAlA4AyQA5AzgCAuQgEBIhdAbQgrANgzAAQg6AAhCgRgAh9hnIg/ACIAKAaQAOAgATAdQA8BeBXAnQAvAUBfgQQBngSgHgwQgTh3jPgfQg8gKhIAAIgHAAg");
	this.shape_190.setTransform(1385.0447,204.8095);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#2E120C").s().p("AizCSQhVgZgEhBQgCgqA0guQAzguBSghQDEhQCeA/QhgDqiaAlQg9AOg1AAQguAAgmgLg");
	this.shape_191.setTransform(1451.7193,204.4465);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#2E120C").s().p("AgRCPQhjgYhYh7QgegrgUgqQgSglAFgCQCdg/DFBQQBSAhAzAuQA0AugCAqQgEBBhVAZQgnALguAAQg1AAg8gOg");
	this.shape_192.setTransform(1385.0494,204.4465);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#2E120C").s().p("AjRHCIgFkSQgaB/gfCRQkDgKkIgdQCKm1BvmoQD8AtFaACQDLACGXgKQARBmAwE2QAoENAbCNQiVAQh1AJQgeiEggiWIABEeQieAKirAEQgli9gdilIglFjIgwAAQhjAAhigDg");
	this.shape_193.setTransform(1416.65,147.46);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFAD98").s().p("AhrCfQgjg8AAhVQAAhRBbhOQBWhLA7ANQAsAKAEBAQAEA5gcBPQgbBOgoA6QgsA/gmAHIgKABQgkAAgegzg");
	this.shape_194.setTransform(1482.3504,204.5275);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFAD98").s().p("AAfDRQglgHgsg/Qgpg6gahOQgchPAEg5QAEhAAsgKQA7gNBWBLQBaBOAABRQAABVgjA8QgdAzgkAAIgLgBg");
	this.shape_195.setTransform(1355.9052,204.5275);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFAD98").s().p("An4HSQhrkbAAnFQAAlJCRiKQCNiFFFAAQFHAACMCFQCRCKAAFJQAAHWhgEKQiSGVlyAAQlgAAiYmVg");
	this.shape_196.setTransform(1418.025,196.8);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#99C4C4").s().p("A6LJlQgFggAEgvQATjYARh6QAZi5AoiSQAehxAnhPQAxhjBGg/QBohcCoglQBhgWDKgYQDKDNJQJKIFBk+QFblZB+iAQA2ALAtAEQEEAWCzCUQCuCQBUD6QAnB2AXCdQALBKAVDPIALBSQAGAogBATQtHA1tIAAQtEAAtGg0g");
	this.shape_197.setTransform(1423.0601,396.0813);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#99C4C4").s().p("AiLA1Qhdzniwn1IJCkJQB1KPBGT7QBBSPgRMIQguABi7AfQi5AfguABQgTw+g9s+g");
	this.shape_198.setTransform(1565.7523,592.4);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#99C4C4").s().p("AireRQi7gfgugBQgRsIBByPQBGz7B1qPIJCEJQiwH1hdTnQg9M+gTQ+QgugBi5gfg");
	this.shape_199.setTransform(1280.3477,592.4);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#E4765C").s().p("Ak7ECQAzhqAWiLQAQhjAAhnIADgCQBogzCagYQBnAACZgCQABA2AFBVQAIBuALBVQiEB5iRAwQhmAih2AAQhBAAhFgLg");
	this.shape_200.setTransform(1417.45,273.8274);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFAD98").s().p("A4zIAQAKgrALgoQAehxAnhPQAxhjBHg/QB7hsDrgkQBAgKCCgRQBygSBNgcQEHhhBJlhQAXhuACh7IgEhlQCvADBWAAQBUAACwgCIABCZQAEB9AVBjQA/EnDRBPQBnAnBBASQBZAaBRAHQEFAWCzCTQCtCQBUD6IALAhI44Gfg");
	this.shape_201.setTransform(1422.125,339.575);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#99C4C4").s().p("EgRNAj0QgJyNg2yDQhF3Hh2smQIdhWMqBZQEmAgGRA/QDjAkGuBHUgG5Au/gALAVxQn0BAn0AAQn0AAn1hAg");
	this.shape_202.setTransform(1433.15,613.9683);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#2E120C").s().p("AgfRfQlOgFkKg1Qkbg4hmhaQgbgZgGjTQgChLACirQADkxA9kOQBFk0CGjaQFGoTJ5BfQAtAGAoALQB6AfBqBFQDLCECIEEQBzDaA3EaQA3EZgDFBQAACpgBAxQgHC7gZATQiDBikuAyQj3ApkpAAIhIgBg");
	this.shape_203.setTransform(1420.1983,188.6902);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.shape_12,this.shape_13,this.shape_14,this.shape_15,this.shape_16,this.shape_17,this.shape_18,this.shape_19,this.shape_20,this.shape_21,this.shape_22,this.shape_23,this.shape_24,this.shape_25,this.shape_26,this.shape_27,this.shape_28,this.shape_29,this.shape_30,this.shape_31,this.shape_32,this.shape_33,this.shape_34,this.shape_35,this.shape_36,this.shape_37,this.shape_38,this.shape_39,this.shape_40,this.shape_41,this.shape_42,this.shape_43,this.shape_44,this.shape_45,this.shape_46,this.shape_47,this.shape_48,this.shape_49,this.shape_50,this.shape_51,this.shape_52,this.shape_53,this.shape_54,this.shape_55,this.shape_56,this.shape_57,this.shape_58,this.shape_59,this.shape_60,this.shape_61,this.shape_62,this.shape_63,this.shape_64,this.shape_65,this.shape_66,this.shape_67,this.shape_68,this.shape_69,this.shape_70,this.shape_71,this.shape_72,this.shape_73,this.shape_74,this.shape_75,this.shape_76,this.shape_77,this.shape_78,this.shape_79,this.shape_80,this.shape_81,this.shape_82,this.shape_83,this.shape_84,this.shape_85,this.shape_86,this.shape_87,this.shape_88,this.shape_89,this.shape_90,this.shape_91,this.shape_92,this.shape_93,this.shape_94,this.shape_95,this.shape_96,this.shape_97,this.shape_98,this.shape_99,this.shape_100,this.shape_101,this.shape_102,this.shape_103,this.shape_104,this.shape_105,this.shape_106,this.shape_107,this.shape_108,this.shape_109,this.shape_110,this.shape_111,this.shape_112,this.shape_113,this.shape_114,this.shape_115,this.shape_116,this.shape_117,this.shape_118,this.shape_119,this.shape_120,this.shape_121,this.shape_122,this.shape_123,this.shape_124,this.shape_125,this.shape_126,this.shape_127,this.shape_128,this.shape_129,this.shape_130,this.shape_131,this.shape_132,this.shape_133,this.shape_134,this.shape_135,this.shape_136,this.shape_137,this.shape_138,this.shape_139,this.shape_140,this.shape_141,this.shape_142,this.shape_143,this.shape_144,this.shape_145,this.shape_146,this.shape_147,this.shape_148,this.shape_149,this.shape_150,this.shape_151,this.shape_152,this.shape_153,this.shape_154,this.shape_155,this.shape_156,this.shape_157,this.shape_158,this.shape_159,this.shape_160,this.shape_161,this.shape_162,this.shape_163,this.shape_164,this.shape_165,this.shape_166,this.shape_167,this.shape_168,this.shape_169,this.shape_170,this.shape_171,this.shape_172,this.shape_173,this.shape_174,this.shape_175,this.shape_176,this.shape_177,this.shape_178,this.shape_179,this.shape_180,this.shape_181,this.shape_182,this.shape_183,this.shape_184,this.shape_185,this.shape_186,this.shape_187,this.shape_188,this.shape_189,this.shape_190,this.shape_191,this.shape_192,this.shape_193,this.shape_194,this.shape_195,this.shape_196,this.shape_197,this.shape_198,this.shape_199,this.shape_200,this.shape_201,this.shape_202,this.shape_203];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(90.8,18.9,3528.1,747);


(lib.Symbol165 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E8F3FE").s().p("Ah7AfQgMAAgJgJQgJgJAAgNQAAgMAJgJQAIgJANAAID2AAQANAAAJAJQAJAJAAAMQAAANgJAJQgJAJgNAAg");
	this.shape.setTransform(866.225,377.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4CEC9").s().p("Ah1C0IgMlnIEDAAIgMFng");
	this.shape_1.setTransform(866.025,395.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2E303E").s().p("AjvBDQgVAAgMgSQgLgTAJgTIAdg4QAFgKAJgFQAJgGALAAIGmAAQALAAAKAGQAJAFAFAKIAcA4QAKATgLATQgMASgWAAg");
	this.shape_2.setTransform(773.9177,412.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2E303E").s().p("Ag3D9QAIhOgJhbQgUi1hZhCQgIgGgBgLQgDgVAhgTQA3gfBIgBQBagDAhA9QApBKASBvQATB6gPCMg");
	this.shape_3.setTransform(767.7309,380.6701);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#9F9EA3").s().p("ArcIBQgeAAgVgUQgVgVAAgdIAAt0QAAgeAVgUQAVgVAeAAIW6AAQAdAAAVAVQAVAUAAAeIAAN0QAAAdgVAVQgUAUgeAAg");
	this.shape_4.setTransform(761.85,329.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2E303E").s().p("Al3AwIAAhfILvAAIAABfg");
	this.shape_5.setTransform(612.475,413.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#B0B0B0").s().p("EgpAABQIAAifMBSBAAAIAACfg");
	this.shape_6.setTransform(693.725,430.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C5C0C2").s().p("EgpAAB7IAAj1MBSBAAAIAAD1g");
	this.shape_7.setTransform(693.725,426.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#70452E").s().p("AgoUDMgAhgoFICTAAMgAhAoFg");
	this.shape_8.setTransform(906.875,554.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#70452E").s().p("AgoUDMgAhgoFICTAAMgAhAoFg");
	this.shape_9.setTransform(480.575,554.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Symbol164 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E8F3FE").s().p("Ah7AfQgMAAgJgJQgJgJAAgNQAAgMAJgJQAIgJANAAID2AAQANAAAJAJQAJAJAAAMQAAANgJAJQgJAJgNAAg");
	this.shape.setTransform(-33.6511,372.0134);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4CEC9").s().p("Ah1C0IgMlnIEDAAIgMFng");
	this.shape_1.setTransform(-33.8511,389.9379);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2E303E").s().p("AjvBDQgVAAgMgSQgLgTAJgTIAdg4QAFgKAJgFQAJgGALAAIGmAAQALAAAKAGQAJAFAFAKIAcA4QAKATgLATQgMASgWAAg");
	this.shape_2.setTransform(-126.0551,406.7374);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2E303E").s().p("Ag3D9QAIhOgJhbQgUi1hZhCQgIgGgBgLQgDgVAhgTQA3gfBIgBQBagDAhA9QApBKASBvQATB6gPCMg");
	this.shape_3.setTransform(-132.2417,374.6085);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#9F9EA3").s().p("ArcIBQgeAAgVgUQgVgVAAgdIAAt0QAAgeAVgUQAVgVAeAAIW6AAQAdAAAVAVQAVAUAAAeIAAN0QAAAdgVAVQgUAUgeAAg");
	this.shape_4.setTransform(-138.1224,323.265);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2E303E").s().p("Al3AwIAAhfILvAAIAABfg");
	this.shape_5.setTransform(-287.3936,407.8124);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#B0B0B0").s().p("EgpAABQIAAifMBSBAAAIAACfg");
	this.shape_6.setTransform(-206.2461,424.3619);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C5C0C2").s().p("EgpAAB7IAAj1MBSBAAAIAAD1g");
	this.shape_7.setTransform(-206.2461,420.087);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#70452E").s().p("AgoUDMgAhgoFICTAAMgAhAoFg");
	this.shape_8.setTransform(6.8974,548.3831);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#70452E").s().p("AgoUDMgAhgoFICTAAMgAhAoFg");
	this.shape_9.setTransform(-419.3896,548.3831);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_woodStand = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// woodStand
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#C9997F").ss(12.2).p("AntnwIPbPh");
	this.shape.setTransform(1200.15,497.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#C9997F").ss(12.2).p("AIEoGIwHQN");
	this.shape_1.setTransform(1200.35,499.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C9997F").s().p("AhBX4MAAAgvvICDAAMAAAAvvg");
	this.shape_2.setTransform(1251.175,541.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C9997F").s().p("AhBX4MAAAgvvICDAAMAAAAvvg");
	this.shape_3.setTransform(1149.525,541.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#B67A5A").s().p("Ar+BrIAAjVIX9AAIAADVg");
	this.shape_4.setTransform(1200.325,377.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#561F1C").s().p("AgvWoMAAAgtPIBfAAMAAAAtPg");
	this.shape_5.setTransform(1237.725,532.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#561F1C").s().p("AgwWoMAAAgtPIBgAAMAAAAtPg");
	this.shape_6.setTransform(1162.95,532.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},85).wait(335));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_voiceWaves = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// voiceWaves
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7F8183").s().p("ArLC6QAQgpAkgbQAigbAvgFIATgDQEGgnEpgcQALAAALgIQAKgIACgMIALhNQAejDAXh4QAKgwAigiQAigkAvgLIAmgIQFyhRD/gfQjnBnlqB6IgmAMQgMAFgHAKQgIALgBAMQgWDRgYCzQgHAxghApQgjAogvAPQgUAHgjADQknAZkBAKIgZABQgOAAgNAIQgNAHgHANQiSEEhvClQA3i4Bvkcg");
	this.shape.setTransform(571.5126,376.7104,0.4576,0.4576,59.9985);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7F8183").s().p("ArLC6QAQgpAkgbQAigbAvgFIATgDQEGgnEpgcQALAAALgIQAKgIACgMIALhNQAejDAXh4QAKgwAigiQAigkAvgLIAmgIQFyhRD/gfQjnBnlqB6IgmAMQgMAFgHAKQgIALgBAMQgWDRgYCzQgHAxghApQgjAogvAPQgUAHgjADQknAZkBAKIgZABQgOAAgNAIQgNAHgHANQiSEEhvClQA3i4Bvkcg");
	this.shape_1.setTransform(576.4754,304.9198,0.4576,0.4576,-150.0075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#7F8183").s().p("ArLC6QAQgpAkgbQAigbAvgFIATgDQEGgnEpgcQALAAALgIQAKgIACgMIALhNQAejDAXh4QAKgwAigiQAigkAvgLIAmgIQFyhRD/gfQjnBnlqB6IgmAMQgMAFgHAKQgIALgBAMQgWDRgYCzQgHAxghApQgjAogvAPQgUAHgjADQknAZkBAKIgZABQgOAAgNAIQgNAHgHANQiSEEhvClQA3i4Bvkcg");
	this.shape_2.setTransform(563.5335,246.6797,0.4577,0.4577);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1625).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},4).to({state:[]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},6).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},7).to({state:[]},1).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},7).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},9).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_square4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// square4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#999999").s().p("A+JRCMAAAgiDMA8TAAAMAAAAiDg");
	this.shape.setTransform(490,137);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(16).to({_off:false},0).to({_off:true},6).wait(16).to({_off:false},0).to({_off:true},6).wait(16).to({_off:false},0).to({_off:true},6).wait(15));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_square3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// square3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#999999").s().p("A+JRCMAAAgiDMA8TAAAMAAAAiDg");
	this.shape.setTransform(490,355);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("A+ORHMAAAgiNMA8dAAAMAAAAiNg");
	this.shape_1.setTransform(489.5,355.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("A+ORCMAAAgiDMA8dAAAMAAAAiDg");
	this.shape_2.setTransform(490.5,355);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},11).to({state:[]},11).to({state:[{t:this.shape_1}]},11).to({state:[]},11).to({state:[{t:this.shape_2}]},11).to({state:[]},11).wait(15));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_seconds = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// seconds
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjgMuQhogdhUg5QhVg5g0hbQgzhcAAiAIGWAAQAAApAbAlQAaAiArAVQAqAWAzAAQBfAAA2g0QA1g0AAhAQAAhNgZgtQgagugvgTQgwgUhCAAIi9AAIAAk4IC9AAQA/AAApgWQAqgXAUgpQAUgqAAg8QAAgmgSgjQgTgkgngXQgngWg8AAQgnAAgnAPQgnANgZAbQgZAaAAAlImVAAQAAiNBPhkQBNhiCAg0QB/g1CTABQCwgBCGA2QCGA1BLBoQBMBpAACaQAABXgoBLQgoBKhHA5QgpAggyAYQA/AWAzAkQBJA2AoBPQAnBPAABsQAACZhSBtQhSBsiMA5QiMA4iwABQhmAAhngbg");
	this.shape.setTransform(681.075,235.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AovM9IAAkSIIMoeQBBhIAqg7QAog7AUgvQARgxAAglQAAhigpgwQgqgvhNAAQg2AAgnAgQgoAfgVA1QgWA1gBBCImVAAQAAiaBMh/QBJiACHhLQCEhMCwAAQEUAACNB+QCMB+AADlQABB2gwBoQgvBmhZBpQhZBqh9CAIi7C8IJtAAIAAFFg");
	this.shape_1.setTransform(681.65,234.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgTMxIAAyFIltBiIAAk+ILckAIAlAAIAAZhg");
	this.shape_2.setTransform(673.15,236.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},2).to({state:[{t:this.shape_1}]},19).to({state:[{t:this.shape_2}]},22).to({state:[]},23).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_seats = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// seats
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#8B312C").ss(5.7).p("AqyGFIAAozQAAhZA/g+QA/g/BZAAIO3AAQBZAAA/A/QA/A+AABZIAAIzg");
	this.shape.setTransform(751.25,728.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BC433E").s().p("AqyGFIAAoyQAAhaA/g+QA/g/BYAAIO4AAQBaAAA+A/QA/A+AABaIAAIyg");
	this.shape_1.setTransform(751.25,728.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#8B312C").ss(5.7).p("ApVFPIAAnnQAAhLA1g1QA1g1BMAAIM/AAQBLAAA2A1QA1A1AABLIAAHng");
	this.shape_2.setTransform(741.675,671.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#BC433E").s().p("ApVFOIAAnmQAAhLA1g1QA1g2BMABIM/AAQBLgBA2A2QA1A1AABLIAAHmg");
	this.shape_3.setTransform(741.675,671.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#8B312C").ss(5.7).p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_4.setTransform(731.875,622.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BC433E").s().p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_5.setTransform(731.875,622.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#8B312C").ss(5.7).p("AqyGFIAAozQAAhZA/g+QA/g/BYAAIO5AAQBYAAA/A/QA/A+AABZIAAIzg");
	this.shape_6.setTransform(448.6,728.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#BC433E").s().p("AqyGFIAAoyQAAhaA/g+QA/g/BZAAIO4AAQBZAAA+A/QA/A+AABaIAAIyg");
	this.shape_7.setTransform(448.6,728.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#8B312C").ss(5.7).p("AqyGFIAAozQAAhZA/g+QA/g/BYAAIO5AAQBYAAA/A/QA/A+AABZIAAIzg");
	this.shape_8.setTransform(902.575,728.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#BC433E").s().p("AqyGFIAAoyQAAhaA/g+QA/g/BYAAIO5AAQBYAAA/A/QA/A+AABaIAAIyg");
	this.shape_9.setTransform(902.575,728.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AoAE6QgBgJABgPQALiFAUhIQAThKAmgiQAmghBIgLQBigPAUgIQBQgdAXhsQAHgiAAgmIgBgeQBQABBPgBQABBSAHAhQATBbBAAYQA/AYApADQBPAHA3AuQA1AqAaBNQAMAlAHAwQAEAaAGA8IADAZQACAMAAAGQkBAQkAAAQkAAAkBgQg");
	this.shape_10.setTransform(902.585,682.1625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AkFGhQgNikACiyQAElkBPhKQBCg9COAAQCRAAArBDQA6BZAHFbQAECugICcg");
	this.shape_11.setTransform(901.5288,644.375);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#8B312C").ss(5.7).p("ApVFPIAAnnQAAhLA1g1QA1g1BMAAIM/AAQBLAAA2A1QA1A1AABLIAAHng");
	this.shape_12.setTransform(873.775,671.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#BC433E").s().p("ApVFOIAAnmQAAhLA1g1QA1g2BMABIM/AAQBLgBA2A2QA1A1AABLIAAHmg");
	this.shape_13.setTransform(873.775,671.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#8B312C").ss(5.7).p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_14.setTransform(844.425,622.275);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#BC433E").s().p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_15.setTransform(844.425,622.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AjgCXQAGhiAghYQBAiyCDArQAMAEAKgIQA/gyAxAoQBSBEAAE+g");
	this.shape_16.setTransform(729.8752,549.6111);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("ABVBBQgNgVgVg8QggAzgvAcQg6AhhCgOQgCgXAHgeQANg7AlghQAfgaAtgHQBggPAwA+QAtA5gVBbIgIAAQggAAgWgig");
	this.shape_17.setTransform(730.02,544.2515);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AAGAmQgOgDgMgiQgMgjAQgDQALgDAPAOQARAPAAAOQAAAPgHALQgGAKgGAAIgCgBg");
	this.shape_18.setTransform(718.9474,553.3654);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgTAdQgGgLAAgPQAAgOAQgPQAPgOALADQAQADgMAjQgLAigPADIgCABQgHAAgFgKg");
	this.shape_19.setTransform(742.1776,553.3654);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AAACfQg/gBgchJQgUg1AAhRQAAg8AagZQAagZA7AAQA8AAAZAZQAbAZAAA8QAABQgVA3QgdBKg8AAIgCgBg");
	this.shape_20.setTransform(730.575,551.9515);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("Ag4AIQADgQAAgoQAiAAAOACQAaADATAJIAAAAIAAAEQABAuAQAfQgNACgLAAQg1AAgkgpg");
	this.shape_21.setTransform(731.2,566.0742);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AkzC8IADgaQAHhHALgfQAPguAggZQAhgcAvgDQAZgCAlgPQAngOALg2QAFgWAAgvIBeAAIAEA9QAOBAAwASQALAEA7AJQAsAHAWAUQAWASANAtQAMAvAGBMQABAKgBAFQiaAKiZAAQiZAAiagKg");
	this.shape_22.setTransform(730.07,580.9);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AiMDWQgegPgWgaQgQgTgIgWQgJgZACgWQABgSAIgRQAgg/ALgjQASg3AZgmQAegsAtgWQAugXAyAEQApADAcAkQAXAdAMAtQAHAYAHA4QAGAlAZAyQAGAMAQAcQANAagCASQgCAVgUALQgOAHgYAEIg9AIQgmAEgXAGIg8ASQgkALgbAAQgeAAgegOg");
	this.shape_23.setTransform(729.6964,556.8954);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AiSBjQgVhbAtg5QAwg+BgAPQAuAHAdAaQAmAhANA7QAHAegCAXQhCAOg6ghQgvgcgggzQgWA9gMAUQgWAiggAAIgIAAg");
	this.shape_24.setTransform(836.33,544.2515);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgTAdQgGgLAAgPQAAgOAQgPQAPgOALADQAQADgLAjQgMAigPADIgCABQgGAAgGgKg");
	this.shape_25.setTransform(847.3905,553.3654);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AAGAmQgPgDgLgiQgMgjAQgDQALgDAPAOQAQAPAAAOQAAAPgGALQgFAKgHAAIgCgBg");
	this.shape_26.setTransform(824.1679,553.3654);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhZBWQgWg3AAhQQAAg8AbgZQAZgZA7AAQA8AAAaAZQAaAZAAA8QAABRgUA1QgcBJhAABIgBABQg8AAgchKg");
	this.shape_27.setTransform(835.775,551.9515);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("Ag4AvQAPgfABguIAAgEIABAAQATgJAagDQANgCAkAAQAAAoACAQQgkApg1AAQgLAAgNgCg");
	this.shape_28.setTransform(835.15,566.0742);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AkyC8QgBgFABgKQAGhPAMgsQANgtAWgSQAWgUArgHQA8gJALgEQAwgSAOhAIADg9IBfAAQAAAvAFAWQALA2AnAOQAlAPAZACQAvADAhAcQAgAZAPAuQAIAWAEAcQACAPAEAlIADAaQiaAKiaAAQiYAAiagKg");
	this.shape_29.setTransform(836.28,580.9);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("ABTDwQgbAAgkgLQgogPgVgGQgXgGgmgFIg+gJQg4gKgEgkQgCgTANgbIAWgqQAYg0AFgnQAHg7AGgZQAMgwAWgdQAcglAqgEQAxgEAvAZQAuAYAeAvQAZAmATA8QAHAXAOAdIAXA0QAIASACASQAEAxgjArQgVAcgeAPQgdAOgcAAIgDAAg");
	this.shape_30.setTransform(836.4868,555.625);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#8B312C").ss(5.7).p("AqyGFIAAozQAAhZA/g+QA+g/BZAAIO4AAQBZAAA/A/QA/A+AABZIAAIzg");
	this.shape_31.setTransform(1053.9,728.9);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#BC433E").s().p("AqyGFIAAoyQAAhaA/g+QA+g/BZAAIO4AAQBaAAA+A/QA/A+AABaIAAIyg");
	this.shape_32.setTransform(1053.9,728.9);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#8B312C").ss(5.7).p("ApVFPIAAnnQAAhLA1g1QA1g1BMAAIM/AAQBMAAA1A1QA1A1AABLIAAHng");
	this.shape_33.setTransform(1005.875,671.2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#BC433E").s().p("ApVFOIAAnmQAAhLA1g1QA1g2BMABIM/AAQBMgBA1A2QA1A1AABLIAAHmg");
	this.shape_34.setTransform(1005.875,671.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AguApQgTgQAAgZQAAgYATgQQAUgSAaAAQAcAAATASQATAQAAAYQAAAZgTAQQgTASgcAAQgaAAgUgSg");
	this.shape_35.setTransform(1004.975,565.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgIAHQAJgHAGgTIACAng");
	this.shape_36.setTransform(1004.525,599.475);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgggJIBBABQgGAKgMAFQgGADgHAAQgPAAgTgTg");
	this.shape_37.setTransform(1004.65,605.2682);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AAAALQgDAAgCgDQgCgEAAgEQAAgEACgDQADgDACAAQAEAAACADQACADAAAEQAAAFgCADQgCADgDAAIgBAAg");
	this.shape_38.setTransform(999.275,597.9031);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AAAALQgDAAgCgDQgCgEAAgEQABgKAGAAQAEAAACADQADADgBAEQAAAFgCADQgCADgDAAIgBAAg");
	this.shape_39.setTransform(1011.1292,598.1531);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AiZCPQgOgYgOgpQgVg9AHgfQANg+A1gkQAvghBCgEQA+gDA3AWQA6AYAXAqQAbAygTBMQgLAugTAiQgFAJgGgCQgGgBgBgKIgKhpQhDACgfgBIAhAwQgzgBgwgSQgxgRgoggQgBABgFAvIgIBNQgBAKgGABIgBAAQgGAAgEgHg");
	this.shape_40.setTransform(1005.0636,582.4317);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgbApQgJgPAAgWQgBgUAYgVQAWgTAPADQAXAFgRAxQgRAxgVAEIgDAAQgJAAgHgNg");
	this.shape_41.setTransform(1021.5313,597.7407);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AAJA2QgVgEgRgxQgRgxAXgFQAPgDAWATQAXAUABAVQAAAWgJAPQgIANgJAAIgDAAg");
	this.shape_42.setTransform(988.6432,597.7907);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AiCB5QgchKAAh0QAAhVAmgkQAkgiBUgBQBUAAAlAjQAmAjAABVQAAB6gZBFQgmBphgAAQhaAAgohpg");
	this.shape_43.setTransform(1005.0747,595.75);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhQBDQAWgsABhCIAAgFIABAAQAbgOAmgEQAQgCA0gBQAAA4AEAZQggAkgnANQgYAJgeAAQgRAAgTgDg");
	this.shape_44.setTransform(1004.225,615.7455);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AmyCqQgBgIABgMQAKhyAQg7QARg/AggdQAfgcA9gKQBTgMARgHIAPgGQAZAeAkASQAmARArAAQArAAAngTQAlgSAYggIAFACQAcAKAPAEQAYAHAVACQBDAGAvAmQAtAlAVBBQALAeAGAoQADATAFA2IADAWQACAKgBAFQjfAOjeAAQjUAAjUgNg");
	this.shape_45.setTransform(1005.8688,646.3818);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AhWCvQgzgSgqgnQgogmgXgyQArgGAYgJQBEgYAThcQAGgcAAggIgBgaQBEABBDgBQABBGAGAcQAQBMA2AUQAcAKAQAEQAXAHAVACIAaADIgTAcIgUAcQgyA/hSAYQgoAMgmAAQgoAAgogNg");
	this.shape_46.setTransform(1006.725,627.5693);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#8B312C").ss(5.7).p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILFAAQA9AAAsAsQAsArAAA+IAAGYg");
	this.shape_47.setTransform(956.975,622.275);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#BC433E").s().p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILFAAQA9AAAsAsQAsArAAA+IAAGYg");
	this.shape_48.setTransform(956.975,622.275);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#8B312C").ss(5.7).p("AnAD3IAAlrQAAg1AmgnQAmgmA2AAIJ8AAQA2AAAnAmQAmAnAAA1IAAFrg");
	this.shape_49.setTransform(928.525,580.675);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#BC433E").s().p("AnAD3IAAlrQAAg1AmgnQAmgmA2AAIJ8AAQA2AAAnAmQAmAnAAA1IAAFrg");
	this.shape_50.setTransform(928.525,580.675);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#8B312C").ss(5.7).p("AnAD3IAAlrQAAg1AngnQAmgmA2AAIJ8AAQA2AAAmAmQAmAnAAA1IAAFrg");
	this.shape_51.setTransform(827.325,580.675);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#BC433E").s().p("AnAD3IAAlrQAAg1AngnQAmgmA2AAIJ8AAQA2AAAmAmQAmAnAAA1IAAFrg");
	this.shape_52.setTransform(827.325,580.675);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#8B312C").ss(5.7).p("AmBDSIAAk3QAAgsAgghQAfgfAtAAIIrAAQAtAAAgAfQAfAhAAAsIAAE3g");
	this.shape_53.setTransform(896.4,542.1);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#BC433E").s().p("AmCDSIAAk3QAAgsAhggQAfghAtAAIIrAAQAtAAAgAhQAfAgAAAsIAAE3g");
	this.shape_54.setTransform(896.4,542.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AhzBTQgOgGAAgpQABgkAJgbQAQgtAXgJQAIgDANABIAVACQBeAHAnA6QAVAeAOA2QgJAJgNAEQgNAEgMgDQgNgDgLgKQgLgKgDgNQgKAMgPgEQgHgCgFgFQgHgFgBgGQgLAFgMgEQgNgEgGgLQgOAYgWAUQgUASgMAAIgFgBg");
	this.shape_55.setTransform(897.2491,483.2255);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgRAaQgGgKAAgOQAAgMAPgNQAOgMAJACQAPADgLAeQgKAfgNADIgCAAQgGAAgFgIg");
	this.shape_56.setTransform(906.0205,492.6209);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AAFAiQgNgDgKgfQgLgeAPgDQAJgCAOAMQAPANAAAMQAAAOgGAKQgFAIgGAAIgCAAg");
	this.shape_57.setTransform(885.2295,492.6209);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AhkgsQAAg2AZgWQAWgWA1AAQA2AAAXAWQAYAWgBA2QAABRgMAkQgWBBhCAFIgGAAQheAAAAi7g");
	this.shape_58.setTransform(895.6,491.3639);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgyAqQAOgdAAgoIAAgEIABAAQARgIAYgDQAOgBAdAAIAAAVQAAARACAMQggAlgwAAQgKAAgLgCg");
	this.shape_59.setTransform(895.05,504.0086);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AkSCoIAAgNQAGhIAKglQALgoAUgSQAUgRAngGQA0gIALgEQArgQAMg6IAEg3QApABArgBQABAuAEAQQAKAxAiAMQAgANAYACQBWAIAcBUQAKAbAGBAIACAXQiJAJiKAAQiIAAiKgJg");
	this.shape_60.setTransform(896.0625,517.2625);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AhCCpQgcgLAGgfQgNACgNgGQgMgFgJgKQgHgKgBgTQgBgSAGgMQgNgBgLgJQgLgIgDgNQgEgMAEgPQAFgQAKgHQgMgIgFgOQgFgOAEgNQAEgOAOgJQAOgKAOAAQAAgOAJgNQAKgMAOgEQAPgEAUAHQAVAIAIAMQAFgRAQgLQAPgKASACQATADAPAOQAPAOAAASQARgLAWADQAWACAPAOQAPAOAEAaQADAZgKASQAPAIAHASQAIAQgFAQQgFASgMALQgOAMgQAAQALALgCARQgBARgNAJQgMAKgTgDQgTgCgIgOQADAKgFAKQgEAKgKAEQgJAEgLgEQgLgDgFgJQABANgMAFQgFACgHgCQgIgBgEgEQgPAWgTAAQgHAAgIgCg");
	this.shape_61.setTransform(896.3611,485.795);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#8B312C").ss(5.7).p("AqyGFIAAozQAAhZA/g+QA/g/BZAAIO4AAQBZAAA+A/QA/A+AABZIAAIzg");
	this.shape_62.setTransform(297.3,728.9);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#BC433E").s().p("AqyGFIAAoyQAAhaA/g+QA/g/BZAAIO3AAQBZAAA/A/QA/A+AABaIAAIyg");
	this.shape_63.setTransform(297.3,728.9);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#8B312C").ss(5.7).p("AqyGFIAAozQAAhZA/g+QA/g/BYAAIO5AAQBYAAA/A/QA/A+AABZIAAIzg");
	this.shape_64.setTransform(145.975,728.9);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#BC433E").s().p("AqyGFIAAoyQAAhaA/g+QA/g/BYAAIO5AAQBYAAA/A/QA/A+AABaIAAIyg");
	this.shape_65.setTransform(145.975,728.9);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#8B312C").ss(5.7).p("ApVFPIAAnnQAAhLA1g1QA1g1BMAAIM/AAQBLAAA2A1QA1A1AABLIAAHng");
	this.shape_66.setTransform(213.225,671.2);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#BC433E").s().p("ApVFOIAAnmQAAhLA1g1QA1g2BMABIM/AAQBLgBA2A2QA1A1AABLIAAHmg");
	this.shape_67.setTransform(213.225,671.2);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#8B312C").ss(5.7).p("ApVFPIAAnnQAAhLA1g1QA1g1BMAAIM/AAQBLAAA2A1QA1A1AABLIAAHng");
	this.shape_68.setTransform(345.325,671.2);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#BC433E").s().p("ApVFOIAAnmQAAhLA1g1QA1g2BMABIM/AAQBLgBA2A2QA1A1AABLIAAHmg");
	this.shape_69.setTransform(345.325,671.2);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#8B312C").ss(5.7).p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_70.setTransform(281.675,622.275);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#BC433E").s().p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_71.setTransform(281.675,622.275);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AlVBuIAFgSQAOg0AagYQAbgWAygIQBFgKAOgGQA5gVAQhMQAFgXAAgbIgBgVQA5AAA2AAQABA6AFAWQAOBBAtAQQAuARAaACQA4AFAnAfQAlAfASA2IADAHIlWBZg");
	this.shape_72.setTransform(281.675,585.25);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgGDxQimgDgugpQgGgFgBguIAAg1QACiRA3hbQBGhyCIAUQAHABALADQAaAGAXAPQAsAdAdA4QAZAvAMA8QAMA+gBBDQAABWgHAFQg2ApiWAAIgVAAg");
	this.shape_73.setTransform(281.2539,552.7785);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#8B312C").ss(5.7).p("AqyGFIAAozQAAhZA/g+QA+g/BZAAIO4AAQBZAAA/A/QA/A+AABZIAAIzg");
	this.shape_74.setTransform(599.95,728.9);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#BC433E").s().p("AqyGFIAAoyQAAhaA/g+QA/g/BYAAIO4AAQBZAAA/A/QA/A+AABaIAAIyg");
	this.shape_75.setTransform(599.95,728.9);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#8B312C").ss(5.7).p("ApVFPIAAnnQAAhLA1g1QA2g1BLAAIM/AAQBMAAA1A1QA1A1AABLIAAHng");
	this.shape_76.setTransform(609.525,671.2);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#BC433E").s().p("ApVFOIAAnmQAAhLA1g1QA2g2BLABIM/AAQBMgBA1A2QA1A1AABLIAAHmg");
	this.shape_77.setTransform(609.525,671.2);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#8B312C").ss(5.7).p("ApVFPIAAnnQAAhLA1g1QA1g1BMAAIM/AAQBMAAA1A1QA1A1AABLIAAHng");
	this.shape_78.setTransform(477.425,671.2);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#BC433E").s().p("ApVFOIAAnmQAAhLA1g1QA1g2BMABIM/AAQBMgBA1A2QA1A1AABLIAAHmg");
	this.shape_79.setTransform(477.425,671.2);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("ACQCZQAIg5gkg2Qgkgzg1gQQg5gTgvAlQg2AqgVBtQgDANgQh+QgDhvAyg1QA0g4BUAJQA/AHAoAeQAcAVAMAZQAMAXAFAoQADAYgSBkQgQBcgBAAIAEgdg");
	this.shape_80.setTransform(477.088,581.1075);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AiAB7QgfhOAAhxQAAhWAmgkQAkgjBVAAQAaAAAVADQA7AIAbAkQAbAkAABKQAAB0gcBJQgoBnhbACIgDAAQhVAAgphng");
	this.shape_81.setTransform(477.175,587.0269);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("Am2ItQgBgFABjVQAKhvAEgaQAPhRAngqQAcghAxgKQAdgGA8gGIASgEQAogMAMggQAMgdgNgpQgqiOgGgbQgWhnAVhGQASg+A0glQA1glBDACQAqABAiASQAkATAXAiQAvBLgLCFQgDAegLAoQgJAkgOAfQgUAvgDAMQgIAeAMAfQAQArA6AOQAhAHBCAMQBPAbAkBtQARA4AIBXQADARACDaQjZAOjbAAQjaAAjfgOg");
	this.shape_82.setTransform(477.9,619.3574);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AiuB9QgVgJABg+QAAg2APgpQALggAKgQQAPgZAWgIQAMgFATABIAgAEQCOAKA6BXQATAaAOArQARAzADAGQgNAPgTAGQgUAGgTgEQgUgFgPgPQgQgQgFgTQgQARgWgFQgKgDgJgHQgKgIgCgJQgQAIgTgGQgSgHgKgQQgVAkgiAfQgdAbgSAAIgIgCg");
	this.shape_83.setTransform(611.2728,584.2604);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AgaAnQgJgOAAgVQAAgTAXgUQAUgSAPADQAWAFgQAuQgQAvgUAEIgDAAQgJAAgHgNg");
	this.shape_84.setTransform(624.474,598.3912);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("AAIA0QgUgEgQgvQgQguAWgFQAPgDAUASQAXAUAAATQAAAVgJAOQgHANgJAAIgDAAg");
	this.shape_85.setTransform(593.1882,598.3912);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AiWhCQAAhRAkgiQAighBQAAQBRAAAiAhQAkAiAABRQAAB6gSA3QghBghkAIIgKAAQiMAAAAkZg");
	this.shape_86.setTransform(608.825,596.4967);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AhMBAQAVgrABg+IAAgFIABAAQAagNAjgEQATgCAuAAQAAA2AEAWQgeAiglANQgXAIgdAAQgQAAgSgCg");
	this.shape_87.setTransform(607.975,615.4872);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AmdD9QgBgHABgMQAKhtAPg5QAQg8AegaQAfgbA6gJQBPgMAQgGQBBgYAShXQAFgbABgeIgBgZQBBABA/gBQABBEAFAZQAPBJA0ATQA1AUAfACQBAAGAsAkQArAjAVA+QAKAdAFAnIAIBFIAEAjQjPANjPAAQjOAAjPgNg");
	this.shape_88.setTransform(609.505,635.4625);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("AhfD/QgbgIgIgbQgIgZgYgHQgZgGgPgUQgPgTACgmQABgNgGgLQgGgLgLgHQgVgNgHgXQgIgbANgaQAKgXgNgWQgPgaAJgaQAEgPANgMQANgNARgFQASgHAIgVQAGgPAMgKQANgMAPgEQANgDASACQARADAQAIQANAGAOgCQAOgCAKgKQAdgaAiAFQASADARAKQARALAKAPQARAZAdgDQAWgDAVAGQAWAHAPAOQASARAHAdQAHAcgGAaQgEAXAPASQAOAPAEATQAFAUgFASQgKAjgaAQQgKAHgGAMQgFAMABANQABAggWAQQgWAQgfgGQgMgDgMAEQgMAEgHAKQgHAIgJAEQgOAGgQgFQgRgGgVAMIgDACQgJAEgJgDQgTgDgQAOQgSAOgTAAQgIAAgIgCg");
	this.shape_89.setTransform(609.9463,588.1093);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f().s("#8B312C").ss(5.7).p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_90.setTransform(506.775,622.275);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#BC433E").s().p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_91.setTransform(506.775,622.275);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().s("#8B312C").ss(5.7).p("AnAD3IAAlrQAAg1AmgnQAmgmA2AAIJ8AAQA2AAAnAmQAmAnAAA1IAAFrg");
	this.shape_92.setTransform(523.875,580.675);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#BC433E").s().p("AnAD3IAAlrQAAg1AmgnQAmgmA2AAIJ8AAQA2AAAnAmQAmAnAAA1IAAFrg");
	this.shape_93.setTransform(523.875,580.675);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("Ak/B8IAAgPQAIhWALgoQANgwAXgUQAYgVAsgHQA+gJAMgFIALgEQASAWAbANQAcANAfAAQAgAAAcgOQAbgNASgYIADABQAmAPAbACQAyAFAiAcQAhAcAQAvQAIAWAEAeQADAPADAnIADAaQigALigAAQifAAiggLg");
	this.shape_94.setTransform(525.1125,557.4125);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("Ak/DEIAAgPQAIhWALgqQANgwAXgSQAYgVAsgHQA+gKAMgEQAygTAOhDIAEhAQBCABAhgBQAAAyAFAWQALA5AoAPQAmAOAbADQAyAEAiAdQAhAaAQAwQAIAXAEAdQADAQADAmIADAbQigAKigAAQifAAiggKg");
	this.shape_95.setTransform(525.1125,550.2875);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("Ah2B2IgIAxIgPgtIgPgsQgNALgWAfQgDgrABgPQAAgeAHggQAUhiA1g5QAXgZAjgOQAigNAlAAQBdgBAyBlQAhBDACBDQACAmgNAoQgNAngZAfIABg7IhSBEIgsgeQgQAVgDAhQhNgagqhAg");
	this.shape_96.setTransform(524.0703,518.7249);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f().s("#8B312C").ss(5.7).p("AqyGFIAAozQAAhZA/g+QA+g/BZAAIO4AAQBZAAA/A/QA/A+AABZIAAIzg");
	this.shape_97.setTransform(1356.55,728.9);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#BC433E").s().p("AqyGFIAAoyQAAhaA/g+QA+g/BaAAIO4AAQBYAAA/A/QA/A+AABaIAAIyg");
	this.shape_98.setTransform(1356.55,728.9);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f().s("#8B312C").ss(5.7).p("AqyGFIAAozQAAhZA/g+QA/g/BYAAIO5AAQBYAAA/A/QA/A+AABZIAAIzg");
	this.shape_99.setTransform(1205.225,728.9);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#BC433E").s().p("AqyGFIAAoyQAAhaA/g+QA/g/BYAAIO5AAQBYAAA/A/QA/A+AABaIAAIyg");
	this.shape_100.setTransform(1205.225,728.9);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f().s("#8B312C").ss(5.7).p("ApVFPIAAnnQAAhLA1g1QA1g1BMAAIM/AAQBLAAA2A1QA1A1AABLIAAHng");
	this.shape_101.setTransform(1270.125,671.2);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#BC433E").s().p("ApVFOIAAnmQAAhLA1g1QA1g2BMABIM/AAQBLgBA2A2QA1A1AABLIAAHmg");
	this.shape_102.setTransform(1270.125,671.2);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f().s("#8B312C").ss(5.7).p("ApVFPIAAnnQAAhLA1g1QA2g1BLAAIM/AAQBMAAA1A1QA1A1AABLIAAHng");
	this.shape_103.setTransform(1137.975,671.2);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#BC433E").s().p("ApVFOIAAnmQAAhLA1g1QA2g2BLABIM/AAQBMgBA1A2QA1A1AABLIAAHmg");
	this.shape_104.setTransform(1137.975,671.2);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f().s("#8B312C").ss(5.7).p("An3EXIAAmYQAAg+AsgrQAsgsA+AAILEAAQA9AAAsAsQAsArAAA+IAAGYg");
	this.shape_105.setTransform(1182.075,622.275);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#BC433E").s().p("An3EXIAAmYQAAg+AsgrQAsgsA+AAILEAAQA9AAAsAsQAsArAAA+IAAGYg");
	this.shape_106.setTransform(1182.075,622.275);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f().s("#8B312C").ss(5.7).p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILFAAQA9AAAsAsQAsArAAA+IAAGYg");
	this.shape_107.setTransform(1069.525,622.275);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#BC433E").s().p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILFAAQA9AAAsAsQAsArAAA+IAAGYg");
	this.shape_108.setTransform(1069.525,622.275);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f().s("#8B312C").ss(5.7).p("AnAD3IAAlrQAAg1AmgnQAngmA1AAIJ9AAQA1AAAnAmQAmAnAAA1IAAFrg");
	this.shape_109.setTransform(1130.825,580.675);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#BC433E").s().p("AnAD3IAAlrQAAg1AmgnQAngmA1AAIJ9AAQA1AAAnAmQAmAnAAA1IAAFrg");
	this.shape_110.setTransform(1130.825,580.675);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f().s("#8B312C").ss(5.7).p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_111.setTransform(394.225,622.275);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#BC433E").s().p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_112.setTransform(394.225,622.275);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#000000").s().p("AkhFXQAPhHAPheQAgi8AGh3QAGiDBRg6QAfgXAggBQAeAAAOAVIAggJQAlgHAgAHQBnAYAACeQAACdA4C3QAdBbAcA8g");
	this.shape_113.setTransform(396.45,559.8244);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#000000").s().p("AgOEBQgjgQgoglQhOhLgRhtQgUh6BRhbQAignAogQQApgQAfANIAgAJQAmAOAdAZQBcBOgiCZQgiCahUA1QgkAWgeAAIgKAAg");
	this.shape_114.setTransform(392.8427,553.4663);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#000000").s().p("AmCCXIAAgSQAJhmAOg0QAPg4AdgaQAcgZA2gIQBLgMAOgFQAIgDAFgDQAWAbAhAPQAhAQAnAAQAmAAAigQQAigRAVgcIAEABQAxATAdACQA8AFAqAjQAoAhATA5QAJAbAGAkIAHBBIADATQABAJAAAFQjFAMjBAAQjCAAi+gMg");
	this.shape_115.setTransform(394.3938,600.4125);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#000000").s().p("AmCDtIAAgSQAJhmAOg1QAPg4AdgZQAcgZA2gIQBLgMAOgFQA9gXARhRQAFgaABgcIgBgXQA8ABA7gBQABA/AFAYQAPBEAwASQAxATAdACQA8AFAqAjQAoAgATA5QAJAcAGAkIAHBBIADATQABAJAAAFQjFAMjBAAQjCAAi+gMg");
	this.shape_116.setTransform(394.3938,591.8125);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f().s("#8B312C").ss(5.7).p("AnAD3IAAlrQAAg1AmgnQAngmA1AAIJ9AAQA2AAAmAmQAmAnAAA1IAAFrg");
	this.shape_117.setTransform(422.675,580.675);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#BC433E").s().p("AnAD3IAAlrQAAg1AmgnQAngmA1AAIJ9AAQA2AAAmAmQAmAnAAA1IAAFrg");
	this.shape_118.setTransform(422.675,580.675);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f().s("#8B312C").ss(5.7).p("AnAD3IAAlrQAAg1AmgnQAngmA1AAIJ9AAQA1AAAnAmQAmAnAAA1IAAFrg");
	this.shape_119.setTransform(321.525,580.675);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#BC433E").s().p("AnAD3IAAlrQAAg1AmgnQAngmA1AAIJ9AAQA1AAAnAmQAmAnAAA1IAAFrg");
	this.shape_120.setTransform(321.525,580.675);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f().s("#8B312C").ss(5.7).p("AmCDSIAAk3QAAgsAgghQAggfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_121.setTransform(366.475,542.1);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#BC433E").s().p("AmCDSIAAk3QAAgsAgggQAgghAtAAIIrAAQAtAAAgAhQAgAgAAAsIAAE3g");
	this.shape_122.setTransform(366.475,542.1);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#000000").s().p("ABOA8QgLgTgUg3QgeAvgrAZQg2Afg8gNQgBgVAGgcQAMg2AigeQAcgYApgHQBZgNAsA4QApA1gTBTIgHABQgdAAgVggg");
	this.shape_123.setTransform(366.3545,482.5401);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#000000").s().p("AAGAjQgOgDgLgfQgLggAQgDQAJgCAOAMQAPAOAAAMQAAAPgGAKQgFAIgFAAIgCAAg");
	this.shape_124.setTransform(356.1717,490.921);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#000000").s().p("AgRAbQgGgKAAgPQAAgMAPgOQAOgMAKACQAPADgLAgQgLAfgNADIgCAAQgGAAgFgIg");
	this.shape_125.setTransform(377.5327,490.921);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#000000").s().p("AAACTQg6gCgZhDQgTgwAAhLQAAg3AZgXQAXgXA2AAQA3AAAXAXQAZAXAAA3QAABJgUAzQgaBEg3AAIgCAAg");
	this.shape_126.setTransform(366.85,489.6257);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#000000").s().p("AgzAIQACgPAAglQAhAAALACQAYACASAJIAAAAIAAAEQABApAOAeQgLABgKAAQgyAAggglg");
	this.shape_127.setTransform(367.425,502.5821);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#000000").s().p("AkaCtIADgYQAGg/AKgfQAOgqAdgXQAegZAsgEQAWgCAjgNQAjgNALgyQADgRABgvQAeABA5gBIAEA5QAMA7AsAQQALAEA2AJQAoAGAUASQAVASALApQAKAlAHBMQABAIgBAFQiNAJiNAAQiMAAiOgJg");
	this.shape_128.setTransform(366.42,516.225);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#000000").s().p("AiCDPQgcgOgUgZQgfgnADgtQACgQAHgSIAWgvQAMgcAHgUQARg3AXgkQAcgqAqgXQArgWAtADQAUACAPAIQAPAJAOATQAVAbALArQAEAVAIA5QAEAiAXAxQAFANAPAaQAMAZgCASQgEAhg0AJIg4AIQgjAEgVAGIg4ATQghAKgZABIgCAAQgbAAgagOg");
	this.shape_129.setTransform(366.2223,493.0023);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f().s("#8B312C").ss(5.7).p("AqyGFIAAozQAAhZA/g+QA/g/BZAAIO3AAQBZAAA/A/QA/A+AABZIAAIzg");
	this.shape_130.setTransform(-5.325,728.9);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#BC433E").s().p("AqyGFIAAoyQAAhaA/g+QA/g/BZAAIO3AAQBZAAA/A/QA/A+AABaIAAIyg");
	this.shape_131.setTransform(-5.325,728.9);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f().s("#8B312C").ss(5.7).p("ApVFPIAAnnQAAhLA1g1QA1g1BMAAIM/AAQBLAAA2A1QA1A1AABLIAAHng");
	this.shape_132.setTransform(1402.225,671.2);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#BC433E").s().p("ApVFOIAAnmQAAhLA1g1QA1g2BMABIM/AAQBLgBA2A2QA1A1AABLIAAHmg");
	this.shape_133.setTransform(1402.225,671.2);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f().s("#8B312C").ss(5.7).p("ApVFPIAAnnQAAhLA1g1QA2g1BLAAIM/AAQBMAAA1A1QA1A1AABLIAAHng");
	this.shape_134.setTransform(81.075,671.2);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#BC433E").s().p("ApVFOIAAnmQAAhLA1g1QA2g2BLABIM/AAQBMgBA1A2QA1A1AABLIAAHmg");
	this.shape_135.setTransform(81.075,671.2);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f().s("#8B312C").ss(5.7).p("ApVFPIAAnnQAAhLA1g1QA1g1BMAAINAAAQBLAAA1A1QA1A1AABLIAAHng");
	this.shape_136.setTransform(-51,671.2);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#BC433E").s().p("ApVFOIAAnmQAAhLA1g1QA1g2BMABINAAAQBLgBA1A2QA1A1AABLIAAHmg");
	this.shape_137.setTransform(-51,671.2);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f().s("#8B312C").ss(5.7).p("An3EXIAAmYQAAg+AsgrQAsgsA+AAILEAAQA9AAAsAsQAsArAAA+IAAGYg");
	this.shape_138.setTransform(1407.175,622.275);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#BC433E").s().p("An3EXIAAmYQAAg+AsgrQAsgsA+AAILEAAQA9AAAsAsQAsArAAA+IAAGYg");
	this.shape_139.setTransform(1407.175,622.275);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f().s("#8B312C").ss(5.7).p("An3EXIAAmYQAAg+AsgrQAsgsA+AAILEAAQA9AAAsAsQAsArAAA+IAAGYg");
	this.shape_140.setTransform(1294.625,622.275);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#BC433E").s().p("An3EXIAAmYQAAg+AsgrQAsgsA+AAILEAAQA9AAAsAsQAsArAAA+IAAGYg");
	this.shape_141.setTransform(1294.625,622.275);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f().s("#8B312C").ss(5.7).p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_142.setTransform(619.325,622.275);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#BC433E").s().p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_143.setTransform(619.325,622.275);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("#8B312C").ss(5.7).p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_144.setTransform(169.125,622.275);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#BC433E").s().p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_145.setTransform(169.125,622.275);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().s("#8B312C").ss(5.7).p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_146.setTransform(56.575,622.275);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#BC433E").s().p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_147.setTransform(56.575,622.275);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().s("#8B312C").ss(5.7).p("AnAD3IAAlrQAAg1AmgnQAmgmA2AAIJ9AAQA1AAAnAmQAmAnAAA1IAAFrg");
	this.shape_148.setTransform(1333.175,580.675);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#BC433E").s().p("AnAD3IAAlrQAAg1AmgnQAmgmA2AAIJ9AAQA1AAAnAmQAmAnAAA1IAAFrg");
	this.shape_149.setTransform(1333.175,580.675);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f().s("#8B312C").ss(5.7).p("AnAD3IAAlrQAAg1AngnQAmgmA2AAIJ8AAQA2AAAmAmQAmAnAAA1IAAFrg");
	this.shape_150.setTransform(1231.975,580.675);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#BC433E").s().p("AnAD3IAAlrQAAg1AngnQAmgmA2AAIJ8AAQA2AAAmAmQAmAnAAA1IAAFrg");
	this.shape_151.setTransform(1231.975,580.675);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().s("#8B312C").ss(5.7).p("AnAD3IAAlrQAAg1AmgnQAngmA1AAIJ9AAQA1AAAnAmQAmAnAAA1IAAFrg");
	this.shape_152.setTransform(1029.675,580.675);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#BC433E").s().p("AnAD3IAAlrQAAg1AmgnQAngmA1AAIJ9AAQA1AAAnAmQAmAnAAA1IAAFrg");
	this.shape_153.setTransform(1029.675,580.675);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f().s("#8B312C").ss(5.7).p("AnAD3IAAlrQAAg1AmgnQAngmA1AAIJ9AAQA1AAAnAmQAmAnAAA1IAAFrg");
	this.shape_154.setTransform(726.175,580.675);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#BC433E").s().p("AnAD3IAAlrQAAg1AmgnQAngmA1AAIJ9AAQA1AAAnAmQAmAnAAA1IAAFrg");
	this.shape_155.setTransform(726.175,580.675);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f().s("#8B312C").ss(5.7).p("AnAD3IAAlrQAAg1AmgnQAngmA1AAIJ9AAQA1AAAnAmQAmAnAAA1IAAFrg");
	this.shape_156.setTransform(625.025,580.675);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#BC433E").s().p("AnAD3IAAlrQAAg1AmgnQAngmA1AAIJ9AAQA1AAAnAmQAmAnAAA1IAAFrg");
	this.shape_157.setTransform(625.025,580.675);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#000000").s().p("AleCeQgCgHABgKQAJheANgvQANgxAagYQAagXAxgHQBEgKANgGQAjgMAUgkQAjANAmgBQAmABAjgNQAQAeAdAMQArAQAcACQA2AGAmAeQAkAfASAzQAIAZAFAhIAHA7IADAeQiwALiwAAQivAAivgLg");
	this.shape_158.setTransform(171.08,598.5);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#000000").s().p("AleDXQgCgGABgKQAJheANgvQANgyAagXQAagXAxgHQBEgLANgFQA3gUAQhKQAFgXAAgaIgBgVQA3ABA1gBQABA6AFAVQANA+AsARQArAQAcACQA2AFAmAfQAkAdASA1QAIAZAFAhIAHA7IADAdQiwALiwAAQivAAivgLg");
	this.shape_159.setTransform(171.08,592.725);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#000000").s().p("AgHECQhVgIg0gUQhWgggVhBQgFgRAHgQQAIgSAQgCQgPgCgMgKQgMgLgEgPQgEgOAFgQQAGgOAMgJQgMgIgBgQQgBgQAJgMQAOgSAjgNQgIgOgBgUQgBgXAKgMQARgVAhgEQAQgCANACQAEgOAOgRQAbggAxgHQAYgEAXALQAYAJAQAUQBVgbAgAyQAQAZgBAeIATACQAWAEAQAJQAxAdgoBEIABABQASAPgGAYQgGAagWAGQASADAIAUQAHAUgIASQgMAbgvAUQAKAAAGAKQAFAJgCAKQgEAQgWAPQgrAeg3ANQgkAJgmAAQgRAAgPgCg");
	this.shape_160.setTransform(169.9844,552.8653);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f().s("#8B312C").ss(5.7).p("AnAD3IAAlrQAAg1AmgnQAmgmA2AAIJ8AAQA2AAAnAmQAmAnAAA1IAAFrg");
	this.shape_161.setTransform(220.375,580.675);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#BC433E").s().p("AnAD3IAAlrQAAg1AmgnQAmgmA2AAIJ8AAQA2AAAnAmQAmAnAAA1IAAFrg");
	this.shape_162.setTransform(220.375,580.675);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f().s("#8B312C").ss(5.7).p("AnAD3IAAlrQAAg1AngnQAmgmA2AAIJ8AAQA2AAAmAmQAmAnAAA1IAAFrg");
	this.shape_163.setTransform(119.175,580.675);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#BC433E").s().p("AnAD3IAAlrQAAg1AngnQAmgmA2AAIJ8AAQA2AAAmAmQAmAnAAA1IAAFrg");
	this.shape_164.setTransform(119.175,580.675);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f().s("#8B312C").ss(5.7).p("Am/D3IAAlrQAAg1AlgnQAngmA1AAIJ9AAQA1AAAnAmQAmAnAAA1IAAFrg");
	this.shape_165.setTransform(18.05,580.675);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#BC433E").s().p("Am/D3IAAlrQgBg1AmgnQAngmA1AAIJ8AAQA2AAAmAmQAnAnAAA1IAAFrg");
	this.shape_166.setTransform(18.05,580.675);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f().s("#8B312C").ss(5.7).p("AmCDSIAAk3QAAgsAgghQAggfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_167.setTransform(1338.025,542.1);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#BC433E").s().p("AmCDSIAAk3QAAgsAgggQAgghAtAAIIrAAQAtAAAgAhQAgAgAAAsIAAE3g");
	this.shape_168.setTransform(1338.025,542.1);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f().s("#8B312C").ss(5.7).p("AmCDSIAAk3QAAgsAgghQAggfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_169.setTransform(1249.675,542.1);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#BC433E").s().p("AmCDSIAAk3QAAgsAgggQAgghAtAAIIrAAQAtAAAgAhQAgAgAAAsIAAE3g");
	this.shape_170.setTransform(1249.675,542.1);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f().s("#8B312C").ss(5.7).p("AmCDSIAAk3QAAgsAgghQAggfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_171.setTransform(1161.375,542.1);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#BC433E").s().p("AmCDSIAAk3QAAgsAgggQAgghAtAAIIrAAQAtAAAgAhQAgAgAAAsIAAE3g");
	this.shape_172.setTransform(1161.375,542.1);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f().s("#8B312C").ss(5.7).p("AmCDSIAAk3QAAgsAgghQAggfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_173.setTransform(1073.025,542.1);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#BC433E").s().p("AmCDSIAAk3QAAgsAgggQAgghAtAAIIrAAQAtAAAgAhQAgAgAAAsIAAE3g");
	this.shape_174.setTransform(1073.025,542.1);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f().s("#8B312C").ss(5.7).p("AmCDSIAAk3QAAgsAgghQAggfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_175.setTransform(984.725,542.1);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#BC433E").s().p("AmCDSIAAk3QAAgsAgggQAgghAtAAIIrAAQAtAAAgAhQAgAgAAAsIAAE3g");
	this.shape_176.setTransform(984.725,542.1);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f().s("#8B312C").ss(5.7).p("AmCDSIAAk3QAAgsAgghQAggfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_177.setTransform(808.075,542.1);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#BC433E").s().p("AmCDSIAAk3QAAgsAgggQAgghAtAAIIrAAQAtAAAgAhQAgAgAAAsIAAE3g");
	this.shape_178.setTransform(808.075,542.1);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f().s("#8B312C").ss(5.7).p("AmCDSIAAk3QAAgsAgghQAggfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_179.setTransform(719.775,542.1);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#BC433E").s().p("AmCDSIAAk3QAAgsAgggQAgghAtAAIIrAAQAtAAAgAhQAgAgAAAsIAAE3g");
	this.shape_180.setTransform(719.775,542.1);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#000000").s().p("AjvDgQAOgcAPgxQAehhAFhiQAEhsBEgwQAagTAZAAQAagBAMASIAZgHQAfgGAbAGQBUATAACDQAACCArBcQAXAuAVATg");
	this.shape_181.setTransform(628.75,517.9743);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#000000").s().p("AgLDUQgegMgggfQhBg+gOhaQgQhlBDhLQAcggAhgNQAigOAZALIAaAIQAgALAYAVQBMBAgcB+QgcB/hGAsQgdATgZAAIgIgBg");
	this.shape_182.setTransform(626.4727,518.5776);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#000000").s().p("Ak/B8IAAgPQAGhQANguQANgwAXgUQAXgVAtgHQA+gJAMgFIAKgEQATAWAbANQAbANAgAAQAfAAAdgOQAbgNASgYIADABQAmAPAbACQAyAFAiAcQAhAcAQAvQAHAWAFAeIAGA2IADAaQigALigAAQifAAiggLg");
	this.shape_183.setTransform(627.7625,557.4125);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#000000").s().p("Ak/DEIAAgPQAGhRANgvQANgwAXgSQAXgVAtgHQA+gKAMgEQAygTAOhDIAEhAQBBABAigBQAAAyAFAWQALA5AoAPQAmAOAbADQAyAEAiAdQAhAaAQAwQAHAWAFAeIAGA2IADAbQigAKigAAQifAAiggKg");
	this.shape_184.setTransform(627.7625,550.2875);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f().s("#8B312C").ss(5.7).p("AmCDSIAAk3QAAgsAgghQAggfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_185.setTransform(631.425,542.1);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#BC433E").s().p("AmCDSIAAk3QAAgsAgggQAgghAtAAIIrAAQAtAAAgAhQAgAgAAAsIAAE3g");
	this.shape_186.setTransform(631.425,542.1);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#000000").s().p("AkzC8QgBgFABgJQAGhOAMgtQANgtAWgTQAXgUArgHQA7gJAMgEQAwgSANhBIAEg9IBfAAQAAAvAFAWQALA2AnAPQAlAOAZACQAwAEAhAcQAgAZAPAuQAHAWAFAdIAFAzIADAaQiaAKiaAAQiZAAiagKg");
	this.shape_187.setTransform(803.905,515.6125);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#000000").s().p("AhhDuQgbAAgTgSQgUgRgCgbQgMiIAFhhQAIiUAwgUQAxgUAuAPQAYAJAZgKQAogRA2AbQAtAWAHCSQAEBggNCGQgDAagTASQgUARgaAAg");
	this.shape_188.setTransform(803.5856,494.1084);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f().s("#8B312C").ss(5.7).p("AmCDSIAAk3QAAgsAgghQAggfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_189.setTransform(543.125,542.1);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#BC433E").s().p("AmCDSIAAk3QAAgsAgggQAgghAtAAIIrAAQAtAAAgAhQAgAgAAAsIAAE3g");
	this.shape_190.setTransform(543.125,542.1);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f().s("#8B312C").ss(5.7).p("AmCDSIAAk3QAAgsAgghQAggfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_191.setTransform(454.775,542.1);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#BC433E").s().p("AmCDSIAAk3QAAgsAgggQAgghAtAAIIrAAQAtAAAgAhQAgAgAAAsIAAE3g");
	this.shape_192.setTransform(454.775,542.1);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f().s("#8B312C").ss(5.7).p("AmBDSIAAk3QAAgsAgghQAfgfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_193.setTransform(278.15,542.1);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#BC433E").s().p("AmBDSIAAk3QAAgsAfggQAgghAtAAIIrAAQAtAAAgAhQAgAgAAAsIAAE3g");
	this.shape_194.setTransform(278.15,542.1);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f().s("#8B312C").ss(5.7).p("AmCDSIAAk3QAAgsAgghQAggfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_195.setTransform(189.825,542.1);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#BC433E").s().p("AmCDSIAAk3QAAgsAgggQAgghAtAAIIrAAQAtAAAgAhQAgAgAAAsIAAE3g");
	this.shape_196.setTransform(189.825,542.1);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f().s("#8B312C").ss(5.7).p("AmCDSIAAk3QAAgsAgghQAggfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_197.setTransform(101.525,542.1);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#BC433E").s().p("AmCDSIAAk3QAAgsAgggQAgghAtAAIIrAAQAtAAAgAhQAgAgAAAsIAAE3g");
	this.shape_198.setTransform(101.525,542.1);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f().s("#8B312C").ss(5.7).p("AmCDSIAAk3QAAgsAgghQAggfAtAAIIrAAQAtAAAgAfQAgAhAAAsIAAE3g");
	this.shape_199.setTransform(13.2,542.1);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#BC433E").s().p("AmBDSIAAk3QAAgsAfggQAhghAsAAIIrAAQAtAAAgAhQAfAgABAsIAAE3g");
	this.shape_200.setTransform(13.2,542.1);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f().s("#8B312C").ss(5.7).p("AlDCuIAAkEQAAgkAagZQAZgZAkAAIHZAAQAkAAAZAZQAaAZAAAkIAAEEg");
	this.shape_201.setTransform(1315.175,507.9);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#BC433E").s().p("AlDCtIAAkDQAAgjAagaQAZgaAkAAIHZAAQAkAAAZAaQAaAaAAAjIAAEDg");
	this.shape_202.setTransform(1315.175,507.9);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f().s("#8B312C").ss(5.7).p("AlCCuIAAkEQAAgkAZgZQAZgZAkAAIHZAAQAkAAAZAZQAaAZAAAkIAAEEg");
	this.shape_203.setTransform(1239.95,507.9);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#BC433E").s().p("AlDCtIAAkDQAAgjAagaQAZgaAkAAIHZAAQAkAAAZAaQAZAaAAAjIAAEDg");
	this.shape_204.setTransform(1239.95,507.9);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f().s("#8B312C").ss(5.7).p("AlCCuIAAkEQAAgkAZgZQAZgZAkAAIHZAAQAkAAAZAZQAaAZAAAkIAAEEg");
	this.shape_205.setTransform(1164.7,507.9);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#BC433E").s().p("AlDCtIAAkDQAAgjAagaQAZgaAkAAIHZAAQAkAAAZAaQAaAagBAjIAAEDg");
	this.shape_206.setTransform(1164.7,507.9);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f().s("#8B312C").ss(5.7).p("AlCCuIAAkEQAAgkAZgZQAZgZAkAAIHZAAQAkAAAZAZQAaAZAAAkIAAEEg");
	this.shape_207.setTransform(1089.45,507.9);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#BC433E").s().p("AlDCtIAAkDQABgjAZgaQAZgaAkAAIHZAAQAkAAAZAaQAaAagBAjIAAEDg");
	this.shape_208.setTransform(1089.45,507.9);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f().s("#8B312C").ss(5.7).p("AlDCuIAAkEQAAgkAagZQAZgZAkAAIHZAAQAkAAAZAZQAZAZAAAkIAAEEg");
	this.shape_209.setTransform(1014.2,507.9);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#BC433E").s().p("AlDCtIAAkDQABgjAZgaQAagaAjAAIHZAAQAkAAAZAaQAZAaAAAjIAAEDg");
	this.shape_210.setTransform(1014.2,507.9);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f().s("#8B312C").ss(5.7).p("AlDCuIAAkEQAAgkAagZQAZgZAkAAIHZAAQAkAAAZAZQAZAZAAAkIAAEEg");
	this.shape_211.setTransform(938.95,507.9);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#BC433E").s().p("AlDCtIAAkDQAAgjAagaQAZgaAkAAIHZAAQAjAAAaAaQAZAaABAjIAAEDg");
	this.shape_212.setTransform(938.95,507.9);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f().s("#8B312C").ss(5.7).p("AlDCuIAAkEQAAgkAagZQAZgZAkAAIHZAAQAkAAAZAZQAZAZAAAkIAAEEg");
	this.shape_213.setTransform(863.7,507.9);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#BC433E").s().p("AlCCtIAAkDQgBgjAagaQAZgaAkAAIHZAAQAkAAAZAaQAaAaAAAjIAAEDg");
	this.shape_214.setTransform(863.7,507.9);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f().s("#8B312C").ss(5.7).p("AlDCuIAAkEQAAgkAagZQAZgZAkAAIHZAAQAkAAAZAZQAZAZAAAkIAAEEg");
	this.shape_215.setTransform(788.45,507.9);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#BC433E").s().p("AlCCtIAAkDQgBgjAagaQAZgaAkAAIHZAAQAkAAAaAaQAZAaAAAjIAAEDg");
	this.shape_216.setTransform(788.45,507.9);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f().s("#8B312C").ss(5.7).p("AlDCuIAAkEQAAgkAagZQAZgZAkAAIHZAAQAkAAAZAZQAZAZAAAkIAAEEg");
	this.shape_217.setTransform(713.2,507.9);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#BC433E").s().p("AlCCtIAAkDQAAgjAZgaQAZgaAkAAIHZAAQAkAAAaAaQAZAaAAAjIAAEDg");
	this.shape_218.setTransform(713.2,507.9);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f().s("#8B312C").ss(5.7).p("AlDCuIAAkEQAAgkAagZQAZgZAkAAIHZAAQAkAAAZAZQAaAZAAAkIAAEEg");
	this.shape_219.setTransform(637.975,507.9);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#BC433E").s().p("AlDCtIAAkDQAAgjAagaQAZgaAkAAIHZAAQAkAAAZAaQAaAaAAAjIAAEDg");
	this.shape_220.setTransform(637.975,507.9);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f().s("#8B312C").ss(5.7).p("AlDCuIAAkEQAAgkAagZQAZgZAkAAIHZAAQAkAAAZAZQAaAZAAAkIAAEEg");
	this.shape_221.setTransform(562.75,507.9);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#BC433E").s().p("AlDCtIAAkDQAAgjAagaQAZgaAkAAIHZAAQAjAAAaAaQAZAaABAjIAAEDg");
	this.shape_222.setTransform(562.75,507.9);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f().s("#8B312C").ss(5.7).p("AlDCuIAAkEQAAgkAagZQAZgZAkAAIHZAAQAkAAAZAZQAaAZAAAkIAAEEg");
	this.shape_223.setTransform(487.5,507.9);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#BC433E").s().p("AlCCtIAAkDQgBgjAagaQAZgaAkAAIHZAAQAkAAAZAaQAZAaABAjIAAEDg");
	this.shape_224.setTransform(487.5,507.9);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f().s("#8B312C").ss(5.7).p("AlDCuIAAkEQAAgkAagZQAZgZAkAAIHZAAQAkAAAZAZQAaAZAAAkIAAEEg");
	this.shape_225.setTransform(412.25,507.9);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#BC433E").s().p("AlCCtIAAkDQgBgjAagaQAZgaAkAAIHZAAQAjAAAaAaQAaAaAAAjIAAEDg");
	this.shape_226.setTransform(412.25,507.9);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f().s("#8B312C").ss(5.7).p("AlDCuIAAkEQAAgkAagZQAZgZAkAAIHZAAQAkAAAZAZQAaAZAAAkIAAEEg");
	this.shape_227.setTransform(337,507.9);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#BC433E").s().p("AlCCtIAAkDQAAgjAZgaQAZgaAkAAIHZAAQAjAAAaAaQAaAaAAAjIAAEDg");
	this.shape_228.setTransform(337,507.9);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f().s("#8B312C").ss(5.7).p("AlCCuIAAkEQAAgkAZgZQAZgZAkAAIHZAAQAkAAAZAZQAaAZAAAkIAAEEg");
	this.shape_229.setTransform(261.75,507.9);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#BC433E").s().p("AlCCtIAAkDQAAgjAZgaQAagaAjAAIHZAAQAjAAAaAaQAZAaAAAjIAAEDg");
	this.shape_230.setTransform(261.75,507.9);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f().s("#8B312C").ss(5.7).p("AlCCuIAAkEQAAgkAZgZQAZgZAkAAIHZAAQAkAAAZAZQAZAZAAAkIAAEEg");
	this.shape_231.setTransform(186.5,507.9);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#BC433E").s().p("AlDCtIAAkDQAAgjAagaQAagaAjAAIHZAAQAkAAAaAaQAYAaAAAjIAAEDg");
	this.shape_232.setTransform(186.5,507.9);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f().s("#8B312C").ss(5.7).p("AlCCuIAAkEQAAgkAZgZQAZgZAkAAIHZAAQAkAAAZAZQAZAZAAAkIAAEEg");
	this.shape_233.setTransform(111.25,507.9);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#BC433E").s().p("AlDCtIAAkDQAAgjAagaQAagaAjAAIHZAAQAkAAAZAaQAZAaAAAjIAAEDg");
	this.shape_234.setTransform(111.25,507.9);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f().s("#8B312C").ss(5.7).p("AlDCuIAAkEQAAgkAagZQAZgZAkAAIHZAAQAkAAAZAZQAZAZAAAkIAAEEg");
	this.shape_235.setTransform(36,507.9);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#BC433E").s().p("AlDCtIAAkDQABgjAZgaQAZgaAkAAIHZAAQAkAAAZAaQAZAaAAAjIAAEDg");
	this.shape_236.setTransform(36,507.9);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f().s("#8B312C").ss(5.7).p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_237.setTransform(-438.2074,1077.9362,1.7992,1.7992);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#BC433E").s().p("An3EXIAAmYQAAg+AsgrQAsgsA9AAILEAAQA+AAAsAsQAsArAAA+IAAGYg");
	this.shape_238.setTransform(-438.2074,1077.9362,1.7992,1.7992);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_236,p:{scaleX:1,scaleY:1,x:36,y:507.9}},{t:this.shape_235,p:{scaleX:1,scaleY:1,x:36,y:507.9}},{t:this.shape_234,p:{scaleX:1,scaleY:1,x:111.25,y:507.9}},{t:this.shape_233,p:{scaleX:1,scaleY:1,x:111.25,y:507.9}},{t:this.shape_232,p:{scaleX:1,scaleY:1,x:186.5,y:507.9}},{t:this.shape_231,p:{scaleX:1,scaleY:1,x:186.5,y:507.9}},{t:this.shape_230,p:{scaleX:1,scaleY:1,x:261.75,y:507.9}},{t:this.shape_229,p:{scaleX:1,scaleY:1,x:261.75,y:507.9}},{t:this.shape_228,p:{scaleX:1,scaleY:1,x:337,y:507.9}},{t:this.shape_227,p:{scaleX:1,scaleY:1,x:337,y:507.9}},{t:this.shape_226,p:{scaleX:1,scaleY:1,x:412.25,y:507.9}},{t:this.shape_225,p:{scaleX:1,scaleY:1,x:412.25,y:507.9}},{t:this.shape_224,p:{scaleX:1,scaleY:1,x:487.5,y:507.9}},{t:this.shape_223,p:{scaleX:1,scaleY:1,x:487.5,y:507.9}},{t:this.shape_222,p:{scaleX:1,scaleY:1,x:562.75,y:507.9}},{t:this.shape_221,p:{scaleX:1,scaleY:1,x:562.75,y:507.9}},{t:this.shape_220,p:{scaleX:1,scaleY:1,x:637.975,y:507.9}},{t:this.shape_219,p:{scaleX:1,scaleY:1,x:637.975,y:507.9}},{t:this.shape_218,p:{scaleX:1,scaleY:1,x:713.2,y:507.9}},{t:this.shape_217,p:{scaleX:1,scaleY:1,x:713.2,y:507.9}},{t:this.shape_216,p:{scaleX:1,scaleY:1,x:788.45,y:507.9}},{t:this.shape_215,p:{scaleX:1,scaleY:1,x:788.45,y:507.9}},{t:this.shape_214,p:{scaleX:1,scaleY:1,x:863.7,y:507.9}},{t:this.shape_213,p:{scaleX:1,scaleY:1,x:863.7,y:507.9}},{t:this.shape_212,p:{scaleX:1,scaleY:1,x:938.95,y:507.9}},{t:this.shape_211,p:{scaleX:1,scaleY:1,x:938.95,y:507.9}},{t:this.shape_210,p:{scaleX:1,scaleY:1,x:1014.2,y:507.9}},{t:this.shape_209,p:{scaleX:1,scaleY:1,x:1014.2,y:507.9}},{t:this.shape_208,p:{scaleX:1,scaleY:1,x:1089.45,y:507.9}},{t:this.shape_207,p:{scaleX:1,scaleY:1,x:1089.45,y:507.9}},{t:this.shape_206,p:{scaleX:1,scaleY:1,x:1164.7,y:507.9}},{t:this.shape_205,p:{scaleX:1,scaleY:1,x:1164.7,y:507.9}},{t:this.shape_204,p:{scaleX:1,scaleY:1,x:1239.95,y:507.9}},{t:this.shape_203,p:{scaleX:1,scaleY:1,x:1239.95,y:507.9}},{t:this.shape_202,p:{scaleX:1,scaleY:1,x:1315.175,y:507.9}},{t:this.shape_201,p:{scaleX:1,scaleY:1,x:1315.175,y:507.9}},{t:this.shape_200,p:{scaleX:1,scaleY:1,x:13.2,y:542.1}},{t:this.shape_199,p:{scaleX:1,scaleY:1,x:13.2,y:542.1}},{t:this.shape_198,p:{scaleX:1,scaleY:1,x:101.525,y:542.1}},{t:this.shape_197,p:{scaleX:1,scaleY:1,x:101.525,y:542.1}},{t:this.shape_196,p:{scaleX:1,scaleY:1,x:189.825,y:542.1}},{t:this.shape_195,p:{scaleX:1,scaleY:1,x:189.825,y:542.1}},{t:this.shape_194,p:{scaleX:1,scaleY:1,x:278.15,y:542.1}},{t:this.shape_193,p:{scaleX:1,scaleY:1,x:278.15,y:542.1}},{t:this.shape_192,p:{scaleX:1,scaleY:1,x:454.775,y:542.1}},{t:this.shape_191,p:{scaleX:1,scaleY:1,x:454.775,y:542.1}},{t:this.shape_190,p:{scaleX:1,scaleY:1,x:543.125,y:542.1}},{t:this.shape_189,p:{scaleX:1,scaleY:1,x:543.125,y:542.1}},{t:this.shape_188,p:{scaleX:1,scaleY:1,x:803.5856,y:494.1084}},{t:this.shape_187,p:{scaleX:1,scaleY:1,x:803.905,y:515.6125}},{t:this.shape_186,p:{scaleX:1,scaleY:1,x:631.425,y:542.1}},{t:this.shape_185,p:{scaleX:1,scaleY:1,x:631.425,y:542.1}},{t:this.shape_184,p:{scaleX:1,scaleY:1,x:627.7625,y:550.2875}},{t:this.shape_183,p:{scaleX:1,scaleY:1,x:627.7625,y:557.4125}},{t:this.shape_182,p:{scaleX:1,scaleY:1,x:626.4727,y:518.5776}},{t:this.shape_181,p:{scaleX:1,scaleY:1,x:628.75,y:517.9743}},{t:this.shape_180,p:{scaleX:1,scaleY:1,x:719.775,y:542.1}},{t:this.shape_179,p:{scaleX:1,scaleY:1,x:719.775,y:542.1}},{t:this.shape_178,p:{scaleX:1,scaleY:1,x:808.075,y:542.1}},{t:this.shape_177,p:{scaleX:1,scaleY:1,x:808.075,y:542.1}},{t:this.shape_176,p:{scaleX:1,scaleY:1,x:984.725,y:542.1}},{t:this.shape_175,p:{scaleX:1,scaleY:1,x:984.725,y:542.1}},{t:this.shape_174,p:{scaleX:1,scaleY:1,x:1073.025,y:542.1}},{t:this.shape_173,p:{scaleX:1,scaleY:1,x:1073.025,y:542.1}},{t:this.shape_172,p:{scaleX:1,scaleY:1,x:1161.375,y:542.1}},{t:this.shape_171,p:{scaleX:1,scaleY:1,x:1161.375,y:542.1}},{t:this.shape_170,p:{scaleX:1,scaleY:1,x:1249.675,y:542.1}},{t:this.shape_169,p:{scaleX:1,scaleY:1,x:1249.675,y:542.1}},{t:this.shape_168,p:{scaleX:1,scaleY:1,x:1338.025,y:542.1}},{t:this.shape_167,p:{scaleX:1,scaleY:1,x:1338.025,y:542.1}},{t:this.shape_166,p:{scaleX:1,scaleY:1,x:18.05,y:580.675}},{t:this.shape_165,p:{scaleX:1,scaleY:1,x:18.05,y:580.675}},{t:this.shape_164,p:{scaleX:1,scaleY:1,x:119.175,y:580.675}},{t:this.shape_163,p:{scaleX:1,scaleY:1,x:119.175,y:580.675}},{t:this.shape_162,p:{scaleX:1,scaleY:1,x:220.375,y:580.675}},{t:this.shape_161,p:{scaleX:1,scaleY:1,x:220.375,y:580.675}},{t:this.shape_160,p:{scaleX:1,scaleY:1,x:169.9844,y:552.8653}},{t:this.shape_159,p:{scaleX:1,scaleY:1,x:171.08,y:592.725}},{t:this.shape_158,p:{scaleX:1,scaleY:1,x:171.08,y:598.5}},{t:this.shape_157,p:{scaleX:1,scaleY:1,x:625.025,y:580.675}},{t:this.shape_156,p:{scaleX:1,scaleY:1,x:625.025,y:580.675}},{t:this.shape_155,p:{scaleX:1,scaleY:1,x:726.175,y:580.675}},{t:this.shape_154,p:{scaleX:1,scaleY:1,x:726.175,y:580.675}},{t:this.shape_153,p:{scaleX:1,scaleY:1,x:1029.675,y:580.675}},{t:this.shape_152,p:{scaleX:1,scaleY:1,x:1029.675,y:580.675}},{t:this.shape_151,p:{scaleX:1,scaleY:1,x:1231.975,y:580.675}},{t:this.shape_150,p:{scaleX:1,scaleY:1,x:1231.975,y:580.675}},{t:this.shape_149,p:{scaleX:1,scaleY:1,x:1333.175,y:580.675}},{t:this.shape_148,p:{scaleX:1,scaleY:1,x:1333.175,y:580.675}},{t:this.shape_147,p:{scaleX:1,scaleY:1,x:56.575,y:622.275}},{t:this.shape_146,p:{scaleX:1,scaleY:1,x:56.575,y:622.275}},{t:this.shape_145,p:{scaleX:1,scaleY:1,x:169.125,y:622.275}},{t:this.shape_144,p:{scaleX:1,scaleY:1,x:169.125,y:622.275}},{t:this.shape_143,p:{scaleX:1,scaleY:1,x:619.325,y:622.275}},{t:this.shape_142,p:{scaleX:1,scaleY:1,x:619.325,y:622.275}},{t:this.shape_141,p:{scaleX:1,scaleY:1,x:1294.625,y:622.275}},{t:this.shape_140,p:{scaleX:1,scaleY:1,x:1294.625,y:622.275}},{t:this.shape_139,p:{scaleX:1,scaleY:1,x:1407.175,y:622.275}},{t:this.shape_138,p:{scaleX:1,scaleY:1,x:1407.175,y:622.275}},{t:this.shape_137,p:{scaleX:1,scaleY:1,x:-51,y:671.2}},{t:this.shape_136,p:{scaleX:1,scaleY:1,x:-51,y:671.2}},{t:this.shape_135,p:{scaleX:1,scaleY:1,x:81.075,y:671.2}},{t:this.shape_134,p:{scaleX:1,scaleY:1,x:81.075,y:671.2}},{t:this.shape_133,p:{scaleX:1,scaleY:1,x:1402.225,y:671.2}},{t:this.shape_132,p:{scaleX:1,scaleY:1,x:1402.225,y:671.2}},{t:this.shape_131,p:{scaleX:1,scaleY:1,x:-5.325,y:728.9}},{t:this.shape_130,p:{scaleX:1,scaleY:1,x:-5.325,y:728.9}},{t:this.shape_129,p:{scaleX:1,scaleY:1,x:366.2223,y:493.0023}},{t:this.shape_128,p:{scaleX:1,scaleY:1,x:366.42,y:516.225}},{t:this.shape_127,p:{scaleX:1,scaleY:1,x:367.425,y:502.5821}},{t:this.shape_126,p:{scaleX:1,scaleY:1,x:366.85,y:489.6257}},{t:this.shape_125,p:{scaleX:1,scaleY:1,x:377.5327,y:490.921}},{t:this.shape_124,p:{scaleX:1,scaleY:1,x:356.1717,y:490.921}},{t:this.shape_123,p:{scaleX:1,scaleY:1,x:366.3545,y:482.5401}},{t:this.shape_122,p:{scaleX:1,scaleY:1,x:366.475,y:542.1}},{t:this.shape_121,p:{scaleX:1,scaleY:1,x:366.475,y:542.1}},{t:this.shape_120,p:{scaleX:1,scaleY:1,x:321.525,y:580.675}},{t:this.shape_119,p:{scaleX:1,scaleY:1,x:321.525,y:580.675}},{t:this.shape_118,p:{scaleX:1,scaleY:1,x:422.675,y:580.675}},{t:this.shape_117,p:{scaleX:1,scaleY:1,x:422.675,y:580.675}},{t:this.shape_116,p:{scaleX:1,scaleY:1,x:394.3938,y:591.8125}},{t:this.shape_115,p:{scaleX:1,scaleY:1,x:394.3938,y:600.4125}},{t:this.shape_114,p:{scaleX:1,scaleY:1,x:392.8427,y:553.4663}},{t:this.shape_113,p:{scaleX:1,scaleY:1,x:396.45,y:559.8244}},{t:this.shape_112,p:{scaleX:1,scaleY:1,x:394.225,y:622.275}},{t:this.shape_111,p:{scaleX:1,scaleY:1,x:394.225,y:622.275}},{t:this.shape_110,p:{scaleX:1,scaleY:1,x:1130.825,y:580.675}},{t:this.shape_109,p:{scaleX:1,scaleY:1,x:1130.825,y:580.675}},{t:this.shape_108,p:{scaleX:1,scaleY:1,x:1069.525,y:622.275}},{t:this.shape_107,p:{scaleX:1,scaleY:1,x:1069.525,y:622.275}},{t:this.shape_106,p:{scaleX:1,scaleY:1,x:1182.075,y:622.275}},{t:this.shape_105,p:{scaleX:1,scaleY:1,x:1182.075,y:622.275}},{t:this.shape_104,p:{scaleX:1,scaleY:1,x:1137.975,y:671.2}},{t:this.shape_103,p:{scaleX:1,scaleY:1,x:1137.975,y:671.2}},{t:this.shape_102,p:{scaleX:1,scaleY:1,x:1270.125,y:671.2}},{t:this.shape_101,p:{scaleX:1,scaleY:1,x:1270.125,y:671.2}},{t:this.shape_100,p:{scaleX:1,scaleY:1,x:1205.225,y:728.9}},{t:this.shape_99,p:{scaleX:1,scaleY:1,x:1205.225,y:728.9}},{t:this.shape_98,p:{scaleX:1,scaleY:1,x:1356.55,y:728.9}},{t:this.shape_97,p:{scaleX:1,scaleY:1,x:1356.55,y:728.9}},{t:this.shape_96,p:{scaleX:1,scaleY:1,x:524.0703,y:518.7249}},{t:this.shape_95,p:{scaleX:1,scaleY:1,x:525.1125,y:550.2875}},{t:this.shape_94,p:{scaleX:1,scaleY:1,x:525.1125,y:557.4125}},{t:this.shape_93,p:{scaleX:1,scaleY:1,x:523.875,y:580.675}},{t:this.shape_92,p:{scaleX:1,scaleY:1,x:523.875,y:580.675}},{t:this.shape_91,p:{scaleX:1,scaleY:1,x:506.775,y:622.275}},{t:this.shape_90,p:{scaleX:1,scaleY:1,x:506.775,y:622.275}},{t:this.shape_89,p:{scaleX:1,scaleY:1,x:609.9463,y:588.1093}},{t:this.shape_88,p:{scaleX:1,scaleY:1,x:609.505,y:635.4625}},{t:this.shape_87,p:{scaleX:1,scaleY:1,x:607.975,y:615.4872}},{t:this.shape_86,p:{scaleX:1,scaleY:1,x:608.825,y:596.4967}},{t:this.shape_85,p:{scaleX:1,scaleY:1,x:593.1882,y:598.3912}},{t:this.shape_84,p:{scaleX:1,scaleY:1,x:624.474,y:598.3912}},{t:this.shape_83,p:{scaleX:1,scaleY:1,x:611.2728,y:584.2604}},{t:this.shape_82,p:{scaleX:1,scaleY:1,x:477.9,y:619.3574}},{t:this.shape_81,p:{scaleX:1,scaleY:1,x:477.175,y:587.0269}},{t:this.shape_80,p:{scaleX:1,scaleY:1,x:477.088,y:581.1075}},{t:this.shape_79,p:{scaleX:1,scaleY:1,x:477.425,y:671.2}},{t:this.shape_78,p:{scaleX:1,scaleY:1,x:477.425,y:671.2}},{t:this.shape_77,p:{scaleX:1,scaleY:1,x:609.525,y:671.2}},{t:this.shape_76,p:{scaleX:1,scaleY:1,x:609.525,y:671.2}},{t:this.shape_75,p:{scaleX:1,scaleY:1,x:599.95,y:728.9}},{t:this.shape_74,p:{scaleX:1,scaleY:1,x:599.95,y:728.9}},{t:this.shape_73,p:{scaleX:1,scaleY:1,x:281.2539,y:552.7785}},{t:this.shape_72,p:{scaleX:1,scaleY:1,x:281.675,y:585.25}},{t:this.shape_71,p:{scaleX:1,scaleY:1,x:281.675,y:622.275}},{t:this.shape_70,p:{scaleX:1,scaleY:1,x:281.675,y:622.275}},{t:this.shape_69,p:{scaleX:1,scaleY:1,x:345.325,y:671.2}},{t:this.shape_68,p:{scaleX:1,scaleY:1,x:345.325,y:671.2}},{t:this.shape_67,p:{scaleX:1,scaleY:1,x:213.225,y:671.2}},{t:this.shape_66,p:{scaleX:1,scaleY:1,x:213.225,y:671.2}},{t:this.shape_65,p:{scaleX:1,scaleY:1,x:145.975,y:728.9}},{t:this.shape_64,p:{scaleX:1,scaleY:1,x:145.975,y:728.9}},{t:this.shape_63,p:{scaleX:1,scaleY:1,x:297.3,y:728.9}},{t:this.shape_62,p:{scaleX:1,scaleY:1,x:297.3,y:728.9}},{t:this.shape_61,p:{scaleX:1,scaleY:1,x:896.3611,y:485.795}},{t:this.shape_60,p:{scaleX:1,scaleY:1,x:896.0625,y:517.2625}},{t:this.shape_59,p:{scaleX:1,scaleY:1,x:895.05,y:504.0086}},{t:this.shape_58,p:{scaleX:1,scaleY:1,x:895.6,y:491.3639}},{t:this.shape_57,p:{scaleX:1,scaleY:1,x:885.2295,y:492.6209}},{t:this.shape_56,p:{scaleX:1,scaleY:1,x:906.0205,y:492.6209}},{t:this.shape_55,p:{scaleX:1,scaleY:1,x:897.2491,y:483.2255}},{t:this.shape_54,p:{scaleX:1,scaleY:1,x:896.4,y:542.1}},{t:this.shape_53,p:{scaleX:1,scaleY:1,x:896.4,y:542.1}},{t:this.shape_52,p:{scaleX:1,scaleY:1,x:827.325,y:580.675}},{t:this.shape_51,p:{scaleX:1,scaleY:1,x:827.325,y:580.675}},{t:this.shape_50,p:{scaleX:1,scaleY:1,x:928.525,y:580.675}},{t:this.shape_49,p:{scaleX:1,scaleY:1,x:928.525,y:580.675}},{t:this.shape_48,p:{scaleX:1,scaleY:1,x:956.975,y:622.275}},{t:this.shape_47,p:{scaleX:1,scaleY:1,x:956.975,y:622.275}},{t:this.shape_46,p:{scaleX:1,scaleY:1,x:1006.725,y:627.5693}},{t:this.shape_45,p:{scaleX:1,scaleY:1,x:1005.8688,y:646.3818}},{t:this.shape_44,p:{scaleX:1,scaleY:1,x:1004.225,y:615.7455}},{t:this.shape_43,p:{scaleX:1,scaleY:1,x:1005.0747,y:595.75}},{t:this.shape_42,p:{scaleX:1,scaleY:1,x:988.6432,y:597.7907}},{t:this.shape_41,p:{scaleX:1,scaleY:1,x:1021.5313,y:597.7407}},{t:this.shape_40,p:{scaleX:1,scaleY:1,x:1005.0636,y:582.4317}},{t:this.shape_39,p:{scaleX:1,scaleY:1,x:1011.1292,y:598.1531}},{t:this.shape_38,p:{scaleX:1,scaleY:1,x:999.275,y:597.9031}},{t:this.shape_37,p:{scaleX:1,scaleY:1,x:1004.65,y:605.2682}},{t:this.shape_36,p:{scaleX:1,scaleY:1,x:1004.525,y:599.475}},{t:this.shape_35,p:{scaleX:1,scaleY:1,x:1004.975,y:565.2}},{t:this.shape_34,p:{scaleX:1,scaleY:1,x:1005.875,y:671.2}},{t:this.shape_33,p:{scaleX:1,scaleY:1,x:1005.875,y:671.2}},{t:this.shape_32,p:{scaleX:1,scaleY:1,x:1053.9,y:728.9}},{t:this.shape_31,p:{scaleX:1,scaleY:1,x:1053.9,y:728.9}},{t:this.shape_30,p:{scaleX:1,scaleY:1,x:836.4868,y:555.625}},{t:this.shape_29,p:{scaleX:1,scaleY:1,x:836.28,y:580.9}},{t:this.shape_28,p:{scaleX:1,scaleY:1,x:835.15,y:566.0742}},{t:this.shape_27,p:{scaleX:1,scaleY:1,x:835.775,y:551.9515}},{t:this.shape_26,p:{scaleX:1,scaleY:1,x:824.1679,y:553.3654}},{t:this.shape_25,p:{scaleX:1,scaleY:1,x:847.3905,y:553.3654}},{t:this.shape_24,p:{scaleX:1,scaleY:1,x:836.33,y:544.2515}},{t:this.shape_23,p:{scaleX:1,scaleY:1,x:729.6964,y:556.8954}},{t:this.shape_22,p:{scaleX:1,scaleY:1,x:730.07,y:580.9}},{t:this.shape_21,p:{scaleX:1,scaleY:1,x:731.2,y:566.0742}},{t:this.shape_20,p:{scaleX:1,scaleY:1,x:730.575,y:551.9515}},{t:this.shape_19,p:{scaleX:1,scaleY:1,x:742.1776,y:553.3654}},{t:this.shape_18,p:{scaleX:1,scaleY:1,x:718.9474,y:553.3654}},{t:this.shape_17,p:{scaleX:1,scaleY:1,x:730.02,y:544.2515}},{t:this.shape_16,p:{scaleX:1,scaleY:1,x:729.8752,y:549.6111}},{t:this.shape_15,p:{scaleX:1,scaleY:1,x:844.425,y:622.275}},{t:this.shape_14,p:{scaleX:1,scaleY:1,x:844.425,y:622.275}},{t:this.shape_13,p:{scaleX:1,scaleY:1,x:873.775,y:671.2}},{t:this.shape_12,p:{scaleX:1,scaleY:1,x:873.775,y:671.2}},{t:this.shape_11,p:{scaleX:1,scaleY:1,x:901.5288,y:644.375}},{t:this.shape_10,p:{scaleX:1,scaleY:1,x:902.585,y:682.1625}},{t:this.shape_9,p:{scaleX:1,scaleY:1,x:902.575,y:728.9}},{t:this.shape_8,p:{scaleX:1,scaleY:1,x:902.575,y:728.9}},{t:this.shape_7,p:{scaleX:1,scaleY:1,x:448.6,y:728.9}},{t:this.shape_6,p:{scaleX:1,scaleY:1,x:448.6,y:728.9}},{t:this.shape_5,p:{scaleX:1,scaleY:1,x:731.875,y:622.275}},{t:this.shape_4,p:{scaleX:1,scaleY:1,x:731.875,y:622.275}},{t:this.shape_3,p:{scaleX:1,scaleY:1,x:741.675,y:671.2}},{t:this.shape_2,p:{scaleX:1,scaleY:1,x:741.675,y:671.2}},{t:this.shape_1,p:{scaleX:1,scaleY:1,x:751.25,y:728.9}},{t:this.shape,p:{scaleX:1,scaleY:1,x:751.25,y:728.9}}]}).to({state:[]},80).to({state:[{t:this.shape_236,p:{scaleX:1.7992,scaleY:1.7992,x:-475.2268,y:872.1481}},{t:this.shape_235,p:{scaleX:1.7992,scaleY:1.7992,x:-475.2268,y:872.1481}},{t:this.shape_234,p:{scaleX:1.7992,scaleY:1.7992,x:-339.834,y:872.1481}},{t:this.shape_233,p:{scaleX:1.7992,scaleY:1.7992,x:-339.834,y:872.1481}},{t:this.shape_232,p:{scaleX:1.7992,scaleY:1.7992,x:-204.4411,y:872.1481}},{t:this.shape_231,p:{scaleX:1.7992,scaleY:1.7992,x:-204.4411,y:872.1481}},{t:this.shape_230,p:{scaleX:1.7992,scaleY:1.7992,x:-69.0483,y:872.1481}},{t:this.shape_229,p:{scaleX:1.7992,scaleY:1.7992,x:-69.0483,y:872.1481}},{t:this.shape_228,p:{scaleX:1.7992,scaleY:1.7992,x:66.3445,y:872.1481}},{t:this.shape_227,p:{scaleX:1.7992,scaleY:1.7992,x:66.3445,y:872.1481}},{t:this.shape_226,p:{scaleX:1.7992,scaleY:1.7992,x:201.7373,y:872.1481}},{t:this.shape_225,p:{scaleX:1.7992,scaleY:1.7992,x:201.7373,y:872.1481}},{t:this.shape_224,p:{scaleX:1.7992,scaleY:1.7992,x:337.1301,y:872.1481}},{t:this.shape_223,p:{scaleX:1.7992,scaleY:1.7992,x:337.1301,y:872.1481}},{t:this.shape_222,p:{scaleX:1.7992,scaleY:1.7992,x:472.5229,y:872.1481}},{t:this.shape_221,p:{scaleX:1.7992,scaleY:1.7992,x:472.5229,y:872.1481}},{t:this.shape_220,p:{scaleX:1.7992,scaleY:1.7992,x:607.8708,y:872.1481}},{t:this.shape_219,p:{scaleX:1.7992,scaleY:1.7992,x:607.8708,y:872.1481}},{t:this.shape_218,p:{scaleX:1.7992,scaleY:1.7992,x:743.2186,y:872.1481}},{t:this.shape_217,p:{scaleX:1.7992,scaleY:1.7992,x:743.2186,y:872.1481}},{t:this.shape_216,p:{scaleX:1.7992,scaleY:1.7992,x:878.6114,y:872.1481}},{t:this.shape_215,p:{scaleX:1.7992,scaleY:1.7992,x:878.6114,y:872.1481}},{t:this.shape_214,p:{scaleX:1.7992,scaleY:1.7992,x:1014.0043,y:872.1481}},{t:this.shape_213,p:{scaleX:1.7992,scaleY:1.7992,x:1014.0043,y:872.1481}},{t:this.shape_212,p:{scaleX:1.7992,scaleY:1.7992,x:1149.3971,y:872.1481}},{t:this.shape_211,p:{scaleX:1.7992,scaleY:1.7992,x:1149.3971,y:872.1481}},{t:this.shape_210,p:{scaleX:1.7992,scaleY:1.7992,x:1284.7899,y:872.1481}},{t:this.shape_209,p:{scaleX:1.7992,scaleY:1.7992,x:1284.7899,y:872.1481}},{t:this.shape_208,p:{scaleX:1.7992,scaleY:1.7992,x:1420.1827,y:872.1481}},{t:this.shape_207,p:{scaleX:1.7992,scaleY:1.7992,x:1420.1827,y:872.1481}},{t:this.shape_206,p:{scaleX:1.7992,scaleY:1.7992,x:1555.5755,y:872.1481}},{t:this.shape_205,p:{scaleX:1.7992,scaleY:1.7992,x:1555.5755,y:872.1481}},{t:this.shape_204,p:{scaleX:1.7992,scaleY:1.7992,x:1690.9683,y:872.1481}},{t:this.shape_203,p:{scaleX:1.7992,scaleY:1.7992,x:1690.9683,y:872.1481}},{t:this.shape_202,p:{scaleX:1.7992,scaleY:1.7992,x:1826.3162,y:872.1481}},{t:this.shape_201,p:{scaleX:1.7992,scaleY:1.7992,x:1826.3162,y:872.1481}},{t:this.shape_200,p:{scaleX:1.7992,scaleY:1.7992,x:-516.2495,y:933.6821}},{t:this.shape_199,p:{scaleX:1.7992,scaleY:1.7992,x:-516.2495,y:933.6821}},{t:this.shape_198,p:{scaleX:1.7992,scaleY:1.7992,x:-357.3316,y:933.6821}},{t:this.shape_197,p:{scaleX:1.7992,scaleY:1.7992,x:-357.3316,y:933.6821}},{t:this.shape_196,p:{scaleX:1.7992,scaleY:1.7992,x:-198.4587,y:933.6821}},{t:this.shape_195,p:{scaleX:1.7992,scaleY:1.7992,x:-198.4587,y:933.6821}},{t:this.shape_194,p:{scaleX:1.7992,scaleY:1.7992,x:-39.5408,y:933.6821}},{t:this.shape_193,p:{scaleX:1.7992,scaleY:1.7992,x:-39.5408,y:933.6821}},{t:this.shape_192,p:{scaleX:1.7992,scaleY:1.7992,x:278.25,y:933.6821}},{t:this.shape_191,p:{scaleX:1.7992,scaleY:1.7992,x:278.25,y:933.6821}},{t:this.shape_190,p:{scaleX:1.7992,scaleY:1.7992,x:437.2129,y:933.6821}},{t:this.shape_189,p:{scaleX:1.7992,scaleY:1.7992,x:437.2129,y:933.6821}},{t:this.shape_188,p:{scaleX:1.7987,scaleY:1.7987,x:905.4031,y:846.8411}},{t:this.shape_187,p:{scaleX:1.7987,scaleY:1.7987,x:905.9775,y:885.5203}},{t:this.shape_186,p:{scaleX:1.7992,scaleY:1.7992,x:596.0858,y:933.6821}},{t:this.shape_185,p:{scaleX:1.7992,scaleY:1.7992,x:596.0858,y:933.6821}},{t:this.shape_184,p:{scaleX:1.7982,scaleY:1.7982,x:588.8742,y:947.4682}},{t:this.shape_183,p:{scaleX:1.7982,scaleY:1.7982,x:588.8742,y:960.2808}},{t:this.shape_182,p:{scaleX:1.7987,scaleY:1.7987,x:586.8317,y:890.8535}},{t:this.shape_181,p:{scaleX:1.7987,scaleY:1.7987,x:590.9278,y:889.7685}},{t:this.shape_180,p:{scaleX:1.7992,scaleY:1.7992,x:755.0486,y:933.6821}},{t:this.shape_179,p:{scaleX:1.7992,scaleY:1.7992,x:755.0486,y:933.6821}},{t:this.shape_178,p:{scaleX:1.7992,scaleY:1.7992,x:913.9215,y:933.6821}},{t:this.shape_177,p:{scaleX:1.7992,scaleY:1.7992,x:913.9215,y:933.6821}},{t:this.shape_176,p:{scaleX:1.7992,scaleY:1.7992,x:1231.7573,y:933.6821}},{t:this.shape_175,p:{scaleX:1.7992,scaleY:1.7992,x:1231.7573,y:933.6821}},{t:this.shape_174,p:{scaleX:1.7992,scaleY:1.7992,x:1390.6302,y:933.6821}},{t:this.shape_173,p:{scaleX:1.7992,scaleY:1.7992,x:1390.6302,y:933.6821}},{t:this.shape_172,p:{scaleX:1.7992,scaleY:1.7992,x:1549.5931,y:933.6821}},{t:this.shape_171,p:{scaleX:1.7992,scaleY:1.7992,x:1549.5931,y:933.6821}},{t:this.shape_170,p:{scaleX:1.7992,scaleY:1.7992,x:1708.466,y:933.6821}},{t:this.shape_169,p:{scaleX:1.7992,scaleY:1.7992,x:1708.466,y:933.6821}},{t:this.shape_168,p:{scaleX:1.7992,scaleY:1.7992,x:1867.4288,y:933.6821}},{t:this.shape_167,p:{scaleX:1.7992,scaleY:1.7992,x:1867.4288,y:933.6821}},{t:this.shape_166,p:{scaleX:1.7992,scaleY:1.7992,x:-507.5231,y:1003.0878}},{t:this.shape_165,p:{scaleX:1.7992,scaleY:1.7992,x:-507.5231,y:1003.0878}},{t:this.shape_164,p:{scaleX:1.7992,scaleY:1.7992,x:-325.575,y:1003.0878}},{t:this.shape_163,p:{scaleX:1.7992,scaleY:1.7992,x:-325.575,y:1003.0878}},{t:this.shape_162,p:{scaleX:1.7992,scaleY:1.7992,x:-143.4919,y:1003.0878}},{t:this.shape_161,p:{scaleX:1.7992,scaleY:1.7992,x:-143.4919,y:1003.0878}},{t:this.shape_160,p:{scaleX:1.7987,scaleY:1.7987,x:-234.2496,y:952.5265}},{t:this.shape_159,p:{scaleX:1.7982,scaleY:1.7982,x:-232.3544,y:1023.7814}},{t:this.shape_158,p:{scaleX:1.7982,scaleY:1.7982,x:-232.3544,y:1034.1663}},{t:this.shape_157,p:{scaleX:1.7992,scaleY:1.7992,x:584.5706,y:1003.0878}},{t:this.shape_156,p:{scaleX:1.7992,scaleY:1.7992,x:584.5706,y:1003.0878}},{t:this.shape_155,p:{scaleX:1.7992,scaleY:1.7992,x:766.5638,y:1003.0878}},{t:this.shape_154,p:{scaleX:1.7992,scaleY:1.7992,x:766.5638,y:1003.0878}},{t:this.shape_153,p:{scaleX:1.7992,scaleY:1.7992,x:1312.6331,y:1003.0878}},{t:this.shape_152,p:{scaleX:1.7992,scaleY:1.7992,x:1312.6331,y:1003.0878}},{t:this.shape_151,p:{scaleX:1.7992,scaleY:1.7992,x:1676.6194,y:1003.0878}},{t:this.shape_150,p:{scaleX:1.7992,scaleY:1.7992,x:1676.6194,y:1003.0878}},{t:this.shape_149,p:{scaleX:1.7992,scaleY:1.7992,x:1858.7025,y:1003.0878}},{t:this.shape_148,p:{scaleX:1.7992,scaleY:1.7992,x:1858.7025,y:1003.0878}},{t:this.shape_238},{t:this.shape_237},{t:this.shape_147,p:{scaleX:1.7992,scaleY:1.7992,x:-235.7029,y:1077.9362}},{t:this.shape_146,p:{scaleX:1.7992,scaleY:1.7992,x:-235.7029,y:1077.9362}},{t:this.shape_145,p:{scaleX:1.7992,scaleY:1.7992,x:574.315,y:1077.9362}},{t:this.shape_144,p:{scaleX:1.7992,scaleY:1.7992,x:574.315,y:1077.9362}},{t:this.shape_141,p:{scaleX:1.7992,scaleY:1.7992,x:1789.3418,y:1077.9362}},{t:this.shape_140,p:{scaleX:1.7992,scaleY:1.7992,x:1789.3418,y:1077.9362}},{t:this.shape_139,p:{scaleX:1.7992,scaleY:1.7992,x:1991.8463,y:1077.9362}},{t:this.shape_138,p:{scaleX:1.7992,scaleY:1.7992,x:1991.8463,y:1077.9362}},{t:this.shape_143,p:{scaleX:1.7992,scaleY:1.7992,x:-643.2074,y:1077.7362}},{t:this.shape_142,p:{scaleX:1.7992,scaleY:1.7992,x:-643.2074,y:1077.7362}},{t:this.shape_137,p:{scaleX:1.7992,scaleY:1.7992,x:-631.7607,y:1165.964}},{t:this.shape_136,p:{scaleX:1.7992,scaleY:1.7992,x:-631.7607,y:1165.964}},{t:this.shape_135,p:{scaleX:1.7992,scaleY:1.7992,x:-394.126,y:1165.964}},{t:this.shape_134,p:{scaleX:1.7992,scaleY:1.7992,x:-394.126,y:1165.964}},{t:this.shape_133,p:{scaleX:1.7992,scaleY:1.7992,x:1982.94,y:1165.964}},{t:this.shape_132,p:{scaleX:1.7992,scaleY:1.7992,x:1982.94,y:1165.964}},{t:this.shape_131,p:{scaleX:1.7992,scaleY:1.7992,x:-549.5804,y:1269.7801}},{t:this.shape_130,p:{scaleX:1.7992,scaleY:1.7992,x:-549.5804,y:1269.7801}},{t:this.shape_129,p:{scaleX:1.7987,scaleY:1.7987,x:118.7217,y:844.8516}},{t:this.shape_128,p:{scaleX:1.7976,scaleY:1.7976,x:118.6811,y:885.6265}},{t:this.shape_127,p:{scaleX:1.7976,scaleY:1.7976,x:120.4877,y:861.1018}},{t:this.shape_126,p:{scaleX:1.7982,scaleY:1.7982,x:119.6887,y:838.3833}},{t:this.shape_125,p:{scaleX:1.7976,scaleY:1.7976,x:138.6574,y:840.1398}},{t:this.shape_124,p:{scaleX:1.7976,scaleY:1.7976,x:100.2587,y:840.1398}},{t:this.shape_123,p:{scaleX:1.7982,scaleY:1.7982,x:118.7977,y:825.6415}},{t:this.shape_122,p:{scaleX:1.7992,scaleY:1.7992,x:119.3771,y:933.6821}},{t:this.shape_121,p:{scaleX:1.7992,scaleY:1.7992,x:119.3771,y:933.6821}},{t:this.shape_120,p:{scaleX:1.7992,scaleY:1.7992,x:38.5012,y:1003.0878}},{t:this.shape_119,p:{scaleX:1.7992,scaleY:1.7992,x:38.5012,y:1003.0878}},{t:this.shape_118,p:{scaleX:1.7992,scaleY:1.7992,x:220.4944,y:1003.0878}},{t:this.shape_117,p:{scaleX:1.7992,scaleY:1.7992,x:220.4944,y:1003.0878}},{t:this.shape_116,p:{scaleX:1.7982,scaleY:1.7982,x:169.2192,y:1022.1405}},{t:this.shape_115,p:{scaleX:1.7982,scaleY:1.7982,x:169.2192,y:1037.6054}},{t:this.shape_114,p:{scaleX:1.7987,scaleY:1.7987,x:166.6036,y:953.6076}},{t:this.shape_113,p:{scaleX:1.7987,scaleY:1.7987,x:173.092,y:965.0439}},{t:this.shape_112,p:{scaleX:1.7992,scaleY:1.7992,x:169.306,y:1077.9362}},{t:this.shape_111,p:{scaleX:1.7992,scaleY:1.7992,x:169.306,y:1077.9362}},{t:this.shape_110,p:{scaleX:1.7992,scaleY:1.7992,x:1494.6263,y:1003.0878}},{t:this.shape_109,p:{scaleX:1.7992,scaleY:1.7992,x:1494.6263,y:1003.0878}},{t:this.shape_108,p:{scaleX:1.7992,scaleY:1.7992,x:1384.3329,y:1077.9362}},{t:this.shape_107,p:{scaleX:1.7992,scaleY:1.7992,x:1384.3329,y:1077.9362}},{t:this.shape_106,p:{scaleX:1.7992,scaleY:1.7992,x:1586.8373,y:1077.9362}},{t:this.shape_105,p:{scaleX:1.7992,scaleY:1.7992,x:1586.8373,y:1077.9362}},{t:this.shape_104,p:{scaleX:1.7992,scaleY:1.7992,x:1507.4908,y:1165.964}},{t:this.shape_103,p:{scaleX:1.7992,scaleY:1.7992,x:1507.4908,y:1165.964}},{t:this.shape_102,p:{scaleX:1.7992,scaleY:1.7992,x:1745.2604,y:1165.964}},{t:this.shape_101,p:{scaleX:1.7992,scaleY:1.7992,x:1745.2604,y:1165.964}},{t:this.shape_100,p:{scaleX:1.7992,scaleY:1.7992,x:1628.4897,y:1269.7801}},{t:this.shape_99,p:{scaleX:1.7992,scaleY:1.7992,x:1628.4897,y:1269.7801}},{t:this.shape_98,p:{scaleX:1.7992,scaleY:1.7992,x:1900.7597,y:1269.7801}},{t:this.shape_97,p:{scaleX:1.7992,scaleY:1.7992,x:1900.7597,y:1269.7801}},{t:this.shape_96,p:{scaleX:1.7987,scaleY:1.7987,x:402.6413,y:891.1185}},{t:this.shape_95,p:{scaleX:1.7982,scaleY:1.7982,x:404.284,y:947.4682}},{t:this.shape_94,p:{scaleX:1.7982,scaleY:1.7982,x:404.284,y:960.2808}},{t:this.shape_93,p:{scaleX:1.7992,scaleY:1.7992,x:402.5775,y:1003.0878}},{t:this.shape_92,p:{scaleX:1.7992,scaleY:1.7992,x:402.5775,y:1003.0878}},{t:this.shape_91,p:{scaleX:1.7992,scaleY:1.7992,x:371.8105,y:1077.9362}},{t:this.shape_90,p:{scaleX:1.7992,scaleY:1.7992,x:371.8105,y:1077.9362}},{t:this.shape_89,p:{scaleX:1.7987,scaleY:1.7987,x:557.1057,y:1015.9195}},{t:this.shape_88,p:{scaleX:1.7982,scaleY:1.7982,x:556.0426,y:1100.634}},{t:this.shape_87,p:{scaleX:1.7982,scaleY:1.7982,x:553.2913,y:1064.7135}},{t:this.shape_86,p:{scaleX:1.7987,scaleY:1.7987,x:555.0889,y:1031.006}},{t:this.shape_85,p:{scaleX:1.7982,scaleY:1.7982,x:526.7009,y:1033.9706}},{t:this.shape_84,p:{scaleX:1.7982,scaleY:1.7982,x:582.9607,y:1033.9706}},{t:this.shape_83,p:{scaleX:1.7987,scaleY:1.7987,x:559.4917,y:1008.9966}},{t:this.shape_82,p:{scaleX:1.7987,scaleY:1.7987,x:319.5953,y:1072.1253}},{t:this.shape_81,p:{scaleX:1.7987,scaleY:1.7987,x:318.2913,y:1013.9727}},{t:this.shape_80,p:{scaleX:1.7987,scaleY:1.7987,x:318.1348,y:1003.3255}},{t:this.shape_79,p:{scaleX:1.7992,scaleY:1.7992,x:319.0028,y:1165.964}},{t:this.shape_78,p:{scaleX:1.7992,scaleY:1.7992,x:319.0028,y:1165.964}},{t:this.shape_77,p:{scaleX:1.7992,scaleY:1.7992,x:556.6824,y:1165.964}},{t:this.shape_76,p:{scaleX:1.7992,scaleY:1.7992,x:556.6824,y:1165.964}},{t:this.shape_75,p:{scaleX:1.7992,scaleY:1.7992,x:539.4547,y:1269.7801}},{t:this.shape_74,p:{scaleX:1.7992,scaleY:1.7992,x:539.4547,y:1269.7801}},{t:this.shape_73,p:{scaleX:1.7987,scaleY:1.7987,x:-34.1103,y:952.3704}},{t:this.shape_72,p:{scaleX:1.7982,scaleY:1.7982,x:-33.4771,y:1010.3395}},{t:this.shape_71,p:{scaleX:1.7992,scaleY:1.7992,x:-33.1985,y:1077.9362}},{t:this.shape_70,p:{scaleX:1.7992,scaleY:1.7992,x:-33.1985,y:1077.9362}},{t:this.shape_69,p:{scaleX:1.7992,scaleY:1.7992,x:81.3232,y:1165.964}},{t:this.shape_68,p:{scaleX:1.7992,scaleY:1.7992,x:81.3232,y:1165.964}},{t:this.shape_67,p:{scaleX:1.7992,scaleY:1.7992,x:-156.3565,y:1165.964}},{t:this.shape_66,p:{scaleX:1.7992,scaleY:1.7992,x:-156.3565,y:1165.964}},{t:this.shape_65,p:{scaleX:1.7992,scaleY:1.7992,x:-277.3553,y:1269.7801}},{t:this.shape_64,p:{scaleX:1.7992,scaleY:1.7992,x:-277.3553,y:1269.7801}},{t:this.shape_63,p:{scaleX:1.7992,scaleY:1.7992,x:-5.0853,y:1269.7801}},{t:this.shape_62,p:{scaleX:1.7992,scaleY:1.7992,x:-5.0853,y:1269.7801}},{t:this.shape_61,p:{scaleX:1.7987,scaleY:1.7987,x:1072.2775,y:831.8879}},{t:this.shape_60,p:{scaleX:1.7982,scaleY:1.7982,x:1071.3442,y:888.0811}},{t:this.shape_59,p:{scaleX:1.7982,scaleY:1.7982,x:1069.5234,y:864.2472}},{t:this.shape_58,p:{scaleX:1.7987,scaleY:1.7987,x:1070.9085,y:841.9046}},{t:this.shape_57,p:{scaleX:1.7982,scaleY:1.7982,x:1051.8637,y:843.7694}},{t:this.shape_56,p:{scaleX:1.7982,scaleY:1.7982,x:1089.2511,y:843.7694}},{t:this.shape_55,p:{scaleX:1.7987,scaleY:1.7987,x:1073.8747,y:827.266}},{t:this.shape_54,p:{scaleX:1.7992,scaleY:1.7992,x:1072.8394,y:933.6821}},{t:this.shape_53,p:{scaleX:1.7992,scaleY:1.7992,x:1072.8394,y:933.6821}},{t:this.shape_52,p:{scaleX:1.7992,scaleY:1.7992,x:948.5569,y:1003.0878}},{t:this.shape_51,p:{scaleX:1.7992,scaleY:1.7992,x:948.5569,y:1003.0878}},{t:this.shape_50,p:{scaleX:1.7992,scaleY:1.7992,x:1130.64,y:1003.0878}},{t:this.shape_49,p:{scaleX:1.7992,scaleY:1.7992,x:1130.64,y:1003.0878}},{t:this.shape_48,p:{scaleX:1.7992,scaleY:1.7992,x:1181.8284,y:1077.9362}},{t:this.shape_47,p:{scaleX:1.7992,scaleY:1.7992,x:1181.8284,y:1077.9362}},{t:this.shape_46,p:{scaleX:1.7982,scaleY:1.7982,x:1270.3428,y:1086.4401}},{t:this.shape_45,p:{scaleX:1.7982,scaleY:1.7982,x:1268.8031,y:1120.2696}},{t:this.shape_44,p:{scaleX:1.7982,scaleY:1.7982,x:1265.8472,y:1065.1779}},{t:this.shape_43,p:{scaleX:1.7987,scaleY:1.7987,x:1267.8195,y:1029.6629}},{t:this.shape_42,p:{scaleX:1.7982,scaleY:1.7982,x:1237.8273,y:1032.8908}},{t:this.shape_41,p:{scaleX:1.7982,scaleY:1.7982,x:1296.9682,y:1032.8009}},{t:this.shape_40,p:{scaleX:1.7987,scaleY:1.7987,x:1267.7996,y:1005.7074}},{t:this.shape_39,p:{scaleX:1.7982,scaleY:1.7982,x:1278.2626,y:1033.5425}},{t:this.shape_38,p:{scaleX:1.7982,scaleY:1.7982,x:1256.9459,y:1033.0929}},{t:this.shape_37,p:{scaleX:1.7976,scaleY:1.7976,x:1265.9681,y:1045.6912}},{t:this.shape_36,p:{scaleX:1.7976,scaleY:1.7976,x:1265.7434,y:1035.2773}},{t:this.shape_35,p:{scaleX:1.7987,scaleY:1.7987,x:1267.6403,y:974.7129}},{t:this.shape_34,p:{scaleX:1.7992,scaleY:1.7992,x:1269.8112,y:1165.964}},{t:this.shape_33,p:{scaleX:1.7992,scaleY:1.7992,x:1269.8112,y:1165.964}},{t:this.shape_32,p:{scaleX:1.7992,scaleY:1.7992,x:1356.2197,y:1269.7801}},{t:this.shape_31,p:{scaleX:1.7992,scaleY:1.7992,x:1356.2197,y:1269.7801}},{t:this.shape_30,p:{scaleX:1.7987,scaleY:1.7987,x:964.5822,y:957.4904}},{t:this.shape_29,p:{scaleX:1.7976,scaleY:1.7976,x:963.3049,y:1001.8868}},{t:this.shape_28,p:{scaleX:1.7976,scaleY:1.7976,x:961.2736,y:975.2358}},{t:this.shape_27,p:{scaleX:1.7982,scaleY:1.7982,x:962.9323,y:950.4605}},{t:this.shape_26,p:{scaleX:1.7976,scaleY:1.7976,x:941.5321,y:952.3904}},{t:this.shape_25,p:{scaleX:1.7976,scaleY:1.7976,x:983.2772,y:952.3904}},{t:this.shape_24,p:{scaleX:1.7982,scaleY:1.7982,x:963.9303,y:936.614}},{t:this.shape_23,p:{scaleX:1.7987,scaleY:1.7987,x:772.4992,y:959.7754}},{t:this.shape_22,p:{scaleX:1.7976,scaleY:1.7976,x:772.381,y:1001.8868}},{t:this.shape_21,p:{scaleX:1.7976,scaleY:1.7976,x:774.4123,y:975.2358}},{t:this.shape_20,p:{scaleX:1.7982,scaleY:1.7982,x:773.7566,y:950.4605}},{t:this.shape_19,p:{scaleX:1.7976,scaleY:1.7976,x:794.1458,y:952.3904}},{t:this.shape_18,p:{scaleX:1.7976,scaleY:1.7976,x:752.3869,y:952.3904}},{t:this.shape_17,p:{scaleX:1.7982,scaleY:1.7982,x:772.7586,y:936.614}},{t:this.shape_16,p:{scaleX:1.7987,scaleY:1.7987,x:772.8207,y:946.6733}},{t:this.shape_15,p:{scaleX:1.7992,scaleY:1.7992,x:979.3239,y:1077.9362}},{t:this.shape_14,p:{scaleX:1.7992,scaleY:1.7992,x:979.3239,y:1077.9362}},{t:this.shape_13,p:{scaleX:1.7992,scaleY:1.7992,x:1032.1316,y:1165.964}},{t:this.shape_12,p:{scaleX:1.7992,scaleY:1.7992,x:1032.1316,y:1165.964}},{t:this.shape_11,p:{scaleX:1.7987,scaleY:1.7987,x:1081.5725,y:1117.1242}},{t:this.shape_10,p:{scaleX:1.7987,scaleY:1.7987,x:1083.4723,y:1185.0923}},{t:this.shape_9,p:{scaleX:1.7992,scaleY:1.7992,x:1083.9497,y:1269.7801}},{t:this.shape_8,p:{scaleX:1.7992,scaleY:1.7992,x:1083.9497,y:1269.7801}},{t:this.shape_7,p:{scaleX:1.7992,scaleY:1.7992,x:267.1397,y:1269.7801}},{t:this.shape_6,p:{scaleX:1.7992,scaleY:1.7992,x:267.1397,y:1269.7801}},{t:this.shape_5,p:{scaleX:1.7992,scaleY:1.7992,x:776.8194,y:1077.9362}},{t:this.shape_4,p:{scaleX:1.7992,scaleY:1.7992,x:776.8194,y:1077.9362}},{t:this.shape_3,p:{scaleX:1.7992,scaleY:1.7992,x:794.452,y:1165.964}},{t:this.shape_2,p:{scaleX:1.7992,scaleY:1.7992,x:794.452,y:1165.964}},{t:this.shape_1,p:{scaleX:1.7992,scaleY:1.7992,x:811.6797,y:1269.7801}},{t:this.shape,p:{scaleX:1.7992,scaleY:1.7992,x:811.6797,y:1269.7801}}]},1474).wait(392));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Q2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Q2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#999999").s().p("A9/RHMAAAgiNMA7/AAAMAAAAiNg");
	this.shape.setTransform(875,355.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("A+JRCMAAAgiDMA8TAAAMAAAAiDg");
	this.shape_1.setTransform(876,355);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("A+ERCMAAAgiDMA8JAAAMAAAAiDg");
	this.shape_2.setTransform(876.5,355);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},6).to({state:[]},16).to({state:[{t:this.shape_1}]},6).to({state:[]},16).to({state:[{t:this.shape_2}]},6).to({state:[]},16).wait(15));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_pictures = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// pictures
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F0CA77").s().p("AirCrIAAlWIFXAAIAAFWg");
	this.shape.setTransform(376.15,115.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AjxDyIAAnjIHjAAIAAHjg");
	this.shape_1.setTransform(376.125,115.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CE7B4F").s().p("AkmEnIAApNIJNAAIAAJNg");
	this.shape_2.setTransform(376.125,115.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#5D999D").s().p("AjHDIIAAmPIGPAAIAAGPg");
	this.shape_3.setTransform(274.775,177.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("Al4F5IAArxILxAAIAALxg");
	this.shape_4.setTransform(274.775,177.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CE7B4F").s().p("AnLHNIAAuZIOXAAIAAOZg");
	this.shape_5.setTransform(274.75,178);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},85).wait(335));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_grayToPinkScreen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// grayToPinkScreen
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape.setTransform(683.475,247);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C9C9CA").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_1.setTransform(682.925,247.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C7C6C7").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_2.setTransform(682.825,247.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C4C4C5").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_3.setTransform(682.725,247.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C1C1C2").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_4.setTransform(682.675,247.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BFBEC0").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_5.setTransform(682.575,247.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#BCBBBD").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_6.setTransform(682.475,247.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#B9B8BB").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_7.setTransform(682.375,247.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#B7B6B9").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_8.setTransform(682.275,247.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#B4B3B6").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_9.setTransform(682.175,247.45);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#B1B0B4").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_10.setTransform(682.075,247.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#AEADB1").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_11.setTransform(681.975,247.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#ACAAAF").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_12.setTransform(681.925,247.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#A9A7AC").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_13.setTransform(681.825,247.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#A6A5AA").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_14.setTransform(681.725,247.15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#A4A2A7").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_15.setTransform(681.625,247.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#A19FA5").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_16.setTransform(681.525,247);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#F4E1DC").s().p("Eg8OAiEMAAAhEHMB4dAAAMAAABEHg");
	this.shape_17.setTransform(681.525,247);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F4E1DC").s().p("EhrZA8bMAAAh41MDW0AAAMAAAB41g");
	this.shape_18.setTransform(678.35,386.6);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F4E1DC").s().p("EhrZA8bMAAAh40MDWzAAAMAAAB40g");
	this.shape_19.setTransform(683,384);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape,p:{x:683.475,y:247}}]}).to({state:[{t:this.shape,p:{x:683.025,y:248}}]},66).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},3).to({state:[{t:this.shape_17}]},5).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},491).wait(1364));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_flowers = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flowers
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjlG4QgBgCAYgTIA2gvIAagXQAggfAfglQBXhnBCiCQBBiBAgiEQAMguAHgsIAGgjIAKhHQAEgeACAAQACAAgBAfQgBAigGAmIgFAjQgIAsgMAuQghCJhBB+QhECGhXBmQgfAkggAgIgaAYQgcAZgdAUQgWAPgEAAIgBAAg");
	this.shape.setTransform(1200.0511,301.5851);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AjzFVQgBgCAXgMIA2gfIAZgPQAhgVAggZQBchJBIhkQBHhkAmhwQAOgmAJglIAGgeIALg8QAEgaACAAQACABgBAZQgBAcgHAiIgGAeQgJAmgOAnQgoBzhHBjQhIBmheBJQghAaggAVIgaAPQgcARgcALQgUAJgEAAIgBgBg");
	this.shape_1.setTransform(1195.3051,282.4667);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#48848A").s().p("AgQBJIgKgTQgOghAFggQAGgjAYgZIAGgHQAEgEAEAAQAUgDAHA4QADAagEAZQgFAegPASQgJALgHACIgDABQgHAAgFgLg");
	this.shape_2.setTransform(1209.1358,60.7904);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#48848A").s().p("AAmBCIgUgHQghgMgUgcQgVgbgBgiIgBgKQABgGACgDQAMgQAsAiQAVAQAQAVQARAXADAXQABAQgDAGQgDAFgHAAIgIgBg");
	this.shape_3.setTransform(1202.9611,65.2221);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#48848A").s().p("AhBAyQgDgHAFgOQAHgYAYgVQAVgTAYgMQAugTAIAQQABADgDAPQgFAXgOATQgOATgVALQgPAJgXAGQgNADgIAAQgOAAgDgIg");
	this.shape_4.setTransform(1215.19,66.2286);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#48848A").s().p("AgiBDIgFgWQgGgiANgfQAOghAcgSQANgIAEAAQATADgFA4QgDAZgKAYQgNAcgRAOQgMAIgIABQgIAAgEgNg");
	this.shape_5.setTransform(1235.2993,114.9236);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#48848A").s().p("AAWBJIgSgMQgdgUgNgfQgOgfAHgiQADgPAEgDQAPgMAjArQASAVAJAXQALAcgDAXQgBAOgGAGQgCADgEAAQgFAAgHgDg");
	this.shape_6.setTransform(1228.0502,117.7032);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#48848A").s().p("AhMAgQAAgJAHgLQAMgVAdgPQAZgOAbgFQAwgJAEASQABAFgHANQgKAUgSAPQgTAPgXAHQgMAEgcABIgEABQgeAAgCgPg");
	this.shape_7.setTransform(1239.8046,121.6531);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AkqGvQg+idAikSQAYjDBGjrIBAjEIFRAAIBBDEQBFDrAYDDQAiESg+CdQhNDEjeAAQjeAAhMjEg");
	this.shape_8.setTransform(1203.65,304.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhzKIQgCAAAEgmQADgoAHg1IAVikQAbjPAZiXQAei+AmimQANg8AOg4IALgsQAPg7ALgfQAMglACABQACAAgJAmIgXBaIgLAsQgOA4gNA8QgmCmgeC+QgZCWgbDQIgVCjQgRCCgFAAIAAAAg");
	this.shape_9.setTransform(1220.7147,188.7241);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgNNoIgBiCQgChdgHiLQgPkUAHjqQAFjpAVkWIARjnIANiDQAGg2ACAAQADABgEA2QgDA3gHBMIgSDnQgVEpgEDVQgGDrAPETQAGCLACBdQACBDgDBAQgDA3gDgBQgBAAgBg3g");
	this.shape_10.setTransform(1205.4288,160.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AA8IZQAAhEgEhlQgHi3gSi7QgSi3gei6IgUh5IgJguQgaiEAEgBQACgBAJAnQALAsAKAxIAJAuIAVB6QAcCxATDAQATC4AGC6QAEBnAABDQAAAtgCAzQgBAngDABQgDgBgBiHg");
	this.shape_11.setTransform(1189.7839,183.85);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#48848A").s().p("AA2A2IgWgBQgigEgbgVQgcgWgJggQgEgPABgEQAIgSA0AVQAYAKAUAQQAXATAJAVQAFAOgCAIQgCAIgLAAIgDAAg");
	this.shape_12.setTransform(1184.2953,162.6592);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#48848A").s().p("AgyBCQgEgHAAgPQABgYASgbQAPgYAVgRQAmgfAMAOQAEADAAAPQABAYgJAWQgJAVgRARQgMALgVANQgRAKgLAAQgHAAgDgFg");
	this.shape_13.setTransform(1196.355,160.5305);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#48848A").s().p("AABBMIgNgQQgWgcgDghQgEgjASgeQAHgOAEgBQAQgHAXA0QAKAYACAaQACAegJAVQgHANgHAEIgEABQgGAAgHgHg");
	this.shape_14.setTransform(1180.8469,107.0906);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#48848A").s().p("AA2A2IgWgBQgigEgbgVQgcgWgJggQgFgPACgEQAIgSA0AVQAXAKAVAQQAXATAJAVQAEAPgBAHQgCAIgMAAIgCAAg");
	this.shape_15.setTransform(1175.913,113.0092);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#48848A").s().p("AgyBBQgFgHABgOQABgZASgaQAPgYAVgSQAngeAMANQACADABAGIAAAKQABAXgJAXQgJAVgRAQQgOANgTALQgRALgKAAQgIAAgDgGg");
	this.shape_16.setTransform(1187.9967,110.9139);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#48848A").s().p("AAnBBIgUgGQghgMgVgbQgWgbgBgiIgBgKQAAgGACgDQAIgKAWAKQANAGAOALQAWAPAPAVQATAXADAXQACAOgEAIQgDAFgHAAIgIgBg");
	this.shape_17.setTransform(1196.5083,178.1844);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#48848A").s().p("AhAAzQgDgIAEgNQAGgYAYgWQAVgTAYgMQAtgUAIAPQACAEgDAPQgEAXgOASQgOAUgVAMQgLAHgaAJQgOAEgIAAQgNAAgDgJg");
	this.shape_18.setTransform(1208.7507,178.9786);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#48848A").s().p("AAVBJIgSgLQgcgVgNgfQgOggAIgiQADgOAEgDQAPgMAjArQAQAVAKAYQALAcgDAXQgCAOgGAGQgDADgEAAQgFAAgGgEg");
	this.shape_19.setTransform(1212.5583,194.8852);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#48848A").s().p("AhMAfQgBgHAIgNQANgUAcgPQAagOAagEQAxgJAEATQAAADgCAGIgEAIQgLAUgTAPQgSAPgXAGQgRAFgYAAQgjAAAAgPg");
	this.shape_20.setTransform(1224.2526,198.9662);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#48848A").s().p("AAVBJIgSgMQgcgUgNggQgNgfAIgiQADgPADgDQAPgLAjArQARAVAJAXQALAdgDAWQgBANgHAIQgDADgEAAQgFAAgGgEg");
	this.shape_21.setTransform(1217.9934,158.9046);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#48848A").s().p("AhMAfQAAgKAHgKQANgUAdgPQAZgOAbgEQAwgJAEASQABAFgHANQgWArgxANQgRAFgXAAQgjAAgBgPg");
	this.shape_22.setTransform(1229.6562,163.0027);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#48848A").s().p("AAVBJIgSgMQgcgUgNgfQgOggAIgiQADgPAEgCQAQgNAiAsQAQAVAKAYQALAcgDAXQgCAOgGAGQgDADgEAAQgFAAgGgEg");
	this.shape_23.setTransform(1223.1583,136.5182);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#48848A").s().p("AhMAfQgBgHAIgNQANgUAcgPQAagOAagEQAxgJAEATQAAADgCAGIgEAIQgLAUgTAPQgSAPgXAGQgRAFgYAAQgjAAAAgPg");
	this.shape_24.setTransform(1234.8526,140.6162);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#48848A").s().p("AAnBBIgUgHQghgLgVgbQgWgbgBgjIgBgJQAAgGACgDQAMgQAtAgQAVAQAQAVQATAXADAXQACANgEAJQgDAFgHAAIgIgBg");
	this.shape_25.setTransform(1198.9583,118.3528);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#48848A").s().p("AhAA0QgDgJAEgNQAHgYAXgVQAVgUAZgMQAOgHANgDQAUgFAGAKQABADgBAHIgBAJQgFAXgOATQgOATgUAMQgPAJgXAHQgOAEgJAAQgNAAgCgIg");
	this.shape_26.setTransform(1211.1969,119.1379);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#48848A").s().p("AAoBBIgVgGQghgMgVgbQgWgbgBgiQgBgPADgEQAHgKAWAKQANAGAOALQAWAPAQAVQASAXADAXQACAPgEAHQgDAFgGAAIgIgBg");
	this.shape_27.setTransform(1200.9833,84.884);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#48848A").s().p("AhAAzQgDgIAEgNQAHgYAXgWQAVgTAYgMQAugUAHAPQACADgDAQQgEAXgOASQgOAUgUAMQgNAJgZAGQgOAEgIAAQgNAAgDgIg");
	this.shape_28.setTransform(1213.2169,85.6701);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#48848A").s().p("AA2A2IgWgBQgigEgbgVQgcgWgJggQgFgPACgEQAIgSA0AVQAXAKAVAQQAXATAJAVQAFANgCAJQgCAIgMAAIgCAAg");
	this.shape_29.setTransform(1180.4228,134.8592);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#48848A").s().p("AgyBBQgFgHABgOQABgZASgaQAPgYAVgSQAmgeANANQACADABAGIAAAKQADAvglAkQgMAMgVAMQgRALgLAAQgHAAgDgGg");
	this.shape_30.setTransform(1192.4997,132.7639);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},85).wait(335));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_cinemaBackgroung = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// cinemaBackgroung
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#252525").s().p("EhqtA8AMAAAh3/MDVbAAAMAAAB3/g");
	this.shape.setTransform(682.9896,384);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#252525").s().p("EhqtA8AUAY+hqogN2gNXMDKTAAAMAAAB3/g");
	this.shape_1.setTransform(557.131,649.4582,1.7992,1.7992);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#252525").s().p("EjAABr9UAs8i/3gY7gYCMFsAAAAMAAADX5g");
	this.shape_2.setTransform(557.125,649.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape,p:{scaleX:1,scaleY:1,x:682.9896,y:384}}]}).to({state:[{t:this.shape_1}]},81).to({state:[{t:this.shape_2}]},731).to({state:[{t:this.shape,p:{scaleX:2.2885,scaleY:2.2886,x:683.0545,y:458.8566}}]},581).wait(553));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_alisonLegs = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// alisonLegs
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F7D07F").s().p("AlqLoIDL0nQAYhlBVg6QBUg7BmAQQBwAQBBBdQBCBcgWBvIigTeg");
	this.shape.setTransform(613.3516,529.3627);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4A3736").s().p("AgDAlQgkgGAEgiQAEgjAjACQAkAFgEAiQgDAigiAAIgCAAgAgYgGQgCAYAZABQAYAEADgYQADgZgagDIgDgBQgWAAgCAYg");
	this.shape_1.setTransform(595.5955,637.0431);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#4A3736").s().p("AgNAoQgGgCABgHQAJgjAUghQACgFAEADQABABAAABQABAAAAABQAAAAAAABQAAAAAAABQgGAmgRAhQgCAEgEAAIgDgBg");
	this.shape_2.setTransform(625.9892,646.0498);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#4A3736").s().p("AgYAiQgHgGAFgGQATgaAagdQADgEAFADQAEADgDAFQgSAegVAdQgCADgEAAQgEAAgDgCg");
	this.shape_3.setTransform(620.1394,643.8683);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#4A3736").s().p("AgdAYQATgeAdgXQAGgDAEAFQADAEgDAEQgDAJgcAZQgSAQgGAAQgEAAABgHg");
	this.shape_4.setTransform(615.0904,639.933);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#4A3736").s().p("AgNBFQgEgBABgEQAEhBATg/QABgFAFABQAFABAAAFQgGBBgTA/QgBADgDAAIgCAAg");
	this.shape_5.setTransform(632.6998,651.2259);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#4A3736").s().p("ABbBGQgGg0ggghQghgjgzgIQgOgDgTgBIghgBQgBAAgBAAQgBAAAAAAQgBgBAAgBQAAAAAAgBQAAgEADAAQA4gLAxAQQA4ATAXAvQARAhgBAkQAAAFgFAAQgFAAgBgFg");
	this.shape_6.setTransform(590.7497,650.455);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#4A3736").s().p("ACwAKQjcgBjggGIhZgDQgEAAAAgDQAAgDAEAAQFlgHFiAIQAHABAAAGQABAIgIAAIhZAAIhZAAg");
	this.shape_7.setTransform(613.9515,657.6793);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F5FFF9").s().p("AluAZIIaAGIAPiEQCwBHAECCIrWACg");
	this.shape_8.setTransform(614.15,654.575);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E4CEC9").s().p("AkbjnIEegKIAGBsQAMBuAdAPQAFACA/ATQA+AUAqAWQCKBFADBzIrWADg");
	this.shape_9.setTransform(614.5,640.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F2A79F").s().p("AjzNpQglgpgHhCIDv6QQBTAOBbAFQA9ADBlABIlJaxQgIAogfAaQgfAagpAAIgCAAIgBAAQg0ABgkgqg");
	this.shape_10.setTransform(612.475,565.8503);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F7D07F").s().p("AlIDqQhngGhHhLQhHhLgBhnQgChxBRhPQBRhPBxAEIM4AcIA1Itg");
	this.shape_11.setTransform(572.1486,478.2904);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F7D07F").s().p("AigGpQi1AAhghiQhhhkAXilIBFnmINxAAIBNNRg");
	this.shape_12.setTransform(565.5037,460.825);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EFC576").s().p("AlqLoIDL0nQAXhlBWg6QBUg7BmAQQBwAQBBBdQBCBcgWBvIigTeg");
	this.shape_13.setTransform(684.3516,527.2627);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#4A3736").s().p("AgDAlQgkgGAEgiQAEgjAjACQAjAFgDAiQgDAigiAAIgCAAgAgYgGQgCAYAZABQAYAEADgYQADgZgagDIgDAAQgWAAgCAXg");
	this.shape_14.setTransform(666.5917,634.971);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#4A3736").s().p("AgOAnQgFgDABgFQAJgkAUghQACgDADACQAEABgBADQgGAmgRAhQgDAFgDAAIgEgCg");
	this.shape_15.setTransform(696.994,644.0113);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#4A3736").s().p("AgYAiQgHgFAFgIQAVgeAYgZQADgDAEADQAFADgDAEQgSAfgVAcQgEAEgDAAQgDAAgDgCg");
	this.shape_16.setTransform(691.1276,641.8018);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#4A3736").s().p("AgdAXQAVgeAbgWQACgCADABQADAAACADQADAEgDAEQgtAygKAAQgEAAABgIg");
	this.shape_17.setTransform(686.067,637.8741);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#4A3736").s().p("AgMBFQgFgBABgEQAEhCATg/QABgEAFABQAFABgBAEQgEBCgUA/QAAABgBAAQAAABgBAAQAAABgBAAQAAAAgBAAIgBAAg");
	this.shape_18.setTransform(703.6748,649.1509);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#4A3736").s().p("ABbBGQgGg0ggghQghgigzgJQgTgDgvgBQgEAAAAgEQAAgEADAAQA4gLAxAQQA4ATAXAvQARAhgBAkQAAAFgFAAQgGAAAAgFg");
	this.shape_19.setTransform(661.7278,648.355);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#4A3736").s().p("ACwAKQjagCjigFIhZgDQgEAAAAgDQAAgBABgBQAAAAAAgBQABAAAAAAQABgBABAAQFsgFFbAHQAHAAABAHQAAAHgIABg");
	this.shape_20.setTransform(684.95,655.6087);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#F5FFF9").s().p("AluAZIIbAHIAOiFQCwBJAECAIrWACg");
	this.shape_21.setTransform(685.125,652.475);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E4CEC9").s().p("AkbjmIEegLIAGBsQAMBvAcAOQAFADBAATQA9AUAqAVQCLBGADByIrWADg");
	this.shape_22.setTransform(685.5,638.525);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#F2A79F").s().p("Aj1NoQgkgpgEg/IDu6QQBRALBbAFQA9ACBkABIlJaxQgIAogfAaQgfAagpABIgCAAIgBAAQg0AAgkgpg");
	this.shape_23.setTransform(683.625,566.0253);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#EFC576").s().p("AlHDqQhngGhIhMQhHhLgBhmQgChxBRhPQBRhPBxAEIM4AcIA1Itg");
	this.shape_24.setTransform(643.0986,476.2176);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#B0B0B0").s().p("ApHBIIAAh7QEdAoEDAHQGjAMDMhPIAACPg");
	this.shape_25.setTransform(565.525,510.875);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#C5C0C2").s().p("ApHB+IAAj7ISPAAIAAD7g");
	this.shape_26.setTransform(565.525,505.45);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#70452E").ss(2.1).p("AmhigINDFB");
	this.shape_27.setTransform(566.975,541.725);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#70452E").ss(2.1).p("AmWEIIMtoP");
	this.shape_28.setTransform(555.425,557.85);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#70452E").s().p("AjALvIEO3dIBzAAIlZXdg");
	this.shape_29.setTransform(514.75,591.075);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#70452E").s().p("ACbLnIlm3NICkAAIDzXNg");
	this.shape_30.setTransform(608.775,590.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},85).wait(335));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.titles = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AgKFMQg1ABg0gUQgagLgQgKQgRgLgJgJQgSgPgOgYQgNgXgKghIgCgIIgCgKQgBgHAOgMQAIgFAJgCQAIgCAJAAIADAAQAQAAAMAGQAMAGAGAMQAJAcAIATQAKATAKAKQAQARATAIQASAJATAAQARgHANgKQALgKAIgPIAFgLIADgRQAAghgagqQgcgqg1g0IhGhKQgcgegMgRQgUgcgKgXQgKgXAAgUIAAgBQAAgNAHgQQAFgRAMgSQAQgWAZgQQAbgPAigMQAXgGAWgDQAWgDAWAAIADAAQAcAAAfAGQAfAIAgAOQAbAQARANQARAMADAIQAPASAHAWQAIAUAAAWIAAACQAAAYgKANQgIANgUAFIgMABQgPAAgLgGQgLgEgFgMIAAgBIAAgRIAAgJQAAgPgIgQQgFgSgPgTQgFgFgIgHIgVgMIgBgBQgRAGgIANQgHAOAAAVQAAAOAMAVQAOATAcAaQAAABAPAQIAwAtQATAVAQARQAPATAKAOQA5BYAAA8IAAAEQAAAhgRAeQgTAcgiAaQgoAcgWAEQgeALgbAFQgbAEgZAAgAiJkaQgQAKgTASQgOAOgHALQgHAMAAAIIAAACIgCADQAAALAGAKQAGALAIAHIADAAIACAAQAAgWAIgXQAIgVATgXQAHgHALgIQAKgJANgIIAAgCQAAgBgIgBQgMAAgQAIg");
	this.shape.setTransform(1302.85,71.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AhTFQQgvgBgjgTQgjgUgZgmQgIgLgHgfQgHgfgFg0QgDgVAAgiQgBggAAguIAAg6IABglIgBgvIAAgdIAAg5QAAgjAPgYQAPgXAfgLQAGgFALgCQALgCANgBIAQgDIARgBQAaABAXAJQAYAJAUAVIAFAHIAFAMIABAAQAUgSAagMQAagLAfgIIAVgCIAUgBQAfAAAZAJQAZAJARARQALAJAGAPQAHAPAFAUIADAMIABAGQAAAMgKAIQgIAIgTAFIgGABIgFAAIgFAAQgQAAgLgHQgKgFgHgLQgEgggJgPQgIgQgNAAQgcAAghAYQgJAJgGAKQgHALgEAMQgJAPgIAgQgIAhgIAyIgDAVIgBAVIAFC6IAEB+QAAARgHALQgHANgPAFQgIAEgQACQgPACgYAAgAjAkjQgKALgMAWQgHATgEANQgEAPABAIQAAAIACAJIAJAPIABACQAKgJADgKQADgJABgKIAIgiIAIgZIALgWIAFgKIAAgCIgCgBIgEAAQgIAAgLAKg");
	this.shape_1.setTransform(1240.8,71.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("AgoFDQgZgFgZgMQgYgPgOgKQgNgKgFgFQgQgRgQgTQgQgUgPgYQgPgYgLgZQgLgZgIgaIgMgzQgEgVgBgPIABgDIAAgDQAAgnAKgrQAKgsAVgvQAMgXASgXQATgYAYgWQATgRAZgLQAagMAigGQAwgKAiAAQAbABAbAIQAcAHAcALQAYAOANAKQANAKAEAGQAnAoAUBIQATBHAABmQAAAkgIAmQgHAngRAoQgNAagOATQgNAUgPAOQgnAkgrATQgrASgvAAQgbAAgagGgABEjsQgLAOgSAaQgWArgNArQgKAsAAArIAAASQAAA+ASA+QASA+AmA+IAFADQAegTAOgTQAKgNAHgNQAIgOAGgNQAMgiAHgfQAGgfAAgdIAAgpQAAgXgEgeQgEgfgHgnQgGgYgJgUQgIgTgJgPQgGgJgJgJQgKgJgMgIIgEgCIgBAAQgFAAgLANgAhrkMQgUAKgbAWQgOAOgJALQgIALgCAIIAAADIAAAEQAAAEABACQABADAEACQAGgBAKgKQAJgJAPgTQANgXA1gkQACAAADgDIAAgCIgCgBIgCgBIgBAAQgMAAgUALg");
	this.shape_2.setTransform(1173.7,70.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282E46").s().p("ABzGzQg1AAgtgNQgtgNgngaQgdgWgRgTQgTgTgKgSQgGgHgIgSQgHgRgJgbQgDgIgCgnQgDgnAAhGIAAh+IAAgrIABhQIgugBIgogBQgPAAgKgFQgKgFgGgLIAAgGQAAgIAIgGQAIgGAOgEQAIgCAagBQAagCArgBIAEgWIAFgqQAMgjANgZQAMgaANgRQAOgTASgKQARgKAUAAIAFAAQAYAAAcAGQAcAHAiANQAOAGAJAWQALAWAFAoQADAMACAQQABAQAAAUIAAAKIgBAOIAcAAQArAAAYABQAYACAHACQALAGAGAGQAGAGAAAGIAAADQAAAKgKAHQgJAHgTAEIhPAAIglAAQgCARgBAgIgDBOIACA2IACBxQgFA9AAAXIAAArQABAtAGAdQAIAcAOALQAFAFAFABQAFADAGAAQAQAAAKgJQAKgJAFgSQADgGACgOIAHgmQAAgOAHgKQAIgJAQgFIAIgBIAGAAIAKAAQANAAAKAFQAKAGAIAKIABAEIAAAFQAAAfgHAcQgHAcgPAaQgUAaglANQglANg3AAgAhSlzIgPAZIgMAaIgDAXIgCAMIAAABQAAAJACAJQACAJAFAJIADACQAIgIAThJIAMgnIAHgXIAAgCIgBgBIgDgBQgIAAgOAWg");
	this.shape_3.setTransform(1108.8,61.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282E46").s().p("AAeFGQgeAAgggHQgggHgigOIgngYIgWgPQgVgTgRgYQgRgYgOgcQgVgwgKgwQgKgvAAgtIAAgMQAAgnAKgmQAKgnAVgmQALgSAOgRQAOgQASgQQAbgTAXgMQAXgLASgFQAhgKAegGQAdgFAcAAQAvAAAnAOQAmAOAcAdQAPAUAHASQAIASAAAQIAAAHQAAANgIAIQgIAIgPAEIgJACIgGAAQgPAAgKgFQgLgGgGgKQAAgSgGgPQgGgOgNgOIgNgEIgGgBIgDAAQgHADgIAJIgUAYQgMARgKAYQgJAZgGAgQgDAMgBAPIgBAhQAABDAOA8QAOA9AeA1QAOATAOAKQAOALAOAEQAGgGAHgLQAIgMAIgRQAHgOAFgTQAGgTAFgYIAJgLQAGgFAJgDIAIgCIAIgBQATAAANAFQAMAFAHAJIACAGIABAFQAAARgJAaQgJAbgQAjQgNAZgWATQgWASggAMQgHAEgNADIgiAJQgQAEgNABIgZACgAhhkLQgUALgbAWQgQAPgHAOQgIANAAALIAAADQAAABAEAEQAGgBAEgEQAFgEAEgGQAFgJAIgLQAHgLALgLQAHgIAPgMQAPgMAXgPIgDgBIgDAAQgLAAgTALg");
	this.shape_4.setTransform(1051.625,72.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282E46").s().p("AkHGvQgPAAgMgGQgKgGgIgMIAAgEIAAgDIAAgRQAAhJAMhWQALhXAYhlIAUhWQgKgDgFgGQgFgFAAgEIAAgEQAAgJAIgGQAJgHAQgEIAhh0QALgrANghQANggANgWQAIgMAKgLQAKgLAMgKQAbgVAhgLQAggKAkAAIAOAAQA1AAA1AVQAcAOASAQQATARAGAQQAKARAHAVQAHAUAGAYQAHAfAJBMQAJBLALB4QAQBzAHBNQAGBNAAAmQAAAWgJASQgKARgTAMQgKAEgOADQgNACgRAAQg1AAglgQQgkgQgUggQgHgHgEgSQgFgQgDgcQgEgfgEhUQgFhUgFiIIiwAAQgBAAgDANIgKAmQgbBwgMBVQgOBUAAA6QgBAkgDASQgCASgEAAQgIAHgKAEQgKADgLAAgAAehpQAAgfgGgwQgFgvgLhBQgIgdgIgPQgIgPgHAAIgCAAQgDAAgEAEQgFAFgFAJQgNAQgKASQgJASgIATIgXBNIgUBUIAIAAICTAAIAAAAgAB+lxIARAXQAKARAIAVQAKAXAIAcIACACIADABQAFAAACgDQADgDACgGIAAgFQgBgSgLgWQgKgVgVgYQgMgMgJgFQgIgGgFAAIAHAKg");
	this.shape_5.setTransform(986.925,61.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282E46").s().p("ACHGiIgVgNQgMgJgPgNIgVAPIgPAKQgWALgXAFQgWAGgbgBQgZABgcgHQgbgFgggNQgugWgdgXQgdgYgXglQgXgkgQgvQgLgigGgiQgFggAAggIAAgIIAAgFIAAgFIAAgGQAAhuBGheQAIgMANgMQANgMARgOQApgZAZgIQAXgIAUgEQAUgEARAAIAJAAQAfAAAdAKQAdAIAdASQAEgrAEgaQAFgaAFgIQAIgVAJgTQAJgSAJgOQAQgYASgMQAUgMAXAAIAFAAQAWAAAcAHQAcAGAjAOQAIADAGAHQAGAIADAJQALAeAGAdQAFAeAAAdIgLCxIAAAxIAAA6IADBvQgEAegCA0IgEB9QAAALgIAOQgGAOgNAQQgKAKgNAIQgOAHgRADIgOADIgRABQgnAAgogNgAhwitQgVAJgZAQQgOAOgNAPQgNAQgLATQgSAlgJAjQgKAjAAAhIAAAMQAAAtAIAoQAHAoAPAiQAGASAKASQAKASAOASQAHAJAMAKIAdAVQARAMANAFQANAGAHABIAWAFIAPABQAUAAASgNQASgOASgaQABgBAEgFIANgSQgEgcgBg2QgCg1AAhMIAAhEIgChDQgBgXgEAAQgIgUgIgQQgJgOgJgMQgPgWgTgKQgTgLgVAAQgUAAgVAJgAD5l6IgBAAIAAAHQASAkAAAfQACAaAEANQAEAOAFAAQAIgCAEgFQAFgFAAgKIAAgbQAAgUgIgTQgIgTgPgQQgJgFgFgBIgEACg");
	this.shape_6.setTransform(873.175,61.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#282E46").s().p("AChFRQgZABgWgFQgXgEgVgLIguAEIgiACQgngBgjgGQgjgHgggMQhEgagdgyIgKgaQgDgMAAgLIAAgPQAAhLBTg5QAegSAagIQAbgMAWgDQALgEAQgCIAlgEQACgOAAgVIABgyIAAgoQAAgngDgYQgCgXgGgIQgIgSgSgBQgHAAgKAHQgLAHgQAMQgNAMgHARQgGARAAAYQAAARgCAJQgDAJgEABQgIAIgJACQgJAEgHAAIgIAAQgRAAgLgFQgMgFgFgMIgCgKIAAgIIAAgcQAAgaAPgYQAPgZAdgYQAWgOATgLQAUgJASgFQAdgHAfgDQAfgDAggBIAIAAQAsABAmALQAnALAgAWQAZAUAMAhQANAhAAAuIgGDEIgCBlIACBWIABAwIAAAVQAAANgGAJQgHAIgOAEQgOAGgOADQgPADgRgBgAhhA+QgiASgRAaQgRAZABAfIAAAGQAAAiAYAXQAZAWAxALIAaAEIAbABIATAAIAEgBQgLgWgGgYQgGgZABgaIAAg5QgBgfABgUQABgSACgIQgdACg7AdgACVkRQAEAGAIAGQAIAKAGALQAGALADAOIAHAeQADALACgBIADAAQAHgBAEgGQAEgEAAgJIAAgBQAAgWgLgTQgLgSgVgPQgPgKgHgCIgDACIgBAAQAAADAEAEg");
	this.shape_7.setTransform(802.125,70.85);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#282E46").s().p("AgiE7QglgLgmgWIgZgSQgWgRgSgVQgSgUgOgWQgKgNgIgRQgJgSgIgVQgZhTAAhBQgBhBAVg1QAWg2ArgqQA8gzBVgSQASgFARgCIAhgBIAFAAQA0AAAsARQAtAPAlAhQAHAHAGAKQAHAKAGAPQAIAUAEAPQADAPAAAKQAEAeACAdIABA3IAAAJQAAAPgIAJQgIAJgRADQgJACgUACIgxAAIhuACIg1ABQAAASAHAeQAFAgAMAsQAJAZAJATQAJASAKANQAIAKALALQAMAMAPALIADAAIACACIACAAQAQgJANgRQANgSALgcQAJgWAHgNIAJgSQAJgFAKgDQAKgDALAAQARAAALAGQAMAGAHAKIAAAEIAAADIAAABQAAAHgJAXQgJAVgTAmQgIANgKALQgLANgNALQgdAUglAKQglAKguAAQgmAAgkgKgACFg0IAgABIAAgIQAAgsgDgiQgEgigIgYQgGgNgKgMQgJgKgMgJIgfgNQgMgGgCAAQgbAVgRAXQgQAYgIAaQgGAagFAcQgEAbAAAeIAAACIBEgBIAqAAIAmAAgAhrkGQgVALgXAUQgPAOgIALQgHAMAAAIIAAABQAAAGACADQABADAEAAQAHgDAHgFQAGgFAHgKQAAgDAJgKIAbgdQAHgGANgJIAdgWIgDgBIgEgBQgSADgUAMg");
	this.shape_8.setTransform(739.0978,71.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#282E46").s().p("Ai+GDIgPgPQgHgKgHgNQgVgugLgcQgLgbAAgJQgFgLgFgfQgFgegEgwQgEgvgCggIgBgxIAAg1QAAhxAShsQALggAMgaQALgZAMgSQAPgUATgJQASgLAZAAQAVAAAcAHQAcAGAhAMQAMAGAGAGQAFAGACAIQAGAJAEASQAEASAFAbIADAcIABAVIgJB6QgCAyAAAZIAAAaQAAAhACA1QADA0AGBIIAAAwQAAAUAEAcQACAcAHAjIABAHIAAAMQAfgDAsgGIBmgRIAXgEIAOgBIADAAQARAAALAFQAMAGAHALIAAAMQAAAFgHAGQgGAFgMAGQgiAHg8AKQg7AJhXAKIg3AEIgtABQhTAAgfgmgAjBloQgIAJgLARQgKAVgFAUQgFAUAAATQAAAEACAEIAFAJIAEAAQAIgEAEgGQAFgHAAgLIAKg2QAEgVADgJQABgBACgFIAFgOIAAgBQgGAAgIAKg");
	this.shape_9.setTransform(681.275,61.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#282E46").s().p("AgiE7QglgLgmgWIgZgSQgWgRgSgVQgSgUgOgWQgKgNgIgRQgJgSgIgVQgZhTAAhBQgBhBAVg1QAWg2ArgqQA8gzBVgSQASgFARgCIAhgBIAFAAQA0AAAsARQAtAPAlAhQAHAHAGAKQAHAKAGAPQAIAUAEAPQADAPAAAKQAEAeACAdIABA3IAAAJQAAAPgIAJQgIAJgRADQgJACgUACIgxAAIhuACIg1ABQAAASAHAeQAFAgAMAsQAJAZAJATQAJASAKANQAIAKALALQAMAMAPALIADAAIACACIACAAQAQgJANgRQANgSALgcQAJgWAHgNIAJgSQAJgFAKgDQAKgDALAAQARAAALAGQAMAGAHAKIAAAEIAAADIAAABQAAAHgJAXQgJAVgTAmQgIANgKALQgLANgNALQgdAUglAKQglAKguAAQgmAAgkgKgACFg0IAgABIAAgIQAAgsgDgiQgEgigIgYQgGgNgKgMQgJgKgMgJIgfgNQgMgGgCAAQgbAVgRAXQgQAYgIAaQgGAagFAcQgEAbAAAeIAAACIBEgBIAqAAIAmAAgAhrkGQgVALgXAUQgPAOgIALQgHAMAAAIIAAABQAAAGACADQABADAEAAQAHgDAHgFQAGgFAHgKQAAgDAJgKIAbgdQAHgGANgJIAdgWIgDgBIgEgBQgSADgUAMg");
	this.shape_10.setTransform(578.7478,71.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#282E46").s().p("AgbGqQgWgEgVgJQgbgSgPgPQgOgOgCgLQgKgOgFhEQgEhEAAh6IgBhGIgBgzIgBgGIgBgEQABg2AFg7QAEg8AIhAQAJggAWgrQANgYAOgPQANgPALgGQAKgFALgDQAKgCANAAQAYAAAcAGQAdAHAgAOQALAFAFAGQAGAIACAHQAWBBgBAuIAAAFIgBAoIgIBpIgCAnIAAAYIABA5IACCDIgGBXIgEB9QAAAWgfAjQgPANgWAIQgUAGgZAAQgYAAgXgFgAhClqQgKAOgJAVQgJAUgDAQQgEAQABAOQgBAGACAEQABADAFABQAHAAAFgHQAFgJADgQIAGgSIAJggIAJgYIAKgXIAAgCIgBgCIgFgBQgLAGgKANg");
	this.shape_11.setTransform(524.85,60.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#282E46").s().p("AChFRQgZABgWgFQgXgEgVgLIguAEIgiACQgngBgjgGQgjgHgggMQhEgagdgyIgKgaQgDgMAAgLIAAgPQAAhLBTg5QAegSAagIQAbgMAWgDQALgEAQgCIAlgEQACgOAAgVIABgyIAAgoQAAgngDgYQgCgXgGgIQgIgSgSgBQgHAAgKAHQgLAHgQAMQgNAMgHARQgGARAAAYQAAARgCAJQgDAJgEABQgIAIgJACQgJAEgHAAIgIAAQgRAAgLgFQgMgFgFgMIgCgKIAAgIIAAgcQAAgaAPgYQAPgZAdgYQAWgOATgLQAUgJASgFQAdgHAfgDQAfgDAggBIAIAAQAsABAmALQAnALAgAWQAZAUAMAhQANAhAAAuIgGDEIgCBlIACBWIABAwIAAAVQAAANgGAJQgHAIgOAEQgOAGgOADQgPADgRgBgAhhA+QgiASgRAaQgRAZABAfIAAAGQAAAiAYAXQAZAWAxALIAaAEIAbABIATAAIAEgBQgLgWgGgYQgGgZABgaIAAg5QgBgfABgUQABgSACgIQgdACg7AdgACVkRQAEAGAIAGQAIAKAGALQAGALADAOIAHAeQADALACgBIADAAQAHgBAEgGQAEgEAAgJIAAgBQAAgWgLgTQgLgSgVgPQgPgKgHgCIgDACIgBAAQAAADAEAEg");
	this.shape_12.setTransform(471.075,70.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#282E46").s().p("AFbFQQgSAAgMgHQgMgGgGgNIgBgJIgBgKIAAgsIAFh6QACgsgCgLQACgaAAgwIACh3QAAg0gDgeQgCgegGgKQgEgLgEgGQgEgFgFAAIgCgCIgHAAQgRAAgQAHQgRAGgQANQgJAJgKALQgIALgIAOIgMAcQgHAQgGAVQgFAQgCATQgDATAAAVIABEDIAABmQAAAKgJAIQgIAHgTADIgFABIgHAAQgPAAgMgFQgMgFgGgLQgCgEgBgaIAAhJIgEj2IgCiQQgDgagFgQQgEgRgHgIQgEgIgFgEQgEgEgEAAQgKABgKAEQgLAEgLAHQgVANgPAVQgPAUgKAbQgNAvgGA+QgGA9AABNIACBIIAIBwIAAALQAAAQgJAMQgIAMgRAHQgPAGgPACQgPACgQAAIgGAAQgfAAgcgOQgcgOgYgdQgTgbgNgjQgOgjgIgtQgIg1gEgpQgDgoAAgdQAAhXAIg7QAHg6APgeQADgNAGgKQAHgLAJgGQAkgeA8AAIAEAAQAWAAAQAEQARADALAIQARAIAKAKQAMALAEAMIAAACIABABQAlgaAQgHQAygQAhAAQAXAAAVAHQAVAIATANQALAIAPAYIACAAQAGgHALgIQAKgJAPgJQAegQAdgIQAcgHAbAAQAtAAAfAPQAeAOAOAeQAIAPAGAhQAEAgAAAxQAADIgKC5IAAA7QAAAMgJAIQgJAJgVAEIgIAAgAk9kTQgIAKgLATIgGAUQgDALgCAOQABAMACAFQACAGAFAAQAJgDAEgGQAFgGAAgIIAKg0QAFgUAEgKIAAgBIgBgBIgCAAQgFAAgJAKg");
	this.shape_13.setTransform(391.95,70.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#282E46").s().p("AgiE7QglgLgmgWIgZgSQgWgRgSgVQgSgUgOgWQgKgNgIgRQgJgSgIgVQgZhTAAhBQgBhBAVg1QAWg2ArgqQA8gzBVgSQASgFARgCIAhgBIAFAAQA0AAAsARQAtAPAlAhQAHAHAGAKQAHAKAGAPQAIAUAEAPQADAPAAAKQAEAeACAdIABA3IAAAJQAAAPgIAJQgIAJgRADQgJACgUACIgxAAIhuACIg1ABQAAASAHAeQAFAgAMAsQAJAZAJATQAJASAKANQAIAKALALQAMAMAPALIADAAIACACIACAAQAQgJANgRQANgSALgcQAJgWAHgNIAJgSQAJgFAKgDQAKgDALAAQARAAALAGQAMAGAHAKIAAAEIAAADIAAABQAAAHgJAXQgJAVgTAmQgIANgKALQgLANgNALQgdAUglAKQglAKguAAQgmAAgkgKgACFg0IAgABIAAgIQAAgsgDgiQgEgigIgYQgGgNgKgMQgJgKgMgJIgfgNQgMgGgCAAQgbAVgRAXQgQAYgIAaQgGAagFAcQgEAbAAAeIAAACIBEgBIAqAAIAmAAgAhrkGQgVALgXAUQgPAOgIALQgHAMAAAIIAAABQAAAGACADQABADAEAAQAHgDAHgFQAGgFAHgKQAAgDAJgKIAbgdQAHgGANgJIAdgWIgDgBIgEgBQgSADgUAMg");
	this.shape_14.setTransform(313.7478,71.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#282E46").s().p("AhwGmQgRgDgSgHQgZgMgTgWQgTgVgMgfQgNgbgJgZQgIgYgGgWQgEgOgFgnQgFgngFhCIgCgnIgBgkIAAg9QAAgzAFg2QADg2AIg5QANglANgaQANgaANgPQAMgTASgJQARgKAVAAIADAAIAaACIAKAAIAtgCIArAAIAuAAQA0AAA2ACIBvAGQARAEAJAHQAJAIAAAJQAAAKgIAGQgIAHgQAFIgIABIgNABQhKgEg4gBQg4gCgmAAIgDABIgBAAQAKAeAEAbQAFAbAAAXIgCAwIgHBIQBXABAsACQArACAAACQANAFAHAHQAHAHAAAHQAAALgJAHQgJAHgTAEIgFABIgKAAIg+gBIhYgCIAAABIgCABIgDCDIgBA5IAAAcQAAA0AEAuQAFAuAKApIAEAbQACALAAAGQAAAIgHAJQgHAJgOAJQgPAKgUAFQgUAFgZAAQgPAAgRgDgAjAlUQgIALgLAVQgGAQgDAOQgCANAAAKQAAAIABADQACAEAEAAQAIAAAJgLIALg+IAIgXIAGgMQAAgBAAAAQAAAAgBgBQAAAAAAAAQAAAAgBAAIgEgBQgEAAgJALg");
	this.shape_15.setTransform(258.975,62.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#282E46").s().p("AgKFMQg0ABg1gUQgagLgQgKQgRgLgIgJQgUgPgNgYQgOgXgIghIgDgIIgDgKQAAgHAOgMQAJgFAHgCQAJgCAIAAIAFAAQAQAAALAGQALAGAIAMQAIAcAJATQAJATAKAKQARARASAIQATAJASAAQARgHAMgKQAMgKAJgPIAEgLIADgRQAAghgbgqQgbgqg1g0IhGhKQgcgegMgRQgUgcgKgXQgJgXAAgUIAAgBQgBgNAHgQQAFgRALgSQARgWAZgQQAagPAkgMQAXgGAWgDQAVgDAWAAIADAAQAcAAAfAGQAeAIAiAOQAbAQAQANQAQAMAFAIQAOASAHAWQAIAUAAAWIAAACQAAAYgKANQgJANgTAFIgMABQgPAAgKgGQgLgEgGgMIAAgBIAAgRIAAgJQAAgPgIgQQgFgSgPgTQgFgFgIgHIgVgMIgBgBQgQAGgJANQgHAOAAAVQAAAOANAVQAOATAbAaQgBABAQAQIAwAtQATAVAPARQAQATAKAOQA4BYAAA8IAAAEQABAhgSAeQgSAcgiAaQgoAcgWAEQgdALgcAFQgcAEgYAAgAiJkaQgQAKgTASQgPAOgGALQgHAMAAAIIAAACIgBADQAAALAEAKQAHALAIAHIADAAIABAAQAAgWAJgXQAJgVARgXQAIgHALgIQALgJANgIIAAgCQgBgBgIgBQgMAAgQAIg");
	this.shape_16.setTransform(1235.05,71.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#282E46").s().p("AhUFQQgugBgjgTQgjgUgYgmQgJgLgHgfQgGgfgGg0QgCgVgBgiQgCggAAguIABg6IABglIgCgvIAAgdIAAg5QAAgjAQgYQAPgXAfgLQAHgFAKgCQALgCAMgBIAQgDIARgBQAbABAYAJQAXAJAUAVIAFAHQADAGACAGIACAAQATgSAagMQAZgLAggIIAVgCIAVgBQAeAAAZAJQAYAJATARQAJAJAIAPQAGAPAFAUIADAMIAAAGQABAMgKAIQgJAIgSAFIgFABIgGAAIgGAAQgPAAgLgHQgLgFgGgLQgEgggJgPQgIgQgMAAQgdAAghAYQgJAJgHAKQgGALgFAMQgIAPgIAgQgJAhgGAyIgEAVIgBAVIAFC6IAEB+QAAARgIALQgFANgPAFQgJAEgQACQgQACgWAAgAjAkjQgKALgMAWQgIATgDANQgEAPAAAIQAAAIADAJIAJAPIABACQAJgJAEgKQADgJAAgKIAJgiIAIgZIALgWIAFgKIAAgCIgCgBIgEAAQgJAAgKAKg");
	this.shape_17.setTransform(1173,71.55);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#282E46").s().p("AgoFDQgagFgYgMQgYgPgOgKQgNgKgFgFQgRgRgQgTQgPgUgPgYQgPgYgLgZQgLgZgIgaIgLgzQgFgVgBgPIABgDIAAgDQAAgnAKgrQAKgsAWgvQALgXASgXQATgYAZgWQARgRAagLQAagMAigGQAwgKAjAAQAaABAbAIQAcAHAdALQAWAOAOAKQANAKAEAGQAnAoAUBIQATBHAABmQAAAkgIAmQgHAngRAoQgNAagOATQgNAUgOAOQgoAkgqATQgsASgvAAQgbAAgagGgABEjsQgLAOgSAaQgXArgMArQgKAsAAArIAAASQAAA+ASA+QASA+AnA+IAEADQAegTAOgTQAKgNAHgNQAIgOAGgNQANgiAGgfQAGgfAAgdIAAgpQAAgXgEgeQgEgfgHgnQgHgYgIgUQgIgTgKgPQgFgJgKgJQgIgJgNgIIgEgCIgBAAQgFAAgLANgAhrkMQgUAKgbAWQgPAOgIALQgJALgCAIIAAADIAAAEQAAAEACACQABADAEACQAGgBAKgKQAKgJAOgTQANgXA1gkQACAAACgDIAAgCIgBgBIgCgBIgBAAQgMAAgUALg");
	this.shape_18.setTransform(1105.9,70.775);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#282E46").s().p("ABzGzQg1AAgtgNQgsgNgogaQgdgWgSgTQgSgTgKgSQgGgHgIgSQgIgRgHgbQgFgIgBgnQgDgnAAhGIAAh+IAAgrIAChQIgvgBIgogBQgPAAgKgFQgKgFgFgLIAAgGQAAgIAIgGQAGgGAPgEQAJgCAZgBQAZgCAsgBIAEgWIAFgqQAMgjANgZQAMgaANgRQAOgTASgKQARgKAUAAIAEAAQAZAAAbAGQAdAHAiANQANAGALAWQAJAWAGAoQADAMACAQQABAQAAAUIAAAKIgBAOIAcAAQArAAAYABQAYACAHACQALAGAHAGQAFAGAAAGIAAADQAAAKgKAHQgKAHgSAEIhPAAIglAAQgBARgCAgIgCBOIABA2IABBxQgEA9AAAXIAAArQAAAtAHAdQAIAcAPALQAEAFAFABQAFADAFAAQARAAAKgJQAKgJAFgSQADgGACgOIAHgmQgBgOAJgKQAHgJAQgFIAIgBIAGAAIAKAAQANAAAKAFQAKAGAIAKIACAEIAAAFQAAAfgIAcQgHAcgPAaQgUAaglANQgmANg2AAgAhSlzIgPAZIgLAaIgFAXIgBAMIAAABQAAAJACAJQACAJAFAJIADACQAIgIAShJIAOgnIAGgXIAAgCIgBgBIgDgBQgIAAgOAWg");
	this.shape_19.setTransform(1041.05,61.575);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#282E46").s().p("AhTFQQgvgBgjgTQgjgUgZgmQgIgLgHgfQgHgfgFg0QgDgVAAgiQgBggAAguIAAg6IABglIgBgvIAAgdIAAg5QAAgjAPgYQAPgXAfgLQAGgFALgCQALgCAMgBIARgDIARgBQAaABAXAJQAYAJAUAVIAFAHQADAGACAGIABAAQAUgSAagMQAagLAfgIIAVgCIAUgBQAfAAAZAJQAZAJARARQALAJAGAPQAHAPAGAUIACAMIABAGQAAAMgKAIQgIAIgTAFIgGABIgEAAIgHAAQgPAAgLgHQgLgFgGgLQgEgggJgPQgHgQgOAAQgcAAghAYQgJAJgGAKQgHALgEAMQgJAPgIAgQgIAhgIAyIgDAVIgBAVIAFC6IAEB+QAAARgHALQgHANgPAFQgIAEgQACQgPACgYAAgAjAkjQgKALgMAWQgHATgEANQgEAPABAIQgBAIADAJIAJAPIABACQAJgJAEgKQADgJAAgKIAJgiIAIgZIALgWIAFgKIAAgCIgCgBIgEAAQgIAAgLAKg");
	this.shape_20.setTransform(861.1,71.55);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#282E46").s().p("AgaF7QgRgFgQgJQgPgIgKgQQgLgQgJgYQgMgsgGhTQgHhUAAh5QAAhBAGgjQAGgkALgGQAOgNAUgHQAUgGAcAAIAYAAQAqAAAcALQAdALAOAXQAJAKAEAcQAEAdAAAvIgCBRIgHCjQAAAygDAhQgEAhgIAOQgEAKgIAIQgHAIgKAHQgIAGgMADQgMAEgQADIgJAAIgMABQgRAAgRgFgAg9ilIgJAJQgMASgHAOQgFAPgBAKIAAAaQAFAIAEADQAFAEAFAAIACgBIADgCIAKhBIADgMIAJgeIgCgCIgBgBIgCAAQgEACgDAEgAgGj8QgXAAgWgHQgVgIgTgPQgIgKgFgJQgEgIAAgJQAAgQAMgNQAMgOAagLQAOgGANgDQAOgCANAAIAHAAQAcAAAXAJQAYAJASASQAFAIADAIQACAHAAAIQAAAQgMANQgMAOgYALQgPAGgPACQgPACgOAAgAgyljQgIAFgIAHIgGAKQgCAEAAAEIAAAPIAEAJQAEADAFAAIAEgHIAIgTQAAgCAGgIIAUgXIAAgBQgEgDgEAAQgKACgJAEg");
	this.shape_21.setTransform(808.625,65.725);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#282E46").s().p("AhcGpIgygDQgVgCgLgEQgPgDgQgKQgPgLgQgSQgMgOgPggQgPghgQg0QgJghgEgdQgFgcgBgWQgEgrgDgvQgDgvAAg0QAAgwAFg4QAEg3AIg+QAEgNAHgUIATgpQANgYAMgQQANgPAMgGQAJgGALgCQAKgDAKABIAGAAQAOAAAXADQAWAEAgAIQAXAAAgAFQAfAEAnAJQBIASA2AgQA2AgAlAuQASAUAOAXQAOAVAJAYQAIAbAFAbQADAbAAAbQAAAdgHAmQgGAngNAyQgQAkgRAdQgRAdgTAWQgTAagbAcQgbAagiAdIgrAhQgVAPgVANQgtAZggAMQgfANgSAAgAghlVIAKA2QACAVAAALQgGBDgDA1QgDA2AAAnIAAAMQAAAmACAxIAIBvQAAA2ACAlQADAkAFARIAAACIACAHQAugjAhgcQAggcASgWQAWgYARgZQARgYAMgZQAIgNAHgTQAHgUAGgYQAHgeACgaQADgcAAgaQAAhUgsg6QgMgRgQgQQgQgQgUgQIgogYQgRgJgGgCIgxgQQgVgFgSgDgAjplhQgJAMgMAZQgIATgEAOQgDAOAAALQAAAGABAEQACADAEAAQAMgCAGgIQAGgIAAgLIAKg0QAFgVAEgIIACgGIABgFIgDAAQgGAAgIANg");
	this.shape_22.setTransform(753.625,61.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#282E46").s().p("AgbGqQgWgEgUgJQgcgSgPgPQgOgOgDgLQgKgOgDhEQgGhEABh6IgBhGIgBgzIAAgGIgBgEQAAg2AEg7QAFg8AJhAQAIggAWgrQANgYAOgPQANgPAMgGQAJgFALgDQAKgCANAAQAYAAAcAGQAdAHAgAOQAKAFAGAGQAGAIACAHQAVBBAAAuIAAAFIgCAoIgIBpIgBAnIAAAYIAAA5IADCDIgGBXIgEB9QAAAWgfAjQgQANgUAIQgVAGgZAAQgYAAgXgFgAhClqQgKAOgJAVQgJAUgDAQQgEAQAAAOQAAAGACAEQACADAEABQAHAAAFgHQAFgJADgQIAGgSIAJggIAJgYIAKgXIAAgCIgBgCIgFgBQgKAGgLANg");
	this.shape_23.setTransform(592.65,60.95);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#282E46").s().p("AFbFQQgSAAgMgHQgLgGgIgNIgBgJIAAgKIAAgsIAFh6QABgsAAgLQABgaAAgwIACh3QAAg0gDgeQgCgegGgKQgEgLgEgGQgFgFgEAAIgCgCIgHAAQgRAAgQAHQgQAGgQANQgLAJgIALQgJALgIAOIgMAcQgHAQgGAVQgFAQgDATQgCATAAAVIABEDIAABmQABAKgKAIQgIAHgTADIgFABIgHAAQgPAAgMgFQgMgFgGgLQgCgEgCgaIABhJIgEj2IgBiQQgEgagFgQQgEgRgHgIQgEgIgEgEQgFgEgDAAQgLABgLAEQgKAEgLAHQgVANgPAVQgPAUgKAbQgNAvgGA+QgGA9AABNIACBIIAIBwIAAALQAAAQgJAMQgIAMgRAHQgPAGgQACQgPACgPAAIgGAAQgfAAgcgOQgcgOgYgdQgTgbgNgjQgOgjgIgtQgIg1gDgpQgEgoAAgdQAAhXAIg7QAHg6APgeQADgNAHgKQAGgLAIgGQAlgeA8AAIAEAAQAWAAARAEQAQADALAIQARAIAKAKQALALAFAMIAAACIABABQAlgaAQgHQAygQAhAAQAXAAAVAHQAVAIATANQALAIAPAYIABAAQAHgHALgIQAKgJAPgJQAegQAdgIQAcgHAbAAQAtAAAfAPQAeAOAOAeQAIAPAGAhQAEAgAAAxQAADIgKC5IAAA7QABAMgKAIQgKAJgTAEIgJAAgAk9kTQgIAKgLATIgGAUQgDALgCAOQABAMACAFQADAGAEAAQAJgDAEgGQAFgGAAgIIALg0QAEgUAEgKIAAgBIgBgBIgCAAQgFAAgJAKg");
	this.shape_24.setTransform(459.7,70.875);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#282E46").s().p("AhwGmQgRgDgSgHQgZgMgTgWQgTgVgMgfQgNgbgJgZQgIgYgGgWQgEgOgFgnQgFgngFhCIgCgnIgBgkIAAg9QAAgzAFg2QADg2AIg5QANglANgaQANgaANgPQAMgTASgJQARgKAVAAIADAAIAaACIAKAAIAtgCIArAAIAuAAQA0AAA2ACIBvAGQARAEAJAHQAJAIAAAJQAAAKgIAGQgIAHgQAFIgIABIgNABQhKgEg4gBQg4gCgmAAIgDABIgBAAQAKAeAEAbQAFAbAAAXQAAASgCAeIgHBIQBXABAsACQArACAAACQANAFAHAHQAHAHAAAHQAAALgJAHQgJAHgTAEIgFABIgKAAIg+gBIhYgCIAAABIgCABIgDCDIgBA5IAAAcQAAA0AEAuQAFAuAKApIAEAbQACALAAAGQAAAIgHAJQgHAJgOAJQgPAKgUAFQgUAFgZAAQgPAAgRgDgAjAlUQgIALgLAVQgGAQgDAOQgCANAAAKQAAAIABADQACAEAEAAQAIAAAJgLIALg+IAIgXIAGgMQAAgBAAAAQAAAAgBgBQAAAAAAAAQAAAAgBAAIgEgBQgEAAgJALg");
	this.shape_25.setTransform(326.775,62.325);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#282E46").s().p("AgKFMQg0ABg1gUQgZgLgRgKQgQgLgJgJQgUgPgNgYQgOgXgIghIgDgIIgDgKQAAgHAOgMQAIgFAJgCQAIgCAIAAIAEAAQARAAALAGQALAGAHAMQAJAcAJATQAJATAKAKQAQARATAIQATAJASAAQARgHAMgKQAMgKAJgPIAEgLIADgRQAAghgbgqQgagqg2g0IhGhKQgcgegMgRQgUgcgKgXQgKgXAAgUIAAgBQAAgNAHgQQAFgRAMgSQAQgWAZgQQAagPAjgMQAXgGAWgDQAWgDAWAAIADAAQAcAAAfAGQAeAIAiAOQAbAQAQANQAQAMAEAIQAPASAHAWQAIAUAAAWIAAACQAAAYgKANQgIANgUAFIgMABQgPAAgKgGQgLgEgGgMIAAgBIAAgRIAAgJQAAgPgIgQQgFgSgPgTQgEgFgJgHIgVgMIgBgBQgRAGgIANQgHAOAAAVQAAAOANAVQANATAcAaQgBABAQAQIAwAtQATAVAPARQAQATAKAOQA4BYAAA8IAAAEQAAAhgQAeQgTAcgiAaQgoAcgWAEQgeALgbAFQgcAEgYAAgAiJkaQgQAKgTASQgPAOgGALQgHAMAAAIIAAACIgBADQAAALAEAKQAGALAJAHIADAAIACAAQgBgWAJgXQAJgVARgXQAIgHALgIQALgJAMgIIAAgCQAAgBgIgBQgMAAgQAIg");
	this.shape_26.setTransform(1183.85,71.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#282E46").s().p("AhUFQQgugBgjgTQgjgUgYgmQgJgLgHgfQgHgfgFg0QgDgVAAgiQgCggAAguIABg6IABglIgCgvIAAgdIAAg5QAAgjAQgYQAPgXAfgLQAGgFALgCQALgCANgBIAPgDIARgBQAbABAYAJQAXAJAUAVIAFAHQADAGACAGIABAAQAUgSAagMQAagLAfgIIAVgCIAUgBQAfAAAZAJQAYAJASARQAKAJAIAPQAGAPAFAUIADAMIABAGQAAAMgKAIQgJAIgSAFIgFABIgGAAIgFAAQgPAAgMgHQgLgFgGgLQgEgggJgPQgIgQgNAAQgcAAghAYQgJAJgHAKQgGALgFAMQgIAPgIAgQgJAhgGAyIgEAVIgBAVIAFC6IAEB+QAAARgIALQgFANgQAFQgIAEgQACQgPACgXAAgAjAkjQgKALgMAWQgHATgEANQgEAPAAAIQAAAIADAJIAJAPIABACQAJgJAEgKQAEgJAAgKIAIgiIAIgZIALgWIAFgKIAAgCIgCgBIgEAAQgJAAgKAKg");
	this.shape_27.setTransform(1121.8,71.55);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#282E46").s().p("ABzGzQg1AAgtgNQgtgNgngaQgdgWgRgTQgTgTgKgSQgHgHgGgSQgJgRgIgbQgDgIgDgnQgCgnAAhGIAAh+IAAgrIABhQIgugBIgogBQgPAAgKgFQgKgFgGgLIAAgGQABgIAHgGQAIgGANgEQAKgCAZgBQAagCArgBIAEgWIAFgqQAMgjANgZQAMgaANgRQAOgTASgKQARgKAUAAIAFAAQAXAAAdAGQAdAHAgANQAOAGAKAWQAKAWAHAoQACAMABAQQACAQAAAUIAAAKIgCAOIAcAAQAsAAAZABQAYACAFACQANAGAFAGQAGAGAAAGIAAADQAAAKgKAHQgJAHgTAEIhPAAIgkAAQgCARgCAgIgDBOIABA2IADBxQgFA9AAAXIAAArQAAAtAIAdQAGAcAPALQAFAFAFABQAFADAGAAQAQAAAKgJQAKgJAFgSQADgGADgOIAFgmQABgOAHgKQAIgJARgFIAIgBIAEAAIALAAQANAAAKAFQAKAGAIAKIABAEIAAAFQABAfgIAcQgIAcgOAaQgUAaglANQgmANg3AAgAhSlzIgPAZIgMAaIgDAXIgCAMIAAABQAAAJACAJQACAJAFAJIADACQAIgIAThJIAMgnIAIgXIAAgCIgBgBIgEgBQgJAAgNAWg");
	this.shape_28.setTransform(991.6,61.575);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#282E46").s().p("AhTFQQgvgBgjgTQgjgUgZgmQgIgLgHgfQgHgfgFg0QgDgVAAgiQgBggAAguIAAg6IABglIgBgvIAAgdIAAg5QAAgjAPgYQAPgXAfgLQAGgFALgCQALgCANgBIAQgDIARgBQAaABAXAJQAYAJAUAVIAFAHQADAGACAGIABAAQAUgSAagMQAagLAfgIIAVgCIAUgBQAfAAAZAJQAZAJARARQALAJAGAPQAHAPAFAUIADAMIABAGQAAAMgKAIQgIAIgTAFIgGABIgEAAIgGAAQgPAAgMgHQgKgFgHgLQgEgggJgPQgHgQgOAAQgcAAghAYQgJAJgGAKQgHALgEAMQgJAPgIAgQgIAhgHAyIgEAVIgBAVIAFC6IAEB+QAAARgHALQgHANgPAFQgIAEgQACQgPACgYAAgAjAkjQgKALgMAWQgHATgEANQgEAPABAIQAAAIACAJIAJAPIABACQAJgJAEgKQADgJABgKIAIgiIAIgZIALgWIAFgKIAAgCIgCgBIgEAAQgIAAgLAKg");
	this.shape_29.setTransform(892.95,71.55);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#282E46").s().p("AC8GyQgRAAgSgFQgTgGgWgLQgSgMgMgNQgLgNgGgMQgJgQgJgeQgIgfgKgsIgCAAQAAAIgGAWQgFAVgLAhQgTAxglAVQgTALgRAFQgSAGgQABIgOABIgSABQglAAgigJQgigKgggUQgSgNgMgQQgNgQgGgTQgKgSgKgmQgKgmgLg6QgPhagHg4QgHg4gBgWIgLiOQgEg6AAgoIAAgOQAAgaAFgRQAFgRAKgJQANgRAjgSQAUgJAVgDQAVgEAUAAIAFAAQAYAAARADQARACAKAFQAQAHANANQAOAOAKATIAJATIgDDXQAECcAEBOQAEBOADAAQAIAxAIAlQAJAkAIAXIACAAQAMgdAGgVQAHgXAAgPQAIguAFhpQAEhpAAikIAAgUQAAgIAEgMQAEgNAIgPQAJgIAMgHQANgGAQgEIAOgCIALAAQA1AAAWApIAHAZIAHAsQATCjAUBzQATBzAUBFQALAjACAAQAKgdAJgvQAJgtAHhAIAdi9IAjjmQADgPADgeIAFhLQAEgHAHgFQAHgFAKgCIAFgCIAIgBIAQAAQAHAAAJAEQAIAEAKAHIAEAHIABAHIAAACQAAAlgNBiQgNBigaCcQgPBwgMBIQgLBIgGAfQgLAsgLAcQgLAdgLAOQgNARgXAIQgWAIgeAAgAlwlnQgFANgCAYQgCACAAAGQgBAGABAJQAAAVADANQAEAOAGAEIADAAQAGgDACgEQADgEAAgFIAAgBIAAgBIgBgqIABguQABgPABgBIgCgDIgFgCIgCAAQgGADgFAMg");
	this.shape_30.setTransform(816.625,62.55);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#282E46").s().p("AgbGqQgWgEgVgJQgbgSgPgPQgOgOgCgLQgLgOgEhEQgEhEAAh6IgChGIAAgzIgBgGIgBgEQAAg2AGg7QAEg8AIhAQAJggAWgrQANgYANgPQANgPAMgGQAKgFAKgDQAMgCAMAAQAXAAAdAGQAdAHAhAOQAKAFAFAGQAGAIACAHQAVBBABAuIAAAFIgCAoIgIBpIgCAnIAAAYIABA5IACCDIgGBXIgEB9QAAAWgfAjQgPANgWAIQgUAGgZAAQgYAAgXgFgAhClqQgKAOgKAVQgHAUgEAQQgEAQABAOQAAAGABAEQABADAEABQAIAAAFgHQAFgJAEgQIAFgSIAIggIAKgYIAKgXIAAgCIgCgCIgDgBQgLAGgLANg");
	this.shape_31.setTransform(643.9,60.95);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#282E46").s().p("AFbFQQgSAAgMgHQgLgGgIgNIgBgJIAAgKIAAgsIAFh6QABgsAAgLQABgaAAgwIACh3QAAg0gDgeQgCgegGgKQgEgLgEgGQgFgFgEAAIgCgCIgHAAQgRAAgQAHQgQAGgQANQgLAJgIALQgJALgIAOIgMAcQgHAQgGAVQgFAQgDATQgCATAAAVIABEDIAABmQAAAKgJAIQgIAHgTADIgFABIgHAAQgPAAgMgFQgMgFgGgLQgCgEgCgaIABhJIgEj2IgBiQQgEgagEgQQgFgRgHgIQgEgIgEgEQgFgEgDAAQgLABgLAEQgKAEgLAHQgVANgPAVQgPAUgKAbQgNAvgGA+QgGA9AABNIACBIIAIBwIAAALQAAAQgJAMQgIAMgRAHQgPAGgQACQgPACgPAAIgGAAQgfAAgcgOQgcgOgYgdQgTgbgNgjQgOgjgIgtQgIg1gDgpQgEgoAAgdQAAhXAIg7QAHg6APgeQADgNAHgKQAGgLAIgGQAlgeA8AAIAEAAQAWAAARAEQAQADALAIQARAIAKAKQALALAFAMIAAACIABABQAlgaAQgHQAygQAhAAQAXAAAWAHQAUAIATANQALAIAPAYIABAAQAHgHALgIQAKgJAPgJQAegQAdgIQAcgHAbAAQAtAAAfAPQAeAOAOAeQAIAPAGAhQAEAgAAAxQAADIgKC5IAAA7QABAMgKAIQgKAJgTAEIgJAAgAk9kTQgIAKgLATIgGAUQgDALgCAOQABAMACAFQADAGAEAAQAJgDAEgGQAFgGAAgIIALg0QAEgUAEgKIAAgBIgBgBIgCAAQgFAAgJAKg");
	this.shape_32.setTransform(511,70.875);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#282E46").s().p("ABzGzQg1AAgtgNQgtgNgngaQgcgWgTgTQgSgTgKgSQgHgHgGgSQgIgRgJgbQgEgIgCgnQgCgnAAhGIAAh+IAAgrIABhQIgugBIgogBQgPAAgKgFQgKgFgGgLIAAgGQAAgIAIgGQAHgGAOgEQAKgCAZgBQAZgCAtgBIADgWIAGgqQALgjANgZQAMgaANgRQAOgTASgKQARgKAUAAIAFAAQAXAAAcAGQAeAHAgANQAOAGAKAWQAKAWAHAoQACAMABAQQACAQAAAUIAAAKIgCAOIAcAAQAsAAAZABQAYACAFACQANAGAFAGQAGAGAAAGIAAADQAAAKgKAHQgJAHgTAEIhPAAIgkAAQgCARgCAgIgDBOIABA2IACBxQgEA9AAAXIAAArQAAAtAIAdQAGAcAPALQAFAFAFABQAFADAFAAQARAAAKgJQAKgJAFgSQADgGADgOIAFgmQABgOAHgKQAIgJARgFIAIgBIAEAAIALAAQANAAAKAFQAKAGAIAKIABAEIAAAFQAAAfgHAcQgIAcgOAaQgTAagmANQgmANg3AAgAhSlzIgPAZIgMAaIgEAXIgBAMIAAABQAAAJACAJQACAJAFAJIADACQAIgIAThJIAMgnIAIgXIAAgCIgBgBIgEgBQgJAAgNAWg");
	this.shape_33.setTransform(1112.55,212.975);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#282E46").s().p("AgKFNQg1AAg0gTQgagMgQgLQgRgKgJgJQgSgPgOgXQgOgYgJghIgCgHIgCgLQAAgHANgMQAIgFAIgCQAJgCAJAAIADAAQARAAALAGQAMAGAGAMQAJAbAIAUQAKATAKAKQAQAQATAJQASAIATAAQARgFANgLQALgJAIgPIAFgMIADgRQAAghgagrQgcgpg1gzIhGhLQgcgegMgRQgUgbgKgYQgKgXAAgTIAAgBQABgOAFgQQAGgQAMgTQAQgWAZgQQAbgPAigMQAYgGAVgEQAWgCAVAAIAFAAQAbgBAfAIQAfAHAgAOQAbARARALQAQANAEAIQAPASAHAWQAIATAAAYIAAABQAAAXgKAOQgJANgTAFIgMABQgPAAgLgGQgLgFgFgKIAAgCIAAgQIAAgJQAAgQgIgRQgFgRgPgTQgFgFgIgGIgUgNIgCgBQgRAFgHAOQgIANAAAWQAAAOAMAUQAOAUAcAaQgBABAQAQIAwAtQATAVAQARQAPATAKAOQA4BYABA8IAAAEQgBAhgQAeQgSAcgkAaQgnAbgWAFQgeALgbAEQgcAFgZABgAiJkaQgQAKgTASQgOAOgIALQgGAMAAAIIAAADIgCACQAAAMAGAJQAGAKAIAIIADAAIACAAQAAgXAIgWQAIgVATgXQAHgHALgIQAKgJANgIIAAgBQABgCgJgBQgNAAgPAIg");
	this.shape_34.setTransform(1055.45,222.5);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#282E46").s().p("AgiE6QglgKgmgVIgZgSQgWgTgSgUQgSgUgOgVQgKgOgIgRQgJgSgIgVQgZhUAAhAQgBhBAVg2QAWg1ArgpQA8g0BVgSQASgEARgDIAhgBIAFAAQA0AAAsARQAtAPAlAhQAHAGAGALQAHAKAGAPQAIAUAEAPQADAOAAALQAEAeACAcIABA4IAAAJQAAAPgIAJQgIAJgRADQgJACgUACIgxAAIhuABIg1ACQAAARAHAgQAFAfAMAsQAJAZAJATQAJASAKANQAIAKALAMQAMAKAPAMIADAAIACACIACAAQAQgJANgRQANgSALgcQAJgXAHgMIAJgRQAJgGAKgDQAKgDALAAQARAAALAGQAMAFAHALIAAADIAAAEIAAACQAAAGgJAXQgJAWgTAlQgIAMgKAMQgLANgNALQgdAUglAKQglAKguAAQgmAAgkgLgACFg0IAgABIAAgIQAAgsgDgiQgEgigIgYQgGgOgKgKQgJgLgMgIIgfgOQgMgFgCgBQgbAVgRAXQgQAYgIAaQgGAagFAcQgEAbAAAeIAAACIBEgBIAqAAIAmAAgAhrkGQgVALgXAUQgPAOgIALQgHAMAAAIIAAACQAAAFACADQABACAEABQAHgCAHgGQAGgFAHgLQAAgCAJgKIAbgcQAHgHANgJIAdgVIgDgCIgEgBQgSAEgUALg");
	this.shape_35.setTransform(991.3978,223.35);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#282E46").s().p("AACGnIgegHQgPgHgMgIQgKgIgJgJQgNgLgQggQgQgfgSgzQgJgigFgcQgGgcAAgYIgJhbQgCgrAAgkQAAhUAEhCQAGhCAJgvIAPgnQAHgSAKgRIhJABIhhAEIgFAAQgKAAgIgFQgJgEgIgIIgBgFIAAgDIAAgCQAAgIAIgHQAIgGARgEQAlgGA6gEQA8gDBQAAIANAAIATgBQAAABBNABIDqACQAQAAALAGQAMAGAHAMIAAAHQAAAKgJAIQgKAHgTAEIiqAAIgEAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQgBABAAAAQAIAhAFAaQAEAaAAATIAAADQgHBLgDA1QgCA1AAAeQAAAhACAzQADA1AFBJQAAA1ACApQAEAoAGAaIACAOIABANIAAAIQAAAMgNANQgNAMgZANQgMAFgQACQgRACgVAAIgagBgAhHlkQgJALgJATQgIALgFANQgDANAAAPIAAAFQgBAIADAFQADAFAFABQADAAAEgFIAGgPQAAgMAGgXQAIgWANgfIACgBIACgEIgCgCIgCgBIgBAAQgHAAgIAKg");
	this.shape_36.setTransform(941.95,213.475);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#282E46").s().p("AgbGqQgWgEgUgJQgcgTgPgOQgOgOgDgLQgKgOgDhEQgGhEABh6IgChGIAAgyIAAgHIgBgEQAAg2AEg7QAFg8AJhAQAIghAWgqQANgZANgOQANgPANgHQAJgEAKgDQALgCANAAQAYAAAcAGQAcAHAhANQAKAFAGAHQAGAIACAHQAVBBAAAuIAAAFIgCAoIgIBpIgBAnIAAAYIAAA5IADCDIgGBYIgEB8QAAAWgfAjQgQAOgUAGQgVAHgZAAQgYAAgXgFgAhClpQgKANgKAWQgIATgDAQQgEAQAAAOQAAAGACAEQACAEADAAQAIABAFgIQAFgIADgRIAGgSIAIggIAKgYIAKgXIAAgCIgCgCIgDAAQgMAFgKAOg");
	this.shape_37.setTransform(840.7,212.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#282E46").s().p("AgiE6QglgKgmgVIgZgSQgWgTgSgUQgSgUgOgVQgKgOgIgRQgJgSgIgVQgZhUAAhAQgBhBAVg2QAWg1ArgpQA8g0BVgSQASgEARgDIAhgBIAFAAQA0AAAsARQAtAPAlAhQAHAGAGALQAHAKAGAPQAIAUAEAPQADAOAAALQAEAeACAcIABA4IAAAJQAAAPgIAJQgIAJgRADQgJACgUACIgxAAIhuABIg1ACQAAARAHAgQAFAfAMAsQAJAZAJATQAJASAKANQAIAKALAMQAMAKAPAMIADAAIACACIACAAQAQgJANgRQANgSALgcQAJgXAHgMIAJgRQAJgGAKgDQAKgDALAAQARAAALAGQAMAFAHALIAAADIAAAEIAAACQAAAGgJAXQgJAWgTAlQgIAMgKAMQgLANgNALQgdAUglAKQglAKguAAQgmAAgkgLgACFg0IAgABIAAgIQAAgsgDgiQgEgigIgYQgGgOgKgKQgJgLgMgIIgfgOQgMgFgCgBQgbAVgRAXQgQAYgIAaQgGAagFAcQgEAbAAAeIAAACIBEgBIAqAAIAmAAgAhrkGQgVALgXAUQgPAOgIALQgHAMAAAIIAAACQAAAFACADQABACAEABQAHgCAHgGQAGgFAHgLQAAgCAJgKIAbgcQAHgHANgJIAdgVIgDgCIgEgBQgSAEgUALg");
	this.shape_38.setTransform(787.5478,223.35);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#282E46").s().p("ACHGiIgVgNQgMgJgPgMIgVANIgPALQgWALgXAFQgWAGgbAAQgZAAgcgHQgbgGgggMQgugWgdgXQgdgYgXglQgXgjgQgwQgLgjgGghQgFghAAgfIAAgIIAAgFIAAgFIAAgGQAAhuBGheQAIgMANgMQANgMARgOQApgaAZgGQAXgIAUgFQAUgEARAAIAJAAQAfAAAdAKQAdAJAdARQAEgsAEgaQAFgZAFgIQAIgVAJgTQAJgSAJgOQAQgYASgMQAUgMAXAAIAFAAQAWAAAcAHQAcAGAjANQAIAFAGAGQAGAIADAJQALAeAGAdQAFAdAAAdIgLCyIAAAxIAAA6IADBuQgEAfgCA0IgEB9QAAAMgIANQgGAOgNAQQgKALgNAHQgOAHgRADIgOADIgRABQgnAAgogNgAhwitQgVAJgZAQQgOANgNAQQgNAQgLAUQgSAkgJAkQgKAiAAAhIAAANQAAAsAIAoQAHAnAPAjQAGASAKASQAKASAOASQAHAIAMALIAdAWQARAKANAHQANAFAHABIAWAFIAPABQAUAAASgNQASgNASgbQABgBAEgFIANgSQgEgcgBg2QgCg0AAhNIAAhEIgChDQgBgXgEAAQgIgTgIgRQgJgOgJgMQgPgWgTgKQgTgKgVAAQgUgBgVAJgAD5l6IgBAAIAAAHQASAkAAAfQACAaAEANQAEAOAFAAQAIgCAEgFQAFgGAAgIIAAgbQAAgVgIgTQgIgTgPgRQgJgEgFAAIgEABg");
	this.shape_39.setTransform(715.975,212.8);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#282E46").s().p("AjcGdQgkgQgXgjQgDgEgEgOQgEgPgEgaQgDgHgChGQgChGAAiEIAAgVIgBg1QAAg0AEg6QAEg7AJhBQAGgZAJgTQAJgVAKgQQALgUALgNQAKgNAMgGQAKgGALgEQAMgCANAAQAWgBAcAHQAbAGAjANQAMAEAJAPQAKAPAHAcIAGApQACATAAATIAAABIgBAtQgBAagEAiIAegaQAigYAkgNQAkgMAkAAIAKAAQAagBAVAIQAWAHASAPQAWASALAxQAKAyAABSQAAAqgCBRIgMDJIADBJQAAAIgHAIQgIAGgOAFIgHACIgFABIgSAAQgRAAgSgQQgEgGgBgUQgCgVAAglIANjxIABgaIAAg/QAAh+gagkIgEgCIgGgBQgdAAgbARQgcARgbAjQgRAVgPAfQgQAfgOAlIgFASIgCAHIAABhQgDAegBAzIgEB3QAAAKgEANQgEALgJAOQgPAWgZALQgYAKghAAQgzABgkgSgAjJltIgNAOQgQAXgJAYQgIAYAAAaQAAAFACAEQACADAEACQAJgEAFgEQAEgGAAgIQAGggAGgXQAHgWAGgNIAPgUIgFgBIgDgBQgGADgGAGg");
	this.shape_40.setTransform(639.775,212.4);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#282E46").s().p("AgiE6QglgKgmgVIgZgSQgWgTgSgUQgSgUgOgVQgKgOgIgRQgJgSgIgVQgZhUAAhAQgBhBAVg2QAWg1ArgpQA8g0BVgSQASgEARgDIAhgBIAFAAQA0AAAsARQAtAPAlAhQAHAGAGALQAHAKAGAPQAIAUAEAPQADAOAAALQAEAeACAcIABA4IAAAJQAAAPgIAJQgIAJgRADQgJACgUACIgxAAIhuABIg1ACQAAARAHAgQAFAfAMAsQAJAZAJATQAJASAKANQAIAKALAMQAMAKAPAMIADAAIACACIACAAQAQgJANgRQANgSALgcQAJgXAHgMIAJgRQAJgGAKgDQAKgDALAAQARAAALAGQAMAFAHALIAAADIAAAEIAAACQAAAGgJAXQgJAWgTAlQgIAMgKAMQgLANgNALQgdAUglAKQglAKguAAQgmAAgkgLgACFg0IAgABIAAgIQAAgsgDgiQgEgigIgYQgGgOgKgKQgJgLgMgIIgfgOQgMgFgCgBQgbAVgRAXQgQAYgIAaQgGAagFAcQgEAbAAAeIAAACIBEgBIAqAAIAmAAgAhrkGQgVALgXAUQgPAOgIALQgHAMAAAIIAAACQAAAFACADQABACAEABQAHgCAHgGQAGgFAHgLQAAgCAJgKIAbgcQAHgHANgJIAdgVIgDgCIgEgBQgSAEgUALg");
	this.shape_41.setTransform(505.1978,223.35);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#282E46").s().p("AhgGqQgtAAgdgKQgegKgQgUQgHgGgIgKQgIgJgHgNQgPgfgKgcQgLgdgHgaIgIgnQgEgWgCgbQgGg6gCgwQgEguAAgkQAAg8AFg9QAFg9AJg8QANglAOgbQANgbANgRQANgQATgIQASgIAXgBQAMABAUADIAyALIADAAIAEAAIAGAAQAiAAAnAIQAmAIArAQQAxATAhAcQAiAaATAjQAGAOADAMQAEAMAAAJQAAAfgXAgQgXAfgtAhQgjAWgYANQgYANgMAFQACABAqAKQAWAGAWAIIAtASIAxAcQAUAMAHAJQBCA7AABJQAAAhgUAiQgTAhgoAiQgaAVgcARQgcAQgdAMQgUAJgYAHIgzAMQhSARgfAAgAgVA5QACAoAFBFIAAAnQAAAgADAeQACAdAFAcIAEAUIAAAJIACAAQAugKAmgRQAmgSAegZQBCg2AAgwQAAgxglgmQgmgmhJgaQgngNgXgGQgYgGgIgBIgCAAIADA1gAgQkoQAEAXAAAUIgDArIgHBxIAAAFIgCABIABABIABACQAKgDAUgMIA5ghQAhgXAPgWQAQgXAAgUQAAgSgNgTQgMgSgagWQgbgQgWgKQgVgKgRgDIgQgDQAGAYADAXgAjZlwQgJAKgNAUQgJAPgEANQgEANgCAMIgBAFIgCAIQACAIADAEQACAEAFAAQAEABAEgFQADgEAEgKQADgYAGgVQAGgWAKgSIAFgMIACgHIgCAAQgEAAgJAKg");
	this.shape_42.setTransform(440.825,214.175);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#282E46").s().p("AjcGdQgkgQgXgjQgDgEgEgOQgEgOgEgbQgDgHgChGQgChGAAiEIAAgVIgBg1QAAg0AEg7QAEg6AJhBQAGgZAJgTQAJgVAKgQQALgUALgNQAKgNAMgGQAKgHALgCQAMgDANgBQAWAAAcAHQAbAGAjANQAMAEAJAPQAKAQAHAbIAGApQACATAAATIAAABIgBAtQgBAagEAjIAegbQAigYAkgNQAkgNAkAAIAKAAQAaAAAVAIQAWAHASAPQAWARALAyQAKAyAABSQAAApgCBRIgMDKIADBJQAAAIgHAIQgIAGgOAFIgHACIgFABIgSAAQgRAAgSgRQgEgEgBgVQgCgVAAglIANjxIABgaIAAhAQAAh9gaglIgEgBIgGgBQgdAAgbARQgcARgbAjQgRAVgPAfQgQAegOAmIgFASIgCAIIAABhQgDAdgBAzIgEB3QAAAKgEAMQgEAMgJAOQgPAWgZALQgYAKghAAQgzAAgkgRgAjJltIgNAOQgQAXgJAXQgIAZAAAaQAAAGACADQACADAEABQAJgDAFgEQAEgGAAgIQAGggAGgXQAHgWAGgNIAPgUIgFgBIgDgBQgGADgGAGg");
	this.shape_43.setTransform(1130.525,61);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#282E46").s().p("AACGnQgOgDgQgEQgQgHgLgIQgLgIgHgJQgOgLgQggQgPgfgSgzQgLgigEgcQgGgcAAgYIgJhbQgDgrAAgkQAAhUAGhCQAFhCAIgvIAQgnQAHgSAKgRIhIABIhiAEIgFAAQgJAAgJgFQgKgEgGgIIgCgFIAAgDIAAgCQAAgIAIgHQAIgGAQgEQAmgGA7gEQA6gDBQAAIAOAAIATgBQAAABBNABIDpACQARAAALAGQAMAGAHAMIAAAHQAAAKgJAIQgKAHgTAEIiqAAIgEAAQAAAAgBAAQAAAAAAAAQAAAAAAAAQAAABAAAAQAHAhAEAaQAFAaAAATIAAADQgGBLgDA1QgEA1AAAeQAAAhAEAzQACA1AFBJQABA1ACApQADAoAGAaIACAOIAAANIAAAIQAAAMgMANQgNAMgZANQgMAFgRACQgQACgVAAIgagBgAhHlkQgJALgJATQgIALgEANQgFANAAAPIAAAFQABAIACAFQADAFAEABQAEAAADgFIAHgPQAAgMAGgXQAIgWAOgfIABgBIABgEIgBgCIgBgBIgBAAQgIAAgIAKg");
	this.shape_44.setTransform(1069.15,62.075);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#282E46").s().p("AgKFMQg0ABg1gUQgagLgQgKQgRgLgIgJQgUgPgNgYQgOgXgIghIgDgIIgDgKQAAgHAOgMQAJgFAHgCQAJgCAIAAIAFAAQAPAAAMAGQALAGAIAMQAIAcAJATQAJATAKAKQARARASAIQATAJASAAQARgHAMgKQAMgKAJgPIAEgLIADgRQAAghgbgqQgbgqg1g0IhGhKQgcgegMgRQgUgcgKgXQgJgXAAgUIAAgBQAAgNAFgQQAGgRALgSQARgWAZgQQAagPAkgMQAWgGAXgDQAVgDAWAAIADAAQAcAAAfAGQAeAIAiAOQAbAQAQANQAQAMAFAIQAOASAHAWQAIAUAAAWIAAACQAAAYgKANQgJANgTAFIgMABQgPAAgKgGQgLgEgGgMIAAgBIAAgRIAAgJQAAgPgIgQQgFgSgPgTQgFgFgIgHIgUgMIgCgBQgQAGgJANQgHAOAAAVQAAAOANAVQAOATAbAaQAAABAPAQIAwAtQATAVAPARQAQATAKAOQA5BYgBA8IAAAEQABAhgSAeQgRAcgkAaQgnAcgWAEQgdALgcAFQgbAEgaAAgAiJkaQgPAKgUASQgPAOgGALQgHAMAAAIIAAACIgBADQAAALAEAKQAHALAJAHIACAAIABAAQAAgWAJgXQAIgVASgXQAIgHALgIQALgJANgIIAAgCQAAgBgJgBQgNAAgPAIg");
	this.shape_45.setTransform(963.6,71.1);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#282E46").s().p("AgKFMQg0ABg1gUQgZgLgRgKQgQgLgKgJQgSgPgOgYQgNgXgKghIgCgIIgDgKQAAgHAOgMQAIgFAJgCQAIgCAJAAIADAAQAQAAAMAGQAMAGAGAMQAJAcAIATQAKATAKAKQAQARATAIQATAJASAAQARgHANgKQALgKAJgPIAEgLIADgRQAAghgagqQgbgqg2g0IhGhKQgcgegMgRQgUgcgKgXQgKgXAAgUIAAgBQAAgNAHgQQAFgRAMgSQAQgWAZgQQAbgPAigMQAXgGAWgDQAWgDAWAAIADAAQAcAAAfAGQAfAIAgAOQAbAQARANQARAMADAIQAPASAHAWQAIAUAAAWIAAACQAAAYgKANQgIANgUAFIgMABQgPAAgLgGQgLgEgFgMIAAgBIAAgRIAAgJQAAgPgIgQQgFgSgPgTQgFgFgIgHIgVgMIgBgBQgRAGgIANQgHAOAAAVQAAAOANAVQANATAcAaQAAABAPAQIAwAtQAUAVAOARQAQATAKAOQA5BYAAA8IAAAEQAAAhgRAeQgTAcgiAaQgoAcgWAEQgeALgbAFQgbAEgZAAgAiJkaQgQAKgTASQgPAOgGALQgHAMAAAIIAAACIgBADQgBALAGAKQAGALAIAHIADAAIACAAQgBgWAJgXQAIgVATgXQAHgHALgIQAKgJANgIIAAgCQAAgBgIgBQgMAAgQAIg");
	this.shape_46.setTransform(904.95,71.1);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#282E46").s().p("AiUGdQgcgPgMgPQgLgHgMgUQgLgVgNggQgIgSgIgaQgIgagGgjQgIhFgGg1QgEg1AAgkIAAgJQAAhRAEhCQAGhCAIgyQAKgeAKgWQAMgYAMgSQALgQAMgKQAMgJANgEQAGgDAIgBIAOgCIAEAAQAKABAPACQAQACAUAFIA0ADQATABAGACQAGAAAWAGQAXAFAlALQB0AmAzBPQAPAZAIAYQAJAYAAAWQAAAvgTAwQgUAwgmAwQgUAZgVAUQgXAVgVAQIhqBEIAABDQAAANADAbIAIBCIADAPIABAHQAAAOgNANQgMAMgYAMQgOAGgQACQgRADgRABQgdAAglgMgAAGlWIAIA0IACAhIAAAIIgJCBQgCAzAAAbIAAASQgBAcACAcQABAbAEAaQA3ghAOgSQA1gyAag0QAbg0AAg0QAAgXgJgVQgIgVgPgUQgHgKgJgJIgVgUQgYgPgSgIQgUgKgNgDIgZgHIgLgDgAi7lrQgIALgIAQIgMAfQgEARAAAPQAAANACAGQADAHAEAAIADAAIADgCIAEgFQAGgCAEgQQADgPACgcIAIgaQAEgNAGgMQAEgIAAgEIAAAAIgHAAQgIAFgJAKg");
	this.shape_47.setTransform(787.85,62.45);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#282E46").s().p("AgKFMQg1ABg0gUQgagLgQgKQgRgLgJgJQgSgPgOgYQgNgXgKghIgCgIIgCgKQAAgHANgMQAIgFAJgCQAIgCAJAAIADAAQAQAAAMAGQAMAGAGAMQAJAcAIATQAKATAKAKQAQARATAIQASAJATAAQARgHANgKQALgKAIgPIAFgLIADgRQAAghgagqQgcgqg1g0IhGhKQgcgegMgRQgUgcgKgXQgKgXAAgUIAAgBQAAgNAHgQQAFgRAMgSQAQgWAZgQQAbgPAigMQAYgGAVgDQAWgDAVAAIAEAAQAcAAAfAGQAfAIAgAOQAbAQARANQARAMADAIQAPASAHAWQAIAUAAAWIAAACQAAAYgKANQgIANgUAFIgMABQgPAAgLgGQgLgEgFgMIAAgBIAAgRIAAgJQAAgPgIgQQgFgSgPgTQgFgFgIgHIgVgMIgBgBQgQAGgIANQgIAOAAAVQAAAOAMAVQAOATAcAaQAAABAPAQIAwAtQATAVAQARQAPATAKAOQA5BYAAA8IAAAEQAAAhgRAeQgTAcgiAaQgoAcgWAEQgeALgbAFQgbAEgZAAgAiJkaQgQAKgTASQgOAOgHALQgHAMAAAIIAAACIgCADQAAALAGAKQAGALAIAHIADAAIACAAQAAgWAIgXQAIgVATgXQAHgHALgIQAKgJANgIIAAgCQABgBgJgBQgNAAgPAIg");
	this.shape_48.setTransform(688.15,71.1);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#282E46").s().p("AAYFHQgPABgUgFQgWgEgbgKQghgMgcgaQgdgZgZgnQgQgdgOgpQgPgogOgzQgVhagKg+QgKg+AAgfQAAgoAfgwQAageAjgHIAQgCIARAAIAOAAQAgAAAYALQAYANAPAZQAIAQAGASQAHAUAFAYIAQBWIAdCfQATBbAiBMIABAEIAFAKIAGgKIAOgdQAJgSAIgdQAIgeAHgqQALg7AHg9QAHg/ADhAIAJhgQADggABAAQAJgJAKgFQAKgFAPAAQASAAAMAGQANAGAFALIACALQgHBfgGBGQgHBHgFAuQgJBGgLAwQgKAxgKAZQgMAfgNAXQgMAXgOAPQgWAagfANQgfANgoAAgAjPkZQgIAJgKASIgFAVQgBALAAAMQAAAVAFAMQAFANALAEIABAAIADgEIAEgKIAAgFQgCgNgBgLIgBgTQAAgSAFgRQAGgPAKgNIABgCIAAgCIgCgBIgFAAQgHAAgJAJg");
	this.shape_49.setTransform(518.425,71.15);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#282E46").s().p("AgoFDQgagFgYgMQgYgPgNgKQgOgKgEgFQgRgRgRgTQgPgUgOgYQgPgYgMgZQgLgZgHgaIgNgzQgEgVgBgPIABgDIAAgDQAAgnAKgrQAKgsAWgvQALgXATgXQASgYAZgWQARgRAagLQAagMAigGQAwgKAiAAQAbABAbAIQAcAHAdALQAWAOAOAKQANAKAEAGQAnAoAUBIQATBHAABmQAAAkgIAmQgIAngQAoQgNAagNATQgOAUgOAOQgnAkgrATQgsASgvAAQgaAAgbgGgABEjsQgLAOgSAaQgXArgMArQgKAsAAArIAAASQAAA+ARA+QAUA+AmA+IAEADQAfgTANgTQAKgNAHgNQAIgOAGgNQANgiAGgfQAGgfAAgdIAAgpQAAgXgEgeQgDgfgIgnQgGgYgJgUQgIgTgKgPQgFgJgKgJQgIgJgNgIIgEgCIgCAAQgEAAgLANgAhrkMQgUAKgbAWQgPAOgIALQgJALgCAIIAAADIAAAEQABAEABACQABADAFACQAFgBAKgKQAKgJAOgTQANgXA1gkQACAAACgDIAAgCIgBgBIgBgBIgCAAQgMAAgUALg");
	this.shape_50.setTransform(450.5,70.775);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#282E46").s().p("AjvGmQgRgDgTgHQgZgMgTgXQgTgXgNghQgQgogIgWQgIgYAAgHQgIgQgGg9QgFg8gFhnIAAgsQAAhyAShxQALgjANgaQANgaANgRQALgPANgIQANgJAPgDIAUgBQAXAAAcAGQAcAGAhAMQAGACAFAFIAMAKQAVAOARAPQARAOANAPQAVAbAZAiQAYAhAdAqIACAEQAAAAAAAAQAAABAAAAQABAAAAAAQAAAAABAAQBEhrAzg4QA0g4AigGIAXgHQALgCAIAAIAHAAQAbAAAUAKQAVAKAQATQAPAXAIAgQAIAhAAArIAAAgQAADOgDB/QgDCAgEAxQgEAhgEAWQgFAVgEAKQgCAHgJAJQgJAIgPAKIgOAFQgHACgFAAIgHAAQghAAgRgLQgSgKAAgTQAAgxAEh0IALknQABgeAAgfIAAg8IAAgWQAAgbgCgaQgBgbgEgbQgEACgKAMIgdAiIguBBIg0BNQgOATgLALQgLAMgJAEIgQAFQgIACgHAAQgUAAgPgJQgOgJgLgSIgfgrIgyhGIgDgDIAAABIgIBuQgDAuAAAdIAAAHIgBAEIAAACIAAAEIABAEIAAAGQAAAYADA0IAICEIAAAyQAAAOADAaQACAaAHAlIABAPIAAALQAAASgRAMQgIAJgPAHQgOAHgTAFIgUACIgRABQgRAAgSgCgAk9lpQgIALgJATQgIARgEAPQgDAPAAAOIAAAHIABAEQABADACADIAEAAQAIgEAEgJQADgIAAgOQAFgfAFgPQAEgPADAAIAEgHIAIgTIAAgCIgEAAQgHAEgJAMg");
	this.shape_51.setTransform(372.025,61.475);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#282E46").s().p("AgtAuQgUgHgPgQQgFgFgCgGQgDgGAAgHQAAgMAKgKQAKgLAUgIQALgFANgCQANgDANAAQAbAAAWAIQAUAHAPAQQAEAFABAGQADAFgBAFQAAASgRANQgRANgjAIIgPABIgHAAQgZAAgUgHgAgtgaQgHAEgGAJIgCAFIAAADIAAACQAAATASAHIAEgcIAGgHIAMgOIAAgCIgLgCQgHAAgHAEg");
	this.shape_52.setTransform(1228.4393,420.6);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#282E46").s().p("AgtAuQgUgHgPgQQgFgFgCgGQgDgGAAgHQAAgMAKgKQAKgLAUgIQALgFANgCQANgDANAAQAbAAAWAIQAUAHAPAQQAEAFABAGQADAFgBAFQAAASgRANQgRANgjAIIgPABIgHAAQgZAAgUgHgAgtgaQgHAEgGAJIgCAFIAAADIAAACQAAATASAHIAEgcIAGgHIAMgOIAAgCIgLgCQgHAAgHAEg");
	this.shape_53.setTransform(1194.7893,420.6);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#282E46").s().p("AgtAuQgUgHgPgQQgFgFgCgGQgDgGAAgHQAAgMAKgKQAKgLAUgIQALgFANgCQANgDANAAQAbAAAWAIQAUAHAPAQQAEAFABAGQADAFgBAFQAAASgRANQgRANgjAIIgPABIgHAAQgZAAgUgHgAgtgaQgHAEgGAJIgCAFIAAADIAAACQAAATASAHIAEgcIAGgHIAMgOIAAgCIgLgCQgHAAgHAEg");
	this.shape_54.setTransform(1161.1393,420.6);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#282E46").s().p("AgiE6QglgKgmgWIgZgSQgWgRgSgVQgSgUgOgVQgKgOgIgRQgJgSgIgVQgZhUAAhAQgBhBAVg2QAWg1ArgpQA8g0BVgSQASgFARgCIAhgBIAFAAQA0AAAsARQAtAPAlAhQAHAGAGALQAHAKAGAPQAIAUAEAPQADAOAAALQAEAeACAcIABA4IAAAJQAAAPgIAJQgIAJgRADQgJACgUACIgxAAIhuACIg1ABQAAASAHAeQAFAgAMAsQAJAZAJATQAJASAKANQAIAKALAMQAMAKAPAMIADAAIACACIACAAQAQgJANgRQANgSALgcQAJgXAHgMIAJgSQAJgFAKgDQAKgDALAAQARAAALAGQAMAGAHAKIAAADIAAAEIAAACQAAAGgJAXQgJAVgTAmQgIAMgKAMQgLANgNALQgdAUglAKQglAKguAAQgmAAgkgLgACFg0IAgABIAAgIQAAgsgDgiQgEgigIgYQgGgOgKgKQgJgLgMgJIgfgNQgMgGgCAAQgbAVgRAXQgQAYgIAaQgGAagFAcQgEAbAAAeIAAACIBEgBIAqAAIAmAAgAhrkGQgVALgXAUQgPAOgIALQgHAMAAAIIAAABQAAAGACADQABADAEAAQAHgCAHgGQAGgFAHgLQAAgCAJgKIAbgcQAHgHANgJIAdgWIgDgBIgEgBQgSADgUAMg");
	this.shape_55.setTransform(1043.8978,393.35);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#282E46").s().p("AAGG1QglAAgigHQgigJghgQQgbgSgNgXQgOgXAAgbIAAgLQAAgMAHgJQAHgIAQgFIAIgBIAKgBIABAAQASAAALAHQAMAFAGAMQAAAfAIASQAHASARAGQAHAEAKADQAKADANACQAKAAAIgFQAJgFAKgJQAHgGADgRQAEgSAAgfIABgHIABgIIgCgyIgBgbIAAgGQgjAUghAKQgfAKgcAAIgEAAQgiAAgjgMQghgMghgYQgUgOgNgTQgNgTgIgYQgNgxgHgvQgGgugBgtIAAg+QABhwAGhBQAHhAANgRQAIgHAKgDQALgEAKAAQAOAAALAGQALAGAHALIAAAGQgCAAgEA+QgDA/gDB/IAAAYQAABFAJA4QAIA3APArIANAQIAMAOQAUANAPAHQAPAHAJAAIADAAQAOAAAQgGQARgHASgMQAOgKAKgOQAKgPAHgUQAHgYADgWQAEgWAAgSIAAg1QAAhEAFhBQAEhBAJg+QAIglAJgVQAIgWAIgHQAOgMATgIQARgIAWgEIAKgBIAHAAIAMAAQBUAAAeAwQAPARAGAdQAHAeAAArQAAAXgCAuIgFBxIgBAeIAAAmIAAAjIACBdIAAAFQgBA+gFAnQgEAmgEAOQAAAKgFAPQgEAQgKAVQgJANgNANQgMANgQANQgSAMgRAIQgQAIgOAFQgmAMgkAGQgkAFgiAAgADgmKIgCABQAHALAFAOIAKAcQADAYAEAMQADAMADAAQAAACACACIAFAFIACAAQANgHAAgRIAAgCQAAgJgCgJQgDgIgFgIQABgFgGgKQgGgLgNgQIgLgIIgHgCIgDABg");
	this.shape_56.setTransform(973.85,402.775);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#282E46").s().p("AgiE6QglgKgmgWIgZgSQgWgRgSgVQgSgUgOgVQgKgOgIgRQgJgSgIgVQgZhUAAhAQgBhBAVg2QAWg1ArgpQA8g0BVgSQASgFARgCIAhgBIAFAAQA0AAAsARQAtAPAlAhQAHAGAGALQAHAKAGAPQAIAUAEAPQADAOAAALQAEAeACAcIABA4IAAAJQAAAPgIAJQgIAJgRADQgJACgUACIgxAAIhuACIg1ABQAAASAHAeQAFAgAMAsQAJAZAJATQAJASAKANQAIAKALAMQAMAKAPAMIADAAIACACIACAAQAQgJANgRQANgSALgcQAJgXAHgMIAJgSQAJgFAKgDQAKgDALAAQARAAALAGQAMAGAHAKIAAADIAAAEIAAACQAAAGgJAXQgJAVgTAmQgIAMgKAMQgLANgNALQgdAUglAKQglAKguAAQgmAAgkgLgACFg0IAgABIAAgIQAAgsgDgiQgEgigIgYQgGgOgKgKQgJgLgMgJIgfgNQgMgGgCAAQgbAVgRAXQgQAYgIAaQgGAagFAcQgEAbAAAeIAAACIBEgBIAqAAIAmAAgAhrkGQgVALgXAUQgPAOgIALQgHAMAAAIIAAABQAAAGACADQABADAEAAQAHgCAHgGQAGgFAHgLQAAgCAJgKIAbgcQAHgHANgJIAdgWIgDgBIgEgBQgSADgUAMg");
	this.shape_57.setTransform(868.2478,393.35);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#282E46").s().p("ADjFPQgMABgJgFQgKgEgHgKQgEgCgCgKQgBgLAAgQQgCgXgDhIQgChHgBh1IAFiLQgBgzgIgdQgJgegUgKIgIAAQgXAAgTAJQgVAJgOASQgVAWgOAkQgOAlgJAzQgFAcgCAsQgDArgBA7IAEBFIAHBzIAAADIACADQgJARgLAKQgKALgQAGIgcAGQgMACgLAAQgwAAg6gtQgUgWgXg7QgMgmgHgmQgGglAAgkIgGg9QgBgeAAgeQAAghACgmQACglAGgoQAGgdAIgUQAIgUAIgMQATgWAcgLQAegKAnAAQAdgBAYALQAZAJAUAWIAJASIALgGIAdgTQAYgNAagFQAcgHAcAAIAEAAQApAAAeAQQAeAQATAeQAKASAGAcQAFAdAAAoIAAAHIgCBbIgBAjIAAApQABBHABBDQAABEAFA+IAAASQgHAMgLAGQgKAGgPgBgAjLkQQgIAMgKAZIgGATQgCAKAAALQABAMADAGQADAGADAAIACAAQAJgDAEgGQAFgIABgLQABgZADgQQACgPADgGIADgJIAEgMIgDgCIgEgBQgFAAgJANg");
	this.shape_58.setTransform(803,392.45);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#282E46").s().p("AgoFDQgZgFgZgMQgYgPgNgKQgOgKgEgFQgSgRgPgTQgQgUgOgYQgQgYgLgZQgLgZgHgaIgNgzQgEgVgBgPIABgDIAAgDQAAgnAKgrQAKgsAVgvQAMgXATgXQASgYAYgWQATgRAZgLQAbgMAhgGQAxgKAhAAQAbABAbAIQAcAHAcALQAYAOANAKQANAKAEAGQAnAoAUBIQATBHAABmQAAAkgIAmQgIAngQAoQgNAagNATQgOAUgPAOQgmAkgsATQgrASgvAAQgaAAgbgGgABEjsQgLAOgSAaQgWArgNArQgKAsAAArIAAASQAAA+ARA+QATA+AmA+IAFADQAfgTANgTQAKgNAHgNQAIgOAGgNQAMgiAHgfQAGgfAAgdIAAgpQAAgXgEgeQgEgfgHgnQgHgYgIgUQgIgTgJgPQgGgJgKgJQgJgJgMgIIgEgCIgCAAQgEAAgLANgAhrkMQgUAKgbAWQgPAOgIALQgJALgBAIIAAADIAAAEQgBAEACACQABADAFACQAFgBAKgKQAJgJAPgTQAOgXA0gkQADAAACgDIAAgCIgCgBIgBgBIgCAAQgMAAgUALg");
	this.shape_59.setTransform(735.15,392.175);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#282E46").s().p("ACHGiIgVgNQgMgJgPgNIgVAOIgPALQgWALgXAFQgWAGgbAAQgZAAgcgHQgbgFgggNQgugXgdgWQgdgYgXglQgXgkgQgvQgLgjgGghQgFggAAggIAAgIIAAgFIAAgFIAAgGQAAhuBGheQAIgMANgMQANgMARgOQApgaAZgGQAXgIAUgFQAUgEARAAIAJAAQAfAAAdAKQAdAIAdASQAEgrAEgbQAFgZAFgIQAIgVAJgTQAJgSAJgOQAQgYASgMQAUgMAXAAIAFAAQAWAAAcAHQAcAGAjAOQAIAEAGAGQAGAIADAJQALAeAGAdQAFAdAAAeIgLCxIAAAxIAAA6IADBuQgEAfgCA0IgEB9QAAALgIAOQgGAOgNAQQgKAKgNAIQgOAHgRADIgOADIgRABQgnAAgogNgAhwitQgVAJgZAQQgOANgNAQQgNAQgLATQgSAlgJAjQgKAjAAAhIAAAMQAAAtAIAoQAHAnAPAjQAGASAKASQAKASAOASQAHAIAMALIAdAWQARAKANAGQANAGAHABIAWAFIAPABQAUAAASgNQASgOASgaQABgBAEgFIANgSQgEgcgBg2QgCg1AAhMIAAhEIgChDQgBgXgEAAQgIgUgIgQQgJgOgJgMQgPgWgTgKQgTgLgVABQgUgBgVAJgAD5l6IgBAAIAAAHQASAkAAAfQACAaAEANQAEAOAFAAQAIgCAEgFQAFgGAAgJIAAgbQAAgUgIgTQgIgTgPgRQgJgEgFAAIgEABg");
	this.shape_60.setTransform(662.075,382.8);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#282E46").s().p("ABzGzQg1AAgtgNQgtgNgngaQgdgWgRgTQgTgTgKgSQgHgHgGgSQgJgRgIgbQgDgIgDgnQgCgnAAhGIAAh+IAAgrIABhQIgugBIgogBQgPAAgKgFQgKgFgGgLIAAgGQABgIAHgGQAIgGANgEQAJgCAagBQAagCArgBIAEgWIAFgqQAMgjANgZQAMgaANgRQAOgTASgKQARgKAUAAIAFAAQAXAAAdAGQAdAHAgANQAOAGAKAWQAKAWAHAoQACAMABAQQACAQAAAUIAAAKIgCAOIAcAAQAsAAAYABQAZACAFACQANAGAFAGQAGAGAAAGIAAADQAAAKgKAHQgJAHgTAEIhPAAIgkAAQgCARgCAgIgDBOIABA2IADBxQgFA9AAAXIAAArQAAAtAIAdQAGAcAPALQAFAFAFABQAFADAGAAQAQAAAKgJQAKgJAFgSQADgGADgOIAFgmQABgOAHgKQAIgJAQgFIAJgBIAEAAIALAAQANAAAKAFQAKAGAIAKIABAEIAAAFQABAfgIAcQgIAcgOAaQgUAaglANQglANg4AAgAhSlzIgPAZIgMAaIgDAXIgCAMIAAABQAAAJACAJQACAJAFAJIADACQAIgIAThJIAMgnIAHgXIAAgCIAAgBIgEgBQgJAAgNAWg");
	this.shape_61.setTransform(544.75,382.975);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#282E46").s().p("AAGBAIgGAAQgQAAgKgFQgLgGgEgIQgFgKgBgPQgCgOAAgVQAAgUAIgMQAIgMAPgCQAagFAPAGQAPAFAFAQIAFA0IACAUQgBAMgKAIQgKAHgTAEIgEAAg");
	this.shape_62.setTransform(495.025,344.3036);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#282E46").s().p("ADiFPQgLABgJgFQgJgEgIgKQgEgCgCgKQgCgLAAgQQgCgXgChIQgChHgBh1IAFiLQAAgzgJgdQgKgegSgKIgJAAQgXAAgUAJQgTAJgQASQgUAWgOAkQgPAlgIAzQgFAcgCAsQgDArAAA7IADBFIAHBzIAAADIACADQgIARgLAKQgMALgPAGIgbAGQgNACgLAAQgwAAg6gtQgTgWgYg7QgNgmgFgmQgHglAAgkIgGg9QgBgegBgeQABghACgmQACglAFgoQAHgdAIgUQAIgUAJgMQASgWAdgLQAdgKAnAAQAcgBAZALQAZAJAUAWIAIASIAMgGIAdgTQAZgNAZgFQAcgHAdAAIADAAQAqAAAdAQQAeAQASAeQAMASAEAcQAHAdAAAoIAAAHIgCBbIgCAjIAAApQAABHACBDQABBEADA+IAAASQgGAMgLAGQgLAGgOgBgAjLkQQgHAMgLAZIgGATQgCAKAAALQACAMACAGQACAGAFAAIABAAQAJgDAEgGQAGgIAAgLQABgZADgQQACgPADgGIADgJIAEgMIgDgCIgEgBQgFAAgJANg");
	this.shape_63.setTransform(446.9,392.45);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#282E46").s().p("AgKFNQg0AAg1gUQgagLgQgLQgQgKgJgJQgUgPgNgXQgOgYgIghIgDgIIgDgKQAAgHAOgMQAJgFAIgCQAIgCAIAAIAFAAQAQAAALAGQALAGAIAMQAIAbAJAUQAJATAKAKQARAQASAJQATAIASAAQARgFAMgLQAMgJAJgQIAEgLIADgRQAAghgbgqQgbgqg1gzIhGhLQgcgegMgRQgUgcgKgXQgJgXAAgTIAAgCQgBgNAHgQQAFgRALgSQARgWAZgQQAagQAkgLQAXgGAWgEQAVgCAWAAIADAAQAcAAAfAGQAeAIAiAOQAbARAQALQARANAEAIQAOASAHAWQAIAUAAAWIAAACQAAAYgKANQgJANgTAFIgMABQgPAAgKgGQgLgEgGgMIAAgBIAAgRIAAgJQAAgPgIgQQgFgSgPgTQgEgFgJgGIgVgNIgBgBQgQAGgJANQgHAOAAAVQAAAOANAVQAOAUAbAZQgBABAQAQIAwAtQATAVAPARQAQATAKAOQA4BYAAA8IAAAEQABAhgSAeQgSAcgiAaQgoAbgWAFQgdALgcAFQgcAEgYABgAiJkaQgQAKgTASQgPAOgGALQgHAMAAAIIAAADIgBACQAAALAEAKQAGAKAJAIIADAAIABAAQAAgWAJgXQAJgVARgXQAIgHALgIQALgJANgIIAAgBQgBgCgIgBQgMAAgQAIg");
	this.shape_64.setTransform(382.75,392.5);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#282E46").s().p("Ah7GuQgxABglgRQgkgSgXgiQgDgGgEgNQgEgNgEgTQgDgZgCg3QgCg2AAhUIAAi9QADhRAFgxQAEgxAGgRQAsiKBGAAIAHAAQAXAAAcAHQAcAGAhAMQAIADAHAIQAGAHAFAKQAFAJAFATIAJAxIADAnQgMCNAABrIABAPQAAAGACADIAwgZQAUgOAPgMQAdgWAhg2QAjg/ABgPQAGgVAKgJQAQgIAPAAQAOAAALAFQALAFAFAIIACAEIAAADIAAACQAAAMgEATQgDASgIAZQgMAZgPAXQgPAWgRAVQgJAMgSAQQgRAPgbASIgnAWQgUAMgZALIAxAVQAeARATAOQAVAOAMANQAVATARAYQASAXAQAdQAOAcAMAmQALAmAIAuIAAACIABAEIgBADQgFAJgJAFQgKAFgOABIgQAAIgPgEQgIgCgGgIQgGgIgEgMQgOg7gRgqQgRgpgSgYQgVgXgRgRQgRgQgRgKQgMgJgQgIQgPgJgSgIIgIDeQAAARgKASQgKARgUARQgPALgRAEQgRAGgUAAIgEgBgAjClnQgHAFgJALQgOAWgHAVQgIAVABAVIAAAJIAAAJQAAABABAAQAAABABAAQAAABABAAQAAAAAAAAIAEAAQAFgCAFgHQAGgHAFgNIAZhHIAIgZIgDgCIgDgBIgBAAQgEAAgGAGg");
	this.shape_65.setTransform(1143.45,229.7504);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#282E46").s().p("AhTFQQgvAAgjgVQgjgTgYgmQgJgLgHgfQgHgggFgzQgDgVAAgiQgCggAAguIABg5IABgmIgCgvIAAgdIAAg5QAAgjAQgYQAPgXAfgLQAGgFALgCQALgCANgCIAQgCIAQgBQAbAAAXAKQAYAKAUATIAFAIQADAGACAGIABAAQAUgRAagNQAagMAfgHIAVgCIAUgBQAfAAAZAJQAZAIARASQAKAJAHAPQAHAPAFAUIADAMIABAGQAAAMgKAIQgJAIgSAFIgGABIgFAAIgFAAQgPAAgMgHQgKgFgHgMQgEgfgJgPQgIgQgNAAQgcAAghAYQgJAJgGAKQgHALgFAMQgIAPgIAgQgJAhgGAyIgEAVIgBAVIAFC6IAEB+QAAARgHAMQgHAMgPAFQgIAEgQABQgPADgYAAgAjAkjQgKALgMAWQgHASgEAOQgDAPAAAIQAAAIACAJIAJAPIABABQAKgIADgKQADgJABgKIAIgiIAIgZIALgWIAFgKIAAgCIgCgBIgEAAQgIAAgLAKg");
	this.shape_66.setTransform(1076.45,241.55);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#282E46").s().p("AgoFDQgZgFgZgMQgYgPgOgKQgNgKgFgFQgQgRgQgTQgQgUgPgYQgOgYgMgZQgLgZgIgaIgLgzQgFgVgBgPIABgDIAAgDQAAgnAKgrQAKgsAVgvQAMgXASgXQATgYAYgWQATgRAZgLQAbgMAhgGQAwgKAjAAQAaABAbAIQAcAHAcALQAYAOANAKQANAKAEAGQAnAoAUBIQATBHAABmQAAAkgIAmQgHAngRAoQgNAagOATQgNAUgPAOQgnAkgqATQgsASgvAAQgbAAgagGgABEjsQgLAOgSAaQgWArgNArQgKAsAAArIAAASQAAA+ASA+QASA+AmA+IAFADQAegTAOgTQAKgNAHgNQAIgOAGgNQAMgiAHgfQAGgfAAgdIAAgpQAAgXgEgeQgDgfgIgnQgHgYgIgUQgIgTgKgPQgFgJgJgJQgKgJgMgIIgEgCIgBAAQgFAAgLANgAhrkMQgUAKgbAWQgOAOgJALQgIALgCAIIAAADIAAAEQAAAEABACQABADAEACQAGgBAKgKQAJgJAPgTQAOgXA0gkQACAAADgDIAAgCIgCgBIgCgBIgBAAQgMAAgUALg");
	this.shape_67.setTransform(1009.35,240.775);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#282E46").s().p("ACWFHQgagIgUgOQgOgJgKgLQgKgKgGgLQgGgJgGgOIgLgdIgBAAQgIATgJAQQgJAPgJALQgYAbgkAOQgjANgrAAQgeAAgbgGQgcgHgagOQgVgMgMgMQgOgNgIgMQgOgUgNgcQgPgcgNgjQgOglgRg9QgRg7gShUQgLg2gFgnQgGgoAAgYIAAgMQABgOADgKQAFgKAHgFQAKgLAYgGQAYgGAlgBQAtAAAfAQQAfAQAQAdQAJAPAHARQAGAPAEARIAPBLIAXCEQARBNAQA1QASAzAQAdIAHAKIAEADIACAAQAIgQAGgSQAHgTAFgVQARhPAIg2QAJg0AAgdQAAgRAGgTQAGgTALgWQAGgIAJgFQAJgIAPgDIAOgEIAMAAIAHAAQAXAAARAIQARAIANARQAJAMAFAaQAEAbAAAoQAKBQAJA5QAJA4AKAjQADARAEANQAFAMAEAIIABABIACADQAFgDAGgMQAHgKAHgTQAOgoAIgXQAHgXABgIQAGgbAGgrQAGgrAFg8QAIhPAIg8QAJg9AKgrQANgWAfABIAEAAQAOgBAKAGQALAEAHAJIACAHQABACAAADQgIA6gKBRIgVC3QgHAugHAjQgHAkgIAbQgOApgOAdQgOAdgNAQQgOARgRALQgQALgUAEQgWAGgagBQgdAAgZgGgAmJkjIgEAEQgFAGgDAIQgCAIAAALIAAADQAAAaAJAWQAHAVARASIAEACQACAAACgEQACgFAAgKIAAgCQAAgJgDgRIgKgoIgCgqIgCgBIgEgBIgDAAQgDAAgCACg");
	this.shape_68.setTransform(929.5,241.55);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#282E46").s().p("AgiE7QglgLgmgWIgZgSQgWgSgSgTQgSgVgOgWQgKgNgIgRQgJgRgIgWQgZhTAAhBQgBhBAVg1QAWg2ArgqQA8gzBVgSQASgFARgBIAhgCIAFAAQA0AAAsARQAtAQAlAgQAHAHAGAKQAHALAGAOQAIAUAEAOQADAQAAAKQAEAeACAdIABA3IAAAKQAAAOgIAJQgIAJgRADQgJACgUABIgxABIhuACIg1ABQAAASAHAeQAFAgAMAsQAJAZAJASQAJATAKANQAIAKALALQAMALAPAMIADABIACABIACAAQAQgJANgRQANgSALgcQAJgWAHgNIAJgSQAJgFAKgDQAKgDALAAQARAAALAGQAMAGAHAKIAAAEIAAADIAAABQAAAHgJAXQgJAVgTAmQgIANgKAMQgLAMgNALQgdAUglAKQglAKguAAQgmAAgkgKgACFg0IAgABIAAgIQAAgsgDgiQgEgigIgYQgGgNgKgMQgJgKgMgJIgfgNQgMgGgCAAQgbAVgRAYQgQAXgIAaQgGAagFAcQgEAbAAAeIAAACIBEgBIAqAAIAmAAgAhrkGQgVALgXAUQgPAPgIALQgHALAAAIIAAABQAAAGACADQABACAEAAQAHgBAHgGQAGgFAHgKQAAgDAJgKIAbgdQAHgGANgJIAdgWIgDgBIgEgBQgSADgUAMg");
	this.shape_69.setTransform(807.0478,241.95);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#282E46").s().p("AjcGdQgkgQgXgjQgDgEgEgOQgEgOgEgaQgDgIgChGQgChGAAiEIAAgWIgBg0QAAg0AEg7QAEg6AJhCQAGgXAJgUQAJgUAKgSQALgTALgNQAKgNAMgGQAKgHALgCQAMgEANAAQAWAAAcAHQAbAGAjANQAMAEAJAPQAKAQAHAbIAGApQACATAAATIAAABIgBAtQgBAagEAjIAegbQAigYAkgNQAkgNAkAAIAKAAQAaAAAVAIQAWAHASAPQAWARALAyQAKAyAABSQAAApgCBRIgMDKIADBJQAAAIgHAIQgIAGgOAFIgHACIgFABIgSAAQgRAAgSgRQgEgEgBgVQgCgVAAglIANjxIABgaIAAhAQAAh9gaglIgEgBIgGgBQgdAAgbARQgcARgbAjQgRAVgPAfQgQAegOAmIgFASIgCAIIAABhQgDAegBAyIgEB3QAAAKgEAMQgEAMgJAOQgPAWgZALQgYAKghAAQgzAAgkgRgAjJltIgNAOQgQAWgJAYQgIAZAAAaQAAAGACADQACADAEABQAJgCAFgGQAEgFAAgIQAGggAGgWQAHgXAGgNIAPgUIgFgBIgDgBQgGADgGAGg");
	this.shape_70.setTransform(739.325,231);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#282E46").s().p("ABzGzQg1AAgtgNQgtgNgngaQgdgWgRgTQgTgTgKgSQgHgHgHgSQgIgRgIgbQgDgIgCgnQgDgnAAhGIAAh+IAAgrIABhQIgugBIgogBQgPAAgKgFQgKgFgGgLIAAgGQABgIAHgGQAHgGAPgEQAIgCAagBQAagCArgBIAEgWIAFgqQAMgjANgZQAMgaANgRQAOgTASgKQARgKAUAAIAFAAQAYAAAcAGQAcAHAiANQANAGAKAWQALAWAFAoQADAMABAQQACAQAAAUIAAAKIgCAOIAdAAQArAAAYABQAZACAFACQAMAGAGAGQAGAGAAAGIAAADQAAAKgKAHQgJAHgTAEIhPAAIglAAQgCARgBAgIgDBOIABA2IADBxQgFA9AAAXIAAArQAAAtAHAdQAHAcAPALQAFAFAFABQAFADAGAAQAQAAAKgJQAKgJAFgSQADgGADgOIAGgmQAAgOAHgKQAIgJAQgFIAIgBIAGAAIAKAAQANAAAKAFQAKAGAIAKIABAEIAAAFQABAfgIAcQgHAcgPAaQgUAaglANQglANg3AAgAhSlzIgPAZIgMAaIgDAXIgCAMIAAABQAAAJACAJQACAJAFAJIADACQAJgIAShJIAMgnIAHgXIAAgCIAAgBIgEgBQgJAAgNAWg");
	this.shape_71.setTransform(665.45,231.575);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#282E46").s().p("ABzGzQg1AAgtgNQgsgNgogaQgdgWgSgTQgSgTgKgSQgGgHgIgSQgHgRgIgbQgFgIgBgnQgDgnAAhGIAAh+IAAgrIAChQIgvgBIgogBQgPAAgKgFQgKgFgFgLIAAgGQAAgIAIgGQAGgGAPgEQAJgCAZgBQAZgCAsgBIAEgWIAFgqQAMgjANgZQAMgaANgRQAOgTASgKQARgKAUAAIAEAAQAZAAAbAGQAdAHAiANQAOAGAKAWQAJAWAGAoQAEAMABAQQABAQAAAUIAAAKIgBAOIAcAAQArAAAYABQAYACAHACQALAGAHAGQAFAGAAAGIAAADQAAAKgKAHQgKAHgSAEIhPAAIglAAQgBARgCAgIgCBOIABA2IABBxQgDA9AAAXIAAArQAAAtAGAdQAIAcAPALQAEAFAFABQAFADAFAAQARAAAKgJQAKgJAFgSQADgGACgOIAHgmQgBgOAJgKQAHgJAQgFIAIgBIAGAAIAKAAQANAAAKAFQAKAGAIAKIACAEIAAAFQAAAfgIAcQgHAcgPAaQgUAaglANQgmANg2AAgAhSlzIgPAZIgLAaIgFAXIgBAMIAAABQAAAJACAJQACAJAFAJIADACQAIgIAShJIAOgnIAGgXIAAgCIgBgBIgDgBQgIAAgOAWg");
	this.shape_72.setTransform(553.7,231.575);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#282E46").s().p("AhjFNQguAAglgTQgmgSgfglQgJgLgJgSIgRgnQgSg3gJhEQgJhEAAhOIAAgfQAAhGAIgyQAJgyASgeQAHgHAJgEQAJgDAMAAIACAAQANAAAJAEQAJAEAHAIQAAAAAAABQABAAAAABQAAAAAAABQABABAAAAIABAHQgSB3AABWQAABWAJBEQAJBGATA1QASAsAYAVQAXAWAcAAIAFAAQAaAAATgaQASgaAMg0QAFgQAFgcIAHhEQAMifAJhQQAJhQAFAAQAGgTALgOQAKgPANgJQALgGATgEQAUgDAbAAIAVAAQAsAAAeAKQAeALAQAVQALAOALAgIAEATQACAIAAAGIgEBCIgMCmIgDB+QAAAzgCAdQAAAggFAVQgFAVgMALQgfATgjAAIgKAAQgyAAgjgYQgjgYgUgwQgKAVgKAPQgLAPgKAJQgXATgcAKQgdAJgjAAgADgkgIgCABQAJAQADAKQAEAKAAAFIAIAxIAFAaIADADIACAAQARgNAAgYQAAgTgHgTQgIgTgOgTIgJgGQgDgCgDAAIgEAAg");
	this.shape_73.setTransform(484.175,240.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15,p:{x:258.975}},{t:this.shape_14,p:{x:313.7478}},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10,p:{x:578.7478}},{t:this.shape_9},{t:this.shape_8,p:{x:739.0978}},{t:this.shape_7,p:{x:802.125}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4,p:{x:1051.625,y:72.325}},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_25},{t:this.shape_14,p:{x:381.4978}},{t:this.shape_24},{t:this.shape_7,p:{x:538.875}},{t:this.shape_23},{t:this.shape_10,p:{x:646.5478}},{t:this.shape_22},{t:this.shape_21,p:{x:808.625,y:65.725}},{t:this.shape_20},{t:this.shape_8,p:{x:918.7478}},{t:this.shape_4,p:{x:983.875,y:72.325}},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16}]},1).to({state:[{t:this.shape_15,p:{x:378.025}},{t:this.shape_14,p:{x:432.7978}},{t:this.shape_32},{t:this.shape_7,p:{x:590.175}},{t:this.shape_31},{t:this.shape_10,p:{x:697.8478}},{t:this.shape_30},{t:this.shape_29},{t:this.shape_21,p:{x:941.825,y:65.725}},{t:this.shape_28},{t:this.shape_8,p:{x:1056.4978}},{t:this.shape_27},{t:this.shape_26}]},1).to({state:[{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_21,p:{x:571.925,y:65.725}},{t:this.shape_10,p:{x:624.0978}},{t:this.shape_48},{t:this.shape_47},{t:this.shape_7,p:{x:842.825}},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_8,p:{x:1198.2478}},{t:this.shape_42,p:{x:440.825,y:214.175}},{t:this.shape_41},{t:this.shape_4,p:{x:570.325,y:223.725}},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33,p:{x:1112.55,y:212.975}}]},1).to({state:[{t:this.shape_42,p:{x:413.475,y:232.775}},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_21,p:{x:331.675,y:387.125}},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_33,p:{x:1105.8,y:382.975}},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1554,474.8);


(lib.report = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#E6DFDE").ss(11.3).p("EgjDAAAMBGHAAA");
	this.shape.setTransform(0.025,130);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#E6DFDE").ss(11.3).p("EgjDAAAMBGHAAA");
	this.shape_1.setTransform(0.025,158.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#E6DFDE").ss(11.3).p("EgjDAAAMBGHAAA");
	this.shape_2.setTransform(0.025,187.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#E6DFDE").ss(11.3).p("EgjDAAAMBGHAAA");
	this.shape_3.setTransform(0.025,216.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#E6DFDE").ss(11.3).p("EgjDAAAMBGHAAA");
	this.shape_4.setTransform(0.025,245.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#48848A").s().p("ABOEDQg0gBgogOQgpgOgXgiQgZgjAAg7IAAhfIg5AAQgIABgGgHQgFgFAAgHIAAhZQAAgIAFgFQAGgGAIAAIA5AAIAAh2QAAgIAHgHQAFgFAIgBIB/AAQAIABAFAFQAHAHAAAIIAAB2IBbAAQAIAAAGAGQAGAFAAAIIAABZQAAAHgGAFQgGAHgIgBIhbAAIAABRQAAARAHAJQAIAKAPAAIBDAAQAIAAAGAGQAFAGABAHIAABgQgBAIgFAFQgGAHgIAAg");
	this.shape_5.setTransform(114.1,40.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#48848A").s().p("AiTC9QgHAAgGgGQgHgFAAgIIAAlTQAAgIAHgFQAGgGAHAAIB/AAQAIAAAHAGQAFAFAAAIIAAAaQAYgVAbgMQAcgMAiAAIAjAAQAIAAAGAGQAFAFAAAIIAAByQAAAIgFAGQgGAGgIAAIheAAQgVAAgMAKQgKAMAAAUIAACjQAAAIgHAFQgEAGgIAAg");
	this.shape_6.setTransform(77.55,47.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#48848A").s().p("AhwCyQgvgSgYgkQgYglgEg1IAAhDQAEg2AagkQAagkAugSQAtgTBAAAQA/AAAuATQAuASAaAkQAaAkAEA2QABAQAAARQAAASgBAQQgEA1gYAlQgZAkguASQgvAThBAAQhCAAgugTgAgZhCQgGALgBAZIAAA9QABAaAGALQAFAMAUAAQAUAAAFgMQAFgLACgaIAAg9QgCgYgFgMQgFgNgUAAQgUAAgFANg");
	this.shape_7.setTransform(34.25,47.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#48848A").s().p("AjAEGQgHAAgGgGQgHgGAAgIIAAncQAAgIAHgGQAGgGAHAAIB8AAQAIAAAGAGQAGAGgBAIIAAAWQATgWAZgNQAagOAlAAQAhAAAbAJQAaAJAVAUQAVAUAMAgQANAhABAtIAAA6QAAAogNAhQgNAggUAUQgWAVgaAKQgbAKghAAQgeAAgZgKQgXgKgSgYIAACbQABAIgGAGQgGAGgIAAgAgWh+QgIAFgDAKQgEALgBALIAAA2QABANAFAHQADAHAIAFQAHAEANAAQANAAAHgEQAIgFACgKQAEgJACgOQACgYgCgYQgCgNgEgJQgCgKgIgFQgHgFgNAAQgOAAgHAFg");
	this.shape_8.setTransform(-12.8,54.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#48848A").s().p("AiWCWQg5gwAAhlIAAgEQACg+AagsQAZgrAvgWQAvgWA8AAQBHAAAuAcQAuAbAWAtQAXAsgBA1IAAAWQABAIgGAGQgHAGgHAAIjYAAIAAAEQAAANACALQADAJAGAGQAHAFAKAAIAHgBIAHgFIAHgHQAFgGAGgDQAEgBAIAAICKAAQAIAAAEAEQAFAEgBAIQgBAOgMATQgLATgZASQgYATglAMQglAMgyAAQheAAg5gvgAgPhZQgGAFgDAKQgEAKAAAQIAAABIA6AAIAAgBQAAgOgEgMQgDgKgHgFQgGgFgKAAQgIAAgHAFg");
	this.shape_9.setTransform(-59.9,47.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#48848A").s().p("ABGD/QgPAAgGgIQgHgFgDgHIg+iLIgeAAIAACLQAAAJgFAFQgHAGgIAAIiOAAQgIAAgGgGQgFgGgBgIIAAnVQABgIAFgGQAGgGAIAAIDXAAQBoAAA8AvQA6AxAABRQABAxgXAjQgXAlgiAVIBaCmQADAFAAADQgBAGgFAFQgEAFgGAAgAg1gpIA1AAQAQAAAIgMQAJgLAAgOQAAgPgIgNQgHgMgSAAIg1AAg");
	this.shape_10.setTransform(-107.15,41.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#48848A").s().p("Ah9ECQgHAAgFgEQgEgEAAgHIAAgDIAAgEIA7iMIiNlLIgBgFQACgHAFgFQAEgFAIAAIB7AAQAKAAAGAFQAEAFADAHIA7CmIA9imQADgGAGgGQAFgFALAAIB6AAQAHAAAEAEQAGAGAAAFIgBAHIjNHcQgDAGgGAGQgGAFgKAAg");
	this.shape_11.setTransform(154.875,-32.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#48848A").s().p("ABPECQg0AAgpgOQgogNgZgjQgYgjAAg7IAAhfIg5AAQgIAAgGgFQgFgGAAgIIAAhYQAAgHAFgGQAGgGAIAAIA5AAIAAh3QABgIAFgFQAGgHAIABIB/AAQAHgBAGAHQAHAFAAAIIAAB3IBbAAQAIAAAGAGQAGAGgBAHIAABYQABAIgGAGQgGAFgIAAIhbAAIAABQQAAASAHAJQAIAJAPAAIBDAAQAIABAFAFQAHAGgBAJIAABfQABAHgHAHQgFAFgIAAg");
	this.shape_12.setTransform(111.6,-46.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#48848A").s().p("AhAERQgIAAgGgGQgGgGAAgHIAAlTQAAgIAGgGQAGgGAIABICBAAQAIgBAGAGQAGAGAAAIIAAFTQAAAGgGAHQgGAGgIAAgAg8iRQgIAAgGgFQgGgGAAgJIAAhYQAAgHAGgGQAGgGAIAAIB6AAQAIAAAFAGQAGAGAAAHIAABYQAAAJgGAGQgFAFgIAAg");
	this.shape_13.setTransform(80.975,-48);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#48848A").s().p("AhdC6QgkgKgYgRQgXgQgKgSQgMgSAAgOQAAgJAFgFQAFgGAHAAICCAAQAKABAHAFQAHAGAJAEQAJAGAJAAQAHAAAFgDQAFgDAAgFQAAgGgEgGQgDgEgPgHQgQgFglgGQgfgGghgOQgfgQgSgXQgUgYAAgmQAAgfAVgcQAVgdAqgSQAogSA8gBQAtAAAjALQAiAKAZAQQAYAPANATQAOASAAAPQABAJgFAGQgFAFgHAAIh6AAQgKABgIgGIgQgLQgJgGgJABQgFgBgFAEQgFADAAAFQAAAGAFAFQAEAGAQAEQAQAGAmAFQA1AIAfATQAfAUAOAZQANAZAAAYQAAAmgXAeQgYAcguAPQguAOhAAAQg0AAglgKg");
	this.shape_14.setTransform(47.775,-39.65);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#48848A").s().p("AiTC9QgIAAgGgGQgFgGAAgHIAAlTQAAgHAFgHQAGgFAIAAIB/AAQAIAAAHAFQAFAHAAAHIAAAaQAXgVAcgMQAdgMAhAAIAjAAQAHAAAGAFQAHAGgBAIIAAByQABAIgHAGQgGAGgHAAIhfAAQgVAAgLAKQgLALAAAVIAACjQAAAHgGAGQgEAGgJAAg");
	this.shape_15.setTransform(8.6,-39.625);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#48848A").s().p("AiWCWQg4gvgBhmIAAgEQACg/AagrQAagrAugVQAugXA9AAQBHAAAuAcQAvAcAVAsQAXAtgBA0IAAAXQAAAHgFAGQgHAGgHAAIjYAAIAAADQAAARACAIQADAKAGAFQAHAFAKAAQADAAAEgCIAHgEIAGgHQAFgGAHgDQADgBAJAAICKAAQAHAAAFAEQAFAFgBAHQAAANgNAUQgMATgYASQgZATgkAMQgkAMg0gBQheAAg4gugAgPhZQgGAFgEAKQgDALAAAQIAAAAIA5AAIAAAAQAAgQgDgLQgEgKgGgFQgHgFgJABQgIgBgHAFg");
	this.shape_16.setTransform(-34,-39.65);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#48848A").s().p("Ag5C9QgLAAgFgGIgIgMIiMlRIgBgFQAAgHAFgFQAFgFAIAAIB7AAQAKAAAGAFQAFAGADAGIA5CqIA6iqQADgGAFgGQAFgFALAAIB7AAQAIAAAFAFQAFAGAAAGIgBAFIiMFRIgIAMQgFAGgLAAg");
	this.shape_17.setTransform(-78.175,-39.625);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#48848A").s().p("AhAERQgIAAgGgGQgGgHAAgGIAAlTQAAgIAGgGQAGgGAIABICBAAQAIgBAGAGQAGAGAAAIIAAFTQAAAHgGAGQgFAGgJAAgAg9iRQgIAAgFgFQgGgGAAgJIAAhYQAAgHAGgGQAFgGAIAAIB6AAQAIAAAGAGQAGAGAAAHIAABYQAAAJgGAGQgGAFgIAAg");
	this.shape_18.setTransform(-112.875,-48);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#48848A").s().p("AjYD/QgIAAgFgGQgGgGAAgIIAAnVQAAgIAGgGQAFgGAIAAIDSAAQBEAAA1AXQA1AWAiAtQAgAsACBCIAABsQgDBFgeAsQgfAtg1AVQg0AWhFAAgAg1BxIAvAAQAPAAANgGQANgHAIgNQAIgNAAgUIAAhsQgBgegSgOQgRgOgZAAIgrAAg");
	this.shape_19.setTransform(-150.875,-46.175);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#48848A").s().p("Ah0D9QgbgJgVgUQgVgUgMggQgNghgCgtIAAg6QACgpAMggQAMgfAVgVQAUgUAdgLQAcgKAeAAQAgAAAYAJQAXAJARAQIAAiSQAAgIAHgFQAFgGAIAAICHAAQAHAAAHAGQAFAFABAIIAAHdQgBAIgFAGQgHAGgHAAIh8AAQgIAAgGgGQgGgGAAgIIAAgRQgSAUgZAMQgZAMgnAAQgfAAgbgJgAgRAEQgJAGgCAJQgEAJgCAOQgBAXABAZQACAOAEAIQACAKAJAEQAHAGAMAAQAOAAAIgGQAHgEAEgKQADgKAAgMIAAg2QgBgMgDgIQgEgHgIgGQgIgDgMAAQgNAAgGAEg");
	this.shape_20.setTransform(175.05,-133.55);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#48848A").s().p("AhxCzQgtgTgZgkQgYglgEg0IAAhEQAEg2AagkQAagkAugSQAugSA/AAQA/AAAuASQAtASAbAkQAaAkADA2QACAQAAARQAAARgCASQgDA0gZAlQgZAkgtATQguAShCAAQhCAAgvgSgAgZhDQgGAOgCAXIAAA8QACAaAGAMQAFAMAUAAQAUAAAGgMQAEgMACgaIAAg8QgCgZgEgMQgGgMgUAAQgUAAgFAMg");
	this.shape_21.setTransform(128.15,-127);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#48848A").s().p("AhxCzQgtgTgZgkQgYgkgEg1IAAhEQAEg3AagjQAagkAugSQAugSA/AAQA/AAAtASQAvATAZAjQAbAkADA2QACAQAAARQAAARgCASQgEA1gYAkQgYAkguATQguAShCAAQhDAAgugSgAgahDQgFAOgCAXIAAA8QACAaAFAMQAGAMAUAAQAVAAAEgMQAFgMACgaIAAg8QgCgZgFgMQgEgMgVAAQgTAAgHAMg");
	this.shape_22.setTransform(81.425,-127);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#48848A").s().p("ABMC9QgLAAgFgGQgGgGgCgGIg0iTIgzCTQgCAHgGAFQgFAGgLAAIhiAAQgKAAgGgGQgFgFgDgHIhqlQIgBgGQAAgHAGgFQAEgFAIAAIBwAAQALAAAGAFQAGAGACAGIAsCXIAviXQACgFAGgHQAGgFALAAIBDAAQALAAAGAFQAGAGACAGIAvCXIAsiXQACgGAGgGQAGgFALAAIBwAAQAIAAAFAFQAFAFAAAHIgBAGIhqFQQgCAGgGAGQgGAGgKAAg");
	this.shape_23.setTransform(27.575,-126.975);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#48848A").s().p("Ah9ECQgGAAgGgEQgEgEAAgHIAAgDIABgEIA5iMIiMlLIAAgFQABgHAEgFQAGgFAHAAIB6AAQAMAAAFAFQAFAHACAFIA7CmIA9imQAEgGAFgGQAFgFALAAIB6AAQAGAAAGAEQAEAFAAAGIAAAHIjNHcQgEAHgFAFQgFAFgLAAg");
	this.shape_24.setTransform(-26.95,-120.075);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#48848A").s().p("AhAEDQgIAAgGgHQgGgFAAgIIAAndQAAgIAGgGQAGgFAIgBICBAAQAIABAGAFQAGAGAAAIIAAHdQAAAIgGAFQgGAHgIAAg");
	this.shape_25.setTransform(-62.1,-133.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#48848A").s().p("AhAEDQgIAAgGgHQgGgFAAgIIAAndQAAgIAGgGQAGgFAIgBICBAAQAIABAGAFQAGAGAAAIIAAHdQAAAHgGAGQgGAHgIAAg");
	this.shape_26.setTransform(-85.625,-133.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#48848A").s().p("AhxCzQgsgSgaglQgYgkgEg1IAAhEQAEg2AagkQAagkAugSQAugSA/AAQA+AAAvASQAuASAaAkQAaAkADA2QACAQAAARQAAARgCASQgDA0gZAlQgYAkguATQgtAShDAAQhCAAgvgSgAgahDQgFAMgBAZIAAA8QABAaAFAMQAGAMAUAAQAVAAAFgMQAFgNABgZIAAg8QgBgWgFgPQgGgMgUAAQgTAAgHAMg");
	this.shape_27.setTransform(-120.675,-127);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#48848A").s().p("ABOD/QgHAAgGgGQgGgHAAgHIAAidIh1AAIAACdQAAAIgGAGQgGAGgHAAIiQAAQgIAAgFgGQgGgGAAgIIAAnVQAAgIAGgGQAFgGAIAAICQAAQAHAAAGAGQAGAGAAAIIAACZIB1AAIAAiZQAAgIAGgGQAFgGAIAAICPAAQAIAAAGAGQAGAGAAAIIAAHVQAAAIgGAGQgGAGgIAAg");
	this.shape_28.setTransform(-172.2,-133.525);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#E3DFDE").s().p("AmaLuQiMgBhjhjQhjhjAAiMIAAyIIXZXbg");
	this.shape_29.setTransform(169.425,-234.95);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("Egg4AwbQiMAAhjhkQhjhjAAiLMAAAhWRQAAiLBjhjQBjhkCMAAMAvpAAAIXaXbMAAABEIQAACLhjBjQhjBkiMAAg");
	this.shape_30.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-244.3,-309.9,488.70000000000005,619.8);


(lib.graph_lines = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAgBiQgNgLgBgSIgBgOIABgPQABgTAMgLQAMgLAWAAQAWAAAMALQAMALACATIAAAPIAAAOQgCASgMALQgNALgVAAQgVAAgMgLgAA3AfQgEAEAAAGIAAANIAAANIACAHQABAEADACQADACAFAAQAFAAADgCQADgCACgEIACgHIAAgNIAAgNQgBgGgDgEQgDgFgIAAQgHAAgDAFgAhZBsQgHAAAAgGIABgEICYjHIAEgEQACgCAEAAIAWAAQAHAAAAAGIgBAEIiXDHIgEAEQgDACgEAAgAhigJQgMgLgCgSIAAgPIAAgOQABgTANgLQAMgLAWAAQAWAAAMALQAMALABATIABAOIgBAPQgBASgNALQgMAKgVAAQgVAAgNgKgAhLhMQgDAFgBAFIAAANIAAANIACAHQABAEAEACQADACAFAAQAFAAADgCQADgCABgEIACgHIABgNIgBgNQAAgFgDgFQgEgFgHAAQgIAAgDAFg");
	this.shape.setTransform(1224.8875,28.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhOBuQgDAAgDgDQgCgCAAgDIAAgWIABgGQACgFAFgEIAggfIApggQAOgMAIgKQAHgLAAgIQAAgLgEgHQgGgHgOAAQgHAAgGAEQgGAEgDAGIgFANQgBAEgDABIgGACIgnAAQgCAAgDgCQAAgBAAAAQAAgBgBAAQAAgBAAgBQAAAAAAgBQAAgPAGgNQAGgNALgKQALgJAPgGQAPgGASAAQAbAAASAJQASAIAKAPQAKAPAAAUQAAAPgHANQgHANgMALQgMAMgQANIgdAcIBPAAQADAAADACQACACAAAEIAAAfQAAADgCACQgDADgDAAg");
	this.shape_1.setTransform(1202.4,28.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgSAbQgEAAgCgCQgCgCAAgDIAAgnQAAgDACgCQACgCAEAAIAmAAQADAAACACQACACAAADIAAAnQAAADgCACQgCACgDAAg");
	this.shape_2.setTransform(1188.075,36.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgsBsQgBAAAAAAQgBAAgBgBQAAAAgBAAQAAgBgBAAQgCgCAAgDIABgDIBGieIhbAAQgEAAgCgDQgCgCAAgDIAAgfQAAgEACgCQACgCAEAAICPAAQAEAAACACQACACAAAEIAAAbIgBAIIgDAGIhHCeIgDAFQgCADgFAAg");
	this.shape_3.setTransform(1174.9,28.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAPBsQgDAAgCgDQgDgCAAgDIAAgjIheAAQgEAAgCgCQgCgCAAgDIAAgeQAAgDABgCIACgEIBah5QADgFAHAAIAtAAQADAAADACQACACAAAEIAAB2IAbAAQAEAAACADQACACAAADIAAAfQAAADgCACQgCACgEAAIgbAAIAAAjQAAADgCACQgDADgDAAgAgqAWIAzAAIAAhIg");
	this.shape_4.setTransform(1155.475,28.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAgBiQgNgLgBgSIgBgOIABgPQABgTAMgLQAMgLAWAAQAWAAAMALQAMALACATIAAAPIAAAOQgCASgMALQgNALgVAAQgVAAgMgLgAA3AfQgEAEAAAGIAAANIAAANIACAHQABAEADACQADACAFAAQAFAAADgCQADgCACgEIACgHIAAgNIAAgNQgBgGgDgEQgDgFgIAAQgHAAgDAFgAhZBsQgHAAAAgGIABgEICYjHIAEgEQACgCAEAAIAWAAQAHAAAAAGIgBAEIiXDHIgEAEQgDACgEAAgAhigJQgMgLgCgSIAAgPIAAgOQABgTANgLQAMgLAWAAQAWAAAMALQAMALABATIABAOIgBAPQgBASgNALQgMAKgVAAQgVAAgNgKgAhLhMQgDAFgBAFIAAANIAAANIACAHQABAEAEACQADACAFAAQAFAAADgCQADgCABgEIACgHIABgNIgBgNQAAgFgDgFQgEgFgHAAQgIAAgDAFg");
	this.shape_5.setTransform(128.1375,161.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AguBjQgVgJgLgSQgMgRAAgXQAAgJADgKQADgJAFgHQAEgJAEgHIAHgKIA2hJIAFgEQACgCAEAAIApAAQAAAAABAAQABAAAAAAQABABAAAAQABAAAAABQABAAAAABQAAAAAAABQABAAAAABQAAABAAAAIAAADIgBABIgqA5IAFgBIAEAAQAOABAOAFQANAGALAJQAMAKAGAMQAHAOAAAQQAAAWgLARQgLASgVALQgUAKgbAAQgaAAgVgKgAgQADQgHAEgFAHQgFAHAAALQAAAKAFAIQAFAHAIAEQAHAEAJAAQAIAAAIgEQAIgEAFgHQAEgIAAgKQAAgLgEgHQgFgHgIgEQgHgDgJAAQgJAAgIADg");
	this.shape_6.setTransform(105.725,161.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgSAbQgEAAgCgCQgCgCAAgDIAAgnQAAgDACgCQACgCAEAAIAmAAQADAAACACQACACAAADIAAAnQAAADgCACQgCACgDAAg");
	this.shape_7.setTransform(91.275,169.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgwBkQgTgIgKgPQgKgPgBgRQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABgBABAAIApAAQAEAAACACQADACABADQACAGAFAFQAEAEAGADQAHACAGAAQAJAAAHgDQAHgEAFgHQAEgIAAgKQAAgJgEgHQgEgHgHgEQgIgEgJAAQgHAAgEACIgIAEIgGAEQgCACgDAAIgpAAQAAAAgBAAQAAAAgBgBQAAAAgBAAQgBAAAAgBQgCgCAAgDIALhqQABgFADgDQACgBAFAAIB5AAQAEAAADABQABACAAAEIAAAdQAAADgBADQgDACgEAAIhYAAIgEAnQAHgEAKgDQAIgDAQAAQAOAAANAFQAOAFAKAJQALAKAGAMQAGAMAAARQAAAVgKARQgLARgVAJQgTALgcgBQgdABgTgKg");
	this.shape_8.setTransform(76.9,161.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhOBuQgDAAgCgDQgDgCAAgDIAAgWIACgGQABgFAFgEIAggfIApggQAOgMAIgKQAHgLAAgIQABgLgGgHQgFgHgOAAQgHAAgGAEQgGAEgDAGIgFANQgBAEgDABIgGACIgmAAQgDAAgDgCQAAgBAAAAQAAgBgBAAQAAgBAAgBQAAAAAAgBQAAgPAGgNQAGgNALgKQALgJAPgGQAQgGARAAQAbAAASAJQASAIAKAPQAKAPgBAUQABAPgHANQgHANgMALQgMAMgRANIgcAcIBPAAQAEAAACACQACACAAAEIAAAfQAAADgCACQgCADgEAAg");
	this.shape_9.setTransform(56.95,161.225);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#EFC576").s().p("Eg0AAMEQgIAAgGgCIw8l/IxgFgQgRAGgQgIQgPgIgGgRQgFgRAIgQQAIgPARgGIRullQANgEAOAFIRBGAIRZhCIRSjDIQth9IRsiVIQxoDIALgDIRgjEIRBjPIAIgBISJAAQARAAANANQAMAMAAASQAAARgMANQgNAMgRAAIyFAAIw9DPIxbDDIwyIDIgNAEIxzCVIwtB9IxRDDIxoBEg");
	this.shape_10.setTransform(638.1539,141.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AARBsQgDAAgDgDQgCgCAAgDIAAiSIgpAhQgDACgDgBQgDAAgCgDIgSgYQgCgCAAgEQABgDADgCIBGg3IADgBIAEgBIAnAAQADAAACACQACACAAAEIAADHQAAADgCACQgCADgDAAg");
	this.shape_11.setTransform(109.245,286.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgnBpQgRgFgLgJQgLgJgGgNQgFgMAAgOQAAgRAIgNQAJgNANgGQgLgHgGgLQgGgKAAgOQAAgSAJgNQAJgOASgJQATgIAbAAQAcAAASAIQASAIAJAOQAJAOAAARQAAAOgGALQgFALgLAHQAOAGAIANQAIANAAARQAAATgKAPQgKAQgUAJQgUAJgeAAQgWAAgRgGgAgRASQgIAEgFAGQgEAGAAAJQAAAJAEAGQAFAHAIADQAIADAJAAQAKAAAIgDQAHgDAFgHQAFgGAAgJQAAgJgFgGQgFgGgHgEQgIgDgKAAQgJAAgIADgAgPhDQgHADgEAFQgEAGAAAHQAAAIAEAFQAEAGAHADQAHADAIAAQAJAAAHgDQAHgEAEgFQAEgFAAgIQAAgHgEgGQgEgFgHgDQgHgEgJAAQgIAAgHAEg");
	this.shape_12.setTransform(1183.575,180.725);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AARBsQgDAAgDgDQgCgCAAgDIAAiSIgpAhQgDACgDgBQgDAAgCgDIgSgYQgCgCAAgEQABgDADgCIBGg3IADgBIAEgBIAnAAQADAAACACQACACAAAEIAADHQAAADgCACQgCADgDAAg");
	this.shape_13.setTransform(1155.995,180.725);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhOBuQgDAAgDgDQgCgCAAgDIAAgWIABgGQABgFAGgEIAggfIApggQAOgMAIgKQAIgLgBgIQAAgLgEgHQgGgHgNAAQgJAAgFAEQgGAEgEAGIgEANQgBAEgDABIgGACIgnAAQgCAAgCgCQgBgBAAAAQAAgBgBAAQAAgBAAgBQAAAAAAgBQAAgPAGgNQAGgNALgKQALgJAPgGQAPgGATAAQAaAAASAJQASAIAKAPQAKAPAAAUQgBAPgGANQgHANgMALQgMAMgQANIgdAcIBPAAQADAAADACQACACAAAEIAAAfQAAADgCACQgDADgDAAg");
	this.shape_14.setTransform(1139.05,180.525);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#E1A290").ss(11.8,1,1).p("EhQqAIsIPViwIQmA7IQIB1IPoj9IQxBNIPTlzIQxFgIQHoOIPelgIRQgn");
	this.shape_15.setTransform(645.45,269.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgwBkQgTgIgKgPQgKgPgBgRQAAgBAAAAQAAgBABgBQAAAAAAgBQABAAAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABAAABAAIApAAQAEAAACABQACABACADQACAIAFAEQAEAEAHADQAFACAHAAQAIAAAIgEQAHgEAFgGQAEgIAAgKQAAgJgEgHQgEgHgHgEQgIgEgJAAQgGAAgFACIgIAEIgGAEQgCACgDAAIgpAAQAAAAgBAAQAAAAgBgBQAAAAgBAAQgBgBAAAAQgCgCAAgDIALhrQABgEACgDQADgCAFAAIB5AAQAEAAACACQACACAAAEIAAAdQAAAEgCACQgCABgEABIhXAAIgFAnQAHgEAKgDQAIgDAQAAQAOAAANAFQAOAFAKAJQALAKAGAMQAGAMAAAQQAAAWgKARQgLARgVAJQgTAKgcAAQgcAAgUgJg");
	this.shape_16.setTransform(1196.15,126.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgoBoQgRgGgLgJQgLgJgFgLQgFgKAAgJQAAgDACgCQAAgBABAAQAAAAABAAQAAgBABAAQABAAAAAAIApAAIAFABIAEAFQADAGAEAEQAFADAHACQAHABAHAAQAQAAAIgHQAJgIAAgMQAAgNgIgGQgJgGgPAAIghAAQgDAAgDgCQgCgCAAgEIAAgQQAAgDACgDIADgEIAygrIhVAAQgDAAgCgCQgDgCAAgEIAAgdQAAgDADgCQACgCADAAICNAAQADAAACACQADACAAADIAAAbIgCAGIgDAEIgvArIACABQASACAOAHQANAHAIAMQAIANAAAUQAAAVgLAQQgMAPgVAIQgUAIgaAAQgXAAgRgFg");
	this.shape_17.setTransform(1167.225,126.675);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgoBoQgRgGgLgJQgLgJgFgLQgFgKAAgJQAAgDACgCQAAgBABAAQAAAAABAAQAAgBABAAQABAAAAAAIApAAIAFABIAEAFQADAGAEAEQAFADAHACQAHABAHAAQAQAAAIgHQAJgIAAgMQAAgNgIgGQgJgGgPAAIghAAQgDAAgDgCQgCgCAAgEIAAgQQAAgDACgDIADgEIAygrIhVAAQgDAAgCgCQgDgCAAgEIAAgdQAAgDADgCQACgCADAAICNAAQADAAACACQADACAAADIAAAbIgCAGIgDAEIgvArIACABQASACAOAHQANAHAIAMQAIANAAAUQAAAVgLAQQgMAPgVAIQgUAIgaAAQgXAAgRgFg");
	this.shape_18.setTransform(1146.925,126.675);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#5D999D").ss(10.5,1,1).p("EhTcAFwIQwA/IQmAAIQ7DrIQwj7IQIAQIRDAvIQchuIQcicIRFnVIQwmY");
	this.shape_19.setTransform(644.125,224.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AATB7QgEgBgDgCQgCgDAAgDIAAimIgvAlQgDACgDAAQgEgBgCgDIgVgbQgCgDABgEQAAgDADgDIBQg+IAEgCIAFAAIArAAQAEgBACADQADACAAAFIAADiQAAADgDADQgCACgEABg");
	this.shape_20.setTransform(1224.345,401.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhZB9QgEAAgCgDQgDgDAAgDIAAgZIABgHQACgFAGgFIAkgkIAugkQARgOAJgLQAJgMAAgKQAAgMgGgIQgGgIgPAAQgKAAgGAFQgHAEgEAHQgDAHgCAHQgBAFgDACQgEABgEAAIgrAAQgEAAgCgCQgCgCAAgDQABgRAHgPQAGgOANgMQAMgLARgGQASgHAVAAQAdAAAVAKQAVAJALARQALARAAAXQAAARgIAPQgIAPgNAMQgOAOgTAOIggAhIBaAAQAEAAACACQADADAAAEIAAAjQAAADgDADQgCADgEAAg");
	this.shape_21.setTransform(1204.125,401.525);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgrB3QgSgHgMgNQgNgNgGgRQgGgQgBgUIgBgVIAAgYIABgVQABgUAGgQQAHgRAMgNQANgMASgHQASgHAYAAQAZAAASAHQATAHAMAMQAMANAHARQAGAQABAUIABAVIAAAYIgBAVQgBAUgGAQQgHARgMANQgMANgSAHQgTAHgZAAQgYAAgTgHgAgZg/QgIAMgBAUIAAAUIAAAWIAAAVQABAUAIALQAIAMARABQASgBAIgMQAJgLAAgUIABgVIAAgWIgBgUQAAgUgJgMQgIgMgSAAQgRAAgIAMg");
	this.shape_22.setTransform(1179.8875,401.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhZB9QgEAAgCgDQgDgDAAgDIAAgZIABgHQACgFAGgFIAkgkIAugkQARgOAJgLQAJgMAAgKQAAgMgGgIQgGgIgPAAQgKAAgGAFQgHAEgEAHQgDAHgCAHQgBAFgDACQgEABgEAAIgrAAQgEAAgCgCQgCgCAAgDQABgRAHgPQAGgOANgMQAMgLARgGQASgHAVAAQAdAAAVAKQAVAJALARQALARAAAXQAAARgIAPQgIAPgNAMQgOAOgTAOIggAhIBaAAQAEAAACACQADADAAAEIAAAjQAAADgDADQgCADgEAAg");
	this.shape_23.setTransform(1155.625,401.525);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AATB7QgEgBgDgCQgCgDAAgDIAAimIgvAlQgDACgDAAQgEgBgCgDIgVgbQgCgDABgEQAAgDADgDIBQg+IAEgCIAFAAIArAAQAEgBACADQADACAAAFIAADiQAAADgDADQgCACgEABg");
	this.shape_24.setTransform(101.695,401.75);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AATB7QgEgBgDgCQgCgDAAgDIAAimIgvAlQgDACgDAAQgEgBgCgDIgVgbQgCgDABgEQAAgDADgDIBQg+IAEgCIAFAAIArAAQAEgBACADQADACAAAFIAADiQAAADgDADQgCACgEABg");
	this.shape_25.setTransform(83.295,401.75);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgrB3QgSgHgMgNQgNgNgGgRQgGgQgBgUIgBgVIAAgYIABgVQABgUAGgQQAHgRAMgNQANgMASgHQASgHAYAAQAZAAASAHQATAHAMAMQAMANAHARQAGAQABAUIABAVIAAAYIgBAVQgBAUgGAQQgHARgMANQgMANgSAHQgTAHgZAAQgYAAgTgHgAgZg/QgIAMgBAUIAAAUIAAAWIAAAVQABAUAIALQAIAMARABQASgBAIgMQAJgLAAgUIABgVIAAgWIgBgUQAAgUgJgMQgIgMgSAAQgRAAgIAMg");
	this.shape_26.setTransform(62.5375,401.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhZB9QgEAAgCgDQgDgDAAgDIAAgZIABgHQACgFAGgFIAkgkIAugkQARgOAJgLQAJgMAAgKQAAgMgGgIQgGgIgPAAQgKAAgGAFQgHAEgEAHQgDAHgCAHQgBAFgDACQgEABgEAAIgrAAQgEAAgCgCQgCgCAAgDQABgRAHgPQAGgOANgMQAMgLARgGQASgHAVAAQAdAAAVAKQAVAJALARQALARAAAXQAAARgIAPQgIAPgNAMQgOAOgTAOIggAhIBaAAQAEAAACACQADADAAAEIAAAjQAAADgDADQgCADgEAAg");
	this.shape_27.setTransform(38.275,401.525);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#3E3E3E").s().p("EhesAb4IAAhbQhxgJg4gGQgQgCAAgQQgBgPARgBQBLAABeABQACtugGrcQgEnlgGmFQgGkXgCiMQgFibgBhOQgmABgngEQgRgDgKgLQgKgMAFgRQAXheAdhQQAMgmAJgSQAQggAZgHQAFgBAFAFQAFAJABAIQAMgBAHAIQAQATALAcIARA1IArCCQAEAMgHANQgHANgNADQgVAGgaAEQAGB8gBDGQgDEFABA6IAKNpQAHMvgBMuQCDADDeAMQEGAOBcADQGpAQHiAPUAEwAAIBMZgAbUBNlgAdADmAAEIgHgzQgDgTAMgNQAMgOAUAFQCFAiBNAoQALAGABAMQABAKgIAIQAAANgIAHQgQAPgaANIgwAUIhfAoQgMAFgOgIQgOgIgCgMIgJhBUgCagABhOzAAgUhMLAAfgFBgAKQmygMnrgTIlYgLQjPgHiKgJIAABXQAAAXgYAAQgYAAAAgXg");
	this.shape_28.setTransform(624.7548,181.2339);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7,p:{x:91.275,y:169.475}},{t:this.shape_6},{t:this.shape_5,p:{x:128.1375,y:161.425}},{t:this.shape_4,p:{x:1155.475,y:28.875}},{t:this.shape_3},{t:this.shape_2,p:{x:1188.075,y:36.925}},{t:this.shape_1},{t:this.shape,p:{x:1224.8875,y:28.875}}]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13,p:{x:1155.995,y:180.725}},{t:this.shape_7,p:{x:1168.775,y:188.775}},{t:this.shape_12},{t:this.shape_5,p:{x:1206.4375,y:180.725}},{t:this.shape_4,p:{x:83.025,y:286.475}},{t:this.shape_2,p:{x:97.975,y:294.525}},{t:this.shape_11,p:{x:109.245,y:286.475}},{t:this.shape,p:{x:130.0875,y:286.475}}]},1).to({state:[{t:this.shape_19},{t:this.shape_13,p:{x:69.295,y:229.025}},{t:this.shape_4,p:{x:88.175,y:229.025}},{t:this.shape_7,p:{x:103.125,y:237.075}},{t:this.shape_11,p:{x:114.395,y:229.025}},{t:this.shape_5,p:{x:135.2375,y:229.025}},{t:this.shape_18},{t:this.shape_17},{t:this.shape_2,p:{x:1181.875,y:134.575}},{t:this.shape_16},{t:this.shape,p:{x:1218.5875,y:126.525}}]},1).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.2,0.5,1249.2,426.3);


(lib.bechdel2021 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AAbC1QgFgBgEgDQgEgEAAgGIAAj0IhFA2QgFAEgFgBQgEgBgEgFIgfgoQgDgEABgGQAAgFAGgDIB2hcIAFgDIAHAAIBAAAQAGgBADAEQAEADAAAGIAAFOQAAAHgEADQgDADgGABg");
	this.shape.setTransform(49.8714,179.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AiDC4QgHAAgDgEQgEgEAAgFIAAglIACgLQACgGAJgIIA2g1QAugjAVgSQAagUANgSQANgQAAgQQAAgRgJgMQgJgMgWAAQgOAAgKAHQgKAFgFALQgGAMgCAKQgBAGgGADQgEACgGAAIhBAAQgEAAgEgDQgCgDAAgEQAAgXAKgYQAKgWASgQQAUgSAYgIQAZgKAgAAQAsAAAfAOQAeAPAQAYQAQAYAAAjQAAAZgLAWQgMAXgTASQgUATgcAWIgwAwICFAAQAFAAAEAEQAEADAAAGIAAA0QAAAFgEAEQgEAEgFAAg");
	this.shape_1.setTransform(21.45,178.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("AhACvQgdgLgQgSQgSgSgKgaQgJgZgBgcIAAhjQABgdAKgYQAKgZASgSQASgSAbgLQAbgKAkAAQAkAAAbAKQAbALASASQATATAJAYQAKAZABAcQABAOAAATIAAAjQAAASgBANQgBAcgKAZQgKAagRASQgRASgcALQgbALglAAQgmAAgagLgAgmhdQgMASgBAcIAABeQABAeAMAQQAMASAaAAQAaAAAMgSQANgRAAgdQABgPAAgRIAAgfQAAgRgBgOQAAgcgNgSQgMgRgagBQgbABgLARg");
	this.shape_2.setTransform(-12.775,179.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282E46").s().p("AiDC4QgHAAgDgEQgEgEAAgFIAAglIACgLQACgHAJgHIA2g1QAsghAXgUQAagUANgSQANgRAAgPQAAgRgJgMQgJgMgWAAQgPAAgJAHQgJAFgHALQgFAMgCAKQgCAGgEADQgFACgHAAIhAAAQgEAAgEgDQgDgDAAgEQAAgZALgWQAKgWASgQQAUgSAYgIQAZgKAgAAQAsAAAfAOQAeAPAQAYQAQAZAAAiQAAAZgLAWQgLAXgVASQgTAUgdAVIgvAwICEAAQAGAAAEAEQAEADAAAGIAAA0QAAAFgEAEQgEAEgGAAg");
	this.shape_3.setTransform(-47.2,178.825);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E1A290").s().p("A68dTMAAAg6lMA15AAAMAAAA6lg");
	this.shape_4.setTransform(0.025,23.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282E46").s().p("AAiBpQgNgMgCgTIAAgfQABgUANgNQAOgLAXAAQAYAAAMALQANAMACAVIAAAfQgCATgNAMQgOAMgWAAQgXAAgNgMgAA6AhQgDAGAAAFIAAAcQAAAEABAEQACADADADQAEACAFAAQAFAAAEgCQADgCABgEIACgIIAAgcQgBgHgDgEQgDgFgIAAQgJAAgDAFgAhfB0QgIAAAAgHQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBICijVIAEgFQADgCAEAAIAYAAQAHAAAAAHQAAABAAAAQAAABAAAAQAAABgBAAQAAAAAAABIiiDVIgFAFQgDACgEAAgAhpgKQgNgMgCgTIAAgfQACgVAMgLQAOgMAXAAQAYAAANAMQANAMABAUIAAAfQgBATgOAMQgNALgXAAQgXAAgNgLgAhQhSQgEAGAAAGIAAAbIACAIQABADADADQAEADAFAAQAFAAAEgDQADgDACgDIABgIIABgOIgBgNQAAgGgDgGQgEgFgIAAQgIAAgDAFg");
	this.shape_5.setTransform(159.175,-198.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282E46").s().p("AgqBxQgTgGgLgJQgMgLgGgNQgGgMAAgQQAAgSAJgOQAJgNAOgHQgLgIgGgLQgGgLAAgQQAAgTAJgOQAJgOAUgKQAUgJAdAAQAdAAAUAJQAUAJAJAPQAKAOAAATQAAAPgGALQgGANgLAHQAPAHAIANQAJAOAAATQAAATgLARQgKAQgWAKQgVAKghAAQgXAAgTgGgAgSAUQgIAEgGAGQgFAGAAALQAAAJAFAHQAGAHAIADQAIAEAKAAQALAAAIgEQAJgDAEgHQAFgHAAgJQAAgLgFgGQgEgGgJgEQgIgEgLAAQgKAAgIAEgAgQhIQgHADgFAGQgEAGAAAIQAAAIAEAGQAEAGAIADQAHADAJAAQAKAAAHgDQAHgEAFgFQAEgGAAgIQAAgJgEgFQgFgGgHgDQgIgEgJAAQgHAAgJAEg");
	this.shape_6.setTransform(134.675,-198.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#282E46").s().p("AgxBrQgVgKgOgTQgMgUAAgXQAAgLADgJQADgLAFgIIARgbIA6hOIAEgFQADgCAEAAIAsAAQADAAABACQACACAAADIAAADIgBACIgsA8IAEgBIAFAAQAQABAOAGQAOAFAMALQAMAKAHAOQAHAPAAARQAAAWgMAUQgLASgWAMQgUALgfAAQgcAAgWgKgAgRADQgIAFgFAHQgFAIAAALQAAANAFAHQAGAIAHAEQAJAEAJAAQAIAAAJgEQAJgFAFgHQAFgHAAgNQAAgLgFgIQgFgHgIgFQgIgDgKAAQgKAAgIADg");
	this.shape_7.setTransform(112.825,-198.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-172.4,-210.8,344.9,421.70000000000005);


(lib.bechdel2011 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AAbC1QgFgBgEgDQgEgDAAgHIAAj0IhGA2QgEAEgFgBQgFgBgEgFIgegoQgDgDABgHQAAgFAGgDIB1hcIAGgDIAHAAIBAAAQAGgBADAEQAEAEAAAFIAAFOQAAAGgEAEQgDADgGABg");
	this.shape.setTransform(45.9125,167.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AAbC1QgFgBgEgDQgEgDAAgHIAAj0IhGA2QgEAEgFgBQgFgBgEgFIgegoQgDgDABgHQAAgFAFgDIB2hcIAGgDIAHAAIBAAAQAGgBADAEQAEAEAAAFIAAFOQAAAGgEAEQgDADgGABg");
	this.shape_1.setTransform(20.2625,167.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("AhACvQgcgKgRgTQgSgSgJgaQgKgYgBgdIgBgfIAAgjIABghQABgaAKgbQAJgYATgTQATgSAagLQAbgKAkAAQAlAAAaAKQAaALATASQATATAJAYQAKAYABAdIABAhQABARgBASIgBAfQgBAcgJAZQgKAagSASQgRATgcAKQgaALgmAAQglAAgbgLgAgmhdQgMARgBAdIgBAfIAAAfIABAgQABAeAMAQQANASAZAAQAaAAAMgSQAMgQABgeIABggQABgPgBgQIgBgfQgBgdgMgRQgMgRgagBQgaABgMARg");
	this.shape_2.setTransform(-8.8875,167.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282E46").s().p("AiDC4QgGAAgEgEQgEgDAAgGIAAglQAAgEACgHQACgHAJgHIA2g1QAtgiAXgTQAYgUAOgSQANgQAAgQQAAgRgJgMQgJgMgWAAQgPAAgJAHQgKAFgGALQgFAMgCAKQgCAHgFACQgEACgGAAIhBAAQgFAAgDgDQgDgDAAgEQABgZAKgWQAKgWASgQQAUgSAYgIQAZgKAgAAQAsAAAeAOQAfAOAQAZQAQAZAAAiQAAAYgLAXQgLAWgVATQgTATgdAWIgvAwICEAAQAGAAAEAEQAEADAAAGIAAA0QAAAFgEAEQgEAEgGAAg");
	this.shape_3.setTransform(-43.275,167.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F8D081").s().p("A67bJMAAAg2RMA13AAAMAAAA2Rg");
	this.shape_4.setTransform(0,25.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282E46").s().p("AAiBpQgNgLgCgUIAAggQACgUANgLQANgMAXAAQAYAAANAMQAMAMACATIAAAgQgCAUgNALQgOAMgWAAQgWAAgOgMgAA6AhQgCAEgBAHIAAAbIACAIQABAFADABQADADAGAAQAGAAADgDIAFgGQABgDAAgFIAAgbQgBgHgCgEQgEgGgIABQgIgBgEAGgAhfBzQgIABAAgHIACgEICijWIAEgEQADgBAEAAIAYAAQAHgBAAAHQAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAABIiiDVIgFAFQgCABgFAAgAhpgKQgNgMgBgTIgBgQIABgPQABgUANgMQANgMAXAAQAYAAANAMQANAMABAUIABAPIgBAQQgBATgOAMQgNALgXAAQgWAAgOgLgAhQhSQgDAEgBAIIAAAbIACAIQABAEADACQAEACAFAAQAFAAAEgCQADgCACgEIACgIIAAgbQgBgIgDgEQgEgFgIAAQgIAAgDAFg");
	this.shape_5.setTransform(-115.9333,-187.4);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282E46").s().p("AgrBvQgTgHgLgJQgLgJgGgMQgGgLAAgKQAAgBAAgBQABAAAAgBQAAAAAAgBQABAAAAgBQACgCADAAIArAAQAEAAADACIAEAEQADAHAFAEQAFAEAHABQAHABAIAAQARAAAJgHQAJgIAAgOQAAgOgIgGQgJgGgRAAIgkAAQgDAAgCgCQgDgCAAgEIAAgSQAAgEACgDQABgDACgBIA2guIhbAAQgDAAgDgCQgCgCAAgEIAAgfQAAgEACgCQACgCAEAAICXAAQAEAAACACQACADAAADIAAAcQAAAEgBACQgCADgCACIgyAuIACABQAUADAOAHQAOAHAJAOQAJAOAAAVQAAAXgNAQQgMAQgWAJQgWAJgcAAQgYAAgTgGg");
	this.shape_6.setTransform(-140.225,-187.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#282E46").s().p("AgyBqQgWgKgMgTQgMgSAAgZQAAgKADgKQADgJAEgJIAKgQIBBhaIAFgEQACgCAFAAIAsAAQADAAABACIACAFIAAACIgBACIgtA9IAKgBQAOABAQAGQAPAGALAKQANALAGAMQAHAOAAASQAAAXgMATQgMATgVAMQgWALgdAAQgbAAgYgLgAgRADQgJAEgEAIQgFAIAAALQAAAMAFAHQAFAJAJADQAHAEAKAAQAKAAAIgEQAIgEAEgIQAGgIAAgLQAAgKgFgJQgGgIgHgEQgIgDgKAAQgKAAgIADg");
	this.shape_7.setTransform(-161.65,-187.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-172.4,-199.1,344.9,398.2);


(lib._2022 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AkxEiQByhrBGhJQBGhKAvhNQAthOgFhCQgEgogUgUQgTgVgjADQgjADgSAgQgRAgAGA7IjtAUQgFhvAmhNQAnhMBFgpQBFgoBZgIQCYgNBRBGQBRBGALB4QAKCDhMB2QhMB4h7BlIE3gaIARDGIp6A2g");
	this.shape.setTransform(113.0709,-8.6841);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AkxEiQBthlBLhPQBIhLAthMQAuhOgGhCQgDgngVgVQgSgVgjADQgkADgSAgQgRAgAGA7IjsAUQgGhvAnhNQAmhMBFgpQBGgoBYgIQCYgNBRBGQBRBGALB4QALCBhNB4QhOB6h5BjIE4gaIAQDGIp5A2g");
	this.shape_1.setTransform(42.235,-2.6341);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("Aj1FqQhhh0gTjZQgSjVBNiCQBMiDC7gQQC6gQBiB0QBiBzATDXQASDYhNCCQhMCDi8AQQgXACgUAAQicAAhVhmgAgTjnQhJAHgTA9QgTA9AKBvQAKBzAbA5QAdA5BJgHQBLgGASg9QASg+gKhxQgJhvgdg6Qgagzg+AAIgNAAg");
	this.shape_2.setTransform(-35.575,3.0692);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282E46").s().p("AkxEiQByhrBGhJQBIhMAthLQAthNgFhCQgEgpgUgUQgSgVgjADQglADgRAgQgRAhAGA6IjsAUQgGhvAmhNQAnhMBFgpQBFgoBZgIQCZgNBQBGQBRBGALB4QALCBhNB4QhMB3h7BnIE3gbIARDGIp6A2g");
	this.shape_3.setTransform(-110.3654,10.3976);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282E46").s().p("A6SPFQhbhNgKh2IhpzJQgKh3BNhbQBNhbB2gKMAwcgEIQB2gKBbBMQBbBNAKB2IBpTJQAKB2hNBcQhMBbh3AKMgwcAEIIgbABQhlAAhRhDgAXLuZMgwcAEIQhJAHgvA4QgwA4AGBJIBpTJQAGBJA4AwQA5AvBJgGMAwcgEJQBJgGAwg4QAvg4gGhJIhpzKQgGhJg4gvQgygqhAAAIgQABg");
	this.shape_4.setTransform(0.025,0.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282E46").s().p("A4VMvQg4gwgGhIIhexRQgGhIAvg4QAvg4BJgGMAulgD/QBJgGA4AvQA4AvAGBJIBeRRQAHBIgwA4QgvA4hIAGMgumAD/IgSABQg+AAgxgqgAWbsYMgumAD/QguAEgfAkQgeAkAEAuIBeRRQAEAuAkAeQAkAfAvgEMAulgD/QAvgEAegkQAegkgEguIhexRQgEgugkgeQgggbgpAAIgJAAg");
	this.shape_5.setTransform(0.0302,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-188.9,-103.2,377.9,206.5);


(lib.takeAction = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("EAO3AoDQiTAAhBhEQhDhIgWgcIzT9KIAActQAABPg6A9Qg8A5hPAAI0uAAQhSAAg6g5Qg4g9AAhPMAAAhJ4QAAhSA4g5QA6g9BSAAISGAAQCPAABEBEQBBBAAUAoITYfqIAA/OQAAhSA5g5QA5g9BTAAIUtAAQBQAAA4A9QA+A5gBBSMAAABJ4QABBPg+A9Qg4A5hQAAg");
	this.shape.setTransform(1012,439.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("EgTpAlwQocjak3m7Qk3m7gcqLQgIksABlUQgBlPAIk6QAcqDE0m/QEzm/IfjsQIcjoLOAAQLOAAIbDoQIgDsE3G/QE3G/AWKDQANE6AAFPQAAFUgNEsQgdKLk3G7Qk3G7ocDaQoYDarOAAQrOAAoYjagAkVx3Qh6A9hECEQhHCEgIDMQgHEsAAE0QAAEyAHE7QAPEzCOCPQCQCPDyAAQDvAACSiPQCTiPAHkzQAPk7AAkyQAAk0gPksQgHjMhEiEQhHiEhzg9Qh2hAigAAQiZAAh5BAg");
	this.shape_1.setTransform(469.9,439.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("EgLqAoDQhSAAg5g5Qg5g9gBhPMAAAhJ4QABhSA5g5QA5g9BSAAIXVAAQBPAAA9A9QA4A5AABSMAAABJ4QAABPg4A9Qg9A5hPAAg");
	this.shape_2.setTransform(63.25,439.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282E46").s().p("EgLeAoDQhOAAg9g5Qg5g9AAhPMAAAg0YIy/AAQhPAAg9g8Qg5g6AAhSIAAyYQAAhSA5g5QA9g9BPAAMBDAAAAQBSAAA6A9QA8A5AABSIAASYQAABSg8A6Qg6A8hSAAIzAAAMAAAA0YQAABPg4A9Qg6A5hSAAg");
	this.shape_3.setTransform(-318.1,439.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282E46").s().p("EgTeAl/QogjMk+m4Qk+m4gdq5QgHkoAAlbQAAlWAHk7QAdqqFFm0QFGm4IijWQIgjTKqAAQHUAAG0BrQG0BoFeDkQFeDiDTFlQDQFiAHHxQAABEgvAuQgyAuhAAAI3WAAQh2AAg2guQg1gugvh2QhPjsiLhPQiLhSi9AAQjzAAiPCBQiPCAgOFQQgWJZAWJ0QAOFQCPCAQCPCBDzAAQC9AACPhWQCPhZBHjaQAnh9A6gvQA5grB2AAIXWAAQBAAAAyAvQAvAyAABAQgHHxjQFmQjTFhleDlQleDhm0BsQm0BnnUAAQrAAAobjLg");
	this.shape_4.setTransform(-828.725,439.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282E46").s().p("EATgAoDQiMAAg9g9Qg9hAgYg6IivniI4kAAIiwHiQgVA6g9BAQg5A9iSAAI1LAAQhAAAgzgvQgugyAAhAQAAgdAHgVMAZhhI/QAWhSBPhPQBShSCTAAIYxAAQCTAABSBSQBPBPAWBSMAZgBI/QAIAVAAAdQAABAguAyQgvAvhEAAgAmeHUIM8AAImg1Rg");
	this.shape_5.setTransform(-1377.85,439.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282E46").s().p("EgdyAoDQhSAAg5g5Qg6g9AAhPMAAAhJ4QAAhSA6g5QA5g9BSAAMA6sAAAQBOAAA6A9QA8A5AABSIAAQGQAABSg8A5Qg6A9hOAAMgiWAAAIAAHNIf1AAQBPAAA5A5QA8A9ABBPIAAO1QgBBTg8A5Qg5A9hPAAI/1AAIAAHNMAjPAAAQBOAAA9A5QA5A5ABBSIAAQJQgBBPg5A9Qg9A5hOAAg");
	this.shape_6.setTransform(166.1,-486.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#282E46").s().p("EAJBAoDQiSAAhEhEQhIhIgOgcIt94+IAAYhQAABPg5A9Qg5A5hSAAI12AAQhSAAg5g5Qg5g9AAhPMAAAhJ4QAAhSA5g5QA5g9BSAAIV2AAQBSAAA5A9QA5A5AABSIAAWoIM93PQAjg5BIgyQBEg2B2AAIZPAAQBEAAAvAyQAuAvAABAQAAAugVAkMgUkAihMAWhAl+QAVAgAAAyQAABAguAyQgvAvhEAAg");
	this.shape_7.setTransform(-326.925,-486.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#282E46").s().p("EATgAoDQiMAAg9g9Qg8hAgag6IiuniI4kAAIiwHiQgVA6g9BAQg5A9iSAAI1LAAQhBAAgxgvQgvgyAAhAQAAgdAHgVMAZihI/QAVhSBPhPQBShSCSAAIYyAAQCTAABSBSQBPBPAVBSMAZhBI/QAIAVAAAdQAABAgvAyQguAvhEAAgAmeHUIM8AAImg1Rg");
	this.shape_8.setTransform(-884.45,-486.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#282E46").s().p("EgLdAoDQhPAAg9g5Qg5g9AAhPMAAAg0YIy/AAQhPAAg9g8Qg5g6AAhSIAAyYQAAhSA5g5QA9g9BPAAMBDAAAAQBSAAA6A9QA8A5AABSIAASYQAABSg8A6Qg6A8hSAAIzAAAMAAAA0YQAABPg5A9Qg5A5hSAAg");
	this.shape_9.setTransform(-1407.35,-486.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1663.9,-932.2,3325.9,1862.2);


(lib.support = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("ACCGqQhXAAhDgXQhDgYgng4Qgng5AAhiIAAidIhfAAQgOABgJgKQgJgIAAgNIAAiSQAAgMAJgLQAJgJAOAAIBfAAIAAjEQAAgNAJgJQAKgKANAAIDRAAQANAAAKAKQAKAJAAANIAADEICXAAQANAAAKAJQAJALAAAMIAACSQAAANgJAIQgKAKgNgBIiXAAIAACFQAAAbAMARQANAQAaAAIBtAAQAOAAAJAKQAJAKAAAMIAACeQAAAMgJAKQgJAKgOAAg");
	this.shape.setTransform(371.425,-85.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AjzE4QgNAAgJgKQgKgKAAgMIAAovQAAgMAKgLQAJgJANAAIDTAAQANAAAJAJQAKALgBAMIAAAqQAnghAvgVQAvgUA2AAIA5AAQANAAALAJQAJALAAAMIAAC7QAAANgJALQgLAJgNAAIiaAAQglAAgRASQgSATAAAiIAAEMQAAAMgKAKQgIAKgNAAg");
	this.shape_1.setTransform(311.2,-73.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("Ai6EmQhLgegpg8Qgng8gHhXQgBgcAAgdQAAgdABgbQAHhYArg8QArg7BMgeQBLgdBoAAQBpAABLAdQBMAeAqA7QArA8AGBYQADAbAAAdQAAAdgDAcQgFBXgpA8QgnA8hMAeQhMAehuAAQhtAAhNgegAgqhuQgJAVgCAoIgBAyIABAxQACAqAJAUQAJAUAhAAQAiAAAJgUQAIgUADgqIABgxIgBgyQgDgogIgVQgJgVgiAAQghAAgJAVg");
	this.shape_2.setTransform(239.7,-73.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282E46").s().p("Ak+GwQgNAAgJgKQgKgKAAgNIAAsSQAAgNAKgKQAJgJANAAIDNAAQAMAAAKAJQAKAKAAANIAAAkQAcgjArgXQArgWA+AAQA1AAAtAPQAsAPAiAhQAiAhAVA1QAUA1ADBLIACAvIgCAvQgBBGgVA1QgUA0giAiQgiAhguARQgtAQg1AAQgyAAgpgQQgogRgbgmIAAD/QAAANgKAKQgKAKgNAAgAgmjQQgOAIgFAQQgFAQgBAVIgBAsIABAtQABATAGANQAHANANAIQANAGAUAAQAWAAAMgHQAMgJAFgPQAFgQADgWQADgngDgoQgDgVgFgQQgFgQgMgIQgMgJgWAAQgWAAgNAJg");
	this.shape_3.setTransform(162.35,-62.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282E46").s().p("Ak+GwQgNAAgJgKQgKgKAAgNIAAsSQAAgNAKgKQAJgJANAAIDNAAQAMAAAKAJQAKAKAAANIAAAkQAcgjArgXQArgWA/AAQA0AAAtAPQAsAPAiAhQAiAhAUA1QAVA1ADBLIACAvIgCAvQgBBGgVA1QgUA0giAiQgiAhguARQgtAQg0AAQgzAAgpgQQgngRgcgmIAAD/QAAANgKAKQgJAKgOAAgAgmjQQgOAIgEAQQgGAQgBAVIgBAsIABAtQABATAHANQAGANANAIQANAGAUAAQAWAAAMgHQAMgJAFgPQAFgQACgWQAFgngFgoQgCgVgFgQQgFgQgMgIQgMgJgWAAQgWAAgNAJg");
	this.shape_4.setTransform(83.05,-62.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282E46").s().p("AjpEhQg1gcghg8Qghg9AAheIAAlLQAAgMAJgKQAKgKANAAIDlAAQAOAAAJAKQAKAKAAAMIAAFCQAABDA7AAQAcAAAQgRQAPgRAAghIAAlCQAAgMAKgKQAKgKANAAIDkAAQANAAAKAKQAJAKAAAMIAAIvQAAANgJAKQgKAJgNAAIjSAAQgNAAgJgJQgKgKAAgNIAAgoQgeAtg0AUQg1AThAAAQg7AAg2gdg");
	this.shape_5.setTransform(1.775,-73.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282E46").s().p("AjcGMQhXgkgrg7Qgrg6gDhCQAAgLAIgIQAIgIALAAIDkAAQATAAAKAFQALAGALAKIAZAPQANAGAQADQAQADATAAQAoAAAYgJQAZgJAAgPQAAgPgNgJQgPgKghgIQghgHg8gHQhfgOhFgfQhFgfgng2Qglg3AAhPQAAhRAug/QAug+BTgjQBSgjBtAAQBZAABGAYQBFAXAwAmQAwAmAZArQAZArABAoQAAAKgHAIQgIAIgKAAIjwAAQgRAAgJgFQgLgEgLgKQgFgGgRgIQgQgIgYAAQgeAAgOAJQgOAJAAAQQAAALALAJQALAKAdAHQAbAHA2AIQB4AOBJAgQBJAgAgAzQAiA1AABOQAABYg0A/Qg1BAhaAiQhaAihxAAQiFAAhWgkg");
	this.shape_6.setTransform(-80.175,-84.525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#282E46").s().p("AiZEyQg9gRgmgbQglgbgTgdQgSgegBgYQgBgNAJgJQAJgKAMAAIDRAAIACAAIADAAQAPABANAKIAaARQAOAIARAAQAKAAAJgFQAIgFAAgIQAAgLgGgJQgHgIgYgIQgagKg8gLQg4gKgygXQgygWgggoQgggpAAg/QAAgzAjgvQAjgvBEgeQBEgeBiAAQBJAAA6AQQA5ARApAbQAnAaAWAeQAWAeABAZQABAOgIAJQgIAKgLAAIi+AAIgGAAIgGAAQgRAAgNgJIgagSQgOgJgQAAQgJAAgIAGQgHAFAAAIQAAAJAHAKQAHAIAaAJQAcAIA/AJQBWAMAzAhQA0AgAWApQAWAqAAAoQAABBgmAuQgoAvhLAZQhLAXhqAAQhXABg8gSg");
	this.shape_7.setTransform(183.8893,78.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#282E46").s().p("Aj4D3QhdhOAAioIAAgEIAAgEQAChnArhHQArhHBMgjQBMgkBlAAQB2AABLAtQBMAtAkBJQAlBLAABYIAAAkQAAANgKAJQgJAJgOAAIlkAAIAAADIAAAEQAAAYAEAQQAEAQALAIQALAKARgBQAGAAAFgCQAGgDAFgFIALgLQALgMAHgDQAHgCAPAAIDjAAQAMAAAIAGQAHAIgBAMQgBAXgUAgQgUAfgnAfQgoAeg9ATQg9AUhTgBQicAAhdhMgAgaiTQgKAHgGASQgFAQAAAaIAAABIBfAAIAAgBQAAgagFgQQgGgSgLgHQgKgIgQAAQgPAAgLAIg");
	this.shape_8.setTransform(111.325,78.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#282E46").s().p("AhrHCQgNAAgJgJQgKgLAAgMIAAovQAAgNAKgJQAJgKANAAIDWAAQAOAAAJAKQAKAJAAANIAAIvQAAAMgKALQgJAJgOAAgAhkjvQgOAAgJgKQgKgJAAgNIAAiSQAAgMAKgLQAJgJAOAAIDKAAQAMAAAKAJQAKALAAAMIAACSQAAANgKAJQgKAKgMAAg");
	this.shape_9.setTransform(54.375,64.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#282E46").s().p("AhfE4QgRAAgJgJQgHgLgHgKIjmorIgBgJQAAgMAJgJQAHgIANAAIDKAAQASAAAJAKQAKAJADAKIBfEXIBgkXQAEgKAIgJQAKgKASAAIDKAAQANAAAHAIQAKAJgBAMQABAEgCAFIjmIrQgFAKgJALQgIAJgSAAg");
	this.shape_10.setTransform(-2.8,78.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#282E46").s().p("Ai5EmQhMgegpg8Qgng8gGhXQgCgcAAgdQAAgdACgaQAGhZAqg8QAsg7BMgeQBLgeBoAAQBpAABLAeQBMAeArA7QArA8AFBZQADAaAAAdQAAAdgDAcQgFBXgpA8QgoA8hLAeQhMAehugBQhuABhLgegAgphuQgKAVgCAoIgCAxIACAzQACAqAKATQAIAUAhAAQAiAAAJgUQAIgTADgqIABgzIgBgxQgDgogIgVQgJgVgiAAQghAAgIAVg");
	this.shape_11.setTransform(-79.1,78.55);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#282E46").s().p("AEME+QgNAAgKgKQgJgKAAgMIAAlJQAAgUgGgNQgGgNgKgHQgKgHgQAAQgOAAgLAHQgLAHgGANQgFANAAAUIAAFJQAAAMgJAKQgKAKgNAAIjSAAQgOAAgJgKQgKgKAAgMIAAlJQAAgUgGgNQgGgNgKgHQgKgHgQAAQgOAAgLAHQgLAIgGAMQgGANAAAUIAAFJQAAAMgKAKQgJAKgNAAIjZAAQgNAAgJgKQgKgKAAgMIAAovQAAgNAKgKQAJgJANAAIDGAAQAOAAAJAJQAKAKAAANIAAAoQAUgcAsgbQAsgbA7gCQCMgFAwBnQAcgqAygcQAzgcA3AAQA9AAAyAcQAyAbAeA7QAeA6AABfIAAFQQAAAMgKAKQgKAKgMAAg");
	this.shape_12.setTransform(-173.625,77.9611);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#282E46").s().p("ACCGqQhXAAhDgYQhDgXgng4Qgng4AAhjIAAicIhfAAQgOAAgJgJQgJgJAAgOIAAiRQAAgNAJgJQAJgKAOAAIBfAAIAAjDQAAgNAJgLQAKgJANAAIDRAAQANAAAKAJQAKALAAANIAADDICXAAQANAAAKAKQAJAJAAANIAACRQAAAOgJAJQgKAJgNAAIiXAAIAACEQAAAbAMAQQANARAaAAIBtAAQAOAAAJAKQAJAKAAAMIAACeQAAAMgJALQgJAJgOAAg");
	this.shape_13.setTransform(486.425,67.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#282E46").s().p("AjjEqQg1gYgdgrQgdgsAAg2QAAhYBIgwQBHgyB3gUIB+gUIAAgCQAAgfgEgOQgGgPgZAAQgQAAgKAHQgKAHgMALQgOANgUAAIjMAAQgMABgIgIQgHgHAAgMQACgXASgeQASgfAmgdQAlgdA7gTQA9gSBSgBQBSAAA8ARQA9ASAoAhQAnAhAUAxQAUAvAAA+IAAFYQAAAMgKALQgJAJgNAAIjTAAQgNAAgJgJQgKgLAAgMIAAgiQgRAYgZARQgZASghAJQggAKglgBQhFAAg1gZgAgPBFQggAHgKALQgLANAAANQAAAIAFAIQAFAIAKAEQALAFAOAAQAYAAARgJQARgJAKgWQAKgVAAgfIAAgBg");
	this.shape_14.setTransform(416.7,78.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#282E46").s().p("ABcGqQgNAAgKgJQgJgLAAgMIAAlDQAAgggQgSQgPgQgcgBQgdABgQAQQgQASAAAgIAAFDQAAAMgJALQgLAJgNAAIjqAAQgNAAgJgJQgKgLAAgMIAAsSQAAgNAKgLQAJgJANAAIDqAAQANAAALAJQAJALAAANIAAECQAfgjAvgVQAwgTA3AAQA9AAA3AdQA3AdAiA7QAiA9AABdIAAFMQAAAMgJALQgKAJgNAAg");
	this.shape_15.setTransform(339.95,67.15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#282E46").s().p("ACCGqQhXAAhDgYQhDgXgng4Qgng4AAhjIAAicIhfAAQgOAAgJgJQgJgJAAgOIAAiRQAAgNAJgJQAJgKAOAAIBfAAIAAjDQAAgNAJgLQAKgJANAAIDRAAQANAAAKAJQAKALAAANIAADDICXAAQANAAAKAKQAJAJAAANIAACRQAAAOgJAJQgKAJgNAAIiXAAIAACEQAAAbAMAQQANARAaAAIBtAAQAOAAAJAKQAJAKAAAMIAACeQAAAMgJALQgJAJgOAAg");
	this.shape_16.setTransform(265.775,67.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#282E46").s().p("AhfE4QgSAAgIgJQgIgLgFgKIjoorIgBgJQAAgMAJgJQAJgIAMAAIDLAAQARAAAKAKQAIAJAEAKIBfEXIBgkXQADgKAKgJQAJgKASAAIDKAAQAMAAAJAIQAIAJABAMQAAAEgCAFIjmIrQgFAKgJALQgIAJgSAAg");
	this.shape_17.setTransform(-9.6,78.55);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#282E46").s().p("Ai6EmQhLgegpg8Qgng8gHhXQgBgcAAgdQAAgdABgaQAHhZArg8QArg7BLgeQBMgeBoAAQBpAABLAeQBLAeArA7QArA8AHBZQACAaAAAdQAAAdgCAcQgHBXgoA8QgnA8hMAeQhMAehugBQhtABhNgegAgqhuQgJAVgDAoIAAAxIAAAzQADAqAJATQAJAUAhAAQAjAAAIgUQAIgTADgqIABgzIgBgxQgDgogIgVQgIgVgjAAQghAAgJAVg");
	this.shape_18.setTransform(-85.9,78.55);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#282E46").s().p("AjzE4QgNAAgJgJQgKgLAAgMIAAovQAAgNAKgKQAJgJANAAIDSAAQAOAAAKAJQAIAKABANIAAArQAlgiAwgUQAugVA3AAIA6AAQANAAAJAJQAKAKAAANIAAC8QAAAMgKAKQgJAKgNAAIibAAQglAAgRASQgSASAAAjIAAEMQAAAMgKALQgJAJgMAAg");
	this.shape_19.setTransform(404.3,230.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#282E46").s().p("Aj4D2QhdhNAAioIAAgEIAAgEQAChnArhGQArhHBMgkQBMgjBlgBQB2AABLAtQBMAtAkBJQAlBLAABXIAAAkQAAAOgKAJQgJAKgOAAIlkAAIAAACIAAAEQAAAYAEAQQAEARALAIQALAIARABQAGAAAFgEQAGgCAFgGIALgLQALgLAHgCQAHgEAPAAIDjAAQAMABAIAGQAHAJgBALQgBAXgUAfQgUAhgnAdQgoAeg9AVQg9AShTABQicAAhdhOgAgaiTQgKAIgGAQQgFARAAAbIAAAAIBfAAIAAAAQAAgbgFgRQgGgQgLgIQgKgIgQAAQgPAAgLAIg");
	this.shape_20.setTransform(334.175,230.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#282E46").s().p("AB+E4QgTAAgIgJQgKgKgEgLIhUjzIhWDzQgEALgIAKQgJAJgSAAIihAAQgSAAgJgJQgKgKgDgLIivoqIgBgLQAAgLAIgJQAIgIAMAAIC5AAQASAAAKAJQALALACAIIBJD6IBPj6QABgIALgLQAKgJASAAIBvAAQASAAAKAJQAKALACAIIBOD6IBKj6QACgIAKgLQAKgJATAAIC4AAQAMAAAJAIQAIAJAAALIgBALIivIqQgDALgKAKQgJAJgSAAg");
	this.shape_21.setTransform(244.45,230.8);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#282E46").s().p("Ai5EmQhMgegog8Qgog8gGhYQgCgbAAgdQAAgdACgaQAGhZAqg8QAsg7BLgeQBMgdBogBQBoABBMAdQBLAeAsA7QArA8AGBZQACAaAAAdQAAAdgCAbQgGBYgpA8QgoA8hLAeQhMAdhuABQhugBhLgdgAgphuQgKAVgDAoIgBAxIABAzQADApAKAUQAIAUAhAAQAjAAAIgUQAIgUADgpIABgzIgBgxQgDgogIgVQgIgVgjAAQghAAgIAVg");
	this.shape_22.setTransform(153.8,230.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#282E46").s().p("Ak+GwQgNAAgJgKQgKgKAAgNIAAsSQAAgNAKgKQAJgJANAAIDMAAQANAAALAJQAJAKAAANIAAAkQAcgjAsgXQAqgWA/AAQA0AAAsAPQAtAPAiAhQAiAhAUA1QAVA1AEBLIABAvIgBAvQgDBGgUA1QgVA0giAiQghAhguARQgtAQg0AAQgzAAgpgQQgogRgbgmIAAD/QAAANgKAKQgJAKgOAAgAgmjQQgOAIgEAQQgGAQgBAVIgBAsIABAtQABATAHANQAGANANAIQAMAGAVAAQAWAAALgHQAMgJAGgPQAFgQACgWQAEgngEgoQgCgVgFgQQgGgQgMgIQgLgJgWAAQgWAAgNAJg");
	this.shape_23.setTransform(76.45,241.625);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#282E46").s().p("Aj4D2QhdhNAAioIAAgEIAAgEQAChnArhGQArhHBMgkQBMgjBlgBQB2AABLAtQBMAtAkBJQAlBLAABXIAAAkQAAAOgKAJQgJAKgOAAIlkAAIAAACIAAAEQAAAYAEAQQAEARALAIQALAIARABQAGAAAFgEQAGgCAFgGIALgLQALgLAHgCQAHgEAPAAIDjAAQAMABAIAGQAHAJgBALQgBAXgUAfQgUAhgnAdQgoAeg9AVQg9AShTABQicAAhdhOgAgaiTQgKAIgGAQQgFARAAAbIAAAAIBfAAIAAAAQAAgbgFgRQgGgQgLgIQgKgIgQAAQgPAAgLAIg");
	this.shape_24.setTransform(-113.725,230.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#282E46").s().p("AEME+QgNAAgKgKQgJgKAAgMIAAlJQAAgUgGgNQgGgNgKgHQgKgHgQAAQgOAAgLAHQgLAHgGANQgFANAAAUIAAFJQAAAMgJAKQgKAKgNAAIjSAAQgOAAgJgKQgKgKAAgMIAAlJQAAgUgGgNQgGgNgKgHQgKgHgQAAQgOAAgLAHQgLAIgGAMQgGANAAAUIAAFJQAAAMgKAKQgJAKgNAAIjZAAQgNAAgJgKQgKgKAAgMIAAovQAAgNAKgKQAJgJANAAIDGAAQAOAAAJAJQAKAKAAANIAAAoQAUgcAsgbQAsgbA7gCQCMgFAwBnQAcgqAygcQAzgcA3AAQA9AAAyAcQAyAbAeA7QAeA6AABfIAAFQQAAAMgKAKQgKAKgMAAg");
	this.shape_25.setTransform(-180.425,77.9611);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#5D999D").s().p("ACcGkQgYAAgLgLIgOgRIjKkyIAAEuQAAAMgKAKQgKAKgMAAIjaAAQgNAAgJgKQgKgKAAgMIAAsGQAAgOAKgKQAJgJANAAIC/AAQAWAAAMALQALAKADAHIDKFMIAAlHQAAgOAKgKQAJgJANAAIDaAAQANAAAJAJQAKAKAAAOIAAMGQAAAMgKAKQgJAKgNAAg");
	this.shape_26.setTransform(328.35,372.25);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#5D999D").s().p("Ak4GkQgNAAgKgKQgJgKAAgMIAAsGQAAgOAJgKQAKgJANAAIJnAAQANAAAKAJQAKAKgBAOIAACoQABAOgKAJQgKAKgNAAIlnAAIAABLIFNAAQANAAAJAKQAKAKAAANIAACbQAAANgKAKQgJAKgNAAIlNAAIAABLIFwAAQANAAAKAJQAKAKAAAOIAACpQAAAMgKAKQgKAKgNAAg");
	this.shape_27.setTransform(245,372.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#5D999D").s().p("ADGGkQgNAAgKgKQgKgKABgMIAAlJIhQCCQgFAJgLALQgKAKgSAAIhTAAQgSAAgKgKQgLgLgFgJIhQiCIAAFJQAAAMgJAKQgKAKgMAAIjaAAQgNAAgKgKQgJgKAAgMIAAsGQAAgOAJgKQAKgJANAAIC+AAQAXAAAMANIAQAUICuEgICukgQADgHAMgNQAMgNAYAAIC9AAQANAAAKAJQAJAKAAAOIAAMGQAAAMgJAKQgKAKgNAAg");
	this.shape_28.setTransform(152.55,372.25);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#5D999D").s().p("AjOGMQhYgkgzhIQgzhJgFhqIgBhpIABhqQAFhpAzhKQAyhJBZgnQBYgmB2AAQB1AABZAmQBYAnAzBJQA0BKADBpQACA0ABA2QgBA3gCAyQgEBqg0BJQgyBIhZAkQhYAkh1AAQh1AAhZgkgAgti6QgTAKgMAVQgMAWgBAhQgBAyAAAyIABBlQADAyAXAYQAXAXAoAAQAmAAAZgXQAYgYABgyQACg0AAgxQAAgygCgyQgCghgLgWQgLgVgTgKQgUgLgZAAQgZAAgUALg");
	this.shape_29.setTransform(56.75,372.225);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#5D999D").s().p("ACTGkQgXAAgMgNQgLgMgDgHIhij3IhhD3QgDAHgLAMQgMANgXAAIisAAQgYAAgPgPQgOgPgCgQIhvr7IAAgCIAAgCQAAgKAIgIQAIgIAKAAIDgAAQAoAAADAhIApFRIAxiWQADgHAIgOQAIgNAWAAIB6AAQAVAAAIANQAJAOACAHIAyCVIAolQQADghAoAAIDgAAQAKAAAJAIQAHAIAAAKIAAACIAAACIhuL7QgCAQgOAPQgQAPgYAAg");
	this.shape_30.setTransform(-39.2,372.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12,p:{x:-173.625,y:77.9611}},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9,p:{x:54.375}},{t:this.shape_8,p:{x:111.325}},{t:this.shape_7,p:{x:183.8893}}]},1).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_12,p:{x:-180.425,y:77.9611}},{t:this.shape_18},{t:this.shape_17},{t:this.shape_9,p:{x:47.575}},{t:this.shape_8,p:{x:104.525}},{t:this.shape_7,p:{x:177.0893}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},1).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_25},{t:this.shape_18},{t:this.shape_17},{t:this.shape_9,p:{x:47.575}},{t:this.shape_8,p:{x:104.525}},{t:this.shape_7,p:{x:177.0893}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_24},{t:this.shape_12,p:{x:-20.025,y:230.2111}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19}]},1).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_25},{t:this.shape_18},{t:this.shape_17},{t:this.shape_9,p:{x:47.575}},{t:this.shape_8,p:{x:104.525}},{t:this.shape_7,p:{x:177.0893}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_24},{t:this.shape_12,p:{x:-20.025,y:230.2111}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-276.8,-157.9,835.8,611);


(lib.replay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2B2B2B").s().p("EgMbAhQQmliulGlGQlGlGiumkQiumlAAnNQAAnMCumkQCumlFGlGQFGlGGkiuQGliuHMAAQE3AAEqBSQEsBREJCeQDfCEC8C0QC9CzCPDXICGhNQAbgPAbAPQAbAQAAAfIAAJ1QAAAfgbAPQgbAQgbgQIohk6QgagQAAgfQAAgeAagQICPhTQkWmXm1joQm3jqnvAAQmUAAlyCdQlmCYkTEUQkVEUiXFlQidFyAAGUQAAGVCdFyQCXFmEVEUQETEUFmCXQFyCdGUAAQIYAAHSkPQHSkPEJnSQAgg4A9gQQA/gRA3AfQA4AgAQA+QASA+ggA3QiUEFjTDWQjTDXkCCZQkJCeksBSQkrBRk2AAQnMAAmkiug");
	this.shape.setTransform(-0.0135,0.0109,0.9999,0.9999);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B2B2B").s().p("AvjSxQhZg0AAhnMAAAggrQAAhnBZg0QBag0BZA0IcUQWQBZA0AABmQAABnhZA0I8UQWQgtAagsAAQgtAAgtgag");
	this.shape_1.setTransform(33.3844,-2.4827,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-221.7,-230.2,443.4,460.4);


(lib.megaphone = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CD807B").s().p("AglAIIBKgUIABAFIhKAUg");
	this.shape.setTransform(177.368,374.3774,1.8097,1.8097);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CD807B").s().p("AhgAgIDAhDIABAFIi/BCg");
	this.shape_1.setTransform(177.9109,347.9558,1.8097,1.8097);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CD807B").s().p("Ah8AnID4hSIABAFIj4BSg");
	this.shape_2.setTransform(152.4847,297.2392,1.8097,1.8097);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CD807B").s().p("AiCAlIEEhOIABAFIkDBOg");
	this.shape_3.setTransform(158.0948,323.7965,1.8097,1.8097);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F3B4B0").s().p("AibBLQgFgHgEgMQgEgMAAgHQgBgZAYgQQAQgLAygUIB6gwQArgRAgACQAhACAJAYIAIAbQAHAZgZAWQgWAVgrARIh1AmQgzAUgXABIgFAAQgdAAgPgYg");
	this.shape_4.setTransform(151.222,286.8724,1.8097,1.8097);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F3B4B0").s().p("AhbBXQgrgKgJgnQgNg4BXgdIBigkQAmgLAeAHQAfAJAJAaIAGATQAJAbgUAXQgTAXgmAMIhsAhQgOAGgRAAQgNAAgOgEg");
	this.shape_5.setTransform(180.7149,360.0671,1.8097,1.8097);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#F3B4B0").s().p("AigBzQgngIgOgfQgGgNgBgOQgCgiAegbQAegbA2gPIC1g1QA2gPAmAIQApAJAIAgIAFAYQAIAggfAcQgeAcg1AQIi1A0QgjALgdAAQgPAAgNgDg");
	this.shape_6.setTransform(163.3897,337.4337,1.8097,1.8097);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F3B4B0").s().p("AjQBMQgFgMgBgNQgBghAZgWQAZgXA3gSICtg5QA3gSAoAFQAqAGAIAdIAGAVQAIAdghAeQgfAdg3ASIi0A7QgjALgaAAQgyAAgUgpg");
	this.shape_7.setTransform(158.6415,309.7818,1.8097,1.8097);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F2A79F").s().p("AgOAlQgMgDgIgJQAegyARgLQAYANgCAGQgDANgOATQgPAWgNAAIgEAAg");
	this.shape_8.setTransform(116.7569,252.4976,1.8097,1.8097);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F2A79F").s().p("AieELQgki+AVg5IA5hwQA+h6AdgxQACgEAug1IAyg4QAegyASgMQAOgJAPADQARAEAJAUQANAjgRAtQgHATgwBdQgZAugQA5QgYBLAMAjQAUA/hACpQhCCwhKA1QgVhUgRhfg");
	this.shape_9.setTransform(97.1536,325.1763,1.8097,1.8097);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#B5E4E6").s().p("AgOBYQgVgdgLguQgLguAGgkQAGglAUgFQATgFAVAdQAVAdALAuQALAtgGAkQgGAlgTAFIgHABQgRAAgRgYg");
	this.shape_10.setTransform(379.9573,122.9702,1.8092,1.8092);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#48848A").s().p("AhYDvQgegBgWgWQhIhIgdhVQgoh4A3iAQALgYAVgNQAVgOAYACIFdAZIA7DVIkmDbQgWAUgdAAIgCAAg");
	this.shape_11.setTransform(338.9255,141.3932,1.8092,1.8092);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#193030").s().p("AhBIQQiiiXhekEQhfkEAcjbQAbjaCGgxQCFgwChCWQChCWBeEFQBfEEgcDaQgbDbiGAwQggAMgjAAQhqAAh4hxg");
	this.shape_12.setTransform(342.8842,130.8312,1.8092,1.8092);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#48848A").s().p("AhRJYQi5iphrkoQhrkmAij5QAij5Cbg4QCbg4C4CpQC5CpBrEoQBsEngiD4QgiD5ibA4QgnAPgpAAQh6AAiKiAg");
	this.shape_13.setTransform(341.4636,131.3882,1.8092,1.8092);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#336062").s().p("AjcEYIiktOIEQioIHxWVIkkAog");
	this.shape_14.setTransform(311.6593,136.618,1.8092,1.8092);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#193030").s().p("AiMCfQgagSgOgtQgZhOAkg0QASgaAXgLIDohkQg1ByBBBpQAgA1ArAdQjMAog5ACIgMAAQgkAAgWgNg");
	this.shape_15.setTransform(33.8389,239.8193,1.8092,1.8092);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#336062").s().p("AhgIwQiziZhjkPQhikPAojoQAojoCbg4QCbg4CyCYQC0CZBiEPQBjEPgoDoQgpDoibA4QgpAPgsAAQh2AAiChvg");
	this.shape_16.setTransform(292.821,148.9659,1.8092,1.8092);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#48848A").s().p("AuiI9IBGisIT5xPIIGV6I6oADg");
	this.shape_17.setTransform(208.4433,136.0753,1.8092,1.8092);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#282E46").s().p("AA4GEQgdgQgKggIi8p4QgKghAQgdQAQgdAggKQAhgKAdAQQAeAQAJAgIC8J4QAKAhgQAdQgQAeggAJQgMAEgMAAQgTAAgTgKg");
	this.shape_18.setTransform(137.341,313.0621,1.8092,1.8092);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#CD807B").s().p("AgLCOIANgPQAOgUAGgdQAUhZhIiDIAEgDQBJCHgUBaQgHAdgPAVIgNAQg");
	this.shape_19.setTransform(119.6033,377.6529,1.8101,1.8101);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#F2A79F").s().p("AjwMgQAAg5gEhZQgEhgAAgqIgHnrQgBgXgMhBIgbiKQgciMgLhCQgRhtADgqQAEgjAng8QAGgKA6gkQA8gmAegrQAYghBJAXQBHAXAKAjIAAABIAPAxIASA2IABADIAhAjIABABIAxA0IABACIAGAGIANgNQARgOARgEQANgEAPAEIAIADIAcAPQAdARAfAiQAeAhgDAJIAAALQABANgBAEQgOBihPBxIgYAnQgoA+gHAjQgFAYgIBHIABAOQAEAaAaCFQAIAnATDiQATDuAHAuIAJA5g");
	this.shape_20.setTransform(128.9831,442.5744,1.8101,1.8101);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.7,-0.2,424.7,587.7);


(lib.light_right = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FDF5C6").s().p("Eg0ZAc0MBmjg5nICQHSMg4zAyVg");
	this.shape.setTransform(335.375,184.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,670.8,368.7);


(lib.light_left = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FDF5C6").s().p("AEbc0Mg40gyVICQnSMBmjA5ng");
	this.shape.setTransform(335.4,184.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,670.8,368.7);


(lib.flashCamera = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EhrXA8IMAAAh4PMDWvAAAMAAAB4Pg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-687.2,-384.8,1374.5,769.7);


(lib.equality = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#301E54").s().p("AhyGbQgMAAgLgJQgJgLAAgMIAAjnIkIoKIgCgFIAAgGQAAgKAHgIQAIgHALAAIDcAAQAXAAAMALQAMAMADAGIB0DsIB2jsQABgFAMgNQANgLAXAAIDdAAQALAAAHAHQAIAIAAAKIgBAGIgCAFIkIIKIAADnQAAANgKAKQgJAJgNAAg");
	this.shape.setTransform(264.5101,-3.189,0.9999,0.9999);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#301E54").s().p("Ah1GbQgMAAgKgJQgJgKAAgNIAAoZIjDAAQgNAAgKgJQgJgJAAgNIAAi+QAAgNAJgJQAKgJANAAIKvAAQANAAAKAJQAJAJAAANIAAC+QAAANgJAJQgKAJgNAAIjDAAIAAIZQAAANgJAKQgLAJgMAAg");
	this.shape_1.setTransform(183.1969,-3.1905,0.9999,0.9999);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#301E54").s().p("Ah3GbQgMAAgKgJQgKgLAAgMIAAr2QAAgMAKgKQAKgJAMAAIDvAAQANAAAJAJQAKAKAAAMIAAL2QAAAMgKALQgKAJgMAAg");
	this.shape_2.setTransform(121.9757,-3.1905,0.9999,0.9999);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#301E54").s().p("AknGbQgMAAgLgJQgJgLAAgMIAAr2QAAgMAJgKQAKgJANAAIDrAAQANAAAJAJQAJAJAAANIAAIlIFFAAQANAAAKAKQAJAJAAANIAACxQAAAMgJALQgLAJgMAAg");
	this.shape_3.setTransform(66.0541,-3.1905,0.9999,0.9999);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#301E54").s().p("ADJGbQgXAAgKgKQgKgLgDgIIgchOIj8AAIgdBOQgDAJgKAKQgJAKgYAAIjZAAQgLAAgHgIQgIgHAAgLIABgIIEHrtQADgMANgNQANgNAXAAID/AAQAYAAAMANQANANAEAMIEGLtIABAIQgBALgHAHQgHAIgMAAgAhCBLICEAAIhCjag");
	this.shape_4.setTransform(-17.5408,-3.1905,0.9999,0.9999);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#301E54").s().p("AjFF/QhWghgwhIQgxhJAAhuIAAngQAAgMAKgKQAKgJAMAAIDnAAQANAAAJAJQAJAJAAANIAAHbQAAAsAWAYQAWAXAqAAQArAAAWgXQAWgYAAgsIAAnbQAAgNAKgJQAJgJANAAIDmAAQANAAAKAJQAJAKAAAMIAAHgQAABvgwBIQgxBHhVAiQhWAihwAAQhvAAhXgig");
	this.shape_5.setTransform(-103.5105,-2.6155,0.9999,0.9999);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#301E54").s().p("ACQHHQgXAAgKgKQgLgKgFgHIghgpQgeAEglAAQh0AAhWgjQhWgkgyhHQgyhHgFhoIAAjOQAFhmAxhJQAxhHBYgnQBXglBzAAQByAABXAlQBYAnAxBHQAyBHADBoQADA4AAAwQAAAwgDA2QgGCEhOBQIBcCFQACABABAEIABAGQACAKgHAIQgIAHgKAAgAgxjXQgUAKgLAVQgLAVgBAhIAADFQACAxAXAXQAXAXAnAAQAmAAAXgXQAXgWACgyQACg5AAgqQAAgsgCg2QgCghgLgVQgKgUgUgLQgTgKgYAAQgYAAgUAKg");
	this.shape_6.setTransform(-190.3911,0.0109,0.9999,0.9999);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#301E54").s().p("AkxGbQgNAAgJgJQgKgKAAgNIAAr2QAAgNAKgJQAJgJANAAIJaAAQANAAAJAJQAKAKAAAMIAACmQAAANgKAJQgJAKgNAAIlgAAIAABKIFGAAQANAAAJAJQAKAJAAANIAACYQAAANgKAKQgJAJgNAAIlGAAIAABKIFpAAQAMAAALAJQAJAKAAANIAAClQAAANgJAKQgLAJgMAAg");
	this.shape_7.setTransform(-272.0503,-3.1905,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-305.8,-45.5,611.7,91.1);


(lib.CTA = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AkbFsQgQAAgKgLQgMgMAAgPIAAqLQAAgPAMgMQAKgLAQAAID1AAQAPAAAMALQALAMgBAPIAAAxQAsgnA4gYQA3gYA/AAIBDAAQAPAAAMALQALAMAAAPIAADaQAAAPgLAMQgMALgPAAIi0AAQgqAAgVAVQgVAWgBAoIAAE4QAAAPgLAMQgKALgPAAg");
	this.shape.setTransform(313.35,20.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AkiEgQhshbAAjEIAAgEIAAgFQACh4AyhSQAyhUBZgpQBZgqB2AAQCJAABYA1QBZA0AqBWQArBWAABnIAAAqQAAAPgMALQgKAMgQgBImgAAIAAADIAAAFQAAAcAFASQAEAUANAJQANALAUAAQAHAAAGgEQAHgDAGgGIANgNQANgNAIgDQAIgEARAAIEJAAQAOAAAJAIQAJAJgBAOQgCAagXAmQgXAlguAjQguAjhIAXQhHAXhhAAQi2AAhthagAgeirQgMAJgHATQgGAUAAAeIAAACIBvAAIAAgCQAAgegGgUQgGgTgNgJQgNgKgSAAQgSAAgMAKg");
	this.shape_1.setTransform(231.475,20.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("ABsHxQgQAAgLgLQgLgMAAgPIAAl4QAAgmgTgUQgRgTghAAQgiAAgSATQgUAUABAmIAAF4QAAAPgMAMQgLALgPAAIkSAAQgOAAgMgLQgLgMAAgPIAAuWQAAgOALgMQAMgLAOAAIESAAQAPAAALALQAMAMAAAOIAAEuQAjgpA4gXQA4gXBAAAQBIABA/AhQBAAiApBFQAnBGAABtIAAGDQAAAPgLAMQgMALgPAAg");
	this.shape_2.setTransform(140.05,7.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282E46").s().p("ACYHxQhmAAhOgcQhPgbgthCQgthBAAhzIAAi2IhvAAQgQAAgLgLQgLgKAAgQIAAipQAAgPALgMQALgLAQAAIBvAAIAAjlQgBgOALgMQALgLAQAAID0AAQAPAAALALQAMAMAAAOIAADlICwAAQAPAAAMALQALAMAAAPIAACpQAAAQgLAKQgMALgPAAIiwAAIAACaQAAAhAOASQAPATAfAAIB/AAQAQAAALALQALAMAAAPIAAC3QAAAPgLAMQgLALgQAAg");
	this.shape_3.setTransform(53.5,7.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282E46").s().p("AkiEgQhshbAAjEIAAgEIAAgFQACh4AyhSQAyhUBZgpQBZgqB2AAQCJAABYA1QBZA0AqBWQArBWAABnIAAAqQAAAPgMALQgKAMgQgBImgAAIAAADIAAAFQAAAcAFASQAEAUANAJQANALAUAAQAHAAAGgEQAHgDAGgGIANgNQANgNAIgDQAIgEARAAIEJAAQAOAAAJAIQAJAJgBAOQgCAagXAmQgXAlguAjQguAjhIAXQhHAXhhAAQi2AAhthagAgeirQgMAJgHATQgGAUAAAeIAAACIBvAAIAAgCQAAgegGgUQgGgTgNgJQgNgKgSAAQgSAAgMAKg");
	this.shape_4.setTransform(-26.125,20.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282E46").s().p("Ai0HvQhPgegvgrQgwgrgVgqQgVgogBgXQgCgQAMgLQAMgKAPgBIESAAQAPAAAJAIQAJAHAGANQAGAMAHAHQAIAKAKADQAKADAQAAQAWAAANgJQANgJAGgSQAHgTAAgcIAAhcQghAcgtAQQguAQg9AAQhDAAg0gQQg2gRgmglQglglgXg9QgWg7gFhYQgBglABgiQAFhTAVg9QAWg8AmgoQAngnA2gUQA0gTBDAAQBEAAA0AaQA0AbAiAqIAAgsQAAgPALgMQALgKAPgBID1AAQAQABALAKQALAMAAAPIACKZQAAB2g2BKQg1BHhZAjQhaAjhvAAQh2AAhPgegAgmkJQgPALgGASQgHASgDAZQgCAbACAaQADAaAHASQAGASAPAKQAPAKAYAAQAXAAAPgJQAOgIAJgQQAHgPACgWIABgnIgBglQgCgWgHgQQgJgPgOgJQgPgIgXAAQgYAAgPAJg");
	this.shape_5.setTransform(-117.6125,35.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282E46").s().p("AjYFXQhZgjgvhGQguhGgIhmQgBggAAgiQAAgiABgfQAIhnAyhGQAyhFBYgjQBZgiB5gBQB6ABBYAiQBYAjAyBFQAzBGAGBnQADAfAAAiQAAAigDAgQgGBmgwBGQguBGhYAjQhYAiiBABQiAgBhYgigAgxiAQgLAYgDAvIgBA5IABA7QADAwALAYQAKAXAnAAQAoAAAKgXQAJgYAEgwQABgVAAgmQAAglgBgUQgEgvgJgYQgKgZgoAAQgnAAgKAZg");
	this.shape_6.setTransform(-208.025,20.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#282E46").s().p("AiLHqQgPAAgMgLQgLgMAAgPIAAqAIjoAAQgPAAgMgLQgLgMAAgPIAAjhQAAgPALgLQAMgMAPAAIMzAAQAPAAALAMQAMALAAAPIAADhQAAAPgMAMQgLALgPAAIjpAAIAAKAQABAPgMAMQgLALgPAAg");
	this.shape_7.setTransform(-300.15,8.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#282E46").s().p("Aj4D2QhdhNAAioIAAgEIAAgEQAChnArhGQArhHBMgkQBMgjBlgBQB2AABLAtQBMAtAlBKQAkBKAABXIAAAkQAAAOgJAJQgKAKgOAAIlkAAIAAACIAAAEQAAAYAEAQQAEARAMAIQAKAIARABQAGAAAFgEQAGgCAFgGIAMgLQAKgLAIgCQAGgEAPAAIDjAAQAMABAIAGQAHAJgBALQgBAXgTAfQgVAhgnAdQgnAeg+AVQg9AShTABQicAAhdhOgAgZiTQgLAIgGAQQgFARAAAaIAAABIBfAAIAAgBQAAgagFgRQgFgQgLgIQgLgIgQAAQgPAAgKAIg");
	this.shape_8.setTransform(-303.45,186.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#282E46").s().p("AB9E4QgSAAgJgJQgJgKgDgLIhWjzIhVDzQgDALgKAKQgIAJgTAAIihAAQgRAAgKgJQgIgKgEgLIivoqIgBgLQAAgLAIgJQAIgIANAAIC4AAQASAAAKAJQALALACAIIBKD6IBNj6QADgIAKgLQAKgJASAAIBuAAQATAAAJAJQAMALACAIIBOD6IBJj6QACgIAKgLQAKgJASAAIC6AAQALAAAJAIQAIAJAAALIgBALIiwIqQgDALgJAKQgJAJgSAAg");
	this.shape_9.setTransform(-393.15,186.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#282E46").s().p("ABcE+QgOAAgJgKQgJgKAAgMIAAlCQAAghgQgRQgQgRgcAAQgcAAgQARQgPARAAAhIAAFCQAAAMgKAKQgKAKgNAAIjkAAQgNAAgJgKQgKgKAAgMIAAovQAAgNAKgKQAJgJANAAIDSAAQANAAAKAJQAJAKAAANIAAAoQAegjA0gYQA1gZBAAAQA9AAA1AdQA1AcAgA8QAhA9AABeIAAFLQAAAMgJAKQgKAKgNAAg");
	this.shape_10.setTransform(-0.875,185.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#282E46").s().p("AjiEqQg1gZgegqQgdgsAAg1QAAhZBHgxQBIgxB3gUIB+gVIAAgBQAAgggEgOQgGgOgZAAQgQAAgKAHQgLAGgMAMQgNAOgUAAIjLAAQgNAAgIgIQgHgHABgMQABgWASgfQASgfAlgdQAmgcA8gUQA7gTBTAAQBRABA+ARQA8ARAoAgQAnAiAUAxQAUAvAAA/IAAFXQAAAMgKALQgJAJgNAAIjSAAQgNAAgLgJQgJgLAAgMIAAgiQgRAYgaASQgZARgfAKQghAJgmAAQhEAAg0gagAgPBFQggAHgLAMQgKAMAAANQAAAIAGAIQAFAIAJAFQALAEAOAAQAXAAASgJQASgKAJgUQAKgVAAggIAAgBg");
	this.shape_11.setTransform(-80.25,186.25);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#282E46").s().p("AisEkQhKgfgug+Qgtg9gGhZIgBgwIABgvQAGhaAsg9QAtg/BLgfQBLgfBcgBQBeABBCAaQBDAbApAnQApAnAUAmQAUAnABAYQACANgKAKQgLAJgNAAIjqAAQgNAAgIgGQgIgHgGgLQgIgQgJgKQgJgKgRABQgcgBgJAVQgKAUgBAkQgCAzACAhQACAnAJASQAJASAcAAQAUABAIgKQAIgJAHgRQAFgLAIgHQAJgGANAAIDqAAQANAAALAKQAKAJgCANQgBAQgMAcQgLAcgYAhQgZAggpAeQgoAdg8ATQg6ARhOABQhcgBhKgfg");
	this.shape_12.setTransform(-152.8902,186.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#282E46").s().p("Aj4D2QhdhNAAioIAAgEIAAgEQAChnArhGQArhHBMgkQBMgjBlgBQB2AABMAtQBLAtAkBKQAlBKAABXIAAAkQAAAOgKAJQgJAKgOAAIlkAAIAAACIAAAEQAAAYAEAQQAEARAMAIQAKAIARABQAGAAAFgEQAGgCAGgGIALgLQALgLAHgCQAGgEAPAAIDjAAQANABAHAGQAIAJgCALQgBAXgUAfQgTAhgoAdQgnAeg+AVQg9AShTABQicAAhdhOgAgaiTQgKAIgGAQQgFARAAAaIAAABIBfAAIAAgBQAAgagFgRQgFgQgMgIQgKgIgQAAQgPAAgLAIg");
	this.shape_13.setTransform(433.4,186.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#282E46").s().p("Ak+GwQgNAAgJgKQgKgKAAgNIAAsSQAAgNAKgKQAJgJANAAIDNAAQANAAAKAJQAJAKAAANIAAAkQAbgjAtgXQArgWA9AAQA1AAAsAPQAtAPAiAhQAiAhAVA1QAUA1AEBLIABAvIgBAwQgDBFgUA1QgUA0gjAiQgiAhgtARQgtAQg1AAQgyAAgpgQQgngRgcgmIAAD/QAAANgKAKQgKAKgNAAgAgmjQQgNAIgGAQQgFAQgBAVIgBAsIABAtQABATAGANQAHANANAIQAMAGAVAAQAVAAAMgHQAMgJAGgPQAFgQADgWQADgngDgoQgDgVgFgQQgGgQgMgIQgMgJgVAAQgWAAgNAJg");
	this.shape_14.setTransform(357.05,197.075);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#282E46").s().p("AjjEqQg1gZgcgqQgegsAAg1QAAhZBIgxQBHgxB4gUIB+gVIAAgBQAAgggGgOQgFgOgZAAQgQAAgKAHQgKAGgNAMQgNAOgTAAIjNAAQgMAAgHgIQgJgHABgMQACgWASgfQASgfAlgdQAngcA6gUQA8gTBTAAQBRABA+ARQA8ARAoAgQAnAiAUAxQAUAvAAA/IAAFXQAAAMgJALQgLAJgNAAIjSAAQgNAAgKgJQgJgLAAgMIAAgiQgRAYgZASQgZARghAKQggAJgmAAQhEAAg1gagAgPBFQggAHgKAMQgLAMAAANQAAAIAFAIQAGAIAKAFQAKAEAOAAQAXAAASgJQARgKAKgUQAJgVAAggIAAgBg");
	this.shape_15.setTransform(277.9,186.25);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#282E46").s().p("ABcGqQgNAAgKgJQgJgLAAgMIAAlDQAAghgQgQQgPgSgdABQgcgBgQASQgQAQAAAhIAAFDQgBAMgIALQgLAJgNAAIjqAAQgNAAgJgJQgKgLAAgMIAAsSQAAgNAKgLQAJgJANAAIDqAAQANAAALAJQAIALABANIAAEBQAfgiAvgVQAwgSA3gBQA9ABA3AcQA3AdAiA7QAiA9AABdIAAFMQAAAMgKALQgJAJgNAAg");
	this.shape_16.setTransform(201.15,174.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#282E46").s().p("AiZEyQg9gRgmgbQglgbgTgdQgSgdgBgYQgBgOAJgJQAJgKAMAAIDRAAIACAAIADAAQAPABANAJIAaARQAOAJARAAQAKAAAJgEQAIgGAAgIQAAgKgGgKQgHgHgYgKQgagIg8gMQg4gLgygWQgygXgggoQgggpAAg9QAAg0AjgvQAjgvBEgeQBDgdBjgBQBJABA6AQQA5AQApAbQAnAbAWAeQAWAdABAZQABAOgIAJQgIAKgLAAIi+AAIgGAAIgGAAQgRAAgNgJIgagSQgOgJgQAAQgJAAgIAFQgHAGAAAIQAAAKAHAJQAHAIAaAJQAcAHA/AKQBWAMAzAhQA0AfAWAqQAWAqAAApQAAA/gmAvQgoAvhLAYQhLAZhqAAQhXgBg8gRg");
	this.shape_17.setTransform(124.4393,186.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F4E1DC").s().p("Aj4D2QhdhNAAinIAAgFIAAgDQAChoArhGQArhHBMgkQBMgjBlAAQB2AABLAsQBMAtAlBKQAkBJAABYIAAAlQAAANgJAJQgKAKgOAAIlkAAIAAACIAAAEQAAAYAEAQQAEAQAMAIQAKAJARAAQAGAAAFgDQAGgCAFgGIAMgKQAKgLAIgEQAGgDAPAAIDjAAQAMAAAIAIQAIAHgCAMQgBAXgTAfQgVAggnAfQgnAdg+AVQg9AThTAAQicAAhdhOgAgZiTQgLAHgGARQgFARAAAbIAAABIBfAAIAAgBQAAgbgFgRQgFgRgLgHQgLgIgQAAQgPAAgKAIg");
	this.shape_18.setTransform(295.15,340.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F4E1DC").s().p("AjzE4QgNAAgJgKQgKgJAAgNIAAovQAAgMAKgLQAJgJANAAIDSAAQANAAALAJQAIALABAMIAAAqQAlghAwgVQAugUA3AAIA6AAQANAAAJAJQAKALAAAMIAAC7QAAANgKAKQgJAKgNAAIibAAQgkAAgSASQgSASAAAjIAAEMQAAANgKAJQgJAKgNAAg");
	this.shape_19.setTransform(228.45,340.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#F4E1DC").s().p("AjpEhQg1gcghg8Qghg9AAheIAAlLQAAgMAJgKQAKgKANAAIDlAAQAOAAAJAKQAKAKAAAMIAAFCQAABDA7AAQAcAAAQgRQAPgRAAghIAAlCQAAgMAKgKQAKgKANAAIDkAAQANAAAKAKQAJAKAAAMIAAIvQAAANgJAKQgKAJgNAAIjSAAQgNAAgJgJQgKgKAAgNIAAgoQgeAtg0AUQg1AThAAAQg7AAg2gdg");
	this.shape_20.setTransform(154.675,340.975);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#F4E1DC").s().p("ACCGqQhXAAhDgXQhDgYgng4Qgng4AAhjIAAicIhfAAQgOAAgJgKQgJgIAAgNIAAiSQAAgMAJgLQAJgJAOAAIBfAAIAAjEQAAgMAJgKQAKgKANAAIDRAAQANAAAKAKQAKAKAAAMIAADEICXAAQANAAAKAJQAJALAAAMIAACSQAAANgJAIQgKAKgNAAIiXAAIAACEQAAAcAMAQQANAQAaAAIBtAAQAOAAAJAKQAJAKAAAMIAACeQAAANgJAJQgJAKgOAAg");
	this.shape_21.setTransform(81.775,329);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#F4E1DC").s().p("AjpEhQg1gcghg8Qghg9AAheIAAlLQAAgMAJgKQAKgKANAAIDlAAQAOAAAJAKQAKAKAAAMIAAFCQAABDA7AAQAcAAAQgRQAPgRAAghIAAlCQAAgMAKgKQAKgKANAAIDkAAQANAAAKAKQAJAKAAAMIAAIvQAAANgJAKQgKAJgNAAIjSAAQgNAAgJgJQgKgKAAgNIAAgoQgeAtg0AUQg1AThAAAQg7AAg2gdg");
	this.shape_22.setTransform(9.925,340.975);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#F4E1DC").s().p("AiJG8QgNAAgKgKQgKgJAAgNIAAl+IhSAAQgOAAgJgKQgKgJAAgMIAAiSQAAgMAKgLQAJgJAOAAIBSAAIAAgUQAAhjAqg1QArg1BHgTQBFgUBXAAIBvAAQANAAAKAKQAKAJAAANIAACSQAAANgKAJQgKAKgNAAIhhAAQgbAAgMAKQgNAKAAATIAAAPICJAAQANAAAKAJQAJALAAAMIAACSQAAAMgJAJQgKAKgNAAIiJAAIAAF+QAAANgJAJQgKAKgNAAg");
	this.shape_23.setTransform(-58.875,327.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#282E46").s().p("Aj4D2QhdhNAAinIAAgFIAAgDQAChoArhGQArhHBMgkQBMgjBlAAQB2AABLAsQBMAtAlBKQAkBJAABYIAAAlQAAANgJAJQgKAKgOAAIlkAAIAAACIAAAEQAAAYAEAQQAEAQAMAIQAKAJARAAQAGAAAFgDQAGgCAFgGIAMgKQAKgLAIgEQAGgDAPAAIDjAAQAMAAAIAIQAHAHgBAMQgBAXgTAfQgVAggnAfQgnAdg+AVQg9AThTAAQicAAhdhOgAgZiTQgLAHgGARQgFARAAAbIAAABIBfAAIAAgBQAAgbgFgRQgFgRgLgHQgLgIgQAAQgPAAgKAIg");
	this.shape_24.setTransform(-148.65,340.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#282E46").s().p("ABcGqQgMAAgLgKQgJgJAAgNIAAlDQAAgggQgSQgPgQgdAAQgcAAgQAQQgQASgBAgIAAFDQAAANgJAJQgJAKgNAAIjrAAQgNAAgJgKQgKgJAAgNIAAsTQAAgMAKgKQAJgKANAAIDrAAQANAAAJAKQAJAKAAAMIAAECQAggjAvgTQAwgUA3ABQA+gBA2AdQA2AdAjA8QAiA8AABdIAAFMQAAANgKAJQgKAKgMAAg");
	this.shape_25.setTransform(-227,329);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#282E46").s().p("ACCGqQhXAAhDgXQhDgYgng4Qgng4AAhjIAAicIhfAAQgOAAgJgKQgJgIAAgNIAAiSQAAgMAJgLQAJgJAOAAIBfAAIAAjEQAAgMAJgKQAKgKANAAIDRAAQANAAAKAKQAKAKAAAMIAADEICXAAQANAAAKAJQAJALAAAMIAACSQAAANgJAIQgKAKgNAAIiXAAIAACEQAAAcAMAQQANAQAaAAIBtAAQAOAAAJAKQAJAKAAAMIAACeQAAANgJAJQgJAKgOAAg");
	this.shape_26.setTransform(-301.175,329);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#282E46").s().p("Aj4D2QhdhNAAinIAAgFIAAgDQAChoArhGQArhHBMgkQBMgjBlAAQB2AABLAsQBMAtAlBKQAkBJAABYIAAAlQAAANgJAJQgKAKgOAAIlkAAIAAACIAAAEQAAAYAEAQQAEAQAMAIQAKAJARAAQAGAAAFgDQAGgCAFgGIAMgKQAKgLAIgEQAGgDAPAAIDjAAQAMAAAIAIQAIAHgCAMQgBAXgTAfQgVAggnAfQgnAdg+AVQg9AThTAAQicAAhdhOgAgZiTQgLAHgGARQgFARAAAbIAAABIBfAAIAAgBQAAgbgFgRQgFgRgLgHQgLgIgQAAQgPAAgKAIg");
	this.shape_27.setTransform(295.15,340.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#282E46").s().p("AjzE4QgNAAgJgKQgKgJAAgNIAAovQAAgMAKgLQAJgJANAAIDSAAQANAAALAJQAIALABAMIAAAqQAlghAwgVQAugUA3AAIA6AAQANAAAJAJQAKALAAAMIAAC7QAAANgKAKQgJAKgNAAIibAAQgkAAgSASQgSASAAAjIAAEMQAAANgKAJQgJAKgNAAg");
	this.shape_28.setTransform(228.45,340.4);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#282E46").s().p("AjpEhQg1gcghg8Qghg9AAheIAAlLQAAgMAJgKQAKgKANAAIDlAAQAOAAAJAKQAKAKAAAMIAAFCQAABDA7AAQAcAAAQgRQAPgRAAghIAAlCQAAgMAKgKQAKgKANAAIDkAAQANAAAKAKQAJAKAAAMIAAIvQAAANgJAKQgKAJgNAAIjSAAQgNAAgJgJQgKgKAAgNIAAgoQgeAtg0AUQg1AThAAAQg7AAg2gdg");
	this.shape_29.setTransform(154.675,340.975);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#282E46").s().p("AjpEhQg1gcghg8Qghg9AAheIAAlLQAAgMAJgKQAKgKANAAIDlAAQAOAAAJAKQAKAKAAAMIAAFCQAABDA7AAQAcAAAQgRQAPgRAAghIAAlCQAAgMAKgKQAKgKANAAIDkAAQANAAAKAKQAJAKAAAMIAAIvQAAANgJAKQgKAJgNAAIjSAAQgNAAgJgJQgKgKAAgNIAAgoQgeAtg0AUQg1AThAAAQg7AAg2gdg");
	this.shape_30.setTransform(9.925,340.975);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#282E46").s().p("AiJG8QgNAAgKgKQgKgJAAgNIAAl+IhSAAQgOAAgJgKQgKgJAAgMIAAiSQAAgMAKgLQAJgJAOAAIBSAAIAAgUQAAhjAqg1QArg1BHgTQBFgUBXAAIBvAAQANAAAKAKQAKAJAAANIAACSQAAANgKAJQgKAKgNAAIhhAAQgbAAgMAKQgNAKAAATIAAAPICJAAQANAAAKAJQAJALAAAMIAACSQAAAMgJAJQgKAKgNAAIiJAAIAAF+QAAANgJAJQgKAKgNAAg");
	this.shape_31.setTransform(-58.875,327.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#282E46").s().p("ACCGqQhXAAhDgXQhDgYgng4Qgng4AAhjIAAicIhfAAQgOAAgJgKQgJgIAAgNIAAiSQAAgMAJgLQAJgJAOAAIBfAAIAAjEQAAgMAJgKQAKgKANAAIDRAAQANAAAKAKQAKAKAAAMIAADEICXAAQANAAAKAJQAJALAAAMIAACSQAAANgJAIQgKAKgNAAIiXAAIAACEQAAAcAMAQQANAQAaAAIBtAAQAOAAAJAKQAJAKAAAMIAACeQAAANgJAJQgJAKgOAAg");
	this.shape_32.setTransform(-301.175,329);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#BC433E").s().p("Ah4HqQgQAAgLgLQgMgLAAgQIAAjzQAAgPAMgMQALgLAQAAIDyAAQAQAAALALQALAMAAAPIAADzQAAAQgLALQgLALgQAAgAh4ByQgQABgLgLQgMgMAAgPIAAoQQAAgQAMgKQALgMAQAAIDyAAQAQAAALAMQALAKAAAQIAAIQQAAAPgLAMQgLALgQgBg");
	this.shape_33.setTransform(380.675,495.65);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#BC433E").s().p("ADuHqQgaAAgMgLQgMgNgEgLIgihcIkrAAIgiBcQgEALgMANQgKALgdAAIkDAAQgMAAgJgJQgKgKABgMQgBgFACgEIE4t9QAFgQAPgPQAPgPAcAAIEuAAQAdAAAPAPQAPAPAEAQIE5N9QABAEAAAFQAAAMgJAKQgIAJgNAAgAhOBaICdAAIhPkEg");
	this.shape_34.setTransform(304.75,495.65);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#BC433E").s().p("ADnHqQgPAAgLgLQgMgLAAgQIAAl/IhcCXQgHALgMAMQgMAMgVAAIhgAAQgWAAgMgMQgMgMgHgLIhciXIAAF/QAAAQgLALQgMALgOAAIj+AAQgQAAgLgLQgLgLAAgQIAAuHQAAgQALgKQALgMAQAAIDdAAQAbAAAPAPQANAPAGAIIDJFQIDMlQQADgIAPgPQANgPAdAAIDcAAQAQAAALAMQALAKAAAQIAAOHQAAAQgLALQgLALgQAAg");
	this.shape_35.setTransform(191.95,495.65);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#BC433E").s().p("AlsHqQgPAAgMgLQgLgLAAgQIAAuHQAAgQALgKQAMgMAPAAILNAAQAQAAALAMQAMAKgBAQIAADFQABAQgMAKQgLAMgQAAImjAAIAABYIGFAAQAPAAALAMQAMALAAAPIAAC1QAAAPgMAMQgLALgPAAImFAAIAABZIGuAAQAPAAAMAKQALALAAAQIAADFQAAAQgLALQgMALgPAAg");
	this.shape_36.setTransform(86.6,495.65);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#BC433E").s().p("AC2HqQgcAAgNgNIgRgTIjrllIAAFfQAAAQgLALQgMALgOAAIj+AAQgQAAgLgLQgLgLAAgQIAAuHQAAgQALgKQALgMAQAAIDdAAQAcAAANANQAMAMAEAIIDsGDIAAl+QAAgQALgKQALgMAQAAID9AAQAPAAALAMQAMAKAAAQIAAOHQAAAQgMALQgLALgPAAg");
	this.shape_37.setTransform(-13.15,495.65);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#BC433E").s().p("AiNHqQgQAAgLgLQgLgLAAgQIAAuHQAAgQALgKQALgMAQAAIEcAAQAPAAAMAMQAKAKABAQIAAOHQgBAQgKALQgMALgPAAg");
	this.shape_38.setTransform(-90.7,495.65);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#BC433E").s().p("AjuHRQhogng8hUQg9hUgGiFQgBg5AAhCQAAhBABg8QAGiDA+hTQA+hUBpgpQBogpCCAAQBZAABUAVQBSAUBDArQBDAsApBEQAnBEACBfQAAANgJAIQgKAJgLAAIkeAAQgXAAgLgJQgKgIgJgXQgOgtgbgPQgbgQgjAAQgvAAgbAZQgbAYgDBBQgEByAEB4QADBAAbAZQAbAYAvAAQAjAAAbgQQAcgRANgqQAIgYALgJQALgIAXAAIEeAAQALAAAKAJQAJAJAAANQgCBfgnBEQgpBEhDAsQhDArhSAUQhUAUhZAAQiGAAhogng");
	this.shape_39.setTransform(-166.85,495.625);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#282E46").s().p("AigIGQgQAAgKgLQgMgLAAgPIAAm+IhgAAQgQAAgLgLQgLgLAAgPIAAipQAAgPALgMQALgLAQAAIBgAAIAAgYQAAhyAxg+QAxg+BTgXQBRgXBlAAICCAAQAQAAALAMQALALAAAPIAACqQAAAPgLALQgLALgQAAIhxAAQgfAAgOAMQgQAMAAAWIAAARICgAAQAPAAAMALQALAMAAAPIAACpQAAAPgLALQgMALgPAAIigAAIAAG+QAAAPgKALQgLALgQAAg");
	this.shape_40.setTransform(-278.525,492.825);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#282E46").s().p("AjYFXQhZgjgvhGQguhGgIhmQgBggAAgiQAAgiABgfQAIhnAyhGQAyhFBYgjQBZgiB5AAQB6AABYAiQBYAjAyBFQAzBGAGBnQADAfAAAiQAAAigDAgQgGBmgwBGQguBGhYAjQhYAjiBAAQiAAAhYgjgAgxiBQgLAZgDAuIgBA7IABA6QADAwALAYQAKAXAnAAQAoAAAKgXQAJgYAEgwQABgVAAglQAAgmgBgVQgEgugJgZQgKgYgoAAQgnAAgKAYg");
	this.shape_41.setTransform(-358.825,508.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_9},{t:this.shape_8},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_9},{t:this.shape_8},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_26,p:{x:-301.175}},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_9},{t:this.shape_8},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_32},{t:this.shape_25},{t:this.shape_24},{t:this.shape_31},{t:this.shape_30},{t:this.shape_26,p:{x:81.775}},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_9},{t:this.shape_8},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.shape_32},{t:this.shape_25},{t:this.shape_24},{t:this.shape_31},{t:this.shape_30},{t:this.shape_26,p:{x:81.775}},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_9},{t:this.shape_8},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-590.9,-77.1,1181.9,666.8000000000001);


(lib.credits = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AA+FVQgPAAgHgHIgIgKIhhijIAACaQAAAKgIAIQgIAIgKAAIioAAQgLAAgHgIQgIgIAAgKIAAp1QAAgKAIgIQAHgIALAAICoAAQAKAAAIAIQAIAIAAAKIAAE3IBTiKQACgEAHgGQAHgGAMAAIDCAAQAKAAAGAGQAHAHAAAKIgBAIIgEAGIiDC6ICbDvQAEAGAAAHQAAAJgHAHQgGAHgKAAg");
	this.shape.setTransform(567.125,-3.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AhVFoQgKAAgIgHQgIgJAAgKIAAm+QAAgLAIgHQAIgIAKAAICrAAQALAAAHAIQAIAHAAALIAAG+QAAAKgIAJQgHAHgLAAgAhQi/QgKAAgIgIQgIgHAAgLIAAh0QAAgKAIgJQAIgHAKAAIChAAQALAAAIAHQAHAJAAAKIAAB0QAAALgHAHQgIAIgLAAg");
	this.shape_1.setTransform(518.675,-5.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("Aj+FaQgKAAgIgIQgIgIAAgKIAAp1QAAgLAIgHQAIgIAKAAICkAAQAKAAAIAIQAIAHAAALIAAAcQAWgcAjgSQAigRAygBQAqAAAjAMQAkANAbAaQAbAaARAqQAQArADA8IABAmIgBAlQgCA4gQAqQgRAqgbAbQgbAagkAOQgkAOgqAAQgpAAghgOQgfgOgWgeIAADNQAAAKgIAIQgHAIgLAAgAgeimQgLAHgEAMQgEAMgBASIgBAjIABAjQABAQAFALQAFAKALAGQAJAFARAAQARAAAJgFQAKgIAFgMQAEgNACgRQADgggDgfQgCgSgEgMQgFgMgKgHQgJgHgRAAQgRAAgLAHg");
	this.shape_2.setTransform(472.125,14.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282E46").s().p("AjGDFQhLg+AAiGIAAgDIAAgDQAChSAjg5QAig5A9gcQA9gdBQAAQBeAAA9AjQA8AlAdA6QAeA8AABGIAAAdQAAAKgIAIQgIAIgKAAIkdAAIAAACIAAACQAAAUADANQADANAJAGQAJAHANAAQAFAAAEgCQAFgCAEgEIAJgJQAJgJAFgDQAGgCAMAAIC1AAQAKAAAGAGQAGAGgBAKQgBARgQAaQgQAagfAYQggAYgxAPQgxAQhCAAQh8AAhLg+gAgUh2QgIAHgFANQgEAOAAAUIAAABIBMAAIAAgBQAAgUgFgOQgEgNgJgHQgIgGgNAAQgLAAgJAGg");
	this.shape_3.setTransform(409.975,5.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282E46").s().p("AjGDFQhLg+AAiGIAAgDIAAgDQAChSAjg5QAig5A9gcQA9gdBQAAQBeAAA9AjQA8AlAdA6QAeA8AABGIAAAdQAAAKgIAIQgIAIgKAAIkdAAIAAACIAAACQAAAUADANQADANAJAGQAJAHANAAQAFAAAEgCQAFgCAEgEIAJgJQAJgJAFgDQAGgCAMAAIC1AAQAKAAAGAGQAGAGgBAKQgBARgQAaQgQAagfAYQggAYgxAPQgxAQhCAAQh8AAhLg+gAgUh2QgIAHgFANQgEAOAAAUIAAABIBMAAIAAgBQAAgUgFgOQgEgNgJgHQgIgGgNAAQgLAAgJAGg");
	this.shape_4.setTransform(350.175,5.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282E46").s().p("AjCD6QgKgBgIgHQgIgIAAgLIAAm+QAAgKAIgIQAIgIAKABICoAAQALgBAIAIQAHAIAAAKIAAAiQAegbAmgRQAmgPArAAIAuAAQAKgBAIAIQAIAIAAAKIAACWQAAALgIAHQgIAIgKAAIh8AAQgdAAgOAPQgOAOAAAbIAADWQAAALgIAIQgHAHgKABg");
	this.shape_5.setTransform(296.775,5.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282E46").s().p("AjxFQQgLAAgHgHQgIgJAAgKIAAprQAAgLAIgHQAHgIALAAIHjAAQAKAAAIAIQAHAHABALIAACSQgBALgHAHQgIAIgKAAIkRAAIAABHID+AAQALAAAHAIQAIAHAAALIAACQQAAAKgIAIQgHAIgLAAIj+AAIAAC0QAAAKgIAJQgIAHgKAAg");
	this.shape_6.setTransform(240.45,-3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#282E46").s().p("AimFVQgIAAgGgGQgHgGABgJIAAgEIAAgFIBNi5Ii5m0IgBgHQACgJAGgHQAGgHAKAAICiAAQAPAAAHAIQAGAIADAHIBODbIBRjbQAEgIAHgIQAIgHAOAAICgAAQAJAAAHAGQAGAHAAAHIgBAKIkPJ0QgEAIgHAIQgIAHgNAAg");
	this.shape_7.setTransform(160.4,14.775);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#282E46").s().p("AgHFKQgjgQgWgaIAAAWQAAAKgIAJQgIAHgKAAIikAAQgKAAgIgHQgIgJAAgKIAAp0QAAgLAIgIQAIgHAKAAICyAAQALAAAHAHQAIAIAAALIAAC/QAXgVAfgMQAggMApAAQAqAAAkANQAkAOAbAbQAbAbARAqQAQAqACA3IABAlIgBAnQgDA8gQArQgRAqgbAaQgbAagkAMQgjANgqAAQgygBgigPgAgcAFQgLAFgFALQgFALgBAPIgBAjIABAkQABARAEANQAEAMALAIQALAGARAAQARAAAJgGQAKgIAFgMQAEgNACgRQADgggDgfQgCgSgEgMQgFgMgKgHQgJgGgRAAQgRAAgJAFg");
	this.shape_8.setTransform(98.475,-3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#282E46").s().p("Ah6D2QgxgPgegVQgegWgPgXQgOgYgBgTQgBgLAHgHQAHgIAKAAICnAAIACAAIACAAQAMAAAKAIIAVAOQALAHAOAAQAIAAAHgEQAHgEAAgGQAAgJgFgHQgFgHgUgHQgVgIgwgHQgsgKgogSQgpgSgZgfQgZgiAAgxQAAgpAbgmQAcglA2gYQA3gYBOAAQA7AAAuANQAuAOAgAVQAgAVARAYQASAYABAUQABALgHAHQgGAIgJAAIiYAAIgFAAIgFAAQgNAAgLgHIgVgPQgKgHgNAAQgHAAgHAFQgGAEAAAGQAAAIAGAIQAGAGAVAGQAWAHAyAIQBFAKApAaQAqAZARAhQASAhAAAhQAAAzgfAmQggAlg8AUQg8AThVAAQhFAAgwgNg");
	this.shape_9.setTransform(19.9438,5.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#282E46").s().p("ABKD+QgLAAgIgHQgHgIAAgLIAAkBQAAgagNgNQgNgOgWAAQgWAAgNAOQgMANAAAaIAAEBQAAALgIAIQgIAHgKAAIi3AAQgKAAgIgHQgIgIAAgLIAAm+QAAgKAIgIQAIgIAKAAICoAAQALAAAIAIQAHAIAAAKIAAAgQAYgcApgUQArgTAzAAQAxAAAqAXQAqAXAaAvQAbAxAABLIAAEIQAAALgIAIQgHAHgLAAg");
	this.shape_10.setTransform(-40.525,5.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#282E46").s().p("AiUDrQg8gYghgwQgggwgFhGIgBgtIABgtQAFhGAjgwQAigvA9gYQA8gYBTAAQBUAAA8AYQA9AYAiAvQAiAwAFBGQACAWAAAXQAAAXgCAWQgFBGggAwQggAwg8AYQg9AYhYAAQhXAAg9gYgAghhYQgIARgBAgIgBAnIABApQABAgAIAQQAHAQAaAAQAcAAAGgQQAHgQACggIABgpIgBgnQgCgggHgRQgGgRgcAAQgaAAgHARg");
	this.shape_11.setTransform(-103.925,5.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#282E46").s().p("AhVFoQgKAAgIgHQgIgJAAgKIAAm+QAAgLAIgHQAIgIAKAAICrAAQALAAAHAIQAIAHAAALIAAG+QAAAKgIAJQgHAHgLAAgAhQi/QgKAAgIgIQgIgHAAgLIAAh0QAAgKAIgJQAIgHAKAAIChAAQALAAAIAHQAHAJAAAKIAAB0QAAALgHAHQgIAIgLAAg");
	this.shape_12.setTransform(-150.275,-5.4);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#282E46").s().p("ABoFVQhGAAg1gTQg2gTgfgtQgfgtAAhOIAAh+IhMAAQgLAAgHgHQgIgHAAgKIAAh1QAAgKAIgIQAHgHALAAIBMAAIAAidQAAgKAHgIQAIgIALAAICmAAQALAAAIAIQAIAIAAAKIAACdIB4AAQALAAAIAHQAHAIAAAKIAAB1QAAAKgHAHQgIAHgLAAIh4AAIAABqQAAAWAJANQALANAVAAIBXAAQALAAAHAIQAIAIAAAKIAAB+QAAAKgIAIQgHAIgLAAg");
	this.shape_13.setTransform(-191.925,-3.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#282E46").s().p("Ai1DvQgqgVgYghQgXgkAAgrQAAhGA5gmQA6goBfgQIBkgRIAAAAQAAgagDgLQgFgMgUAAQgNAAgHAFQgJAGgJAJQgLALgQAAIijAAQgKAAgGgGQgGgGAAgJQACgSAOgZQAOgZAegXQAfgWAvgQQAwgPBCAAQBBAAAxANQAwAOAgAbQAgAbAPAnQAQAmAAAxIAAESQAAALgIAIQgIAHgKABIioAAQgKgBgIgHQgIgIAAgLIAAgbQgNAUgVAOQgTAOgaAHQgaAIgeAAQg3AAgqgUgAgMA2QgZAHgIAJQgJAKAAAKQAAAGAEAIQAFAFAHAEQAJAEALAAQATAAANgIQAPgHAHgRQAIgRAAgZIAAgBg");
	this.shape_14.setTransform(-247.75,5.65);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#282E46").s().p("AjCD6QgKgBgIgHQgIgIAAgLIAAm+QAAgKAIgIQAIgIAKABICoAAQALgBAIAIQAHAIAAAKIAAAiQAegbAmgRQAmgPArAAIAuAAQAKgBAIAIQAIAIAAAKIAACWQAAALgIAHQgIAIgKAAIh8AAQgdAAgOAPQgOAOAAAbIAADWQAAALgIAIQgHAHgKABg");
	this.shape_15.setTransform(-299.875,5.65);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#282E46").s().p("ABoFVQhGAAg1gTQg2gTgfgtQgfgtAAhOIAAh+IhMAAQgLAAgHgHQgIgHAAgKIAAh1QAAgKAIgIQAHgHALAAIBMAAIAAidQAAgKAHgIQAIgIALAAICmAAQALAAAIAIQAIAIAAAKIAACdIB4AAQALAAAIAHQAHAIAAAKIAAB1QAAAKgHAHQgIAHgLAAIh4AAIAABqQAAAWAJANQALANAVAAIBXAAQALAAAHAIQAIAIAAAKIAAB+QAAAKgIAIQgHAIgLAAg");
	this.shape_16.setTransform(-352.375,-3.475);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#282E46").s().p("Ah6D2QgxgPgegVQgegWgPgXQgOgYgBgTQgBgLAHgHQAHgIAKAAICnAAIACAAIACAAQAMAAAKAIIAVAOQALAHAOAAQAIAAAHgEQAHgEAAgGQAAgJgFgHQgFgHgUgHQgVgIgwgHQgsgKgogSQgpgSgZgfQgZgiAAgxQAAgpAbgmQAcglA2gYQA3gYBOAAQA7AAAuANQAuAOAgAVQAgAVARAYQASAYABAUQABALgHAHQgGAIgJAAIiYAAIgFAAIgFAAQgNAAgLgHIgVgPQgKgHgNAAQgHAAgHAFQgGAEAAAGQAAAIAGAIQAGAGAVAGQAWAHAyAIQBFAKApAaQAqAZARAhQASAhAAAhQAAAzgfAmQggAlg8AUQg8AThVAAQhFAAgwgNg");
	this.shape_17.setTransform(-405.5562,5.65);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#282E46").s().p("Ai6DnQgqgXgbgwQgagwAAhLIAAkJQAAgKAHgIQAIgHAKAAIC3AAQAMAAAHAHQAHAIABAKIAAECQAAA1AuAAQAYAAAMgOQANgNAAgaIAAkCQAAgKAHgIQAIgHAKAAIC3AAQAKAAAIAHQAIAIAAAKIAAG/QAAAKgIAIQgIAIgKAAIioAAQgLAAgHgIQgIgIAAgKIAAggQgYAkgpAQQgrAPgzAAQgvAAgrgXg");
	this.shape_18.setTransform(-466.5,6.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#282E46").s().p("AhVFVQgKAAgIgIQgIgIAAgKIAAp1QAAgKAIgIQAIgIAKAAICrAAQALAAAHAIQAIAIAAAKIAAJ1QAAAKgIAIQgHAIgLAAg");
	this.shape_19.setTransform(-514.125,-3.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#282E46").s().p("AhVFVQgKAAgIgIQgIgIAAgKIAAp1QAAgKAIgIQAIgIAKAAICrAAQALAAAHAIQAIAIAAAKIAAJ1QAAAKgIAIQgHAIgLAAg");
	this.shape_20.setTransform(-545.125,-3.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#282E46").s().p("AhhFQQgLAAgHgHQgIgJAAgKIAAprQAAgLAIgHQAHgIALAAIDDAAQAKAAAIAIQAIAHAAALIAAJrQAAAKgIAJQgIAHgKAAg");
	this.shape_21.setTransform(-578.275,-3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-641.7,-62,1283.5,124.1);


(lib.rectanglescreen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2.8).p("A+PRFMA8fAAAMAAAgiJMg8fAAAg");
	this.shape.setTransform(0.0021,0.0198,0.997,0.997);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-194.4,-110.4,388.8,220.8);


(lib.play_triangle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2F2F2F").s().p("ApKLFQg1gfAAg9IAAzRQAAg9A1geQA0gfA1AeIQsJqQA1AeAAA8QAAA9g1AeIwsJqQgaAPgbAAQgaAAgagPg");
	this.shape.setTransform(0.025,0.0312);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-63.9,-72.3,127.9,144.7);


(lib.curtain = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#8B312C").ss(2.8,1).p("ApSruIAvCjQBGDJBtDCQFeJuJlFB");
	this.shape.setTransform(87.65,-101.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BC433E").s().p("AlwjAQhtjChGjJIgvijISlXdQpklBlfpug");
	this.shape_1.setTransform(87.65,-101.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#8B312C").ss(2.8,1).p("As+yEIABA0QADBEAOBPQArD9B9EPQGSNjQxLT");
	this.shape_2.setTransform(26.025,-119.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#BC433E").s().p("AqEmxQh9kPgrj9QgOhPgDhEIgBg0MAZ9AkJQwxrTmStjg");
	this.shape_3.setTransform(26.025,-119.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#8B312C").ss(2.8,1).p("AwZ27QAKCDAtDSQBaGkCwGKQD3ImGAGjQHfIMKcEf");
	this.shape_4.setTransform(-27.925,-136.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#BC433E").s().p("AhhKRQmAmjj3omQiwmKhamkQgtjSgKiDMAgzAt3QqckfnfoMg");
	this.shape_5.setTransform(-27.925,-136.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E7C458").s().p("AluEMQAXhHA6hNQAcglAYgYIjrgiQGJAtExidQCihUBNhhIAADmQkCDXk6BDQhjAVhcAEg");
	this.shape_6.setTransform(116.4625,32.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#BC433E").s().p("AiRVZQpUmQmDsmQkTpAiPrSQhHlpgQj2MAzDAAAMAAAA1yQkFArjyAAQrPAAotl2g");
	this.shape_7.setTransform(0,-134.9248);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#8B312C").ss(2.8,1).p("ACwqfQgfAsgrBMQhVCYg+CgQjIIABsGO");
	this.shape_8.setTransform(85.867,133.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#BC433E").s().p("AgtjuQA+ihBViYQArhMAfgrIk5U+QhsmQDIn+g");
	this.shape_9.setTransform(85.867,133.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#BC433E").s().p("AoeVbQigyaEctxQBZkTB7jVQA9hqArg0IK+gkMAAAAq1g");
	this.shape_10.setTransform(103.3671,172.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-163.4,-309.2,326.9,618.5);


(lib.pot = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7B2F2B").s().p("Ai2C2QhagChPgGQh/gIicgYIgtgGQgmgHgPgFQgLgFgMgIQgdgXAAgjQAAgYAWgWQAOgOAbgSQCJhXC5gmQCUgfDFgBQBDgBCGAEQCkAFBfAJQCPAOBwAgQBAASAiAcQAyApgtAtQglAmg+AYQgoAQhMARQlQBLlLAAIhAgBg");
	this.shape.setTransform(172.931,311.209,0.438,0.438);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E68051").s().p("AlTQ8QiYgIhUguQhjg2hEiiQgag8g9jQQhLkGhBlMQgojLhBmQQgHgugBgXQgCgnAJgeQAVhGBOguQA2gfBVgYQAbgHB4gbQFYhOE5gLQE+gMENA1QCdAgCCAxQBcAiATAJQA+AeAeArQAtA/gGBsQgKC0grDXQgfCYg+DrQggB6g9D2Qg4DYg0CTQgnBthJAzQhEAwh4ANQkPAbkCgDQhQACg9AAQg+AAgrgCg");
	this.shape_1.setTransform(172.625,344.2159,0.438,0.438);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape}]},88).to({state:[]},1).wait(554));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(125.2,296.7,94.89999999999999,95.10000000000002);


(lib.bl6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#39564D").s().p("AxGbqQgLkPAslvQATicBNngQBZovEBnUQEKnjGwlWQHXlzH+hGQAcgDAHAbQAIAcgbAEQoPBHnbGHQm0Fpj/H7QiDEChQErQhIEKgmFAQgUCqgyFdQgmEzAKDUQABAcgdAAQgdAAgBgcg");
	this.shape.setTransform(47.7539,86.124,0.438,0.438);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#567567").s().p("AmfBRQAdhOAshJQAWglAQgVQBXiHC6iDQBchCBMgmQBwgwBZASQA8ANAqApQAYAYABAfQACBFhNBYQg5BAheBFQh7BZh1B1QiuCvgDACIhphFIASCEIieDZQhWjKBej7g");
	this.shape_1.setTransform(50.8231,53.3927);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.3,0,97.7,164.9);


(lib.bl5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#39564D").s().p("EgT6AsgQgtr5CirsQCgrkFhqpQE4pcJGstIHuqlQEqmZC7kTQAQgXAZAPQAYAOgPAXQizEHkRF2Qk0GjiYDTQomL7kuIgQmTLVi5MGQi/McAvMqQACAbgdAAQgcAAgCgbg");
	this.shape.setTransform(55.9477,118.021,0.438,0.438);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#39564D").s().p("Aymb0QgGgBgGgrIgGgxQgUh5gHiIQgWmlBplYQA1iwBhjHQBIiTB5jQQB1jIA8hkQBjilBWiCQCNjVBwiJQANgQBghdQBkhiACAGIAZA+QAbBAAMAPIApjZQADgQAQgYIAagjQA9hcBOhQQB4h6CNhDQCahJCgABQAnABAcADQArAFAaAJQBTAeA+BgQA3BUAQBiQASBqgcB5QgZBvg5BlQhzDLh8DQQj4GhgtAeIpQFBIHjAZQhDBwhvCmQjeFLjXELQpfLqlxAAQg0AAgvgQg");
	this.shape_1.setTransform(64.9432,69.6864,0.4383,0.4383);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.3,-9,119.6,253);


(lib.bl4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#39564D").s().p("EAD8A1OQAYlpAXoEIAmtuIAdpHQAPlPADjxQAIqFhKoAQhdqDjZrnQiXoHkqs8QgJgaAcgHQAbgIAKAaQEwNQCeInQDdMBBbKgQBBHngLJwQgEDigQFHIgcIwIgnNuQgXIDgYFqQgCAcgcAAQgdAAACgcg");
	this.shape.setTransform(33.5269,163.6852,0.438,0.438);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#39564D").s().p("AB1N0QhGgqg9g+QhChDguhUQguhSgWheQhomngplIQhDoVCFhRIApAOQAzAVAwAiQCXBtA+DIIgMDgIBLhWIAnA3QAuBHAlBJQB1DsgXC6IgOBVQgRBmgUBfQhBEuhEBoQgXgIgjgVg");
	this.shape_1.setTransform(35.2389,95.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,4,72.5,310.1);


(lib.bl3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#39564D").s().p("EAILAuTQiq1lkx43Qj10Fl958QgHgbAcgHQAcgIAGAbQF+Z9D2UMQExY6CqVpQADAcgcAAQgdAAgDgcg");
	this.shape.setTransform(37.5853,131.0364,0.438,0.438);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#567567").s().p("ADofMQkKgQjFlYQidkShqnWQhMlQgqmQIgblLIEAhGIk8iVQgCAAgVifQgXi4gSi7Qg3oxAgisQAciTBGhPQBFhOB0gZQBwgYBlAkQChA8CEDMQBSB+BhDsIANAgQCNFjBgHDQAtDUBZEqQAyCpBoFRQAfBsALArQAVBVAIBEQAkE4iEFDQiHFOj5CvIglAbQgYAQgQAAIgCgBg");
	this.shape_1.setTransform(34.9868,87.508,0.4383,0.4383);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,70,262.1);


(lib.bl2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#39564D").s().p("AJrYAQhAmxjJoIQh7lAkUpKQjCmcjIl2Qg6iDglhMQhDiLg8gtQgWgQAPgZQAOgZAWARQA1AnA4BrQAeA7AzBrQDGFsDVG+QEnJrCBFKQDWIiBEHEQAEAcgcAHIgLACQgSAAgDgVg");
	this.shape.setTransform(92.5584,135.1547,0.438,0.438);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#39564D").s().p("AK1OiQlAn4moloQlAkAkgkyQo+pkCnj1QAMgRBRATIBeAbQDmBDEcCzQEDClCzCfQB+BwBQBZQBIBRAdAcQA7A7A2AkQDsCdCaEWQCHDzA+E4QAoDRgZCoQgRBqgmBRQgWAtgaAlIgjAoQgeAhAAACQhKi0igj8g");
	this.shape_1.setTransform(48.43,59.6649,0.4383,0.4383);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,122.2,203.4);


(lib.bl1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#39564D").s().p("AJKGqQg3jyhDimQhejoiEh+QhhhdiMAZQh4AWiHBrQh5BghfCEQhcCAgXBlQgCAMgNgDQgMgEADgLQAXhlBIhvQBIhuBkhcQBphgBvgzQB6g3BqALQBnAKBVBmQAgAnAiA5QAPAZAoBJQBEB7AzCOQAuCCAiCXQADAMgMAEIgFABQgIAAgCgKg");
	this.shape.setTransform(88.575,54.3054);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#39564D").s().p("AmPHcQgpgRgagqQgcgugEg8QgEg2AQg6QAThBAnhLQAeg7AwhHQA7haBIhJQBjhmB3g/QB9hCCHgPQB1gNB7AYQAMADhwBSIhyBTIhFgDIhCgCQAEABAwAqIAwAqIhsCFQhABQgtAzQhMBcgsBFQgPAXgkBBQgfA4gWAfQgbAkgaAXQggAcgjAMQgWAHgVAAQgXAAgWgJg");
	this.shape_1.setTransform(49.9767,57.568);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,9,149.6,97.1);


(lib.think_text = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AAAAPQgEAAgDgCQgEgCgDgEIgBgEIAAgDQAAgDABgDQACgDAEgCIAEgCIAEgBQAFAAADACQAEADADAEIABADIAAACQAAAFgDAEQgDADgGACIgDABIgBAAgAgHgHIgDAEIAAACIAAABIAAAAQAAAEADADIABgHIABgDIACgDIAAgBIgCgBIgCABg");
	this.shape.setTransform(171.0125,112.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AgBBdQgJAAgJgFIgIgGIgEgFQgEgFgCgGQgDgHgBgJIgBgCIAAgEIACgEIADgCIADgBIABAAQABAAAAAAQABAAABAAQAAABABAAQAAAAABABQACABABADIADAOIAEAIIAGAHQADACAEAAIAFgFIACgHIABgCIABgGQAAgIgEgNQgFgLgJgPIgNgTIgHgOQgEgHgBgHIgCgMIABgIIADgKQADgGAFgFQAEgEAGgEIAIgCIAIgBIABAAQAEAAAFACIAMAGIAHAIQADAEABACIAEALQABAGAAAGIAAAAQAAAHgCAEQgBAEgEABIgCAAQAAAAgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgCgCgBgDIAAgFIAAgDIgBgJIgEgKIgCgDIgEgEQgDACgCAEQgBAEAAAFQAAAEACAGIAIANIACAEIAJANIAGALIAEAJQAKAYAAARIAAABQAAAJgDAIQgDAJgGAGQgHAIgEABIgKAFIgJABgAgXhOIgHAIIgDAHIgBAGIAAAAIgBAAIABAHIADAFIAAAAQAAgHACgFIAFgNIADgEIAEgFIAAgBIgBAAQgDAAgCACg");
	this.shape_1.setTransform(163.025,104.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("AgFBYQgHgDgGgGIgFgFIgHgLIgGgMIgDgIIgDgLQgEgXAAgRQgBgTAEgPQAEgPAIgLQAKgPAQgFIAFgCIAGAAIABAAQAJAAAIAFQAIAEAGAJIADAFIACAHIACAKIAAAHIABAQIABAQIAAACQAAAEgCADQgBACgDAAIgFABIgJABIgUAAIgIAAIABAOIACAVIAEAMIADAJIADAGIAFAGIABABIAAAAQADgCACgFIAFgNIADgKIABgFIADgCIAEgBQADAAACACIAEAEIAAABIAAABIgCAJIgFAQIgDAHIgEAHQgGAFgGADQgHADgIAAQgHAAgFgDgAAYgOIAFAAIAAgCIAAgWIgCgQIgDgHIgEgFIgFgEIgDgBQgFAFgDAHQgDAGgBAIIgBAPIgBAQIAAAAIALAAIAIAAIAHAAgAgShJIgIAJIgEAHIgBAFIAAABIAAACIABABIACgCIADgEIABgEIAFgIIAEgEIAFgGIgBgBIAAAAQgEABgDADg");
	this.shape_2.setTransform(151.6972,104.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282E46").s().p("AACBsIgGgCQgCgBgDgDQgDgCgCgFIgDgLQgCgMgCgXQgBgXAAgiIABgcQABgKACgCQADgDADgCQAEgBAEAAIAEAAQAIAAAEADQAFADADAGQACADAAAHIABAVIAAAWIgCAuIAAAYQAAAIgCAEIgCAGIgDAEIgEACIgFACIgCABIgBAAgAgKgtIgCACIgDAKIgBAHIAAAGIABAEIACABIABAAIAAgBIACgSIABgEIABgIIAAgBIAAAAIgCACgAAAhFQgFAAgDgCQgEgCgDgFIgCgFIgBgFQAAgEACgEQACgEAFgDIAEgCIAFgBIABAAQAEgBAFADQAEADADAFIACAEIAAAFQAAAEgCAEIgGAHIgGACIgFABgAgIhiIgDADIgBACIAAADIAAAEIAAACIACABIABgCIABgEIACgEIADgGIgCgBIgDACg");
	this.shape_3.setTransform(142.4,102.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282E46").s().p("AAFBcIgGgCIgJgDQgGgEgEgHQgGgHgEgLIgGgTQgCgMgCgOIgGgqIgCgaQAAgLAFgNQAFgJAHgCIACAAIADgBIACAAQAGAAAFAEQAEADACAHIADAKIACAMIACAYIAGAsQADAZAGAWIAAABIABADIABgDIACgIIAEgOIACgUIADggIACgkIACgbIABgJIADgEQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAQADAAACACQACABACADIAAADIgDAvIgCAgIgDAhQgCANgCAHIgEAPIgFALQgEAHgFAEQgGAEgGAAgAgkhOIgDAIIgBAGIAAAGIABAJQABAEABABIABgBIABgDIAAgBIgBgHIAAgFIABgKIADgIIAAgBIgBAAQAAAAgBAAQAAAAAAAAQgBABAAAAQgBABAAAAg");
	this.shape_4.setTransform(132.9,104.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282E46").s().p("AgGBaIgJgEIgHgHIgDgFIgGgKIgFgMIgFgOIgDgOIgCgOIgBgKIAAAAIAAgBQAAgLACgMQABgMAEgNIAGgOQADgGAEgGQADgFAFgDIALgFQAIgDAFAAQAFAAAFACIAKAGIAGAGIADAFQAHALAEAUQADAUAAAcIgBAVIgEAVIgFANIgFAKQgHAKgIAFQgHAFgJAAQgEAAgEgCgAAMhBIgFALQgEAMgCAMQgBAMAAAMIAAAFQAAARACARQADASAHARIABABQAFgGADgFIADgHIACgIIAEgSIABgRIAAgKIgBgPIgCgUIgDgMIgDgKIgCgEIgEgFIgBgBIAAAAIgDAEgAgShKIgJAJIgEAHIgCAFIAAABIAAABIABACIABABIADgDIAEgIQACgGAKgKIAAgBIAAgBIAAAAQgDAAgDADg");
	this.shape_5.setTransform(120.875,104.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282E46").s().p("AA+BeQgEAAgCgCQgCgCgBgDIAAgDIAAgDIAAgMIABgiIAAgQIAAgTIAAgiIAAgXQAAgIgBgDIgCgFIgCgBIAAgBIgBAAQgDAAgDACIgGAGIgDAFIgDAHIgCAIIgCAKIgCAKIAAALIAABIIAAAcQAAADgCADIgEACIgBABIgCAAQAAAAgBAAQgBAAAAgBQgBAAAAAAQgBAAAAgBIgEgEIAAgJIAAgUIgBhEIAAgoIgCgMQAAgFgCgCIgBgDIgBgBIgDABIgEADIgHAJIgEAOIgDAeQgCAQAAAWIABAUIABAgIAAACQAAAFgBADQgCAEgDACIgFACIgGAAIgBAAQgFAAgFgDQgFgFgEgIQgEgHgCgKIgEgWIgCgbIgBgSQAAgZACgQQABgQADgIIABgHIADgFQAHgIAKAAIABAAQAEAAADABIAFADIAFAFIACAGIAAABIAKgJQAJgEAFAAQAEAAAEACQADACAEAEQACACACAHIABAAIADgFIAEgFQAFgEAFgCQAFgDAFAAQAIAAAGAFQAFAEADAIIACANIABAXQAAA3gCA0IAAAQQAAAEgCACQgBADgEABIgBAAgAg3hMIgEAIIgBAFIgBAHIABAFIABACQABAAAAgBQAAAAABAAQAAAAAAgBQAAAAAAgBIABgEIACgOIACgIIAAgBIgBAAQAAAAAAAAQgBAAAAABQAAAAgBABQAAAAAAABg");
	this.shape_6.setTransform(106.825,104.2667);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#282E46").s().p("AAoBeQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAQgBgBAAAAQgBAAAAgBQgBAAAAgBQAAAAgBgBIgBgEIAAgHIAAgbIgBg0IABgmQgBgOgBgJQgCgJgDgCIgCAAQgDAAgEACQgDADgDAFQgEAGgCAKQgDALgBAOIgBAUIgBAcIABATIABAgIAAACIgDAHQgCADgCACIgFACIgEABQgJAAgKgNQgEgGgEgQIgEgWIgBgVIgBgQIAAgRIAAgTIACgWIACgOIAEgJQADgFAFgEQAFgDAHAAQAFAAAEADQAFADADAGIACAFIACgCIAEgFQAFgDAEgDQAFgBAFAAIAAAAQAIAAAGAFQAFAEADAIQACAFABAIIABAUIAAABIAAAaIAAAKIAAAKIAAAnIAAAlIAAAEIgCAGQgBAAgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAgAgjhLIgEAKIgBAGIAAAFIAAAGIACABIACgCIACgGIABgLIAAgHIABgCIABgDIgBAAIgBAAQAAAAgBAAQAAAAAAAAQAAABgBAAQAAABAAABg");
	this.shape_7.setTransform(85.5,104.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#282E46").s().p("AACBsIgGgCQgCgBgDgDQgDgCgCgFIgDgLQgCgMgCgXQgBgXAAgiIABgcQABgKACgCQADgDADgCQAEgBAEAAIAEAAQAIAAAEADQAFADADAGQACADAAAHIABAVIAAAWIgCAuIAAAYQgBAIgBAEIgCAGIgDAEIgEACIgFACIgCABIgBAAgAgKgtIgCACIgDAKIgBAHIAAAGIACAEIABABIABAAIAAgBIACgSIABgEIABgIIAAgBIAAAAIgCACgAAAhFQgFAAgDgCQgEgCgDgFIgCgFIgBgFQAAgEACgEQACgEAFgDIAEgCIAFgBIABAAQAEgBAFADQAEADADAFIACAEIAAAFQAAAEgCAEIgGAHIgGACIgFABgAgIhiIgDADIgBACIAAADIAAAEIAAACIACABIABgCIABgEIACgEIADgGIgCgBIgDACg");
	this.shape_8.setTransform(75.8,102.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#282E46").s().p("AAoBeQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAAAgBQAAAAgBgBIAAgEIgBgHIAAgbIgBg0IABgmQgBgOgBgJQgBgJgEgCIgBAAQgEAAgEACQgEADgCAFQgEAGgCAKQgDALgBAOIgBAUIgBAcIABATIABAgIAAACIgDAHQgBADgEACIgEACIgFABQgIAAgKgNQgEgGgEgQIgEgWIAAgVIgBgQIAAgRIAAgTIABgWIACgOIAEgJQADgFAFgEQAFgDAHAAQAFAAAFADQAEADAEAGIABAFIACgCIAFgFQADgDAGgDQAEgBAFAAIABAAQAHAAAFAFQAGAEADAIQACAFABAIIABAUIAAABIAAAaIAAAKIAAAKIAAAnIABAlIAAAEIgEAGQAAAAgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAgAgjhLIgDAKIgBAGIgBAFIABAGIABABIACgCIABgGIABgLIABgHIABgCIABgDIgBAAIgBAAQAAAAAAAAQgBAAAAAAQAAABAAAAQgBABAAABg");
	this.shape_9.setTransform(58.75,104.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#282E46").s().p("AgGBaIgJgEIgHgHIgDgFIgGgKIgFgMIgFgOIgDgOIgCgOIgBgKIAAAAIAAgBQAAgLACgMQABgMAEgNIAGgOQADgGAEgGQADgFAFgDIALgFQAIgDAFAAQAFAAAFACIAKAGIAGAGIADAFQAHALAEAUQADAUAAAcIgBAVIgEAVIgFANIgFAKQgHAKgIAFQgHAFgJAAQgEAAgEgCgAAMhBIgFALQgEAMgCAMQgBAMAAAMIAAAFQAAARACARQADASAHARIABABQAFgGADgFIADgHIACgIIAEgSIABgRIAAgKIgBgPIgCgUIgDgMIgDgKIgCgEIgEgFIgBgBIAAAAIgDAEgAgShKIgJAJIgEAHIgCAFIAAABIAAABIABACIABABIADgDIAEgIQACgGAKgKIAAgBIAAgBIAAAAQgDAAgDADg");
	this.shape_10.setTransform(46.675,104.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#282E46").s().p("AABBsIgFgCQgDgBgCgDQgDgCgCgFIgDgLQgCgMgCgXQgBgXAAgiIABgcQABgKACgCQACgDAEgCQADgBAFAAIAEAAQAIAAAEADQAFADADAGQACADAAAHIABAVIAAAWIgCAuIAAAYQAAAIgCAEIgCAGIgDAEIgEACIgFACIgCABIgCAAgAgKgtIgCACIgDAKIgBAHIAAAGIABAEIACABIABAAIAAgBIACgSIABgEIABgIIAAgBIAAAAIgCACgAAAhFQgEAAgEgCQgEgCgEgFIgBgFIgBgFQAAgEACgEQACgEAFgDIAEgCIAFgBIABAAQAFgBAEADQAEADADAFIACAEIAAAFQAAAEgCAEIgHAHIgFACIgFABgAgIhiIgCADIgCACIAAADIAAAEIAAACIACABIABgCIABgEIACgEIADgGIgCgBIgDACg");
	this.shape_11.setTransform(37.2,102.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#282E46").s().p("AAUB6QgJAAgIgEQgHgEgHgHIgIgMQgEgFgBgFIgDgHIgDgMIgBgNIAAgfIAAgiIAAgMIAAgXIgIAAIgHAAQgBAAAAAAQgBAAgBgBQAAAAgBAAQAAAAgBgBIgCgEIAAgCQAAAAAAgBQAAAAAAgBQAAgBABAAQAAAAAAgBIAEgCIAGgBIAMgBIABgGIABgMIAEgRQACgHADgFQACgFADgDQADgDAEAAIABAAIAIACIALAFQADACABAGQACAHABAKIABAIIAAAKIAAADIAAAEIAFAAIAMABQAEAAABABIADADIABADIAAABQAAABAAAAQAAABAAABQAAAAgBABQAAAAAAABQgCACgDABIgOAAIgHAAIAAAOIgBAWIAAAOIABAgIgBAXIAAAMQAAANABAIQABAIADADIACABIACABQADAAABgCQACgDABgFIABgGIABgKIABgHQACgCADgCIABAAIABAAIACAAQAAAAABAAQAAAAABAAQABAAAAABQAAAAABAAIADAFIAAABIAAABIgBARIgEAPQgDAHgHAEQgHAEgJAAgAgOhnIgCAHIgCAHIgBAHIAAADIAAAAIAAAFIABAFIABABQABgDADgUIADgLIABgGIAAgBIAAAAIgBAAQgBAAgDAGg");
	this.shape_12.setTransform(27.475,101.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#282E46").s().p("AAcBeQgEAAgEgBQgEgBgDgDIgJABIgFABQgHgBgGgBQgGgCgGgEQgMgHgFgOIgCgHIgBgHIAAgEQABgUAPgRIAJgHIAJgEIAEgBIAHgBIAAgKIAAgOIAAgLIAAgSQAAgHgBgCQgBgEgEAAIgDABIgEAFQgDAEgBAEQgBAGgBAGIAAAHIgBAEIgDACIgDABIgBAAQgDAAgCgCQgCgBgBgDIgBgDIAAgCIAAgIQABgHACgHQADgHAFgHIAHgHIAHgDIAKgEIALgBIABAAQAIABAHADQAHADAFAGQAFAGACAJQACAJAAANIgBA2IAAAcIAAAZIAAAMIAAAHIgBAGIgDADIgFACIgGABgAACBJIgDgMIgBgPIAAgQIAAgOIABgHQgFABgLAHQgFAGgEAGQgCAIgBAJIAAABQABAJAEAHQAFAGAIAEIAFAAIAEAAIAEAAIAAAAgAAahMIACAEIADAFIACAHIABAJIAAADIABAAIACgCIABgEIAAAAQAAgGgCgGQgCgFgDgEIgFgDIAAAAIgBAAIABACg");
	this.shape_13.setTransform(16.45,104.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#282E46").s().p("AAUB6QgJAAgIgEQgHgEgHgHIgIgMQgEgFgBgFIgDgHIgDgMIgBgNIAAgfIAAgiIAAgMIAAgXIgIAAIgHAAQgBAAAAAAQgBAAgBgBQAAAAgBAAQAAAAgBgBIgCgEIAAgCQAAAAAAgBQAAAAAAgBQAAgBABAAQAAAAAAgBIAEgCIAGgBIAMgBIABgGIABgMIAEgRQACgHADgFQACgFADgDQADgDAEAAIABAAIAIACIALAFQADACABAGQACAHABAKIABAIIAAAKIAAADIAAAEIAFAAIAMABQAEAAABABIADADIABADIAAABQAAABAAAAQAAABAAABQAAAAgBABQAAAAAAABQgCACgDABIgOAAIgHAAIAAAOIgBAWIAAAOIABAgIgBAXIAAAMQAAANABAIQABAIADADIACABIACABQADAAABgCQACgDABgFIABgGIABgKIABgHQACgCADgCIABAAIABAAIACAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAABAAIADAFIAAABIAAABIgBARIgEAPQgDAHgHAEQgHAEgJAAgAgOhnIgCAHIgCAHIgBAHIAAADIAAAAIAAAFIABAFIABABQABgDADgUIADgLIABgGIAAgBIAAAAIgBAAQgBAAgDAGg");
	this.shape_14.setTransform(4.875,101.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#282E46").s().p("AAoBeQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAAAQgBgBAAAAQgBAAAAgBQgBAAAAgBQAAAAgBgBIgBgEIAAgHIgBgbIAAg0IAAgmQAAgOgBgJQgCgJgDgCIgCAAQgDAAgEACQgDADgDAFQgEAGgCAKQgDALgBAOIgBAUIgBAcIABATIABAgIAAACIgDAHQgCADgCACIgGACIgDABQgJAAgKgNQgEgGgEgQIgEgWIgBgVIgBgQIAAgRIAAgTIACgWIACgOIAEgJQADgFAFgEQAFgDAHAAQAFAAAEADQAFADADAGIACAFIACgCIAEgFQAFgDAEgDQAFgBAFAAIAAAAQAIAAAGAFQAFAEADAIQACAFABAIIABAUIAAABIAAAaIAAAKIAAAKIAAAnIAAAlIAAAEIgCAGQgBAAgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAgAgjhLIgEAKIgBAGIAAAFIAAAGIACABIACgCIACgGIABgLIAAgHIABgCIABgDIgBAAIgBAAQAAAAgBAAQAAAAAAAAQAAABgBAAQAAABAAABg");
	this.shape_15.setTransform(-6.75,104.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#282E46").s().p("AgFBYQgHgDgGgGIgFgFIgHgLIgGgMIgDgIIgDgLQgEgXAAgRQgBgTAEgPQAEgPAIgLQAKgPAQgFIAFgCIAGAAIABAAQAJAAAIAFQAIAEAGAJIADAFIACAHIACAKIAAAHIABAQIABAQIAAACQAAAEgCADQgBACgDAAIgFABIgJABIgUAAIgIAAIABAOIACAVIAEAMIADAJIADAGIAFAGIABABIAAAAQADgCACgFIAFgNIADgKIABgFIADgCIAEgBQADAAACACIAEAEIAAABIAAABIgCAJIgFAQIgDAHIgEAHQgGAFgGADQgHADgIAAQgHAAgFgDgAAYgOIAFAAIAAgCIAAgWIgCgQIgDgHIgEgFIgFgEIgDgBQgFAFgDAHQgDAGgBAIIgBAPIgBAQIAAAAIALAAIAIAAIAHAAgAgShJIgIAJIgEAHIgBAFIAAABIAAACIABABIACgCIADgEIABgEIAFgIIAEgEIAFgGIgBgBIAAAAQgEABgDADg");
	this.shape_16.setTransform(-18.4028,104.575);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#282E46").s().p("AgBBdQgJAAgJgFIgIgGIgEgFQgEgFgCgGQgDgHgBgJIgBgCIAAgEIACgEIADgCIADgBIABAAQABAAAAAAQABAAABAAQAAABABAAQAAAAABABQACABABADIADAOIAEAIIAGAHQADACAEAAIAFgFIACgHIABgCIABgGQAAgIgEgNQgFgLgJgPIgNgTIgHgOQgEgHgBgHIgCgMIABgIIADgKQADgGAFgFQAEgEAGgEIAIgCIAIgBIABAAQAEAAAFACIAMAGIAHAIQADAEABACIAEALQABAGAAAGIAAAAQAAAHgCAEQgBAEgEABIgCAAQAAAAgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgCgCgBgDIAAgFIAAgDIgBgJIgEgKIgCgDIgEgEQgDACgCAEQgBAEAAAFQAAAEACAGIAIANIACAEIAJANIAGALIAEAJQAKAYAAARIAAABQAAAJgDAIQgDAJgGAGQgHAIgEABIgKAFIgJABgAgXhOIgHAIIgDAHIgBAGIAAAAIgBAAIABAHIADAFIAAAAQAAgHACgFIAFgNIADgEIAEgFIAAgBIgBAAQgDAAgCACg");
	this.shape_17.setTransform(-29.575,104.3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#282E46").s().p("AgFBYQgHgDgGgGIgFgFIgHgLIgGgMIgDgIIgDgLQgEgXAAgRQgBgTAEgPQAEgPAIgLQAKgPAQgFIAFgCIAGAAIABAAQAJAAAIAFQAIAEAGAJIADAFIACAHIACAKIAAAHIABAQIABAQIAAACQAAAEgCADQgBACgDAAIgFABIgJABIgUAAIgIAAIABAOIACAVIAEAMIADAJIADAGIAFAGIABABIAAAAQADgCACgFIAFgNIADgKIABgFIADgCIAEgBQADAAACACIAEAEIAAABIAAABIgCAJIgFAQIgDAHIgEAHQgGAFgGADQgHADgIAAQgHAAgFgDgAAYgOIAFAAIAAgCIAAgWIgCgQIgDgHIgEgFIgFgEIgDgBQgFAFgDAHQgDAGgBAIIgBAPIgBAQIAAAAIALAAIAIAAIAHAAgAgShJIgIAJIgEAHIgBAFIAAABIAAACIABABIACgCIADgEIABgEIAFgIIAEgEIAFgGIgBgBIAAAAQgEABgDADg");
	this.shape_18.setTransform(-40.9028,104.575);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#282E46").s().p("AgOBeQgIAAgHgGQgFgFgFgLQgBgDgBgIIgDgYIAAgPIAAgWIAAgQIAAgKIAAgNIAAgIIAAgQQAAgKACgHQADgGAGgDIACgCIAFgBIADAAIACgBQAFAAAEADQAEADAEAFIABACIAAADIABAAQACgFAFgDIAKgFIAEAAIADgBQAGAAAEACQAFADADAFQACACABAFIACAKIABACIAAACQAAAEgCACIgFADIAAAAIgBAAIgBAAQgEAAgCgBIgCgFQgBgJgBgEQgCgEgDAAQgEAAgGAGIgDAGIgCAGIgDANIgCAYIgBAFIAAAGIABA0IAAAjIgBAIQgBADgCABQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgHABgAghhRIgEAJIgCAJIgBAHIABAEIABAFIAAABIADgGIABgFIABgJIABgIIACgGIABgCIAAgBIgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQgBABAAAAg");
	this.shape_19.setTransform(-51.2,104.45);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#282E46").s().p("AggB8QgGgBgFgDQgFgCgDgFQgEgJgEgiIgBgjIgBglQAAgVABgVQADgVADgTIADgMIAEgKIAEgFIAEgGQAEgEACgBIAFgBIABAAIAHABQADABAEADIAEAEIACAGIABAEIAAACIAAAAIAEgGIAEgFQAGgFAFgDQAHgCAFAAQALAAALALQAFAEAEAHIAFASIACANIAAAQIgBAZIgEAbIgEAUIgGANIgEAHIgFAGQgHAHgFADQgHADgGAAIgCAAQgFAAgFgCQgEgDgGgFIAAAgQAAAQgBAJQgBAKgDAEQgDADgEACIgHABIgFAAgAAThoIgIAFIgEAHIgEAGIgFAQIgEAPIgCAQIgBASIAAAEQAAAOACAKQABAKADAHIAEAHIAEAHIAEACIADAAIACAAQAEAAADgCIAIgHIAEgJIAEgLIAEgRIADgVIABgPIAAgMIgBgXQgBgJgCgEIgDgGIgCgEQgHgGgEAAQgDAAgDACgAglhrIgGALIgCAGIgBAFIAAABIABACIABABQAAAAAAAAQAAAAABgBQAAAAAAgBQABAAAAgBIADgKIAEgIIADgIIAAgBIAAAAIgBAAQgCAAgCAEg");
	this.shape_20.setTransform(-64.15,107.9167);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#282E46").s().p("AgFBYQgHgDgGgGIgFgFIgHgLIgGgMIgDgIIgDgLQgEgXAAgRQgBgTAEgPQAEgPAIgLQAKgPAQgFIAFgCIAGAAIABAAQAJAAAIAFQAIAEAGAJIADAFIACAHIACAKIAAAHIABAQIABAQIAAACQAAAEgCADQgBACgDAAIgFABIgJABIgUAAIgIAAIABAOIACAVIAEAMIADAJIADAGIAFAGIABABIAAAAQADgCACgFIAFgNIADgKIABgFIADgCIAEgBQADAAACACIAEAEIAAABIAAABIgCAJIgFAQIgDAHIgEAHQgGAFgGADQgHADgIAAQgHAAgFgDgAAYgOIAFAAIAAgCIAAgWIgCgQIgDgHIgEgFIgFgEIgDgBQgFAFgDAHQgDAGgBAIIgBAPIgBAQIAAAAIALAAIAIAAIAHAAgAgShJIgIAJIgEAHIgBAFIAAABIAAACIABABIACgCIADgEIABgEIAFgIIAEgEIAFgGIgBgBIAAAAQgEABgDADg");
	this.shape_21.setTransform(-77.5528,104.575);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#282E46").s().p("AgOBeQgIAAgHgGQgFgFgFgLQgCgDAAgIIgDgYIgBgPIAAgWIAAgQIAAgKIAAgNIAAgIIAAgQQAAgKADgHQADgGAGgDIADgCIADgBIAEAAIACgBQAFAAAEADQAFADADAFIABACIAAADIABAAQADgFAEgDIAKgFIAEAAIAEgBQAFAAAEACQAFADADAFQACACABAFIACAKIAAACIAAACQAAAEgBACIgEADIgBAAIgBAAIgCAAQgDAAgBgBIgDgFQgBgJgCgEQgBgEgCAAQgFAAgGAGIgDAGIgCAGIgDANIgCAYIgBAFIgBAGIACA0IAAAjIgBAIQgBADgCABQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgHABgAghhRIgEAJIgCAJIAAAHIAAAEIABAFIAAABIADgGIAAgFIACgJIACgIIABgGIABgCIAAgBIgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQgBABAAAAg");
	this.shape_22.setTransform(-87.85,104.45);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#282E46").s().p("AgBBdQgJAAgJgFIgIgGIgEgFQgEgFgCgGQgDgHgBgJIgBgCIAAgEIACgEIADgCIADgBIABAAQABAAAAAAQABAAABAAQAAABABAAQAAAAABABQACABABADIADAOIAEAIIAGAHQADACAEAAIAFgFIACgHIABgCIABgGQAAgIgEgNQgFgLgJgPIgNgTIgHgOQgEgHgBgHIgCgMIABgIIADgKQADgGAFgFQAEgEAGgEIAIgCIAIgBIABAAQAEAAAFACIAMAGIAHAIQADAEABACIAEALQABAGAAAGIAAAAQAAAHgCAEQgBAEgEABIgCAAQAAAAgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgCgCgBgDIAAgFIAAgDIgBgJIgEgKIgCgDIgEgEQgDACgCADQgBAFAAAFQAAAEACAGIAIANIACAEIAJANIAGALIAEAJQAKAYAAARIAAABQAAAJgDAIQgDAJgGAGQgHAIgEABIgKAFIgJABgAgXhOIgHAIIgDAHIgBAGIAAAAIgBAAIABAHIADAFIAAAAQAAgHACgFIAFgNIADgEIAEgFIAAgBIgBAAQgDAAgCACg");
	this.shape_23.setTransform(223.775,57.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#282E46").s().p("AABASIgBAAQgCAAgCgCQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAgBAAgBIgCgHIAAgJQAAgFACgEQABgDADgBQADgBADACQADABAAAFIABANIABAGIgCAFQgCADgDABIgBAAg");
	this.shape_24.setTransform(215.9,43.605);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#282E46").s().p("AAoBeQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAAAgBQAAAAgBgBIgBgEIAAgHIAAgbIgBg0IABgmQgBgOgBgJQgCgJgDgCIgCAAQgDAAgEACQgEADgCAFQgEAGgCAKQgDALgBAOIgBAUIgBAcIABATIABAgIAAACIgDAHQgBADgEACIgEACIgFABQgIAAgKgNQgEgGgEgQIgEgWIgBgVIAAgQIAAgRIAAgTIABgWIACgOIAEgJQADgFAFgEQAFgDAHAAQAFAAAEADQAFADAEAGIABAFIACgCIAFgFQAEgDAFgDQAEgBAFAAIAAAAQAIAAAFAFQAGAEADAIQACAFABAIIABAUIAAABIAAAaIAAAKIAAAKIAAAnIABAlIAAAEIgDAGQgBAAgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAgAgjhLIgEAKIAAAGIgBAFIABAGIABABIACgCIABgGIACgLIAAgHIABgBIABgEIgBAAIgBAAQAAAAgBAAQAAAAAAAAQAAABAAAAQgBABAAABg");
	this.shape_25.setTransform(207.35,57.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#282E46").s().p("AgFBYQgHgDgGgGIgFgFIgHgLIgGgMIgDgIIgDgLQgEgXAAgRQgBgTAEgPQAEgPAIgLQAKgPAQgFIAFgCIAGAAIABAAQAJAAAIAFQAIAEAGAJIADAFIACAHIACAKIAAAHIABAQIABAQIAAACQAAAEgCADQgBACgDAAIgFABIgJABIgUAAIgIAAIABAOIACAVIAEAMIADAJIADAGIAFAGIABABIAAAAQADgCACgFIAFgNIADgKIABgFIADgCIAEgBQADAAACACIAEAEIAAABIAAABIgCAJIgFAQIgDAHIgEAHQgGAFgGADQgHADgIAAQgHAAgFgDgAAYgOIAFAAIAAgCIAAgWIgCgQIgDgHIgEgFIgFgEIgDgBQgFAFgDAHQgDAGgBAIIgBAPIgBAQIAAAAIALAAIAIAAIAHAAgAgShJIgIAJIgEAHIgBAFIAAABIAAACIABABIACgCIADgEIABgEIAFgIIAEgEIAFgGIgBgBIAAAAQgEABgDADg");
	this.shape_26.setTransform(195.6472,57.325);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#282E46").s().p("AA+BeQgEAAgCgCQgCgCgBgDIAAgDIAAgDIAAgMIABgiIAAgQIAAgTIAAgiIAAgXQAAgIgBgDIgCgFIgCgBIAAgBIgBAAQgDAAgDACIgGAGIgDAFIgDAHIgCAIIgCAKIgCAKIAAALIAABIIAAAcQAAADgCADIgEACIgBABIgCAAQAAAAgBAAQgBAAAAgBQgBAAAAAAQgBAAAAgBIgEgEIAAgJIAAgUIgBhEIAAgoIgCgMQAAgFgCgCIgBgDIgBgBIgDABIgEADIgHAJIgEAOIgDAeQgCAQAAAWIABAUIABAgIAAACQAAAFgBADQgCAEgDACIgFACIgGAAIgBAAQgFAAgFgDQgFgFgEgIQgEgHgCgKIgEgWIgCgbIgBgSQAAgZACgQQABgQADgIIABgHIADgFQAHgIAKAAIABAAQAEAAADABIAFADIAFAFIACAGIAAABIAKgJQAJgEAFAAQAEAAAEACQADACAEAEQACACACAHIABAAIADgFIAEgFQAFgEAFgCQAFgDAFAAQAIAAAGAFQAFAEADAIIACANIABAXQAAA3gCA0IAAAQQAAAEgCACQgBADgEABIgBAAgAg3hMIgEAIIgBAFIgBAHIABAFIABACQABAAAAgBQAAAAABAAQAAAAAAgBQAAAAAAgBIABgEIACgOIACgIIAAgBIgBAAQAAAAAAAAQgBAAAAABQAAAAgBABQAAAAAAABg");
	this.shape_27.setTransform(182.075,57.0167);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#282E46").s().p("AgGBaIgJgEIgHgHIgDgFIgGgKIgFgMIgFgOIgDgOIgCgOIgBgKIAAAAIAAgBQAAgLACgMQABgMAEgNIAGgOQADgGAEgGQADgFAFgDIALgFQAIgDAFAAQAFAAAFACIAKAGIAGAGIADAFQAHALAEAUQADAUAAAcIgBAVIgEAVIgFANIgFAKQgHAKgIAFQgHAFgJAAQgEAAgEgCgAAMhBIgFALQgEAMgCAMQgBAMAAAMIAAAFQAAARACARQADASAHARIABABQAFgGADgFIADgHIACgIIAEgSIABgRIAAgKIgBgPIgCgUIgDgMIgDgKIgCgEIgEgFIgBgBIAAAAIgDAEgAgShKIgJAJIgEAHIgCAFIAAABIAAABIABACIABABIADgDIAEgIQACgGAKgKIAAgBIAAgBIAAAAQgDAAgDADg");
	this.shape_28.setTransform(168.025,56.975);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#282E46").s().p("AAbBbQgFgCgEgDIgDgGIgEgGIgBgGIgCgIIgBAAIgDAJIgDAIQgEAHgGAEQgGAEgIgBQgFAAgFgBQgFgCgFgEIgGgHIgDgGIgFgPIgFgRIgGgbIgFgnIgEgbIgBgRIAAgDIABgHIADgFQABgDAEgBQAFgCAGAAQAIgBAGAFQAFAEADAJIADAJIABAJIADAVIAEAkIAGAkQADAPADAIIACACIAAABIABAAIACgJIACgLIAFglIABgXIAAgKIADgLIADgEIAEgDIADgBIACAAIABAAQAEgBADADQADADACAFQACADABAHIABASIADAmIADAZIACAJIACAGIAAABIACgFIACgIIAEgSIACgIIACgUIACgcIACgmIAEgdQACgHAGABIABAAQAAAAABAAQAAAAABAAQAAAAABAAQABABAAAAIADADIABADIAAABIgEAmIgDA0IgDAWIgDARIgEAUIgGANIgFAIQgDACgDABQgEACgFAAQgFAAgEgCgAhFhRIgBABIgBAFIAAAEIAAABQgBAIACAGQABAGAEAFIAAAAIABgBIAAgEIAAgBIAAgHIgCgLIgBgMIAAAAIgBAAIgBAAg");
	this.shape_29.setTransform(153.85,57.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#282E46").s().p("AgkBzQgHgEgEgJIgBgGIgBgJIgBgWIgBgnIAAg0IACglIACgSQAHgnANAAIABAAQAEAAAFACQAFACAGAEIADACIABAGIACAHIABAOIABAKQgCAoAAAeIAAADIAAADIAIgGIAHgIQAFgFAGgPQAGgTAAgEQABgFACgDQADgCADAAQAAAAABAAQAAAAABAAQAAABABAAQAAAAABAAQAAABABAAQAAAAABABQAAAAAAABQABAAAAABIAAABIAAABIAAAAIgBAJIgCAMIgEAOIgGALIgFAIIgIAJIgGAGIgIAGIAIAGIAJAJIAGAIIAGALIAGAPIAFATQACAKABANIAAABIABABIgBABIgCADQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgDAAIgDgBIgCgDIgCgGQgCgQgEgMQgDgLgDgHIgGgLIgHgIIgEgEIgGgFIgBA/QAAAEgCAFQgBAFgEAFIgGAEQgDABgEABQgJAAgGgGgAgihkIgCAFIgEAMIgCALIAAADIABADIAAAAIABAAIACgCIACgGIAEgTIABgIIAAAAIgBgBIgCACg");
	this.shape_30.setTransform(131.375,53.9);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#282E46").s().p("AAGBbQgGAAgFgCQgGgCgGgEIgHgGIgDgFIgHgMQgEgGgBgIQgEgOgCgNQgCgNAAgMIAAgDQAAgLACgLQACgLAEgLIADgJIAHgJIAJgJQADgDADgBIAMgFIAJgBQAIAAAIAEQAGAEAFAIIAEAKIABAKIAAACQAAADgBADIgEADIgCAAIgBABQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBIgDgEIgBgJIgEgIIgCgCIgBAAIgEAEIgDAGIgDAMIgEAQIAAAHIgBAKQABARACARQACARAGAPIAFAIQADADACABIADgEIACgIIACgKIACgMIACgDIACgCIACAAIABgBQAEAAACACQACABABADIAAABIABACIgCAMIgEARQgDAHgEAFQgDAFgGAEIgDACIgGACIgGACIgEAAgAgRhKIgIAJIgEAIIgBAHIAAABIABABIABgBIACgDIACgGIAEgGIADgFIAHgIIAAAAIgBAAQgCAAgEADg");
	this.shape_31.setTransform(119.75,57.425);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#282E46").s().p("AgFBYQgHgDgGgGIgFgFIgHgLIgGgMIgDgIIgDgLQgEgXAAgRQgBgTAEgPQAEgPAIgLQAKgPAQgFIAFgCIAGAAIABAAQAJAAAIAFQAIAEAGAJIADAFIACAHIACAKIAAAHIABAQIABAQIAAACQAAAEgCADQgBACgDAAIgFABIgJABIgUAAIgIAAIABAOIACAVIAEAMIADAJIADAGIAFAGIABABIAAAAQADgCACgFIAFgNIADgKIABgFIADgCIAEgBQADAAACACIAEAEIAAABIAAABIgCAJIgFAQIgDAHIgEAHQgGAFgGADQgHADgIAAQgHAAgFgDgAAYgOIAFAAIAAgCIAAgWIgCgQIgDgHIgEgFIgFgEIgDgBQgFAFgDAHQgDAGgBAIIgBAPIgBAQIAAAAIALAAIAIAAIAHAAgAgShJIgIAJIgEAHIgBAFIAAABIAAACIABABIACgCIADgEIABgEIAFgIIAEgEIAFgGIgBgBIAAAAQgEABgDADg");
	this.shape_32.setTransform(108.1972,57.325);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#282E46").s().p("AgmBzQgHgEgEgJIgBgGIgBgLIgBgWIAAg5IgBgGIAAgNIABgfIACgjIADgMIADgKIAEgJIAEgGIAEgDIAEAAQAEAAAFABIALAGQACABACAEQACAFABAHIABAMIAAAKIAAAAIAAANIgBARIAFgHQAGgIAGgDQAHgDAGAAIACAAQAEAAAEACQAEACADAEQAEAFACAOQACANAAAXIgBAiIgCA4IABAVIgBAEIgEADIgBABIgBAAIgEAAQgDAAgDgEQgBgBAAgHIAAgQIAChDIAAgIIABgRQAAgjgFgKIgBAAIgBAAQgFAAgFAEQgFAFgFAJIgFAQIgFASIgBAEIAAADIAAAbIgBAWIAAAiIgBAGIgDAHQgCAGgFADQgEAEgGAAQgJgBgGgFgAgjhlIgCADIgEAOIgCANIAAADIABACIADgDIABgEIACgPIACgKIADgFIgBAAIgBgBIgCADg");
	this.shape_33.setTransform(96.125,54.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#282E46").s().p("AAGBbQgGAAgFgCQgFgCgHgEIgHgGIgDgFIgHgMQgDgGgCgIQgFgOgBgNQgCgNAAgMIAAgDQAAgLACgLQABgLAFgLIADgJIAHgJIAJgJQADgDAEgBIALgFIAJgBQAIAAAIAEQAGAEAFAIIAEAKIACAKIAAACQAAADgCADIgEADIgCAAIgBABQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBAAgBgBIgCgEIgBgJIgEgIIgCgCIgBAAIgDAEIgEAGIgDAMIgEAQIAAAHIgBAKQAAARADARQADARAFAPIAFAIQADADACABIADgEIACgIIACgKIACgMIACgDIACgCIACAAIABgBQADAAADACQACABABADIAAABIABACIgCAMIgEARQgDAHgEAFQgDAFgGAEIgDACIgGACIgGACIgEAAgAgRhKIgIAJIgEAIIgBAHIAAABIABABIABgBIACgDIACgGIAEgGIADgFIAHgIIAAAAIgBAAQgCAAgEADg");
	this.shape_34.setTransform(83.85,57.425);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#282E46").s().p("AgGBaIgJgEIgHgHIgDgFIgGgKIgFgMIgFgOIgDgOIgCgOIgBgKIAAAAIAAgBQAAgLACgMQABgMAEgNIAGgOQADgGAEgGQADgFAFgDIALgFQAIgDAFAAQAFAAAFACIAKAGIAGAGIADAFQAHALAEAUQADAUAAAcIgBAVIgEAVIgFANIgFAKQgHAKgIAFQgHAFgJAAQgEAAgEgCgAAMhBIgFALQgEAMgCAMQgBAMAAAMIAAAFQAAARACARQADASAHARIABABQAFgGADgFIADgHIACgIIAEgSIABgRIAAgKIgBgPIgCgUIgDgMIgDgKIgCgEIgEgFIgBgBIAAAAIgDAEgAgShKIgJAJIgEAHIgCAFIAAABIAAABIABACIABABIADgDIAEgIQACgGAKgKIAAgBIAAgBIAAAAQgDAAgDADg");
	this.shape_35.setTransform(65.425,56.975);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#282E46").s().p("AAUB6QgJAAgIgEQgHgEgHgHIgIgMQgEgFgBgFIgDgHIgDgMIgBgNIAAgfIAAgiIAAgMIAAgXIgIAAIgHAAQgBAAAAAAQgBAAgBgBQAAAAgBAAQAAAAgBgBIgCgEIAAgCQAAAAAAgBQAAAAAAgBQAAgBABAAQAAAAAAgBIAEgCIAGgBIAMgBIABgGIABgMIAEgRQACgHADgFQACgFADgDQADgDAEAAIABAAIAIACIALAFQADACABAGQACAHABAKIABAIIAAAKIAAADIAAAEIAFAAIAMABQAEAAABABIADADIABADIAAABQAAABAAAAQAAABAAABQAAAAgBABQAAAAAAABQgCACgDABIgOAAIgHAAIAAAOIgBAWIAAAOIABAgIgBAXIAAAMQAAANABAIQABAIADADIACABIACABQADAAABgCQACgDABgFIABgGIABgKIABgHQACgCADgCIABAAIABAAIACAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAABAAIADAFIAAABIAAABIgBARIgEAPQgDAHgHAEQgHAEgJAAgAgOhnIgCAHIgCAHIgBAHIAAADIAAAAIAAAFIABAFIABABQABgDADgUIADgLIABgGIAAgBIAAAAIgBAAQgBAAgDAGg");
	this.shape_36.setTransform(53.925,54.425);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#282E46").s().p("AA+BeQgEAAgCgCQgCgCgBgDIAAgDIAAgDIAAgMIABgiIAAgQIAAgTIAAgiIAAgXQAAgIgBgDIgCgFIgCgBIAAgBIgBAAQgDAAgDACIgGAGIgDAFIgDAHIgCAIIgCAKIgCAKIAAALIAABIIAAAcQAAADgCADIgEACIgBABIgCAAQAAAAgBAAQgBAAAAgBQgBAAAAAAQgBAAAAgBIgEgEIAAgJIAAgUIgBhEIAAgoIgCgMQAAgFgCgCIgBgDIgBgBIgDABIgEADIgHAJIgEAOIgDAeQgCAQAAAWIABAUIABAgIAAACQAAAFgBADQgCAEgDACIgFACIgGAAIgBAAQgFAAgFgDQgFgFgEgIQgEgHgCgKIgEgWIgCgbIgBgSQAAgZACgQQABgQADgIIABgHIADgFQAHgIAKAAIABAAQAEAAADABIAFADIAFAFIACAGIAAABIAKgJQAJgEAFAAQAEAAAEACQADACAEAEQACACACAHIABAAIADgFIAEgFQAFgEAFgCQAFgDAFAAQAIAAAGAFQAFAEADAIIACANIABAXQAAA3gCA0IAAAQQAAAEgCACQgBADgEABIgBAAgAg3hMIgEAIIgBAFIgBAHIABAFIABACQABAAAAgBQAAAAAAAAQABAAAAgBQAAAAAAgBIABgEIACgOIACgIIAAgBIgBAAQAAAAAAAAQgBAAAAABQAAAAgBABQAAAAAAABg");
	this.shape_37.setTransform(32.275,57.0167);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#282E46").s().p("AgFBYQgHgDgGgGIgFgFIgHgLIgGgMIgDgIIgDgLQgEgXAAgRQgBgTAEgPQAEgPAIgLQAKgPAQgFIAFgCIAGAAIABAAQAJAAAIAFQAIAEAGAJIADAFIACAHIACAKIAAAHIABAQIABAQIAAACQAAAEgCADQgBACgDAAIgFABIgJABIgUAAIgIAAIABAOIACAVIAEAMIADAJIADAGIAFAGIABABIAAAAQADgCACgFIAFgNIADgKIABgFIADgCIAEgBQADAAACACIAEAEIAAABIAAABIgCAJIgFAQIgDAHIgEAHQgGAFgGADQgHADgIAAQgHAAgFgDgAAYgOIAFAAIAAgCIAAgWIgCgQIgDgHIgEgFIgFgEIgDgBQgFAFgDAHQgDAGgBAIIgBAPIgBAQIAAAAIALAAIAIAAIAHAAgAgShJIgIAJIgEAHIgBAFIAAABIAAACIABABIACgCIADgEIABgEIAFgIIAEgEIAFgGIgBgBIAAAAQgEABgDADg");
	this.shape_38.setTransform(18.3972,57.325);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#282E46").s().p("AAUB6QgJAAgIgEQgHgEgHgHIgIgMQgEgFgBgFIgDgHIgDgMIgBgNIAAgfIAAgiIAAgMIAAgXIgIAAIgHAAQgBAAAAAAQgBAAgBgBQAAAAgBAAQAAAAgBgBIgCgEIAAgCQAAAAAAgBQAAAAAAgBQAAgBABAAQAAAAAAgBIAEgCIAGgBIAMgBIABgGIABgMIAEgRQACgHADgFQACgFADgDQADgDAEAAIABAAIAIACIALAFQADACABAGQACAHABAKIABAIIAAAKIAAADIAAAEIAFAAIAMABQAEAAABABIADADIABADIAAABQAAABAAAAQAAABAAABQAAAAgBABQAAAAAAABQgCACgDABIgOAAIgHAAIAAAOIgBAWIAAAOIABAgIgBAXIAAAMQAAANABAIQABAIADADIACABIACABQADAAABgCQACgDABgFIABgGIABgKIABgHQACgCADgCIABAAIABAAIACAAQAAAAABAAQABAAAAAAQAAAAABABQAAAAABAAIADAFIAAABIAAABIgBARIgEAPQgDAHgHAEQgHAEgJAAgAgOhnIgCAHIgCAHIgBAHIAAADIAAAAIAAAFIABAFIABABQABgDADgUIADgLIABgGIAAgBIAAAAIgBAAQgBAAgDAGg");
	this.shape_39.setTransform(6.825,54.425);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#282E46").s().p("AgBBdQgJAAgJgFIgIgGIgEgFQgEgFgCgGQgDgHgBgJIgBgCIAAgEIACgEIADgCIADgBIABAAQABAAAAAAQABAAABAAQAAABABAAQAAAAABABQACABABADIADAOIAEAIIAGAHQADACAEAAIAFgFIACgHIABgCIABgGQAAgIgEgNQgFgLgJgPIgNgTIgHgOQgEgHgBgHIgCgMIABgIIADgKQADgGAFgFQAEgEAGgEIAIgCIAIgBIABAAQAEAAAFACIAMAGIAHAIQADAEABACIAEALQABAGAAAGIAAAAQAAAHgCAEQgBAEgEABIgCAAQAAAAgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgCgCgBgDIAAgFIAAgDIgBgJIgEgKIgCgDIgEgEQgDACgCADQgBAFAAAFQAAAEACAGIAIANIACAEIAJANIAGALIAEAJQAKAYAAARIAAABQAAAJgDAIQgDAJgGAGQgHAIgEABIgKAFIgJABgAgXhOIgHAIIgDAHIgBAGIAAAAIgBAAIABAHIADAFIAAAAQAAgHACgFIAFgNIADgEIAEgFIAAgBIgBAAQgDAAgCACg");
	this.shape_40.setTransform(-3.325,57.05);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#282E46").s().p("AABB6QgGABgFgDQgHgCgFgFQgFgFgCgGQgDgGAAgJIAAgCQAAgEACgCQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABgBIABAAIACAAQAEAAACABQACACABAEQAAAIACAFQABAFACACIADABIAFACQAAAAAAAAQABAAAAAAQABgBAAAAQAAAAAAgBIAEgDQABgCABgFIAAgNIAAgDIABgCIgBgOIAAgHIAAgCQgGAGgGACQgFAEgFAAIgBAAQgGAAgFgEQgHgDgFgHIgGgJIgEgMIgEgbIgBgZIAAgRQAAggABgRQACgTACgFIADgCIAEgBQABAAAAAAQABAAAAAAQABABAAAAQABAAABABQABABABADIAAACIgBARIAAA1IAAAHQgBATACAPQACAQACAMIACAFIACADIAHAGIAEACIAAAAIAGgCIAGgFQACgDACgEIACgKIACgNIABgKIAAgPIABglIACgkIADgQIADgIIAFgGIAHgDIACAAIABAAIADAAQAPAAAFAOQADAEABAIIABAUIgBATIAAAhIgBAIIAAAKIAAAJIABAaIAAACIgBAcIgCAPIAAAHIgDAKIgEAHIgFAHIgGAGIgGAEIgMAEQgHACgGAAgAAohtIACAGIABAIIABAKIABAEIABABIABACQADgDAAgFIAAAAIgBgFIgBgEIgBgFIgEgHIgBgCIgBgBIgBAAIAAABg");
	this.shape_41.setTransform(-15.6,59.95);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#282E46").s().p("AgBBdQgJAAgJgFIgIgGIgEgFQgEgFgCgGQgDgHgBgJIgBgCIAAgEIACgEIADgCIADgBIABAAQABAAAAAAQABAAABAAQAAABABAAQAAAAABABQACABABADIADAOIAEAIIAGAHQADACAEAAIAFgFIACgHIABgCIABgGQAAgIgEgNQgFgLgJgPIgNgTIgHgOQgEgHgBgHIgCgMIABgIIADgKQADgGAFgFQAEgEAGgEIAIgCIAIgBIABAAQAEAAAFACIAMAGIAHAIQADAEABACIAEALQABAGAAAGIAAAAQAAAHgCAEQgBAEgEABIgCAAQAAAAgBAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQgCgCgBgDIAAgFIAAgDIgBgJIgEgKIgCgDIgEgEQgDACgCADQgBAFAAAFQAAAEACAGIAIANIACAEIAJANIAGALIAEAJQAKAYAAARIAAABQAAAJgDAIQgDAJgGAGQgHAIgEABIgKAFIgJABgAgXhOIgHAIIgDAHIgBAGIAAAAIgBAAIABAHIADAFIAAAAQAAgHACgFIAFgNIADgEIAEgFIAAgBIgBAAQgDAAgCACg");
	this.shape_42.setTransform(-27.425,57.05);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#282E46").s().p("AAcBeQgEAAgEgBQgEgBgEgDIgIABIgFABQgHgBgGgBQgHgCgFgEQgMgHgFgOIgCgHIAAgHIAAgEQgBgUAQgRIAJgHIAJgEIAEgBIAHgBIABgKIAAgOIAAgLIgBgSQAAgHgBgCQgCgEgDAAIgDABIgFAFQgCAEgBAEQgCAGABAGIAAAHIgCAEIgDACIgDABIgBAAQgDAAgCgCQgCgBgBgDIAAgDIAAgCIAAgIQgBgHADgHQADgHAFgHIAIgHIAGgDIALgEIAKgBIABAAQAJABAGADQAHADAFAGQAFAGACAJQADAJgBANIgBA2IAAAcIAAAZIAAAMIAAAHIgBAGIgDADIgFACIgGABgAACBJIgCgMIgBgPIAAgQIAAgOIAAgHQgFABgLAHQgFAGgEAGQgCAIAAAJIAAABQgBAJAFAHQAFAGAIAEIAFAAIAFAAIADAAIAAAAgAAahMIACAEIADAFIACAHIABAJIABADIAAAAIACgCIABgEIAAAAQAAgGgCgGQgCgFgEgEIgEgDIAAAAIAAAAIAAACg");
	this.shape_43.setTransform(-45.4,57);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#282E46").s().p("AACBsIgFgCQgEgBgDgDQgCgCgCgFIgEgLQgCgMgBgXQgBgXAAgiIABgcQABgKACgCQACgDAEgCQAEgBAFAAIADAAQAHAAAGADQAEADADAGQABADACAHIAAAVIAAAXIgBAtIgBAYQgBAIgBAEIgCAGIgDAEIgEACIgFACIgBABIgCAAgAgKgtIgCACIgDAKIgBAHIAAAGIACAEIACABIAAAAIAAgBIACgSIAAgEIACgIIAAgBIgBAAIgBACgAAAhFQgFAAgDgCQgEgCgDgFIgDgFIAAgFQAAgEACgEQACgEAEgDIAGgCIAEgBIAAAAQAGgBADADQAFADADAFIABAEIABAFQAAAEgCAEIgGAHIgGACIgFABgAgIhiIgDADIgBACIAAADIAAAEIAAACIACABIABgCIABgEIACgEIADgGIgBgBIgEACg");
	this.shape_44.setTransform(-54.1,55.55);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#282E46").s().p("AgOBeQgIAAgHgGQgFgFgFgLQgBgDgBgIIgDgYIgBgPIAAgWIAAgQIAAgKIAAgNIAAgIIAAgQQABgKACgHQADgGAFgDIAEgCIADgBIAEAAIADgBQAEAAAEADQAFADADAFIABACIABADIAAAAQADgFAEgDIAKgFIAEAAIAEgBQAFAAAFACQAEADADAFQACACABAFIACAKIAAACIAAACQAAAEgBACIgEADIgBAAIgCAAIgBAAQgDAAgBgBIgEgFQAAgJgCgEQgBgEgCAAQgFAAgGAGIgDAGIgCAGIgDANIgDAYIAAAFIgBAGIABA0IABAjIgBAIQgBADgCABQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgGABgAghhRIgEAKIgCAIIAAAHIAAAEIABAFIAAABIADgGIAAgFIACgJIACgIIACgGIAAgCIAAgBIgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQgBABAAAAg");
	this.shape_45.setTransform(-62.75,57.2);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#282E46").s().p("AgFBYQgHgDgGgGIgFgFIgHgLIgGgMIgDgIIgDgLQgEgXAAgRQgBgTAEgPQAEgPAIgLQAKgPAQgFIAFgCIAGAAIABAAQAJAAAIAFQAIAEAGAJIADAFIACAHIACAKIAAAHIABAQIABAQIAAACQAAAEgCADQgBACgDAAIgFABIgJABIgUAAIgIAAIABAOIACAVIAEAMIADAJIADAGIAFAGIABABIAAAAQADgCACgFIAFgNIADgKIABgFIADgCIAEgBQADAAACACIAEAEIAAABIAAABIgCAJIgFAQIgDAHIgEAHQgGAFgGADQgHADgIAAQgHAAgFgDgAAYgOIAFAAIAAgCIAAgWIgCgQIgDgHIgEgFIgFgEIgDgBQgFAFgDAHQgDAGgBAIIgBAPIgBAQIAAAAIALAAIAIAAIAHAAgAgShJIgIAJIgEAHIgBAFIAAABIAAACIABABIACgCIADgEIABgEIAFgIIAEgEIAFgGIgBgBIAAAAQgEABgDADg");
	this.shape_46.setTransform(-74.3028,57.325);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#282E46").s().p("AAUB6QgJAAgIgEQgHgEgHgHIgIgMQgEgFgBgFIgDgHIgDgMIgBgNIAAgfIAAgiIAAgMIAAgXIgIAAIgHAAQgBAAAAAAQgBAAgBgBQAAAAgBAAQAAAAgBgBIgCgEIAAgCQAAAAAAgBQAAAAAAgBQAAgBABAAQAAAAAAgBIAEgCIAGgBIAMgBIABgGIABgMIAEgRQACgHADgFQACgFADgDQADgDAEAAIABAAIAIACIALAFQADACABAGQACAHABAKIABAIIAAAKIAAADIAAAEIAFAAIAMABQAEAAABABIADADIABADIAAABQAAABAAAAQAAABAAABQAAAAgBABQAAAAAAABQgCACgDABIgOAAIgHAAIAAAOIgBAWIAAAOIABAgIgBAXIAAAMQAAANABAIQABAIADADIACABIACABQADAAABgCQACgDABgFIABgGIABgKIABgHQACgCADgCIABAAIABAAIACAAQAAAAABAAQABAAAAAAQAAAAABABQAAAAABAAIADAFIAAABIAAABIgBARIgEAPQgDAHgHAEQgHAEgJAAgAgOhnIgCAHIgCAHIgBAHIAAADIAAAAIAAAFIABAFIABABQABgDADgUIADgLIABgGIAAgBIAAAAIgBAAQgBAAgDAGg");
	this.shape_47.setTransform(-85.875,54.425);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#282E46").s().p("AACBsIgGgCQgCgBgDgDQgDgCgCgFIgDgLQgCgMgCgXQgBgXAAgiIABgcQABgKACgCQADgDADgCQAEgBAEAAIAEAAQAIAAAEADQAFADADAGQACADAAAHIABAVIAAAXIgCAtIAAAYQgBAIgBAEIgCAGIgDAEIgEACIgFACIgCABIgBAAgAgKgtIgCACIgDAKIgBAHIAAAGIABAEIACABIABAAIAAgBIACgSIABgEIABgIIAAgBIAAAAIgCACgAAAhFQgFAAgDgCQgEgCgDgFIgCgFIgBgFQAAgEACgEQACgEAFgDIAEgCIAFgBIABAAQAEgBAFADQAEADADAFIACAEIAAAFQAAAEgCAEIgGAHIgGACIgFABgAgIhiIgDADIgBACIAAADIAAAEIAAACIACABIABgCIABgEIACgEIADgGIgCgBIgDACg");
	this.shape_48.setTransform(-94.75,55.55);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#282E46").s().p("AgOBeQgIAAgHgGQgFgFgFgLQgBgDgBgIIgDgYIAAgPIAAgWIAAgQIAAgKIAAgNIAAgIIAAgQQAAgKACgHQADgGAGgDIACgCIAFgBIADAAIACgBQAFAAAEADQAEADAEAFIABACIAAADIABAAQACgFAFgDIAKgFIAEAAIADgBQAGAAAEACQAFADADAFQACACABAFIACAKIABACIAAACQAAAEgCACIgFADIAAAAIgBAAIgBAAQgEAAgCgBIgCgFQgBgJgBgEQgCgEgDAAQgEAAgGAGIgDAGIgCAGIgDANIgCAYIgBAFIAAAGIABA0IAAAjIgBAIQgBADgCABQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgHABgAghhRIgEAKIgCAIIgBAHIABAEIABAFIAAABIADgGIABgFIABgJIABgIIACgGIABgCIAAgBIgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQgBABAAAAg");
	this.shape_49.setTransform(-103.4,57.2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#282E46").s().p("AAGBbQgGAAgFgCQgFgCgHgEIgGgGIgFgFIgGgMQgDgGgCgIQgFgOgBgNQgCgNAAgMIAAgDQAAgLACgLQABgLAFgLIADgJIAHgJIAJgJQADgDAEgBIALgFIAJgBQAIAAAIAEQAGAEAFAIIAEAKIACAKIAAACQAAADgCADIgEADIgCAAIgBABQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBAAgBgBIgCgEIgBgJIgEgIIgCgCIgCAAIgCAEIgEAGIgDAMIgDAQIgBAHIgBAKQAAARADARQACARAGAPIAFAIQADADACABIACgEIADgIIADgKIABgMIACgDIACgCIACAAIACgBQACAAADACQACABACADIAAABIAAACIgCAMIgEARQgCAHgFAFQgEAFgFAEIgDACIgHACIgEACIgFAAgAgRhKIgIAJIgEAIIgBAHIAAABIABABIABgBIACgDIACgGIAEgGIADgFIAHgIIgBAAIAAAAQgCAAgEADg");
	this.shape_50.setTransform(-114.5,57.425);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#282E46").s().p("AguB5QgBAAAAAAQgBAAAAgBQgBAAAAAAQgBgBgBAAQgBgCgCgDIAAgBIAAgBIAAgFQAAgUACgYQACgZAEgcIAEgXIgDgDIgBgCIAAgBQAAgBABAAQAAgBAAgBQAAAAAAgBQABAAAAgBQABgCAEgBIAFggIAFgVIAEgQIAEgGIADgGQAFgGAGgDQAGgDAFAAIADAAQAJAAAJAGQAFAEAEAFQADAEABAFIADAKIACANIADAeIAEA2IAEA1IABAhQAAAGgCAFQgCAEgDAEIgEACIgGAAQgJAAgGgEQgHgFgDgJIgDgHIgBgMIgBggIgCg9IgfAAIAAAEIgCAKIgHA3QgCAXAAARIgBAPIgBAEIgDAEIgEABgAAGgdIgBgWIgEgfIgCgMQAAgBAAgBQgBgBAAAAQAAgBgBAAQAAAAAAAAIgCABIgCADIgDAKIgDAKIgFAWIgDAXIABAAIAaAAIAAAAgAAXhmIACAGIADALIAEAOIAAAAIABABIABgBIABgDIAAgBIgCgLQgCgGgEgHIgDgFIgDgBIACADg");
	this.shape_51.setTransform(-133.95,54.525);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#282E46").s().p("AgJA7QgEgCgEgFQgDgFAAgEQAAgKALgHIAFgCIAGgBIAHACIAHAEQADADABADQACADAAAEIAAABQAAAEgDAEQgCAEgFAEIgGACIgGAAIAAAAIgCABQgDAAgEgDgAgIgXIgHgFQgGgFAAgJQAAgEACgEQADgEAEgDIAGgDIAGgBQAFAAAFADQAEACAEAGIACAEIAAAEQAAAKgKAHIgGACIgEABQgEAAgEgBgAgJg0QgDADgCAEIAAAEIABAEQAAABABAAQAAABAAAAQAAABABAAQAAABABAAIAAAAIABgDIABgHIACgFIABgEIABgBIAAgBIgBAAIAAAAQgBAAAAAAQgBAAAAABQgBAAAAAAQgBABAAAAg");
	this.shape_52.setTransform(154.075,-4.6458);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#282E46").s().p("AAbCeQgNAAgKgEQgJgFgKgKQgGgHgEgIQgFgGgCgHIgDgJIgEgQIgBgRIgBgnIAAguIAAgQIABgdIgLAAIgJAAQgEAAgCgDQgCgBgCgEIAAgCQAAgEACgCQACgCADgBIAIgBIAQgCIABgIIABgOIAGgXIAGgPQADgHAEgEQAEgEAFAAIABAAQAFABAGACQAHADAHAEQADADADAHIADAXIABALIABAMIAAAEIgBAFIAHAAIAPAAIAHACIAEAEIACAEIAAACQAAADgDADQgCACgEACIgSAAIgJAAIgBASIAAAcIAAATIABAqIgBAeIAAAPQAAARABAKQACALADADIADADIACABQAEAAACgEIAEgKIABgHIABgNQAAgFACgEQACgDAEgCIABgBIACAAIACAAQADAAACACQADACABAEIABABIAAADQAAAKgCALIgFATQgEAKgJAFQgJAEgMAAgAgSiGIgDAJIgDAKIgBAIIAAAEIAAAAIAAAHIACAHIAAAAQACgDAEgbIADgNIACgJIAAAAIAAgBIgBAAQgCAAgDAIg");
	this.shape_53.setTransform(140.825,-5.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#282E46").s().p("AgBB5QgNAAgMgHQgGgEgDgEQgEgEgCgDQgFgGgDgIQgDgJgCgMIAAgCIgBgEQAAgDADgEIAEgDIAEAAIABAAQADAAADACQADACABAEIAEARQACAHADAEQADAGAFADQAEADAFAAIAGgGQACgDACgGIABgEIABgGQAAgMgGgQQgGgPgMgSIgQgbIgKgRQgEgKgCgIQgDgJAAgHIACgLIAEgNQADgIAGgFQAGgGAIgEIALgEIAKgBIABAAQAFAAAHADQAHACAIAFIAKALIAFAHQADAHACAIQACAHAAAIIAAABQAAAIgDAFQgCAFgEABIgDABQgDAAgDgCQgCgCgCgEIAAAAIAAgGIAAgDIgBgMQgCgHgDgGIgDgFIgFgEIAAAAQgEABgCAFQgCAFAAAIQAAAFADAIQADAHAHAJIADAGIALARIAIAOIAGALQANAgAAAWIAAABQAAAMgEALQgEALgIAJQgJAKgFACIgNAFIgMACgAgfhmIgIAKIgFAJIgBAIIAAAAIgBABQAAAFACADQABAEACADIABAAQAAgJACgIQACgHAEgJIAEgFIAGgHIgCgBQgDAAgEADg");
	this.shape_54.setTransform(127.675,-1.825);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#282E46").s().p("AgHByQgJgDgIgIIgGgHIgKgOIgHgPIgEgLIgEgOQgGgeAAgXQAAgYAFgTQAFgUAKgPQAOgTATgGIAIgDIAHAAIABAAQAMAAALAGQAKAGAIALIAEAHIADAJIACAMIABAKIABAVIABAUIAAAEQAAAFgCADQgCADgEABIgHABIgLAAIgZABIgMAAIACASIADAbIAEAQIAEAMIAFAHIAGAJIABAAIAAAAIABAAQADgDADgGQADgHADgKIAEgNIACgGIAEgDIAFgBQAEAAACACQADACACAEIAAABIAAABIAAABIgCALIgHAVIgEAJIgFAJQgHAHgJAEQgIADgLAAQgJAAgHgEgAAWgSIAJAAIAHAAIAAgDIgBgcIgCgVIgEgJIgFgHIgHgFIgEgCQgGAHgEAJQgDAJgCAJIgCAUIgBAUIAAABIAPAAIAKAAgAgYhfQgFAEgFAIIgFAJIgCAHIAAABIAAADIABABIAEgDIADgGIACgEIAGgLIAFgFIAGgIIAAgBIgBAAQgEABgFAEg");
	this.shape_55.setTransform(112.925,-1.525);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#282E46").s().p("AAACaIgGgDIgGgFIgEgGQgDgEgEgMQgEgLgEgTIgDgWIgBgTIgCghIgBgdQAAgeABgYIADgpIAEgOIAEgNIgRABIgWABIgBAAQgBAAAAAAQgBAAgBgBQAAAAgBAAQAAAAgBgBIgDgEIgBgCIAAgBIAAgBQAAgDACgCQACgDAEgBQAIgCAOgCIAggBIADAAIAEAAIARABIA2AAQAEAAADADQACACACAEIAAADQAAADgCADQgCADgFABIgoAAIAAABIACAVIABAQIAAABIgCAvIAAAeIAAAeIACAuIABAiIACAYIAAAFIAAAFIAAADQAAAEgDAFQgCAEgGAFQgDACgEAAIgJABIgGAAgAgQiBIgEALIgDAJIgBAKIAAACIABAFIACACIABgCIACgGIABgMIAFgTIAAgBIABgBIAAgBIgBAAIAAAAQgBAAAAAAQAAAAgBABQAAAAgBABQAAAAgBABg");
	this.shape_56.setTransform(101.475,-5.125);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#282E46").s().p("AgFCbIgLgFIgJgMQgEgFAAgEQgCgFgBgZIgChFIAAgZIAAgSIAAgCIAAgCIABgpIADgtQACgMAFgPQADgJADgFQADgGADgCQACgCACgBIAGgBQAEAAAHADQAHACAHAFIAEAEIACAGQAFAXAAARIAAACIgBAPIgBAlIgBAPIAAAIIABAVIAAAvIgBAgIgBAtQgBAIgGANQgEAFgFACQgFADgFAAQgGAAgEgCgAgOiDIgFANIgCANIgBALIAAADIABACQAAAAABAAQAAAAAAAAQABgBAAAAQABgBAAgBIACgJIABgGIACgMIACgJIACgIIAAgBIgBgBQgCACgCAFg");
	this.shape_57.setTransform(78.1,-5.525);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#282E46").s().p("AgHByQgJgDgIgIIgGgHIgKgOIgHgPIgEgLIgEgOQgGgeAAgXQAAgYAFgTQAFgUAKgPQAOgTATgGIAIgDIAHAAIABAAQAMAAALAGQAKAGAIALIAEAHIADAJIACAMIABAKIABAVIABAUIAAAEQAAAFgCADQgCADgEABIgHABIgLAAIgZABIgMAAIACASIADAbIAEAQIAEAMIAFAHIAGAJIABAAIAAAAIABAAQADgDADgGQADgHADgKIAEgNIACgGIAEgDIAFgBQAEAAACACQADACACAEIAAABIAAABIAAABIgCALIgHAVIgEAJIgFAJQgHAHgJAEQgIADgLAAQgJAAgHgEgAAWgSIAJAAIAHAAIAAgDIgBgcIgCgVIgEgJIgFgHIgHgFIgEgCQgGAHgEAJQgDAJgCAJIgCAUIgBAUIAAABIAPAAIAKAAgAgYhfQgFAEgFAIIgFAJIgCAHIAAABIAAADIABABIAEgDIADgGIACgEIAGgLIAFgFIAGgIIAAgBIgBAAQgEABgFAEg");
	this.shape_58.setTransform(65.875,-1.525);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#282E46").s().p("AAfCYIgFgFIgGgHIgFAFIgDADQgFAEgGACQgEACgGAAQgGAAgGgCIgOgGQgLgJgGgIQgHgJgFgNQgGgNgDgSIgEgYIgBgXIAAgDIAAgCIAAgCIAAgCQAAgnAQgjIAFgIIAHgKQAJgJAGgDIAKgEQAEgCAEAAIACAAQAHABAHADQAGADAHAHIACgaIACgMIAEgOIAEgMQAEgJAEgEQAEgFAGAAIABAAQAFAAAHADIAOAHIADAEIACAGIAEAVIABAWIgCBSIAAAUIAAApIgBAeIgBAtQAAAEgCAFIgEALIgFAHIgIAEIgDAAIgEABQgJAAgJgFgAgZg+QgFADgGAGIgGALQgDAFgCAIQgFANgCANQgCALAAANIAAAEQAAAQACAPIAFAbIAEANIAFANIAFAHIAGAIIAHAGIAFACIAFACIADAAQAFAAAEgEQADgFAFgKIABgCIADgHIgBgdIgBgwIAAgYIAAgYIgBgIIgEgNIgEgKQgDgIgEgDQgFgEgFAAQgEAAgFADgAA5iJIAAADQAEANAAALIACAPQABAFABAAIADgDIABgFIAAgKQAAgIgCgGQgCgHgDgGIgEgCIgBAAg");
	this.shape_59.setTransform(49.325,-5.375);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#282E46").s().p("AgyCWQgIgFgGgNIgBgHIgCgOIgBgdIAAhKIAAgHIgBgTIABgoIADgtIADgQIAFgNIAFgMIAFgIIAFgDIAGgBQAFABAGACIAPAGQACACADAGQACAFABAKIACAPIAAAOIAAABIAAAQIgBAVIAGgJQAIgIAIgGQAIgEAJAAIACAAQAGAAAFADQAFACAEAGQAFAGADATQACARAAAeIAAAsIgDBJIABAbQgBADgBADIgGAEIgBAAIgBAAIgEAAQgEABgEgGIgCgJIAAgWIADhXIABgJIAAgXQgBgugFgNIgBgBIgCAAQgGAAgHAGQgGAHgGAMQgFAIgDALIgGAYIgBAHIgBACIAAAjIAAAdIgBAsIgBAJIgEAJQgDAIgGADQgFAFgHAAQgMAAgJgHgAguiEIgCAFQgEAIgCAJQgCAIAAAKIABADIAAACQABAAABgBQAAAAABAAQAAgBAAAAQABAAAAgBIABgEIADgUIADgOIADgHIgBAAIgBgBIgDAEg");
	this.shape_60.setTransform(31.75,-5.5);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#282E46").s().p("AAHB2QgHABgHgDQgHgDgIgFIgJgIIgFgGQgFgHgEgIQgEgJgDgKQgFgSgCgRQgCgRAAgQIAAgFQAAgOACgOQACgOAFgOIAGgMIAHgLIAMgMIAJgGIAPgGQAGgBAGAAQALgBAJAGQAJAFAGAKQAEAIABAGQACAHAAAFIAAADQAAAEgCADQgBADgEACIgCABIgBAAQgEAAgCgCQgDgCgBgEIgBgLQgCgGgDgFIgDgCIgBAAIgBAAIgDAFIgFAIQgDAHgCAIQgCAJgBAMIgBAKIgBAMQAAAXAEAWQADAXAHATIAGALQADADAEACIADgGIADgLIADgMIADgQIACgEIADgCIACgBIACAAQAEgBADACQADACACAEIAAACIAAABQAAAHgCAJIgFAWQgDAJgGAIQgFAGgHAEIgFADIgHADIgHACIgGAAgAgWhhQgEAEgGAIQgEAHgCAEQgCAFAAAEIAAABIABACIADgCIACgEIADgHIAEgIIAFgHIAJgKIgBAAIgBAAQgCAAgFADg");
	this.shape_61.setTransform(15.775,-1.4);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#282E46").s().p("AgHByQgJgDgIgIIgGgHIgKgOIgHgPIgEgLIgEgOQgGgeAAgXQAAgYAFgTQAFgUAKgPQAOgTATgGIAIgDIAHAAIABAAQAMAAALAGQAKAGAIALIAEAHIADAJIACAMIABAKIABAVIABAUIAAAEQAAAFgCADQgCADgEABIgHABIgLAAIgZABIgMAAIACASIADAbIAEAQIAEAMIAFAHIAGAJIABAAIAAAAIABAAQADgDADgGQADgHADgKIAEgNIACgGIAEgDIAFgBQAEAAACACQADACACAEIAAABIAAABIAAABIgCALIgHAVIgEAJIgFAJQgHAHgJAEQgIADgLAAQgJAAgHgEgAAWgSIAJAAIAHAAIAAgDIgBgcIgCgVIgEgJIgFgHIgHgFIgEgCQgGAHgEAJQgDAJgCAJIgCAUIgBAUIAAABIAPAAIAKAAgAgYhfQgFAEgFAIIgFAJIgCAHIAAABIAAADIABABIAEgDIADgGIACgEIAGgLIAFgFIAGgIIAAgBIgBAAQgEABgFAEg");
	this.shape_62.setTransform(0.775,-1.525);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#282E46").s().p("AgVCbQgLAAgGgEQgIgDgDgHIgEgGIgDgIIgGgWIgDgUIgCgOIgCgSIgCgmIgBgeIABgrIAEgtIAFgXQAEgJADgHQADgFAEgEQAFgDAFAAIAHACIALAEIABAAIABAAIABAAQAJAAAIADQAJACAJAGQALAHAIAKQAIAKAFANIABAJIABAIQAAALgFALQgFAMgKAMIgOANIgJAGIAKAEIALAFIAKAGIALAKIAHAIQAPAVAAAbQAAAMgEAMQgFAMgKANQgFAHgHAGQgGAHgHAEIgKAFIgMAFQgSAGgHAAgAgEAVIACAnIAAAPIAAAWIACAVIAAAHIAAADIAAAAQALgDAJgGQAJgHAGgJQAPgTABgSQAAgSgJgOQgJgNgRgKIgNgHIgHgCIAAATgAgDhrIABAQIAAAQIgCApIAAADIAGgGIANgMQAHgIAEgIQAEgIAAgIQAAgGgDgHQgDgHgGgHIgMgKQgEgEgEgBIgDgBIACARgAgxiFIgFALIgDAKIgBAJIgBACIAAADIABAEIACACIABgCIACgFIACgQQABgIADgHIAAgEIABgDQgBAAgCAEg");
	this.shape_63.setTransform(-14.15,-4.875);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#282E46").s().p("AgHByQgJgDgIgIIgGgHIgKgOIgHgPIgEgLIgEgOQgGgeAAgXQAAgYAFgTQAFgUAKgPQAOgTATgGIAIgDIAHAAIABAAQAMAAALAGQAKAGAIALIAEAHIADAJIACAMIABAKIABAVIABAUIAAAEQAAAFgCADQgCADgEABIgHABIgLAAIgZABIgMAAIACASIADAbIAEAQIAEAMIAFAHIAGAJIABAAIAAAAIABAAQADgDADgGQADgHADgKIAEgNIACgGIAEgDIAFgBQAEAAACACQADACACAEIAAABIAAABIAAABIgCALIgHAVIgEAJIgFAJQgHAHgJAEQgIADgLAAQgJAAgHgEgAAWgSIAJAAIAHAAIAAgDIgBgcIgCgVIgEgJIgFgHIgHgFIgEgCQgGAHgEAJQgDAJgCAJIgCAUIgBAUIAAABIAPAAIAKAAgAgYhfQgFAEgFAIIgFAJIgCAHIAAABIAAADIABABIAEgDIADgGIACgEIAGgLIAFgFIAGgIIAAgBIgBAAQgEABgFAEg");
	this.shape_64.setTransform(-38.425,-1.525);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#282E46").s().p("AgyCWQgIgFgFgNIgCgHIgCgOIgBgdIgBhKIAAgHIAAgTIABgoIADgtIADgQIAFgNIAFgMIAFgIIAFgDIAGgBQAFABAGACIAPAGQACACACAGQADAFACAKIABAPIAAAOIAAABIAAAQIgBAVIAGgJQAIgIAIgGQAIgEAJAAIACAAQAGAAAFADQAFACAEAGQAFAGACATQADARAAAeIAAAsIgDBJIAAAbQAAADgBADIgFAEIgCAAIgBAAIgEAAQgEABgEgGIgBgJIgBgWIADhXIAAgJIAAgXQAAgugFgNIgCgBIgBAAQgHAAgGAGQgGAHgHAMQgEAIgDALIgGAYIgBAHIAAACIAAAjIgBAdIgCAsIgBAJIgDAJQgDAIgGADQgFAFgHAAQgNAAgIgHgAgtiEIgEAFQgDAIgCAJQgCAIAAAKIABADIABACQAAAAABgBQAAAAABAAQAAgBAAAAQABAAAAgBIABgEIADgUIADgOIADgHIgBAAIgBgBIgCAEg");
	this.shape_65.setTransform(-54.05,-5.5);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#282E46").s().p("AAACaIgGgDIgGgFIgEgGQgDgEgEgMQgEgLgEgTIgDgWIgBgTIgCghIgBgdQAAgeABgYIADgpIAEgOIAEgNIgRABIgWABIgBAAQgBAAAAAAQgBAAgBgBQAAAAgBAAQAAAAgBgBIgDgEIgBgCIAAgBIAAgBQAAgDACgCQACgDAEgBQAIgCAOgCIAggBIADAAIAEAAIARABIA2AAQAEAAADADQACACACAEIAAADQAAADgCADQgCADgFABIgoAAIAAABIACAVIABAQIAAABIgCAvIAAAeIAAAeIACAuIABAiIACAYIAAAFIAAAFIAAADQAAAEgDAFQgCAEgGAFQgDACgEAAIgJABIgGAAgAgQiBIgEALIgDAJIgBAKIAAACIABAFIACACIABgCIACgGIABgMIAFgTIAAgBIABgBIAAgBIgBAAIAAAAQgBAAAAAAQAAAAgBABQAAAAgBABQAAAAgBABg");
	this.shape_66.setTransform(-68.175,-5.125);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#282E46").s().p("AAmB5QgHgBgHgDIgEgEIgFgGIgDAFIgDACQgEADgEACIgIABIgJgBQgFgCgGgEQgIgGgFgGQgFgHgEgKQgEgKgDgOIgDgTIgBgRIAAgCIAAgCIAAgCIAAgBQAAgeAMgaIAEgHIAFgIQAIgHAEgCIAIgDIAGgBIACAAQAFAAAGACQAEADAFAFIABgTIACgKIADgLIADgJQADgGAEgEQADgDAEgBIABAAQAEABAFABIALAGIACADIACAFIADAQIABAQIgCBAIAAAPIAAAfIgBAXIAAAjIgCAIIgDAIIgEAEIgGAEIgCABIgDAAgAgTgwIgIAIIgFAIIgEAKQgEAKgBAJIgCATIAAAEIABAXIAEAUIADALIAFAKIADAFIAFAGIAFAFIAEACIAEABIADABQADAAADgFQADgDADgIIABgBIACgGIgBgWIAAgkIAAgTIgBgSIAAgHIgDgJIgDgIQgCgGgEgDQgDgDgEAAQgDAAgEACgAAshnQADAKAAAJIABALQAAABABABQAAAAAAABQAAAAAAAAQAAABABAAIACgDIABgDIAAgIIgCgLIgEgKIgCgBIgBAAIAAAAg");
	this.shape_67.setTransform(160.475,54.35);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#282E46").s().p("AgEB3QgEgBgEgDIgHgJQgDgEAAgDQgCgEAAgTIgBg1IAAgTIgBgOIAAgCIAAgBIABggIACgiQACgJAEgNIAEgKIAFgGIADgCIAFAAIAIABIALAGIADADIABAEQAEASAAANIAAABIgBAMIgBAdIAAALIAAAHIAAAPIAAAkIgBAZIAAAjQAAAGgGAKQgDADgDACQgEADgEAAQgEAAgEgCgAgLhlIgDAKIgCAKIgBAIIAAADIABACQABAAAAgBQAAAAAAAAQABAAAAgBQAAAAAAgBIACgGIABgGIABgJIACgGIACgGIAAgCIgBAAQgCACgCADg");
	this.shape_68.setTransform(149.925,54.25);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#282E46").s().p("AgMB3QgEgBgEgDIgGgHIgDgGQgCgFgBgSIgBgyIgIAAIgEgBQAAAAgBgBQAAAAgBAAQAAAAAAgBQAAAAgBgBIgBgBIAAgCIAAgBQAAgDACgCQACgCAEAAIAFgBIADgBIAAgIIAAgJIAAgJIABgzIACgNIABgHQACgGADgGIAHgKIAGgGIAEgCIAIgEIAJgBIAEAAQAJAAAIAEQAHAEAHAIIADAFIACAGIAAADIAAACIAAADQAAAIgCADQgCAEgEAAIgBAAIgEgCIgCgEIgBgBIABgEIAAgDIgCgFIgDgGIgEgEIgDgBQgFAAgCAgIAAAEIAAAGIAAAKIAAAQIAAAXIAAATIAAAAIAKAAIAKgBIAGABIADACIACACIAAAEQAAADgBACQgCACgEABIgSAAIgGABIAAAFIAAANIAAAeQAAAXgBAFQgCAGgDAEQgCAEgDACIgEABIgEABQgFAAgEgCgAgKhnQgDACgDAGIgDAKIgBAJIAAAEIAAABIACAAIABgDIADgJIACgJIADgHIAFgHIABgBIgBAAIAAAAQgDAAgDAEg");
	this.shape_69.setTransform(129.425,54.175);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#282E46").s().p("AgOBeQgIAAgHgGQgFgFgFgLQgCgDAAgIIgDgYIgBgPIAAgWIAAgQIAAgKIAAgNIAAgIIAAgQQAAgKADgHQADgGAGgDIACgCIAEgBIAEAAIACgBQAFAAAEADQAEADAEAFIABACIAAADIABAAQACgFAFgDIAKgFIAEAAIAEgBQAFAAAEACQAFADADAFQACACABAFIACAKIABACIAAACQAAAEgCACIgEADIgBAAIgBAAIgBAAQgEAAgCgBIgCgFQgBgJgCgEQgBgEgCAAQgFAAgGAGIgDAGIgCAGIgDANIgCAYIgBAFIAAAGIABA0IAAAjIgBAIQgBADgCABQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgHABgAghhRIgEAKIgCAIIgBAHIABAEIABAFIAAABIADgGIABgFIABgJIACgIIABgGIABgCIAAgBIgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQgBABAAAAg");
	this.shape_70.setTransform(95.4,57.2);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#282E46").s().p("AgOBeQgIAAgHgGQgFgFgFgLQgCgDAAgIIgDgYIgBgPIAAgWIAAgQIAAgKIAAgNIAAgIIAAgQQAAgKADgHQADgGAGgDIADgCIADgBIAEAAIACgBQAFAAAEADQAFADADAFIABACIABADIAAAAQADgFAEgDIAKgFIAEAAIAEgBQAFAAAEACQAFADADAFQACACABAFIACAKIAAACIAAACQAAAEgBACIgEADIgBAAIgBAAIgCAAQgDAAgBgBIgDgFQgBgJgCgEQgBgEgCAAQgFAAgGAGIgDAGIgCAGIgDANIgCAYIgBAFIgBAGIACA0IAAAjIgBAIQgBADgCABQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgHABgAghhRIgEAKIgCAIIAAAHIAAAEIABAFIAAABIADgGIAAgFIACgJIACgIIACgGIAAgCIAAgBIgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQgBABAAAAg");
	this.shape_71.setTransform(41.3,57.2);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#282E46").s().p("AAdBeQgFAAgEgBQgEgBgEgDIgIABIgFABQgHgBgGgBQgGgCgGgEQgMgHgFgOIgCgHIAAgHIAAgEQAAgUAOgRIAKgHIAJgEIAFgBIAGgBIABgKIAAgOIAAgLIgBgSQAAgHgBgCQgBgEgDAAIgEABIgEAFQgDAEgBAEQgCAGAAAGIAAAHIgBAEIgDACIgDABIgBAAQgDAAgCgCQgCgBgBgDIAAgDIAAgCIAAgIQAAgHACgHQADgHAFgHIAIgHIAGgDIAKgEIALgBIACAAQAHABAHADQAHADAGAGQAEAGACAJQACAJABANIgBA2IgBAcIABAZIAAAMIAAAHIgBAGIgEADIgFACIgGABgAACBJIgCgMIgCgPIAAgQIAAgOIABgHQgFABgKAHQgHAGgCAGQgDAIgBAJIAAABQAAAJAFAHQAFAGAIAEIAFAAIAEAAIAEAAIAAAAgAAbhMIACAEIACAFIABAHIACAJIABADIABAAIACgCIAAgEIAAAAQAAgGgCgGQgCgFgEgEIgDgDIgBAAIAAAAIABACg");
	this.shape_72.setTransform(29.9,57);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#282E46").s().p("AgEB3QgEgBgEgDIgHgJQgDgEAAgDQgCgEAAgTIgBg1IAAgTIgBgOIAAgCIAAgBIABggIACgiQACgJAEgNIAEgKIAFgGIADgCIAFAAIAIABIALAGIADADIABAEQAEASAAANIAAABIgBAMIgBAdIAAALIAAAHIAAAPIAAAkIgBAZIAAAjQAAAGgGAKQgDADgDACQgEADgEAAQgEAAgEgCgAgLhlIgDAKIgCAKIgBAIIAAADIABACQABAAAAgBQAAAAAAAAQABAAAAgBQAAAAAAgBIACgGIABgGIABgJIACgGIACgGIAAgCIgBAAQgCACgCADg");
	this.shape_73.setTransform(-7.875,54.25);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#282E46").s().p("AgRBdQgIAAgGgFQgIgFgFgKIgDgIIgDgLIgFgjQgCgTABgVIAAgJQgBgTACgOQACgOADgJIADgCIADgBIABAAIAEABIACADIABABIAAACQgDAiAAAYQAAAYABASQACAUAEAOQADAMAEAHQAEAFAFAAIABAAQAEABAEgIQADgHACgPIACgMIAAgTIAEhCQABgWABAAIADgKIAFgGIAFgDIAIgBIAEAAQAIAAAFADQAFADADAGIAFAMIAAAGIABAEIgBASIgDAuIAAAjIgBAXIgBAPQgBAFgBAEQgGAEgGAAIgCAAQgJAAgGgGQgGgHgDgNIgFAKIgDAHQgEAFgEADQgFACgHAAgAAohPIACAHIAAAEIABAOIABAHIABABIAAAAQAEgDAAgIQAAgFgCgFIgEgLIgBgBIgBgBIgBAAg");
	this.shape_74.setTransform(-19.1,57);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#282E46").s().p("AgOBeQgIAAgGgGQgHgFgEgLQgCgDgBgIIgCgYIAAgPIAAgWIAAgQIAAgKIAAgNIAAgIIAAgQQgBgKADgHQADgGAFgDIADgCIAFgBIACAAIAEgBQAEAAAEADQAEADAEAFIABACIABADIAAAAQACgFAFgDIALgFIADAAIADgBQAGAAAFACQAEADADAFQACACABAFIACAKIAAACIAAACQAAAEgBACIgFADIgBAAIgBAAIgBAAQgCAAgDgBIgDgFQAAgJgBgEQgCgEgDAAQgFAAgFAGIgDAGIgCAGIgDANIgDAYIAAAFIgBAGIABA0IABAjIgBAIQgBADgCABQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAgBAAIgGABgAghhRIgEAKIgCAIIgBAHIABAEIACAFIAAABIACgGIAAgFIACgJIABgIIADgGIAAgCIAAgBIgBAAQAAAAgBAAQAAAAAAAAQgBABAAAAQgBABAAAAg");
	this.shape_75.setTransform(-31.1,57.2);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#282E46").s().p("AgmBzQgHgEgEgJIgBgGIgBgLIgBgWIAAg5IgBgGIAAgNIABgfIACgjIADgMIADgKIAEgJIAEgGIAEgDIAEAAQAEAAAFABIALAGQACABACAEQACAFABAHIABAMIAAAKIAAAAIAAANIgBARIAFgHQAGgIAGgDQAHgDAGAAIACAAQAEAAAEACQAEACADAEQAEAFACAOQACANAAAXIgBAiIgCA4IABAVIgBAEIgEADIgBABIgBAAIgEAAQgDAAgDgEQgBgBAAgHIAAgQIAChDIAAgIIABgRQAAgjgFgKIgBAAIgBAAQgFAAgFAEQgFAFgFAJIgFAQIgFASIgBAEIAAADIAAAbIgBAWIAAAiIgBAGIgDAHQgCAGgFADQgEAEgGAAQgJgBgGgFgAgjhlIgCADIgEAOIgCANIAAADIABACIADgDIABgEIACgPIACgKIADgFIgBAAIgBgBIgCADg");
	this.shape_76.setTransform(-61.275,54.25);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#282E46").s().p("AABB2IgFgCIgFgEIgEgEIgEgNIgHgWIgCgSIgBgPIgBgZIgBgVIABgqIADggIACgLIADgKIgNABIgRABIgBAAIgDgCIgDgDIgBgBIAAgBQAAgBABgBQAAAAAAgBQAAAAAAgBQABAAAAgBIAEgCQAHgCALgBIAYgCIADAAIADAAIANABIApABQADAAACACIADAEIAAACQAAADgCACQgBACgDABIgfAAIgBAAIACARIABANIAAABIgCAkIAAAWIAAAXIACAkIAAAaIACATIABADIAAAEIAAACQAAAEgDADIgGAHIgGACIgGABIgEgBgAgMhiIgDAHIgCAHIgBAIIAAABIABAEIABACIABgBIABgFIABgKIAEgPIABAAIAAgBIAAgBIgBAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBABAAABg");
	this.shape_77.setTransform(-72.15,54.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33,p:{x:96.125}},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26,p:{x:195.6472}},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23,p:{x:223.775}},{t:this.shape_22},{t:this.shape_21,p:{x:-77.5528,y:104.575}},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18,p:{x:-40.9028,y:104.575}},{t:this.shape_17},{t:this.shape_16,p:{x:-18.4028,y:104.575}},{t:this.shape_15},{t:this.shape_14,p:{x:4.875,y:101.675}},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5,p:{x:120.875,y:104.225}},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2,p:{x:151.6972,y:104.575}},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_77},{t:this.shape_76},{t:this.shape_26,p:{x:-49.2528}},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_21,p:{x:1.6972,y:57.325}},{t:this.shape_23,p:{x:13.025}},{t:this.shape_72},{t:this.shape_71},{t:this.shape_18,p:{x:51.5972,y:57.325}},{t:this.shape_14,p:{x:70.025,y:54.425}},{t:this.shape_33,p:{x:83.175}},{t:this.shape_70},{t:this.shape_16,p:{x:105.6472,y:57.325}},{t:this.shape_2,p:{x:117.6472,y:57.325}},{t:this.shape_69},{t:this.shape_5,p:{x:140.775,y:56.975}},{t:this.shape_68},{t:this.shape_67}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-151.8,-28.6,383.6,157.2);


(lib.think_bubble = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgjAwQgkgZgFggQgCgUAJgOQAJgOARgGQAJgEAKgBQAcgCAaARQAZARAOAbQAOAbgKAXQgKAXggAEIgIABQgdAAgdgVg");
	this.shape.setTransform(-159.224,9.0415,0.9999,0.9999);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAVB7QgpgHgogcQgngbgUglQgWgnAKgmQAKgjAagTQAvggBIAcQBIAcAZA5QARAlgEAmQgEAqgeATQgYAPgfAAQgLAAgNgCg");
	this.shape_1.setTransform(-137.7834,-10.0088,0.9999,0.9999);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Al2NBQg/gVgvgqQg2gwgYhKQgVhAADhPQAAgEgDgCQgDgDgEABIhGAUQgpAKghgBQhTgDhJgoQhDgkgtg2Qgxg6gOhEQgUhkAchfQAQg2AWghQACgEAKgKIAPgQQAIgKgDgDQg3gsgehFQgdhDAEhHQADgqAPgpQAPgoAbghQAPgSARgPQAtgnBEgWQA6gSBFgDQB/gIAbASQAEADADgCQAEgCABgEQAah9B5hRQB1hOCGALQB+ALBwBRQBqBMBFB2QAFAHAIABQAJAAAFgHQBQhuCVgjQCQgjCFAzQBkAlA8BNQAmAwAUA7QAVA7AAA+QAAAlgOA5QgTBLgdACIgBABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAABAAQA6AdAsA0QAsA0ASA9QAcBegkBhQgjBfhRA6QguAggiAIQgXACgMADQgVAFgCAQQgKCEhdBsQhbBqiCAlQh9AkiHghQiCgghnhWQgGgFgDAFQhIBNgjAaQg/AthLAEIgUABQg3AAg0gRg");
	this.shape_2.setTransform(25.7208,5.1627,1.3509,1.1513);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-166.9,-92.7,341,195.7);


(lib.sl3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ACFDjQgJgfgSgvQgihYgqhNQgshSg0hIQgSgZgSgWIgPgSQgpg0ACgCQABgBAOANQAQAPAQAUIAPASIAkAwQA2BKArBSQAsBPAhBXQASAuAJAgQAIAZAEAVQAEATgCABIAAAAQgEAAgUg/g");
	this.shape.setTransform(32.4818,48.2183);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#48848A").s().p("AAfCeQgrhGhIhiQhShtgog3QgegrgQgaQgXgogKgkQgMgqAFgoQAEgsAYggQAdgmAygOQAwgOAyAMQBUAUBLBXQBrB6AyDDQAUBOAMBgQAJBFAIBtQACAfALBIQAHBBgHAkQgFAZgsAYQg5AegKAKQgTiyh9jKg");
	this.shape_1.setTransform(29.4261,53.7855);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,58.9,107.6);


(lib.sl2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjaIWQgCAAADgiQABgkAIgvQAIg6AUhWQAjicA+iWQA/iZBTiHQAuhLAjgvQAagkAZgdQAXgaABABQACABgUAcIgxBDQgjAvguBKQhUCLg8CUQg+CVgkCcQgTBVgIA6IgMBSQgGAhgCAAIAAAAg");
	this.shape.setTransform(31.0644,66.1749);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#48848A").s().p("AjLjxQAtiCA0hWQBEhvBag5QBcg6BOASQAzALAmArQAkAoALA2QABBQgGAnQgJA+geA0QgZAug8A8QhFBCgeAgQhGBKggAlQg1BBgjA5Qg+BngxCoQgIAdgUBZQgYBpAFAAQhLgEhAAbQANn6CNmVg");
	this.shape_1.setTransform(35.85,67.0618);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,71.7,134.1);


(lib.sl1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjuDLQgCgBAHgSQAHgVAMgVIALgTQAOgZASgZQAxhIBIg8QBGg8BPgmQAsgVAggKQAXgIAVgEQATgDABACQAAACgSAGIgrAPQgfAJgrAWQhOAkhGA8QhGA7gxBHQgRAYgOAZIgLATIgWAoQgIAQgCAAIgBAAg");
	this.shape.setTransform(34.7521,41.2914);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#48848A").s().p("AmAE/QAaj2BpinQA7hgBVhEQBahHBmgbQBsgdBSAhQAuATAfAmQAhAoACAvQADAxgfAvQgbAqguAfQgjAXg4AWQhAAYggAOQh1AyhkBUQhjBUhGBtQg5gMgmgog");
	this.shape_1.setTransform(38.4884,37.0718);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,77,74.2);


(lib.pot_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E1A290").s().p("AjyGMQhpgggbhIQgwiAAskvQAOhfAWhlIAThTIKCAAIAVBdQAZByAPBlQAwFDhDBPQgnAvhuAkQhrAih6AIQgdACgbAAQhgAAhJgXg");
	this.shape_2.setTransform(40.0107,41.8627);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,80,83.8);


(lib.l5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AC5EyQgPgqgag+Qgwh0g8hqQg9hvhHhhIgwhBIgUgYQg3hGABgCQACgBASATQAVAVAVAbIAUAYQAYAfAZAiQBKBoA6BpQA+BtAvByQAaA+AOArQAMAgAHAdQAHAZgCABIAAAAQgDAAgehUg");
	this.shape.setTransform(45.6369,60.0339,1.0065,1.0055);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5D999D").s().p("AE0IJQgRgIgfg6IgrhMQgyhDg+hDQhchkibiLQg8g1gagaQgugugcgrQgig0gOg4QgPg8AMg3QAOg6AugpQAvgrA5ABQA5AAA3AsQApAhArA9QB2CiBUC4QBJCeAtCqQBADxg9AAQgKAAgMgGg");
	this.shape_1.setTransform(36.1596,52.8518,1.0068,1.0059);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.1,72.4,106);


(lib.l4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ACYFGQg6iqhLijQgthng/h4Ig3hiQgshPADgCQACgBAPAWQAPAXASAgIA2BjQBAB3AtBnQAvBmAwB/QAYA/APArQALAiAIAbQAHAagCAAIAAAAQgEAAgehUg");
	this.shape.setTransform(36.314,62.5,1.0065,1.0055);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5D999D").s().p("ADBHXIg9hzQhPh7hQhqQhBhUgfgrQg3hJghg8QhZiiATiQQALhUAxghQAbgRAjAAQAhAAAfAPQAyAYAvA/QBSBqA1CdQAlBsAmC2QAbCHAfCuQAOBWABAJQAEA9gYAbQgigdgmhKg");
	this.shape_1.setTransform(28.6864,57.6588,1.0068,1.0059);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.1,57.4,115.6);


(lib.l3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AlaFtQgCgBAMgbQAPggATggQAZgtAshAQBMhwBlhqQBjhoBuhTQAmgdAlgZIAegUQAfgVAfgPQAbgOABACQABACgZAQIg9AnIgdATQglAZgmAdQhuBThiBnQhhBlhPB0QgrA/gZAtIgkA+QgPAZgCAAIAAAAg");
	this.shape.setTransform(35.0664,51.1301,1.0065,1.0055);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5D999D").s().p("Al/DBQArhxBXiAQBQh3BrheQBrhgB+g/QBIgjAxgDQAigCAeALQAgANASAYQAkAxgUBZQg2DnkyC/QhQAzigBiQiKBXheBMQgehuA9idg");
	this.shape_1.setTransform(42.7461,46.0784,1.0068,1.0059);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.2,85.6,92.5);


(lib.l2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AkqFaQgCgBALgZQANgcARgfQAVgpAmg6QBGhuBShdQBUhjBfhSQAhgcAggZIAZgUQAbgVAbgQQAXgOABABQABACgVARIg0AoIgZATQggAZggAcQheBRhUBiQhRBchHBuQglA6gVApIggA5QgNAXgDAAIAAAAg");
	this.shape.setTransform(31.9745,51.7384,1.0065,1.0055);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5D999D").s().p("AkyBcQBJi8BsiTQBDhdBOg4QBchBBhgFQApgDAkALQAoANAYAbQAlApgEBCQgDA3gdA9QgzBphfBhQhNBOh1BVIjECSQh8BbhJA1QgEiiBQjSg");
	this.shape_1.setTransform(38.4683,46.4667,1.0068,1.0059);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.1,-0.2,77.19999999999999,93.3);


(lib.l1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjbI0QgCgBAIgiQAIglANguQAQg7AahXQA1ivA2iOQA8ilBFiPQAZgzAZgvIATglQAXgrAVgfQATgeACABQACABgRAfIgpBMIgTAlQgZAvgZAzQhGCTg7CgQg1CNg1CuQgaBYgQA6QggB0gFAAIAAAAg");
	this.shape.setTransform(25.333,74.4811,1.0067,1.0058);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#5D999D").s().p("AksK0QgcgLAEhJQAJhQABgRQARjbAvjdQA1j4BbjvQAdhJAXgrQAhg+ApgnQAegdAigPQAmgRAlADQArADAlAfQAjAcAVArQBTCliQEQQhFCEiUDeQigD1g9BsQgJAPggBFQgbAzgVAAIgHgBg");
	this.shape_1.setTransform(32.8033,69.7541,1.0073,1.0063);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,65.6,139.5);


(lib.hello2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DC918D").s().p("ABgBaQgcgIgqgjQgJgIgTgBQgPgBgRADIgsAHIgzAFQgOABgZgCIgugFQAJgmACgnQBogBAkgMQAbgJA7gaQAxgTAMAJQAoAfAtAuQBCBDgdAIQgSAFhUhGQBLBCgKAMQgKAJgmgXQgfgTgagYIAmAlQAaAZgBABQgEALgNAAQgGAAgIgDg");
	this.shape.setTransform(21.47,9.2667);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,43,18.5);


(lib.hello1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DC827C").s().p("AgUAVQgMgCgKgDQgLgDAUABQAfgBAPgFQAZgIAIgUQABAWgXAMQgPAHgRAAIgMAAg");
	this.shape.setTransform(206.4022,54.8938);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#DC918D").s().p("AAVA8QgNgggQgXQgng1gZgJQABgGAFgFQAGgGAHgBQAYAAAYAQQALAHAHAIIAHAHIAQALQAVAOAKAWQAKAYgIAYIAAABQgGARgSAAQgSAAgGgQg");
	this.shape_1.setTransform(194.7107,48.6992);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DC918D").s().p("AhEBsQAShlgchKIgGgOQAegcAigKQArgOAuAVIAJADQAMALgKBXQgFAvgNBag");
	this.shape_2.setTransform(203.3599,55.382);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#DC918D").s().p("AgIBBQgcgDgQgWQgQgWADgaQAEgbAWgRQAWgQAaADQAbAEARAWQAQAWgEAaQgDAbgWARQgSANgVAAIgJgBg");
	this.shape_3.setTransform(203.0576,67.0584);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#DC918D").s().p("AAMBKQgMgCgCgMQguiGAOAAQAOAAA4B2QADAGgBAHQgBAGgEAFIgBAAQgGAHgJAAIgFgBg");
	this.shape_4.setTransform(197.7387,38.7284);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#DC918D").s().p("AgLBVQgGgFAAgIQgChCAAghQAAg9ANgBQAJgBAHA/IAJBgQABAIgEAGQgFAGgIABIAAAAIgCAAQgGAAgGgFg");
	this.shape_5.setTransform(203.9049,36.5569);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#DC918D").s().p("AgNBIQgGgCgCgEQgDgFACgFIAYhSQASg1ADAIQAGAWgaBwQgBAFgEADQgEACgDAAIgEgBg");
	this.shape_6.setTransform(208.5377,37.1317);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#DC918D").s().p("AgdAvIAAAAQgFgEAAgFQgBgGAEgEQAXgeARgXQAbggAAAJQAAAGgrBVQgDAGgHABIgDABQgFAAgEgEg");
	this.shape_7.setTransform(212.3973,41.12);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(187.5,27.6,28.5,46.1);


(lib.h3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DC827C").s().p("AgDAdIgYgRIANgIQAJgFAJgNIARgZQABAggQATQAgAagOABQgNgCgOgIg");
	this.shape.setTransform(31.7996,47.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#DC827C").s().p("AABAXQgogDgWgqIAQALQAeAUAYgCQAagBAbgZQgRAqgnAAIgFAAg");
	this.shape_1.setTransform(32.825,58.8843);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("AAAAVQgGAAgEgGQgFgHAAgIQABgIAFgGQAEgGAFAAQAHAAAEAGQAEAHABAHQgBAJgFAGQgEAGgGAAIAAAAg");
	this.shape_2.setTransform(22.75,44.7769);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282E46").s().p("AgKAOQgEgGgBgIQABgIAFgGQAEgGAGAAQAGABAEAFQAFAHAAAIQgBAIgFAGQgEAGgGAAQgGAAgEgHg");
	this.shape_3.setTransform(44.95,45.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#282E46").p("AAcADQgFgDgKgBQgUgDgYAG");
	this.shape_4.setTransform(34.08,38.7245);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#282E46").p("AhbgBQAAAlAaAbQAaAcAmAAQAlABAbgaQAcgaAAgmQABglgagcQgagbgmgBQglAAgcAaQgbAagBAmg");
	this.shape_5.setTransform(22.7514,43.6514);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#282E46").p("AhagBQgCAlAbAbQAaAcAmAAQAlABAcgaQAbgaABgmQABglgbgcQgagbgmgBQglAAgbAaQgbAagBAmg");
	this.shape_6.setTransform(45,44.1513);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F09893").s().p("AgjAdQgRgJgBgPQgBgNAOgMQAPgMAWgDQAWgCARAJQAQAJACAOQABAOgOAMQgPAMgXACIgIABQgQAAgOgHg");
	this.shape_7.setTransform(48.0038,53.3581);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F09893").s().p("AgBAjQgXgBgPgMQgPgLABgOQABgPARgJQARgJAUABQAXACAPAMQAPALgBAOQgBAOgRAKQgNAIgSAAIgGgBg");
	this.shape_8.setTransform(19.95,52.7567);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#282E46").p("AAdACIg5gD");
	this.shape_9.setTransform(10.7,41.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#282E46").p("AgcACIA5gD");
	this.shape_10.setTransform(56.975,41.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#DC827C").s().p("AAAgGQAEgBAEAAIAAALQgHgDgEADIgEAEQABgKAGgEg");
	this.shape_11.setTransform(57.4,46.4188);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#DC827C").s().p("AgFAAQAAgFAFAAQAGAAAAAFQAAAGgGAAQgFAAAAgGg");
	this.shape_12.setTransform(58.225,46.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F2A79F").s().p("AgYAhQgLgOAAgTQAAgSALgOQAKgOAOgBQAPABAKAOQALAOAAASQAAATgLAOQgKAOgPABQgOgBgKgOg");
	this.shape_13.setTransform(57.725,46.4);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#DC827C").s().p("AgHAEIAAgLIAHABQAHAEABAKQgEgIgLAEg");
	this.shape_14.setTransform(9.725,46.575);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#DC827C").s().p("AgFAAQAAgFAFAAQAGAAAAAFQAAAGgGAAQgFAAAAgGg");
	this.shape_15.setTransform(8.925,46.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#F2A79F").s().p("AgYAhQgLgOAAgTQAAgSALgOQAKgOAOgBQAPABAKAOQALAOAAASQAAATgLAOQgKAOgPABQgOgBgKgOg");
	this.shape_16.setTransform(9.425,46.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#282E46").s().p("AkLCRQgJgngGgJQgTg5A8hNQAwg+BMgyQAwghBPgGQBXgGBEAfQBQAjAdBOQAhBagsCJQgVgVABhQIAGhMQgWAQgjACQhGADhChHQgtgwhIgGIhBAEIgXBPQgQAmgrAUQgTAJgCBJQAAAlADAiQgcgJgNgkg");
	this.shape_17.setTransform(32.6456,25.2937);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#DC827C").s().p("AimAtIAHhoQBNA9BCAFQBTAHBkhLQgkAsg7AjQhIAshKAAQguAAgugRg");
	this.shape_18.setTransform(33.775,75.0573);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F2A79F").s().p("AjHHKIAklwQgrgrgVhZQgPg/AAg0QgEg9AAgSQAAguAIgdQAfhqA+g0QBAg2BigBQBFAAA2AlQA1AkAdA+QATAnAFA0QADAmgMCOQgHBPgfBBQgTApgSAUIA4FrQguAphMAVQguANgtAAQhnAAhlhDg");
	this.shape_19.setTransform(34.2119,60.1247);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#282E46").s().p("AkPC0QhDgvgMhRQgLhFAfg5QANgXAdgWQAbgVAYgIQAPgGAHgcQAHgiAagWQAjgdAvAGQAaADAoANQAsAMAzgWQA4gZAyAFQBbAKAmBLQAdA6gNA1QgHAaAXAiQAaAmAAAaQAAAmgqAvQggAlgnAZQhvBHhbALQgWADgVAAQiDAAiIhhg");
	this.shape_20.setTransform(35.3675,27.6928);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#282E46").s().p("AgBAfIgIgGQgFgGgEgHIgIgWQgBgBAAAAQABgBAAAAQAAgBAAAAQABAAABAAQAAgBAAAAQABAAAAABQABAAAAAAQAAABABAAQAMAfAKAGQAFACAEgCIACgBQAPgLgNgqQgBgBAAgBQABAAAAgBQAAAAABAAQAAgBABAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABQAHAPABAQQACANgHAMIgBABQgFAIgIAAQgFAAgEgDg");
	this.shape_21.setTransform(44.9665,44.4366,1,1,14.9983);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#282E46").s().p("AgBAfIgIgGQgFgGgEgHIgIgWQgBgBAAAAQABgBAAAAQAAgBAAAAQABAAABAAQAAgBAAAAQABAAAAABQABAAAAAAQAAABABAAQAMAfAKAGQAFACAEgCIACgBQAPgLgNgqQgBgBAAgBQABAAAAgBQAAAAABAAQAAgBABAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABQAHAPABAQQACANgHAMIgBABQgFAIgIAAQgFAAgEgDg");
	this.shape_22.setTransform(22.6335,44.0366,1,1,0,-14.9983,165.0017);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_22},{t:this.shape_1},{t:this.shape},{t:this.shape_21}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,70.8,112.6);


(lib.h1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AgMAaQgIgJgDgOQgBgGgBgSQAAAAABAAQAAgBAAAAQAAAAABAAQAAgBABAAQAAAAABABQAAAAABAAQAAAAAAABQAAAAAAAAQAGAyARgHQARgGgBgtQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQABAAAAAAQAAAAABAAQAAABAAAAQAAAAAAABQADARgDAOQgCAQgLAJQgFAFgGAAQgGAAgGgGg");
	this.shape.setTransform(53.5599,33.4615,1,1,-14.9983);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AgBAfIgIgGQgFgGgEgHIgIgWQgBgBAAAAQABgBAAAAQAAgBAAAAQABAAABAAQAAgBAAAAQABAAAAABQABAAAAAAQAAABABAAQAMAfAKAGQAFACAEgCIACgBQAPgLgNgqQgBgBAAgBQABAAAAgBQAAAAABAAQAAgBABAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABQAHAPABAQQACANgHAMIgBABQgFAIgIAAQgFAAgEgDg");
	this.shape_1.setTransform(40.5994,37.0938);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("Ai+A1QgBhvCDg9QCCg9BKAzQAlAaAKAmQgOAJgZACQgyAEgygjQgfgXgxARIgsAVQAHBGghATIgXALQgLAGAAANQAAAagQAqQgIAVgIAPQgagsAAg4g");
	this.shape_2.setTransform(29.5249,27.5388);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#DC827C").s().p("AgIgFIAHAAQAHABAEAKQgHgHgJAHg");
	this.shape_3.setTransform(11.65,46.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#DC827C").s().p("AgFABQgBgFAGgBQAFgBABAFQACAGgHABIgBAAQgEAAgBgFg");
	this.shape_4.setTransform(10.8164,46.7158);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F2A79F").s().p("AgQAmQgNgLgFgTQgEgSAHgQQAHgPAPgEQANgDANALQANALAFATQAEASgHAPQgHAQgPADIgGABQgKAAgKgIg");
	this.shape_5.setTransform(11.3,46.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#282E46").ss(0.9).p("ABuhBIi3BFQgLAEgKAKQgSAVAKAd");
	this.shape_6.setTransform(20.4738,42.4002);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#282E46").ss(0.9).p("AgLAFIAFgFQAHgFANAE");
	this.shape_7.setTransform(46.6557,31.5719);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#DC827C").s().p("AAIAXQgCgLADgOIgEgBQgTgFgOgRIAXAGQANACAJgBIAMgDIgHAdQgGASgFAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAgBgBg");
	this.shape_8.setTransform(51.025,40.4709);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#282E46").ss(0.8).p("Ag3AUQANAkAZASQAYATAXgIQAYgIAHgfQAIgfgNgiQgNgjgZgTQgZgTgXAIQgXAIgIAfQgHAfANAig");
	this.shape_9.setTransform(54.4616,32.4628);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#282E46").ss(0.9).p("AhKAVQAKAkAdATQAdAUAegJQAfgIAPggQAPgggKgjQgKgkgdgTQgdgUgeAJQgfAIgPAgQgOAfAJAkg");
	this.shape_10.setTransform(39.287,37.025);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F09893").s().p("AgWAfQgPgEgEgMQgEgLAJgMQAKgMARgHQARgGAPAEQAPADAEAMQAEALgJAMQgJANgSAGQgKAEgLAAIgLgBg");
	this.shape_11.setTransform(42.0273,44.7351);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#DC827C").s().p("AgrANQgMgJAAgBQABgBAPAEQAhAJAVgHQAZgHAQgbQgBAmgjAMQgLADgKAAQgVAAgVgOg");
	this.shape_12.setTransform(51.624,47.5862);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#DC827C").s().p("AgWgHIhHgzQAxAMBDgCQAjgCAYgDIAMBwQgmgNhOg1g");
	this.shape_13.setTransform(43.025,77.825);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F2A79F").s().p("AjoHHIAOoDIgTh5QgKhdAMhGQAQhcA0goQAtgiA8gHQBYgKBMAyQBLAyAdBVQApB7gFBcQgHB9hfAwIAoGRQgSAng8AVQglAMguAAQhnAAiUhAg");
	this.shape_14.setTransform(37.2723,67.8189);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#282E46").s().p("AjCDrQg/g6gIhrQgJh3BUg+QAJgHAGgcQAHgfAUgWQAbgdAkAFIAzARQAWAIAUgTQAKgIAbglQA0hFA4AJQB2ARgFBzQgCA9ggBYQgFAZARAhQAUAmAAAaQAAAlggAvQgZAkgdAZIhAA0QgqAegmAKQgWAGgVAAQhYAAhhhZg");
	this.shape_15.setTransform(26.6666,32.4185);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#282E46").s().p("AhCAgIgCAAIgBgBIgCAAIgBgBIgCgBIgBgBIgBgBIgBgBIgBgCIgBgBIAAgCIgBgBIAAgCIAAgCIAAgBIAAgCIABgCIAAgBIABgCIABgBIABgBIABgBIABgBIACgBIABgBIACgBIABAAIACAAIACgBIABABIACAAIACAAIABABIACABIABABIABABIABABIABABIABABIABACIABABIAAACIABACIAAABIAAACIgBACIAAABIgBACIgBABIgBACIgBABIgBABIgBABIgBABIgCABIgBAAIgCABIgCAAIgBAAIgCAAgABAAAIgCAAIgCAAIgBgBIgCgBIgBgBIgBgBIgBgBIgCgCIgCgDIAAgCIgBgCIAAgBIAAgCIABgCIAAgBIABgCIABgBIABgCIABgBIACgCIADgCIABAAIACgBIACAAIABAAIACAAIACAAIABABIACAAIABABIACABIABABIABABIABABIABACIABABIAAACIABABIAAACIAAACIAAABIAAACIgBACIAAABIgBACIgBABIgBABIgBABIgBABIgCABIgBABIgCABIgBAAIgCAAIgCAAIgBAAg");
	this.shape_16.setTransform(48.975,35.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_16}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,61.9,119.8);


(lib.handRegular = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F2A79F").s().p("ABEB8QgngTgqgpQgDgCgHABQgOABgUALQgVALhrgNIhogOIAqhoIAmAEQAnAFAKAAQADAABwg2QBqgzAMAJQBaBAAdAXQBlBNgEASQgFAWgpgSQgegNgqgfIARAOQBAA4gRAPQgRAQhFgzIgygpIAtAmQA4A1gTAOQgTANhAg0Ig8g2IArAtQApAugIAJQgDAEgIAAQgMAAgXgLg");
	this.shape.setTransform(28.9576,13.4917);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,57.9,27);


(lib.clickHands2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F2A79F").s().p("ABCBuQgngUgrgpQgDgBgHAAQgNACgVAKQgUALhsgMIhngPIAqhoIAlAFQAoAEAJAAQAJAABUgbICEgpQAVgGBtA4QBuA6gKAQQgDAEgJADQgOAEgZgEQgLgBgQgHQgRgFgNgJQgQgOgYgJQgVgHgEgCQAOAMAeAVIA0AzQAbAfgJAIQgSAQhOg7QA9A6gTANQgbAThrhmQBOBOgLAMQgEAFgIAAQgMAAgWgLg");
	this.shape.setTransform(29.2457,12.0704);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,58.5,24.2);


(lib.arrow = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AidDjQiygeh+h3QgZgYgkg5IgIgNQgJgOgEgaIgHghIA1gdIAYAZQAPAOAJAMQAxBDBHArQBHArBmAYQA5AOBAgNQCtgjCFhnIgSAHQgWAIgkgCQgPgBgMgLQgNgMgDgOQgDgPAKgPQAJgQAOgFQApgMAvgYQAdgPA4ghIA5ggQAhgSAZAJQAYAIAOAeQAtBngDB3QAAALgMAOIgEAEIgNAPIgTgHQgigNgRgeQgJgSgIglIgBgCQi4DUkyAwQgUADgVAAQgaAAghgFg");
	this.shape.setTransform(0.0263,0.0012,0.9999,0.9999,90.0009);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.2,-55,46.5,110.1);


(lib.allison_name = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AgGC1QgHgCgFgFIgLgNQgEgGAAgFQgDgFgCgdIgBhRIAAgeIAAgVIAAgCIgBgCIACgwIAEg0QACgOAFgSQAEgLADgGQAEgGADgDIAGgCIAGgBQAFAAAIACQAIADAJAGIADAEIADAHQAFAbAAAUIAAABIAAASIgCAsIAAARIAAAKIAAAXIAAA4IgBAlIgCA1QAAAJgHAPQgFAGgGADQgFADgHgBQgFAAgGgBgAgRiYIgFAOIgDAPIgBAMIABAFIABACQAAAAABAAQAAAAABgBQAAAAAAgBQABAAAAgBIACgKIACgIIADgOIABgKIADgKIAAgBIAAAAIgBAAQgDABgDAHg");
	this.shape.setTransform(81.9,31.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AgICFQgKgEgKgJIgHgIIgLgQQgFgJgDgJIgFgNIgFgQQgGgjAAgbQgBgcAGgXQAGgWALgSQAQgVAXgIIAJgDIAIgBIACAAQAOAAAMAHQALAHAKAOIAEAHIADAKIADAQIABAKIACAZIAAAXIAAAFQAAAFgCAEQgCAEgFABIgHABIgOABIgdAAIgNABIACAUIADAhIAFASIAFANIAFAJIAIAJIAAABIABAAIAAAAQAFgDADgIQAEgHADgMIAEgPIACgHIAFgEIAGgBQAEAAADACQAEADABAEIAAACIAAABIAAABIgCAMIgHAaIgFAKIgHAKQgHAIgKAEQgKAFgMAAQgLAAgIgFgAAZgWIALAAIAIABIAAgDIgBgiQgBgOgCgKIgEgLIgGgIIgIgFIgEgDQgHAJgFAKQgEAKgCALIgCAXIgBAYIAAABIARgBIALAAgAgchvIgMAOIgGALIgCAIIAAABIABADIABABIAEgDIADgHIADgFIAHgMIAFgGIAIgJIgBgCIgBAAQgFACgFAEg");
	this.shape_1.setTransform(67.6731,36);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("AAkCxIgGgGIgGgIIgGAGIgFAEQgFAFgGACQgGACgGAAQgHAAgIgDQgHgCgJgFQgMgKgIgKQgHgKgGgPQgGgPgFgVQgDgOgBgOIgCgbIAAgEIAAgCIAAgCIAAgDQAAguATgoIAFgKIAIgLQALgKAHgDQAGgEAGgBQAFgCAFAAIACAAQAIAAAIAEQAHAEAHAHIADgdQABgLABgEIAFgRIAFgNQAEgKAFgFQAFgGAGAAIACAAQAGAAAHADIARAJIADAEQACADABAEIAEAZQACANAAAMIgDBgIAAAYIABAvIgCAjIgBA1QAAAFgCAFQgBAGgEAHQgDAFgEADQgDADgFABIgDABIgFABQgKAAgLgGgAgdhJQgGAEgHAHIgHAMIgGAPQgEAQgDAPQgCAOAAAOIAAAFQAAATABARIAGAfIAFAPQACAIAEAIIAFAIIAHAJIAIAHIAGADIAGACIAEAAQAFAAAFgFQAEgGAFgLIABgDIADgHIgBgjIAAg3IAAgdIgBgbQAAgKgBAAIgEgPIgFgLQgEgJgEgFQgFgEgGAAQgFAAgGADgABCigIAAADQAFAQAAANIABARQACAFABAAQABAAAAAAQABgBAAAAQABAAAAgBQAAAAABgBIABgGIAAgLQAAgJgCgIQgDgIgDgHIgEgCIgCAAg");
	this.shape_2.setTransform(48.55,31.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282E46").s().p("Ag6CvQgKgGgGgPIgCgIIgCgRQgBgEAAgdIAAhWIAAgJIgBgWIABgvIADg0IAFgTIAEgPIAGgOIAHgJIAFgDIAHgBQAGAAAHADIAQAIQAEABACAHQADAGABAMIADARIAAAQIAAABIAAATIgBAZIAGgLQAKgKAKgGQAJgEAKAAIACAAQAHAAAGACQAFADAGAHQAGAHACAVQADAVAAAjIgBAzIgDBWIABAeQAAAEgCADQgCADgEACIgCABIgBABIgEAAQgFAAgFgIIgBgKIgBgZIAEhmIAAgLIAAgbQAAg0gHgQIgBgBIgCAAQgIAAgHAHQgHAHgHAPQgFAJgEANIgHAdIgBAHIgCADIAAApIAAAiIgBAzIgCAJIgDALQgEAJgGAFQgHAEgIAAQgOABgKgIgAg1iaIgDAGQgFAJgCALQgCAKAAALIABAEIABACIADgEQACgCAAgEIADgWIADgQIAEgIIgBgBIgBAAIgDAEg");
	this.shape_3.setTransform(28.2,31.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282E46").s().p("AAJCKQgJAAgHgDQgKgDgIgGIgKgKIgGgGQgGgJgEgKQgFgJgEgMQgFgVgDgUQgDgUAAgTIAAgFQAAgQADgQQADgRAFgQIAHgOIAJgOIAMgNIALgHQAKgFAHgCQAIgCAHAAQAMAAALAGQAKAGAHAMQAFAJABAHQACAIAAAHIAAACQAAAGgCADQgCAEgEACIgDABIgBAAQgEgBgDgCQgDgCgBgEQAAgIgBgGQgCgHgEgFIgDgCIgCAAIgBAAIgDAFIgGAJIgFASIgFAYIgBALIAAAPQAAAcADAZQAFAaAIAWQADAJAEAEQADAEAEABIAEgGIAEgNIAEgNIACgTIACgFIAFgDIACAAIACgBQAFAAADACQAEACACAEIAAADIAAABQAAAIgCALIgHAaQgDALgGAIQgGAIgJAEIgFAEIgJADIgIACIgGABgAgZhwQgFAEgIAJQgEAHgBAFQgDAHAAAEIAAABIACACIACgBIACgFIAEgJIAEgJIAHgIIAKgMIgBAAIgBAAQgDAAgFAFg");
	this.shape_4.setTransform(9.65,36.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282E46").s().p("AgICFQgKgEgKgJIgHgIIgLgQQgFgJgDgJIgFgNIgFgQQgGgjAAgbQgBgcAGgXQAGgWALgSQAQgVAXgIIAJgDIAIgBIACAAQAOAAAMAHQALAHAKAOIAEAHIADAKIADAQIABAKIACAZIAAAXIAAAFQAAAFgCAEQgCAEgFABIgHABIgOABIgdAAIgNABIACAUIADAhIAFASIAFANIAFAJIAIAJIAAABIABAAIAAAAQAFgDADgIQAEgHADgMIAEgPIACgHIAFgEIAGgBQAEAAADACQAEADABAEIAAACIAAABIAAABIgCAMIgHAaIgFAKIgHAKQgHAIgKAEQgKAFgMAAQgLAAgIgFgAAZgWIALAAIAIABIAAgDIgBgiQgBgOgCgKIgEgLIgGgIIgIgFIgEgDQgHAJgFAKQgEAKgCALIgCAXIgBAYIAAABIARgBIALAAgAgchvIgMAOIgGALIgCAIIAAABIABADIABABIAEgDIADgHIADgFIAHgMIAFgGIAIgJIgBgCIgBAAQgFACgFAEg");
	this.shape_5.setTransform(-7.7269,36);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282E46").s().p("AgZC0QgMAAgIgDQgIgFgEgIIgEgHIgEgJIgHgZIgEgYIgDgQIgBgVIgDgtIAAgiQgBgaACgaIADgyIAHgbQAEgMAEgHQADgHAFgDQAFgEAGgBIAJACIANAFIABAAIABAAIABAAQAKAAAKADQAJADAMAHQANAJAJAMQAJAKAFAPIADALIAAAJQABANgHAOQgFANgNAOIgPAPIgKAHIAMAFIALAGIAMAHIAOAMIAHAJQASAZAAAfQAAAOgGAOQgFAOgLAPQgHAJgHAHQgHAGgJAFIgLAHIgOAFQgVAIgIgBgAgFAZIACAtIAAARIABAaIABAYIABAIIAAAFIAAAAQANgFAKgHQAKgHAIgLQASgWAAgVQgBgVgJgQQgLgQgTgLIgQgIIgIgDIAAAXgAgDh9IABASIgBATIgCAwIAAADIAAABIAHgHIAPgOQAJgKAEgJQAEgKAAgIQAAgIgDgHQgEgJgGgIIgOgMQgFgEgEgCIgEgBIADAUgAg5ibIgGAMIgDANIgCAKIAAACIgBADIACAGQAAAAAAAAQAAABAAAAQAAAAABAAQAAAAAAAAIACgBIACgHIADgTQABgJADgIIABgEIAAgEQgBAAgCAFg");
	this.shape_6.setTransform(-24.95,32.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#282E46").s().p("AA8COQgCAAgDgCQgCgCgCgEIgCgFIAAgLIgBgoIgChPIACg8QAAgVgDgMQgCgNgFgEIgDgBQgGAAgEAEQgGAEgEAIQgFAKgEAPQgEAPgCAVIgCAfIAAArIAAAdIACAxIAAACQgBAHgDAFQgEAFgDACIgIADIgGABQgNAAgPgUQgGgJgGgZIgFggQgBgQgBgPIgBgZIgBgaIABgeIACghIAEgUQACgJACgFQAGgJAHgFQAIgEALAAQAHAAAGAEQAHAEAGAJIACAIIADgDIAHgHQAGgGAIgCQAGgDAIAAIABAAQALAAAIAGQAIAHAFANQADAIABAMQACAMAAARIAAADIgBAmIAAAPIAAARIAAA6IACA4IAAAHQgCAFgDADQgDACgEAAgAg1hzQgCAFgDALIgBAIIgCAJIACAIQAAAAAAABQAAAAABABQAAAAAAAAQAAAAABAAIAAAAIADgEQACgDAAgFIABgRIACgJIABgEIABgFIgBgBIgBAAQgCAAgCAFg");
	this.shape_7.setTransform(23.65,-4.375);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#282E46").s().p("AgKCJQgHgCgGgFIgKgLIgFgGIgJgQIgIgSIgHgVIgFgVIgDgWIgCgPIABgBIAAgCQAAgQACgSQADgTAGgUQADgJAFgKIALgUQAFgGAHgGQAHgFAJgCQANgEAIgBQAHABAIADQAHADAIAFIAJAKIAFAHQAKARAGAeQAFAfAAAqQAAAPgCAQQgCARgFARIgHATIgHAPQgLAPgLAHQgMAJgMgBQgHAAgHgCgAAShkIgHARQgHATgDASQgCASAAASIAAAIQAAAaAEAaQAFAaAKAbIACABQAIgIADgIIAFgLIAEgLIAFgcIABgZIAAgRIgBgXIgDgdIgEgTIgEgPIgEgHIgGgHIgBgBIgBAAQgBAAgDAFgAgchxQgFAFgHAIIgGALIgDAIIAAACIAAABIAAADIACABQABAAADgDIAGgNQAEgJAOgQIABgBIAAgBIgBgBIAAAAQgDAAgGAFg");
	this.shape_8.setTransform(5.575,-4.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#282E46").s().p("AgCCNQgOAAgOgIQgHgFgFgEIgGgJQgFgGgEgKQgEgKgCgOIAAgDIgBgFQAAgCADgGIAFgDIAEAAIABAAQAFAAADACQADADACAFIAEAUQADAIADAEQAEAHAFAEQAFADAFAAQAFgCADgFQACgEACgGIABgFIABgHQAAgOgGgSQgHgSgPgWIgTgeIgKgVQgFgLgDgKQgDgKABgIIAAgBIABgMIAEgPQAFgJAHgHQAHgGAJgFIAMgEIALgCIABAAQAHAAAIADQAJADAJAGIALAMQAFAGABADQADAIACAJQADAIAAAKIAAABQAAAKgDAFQgCAGgFACIgEAAQgEAAgDgCQgCgCgCgFIAAAAIAAgHIAAgEQAAgGgCgIQgCgHgEgIIgDgFIgGgFIAAgBQgFADgCAFQgCAGAAAJQABAGADAJQAEAIAHALIAEAHIANATIAJARIAHANQAPAlAAAaIAAABQAAAOgEANQgGAMgJALQgKALgGADQgIAEgIACQgHACgGAAgAgkh2QgEADgFAIIgGALIgBAIIAAABIgBABIABAJIAEAIIABAAQAAgKADgJQACgJAFgKIAEgGIAHgIIAAAAIgCgBQgDAAgFAEg");
	this.shape_9.setTransform(-10.95,-4.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#282E46").s().p("AgGCgQgFgCgEgEQgEgDgDgHQgDgGgCgLQgDgSgCgjQgCgkABgzQgBgbACgPQACgPACgDQAEgFAGgDQAFgDAHAAIAGAAQALAAAIAFQAHAFAEAJQACAEABAMIACAgIgBAiIgCBFIgBAjQAAAOgDAGIgDAIIgFAGQgCADgDABIgHADIgDAAIgDABQgEAAgEgDgAgQhFIgCADQgDAIgCAGIgCALIAAALIACAEIADACIABgBIABAAIADgcIAAgFIACgNIAAgBIgBAAIgCADgAgBhqQgGAAgGgDQgGgEgFgGIgDgIIgBgHQAAgHADgGQAEgFAGgFIAIgEIAHgBIABAAQAHAAAGAEQAGAEAGAHIACAHIAAAGQAAAHgDAGQgDAGgHAFIgHADIgIABgAgNiWIgEAFIgBAEIgBAEIAAAGIABAEQAAAAABAAQAAABAAAAQAAAAABAAQAAAAABAAIAAgDIACgIIACgEIAFgKIAAAAIgCgBIgFACg");
	this.shape_10.setTransform(-24.55,-6.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#282E46").s().p("AgHC0QgFgCgGgDIgLgOQgEgGgBgFQgCgGgBgdIgBhQIgBgeIAAgUIAAgDIAAgCIABgwIADg0QADgOAFgTQAEgJAEgGQADgHAEgDIAEgDIAHgBQAFABAIACQAIADAIAFIAFAGIACAGQAGAbAAAUIAAABIgBASIgCAsIgBARIAAAKIAAAYIABA3IgCAlIgBA1QABAKgJAOQgEAGgGADQgFADgGAAQgGAAgHgDgAgRiZIgFAPIgDAPIgBAMIAAAFIACACQABAAAAAAQAAAAABgBQAAAAAAgBQABAAAAgBIADgLIABgIIACgNIADgKIADgKIAAgBIgBgBIgBAAQgDADgDAFg");
	this.shape_11.setTransform(-35.95,-8.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#282E46").s().p("AgHC0QgFgCgGgDIgLgOQgEgGgBgFQgCgGgBgdIgBhQIgBgeIAAgUIAAgDIAAgCIABgwIADg0QADgOAFgTQAEgJAEgGQADgHAEgDIAEgDIAHgBQAFABAIACQAIADAIAFIAFAGIACAGQAGAbAAAUIAAABIgBASIgCAsIgBARIAAAKIAAAYIABA3IgCAlIgBA1QABAKgJAOQgEAGgGADQgFADgGAAQgHAAgGgDgAgRiZIgFAPIgDAPIgBAMIAAAFIACACQABAAAAAAQAAAAABgBQAAAAAAgBQABAAAAgBIACgLIACgIIACgNIADgKIACgKIAAgBIAAgBIgBAAQgDADgDAFg");
	this.shape_12.setTransform(-48,-8.65);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#282E46").s().p("AhGC3QgDAAgDgDQgEgCgCgFIAAgCIAAgBIAAgIQABgfADgkQADglAGgrIAFgjIgDgEIgCgEIAAgCQAAgEADgCQACgDAEgCIAIgxIAHggIAHgXIAFgKIAGgJQAHgJAJgEQAJgFAIAAIAEAAQAOAAAOAJQAIAGAFAHQAEAHADAHIADAQIAEATIAFAtIAFBSIAGBRIABAxQAAAJgCAIQgDAHgFAFIgGADIgIABQgOAAgKgHQgJgGgGgOIgDgKIgCgTIgDgxIgChdIguAAIgBAGIgDAQQgHAvgEAkQgDAkAAAYIgBAXQgBAHAAAAQgCAEgEABQgCACgDAAgAAIgsIgBghIgFgwQgCgMgBgGQgCgHgDAAIAAAAIgCACIgCAGIgHAOIgEAQIgGAgIgGAkIADAAIAmAAIAAAAgAAiicIAEAKQADAHACAJIAFAWIABABIAAAAQAAAAABAAQAAAAAAAAQAAAAABgBQAAAAAAAAIABgEIAAgCQAAgIgCgJQgEgJgFgKIgGgIIgDgCIACAEg");
	this.shape_13.setTransform(-62.85,-8.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-92.8,-35.1,192.6,106.30000000000001);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.tiffanyName = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AACDbQgLAAgKgEQgLgFgJgIQgJgJgEgLQgFgLABgPIAAgEQgBgHADgEQACgEAFgCIACgBIADAAIAAAAQAGAAADADQAEACACAHQAAAPACAJQADAJAFADQACACADABIAHADQADAAACgDQADgCADgFQACgDABgIQABgJAAgPIAAgFIABgDIgBgZIAAgOIAAgDQgLAKgJAGQgKAEgIAAIgCAAQgKABgLgHQgKgFgKgNQgGgGgEgKQgFgJgCgNIgGgwQgCgWAAgXIAAgeQAAg5ACggQADggADgJIAGgFQADgCAEAAQAEAAADADQADADACAGIAAACIgBAgIgCBfIAAAMQAAAiADAbQACAdAFAVIADAIIAFAGIAKALQAEADAEAAIAAAAQAFAAAFgDQAFgDAFgGQAFgFADgIQACgHACgKIAEgXIABgTIAAgbQgBghACghIAEhAQACgSADgLQADgKADgEQAEgGAGgFQAFgDAGgCIADgBIADAAIADAAQAaAAAJAYQAFAJACAPQACAOAAAWIAAAjIgCA4IAAAPIAAATIAAARIABAvIAAACIgCAyQgCAUgCAHIgBAMIgEASIgHANIgIAOIgLAJIgJAHQgMAGgLADQgLACgKABgABFjEIADAMIADAPIADASIABAFIABADIABACQAFgEAAgIIAAgCIgBgIIgCgIQAAgDgCgEIgFgOIgEgEIgCgBIgBAAIAAABg");
	this.shape.setTransform(67.65,44.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("ABGCoQgEAAgDgCQgDgDgCgEQgBgCgBgFIAAgNIgCgvIAAheIABhGQAAgZgDgPQgDgPgGgEIgCgBQgHAAgGAFQgGAEgFAJQgGAMgEASQgFASgCAZIgCAkIgBAzIABAjIACA5IAAACIAAABQgCAIgDAGQgEAFgFADIgIADIgHABQgPAAgSgXQgGgKgHgeIgGgmQgCgSAAgTIgBgdIgBgfIABgjIACgnIAFgYQACgKADgGQAFgLAJgFQAJgGAMAAQAJAAAIAFQAHAFAGALIADAJIADgDIAJgJQAHgHAIgDQAJgDAIAAIABAAQANAAAJAIQAKAIAFAPQAEAJABAOQACAOAAAUIAAAEIgBAtIAAASIAAAUIABBFIABBBIAAAJQgCAGgDADQgEADgEAAgAg+iIIgFATIgCAJIgBALIABAJQAAABABAAQAAABAAAAQABAAAAABQAAAAABAAQADgBABgEQACgEAAgFIABgUIACgLIABgEIABgGIgBgBIgBgBQgCAAgDAGg");
	this.shape_1.setTransform(44.625,39.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("AAyCpQgIAAgHgCQgHgDgGgFIgPACIgJABQgMAAgLgDQgLgEgKgGQgVgNgIgZIgEgNIgBgMIAAgHQAAglAagdQAKgJAHgEQAJgFAHgCIAIgDIALgCIAAgSIABgYIAAgUIgBggQgBgMgBgDQgDgKgFAAQgCAAgEADIgIAKQgEAGgCAIQgCAJAAAMIgBANIgCAFIgFAFQgCACgDAAIgCAAQgGAAgDgDQgEgCgCgGIAAgFIAAgEIAAgOQAAgNAFgMQAEgMAJgMIANgNQAGgFAGgCQAIgDAKgCQAJgCAKAAIACAAQANAAAMAGQANAFAKALQAHALAEAQQAEARgBAWIgBBiIgBAzIABAqIAAAYIAAALQAAAGgCAFQgCAEgEACQgEADgFABQgFACgFAAgAgdAfQgKAJgGANQgFAMABAQIAAADQgBARAIALQAIALAOAGIAJACIAIAAIAFAAIABAAQgDgLgCgMQgBgMAAgOIAAgcIAAgZIABgNQgJAAgSAPgAAtiMIgBABIACADIAEAGIAEALIADAMIACAPQAAAFABAAIABAAQABAAAAAAQABgBAAAAQABgBAAAAQAAgBAAAAQACgDAAgEIAAgBQAAgKgEgKQgDgJgGgIQgFgFgCAAIgBAAg");
	this.shape_2.setTransform(25,39.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282E46").s().p("AgWDVQgGgCgHgFQgHgHgEgGQgEgGgBgFQgEgIgCghQgBggAAg5IgPAAIgGgCQgDgCgCgDIgCgDIAAgCIAAgCQAAgGAEgDQADgEAHAAIAIgCIAGgBIAAgOIAAgSIAAgPQABhcACAAIACgYIACgLQADgMAFgKQAGgKAHgJIAKgJQAEgEADAAQAHgFAHgCQAIgCAIAAIAHAAQAPAAAOAHQANAHAMAOIAEAJIAEALIABAFIAAAEIAAAFQAAAOgDAGQgEAHgHAAIgBAAQgEAAgDgDQgDgCgCgGIAAgBIAAgIIAAgEQAAgFgCgFQgCgFgEgGIgHgHIgEgCQgKAAgCA6IgBAGIAAALIAAATIAAAbIAAApIAAAjIAAAAIASAAIAQgBQAHAAAEACQAEABABACIADAEIABAHQAAAFgDAEQgDADgGACIggABIgLABIAAAJIAAAYIABA0QAAArgDAJQgDAKgEAHQgEAGgGAEIgHADIgHABQgJAAgHgDgAgSi6QgFAFgFAKQgEAKgCAIQgCAJAAAIIAAAGQAAABAAAAQAAABAAAAQAAAAABAAQAAABAAAAIADgBIACgFIAEgRIAEgPIAGgNIAJgMIABgCIgBAAIgBAAQgFABgFAFg");
	this.shape_3.setTransform(8.575,33.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282E46").s().p("AgWDVQgGgCgHgFQgHgHgEgGQgEgGgBgFQgEgIgCghQgBggAAg5IgPAAIgGgCQgDgCgCgDIgCgDIAAgCIAAgCQAAgGAEgDQADgEAHAAIAIgCIAGgBIAAgOIAAgSIAAgPQABhcACAAIACgYIACgLQADgMAFgKQAGgKAHgJIAKgJQAEgEADAAQAHgFAHgCQAIgCAIAAIAHAAQAPAAAOAHQANAHAMAOIAEAJIAEALIABAFIAAAEIAAAFQAAAOgDAGQgEAHgHAAIgBAAQgEAAgDgDQgDgCgCgGIAAgBIAAgIIAAgEQAAgFgCgFQgCgFgEgGIgHgHIgEgCQgKAAgCA6IgBAGIAAALIAAATIAAAbIAAApIAAAjIAAAAIASAAIAQgBQAHAAAEACQAEABABACIADAEIABAHQAAAFgDAEQgDADgGACIggABIgLABIAAAJIAAAYIABA0QAAArgDAJQgDAKgEAHQgEAGgGAEIgHADIgHABQgJAAgHgDgAgSi6QgFAFgFAKQgEAKgCAIQgCAJAAAIIAAAGQAAABAAAAQAAABAAAAQAAAAABAAQAAABAAAAIADgBIACgFIAEgRIAEgPIAGgNIAJgMIABgCIgBAAIgBAAQgFABgFAFg");
	this.shape_4.setTransform(-11.425,33.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282E46").s().p("AgHC9QgFgCgGgFQgEgEgDgIQgEgIgCgMQgEgWgCgpQgCgqAAg8QAAghACgRQACgSADgDQAEgHAHgDQAGgDAIAAIAHAAQANAAAJAGQAIAFAFALQADAFABAOIABAmIgBAoIgCBSIgBApQgBARgCAHIgEAJIgFAHIgGAFIgJADIgDABIgDAAQgFAAgFgDgAgShSIgDAEIgGARIgCAMIAAANIADAGIADABIABAAIABgBIADggIABgHIADgPIgBgBIgBAAIgCADgAgBh+QgHAAgHgDQgGgEgGgIIgEgJIgBgJQAAgIADgGQAEgHAIgGQAEgDAEgBIAIgBIACAAQAJAAAHAEQAHAFAGAJIACAIIABAHQAAAIgEAHQgEAHgHAGIgJADIgJABgAgPixIgEAGIgCAFIgBAEIAAAHIABAFQABAAAAAAQAAABABAAQAAAAAAAAQABAAAAAAIABgDIADgKIACgFIAGgLIgDgCQgDABgDACg");
	this.shape_5.setTransform(-27.725,36.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282E46").s().p("AABDTIgJgDIgIgIIgGgIQgEgGgFgQQgFgPgGgZIgEggIgCgZIgDguIAAgoQAAgpABghQACghADgYIAEgTIAGgSIgXABIgdACIgCAAQgDgBgDgCQgDgCgCgEIAAgDIAAgBIAAgBQAAgEACgDQACgDAGgCQALgDATgCQARgCAZAAIAEAAIAGAAIAXAAIBIACQAFAAADADQAEADACAGIAAAEQAAAEgCAEQgEAEgFACIg1AAIgBAAIAAABIADAdIABAWIAAABIgCBBIgBApIABAqIACA/IAAAuQABAVADANIAAAHIABAGIAAAFQAAAFgFAHQgDAGgIAGQgEACgFACQgFABgGAAIgIgBgAgWixIgFAOQgDAGgBAHQgBAGAAAHIAAACIABAHIACAEQAAAAABgBQAAAAAAAAQABAAAAgBQAAAAABgBIACgIIABgRIAHgaIAAgBIABgCIAAgBIgBgBIAAAAQgDAAgDAGg");
	this.shape_6.setTransform(-39.85,34.65);

	this.instance = new lib.arrow("synched",0);
	this.instance.setTransform(-21.6,-36.1,0.9999,0.9999,0,-63.7298,116.2702);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-74.9,-66,156.2,147.3);


(lib.head1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgaBvQgegJgVgYQgWgYgEgfQgEghAPghQAPggAdgVQAmgcAgALQANAEALAKQATARAHAgIAEAeQADASAGAKIANAXQAHAOgBAMQgBAUgXARQgWARgdAEQgKACgLAAQgRAAgRgGg");
	this.shape.setTransform(67.0489,64.5746,0.4383,0.4383);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AEnIhQgXgHgogGQgugHgQgEQhKgRg+gyQg8gxgjhFQglhMgBhWIAAgaQACg5ASg2QAEgNANgUIAagkQAfgsAIgVQAOghgRgQQgHgIgXABQgWACgQAHQgLAFgKACQgKACgMgCQgugGgpgbQgogagZgoQgIgNgIgTIgNgiQgRgxAFgkQAHgtAOgkQAUgxAdgOQAmgSAxAFQAqAEAsAUQBnAuBbBtQAsA0ASAsQAVA0AABFQAAAygNBMQgRBhgDAbQgIBGALA2QAKA0A0BnQAxBiAIA5QACAGgDACQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAIgFgBg");
	this.shape_1.setTransform(70.5624,60.9639);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("ADLMFQgigCgggHIhFgCIg0ACQgeABgVgDQgigGgXgOIgHADQgjAPgagIQgPgFgLgNQgLgMgCgQQgDgPAGgQQAFgPAMgKQAJgIARgHIAYgLIAGgLQAKgNAggSIACgBIAOgNQATgSAKgMQARgVAMghIgCgCQgNgMgVgZQgTgZgIgNQgOgdgBgkQgBgdAJgTQAFgLAJgKIgCgDQgdglgUgyQgehJAOg0QAHgbAWgeQAKgMAhgmQAcgfAMgUQASgeABgdQABgdgOgPQgLgLgWgEQgagCgMgDQgbgGgUgWQgUgUgKgcQgJgYgDgfQgCgUgBglQg3AWg9gLQg8gMgsgnQgpgkgVg7QgXhBASgwQAOgkAcgZQAGgGAEgDQAqggA+gJQA3gHA7AMQBdATBLA0QBSA6AjBRQAiBRgCB/QAAAkgFBIQgEBHAAAiQgCBaAUBYQAKAqAOAXQAKAQATASIAjAcQAgAZAdAbQBAA5A1BAQAVAZAOAUQARAaAJAYIAEANQAHAYgBAXQAAAZgKAUQgRAjguAcIgJAGQgGA0gcAiQgVAaggAQQgPAWgRAGQgHADgNABIgGAAIgQABIgZgBg");
	this.shape_2.setTransform(87.2488,77.3696);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D1765F").s().p("AgxB9QgpggAMg/QAHggARguQAVg0AJgaQALgfAeAOQAfANgLAgIgXA/QgOAmgGAZQgJAgALALQAKAMAmgDQAhgEAEAhQAEAighAEIgYABQguAAgfgXg");
	this.shape_3.setTransform(35.9045,57.8112,0.4379,0.4379);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282E46").s().p("Ah0AsQgQgLAEgTQADgPAPgMQAmgcA/gJQA3gHApAWQAiATAHAUQAJAcgxADIgngDQgZgCgOABQgOACggAKQgeAJgRABQgUAAgNgJg");
	this.shape_4.setTransform(30.1133,43.1452,0.4382,0.4382);

	this.instance = new lib.face1("synched",0);
	this.instance.setTransform(55.95,64,1,1,0,0,0,31,45.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#ED8B6D").s().p("AiNDVQgygOgcgwQgLgTgDgTQgEgXAHgSQAHgUAZgXQAZgYAbgQQAcgVAMgNQAFgFARgXQAPgWAHgOIAQgmQAEgKAFgIQACgMAGgLQAOgYAagFQAMgCAOADQAMADAKAJIAMAKIAOAIQAMAIAHAMQAIANAAAOQABAQgGANIAAABQAPgFAQADQATADANANQAIAIALAVQAOAaAEALIASA/QALApgBATQgBAggSATIADACQggAjgkAPQgbAKgpAFQg6AHhnAAQgrAAgUgGg");
	this.shape_5.setTransform(55.8284,104.7229);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282E46").s().p("AjALhQiQgVhlhAQh+hRgNh8QgIhJAdhUQAbhTAyg4QAsgzAVg9QAWg8gDhCQgDgsgRg5IghhiQgSg5gDgpQgFg3ATgxQAQgrAhgiQAggiAqgTQAYgLBNgSQBAgPAigYQAFgDACgDQAGgFAFgDQApggA+gJQA2gIA7AMQBdAUBMA0QBSA5AjBRQAiBSgBB/QgBAkgFBIQgEBHAAAiQgCBYAUBZQAKArAOAWQAKARATARIAkAdQAeAYAeAbQgKBOgjBDQgcA3gpAuQg/BIhbA6QhxBGiBAdQhQAThQAAQgyAAgygIg");
	this.shape_6.setTransform(57.8623,74.4584);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#ED8B6D").s().p("AhtCIQgagBgTgFQgegHgPgQQgPgPgCgXQgDgWAIgVQAKgbAmgsIAvg2QASgWANgHQAOgHAQAAQARABANAIQANAIAIAOQAHAPgBAPQASAIAhAAQAnABANADQANACAYAIIATADQAMABAHADQARAGALASQAJARABATQAAAUgJARQgJATgQAKQgOAKgkAIQgeAHgPAAIgWAAQgGABgQAJQgWAMgeAEQgTADgmABIgcAAIgRAAg");
	this.shape_7.setTransform(61.7702,109.1859);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.instance},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,134.4,154.7);


(lib.woman1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.eyes();
	this.instance.setTransform(-277.8,-61.05,1,1,0,0,180,9.6,3.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:8.8,regY:3.2,skewX:-0.046,skewY:179.954,x:-276.95,y:-60.95},0).wait(1).to({skewX:-0.092,skewY:179.908,y:-61},0).wait(1).to({skewX:-0.138,skewY:179.862,x:-276.9},0).wait(1).to({skewX:-0.184,skewY:179.816},0).wait(1).to({skewX:-0.23,skewY:179.77,x:-276.85,y:-61.05},0).wait(1).to({skewX:-0.2759,skewY:179.7241},0).wait(1).to({skewX:-0.3219,skewY:179.6781,y:-61.1},0).wait(1).to({skewX:-0.3679,skewY:179.6321,x:-276.8,y:-61.15},0).wait(1).to({skewX:-0.4139,skewY:179.5861},0).wait(1).to({skewX:-0.4599,skewY:179.5401,x:-276.7,y:-61.2},0).wait(1).to({skewX:-0.5059,skewY:179.4941,y:-61.15},0).wait(1).to({skewX:-0.5519,skewY:179.4481,x:-276.65,y:-61.2},0).wait(1).to({skewX:-0.5979,skewY:179.4021,y:-61.25},0).wait(1).to({skewX:-0.6439,skewY:179.3561},0).wait(1).to({skewX:-0.6899,skewY:179.3101,x:-276.6,y:-61.3},0).wait(1).to({skewX:-0.7359,skewY:179.2641,y:-61.35},0).wait(1).to({skewX:-0.7819,skewY:179.2181,x:-276.55},0).wait(1).to({skewX:-0.8278,skewY:179.1722},0).wait(1).to({skewX:-0.8738,skewY:179.1262,x:-276.5},0).wait(1).to({skewX:-0.9198,skewY:179.0802,y:-61.4},0).wait(1).to({skewX:-0.9658,skewY:179.0342,y:-61.45},0).wait(1).to({skewX:-1.0118,skewY:178.9882,x:-276.45},0).wait(1).to({skewX:-1.0578,skewY:178.9422,y:-61.5},0).wait(1).to({skewX:-1.1038,skewY:178.8962,x:-276.4,y:-61.55},0).wait(1).to({skewX:-1.1498,skewY:178.8502,y:-61.5},0).wait(1).to({skewX:-1.1958,skewY:178.8042,x:-276.35,y:-61.55},0).wait(1).to({skewX:-1.2418,skewY:178.7582,y:-61.6},0).wait(1).to({skewX:-1.2878,skewY:178.7122},0).wait(1).to({skewX:-1.3337,skewY:178.6663,x:-276.3,y:-61.65},0).wait(1).to({skewX:-1.3797,skewY:178.6203,x:-276.25},0).wait(1).to({skewX:-1.4257,skewY:178.5743,x:-276.2,y:-61.7},0).wait(1).to({skewX:-1.4717,skewY:178.5283},0).wait(1).to({skewX:-1.5177,skewY:178.4823},0).wait(1).to({skewX:-1.5637,skewY:178.4363,x:-276.15,y:-61.75},0).wait(1).to({skewX:-1.6097,skewY:178.3903,y:-61.8},0).wait(1).to({skewX:-1.6557,skewY:178.3443,x:-276.1},0).wait(1).to({skewX:-1.7017,skewY:178.2983,y:-61.85},0).wait(1).to({skewX:-1.7477,skewY:178.2523,x:-276.05},0).wait(1).to({skewX:-1.7937,skewY:178.2063},0).wait(1).to({skewX:-1.8396,skewY:178.1604,y:-61.9},0).wait(1).to({skewX:-1.8856,skewY:178.1144,x:-276},0).wait(1).to({skewX:-1.9316,skewY:178.0684,y:-61.95},0).wait(1).to({skewX:-1.9776,skewY:178.0224,x:-276.05},0).wait(1).to({skewX:-2.0236,skewY:177.9764},0).wait(1).to({skewX:-2.0696,skewY:177.9304,x:-276.1},0).wait(1).to({skewX:-2.1156,skewY:177.8844,x:-276.15,y:-62},0).wait(1).to({skewX:-2.1616,skewY:177.8384,x:-276.2,y:-61.95},0).wait(1).to({skewX:-2.2076,skewY:177.7924,x:-276.25},0).wait(1).to({skewX:-2.2536,skewY:177.7464},0).wait(1).to({skewX:-2.2996,skewY:177.7004,x:-276.3},0).wait(1).to({skewX:-2.3456,skewY:177.6544},0).wait(1).to({skewX:-2.3915,skewY:177.6085,x:-276.35},0).wait(1).to({skewX:-2.4375,skewY:177.5625,x:-276.4,y:-62},0).wait(1).to({skewX:-2.4835,skewY:177.5165,x:-276.45,y:-61.95},0).wait(1).to({skewX:-2.5295,skewY:177.4705,x:-276.5},0).wait(1).to({skewX:-2.5755,skewY:177.4245,x:-276.55},0).wait(1).to({skewX:-2.6215,skewY:177.3785},0).wait(1).to({skewX:-2.6675,skewY:177.3325,x:-276.6},0).wait(1).to({skewX:-2.7135,skewY:177.2865,x:-276.65,y:-62},0).wait(1).to({skewX:-2.7595,skewY:177.2405,x:-276.7},0).wait(1).to({skewX:-2.8055,skewY:177.1945,x:-276.75,y:-61.95},0).wait(1).to({skewX:-2.8515,skewY:177.1485,x:-276.8},0).wait(1).to({skewX:-2.8974,skewY:177.1026,x:-276.85},0).wait(1).to({skewX:-2.9434,skewY:177.0566},0).wait(1).to({skewX:-2.9894,skewY:177.0106,x:-276.9},0).wait(1).to({skewX:-3.0354,skewY:176.9646,x:-276.95,y:-62},0).wait(1).to({skewX:-3.0814,skewY:176.9186,x:-277},0).wait(1).to({skewX:-3.1274,skewY:176.8726,x:-277.05,y:-61.95},0).wait(1).to({skewX:-3.1734,skewY:176.8266},0).wait(1).to({skewX:-3.2194,skewY:176.7806,x:-277.1},0).wait(1).to({skewX:-3.2654,skewY:176.7346},0).wait(1).to({skewX:-3.3114,skewY:176.6886,x:-277.15},0).wait(1).to({skewX:-3.3574,skewY:176.6426,x:-277.2,y:-62},0).wait(1).to({skewX:-3.4033,skewY:176.5967,x:-277.25},0).wait(1).to({skewX:-3.4493,skewY:176.5507,x:-277.3,y:-61.95},0).wait(1).to({skewX:-3.4953,skewY:176.5047,x:-277.35},0).wait(94));

	// lips_copy
	this.instance_1 = new lib.lips1("single",3);
	this.instance_1.setTransform(-276.75,-41.65,1,1,-14.9985,0,0,6.6,4.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(66).to({mode:"synched",startPosition:7},0).wait(103).to({startPosition:7},0).wait(1));

	// head_copy
	this.instance_2 = new lib.head2("synched",0);
	this.instance_2.setTransform(-320,-90,1,1,0,0,0,27.8,17.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:54.6,regY:55,x:-293.2,y:-52.4},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// shirt_copy
	this.instance_3 = new lib.shirt2("synched",0);
	this.instance_3.setTransform(-303.05,54.25,1,1,0,0,0,73.6,70.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(10).to({regX:48.8,regY:11.9,rotation:-0.2326,x:-327,y:-4},0).wait(1).to({regX:73.6,regY:70.8,rotation:-0.2746,x:-301.9,y:54.8},0).wait(1).to({rotation:-0.3157,x:-301.85},0).wait(1).to({rotation:-0.3569,x:-301.8},0).wait(1).to({rotation:-0.398,x:-301.75,y:54.75},0).wait(1).to({rotation:-0.4392,x:-301.7},0).wait(1).to({rotation:-0.4803},0).wait(1).to({rotation:-0.5215,x:-301.65,y:54.7},0).wait(1).to({rotation:-0.5626,x:-301.6},0).wait(1).to({rotation:-0.6038,x:-301.55},0).wait(1).to({rotation:-0.6449,x:-301.5,y:54.65},0).wait(1).to({rotation:-0.6861,x:-301.45,y:54.6},0).wait(1).to({rotation:-0.7272,x:-301.4},0).wait(1).to({rotation:-0.7684},0).wait(1).to({rotation:-0.8095,x:-301.35,y:54.55},0).wait(1).to({rotation:-0.8507,x:-301.3},0).wait(1).to({rotation:-0.8918,x:-301.25},0).wait(1).to({rotation:-0.933,x:-301.2,y:54.5},0).wait(1).to({rotation:-0.9741,x:-301.15},0).wait(1).to({rotation:-1.0153},0).wait(1).to({rotation:-1.0564,x:-301.1},0).wait(1).to({rotation:-1.0976,x:-301.05,y:54.45},0).wait(1).to({rotation:-1.1387,x:-301},0).wait(1).to({rotation:-1.1799,x:-300.95},0).wait(1).to({rotation:-1.221,x:-300.9,y:54.4},0).wait(1).to({rotation:-1.2622},0).wait(1).to({rotation:-1.3033,x:-300.85},0).wait(1).to({rotation:-1.3445,x:-300.8,y:54.3},0).wait(1).to({rotation:-1.3856,x:-300.75},0).wait(1).to({rotation:-1.4268,x:-300.7},0).wait(1).to({rotation:-1.4679,x:-300.65},0).wait(1).to({rotation:-1.5091,x:-300.6,y:54.25},0).wait(1).to({rotation:-1.5502,x:-300.65},0).wait(1).to({rotation:-1.5914,x:-300.6,y:54.2},0).wait(1).to({rotation:-1.6325,x:-300.55,y:54.15},0).wait(1).to({rotation:-1.6737,x:-300.5},0).wait(1).to({rotation:-1.7148,x:-300.45},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({regX:73.7,scaleX:0.9999,scaleY:0.9999,rotation:-0.7572,x:-302.7,y:53.5},0).wait(22).to({startPosition:0},0).wait(62));

	// rightHand_copy
	this.instance_4 = new lib.rightHand2("synched",0);
	this.instance_4.setTransform(-329.95,30.05,1,1,5.2398,0,0,44.1,20.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1).to({regX:63.5,regY:68.9,rotation:5.1239,x:-314.9,y:80},0).wait(1).to({rotation:5.0072,x:-314.8,y:80.05},0).wait(1).to({rotation:4.8905,x:-314.7,y:80},0).wait(1).to({rotation:4.7739,x:-314.6,y:79.95},0).wait(1).to({rotation:4.6572,x:-314.5,y:79.9},0).wait(1).to({rotation:4.5405,x:-314.4,y:79.95},0).wait(1).to({rotation:4.4239,x:-314.3,y:79.9},0).wait(1).to({rotation:4.3072,x:-314.2,y:79.8},0).wait(1).to({rotation:4.1906,x:-314.1},0).wait(1).to({rotation:4.0739,x:-314},0).wait(1).to({rotation:3.9572,x:-313.9,y:79.75},0).wait(1).to({rotation:3.8406,x:-313.8,y:79.7},0).wait(1).to({rotation:3.7239,x:-313.7,y:79.65},0).wait(1).to({rotation:3.6072,x:-313.65},0).wait(1).to({rotation:3.4906,x:-313.5,y:79.55},0).wait(1).to({rotation:3.3739,x:-313.4,y:79.6},0).wait(1).to({rotation:3.2572,x:-313.3,y:79.55},0).wait(1).to({rotation:3.1406,x:-313.2},0).wait(1).to({rotation:3.0239,x:-313.15,y:79.45},0).wait(1).to({rotation:3.0387},0).wait(1).to({rotation:3.0535,x:-313.1,y:79.5},0).wait(1).to({rotation:3.0682,x:-313.15},0).wait(1).to({rotation:3.083,y:79.45},0).wait(1).to({rotation:3.0978,y:79.5},0).wait(1).to({rotation:3.1126,x:-313.2},0).wait(1).to({rotation:3.1273},0).wait(1).to({rotation:3.1421,x:-313.25,y:79.55},0).wait(1).to({rotation:3.1569,y:79.5},0).wait(1).to({rotation:3.1717},0).wait(1).to({rotation:3.1865,y:79.55},0).wait(1).to({rotation:3.2012},0).wait(1).to({rotation:3.216},0).wait(1).to({rotation:3.2308,x:-313.3},0).wait(1).to({rotation:3.2456},0).wait(1).to({rotation:3.2603},0).wait(1).to({rotation:3.2751,x:-313.35,y:79.6},0).wait(1).to({rotation:3.2899,y:79.55},0).wait(1).to({rotation:3.3047,x:-313.3},0).wait(1).to({rotation:3.3195,x:-313.35,y:79.6},0).wait(1).to({rotation:3.3342},0).wait(1).to({rotation:3.349},0).wait(1).to({rotation:3.3638,x:-313.4},0).wait(1).to({rotation:3.3786},0).wait(1).to({rotation:3.3933,x:-313.45},0).wait(1).to({rotation:3.4081},0).wait(1).to({rotation:3.4229},0).wait(1).to({rotation:3.4377},0).wait(1).to({rotation:3.4525,y:79.55},0).wait(1).to({rotation:3.4672,y:79.6},0).wait(1).to({rotation:3.482,x:-313.5},0).wait(1).to({rotation:3.4968,y:79.55},0).wait(1).to({rotation:3.5116,y:79.6},0).wait(1).to({rotation:3.5263,x:-313.55},0).wait(1).to({rotation:3.5411},0).wait(1).to({rotation:3.5559,x:-313.5},0).wait(1).to({rotation:3.5707,x:-313.55},0).wait(1).to({rotation:3.5854},0).wait(1).to({rotation:3.6002,x:-313.65,y:79.65},0).wait(1).to({rotation:3.615},0).wait(1).to({rotation:3.6298,y:79.6},0).wait(1).to({rotation:3.6446,x:-313.7,y:79.65},0).wait(1).to({rotation:3.6593},0).wait(1).to({rotation:3.6741,x:-313.65},0).wait(1).to({rotation:3.6889,x:-313.7},0).wait(1).to({rotation:3.7037},0).wait(1).to({rotation:3.7184},0).wait(1).to({rotation:3.7332,x:-313.75,y:79.7},0).wait(1).to({rotation:3.748},0).wait(1).to({rotation:3.7628,y:79.65},0).wait(1).to({rotation:3.7776,x:-313.8,y:79.7},0).wait(1).to({rotation:3.7923},0).wait(1).to({rotation:3.8071,x:-313.75},0).wait(1).to({rotation:3.8219,x:-313.8},0).wait(1).to({rotation:3.8367},0).wait(1).to({rotation:3.8514,x:-313.85},0).wait(1).to({rotation:3.8662,y:79.75},0).wait(1).to({rotation:3.881},0).wait(1).to({rotation:3.8958,x:-313.9,y:79.7},0).wait(1).to({rotation:3.9106,y:79.75},0).wait(1).to({rotation:3.9253,x:-313.85},0).wait(1).to({rotation:3.9401,x:-313.9},0).wait(1).to({rotation:3.9549},0).wait(1).to({rotation:3.9697},0).wait(1).to({rotation:3.9844,x:-313.95},0).wait(1).to({rotation:3.9992,y:79.8},0).wait(1).to({rotation:4.014},0).wait(1).to({rotation:4.0288,x:-314,y:79.75},0).wait(1).to({rotation:4.0436,x:-313.95,y:79.8},0).wait(1).to({rotation:4.0583,x:-314},0).wait(1).to({rotation:4.0731},0).wait(1).to({rotation:4.0879},0).wait(1).to({rotation:4.1027,x:-314.05,y:79.75},0).wait(1).to({rotation:4.1174},0).wait(1).to({rotation:4.1322,y:79.8},0).wait(1).to({rotation:4.147,x:-314.1},0).wait(1).to({rotation:4.1618,y:79.75},0).wait(1).to({rotation:4.1766,x:-314.05},0).wait(1).to({rotation:4.1913,x:-314.1,y:79.8},0).wait(1).to({rotation:4.2061},0).wait(1).to({rotation:4.2209},0).wait(1).to({rotation:4.2357,x:-314.15},0).wait(1).to({rotation:4.2504,x:-314.2},0).wait(1).to({rotation:4.2652},0).wait(1).to({rotation:4.28,x:-314.25,y:79.85},0).wait(1).to({rotation:4.2948,x:-314.2,y:79.8},0).wait(1).to({rotation:4.3096,x:-314.25},0).wait(1).to({rotation:4.3243,y:79.85},0).wait(1).to({rotation:4.3391},0).wait(1).to({rotation:4.3539,x:-314.3},0).wait(1).to({rotation:4.3687},0).wait(1).to({rotation:4.3834},0).wait(1).to({rotation:4.4921,x:-314.4,y:79.9},0).wait(1).to({rotation:4.6007,x:-314.5,y:79.95},0).wait(1).to({rotation:4.7093,x:-314.55,y:79.9},0).wait(1).to({rotation:4.8179,x:-314.65,y:80},0).wait(1).to({rotation:4.9266,x:-314.75},0).wait(1).to({rotation:5.0352,x:-314.85,y:80.05},0).wait(1).to({rotation:5.1438,x:-314.95},0).wait(1).to({rotation:5.2524,x:-315},0).wait(1).to({rotation:5.3611,x:-315.15,y:80.15},0).wait(1).to({rotation:5.4697,x:-315.25},0).wait(1).to({rotation:5.5783,x:-315.35},0).wait(1).to({rotation:5.6869,x:-315.45,y:80.2},0).wait(1).to({rotation:5.7956,x:-315.5},0).wait(1).to({rotation:5.9042,x:-315.65,y:80.3},0).wait(1).to({rotation:6.0128,x:-315.7,y:80.25},0).wait(1).to({rotation:6.1214,x:-315.8,y:80.3},0).wait(1).to({rotation:6.2301,x:-315.95,y:80.35},0).wait(1).to({rotation:6.3387,x:-316},0).wait(1).to({rotation:6.4473,x:-316.1,y:80.4},0).wait(1).to({rotation:6.5559,x:-316.15},0).wait(1).to({rotation:6.6645,x:-316.3,y:80.45},0).wait(1).to({rotation:6.7732,x:-316.4},0).wait(1).to({rotation:6.8818,x:-316.45,y:80.5},0).wait(1).to({rotation:6.9904,x:-316.55,y:80.55},0).wait(1).to({rotation:7.099,x:-316.65,y:80.5},0).wait(1).to({rotation:7.2077,x:-316.75,y:80.55},0).wait(1).to({rotation:7.3163,x:-316.8,y:80.6},0).wait(1).to({rotation:7.4249,x:-316.95},0).wait(1).to({rotation:7.5335,x:-317.05,y:80.65},0).wait(1).to({rotation:7.4545,x:-317,y:80.6},0).wait(1).to({rotation:7.3754,x:-316.95},0).wait(1).to({rotation:7.2963,x:-316.8},0).wait(1).to({rotation:7.2173,x:-316.75},0).wait(1).to({rotation:7.1382,x:-316.7,y:80.55},0).wait(1).to({rotation:7.0591,x:-316.65},0).wait(1).to({rotation:6.9801,x:-316.5,y:80.5},0).wait(1).to({rotation:6.901},0).wait(1).to({rotation:6.8219,x:-316.45,y:80.45},0).wait(1).to({rotation:6.7429,x:-316.35},0).wait(1).to({rotation:6.6638,x:-316.3},0).wait(1).to({rotation:6.5847,x:-316.2},0).wait(1).to({rotation:6.5056,x:-316.15,y:80.4},0).wait(1).to({rotation:6.4266,x:-316.05,y:80.35},0).wait(1).to({rotation:6.3475,x:-316},0).wait(1).to({rotation:6.2684,x:-315.95},0).wait(1).to({rotation:6.1894,x:-315.85},0).wait(1).to({rotation:6.1103,x:-315.8,y:80.3},0).wait(1).to({rotation:6.0312,x:-315.75,y:80.25},0).wait(1).to({rotation:5.9522,x:-315.65,y:80.3},0).wait(1).to({rotation:5.8731,x:-315.6,y:80.25},0).wait(1).to({rotation:5.794,x:-315.5,y:80.2},0).wait(1).to({rotation:5.715,x:-315.4},0).wait(1).to({rotation:5.6359,x:-315.35},0).wait(1).to({rotation:5.5568,x:-315.3},0).wait(1).to({rotation:5.4777,x:-315.25,y:80.15},0).wait(1).to({rotation:5.3987,x:-315.2,y:80.1},0).wait(1).to({rotation:5.3196,x:-315.1},0).wait(1).to({rotation:5.2405,x:-315,y:80.05},0).wait(1));

	// leftHand_copy
	this.instance_5 = new lib.leftHand2("synched",0);
	this.instance_5.setTransform(-279.95,-4.05,1,1,0,0,0,6.8,6);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1).to({regX:84,regY:66.3,rotation:-0.0463,x:-202.7,y:56.25},0).wait(1).to({rotation:-0.0925,x:-202.65,y:56.15},0).wait(1).to({rotation:-0.1388,x:-202.6,y:56.1},0).wait(1).to({rotation:-0.185,x:-202.55,y:56.05},0).wait(1).to({rotation:-0.2313,x:-202.5,y:55.95},0).wait(1).to({rotation:-0.2775,x:-202.45,y:55.9},0).wait(1).to({rotation:-0.3238,x:-202.4,y:55.85},0).wait(1).to({rotation:-0.3701,x:-202.3,y:55.75},0).wait(1).to({rotation:-0.4163,x:-202.25,y:55.7},0).wait(1).to({rotation:-0.4626,x:-202.2,y:55.65},0).wait(1).to({rotation:-0.5088,y:55.6},0).wait(1).to({rotation:-0.5551,x:-202.15,y:55.55},0).wait(1).to({rotation:-0.6014,x:-202.1,y:55.45},0).wait(1).to({rotation:-0.6476,x:-202.05,y:55.4},0).wait(1).to({rotation:-0.6939,x:-202,y:55.35},0).wait(1).to({rotation:-0.7401,x:-201.95,y:55.25},0).wait(1).to({rotation:-0.7864,x:-201.9,y:55.2},0).wait(1).to({rotation:-0.8326,x:-201.85,y:55.15},0).wait(1).to({rotation:-0.8789,x:-201.8,y:55.1},0).wait(1).to({rotation:-0.9252,x:-201.75,y:55.05},0).wait(1).to({rotation:-0.9714,y:55},0).wait(1).to({rotation:-1.0177,x:-201.65,y:54.9},0).wait(1).to({rotation:-1.0639,x:-201.6,y:54.85},0).wait(1).to({rotation:-1.1102,x:-201.55,y:54.75},0).wait(1).to({rotation:-1.1565,x:-201.5,y:54.7},0).wait(1).to({rotation:-1.2027,x:-201.45,y:54.65},0).wait(1).to({rotation:-1.249,x:-201.4,y:54.55},0).wait(1).to({rotation:-1.2952,x:-201.35},0).wait(1).to({rotation:-1.3415,x:-201.3,y:54.5},0).wait(1).to({rotation:-1.3877,y:54.4},0).wait(1).to({rotation:-1.434,x:-201.25,y:54.35},0).wait(1).to({rotation:-1.4803,y:54.3},0).wait(1).to({rotation:-1.5265,x:-201.2,y:54.2},0).wait(1).to({rotation:-1.5728,x:-201.15,y:54.1},0).wait(1).to({rotation:-1.619,x:-201.1,y:54.05},0).wait(1).to({rotation:-1.6653,x:-201,y:53.95},0).wait(1).to({rotation:-1.7116,x:-200.95},0).wait(1).to({rotation:-1.7578,x:-200.9,y:53.85},0).wait(1).to({rotation:-1.8041,x:-200.85,y:53.8},0).wait(1).to({rotation:-1.8503,x:-200.8,y:53.75},0).wait(1).to({rotation:-1.8966,x:-200.75,y:53.65},0).wait(1).to({rotation:-1.9428,y:53.6},0).wait(1).to({rotation:-1.9891,x:-200.7,y:53.55},0).wait(1).to({rotation:-2.0354,x:-200.65,y:53.45},0).wait(1).to({rotation:-2.0816,x:-200.6,y:53.4},0).wait(1).to({rotation:-2.1279,x:-200.55},0).wait(1).to({rotation:-2.1741,x:-200.5,y:53.3},0).wait(1).to({rotation:-2.2204,x:-200.45,y:53.25},0).wait(1).to({rotation:-2.2667,x:-200.4,y:53.2},0).wait(1).to({rotation:-2.3129,x:-200.35,y:53.1},0).wait(1).to({rotation:-2.3592,x:-200.25,y:53.05},0).wait(1).to({rotation:-2.4054,x:-200.2,y:53},0).wait(1).to({rotation:-2.4517,x:-200.25,y:52.9},0).wait(1).to({rotation:-2.4613},0).wait(1).to({rotation:-2.4709},0).wait(1).to({rotation:-2.4805,y:52.85},0).wait(1).to({rotation:-2.4901,x:-200.2},0).wait(1).to({rotation:-2.4997,y:52.9},0).wait(1).to({rotation:-2.5093,y:52.85},0).wait(1).to({rotation:-2.5189},0).wait(1).to({rotation:-2.5285},0).wait(1).to({rotation:-2.5381,x:-200.15},0).wait(1).to({rotation:-2.5478,y:52.8},0).wait(1).to({rotation:-2.5574},0).wait(1).to({rotation:-2.567},0).wait(1).to({rotation:-2.5766,x:-200.1,y:52.75},0).wait(1).to({rotation:-2.5862},0).wait(1).to({rotation:-2.5958},0).wait(1).to({rotation:-2.6054},0).wait(1).to({rotation:-2.615,y:52.7},0).wait(1).to({rotation:-2.6246,x:-200.05},0).wait(1).to({rotation:-2.6342},0).wait(1).to({rotation:-2.6438},0).wait(1).to({rotation:-2.6534,y:52.65},0).wait(1).to({rotation:-2.663,x:-200},0).wait(1).to({rotation:-2.6726},0).wait(1).to({rotation:-2.6822,y:52.6},0).wait(1).to({rotation:-2.6918},0).wait(1).to({rotation:-2.7014},0).wait(1).to({rotation:-2.7111,x:-199.95},0).wait(1).to({rotation:-2.7207,y:52.55},0).wait(1).to({rotation:-2.7303,y:52.5},0).wait(1).to({rotation:-2.7399},0).wait(1).to({rotation:-2.7495,x:-199.9,y:52.45},0).wait(1).to({rotation:-2.7591},0).wait(1).to({rotation:-2.7687},0).wait(1).to({rotation:-2.7783},0).wait(1).to({rotation:-2.7879,y:52.4},0).wait(1).to({rotation:-2.7975,x:-199.85},0).wait(1).to({rotation:-2.8071},0).wait(1).to({rotation:-2.8167,y:52.35},0).wait(1).to({rotation:-2.8263},0).wait(1).to({rotation:-2.8359,x:-199.8},0).wait(1).to({rotation:-2.8455},0).wait(1).to({rotation:-2.8551,y:52.3},0).wait(1).to({rotation:-2.8648},0).wait(1).to({rotation:-2.8744},0).wait(1).to({rotation:-2.884,x:-199.75,y:52.25},0).wait(1).to({rotation:-2.8936},0).wait(1).to({rotation:-2.9032},0).wait(1).to({rotation:-2.9128,y:52.3},0).wait(1).to({rotation:-2.9224,x:-199.7,y:52.25},0).wait(1).to({rotation:-2.932,x:-199.75},0).wait(1).to({rotation:-2.9416},0).wait(1).to({rotation:-2.9512},0).wait(1).to({rotation:-2.9608,y:52.2},0).wait(1).to({rotation:-2.9704,x:-199.7},0).wait(1).to({rotation:-2.98},0).wait(1).to({rotation:-2.9896,y:52.15},0).wait(1).to({rotation:-2.9992},0).wait(1).to({rotation:-3.0088,x:-199.65},0).wait(1).to({rotation:-3.0185},0).wait(1).to({rotation:-3.0281,y:52.1},0).wait(1).to({rotation:-3.0377},0).wait(1).to({rotation:-3.0473},0).wait(1).to({rotation:-3.0569,x:-199.6,y:52.05},0).wait(1).to({rotation:-3.0665},0).wait(1).to({rotation:-3.0761},0).wait(1).to({rotation:-3.0857},0).wait(1).to({rotation:-3.0953,x:-199.55,y:52},0).wait(1).to({rotation:-3.1049},0).wait(1).to({rotation:-3.1145},0).wait(1).to({rotation:-3.1241,x:-199.6,y:51.95},0).wait(1).to({rotation:-3.1337},0).wait(1).to({rotation:-3.1433,x:-199.55},0).wait(1).to({rotation:-3.0719,x:-199.6,y:52.05},0).wait(1).to({rotation:-3.0005,x:-199.7,y:52.15},0).wait(1).to({rotation:-2.929,x:-199.75,y:52.25},0).wait(1).to({rotation:-2.8576,x:-199.8,y:52.3},0).wait(1).to({rotation:-2.7861,x:-199.9,y:52.4},0).wait(1).to({rotation:-2.7147,x:-199.95,y:52.55},0).wait(1).to({rotation:-2.6433,x:-200.05,y:52.7},0).wait(1).to({rotation:-2.5718,x:-200.15,y:52.8},0).wait(1).to({rotation:-2.5004,x:-200.2,y:52.9},0).wait(1).to({rotation:-2.4289,x:-200.3,y:52.95},0).wait(1).to({rotation:-2.3575,x:-200.25,y:53.05},0).wait(1).to({rotation:-2.2861,x:-200.35,y:53.15},0).wait(1).to({rotation:-2.2146,x:-200.45,y:53.25},0).wait(1).to({rotation:-2.1432,x:-200.5,y:53.35},0).wait(1).to({rotation:-2.0717,x:-200.6,y:53.4},0).wait(1).to({rotation:-2.0003,x:-200.7,y:53.5},0).wait(1).to({rotation:-1.9289,y:53.6},0).wait(1).to({rotation:-1.8574,x:-200.8,y:53.75},0).wait(1).to({rotation:-1.786,x:-200.9,y:53.85},0).wait(1).to({rotation:-1.7145,x:-200.95,y:53.95},0).wait(1).to({rotation:-1.6431,x:-201.05,y:54},0).wait(1).to({rotation:-1.5717,x:-201.15,y:54.1},0).wait(1).to({rotation:-1.5002,x:-201.2,y:54.25},0).wait(1).to({rotation:-1.4288,x:-201.25,y:54.35},0).wait(1).to({rotation:-1.3573,x:-201.3,y:54.45},0).wait(1).to({rotation:-1.2859,x:-201.35,y:54.55},0).wait(1).to({rotation:-1.2145,x:-201.45,y:54.6},0).wait(1).to({rotation:-1.143,x:-201.55,y:54.7},0).wait(1).to({rotation:-1.0716,x:-201.6,y:54.85},0).wait(1).to({rotation:-1.0002,x:-201.7,y:54.95},0).wait(1).to({rotation:-0.9287,x:-201.75,y:55.05},0).wait(1).to({rotation:-0.8573,x:-201.8,y:55.15},0).wait(1).to({rotation:-0.7858,x:-201.9,y:55.2},0).wait(1).to({rotation:-0.7144,x:-201.95,y:55.3},0).wait(1).to({rotation:-0.643,x:-202.05,y:55.4},0).wait(1).to({rotation:-0.5715,x:-202.15,y:55.5},0).wait(1).to({rotation:-0.5001,x:-202.2,y:55.6},0).wait(1).to({rotation:-0.4286,x:-202.25,y:55.7},0).wait(1).to({rotation:-0.3572,x:-202.35,y:55.8},0).wait(1).to({rotation:-0.2858,x:-202.4,y:55.9},0).wait(1).to({rotation:-0.2143,x:-202.5,y:56},0).wait(1).to({rotation:-0.1429,x:-202.6,y:56.1},0).wait(1).to({rotation:-0.0714,x:-202.65,y:56.2},0).wait(1).to({rotation:0,x:-202.75,y:56.25},0).wait(1));

	// leftLeg_copy
	this.instance_6 = new lib.right_leg2("synched",0);
	this.instance_6.setTransform(-215.8,130.1,1,1,0,0,0,160.8,237.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(170));

	// rightLeg_copy
	this.instance_7 = new lib.leftLeg2("synched",0);
	this.instance_7.setTransform(-319.95,110,1,1,0.2116,0,0,33.5,26.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1).to({regX:148,regY:128.1,rotation:0.2384,x:-205.85,y:211.85},0).wait(1).to({rotation:0.2652,x:-205.9,y:211.95},0).wait(1).to({rotation:0.292,x:-205.95,y:212},0).wait(1).to({rotation:0.3188,x:-206},0).wait(1).to({rotation:0.3456,y:212.1},0).wait(1).to({rotation:0.3724,x:-206.1,y:212.15},0).wait(1).to({rotation:0.3993,x:-206.15,y:212.2},0).wait(1).to({rotation:0.4261,y:212.25},0).wait(1).to({rotation:0.4529,x:-206.2,y:212.3},0).wait(1).to({rotation:0.4797,x:-206.25,y:212.35},0).wait(1).to({rotation:0.5065,x:-206.35,y:212.4},0).wait(1).to({rotation:0.5333,y:212.5},0).wait(1).to({rotation:0.5601,x:-206.4},0).wait(1).to({rotation:0.5869,x:-206.45,y:212.55},0).wait(1).to({rotation:0.6137,x:-206.5,y:212.65},0).wait(1).to({rotation:0.6406,x:-206.55,y:212.7},0).wait(1).to({rotation:0.6674,x:-206.6},0).wait(1).to({rotation:0.6942,x:-206.65,y:212.8},0).wait(1).to({rotation:0.721,x:-206.7,y:212.85},0).wait(1).to({rotation:0.7478,y:212.9},0).wait(1).to({rotation:0.7746,x:-206.8,y:212.95},0).wait(1).to({rotation:0.8014,x:-206.85,y:213},0).wait(1).to({rotation:0.8282,x:-206.9,y:213.05},0).wait(1).to({rotation:0.8551,y:213.1},0).wait(1).to({rotation:0.8819,x:-206.95,y:213.2},0).wait(1).to({rotation:0.9087,x:-207.05},0).wait(1).to({rotation:0.9355,x:-207.1,y:213.25},0).wait(1).to({rotation:0.9623,y:213.35},0).wait(1).to({rotation:0.9891,x:-207.15},0).wait(1).to({rotation:1.0159,x:-207.2,y:213.4},0).wait(1).to({rotation:1.0427,x:-207.3,y:213.5},0).wait(1).to({rotation:1.0695,x:-207.35,y:213.55},0).wait(1).to({rotation:1.0964,x:-207.4,y:213.6},0).wait(1).to({rotation:1.1232,x:-207.45},0).wait(1).to({rotation:1.15,x:-207.5,y:213.65},0).wait(1).to({rotation:1.1768,x:-207.55,y:213.7},0).wait(1).to({rotation:1.2036,x:-207.6,y:213.75},0).wait(1).to({rotation:1.2304,x:-207.65,y:213.85},0).wait(1).to({rotation:1.2572,x:-207.7},0).wait(1).to({rotation:1.284,y:213.9},0).wait(1).to({rotation:1.3108,x:-207.8,y:214},0).wait(1).to({rotation:1.3377,x:-207.85},0).wait(1).to({rotation:1.3645,x:-207.9,y:214.05},0).wait(1).to({rotation:1.3543},0).wait(1).to({rotation:1.3441,x:-207.85,y:214},0).wait(1).to({rotation:1.3339,y:214.05},0).wait(1).to({rotation:1.3236,x:-207.8,y:214},0).wait(1).to({rotation:1.3134},0).wait(1).to({rotation:1.3032,x:-207.75,y:213.95},0).wait(1).to({rotation:1.293},0).wait(1).to({rotation:1.2828,x:-207.7,y:213.9},0).wait(1).to({rotation:1.2726},0).wait(1).to({rotation:1.2624,y:213.85},0).wait(1).to({rotation:1.2522},0).wait(1).to({rotation:1.242},0).wait(1).to({rotation:1.2318,x:-207.65},0).wait(1).to({rotation:1.2216,y:213.8},0).wait(1).to({rotation:1.2114,x:-207.6},0).wait(1).to({rotation:1.2012,y:213.75},0).wait(1).to({rotation:1.191,x:-207.55},0).wait(1).to({rotation:1.1808,y:213.7},0).wait(1).to({rotation:1.1706,x:-207.5,y:213.65},0).wait(1).to({rotation:1.1604,x:-207.55,y:213.7},0).wait(1).to({rotation:1.1502,x:-207.5,y:213.65},0).wait(1).to({rotation:1.1399},0).wait(1).to({rotation:1.1297,y:213.6},0).wait(1).to({rotation:1.1195,x:-207.45},0).wait(1).to({rotation:1.1093,y:213.55},0).wait(1).to({rotation:1.0991,x:-207.4},0).wait(1).to({rotation:1.0889},0).wait(1).to({rotation:1.0787,x:-207.35},0).wait(1).to({rotation:1.0685},0).wait(1).to({rotation:1.0583},0).wait(1).to({rotation:1.0481,x:-207.3,y:213.5},0).wait(1).to({rotation:1.0379,x:-207.25},0).wait(1).to({rotation:1.0277,y:213.45},0).wait(1).to({rotation:1.0175,x:-207.2},0).wait(1).to({rotation:1.0073,y:213.4},0).wait(1).to({rotation:0.9971,y:213.35},0).wait(1).to({rotation:0.9869,x:-207.15,y:213.4},0).wait(1).to({rotation:0.9767,y:213.35},0).wait(1).to({rotation:0.9664,x:-207.1},0).wait(1).to({rotation:0.9562,y:213.3},0).wait(1).to({rotation:0.946},0).wait(1).to({rotation:0.9358,y:213.25},0).wait(1).to({rotation:0.9256,x:-207.05},0).wait(1).to({rotation:0.9154,y:213.2},0).wait(1).to({rotation:0.9052,x:-207},0).wait(1).to({rotation:0.895},0).wait(1).to({rotation:0.8848},0).wait(1).to({rotation:0.8746,x:-206.95,y:213.15},0).wait(1).to({rotation:0.8644},0).wait(1).to({rotation:0.8542,x:-206.9,y:213.1},0).wait(1).to({rotation:0.844,x:-206.95},0).wait(1).to({rotation:0.8338,x:-206.9,y:213.05},0).wait(1).to({rotation:0.8236},0).wait(1).to({rotation:0.8134,x:-206.85},0).wait(1).to({rotation:0.8032,y:213},0).wait(1).to({rotation:0.793,x:-206.8},0).wait(1).to({rotation:0.7827,y:212.95},0).wait(1).to({rotation:0.7725},0).wait(1).to({rotation:0.7623,x:-206.75,y:212.9},0).wait(1).to({rotation:0.7521},0).wait(1).to({rotation:0.7419,y:212.85},0).wait(1).to({rotation:0.7317},0).wait(1).to({rotation:0.7268,x:-206.7,y:212.9},0).wait(1).to({rotation:0.7218,y:212.85},0).wait(1).to({rotation:0.7168},0).wait(1).to({rotation:0.7119},0).wait(1).to({rotation:0.7069,y:212.8},0).wait(1).to({rotation:0.7019,x:-206.65},0).wait(1).to({rotation:0.697},0).wait(1).to({rotation:0.692},0).wait(1).to({rotation:0.687,y:212.75},0).wait(1).to({rotation:0.6821,x:-206.6},0).wait(1).to({rotation:0.6771},0).wait(1).to({rotation:0.6721},0).wait(1).to({rotation:0.6672,y:212.7},0).wait(1).to({rotation:0.6622},0).wait(1).to({rotation:0.6572,x:-206.55},0).wait(1).to({rotation:0.6523},0).wait(1).to({rotation:0.6473,y:212.65},0).wait(1).to({rotation:0.6423},0).wait(1).to({rotation:0.6374,y:212.7},0).wait(1).to({rotation:0.6324},0).wait(1).to({rotation:0.6274,y:212.65},0).wait(1).to({rotation:0.6225},0).wait(1).to({rotation:0.6175},0).wait(1).to({rotation:0.6125,x:-206.5},0).wait(1).to({rotation:0.6076,y:212.6},0).wait(1).to({rotation:0.6026},0).wait(1).to({rotation:0.5976},0).wait(1).to({rotation:0.5927,x:-206.45},0).wait(1).to({rotation:0.5877,y:212.55},0).wait(1).to({rotation:0.5827},0).wait(1).to({rotation:0.5778},0).wait(1).to({rotation:0.5728},0).wait(1).to({rotation:0.5678,x:-206.4,y:212.5},0).wait(1).to({rotation:0.5629},0).wait(1).to({rotation:0.5579},0).wait(1).to({rotation:0.5529,y:212.55},0).wait(1).to({rotation:0.548,x:-206.35,y:212.5},0).wait(1).to({rotation:0.543},0).wait(1).to({rotation:0.538},0).wait(1).to({rotation:0.5331},0).wait(1).to({rotation:0.5281,x:-206.4,y:212.45},0).wait(1).to({rotation:0.5232,x:-206.35},0).wait(1).to({rotation:0.5182},0).wait(1).to({rotation:0.5132},0).wait(1).to({rotation:0.5083,y:212.4},0).wait(1).to({rotation:0.5033,x:-206.3},0).wait(1).to({rotation:0.4983},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-384.4,-107.5,326.29999999999995,474.1);


(lib.leeName = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282E46").s().p("AgKCdQgLgFgMgLIgHgJQgHgJgGgKIgKgVIgFgPIgFgTQgIgqAAggQgBggAHgbQAHgbANgVQASgZAbgKIAKgDIAKAAIABAAQAQAAAOAIQAOAIALAQIAEAIIAEANIAEARIABANIACAdIAAAcIAAAFQAAAHgCAFQgDAEgFABIgJACIgPAAIgiABIgQAAIACAZIAFAmIAGAVQACAKADAGIAGALIAJALIAAAAIABABIABAAQAFgEAEgJQAEgJADgOIAFgSIADgIIAFgFQADgBAEAAQAFAAAEADQADADACAFIAAACIAAABIAAABIgCAPIgJAdIgGANIgHAMQgJAJgLAGQgMAEgOAAQgLAAgLgFgAApgZIAKAAIAAgEIgBgnQgBgRgDgMIgFgMIgGgKIgKgHIgEgCQgIAKgGAMQgFALgCAOIgDAaIgBAdIAAABIAUAAIANgBIAMABgAggiDQgHAGgHAKQgFAHgCAGQgCAFAAAEIAAABIABAEQAAABAAAAQAAAAAAAAQAAABABAAQAAAAAAAAIAEgEIAEgIIADgGIAIgOIAHgIIAJgLIgBAAIgCgBQgFACgGAFg");
	this.shape.setTransform(-4.8267,-41.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AgKCdQgLgFgMgLIgHgJQgHgJgGgKIgKgVIgFgPIgFgTQgIgqAAggQgBggAHgbQAHgbANgVQASgZAbgKIAKgDIAKAAIABAAQAQAAAOAIQAOAIALAQIAEAIIAEANIAEARIABANIACAdIAAAcIAAAFQAAAHgCAFQgDAEgFABIgJACIgPAAIgiABIgQAAIACAZIAFAmIAGAVQACAKADAGIAGALIAJALIAAAAIABABIABAAQAFgEAEgJQAEgJADgOIAFgSIADgIIAFgFQADgBAEAAQAFAAAEADQADADACAFIAAACIAAABIAAABIgCAPIgJAdIgGANIgHAMQgJAJgLAGQgMAEgOAAQgLAAgLgFgAApgZIAKAAIAAgEIgBgnQgBgRgDgMIgFgMIgGgKIgKgHIgEgCQgIAKgGAMQgFALgCAOIgDAaIgBAdIAAABIAUAAIANgBIAMABgAggiDQgHAGgHAKQgFAHgCAGQgCAFAAAEIAAABIABAEQAAABAAAAQAAAAAAAAQAAABABAAQAAAAAAAAIAEgEIAEgIIADgGIAIgOIAHgIIAJgLIgBAAIgCgBQgFACgGAFg");
	this.shape_1.setTransform(-25.6267,-41.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282E46").s().p("Ag6DBIgEgIIgFgLIgKgkIgDgSQgCgHgBgOIgDgoIgCgnIAAgYIAAgbQAAg4AGg2QADgQAEgNIAHgWQAEgKAGgEQAGgGAHAAQAHAAAIADQAJAEAKAGQAEACACAEIACAHIADANIACAXIABAOIAAALIgCA8IgBAlIAAAOIABAqIACA/IAAAXIABAYIADAgIAAAEIABAGIAXgGIAfgIIAHgBIAEgBIACAAQAFAAADACQAEADACAGIAAAGQAAACgCADIgGAGIgdAJIgtAJIgQABIgOABQgZABgKgUgAg7i0IgFANQgEALgBAKQgCAJAAAKIABAFIABADIACAAQACgBABgDQACgEAAgFIADgbIACgPIABgDIABgHIAAgBQgBABgDAEg");
	this.shape_2.setTransform(-43.425,-46.25);

	this.instance = new lib.arrow("synched",0);
	this.instance.setTransform(0.15,30.45,0.9999,0.9999,0,120.0009,-59.9991,0.1,-0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-56.4,-78.1,108.6,140);


(lib.Scene_1_woman1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// woman1
	this.instance = new lib.woman1();
	this.instance.setTransform(1661.1,385.8,0.7336,0.7336,0,0,0,0.1,0.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(587).to({_off:false},0).to({x:682.45,y:385.25},8).wait(282).to({x:-570.75,y:386.4},14).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_titles = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// titles
	this.instance = new lib.titles("single",0);
	this.instance.setTransform(682.05,120.35,1,1,0,0,0,777,76.7);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1320).to({_off:false},0).to({y:121.35,alpha:1},7).wait(45).to({y:125.35,startPosition:1},0).wait(43).to({startPosition:2},0).wait(49).to({startPosition:3},0).wait(84).to({startPosition:3},0).to({alpha:0,startPosition:4},6).to({alpha:1},43).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_tiffanyName = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// tiffanyName
	this.instance = new lib.tiffanyName("synched",0);
	this.instance.setTransform(1066.65,476.05);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(682).to({_off:false},0).wait(1).to({regX:-2,regY:-7.6,x:1064.65,y:468.45,alpha:0.1},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0.3},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.7},0).wait(1).to({alpha:0.8},0).wait(1).to({alpha:0.9},0).wait(1).to({alpha:1},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({alpha:0.8333},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.1667},0).wait(1).to({alpha:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_think_text = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// think_text
	this.instance = new lib.think_text("single",0);
	this.instance.setTransform(720.1,140,0.2272,0.4298,0,0,0,0.2,0.1);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(397).to({_off:false},0).to({regX:0,regY:0,scaleX:1,scaleY:1,x:849.7,y:129.35,alpha:1},21).wait(114).to({startPosition:1},0).wait(30).to({startPosition:1},0).to({regX:0.1,regY:0.1,scaleX:0.9999,scaleY:0.9999,x:47.5,y:128.1,alpha:0.5898},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_think_bubble = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// think_bubble
	this.instance = new lib.think_bubble("synched",0);
	this.instance.setTransform(720.1,148,0.5818,0.5819,0,0,0,-0.1,-0.1);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(397).to({_off:false},0).to({scaleX:1.5344,scaleY:1.5526,x:854.1,y:167.75,alpha:1},21).wait(144).to({startPosition:0},0).to({scaleX:1.5343,scaleY:1.5525,x:51.9,y:166.3,alpha:0.5898},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_takeAction = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// takeAction
	this.instance = new lib.takeAction("synched",0);
	this.instance.setTransform(881.9,341.6);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1611).to({_off:false},0).to({regY:0.2,scaleX:0.2307,scaleY:0.2307,x:977.6,y:324.25},8).wait(41).to({startPosition:0},0).to({alpha:0},6).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_support = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// support
	this.instance = new lib.support("single",0);
	this.instance.setTransform(799.6,276.25,0.9999,0.9999,0,0,0,0,0.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1667).to({_off:false},0).wait(14).to({startPosition:1},0).wait(12).to({startPosition:2},0).wait(8).to({startPosition:3},0).wait(13).to({startPosition:4},0).wait(15).to({startPosition:4},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_speaking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// speaking
	this.instance = new lib.speaking("synched",0);
	this.instance.setTransform(692.45,299.35,0.7925,0.7925,0,0,0,679.1,119.1);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(728).to({_off:false},0).to({alpha:1},15).wait(133).to({startPosition:0},0).to({x:-560.75,y:300.5},15).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_setting = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// setting
	this.instance = new lib.setting("synched",0);
	this.instance.setTransform(1662,587.05);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(587).to({_off:false},0).to({x:683.35,y:586.5},8).wait(282).to({startPosition:0},0).to({x:-569.85,y:587.65},14).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_screen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// screen
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#2F2F2F").ss(2.8).p("AAAZ/QlRAAk0iDQkrh/jmjmQjmjmh/krQiDk0AAlSQAAlRCDk1QB/kqDmjmQDmjmErh/QE1iDFQAAQFSAAE1CDQEqB/DmDmQDmDmB/EqQCDE1AAFRQAAFSiDE0Qh/ErjmDmQjmDmkqB/Qk1CDlSAAg");
	this.shape.setTransform(682.5324,245.9928,0.997,0.997);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#2F2F2F").ss(2.8).p("AdHAAQAAF7iTFaQiNFOkCECQkCEClOCNQlaCTl7AAQl6AAlaiTQlOiNkCkCQkCkCiNlOQiTlaAAl7QAAl6CTlaQCNlOECkCQECkCFOiNQFaiTF6AAQF7AAFaCTQFOCNECECQECECCNFOQCTFaAAF6g");
	this.shape_1.setTransform(682.5324,245.9928,0.997,0.997);

	this.instance = new lib.rectanglescreen("synched",0);
	this.instance.setTransform(490,355);

	this.instance_1 = new lib.rectanglescreen("synched",0);
	this.instance_1.setTransform(490,136.55);

	this.instance_2 = new lib.rectanglescreen("synched",0);
	this.instance_2.setTransform(876,355);

	this.instance_3 = new lib.rectanglescreen("synched",0);
	this.instance_3.setTransform(876,136.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.shape_1},{t:this.shape}]}).to({state:[]},66).wait(16));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_salad = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// salad
	this.instance = new lib.salad("synched",0);
	this.instance.setTransform(267.25,295.25,1,1,0,0,0,-1.6,-13.8);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(832).to({_off:false},0).wait(1).to({regX:0,regY:0,x:268.85,y:309.05,alpha:0.0667},0).wait(1).to({alpha:0.1333},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0.2667},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.4667},0).wait(1).to({alpha:0.5333},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.7333},0).wait(1).to({alpha:0.8},0).wait(1).to({alpha:0.8667},0).wait(1).to({alpha:0.9333},0).wait(1).to({alpha:1},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({x:185.03,y:308.9},0).wait(1).to({x:101.21,y:308.75},0).wait(1).to({x:17.39,y:308.6},0).wait(1).to({x:-66.43,y:308.45},0).wait(1).to({x:-150.25,y:308.3},0).wait(1).to({x:-234.07,y:308.15},0).wait(1).to({x:-317.89,y:308},0).wait(1).to({x:-401.71,y:307.85},0).wait(1).to({x:-485.53,y:307.7},0).wait(1).to({x:-569.35,y:307.55},0).wait(1).to({x:-653.17,y:307.4},0).wait(1).to({x:-736.99,y:307.25},0).wait(1).to({x:-820.81,y:307.1},0).wait(1).to({x:-904.63,y:306.95},0).wait(1).to({x:-988.45,y:306.8},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_rules = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// rules
	this.instance = new lib.firstRule("single",0);
	this.instance.setTransform(652.85,80.95,0.7356,0.7356,0,0,0,876.8,69.8);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(600).to({_off:false},0).to({alpha:1},14).wait(114).to({startPosition:1},0).wait(69).to({startPosition:2},0).wait(79).to({startPosition:2},0).to({alpha:0},6).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_right_curtain = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// right_curtain
	this.instance = new lib.curtain("synched",0);
	this.instance.setTransform(1202.55,309.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(66).to({startPosition:0},0).to({x:1230.55},4).to({_off:true},10).wait(1474).to({_off:false,scaleX:1.7992,scaleY:1.7992,x:1672,y:515.15},0).wait(391).to({x:1673.9,y:514.5},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_report = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// report
	this.instance = new lib.report("synched",0);
	this.instance.setTransform(1651,384.45);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1225).to({_off:false},0).to({x:683,y:384},23).to({_off:true},65).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_replay_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// replay_btn
	this.replayBtn = new lib.replay();
	this.replayBtn.name = "replayBtn";
	this.replayBtn.setTransform(674,360.35);
	this.replayBtn._off = true;
	new cjs.ButtonHelper(this.replayBtn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.replayBtn).wait(1945).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Q1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Q1
	this.instance = new lib.rectanglescreen("synched",0);
	this.instance.setTransform(490,355);

	this.instance_1 = new lib.rectanglescreen("synched",0);
	this.instance_1.setTransform(490,136.55);

	this.instance_2 = new lib.rectanglescreen("synched",0);
	this.instance_2.setTransform(876,355);

	this.instance_3 = new lib.rectanglescreen("synched",0);
	this.instance_3.setTransform(876,136.55);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(51,51,51,0)").ss(2.8).p("ACvyoIAAgKMAisAAAMAAAAiDIgYAAEglagSyIOiAAIAAKEIAAOYIAAKPIuiAAgACvPbIAADm");
	this.shape.setTransform(829.5,148.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("AkVRCI5eAAIAAoQIgJAAIAAhhIgBAAIAAuYIAKAAIAAp6IZeAAMAiTAAAMAAAAh5IAAAKg");
	this.shape_1.setTransform(874.8,138);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("A9/Q9MAAAgh5MA7/AAAMAAAAh5g");
	this.shape_2.setTransform(875,137.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#999999").s().p("A+JRCMAAAgiDMA8TAAAMAAAAiDg");
	this.shape_3.setTransform(876,137);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},2).to({state:[]},20).to({state:[{t:this.shape_2}]},1).to({state:[]},21).to({state:[{t:this.shape_3}]},1).to({state:[]},21).wait(15));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_movingWomen = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// movingWomen
	this.instance = new lib.women_moving("synched",0);
	this.instance.setTransform(2741.85,516.1,0.7648,0.7648,0,0,0,1749.7,439.9);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(876).to({_off:false},0).wait(1).to({regX:1854.8,regY:392.4,scaleX:0.7649,scaleY:0.7649,x:2810.55,y:479.75},0).wait(1).to({x:2798.9},0).wait(1).to({x:2787.25},0).wait(1).to({x:2775.55},0).wait(1).to({x:2763.9},0).wait(1).to({x:2752.25},0).wait(1).to({x:2740.6},0).wait(1).to({x:2728.95},0).wait(1).to({x:2717.3},0).wait(1).to({x:2705.65},0).wait(1).to({x:2694},0).wait(1).to({x:2682.3},0).wait(1).to({x:2670.65},0).wait(1).to({x:2659},0).wait(1).to({x:2647.35},0).wait(1).to({x:2635.7},0).wait(1).to({x:2624.05},0).wait(1).to({x:2612.4},0).wait(1).to({x:2600.75},0).wait(1).to({x:2589.05},0).wait(1).to({x:2577.4},0).wait(1).to({x:2565.75},0).wait(1).to({x:2554.1},0).wait(1).to({x:2542.45},0).wait(1).to({x:2530.8},0).wait(1).to({x:2519.15},0).wait(1).to({x:2507.5},0).wait(1).to({x:2495.8},0).wait(1).to({x:2484.15},0).wait(1).to({x:2472.5},0).wait(1).to({x:2460.85},0).wait(1).to({x:2449.2},0).wait(1).to({x:2437.55},0).wait(1).to({x:2425.9},0).wait(1).to({x:2414.25},0).wait(1).to({x:2402.6},0).wait(1).to({x:2390.9},0).wait(1).to({x:2379.25},0).wait(1).to({x:2367.6},0).wait(1).to({x:2355.95},0).wait(1).to({x:2344.3},0).wait(1).to({x:2332.65},0).wait(1).to({x:2321},0).wait(1).to({x:2309.35},0).wait(1).to({x:2297.65},0).wait(1).to({x:2286},0).wait(1).to({x:2274.35},0).wait(1).to({x:2262.7},0).wait(1).to({x:2251.05},0).wait(1).to({x:2239.4},0).wait(1).to({x:2227.75},0).wait(1).to({x:2216.1},0).wait(1).to({x:2204.4},0).wait(1).to({x:2192.75},0).wait(1).to({x:2181.1},0).wait(1).to({x:2169.45},0).wait(1).to({x:2157.8},0).wait(1).to({x:2146.15},0).wait(1).to({x:2134.5},0).wait(1).to({x:2122.85},0).wait(1).to({x:2111.15},0).wait(1).to({x:2099.5},0).wait(1).to({x:2087.85},0).wait(1).to({x:2076.2},0).wait(1).to({x:2064.55},0).wait(1).to({x:2052.9},0).wait(1).to({x:2041.25},0).wait(1).to({x:2029.6},0).wait(1).to({x:2017.9},0).wait(1).to({x:2006.25},0).wait(1).to({x:1994.6},0).wait(1).to({x:1982.95},0).wait(1).to({x:1971.3},0).wait(1).to({x:1959.65},0).wait(1).to({x:1948},0).wait(1).to({x:1936.35},0).wait(1).to({x:1924.65},0).wait(1).to({x:1913},0).wait(1).to({x:1901.35},0).wait(1).to({x:1889.7},0).wait(1).to({x:1878.05},0).wait(1).to({x:1866.4},0).wait(1).to({x:1854.75},0).wait(1).to({x:1843.1},0).wait(1).to({x:1831.4},0).wait(1).to({x:1819.75},0).wait(1).to({x:1808.1},0).wait(1).to({x:1796.45},0).wait(1).to({x:1784.8},0).wait(1).to({x:1773.15},0).wait(1).to({x:1761.5},0).wait(1).to({x:1749.85},0).wait(1).to({x:1738.15},0).wait(1).to({x:1726.5},0).wait(1).to({x:1714.85},0).wait(1).to({x:1703.2},0).wait(1).to({x:1691.55},0).wait(1).to({x:1679.9},0).wait(1).to({x:1668.25},0).wait(1).to({x:1656.6},0).wait(1).to({x:1644.9},0).wait(1).to({x:1633.25},0).wait(1).to({x:1621.6},0).wait(1).to({x:1609.95},0).wait(1).to({x:1598.3},0).wait(1).to({x:1586.65},0).wait(1).to({x:1575},0).wait(1).to({x:1563.35},0).wait(1).to({x:1551.65},0).wait(1).to({x:1540},0).wait(1).to({x:1528.35},0).wait(1).to({x:1516.7},0).wait(1).to({x:1505.05},0).wait(1).to({x:1493.4},0).wait(1).to({x:1481.75},0).wait(1).to({x:1470.1},0).wait(1).to({x:1458.4},0).wait(1).to({x:1446.75},0).wait(1).to({x:1435.1},0).wait(1).to({x:1423.45},0).wait(1).to({x:1411.85},0).wait(1).to({x:1400.2},0).wait(1).to({x:1388.55},0).wait(1).to({x:1376.9},0).wait(1).to({x:1365.2},0).wait(1).to({x:1353.55},0).wait(1).to({x:1341.9},0).wait(1).to({x:1330.25},0).wait(1).to({x:1318.6},0).wait(1).to({x:1306.95},0).wait(1).to({x:1295.3},0).wait(1).to({x:1283.65},0).wait(1).to({x:1271.95},0).wait(1).to({x:1260.3},0).wait(1).to({x:1248.65},0).wait(1).to({x:1237},0).wait(1).to({x:1225.35},0).wait(1).to({x:1213.7},0).wait(1).to({x:1202.05},0).wait(1).to({x:1190.4},0).wait(1).to({x:1178.7},0).wait(1).to({x:1167.05},0).wait(1).to({x:1155.4},0).wait(1).to({x:1143.75},0).wait(1).to({x:1132.1},0).wait(1).to({x:1120.45},0).wait(1).to({x:1108.8},0).wait(1).to({x:1097.15},0).wait(1).to({x:1085.5},0).wait(1).to({x:1073.8},0).wait(1).to({x:1062.15},0).wait(1).to({x:1050.5},0).wait(1).to({x:1038.85},0).wait(1).to({x:1027.2},0).wait(1).to({x:1015.55},0).wait(1).to({x:1003.9},0).wait(1).to({x:992.25},0).wait(1).to({x:980.55},0).wait(1).to({x:968.9},0).wait(1).to({x:957.25},0).wait(1).to({x:945.6},0).wait(1).to({x:933.95},0).wait(1).to({x:922.3},0).wait(1).to({x:910.65},0).wait(1).to({x:899},0).wait(1).to({x:887.3},0).wait(1).to({x:875.65},0).wait(1).to({x:864},0).wait(1).to({x:852.35},0).wait(1).to({x:840.7},0).wait(1).to({x:829.05},0).wait(1).to({x:817.4},0).wait(1).to({x:805.75},0).wait(1).to({x:794.05},0).wait(1).to({x:782.4},0).wait(1).to({x:770.75},0).wait(1).to({x:759.1},0).wait(1).to({x:747.45},0).wait(1).to({x:735.8},0).wait(1).to({x:724.15},0).wait(1).to({x:712.5},0).wait(1).to({x:700.8},0).wait(1).to({x:689.15},0).wait(1).to({x:677.5},0).wait(1).to({x:665.85},0).wait(1).to({x:654.2},0).wait(1).to({x:642.55},0).wait(1).to({x:630.9},0).wait(1).to({x:619.25},0).wait(1).to({x:607.55},0).wait(1).to({x:595.9},0).wait(1).to({x:584.25},0).wait(1).to({x:572.6},0).wait(1).to({x:560.95},0).wait(1).to({x:549.3},0).wait(1).to({x:537.65},0).wait(1).to({x:526},0).wait(1).to({x:514.3},0).wait(1).to({x:502.65},0).wait(1).to({x:491},0).wait(1).to({x:479.35},0).wait(1).to({x:467.7},0).wait(1).to({x:456.05},0).wait(1).to({x:444.4},0).wait(1).to({x:432.75},0).wait(1).to({x:421.05},0).wait(1).to({x:409.4},0).wait(1).to({x:397.75},0).wait(1).to({x:386.1},0).wait(1).to({x:374.45},0).wait(1).to({x:362.8},0).wait(1).to({x:351.15},0).wait(1).to({x:339.5},0).wait(1).to({x:327.8},0).wait(1).to({x:316.15},0).wait(1).to({x:304.5},0).wait(1).to({x:292.85},0).wait(1).to({x:281.2},0).wait(1).to({x:269.55},0).wait(1).to({x:257.9},0).wait(1).to({x:246.25},0).wait(1).to({x:234.55},0).wait(1).to({x:222.9},0).wait(1).to({x:211.25},0).wait(1).to({x:199.6},0).wait(1).to({x:187.95},0).wait(1).to({x:176.3},0).wait(1).to({x:164.65},0).wait(1).to({x:153},0).wait(1).to({x:141.3},0).wait(1).to({x:129.65},0).wait(1).to({x:118},0).wait(1).to({x:106.35},0).wait(1).to({x:94.7},0).wait(1).to({x:83.05},0).wait(1).to({x:71.4},0).wait(1).to({x:59.75},0).wait(1).to({x:48.05},0).wait(1).to({x:36.4},0).wait(1).to({x:24.75},0).wait(1).to({x:13.1},0).wait(1).to({x:1.45},0).wait(1).to({x:-10.2},0).wait(1).to({x:-21.85},0).wait(1).to({x:-33.5},0).wait(1).to({x:-45.2},0).wait(1).to({x:-56.85},0).wait(1).to({x:-68.5},0).wait(1).to({x:-80.15},0).wait(1).to({x:-91.8},0).wait(1).to({x:-103.45},0).wait(1).to({x:-115.1},0).wait(1).to({x:-126.75},0).wait(1).to({x:-138.45},0).wait(1).to({x:-150.1},0).wait(1).to({x:-161.75},0).wait(1).to({x:-173.4},0).wait(1).to({x:-185.05},0).wait(1).to({x:-196.7},0).wait(1).to({x:-208.35},0).wait(1).to({x:-220},0).wait(1).to({x:-231.7},0).wait(1).to({x:-243.35},0).wait(1).to({x:-255},0).wait(1).to({x:-266.65},0).wait(1).to({x:-278.3},0).wait(1).to({x:-289.95},0).wait(1).to({x:-301.6},0).wait(1).to({x:-313.25},0).wait(1).to({x:-324.9},0).wait(1).to({x:-336.6},0).wait(1).to({x:-348.25},0).wait(1).to({x:-359.9},0).wait(1).to({x:-371.55},0).wait(1).to({x:-383.2},0).wait(1).to({x:-394.85},0).wait(1).to({x:-406.5},0).wait(1).to({x:-418.15},0).wait(1).to({x:-429.85},0).wait(1).to({x:-441.5},0).wait(1).to({x:-453.15},0).wait(1).to({x:-464.8},0).wait(1).to({x:-476.45},0).wait(1).to({x:-488.1},0).wait(1).to({x:-499.75},0).wait(1).to({x:-511.4},0).wait(1).to({x:-523.1},0).wait(1).to({x:-534.75},0).wait(1).to({x:-546.4},0).wait(1).to({x:-558.05},0).wait(1).to({x:-569.7},0).wait(1).to({x:-581.35},0).wait(1).to({x:-593},0).wait(1).to({x:-604.65},0).wait(1).to({x:-616.35},0).wait(1).to({x:-628},0).wait(1).to({x:-639.65},0).wait(1).to({x:-651.3},0).wait(1).to({x:-662.95},0).wait(1).to({x:-674.6},0).wait(1).to({x:-686.25},0).wait(1).to({x:-697.9},0).wait(1).to({x:-709.6},0).wait(1).to({x:-721.25},0).wait(1).to({x:-732.9},0).wait(1).to({x:-744.55},0).wait(1).to({x:-756.2},0).wait(1).to({x:-767.85},0).wait(1).to({x:-779.5},0).wait(1).to({x:-791.15},0).wait(1).to({x:-802.85},0).wait(1).to({x:-814.5},0).wait(1).to({x:-826.15},0).wait(1).to({x:-837.8},0).wait(1).to({x:-849.45},0).wait(1).to({x:-861.1},0).wait(1).to({x:-872.75},0).wait(1).to({x:-884.4},0).wait(1).to({x:-896.1},0).wait(1).to({x:-907.75},0).wait(1).to({x:-919.4},0).wait(1).to({x:-931.05},0).wait(1).to({x:-942.7},0).wait(1).to({x:-954.35},0).wait(1).to({x:-966},0).wait(1).to({x:-977.65},0).wait(1).to({x:-989.35},0).wait(1).to({x:-1001},0).wait(1).to({x:-1012.65},0).wait(1).to({x:-1024.3},0).wait(1).to({x:-1035.95},0).wait(1).to({x:-1047.6},0).wait(1).to({x:-1059.25},0).wait(1).to({x:-1070.9},0).wait(1).to({x:-1082.6},0).wait(1).to({x:-1094.25},0).wait(1).to({x:-1105.9},0).wait(1).to({x:-1117.55},0).wait(1).to({x:-1129.2},0).wait(1).to({x:-1140.85},0).wait(1).to({x:-1152.5},0).wait(1).to({x:-1164.15},0).wait(1).to({x:-1175.85},0).wait(1).to({x:-1187.5},0).wait(1).to({x:-1199.15},0).wait(1).to({x:-1210.8},0).wait(1).to({x:-1222.45},0).wait(1).to({x:-1234.1},0).wait(1).to({x:-1245.75},0).wait(1).to({x:-1257.4},0).wait(1).to({x:-1269.1},0).wait(1).to({x:-1280.75},0).wait(1).to({x:-1292.4},0).wait(1).to({x:-1304.05},0).wait(1).to({x:-1315.7},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_megaphone = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// megaphone
	this.instance = new lib.megaphone("synched",0);
	this.instance.setTransform(-221,471.95,1,1,0,0,0,212.4,293.9);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1603).to({_off:false},0).to({x:311.7,y:471.85},5).wait(128).to({startPosition:0},0).to({x:-234,y:471.95},6).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_lines = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// lines
	this.instance = new lib.graph_lines("single",0);
	this.instance.setTransform(682,1180.95,1,1,0,0,0,624.6,1000.8);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1318).to({_off:false},0).to({alpha:1},7).wait(52).to({startPosition:1},0).wait(43).to({startPosition:2},0).wait(43).to({startPosition:2},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_left_curtion = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// left_curtion
	this.instance = new lib.curtain("synched",0);
	this.instance.setTransform(163.1,309.55,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(66).to({startPosition:0},0).to({x:132.1},4).to({_off:true},10).wait(1474).to({_off:false,scaleX:1.7992,scaleY:1.7992,x:-302.35,y:515.15},0).wait(392));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_leeName = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// leeName
	this.instance = new lib.leeName("synched",0);
	this.instance.setTransform(326.8,349.5);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(659).to({_off:false},0).wait(1).to({regY:5.3,y:354.8,alpha:0.1},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0.3},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.7},0).wait(1).to({alpha:0.8},0).wait(1).to({alpha:0.9},0).wait(1).to({alpha:1},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({alpha:0.8},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_graphLines = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// graphLines
	this.instance = new lib.graph_lines("single",3);
	this.instance.setTransform(682,1180.95,1,1,0,0,0,624.6,1000.8);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1318).to({_off:false},0).to({alpha:1},7).wait(138).to({startPosition:3},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_equality = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// equality
	this.instance = new lib.flashCamera("synched",0);
	this.instance.setTransform(676.95,384.05);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.instance_1 = new lib.equality("synched",0);
	this.instance_1.setTransform(-704,955,61.6399,61.6399,0,0,0,0.3,0.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1773).to({_off:false},0).to({alpha:1},2).to({alpha:0},2).to({_off:true},1).wait(49));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1795).to({_off:false},0).to({regX:0,regY:0,scaleX:2.0207,scaleY:2.0207,x:682.95,y:470.05},10,cjs.Ease.cubicOut).wait(21).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_desk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// desk
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E8F3FE").s().p("Ah7AfQgMAAgJgJQgJgJAAgNQAAgMAJgJQAIgJANAAID2AAQANAAAJAJQAJAJAAAMQAAANgJAJQgJAJgNAAg");
	this.shape.setTransform(866.225,377.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E4CEC9").s().p("Ah1C0IgMlnIEDAAIgMFng");
	this.shape_1.setTransform(866.025,395.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2E303E").s().p("AjvBDQgVAAgMgSQgLgTAJgTIAdg4QAFgKAJgFQAJgGALAAIGmAAQALAAAKAGQAJAFAFAKIAcA4QAKATgLATQgMASgWAAg");
	this.shape_2.setTransform(773.9177,412.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2E303E").s().p("Ag3D9QAIhOgJhbQgUi1hZhCQgIgGgBgLQgDgVAhgTQA3gfBIgBQBagDAhA9QApBKASBvQATB6gPCMg");
	this.shape_3.setTransform(767.7309,380.6701);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#9F9EA3").s().p("ArcIBQgeAAgVgUQgVgVAAgdIAAt0QAAgeAVgUQAVgVAeAAIW6AAQAdAAAVAVQAVAUAAAeIAAN0QAAAdgVAVQgUAUgeAAg");
	this.shape_4.setTransform(761.85,329.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2E303E").s().p("Al3AwIAAhfILvAAIAABfg");
	this.shape_5.setTransform(612.475,413.875);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#B0B0B0").s().p("EgpAABQIAAifMBSBAAAIAACfg");
	this.shape_6.setTransform(693.725,430.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C5C0C2").s().p("EgpAAB7IAAj1MBSBAAAIAAD1g");
	this.shape_7.setTransform(693.725,426.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#70452E").s().p("AgoUDMgAhgoFICTAAMgAhAoFg");
	this.shape_8.setTransform(906.875,554.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#70452E").s().p("AgoUDMgAhgoFICTAAMgAhAoFg");
	this.shape_9.setTransform(480.575,554.45);

	this.instance = new lib.Symbol165("synched",0);
	this.instance.setTransform(693.7,480.4,1,1,0,0,0,693.7,480.4);
	this.instance._off = true;

	this.instance_1 = new lib.Symbol164("synched",0);
	this.instance_1.setTransform(-206.3,474.35,1,1,0,0,0,693.5,480.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},85).to({state:[{t:this.instance}]},477).to({state:[{t:this.instance_1}]},19).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(562).to({_off:false},0).to({_off:true,regX:693.5,x:-206.3,y:474.35},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_CTA = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// CTA
	this.instance = new lib.CTA("single",0);
	this.instance.setTransform(683,119.15);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1827).to({_off:false},0).wait(15).to({startPosition:1},0).wait(7).to({startPosition:2},0).wait(8).to({startPosition:3},0).wait(10).to({startPosition:4},0).wait(6).to({startPosition:5},0).wait(11).to({startPosition:6},0).wait(21).to({startPosition:6},0).wait(1).to({regX:12.1,regY:251.9,x:695.1,y:371.05},0).wait(1).to({startPosition:6},0).wait(1).to({startPosition:6},0).wait(1).to({startPosition:6},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_credits = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// credits
	this.instance = new lib.credits("synched",0);
	this.instance.setTransform(683.4,399.45,0.9999,0.9999);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1914).to({_off:false},0).wait(1).to({regX:2.6,regY:3.7,x:686,y:403.15,alpha:0.2},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.8},0).wait(1).to({alpha:1},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({alpha:0.8},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_cat = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// cat
	this.instance = new lib.cat1_1("synched",0);
	this.instance.setTransform(1119.5,298.9,1,1,0,0,0,0.1,-0.1);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(797).to({_off:false},0).wait(1).to({regX:0,regY:0,x:1119.4,y:299,alpha:0.0667},0).wait(1).to({alpha:0.1333},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0.2667},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.4667},0).wait(1).to({alpha:0.5333},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.7333},0).wait(1).to({alpha:0.8},0).wait(1).to({alpha:0.8667},0).wait(1).to({alpha:0.9333},0).wait(1).to({alpha:1},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({x:1036.1033,y:299.0067},0).wait(1).to({x:952.8067,y:299.0133},0).wait(1).to({x:869.51,y:299.02},0).wait(1).to({x:786.2133,y:299.0267},0).wait(1).to({x:702.9167,y:299.0333},0).wait(1).to({x:619.62,y:299.04},0).wait(1).to({x:536.3233,y:299.0467},0).wait(1).to({x:453.0267,y:299.0533},0).wait(1).to({x:369.73,y:299.06},0).wait(1).to({x:286.4333,y:299.0667},0).wait(1).to({x:203.1367,y:299.0733},0).wait(1).to({x:119.84,y:299.08},0).wait(1).to({x:36.5433,y:299.0867},0).wait(1).to({x:-46.7533,y:299.0933},0).wait(1).to({x:-130.05,y:299.1},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_bechdel2021 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// bechdel2021
	this.instance = new lib.bechdel2021("synched",0);
	this.instance.setTransform(826.2,540,0.8156,0.8156,0,0,0,0.1,0.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1481).to({_off:false},0).wait(67).to({startPosition:0},0).to({alpha:0},6).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_bechdel2011 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// bechdel2011
	this.instance = new lib.bechdel2011("synched",0);
	this.instance.setTransform(546,551.95,0.8033,0.8033);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1464).to({_off:false},0).wait(84).to({startPosition:0},0).to({alpha:0},6).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_arrow = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// arrow
	this.instance = new lib.arrow("synched",0);
	this.instance.setTransform(494.85,194.35);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(267).to({_off:false},0).to({x:494,y:194.05,alpha:1},7).wait(36).to({startPosition:0},0).to({alpha:0},7).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_allison_name = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// allison_name
	this.instance = new lib.allison_name("synched",0);
	this.instance.setTransform(583.75,119.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(267).to({_off:false},0).to({alpha:1},7).wait(36).to({startPosition:0},0).to({alpha:0},7).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1__2022 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// _2022
	this.instance = new lib._2022("synched",0);
	this.instance.setTransform(79.6,379.95,39.6268,39.6268,0,0,0,0.1,0.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1290).to({_off:false},0).to({regX:0,regY:0,scaleX:1,scaleY:1,x:680,y:570},10,cjs.Ease.quartOut).to({_off:true},13).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.projectors = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#201D14").s().p("AjGCFICAmfIENhCIjeK5g");
	this.shape.setTransform(99.4,92.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#201D14").s().p("AhCBpIBFjlIBAATIhFDmg");
	this.shape_1.setTransform(83.925,84.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#120F05").s().p("AgmBYIAAivIBNAAIAACvg");
	this.shape_2.setTransform(59.825,8.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#120F05").s().p("AhNAhIAAhAICbAAIAABAg");
	this.shape_3.setTransform(59.825,20.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#201D14").s().p("AjMBAIAojcIFxE5g");
	this.shape_4.setTransform(91.275,138.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#201D14").s().p("Ai9B3IF7oqIjLNmg");
	this.shape_5.setTransform(135.425,109.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#201D14").s().p("AjnhfIH7CJIonA2g");
	this.shape_6.setTransform(125.975,36.175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FCEFB7").s().p("AhIDuQg6gSgUhSQgUhSAehiQAfhiA+g5QA+g5A6ASQA6ASAUBSQAUBSgfBhQgeBig+A5QgwAsgtAAQgNAAgOgEg");
	this.shape_7.setTransform(100.0119,89.5986);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#120F05").s().p("AiZEWQgEgDAAgFIAAoIQAAgNAJgJQAJgIAMgBID/AAQAMABAJAIQAJAJAAANIAAEbQAAAGgEADQgCADgGABQgFgBgDgDQgDgDgBgGIAAkbQAAgHgGAAIj/AAQgGAAgBAHIAAIIQAAAFgDADQgDADgFABQgFgBgDgDg");
	this.shape_8.setTransform(60.1,47.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AjIBXIApkRID6BYIBuEdg");
	this.shape_9.setTransform(91.625,135.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("Ai9B8ICHm+ID0hrIjQNbg");
	this.shape_10.setTransform(135.425,108.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgvELQhlgpgZhLQgXhFAhh5QAqibA2gwQA7g1B0AcIBMAUQhmgOg0A4QgvAzgpCaQgcBnAGA+QAIBGA0Arg");
	this.shape_11.setTransform(29.8863,68.2267);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#201D14").s().p("AkAC3QhkgogXhLQgUhCAhh7QAqiaAzgvQA4gzB1AXQBAAMGnCDIixI2QmPiUhDgcg");
	this.shape_12.setTransform(50.7609,76.5926);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhABiIBAjaIBBASIg/Dfg");
	this.shape_13.setTransform(120.25,97.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhXACIARg1ICeAvIgPA4g");
	this.shape_14.setTransform(89.875,120.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhXAHIAOg2IChAmIgMA5g");
	this.shape_15.setTransform(109.3,58.725);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AkdBdIBDj8IH4CCIkpC9g");
	this.shape_16.setTransform(125,43.425);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#201D14").s().p("AhSEPQhDgUgWheQgXheAjhvQAihwBIhCQBGhABCAUQBDAUAWBeQAXBegjBwQgiBvhIBCQg2AxgyAAQgQAAgQgFg");
	this.shape_17.setTransform(100.025,89.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("ABMFWQgagHing4Iiig2ICuo3IFjBiIATAKQARARgKAlQgRA8iAGiQgDAOgIAMQgNATgTAAIgMgBg");
	this.shape_18.setTransform(97.7005,89.3266);

	this.instance = new lib.light_left("synched",0);
	this.instance.setTransform(435.2,253.45,1,1,0,0,0,335.4,184.3);
	this.instance.alpha = 0.3008;

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#201D14").s().p("AjGlcIEOBCIB/GfIivDYg");
	this.shape_19.setTransform(672.275,92.65);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#201D14").s().p("AhChpIBAgTIBFDlIhAAUg");
	this.shape_20.setTransform(687.75,84.025);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#120F05").s().p("AgmBYIAAivIBNAAIAACvg");
	this.shape_21.setTransform(711.85,8.775);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#120F05").s().p("AhNAhIAAhAICbAAIAABAg");
	this.shape_22.setTransform(711.875,20.45);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#201D14").s().p("AClicIAoDcImZBdg");
	this.shape_23.setTransform(680.425,138.9);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#201D14").s().p("Ai9mzIF7IqIiwE8g");
	this.shape_24.setTransform(636.275,109.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#201D14").s().p("AkUAqIH8iJIAsC/g");
	this.shape_25.setTransform(645.7,36.175);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FCEFB7").s().p("AgvDGQg+g5gehiQgfhhAUhSQAUhSA6gSQA6gSA+A5QA+A5AeBiQAfBigUBSQgUBSg6ASQgOAEgOAAQgtAAgvgsg");
	this.shape_26.setTransform(671.675,89.5986);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#120F05").s().p("ACKEWQgEgDAAgFIAAoIQAAgHgGAAIj/AAQgGAAAAAHIAAEbQAAAGgEADQgDADgFABQgFgBgEgDQgDgDAAgGIAAkbQAAgNAJgJQAJgIAMgBID/AAQANABAIAIQAJAJAAANIAAIIQAAAFgDADQgEADgFABQgFgBgDgDg");
	this.shape_27.setTransform(711.575,47.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhahiID5hYIAqERImRBkg");
	this.shape_28.setTransform(680.075,135.875);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("Ai9mtID0BrICHG+IirEyg");
	this.shape_29.setTransform(636.275,108.525);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("ABQClQAHg+gchnQgpiagvgzQg0g4hmAOIBMgUQB0gcA7A1QA2AwAqCbQAhB5gXBFQgaBLhkApIgbALQA0grAHhGg");
	this.shape_30.setTransform(741.8137,68.2267);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#201D14").s().p("AmCjPIDchDQDjhEAogIQB1gXA4AzQAzAvApCaQAiB7gUBCQgXBLhkAoQgqARjXBRIjRBOg");
	this.shape_31.setTransform(720.9238,76.5926);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AhAhmIBAgSIBBDaIhCAXg");
	this.shape_32.setTransform(651.425,97.275);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhXgEICegvIARA1IigAyg");
	this.shape_33.setTransform(681.825,120.825);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhXgJIChgmIAOA2IijApg");
	this.shape_34.setTransform(662.375,58.725);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AkdgdIH4iCIBDD8IkSBDg");
	this.shape_35.setTransform(646.675,43.425);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#201D14").s().p("Ag1DjQhIhCgihvQgjhwAXheQAWheBDgUQBCgUBGBAQBIBCAiBwQAjBvgXBeQgWBehDAUQgQAFgQAAQgzAAg1gxg");
	this.shape_36.setTransform(671.675,89.6);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("Ah3FEIgLgaQiAmigRg8QgKglARgRQAIgIALgCIFjhiICuI3Qk5BqgqALIgMABQgTAAgNgTg");
	this.shape_37.setTransform(673.9995,89.3266);

	this.instance_1 = new lib.light_right("synched",0);
	this.instance_1.setTransform(335.4,253.45,1,1,0,0,0,335.4,184.3);
	this.instance_1.alpha = 0.3008;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.instance},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,770.6,437.9);


(lib.play = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.play_triangle("synched",0);
	var instanceFilter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance.filters = [instanceFilter_1];
	this.instance.cache(-66,-74,132,149);

	this.instance_1 = new lib.play_triangle("synched",0);
	this.instance_1.setTransform(-0.05,-0.05);
	var instance_1Filter_2 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_1.filters = [instance_1Filter_2];
	this.instance_1.cache(-66,-74,132,149);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1},{t:this.instance}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.1219,scaleY:1.1219,y:-0.05},1).to({scaleX:0.9375,scaleY:0.9375,x:-4,y:-5},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(instanceFilter_1).wait(2).to(new cjs.ColorFilter(0,0,0,1,0,0,0,0), 0).wait(1));
	this.timeline.addTween(cjs.Tween.get(instance_1Filter_2).wait(2).to(new cjs.ColorFilter(0.9,0.9,0.9,1,25.5,25.5,25.5,0), 0).wait(1));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance, startFrame:1, endFrame:1, x:-66, y:-74, w:132, h:149});
	this.filterCacheList.push({instance: this.instance, startFrame:2, endFrame:2, x:-66, y:-74, w:132, h:149});
	this.filterCacheList.push({instance: this.instance_1, startFrame:2, endFrame:2, x:-66, y:-74, w:132, h:149});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71.7,-81.2,143.5,162.4);


(lib.birdOfParadise1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// leaf6
	this.instance = new lib.bl6("synched",0);
	this.instance.setTransform(37.95,116,1,1,0,0,0,0.1,164.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:48.5,regY:82.4,rotation:0.1065,x:86.5,y:33.75},0).wait(1).to({rotation:0.2131,x:86.65,y:33.85},0).wait(1).to({rotation:0.3196,x:86.8,y:33.9},0).wait(1).to({rotation:0.4262,x:86.95,y:34},0).wait(1).to({rotation:0.5327,x:87.1,y:34.1},0).wait(1).to({rotation:0.6392,x:87.25,y:34.2},0).wait(1).to({rotation:0.7458,x:87.4,y:34.3},0).wait(1).to({rotation:0.8523,x:87.6,y:34.35},0).wait(1).to({rotation:0.9588,x:87.7,y:34.45},0).wait(1).to({rotation:1.0654,x:87.85,y:34.55},0).wait(1).to({rotation:1.1719,x:88,y:34.65},0).wait(1).to({rotation:1.2785,x:88.15,y:34.75},0).wait(1).to({rotation:1.385,x:88.3},0).wait(1).to({rotation:1.4915,x:88.45,y:34.9},0).wait(1).to({rotation:1.5981,x:88.6,y:35},0).wait(1).to({rotation:1.7046,x:88.8,y:35.1},0).wait(1).to({rotation:1.8112,x:88.95,y:35.2},0).wait(1).to({rotation:1.9177,x:89.05,y:35.25},0).wait(1).to({rotation:2.0242,x:89.2,y:35.35},0).wait(1).to({rotation:2.1308,x:89.35,y:35.5},0).wait(1).to({rotation:2.2373,x:89.5,y:35.6},0).wait(1).to({rotation:2.3439,x:89.65,y:35.7},0).wait(1).to({rotation:2.4504,x:89.8},0).wait(1).to({rotation:2.5569,x:89.95,y:35.85},0).wait(1).to({rotation:2.6635,x:90.1,y:35.95},0).wait(1).to({rotation:2.77,x:90.25,y:36.05},0).wait(1).to({rotation:2.8765,x:90.4,y:36.2},0).wait(1).to({rotation:2.9831,x:90.55,y:36.25},0).wait(1).to({rotation:3.0896,x:90.7,y:36.35},0).wait(1).to({rotation:3.1962,x:90.8,y:36.4},0).wait(1).to({rotation:3.3027,x:90.95,y:36.55},0).wait(1).to({rotation:3.4092,x:91.15,y:36.65},0).wait(1).to({rotation:3.5158,x:91.3,y:36.75},0).wait(1).to({rotation:3.6223,x:91.45,y:36.85},0).wait(1).to({rotation:3.7289,x:91.6,y:36.95},0).wait(1).to({rotation:3.8354,x:91.75,y:37.05},0).wait(1).to({rotation:3.9419,x:91.9,y:37.15},0).wait(1).to({rotation:4.0485,x:92.05,y:37.25},0).wait(1).to({rotation:4.155,x:92.15,y:37.35},0).wait(1).to({rotation:4.2616,x:92.3,y:37.4},0).wait(1).to({rotation:4.3681,x:92.45,y:37.55},0).wait(1).to({rotation:4.4746,x:92.6,y:37.65},0).wait(1).to({rotation:4.5812,x:92.75,y:37.75},0).wait(1).to({rotation:4.6877,x:92.9,y:37.8},0).wait(1).to({rotation:4.7942,x:93.05,y:37.95},0).wait(1).to({rotation:4.9008,x:93.15,y:38.05},0).wait(1).to({rotation:5.0073,x:93.3,y:38.2},0).wait(1).to({rotation:5.1139,x:93.45},0).wait(1).to({rotation:5.2204,x:93.6,y:38.35},0).wait(1).to({rotation:5.3269,x:93.8,y:38.45},0).wait(1).to({rotation:5.4335,x:93.95,y:38.6},0).wait(1).to({rotation:5.54,x:94.05,y:38.7},0).wait(1).to({rotation:5.6466,x:94.2,y:38.75},0).wait(1).to({rotation:5.7531,x:94.35,y:38.9},0).wait(1).to({rotation:5.8596,x:94.5,y:38.95},0).wait(1).to({rotation:5.9662,x:94.65,y:39.1},0).wait(1).to({rotation:5.7854,x:94.4,y:38.95},0).wait(1).to({rotation:5.6046,x:94.1,y:38.75},0).wait(1).to({rotation:5.4238,x:93.9,y:38.6},0).wait(1).to({rotation:5.243,x:93.65,y:38.4},0).wait(1).to({rotation:5.0622,x:93.4,y:38.25},0).wait(1).to({rotation:4.8814,x:93.15,y:38.05},0).wait(1).to({rotation:4.7006,x:92.95,y:37.8},0).wait(1).to({rotation:4.5198,x:92.65,y:37.7},0).wait(1).to({rotation:4.339,x:92.4,y:37.5},0).wait(1).to({rotation:4.1582,x:92.2,y:37.35},0).wait(1).to({rotation:3.9774,x:91.95,y:37.15},0).wait(1).to({rotation:3.7967,x:91.7,y:37},0).wait(1).to({rotation:3.6159,x:91.4,y:36.85},0).wait(1).to({rotation:3.4351,x:91.15,y:36.65},0).wait(1).to({rotation:3.2543,x:90.9,y:36.5},0).wait(1).to({rotation:3.0735,x:90.7,y:36.35},0).wait(1).to({rotation:2.8927,x:90.45,y:36.2},0).wait(1).to({rotation:2.7119,x:90.15,y:36},0).wait(1).to({rotation:2.5311,x:89.9,y:35.85},0).wait(1).to({rotation:2.3503,x:89.65,y:35.7},0).wait(1).to({rotation:2.1695,x:89.4,y:35.55},0).wait(1).to({rotation:1.9887,x:89.15,y:35.35},0).wait(1).to({rotation:1.8079,x:88.9,y:35.2},0).wait(1).to({rotation:1.6271,x:88.65,y:35.05},0).wait(1).to({rotation:1.4463,x:88.4,y:34.8},0).wait(1).to({rotation:1.2656,x:88.15,y:34.7},0).wait(1).to({rotation:1.0848,x:87.9,y:34.55},0).wait(1).to({rotation:0.904,x:87.6,y:34.4},0).wait(1).to({rotation:0.7232,x:87.35,y:34.25},0).wait(1).to({rotation:0.5424,x:87.1,y:34.1},0).wait(1).to({rotation:0.3616,x:86.85,y:33.95},0).wait(1).to({rotation:0.1808,x:86.6,y:33.8},0).wait(1).to({rotation:0,x:86.35,y:33.6},0).wait(1));

	// leaf5
	this.instance_1 = new lib.bl5("synched",0);
	this.instance_1.setTransform(27,116,1,1,0,0,0,1.7,243.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:59.5,regY:117.5,rotation:0.0845,x:85,y:-9.8},0).wait(1).to({rotation:0.1691,x:85.15,y:-9.7},0).wait(1).to({rotation:0.2536,x:85.35,y:-9.65},0).wait(1).to({rotation:0.3381,x:85.5,y:-9.55},0).wait(1).to({rotation:0.4227,x:85.7,y:-9.45},0).wait(1).to({rotation:0.5072,x:85.9,y:-9.35},0).wait(1).to({rotation:0.5917,x:86.1,y:-9.3},0).wait(1).to({rotation:0.6762,x:86.25,y:-9.2},0).wait(1).to({rotation:0.7608,x:86.45,y:-9.1},0).wait(1).to({rotation:0.8453,x:86.6,y:-8.95},0).wait(1).to({rotation:0.9298,x:86.85,y:-8.9},0).wait(1).to({rotation:1.0144,x:87,y:-8.8},0).wait(1).to({rotation:1.0989,x:87.2,y:-8.7},0).wait(1).to({rotation:1.1834,x:87.35,y:-8.65},0).wait(1).to({rotation:1.268,x:87.55,y:-8.6},0).wait(1).to({rotation:1.3525,x:87.75,y:-8.5},0).wait(1).to({rotation:1.437,x:87.95,y:-8.4},0).wait(1).to({rotation:1.5216,x:88.15,y:-8.3},0).wait(1).to({rotation:1.6061,x:88.3,y:-8.25},0).wait(1).to({rotation:1.6906,x:88.45,y:-8.1},0).wait(1).to({rotation:1.7751,x:88.6,y:-8},0).wait(1).to({rotation:1.8597,x:88.8,y:-7.9},0).wait(1).to({rotation:1.9442,x:89,y:-7.85},0).wait(1).to({rotation:2.0287,x:89.2,y:-7.8},0).wait(1).to({rotation:2.1133,x:89.35,y:-7.65},0).wait(1).to({rotation:2.1978,x:89.55,y:-7.55},0).wait(1).to({rotation:2.2823,x:89.7,y:-7.5},0).wait(1).to({rotation:2.3669,x:89.95,y:-7.4},0).wait(1).to({rotation:2.4514,x:90.1,y:-7.25},0).wait(1).to({rotation:2.5359,x:90.3,y:-7.15},0).wait(1).to({rotation:2.6205,x:90.5,y:-7.1},0).wait(1).to({rotation:2.705,x:90.65,y:-7.05},0).wait(1).to({rotation:2.7895,x:90.85,y:-6.9},0).wait(1).to({rotation:2.874,x:91,y:-6.8},0).wait(1).to({rotation:2.9586,x:91.2,y:-6.75},0).wait(1).to({rotation:3.0431,x:91.35,y:-6.6},0).wait(1).to({rotation:3.1276,x:91.55,y:-6.55},0).wait(1).to({rotation:3.2122,x:91.7,y:-6.45},0).wait(1).to({rotation:3.1492,x:91.6,y:-6.55},0).wait(1).to({rotation:3.0862,x:91.45},0).wait(1).to({rotation:3.0232,x:91.3,y:-6.65},0).wait(1).to({rotation:2.9602,x:91.2,y:-6.75},0).wait(1).to({rotation:2.8973,x:91.05,y:-6.8},0).wait(1).to({rotation:2.8343,x:90.95,y:-6.85},0).wait(1).to({rotation:2.7713,x:90.8,y:-6.9},0).wait(1).to({rotation:2.7083,x:90.7,y:-7.05},0).wait(1).to({rotation:2.6453,x:90.55,y:-7.1},0).wait(1).to({rotation:2.5823,x:90.4},0).wait(1).to({rotation:2.5194,x:90.3,y:-7.2},0).wait(1).to({rotation:2.4564,x:90.1,y:-7.25},0).wait(1).to({rotation:2.3934,x:90,y:-7.35},0).wait(1).to({rotation:2.3304,x:89.8,y:-7.45},0).wait(1).to({rotation:2.2674,x:89.7,y:-7.5},0).wait(1).to({rotation:2.2044,x:89.6,y:-7.55},0).wait(1).to({rotation:2.1414,x:89.4,y:-7.65},0).wait(1).to({rotation:2.0785,x:89.3,y:-7.75},0).wait(1).to({rotation:2.0155,x:89.15},0).wait(1).to({rotation:1.9525,x:89,y:-7.8},0).wait(1).to({rotation:1.8895,x:88.9,y:-7.9},0).wait(1).to({rotation:1.8265,x:88.75,y:-7.95},0).wait(1).to({rotation:1.7635,x:88.6,y:-8},0).wait(1).to({rotation:1.7006,x:88.45,y:-8.1},0).wait(1).to({rotation:1.6376,x:88.4,y:-8.15},0).wait(1).to({rotation:1.5746,x:88.2,y:-8.25},0).wait(1).to({rotation:1.5116,x:88.1,y:-8.35},0).wait(1).to({rotation:1.4486,x:88,y:-8.4},0).wait(1).to({rotation:1.3856,x:87.8,y:-8.45},0).wait(1).to({rotation:1.3227,x:87.7,y:-8.55},0).wait(1).to({rotation:1.2597,x:87.55,y:-8.6},0).wait(1).to({rotation:1.1967,x:87.4,y:-8.65},0).wait(1).to({rotation:1.1337,x:87.3},0).wait(1).to({rotation:1.0707,x:87.1,y:-8.75},0).wait(1).to({rotation:1.0077,x:87,y:-8.8},0).wait(1).to({rotation:0.9448,x:86.85,y:-8.85},0).wait(1).to({rotation:0.8818,x:86.7,y:-8.95},0).wait(1).to({rotation:0.8188,x:86.55,y:-9},0).wait(1).to({rotation:0.7558,x:86.45,y:-9.1},0).wait(1).to({rotation:0.6928,x:86.3,y:-9.2},0).wait(1).to({rotation:0.6298,x:86.15,y:-9.25},0).wait(1).to({rotation:0.5669,x:86.05,y:-9.3},0).wait(1).to({rotation:0.5039,x:85.85,y:-9.4},0).wait(1).to({rotation:0.4409,x:85.75,y:-9.45},0).wait(1).to({rotation:0.3779,x:85.65,y:-9.5},0).wait(1).to({rotation:0.3149,x:85.45,y:-9.55},0).wait(1).to({rotation:0.2519,x:85.35,y:-9.65},0).wait(1).to({rotation:0.189,x:85.2,y:-9.7},0).wait(1).to({rotation:0.126,x:85.05,y:-9.75},0).wait(1).to({rotation:0.063,x:84.9,y:-9.85},0).wait(1).to({rotation:0,x:84.8,y:-9.9},0).wait(1));

	// leaf4
	this.instance_2 = new lib.bl4("synched",0);
	this.instance_2.setTransform(30,109.95,1,1,0,0,0,45.1,307.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:35.2,regY:159,rotation:0.1352,x:20.5,y:-38.45},0).wait(1).to({rotation:0.2704,x:20.85,y:-38.5},0).wait(1).to({rotation:0.4056,x:21.2},0).wait(1).to({rotation:0.5408,x:21.55},0).wait(1).to({rotation:0.676,x:21.85,y:-38.55},0).wait(1).to({rotation:0.8112,x:22.25},0).wait(1).to({rotation:0.9463,x:22.55},0).wait(1).to({rotation:1.0815,x:22.95,y:-38.6},0).wait(1).to({rotation:1.2167,x:23.3},0).wait(1).to({rotation:1.3519,x:23.65},0).wait(1).to({rotation:1.4871,x:24,y:-38.65},0).wait(1).to({rotation:1.6223,x:24.35},0).wait(1).to({rotation:1.7575,x:24.75},0).wait(1).to({rotation:1.8927,x:25.05,y:-38.7},0).wait(1).to({rotation:2.0279,x:25.4},0).wait(1).to({rotation:2.1631,x:25.7,y:-38.65},0).wait(1).to({rotation:2.2983,x:26.05,y:-38.75},0).wait(1).to({rotation:2.4335,x:26.4,y:-38.7},0).wait(1).to({rotation:2.5686,x:26.75},0).wait(1).to({rotation:2.7038,x:27.15,y:-38.75},0).wait(1).to({rotation:2.6647,x:27,y:-38.7},0).wait(1).to({rotation:2.6255,x:26.9},0).wait(1).to({rotation:2.5863,x:26.85},0).wait(1).to({rotation:2.4732,x:26.55,y:-38.75},0).wait(1).to({rotation:2.3602,x:26.2,y:-38.7},0).wait(1).to({rotation:2.2471,x:25.9,y:-38.65},0).wait(1).to({rotation:2.134,x:25.7,y:-38.7},0).wait(1).to({rotation:2.021,x:25.4,y:-38.65},0).wait(1).to({rotation:1.9079,x:25.1,y:-38.7},0).wait(1).to({rotation:1.7948,x:24.8},0).wait(1).to({rotation:1.6818,x:24.5,y:-38.6},0).wait(1).to({rotation:1.5687,x:24.2,y:-38.65},0).wait(1).to({rotation:1.4557,x:23.9,y:-38.6},0).wait(1).to({rotation:1.3426,x:23.65,y:-38.65},0).wait(1).to({rotation:1.2295,x:23.35,y:-38.6},0).wait(1).to({rotation:1.1165,x:23},0).wait(1).to({rotation:1.0034,x:22.7},0).wait(1).to({rotation:0.8903,x:22.45,y:-38.55},0).wait(1).to({rotation:0.7773,x:22.15,y:-38.5},0).wait(1).to({rotation:0.6642,x:21.85,y:-38.55},0).wait(1).to({rotation:0.5511,x:21.55,y:-38.5},0).wait(1).to({rotation:0.4381,x:21.3},0).wait(1).to({rotation:0.325,x:20.95},0).wait(1).to({rotation:0.212,x:20.65,y:-38.45},0).wait(1).to({rotation:0.0989,x:20.4},0).wait(1).to({rotation:-0.0142,x:20.1,y:-38.4},0).wait(1).to({rotation:-0.1272,x:19.8},0).wait(1).to({rotation:-0.2403,x:19.5},0).wait(1).to({rotation:-0.3534,x:19.25,y:-38.35},0).wait(1).to({rotation:-0.4664,x:18.9},0).wait(1).to({rotation:-0.5795,x:18.6,y:-38.3},0).wait(1).to({rotation:-0.6925,x:18.3},0).wait(1).to({rotation:-0.8056,x:18.05,y:-38.25},0).wait(1).to({rotation:-0.9187,x:17.75,y:-38.2},0).wait(1).to({rotation:-1.0317,x:17.45,y:-38.25},0).wait(1).to({rotation:-1.1448,x:17.2,y:-38.2},0).wait(1).to({rotation:-1.2579,x:16.9,y:-38.15},0).wait(1).to({rotation:-1.2186,x:17,y:-38.2},0).wait(1).to({rotation:-1.1792,x:17.05},0).wait(1).to({rotation:-1.1399,x:17.15},0).wait(1).to({rotation:-1.1006,x:17.3,y:-38.25},0).wait(1).to({rotation:-1.0613,x:17.4},0).wait(1).to({rotation:-1.022,x:17.5},0).wait(1).to({rotation:-0.9827,x:17.55,y:-38.2},0).wait(1).to({rotation:-0.9434,x:17.65,y:-38.25},0).wait(1).to({rotation:-0.9041,x:17.8},0).wait(1).to({rotation:-0.8648,x:17.9},0).wait(1).to({rotation:-0.8255,x:18},0).wait(1).to({rotation:-0.7862,x:18.1,y:-38.3},0).wait(1).to({rotation:-0.7469,x:18.15,y:-38.25},0).wait(1).to({rotation:-0.7075,x:18.3,y:-38.3},0).wait(1).to({rotation:-0.6682,x:18.4},0).wait(1).to({rotation:-0.6289,x:18.5},0).wait(1).to({rotation:-0.5896,x:18.6},0).wait(1).to({rotation:-0.5503,x:18.7,y:-38.35},0).wait(1).to({rotation:-0.511,x:18.8,y:-38.3},0).wait(1).to({rotation:-0.4717,x:18.9,y:-38.35},0).wait(1).to({rotation:-0.4324,x:19},0).wait(1).to({rotation:-0.3931,x:19.1},0).wait(1).to({rotation:-0.3538,x:19.25},0).wait(1).to({rotation:-0.3145,x:19.3},0).wait(1).to({rotation:-0.2752,x:19.4},0).wait(1).to({rotation:-0.2358,x:19.5,y:-38.4},0).wait(1).to({rotation:-0.1965,x:19.6,y:-38.35},0).wait(1).to({rotation:-0.1572,x:19.75,y:-38.4},0).wait(1).to({rotation:-0.1179,x:19.85},0).wait(1).to({rotation:-0.0786,x:19.9},0).wait(1).to({rotation:-0.0393,x:20},0).wait(1).to({rotation:0,x:20.1,y:-38.45},0).wait(1));

	// leaf3
	this.instance_3 = new lib.bl3("synched",0);
	this.instance_3.setTransform(15,115.95,1,1,0,0,0,57.6,261.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({regX:35,regY:131,rotation:-0.0439,x:-7.7,y:-14.95},0).wait(1).to({rotation:-0.0879,x:-7.8,y:-14.9},0).wait(1).to({rotation:-0.1318,x:-7.9},0).wait(1).to({rotation:-0.1758,x:-8,y:-14.85},0).wait(1).to({rotation:-0.2197,x:-8.1},0).wait(1).to({rotation:-0.2637,x:-8.2,y:-14.8},0).wait(1).to({rotation:-0.3076,x:-8.3},0).wait(1).to({rotation:-0.3515,x:-8.4,y:-14.75},0).wait(1).to({rotation:-0.3955,x:-8.5},0).wait(1).to({rotation:-0.4394,x:-8.6},0).wait(1).to({rotation:-0.4834,x:-8.7},0).wait(1).to({rotation:-0.5273,x:-8.8,y:-14.7},0).wait(1).to({rotation:-0.5712,x:-8.9},0).wait(1).to({rotation:-0.6152,x:-9},0).wait(1).to({rotation:-0.6591,x:-9.1,y:-14.65},0).wait(1).to({rotation:-0.7031,x:-9.2},0).wait(1).to({rotation:-0.747,x:-9.3,y:-14.6},0).wait(1).to({rotation:-0.791,x:-9.4},0).wait(1).to({rotation:-0.8349,x:-9.5,y:-14.55},0).wait(1).to({rotation:-0.8788,x:-9.6},0).wait(1).to({rotation:-0.9228,x:-9.7,y:-14.5},0).wait(1).to({rotation:-0.9667,x:-9.8},0).wait(1).to({rotation:-1.0107,x:-9.9,y:-14.45},0).wait(1).to({rotation:-1.0546,x:-10},0).wait(1).to({rotation:-1.0986,x:-10.1},0).wait(1).to({rotation:-1.1425,x:-10.2},0).wait(1).to({rotation:-1.1864,x:-10.3},0).wait(1).to({rotation:-1.2304,x:-10.4},0).wait(1).to({rotation:-1.2743,x:-10.5},0).wait(1).to({rotation:-1.3183,x:-10.6,y:-14.4},0).wait(1).to({rotation:-1.3622,x:-10.7},0).wait(1).to({rotation:-1.4061,x:-10.8,y:-14.35},0).wait(1).to({rotation:-1.4501,x:-10.9},0).wait(1).to({rotation:-1.424,x:-10.8,y:-14.3},0).wait(1).to({rotation:-1.3978,x:-10.75,y:-14.35},0).wait(1).to({rotation:-1.3717,x:-10.7},0).wait(1).to({rotation:-1.3456,x:-10.65},0).wait(1).to({rotation:-1.3194,x:-10.6,y:-14.4},0).wait(1).to({rotation:-1.2933,x:-10.5},0).wait(1).to({rotation:-1.2675,x:-10.45},0).wait(1).to({rotation:-1.2416,x:-10.4},0).wait(1).to({rotation:-1.2157,x:-10.3,y:-14.45},0).wait(1).to({rotation:-1.1899},0).wait(1).to({rotation:-1.164,x:-10.25},0).wait(1).to({rotation:-1.1381,x:-10.15,y:-14.5},0).wait(1).to({rotation:-1.1123,x:-10.1},0).wait(1).to({rotation:-1.0864,x:-10.05,y:-14.45},0).wait(1).to({rotation:-1.0605,x:-10},0).wait(1).to({rotation:-1.0347,x:-9.95,y:-14.5},0).wait(1).to({rotation:-1.0088,x:-9.9,y:-14.45},0).wait(1).to({rotation:-0.9829,x:-9.8,y:-14.5},0).wait(1).to({rotation:-0.9571,x:-9.75,y:-14.55},0).wait(1).to({rotation:-0.9312,x:-9.65,y:-14.5},0).wait(1).to({rotation:-0.9053,y:-14.55},0).wait(1).to({rotation:-0.8795,x:-9.6},0).wait(1).to({rotation:-0.8536,x:-9.5},0).wait(1).to({rotation:-0.8277,x:-9.45},0).wait(1).to({rotation:-0.8019,x:-9.4,y:-14.6},0).wait(1).to({rotation:-0.776,x:-9.35,y:-14.55},0).wait(1).to({rotation:-0.7501,x:-9.3,y:-14.6},0).wait(1).to({rotation:-0.7243,x:-9.25,y:-14.65},0).wait(1).to({rotation:-0.6984,x:-9.15},0).wait(1).to({rotation:-0.6725,x:-9.1},0).wait(1).to({rotation:-0.6467,x:-9.05},0).wait(1).to({rotation:-0.6208,x:-9,y:-14.7},0).wait(1).to({rotation:-0.5949,x:-8.95,y:-14.65},0).wait(1).to({rotation:-0.5691,x:-8.85,y:-14.7},0).wait(1).to({rotation:-0.5432,x:-8.8},0).wait(1).to({rotation:-0.5173,x:-8.75},0).wait(1).to({rotation:-0.4915,x:-8.7},0).wait(1).to({rotation:-0.4656,x:-8.65,y:-14.75},0).wait(1).to({rotation:-0.4397,x:-8.6},0).wait(1).to({rotation:-0.4139,x:-8.5},0).wait(1).to({rotation:-0.388,x:-8.45,y:-14.8},0).wait(1).to({rotation:-0.3621,x:-8.4,y:-14.75},0).wait(1).to({rotation:-0.3363,x:-8.35,y:-14.8},0).wait(1).to({rotation:-0.3104,x:-8.3},0).wait(1).to({rotation:-0.2845,x:-8.25},0).wait(1).to({rotation:-0.2587,x:-8.15},0).wait(1).to({rotation:-0.2328,x:-8.1,y:-14.85},0).wait(1).to({rotation:-0.2069,x:-8.05},0).wait(1).to({rotation:-0.1811,x:-8},0).wait(1).to({rotation:-0.1552,x:-7.95},0).wait(1).to({rotation:-0.1293,x:-7.85,y:-14.9},0).wait(1).to({rotation:-0.1035,x:-7.8,y:-14.85},0).wait(1).to({rotation:-0.0776,x:-7.75,y:-14.9},0).wait(1).to({rotation:-0.0517,x:-7.7},0).wait(1).to({rotation:-0.0259,x:-7.65},0).wait(1).to({rotation:0,x:-7.6,y:-14.95},0).wait(1));

	// leaf2
	this.instance_4 = new lib.bl2("synched",0);
	this.instance_4.setTransform(15,116.05,1,1,0,0,0,122,203.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1).to({regX:61.1,regY:101.7,rotation:-0.0845,x:-46,y:14.75},0).wait(1).to({rotation:-0.169,x:-46.15,y:14.85},0).wait(1).to({rotation:-0.2535,x:-46.3,y:14.95},0).wait(1).to({rotation:-0.338,x:-46.45,y:15.05},0).wait(1).to({rotation:-0.4225,x:-46.6,y:15.15},0).wait(1).to({rotation:-0.507,x:-46.75,y:15.2},0).wait(1).to({rotation:-0.5915,x:-46.9,y:15.3},0).wait(1).to({rotation:-0.676,x:-47.05,y:15.45},0).wait(1).to({rotation:-0.7606,x:-47.2,y:15.5},0).wait(1).to({rotation:-0.8451,x:-47.35,y:15.6},0).wait(1).to({rotation:-0.9296,x:-47.5,y:15.7},0).wait(1).to({rotation:-1.0141,x:-47.65,y:15.75},0).wait(1).to({rotation:-1.0986,x:-47.8,y:15.9},0).wait(1).to({rotation:-1.1831,x:-47.95,y:16},0).wait(1).to({rotation:-1.2676,x:-48.1},0).wait(1).to({rotation:-1.3521,x:-48.25,y:16.1},0).wait(1).to({rotation:-1.4366,x:-48.4,y:16.2},0).wait(1).to({rotation:-1.5211,x:-48.5,y:16.35},0).wait(1).to({rotation:-1.6056,x:-48.65,y:16.4},0).wait(1).to({rotation:-1.6901,x:-48.85,y:16.5},0).wait(1).to({rotation:-1.7746,x:-49,y:16.6},0).wait(1).to({rotation:-1.8591,x:-49.15,y:16.7},0).wait(1).to({rotation:-1.9436,x:-49.3,y:16.85},0).wait(1).to({rotation:-2.0281,x:-49.45,y:16.9},0).wait(1).to({rotation:-2.1126,x:-49.6,y:17},0).wait(1).to({rotation:-2.1972,x:-49.7,y:17.05},0).wait(1).to({rotation:-2.2817,x:-49.85,y:17.15},0).wait(1).to({rotation:-2.3662,x:-50,y:17.3},0).wait(1).to({rotation:-2.4507,x:-50.15,y:17.4},0).wait(1).to({rotation:-2.5352,x:-50.3,y:17.45},0).wait(1).to({rotation:-2.6197,x:-50.45,y:17.55},0).wait(1).to({rotation:-2.7042,x:-50.55,y:17.65},0).wait(1).to({rotation:-2.7887,x:-50.7,y:17.8},0).wait(1).to({rotation:-2.8732,x:-50.9,y:17.85},0).wait(1).to({rotation:-2.9577,x:-51.05,y:17.95},0).wait(1).to({rotation:-3.0422,x:-51.2,y:18.05},0).wait(1).to({rotation:-3.1267,x:-51.3,y:18.15},0).wait(1).to({rotation:-3.2112,x:-51.45,y:18.3},0).wait(1).to({rotation:-3.2957,x:-51.6,y:18.35},0).wait(1).to({rotation:-3.3802,x:-51.75,y:18.4},0).wait(1).to({rotation:-3.4647,x:-51.85,y:18.5},0).wait(1).to({rotation:-3.5492,x:-52,y:18.6},0).wait(1).to({rotation:-3.6338,x:-52.15,y:18.75},0).wait(1).to({rotation:-3.7183,x:-52.35,y:18.85},0).wait(1).to({rotation:-3.6253,x:-52.1,y:18.75},0).wait(1).to({rotation:-3.5323,x:-52,y:18.65},0).wait(1).to({rotation:-3.4394,x:-51.85,y:18.5},0).wait(1).to({rotation:-3.3464,x:-51.65,y:18.45},0).wait(1).to({rotation:-3.2648,x:-51.55,y:18.3},0).wait(1).to({rotation:-3.1832,x:-51.4,y:18.2},0).wait(1).to({rotation:-3.1016,x:-51.3,y:18.1},0).wait(1).to({rotation:-3.02,x:-51.15,y:18.05},0).wait(1).to({rotation:-2.9383,x:-51,y:17.9},0).wait(1).to({rotation:-2.8567,x:-50.9,y:17.8},0).wait(1).to({rotation:-2.7751,x:-50.7,y:17.75},0).wait(1).to({rotation:-2.6935,x:-50.55,y:17.7},0).wait(1).to({rotation:-2.6119,x:-50.4,y:17.55},0).wait(1).to({rotation:-2.5302,x:-50.25,y:17.45},0).wait(1).to({rotation:-2.4486,x:-50.15,y:17.35},0).wait(1).to({rotation:-2.367,x:-50,y:17.3},0).wait(1).to({rotation:-2.2854,x:-49.85,y:17.15},0).wait(1).to({rotation:-2.2038,x:-49.75,y:17.05},0).wait(1).to({rotation:-2.1221,x:-49.6},0).wait(1).to({rotation:-2.0405,x:-49.5,y:16.9},0).wait(1).to({rotation:-1.9589,x:-49.3,y:16.8},0).wait(1).to({rotation:-1.8773,x:-49.15,y:16.75},0).wait(1).to({rotation:-1.7957,x:-49.05,y:16.65},0).wait(1).to({rotation:-1.714,x:-48.9,y:16.5},0).wait(1).to({rotation:-1.6324,x:-48.75,y:16.45},0).wait(1).to({rotation:-1.5508,x:-48.6,y:16.35},0).wait(1).to({rotation:-1.4692,x:-48.45,y:16.25},0).wait(1).to({rotation:-1.3875,x:-48.3,y:16.15},0).wait(1).to({rotation:-1.3059,x:-48.15,y:16.05},0).wait(1).to({rotation:-1.2243,x:-48.05},0).wait(1).to({rotation:-1.1427,x:-47.85,y:15.95},0).wait(1).to({rotation:-1.0611,x:-47.7,y:15.8},0).wait(1).to({rotation:-0.9794,x:-47.6,y:15.75},0).wait(1).to({rotation:-0.8978,x:-47.45,y:15.65},0).wait(1).to({rotation:-0.8162,x:-47.3,y:15.6},0).wait(1).to({rotation:-0.7346,x:-47.15,y:15.45},0).wait(1).to({rotation:-0.653,x:-47.05,y:15.4},0).wait(1).to({rotation:-0.5713,x:-46.9,y:15.3},0).wait(1).to({rotation:-0.4897,x:-46.75,y:15.25},0).wait(1).to({rotation:-0.4081,x:-46.6,y:15.1},0).wait(1).to({rotation:-0.3265,x:-46.45,y:15},0).wait(1).to({rotation:-0.2449,x:-46.3,y:14.95},0).wait(1).to({rotation:-0.1632,x:-46.15,y:14.85},0).wait(1).to({rotation:-0.0816,x:-46,y:14.75},0).wait(1).to({rotation:0,x:-45.9,y:14.65},0).wait(1));

	// leaf1
	this.instance_5 = new lib.bl1("synched",0);
	this.instance_5.setTransform(5,117,1,1,0,0,0,149.6,97.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1).to({regX:74.8,regY:57.6,rotation:-0.0615,x:-69.85,y:76.85},0).wait(1).to({rotation:-0.1231,x:-69.9,y:76.95},0).wait(1).to({rotation:-0.1846,y:77},0).wait(1).to({rotation:-0.2461,x:-69.95,y:77.1},0).wait(1).to({rotation:-0.3077,x:-70,y:77.2},0).wait(1).to({rotation:-0.3692,x:-70.05,y:77.25},0).wait(1).to({rotation:-0.4307,y:77.35},0).wait(1).to({rotation:-0.4923,x:-70.1,y:77.4},0).wait(1).to({rotation:-0.5538,x:-70.15,y:77.55},0).wait(1).to({rotation:-0.6153,x:-70.2,y:77.6},0).wait(1).to({rotation:-0.6769,y:77.65},0).wait(1).to({rotation:-0.7384,x:-70.25,y:77.75},0).wait(1).to({rotation:-0.7999,x:-70.35,y:77.8},0).wait(1).to({rotation:-0.8614,x:-70.4,y:77.95},0).wait(1).to({rotation:-0.923,y:78},0).wait(1).to({rotation:-0.9845,x:-70.45,y:78.05},0).wait(1).to({rotation:-1.046,x:-70.5,y:78.15},0).wait(1).to({rotation:-1.1076,x:-70.55,y:78.25},0).wait(1).to({rotation:-1.1691,y:78.3},0).wait(1).to({rotation:-1.2306,x:-70.6,y:78.4},0).wait(1).to({rotation:-1.2922,x:-70.65,y:78.45},0).wait(1).to({rotation:-1.3537,x:-70.7,y:78.6},0).wait(1).to({rotation:-1.4152,x:-70.75,y:78.65},0).wait(1).to({rotation:-1.4768,x:-70.8,y:78.7},0).wait(1).to({rotation:-1.5383,x:-70.85,y:78.85},0).wait(1).to({rotation:-1.5998,x:-70.9,y:78.9},0).wait(1).to({rotation:-1.6614,x:-70.95,y:79},0).wait(1).to({rotation:-1.7229},0).wait(1).to({rotation:-1.7844,x:-71,y:79.1},0).wait(1).to({rotation:-1.846,x:-71.05,y:79.2},0).wait(1).to({rotation:-1.9075,x:-71.1,y:79.25},0).wait(1).to({rotation:-1.969,y:79.35},0).wait(1).to({rotation:-2.0306,x:-71.15,y:79.45},0).wait(1).to({rotation:-2.0921,x:-71.2,y:79.5},0).wait(1).to({rotation:-2.1536,x:-71.25,y:79.6},0).wait(1).to({rotation:-2.2151,y:79.7},0).wait(1).to({rotation:-2.1772,y:79.65},0).wait(1).to({rotation:-2.1392,x:-71.2,y:79.6},0).wait(1).to({rotation:-2.1012,y:79.55},0).wait(1).to({rotation:-2.0633,y:79.45},0).wait(1).to({rotation:-2.0253,x:-71.15,y:79.4},0).wait(1).to({rotation:-1.9831,x:-71.1,y:79.35},0).wait(1).to({rotation:-1.9409,y:79.3},0).wait(1).to({rotation:-1.8987,y:79.25},0).wait(1).to({rotation:-1.8565,x:-71.05,y:79.2},0).wait(1).to({rotation:-1.8143,y:79.15},0).wait(1).to({rotation:-1.7721,x:-71,y:79.1},0).wait(1).to({rotation:-1.7299,x:-70.95,y:79.05},0).wait(1).to({rotation:-1.6877,y:78.95},0).wait(1).to({rotation:-1.6455,x:-70.9},0).wait(1).to({rotation:-1.6033,y:78.9},0).wait(1).to({rotation:-1.5612,y:78.85},0).wait(1).to({rotation:-1.519,x:-70.8,y:78.75},0).wait(1).to({rotation:-1.4768,y:78.7},0).wait(1).to({rotation:-1.4346,x:-70.75},0).wait(1).to({rotation:-1.3924,x:-70.7,y:78.65},0).wait(1).to({rotation:-1.3502,y:78.6},0).wait(1).to({rotation:-1.308,x:-70.65,y:78.5},0).wait(1).to({rotation:-1.2658,y:78.45},0).wait(1).to({rotation:-1.2236,x:-70.6,y:78.4},0).wait(1).to({rotation:-1.1814,x:-70.55,y:78.35},0).wait(1).to({rotation:-1.1392,y:78.25},0).wait(1).to({rotation:-1.097,x:-70.5,y:78.2},0).wait(1).to({rotation:-1.0548,y:78.15},0).wait(1).to({rotation:-1.0126},0).wait(1).to({rotation:-0.9704,x:-70.45,y:78.05},0).wait(1).to({rotation:-0.9283,x:-70.4,y:78},0).wait(1).to({rotation:-0.8861,x:-70.35,y:77.95},0).wait(1).to({rotation:-0.8439,y:77.9},0).wait(1).to({rotation:-0.8017,y:77.85},0).wait(1).to({rotation:-0.7595,x:-70.3,y:77.75},0).wait(1).to({rotation:-0.7173,y:77.7},0).wait(1).to({rotation:-0.6751,x:-70.2,y:77.65},0).wait(1).to({rotation:-0.6329,y:77.6},0).wait(1).to({rotation:-0.5907,y:77.55},0).wait(1).to({rotation:-0.5485,x:-70.15,y:77.5},0).wait(1).to({rotation:-0.5063,y:77.45},0).wait(1).to({rotation:-0.4641,x:-70.1,y:77.4},0).wait(1).to({rotation:-0.4219,y:77.35},0).wait(1).to({rotation:-0.3797,x:-70,y:77.25},0).wait(1).to({rotation:-0.3375,y:77.2},0).wait(1).to({rotation:-0.2954,y:77.15},0).wait(1).to({rotation:-0.2532,x:-69.95,y:77.1},0).wait(1).to({rotation:-0.211,y:77.05},0).wait(1).to({rotation:-0.1688,x:-69.9,y:77},0).wait(1).to({rotation:-0.1266,x:-69.85,y:76.95},0).wait(1).to({rotation:-0.0844,x:-69.8,y:76.9},0).wait(1).to({rotation:-0.0422,y:76.85},0).wait(1).to({rotation:0,y:76.8},0).wait(1));

	// pot
	this.instance_6 = new lib.pot("synched",0);
	this.instance_6.setTransform(-5.9,-2.35,1,1,0,0,0,146.8,196);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(89).to({startPosition:59},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-144.9,-194.8,302.4,388.3);


(lib.rightPlant = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// pot
	this.instance = new lib.pot_1("synched",0);
	this.instance.setTransform(0,50.05,1,1,0,0,0,40,41.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(30).to({startPosition:0},0).wait(29).to({startPosition:0},0).wait(1));

	// leftLeaf
	this.instance_1 = new lib.sl3("synched",0);
	this.instance_1.setTransform(-44.05,-29.95,0.9999,0.9999,-4.2111,0,0,29.4,53.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regY:54.1,rotation:-8.4575,x:-48.05,y:-27},23,cjs.Ease.cubicInOut).to({regY:53.8,rotation:-4.2111,x:-44.05,y:-29.95},36,cjs.Ease.cubicInOut).wait(1));

	// middleLeaf
	this.instance_2 = new lib.sl2("synched",0);
	this.instance_2.setTransform(25.05,-53,0.9998,0.9998,0,0,0,35.9,67.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:36.1,regY:67,rotation:1.7422,x:26.9,y:-52.05},30,cjs.Ease.cubicInOut).to({regX:35.9,regY:67.3,rotation:0,x:25.05,y:-53},29,cjs.Ease.cubicInOut).wait(1));

	// rightLeaf
	this.instance_3 = new lib.sl1("synched",0);
	this.instance_3.setTransform(41.95,-8,0.9999,0.9999,4.7164,0,0,38.1,37.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regY:36.6,rotation:9.4432,x:45.15,y:-5.05},36,cjs.Ease.cubicInOut).to({regY:37.2,rotation:4.7164,x:41.95,y:-8},23,cjs.Ease.cubicInOut).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-83,-120.3,170,212.3);


(lib.leftPlant = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// bottomLeftLeaf
	this.instance = new lib.l5("synched",0);
	this.instance.setTransform(-43.05,-19.95,1,1,0,0,0,36.2,53.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:36.5,regY:52.9,rotation:-4.7161,x:-47,y:-17},51,cjs.Ease.quadInOut).to({regX:36.2,regY:53.1,rotation:0,x:-43.05,y:-19.95},37,cjs.Ease.quadInOut).wait(2));

	// topLeftLeaf
	this.instance_1 = new lib.l4("synched",0);
	this.instance_1.setTransform(-33.65,-110.65,1,1,0,0,0,28.8,57.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:29.1,regY:58,rotation:-4.7265,x:-37.95,y:-108},26,cjs.Ease.quadInOut).to({regX:28.8,regY:57.9,rotation:0,x:-33.65,y:-110.65},62,cjs.Ease.quadInOut).wait(2));

	// bottomRightLeaf
	this.instance_2 = new lib.l3("synched",0);
	this.instance_2.setTransform(36.05,25,1,1,0,0,0,42.9,46.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:42.4,regY:45.9,rotation:4.4985,x:39.05,y:28},59,cjs.Ease.quadInOut).to({regX:42.9,regY:46.3,rotation:0,x:36.05,y:25},29,cjs.Ease.quadInOut).wait(2));

	// topRightLeaf
	this.instance_3 = new lib.l2("synched",0);
	this.instance_3.setTransform(26.65,-58.6,1,1,0,0,0,38.6,46.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:38.2,regY:46.8,rotation:4.737,x:29.95,y:-55.05},33,cjs.Ease.quadInOut).to({regX:38.6,regY:46.6,rotation:0,x:26.65,y:-58.6},55,cjs.Ease.quadInOut).wait(2));

	// topLeaf
	this.instance_4 = new lib.l1("synched",0);
	this.instance_4.setTransform(32.5,-155.6,1,1,0,0,0,32.9,69.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({regX:32.6,regY:70,rotation:3.9909,x:36.95,y:-153},47,cjs.Ease.quadInOut).to({regX:32.9,regY:69.8,rotation:0,x:32.5,y:-155.6},41,cjs.Ease.quadInOut).wait(2));

	// pot
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#939393").s().p("AgJAjQgDgKABgZQABgbADgIQADgGAGAAQAGAAACAHQACAHAAAKIAAARQABAagCAIQgCAHgIAAIgBABQgHAAgCgHg");
	this.shape.setTransform(-38.6964,121.4958,1.0057,1.0047);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#939393").s().p("AgJAjQgEgKABgZQABgbAEgIQADgGAFAAQAGAAADAHQACAHAAAKIAAARIABARQAAAJgCAIQgCAHgIAAIgBABQgGAAgDgHg");
	this.shape_1.setTransform(-30.8677,121.4958,1.0057,1.0047);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#939393").s().p("AgJAjQgEgLACgYIAAgRQABgLADgHQADgGAGAAQAGAAACAHQACAHAAAKIAAARIABARQAAAKgCAHQgCAHgIAAIgBABQgHAAgCgHg");
	this.shape_2.setTransform(-23.0693,121.4958,1.0057,1.0047);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#939393").s().p("AgJAjQgDgKABgZQABgbADgIQADgGAGAAQAGAAACAHQACAHAAAKIAAARQABAagCAIQgCAHgIAAIgBABQgHAAgCgHg");
	this.shape_3.setTransform(-15.2638,121.4958,1.0057,1.0047);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#939393").s().p("AgJAjQgEgKABgZQABgbAEgIQADgGAFAAQAGAAADAHQACAHAAAKIAAARIABARQAAAJgCAIQgDAHgHAAIgBABQgGAAgDgHg");
	this.shape_4.setTransform(-7.4351,121.4958,1.0057,1.0047);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#939393").s().p("AgJAjQgEgLACgYIAAgRQABgLADgHQADgGAGAAQAGAAACAHQACAHAAAKIAAARIABARQAAAKgCAHQgCAHgIAAIgBABQgHAAgCgHg");
	this.shape_5.setTransform(0.3633,121.4958,1.0057,1.0047);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#939393").s().p("AgJAjQgDgKABgZQABgbADgIQADgGAGAAQAGAAACAHQACAHAAAKIAAARQABAagCAIQgCAHgIAAIgBABQgHAAgCgHg");
	this.shape_6.setTransform(8.1688,121.4958,1.0057,1.0047);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#939393").s().p("AgJAjQgEgKABgZQABgbAEgIQADgGAFAAQAGAAADAHQACAHAAAKIAAARIABARQAAAJgCAIQgDAHgHAAIgBABQgGAAgDgHg");
	this.shape_7.setTransform(15.9976,121.4958,1.0057,1.0047);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#939393").s().p("AgJAjQgEgLACgYIAAgRQABgLADgHQADgGAGAAQAGAAACAHQACAHAAAKIAAARIABARQAAAKgCAHQgCAHgIAAIgBABQgGAAgDgHg");
	this.shape_8.setTransform(23.7959,121.4958,1.0057,1.0047);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#939393").s().p("AgJAjQgDgKABgZQABgbADgIQADgGAGAAQAGAAACAHQACAHAAAKIAAARQABAagCAIQgCAHgIAAIgBABQgHAAgCgHg");
	this.shape_9.setTransform(31.6014,121.4958,1.0057,1.0047);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#939393").s().p("AgJAjQgEgKABgZQABgbAEgIQADgGAFAAQAGAAADAHQACAHAAAKIAAARIABARQAAAJgCAIQgDAHgHAAIgBABQgGAAgDgHg");
	this.shape_10.setTransform(39.4302,121.4958,1.0057,1.0047);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#939393").s().p("AgJAjQgDgKABgZQABgbADgIQADgGAGAAQAGAAACAHQACAHAAAKIAAARQABAagCAIQgCAHgIAAIgBABQgHAAgCgHg");
	this.shape_11.setTransform(-38.6964,95.4741,1.0057,1.0047);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#939393").s().p("AgJAjQgEgKABgZQABgbAEgIQADgGAFAAQAGAAADAHQACAHAAAKIAAARIABARQAAAJgCAIQgCAHgIAAIgBABQgGAAgDgHg");
	this.shape_12.setTransform(-30.8677,95.4741,1.0057,1.0047);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#939393").s().p("AgJAjQgEgLACgYIAAgRQABgLADgHQADgGAGAAQAGAAACAHQACAHAAAKIAAARIABARQAAAKgCAHQgCAHgIAAIgBABQgHAAgCgHg");
	this.shape_13.setTransform(-23.0693,95.4741,1.0057,1.0047);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#939393").s().p("AgJAjQgDgKABgZQABgbADgIQADgGAGAAQAGAAACAHQACAHAAAKIAAARQABAagCAIQgCAHgIAAIgBABQgHAAgCgHg");
	this.shape_14.setTransform(-15.2638,95.4741,1.0057,1.0047);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#939393").s().p("AgJAjQgEgKABgZQABgbAEgIQADgGAFAAQAGAAADAHQACAHAAAKIAAARIABARQAAAJgCAIQgDAHgHAAIgBABQgGAAgDgHg");
	this.shape_15.setTransform(-7.4351,95.4741,1.0057,1.0047);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#939393").s().p("AgJAjQgEgLACgYIAAgRQABgLADgHQADgGAGAAQAGAAACAHQACAHAAAKIAAARIABARQAAAKgCAHQgCAHgIAAIgBABQgHAAgCgHg");
	this.shape_16.setTransform(0.3633,95.4741,1.0057,1.0047);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#939393").s().p("AgJAjQgDgKABgZQABgbADgIQADgGAGAAQAGAAACAHQACAHAAAKIAAARQABAagCAIQgCAHgIAAIgBABQgHAAgCgHg");
	this.shape_17.setTransform(8.1688,95.4741,1.0057,1.0047);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#939393").s().p("AgJAjQgEgKABgZQABgbAEgIQADgGAFAAQAGAAADAHQACAHAAAKIAAARIABARQAAAJgCAIQgDAHgHAAIgBABQgGAAgDgHg");
	this.shape_18.setTransform(15.9976,95.4741,1.0057,1.0047);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#939393").s().p("AgJAjQgEgLACgYIAAgRQABgLADgHQADgGAGAAQAGAAACAHQACAHAAAKIAAARIABARQAAAKgCAHQgCAHgIAAIgBABQgGAAgDgHg");
	this.shape_19.setTransform(23.7959,95.4741,1.0057,1.0047);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#939393").s().p("AgJAjQgDgKABgZQABgbADgIQADgGAGAAQAGAAACAHQACAHAAAKIAAARQABAagCAIQgCAHgIAAIgBABQgHAAgCgHg");
	this.shape_20.setTransform(31.6014,95.4741,1.0057,1.0047);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#939393").s().p("AgJAjQgEgKABgZQABgbAEgIQADgGAFAAQAGAAADAHQACAHAAAKIAAARIABARQAAAJgCAIQgDAHgHAAIgBABQgGAAgDgHg");
	this.shape_21.setTransform(39.4302,95.4741,1.0057,1.0047);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#565656").s().p("AlBIpQiAAAgqoYQgMingDjJIgBjJIP3AAIgBDJQgDDJgNCnQgpIYiAAAg");
	this.shape_22.setTransform(0.225,140.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(90));

	// stem
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#5D999D").s().p("AAFSSQgOhJgMhmIgLhWQgEgggGhDIgLiAIgOiYIgLipQgGhIgEhuIgGi7QgEi+AHi0QAIi2AQiMQAOh1AVhtIAThVQAehyAfg3QAPgdAPgSQAOgQADADQADADgGATIgSAxQgPAsghB8IgTBTQgUBrgNB0QgiEeAGGRIAHC5QAEBtAFBIIAMCpIAOCXIAUDiIALBWQAMBnADBJQACBKgIABIAAAAQgIAAgPhHg");
	this.shape_23.setTransform(-2.3466,19.2693);

	this.timeline.addTween(cjs.Tween.get(this.shape_23).wait(90));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.3,-225.6,171.1,420.9);


(lib.hello = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.hello2("synched",0);
	this.instance.setTransform(274.35,71.7,1.4938,1.4938,0,0,0,21.5,9.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DC918D").s().p("AiiA/IAAh9IFFAAIAAB9g");
	this.shape.setTransform(237.825,73.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#DC918D").s().p("AhxBGIAAiMIDjAAIAACMg");
	this.shape_1.setTransform(240.775,73.5);

	this.instance_1 = new lib.hello1("synched",0);
	this.instance_1.setTransform(266.25,-168.35,1.2489,0.7695,0,77.3924,85.3691,14.2,22.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DC918D").s().p("ABfBfIgKgBIgRAAIgQAAIgRAAIgCAAIAAAAIgBAAIgBgBIAAAAIgBAAIAAAAIgBgBIgCAAIgDgBIgCgBIgBgBIgBAAIgCAAIgBgBIgBAAIgBAAIgBAAIAAAAIgBAAIgBAAIAAgBIgBAAIgBAAIAAAAIgBgBIgCAAIgDAAIgDAAIgCgBIgDgBIgDgCIgBAAIgBAAIgBAAIgBAAIgBAAIAAgBIgBAAIgBAAIgBAAIgBgBIgBAAIgBgBIgCAAIgBgBIgBgBIgBAAIgBAAIgBgBIgBAAIgBAAIAAAAIgBgBIgBgBIgBAAIAAgBIAAAAIgBAAIgBAAIgBgBIgBAAIAAAAIgBgBIAAAAIgBAAIAAgBIgCAAIgBAAIgBgBIgCAAIgBgBIgBgBIgBAAIgCgBIAAAAIgBAAIAAgBIgBAAIgBAAIAAAAIgBgBIgBAAIAAAAIgBgBIgBAAIAAAAIgCAAIgBgBIgBAAIgCAAIgBgBIgBAAIgCgBIgCAAIgCgBIgDAAIgBgBIgCgBIgBAAIgBAAIAAgBIgBAAIgBAAIAAAAIgBAAIgBgBIAAAAIgBAAIgBAAIgBgBIAAAAIgBAAIgBAAIAAgBIgBAAIgBgBIgBAAIAAAAIgBAAIgBAAIgBAAIAAAAIgBAAIgBAAIAAgBIgBAAIgBAAIgBAAIgBAAIAAgBIgBAAIgBAAIAAgBIgBAAIAAAAIgBgBIgBAAIgBAAIgBAAIgBAAIAAgBIgBAAIgBAAIgBAAIgBAAIAAgBIgBAAIAAAAIgBAAIgCgCIAAgBIAAAAIgBgBIgBgCIAAgCIABgDIABgCIADgCIADAAIACAAQgCgEABgDIACgDIgBgBIgBgBIAAgBIAAgCIgCAAIgBAAIgCAAIgCAAIgBgBIgCgCIAAAAIgBgBIgCgEIgCgDIAAgFIAAgEIACgHIABgBIAAAAIABgBIABAAIABgBIAAgBIABAAIABAAIAAgBIABAAIAAgBIAAAAIAAgCIAAgCIAAgBIAAgBIAAgBIAAgCIABAAIAAgBIABgCIAAgBIABgBIAAgBIABgBIAAAAIABgBIABgBIgCgEIAAgFIABgGIACgEIADgCIAFAAIgBgBIgBgBIAAgBIAAgBIgBAAIgCAAQgFAAgFgBIgFgBIgDAAIgDgBIgDgCIgCgCIAAgCIAAgBIgBAAIAAgBIAAgBIAAgBIABgCIABgCIACgCIABgBIABgBQAFgEAGAAIABgEIACgCIABgBIABgBIABgBIACAAIACAAIABAAIACAAIACACIABABIACADIABAAIAAABIABACIABAAIAAAAIAKAAIATAAQAKAAAKABIAFACIADAAIADAAIADABIADABIABAAIAKAAIAKAAIAKAAIAFABIADAAIACAAIACAAIACABIABAAIAEAAIAFAAIAEAAIAEABIABAAIAAAAIABAAIABAAIAAAAIABAAIABAAIABABIACAAIACAAIADAAIACAAIAAABIABAAIABAAIAAAAIABABIAEAAIADAAIAEAAIAEABIAAAAIABAAIAAAAIABgBIAAAAIABAAIABAAIAAAAIABAAIABAAIAAgBIABAAIABAAIAAAAIABAAIAGgBIAFAAIAEACIACAEIAAADIAAAAQAIACgBAIQAAADgCABQgFADgFgBIgEAAIgNAAIgOAAIgBAAQgGACgGAAIgMAAIgNAAIgDAAIABABIAAAAIABABIABAAIAAAAIABABIABAAIABABIAAABIABABIAAAAIABABIAAAAIABAEIAAABIADADQAHAHADAKQADAKgDAKQgCAKgIAIQgGAGgIADIABACQABABAAAAQAAABAAABQAAAAAAABQAAAAAAABQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAIAAAAIACABIADACIAAABIABAAIAAAAIABABIAAAAIAAABIABAAIAAABIAAABIABAAQAGgBAFADQAAABABAAQAAABAAAAQABABAAAAQAAABAAAAQACAEgDAEQgDACgEAAIgKAAIgHAAIADABIADACIADABIACABIADAAIADABIADACIADABIAAAAIACAAIAAgBIABAAIABAAIACAAIAAAAIABAAIABAAIABgBIAAAAIAGgBIAGAAIAEAAIABAAIAAAAIAAAAIABgBIAAAAIABgBIAAAAIABgBIADgCIADAAIAEABIACABIAAAAIACAAIAAAAIACgBIACgBIAEAAIADAAIABAAIABgBIAAAAIABAAIAAAAIABgBIADgBIAEAAIADAAIADABIACACIAAABIABgBIABAAIAAAAIABAAIABAAIABAAIABAAIAAAAIADgBQABAAAAAAQABAAABAAQAAAAABAAQAAAAABAAIACACIACAEIABACIgBAAIAAABIAAABIAAABIgBABIAAABIgBABIgBABIAAABIgBABIgBABIgBABIgBABIAAAAIgBAAIAAABIAAAAIgBABIAAAAIgBAAIAAAAIgBABIAAAAIgBABIAAAAIgBAAIgBAAIgBABIgBABIgBAAIgBABIgCAAIAAABIgBAAQgFACgGAAIgCAAg");
	this.shape_2.setTransform(256.425,71.8542);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#DC918D").s().p("AAXB1IgCAAIgCAAIgCAAIgOAAIgMAAIgOAAIgNAAIgOAAQgDAAgCgCIgBAAIgCAAIgBgBIgBAAIAAAAIgCgBIgBAAIgBAAIgBAAIgBgBIgBAAIgBgBIgBAAIAAAAIgBgCIgBgBIgBAAIAAAAIgBAAIgBAAIgBAAIgBAAIgBgBIgBAAIgBgBIgBAAIgCAAIgBAAIAAgBIgCAAIAAgBIgBgBIAAgBIgBgBIgBgBIgBgBIAAgCIgDgDIAAgBIgBgBIAAgCIgBgBIgBgBIgBgBIgBgBIgBgBIgBgBIgBgCIgBgCIgBAAIgBgBIAAAAIgCAAIAAgBIgBgBIgBgCIgBgBIAAgBIAAgCIgBgBIAAAAIAAgCIAAAAIgBAAIAAgCIAAgBIgBgBIAAgBIgDgBIgCgBIgDAAIgCgBIgEgCIgEgCIgEgDIgEgEIAAAAIgBgBIAAAAIgBgBIgBAAIAAgBIAAAAIgBgBIAAAAIgBAAIgCgDIgCgDIgCgDIgDgDIgBgDIgCgDQgHgFgEgJIgEgNQgCgMAFgLQgFgEgEgGQgGgJAAgLQgBgJAEgJQAEgIAHgGQAGgFAJgDQAIgCAIABIAIABIAZAAIAZAAIAaAAIAXAAIAHAAIAJgBIAKAAIAJAAIAJAAIAEAAIAHgBIAGAAIAGAAIAHAAIADAAIACgBIACAAIABAAIACgBIABAAIACAAIADgBIACAAIACAAIABgBIABAAIABAAIAAAAIABAAIABAAIAAgBIABAAIABAAIABAAIACAAIACgBIACAAIACAAIACgBIACAAIABAAIAAAAIABAAIABgBIACAAIABAAIACgBIABgBIACAAIABgBIACgBIABgBIACAAIABgBIACgBIABAAIAFgCIAFgDIAFgBIAFAAIAHAAIAGABQAJADAIAHQAHAHADAKQAEALgDAMQgDAIgFAHQgFAGgHAEIAEAAQAKACAIAIQAIAHADAKQADAKgCAKQgCAKgHAIQgGAHgIAFIgEAFIgDADIgEAEIgFADIgFABIgEACIgBAAIgBAAIAAABIgBAAIgBABIgBAAIAAAAIgBAAIgBAAIAAABIgBAAIgBAAIAAAAIgBABIgBAAIgBAAIAAAAIgBABIgBAAIAAAAIgBAAIAAABIgBAAIgCAAIgCABIgCABIgBABIgBAAIgCABIgBAAIAAAAIgCABIgBABIgBAAIgBAAIgBABIAAAAIgBAAIgBAAIgDACIgCABIgDABIgCABIgDACIgDABIgBABIgBAAIgCABIgBABIgBAAIAAABIgBAAIAAABIgDABIgDADIgCACIgDACIgCABIgCABIgCACIgBAAIgDADIgEABIgDABIgDACIgBABIAAABIgBABIgBABIAAABIgBABIgBAAIAAABIgBAAIgBABIAAABIgCADIgBABIgBAAIAAABIgBAAIgBAAIgCABIgCABIgCABIgCAAg");
	this.shape_3.setTransform(251.8122,66.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#DC918D").s().p("Ah3CLIgEgJIgBAAIgFgBIgFgDIAAgBIgDgBQgDAAgDgCIgDgEIgBgBIgIgBQgDgBgDgDIgBgBIgBAAIgCgDIgDAAIgCgBIgBgCIgDgBIgBgCIgCgCIAAgBIgCAAIgCgDIgCAAIAAgBIgBgBIgBgBIgBAAIAAgBIgBgCIgBAAIgBAAIgBgBIgBgBIgCgBIgCgCIAAgBIgBgBIAAgCIgBgBIgBgBIAAgCIAAAAIgBgCIAAgCIAAgCIAAgEIAAgEIABgEIAAgDIAAgCIAAgCIAAgDIABgDIABgDIABgCIABgBIABgCIAAgBIABAAIAAgCIABgBIABAAIABgCIAAgBIABAAIABgBIABgBIAAgBIAAAAIACgBIABgCIAAAAIABgBIACAAIAAgBIgYgBQgDAAgBgDQgJgJAJgIQAEgDAFABIAqAAIAUAAIADgCIAEAAIACAAIADAAIABAAIACgEQADgDAFgDIAKgFIAEAAIACgCIACgBIADgCIACgBIADgBIABAAIACgCIABAAIACgBIACgBIACgBIAAAAIACgBIACgBIACgBIABgBIACAAIADgCIADgBIADgBIACgBIADAAIABAAIAAgBIABAAIABAAIABgBIABgBIABgBIABgBIACAAIABgBIABgBIABgBIABAAIACgBIABgBIABAAIABAAIABgCIACgBIABgCIACgBIACgBIABgBIABAAIABgBIABgBIACgBIABAAIABgBIABgBIABgBIACgBIABgBIABgBIABAAIABgBIABgBIABgBIACgCIACgCIACgCIACgCIACgBIAAAAIABgBIABgBIABgBIABgBIABgBIACgCIABgBIACgCIACgBIAAAAIAEgDIADgCIADgCIAEgCIAEgCIABgBIABAAIAAAAIABgBIAAAAIABAAIAAgBIABAAIABAAIABgCIACgBIACgCIABgBIACgBIABgBIAAAAIABAAIAAgBIABAAIAAgBIABAAIABAAIABgBIABgCIACgBIABgBIACgBIACgBIABgBIAAAAIABAAIABgBIABgBIAAAAIABgBIABAAIAAAAIABgBIAAAAQAHgGAIgEIAMgCQAGgCAIgBQALAAAKAFQAJAFAFAIQAGAIABAKQABAGgBAGIALACQAGgCAHgBQALgBAJAFQAKAFAFAJQAGAJABAKQABALgFAJQgEAJgJAHIgBABIgCABIAAAAIgBABIAAAAIgBABIgBABIgBABIgCACIgBABIgCACIgCABIAAAAIgCACIgCABIgBACIgCABIgBABIgBAAIgCACIgCACIgCACIgDABIgCABIgCABIAAAAIgBABIAAAAIgBABIgBABIgBABIgBABIgCABIgBABIgCABIgCABIAAABIgBAAIgBAAIAAABIgBAAIAAABIgBAAIgBABIgBABIgBABIgBABIgBAAIgBABIAAAAIAAABIgBABIgCABIgEAEIgEAEIgFAEIgEADIgEADIgBAAIgCABIgBABIgBABIgBABIgBAAIgBABIAAAAIgBAAIAAABIgBAAIAAAAIgCACIgBABIgCABIgCABIgCABIgBABIgBABIgBABIgBAAIgBABIgCABIgBABIgBAAIgBABIgBAAIAAABIgBAAIAAAAIgBABIgBAAIAAAAIgCABIgCACIgDABIgDACIgCABIgBAAIAAAAIgBABIgBAAIAAAAIgBABIgBAAIgBABIgBABIgBABIgBAAIgCABIAAAAIgBABIgCABIgBAAIgBABIgBABIgBAAIgCABIgBABIgBABIgBAAIgCABIgBABIgBABIgBAAIgBABIgCABIgBAAIgBABIgBABIgBAAIgBABIgCABIgBABIgCABIgBABIgCABIgCABIgBABIAAAAIgBABIgBAAIgBABIAAAAIgBAAIAAAAIgBABIACAAIABAAIgNAJQgEADgLAFIgDABIAAAAIgCAEIgXAIIgHAEgAAdBgIABAAIAAAAIgBAAgAimArIACAAIABAAIABAAIAAgBIgBAAIgBABIgBAAIgBAAgAieAnIABAAIAAgBIACAAIAAgBIgCAAIAAABIgBAAg");
	this.shape_4.setTransform(252.5711,62.9104);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#DC918D").s().p("AhvCYIgHgDIgBAAIgCAAIgEgBIgBAAIgBAAIgBAAIgBgBIgCgBIAAAAIgCAAIgBAAIgBAAIgBAAIgBgBIgBAAIgBgBIgBAAIgBgBIgBgBQgEABgEgCIgFgEIgBgGQABgEACgCQACgDADgBIAGgBIgBgHIgBAAIAAgBIAAgBIgBgBIgBgCIAAAAIAAgCIgBAAIgBgCIAAAAIgBgCIgBAAIAAgBIAAgBIgBgBIgBgBIAAAAIAAgCIAAgJIAAgIIAAgIIAAgJIAAgIIAAgFIABgCIABAAIAAgCIAAAAIACgCIABgBIACgBIACAAIACgBIACAAIACAAIABgBIACAAIAAAAIABAAIACgBIABAAIABgBIABAAIABAAIACAAIABAAIABAAIABgBIABAAIACgBIAAAAIABAAIAAgBIABgBIABgBIABgBIACgCIACgDIABgCIACgCIACgCIABgBIABgBIACgBIABgCIABgBIABgBIAAgBIABgBIABgBIABgBIABgBIABgBIABgBIAAgBIABAAIAAgBIAAAAIABgBIAAgBIABAAIABgCIABAAIABgCIABgBIACgCIABgBIABgCIACgDIABgCIACgDIACgCIACgCIAAAAIAAgBIABAAIAAgBIABgBIAAgBIABgCIABgBIABgBIABgDIABgCIABgCIABgCIABgBIABgDIACgEIABgDIACgDIACgDIABgCIABgCIABgCIABgCIABgCIABgCIACgDIABgCIACgDIACgCIABgCIABgCIAAgBIABgBIABgBIABgBIAAgBIABgBIABgBIABgCIABgCIACgBIABgCIAAAAIACgEIACgDIACgDIADgEIADgDIABgBIABgBIABgCIAAgBIABgBIABgBIABgCIABgCIABgCIABgCIABgBIACgCIAAAAIABgBIABgCIABgBIABgBIABgBIABgBIAGgHIAJgFIAJgDQAGgBAGABQAGABAGADIADABIABABIABABIACABIABABIABABIABABIABAAIAEAFIADAEIACAFIACAGIABAFIAAABIACAGIAAAAQAFgCAFAAIACgBIAIgEIAKgEIAIgCQAFgBAFABIAGABIAEABIAEACIAEACIADADIADACIABACIACACIABACIACACIAAAAIACAEIACAEIABAFIAAAEIABAEIgBAFIgBAGIgBADIgCAFIgCAEIAAAGIAAAHIgBAGIgCAGIgDAGIAAAAIgBABIAAACIgBABIgBABIgBABIgBABIgBABIgBACIgBACIgCABIgBACIgCACIAAAAIAAABIgBACIgBABIgBACIgBACIgCACIAAAAIAAAAIgBABIAAAAIAAABIgBABIAAAAIAAABIgBACIgBABIAAABIgBACIgBAAIAAABIAAABIgBAAIAAABIAAAAIgBABIAAABIAAAAIgBABIAAABIgBABIAAABIgBABIgBACIgBABIAAAAIgBABIAAABIAAAAIgBACIgBACIgBADIgDADIgCADIgCACIgBADIgCAEIgCADIgCADIgDADIgBABIAAAAIAAABIgBABIgBACIgBACIgCABIgBACIgBABIgBABIgBAAIAAABIgBAAIAAABIgBABIgBAAIAAABIAAABIgBAAIAAABIgBABIAAAAIgBABIgBACIgBABIgBABIgBABIgBABIAAAAIgBABIgBABIAAABIgBAAIAAABIgBABIAAAAIAAABIgBAAIAAABIAAABIgBAAIAAABIAAAAIAAABIgBACIgBABIgBACIgBACIgBACIAAAAIgBABIAAABIAAAAIgBABIAAAAIAAABIAAAAIgBABIAAAAIAAABIAAAAIgBABIAAABIAAAAIgBABIAAABIAAAAIAAABIgBABIAAAAIAAABQgCALgGAIQgGAJgJAEQgJAFgLAAIgYAAIgYAAIgWAAIgaAAIgHAAIgJABIgJAAg");
	this.shape_5.setTransform(255.075,61.525);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#DC918D").s().p("Ah3CUQgFgGAAgLIAAgTIAAgKIABgLIACgFIgBgHQAAgJAHgGIgCgDQgDgNAOgVQAWgiATgrQAPghAIgZIAHgaQACgIACgEQAHgLAMACQAGAAAEAEQAEAEABAFQADAGgCAKIAIAAQAIABAFAIQADAFACAKQACAJAAANIAAAPIAFgBQAJAAAGAFQAGAGAAALIAAADIAGAAIACABIACgEIABgBIABgKQACgHAHgEIAAgEQACgSAFgFQAGgHAJAAQAKAAAFAHQAFAGAAAJIADAIQACAFgBAHQgBAGgFAKIgHARIgCAQIgIAXIgGAXIgZBRQgCAJgEAFQAAAEgCADQgDAFgFADQgGADgFgBIgHgBQgLADgMgBIgEAAQgqAGg6AAQgWAAgHgIg");
	this.shape_6.setTransform(255.42,61.1656);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#DC918D").s().p("AhpDZIgFgBIgEgCQgSgKgDgUQgDgRAMgNQAFgGAGgEIgBgCIgCgFIgCgEIgBgCIAAgBIAAgCIAAgBIAAgCIgBgBIAAgCIAAgBIAAgEIABgFIABgEIABgBIgBgBIgEgCIgEgDIAAgBIgEgDIgCgEIgBgBIgBgCIAAgBIgBgBIAAgCIgBgBIgBgCIAAgBIgBgEIgBgFIABgFIAAgEIABgDIAAgBIABgBIAAgBIABgEIABgFIACgEIADgDIAAgBIABgCIAAgBIABgBIAAgCIABgBIABgBIAAgBIABgBIAAgCIABgBIAAgBIABgCIAAgBIABgBIABgDIABgCIABgDIABgDIACgCIABgDIABgBIAAgBIABgBIABgCIABgCIABgCIABgDIACgCIAAgBIABgBIABgBIAAgBIABgBIAAgCIABgBIABgBIABgBIAAgCIABgBIABgBIAAgBIABgBIABgBIABgCIABgCIABgCIABgCIABgDIABgCIACgDIABgEIABgEIACgDIACgEIACgCIABgEIABgDIABgDIACgFIACgEIABgBIAAgDIABgCIAAgDIABgCIABgDIACgCIABgCIAAgBIABgBIAAAAIAAgBIAAAAIAAgBIABgCIAAAAIAAgBIABgBIAAgBIABgBIABgCIAAAAIABgDIABgDIABgCIABgDIACgCIAAgBIABgCIAAgBIABgBIAAgCIABgBIABgBIAAgBIABgCIABAAIAAgBIAAgBIABgBIAAgBIABgBIAAgCIAAgBIAAgBIABgBIAAgBIAAgBIABgDIABgDIAAgCIABgDIACgCIABgDIABgFIACgGIACgFIACgEIADgFIABgCQAGgNANgIQALgGALAAIAJACIADgBQAPgDAMAIIAHAFIAFgGQAGgFAGgDQAHgCAHgBIACAAIABAAIACABIABAAIACAAIABAAIACAAIABABQAFABAEACIAHAFIAGAHIAFAGIADAHIAAACQAEADACAEQADAEABAFIACAJQABAFgBAFIgBADIgBAGIAAABIgCADIAAACIgBACIAAABIAAABIAAADIgBACIgBADIAAAAIAAABIgBABIAAABIgBACIAAABIgBABIAAABIAAACIgBABIgBACIAAABIgBABIgBABIAAABIAAABIgBACIAAABIgBABIAAABIgBACIAAABIgBADIgBACIgBADIgBADIAAABIgBABIAAABIAAABIgBABIAAACIgBABIAAACIgBACIgBADIgBACIgBADIAAAAIAAABIgBABIAAACIgBABIAAACIAAABIgBACIAAAFIAAAFIAAAFIgBAGIgBAFIgBABIAAAFIgBAEIgBAEIgBADIgBADIgBAEIAAADIAAADIAAABIgBACIAAAEIgBADIgBADIAAACIgBACIgBADIgBADIgBACIAAABIgBABIgBACIgBADIgBAEIgCAEIgCADIgCAEIgCADIgBADIgBACIgBADIgBADIgBACIAAAFIgBAFIgBAEIgBAFIgBABIAAABIAAABIAAADIAAADIgBADIAAADIgBADIAAABIgBACIAAADIAAACIgBADIAAACIgBADIAAAFIAAAEIAAAAIAAAFIgBAFIgCAFIgBADIgBAGIgCAFIgBAEIgBABIAAABIAAABQADAMgEALQgDAIgGAGIgIAHIgCABQgHAEgIABIgBAAIgFACIgEACIgEABIgDAAIgEABIgEAAIgEAAIgCAAIgBAAIgBAAIgBAAIgBABIgBAAIgCAAIgBAAIgEABIgCABIgDAAIgDABIgDAAIgDAAIgCAAIgnAAIgFABQgNAAgOgDgAhOg+IAAABIAAgBIAAAAgAhMhBIAAABIAAgBIABgBIgBABg");
	this.shape_7.setTransform(256.3083,55.5042);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#DC918D").s().p("AiTD0IgBgDIgBgDIgBgCIgBgDIgBgDIAAgEIAAgDIAAgBIAAgBQgFgGgCgHQgCgGAAgHQAAgHACgHQADgHAFgFIACgDIABgBIAAgBIACgDIABgEIACgEIADgDIACgEIABgBIABgCIACgCIABgDIACgCIACgDIABgDIACgCIABgDIABgCIABgCIABgEIABgBIgBgDIgGACIgJAAIgJgBIgBAAIgFgCIgEgCIgEgCIgEgEIgEgDIgCgEIgBgBIgBgCIAAgBIgBgBIAAgCIgBgBIgBgCIAAgBIgBgEIAAgFIAAgFIAAgEIABgDIAAgBIABgCIAAgBIABgBIACgGIADgGIAEgFIAEgDIAEgEIACgBIABgBIABgBIABgBIABAAIABgBIABgBIABgCIACgCIACgCIACgCIACgBIABgBIABgBIABgBIAAgBIABAAIABgBIABgBIABgBIABAAIABgBIABgBIAAgBIABgBIABgBIAAgBIABgBIABgBIAAgBIABgBIABgBIABgBIABgCIABgCIABgCIACgCIABgCIACgCIABgCIABgEIACgDIACgEIADgDIACgBIACgEIADgFIAEgEIADgEIADgDIAAgBIABgBIABgCIAAgCIABgCIABgDIACgCIABgDIABgCIABgBIAAgBIABgCIAAgBIABgBIABgBIAAgBIABgBIAAgDIABgEIACgEIACgDIACgEIADgDIAAAAIAAgBIABgCIAAgBIABgBIABgBIAAgBIABgCIABgBIAAgBIAAgBIABgBIABgBIAAgBIABgBIABgBIABgBIABgBIAAgBIABgCIABgBIABgBIAAgBIABgBIACgEIABgDIACgEIACgEIABgDIACgFIACgGIADgEIAEgFIADgDIABgBIABgBIAAgBIABgBIABgBIABgCIABgBIAAAAIABgCQACgJAEgHIAEgFIAAgBIAAgDIABgDIABgDIAAgCIABgBIAAgBIAAgBQACgNAIgJQAIgIAMgDIALgBIAAAAQAKgDAKACQAJACAIAGQAIAGAEAKQAFALgCANIgDAJIgDAJIAAACIgBADIgBACIgCADIgBADIgBACIgBABIgBACIABgBIACgDIADgDIADgDIACgBIACgCIACgCIACgCIACgCIAFgIIABgBIAAAAIAAgBQgCgJADgJQACgHAEgGQAFgHAGgEQAGgDAHgCQAIgCAIACIAOAFIAJAHIAHAKQACAFABAGIABALIAAAHIgCAJIAAAFIgBAGIgCAGIgCAFIgDAFIAAAEQgBAIgDAGIgBADIAAAEIgBACIgBADIgBADIgBABIgBAFIgCAEIgBAEIgCAEIAAABIgBABIAAABIAAACIgBAHIgCAHIgDAGIgDAFIgCAEIAAACIAAADIgBACIAAADIgBACIgBADIAAABIgBABIAAACIgBABIAAABIgBACIgBAEIgBAEIgBAEIgCAEIgCADIAAABIgDAMQgEAKgJATIgOAdIgIAYIgBADIgBAEIgBACIAAACIAAABIAAABIgBACIAAAAIAAADIAAACIAAACIAAACIgBADIgBADIAAACIgBACIAAACIgBABIAAABIAAACIgBABIAAABIAAACIgBABIAAABIAAABIgBABIAAACIAAABIAAABIgBACIAAABIgBABIAAACIAAACIAAACIgBADIgBADIgBADIAAABIgBABIAAABIgBACIAAABIgBABIAAABIgBACIgBABIAAABIgBABIAAACIAAABIgBACIAAABIgBACIAAADIgBADIgBACIgCACIgBADIgBABIAAADIgBACIAAADIgCADIgBACIgBACIAAABIgBABIAAABIgBABIgBACIAAABIgBABIAAABIgBABIAAACIgBABIAAABIgBACIgBABIgBABIAAABIgBABIAAABIgBABIAAACIAAABIAAABIAAABIgBACIAAABIAAACQAAAIgDAIIi5ACIgBgBg");
	this.shape_8.setTransform(256.8125,52.5229);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#DC918D").s().p("AAYEWIgCgDIgCgEIAAgJQAAgJgCgEQgCgFgEgEIAAgCIAAgCIgHABIgFgBIgCAAIgCAAQgHAAgEADIgWACIgZAEIgYgBQgFgFgEgGQgEgJgBgJIAAgBIAAgKIAAgJIAAgJIABgJIACgIIABgCIABgBIAAgCIAAgBIABgBIAAgBIABgCIABgBIAAgBIABAAIAAgBIAAgCIAAgBIAAgCIABgBIAAgCIAAgBIAAgBIAAgqIAAgwIAAgZIgBgLIgBgMIAAgLIAAgGQgCgLAAgLIAAgXIAAgaIAAgdQAAgMACgMIAAgMIAAgNIAAgMIAAgLIABgKIABgGQgBgNAEgNQADgMAKgIQAMgJAPABQANABAKAIQAJAIADAMQADALAAAMIgBAQIgCAHIAAAKIAAABIACAIIAAAUIAAAPIAIgJIAIgFIAAgDIABgFIABgFIAAgBQAAgLAGgKIAAgIIAAgDQgCgIAAgHIACgKQgBgPABgOQAAgIADgHQAEgNAMgIQANgHAOACQANACAKAKQAKAKABAPIAAAaIACAPIAAARIAAAOIAAAOIAAAIQADAKgBAKIAAAVIAAARIABAGIABAVIAAAxIABA3QAAAOgDANIAAACIAAADIAAADIAAADIAAADIgBADIAAADIgBADIAAANIAAAOIAAAPIAAAPIAAARIgCAHIAAACIAAADIAAADIAAADIAAACIgBADIgBADIAAABIABAkQAAAQgCAQQgBAHgEAGIgCACIgWAAIgVAAIgKACIgHgBg");
	this.shape_9.setTransform(258.375,52.6164);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#DC918D").s().p("AiTD0IgBgDIgBgDIgBgCIgBgDIgBgDIAAgEIAAgDIAAgBIAAgBQgFgGgCgHQgCgGAAgHQAAgHACgHQADgHAFgFIACgDIABgBIAAgBIACgDIABgEIACgEIADgDIACgEIABgBIABgCIACgCIABgDIACgCIACgDIABgDIACgCIABgDIABgCIABgCIABgEIABgBIgBgDIgGACIgJAAIgJgBIgBAAIgFgCIgEgCIgEgCIgEgEIgEgDIgCgEIgBgBIgBgCIAAgBIgBgBIAAgCIgBgBIgBgCIAAgBIgBgEIAAgFIAAgFIAAgEIABgDIAAgBIABgCIAAgBIABgBIACgGIADgGIAEgFIAEgDIAEgEIACgBIABgBIABgBIABgBIABAAIABgBIABgBIABgCIACgCIACgCIACgCIACgBIABgBIABgBIABgBIAAgBIABAAIABgBIABgBIABgBIABAAIABgBIABgBIAAgBIABgBIABgBIAAgBIABgBIABgBIAAgBIABgBIABgBIABgBIABgCIABgCIABgCIACgCIABgCIACgCIABgCIABgEIACgDIACgEIADgDIACgBIACgEIADgFIAEgEIADgEIADgDIAAgBIABgBIABgCIAAgCIABgCIABgDIACgCIABgDIABgCIABgBIAAgBIABgCIAAgBIABgBIABgBIAAgBIABgBIAAgDIABgEIACgEIACgDIACgEIADgDIAAAAIAAgBIABgCIAAgBIABgBIABgBIAAgBIABgCIABgBIAAgBIAAgBIABgBIABgBIAAgBIABgBIABgBIABgBIABgBIAAgBIABgCIABgBIABgBIAAgBIABgBIACgEIABgDIACgEIACgEIABgDIACgFIACgGIADgEIAEgFIADgDIABgBIABgBIAAgBIABgBIABgBIABgCIABgBIAAAAIABgCQACgJAEgHIAEgFIAAgBIAAgDIABgDIABgDIAAgCIABgBIAAgBIAAgBQACgNAIgJQAIgIAMgDIALgBQAKgDAKACQAJACAIAGQAIAGAEAKQAFALgCANIgDAJIgDAJIAAACIgBADIgBACIgCADIgBADIgBACIgBABIgBACIABgBIACgDIADgDIADgDIACgBIACgCIACgCIACgCIACgCIAFgIIABgBIAAAAIAAgBQgCgJADgJQACgHAEgGQAFgHAGgEQAGgDAHgCQAIgCAIACIAOAFIAJAHIAHAKQACAFABAGIABALIAAAHIgCAJIAAAFIgBAGIgCAGIgCAFIgDAFIAAAEQgBAIgDAGIgBADIAAAEIgBACIgBADIgBADIgBABIgBAFIgCAEIgBAEIgCAEIAAABIgBABIAAABIAAACIgBAHIgCAHIgDAGIgDAFIgCAEIAAACIAAADIgBACIAAADIgBACIgBADIAAABIgBABIAAACIgBABIAAABIgBACIgBAEIgBAEIgBAEIgCAEIgCADIAAABIgDAMQgEAKgJATIgOAdIgIAYIgBADIgBAEIgBACIAAACIAAABIAAABIgBACIAAAAIAAADIAAACIAAACIAAACIgBADIgBADIAAACIgBACIAAACIgBABIAAABIAAACIgBABIAAABIAAACIgBABIAAABIAAABIgBABIAAACIAAABIAAABIgBACIAAABIgBABIAAACIAAACIAAACIgBADIgBADIgBADIAAABIgBABIAAABIgBACIAAABIgBABIAAABIgBACIgBABIAAABIgBABIAAACIAAABIgBACIAAABIgBACIAAADIgBADIgBACIgCACIgBADIgBABIAAADIgBACIAAADIgCADIgBACIgBACIAAABIgBABIAAABIgBABIgBACIAAABIgBABIAAABIgBABIAAACIgBABIAAABIgBACIgBABIgBABIAAABIgBABIAAABIgBABIAAACIAAABIAAABIAAABIgBACIAAABIAAACQAAAIgDAIIi5ACIgBgBg");
	this.shape_10.setTransform(257.2625,52.6229);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#DC918D").s().p("AAYEWIgCgDIgCgEIAAgJQAAgJgCgEQgCgFgEgEIAAgCIAAgCIgGABIgGgBIgCAAIgCAAQgHAAgEADIgWACIgZAEIgXgBQgGgFgEgGQgEgJgBgJIAAgBIAAgKIAAgJIAAgJIABgJIACgIIABgCIABgBIAAgCIAAgBIABgBIAAgBIABgCIABgBIAAgBIABAAIAAgBIAAgCIAAgBIAAgCIABgBIAAgCIAAgBIAAgBIAAgqIAAgwIAAgZIgBgLIgBgMIAAgLIAAgGQgCgLAAgLIAAgXIAAgaIAAgdQAAgMACgMIAAgMIAAgNIAAgMIAAgLIABgKIABgGQgBgNAEgNQADgMAKgIQAMgJAPABQANABAKAIQAJAIADAMQADALAAAMIgBAQIgCAHIAAAKIAAABIACAIIAAAUIAAAPQADgFAFgEQADgDAFgCIAAgDIABgFIABgFIAAgBQAAgMAGgJIAAgIIAAgDQgCgIAAgHIACgKQgBgPABgOQAAgIADgHQAEgNAMgIQANgHAOACQANACAKAKQAKAKABAPIAAAaIACAPIAAARIAAAOIAAAOIAAAIQADAKgBAKIAAAVIAAARIABAGIABAVIAAAxIABA3QAAAOgDANIAAACIAAADIAAADIAAADIAAADIgBADIAAADIgBADIAAANIAAAOIAAAPIAAAPIAAARIgCAHIAAACIAAADIAAADIAAADIAAACIgBADIgBADIAAABIABAkQAAAQgCAQQgBAHgEAGIgCACIgWAAIgVAAIgKACIgHgBg");
	this.shape_11.setTransform(258.525,52.4289);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#DC918D").s().p("AiiA+IAAh7IFFAAIAAB7g");
	this.shape_12.setTransform(237.425,72);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance,p:{regX:21.5,regY:9.2,scaleX:1.4938,scaleY:1.4938,x:274.35,y:71.7}}]}).to({state:[{t:this.shape_1},{t:this.instance,p:{regX:21.4,regY:9.3,scaleX:1.118,scaleY:1.6868,x:266.7,y:71.85}}]},1).to({state:[{t:this.shape_2},{t:this.instance_1,p:{regX:14.2,regY:22.8,scaleX:1.2489,scaleY:0.7695,skewX:77.3924,skewY:85.3691,x:266.25,y:-168.35,rotation:0}}]},1).to({state:[{t:this.shape_3},{t:this.instance_1,p:{regX:14.1,regY:22.7,scaleX:1.2084,scaleY:0.9542,skewX:59.5296,skewY:73.4907,x:227.2,y:-171.15,rotation:0}}]},1).to({state:[{t:this.shape_4},{t:this.instance_1,p:{regX:14.2,regY:22.6,scaleX:1.2473,scaleY:1.2465,skewX:0,skewY:0,x:139.15,y:-146.7,rotation:48.599}}]},1).to({state:[{t:this.shape_5},{t:this.instance_1,p:{regX:14.1,regY:22.6,scaleX:1.3256,scaleY:1.3248,skewX:0,skewY:0,x:64,y:-105.9,rotation:28.6302}}]},2).to({state:[{t:this.shape_6},{t:this.instance_1,p:{regX:14.2,regY:22.6,scaleX:1.3571,scaleY:1.3563,skewX:0,skewY:0,x:14.45,y:-45.4,rotation:7.9879}}]},2).to({state:[{t:this.shape_7},{t:this.instance_1,p:{regX:14.2,regY:22.5,scaleX:1.3248,scaleY:1.324,skewX:0,skewY:0,x:18.4,y:-45.3,rotation:5.2654}}]},3).to({state:[{t:this.shape_8},{t:this.instance_1,p:{regX:14.1,regY:22.6,scaleX:1.4044,scaleY:1.4036,skewX:0,skewY:0,x:19.4,y:-84.85,rotation:12.1882}}]},3).to({state:[{t:this.shape_9},{t:this.instance_1,p:{regX:14.2,regY:22.5,scaleX:1.327,scaleY:1.3262,skewX:0,skewY:0,x:2.25,y:13,rotation:-7.1616}}]},3).to({state:[{t:this.shape_10,p:{y:52.6229}},{t:this.instance_1,p:{regX:14.1,regY:22.6,scaleX:1.4044,scaleY:1.4036,skewX:0,skewY:0,x:19.85,y:-84.75,rotation:12.1882}}]},3).to({state:[{t:this.shape_11,p:{x:258.525,y:52.4289}},{t:this.instance_1,p:{regX:14.2,regY:22.5,scaleX:1.327,scaleY:1.3262,skewX:0,skewY:0,x:2.4,y:12.8,rotation:-7.1616}}]},3).to({state:[{t:this.shape_10,p:{y:52.8229}},{t:this.instance_1,p:{regX:14.1,regY:22.6,scaleX:1.4044,scaleY:1.4036,skewX:0,skewY:0,x:19.85,y:-84.55,rotation:12.1882}}]},3).to({state:[{t:this.shape_11,p:{x:258.075,y:52.8789}},{t:this.instance_1,p:{regX:14.2,regY:22.5,scaleX:1.327,scaleY:1.3262,skewX:0,skewY:0,x:1.95,y:13.25,rotation:-7.1616}}]},4).to({state:[{t:this.shape_12},{t:this.instance,p:{regX:21.5,regY:9.2,scaleX:1.4938,scaleY:1.4938,x:273.95,y:70.3}}]},7).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(221.2,-21.7,85.19999999999999,109.10000000000001);


(lib.heads = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.h1("single",1);
	this.instance.setTransform(31.2,87.1,1.0098,1.0104,0,0,0,30.9,59.9);

	this.instance_1 = new lib.h1("synched",0);
	this.instance_1.setTransform(31.2,87.1,1.0098,1.0104,0,0,0,30.9,59.9);

	this.instance_2 = new lib.h3("synched",0);
	this.instance_2.setTransform(35.4,90.1,1,1,0,0,0,35.4,56.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance,p:{y:87.1,mode:"single",startPosition:1}}]}).to({state:[{t:this.instance_2,p:{mode:"synched",startPosition:0}}]},1).to({state:[{t:this.instance_2,p:{mode:"single",startPosition:1}}]},1).to({state:[{t:this.instance,p:{y:87.05,mode:"synched",startPosition:0}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,26.6,70.8,121.1);


(lib.rightHandClicking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.handRegular("synched",0);
	this.instance.setTransform(0.05,0.05,0.9999,0.9999,0,0,0,29,13.5);

	this.instance_1 = new lib.clickHands2("synched",0);
	this.instance_1.setTransform(-0.05,0.05,1,1,0,0,0,29.2,12.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},29).to({state:[{t:this.instance}]},6).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.2,-13.4,58.5,26.9);


(lib.body = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4CEC9").s().p("AmBA9IGMmQQA7g8BVgFQBVgEBBA1QBBA2ANBUQAMBTgvBHIk5HUg");
	this.shape.setTransform(-61.7437,-24.5425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F2A79F").s().p("AmEIyQgtgegMg0QgMg0AcguIIXtsQAphDBNgRQBNgRBBAsQBDAsANBPQANBPgwBAIptMwQggAqgzAJQgMACgMAAQgmAAghgWg");
	this.shape_1.setTransform(-72.5926,-4.6073);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F2A79F").s().p("AGwCcIsygxQg0gHghgpQgggpAEgzQAEg1AogjQAogkA1ACIMsC3QAYAFAOAUQAPAUgDAYQgCAagUARQgTAQgXAAIgEAAg");
	this.shape_2.setTransform(-65.6285,44.3757);

	this.instance = new lib.hello("synched",37,false);
	this.instance.setTransform(-42.3,20.35,1,1,0,0,0,146.2,40.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4CEC9").s().p("Am4KIIAFxNQAAhQA4g5QA5g5BQAAIHlAAQBQAAA7BWQA7BVAABtIAAP3g");
	this.shape_3.setTransform(-12.175,0.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#DC918D").s().p("AjUi8IE7g8IBuHjIkZAOg");
	this.shape_4.setTransform(39.625,33.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E4CEC9").s().p("AkjigQgIhVAzhDQA0hEBTgPQBTgQBHAsQBIAtAXBRICdIdIoVBlg");
	this.shape_5.setTransform(28.6019,-23.2519);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.instance},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-117.5,-65,235,130.1);


(lib.woman2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shirt1("synched",0);
	this.instance.setTransform(340.05,0,1.0026,1.0055,-0.9025,0,0,87.4,15.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:75.7,regY:72.1,scaleX:1.0027,scaleY:1.0056,rotation:-0.8433,x:329.15,y:57.15},0).wait(1).to({rotation:-0.7827,x:329.1,y:57.1},0).wait(1).to({rotation:-0.7221,x:329},0).wait(1).to({rotation:-0.6615,y:57.05},0).wait(1).to({rotation:-0.6009,x:328.9},0).wait(1).to({rotation:-0.5403,x:328.85},0).wait(1).to({rotation:-0.4797,x:328.8},0).wait(1).to({rotation:-0.4191,x:328.75},0).wait(1).to({rotation:-0.3585,x:328.65},0).wait(1).to({rotation:-0.298,y:57},0).wait(1).to({rotation:-0.2374,x:328.55},0).wait(1).to({rotation:-0.1768,x:328.45,y:56.95},0).wait(1).to({rotation:-0.1162},0).wait(1).to({rotation:-0.0556,x:328.35,y:57},0).wait(1).to({rotation:0.005,x:328.3,y:56.95},0).wait(1).to({rotation:0.0656,x:328.2},0).wait(1).to({rotation:0.1262,y:56.9},0).wait(1).to({rotation:0.1868,x:328.1},0).wait(1).to({rotation:0.2474,x:328.05},0).wait(1).to({rotation:0.308,x:328,y:56.85},0).wait(1).to({rotation:0.3686,x:327.95,y:56.9},0).wait(1).to({rotation:0.4292,x:327.9,y:56.85},0).wait(1).to({rotation:0.4898,x:327.85},0).wait(1).to({rotation:0.5504,x:327.75},0).wait(1).to({rotation:0.611,y:56.8},0).wait(1).to({rotation:0.6716,x:327.65},0).wait(1).to({rotation:0.7322,x:327.55},0).wait(1).to({rotation:0.7928},0).wait(1).to({rotation:0.8534,x:327.45},0).wait(1).to({rotation:0.914,x:327.4,y:56.75},0).wait(1).to({rotation:0.9746,x:327.35},0).wait(1).to({rotation:1.0352,x:327.3,y:56.7},0).wait(1).to({rotation:1.0958,x:327.2},0).wait(1).to({rotation:1.1564,y:56.75},0).wait(1).to({rotation:1.2169,x:327.1,y:56.7},0).wait(1).to({rotation:1.2775},0).wait(1).to({rotation:1.3381,x:327,y:56.65},0).wait(1).to({rotation:1.3987,x:326.95},0).wait(1).to({rotation:1.4593,x:326.9},0).wait(1).to({rotation:1.5199,x:326.8},0).wait(1).to({rotation:1.5805,x:326.7,y:56.6},0).wait(1).to({rotation:1.6411,x:326.65,y:56.55},0).wait(1).to({rotation:1.7017,x:326.6},0).wait(1).to({rotation:1.7623,x:326.55},0).wait(1).to({rotation:1.8229,x:326.5,y:56.5},0).wait(1).to({rotation:1.8835,x:326.4},0).wait(1).to({rotation:1.9441},0).wait(1).to({rotation:2.0047,x:326.3},0).wait(1).to({rotation:2.0653},0).wait(1).to({rotation:2.1259,x:326.2,y:56.45},0).wait(1).to({rotation:2.1865,x:326.15},0).wait(1).to({rotation:2.2471,x:326.1},0).wait(1).to({rotation:2.3077,x:326.05},0).wait(1).to({rotation:2.2871},0).wait(1).to({rotation:2.2665,x:326.1},0).wait(1).to({rotation:2.2459,y:56.4},0).wait(1).to({rotation:2.2253,x:326.15,y:56.45},0).wait(1).to({rotation:2.2047,x:326.1},0).wait(1).to({rotation:2.1842,x:326.15},0).wait(1).to({rotation:2.1636},0).wait(1).to({rotation:2.143,x:326.2,y:56.5},0).wait(1).to({rotation:2.1224,y:56.45},0).wait(1).to({rotation:2.1018,x:326.25,y:56.5},0).wait(1).to({rotation:2.0812,y:56.45},0).wait(1).to({rotation:2.0606,y:56.5},0).wait(1).to({rotation:2.04},0).wait(1).to({rotation:2.0195,x:326.3,y:56.45},0).wait(1).to({rotation:1.9989,y:56.5},0).wait(1).to({rotation:1.9783,x:326.35},0).wait(1).to({rotation:1.9577},0).wait(1).to({rotation:1.9371,x:326.4},0).wait(1).to({rotation:1.9165,x:326.45},0).wait(1).to({rotation:1.8959,x:326.4},0).wait(1).to({rotation:1.8753,x:326.45,y:56.55},0).wait(1).to({rotation:1.8548,y:56.5},0).wait(1).to({rotation:1.8342,x:326.5,y:56.55},0).wait(1).to({rotation:1.8136},0).wait(1).to({rotation:1.793,x:326.55,y:56.5},0).wait(1).to({rotation:1.7724,y:56.55},0).wait(1).to({rotation:1.7518,y:56.5},0).wait(1).to({rotation:1.7312,y:56.55},0).wait(1).to({rotation:1.7107,x:326.6},0).wait(1).to({rotation:1.6901},0).wait(1).to({rotation:1.6695,x:326.65},0).wait(1).to({rotation:1.6489,y:56.6},0).wait(1).to({rotation:1.6283,x:326.7,y:56.55},0).wait(1).to({rotation:1.6077,y:56.6},0).wait(1).to({rotation:1.5871,y:56.55},0).wait(1).to({rotation:1.5665,y:56.6},0).wait(1).to({rotation:1.546,x:326.75,y:56.65},0).wait(1).to({rotation:1.5254,y:56.6},0).wait(1).to({rotation:1.5048,x:326.8,y:56.65},0).wait(1).to({rotation:1.4842,x:326.85},0).wait(1).to({rotation:1.4636,x:326.9},0).wait(1).to({rotation:1.443},0).wait(1).to({rotation:1.4224},0).wait(1).to({rotation:1.4018,x:326.95},0).wait(1).to({rotation:1.3813,y:56.7},0).wait(1).to({rotation:1.3607,x:327,y:56.65},0).wait(1).to({rotation:1.3401},0).wait(1).to({rotation:1.3195,x:327.05,y:56.7},0).wait(1).to({rotation:1.2989,y:56.65},0).wait(1).to({rotation:1.2783,x:327.1,y:56.7},0).wait(1).to({rotation:1.2577,x:327.05,y:56.65},0).wait(1).to({rotation:1.2371,x:327.1,y:56.7},0).wait(1).to({rotation:1.2166},0).wait(1).to({rotation:1.196,x:327.15},0).wait(1).to({rotation:1.1754},0).wait(1).to({rotation:1.1548,x:327.2,y:56.75},0).wait(1).to({rotation:1.1342,y:56.7},0).wait(1).to({rotation:1.1136,x:327.25,y:56.75},0).wait(1).to({rotation:1.093,x:327.2},0).wait(1).to({rotation:1.0725,x:327.25,y:56.7},0).wait(1).to({rotation:1.0519,y:56.75},0).wait(1).to({rotation:1.0313,x:327.3,y:56.7},0).wait(1).to({rotation:1.0107,y:56.75},0).wait(1).to({rotation:0.9901,x:327.35},0).wait(1).to({rotation:0.9695},0).wait(1).to({rotation:0.9489,x:327.4},0).wait(1).to({rotation:0.9283,y:56.8},0).wait(1).to({rotation:0.9078,y:56.75},0).wait(1).to({scaleX:1.0026,rotation:0.8872,x:327.45},0).wait(1).to({scaleX:1.0027,rotation:0.8666},0).wait(1).to({rotation:0.846,x:327.5},0).wait(1).to({rotation:0.8254,y:56.8},0).wait(1).to({rotation:0.8048,x:327.55,y:56.75},0).wait(1).to({rotation:0.7842,y:56.8},0).wait(1).to({rotation:0.7636},0).wait(1).to({rotation:0.7431},0).wait(1).to({rotation:0.7225,x:327.6},0).wait(1).to({rotation:0.7019},0).wait(1).to({rotation:0.6813,x:327.65},0).wait(1).to({rotation:0.6607},0).wait(1).to({rotation:0.6401,x:327.7},0).wait(1).to({rotation:0.6195},0).wait(1).to({rotation:0.5989,y:56.85},0).wait(1).to({rotation:0.5784,y:56.8},0).wait(1).to({rotation:0.5578,x:327.75,y:56.85},0).wait(1).to({rotation:0.5372,y:56.8},0).wait(1).to({rotation:0.5166,x:327.8,y:56.85},0).wait(1).to({rotation:0.496},0).wait(1).to({rotation:0.4754,x:327.85},0).wait(1).to({rotation:0.4548},0).wait(1).to({rotation:0.4342,x:327.9,y:56.9},0).wait(1).to({rotation:0.4137,y:56.85},0).wait(1).to({rotation:0.3931},0).wait(1).to({rotation:0.3725,x:327.95},0).wait(1).to({rotation:0.3519},0).wait(1).to({rotation:0.3313,x:328,y:56.9},0).wait(1).to({rotation:0.3107,y:56.85},0).wait(1).to({rotation:0.2901,x:328.05,y:56.9},0).wait(1).to({rotation:0.2696},0).wait(1).to({rotation:0.249,x:328.1},0).wait(1).to({rotation:0.2284,x:328.05},0).wait(1).to({rotation:0.2078,x:328.1},0).wait(1).to({rotation:0.1872},0).wait(1).to({rotation:0.1666,x:328.15},0).wait(1).to({rotation:0.146},0).wait(1).to({rotation:0.1254,x:328.2},0).wait(1).to({rotation:0.1049,y:56.95},0).wait(1).to({rotation:0.0843,x:328.25,y:56.9},0).wait(1).to({rotation:0.0637,x:328.2,y:56.95},0).wait(1).to({rotation:0.0431,x:328.25},0).wait(1).to({rotation:0.0225},0).wait(1).to({rotation:0.0019,x:328.3},0).wait(1).to({rotation:-0.0187},0).wait(1).to({rotation:-0.0393,x:328.35},0).wait(1).to({rotation:-0.0598},0).wait(1).to({rotation:-0.0804,x:328.4},0).wait(1).to({rotation:-0.101,x:328.45},0).wait(1).to({rotation:-0.1216,x:328.4,y:57},0).wait(1).to({rotation:-0.1422,x:328.45,y:56.95},0).wait(1).to({rotation:-0.1628,y:57},0).wait(1).to({rotation:-0.1834,x:328.5,y:56.95},0).wait(1).to({rotation:-0.204,y:57},0).wait(1).to({rotation:-0.2245,x:328.55},0).wait(1).to({rotation:-0.2451},0).wait(1).to({rotation:-0.2657,x:328.6},0).wait(1).to({rotation:-0.2863},0).wait(1).to({rotation:-0.3069},0).wait(1).to({rotation:-0.3275},0).wait(1).to({rotation:-0.3481,x:328.65,y:57.05},0).wait(1).to({rotation:-0.3686,y:57},0).wait(1).to({rotation:-0.3892,x:328.7,y:57.05},0).wait(1).to({rotation:-0.4098,y:57},0).wait(1).to({rotation:-0.4304,x:328.75,y:57.05},0).wait(1).to({rotation:-0.451},0).wait(1).to({rotation:-0.4716,x:328.8},0).wait(1).to({rotation:-0.4922},0).wait(1).to({rotation:-0.5128},0).wait(1).to({rotation:-0.5333},0).wait(1).to({rotation:-0.5539,x:328.85},0).wait(1).to({rotation:-0.5745,x:328.9},0).wait(1).to({rotation:-0.5951},0).wait(1).to({rotation:-0.6157,x:328.95,y:57.1},0).wait(1).to({rotation:-0.6363,y:57.05},0).wait(1).to({rotation:-0.6569,x:329,y:57.1},0).wait(1).to({rotation:-0.6775},0).wait(1).to({rotation:-0.698},0).wait(1).to({rotation:-0.7186},0).wait(1).to({rotation:-0.7392,x:329.05,y:57.05},0).wait(1).to({rotation:-0.7598,y:57.1},0).wait(1).to({rotation:-0.7804,x:329.1},0).wait(1).to({rotation:-0.801},0).wait(1).to({rotation:-0.8216,x:329.15},0).wait(1).to({rotation:-0.8422,y:57.15},0).wait(1).to({rotation:-0.8627,x:329.2,y:57.1},0).wait(1).to({scaleX:1.0026,rotation:-0.8833,y:57.15},0).wait(1).to({scaleX:1.0027,rotation:-0.9039},0).wait(1));

	// leftHand
	this.instance_1 = new lib.leftHand1("synched",0);
	this.instance_1.setTransform(409.95,30.05,1,1,-0.2535,0,0,120.4,18.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:64.5,regY:90.6,rotation:-0.2872,x:354.35,y:102.25},0).wait(1).to({rotation:-0.3208},0).wait(1).to({rotation:-0.3544,y:102.3},0).wait(1).to({rotation:-0.388,x:354.4},0).wait(1).to({rotation:-0.4216,y:102.4},0).wait(1).to({rotation:-0.4552},0).wait(1).to({rotation:-0.4888},0).wait(1).to({rotation:-0.5224,x:354.5,y:102.45},0).wait(1).to({rotation:-0.556},0).wait(1).to({rotation:-0.5896,y:102.55},0).wait(1).to({rotation:-0.6233,x:354.55},0).wait(1).to({rotation:-0.6569},0).wait(1).to({rotation:-0.6905,y:102.6},0).wait(1).to({rotation:-0.7241,y:102.65},0).wait(1).to({rotation:-0.7577,x:354.6,y:102.7},0).wait(1).to({rotation:-0.7913},0).wait(1).to({rotation:-0.8249,y:102.75},0).wait(1).to({rotation:-0.8585,x:354.65,y:102.8},0).wait(1).to({rotation:-0.8921},0).wait(1).to({rotation:-0.9257,y:102.85},0).wait(1).to({rotation:-0.9594},0).wait(1).to({rotation:-0.993,x:354.7,y:102.95},0).wait(1).to({rotation:-1.0266},0).wait(1).to({rotation:-1.0602,x:354.75},0).wait(1).to({rotation:-1.0938,x:354.8,y:103},0).wait(1).to({rotation:-1.1274,y:103.05},0).wait(1).to({rotation:-1.161,y:103.1},0).wait(1).to({rotation:-1.1946},0).wait(1).to({rotation:-1.2282,x:354.85,y:103.15},0).wait(1).to({rotation:-1.2618,y:103.2},0).wait(1).to({rotation:-1.2955},0).wait(1).to({rotation:-1.3291,x:354.9,y:103.25},0).wait(1).to({rotation:-1.3627},0).wait(1).to({rotation:-1.3963,y:103.3},0).wait(1).to({rotation:-1.4299,x:354.95},0).wait(1).to({rotation:-1.4635},0).wait(1).to({rotation:-1.4971,y:103.35},0).wait(1).to({rotation:-1.5307,y:103.4},0).wait(1).to({rotation:-1.5643,x:355,y:103.45},0).wait(1).to({rotation:-1.5979,x:355.05},0).wait(1).to({rotation:-1.6316,x:355,y:103.5},0).wait(1).to({rotation:-1.6652,x:355.05,y:103.55},0).wait(1).to({rotation:-1.6988},0).wait(1).to({rotation:-1.7324,y:103.6},0).wait(1).to({rotation:-1.766,x:355.1},0).wait(1).to({rotation:-1.7996,y:103.65},0).wait(1).to({rotation:-1.8332,y:103.7},0).wait(1).to({rotation:-1.8668,x:355.15},0).wait(1).to({rotation:-1.9004,y:103.75},0).wait(1).to({rotation:-1.934},0).wait(1).to({rotation:-1.9677,x:355.2,y:103.85},0).wait(1).to({rotation:-2.0013},0).wait(1).to({rotation:-2.0349,y:103.9},0).wait(1).to({rotation:-2.0685},0).wait(1).to({rotation:-2.1021,x:355.25,y:103.95},0).wait(1).to({rotation:-2.1357,x:355.3,y:104},0).wait(1).to({rotation:-2.1693},0).wait(1).to({rotation:-2.2029,x:355.35,y:104.05},0).wait(1).to({rotation:-2.1723,x:355.25,y:104},0).wait(1).to({rotation:-2.1417,x:355.2},0).wait(1).to({rotation:-2.1111,x:355.15,y:103.95},0).wait(1).to({rotation:-2.0805,x:355.05},0).wait(1).to({rotation:-2.0499,x:355,y:103.9},0).wait(1).to({rotation:-2.0194,x:354.95},0).wait(1).to({rotation:-1.9888,x:354.85,y:103.85},0).wait(1).to({rotation:-1.9582,x:354.8,y:103.8},0).wait(1).to({rotation:-1.9276,x:354.75},0).wait(1).to({rotation:-1.897,x:354.65,y:103.75},0).wait(1).to({rotation:-1.8664,x:354.6,y:103.7},0).wait(1).to({rotation:-1.8358,x:354.5},0).wait(1).to({rotation:-1.8052,x:354.45,y:103.65},0).wait(1).to({rotation:-1.7746,x:354.4},0).wait(1).to({rotation:-1.744,x:354.3,y:103.6},0).wait(1).to({rotation:-1.7134,x:354.25,y:103.55},0).wait(1).to({rotation:-1.6828,x:354.2},0).wait(1).to({rotation:-1.6522,x:354.1,y:103.5},0).wait(1).to({rotation:-1.6216},0).wait(1).to({rotation:-1.591,x:354.05,y:103.45},0).wait(1).to({rotation:-1.5604,x:353.95},0).wait(1).to({rotation:-1.5298,x:353.9,y:103.4},0).wait(1).to({rotation:-1.4992,x:353.85,y:103.35},0).wait(1).to({rotation:-1.4686,x:353.75},0).wait(1).to({rotation:-1.438,x:353.7,y:103.3},0).wait(1).to({rotation:-1.4074,x:353.65,y:103.25},0).wait(1).to({rotation:-1.3768,x:353.6,y:103.3},0).wait(1).to({rotation:-1.3462,x:353.55},0).wait(1).to({rotation:-1.3156,x:353.5,y:103.2},0).wait(1).to({rotation:-1.285,x:353.4},0).wait(1).to({rotation:-1.2544,x:353.35},0).wait(1).to({rotation:-1.2238,x:353.3,y:103.1},0).wait(1).to({rotation:-1.1932,x:353.2},0).wait(1).to({rotation:-1.1626,x:353.15},0).wait(1).to({rotation:-1.1321,x:353.05,y:103.05},0).wait(1).to({rotation:-1.1015,x:353,y:103},0).wait(1).to({rotation:-1.0709,x:352.95},0).wait(1).to({rotation:-1.0403,x:352.85},0).wait(1).to({rotation:-1.0097,x:352.8,y:102.9},0).wait(1).to({rotation:-0.9791,x:352.75},0).wait(1).to({rotation:-0.9485,x:352.65},0).wait(1).to({rotation:-0.9179,x:352.6,y:102.8},0).wait(1).to({rotation:-0.8873,x:352.55},0).wait(1).to({rotation:-0.8567,x:352.45},0).wait(1).to({rotation:-0.8261,x:352.4,y:102.75},0).wait(1).to({rotation:-0.7955,x:352.35,y:102.7},0).wait(1).to({rotation:-0.7649,x:352.25},0).wait(1).to({rotation:-0.7343,x:352.2,y:102.65},0).wait(1).to({rotation:-0.7037,x:352.15,y:102.6},0).wait(1).to({rotation:-0.6731,x:352.05},0).wait(1).to({rotation:-0.6425,x:352},0).wait(1).to({rotation:-0.6119,x:351.95,y:102.55},0).wait(1).to({rotation:-0.5813,x:351.9,y:102.5},0).wait(1).to({rotation:-0.5507,x:351.8},0).wait(1).to({rotation:-0.5201,x:351.75,y:102.45},0).wait(1).to({rotation:-0.4895,x:351.7,y:102.4},0).wait(1).to({rotation:-0.4589,x:351.6},0).wait(1).to({rotation:-0.4283,y:102.35},0).wait(1).to({rotation:-0.3977,x:351.55},0).wait(1).to({rotation:-0.3671,x:351.45,y:102.3},0).wait(1).to({rotation:-0.3365,x:351.4,y:102.25},0).wait(1).to({rotation:-0.3059,x:351.35},0).wait(1).to({rotation:-0.2753,x:351.25,y:102.2},0).wait(1).to({rotation:-0.2448,x:351.2},0).wait(1).to({rotation:-0.2142,x:351.15,y:102.15},0).wait(1).to({rotation:-0.1836,x:351.05},0).wait(1).to({rotation:-0.153,x:351,y:102.1},0).wait(1).to({rotation:-0.1224,x:350.95,y:102.05},0).wait(1).to({rotation:-0.0918,x:350.85},0).wait(1).to({rotation:-0.0612,x:350.8,y:102},0).wait(1).to({rotation:-0.0306,x:350.75,y:101.95},0).wait(1).to({rotation:0,x:350.65},0).wait(1).to({rotation:0.0306,x:350.6},0).wait(1).to({rotation:0.0612,x:350.55,y:101.85},0).wait(1).to({rotation:0.0918,x:350.5},0).wait(1).to({rotation:0.1224,x:350.4},0).wait(1).to({rotation:0.153,x:350.35,y:101.75},0).wait(1).to({rotation:0.1836,x:350.3},0).wait(1).to({rotation:0.2142,x:350.2},0).wait(1).to({rotation:0.2448,x:350.15},0).wait(1).to({rotation:0.2754,x:350.1,y:101.65},0).wait(1).to({rotation:0.306,x:350},0).wait(1).to({rotation:0.3366,x:349.95},0).wait(1).to({rotation:0.3672,x:349.9,y:101.55},0).wait(1).to({rotation:0.3978,x:349.8},0).wait(1).to({rotation:0.4284,x:349.75},0).wait(1).to({rotation:0.459,y:101.5},0).wait(1).to({rotation:0.4896,x:349.7,y:101.45},0).wait(1).to({rotation:0.5202,x:349.6},0).wait(1).to({rotation:0.5508,x:349.55,y:101.4},0).wait(1).to({rotation:0.5814,x:349.5,y:101.35},0).wait(1).to({rotation:0.612,x:349.4},0).wait(1).to({rotation:0.6425,x:349.35,y:101.3},0).wait(1).to({rotation:0.6731,x:349.3},0).wait(1).to({rotation:0.7037,x:349.2,y:101.25},0).wait(1).to({rotation:0.7343,x:349.15},0).wait(1).to({rotation:0.7649,x:349.1,y:101.2},0).wait(1).to({rotation:0.7955,x:349.05,y:101.15},0).wait(1).to({rotation:0.7757,x:349.1},0).wait(1).to({rotation:0.7559,x:349.2,y:101.2},0).wait(1).to({rotation:0.7362,x:349.35,y:101.25},0).wait(1).to({rotation:0.7164,x:349.4},0).wait(1).to({rotation:0.6966,x:349.5,y:101.3},0).wait(1).to({rotation:0.6768,x:349.65,y:101.25},0).wait(1).to({rotation:0.657,x:349.7,y:101.3},0).wait(1).to({rotation:0.6372,x:349.8},0).wait(1).to({rotation:0.6174,x:349.9,y:101.35},0).wait(1).to({rotation:0.5976,x:350},0).wait(1).to({rotation:0.5778,x:350.15,y:101.4},0).wait(1).to({rotation:0.558,x:350.2},0).wait(1).to({rotation:0.5382,x:350.3},0).wait(1).to({rotation:0.5184,x:350.45,y:101.45},0).wait(1).to({rotation:0.4986,x:350.5},0).wait(1).to({rotation:0.4788,x:350.6,y:101.5},0).wait(1).to({rotation:0.459,x:350.7},0).wait(1).to({rotation:0.4392,x:350.8},0).wait(1).to({rotation:0.4194,x:350.95},0).wait(1).to({rotation:0.3997,x:351,y:101.55},0).wait(1).to({rotation:0.3799,x:351.1,y:101.6},0).wait(1).to({rotation:0.3601,x:351.25},0).wait(1).to({rotation:0.3403,x:351.3,y:101.65},0).wait(1).to({rotation:0.3205,x:351.4,y:101.6},0).wait(1).to({rotation:0.3007,x:351.55,y:101.65},0).wait(1).to({rotation:0.2809,x:351.6},0).wait(1).to({rotation:0.2611,x:351.75,y:101.7},0).wait(1).to({rotation:0.2413,x:351.8},0).wait(1).to({rotation:0.2215,x:351.9,y:101.75},0).wait(1).to({rotation:0.2017,x:352.05},0).wait(1).to({rotation:0.1819,x:352.1},0).wait(1).to({rotation:0.1621,x:352.2,y:101.8},0).wait(1).to({rotation:0.1423,x:352.35},0).wait(1).to({rotation:0.1225,x:352.4,y:101.85},0).wait(1).to({rotation:0.1027,x:352.55},0).wait(1).to({rotation:0.083,x:352.6},0).wait(1).to({rotation:0.0632,x:352.7},0).wait(1).to({rotation:0.0434,x:352.85,y:101.9},0).wait(1).to({rotation:0.0236,x:352.9,y:101.95},0).wait(1).to({rotation:0.0038,x:353.05},0).wait(1).to({rotation:-0.016,x:353.1,y:102},0).wait(1).to({rotation:-0.0358,x:353.2,y:101.95},0).wait(1).to({rotation:-0.0556,x:353.35,y:102},0).wait(1).to({rotation:-0.0754,x:353.4},0).wait(1).to({rotation:-0.0952,x:353.5,y:102.05},0).wait(1).to({rotation:-0.115,x:353.65},0).wait(1).to({rotation:-0.1348,x:353.7,y:102.1},0).wait(1).to({rotation:-0.1546,x:353.85},0).wait(1).to({rotation:-0.1744,x:353.95},0).wait(1).to({rotation:-0.1942,x:354,y:102.15},0).wait(1).to({rotation:-0.214,x:354.15},0).wait(1).to({rotation:-0.2337,x:354.2,y:102.2},0).wait(1).to({rotation:-0.2535,x:354.3,y:102.15},0).wait(1));

	// rightHand
	this.instance_2 = new lib.rightHand1("synched",0);
	this.instance_2.setTransform(280,30.05,1,1,0,0,0,160.8,38.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:96.6,regY:58.8,rotation:-0.0389,x:215.75,y:50.35},0).wait(1).to({rotation:-0.0778},0).wait(1).to({rotation:-0.1167,x:215.65,y:50.4},0).wait(1).to({rotation:-0.1556,y:50.45},0).wait(1).to({rotation:-0.1945,x:215.6},0).wait(1).to({rotation:-0.2334,y:50.55},0).wait(1).to({rotation:-0.2723,x:215.55,y:50.6},0).wait(1).to({rotation:-0.3112,x:215.5,y:50.65},0).wait(1).to({rotation:-0.3501,x:215.45},0).wait(1).to({rotation:-0.389,y:50.7},0).wait(1).to({rotation:-0.4279,x:215.4,y:50.8},0).wait(1).to({rotation:-0.4668},0).wait(1).to({rotation:-0.5057,x:215.35,y:50.85},0).wait(1).to({rotation:-0.5446,x:215.3,y:50.9},0).wait(1).to({rotation:-0.5835},0).wait(1).to({rotation:-0.6224,x:215.25,y:50.95},0).wait(1).to({rotation:-0.6613,y:51.05},0).wait(1).to({rotation:-0.7002,x:215.15},0).wait(1).to({rotation:-0.7391,y:51.1},0).wait(1).to({rotation:-0.778,x:215.1,y:51.15},0).wait(1).to({rotation:-0.8169},0).wait(1).to({rotation:-0.8558,y:51.25},0).wait(1).to({rotation:-0.8947,x:215,y:51.3},0).wait(1).to({rotation:-0.9336,y:51.35},0).wait(1).to({rotation:-0.9725,x:214.95},0).wait(1).to({rotation:-1.0114,y:51.4},0).wait(1).to({rotation:-1.0503,x:214.9,y:51.5},0).wait(1).to({rotation:-1.0892,x:214.85},0).wait(1).to({rotation:-1.1281,x:214.8,y:51.55},0).wait(1).to({rotation:-1.167,y:51.6},0).wait(1).to({rotation:-1.2059},0).wait(1).to({rotation:-1.2448,x:214.75,y:51.7},0).wait(1).to({rotation:-1.2837,x:214.65,y:51.75},0).wait(1).to({rotation:-1.3226,x:214.6},0).wait(1).to({rotation:-1.3615,y:51.8},0).wait(1).to({rotation:-1.4004,y:51.85},0).wait(1).to({rotation:-1.4393,x:214.55,y:51.9},0).wait(1).to({rotation:-1.4782,x:214.5,y:51.95},0).wait(1).to({rotation:-1.5171,x:214.45,y:52},0).wait(1).to({rotation:-1.556,y:52.05},0).wait(1).to({rotation:-1.5949,x:214.4},0).wait(1).to({rotation:-1.6338,y:52.15},0).wait(1).to({rotation:-1.6727,x:214.35},0).wait(1).to({rotation:-1.7116,x:214.3},0).wait(1).to({rotation:-1.7505,y:52.2},0).wait(1).to({rotation:-1.7894,x:214.25,y:52.25},0).wait(1).to({rotation:-1.8283},0).wait(1).to({rotation:-1.8672,x:214.2,y:52.35},0).wait(1).to({rotation:-1.9061,x:214.15,y:52.4},0).wait(1).to({rotation:-1.945},0).wait(1).to({rotation:-1.9839,x:214.1,y:52.45},0).wait(1).to({rotation:-2.0228,y:52.5},0).wait(1).to({rotation:-2.0617,x:214.05,y:52.6},0).wait(1).to({rotation:-2.1006,x:214},0).wait(1).to({rotation:-2.1395,y:52.65},0).wait(1).to({rotation:-2.1784,x:213.95,y:52.7},0).wait(1).to({rotation:-2.2173,x:213.9,y:52.75},0).wait(1).to({rotation:-2.2562,x:213.85,y:52.8},0).wait(1).to({rotation:-2.2951,x:213.8,y:52.85},0).wait(1).to({rotation:-2.334},0).wait(1).to({rotation:-2.3729,y:52.9},0).wait(1).to({rotation:-2.4118,x:213.7,y:53},0).wait(1).to({rotation:-2.4507},0).wait(1).to({rotation:-2.4896,x:213.65,y:53.05},0).wait(1).to({rotation:-2.5285,y:53.1},0).wait(1).to({rotation:-2.5674},0).wait(1).to({rotation:-2.6063,x:213.55,y:53.2},0).wait(1).to({rotation:-2.6452,y:53.25},0).wait(1).to({rotation:-2.6841,y:53.3},0).wait(1).to({rotation:-2.723,x:213.5},0).wait(1).to({rotation:-2.7034,x:213.4},0).wait(1).to({rotation:-2.6838},0).wait(1).to({rotation:-2.6642,x:213.35,y:53.25},0).wait(1).to({rotation:-2.6447,x:213.25},0).wait(1).to({rotation:-2.6251},0).wait(1).to({rotation:-2.6055,x:213.15,y:53.15},0).wait(1).to({rotation:-2.5859,x:213.1},0).wait(1).to({rotation:-2.5663,x:213.05},0).wait(1).to({rotation:-2.5467,x:213,y:53.1},0).wait(1).to({rotation:-2.5271,x:212.95},0).wait(1).to({rotation:-2.5075,x:212.85,y:53.05},0).wait(1).to({rotation:-2.4879,x:212.8},0).wait(1).to({rotation:-2.4683},0).wait(1).to({rotation:-2.4488,x:212.7,y:53},0).wait(1).to({rotation:-2.4292,x:212.65},0).wait(1).to({rotation:-2.4096,x:212.6,y:52.95},0).wait(1).to({rotation:-2.39,x:212.55,y:52.9},0).wait(1).to({rotation:-2.3704,x:212.5},0).wait(1).to({rotation:-2.3508,x:212.4},0).wait(1).to({rotation:-2.3312,y:52.85},0).wait(1).to({rotation:-2.3116,x:212.3},0).wait(1).to({rotation:-2.292,x:212.25},0).wait(1).to({rotation:-2.2724,x:212.2,y:52.8},0).wait(1).to({rotation:-2.2529,x:212.15},0).wait(1).to({rotation:-2.2333,y:52.75},0).wait(1).to({rotation:-2.2137,x:212.05,y:52.7},0).wait(1).to({rotation:-2.1941},0).wait(1).to({rotation:-2.1745,x:212},0).wait(1).to({rotation:-2.1549,x:211.9,y:52.65},0).wait(1).to({rotation:-2.1353,x:211.85},0).wait(1).to({rotation:-2.1157,x:211.8},0).wait(1).to({rotation:-2.0961,x:211.75,y:52.6},0).wait(1).to({rotation:-2.0765,x:211.7},0).wait(1).to({rotation:-2.057,x:211.6,y:52.55},0).wait(1).to({rotation:-2.0374,y:52.5},0).wait(1).to({rotation:-2.0178,x:211.5},0).wait(1).to({rotation:-1.9982,x:211.45},0).wait(1).to({rotation:-1.9786,y:52.45},0).wait(1).to({rotation:-1.959,x:211.35},0).wait(1).to({rotation:-1.9394,x:211.3},0).wait(1).to({rotation:-1.9198,x:211.2,y:52.4},0).wait(1).to({rotation:-1.9002},0).wait(1).to({rotation:-1.8806,x:211.15,y:52.35},0).wait(1).to({rotation:-1.8611,x:211.05,y:52.3},0).wait(1).to({rotation:-1.8415},0).wait(1).to({rotation:-1.8219,x:210.95},0).wait(1).to({rotation:-1.8023,x:210.9,y:52.25},0).wait(1).to({rotation:-1.7827,x:210.85},0).wait(1).to({rotation:-1.7631,x:210.8},0).wait(1).to({rotation:-1.7435,x:210.75,y:52.2},0).wait(1).to({rotation:-1.7239,x:210.65},0).wait(1).to({rotation:-1.7043,x:210.6,y:52.15},0).wait(1).to({rotation:-1.6847,y:52.1},0).wait(1).to({rotation:-1.6652,x:210.5},0).wait(1).to({rotation:-1.6456,x:210.45},0).wait(1).to({rotation:-1.626,x:210.4},0).wait(1).to({rotation:-1.6064,x:210.35},0).wait(1).to({rotation:-1.5868,x:210.3},0).wait(1).to({rotation:-1.5672,x:210.2,y:52.05},0).wait(1).to({rotation:-1.5476},0).wait(1).to({rotation:-1.528,x:210.1,y:52},0).wait(1).to({rotation:-1.5084,x:210.05,y:51.95},0).wait(1).to({rotation:-1.4888},0).wait(1).to({rotation:-1.4693,x:209.95,y:51.9},0).wait(1).to({rotation:-1.4497,x:209.9},0).wait(1).to({rotation:-1.4301,x:209.85},0).wait(1).to({rotation:-1.4105,x:209.8,y:51.85},0).wait(1).to({rotation:-1.3909,x:209.75},0).wait(1).to({rotation:-1.3713,x:209.65},0).wait(1).to({rotation:-1.3517,y:51.8},0).wait(1).to({rotation:-1.3321,x:209.55,y:51.75},0).wait(1).to({rotation:-1.3125,x:209.5},0).wait(1).to({rotation:-1.2929,y:51.7},0).wait(1).to({rotation:-1.2734,x:209.4},0).wait(1).to({rotation:-1.2538},0).wait(1).to({rotation:-1.2342,x:209.3,y:51.65},0).wait(1).to({rotation:-1.2146},0).wait(1).to({rotation:-1.195,x:209.25},0).wait(1).to({rotation:-1.1754,x:209.15,y:51.6},0).wait(1).to({rotation:-1.1558},0).wait(1).to({rotation:-1.1362,x:209.05,y:51.55},0).wait(1).to({rotation:-1.1166,x:209,y:51.5},0).wait(1).to({rotation:-1.097,x:208.95},0).wait(1).to({rotation:-1.0775,x:208.9},0).wait(1).to({rotation:-1.0579,x:208.85,y:51.45},0).wait(1).to({rotation:-1.0383,x:208.75},0).wait(1).to({rotation:-1.0187},0).wait(1).to({rotation:-0.9991,x:208.65,y:51.4},0).wait(1).to({rotation:-0.9795,x:208.6},0).wait(1).to({rotation:-0.9599,y:51.35},0).wait(1).to({rotation:-0.9403,x:208.5,y:51.3},0).wait(1).to({rotation:-0.9207,x:208.45},0).wait(1).to({rotation:-0.9011,x:208.35},0).wait(1).to({rotation:-0.8816,y:51.25},0).wait(1).to({rotation:-0.862,x:208.3},0).wait(1).to({rotation:-0.8424,x:208.2},0).wait(1).to({rotation:-0.8228,y:51.2},0).wait(1).to({rotation:-0.8032,x:208.1},0).wait(1).to({rotation:-0.7836,x:208.05},0).wait(1).to({rotation:-0.764,x:208.3,y:51.1},0).wait(1).to({rotation:-0.7444,x:208.45},0).wait(1).to({rotation:-0.7248,x:208.65},0).wait(1).to({rotation:-0.7052,x:208.8,y:51.05},0).wait(1).to({rotation:-0.6857,x:209.05},0).wait(1).to({rotation:-0.6661,x:209.25},0).wait(1).to({rotation:-0.6465,x:209.4,y:51},0).wait(1).to({rotation:-0.6269,x:209.6},0).wait(1).to({rotation:-0.6073,x:209.8},0).wait(1).to({rotation:-0.5877,x:210,y:50.95},0).wait(1).to({rotation:-0.5681,x:210.2,y:50.9},0).wait(1).to({rotation:-0.5485,x:210.35},0).wait(1).to({rotation:-0.5289,x:210.6,y:50.85},0).wait(1).to({rotation:-0.5093,x:210.75},0).wait(1).to({rotation:-0.4898,x:210.95,y:50.8},0).wait(1).to({rotation:-0.4702,x:211.15},0).wait(1).to({rotation:-0.4506,x:211.35},0).wait(1).to({rotation:-0.431,x:211.55,y:50.75},0).wait(1).to({rotation:-0.4114,x:211.7},0).wait(1).to({rotation:-0.3918,x:211.9},0).wait(1).to({rotation:-0.3722,x:212.15,y:50.65},0).wait(1).to({rotation:-0.3526,x:212.3},0).wait(1).to({rotation:-0.333,x:212.5},0).wait(1).to({rotation:-0.3134,x:212.65,y:50.6},0).wait(1).to({rotation:-0.2939,x:212.9},0).wait(1).to({rotation:-0.2743,x:213.1},0).wait(1).to({rotation:-0.2547,x:213.25,y:50.55},0).wait(1).to({rotation:-0.2351,x:213.45},0).wait(1).to({rotation:-0.2155,x:213.65},0).wait(1).to({rotation:-0.1959,x:213.85,y:50.5},0).wait(1).to({rotation:-0.1763,x:214.05,y:50.45},0).wait(1).to({rotation:-0.1567,x:214.2},0).wait(1).to({rotation:-0.1371,x:214.45,y:50.4},0).wait(1).to({rotation:-0.1175,x:214.6},0).wait(1).to({rotation:-0.098,x:214.8},0).wait(1).to({rotation:-0.0784,x:215,y:50.35},0).wait(1).to({rotation:-0.0588,x:215.2},0).wait(1).to({rotation:-0.0392,x:215.4},0).wait(1).to({rotation:-0.0196,x:215.55,y:50.3},0).wait(1).to({rotation:0,x:215.8,y:50.25},0).wait(1));

	// eyes
	this.instance_3 = new lib.eyes();
	this.instance_3.setTransform(303.8,-62.05,1,1,0,0,0,9.6,3.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({regX:8.8,regY:3.2,x:302.95,y:-61.95},0).wait(3).to({x:302.9},0).wait(4).to({x:302.85},0).wait(3).to({x:302.8},0).wait(4).to({x:302.75},0).wait(3).to({x:302.7},0).wait(4).to({x:302.65},0).wait(2).to({y:-62},0).wait(1).to({x:302.6},0).wait(4).to({x:302.55},0).wait(3).to({x:302.5},0).wait(4).to({x:302.45},0).wait(4).to({x:302.4},0).wait(3).to({x:302.35},0).wait(4).to({x:302.3,y:-62.05},0).wait(3).to({x:302.25},0).wait(4).to({x:302.2},0).wait(3).to({x:302.15},0).wait(4).to({x:302.1},0).wait(3).to({x:302.05},0).wait(4).to({x:302},0).wait(3).to({x:301.95,y:-62.1},0).wait(4).to({x:301.9},0).wait(4).to({x:301.85},0).wait(3).to({x:301.8},0).wait(4).to({x:301.75},0).wait(3).to({x:301.7},0).wait(4).to({x:301.65},0).wait(1).to({y:-62.15},0).wait(2).to({x:301.6},0).wait(4).to({x:301.55},0).wait(3).to({x:301.5},0).wait(4).to({x:301.45},0).wait(3).to({x:301.4},0).wait(4).to({x:301.35},0).wait(3).to({y:-62.2},0).wait(2).to({y:-62.25},0).wait(2).to({x:301.4,y:-62.3},0).wait(2).to({y:-62.35},0).wait(1).to({x:301.45,y:-62.4},0).wait(2).to({y:-62.45},0).wait(1).to({x:301.5},0).wait(1).to({y:-62.5},0).wait(2).to({x:301.55,y:-62.55},0).wait(1).to({y:-62.6},0).wait(2).to({y:-62.65},0).wait(1).to({x:301.6},0).wait(1).to({y:-62.7},0).wait(2).to({x:301.65,y:-62.75},0).wait(1).to({y:-62.8},0).wait(2).to({x:301.7,y:-62.85},0).wait(2).to({y:-62.9},0).wait(1).to({x:301.75},0).wait(1).to({y:-62.95},0).wait(1).to({y:-63},0).wait(2).to({x:301.8,y:-63.05},0).wait(2).to({y:-63.1},0).wait(1).to({x:301.85},0).wait(1).to({y:-63.15},0).wait(1).to({y:-63.2},0).wait(1).to({x:301.9},0).wait(1).to({y:-63.25},0).wait(2).to({x:301.95,y:-63.3},0).wait(2).to({y:-63.35},0).wait(1).to({x:302,y:-63.4},0).wait(2).to({y:-63.45},0).wait(2).to({x:302.05,y:-63.5},0).wait(1).to({y:-63.55},0).wait(2).to({x:302.1,y:-63.6},0).wait(2).to({y:-63.65},0).wait(1).to({x:302.15},0).wait(1).to({y:-63.7},0).wait(1).to({y:-63.75},0).wait(1).to({x:302.2},0).wait(1).to({y:-63.8},0).wait(2).to({y:-63.85},0).wait(1).to({x:302.25},0).wait(1).to({y:-63.9},0).wait(1).to({y:-63.95},0).wait(1).to({x:302.3},0).wait(1).to({y:-63.9},0).wait(1).to({x:302.35,y:-63.8},0).wait(1).to({y:-63.75},0).wait(1).to({x:302.4,y:-63.7},0).wait(1).to({y:-63.6},0).wait(1).to({y:-63.55},0).wait(1).to({x:302.45,y:-63.5},0).wait(1).to({y:-63.4},0).wait(1).to({x:302.5,y:-63.35},0).wait(1).to({y:-63.3},0).wait(1).to({x:302.55,y:-63.2},0).wait(1).to({y:-63.15},0).wait(1).to({x:302.6,y:-63.1},0).wait(1).to({y:-63},0).wait(1).to({x:302.65,y:-62.95},0).wait(1).to({y:-62.85},0).wait(1).to({x:302.7,y:-62.8},0).wait(1).to({y:-62.75},0).wait(1).to({y:-62.65},0).wait(1).to({x:302.75,y:-62.6},0).wait(1).to({y:-62.55},0).wait(1).to({x:302.8,y:-62.45},0).wait(1).to({y:-62.4},0).wait(1).to({x:302.85,y:-62.35},0).wait(1).to({y:-62.25},0).wait(1).to({x:302.9,y:-62.2},0).wait(1).to({y:-62.15},0).wait(1).to({x:302.95,y:-62.05},0).wait(1).to({y:-62},0).wait(1).to({x:303,y:-61.95},0).wait(1));

	// lips
	this.instance_4 = new lib.lips1("synched",0);
	this.instance_4.setTransform(301.7,-42.75,1,1,0,0,0,6.8,3.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(55).to({mode:"single",startPosition:6},0).wait(139).to({mode:"synched"},0).wait(16));

	// head
	this.instance_5 = new lib.head1("single",1);
	this.instance_5.setTransform(360.05,-89.5,1,1,0,0,0,95.5,23.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1).to({regX:67.2,regY:77.4,x:331.75,y:-35.9},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-35.95},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.05},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.15},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.2},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.25},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.3},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.35},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.4},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.45},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.5},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.55},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.6},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.65},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.7},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.75},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.8},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.85},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.9},0).wait(1).to({y:-36.85},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.8},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.75},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.7},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.65},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.6},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.55},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.5},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.45},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.4},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.35},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.3},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.25},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.2},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.15},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36.05},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-36},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-35.95},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({y:-35.9},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1).to({startPosition:1},0).wait(1));

	// rightLeg
	this.instance_6 = new lib.leg11("synched",0);
	this.instance_6.setTransform(320,129.95,1,1,0,0,0,255.2,-13.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1).to({regX:156.3,regY:93.4,rotation:0.0161,x:221,y:236.9},0).wait(1).to({rotation:0.0322},0).wait(1).to({rotation:0.0482,x:220.95,y:236.85},0).wait(1).to({rotation:0.0643,y:236.8},0).wait(1).to({rotation:0.0804,x:220.9,y:236.75},0).wait(1).to({rotation:0.0965},0).wait(1).to({rotation:0.1125,x:220.85,y:236.7},0).wait(1).to({rotation:0.1286},0).wait(1).to({rotation:0.1447,x:220.8},0).wait(1).to({rotation:0.1608,y:236.65},0).wait(1).to({rotation:0.1769,x:220.75},0).wait(1).to({rotation:0.1929,y:236.55},0).wait(1).to({rotation:0.209,x:220.7},0).wait(1).to({rotation:0.2251,x:220.65,y:236.5},0).wait(1).to({rotation:0.2412,x:220.6},0).wait(1).to({rotation:0.2573},0).wait(1).to({rotation:0.2733,x:220.55,y:236.45},0).wait(1).to({rotation:0.2894},0).wait(1).to({rotation:0.3055,x:220.5,y:236.4},0).wait(1).to({rotation:0.3216},0).wait(1).to({rotation:0.3376,x:220.45,y:236.3},0).wait(1).to({rotation:0.3537,x:220.4},0).wait(1).to({rotation:0.3698},0).wait(1).to({rotation:0.3859,x:220.35,y:236.25},0).wait(1).to({rotation:0.402},0).wait(1).to({rotation:0.418,x:220.3,y:236.2},0).wait(1).to({rotation:0.4341},0).wait(1).to({rotation:0.4502,x:220.25,y:236.15},0).wait(1).to({rotation:0.4663,x:220.2,y:236.1},0).wait(1).to({rotation:0.4824,x:220.15},0).wait(1).to({rotation:0.4984,y:236.05},0).wait(1).to({rotation:0.5145,x:220.1},0).wait(1).to({rotation:0.5306,y:236},0).wait(1).to({rotation:0.5467,x:220.05},0).wait(1).to({rotation:0.5627,y:235.95},0).wait(1).to({rotation:0.5788,x:220},0).wait(1).to({rotation:0.5949,y:235.85},0).wait(1).to({rotation:0.611,x:219.95},0).wait(1).to({rotation:0.6271},0).wait(1).to({rotation:0.6431,x:219.9,y:235.8},0).wait(1).to({rotation:0.6592},0).wait(1).to({rotation:0.6753,x:219.85,y:235.75},0).wait(1).to({rotation:0.6914,x:219.8},0).wait(1).to({rotation:0.7075,y:235.7},0).wait(1).to({rotation:0.7235,x:219.7,y:235.65},0).wait(1).to({rotation:0.7396},0).wait(1).to({rotation:0.7557,x:219.65,y:235.6},0).wait(1).to({rotation:0.7718},0).wait(1).to({rotation:0.7878,x:219.6,y:235.55},0).wait(1).to({rotation:0.8039},0).wait(1).to({rotation:0.82,x:219.55,y:235.5},0).wait(1).to({rotation:0.8361},0).wait(1).to({rotation:0.8522,x:219.5,y:235.45},0).wait(1).to({rotation:0.8682,y:235.4},0).wait(1).to({rotation:0.8843,x:219.45},0).wait(1).to({rotation:0.9004,y:235.35},0).wait(1).to({rotation:0.9165,x:219.4},0).wait(1).to({rotation:0.9326,y:235.3},0).wait(1).to({rotation:0.9486,x:219.35},0).wait(1).to({rotation:0.9647},0).wait(1).to({rotation:0.9808,x:219.3,y:235.2},0).wait(1).to({rotation:0.9969},0).wait(1).to({rotation:1.0129,x:219.2,y:235.15},0).wait(1).to({rotation:1.029,x:219.1},0).wait(1).to({rotation:1.0451,y:235.1},0).wait(1).to({rotation:1.0612,x:219.05},0).wait(1).to({rotation:1.0773,y:235.05},0).wait(1).to({rotation:1.0933,x:219},0).wait(1).to({rotation:1.1094,y:235},0).wait(1).to({rotation:1.1255,x:218.95,y:234.95},0).wait(1).to({rotation:1.1416},0).wait(1).to({rotation:1.1577,x:218.9,y:234.9},0).wait(1).to({rotation:1.1737},0).wait(1).to({rotation:1.1898,x:218.85,y:234.85},0).wait(1).to({rotation:1.2059},0).wait(1).to({rotation:1.222,x:218.8},0).wait(1).to({rotation:1.238,y:234.75},0).wait(1).to({rotation:1.2541,x:218.75},0).wait(1).to({rotation:1.2702,y:234.7},0).wait(1).to({rotation:1.2863,x:218.7},0).wait(1).to({rotation:1.3024,y:234.65},0).wait(1).to({rotation:1.3184,x:218.65,y:234.6},0).wait(1).to({rotation:1.3345},0).wait(1).to({rotation:1.3506,x:218.6,y:234.55},0).wait(1).to({rotation:1.3667,x:218.5},0).wait(1).to({rotation:1.3828,y:234.45},0).wait(1).to({rotation:1.3988,x:218.45},0).wait(1).to({rotation:1.4149,y:234.4},0).wait(1).to({rotation:1.431,x:218.4},0).wait(1).to({rotation:1.4471},0).wait(1).to({rotation:1.4631,x:218.35,y:234.35},0).wait(1).to({rotation:1.4792},0).wait(1).to({rotation:1.4953,x:218.3,y:234.3},0).wait(1).to({rotation:1.5114,y:234.25},0).wait(1).to({rotation:1.5275,x:218.25,y:234.2},0).wait(1).to({rotation:1.5435},0).wait(1).to({rotation:1.5596,x:218.2,y:234.15},0).wait(1).to({rotation:1.5757},0).wait(1).to({rotation:1.5918,x:218.15},0).wait(1).to({rotation:1.6078,y:234.1},0).wait(1).to({rotation:1.6239,x:218.1},0).wait(1).to({rotation:1.64,y:234},0).wait(1).to({rotation:1.6561,x:218.05},0).wait(1).to({rotation:1.6722,y:233.95},0).wait(1).to({rotation:1.6882,x:218},0).wait(1).to({rotation:1.7043,x:217.95},0).wait(1).to({rotation:1.6876,x:218},0).wait(1).to({rotation:1.6709,x:218.05,y:234},0).wait(1).to({rotation:1.6542},0).wait(1).to({rotation:1.6375,x:218.1,y:234.05},0).wait(1).to({rotation:1.6208},0).wait(1).to({rotation:1.6041,x:218.15,y:234.1},0).wait(1).to({rotation:1.5874,y:234.15},0).wait(1).to({rotation:1.5706,x:218.2},0).wait(1).to({rotation:1.5539,y:234.2},0).wait(1).to({rotation:1.5372,x:218.25},0).wait(1).to({rotation:1.5205,y:234.25},0).wait(1).to({rotation:1.5038,x:218.3},0).wait(1).to({rotation:1.4871,x:218.35,y:234.3},0).wait(1).to({rotation:1.4704},0).wait(1).to({rotation:1.4537,x:218.4,y:234.35},0).wait(1).to({rotation:1.437},0).wait(1).to({rotation:1.4203,x:218.45,y:234.4},0).wait(1).to({rotation:1.4036,y:234.45},0).wait(1).to({rotation:1.3868,x:218.5,y:234.5},0).wait(1).to({rotation:1.3701},0).wait(1).to({rotation:1.3534,x:218.6,y:234.55},0).wait(1).to({rotation:1.3367},0).wait(1).to({rotation:1.32,x:218.65,y:234.6},0).wait(1).to({rotation:1.3033,x:218.7,y:234.65},0).wait(1).to({rotation:1.2866,y:234.7},0).wait(1).to({rotation:1.2699,x:218.75},0).wait(1).to({rotation:1.2532,y:234.75},0).wait(1).to({rotation:1.2365,x:218.8},0).wait(1).to({rotation:1.2198,y:234.85},0).wait(1).to({rotation:1.203,x:218.85},0).wait(1).to({rotation:1.1863,y:234.9},0).wait(1).to({rotation:1.1696,x:218.9},0).wait(1).to({rotation:1.1529,y:234.95},0).wait(1).to({rotation:1.1362,x:218.95},0).wait(1).to({rotation:1.1195,x:219,y:235},0).wait(1).to({rotation:1.1028},0).wait(1).to({rotation:1.0861,x:219.05,y:235.05},0).wait(1).to({rotation:1.0694},0).wait(1).to({rotation:1.0527,x:219.1,y:235.1},0).wait(1).to({rotation:1.036},0).wait(1).to({rotation:1.0193,x:219.15,y:235.2},0).wait(1).to({rotation:1.0025,x:219.2},0).wait(1).to({rotation:0.9858,x:219.3,y:235.25},0).wait(1).to({rotation:0.9691},0).wait(1).to({rotation:0.9524,x:219.35,y:235.3},0).wait(1).to({rotation:0.9357,x:219.4},0).wait(1).to({rotation:0.919,y:235.35},0).wait(1).to({rotation:0.9023,x:219.45},0).wait(1).to({rotation:0.8856,y:235.4},0).wait(1).to({rotation:0.8689,x:219.5},0).wait(1).to({rotation:0.8522,y:235.45},0).wait(1).to({rotation:0.8355,x:219.55,y:235.5},0).wait(1).to({rotation:0.8187,y:235.55},0).wait(1).to({rotation:0.802,x:219.6},0).wait(1).to({rotation:0.7853,y:235.6},0).wait(1).to({rotation:0.7686,x:219.65},0).wait(1).to({rotation:0.7519},0).wait(1).to({rotation:0.7352,x:219.7,y:235.65},0).wait(1).to({rotation:0.7185,x:219.8},0).wait(1).to({rotation:0.7018,y:235.7},0).wait(1).to({rotation:0.6851,x:219.85},0).wait(1).to({rotation:0.6684,y:235.75},0).wait(1).to({rotation:0.6517,x:219.9,y:235.8},0).wait(1).to({rotation:0.6349,y:235.85},0).wait(1).to({rotation:0.6182,x:219.95},0).wait(1).to({rotation:0.6015,y:235.9},0).wait(1).to({rotation:0.5848,x:220},0).wait(1).to({rotation:0.5681,x:220.05,y:235.95},0).wait(1).to({rotation:0.5514},0).wait(1).to({rotation:0.5347,x:220.1,y:236},0).wait(1).to({rotation:0.518},0).wait(1).to({rotation:0.5013,x:220.15,y:236.05},0).wait(1).to({rotation:0.4846},0).wait(1).to({rotation:0.4679,x:220.2,y:236.15},0).wait(1).to({rotation:0.4511,x:220.25},0).wait(1).to({rotation:0.4344,x:220.3,y:236.2},0).wait(1).to({rotation:0.4177},0).wait(1).to({rotation:0.401,x:220.35,y:236.25},0).wait(1).to({rotation:0.3843},0).wait(1).to({rotation:0.3676,x:220.4,y:236.3},0).wait(1).to({rotation:0.3509,x:220.45},0).wait(1).to({rotation:0.3342,y:236.35},0).wait(1).to({rotation:0.3175,x:220.5},0).wait(1).to({rotation:0.3008,y:236.4},0).wait(1).to({rotation:0.2841,x:220.55},0).wait(1).to({rotation:0.2673,y:236.5},0).wait(1).to({rotation:0.2506,x:220.6},0).wait(1).to({rotation:0.2339,y:236.55},0).wait(1).to({rotation:0.2172,x:220.7},0).wait(1).to({rotation:0.2005,y:236.6},0).wait(1).to({rotation:0.1838,x:220.75},0).wait(1).to({rotation:0.1671,x:220.8,y:236.65},0).wait(1).to({rotation:0.1504},0).wait(1).to({rotation:0.1337,x:220.85,y:236.7},0).wait(1).to({rotation:0.117},0).wait(1).to({rotation:0.1003,x:220.9,y:236.75},0).wait(1).to({rotation:0.0835,y:236.8},0).wait(1).to({rotation:0.0668,x:220.95,y:236.85},0).wait(1).to({rotation:0.0501},0).wait(1).to({rotation:0.0334,x:221,y:236.9},0).wait(1).to({rotation:0.0167},0).wait(1).to({rotation:0,x:221.1,y:236.95},0).wait(1).to({regX:156.2,regY:112.5,x:221,y:256.05},0).wait(1));

	// leftLeg
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F8EEE4").s().p("AkIFmQvQzzhaheIgMgMIA9pPIPQBdMAZwAopIqJIHQnWpmnop7g");
	this.shape.setTransform(234.7158,258.6696,0.4383,0.4383);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282E46").s().p("AnUGEQAJiGBvieQAog6AkglIgCgCIIGmHIDhErIqEHmg");
	this.shape_1.setTransform(291.466,350.1173,0.438,0.438);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#ED8B6D").s().p("AwvqxIKRsgMAXOAp7Il8Eog");
	this.shape_2.setTransform(258.5584,288.125,0.4382,0.4382);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},209).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(57.9,-114.3,366.8,481.6);


(lib.Scene_1_woman2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// woman2
	this.instance = new lib.woman2();
	this.instance.setTransform(1653.35,380.1,0.7337,0.7337);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(587).to({_off:false},0).to({x:674.7,y:379.55},8).wait(282).to({x:-578.5,y:380.7},14).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_rightPlant = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// rightPlant
	this.instance = new lib.rightPlant();
	this.instance.setTransform(1147.95,616.05,0.9999,0.9999,0,0,0,0,0.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(85).to({_off:false},0).wait(335));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_rightHandClick = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// rightHandClick
	this.instance = new lib.rightHandClicking();
	this.instance.setTransform(544.45,393.6,1,1,0,0,0,-24.1,-11.3);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(85).to({_off:false},0).wait(335));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_play_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// play_btn
	this.start = new lib.play();
	this.start.name = "start";
	this.start.setTransform(698.2,245.95);
	new cjs.ButtonHelper(this.start, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.start).wait(2));
	this.start.addEventListener("tick", AdobeAn.handleFilterCache);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_lights = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// lights
	this.instance = new lib.projectors("single",1);
	this.instance.setTransform(683.85,383.85,1.7451,1.7451,0,0,0,385.2,218.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1743).to({_off:false},0).wait(8).to({startPosition:0},0).wait(75).to({mode:"synched"},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_leftPlant = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// leftPlant
	this.instance = new lib.leftPlant();
	this.instance.setTransform(221.5,507.35);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(85).to({_off:false},0).wait(335));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_body = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// body
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4CEC9").s().p("AmBA9IGMmQQA7g8BVgFQBVgEBBA1QBBA2ANBUQAMBTgvBHIk5HUg");
	this.shape.setTransform(515.7563,328.8075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F2A79F").s().p("AmEIyQgtgegMg0QgMg0AcguIIXtsQAphDBNgRQBNgRBBAsQBDAsANBPQANBPgwBAIptMwQggAqgzAJQgMACgMAAQgmAAghgWg");
	this.shape_1.setTransform(504.9074,348.7427);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F2A79F").s().p("AGwCcIsygxQg0gHghgpQgggpAEgzQAEg1AogjQAogkA1ACIMsC3QAYAFAOAUQAPAUgDAYQgCAagUARQgTAQgXAAIgEAAg");
	this.shape_2.setTransform(511.8715,397.7257);

	this.instance = new lib.hello("single",0);
	this.instance.setTransform(535.2,373.7,1,1,0,0,0,146.2,40.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4CEC9").s().p("Am4KIIAFxNQAAhQA4g5QA5g5BQAAIHlAAQBQAAA7BWQA7BVAABtIAAP3g");
	this.shape_3.setTransform(565.325,353.625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#DC918D").s().p("AjUi8IE7g8IBuHjIkZAOg");
	this.shape_4.setTransform(617.125,386.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E4CEC9").s().p("AkjigQgIhVAzhDQA0hEBTgPQBTgQBHAsQBIAtAXBRICdIdIoVBlg");
	this.shape_5.setTransform(606.1019,330.0981);

	this.instance_1 = new lib.body("synched",0);
	this.instance_1.setTransform(577.5,353.35);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.instance,p:{mode:"single",loop:undefined,startPosition:0}},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},85).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.instance,p:{mode:"synched",loop:false,startPosition:0}},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},199).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.instance,p:{mode:"synched",loop:false,startPosition:37}},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},38).to({state:[{t:this.instance_1}]},240).to({state:[{t:this.instance_1}]},19).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(562).to({_off:false},0).to({x:-224.7,y:352},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_birdOfParadise = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// birdOfParadise
	this.instance = new lib.birdOfParadise1();
	this.instance.setTransform(1640,310,0.8272,0.8272);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(587).to({_off:false},0).wait(1).to({regX:5.3,regY:-0.9,x:1522.5,y:309.2},0).wait(1).to({x:1400.65},0).wait(1).to({x:1278.75},0).wait(1).to({x:1156.9},0).wait(1).to({x:1035},0).wait(1).to({x:913.15},0).wait(1).to({x:791.25},0).wait(1).to({x:669.4},0).wait(283).to({x:578.1,y:309.05},0).wait(1).to({x:486.8,y:308.9},0).wait(1).to({x:395.5,y:308.75},0).wait(1).to({x:304.25,y:308.6},0).wait(1).to({x:212.95,y:308.45},0).wait(1).to({x:121.65,y:308.3},0).wait(1).to({x:30.4,y:308.2},0).wait(1).to({x:-60.85,y:308.05},0).wait(1).to({x:-152.15,y:307.9},0).wait(1).to({x:-243.45,y:307.75},0).wait(1).to({x:-334.7,y:307.6},0).wait(1).to({x:-426,y:307.45},0).wait(1).to({x:-517.3,y:307.3},0).wait(1).to({x:-608.6,y:307.2},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_alison = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// alison
	this.instance = new lib.heads("single",0);
	this.instance.setTransform(649.1,222.75,1,1,0,0,0,117.8,73.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(85).to({_off:false},0).wait(44).to({startPosition:3},0).wait(4).to({startPosition:0},0).wait(128).to({startPosition:1},0).wait(51).to({startPosition:2},0).wait(4).to({startPosition:1},0).wait(46).to({startPosition:1},0).wait(22).to({startPosition:2},0).wait(3).to({startPosition:1},0).wait(19).to({startPosition:0},0).wait(72).to({startPosition:3},0).wait(4).to({startPosition:0},0).wait(80).to({regX:0,regY:0,x:528.65,y:149,mode:"synched"},0).to({regX:-0.1,regY:0.1,scaleX:0.9999,scaleY:0.9999,x:-276.1,y:149.05},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.V1000 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,2,79,587,871,1202,1552,1609,1732,1945];
	this.streamSoundSymbolsList[2] = [{id:"countdownBleeps",startFrame:2,endFrame:79,loop:1,offset:0}];
	this.streamSoundSymbolsList[587] = [{id:"scene2",startFrame:587,endFrame:870,loop:1,offset:0}];
	this.streamSoundSymbolsList[871] = [{id:"scene3",startFrame:871,endFrame:1201,loop:1,offset:0}];
	this.streamSoundSymbolsList[1202] = [{id:"scene4",startFrame:1202,endFrame:1552,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.start = this.play_btn.start;
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.start.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
	}
	this.frame_2 = function() {
		var soundInstance = playSound("countdownBleeps",0);
		this.InsertIntoSoundStreamData(soundInstance,2,79,1);
	}
	this.frame_79 = function() {
		playSound("scene1");
	}
	this.frame_587 = function() {
		var soundInstance = playSound("scene2",0);
		this.InsertIntoSoundStreamData(soundInstance,587,870,1);
	}
	this.frame_871 = function() {
		var soundInstance = playSound("scene3",0);
		this.InsertIntoSoundStreamData(soundInstance,871,1201,1);
	}
	this.frame_1202 = function() {
		var soundInstance = playSound("scene4",0);
		this.InsertIntoSoundStreamData(soundInstance,1202,1552,1);
	}
	this.frame_1552 = function() {
		playSound("scene5");
	}
	this.frame_1609 = function() {
		playSound("scene6");
	}
	this.frame_1732 = function() {
		playSound("scene7");
	}
	this.frame_1945 = function() {
		this.replayBtn = this.replay_btn.replayBtn;
		this.___loopingOver___ = true;
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.replayBtn.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay(2);
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2).call(this.frame_2).wait(77).call(this.frame_79).wait(508).call(this.frame_587).wait(284).call(this.frame_871).wait(331).call(this.frame_1202).wait(350).call(this.frame_1552).wait(57).call(this.frame_1609).wait(123).call(this.frame_1732).wait(213).call(this.frame_1945).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(683,384);
	this.___camera___instance.depth = 0;
	this.___camera___instance._off = true;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(65).to({_off:false},0).to({regX:7.3,regY:6.2,scaleX:0.096,scaleY:0.096,x:764.8,y:317.7},20,cjs.Ease.sineInOut).to({regX:0.6,regY:0.7,scaleX:1,scaleY:1,x:682.6,y:383.75},24).to({_off:true},1).wait(279).to({_off:false},0).wait(5).to({regX:0.8,regY:0.8,scaleX:0.4679,scaleY:0.4679,x:818.5,y:189.95},17).wait(171).to({regX:0.9,regY:0.9,scaleX:1,scaleY:1,x:684.65,y:384.05},0).to({_off:true},1).wait(974).to({_off:false,regX:1.2,regY:1.7,x:684.25,y:385.85},0).to({scaleX:1.7361,scaleY:1.7361,y:632.6},23).wait(366));

	// _2022_obj_
	this._2022 = new lib.Scene_1__2022();
	this._2022.name = "_2022";
	this._2022.depth = 0;
	this._2022.isAttachedToCamera = 0
	this._2022.isAttachedToMask = 0
	this._2022.layerDepth = 0
	this._2022.layerIndex = 0
	this._2022.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this._2022).wait(1313).to({_off:true},1).wait(632));

	// report_obj_
	this.report = new lib.Scene_1_report();
	this.report.name = "report";
	this.report.depth = 0;
	this.report.isAttachedToCamera = 0
	this.report.isAttachedToMask = 0
	this.report.layerDepth = 0
	this.report.layerIndex = 1
	this.report.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.report).wait(1313).to({_off:true},1).wait(632));

	// mask2011 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_1464 = new cjs.Graphics().p("EAKKA4VIAAhQMArmAAAIAABQg");
	var mask_graphics_1465 = new cjs.Graphics().p("EAKKA4SIAAkUMArmAAAIAAEUg");
	var mask_graphics_1466 = new cjs.Graphics().p("EAKKA4PIAAnYMArmAAAIAAHYg");
	var mask_graphics_1467 = new cjs.Graphics().p("EAKKA4MIAAqcMArmAAAIAAKcg");
	var mask_graphics_1468 = new cjs.Graphics().p("EAKKA4IIAAtfMArmAAAIAANfg");
	var mask_graphics_1469 = new cjs.Graphics().p("EAKKA4FIAAwjMArmAAAIAAQjg");
	var mask_graphics_1470 = new cjs.Graphics().p("EAKKA4CIAAznMArmAAAIAATng");
	var mask_graphics_1471 = new cjs.Graphics().p("EAKKA3/IAA2rMArmAAAIAAWrg");
	var mask_graphics_1472 = new cjs.Graphics().p("EAKKA38IAA5vMArmAAAIAAZvg");
	var mask_graphics_1473 = new cjs.Graphics().p("EAKKA35IAA8zMArmAAAIAAczg");
	var mask_graphics_1474 = new cjs.Graphics().p("EAKKA32IAA/3MArmAAAIAAf3g");
	var mask_graphics_1475 = new cjs.Graphics().p("EAKKA3yMAAAgi6MArmAAAMAAAAi6g");
	var mask_graphics_1476 = new cjs.Graphics().p("EAKKA3vMAAAgl+MArmAAAMAAAAl+g");
	var mask_graphics_1477 = new cjs.Graphics().p("EAKKA3sMAAAgpCMArmAAAMAAAApCg");
	var mask_graphics_1478 = new cjs.Graphics().p("EAKKA3pMAAAgsGMArmAAAMAAAAsGg");
	var mask_graphics_1479 = new cjs.Graphics().p("EAKKA3mMAAAgvKMArmAAAMAAAAvKg");
	var mask_graphics_1480 = new cjs.Graphics().p("EAKKA3jMAAAgyOMArmAAAMAAAAyOg");
	var mask_graphics_1481 = new cjs.Graphics().p("EAKKA4VMAAAg1SMArmAAAMAAAA1Sg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(1464).to({graphics:mask_graphics_1464,x:344.025,y:360.5}).wait(1).to({graphics:mask_graphics_1465,x:344.025,y:360.197}).wait(1).to({graphics:mask_graphics_1466,x:344.025,y:359.869}).wait(1).to({graphics:mask_graphics_1467,x:344.025,y:359.5659}).wait(1).to({graphics:mask_graphics_1468,x:344.025,y:359.238}).wait(1).to({graphics:mask_graphics_1469,x:344.025,y:358.9349}).wait(1).to({graphics:mask_graphics_1470,x:344.025,y:358.6319}).wait(1).to({graphics:mask_graphics_1471,x:344.025,y:358.3039}).wait(1).to({graphics:mask_graphics_1472,x:344.025,y:358.0009}).wait(1).to({graphics:mask_graphics_1473,x:344.025,y:357.6741}).wait(1).to({graphics:mask_graphics_1474,x:344.025,y:357.3711}).wait(1).to({graphics:mask_graphics_1475,x:344.025,y:357.0431}).wait(1).to({graphics:mask_graphics_1476,x:344.025,y:356.7401}).wait(1).to({graphics:mask_graphics_1477,x:344.025,y:356.4371}).wait(1).to({graphics:mask_graphics_1478,x:344.025,y:356.1091}).wait(1).to({graphics:mask_graphics_1479,x:344.025,y:355.806}).wait(1).to({graphics:mask_graphics_1480,x:344.025,y:355.478}).wait(1).to({graphics:mask_graphics_1481,x:344.025,y:360.5}).wait(465));

	// bechdel2011_obj_
	this.bechdel2011 = new lib.Scene_1_bechdel2011();
	this.bechdel2011.name = "bechdel2011";
	this.bechdel2011.depth = 0;
	this.bechdel2011.isAttachedToCamera = 0
	this.bechdel2011.isAttachedToMask = 0
	this.bechdel2011.layerDepth = 0
	this.bechdel2011.layerIndex = 2
	this.bechdel2011.maskLayerName = 0

	var maskedShapeInstanceList = [this.bechdel2011];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.bechdel2011).wait(1554).to({_off:true},1).wait(391));

	// mask2021 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_1481 = new cjs.Graphics().p("EAfKA4TIAAhQMAs4AAAIAABQg");
	var mask_1_graphics_1482 = new cjs.Graphics().p("EAfKA4TIAAkAMAs3AAAIAAEAg");
	var mask_1_graphics_1483 = new cjs.Graphics().p("EAfKA4TIAAmxMAs3AAAIAAGxg");
	var mask_1_graphics_1484 = new cjs.Graphics().p("EAfKA4TIAAphMAs3AAAIAAJhg");
	var mask_1_graphics_1485 = new cjs.Graphics().p("EAfKA4TIAAsRMAs3AAAIAAMRg");
	var mask_1_graphics_1486 = new cjs.Graphics().p("EAfKA4TIAAvCMAs3AAAIAAPCg");
	var mask_1_graphics_1487 = new cjs.Graphics().p("EAfKA4TIAAxyMAs3AAAIAARyg");
	var mask_1_graphics_1488 = new cjs.Graphics().p("EAfKA4TIAA0iMAs3AAAIAAUig");
	var mask_1_graphics_1489 = new cjs.Graphics().p("EAfKA4TIAA3TMAs3AAAIAAXTg");
	var mask_1_graphics_1490 = new cjs.Graphics().p("EAfKA4TIAA6DMAs3AAAIAAaDg");
	var mask_1_graphics_1491 = new cjs.Graphics().p("EAfKA4TIAA8zMAs3AAAIAAczg");
	var mask_1_graphics_1492 = new cjs.Graphics().p("EAfKA4TIAA/kMAs3AAAIAAfkg");
	var mask_1_graphics_1493 = new cjs.Graphics().p("EAfKA4TMAAAgiUMAs3AAAMAAAAiUg");
	var mask_1_graphics_1494 = new cjs.Graphics().p("EAfKA4TMAAAglEMAs3AAAMAAAAlEg");
	var mask_1_graphics_1495 = new cjs.Graphics().p("EAfKA4TMAAAgn1MAs3AAAMAAAAn1g");
	var mask_1_graphics_1496 = new cjs.Graphics().p("EAfKA4TMAAAgqlMAs3AAAMAAAAqlg");
	var mask_1_graphics_1497 = new cjs.Graphics().p("EAfKA4TMAAAgtVMAs3AAAMAAAAtVg");
	var mask_1_graphics_1498 = new cjs.Graphics().p("EAfKA4TMAAAgwGMAs3AAAMAAAAwGg");
	var mask_1_graphics_1499 = new cjs.Graphics().p("EAfKA4TMAAAgy2MAs3AAAMAAAAy2g");
	var mask_1_graphics_1500 = new cjs.Graphics().p("EAfKA4TMAAAg1mMAs3AAAMAAAA1mg");
	var mask_1_graphics_1501 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1502 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1503 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1504 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1505 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1506 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1507 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1508 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1509 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1510 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1511 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1512 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1513 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1514 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1515 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1516 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1517 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1518 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1519 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1520 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1521 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1522 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1523 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1524 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1525 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1526 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1527 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1528 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1529 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1530 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1531 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1532 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1533 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1534 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1535 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1536 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1537 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1538 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1539 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1540 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1541 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1542 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1543 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1544 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1545 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1546 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");
	var mask_1_graphics_1547 = new cjs.Graphics().p("EAfKA4TMAAAg4WMAs4AAAMAAAA4Wg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(1481).to({graphics:mask_1_graphics_1481,x:486.5504,y:360.3}).wait(1).to({graphics:mask_1_graphics_1482,x:486.5232,y:360.3087}).wait(1).to({graphics:mask_1_graphics_1483,x:486.5232,y:360.2924}).wait(1).to({graphics:mask_1_graphics_1484,x:486.5232,y:360.2998}).wait(1).to({graphics:mask_1_graphics_1485,x:486.5232,y:360.3085}).wait(1).to({graphics:mask_1_graphics_1486,x:486.5232,y:360.3172}).wait(1).to({graphics:mask_1_graphics_1487,x:486.5232,y:360.3009}).wait(1).to({graphics:mask_1_graphics_1488,x:486.5232,y:360.3096}).wait(1).to({graphics:mask_1_graphics_1489,x:486.5232,y:360.317}).wait(1).to({graphics:mask_1_graphics_1490,x:486.5232,y:360.3007}).wait(1).to({graphics:mask_1_graphics_1491,x:486.5232,y:360.3094}).wait(1).to({graphics:mask_1_graphics_1492,x:486.4982,y:360.3181}).wait(1).to({graphics:mask_1_graphics_1493,x:486.4982,y:360.3018}).wait(1).to({graphics:mask_1_graphics_1494,x:486.4982,y:360.3091}).wait(1).to({graphics:mask_1_graphics_1495,x:486.4982,y:360.3178}).wait(1).to({graphics:mask_1_graphics_1496,x:486.4982,y:360.3266}).wait(1).to({graphics:mask_1_graphics_1497,x:486.4982,y:360.3102}).wait(1).to({graphics:mask_1_graphics_1498,x:486.4982,y:360.319}).wait(1).to({graphics:mask_1_graphics_1499,x:486.4982,y:360.3263}).wait(1).to({graphics:mask_1_graphics_1500,x:486.4982,y:360.31}).wait(1).to({graphics:mask_1_graphics_1501,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1502,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1503,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1504,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1505,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1506,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1507,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1508,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1509,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1510,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1511,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1512,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1513,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1514,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1515,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1516,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1517,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1518,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1519,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1520,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1521,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1522,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1523,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1524,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1525,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1526,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1527,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1528,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1529,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1530,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1531,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1532,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1533,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1534,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1535,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1536,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1537,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1538,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1539,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1540,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1541,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1542,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1543,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1544,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1545,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1546,x:486.5504,y:360.3187}).wait(1).to({graphics:mask_1_graphics_1547,x:486.5504,y:360.3187}).wait(1).to({graphics:null,x:0,y:0}).wait(398));

	// bechdel2021_obj_
	this.bechdel2021 = new lib.Scene_1_bechdel2021();
	this.bechdel2021.name = "bechdel2021";
	this.bechdel2021.depth = 0;
	this.bechdel2021.isAttachedToCamera = 0
	this.bechdel2021.isAttachedToMask = 0
	this.bechdel2021.layerDepth = 0
	this.bechdel2021.layerIndex = 3
	this.bechdel2021.maskLayerName = 0

	var maskedShapeInstanceList = [this.bechdel2021];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.bechdel2021).wait(1554).to({_off:true},1).wait(391));

	// maskLines (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	var mask_2_graphics_1318 = new cjs.Graphics().p("EAGdAoQMAAAguDIBhAAMAAAAuDg");
	var mask_2_graphics_1319 = new cjs.Graphics().p("EAGiAoHMAAAguDIBeAAMAAAAuDg");
	var mask_2_graphics_1320 = new cjs.Graphics().p("EAGnAn+MAAAguDIBbAAMAAAAuDg");
	var mask_2_graphics_1321 = new cjs.Graphics().p("EAGtAn1MAAAguDIBXAAMAAAAuDg");
	var mask_2_graphics_1322 = new cjs.Graphics().p("EAGyAnsMAAAguDIBUAAMAAAAuDg");
	var mask_2_graphics_1323 = new cjs.Graphics().p("EAG3AnjMAAAguDIBRAAMAAAAuDg");
	var mask_2_graphics_1324 = new cjs.Graphics().p("EAG8AnaMAAAguDIBOAAMAAAAuDg");
	var mask_2_graphics_1325 = new cjs.Graphics().p("EAHBAnRMAAAguDIBLAAMAAAAuDg");
	var mask_2_graphics_1326 = new cjs.Graphics().p("EAHGAnIMAAAguDIBJAAMAAAAuDg");
	var mask_2_graphics_1327 = new cjs.Graphics().p("EAE2AnHMAAAguDIFpAAMAAAAuDg");
	var mask_2_graphics_1328 = new cjs.Graphics().p("EACmAnGMAAAguDIKJAAMAAAAuDg");
	var mask_2_graphics_1329 = new cjs.Graphics().p("EAAVAnFMAAAguDIOpAAMAAAAuDg");
	var mask_2_graphics_1330 = new cjs.Graphics().p("EgB5AnEMAAAguDITIAAMAAAAuDg");
	var mask_2_graphics_1331 = new cjs.Graphics().p("EgEJAnDMAAAguDIXoAAMAAAAuDg");
	var mask_2_graphics_1332 = new cjs.Graphics().p("EgGaAnCMAAAguDIcJAAMAAAAuDg");
	var mask_2_graphics_1333 = new cjs.Graphics().p("EgIpAnBMAAAguDMAgoAAAMAAAAuDg");
	var mask_2_graphics_1334 = new cjs.Graphics().p("EgK5AnAMAAAguDMAlJAAAMAAAAuDg");
	var mask_2_graphics_1335 = new cjs.Graphics().p("EgNKAm/MAAAguDMApqAAAMAAAAuDg");
	var mask_2_graphics_1336 = new cjs.Graphics().p("EgPZAm+MAAAguDMAuJAAAMAAAAuDg");
	var mask_2_graphics_1337 = new cjs.Graphics().p("EgRqAm9MAAAguEMAyqAAAMAAAAuEg");
	var mask_2_graphics_1338 = new cjs.Graphics().p("EgT6Am8MAAAguEMA3KAAAMAAAAuEg");
	var mask_2_graphics_1339 = new cjs.Graphics().p("EgWKAm6MAAAguCMA7qAAAMAAAAuCg");
	var mask_2_graphics_1340 = new cjs.Graphics().p("EgYaAm5MAAAguCMBALAAAMAAAAuCg");
	var mask_2_graphics_1341 = new cjs.Graphics().p("EgaqAm4MAAAguDMBErAAAMAAAAuDg");
	var mask_2_graphics_1342 = new cjs.Graphics().p("Egc6Am3MAAAguDMBJLAAAMAAAAuDg");
	var mask_2_graphics_1343 = new cjs.Graphics().p("EgfKAm2MAAAguDMBNrAAAMAAAAuDg");
	var mask_2_graphics_1344 = new cjs.Graphics().p("EghaAm1MAAAguDMBSMAAAMAAAAuDg");
	var mask_2_graphics_1345 = new cjs.Graphics().p("EgjqAm0MAAAguDMBWsAAAMAAAAuDg");
	var mask_2_graphics_1346 = new cjs.Graphics().p("Egl6AmzMAAAguDMBbMAAAMAAAAuDg");
	var mask_2_graphics_1347 = new cjs.Graphics().p("EgoKAmyMAAAguDMBfsAAAMAAAAuDg");
	var mask_2_graphics_1348 = new cjs.Graphics().p("EgqaAmxMAAAguDMBkMAAAMAAAAuDg");
	var mask_2_graphics_1349 = new cjs.Graphics().p("EgsrAmwMAAAguDMBotAAAMAAAAuDg");
	var mask_2_graphics_1350 = new cjs.Graphics().p("Egu6AmvMAAAguDMBtNAAAMAAAAuDg");
	var mask_2_graphics_1351 = new cjs.Graphics().p("EgxKAmuMAAAguDMBxtAAAMAAAAuDg");
	var mask_2_graphics_1352 = new cjs.Graphics().p("EgzaAmtMAAAguDMB2NAAAMAAAAuDg");
	var mask_2_graphics_1353 = new cjs.Graphics().p("Eg1rAmsMAAAguDMB6uAAAMAAAAuDg");
	var mask_2_graphics_1354 = new cjs.Graphics().p("Eg37AmrMAAAguEMB/PAAAMAAAAuEg");
	var mask_2_graphics_1355 = new cjs.Graphics().p("Eg6LAmqMAAAguEMCDvAAAMAAAAuEg");
	var mask_2_graphics_1356 = new cjs.Graphics().p("Eg8bAmoMAAAguCMCIOAAAMAAAAuCg");
	var mask_2_graphics_1357 = new cjs.Graphics().p("Eg+rAmnMAAAguCMCMvAAAMAAAAuCg");
	var mask_2_graphics_1358 = new cjs.Graphics().p("EhA7AmnMAAAguEMCRPAAAMAAAAuEg");
	var mask_2_graphics_1359 = new cjs.Graphics().p("EhDLAmlMAAAguDMCVwAAAMAAAAuDg");
	var mask_2_graphics_1360 = new cjs.Graphics().p("EhFbAmkMAAAguDMCaPAAAMAAAAuDg");
	var mask_2_graphics_1361 = new cjs.Graphics().p("EhHrAmjMAAAguDMCevAAAMAAAAuDg");
	var mask_2_graphics_1362 = new cjs.Graphics().p("EhJ7AmiMAAAguDMCjQAAAMAAAAuDg");
	var mask_2_graphics_1363 = new cjs.Graphics().p("EhMMAmhMAAAguDMCnxAAAMAAAAuDg");
	var mask_2_graphics_1364 = new cjs.Graphics().p("EhOcAmgMAAAguDMCsRAAAMAAAAuDg");
	var mask_2_graphics_1365 = new cjs.Graphics().p("EhQrAmfMAAAguDMCwxAAAMAAAAuDg");
	var mask_2_graphics_1366 = new cjs.Graphics().p("EhS8AmeMAAAguDMC1SAAAMAAAAuDg");
	var mask_2_graphics_1367 = new cjs.Graphics().p("EhVMAmdMAAAguDMC5yAAAMAAAAuDg");
	var mask_2_graphics_1368 = new cjs.Graphics().p("EhXcAmcMAAAguDMC+SAAAMAAAAuDg");
	var mask_2_graphics_1369 = new cjs.Graphics().p("EhZbAmZMAAAguDMDCyAAAMAAAAuDg");
	var mask_2_graphics_1370 = new cjs.Graphics().p("EhZbAmZMAAAguDMDCyAAAMAAAAuDg");
	var mask_2_graphics_1371 = new cjs.Graphics().p("EhZbAmZMAAAguDMDCyAAAMAAAAuDg");
	var mask_2_graphics_1372 = new cjs.Graphics().p("EhZbAmZMAAAguDMDCyAAAMAAAAuDg");
	var mask_2_graphics_1373 = new cjs.Graphics().p("EhZbAmZMAAAguDMDCyAAAMAAAAuDg");
	var mask_2_graphics_1374 = new cjs.Graphics().p("EhZbAmZMAAAguDMDCyAAAMAAAAuDg");
	var mask_2_graphics_1375 = new cjs.Graphics().p("EhZbAmZMAAAguDMDCyAAAMAAAAuDg");
	var mask_2_graphics_1376 = new cjs.Graphics().p("EhZbAmZMAAAguDMDCyAAAMAAAAuDg");
	var mask_2_graphics_1377 = new cjs.Graphics().p("EAF9AowMAAAguDIEDAAMAAAAuDg");
	var mask_2_graphics_1378 = new cjs.Graphics().p("EADcAovMAAAguDIJDAAMAAAAuDg");
	var mask_2_graphics_1379 = new cjs.Graphics().p("EAA7AovMAAAguDIODAAMAAAAuDg");
	var mask_2_graphics_1380 = new cjs.Graphics().p("EgBmAouMAAAguCITDAAMAAAAuCg");
	var mask_2_graphics_1381 = new cjs.Graphics().p("EgEIAouMAAAguDIYEAAMAAAAuDg");
	var mask_2_graphics_1382 = new cjs.Graphics().p("EgGoAouMAAAguDIdEAAMAAAAuDg");
	var mask_2_graphics_1383 = new cjs.Graphics().p("EgJKAotMAAAguDMAiFAAAMAAAAuDg");
	var mask_2_graphics_1384 = new cjs.Graphics().p("EgLrAotMAAAguDMAnFAAAMAAAAuDg");
	var mask_2_graphics_1385 = new cjs.Graphics().p("EgOMAotMAAAguEMAsGAAAMAAAAuEg");
	var mask_2_graphics_1386 = new cjs.Graphics().p("EgQuAosMAAAguDMAxHAAAMAAAAuDg");
	var mask_2_graphics_1387 = new cjs.Graphics().p("EgTPAosMAAAguEMA2HAAAMAAAAuEg");
	var mask_2_graphics_1388 = new cjs.Graphics().p("EgVwAorMAAAguDMA7IAAAMAAAAuDg");
	var mask_2_graphics_1389 = new cjs.Graphics().p("EgYSAorMAAAguDMBAJAAAMAAAAuDg");
	var mask_2_graphics_1390 = new cjs.Graphics().p("Ega0AoqMAAAguDMBFKAAAMAAAAuDg");
	var mask_2_graphics_1391 = new cjs.Graphics().p("EgdVAoqMAAAguDMBKLAAAMAAAAuDg");
	var mask_2_graphics_1392 = new cjs.Graphics().p("Egf2AopMAAAguCMBPLAAAMAAAAuCg");
	var mask_2_graphics_1393 = new cjs.Graphics().p("EgiYAopMAAAguDMBUMAAAMAAAAuDg");
	var mask_2_graphics_1394 = new cjs.Graphics().p("Egk5AopMAAAguDMBZMAAAMAAAAuDg");
	var mask_2_graphics_1395 = new cjs.Graphics().p("EgnbAooMAAAguDMBeNAAAMAAAAuDg");
	var mask_2_graphics_1396 = new cjs.Graphics().p("Egp8AooMAAAguDMBjNAAAMAAAAuDg");
	var mask_2_graphics_1397 = new cjs.Graphics().p("EgseAooMAAAguEMBoPAAAMAAAAuEg");
	var mask_2_graphics_1398 = new cjs.Graphics().p("Egu+AonMAAAguDMBtOAAAMAAAAuDg");
	var mask_2_graphics_1399 = new cjs.Graphics().p("EgxgAomMAAAguCMByQAAAMAAAAuCg");
	var mask_2_graphics_1400 = new cjs.Graphics().p("Eg0BAomMAAAguDMB3QAAAMAAAAuDg");
	var mask_2_graphics_1401 = new cjs.Graphics().p("Eg2jAomMAAAguDMB8RAAAMAAAAuDg");
	var mask_2_graphics_1402 = new cjs.Graphics().p("Eg5EAolMAAAguDMCBRAAAMAAAAuDg");
	var mask_2_graphics_1403 = new cjs.Graphics().p("Eg7mAolMAAAguDMCGTAAAMAAAAuDg");
	var mask_2_graphics_1404 = new cjs.Graphics().p("Eg+HAokMAAAguDMCLTAAAMAAAAuDg");
	var mask_2_graphics_1405 = new cjs.Graphics().p("EhAoAokMAAAguDMCQTAAAMAAAAuDg");
	var mask_2_graphics_1406 = new cjs.Graphics().p("EhDKAokMAAAguDMCVVAAAMAAAAuDg");
	var mask_2_graphics_1407 = new cjs.Graphics().p("EhFrAojMAAAguDMCaVAAAMAAAAuDg");
	var mask_2_graphics_1408 = new cjs.Graphics().p("EhIMAojMAAAguDMCfVAAAMAAAAuDg");
	var mask_2_graphics_1409 = new cjs.Graphics().p("EhKuAojMAAAguEMCkXAAAMAAAAuEg");
	var mask_2_graphics_1410 = new cjs.Graphics().p("EhNPAoiMAAAguDMCpXAAAMAAAAuDg");
	var mask_2_graphics_1411 = new cjs.Graphics().p("EhPwAohMAAAguCMCuXAAAMAAAAuCg");
	var mask_2_graphics_1412 = new cjs.Graphics().p("EhSSAohMAAAguDMCzYAAAMAAAAuDg");
	var mask_2_graphics_1413 = new cjs.Graphics().p("EhUyAohMAAAguDMC4ZAAAMAAAAuDg");
	var mask_2_graphics_1414 = new cjs.Graphics().p("EhUyAohMAAAguDMC4ZAAAMAAAAuDg");
	var mask_2_graphics_1415 = new cjs.Graphics().p("EhUyAohMAAAguDMC4ZAAAMAAAAuDg");
	var mask_2_graphics_1416 = new cjs.Graphics().p("EhUyAohMAAAguDMC4ZAAAMAAAAuDg");
	var mask_2_graphics_1417 = new cjs.Graphics().p("EhUyAohMAAAguDMC4ZAAAMAAAAuDg");
	var mask_2_graphics_1418 = new cjs.Graphics().p("EhUyAohMAAAguDMC4ZAAAMAAAAuDg");
	var mask_2_graphics_1419 = new cjs.Graphics().p("EhUyAohMAAAguDMC4ZAAAMAAAAuDg");
	var mask_2_graphics_1420 = new cjs.Graphics().p("EAFgAnWMAAAguDIDzAAMAAAAuDg");
	var mask_2_graphics_1421 = new cjs.Graphics().p("EAC7AnUMAAAguDII9AAMAAAAuDg");
	var mask_2_graphics_1422 = new cjs.Graphics().p("EAAXAnTMAAAguDIOGAAMAAAAuDg");
	var mask_2_graphics_1423 = new cjs.Graphics().p("EgCMAnRMAAAguDITPAAMAAAAuDg");
	var mask_2_graphics_1424 = new cjs.Graphics().p("EgExAnQMAAAguDIYZAAMAAAAuDg");
	var mask_2_graphics_1425 = new cjs.Graphics().p("EgHUAnOMAAAguCIdhAAMAAAAuCg");
	var mask_2_graphics_1426 = new cjs.Graphics().p("EgJ5AnNMAAAguDMAirAAAMAAAAuDg");
	var mask_2_graphics_1427 = new cjs.Graphics().p("EgMdAnMMAAAguDMAn0AAAMAAAAuDg");
	var mask_2_graphics_1428 = new cjs.Graphics().p("EgPBAnKMAAAguCMAs/AAAMAAAAuCg");
	var mask_2_graphics_1429 = new cjs.Graphics().p("EgRlAnJMAAAguDMAyIAAAMAAAAuDg");
	var mask_2_graphics_1430 = new cjs.Graphics().p("EgUKAnHMAAAguCMA3SAAAMAAAAuCg");
	var mask_2_graphics_1431 = new cjs.Graphics().p("EgWuAnGMAAAguDMA8bAAAMAAAAuDg");
	var mask_2_graphics_1432 = new cjs.Graphics().p("EgZSAnFMAAAguDMBBkAAAMAAAAuDg");
	var mask_2_graphics_1433 = new cjs.Graphics().p("Egb3AnDMAAAguCMBGuAAAMAAAAuCg");
	var mask_2_graphics_1434 = new cjs.Graphics().p("EgeaAnCMAAAguDMBL3AAAMAAAAuDg");
	var mask_2_graphics_1435 = new cjs.Graphics().p("Egg/AnBMAAAguDMBRBAAAMAAAAuDg");
	var mask_2_graphics_1436 = new cjs.Graphics().p("EgjjAm/MAAAguDMBWLAAAMAAAAuDg");
	var mask_2_graphics_1437 = new cjs.Graphics().p("EgmHAm+MAAAguDMBbUAAAMAAAAuDg");
	var mask_2_graphics_1438 = new cjs.Graphics().p("EgosAm8MAAAguCMBgeAAAMAAAAuCg");
	var mask_2_graphics_1439 = new cjs.Graphics().p("EgrQAm7MAAAguDMBlnAAAMAAAAuDg");
	var mask_2_graphics_1440 = new cjs.Graphics().p("Egt0Am6MAAAguDMBqwAAAMAAAAuDg");
	var mask_2_graphics_1441 = new cjs.Graphics().p("EgwYAm4MAAAguDMBv6AAAMAAAAuDg");
	var mask_2_graphics_1442 = new cjs.Graphics().p("Egy9Am3MAAAguDMB1EAAAMAAAAuDg");
	var mask_2_graphics_1443 = new cjs.Graphics().p("Eg1hAm1MAAAguCMB6NAAAMAAAAuCg");
	var mask_2_graphics_1444 = new cjs.Graphics().p("Eg4FAm0MAAAguDMB/XAAAMAAAAuDg");
	var mask_2_graphics_1445 = new cjs.Graphics().p("Eg6pAmzMAAAguDMCEgAAAMAAAAuDg");
	var mask_2_graphics_1446 = new cjs.Graphics().p("Eg9OAmxMAAAguCMCJqAAAMAAAAuCg");
	var mask_2_graphics_1447 = new cjs.Graphics().p("Eg/yAmwMAAAguDMCO0AAAMAAAAuDg");
	var mask_2_graphics_1448 = new cjs.Graphics().p("EhCWAmuMAAAguCMCT8AAAMAAAAuCg");
	var mask_2_graphics_1449 = new cjs.Graphics().p("EhE6AmtMAAAguDMCZGAAAMAAAAuDg");
	var mask_2_graphics_1450 = new cjs.Graphics().p("EhHeAmsMAAAguDMCePAAAMAAAAuDg");
	var mask_2_graphics_1451 = new cjs.Graphics().p("EhKDAmqMAAAguCMCjaAAAMAAAAuCg");
	var mask_2_graphics_1452 = new cjs.Graphics().p("EhMnAmpMAAAguDMCojAAAMAAAAuDg");
	var mask_2_graphics_1453 = new cjs.Graphics().p("EhPLAmoMAAAguDMCtsAAAMAAAAuDg");
	var mask_2_graphics_1454 = new cjs.Graphics().p("EhRvAmmMAAAguDMCy1AAAMAAAAuDg");
	var mask_2_graphics_1455 = new cjs.Graphics().p("EhUUAmlMAAAguDMC4AAAAMAAAAuDg");
	var mask_2_graphics_1456 = new cjs.Graphics().p("EhXEAm4MAAAguDMC9KAAAMAAAAuDg");
	var mask_2_graphics_1457 = new cjs.Graphics().p("EhXEAm4MAAAguDMC9KAAAMAAAAuDg");
	var mask_2_graphics_1458 = new cjs.Graphics().p("EhXEAm4MAAAguDMC9KAAAMAAAAuDg");
	var mask_2_graphics_1459 = new cjs.Graphics().p("EhXEAm4MAAAguDMC9KAAAMAAAAuDg");
	var mask_2_graphics_1460 = new cjs.Graphics().p("EhXEAm4MAAAguDMC9KAAAMAAAAuDg");
	var mask_2_graphics_1461 = new cjs.Graphics().p("EhXEAm4MAAAguDMC9KAAAMAAAAuDg");
	var mask_2_graphics_1462 = new cjs.Graphics().p("EhXEAm4MAAAguDMC9KAAAMAAAAuDg");
	var mask_2_graphics_1463 = new cjs.Graphics().p("EhXEAm4MAAAguDMC9KAAAMAAAAuDg");

	this.timeline.addTween(cjs.Tween.get(mask_2).to({graphics:null,x:0,y:0}).wait(1318).to({graphics:mask_2_graphics_1318,x:51.025,y:257.575}).wait(1).to({graphics:mask_2_graphics_1319,x:51.1972,y:256.675}).wait(1).to({graphics:mask_2_graphics_1320,x:51.4194,y:255.8}).wait(1).to({graphics:mask_2_graphics_1321,x:51.6166,y:254.9}).wait(1).to({graphics:mask_2_graphics_1322,x:51.8137,y:254}).wait(1).to({graphics:mask_2_graphics_1323,x:52.0109,y:253.1}).wait(1).to({graphics:mask_2_graphics_1324,x:52.2331,y:252.225}).wait(1).to({graphics:mask_2_graphics_1325,x:52.4303,y:251.325}).wait(1).to({graphics:mask_2_graphics_1326,x:52.6525,y:250.425}).wait(1).to({graphics:mask_2_graphics_1327,x:67.0583,y:250.325}).wait(1).to({graphics:mask_2_graphics_1328,x:81.4891,y:250.225}).wait(1).to({graphics:mask_2_graphics_1329,x:95.82,y:250.1}).wait(1).to({graphics:mask_2_graphics_1330,x:110.2758,y:250}).wait(1).to({graphics:mask_2_graphics_1331,x:124.7317,y:249.9}).wait(1).to({graphics:mask_2_graphics_1332,x:139.1172,y:249.8}).wait(1).to({graphics:mask_2_graphics_1333,x:153.5481,y:249.675}).wait(1).to({graphics:mask_2_graphics_1334,x:168.0039,y:249.575}).wait(1).to({graphics:mask_2_graphics_1335,x:182.3597,y:249.475}).wait(1).to({graphics:mask_2_graphics_1336,x:196.8156,y:249.375}).wait(1).to({graphics:mask_2_graphics_1337,x:211.2215,y:249.25}).wait(1).to({graphics:mask_2_graphics_1338,x:225.6023,y:249.15}).wait(1).to({graphics:mask_2_graphics_1339,x:240.0332,y:249.05}).wait(1).to({graphics:mask_2_graphics_1340,x:254.464,y:248.95}).wait(1).to({graphics:mask_2_graphics_1341,x:268.8949,y:248.825}).wait(1).to({graphics:mask_2_graphics_1342,x:283.3257,y:248.725}).wait(1).to({graphics:mask_2_graphics_1343,x:297.7363,y:248.625}).wait(1).to({graphics:mask_2_graphics_1344,x:312.1671,y:248.525}).wait(1).to({graphics:mask_2_graphics_1345,x:326.573,y:248.425}).wait(1).to({graphics:mask_2_graphics_1346,x:341.0038,y:248.3}).wait(1).to({graphics:mask_2_graphics_1347,x:355.4347,y:248.2}).wait(1).to({graphics:mask_2_graphics_1348,x:369.8405,y:248.1}).wait(1).to({graphics:mask_2_graphics_1349,x:384.2214,y:248}).wait(1).to({graphics:mask_2_graphics_1350,x:398.6772,y:247.875}).wait(1).to({graphics:mask_2_graphics_1351,x:413.0831,y:247.775}).wait(1).to({graphics:mask_2_graphics_1352,x:427.5139,y:247.675}).wait(1).to({graphics:mask_2_graphics_1353,x:441.9245,y:247.575}).wait(1).to({graphics:mask_2_graphics_1354,x:456.3554,y:247.45}).wait(1).to({graphics:mask_2_graphics_1355,x:470.7612,y:247.35}).wait(1).to({graphics:mask_2_graphics_1356,x:485.1421,y:247.25}).wait(1).to({graphics:mask_2_graphics_1357,x:499.5979,y:247.15}).wait(1).to({graphics:mask_2_graphics_1358,x:514.0038,y:247.05}).wait(1).to({graphics:mask_2_graphics_1359,x:528.4596,y:246.925}).wait(1).to({graphics:mask_2_graphics_1360,x:542.8155,y:246.825}).wait(1).to({graphics:mask_2_graphics_1361,x:557.2463,y:246.725}).wait(1).to({graphics:mask_2_graphics_1362,x:571.6771,y:246.625}).wait(1).to({graphics:mask_2_graphics_1363,x:586.058,y:246.5}).wait(1).to({graphics:mask_2_graphics_1364,x:600.5185,y:246.4}).wait(1).to({graphics:mask_2_graphics_1365,x:614.9744,y:246.3}).wait(1).to({graphics:mask_2_graphics_1366,x:629.3552,y:246.2}).wait(1).to({graphics:mask_2_graphics_1367,x:643.7611,y:246.075}).wait(1).to({graphics:mask_2_graphics_1368,x:658.1919,y:245.975}).wait(1).to({graphics:mask_2_graphics_1369,x:674.325,y:245.675}).wait(1).to({graphics:mask_2_graphics_1370,x:674.325,y:245.675}).wait(1).to({graphics:mask_2_graphics_1371,x:674.325,y:245.675}).wait(1).to({graphics:mask_2_graphics_1372,x:674.325,y:245.675}).wait(1).to({graphics:mask_2_graphics_1373,x:674.325,y:245.675}).wait(1).to({graphics:mask_2_graphics_1374,x:674.325,y:245.675}).wait(1).to({graphics:mask_2_graphics_1375,x:674.325,y:245.675}).wait(1).to({graphics:mask_2_graphics_1376,x:674.325,y:245.675}).wait(1).to({graphics:mask_2_graphics_1377,x:63.9834,y:260.775}).wait(1).to({graphics:mask_2_graphics_1378,x:79.8974,y:260.725}).wait(1).to({graphics:mask_2_graphics_1379,x:95.816,y:260.7}).wait(1).to({graphics:mask_2_graphics_1380,x:111.7304,y:260.65}).wait(1).to({graphics:mask_2_graphics_1381,x:127.6242,y:260.6}).wait(1).to({graphics:mask_2_graphics_1382,x:143.6135,y:260.575}).wait(1).to({graphics:mask_2_graphics_1383,x:159.5072,y:260.525}).wait(1).to({graphics:mask_2_graphics_1384,x:175.4465,y:260.475}).wait(1).to({graphics:mask_2_graphics_1385,x:191.4402,y:260.45}).wait(1).to({graphics:mask_2_graphics_1386,x:207.3296,y:260.4}).wait(1).to({graphics:mask_2_graphics_1387,x:223.2439,y:260.35}).wait(1).to({graphics:mask_2_graphics_1388,x:239.2126,y:260.325}).wait(1).to({graphics:mask_2_graphics_1389,x:255.127,y:260.275}).wait(1).to({graphics:mask_2_graphics_1390,x:270.9957,y:260.225}).wait(1).to({graphics:mask_2_graphics_1391,x:286.9599,y:260.2}).wait(1).to({graphics:mask_2_graphics_1392,x:302.8787,y:260.15}).wait(1).to({graphics:mask_2_graphics_1393,x:318.818,y:260.1}).wait(1).to({graphics:mask_2_graphics_1394,x:334.7368,y:260.075}).wait(1).to({graphics:mask_2_graphics_1395,x:350.6261,y:260.025}).wait(1).to({graphics:mask_2_graphics_1396,x:366.5404,y:259.975}).wait(1).to({graphics:mask_2_graphics_1397,x:382.4841,y:259.95}).wait(1).to({graphics:mask_2_graphics_1398,x:398.4485,y:259.9}).wait(1).to({graphics:mask_2_graphics_1399,x:414.3672,y:259.85}).wait(1).to({graphics:mask_2_graphics_1400,x:430.3065,y:259.825}).wait(1).to({graphics:mask_2_graphics_1401,x:446.2252,y:259.775}).wait(1).to({graphics:mask_2_graphics_1402,x:462.1396,y:259.725}).wait(1).to({graphics:mask_2_graphics_1403,x:478.0583,y:259.7}).wait(1).to({graphics:mask_2_graphics_1404,x:494.0226,y:259.65}).wait(1).to({graphics:mask_2_graphics_1405,x:509.9369,y:259.6}).wait(1).to({graphics:mask_2_graphics_1406,x:525.8557,y:259.575}).wait(1).to({graphics:mask_2_graphics_1407,x:541.77,y:259.525}).wait(1).to({graphics:mask_2_graphics_1408,x:557.7138,y:259.475}).wait(1).to({graphics:mask_2_graphics_1409,x:573.653,y:259.45}).wait(1).to({graphics:mask_2_graphics_1410,x:589.5968,y:259.4}).wait(1).to({graphics:mask_2_graphics_1411,x:605.5111,y:259.35}).wait(1).to({graphics:mask_2_graphics_1412,x:621.4298,y:259.325}).wait(1).to({graphics:mask_2_graphics_1413,x:637.5035,y:259.275}).wait(1).to({graphics:mask_2_graphics_1414,x:637.5035,y:259.275}).wait(1).to({graphics:mask_2_graphics_1415,x:637.5035,y:259.275}).wait(1).to({graphics:mask_2_graphics_1416,x:637.5035,y:259.275}).wait(1).to({graphics:mask_2_graphics_1417,x:637.5035,y:259.275}).wait(1).to({graphics:mask_2_graphics_1418,x:637.5035,y:259.275}).wait(1).to({graphics:mask_2_graphics_1419,x:637.5035,y:259.275}).wait(1).to({graphics:mask_2_graphics_1420,x:59.5324,y:251.775}).wait(1).to({graphics:mask_2_graphics_1421,x:75.9931,y:251.5989}).wait(1).to({graphics:mask_2_graphics_1422,x:92.5336,y:251.4739}).wait(1).to({graphics:mask_2_graphics_1423,x:109.0695,y:251.3239}).wait(1).to({graphics:mask_2_graphics_1424,x:125.56,y:251.1989}).wait(1).to({graphics:mask_2_graphics_1425,x:142.1459,y:251.0489}).wait(1).to({graphics:mask_2_graphics_1426,x:158.6115,y:250.9239}).wait(1).to({graphics:mask_2_graphics_1427,x:175.1474,y:250.7739}).wait(1).to({graphics:mask_2_graphics_1428,x:191.7629,y:250.6489}).wait(1).to({graphics:mask_2_graphics_1429,x:208.2738,y:250.4989}).wait(1).to({graphics:mask_2_graphics_1430,x:224.7597,y:250.3489}).wait(1).to({graphics:mask_2_graphics_1431,x:241.3253,y:250.2239}).wait(1).to({graphics:mask_2_graphics_1432,x:257.8362,y:250.0739}).wait(1).to({graphics:mask_2_graphics_1433,x:274.3267,y:249.9489}).wait(1).to({graphics:mask_2_graphics_1434,x:290.9126,y:249.7989}).wait(1).to({graphics:mask_2_graphics_1435,x:307.4281,y:249.6739}).wait(1).to({graphics:mask_2_graphics_1436,x:323.964,y:249.5239}).wait(1).to({graphics:mask_2_graphics_1437,x:340.4796,y:249.3989}).wait(1).to({graphics:mask_2_graphics_1438,x:356.9655,y:249.2489}).wait(1).to({graphics:mask_2_graphics_1439,x:373.4764,y:249.0989}).wait(1).to({graphics:mask_2_graphics_1440,x:390.0419,y:248.9739}).wait(1).to({graphics:mask_2_graphics_1441,x:406.5778,y:248.8239}).wait(1).to({graphics:mask_2_graphics_1442,x:423.0933,y:248.6989}).wait(1).to({graphics:mask_2_graphics_1443,x:439.6293,y:248.5489}).wait(1).to({graphics:mask_2_graphics_1444,x:456.1698,y:248.4239}).wait(1).to({graphics:mask_2_graphics_1445,x:472.6807,y:248.2739}).wait(1).to({graphics:mask_2_graphics_1446,x:489.2212,y:248.1489}).wait(1).to({graphics:mask_2_graphics_1447,x:505.7571,y:247.9989}).wait(1).to({graphics:mask_2_graphics_1448,x:522.243,y:247.8489}).wait(1).to({graphics:mask_2_graphics_1449,x:538.8086,y:247.7239}).wait(1).to({graphics:mask_2_graphics_1450,x:555.3445,y:247.5739}).wait(1).to({graphics:mask_2_graphics_1451,x:571.86,y:247.4489}).wait(1).to({graphics:mask_2_graphics_1452,x:588.3959,y:247.2989}).wait(1).to({graphics:mask_2_graphics_1453,x:604.9364,y:247.1739}).wait(1).to({graphics:mask_2_graphics_1454,x:621.4474,y:247.0239}).wait(1).to({graphics:mask_2_graphics_1455,x:637.9879,y:246.8989}).wait(1).to({graphics:mask_2_graphics_1456,x:653.3576,y:248.775}).wait(1).to({graphics:mask_2_graphics_1457,x:653.3576,y:248.775}).wait(1).to({graphics:mask_2_graphics_1458,x:653.3576,y:248.775}).wait(1).to({graphics:mask_2_graphics_1459,x:653.3576,y:248.775}).wait(1).to({graphics:mask_2_graphics_1460,x:653.3576,y:248.775}).wait(1).to({graphics:mask_2_graphics_1461,x:653.3576,y:248.775}).wait(1).to({graphics:mask_2_graphics_1462,x:653.3576,y:248.775}).wait(1).to({graphics:mask_2_graphics_1463,x:653.3576,y:248.775}).wait(483));

	// lines_obj_
	this.lines = new lib.Scene_1_lines();
	this.lines.name = "lines";
	this.lines.depth = 0;
	this.lines.isAttachedToCamera = 0
	this.lines.isAttachedToMask = 0
	this.lines.layerDepth = 0
	this.lines.layerIndex = 4
	this.lines.maskLayerName = 0

	var maskedShapeInstanceList = [this.lines];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.lines).wait(1463).to({_off:true},1).wait(482));

	// graphLines_obj_
	this.graphLines = new lib.Scene_1_graphLines();
	this.graphLines.name = "graphLines";
	this.graphLines.depth = 0;
	this.graphLines.isAttachedToCamera = 0
	this.graphLines.isAttachedToMask = 0
	this.graphLines.layerDepth = 0
	this.graphLines.layerIndex = 5
	this.graphLines.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.graphLines).wait(1463).to({_off:true},1).wait(482));

	// titles_obj_
	this.titles = new lib.Scene_1_titles();
	this.titles.name = "titles";
	this.titles.depth = 0;
	this.titles.isAttachedToCamera = 0
	this.titles.isAttachedToMask = 0
	this.titles.layerDepth = 0
	this.titles.layerIndex = 6
	this.titles.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.titles).wait(1554).to({regX:-503.6,regY:-37,scaleX:0.576,scaleY:0.576},43).wait(1).to({_off:true},1).wait(347));

	// movingWomen_obj_
	this.movingWomen = new lib.Scene_1_movingWomen();
	this.movingWomen.name = "movingWomen";
	this.movingWomen.depth = 0;
	this.movingWomen.isAttachedToCamera = 0
	this.movingWomen.isAttachedToMask = 0
	this.movingWomen.layerDepth = 0
	this.movingWomen.layerIndex = 7
	this.movingWomen.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.movingWomen).wait(877).to({regX:753.3,regY:479.8,x:753.3,y:479.8},0).wait(354).to({_off:true},1).wait(714));

	// think_text_obj_
	this.think_text = new lib.Scene_1_think_text();
	this.think_text.name = "think_text";
	this.think_text.depth = 0;
	this.think_text.isAttachedToCamera = 0
	this.think_text.isAttachedToMask = 0
	this.think_text.layerDepth = 0
	this.think_text.layerIndex = 8
	this.think_text.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.think_text).wait(397).to({regX:-1,regY:-0.9,x:-0.05},0).to({regX:498.6,regY:9.9,scaleX:2.1373,scaleY:2.1373,x:0.1},21).wait(163).to({_off:true},1).wait(1364));

	// think_bubble_obj_
	this.think_bubble = new lib.Scene_1_think_bubble();
	this.think_bubble.name = "think_bubble";
	this.think_bubble.depth = 0;
	this.think_bubble.isAttachedToCamera = 0
	this.think_bubble.isAttachedToMask = 0
	this.think_bubble.layerDepth = 0
	this.think_bubble.layerIndex = 9
	this.think_bubble.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.think_bubble).wait(397).to({regX:-1,regY:-0.9,x:-0.05},0).to({regX:498.6,regY:9.9,scaleX:2.1373,scaleY:2.1373,x:0.1},21).wait(163).to({_off:true},1).wait(1364));

	// arrow_obj_
	this.arrow = new lib.Scene_1_arrow();
	this.arrow.name = "arrow";
	this.arrow.depth = 0;
	this.arrow.isAttachedToCamera = 0
	this.arrow.isAttachedToMask = 0
	this.arrow.layerDepth = 0
	this.arrow.layerIndex = 10
	this.arrow.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.arrow).wait(317).to({_off:true},1).wait(1628));

	// rightHandClick_obj_
	this.rightHandClick = new lib.Scene_1_rightHandClick();
	this.rightHandClick.name = "rightHandClick";
	this.rightHandClick.depth = 0;
	this.rightHandClick.isAttachedToCamera = 0
	this.rightHandClick.isAttachedToMask = 0
	this.rightHandClick.layerDepth = 0
	this.rightHandClick.layerIndex = 11
	this.rightHandClick.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.rightHandClick).wait(85).to({regX:698.5,regY:280.2,scaleX:10.4124,scaleY:10.4124},0).to({_off:true},335).wait(1526));

	// desk_obj_
	this.desk = new lib.Scene_1_desk();
	this.desk.name = "desk";
	this.desk.depth = 0;
	this.desk.isAttachedToCamera = 0
	this.desk.isAttachedToMask = 0
	this.desk.layerDepth = 0
	this.desk.layerIndex = 12
	this.desk.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.desk).wait(85).to({regX:698.5,regY:280.2,scaleX:10.4124,scaleY:10.4124},0).wait(477).to({regX:498.6,regY:9.9,scaleX:2.1373,scaleY:2.1373,x:0.1},0).wait(19).to({_off:true},1).wait(1364));

	// flowers_obj_
	this.flowers = new lib.Scene_1_flowers();
	this.flowers.name = "flowers";
	this.flowers.depth = 0;
	this.flowers.isAttachedToCamera = 0
	this.flowers.isAttachedToMask = 0
	this.flowers.layerDepth = 0
	this.flowers.layerIndex = 13
	this.flowers.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.flowers).wait(85).to({regX:698.5,regY:280.2,scaleX:10.4124,scaleY:10.4124},0).to({_off:true},335).wait(1526));

	// rightPlant_obj_
	this.rightPlant = new lib.Scene_1_rightPlant();
	this.rightPlant.name = "rightPlant";
	this.rightPlant.depth = 0;
	this.rightPlant.isAttachedToCamera = 0
	this.rightPlant.isAttachedToMask = 0
	this.rightPlant.layerDepth = 0
	this.rightPlant.layerIndex = 14
	this.rightPlant.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.rightPlant).wait(85).to({regX:698.5,regY:280.2,scaleX:10.4124,scaleY:10.4124},0).to({_off:true},335).wait(1526));

	// woodStand_obj_
	this.woodStand = new lib.Scene_1_woodStand();
	this.woodStand.name = "woodStand";
	this.woodStand.depth = 0;
	this.woodStand.isAttachedToCamera = 0
	this.woodStand.isAttachedToMask = 0
	this.woodStand.layerDepth = 0
	this.woodStand.layerIndex = 15
	this.woodStand.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.woodStand).wait(85).to({regX:698.5,regY:280.2,scaleX:10.4124,scaleY:10.4124},0).to({_off:true},335).wait(1526));

	// pictures_obj_
	this.pictures = new lib.Scene_1_pictures();
	this.pictures.name = "pictures";
	this.pictures.depth = 0;
	this.pictures.isAttachedToCamera = 0
	this.pictures.isAttachedToMask = 0
	this.pictures.layerDepth = 0
	this.pictures.layerIndex = 16
	this.pictures.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.pictures).wait(85).to({regX:698.5,regY:280.2,scaleX:10.4124,scaleY:10.4124},0).to({_off:true},335).wait(1526));

	// leftPlant_obj_
	this.leftPlant = new lib.Scene_1_leftPlant();
	this.leftPlant.name = "leftPlant";
	this.leftPlant.depth = 0;
	this.leftPlant.isAttachedToCamera = 0
	this.leftPlant.isAttachedToMask = 0
	this.leftPlant.layerDepth = 0
	this.leftPlant.layerIndex = 17
	this.leftPlant.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.leftPlant).wait(85).to({regX:698.5,regY:280.2,scaleX:10.4124,scaleY:10.4124},0).to({_off:true},335).wait(1526));

	// allison_name_obj_
	this.allison_name = new lib.Scene_1_allison_name();
	this.allison_name.name = "allison_name";
	this.allison_name.depth = 0;
	this.allison_name.isAttachedToCamera = 0
	this.allison_name.isAttachedToMask = 0
	this.allison_name.layerDepth = 0
	this.allison_name.layerIndex = 18
	this.allison_name.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.allison_name).wait(317).to({_off:true},1).wait(1628));

	// alison_obj_
	this.alison = new lib.Scene_1_alison();
	this.alison.name = "alison";
	this.alison.depth = 0;
	this.alison.isAttachedToCamera = 0
	this.alison.isAttachedToMask = 0
	this.alison.layerDepth = 0
	this.alison.layerIndex = 19
	this.alison.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.alison).wait(85).to({regX:698.5,regY:280.2,scaleX:10.4124,scaleY:10.4124},0).wait(44).to({regX:0,regY:0,scaleX:1,scaleY:1},0).wait(277).to({regX:-1,regY:-0.9,x:-0.05},0).wait(72).to({regX:498.6,regY:9.9,scaleX:2.1373,scaleY:2.1373,x:0.1},0).wait(103).to({_off:true},1).wait(1364));

	// alisonLegs_obj_
	this.alisonLegs = new lib.Scene_1_alisonLegs();
	this.alisonLegs.name = "alisonLegs";
	this.alisonLegs.depth = 0;
	this.alisonLegs.isAttachedToCamera = 0
	this.alisonLegs.isAttachedToMask = 0
	this.alisonLegs.layerDepth = 0
	this.alisonLegs.layerIndex = 20
	this.alisonLegs.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.alisonLegs).wait(85).to({regX:698.5,regY:280.2,scaleX:10.4124,scaleY:10.4124},0).to({_off:true},335).wait(1526));

	// body_obj_
	this.body = new lib.Scene_1_body();
	this.body.name = "body";
	this.body.depth = 0;
	this.body.isAttachedToCamera = 0
	this.body.isAttachedToMask = 0
	this.body.layerDepth = 0
	this.body.layerIndex = 21
	this.body.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.body).wait(85).to({regX:698.5,regY:280.2,scaleX:10.4124,scaleY:10.4124},0).wait(199).to({regX:0,regY:0,scaleX:1,scaleY:1},0).wait(278).to({regX:498.6,regY:9.9,scaleX:2.1373,scaleY:2.1373,x:0.1},0).wait(19).to({_off:true},1).wait(1364));

	// tiffanyName_obj_
	this.tiffanyName = new lib.Scene_1_tiffanyName();
	this.tiffanyName.name = "tiffanyName";
	this.tiffanyName.depth = 0;
	this.tiffanyName.isAttachedToCamera = 0
	this.tiffanyName.isAttachedToMask = 0
	this.tiffanyName.layerDepth = 0
	this.tiffanyName.layerIndex = 22
	this.tiffanyName.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.tiffanyName).wait(683).to({regX:1064.7,regY:468.5,x:1064.7,y:468.5},0).wait(44).to({_off:true},1).wait(1218));

	// leeName_obj_
	this.leeName = new lib.Scene_1_leeName();
	this.leeName.name = "leeName";
	this.leeName.depth = 0;
	this.leeName.isAttachedToCamera = 0
	this.leeName.isAttachedToMask = 0
	this.leeName.layerDepth = 0
	this.leeName.layerIndex = 23
	this.leeName.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.leeName).wait(660).to({regX:326.8,regY:354.8,x:326.8,y:354.8},0).wait(67).to({_off:true},1).wait(1218));

	// salad_obj_
	this.salad = new lib.Scene_1_salad();
	this.salad.name = "salad";
	this.salad.depth = 0;
	this.salad.isAttachedToCamera = 0
	this.salad.isAttachedToMask = 0
	this.salad.layerDepth = 0
	this.salad.layerIndex = 24
	this.salad.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.salad).wait(833).to({regX:-359.9,regY:308,x:-359.9,y:308},0).wait(58).to({_off:true},1).wait(1054));

	// cat_obj_
	this.cat = new lib.Scene_1_cat();
	this.cat.name = "cat";
	this.cat.depth = 0;
	this.cat.isAttachedToCamera = 0
	this.cat.isAttachedToMask = 0
	this.cat.layerDepth = 0
	this.cat.layerIndex = 25
	this.cat.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.cat).wait(798).to({regX:494.7,regY:299,x:494.7,y:299},0).wait(93).to({_off:true},1).wait(1054));

	// rules_obj_
	this.rules = new lib.Scene_1_rules();
	this.rules.name = "rules";
	this.rules.depth = 0;
	this.rules.isAttachedToCamera = 0
	this.rules.isAttachedToMask = 0
	this.rules.layerDepth = 0
	this.rules.layerIndex = 26
	this.rules.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.rules).wait(882).to({_off:true},1).wait(1063));

	// speaking_obj_
	this.speaking = new lib.Scene_1_speaking();
	this.speaking.name = "speaking";
	this.speaking.depth = 0;
	this.speaking.isAttachedToCamera = 0
	this.speaking.isAttachedToMask = 0
	this.speaking.layerDepth = 0
	this.speaking.layerIndex = 27
	this.speaking.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.speaking).wait(891).to({_off:true},1).wait(1054));

	// woman2_obj_
	this.woman2 = new lib.Scene_1_woman2();
	this.woman2.name = "woman2";
	this.woman2.depth = 0;
	this.woman2.isAttachedToCamera = 0
	this.woman2.isAttachedToMask = 0
	this.woman2.layerDepth = 0
	this.woman2.layerIndex = 28
	this.woman2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.woman2).wait(891).to({_off:true},1).wait(1054));

	// woman1_obj_
	this.woman1 = new lib.Scene_1_woman1();
	this.woman1.name = "woman1";
	this.woman1.depth = 0;
	this.woman1.isAttachedToCamera = 0
	this.woman1.isAttachedToMask = 0
	this.woman1.layerDepth = 0
	this.woman1.layerIndex = 29
	this.woman1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.woman1).wait(891).to({_off:true},1).wait(1054));

	// birdOfParadise_obj_
	this.birdOfParadise = new lib.Scene_1_birdOfParadise();
	this.birdOfParadise.name = "birdOfParadise";
	this.birdOfParadise.depth = 0;
	this.birdOfParadise.isAttachedToCamera = 0
	this.birdOfParadise.isAttachedToMask = 0
	this.birdOfParadise.layerDepth = 0
	this.birdOfParadise.layerIndex = 30
	this.birdOfParadise.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.birdOfParadise).wait(588).to({regX:517.9,regY:308.2,x:517.9,y:308.2},0).wait(303).to({_off:true},1).wait(1054));

	// setting_obj_
	this.setting = new lib.Scene_1_setting();
	this.setting.name = "setting";
	this.setting.depth = 0;
	this.setting.isAttachedToCamera = 0
	this.setting.isAttachedToMask = 0
	this.setting.layerDepth = 0
	this.setting.layerIndex = 31
	this.setting.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.setting).wait(891).to({_off:true},1).wait(1054));

	// support_obj_
	this.support = new lib.Scene_1_support();
	this.support.name = "support";
	this.support.depth = 0;
	this.support.isAttachedToCamera = 0
	this.support.isAttachedToMask = 0
	this.support.layerDepth = 0
	this.support.layerIndex = 32
	this.support.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.support).wait(1667).to({regX:-503.6,regY:-37,scaleX:0.576,scaleY:0.576},0).wait(62).to({_off:true},1).wait(216));

	// maskMegaphone (mask)
	var mask_3 = new cjs.Shape();
	mask_3._off = true;
	var mask_3_graphics_1603 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1604 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1605 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1606 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1607 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1608 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1609 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1610 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1611 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1612 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1613 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1614 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1615 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1616 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1617 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1618 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1619 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1620 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1621 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1622 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1623 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1624 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1625 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1626 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1627 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1628 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1629 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1630 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1631 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1632 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1633 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1634 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_3_graphics_1635 = new cjs.Graphics().p("Eg9dAieMAAAhE7MB67AAAMAAABE7g");

	this.timeline.addTween(cjs.Tween.get(mask_3).to({graphics:null,x:0,y:0}).wait(1603).to({graphics:mask_3_graphics_1603,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1604,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1605,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1606,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1607,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1608,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1609,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1610,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1611,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1612,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1613,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1614,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1615,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1616,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1617,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1618,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1619,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1620,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1621,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1622,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1623,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1624,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1625,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1626,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1627,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1628,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1629,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1630,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1631,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1632,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1633,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1634,x:680.025,y:241.825}).wait(1).to({graphics:mask_3_graphics_1635,x:683.45,y:241.9}).wait(311));

	// megaphone_obj_
	this.megaphone = new lib.Scene_1_megaphone();
	this.megaphone.name = "megaphone";
	this.megaphone.depth = 0;
	this.megaphone.isAttachedToCamera = 0
	this.megaphone.isAttachedToMask = 0
	this.megaphone.layerDepth = 0
	this.megaphone.layerIndex = 33
	this.megaphone.maskLayerName = 0

	var maskedShapeInstanceList = [this.megaphone];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get(this.megaphone).wait(1603).to({regX:-503.6,regY:-37,scaleX:0.576,scaleY:0.576},0).wait(139).to({_off:true},1).wait(203));

	// maskText (mask)
	var mask_4 = new cjs.Shape();
	mask_4._off = true;
	var mask_4_graphics_1603 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1604 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1605 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1606 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1607 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1608 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1609 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1610 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1611 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1612 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1613 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1614 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1615 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1616 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1617 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1618 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1619 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1620 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1621 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1622 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1623 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1624 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1625 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1626 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1627 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1628 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1629 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1630 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1631 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1632 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1633 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1634 = new cjs.Graphics().p("Eg+FAieMAAAhE7MB8LAAAMAAABE7g");
	var mask_4_graphics_1635 = new cjs.Graphics().p("Eg9dAieMAAAhE7MB67AAAMAAABE7g");

	this.timeline.addTween(cjs.Tween.get(mask_4).to({graphics:null,x:0,y:0}).wait(1603).to({graphics:mask_4_graphics_1603,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1604,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1605,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1606,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1607,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1608,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1609,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1610,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1611,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1612,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1613,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1614,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1615,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1616,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1617,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1618,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1619,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1620,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1621,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1622,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1623,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1624,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1625,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1626,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1627,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1628,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1629,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1630,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1631,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1632,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1633,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1634,x:680.025,y:241.825}).wait(1).to({graphics:mask_4_graphics_1635,x:683.45,y:241.9}).wait(311));

	// takeAction_obj_
	this.takeAction = new lib.Scene_1_takeAction();
	this.takeAction.name = "takeAction";
	this.takeAction.depth = 0;
	this.takeAction.isAttachedToCamera = 0
	this.takeAction.isAttachedToMask = 0
	this.takeAction.layerDepth = 0
	this.takeAction.layerIndex = 34
	this.takeAction.maskLayerName = 0

	var maskedShapeInstanceList = [this.takeAction];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.takeAction).wait(1611).to({regX:-503.6,regY:-37,scaleX:0.576,scaleY:0.576},0).wait(55).to({_off:true},1).wait(279));

	// voiceWaves_obj_
	this.voiceWaves = new lib.Scene_1_voiceWaves();
	this.voiceWaves.name = "voiceWaves";
	this.voiceWaves.depth = 0;
	this.voiceWaves.isAttachedToCamera = 0
	this.voiceWaves.isAttachedToMask = 0
	this.voiceWaves.layerDepth = 0
	this.voiceWaves.layerIndex = 35
	this.voiceWaves.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.voiceWaves).wait(1625).to({regX:-503.6,regY:-37,scaleX:0.576,scaleY:0.576},0).wait(35).to({_off:true},1).wait(285));

	// lights_obj_
	this.lights = new lib.Scene_1_lights();
	this.lights.name = "lights";
	this.lights.depth = 0;
	this.lights.isAttachedToCamera = 0
	this.lights.isAttachedToMask = 0
	this.lights.layerDepth = 0
	this.lights.layerIndex = 36
	this.lights.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.lights).wait(1743).to({regX:-503.6,regY:-37,scaleX:0.576,scaleY:0.576},0).wait(83).to({_off:true},1).wait(119));

	// maskEquality (mask)
	var mask_5 = new cjs.Shape();
	mask_5._off = true;
	var mask_5_graphics_1795 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1796 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1797 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1798 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1799 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1800 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1801 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1802 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1803 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1804 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1805 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1806 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1807 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1808 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1809 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1810 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1811 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1812 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1813 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1814 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1815 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1816 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1817 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1818 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1819 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1820 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1821 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1822 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1823 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1824 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1825 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");
	var mask_5_graphics_1826 = new cjs.Graphics().p("Eg9+AixMAAAhFgMB79AAAMAAABFgg");

	this.timeline.addTween(cjs.Tween.get(mask_5).to({graphics:null,x:0,y:0}).wait(1795).to({graphics:mask_5_graphics_1795,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1796,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1797,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1798,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1799,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1800,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1801,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1802,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1803,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1804,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1805,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1806,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1807,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1808,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1809,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1810,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1811,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1812,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1813,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1814,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1815,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1816,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1817,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1818,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1819,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1820,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1821,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1822,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1823,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1824,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1825,x:679.225,y:243.65}).wait(1).to({graphics:mask_5_graphics_1826,x:679.225,y:243.65}).wait(120));

	// equality_obj_
	this.equality = new lib.Scene_1_equality();
	this.equality.name = "equality";
	this.equality.depth = 0;
	this.equality.isAttachedToCamera = 0
	this.equality.isAttachedToMask = 0
	this.equality.layerDepth = 0
	this.equality.layerIndex = 37
	this.equality.maskLayerName = 0

	var maskedShapeInstanceList = [this.equality];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_5;
	}

	this.timeline.addTween(cjs.Tween.get(this.equality).wait(1773).to({regX:-503.6,regY:-37,scaleX:0.576,scaleY:0.576},0).wait(53).to({_off:true},1).wait(119));

	// CTA_obj_
	this.CTA = new lib.Scene_1_CTA();
	this.CTA.name = "CTA";
	this.CTA.depth = 0;
	this.CTA.isAttachedToCamera = 0
	this.CTA.isAttachedToMask = 0
	this.CTA.layerDepth = 0
	this.CTA.layerIndex = 38
	this.CTA.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.CTA).wait(1827).to({regX:-503.6,regY:-37,scaleX:0.576,scaleY:0.576},0).wait(79).to({regX:695.1,regY:371,scaleX:1,scaleY:1,x:1198.65,y:407.95},0).wait(3).to({_off:true},1).wait(36));

	// credits_obj_
	this.credits = new lib.Scene_1_credits();
	this.credits.name = "credits";
	this.credits.depth = 0;
	this.credits.isAttachedToCamera = 0
	this.credits.isAttachedToMask = 0
	this.credits.layerDepth = 0
	this.credits.layerIndex = 39
	this.credits.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.credits).wait(1914).to({regX:-503.6,regY:-37,scaleX:0.576,scaleY:0.576},0).wait(1).to({regX:685.9,regY:403.2,scaleX:1,scaleY:1,x:1189.45,y:440.15},0).wait(25).to({_off:true},1).wait(5));

	// seats_obj_
	this.seats = new lib.Scene_1_seats();
	this.seats.name = "seats";
	this.seats.setTransform(675.6,619.6,1,1,0,0,0,675.6,619.6);
	this.seats.depth = 0;
	this.seats.isAttachedToCamera = 0
	this.seats.isAttachedToMask = 0
	this.seats.layerDepth = 0
	this.seats.layerIndex = 40
	this.seats.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.seats).wait(1946));

	// left_curtion_obj_
	this.left_curtion = new lib.Scene_1_left_curtion();
	this.left_curtion.name = "left_curtion";
	this.left_curtion.setTransform(163.1,309.6,1,1,0,0,0,163.1,309.6);
	this.left_curtion.depth = 0;
	this.left_curtion.isAttachedToCamera = 0
	this.left_curtion.isAttachedToMask = 0
	this.left_curtion.layerDepth = 0
	this.left_curtion.layerIndex = 41
	this.left_curtion.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.left_curtion).wait(1946));

	// right_curtain_obj_
	this.right_curtain = new lib.Scene_1_right_curtain();
	this.right_curtain.name = "right_curtain";
	this.right_curtain.setTransform(1202.5,309.2,1,1,0,0,0,1202.5,309.2);
	this.right_curtain.depth = 0;
	this.right_curtain.isAttachedToCamera = 0
	this.right_curtain.isAttachedToMask = 0
	this.right_curtain.layerDepth = 0
	this.right_curtain.layerIndex = 42
	this.right_curtain.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.right_curtain).wait(1945).to({regX:1584.2,regY:499.9,scaleX:0.576,scaleY:0.576,x:1202.55,y:309.25},0).wait(1));

	// replay_btn_obj_
	this.replay_btn = new lib.Scene_1_replay_btn();
	this.replay_btn.name = "replay_btn";
	this.replay_btn.depth = 0;
	this.replay_btn.isAttachedToCamera = 0
	this.replay_btn.isAttachedToMask = 0
	this.replay_btn.layerDepth = 0
	this.replay_btn.layerIndex = 43
	this.replay_btn.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.replay_btn).wait(1945).to({regX:-503.6,regY:-37,scaleX:0.576,scaleY:0.576},0).wait(1));

	// play_btn_obj_
	this.play_btn = new lib.Scene_1_play_btn();
	this.play_btn.name = "play_btn";
	this.play_btn.setTransform(698.2,246,1,1,0,0,0,698.2,246);
	this.play_btn.depth = 0;
	this.play_btn.isAttachedToCamera = 0
	this.play_btn.isAttachedToMask = 0
	this.play_btn.layerDepth = 0
	this.play_btn.layerIndex = 44
	this.play_btn.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.play_btn).to({_off:true},2).wait(1944));

	// seconds_obj_
	this.seconds = new lib.Scene_1_seconds();
	this.seconds.name = "seconds";
	this.seconds.depth = 0;
	this.seconds.isAttachedToCamera = 0
	this.seconds.isAttachedToMask = 0
	this.seconds.layerDepth = 0
	this.seconds.layerIndex = 45
	this.seconds.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.seconds).wait(66).to({_off:true},1).wait(1879));

	// screen_obj_
	this.screen = new lib.Scene_1_screen();
	this.screen.name = "screen";
	this.screen.setTransform(683,245.8,1,1,0,0,0,683,245.8);
	this.screen.depth = 0;
	this.screen.isAttachedToCamera = 0
	this.screen.isAttachedToMask = 0
	this.screen.layerDepth = 0
	this.screen.layerIndex = 46
	this.screen.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.screen).wait(66).to({_off:true},16).wait(1864));

	// Layer_10 (mask)
	var mask_6 = new cjs.Shape();
	mask_6._off = true;
	var mask_6_graphics_16 = new cjs.Graphics().p("EgMmAzOMAAAhFfMBB/AAAMAAABFfg");
	var mask_6_graphics_17 = new cjs.Graphics().p("A9udIMAVehCFMA+wAUZMgVeBCFg");
	var mask_6_graphics_18 = new cjs.Graphics().p("EgmtAIuMAo1g4OMA1aAmzMgo3A4Og");
	var mask_6_graphics_19 = new cjs.Graphics().p("EgmqgGQMA4Ogo3MAmzA1YMg4PAo3g");
	var mask_6_graphics_20 = new cjs.Graphics().p("A9l0oMBCFgVfMAUZA+wMhCFAVfg");
	var mask_6_graphics_21 = new cjs.Graphics().p("EgMXAhAMAAAhB/MBFeAAAMAAABB/g");
	var mask_6_graphics_38 = new cjs.Graphics().p("EgMmA18MAAAhFgMBB/AAAMAAABFgg");
	var mask_6_graphics_39 = new cjs.Graphics().p("A+nfwMAVehCFMA+wAUaMgVeBCFg");
	var mask_6_graphics_40 = new cjs.Graphics().p("EgoaAIuMAo2g4OMA1ZAmzMgo2A4Og");
	var mask_6_graphics_41 = new cjs.Graphics().p("Ego/gGQMA4Ngo3MAmzA1YMg4NAo3g");
	var mask_6_graphics_42 = new cjs.Graphics().p("EggVgUoMBCFgVfMAUZA+wMhCFAVfg");
	var mask_6_graphics_43 = new cjs.Graphics().p("EgPRAhAMAAAhB/MBFfAAAMAAABB/g");
	var mask_6_graphics_60 = new cjs.Graphics().p("EgMmA1YMAAAhFfMBB/AAAMAAABFfg");
	var mask_6_graphics_61 = new cjs.Graphics().p("A+cfNMAVehCFMA+wAUZMgVeBCFg");
	var mask_6_graphics_62 = new cjs.Graphics().p("EgoFAIuMAo2g4OMA1ZAmzMgo2A4Og");
	var mask_6_graphics_63 = new cjs.Graphics().p("EgoigGQMA4Ngo3MAmzA1YMg4NAo3g");
	var mask_6_graphics_64 = new cjs.Graphics().p("A/z0oMBCFgVfMAUZA+wMhCFAVfg");
	var mask_6_graphics_65 = new cjs.Graphics().p("EgOtAhAMAAAhB/MBFfAAAMAAABB/g");

	this.timeline.addTween(cjs.Tween.get(mask_6).to({graphics:null,x:0,y:0}).wait(16).to({graphics:mask_6_graphics_16,x:341.678,y:327.7794}).wait(1).to({graphics:mask_6_graphics_17,x:348.8155,y:316.9053}).wait(1).to({graphics:mask_6_graphics_18,x:355.3639,y:271.3}).wait(1).to({graphics:mask_6_graphics_19,x:360.6512,y:183.75}).wait(1).to({graphics:mask_6_graphics_20,x:364.1303,y:103}).wait(1).to({graphics:mask_6_graphics_21,x:365.5442,y:36.6}).wait(1).to({graphics:null,x:0,y:0}).wait(16).to({graphics:mask_6_graphics_38,x:341.678,y:345.1544}).wait(1).to({graphics:mask_6_graphics_39,x:343.1155,y:333.7553}).wait(1).to({graphics:mask_6_graphics_40,x:344.4889,y:300.05}).wait(1).to({graphics:mask_6_graphics_41,x:345.6762,y:204.65}).wait(1).to({graphics:mask_6_graphics_42,x:346.5303,y:113.9}).wait(1).to({graphics:mask_6_graphics_43,x:347.0192,y:36.4}).wait(1).to({graphics:null,x:0,y:0}).wait(16).to({graphics:mask_6_graphics_60,x:341.678,y:341.5794}).wait(1).to({graphics:mask_6_graphics_61,x:344.2155,y:330.2303}).wait(1).to({graphics:mask_6_graphics_62,x:346.5889,y:294.05}).wait(1).to({graphics:mask_6_graphics_63,x:348.5762,y:200.35}).wait(1).to({graphics:mask_6_graphics_64,x:349.9303,y:111.6}).wait(1).to({graphics:mask_6_graphics_65,x:350.5942,y:36.45}).wait(1881));

	// square4_obj_
	this.square4 = new lib.Scene_1_square4();
	this.square4.name = "square4";
	this.square4.depth = 0;
	this.square4.isAttachedToCamera = 0
	this.square4.isAttachedToMask = 0
	this.square4.layerDepth = 0
	this.square4.layerIndex = 47
	this.square4.maskLayerName = 0

	var maskedShapeInstanceList = [this.square4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get(this.square4).wait(66).to({_off:true},15).wait(1865));

	// Layer_9 (mask)
	var mask_7 = new cjs.Shape();
	mask_7._off = true;
	var mask_7_graphics_11 = new cjs.Graphics().p("EAgBA2XMAAAhFaMAnuAAAMAAABFag");
	var mask_7_graphics_12 = new cjs.Graphics().p("EALoAuBMAVdhCAMAlxAMRMgVdBCBg");
	var mask_7_graphics_13 = new cjs.Graphics().p("EgEqAjFMAoyg4KMAgIAXVMgozA4Lg");
	var mask_7_graphics_14 = new cjs.Graphics().p("AvTWmMA4KgoyMAXWAgHMg4LAozg");
	var mask_7_graphics_15 = new cjs.Graphics().p("AzNJzMBCBgVcMAMRAlwMhCAAVdg");
	var mask_7_graphics_16 = new cjs.Graphics().p("EgP/AloMAAAgntMBFZAAAMAAAAntg");
	var mask_7_graphics_17 = new cjs.Graphics().p("EgP/AloMAAAgntMBFZAAAMAAAAntg");
	var mask_7_graphics_18 = new cjs.Graphics().p("EgP/AloMAAAgntMBFZAAAMAAAAntg");
	var mask_7_graphics_19 = new cjs.Graphics().p("EgP/AloMAAAgntMBFZAAAMAAAAntg");
	var mask_7_graphics_20 = new cjs.Graphics().p("EgP/AloMAAAgntMBFZAAAMAAAAntg");
	var mask_7_graphics_21 = new cjs.Graphics().p("EgP/AloMAAAgntMBFZAAAMAAAAntg");
	var mask_7_graphics_33 = new cjs.Graphics().p("EAf7A2SMAAAhFaMAntAAAMAAABFag");
	var mask_7_graphics_34 = new cjs.Graphics().p("EALjAt6MAVdhCBMAlxAMSMgVdBCAg");
	var mask_7_graphics_35 = new cjs.Graphics().p("EgEtAi8MAoyg4JMAgIAXVMgozA4Kg");
	var mask_7_graphics_36 = new cjs.Graphics().p("AvTWdMA4JgozMAXWAgIMg4KAozg");
	var mask_7_graphics_37 = new cjs.Graphics().p("AzLJqMBCBgVcMAMRAlwMhCAAVdg");
	var mask_7_graphics_38 = new cjs.Graphics().p("EgP7AlgMAAAgntMBFaAAAMAAAAntg");
	var mask_7_graphics_39 = new cjs.Graphics().p("EgP7AlgMAAAgntMBFaAAAMAAAAntg");
	var mask_7_graphics_40 = new cjs.Graphics().p("EgP7AlgMAAAgntMBFaAAAMAAAAntg");
	var mask_7_graphics_41 = new cjs.Graphics().p("EgP7AlgMAAAgntMBFaAAAMAAAAntg");
	var mask_7_graphics_42 = new cjs.Graphics().p("EgP7AlgMAAAgntMBFaAAAMAAAAntg");
	var mask_7_graphics_43 = new cjs.Graphics().p("EgP7AlgMAAAgntMBFaAAAMAAAAntg");
	var mask_7_graphics_55 = new cjs.Graphics().p("EAf7A2SMAAAhFaMAntAAAMAAABFag");
	var mask_7_graphics_56 = new cjs.Graphics().p("EALjAt6MAVdhCBMAlxAMSMgVdBCAg");
	var mask_7_graphics_57 = new cjs.Graphics().p("EgEtAi8MAoyg4JMAgIAXVMgozA4Kg");
	var mask_7_graphics_58 = new cjs.Graphics().p("AvTWdMA4JgozMAXWAgIMg4KAozg");
	var mask_7_graphics_59 = new cjs.Graphics().p("AzLJqMBCBgVcMAMRAlwMhCAAVdg");
	var mask_7_graphics_60 = new cjs.Graphics().p("EgP7AlgMAAAgntMBFaAAAMAAAAntg");
	var mask_7_graphics_61 = new cjs.Graphics().p("EgP7AlgMAAAgntMBFaAAAMAAAAntg");
	var mask_7_graphics_62 = new cjs.Graphics().p("EgP7AlgMAAAgntMBFaAAAMAAAAntg");
	var mask_7_graphics_63 = new cjs.Graphics().p("EgP7AlgMAAAgntMBFaAAAMAAAAntg");
	var mask_7_graphics_64 = new cjs.Graphics().p("EgP7AlgMAAAgntMBFaAAAMAAAAntg");
	var mask_7_graphics_65 = new cjs.Graphics().p("EgP7AlgMAAAgntMBFaAAAMAAAAntg");

	this.timeline.addTween(cjs.Tween.get(mask_7).to({graphics:null,x:0,y:0}).wait(11).to({graphics:mask_7_graphics_11,x:459.1192,y:347.9252}).wait(1).to({graphics:mask_7_graphics_12,x:453.4286,y:373.0701}).wait(1).to({graphics:mask_7_graphics_13,x:436.8426,y:373.8571}).wait(1).to({graphics:mask_7_graphics_14,x:410.8571,y:350.2426}).wait(1).to({graphics:mask_7_graphics_15,x:378.0951,y:304.4036}).wait(1).to({graphics:mask_7_graphics_16,x:341.8479,y:240.7932}).wait(1).to({graphics:mask_7_graphics_17,x:341.8479,y:240.7932}).wait(1).to({graphics:mask_7_graphics_18,x:341.8479,y:240.7932}).wait(1).to({graphics:mask_7_graphics_19,x:341.8479,y:240.7932}).wait(1).to({graphics:mask_7_graphics_20,x:341.8479,y:240.7932}).wait(1).to({graphics:mask_7_graphics_21,x:341.8479,y:240.7932}).wait(1).to({graphics:null,x:0,y:0}).wait(11).to({graphics:mask_7_graphics_33,x:458.4442,y:347.4002}).wait(1).to({graphics:mask_7_graphics_34,x:452.9286,y:372.2951}).wait(1).to({graphics:mask_7_graphics_35,x:436.5426,y:373.0071}).wait(1).to({graphics:mask_7_graphics_36,x:410.8321,y:349.3176}).wait(1).to({graphics:mask_7_graphics_37,x:378.2951,y:303.5286}).wait(1).to({graphics:mask_7_graphics_38,x:342.2979,y:240.0182}).wait(1).to({graphics:mask_7_graphics_39,x:342.2979,y:240.0182}).wait(1).to({graphics:mask_7_graphics_40,x:342.2979,y:240.0182}).wait(1).to({graphics:mask_7_graphics_41,x:342.2979,y:240.0182}).wait(1).to({graphics:mask_7_graphics_42,x:342.2979,y:240.0182}).wait(1).to({graphics:mask_7_graphics_43,x:342.2979,y:240.0182}).wait(1).to({graphics:null,x:0,y:0}).wait(11).to({graphics:mask_7_graphics_55,x:458.4442,y:347.4002}).wait(1).to({graphics:mask_7_graphics_56,x:452.9286,y:372.2951}).wait(1).to({graphics:mask_7_graphics_57,x:436.5426,y:373.0071}).wait(1).to({graphics:mask_7_graphics_58,x:410.8321,y:349.3176}).wait(1).to({graphics:mask_7_graphics_59,x:378.2951,y:303.5286}).wait(1).to({graphics:mask_7_graphics_60,x:342.2979,y:240.0182}).wait(1).to({graphics:mask_7_graphics_61,x:342.2979,y:240.0182}).wait(1).to({graphics:mask_7_graphics_62,x:342.2979,y:240.0182}).wait(1).to({graphics:mask_7_graphics_63,x:342.2979,y:240.0182}).wait(1).to({graphics:mask_7_graphics_64,x:342.2979,y:240.0182}).wait(1).to({graphics:mask_7_graphics_65,x:342.2979,y:240.0182}).wait(1881));

	// square3_obj_
	this.square3 = new lib.Scene_1_square3();
	this.square3.name = "square3";
	this.square3.depth = 0;
	this.square3.isAttachedToCamera = 0
	this.square3.isAttachedToMask = 0
	this.square3.layerDepth = 0
	this.square3.layerIndex = 48
	this.square3.maskLayerName = 0

	var maskedShapeInstanceList = [this.square3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_7;
	}

	this.timeline.addTween(cjs.Tween.get(this.square3).wait(66).to({_off:true},15).wait(1865));

	// mask2 (mask)
	var mask_8 = new cjs.Shape();
	mask_8._off = true;
	var mask_8_graphics_6 = new cjs.Graphics().p("AM6eZMAAAg8xMBQ1AAAMAAAA8xg");
	var mask_8_graphics_7 = new cjs.Graphics().p("AFfQbMASyg5zMBM4AY+MgSyA5zg");
	var mask_8_graphics_8 = new cjs.Graphics().p("ACwA1MAjvgxKMBBYAvhMgjuAxKg");
	var mask_8_graphics_9 = new cjs.Graphics().p("AE+thMAxLgjuMAvgBBYMgxLAjug");
	var mask_8_graphics_10 = new cjs.Graphics().p("AL5zRMA5zgSyMAY+BM2Mg5zASyg");
	var mask_8_graphics_11 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_12 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_13 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_14 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_15 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_16 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_17 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_18 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_19 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_20 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_21 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_28 = new cjs.Graphics().p("AM6eZMAAAg8xMBQ1AAAMAAAA8xg");
	var mask_8_graphics_29 = new cjs.Graphics().p("AFfQbMASyg5zMBM4AY+MgSyA5zg");
	var mask_8_graphics_30 = new cjs.Graphics().p("ACwA1MAjvgxKMBBYAvhMgjuAxKg");
	var mask_8_graphics_31 = new cjs.Graphics().p("AE+thMAxLgjuMAvgBBYMgxLAjug");
	var mask_8_graphics_32 = new cjs.Graphics().p("AL5zRMA5zgSyMAY+BM2Mg5zASyg");
	var mask_8_graphics_33 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_34 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_35 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_36 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_37 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_38 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_39 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_40 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_41 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_42 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_43 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_50 = new cjs.Graphics().p("AM6eZMAAAg8xMBQ1AAAMAAAA8xg");
	var mask_8_graphics_51 = new cjs.Graphics().p("AFfQbMASyg5zMBM4AY+MgSyA5zg");
	var mask_8_graphics_52 = new cjs.Graphics().p("ACwA1MAjvgxKMBBYAvhMgjuAxKg");
	var mask_8_graphics_53 = new cjs.Graphics().p("AE+thMAxLgjuMAvgBBYMgxLAjug");
	var mask_8_graphics_54 = new cjs.Graphics().p("AL5zRMA5zgSyMAY+BM2Mg5zASyg");
	var mask_8_graphics_55 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_56 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_57 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_58 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_59 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_60 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_61 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_62 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_63 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_64 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");
	var mask_8_graphics_65 = new cjs.Graphics().p("EAW2A7jMAAAhQzMA8yAAAMAAABQzg");

	this.timeline.addTween(cjs.Tween.get(mask_8).to({graphics:null,x:0,y:0}).wait(6).to({graphics:mask_8_graphics_6,x:599.8635,y:52.85}).wait(1).to({graphics:mask_8_graphics_7,x:647.2543,y:141.7}).wait(1).to({graphics:mask_8_graphics_8,x:664.7227,y:240.55}).wait(1).to({graphics:mask_8_graphics_9,x:650.4779,y:331.8977}).wait(1).to({graphics:mask_8_graphics_10,x:605.8431,y:368.4793}).wait(1).to({graphics:mask_8_graphics_11,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_12,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_13,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_14,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_15,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_16,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_17,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_18,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_19,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_20,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_21,x:535.2227,y:381.1351}).wait(1).to({graphics:null,x:0,y:0}).wait(6).to({graphics:mask_8_graphics_28,x:599.8635,y:52.85}).wait(1).to({graphics:mask_8_graphics_29,x:647.2543,y:141.7}).wait(1).to({graphics:mask_8_graphics_30,x:664.7227,y:240.55}).wait(1).to({graphics:mask_8_graphics_31,x:650.4779,y:331.8977}).wait(1).to({graphics:mask_8_graphics_32,x:605.8431,y:368.4793}).wait(1).to({graphics:mask_8_graphics_33,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_34,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_35,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_36,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_37,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_38,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_39,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_40,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_41,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_42,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_43,x:535.2227,y:381.1351}).wait(1).to({graphics:null,x:0,y:0}).wait(6).to({graphics:mask_8_graphics_50,x:599.8635,y:52.85}).wait(1).to({graphics:mask_8_graphics_51,x:647.2543,y:141.7}).wait(1).to({graphics:mask_8_graphics_52,x:664.7227,y:240.55}).wait(1).to({graphics:mask_8_graphics_53,x:650.4779,y:331.8977}).wait(1).to({graphics:mask_8_graphics_54,x:605.8431,y:368.4793}).wait(1).to({graphics:mask_8_graphics_55,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_56,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_57,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_58,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_59,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_60,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_61,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_62,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_63,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_64,x:535.2227,y:381.1351}).wait(1).to({graphics:mask_8_graphics_65,x:535.2227,y:381.1351}).wait(1881));

	// Q2_obj_
	this.Q2 = new lib.Scene_1_Q2();
	this.Q2.name = "Q2";
	this.Q2.depth = 0;
	this.Q2.isAttachedToCamera = 0
	this.Q2.isAttachedToMask = 0
	this.Q2.layerDepth = 0
	this.Q2.layerIndex = 49
	this.Q2.maskLayerName = 0

	var maskedShapeInstanceList = [this.Q2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_8;
	}

	this.timeline.addTween(cjs.Tween.get(this.Q2).wait(66).to({_off:true},15).wait(1865));

	// mask1 (mask)
	var mask_9 = new cjs.Shape();
	mask_9._off = true;
	var mask_9_graphics_2 = new cjs.Graphics().p("EgE2AmsMAAAhNXMA6AAAAMAAABNXg");
	var mask_9_graphics_3 = new cjs.Graphics().p("AvaYpMAdmhHeMA1lAWNMgdnBHeg");
	var mask_9_graphics_4 = new cjs.Graphics().p("AvnG2MA2sg2sMApBApBMg2tA2sg");
	var mask_9_graphics_5 = new cjs.Graphics().p("AlZr+MBHegdnMAWNA1kMhHfAdng");
	var mask_9_graphics_6 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_7 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_8 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_9 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_10 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_11 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_12 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_13 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_14 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_15 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_16 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_17 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_18 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_19 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_20 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_21 = new cjs.Graphics().p("ANpdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_23 = new cjs.Graphics().p("EgE2AmsMAAAhNXMA6AAAAMAAABNXg");
	var mask_9_graphics_24 = new cjs.Graphics().p("AvaYpMAdmhHeMA1mAWNMgdnBHeg");
	var mask_9_graphics_25 = new cjs.Graphics().p("AvmG2MA2sg2sMApBApBMg2tA2sg");
	var mask_9_graphics_26 = new cjs.Graphics().p("AlYr+MBHegdnMAWNA1kMhHfAdng");
	var mask_9_graphics_27 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_28 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_29 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_30 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_31 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_32 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_33 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_34 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_35 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_36 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_37 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_38 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_39 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_40 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_41 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_42 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_43 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_45 = new cjs.Graphics().p("EgE2AmsMAAAhNXMA6AAAAMAAABNXg");
	var mask_9_graphics_46 = new cjs.Graphics().p("AvaYpMAdmhHeMA1mAWNMgdnBHeg");
	var mask_9_graphics_47 = new cjs.Graphics().p("AvmG2MA2sg2sMApBApBMg2tA2sg");
	var mask_9_graphics_48 = new cjs.Graphics().p("AlYr+MBHegdnMAWNA1kMhHfAdng");
	var mask_9_graphics_49 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_50 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_51 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_52 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_53 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_54 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_55 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_56 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_57 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_58 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_59 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_60 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_61 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_62 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_63 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_64 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");
	var mask_9_graphics_65 = new cjs.Graphics().p("ANqdAMAAAg5/MBNYAAAMAAAA5/g");

	this.timeline.addTween(cjs.Tween.get(mask_9).to({graphics:null,x:0,y:0}).wait(2).to({graphics:mask_9_graphics_2,x:340.2476,y:-1.7}).wait(1).to({graphics:mask_9_graphics_3,x:433.7428,y:-52.85}).wait(1).to({graphics:mask_9_graphics_4,x:512.6356,y:-58.45}).wait(1).to({graphics:mask_9_graphics_5,x:564.9649,y:-17.3}).wait(1).to({graphics:mask_9_graphics_6,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_7,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_8,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_9,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_10,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_11,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_12,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_13,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_14,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_15,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_16,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_17,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_18,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_19,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_20,x:582.4975,y:64.5}).wait(1).to({graphics:mask_9_graphics_21,x:582.4975,y:64.5}).wait(1).to({graphics:null,x:0,y:0}).wait(1).to({graphics:mask_9_graphics_23,x:340.2476,y:-1.95}).wait(1).to({graphics:mask_9_graphics_24,x:433.7928,y:-53.1}).wait(1).to({graphics:mask_9_graphics_25,x:512.7356,y:-58.65}).wait(1).to({graphics:mask_9_graphics_26,x:565.0899,y:-17.4}).wait(1).to({graphics:mask_9_graphics_27,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_28,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_29,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_30,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_31,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_32,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_33,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_34,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_35,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_36,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_37,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_38,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_39,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_40,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_41,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_42,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_43,x:582.6225,y:64.5}).wait(1).to({graphics:null,x:0,y:0}).wait(1).to({graphics:mask_9_graphics_45,x:340.2476,y:-1.95}).wait(1).to({graphics:mask_9_graphics_46,x:433.7928,y:-53.1}).wait(1).to({graphics:mask_9_graphics_47,x:512.7356,y:-58.65}).wait(1).to({graphics:mask_9_graphics_48,x:565.0899,y:-17.4}).wait(1).to({graphics:mask_9_graphics_49,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_50,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_51,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_52,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_53,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_54,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_55,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_56,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_57,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_58,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_59,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_60,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_61,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_62,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_63,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_64,x:582.6225,y:64.5}).wait(1).to({graphics:mask_9_graphics_65,x:582.6225,y:64.5}).wait(1881));

	// Q1_obj_
	this.Q1 = new lib.Scene_1_Q1();
	this.Q1.name = "Q1";
	this.Q1.depth = 0;
	this.Q1.isAttachedToCamera = 0
	this.Q1.isAttachedToMask = 0
	this.Q1.layerDepth = 0
	this.Q1.layerIndex = 50
	this.Q1.maskLayerName = 0

	var maskedShapeInstanceList = [this.Q1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_9;
	}

	this.timeline.addTween(cjs.Tween.get(this.Q1).wait(66).to({_off:true},15).wait(1865));

	// grayToPinkScreen_obj_
	this.grayToPinkScreen = new lib.Scene_1_grayToPinkScreen();
	this.grayToPinkScreen.name = "grayToPinkScreen";
	this.grayToPinkScreen.setTransform(683.5,247,1,1,0,0,0,683.5,247);
	this.grayToPinkScreen.depth = 0;
	this.grayToPinkScreen.isAttachedToCamera = 0
	this.grayToPinkScreen.isAttachedToMask = 0
	this.grayToPinkScreen.layerDepth = 0
	this.grayToPinkScreen.layerIndex = 51
	this.grayToPinkScreen.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.grayToPinkScreen).wait(85).to({regX:764.1,regY:303.9,scaleX:10.4124,scaleY:10.4124,x:683.05,y:246.8},0).wait(497).to({regX:684.2,regY:246.2,scaleX:1,scaleY:1,x:683.45,y:247},0).wait(1364));

	// cinemaBackgroung_obj_
	this.cinemaBackgroung = new lib.Scene_1_cinemaBackgroung();
	this.cinemaBackgroung.name = "cinemaBackgroung";
	this.cinemaBackgroung.setTransform(683,384,1,1,0,0,0,683,384);
	this.cinemaBackgroung.depth = 0;
	this.cinemaBackgroung.isAttachedToCamera = 0
	this.cinemaBackgroung.isAttachedToMask = 0
	this.cinemaBackgroung.layerDepth = 0
	this.cinemaBackgroung.layerIndex = 52
	this.cinemaBackgroung.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.cinemaBackgroung).wait(1946));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-6729.4,-3330.1,14295.2,7798.200000000001);
// library properties:
lib.properties = {
	id: '466255FEEF259C489F2363A85728CC97',
	width: 1366,
	height: 768,
	fps: 31,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/cat1.png", id:"cat1"},
		{src:"sounds/countdownBleeps.mp3", id:"countdownBleeps"},
		{src:"sounds/scene1.mp3", id:"scene1"},
		{src:"sounds/scene2.mp3", id:"scene2"},
		{src:"sounds/scene3.mp3", id:"scene3"},
		{src:"sounds/scene4.mp3", id:"scene4"},
		{src:"sounds/scene5.mp3", id:"scene5"},
		{src:"sounds/scene6.mp3", id:"scene6"},
		{src:"sounds/scene7.mp3", id:"scene7"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['466255FEEF259C489F2363A85728CC97'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;