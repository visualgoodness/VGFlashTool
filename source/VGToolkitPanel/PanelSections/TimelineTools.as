package PanelSections
{
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
    import adobe.utils.MMExecute;        

	import Tab
	
	/**
	 * ...
	 * @author Ben Roth
	 */
	public class TimelineTools extends MovieClip {
		
		private var useLocalPaths:Boolean = false;
		public function TimelineTools(useLocalPaths = false) {
			initConvertObjectToButton()
			this.useLocalPaths = useLocalPaths;
		}

		
		//convert Object to button section
		//convert Object to button section
		private function initConvertObjectToButton() {
			nameAllInstances.addEventListener(MouseEvent.CLICK, onNameAllInstances ); 
		}
		private function onNameAllInstances( e:MouseEvent ):void {  
            MMExecute( "fl.runScript(fl.configURI + 'VG_Toolkit/Commands' + '/NameAllInstances.jsfl')" );   
        }  
		
		
	}
	
}