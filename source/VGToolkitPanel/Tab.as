package 
{
	import flash.display.MovieClip;
	import flash.text.TextFieldAutoSize;
	
	/**
	 * ...
	 * @author Ben Roth
	 */
	public class Tab extends MovieClip {
		private var _contents:MovieClip
		private var _open:Boolean
		public var id:uint;
		public function Tab() {
			this.title.autoSize = TextFieldAutoSize.LEFT;
		}
		
		
		
		//public methods
		public function get contents():MovieClip 
		{
			return _contents;
		}
		
		public function set contents(value:MovieClip):void 
		{
			_contents = value;
			addChildAt(_contents, 0);
			
			
			_contents.y = 10;
			_contents.x = 10
			_contents.visible = false
		}
		
		public function get open():Boolean 
		{
			return _open;
		}
		
		public function set open(value:Boolean):void 
		{
			_open = value;
		}
		

		public function setTitle(t:String):void {
			this.title.text = t;
		}
		

		
	}
	
}