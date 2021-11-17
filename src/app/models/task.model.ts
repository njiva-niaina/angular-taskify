export interface Task {
    _id: string;
    _projectId: string;
    title: string;
    completed: boolean;
    description: string;
    duration: number;
}