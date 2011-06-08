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
	public class FileTools extends MovieClip {
		
		private var useLocalPaths:Boolean = false;
		public function FileTools(useLocalPaths = false) {
			initConvertObjectToButton()
			this.useLocalPaths = useLocalPaths;
		}

		
		//convert Object to button section
		private function initConvertObjectToButton() {
			pubAllOpen.addEventListener(MouseEvent.CLICK, onPubAllOpen ); 
			batchPublisher.addEventListener(MouseEvent.CLICK, onBatchPublish);
		}
		private function onPubAllOpen( e:MouseEvent ):void {  
            MMExecute( "fl.runScript(fl.configURI + 'VG_Toolkit/Commands' + '/PubAllOpen.jsfl')" );   
        }  
		private function onBatchPublish( e:MouseEvent ):void {  
            MMExecute( "fl.runScript(fl.configURI + 'VG_Toolkit/Commands' + '/BatchExport.jsfl')" );   
        }  
		
		
		
		
	}
	
}