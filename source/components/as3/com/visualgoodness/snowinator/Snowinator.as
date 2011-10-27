package com.visualgoodness.snowinator 
{
	import flash.display.Graphics;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	/**
	 * ...
	 * @author 
	 */
	public class Snowinator extends MovieClip
	{
		
		//_____________________ parameters
		public var rate:Number = 100;
		public var containerWidth:Number;
		public var containerHeight:Number;
		public var snowClips:Array = null;
		public var density:Number = 200;
		public var minSpriteScale = .1;
		public var maxSpriteScale = 3;
		public var depthLayers:Number = 2;
		public var allowOverflow:Boolean = true;
		
		private var debug:Boolean = true;
		
		//_______________________ internal vars
		
		private var activeCips:Array
		private var _snowContainer:MovieClip
		
		public function Snowinator() {
			
			_snowContainer = this.snowContainer;
			//if (!snowClips) snowClips = [SnowGroup];
			if (!containerWidth) containerWidth = _snowContainer.width;
			if (!containerHeight) containerHeight = _snowContainer.height;
			if (!allowOverflow) createOverflowMask();
			startSnow();
		}
		
		public function startSnow() {
			activeCips = new Array();
			for (var i:int = 0; i < density; i++) {
				var scale:Number = randomNumber(minSpriteScale, maxSpriteScale);
				var sc:SnowSprite = new SnowSprite(containerWidth,containerHeight);
				_snowContainer.addChild(sc);
				activeCips.push(sc);
			}
		}
		public function stopSnow() {
			
		}
		private function createOverflowMask() {
			var ofm:Sprite = new Sprite();
			ofm.graphics.beginFill(0x000000, 1)
			ofm.graphics.drawRect(_snowContainer.x, _snowContainer.y, containerWidth, containerHeight);
			ofm.graphics.endFill();
			addChild(ofm);
			_snowContainer.mask = ofm
		}
		//________________________ utils
		
		
		private function randomNumber(min:Number, max:Number):Number {
			return (Math.random() * (max - min)) + min; 
		}
	}

}