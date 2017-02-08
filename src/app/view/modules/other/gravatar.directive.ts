import { Directive, ElementRef, Input } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Directive({
  selector: '[salsahGravatar]'
})
export class GravatarDirective {

  @Input('email') email: string;
  @Input('size') size: number = 40;
  @Input('fallback') fallback: string = 'mm';

  md5eMail: any;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.md5eMail = Md5.hashStr(this.email);

    this.elementRef.nativeElement.src = 'http://www.gravatar.com/avatar/' + this.md5eMail + '?s=' + this.size + 'd=' + this.fallback;

  }


}


