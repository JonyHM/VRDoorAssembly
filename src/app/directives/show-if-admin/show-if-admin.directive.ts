import { Directive, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { CurrentUserService } from '../../services/current-user.service';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[showIfAdmin]'
})
export class ShowIfAdminDirective implements OnInit, OnDestroy {

  currentDisplay: string;
  unsubscribe$ = new Subject<void>();

  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private currentUserService: CurrentUserService
  ) { }

  ngOnInit(): void {
    this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
    this.currentUserService.getUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        console.log(user.role);
        
        if (user && user.role === 'ADM') {
          this.renderer.setStyle(this.element.nativeElement, 'display', this.currentDisplay);
        } else {
          this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
          this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
