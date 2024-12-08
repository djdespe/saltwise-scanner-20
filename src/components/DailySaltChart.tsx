import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Lun', salt: 4.2 },
  { day: 'Mar', salt: 3.8 },
  { day: 'Mer', salt: 4.5 },
  { day: 'Jeu', salt: 3.2 },
  { day: 'Ven', salt: 4.8 },
  { day: 'Sam', salt: 3.9 },
  { day: 'Dim', salt: 4.1 },
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
            stroke="#f59e0b"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailySaltChart;