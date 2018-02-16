const PomodoraClock = (function() {
	class PomodoraClock {
		constructor(session, timer) {
			this.session = session;
			this.timer = timer;
			this.breakValue = 5;
			this.sessionValue = 25;
			this.isPaused = true;
			this.init();
		}

		init() {
			this.breakInstance = new Timer(
				$('.break-control'),
				this.breakValue,
				'break length',
				this.onBreakValueChange.bind(this)
			);
			this.breakInstance.init();
			this.sessionInstance = new Timer(
				$('.session-control'),
				this.sessionValue,
				'session length',
				this.onSessionValueChange.bind(this)
			);
			this.sessionInstance.init();

			this.sessionClock = new Session(
				this.timer,
				this.sessionValue,
				'Session',
				this.onClockValueChange.bind(this),
				this.isSessionRunning.bind(this)
			);
			this.sessionClock.init();
		}

		onBreakValueChange(value) {
			this.breakValue = value;
		}

		onSessionValueChange(value) {
			this.sessionValue = value;
			this.sessionClock.update('Session', this.sessionValue, false);
		}

		onClockValueChange() {
			if (this.isPaused) {
				this.sessionClock.update('Break!', this.breakValue, true, 'break-color');
				this.isPaused = false;
			} else {
				this.sessionClock.update('Session', this.sessionValue, true);
				this.isPaused = true;
			}
		}

		isSessionRunning(isPaused) {
			this.sessionInstance.disableButton(isPaused);
			this.breakInstance.disableButton(isPaused);
		}
	}
	return PomodoraClock;
})();
