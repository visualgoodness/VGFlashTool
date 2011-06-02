package 
{  
    import adobe.utils.MMExecute;        
    import flash.display.MovieClip;  
    import flash.events.MouseEvent;  
  
    public class VGToolKitPanel extends MovieClip  
    {  
        public function VGToolKitPanel()  
        {  
            theButton.label = "Create Button";  
            theButton.addEventListener( MouseEvent.CLICK, onClickTheButton ); 
			overToggle.label = "over state";
			
        }  
  
        private function onClickTheButton( a_event:MouseEvent ):void  
        {  
			trace(overToggle.selected);
            MMExecute( "fl.runScript(fl.configURI + 'VG_Toolkit/Commands' + '/MakeButton.jsfl','makeButton',"+overToggle.selected+")" );   //quotes in quotes get confusing  
        }  
    }  
} 