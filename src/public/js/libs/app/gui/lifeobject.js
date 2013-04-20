define(function() {
	return me.HUD_Item.extend({

		init:function(x, y, val, step)
		{
			this.parent(x, y, val);
			this.maxhp = val;

			this.step = step;

			// manage the alarm
			this.alarm = false;
		},

		// update the item value
		update : function(value) {
			this.set((this.value + (this.step * value)).clamp(0, this.maxhp));
			return true;
		},


		draw : function (context, x, y)
		{

			var hp = Math.round((this.value / this.maxhp ) * 300);
			// draw the progress bar
			context.strokeStyle = "rgba(255,255,255, 0.9)";
			context.strokeRect(this.pos.x+x, this.pos.y+y, 300, 20);
			if (hp>150) {
				// green
				context.fillStyle = "rgba(0,200,0, 0.9)";
				if (this.alarm)
				{
					me.audio.stop("alarm");
					this.alarm = false;
				}
			}
			else if (hp>75) {
				// orange
				context.fillStyle = "rgba(255,165,0, 0.9)";
				if (this.alarm)
				{
					me.audio.stop("alarm");
					this.alarm = false;
				}
			}
			else {
				// red
				context.fillStyle = "rgba(255,69,0, 0.9)";
				if (!this.alarm)
				{
					//me.audio.play("alarm", true);
					//this.alarm = true;
				}
			}

			context.fillRect(this.pos.x+x+1, this.pos.y+y + 1, hp-1, 18);
		}
	});
});