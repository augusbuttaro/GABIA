const DiagonalBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute left-1/2 w-[250vw] h-40 bg-blue-200/20"
        style={{
          top: "40%",
          transform: "translateX(-50%) rotate(30deg)",
        }}
      />
      <div
        className="absolute left-1/2 w-[250vw] h-40 bg-blue-200/20"
        style={{
          top: "75%",
          transform: "translateX(-50%) rotate(30deg)",
        }}
      />
    </div>
  );
};

export default DiagonalBackground;
