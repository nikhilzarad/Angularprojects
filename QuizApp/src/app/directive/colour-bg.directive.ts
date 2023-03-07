import { Directive, ElementRef ,HostListener,Input,Renderer2} from '@angular/core';

@Directive({
  selector: '[appColourBg]'
})
export class ColourBgDirective {

  @Input() iscorrect:boolean=false;

  constructor(private el:ElementRef, private render:Renderer2) {
  }
  @HostListener('click') answer(){
   if(this.iscorrect){
    this.render.setStyle(this.el.nativeElement,'background-color',"rgba(60, 189, 60, 0.79");
    this.render.setStyle(this.el.nativeElement,'color',"#fff");
    this.render.setStyle(this.el.nativeElement,'border',"2px solid grey");
   }else{
    this.render.setStyle(this.el.nativeElement,'background-color',"rgb(210, 42, 42)");
    this.render.setStyle(this.el.nativeElement,'color',"#fff");
    this.render.setStyle(this.el.nativeElement,'border',"2px solid grey");
   }
  }

}
