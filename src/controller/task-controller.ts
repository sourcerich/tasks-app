import { Request, Response } from 'express';
import Task from '../models/task';

// Create Task
export async function createTask(req: Request, res: Response) {
    try {
        const { task, date, description, is_finished } = req.body;

        if (!task) {
            return res.status(400).send({
                status: 'FAILED',
                message: 'Task title is required.'
            });
        }

        const newTask = await Task.create({
            task,
            date: date || new Date(),  // Default to current date if not provided
            description: description || '',  // Optional field
            is_finished: is_finished ? 1 : 0  // Optional field
        });

        res.status(201).send({
            status: 'SUCCESS',
            data: newTask
        });
    } catch (error: any) {
        res.status(500).send({
            status: 'FAILED',
            message: error.message
        });
    }
}

// Update Task
export async function updateTask(req: Request, res: Response) {
    try {
        const taskId = req.params.id;
        const { task, date, description, is_finished } = req.body;

        const updated = await Task.update(
            {
                task: task || '',  // Optional field
                date: date || new Date(),  // Default to current date if not provided
                description: description || '',  // Optional field
                is_finished: is_finished ? 1 : 0
            },
            {
                where: { id: taskId }
            }
        );

        if (updated[0] > 0) {
            res.status(200).send({
                status: 'SUCCESS',
                message: `Task ${taskId} updated successfully.`
            });
        } else {
            res.status(404).send({
                status: 'FAILED',
                message: `Task ${taskId} not found.`
            });
        }
    } catch (error: any) {
        res.status(500).send({
            status: 'FAILED',
            message: error.message
        });
    }
}

// Delete Task
export async function deleteTask(req: Request, res: Response) {
    try {
        const taskId = req.params.id;
        const deleted = await Task.destroy({
            where: { id: taskId }
        });

        if (deleted) {
            res.status(200).send({
                status: 'SUCCESS',
                message: `Task ${taskId} deleted successfully.`
            });
        } else {
            res.status(404).send({
                status: 'FAILED',
                message: `Task ${taskId} not found.`
            });
        }
    } catch (error: any) {
        res.status(500).send({
            status: 'FAILED',
            message: error.message
        });
    }
}

// Get All Tasks
export async function getTasks(req: Request, res: Response) {
    try {
        const tasks = await Task.findAll();
        res.status(200).send({
            status: 'SUCCESS',
            data: tasks
        });
    } catch (error: any) {
        res.status(500).send({
            status: 'FAILED',
            message: error.message
        });
    }
}

