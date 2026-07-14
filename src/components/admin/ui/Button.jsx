export default function Button({
  children,
  variant = "primary",
  type = "button",
}) {
  const variants = {
    primary: "bg-brand-primary text-white hover:opacity-90",

    secondary: "border border-border bg-background text-foreground",

    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-2xl
        px-5
        py-3
        text-sm
        font-medium
        transition
        ${variants[variant]}
      `}
    >
      {children}
    </button>
  );
}
