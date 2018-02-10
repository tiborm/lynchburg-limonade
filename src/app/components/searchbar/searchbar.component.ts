import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'lyli-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  @Input() searchQuery = '';
}
