export function getBeltButtonStyle(belt: string, selectedBelt: string | null): React.CSSProperties {
  const beltColors: Record<string, string> = {
    "9": "#ffffff", // white
    "8": "#ffff00", // yellow
    "7": "#008000", // green
    "6": "#0000ff", // blue
    "5": "#0000ff", // blue 1 stripe
    "4": "#ff0000", // red
    "3": "#ff0000", // red 1 stripe
    "2": "#ff0000", // red 2 stripes
    "1": "#ff0000", // red 3 stripes
  };

  const stripeConfig: Record<string, number> = {
    "5": 1,
    "3": 1,
    "2": 2,
    "1": 3,
  };

  const isSelected = selectedBelt === belt;
  const baseColor = beltColors[belt] || "#555";
  const stripeCount = stripeConfig[belt] || 0;

  let background: string;

  if (isSelected) {
    background = "#ddd";
  } else if (stripeCount === 1 && belt === "5") {
    background = `repeating-linear-gradient(
      to right,
      red 0 4px,
      ${baseColor} 4px 100%
    )`;
  }else if (stripeCount === 1) {
    background = `repeating-linear-gradient(
      to right,
      black 0 4px,
      ${baseColor} 4px 100%
    )`;
  } else if (stripeCount === 2) {
    background = `repeating-linear-gradient(
      to right,
      black 0 4px,
      ${baseColor} 4px 12px,
      black 12px 16px,
      ${baseColor} 16px 100%
    )`;
  } else if (stripeCount === 3) {
    background = `repeating-linear-gradient(
      to right,
      black 0 4px,
      ${baseColor} 4px 12px,
      black 12px 16px,
      ${baseColor} 16px 24px,
      black 24px 28px,
      ${baseColor} 28px 100%
    )`;
  }
   else {
    background = baseColor;
  }

  return {
    marginRight: 8,
    padding: "0.5rem 1rem",
    color: isSelected ? "black" : "white",
    border: "1px solid #ccc",
    backgroundImage: background.startsWith("repeating") ? background : undefined,
    backgroundColor: !background.startsWith("repeating") ? background : undefined,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    borderRadius: 4,
    cursor: "pointer",
  };
}
