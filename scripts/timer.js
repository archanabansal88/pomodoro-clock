const Timer = (function() {
	class Timer {
		constructor(context, value, title, onValueChange) {
			this.context = context;
			this.value = value;
			this.title = title;
			this.onValueChange = onValueChange;
		}

		init() {
			this.createMarkUp();
			this.attachEvent();
		}

		attachEvent() {
			this.context.on('click', '.plus', this.onPlusButtonClick.bind(this));
			this.context.on('click', '.minus', this.onMinusButtonClick.bind(this));
		}

		disableButton(isPaused) {
			this.context.find('.plus').attr('disabled', !isPaused);
			this.context.find('.minus').attr('disabled', !isPaused);
		}

		createMarkUp() {
			let temp = `<div class="title">${this.title}</div>
						<div class="break-calculate">
							<button class="minus">-</button>
							<span class="number">${this.value}</span>
							<button class="plus">+</button>
						</div>`;
			this.context.html(temp);
		}

		onPlusButtonClick() {
			this.value++;
			this.context.find('.number').html(this.value);
			this.onValueChange(this.value);
		}
		onMinusButtonClick() {
			if (this.value > 1) {
				this.value--;
				this.context.find('.number').html(this.value);
				this.onValueChange(this.value);
			}
		}
	}

	return Timer;
})();
