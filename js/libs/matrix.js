
var Matrix = function(el) {

		this.el = el[0];
		this.el.style.opacity = "0.85";
		var text = this.el.innerHTML;
		this.numLetter = text.length;
		this.originalLetterList = text.split('');
		this.numOriginalLetter = 0;	
}

Matrix.prototype.getRandomLetter = function() {

		var characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-"];
		return characters[Math.floor(Math.random() * characters.length)];
}

Matrix.prototype.render = function() {
		var displayText = '';

		for(var i = 0; i<this.numLetter; i++){
			if(i<this.numOriginalLetter){
				// original letter
				displayText+=this.originalLetterList[i];
			} else{
				// random letter
				displayText+=this.getRandomLetter();
			}
		}

		this.el.innerHTML = displayText;
};

Matrix.prototype.iterate = function(speed, letterDelay, delay) {
	var self = this;

	//create a delay on the letters
	for(var i = 0; i<this.numLetter; i++){
		var currentLetterDelay = delay + letterDelay * i;
		setTimeout(function () {

			self.numOriginalLetter++;


		}, currentLetterDelay);


	}
			// renderer
			var loop = function(){
			
				self.render();

				if(self.numOriginalLetter < self.numLetter){

					setTimeout(loop, speed);
				} else {

						console.log('done');
				}
			}
			loop();
};

