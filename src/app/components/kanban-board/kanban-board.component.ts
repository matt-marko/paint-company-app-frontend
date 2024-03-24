import { Component, inject } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PaintStockService } from 'src/app/services/paint-stock.service';
import { Paint } from 'src/app/paint';
import { Router } from '@angular/router';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent {
  // Paint stock corresponding to what is in the database
  outOfStock: string[] = [];
  runningLow: string[] = [];
  available: string[] = [];

  // Paint stock corresponding to current view
  outOfStockCurrent: string[] = [];
  runningLowCurrent: string[] = [];
  availableCurrent: string[] = [];

  changesMade: boolean = false;
  isLoading: boolean = true;
  errorHasOccurred: boolean = false;
  updateIsSuccess: boolean = false;

  currentUser: User = {} as User;

  paintStockService: PaintStockService = inject(PaintStockService);
  userService: UserService = inject(UserService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.paintStockService.getPaints()
      .subscribe(paints => {
        this.loadPaints(paints);
      }, (error) => {
        this.errorHasOccurred = true;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
    });

    this.currentUser = this.userService.getCurrentUser();
  }

  /** 
   * Handle drag and drop events for the paint items
   */
  drop(event: CdkDragDrop<string[]>) {
    this.changesMade = true;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  cancelChanges(): void {
    this.changesMade = false;

    this.outOfStock = [...this.outOfStockCurrent];
    this.runningLow = [...this.runningLowCurrent];
    this.available = [...this.availableCurrent];
  }

  saveChanges(): void {
    this.changesMade = false;
    this.updateIsSuccess = false;
    this.isLoading = true;

    let paintPayload: Paint[] = [];

    this.outOfStock.forEach(outOfStockPaintColour => {
      paintPayload.push({
        colour: outOfStockPaintColour,
        status: 'out of stock',
      });
    });

    this.runningLow.forEach(runningLowPaintColour => {
      paintPayload.push({
        colour: runningLowPaintColour,
        status: 'running low',
      });
    });

    this.available.forEach(availablePaintColour => {
      paintPayload.push({
        colour: availablePaintColour,
        status: 'available',
      });
    });

    this.paintStockService.updatePaints(paintPayload)
      .subscribe(paints => {
        this.loadPaints(paints);
        this.updateIsSuccess = true;
        this.isLoading = false;
      }, (error) => {
        this.errorHasOccurred = true;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
  }

  /**  
   * Updates the view with the updated paints
   */
  loadPaints(paints: Paint[]): void {
    this.outOfStockCurrent = [];
    this.runningLowCurrent = [];
    this.availableCurrent = [];

    paints.forEach(paint => {
      switch(paint.status) {
        case 'out of stock':
          this.outOfStockCurrent.push(paint.colour);
          break;
        case 'running low':
          this.runningLowCurrent.push(paint.colour);
          break;
        case 'available':
          this.availableCurrent.push(paint.colour);
          break;
        default:
          break;
      }
    });

    this.outOfStock = [...this.outOfStockCurrent];
    this.runningLow = [...this.runningLowCurrent];
    this.available = [...this.availableCurrent];
  }

  handleLogout(): void {
    this.router.navigate(['']);
  }

  openSettings(): void {
    this.isLoading = true;

    // Get all the users and their current permissions
    // before going to the settings page in order to be
    // able to quickly update them.
    this.userService.requestAllUsers()
      .subscribe(users => {
        this.userService.setAllUsers(users);
        this.router.navigate(['/settings']);
      }, (error) => {
        this.errorHasOccurred = true;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
    });
  }
}
