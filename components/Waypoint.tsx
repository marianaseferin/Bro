export default function Waypoint({ number }: { number: string }) {
  return (
    <div className="waypoint">
      <span>Waypoint · {number}</span>
    </div>
  );
}
