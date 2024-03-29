export const dynamic = "force-dynamic";

let firstRenderTime: string | null = null;

export default function Page() {
  const time = new Date().toLocaleString();
  if (!firstRenderTime) {
    firstRenderTime = time;
  }
  return (
    <div>
      <ul>
        <li>First Time: {firstRenderTime}</li>
        <li>Time: {time}</li>
      </ul>
    </div>
  );
}
