import { Task } from "./types";

//use fetch api to make requests to the backend
const baseUrl = process.env.VUE_APP_BASE_URL || 'http://localhost:3000';
export const login = async (email: string, password: string) => {
    const res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    return data;
}

export const register = async (email: string, password: string) => {
    const res = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    return data;
}

// /task post put delete 
export const createTask = async (task: Task) => {
    const res = await fetch(`${baseUrl}/task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    const data = await res.json();

    return data;
}

export const updateTask = async (task: Task) => {
    const res = await fetch(`${baseUrl}/task`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    const data = await res.json();

    return data;
}

export const deleteTask = async (id: string) => {
    const res = await fetch(`${baseUrl}/task/${id}`, {
        method: 'DELETE',
    });

    const data = await res.json();

    return data;
}
