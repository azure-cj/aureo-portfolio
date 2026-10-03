import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
        }}
      >
        <svg
          width="180"
          height="180"
          viewBox="0 0 32 32"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            d="M16 5.5 L25 26.5 H19.8 L18.0 22.0 H14.0 L12.2 26.5 H7 L16 5.5 Z M16 11.2 L14.7 17.8 H17.3 L16 11.2 Z"
            fill="#e8d9c5"
            fillRule="evenodd"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
