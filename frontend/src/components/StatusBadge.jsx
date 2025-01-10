const StatusBadge = ({ status = "success" }) => {
  // Define colors and glow effects for each status
  const getStyles = (status) => {
    switch (status) {
      case "success":
        return {
          color: "#4CAF50", // Green shade
          glow: "0 0 8px #4CAF50",
        };
      case "warning":
        return {
          color: "#FFC107", // Yellow shade
          glow: "0 0 8px #FFC107",
        };
      case "error":
        return {
          color: "#F44336", // Red shade
          glow: "0 0 8px #F44336",
        };
      default:
        return {
          color: "#B0BEC5", // Neutral gray
          glow: "0 0 8px #B0BEC5",
        };
    }
  };

  const styles = getStyles(status);

  return (
    <div
      style={{
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        backgroundColor: styles.color,
        boxShadow: styles.glow,
        display: "inline-block",
        margin: "0 4px",
      }}
      aria-label={`Status: ${status}`}
    ></div>
  );
};

export default StatusBadge;
