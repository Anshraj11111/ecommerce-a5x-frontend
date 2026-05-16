import { useEffect } from "react";
import useToastStore from "../../stores/useToastStore";

function ToastItem({ toast }) {
  const removeToast = useToastStore((s) => s.removeToast);

  const colors = {
    success: { border: "#00e5ff", icon: "✓", iconColor: "#00e5ff" },
    error:   { border: "#ef4444", icon: "✕", iconColor: "#ef4444" },
    info:    { border: "#818cf8", icon: "ℹ", iconColor: "#818cf8" },
  };
  const c = colors[toast.type] || colors.success;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "14px 18px",
        background: "#0f1520",
        border: `1.5px solid ${c.border}`,
        borderRadius: "12px",
        boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)`,
        minWidth: "260px",
        maxWidth: "340px",
        animation: "toastSlideIn 0.25s ease",
        cursor: "pointer",
      }}
      onClick={() => removeToast(toast.id)}
    >
      {/* Icon */}
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background: `${c.iconColor}22`,
          border: `2px solid ${c.iconColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: c.iconColor,
          fontWeight: "700",
          fontSize: "15px",
          flexShrink: 0,
        }}
      >
        {c.icon}
      </div>

      {/* Message */}
      <span style={{ color: "#ffffff", fontSize: "14px", fontWeight: "500", lineHeight: "1.4" }}>
        {toast.message}
      </span>

      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); removeToast(toast.id); }}
        style={{
          marginLeft: "auto",
          background: "none",
          border: "none",
          color: "#8A9BB5",
          cursor: "pointer",
          fontSize: "18px",
          lineHeight: 1,
          padding: "0 2px",
          flexShrink: 0,
        }}
      >
        ×
      </button>
    </div>
  );
}

function CartToast() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <>
      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          pointerEvents: toasts.length ? "auto" : "none",
        }}
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </div>
    </>
  );
}

export default CartToast;
