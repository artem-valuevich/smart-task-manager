import TaskItem from "../TaskItem/TaskItem"
import "./TaskList.css"

export default function TaskList() {
    return <>
    <ul className="task-list" />
        <TaskItem />
    </>
}