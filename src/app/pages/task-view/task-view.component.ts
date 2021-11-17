import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Task } from 'src/app/models/task.model'; 
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  projects: Project[]=[];
  tasks: Task[]=[];

  selectedProjectId: string='';

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.projectId) {
          this.selectedProjectId = params.projectId;
          this.taskService.getTasks(params.projectId).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = [];
        }
      }
    );
    
    this.taskService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }

  onTaskClick(task: Task){
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      task.completed = !task.completed;
    })
  }

  onDeleteProjectClick(){
    this.taskService.deleteProject(this.selectedProjectId).subscribe((res: any) => {
      this.router.navigate(['/projects']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string){
    this.taskService.deleteTask(this.selectedProjectId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id);
      console.log(res);
    })
  }
}

