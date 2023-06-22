import { Task } from "./types";

//use fetch api to make requests to the backend
const baseUrl = process.env.VUE_APP_BASE_URL || 'http://localhost:3000';
export const login = async (email: string, password: string) => {
    const res = await fetch(`${baseUrl}v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if(res.ok) {
        return data;
    }

    throw data;
}

// /check
export const check = async () => {
    //get token from local storage
    const token = localStorage.getItem('token');
    //make request to backend
    const res = await fetch(`${baseUrl}v1/auth/check`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();
    if(res.ok) {
        return data;
    }

    throw data;
}

export const register = async (email: string, password: string) => {
    const res = await fetch(`${baseUrl}v1/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if(res.ok) {
        return data;
    }

    throw data;
}

// /task post put delete 
export const createTask = async (task: Task) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${baseUrl}v1/task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });
    const data = await res.json();

    if(res.ok) {
        return data;
    }

    throw data;
}

export const updateTask = async (task: Task) => {
    const {_id, ...payload} = task
    const token = localStorage.getItem('token');
    const res = await fetch(`${baseUrl}v1/task/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

       const data = await res.json();

    if(res.ok) {
        return data;
    }

    throw data;
}

export const deleteTask = async (id: string) => {
    const token = localStorage.getItem('token');

    const res = await fetch(`${baseUrl}v1/task/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
    });

       const data = await res.json();

    if(res.ok) {
        return data;
    }

    throw data;
}

// /tasks get
export const getTasks = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${baseUrl}v1/task`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        method: 'GET',
    });

       const data = await res.json();

    if(res.ok) {
        return data;
    }

    throw data;
}

