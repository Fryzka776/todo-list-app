import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoListService } from './todo-list.service';

describe('TodoListService', () => {
  let service: TodoListService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoListService]
    });
    service = TestBed.inject(TodoListService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a todo', () => {
    const todo = { title: 'Test Todo', completed: false, userId: 1 };
    service.addTodo(todo).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(service.serverUrl);
    expect(req.request.method).toEqual('POST');
    req.flush({});
  });

  it('should get todos', () => {
    const userId = 1;
    service.getTodos(userId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.serverUrl}?userId=${userId}`);
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });

  it('should update a todo', () => {
    const todoTitle = 'Updated Todo';
    const todo = { id: 1, title: 'Test Todo', completed: false, userId: 1 };
    service.updateTodo(todoTitle, todo).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.serverUrl}/${todo.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush({});
  });

  it('should delete a todo', () => {
    const todoId = 1;
    service.deleteTodo(todoId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.serverUrl}/${todoId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
