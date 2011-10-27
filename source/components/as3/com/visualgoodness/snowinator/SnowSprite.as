package com.visualgoodness.snowinator 
{
	import flash.display.MovieClip;
	import flash.events.Event;
	/**
	 * ...
	 * @author 
	 */
	public class SnowSprite extends MovieClip
	{
		private var _containerWidth:Number;
		private var _containerHeight:Number;
		var rad:Number = 0;
		var i:Number = 1 + Math.random() * 2;
		var k:Number = -3.141593 + Math.random() * 3.141593;
		
		
		
		public function SnowSprite(containerWidth:Number, containerHeight:Number,xpos:Number = undefined,ypos:Number = undefined,scale = undefined,_alpha = undefined, rot:Number = undefined ) {
			_containerHeight = containerHeight;
			_containerWidth = containerWidth;
				
			!_alpha ? this.alpha = .025 + Math.random()	 : this.alpha = _alpha;
			!xpos ? this.x = -10 + Math.random() * _containerWidth+50 : this.x = xpos;
			!rot ? this.rotation = Math.random() * 360 : this.y = rot;
			!scale ? this.scaleX = Math.random() * 3.5 : this.scaleX = scale;
			!scale ? this.scaleY = this.scaleX : this.scaleY = scale;
			!ypos ? this.y = -10 + Math.random() * _containerHeight : this.y = ypos;
			trace(this.alpha);
			
			this.gotoAndPlay(Math.round(Math.random() * 100));
			
			this.addEventListener(Event.ENTER_FRAME, EF);
		}
		private function EF(e:Event) {
			rad = rad + k / 180 * 3.141593E+000;
			this.x = this.x - Math.cos(rad) * 6;
			this.rotation = this.rotation - Math.cos(rad) * 10;
			this.y = this.y + i * 1.500000E+000;
			if (this.y >= _containerHeight)
			{
				this.y = -5;
			} 
			if (this.x >= _containerWidth || this.x <= 0)
			{
				this.x = -10 + Math.random() * _containerWidth;
				this.y = -5;
			} // end if
			if (this.alpha <= .5)
			{
				//this.removeMovieClip();
				//destroy();
			} 
		}
			
		public function destroy() {
			this.removeEventListener(Event.ENTER_FRAME,EF);
		}

		
	}

}