import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from './models/task.model';
import { TaskService } from './services/task/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tasks: Task[] = [];
  taskForm: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: '',
      description: '',
    });
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask() {
    const newTask = this.taskForm.value as Task;
    newTask.state = 'pendiente';
    this.taskService.addTask(newTask).subscribe((task) => {
      this.tasks.push(task);
    });
    this.taskForm.reset();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  toggleTaskStatus(task: Task) {
    this.taskService.updateTask(task).subscribe((updatedTask) => {
      const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
      }
    });
  }
}
