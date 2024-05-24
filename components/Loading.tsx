import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#161616",
      }}
    >
      <ReactLoading type="spin" color="#fff" height={75} width={75} />
    </div>
  );
}
