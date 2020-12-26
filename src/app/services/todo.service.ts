import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Todo} from '../models/Todo';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todosUrl = 'http://127.0.0.1:8080/api/todo';
  todoLimit = '?limit=10';

  constructor(private http: HttpClient) {
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl + this.todoLimit);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  deleteTodo(todo: Todo): void {
    const url: string = this.todosUrl + '/' + todo.id;
    this.http.delete(url, httpOptions).subscribe();
  }

  toggleCompleted(todo: Todo): Observable<any> {
    const url: string = this.todosUrl + '/' + todo.id;
    return this.http.put(url, todo, httpOptions);
  }
}
