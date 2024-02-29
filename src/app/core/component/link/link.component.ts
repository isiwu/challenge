import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
//import { log } from 'console';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [NgClass],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent {
  @Input({required: true}) href = "";
  @Input({required: true}) text = "";
  router = new Router();
  
  handleNavigation(evt: MouseEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.router.navigateByUrl(this.href)
  }
}
