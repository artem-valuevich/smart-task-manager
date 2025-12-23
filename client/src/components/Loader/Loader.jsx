import "./Loader.css";

export default function Loader({
  type = "spinner",
  size = "medium",
  text,
  fullscreen = false,
}) {
  const LoaderContent = () => {
    switch (type) {
      case "dots":
        return (
          <div className="dot-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );
      case "skeleton":
        return (
          <div className="skeleton-loader skeleton-card">
            <div className="skeleton-text short"></div>
            <div className="skeleton-text medium"></div>
            <div className="skeleton-text"></div>
          </div>
        );
      case "progress":
        return (
          <div className="progress-loader">
            <div className="progress-bar"></div>
          </div>
        );
      default:
        return <div className={`spinner spinner-${size}`}></div>;
    }
  };

  if (fullscreen) {
    return (
      <div className="fullscreen-loader">
        <LoaderContent />
        {text && <div className="loader-text">{text}</div>}
      </div>
    );
  }

  return (
    <div className="loader">
      <LoaderContent />
      {text && <div className="loader-text">{text}</div>}
    </div>
  );
}
