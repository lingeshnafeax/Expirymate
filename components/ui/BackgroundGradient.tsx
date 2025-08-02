const BackgroundGradient = () => {
  return (
    <div
      className="absolute bg-background inset-0 z-0"
      style={{
        backgroundImage: `
        radial-gradient(
          circle at top center,
          rgba(173, 109, 244, 0.5),
          transparent 70%
        )
      `,
        filter: "blur(80px)",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default BackgroundGradient;
