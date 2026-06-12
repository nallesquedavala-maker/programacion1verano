function ProgressBar({ value, total, showSteps = true }) {
  const porcentaje = total > 0 ? (value / total) * 100 : 0

  return (
    <div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${value} de ${total} temas completados`}
      >
        <div className="progress-fill" style={{ width: `${porcentaje}%` }} />
      </div>

      {showSteps && (
        <div className="progress-steps" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={`progress-step-dot${i < value ? " done" : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProgressBar
