import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  getProjects():any {
    return this.webReqService.get('projects');
  }

  createProject(title: string) {
    return this.webReqService.post('project', { title });
  }

  updateProject(id: string, title: string) {
    return this.webReqService.patch(`projects/${id}`, { title });
  }

  updateTask(projectId: string, taskId: string, title: string) {
    return this.webReqService.patch(`projects/${projectId}/tasks/${taskId}`, { title });
  }

  deleteTask(projectId: string, taskId: string) {
    return this.webReqService.delete(`projects/${projectId}/tasks/${taskId}`);
  }

  deleteProject(id: string) {
    return this.webReqService.delete(`projects/${id}`);
  }

  getTasks(projectId: string):any {
    return this.webReqService.get(`projects/${projectId}/tasks`);
  }

  createTask(title: string, projectId: string) {
    return this.webReqService.post(`projects/${projectId}/tasks`, { title });
  }

  complete(task: Task) {
    return this.webReqService.patch(`projects/${task._projectId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }

}
