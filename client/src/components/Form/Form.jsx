import "./Form.css";

export default function Form({ title, children, onSubmit }) {
  return (
    <div className="form-container">
      <form className="form" onSubmit={onSubmit}>
        <div className="form-header">
          <h2 className="form-title">{title}</h2>
        </div>
        {children}
      </form>
    </div>
  );
}
