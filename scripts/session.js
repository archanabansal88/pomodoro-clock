const Session = (function() {
	class Session {
		constructor(context, value, title, onValueChange, isSessionRunning) {
			this.timer = false;
			this.context = context;
			this.onValueChange = onValueChange;
			this.isPaused = true;
			this.isSessionRunning = isSessionRunning;
			this.initialState(title, value);
		}
		init() {
			this.createMarkup();
			this.attachEvent();
		}
		update(title, value, autoStart, color) {
			this.color = color;
			this.initialState(title, value);
			this.context.find('.clock-time').html(value);
			this.context.find('.clock-title').html(title);
			this.context.siblings('.timer-color').addClass(color);
			this.context.siblings('.timer-color').css('height', 0);
			if (autoStart) {
				this.onTitleClick();
			}
		}

		initialState(title, value) {
			this.title = title;
			this.value = value;
			this.timerValue = value * 60;
		}

		createMarkup() {
			const temp = `<div class='clock-container'><div class='clock-title'>${this.title}</div>
									<div class='clock-time'>${this.value}</div></div>`;
			this.context.html(temp);
		}
		attachEvent() {
			this.context.on('click', this.onTitleClick.bind(this));
		}

		onTitleClick() {
			if (this.isPaused) {
				this.timer = setInterval(this.updateTimer.bind(this), 1000);
				this.isPaused = false;
			} else {
				clearInterval(this.timer);
				this.isPaused = true;
			}
			this.isSessionRunning(this.isPaused);
		}

		updateTimer() {
			this.timerValue--;
			const mins = parseInt(this.timerValue / 60);
			const secs = parseInt(this.timerValue - mins * 60);
			const time = `${mins}:${secs}`;
			const height = 100 - 100 / (this.value * 60 / this.timerValue);
			this.context.siblings('.timer-color').css('height', height + '%');
			this.context.find('.clock-time').html(time);
			if (this.timerValue < 0) {
				clearInterval(this.timer);
				this.isPaused = true;
				this.context.siblings('.timer-color').removeClass(this.color);
				this.onValueChange();
			}
		}
	}
	return Session;
})();
