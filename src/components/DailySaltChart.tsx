import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', salt: 4.2 },
  { day: 'Tue', salt: 3.8 },
  { day: 'Wed', salt: 4.5 },
  { day: 'Thu', salt: 3.2 },
  { day: 'Fri', salt: 4.8 },
  { day: 'Sat', salt: 3.9 },
  { day: 'Sun', salt: 4.1 },
];

const DailySaltChart = () => {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="salt" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailySaltChart;