export default function TaskList() {
    return  <li className="task-item">
                <label className="checkbox-container">
                    <input type="checkbox" id="task1" />
                    <span className="custom-checkbox"></span>
                </label>
                <span className="task-text">Подготовить отчет по проекту</span>
                <span className="task-status pending">В ожидании</span>
                <span className="task-category">Работа</span>
            </li>
}
            
            
          