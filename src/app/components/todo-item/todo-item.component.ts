import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {Todo} from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.sass']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private service: TodoService) {
  }

  ngOnInit(): void {
  }

  setClasses(): { todo: boolean; 'is-complete': boolean } {
    return {
      todo: true,
      'is-complete': this.todo.completed
    };
  }

  onToggle(todo: Todo): void {
    this.todo.completed = !this.todo.completed;
    this.service.toggleCompleted(todo).subscribe(x => {
      console.log(x);
    });
  }

  onDelete(todo: Todo): void {
    this.deleteTodo.emit(todo);
  }

}
