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
	public class SymbolTools extends MovieClip {
		
		private var useLocalPaths:Boolean = false;
		public function SymbolTools(useLocalPaths = false) {
			initConvertObjectToButton()
			this.useLocalPaths = useLocalPaths;
		}

		
		//convert Object to button section
		private function initConvertObjectToButton() {
			creatButtonBtn.addEventListener(MouseEvent.CLICK, onCreateButton ); 
			createMaskBtn.addEventListener(MouseEvent.CLICK, onCreateMask ); 
		}
		
		private function onCreateButton( e:MouseEvent ):void {  
			MMExecute( "fl.runScript(fl.configURI + 'VG_Toolkit/Commands' + '/MakeButton.jsfl','makeButton'," + overToggle.selected + ")" );   
        }  
		private function onCreateMask(e:MouseEvent):void {
			MMExecute( "fl.runScript(fl.configURI + 'VG_Toolkit/Commands' + '/MakeMask.jsfl')");   
			
		}
		
		
	}
	
}