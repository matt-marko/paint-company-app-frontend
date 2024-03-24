import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-swimlane',
  templateUrl: './swimlane.component.html',
  styleUrls: ['./swimlane.component.css']
})
export class SwimlaneComponent {
  @Input() header: string = 'Item';
}
