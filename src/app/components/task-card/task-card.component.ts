import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<number>();
  @Output() toggleStatus = new EventEmitter<Task>();

  onDelete() {
    this.delete.emit(this.task.id);
  }

  onToggleStatus() {
    this.task.state =
      this.task.state === 'pendiente' ? 'completada' : 'pendiente';
    this.toggleStatus.emit(this.task);
  }
}
