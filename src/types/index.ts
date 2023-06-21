export type Item = {
    id: string;
 }

 export type Task = {
    _id?: string;
	title: string;
	description: string;
	userId: string;
	status: "todo" | "inProgress" | "done";
}

export type User = {
    id: string;
    email: string;
    password: string;
}