import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from './task-card.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {
    // Configura el entorno de prueba para el componente
    await TestBed.configureTestingModule({
      declarations: [TaskCardComponent],
    }).compileComponents();

    // Crea una instancia del componente
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;

    // Inicializa los inputs necesarios
    component.task = {
      id: 1,
      title: 'Test Task',
      description: 'Task Description',
      state: 'pendiente',
    };

    // Detecta cambios para aplicar los inputs
    fixture.detectChanges();
  });

  it('should create', () => {
    // Verifica si el componente se crea correctamente
    expect(component).toBeTruthy();
  });

  it('should emit delete event when onDelete is called', () => {
    // Espía el EventEmitter 'delete' con jest.spyOn
    jest.spyOn(component.delete, 'emit');

    // Llama al método onDelete
    component.onDelete();

    // Verifica que el evento 'delete' haya sido emitido con el id correcto
    expect(component.delete.emit).toHaveBeenCalledWith(component.task.id);
  });

  it('should toggle task state and emit toggleStatus event when onToggleStatus is called', () => {
    // Espía el EventEmitter 'toggleStatus' con jest.spyOn
    jest.spyOn(component.toggleStatus, 'emit');

    // Guarda el estado actual de la tarea
    const initialTaskState = component.task.state;

    // Llama al método onToggleStatus
    component.onToggleStatus();

    // Verifica que el estado de la tarea haya cambiado
    expect(component.task.state).not.toBe(initialTaskState);

    // Verifica que el evento 'toggleStatus' haya sido emitido con la tarea actualizada
    expect(component.toggleStatus.emit).toHaveBeenCalledWith(component.task);
  });

  it('should toggle task state to completada when current state is pendiente', () => {
    // Asegúrate de que el estado inicial es 'pendiente'
    component.task = { ...component.task, state: 'pendiente' };

    // Llama al método onToggleStatus
    component.onToggleStatus();

    // Verifica que el estado haya cambiado a 'completada'
    expect(component.task.state).toBe('completada');
  });

  it('should toggle task state to pendiente when current state is completada', () => {
    // Configura el estado inicial como 'completada'
    component.task = { ...component.task, state: 'completada' };

    // Llama al método onToggleStatus
    component.onToggleStatus();

    // Verifica que el estado haya cambiado a 'pendiente'
    expect(component.task.state).toBe('pendiente');
  });
  
});
